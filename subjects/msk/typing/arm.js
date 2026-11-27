// Source: standard anatomy. Checked against research/msk_slides_txt/05_shoulder_girdle_and_upper_limb.txt.
const MC = ['musculocutaneous nerve', 'nervo musculocutâneo', 'musculocutaneous', 'n. musculocutâneo'];
const RAD = ['radial nerve', 'nervo radial'];
const FLEX = ['elbow flexion', 'flexão do cotovelo', 'flexão do antebraço', 'flexion of the elbow'];
const SUP = ['supination', 'supinação'];
const EXT = ['elbow extension', 'extensão do cotovelo', 'extension of the elbow', 'forearm extension', 'extensão do antebraço', 'extension of the forearm'];
const ADD = ['adduction', 'adução'];
const CORA = ['coracoid process', 'processo coracoide'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'arm',
  rewards: true,
  title: ['Arm', 'Braço'],
  sets: [
    {
      id: 'anterior-o-i', d3ctx: ['humerus', 'scapula', 'clavicle'], d3anchor: ['humerus', 'scapula'], d3frame: ['humerus', 'scapula'],
      title: ['Anterior arm · origin and insertion', 'Braço anterior · origem e inserção'],
      rule: ['All three anterior arm muscles are flexors. Biceps has two heads (supraglenoid tubercle + coracoid) into the radial tuberosity; brachialis is the pure flexor lying under it; coracobrachialis runs from the coracoid to the medial humerus.',
        'Os três músculos anteriores do braço são flexores. O bíceps tem duas cabeças (tubérculo supraglenoidal + processo coracoide) para a tuberosidade do rádio; o braquial é o flexor puro por baixo dele; o coracobraquial vai do processo coracoide para a face medial do úmero.'],
      items: [
        { id: 'bic-o', d3: { focus: ['biceps_brachii'], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: o('biceps brachii (2 heads)', 'bíceps braquial (2 cabeças)'), a: [['supraglenoid tubercle', 'tubérculo supraglenoidal', 'supraglenoid tuberosity', 'tuberosidade supraglenoidal'], CORA] },
        { id: 'bic-i', d3: { focus: ['biceps_brachii'], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: i('biceps brachii', 'bíceps braquial'), a: [['radial tuberosity', 'tuberosidade do rádio', 'tuberosidade radial'], ['bicipital aponeurosis', 'aponeurose bicipital', 'lacertus fibrosus']] },
        { id: 'brach-o', d3: { focus: ['brachialis'], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: o('brachialis', 'braquial'), a: [['distal half of anterior humerus', 'metade distal da face anterior do úmero', 'lower half of anterior humerus', 'metade inferior do úmero']] },
        { id: 'brach-i', d3: { focus: ['brachialis'], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: i('brachialis', 'braquial'), a: [['ulnar tuberosity', 'tuberosidade da ulna', 'coronoid process of ulna', 'processo coronóide da ulna', 'coronoid process']] },
        { id: 'cora-o', d3: { focus: ['coracobrachialis'], view: 'ant', frame: ['coracobrachialis', 'humerus'], glass: .12 }, q: o('coracobrachialis', 'coracobraquial'), a: [CORA] },
        { id: 'cora-i', d3: { focus: ['coracobrachialis'], view: 'ant', frame: ['coracobrachialis', 'humerus'], glass: .12 }, q: i('coracobrachialis', 'coracobraquial'), a: [['middle third of medial humerus', 'terço médio da face medial do úmero', 'medial shaft of humerus', 'diáfise medial do úmero', 'midway along the medial border of the humeral shaft', 'meio da borda medial da diáfise do úmero']] },
      ],
    },
    {
      id: 'posterior-o-i', d3ctx: ['humerus', 'scapula', 'radius', 'ulna'], d3anchor: ['humerus', 'scapula'], d3frame: ['humerus', 'scapula'],
      title: ['Posterior arm · triceps heads and anconeus', 'Braço posterior · cabeças do tríceps e ancôneo'],
      rule: ['Triceps has three heads named by where they start: long head at the infraglenoid tubercle, lateral head at the posterior humerus + lateral intermuscular septum, medial head below the radial groove + medial intermuscular septum. All converge on the olecranon; the small anconeus is the fourth, triceps-like extensor from the lateral epicondyle.',
        'O tríceps tem três cabeças nomeadas pela origem: cabeça longa no tubérculo infraglenoidal, cabeça lateral na face posterior do úmero + septo intermuscular lateral, cabeça medial abaixo do sulco radial + septo intermuscular medial. Todas convergem para o olecrano; o pequeno ancôneo é o quarto extensor, do epicôndilo lateral.'],
      items: [
        { id: 'tri-long-o', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: o('triceps brachii · long head', 'tríceps braquial · cabeça longa'), a: [['infraglenoid tubercle', 'tubérculo infraglenoidal', 'infraglenoid tuberosity', 'tuberosidade infraglenoidal']] },
        { id: 'tri-lat-o', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: o('triceps brachii · lateral head', 'tríceps braquial · cabeça lateral'), a: [['posterior humerus above radial groove', 'face posterior do úmero acima do sulco radial', 'posterior surface of the humeral shaft', 'face posterior da diáfise do úmero', 'above the radial groove', 'acima do sulco radial'], ['lateral intermuscular septum', 'septo intermuscular lateral']] },
        { id: 'tri-med-o', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: o('triceps brachii · medial head', 'tríceps braquial · cabeça medial'), a: [['posterior humerus below radial groove', 'face posterior do úmero abaixo do sulco radial', 'below the radial groove', 'abaixo do sulco radial'], ['medial intermuscular septum', 'septo intermuscular medial']] },
        { id: 'tri-i', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: i('triceps brachii', 'tríceps braquial'), a: [['olecranon of ulna', 'olecrano da ulna', 'olecranon', 'upper surface of the olecranon', 'face superior do olecrano']] },
        { id: 'anc-o', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: o('anconeus', 'ancôneo'), a: [['lateral epicondyle', 'epicôndilo lateral', 'lateral epicondyle proximal to the common extensor tendon', 'epicôndilo lateral, proximal ao tendão extensor comum']] },
        { id: 'anc-i', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: i('anconeus', 'ancôneo'), a: [['lateral aspect of the olecranon', 'face lateral do olecrano', 'lateral olecranon', 'olecrano lateral']] },
        { id: 'anc-f', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: f('anconeus', 'ancôneo'), a: [EXT] },
      ],
    },
    {
      id: 'nerves', d3ctx: ['humerus', 'scapula'], d3anchor: ['humerus', 'scapula'], d3frame: ['humerus', 'scapula'],
      title: ['Arm · innervation', 'Braço · inervação'],
      rule: ['The arm follows the compartment rule: everything in front = musculocutaneous n.; everything behind = radial n. The radial n. reaches triceps and anconeus in the posterior compartment through the radial groove.',
        'O braço segue a regra dos compartimentos: tudo na frente = nervo musculocutâneo; tudo atrás = nervo radial. O nervo radial chega ao tríceps e ao ancôneo no compartimento posterior pelo sulco radial.'],
      items: [
        { id: 'bic-n', d3: { focus: ['biceps_brachii'], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: n('biceps brachii', 'bíceps braquial'), a: [MC] },
        { id: 'brach-n', d3: { focus: ['brachialis'], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: n('brachialis', 'braquial'), a: [MC] },
        { id: 'cora-n', d3: { focus: ['coracobrachialis'], view: 'ant', frame: ['coracobrachialis', 'humerus'], glass: .12 }, q: n('coracobrachialis', 'coracobraquial'), a: [MC] },
        { id: 'tri-n', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: n('triceps brachii', 'tríceps braquial'), a: [RAD] },
        { id: 'anc-n', extra: true, d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: n('anconeus', 'ancôneo'), a: [RAD] },
        { id: 'mc-inv', d3: { focus: ['biceps_brachii', 'brachialis', 'coracobrachialis'], view: 'ant', frame: ['biceps_brachii', 'coracobrachialis', 'humerus'], glass: .12 }, q: ['Which muscles does the musculocutaneous nerve supply?', 'Quais músculos o nervo musculocutâneo inerva?'], a: [['biceps brachii', 'bíceps braquial'], ['brachialis', 'braquial'], ['coracobrachialis', 'coracobraquial']] },
        { id: 'rad-inv', extra: true, d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: ['Which muscles of the arm does the radial nerve supply?', 'Quais músculos do braço o nervo radial inerva?'], a: [['triceps brachii', 'tríceps braquial'], ['anconeus', 'ancôneo']] },
      ],
    },
    {
      id: 'actions', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['humerus', 'radius'], d3frame: ['humerus', 'ulna'],
      title: ['Arm · action', 'Braço · função'],
      rule: ['Biceps is the supinator (plus flexion); brachialis is the pure elbow flexor, working in every forearm position; coracobrachialis flexes and adducts; triceps extends, and the small anconeus extends with it.',
        'O bíceps é o supinador (e flexiona); o braquial é o flexor puro do cotovelo, atuando em qualquer posição do antebraço; o coracobraquial flexiona e aduz; o tríceps estende, e o pequeno ancôneo estende junto.'],
      items: [
        { id: 'bic-f', d3: { focus: ['biceps_brachii'], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: f('biceps brachii', 'bíceps braquial'), a: [FLEX, SUP] },
        { id: 'brach-f', d3: { focus: ['brachialis'], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: f('brachialis', 'braquial'), a: [FLEX] },
        { id: 'cora-f', d3: { focus: ['coracobrachialis'], view: 'ant', frame: ['coracobrachialis', 'humerus'], glass: .12 }, q: f('coracobrachialis', 'coracobraquial'), a: [['shoulder flexion', 'flexão do ombro', 'flexion of the arm', 'flexão do braço'], ['shoulder adduction', 'adução do ombro', 'adduction of the arm', 'adução do braço', 'adduction', 'adução']] },
        { id: 'tri-f', d3: { focus: ['triceps_brachii'], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: f('triceps brachii', 'tríceps braquial'), a: [EXT] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['humerus', 'scapula', 'clavicle'], d3anchor: ['humerus', 'scapula'], d3frame: ['humerus', 'scapula'],
      title: ["Arm · by landmark", "Braço · por ponto ósseo"],
      items: [
        { id: 'lm-o-supraglenoid-tubercle', d3: { focus: ["biceps_brachii"], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscle originates from the supraglenoid tubercle?", "Qual músculo do braço se origina no tubérculo supraglenoidal?"], a: [["long head of biceps brachii", "cabeça longa do bíceps braquial", "long head of biceps", "cabeça longa do bíceps", "cabeca longa do biceps braquial", "cabeca longa do biceps"]] },
        { id: 'lm-o-coracoid-process', d3: { focus: ["biceps_brachii", "coracobrachialis"], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscles originate from the coracoid process?", "Quais músculos do braço se originam no processo coracoide?"], a: [["short head of biceps brachii", "cabeça curta do bíceps braquial", "short head of biceps", "cabeça curta do bíceps", "cabeca curta do biceps braquial", "cabeca curta do biceps"], ["coracobrachialis", "coracobraquial"]] },
        { id: 'lm-i-radial-tuberosity', d3: { focus: ["biceps_brachii"], view: 'ant', frame: ['biceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscle inserts on the radial tuberosity?", "Qual músculo do braço se insere na tuberosidade do rádio?"], a: [["biceps brachii", "bíceps braquial", "biceps braquial"]] },
        { id: 'lm-i-ulnar-tuberosity', d3: { focus: ["brachialis"], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: ["Which arm muscle inserts on the ulnar tuberosity?", "Qual músculo do braço se insere na tuberosidade da ulna?"], a: [["brachialis", "braquial"]] },
        { id: 'lm-i-coronoid-process-of-ulna', d3: { focus: ["brachialis"], view: 'ant', frame: ['brachialis', 'humerus'], glass: .12 }, q: ["Which arm muscle inserts on the coronoid process of ulna?", "Qual músculo do braço se insere no processo coronoide da ulna?"], a: [["brachialis", "braquial"]] },
        { id: 'lm-o-infraglenoid-tubercle', d3: { focus: ["triceps_brachii"], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscle originates from the infraglenoid tubercle?", "Qual músculo do braço se origina no tubérculo infraglenoidal?"], a: [["triceps brachii · long head", "tríceps braquial · cabeça longa", "triceps brachii  long head", "triceps braquial  cabeca longa", "long head of triceps brachii", "cabeça longa do tríceps braquial", "long head of triceps", "cabeca longa do triceps"]] },
        { id: 'lm-i-olecranon', d3: { focus: ["triceps_brachii"], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscles insert on the olecranon?", "Quais músculos do braço se inserem no olecrano?"], a: [["triceps brachii", "tríceps braquial", "triceps braquial"], ["anconeus", "ancôneo", "anconeo"]] },
        { id: 'lm-o-lateral-epicondyle', d3: { focus: ["triceps_brachii"], view: 'post', frame: ['triceps_brachii', 'humerus'], glass: .12 }, q: ["Which arm muscle originates from the lateral epicondyle?", "Qual músculo do braço se origina no epicôndilo lateral?"], a: [["anconeus", "ancôneo", "anconeo"]] },
      ],
    },
  ],
};
