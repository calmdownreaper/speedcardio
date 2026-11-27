// Source: standard anatomy. To be checked against the professor's slides.
// SpeedMSK typing · hip: gluteal muscles, deep lateral rotators and iliopsoas.
const SUPG = ['superior gluteal nerve', 'nervo glúteo superior'];
const INFG = ['inferior gluteal nerve', 'nervo glúteo inferior'];
const SACR = ['direct branches of the sacral plexus', 'ramos diretos do plexo sacral'];
const PIRN = ['nerve to piriformis', 'nervo do piriforme', 'nervo para o piriforme', ...SACR];
const OIN = ['nerve to obturator internus', 'nervo do obturador interno', 'nervo para o obturador interno', ...SACR];
const QFN = ['nerve to quadratus femoris', 'nervo do quadrado femoral', 'nervo para o quadrado femoral', ...SACR];
const IT = ['ischial tuberosity', 'túber isquiático', 'tuberosidade isquiática'];
const ABD = ['abduction', 'abdução'];
const MR = ['medial rotation', 'rotação medial', 'internal rotation', 'rotação interna'];
const LR = ['lateral rotation', 'rotação lateral', 'external rotation', 'rotação externa'];
const EXT = ['hip extension', 'extensão do quadril'];
const FLEX = ['hip flexion', 'flexão do quadril'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'hip',
  rewards: true,
  title: ['Hip', 'Quadril'],
  sets: [
    {
      id: 'gluteal-nerves', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Gluteal muscles · innervation', 'Músculos glúteos · inervação'],
      rule: ['Gluteus maximus = inferior gluteal n. Gluteus medius, gluteus minimus and tensor fasciae latae = superior gluteal n.',
        'Glúteo máximo = n. glúteo inferior. Glúteo médio, glúteo mínimo e tensor da fáscia lata = n. glúteo superior.'],
      items: [
        { id: 'gmax-n', d3: { focus: ['gluteus_maximus'], view: 'post', frame: ['gluteus_maximus', 'hip_bone'], glass: .12 }, q: n('gluteus maximus', 'glúteo máximo'), a: [INFG] },
        { id: 'gmed-n', d3: { focus: ['gluteus_medius'], view: 'post', frame: ['gluteus_medius', 'hip_bone'], glass: .12 }, q: n('gluteus medius', 'glúteo médio'), a: [SUPG] },
        { id: 'gmin-n', d3: { focus: ['gluteus_minimus'], view: 'post', frame: ['gluteus_minimus', 'hip_bone'], glass: .12 }, q: n('gluteus minimus', 'glúteo mínimo'), a: [SUPG] },
        { id: 'tfl-n', d3: { focus: ['tensor_fasciae_latae'], view: 'esq', frame: ['tensor_fasciae_latae', 'hip_bone'], glass: .12 }, q: n('tensor fasciae latae', 'tensor da fáscia lata'), a: [SUPG] },
        { id: 'supg-m', d3: { focus: ['gluteus_medius', 'gluteus_minimus', 'tensor_fasciae_latae'], view: 'esq', frame: ['gluteus_medius', 'gluteus_minimus', 'hip_bone'], glass: .12 }, q: ['Which muscles does the superior gluteal nerve supply?', 'Quais músculos o nervo glúteo superior inerva?'], a: [['gluteus medius', 'glúteo médio'], ['gluteus minimus', 'glúteo mínimo'], ['tensor fasciae latae', 'tensor da fáscia lata']] },
      ],
    },
    {
      id: 'abductors-oi', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Abductors · origin and insertion', 'Abdutores · origem e inserção'],
      rule: ['The three gluteal lines of the ilium divide the abductors: medius between the anterior and posterior lines, minimus between the anterior and inferior lines. All insert on the greater trochanter — except TFL, which pulls the iliotibial tract.',
        'As três linhas glúteas do ílio dividem os abdutores: o médio entre as linhas anterior e posterior, o mínimo entre as anterior e inferior. Todos inserem no trocânter maior — exceto o TFL, que traciona o trato iliotibial.'],
      items: [
        { id: 'gmed-o', d3: { focus: ['gluteus_medius'], view: 'post', frame: ['gluteus_medius', 'hip_bone'], glass: .12 }, q: o('gluteus medius', 'glúteo médio'), a: [['ilium between anterior and posterior gluteal lines', 'ílio entre as linhas glúteas anterior e posterior']] },
        { id: 'gmed-i', d3: { focus: ['gluteus_medius'], view: 'post', frame: ['gluteus_medius', 'femur'], glass: .12 }, q: i('gluteus medius', 'glúteo médio'), a: [['lateral surface of greater trochanter', 'face lateral do trocânter maior']] },
        { id: 'gmin-o', d3: { focus: ['gluteus_minimus'], view: 'post', frame: ['gluteus_minimus', 'hip_bone'], glass: .12 }, q: o('gluteus minimus', 'glúteo mínimo'), a: [['ilium between anterior and inferior gluteal lines', 'ílio entre as linhas glúteas anterior e inferior', 'gluteal surface of the ilium', 'face glútea do ílio']] },
        { id: 'gmin-i', d3: { focus: ['gluteus_minimus'], view: 'post', frame: ['gluteus_minimus', 'femur'], glass: .12 }, q: i('gluteus minimus', 'glúteo mínimo'), a: [['anterior surface of greater trochanter', 'face anterior do trocânter maior', 'anterolateral surface of greater trochanter', 'face anterolateral do trocânter maior']] },
        { id: 'tfl-o', d3: { focus: ['tensor_fasciae_latae'], view: 'esq', frame: ['tensor_fasciae_latae', 'hip_bone'], glass: .12 }, q: o('tensor fasciae latae', 'tensor da fáscia lata'), a: [['anterior superior iliac spine', 'espinha ilíaca anterossuperior', 'ASIS'], ['outer lip of the iliac crest', 'lábio externo da crista ilíaca']] },
        { id: 'tfl-i', d3: { focus: ['tensor_fasciae_latae'], view: 'esq', frame: ['tensor_fasciae_latae', 'femur'], glass: .12 }, q: i('tensor fasciae latae', 'tensor da fáscia lata'), a: [['iliotibial tract', 'trato iliotibial', 'IT band']] },
      ],
    },
    {
      id: 'abductor-actions', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Abductors · action', 'Abdutores · função'],
      rule: ['The superior gluteal muscles abduct AND medially rotate the hip; gluteus medius keeps the pelvis level in single-leg stance. Gluteus maximus is the opposite: it extends the hip and laterally rotates it. Piriformis, a deep rotator, also abducts the flexed hip and extends it.',
        'Os músculos do nervo glúteo superior abduzem E rodam medialmente o quadril; o glúteo médio mantém a pelve nivelada no apoio unipodal. O glúteo máximo é o oposto: estende e roda lateralmente o quadril. O piriforme, um rotador profundo, também abduz o quadril fletido e o estende.'],
      items: [
        { id: 'gmed-f', d3: { focus: ['gluteus_medius'], view: 'post', frame: ['gluteus_medius', 'hip_bone'], glass: .12 }, q: f('gluteus medius', 'glúteo médio'), a: [ABD, ['keeps the pelvis level', 'mantém a pelve nivelada']] },
        { id: 'gmin-f', d3: { focus: ['gluteus_minimus'], view: 'post', frame: ['gluteus_minimus', 'hip_bone'], glass: .12 }, q: f('gluteus minimus', 'glúteo mínimo'), a: [ABD, MR, ['stabilizes the pelvis', 'estabiliza a pelve']] },
        { id: 'tfl-f', d3: { focus: ['tensor_fasciae_latae'], view: 'esq', frame: ['tensor_fasciae_latae', 'hip_bone'], glass: .12 }, q: f('tensor fasciae latae', 'tensor da fáscia lata'), a: [ABD, ['flexion', 'flexão'], MR, ['tenses the iliotibial tract', 'tensiona o trato iliotibial']] },
        { id: 'gmax-f', d3: { focus: ['gluteus_maximus'], view: 'post', frame: ['gluteus_maximus', 'hip_bone'], glass: .12 }, q: f('gluteus maximus', 'glúteo máximo'), a: [EXT, LR, ['stabilizes the hip', 'estabiliza o quadril']] },
        { id: 'piri-f', d3: { focus: ['piriformis'], view: 'post', frame: ['piriformis', 'hip_bone'], glass: .12 }, q: f('piriformis', 'piriforme'), a: [LR, ABD, EXT] },
        { id: 'abd-m', d3: { focus: ['gluteus_medius', 'gluteus_minimus'], view: 'esq', frame: ['gluteus_medius', 'gluteus_minimus', 'hip_bone'], glass: .12 }, q: ['Which muscles abduct the hip?', 'Quais músculos abduzem o quadril?'], a: [['gluteus medius', 'glúteo médio'], ['gluteus minimus', 'glúteo mínimo'], ['tensor fasciae latae', 'tensor da fáscia lata']] },
      ],
    },
    {
      id: 'deep-six-nerves', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'sacrum'],
      title: ['Deep six · innervation', 'Seis profundos · inervação'],
      rule: ['All six are lateral rotators of the extended hip. Piriformis has its own nerve (S1–S2); superior gemellus travels with the obturator internus nerve; inferior gemellus with the quadratus femoris nerve.',
        'Todos os seis são rotadores laterais do quadril estendido. O piriforme tem nervo próprio (S1–S2); o gêmeo superior acompanha o nervo do obturador interno; o gêmeo inferior, o nervo do quadrado femoral.'],
      items: [
        { id: 'piri-n', d3: { focus: ['piriformis'], view: 'post', frame: ['piriformis', 'sacrum'], glass: .12 }, q: n('piriformis', 'piriforme'), a: [PIRN] },
        { id: 'oin-n', d3: { focus: ['obturator_internus'], view: 'post', frame: ['obturator_internus', 'hip_bone'], glass: .12 }, q: n('obturator internus', 'obturador interno'), a: [OIN] },
        { id: 'gsup-n', d3: { focus: ['superior_gemellus_muscle'], view: 'post', frame: ['superior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: n('superior gemellus', 'gêmeo superior'), a: [OIN] },
        { id: 'ginf-n', d3: { focus: ['inferior_gemellus_muscle'], view: 'post', frame: ['inferior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: n('inferior gemellus', 'gêmeo inferior'), a: [QFN] },
        { id: 'qf-n', d3: { focus: ['quadratus_femoris_muscle'], view: 'post', frame: ['quadratus_femoris_muscle','hip_bone','femur'], glass: .15 }, q: n('quadratus femoris', 'quadrado femoral'), a: [QFN] },
        { id: 'six-f', d3: { focus: ['piriformis','superior_gemellus_muscle','obturator_internus','inferior_gemellus_muscle','quadratus_femoris_muscle','obturator_externus'], view: 'post', frame: ['piriformis','superior_gemellus_muscle','obturator_internus','inferior_gemellus_muscle','quadratus_femoris_muscle','obturator_externus','hip_bone','femur'], glass: .15 }, q: ['Main action of the deep six rotators?', 'Função principal dos seis rotadores profundos?'], a: [LR, ['stabilize the femoral head', 'estabilizam a cabeça do fêmur']] },
      ],
    },
    {
      id: 'deep-six-oi', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'sacrum'],
      title: ['Deep six · origin and insertion', 'Seis profundos · origem e inserção'],
      rule: ['Piriformis and obturator internus leave the pelvis through the greater and lesser sciatic foramina, so each inserts high on the greater trochanter. Quadratus femoris stays in the gluteal region, from the ischial tuberosity to the quadrate tubercle.',
        'Piriforme e obturador interno saem da pelve pelos forames isquiáticos maior e menor, por isso inserem alto no trocânter maior. O quadrado femoral fica na região glútea, do túber isquiático ao tubérculo quadrado.'],
      items: [
        { id: 'piri-o', d3: { focus: ['piriformis'], view: 'post', frame: ['piriformis', 'sacrum'], glass: .12 }, q: o('piriformis', 'piriforme'), a: [['anterior surface of sacrum', 'face anterior do sacro', 'sacrum between S2 and S4 foramina', 'sacro entre os forames S2 e S4', 'pelvic surface of the sacrum', 'face pélvica do sacro']] },
        { id: 'piri-i', d3: { focus: ['piriformis'], view: 'post', frame: ['piriformis', 'femur'], glass: .12 }, q: i('piriformis', 'piriforme'), a: [['superior border of greater trochanter', 'borda superior do trocânter maior', 'apex of greater trochanter', 'ápice do trocânter maior']] },
        { id: 'oin-o', d3: { focus: ['obturator_internus'], view: 'post', frame: ['obturator_internus', 'hip_bone'], glass: .12 }, q: o('obturator internus', 'obturador interno'), a: [['obturator membrane and ischiopubic ramus', 'membrana obturatória e ramo isquiopúbico', 'inner surface of the obturator membrane and its bony boundaries', 'face interna da membrana obturatória e seus limites ósseos']] },
        { id: 'oin-i', d3: { focus: ['obturator_internus'], view: 'post', frame: ['obturator_internus', 'femur'], glass: .12 }, q: i('obturator internus', 'obturador interno'), a: [['medial surface of greater trochanter', 'face medial do trocânter maior']] },
        { id: 'qf-o', d3: { focus: ['quadratus_femoris_muscle'], view: 'post', frame: ['quadratus_femoris_muscle','hip_bone','femur'], glass: .15 }, q: o('quadratus femoris', 'quadrado femoral'), a: [['ischial tuberosity', 'túber isquiático', 'tuberosidade isquiática', 'lateral border of the ischial tuberosity', 'borda lateral do túber isquiático']] },
        { id: 'qf-i', d3: { focus: ['quadratus_femoris_muscle'], view: 'post', frame: ['quadratus_femoris_muscle','hip_bone','femur'], glass: .15 }, q: i('quadratus femoris', 'quadrado femoral'), a: [['quadrate tubercle', 'tubérculo quadrado', 'intertrochanteric crest', 'crista intertrocantérica']] },
      ],
    },
    {
      id: 'gemelli', d3ctx: ['hip_bone', 'sacrum', 'femur'], d3anchor: ['hip_bone', 'femur'], d3frame: ['sacrum', 'hip_bone', 'femur'],
      title: ['Gemelli · origin and insertion', 'Gêmeos · origem e inserção'],
      rule: ['The gemelli are two small muscles lying on the tendon of obturator internus: the superior comes from the ischial spine, the inferior from the ischial tuberosity. Both insert on the medial surface of the greater trochanter together with the obturator internus tendon.',
        'Os gêmeos são dois pequenos músculos sobre o tendão do obturador interno: o superior vem da espinha isquiática, o inferior do túber isquiático. Ambos inserem na face medial do trocânter maior junto com o tendão do obturador interno.'],
      items: [
        { id: 'gsup-o', d3: { focus: ['superior_gemellus_muscle'], view: 'post', frame: ['superior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: o('superior gemellus', 'gêmeo superior'), a: [['ischial spine', 'espinha isquiática']] },
        { id: 'gsup-i', d3: { focus: ['superior_gemellus_muscle'], view: 'post', frame: ['superior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: i('superior gemellus', 'gêmeo superior'), a: [['medial surface of greater trochanter', 'face medial do trocânter maior']] },
        { id: 'ginf-o', d3: { focus: ['inferior_gemellus_muscle'], view: 'post', frame: ['inferior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: o('inferior gemellus', 'gêmeo inferior'), a: [IT] },
        { id: 'ginf-i', d3: { focus: ['inferior_gemellus_muscle'], view: 'post', frame: ['inferior_gemellus_muscle','hip_bone','femur'], glass: .15 }, q: i('inferior gemellus', 'gêmeo inferior'), a: [['medial surface of greater trochanter', 'face medial do trocânter maior']] },
      ],
    },
    {
      id: 'iliopsoas', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Iliopsoas and psoas minor', 'Iliopsoas e psoas menor'],
      rule: ['Iliopsoas = iliacus + psoas major, both converging on the lesser trochanter. Iliacus = femoral n.; psoas major = direct branches of the lumbar plexus (L1–L3). Psoas minor, when present, runs from T12–L1 to the pecten pubis.',
        'Iliopsoas = ilíaco + psoas maior, ambos convergindo para o trocânter menor. Ilíaco = n. femoral; psoas maior = ramos diretos do plexo lombar (L1–L3). O psoas menor, quando presente, vai de T12–L1 ao pectíneo do púbis.'],
      items: [
        { id: 'il-o', d3: { focus: ['iliacus'], view: 'ant', frame: ['iliacus', 'hip_bone'], glass: .12 }, q: o('iliacus', 'ilíaco'), a: [['iliac fossa', 'fossa ilíaca']] },
        { id: 'ps-o', d3: { focus: ['psoas_major'], view: 'ant', frame: ['psoas_major', 'lumbar_vertebra'], glass: .12 }, q: o('psoas major', 'psoas maior'), a: [['lateral surfaces of T12 to L4 vertebral bodies and discs', 'faces laterais dos corpos vertebrais de T12 a L4 e discos', 'T12 to L5 vertebral bodies', 'corpos vertebrais de T12 a L5'], ['costal processes of L1 to L5', 'processos costais de L1 a L5']] },
        { id: 'psmin-o', d3: { focus: ['lumbar_vertebra'], view: 'ant', frame: ['lumbar_vertebra','hip_bone'], glass: .15 }, q: o('psoas minor', 'psoas menor'), a: [['lateral surfaces of T12 and L1 vertebral bodies and disc', 'faces laterais dos corpos vertebrais de T12 e L1 e disco']] },
        { id: 'psmin-i', d3: { focus: ['hip_bone'], view: 'ant', frame: ['lumbar_vertebra','hip_bone'], glass: .15 }, q: i('psoas minor', 'psoas menor'), a: [['pecten pubis', 'pectíneo do púbis'], ['iliopubic ramus', 'ramo iliopúbico']] },
        { id: 'ilps-i', d3: { focus: ['iliacus', 'psoas_major'], view: 'ant', frame: ['iliacus', 'psoas_major', 'femur'], glass: .12 }, q: i('iliopsoas', 'iliopsoas'), a: [['lesser trochanter', 'trocânter menor']] },
        { id: 'il-n', d3: { focus: ['iliacus'], view: 'ant', frame: ['iliacus', 'hip_bone'], glass: .12 }, q: n('iliacus', 'ilíaco'), a: [['femoral nerve', 'nervo femoral']] },
        { id: 'ps-n', d3: { focus: ['psoas_major'], view: 'ant', frame: ['psoas_major', 'lumbar_vertebra'], glass: .12 }, q: n('psoas major', 'psoas maior'), a: [['anterior rami of L1 to L3', 'ramos anteriores de L1 a L3', 'lumbar plexus', 'plexo lombar']] },
        { id: 'ilps-f', d3: { focus: ['iliacus', 'psoas_major'], view: 'ant', frame: ['iliacus', 'psoas_major', 'femur'], glass: .12 }, q: f('iliopsoas', 'iliopsoas'), a: [FLEX, LR, ['raises the trunk', 'ergue o tronco', 'trunk flexion', 'flexão do tronco']] },
      ],
    },
    {
      id: 'obturator-externus', d3ctx: ['hip_bone', 'femur', 'sacrum'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Obturator externus', 'Obturador externo'],
      rule: ['The only lateral rotator on the outer surface of the obturator membrane — and the only one supplied by the obturator nerve. It inserts into the trochanteric fossa, medial to the greater trochanter.',
        'O único rotador lateral na face externa da membrana obturatória — e o único inervado pelo nervo obturatório. Insere na fossa trocantérica, medial ao trocânter maior.'],
      items: [
        { id: 'oe-o', d3: { focus: ['obturator_externus'], view: 'ant', frame: ['obturator_externus','hip_bone','femur'], glass: .15 }, q: o('obturator externus', 'obturador externo'), a: [['outer surface of the obturator membrane and its bony boundaries', 'face externa da membrana obturatória e seus limites ósseos']] },
        { id: 'oe-i', d3: { focus: ['obturator_externus'], view: 'ant', frame: ['obturator_externus','hip_bone','femur'], glass: .15 }, q: i('obturator externus', 'obturador externo'), a: [['trochanteric fossa', 'fossa trocantérica']] },
        { id: 'oe-n', d3: { focus: ['obturator_externus'], view: 'ant', frame: ['obturator_externus','hip_bone','femur'], glass: .15 }, q: n('obturator externus', 'obturador externo'), a: [['obturator nerve', 'nervo obturatório']] },
        { id: 'oe-f', d3: { focus: ['obturator_externus'], view: 'ant', frame: ['obturator_externus','hip_bone','femur'], glass: .15 }, q: f('obturator externus', 'obturador externo'), a: [LR, ['adduction', 'adução'], ['stabilizes the pelvis', 'estabiliza a pelve']] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Hip · by landmark', 'Quadril · por ponto ósseo'],
      items: [
        { id: 'lm-o-ischial-tuberosity', info: ['quadratus femoris: lateral border; inferior gemellus: ischial tuberosity.', 'quadrado femoral: borda lateral; gêmeo inferior: túber isquiático.'], d3: { focus: ['quadratus_femoris_muscle', 'inferior_gemellus_muscle'], view: 'post', frame: ['quadratus_femoris_muscle', 'hip_bone', 'femur'], glass: .12 }, q: ['Which hip muscles originate from the ischial tuberosity?', 'Quais músculos do quadril se originam no túber isquiático?'], a: [['quadratus femoris', 'quadrado femoral'], ['inferior gemellus', 'gêmeo inferior', 'gemeo inferior']] },
        { id: 'lm-o-ischial-spine', d3: { focus: ['superior_gemellus_muscle'], view: 'post', frame: ['superior_gemellus_muscle', 'hip_bone', 'femur'], glass: .12 }, q: ['Which hip muscle originates from the ischial spine?', 'Qual músculo do quadril se origina na espinha isquiática?'], a: [['superior gemellus', 'gêmeo superior', 'gemeo superior']] },
        { id: 'lm-o-iliac-fossa', d3: { focus: ['iliacus'], view: 'ant', frame: ['iliacus', 'hip_bone'], glass: .12 }, q: ['Which hip muscle originates from the iliac fossa?', 'Qual músculo do quadril se origina na fossa ilíaca?'], a: [['iliacus', 'ilíaco', 'iliaco']] },
        { id: 'lm-o-asis', d3: { focus: ['tensor_fasciae_latae'], view: 'esq', frame: ['tensor_fasciae_latae', 'hip_bone'], glass: .12 }, q: ['Which hip muscle originates from the anterior superior iliac spine (ASIS)?', 'Qual músculo do quadril se origina na espinha ilíaca anterossuperior (EIAS)?'], a: [['tensor fasciae latae', 'tensor da fáscia lata', 'tensor da fascia lata', 'TFL']] },
        { id: 'lm-i-greater-trochanter', info: ['medius: lateral surface; minimus: anterior surface; piriformis: superior border/apex; obturator internus & gemelli: medial surface.', 'médio: face lateral; mínimo: face anterior; piriforme: borda superior/ápice; obturador interno e gêmeos: face medial.'], d3: { focus: ['gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'superior_gemellus_muscle', 'inferior_gemellus_muscle'], view: 'post', frame: ['gluteus_medius', 'femur'], glass: .12 }, q: ['Which hip muscles insert on the greater trochanter?', 'Quais músculos do quadril se inserem no trocânter maior?'], a: [['gluteus medius', 'glúteo médio', 'gluteo medio'], ['gluteus minimus', 'glúteo mínimo', 'gluteo minimo'], ['piriformis', 'piriforme'], ['obturator internus', 'obturador interno'], ['superior gemellus', 'gêmeo superior', 'gemeo superior'], ['inferior gemellus', 'gêmeo inferior', 'gemeo inferior']] },
        { id: 'lm-i-lesser-trochanter', d3: { focus: ['iliacus', 'psoas_major'], view: 'ant', frame: ['iliacus', 'psoas_major', 'femur'], glass: .12 }, q: ['Which hip muscle inserts on the lesser trochanter?', 'Qual músculo do quadril se insere no trocânter menor?'], a: [['iliopsoas', 'iliopsoas']] },
        { id: 'lm-i-trochanteric-fossa', d3: { focus: ['obturator_externus'], view: 'ant', frame: ['obturator_externus', 'hip_bone', 'femur'], glass: .12 }, q: ['Which hip muscle inserts on the trochanteric fossa?', 'Qual músculo do quadril se insere na fossa trocantérica?'], a: [['obturator externus', 'obturador externo']] },
        { id: 'lm-i-quadrate-tubercle', d3: { focus: ['quadratus_femoris_muscle'], view: 'post', frame: ['quadratus_femoris_muscle', 'hip_bone', 'femur'], glass: .12 }, q: ['Which hip muscle inserts on the quadrate tubercle?', 'Qual músculo do quadril se insere no tubérculo quadrado?'], a: [['quadratus femoris', 'quadrado femoral']] },
      ],
    },
    {
      id: 'by-nerve', d3ctx: ['hip_bone', 'sacrum', 'femur', 'lumbar_vertebra'], d3anchor: ['hip_bone', 'femur'], d3frame: ['hip_bone', 'femur'],
      title: ['Hip · by nerve', 'Quadril · por nervo'],
      items: [
        { id: 'nv-nerve-to-obturator-internus', d3: { focus: ['obturator_internus', 'superior_gemellus_muscle'], view: 'post', frame: ['obturator_internus', 'hip_bone'], glass: .12 }, q: ['Which hip muscles does the nerve to obturator internus supply?', 'Quais músculos do quadril o nervo do obturador interno inerva?'], a: [['obturator internus', 'obturador interno'], ['superior gemellus', 'gêmeo superior', 'gemeo superior']] },
        { id: 'nv-nerve-to-quadratus-femoris', d3: { focus: ['quadratus_femoris_muscle', 'inferior_gemellus_muscle'], view: 'post', frame: ['quadratus_femoris_muscle', 'hip_bone', 'femur'], glass: .12 }, q: ['Which hip muscles does the nerve to quadratus femoris supply?', 'Quais músculos do quadril o nervo do quadrado femoral inerva?'], a: [['quadratus femoris', 'quadrado femoral'], ['inferior gemellus', 'gêmeo inferior', 'gemeo inferior']] },
      ],
    },
  ],
};
