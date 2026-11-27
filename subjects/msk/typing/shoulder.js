// SpeedMSK typing pilot · shoulder. Four short fields per muscle (origin, insertion, innervation, action).
// Source: standard anatomy + subjects/msk/regions/upper.js. Checked against research/msk_slides_txt/05_shoulder_girdle_and_upper_limb.txt.
const GT = ['greater tubercle', 'tubérculo maior', 'greater tuberosity', 'tuberosidade maior'];
const LT = ['lesser tubercle', 'tubérculo menor', 'lesser tuberosity', 'tuberosidade menor'];
const SSN = ['suprascapular nerve', 'nervo supraescapular'];
const AXN = ['axillary nerve', 'nervo axilar', 'circumflex nerve'];
const LSN = ['lower subscapular nerve', 'nervo subescapular inferior'];
const SUBN = ['upper and lower subscapular nerves', 'nervos subescapulares superior e inferior', 'subscapular nerves', 'nervos subescapulares'];
const MR = ['medial rotation', 'rotação medial', 'internal rotation', 'rotação interna'];
const LR = ['lateral rotation', 'rotação lateral', 'external rotation', 'rotação externa'];
const ABD = ['abduction', 'abdução'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'shoulder',
  rewards: true,
  title: ['Shoulder', 'Ombro'],
  sets: [
    {
      id: 'cuff-attach', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ['Rotator cuff · origin and insertion', 'Manguito rotador · origem e inserção'],
      rule: ['SITS. Each scapular muscle is named after its fossa (supraspinous, infraspinous, subscapular). Supra-, Infra-, Teres minor insert on the GREATER tubercle, top → middle → bottom facet; Subscapularis, the only front one, on the LESSER tubercle.',
        'SITS. Cada músculo da escápula tem o nome da sua fossa (supraespinal, infraespinal, subescapular). Supra, Infra e Redondo menor inserem no tubérculo MAIOR, faceta superior → média → inferior; o Subescapular, único anterior, no tubérculo MENOR.'],
      items: [
        { id: 'supra-o', d3: { focus: ['supraspinatus'], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: o('supraspinatus', 'supraespinal'), a: [['supraspinous fossa', 'fossa supraespinal']] },
        { id: 'supra-i', d3: { focus: ['supraspinatus'], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: i('supraspinatus', 'supraespinal'), a: [[...GT, 'highest facet of the greater tubercle', 'faceta superior do tubérculo maior', 'superior facet of the greater tubercle']] },
        { id: 'infra-o', d3: { focus: ['infraspinatus'], view: 'post', frame: ['infraspinatus', 'scapula'], glass: .12 }, q: o('infraspinatus', 'infraespinal'), a: [['infraspinous fossa', 'fossa infraespinal']] },
        { id: 'infra-i', d3: { focus: ['infraspinatus'], view: 'post', frame: ['infraspinatus', 'scapula'], glass: .12 }, q: i('infraspinatus', 'infraespinal'), a: [[...GT, 'middle facet of the greater tubercle', 'faceta média do tubérculo maior', 'middle facet']] },
        { id: 'tmin-o', d3: { focus: ['teres_minor'], view: 'post', frame: ['teres_minor', 'scapula'], glass: .12 }, q: o('teres minor', 'redondo menor'), a: [['lateral border of scapula', 'margem lateral da escápula', 'borda lateral da escápula', 'upper two-thirds of the lateral border', 'dois terços superiores da margem lateral']] },
        { id: 'tmin-i', d3: { focus: ['teres_minor'], view: 'post', frame: ['teres_minor', 'scapula'], glass: .12 }, q: i('teres minor', 'redondo menor'), a: [[...GT, 'lowest facet of the greater tubercle', 'faceta inferior do tubérculo maior', 'lowest facet']] },
        { id: 'subs-o', d3: { focus: ['subscapularis'], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: o('subscapularis', 'subescapular'), a: [['subscapular fossa', 'fossa subescapular', 'costal surface of the scapula', 'face costal da escápula']] },
        { id: 'subs-i', d3: { focus: ['subscapularis'], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: i('subscapularis', 'subescapular'), a: [LT] },
      ],
    },
    {
      id: 'nerves', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ['Shoulder · innervation', 'Ombro · inervação'],
      rule: ['Suprascapular n. = the two "spinatus" muscles. Axillary n. leaves through the quadrangular space and supplies the two muscles at its edge: deltoid + teres minor. Subscapular nn. = subscapularis; the lower one also takes teres major.',
        'N. supraescapular = os dois "espinais". N. axilar sai pelo espaço quadrangular e inerva os dois músculos da borda: deltoide + redondo menor. Nn. subescapulares = subescapular; o inferior também leva o redondo maior.'],
      items: [
        { id: 'supra-n', d3: { focus: ['supraspinatus'], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: n('supraspinatus', 'supraespinal'), a: [SSN] },
        { id: 'infra-n', d3: { focus: ['infraspinatus'], view: 'post', frame: ['infraspinatus', 'scapula'], glass: .12 }, q: n('infraspinatus', 'infraespinal'), a: [SSN] },
        { id: 'delt-n', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: n('deltoid', 'deltoide'), a: [AXN] },
        { id: 'tmin-n', d3: { focus: ['teres_minor'], view: 'post', frame: ['teres_minor', 'scapula'], glass: .12 }, q: n('teres minor', 'redondo menor'), a: [AXN] },
        { id: 'subs-n', d3: { focus: ['subscapularis'], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: n('subscapularis', 'subescapular'), a: [SUBN] },
        { id: 'tmaj-n', d3: { focus: ['teres_major'], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: n('teres major', 'redondo maior'), a: [LSN] },
        { id: 'axn-m', d3: { focus: ['deltoid', 'teres_minor'], view: 'post', frame: ['deltoid', 'teres_minor', 'scapula'], glass: .12 }, q: ['Which two muscles does the axillary nerve supply?', 'Quais dois músculos o nervo axilar inerva?'], a: [['deltoid', 'deltoide'], ['teres minor', 'redondo menor']] },
      ],
    },
    {
      id: 'actions', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ['Shoulder · action', 'Ombro · função'],
      rule: ['Abduction: supraspinatus starts it (0–15°), deltoid carries it (15–90°). Deltoid is three muscles in one: anterior fibers flex + medially rotate, posterior fibers extend + laterally rotate, acromial part abducts. Muscles from the back of the scapula rotate laterally (infraspinatus, teres minor); muscles into the front of the humerus rotate medially (subscapularis, teres major) — teres major also extends.',
        'Abdução: o supraespinal inicia (0–15°), o deltoide continua (15–90°). O deltoide são três músculos em um: fibras anteriores fletem + rodam medialmente, fibras posteriores estendem + rodam lateralmente, parte acromial abduz. Quem vem de trás da escápula roda lateralmente (infraespinal, redondo menor); quem insere na frente do úmero roda medialmente (subescapular, redondo maior) — o redondo maior também estende.'],
      items: [
        { id: 'supra-f', d3: { focus: ['supraspinatus'], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: f('supraspinatus', 'supraespinal'), a: [ABD] },
        { id: 'delt-f', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: f('deltoid', 'deltoide'), a: [ABD] },
        { id: 'delt-ant-f', d3: { focus: ['deltoid'], view: 'ant', frame: ['deltoid', 'clavicle'], glass: .12 }, q: f('deltoid · anterior fibers', 'deltoide · fibras anteriores'), a: [['flexion', 'flexão', 'shoulder flexion', 'flexão do ombro', 'flexion of the arm', 'flexão do braço'], MR] },
        { id: 'delt-post-f', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: f('deltoid · posterior fibers', 'deltoide · fibras posteriores'), a: [['extension', 'extensão', 'shoulder extension', 'extensão do ombro', 'extension of the arm', 'extensão do braço'], LR] },
        { id: 'delt-acr-f', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: f('deltoid · acromial part', 'deltoide · parte acromial'), a: [ABD] },
        { id: 'infra-f', d3: { focus: ['infraspinatus'], view: 'post', frame: ['infraspinatus', 'scapula'], glass: .12 }, q: f('infraspinatus', 'infraespinal'), a: [LR] },
        { id: 'tmin-f', d3: { focus: ['teres_minor'], view: 'post', frame: ['teres_minor', 'scapula'], glass: .12 }, q: f('teres minor', 'redondo menor'), a: [LR] },
        { id: 'subs-f', d3: { focus: ['subscapularis'], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: f('subscapularis', 'subescapular'), a: [MR] },
        { id: 'tmaj-f', d3: { focus: ['teres_major'], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: f('teres major', 'redondo maior'), a: [MR, ['extension', 'extensão', 'shoulder extension', 'extensão do ombro', 'extension of the arm', 'extensão do braço']] },
      ],
    },
    {
      id: 'movers', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ['Deltoid and teres major · origin and insertion', 'Deltoide e redondo maior · origem e inserção'],
      rule: ['Deltoid mirrors the trapezius: lateral clavicle + acromion + spine of scapula → deltoid tuberosity. Teres major ("bigger, lower") from the inferior angle into the intertubercular sulcus, next to latissimus dorsi.',
        'O deltoide espelha o trapézio: clavícula lateral + acrômio + espinha da escápula → tuberosidade deltóidea. Redondo maior ("maior e mais baixo") do ângulo inferior para o sulco intertubercular, junto do latíssimo do dorso.'],
      items: [
        { id: 'delt-o', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: o('deltoid (3 parts)', 'deltoide (3 partes)'), a: [['clavicle', 'clavícula', 'lateral clavicle', 'clavícula lateral'], ['acromion', 'acrômio'], ['spine of scapula', 'espinha da escápula', 'scapular spine']] },
        { id: 'delt-i', d3: { focus: ['deltoid'], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: i('deltoid', 'deltoide'), a: [['deltoid tuberosity', 'tuberosidade deltóidea', 'tuberosidade deltoide', 'deltoid tubercle', 'tubérculo deltoide', 'tubérculo deltóideo']] },
        { id: 'tmaj-o', d3: { focus: ['teres_major'], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: o('teres major', 'redondo maior'), a: [['inferior angle of scapula', 'ângulo inferior da escápula', 'inferior scapular angle', 'ângulo escapular inferior']] },
        { id: 'tmaj-i', d3: { focus: ['teres_major'], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: i('teres major', 'redondo maior'), a: [['intertubercular sulcus', 'sulco intertubercular', 'medial lip of intertubercular sulcus', 'lábio medial do sulco intertubercular', 'bicipital groove']] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ["Shoulder · by landmark", "Ombro · por ponto ósseo"],
      items: [
        { id: 'lm-o-supraspinous-fossa', d3: { focus: ["supraspinatus"], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the supraspinous fossa?", "Qual músculo do ombro se origina na fossa supraespinal?"], a: [["supraspinatus", "supraespinal"]] },
        { id: 'lm-o-infraspinous-fossa', d3: { focus: ["infraspinatus"], view: 'post', frame: ['infraspinatus', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the infraspinous fossa?", "Qual músculo do ombro se origina na fossa infraespinal?"], a: [["infraspinatus", "infraespinal"]] },
        { id: 'lm-o-lateral-border-of-scapula', d3: { focus: ["teres_minor"], view: 'post', frame: ['teres_minor', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the lateral border of scapula?", "Qual músculo do ombro se origina na borda lateral da escápula?"], a: [["teres minor", "redondo menor"]] },
        { id: 'lm-o-subscapular-fossa', d3: { focus: ["subscapularis"], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the subscapular fossa?", "Qual músculo do ombro se origina na fossa subescapular?"], a: [["subscapularis", "subescapular"]] },
        { id: 'lm-o-acromion', d3: { focus: ["deltoid"], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the acromion?", "Qual músculo do ombro se origina no acrômio?"], a: [["deltoid", "deltoide"]] },
        { id: 'lm-o-spine-of-scapula', d3: { focus: ["deltoid"], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the spine of scapula?", "Qual músculo do ombro se origina na espinha da escápula?"], a: [["deltoid", "deltoide"]] },
        { id: 'lm-o-inferior-angle-of-scapula', d3: { focus: ["teres_major"], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: ["Which shoulder muscle originates from the inferior angle of scapula?", "Qual músculo do ombro se origina no ângulo inferior da escápula?"], a: [["teres major", "redondo maior"]] },
        { id: 'lm-i-greater-tubercle', d3: { focus: ["supraspinatus", "infraspinatus", "teres_minor"], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: ["Which shoulder muscles insert on the greater tubercle?", "Quais músculos do ombro se inserem no tubérculo maior?"], a: [["supraspinatus", "supraespinal"], ["infraspinatus", "infraespinal"], ["teres minor", "redondo menor"]] },
        { id: 'lm-i-lesser-tubercle', d3: { focus: ["subscapularis"], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: ["Which shoulder muscle inserts on the lesser tubercle?", "Qual músculo do ombro se insere no tubérculo menor?"], a: [["subscapularis", "subescapular"]] },
        { id: 'lm-i-deltoid-tuberosity', d3: { focus: ["deltoid"], view: 'post', frame: ['deltoid', 'scapula'], glass: .12 }, q: ["Which shoulder muscle inserts on the deltoid tuberosity?", "Qual músculo do ombro se insere na tuberosidade deltoide?"], a: [["deltoid", "deltoide"]] },
        { id: 'lm-i-intertubercular-sulcus', d3: { focus: ["teres_major"], view: 'post', frame: ['teres_major', 'scapula'], glass: .12 }, q: ["Which shoulder muscle inserts on the intertubercular sulcus?", "Qual músculo do ombro se insere no sulco intertubercular?"], a: [["teres major", "redondo maior"]] },
      ],
    },
    {
      id: 'by-nerve', d3ctx: ['scapula', 'humerus', 'clavicle'], d3anchor: ['scapula', 'humerus'], d3frame: ['scapula', 'humerus'],
      title: ["Shoulder · by nerve", "Ombro · por nervo"],
      items: [
        { id: 'nv-suprascapular-nerve', d3: { focus: ["supraspinatus", "infraspinatus"], view: 'post', frame: ['supraspinatus', 'scapula'], glass: .12 }, q: ["Which shoulder muscles does the suprascapular nerve supply?", "Quais músculos do ombro o nervo supraescapular inerva?"], a: [["supraspinatus", "supraespinal"], ["infraspinatus", "infraespinal"]] },
        { id: 'nv-lower-subscapular-nerve', d3: { focus: ["subscapularis", "teres_major"], view: 'ant', frame: ['subscapularis', 'scapula'], glass: .12 }, q: ["Which shoulder muscles does the lower subscapular nerve supply?", "Quais músculos do ombro o nervo subescapular inferior inerva?"], a: [["subscapularis", "subescapular"], ["teres major", "redondo maior"]] },
      ],
    },
  ],
};
