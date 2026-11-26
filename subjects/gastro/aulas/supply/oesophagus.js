// SpeedGastro · Oesophagus supply blocks: supply sheet, arterial branching drill,
// and territories with venous and nerve maps in both directions.
// Facts only from deck 04 (p25–27 arteries, p28 veins, p29 innervation, p33 submucosal veins).
// Deck 04 has no lymphatic slides, so the sheet has no lymph section.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const L = {
  root: t('Arterial supply of the esophagus', 'Suprimento arterial do esôfago'),
  itCerv: t('Inferior thyroid artery', 'Artéria tireóidea inferior'),
  itEso: t('Esophageal branches of inferior thyroid artery', 'Ramos esofágicos da artéria tireóidea inferior'),
  thorAorta: t('Thoracic aorta', 'Aorta torácica'),
  thorBr: t('Bronchial branches (right and left)', 'Ramos brônquicos (direito e esquerdo)'),
  thorEso: t('Esophageal branches of thoracic aorta', 'Ramos esofágicos da aorta torácica'),
  celiac: t('Celiac trunk', 'Tronco celíaco'),
  lg: t('Left gastric artery', 'Artéria gástrica esquerda'),
  lgEso: t('Esophageal branches of left gastric artery', 'Ramos esofágicos da artéria gástrica esquerda'),
  venPlex: t('Esophageal venous plexus', 'Plexo venoso esofágico'),
  thoRoute: t('Thoracic route', 'Via torácica'),
  azyg: t('Azygos or hemiazygos vein', 'Veia ázigos ou hemiázigos'),
  svc: t('Superior vena cava', 'Veia cava superior'),
  absRoute: t('Abdominal route', 'Via abdominal'),
  lgv: t('Left gastric vein', 'Veia gástrica esquerda'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  nerves: t('Nerves of the esophagus', 'Nervos do esôfago'),
  para: t('Parasympathetic: vagus', 'Parassimpático: vago'),
  vagi: t('Right and left vagus nerves', 'Nervos vagos direito e esquerdo'),
  rln: t('Recurrent laryngeal nerves', 'Nervos laríngeos recorrentes'),
  eplex: t('Esophageal plexus', 'Plexo esofágico'),
  avt: t('Anterior vagal trunk', 'Tronco vagal anterior'),
  gplex: t('Gastric plexus', 'Plexo gástrico'),
  symp: t('Sympathetic', 'Simpático'),
  ganglia: t('Esophageal branches of thoracic ganglia', 'Ramos esofágicos dos gânglios torácicos'),
  splanch: t('Splanchnic nerves', 'Nervos esplâncnicos'),
};

const ARTERY_TREE = {
  root: { label: L.root, children: [
    { label: L.itCerv, note: t('cervical part', 'parte cervical'), children: [{ label: L.itEso }] },
    { label: L.thorAorta, note: t('thoracic part', 'parte torácica'), children: [
      { label: L.thorBr, note: t('with esophageal branches', 'com ramos esofágicos') },
      { label: L.thorEso, note: t('four or five, from the anterior surface', 'quatro ou cinco, da face anterior') },
    ] },
    { label: L.celiac, note: t('abdominal part', 'parte abdominal'), children: [
      { label: L.lg, children: [{ label: L.lgEso }] },
    ] },
  ] },
  links: [
    { from: L.itEso, to: L.thorEso, label: t('upper chain anastomosis', 'anastomose superior da cadeia') },
    { from: L.thorEso, to: L.lgEso, label: t('lower chain anastomosis', 'anastomose inferior da cadeia') },
  ],
};

const VEIN_TREE = {
  root: { label: L.venPlex, children: [
    { label: L.thoRoute, children: [{ label: L.azyg, children: [{ label: L.svc }] }] },
    { label: L.absRoute, children: [{ label: L.lgv, children: [{ label: L.hpv }] }] },
  ] },
  links: [
    { from: L.azyg, to: L.lgv, label: t('anastomosis at the thoraco-abdominal junction', 'anastomose na junção toracoabdominal') },
  ],
};

