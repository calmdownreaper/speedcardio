// SpeedGastro · Duodenum supply blocks: the pancreaticoduodenal arcades, their supply sheet,
// branching drill and venous drainage in both directions.
// Facts only from deck 08 (p24–25 two sources and arcades, p26 gastroduodenal artery,
// p27 superior pancreaticoduodenal arteries, p28 inferior pancreaticoduodenal arteries,
// p29 jejunal branch, p30 venous drainage).
// Deck 08 has no lymph section in this range, so the sheet has no lymph paragraph.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
const q = (ref, en, pt) => ({ ref, ...en, pt });

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  celiac: t('Celiac trunk', 'Tronco celíaco'),
  ch: t('Common hepatic artery', 'Artéria hepática comum'),
  gd: t('Gastroduodenal artery', 'Artéria gastroduodenal'),
  retro: t('Retroduodenal branches', 'Ramos retroduodenais'),
  psp: t('Posterior superior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal superior posterior'),
  asp: t('Anterior superior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal superior anterior'),
  sma: t('Superior mesenteric artery', 'Artéria mesentérica superior'),
  ipd: t('Inferior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal inferior'),
  ipdp: t('Posterior division of the inferior pancreaticoduodenal artery', 'Ramo posterior da artéria pancreaticoduodenal inferior'),
  ipda: t('Anterior division of the inferior pancreaticoduodenal artery', 'Ramo anterior da artéria pancreaticoduodenal inferior'),
  jej: t('First jejunal branch of the SMA', 'Primeiro ramo jejunal da AMS'),
  spd: t('Superior pancreaticoduodenal arteries', 'Artérias pancreaticoduodenais superiores'),
  vpsp: t('Posterior superior pancreaticoduodenal vein', 'Veia pancreaticoduodenal superior posterior'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  smv: t('Superior mesenteric vein', 'Veia mesentérica superior'),
  vipd: t('Inferior pancreaticoduodenal veins (anterior and posterior)', 'Veias pancreaticoduodenais inferiores (anterior e posterior)'),
};

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.celiac, note: t('first half of the duodenum', 'primeira metade do duodeno'), children: [
      { label: L.ch, children: [
        { label: L.gd, note: t('behind the 1st part', 'atrás da 1ª parte'), children: [
          { label: L.retro },
          { label: L.psp, note: t('in front of the portal vein and CBD', 'anterior à veia porta e ao colédoco') },
          { label: L.asp, note: t('in the anterior groove', 'no sulco anterior') },
        ] },
      ] },
    ] },
    { label: L.sma, note: t('second half of the duodenum', 'segunda metade do duodeno'), children: [
      { label: L.ipd, note: t('behind the uncinate process', 'atrás do processo uncinado'), children: [
        { label: L.ipdp, note: t('behind the head of the pancreas', 'atrás da cabeça do pâncreas') },
        { label: L.ipda, note: t('in front of the lower border of the head', 'anterior à borda inferior da cabeça') },
      ] },
      { label: L.jej, note: t('supplies the 4th part', 'supre a 4ª parte') },
    ] },
  ] },
  links: [
    { from: L.psp, to: L.ipdp, label: t('posterior pancreaticoduodenal arcade', 'arcada pancreaticoduodenal posterior') },
    { from: L.asp, to: L.ipda, label: t('anterior pancreaticoduodenal arcade', 'arcada pancreaticoduodenal anterior') },
  ],
};

const ARCADE_TREE = {
  root: { label: t('Pancreaticoduodenal arcades', 'Arcadas pancreaticoduodenais'), children: [
    { label: L.spd, note: t('from the gastroduodenal, celiac side', 'da gastroduodenal, lado celíaco'), children: [{ label: L.asp }, { label: L.psp }] },
    { label: L.ipd, note: t('from the SMA', 'da mesentérica superior'), children: [{ label: L.ipda }, { label: L.ipdp }] },
  ] },
  links: [
    { from: L.asp, to: L.ipda, label: t('anterior arcade', 'arcada anterior') },
    { from: L.psp, to: L.ipdp, label: t('posterior arcade', 'arcada posterior') },
  ],
};

