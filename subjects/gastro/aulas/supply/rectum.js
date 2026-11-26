// SpeedGastro · Rectum supply blocks: vessels, lymph and nerves.
// Facts only from deck 11_rectum: p13–14 (mesorectum), p28 (pectinate line),
// p29–30 (rectal arteries), p31 and p36–41 (rectal and portosystemic veins),
// p39 (umbilical veins), p43 (innervation), p44 (where the flow reverses).
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
const q = (ref, en, pt) => ({ ref, ...en, pt });

const L = {
  root: t('Arterial supply of the rectum', 'Suprimento arterial do reto'),
  ima: t('Inferior mesenteric artery', 'Artéria mesentérica inferior'),
  sra: t('Superior rectal artery', 'Artéria retal superior'),
  iliac: t('Internal iliac artery', 'Artéria ilíaca interna'),
  mra: t('Middle rectal artery', 'Artéria retal média'),
  pud: t('Internal pudendal artery', 'Artéria pudenda interna'),
  ira: t('Inferior rectal artery', 'Artéria retal inferior'),
  anas: t('anastomosis around the rectum', 'anastomose ao redor do reto'),
  split: t('splits at S3', 'divide-se em S3'),
  plexus: t('haemorrhoidal plexus', 'plexo hemorroidário'),
  svein: t('Superior rectal vein', 'Veia retal superior'),
  imv: t('Inferior mesenteric vein', 'Veia mesentérica inferior'),
  spv: t('Splenic vein', 'Veia esplênica'),
  pv: t('Portal vein', 'Veia porta'),
  mvein: t('Middle rectal vein', 'Veia retal média'),
  iliacv: t('Internal iliac vein', 'Veia ilíaca interna'),
  cic: t('Common iliac vein', 'Veia ilíaca comum'),
  ivc: t('Inferior vena cava', 'Veia cava inferior'),
  ivein: t('Inferior rectal vein', 'Veia retal inferior'),
  pudv: t('Internal pudendal vein', 'Veia pudenda interna'),
  net: t('plexiform network', 'rede plexiforme'),
  sympa: t('Sympathetic', 'Simpático'),
  lsn: t('Lumbar splanchnic nerves', 'Nervos esplâncnicos lombares'),
  img: t('Inferior mesenteric ganglion', 'Gânglio mesentérico inferior'),
  imp: t('Inferior mesenteric plexus', 'Plexo mesentérico inferior'),
  srp: t('Superior rectal plexus', 'Plexo retal superior'),
  shp: t('Superior hypogastric plexus', 'Plexo hipogástrico superior'),
  ihp: t('Inferior hypogastric plexus', 'Plexo hipogástrico inferior'),
  mirp: t('Middle and inferior rectal plexuses', 'Plexos retais médio e inferior'),
  para: t('Parasympathetic', 'Parassimpático'),
  psn: t('Pelvic splanchnic nerves', 'Nervos esplâncnicos pélvicos'),
  novagus: t('No vagus supply', 'Sem suprimento vagal'),
  som: t('Somatic, below the pectinate line', 'Somático, abaixo da linha pectínea'),
  pudn: t('Pudendal nerve', 'Nervo pudendo'),
  irn: t('Inferior rectal nerve', 'Nervo retal inferior'),
};

const ARTERY_TREE = {
  root: { label: L.root, children: [
    { label: L.ima, children: [{ label: L.sra, note: t('splits at S3', 'divide-se em S3') }] },
    { label: L.iliac, children: [
      { label: L.mra },
      { label: L.pud, children: [{ label: L.ira }] },
    ] },
  ] },
  links: [
    { from: L.sra, to: L.mra, label: L.anas },
    { from: L.mra, to: L.ira, label: L.anas },
    { from: L.sra, to: L.ira, label: L.anas },
  ],
};

const VENOUS_TREE = {
  root: { label: L.plexus, children: [
    { label: L.svein, children: [{ label: L.imv, children: [{ label: L.spv, children: [{ label: L.pv }] }] }] },
    { label: L.mvein, children: [{ label: L.iliacv, children: [{ label: L.cic, children: [{ label: L.ivc }] }] }] },
    { label: L.ivein, children: [{ label: L.pudv, note: t('then to the internal iliac vein', 'depois à veia ilíaca interna') }] },
  ] },
  links: [
    { from: L.svein, to: L.mvein, label: L.net },
    { from: L.mvein, to: L.ivein, label: L.net },
  ],
};

