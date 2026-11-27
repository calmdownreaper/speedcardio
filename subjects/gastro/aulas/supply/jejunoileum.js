// SpeedGastro · Jejunum and ileum supply blocks: the superior mesenteric artery, the jejunal
// and ileal arcades with their straight arteries, the ileocolic artery, and venous drainage.
// Facts only from deck 09 (p6 calibre, p17–21 SMA, p23 arcade tiers, p25–27 ileocolic,
// p28–29 right and middle colic, p30 veins). Deck 09 gives no origin for the ileocolic
// branches beyond the right side of the SMA, so the tree does not add further origins.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
const q = (ref, en, pt) => ({ ref, ...en, pt });

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  sma: t('Superior mesenteric artery', 'Artéria mesentérica superior'),
  jia: t('Jejunal and ileal arteries', 'Artérias jejunais e ileais'),
  arc: t('Arcades', 'Arcadas'),
  rect: t('Straight arteries (arteriae rectae)', 'Artérias retas (arteriae rectae)'),
  ic: t('Ileocolic artery', 'Artéria ileocólica'),
  icc: t('Colic branch of the ileocolic artery', 'Ramo cólico da artéria ileocólica'),
  ici: t('Ileal branch of the ileocolic artery', 'Ramo ileal da artéria ileocólica'),
  cae: t('Anterior and posterior caecal arteries', 'Artérias cecais anterior e posterior'),
  app: t('Appendicular artery', 'Artéria apendicular'),
  tia: t('Terminal ileal artery', 'Artéria ileal terminal'),
  endsma: t('Terminal part of the SMA', 'Porção terminal da AMS'),
  rca: t('Right colic artery', 'Artéria cólica direita'),
  mca: t('Middle colic artery', 'Artéria cólica média'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  smv: t('Superior mesenteric vein', 'Veia mesentérica superior'),
  jiv: t('Jejunal and ileal veins', 'Veias jejunais e ileais'),
  varch: t('Venous arches', 'Arcadas venosas'),
  vr: t('Straight veins (venae rectae)', 'Veias retas (venae rectae)'),
  icv: t('Ileocolic vein', 'Veia ileocólica'),
  rcv: t('Right colic vein', 'Veia cólica direita'),
  mcv: t('Middle colic vein', 'Veia cólica média'),
  jej: t('Jejunum', 'Jejuno'),
  ile: t('Ileum', 'Íleo'),
  jtiers: t('1–3 tiers, long vasa recta, few arcades', '1–3 níveis, vasa recta longas, poucas arcadas'),
  itiers: t('2–6 tiers, short vasa recta, many arcades', '2–6 níveis, vasa recta curtas, muitas arcadas'),
};

const ARCADE_TREE = {
  root: { label: t('Arcade tiers of the small intestine', 'Níveis de arcadas do intestino delgado'), children: [
    { label: L.jej, children: [{ label: L.jtiers }] },
    { label: L.ile, children: [{ label: L.itiers }] },
  ] },
  links: [],
};

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.sma, note: t('L1, 1 cm below the celiac trunk', 'L1, 1 cm abaixo do tronco celíaco'), children: [
      { label: L.jia, note: t('from the left side', 'do lado esquerdo'), children: [
        { label: L.arc, children: [{ label: L.rect }] },
      ] },
      { label: L.rca, note: t('from the right side', 'do lado direito') },
      { label: L.mca, note: t('from below the pancreas', 'abaixo do pâncreas') },
      { label: L.ic, note: t('from the right side', 'do lado direito'), children: [
        { label: L.icc },
        { label: L.ici, children: [
          { label: L.cae }, { label: L.app }, { label: L.tia },
        ] },
      ] },
      { label: L.endsma, note: t('ends at the ileocolic artery', 'termina na ileocólica') },
    ] },
  ] },
  links: [
    { from: L.icc, to: L.rca, label: t('colic anastomosis', 'anastomose cólica') },
    { from: L.tia, to: L.endsma, label: t('terminal ileal anastomosis', 'anastomose ileal terminal') },
  ],
};

