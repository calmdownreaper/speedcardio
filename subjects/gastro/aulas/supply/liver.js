// SpeedGastro · Liver supply blocks: supply sheet (hepatic arteries, portal vein,
// hepatic veins, lymph and nerve terminals), the hepatic arterial branching drill,
// and territories and portal venous tributaries in both directions.
// Facts only from deck 07 (p19–24 vascularisation, p26–28 segments, p33 hepatic veins,
// p35 nerve terminals in the space of Disse, p37 peribiliary lymphatic vessel).
// Deck 07 gives no origin for the common hepatic artery, so the tree starts at the aorta
// and the celiac trunk, as the figure on p20 shows them.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  celiac: t('Celiac trunk', 'Tronco celíaco'),
  ch: t('Common hepatic artery', 'Artéria hepática comum'),
  gd: t('Gastroduodenal artery', 'Artéria gastroduodenal'),
  rgo: t('Right gastroepiploic artery', 'Artéria gastroepiploica direita'),
  aspd: t('Anterior superior pancreaticoduodenal artery', 'Artéria pancreaticoduodenal superior anterior'),
  ph: t('Proper hepatic artery', 'Artéria hepática própria'),
  rha: t('Right hepatic artery', 'Artéria hepática direita'),
  cys: t('Cystic artery', 'Artéria cística'),
  lha: t('Left hepatic artery', 'Artéria hepática esquerda'),
  spl: t('Splenic artery', 'Artéria esplênica'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  smv: t('Superior mesenteric vein', 'Veia mesentérica superior'),
  sv: t('Splenic vein', 'Veia esplênica'),
  imv: t('Inferior mesenteric vein', 'Veia mesentérica inferior'),
  lgv: t('Left gastric vein', 'Veia gástrica esquerda'),
  cysv: t('Cystic vein', 'Veia cística'),
  pcs: t('Portocaval anastomoses', 'Anastomoses portocavais'),
  eso: t('Esophageal veins', 'Veias esofágicas'),
  para: t('Para-umbilical veins', 'Veias paraumbilicais'),
  rect: t('Rectal veins (middle and inferior)', 'Veias retais (média e inferior)'),
  retro: t('Retroperitoneal veins', 'Veias retroperitoneais'),
};

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.celiac, children: [
      { label: L.ch, children: [
        { label: L.gd, children: [{ label: L.rgo }, { label: L.aspd }] },
        { label: L.ph, note: t('in the free margin of the lesser omentum', 'na margem livre do omento menor'), children: [
          { label: L.rha, children: [{ label: L.cys, note: t('cystohepatic triangle', 'triângulo cistico-hepático') }] },
          { label: L.lha },
        ] },
      ] },
      { label: L.spl },
    ] },
  ] },
  links: [],
};

