// Source: standard anatomy. To be checked against the professor's slides.
const MED = ['median nerve', 'nervo mediano'];
const ULN = ['ulnar nerve', 'nervo ulnar', 'nervo cubital'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];
const FR = ['flexor retinaculum', 'retináculo dos flexores'];
const PP = ['base of proximal phalanx of thumb', 'base da falange proximal do polegar', 'proximal phalanx of thumb', 'falange proximal do polegar'];
const PP5 = ['base of proximal phalanx of 5th digit', 'base da falange proximal do 5º dedo', 'proximal phalanx of 5th digit', 'falange proximal do 5º dedo'];

export default {
  id: 'hand',
  rewards: true,
  title: ['Hand', 'Mão'],
  sets: [
    {
      id: 'thenar', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ['Thenar muscles', 'Músculos tenares'],
      rule: ['Three thenar muscles (abductor, flexor brevis, opponens) sit on the thumb pad and make up 3 of the 4 LOAF letters; the adductor pollicis is the flat one in the palm between the metacarpals and is NOT thenar.',
        'Três músculos tenares (abdutor, flexor curto, oponente) formam a eminência tenar e são 3 das 4 letras do LOAF; o adutor do polegar é o músculo achatado na palma entre os metacarpos e NÃO é tenar.'],
      items: [
        { id: 'apb-o', d3: { focus: ['abductor_pollicis_brevis'], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: o('abductor pollicis brevis', 'abdutor curto do polegar'), a: [FR, ['scaphoid', 'escafoide'], ['trapezium', 'trapézio']] },
        { id: 'apb-i', d3: { focus: ['abductor_pollicis_brevis'], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: i('abductor pollicis brevis', 'abdutor curto do polegar'), a: [PP] },
        { id: 'apb-f', d3: { focus: ['abductor_pollicis_brevis'], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: f('abductor pollicis brevis', 'abdutor curto do polegar'), a: [['abduction of the thumb', 'abdução do polegar']] },
        { id: 'fpb-f', d3: { focus: ['flexor_pollicis_brevis'], view: 'ant', frame: ['flexor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: f('flexor pollicis brevis', 'flexor curto do polegar'), a: [['flexion of the thumb', 'flexão do polegar']] },
        { id: 'op-f', d3: { focus: ['opponens_pollicis_muscle'], view: 'ant', frame: ['opponens_pollicis_muscle','palmar_aponeurosis'], glass: .15 }, q: f('opponens pollicis', 'oponente do polegar'), a: [['opposition of the thumb', 'oposição do polegar', 'opposition']] },
        { id: 'op-i', d3: { focus: ['opponens_pollicis_muscle'], view: 'ant', frame: ['opponens_pollicis_muscle','palmar_aponeurosis'], glass: .15 }, q: i('opponens pollicis', 'oponente do polegar'), a: [['1st metacarpal', '1º metacarpo', 'first metacarpal', 'primeiro metacarpo']] },
        { id: 'addp-o', d3: { focus: ['adductor_pollicis'], view: 'ant', frame: ['adductor_pollicis','palmar_aponeurosis'], glass: .15 }, q: o('adductor pollicis', 'adutor do polegar'), a: [['2nd and 3rd metacarpals', '2º e 3º metacarpos', 'oblique and transverse heads', 'cabeças oblíqua e transversa']] },
        { id: 'addp-f', d3: { focus: ['adductor_pollicis'], view: 'ant', frame: ['adductor_pollicis','palmar_aponeurosis'], glass: .15 }, q: f('adductor pollicis', 'adutor do polegar'), a: [['adduction of the thumb', 'adução do polegar']] },
      ],
    },
    {
      id: 'hypothenar', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ['Hypothenar and palmaris brevis', 'Hipotênar e palmar curto'],
      rule: ['Three hypothenar muscles mirror the thenar set on the little finger: abductor, flexor brevis, opponens. Palmaris brevis is the odd one out — a skin muscle over the hypothenar eminence.',
        'Três músculos hipotenares espelham o conjunto tenar no dedo mínimo: abdutor, flexor curto, oponente. O palmar curto é o diferente — um músculo da pele sobre a eminência hipotenar.'],
      items: [
        { id: 'adqm-o', d3: { focus: ['abductor_digiti_minimi_of_hand'], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .15 }, q: o('abductor digiti minimi', 'abdutor do dedo mínimo'), a: [['pisiform', 'pisiforme']] },
        { id: 'adqm-f', d3: { focus: ['abductor_digiti_minimi_of_hand'], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .15 }, q: f('abductor digiti minimi', 'abdutor do dedo mínimo'), a: [['abduction of the little finger', 'abdução do dedo mínimo']] },
        { id: 'fdqm-o', d3: { focus: ['flexor_digiti_minimi_of_hand'], view: 'ant', frame: ['flexor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .15 }, q: o('flexor digiti minimi brevis', 'flexor curto do dedo mínimo'), a: [['hook of hamate', 'hâmulo do hamato', 'hamulus of hamate'], FR] },
        { id: 'odqm-f', d3: { focus: ['opponens_digiti_minimi_muscle_of_hand'], view: 'ant', frame: ['opponens_digiti_minimi_muscle_of_hand','palmar_aponeurosis'], glass: .15 }, q: f('opponens digiti minimi', 'oponente do dedo mínimo'), a: [['opposition of the little finger', 'oposição do dedo mínimo']] },
        { id: 'odqm-i', d3: { focus: ['opponens_digiti_minimi_muscle_of_hand'], view: 'ant', frame: ['opponens_digiti_minimi_muscle_of_hand','palmar_aponeurosis'], glass: .15 }, q: i('opponens digiti minimi', 'oponente do dedo mínimo'), a: [['5th metacarpal', '5º metacarpo', 'fifth metacarpal', 'quinto metacarpo']] },
        { id: 'pb-f', d3: { focus: ['palmar_aponeurosis'], view: 'ant', frame: ['palmar_aponeurosis','palmar_aponeurosis'], glass: .15 }, q: f('palmaris brevis', 'palmar curto'), a: [['wrinkles the skin of the palm', 'enruga a pele da palma', 'tightens palmar aponeurosis', 'tensiona a aponeurose palmar']] },
        { id: 'adqm-i', d3: { focus: ['abductor_digiti_minimi_of_hand'], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .15 }, q: i('abductor digiti minimi', 'abdutor do dedo mínimo'), a: [PP5] },
      ],
    },
    {
      id: 'lumbricals-interossei', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ['Lumbricals and interossei', 'Lumbricais e interósseos'],
      rule: ['Lumbricals flex the MCP and extend the IP joints ("lumbricals = the hand\'s worm-like fine movers"). Interossei act on the MCPs: PAD = Palmar Adduct, DAB = Dorsal Abduct.',
        'Os lumbricais flexionam a metacarpofalângica e estendem as interfalângicas ("lumbricais = os movimentos finos da mão"). Os interósseos agem nas metacarpofalângicas: PAD = Palmar Aduz, DAB = Dorsal Abduz.'],
      items: [
        { id: 'lum-f', d3: { focus: ['lumbrical_muscles_of_hand'], view: 'ant', frame: ['lumbrical_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: f('lumbricals', 'lumbricais'), a: [['flexion of the MCP joints and extension of the IP joints', 'flexão das metacarpofalângicas e extensão das interfalângicas', 'flex MCP, extend IP', 'flexion MCP and extension IP']] },
        { id: 'lum-i', d3: { focus: ['lumbrical_muscles_of_hand'], view: 'ant', frame: ['lumbrical_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: i('lumbricals', 'lumbricais'), a: [['extensor expansion of digits 2-5', 'expansão extensora dos dedos 2-5', 'extensor expansions']] },
        { id: 'pal-i', d3: { focus: ['palmar_interossei_muscles'], view: 'ant', frame: ['palmar_interossei_muscles','palmar_aponeurosis'], glass: .15 }, q: f('palmar interossei', 'interósseos palmares'), a: [['adduction of the fingers', 'adução dos dedos', 'adduct', 'adução']] },
        { id: 'dab-f', d3: { focus: ['dorsal_interossei_muscles_of_hand'], view: 'ant', frame: ['dorsal_interossei_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: f('dorsal interossei', 'interósseos dorsais'), a: [['abduction of the fingers', 'abdução dos dedos', 'abduct', 'abdução']] },
        { id: 'first-dab', d3: { focus: ['dorsal_interossei_muscles_of_hand'], view: 'ant', frame: ['dorsal_interossei_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: ['Which muscle abducts the index finger from the midline?', 'Qual músculo abduz o dedo indicador a partir da linha média?'], a: [['first dorsal interosseous', 'primeiro interósseo dorsal', '1st dorsal interosseous']] },
      ],
    },
    {
      id: 'nerves', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ['Hand · innervation', 'Mão · inervação'],
      rule: ['LOAF: the MEDIAN nerve supplies the Lumbricals 1-2, Opponens pollicis, Abductor pollicis brevis and Flexor pollicis brevis. EVERY other intrinsic hand muscle is ULNAR (all interossei, lumbricals 3-4, adductor pollicis, all hypothenar).',
        'LOAF: o nervo MEDIANO inerva os Lumbricais 1-2, Oponente do polegar, Abdutor curto do polegar e Flexor curto do polegar. TODO outro músculo intrínseco da mão é ULNAR (todos os interósseos, lumbricais 3-4, adutor do polegar, todo o hipotênar).'],
      items: [
        { id: 'apb-n', d3: { focus: ['abductor_pollicis_brevis'], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: n('abductor pollicis brevis', 'abdutor curto do polegar'), a: [MED] },
        { id: 'op-n', d3: { focus: ['opponens_pollicis_muscle'], view: 'ant', frame: ['opponens_pollicis_muscle','palmar_aponeurosis'], glass: .15 }, q: n('opponens pollicis', 'oponente do polegar'), a: [MED] },
        { id: 'fpb-n', d3: { focus: ['flexor_pollicis_brevis'], view: 'ant', frame: ['flexor_pollicis_brevis','palmar_aponeurosis'], glass: .15 }, q: n('flexor pollicis brevis', 'flexor curto do polegar'), a: [MED] },
        { id: 'addp-n', d3: { focus: ['adductor_pollicis'], view: 'ant', frame: ['adductor_pollicis','palmar_aponeurosis'], glass: .15 }, q: n('adductor pollicis', 'adutor do polegar'), a: [ULN] },
        { id: 'pb-n', d3: { focus: ['palmar_aponeurosis'], view: 'ant', frame: ['palmar_aponeurosis','palmar_aponeurosis'], glass: .15 }, q: n('palmaris brevis', 'palmar curto'), a: [ULN] },
        { id: 'lum-n', d3: { focus: ['lumbrical_muscles_of_hand'], view: 'ant', frame: ['lumbrical_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: n('lumbricals', 'lumbricais'), a: [['median nerve (1-2) and ulnar nerve (3-4)', 'nervo mediano (1-2) e nervo ulnar (3-4)', 'median and ulnar nerves', 'nervos mediano e ulnar']] },
        { id: 'interossei-n', d3: { focus: ['palmar_interossei_muscles','dorsal_interossei_muscles_of_hand'], view: 'ant', frame: ['palmar_interossei_muscles','dorsal_interossei_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: n('interossei', 'interósseos'), a: [ULN] },
        { id: 'median-inv', d3: { focus: ['abductor_pollicis_brevis','flexor_pollicis_brevis','opponens_pollicis_muscle','lumbrical_muscles_of_hand'], view: 'ant', frame: ['abductor_pollicis_brevis','flexor_pollicis_brevis','opponens_pollicis_muscle','lumbrical_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: ['Which intrinsic hand muscles does the median nerve supply?', 'Quais músculos intrínsecos da mão o nervo mediano inerva?'], a: [['lumbricals 1-2', 'lumbricais 1-2'], ['opponens pollicis', 'oponente do polegar'], ['abductor pollicis brevis', 'abdutor curto do polegar'], ['flexor pollicis brevis', 'flexor curto do polegar']] },
      ],
    },
    {
      id: 'ulnar-inverse', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ['Ulnar nerve · hand muscles', 'Nervo ulnar · músculos da mão'],
      rule: ['Everything except LOAF is ulnar. Clinically that means ulnar palsy claws the hand (lumbricals 3-4 + interossei) while thumb opposition is spared.',
        'Tudo exceto o LOAF é ulnar. Clinicamente, a paralisia ulnar gera mão em garra (lumbricais 3-4 + interósseos), enquanto a oposição do polegar fica preservada.'],
      items: [
        { id: 'ulnar-inv', d3: { focus: ['adductor_pollicis','abductor_digiti_minimi_of_hand','flexor_digiti_minimi_of_hand','opponens_digiti_minimi_muscle_of_hand','palmar_interossei_muscles'], view: 'ant', frame: ['adductor_pollicis','abductor_digiti_minimi_of_hand','flexor_digiti_minimi_of_hand','opponens_digiti_minimi_muscle_of_hand','palmar_interossei_muscles','palmar_aponeurosis'], glass: .15 }, q: ['Which intrinsic hand muscles does the ulnar nerve supply?', 'Quais músculos intrínsecos da mão o nervo ulnar inerva?'], a: [['all interossei', 'todos os interósseos', 'palmar and dorsal interossei', 'interósseos palmares e dorsais'], ['lumbricals 3-4', 'lumbricais 3-4'], ['adductor pollicis', 'adutor do polegar'], ['all hypothenar muscles', 'todos os músculos hipotenares', 'hypothenar muscles', 'músculos hipotenares'], ['palmaris brevis', 'palmar curto']] },
        { id: 'hypo-n', d3: { focus: ['abductor_digiti_minimi_of_hand','flexor_digiti_minimi_of_hand','opponens_digiti_minimi_muscle_of_hand'], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','flexor_digiti_minimi_of_hand','opponens_digiti_minimi_muscle_of_hand','palmar_aponeurosis'], glass: .15 }, q: n('hypothenar muscles', 'músculos hipotenares'), a: [ULN] },
        { id: 'lum34-n', d3: { focus: ['lumbrical_muscles_of_hand'], view: 'ant', frame: ['lumbrical_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: n('lumbricals 3 and 4', 'lumbricais 3 e 4'), a: [ULN] },
        { id: 'claw-f', d3: { focus: ['lumbrical_muscles_of_hand','palmar_interossei_muscles','dorsal_interossei_muscles_of_hand'], view: 'ant', frame: ['lumbrical_muscles_of_hand','palmar_interossei_muscles','dorsal_interossei_muscles_of_hand','palmar_aponeurosis'], glass: .15 }, q: ['Which muscle group is paralysed in an ulnar nerve lesion that causes claw hand?', 'Qual grupo muscular fica paralisado na lesão do nervo ulnar que causa mão em garra?'], a: [['lumbricals 3-4', 'lumbricais 3-4'], ['interossei', 'interósseos']] },
      ],
    },
    {
      id: 'by-landmark', d3ctx: ['radius', 'ulna', 'palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3anchor: ['radius', 'ulna'], d3frame: ['palmar_aponeurosis', 'flexor_retinaculum_of_wrist'], d3half: 'lo',
      title: ["Hand · by landmark", "Mão · por ponto ósseo"],
      items: [
        { id: 'lm-o-scaphoid', d3: { focus: ["abductor_pollicis_brevis"], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscle originates from the scaphoid?", "Qual músculo da mão se origina no escafoide?"], a: [["abductor pollicis brevis", "abdutor curto do polegar"]] },
        { id: 'lm-o-trapezium', d3: { focus: ["abductor_pollicis_brevis", "flexor_pollicis_brevis", "opponens_pollicis_muscle"], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscles originate from the trapezium?", "Quais músculos da mão se originam no trapézio?"], a: [["abductor pollicis brevis", "abdutor curto do polegar"], ["flexor pollicis brevis", "flexor curto do polegar"], ["opponens pollicis", "oponente do polegar"]] },
        { id: 'lm-o-pisiform', d3: { focus: ["abductor_digiti_minimi_of_hand"], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscle originates from the pisiform?", "Qual músculo da mão se origina no pisiforme?"], a: [["abductor digiti minimi", "abdutor do dedo mínimo", "abdutor do dedo minimo"]] },
        { id: 'lm-o-hook-of-hamate', d3: { focus: ["flexor_digiti_minimi_of_hand", "opponens_digiti_minimi_muscle_of_hand"], view: 'ant', frame: ['flexor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscles originate from the hook of hamate?", "Quais músculos da mão se originam no hâmulo do hamato?"], a: [["flexor digiti minimi brevis", "flexor curto do dedo mínimo", "flexor curto do dedo minimo"], ["opponens digiti minimi", "oponente do dedo mínimo", "oponente do dedo minimo"]] },
        { id: 'lm-i-base-of-the-proximal-phalanx-of-the-thumb', d3: { focus: ["abductor_pollicis_brevis", "flexor_pollicis_brevis", "adductor_pollicis"], view: 'ant', frame: ['abductor_pollicis_brevis','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscles insert on the base of the proximal phalanx of the thumb?", "Quais músculos da mão se inserem na base da falange proximal do polegar?"], a: [["abductor pollicis brevis", "abdutor curto do polegar"], ["flexor pollicis brevis", "flexor curto do polegar"], ["adductor pollicis", "adutor do polegar"]] },
        { id: 'lm-i-base-of-the-proximal-phalanx-of-the-5th-digit', d3: { focus: ["abductor_digiti_minimi_of_hand", "flexor_digiti_minimi_of_hand"], view: 'ant', frame: ['abductor_digiti_minimi_of_hand','palmar_aponeurosis'], glass: .12 }, q: ["Which hand muscles insert on the base of the proximal phalanx of the 5th digit?", "Quais músculos da mão se inserem na base da falange proximal do 5º dedo?"], a: [["abductor digiti minimi", "abdutor do dedo mínimo", "abdutor do dedo minimo"], ["flexor digiti minimi brevis", "flexor curto do dedo mínimo", "flexor curto do dedo minimo"]] },
      ],
    },
  ],
};
