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

`extract.py` only re-parses when the FBX is newer than its cache. The cache is
git-ignored. `original.json` is the frozen pre-migration snapshot (BodyParts3D
marker coordinates, anchor metadata and anchor boxes from commit `b26781e`);
the marker scripts read it instead of the current region modules, so rerunning
the rebuild is idempotent. Do not regenerate it after the migration commit.

## Files

- `map.py` — the single source of truth: part id -> Z-Anatomy object names
  (exact names or full-match regexes), region membership, and which point
  markers survive. `.i` / `.j` annotation surfaces and `.ol` / `.or` / `.el` /
  `.er` label objects are never matched by the exact-name lists.
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
