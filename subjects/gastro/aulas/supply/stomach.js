// SpeedGastro · Stomach supply blocks (pilot): supply sheet, branching drill,
// territories in both directions, and innervation. Facts only from deck 06
// (p27–37 arteries and veins, p24 ligaments, p45–47 enteric plexuses, p49–51 nerves).
// Deck 06 has no lymphatic slides, so the sheet has no lymph section.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const TREE = ['celiac_trunk', 'left_gastric_a', 'right_gastric_a', 'common_hepatic_a', 'proper_hepatic_a',
  'gastroduodenal_a', 'gastroepiploic_a', 'splenic_a', 'pancreaticoduodenal_a'];

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  celiac: t('Celiac trunk', 'Tronco celíaco'),
  lg: t('Left gastric artery', 'Artéria gástrica esquerda'),
  oes: t('Esophageal branches', 'Ramos esofágicos'),
  spl: t('Splenic artery', 'Artéria esplênica'),
  sg: t('Short gastric arteries', 'Artérias gástricas curtas'),
  lgo: t('Left gastro-omental artery', 'Artéria gastromental esquerda'),
  ch: t('Common hepatic artery', 'Artéria hepática comum'),
  gd: t('Gastroduodenal artery', 'Artéria gastroduodenal'),
  rgo: t('Right gastro-omental artery', 'Artéria gastromental direita'),
  spd: t('Superior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal superior'),
  ph: t('Proper hepatic artery', 'Artéria hepática própria'),
  rg: t('Right gastric artery', 'Artéria gástrica direita'),
  sma: t('Superior mesenteric artery', 'Artéria mesentérica superior'),
  ipd: t('Inferior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal inferior'),
  thor: t('Esophageal arteries of the thoracic aorta', 'Artérias esofágicas da aorta torácica'),
};
const note = (en, pt) => t(en, pt);

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.celiac, note: note('T12', 'T12'), children: [
      { label: L.lg, children: [{ label: L.oes, note: note('at the cardia', 'na cárdia') }] },
      { label: L.spl, note: note('largest', 'a maior'), children: [{ label: L.sg, note: note('fundus', 'fundo') }, { label: L.lgo }] },
      { label: L.ch, children: [
        { label: L.gd, children: [{ label: L.rgo }, { label: L.spd }] },
        { label: L.ph, note: note('continuation', 'continuação'), children: [{ label: L.rg, note: note('near the pylorus', 'perto do piloro') }] },
      ] },
    ] },
    { label: L.sma, children: [{ label: L.ipd }] },
  ] },
  links: [
    { from: L.lg, to: L.rg, label: t('lesser curvature arcade', 'arcada da curvatura menor') },
    { from: L.lgo, to: L.rgo, label: t('greater curvature arcade', 'arcada da curvatura maior') },
    { from: L.spd, to: L.ipd, label: t('pancreaticoduodenal arcade', 'arcada pancreaticoduodenal') },
  ],
};