const VEIN_TREE = {
  root: { label: L.hpv, children: [
    { label: L.vpsp, note: t('drains directly to the portal vein', 'drena diretamente à veia porta') },
    { label: L.smv, children: [{ label: L.vipd, note: t('drain through the SMV', 'drenam pela veia mesentérica superior') }] },
  ] },
  links: [],
};

const NERVE_TREE = {
  root: { label: t('Innervation of the duodenum', 'Inervação do duodeno'), children: [
    { label: t('Sympathetic', 'Simpático'), note: t('preganglionic T1–L2', 'pré-ganglionar T1–L2'), children: [
      { label: t('Greater and lesser splanchnic nerves', 'Nervos esplâncnicos maior e menor'), children: [
        { label: t('Prevertebral ganglia', 'Gânglios pré-vertebrais') } ] },
    ] },
    { label: t('Parasympathetic', 'Parassimpático'), children: [
      { label: t('Vagus branches', 'Ramos do vago'), children: [{ label: t('Intramural neurons', 'Neurônios intramurais') }] },
      { label: t('Brainstem nuclei and sacral nerves S2–S4', 'Núcleos do tronco encefálico e nervos sacrais S2–S4') },
    ] },
    { label: t('Convergence', 'Convergência'), note: t('fibres converge here', 'as fibras convergem aqui'), children: [
      { label: t('Coeliac plexus', 'Plexo celíaco') },
      { label: t('Superior mesenteric plexus', 'Plexo mesentérico superior') },
    ] },
    { label: t('Enteric nervous system', 'Sistema nervoso entérico'), children: [
      { label: t('Myenteric plexus (Auerbach)', 'Plexo mioentérico (Auerbach)') },
      { label: t('Submucosal plexus (Meissner)', 'Plexo submucoso (Meissner)') },
    ] },
  ] },
  links: [],
};

