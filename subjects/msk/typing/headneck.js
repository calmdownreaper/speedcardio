// Source: standard anatomy, checked against the professor's slides 01_skull.pp.105-111.
// Items beyond the class material carry extra: true; disagreements with standard texts carry warn.
const V3 = ['mandibular nerve', 'nervo mandibular', 'v3', 'cn v3'];
const CN7 = ['facial nerve', 'nervo facial', 'cn vii', 'vii', 'facial'];
const CN11 = ['accessory nerve', 'nervo acessório', 'cn xi', 'xi', 'acessório'];
const CN12 = ['hypoglossal nerve', 'nervo hipoglosso', 'cn xii', 'xii', 'hipoglosso'];
const CN10 = ['vagus nerve', 'nervo vago', 'cn x', 'x', 'vago'];
const ELEV = ['elevation of the mandible', 'elevação da mandíbula', 'elevation', 'elevação', 'closes the jaw', 'fecha a mandíbula', 'occludes the teeth', 'oclui os dentes', 'occlusion of the teeth', 'oclusão dos dentes'];
const PROT = ['protrusion of the mandible', 'protrusão da mandíbula', 'protrusion', 'protrusão'];
const GRIND = ['side-to-side grinding', 'trituração', 'grinding', 'movimento de trituração', 'lateral movement of the mandible', 'movimento lateral da mandíbula'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'headneck',
  rewards: true,
  title: ['Head and neck', 'Cabeça e pescoço'],
  sets: [
    {
      id: 'mastication-o-i', d3ctx: ['maxilla', 'mandible', 'sphenoid', 'temporal', 'zygomatic'], d3anchor: ['mandible'], d3frame: ['mandible', 'maxilla'],
      title: ['Mastication · origin and insertion', 'Mastigação · origem e inserção'],
      rule: ['All four closers of the jaw surround the ramus of the mandible. Masseter = the outer one (zygomatic arch → angle + central part of the ramus); temporalis = the fan above (temporal fossa + temporal fascia → medial surface and apex of the coronoid process); the two pterygoids go medial and lateral to the ramus. The lateral pterygoid inserts on the neck of the mandible (pterygoid fovea) and on the articular disc of the TMJ.',
        'Os quatro fechadores da mandíbula rodeiam o ramo. Masseter = o externo (arco zigomático → ângulo + parte central do ramo); temporal = o leque acima (fossa temporal + fáscia temporal → face medial e ápice do processo coronóide); os dois pterigóideos vão medial e lateralmente ao ramo. O pterigóideo lateral insere no colo da mandíbula (fóvea pterigóidea) e no disco articular da ATM.'],
      items: [
        { id: 'mass-o', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: o('masseter', 'masseter'), a: [['zygomatic arch', 'arco zigomático']] },
        { id: 'mass-i', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: i('masseter', 'masseter'), a: [['angle of mandible', 'ângulo da mandíbula', 'angle of the mandible'], ['central part of the ramus', 'parte central do ramo', 'ramus of mandible', 'ramo da mandíbula']] },
        { id: 'temp-o', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: o('temporalis', 'temporal'), a: [['temporal fossa', 'fossa temporal'], ['temporal fascia', 'fáscia temporal']] },
        { id: 'temp-i', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: i('temporalis', 'temporal'), a: [['coronoid process of mandible', 'processo coronóide da mandíbula', 'coronoid process', 'medial surface and apex of the coronoid process', 'face medial e ápice do processo coronóide']] },
        { id: 'medpt-o', d3: { focus: ['medial_pterygoid_muscle'], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .15 }, q: o('medial pterygoid', 'pterigóideo medial'), a: [['pterygoid fossa of sphenoid', 'fossa pterigóidea do esfenoide', 'medial surface of the lateral pterygoid plate', 'face medial da lâmina pterigóidea lateral', 'pterygoid fossa', 'fossa pterigóidea'], ['maxillary tuberosity', 'tuberosidade da maxila', 'maxillary tubercle']] },
        { id: 'medpt-i', d3: { focus: ['medial_pterygoid_muscle'], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .15 }, q: i('medial pterygoid', 'pterigóideo medial'), a: [['medial surface of mandibular ramus', 'face medial do ramo da mandíbula', 'posteroinferior part of the medial surface of the ramus', 'parte posteroinferior da face medial do ramo'], ['angle of mandible', 'ângulo da mandíbula', 'medial angle of mandible', 'ângulo medial da mandíbula']] },
        { id: 'latpt-o', d3: { focus: ['lateral_pterygoid'], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: o('lateral pterygoid', 'pterigóideo lateral'), a: [['lateral pterygoid plate of sphenoid', 'lâmina pterigóidea lateral do esfenoide'], ['greater wing of sphenoid', 'asa maior do esfenoide', 'infratemporal surface and crest of the greater wing', 'face infratemporal e crista da asa maior', 'infratemporal crest', 'crista infratemporal']] },
        { id: 'latpt-i', extra: true, warn: ['Class material gives only the neck of the mandible. Moore and Netter add the articular disc and capsule of the TMJ (superior head).', 'O material da aula dá só o colo da mandíbula. Moore e Netter acrescentam o disco articular e a cápsula da ATM (cabeça superior).'], d3: { focus: ['lateral_pterygoid'], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: i('lateral pterygoid', 'pterigóideo lateral'), a: [['neck of mandible', 'colo da mandíbula', 'neck of the mandible', 'pterygoid fovea', 'fóvea pterigóidea'], ['articular disc of the TMJ', 'disco articular da ATM', 'articular disc', 'disco articular', 'TMJ disc', 'disco da ATM', 'TMJ capsule', 'cápsula da ATM']] },
      ],
    },
    {
      id: 'mastication-action', d3ctx: ['maxilla', 'mandible', 'sphenoid', 'temporal', 'zygomatic'], d3anchor: ['mandible'], d3frame: ['mandible', 'maxilla'],
      title: ['Mastication · action and nerve', 'Mastigação · função e nervo'],
      rule: ['All four muscles of mastication are V3 (mandibular nerve) — the only branch of V that carries motor fibres. Elevators: masseter (occludes the teeth), temporalis, medial pterygoid (elevates + protrudes; unilateral action also grinds). Temporalis retrudes with its posterior fibres and grinds side to side. The lateral pterygoid protrudes and is the only depressor/opener.',
        'Os quatro músculos da mastigação são V3 (nervo mandibular) — o único ramo do V com fibras motoras. Elevadores: masseter (oclui os dentes), temporal, pterigóideo medial (eleva + protrui; a ação unilateral também tritura). O temporal retrui com as fibras posteriores e tritura de um lado para o outro. O pterigóideo lateral protrui e é o único depressor/abre a boca.'],
      items: [
        { id: 'mass-f', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: f('masseter', 'masseter'), a: [ELEV] },
        { id: 'temp-f', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: f('temporalis', 'temporal'), a: [ELEV, GRIND, ['retrusion of the mandible', 'retrusão da mandíbula', 'retraction', 'retração']] },
        { id: 'medpt-f', d3: { focus: ['medial_pterygoid_muscle'], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .15 }, q: f('medial pterygoid', 'pterigóideo medial'), a: [ELEV, PROT] },
        { id: 'latpt-f', d3: { focus: ['lateral_pterygoid'], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: f('lateral pterygoid', 'pterigóideo lateral'), a: [PROT, GRIND] },
        { id: 'mass-n', extra: true, d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: n('masseter', 'masseter'), a: [V3] },
        { id: 'temp-n', extra: true, d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: n('temporalis', 'temporal'), a: [V3] },
        { id: 'pt-n', extra: true, d3: { focus: ['medial_pterygoid_muscle','lateral_pterygoid'], view: 'inf', frame: ['medial_pterygoid_muscle','lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: n('medial and lateral pterygoids', 'pterigóideos medial e lateral'), a: [V3] },
        { id: 'v3-inv', extra: true, d3: { focus: ['masseter','temporalis_muscle','medial_pterygoid_muscle','lateral_pterygoid'], view: 'esq', frame: ['masseter','temporalis_muscle','medial_pterygoid_muscle','lateral_pterygoid','mandible'], glass: .15 }, q: ['Which four muscles of mastication does the mandibular nerve (V3) supply?', 'Quais quatro músculos da mastigação o nervo mandibular (V3) inerva?'], a: [['masseter', 'masseter'], ['temporalis', 'temporal'], ['medial pterygoid', 'pterigóideo medial'], ['lateral pterygoid', 'pterigóideo lateral']] },
      ],
    },
    {
      id: 'expression', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'mandible', 'zygomatic', 'nasal'], d3anchor: ['mandible', 'maxilla'], d3frame: ['mandible', 'maxilla'],
      title: ['Neck · innervation', 'Pescoço · inervação'],
      rule: ['The two "SCM + trapezius" neck muscles = ACCESSORY nerve (XI). Scalene muscles, like the rest of the deep neck, are cervical plexus / anterior rami.',
        'Os dois músculos do pescoço "ECM + trapézio" = nervo ACESSÓRIO (XI). Os escalenos, como o resto do pescoço profundo, são plexo cervical / ramos anteriores.'],
      items: [
        { id: 'scm-n', extra: true, d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: n('sternocleidomastoid', 'esternocleidomastoideo'), a: [CN11] },
        { id: 'trap-n', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'cervical_vertebra'], glass: .15 }, q: n('trapezius', 'trapézio'), a: [CN11] },
        { id: 'scal-n', extra: true, d3: { focus: ['scalenus_anterior'], view: 'ant', frame: ['scalenus_anterior', 'cervical_vertebra'], glass: .15 }, q: n('scalenes', 'escalenos'), a: [['cervical spinal nerves (anterior rami)', 'nervos espinais cervicais (ramos anteriores)', 'anterior rami of cervical nerves', 'ramos anteriores dos nervos cervicais', 'c5-c8']] },
      ],
    },
    {
      id: 'scm-trap-action', d3ctx: ['clavicle', 'scapula', 'cervical_vertebra', 'occipital', 'temporal'], d3anchor: ['clavicle', 'scapula'], d3frame: ['scapula', 'clavicle'],
      title: ['SCM and trapezius · action', 'ECM e trapézio · função'],
      rule: ['SCM turns the head to the OPPOSITE side but tilts it to the SAME side. Trapezius elevates, retracts and rotates the scapula. Both are XI; both also get proprioceptive fibres from C2-C4.',
        'O ECM vira a cabeça para o lado OPOSTO e inclina para o MESMO lado. O trapézio eleva, retrai e roda a escápula. Ambos são XI; ambos também recebem fibras proprioceptivas de C2-C4.'],
      items: [
        { id: 'scm-o', extra: true, d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: o('sternocleidomastoid', 'esternocleidomastoideo'), a: [['manubrium of sternum', 'manúbrio do esterno', 'manubrium', 'manúbrio'], ['medial clavicle', 'clavícula medial', 'medial third of clavicle', 'terço medial da clavícula']] },
        { id: 'scm-i', extra: true, d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: i('sternocleidomastoid', 'esternocleidomastoideo'), a: [['mastoid process', 'processo mastóide'], ['lateral superior nuchal line', 'linha nucal superior lateral']] },
        { id: 'scm-f', extra: true, d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: f('sternocleidomastoid', 'esternocleidomastoideo'), a: [['rotates head to the opposite side', 'roda a cabeça para o lado oposto', 'contralateral rotation of the head', 'rotação contralateral da cabeça'], ['ipsilateral lateral flexion', 'flexão lateral ipsilateral', 'tilts head to the same side', 'inclina a cabeça para o mesmo lado']] },
        { id: 'trap-o', extra: true, d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'cervical_vertebra'], glass: .15 }, q: o('trapezius', 'trapézio'), a: [['occipital bone', 'osso occipital'], ['nuchal ligament', 'ligamento nucal'], ['spinous processes of C7-T12', 'processos espinhosos de C7-T12', 'spinous processes of vertebrae', 'processos espinhosos']] },
        { id: 'trap-i', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'scapula'], glass: .15 }, q: i('trapezius', 'trapézio'), a: [['lateral clavicle', 'clavícula lateral'], ['acromion', 'acrômio'], ['spine of scapula', 'espinha da escápula', 'scapular spine']] },
        { id: 'trap-f', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'scapula'], glass: .15 }, q: f('trapezius', 'trapézio'), a: [['elevation of the scapula', 'elevação da escápula'], ['retraction of the scapula', 'retração da escápula', 'adduction of the scapula', 'adução da escápula'], ['upward rotation of the scapula', 'rotação superior da escápula']] },
      ],
    },
    {
      id: 'hyoid', d3ctx: ['mandible', 'temporal', 'clavicle', 'sternum', 'cervical_vertebra'], d3anchor: ['mandible'], d3frame: ['mandible', 'cervical_vertebra'],
      title: ['Suprahyoid and infrahyoid', 'Supra-hióideos e infra-hióideos'],
      rule: ['SUPRAhyoid muscles sit ABOVE the hyoid and connect it to the mandible and the skull base. Four of them: digastric, stylohyoid, mylohyoid and geniohyoid. INFRAhyoid lie below (sternohyoid, sternothyroid, thyrohyoid, omohyoid) and pull it back down.',
        'Os músculos SUPRA-hióideos ficam ACIMA do hioide e o ligam à mandíbula e à base do crânio. São quatro: digástrico, estilo-hióideo, milo-hióideo e genio-hióideo. Os INFRA-hióideos ficam abaixo (esterno-hióideo, esterno-tireóideo, tíreo-hióideo, omo-hióideo) e o puxam de volta para baixo.'],
      items: [
        { id: 'supra-list', extra: true, warn: ["Class material lists only digastric and stylohyoid. Moore and Gray's count four suprahyoid muscles: digastric, stylohyoid, mylohyoid and geniohyoid.", "O material da aula lista só digástrico e estilo-hióideo. Moore e Gray's contam quatro supra-hióideos: digástrico, estilo-hióideo, milo-hióideo e genio-hióideo."], d3: { focus: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle'], view: 'esq', frame: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle','mandible'], glass: .15 }, q: ['Which muscles are suprahyoid?', 'Quais músculos são supra-hióideos?'], a: [['digastric', 'digástrico'], ['stylohyoid', 'estilo-hióideo'], ['mylohyoid', 'milo-hióideo'], ['geniohyoid', 'genio-hióideo']] },
        { id: 'infra-list', d3: { focus: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle'], view: 'ant', frame: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle','mandible','clavicle'], glass: .15 }, q: ['Which muscles are infrahyoid?', 'Quais músculos são infra-hióideos?'], a: [['sternohyoid', 'esterno-hióideo'], ['sternothyroid', 'esterno-tireóideo'], ['thyrohyoid', 'tíreo-hióideo'], ['omohyoid', 'omo-hióideo']] },
        { id: 'supra-f', extra: true, d3: { focus: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle'], view: 'esq', frame: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle','mandible'], glass: .15 }, q: f('suprahyoid muscles', 'músculos supra-hióideos'), a: [['elevation of the hyoid', 'elevação do hioide'], ['depression of the mandible', 'depressão da mandíbula', 'opens the jaw', 'abre a mandíbula']] },
        { id: 'infra-f', extra: true, d3: { focus: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle'], view: 'ant', frame: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle','mandible','clavicle'], glass: .15 }, q: f('infrahyoid muscles', 'músculos infra-hióideos'), a: [['depression of the hyoid', 'depressão do hioide', 'depress the hyoid', 'deprimem o hioide']] },
        { id: 'mylo-n', extra: true, d3: { focus: ['mylohyoid_muscle'], view: 'inf', frame: ['mylohyoid_muscle','mandible'], glass: .15 }, q: n('mylohyoid', 'milo-hióideo'), a: [['nerve to mylohyoid', 'nervo do milo-hióideo', 'mylohyoid nerve', 'branch of inferior alveolar nerve', 'ramo do nervo alveolar inferior']] },
      ],
    },
    {
      id: 'tongue', d3ctx: ['mandible', 'temporal', 'occipital', 'sphenoid', 'cervical_vertebra'], d3anchor: ['mandible'], d3frame: ['mandible', 'cervical_vertebra'],
      title: ['Tongue and palate · innervation', 'Língua e palato · inervação'],
      rule: ['The tongue muscles are hypoglossal (XII), except palatoglossus, which is vagus (X) via the pharyngeal plexus. For taste, not movement: anterior two-thirds = chorda tympani (VII), posterior third = glossopharyngeal (IX).',
        'Os músculos da língua são hipoglosso (XII), exceto o palatoglosso, que é vago (X) pelo plexo faríngeo. Para o paladar, não o movimento: dois terços anteriores = corda do tímpano (VII), terço posterior = glossofaríngeo (IX).'],
      items: [
        { id: 'tongue-n', extra: true, d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Innervation of the tongue muscles (all except palatoglossus)?', 'Inervação dos músculos da língua (todos exceto o palatoglosso)?'], a: [CN12] },
        { id: 'genio-n', extra: true, d3: { focus: ['genioglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','mandible'], glass: .15 }, q: n('genioglossus', 'genioglosso'), a: [CN12] },
        { id: 'stylo-n', d3: { focus: ['temporal'], view: 'esq', frame: ['mandible','temporal'], glass: .15 }, q: n('styloglossus', 'estiloglosso'), a: [CN12] },
        { id: 'xii-inv', extra: true, d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Which tongue muscles does the hypoglossal nerve (XII) supply?', 'Quais músculos da língua o nervo hipoglosso (XII) inerva?'], a: [['genioglossus', 'genioglosso'], ['styloglossus', 'estiloglosso'], ['hyoglossus', 'hioglosso'], ['all intrinsic tongue muscles', 'todos os músculos intrínsecos da língua', 'intrinsic tongue muscles', 'músculos intrínsecos da língua']] },
        { id: 'taste-ant', extra: true, d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Taste of the anterior two-thirds of the tongue is carried by which nerve?', 'O paladar dos dois terços anteriores da língua é levado por qual nervo?'], a: [['chorda tympani (facial nerve, VII)', 'corda do tímpano (nervo facial, VII)', 'chorda tympani', 'corda do tímpano', 'facial nerve', 'nervo facial']] },
        { id: 'taste-post', extra: true, d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Taste of the posterior third of the tongue is carried by which nerve?', 'O paladar do terço posterior da língua é levado por qual nervo?'], a: [['glossopharyngeal nerve (IX)', 'nervo glossofaríngeo (IX)', 'glossopharyngeal nerve', 'nervo glossofaríngeo', 'ix', 'cn ix']] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['maxilla', 'mandible', 'sphenoid', 'temporal', 'zygomatic'], d3anchor: ['mandible'], d3frame: ['mandible', 'maxilla'],
      title: ["Head and neck · by landmark", "Cabeça e pescoço · por ponto ósseo"],
      items: [
        { id: 'lm-o-zygomatic-arch', d3: { focus: ["masseter"], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .12 }, q: ["Which head and neck muscle originates from the zygomatic arch?", "Qual músculo da cabeça e pescoço se origina no arco zigomático?"], a: [["masseter"]] },
        { id: 'lm-o-temporal-fossa', d3: { focus: ["temporalis_muscle"], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .12 }, q: ["Which head and neck muscle originates from the temporal fossa?", "Qual músculo da cabeça e pescoço se origina na fossa temporal?"], a: [["temporalis", "temporal"]] },
        { id: 'lm-o-lateral-pterygoid-plate', d3: { focus: ["medial_pterygoid_muscle", "lateral_pterygoid"], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .12 }, q: ["Which head and neck muscles originate from the lateral pterygoid plate?", "Quais músculos da cabeça e pescoço se originam na lâmina pterigóidea lateral?"], a: [["medial pterygoid", "pterigóideo medial", "pterigoideo medial"], ["lateral pterygoid", "pterigóideo lateral", "pterigoideo lateral"]] },
        { id: 'lm-o-pterygoid-fossa', d3: { focus: ["medial_pterygoid_muscle"], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .12 }, q: ["Which head and neck muscle originates from the pterygoid fossa?", "Qual músculo da cabeça e pescoço se origina na fossa pterigóidea?"], a: [["medial pterygoid", "pterigóideo medial", "pterigoideo medial"]] },
        { id: 'lm-o-maxillary-tuberosity', d3: { focus: ["medial_pterygoid_muscle"], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .12 }, q: ["Which head and neck muscle originates from the maxillary tuberosity?", "Qual músculo da cabeça e pescoço se origina na tuberosidade da maxila?"], a: [["medial pterygoid", "pterigóideo medial", "pterigoideo medial"]] },
        { id: 'lm-o-greater-wing-of-sphenoid', d3: { focus: ["lateral_pterygoid"], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .12 }, q: ["Which head and neck muscle originates from the greater wing of sphenoid?", "Qual músculo da cabeça e pescoço se origina na asa maior do esfenoide?"], a: [["lateral pterygoid", "pterigóideo lateral", "pterigoideo lateral"]] },
        { id: 'lm-o-manubrium-of-sternum', d3: { focus: ["sternocleidomastoid_muscle", "sternohyoid_muscle", "sternothyroid_muscle"], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .12 }, q: ["Which head and neck muscles originate from the manubrium of sternum?", "Quais músculos da cabeça e pescoço se originam no manúbrio do esterno?"], a: [["sternocleidomastoid", "esternocleidomastoideo"], ["sternohyoid", "esterno-hióideo", "esterno-hioideo"], ["sternothyroid", "esterno-tireóideo", "esterno-tireoideo"]] },
        { id: 'lm-i-angle-of-mandible', d3: { focus: ["masseter", "medial_pterygoid_muscle"], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .12 }, q: ["Which head and neck muscles insert on the angle of mandible?", "Quais músculos da cabeça e pescoço se inserem no ângulo da mandíbula?"], a: [["masseter"], ["medial pterygoid", "pterigóideo medial", "pterigoideo medial"]] },
        { id: 'lm-i-ramus-of-mandible', d3: { focus: ["masseter", "medial_pterygoid_muscle"], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .12 }, q: ["Which head and neck muscles insert on the ramus of mandible?", "Quais músculos da cabeça e pescoço se inserem no ramo da mandíbula?"], a: [["masseter"], ["medial pterygoid", "pterigóideo medial", "pterigoideo medial"]] },
        { id: 'lm-i-coronoid-process-of-mandible', d3: { focus: ["temporalis_muscle"], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .12 }, q: ["Which head and neck muscle inserts on the coronoid process of mandible?", "Qual músculo da cabeça e pescoço se insere no processo coronoide da mandíbula?"], a: [["temporalis", "temporal"]] },
        { id: 'lm-i-neck-of-mandible', d3: { focus: ["lateral_pterygoid"], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .12 }, q: ["Which head and neck muscle inserts on the neck of mandible?", "Qual músculo da cabeça e pescoço se insere no colo da mandíbula?"], a: [["lateral pterygoid", "pterigóideo lateral", "pterigoideo lateral"]] },
        { id: 'lm-i-mastoid-process', d3: { focus: ["sternocleidomastoid_muscle"], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .12 }, q: ["Which head and neck muscle inserts on the mastoid process?", "Qual músculo da cabeça e pescoço se insere no processo mastoide?"], a: [["sternocleidomastoid", "esternocleidomastoideo"]] },
        { id: 'lm-i-superior-nuchal-line', d3: { focus: ["sternocleidomastoid_muscle"], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .12 }, q: ["Which head and neck muscle inserts on the superior nuchal line?", "Qual músculo da cabeça e pescoço se insere na linha nucal superior?"], a: [["sternocleidomastoid", "esternocleidomastoideo"]] },
        { id: 'lm-i-acromion', d3: { focus: ["trapezius"], view: 'post', frame: ['trapezius', 'scapula'], glass: .12 }, q: ["Which head and neck muscle inserts on the acromion?", "Qual músculo da cabeça e pescoço se insere no acrômio?"], a: [["trapezius", "trapézio", "trapezio"]] },
        { id: 'lm-i-spine-of-scapula', d3: { focus: ["trapezius"], view: 'post', frame: ['trapezius', 'scapula'], glass: .12 }, q: ["Which head and neck muscle inserts on the spine of scapula?", "Qual músculo da cabeça e pescoço se insere na espinha da escápula?"], a: [["trapezius", "trapézio", "trapezio"]] },
      ],
    },
    {
      id: 'by-nerve', d3ctx: ['maxilla', 'mandible', 'sphenoid', 'temporal', 'zygomatic'], d3anchor: ['mandible'], d3frame: ['mandible', 'maxilla'],
      title: ["Head and neck · by nerve", "Cabeça e pescoço · por nervo"],
      items: [
        { id: 'nv-accessory-nerve', d3: { focus: ["sternocleidomastoid_muscle", "trapezius"], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .12 }, q: ["Which head and neck muscles does the accessory nerve supply?", "Quais músculos da cabeça e pescoço o nervo acessório inerva?"], a: [["sternocleidomastoid", "esternocleidomastoideo"], ["trapezius", "trapézio", "trapezio"]] },
      ],
    },
  ],
};
