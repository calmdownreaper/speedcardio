# Z-Anatomy pipeline for SpeedMSK

Z-Anatomy meshes (CC BY-SA 4.0) replace the BodyParts3D meshes in `msk/*.bin`
and `msk/models.json`. The viewer format is unchanged: one bin per region, an
int16 position range and a 2- or 4-byte index range per part, all normalised
through the manifest's shared `center` / `scale`.

## Sources

- `~/Downloads/SkeletalSystem100.fbx`
- `~/Downloads/MuscularSystem100.fbx`
- `Joints100.fbx` from the pilot scratchpad (its path is hardcoded in
  `SOURCES` inside `extract.py`; update that entry if you move the file).

The FBX files are Y-up with +Z anterior and +X left; the pipeline converts to
SpeedMSK's frame (`x*10`, `-z*10`, `y*10`): millimetres, Z up, anterior -Y,
right -X.

## Rebuild

```sh
python3 tools/zanatomy/extract.py        # FBX -> tools/zanatomy/.cache/*.pkl
python3 tools/zanatomy/export_regions.py --report
python3 tools/zanatomy/emit_markers.py   # surviving point markers -> markers.json
python3 tools/zanatomy/apply_markers.py  # rewrite the markers tables in subjects/msk/regions/*.js
node tools/zanatomy/check_bins.mjs
node tools/validate_msk.mjs
```

`extract.py` re-parses when the FBX or the extractor code (`extract.py`,
`fbxcore.py`, `props.py`, `xform.py`) is newer than the cache. The cache is
git-ignored. `original.json` is the frozen pre-migration snapshot (BodyParts3D
marker coordinates, anchor metadata and anchor boxes from commit `b26781e`);
the marker scripts read it instead of the current region modules, so rerunning
the rebuild is idempotent. Do not regenerate it after the migration commit.

## Orientation

The FBX mirrors the right side with a negative scale on the instance. `compose()`
built the world matrix but never swapped the triangle winding, so every mirrored
object came out inside-out: 1,011 of the 3,054 FBX models carry a negative
determinant, and 193 of the 448 object instances used by `map.MAP` (43%) had
their normals pointing into the bone. `extract.py` now flips the winding when
the composed transform has a negative determinant and, for closed shells, when
the signed volume is still negative (`orient()`); open sheets (fascia, sinus
lining) have no inside, so only the determinant rule applies to them. After a
rebuild no closed shell has negative signed volume.

The flip is invisible with the viewer's current double-sided material, but it
made every normals check, any single-sided pass and any normal-based shading
wrong for half of the model, so it is corrected at the source. It is *not* what
produces the ragged look around the orbit: those are genuine thin bone plates
with open rims, confirmed by rendering the raw FBX in three's FBXLoader (same
7,308 sphenoid triangles, same rims). Duplicate objects or stacked mirror
instances are ruled out (no object pair shares a bounding box, apart from the
`.i` / `.j` annotation pairs that `map.py` never matches), as are the
transparent pass (opaque and transparent renders are pixel-identical) and n-gon
fan triangulation (every bone mesh is already triangles). One Loop step softens
those rims; level 2 tears the plates apart, so level 1 is the limit.

## Smoothing

The FBX exports are already triangulated and unevenly dense: most of a bone's
area rests on a few large triangles, so silhouettes, orbit rims and condyles
read as polygons. `export_regions.py` runs one Loop subdivision step
(`subdivide.py`) on the parts whose mean triangle edge is coarser than 4.5 mm,
or coarser than 1.1% of the part's own bounding-box diagonal. That is the
"few vertices for its size" rule: dense parts (ribs, intercostals, the temporal
bone, the iliotibial tract) keep their authored triangles, and the bins total
38.1 MB against a 41 MB budget, i.e. under twice the previous 20.6 MB build.

The shared `center` / `scale` frame is measured *before* smoothing, so marker
world coordinates and camera framing do not move. Measured against the nearest
vertex of the smoothed parts, the existing point markers move by at most 1.8 mm
(median under 0.5 mm), so they remain on their structures. Subdivision keeps every vertex
shared by its faces, so the viewer's `computeVertexNormals` still yields smooth
normals. `subdivide.py` uses Loop with Warren's beta, the 3/4 + 1/8 boundary
rule and a plain midpoint for boundary or non-manifold edges. Level 2 is
deliberately not used: the thin overlapping shells of the facial bones separate
into visible shards, and it quadruples the bins again.

## Files

- `map.py` — the single source of truth: part id -> Z-Anatomy object names
  (exact names or full-match regexes), region membership, and which point
  markers survive. `.i` / `.j` annotation surfaces and `.ol` / `.or` / `.el` /
  `.er` label objects are never matched by the exact-name lists.
- `subdivide.py` — one vectorised Loop step for the parts that need smoothing.
- `fbxcore.py`, `props.py`, `xform.py` — the pilot FBX reader, copied verbatim
  so the work survives.
- `znames_r.txt` — the right-side object names exported from the pilot, kept
  for reference.
- `emit_markers.py` — maps BodyParts3D markers into the new frame. Skull
  landmarks use Z-Anatomy's annotation strips; the rest use their anchor
  bones' local bounding box and snap to the nearest vertex when they are
  already within 10 mm.
- `export_regions.py` writes `msk/models.json` and `msk/*.bin`; `apply_markers.py`
  is the only script that touches region modules.

## Attribution

Z-Anatomy is licensed CC BY-SA 4.0. The site footer credits it next to the
BodyParts3D models that still power the cardiac subject.

## Brief coverage notes

- Every existing mesh id is mapped, plus 24 former point markers. Structures
  whose only Z-Anatomy objects are label strips (patellar ligament) or that
  have no matching mesh (skull foramina, most joint spaces, abdominal rings)
  stay point markers.
- The deck has no `coracoacromial` id, so the brief's mention of a
  coracoacromial ligament cannot be mapped without inventing a new structure
  and level. It is deliberately not substituted with the coracoclavicular
  ligament, which is a different structure and is mapped from the conoid and
  trapezoid ligaments.
- The deck represents the hip by a single `hip_joint` id, so the capsule,
  zona orbicularis, iliofemoral, pubofemoral and ischiofemoral ligaments and
  the acetabular labrum are composed into that one part. The knee joint
  likewise composes the capsule and both menisci.
