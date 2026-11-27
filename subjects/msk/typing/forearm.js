// Source: standard anatomy. Checked against research/msk_slides_txt/05_shoulder_girdle_and_upper_limb.txt.
const MED = ['median nerve', 'nervo mediano'];
const ULN = ['ulnar nerve', 'nervo ulnar', 'nervo cubital'];
const RAD = ['radial nerve', 'nervo radial'];
const PIN = ['posterior interosseous nerve', 'nervo interósseo posterior', 'deep branch of radial nerve', 'ramo profundo do nervo radial', 'pin', 'radial nerve', 'nervo radial'];
const PRON = ['pronation', 'pronação'];
const SUP = ['supination', 'supinação', 'lateral rotation of the forearm', 'rotação lateral do antebraço'];
const MEDEP = ['medial epicondyle', 'epicôndilo medial'];
const LATE = ['lateral epicondyle', 'epicôndilo lateral'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'forearm',
  title: ['Forearm', 'Antebraço'],
  sets: [
    {
      id: 'flexor-origin', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['humerus', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Superficial flexors · origin, insertion and action', 'Flexores superficiais · origem, inserção e função'],
      rule: ['The superficial flexors all hang from the common flexor origin on the MEDIAL epicondyle — the basis of "golfer\'s elbow". FCU alone adds an ulnar head, so it is the one that also escapes to the ulnar nerve; it ends on the pisiform, hamate and 5th metacarpal and is the only wrist flexor that also ADDUCTS (ulnar deviation).',
        'Os flexores superficiais saem todos da origem flexora comum no EPICÔNDILO MEDIAL — a base do "cotovelo do golfista". Só o FCU ganha uma cabeça ulnar, sendo o único que também escapa para o nervo ulnar; termina no pisiforme, hamato e 5º metacarpo e é o único flexor do punho que também ADUZ (desvio ulnar).'],
      items: [
        { id: 'pt-o', d3: { focus: ['pronator_teres'], view: 'ant', frame: ['pronator_teres','humerus','radius'], glass: .15 }, q: o('pronator teres', 'pronador redondo'), a: [['medial epicondyle', 'epicôndilo medial', 'medial supracondylar ridge', 'crista supracondilar medial', 'common flexor tendon', 'tendão flexor comum', 'common flexor origin', 'origem flexora comum'], ['medial side of the coronoid process', 'face medial do processo coronóide', 'coronoid process of ulna', 'processo coronóide da ulna']] },
        { id: 'fcr-o', d3: { focus: ['flexor_carpi_radialis'], view: 'ant', frame: ['flexor_carpi_radialis', 'radius'], glass: .12 }, q: o('flexor carpi radialis', 'flexor radial do carpo'), a: [[...MEDEP, 'common flexor tendon', 'tendão flexor comum']] },
        { id: 'pl-o', d3: { focus: ['palmaris_longus_muscle'], view: 'ant', frame: ['palmaris_longus_muscle','humerus','ulna'], glass: .15 }, q: o('palmaris longus', 'palmar longo'), a: [[...MEDEP, 'common flexor tendon', 'tendão flexor comum']] },
        { id: 'fcu-o', d3: { focus: ['flexor_carpi_ulnaris'], view: 'ant', frame: ['flexor_carpi_ulnaris', 'ulna'], glass: .12 }, q: o('flexor carpi ulnaris', 'flexor ulnar do carpo'), a: [[...MEDEP, 'common flexor tendon', 'tendão flexor comum'], ['olecranon', 'olécrano', 'medial margin of the olecranon', 'margem medial do olecrano'], ['posterior ulna', 'face posterior da ulna', 'proximal two thirds of the posterior border of the ulna', 'dois terços proximais da borda posterior da ulna', 'posterior border of the ulna', 'borda posterior da ulna']] },
        { id: 'fds-o', d3: { focus: ['flexor_digitorum_superficialis'], view: 'ant', frame: ['flexor_digitorum_superficialis','radius','ulna'], glass: .15 }, q: o('flexor digitorum superficialis', 'flexor superficial dos dedos'), a: [[...MEDEP, 'common flexor tendon', 'tendão flexor comum', 'humero-ulnar head', 'cabeça umeroulnar'], ['coronoid process of ulna', 'processo coronóide da ulna'], ['anterior radius', 'face anterior do rádio', 'anterior radial border', 'borda anterior do rádio']] },
        { id: 'fcu-i', d3: { focus: ['flexor_carpi_ulnaris'], view: 'ant', frame: ['flexor_carpi_ulnaris', 'ulna'], glass: .12 }, q: i('flexor carpi ulnaris', 'flexor ulnar do carpo'), a: [['pisiform', 'pisiforme'], ['hamate', 'hamato'], ['base of the 5th metacarpal', 'base do 5º metacarpo', '5th metacarpal', '5º metacarpo', 'quinto metacarpo']] },
        { id: 'fcu-f', d3: { focus: ['flexor_carpi_ulnaris'], view: 'ant', frame: ['flexor_carpi_ulnaris', 'ulna'], glass: .12 }, q: f('flexor carpi ulnaris', 'flexor ulnar do carpo'), a: [['wrist flexion', 'flexão do punho', 'flexão do carpo', 'flexion of the wrist'], ['wrist adduction', 'adução do punho', 'adução do carpo', 'ulnar deviation', 'desvio ulnar']] },
      ],
    },
    {
      id: 'flexor-deep', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['radius', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Deep flexors · what they do', 'Flexores profundos · o que fazem'],
      rule: ['FDP flexes the DIP, FDS the PIP ("superficial = nearer, splits to let FDP through"), FPL the thumb IP. The two pronators (teres + quadratus) both turn the palm down; quadratus is the square one flat on the distal bones.',
        'O FDP flexiona a interfalângica distal; o FDS a proximal ("superficial = mais perto, abre para o FDP passar"); o FPL a interfalângica do polegar. Os dois pronadores (redondo + quadrado) viram a palma para baixo; o quadrado é o quadrado achatado nos ossos distais.'],
      items: [
        { id: 'fds-i', d3: { focus: ['flexor_digitorum_superficialis'], view: 'ant', frame: ['flexor_digitorum_superficialis','radius','ulna'], glass: .15 }, q: i('flexor digitorum superficialis', 'flexor superficial dos dedos'), a: [['middle phalanges of digits 2-5', 'falanges médias dos dedos 2-5', 'middle phalanges', 'falanges médias']] },
        { id: 'fdp-o', d3: { focus: ['flexor_digitorum_profundus'], view: 'ant', frame: ['flexor_digitorum_profundus','radius','ulna'], glass: .15 }, q: o('flexor digitorum profundus', 'flexor profundo dos dedos'), a: [['anterior ulna', 'face anterior da ulna', 'anterior and medial surface of the ulna', 'face anteromedial da ulna', 'medial surface of the ulna', 'face medial da ulna'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'fdp-i', d3: { focus: ['flexor_digitorum_profundus'], view: 'ant', frame: ['flexor_digitorum_profundus','radius','ulna'], glass: .15 }, q: i('flexor digitorum profundus', 'flexor profundo dos dedos'), a: [['distal phalanges of digits 2-5', 'falanges distais dos dedos 2-5', 'base of distal phalanges', 'falanges distais', 'bases of the distal phalanges', 'bases das falanges distais']] },
        { id: 'fpl-o', d3: { focus: ['flexor_pollicis_longus'], view: 'ant', frame: ['flexor_pollicis_longus','radius'], glass: .15 }, q: o('flexor pollicis longus', 'flexor longo do polegar'), a: [['anterior radius', 'face anterior do rádio'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'fpl-i', d3: { focus: ['flexor_pollicis_longus'], view: 'ant', frame: ['flexor_pollicis_longus','radius'], glass: .15 }, q: i('flexor pollicis longus', 'flexor longo do polegar'), a: [['distal phalanx of thumb', 'falange distal do polegar']] },
        { id: 'pq-o', d3: { focus: ['pronator_quadratus'], view: 'ant', frame: ['pronator_quadratus','radius','ulna'], glass: .15 }, q: o('pronator quadratus', 'pronador quadrado'), a: [['distal ulna', 'ulna distal', 'anterior distal ulna', 'ulna distal anterior']] },
        { id: 'pq-i', d3: { focus: ['pronator_quadratus'], view: 'ant', frame: ['pronator_quadratus','radius','ulna'], glass: .15 }, q: i('pronator quadratus', 'pronador quadrado'), a: [['distal radius', 'rádio distal', 'anterior distal radius', 'rádio distal anterior', 'distal quarter of the anterior border of the radius', 'quarto distal da borda anterior do rádio']] },
        { id: 'pq-f', d3: { focus: ['pronator_quadratus'], view: 'ant', frame: ['pronator_quadratus','radius','ulna'], glass: .15 }, q: f('pronator quadratus', 'pronador quadrado'), a: [PRON] },
      ],
    },
    {
      id: 'extensor-origin', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['humerus', 'radius'], d3frame: ['radius', 'ulna'],
      title: ['Extensors · common origin', 'Extensores · origem comum'],
      rule: ['Most extensors share the common extensor origin on the LATERAL epicondyle (tennis elbow). Brachioradialis and ECRL are the exceptions — they start higher, on the lateral supracondylar ridge.',
        'A maioria dos extensores usa a origem extensora comum no EPICÔNDILO LATERAL (cotovelo do tenista). Braquiorradial e ECRL são as exceções — começam mais alto, na crista supracondilar lateral.'],
      items: [
        { id: 'brad-o', d3: { focus: ['brachioradialis'], view: 'ant', frame: ['brachioradialis', 'radius'], glass: .12 }, q: o('brachioradialis', 'braquiorradial'), a: [['lateral supracondylar ridge', 'crista supracondilar lateral', 'proximal lateral supracondylar ridge', 'lateral margin of the humerus', 'margem lateral do úmero', 'lateral epicondyle', 'epicôndilo lateral']] },
        { id: 'ecrl-o', d3: { focus: ['extensor_carpi_radialis_longus'], view: 'post', frame: ['extensor_carpi_radialis_longus','humerus','radius'], glass: .15 }, q: o('extensor carpi radialis longus', 'extensor radial longo do carpo'), a: [['lateral supracondylar ridge', 'crista supracondilar lateral'], ['lateral intermuscular septum', 'septo intermuscular lateral']] },
        { id: 'ecrb-o', d3: { focus: ['extensor_carpi_radialis_brevis'], view: 'post', frame: ['extensor_carpi_radialis_brevis','humerus','radius'], glass: .15 }, q: o('extensor carpi radialis brevis', 'extensor radial curto do carpo'), a: [[...LATE, 'common extensor tendon', 'tendão extensor comum'], ['lateral intermuscular septum', 'septo intermuscular lateral']] },
        { id: 'ed-o', d3: { focus: ['extensor_digitorum'], view: 'post', frame: ['extensor_digitorum', 'radius'], glass: .12 }, q: o('extensor digitorum', 'extensor dos dedos'), a: [[...LATE, 'common extensor tendon', 'tendão extensor comum']] },
        { id: 'ecu-o', d3: { focus: ['extensor_carpi_ulnaris'], view: 'post', frame: ['extensor_carpi_ulnaris','humerus','ulna'], glass: .15 }, q: o('extensor carpi ulnaris', 'extensor ulnar do carpo'), a: [[...LATE, 'common extensor tendon', 'tendão extensor comum'], ['posterior ulna', 'face posterior da ulna', 'posterior border of the ulna', 'borda posterior da ulna']] },
        { id: 'sup-o', d3: { focus: ['supinator'], view: 'post', frame: ['supinator','radius','ulna'], glass: .15 }, q: o('supinator', 'supinador'), a: [LATE, ['annular ligament of radius', 'ligamento anular do rádio', 'anular ligament'], ['radial collateral ligament', 'ligamento colateral radial'], ['supinator crest of the ulna', 'crista do supinador da ulna', 'proximal ulna', 'ulna proximal']] },
        { id: 'brad-f', d3: { focus: ['brachioradialis'], view: 'ant', frame: ['brachioradialis', 'radius'], glass: .12 }, q: f('brachioradialis', 'braquiorradial'), a: [['elbow flexion (mid-prone)', 'flexão do cotovelo (posição neutra)', 'flexion of the elbow', 'flexão do cotovelo']] },
      ],
    },
    {
      id: 'extensor-action', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['radius', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Extensors · insertion and action', 'Extensores · inserção e função'],
      rule: ['The three "wrist" extensors hit metacarpals 2, 3 and 5; extensor digitorum splits into four tendons for digits 2-5. The thumb trio APL → EPB → EPL climb 1st metacarpal → proximal phalanx → distal phalanx, and supinator turns the palm up.',
        'Os três extensores "do punho" chegam aos metacarpos 2, 3 e 5; o extensor dos dedos se divide em quatro tendões para os dedos 2-5. O trio do polegar APL → EPB → EPL sobe 1º metacarpo → falange proximal → falange distal, e o supinador vira a palma para cima.'],
      items: [
        { id: 'ecrl-i', d3: { focus: ['extensor_carpi_radialis_longus'], view: 'post', frame: ['extensor_carpi_radialis_longus','humerus','radius'], glass: .15 }, q: i('extensor carpi radialis longus', 'extensor radial longo do carpo'), a: [['base of 2nd metacarpal', 'base do 2º metacarpo', '2nd metacarpal', 'segundo metacarpo']] },
        { id: 'ecrb-i', d3: { focus: ['extensor_carpi_radialis_brevis'], view: 'post', frame: ['extensor_carpi_radialis_brevis','humerus','radius'], glass: .15 }, q: i('extensor carpi radialis brevis', 'extensor radial curto do carpo'), a: [['base of 3rd metacarpal', 'base do 3º metacarpo', '3rd metacarpal', 'terceiro metacarpo']] },
        { id: 'ecu-i', d3: { focus: ['extensor_carpi_ulnaris'], view: 'post', frame: ['extensor_carpi_ulnaris','humerus','ulna'], glass: .15 }, q: i('extensor carpi ulnaris', 'extensor ulnar do carpo'), a: [['base of 5th metacarpal', 'base do 5º metacarpo', '5th metacarpal', 'quinto metacarpo']] },
        { id: 'ed-i', d3: { focus: ['extensor_digitorum'], view: 'post', frame: ['extensor_digitorum','radius','ulna'], glass: .15 }, q: i('extensor digitorum', 'extensor dos dedos'), a: [['middle and distal phalanges of digits 2-5', 'falanges média e distal dos dedos 2-5', 'extensor expansions', 'expansões extensoras', 'bases of the middle and distal phalanges', 'bases das falanges média e distal']] },
        { id: 'sup-f', d3: { focus: ['supinator'], view: 'post', frame: ['supinator','radius','ulna'], glass: .15 }, q: f('supinator', 'supinador'), a: [SUP] },
        { id: 'apl-i', d3: { focus: ['abductor_pollicis_longus'], view: 'post', frame: ['abductor_pollicis_longus','radius'], glass: .15 }, q: i('abductor pollicis longus', 'abdutor longo do polegar'), a: [['base of 1st metacarpal', 'base do 1º metacarpo', '1st metacarpal', 'primeiro metacarpo']] },
        { id: 'epb-i', d3: { focus: ['extensor_pollicis_brevis'], view: 'post', frame: ['extensor_pollicis_brevis','radius'], glass: .15 }, q: i('extensor pollicis brevis', 'extensor curto do polegar'), a: [['base of proximal phalanx of thumb', 'base da falange proximal do polegar', 'proximal phalanx of thumb', 'falange proximal do polegar']] },
        { id: 'epl-i', d3: { focus: ['extensor_pollicis_longus'], view: 'post', frame: ['extensor_pollicis_longus','ulna'], glass: .15 }, q: i('extensor pollicis longus', 'extensor longo do polegar'), a: [['distal phalanx of thumb', 'falange distal do polegar']] },
      ],
    },
    {
      id: 'flexor-nerves', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['radius', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Flexors · innervation', 'Flexores · inervação'],
      rule: ['Anterior forearm = MEDIAN nerve, with exactly two ulnar exceptions: FCU and the medial half of FDP (digits 4-5).',
        'Antebraço anterior = nervo MEDIANO, com exatamente duas exceções ulnares: o FCU e a metade medial do FDP (dedos 4-5).'],
      items: [
        { id: 'pt-n', d3: { focus: ['pronator_teres'], view: 'ant', frame: ['pronator_teres','humerus','radius'], glass: .15 }, q: n('pronator teres', 'pronador redondo'), a: [MED] },
        { id: 'fcr-n', d3: { focus: ['flexor_carpi_radialis'], view: 'ant', frame: ['flexor_carpi_radialis', 'radius'], glass: .12 }, q: n('flexor carpi radialis', 'flexor radial do carpo'), a: [MED] },
        { id: 'pl-n', d3: { focus: ['palmaris_longus_muscle'], view: 'ant', frame: ['palmaris_longus_muscle','humerus','ulna'], glass: .15 }, q: n('palmaris longus', 'palmar longo'), a: [MED] },
        { id: 'fcu-n', d3: { focus: ['flexor_carpi_ulnaris'], view: 'ant', frame: ['flexor_carpi_ulnaris', 'ulna'], glass: .12 }, q: n('flexor carpi ulnaris', 'flexor ulnar do carpo'), a: [ULN] },
        { id: 'fds-n', d3: { focus: ['flexor_digitorum_superficialis'], view: 'ant', frame: ['flexor_digitorum_superficialis','radius','ulna'], glass: .15 }, q: n('flexor digitorum superficialis', 'flexor superficial dos dedos'), a: [MED] },
        { id: 'fdp-n', d3: { focus: ['flexor_digitorum_profundus'], view: 'ant', frame: ['flexor_digitorum_profundus','radius','ulna'], glass: .15 }, q: n('flexor digitorum profundus', 'flexor profundo dos dedos'), a: [['median nerve (lateral half) and ulnar nerve (medial half)', 'nervo mediano (metade lateral) e nervo ulnar (metade medial)', 'median and ulnar nerves', 'nervos mediano e ulnar']] },
        { id: 'fpl-n', d3: { focus: ['flexor_pollicis_longus'], view: 'ant', frame: ['flexor_pollicis_longus','radius'], glass: .15 }, q: n('flexor pollicis longus', 'flexor longo do polegar'), a: [MED] },
        { id: 'pq-n', d3: { focus: ['pronator_quadratus'], view: 'ant', frame: ['pronator_quadratus','radius','ulna'], glass: .15 }, q: n('pronator quadratus', 'pronador quadrado'), a: [MED] },
      ],
    },
    {
      id: 'extensor-nerves', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['radius', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Extensors · innervation', 'Extensores · inervação'],
      rule: ['Posterior forearm = all RADIAL nerve — the whole group is simply "radial nerve"; precisely, brachioradialis and ECRL take the radial n. itself and everything below the elbow takes its deep branch, the posterior interosseous n.',
        'Antebraço posterior = todo NERVO RADIAL — o grupo todo é simplesmente "nervo radial"; com precisão, braquiorradial e ECRL recebem o próprio nervo radial e tudo abaixo do cotovelo recebe seu ramo profundo, o nervo interósseo posterior.'],
      items: [
        { id: 'brad-n', d3: { focus: ['brachioradialis'], view: 'ant', frame: ['brachioradialis', 'radius'], glass: .12 }, q: n('brachioradialis', 'braquiorradial'), a: [RAD] },
        { id: 'ecrl-n', d3: { focus: ['extensor_carpi_radialis_longus'], view: 'post', frame: ['extensor_carpi_radialis_longus','humerus','radius'], glass: .15 }, q: n('extensor carpi radialis longus', 'extensor radial longo do carpo'), a: [RAD] },
        { id: 'ecrb-n', d3: { focus: ['extensor_carpi_radialis_brevis'], view: 'post', frame: ['extensor_carpi_radialis_brevis','humerus','radius'], glass: .15 }, q: n('extensor carpi radialis brevis', 'extensor radial curto do carpo'), a: [PIN] },
        { id: 'ed-n', d3: { focus: ['extensor_digitorum'], view: 'post', frame: ['extensor_digitorum', 'radius'], glass: .12 }, q: n('extensor digitorum', 'extensor dos dedos'), a: [PIN] },
        { id: 'edm-n', d3: { focus: ['extensor_digiti_minimi'], view: 'post', frame: ['extensor_digiti_minimi','ulna'], glass: .15 }, q: n('extensor digiti minimi', 'extensor do dedo mínimo'), a: [PIN] },
        { id: 'ei-n', d3: { focus: ['extensor_indicis'], view: 'post', frame: ['extensor_indicis','ulna'], glass: .15 }, q: n('extensor indicis', 'extensor do indicador'), a: [PIN] },
        { id: 'ecu-n', d3: { focus: ['extensor_carpi_ulnaris'], view: 'post', frame: ['extensor_carpi_ulnaris','humerus','ulna'], glass: .15 }, q: n('extensor carpi ulnaris', 'extensor ulnar do carpo'), a: [PIN] },
        { id: 'sup-n', d3: { focus: ['supinator'], view: 'post', frame: ['supinator','radius','ulna'], glass: .15 }, q: n('supinator', 'supinador'), a: [PIN] },
        { id: 'pin-inv', d3: { focus: ['supinator','extensor_carpi_radialis_brevis','extensor_digitorum','extensor_carpi_ulnaris','extensor_indicis'], view: 'post', frame: ['supinator','extensor_carpi_radialis_brevis','extensor_digitorum','extensor_carpi_ulnaris','extensor_indicis','radius','ulna'], glass: .15 }, q: ['Which forearm muscles does the posterior interosseous nerve supply?', 'Quais músculos do antebraço o nervo interósseo posterior inerva?'], a: [['extensor carpi radialis brevis', 'extensor radial curto do carpo'], ['extensor digitorum', 'extensor dos dedos'], ['extensor digiti minimi', 'extensor do dedo mínimo'], ['extensor carpi ulnaris', 'extensor ulnar do carpo'], ['supinator', 'supinador'], ['abductor pollicis longus', 'abdutor longo do polegar'], ['extensor pollicis brevis', 'extensor curto do polegar'], ['extensor pollicis longus', 'extensor longo do polegar'], ['extensor indicis', 'extensor do indicador']] },
      ],
    },
    {
      id: 'finger-extensors', d3ctx: ['humerus', 'radius', 'ulna'], d3anchor: ['humerus', 'ulna'], d3frame: ['radius', 'ulna'],
      title: ['Extensor digiti minimi and extensor indicis', 'Extensor do dedo mínimo e extensor do indicador'],
      rule: ['Two extensors end on a single finger: extensor digiti minimi from the common extensor tendon to the 5th digit, extensor indicis from the posterior ulna + interosseous membrane to the 2nd. Both are radial nerve (posterior interosseous branch).',
        'Dois extensores terminam em um dedo só: o extensor do dedo mínimo, do tendão extensor comum para o 5º dedo, e o extensor do indicador, da face posterior da ulna + membrana interóssea para o 2º. Ambos são nervo radial (ramo interósseo posterior).'],
      items: [
        { id: 'edm-o', d3: { focus: ['extensor_digiti_minimi'], view: 'post', frame: ['extensor_digiti_minimi','ulna'], glass: .15 }, q: o('extensor digiti minimi', 'extensor do dedo mínimo'), a: [['common extensor tendon', 'tendão extensor comum', 'common extensor origin', 'origem extensora comum', 'lateral epicondyle', 'epicôndilo lateral']] },
        { id: 'edm-i', d3: { focus: ['extensor_digiti_minimi'], view: 'post', frame: ['extensor_digiti_minimi','ulna'], glass: .15 }, q: i('extensor digiti minimi', 'extensor do dedo mínimo'), a: [['fifth digit', 'quinto dedo', '5th digit', '5º dedo', 'extensor expansion of the 5th digit', 'expansão extensora do 5º dedo', 'little finger', 'dedo mínimo']] },
        { id: 'edm-f', d3: { focus: ['extensor_digiti_minimi'], view: 'post', frame: ['extensor_digiti_minimi','ulna'], glass: .15 }, q: f('extensor digiti minimi', 'extensor do dedo mínimo'), a: [['extension of the little finger', 'extensão do dedo mínimo', 'extension of the 5th digit', 'extensão do 5º dedo']] },
        { id: 'ei-o', d3: { focus: ['extensor_indicis'], view: 'post', frame: ['extensor_indicis','ulna'], glass: .15 }, q: o('extensor indicis', 'extensor do indicador'), a: [['posterior surface of the ulna', 'face posterior da ulna', 'posterior ulna'], ['interosseous membrane', 'membrana interóssea']] },
        { id: 'ei-i', d3: { focus: ['extensor_indicis'], view: 'post', frame: ['extensor_indicis','ulna'], glass: .15 }, q: i('extensor indicis', 'extensor do indicador'), a: [['dorsal aponeurosis of the 2nd finger', 'aponeurose dorsal do 2º dedo', 'extensor expansion of the index finger', 'expansão extensora do indicador', 'dorsal aponeurosis of the index finger']] },
        { id: 'ei-f', d3: { focus: ['extensor_indicis'], view: 'post', frame: ['extensor_indicis','ulna'], glass: .15 }, q: f('extensor indicis', 'extensor do indicador'), a: [['extension of the index finger', 'extensão do indicador', 'extension of the 2nd finger', 'extensão do 2º dedo']] },
      ],
    },
  ],
};
