// SpeedMSK practice · "Muscles" entry.
// Muscle meshes of the MSK model, curated for practice mode and grouped by region.
// Sources:
//   - research/msk_slides_txt/*.txt — the professor's MSK slides. The included ids come from
//     05 (shoulder girdle, arm, forearm), 07 (hip, thigh, leg), 03 (thoracic wall) and 06 (abdominal wall);
//     01 (skull) and 02 (vertebral column) add no muscle that has a mesh.
//   - site/subjects/msk/typing/*.js — origin/insertion/innervation decks written from those slides;
//     used here as the primary name-level evidence.
//   - site/msk/models.json — mesh registry. Every id listed below exists in a region's `parts`.
// Four ids are not named in the slides (longus_colli and the three pelvic-floor muscles); the
// reason for each is in research/prof_slides/cobertura/practice_muscles_report.md.
// `hand` and `foot` are present but empty: the model has no intrinsic hand or foot muscle meshes.
export const PRACTICE_MUSCLES = [
  // shoulder
  'supraspinatus', 'infraspinatus', 'teres_minor', 'subscapularis', 'deltoid', 'teres_major',
  // arm
  'biceps_brachii', 'brachialis', 'coracobrachialis', 'triceps_brachii',
  // forearm
  'brachioradialis', 'flexor_carpi_radialis', 'flexor_carpi_ulnaris', 'extensor_digitorum',
  // hand — no intrinsic muscle meshes in the model
  // hip
  'gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus',
  'iliacus', 'psoas_major', 'tensor_fasciae_latae', 'coccygeus', 'pubococcygeus', 'iliococcygeus',
  // thigh
  'sartorius', 'rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius',
  'biceps_femoris', 'semitendinosus', 'semimembranosus', 'adductor_longus', 'adductor_magnus',
  'gracilis',
  // leg
  'gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis_anterior', 'tibialis_posterior',
  'fibularis_longus', 'fibularis_brevis', 'extensor_digitorum_longus', 'flexor_digitorum_longus',
  'flexor_hallucis_longus',
  // foot — no intrinsic muscle meshes in the model
  // trunk
  'trapezius', 'levator_scapulae', 'rhomboid_major', 'rhomboid_minor', 'serratus_anterior',
  'pectoralis_major', 'intercostals_external', 'intercostals_internal', 'intercostals_innermost',
  'transversus_thoracis', 'levatores_costarum', 'serratus_posterior_superior',
  'serratus_posterior_inferior', 'diaphragm', 'external_oblique',
  'iliocostalis', 'longissimus', 'spinalis', 'semispinalis',
  // head and neck
  'splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior',
];

export const PRACTICE_MUSCLE_GROUPS = [
  {
    id: 'shoulder',
    title: ['Shoulder', 'Ombro'],
    ids: ['supraspinatus', 'infraspinatus', 'teres_minor', 'subscapularis', 'deltoid', 'teres_major'],
  },
  {
    id: 'arm',
    title: ['Arm', 'Braço'],
    ids: ['biceps_brachii', 'brachialis', 'coracobrachialis', 'triceps_brachii'],
  },
  {
    id: 'forearm',
    title: ['Forearm', 'Antebraço'],
    ids: ['brachioradialis', 'flexor_carpi_radialis', 'flexor_carpi_ulnaris', 'extensor_digitorum'],
  },
  {
    id: 'hand',
    title: ['Hand', 'Mão'],
    ids: [],
  },
  {
    id: 'hip',
    title: ['Hip', 'Quadril'],
    ids: [
      'gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus',
      'iliacus', 'psoas_major', 'tensor_fasciae_latae', 'coccygeus', 'pubococcygeus', 'iliococcygeus',
    ],
  },
  {
    id: 'thigh',
    title: ['Thigh', 'Coxa'],
    ids: [
      'sartorius', 'rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius',
      'biceps_femoris', 'semitendinosus', 'semimembranosus', 'adductor_longus', 'adductor_magnus',
      'gracilis',
    ],
  },
  {
    id: 'leg',
    title: ['Leg', 'Perna'],
    ids: [
      'gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis_anterior', 'tibialis_posterior',
      'fibularis_longus', 'fibularis_brevis', 'extensor_digitorum_longus',
      'flexor_digitorum_longus', 'flexor_hallucis_longus',
    ],
  },
  {
    id: 'foot',
    title: ['Foot', 'Pé'],
    ids: [],
  },
  {
    id: 'trunk',
    title: ['Trunk', 'Tronco'],
    ids: [
      'trapezius', 'levator_scapulae', 'rhomboid_major', 'rhomboid_minor', 'serratus_anterior',
      'pectoralis_major', 'intercostals_external', 'intercostals_internal', 'intercostals_innermost',
      'transversus_thoracis', 'levatores_costarum', 'serratus_posterior_superior',
      'serratus_posterior_inferior', 'diaphragm', 'external_oblique',
      'iliocostalis', 'longissimus', 'spinalis', 'semispinalis',
    ],
  },
  {
    id: 'headneck',
    title: ['Head and neck', 'Cabeça e pescoço'],
    ids: ['splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior'],
  },
];
