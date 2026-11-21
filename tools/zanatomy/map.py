"""Z-Anatomy source mesh map for SpeedMSK.

Each SpeedMSK part id maps to one or more exact Z-Anatomy object names, or to
regular expressions when a structure is split across numbered objects (ribs,
vertebrae, muscle heads, ...). Names are matched as full object names, so the
`.i` / `.j` annotation surfaces and the `.ol` / `.or` / `.el` / `.er` label
objects are never picked up by accident.

The FBX exports carry left and right anatomy as separate objects (`.l`, `.r`).
`sides()` expands a base name to both; midline structures are listed once.

Regions mirror the layout of msk/models.json: every id below is packed into
that region's .bin. Ids that were point markers in the BodyParts3D build are
listed here only when Z-Anatomy has a real mesh for them.
"""

import re


def sides(name):
    return (name + '.l', name + '.r')


def lit(*names):
    return tuple(re.escape(name) for name in names)


def rx(*patterns):
    return tuple(patterns)


MAP = {
    'skull': {
        'frontal': lit('Frontal bone'),
        'parietal': lit(*sides('Parietal bone')),
        'temporal': lit(*sides('Temporal bone')),
        'occipital': lit('Occipital bone'),
        'sphenoid': lit('Sphenoid bone'),
        'ethmoid': lit('Ethmoid bone'),
        'maxilla': lit(*sides('Maxilla')),
        'mandible': lit('Mandible'),
        'zygomatic': lit(*sides('Zygomatic bone')),
        'nasal': lit(*sides('Nasal bone')),
        'vomer': lit('Vomer'),
        'palatine': lit(*sides('Palatine bone')),
    },

    'spine': {
        'atlas': lit('Atlas (C1)'),
        'axis': lit('Axis (C2)'),
        'cervical_vertebra': lit(*(f'Vertebra C{i}' for i in range(3, 8))),
        'thoracic_vertebra': lit(*(f'Vertebra T{i}' for i in range(1, 13))),
        'lumbar_vertebra': lit(*(f'Vertebra L{i}' for i in range(1, 6))),
        'sacrum': lit('Sacrum'),
        'iv_disc': rx(r'Intervertebral disc [CTL]\d+-[CTLS]\d+$'),

        'iliocostalis': lit(
            'Iliocostalis colli muscle', 'Iliocostalis colli muscle.r',
            *sides('Iliocostalis thoracis muscle'), *sides('Iliocostalis lumborum muscle'),
        ),
        'longissimus': lit(
            *sides('Longissimus capitis muscle'), *sides('Longissimus colli muscle'),
            *sides('Longissimus thoracis muscle'),
        ),
        'spinalis': lit(
            *sides('Spinalis capitis muscle'), *sides('Spinalis colli muscle'),
            *sides('Spinalis thoracis muscle'),
        ),
        'semispinalis': lit(*sides('Semispinalis colli muscle'), *sides('Semispinalis thoracis muscle')),
        'splenius_capitis': lit(*sides('Splenius capitis muscle')),
        'rectus_capitis_posterior_major': lit(*sides('Rectus posterior major capitis muscle')),
        'longus_colli': lit(*sides('Longus colli muscle')),
        'scalenus_anterior': lit(*sides('Scalenus anterior muscle')),

        'anterior_longitudinal_ligament': lit('Anterior longitudinal ligament'),
        'posterior_longitudinal_ligament': lit('Posterior longitudinal ligament'),
        'ligamentum_flavum': lit('Ligamenta flava'),
        'supraspinous_ligament': lit('Supraspinous ligament'),
        'nuchal_ligament': lit('Nuchal ligament'),
    },

    'thorax': {
        'sternum': lit('Manubrium of sternum', 'Body of sternum', 'Xiphoid process'),
        'ribs': lit(*(
            f'{number} rib{side}'
            for number in ('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
                           'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth')
            for side in ('.l', '.r')
        )),
        'costal_cartilages': lit(*(
            f'Costal cartilage of {n} rib{suffix}'
            for n in ('first', 'second', 'third', 'fourth', 'fifth', 'sixth',
                      'seventh', 'eighth', 'ninth', 'tenth')
            for suffix in ('.l', '.r')
        )),
        'intercostals_external': lit(*sides('External intercostal muscles')),
        'intercostals_internal': lit(*sides('Internal intercostal muscles')),
        'intercostals_innermost': lit(*sides('Innermost intercostal muscles')),
        'diaphragm': lit('Diaphragm') + lit(*sides('Diaphragm')),
        'transversus_thoracis': lit(*sides('Transversus thoracis muscle')),
        'serratus_posterior_superior': lit(*sides('Serratus posterior superior muscle')),
        'serratus_posterior_inferior': lit(*sides('Serratus posterior inferior muscle')),
        'levatores_costarum': lit(*sides('Levatores longi costarum'), *sides('Levatores breves costarum')),
    },

    'pelvis': {
        'hip_bone': lit(*sides('Hip bone')),
        'gluteus_maximus': lit(*sides('Gluteus maximus muscle')),
        'gluteus_medius': lit(*sides('Gluteus medius muscle')),
        'gluteus_minimus': lit(*sides('Gluteus minimus muscle')),
        'piriformis': lit(*sides('Piriformis muscle')),
        'obturator_internus': lit(*sides('Obturator internus')),
        'iliacus': lit(*sides('Iliacus muscle')),
        'psoas_major': lit(*sides('Psoas major')),
        'coccygeus': lit(*sides('Coccygeus muscle')),
        'pubococcygeus': lit(*sides('Pubococcygeus muscle')),
        'iliococcygeus': lit(*sides('Iliococcygeus muscle')),

        'hip_joint': lit(
            *sides('Articular capsule of hip joint'),
            *sides('Zona orbicularis'),
            *sides('Descending part of iliofemoral ligament'),
            *sides('Transverse part of iliofemoral ligament'),
            *sides('Pubofemoral ligament'),
            *sides('Ischiofemoral ligament'),
            *sides('Acetabular labrum'),
        ),
        'pubic_symphysis': lit('Pubic symphysis', 'Interpubic disc'),
        'sacrotuberous_ligament': lit(*sides('Sacrotuberous ligament')),
        'sacrospinous_ligament': lit(*sides('Sacrospinous ligament')),
        'iliolumbar_ligament': lit(*sides('Iliolumbar ligament')),
        'inguinal_ligament': lit(*sides('Inguinal ligament')),
    },

    'upper': {
        'clavicle': lit(*sides('Clavicle')),
        'scapula': lit(*sides('Scapula')),
        'humerus': lit(*sides('Humerus')),
        'radius': lit(*sides('Radius')),
        'ulna': lit(*sides('Ulna')),

        'supraspinatus': lit(*sides('Supraspinatus muscle')),
        'infraspinatus': lit(*sides('Infraspinatus muscle')),
        'teres_minor': lit(*sides('Teres minor muscle')),
        'subscapularis': lit(*sides('Subscapularis muscle')),
        'deltoid': lit(
            *sides('Acromial part of deltoid muscle'),
            *sides('Clavicular part of deltoid muscle'),
            *sides('Scapular spinal part of deltoid muscle'),
        ),
        'teres_major': lit(*sides('Teres major muscle')),
        'pectoralis_major': lit(
            '(Abdominal part of pectoralis major muscle).l', '(Abdominal part of pectoralis major muscle).r',
            *sides('Clavicular head of pectoralis major muscle'),
            *sides('Sternocostal head of pectoralis major muscle'),
        ),
        'trapezius': lit(
            *sides('Ascending part of trapezius muscle'),
            *sides('Descending part of trapezius muscle'),
            *sides('Transverse part of trapezius muscle'),
        ),
        'levator_scapulae': lit(*sides('Levator scapulae')),
        'rhomboid_major': lit(*sides('Rhomboid major muscle')),
        'rhomboid_minor': lit(*sides('Rhomboid minor muscle')),
        'serratus_anterior': lit(*sides('Serratus anterior muscle')),
        'biceps_brachii': lit(*sides('Long head of biceps brachii'), *sides('Short head of biceps brachii')),
        'brachialis': lit(*sides('Brachialis muscle')),
        'coracobrachialis': lit(*sides('Coracobrachialis muscle')),
        'triceps_brachii': lit(
            *sides('Lateral head of triceps brachii'),
            *sides('Long head of triceps brachii'),
            *sides('Medial head of triceps brachii'),
        ),
        'brachioradialis': lit(*sides('Brachioradialis muscle')),
        'flexor_carpi_radialis': lit(*sides('Flexor carpi radialis')),
        'flexor_carpi_ulnaris': lit(
            *sides('Humeral head of flexor carpi ulnaris'),
            *sides('Ulnar head of flexor carpi ulnaris'),
        ),
        'extensor_digitorum': lit(*sides('Extensor digitorum')),

        'ac_joint': lit(
            *sides('Articular capsule of acromioclavicular joint'),
            *sides('Acromioclavicular ligament'),
            *sides('Articular disc of acromioclavicular joint'),
        ),
        'sc_joint': lit(
            *sides('Articular capsule of sternoclavicular joint'),
            *sides('Anterior sternoclavicular ligament'),
            *sides('Posterior sternoclavicular ligament'),
            *sides('Articular disc of sternoclavicular joint'),
        ),
        'coracoclavicular_lig': lit(*sides('Conoid ligament'), *sides('Trapezoid ligament')),
        'glenohumeral_joint': lit(*sides('Articular capsule of glenohumeral joint')),
        'glenoid_labrum': lit(*sides('Glenoid labrum')),
        'coracohumeral_lig': lit(*sides('Coracohumeral ligament')),
        'glenohumeral_ligs': lit(
            *sides('Superior glenohumeral ligament'),
            *sides('Middle glenohumeral ligament'),
            *sides('Inferior glenohumeral ligament'),
        ),
        'transverse_humeral_lig': lit(*sides('Transverse humeral ligament')),
    },

    'abdomen': {
        'external_oblique': lit(*sides('External abdominal oblique muscle')),
        'linea_alba': lit('Linea alba'),
    },

    'lower': {
        'femur': lit(*sides('Femur')),
        'tibia': lit(*sides('Tibia')),
        'fibula': lit(*sides('Fibula')),
        'patella': lit(*sides('Patella')),
        'tarsal_bones': lit(*[
            name for base in (
                'Calcaneus', 'Talus', 'Navicular bone', 'Cuboid bone',
                'Medial cuneiform bone', 'Intermediate cuneiform bone', 'Lateral cuneiform bone',
            ) for name in sides(base)
        ]),
        'metatarsals': rx(r'(First|Second|Third|Fourth|Fifth) metatarsal bone\.[lr]$'),
        'toe_phalanges': rx(r'(Proximal|Middle|Distal) phalanx of (first|second|third|fourth|fifth) finger of foot\.[lr]$'),
        'calcaneal_tendon': lit(*sides('Calcaneal tendon')),
        'long_plantar_lig': lit(*sides('Long plantar ligament')),

        'sartorius': lit(*sides('Sartorius muscle')),
        'rectus_femoris': lit(*sides('Rectus femoris muscle')),
        'vastus_lateralis': lit(*sides('Vastus lateralis muscle')),
        'vastus_medialis': lit(*sides('Vastus medialis muscle')),
        'vastus_intermedius': lit(*sides('Vastus intermedius muscle')),
        'biceps_femoris': lit(*sides('Long head of biceps femoris'), *sides('Short head of biceps femoris')),
        'semitendinosus': lit(*sides('Semitendinosus muscle')),
        'semimembranosus': lit(*sides('Semimembranosus muscle')),
        'adductor_longus': lit(*sides('Adductor longus')),
        'adductor_magnus': lit(*sides('Adductor magnus')),
        'gracilis': lit(*sides('Gracilis muscle')),
        'tensor_fasciae_latae': lit(*sides('Tensor fasciae latae')),
        'iliotibial_tract': lit(*sides('Iliotibial tract')),
        'gastrocnemius': lit(*sides('Lateral head of gastrocnemius'), *sides('Medial head of gastrocnemius')),
        'soleus': lit(*sides('Soleus muscle')),
        'plantaris': lit(*sides('Plantaris muscle')),
        'popliteus': lit(*sides('Popliteus muscle')),
        'tibialis_anterior': lit(*sides('Tibialis anterior muscle')),
        'tibialis_posterior': lit(*sides('Tibialis posterior muscle')),
        'fibularis_longus': lit(*sides('Fibularis longus muscle')),
        'fibularis_brevis': lit(*sides('Fibularis brevis muscle')),
        'extensor_digitorum_longus': lit(*sides('Extensor digitorum longus')),
        'flexor_digitorum_longus': lit(*sides('Flexor digitorum longus')),
        'flexor_hallucis_longus': lit(*sides('Flexor hallucis longus')),

        'knee_joint': lit(
            *sides('Articular capsule of knee joint'),
            *sides('Medial meniscus'), *sides('Lateral meniscus'),
        ),
        'anterior_cruciate_ligament': lit(*sides('Anterior cruciate ligament')),
        'posterior_cruciate_ligament': lit(*sides('Posterior cruciate ligament')),
        'medial_collateral_ligament': lit(
            *sides('Superficial part of tibial collateral ligament'),
            *sides('Deep part of tibial collateral ligament'),
        ),
        'lateral_collateral_ligament': lit(*sides('Fibular collateral ligament')),
    },
}

