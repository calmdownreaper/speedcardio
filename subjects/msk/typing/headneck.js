// Source: standard anatomy, checked against the professor's slides 01_skull.pp.105-111.
// Required answers follow the slides; extras the slides omit are named in each set's rule.
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
  title: ['Head and neck', 'Cabeça e pescoço'],
  sets: [
    {
      id: 'mastication-o-i', d3ctx: ['maxilla', 'mandible', 'sphenoid', 'temporal', 'zygomatic'], d3anchor: ['mandible'], d3frame: ['mandible', 'maxilla'],
      title: ['Mastication · origin and insertion', 'Mastigação · origem e inserção'],
      rule: ['All four closers of the jaw surround the ramus of the mandible. Masseter = the outer one (zygomatic arch → angle + central part of the ramus); temporalis = the fan above (temporal fossa + temporal fascia → medial surface and apex of the coronoid process); the two pterygoids go medial and lateral to the ramus. Asked: only the neck of the mandible for the lateral pterygoid; standard texts (Netter/Moore) also give the articular disc of the TMJ.',
        'Os quatro fechadores da mandíbula rodeiam o ramo. Masseter = o externo (arco zigomático → ângulo + parte central do ramo); temporal = o leque acima (fossa temporal + fáscia temporal → face medial e ápice do processo coronóide); os dois pterigóideos vão medial e lateralmente ao ramo. Cobrado: só o colo da mandíbula para o pterigóideo lateral; os textos padrão (Netter/Moore) dão também o disco articular da ATM.'],
      items: [
        { id: 'mass-o', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: o('masseter', 'masseter'), a: [['zygomatic arch', 'arco zigomático']] },
        { id: 'mass-i', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: i('masseter', 'masseter'), a: [['angle of mandible', 'ângulo da mandíbula', 'angle of the mandible'], ['central part of the ramus', 'parte central do ramo', 'ramus of mandible', 'ramo da mandíbula']] },
        { id: 'temp-o', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: o('temporalis', 'temporal'), a: [['temporal fossa', 'fossa temporal'], ['temporal fascia', 'fáscia temporal']] },
        { id: 'temp-i', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: i('temporalis', 'temporal'), a: [['coronoid process of mandible', 'processo coronóide da mandíbula', 'coronoid process', 'medial surface and apex of the coronoid process', 'face medial e ápice do processo coronóide']] },
        { id: 'medpt-o', d3: { focus: ['medial_pterygoid_muscle'], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .15 }, q: o('medial pterygoid', 'pterigóideo medial'), a: [['pterygoid fossa of sphenoid', 'fossa pterigóidea do esfenoide', 'medial pterygoid plate of sphenoid', 'lâmina pterigóidea medial do esfenoide', 'pterygoid fossa', 'fossa pterigóidea'], ['maxillary tuberosity', 'tuberosidade da maxila', 'maxillary tubercle']] },
        { id: 'medpt-i', d3: { focus: ['medial_pterygoid_muscle'], view: 'inf', frame: ['medial_pterygoid_muscle','sphenoid','mandible'], glass: .15 }, q: i('medial pterygoid', 'pterigóideo medial'), a: [['medial surface of mandibular ramus', 'face medial do ramo da mandíbula', 'posteroinferior part of the medial surface of the ramus', 'parte posteroinferior da face medial do ramo'], ['angle of mandible', 'ângulo da mandíbula', 'medial angle of mandible', 'ângulo medial da mandíbula']] },
        { id: 'latpt-o', d3: { focus: ['lateral_pterygoid'], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: o('lateral pterygoid', 'pterigóideo lateral'), a: [['lateral pterygoid plate of sphenoid', 'lâmina pterigóidea lateral do esfenoide'], ['greater wing of sphenoid', 'asa maior do esfenoide', 'infratemporal surface and crest of the greater wing', 'face infratemporal e crista da asa maior', 'infratemporal crest', 'crista infratemporal']] },
        { id: 'latpt-i', d3: { focus: ['lateral_pterygoid'], view: 'inf', frame: ['lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: i('lateral pterygoid', 'pterigóideo lateral'), a: [['neck of mandible', 'colo da mandíbula', 'neck of the mandible']] },
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
        { id: 'mass-n', d3: { focus: ['masseter'], view: 'esq', frame: ['masseter','mandible','zygomatic'], glass: .15 }, q: n('masseter', 'masseter'), a: [V3] },
        { id: 'temp-n', d3: { focus: ['temporalis_muscle'], view: 'esq', frame: ['temporalis_muscle','temporal','mandible'], glass: .15 }, q: n('temporalis', 'temporal'), a: [V3] },
        { id: 'pt-n', d3: { focus: ['medial_pterygoid_muscle','lateral_pterygoid'], view: 'inf', frame: ['medial_pterygoid_muscle','lateral_pterygoid','sphenoid','mandible'], glass: .15 }, q: n('medial and lateral pterygoids', 'pterigóideos medial e lateral'), a: [V3] },
        { id: 'v3-inv', d3: { focus: ['masseter','temporalis_muscle','medial_pterygoid_muscle','lateral_pterygoid'], view: 'esq', frame: ['masseter','temporalis_muscle','medial_pterygoid_muscle','lateral_pterygoid','mandible'], glass: .15 }, q: ['Which four muscles of mastication does the mandibular nerve (V3) supply?', 'Quais quatro músculos da mastigação o nervo mandibular (V3) inerva?'], a: [['masseter', 'masseter'], ['temporalis', 'temporal'], ['medial pterygoid', 'pterigóideo medial'], ['lateral pterygoid', 'pterigóideo lateral']] },
      ],
    },
    {
      id: 'expression', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'mandible', 'zygomatic', 'nasal'], d3anchor: ['mandible', 'maxilla'], d3frame: ['mandible', 'maxilla'],
      title: ['Neck · innervation', 'Pescoço · inervação'],
      rule: ['The two "SCM + trapezius" neck muscles = ACCESSORY nerve (XI). Scalene muscles, like the rest of the deep neck, are cervical plexus / anterior rami.',
        'Os dois músculos do pescoço "ECM + trapézio" = nervo ACESSÓRIO (XI). Os escalenos, como o resto do pescoço profundo, são plexo cervical / ramos anteriores.'],
      items: [
        { id: 'scm-n', d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: n('sternocleidomastoid', 'esternocleidomastoideo'), a: [CN11] },
        { id: 'trap-n', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'cervical_vertebra'], glass: .15 }, q: n('trapezius', 'trapézio'), a: [CN11] },
        { id: 'scal-n', d3: { focus: ['scalenus_anterior'], view: 'ant', frame: ['scalenus_anterior', 'cervical_vertebra'], glass: .15 }, q: n('scalenes', 'escalenos'), a: [['cervical spinal nerves (anterior rami)', 'nervos espinais cervicais (ramos anteriores)', 'anterior rami of cervical nerves', 'ramos anteriores dos nervos cervicais', 'c5-c8']] },
      ],
    },
    {
      id: 'scm-trap-action', d3ctx: ['clavicle', 'scapula', 'cervical_vertebra', 'occipital', 'temporal'], d3anchor: ['clavicle', 'scapula'], d3frame: ['scapula', 'clavicle'],
      title: ['SCM and trapezius · action', 'ECM e trapézio · função'],
      rule: ['SCM turns the head to the OPPOSITE side but tilts it to the SAME side. Trapezius elevates, retracts and rotates the scapula. Both are XI; both also get proprioceptive fibres from C2-C4.',
        'O ECM vira a cabeça para o lado OPOSTO e inclina para o MESMO lado. O trapézio eleva, retrai e roda a escápula. Ambos são XI; ambos também recebem fibras proprioceptivas de C2-C4.'],
      items: [
        { id: 'scm-o', d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: o('sternocleidomastoid', 'esternocleidomastoideo'), a: [['manubrium of sternum', 'manúbrio do esterno', 'manubrium', 'manúbrio'], ['medial clavicle', 'clavícula medial', 'medial third of clavicle', 'terço medial da clavícula']] },
        { id: 'scm-i', d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: i('sternocleidomastoid', 'esternocleidomastoideo'), a: [['mastoid process', 'processo mastóide'], ['lateral superior nuchal line', 'linha nucal superior lateral']] },
        { id: 'scm-f', d3: { focus: ['sternocleidomastoid_muscle'], view: 'esq', frame: ['sternocleidomastoid_muscle','temporal','clavicle'], glass: .15 }, q: f('sternocleidomastoid', 'esternocleidomastoideo'), a: [['rotates head to the opposite side', 'roda a cabeça para o lado oposto', 'contralateral rotation of the head', 'rotação contralateral da cabeça'], ['ipsilateral lateral flexion', 'flexão lateral ipsilateral', 'tilts head to the same side', 'inclina a cabeça para o mesmo lado']] },
        { id: 'trap-o', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'cervical_vertebra'], glass: .15 }, q: o('trapezius', 'trapézio'), a: [['occipital bone', 'osso occipital'], ['nuchal ligament', 'ligamento nucal'], ['spinous processes of C7-T12', 'processos espinhosos de C7-T12', 'spinous processes of vertebrae', 'processos espinhosos']] },
        { id: 'trap-i', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'scapula'], glass: .15 }, q: i('trapezius', 'trapézio'), a: [['lateral clavicle', 'clavícula lateral'], ['acromion', 'acrômio'], ['spine of scapula', 'espinha da escápula', 'scapular spine']] },
        { id: 'trap-f', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'scapula'], glass: .15 }, q: f('trapezius', 'trapézio'), a: [['elevation of the scapula', 'elevação da escápula'], ['retraction of the scapula', 'retração da escápula', 'adduction of the scapula', 'adução da escápula'], ['upward rotation of the scapula', 'rotação superior da escápula']] },
      ],
    },
    {
      id: 'hyoid', d3ctx: ['mandible', 'temporal', 'clavicle', 'sternum', 'cervical_vertebra'], d3anchor: ['mandible'], d3frame: ['mandible', 'cervical_vertebra'],
      title: ['Suprahyoid and infrahyoid', 'Supra-hióideos e infra-hióideos'],
      rule: ['SUPRAhyoid muscles sit ABOVE the hyoid and connect it to the mandible and the skull base. Asked here: digastric + stylohyoid (mylohyoid and geniohyoid are also suprahyoid). INFRAhyoid lie below (sternohyoid, sternothyroid, thyrohyoid, omohyoid) and pull it back down.',
        'Os músculos SUPRA-hióideos ficam ACIMA do hioide e o ligam à mandíbula e à base do crânio. Cobrados aqui: digástrico + estilo-hióideo (milo-hióideo e genio-hióideo também são supra-hióideos). Os INFRA-hióideos ficam abaixo (esterno-hióideo, esterno-tireóideo, tíreo-hióideo, omo-hióideo) e o puxam de volta para baixo.'],
      items: [
        { id: 'supra-list', d3: { focus: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle'], view: 'esq', frame: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle','mandible'], glass: .15 }, q: ['Which muscles are suprahyoid?', 'Quais músculos são supra-hióideos?'], a: [['digastric', 'digástrico'], ['stylohyoid', 'estilo-hióideo'], ['mylohyoid', 'milo-hióideo'], ['geniohyoid', 'genio-hióideo']] },
        { id: 'infra-list', d3: { focus: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle'], view: 'ant', frame: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle','mandible','clavicle'], glass: .15 }, q: ['Which muscles are infrahyoid?', 'Quais músculos são infra-hióideos?'], a: [['sternohyoid', 'esterno-hióideo'], ['sternothyroid', 'esterno-tireóideo'], ['thyrohyoid', 'tíreo-hióideo'], ['omohyoid', 'omo-hióideo']] },
        { id: 'supra-f', d3: { focus: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle'], view: 'esq', frame: ['digastric','stylohyoid_muscle','mylohyoid_muscle','geniohyoid_muscle','mandible'], glass: .15 }, q: f('suprahyoid muscles', 'músculos supra-hióideos'), a: [['elevation of the hyoid', 'elevação do hioide'], ['depression of the mandible', 'depressão da mandíbula', 'opens the jaw', 'abre a mandíbula']] },
        { id: 'infra-f', d3: { focus: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle'], view: 'ant', frame: ['sternohyoid_muscle','omohyoid_muscle','sternothyroid_muscle','thyrohyoid_muscle','mandible','clavicle'], glass: .15 }, q: f('infrahyoid muscles', 'músculos infra-hióideos'), a: [['depression of the hyoid', 'depressão do hioide', 'depress the hyoid', 'deprimem o hioide']] },
        { id: 'mylo-n', d3: { focus: ['mylohyoid_muscle'], view: 'inf', frame: ['mylohyoid_muscle','mandible'], glass: .15 }, q: n('mylohyoid', 'milo-hióideo'), a: [['nerve to mylohyoid', 'nervo do milo-hióideo', 'mylohyoid nerve', 'branch of inferior alveolar nerve', 'ramo do nervo alveolar inferior']] },
      ],
    },
    {
      id: 'tongue', d3ctx: ['mandible', 'temporal', 'occipital', 'sphenoid', 'cervical_vertebra'], d3anchor: ['mandible'], d3frame: ['mandible', 'cervical_vertebra'],
      title: ['Tongue and palate · innervation', 'Língua e palato · inervação'],
      rule: ['The tongue muscles are hypoglossal (XII). For taste, not movement: anterior two-thirds = chorda tympani (VII), posterior third = glossopharyngeal (IX).',
        'Os músculos da língua são hipoglosso (XII). Para o paladar, não o movimento: dois terços anteriores = corda do tímpano (VII), terço posterior = glossofaríngeo (IX).'],
      items: [
        { id: 'tongue-n', d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: n('intrinsic and extrinsic tongue muscles', 'músculos intrínsecos e extrínsecos da língua'), a: [CN12] },
        { id: 'genio-n', d3: { focus: ['genioglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','mandible'], glass: .15 }, q: n('genioglossus', 'genioglosso'), a: [CN12] },
        { id: 'stylo-n', d3: { focus: ['hyoglossus_muscle'], view: 'esq', frame: ['hyoglossus_muscle','mandible','temporal'], glass: .15 }, q: n('styloglossus', 'estiloglosso'), a: [CN12] },
        { id: 'xii-inv', d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Which tongue muscles does the hypoglossal nerve (XII) supply?', 'Quais músculos da língua o nervo hipoglosso (XII) inerva?'], a: [['genioglossus', 'genioglosso'], ['styloglossus', 'estiloglosso'], ['hyoglossus', 'hioglosso'], ['all intrinsic tongue muscles', 'todos os músculos intrínsecos da língua', 'intrinsic tongue muscles', 'músculos intrínsecos da língua']] },
        { id: 'taste-ant', d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Taste of the anterior two-thirds of the tongue is carried by which nerve?', 'O paladar dos dois terços anteriores da língua é levado por qual nervo?'], a: [['chorda tympani (facial nerve, VII)', 'corda do tímpano (nervo facial, VII)', 'chorda tympani', 'corda do tímpano', 'facial nerve', 'nervo facial']] },
        { id: 'taste-post', d3: { focus: ['genioglossus_muscle','hyoglossus_muscle'], view: 'esq', frame: ['genioglossus_muscle','hyoglossus_muscle','mandible'], glass: .15 }, q: ['Taste of the posterior third of the tongue is carried by which nerve?', 'O paladar do terço posterior da língua é levado por qual nervo?'], a: [['glossopharyngeal nerve (IX)', 'nervo glossofaríngeo (IX)', 'glossopharyngeal nerve', 'nervo glossofaríngeo', 'ix', 'cn ix']] },
      ],
    },
  ],
};
