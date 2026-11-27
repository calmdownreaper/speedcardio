// SpeedGastro · Pharynx supply blocks: supply sheet, branching drill, and the
// parapharyngeal contents and nerves. Facts only from deck 03 (p11 soft-palate
// table, p37–39 vessels and nerves, p45 parapharyngeal space). The deck has few
// vascular facts, so there are three blocks.
// Lymph: the deck describes the tonsils and Waldeyer's ring as lymphoid tissue, but
// gives no lymphatic drainage for the pharynx; the sheet says so.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const note = (en, pt) => t(en, pt);

const L = {
  eca: t('External carotid artery', 'Artéria carótida externa'),
  asc: t('Ascending pharyngeal artery', 'Artéria faríngea ascendente'),
  fac: t('Facial artery', 'Artéria facial'),
  aPal: t('Ascending palatine artery', 'Artéria palatina ascendente'),
  ton: t('Tonsillar artery', 'Artéria tonsilar'),
  sthy: t('Superior thyroid artery', 'Artéria tireóidea superior'),
  nerves: t('Innervation of the pharynx and soft palate', 'Inervação da faringe e do palato mole'),
  motor: t('Motor: vagus (X) and accessory to the vagus', 'Motora: vago (X) e acessório do vago'),
  vagpp: t('Vagus through the pharyngeal plexus: soft palate muscles', 'Vago pelo plexo faríngeo: músculos do palato mole'),
  stylo: t('Glossopharyngeal (IX): stylopharyngeus', 'Glossofaríngeo (IX): estilofaríngeo'),
  sens: t('Sensory: glossopharyngeal (IX) and vagus (X)', 'Sensitiva: glossofaríngeo (IX) e vago (X)'),
  ix: t('Glossopharyngeal (IX)', 'Glossofaríngeo (IX)'),
  vx: t('Vagus (X)', 'Vago (X)'),
  tvp: t('Tensor veli palatini', 'Tensor do véu palatino'),
  v3: t('Nerve to medial pterygoid (CN V3), via the otic ganglion', 'Nervo do pterigoide medial (V3), pelo gânglio ótico'),
  pps: t('Parapharyngeal space', 'Espaço parafaríngeo'),
};

const ARTERY_TREE = {
  root: { label: L.eca, children: [
    { label: L.sthy },
    { label: L.asc },
    { label: L.fac, children: [{ label: L.aPal, note: note('palatine', 'palatino') }, { label: L.ton, note: note('tonsil', 'tonsila') }] },
  ] },
  links: [],
};

