// SpeedGastro · Oral cavity supply blocks: supply sheet, branching drill, and
// territories and nerves in both directions. Facts only from deck 01 (p14 palate
// table, p19–23 lips and face, p31–32 cheek, p37 teeth pulp, p51 and p59–63 tongue).
// Lymph: the deck has no lymphatic drainage for the lips, cheeks or tongue; the only
// lymphoid tissue stated is the lingual tonsil, so the sheet has one short lymph note.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const L = {
  eca: t('External carotid artery', 'Artéria carótida externa'),
  facial: t('Facial artery', 'Artéria facial'),
  slab: t('Superior labial artery', 'Artéria labial superior'),
  ilab: t('Inferior labial artery', 'Artéria labial inferior'),
  ang: t('Angular artery', 'Artéria angular'),
  sub: t('Submental artery', 'Artéria submentual'),
  glan: t('Glandular branches', 'Ramos glandulares'),
  ton: t('Tonsillar artery', 'Artéria tonsilar'),
  asc: t('Ascending palatine artery', 'Artéria palatina ascendente'),
  lingual: t('Lingual artery', 'Artéria lingual'),
  dors: t('Dorsal lingual arteries', 'Artérias linguais dorsais'),
  sublg: t('Sublingual artery', 'Artéria sublingual'),
  deep: t('Deep lingual artery', 'Artéria lingual profunda'),
  nerves: t('Innervation of the mouth and tongue', 'Inervação da boca e da língua'),
  motor: t('Motor', 'Motora'),
  gensens: t('General sensation', 'Sensibilidade geral'),
  taste: t('Taste', 'Paladar'),
  vii: t('Facial nerve (VII): lips and cheek muscles', 'Nervo facial (VII): lábios e músculos da bochecha'),
  xii: t('Hypoglossal nerve (XII): tongue muscles', 'Nervo hipoglosso (XII): músculos da língua'),
  vagpal: t('Vagus via pharyngeal plexus: palatoglossus', 'Vago pelo plexo faríngeo: palatoglosso'),
  tri: t('Trigeminal (V): lips and cheeks', 'Trigêmeo (V): lábios e bochechas'),
  v3: t('Lingual nerve (V3): front two thirds', 'Nervo lingual (V3): dois terços anteriores'),
  ix: t('Glossopharyngeal (IX): root of the tongue', 'Glossofaríngeo (IX): raiz da língua'),
  xvag: t('Vagus (X): lingual glands and vessels', 'Vago (X): glândulas e vasos linguais'),
  chorda: t('Facial, chorda tympani: front two thirds, not vallate', 'Facial, corda do tímpano: dois terços anteriores, exceto valadas'),
  ixvall: t('Glossopharyngeal (IX): root and vallate papillae', 'Glossofaríngeo (IX): raiz e papilas valadas'),
};
const note = (en, pt) => t(en, pt);

const ARTERY_TREE = {
  root: { label: L.eca, note: note('from the carotid bifurcation', 'a partir da bifurcação carotídea'), children: [
    { label: L.facial, note: note('lips, cheek and face', 'lábios, bochecha e face'), children: [
      { label: L.slab }, { label: L.ilab }, { label: L.ang, note: note('near the nose', 'perto do nariz') },
      { label: L.sub }, { label: L.glan }, { label: L.ton }, { label: L.asc },
    ] },
    { label: L.lingual, note: note('second anterior branch', 'segundo ramo anterior'), children: [
      { label: L.dors, note: note('to the root', 'para a raiz') },
      { label: L.sublg, note: note('also the sublingual gland', 'também a glândula sublingual') },
      { label: L.deep, note: note('largest; continuation', 'o maior; continuação') },
    ] },
  ] },
  links: [],
};

