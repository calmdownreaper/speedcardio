// SpeedGastro · Salivary glands supply blocks: supply sheet, branching drill, and
// territories, passing structures and nerves in both directions. Facts only from
// deck 02 (p9 facial nerve and secretomotor supply, p18–20 submandibular relations,
// p23–25 and p32 sublingual, p26 parotid arteries, p27 parotid veins and nodes,
// p28–30 structures through the parotid, p31 submandibular vessels).
// Lymph: the deck names the superficial parotid nodes and lateral cervical nodes
// beside the parotid, and nodes around the floor of the mouth; no lymph drainage is given.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const L = {
  eca: t('External carotid artery', 'Artéria carótida externa'),
  stp: t('Superficial temporal artery', 'Artéria temporal superficial'),
  tfa: t('Transverse facial artery', 'Artéria facial transversa'),
  maxa: t('Maxillary artery', 'Artéria maxilar'),
  pauric: t('Posterior auricular artery', 'Artéria auricular posterior'),
  facial: t('Facial artery', 'Artéria facial'),
  glandb: t('Glandular branches', 'Ramos glandulares'),
  submental: t('Submental artery', 'Artéria submentual'),
  lingual: t('Lingual artery', 'Artéria lingual'),
  sublg: t('Sublingual artery', 'Artéria sublingual'),
  sup_thy: t('Superior thyroid artery', 'Artéria tireóidea superior'),
  asc_ph: t('Ascending pharyngeal artery', 'Artéria faríngea ascendente'),
  occip: t('Occipital artery', 'Artéria occipital'),
  nerves: t('Nerves of the salivary glands', 'Nervos das glândulas salivares'),
  par: t('Parotid', 'Parótida'),
  subm_sub: t('Submandibular and sublingual', 'Submandibular e sublingual'),
  ix: t('Glossopharyngeal (IX): secretomotor supply', 'Glossofaríngeo (IX): suprimento secretor'),
  vii: t('Facial (VII): runs through, does not supply', 'Facial (VII): atravessa, não inerva'),
  lingn: t('Lingual nerve: parasympathetic fibres', 'Nervo lingual: fibras parassimpáticas'),
  ganglion: t('From the submandibular ganglion', 'Do gânglio submandibular'),
  deep: t('Deep part: lingual nerve above, hypoglossal below', 'Parte profunda: nervo lingual acima, hipoglosso abaixo'),
};
const note = (en, pt) => t(en, pt);

const ARTERY_TREE = {
  root: { label: L.eca, children: [
    { label: L.sup_thy }, { label: L.asc_ph }, { label: L.occip },
    { label: L.lingual, children: [{ label: L.sublg, note: note('to the sublingual gland', 'para a glândula sublingual') }] },
    { label: L.facial, note: note('gives the submandibular vessels', 'dá os vasos submandibulares'), children: [
      { label: L.glandb, note: note('submandibular gland', 'glândula submandibular') }, { label: L.submental },
    ] },
    { label: L.pauric, note: note('given off inside the parotid', 'dada dentro da parótida') },
    { label: L.stp, note: note('terminal branch', 'ramo terminal'), children: [{ label: L.tfa, note: note('to the parotid', 'para a parótida') }] },
    { label: L.maxa, note: note('terminal branch', 'ramo terminal') },
  ] },
  links: [],
};

