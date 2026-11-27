// Source: standard anatomy. To be checked against the professor's slides.
// SpeedMSK typing · leg: the three compartments and the structures behind the medial malleolus.
const DFN = ['deep fibular nerve', 'nervo fibular profundo', 'deep peroneal nerve', 'nervo peroneal profundo'];
const SFN = ['superficial fibular nerve', 'nervo fibular superficial', 'superficial peroneal nerve', 'nervo peroneal superficial'];
const TIB = ['tibial nerve', 'nervo tibial'];
const CALC = ['calcaneus', 'calcâneo', 'calcaneal tendon', 'tendão do calcâneo', 'calcaneal tuberosity', 'tuberosidade do calcâneo'];
const NAV = ['navicular', 'navicular tuberosity', 'tuberosidade do navicular'];
const CUN = ['medial cuneiform', 'cuneiforme medial'];
const M1 = ['base of first metatarsal', 'base do primeiro metatarsal'];
const M5 = ['tuberosity of fifth metatarsal', 'tuberosidade do quinto metatarsal', 'base of the fifth metatarsal', 'base do quinto metatarsal'];
const M234 = ['bases of metatarsals 2 to 4', 'bases dos metatarsais 2 a 4'];
const DF = ['dorsiflexion', 'dorsiflexão'];
const PF = ['plantarflexion', 'flexão plantar'];
const INV = ['inversion', 'inversão'];
const EV = ['eversion', 'eversão'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'leg',
  title: ['Leg', 'Perna'],
  sets: [
    {
      id: 'compartments', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'fibula', 'femur'],
      title: ['Leg · innervation by compartment', 'Perna · inervação por compartimento'],
      rule: ['Anterior = deep fibular n. Lateral = superficial fibular n. Posterior = tibial n. The interosseous membrane and the fibula separate the three.',
        'Anterior = n. fibular profundo. Lateral = n. fibular superficial. Posterior = n. tibial. A membrana interóssea e a fíbula separam os três.'],
      items: [
        { id: 'ta-n', d3: { focus: ['tibialis_anterior'], view: 'ant', frame: ['tibialis_anterior', 'tibia'], glass: .12 }, q: n('tibialis anterior', 'tibial anterior'), a: [DFN] },
        { id: 'edl-n', d3: { focus: ['extensor_digitorum_longus'], view: 'ant', frame: ['extensor_digitorum_longus', 'tibia'], glass: .12 }, q: n('extensor digitorum longus', 'extensor longo dos dedos'), a: [DFN] },
        { id: 'ehl-n', d3: { focus: ['extensor_hallucis_longus'], view: 'ant', frame: ['extensor_hallucis_longus','tibia','fibula'], glass: .15 }, q: n('extensor hallucis longus', 'extensor longo do hálux'), a: [DFN] },
        { id: 'ft-n', d3: { focus: ['fibularis_tertius_muscle'], view: 'ant', frame: ['fibularis_tertius_muscle','fibula','metatarsals'], glass: .15 }, q: n('fibularis tertius', 'fibular terceiro'), a: [DFN] },
        { id: 'fl-n', d3: { focus: ['fibularis_longus'], view: 'esq', frame: ['fibularis_longus', 'fibula'], glass: .12 }, q: n('fibularis longus', 'fibular longo'), a: [SFN] },
        { id: 'fb-n', d3: { focus: ['fibularis_brevis'], view: 'esq', frame: ['fibularis_brevis', 'fibula'], glass: .12 }, q: n('fibularis brevis', 'fibular curto'), a: [SFN] },
        { id: 'gast-n', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'femur'], glass: .12 }, q: n('gastrocnemius', 'gastrocnêmio'), a: [TIB] },
        { id: 'sol-n', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tibia'], glass: .12 }, q: n('soleus', 'sóleo'), a: [TIB] },
        { id: 'dfn-m', d3: { focus: ['tibialis_anterior', 'extensor_digitorum_longus'], view: 'ant', frame: ['tibialis_anterior', 'extensor_digitorum_longus', 'tibia'], glass: .12 }, q: ['Which compartment of the leg does the deep fibular nerve supply?', 'Qual compartimento da perna o nervo fibular profundo inerva?'], a: [['anterior compartment', 'compartimento anterior']] },
      ],
    },
    {
      id: 'anterior', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'fibula', 'tarsal_bones'],
      title: ['Anterior compartment · origin, insertion, action', 'Compartimento anterior · origem, inserção, ação'],
      rule: ['All arise from the tibia/fibula and interosseous membrane and cross in front of the ankle. Tibialis anterior inserts medially (inverts); EDL and EHL fan to the toes; fibularis tertius reaches the fifth metatarsal.',
        'Todos vêm da tíbia/fíbula e da membrana interóssea e cruzam a frente do tornozelo. O tibial anterior insere medialmente (inverte); EDL e EHL vão aos dedos; o fibular terceiro chega ao quinto metatarsal.'],
      items: [
        { id: 'ta-o', d3: { focus: ['tibialis_anterior'], view: 'ant', frame: ['tibialis_anterior', 'tibia'], glass: .12 }, q: o('tibialis anterior', 'tibial anterior'), a: [['lateral condyle and upper lateral tibia', 'côndilo lateral e face lateral superior da tíbia', 'upper two thirds of the lateral surface of the tibia', 'dois terços superiores da face lateral da tíbia'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'ta-i', d3: { focus: ['tibialis_anterior'], view: 'ant', frame: ['tibialis_anterior', 'tarsal_bones'], glass: .12 }, q: i('tibialis anterior', 'tibial anterior'), a: [CUN, M1] },
        { id: 'ta-f', d3: { focus: ['tibialis_anterior'], view: 'ant', frame: ['tibialis_anterior', 'tibia'], glass: .12 }, q: f('tibialis anterior', 'tibial anterior'), a: [DF, INV] },
        { id: 'edl-o', d3: { focus: ['extensor_digitorum_longus'], view: 'ant', frame: ['extensor_digitorum_longus', 'tibia'], glass: .12 }, q: o('extensor digitorum longus', 'extensor longo dos dedos'), a: [['lateral tibial condyle', 'côndilo tibial lateral'], ['anterior fibula', 'face anterior da fíbula', 'head and medial surface of the fibula', 'cabeça e face medial da fíbula'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'edl-i', d3: { focus: ['extensor_digitorum_longus'], view: 'ant', frame: ['extensor_digitorum_longus', 'toe_phalanges'], glass: .12 }, q: i('extensor digitorum longus', 'extensor longo dos dedos'), a: [['middle and distal phalanges of toes 2 to 5', 'falanges média e distal dos dedos 2 a 5', 'dorsal aponeuroses of toes 2 to 5', 'aponeuroses dorsais dos dedos 2 a 5']] },
        { id: 'ehl-o', d3: { focus: ['extensor_hallucis_longus'], view: 'ant', frame: ['extensor_hallucis_longus','tibia','fibula'], glass: .15 }, q: o('extensor hallucis longus', 'extensor longo do hálux'), a: [['middle third of the medial surface of the fibula', 'terço médio da face medial da fíbula', 'anterior fibula', 'face anterior da fíbula'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'ehl-i', d3: { focus: ['extensor_hallucis_longus'], view: 'ant', frame: ['extensor_hallucis_longus','tibia','fibula'], glass: .15 }, q: i('extensor hallucis longus', 'extensor longo do hálux'), a: [['base of distal phalanx of great toe', 'base da falange distal do hálux', 'dorsal aponeurosis of the great toe', 'aponeurose dorsal do hálux']] },
        { id: 'ft-i', d3: { focus: ['fibularis_tertius_muscle'], view: 'ant', frame: ['fibularis_tertius_muscle','fibula','metatarsals'], glass: .15 }, q: i('fibularis tertius', 'fibular terceiro'), a: [['base of fifth metatarsal', 'base do quinto metatarsal', 'dorsum of fifth metatarsal', 'dorso do quinto metatarsal']] },
        { id: 'ft-o', d3: { focus: ['fibularis_tertius_muscle'], view: 'ant', frame: ['fibularis_tertius_muscle','fibula','metatarsals'], glass: .15 }, q: o('fibularis tertius', 'fibular terceiro'), a: [['anterior border of the distal fibula', 'borda anterior da fíbula distal']] },
        { id: 'ft-f', d3: { focus: ['fibularis_tertius_muscle'], view: 'ant', frame: ['fibularis_tertius_muscle','fibula','metatarsals'], glass: .15 }, q: f('fibularis tertius', 'fibular terceiro'), a: [DF, EV] },
      ],
    },
    {
      id: 'lateral', d3ctx: ['tibia', 'fibula', 'tarsal_bones', 'metatarsals'], d3anchor: ['tibia', 'fibula'], d3frame: ['fibula', 'tibia', 'tarsal_bones'],
      title: ['Lateral compartment · origin, insertion, action', 'Compartimento lateral · origem, inserção, ação'],
      rule: ['Both arise from the fibula and their tendons pass behind the lateral malleolus, everting the foot. Longus crosses under the sole to the first metatarsal; brevis stops at the fifth.',
        'Ambos vêm da fíbula e seus tendões passam atrás do maléolo lateral, evertendo o pé. O longo cruza sob a planta até o primeiro metatarsal; o curto para no quinto.'],
      items: [
        { id: 'fl-o', d3: { focus: ['fibularis_longus'], view: 'esq', frame: ['fibularis_longus', 'fibula'], glass: .12 }, q: o('fibularis longus', 'fibular longo'), a: [['head and upper lateral fibula', 'cabeça e face lateral superior da fíbula', 'proximal two thirds of the lateral surface of the fibula', 'dois terços proximais da face lateral da fíbula']] },
        { id: 'fl-i', d3: { focus: ['fibularis_longus'], view: 'ant', frame: ['fibularis_longus', 'metatarsals'], glass: .12 }, q: i('fibularis longus', 'fibular longo'), a: [['plantar base of first metatarsal', 'base plantar do primeiro metatarsal'], CUN] },
        { id: 'fb-o', d3: { focus: ['fibularis_brevis'], view: 'esq', frame: ['fibularis_brevis', 'fibula'], glass: .12 }, q: o('fibularis brevis', 'fibular curto'), a: [['lower lateral fibula', 'face lateral inferior da fíbula', 'distal half of the lateral surface of the fibula', 'metade distal da face lateral da fíbula']] },
        { id: 'fb-i', d3: { focus: ['fibularis_brevis'], view: 'esq', frame: ['fibularis_brevis', 'metatarsals'], glass: .12 }, q: i('fibularis brevis', 'fibular curto'), a: [M5] },
        { id: 'lat-f', d3: { focus: ['fibularis_longus', 'fibularis_brevis'], view: 'esq', frame: ['fibularis_longus', 'fibularis_brevis', 'fibula'], glass: .12 }, q: ['Main action of fibularis longus and brevis?', 'Função principal do fibular longo e do fibular curto?'], a: [EV, PF] },
      ],
    },
    {
      id: 'post-superficial', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['femur', 'tibia', 'fibula'],
      title: ['Posterior · superficial layer', 'Posterior · camada superficial'],
      rule: ['Gastrocnemius, soleus and plantaris all converge on the calcaneal tendon. Gastrocnemius is the only one crossing the knee (it has femoral condyles as origin).',
        'Gastrocnêmio, sóleo e plantar convergem no tendão do calcâneo. O gastrocnêmio é o único que cruza o joelho (origem nos côndilos femorais).'],
      items: [
        { id: 'gast-o', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'femur'], glass: .12 }, q: o('gastrocnemius', 'gastrocnêmio'), a: [['medial and lateral epicondyles of the femur', 'epicôndilos medial e lateral do fêmur', 'femoral condyles', 'côndilos femorais', 'above the condyles', 'acima dos côndilos']] },
        { id: 'gast-i', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'tarsal_bones'], glass: .12 }, q: i('gastrocnemius', 'gastrocnêmio'), a: [CALC] },
        { id: 'sol-o', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tibia'], glass: .12 }, q: o('soleus', 'sóleo'), a: [['posterior fibular head and upper third', 'cabeça e terço superior posteriores da fíbula', 'head and neck of the fibula', 'cabeça e colo da fíbula'], ['soleal line of tibia', 'linha do sóleo da tíbia']] },
        { id: 'sol-i', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tarsal_bones'], glass: .12 }, q: i('soleus', 'sóleo'), a: [CALC] },
        { id: 'plant-o', d3: { focus: ['plantaris'], view: 'post', frame: ['plantaris', 'femur'], glass: .12 }, q: o('plantaris', 'plantar'), a: [['lateral epicondyle of the femur', 'epicôndilo lateral do fêmur', 'lateral supracondylar line', 'linha supracondilar lateral', 'oblique popliteal ligament', 'ligamento poplíteo oblíquo']] },
        { id: 'plant-i', d3: { focus: ['plantaris'], view: 'post', frame: ['plantaris', 'tarsal_bones'], glass: .12 }, q: i('plantaris', 'plantar'), a: [CALC] },
        { id: 'plant-f', d3: { focus: ['plantaris'], view: 'post', frame: ['plantaris', 'femur'], glass: .12 }, q: f('plantaris', 'plantar'), a: [['negligible action', 'ação negligenciável', 'negligible', 'negligenciável', 'negligible due to its small cross-section', 'negligenciável pela pequena secção transversa']] },
        { id: 'triceps-f', d3: { focus: ['gastrocnemius', 'soleus'], view: 'post', frame: ['gastrocnemius', 'soleus', 'tibia'], glass: .12 }, q: ['Main action of the triceps surae?', 'Função principal do tríceps sural?'], a: [PF] },
        { id: 'gast-f', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'femur'], glass: .12 }, q: f('gastrocnemius', 'gastrocnêmio'), a: [PF, ['knee flexion', 'flexão do joelho']] },
      ],
    },
    {
      id: 'post-deep', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'fibula', 'tarsal_bones'],
      title: ['Posterior · deep layer', 'Posterior · camada profunda'],
      rule: ['Popliteus caps and unlocks the knee. Tibialis posterior, FDL and FHL pass behind the medial malleolus (Tom, Dick and very nervous Harry) and all support the arches.',
        'O poplíteo trava e destrava o joelho. Tibial posterior, FDL e FHL passam atrás do maléolo medial (Tom, Dick e o nervoso Harry) e sustentam os arcos.'],
      items: [
        { id: 'pop-o', d3: { focus: ['popliteus'], view: 'post', frame: ['popliteus', 'femur'], glass: .12 }, q: o('popliteus', 'poplíteo'), a: [['lateral femoral condyle', 'côndilo femoral lateral', 'popliteal groove', 'sulco poplíteo', 'posterior horn of the lateral meniscus', 'corno posterior do menisco lateral']] },
        { id: 'pop-i', d3: { focus: ['popliteus'], view: 'post', frame: ['popliteus', 'tibia'], glass: .12 }, q: i('popliteus', 'poplíteo'), a: [['posterior tibia above the soleal line', 'tíbia posterior acima da linha do sóleo']] },
        { id: 'pop-n', d3: { focus: ['popliteus'], view: 'post', frame: ['popliteus','femur','tibia'], glass: .15 }, q: n('popliteus', 'poplíteo'), a: [TIB] },
        { id: 'pop-f', d3: { focus: ['popliteus'], view: 'post', frame: ['popliteus', 'femur'], glass: .12 }, q: f('popliteus', 'poplíteo'), a: [['unlocks the knee', 'destrava o joelho'], ['medial rotation of the tibia', 'rotação medial da tíbia', 'internal rotation of the femur', 'rotação interna do fêmur']] },
        { id: 'tp-o', d3: { focus: ['tibialis_posterior'], view: 'post', frame: ['tibialis_posterior', 'tibia'], glass: .12 }, q: o('tibialis posterior', 'tibial posterior'), a: [['posterior tibia and fibula', 'tíbia e fíbula posteriores'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'tp-i', d3: { focus: ['tibialis_posterior'], view: 'post', frame: ['tibialis_posterior', 'tarsal_bones'], glass: .12 }, q: i('tibialis posterior', 'tibial posterior'), a: [NAV, ['cuneiforms', 'cuneiformes', 'cuneiforms and cuboid', 'cuneiformes e cuboide'], M234] },
        { id: 'tp-f', d3: { focus: ['tibialis_posterior'], view: 'post', frame: ['tibialis_posterior', 'tibia'], glass: .12 }, q: f('tibialis posterior', 'tibial posterior'), a: [PF, INV, ['supports the longitudinal and transverse arches of the foot', 'sustenta os arcos longitudinal e transversal do pé', 'supports the medial arch', 'sustenta o arco medial']] },
        { id: 'fdl-o', d3: { focus: ['flexor_digitorum_longus'], view: 'post', frame: ['flexor_digitorum_longus', 'tibia'], glass: .12 }, q: o('flexor digitorum longus', 'flexor longo dos dedos'), a: [['middle third of the posterior surface of the tibia', 'terço médio da face posterior da tíbia']] },
        { id: 'fdl-i', d3: { focus: ['flexor_digitorum_longus'], view: 'post', frame: ['flexor_digitorum_longus', 'toe_phalanges'], glass: .12 }, q: i('flexor digitorum longus', 'flexor longo dos dedos'), a: [['distal phalanges of toes 2 to 5', 'falanges distais dos dedos 2 a 5', 'bases of the distal phalanges of toes 2 to 5', 'bases das falanges distais dos dedos 2 a 5']] },
        { id: 'fhl-o', d3: { focus: ['flexor_hallucis_longus'], view: 'post', frame: ['flexor_hallucis_longus', 'fibula'], glass: .12 }, q: o('flexor hallucis longus', 'flexor longo do hálux'), a: [['distal two thirds of the posterior surface of the fibula', 'dois terços distais da face posterior da fíbula'], ['interosseous membrane', 'membrana interóssea'], ['middle third of the posterior surface of the tibia', 'terço médio da face posterior da tíbia']] },
        { id: 'fhl-i', d3: { focus: ['flexor_hallucis_longus'], view: 'post', frame: ['flexor_hallucis_longus', 'toe_phalanges'], glass: .12 }, q: i('flexor hallucis longus', 'flexor longo do hálux'), a: [['base of distal phalanx of great toe', 'base da falange distal do hálux']] },
      ],
    },
    {
      id: 'medial-malleolus', d3ctx: ['tibia', 'fibula', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'tarsal_bones'],
      title: ['Behind the medial malleolus', 'Atrás do maléolo medial'],
      rule: ['Tom, Dick And Very Nervous Harry, front to back: Tibialis posterior, flexor Digitorum longus, posterior tibial Artery, Vein, tibial Nerve, flexor Hallucis longus.',
        'Tom, Dick, And, Very, Nervous, Harry, de frente para trás: Tibial posterior, flexor longo dos Dedos, Artéria tibial posterior, Veia, Nervo tibial, flexor longo do Hálux.'],
      items: [
        { id: 'tom', extra: true, d3: { focus: ['tibialis_posterior'], view: 'post', frame: ['tibialis_posterior', 'tibia'], glass: .12 }, q: ['First structure behind the medial malleolus?', 'Primeira estrutura atrás do maléolo medial?'], a: [['tibialis posterior tendon', 'tendão do tibial posterior']] },
        { id: 'dick', extra: true, d3: { focus: ['flexor_digitorum_longus'], view: 'post', frame: ['flexor_digitorum_longus', 'tibia'], glass: .12 }, q: ['Second structure behind the medial malleolus?', 'Segunda estrutura atrás do maléolo medial?'], a: [['flexor digitorum longus tendon', 'tendão do flexor longo dos dedos']] },
        { id: 'nerve', extra: true, d3: { focus: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus'], view: 'ant', frame: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus','tibia','tarsal_bones'], glass: .15 }, q: ['Which nerve runs behind the medial malleolus?', 'Qual nervo passa atrás do maléolo medial?'], a: [TIB] },
        { id: 'harry', extra: true, d3: { focus: ['flexor_hallucis_longus'], view: 'post', frame: ['flexor_hallucis_longus', 'tibia'], glass: .12 }, q: ['Last structure behind the medial malleolus?', 'Última estrutura atrás do maléolo medial?'], a: [['flexor hallucis longus tendon', 'tendão do flexor longo do hálux']] },
        { id: 'tdvh', extra: true, d3: { focus: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus'], view: 'ant', frame: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus','tibia','tarsal_bones'], glass: .15 }, q: ['Name the six structures behind the medial malleolus, front to back.', 'Cite as seis estruturas atrás do maléolo medial, de frente para trás.'], a: [['tibialis posterior', 'tibial posterior'], ['flexor digitorum longus', 'flexor longo dos dedos'], ['posterior tibial artery', 'artéria tibial posterior'], ['posterior tibial vein', 'veia tibial posterior'], TIB, ['flexor hallucis longus', 'flexor longo do hálux']] },
      ],
    },
  ],
};