const NERVE_TREE = {
  root: { label: L.nerves, children: [
    { label: L.motor, children: [{ label: L.vii }, { label: L.xii }, { label: L.vagpal }] },
    { label: L.gensens, children: [{ label: L.tri }, { label: L.v3 }, { label: L.ix }, { label: L.xvag }] },
    { label: L.taste, children: [{ label: L.chorda }, { label: L.ixvall }] },
  ] },
  links: [],
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'oral-sup1', supply: true, title: t('Supply sheet: arteries, veins, lymph and nerves', 'Ficha de suprimento: artérias, veias, linfa e nervos'),
    cards: [
      {
        id: 'oral-sup-arteries', ref: '20–21, 31, 59–60', title: t('Arteries of the mouth and tongue at a glance', 'Artérias da boca e da língua num relance'),
        focus: ['tongue'], ghost: ['teeth', 'submandibular_gland', 'sublingual_gland'], view: 'ant',
        body: [
          t('### Where they come from', '### De onde vêm'),
          t('The lips, cheeks and tongue are supplied by branches of the External carotid artery. This artery rises at the carotid bifurcation and gives the facial artery and the lingual artery as two of its anterior branches. The superficial temporal artery, one of its terminal branches, gives the transverse facial artery to the cheek.',
            'Os lábios, as bochechas e a língua são irrigados por ramos da artéria carótida externa. Essa artéria nasce na bifurcação carotídea e dá a artéria facial e a artéria lingual como dois de seus ramos anteriores. A artéria temporal superficial, um de seus ramos terminais, dá a artéria facial transversa para a bochecha.'),
          t('### The lips and the face', '### Os lábios e a face'),
          t('The lips are supplied by the superior and inferior labial arteries, both branches of the facial artery. The facial artery also gives the angular artery, near the nose, and the submental artery, under the chin. The face has a rich blood supply: facial wounds bleed heavily but heal quickly, and branches of the external carotid anastomose widely with each other and with branches of the ophthalmic artery near the orbit.',
            'Os lábios são irrigados pelas artérias labiais superior e inferior, ambas ramos da artéria facial. A artéria facial também dá a artéria angular, perto do nariz, e a artéria submentual, sob o queixo. A face tem um suprimento sanguíneo rico: ferimentos faciais sangram muito, mas cicatrizam rápido, e os ramos da carótida externa se anastomosam amplamente entre si e com ramos da artéria oftálmica perto da órbita.'),
          t('### The cheek and the tongue', '### A bochecha e a língua'),
          t('The cheek receives the facial artery and the transverse facial artery. The tongue is fed by the lingual artery, which runs forward between the genioglossus and hyoglossus muscles. At the posterior border of hyoglossus it gives one or two dorsal lingual arteries to the root. At the anterior border it divides into the sublingual artery, which also supplies the sublingual gland, and the deep lingual artery, the largest branch and the direct continuation of the lingual artery.',
            'A bochecha recebe a artéria facial e a artéria facial transversa. A língua é irrigada pela artéria lingual, que segue para a frente entre os músculos genioglosso e hioglosso. Na borda posterior do hioglosso, dá uma ou duas artérias linguais dorsais para a raiz. Na borda anterior, divide-se em artéria sublingual, que também irriga a glândula sublingual, e artéria lingual profunda, o maior ramo e a continuação direta da artéria lingual.'),
        ],
      },
      {
        id: 'oral-sup-veins-nerves', ref: '22, 32, 37, 51, 61–63', title: t('Veins, lymph and nerves at a glance', 'Veias, linfa e nervos num relance'),
        focus: ['tongue', 'teeth'], ghost: ['submandibular_gland', 'sublingual_gland'], view: 'ant',
        body: [
          t('### Lips and face: veins', '### Lábios e face: veias'),
          t('The superior and inferior labial veins drain the lips into the facial vein. The submental vein is also listed among the veins of this region. The cheek drains through the facial vein and the retromandibular vein, and the transverse facial vein is also listed for the cheek.',
            'As veias labiais superior e inferior drenam os lábios para a veia facial. A veia submentual também aparece entre as veias dessa região. A bochecha drena pela veia facial e pela veia retromandibular, e a veia facial transversa também aparece para a bochecha.'),
          t('### The danger zone', '### A zona de perigo'),
          t('The angular vein connects to the cavernous sinus, so infection of the danger zone of the face can spread there. In a purulent infection of this area, the angular vein can be tied at a standard site to stop the spread to the sinus.',
            'A veia angular se conecta ao seio cavernoso, então uma infecção da zona de perigo da face pode se espalhar até lá. Em uma infecção purulenta dessa área, a veia angular pode ser ligada em um ponto padrão para interromper a propagação ao seio.'),
          t('### Tongue: veins', '### Língua: veias'),
          t('The tongue has a very rich and variable venous network. The dorsum drains through the dorsal lingual veins. The body drains through the superficial lingual vein, which runs back and joins the sublingual vein to form the lingual vein, and the lingual vein carries this blood on toward the internal jugular vein. The rest drains through the deep lingual vein, which usually, though very variably, goes straight into the internal jugular vein. The deep lingual artery and vein are both labelled on the inferior surface of the tongue.',
            'A língua tem uma rede venosa muito rica e variável. O dorso drena pelas veias linguais dorsais. O corpo drena pela veia lingual superficial, que segue para trás e se une à veia sublingual para formar a veia lingual, e a veia lingual leva esse sangue em direção à veia jugular interna. O restante drena pela veia lingual profunda, que geralmente, embora de forma muito variável, vai direto à veia jugular interna. A artéria e a veia lingual profundas aparecem ambas identificadas na superfície inferior da língua.'),
          t('### Lymph', '### Linfa'),
          t('No lymphatic drainage is described for the lips, cheeks or tongue. The only lymphoid tissue described here is the lingual tonsil, formed by lymphoid nodules in the submucosa of the pharyngeal part of the tongue.',
            'Nenhuma drenagem linfática é descrita para os lábios, as bochechas ou a língua. O único tecido linfoide descrito aqui é a tonsila lingual, formada por nódulos linfoides na submucosa da parte faríngea da língua.'),
          t('### Nerves', '### Nervos'),
          t('The lips get motor fibres from the facial nerve and sensory fibres from the trigeminal nerve, with very high tactile sensitivity. The tongue gets its motor supply from the hypoglossal nerve, which controls its intrinsic and extrinsic muscles. Its general sensation comes from the lingual nerve (V3) in the front two thirds, the glossopharyngeal nerve (IX) at the root, and the vagus nerve (X), which supplies the lingual glands and vessels. The pulp of each tooth holds vessels and nerves, and the root canal opens at the apical foramen.',
            'Os lábios recebem fibras motoras do nervo facial e fibras sensitivas do nervo trigêmeo, com sensibilidade tátil muito alta. A língua recebe sua inervação motora do nervo hipoglosso, que controla seus músculos intrínsecos e extrínsecos. Sua sensibilidade geral vem do nervo lingual (V3) nos dois terços anteriores, do nervo glossofaríngeo (IX) na raiz e do nervo vago (X), que supre as glândulas e os vasos linguais. A polpa de cada dente tem vasos e nervos, e o canal radicular abre-se no forame apical.'),
        ],
      },
    ],
    questions: [
      q('21', { q: 'Which arteries supply the lips?', correct: 'Superior and inferior labial arteries, branches of the facial artery', wrong: ['Lingual and sublingual arteries', 'Deep lingual arteries only', 'Ophthalmic branches only'], why: 'The lips are supplied by the superior and inferior labial arteries, both branches of the facial artery.' },
        { q: 'Quais artérias irrigam os lábios?', correct: 'Artérias labiais superior e inferior, ramos da artéria facial', wrong: ['Artérias lingual e sublingual', 'Apenas as artérias linguais profundas', 'Apenas ramos oftálmicos'], why: 'Os lábios são irrigados pelas artérias labiais superior e inferior, ambas ramos da artéria facial.' }),
      q('22', { q: 'Where do the superior and inferior labial veins drain?', correct: 'Into the facial vein', wrong: ['Into the cavernous sinus', 'Into the lingual vein', 'Into the retromandibular vein only'], why: 'The labial veins drain the lips into the facial vein.' },
        { q: 'Onde drenam as veias labiais superior e inferior?', correct: 'Na veia facial', wrong: ['No seio cavernoso', 'Na veia lingual', 'Apenas na veia retromandibular'], why: 'As veias labiais drenam os lábios para a veia facial.' }),
      q('32', { q: 'Which intracranial structure does the angular vein connect to, making the danger zone dangerous?', correct: 'The cavernous sinus', wrong: ['The superior sagittal sinus', 'The internal jugular vein directly', 'The sigmoid sinus'], why: 'The angular vein connects to the cavernous sinus, so infection can spread there.' },
        { q: 'A qual estrutura intracraniana a veia angular se conecta, tornando a zona de perigo perigosa?', correct: 'Seio cavernoso', wrong: ['Seio sagital superior', 'Diretamente a veia jugular interna', 'Seio sigmoide'], why: 'A veia angular se conecta ao seio cavernoso, então a infecção pode se espalhar até lá.' }),
      q('61', { q: 'Into which vein does the deep lingual vein usually drain?', correct: 'Internal jugular vein', wrong: ['Facial vein', 'Retromandibular vein', 'Hepatic portal vein'], why: 'The deep lingual vein usually, though very variably, drains straight into the internal jugular vein.' },
        { q: 'Em qual veia a veia lingual profunda geralmente drena?', correct: 'Veia jugular interna', wrong: ['Veia facial', 'Veia retromandibular', 'Veia porta hepática'], why: 'A veia lingual profunda geralmente, embora de forma muito variável, drena direto na veia jugular interna.' }),
      q('62', { q: 'Which nerve gives the motor supply of the tongue?', correct: 'Hypoglossal nerve (XII)', wrong: ['Lingual nerve (V3)', 'Glossopharyngeal nerve (IX)', 'Facial nerve (VII)'], why: 'The hypoglossal nerve (XII) supplies the intrinsic and extrinsic tongue muscles.' },
        { q: 'Qual nervo dá a inervação motora da língua?', correct: 'Nervo hipoglosso (XII)', wrong: ['Nervo lingual (V3)', 'Nervo glossofaríngeo (IX)', 'Nervo facial (VII)'], why: 'O nervo hipoglosso (XII) inerva os músculos intrínsecos e extrínsecos da língua.' }),
      q('63', { q: 'Which nerve gives general sensation to the front two thirds of the tongue?', correct: 'Lingual nerve (V3)', wrong: ['Hypoglossal nerve (XII)', 'Facial nerve (VII)', 'Vagus nerve (X)'], why: 'The lingual nerve (V3) gives general sensation to the body, the front two thirds of the tongue.' },
        { q: 'Qual nervo dá sensibilidade geral aos dois terços anteriores da língua?', correct: 'Nervo lingual (V3)', wrong: ['Nervo hipoglosso (XII)', 'Nervo facial (VII)', 'Nervo vago (X)'], why: 'O nervo lingual (V3) dá sensibilidade geral ao corpo, os dois terços anteriores da língua.' }),
      q('59–60', { q: 'Which branch of the lingual artery also supplies the sublingual gland?', correct: 'Sublingual artery', wrong: ['Dorsal lingual artery', 'Deep lingual artery', 'Facial artery'], why: 'The sublingual artery runs forward and also supplies the sublingual gland.' },
        { q: 'Qual ramo da artéria lingual também irriga a glândula sublingual?', correct: 'Artéria sublingual', wrong: ['Artéria lingual dorsal', 'Artéria lingual profunda', 'Artéria facial'], why: 'A artéria sublingual segue para a frente e também irriga a glândula sublingual.' }),
    ],
  },
  {
    id: 'oral-sup2', supply: true, title: t('Branching: the external carotid tree of the mouth', 'Ramificação: a árvore da carótida externa da boca'),
    cards: [
      {
        id: 'oral-sup-tree', ref: '20–21, 59–60', title: t('Walk the external carotid tree', 'Percorra a árvore da carótida externa'),
        focus: ['tongue'], ghost: ['teeth', 'submandibular_gland', 'sublingual_gland'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud. First the two anterior branches that feed the mouth, then what each one divides into. The facial artery feeds the lips and the face, and the lingual artery feeds the tongue and, through its sublingual branch, the sublingual gland.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta. Primeiro os dois ramos anteriores que irrigam a boca, depois em que cada um se divide. A artéria facial irriga os lábios e a face, e a artéria lingual irriga a língua e, pelo ramo sublingual, a glândula sublingual.'),
          t('### Where names change', '### Onde os nomes mudam'),
          t('The deep lingual artery is the direct continuation of the lingual artery into the body of the tongue. The sublingual artery is the other branch from the anterior border of hyoglossus.',
            'A artéria lingual profunda é a continuação direta da artéria lingual para o corpo da língua. A artéria sublingual é o outro ramo que sai da borda anterior do hioglosso.'),
          t('### Courses to remember', '### Trajetos para lembrar'),
          t('The lingual artery runs forward between the genioglossus and hyoglossus muscles. The dorsal lingual arteries rise to the root of the tongue from its posterior border. The sublingual artery runs forward horizontally. The facial artery runs up over the face, giving the labial branches to the lips and the angular branch toward the orbit, where it meets the dorsal nasal branch of the ophthalmic artery.',
            'A artéria lingual segue para a frente entre os músculos genioglosso e hioglosso. As artérias linguais dorsais sobem até a raiz da língua a partir da borda posterior. A artéria sublingual segue para a frente horizontalmente. A artéria facial sobe pela face, dando os ramos labiais para os lábios e o ramo angular em direção à órbita, onde encontra o ramo nasal dorsal da artéria oftálmica.'),
        ],
      },
    ],
    questions: [
      q('20', { q: 'From which artery does the lingual artery arise?', correct: 'External carotid artery, as its second anterior branch', wrong: ['Facial artery, as its first branch', 'Internal carotid artery directly', 'Superficial temporal artery'], why: 'The lingual artery is the second anterior branch of the external carotid artery.' },
        { q: 'De qual artéria nasce a artéria lingual?', correct: 'Carótida externa, como seu segundo ramo anterior', wrong: ['Artéria facial, como primeiro ramo', 'Carótida interna diretamente', 'Artéria temporal superficial'], why: 'A artéria lingual é o segundo ramo anterior da carótida externa.' }),
      q('59–60', { q: 'Which artery is the largest branch of the lingual artery and its direct continuation?', correct: 'Deep lingual artery', wrong: ['Sublingual artery', 'Dorsal lingual artery', 'Superior labial artery'], why: 'The deep lingual artery is the largest branch and the direct continuation of the lingual artery.' },
        { q: 'Qual artéria é o maior ramo da artéria lingual e sua continuação direta?', correct: 'Artéria lingual profunda', wrong: ['Artéria sublingual', 'Artéria lingual dorsal', 'Artéria labial superior'], why: 'A artéria lingual profunda é o maior ramo e a continuação direta da artéria lingual.' }),
      q('59–60', { q: 'Where does the lingual artery give its dorsal lingual arteries?', correct: 'At the posterior border of hyoglossus, to the root of the tongue', wrong: ['At the anterior border of hyoglossus, to the tip', 'At the cardia, to the esophagus', 'At the sublingual gland, to the floor'], why: 'At the posterior border of hyoglossus it gives one or two dorsal lingual arteries to the root.' },
        { q: 'Onde a artéria lingual dá as artérias linguais dorsais?', correct: 'Na borda posterior do hioglosso, para a raiz da língua', wrong: ['Na borda anterior do hioglosso, para a ponta', 'Na cárdia, para o esôfago', 'Na glândula sublingual, para o assoalho'], why: 'Na borda posterior do hioglosso, dá uma ou duas artérias linguais dorsais para a raiz.' }),
      q('59–60', { q: 'Into which two branches does the lingual artery divide at the anterior border of hyoglossus?', correct: 'Sublingual artery and deep lingual artery', wrong: ['Superior labial and inferior labial arteries', 'Angular and submental arteries', 'Dorsal lingual and tonsillar arteries'], why: 'At the anterior border of hyoglossus it divides into the sublingual and the deep lingual arteries.' },
        { q: 'Em quais dois ramos a artéria lingual se divide na borda anterior do hioglosso?', correct: 'Artéria sublingual e artéria lingual profunda', wrong: ['Artérias labiais superior e inferior', 'Artérias angular e submentual', 'Artérias linguais dorsal e tonsilar'], why: 'Na borda anterior do hioglosso, divide-se em artéria sublingual e artéria lingual profunda.' }),
      q('21', { q: 'Which artery gives the superior and inferior labial arteries?', correct: 'Facial artery', wrong: ['Lingual artery', 'Superficial temporal artery', 'Maxillary artery'], why: 'The superior and inferior labial arteries are branches of the facial artery.' },
        { q: 'Qual artéria dá as artérias labiais superior e inferior?', correct: 'Artéria facial', wrong: ['Artéria lingual', 'Artéria temporal superficial', 'Artéria maxilar'], why: 'As artérias labiais superior e inferior são ramos da artéria facial.' }),
      q('21', { q: 'Which face artery reaches the orbit near the nose and meets the dorsal nasal branch of the ophthalmic artery?', correct: 'Angular artery', wrong: ['Submental artery', 'Glandular branches', 'Sublingual artery'], why: 'The angular branch of the facial artery reaches the region near the orbit and anastomoses with the dorsal nasal branch of the ophthalmic artery.' },
        { q: 'Qual artéria da face chega à órbita perto do nariz e se une ao ramo nasal dorsal da artéria oftálmica?', correct: 'Artéria angular', wrong: ['Artéria submentual', 'Ramos glandulares', 'Artéria sublingual'], why: 'O ramo angular da artéria facial chega à região perto da órbita e se anastomosa com o ramo nasal dorsal da artéria oftálmica.' }),
    ],
  },
  {
    id: 'oral-sup3', supply: true, title: t('Territories and nerves, both directions', 'Territórios e nervos, nos dois sentidos'),
    cards: [
      {
        id: 'oral-sup-territories', ref: '21, 31–32, 59–63', title: t('Who supplies what in the mouth', 'Quem irriga o quê na boca'),
        focus: ['tongue', 'sublingual_gland'], ghost: ['teeth', 'submandibular_gland'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('Facial artery: the superior and inferior labial arteries supply the lips. Transverse facial artery: the cheek. Lingual artery: the tongue, with dorsal lingual branches to the root. Sublingual artery: the sublingual gland. Deep lingual artery: the body of the tongue, with its vein labelled on the inferior surface.',
            'Artéria facial: as artérias labiais superior e inferior irrigam os lábios. Artéria facial transversa: a bochecha. Artéria lingual: a língua, com ramos linguais dorsais para a raiz. Artéria sublingual: a glândula sublingual. Artéria lingual profunda: o corpo da língua, com sua veia identificada na superfície inferior.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('Turn it around when you revise. Lips: superior and inferior labial arteries, both from the facial artery. Cheek: facial and transverse facial arteries. Root of the tongue: dorsal lingual arteries from the lingual artery. Body of the tongue: deep lingual artery. Sublingual gland: sublingual artery.',
            'Inverta ao revisar. Lábios: artérias labiais superior e inferior, ambas da artéria facial. Bochecha: artérias facial e facial transversa. Raiz da língua: artérias linguais dorsais, da artéria lingual. Corpo da língua: artéria lingual profunda. Glândula sublingual: artéria sublingual.'),
        ],
      },
      {
        id: 'oral-sup-nerves', ref: '14, 23, 28–29, 62–63', title: t('Nerve map of the mouth and tongue', 'Mapa nervoso da boca e da língua'),
        focus: ['tongue'], ghost: ['teeth', 'sublingual_gland'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the three groups. Motor: the facial nerve moves the lips and the cheek, the hypoglossal nerve moves the tongue, and the vagus reaches the palatoglossus through the pharyngeal plexus. General sensation: the trigeminal nerve for the lips and cheeks, the lingual nerve (V3) for the front two thirds, the glossopharyngeal nerve (IX) for the root, and the vagus for the lingual glands and vessels. Taste: the facial nerve by the chorda tympani for the front two thirds, except the vallate papillae, and the glossopharyngeal nerve for the root and the vallate papillae.',
            'Toque pelos três grupos. Motora: o nervo facial move os lábios e a bochecha, o nervo hipoglosso move a língua, e o vago chega ao palatoglosso pelo plexo faríngeo. Sensibilidade geral: o nervo trigêmeo para os lábios e as bochechas, o nervo lingual (V3) para os dois terços anteriores, o nervo glossofaríngeo (IX) para a raiz, e o vago para as glândulas e os vasos linguais. Paladar: o nervo facial pela corda do tímpano para os dois terços anteriores, exceto as papilas valadas, e o nervo glossofaríngeo para a raiz e as papilas valadas.'),
          t('⚠ The palate table lists the palatoglossus under the vagus through the pharyngeal plexus, while the tongue motor section says the hypoglossal nerve supplies the intrinsic and extrinsic tongue muscles. The two statements disagree for this one muscle, so keep both in mind until the professor settles it.',
            '⚠ A tabela do palato coloca o palatoglosso sob o vago pelo plexo faríngeo, enquanto a seção motora da língua diz que o nervo hipoglosso inerva os músculos intrínsecos e extrínsecos da língua. As duas afirmações divergem para esse músculo, então mantenha as duas em mente até o professor esclarecer.'),
          t('### Facial nerve and the cheek', '### Nervo facial e a bochecha'),
          t('If the facial nerve is paralysed, the cheek goes flabby, and drinking becomes hard because liquid leaks out. The buccinator and orbicularis oris are both moved by this nerve.',
            'Se o nervo facial está paralisado, a bochecha fica flácida, e beber fica difícil porque o líquido escorre. O bucinador e o orbicular da boca são ambos movidos por esse nervo.'),
        ],
      },
    ],
    questions: [
      q('59–60', { q: 'Which artery supplies the sublingual gland?', correct: 'Sublingual artery, a branch of the lingual artery', wrong: ['Superior labial artery', 'Transverse facial artery', 'Angular artery'], why: 'The sublingual artery runs forward from the lingual artery and supplies the sublingual gland.' },
        { q: 'Qual artéria irriga a glândula sublingual?', correct: 'Artéria sublingual, ramo da artéria lingual', wrong: ['Artéria labial superior', 'Artéria facial transversa', 'Artéria angular'], why: 'A artéria sublingual segue da artéria lingual e irriga a glândula sublingual.' }),
      q('63', { q: 'Which nerve carries taste from the front two thirds of the tongue, but not the vallate papillae?', correct: 'Facial nerve, through the chorda tympani', wrong: ['Glossopharyngeal nerve', 'Hypoglossal nerve', 'Vagus nerve'], why: 'The facial nerve by the chorda tympani carries taste from the front two thirds, except the vallate papillae.' },
        { q: 'Qual nervo leva o paladar dos dois terços anteriores da língua, mas não das papilas valadas?', correct: 'Nervo facial, pela corda do tímpano', wrong: ['Nervo glossofaríngeo', 'Nervo hipoglosso', 'Nervo vago'], why: 'O nervo facial, pela corda do tímpano, leva o paladar dos dois terços anteriores, exceto as papilas valadas.' }),
      q('63', { q: 'Which nerve carries taste from the vallate papillae?', correct: 'Glossopharyngeal nerve (IX)', wrong: ['Facial nerve (VII)', 'Lingual nerve (V3)', 'Hypoglossal nerve (XII)'], why: 'The glossopharyngeal nerve carries taste from the root, including the vallate papillae.' },
        { q: 'Qual nervo leva o paladar das papilas valadas?', correct: 'Nervo glossofaríngeo (IX)', wrong: ['Nervo facial (VII)', 'Nervo lingual (V3)', 'Nervo hipoglosso (XII)'], why: 'O nervo glossofaríngeo leva o paladar da raiz, incluindo as papilas valadas.' }),
      q('62', { q: 'If the hypoglossal nerve is paralysed on one side, where does the tongue move on protrusion?', correct: 'Toward the paralysed side, pushed by the healthy side', wrong: ['Toward the healthy side, which is paralysed', 'Straight forward, with no deviation', 'It cannot be protruded at all'], why: 'The genioglossus on the paralysed side is weak, so the healthy side pushes the tongue toward the paralysed side.' },
        { q: 'Se o nervo hipoglosso está paralisado de um lado, para onde a língua se move ao protruir?', correct: 'Para o lado paralisado, empurrada pelo lado sadio', wrong: ['Para o lado sadio, que está paralisado', 'Reto para a frente, sem desvio', 'Não pode ser protruída de jeito nenhum'], why: 'O genioglosso do lado paralisado fica fraco, então o lado sadio empurra a língua para o lado paralisado.' }),
      q('23', { q: 'Which nerve gives the motor supply of the lips?', correct: 'Facial nerve (VII)', wrong: ['Trigeminal nerve (V)', 'Hypoglossal nerve (XII)', 'Vagus nerve (X)'], why: 'The motor supply of the lips is the facial nerve; the trigeminal gives the sensory supply.' },
        { q: 'Qual nervo dá a inervação motora dos lábios?', correct: 'Nervo facial (VII)', wrong: ['Nervo trigêmeo (V)', 'Nervo hipoglosso (XII)', 'Nervo vago (X)'], why: 'A inervação motora dos lábios é do nervo facial; o trigêmeo dá a sensitiva.' }),
      q('28–29', { q: 'Paralysis of which nerve leaves the cheek flabby?', correct: 'Facial nerve (VII)', wrong: ['Lingual nerve (V3)', 'Glossopharyngeal nerve (IX)', 'Hypoglossal nerve (XII)'], why: 'Facial paralysis leaves the cheek flabby, since the facial nerve supplies the cheek muscles.' },
        { q: 'A paralisia de qual nervo deixa a bochecha flácida?', correct: 'Nervo facial (VII)', wrong: ['Nervo lingual (V3)', 'Nervo glossofaríngeo (IX)', 'Nervo hipoglosso (XII)'], why: 'A paralisia facial deixa a bochecha flácida, já que o nervo facial inerva os músculos da bochecha.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
