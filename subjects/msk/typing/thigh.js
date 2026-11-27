// Source: standard anatomy. To be checked against the professor's slides.
// SpeedMSK typing · thigh: quadriceps, hamstrings, adductors and the pes anserinus.
const FEM = ['femoral nerve', 'nervo femoral'];
const OBT = ['obturator nerve', 'nervo obturatório'];
const TIB = ['tibial division of the sciatic nerve', 'divisão tibial do nervo isquiático', 'tibial nerve', 'nervo tibial'];
const CFN = ['common fibular division of the sciatic nerve', 'divisão fibular comum do nervo isquiático', 'common peroneal division', 'nervo fibular comum'];
const IT = ['ischial tuberosity', 'túber isquiático', 'tuberosidade isquiática'];
const PAT = ['patella', 'patela'];
const TT = ['tibial tuberosity', 'tuberosidade da tíbia'];
const LA = ['linea aspera', 'linha áspera'];
const PES = ['proximal medial tibia', 'tíbia medial proximal', 'pes anserinus', 'pata de ganso'];
const EXT = ['knee extension', 'extensão do joelho'];
const FLEX = ['knee flexion', 'flexão do joelho'];
const HEXT = ['hip extension', 'extensão do quadril'];
const ADD = ['adduction', 'adução'];
const LR = ['lateral rotation', 'rotação lateral', 'external rotation', 'rotação externa'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'thigh',
  title: ['Thigh', 'Coxa'],
  sets: [
    {
      id: 'quads-oi', d3ctx: ['femur', 'tibia', 'patella', 'hip_bone'], d3anchor: ['femur', 'patella'], d3frame: ['femur', 'tibia', 'patella'],
      title: ['Quadriceps · origin and insertion', 'Quadríceps · origem e inserção'],
      rule: ['All four converge on the patella, then reach the tibial tuberosity through the patellar ligament. Rectus femoris is the only head from the ilium (AIIS); the vasti arise from the femoral shaft and linea aspera.',
        'Os quatro convergem na patela e chegam à tuberosidade da tíbia pelo ligamento patelar. O reto femoral é o único cabeça vindo do ílio (EIAI); os vastos vêm da diáfise femoral e da linha áspera.'],
      items: [
        { id: 'rf-o', d3: { focus: ['rectus_femoris'], view: 'ant', frame: ['rectus_femoris', 'hip_bone'], glass: .12 }, q: o('rectus femoris', 'reto femoral'), a: [['anterior inferior iliac spine', 'espinha ilíaca anteroinferior', 'AIIS'], ['groove above the acetabulum', 'sulco acima do acetábulo', 'acetabular roof', 'teto do acetábulo']] },
        { id: 'rf-i', d3: { focus: ['rectus_femoris'], view: 'ant', frame: ['rectus_femoris', 'patella'], glass: .12 }, q: i('rectus femoris', 'reto femoral'), a: [[...PAT, 'base of patella', 'base da patela'], TT] },
        { id: 'vl-o', d3: { focus: ['vastus_lateralis'], view: 'ant', frame: ['vastus_lateralis', 'femur'], glass: .12 }, q: o('vastus lateralis', 'vasto lateral'), a: [['greater trochanter', 'trocânter maior'], ['lateral lip of linea aspera', 'lábio lateral da linha áspera']] },
        { id: 'vl-i', d3: { focus: ['vastus_lateralis'], view: 'ant', frame: ['vastus_lateralis', 'patella'], glass: .12 }, q: i('vastus lateralis', 'vasto lateral'), a: [['lateral border of patella', 'borda lateral da patela', 'quadriceps tendon', 'tendão do quadríceps']] },
        { id: 'vm-o', d3: { focus: ['vastus_medialis'], view: 'ant', frame: ['vastus_medialis', 'femur'], glass: .12 }, q: o('vastus medialis', 'vasto medial'), a: [['intertrochanteric line', 'linha intertrocantérica'], ['medial lip of linea aspera', 'lábio medial da linha áspera']] },
        { id: 'vm-i', d3: { focus: ['vastus_medialis'], view: 'ant', frame: ['vastus_medialis', 'patella'], glass: .12 }, q: i('vastus medialis', 'vasto medial'), a: [['medial border of patella', 'borda medial da patela', 'quadriceps tendon', 'tendão do quadríceps']] },
        { id: 'vi-o', d3: { focus: ['vastus_intermedius'], view: 'ant', frame: ['vastus_intermedius', 'femur'], glass: .12 }, q: o('vastus intermedius', 'vasto intermédio'), a: [['anterior surface of the femoral shaft', 'face anterior da diáfise femoral', 'anterior and lateral surfaces of the femoral shaft', 'faces anterior e lateral da diáfise femoral']] },
        { id: 'vi-i', d3: { focus: ['vastus_intermedius'], view: 'ant', frame: ['vastus_intermedius', 'patella'], glass: .12 }, q: i('vastus intermedius', 'vasto intermédio'), a: [['upper border of patella', 'borda superior da patela', 'quadriceps tendon', 'tendão do quadríceps']] },
      ],
    },
    {
      id: 'hamstrings-oi', d3ctx: ['femur', 'tibia', 'fibula', 'hip_bone'], d3anchor: ['femur', 'tibia'], d3frame: ['femur', 'tibia', 'fibula'],
      title: ['Hamstrings · origin and insertion', 'Isquiotibiais · origem e inserção'],
      rule: ['All three share the ischial tuberosity — except the short head of biceps, the only hamstring from the femur. Biceps goes to the fibular head; the two medial ones to the medial tibia.',
        'Os três compartilham o túber isquiático — exceto a cabeça curta do bíceps, única porção femoral. O bíceps vai à cabeça da fíbula; os dois mediais, à tíbia medial.'],
      items: [
        { id: 'bf-lo', d3: { focus: ['biceps_femoris'], view: 'post', frame: ['biceps_femoris', 'hip_bone'], glass: .12 }, q: ['Origin of the long head of biceps femoris?', 'Origem da cabeça longa do bíceps femoral?'], a: [['ischial tuberosity', 'túber isquiático', 'tuberosidade isquiática', 'sacrotuberous ligament', 'ligamento sacrotuberal']] },
        { id: 'bf-so', d3: { focus: ['biceps_femoris'], view: 'post', frame: ['biceps_femoris', 'femur'], glass: .12 }, q: ['Origin of the short head of biceps femoris?', 'Origem da cabeça curta do bíceps femoral?'], a: [['lateral lip of linea aspera', 'lábio lateral da linha áspera'], ['lateral supracondylar line', 'linha supracondilar lateral']] },
        { id: 'bf-i', d3: { focus: ['biceps_femoris'], view: 'post', frame: ['biceps_femoris', 'fibula'], glass: .12 }, q: i('biceps femoris', 'bíceps femoral'), a: [['fibular head', 'cabeça da fíbula']] },
        { id: 'st-o', d3: { focus: ['semitendinosus'], view: 'post', frame: ['semitendinosus', 'hip_bone'], glass: .12 }, q: o('semitendinosus', 'semitendíneo'), a: [['ischial tuberosity', 'túber isquiático', 'tuberosidade isquiática', 'sacrotuberous ligament', 'ligamento sacrotuberal']] },
        { id: 'st-i', d3: { focus: ['semitendinosus'], view: 'post', frame: ['semitendinosus', 'tibia'], glass: .12 }, q: i('semitendinosus', 'semitendíneo'), a: [PES] },
        { id: 'sm-o', d3: { focus: ['semimembranosus'], view: 'post', frame: ['semimembranosus', 'hip_bone'], glass: .12 }, q: o('semimembranosus', 'semimembranoso'), a: [IT] },
        { id: 'sm-i', d3: { focus: ['semimembranosus'], view: 'post', frame: ['semimembranosus', 'tibia'], glass: .12 }, q: i('semimembranosus', 'semimembranoso'), a: [['posterior part of medial tibial condyle', 'parte posterior do côndilo tibial medial', 'medial tibial condyle', 'côndilo tibial medial'], ['oblique popliteal ligament', 'ligamento poplíteo oblíquo'], ['popliteus fascia', 'fáscia do poplíteo']] },
      ],
    },
    {
      id: 'adductors-oi', d3ctx: ['femur', 'hip_bone', 'tibia'], d3anchor: ['femur', 'hip_bone'], d3frame: ['femur', 'hip_bone'],
      title: ['Adductors · origin and insertion', 'Adutores · origem e inserção'],
      rule: ['Nearly all arise from the pubis or ischiopubic ramus and insert along the linea aspera — except gracilis, which runs past it to the medial tibia. Adductor magnus is the widest, reaching the adductor tubercle.',
        'Quase todos vêm do púbis ou do ramo isquiopúbico e inserem na linha áspera — exceto o grácil, que passa dela para a tíbia medial. O adutor magno é o mais largo e chega ao tubérculo adutor.'],
      items: [
        { id: 'al-o', d3: { focus: ['adductor_longus'], view: 'ant', frame: ['adductor_longus', 'hip_bone'], glass: .12 }, q: o('adductor longus', 'adutor longo'), a: [['superior pubic ramus and anterior surface of the pubic symphysis', 'ramo superior do púbis e face anterior da sínfise púbica', 'body of pubis', 'corpo do púbis', 'below the pubic crest', 'abaixo da crista púbica']] },
        { id: 'al-i', d3: { focus: ['adductor_longus'], view: 'ant', frame: ['adductor_longus', 'femur'], glass: .12 }, q: i('adductor longus', 'adutor longo'), a: [['middle third of linea aspera', 'terço médio da linha áspera', 'medial lip of the middle third of the linea aspera', 'lábio medial do terço médio da linha áspera']] },
        { id: 'am-o', d3: { focus: ['adductor_magnus'], view: 'post', frame: ['adductor_magnus', 'hip_bone'], glass: .12 }, q: o('adductor magnus', 'adutor magno'), a: [['ischiopubic ramus', 'ramo isquiopúbico'], IT] },
        { id: 'am-i', d3: { focus: ['adductor_magnus'], view: 'post', frame: ['adductor_magnus', 'femur'], glass: .12 }, q: i('adductor magnus', 'adutor magno'), a: [['linea aspera', 'linha áspera', 'medial lip of linea aspera', 'lábio medial da linha áspera'], ['adductor tubercle', 'tubérculo adutor']] },
        { id: 'gr-o', d3: { focus: ['gracilis'], view: 'ant', frame: ['gracilis', 'hip_bone'], glass: .12 }, q: o('gracilis', 'grácil'), a: [['inferior pubic ramus', 'ramo inferior do púbis', 'below the pubic symphysis', 'abaixo da sínfise púbica', 'body and inferior ramus of pubis', 'corpo e ramo inferior do púbis']] },
        { id: 'gr-i', d3: { focus: ['gracilis'], view: 'ant', frame: ['gracilis', 'tibia'], glass: .12 }, q: i('gracilis', 'grácil'), a: [PES] },
      ],
    },
    {
      id: 'adductor-brevis-pectineus', d3ctx: ['femur', 'hip_bone', 'tibia'], d3anchor: ['femur', 'hip_bone'], d3frame: ['femur', 'hip_bone'],
      title: ['Adductor brevis and pectineus · origin, insertion, action', 'Adutor curto e pectíneo · origem, inserção e ação'],
      rule: ['Pectineus and adductor brevis lie one behind the other, from the pubis to the linea aspera. Pectineus is the odd one: femoral nerve and external rotation; adductor brevis is obturator and only adducts and flexes.',
        'Pectíneo e adutor curto ficam um atrás do outro, do púbis à linha áspera. O pectíneo é a exceção: nervo femoral e rotação externa; o adutor curto é obturatório e apenas aduz e flete.'],
      items: [
        { id: 'pect-o', q: o('pectineus', 'pectíneo'), a: [['pecten pubis', 'pectíneo do púbis', 'pectineal line of the pubis', 'linha pectínea do púbis']] },
        { id: 'pect-i', q: i('pectineus', 'pectíneo'), a: [['pectineal line of the femur', 'linha pectínea do fêmur'], ['proximal linea aspera', 'linha áspera proximal']] },
        { id: 'pect-f', q: f('pectineus', 'pectíneo'), a: [ADD, LR, ['slight flexion', 'flexão discreta', 'flexion', 'flexão']] },
        { id: 'ab-o', q: o('adductor brevis', 'adutor curto'), a: [['inferior pubic ramus', 'ramo inferior do púbis']] },
        { id: 'ab-i', q: i('adductor brevis', 'adutor curto'), a: [['medial lip of the linea aspera in the upper third', 'lábio medial da linha áspera no terço superior']] },
        { id: 'ab-n', q: n('adductor brevis', 'adutor curto'), a: [OBT] },
        { id: 'ab-f', q: f('adductor brevis', 'adutor curto'), a: [ADD, ['flexion', 'flexão']] },
      ],
    },
    {
      id: 'nerves', d3ctx: ['femur', 'tibia', 'fibula', 'hip_bone'], d3anchor: ['femur', 'tibia'], d3frame: ['femur', 'tibia', 'fibula'],
      title: ['Thigh · innervation', 'Coxa · inervação'],
      rule: ['Anterior compartment = femoral n. Medial compartment = obturator n. Posterior compartment = tibial division of the sciatic n. — except the short head of biceps, the only common fibular part.',
        'Compartimento anterior = n. femoral. Compartimento medial = n. obturatório. Compartimento posterior = divisão tibial do n. isquiático — exceto a cabeça curta do bíceps, única parte fibular comum.'],
      items: [
        { id: 'sart-n', d3: { focus: ['sartorius'], view: 'ant', frame: ['sartorius', 'femur'], glass: .12 }, q: n('sartorius', 'sartório'), a: [FEM] },
        { id: 'quads-n', d3: { focus: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius'], view: 'ant', frame: ['rectus_femoris', 'vastus_lateralis', 'femur'], glass: .12 }, q: ['Innervation of the quadriceps femoris?', 'Inervação do quadríceps femoral?'], a: [FEM] },
        { id: 'al-n', d3: { focus: ['adductor_longus'], view: 'ant', frame: ['adductor_longus', 'femur'], glass: .12 }, q: n('adductor longus', 'adutor longo'), a: [OBT] },
        { id: 'am-n', d3: { focus: ['adductor_magnus'], view: 'post', frame: ['adductor_magnus', 'femur'], glass: .12 }, q: ['Innervation of adductor magnus (both parts)?', 'Inervação do adutor magno (ambas as partes)?'], a: [OBT, TIB] },
        { id: 'gr-n', d3: { focus: ['gracilis'], view: 'ant', frame: ['gracilis', 'femur'], glass: .12 }, q: n('gracilis', 'grácil'), a: [OBT] },
        { id: 'pect-n', q: n('pectineus', 'pectíneo'), a: [[...FEM, ...OBT]] },
        { id: 'bf-n', d3: { focus: ['biceps_femoris'], view: 'post', frame: ['biceps_femoris', 'femur'], glass: .12 }, q: ['Innervation of the two heads of biceps femoris?', 'Inervação das duas cabeças do bíceps femoral?'], a: [TIB, CFN] },
        { id: 'obt-m', q: ['Which muscles does the obturator nerve supply?', 'Quais músculos o nervo obturatório inerva?'], a: [['adductor longus', 'adutor longo'], ['adductor brevis', 'adutor curto'], ['adductor magnus (adductor part)', 'adutor magno (parte adutora)'], ['gracilis', 'grácil'], ['obturator externus', 'obturador externo']] },
      ],
    },
    {
      id: 'actions', d3ctx: ['femur', 'tibia', 'hip_bone'], d3anchor: ['femur', 'tibia'], d3frame: ['femur', 'tibia'],
      title: ['Thigh · action', 'Coxa · função'],
      rule: ['Quadriceps = the only knee extensors. Hamstrings extend the hip and flex the knee. Adductors pull the thigh to the midline, and gracilis and sartorius also flex the knee.',
        'Quadríceps = únicos extensores do joelho. Isquiotibiais estendem o quadril e fletem o joelho. Adutores levam a coxa à linha média, e grácil e sartório também fletem o joelho.'],
      items: [
        { id: 'quads-f', d3: { focus: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'vastus_intermedius'], view: 'ant', frame: ['rectus_femoris', 'vastus_lateralis', 'femur'], glass: .12 }, q: f('quadriceps femoris', 'quadríceps femoral'), a: [EXT] },
        { id: 'rf-f', d3: { focus: ['rectus_femoris'], view: 'ant', frame: ['rectus_femoris', 'femur'], glass: .12 }, q: f('rectus femoris', 'reto femoral'), a: [EXT, ['hip flexion', 'flexão do quadril']] },
        { id: 'sart-f', d3: { focus: ['sartorius'], view: 'ant', frame: ['sartorius', 'femur'], glass: .12 }, q: f('sartorius', 'sartório'), a: [['hip flexion', 'flexão do quadril'], ['abduction', 'abdução'], ['lateral rotation', 'rotação lateral', 'external rotation', 'rotação externa'], FLEX, ['knee internal rotation', 'rotação interna do joelho', 'medial rotation of the knee', 'rotação medial do joelho']] },
        { id: 'bf-f', d3: { focus: ['biceps_femoris'], view: 'post', frame: ['biceps_femoris', 'femur'], glass: .12 }, q: f('biceps femoris', 'bíceps femoral'), a: [HEXT, FLEX, ['knee lateral rotation', 'rotação lateral do joelho', 'external rotation of the knee', 'rotação externa do joelho']] },
        { id: 'st-f', d3: { focus: ['semitendinosus', 'semimembranosus'], view: 'post', frame: ['semitendinosus', 'femur'], glass: .12 }, q: ['Main action of semitendinosus and semimembranosus?', 'Função principal do semitendíneo e do semimembranoso?'], a: [HEXT, FLEX, ['medial rotation of the flexed knee', 'rotação medial do joelho fletido']] },
        { id: 'add-f', d3: { focus: ['adductor_longus', 'adductor_magnus', 'gracilis'], view: 'ant', frame: ['adductor_longus', 'adductor_magnus', 'femur'], glass: .12 }, q: ['Main action of the adductor group?', 'Função principal do grupo adutor?'], a: [ADD] },
      ],
    },
    {
      id: 'pes-anserinus', d3ctx: ['femur', 'tibia', 'hip_bone'], d3anchor: ['femur', 'tibia'], d3frame: ['femur', 'tibia'],
      title: ['Pes anserinus', 'Pata de ganso'],
      rule: ['Pes anserinus = SGT: Sartorius, Gracilis, Semitendinosus — three tendons inserting together on the proximal medial tibia.',
        'Pata de ganso = SGT: Sartório, Grácil, Semitendíneo — três tendões inserindo juntos na tíbia medial proximal.'],
      items: [
        { id: 'sart-o', d3: { focus: ['sartorius'], view: 'ant', frame: ['sartorius', 'hip_bone'], glass: .12 }, q: o('sartorius', 'sartório'), a: [['anterior superior iliac spine', 'espinha ilíaca anterossuperior', 'ASIS'], ['notch below the ASIS', 'incisura abaixo da EIAS']] },
        { id: 'sart-i', d3: { focus: ['sartorius'], view: 'ant', frame: ['sartorius', 'tibia'], glass: .12 }, q: i('sartorius', 'sartório'), a: [PES] },
        { id: 'pes-m', q: ['Which three muscles insert at the pes anserinus?', 'Quais três músculos inserem na pata de ganso?'], a: [['sartorius', 'sartório'], ['gracilis', 'grácil'], ['semitendinosus', 'semitendíneo']] },
        { id: 'pes-loc', q: ['Where is the pes anserinus?', 'Onde fica a pata de ganso?'], a: [PES] },
      ],
    },
  ],
};