const VEIN_TREE = {
  root: { label: L.hpv, children: [
    { label: L.smv, note: t('behind the neck of the pancreas', 'atrás do colo do pâncreas') },
    { label: L.sv, children: [{ label: L.imv, note: t('joins the splenic vein', 'junta-se à veia esplênica') }] },
    { label: L.lgv, children: [] },
    { label: L.cysv },
    { label: L.pcs, children: [
      { label: L.eso, note: t('caval side', 'lado cava') },
      { label: L.para, note: t('along the round ligament', 'ao longo do ligamento redondo') },
      { label: L.rect, note: t('caval side', 'lado cava') },
      { label: L.retro },
    ] },
  ] },
  links: [
    { from: L.lgv, to: L.eso, label: t('esophageal portocaval link', 'elo portocava esofágico') },
    { from: L.hpv, to: L.para, label: t('para-umbilical portocaval link', 'elo portocava paraumbilical') },
  ],
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'liver-sup1', supply: true, title: t('Supply sheet: arteries, portal vein, hepatic veins, lymph and nerves', 'Ficha de suprimento: artérias, veia porta, veias hepáticas, linfa e nervos'),
    cards: [
      {
        id: 'liver-sup-arteries', ref: '19–21', title: t('Arteries of the liver at a glance', 'Artérias do fígado num relance'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'common_hepatic_a', 'proper_hepatic_a'], ghost: ['gallbladder', 'duodenum', 'pancreas'], view: 'ant',
        body: [
          t('### Two blood supplies', '### Duas irrigações sanguíneas'),
          t('The liver receives two blood supplies. The proper hepatic artery brings about 20% of the total, rich in oxygen, from the systemic circulation. The portal vein brings about 80%, poor in oxygen but rich in nutrients from the digestive system.',
            'O fígado recebe duas irrigações sanguíneas. A artéria hepática própria traz cerca de 20% do total, rica em oxigênio, da circulação sistêmica. A veia porta traz cerca de 80%, pobre em oxigênio mas rica em nutrientes do sistema digestório.'),
          t('### The proper hepatic artery', '### A artéria hepática própria'),
          t('The proper hepatic artery ascends in front of the portal vein and medial to the bile duct, in the free margin of the lesser omentum. It divides into the right and left hepatic arteries. The cystic artery comes from the right hepatic artery and runs through the cystohepatic triangle, the triangle of Calot.',
            'A artéria hepática própria sobe anterior à veia porta e medial ao ducto biliar, na margem livre do omento menor. Divide-se nas artérias hepáticas direita e esquerda. A artéria cística vem da artéria hepática direita e passa pelo triângulo cistico-hepático, o triângulo de Calot.'),
          t('### Variants', '### Variantes'),
          t('Three patterns of the proper hepatic artery are given. The typical division occurs in about 75% of cases. A right branch from the superior mesenteric artery occurs in about 10%. Left and right branches straight from the celiac trunk occur in less than 5%.',
            'São dadas três configurações da artéria hepática própria. A divisão típica ocorre em cerca de 75% dos casos. Um ramo direito originado da artéria mesentérica superior ocorre em cerca de 10%. Ramos esquerdo e direito saindo direto do tronco celíaco ocorrem em menos de 5%.'),
        ],
      },
      {
        id: 'liver-sup-portal', ref: '22–24', title: t('The portal vein: formation, tributaries and portocaval links', 'A veia porta: formação, afluentes e elos portocavais'),
        focus: ['hepatic_portal_v', 'smv', 'splenic_v', 'imv', 'gastric_v'], ghost: ['pancreas', 'spleen', 'stomach', 'duodenum'], view: 'ant',
        body: [
          t('### Formation and course', '### Formação e trajeto'),
          t('The portal vein forms behind the neck of the pancreas, at L2, where the superior mesenteric and splenic veins unite. It ascends to the right, behind the first part of the duodenum, from the head of the pancreas to the hilum of the liver. It is short: 8–10 cm long and 8–10 mm across.',
            'A veia porta se forma atrás do colo do pâncreas, em L2, onde se unem as veias mesentérica superior e esplênica. Ela sobe para a direita, atrás da primeira parte do duodeno, da cabeça do pâncreas até o hilo do fígado. É curta: 8–10 cm de comprimento e 8–10 mm de diâmetro.'),
          t('### Tributaries', '### Afluentes'),
          t('The main tributaries are the left and right gastric veins, the posterior superior pancreaticoduodenal vein and the cystic vein. The inferior mesenteric vein joins the splenic vein. The short gastric, gastro-omental, colic and jejunal and ileal veins drain into the same system.',
            'Os principais afluentes são as veias gástricas esquerda e direita, a veia pancreaticoduodenal superior posterior e a veia cística. A veia mesentérica inferior se junta à veia esplênica. As veias gástricas curtas, gastromentais, cólicas e jejunais e ileais drenam para o mesmo sistema.'),
          t('### Portocaval anastomoses', '### Anastomoses portocavais'),
          t('Four portocaval links join the portal and caval systems: the esophageal veins, the para-umbilical veins along the round ligament at the umbilicus, the rectal veins, and the retroperitoneal veins. The superior rectal veins, above the inferior mesenteric vein, belong to the portal side, while the middle and inferior rectal veins belong to the caval side.',
            'Quatro elos portocavais unem os sistemas porta e cava: as veias esofágicas, as veias paraumbilicais ao longo do ligamento redondo, no umbigo, as veias retais e as veias retroperitoneais. As veias retais superiores, acima da veia mesentérica inferior, pertencem ao lado porta, enquanto as veias retais média e inferior pertencem ao lado cava.'),
          t('### Variations', '### Variações'),
          t('The left gastric vein may enter the splenic vein, in 24% of cases, or the junction of the splenic and superior mesenteric veins. The inferior mesenteric vein may enter that junction or the superior mesenteric vein itself.',
            'A veia gástrica esquerda pode entrar na veia esplênica, em 24% dos casos, ou na junção das veias esplênica e mesentérica superior. A veia mesentérica inferior pode entrar nessa junção ou na própria veia mesentérica superior.'),
        ],
      },
      {
        id: 'liver-sup-veins-lymph-nerves', ref: '35, 37', title: t('Hepatic veins, lymph and nerve terminals', 'Veias hepáticas, linfa e terminações nervosas'),
        focus: ['hepatic_v', 'ivc_g'], ghost: ['caudate_lobe', 'gallbladder'], view: 'ant',
        body: [
          t('### Hepatic veins', '### Veias hepáticas'),
          t('The central veins merge step by step into the hepatic veins on the visceral surface: the right, the left and the middle (median) hepatic veins, plus minor inferior hepatic veins. All of them drain into the Inferior vena cava.',
            'As veias centrais se unem gradualmente nas veias hepáticas da face visceral: a direita, a esquerda e a média (mediana), além de veias hepáticas inferiores menores. Todas drenam para a veia cava inferior.'),
          t('### Lymph', '### Linfa'),
          t('In the portal area, a peribiliary lymphatic vessel lies beside the interlobular artery, the interlobular vein and the interlobular bile duct. The portal area is the connective tissue around the portal triad, with the perisinusoidal space nearby.',
            'Na área portal, um vaso linfático peribiliar fica ao lado da artéria interlobular, da veia interlobular e do ducto biliar interlobular. A área portal é o tecido conjuntivo em torno da tríade portal, com o espaço perisinusoidal próximo.'),
          t('### Nerves', '### Nervos'),
          t('The perisinusoidal space of Disse, between the sinusoids and the hepatocytes, contains nerve terminals, together with hepatocyte microvilli and the stellate cells.',
            'O espaço perisinusoidal de Disse, entre os sinusoides e os hepatócitos, contém terminações nervosas, junto com microvilosidades dos hepatócitos e as células estreladas.'),
        ],
      },
    ],
    questions: [
      q('19', { q: 'What share of the liver blood comes from the portal vein?', correct: 'About 80%', wrong: ['About 20%', 'About 50%', 'About 10%'], why: 'The portal vein brings 80% of the total blood supply.' },
        { q: 'Que parcela do sangue do fígado vem da veia porta?', correct: 'Cerca de 80%', wrong: ['Cerca de 20%', 'Cerca de 50%', 'Cerca de 10%'], why: 'A veia porta traz 80% do total.' }),
      q('19', { q: 'Which blood supply of the liver is rich in oxygen?', correct: 'The proper hepatic artery', wrong: ['The portal vein', 'The cystic vein', 'The left gastric vein'], why: 'The proper hepatic artery is rich in oxygen; the portal vein is poor in oxygen but rich in nutrients.' },
        { q: 'Qual irrigação do fígado é rica em oxigênio?', correct: 'A artéria hepática própria', wrong: ['A veia porta', 'A veia cística', 'A veia gástrica esquerda'], why: 'A artéria hepática própria é rica em oxigênio; a veia porta é pobre em oxigênio, mas rica em nutrientes.' }),
      q('20', { q: 'How does the proper hepatic artery sit relative to the portal vein and the bile duct?', correct: 'Anterior to the portal vein and medial to the bile duct', wrong: ['Posterior to the portal vein and lateral to the bile duct', 'Posterior to both the portal vein and the bile duct', 'Lateral to the portal vein and anterior to the bile duct'], why: 'It ascends anterior to the portal vein and medial to the bile duct.' },
        { q: 'Como a artéria hepática própria fica em relação à veia porta e ao ducto biliar?', correct: 'Anterior à veia porta e medial ao ducto biliar', wrong: ['Posterior à veia porta e lateral ao ducto biliar', 'Posterior à veia porta e ao ducto biliar', 'Lateral à veia porta e anterior ao ducto biliar'], why: 'Ela sobe anterior à veia porta e medial ao ducto biliar.' }),
      q('22', { q: 'Where is the portal vein formed?', correct: 'Behind the neck of the pancreas, by the union of the superior mesenteric and splenic veins', wrong: ['Behind the hilum of the liver, by the hepatic veins', 'In the lesser omentum, by the left gastric vein alone', 'Behind the inferior vena cava, by the renal veins'], why: 'The portal vein is formed behind the neck of the pancreas (L2), by the superior mesenteric and splenic veins.' },
        { q: 'Onde se forma a veia porta?', correct: 'Atrás do colo do pâncreas, pela união das veias mesentérica superior e esplênica', wrong: ['Atrás do hilo do fígado, pelas veias hepáticas', 'No omento menor, só pela veia gástrica esquerda', 'Atrás da veia cava inferior, pelas veias renais'], why: 'A veia porta se forma atrás do colo do pâncreas (L2), pelas veias mesentérica superior e esplênica.' }),
      q('23', { q: 'Which portocaval anastomosis lies at the umbilicus, along the round ligament?', correct: 'The para-umbilical veins', wrong: ['The esophageal veins', 'The retroperitoneal veins', 'The cystic vein'], why: 'The para-umbilical veins run along the round ligament at the umbilicus.' },
        { q: 'Qual anastomose portocava fica no umbigo, ao longo do ligamento redondo?', correct: 'As veias paraumbilicais', wrong: ['As veias esofágicas', 'As veias retroperitoneais', 'A veia cística'], why: 'As veias paraumbilicais seguem ao longo do ligamento redondo, no umbigo.' }),
      q('33', { q: 'Into which vessel do all the hepatic veins drain?', correct: 'The inferior vena cava', wrong: ['The portal vein', 'The superior mesenteric vein', 'The splenic vein'], why: 'The right, left and middle hepatic veins, plus minor inferior hepatic veins, all drain into the IVC.' },
        { q: 'Em qual veia drenam todas as veias hepáticas?', correct: 'Veia cava inferior', wrong: ['Veia porta', 'Veia mesentérica superior', 'Veia esplênica'], why: 'As veias hepáticas direita, esquerda e média, mais as inferiores menores, drenam para a veia cava inferior.' }),
    ],
  },
  {
    id: 'liver-sup2', supply: true, title: t('Branching: the hepatic arterial tree', 'Ramificação: a árvore arterial hepática'),
    cards: [
      {
        id: 'liver-sup-tree', ref: '19–21', title: t('Walk the hepatic arteries', 'Percorra as artérias hepáticas'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'common_hepatic_a', 'proper_hepatic_a', 'gastroduodenal_a', 'gastroepiploic_a', 'splenic_a', 'pancreaticoduodenal_a'], ghost: ['gallbladder', 'duodenum', 'pancreas', 'spleen'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud: the celiac trunk first, then the common hepatic artery and its two divisions, the gastroduodenal artery and the proper hepatic artery.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta: primeiro o tronco celíaco, depois a artéria hepática comum e suas duas divisões, a artéria gastroduodenal e a artéria hepática própria.'),
          t('### Where the hepatic artery splits', '### Onde a artéria hepática se divide'),
          t('The proper hepatic artery divides into the right and left hepatic arteries. The cystic artery comes from the right hepatic artery, and it reaches the gallbladder through the cystohepatic triangle.',
            'A artéria hepática própria se divide nas artérias hepáticas direita e esquerda. A artéria cística vem da artéria hepática direita e chega à vesícula pelo triângulo cistico-hepático.'),
          t('### The gastroduodenal branches', '### Os ramos da gastroduodenal'),
          t('The gastroduodenal artery gives the right gastroepiploic artery and the anterior superior pancreaticoduodenal artery. The splenic artery also comes off the celiac trunk, and it lies beside the left gastroepiploic artery.',
            'A artéria gastroduodenal dá a artéria gastroepiploica direita e a artéria pancreaticoduodenal superior anterior. A artéria esplênica também sai do tronco celíaco, e fica ao lado da artéria gastroepiploica esquerda.'),
        ],
      },
    ],
    questions: [
      q('20', { q: 'Which artery gives rise to the cystic artery?', correct: 'The right hepatic artery', wrong: ['The left hepatic artery', 'The gastroduodenal artery', 'The splenic artery'], why: 'The cystic artery comes from the right hepatic artery.' },
        { q: 'De qual artéria nasce a artéria cística?', correct: 'Artéria hepática direita', wrong: ['Artéria hepática esquerda', 'Artéria gastroduodenal', 'Artéria esplênica'], why: 'A artéria cística vem da artéria hepática direita.' }),
      q('21', { q: 'In the typical division (about 75% of cases), how does the proper hepatic artery divide?', correct: 'Into right and left hepatic arteries', wrong: ['Into the gastroduodenal and splenic arteries', 'Into lateral and medial hepatic arteries', 'It does not divide'], why: 'The typical division gives a right and a left branch.' },
        { q: 'Na divisão típica (cerca de 75% dos casos), como a artéria hepática própria se divide?', correct: 'Em artérias hepáticas direita e esquerda', wrong: ['Em artérias gastroduodenal e esplênica', 'Em artérias hepáticas lateral e medial', 'Não se divide'], why: 'A divisão típica dá um ramo direito e um esquerdo.' }),
      q('21', { q: 'In about 10% of cases, from which artery does the right branch of the proper hepatic artery arise?', correct: 'Superior mesenteric artery', wrong: ['Celiac trunk', 'Splenic artery', 'Left gastric artery'], why: 'Variant b, the right branch originates from the superior mesenteric artery in about 10%.' },
        { q: 'Em cerca de 10% dos casos, de qual artéria nasce o ramo direito da artéria hepática própria?', correct: 'Artéria mesentérica superior', wrong: ['Tronco celíaco', 'Artéria esplênica', 'Artéria gástrica esquerda'], why: 'Variante b, o ramo direito nasce da artéria mesentérica superior em cerca de 10%.' }),
      q('20', { q: 'Which branch does the gastroduodenal artery give before it ends?', correct: 'Right gastroepiploic artery and anterior superior pancreaticoduodenal artery', wrong: ['Left gastric artery and splenic artery', 'Cystic artery and right hepatic artery', 'Inferior phrenic arteries only'], why: 'The gastroduodenal artery gives the right gastroepiploic and the anterior superior pancreaticoduodenal arteries.' },
        { q: 'Quais ramos a artéria gastroduodenal dá antes de terminar?', correct: 'Artéria gastroepiploica direita e artéria pancreaticoduodenal superior anterior', wrong: ['Artéria gástrica esquerda e artéria esplênica', 'Artéria cística e artéria hepática direita', 'Somente as artérias frênicas inferiores'], why: 'A gastroduodenal dá a gastroepiploica direita e a pancreaticoduodenal superior anterior.' }),
    ],
  },
  {
    id: 'liver-sup3', supply: true, title: t('Territories and portal tributaries, both directions', 'Territórios e afluentes porta, nos dois sentidos'),
    cards: [
      {
        id: 'liver-sup-territories', ref: '26–28', title: t('Territories: segments and portal branches', 'Territórios: segmentos e ramos porta'),
        focus: ['hepatic_portal_v', 'proper_hepatic_a', 'caudate_lobe'], ghost: ['gallbladder', 'ivc_g'], view: 'ant',
        body: [
          t('### From portal branch to segment', '### Do ramo porta ao segmento'),
          t('Each functional segment is served by tertiary branches of the hepatic artery, the portal vein and the common hepatic duct, which together form the portal triad. The portal vein divides at Cantlie’s line into a right and a left branch. The right branch divides into lateral and paramedian branches, and each of these divides into anterior and posterior, four in total. The left branch divides into lateral (anterior and posterior) and medial branches, plus a branch to the caudate lobe.',
            'Cada segmento funcional é irrigado por ramos terciários da artéria hepática, da veia porta e do ducto hepático comum, que juntos formam a tríade portal. A veia porta se divide na linha de Cantlie em um ramo direito e um esquerdo. O ramo direito se divide em ramos lateral e paramediano, e cada um deles se divide em anterior e posterior, quatro no total. O ramo esquerdo se divide em ramos lateral (anterior e posterior) e medial, mais um ramo para o lobo caudado.'),
          t('### From segment to division', '### Do segmento à divisão'),
          t('Segment I is the caudate lobe. The left lateral division holds segments II and III, and the left medial division holds segment IV. The right medial (anterior) division holds segments V and VIII, and the right lateral (posterior) division holds segments VI and VII (Couinaud; one table in the class material wrongly pairs V+VI and VII+VIII).',
            'O segmento I é o lobo caudado. A divisão lateral esquerda contém os segmentos II e III, e a divisão medial esquerda contém o segmento IV. A divisão medial (anterior) direita contém os segmentos V e VIII, e a divisão lateral (posterior) direita contém os segmentos VI e VII (Couinaud; uma tabela do material da aula agrupa, por engano, V+VI e VII+VIII).'),
          t('### Why segments can be resected', '### Por que os segmentos podem ser ressecados'),
          t('Neighbouring segments have no vascular anastomoses, which is why partial hepatectomy is possible. The segments follow the branching of the portal veins and the bile ducts, so they do not match the anatomical lobes exactly.',
            'Segmentos vizinhos não têm anastomoses vasculares, e por isso a hepatectomia parcial é possível. Os segmentos seguem a ramificação das veias porta e dos ductos biliares, por isso não coincidem exatamente com os lobos anatômicos.'),
        ],
      },
      {
        id: 'liver-sup-vein-tree', ref: '22–24', title: t('Portal tributaries and portocaval links, both directions', 'Afluentes porta e elos portocavais, nos dois sentidos'),
        focus: ['hepatic_portal_v', 'smv', 'splenic_v', 'imv', 'gastric_v'], ghost: ['pancreas', 'spleen', 'stomach'], view: 'ant',
        diagram: VEIN_TREE,
        body: [
          t('Tap the tree from the top. The portal vein receives the superior mesenteric vein, the splenic vein (which takes in the inferior mesenteric vein), the left gastric vein and the cystic vein. The branch named Portocaval anastomoses holds the caval-side links. The two marked links join the left gastric vein with the esophageal veins, and the portal vein with the para-umbilical veins.',
            'Toque a árvore de cima para baixo. A veia porta recebe a veia mesentérica superior, a veia esplênica (que recebe a veia mesentérica inferior), a veia gástrica esquerda e a veia cística. O ramo Anastomoses portocavais reúne os elos do lado cava. Os dois elos marcados unem a veia gástrica esquerda às veias esofágicas, e a veia porta às veias paraumbilicais.'),
          t('Read it the other way when you revise: the esophageal and para-umbilical veins, together with the rectal and retroperitoneal veins, are the caval side of the portocaval anastomoses.',
            'Leia no sentido inverso ao revisar: as veias esofágicas e paraumbilicais, junto com as veias retais e retroperitoneais, formam o lado cava das anastomoses portocavais.'),
        ],
      },
    ],
    questions: [
      q('28', { q: 'How many segments does the right branch of the portal vein give, counting its divisions?', correct: 'Four', wrong: ['Two', 'Six', 'Eight'], why: 'The right branch divides into lateral and paramedian branches, each giving anterior and posterior, four in total.' },
        { q: 'Quantos segmentos o ramo direito da veia porta dá, contando as divisões?', correct: 'Quatro', wrong: ['Dois', 'Seis', 'Oito'], why: 'O ramo direito se divide em lateral e paramediano, cada um em anterior e posterior, quatro no total.' }),
      q('28', { q: 'Which segment is the caudate lobe?', correct: 'Segment I', wrong: ['Segment IV', 'Segment VIII', 'Segment II'], why: 'The first segment is the caudate lobe.' },
        { q: 'Qual segmento é o lobo caudado?', correct: 'Segmento I', wrong: ['Segmento IV', 'Segmento VIII', 'Segmento II'], why: 'O primeiro segmento é o lobo caudado.' }),
      q('27', { q: 'Why is partial hepatectomy possible?', correct: 'Neighbouring segments have no vascular anastomoses', wrong: ['The segments share a single hepatic vein', 'The segments drain through the caudate lobe', 'Each segment has its own bile duct and no portal vein'], why: 'No vessel anastomosis between segments, which makes partial hepatectomy possible.' },
        { q: 'Por que a hepatectomia parcial é possível?', correct: 'Segmentos vizinhos não têm anastomoses vasculares', wrong: ['Os segmentos compartilham uma única veia hepática', 'Os segmentos drenam pelo lobo caudado', 'Cada segmento tem seu próprio ducto e não tem veia porta'], why: 'Não há anastomose vascular entre os segmentos, o que torna a hepatectomia parcial possível.' }),
      q('28', { q: 'Which segments form the right medial division?', correct: 'Segments V and VIII', wrong: ['Segments V and VI', 'Segments VI and VII', 'Segment IV alone'], why: 'The right medial (anterior) division holds segments V and VIII (Couinaud; Sobotta).' },
        { q: 'Quais segmentos formam a divisão medial direita?', correct: 'Segmentos V e VIII', wrong: ['Segmentos V e VI', 'Segmentos VI e VII', 'Somente o segmento IV'], why: 'A divisão medial (anterior) direita tem os segmentos V e VIII (Couinaud; Sobotta).' }),
      q('24', { q: 'Where does the left gastric vein sometimes enter, in 24% of cases?', correct: 'The splenic vein', wrong: ['The inferior vena cava', 'The hepatic veins', 'The rectal veins'], why: 'The left gastric vein may enter the splenic vein in 24% of cases.' },
        { q: 'Onde a veia gástrica esquerda às vezes entra, em 24% dos casos?', correct: 'Na veia esplênica', wrong: ['Na veia cava inferior', 'Nas veias hepáticas', 'Nas veias retais'], why: 'A veia gástrica esquerda pode entrar na veia esplênica em 24% dos casos.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