const VEIN_TREE = {
  root: { label: L.hpv, children: [
    { label: L.smv, children: [
      { label: L.jiv, children: [{ label: L.varch }] },
      { label: L.vr },
    ] },
    { label: L.icv, note: t('toward the portal system', 'em direção ao sistema porta') },
    { label: L.rcv, note: t('toward the portal system', 'em direção ao sistema porta') },
    { label: L.mcv, note: t('toward the portal system', 'em direção ao sistema porta') },
  ] },
  links: [],
};

const NERVE_TREE = {
  root: { label: t('Innervation of the small intestine', 'Inervação do intestino delgado'), children: [
    { label: t('Sympathetic', 'Simpático'), children: [
      { label: t('Greater splanchnic nerve', 'Nervo esplâncnico maior') },
      { label: t('Lesser splanchnic nerve', 'Nervo esplâncnico menor') },
    ] },
    { label: t('Parasympathetic', 'Parassimpático'), children: [{ label: t('Vagus nerve', 'Nervo vago') }] },
    { label: t('Convergence', 'Convergência'), note: t('fibres converge here', 'as fibras convergem aqui'), children: [
      { label: t('Coeliac plexus', 'Plexo celíaco') },
      { label: t('Superior mesenteric plexus', 'Plexo mesentérico superior') },
    ] },
  ] },
  links: [],
};