REGIONS = {
    'skull': [
        'frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid',
        'maxilla', 'mandible', 'zygomatic', 'nasal', 'vomer', 'palatine',
    ],
    'spine': [
        'atlas', 'axis', 'cervical_vertebra', 'thoracic_vertebra', 'lumbar_vertebra',
        'sacrum', 'iv_disc', 'iliocostalis', 'longissimus', 'spinalis', 'semispinalis',
        'splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior',
        'anterior_longitudinal_ligament', 'posterior_longitudinal_ligament',
        'ligamentum_flavum', 'supraspinous_ligament', 'nuchal_ligament',
    ],
    'thorax': [
        'sternum', 'ribs', 'costal_cartilages', 'intercostals_external',
        'intercostals_internal', 'intercostals_innermost', 'diaphragm',
        'transversus_thoracis', 'serratus_posterior_superior',
        'serratus_posterior_inferior', 'levatores_costarum',
    ],
    'pelvis': [
        'hip_bone', 'gluteus_maximus', 'gluteus_medius', 'gluteus_minimus',
        'piriformis', 'obturator_internus', 'iliacus', 'psoas_major', 'coccygeus',
        'pubococcygeus', 'iliococcygeus', 'hip_joint', 'pubic_symphysis',
        'sacrotuberous_ligament', 'sacrospinous_ligament', 'iliolumbar_ligament',
        'inguinal_ligament',
    ],
    'upper': [
        'clavicle', 'scapula', 'humerus', 'radius', 'ulna', 'supraspinatus',
        'infraspinatus', 'teres_minor', 'subscapularis', 'deltoid', 'teres_major',
        'pectoralis_major', 'trapezius', 'levator_scapulae', 'rhomboid_major',
        'rhomboid_minor', 'serratus_anterior', 'biceps_brachii', 'brachialis',
        'coracobrachialis', 'triceps_brachii', 'brachioradialis',
        'flexor_carpi_radialis', 'flexor_carpi_ulnaris', 'extensor_digitorum',
        'ac_joint', 'sc_joint', 'coracoclavicular_lig', 'glenohumeral_joint',
        'glenoid_labrum', 'coracohumeral_lig', 'glenohumeral_ligs',
        'transverse_humeral_lig',
    ],
    'abdomen': ['external_oblique', 'linea_alba'],
    'lower': [
        'femur', 'tibia', 'fibula', 'patella', 'tarsal_bones', 'metatarsals',
        'toe_phalanges', 'calcaneal_tendon', 'long_plantar_lig', 'sartorius',
        'rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius',
        'biceps_femoris', 'semitendinosus', 'semimembranosus', 'adductor_longus',
        'adductor_magnus', 'gracilis', 'tensor_fasciae_latae', 'iliotibial_tract',
        'gastrocnemius', 'soleus', 'plantaris', 'popliteus', 'tibialis_anterior',
        'tibialis_posterior', 'fibularis_longus', 'fibularis_brevis',
        'extensor_digitorum_longus', 'flexor_digitorum_longus',
        'flexor_hallucis_longus', 'knee_joint', 'anterior_cruciate_ligament',
        'posterior_cruciate_ligament', 'medial_collateral_ligament',
        'lateral_collateral_ligament',
    ],
}