const NERVE_TREE = {
  root: { label: L.nerves, children: [
    { label: L.motor, children: [{ label: L.vagpp }, { label: L.stylo }] },
    { label: L.sens, children: [{ label: L.ix }, { label: L.vx }] },
    { label: L.tvp, children: [{ label: L.v3 }] },
  ] },
  links: [],
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'pharynx-sup1', supply: true, title: t('Supply sheet: arteries, veins, lymph and nerves', 'Ficha de suprimento: artérias, veias, linfa e nervos'),
    cards: [
      {
        id: 'pharynx-sup-arteries', ref: '37–38', title: t('Arteries and veins of the pharynx at a glance', 'Artérias e veias da faringe num relance'),
        focus: ['superior_constrictor', 'middle_constrictor', 'inferior_constrictor'], ghost: ['tongue', 'esophagus'], view: 'ant',
        body: [
          t('### Where they come from', '### De onde vêm'),
          t('The pharynx is supplied by branches of the External carotid artery: the ascending pharyngeal artery, the facial artery and the superior thyroid artery. The facial artery contributes its ascending palatine and tonsillar branches to the pharynx.',
            'A faringe é irrigada por ramos da artéria carótida externa: a artéria faríngea ascendente, a artéria facial e a artéria tireóidea superior. A artéria facial contribui com seus ramos palatino ascendente e tonsilar para a faringe.'),
          t('### Veins', '### Veias'),
          t('The pharyngeal venous plexus lies in two intramural layers, a superficial and a deep one. It is drained by the pharyngeal veins into the internal jugular vein.',
            'O plexo venoso faríngeo fica em duas camadas intramurais, uma superficial e uma profunda. Ele é drenado pelas veias faríngeas para a veia jugular interna.'),
          t('### Lymph', '### Linfa'),
          t('The tonsils are described as lymphoid tissue. Waldeyer’s ring is the ring of lymphoid tissue in the naso- and oropharynx that surrounds the entrance to the respiratory and digestive tracts. No lymphatic drainage of the pharynx is given.',
            'As tonsilas são descritas como tecido linfoide. O anel de Waldeyer é o anel de tecido linfoide na nasofaringe e na orofaringe que envolve a entrada das vias respiratória e digestiva. Nenhuma drenagem linfática da faringe é descrita.'),
        ],
      },
      {
        id: 'pharynx-sup-nerves', ref: '11, 39', title: t('Nerves of the pharynx at a glance', 'Nervos da faringe num relance'),
        focus: ['superior_constrictor', 'middle_constrictor', 'inferior_constrictor'], ghost: ['tongue', 'esophagus'], view: 'ant',
        body: [
          t('### Motor and sensory', '### Motora e sensitiva'),
          t('Swallowing starts voluntarily and then becomes involuntary. Its motor supply is the vagus nerve (X) together with an accessory to the vagus. The sensory supply comes from the glossopharyngeal nerve (IX) and the vagus nerve (X). The glossopharyngeal nerve is also the motor nerve of the stylopharyngeus.',
            'A deglutição começa voluntária e depois fica involuntária. Sua inervação motora é o nervo vago (X), junto com um acessório do vago. A inervação sensitiva vem do nervo glossofaríngeo (IX) e do nervo vago (X). O glossofaríngeo é também o nervo motor do estilofaríngeo.'),
          t('### Soft palate muscles', '### Músculos do palato mole'),
          t('The levator veli palatini, the musculus uvulae, the palatoglossus and the palatopharyngeus receive the vagus through the pharyngeal plexus. The tensor veli palatini is supplied by the nerve to the medial pterygoid (CN V3), through the otic ganglion.',
            'O levantador do véu palatino, o músculo da úvula, o palatoglosso e o palatofaríngeo recebem o vago pelo plexo faríngeo. O tensor do véu palatino é suprido pelo nervo do pterigoide medial (V3), através do gânglio ótico.'),
        ],
      },
    ],
    questions: [
      q('37', { q: 'Which three branches of the external carotid artery supply the pharynx?', correct: 'Ascending pharyngeal, facial and superior thyroid arteries', wrong: ['Lingual, occipital and maxillary arteries', 'Ascending pharyngeal, internal carotid and vertebral arteries', 'Facial, superficial temporal and posterior auricular arteries'], why: 'The pharynx is supplied by the ascending pharyngeal, facial and superior thyroid arteries, all branches of the external carotid.' },
        { q: 'Quais três ramos da artéria carótida externa irrigam a faringe?', correct: 'Artérias faríngea ascendente, facial e tireóidea superior', wrong: ['Artérias lingual, occipital e maxilar', 'Artérias faríngea ascendente, carótida interna e vertebral', 'Artérias facial, temporal superficial e auricular posterior'], why: 'A faringe é irrigada pelas artérias faríngea ascendente, facial e tireóidea superior, todas ramos da carótida externa.' }),
      q('38', { q: 'Into which vein does the pharyngeal venous plexus drain?', correct: 'Internal jugular vein, through the pharyngeal veins', wrong: ['External jugular vein', 'Facial vein', 'Cavernous sinus'], why: 'The pharyngeal veins drain the pharyngeal venous plexus into the internal jugular vein.' },
        { q: 'Em qual veia o plexo venoso faríngeo drena?', correct: 'Veia jugular interna, pelas veias faríngeas', wrong: ['Veia jugular externa', 'Veia facial', 'Seio cavernoso'], why: 'As veias faríngeas drenam o plexo venoso faríngeo para a veia jugular interna.' }),
      q('38', { q: 'How many intramural layers does the pharyngeal venous plexus have?', correct: 'Two, a superficial and a deep one', wrong: ['One only', 'Three, superficial, middle and deep', 'Four, all arranged in a ring'], why: 'The pharyngeal venous plexus lies in two intramural layers, superficial and deep.' },
        { q: 'Quantas camadas intramurais tem o plexo venoso faríngeo?', correct: 'Duas, uma superficial e uma profunda', wrong: ['Apenas uma', 'Três: superficial, média e profunda', 'Quatro, todas em anel'], why: 'O plexo venoso faríngeo fica em duas camadas intramurais, superficial e profunda.' }),
      q('39', { q: 'Which two nerves give the sensory supply of the pharynx?', correct: 'Glossopharyngeal (IX) and vagus (X)', wrong: ['Trigeminal (V) and facial (VII)', 'Hypoglossal (XII) and accessory (XI)', 'Lingual (V3) and facial (VII)'], why: 'The sensory supply of the pharynx comes from the glossopharyngeal nerve (IX) and the vagus nerve (X).' },
        { q: 'Quais dois nervos dão a inervação sensitiva da faringe?', correct: 'Glossofaríngeo (IX) e vago (X)', wrong: ['Trigêmeo (V) e facial (VII)', 'Hipoglosso (XII) e acessório (XI)', 'Lingual (V3) e facial (VII)'], why: 'A inervação sensitiva da faringe vem do glossofaríngeo (IX) e do vago (X).' }),
      q('39', { q: 'Which nerves form the motor supply of swallowing?', correct: 'Vagus nerve (X) and an accessory to the vagus', wrong: ['Glossopharyngeal nerve (IX) only', 'Hypoglossal nerve (XII)', 'Facial nerve (VII)'], why: 'Swallowing starts voluntarily and becomes involuntary; its motor supply is the vagus and an accessory to the vagus.' },
        { q: 'Quais nervos formam a inervação motora da deglutição?', correct: 'Nervo vago (X) e um acessório do vago', wrong: ['Apenas o glossofaríngeo (IX)', 'Nervo hipoglosso (XII)', 'Nervo facial (VII)'], why: 'A deglutição começa voluntária e fica involuntária; a motora é o vago e um acessório do vago.' }),
      q('11', { q: 'Which nerve supplies the levator veli palatini?', correct: 'Vagus through the pharyngeal plexus', wrong: ['Nerve to medial pterygoid (CN V3)', 'Hypoglossal nerve (XII)', 'Facial nerve (VII)'], why: 'The vagus supplies the levator veli palatini through the pharyngeal plexus.' },
        { q: 'Qual nervo supre o levantador do véu palatino?', correct: 'Vago pelo plexo faríngeo', wrong: ['Nervo do pterigoide medial (V3)', 'Nervo hipoglosso (XII)', 'Nervo facial (VII)'], why: 'O vago inerva o levantador do véu palatino pelo plexo faríngeo.' }),
    ],
  },
  {
    id: 'pharynx-sup2', supply: true, title: t('Branching: the external carotid branches of the pharynx', 'Ramificação: os ramos da carótida externa da faringe'),
    cards: [
      {
        id: 'pharynx-sup-tree', ref: '37–38', title: t('Walk the pharyngeal arterial tree', 'Percorra a árvore arterial da faringe'),
        focus: ['superior_constrictor', 'middle_constrictor', 'inferior_constrictor'], ghost: ['tongue', 'esophagus'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud. Three branches of the External carotid artery reach the pharynx: the superior thyroid, the ascending pharyngeal and the facial artery. The facial artery adds its ascending palatine and tonsillar branches.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta. Três ramos da artéria carótida externa chegam à faringe: a tireóidea superior, a faríngea ascendente e a artéria facial. A artéria facial acrescenta seus ramos palatino ascendente e tonsilar.'),
          t('### Where names change', '### Onde os nomes mudam'),
          t('The deck gives no change of name for these branches. The ascending pharyngeal, superior thyroid and facial arteries all come straight from the External carotid artery.',
            'O material não traz mudança de nome para esses ramos. A artéria faríngea ascendente, a tireóidea superior e a facial saem todas diretamente da artéria carótida externa.'),
        ],
      },
    ],
    questions: [
      q('37', { q: 'From which artery does the ascending pharyngeal artery arise?', correct: 'External carotid artery', wrong: ['Internal carotid artery', 'Vertebral artery', 'Subclavian artery'], why: 'The ascending pharyngeal artery is a branch of the external carotid artery.' },
        { q: 'De qual artéria nasce a artéria faríngea ascendente?', correct: 'Artéria carótida externa', wrong: ['Artéria carótida interna', 'Artéria vertebral', 'Artéria subclávia'], why: 'A artéria faríngea ascendente é um ramo da artéria carótida externa.' }),
      q('37', { q: 'Which branches does the facial artery give to the pharynx?', correct: 'Ascending palatine and tonsillar branches', wrong: ['Dorsal lingual and sublingual branches', 'Angular and submental branches', 'Posterior auricular and occipital branches'], why: 'The facial artery gives the ascending palatine and tonsillar branches to the pharynx.' },
        { q: 'Quais ramos a artéria facial dá para a faringe?', correct: 'Ramos palatino ascendente e tonsilar', wrong: ['Ramos linguais dorsal e sublingual', 'Ramos angular e submentual', 'Ramos auricular posterior e occipital'], why: 'A artéria facial dá os ramos palatino ascendente e tonsilar para a faringe.' }),
      q('37', { q: 'Which branch of the external carotid artery supplies the pharynx together with the facial artery and the ascending pharyngeal artery?', correct: 'Superior thyroid artery', wrong: ['Lingual artery', 'Occipital artery', 'Maxillary artery'], why: 'The superior thyroid artery is listed with the ascending pharyngeal and facial arteries as a supply of the pharynx.' },
        { q: 'Qual ramo da carótida externa irriga a faringe junto com a artéria facial e a faríngea ascendente?', correct: 'Artéria tireóidea superior', wrong: ['Artéria lingual', 'Artéria occipital', 'Artéria maxilar'], why: 'A artéria tireóidea superior aparece junto com as artérias faríngea ascendente e facial como suprimento da faringe.' }),
      q('37', { q: 'Which artery gives the ascending palatine branch to the pharynx?', correct: 'Facial artery', wrong: ['Lingual artery', 'Superior thyroid artery', 'Occipital artery'], why: 'The ascending palatine branch comes from the facial artery.' },
        { q: 'Qual artéria dá o ramo palatino ascendente para a faringe?', correct: 'Artéria facial', wrong: ['Artéria lingual', 'Artéria tireóidea superior', 'Artéria occipital'], why: 'O ramo palatino ascendente vem da artéria facial.' }),
    ],
  },
  {
    id: 'pharynx-sup3', supply: true, title: t('Contents of the parapharyngeal space and nerves, both directions', 'Conteúdo do espaço parafaríngeo e nervos, nos dois sentidos'),
    cards: [
      {
        id: 'pharynx-sup-contents', ref: '38, 45', title: t('What lies in the parapharyngeal space', 'O que fica no espaço parafaríngeo'),
        focus: ['superior_constrictor', 'middle_constrictor', 'inferior_constrictor'], ghost: ['tongue', 'esophagus'], view: 'ant',
        body: [
          t('### Parts of the space', '### Partes do espaço'),
          t('The parapharyngeal space surrounds the pharynx behind and on each side. Its retropharyngeal part is thin connective tissue on the prevertebral fascia. Its lateral, or lateropharyngeal, part contains the neurovascular structures.',
            'O espaço parafaríngeo envolve a faringe por trás e dos dois lados. Sua parte retrofaríngea é um tecido conjuntivo fino sobre a fáscia pré-vertebral. Sua parte lateral, ou laterofaríngea, contém as estruturas neurovasculares.'),
          t('### Structures named in this space', '### Estruturas nomeadas nesse espaço'),
          t('The structures named here are the internal jugular vein, the common carotid artery, the external and internal carotid arteries, the ascending pharyngeal artery and the superior thyroid artery. They also include the pharyngeal venous plexus, the carotid body, the sympathetic trunk, the superior cervical ganglion, and the cranial nerves IX, X, XI and XII, together with the superior laryngeal nerve and the stylopharyngeus.',
            'As estruturas nomeadas aqui são a veia jugular interna, a artéria carótida comum, as artérias carótidas externa e interna, a artéria faríngea ascendente e a artéria tireóidea superior. Incluem também o plexo venoso faríngeo, o corpo carotídeo, o tronco simpático, o gânglio cervical superior e os nervos cranianos IX, X, XI e XII, junto com o nervo laríngeo superior e o estilofaríngeo.'),
          t('### Spread of infection', '### Propagação de infecção'),
          t('Infection of the palatine tonsil can spread through the lateral part of this space. Into the jugular vein it causes bacteraemia and sepsis. Into the subarachnoid space it causes meningitis. Down the retropharyngeal space it can reach the mediastinum.',
            'A infecção da tonsila palatina pode se espalhar pela parte lateral desse espaço. Na veia jugular, causa bacteriemia e sepse. No espaço subaracnóideo, causa meningite. Pelo espaço retrofaríngeo, pode chegar ao mediastino.'),
        ],
      },
      {
        id: 'pharynx-sup-nerves-map', ref: '11, 39, 45', title: t('Nerve map of the pharynx and soft palate', 'Mapa nervoso da faringe e do palato mole'),
        focus: ['superior_constrictor', 'middle_constrictor', 'inferior_constrictor'], ghost: ['tongue'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the three groups. Motor: the vagus, with an accessory to the vagus, drives swallowing, and the soft palate muscles get the vagus through the pharyngeal plexus; the glossopharyngeal nerve is the motor nerve of the stylopharyngeus. Sensory: the glossopharyngeal nerve and the vagus. Tensor veli palatini: the nerve to the medial pterygoid, which is CN V3, through the otic ganglion.',
            'Toque pelos três grupos. Motora: o vago, com um acessório do vago, comanda a deglutição, e os músculos do palato mole recebem o vago pelo plexo faríngeo; o nervo glossofaríngeo é o nervo motor do estilofaríngeo. Sensitiva: o nervo glossofaríngeo e o vago. Tensor do véu palatino: o nervo do pterigoide medial, que é o V3, pelo gânglio ótico.'),
        ],
      },
    ],
    questions: [
      q('39', { q: 'Which nerve is the motor nerve of the stylopharyngeus?', correct: 'Glossopharyngeal nerve (IX)', wrong: ['Vagus nerve (X)', 'Hypoglossal nerve (XII)', 'Facial nerve (VII)'], why: 'The glossopharyngeal nerve supplies the stylopharyngeus.' },
        { q: 'Qual nervo é o motor do estilofaríngeo?', correct: 'Nervo glossofaríngeo (IX)', wrong: ['Nervo vago (X)', 'Nervo hipoglosso (XII)', 'Nervo facial (VII)'], why: 'O nervo glossofaríngeo inerva o estilofaríngeo.' }),
      q('11', { q: 'Which nerve supplies the tensor veli palatini?', correct: 'Nerve to the medial pterygoid (CN V3), through the otic ganglion', wrong: ['Vagus through the pharyngeal plexus', 'Hypoglossal nerve (XII)', 'Glossopharyngeal nerve (IX)'], why: 'The tensor veli palatini is supplied by the nerve to the medial pterygoid, a branch of CN V3, through the otic ganglion.' },
        { q: 'Qual nervo supre o tensor do véu palatino?', correct: 'Nervo do pterigoide medial (V3), pelo gânglio ótico', wrong: ['Vago pelo plexo faríngeo', 'Nervo hipoglosso (XII)', 'Nervo glossofaríngeo (IX)'], why: 'O tensor do véu palatino é suprido pelo nervo do pterigoide medial, ramo do V3, pelo gânglio ótico.' }),
      q('45', { q: 'Infection of the palatine tonsil that enters the jugular vein causes which condition?', correct: 'Bacteraemia and sepsis', wrong: ['Meningitis', 'Mediastinitis only', 'Cavernous sinus thrombosis'], why: 'Spread into the jugular vein causes bacteraemia and sepsis.' },
        { q: 'A infecção da tonsila palatina que atinge a veia jugular causa qual quadro?', correct: 'Bacteriemia e sepse', wrong: ['Meningite', 'Apenas mediastinite', 'Trombose do seio cavernoso'], why: 'A propagação para a veia jugular causa bacteriemia e sepse.' }),
      q('45', { q: 'What does the lateral part of the parapharyngeal space contain?', correct: 'The neurovascular structures of the pharynx', wrong: ['Only the lymph nodes of the neck', 'Only the mucosa of the nasopharynx', 'Only the tongue muscles'], why: 'The lateropharyngeal part contains the neurovascular structures.' },
        { q: 'O que a parte lateral do espaço parafaríngeo contém?', correct: 'As estruturas neurovasculares da faringe', wrong: ['Apenas os linfonodos do pescoço', 'Apenas a mucosa da nasofaringe', 'Apenas os músculos da língua'], why: 'A parte laterofaríngea contém as estruturas neurovasculares.' }),
      q('45', { q: 'Through which space can infection from the palatine tonsil reach the mediastinum?', correct: 'The retropharyngeal space', wrong: ['The subarachnoid space', 'The cavernous sinus', 'The pterygopalatine fossa'], why: 'Infection can travel down the retropharyngeal space into the mediastinum.' },
        { q: 'Por qual espaço a infecção da tonsila palatina pode chegar ao mediastino?', correct: 'Espaço retrofaríngeo', wrong: ['Espaço subaracnóideo', 'Seio cavernoso', 'Fossa pterigopalatina'], why: 'A infecção pode descer pelo espaço retrofaríngeo até o mediastino.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