const NERVE_TREE = {
  root: { label: t('Nerves of the stomach', 'Nervos do estômago'), children: [
    { label: t('Sympathetic', 'Simpático'), note: note('T5–T8 (Moore: T6–T9)', 'T5–T8 (Moore: T6–T9)'), children: [
      { label: t('Greater splanchnic nerve', 'Nervo esplâncnico maior') },
      { label: t('Lesser splanchnic nerve', 'Nervo esplâncnico menor') },
      { label: t('Celiac ganglia', 'Gânglios celíacos'), note: note('on the aorta', 'sobre a aorta'), children: [
        { label: t('Celiac plexus branches', 'Ramos do plexo celíaco') }] },
    ] },
    { label: t('Parasympathetic: vagus', 'Parassimpático: vago'), children: [
      { label: t('Left vagus', 'Vago esquerdo'), note: note('class material shows the reverse; Moore, Netter', 'o material da aula mostra o inverso; Moore, Netter'), children: [{ label: t('Anterior gastric plexus', 'Plexo gástrico anterior') }] },
      { label: t('Right vagus', 'Vago direito'), children: [{ label: t('Posterior gastric plexus', 'Plexo gástrico posterior') }] },
    ] },
    { label: t('Enteric nervous system', 'Sistema nervoso entérico'), children: [
      { label: t('Submucosal plexus (Meissner)', 'Plexo submucoso (Meissner)'), note: note('glands, blood flow', 'glândulas, fluxo'), },
      { label: t('Myenteric plexus (Auerbach)', 'Plexo mioentérico (Auerbach)'), note: note('muscle layers', 'camadas musculares') },
    ] },
  ] },
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'stomach-8', supply: true, title: t('Supply sheet: arteries, veins and nerves', 'Ficha de suprimento: artérias, veias e nervos'),
    cards: [
      {
        id: 'st-sup-arteries', ref: '27–36', title: t('Arteries of the stomach at a glance', 'Artérias do estômago num relance'),
        focus: TREE, ghost: ['stomach'], view: 'ant',
        body: [
          t('### Where they come from', '### De onde vêm'),
          t('Every artery of the stomach comes from the Celiac trunk, which leaves the Abdominal aorta at T12 and splits into three branches: the Left gastric artery, the Splenic artery and the Common hepatic artery. The only outside contribution is at the pancreaticoduodenal arcade, where the inferior pancreaticoduodenal artery arrives from the Superior mesenteric artery.',
            'Todas as artérias do estômago vêm do tronco celíaco, que sai da aorta abdominal em T12 e se divide em três ramos: a artéria gástrica esquerda, a artéria esplênica e a artéria hepática comum. A única contribuição externa está na arcada pancreaticoduodenal, onde a artéria pancreaticoduodenal inferior chega vinda da artéria mesentérica superior.'),
          t('### The two arcades', '### As duas arcadas'),
          t('Lesser curvature: the Left gastric artery (from the celiac trunk) meets the Right gastric artery (from the Proper hepatic artery). Greater curvature: the left gastro-omental artery (from the Splenic artery) meets the right gastro-omental artery (from the Gastroduodenal artery). Each curvature is therefore fed from both ends, by two different celiac branches.',
            'Curvatura menor: a artéria gástrica esquerda (do tronco celíaco) encontra a artéria gástrica direita (da artéria hepática própria). Curvatura maior: a artéria gastromental esquerda (da artéria esplênica) encontra a artéria gastromental direita (da artéria gastroduodenal). Cada curvatura é, portanto, irrigada pelas duas extremidades, por dois ramos celíacos diferentes.'),
          t('### Anastomoses beyond the stomach', '### Anastomoses além do estômago'),
          t('At the cardia, the esophageal branches of the Left gastric artery climb through the Diaphragm and join the esophageal arteries of the thoracic aorta. Behind the head of the Pancreas, the superior pancreaticoduodenal artery (from the gastroduodenal) joins the inferior pancreaticoduodenal artery (from the SMA), linking the celiac and superior mesenteric territories.',
            'Na cárdia, os ramos esofágicos da artéria gástrica esquerda sobem pelo diafragma e se unem às artérias esofágicas da aorta torácica. Atrás da cabeça do pâncreas, a artéria pancreaticoduodenal superior (da gastroduodenal) se une à artéria pancreaticoduodenal inferior (da AMS), ligando os territórios celíaco e mesentérico superior.'),
          t('### Vessels and the peritoneal folds', '### Vasos e as pregas peritoneais'),
          t('The Left gastric artery sends branches to the hepatogastric ligament, and the Right gastric artery supplies the lesser omentum, which the hepatogastric and hepatoduodenal ligaments form together. On the greater curvature, both gastro-omental arteries give omental branches to the greater omentum, whose anterior root is the gastrocolic ligament. The Gastroduodenal artery descends between the Duodenum and the neck of the Pancreas, and the superior pancreaticoduodenal artery runs down behind the head of the Pancreas.',
            'A artéria gástrica esquerda envia ramos ao ligamento hepatogástrico, e a artéria gástrica direita irriga o omento menor, que os ligamentos hepatogástrico e hepatoduodenal formam juntos. Na curvatura maior, as duas artérias gastromentais dão ramos omentais ao omento maior, cuja raiz anterior é o ligamento gastrocólico. A artéria gastroduodenal desce entre o duodeno e o colo do pâncreas, e a artéria pancreaticoduodenal superior desce atrás da cabeça do pâncreas.'),
        ],
      },
      {
        id: 'st-sup-veins-nerves', ref: '37, 45–51', title: t('Veins and nerves at a glance', 'Veias e nervos num relance'),
        focus: ['hepatic_portal_v', 'splenic_v', 'gastric_v', 'smv'], ghost: ['stomach', 'pancreas', 'spleen'], view: 'ant',
        body: [
          t('### Veins: all to the portal system', '### Veias: todas para o sistema porta'),
          t('Each artery has a matching vein: left and right gastric, left and right gastro-omental, short gastric, splenic and pancreaticoduodenal veins. All of them end in the Hepatic portal vein, so blood from the stomach passes through the liver before reaching the systemic circulation. In the 3D model, follow the Splenic vein and the Gastric veins to the Hepatic portal vein.',
            'Cada artéria tem uma veia correspondente: veias gástricas esquerda e direita, gastromentais esquerda e direita, gástricas curtas, esplênica e pancreaticoduodenais. Todas terminam na veia porta, então o sangue do estômago passa pelo fígado antes de chegar à circulação sistêmica. No modelo 3D, siga a veia esplênica e as veias gástricas até a veia porta.'),
          t('### Sympathetic', '### Simpático'),
          t('The sympathetic fibres come from neuromeres T5–T8 (Moore: T6–T9). They travel in the greater and lesser splanchnic nerves to the celiac ganglia, which lie on the aorta around the origin of the Celiac trunk, and reach the stomach as branches of the celiac plexus.',
            'As fibras simpáticas vêm dos neurômeros T5–T8 (Moore: T6–T9). Elas seguem pelos nervos esplâncnicos maior e menor até os gânglios celíacos, que ficam sobre a aorta em volta da origem do tronco celíaco, e chegam ao estômago como ramos do plexo celíaco.'),
          t('### Parasympathetic', '### Parassimpático'),
          t('The parasympathetic supply is the vagus nerve. The left vagus forms the anterior gastric plexus and the right vagus forms the posterior gastric plexus. (The class material states the reverse; Moore and Netter give left → anterior, right → posterior.) The anterior and posterior vagal trunks give the greater anterior and posterior gastric nerves, hepatic and celiac nerves, and pyloric branches.',
            'A inervação parassimpática é o nervo vago. O vago esquerdo forma o plexo gástrico anterior e o vago direito forma o plexo gástrico posterior. (O material da aula afirma o inverso; Moore e Netter dão esquerdo → anterior, direito → posterior.) Os troncos vagais anterior e posterior dão os nervos gástricos maiores anterior e posterior, nervos hepáticos e celíacos e ramos pilóricos.'),
          t('### Enteric plexuses in the wall', '### Plexos entéricos na parede'),
          t('Inside the wall, the submucosal (Meissner’s) plexus controls gland secretion and local blood flow, and the myenteric (Auerbach’s) plexus, between the circular and longitudinal muscle layers, controls the churning muscle. The autonomic nerves act on the stomach through these two plexuses.',
            'Dentro da parede, o plexo submucoso (de Meissner) controla a secreção das glândulas e o fluxo sanguíneo local, e o plexo mioentérico (de Auerbach), entre as camadas musculares circular e longitudinal, controla a musculatura que mistura o conteúdo. Os nervos autônomos agem sobre o estômago através desses dois plexos.'),
        ],
      },
    ],
    questions: [
      q('27', { q: 'Which three branches does the celiac trunk give?', correct: 'Left gastric, splenic and common hepatic arteries', wrong: ['Left gastric, right gastric and splenic arteries', 'Common hepatic, gastroduodenal and splenic arteries', 'Left gastric, splenic and superior mesenteric arteries'], why: 'Celiac trunk at T12 → left gastric, splenic, common hepatic.' },
        { q: 'Quais três ramos o tronco celíaco dá?', correct: 'Artérias gástrica esquerda, esplênica e hepática comum', wrong: ['Artérias gástrica esquerda, gástrica direita e esplênica', 'Artérias hepática comum, gastroduodenal e esplênica', 'Artérias gástrica esquerda, esplênica e mesentérica superior'], why: 'Tronco celíaco em T12 → gástrica esquerda, esplênica, hepática comum.' }),
      q('37', { q: 'Where do all the gastric veins end?', correct: 'In the hepatic portal vein', wrong: ['In the inferior vena cava', 'In the left renal vein', 'In the hepatic veins'], why: 'The veins follow the arteries and drain to the portal vein.' },
        { q: 'Onde terminam todas as veias gástricas?', correct: 'Na veia porta', wrong: ['Na veia cava inferior', 'Na veia renal esquerda', 'Nas veias hepáticas'], why: 'As veias acompanham as artérias e drenam para a veia porta.' }),
      q('51', { q: 'Which nerves carry the sympathetic fibres to the celiac ganglia for the stomach?', correct: 'Greater and lesser splanchnic nerves', wrong: ['Pelvic splanchnic nerves', 'Anterior and posterior vagal trunks', 'Phrenic nerves'], why: 'Greater + lesser splanchnic nerves + celiac ganglia, T5–T8 (Moore: T6–T9).' },
        { q: 'Quais nervos levam as fibras simpáticas aos gânglios celíacos para o estômago?', correct: 'Nervos esplâncnicos maior e menor', wrong: ['Nervos esplâncnicos pélvicos', 'Troncos vagais anterior e posterior', 'Nervos frênicos'], why: 'Esplâncnico maior + menor + gânglios celíacos, T5–T8 (Moore: T6–T9).' }),
      q('45', { q: 'Which plexus controls gland secretion and local blood flow in the gastric wall?', correct: 'Submucosal (Meissner’s) plexus', wrong: ['Myenteric (Auerbach’s) plexus', 'Celiac plexus', 'Anterior gastric plexus'], why: 'Meissner’s plexus in the submucosa controls secretion and local blood flow.' },
        { q: 'Qual plexo controla a secreção das glândulas e o fluxo sanguíneo local na parede gástrica?', correct: 'Plexo submucoso (de Meissner)', wrong: ['Plexo mioentérico (de Auerbach)', 'Plexo celíaco', 'Plexo gástrico anterior'], why: 'O plexo de Meissner, na submucosa, controla a secreção e o fluxo local.' }),
      q('29', { q: 'Which arteries join the esophageal branches of the left gastric artery above the diaphragm?', correct: 'Esophageal arteries of the thoracic aorta', wrong: ['Short gastric arteries', 'Inferior phrenic arteries', 'Right gastric artery'], why: 'Esophageal branches rise through the diaphragm and anastomose with the esophageal arteries of the thoracic aorta.' },
        { q: 'Quais artérias se unem aos ramos esofágicos da artéria gástrica esquerda acima do diafragma?', correct: 'Artérias esofágicas da aorta torácica', wrong: ['Artérias gástricas curtas', 'Artérias frênicas inferiores', 'Artéria gástrica direita'], why: 'Os ramos esofágicos sobem pelo diafragma e se anastomosam com as artérias esofágicas da aorta torácica.' }),
    ],
  },
  {
    id: 'stomach-9', supply: true, title: t('Branching: the celiac tree', 'Ramificação: a árvore celíaca'),
    cards: [
      {
        id: 'st-sup-tree', ref: '27–36', title: t('Walk the celiac tree', 'Percorra a árvore celíaca'),
        focus: TREE, ghost: ['stomach', 'pancreas', 'spleen', 'duodenum'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud: first the three celiac branches, then what each one divides into. The dashed brackets mark the three arcades; their numbers match the list under the tree.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta: primeiro os três ramos celíacos, depois em que cada um se divide. Os colchetes tracejados marcam as três arcadas; os números correspondem à lista abaixo da árvore.'),
          t('### Where names change', '### Onde os nomes mudam'),
          t('The Common hepatic artery has no terminal division of its own: once it gives off the Gastroduodenal artery, the same vessel continues as the Proper hepatic artery. The Right gastric artery arises from the proper hepatic near the pylorus. The Gastroduodenal artery arises above or behind the first part of the Duodenum, descends between the duodenum and the neck of the Pancreas giving small branches to the pylorus, and ends by dividing into the right gastro-omental and the superior pancreaticoduodenal arteries.',
            'A artéria hepática comum não tem uma divisão terminal própria: depois de dar a artéria gastroduodenal, o mesmo vaso continua como artéria hepática própria. A artéria gástrica direita nasce da hepática própria perto do piloro. A artéria gastroduodenal nasce acima ou atrás da primeira parte do duodeno, desce entre o duodeno e o colo do pâncreas dando pequenos ramos ao piloro e termina dividindo-se nas artérias gastromental direita e pancreaticoduodenal superior.'),
          t('### Courses to remember', '### Trajetos para lembrar'),
          t('The Left gastric artery first runs left and up to the cardia, then turns down and right along the lesser curvature. The Right gastric artery runs the other way, right to left along the lesser curvature. The right gastro-omental artery runs left along the greater curvature; the left gastro-omental artery descends from the splenic to the greater curvature. The Splenic artery, the largest of the three celiac branches, runs toward the spleen and gives the short gastric arteries to the fundus on the way.',
            'A artéria gástrica esquerda primeiro segue para a esquerda e para cima até a cárdia, depois vira para baixo e para a direita ao longo da curvatura menor. A artéria gástrica direita segue no sentido oposto, da direita para a esquerda ao longo da curvatura menor. A artéria gastromental direita segue para a esquerda ao longo da curvatura maior; a gastromental esquerda desce da esplênica até a curvatura maior. A artéria esplênica, a maior dos três ramos celíacos, segue para o baço e no caminho dá as artérias gástricas curtas para o fundo.'),
        ],
      },
    ],
    questions: [
      q('30', { q: 'After giving off the gastroduodenal artery, the common hepatic artery continues as which artery?', correct: 'Proper hepatic artery', wrong: ['Right gastric artery', 'Right gastro-omental artery', 'Splenic artery'], why: 'The common hepatic divides into the gastroduodenal and continues as the proper hepatic artery.' },
        { q: 'Depois de dar a artéria gastroduodenal, a artéria hepática comum continua como qual artéria?', correct: 'Artéria hepática própria', wrong: ['Artéria gástrica direita', 'Artéria gastromental direita', 'Artéria esplênica'], why: 'A hepática comum dá a gastroduodenal e continua como hepática própria.' }),
      q('30', { q: 'From which artery does the right gastric artery arise?', correct: 'Proper hepatic artery', wrong: ['Gastroduodenal artery', 'Left gastric artery', 'Splenic artery'], why: 'Right gastric from the proper hepatic artery, near the pylorus.' },
        { q: 'De qual artéria nasce a artéria gástrica direita?', correct: 'Artéria hepática própria', wrong: ['Artéria gastroduodenal', 'Artéria gástrica esquerda', 'Artéria esplênica'], why: 'Gástrica direita da hepática própria, perto do piloro.' }),
      q('31', { q: 'Into which two arteries does the gastroduodenal artery divide?', correct: 'Right gastro-omental and superior pancreaticoduodenal', wrong: ['Right gastric and right gastro-omental', 'Superior and inferior pancreaticoduodenal', 'Left and right gastro-omental'], why: 'The gastroduodenal ends as the right gastro-omental and the superior pancreaticoduodenal arteries.' },
        { q: 'Em quais duas artérias a artéria gastroduodenal se divide?', correct: 'Gastromental direita e pancreaticoduodenal superior', wrong: ['Gástrica direita e gastromental direita', 'Pancreaticoduodenais superior e inferior', 'Gastromentais esquerda e direita'], why: 'A gastroduodenal termina como gastromental direita e pancreaticoduodenal superior.' }),
      q('35', { q: 'Which two branches of the splenic artery go to the stomach?', correct: 'Short gastric arteries and left gastro-omental artery', wrong: ['Left gastric and short gastric arteries', 'Right gastro-omental and short gastric arteries', 'Left gastro-omental and right gastric arteries'], why: 'Splenic → short gastric arteries (fundus) and left gastro-omental artery.' },
        { q: 'Quais dois ramos da artéria esplênica vão ao estômago?', correct: 'Artérias gástricas curtas e artéria gastromental esquerda', wrong: ['Artérias gástrica esquerda e gástricas curtas', 'Artérias gastromental direita e gástricas curtas', 'Artérias gastromental esquerda e gástrica direita'], why: 'Esplênica → artérias gástricas curtas (fundo) e gastromental esquerda.' }),
      q('28', { q: 'Which two arteries form the arcade of the lesser curvature?', correct: 'Left gastric and right gastric', wrong: ['Left and right gastro-omental', 'Left gastric and short gastric', 'Right gastric and right gastro-omental'], why: 'The left gastric anastomoses with the right gastric along the lesser curvature.' },
        { q: 'Quais duas artérias formam a arcada da curvatura menor?', correct: 'Gástrica esquerda e gástrica direita', wrong: ['Gastromentais esquerda e direita', 'Gástrica esquerda e gástricas curtas', 'Gástrica direita e gastromental direita'], why: 'A gástrica esquerda se anastomosa com a gástrica direita ao longo da curvatura menor.' }),
      q('28', { q: 'Which two arteries form the arcade of the greater curvature?', correct: 'Left and right gastro-omental', wrong: ['Left and right gastric', 'Short gastric and left gastric', 'Gastroduodenal and splenic'], why: 'The right gastro-omental (gastroduodenal) meets the left gastro-omental (splenic).' },
        { q: 'Quais duas artérias formam a arcada da curvatura maior?', correct: 'Gastromentais esquerda e direita', wrong: ['Gástricas esquerda e direita', 'Gástricas curtas e gástrica esquerda', 'Gastroduodenal e esplênica'], why: 'A gastromental direita (gastroduodenal) encontra a gastromental esquerda (esplênica).' }),
      q('33', { q: 'The superior pancreaticoduodenal artery anastomoses with an artery from which trunk?', correct: 'Superior mesenteric artery (inferior pancreaticoduodenal)', wrong: ['Celiac trunk (left gastric)', 'Splenic artery (dorsal pancreatic)', 'Inferior mesenteric artery (left colic)'], why: 'It ends in an anastomosis with the inferior pancreaticoduodenal artery, a branch of the SMA.' },
        { q: 'A artéria pancreaticoduodenal superior se anastomosa com uma artéria de qual tronco?', correct: 'Artéria mesentérica superior (pancreaticoduodenal inferior)', wrong: ['Tronco celíaco (gástrica esquerda)', 'Artéria esplênica (pancreática dorsal)', 'Artéria mesentérica inferior (cólica esquerda)'], why: 'Termina em anastomose com a pancreaticoduodenal inferior, ramo da AMS.' }),
      q('29', { q: 'What is the course of the left gastric artery?', correct: 'Left and up to the cardia, then down and right along the lesser curvature', wrong: ['Right to left along the greater curvature', 'Straight down behind the pylorus', 'Left along the greater curvature to the spleen'], why: 'From its origin it runs left and up to the cardia, then turns down and right along the lesser curvature.' },
        { q: 'Qual é o trajeto da artéria gástrica esquerda?', correct: 'Para a esquerda e para cima até a cárdia, depois para baixo e para a direita ao longo da curvatura menor', wrong: ['Da direita para a esquerda ao longo da curvatura maior', 'Reto para baixo atrás do piloro', 'Para a esquerda ao longo da curvatura maior até o baço'], why: 'Da origem segue para a esquerda e para cima até a cárdia, depois vira para baixo e para a direita ao longo da curvatura menor.' }),
    ],
  },
  {
    id: 'stomach-10', supply: true, title: t('Territories and contents, both directions', 'Territórios e conteúdo, nos dois sentidos'),
    cards: [
      {
        id: 'st-sup-territories', ref: '31', title: t('Who supplies what', 'Quem irriga o quê'),
        focus: ['left_gastric_a', 'splenic_a', 'gastroduodenal_a', 'pancreaticoduodenal_a'], ghost: ['stomach', 'pancreas', 'spleen', 'duodenum'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('Left gastric artery: the lesser curvature, the abdominal esophagus and the hepatogastric ligament. Splenic artery: the spleen, the pancreas, the stomach and the greater omentum. Gastroduodenal artery: the stomach, the duodenum, the pancreas and the greater omentum. Inferior pancreaticoduodenal artery: the head of the pancreas and the descending and inferior parts of the duodenum.',
            'Artéria gástrica esquerda: a curvatura menor, o esôfago abdominal e o ligamento hepatogástrico. Artéria esplênica: o baço, o pâncreas, o estômago e o omento maior. Artéria gastroduodenal: o estômago, o duodeno, o pâncreas e o omento maior. Artéria pancreaticoduodenal inferior: a cabeça do pâncreas e as partes descendente e inferior do duodeno.'),
          t('Smaller branches: the Right gastric artery supplies the pylorus, the lesser omentum and the stomach. The short gastric arteries supply the fundus. The left gastro-omental artery supplies the fundus, the body and the greater omentum. The superior pancreaticoduodenal artery supplies the stomach, the pancreas and the duodenum.',
            'Ramos menores: a artéria gástrica direita irriga o piloro, o omento menor e o estômago. As artérias gástricas curtas irrigam o fundo. A artéria gastromental esquerda irriga o fundo, o corpo e o omento maior. A artéria pancreaticoduodenal superior irriga o estômago, o pâncreas e o duodeno.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('Turn it around when you revise. Fundus: short gastric arteries and left gastro-omental artery, both from the splenic. Lesser curvature: left and right gastric arteries. Greater curvature: left and right gastro-omental arteries. Pylorus: right gastric artery and small branches of the gastroduodenal. Abdominal esophagus: left gastric artery. Greater omentum: splenic and gastroduodenal territories, through the gastro-omental arteries.',
            'Inverta ao revisar. Fundo: artérias gástricas curtas e artéria gastromental esquerda, ambas da esplênica. Curvatura menor: artérias gástricas esquerda e direita. Curvatura maior: artérias gastromentais esquerda e direita. Piloro: artéria gástrica direita e pequenos ramos da gastroduodenal. Esôfago abdominal: artéria gástrica esquerda. Omento maior: territórios esplênico e gastroduodenal, pelas artérias gastromentais.'),
        ],
      },
      {
        id: 'st-sup-nerves', ref: '49–51', title: t('Nerve map of the stomach', 'Mapa nervoso do estômago'),
        focus: ['celiac_trunk', 'stomach', 'esophagus'], ghost: ['stomach'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the three systems. Sympathetic: from T5–T8 (Moore: T6–T9), through the greater and lesser splanchnic nerves, relayed in the celiac ganglia on the aorta and delivered by branches of the celiac plexus. Parasympathetic: the vagus, with the left vagus forming the anterior gastric plexus and the right vagus the posterior gastric plexus. Enteric: the submucosal and myenteric plexuses inside the wall, through which both autonomic systems act.',
            'Toque nos três sistemas. Simpático: de T5–T8 (Moore: T6–T9), pelos nervos esplâncnicos maior e menor, com relé nos gânglios celíacos sobre a aorta e distribuído por ramos do plexo celíaco. Parassimpático: o vago, com o vago esquerdo formando o plexo gástrico anterior e o vago direito o plexo gástrico posterior. Entérico: os plexos submucoso e mioentérico dentro da parede, pelos quais os dois sistemas autônomos agem.'),
        ],
      },
    ],
    questions: [
      q('31', { q: 'Which artery supplies the lesser curvature, the abdominal esophagus and the hepatogastric ligament?', correct: 'Left gastric artery', wrong: ['Right gastro-omental artery', 'Splenic artery', 'Gastroduodenal artery'], why: 'Territory of the left gastric artery.' },
        { q: 'Qual artéria irriga a curvatura menor, o esôfago abdominal e o ligamento hepatogástrico?', correct: 'Artéria gástrica esquerda', wrong: ['Artéria gastromental direita', 'Artéria esplênica', 'Artéria gastroduodenal'], why: 'Território da artéria gástrica esquerda.' }),
      q('31', { q: 'Which territory belongs to the inferior pancreaticoduodenal artery?', correct: 'Head of the pancreas and the descending and inferior parts of the duodenum', wrong: ['Lesser curvature and abdominal esophagus', 'Spleen and greater omentum', 'Fundus and body of the stomach'], why: 'Inferior pancreaticoduodenal → head of pancreas, descending and inferior duodenum.' },
        { q: 'Qual território pertence à artéria pancreaticoduodenal inferior?', correct: 'Cabeça do pâncreas e partes descendente e inferior do duodeno', wrong: ['Curvatura menor e esôfago abdominal', 'Baço e omento maior', 'Fundo e corpo do estômago'], why: 'Pancreaticoduodenal inferior → cabeça do pâncreas, duodeno descendente e inferior.' }),
      q('35', { q: 'Which arteries supply the fundus?', correct: 'Short gastric arteries and left gastro-omental artery', wrong: ['Right gastric and gastroduodenal arteries', 'Left gastric artery only', 'Right gastro-omental artery only'], why: 'Short gastrics to the fundus; left gastro-omental to fundus, body and greater omentum.' },
        { q: 'Quais artérias irrigam o fundo?', correct: 'Artérias gástricas curtas e artéria gastromental esquerda', wrong: ['Artérias gástrica direita e gastroduodenal', 'Só a artéria gástrica esquerda', 'Só a artéria gastromental direita'], why: 'Gástricas curtas para o fundo; gastromental esquerda para fundo, corpo e omento maior.' }),
      q('30', { q: 'What does the right gastric artery supply?', correct: 'Pylorus, lesser omentum and stomach', wrong: ['Fundus and greater omentum', 'Head of the pancreas and duodenum', 'Spleen and pancreas'], why: 'Right gastric → pylorus, lesser omentum, stomach.' },
        { q: 'O que a artéria gástrica direita irriga?', correct: 'Piloro, omento menor e estômago', wrong: ['Fundo e omento maior', 'Cabeça do pâncreas e duodeno', 'Baço e pâncreas'], why: 'Gástrica direita → piloro, omento menor, estômago.' }),
      q('32', { q: 'Between which two structures does the gastroduodenal artery descend?', correct: 'The duodenum and the neck of the pancreas', wrong: ['The stomach and the spleen', 'The liver and the lesser omentum', 'The aorta and the inferior vena cava'], why: 'It descends between the duodenum and the neck of the pancreas.' },
        { q: 'Entre quais duas estruturas desce a artéria gastroduodenal?', correct: 'O duodeno e o colo do pâncreas', wrong: ['O estômago e o baço', 'O fígado e o omento menor', 'A aorta e a veia cava inferior'], why: 'Desce entre o duodeno e o colo do pâncreas.' }),
      q('33', { q: 'Where does the superior pancreaticoduodenal artery run?', correct: 'Down on the right, behind the head of the pancreas', wrong: ['Along the lesser curvature', 'In the gastrosplenic ligament', 'Along the greater curvature'], why: 'It runs down on the right, behind the head of the pancreas.' },
        { q: 'Por onde corre a artéria pancreaticoduodenal superior?', correct: 'Para baixo, à direita, atrás da cabeça do pâncreas', wrong: ['Ao longo da curvatura menor', 'No ligamento gastroesplênico', 'Ao longo da curvatura maior'], why: 'Desce à direita, atrás da cabeça do pâncreas.' }),
      q('50', { q: 'Which vagus nerve forms the posterior gastric plexus?', correct: 'Right vagus nerve', wrong: ['Left vagus nerve', 'Greater splanchnic nerve', 'Phrenic nerve'], why: 'Right vagus → posterior gastric plexus; left vagus → anterior (Moore; Netter). The class material shows the reverse.' },
        { q: 'Qual nervo vago forma o plexo gástrico posterior?', correct: 'Nervo vago direito', wrong: ['Nervo vago esquerdo', 'Nervo esplâncnico maior', 'Nervo frênico'], why: 'Vago direito → plexo gástrico posterior; vago esquerdo → anterior (Moore; Netter). O material da aula mostra o inverso.' }),
      q('47', { q: 'Where is the myenteric (Auerbach’s) plexus of the stomach?', correct: 'Between the circular and longitudinal muscle layers', wrong: ['In the submucosa', 'On the aorta', 'In the lesser omentum'], why: 'Autonomic fibres between the circular and longitudinal layers (Auerbach’s plexus).' },
        { q: 'Onde fica o plexo mioentérico (de Auerbach) do estômago?', correct: 'Entre as camadas musculares circular e longitudinal', wrong: ['Na submucosa', 'Sobre a aorta', 'No omento menor'], why: 'Fibras autônomas entre as camadas circular e longitudinal (plexo de Auerbach).' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
