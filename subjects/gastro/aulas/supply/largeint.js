// SpeedGastro · Large intestine supply blocks: the SMA colic branches, the IMA branches,
// the marginal artery with the arch of Riolan, straight arteries, and venous drainage.
// Facts only from deck 10 (p21 mesoappendix, p38–47 arteries, p48 veins), with the SMA
// colic branches from deck 09 (p18, p26–29) where deck 10 refers to them.
// The proportion of the transverse colon given to the SMA differs between decks; both are recorded.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
const q = (ref, en, pt) => ({ ref, ...en, pt });

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  sma: t('Superior mesenteric artery (midgut)', 'Artéria mesentérica superior (intestino médio)'),
  ima: t('Inferior mesenteric artery (hindgut, L3)', 'Artéria mesentérica inferior (intestino posterior, L3)'),
  ic: t('Ileocolic artery', 'Artéria ileocólica'),
  icc: t('Superior colic branch of the ileocolic artery', 'Ramo cólico superior da artéria ileocólica'),
  rc: t('Right colic artery', 'Artéria cólica direita'),
  mc: t('Middle colic artery', 'Artéria cólica média'),
  lc: t('Left colic artery', 'Artéria cólica esquerda'),
  lca: t('Ascending branch of the left colic artery', 'Ramo ascendente da artéria cólica esquerda'),
  lcd: t('Descending branch of the left colic artery', 'Ramo descendente da artéria cólica esquerda'),
  sig: t('Sigmoid arteries', 'Artérias sigmoides'),
  hs: t('Highest sigmoid artery', 'Artéria sigmoide mais alta'),
  srec: t('Superior rectal artery', 'Artéria retal superior'),
  mrec: t('Middle rectal artery (internal iliac)', 'Artéria retal média (ilíaca interna)'),
  irec: t('Inferior rectal artery (internal pudendal)', 'Artéria retal inferior (pudenda interna)'),
  marg: t('Marginal artery of Drummond', 'Artéria marginal de Drummond'),
  riolan: t('Arch of Riolan', 'Arco de Riolan'),
  vl: t('Vasa longa', 'Vasa longa'),
  vb: t('Vasa brevia', 'Vasa brevia'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  smv: t('Superior mesenteric vein', 'Veia mesentérica superior'),
  imv: t('Inferior mesenteric vein', 'Veia mesentérica inferior'),
  colv: t('Colic veins', 'Veias cólicas'),
  terr: t('Gut territories', 'Territórios intestinais'),
  mid: t('Midgut: SMA', 'Intestino médio: AMS'),
  hind: t('Hindgut: IMA', 'Intestino posterior: AMI'),
  app: t('Appendix and caecum', 'Apêndice e ceco'),
  asc: t('Ascending colon', 'Colo ascendente'),
  ptc: t('Proximal part of the transverse colon', 'Parte proximal do colo transverso'),
  dtc: t('Distal third of the transverse colon', 'Terço distal do colo transverso'),
  dsc: t('Descending and sigmoid colon', 'Colo descendente e sigmoide'),
  rect: t('Rectum and upper anal canal', 'Reto e canal anal superior'),
};

const TERRITORY_TREE = {
  root: { label: L.terr, children: [
    { label: L.mid, children: [{ label: L.app }, { label: L.asc }, { label: L.ptc, note: t('2/3 here, half on deck 09', '2/3 aqui, metade no deck 09') }] },
    { label: L.hind, children: [{ label: L.dtc }, { label: L.dsc }, { label: L.rect }] },
  ] },
  links: [],
};

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.sma, children: [
      { label: L.ic, children: [{ label: L.icc }] },
      { label: L.rc },
      { label: L.mc },
    ] },
    { label: L.ima, note: t('L3', 'L3'), children: [
      { label: L.lc, children: [{ label: L.lca }, { label: L.lcd }] },
      { label: L.sig, children: [{ label: L.hs }] },
      { label: L.srec, children: [{ label: L.mrec }, { label: L.irec }] },
    ] },
  ] },
  links: [
    { from: L.icc, to: L.rc, label: t('descending branch of the right colic', 'ramo descendente da cólica direita') },
    { from: L.rc, to: L.mc, label: t('ascending branch of the right colic to the middle colic', 'ramo ascendente da cólica direita à cólica média') },
    { from: L.lca, to: L.mc, label: t('ascending branch of the left colic joins the middle colic', 'ramo ascendente da cólica esquerda une-se à cólica média') },
    { from: L.lcd, to: L.hs, label: t('descending branch of the left colic joins the highest sigmoid', 'ramo descendente da cólica esquerda une-se à sigmoide mais alta') },
    { from: L.srec, to: L.mrec, label: t('superior rectal and middle rectal anastomosis', 'anastomose retal superior e retal média') },
    { from: L.srec, to: L.irec, label: t('superior rectal and inferior rectal anastomosis', 'anastomose retal superior e retal inferior') },
  ],
};

