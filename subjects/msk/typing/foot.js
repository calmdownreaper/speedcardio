// Source: standard anatomy. To be checked against the professor's slides.
// SpeedMSK typing · foot: plantar layers and the brevis extensors.
const MPN = ['medial plantar nerve', 'nervo plantar medial'];
const LPN = ['lateral plantar nerve', 'nervo plantar lateral'];
const DFN = ['deep fibular nerve', 'nervo fibular profundo', 'deep peroneal nerve', 'nervo peroneal profundo'];
const CALC = ['calcaneus', 'calcâneo', 'calcaneal tuberosity', 'tuberosidade do calcâneo'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'foot',
  title: ['Foot', 'Pé'],
  sets: [
    {
      id: 'layer1-nerves', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges', 'tibia', 'fibula'], d3anchor: ['tarsal_bones', 'metatarsals'], d3frame: ['tarsal_bones', 'metatarsals'],
      title: ['Plantar layer 1 · innervation', 'Camada plantar 1 · inervação'],
      rule: ['Medial plantar n. = abductor hallucis, flexor digitorum brevis and flexor hallucis brevis; everything else on the sole is lateral plantar n.',
        'N. plantar medial = abdutor do hálux, flexor curto dos dedos e flexor curto do hálux; todo o resto da planta é do n. plantar lateral.'],
      items: [
        { id: 'ah-n', q: n('abductor hallucis', 'abdutor do hálux'), a: [MPN] },
        { id: 'fdb-n', q: n('flexor digitorum brevis', 'flexor curto dos dedos'), a: [MPN] },
        { id: 'fhb-n', q: n('flexor hallucis brevis', 'flexor curto do hálux'), a: [MPN] },
        { id: 'adqm-n', q: ['Innervation of abductor digiti minimi and quadratus plantae?', 'Inervação do abdutor do dedo mínimo e do quadrado plantar?'], a: [LPN] },
        { id: 'lumb-n', q: ['Innervation of the lumbricals?', 'Inervação dos lumbricais?'], a: [['medial plantar nerve (1st)', 'nervo plantar medial (1º)', 'medial plantar nerve', 'nervo plantar medial'], ['lateral plantar nerve (2nd-4th)', 'nervo plantar lateral (2º-4º)', 'lateral plantar nerve', 'nervo plantar lateral']] },
        { id: 'mpn-m', q: ['Which muscles does the medial plantar nerve supply (4)?', 'Quais músculos o nervo plantar medial inerva (4)?'], a: [['abductor hallucis', 'abdutor do hálux'], ['flexor digitorum brevis', 'flexor curto dos dedos'], ['flexor hallucis brevis', 'flexor curto do hálux'], ['first lumbrical', 'primeiro lumbrical']] },
      ],
    },
    {
      id: 'layer1-oi', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges', 'tibia', 'fibula'], d3anchor: ['tarsal_bones', 'metatarsals'], d3frame: ['tarsal_bones', 'metatarsals'],
      title: ['Plantar layer 1 · origin and insertion', 'Camada plantar 1 · origem e inserção'],
      rule: ['The first layer sends three bellies from the calcaneal tuberosity — abductor hallucis medially, flexor digitorum brevis in the middle, abductor digiti minimi laterally.',
        'A primeira camada manda três ventres da tuberosidade do calcâneo — abdutor do hálux medialmente, flexor curto dos dedos no meio, abdutor do dedo mínimo lateralmente.'],
      items: [
        { id: 'ah-o', q: o('abductor hallucis', 'abdutor do hálux'), a: [CALC, ['medial process of calcaneal tuberosity', 'processo medial da tuberosidade do calcâneo']] },
        { id: 'ah-i', q: i('abductor hallucis', 'abdutor do hálux'), a: [['base of proximal phalanx of great toe', 'base da falange proximal do hálux'], ['medial sesamoid', 'sesamoide medial']] },
        { id: 'fdb-o', q: o('flexor digitorum brevis', 'flexor curto dos dedos'), a: [CALC] },
        { id: 'fdb-i', q: i('flexor digitorum brevis', 'flexor curto dos dedos'), a: [['middle phalanges of toes 2 to 5', 'falanges médias dos dedos 2 a 5']] },
        { id: 'adqm-o', q: o('abductor digiti minimi', 'abdutor do dedo mínimo'), a: [CALC] },
        { id: 'adqm-i', q: i('abductor digiti minimi', 'abdutor do dedo mínimo'), a: [['base of proximal phalanx of fifth toe', 'base da falange proximal do quinto dedo']] },
        { id: 'qp-o', q: o('quadratus plantae', 'quadrado plantar'), a: [CALC] },
        { id: 'qp-i', q: i('quadratus plantae', 'quadrado plantar'), a: [['tendon of flexor digitorum longus', 'tendão do flexor longo dos dedos']] },
      ],
    },
    {
      id: 'layer2-3', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges', 'tibia', 'fibula'], d3anchor: ['tarsal_bones', 'metatarsals'], d3frame: ['tarsal_bones', 'metatarsals', 'toe_phalanges'],
      title: ['Plantar layers 2–3 · lumbricals and flexor hallucis brevis', 'Camadas plantares 2–3 · lumbricais e flexor curto do hálux'],
      rule: ['Lumbricals attach to the FDL tendons and extend the toes. Flexor hallucis brevis splits into two bellies around the flexor hallucis longus tendon, each with its own sesamoid.',
        'Os lumbricais ligam-se aos tendões do FDL e estendem os dedos. O flexor curto do hálux divide-se em dois ventres em torno do tendão do flexor longo do hálux, cada um com seu sesamoide.'],
      items: [
        { id: 'lumb-o', q: o('lumbricals', 'lumbricais'), a: [['tendons of flexor digitorum longus', 'tendões do flexor longo dos dedos']] },
        { id: 'lumb-i', q: i('lumbricals', 'lumbricais'), a: [['dorsal expansions of toes 2 to 5', 'expansões dorsais dos dedos 2 a 5'], ['proximal phalanges of toes 2 to 5', 'falanges proximais dos dedos 2 a 5']] },
        { id: 'lumb-f', q: f('lumbricals', 'lumbricais'), a: [['flex the metatarsophalangeal joints', 'flexionam as articulações metatarsofalângicas'], ['extend the interphalangeal joints', 'estendem as articulações interfalângicas']] },
        { id: 'fhb-o', q: o('flexor hallucis brevis', 'flexor curto do hálux'), a: [['plantar surface of cuboid', 'face plantar do cuboide'], ['lateral cuneiform', 'cuneiforme lateral']] },
        { id: 'fhb-i', q: i('flexor hallucis brevis', 'flexor curto do hálux'), a: [['proximal phalanx of great toe', 'falange proximal do hálux'], ['medial and lateral sesamoids', 'sesamoides medial e lateral']] },
      ],
    },
    {
      id: 'layer4', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges', 'tibia', 'fibula'], d3anchor: ['tarsal_bones', 'metatarsals'], d3frame: ['metatarsals', 'toe_phalanges', 'tarsal_bones'],
      title: ['Plantar layer 4 · adductor hallucis and interossei', 'Camada plantar 4 · adutor do hálux e interósseos'],
      rule: ['The deepest layer crosses the metatarsals in a transverse head (adductor hallucis) and in the interosseous spaces. The interossei are plantar flexors of the MTP joints that also abduct or adduct toward the second toe.',
        'A camada profunda cruza os metatarsais por um ventre transverso (adutor do hálux) e pelos espaços interósseos. Os interósseos fletem as articulações MTF e também abduzem ou aduzem rumo ao segundo dedo.'],
      items: [
        { id: 'adh-o', q: o('adductor hallucis', 'adutor do hálux'), a: [['tendons of flexor digitorum longus', 'tendões do flexor longo dos dedos'], ['plantar metatarsals', 'metatarsais plantares']] },
        { id: 'adh-i', q: i('adductor hallucis', 'adutor do hálux'), a: [['proximal phalanx of great toe', 'falange proximal do hálux'], ['lateral sesamoid', 'sesamoide lateral']] },
        { id: 'adh-n', q: n('adductor hallucis', 'adutor do hálux'), a: [LPN] },
        { id: 'int-o', q: o('interossei', 'interósseos'), a: [['metatarsal shafts', 'diáfises metatarsais']] },
        { id: 'int-i', q: i('interossei', 'interósseos'), a: [['proximal phalanges and dorsal expansions', 'falanges proximais e expansões dorsais']] },
        { id: 'int-f', q: ['Main action of the plantar interossei vs dorsal interossei?', 'Função principal dos interósseos plantares vs dorsais?'], a: [['plantar interossei adduct', 'interósseos plantares aduzem'], ['dorsal interossei abduct', 'interósseos dorsais abduzem'], ['flex the metatarsophalangeal joints', 'flexionam as articulações metatarsofalângicas']] },
        { id: 'int-n', q: n('interossei', 'interósseos'), a: [LPN] },
      ],
    },
    {
      id: 'dorsum', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges', 'tibia', 'fibula'], d3anchor: ['tarsal_bones'], d3frame: ['tarsal_bones', 'metatarsals'],
      title: ['Dorsum · extensor digitorum brevis', 'Dorso · extensor curto dos dedos'],
      rule: ['The only intrinsic muscle on the dorsum, the extensor digitorum brevis, is the only foot muscle supplied by the deep fibular nerve.',
        'O único músculo intrínseco do dorso, o extensor curto dos dedos, é o único músculo do pé inervado pelo nervo fibular profundo.'],
      items: [
        { id: 'edb-o', q: o('extensor digitorum brevis', 'extensor curto dos dedos'), a: [['dorsal calcaneus', 'calcâneo dorsal'], ['inferior extensor retinaculum', 'retináculo extensor inferior']] },
        { id: 'edb-i', q: i('extensor digitorum brevis', 'extensor curto dos dedos'), a: [['dorsal aponeurosis of toes 2 to 4', 'aponeurose dorsal dos dedos 2 a 4'], ['base of proximal phalanx of great toe', 'base da falange proximal do hálux']] },
        { id: 'edb-n', q: n('extensor digitorum brevis', 'extensor curto dos dedos'), a: [DFN] },
        { id: 'edb-f', q: f('extensor digitorum brevis', 'extensor curto dos dedos'), a: [['extends toes 2 to 4', 'estende os dedos 2 a 4'], ['extends the great toe', 'estende o hálux']] },
        { id: 'dfn-m', q: ['Which foot muscles does the deep fibular nerve supply?', 'Quais músculos do pé o nervo fibular profundo inerva?'], a: [['extensor digitorum brevis', 'extensor curto dos dedos'], ['extensor hallucis brevis', 'extensor curto do hálux']] },
      ],
    },
    {
      id: 'arches', d3ctx: ['tarsal_bones', 'metatarsals', 'toe_phalanges'], d3anchor: ['tarsal_bones'], d3frame: ['tarsal_bones', 'metatarsals'],
      title: ['Plantar muscles · action', 'Músculos plantares · função'],
      rule: ['Plantar intrinsics flex the toes at the MTP joints and steady the arches; the abductors pull the toes away from the second toe.',
        'Os intrínsecos plantares fletem os dedos nas articulações MTF e estabilizam os arcos; os abdutores afastam os dedos do segundo dedo.'],
      items: [
        { id: 'ah-f', q: f('abductor hallucis', 'abdutor do hálux'), a: [['abducts the great toe', 'abduz o hálux'], ['flexes the great toe', 'flexiona o hálux']] },
        { id: 'fdb-f', q: f('flexor digitorum brevis', 'flexor curto dos dedos'), a: [['flexes toes 2 to 5', 'flexiona os dedos 2 a 5']] },
        { id: 'qp-f', q: f('quadratus plantae', 'quadrado plantar'), a: [['straightens the pull of FDL', 'corrige a tração do FDL'], ['assists toe flexion', 'auxilia a flexão dos dedos']] },
        { id: 'adh-f', q: f('adductor hallucis', 'adutor do hálux'), a: [['adducts the great toe', 'aduz o hálux'], ['flexes the great toe', 'flexiona o hálux']] },
        { id: 'pf-all', q: ['Which muscles hold the longitudinal arch?', 'Quais músculos sustentam o arco longitudinal?'], a: [['tibialis posterior', 'tibial posterior'], ['flexor hallucis longus', 'flexor longo do hálux'], ['flexor digitorum longus', 'flexor longo dos dedos'], ['abductor hallucis', 'abdutor do hálux']] },
      ],
    },
  ],
};
