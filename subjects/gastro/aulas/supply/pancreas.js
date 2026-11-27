// SpeedGastro · Pancreas and spleen supply blocks: vessels, lymph and nerves.
// Facts only from deck 12_pancreas_spleen: p21–24 (pancreatic arteries and veins),
// p25 and p30 (innervation and control), p45–56 (ligament contents), p57–59 (splenic
// vessels, the spleen's functions) and p61–66 (white pulp, lymphatic tissue).
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
const q = (ref, en, pt) => ({ ref, ...en, pt });

const L = {
  root: t('Arteries of the pancreas', 'Artérias do pâncreas'),
  gda: t('Gastroduodenal artery', 'Artéria gastroduodenal'),
  spda: t('Superior pancreaticoduodenal arteries', 'Artérias pancreaticoduodenais superiores'),
  sma: t('Superior mesenteric artery', 'Artéria mesentérica superior'),
  ipda: t('Inferior pancreaticoduodenal arteries', 'Artérias pancreaticoduodenais inferiores'),
  spl: t('Splenic artery', 'Artéria esplênica'),
  dpa: t('Dorsal pancreatic artery', 'Artéria pancreática dorsal'),
  unc: t('Right branch, to the uncinate process', 'Ramo direito, para o processo uncinado'),
  ipa: t('Inferior pancreatic artery', 'Artéria pancreática inferior'),
  gpa: t('Greater pancreatic artery', 'Artéria pancreática magna'),
  tail: t('Artery to the tail', 'Artéria da cauda do pâncreas'),
  arcade: t('pancreaticoduodenal arcade', 'arcada pancreaticoduodenal'),
  ant: t('anterior superior pancreaticoduodenal arcade', 'arcada pancreaticoduodenal superior anterior'),
  anastomosis: t('anastomosis', 'anastomose'),
  pv: t('Portal vein', 'Veia porta'),
  splv: t('Splenic vein', 'Veia esplênica'),
  pancv: t('Pancreatic veins and great pancreatic vein', 'Veias pancreáticas e veia pancreática magna'),
  smv: t('Superior mesenteric vein', 'Veia mesentérica superior'),
  ipdv: t('Inferior pancreaticoduodenal veins (two)', 'Veias pancreaticoduodenais inferiores (duas)'),
  aspdv: t('Anterior superior pancreaticoduodenal vein', 'Veia pancreaticoduodenal superior anterior'),
  pspdv: t('Posterior superior pancreaticoduodenal vein', 'Veia pancreaticoduodenal superior posterior'),
  join: t('joins to form the portal vein', 'une-se para formar a veia porta'),
  sympa: t('Sympathetic', 'Simpático'),
  t58: t('T5–T8 (Moore: T6–T9)', 'T5–T8 (Moore: T6–T9)'),
  cg: t('Coeliac ganglion', 'Gânglio celíaco'),
  para: t('Parasympathetic', 'Parassimpático'),
  vagus: t('Vagus nerve', 'Nervo vago'),
  acinar: t('Acinar cells: enzyme secretion', 'Células acinares: secreção de enzimas'),
  duct: t('Ductal and centroacinar cells: bicarbonate and water', 'Células ductais e centroacinares: bicarbonato e água'),
  vaso: t('Vasomotor endings at the islets', 'Terminações vasomotoras nas ilhotas'),
};

const ARTERY_TREE = {
  root: { label: L.root, children: [
    { label: L.gda, children: [{ label: L.spda, note: t('anterior and posterior', 'anterior e posterior') }] },
    { label: L.sma, children: [{ label: L.ipda, note: t('anterior and posterior', 'anterior e posterior') }] },
    { label: L.spl, note: t('very tortuous', 'muito tortuosa'), children: [
      { label: L.dpa, note: t('divides in two', 'divide-se em dois'), children: [{ label: L.unc }, { label: L.ipa, note: t('the bigger branch, to the tail', 'o ramo maior, para a cauda') }] },
      { label: L.gpa },
      { label: L.tail },
    ] },
  ] },
  links: [
    { from: L.spda, to: L.ipda, label: L.arcade },
    { from: L.unc, to: L.spda, label: L.ant },
    { from: L.gpa, to: L.ipa, label: L.anastomosis },
    { from: L.tail, to: L.ipa, label: L.anastomosis },
  ],
};