const NERVE_TREE = {
  root: { label: L.nerves, children: [
    { label: L.par, children: [{ label: L.ix }, { label: L.vii }] },
    { label: L.subm_sub, children: [
      { label: L.lingn, children: [{ label: L.ganglion }] },
      { label: L.deep },
    ] },
  ] },
  links: [],
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'salivary-sup1', supply: true, title: t('Supply sheet: arteries, veins, lymph and nerves', 'Ficha de suprimento: artérias, veias, linfa e nervos'),
    cards: [
      {
        id: 'salivary-sup-arteries', ref: '26, 31–32', title: t('Arteries of the salivary glands at a glance', 'Artérias das glândulas salivares num relance'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('### Parotid', '### Parótida'),
          t('The parotid is supplied by branches of the External carotid artery that lie next to the gland, together with the transverse facial artery, the first branch of the superficial temporal artery. Inside the gland, the External carotid artery gives off the posterior auricular artery, then ends as the superficial temporal and maxillary arteries. These vessels form a rich capillary network around the acini, the secretory units of the gland.',
            'A parótida é irrigada por ramos da artéria carótida externa que ficam junto da glândula, além da artéria facial transversa, a primeira ramificação da artéria temporal superficial. Dentro da glândula, a artéria carótida externa dá a artéria auricular posterior e termina como artérias temporal superficial e maxilar. Esses vasos formam uma rede capilar rica em volta dos ácinos, as unidades secretoras da glândula.'),
          t('### Submandibular', '### Submandibular'),
          t('The submandibular gland is supplied by branches of the facial artery, and its venous drainage goes to the facial vein.',
            'A glândula submandibular é irrigada por ramos da artéria facial, e sua drenagem venosa vai para a veia facial.'),
          t('### Sublingual', '### Sublingual'),
          t('The sublingual gland is supplied by the sublingual branch of the lingual artery, and it is drained by the sublingual vein.',
            'A glândula sublingual é irrigada pelo ramo sublingual da artéria lingual, e é drenada pela veia sublingual.'),
        ],
      },
      {
        id: 'salivary-sup-veins-nerves', ref: '9, 27, 31–32', title: t('Veins, lymph and nerves at a glance', 'Veias, linfa e nervos num relance'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('### Parotid veins', '### Veias da parótida'),
          t('The superficial temporal and maxillary veins join to form the retromandibular vein. Its anterior branch joins the facial vein, and its posterior branch joins the posterior auricular vein to form the external jugular vein. Drainage of the parotid goes to the external jugular vein.',
            'As veias temporal superficial e maxilar se juntam para formar a veia retromandibular. Seu ramo anterior se une à veia facial, e seu ramo posterior se une à veia auricular posterior para formar a veia jugular externa. A drenagem da parótida vai para a veia jugular externa.'),
          t('### Submandibular and sublingual veins', '### Veias da submandibular e da sublingual'),
          t('The submandibular gland drains to the facial vein. The sublingual gland drains through the sublingual vein into the lingual vein, and then into the internal jugular vein.',
            'A glândula submandibular drena para a veia facial. A glândula sublingual drena pela veia sublingual para a veia lingual e, depois, para a veia jugular interna.'),
          t('### Lymph nodes', '### Linfonodos'),
          t('The superficial parotid nodes and the lateral cervical nodes lie beside the parotid. The submandibular and sublingual glands sit around the mobile floor of the mouth with nearby lymph nodes, and the examiner feels them together against resistance during bimanual palpation.',
            'Os linfonodos parotídeos superficiais e os linfonodos cervicais laterais ficam ao lado da parótida. As glândulas submandibular e sublingual ficam em volta do assoalho móvel da boca, junto com linfonodos próximos, e são palpados juntos, contra resistência, no exame bimanual.'),
          t('### Nerves', '### Nervos'),
          t('The parotid receives its secretory, autonomic supply from the glossopharyngeal nerve (IX). The facial nerve (VII) runs through the gland but does not supply it, and it is at risk during parotid tumour surgery. The submandibular and sublingual glands receive parasympathetic fibres that the lingual nerve carries from the submandibular ganglion. Salivation as a whole is controlled by the autonomic nervous system.',
            'A parótida recebe sua inervação secretora e autônoma do nervo glossofaríngeo (IX). O nervo facial (VII) atravessa a glândula, mas não a inerva, e corre risco durante a cirurgia de tumor da parótida. As glândulas submandibular e sublingual recebem fibras parassimpáticas que o nervo lingual leva a partir do gânglio submandibular. A salivação, no conjunto, é controlada pelo sistema nervoso autônomo.'),
        ],
      },
    ],
    questions: [
      q('26', { q: 'Which artery is the first branch of the superficial temporal artery and supplies the parotid?', correct: 'Transverse facial artery', wrong: ['Posterior auricular artery', 'Maxillary artery', 'Lingual artery'], why: 'The transverse facial artery is the first branch of the superficial temporal artery and supplies the parotid together with the branches of the external carotid.' },
        { q: 'Qual artéria é o primeiro ramo da artéria temporal superficial e irriga a parótida?', correct: 'Artéria facial transversa', wrong: ['Artéria auricular posterior', 'Artéria maxilar', 'Artéria lingual'], why: 'A artéria facial transversa é o primeiro ramo da artéria temporal superficial e irriga a parótida junto com os ramos da carótida externa.' }),
      q('27', { q: 'Which two veins join to form the retromandibular vein?', correct: 'Superficial temporal and maxillary veins', wrong: ['Facial and lingual veins', 'Posterior auricular and occipital veins', 'Sublingual and lingual veins'], why: 'The superficial temporal and maxillary veins form the retromandibular vein.' },
        { q: 'Quais duas veias formam a veia retromandibular?', correct: 'Veias temporal superficial e maxilar', wrong: ['Veias facial e lingual', 'Veias auricular posterior e occipital', 'Veias sublingual e lingual'], why: 'As veias temporal superficial e maxilar formam a veia retromandibular.' }),
      q('27', { q: 'Where does parotid drainage go?', correct: 'External jugular vein', wrong: ['Internal jugular vein', 'Facial vein', 'Cavernous sinus'], why: 'Drainage of the parotid goes to the external jugular vein.' },
        { q: 'Para onde vai a drenagem da parótida?', correct: 'Veia jugular externa', wrong: ['Veia jugular interna', 'Veia facial', 'Seio cavernoso'], why: 'A drenagem da parótida vai para a veia jugular externa.' }),
      q('27', { q: 'Which lymph nodes lie beside the parotid?', correct: 'Superficial parotid nodes and lateral cervical nodes', wrong: ['Axillary nodes and inguinal nodes', 'Mediastinal nodes only', 'Mesenteric nodes only'], why: 'The superficial parotid nodes and the lateral cervical nodes lie beside the parotid.' },
        { q: 'Quais linfonodos ficam ao lado da parótida?', correct: 'Linfonodos parotídeos superficiais e cervicais laterais', wrong: ['Linfonodos axilares e inguinais', 'Apenas linfonodos mediastinais', 'Apenas linfonodos mesentéricos'], why: 'Os linfonodos parotídeos superficiais e os cervicais laterais ficam ao lado da parótida.' }),
      q('31', { q: 'Into which vein does the submandibular gland drain?', correct: 'Facial vein', wrong: ['Retromandibular vein', 'Lingual vein', 'Maxillary vein'], why: 'The submandibular gland is drained by the facial vein.' },
        { q: 'Em qual veia a glândula submandibular drena?', correct: 'Veia facial', wrong: ['Veia retromandibular', 'Veia lingual', 'Veia maxilar'], why: 'A glândula submandibular é drenada pela veia facial.' }),
      q('32', { q: 'Where does the sublingual gland drain?', correct: 'Sublingual vein, then lingual vein, then internal jugular vein', wrong: ['Directly into the external jugular vein', 'Into the facial vein', 'Into the cavernous sinus'], why: 'The sublingual vein drains into the lingual vein, and then into the internal jugular vein.' },
        { q: 'Para onde drena a glândula sublingual?', correct: 'Veia sublingual, depois veia lingual, depois veia jugular interna', wrong: ['Diretamente na veia jugular externa', 'Na veia facial', 'No seio cavernoso'], why: 'A veia sublingual drena para a veia lingual e, depois, para a veia jugular interna.' }),
    ],
  },
  {
    id: 'salivary-sup2', supply: true, title: t('Branching: the external carotid tree of the glands', 'Ramificação: a árvore da carótida externa das glândulas'),
    cards: [
      {
        id: 'salivary-sup-tree', ref: '26, 31–32', title: t('Walk the external carotid tree', 'Percorra a árvore da carótida externa'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud. The posterior auricular artery is given off inside the parotid. The External carotid artery ends as the superficial temporal and maxillary arteries, and the transverse facial artery is the first branch of the superficial temporal.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta. A artéria auricular posterior é dada dentro da parótida. A artéria carótida externa termina como as artérias temporal superficial e maxilar, e a artéria facial transversa é o primeiro ramo da temporal superficial.'),
          t('### Where names change', '### Onde os nomes mudam'),
          t('The External carotid artery changes its name at its end: it becomes the superficial temporal artery and the maxillary artery. Along the way, the lingual artery gives the sublingual artery to the sublingual gland, and the facial artery gives the glandular branches to the submandibular gland.',
            'A artéria carótida externa muda de nome no fim: torna-se as artérias temporal superficial e maxilar. No caminho, a artéria lingual dá a artéria sublingual para a glândula sublingual, e a artéria facial dá os ramos glandulares para a glândula submandibular.'),
        ],
      },
    ],
    questions: [
      q('26', { q: 'Which branch of the external carotid is given off inside the parotid?', correct: 'Posterior auricular artery', wrong: ['Facial artery', 'Lingual artery', 'Occipital artery'], why: 'When the external carotid artery is in the parotid, it gives off the posterior auricular artery.' },
        { q: 'Qual ramo da carótida externa é dado dentro da parótida?', correct: 'Artéria auricular posterior', wrong: ['Artéria facial', 'Artéria lingual', 'Artéria occipital'], why: 'Quando a carótida externa está na parótida, ela dá a artéria auricular posterior.' }),
      q('26', { q: 'Into which two arteries does the external carotid artery end?', correct: 'Superficial temporal and maxillary arteries', wrong: ['Facial and lingual arteries', 'Occipital and posterior auricular arteries', 'Superior thyroid and ascending pharyngeal arteries'], why: 'The external carotid artery ends as the superficial temporal and maxillary arteries.' },
        { q: 'Em quais duas artérias a carótida externa termina?', correct: 'Artérias temporal superficial e maxilar', wrong: ['Artérias facial e lingual', 'Artérias occipital e auricular posterior', 'Artérias tireóidea superior e faríngea ascendente'], why: 'A carótida externa termina como as artérias temporal superficial e maxilar.' }),
      q('26', { q: 'Which artery gives the transverse facial artery?', correct: 'Superficial temporal artery', wrong: ['Facial artery', 'Maxillary artery', 'Lingual artery'], why: 'The transverse facial artery is the first branch of the superficial temporal artery.' },
        { q: 'Qual artéria dá a artéria facial transversa?', correct: 'Artéria temporal superficial', wrong: ['Artéria facial', 'Artéria maxilar', 'Artéria lingual'], why: 'A artéria facial transversa é o primeiro ramo da artéria temporal superficial.' }),
      q('32', { q: 'Which branch of the lingual artery supplies the sublingual gland?', correct: 'Sublingual artery', wrong: ['Dorsal lingual artery', 'Deep lingual artery', 'Superior thyroid artery'], why: 'The sublingual artery is the sublingual branch of the lingual artery that supplies the sublingual gland.' },
        { q: 'Qual ramo da artéria lingual irriga a glândula sublingual?', correct: 'Artéria sublingual', wrong: ['Artéria lingual dorsal', 'Artéria lingual profunda', 'Artéria tireóidea superior'], why: 'A artéria sublingual é o ramo sublingual da artéria lingual que irriga a glândula sublingual.' }),
      q('31', { q: 'Which artery supplies the submandibular gland?', correct: 'Branches of the facial artery', wrong: ['Branches of the lingual artery only', 'Branches of the maxillary artery only', 'Branches of the superior thyroid artery'], why: 'The submandibular gland is supplied by branches of the facial artery.' },
        { q: 'Qual artéria irriga a glândula submandibular?', correct: 'Ramos da artéria facial', wrong: ['Apenas ramos da artéria lingual', 'Apenas ramos da artéria maxilar', 'Ramos da artéria tireóidea superior'], why: 'A glândula submandibular é irrigada por ramos da artéria facial.' }),
    ],
  },
  {
    id: 'salivary-sup3', supply: true, title: t('Territories, passing structures and nerves, both directions', 'Territórios, estruturas que atravessam e nervos, nos dois sentidos'),
    cards: [
      {
        id: 'salivary-sup-territories', ref: '26, 28–31', title: t('Who supplies what, and what passes through the parotid', 'Quem irriga o quê, e o que atravessa a parótida'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('Transverse facial artery: the parotid, with the branches of the External carotid next to it. Posterior auricular artery: given off inside the parotid. Facial artery: the submandibular gland. Sublingual artery: the sublingual gland.',
            'Artéria facial transversa: a parótida, junto com os ramos da carótida externa ao lado dela. Artéria auricular posterior: dada dentro da parótida. Artéria facial: a glândula submandibular. Artéria sublingual: a glândula sublingual.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('Turn it around when you revise. Parotid: the transverse facial artery and the branches of the External carotid next to the gland. Submandibular gland: branches of the facial artery. Sublingual gland: the sublingual artery, from the lingual artery.',
            'Inverta ao revisar. Parótida: a artéria facial transversa e os ramos da carótida externa ao lado da glândula. Glândula submandibular: ramos da artéria facial. Glândula sublingual: a artéria sublingual, da artéria lingual.'),
          t('### What passes through the parotid', '### O que atravessa a parótida'),
          t('From superficial to deep, the facial nerve, the retromandibular vein and the External carotid artery pass through the parotid. The facial nerve leaves the stylomastoid foramen and then splits into temporofacial and cervicofacial divisions, and its branches are the temporal, zygomatic, buccal, marginal mandibular and cervical branches.',
            'De superficial para profundo, o nervo facial, a veia retromandibular e a artéria carótida externa atravessam a parótida. O nervo facial sai pelo forame estilomastóideo e depois se divide em divisões temporofacial e cervicofacial, e seus ramos são os temporais, zigomáticos, bucais, marginal da mandíbula e cervicais.'),
        ],
      },
      {
        id: 'salivary-sup-nerves', ref: '9, 18–20, 32', title: t('Nerve map of the salivary glands', 'Mapa nervoso das glândulas salivares'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the two groups. Parotid: the glossopharyngeal nerve supplies its secretion, while the facial nerve runs through the gland without supplying it. Submandibular and sublingual: the lingual nerve carries their parasympathetic fibres from the submandibular ganglion, and the deep part of the submandibular gland lies between the lingual nerve above and the hypoglossal nerve below.',
            'Toque pelos dois grupos. Parótida: o nervo glossofaríngeo supre sua secreção, enquanto o nervo facial atravessa a glândula sem inervá-la. Submandibular e sublingual: o nervo lingual leva suas fibras parassimpáticas a partir do gânglio submandibular, e a parte profunda da glândula submandibular fica entre o nervo lingual acima e o nervo hipoglosso abaixo.'),
          t('### Surgical risk', '### Risco cirúrgico'),
          t('The facial nerve is at risk in parotid tumour surgery. To find it, the surgeon identifies the outer, cartilaginous third of the external acoustic meatus.',
            'O nervo facial corre risco na cirurgia de tumor da parótida. Para encontrá-lo, o cirurgião identifica o terço externo, cartilaginoso, do meato acústico externo.'),
        ],
      },
    ],
    questions: [
      q('9', { q: 'Which nerve gives the secretory supply of the parotid?', correct: 'Glossopharyngeal nerve (IX)', wrong: ['Facial nerve (VII)', 'Hypoglossal nerve (XII)', 'Trigeminal nerve (V)'], why: 'The autonomic secretory supply to the parotid comes from the glossopharyngeal nerve (IX).' },
        { q: 'Qual nervo dá a inervação secretora da parótida?', correct: 'Nervo glossofaríngeo (IX)', wrong: ['Nervo facial (VII)', 'Nervo hipoglosso (XII)', 'Nervo trigêmeo (V)'], why: 'A inervação secretora autônoma da parótida vem do nervo glossofaríngeo (IX).' }),
      q('9', { q: 'Which nerve passes through the parotid but does not supply the gland?', correct: 'Facial nerve (VII)', wrong: ['Glossopharyngeal nerve (IX)', 'Lingual nerve (V3)', 'Vagus nerve (X)'], why: 'The facial nerve does not innervate the gland; it supplies the muscles of facial expression.' },
        { q: 'Qual nervo atravessa a parótida mas não inerva a glândula?', correct: 'Nervo facial (VII)', wrong: ['Nervo glossofaríngeo (IX)', 'Nervo lingual (V3)', 'Nervo vago (X)'], why: 'O nervo facial não inerva a glândula; ele supre os músculos da expressão facial.' }),
      q('28–30', { q: 'Which structures pass through the parotid, from superficial to deep?', correct: 'Facial nerve, retromandibular vein, external carotid artery', wrong: ['External carotid artery, facial nerve, retromandibular vein', 'Parotid duct, facial artery, facial vein', 'Lingual nerve, hypoglossal nerve, submandibular duct'], why: 'From superficial to deep the facial nerve, the retromandibular vein and the external carotid artery pass through the parotid.' },
        { q: 'Quais estruturas atravessam a parótida, de superficial para profundo?', correct: 'Nervo facial, veia retromandibular, artéria carótida externa', wrong: ['Artéria carótida externa, nervo facial, veia retromandibular', 'Ducto parotídeo, artéria facial, veia facial', 'Nervo lingual, nervo hipoglosso, ducto submandibular'], why: 'De superficial para profundo, o nervo facial, a veia retromandibular e a artéria carótida externa atravessam a parótida.' }),
      q('32', { q: 'Which nerve carries parasympathetic fibres to the sublingual gland from the submandibular ganglion?', correct: 'Lingual nerve', wrong: ['Facial nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve'], why: 'The parasympathetic fibres reach the sublingual gland from the submandibular ganglion, carried by the lingual nerve.' },
        { q: 'Qual nervo leva fibras parassimpáticas à glândula sublingual a partir do gânglio submandibular?', correct: 'Nervo lingual', wrong: ['Nervo facial', 'Nervo hipoglosso', 'Nervo glossofaríngeo'], why: 'As fibras parassimpáticas chegam à glândula sublingual a partir do gânglio submandibular, levadas pelo nervo lingual.' }),
      q('18–20', { q: 'Which two nerves lie around the deep part of the submandibular gland, above and below?', correct: 'Lingual nerve above, hypoglossal nerve below', wrong: ['Hypoglossal nerve above, lingual nerve below', 'Facial nerve above, glossopharyngeal nerve below', 'Vagus nerve above, facial nerve below'], why: 'The deep part lies between the lingual nerve above and the hypoglossal nerve below.' },
        { q: 'Quais dois nervos ficam em volta da parte profunda da glândula submandibular, acima e abaixo?', correct: 'Nervo lingual acima, nervo hipoglosso abaixo', wrong: ['Nervo hipoglosso acima, nervo lingual abaixo', 'Nervo facial acima, nervo glossofaríngeo abaixo', 'Nervo vago acima, nervo facial abaixo'], why: 'A parte profunda fica entre o nervo lingual acima e o nervo hipoglosso abaixo.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
