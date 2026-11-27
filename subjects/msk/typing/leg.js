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
  rewards: true,
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
      rule: ['Gastrocnemius, soleus and plantaris all converge on the calcaneal tendon. Gastrocnemius and plantaris both arise on the femur, so both cross the knee; soleus is the only one acting on the ankle alone.',
        'Gastrocnêmio, sóleo e plantar convergem no tendão do calcâneo. Gastrocnêmio e plantar nascem no fêmur e cruzam o joelho; o sóleo é o único que age só no tornozelo.'],
      items: [
        { id: 'gast-o', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'femur'], glass: .12 }, q: o('gastrocnemius', 'gastrocnêmio'), a: [['medial and lateral epicondyles of the femur', 'epicôndilos medial e lateral do fêmur', 'femoral condyles', 'côndilos femorais', 'above the condyles', 'acima dos côndilos']] },
        { id: 'gast-i', d3: { focus: ['gastrocnemius'], view: 'post', frame: ['gastrocnemius', 'tarsal_bones'], glass: .12 }, q: i('gastrocnemius', 'gastrocnêmio'), a: [CALC] },
        { id: 'sol-o', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tibia'], glass: .12 }, q: o('soleus', 'sóleo'), a: [['posterior fibular head and upper third', 'cabeça e terço superior posteriores da fíbula', 'head and neck of the fibula', 'cabeça e colo da fíbula'], ['soleal line of tibia', 'linha do sóleo da tíbia']] },
        { id: 'sol-i', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tarsal_bones'], glass: .12 }, q: i('soleus', 'sóleo'), a: [CALC] },
        { id: 'plant-o', warn: ["Class material gives the lateral epicondyle (as in Prometheus). Gray's and Moore describe the inferior end of the lateral supracondylar line and the oblique popliteal ligament, just above the epicondyle. All are accepted.", "O material da aula dá o epicôndilo lateral (como no Prometheus). Gray's e Moore descrevem a extremidade inferior da linha supracondilar lateral e o ligamento poplíteo oblíquo, logo acima do epicôndilo. Todos são aceitos."], d3: { focus: ['plantaris'], view: 'post', frame: ['plantaris', 'femur'], glass: .12 }, q: o('plantaris', 'plantar'), a: [['lateral epicondyle of the femur', 'epicôndilo lateral do fêmur', 'lateral supracondylar line', 'linha supracondilar lateral', 'oblique popliteal ligament', 'ligamento poplíteo oblíquo']] },
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
        { id: 'fhl-o', warn: ["Class material also lists the middle third of the posterior tibia. Moore and Gray's give flexor hallucis longus a fibular origin (distal two-thirds of the posterior fibula + interosseous membrane); the posterior tibia is the origin of flexor digitorum longus.", "O material da aula também cita o terço médio da face posterior da tíbia. Moore e Gray's dão ao flexor longo do hálux origem fibular (dois terços distais da face posterior da fíbula + membrana interóssea); a face posterior da tíbia é a origem do flexor longo dos dedos."], d3: { focus: ['flexor_hallucis_longus'], view: 'post', frame: ['flexor_hallucis_longus', 'fibula'], glass: .12 }, q: o('flexor hallucis longus', 'flexor longo do hálux'), a: [['distal two thirds of the posterior surface of the fibula', 'dois terços distais da face posterior da fíbula'], ['interosseous membrane', 'membrana interóssea']] },
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
        { id: 'tdvh', extra: true, d3: { focus: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus'], view: 'ant', frame: ['tibialis_posterior','flexor_digitorum_longus','flexor_hallucis_longus','tibia','tarsal_bones'], glass: .15 }, q: ['Name the six structures behind the medial malleolus.', 'Cite as seis estruturas atrás do maléolo medial.'], a: [['tibialis posterior', 'tibial posterior'], ['flexor digitorum longus', 'flexor longo dos dedos'], ['posterior tibial artery', 'artéria tibial posterior'], ['posterior tibial vein', 'veia tibial posterior'], TIB, ['flexor hallucis longus', 'flexor longo do hálux']] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'fibula', 'femur'],
      title: ['Leg · by landmark', 'Perna · por ponto ósseo'],
      items: [
        { id: 'lm-o-lateral-tibial-condyle', d3: { focus: ['tibialis_anterior', 'extensor_digitorum_longus'], view: 'ant', frame: ['tibialis_anterior', 'tibia'], glass: .12 }, q: ['Which leg muscles originate from the lateral tibial condyle?', 'Quais músculos da perna se originam no côndilo lateral da tíbia?'], a: [['tibialis anterior', 'tibial anterior'], ['extensor digitorum longus', 'extensor longo dos dedos', 'EDL']] },
        { id: 'lm-o-fibular-head', d3: { focus: ['extensor_digitorum_longus', 'fibularis_longus', 'soleus'], view: 'ant', frame: ['extensor_digitorum_longus', 'tibia'], glass: .12 }, q: ['Which leg muscles originate from the head of the fibula?', 'Quais músculos da perna se originam na cabeça da fíbula?'], a: [['extensor digitorum longus', 'extensor longo dos dedos', 'EDL'], ['fibularis longus', 'fibular longo', 'peroneus longus'], ['soleus', 'sóleo', 'soleo']] },
        { id: 'lm-o-lateral-femoral-epicondyle', d3: { focus: ['gastrocnemius', 'plantaris'], view: 'post', frame: ['gastrocnemius', 'femur'], glass: .12 }, q: ['Which leg muscles originate from the lateral epicondyle of the femur?', 'Quais músculos da perna se originam no epicôndilo lateral do fêmur?'], a: [['gastrocnemius', 'gastrocnêmio', 'gastrocnemio'], ['plantaris', 'plantar']] },
        { id: 'lm-o-soleal-line', d3: { focus: ['soleus'], view: 'post', frame: ['soleus', 'tibia'], glass: .12 }, q: ['Which leg muscle originates from the soleal line of the tibia?', 'Qual músculo da perna se origina na linha do sóleo da tíbia?'], a: [['soleus', 'sóleo', 'soleo']] },
        { id: 'lm-i-medial-cuneiform', info: ['tibialis anterior: medial surface; fibularis longus: plantar/lateral surface.', 'tibial anterior: face medial; fibular longo: face plantar/lateral.'], d3: { focus: ['tibialis_anterior', 'fibularis_longus'], view: 'ant', frame: ['tibialis_anterior', 'tarsal_bones'], glass: .12 }, q: ['Which leg muscles insert on the medial cuneiform?', 'Quais músculos da perna se inserem no cuneiforme medial?'], a: [['tibialis anterior', 'tibial anterior'], ['fibularis longus', 'fibular longo', 'peroneus longus']] },
        { id: 'lm-i-fifth-metatarsal-base', info: ['fibularis tertius: dorsum of base; fibularis brevis: tuberosity.', 'fibular terceiro: dorso da base; fibular curto: tuberosidade.'], d3: { focus: ['fibularis_tertius_muscle', 'fibularis_brevis'], view: 'ant', frame: ['fibularis_tertius_muscle', 'fibula', 'metatarsals'], glass: .12 }, q: ['Which leg muscles insert on the base/tuberosity of the fifth metatarsal?', 'Quais músculos da perna se inserem na base/tuberosidade do quinto metatarsal?'], a: [['fibularis tertius', 'fibular terceiro', 'peroneus tertius'], ['fibularis brevis', 'fibular curto', 'peroneus brevis']] },
        { id: 'lm-i-calcaneal-tuberosity', d3: { focus: ['gastrocnemius', 'soleus', 'plantaris'], view: 'post', frame: ['gastrocnemius', 'tarsal_bones'], glass: .12 }, q: ['Which leg muscles insert on the calcaneal tuberosity (calcaneus)?', 'Quais músculos da perna se inserem na tuberosidade do calcâneo (calcâneo)?'], a: [['gastrocnemius', 'gastrocnêmio', 'gastrocnemio'], ['soleus', 'sóleo', 'soleo'], ['plantaris', 'plantar']] },
        { id: 'lm-i-great-toe-distal-phalanx', info: ['extensor hallucis longus: dorsal base; flexor hallucis longus: plantar base.', 'extensor longo do hálux: base dorsal; flexor longo do hálux: base plantar.'], d3: { focus: ['extensor_hallucis_longus', 'flexor_hallucis_longus'], view: 'ant', frame: ['extensor_hallucis_longus', 'tibia', 'fibula'], glass: .12 }, q: ['Which leg muscles insert on the base of the distal phalanx of the great toe?', 'Quais músculos da perna se inserem na base da falange distal do hálux?'], a: [['extensor hallucis longus', 'extensor longo do hálux', 'extensor longo do halux', 'EHL'], ['flexor hallucis longus', 'flexor longo do hálux', 'flexor longo do halux', 'FHL']] },
        { id: 'lm-i-navicular-tuberosity', d3: { focus: ['tibialis_posterior'], view: 'post', frame: ['tibialis_posterior', 'tarsal_bones'], glass: .12 }, q: ['Which leg muscle inserts on the navicular tuberosity?', 'Qual músculo da perna se insere na tuberosidade do navicular?'], a: [['tibialis posterior', 'tibial posterior']] },
      ],
    },
    {
      id: 'by-nerve', d3ctx: ['tibia', 'fibula', 'femur', 'tarsal_bones'], d3anchor: ['tibia', 'fibula'], d3frame: ['tibia', 'fibula', 'femur'],
      title: ['Leg · by nerve', 'Perna · por nervo'],
      items: [
        { id: 'nv-deep-fibular-nerve', d3: { focus: ['tibialis_anterior', 'extensor_digitorum_longus', 'extensor_hallucis_longus', 'fibularis_tertius_muscle'], view: 'ant', frame: ['tibialis_anterior', 'tibia'], glass: .12 }, q: ['Which leg muscles does the deep fibular nerve supply?', 'Quais músculos da perna o nervo fibular profundo inerva?'], a: [['tibialis anterior', 'tibial anterior'], ['extensor digitorum longus', 'extensor longo dos dedos', 'EDL'], ['extensor hallucis longus', 'extensor longo do hálux', 'extensor longo do halux', 'EHL'], ['fibularis tertius', 'fibular terceiro', 'peroneus tertius']] },
        { id: 'nv-superficial-fibular-nerve', d3: { focus: ['fibularis_longus', 'fibularis_brevis'], view: 'esq', frame: ['fibularis_longus', 'fibula'], glass: .12 }, q: ['Which leg muscles does the superficial fibular nerve supply?', 'Quais músculos da perna o nervo fibular superficial inerva?'], a: [['fibularis longus', 'fibular longo', 'peroneus longus'], ['fibularis brevis', 'fibular curto', 'peroneus brevis']] },
      ],
    },
  ],
};