const VENOUS_TREE = {
  root: { label: L.pv, children: [
    { label: L.splv, note: t('below the splenic artery', 'abaixo da artéria esplênica'), children: [{ label: L.pancv, note: t('body and tail', 'corpo e cauda') }] },
    { label: L.smv, children: [{ label: L.ipdv }, { label: L.aspdv }] },
    { label: L.pspdv },
  ] },
  links: [
    { from: L.splv, to: L.smv, label: L.join },
  ],
};

const NERVE_TREE = {
  root: { label: t('Nerves of the pancreas', 'Nervos do pâncreas'), children: [
    { label: L.sympa, children: [{ label: L.t58, children: [{ label: L.cg }] }, { label: L.vaso }] },
    { label: L.para, children: [{ label: L.vagus, children: [{ label: L.acinar }, { label: L.duct }] }] },
  ] },
};

export const blocks = [
  {
    id: 'pancreas-sup1', supply: true, title: t('Supply sheet: arteries, veins, lymph and nerves', 'Ficha de suprimento: artérias, veias, linfa e nervos'),
    cards: [
      {
        id: 'pancreas-sup-arteries', ref: '21–22', title: t('The pancreatic arteries at a glance', 'As artérias do pâncreas num relance'),
        focus: ['gastroduodenal_a', 'sma', 'splenic_a', 'pancreaticoduodenal_a'], view: 'ant',
        body: [
          t('### Head: two arcades', '### Cabeça: duas arcadas'),
          t('The head is fed by a double arcade of pancreaticoduodenal arteries. The superior pair (anterior and posterior) comes from the Gastroduodenal artery. The inferior pair (anterior and posterior) comes from the Superior mesenteric artery.',
            'A cabeça é suprida por uma arcada dupla de artérias pancreaticoduodenais. O par superior (anterior e posterior) vem da artéria gastroduodenal. O par inferior (anterior e posterior) vem da artéria mesentérica superior.'),
          t('### Body and tail: the splenic artery', '### Corpo e cauda: a artéria esplênica'),
          t('The body and tail are fed by the Splenic artery, which is very tortuous. Its pancreatic branches include the dorsal pancreatic artery, which divides in two, the greater pancreatic artery and the artery to the tail. The left branch of the dorsal artery is the larger one, the inferior pancreatic artery, which runs to the tail.',
            'O corpo e a cauda são supridos pela artéria esplênica, que é muito tortuosa. Seus ramos pancreáticos incluem a artéria pancreática dorsal, que se divide em dois, a artéria pancreática magna e a artéria da cauda. O ramo esquerdo da dorsal é o maior, a artéria pancreática inferior, que segue até a cauda.'),
          t('### Where they link', '### Onde se ligam'),
          t('The greater pancreatic artery and the artery to the tail each anastomose with the inferior pancreatic artery. On the head side, the right branch of the dorsal artery reaches the uncinate process and anastomoses with the anterior superior pancreaticoduodenal arcade.',
            'A artéria pancreática magna e a artéria da cauda se anastomosam, cada uma, com a artéria pancreática inferior. Do lado da cabeça, o ramo direito da artéria dorsal alcança o processo uncinado e se anastomosa com a arcada pancreaticoduodenal superior anterior.'),
        ],
      },
      {
        id: 'pancreas-sup-veins', ref: '23–24, 58', title: t('The pancreatic and splenic veins at a glance', 'As veias do pâncreas e do baço num relance'),
        focus: ['splenic_v', 'smv', 'hepatic_portal_v'], view: 'ant',
        body: [
          t('### Body and tail: to the splenic vein', '### Corpo e cauda: para a veia esplênica'),
          t('The body and tail drain mainly into the Splenic vein, through the pancreatic veins and the great pancreatic vein. The splenic vein runs medially below the splenic artery and behind the tail and body of the pancreas. It then joins the Superior mesenteric vein to form the Portal vein.',
            'O corpo e a cauda drenam principalmente para a veia esplênica, pelas veias pancreáticas e pela veia pancreática magna. A veia esplênica segue medialmente, abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas. Depois se une à veia mesentérica superior para formar a veia porta.'),
          t('### Head: two routes', '### Cabeça: duas vias'),
          t('The head drains through two routes. Two inferior pancreaticoduodenal veins and the anterior superior pancreaticoduodenal vein drain into the Superior mesenteric vein. The posterior superior pancreaticoduodenal vein drains directly into the Portal vein.',
            'A cabeça drena por duas vias. Duas veias pancreaticoduodenais inferiores e a veia pancreaticoduodenal superior anterior drenam para a veia mesentérica superior. A veia pancreaticoduodenal superior posterior drena diretamente para a veia porta.'),
          t('### Innervation in one line', '### Inervação em uma linha'),
          t('Sympathetic fibres come from T5–T8 (Moore: T6–T9) through the coeliac ganglion, and the parasympathetic supply is the vagus nerve.',
            'As fibras simpáticas vêm de T5–T8 (Moore: T6–T9) pelo gânglio celíaco, e o suprimento parassimpático é o nervo vago.'),
        ],
      },
      {
        id: 'pancreas-sup-spleen-lymph', ref: '41, 57–59, 61–62', title: t('Spleen vessels and lymph at a glance', 'Vasos e linfa do baço num relance'),
        focus: ['spleen', 'splenic_a', 'splenic_v'], view: 'ant',
        body: [
          t('### Arteries of the spleen', '### Artérias do baço'),
          t('The Splenic artery divides into two or three branches before it enters the hilum. These divide into four or five segmental arteries, and there is no collateral circulation between segments. The superior pole receives extra supply from the short gastric arteries.',
            'A artéria esplênica se divide em dois ou três ramos antes de entrar no hilo. Estes se dividem em quatro ou cinco artérias segmentares, e não há circulação colateral entre os segmentos. O polo superior recebe suprimento extra das artérias gástricas curtas.'),
          t('### Veins of the spleen', '### Veias do baço'),
          t('Segmental veins join into two lobar veins (superior and inferior) or three (superior, middle and inferior). These leave the hilum and form the Splenic vein.',
            'As veias segmentares se unem em duas veias lobares (superior e inferior) ou em três (superior, média e inferior). Estas saem do hilo e formam a veia esplênica.'),
          t('### Lymph', '### Linfa'),
          t('The spleen is a secondary lymphatic organ. Its white pulp is the lymphoid part, with a periarteriolar sheath of T lymphocytes around the central artery and follicles of B lymphocytes. No lymph nodes of the pancreas are named.',
            'O baço é um órgão linfático secundário. Sua polpa branca é a parte linfoide, com uma bainha periarteriolar de linfócitos T em torno da artéria central e folículos de linfócitos B. Nenhum linfonodo do pâncreas é nomeado.'),
        ],
      },
    ],
    questions: [
      q('21', { q: 'Which two arteries supply the superior pancreaticoduodenal arcade of the head?', correct: 'Gastroduodenal artery and its branches', wrong: ['Superior mesenteric artery and splenic artery', 'Splenic artery and short gastric arteries', 'Left gastric artery and common hepatic artery'], why: 'The superior pancreaticoduodenal arteries come from the gastroduodenal artery.' },
        { q: 'Quais artérias irrigam a arcada pancreaticoduodenal superior da cabeça?', correct: 'Artéria gastroduodenal e seus ramos', wrong: ['Artéria mesentérica superior e artéria esplênica', 'Artéria esplênica e artérias gástricas curtas', 'Artéria gástrica esquerda e artéria hepática comum'], why: 'As pancreaticoduodenais superiores vêm da artéria gastroduodenal.' }),
      q('21', { q: 'From which artery do the inferior pancreaticoduodenal arteries of the head arise?', correct: 'Superior mesenteric artery', wrong: ['Gastroduodenal artery', 'Splenic artery', 'Common hepatic artery'], why: 'The inferior pancreaticoduodenal arteries come from the SMA.' },
        { q: 'De qual artéria nascem as pancreaticoduodenais inferiores da cabeça?', correct: 'Artéria mesentérica superior', wrong: ['Artéria gastroduodenal', 'Artéria esplênica', 'Artéria hepática comum'], why: 'As pancreaticoduodenais inferiores vêm da AMS.' }),
      q('22', { q: 'Which pancreatic artery is the larger branch of the dorsal pancreatic artery and runs to the tail?', correct: 'Inferior pancreatic artery', wrong: ['Greater pancreatic artery', 'Artery to the tail, the right branch', 'Supraduodenal artery'], why: 'The left branch of the dorsal pancreatic artery is the bigger one, the inferior pancreatic artery, running to the tail.' },
        { q: 'Qual artéria pancreática, ramo maior da artéria dorsal, segue até a cauda?', correct: 'Artéria pancreática inferior', wrong: ['Artéria pancreática magna', 'Artéria da cauda, ramo direito', 'Artéria supraduodenal'], why: 'O ramo esquerdo da dorsal é o maior, a artéria pancreática inferior, que vai até a cauda.' }),
      q('23', { q: 'Into which vein do the body and tail of the pancreas drain mainly?', correct: 'Splenic vein', wrong: ['Superior mesenteric vein', 'Inferior vena cava', 'Left renal vein'], why: 'The body and tail drain mainly into the splenic vein, through the pancreatic veins and the great pancreatic vein.' },
        { q: 'Em qual veia drenam principalmente o corpo e a cauda do pâncreas?', correct: 'Veia esplênica', wrong: ['Veia mesentérica superior', 'Veia cava inferior', 'Veia renal esquerda'], why: 'O corpo e a cauda drenam principalmente para a veia esplênica.' }),
      q('24', { q: 'Which head vein drains directly into the portal vein?', correct: 'Posterior superior pancreaticoduodenal vein', wrong: ['Anterior superior pancreaticoduodenal vein', 'Inferior pancreaticoduodenal veins', 'Great pancreatic vein'], why: 'The posterior superior pancreaticoduodenal vein drains into the portal vein; the others drain into the SMV.' },
        { q: 'Qual veia da cabeça drena diretamente na veia porta?', correct: 'Veia pancreaticoduodenal superior posterior', wrong: ['Veia pancreaticoduodenal superior anterior', 'Veias pancreaticoduodenais inferiores', 'Veia pancreática magna'], why: 'A pancreaticoduodenal superior posterior drena na veia porta; as outras drenam na AMS.' }),
      q('58', { q: 'Where does the splenic vein run in relation to the splenic artery?', correct: 'Below the splenic artery', wrong: ['Above the splenic artery', 'In front of the splenic artery and the stomach', 'Inside the splenic artery sheath'], why: 'The splenic vein runs medially below the splenic artery and behind the tail and body of the pancreas.' },
        { q: 'Em que posição a veia esplênica segue em relação à artéria esplênica?', correct: 'Abaixo da artéria esplênica', wrong: ['Acima da artéria esplênica', 'Na frente da artéria esplênica e do estômago', 'Dentro da bainha da artéria esplênica'], why: 'A veia esplênica segue medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas.' }),
    ],
  },
  {
    id: 'pancreas-sup2', supply: true, title: t('Branching: the pancreatic and splenic arteries', 'Ramificação: as artérias do pâncreas e do baço'),
    cards: [
      {
        id: 'pancreas-sup-tree', ref: '21–22', title: t('Walk the pancreatic arteries', 'Percorra as artérias do pâncreas'),
        focus: ['gastroduodenal_a', 'sma', 'splenic_a', 'pancreaticoduodenal_a', 'pancreas'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Start with the Gastroduodenal artery and the Superior mesenteric artery, which feed the two pancreaticoduodenal arcades of the head. Then follow the Splenic artery and its dorsal branch down to the tail. Tap each node, name it, and then reveal the four anastomoses.',
            'Leia a árvore de cima para baixo. Comece pela artéria gastroduodenal e pela artéria mesentérica superior, que alimentam as duas arcadas pancreaticoduodenais da cabeça. Depois siga a artéria esplênica e seu ramo dorsal até a cauda. Toque em cada nó, nomeie-o, e então revele as quatro anastomoses.'),
          t('### The head: two arcades', '### A cabeça: duas arcadas'),
          t('The superior arcade comes from the Gastroduodenal artery and the inferior arcade from the Superior mesenteric artery. Each arcade is paired, anterior and posterior, so the head is covered on both faces.',
            'A arcada superior vem da artéria gastroduodenal e a inferior da artéria mesentérica superior. Cada arcada é pareada, anterior e posterior, de modo que a cabeça é coberta nas duas faces.'),
          t('### The body and tail: the splenic branches', '### O corpo e a cauda: os ramos esplênicos'),
          t('The Splenic artery is very tortuous. Its dorsal pancreatic artery runs downward and splits. The right branch goes toward the uncinate process, and the left branch is the bigger inferior pancreatic artery, which runs to the tail. The greater pancreatic artery and the artery to the tail anastomose with the inferior pancreatic artery.',
            'A artéria esplênica é muito tortuosa. Sua artéria pancreática dorsal desce e se divide. O ramo direito vai para o processo uncinado, e o esquerdo é a artéria pancreática inferior, maior, que segue até a cauda. A artéria pancreática magna e a artéria da cauda se anastomosam com a artéria pancreática inferior.'),
        ],
      },
      {
        id: 'pancreas-sup-splenic-branches', ref: '57–58', title: t('The splenic artery and its segmental branches', 'A artéria esplênica e seus ramos segmentares'),
        focus: ['splenic_a', 'spleen', 'splenic_v'], view: 'ant',
        body: [
          t('### From the hilum to the segments', '### Do hilo aos segmentos'),
          t('The splenic artery breaks into two or three branches before the hilum, and these become four or five segmental arteries. Each segment is a separate territory, because there is no collateral circulation between them.',
            'A artéria esplênica se divide em dois ou três ramos antes do hilo, e estes se tornam quatro ou cinco artérias segmentares. Cada segmento é um território separado, porque não há circulação colateral entre eles.'),
          t('### Inside the spleen', '### Dentro do baço'),
          t('The segmental arteries continue as trabecular arteries and then as follicular arteries. The superior pole also gets blood from the short gastric arteries, which run in the gastrosplenic ligament.',
            'As artérias segmentares continuam como artérias trabeculares e depois como artérias foliculares. O polo superior também recebe sangue das artérias gástricas curtas, que correm no ligamento gastroesplênico.'),
        ],
      },
    ],
    questions: [
      q('21', { q: 'Which artery is the source of the superior pancreaticoduodenal arcade?', correct: 'Gastroduodenal artery', wrong: ['Splenic artery', 'Superior mesenteric artery', 'Inferior mesenteric artery'], why: 'The superior pancreaticoduodenal arcade comes from the gastroduodenal artery.' },
        { q: 'Qual artéria é a origem da arcada pancreaticoduodenal superior?', correct: 'Artéria gastroduodenal', wrong: ['Artéria esplênica', 'Artéria mesentérica superior', 'Artéria mesentérica inferior'], why: 'A arcada pancreaticoduodenal superior vem da artéria gastroduodenal.' }),
      q('22', { q: 'Through which branch of the dorsal pancreatic artery is the uncinate process reached?', correct: 'The right branch of the dorsal pancreatic artery', wrong: ['The greater pancreatic artery', 'The artery to the tail', 'The supraduodenal artery'], why: 'The right branch of the dorsal pancreatic artery goes to the uncinate process.' },
        { q: 'Qual ramo leva a artéria dorsal ao processo uncinado?', correct: 'O ramo direito da artéria pancreática dorsal', wrong: ['A artéria pancreática magna', 'A artéria da cauda', 'A artéria supraduodenal'], why: 'O ramo direito da artéria pancreática dorsal vai ao processo uncinado.' }),
      q('57', { q: 'Into how many segmental arteries does the splenic artery branch end up?', correct: 'Four or five', wrong: ['One or two', 'Eight to ten', 'Two or three'], why: 'The branches divide into 4–5 segmental arteries, with no collateral circulation between them.' },
        { q: 'Em quantas artérias segmentares a artéria esplênica se divide antes dos segmentos do baço?', correct: 'Quatro ou cinco', wrong: ['Uma ou duas', 'Oito a dez', 'Duas ou três'], why: 'Os ramos se dividem em 4–5 artérias segmentares, sem circulação colateral entre elas.' }),
      q('57', { q: 'Why do the segmental arteries of the spleen have no collateral circulation between them?', correct: 'Each segment is a separate arterial territory', wrong: ['They all drain into one lymph node', 'The short gastric arteries join them', 'They share one trabecular artery'], why: 'There is no collateral circulation between the segments.' },
        { q: 'Por que as artérias segmentares do baço não têm circulação colateral entre si?', correct: 'Cada segmento é um território arterial separado', wrong: ['Todas drenam para um mesmo linfonodo', 'As artérias gástricas curtas as unem', 'Compartilham uma única artéria trabecular'], why: 'Não há circulação colateral entre os segmentos.' }),
      q('58', { q: 'What does the superior pole of the spleen receive as extra supply?', correct: 'Short gastric arteries from the gastrosplenic ligament', wrong: ['The great pancreatic artery', 'The posterior superior pancreaticoduodenal artery', 'The inferior mesenteric artery directly'], why: 'The superior pole gets extra supply from the short gastric arteries in the gastrosplenic ligament.' },
        { q: 'O que o polo superior do baço recebe como suprimento extra?', correct: 'Artérias gástricas curtas do ligamento gastroesplênico', wrong: ['A artéria pancreática magna', 'A artéria pancreaticoduodenal superior posterior', 'A artéria mesentérica inferior diretamente'], why: 'O polo superior recebe suprimento extra das artérias gástricas curtas no ligamento gastroesplênico.' }),
    ],
  },
  {
    id: 'pancreas-sup3', supply: true, title: t('Territories, veins and ligament contents, both directions', 'Territórios, veias e conteúdo dos ligamentos, nos dois sentidos'),
    cards: [
      {
        id: 'pancreas-sup-territories', ref: '21–22, 57', title: t('Who supplies what in the pancreas and spleen', 'Quem irriga o quê no pâncreas e no baço'),
        focus: ['gastroduodenal_a', 'sma', 'splenic_a', 'pancreaticoduodenal_a', 'pancreas', 'spleen'], view: 'ant',
        body: [
          t('### From artery to territory', '### Da artéria ao território'),
          t('The Gastroduodenal artery and the Superior mesenteric artery supply the head of the pancreas through the pancreaticoduodenal arcades. The Splenic artery supplies the body and tail of the pancreas, and its segmental branches supply the spleen. The short gastric arteries add supply to the superior pole of the spleen.',
            'A artéria gastroduodenal e a artéria mesentérica superior irrigam a cabeça do pâncreas pelas arcadas pancreaticoduodenais. A artéria esplênica irriga o corpo e a cauda do pâncreas, e seus ramos segmentares irrigam o baço. As artérias gástricas curtas acrescentam suprimento ao polo superior do baço.'),
          t('### From territory to artery', '### Do território à artéria'),
          t('The head is fed from both sides, by the Gastroduodenal artery above and the Superior mesenteric artery below. The uncinate process is reached by the right branch of the dorsal pancreatic artery. The tail is reached by the inferior pancreatic artery, and the spleen by the segmental arteries of the Splenic artery.',
            'A cabeça é alimentada pelos dois lados, pela artéria gastroduodenal acima e pela artéria mesentérica superior abaixo. O processo uncinado é alcançado pelo ramo direito da artéria pancreática dorsal. A cauda é alcançada pela artéria pancreática inferior, e o baço, pelas artérias segmentares da artéria esplênica.'),
        ],
      },
      {
        id: 'pancreas-sup-ligament-contents', ref: '45–56', title: t('What the splenic ligaments carry', 'O que os ligamentos esplênicos carregam'),
        focus: ['spleen', 'pancreas', 'stomach'], view: 'ant',
        body: [
          t('### Ligaments with vessels', '### Ligamentos com vasos'),
          t('The gastrosplenic ligament carries the short gastric vessels to the fundus and the left gastro-omental vessels. The splenorenal ligament contains the terminal part of the splenic vessels and the tail of the pancreas. The splenic vessels therefore reach the spleen through this ligament.',
            'O ligamento gastroesplênico leva os vasos gástricos curtos ao fundo e os vasos gastromentais esquerdos. O ligamento esplenorrenal contém a parte terminal dos vasos esplênicos e a cauda do pâncreas. Os vasos esplênicos chegam ao baço, portanto, por esse ligamento.'),
          t('### Ligaments without vessels', '### Ligamentos sem vasos'),
          t('The splenocolic ligament is avascular, and the pancreaticosplenic ligament is usually thin, cord-like and avascular. It is present only when the tail of the pancreas does not touch the spleen. The splenophrenic ligament usually has no vessels.',
            'O ligamento esplenocólico é avascular, e o ligamento pancreaticoesplênico costuma ser fino, em forma de cordão, e também avascular. Ele existe apenas quando a cauda do pâncreas não toca o baço. O ligamento esplenofrênico geralmente não tem vasos.'),
        ],
      },
      {
        id: 'pancreas-sup-portal', ref: '23–24', title: t('The venous drainage: the portal vein and its tributaries', 'A drenagem venosa: a veia porta e seus afluentes'),
        focus: ['splenic_v', 'smv', 'hepatic_portal_v'], view: 'ant',
        diagram: VENOUS_TREE,
        body: [
          t('### Walk the venous tree', '### Percorra a árvore venosa'),
          t('Start at the Portal vein at the root. The Splenic vein, which carries the pancreatic veins and the great pancreatic vein from the body and tail, joins the Superior mesenteric vein to form the Portal vein. The posterior superior pancreaticoduodenal vein enters the Portal vein directly.',
            'Comece pela veia porta, na raiz. A veia esplênica, que recebe as veias pancreáticas e a veia pancreática magna do corpo e da cauda, une-se à veia mesentérica superior para formar a veia porta. A veia pancreaticoduodenal superior posterior entra diretamente na veia porta.'),
          t('### What drains into the superior mesenteric vein', '### O que drena para a veia mesentérica superior'),
          t('The two inferior pancreaticoduodenal veins and the anterior superior pancreaticoduodenal vein drain into the Superior mesenteric vein. So the head reaches the portal system by two routes: directly through the posterior superior vein, and through the Superior mesenteric vein.',
            'As duas veias pancreaticoduodenais inferiores e a veia pancreaticoduodenal superior anterior drenam para a veia mesentérica superior. Assim, a cabeça chega ao sistema porta por duas vias: diretamente pela veia superior posterior e pela veia mesentérica superior.'),
        ],
      },
      {
        id: 'pancreas-sup-nerves', ref: '25, 30', title: t('Nerves of the pancreas by system', 'Nervos do pâncreas por sistema'),
        focus: ['pancreas', 'duodenum'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Tap through the two systems. Sympathetic: from T5–T8 (Moore: T6–T9) through the coeliac ganglion, with postganglionic sympathetic vasomotor endings reaching the islets. Parasympathetic: the vagus, which mainly drives enzyme secretion from the acinar cells and bicarbonate and water from the ductal and centroacinar cells.',
            'Toque nos dois sistemas. Simpático: de T5–T8 (Moore: T6–T9), pelo gânglio celíaco, com terminações vasomotoras simpáticas pós-ganglionares chegando às ilhotas. Parassimpático: o nervo vago, que comanda principalmente a secreção de enzimas pelas células acinares e de bicarbonato e água pelas células ductais e centroacinares.'),
        ],
      },
    ],
    questions: [
      q('21', { q: 'Which artery supplies the uncinate process of the pancreas?', correct: 'Right branch of the dorsal pancreatic artery', wrong: ['Artery to the tail', 'Greater pancreatic artery', 'Short gastric artery'], why: 'The right branch of the dorsal pancreatic artery reaches the uncinate process.' },
        { q: 'Qual artéria irriga o processo uncinado do pâncreas?', correct: 'Ramo direito da artéria pancreática dorsal', wrong: ['Artéria da cauda', 'Artéria pancreática magna', 'Artéria gástrica curta'], why: 'O ramo direito da artéria pancreática dorsal alcança o processo uncinado.' }),
      q('22', { q: 'Which artery supplies the tail of the pancreas?', correct: 'Inferior pancreatic artery', wrong: ['Superior pancreaticoduodenal artery', 'Gastroduodenal artery', 'Common hepatic artery'], why: 'The inferior pancreatic artery runs to the tail.' },
        { q: 'Qual artéria irriga a cauda do pâncreas?', correct: 'Artéria pancreática inferior', wrong: ['Artéria pancreaticoduodenal superior', 'Artéria gastroduodenal', 'Artéria hepática comum'], why: 'A artéria pancreática inferior segue até a cauda.' }),
      q('51', { q: 'Which splenic ligament contains the terminal part of the splenic vessels and the tail of the pancreas?', correct: 'Splenorenal (lienorenal) ligament', wrong: ['Gastrosplenic ligament', 'Splenocolic ligament', 'Splenophrenic ligament'], why: 'The splenorenal ligament contains the terminal part of the splenic vessels and the tail of the pancreas.' },
        { q: 'Qual ligamento esplênico contém a parte terminal dos vasos esplênicos e a cauda do pâncreas?', correct: 'Ligamento esplenorrenal (lienorrenal)', wrong: ['Ligamento gastroesplênico', 'Ligamento esplenocólico', 'Ligamento esplenofrênico'], why: 'O ligamento esplenorrenal contém a parte terminal dos vasos esplênicos e a cauda do pâncreas.' }),
      q('46', { q: 'Which vessels does the gastrosplenic ligament carry?', correct: 'Short gastric vessels and the left gastro-omental vessels', wrong: ['Splenic artery only', 'Portal vein and hepatic artery', 'Inferior mesenteric vessels'], why: 'The gastrosplenic ligament carries the short gastric vessels to the fundus and the left gastro-omental vessels.' },
        { q: 'Quais vasos o ligamento gastroesplênico carrega?', correct: 'Vasos gástricos curtos e vasos gastromentais esquerdos', wrong: ['Somente a artéria esplênica', 'Veia porta e artéria hepática', 'Vasos mesentéricos inferiores'], why: 'O ligamento gastroesplênico leva os vasos gástricos curtos ao fundo e os vasos gastromentais esquerdos.' }),
      q('52', { q: 'Which splenic ligament is avascular and a remnant of the far left end of the transverse mesocolon?', correct: 'Splenocolic ligament', wrong: ['Splenophrenic ligament', 'Pancreaticosplenic ligament', 'Gastrosplenic ligament'], why: 'The splenocolic ligament is a remnant of the far left end of the transverse mesocolon and is avascular.' },
        { q: 'Qual ligamento esplênico é avascular e é um remanescente da extremidade esquerda do mesocolo transverso?', correct: 'Ligamento esplenocólico', wrong: ['Ligamento esplenofrênico', 'Ligamento pancreaticoesplênico', 'Ligamento gastroesplênico'], why: 'O ligamento esplenocólico é um remanescente da extremidade esquerda do mesocolo transverso e é avascular.' }),
      q('54', { q: 'Is the pancreaticosplenic ligament vascular?', correct: 'No, it is usually thin and avascular', wrong: ['Yes, it carries the splenic artery', 'Yes, it carries the great pancreatic vein', 'Yes, it carries the short gastric arteries'], why: 'The pancreaticosplenic ligament is present when the tail of the pancreas does not touch the spleen; it is usually thin and avascular.' },
        { q: 'O ligamento pancreaticoesplênico é vascular?', correct: 'Não, costuma ser fino e avascular', wrong: ['Sim, leva a artéria esplênica', 'Sim, leva a veia pancreática magna', 'Sim, leva as artérias gástricas curtas'], why: 'O ligamento pancreaticoesplênico está presente quando a cauda do pâncreas não toca o baço; costuma ser fino e avascular.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
