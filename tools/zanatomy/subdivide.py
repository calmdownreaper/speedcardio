"""Loop subdivision for the Z-Anatomy meshes.

The FBX exports are already triangulated, so one Loop step is the cheapest
smooth subdivision that keeps the authored surface: every triangle becomes
four, and every new vertex is shared with the faces that use it, so the
viewer's computeVertexNormals stays smooth. Catmull-Clark would need the
authored polygons (they are triangles here) and would cost 1.5x more triangles
for the same level.

The implementation is vectorised with numpy: edge points from the opposite
vertices (midpoint at open or non-manifold edges), Warren's beta for interior
vertices, the 3/4 + 1/8 boundary rule for open edges. Positions come back as
float64 in the same frame as the input.
"""

import numpy as np


def subdivide(positions, triangles):
    """Return (positions, triangles) after one Loop step.

    positions: (n, 3) float array in millimetres.
    triangles: (m, 3) integer array with consistent winding.
    """
    points = np.asarray(positions, dtype=np.float64).reshape(-1, 3)
    faces = np.asarray(triangles, dtype=np.int64).reshape(-1, 3)
    count = len(points)
    faces_count = len(faces)
    if faces_count == 0:
        return points, faces

    # Directed half-edges in blocks of faces: index i belongs to face i % m,
    # corner (edge) i // m.
    directed = np.concatenate((faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]))
    corner = np.arange(3 * faces_count) // faces_count
    opposite = faces[np.arange(3 * faces_count) % faces_count, (corner + 2) % 3]

    key = directed[:, 0] * count + directed[:, 1]
    reverse = directed[:, 1] * count + directed[:, 0]
    order = np.argsort(key, kind='stable')
    sorted_key = key[order]
    slot = np.clip(np.searchsorted(sorted_key, reverse), 0, len(sorted_key) - 1)
    twin = np.where(sorted_key[slot] == reverse, order[slot], -1)

    low = np.minimum(directed[:, 0], directed[:, 1])
    high = np.maximum(directed[:, 0], directed[:, 1])
    _, first, inverse = np.unique(np.stack((low, high), axis=1), axis=0,
                                  return_index=True, return_inverse=True)
    edge_count = np.bincount(inverse, minlength=len(first))
    starts = directed[first, 0]
    ends = directed[first, 1]
    partner = twin[first]
    across = np.where(partner >= 0, opposite[np.maximum(partner, 0)], opposite[first])

    edge_points = 0.375 * (points[starts] + points[ends]) + 0.125 * (points[opposite[first]] + points[across])
    boundary = edge_count == 1
    # Edges with one face (open boundary) or more than two (non-manifold) have
    # no defined opposite pair; a plain midpoint keeps them stable instead of
    # bending the surface toward an arbitrary third face.
    midpoint = edge_count != 2
    edge_points[midpoint] = 0.5 * (points[starts[midpoint]] + points[ends[midpoint]])

    # Vertex points: Warren's rule inside, 3/4 + 1/8 per boundary neighbour at
    # open edges. Vertices with one or more than two boundary edges keep their
    # position, which is what a corner of an open patch should do.
    valence = np.bincount(directed.ravel(), minlength=count)
    neighbour_sum = np.stack([
        np.bincount(directed[:, 0], weights=points[directed[:, 1], axis], minlength=count)
        + np.bincount(directed[:, 1], weights=points[directed[:, 0], axis], minlength=count)
        for axis in range(3)
    ], axis=1)
    beta = np.where(valence == 3, 3 / 16, 3 / (8 * np.maximum(valence, 1)))
    moved = (1 - valence * beta)[:, None] * points + beta[:, None] * neighbour_sum

    border = first[boundary]
    border_sum = np.zeros((count, 3))
    border_degree = np.zeros(count, dtype=np.int64)
    for side in (0, 1):
        owner = directed[border, side]
        np.add.at(border_sum, owner, points[directed[border, 1 - side]])
        np.add.at(border_degree, owner, 1)
    straight = border_degree == 2
    moved[straight] = 0.75 * points[straight] + 0.125 * border_sum[straight]
    open_corner = (border_degree == 1) | (border_degree > 2)
    moved[open_corner] = points[open_corner]

    # Faces: three corner triangles plus the centre triangle.
    edge_ids = inverse.reshape(3, faces_count).T + count
    e0, e1, e2 = edge_ids[:, 0], edge_ids[:, 1], edge_ids[:, 2]
    v0, v1, v2 = faces[:, 0], faces[:, 1], faces[:, 2]
    new_faces = np.concatenate((
        np.stack((v0, e0, e2), axis=1),
        np.stack((v1, e1, e0), axis=1),
        np.stack((v2, e2, e1), axis=1),
        np.stack((e0, e1, e2), axis=1),
    ))

    return np.concatenate((moved, edge_points)), new_faces