export const blocks = [
  {
    id: 'jejunoileum-sup1', supply: true, title: t('Supply sheet: the SMA, the arcades and the vasa recta', 'Ficha de suprimento: a AMS, as arcadas e as vasa recta'),
    cards: [
      {
        id: 'ji-sup-sma', ref: '17–21', title: t('The superior mesenteric artery at a glance', 'A artéria mesentérica superior num relance'),
        focus: ['sma', 'jejunum', 'ileum', 'ileocolic_a', 'right_colic_a', 'middle_colic_a'], ghost: ['duodenum', 'pancreas', 'ascending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('### Origin and course', '### Origem e trajeto'),
          t('The superior mesenteric artery arises from the aorta at L1, 1 cm below the celiac trunk. It originates behind the neck of the pancreas, with the superior mesenteric vein beside it. It passes in front of the uncinate process and the third part of the duodenum, then descends in a curve convex to the left to the right iliac fossa.',
            'A artéria mesentérica superior nasce da aorta em L1, 1 cm abaixo do tronco celíaco. Origina-se atrás do colo do pâncreas, com a veia mesentérica superior ao lado. Passa à frente do processo uncinado e da terceira parte do duodeno, depois desce em curva convexa para a esquerda até a fossa ilíaca direita.'),
          t('### Territory', '### Território'),
          t('The branches on the left side of the artery supply the small intestine, and the branches on the right supply the colon. The midgut territory is the distal half of the duodenum, the jejunum, the ileum, the caecum and appendix, the ascending colon, the right colic flexure and the proximal part of the transverse colon. It ends by anastomosing with its own branch, the ileocolic artery.',
            'Os ramos do lado esquerdo da artéria suprem o intestino delgado, e os ramos do lado direito suprem o cólon. O território do intestino médio é a metade distal do duodeno, o jejuno, o íleo, o ceco e o apêndice, o cólon ascendente, a flexura cólica direita e a parte proximal do cólon transverso. Termina por anastomose com um ramo próprio, a artéria ileocólica.'),
          t('⚠ Slide 18 gives the proximal one half of the transverse colon for the midgut. Slide 24 of deck 08 gives two thirds, and slide 40 of deck 10 also gives the proximal two thirds. The deck records both versions, and this card does not choose between them.',
            '⚠ O slide 18 dá a metade proximal do cólon transverso para o intestino médio. O slide 24 do deck 08 dá dois terços, e o slide 40 do deck 10 também dá os dois terços proximais. O material registra as duas versões, e este cartão não escolhe entre elas.'),
        ],
      },
      {
        id: 'ji-sup-arcades', ref: '6, 21–23', title: t('Jejunal and ileal arcades and vasa recta', 'Arcadas jejunais e ileais e vasa recta'),
        focus: ['jejunum', 'ileum', 'sma'], ghost: ['duodenum'], view: 'ant',
        diagram: ARCADE_TREE,
        body: [
          t('The jejunal and ileal arteries arise from the left side of the superior mesenteric artery. They start parallel in the mesentery, and each divides in two, and the branches join their neighbours to form arcades. The jejunal arteries are slightly larger than the ileal ones.',
            'As artérias jejunais e ileais nascem do lado esquerdo da artéria mesentérica superior. Começam paralelas no mesentério, cada uma se divide em duas, e os ramos se unem aos vizinhos para formar arcadas. As artérias jejunais são um pouco maiores que as ileais.'),
          t('From the distal arcades, straight arteries (arteriae rectae) reach the mesenteric margin of the loop. Each one divides and runs along both surfaces of the loop, and the two branches meet on the convex margin. The jejunum has one to three tiers of arcades, with long vasa recta and few arcades. The ileum has two to six tiers, with short vasa recta and many arcades.',
            'A partir das arcadas distais, artérias retas (arteriae rectae) chegam à margem mesentérica da alça. Cada uma se divide e corre pelas duas superfícies da alça, e os dois ramos se encontram na margem convexa. O jejuno tem um a três níveis de arcadas, com vasa recta longas e poucas arcadas. O íleo tem dois a seis níveis, com vasa recta curtas e muitas arcadas.'),
        ],
      },
      {
        id: 'ji-sup-ileocolic', ref: '25–27', title: t('The ileocolic artery and its two branches', 'A artéria ileocólica e seus dois ramos'),
        focus: ['ileocolic_a', 'sma', 'ileum', 'ascending_colon'], ghost: ['ileum', 'rectum'], view: 'ant',
        body: [
          t('The ileocolic artery arises from the right side of the superior mesenteric artery. It descends on the right, behind the parietal peritoneum, to the right iliac fossa. There it divides into two branches.',
            'A artéria ileocólica nasce do lado direito da artéria mesentérica superior. Desce à direita, atrás do peritônio parietal, até a fossa ilíaca direita. Ali se divide em dois ramos.'),
          t('The superior colic branch anastomoses with the right colic artery, which supplies the ascending colon. The inferior ileal branch gives the anterior and posterior caecal arteries and the appendicular artery. It also gives an ileal branch that runs left to the last part of the ileum and anastomoses with the final part of the superior mesenteric artery.',
            'O ramo cólico superior se anastomosa com a artéria cólica direita, que supre o cólon ascendente. O ramo ileal inferior dá as artérias cecais anterior e posterior e a artéria apendicular. Dá também um ramo ileal que corre para a esquerda até a última parte do íleo e se anastomosa com a porção final da artéria mesentérica superior.'),
        ],
      },
    ],
    questions: [
      q('18', { q: 'Which part of the duodenum does the superior mesenteric artery supply, according to slide 18?', correct: 'The distal half', wrong: ['The proximal half', 'The whole duodenum', 'None of the duodenum'], why: 'Slide 18: the SMA supplies the distal half of the duodenum.' },
        { q: 'Qual parte do duodeno a artéria mesentérica superior irriga, segundo o slide 18?', correct: 'A metade distal', wrong: ['A metade proximal', 'Todo o duodeno', 'Nenhuma parte do duodeno'], why: 'Slide 18: a AMS irriga a metade distal do duodeno.' }),
      q('20', { q: 'Which two structures does the superior mesenteric artery pass in front of?', correct: 'The uncinate process and the third part of the duodenum', wrong: ['The splenic vein and the pylorus', 'The gallbladder neck and the first part of the duodenum', 'The head of the pancreas and the spleen'], why: 'Slide 20: it passes in front of the uncinate process of the pancreas and the third part of the duodenum.' },
        { q: 'À frente de quais duas estruturas passa a artéria mesentérica superior?', correct: 'Processo uncinado e terceira parte do duodeno', wrong: ['Veia esplênica e piloro', 'Colo da vesícula e primeira parte do duodeno', 'Cabeça do pâncreas e baço'], why: 'Slide 20: passa à frente do processo uncinado do pâncreas e da terceira parte do duodeno.' }),
      q('6', { q: 'Which arteries are slightly larger, the jejunal or the ileal ones?', correct: 'The jejunal arteries', wrong: ['The ileal arteries', 'They are exactly the same size', 'The caecal arteries'], why: 'Slide 6: the jejunal arteries are slightly larger than the ileal ones.' },
        { q: 'Quais artérias são um pouco maiores, as jejunais ou as ileais?', correct: 'As artérias jejunais', wrong: ['As artérias ileais', 'Têm exatamente o mesmo calibre', 'As artérias cecais'], why: 'Slide 6: as artérias jejunais são um pouco maiores que as ileais.' }),
      q('21', { q: 'On which side of the superior mesenteric artery do the jejunal and ileal arteries arise?', correct: 'The left side', wrong: ['The right side', 'The anterior side', 'The posterior side'], why: 'Slide 21: the jejunal and ileal arteries originate on the left side of the SMA.' },
        { q: 'De qual lado da artéria mesentérica superior nascem as artérias jejunais e ileais?', correct: 'Do lado esquerdo', wrong: ['Do lado direito', 'Do lado anterior', 'Do lado posterior'], why: 'Slide 21: as artérias jejunais e ileais nascem do lado esquerdo da AMS.' }),
      q('23', { q: 'Which segment has long vasa recta and few arcades?', correct: 'The jejunum', wrong: ['The ileum', 'The caecum', 'The sigmoid colon'], why: 'Slide 23: the jejunum has long vasa recta and few arcades; the ileum has short vasa recta and many arcades.' },
        { q: 'Qual segmento tem vasa recta longas e poucas arcadas?', correct: 'O jejuno', wrong: ['O íleo', 'O ceco', 'O colo sigmoide'], why: 'Slide 23: o jejuno tem vasa recta longas e poucas arcadas; o íleo tem vasa recta curtas e muitas arcadas.' }),
      q('27', { q: 'Which branch of the ileocolic artery anastomoses with the right colic artery?', correct: 'The superior colic branch', wrong: ['The inferior ileal branch', 'The appendicular artery', 'The anterior caecal artery'], why: 'Slide 25: the superior colic branch anastomoses with the right colic artery.' },
        { q: 'Qual ramo da artéria ileocólica se anastomosa com a artéria cólica direita?', correct: 'O ramo cólico superior', wrong: ['O ramo ileal inferior', 'A artéria apendicular', 'A artéria cecal anterior'], why: 'Slide 25: o ramo cólico superior se anastomosa com a artéria cólica direita.' }),
    ],
  },
  {
    id: 'jejunoileum-sup2', supply: true, title: t('Branching: the SMA tree', 'Ramificação: a árvore da artéria mesentérica superior'),
    cards: [
      {
        id: 'ji-sup-tree', ref: '17–29', title: t('Walk the superior mesenteric branches', 'Percorra os ramos da artéria mesentérica superior'),
        focus: ['abdominal_aorta_g', 'sma', 'jejunum', 'ileum', 'ileocolic_a', 'right_colic_a', 'middle_colic_a'], ghost: ['ascending_colon', 'transverse_colon'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('The superior mesenteric artery (SMA) gives off jejunal and ileal arteries from its left side and ileocolic, right colic and middle colic arteries from its right side. The colic branches anastomose along the colon. The SMA ends by joining the terminal ileal branch of the ileocolic artery.',
            'A artéria mesentérica superior dá origem às artérias jejunais e ileais à esquerda e às artérias ileocólica, cólica direita e cólica média à direita. Os ramos cólicos se anastomosam ao longo do colo. A artéria mesentérica superior termina ao se unir ao ramo ileal terminal da artéria ileocólica.'),
          t('### The ileocolic branches', '### Os ramos da ileocólica'),
          t('The ileocolic artery divides into a superior colic branch and an inferior ileal branch. The inferior ileal branch gives the anterior and posterior caecal arteries and the appendicular artery, and an ileal branch that runs to the last part of the ileum. That ileal branch meets the final part of the superior mesenteric artery.',
            'A artéria ileocólica se divide em um ramo cólico superior e um ramo ileal inferior. O ramo ileal inferior dá as artérias cecais anterior e posterior e a artéria apendicular, além de um ramo ileal que segue até a última parte do íleo. Esse ramo ileal encontra a porção final da artéria mesentérica superior.'),
          t('### The colic branches', '### Os ramos cólicos'),
          t('The right colic artery arises from the right side of the superior mesenteric artery and has many variants. Near the ascending colon it divides into a descending branch, which joins the colic branch of the ileocolic artery, and an ascending branch, which joins the right branch of the middle colic. The middle colic artery arises below the pancreas, runs between the two sheets of the transverse mesocolon, and divides into left and right branches as a branch of the superior mesenteric artery.',
            'A artéria cólica direita nasce do lado direito da artéria mesentérica superior e tem muitas variações. Perto do cólon ascendente se divide em um ramo descendente, que se une ao ramo cólico da ileocólica, e um ramo ascendente, que se une ao ramo direito da cólica média. A artéria cólica média nasce abaixo do pâncreas, corre entre as duas lâminas do mesocolo transverso e se divide em ramos esquerdo e direito como ramo da artéria mesentérica superior.'),
        ],
      },
    ],
    questions: [
      q('25', { q: 'Into how many branches does the ileocolic artery divide at the right iliac fossa?', correct: 'Two', wrong: ['One', 'Three', 'Four'], why: 'Slide 25: the ileocolic artery divides into a superior colic branch and an inferior ileal branch.' },
        { q: 'Em quantos ramos a artéria ileocólica se divide na fossa ilíaca direita?', correct: 'Dois', wrong: ['Um', 'Três', 'Quatro'], why: 'Slide 25: a ileocólica se divide em ramo cólico superior e ramo ileal inferior.' }),
      q('26', { q: 'Which structures does the inferior ileal branch of the ileocolic artery give off?', correct: 'Anterior and posterior caecal arteries, the appendicular artery and an ileal branch', wrong: ['Sigmoid arteries and the superior rectal artery', 'The gastroduodenal and posterior superior arteries', 'The left colic artery and the marginal artery'], why: 'Slide 26: the inferior ileal branch gives caecal branches, the appendicular artery and the ileal branch.' },
        { q: 'Quais estruturas o ramo ileal inferior da artéria ileocólica dá?', correct: 'Artérias cecais anterior e posterior, artéria apendicular e um ramo ileal', wrong: ['Artérias sigmoides e artéria retal superior', 'Artéria gastroduodenal e posterior superior', 'Artéria cólica esquerda e artéria marginal'], why: 'Slide 26: o ramo ileal inferior dá ramos cecais, a artéria apendicular e o ramo ileal.' }),
      q('28', { q: 'From which side of the superior mesenteric artery does the right colic artery arise?', correct: 'The right side', wrong: ['The left side', 'The anterior surface', 'The celiac trunk'], why: 'Slide 28: the right colic artery arises from the right side of the SMA.' },
        { q: 'De qual lado da artéria mesentérica superior nasce a artéria cólica direita?', correct: 'Do lado direito', wrong: ['Do lado esquerdo', 'Da face anterior', 'Do tronco celíaco'], why: 'Slide 28: a artéria cólica direita nasce do lado direito da AMS.' }),
      q('29', { q: 'Into how many branches does the middle colic artery divide?', correct: 'Two, a left and a right branch', wrong: ['One, a single trunk', 'Three, left, middle and right', 'Four, in the two sheets of the mesocolon'], why: 'Slide 29: the middle colic divides into left and right branches.' },
        { q: 'Em quantos ramos a artéria cólica média se divide?', correct: 'Dois, um esquerdo e um direito', wrong: ['Um, um tronco único', 'Três, esquerdo, médio e direito', 'Quatro, nas duas lâminas do mesocolo'], why: 'Slide 29: a cólica média se divide em ramos esquerdo e direito.' }),
    ],
  },
  {
    id: 'jejunoileum-sup3', supply: true, title: t('Territories and venous drainage, both directions', 'Territórios e drenagem venosa, nos dois sentidos'),
    cards: [
      {
        id: 'ji-sup-territories', ref: '18–21', title: t('Who the SMA feeds, both directions', 'O que a AMS irriga, nos dois sentidos'),
        focus: ['sma', 'jejunum', 'ileum', 'ileocolic_a', 'right_colic_a'], ghost: ['duodenum', 'ascending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('### From artery to organ', '### Da artéria ao órgão'),
          t('The left branches of the superior mesenteric artery, the jejunal and ileal arteries, supply the jejunum and the ileum, except the distal end of the ileum. The ileocolic artery supplies the terminal ileum, the caecum and the appendix through its caecal, appendicular and ileal branches. The right colic artery supplies the ascending colon, and the middle colic artery supplies the transverse colon.',
            'Os ramos esquerdos da artéria mesentérica superior, as artérias jejunais e ileais, suprem o jejuno e o íleo, exceto a extremidade distal do íleo. A artéria ileocólica supre o íleo terminal, o ceco e o apêndice por seus ramos cecais, apendicular e ileal. A artéria cólica direita supre o cólon ascendente, e a artéria cólica média supre o cólon transverso.'),
          t('### From organ to artery', '### Do órgão à artéria'),
          t('Turn it around when you revise. The jejunum and ileum: jejunal and ileal arteries from the left side of the SMA. The terminal ileum, caecum and appendix: the ileal branch of the ileocolic artery and the terminal part of the SMA. The ascending colon: the right colic artery and the colic branch of the ileocolic. The narrower ileum has the smaller calibre of the two.',
            'Inverta ao revisar. Jejuno e íleo: artérias jejunais e ileais do lado esquerdo da AMS. Íleo terminal, ceco e apêndice: o ramo ileal da ileocólica e a porção terminal da AMS. Cólon ascendente: a artéria cólica direita e o ramo cólico da ileocólica. O íleo, mais estreito, tem o menor calibre dos dois.'),
        ],
      },
      {
        id: 'ji-sup-vein-tree', ref: '30', title: t('Venous drainage of the small intestine', 'Drenagem venosa do intestino delgado'),
        focus: ['hepatic_portal_v', 'smv', 'jejunum', 'ileum'], ghost: ['ascending_colon', 'transverse_colon', 'pancreas'], view: 'ant',
        diagram: VEIN_TREE,
        body: [
          t('Follow the drainage from the top. The jejunal and ileal veins anastomose to form venous arches. The straight veins (venae rectae) drain into the superior mesenteric vein, which joins the hepatic portal vein. Along the colon, the ileocolic, right colic and middle colic veins also drain toward the portal system alongside the superior mesenteric vein.',
            'Siga a drenagem de cima para baixo. As veias jejunais e ileais se anastomosam para formar arcadas venosas. As veias retas (venae rectae) drenam para a veia mesentérica superior, que se une à veia porta hepática. Ao longo do colo, as veias ileocólica, cólica direita e cólica média também drenam em direção ao sistema porta ao lado da veia mesentérica superior.'),
        ],
      },
      {
        id: 'ji-sup-lymph', ref: '48–51', title: t('Lymph drainage of the small intestine', 'Drenagem linfática do intestino delgado'),
        focus: ['jejunum', 'ileum', 'smv'], ghost: ['duodenum', 'pancreas', 'stomach'], view: 'ant',
        body: [
          t('Lymph collects in plexuses in the wall: submucosal, muscular and subserosal. From there the lymphatics follow the mesenteric arteries and veins through the mesentery, and the collecting vessels run between the two layers of the mesentery, parallel to the vessels.',
            'A linfa se reúne em plexos na parede: submucoso, muscular e subseroso. Dali os linfáticos seguem as artérias e veias mesentéricas pelo mesentério, e os vasos coletores correm entre as duas lâminas do mesentério, paralelos aos vasos.'),
          t('The pathway runs from the jejunum and ileum to the regional juxta-intestinal nodes, then to the superior mesenteric nodes, then to the intestinal trunk. These lymphatics connect with those of the liver, pancreas, stomach and first part of the large intestine. The small-intestine nodes are the largest group of lymph nodes in the body, about 100 to 150.',
            'O caminho vai do jejuno e do íleo aos linfonodos justaintestinais regionais, depois aos linfonodos mesentéricos superiores e então ao tronco intestinal. Esses linfáticos se conectam com os do fígado, pâncreas, estômago e primeira parte do intestino grosso. Os linfonodos do intestino delgado são o maior grupo de linfonodos do corpo, cerca de 100 a 150.'),
          t('The intestinal trunk ends in the cisterna chyli, which also receives the right and left lumbar trunks. The thoracic duct begins at the cisterna chyli.',
            'O tronco intestinal termina na cisterna do quilo, que também recebe os troncos lombares direito e esquerdo. O ducto torácico começa na cisterna do quilo.'),
        ],
      },
      {
        id: 'ji-sup-nerves', ref: '61', title: t('Innervation of the small intestine', 'Inervação do intestino delgado'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('Sympathetic fibres travel in the lesser and greater splanchnic nerves, and parasympathetic fibres come from the vagus. As for the duodenum, the fibres converge in the coeliac and superior mesenteric plexuses.',
            'As fibras simpáticas seguem nos nervos esplâncnicos menor e maior, e as parassimpáticas vêm do vago. Como no duodeno, as fibras convergem nos plexos celíaco e mesentérico superior.'),
        ],
      },
    ],
    questions: [
      q('18', { q: 'Which segment of the colon do the right branches of the SMA supply, up to the right colic flexure?', correct: 'The ascending colon and the right colic flexure', wrong: ['The sigmoid colon and rectum', 'The descending colon', 'The anal canal'], why: 'Slide 18: the SMA supplies the ascending colon and the right colic flexure.' },
        { q: 'Qual segmento do cólon os ramos direitos da AMS irrigam, até a flexura cólica direita?', correct: 'O cólon ascendente e a flexura cólica direita', wrong: ['O colo sigmoide e o reto', 'O colo descendente', 'O canal anal'], why: 'Slide 18: a AMS irriga o cólon ascendente e a flexura cólica direita.' }),
      q('21', { q: 'With which artery does the superior mesenteric artery end by anastomosing?', correct: 'The ileocolic artery, one of its own branches', wrong: ['The superior rectal artery', 'The left colic artery', 'The inferior pancreaticoduodenal artery'], why: 'Slide 21: the SMA terminates by anastomosing with its branch, the ileocolic artery.' },
        { q: 'Com qual artéria a artéria mesentérica superior termina por anastomose?', correct: 'A artéria ileocólica, um dos seus próprios ramos', wrong: ['A artéria retal superior', 'A artéria cólica esquerda', 'A artéria pancreaticoduodenal inferior'], why: 'Slide 21: a AMS termina se anastomosando com seu ramo, a artéria ileocólica.' }),
      q('30', { q: 'What do the jejunal and ileal veins form between them?', correct: 'Venous arches', wrong: ['A portal triad', 'A plexus around the pylorus', 'Straight veins running to the hepatic veins'], why: 'Slide 30: the jejunal and ileal veins anastomose to form venous arches.' },
        { q: 'O que as veias jejunais e ileais formam entre si?', correct: 'Arcadas venosas', wrong: ['Uma tríade portal', 'Um plexo ao redor do piloro', 'Veias retas até as veias hepáticas'], why: 'Slide 30: as veias jejunais e ileais se anastomosam e formam arcadas venosas.' }),
      q('6', { q: 'Which part of the small intestine has the narrower calibre?', correct: 'The ileum', wrong: ['The jejunum', 'The duodenum', 'The caecum'], why: 'Slide 6: the ileum is narrower than the jejunum, 3 cm outside and 2.5 cm inside against 4 and 3 cm.' },
        { q: 'Qual parte do intestino delgado tem o calibre mais estreito?', correct: 'O íleo', wrong: ['O jejuno', 'O duodeno', 'O ceco'], why: 'Slide 6: o íleo é mais estreito que o jejuno, 3 cm por fora e 2,5 cm por dentro, contra 4 e 3 cm.' }),
      q('49', { q: 'Which nodes does lymph from the jejunum and ileum reach first?', correct: 'The regional juxta-intestinal nodes', wrong: ['The superior mesenteric nodes', 'The cisterna chyli', 'The thoracic duct'], why: 'Slides 48–51: lymph goes from the jejunum and ileum to the regional juxta-intestinal nodes first.' },
        { q: 'Em quais linfonodos a linfa do jejuno e do íleo chega primeiro?', correct: 'Nos linfonodos justaintestinais regionais', wrong: ['Nos linfonodos mesentéricos superiores', 'Na cisterna do quilo', 'No ducto torácico'], why: 'Slides 48–51: a linfa vai primeiro aos linfonodos justaintestinais regionais.' }),
      q('50', { q: 'Where does the intestinal trunk end?', correct: 'In the cisterna chyli', wrong: ['In the right lymphatic duct directly', 'In the inferior vena cava directly', 'In the juxta-intestinal nodes'], why: 'Slides 48–51: the intestinal trunk drains into the cisterna chyli.' },
        { q: 'Onde termina o tronco intestinal?', correct: 'Na cisterna do quilo', wrong: ['Diretamente no ducto linfático direito', 'Diretamente na veia cava inferior', 'Nos linfonodos justaintestinais'], why: 'Slides 48–51: o tronco intestinal drena para a cisterna do quilo.' }),
      q('61', { q: 'Which nerves carry the sympathetic fibres to the small intestine?', correct: 'The greater and lesser splanchnic nerves', wrong: ['The vagus nerve', 'The pelvic splanchnic nerves', 'The phrenic nerves'], why: 'Slide 61: the sympathetic fibres travel in the lesser and greater splanchnic nerves.' },
        { q: 'Quais nervos levam as fibras simpáticas ao intestino delgado?', correct: 'Os nervos esplâncnicos maior e menor', wrong: ['O nervo vago', 'Os nervos esplâncnicos pélvicos', 'Os nervos frênicos'], why: 'Slide 61: as fibras simpáticas seguem nos nervos esplâncnicos menor e maior.' }),
      q('61', { q: 'In which two plexuses do the fibres to the small intestine converge?', correct: 'The coeliac and superior mesenteric plexuses', wrong: ['The hypogastric and pelvic plexuses', 'The cardiac and pulmonary plexuses', 'The pharyngeal plexus'], why: 'Slide 61: the fibres converge in the coeliac and superior mesenteric plexuses.' },
        { q: 'Em quais dois plexos convergem as fibras para o intestino delgado?', correct: 'Plexos celíaco e mesentérico superior', wrong: ['Plexos hipogástrico e pélvico', 'Plexos cardíaco e pulmonar', 'Plexo faríngeo'], why: 'Slide 61: as fibras convergem nos plexos celíaco e mesentérico superior.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
