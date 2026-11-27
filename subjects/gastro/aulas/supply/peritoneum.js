// SpeedGastro · Peritoneum supply blocks: the fundamentals block (autonomic nervous
// system and the gut supply scheme), the supply sheet for the peritoneal organs, and
// branching and territories in both directions.
// Facts only from deck 05 (p02–13 autonomic system, p20–21 peritoneal structures,
// p23–24 embryonic gut arteries, p25–26 lesser omentum, p32–33 transverse mesocolon,
// p36 vessels and nodes, p39 mesentery, p43–48 omental bursa and foramen).
// Deck 05 gives no origin for the ileocolic, inferior pancreaticoduodenal, jejunal or
// sigmoid arteries, so the branching tree does not attach them to a parent.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const L = {
  aorta: t('Abdominal aorta', 'Aorta abdominal'),
  celiac: t('Celiac trunk', 'Tronco celíaco'),
  sma: t('Superior mesenteric artery', 'Artéria mesentérica superior'),
  ima: t('Inferior mesenteric artery', 'Artéria mesentérica inferior'),
  lg: t('Left gastric artery', 'Artéria gástrica esquerda'),
  spl: t('Splenic artery', 'Artéria esplênica'),
  ch: t('Common hepatic artery', 'Artéria hepática comum'),
  ph: t('Proper hepatic artery', 'Artéria hepática própria'),
  hpv: t('Hepatic portal vein', 'Veia porta hepática'),
  hdl: t('Hepatoduodenal ligament', 'Ligamento hepatoduodenal'),
  ans: t('Autonomic nervous system', 'Sistema nervoso autônomo'),
  symp: t('Sympathetic: thoracolumbar', 'Simpático: toracolombar'),
  splanch: t('Greater and lesser splanchnic nerves', 'Nervos esplâncnicos maior e menor'),
  prev: t('Prevertebral ganglia', 'Gânglios pré-vertebrais'),
  cg: t('Celiac ganglion', 'Gânglio celíaco'),
  smg: t('Superior mesenteric ganglion', 'Gânglio mesentérico superior'),
  aorg: t('Aorticorenal ganglion', 'Gânglio aórtico-renal'),
  img: t('Inferior mesenteric ganglion', 'Gânglio mesentérico inferior'),
  para: t('Parasympathetic: craniosacral', 'Parassimpático: craniossacral'),
  vagus: t('Vagus nerve (CN X)', 'Nervo vago (NC X)'),
  vplex: t('Cardiac, pulmonary, esophageal and abdominal (celiac) plexuses', 'Plexos cardíaco, pulmonar, esofágico e abdominal (celíaco)'),
  pelvic: t('Pelvic splanchnic nerves (sacral)', 'Nervos esplâncnicos pélvicos (sacrais)'),
  ihp: t('Inferior hypogastric plexus', 'Plexo hipogástrico inferior'),
};

const NERVE_TREE = {
  root: { label: L.ans, children: [
    { label: L.symp, note: t('T1–L2', 'T1–L2'), children: [
      { label: L.splanch, children: [{ label: L.prev, children: [
        { label: L.cg }, { label: L.smg }, { label: L.aorg }, { label: L.img },
      ] }] },
    ] },
    { label: L.para, children: [
      { label: L.vagus, children: [{ label: L.vplex }] },
      { label: L.pelvic, children: [{ label: L.ihp }] },
    ] },
  ] },
};

const ARTERY_TREE = {
  root: { label: L.aorta, children: [
    { label: L.celiac, note: t('with the dorsal mesogastrium', 'com o mesogástrio dorsal'), children: [
      { label: L.lg },
      { label: L.spl },
      { label: L.ch, children: [{ label: L.ph, note: t('in the hepatoduodenal ligament', 'no ligamento hepatoduodenal') }] },
    ] },
    { label: L.sma, note: t('dorsal mesentery of the midgut', 'mesentério dorsal do intestino médio') },
    { label: L.ima, note: t('mesocolon of the hindgut', 'mesocolo do intestino posterior') },
  ] },
  links: [],
};

const q = (ref, en, pt) => ({ ref, ...en, pt });