const VEIN_TREE = {
  root: { label: L.colv, children: [
    { label: L.smv },
    { label: L.imv },
  ] },
  links: [],
};

const NERVE_TREE_LI = {
  root: { label: t('Innervation of the large intestine', 'Inervação do intestino grosso'), children: [
    { label: t('Sympathetic', 'Simpático'), note: t('T10–T12', 'T10–T12'), children: [
      { label: t('Superior mesenteric ganglion', 'Gânglio mesentérico superior') },
      { label: t('Inferior mesenteric ganglion', 'Gânglio mesentérico inferior') },
    ] },
    { label: t('Parasympathetic', 'Parassimpático'), children: [{ label: t('Vagus nerve (CN X)', 'Nervo vago (NC X)') }] },
    { label: t('Sacral nerves', 'Nervos sacrais'), children: [
      { label: t('Urinary bladder and genital system, not the colon', 'Bexiga urinária e sistema genital, não o colo') },
    ] },
  ] },
  links: [],
};

export const blocks = [
  {
    id: 'largeint-sup1', supply: true, title: t('Supply sheet: territories, SMA colic branches and IMA branches', 'Ficha de suprimento: territórios, ramos cólicos da AMS e ramos da AMI'),
    cards: [
      {
        id: 'li-sup-territories', ref: '38–40', title: t('Arterial territories of the large intestine', 'Territórios arteriais do intestino grosso'),
        focus: ['sma', 'ima', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a'], ghost: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum'], view: 'ant',
        diagram: TERRITORY_TREE,
        body: [
          t('The large intestine is supplied by the same three gut territories as the rest of the tube. The superior mesenteric artery (midgut) supplies the appendix, the caecum, the ascending colon and the proximal part of the transverse colon. The inferior mesenteric artery (hindgut), which arises at L3, supplies the distal third of the transverse colon, the descending and sigmoid colon, the rectum and the upper anal canal.',
            'O intestino grosso é irrigado pelos mesmos três territórios intestinais do restante do tubo. A artéria mesentérica superior (intestino médio) irriga o apêndice, o ceco, o colo ascendente e a parte proximal do colo transverso. A artéria mesentérica inferior (intestino posterior), que nasce em L3, irriga o terço distal do colo transverso, o colo descendente e sigmoide, o reto e o canal anal superior.'),
          t('⚠ Deck 09 gives the SMA the proximal half of the transverse colon, while this deck gives the proximal two thirds. Both values are recorded here, and the material does not settle which is right.',
            '⚠ O deck 09 dá à AMS a metade proximal do colo transverso, enquanto este deck dá os dois terços proximais. Os dois valores ficam registrados aqui, e o material não diz qual está certo.'),
        ],
      },
      {
        id: 'li-sup-sma-colic', ref: '21, 28–29', title: t('The SMA colic branches: right and middle colic', 'Os ramos cólicos da AMS: cólica direita e média'),
        focus: ['sma', 'right_colic_a', 'middle_colic_a', 'ileocolic_a'], ghost: ['ascending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('The right colic artery arises from the right side of the superior mesenteric artery. It runs posteriorly, behind the parietal peritoneum, toward the right, and it has many variants. Near the ascending colon it divides into a descending branch, which anastomoses with the superior colic branch of the ileocolic artery, and an ascending branch, which anastomoses with the right branch of the middle colic artery.',
            'A artéria cólica direita nasce do lado direito da artéria mesentérica superior. Corre posteriormente, atrás do peritônio parietal, em direção à direita, e tem muitas variações. Perto do colo ascendente se divide em um ramo descendente, que se anastomosa com o ramo cólico superior da artéria ileocólica, e um ramo ascendente, que se anastomosa com o ramo direito da artéria cólica média.'),
          t('The middle colic artery originates below the pancreas and runs forward and to the right, in the two sheets of the transverse mesocolon. It divides into a left and a right branch. These anastomose with the left and right colic arteries, forming arcades that supply the transverse colon.',
            'A artéria cólica média origina-se abaixo do pâncreas e corre para a frente e para a direita, nas duas lâminas do mesocolo transverso. Divide-se em um ramo esquerdo e um direito. Eles se anastomosam com as artérias cólicas esquerda e direita, formando arcadas que suprem o colo transverso.'),
        ],
      },
      {
        id: 'li-sup-ima', ref: '41–46', title: t('The IMA branches: left colic, sigmoid and superior rectal', 'Os ramos da AMI: cólica esquerda, sigmoides e retal superior'),
        focus: ['ima', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a', 'descending_colon', 'rectum'], ghost: ['transverse_colon', 'rectum'], view: 'ant',
        body: [
          t('The left colic artery runs upward behind the peritoneum and divides into an ascending branch, which enters the transverse mesocolon to anastomose with the middle colic artery, and a descending branch, which anastomoses with the highest sigmoid artery. It supplies the descending colon and the transverse colon.',
            'A artéria cólica esquerda sobe atrás do peritônio e se divide em um ramo ascendente, que entra no mesocolo transverso para se anastomosar com a artéria cólica média, e um ramo descendente, que se anastomosa com a artéria sigmoide mais alta. Ela supre o colo descendente e o colo transverso.'),
          t('The sigmoid arteries run obliquely down to the left, behind the peritoneum, and form arcades that supply the descending and sigmoid colon. The last sigmoid artery anastomoses with the superior rectal artery, forming the rectosigmoid anastomosis, which is not always present. The superior rectal artery, the terminal branch of the IMA, runs in the sigmoid mesocolon into the pelvis. At S3 it divides into two branches that descend along the rectum and reach the mucosa down to the internal anal sphincter, where they anastomose with the middle and inferior rectal arteries.',
            'As artérias sigmoides descem obliquamente para a esquerda, atrás do peritônio, e formam arcadas que suprem o colo descendente e o sigmoide. A última artéria sigmoide se anastomosa com a artéria retal superior, formando a anastomose retossigmoide, que nem sempre está presente. A artéria retal superior, ramo terminal da AMI, corre no mesocolo sigmoide até a pelve. Em S3 se divide em dois ramos que descem ao longo do reto e atingem a mucosa até o esfíncter anal interno, onde se anastomosam com as artérias retais média e inferior.'),
        ],
      },
    ],
    questions: [
      q('38', { q: 'Which artery supplies the appendix and the caecum?', correct: 'The superior mesenteric artery', wrong: ['The inferior mesenteric artery', 'The celiac trunk', 'The superior rectal artery'], why: 'The midgut artery supplies the appendix and caecum.' },
        { q: 'Qual artéria irriga o apêndice e o ceco?', correct: 'A artéria mesentérica superior', wrong: ['A artéria mesentérica inferior', 'O tronco celíaco', 'A artéria retal superior'], why: 'A artéria do intestino médio irriga o apêndice e o ceco.' }),
      q('40', { q: 'Which segment of the anal canal does the hindgut territory reach?', correct: 'The upper anal canal', wrong: ['The lower anal canal', 'The anal verge', 'The perianal skin'], why: 'The IMA territory includes the upper anal canal.' },
        { q: 'Qual segmento do canal anal o território do intestino posterior alcança?', correct: 'O canal anal superior', wrong: ['O canal anal inferior', 'A margem anal', 'A pele perianal'], why: 'O território da AMI inclui o canal anal superior.' }),
      q('28', { q: 'In which direction does the right colic artery run after leaving the SMA?', correct: 'Posteriorly behind the parietal peritoneum, toward the right', wrong: ['Anteriorly across the transverse mesocolon', 'Downward into the pelvis', 'Behind the duodenum toward the left'], why: 'From the right side of the SMA it runs posteriorly to the parietal peritoneum, towards the right.' },
        { q: 'Em qual direção a artéria cólica direita corre depois de deixar a AMS?', correct: 'Posteriormente, atrás do peritônio parietal, em direção à direita', wrong: ['Anteriormente, atravessando o mesocolo transverso', 'Para baixo, na pelve', 'Atrás do duodeno, para a esquerda'], why: 'Do lado direito da AMS corre posteriormente ao peritônio parietal, em direção à direita.' }),
      q('29', { q: 'In which two sheets does the middle colic artery run?', correct: 'The two sheets of the transverse mesocolon', wrong: ['The two sheets of the lesser omentum', 'The two sheets of the mesentery of the small intestine', 'The two sheets of the greater omentum'], why: 'The middle colic runs in the two sheets of the mesocolon.' },
        { q: 'Em quais duas lâminas corre a artéria cólica média?', correct: 'As duas lâminas do mesocolo transverso', wrong: ['As duas lâminas do omento menor', 'As duas lâminas do mesentério do intestino delgado', 'As duas lâminas do omento maior'], why: 'A cólica média corre nas duas lâminas do mesocolo.' }),
      q('41', { q: 'Which artery does the descending branch of the left colic artery meet at the sigmoid level?', correct: 'The highest sigmoid artery', wrong: ['The middle colic artery', 'The right colic artery', 'The ileocolic artery'], why: 'The descending branch anastomoses with the highest sigmoid artery.' },
        { q: 'Com qual artéria o ramo descendente da cólica esquerda se encontra no nível sigmoide?', correct: 'A artéria sigmoide mais alta', wrong: ['A artéria cólica média', 'A artéria cólica direita', 'A artéria ileocólica'], why: 'O ramo descendente se anastomosa com a sigmoide mais alta.' }),
      q('45', { q: 'How do the sigmoid arteries run?', correct: 'Obliquely down to the left, behind the peritoneum, forming arcades', wrong: ['Straight up alongside the aorta', 'Inside the mucosa of the rectum', 'Forward across the sigmoid mesocolon to the umbilicus'], why: 'They descend obliquely to the left, posterior to the peritoneum, and form arcades.' },
        { q: 'Como correm as artérias sigmoides?', correct: 'Obliquamente para baixo e para a esquerda, atrás do peritônio, formando arcadas', wrong: ['Retas para cima, ao lado da aorta', 'Dentro da mucosa do reto', 'Para a frente, atravessando o mesocolo sigmoide até o umbigo'], why: 'Descem obliquamente para a esquerda, atrás do peritônio, e formam arcadas.' }),
    ],
  },
  {
    id: 'largeint-sup2', supply: true, title: t('Branching: the SMA and IMA colic tree', 'Ramificação: a árvore cólica da AMS e da AMI'),
    cards: [
      {
        id: 'li-sup-tree', ref: '38–46', title: t('Walk the colic branches from both trunks', 'Percorra os ramos cólicos a partir dos dois troncos'),
        focus: ['abdominal_aorta_g', 'sma', 'ima', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a'], ghost: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud: the SMA with its ileocolic, right colic and middle colic branches first, then the IMA with its left colic, sigmoid and superior rectal branches. The six links mark the anastomoses that join the two trunks.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta: primeiro a AMS com seus ramos ileocólico, cólico direito e cólico médio, depois a AMI com seus ramos cólico esquerdo, sigmoides e retal superior. Os seis elos marcam as anastomoses que unem os dois troncos.'),
          t('### Where the two trunks meet', '### Onde os dois troncos se encontram'),
          t('The right colic and middle colic arteries join at the marginal artery, and the left colic artery joins the middle colic at the transverse mesocolon. The superior rectal artery is the terminal IMA branch, and it anastomoses with the middle and inferior rectal arteries at the anal canal.',
            'As artérias cólicas direita e média se unem na artéria marginal, e a artéria cólica esquerda se une à média no mesocolo transverso. A artéria retal superior é o ramo terminal da AMI e se anastomosa com as artérias retais média e inferior no canal anal.'),
        ],
      },
    ],
    questions: [
      q('46', { q: 'From which vessel does the middle rectal artery arise?', correct: 'The internal iliac artery', wrong: ['The inferior mesenteric artery', 'The internal pudendal artery', 'The superior rectal artery'], why: 'The middle rectal artery comes from the internal iliac artery.' },
        { q: 'De qual vaso nasce a artéria retal média?', correct: 'Da artéria ilíaca interna', wrong: ['Da artéria mesentérica inferior', 'Da artéria pudenda interna', 'Da artéria retal superior'], why: 'A artéria retal média vem da artéria ilíaca interna.' }),
      q('45', { q: 'Is the rectosigmoid anastomosis always present?', correct: 'No, it is not always present', wrong: ['Yes, it is always present', 'It is present only in children', 'It is present only in the sigmoid mesocolon of women'], why: 'The rectosigmoid anastomosis is not always present.' },
        { q: 'A anastomose retossigmoide está sempre presente?', correct: 'Não, nem sempre está presente', wrong: ['Sim, está sempre presente', 'Está presente apenas em crianças', 'Está presente apenas no mesocolo sigmoide das mulheres'], why: 'A anastomose retossigmoide nem sempre está presente.' }),
      q('28', { q: 'Which colic artery has a descending branch that joins the superior colic branch of the ileocolic artery?', correct: 'The right colic artery', wrong: ['The middle colic artery', 'The left colic artery', 'The superior rectal artery'], why: 'The descending branch of the right colic anastomoses with the superior colic branch of the ileocolic.' },
        { q: 'Qual artéria cólica tem um ramo descendente que se une ao ramo cólico superior da ileocólica?', correct: 'A artéria cólica direita', wrong: ['A artéria cólica média', 'A artéria cólica esquerda', 'A artéria retal superior'], why: 'O ramo descendente da cólica direita se anastomosa com o ramo cólico superior da ileocólica.' }),
      q('29', { q: 'What do the left and right branches of the middle colic artery join to form arcades?', correct: 'The left and right colic arteries', wrong: ['The superior and inferior rectal arteries', 'The internal iliac and internal pudendal arteries', 'The left gastric and splenic arteries'], why: 'The left and right branches anastomose with the left and right colic arteries to form arcades.' },
        { q: 'Com o que se unem os ramos esquerdo e direito da artéria cólica média para formar arcadas?', correct: 'Com as artérias cólicas esquerda e direita', wrong: ['Com as artérias retais superior e inferior', 'Com as artérias ilíaca interna e pudenda interna', 'Com as artérias gástrica esquerda e esplênica'], why: 'Os ramos esquerdo e direito se anastomosam com as artérias cólicas esquerda e direita, formando arcadas.' }),
    ],
  },
  {
    id: 'largeint-sup3', supply: true, title: t('Marginal artery, straight arteries and venous drainage', 'Artéria marginal, artérias retas e drenagem venosa'),
    cards: [
      {
        id: 'li-sup-marginal', ref: '42–44', title: t('The marginal artery and the straight arteries, both directions', 'A artéria marginal e as artérias retas, nos dois sentidos'),
        focus: ['sigmoid_a', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'transverse_colon'], ghost: ['ascending_colon', 'descending_colon'], view: 'ant',
        body: [
          t('### From the arcade to the wall', '### Da arcada à parede'),
          t('The marginal artery of Drummond is formed by the midgut and hindgut arteries joining, through branches of the ileocolic, right colic, middle colic and left colic arteries. It runs in the mesentery and gives short terminal branches to the large intestine. Its weakest point is at the junction of midgut and hindgut, in the distal transverse colon near the splenic flexure. An inner arc, the arch of Riolan, can supply that region. It is formed by the main trunk of the middle colic artery and the ascending branch of the left colic artery.',
            'A artéria marginal de Drummond é formada pela união das artérias do intestino médio e do posterior, por meio de ramos das artérias ileocólica, cólica direita, cólica média e cólica esquerda. Corre no mesentério e dá pequenos ramos terminais ao intestino grosso. Seu ponto mais fraco fica na junção dos intestinos médio e posterior, no colo transverso distal, perto da flexura esplênica. Um arco interno, o arco de Riolan, pode irrigar essa região. É formado pelo tronco principal da artéria cólica média e pelo ramo ascendente da artéria cólica esquerda.'),
          t('### From the arcade to the straight arteries', '### Da arcada às artérias retas'),
          t('From the marginal artery, straight arteries reach the wall. The vasa longa run in the serosa and give branches to the epiploic appendages; the fat in those appendages depends on this supply. The vasa brevia pierce the circular muscle layer to supply the submucosa and mucosa. The holes they make are weak points that predispose to herniation and diverticula. In the colon only the vasa brevia pierce the muscular layer, while all the vasa recta of the jejunum and ileum do.',
            'A partir da artéria marginal, artérias retas chegam à parede. As vasa longa correm na serosa e dão ramos às apêndices epiploicas; a gordura dessas apêndices depende desse suprimento. As vasa brevia atravessam a camada muscular circular para suprir a submucosa e a mucosa. Os orifícios que fazem são pontos fracos que predispõem a hérnias e divertículos. No colo, só as vasa brevia atravessam a camada muscular, enquanto todas as vasa recta do jejuno e do íleo atravessam.'),
        ],
      },
      {
        id: 'li-sup-vein-tree', ref: '48', title: t('Venous drainage of the colon', 'Drenagem venosa do colo'),
        focus: ['hepatic_portal_v', 'smv', 'imv'], ghost: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum'], view: 'ant',
        diagram: VEIN_TREE,
        body: [
          t('Tap the tree from the top. The colic veins drain to the superior mesenteric vein and to the inferior mesenteric vein, and these lead to the portal vein.',
            'Toque a árvore de cima para baixo. As veias cólicas drenam para a veia mesentérica superior e para a veia mesentérica inferior, e estas levam à veia porta.'),
        ],
      },
      {
        id: 'li-sup-lymph', ref: '49', title: t('Lymph node groups of the large intestine', 'Grupos de linfonodos do intestino grosso'),
        focus: ['ascending_colon', 'transverse_colon', 'descending_colon', 'sigmoid_a', 'rectum'], ghost: ['sma', 'ima'], view: 'ant',
        body: [
          t('Lymphatics follow the arteries, and rectal cancers spread along them. Along the large intestine, lymph drains through these node groups: paracolic; middle colic, right colic and ileocolic, upper and lower; anterior and posterior caecal and appendicular; superior mesenteric and inferior mesenteric; left colic, ascending and descending, and sigmoid; superior rectal, perirectal, internal iliac and superficial inguinal.',
            'Os linfáticos seguem as artérias, e os cânceres retais se espalham por eles. Ao longo do intestino grosso, a linfa drena por estes grupos de linfonodos: paracólicos; cólico médio, cólico direito e ileocólicos, superiores e inferiores; cecais anteriores e posteriores e apendiculares; mesentéricos superiores e inferiores; cólico esquerdo, ascendente e descendente, e sigmoides; retal superior, perirretais, ilíacos internos e inguinais superficiais.'),
        ],
      },
      {
        id: 'li-sup-nerves', ref: '53', title: t('Innervation of the large intestine', 'Inervação do intestino grosso'),
        focus: ['sma', 'ima'], ghost: ['ascending_colon', 'transverse_colon', 'descending_colon'], view: 'ant',
        diagram: NERVE_TREE_LI,
        body: [
          t('The sympathetic supply is T10 to T12, relayed through the superior mesenteric ganglion, while the inferior mesenteric ganglion also lies along the sympathetic outflow to the large intestine. The parasympathetic supply to the large intestine is the vagus nerve.',
            'O suprimento simpático é de T10 a T12, com relé no gânglio mesentérico superior, enquanto o gânglio mesentérico inferior também integra a via simpática para o intestino grosso. O suprimento parassimpático para o intestino grosso é o nervo vago.'),
          t('By contrast, the sacral nerves supply the urinary bladder and the genital system, not the colon.',
            'Já os nervos sacrais suprem a bexiga urinária e o sistema genital, e não o colo.'),
        ],
      },
    ],
    questions: [
      q('42', { q: 'Which four colic and ileocolic arteries contribute to the marginal artery of Drummond?', correct: 'Ileocolic, right colic, middle colic and left colic', wrong: ['Superior rectal, middle rectal, inferior rectal and internal iliac', 'Sigmoid, superior rectal and inferior mesenteric', 'Celiac, superior mesenteric, inferior mesenteric and renal'], why: 'The marginal arcade is formed by branches of the ileocolic, right, middle and left colic arteries.' },
        { q: 'Quais quatro artérias ileocólica e cólicas contribuem para a artéria marginal de Drummond?', correct: 'Ileocólica, cólica direita, cólica média e cólica esquerda', wrong: ['Retal superior, retal média, retal inferior e ilíaca interna', 'Sigmoides, retal superior e mesentérica inferior', 'Celíaca, mesentérica superior, mesentérica inferior e renal'], why: 'A arcada marginal é formada por ramos das artérias ileocólica, cólica direita, média e esquerda.' }),
      q('43', { q: 'Which straight vessels pierce the circular muscle layer of the colon?', correct: 'Vasa brevia', wrong: ['Vasa longa', 'The arch of Riolan', 'The marginal artery itself'], why: 'In the colon only the vasa brevia pierce the muscular layer.' },
        { q: 'Quais vasos retos atravessam a camada muscular circular do colo?', correct: 'Vasa brevia', wrong: ['Vasa longa', 'O arco de Riolan', 'A própria artéria marginal'], why: 'No colo somente as vasa brevia atravessam a camada muscular.' }),
      q('44', { q: 'Why are the vasa brevia linked to herniation and diverticula?', correct: 'Where they pierce the circular muscle layer, the wall is weaker', wrong: ['They lie outside the serosa and stretch it', 'They supply only the epiploic appendages', 'They run inside the mesocolon and compress the lumen'], why: 'Piercing the circular muscle creates sites of reduced structural resistance, predisposing to herniation and diverticulum.' },
        { q: 'Por que as vasa brevia estão ligadas a hérnias e divertículos?', correct: 'Onde atravessam a camada muscular circular, a parede fica mais fraca', wrong: ['Ficam fora da serosa e a esticam', 'Suprem apenas as apêndices epiploicas', 'Correm dentro do mesocolo e comprimem a luz'], why: 'Atravessar a camada circular cria pontos de menor resistência, que predispõem a hérnia e divertículo.' }),
      q('42', { q: 'Which two vessels form the arch of Riolan?', correct: 'The main trunk of the middle colic artery and the ascending branch of the left colic artery', wrong: ['The right colic and the superior rectal arteries', 'The sigmoid arteries and the descending branch of the left colic', 'The ileocolic and the inferior pancreaticoduodenal arteries'], why: 'The arch of Riolan is formed by the middle colic main trunk and the ascending branch of the left colic.' },
        { q: 'Quais dois vasos formam o arco de Riolan?', correct: 'O tronco principal da artéria cólica média e o ramo ascendente da artéria cólica esquerda', wrong: ['As artérias cólica direita e retal superior', 'As artérias sigmoides e o ramo descendente da cólica esquerda', 'As artérias ileocólica e pancreaticoduodenal inferior'], why: 'O arco de Riolan é formado pelo tronco principal da cólica média e pelo ramo ascendente da cólica esquerda.' }),
      q('49', { q: 'Which superficial node group is named among the lymph nodes of the large intestine?', correct: 'Superficial inguinal nodes', wrong: ['Axillary nodes', 'Cervical nodes', 'Popliteal nodes'], why: 'The node groups include superficial inguinal nodes.' },
        { q: 'Qual grupo de linfonodos superficiais é citado entre os do intestino grosso?', correct: 'Linfonodos inguinais superficiais', wrong: ['Linfonodos axilares', 'Linfonodos cervicais', 'Linfonodos poplíteos'], why: 'Os grupos incluem os linfonodos inguinais superficiais.' }),
      q('49', { q: 'Which node groups are named as upper and lower?', correct: 'Ileocolic nodes', wrong: ['Paracolic nodes', 'Sigmoid nodes', 'Superior rectal nodes'], why: 'The ileocolic nodes are named as upper and lower.' },
        { q: 'Quais linfonodos são citados como superiores e inferiores?', correct: 'Linfonodos ileocólicos', wrong: ['Linfonodos paracólicos', 'Linfonodos sigmoides', 'Linfonodos retais superiores'], why: 'Os linfonodos ileocólicos são citados como superiores e inferiores.' }),
      q('53', { q: 'Through which ganglion does the sympathetic supply of the large intestine relay?', correct: 'The superior mesenteric ganglion', wrong: ['The ciliary ganglion', 'The otic ganglion', 'The pterygopalatine ganglion'], why: 'The sympathetic supply, T10–T12, passes through the superior mesenteric ganglion.' },
        { q: 'Por qual gânglio passa o suprimento simpático do intestino grosso?', correct: 'O gânglio mesentérico superior', wrong: ['O gânglio ciliar', 'O gânglio ótico', 'O gânglio pterigopalatino'], why: 'O suprimento simpático, T10–T12, passa pelo gânglio mesentérico superior.' }),
      q('53', { q: 'Where do the sacral parasympathetic nerves go?', correct: 'To the urinary bladder and genital system, not to the colon', wrong: ['To the transverse colon', 'To the rectum only', 'To the small intestine'], why: 'The sacral nerves go to the urinary bladder and genital system, not to the colon.' },
        { q: 'Para onde vão os nervos parassimpáticos sacrais?', correct: 'À bexiga urinária e ao sistema genital, não ao colo', wrong: ['Ao colo transverso', 'Apenas ao reto', 'Ao intestino delgado'], why: 'Os nervos sacrais vão à bexiga e ao sistema genital, não ao colo.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