const NERVE_TREE = {
  root: { label: L.nerves, children: [
    { label: L.para, children: [
      { label: L.vagi, children: [{ label: L.eplex, children: [{ label: L.avt, children: [{ label: L.gplex }] }] }] },
      { label: L.rln },
    ] },
    { label: L.symp, note: t('T1–L2', 'T1–L2'), children: [
      { label: L.ganglia },
      { label: L.splanch },
    ] },
  ] },
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'oesophagus-sup1', supply: true, title: t('Supply sheet: arteries, veins and nerves', 'Ficha de suprimento: artérias, veias e nervos'),
    cards: [
      {
        id: 'oe-sup-arteries', ref: '25–27', title: t('Arteries of the esophagus at a glance', 'Artérias do esôfago num relance'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'left_gastric_a'], ghost: ['esophagus', 'stomach'], view: 'ant',
        body: [
          t('### Three parts, three arteries', '### Três partes, três artérias'),
          t('The arterial supply follows the three parts of the organ. The cervical part is supplied by the Inferior thyroid artery. The thoracic part is supplied by the bronchial and esophageal branches of the Thoracic aorta. The abdominal part is supplied by the Left gastric artery, which comes from the Celiac trunk.',
            'O suprimento arterial segue as três partes do órgão. A parte cervical é irrigada pela artéria tireóidea inferior. A parte torácica é irrigada pelos ramos brônquicos e esofágicos da aorta torácica. A parte abdominal é irrigada pela artéria gástrica esquerda, que vem do tronco celíaco.'),
          t('### The esophageal chain', '### A cadeia esofágica'),
          t('Four or five esophageal branches leave the anterior surface of the Thoracic aorta and descend obliquely to the esophagus, where they form one continuous vascular chain. Above, the chain anastomoses with the esophageal branches of the Inferior thyroid arteries. Below, it anastomoses with the ascending branches of the left phrenic and Left gastric arteries.',
            'Quatro ou cinco ramos esofágicos saem da face anterior da aorta torácica e descem obliquamente até o esôfago, onde formam uma única cadeia vascular contínua. Acima, a cadeia se anastomosa com os ramos esofágicos das artérias tireóideas inferiores. Abaixo, ela se anastomosa com os ramos ascendentes das artérias frênica esquerda e gástrica esquerda.'),
        ],
      },
      {
        id: 'oe-sup-veins', ref: '28', title: t('Veins of the esophagus: two routes', 'Veias do esôfago: duas vias'),
        focus: ['gastric_v', 'hepatic_portal_v', 'ivc_g'], ghost: ['esophagus', 'stomach', 'spleen'], view: 'ant',
        body: [
          t('### Two drainage routes', '### Duas vias de drenagem'),
          t('Venous anastomoses at the junction of the thoracic and abdominal parts give two routes. The thoracic route runs through the Azygos or hemiazygos vein to the Superior vena cava. The abdominal route runs through the Left gastric vein to the Hepatic portal vein.',
            'Anastomoses venosas na junção das partes torácica e abdominal formam duas vias. A via torácica segue pela veia ázigos ou hemiázigos até a veia cava superior. A via abdominal segue pela veia gástrica esquerda até a veia porta hepática.'),
          t('### The clinical link', '### A ligação clínica'),
          t('When portal flow is blocked in the liver, as in cirrhosis, blood can be diverted through the esophageal veins to the Superior vena cava. These are the portosystemic collaterals. In the lower esophagus, numerous veins in the submucosa help close the outlet, and when they dilate they form the esophageal varices.',
            'Quando o fluxo porta é bloqueado no fígado, como na cirrose, o sangue pode ser desviado pelas veias esofágicas até a veia cava superior. São as colaterais porto-sistêmicas. No esôfago inferior, numerosas veias da submucosa ajudam a fechar a saída e, quando se dilatam, formam as varizes esofágicas.'),
        ],
      },
      {
        id: 'oe-sup-nerves', ref: '29', title: t('Innervation of the esophagus', 'Inervação do esôfago'),
        focus: ['esophagus', 'stomach'], ghost: ['abdominal_aorta_g'], view: 'ant',
        body: [
          t('### Parasympathetic and sympathetic', '### Parassimpático e simpático'),
          t('The parasympathetic supply comes from the right and left vagus nerves and the recurrent laryngeal nerves. Together with the esophageal branches of the thoracic ganglia from the sympathetic trunks, they form the esophageal plexus. The plexus continues onto the stomach as the anterior vagal trunk and the gastric plexus.',
            'A inervação parassimpática vem dos nervos vagos direito e esquerdo e dos nervos laríngeos recorrentes. Junto com os ramos esofágicos dos gânglios torácicos dos troncos simpáticos, formam o plexo esofágico. O plexo continua sobre o estômago como tronco vagal anterior e plexo gástrico.'),
          t('The sympathetic scheme is given as T1–L2, through the thoracic ganglia and the splanchnic nerves. The general autonomic map beside it adds the parasympathetic outflow from cranial nerves III, VII, IX and X and sacral nerves S2–S4 to the rest of the body.',
            'O esquema simpático é dado como T1–L2, pelos gânglios torácicos e pelos nervos esplâncnicos. O mapa autônomo geral ao lado acrescenta a saída parassimpática pelos nervos cranianos III, VII, IX e X e pelos nervos sacrais S2–S4 para o restante do corpo.'),
        ],
      },
    ],
    questions: [
      q('25', { q: 'Which artery supplies the thoracic part of the esophagus?', correct: 'Bronchial and esophageal branches of the thoracic aorta', wrong: ['Inferior thyroid artery', 'Left gastric artery', 'Splenic artery'], why: 'Slide 25: the thoracic esophagus is supplied by bronchial and esophageal branches of the thoracic aorta.' },
        { q: 'Qual artéria irriga a parte torácica do esôfago?', correct: 'Ramos brônquicos e esofágicos da aorta torácica', wrong: ['Artéria tireóidea inferior', 'Artéria gástrica esquerda', 'Artéria esplênica'], why: 'Slide 25: o esôfago torácico é irrigado por ramos brônquicos e esofágicos da aorta torácica.' }),
      q('27', { q: 'How many esophageal branches leave the anterior surface of the aorta?', correct: 'Four or five', wrong: ['One or two', 'Eight or ten', 'Twelve'], why: 'Slide 27: four or five esophageal branches arise from the anterior surface of the aorta.' },
        { q: 'Quantos ramos esofágicos saem da face anterior da aorta?', correct: 'Quatro ou cinco', wrong: ['Um ou dois', 'Oito ou dez', 'Doze'], why: 'Slide 27: quatro ou cinco ramos esofágicos saem da face anterior da aorta.' }),
      q('27', { q: 'With which arteries does the esophageal chain anastomose below?', correct: 'Ascending branches of the left phrenic and left gastric arteries', wrong: ['Splenic and gastroduodenal arteries', 'Right gastric and hepatic arteries', 'Superior mesenteric and colic arteries'], why: 'Slide 27: below, the chain joins the ascending branches of the left phrenic and left gastric arteries.' },
        { q: 'Com quais artérias a cadeia esofágica se anastomosa abaixo?', correct: 'Ramos ascendentes das artérias frênica esquerda e gástrica esquerda', wrong: ['Artérias esplênica e gastroduodenal', 'Artérias gástrica direita e hepática', 'Artérias mesentérica superior e cólicas'], why: 'Slide 27: abaixo, a cadeia se une aos ramos ascendentes das artérias frênica esquerda e gástrica esquerda.' }),
      q('28', { q: 'Where does the thoracic venous route of the esophagus drain?', correct: 'Azygos or hemiazygos vein to the superior vena cava', wrong: ['Left gastric vein to the portal vein', 'Splenic vein to the superior mesenteric vein', 'Hepatic veins to the inferior vena cava'], why: 'Slide 28: thoracic route, azygos or hemiazygos to the superior vena cava.' },
        { q: 'Para onde drena a via venosa torácica do esôfago?', correct: 'Veia ázigos ou hemiázigos até a veia cava superior', wrong: ['Veia gástrica esquerda até a veia porta', 'Veia esplênica até a veia mesentérica superior', 'Veias hepáticas até a veia cava inferior'], why: 'Slide 28: via torácica, ázigos ou hemiázigos até a veia cava superior.' }),
      q('28', { q: 'In cirrhosis, to which vein is portal blood diverted through the esophageal veins?', correct: 'The superior vena cava', wrong: ['The inferior vena cava', 'The hepatic veins', 'The pulmonary veins'], why: 'Slide 28: blocked portal flow is diverted through the esophageal veins to the superior vena cava.' },
        { q: 'Na cirrose, para qual veia o sangue porta é desviado pelas veias esofágicas?', correct: 'Veia cava superior', wrong: ['Veia cava inferior', 'Veias hepáticas', 'Veias pulmonares'], why: 'Slide 28: o fluxo porta bloqueado é desviado pelas veias esofágicas até a veia cava superior.' }),
      q('29', { q: 'Which spinal segments give the sympathetic scheme for the esophagus?', correct: 'T1 to L2', wrong: ['T5 to T8', 'C6 to T1', 'S2 to S4'], why: 'Slide 29: the sympathetic scheme is labelled T1–L2.' },
        { q: 'Quais segmentos espinhais dão o esquema simpático do esôfago?', correct: 'T1 a L2', wrong: ['T5 a T8', 'C6 a T1', 'S2 a S4'], why: 'Slide 29: o esquema simpático é indicado como T1–L2.' }),
    ],
  },
  {
    id: 'oesophagus-sup2', supply: true, title: t('Branching: the esophageal arterial chain', 'Ramificação: a cadeia arterial esofágica'),
    cards: [
      {
        id: 'oe-sup-tree', ref: '25–27', title: t('Walk the esophageal arteries', 'Percorra as artérias do esôfago'),
        focus: ['esophagus', 'abdominal_aorta_g', 'celiac_trunk', 'left_gastric_a'], ghost: ['stomach', 'diaphragm_g'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud: first the three parts of the esophagus, then the artery that supplies each one. The two links mark the chain that runs the whole length of the organ.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta: primeiro as três partes do esôfago, depois a artéria que irriga cada uma. Os dois elos marcam a cadeia que percorre todo o comprimento do órgão.'),
          t('### The chain, top to bottom', '### A cadeia, de cima para baixo'),
          t('The Inferior thyroid artery gives the cervical esophagus its branches, and those branches meet the chain from the Thoracic aorta at the upper link. The chain runs down the thoracic part, and at the lower link it meets the esophageal branch of the Left gastric artery, which comes from the Celiac trunk.',
            'A artéria tireóidea inferior dá os ramos do esôfago cervical, e esses ramos encontram a cadeia da aorta torácica no elo superior. A cadeia desce pela parte torácica e, no elo inferior, encontra o ramo esofágico da artéria gástrica esquerda, que vem do tronco celíaco.'),
          t('### Bronchial branches in the thoracic part', '### Ramos brônquicos na parte torácica'),
          t('In the thoracic part, the right bronchial artery and the superior and inferior left bronchial arteries each have an esophageal branch. Together with the direct esophageal branches of the thoracic aorta, they supply the thoracic esophagus.',
            'Na parte torácica, a artéria brônquica direita e as artérias brônquicas esquerdas superior e inferior têm, cada uma, um ramo esofágico. Junto com os ramos esofágicos diretos da aorta torácica, eles irrigam o esôfago torácico.'),
        ],
      },
    ],
    questions: [
      q('27', { q: 'Which arteries form the upper anastomosis of the esophageal chain?', correct: 'Esophageal branches of the inferior thyroid arteries', wrong: ['Esophageal branches of the left gastric artery', 'Splenic artery branches', 'Superior mesenteric artery branches'], why: 'Slide 27: above, the chain anastomoses with the esophageal branches of the inferior thyroid arteries.' },
        { q: 'Quais artérias formam a anastomose superior da cadeia esofágica?', correct: 'Ramos esofágicos das artérias tireóideas inferiores', wrong: ['Ramos esofágicos da artéria gástrica esquerda', 'Ramos da artéria esplênica', 'Ramos da artéria mesentérica superior'], why: 'Slide 27: acima, a cadeia se anastomosa com os ramos esofágicos das tireóideas inferiores.' }),
      q('25', { q: 'Which artery gives the esophageal supply of the abdominal part?', correct: 'Left gastric artery', wrong: ['Splenic artery', 'Common hepatic artery', 'Superior mesenteric artery'], why: 'Slide 25: the abdominal esophagus is supplied by the left gastric artery, from the celiac trunk.' },
        { q: 'Qual artéria irriga a parte abdominal do esôfago?', correct: 'Artéria gástrica esquerda', wrong: ['Artéria esplênica', 'Artéria hepática comum', 'Artéria mesentérica superior'], why: 'Slide 25: o esôfago abdominal é irrigado pela artéria gástrica esquerda, do tronco celíaco.' }),
      q('25', { q: 'Which bronchial arteries carry esophageal branches in the thoracic part?', correct: 'Right bronchial and both left bronchial arteries (superior and inferior)', wrong: ['The right bronchial artery only', 'The left gastric artery', 'The inferior thyroid artery'], why: 'Slide 25: right bronchial, superior left bronchial and inferior left bronchial arteries each have an esophageal branch.' },
        { q: 'Quais artérias brônquicas têm ramo esofágico na parte torácica?', correct: 'A brônquica direita e as duas brônquicas esquerdas (superior e inferior)', wrong: ['Somente a brônquica direita', 'A artéria gástrica esquerda', 'A artéria tireóidea inferior'], why: 'Slide 25: brônquica direita, brônquica esquerda superior e inferior têm cada uma ramo esofágico.' }),
      q('27', { q: 'Where does the lower anastomosis of the esophageal chain lie?', correct: 'With the ascending branches of the left phrenic and left gastric arteries', wrong: ['With the inferior thyroid arteries', 'With the bronchial arteries', 'With the splenic artery'], why: 'Slide 27: below, the chain anastomoses with the left phrenic and left gastric ascending branches.' },
        { q: 'Onde fica a anastomose inferior da cadeia esofágica?', correct: 'Com os ramos ascendentes das artérias frênica esquerda e gástrica esquerda', wrong: ['Com as artérias tireóideas inferiores', 'Com as artérias brônquicas', 'Com a artéria esplênica'], why: 'Slide 27: abaixo, a cadeia se une aos ramos ascendentes das artérias frênica esquerda e gástrica esquerda.' }),
    ],
  },
  {
    id: 'oesophagus-sup3', supply: true, title: t('Territories and drainage, both directions', 'Territórios e drenagem, nos dois sentidos'),
    cards: [
      {
        id: 'oe-sup-territories', ref: '25–29', title: t('Who supplies what', 'Quem irriga o quê'),
        focus: ['esophagus', 'abdominal_aorta_g', 'left_gastric_a'], ghost: ['stomach', 'diaphragm_g'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('Inferior thyroid artery: the cervical part of the esophagus. Bronchial and esophageal branches of the Thoracic aorta, together with the right and left bronchial arteries: the thoracic part. Left gastric artery: the abdominal part.',
            'Artéria tireóidea inferior: a parte cervical do esôfago. Ramos brônquicos e esofágicos da aorta torácica, junto com as artérias brônquicas direita e esquerdas: a parte torácica. Artéria gástrica esquerda: a parte abdominal.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('Turn it around when you revise. Cervical esophagus: inferior thyroid artery. Thoracic esophagus: bronchial branches and the esophageal branches of the thoracic aorta. Abdominal esophagus: left gastric artery. The chain of four or five branches from the aorta joins all three territories along the length of the organ.',
            'Inverta ao revisar. Esôfago cervical: artéria tireóidea inferior. Esôfago torácico: ramos brônquicos e ramos esofágicos da aorta torácica. Esôfago abdominal: artéria gástrica esquerda. A cadeia de quatro ou cinco ramos da aorta une os três territórios ao longo de todo o órgão.'),
        ],
      },
      {
        id: 'oe-sup-vein-tree', ref: '28', title: t('Venous drainage, both directions', 'Drenagem venosa, nos dois sentidos'),
        focus: ['gastric_v', 'hepatic_portal_v', 'ivc_g'], ghost: ['esophagus', 'stomach'], view: 'ant',
        diagram: VEIN_TREE,
        body: [
          t('Tap the tree from the top: the esophageal venous plexus splits into the thoracic route and the abdominal route. Then follow each route to its end, the Superior vena cava above and the Hepatic portal vein below. The link marks the anastomosis at the junction of the thoracic and abdominal parts.',
            'Toque a árvore de cima para baixo: o plexo venoso esofágico se divide na via torácica e na via abdominal. Depois siga cada via até o fim, a veia cava superior acima e a veia porta hepática abaixo. O elo marca a anastomose na junção das partes torácica e abdominal.'),
        ],
      },
      {
        id: 'oe-sup-nerve-tree', ref: '29', title: t('Nerve map of the esophagus', 'Mapa nervoso do esôfago'),
        focus: ['esophagus', 'stomach'], ghost: ['abdominal_aorta_g'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the two systems. Parasympathetic: the right and left vagus nerves and the recurrent laryngeal nerves form the esophageal plexus, which continues as the anterior vagal trunk onto the stomach. Sympathetic: T1–L2, through the esophageal branches of the thoracic ganglia and the splanchnic nerves.',
            'Toque pelos dois sistemas. Parassimpático: os nervos vagos direito e esquerdo e os nervos laríngeos recorrentes formam o plexo esofágico, que continua como tronco vagal anterior sobre o estômago. Simpático: T1–L2, pelos ramos esofágicos dos gânglios torácicos e pelos nervos esplâncnicos.'),
        ],
      },
    ],
    questions: [
      q('28', { q: 'Which vein drains the abdominal route of the esophagus?', correct: 'Left gastric vein, to the portal vein', wrong: ['Azygos vein, to the superior vena cava', 'Hemiazygos vein, to the superior vena cava', 'Splenic vein, to the superior mesenteric vein'], why: 'Slide 28: abdominal route, left gastric vein to the portal vein.' },
        { q: 'Qual veia drena a via abdominal do esôfago?', correct: 'Veia gástrica esquerda, até a veia porta', wrong: ['Veia ázigos, até a veia cava superior', 'Veia hemiázigos, até a veia cava superior', 'Veia esplênica, até a veia mesentérica superior'], why: 'Slide 28: via abdominal, veia gástrica esquerda até a veia porta.' }),
      q('28', { q: 'Where do the two esophageal venous routes anastomose?', correct: 'At the junction of the thoracic and abdominal parts', wrong: ['At the pharyngo-oesophageal junction', 'At the cricoid cartilage', 'Inside the liver'], why: 'Slide 28: venous anastomoses at the junction of the thoracic and abdominal parts.' },
        { q: 'Onde as duas vias venosas do esôfago se anastomosam?', correct: 'Na junção das partes torácica e abdominal', wrong: ['Na junção faringoesofágica', 'Na altura da cartilagem cricoide', 'Dentro do fígado'], why: 'Slide 28: anastomoses venosas na junção das partes torácica e abdominal.' }),
      q('29', { q: 'Which nerves join the vagi to form the esophageal plexus?', correct: 'Recurrent laryngeal nerves and esophageal branches of the thoracic ganglia', wrong: ['Pelvic splanchnic nerves', 'Phrenic nerves', 'Sacral splanchnic nerves'], why: 'Slide 29: the vagi, recurrent laryngeal nerves and thoracic ganglia branches form the esophageal plexus.' },
        { q: 'Quais nervos se unem aos vagos para formar o plexo esofágico?', correct: 'Nervos laríngeos recorrentes e ramos esofágicos dos gânglios torácicos', wrong: ['Nervos esplâncnicos pélvicos', 'Nervos frênicos', 'Nervos esplâncnicos sacrais'], why: 'Slide 29: vagos, laríngeos recorrentes e ramos dos gânglios torácicos formam o plexo esofágico.' }),
      q('29', { q: 'Which trunk continues from the esophageal plexus onto the stomach?', correct: 'Anterior vagal trunk', wrong: ['Celiac plexus', 'Phrenic nerve', 'Greater splanchnic nerve'], why: 'Slide 29: the esophageal plexus continues onto the stomach as the anterior vagal trunk and gastric plexus.' },
        { q: 'Qual tronco continua do plexo esofágico sobre o estômago?', correct: 'Tronco vagal anterior', wrong: ['Plexo celíaco', 'Nervo frênico', 'Nervo esplâncnico maior'], why: 'Slide 29: o plexo esofágico continua sobre o estômago como tronco vagal anterior e plexo gástrico.' }),
      q('33', { q: 'What are the dilated submucosal veins of the lower esophagus called?', correct: 'Esophageal varices', wrong: ['Esophageal diverticula', 'Angle of His', 'Laimer triangle'], why: 'Slide 33: when dilated, the submucosal veins of the lower esophagus are the esophageal varices.' },
        { q: 'Como se chamam as veias submucosas dilatadas do esôfago inferior?', correct: 'Varizes esofágicas', wrong: ['Divertículos esofágicos', 'Ângulo de His', 'Triângulo de Laimer'], why: 'Slide 33: quando dilatadas, as veias submucosas do esôfago inferior são as varizes esofágicas.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