export const blocks = [
  {
    id: 'duodenum-sup1', supply: true, title: t('Supply sheet: the pancreaticoduodenal arcades', 'Ficha de suprimento: as arcadas pancreaticoduodenais'),
    cards: [
      {
        id: 'dud-sup-arteries', ref: '24–25', title: t('Two sources and two arcades', 'Duas fontes e duas arcadas'),
        focus: ['duodenum', 'pancreas', 'celiac_trunk', 'common_hepatic_a', 'gastroduodenal_a', 'sma', 'pancreaticoduodenal_a'], ghost: ['stomach', 'spleen'], view: 'ant',
        diagram: ARCADE_TREE,
        body: [
          t('### Two sources', '### Duas fontes'),
          t('The duodenum receives arterial blood from two different sources, which matches its embryonic origin. The first half comes from the foregut, so it is supplied from the celiac trunk. The second half comes from the midgut, so it is supplied from the superior mesenteric artery.',
            'O duodeno recebe sangue arterial de duas fontes diferentes, o que corresponde à sua origem embrionária. A primeira metade vem do intestino anterior e é irrigada pelo tronco celíaco. A segunda metade vem do intestino médio e é irrigada pela artéria mesentérica superior.'),
          t('### Two arcades around the pancreas', '### Duas arcadas em torno do pâncreas'),
          t('The superior pancreaticoduodenal artery, from the gastroduodenal artery, and the inferior pancreaticoduodenal artery, from the superior mesenteric artery, anastomose with each other. They form two arcades, one on the anterior face and one on the posterior face of the pancreas, inside the concavity of the duodenum. Many branches leave these arcades to supply the duodenum.',
            'A artéria pancreaticoduodenal superior, da gastroduodenal, e a artéria pancreaticoduodenal inferior, da mesentérica superior, se anastomosam entre si. Formam duas arcadas, uma na face anterior e outra na face posterior do pâncreas, dentro da concavidade do duodeno. Muitos ramos saem dessas arcadas para irrigar o duodeno.'),
          t('### The gastroduodenal artery', '### A artéria gastroduodenal'),
          t('The gastroduodenal artery arises from the common hepatic artery, behind the first part of the duodenum. As it descends it gives the superior pancreaticoduodenal artery and several retroduodenal branches, which supply the first part and the start of the second part. It then runs down on the front of the pancreas and divides into the anterior superior pancreaticoduodenal artery, the posterior superior pancreaticoduodenal artery and pancreatic branches.',
            'A artéria gastroduodenal nasce da artéria hepática comum, atrás da primeira parte do duodeno. Ao descer, dá a artéria pancreaticoduodenal superior e vários ramos retroduodenais, que irrigam a primeira parte e o início da segunda. Depois desce pela face anterior do pâncreas e se divide em artéria pancreaticoduodenal superior anterior, artéria pancreaticoduodenal superior posterior e ramos pancreáticos.'),
        ],
      },
      {
        id: 'dud-sup-superior-pd', ref: '27', title: t('The two superior pancreaticoduodenal arteries', 'As duas artérias pancreaticoduodenais superiores'),
        focus: ['pancreaticoduodenal_a', 'gastroduodenal_a', 'hepatic_portal_v'], ghost: ['duodenum', 'pancreas'], view: 'ant',
        body: [
          t('### Posterior superior', '### Posterior superior'),
          t('The posterior superior artery arises behind the upper border of the first part of the duodenum. It descends to the right, in front of the portal vein and the common bile duct, then spirals around the right side of the bile duct to run behind the head of the pancreas. There it anastomoses with the posterior division of the inferior pancreaticoduodenal artery. It supplies the first and second parts of the duodenum.',
            'A artéria posterior superior nasce atrás da borda superior da primeira parte do duodeno. Desce para a direita, anterior à veia porta e ao colédoco, depois espirala pelo lado direito do colédoco para correr atrás da cabeça do pâncreas. Ali se anastomosa com o ramo posterior da artéria pancreaticoduodenal inferior. Irriga a primeira e a segunda partes do duodeno.'),
          t('### Anterior superior', '### Anterior superior'),
          t('The anterior superior artery descends in the anterior groove between the second part of the duodenum and the head of the pancreas. It anastomoses with the anterior division of the inferior pancreaticoduodenal artery, and it also supplies the first and second parts.',
            'A artéria anterior superior desce no sulco anterior, entre a segunda parte do duodeno e a cabeça do pâncreas. Anastomosa-se com o ramo anterior da artéria pancreaticoduodenal inferior e também irriga a primeira e a segunda partes.'),
          t('⚠ Slide 27 labels the posterior superior artery as a branch of the gastroduodenal artery in its figure, but its text says it arises from the superior pancreatic artery. Both versions are recorded here, and the origin is not settled by the deck.',
            '⚠ O slide 27 indica a artéria posterior superior como ramo da gastroduodenal na figura, mas o texto diz que ela nasce da artéria pancreática superior. As duas versões são registradas aqui, e o material não resolve a origem.'),
        ],
      },
      {
        id: 'dud-sup-inferior-pd', ref: '28–29', title: t('The inferior pancreaticoduodenal artery from the SMA', 'A artéria pancreaticoduodenal inferior, da mesentérica superior'),
        focus: ['sma', 'pancreaticoduodenal_a', 'duodenum', 'pancreas'], ghost: ['jejunum', 'ileum'], view: 'ant',
        body: [
          t('The inferior pancreaticoduodenal artery arises from the superior mesenteric artery. It passes behind the uncinate process of the pancreas and divides into two. The posterior branch runs to the right behind the head of the pancreas and anastomoses with the posterior superior artery. The anterior branch passes to the right in front of the lower border of the head, then runs upward to anastomose with the anterior superior artery. Both supply the third and fourth parts of the duodenum.',
            'A artéria pancreaticoduodenal inferior nasce da artéria mesentérica superior. Passa atrás do processo uncinado do pâncreas e se divide em dois. O ramo posterior corre para a direita atrás da cabeça do pâncreas e se anastomosa com a artéria posterior superior. O ramo anterior passa para a direita à frente da borda inferior da cabeça, depois sobe para se anastomosar com a artéria anterior superior. Os dois irrigam a terceira e a quarta partes do duodeno.'),
          t('### Jejunal branch and protection from ischaemia', '### Ramo jejunal e proteção contra isquemia'),
          t('Branches from the first jejunal branch of the superior mesenteric artery supply the fourth part of the duodenum. They often anastomose with a terminal branch of the anterior superior pancreaticoduodenal artery. Because the duodenum receives blood from both the celiac trunk and the superior mesenteric artery, it is not usually affected by ischaemia.',
            'Ramos do primeiro ramo jejunal da artéria mesentérica superior irrigam a quarta parte do duodeno. Eles frequentemente se anastomosam com um ramo terminal da artéria pancreaticoduodenal superior anterior. Como o duodeno recebe sangue do tronco celíaco e da artéria mesentérica superior, ele geralmente não sofre isquemia.'),
        ],
      },
    ],
    questions: [
      q('25', { q: 'Which trunk supplies the first half of the duodenum?', correct: 'Celiac trunk, through the gastroduodenal artery', wrong: ['Superior mesenteric artery', 'Inferior mesenteric artery', 'Internal iliac artery'], why: 'Slide 25: the first half of the duodenum comes from the foregut, supplied by the celiac trunk.' },
        { q: 'Qual tronco supre a primeira metade do duodeno?', correct: 'Tronco celíaco, pela artéria gastroduodenal', wrong: ['Artéria mesentérica superior', 'Artéria mesentérica inferior', 'Artéria ilíaca interna'], why: 'Slide 25: a primeira metade do duodeno vem do intestino anterior, irrigada pelo tronco celíaco.' }),
      q('25', { q: 'Where do the two pancreaticoduodenal arcades lie in relation to the pancreas?', correct: 'One on the anterior face and one on the posterior face, in the duodenal concavity', wrong: ['Both inside the head of the pancreas', 'Both along the common bile duct', 'Both on the outer wall of the duodenum only'], why: 'Slide 25: two arcades on the anterior and posterior face of the pancreas, at the duodenal concavity.' },
        { q: 'Onde ficam as duas arcadas pancreaticoduodenais em relação ao pâncreas?', correct: 'Uma na face anterior e outra na posterior, na concavidade duodenal', wrong: ['As duas dentro da cabeça do pâncreas', 'As duas ao longo do colédoco', 'As duas somente na parede externa do duodeno'], why: 'Slide 25: duas arcadas nas faces anterior e posterior do pâncreas, na concavidade do duodeno.' }),
      q('26', { q: 'Which branches does the gastroduodenal artery give as it descends behind the duodenum?', correct: 'The superior pancreaticoduodenal artery and retroduodenal branches', wrong: ['The left gastric and splenic arteries', 'The inferior pancreaticoduodenal and jejunal arteries', 'The right gastro-omental and short gastric arteries'], why: 'Slide 26: as it descends, the gastroduodenal gives the superior pancreaticoduodenal artery and retroduodenal branches.' },
        { q: 'Quais ramos a artéria gastroduodenal dá ao descer atrás do duodeno?', correct: 'A artéria pancreaticoduodenal superior e ramos retroduodenais', wrong: ['As artérias gástrica esquerda e esplênica', 'As artérias pancreaticoduodenal inferior e jejunal', 'As artérias gastromental direita e gástricas curtas'], why: 'Slide 26: ao descer, a gastroduodenal dá a pancreaticoduodenal superior e ramos retroduodenais.' }),
      q('27', { q: 'Where does the anterior superior pancreaticoduodenal artery run?', correct: 'In the anterior groove between the second part of the duodenum and the head of the pancreas', wrong: ['Behind the uncinate process', 'Along the lesser curvature of the stomach', 'Through the posterior pancreatic groove behind the body'], why: 'Slide 27: it descends in the anterior groove between the second part of the duodenum and the head of the pancreas.' },
        { q: 'Por onde corre a artéria pancreaticoduodenal superior anterior?', correct: 'No sulco anterior, entre a segunda parte do duodeno e a cabeça do pâncreas', wrong: ['Atrás do processo uncinado', 'Ao longo da curvatura menor do estômago', 'Pelo sulco posterior atrás do corpo do pâncreas'], why: 'Slide 27: desce no sulco anterior, entre a segunda parte do duodeno e a cabeça do pâncreas.' }),
      q('28', { q: 'Behind which structure does the inferior pancreaticoduodenal artery pass before it divides?', correct: 'The uncinate process of the pancreas', wrong: ['The pylorus', 'The splenic vein', 'The common bile duct'], why: 'Slide 28: it passes behind the uncinate process of the pancreas, then divides in two.' },
        { q: 'Atrás de qual estrutura a artéria pancreaticoduodenal inferior passa antes de se dividir?', correct: 'Processo uncinado do pâncreas', wrong: ['Piloro', 'Veia esplênica', 'Colédoco'], why: 'Slide 28: passa atrás do processo uncinado do pâncreas e depois se divide em dois.' }),
      q('29', { q: 'Which branch of the superior mesenteric artery supplies the fourth part of the duodenum?', correct: 'The first jejunal branch', wrong: ['The ileocolic artery', 'The middle colic artery', 'The left colic artery'], why: 'Slide 29: branches from the first jejunal branch of the SMA supply the fourth part.' },
        { q: 'Qual ramo da mesentérica superior irriga a quarta parte do duodeno?', correct: 'O primeiro ramo jejunal', wrong: ['A artéria ileocólica', 'A artéria cólica média', 'A artéria cólica esquerda'], why: 'Slide 29: ramos do primeiro ramo jejunal da AMS irrigam a quarta parte do duodeno.' }),
    ],
  },
  {
    id: 'duodenum-sup2', supply: true, title: t('Branching: the pancreaticoduodenal arcades', 'Ramificação: as arcadas pancreaticoduodenais'),
    cards: [
      {
        id: 'dud-sup-tree', ref: '24–29', title: t('Walk the arcades from both trunks', 'Percorra as arcadas a partir dos dois troncos'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'common_hepatic_a', 'gastroduodenal_a', 'sma', 'pancreaticoduodenal_a', 'duodenum', 'pancreas'], ghost: ['stomach', 'jejunum'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud. Start with the celiac trunk, which feeds the first half of the duodenum through the gastroduodenal artery, then move to the superior mesenteric artery, which feeds the second half through the inferior pancreaticoduodenal artery. The two links mark the two arcades.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta. Comece pelo tronco celíaco, que alimenta a primeira metade do duodeno pela artéria gastroduodenal, depois passe à artéria mesentérica superior, que alimenta a segunda metade pela artéria pancreaticoduodenal inferior. Os dois elos marcam as duas arcadas.'),
          t('### Where each arcade sits', '### Onde fica cada arcada'),
          t('The posterior arcade joins the posterior superior artery with the posterior division of the inferior artery, behind the head of the pancreas. The anterior arcade joins the anterior superior artery with the anterior division of the inferior artery, in front of the lower border of the head.',
            'A arcada posterior une a artéria posterior superior ao ramo posterior da artéria inferior, atrás da cabeça do pâncreas. A arcada anterior une a artéria anterior superior ao ramo anterior da artéria inferior, à frente da borda inferior da cabeça.'),
        ],
      },
    ],
    questions: [
      q('29', { q: 'Which division of the inferior pancreaticoduodenal artery anastomoses with the anterior superior artery?', correct: 'The anterior division', wrong: ['The posterior division', 'The first jejunal branch', 'The ileal branch of the ileocolic artery'], why: 'Slide 28: the anterior inferior division runs up to anastomose with the anterior superior artery.' },
        { q: 'Qual ramo da artéria pancreaticoduodenal inferior se anastomosa com a artéria anterior superior?', correct: 'O ramo anterior', wrong: ['O ramo posterior', 'O primeiro ramo jejunal', 'O ramo ileal da artéria ileocólica'], why: 'Slide 28: o ramo anterior inferior sobe e se anastomosa com a artéria anterior superior.' }),
      q('28', { q: 'Which inferior branch runs to the right behind the head of the pancreas and joins the posterior superior artery?', correct: 'The posterior division of the inferior pancreaticoduodenal artery', wrong: ['The anterior division of the inferior pancreaticoduodenal artery', 'The ileocolic artery', 'The middle colic artery'], why: 'Slide 28: the posterior inferior branch runs right behind the head and anastomoses with the posterior superior artery.' },
        { q: 'Qual ramo inferior corre para a direita atrás da cabeça do pâncreas e se une à artéria posterior superior?', correct: 'O ramo posterior da artéria pancreaticoduodenal inferior', wrong: ['O ramo anterior da artéria pancreaticoduodenal inferior', 'A artéria ileocólica', 'A artéria cólica média'], why: 'Slide 28: o ramo posterior inferior corre para a direita atrás da cabeça e se anastomosa com a posterior superior.' }),
      q('27', { q: 'In front of which two structures does the posterior superior artery descend?', correct: 'The portal vein and the common bile duct', wrong: ['The inferior vena cava and the aorta', 'The pylorus and the splenic artery', 'The duodenojejunal flexure and the jejunum'], why: 'Slide 27: it descends to the right anterior to the portal vein and common bile duct.' },
        { q: 'À frente de quais duas estruturas desce a artéria posterior superior?', correct: 'Veia porta e colédoco', wrong: ['Veia cava inferior e aorta', 'Piloro e artéria esplênica', 'Flexura duodenojejunal e jejuno'], why: 'Slide 27: desce à direita, anterior à veia porta e ao colédoco.' }),
      q('26', { q: 'Where does the gastroduodenal artery run as it descends?', correct: 'On the front of the pancreas', wrong: ['Behind the portal vein inside the liver hilum', 'Through the uncinate process', 'Along the greater curvature of the stomach'], why: 'Slide 26: it runs down on the anterior surface of the pancreas before dividing.' },
        { q: 'Por onde desce a artéria gastroduodenal?', correct: 'Pela face anterior do pâncreas', wrong: ['Atrás da veia porta, dentro do hilo hepático', 'Através do processo uncinado', 'Ao longo da grande curvatura do estômago'], why: 'Slide 26: desce pela face anterior do pâncreas antes de se dividir.' }),
    ],
  },
  {
    id: 'duodenum-sup3', supply: true, title: t('Territories and venous drainage, both directions', 'Territórios e drenagem venosa, nos dois sentidos'),
    cards: [
      {
        id: 'dud-sup-territories', ref: '24–29', title: t('Who supplies which part of the duodenum', 'Quem irriga cada parte do duodeno'),
        focus: ['duodenum', 'celiac_trunk', 'sma', 'gastroduodenal_a', 'pancreaticoduodenal_a'], ghost: ['pancreas', 'stomach', 'jejunum'], view: 'ant',
        body: [
          t('### From artery to part', '### Da artéria à parte'),
          t('The superior pancreaticoduodenal arteries supply the first and second parts. The inferior pancreaticoduodenal arteries supply the third and fourth parts. The first jejunal branch of the superior mesenteric artery supplies the fourth part as well, and it often anastomoses with a terminal branch of the anterior superior artery.',
            'As artérias pancreaticoduodenais superiores irrigam a primeira e a segunda partes. As artérias pancreaticoduodenais inferiores irrigam a terceira e a quarta partes. O primeiro ramo jejunal da artéria mesentérica superior também irriga a quarta parte, e frequentemente se anastomosa com um ramo terminal da artéria anterior superior.'),
          t('### From part to artery', '### Da parte à artéria'),
          t('Turn it around when you revise. First part and start of the second: superior pancreaticoduodenal arteries and retroduodenal branches of the gastroduodenal. Third and fourth parts: inferior pancreaticoduodenal arteries, and the fourth part also receives the first jejunal branch. Because both trunks reach the duodenum, the organ is rarely affected by ischaemia.',
            'Inverta ao revisar. Primeira parte e início da segunda: artérias pancreaticoduodenais superiores e ramos retroduodenais da gastroduodenal. Terceira e quarta partes: artérias pancreaticoduodenais inferiores, e a quarta parte também recebe o primeiro ramo jejunal. Como os dois troncos chegam ao duodeno, o órgão raramente sofre isquemia.'),
        ],
      },
      {
        id: 'dud-sup-vein-tree', ref: '30', title: t('Venous drainage of the duodenum', 'Drenagem venosa do duodeno'),
        focus: ['hepatic_portal_v', 'smv', 'duodenum', 'pancreas'], ghost: ['stomach', 'jejunum'], view: 'ant',
        diagram: VEIN_TREE,
        body: [
          t('The pancreaticoduodenal veins run alongside the arteries, with anterior and posterior, superior and inferior branches. Tap the tree from the top: the posterior superior vein drains directly into the portal vein, while the inferior veins drain through the superior mesenteric vein, which then joins the portal vein.',
            'As veias pancreaticoduodenais acompanham as artérias, com ramos anterior e posterior, superior e inferior. Toque a árvore de cima para baixo: a veia posterior superior drena diretamente para a veia porta, enquanto as veias inferiores drenam pela veia mesentérica superior, que então se une à veia porta.'),
        ],
      },
      {
        id: 'dud-sup-nerves', ref: '31–40', title: t('Innervation of the duodenum', 'Inervação do duodeno'),
        focus: ['duodenum', 'stomach'], ghost: ['pancreas'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('The duodenum has both sympathetic and parasympathetic supply. The sympathetic fibres come through the greater and lesser splanchnic nerves, and the parasympathetic fibres are branches of the vagus. Both converge in the coeliac plexus and the superior mesenteric plexus.',
            'O duodeno tem suprimento simpático e parassimpático. As fibras simpáticas vêm pelos nervos esplâncnicos maior e menor, e as parassimpáticas são ramos do vago. Ambas convergem no plexo celíaco e no plexo mesentérico superior.'),
          t('Sympathetic preganglionic neurons lie in the lateral horn, from T1 to L2. They synapse in the paravertebral ganglia, with grey rami returning to the spinal nerves, in the prevertebral ganglia along the arterial plexuses to the gut, and in the adrenal medulla. The parasympathetic supply comes from brainstem nuclei and from S2 to S4, and the vagus synapses on intramural neurons.',
            'Os neurônios pré-ganglionares simpáticos ficam na coluna lateral, de T1 a L2. Sinapsam nos gânglios paravertebrais, com ramos comunicantes cinzentos que voltam aos nervos espinhais, nos gânglios pré-vertebrais ao longo dos plexos arteriais do intestino, e na medula da suprarrenal. O suprimento parassimpático vem de núcleos do tronco encefálico e de S2 a S4, e o vago faz sinapse em neurônios intramurais.'),
          t('The enteric nervous system lies in the gut wall. Its two plexuses are the myenteric plexus (Auerbach), between the two smooth-muscle layers, and the submucosal plexus (Meissner), in the submucosa. It controls enteric motility, secretion and local intestinal blood flow, and the autonomic nerves modulate it.',
            'O sistema nervoso entérico fica na parede do intestino. Seus dois plexos são o mioentérico (Auerbach), entre as duas camadas de músculo liso, e o submucoso (Meissner), na submucosa. Controla a motilidade, a secreção e o fluxo sanguíneo local intestinal, e os nervos autônomos o modulam.'),
        ],
      },
    ],
    questions: [
      q('30', { q: 'Which pancreaticoduodenal vein drains directly into the portal vein?', correct: 'The posterior superior vein', wrong: ['The inferior veins', 'The superior mesenteric vein itself', 'The splenic vein'], why: 'Slide 30: the posterior superior vein drains directly to the portal vein, while the inferior veins go through the SMV.' },
        { q: 'Qual veia pancreaticoduodenal drena diretamente para a veia porta?', correct: 'A veia posterior superior', wrong: ['As veias inferiores', 'A própria veia mesentérica superior', 'A veia esplênica'], why: 'Slide 30: a veia posterior superior drena diretamente à veia porta, e as inferiores passam pela VMS.' }),
      q('29', { q: 'Why is the duodenum rarely affected by ischaemia?', correct: 'It receives blood from both the celiac trunk and the superior mesenteric artery', wrong: ['It has no arterial supply of its own', 'Its only supply is the inferior mesenteric artery', 'It is supplied by the internal iliac artery'], why: 'Slide 29: receiving blood from both the celiac trunk and the SMA, the duodenum is not usually affected by ischaemia.' },
        { q: 'Por que o duodeno raramente sofre isquemia?', correct: 'Recebe sangue do tronco celíaco e da artéria mesentérica superior', wrong: ['Não tem suprimento arterial próprio', 'Seu único suprimento é a artéria mesentérica inferior', 'É irrigado pela artéria ilíaca interna'], why: 'Slide 29: por receber sangue do tronco celíaco e da AMS, o duodeno não costuma sofrer isquemia.' }),
      q('24', { q: 'Which embryonic gut region gives the second half of the duodenum?', correct: 'The midgut', wrong: ['The foregut', 'The hindgut', 'The ventral mesogastrium'], why: 'Slide 25: the second half of the duodenum comes from the midgut, which is supplied by the SMA.' },
        { q: 'Qual região embrionária do intestino dá a segunda metade do duodeno?', correct: 'O intestino médio', wrong: ['O intestino anterior', 'O intestino posterior', 'O mesogástrio ventral'], why: 'Slide 25: a segunda metade do duodeno vem do intestino médio, irrigado pela AMS.' }),
      q('28', { q: 'Which two parts of the duodenum does the superior pancreaticoduodenal arcade system supply?', correct: 'The first and second parts', wrong: ['The third and fourth parts', 'The fourth part alone', 'The jejunum and ileum'], why: 'Slide 27: the superior pancreaticoduodenal arteries supply the first and second parts.' },
        { q: 'Quais duas partes do duodeno o sistema pancreaticoduodenal superior irriga?', correct: 'A primeira e a segunda partes', wrong: ['A terceira e a quarta partes', 'Somente a quarta parte', 'Jejuno e íleo'], why: 'Slide 27: as artérias pancreaticoduodenais superiores irrigam a primeira e a segunda partes.' }),
      q('31–40', { q: 'Where do the sympathetic preganglionic neurons for the duodenum lie?', correct: 'In the lateral horn, from T1 to L2', wrong: ['In the anterior horn, from S2 to S4', 'In the dorsal root ganglia, from L4 to S1', 'In the ventral horn, from T10 to T12'], why: 'Slides 31–40: sympathetic preganglionic neurons are in the lateral horn T1–L2.' },
        { q: 'Onde ficam os neurônios pré-ganglionares simpáticos do duodeno?', correct: 'Na coluna lateral, de T1 a L2', wrong: ['No corno anterior, de S2 a S4', 'Nos gânglios da raiz dorsal, de L4 a S1', 'No corno ventral, de T10 a T12'], why: 'Slides 31–40: os neurônios pré-ganglionares simpáticos ficam na coluna lateral, T1–L2.' }),
      q('31–40', { q: 'In which two plexuses do the sympathetic and parasympathetic fibres converge?', correct: 'The coeliac plexus and the superior mesenteric plexus', wrong: ['The hypogastric and pelvic plexuses', 'The cardiac and pulmonary plexuses', 'The pharyngeal and laryngeal plexuses'], why: 'Slides 31–40: both systems converge in the coeliac and superior mesenteric plexuses.' },
        { q: 'Em quais dois plexos convergem as fibras simpáticas e parassimpáticas?', correct: 'Plexo celíaco e plexo mesentérico superior', wrong: ['Plexos hipogástrico e pélvico', 'Plexos cardíaco e pulmonar', 'Plexos faríngeo e laríngeo'], why: 'Slides 31–40: os dois sistemas convergem nos plexos celíaco e mesentérico superior.' }),
      q('31–40', { q: 'Which enteric plexus lies between the two smooth-muscle layers of the gut wall?', correct: 'The myenteric plexus (Auerbach)', wrong: ['The submucosal plexus (Meissner)', 'The coeliac plexus', 'The hypogastric plexus'], why: 'Slides 31–40: the myenteric plexus (Auerbach) lies between the two smooth-muscle layers.' },
        { q: 'Qual plexo entérico fica entre as duas camadas de músculo liso da parede?', correct: 'O plexo mioentérico (Auerbach)', wrong: ['O plexo submucoso (Meissner)', 'O plexo celíaco', 'O plexo hipogástrico'], why: 'Slides 31–40: o plexo mioentérico (Auerbach) fica entre as duas camadas de músculo liso.' }),
      q('31–40', { q: 'What does the enteric nervous system control in the intestine?', correct: 'Motility, secretion and local intestinal blood flow', wrong: ['Heart rate and bronchial calibre', 'Sweating of the skin only', 'Growth of the vertebral bodies'], why: 'Slides 31–40: the ENS controls enteric motility, secretion and local intestinal blood flow.' },
        { q: 'O que o sistema nervoso entérico controla no intestino?', correct: 'Motilidade, secreção e fluxo sanguíneo local intestinal', wrong: ['Frequência cardíaca e calibre brônquico', 'Apenas a sudorese da pele', 'Crescimento dos corpos vertebrais'], why: 'Slides 31–40: o SNE controla a motilidade, a secreção e o fluxo sanguíneo local intestinal.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