export const blocks = [
  {
    id: 'peritoneum-sup1', supply: true, title: t('Fundamentals: autonomic supply and the gut scheme', 'Fundamentos: suprimento autônomo e o esquema do intestino'),
    cards: [
      {
        id: 'per-sup-ans', ref: '2–13', title: t('The autonomic nervous system: the two divisions', 'O sistema nervoso autônomo: as duas divisões'),
        focus: ['celiac_trunk', 'sma', 'ima'], ghost: ['stomach', 'duodenum', 'spleen', 'pancreas'], view: 'ant',
        diagram: NERVE_TREE,
        body: [
          t('### Two neurons, not one', '### Dois neurônios, e não um'),
          t('The autonomic system differs from the somatic one in its neurons. A visceral motor neuron in the CNS sends a myelinated preganglionic fibre to a second neuron in a peripheral ganglion, and that neuron sends an unmyelinated postganglionic fibre to the effector: cardiac muscle, smooth muscle or glands. The somatic motor pathway is a single myelinated fibre, releasing ACh, straight to skeletal muscle.',
            'O sistema autônomo se diferencia do somático pelos neurônios. Um neurônio motor visceral do SNC envia uma fibra pré-ganglionar mielinizada a um segundo neurônio num gânglio periférico, e esse neurônio envia uma fibra pós-ganglionar amielínica ao efetor: músculo cardíaco, músculo liso ou glândulas. A via motora somática é uma única fibra mielinizada, que libera ACh, direto ao músculo esquelético.'),
          t('### Sympathetic', '### Simpático'),
          t('The sympathetic division is thoracolumbar, T1–L2. Its ganglia lie beside the spinal cord, in the sympathetic trunk. The greater and lesser splanchnic nerves run to the prevertebral ganglia: the celiac, superior mesenteric, aorticorenal and inferior mesenteric ganglia. Grey rami communicantes return to the spinal nerves for sweat glands, superficial vessels, hair follicles and fat.',
            'A divisão simpática é toracolombar, T1–L2. Seus gânglios ficam ao lado da medula, no tronco simpático. Os nervos esplâncnicos maior e menor seguem até os gânglios pré-vertebrais: celíaco, mesentérico superior, aórtico-renal e mesentérico inferior. Os ramos comunicantes cinzentos voltam aos nervos espinhais para glândulas sudoríparas, vasos superficiais, folículos pilosos e gordura.'),
          t('### Parasympathetic', '### Parassimpático'),
          t('The parasympathetic division is craniosacral, from cranial nerves III, VII, IX and X and from the sacral nerves, which form the pelvic splanchnic nerves. Its ganglia are terminal, near the target organ, or intramural, inside it. The vagus presynaptic neuron lies in the dorsal nucleus of CN X in the medulla, and its axons run with the vagus to visceral or intramural ganglia. The vagal plexuses are cardiac, pulmonary, esophageal and then abdominal (celiac). The pelvic splanchnic nerves go to the inferior hypogastric plexus.',
            'A divisão parassimpática é craniossacral, a partir dos nervos cranianos III, VII, IX e X e dos nervos sacrais, que formam os nervos esplâncnicos pélvicos. Seus gânglios são terminais, perto do órgão-alvo, ou intramurais, dentro dele. O neurônio pré-sináptico do vago fica no núcleo dorsal do NC X no bulbo, e seus axônios seguem com o vago até os gânglios viscerais ou intramurais. Os plexos vagais são cardíaco, pulmonar, esofágico e depois abdominal (celíaco). Os nervos esplâncnicos pélvicos vão ao plexo hipogástrico inferior.'),
        ],
      },
      {
        id: 'per-sup-gut-scheme', ref: '23, 36', title: t('The gut supply scheme: aorta to celiac, SMA and IMA', 'O esquema de suprimento do intestino: aorta até celíaco, AMS e AMI'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'sma', 'ima', 'hepatic_portal_v'], ghost: ['stomach', 'spleen', 'pancreas', 'duodenum'], view: 'ant',
        body: [
          t('### Three arteries along the gut tube', '### Três artérias ao longo do tubo intestinal'),
          t('In the embryo, three arteries from the Abdominal aorta run with the gut tube. The Celiac trunk runs with the dorsal mesogastrium, which holds the spleen and the dorsal pancreas. The Superior mesenteric artery lies in the dorsal mesentery of the midgut. The Inferior mesenteric artery lies in the mesocolon of the hindgut.',
            'No embrião, três artérias da aorta abdominal acompanham o tubo intestinal. O tronco celíaco acompanha o mesogástrio dorsal, que contém o baço e o pâncreas dorsal. A artéria mesentérica superior fica no mesentério dorsal do intestino médio. A artéria mesentérica inferior fica no mesocolo do intestino posterior.'),
          t('### Portal drainage', '### Drenagem porta'),
          t('In the adult abdomen, the hepatic portal vein lies in the hepatoduodenal ligament beside the suprapyloric node and the superior and inferior pancreaticoduodenal nodes, while the superior mesenteric nodes cluster around the superior mesenteric territory.',
            'No abdome adulto, a veia porta hepática situa-se no ligamento hepatoduodenal ao lado do linfonodo suprapilórico e dos linfonodos pancreaticoduodenais superiores e inferiores, enquanto os linfonodos mesentéricos superiores agrupam-se em torno do território da artéria mesentérica superior.'),
        ],
      },
    ],
    questions: [
      q('10', { q: 'How many neurons connect the CNS to an autonomic effector?', correct: 'Two: a preganglionic neuron and a postganglionic neuron in a peripheral ganglion', wrong: ['One myelinated fibre straight to the effector', 'Three: sensory, interneuron and motor', 'One unmyelinated fibre from the spinal cord'], why: 'Slide 5: the visceral motor neuron in the CNS innervates a second neuron in a peripheral ganglion, which controls the effector.' },
        { q: 'Quantos neurônios ligam o SNC a um efetor autônomo?', correct: 'Dois: um pré-ganglionar e um pós-ganglionar num gânglio periférico', wrong: ['Uma fibra mielinizada direto ao efetor', 'Três: sensitivo, interneurônio e motor', 'Uma fibra amielínica da medula'], why: 'Slide 5: o neurônio motor visceral do SNC inerva um segundo neurônio num gânglio periférico, que controla o efetor.' }),
      q('10', { q: 'Which ganglia do the greater and lesser splanchnic nerves reach?', correct: 'The prevertebral ganglia: celiac, superior mesenteric, aorticorenal and inferior mesenteric', wrong: ['The ciliary and pterygopalatine ganglia', 'The submandibular and otic ganglia', 'Terminal ganglia in the wall of the rectum'], why: 'Slide 12: the splanchnic nerves run to the prevertebral ganglia, including celiac, superior mesenteric, aorticorenal and inferior mesenteric.' },
        { q: 'A quais gânglios chegam os nervos esplâncnicos maior e menor?', correct: 'Gânglios pré-vertebrais: celíaco, mesentérico superior, aórtico-renal e mesentérico inferior', wrong: ['Gânglios ciliar e pterigopalatino', 'Gânglios submandibular e ótico', 'Gânglios terminais na parede do reto'], why: 'Slide 12: os nervos esplâncnicos seguem aos gânglios pré-vertebrais, incluindo celíaco, mesentérico superior, aórtico-renal e mesentérico inferior.' }),
      q('11', { q: 'Which cranial nerves give the craniosacral parasympathetic outflow?', correct: 'III, VII, IX and X', wrong: ['I, II and VIII', 'V, VI and XI', 'XII only'], why: 'Slide 11: the craniosacral outflow is cranial nerves III, VII, IX and X, plus the sacral nerves.' },
        { q: 'Quais nervos cranianos dão a saída parassimpática craniossacral?', correct: 'III, VII, IX e X', wrong: ['I, II e VIII', 'V, VI e XI', 'Somente o XII'], why: 'Slide 11: a saída craniossacral são os nervos cranianos III, VII, IX e X, mais os sacrais.' }),
      q('13', { q: 'Where is the presynaptic neuron of the vagus located?', correct: 'In the dorsal nucleus of the vagus nerve (CN X) in the medulla', wrong: ['In the anterior horn of the spinal cord', 'In the celiac ganglion', 'In the pterygopalatine ganglion'], why: 'Slide 13: the presynaptic neuron is in the dorsal nucleus of CN X in the medulla oblongata.' },
        { q: 'Onde fica o neurônio pré-sináptico do vago?', correct: 'No núcleo dorsal do nervo vago (NC X) no bulbo', wrong: ['No corno anterior da medula', 'No gânglio celíaco', 'No gânglio pterigopalatino'], why: 'Slide 13: o neurônio pré-sináptico fica no núcleo dorsal do NC X no bulbo.' }),
      q('23', { q: 'Which artery runs in the dorsal mesogastrium with the spleen and dorsal pancreas in the embryo?', correct: 'Celiac trunk', wrong: ['Inferior mesenteric artery', 'Superior rectal artery', 'Ileocolic artery'], why: 'Slide 23: the celiac trunk runs along the dorsal mesogastrium, with the spleen and dorsal pancreas.' },
        { q: 'Qual artéria acompanha o mesogástrio dorsal, com o baço e o pâncreas dorsal, no embrião?', correct: 'Tronco celíaco', wrong: ['Artéria mesentérica inferior', 'Artéria retal superior', 'Artéria ileocólica'], why: 'Slide 23: o tronco celíaco passa ao longo do mesogástrio dorsal, com o baço e o pâncreas dorsal.' }),
      q('23', { q: 'In which mesentery or mesocolon does the inferior mesenteric artery lie in the embryo?', correct: 'The mesocolon of the hindgut', wrong: ['The dorsal mesentery of the midgut', 'The lesser omentum', 'The transverse mesocolon'], why: 'Slide 23: the inferior mesenteric artery runs in the mesocolon of the hindgut.' },
        { q: 'Em qual mesentério ou mesocolo fica a artéria mesentérica inferior no embrião?', correct: 'No mesocolo do intestino posterior', wrong: ['No mesentério dorsal do intestino médio', 'No omento menor', 'No mesocolo transverso'], why: 'Slide 23: a artéria mesentérica inferior passa no mesocolo do intestino posterior.' }),
    ],
  },
  {
    id: 'peritoneum-sup2', supply: true, title: t('Supply sheet: arteries, veins and lymph of the peritoneal organs', 'Ficha de suprimento: artérias, veias e linfa dos órgãos peritoneais'),
    cards: [
      {
        id: 'per-sup-arteries', ref: '20, 25–26, 32–33, 36, 39', title: t('Arteries of the peritoneal folds', 'Artérias das pregas peritoneais'),
        focus: ['proper_hepatic_a', 'common_hepatic_a', 'left_gastric_a', 'ileocolic_a', 'pancreaticoduodenal_a', 'sigmoid_a', 'superior_rectal_a'], ghost: ['stomach', 'duodenum', 'pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('### What runs inside each fold', '### O que corre dentro de cada prega'),
          t('The mesentery is a fan-shaped fold that carries arteries, veins, lymphatics and nerves from the back wall to the intestine. The transverse mesocolon has two layers, and between them run the arteries, veins, nerves and lymphatics of the transverse colon. The lesser omentum has two parts, and the hepatoduodenal ligament contains the portal vein, the bile duct and the proper hepatic artery.',
            'O mesentério é uma prega em leque que leva artérias, veias, linfáticos e nervos da parede posterior até o intestino. O mesocolo transverso tem duas lâminas, e entre elas correm as artérias, veias, nervos e linfáticos do colo transverso. O omento menor tem duas partes, e o ligamento hepatoduodenal contém a veia porta, o ducto biliar e a artéria hepática própria.'),
          t('### Named vessels of the peritoneal region', '### Vasos nomeados da região peritoneal'),
          t('These vessels lie in the peritoneal region: the left gastric artery and vein, the ileocolic artery and vein in the right mesenteric-colic space, the inferior pancreaticoduodenal artery and vein by the head of the pancreas, the jejunal arteries and veins and the sigmoid arteries and veins in the mesentery, and the superior rectal artery and vein.',
            'Estes vasos ficam na região peritoneal: a artéria e a veia gástricas esquerdas, a artéria e a veia ileocólicas no espaço mesentérico-cólico direito, a artéria e a veia pancreaticoduodenais inferiores junto à cabeça do pâncreas, as artérias e veias jejunais e as artérias e veias sigmoides no mesentério, e a artéria e a veia retais superiores.'),
        ],
      },
      {
        id: 'per-sup-veins-lymph', ref: '20, 32, 36', title: t('Veins and lymph nodes of the peritoneal region', 'Veias e linfonodos da região peritoneal'),
        focus: ['hepatic_portal_v', 'smv', 'splenic_v'], ghost: ['stomach', 'duodenum', 'pancreas', 'spleen'], view: 'ant',
        body: [
          t('### Veins', '### Veias'),
          t('The hepatic portal vein ascends inside the hepatoduodenal ligament beside the proper hepatic artery and the bile duct, while the superior mesenteric vein and the splenic vessels drain the adjacent midgut and upper abdominal organs.',
            'A veia porta hepática sobe dentro do ligamento hepatoduodenal ao lado da artéria hepática própria e do ducto biliar, enquanto a veia mesentérica superior e os vasos esplênicos drenam os órgãos adjacentes do intestino médio e do abdome superior.'),
          t('### Lymph nodes', '### Linfonodos'),
          t('The lymph nodes of this region comprise the suprapyloric node, superior and inferior pancreaticoduodenal nodes, superior mesenteric nodes, splenic nodes, superior pancreatic nodes and deep inguinal nodes. Lymphatics also travel alongside the blood vessels within the mesentery and between the two layers of the transverse mesocolon.',
            'Os linfonodos dessa região incluem o linfonodo suprapilórico, os linfonodos pancreaticoduodenais superiores e inferiores, os linfonodos mesentéricos superiores, os linfonodos esplênicos, os linfonodos pancreáticos superiores e os linfonodos inguinais profundos. Os vasos linfáticos também acompanham os vasos sanguíneos no mesentério e entre as duas lâminas do mesocolo transverso.'),
        ],
      },
    ],
    questions: [
      q('36', { q: 'Which vein runs in the hepatoduodenal ligament?', correct: 'Hepatic portal vein', wrong: ['Inferior vena cava', 'Left renal vein', 'Hepatic vein'], why: 'Slide 36: the hepatic portal vein runs in the hepatoduodenal ligament.' },
        { q: 'Qual veia passa no ligamento hepatoduodenal?', correct: 'Veia porta hepática', wrong: ['Veia cava inferior', 'Veia renal esquerda', 'Veia hepática'], why: 'Slide 36: a veia porta hepática passa no ligamento hepatoduodenal.' }),
      q('25', { q: 'Which three structures does the hepatoduodenal ligament contain?', correct: 'Portal vein, bile duct and proper hepatic artery', wrong: ['Splenic artery, portal vein and pancreas', 'Left gastric artery, vagus nerve and bile duct', 'Ileocolic artery, vein and ureter'], why: 'Slide 25: the hepatoduodenal ligament contains the portal vein, the bile duct and the proper hepatic artery.' },
        { q: 'Quais três estruturas o ligamento hepatoduodenal contém?', correct: 'Veia porta, ducto biliar e artéria hepática própria', wrong: ['Artéria esplênica, veia porta e pâncreas', 'Artéria gástrica esquerda, nervo vago e ducto biliar', 'Artéria ileocólica, veia e ureter'], why: 'Slide 25: o ligamento hepatoduodenal contém a veia porta, o ducto biliar e a artéria hepática própria.' }),
      q('36', { q: 'Which nodes lie beside the duodenum and head of the pancreas?', correct: 'Superior and inferior pancreaticoduodenal nodes', wrong: ['Deep inguinal nodes', 'Splenic nodes', 'Sigmoid nodes'], why: 'Slide 36: the superior and inferior pancreaticoduodenal nodes lie beside the duodenum and the head of the pancreas.' },
        { q: 'Quais linfonodos ficam ao lado do duodeno e da cabeça do pâncreas?', correct: 'Linfonodos pancreaticoduodenais superiores e inferiores', wrong: ['Linfonodos inguinais profundos', 'Linfonodos esplênicos', 'Linfonodos sigmoides'], why: 'Slide 36: os linfonodos pancreaticoduodenais superiores e inferiores ficam junto ao duodeno e à cabeça do pâncreas.' }),
      q('36', { q: 'Which artery and vein run in the right mesenteric-colic space?', correct: 'Ileocolic artery and vein', wrong: ['Left gastric artery and vein', 'Splenic artery and vein', 'Superior rectal artery and vein'], why: 'Slide 36: the ileocolic artery and vein lie in the right mesenteric-colic space.' },
        { q: 'Qual artéria e veia passam pelo espaço mesentérico-cólico direito?', correct: 'Artéria e veia ileocólicas', wrong: ['Artéria e veia gástricas esquerdas', 'Artéria e veia esplênicas', 'Artéria e veia retais superiores'], why: 'Slide 36: a artéria e a veia ileocólicas ficam no espaço mesentérico-cólico direito.' }),
      q('32', { q: 'What runs between the two layers of the transverse mesocolon?', correct: 'Arteries, veins, nerves and lymphatics of the transverse colon', wrong: ['Only the bile duct', 'Only the splenic artery', 'The ureter and renal vessels'], why: 'Slide 32: between the layers there are arteries, veins, nerves and lymphatics related to the transverse colon.' },
        { q: 'O que corre entre as duas lâminas do mesocolo transverso?', correct: 'Artérias, veias, nervos e linfáticos do colo transverso', wrong: ['Somente o ducto biliar', 'Somente a artéria esplênica', 'O ureter e os vasos renais'], why: 'Slide 32: entre as lâminas há artérias, veias, nervos e linfáticos ligados ao colo transverso.' }),
    ],
  },
  {
    id: 'peritoneum-sup3', supply: true, title: t('Branching and territories, both directions', 'Ramificação e territórios, nos dois sentidos'),
    cards: [
      {
        id: 'per-sup-tree', ref: '23, 36, 47–48', title: t('Walk the gut arteries and the hepatic branches', 'Percorra as artérias do intestino e os ramos hepáticos'),
        focus: ['abdominal_aorta_g', 'celiac_trunk', 'sma', 'ima', 'common_hepatic_a', 'proper_hepatic_a', 'left_gastric_a', 'splenic_a'], ghost: ['stomach', 'pancreas', 'spleen'], view: 'ant',
        diagram: ARTERY_TREE,
        body: [
          t('Read the tree from the top. Tap each branch before revealing it and say its name out loud: the three gut arteries from the aorta first, then the branches of the celiac trunk. The Common hepatic artery is followed to the Proper hepatic artery, which runs in the hepatoduodenal ligament with the portal vein and the bile duct.',
            'Leia a árvore de cima para baixo. Toque em cada ramo antes de revelá-lo e diga o nome em voz alta: primeiro as três artérias do intestino saídas da aorta, depois os ramos do tronco celíaco. A artéria hepática comum é seguida até a artéria hepática própria, que corre no ligamento hepatoduodenal com a veia porta e o ducto biliar.'),
          t('### Where names change', '### Onde os nomes mudam'),
          t('The Common hepatic artery leads to the Proper hepatic artery, which is the part that runs in the hepatoduodenal ligament of the lesser omentum. The Superior mesenteric artery and the Inferior mesenteric artery are placed in the mesentery and the mesocolon of the embryo, and no further branches are named for them here, so the tree ends them there.',
            'A artéria hepática comum leva à artéria hepática própria, que é a parte que corre no ligamento hepatoduodenal do omento menor. A artéria mesentérica superior e a artéria mesentérica inferior ficam no mesentério e no mesocolo do embrião, e nenhum ramo adicional é nomeado para elas aqui, por isso a árvore as encerra ali.'),
        ],
      },
      {
        id: 'per-sup-territories', ref: '20–21, 25–26, 32–33, 39, 43–48', title: t('Contents of each fold, both directions', 'Conteúdo de cada prega, nos dois sentidos'),
        focus: ['hepatic_portal_v', 'proper_hepatic_a', 'ileocolic_a'], ghost: ['stomach', 'duodenum', 'pancreas', 'transverse_colon', 'jejunum', 'ileum'], view: 'ant',
        body: [
          t('### From fold to contents', '### Da prega ao conteúdo'),
          t('Lesser omentum, at the hepatoduodenal ligament: the portal vein, the bile duct and the proper hepatic artery. Transverse mesocolon: the arteries, veins, nerves and lymphatics of the transverse colon. Mesentery: the arteries, veins, lymphatics and nerves to the jejunum and ileum. Omental foramen: its anterior boundary is the lesser omentum with the portal vein, proper hepatic artery and bile duct.',
            'Omento menor, no ligamento hepatoduodenal: a veia porta, o ducto biliar e a artéria hepática própria. Mesocolo transverso: as artérias, veias, nervos e linfáticos do colo transverso. Mesentério: as artérias, veias, linfáticos e nervos do jejuno e do íleo. Forame omental: sua borda anterior é o omento menor, com a veia porta, a artéria hepática própria e o ducto biliar.'),
          t('### From contents to fold', '### Do conteúdo à prega'),
          t('Turn it around when you revise. Portal vein, bile duct and proper hepatic artery: the hepatoduodenal ligament. Arteries of the transverse colon: between the two layers of the transverse mesocolon. Ileocolic artery and vein: the right mesenteric-colic space. Posterior boundary of the omental foramen: the Inferior vena cava and the right crus of the diaphragm.',
            'Inverta ao revisar. Veia porta, ducto biliar e artéria hepática própria: o ligamento hepatoduodenal. Artérias do colo transverso: entre as duas lâminas do mesocolo transverso. Artéria e veia ileocólicas: o espaço mesentérico-cólico direito. Borda posterior do forame omental: a veia cava inferior e o pilar direito do diafragma.'),
        ],
      },
    ],
    questions: [
      q('26', { q: 'Which artery runs in the hepatoduodenal ligament with the portal vein?', correct: 'Proper hepatic artery', wrong: ['Splenic artery', 'Left gastric artery', 'Superior mesenteric artery'], why: 'Slide 26: the hepatoduodenal ligament contains the proper hepatic artery with the portal vein and the bile duct.' },
        { q: 'Qual artéria corre no ligamento hepatoduodenal junto com a veia porta?', correct: 'Artéria hepática própria', wrong: ['Artéria esplênica', 'Artéria gástrica esquerda', 'Artéria mesentérica superior'], why: 'Slide 26: o ligamento hepatoduodenal contém a artéria hepática própria junto com a veia porta e o ducto biliar.' }),
      q('48', { q: 'What forms the anterior boundary of the omental foramen?', correct: 'The lesser omentum, in its hepatoduodenal ligament', wrong: ['The superior part of the duodenum', 'The caudate lobe of the liver', 'The right crus of the diaphragm'], why: 'Slide 48: the anterior boundary is the lesser omentum in its hepatoduodenal ligament.' },
        { q: 'O que forma a borda anterior do forame omental?', correct: 'O omento menor, no seu ligamento hepatoduodenal', wrong: ['A parte superior do duodeno', 'O lobo caudado do fígado', 'O pilar direito do diafragma'], why: 'Slide 48: a borda anterior é o omento menor no seu ligamento hepatoduodenal.' }),
      q('48', { q: 'Which structures form the posterior boundary of the omental foramen?', correct: 'Inferior vena cava and the diaphragm (right crus)', wrong: ['The tail of the pancreas and the spleen', 'The greater omentum and the transverse colon', 'The stomach and the gastrosplenic ligament'], why: 'Slide 48: the posterior boundary is the inferior vena cava and the diaphragm, right crus.' },
        { q: 'Quais estruturas formam a borda posterior do forame omental?', correct: 'Veia cava inferior e diafragma (pilar direito)', wrong: ['Cauda do pâncreas e baço', 'Omento maior e colo transverso', 'Estômago e ligamento gastroesplênico'], why: 'Slide 48: a borda posterior é a veia cava inferior e o diafragma, pilar direito.' }),
      q('39', { q: 'Which parts of the small intestine does the mesentery hold along its free border?', correct: 'The jejunum and ileum', wrong: ['The duodenum and stomach', 'The rectum and sigmoid colon', 'The cecum and appendix'], why: 'Slide 39: the anterior free border contains the jejunum and ileum.' },
        { q: 'Quais partes do intestino delgado o mesentério segura na borda livre?', correct: 'Jejuno e íleo', wrong: ['Duodeno e estômago', 'Reto e colo sigmoide', 'Ceco e apêndice'], why: 'Slide 39: a borda livre anterior contém o jejuno e o íleo.' }),
    ],
  },
];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
