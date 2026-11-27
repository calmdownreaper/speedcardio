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
// 57 muscles taught in the typing decks (forearm, hand, hip, foot, trunk, head and neck) were added 2026-11-27.
export const PRACTICE_MUSCLES = [
  // shoulder
  'supraspinatus', 'infraspinatus', 'teres_minor', 'subscapularis', 'deltoid', 'teres_major',
  // arm
  'biceps_brachii', 'brachialis', 'coracobrachialis', 'triceps_brachii',
  // forearm
  'brachioradialis', 'flexor_carpi_radialis', 'flexor_carpi_ulnaris', 'extensor_digitorum', 'pronator_teres', 'palmaris_longus_muscle', 'flexor_digitorum_superficialis', 'flexor_digitorum_profundus', 'flexor_pollicis_longus', 'pronator_quadratus', 'supinator', 'abductor_pollicis_longus', 'extensor_pollicis_brevis', 'extensor_pollicis_longus', 'extensor_digiti_minimi', 'extensor_indicis',
  // hand
  'abductor_pollicis_brevis', 'flexor_pollicis_brevis', 'opponens_pollicis_muscle', 'adductor_pollicis', 'abductor_digiti_minimi_of_hand', 'flexor_digiti_minimi_of_hand', 'opponens_digiti_minimi_muscle_of_hand', 'lumbrical_muscles_of_hand', 'palmar_interossei_muscles', 'dorsal_interossei_muscles_of_hand',
  // hip
  'gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'iliacus', 'psoas_major', 'tensor_fasciae_latae', 'coccygeus', 'pubococcygeus', 'iliococcygeus', 'superior_gemellus_muscle', 'inferior_gemellus_muscle', 'quadratus_femoris_muscle', 'obturator_externus',
  // thigh
  'sartorius', 'rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius', 'biceps_femoris', 'semitendinosus', 'semimembranosus', 'adductor_longus', 'adductor_magnus', 'gracilis', 'pectineus_muscle', 'adductor_brevis',
  // leg
  'gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis_anterior', 'tibialis_posterior', 'fibularis_longus', 'fibularis_brevis', 'extensor_digitorum_longus', 'flexor_digitorum_longus', 'flexor_hallucis_longus', 'extensor_hallucis_longus',
  // foot
  'abductor_hallucis', 'flexor_digitorum_brevis', 'flexor_hallucis_brevis', 'abductor_digiti_minimi_of_foot', 'quadratus_plantae_muscle', 'lumbrical_muscles_of_foot', 'adductor_hallucis', 'plantar_interossei_muscles', 'dorsal_interossei_muscles_of_foot', 'extensor_digitorum_brevis', 'extensor_hallucis_brevis', 'flexor_digiti_minimi_of_foot',
  // trunk
  'trapezius', 'levator_scapulae', 'rhomboid_major', 'rhomboid_minor', 'serratus_anterior', 'pectoralis_major', 'intercostals_external', 'intercostals_internal', 'intercostals_innermost', 'transversus_thoracis', 'levatores_costarum', 'serratus_posterior_superior', 'serratus_posterior_inferior', 'diaphragm', 'external_oblique', 'iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'internal_abdominal_oblique_muscle', 'transversus_abdominis_muscle', 'rectus_abdominis_muscle', 'pyramidalis_muscle', 'quadratus_lumborum_muscle', 'latissimus_dorsi_muscle', 'pectoralis_minor_muscle', 'subclavius_muscle',
  // headneck
  'splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior', 'masseter', 'medial_pterygoid_muscle', 'lateral_pterygoid', 'sternocleidomastoid_muscle', 'digastric', 'sternothyroid_muscle', 'genioglossus_muscle', 'hyoglossus_muscle',
];