# Point markers that survive the migration, by region. Ids that are absent here
# and absent from REGIONS are a bug the exporter reports.
MARKERS = {
    'skull': [
        'bregma', 'pterion', 'nasion', 'glabella', 'inion', 'mastoid_process',
        'foramen_magnum', 'foramen_ovale', 'foramen_rotundum', 'foramen_spinosum',
        'jugular_foramen', 'internal_acoustic_meatus', 'optic_canal',
        'superior_orbital_fissure', 'infraorbital_foramen', 'mental_foramen',
    ],
    'spine': ['atlantooccipital_joint', 'atlantoaxial_joint', 'zygapophyseal_joint'],
    'thorax': [
        'costovertebral_joint', 'costotransverse_joint', 'costochondral_joint',
        'sternocostal_joint', 'manubriosternal_joint', 'xiphisternal_joint',
        'radiate_sternocostal_ligament',
    ],
    'pelvis': ['sacroiliac_joint'],
    'upper': [],
    'abdomen': [
        'superficial_inguinal_ring', 'deep_inguinal_ring', 'rectus_sheath', 'arcuate_line',
    ],
    'lower': ['patellar_ligament', 'ankle_joint'],
}

# Markers that should not be snapped to the nearest bone vertex: they live in
# soft tissue away from the anchor bone surface.
NO_SNAP = {
    'superficial_inguinal_ring', 'deep_inguinal_ring', 'rectus_sheath', 'arcuate_line',
    'patellar_ligament',
}