const NERVE_TREE = {
  root: { label: t('Nerves of the rectum', 'Nervos do reto'), children: [
    { label: L.sympa, children: [{ label: L.lsn, children: [
      { label: L.img, children: [{ label: L.imp, children: [{ label: L.srp }] }] },
      { label: L.shp, children: [{ label: L.ihp, children: [{ label: L.mirp }] }] },
    ] }] },
    { label: L.para, children: [{ label: L.psn, note: t('S2–S4', 'S2–S4'), children: [{ label: L.novagus }] }] },
    { label: L.som, children: [{ label: L.pudn, children: [{ label: L.irn }] }] },
  ] },
};

export const blocks = [
  {
    id: 'rectum-sup1', supply: true, title: t('Supply sheet: arteries, veins, lymph and nerves', 'Ficha de suprimento: artérias, veias, linfa e nervos'),
    cards: [
      {
        id: 'rectum-sup-arteries', ref: '29–30', title: t('The three rectal arteries at a glance', 'As três artérias do reto num relance'),
        focus: ['superior_rectal_a', 'ima', 'rectum'], view: 'ant',
        body: [
          t('### Three sources', '### Três origens'),
          t('The rectum receives three arteries, and each comes from a different parent. The superior rectal artery is the terminal branch of the Inferior mesenteric artery, so it arrives from the gut side. The middle rectal artery comes from the Internal iliac artery. The inferior rectal artery comes from the Internal pudendal artery, which is itself one of the Internal iliac branches.',
            'O reto recebe três artérias, e cada uma vem de uma origem diferente. A artéria retal superior é o ramo terminal da artéria mesentérica inferior, então chega pelo lado intestinal. A artéria retal média vem da artéria ilíaca interna. A artéria retal inferior vem da artéria pudenda interna, que é ela mesma um dos ramos da ilíaca interna.'),
          t('### The three join each other', '### As três se unem'),
          t('The three rectal arteries anastomose around the rectum, so the supply is shared rather than carried by one vessel. The superior rectal artery reaches the mucosa by splitting into smaller branches that pierce the wall, as far as the internal anal sphincter.',
            'As três artérias retais se anastomosam ao redor do reto, de modo que o suprimento é compartilhado e não carregado por um único vaso. A artéria retal superior alcança a mucosa dividindo-se em ramos menores que perfuram a parede, até o esfíncter anal interno.'),
        ],
      },
      {
        id: 'rectum-sup-veins', ref: '31, 36–41, 44', title: t('Veins and portosystemic routes at a glance', 'Veias e vias porto-sistêmicas num relance'),
        focus: ['imv', 'splenic_v', 'hepatic_portal_v', 'ivc_g', 'gastric_v'], view: 'ant',
        body: [
          t('### One plexus, two systems', '### Uma rede, dois sistemas'),
          t('The veins of the rectum form a disordered plexiform network, the haemorrhoidal plexus. Its upper vein drains to the portal system, while the middle and inferior rectal veins drain to the systemic system through the internal iliac veins.',
            'As veias do reto formam uma rede plexiforme desordenada, o plexo hemorroidário. Sua veia superior drena para o sistema porta, enquanto as veias retais média e inferior drenam para o sistema sistêmico pelas veias ilíacas internas.'),
          t('### Portal and caval drainage', '### Drenagem porta e cava'),
          t('The superior rectal vein drains to the Inferior mesenteric vein, which carries the blood on to the Splenic vein and the Portal vein. The middle rectal vein drains to the internal iliac vein, then the common iliac vein and the Inferior vena cava. The inferior rectal vein drains to the internal pudendal vein, which leads to the internal iliac vein and the same caval route.',
            'A veia retal superior drena para a veia mesentérica inferior, que leva o sangue à veia esplênica e à veia porta. A veia retal média drena para a veia ilíaca interna, depois para a veia ilíaca comum e a veia cava inferior. A veia retal inferior drena para a veia pudenda interna, que leva à veia ilíaca interna e à mesma via cava.'),
          t('### Where the portal system opens into the caval one', '### Onde o sistema porta se abre para o cava'),
          t('When the portal system is compromised, for example by cirrhosis, pressure rises and the portal vein sends blood back into the veins that normally feed it. Four sites of this reversal are named: the oesophageal veins, the paraumbilical veins, the colic veins and the middle and inferior rectal veins. The veins of the oesophagus and the rectum can barely carry the extra flow, so they dilate and are liable to rupture.',
            'Quando o sistema porta é comprometido, por exemplo pela cirrose, a pressão sobe e a veia porta devolve sangue às veias que normalmente a alimentam. Quatro locais dessa reversão são citados: as veias esofágicas, as veias paraumbilicais, as veias cólicas e as veias retais média e inferior. As veias do esôfago e do reto mal suportam o fluxo extra, então se dilatam e estão sujeitas a ruptura.'),
        ],
      },
      {
        id: 'rectum-sup-lymph-nerves', ref: '13–14, 28, 43', title: t('Lymph and nerves at a glance', 'Linfa e nervos num relance'),
        focus: ['rectum', 'external_anal_sphincter', 'puborectalis'], view: 'ant',
        body: [
          t('### Lymph', '### Linfa'),
          t('The mesorectum is the fat around the rectum, enclosed in its fascial envelope, and it carries lymphatic vessels and lymph nodes. The drainage of the rectum changes at the pectinate line, and no individual lymph nodes are named for the rectum itself.',
            'O mesorreto é a gordura ao redor do reto, envolvida pelo seu envoltório fascial, e leva vasos linfáticos e linfonodos. A drenagem do reto muda na linha pectínea, e nenhum linfonodo específico é nomeado para o próprio reto.'),
          t('### Sympathetic', '### Simpático'),
          t('Sympathetic fibres reach the rectum by the lumbar splanchnic nerves, which run to the inferior mesenteric ganglion. From there they pass to the inferior mesenteric plexus and the superior rectal plexus, and through the hypogastric plexuses they reach the middle and inferior rectal plexuses.',
            'As fibras simpáticas chegam ao reto pelos nervos esplâncnicos lombares, que seguem até o gânglio mesentérico inferior. Dali passam ao plexo mesentérico inferior e ao plexo retal superior, e, pelos plexos hipogástricos, alcançam os plexos retais médio e inferior.'),
          t('### Parasympathetic and somatic', '### Parassimpático e somático'),
          t('The parasympathetic supply is the pelvic splanchnic nerves, S2–S4, and the rectum has no vagal supply. Below the pectinate line the supply is somatic, through the pudendal nerve and its inferior rectal branch.',
            'O suprimento parassimpático são os nervos esplâncnicos pélvicos, S2–S4, e o reto não tem suprimento vagal. Abaixo da linha pectínea o suprimento é somático, pelo nervo pudendo e seu ramo retal inferior.'),
        ],
      },
    ],
    questions: [
      q('29', { q: 'Which artery is the terminal branch of the inferior mesenteric artery that reaches the rectum?', correct: 'Superior rectal artery', wrong: ['Middle rectal artery', 'Inferior rectal artery', 'Median sacral artery'], why: 'Slide 29: the superior rectal artery is the terminal branch of the inferior mesenteric artery.' },
        { q: 'Qual artéria é o ramo terminal da artéria mesentérica inferior que chega ao reto?', correct: 'Artéria retal superior', wrong: ['Artéria retal média', 'Artéria retal inferior', 'Artéria sacral mediana'], why: 'Slide 29: a artéria retal superior é o ramo terminal da artéria mesentérica inferior.' }),
      q('29', { q: 'From which artery does the inferior rectal artery arise?', correct: 'Internal pudendal artery', wrong: ['Middle rectal artery', 'Superior rectal artery', 'Inferior mesenteric artery'], why: 'Slide 29: the inferior rectal artery comes from the internal pudendal artery.' },
        { q: 'De qual artéria nasce a artéria retal inferior?', correct: 'Artéria pudenda interna', wrong: ['Artéria retal média', 'Artéria retal superior', 'Artéria mesentérica inferior'], why: 'Slide 29: a artéria retal inferior vem da artéria pudenda interna.' }),
      q('28', { q: 'What kind of innervation does the anal canal receive below the pectinate line?', correct: 'Somatic, through the pudendal nerve', wrong: ['Parasympathetic, through the vagus nerve', 'Sympathetic, through the greater splanchnic nerve', 'Visceral, through the celiac plexus'], why: 'Slide 28: below the line the innervation is somatic, through the pudendal nerve.' },
        { q: 'Que tipo de inervação o canal anal recebe abaixo da linha pectínea?', correct: 'Somática, pelo nervo pudendo', wrong: ['Parassimpática, pelo nervo vago', 'Simpática, pelo nervo esplâncnico maior', 'Visceral, pelo plexo celíaco'], why: 'Slide 28: abaixo da linha a inervação é somática, pelo nervo pudendo.' }),
      q('28', { q: 'The internal anal sphincter is made of which tissue, and where does it lie relative to the pectinate line?', correct: 'Smooth muscle, above the pectinate line', wrong: ['Skeletal muscle, below the pectinate line', 'Striated muscle, above the pectinate line', 'Cardiac muscle, at the anal verge'], why: 'Slide 28: above the line there is smooth muscle (internal anal sphincter); below it, skeletal muscle (external anal sphincter).' },
        { q: 'De que tecido é formado o esfíncter anal interno, e onde fica em relação à linha pectínea?', correct: 'Músculo liso, acima da linha pectínea', wrong: ['Músculo esquelético, abaixo da linha pectínea', 'Músculo estriado, acima da linha pectínea', 'Músculo cardíaco, na margem anal'], why: 'Slide 28: acima da linha há músculo liso (esfíncter anal interno); abaixo, músculo esquelético (esfíncter anal externo).' }),
      q('43', { q: 'Which nerves carry the parasympathetic supply to the rectum?', correct: 'Pelvic splanchnic nerves, S2–S4', wrong: ['Lumbar splanchnic nerves', 'Vagus nerve', 'Pudendal nerve'], why: 'Slide 43: parasympathetic = pelvic splanchnic nerves S2–S4; no vagus nerve.' },
        { q: 'Quais nervos levam a inervação parassimpática ao reto?', correct: 'Nervos esplâncnicos pélvicos, S2–S4', wrong: ['Nervos esplâncnicos lombares', 'Nervo vago', 'Nervo pudendo'], why: 'Slide 43: parassimpático = nervos esplâncnicos pélvicos S2–S4; sem nervo vago.' }),
      q('13–14', { q: 'Which artery enters the mesorectum from behind, inside the visceral pelvic fascia?', correct: 'Superior rectal artery', wrong: ['Middle rectal artery', 'Inferior rectal artery', 'Internal pudendal artery'], why: 'Slide 14: the superior rectal artery enters the mesorectum from behind, wrapped by the visceral pelvic fascia.' },
        { q: 'Qual artéria entra no mesorreto por trás, dentro da fáscia pélvica visceral?', correct: 'Artéria retal superior', wrong: ['Artéria retal média', 'Artéria retal inferior', 'Artéria pudenda interna'], why: 'Slide 14: a artéria retal superior entra no mesorreto por trás, envolvida pela fáscia pélvica visceral.' }),
      q('13–14', { q: 'Which septum lies in front of the rectum and separates it from the bladder in the male pelvis?', correct: 'Rectovesical (Denonvilliers) septum', wrong: ['Rectovaginal septum', 'Transverse perineal ligament', 'Anococcygeal ligament'], why: 'Slide 14: anteriorly, the rectovesical (Denonvilliers) septum separates the rectum from the prostate, seminal vesicles, ductus deferens and bladder.' },
        { q: 'Qual septo fica à frente do reto e o separa da bexiga na pelve masculina?', correct: 'Septo retovesical (de Denonvilliers)', wrong: ['Septo retovaginal', 'Ligamento transverso do períneo', 'Ligamento anococcígeo'], why: 'Slide 14: anteriormente, o septo retovesical (de Denonvilliers) separa o reto da próstata, vesículas seminais, ducto deferente e bexiga.' }),
    ],
  },
  {
    id: 'rectum-sup2', supply: true, title: t('Branching: the rectal arteries', 'Ramificação: as artérias do reto'),
    cards: [
      {
        id: 'rectum-sup-tree', ref: '29–30', title: t('Walk the rectal arteries', 'Percorra as artérias do reto'),
        focus: ['superior_rectal_a', 'ima', 'rectum'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Start with the Inferior mesenteric artery and its terminal branch, then move to the Internal iliac artery and its two branches. Tap each node, say its name, and then reveal the three anastomoses that join the rectal arteries.',
            'Leia a árvore de cima para baixo. Comece pela artéria mesentérica inferior e seu ramo terminal, depois passe à artéria ilíaca interna e seus dois ramos. Toque em cada nó, diga o nome em voz alta e então revele as três anastomoses que unem as artérias do reto.'),
          t('### From the inferior mesenteric artery', '### Da artéria mesentérica inferior'),
          t('The superior rectal artery runs in the sigmoid mesocolon and descends into the pelvis. At S3 it divides into two branches that run down along the rectum. Each of them breaks into smaller branches that pierce the rectal wall to reach the mucosa.',
            'A artéria retal superior corre no mesocolo sigmoide e desce para a pelve. Em S3 divide-se em dois ramos que descem ao longo do reto. Cada um deles se fragmenta em ramos menores que perfuram a parede retal para alcançar a mucosa.'),
          t('### From the internal iliac artery', '### Da artéria ilíaca interna'),
          t('The Internal iliac artery gives the middle rectal artery directly, and it gives the Internal pudendal artery, which in turn gives the inferior rectal artery. The same pelvic region also carries the superior and inferior vesical, obturator and superior and inferior gluteal arteries, as well as the vesiculodeferential or uterine branch.',
            'A artéria ilíaca interna dá diretamente a artéria retal média, e dá a artéria pudenda interna, que por sua vez dá a artéria retal inferior. A mesma região pélvica também leva as artérias vesicais superior e inferior, obturatriz, glúteas superior e inferior, além do ramo vesiculodeferencial ou uterino.'),
          t('### Where the three meet', '### Onde as três se encontram'),
          t('The three anastomose around the rectum, so the arterial branches from the inferior mesenteric side and the internal iliac side are connected rather than separate. Keep this in mind when you trace the territories.',
            'As três se anastomosam ao redor do reto, de modo que os ramos do lado mesentérico inferior e do lado ilíaco interno estão ligados, e não separados. Tenha isso em mente ao traçar os territórios.'),
        ],
      },
      {
        id: 'rectum-sup-pelvic-branches', ref: '30', title: t('The sigmoid and pelvic branches around the rectum', 'Os ramos sigmoides e pélvicos ao redor do reto'),
        focus: ['sigmoid_a', 'left_colic_a', 'ima', 'rectum'], view: 'ant',
        body: [
          t('### Named vessels in the rectal region', '### Vasos nomeados na região retal'),
          t('Beside the rectal arteries, the sigmoid region carries the left colic artery, with its ascending and descending branches, and the sigmoid arteries. The median sacral artery and the marginal artery of Drummond are also named in this region, and the superior rectal artery sends right and left branches with ascending branches into the anal canal.',
            'Ao lado das artérias retais, a região sigmoide leva a artéria cólica esquerda, com seus ramos ascendente e descendente, e as artérias sigmoides. A artéria sacral mediana e a artéria marginal de Drummond também são citadas nessa região, e a artéria retal superior envia ramos direito e esquerdo, com ramos ascendentes para o canal anal.'),
          t('### Why this matters', '### Por que isso importa'),
          t('The sigmoid arteries and the superior rectal branches occupy the same region of the lower colon, so revise them together, next to the left colic artery.',
            'As artérias sigmoides e os ramos da retal superior ocupam a mesma região do colo inferior, então revise-os juntos, ao lado da artéria cólica esquerda.'),
        ],
      },
    ],
    questions: [
      q('29', { q: 'After it splits at S3, along which structure do the two branches of the superior rectal artery run?', correct: 'Along the rectum, descending', wrong: ['Along the lesser curvature of the stomach', 'Along the ureter, to the bladder', 'Across the sacrum, to the coccyx'], why: 'Slide 29: at S3 the superior rectal artery divides into two branches that descend along the rectum.' },
        { q: 'Depois de se dividir em S3, ao longo de qual estrutura correm os dois ramos da artéria retal superior?', correct: 'Ao longo do reto, descendo', wrong: ['Ao longo da curvatura menor do estômago', 'Ao longo do ureter, até a bexiga', 'Atravessando o sacro, até o cóccix'], why: 'Slide 29: em S3 a artéria retal superior se divide em dois ramos que descem ao longo do reto.' }),
      q('29', { q: 'Where do the smallest terminal branches of the superior rectal artery reach?', correct: 'The mucosa, as far as the internal anal sphincter', wrong: ['The external anal sphincter', 'The perineal body', 'The rectovesical septum'], why: 'Slide 29: the smaller branches pierce the wall to the mucosa, as far as the internal anal sphincter.' },
        { q: 'Até onde chegam os menores ramos terminais da artéria retal superior?', correct: 'À mucosa, até o esfíncter anal interno', wrong: ['Ao esfíncter anal externo', 'Ao corpo perineal', 'Ao septo retovesical'], why: 'Slide 29: os ramos menores perfuram a parede até a mucosa, até o esfíncter anal interno.' }),
      q('29', { q: 'Which two rectal arteries come from the internal iliac side?', correct: 'Middle rectal and inferior rectal, the latter through the internal pudendal artery', wrong: ['Superior rectal and middle rectal', 'Superior rectal and inferior rectal', 'Median sacral and superior rectal'], why: 'Slide 29: the middle rectal artery comes from the internal iliac artery; the inferior rectal artery from the internal pudendal artery.' },
        { q: 'Quais duas artérias retais vêm do lado da ilíaca interna?', correct: 'Retal média e retal inferior, esta pela artéria pudenda interna', wrong: ['Retal superior e retal média', 'Retal superior e retal inferior', 'Sacral mediana e retal superior'], why: 'Slide 29: a artéria retal média vem da ilíaca interna; a retal inferior, da pudenda interna.' }),
      q('29–30', { q: 'Which three rectal arteries anastomose around the rectum?', correct: 'Superior, middle and inferior rectal arteries', wrong: ['Superior and middle rectal arteries only', 'Inferior rectal and median sacral arteries', 'Left colic and inferior rectal arteries'], why: 'Slide 29: the three rectal arteries anastomose.' },
        { q: 'Quais três artérias retais se anastomosam ao redor do reto?', correct: 'Retais superior, média e inferior', wrong: ['Somente retais superior e média', 'Retal inferior e sacral mediana', 'Cólica esquerda e retal inferior'], why: 'Slide 29: as três artérias retais se anastomosam.' }),
      q('30', { q: 'Which internal iliac branches are named in the pelvic arterial region beside the rectum?', correct: 'Superior and inferior vesical, obturator, superior and inferior gluteal arteries', wrong: ['Left colic and sigmoid arteries', 'Splenic and short gastric arteries', 'Hepatic and gastroduodenal arteries'], why: 'Slide 30: the internal iliac branches include the vesical, obturator, gluteal and internal pudendal arteries.' },
        { q: 'Quais ramos da ilíaca interna são citados na região arterial pélvica ao lado do reto?', correct: 'Vesicais superior e inferior, obturatriz, glúteas superior e inferior', wrong: ['Cólica esquerda e sigmoides', 'Esplênica e gástricas curtas', 'Hepática e gastroduodenal'], why: 'Slide 30: os ramos da ilíaca interna incluem as artérias vesicais, obturatriz, glúteas e pudenda interna.' }),
    ],
  },
  {
    id: 'rectum-sup3', supply: true, title: t('Territories and veins, both directions', 'Territórios e veias, nos dois sentidos'),
    cards: [
      {
        id: 'rectum-sup-territories', ref: '28–29', title: t('Who supplies what in the rectum', 'Quem irriga o quê no reto'),
        focus: ['ima', 'sma', 'celiac_trunk', 'rectum', 'external_anal_sphincter'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('The Inferior mesenteric artery supplies the transverse and descending colon, the sigmoid colon, the rectum and the anal canal. The internal iliac artery supplies the reproductive organs, and its middle and inferior rectal branches reach the lower rectum and the anal canal.',
            'A artéria mesentérica inferior irriga os colos transverso e descendente, o colo sigmoide, o reto e o canal anal. A artéria ilíaca interna irriga os órgãos reprodutores, e seus ramos retais médio e inferior alcançam a parte inferior do reto e o canal anal.'),
          t('Across the whole gut, three trunks share the territory: the celiac trunk supplies the oesophagus, stomach, duodenum, liver, spleen, gallbladder and pancreas; the superior mesenteric artery supplies the pancreas, duodenum, jejunum, ileum, caecum and the ascending and transverse colon; and the inferior mesenteric artery takes over from the transverse colon downward.',
            'Em todo o intestino, três troncos dividem o território: o tronco celíaco irriga o esôfago, estômago, duodeno, fígado, baço, vesícula biliar e pâncreas; a artéria mesentérica superior irriga o pâncreas, duodeno, jejuno, íleo, ceco e os colos ascendente e transverso; e a artéria mesentérica inferior assume a partir do colo transverso, descendo.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('Above the pectinate line, the gut blood supply comes from the superior rectal vessels, which arise from the inferior mesenteric artery. Below the line, the supply comes through the internal iliac vessels. The pectinate line therefore marks the point where the arterial source changes, which is why it is the key landmark for the rectum.',
            'Acima da linha pectínea, o suprimento sanguíneo do intestino vem dos vasos retais superiores, que nascem da artéria mesentérica inferior. Abaixo da linha, o suprimento vem pelos vasos ilíacos internos. A linha pectínea marca, portanto, o ponto em que muda a fonte arterial, e por isso é o principal marco do reto.'),
        ],
      },
      {
        id: 'rectum-sup-portosystemic', ref: '31, 36–41, 44', title: t('The rectal veins and the portosystemic routes', 'As veias retais e as vias porto-sistêmicas'),
        focus: ['imv', 'splenic_v', 'hepatic_portal_v', 'ivc_g', 'gastric_v'], view: 'ant',
        diagram: VENOUS_TREE,
        body: [
          t('Walk the venous tree from the top, one vein at a time. Start with the superior rectal vein, follow it to the portal vein, then take the middle and inferior veins to the inferior vena cava. Tap each node and say which system it belongs to.',
            'Percorra a árvore venosa de cima para baixo, uma veia por vez. Comece pela veia retal superior, siga-a até a veia porta, depois percorra as veias média e inferior até a veia cava inferior. Toque em cada nó e diga a qual sistema ele pertence.'),
          t('### Portosystemic shunts as flow reverses', '### Shunts porto-sistêmicos com a inversão do fluxo'),
          t('When the portal system is blocked, the portal vein diverts blood into its supplying veins, and the flow reverses through the systemic veins. The oesophageal veins drain through the left gastric veins to the azygos and hemiazygos veins and on to the Superior vena cava. The colic veins drain through the ascending lumbar veins to the azygos and hemiazygos, or to the inferior vena cava.',
            'Quando o sistema porta é bloqueado, a veia porta desvia o sangue para as veias que normalmente a alimentam, e o fluxo se inverte pelas veias sistêmicas. As veias esofágicas drenam pelas veias gástricas esquerdas até as veias ázigos e hemiázigos e daí à veia cava superior. As veias cólicas drenam pelas veias lombares ascendentes até as veias ázigos e hemiázigos, ou até a veia cava inferior.'),
          t('### Paraumbilical veins and caput medusae', '### Veias paraumbilicais e cabeça de medusa'),
          t('The umbilical veins were used in fetal life, and in adults they are practically closed, remaining only as remnants in the falciform and round ligaments. When pressure rises, they reopen: the portal vein gives blood to the umbilical region and then to the epigastric veins, and the dilated superficial veins around the navel are the caput medusae.',
            'As veias umbilicais foram usadas na vida fetal, e nos adultos estão praticamente fechadas, restando como remanescentes nos ligamentos falciforme e redondo. Quando a pressão sobe, elas se reabrem: a veia porta leva sangue à região umbilical e depois às veias epigástricas, e as veias superficiais dilatadas ao redor do umbigo formam a cabeça de medusa.'),
        ],
      },
      {
        id: 'rectum-sup-nerves', ref: '43', title: t('Nerves of the rectum by system', 'Nervos do reto por sistema'),
        focus: ['rectum', 'ima', 'external_anal_sphincter'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the three systems in the order of the tree. Sympathetic: lumbar splanchnic nerves, then the inferior mesenteric ganglion and plexus, the superior rectal plexus, the superior and inferior hypogastric plexuses, and the middle and inferior rectal plexuses. Parasympathetic: the pelvic splanchnic nerves, S2–S4, with no vagus. Somatic: the pudendal nerve and its inferior rectal branch, below the pectinate line.',
            'Toque nos três sistemas na ordem da árvore. Simpático: nervos esplâncnicos lombares, depois o gânglio e o plexo mesentéricos inferiores, o plexo retal superior, os plexos hipogástricos superior e inferior, e os plexos retais médio e inferior. Parassimpático: os nervos esplâncnicos pélvicos, S2–S4, sem vago. Somático: o nervo pudendo e seu ramo retal inferior, abaixo da linha pectínea.'),
        ],
      },
    ],
    questions: [
      q('28', { q: 'What blood supply lies above the pectinate line?', correct: 'Superior rectal vessels from the inferior mesenteric artery', wrong: ['Internal pudendal vessels', 'Median sacral vessels', 'Inferior rectal vessels'], why: 'Slide 28: above the line the gut blood supply is the superior rectal vessels from the IMA.' },
        { q: 'Qual suprimento sanguíneo fica acima da linha pectínea?', correct: 'Vasos retais superiores vindos da artéria mesentérica inferior', wrong: ['Vasos pudendos internos', 'Vasos sacrais medianos', 'Vasos retais inferiores'], why: 'Slide 28: acima da linha, o suprimento intestinal são os vasos retais superiores vindos da AMI.' }),
      q('28', { q: 'Through which vessels is the anal canal supplied below the pectinate line?', correct: 'Internal iliac vessels', wrong: ['Superior mesenteric vessels', 'Celiac trunk branches', 'Splenic artery and its branches'], why: 'Slide 28: below the line the blood supply comes through the internal iliac vessels.' },
        { q: 'Por meio de quais vasos o canal anal é irrigado abaixo da linha pectínea?', correct: 'Vasos ilíacos internos', wrong: ['Vasos mesentéricos superiores', 'Ramos do tronco celíaco', 'Artéria esplênica e seus ramos'], why: 'Slide 28: abaixo da linha, o suprimento vem pelos vasos ilíacos internos.' }),
      q('44', { q: 'Which rectal veins are among the sites where the flow reverses when the portal system is blocked?', correct: 'Middle and inferior rectal veins', wrong: ['Superior rectal and splenic veins', 'Internal pudendal vein only', 'Common iliac veins only'], why: 'Slide 44: the flow reverses in the oesophageal, paraumbilical, colic, and middle and inferior rectal veins.' },
        { q: 'Quais veias retais estão entre os locais onde o fluxo se inverte quando o sistema porta é bloqueado?', correct: 'Veias retais média e inferior', wrong: ['Veias retal superior e esplênica', 'Somente a veia pudenda interna', 'Somente as veias ilíacas comuns'], why: 'Slide 44: o fluxo se inverte nas veias esofágicas, paraumbilicais, cólicas e retais média e inferior.' }),
      q('39', { q: 'What are the dilated superficial veins around the navel called when the paraumbilical route reopens?', correct: 'Caput medusae', wrong: ['Varicocele', 'Pampiniform plexus', 'Haemorrhoidal plexus'], why: 'Slide 39: the paraumbilical veins reopen, and the enlarged veins around the navel are the caput medusae.' },
        { q: 'Como se chamam as veias superficiais dilatadas ao redor do umbigo quando a via paraumbilical se reabre?', correct: 'Cabeça de medusa', wrong: ['Varicocele', 'Plexo pampiniforme', 'Plexo hemorroidário'], why: 'Slide 39: as veias paraumbilicais se reabrem, e as veias aumentadas ao redor do umbigo formam a cabeça de medusa.' }),
      q('36', { q: 'Where do the oesophageal veins drain in the portosystemic route?', correct: 'The azygos and hemiazygos veins, then the superior vena cava', wrong: ['The inferior vena cava directly', 'The hepatic veins', 'The splenic vein'], why: 'Slide 36: oesophageal veins drain through the left gastric veins to the azygos and hemiazygos, then to the SVC.' },
        { q: 'Para onde drenam as veias esofágicas na via porto-sistêmica?', correct: 'Veias ázigos e hemiázigos, depois à veia cava superior', wrong: ['Diretamente à veia cava inferior', 'Às veias hepáticas', 'À veia esplênica'], why: 'Slide 36: as veias esofágicas drenam pelas veias gástricas esquerdas até as ázigos e hemiázigos, depois à VCS.' }),
      q('43', { q: 'Which ganglion do the lumbar splanchnic nerves reach on the sympathetic route to the rectum?', correct: 'Inferior mesenteric ganglion', wrong: ['Celiac ganglion', 'Superior mesenteric ganglion', 'Sacral ganglion'], why: 'Slide 43: the lumbar splanchnic nerves go to the inferior mesenteric ganglion.' },
        { q: 'Qual gânglio os nervos esplâncnicos lombares alcançam na via simpática para o reto?', correct: 'Gânglio mesentérico inferior', wrong: ['Gânglio celíaco', 'Gânglio mesentérico superior', 'Gânglio sacral'], why: 'Slide 43: os nervos esplâncnicos lombares vão ao gânglio mesentérico inferior.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