export const PRACTICE_MUSCLE_GROUPS = [
  {
    id: 'shoulder',
    title: ['Shoulder','Ombro'],
    ids: ['supraspinatus', 'infraspinatus', 'teres_minor', 'subscapularis', 'deltoid', 'teres_major'],
  },
  {
    id: 'arm',
    title: ['Arm','Braço'],
    ids: ['biceps_brachii', 'brachialis', 'coracobrachialis', 'triceps_brachii'],
  },
  {
    id: 'forearm',
    title: ['Forearm','Antebraço'],
    ids: ['brachioradialis', 'flexor_carpi_radialis', 'flexor_carpi_ulnaris', 'extensor_digitorum', 'pronator_teres', 'palmaris_longus_muscle', 'flexor_digitorum_superficialis', 'flexor_digitorum_profundus', 'flexor_pollicis_longus', 'pronator_quadratus', 'supinator', 'abductor_pollicis_longus', 'extensor_pollicis_brevis', 'extensor_pollicis_longus', 'extensor_digiti_minimi', 'extensor_indicis'],
  },
  {
    id: 'hand',
    title: ['Hand','Mão'],
    ids: ['abductor_pollicis_brevis', 'flexor_pollicis_brevis', 'opponens_pollicis_muscle', 'adductor_pollicis', 'abductor_digiti_minimi_of_hand', 'flexor_digiti_minimi_of_hand', 'opponens_digiti_minimi_muscle_of_hand', 'lumbrical_muscles_of_hand', 'palmar_interossei_muscles', 'dorsal_interossei_muscles_of_hand'],
  },
  {
    id: 'hip',
    title: ['Hip','Quadril'],
    ids: ['gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'iliacus', 'psoas_major', 'tensor_fasciae_latae', 'coccygeus', 'pubococcygeus', 'iliococcygeus', 'superior_gemellus_muscle', 'inferior_gemellus_muscle', 'quadratus_femoris_muscle', 'obturator_externus'],
  },
  {
    id: 'thigh',
    title: ['Thigh','Coxa'],
    ids: ['sartorius', 'rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius', 'biceps_femoris', 'semitendinosus', 'semimembranosus', 'adductor_longus', 'adductor_magnus', 'gracilis', 'pectineus_muscle', 'adductor_brevis'],
  },
  {
    id: 'leg',
    title: ['Leg','Perna'],
    ids: ['gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis_anterior', 'tibialis_posterior', 'fibularis_longus', 'fibularis_brevis', 'extensor_digitorum_longus', 'flexor_digitorum_longus', 'flexor_hallucis_longus', 'extensor_hallucis_longus'],
  },
  {
    id: 'foot',
    title: ['Foot','Pé'],
    ids: ['abductor_hallucis', 'flexor_digitorum_brevis', 'flexor_hallucis_brevis', 'abductor_digiti_minimi_of_foot', 'quadratus_plantae_muscle', 'lumbrical_muscles_of_foot', 'adductor_hallucis', 'plantar_interossei_muscles', 'dorsal_interossei_muscles_of_foot', 'extensor_digitorum_brevis', 'extensor_hallucis_brevis', 'flexor_digiti_minimi_of_foot'],
  },
  {
    id: 'trunk',
    title: ['Trunk','Tronco'],
    ids: ['trapezius', 'levator_scapulae', 'rhomboid_major', 'rhomboid_minor', 'serratus_anterior', 'pectoralis_major', 'intercostals_external', 'intercostals_internal', 'intercostals_innermost', 'transversus_thoracis', 'levatores_costarum', 'serratus_posterior_superior', 'serratus_posterior_inferior', 'diaphragm', 'external_oblique', 'iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'internal_abdominal_oblique_muscle', 'transversus_abdominis_muscle', 'rectus_abdominis_muscle', 'pyramidalis_muscle', 'quadratus_lumborum_muscle', 'latissimus_dorsi_muscle', 'pectoralis_minor_muscle', 'subclavius_muscle'],
  },
  {
    id: 'headneck',
    title: ['Head and neck','Cabeça e pescoço'],
    ids: ['splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior', 'masseter', 'medial_pterygoid_muscle', 'lateral_pterygoid', 'sternocleidomastoid_muscle', 'digastric', 'sternothyroid_muscle', 'genioglossus_muscle', 'hyoglossus_muscle'],
  },
];
