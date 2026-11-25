// SpeedGastro · Aula 06 — Stomach (Prof. Fiume deck 06_stomach, p001–p051).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };

const ARTERIES = ['celiac_trunk', 'left_gastric_a', 'right_gastric_a', 'common_hepatic_a', 'proper_hepatic_a',
  'gastroduodenal_a', 'gastroepiploic_a', 'splenic_a', 'pancreaticoduodenal_a'];

export const unit = {
  id: 'stomach',
  label: t('06 · Stomach', '06 · Estômago'),
  visible: ['stomach', 'esophagus', 'diaphragm_g', 'duodenum', 'spleen', 'pancreas', 'caudate_lobe', 'gallbladder',
    'transverse_colon', 'abdominal_aorta_g', ...ARTERIES, 'sma', 'hepatic_portal_v', 'splenic_v', 'gastric_v'],
  ghost: ['diaphragm_g', 'spleen', 'pancreas', 'caudate_lobe', 'gallbladder', 'transverse_colon', 'duodenum'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'stomach-1', title: t('Stomach: overview, functions and location', 'Estômago: visão geral, funções e localização'),
    cards: [
      {
        id: 'st-p001', ref: '1', title: t('Where the stomach sits in the tract', 'Onde o estômago fica no tubo digestivo'),
        focus: ['stomach', 'esophagus', 'duodenum'], view: 'ant',
        body: [
          t('The deck opens with one defining sentence: the stomach is the widest part of the alimentary tract, and it lies between the Esophagus and the Duodenum. Everything else in the lesson hangs on this: food arrives from above through the esophagus, is held and processed in the wide gastric chamber, and leaves on the right into the duodenum.',
            'O deck abre com uma frase que define o órgão: o estômago é a parte mais larga do tubo digestivo e fica entre o esôfago e o duodeno. Todo o resto da aula se apoia nisso: o alimento chega por cima pelo esôfago, é retido e processado na câmara gástrica larga e sai pela direita para o duodeno.'),
          t('The figure on p001 places the stomach inside the whole digestive system: oral cavity, fauces, pharynx and the salivary glands (parotid, submandibular, sublingual) above; liver and gallbladder to the right; the pancreas drawn behind the stomach; then jejunum, ileum, cecum, appendix, colon and rectum below. Rotate the 3D model and follow the same order: the Esophagus passes the Diaphragm, widens into the Stomach, and the stomach narrows again into the Duodenum.',
            'A figura da p001 coloca o estômago dentro de todo o sistema digestório: cavidade oral, fauces, faringe e as glândulas salivares (parótida, submandibular, sublingual) em cima; fígado e vesícula biliar à direita; o pâncreas desenhado atrás do estômago; depois jejuno, íleo, ceco, apêndice, colo e reto embaixo. Gire o modelo 3D e siga a mesma ordem: o esôfago atravessa o diafragma, alarga-se no estômago, e o estômago volta a estreitar-se no duodeno.'),
        ],
      },
      {
        id: 'st-p002', ref: '2–3', title: t('Functions and first look at the stomach', 'Funções e primeira visão do estômago'),
        focus: ['stomach'], ghost: ['spleen', 'gallbladder', 'transverse_colon'], view: 'ant',
        body: [
          t('Page 2 lists the functions of the stomach. It is a temporary store for food; it breaks solid food down mechanically; it carries out chemical digestion of proteins by enzymes and acid; it secretes intrinsic factors and hormones; and it takes part in microbial defense. The last item is written «Adsorption?» (meaning absorption) with a question mark: the slide flags it as doubtful, so remember that absorption is not one of the stomach’s main jobs.',
            'A página 2 lista as funções do estômago. Ele é um depósito temporário de alimento; quebra mecanicamente o alimento sólido; realiza a digestão química das proteínas por enzimas e ácido; secreta fatores intrínsecos e hormônios; e participa da defesa contra micróbios. O último item está escrito «Adsorption?» (no sentido de absorção) com um ponto de interrogação: o slide marca como duvidoso, então lembre que absorver não é uma das funções principais do estômago.'),
          t('The same page already previews the mesenteries of the stomach. The lesser omentum lies between the stomach and proximal duodenum on one side and the liver on the other. It is made of the hepatogastric ligament (liver to lesser curvature of the stomach) and the hepatoduodenal ligament (liver to the proximal segment of the duodenum). The greater omentum is a large pouch that hangs like an apron from the greater curvature. The figure also names the four arteries that run along the two curvatures: left and right gastric arteries on the lesser curvature, left and right gastroepiploic arteries on the greater curvature.',
            'A mesma página já antecipa os mesentérios do estômago. O omento menor fica entre o estômago e o duodeno proximal de um lado e o fígado do outro. Ele é formado pelo ligamento hepatogástrico (fígado até a curvatura menor do estômago) e pelo ligamento hepatoduodenal (fígado até o segmento proximal do duodeno). O omento maior é uma grande bolsa que pende como um avental da curvatura maior. A figura também nomeia as quatro artérias que correm ao longo das duas curvaturas: artérias gástricas esquerda e direita na curvatura menor, artérias gastroepiploicas esquerda e direita na curvatura maior.'),
          t('Notice the orientation words used in the figure: the lesser curvature is the medial surface and the greater curvature is the lateral surface. Page 3 is a cadaver dissection seen from the front after removal of the lesser omentum. It shows the stomach in place: Esophagus and cardia under the Diaphragm, the fundus up on the left next to the Spleen, the body, the greater curvature with the greater omentum attached, and on the right the pylorus with the pyloric sphincter. Near the lesser curvature you see the left gastric artery and the vagus nerve; on the right, the hepatic artery, the common bile duct and the Gallbladder under the right lobe of the liver.',
            'Repare nas palavras de orientação da figura: a curvatura menor é a face medial e a curvatura maior é a face lateral. A página 3 é uma dissecção de cadáver vista de frente, após a retirada do omento menor. Ela mostra o estômago no lugar: esôfago e cárdia sob o diafragma, o fundo no alto à esquerda junto ao baço, o corpo, a curvatura maior com o omento maior preso a ela e, à direita, o piloro com o esfíncter pilórico. Perto da curvatura menor aparecem a artéria gástrica esquerda e o nervo vago; à direita, a artéria hepática, o ducto colédoco e a vesícula biliar sob o lobo direito do fígado.'),
        ],
      },
      {
        id: 'st-p004', ref: '4', title: t('Location: levels, quadrant and capacity', 'Localização: níveis, quadrante e capacidade'),
        focus: ['stomach'], ghost: ['diaphragm_g', 'transverse_colon'], view: 'ant',
        body: [
          t('The stomach extends from T7 to L3. It is intraperitoneal, meaning it is wrapped by peritoneum, and it lies in the left upper quadrant (epigastrium). Its direction in space is given with two pairs of words: it runs from posterior to anterior and from left to right. Follow this in the 3D model: the upper part (fundus) sits high, deep and on the left under the Diaphragm, while the lower part (pylorus) comes forward and crosses to the right toward the Duodenum.',
            'O estômago estende-se de T7 a L3. Ele é intraperitoneal, isto é, envolvido pelo peritônio, e fica no quadrante superior esquerdo (epigástrio). A direção dele no espaço é dada por dois pares de palavras: vai de posterior para anterior e da esquerda para a direita. Acompanhe no modelo 3D: a parte de cima (fundo) fica alta, profunda e à esquerda sob o diafragma, enquanto a parte de baixo (piloro) vem para frente e cruza para a direita em direção ao duodeno.'),
          t('In terms of abdominal regions the stomach occupies the left hypochondrium, the epigastrium and the umbilical region. In terms of compartments it belongs to the supramesocolic region, the part of the abdomen above the transverse mesocolon. The figure on this page shows the nine regions with their contents (for example liver and gallbladder in the right hypochondrium, pancreas and small intestine in the umbilical region) and a quadrant diagram labelling the RUQ, LUQ and the transpyloric plane crossing the stomach.',
            'Em termos de regiões abdominais, o estômago ocupa o hipocôndrio esquerdo, o epigástrio e a região umbilical. Em termos de compartimentos, ele pertence à região supramesocólica, a parte do abdome acima do mesocolo transverso. A figura desta página mostra as nove regiões com seu conteúdo (por exemplo, fígado e vesícula no hipocôndrio direito, pâncreas e intestino delgado na região umbilical) e um diagrama de quadrantes marcando QSD, QSE e o plano transpilórico cruzando o estômago.'),
          t('Mean capacity in adults is 1–4 l. This wide range is the first hint of what the next pages show: the stomach changes size and shape a lot depending on how full it is and on the body type.',
            'A capacidade média no adulto é de 1–4 l. Essa faixa ampla é a primeira pista do que as próximas páginas mostram: o estômago muda muito de tamanho e de forma conforme está cheio e conforme o tipo corporal.'),
        ],
      },
      {
        id: 'st-p005', ref: '5–7', title: t('Supramesocolic and submesocolic spaces', 'Espaços supramesocólico e inframesocólico'),
        focus: ['transverse_colon'], ghost: ['stomach', 'spleen', 'duodenum', 'pancreas'], view: 'ant',
        body: [
          t('Pages 5–7 explain what «supramesocolic» means. The abdominopelvic cavity is divided into the peritoneal cavity and the extraperitoneal space (which splits into the extraperitoneal pelvic space and the retroperitoneal space). The peritoneal cavity is split by the transverse mesocolon into a supramesocolic space (also called supracolic) above and a submesocolic space (infracolic) below. The Transverse colon in the 3D model marks this border: the stomach lies above it.',
            'As páginas 5–7 explicam o que significa «supramesocólico». A cavidade abdominopélvica divide-se em cavidade peritoneal e espaço extraperitoneal (que se subdivide em espaço pélvico extraperitoneal e espaço retroperitoneal). A cavidade peritoneal é dividida pelo mesocolo transverso em espaço supramesocólico (também chamado supracólico) em cima e espaço inframesocólico (infracólico) embaixo. O colo transverso no modelo 3D marca essa fronteira: o estômago fica acima dele.'),
          t('The supramesocolic space contains three compartments: hepatic, gastric and splenic. Its omenta are the lesser omentum and the greater omentum. Its serous spaces or recesses are the subphrenic, subhepatic, hepatorenal, gastrosplenic and phrenicosplenic recesses and the omental bursa (lesser sac). The submesocolic space has its own recesses (superior and inferior duodenal, paraduodenal, duodenojejunal, retroduodenal, intersigmoid, superior and inferior ileocecal, retrocecal, right and left mesenteric-colic, and right and left paracolic); the extraperitoneal pelvic space has vesical, prostatic and rectal compartments (plus connective spaces), and the retroperitoneal space has the renal and iliopsoas compartments.',
            'O espaço supramesocólico contém três compartimentos: hepático, gástrico e esplênico. Os omentos dele são o omento menor e o omento maior. Os espaços serosos ou recessos são os recessos subfrênico, sub-hepático, hepatorrenal, gastroesplênico e frenicoesplênico e a bolsa omental (pequena cavidade). O espaço inframesocólico tem seus próprios recessos (duodenais superior e inferior, paraduodenal, duodenojejunal, retroduodenal, intersigmóideo, ileocecais superior e inferior, retrocecal, mesentérico-cólicos direito e esquerdo e paracólicos direito e esquerdo); o espaço pélvico extraperitoneal tem os compartimentos vesical, prostático e retal (além de espaços conectivos), e o espaço retroperitoneal tem os compartimentos renal e do iliopsoas.'),
          t('Page 6 is a sagittal diagram that makes the layering visible: from the stomach, the greater omentum hangs down in front of the transverse colon; the gastrocolic ligament joins stomach and colon; the transverse mesocolon attaches the colon backward; behind the stomach lies the omental bursa, and behind that the retroperitoneal space with the duodenum and pancreas. The second figure on p006 lifts the greater omentum and transverse colon to show the submesocolic space below. Page 7 shows the posterior abdominal wall with the roots of the transverse mesocolon, the mesentery and the sigmoid mesocolon, separating supramesocolic from submesocolic spaces, and labels the right and left subphrenic spaces, omental bursa, right subhepatic space, right and left paracolic recesses, right mesenteric and left mesenteric-colic spaces, and the gastrosplenic ligament.',
            'A página 6 é um esquema sagital que deixa as camadas visíveis: a partir do estômago, o omento maior desce na frente do colo transverso; o ligamento gastrocólico une estômago e colo; o mesocolo transverso prende o colo para trás; atrás do estômago fica a bolsa omental e, atrás dela, o espaço retroperitoneal com o duodeno e o pâncreas. A segunda figura da p006 levanta o omento maior e o colo transverso para mostrar o espaço inframesocólico embaixo. A página 7 mostra a parede abdominal posterior com as raízes do mesocolo transverso, do mesentério e do mesocolo sigmoide, separando os espaços supra e inframesocólico, e identifica os espaços subfrênicos direito e esquerdo, a bolsa omental, o espaço sub-hepático direito, os recessos paracólicos direito e esquerdo, os espaços mesentérico direito e mesentérico-cólico esquerdo e o ligamento gastroesplênico.'),
        ],
      },
      {
        id: 'st-p008', ref: '8', title: t('Variations with body habitus', 'Variações com o tipo corporal'),
        focus: ['stomach'], view: 'ant',
        body: [
          t('Page 8 shows that the position and contour of the stomach vary with body habitus. Four types are drawn. The hypertonic stomach is associated with a large thorax and lies more horizontally. The orthotonic stomach is the intermediate, usual shape. The hypotonic stomach is associated with a tight thorax and is noted in women; it is longer and more vertical. The atonic stomach hangs down until the lower abdominal cavity.',
            'A página 8 mostra que a posição e o contorno do estômago variam com o tipo corporal. Quatro tipos são desenhados. O estômago hipertônico está associado a um tórax largo e fica mais horizontal. O estômago ortotônico é a forma intermediária, habitual. O estômago hipotônico está associado a um tórax estreito e é anotado em mulheres; é mais longo e mais vertical. O estômago atônico desce até a parte baixa da cavidade abdominal.'),
          t('The take-home message links back to p004: the T7–L3 extent and the 1–4 l capacity are averages, and the real shape of the Stomach in a given person depends on body habitus (thorax shape and gastric tone). The 3D model shows one standard (orthotonic-like) shape.',
            'A mensagem principal volta à p004: a extensão T7–L3 e a capacidade de 1–4 l são médias, e a forma real do estômago numa pessoa depende do tipo corporal (formato do tórax e tônus gástrico). O modelo 3D mostra uma forma padrão (semelhante à ortotônica).'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Between which two segments does the stomach lie?', correct: 'Esophagus and duodenum', wrong: ['Pharynx and esophagus', 'Duodenum and jejunum', 'Esophagus and jejunum'], why: 'Slide 1: the stomach is the widest part of the alimentary tract, between the esophagus and the duodenum.' },
      { ref: '2', q: 'Which stomach function is marked with a question mark on slide 2?', correct: 'Absorption', wrong: ['Temporary storage', 'Secretion of intrinsic factor and hormones', 'Microbial defense'], why: 'Slide 2 lists storage, mechanical breakdown, protein digestion, intrinsic factor and hormones, microbial defense, and «Adsorption?» with a question mark.' },
      { ref: '4', q: 'Which vertebral levels does the stomach extend between?', correct: 'T7–L3', wrong: ['T10–L1', 'T5–T12', 'L1–L4'], why: 'Slide 4: location T7–L3, intraperitoneal, left upper quadrant.' },
      { ref: '4', q: 'What is the mean capacity of the adult stomach on slide 4?', correct: '1–4 l', wrong: ['0.5–1 l', '5–6 l', '100–200 ml'], why: 'Slide 4: mean capacity in adults is 1–4 l.' },
      { ref: '5', q: 'Which three compartments make up the supramesocolic space?', correct: 'Hepatic, gastric and splenic', wrong: ['Renal, gastric and splenic', 'Hepatic, duodenal and colic', 'Vesical, prostatic and rectal'], why: 'Slide 5: supramesocolic compartments are hepatic, gastric and splenic.' },
      { ref: '8', q: 'Which stomach type is linked to a large thorax and a more horizontal position?', correct: 'Hypertonic', wrong: ['Orthotonic', 'Hypotonic', 'Atonic'], why: 'Slide 8: hypertonic stomach — large thorax, increased horizontal lie.' },
    ],
  },
  {
    id: 'stomach-2', title: t('Parts and internal configuration', 'Partes e configuração interna'),
    cards: [
      {
        id: 'st-p009', ref: '9', title: t('The four parts: cardia, fundus, body, pylorus', 'As quatro partes: cárdia, fundo, corpo, piloro'),
        focus: ['stomach', 'esophagus'], view: 'ant',
        body: [
          t('The stomach has four parts: cardia, fundus, body and pylorus. Find each on the 3D Stomach while reading.',
            'O estômago tem quatro partes: cárdia, fundo, corpo e piloro. Encontre cada uma no estômago 3D enquanto lê.'),
          t('Cardia: the region next to the opening of the Esophagus (the cardiac orifice). Its left margin, beside the esophagus, marks where the fundus begins. It lies at T10–T12.',
            'Cárdia: a região junto à abertura do esôfago (o óstio cárdico). Sua margem esquerda, ao lado do esôfago, marca onde começa o fundo. Fica em T10–T12.'),
          t('Fundus: dome-shaped, on the left of the point where the esophagus arrives at the stomach. It projects above the cardiac notch toward the left dome of the Diaphragm. It contains plenty of air. The slide links this to the gastrocardiac or Roemheld syndrome, asking whether «stomach and heart can talk»: because the air-filled fundus sits right under the diaphragm, and the heart is just above it, the two organs are neighbours (this is developed on p013).',
            'Fundo: em forma de cúpula, à esquerda do ponto onde o esôfago chega ao estômago. Projeta-se acima da incisura cárdica em direção à cúpula esquerda do diafragma. Contém bastante ar. O slide liga isso à síndrome gastrocardíaca ou de Roemheld, perguntando se «estômago e coração podem conversar»: como o fundo cheio de ar fica logo abaixo do diafragma, e o coração logo acima, os dois órgãos são vizinhos (isso é desenvolvido na p013).'),
          t('Body: the biggest part. When empty it is a flattened cylinder; it becomes bigger during digestion.',
            'Corpo: a maior parte. Vazio, é um cilindro achatado; aumenta durante a digestão.'),
          t('Pylorus: divided into three parts. (1) The pyloric antrum, which is expanded and then narrows to become (2) the pyloric canal, 1–2 cm long, which ends in (3) the pylorus proper, a real anatomical sphincter, at L1. Follow the lower right end of the stomach in the model as it narrows toward the Duodenum: that narrowing is antrum → canal → sphincter.',
            'Piloro: dividido em três partes. (1) O antro pilórico, que é dilatado e depois se estreita para formar (2) o canal pilórico, com 1–2 cm, que termina (3) no piloro propriamente dito, um esfíncter anatômico verdadeiro, em L1. Siga a extremidade inferior direita do estômago no modelo enquanto ela se estreita rumo ao duodeno: esse estreitamento é antro → canal → esfíncter.'),
        ],
      },
      {
        id: 'st-p010', ref: '10', title: t('Lesser and greater curvatures', 'Curvaturas menor e maior'),
        focus: ['stomach'], view: 'ant',
        body: [
          t('The lesser curvature extends between the cardiac and pyloric orifices and forms the medial border of the stomach. It measures about 15 cm. The greater curvature is 2–3 times longer, about 40 cm; it starts at the cardiac notch and ends at the pylorus. In the 3D Stomach the lesser curvature is the short concave right-upper edge; the greater curvature is the long convex left-lower edge.',
            'A curvatura menor estende-se entre os óstios cárdico e pilórico e forma a margem medial do estômago. Mede cerca de 15 cm. A curvatura maior é 2–3 vezes mais longa, cerca de 40 cm; começa na incisura cárdica e termina no piloro. No estômago 3D, a curvatura menor é a borda curta e côncava em cima e à direita; a curvatura maior é a borda longa e convexa à esquerda e embaixo.'),
          t('On the lesser curvature there is a bend called the angular notch, drawn on the slide as a 90° angle. It marks the border between body and pyloric antrum. The two figures on p010 label the same landmarks inside and outside: Esophagus, cardia, fundus, body with longitudinal folds, rugal folds, angular notch, pyloric antrum, pyloric canal, pyloric sphincter, pyloric orifice and Duodenum. Dashed lines on the outside view mark the borders between the parts.',
            'Na curvatura menor há uma dobra chamada incisura angular, desenhada no slide como um ângulo de 90°. Ela marca o limite entre o corpo e o antro pilórico. As duas figuras da p010 mostram os mesmos pontos de referência por dentro e por fora: esôfago, cárdia, fundo, corpo com pregas longitudinais, pregas gástricas, incisura angular, antro pilórico, canal pilórico, esfíncter pilórico, óstio pilórico e duodeno. Linhas tracejadas na vista externa marcam os limites entre as partes.'),
        ],
      },
      {
        id: 'st-p011', ref: '11–12', title: t('Rugae and the cardiac orifice', 'Pregas gástricas e o óstio cárdico'),
        focus: ['stomach', 'esophagus', 'diaphragm_g'], view: 'ant',
        body: [
          t('Inside, the mucosa and submucosa form many longitudinal folds called rugae. They become obliterated (flatten out) when the stomach is distended. The exception is the lesser curvature: here the folds are permanent and connect the esophagus to the pylorus. The slide calls this a «shortcut» for liquids: liquids can run along these permanent folds straight from the cardia to the pylorus without filling the whole chamber.',
            'Por dentro, a mucosa e a submucosa formam muitas pregas longitudinais chamadas rugas (pregas gástricas). Elas se apagam quando o estômago está distendido. A exceção é a curvatura menor: ali as pregas são permanentes e ligam o esôfago ao piloro. O slide chama isso de «atalho» para os líquidos: os líquidos podem correr ao longo dessas pregas permanentes direto da cárdia ao piloro, sem encher a câmara toda.'),
          t('Page 12 zooms in on the cardiac orifice. The figure shows the wall layers of the esophagus continuing into the stomach (mucosa, submucosa, and a muscular coat with longitudinal and circular layers), the lower esophageal sphincter, and the Diaphragm with its diaphragmatic fascia and the phrenoesophageal ligament anchoring the esophagus where it passes through, with adipose tissue around. The Z-line marks the junction between esophagus and stomach mucosa, with an endoscopic photo on the right pointing to this junction. Beside it you see the cardial notch and the start of the gastric folds.',
            'A página 12 aproxima o óstio cárdico. A figura mostra as camadas da parede do esôfago continuando no estômago (mucosa, submucosa e uma túnica muscular com camadas longitudinal e circular), o esfíncter esofágico inferior e o diafragma com sua fáscia diafragmática e o ligamento frenoesofágico ancorando o esôfago onde ele passa, com tecido adiposo ao redor. A linha Z marca a junção entre a mucosa do esôfago e a do estômago, com uma foto endoscópica à direita apontando para essa junção. Ao lado aparecem a incisura cárdica e o início das pregas gástricas.'),
        ],
      },
      {
        id: 'st-p020', ref: '20–21', title: t('Pyloric sphincter and lower esophageal sphincter', 'Esfíncter pilórico e esfíncter esofágico inferior'),
        focus: ['stomach', 'esophagus', 'duodenum'], view: 'ant',
        body: [
          t('Page 20 repeats that the pylorus is a real anatomical sphincter and shows why. In the longitudinal section through the pyloric region the circular muscle is visibly thickened. The figure also shows the three muscle layers of the stomach wall (outer longitudinal, middle circular, innermost oblique), and on the duodenal side its own circular and longitudinal muscle. A high-contrast radiograph of the stomach and Duodenum shows the same narrowing.',
            'A página 20 repete que o piloro é um esfíncter anatômico verdadeiro e mostra o porquê. No corte longitudinal da região pilórica, a musculatura circular está visivelmente espessada. A figura também mostra as três camadas musculares da parede gástrica (longitudinal externa, circular média, oblíqua mais interna) e, do lado duodenal, a musculatura circular e longitudinal do próprio duodeno. Uma radiografia contrastada do estômago e do duodeno mostra o mesmo estreitamento.'),
          t('Page 21 contrasts this with the upper end. The lower esophageal sphincter is only functional, not a thickened anatomical ring. When it is closed, liquids cannot back up into the Esophagus. When it is open, liquids can move backwards and cause gastroesophageal reflux disease (GERD). So the two ends of the stomach differ: a true anatomical sphincter at the pylorus, a functional one at the cardia.',
            'A página 21 contrasta isso com a extremidade superior. O esfíncter esofágico inferior é apenas funcional, não um anel anatômico espessado. Quando está fechado, os líquidos não conseguem voltar ao esôfago. Quando está aberto, os líquidos podem refluir e causar a doença do refluxo gastroesofágico (DRGE). Assim, as duas extremidades do estômago diferem: um esfíncter anatômico verdadeiro no piloro, um esfíncter funcional na cárdia.'),
        ],
      },
    ],
    questions: [
      { ref: '9', q: 'At which vertebral level does the slide place the cardia?', correct: 'T10–T12', wrong: ['L1', 'T7', 'L3'], why: 'Slide 9: cardia — region adjacent to the esophageal opening, T10–T12. The pylorus is at L1.' },
      { ref: '9', q: 'Which part of the stomach is dome-shaped, full of air and linked on the slide to Roemheld syndrome?', correct: 'Fundus', wrong: ['Cardia', 'Body', 'Pyloric antrum'], why: 'Slide 9: the fundus projects above the cardiac notch toward the left dome of the diaphragm, with plenty of air (gastrocardiac/Roemheld syndrome).' },
      { ref: '9', q: 'How long is the pyloric canal?', correct: '1–2 cm', wrong: ['5–6 cm', '10 cm', '15 cm'], why: 'Slide 9: the pyloric canal is 1–2 cm long and ends in the pylorus.' },
      { ref: '10', q: 'How do the two curvatures compare in length?', correct: 'The greater curvature is 2–3 times longer (~40 cm vs ~15 cm)', wrong: ['They are equal (~25 cm each)', 'The lesser curvature is twice as long', 'The greater curvature is 10 times longer'], why: 'Slide 10: lesser ~15 cm, greater ~40 cm, 2–3 times longer.' },
      { ref: '11', q: 'Where are the gastric folds permanent rather than obliterated by distension?', correct: 'Along the lesser curvature', wrong: ['Along the greater curvature', 'In the fundus', 'In the pyloric antrum'], why: 'Slide 11: rugae flatten when distended except on the lesser curvature, where permanent folds connect esophagus to pylorus (a shortcut for liquids).' },
      { ref: '21', q: 'What kind of sphincter is the lower esophageal sphincter, according to slide 21?', correct: 'Functional', wrong: ['A real anatomical sphincter like the pylorus', 'Skeletal muscle under voluntary control', 'Absent in adults'], why: 'Slide 21: lower esophageal sphincter (functional); when open, liquids reflux and cause GERD. Slide 20: the pylorus is a real anatomical sphincter.' },
    ],
  },
  {
    id: 'stomach-3', title: t('Gastric relations', 'Relações do estômago'),
    cards: [
      {
        id: 'st-p013', ref: '13', title: t('Relations of the fundus', 'Relações do fundo'),
        focus: ['diaphragm_g', 'stomach'], view: 'ant',
        body: [
          t('The fundus is in contact with the Diaphragm, and through the diaphragm with the pericardium (heart) and the pleura (left lung). During exhalation the fundus rises and reaches the height of the 5th rib on the midclavicular line.',
            'O fundo está em contato com o diafragma e, através dele, com o pericárdio (coração) e a pleura (pulmão esquerdo). Durante a expiração, o fundo sobe e alcança a altura da 5ª costela na linha hemiclavicular.'),
          t('This is the anatomical basis of the «can stomach and heart talk?» remark on p009: only the thin dome of the diaphragm separates the air-filled fundus from the heart and the left lung base. In the 3D model, look at the left dome of the Diaphragm: the Stomach fundus sits right under it. The figure on p013 also shows the neighbours around the stomach: liver, Duodenum, ascending and transverse colon, base of left lung, Esophagus, tail of pancreas, duodenojejunal flexure and both kidneys.',
            'Essa é a base anatômica do comentário «estômago e coração podem conversar?» da p009: só a fina cúpula do diafragma separa o fundo cheio de ar do coração e da base do pulmão esquerdo. No modelo 3D, observe a cúpula esquerda do diafragma: o fundo do estômago fica logo abaixo dela. A figura da p013 também mostra os vizinhos do estômago: fígado, duodeno, colos ascendente e transverso, base do pulmão esquerdo, esôfago, cauda do pâncreas, flexura duodenojejunal e os dois rins.'),
        ],
      },
      {
        id: 'st-p014', ref: '14', title: t('Relations of the cardia', 'Relações da cárdia'),
        focus: ['esophagus', 'diaphragm_g'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The cardia is related to the left crus of the diaphragm and to the left lobe of the liver. The right-hand figure on p014 shows the Diaphragm from the front with an arrow on its left crus, the muscular pillar that descends along the vertebral column on the left. The Esophagus passes through the diaphragm just above, and the cardia lies right where it ends, against that crus behind and under the left lobe of the liver in front.',
            'A cárdia relaciona-se com o pilar esquerdo do diafragma e com o lobo esquerdo do fígado. A figura da direita na p014 mostra o diafragma de frente com uma seta no pilar esquerdo, a coluna muscular que desce ao longo da coluna vertebral à esquerda. O esôfago atravessa o diafragma logo acima, e a cárdia fica exatamente onde ele termina, contra esse pilar atrás e sob o lobo esquerdo do fígado na frente.'),
        ],
      },
      {
        id: 'st-p015', ref: '15–17', title: t('Anterior wall: Traube’s space and Labbé’s triangle', 'Parede anterior: espaço de Traube e triângulo de Labbé'),
        focus: ['stomach'], ghost: ['diaphragm_g'], view: 'ant',
        body: [
          t('The anterior wall of the stomach is divided into (I) a thoracic part and (II) an abdominal part.',
            'A parede anterior do estômago divide-se em (I) parte torácica e (II) parte abdominal.'),
          t('(I) Thoracic part: it lies behind ribs 5 to 9 and is covered by the left lobe of the liver, the Diaphragm and the anterior abdominal wall. Here lies Traube’s semilunar space, bounded medially by the left costal margin from the xiphoid process to the 9th rib, superiorly by the 5th to 6th ribs, and laterally by the midaxillary line from the 5th to the 9th rib.',
            '(I) Parte torácica: fica atrás das costelas 5 a 9 e é coberta pelo lobo esquerdo do fígado, pelo diafragma e pela parede abdominal anterior. Aqui está o espaço semilunar de Traube, limitado medialmente pela margem costal esquerda do processo xifoide até a 9ª costela, superiormente pela 5ª a 6ª costelas e lateralmente pela linha axilar média da 5ª à 9ª costela.'),
          t('(II) Abdominal part: it includes the inferior third of the body and the pylorus, and it is in direct contact with the anterior abdominal wall. Here lies Labbé’s triangle, bounded inferiorly by a horizontal line below the 9th costal cartilage, on the left by the rib margin and on the right by the left lobe of the liver.',
            '(II) Parte abdominal: inclui o terço inferior do corpo e o piloro e está em contato direto com a parede abdominal anterior. Aqui está o triângulo de Labbé, limitado inferiormente por uma linha horizontal abaixo da 9ª cartilagem costal, à esquerda pela margem costal e à direita pelo lobo esquerdo do fígado.'),
          t('Both slides end with «Importance?», and p017 answers with its title: these are areas of semiotic interest, surface areas where the stomach can be examined from outside. The p017 figure draws the stomach on the body surface with the sternal, midclavicular and anterior axillary lines, the fourth intercostal space, the left lung, the seventh sternocostal joint marking the cardia and the eighth costal cartilage. Traube’s semilunar space is the area over the thoracic part; Labbé’s triangle is the area below the costal margin where the stomach touches the abdominal wall.',
            'Os dois slides terminam com «Importância?», e a p017 responde no título: são áreas de interesse semiológico, áreas da superfície onde o estômago pode ser examinado por fora. A figura da p017 desenha o estômago na superfície do corpo com as linhas esternal, hemiclavicular e axilar anterior, o quarto espaço intercostal, o pulmão esquerdo, a sétima articulação esternocostal marcando a cárdia e a oitava cartilagem costal. O espaço semilunar de Traube é a área sobre a parte torácica; o triângulo de Labbé é a área abaixo da margem costal onde o estômago toca a parede abdominal.'),
        ],
      },
      {
        id: 'st-p018', ref: '18', title: t('Posterior wall: the stomach bed', 'Parede posterior: o leito do estômago'),
        focus: ['diaphragm_g', 'spleen', 'pancreas', 'transverse_colon'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The posterior wall is related to the organs of the supramesocolic space. From superior to inferior it touches: the Diaphragm, the Spleen, the left suprarenal gland, the left kidney, the Pancreas and the transverse mesocolon. In the 3D model the stomach is made transparent so you can see what lies behind it: diaphragm at the top, spleen on the left, pancreas running across, and the Transverse colon whose mesocolon closes the bed below. (Kidney and suprarenal gland are not in this 3D set.)',
            'A parede posterior relaciona-se com os órgãos do espaço supramesocólico. De cima para baixo, ela toca: o diafragma, o baço, a glândula suprarrenal esquerda, o rim esquerdo, o pâncreas e o mesocolo transverso. No modelo 3D o estômago fica transparente para você ver o que está atrás dele: diafragma no alto, baço à esquerda, pâncreas atravessando e o colo transverso, cujo mesocolo fecha o leito embaixo. (Rim e glândula suprarrenal não estão neste conjunto 3D.)'),
          t('The cross-section on p018 (at the level of L1) shows why these organs do not touch the stomach directly: the omental bursa (lesser sac) lies between them. From front to back: Stomach, omental bursa, then pancreas and kidney on the posterior wall. The section also labels the lesser omentum (hepatoduodenal and hepatogastric ligaments), the greater omentum, the gastrosplenic ligament, the omental (epiploic) foramen, the Splenic vein, and in the free edge of the lesser omentum the portal triad: (common) bile duct, Hepatic portal vein and hepatic artery proper.',
            'O corte transversal da p018 (no nível de L1) mostra por que esses órgãos não tocam diretamente o estômago: a bolsa omental (pequena cavidade) fica entre eles. De frente para trás: estômago, bolsa omental e então pâncreas e rim na parede posterior. O corte também identifica o omento menor (ligamentos hepatoduodenal e hepatogástrico), o omento maior, o ligamento gastroesplênico, o forame omental (epiploico), a veia esplênica e, na borda livre do omento menor, a tríade portal: ducto colédoco, veia porta hepática e artéria hepática própria.'),
        ],
      },
      {
        id: 'st-p019', ref: '19', title: t('Relations of the pylorus', 'Relações do piloro'),
        focus: ['pancreas', 'caudate_lobe', 'duodenum'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The pylorus is located on the right of the body midline, at L1. Posteriorly it is in contact with the head of the Pancreas; anteriorly it is in contact with the caudate lobe of the liver. In the 3D model, find where the Stomach joins the Duodenum: the pancreatic head lies behind this junction and the Caudate lobe of liver above and in front.',
            'O piloro fica à direita da linha mediana, em L1. Posteriormente está em contato com a cabeça do pâncreas; anteriormente, com o lobo caudado do fígado. No modelo 3D, encontre onde o estômago se une ao duodeno: a cabeça do pâncreas fica atrás dessa junção e o lobo caudado do fígado acima e à frente.'),
          t('The figure on p019 draws the stomach semi-transparently over the posterior abdominal wall so you can see what it rests on: left hemidiaphragm with the left inferior phrenic artery and the decussating fibres of the right crus, left suprarenal gland, Spleen, Splenic artery, body of the pancreas, origin of the mesentery of the transverse colon, left kidney and duodenojejunal flexure.',
            'A figura da p019 desenha o estômago de forma semitransparente sobre a parede abdominal posterior para mostrar sobre o que ele repousa: hemidiafragma esquerdo com a artéria frênica inferior esquerda e as fibras decussadas do pilar direito, glândula suprarrenal esquerda, baço, artéria esplênica, corpo do pâncreas, origem do mesentério do colo transverso, rim esquerdo e flexura duodenojejunal.'),
        ],
      },
      {
        id: 'st-p022', ref: '22', title: t('Mobility of the stomach', 'Mobilidade do estômago'),
        focus: ['stomach'], ghost: ['caudate_lobe', 'gallbladder'], view: 'ant',
        body: [
          t('When the abdomen is opened, very little of the stomach is visible, because most of it is hidden by the liver. Because of its peritoneal covering, the stomach is very mobile relative to the neighbouring organs, and this mobility is important for its peristaltic movements.',
            'Quando o abdome é aberto, vê-se muito pouco do estômago, porque a maior parte está escondida pelo fígado. Graças ao revestimento peritoneal, o estômago é muito móvel em relação aos órgãos vizinhos, e essa mobilidade é importante para seus movimentos peristálticos.'),
          t('The cross-section on p022 shows the stomach separated from the Inferior vena cava, Abdominal aorta, left kidney and Pancreas by the omental bursa, with its splenic recess reaching toward the Spleen, and the lesser omentum (hepatogastric ligament) attaching the stomach to the liver.',
            'O corte transversal da p022 mostra o estômago separado da veia cava inferior, da aorta abdominal, do rim esquerdo e do pâncreas pela bolsa omental, cujo recesso esplênico chega até o baço, e o omento menor (ligamento hepatogástrico) prendendo o estômago ao fígado.'),
        ],
      },
    ],
    questions: [
      { ref: '13', q: 'During exhalation, how high does the fundus rise?', correct: 'To the 5th rib on the midclavicular line', wrong: ['To the 9th rib on the midaxillary line', 'To the xiphoid process', 'To the 2nd intercostal space'], why: 'Slide 13: during exhalation the fundus rises to the height of the 5th rib on the midclavicular line.' },
      { ref: '14', q: 'Which structures are related to the cardia?', correct: 'Left crus of the diaphragm and left lobe of the liver', wrong: ['Right crus and caudate lobe', 'Spleen and left kidney', 'Pancreatic head and duodenum'], why: 'Slide 14: cardia — left crus of the diaphragm and left lobe of the liver.' },
      { ref: '15', q: 'What is the superior boundary of Traube’s semilunar space?', correct: '5th to 6th ribs', wrong: ['9th costal cartilage', 'Midaxillary line', 'Left lobe of the liver'], why: 'Slide 15: medially the left costal margin from xiphoid to 9th rib; superiorly 5th–6th ribs; laterally the midaxillary line from 5th to 9th rib.' },
      { ref: '16', q: 'Which structure forms the right side of Labbé’s triangle?', correct: 'Left lobe of the liver', wrong: ['Left costal margin', 'A horizontal line below the 9th costal cartilage', 'Midclavicular line'], why: 'Slide 16: inferiorly a horizontal line below the 9th costal cartilage, left the rib margin, right the left lobe of the liver.' },
      { ref: '18', q: 'Which of these is NOT listed on slide 18 among the posterior relations of the stomach?', correct: 'Gallbladder', wrong: ['Spleen', 'Left suprarenal gland', 'Transverse mesocolon'], why: 'Slide 18: superior to inferior — diaphragm, spleen, left suprarenal, left kidney, pancreas, transverse mesocolon.' },
      { ref: '19', q: 'What lies directly behind the pylorus?', correct: 'Head of the pancreas', wrong: ['Caudate lobe of the liver', 'Left kidney', 'Spleen'], why: 'Slide 19: pylorus at L1, right of the midline; posteriorly the pancreatic head, anteriorly the caudate lobe.' },
    ],
  },
  {
    id: 'stomach-4', title: t('Peritoneum, ligaments and omental bursa', 'Peritônio, ligamentos e bolsa omental'),
    cards: [
      {
        id: 'st-p023', ref: '23', title: t('Anterior and posterior peritoneal sheets', 'Folhetos peritoneais anterior e posterior'),
        focus: ['stomach', 'duodenum'], view: 'ant',
        body: [
          t('The stomach is wrapped by two peritoneal sheets. The anterior peritoneal sheet covers the front of the stomach and continues onto the anterior part of the Duodenum. The posterior peritoneal sheet covers the back: superiorly it terminates at the body, and it also continues onto the duodenum.',
            'O estômago é envolvido por dois folhetos peritoneais. O folheto peritoneal anterior cobre a frente do estômago e continua na parte anterior do duodeno. O folheto peritoneal posterior cobre a face de trás: superiormente termina no corpo e também continua no duodeno.'),
          t('The drawings (a, b) show the cut edges of the peritoneum along both curvatures, where the two sheets meet and leave the stomach to form the ligaments of the next page. The cadaver photographs show the same lines as yellowish fatty strips along the curvatures; on the posterior view a double-headed arrow spans the uncovered strip where the two sheets diverge.',
            'Os desenhos (a, b) mostram as bordas cortadas do peritônio ao longo das duas curvaturas, onde os dois folhetos se encontram e deixam o estômago para formar os ligamentos da página seguinte. As fotografias de cadáver mostram as mesmas linhas como faixas gordurosas amareladas ao longo das curvaturas; na vista posterior uma seta dupla atravessa a faixa descoberta onde os dois folhetos se separam.'),
        ],
      },
      {
        id: 'st-p024', ref: '24', title: t('Means of attachment: the four ligaments', 'Meios de fixação: os quatro ligamentos'),
        focus: ['stomach', 'spleen', 'transverse_colon', 'diaphragm_g'], view: 'ant',
        body: [
          t('Where the two sheets leave the stomach they form its means of attachment and peritoneal reflections. Go around the stomach in the 3D model while reading the four:',
            'Onde os dois folhetos deixam o estômago, eles formam os meios de fixação e as reflexões peritoneais. Dê a volta no estômago no modelo 3D enquanto lê os quatro:'),
          t('1. Gastrophrenic ligament: the two sheets reflect onto the Diaphragm and continue with the parietal peritoneum.',
            '1. Ligamento gastrofrênico: os dois folhetos refletem-se sobre o diafragma e continuam com o peritônio parietal.'),
          t('2. Gastrosplenic ligament: the two sheets fuse at the hilum of the Spleen.',
            '2. Ligamento gastroesplênico: os dois folhetos fundem-se no hilo do baço.'),
          t('3. Gastrocolic ligament: the two sheets fuse to form the anterior root of the greater omentum, which hangs over the Transverse colon.',
            '3. Ligamento gastrocólico: os dois folhetos fundem-se para formar a raiz anterior do omento maior, que pende sobre o colo transverso.'),
          t('4. Hepatogastric ligament and hepatoduodenal ligament: the remaining part connects the stomach and duodenum to the hilum of the liver and forms the small (lesser) omentum.',
            '4. Ligamento hepatogástrico e ligamento hepatoduodenal: a parte restante liga o estômago e o duodeno ao hilo do fígado e forma o omento menor.'),
        ],
      },
      {
        id: 'st-p025', ref: '25–26', title: t('Omental bursa and epiploic foramen', 'Bolsa omental e forame epiploico'),
        focus: ['stomach', 'pancreas', 'spleen'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Behind the stomach lies the omental bursa, or lesser sac. It communicates with the rest of the peritoneal cavity through a single opening, the epiploic foramen.',
            'Atrás do estômago fica a bolsa omental, ou pequena cavidade. Ela se comunica com o restante da cavidade peritoneal por uma única abertura, o forame epiploico.'),
          t('The diagrams on p025 show how this arrangement forms. On the left figure the gastrophrenic, gastrocolic, gastrosplenic and hepatogastric ligaments are labelled; in the sequence of cross-sections (a–c) on the right, the hepatic bud and the splenic bud grow inside the mesenteries of the stomach: the falciform ligament and the lesser omentum (hepatogastric ligament) are in front, toward the liver; the gastrosplenic ligament and the splenorenal ligament, both labelled as part of the greater omentum, are behind, toward the Spleen and left kidney. The pancreatic bud, Pancreas and retroperitoneal space are also labelled. As the stomach rotates, the space trapped behind it becomes the omental bursa, and the bottom-right drawing shows a finger entering the epiploic foramen.',
            'Os esquemas da p025 mostram como esse arranjo se forma. Na figura da esquerda estão marcados os ligamentos gastrofrênico, gastrocólico, gastroesplênico e hepatogástrico; na sequência de cortes transversais (a–c) à direita, o broto hepático e o broto esplênico crescem dentro dos mesentérios do estômago: o ligamento falciforme e o omento menor (ligamento hepatogástrico) ficam na frente, em direção ao fígado; o ligamento gastroesplênico e o ligamento esplenorrenal, ambos marcados como parte do omento maior, ficam atrás, em direção ao baço e ao rim esquerdo. Também estão marcados o broto pancreático, o pâncreas e o espaço retroperitoneal. Conforme o estômago gira, o espaço preso atrás dele torna-se a bolsa omental, e o desenho inferior direito mostra um dedo entrando pelo forame epiploico.'),
          t('Page 26 is a cross-section that ties it together. The omental (epiploic) foramen of Winslow opens behind the free edge of the lesser omentum, where the portal triad runs: (common) bile duct, Hepatic portal vein and hepatic artery proper. Behind the foramen lies the Inferior vena cava. The section also shows the Abdominal aorta, Diaphragm, both kidneys, the Splenic vein, the gastrosplenic ligament, the greater omentum, the Transverse colon with the transverse mesocolon, the Duodenum and the parietal and visceral peritoneum.',
            'A página 26 é um corte transversal que junta tudo. O forame omental (epiploico) de Winslow abre-se atrás da borda livre do omento menor, onde corre a tríade portal: ducto colédoco, veia porta hepática e artéria hepática própria. Atrás do forame fica a veia cava inferior. O corte também mostra a aorta abdominal, o diafragma, os dois rins, a veia esplênica, o ligamento gastroesplênico, o omento maior, o colo transverso com o mesocolo transverso, o duodeno e o peritônio parietal e visceral.'),
        ],
      },
    ],
    questions: [
      { ref: '24', q: 'Which ligament is formed where the two peritoneal sheets fuse at the hilum of the spleen?', correct: 'Gastrosplenic ligament', wrong: ['Gastrophrenic ligament', 'Gastrocolic ligament', 'Hepatogastric ligament'], why: 'Slide 24: gastrosplenic ligament — two sheets fuse at the hilum of the spleen.' },
      { ref: '24', q: 'Which ligament forms the anterior root of the greater omentum?', correct: 'Gastrocolic ligament', wrong: ['Gastrosplenic ligament', 'Hepatoduodenal ligament', 'Gastrophrenic ligament'], why: 'Slide 24: gastrocolic ligament — two sheets fuse to form the anterior root of the greater omentum.' },
      { ref: '24', q: 'Which two ligaments form the small (lesser) omentum?', correct: 'Hepatogastric and hepatoduodenal', wrong: ['Gastrosplenic and gastrocolic', 'Gastrophrenic and gastrosplenic', 'Falciform and gastrocolic'], why: 'Slide 24: the hepatogastric and hepatoduodenal ligaments connect to the hilum of the liver and form the small omentum.' },
      { ref: '25', q: 'Through which opening does the omental bursa communicate with the peritoneal cavity?', correct: 'Epiploic foramen', wrong: ['Esophageal hiatus', 'Pyloric orifice', 'Aortic hiatus'], why: 'Slide 25: the omental bursa (lesser sac) communicates with the peritoneal cavity through the epiploic foramen.' },
      { ref: '23', q: 'Where does the posterior peritoneal sheet terminate superiorly?', correct: 'At the body', wrong: ['At the diaphragm', 'At the pylorus', 'At the hilum of the spleen'], why: 'Slide 23: posterior peritoneal sheet — superiorly it terminates at the body; it continues on the duodenum.' },
    ],
  },
  {
    id: 'stomach-5', title: t('Arterial supply and venous drainage', 'Irrigação arterial e drenagem venosa'),
    cards: [
      {
        id: 'st-p027', ref: '27–28', title: t('Celiac trunk and the two arcades', 'Tronco celíaco e as duas arcadas'),
        focus: ['celiac_trunk', 'left_gastric_a', 'splenic_a', 'common_hepatic_a'], ghost: ['stomach'], view: 'ant',
        body: [
          t('All arteries of the stomach come from the Celiac trunk, which arises from the Abdominal aorta at T12. It has three branches: the Left gastric artery, the Splenic artery and the Common hepatic artery. The p027 figure shows the trunk leaving the front of the aorta just below the aortic hiatus (median arcuate ligament), with the Superior mesenteric artery just below it.',
            'Todas as artérias do estômago vêm do tronco celíaco, que nasce da aorta abdominal em T12. Ele tem três ramos: a artéria gástrica esquerda, a artéria esplênica e a artéria hepática comum. A figura da p027 mostra o tronco saindo da frente da aorta logo abaixo do hiato aórtico (ligamento arqueado mediano), com a artéria mesentérica superior logo abaixo.'),
          t('Page 28 gives the organising idea: the branches form two anastomotic arcades, one along the lesser curvature and one along the greater curvature. In the 3D model, highlight the arteries and trace the two loops around the transparent stomach.',
            'A página 28 dá a ideia organizadora: os ramos formam duas arcadas anastomóticas, uma ao longo da curvatura menor e outra ao longo da curvatura maior. No modelo 3D, destaque as artérias e trace as duas alças em volta do estômago transparente.'),
          t('### Lesser curvature arcade', '### Arcada da curvatura menor'),
          t('Left gastric artery (from the celiac trunk) + Right gastric artery (from the proper hepatic artery).',
            'Artéria gástrica esquerda (do tronco celíaco) + artéria gástrica direita (da artéria hepática própria).'),
          t('### Greater curvature arcade', '### Arcada da curvatura maior'),
          t('Left gastro-omental artery (from the splenic artery) + right gastro-omental artery (from the gastroduodenal artery). In this 3D set both are shown as one mesh, the Gastro-omental arteries.',
            'Artéria gastromental esquerda (da artéria esplênica) + artéria gastromental direita (da artéria gastroduodenal). Neste conjunto 3D as duas aparecem como uma única malha, as artérias gastromentais.'),
          t('The p028 figure also labels the left and right hepatic arteries, the cystic artery, the portal vein, the anterior and posterior superior pancreaticoduodenal arteries, duodenal branches, pancreatic branches and the inferior pancreaticoduodenal artery from the Superior mesenteric artery.',
            'A figura da p028 também identifica as artérias hepáticas esquerda e direita, a artéria cística, a veia porta, as artérias pancreaticoduodenais superiores anterior e posterior, ramos duodenais, ramos pancreáticos e a artéria pancreaticoduodenal inferior vinda da artéria mesentérica superior.'),
        ],
      },
      {
        id: 'st-p029', ref: '29', title: t('Left gastric artery', 'Artéria gástrica esquerda'),
        focus: ['left_gastric_a'], ghost: ['stomach', 'esophagus'], view: 'ant',
        body: [
          t('From its origin on the celiac trunk the Left gastric artery moves to the left and upward to reach the cardia. There it turns and runs downward and to the right along the lesser curvature, where it anastomoses with the Right gastric artery (a branch of the hepatic artery). Trace this hook shape in the model: up to the cardia, then down the lesser curvature.',
            'Desde a origem no tronco celíaco, a artéria gástrica esquerda vai para a esquerda e para cima até alcançar a cárdia. Ali ela faz uma curva e desce para a direita ao longo da curvatura menor, onde se anastomosa com a artéria gástrica direita (ramo da artéria hepática). Trace esse formato de gancho no modelo: sobe até a cárdia e depois desce pela curvatura menor.'),
          t('Its branches: at the cardia, esophageal branches go upward through the diaphragm to anastomose with the esophageal arteries of the thoracic aorta. Along the lesser curvature it gives (I) visceral branches for the anterior and posterior faces of the stomach, some of which anastomose with the gastric branches of the Splenic artery, and (II) branches for the hepatogastric ligament. The p031 summary figure gives its territory: lesser curvature of the stomach, abdominal part of the esophagus and hepatogastric ligament.',
            'Seus ramos: na cárdia, ramos esofágicos sobem através do diafragma para se anastomosar com as artérias esofágicas da aorta torácica. Ao longo da curvatura menor, ela dá (I) ramos viscerais para as faces anterior e posterior do estômago, alguns dos quais se anastomosam com os ramos gástricos da artéria esplênica, e (II) ramos para o ligamento hepatogástrico. A figura-resumo da p031 dá o território dela: curvatura menor do estômago, parte abdominal do esôfago e ligamento hepatogástrico.'),
        ],
      },
      {
        id: 'st-p030', ref: '30', title: t('Common hepatic and right gastric arteries', 'Artérias hepática comum e gástrica direita'),
        focus: ['common_hepatic_a', 'proper_hepatic_a', 'right_gastric_a'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The Common hepatic artery divides into the Gastroduodenal artery and continues as the Proper hepatic artery.',
            'A artéria hepática comum divide-se na artéria gastroduodenal e continua como artéria hepática própria.'),
          t('The Right gastric artery arises from the proper hepatic artery close to the pylorus. It goes down and then runs from right to left along the lesser curvature, and it terminates by anastomosing with the Left gastric artery. It supplies the pylorus, the lesser omentum and the stomach. So the lesser curvature arcade is closed from both ends: left gastric from the celiac trunk, right gastric from the proper hepatic.',
            'A artéria gástrica direita nasce da artéria hepática própria perto do piloro. Ela desce e depois corre da direita para a esquerda ao longo da curvatura menor, terminando em anastomose com a artéria gástrica esquerda. Irriga o piloro, o omento menor e o estômago. Assim, a arcada da curvatura menor é fechada pelas duas pontas: gástrica esquerda do tronco celíaco, gástrica direita da hepática própria.'),
        ],
      },
      {
        id: 'st-p031', ref: '31–33', title: t('Gastroduodenal artery and its two terminal branches', 'Artéria gastroduodenal e seus dois ramos terminais'),
        focus: ['gastroduodenal_a', 'gastroepiploic_a', 'pancreaticoduodenal_a'], ghost: ['stomach', 'pancreas', 'duodenum'], view: 'ant',
        body: [
          t('The Gastroduodenal artery arises superior or posterior to the first part of the Duodenum. It descends between the duodenum and the neck of the Pancreas, gives small branches to the pylorus, and terminates by dividing into (I) the right gastro-omental artery and (II) the superior pancreaticoduodenal artery. The p031 summary figure lists its territory: stomach, duodenum, pancreas and greater omentum.',
            'A artéria gastroduodenal nasce acima ou atrás da primeira parte do duodeno. Ela desce entre o duodeno e o colo do pâncreas, dá pequenos ramos ao piloro e termina dividindo-se em (I) artéria gastromental direita e (II) artéria pancreaticoduodenal superior. A figura-resumo da p031 lista seu território: estômago, duodeno, pâncreas e omento maior.'),
          t('(I) The right gastro-omental artery runs to the left along the greater curvature and terminates by anastomosing with the left gastro-omental artery, a branch of the splenic artery. It gives several visceral branches to the stomach and omental branches to the greater omentum (p032). It is part of the Gastro-omental arteries mesh in the model.',
            '(I) A artéria gastromental direita corre para a esquerda ao longo da curvatura maior e termina em anastomose com a artéria gastromental esquerda, ramo da artéria esplênica. Ela dá vários ramos viscerais ao estômago e ramos omentais ao omento maior (p032). No modelo, faz parte da malha das artérias gastromentais.'),
          t('(II) The superior pancreaticoduodenal artery goes down on the right, behind the head of the pancreas, supplying stomach, pancreas and duodenum. It terminates by anastomosing with the inferior pancreaticoduodenal artery, a branch of the Superior mesenteric artery (p033). In the model, both run in the Pancreaticoduodenal arteries mesh around the pancreatic head. This is a link between the celiac territory and the superior mesenteric territory.',
            '(II) A artéria pancreaticoduodenal superior desce à direita, atrás da cabeça do pâncreas, irrigando estômago, pâncreas e duodeno. Termina em anastomose com a artéria pancreaticoduodenal inferior, ramo da artéria mesentérica superior (p033). No modelo, as duas estão na malha das artérias pancreaticoduodenais em volta da cabeça do pâncreas. Essa é uma ligação entre o território celíaco e o território mesentérico superior.'),
        ],
      },
      {
        id: 'st-p035', ref: '34–36', title: t('Splenic artery and the full arterial map', 'Artéria esplênica e o mapa arterial completo'),
        focus: ['splenic_a', 'gastroepiploic_a'], ghost: ['stomach', 'spleen', 'pancreas'], view: 'ant',
        body: [
          t('The Splenic artery is the biggest of the three celiac branches and runs toward the Spleen. Its gastric branches are (I) the short gastric arteries, which go to the fundus of the stomach, and (II) the left gastro-omental artery, which goes down to the greater curvature and terminates by anastomosing with the right gastro-omental artery (branch of the gastroduodenal artery). The left gastro-omental artery supplies the fundus and body of the stomach and the greater omentum. This closes the greater curvature arcade.',
            'A artéria esplênica é o maior dos três ramos celíacos e corre em direção ao baço. Seus ramos gástricos são (I) as artérias gástricas curtas, que vão ao fundo do estômago, e (II) a artéria gastromental esquerda, que desce até a curvatura maior e termina em anastomose com a artéria gastromental direita (ramo da artéria gastroduodenal). A artéria gastromental esquerda irriga o fundo e o corpo do estômago e o omento maior. Isso fecha a arcada da curvatura maior.'),
          t('Page 34 repeats the overview diagram with all labels and no text, a good self-test: name every vessel from the celiac trunk outward. Page 36 is a detailed figure that adds vessels not described in the text: right and left branches of the proper hepatic artery, the cystic artery, supraduodenal and retroduodenal arteries, posterior gastric artery, dorsal, great, caudal, transverse and inferior pancreatic arteries, anterior and posterior superior pancreaticoduodenal arteries, the left branch of the middle colic artery, and both renal arteries.',
            'A página 34 repete o esquema geral com todas as legendas e sem texto, um bom autoteste: nomeie cada vaso a partir do tronco celíaco. A página 36 é uma figura detalhada que acrescenta vasos não descritos no texto: ramos direito e esquerdo da artéria hepática própria, artéria cística, artérias supraduodenal e retroduodenais, artéria gástrica posterior, artérias pancreáticas dorsal, magna, caudal, transversa e inferior, artérias pancreaticoduodenais superiores anterior e posterior, ramo esquerdo da artéria cólica média e as duas artérias renais.'),
        ],
      },
      {
        id: 'st-p037', ref: '37', title: t('Venous drainage', 'Drenagem venosa'),
        focus: ['gastric_v', 'splenic_v', 'hepatic_portal_v', 'smv'], ghost: ['stomach', 'spleen', 'pancreas'], view: 'ant',
        body: [
          t('Page 37 asks «Venous drainage?» and answers: the portal vein. The figure shows the gastric veins running alongside the arteries of the same name: left and right gastric veins, short gastric veins, and left and right gastro-omental veins, together with esophageal, splenic, pancreaticoduodenal, middle colic and superior mesenteric veins. Rather than emptying directly into the Inferior vena cava (which receives the hepatic veins at the top), this gastric venous blood drains into the Hepatic portal vein.',
            'A página 37 pergunta «Drenagem venosa?» e responde: a veia porta. A figura mostra as veias gástricas acompanhando as artérias de mesmo nome: veias gástricas esquerda e direita, veias gástricas curtas e veias gastromentais esquerda e direita, além das veias esofágicas, esplênica, pancreaticoduodenal, cólica média e mesentérica superior. Em vez de desembocar diretamente na veia cava inferior (que recebe as veias hepáticas no alto), esse sangue venoso gástrico drena para a veia porta hepática.'),
          t('In the model, follow the Gastric veins along the lesser curvature, the Splenic vein running behind the pancreas from the spleen, and the Superior mesenteric vein coming up from below: they converge into the Hepatic portal vein heading to the liver.',
            'No modelo, siga as veias gástricas ao longo da curvatura menor, a veia esplênica correndo atrás do pâncreas desde o baço e a veia mesentérica superior subindo de baixo: elas convergem na veia porta hepática a caminho do fígado.'),
        ],
      },
    ],
    questions: [
      { ref: '27', q: 'At which vertebral level does the celiac trunk arise?', correct: 'T12', wrong: ['L1', 'T7', 'L3'], why: 'Slide 27: celiac trunk T12, with left gastric, splenic and common hepatic arteries.' },
      { ref: '30', q: 'From which artery does the right gastric artery arise?', correct: 'Proper hepatic artery', wrong: ['Gastroduodenal artery', 'Splenic artery', 'Left gastric artery'], why: 'Slide 30: the right gastric artery originates from the proper hepatic artery close to the pylorus.' },
      { ref: '31', q: 'What are the two terminal branches of the gastroduodenal artery?', correct: 'Right gastro-omental and superior pancreaticoduodenal arteries', wrong: ['Right gastric and left gastric arteries', 'Short gastric and left gastro-omental arteries', 'Proper hepatic and cystic arteries'], why: 'Slide 31: the gastroduodenal artery terminates by dividing into the right gastro-omental and superior pancreaticoduodenal arteries.' },
      { ref: '33', q: 'With which artery does the superior pancreaticoduodenal artery anastomose?', correct: 'Inferior pancreaticoduodenal artery (from the superior mesenteric artery)', wrong: ['Right gastric artery', 'Left gastro-omental artery', 'Short gastric arteries'], why: 'Slide 33: it ends by anastomosing with the inferior pancreaticoduodenal artery, a branch of the superior mesenteric artery.' },
      { ref: '35', q: 'Which arteries reach the fundus directly from the splenic artery?', correct: 'Short gastric arteries', wrong: ['Right gastro-omental artery', 'Esophageal branches', 'Right gastric artery'], why: 'Slide 35: splenic artery branches — short gastric arteries toward the fundus and the left gastro-omental artery.' },
      { ref: '37', q: 'Where does the venous blood of the stomach drain?', correct: 'Portal vein', wrong: ['Inferior vena cava directly', 'Azygos vein', 'Renal veins'], why: 'Slide 37: venous drainage — portal vein.' },
    ],
  },
  {
    id: 'stomach-6', title: t('Microscopic anatomy', 'Anatomia microscópica'),
    cards: [
      {
        id: 'st-p038', ref: '38–40', title: t('Wall layers and the secretory epithelium', 'Camadas da parede e o epitélio secretor'),
        focus: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('Page 38 shows the general plan of the digestive wall: mucosa (mucous epithelium, lamina propria, muscularis mucosae, lymph nodules), submucosa (with glands, ducts and the submucosal plexus), muscularis (circular and longitudinal layers, with the myenteric plexus between them) and serosa (connective tissue covered by peritoneum), with the mesentery carrying nerves and blood vessels. Of these layers, the mucosa varies most along the tract, because it adapts to the function of each segment: protection, secretion or absorption.',
            'A página 38 mostra o plano geral da parede digestiva: mucosa (epitélio mucoso, lâmina própria, muscular da mucosa, nódulos linfáticos), submucosa (com glândulas, ductos e plexo submucoso), muscular (camadas circular e longitudinal, com o plexo mioentérico entre elas) e serosa (tecido conjuntivo coberto por peritônio), com o mesentério levando nervos e vasos sanguíneos. Dessas camadas, a mucosa é a que mais varia ao longo do tubo, porque se adapta à função de cada segmento: proteção, secreção ou absorção.'),
          t('Page 39 recalls the rugae, longitudinal folds of the mucosa that disappear when the stomach is distended, and introduces the pits, small openings in the surface.',
            'A página 39 relembra as rugas, pregas longitudinais da mucosa que desaparecem quando o estômago está distendido, e apresenta as fossetas, pequenas aberturas na superfície.'),
          t('Page 40 describes the gastric mucosa in three parts. (I) Epithelium: a secretory simple columnar epithelium that covers the entire luminal surface. Its cells produce and secrete large amounts of mucus, which forms a layer on the inner surface and protects the wall from the corrosive gastric juice (pH 1–2). That is why it is called a secretory epithelium. (II) Lamina propria: contains the gastric glands. (III) Muscularis mucosae: thin smooth muscle cells around the gastric glands that help them secrete.',
            'A página 40 descreve a mucosa gástrica em três partes. (I) Epitélio: um epitélio simples colunar secretor que reveste toda a superfície luminal. Suas células produzem e secretam grandes quantidades de muco, que forma uma camada na superfície interna e protege a parede do suco gástrico corrosivo (pH 1–2). Por isso é chamado de epitélio secretor. (II) Lâmina própria: contém as glândulas gástricas. (III) Muscular da mucosa: finas células musculares lisas em volta das glândulas gástricas que ajudam na secreção.'),
        ],
      },
      {
        id: 'st-p041', ref: '41–43', title: t('Gastric pits and principal glands', 'Fossetas gástricas e glândulas principais'),
        focus: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('The epithelium has pits that, unlike the rugae, are not obliterated when the stomach fills. At the base of the pits open tubular gastric glands, whose cell composition differs by region: 1. principal glands, 2. cardiac glands, 3. pyloric glands.',
            'O epitélio tem fossetas que, ao contrário das rugas, não se apagam quando o estômago se enche. No fundo das fossetas abrem-se as glândulas gástricas tubulares, cuja composição celular varia por região: 1. glândulas principais, 2. glândulas cárdicas, 3. glândulas pilóricas.'),
          t('Principal glands are found in the body and fundus and contain five cell types:',
            'As glândulas principais ficam no corpo e no fundo e contêm cinco tipos celulares:'),
          t('1. Parietal cells: they bear many microvilli rich in H+/K+ ATPase antiporters that actively secrete H+ into the lumen; Cl− follows the electrochemical gradient. They have many mitochondria and also secrete intrinsic factor. Page 43 adds that their plasma membrane invaginates to form a system of anastomosing channels, the intracellular canalicular system.',
            '1. Células parietais: têm muitas microvilosidades ricas em antiportadores H+/K+ ATPase que secretam ativamente H+ para a luz; o Cl− segue o gradiente eletroquímico. Têm muitas mitocôndrias e também secretam fator intrínseco. A página 43 acrescenta que a membrana plasmática se invagina formando um sistema de canais anastomosados, o sistema canalicular intracelular.'),
          t('2. Chief (peptic) cells: they secrete pepsinogen and chymosin (rennin) and contain secretory zymogen granules (seen on p043).',
            '2. Células principais (pépticas): secretam pepsinogênio e quimosina (renina) e contêm grânulos secretores de zimogênio (vistos na p043).'),
          t('3. Mucous neck cells: secrete mucus.', '3. Células mucosas do colo: secretam muco.'),
          t('4. Neuroendocrine cells: they produce gastrin (stimulates gastric juice production), serotonin (stimulates contraction of gastric smooth muscle), ghrelin (stimulates the hypothalamus and makes us hungry), histamine (stimulates HCl production; the figure labels ECL cells) and somatostatin (at the end of digestion, slows the other cells).',
            '4. Células neuroendócrinas: produzem gastrina (estimula a produção de suco gástrico), serotonina (estimula a contração da musculatura lisa gástrica), grelina (estimula o hipotálamo e nos dá fome), histamina (estimula a produção de HCl; a figura marca as células ECL) e somatostatina (no fim da digestão, freia as outras células).'),
          t('5. Stem cells.', '5. Células-tronco.'),
        ],
      },
      {
        id: 'st-p044', ref: '44–45', title: t('Cardiac and pyloric glands; lamina propria and submucosa', 'Glândulas cárdicas e pilóricas; lâmina própria e submucosa'),
        focus: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('Cardiac glands: some are simple tubular, others compound branched tubular glands. They contain mainly mucus-secreting cells and few of the other types.',
            'Glândulas cárdicas: algumas são tubulares simples, outras tubulares ramificadas compostas. Contêm principalmente células secretoras de muco e poucas dos outros tipos.'),
          t('Pyloric glands: mainly mucus-secreting cells and G cells (gastrin-producing cells). So the hormone gastrin is especially linked to the pyloric region.',
            'Glândulas pilóricas: principalmente células secretoras de muco e células G (produtoras de gastrina). Assim, o hormônio gastrina está especialmente ligado à região pilórica.'),
          t('(II) Lamina propria: connective tissue containing small masses of lymphoid tissue. (III) Muscularis mucosae: thin smooth muscle fibres that help empty the pit glands.',
            '(II) Lâmina própria: tecido conjuntivo com pequenas massas de tecido linfoide. (III) Muscular da mucosa: finas fibras musculares lisas que ajudam a esvaziar as glândulas das fossetas.'),
          t('Submucosa (p045): loose connective tissue containing Meissner’s plexus, which controls gland secretion and local blood flow.',
            'Submucosa (p045): tecido conjuntivo frouxo com o plexo de Meissner, que controla a secreção glandular e o fluxo sanguíneo local.'),
        ],
      },
      {
        id: 'st-p046', ref: '46–47', title: t('Muscularis externa and interstitial cells of Cajal', 'Muscular externa e células intersticiais de Cajal'),
        focus: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('The muscularis externa of the stomach has three layers: outer longitudinal, middle circular and inner oblique fibres (labelled in the p046 figure, which also shows the cardia, lesser and greater curvatures, angular notch, body, rugal folds, pyloric sphincter and superior part of the Duodenum). This three-layered wall enables the stomach to perform powerful churning movements. Muscle activity is controlled by autonomic nerve fibres lying between the circular and longitudinal layers: Auerbach’s plexus.',
            'A muscular externa do estômago tem três camadas: longitudinal externa, circular média e fibras oblíquas internas (marcadas na figura da p046, que também mostra a cárdia, as curvaturas menor e maior, a incisura angular, o corpo, as pregas gástricas, o esfíncter pilórico e a parte superior do duodeno). Essa parede de três camadas permite que o estômago faça movimentos potentes de mistura. A atividade muscular é controlada por fibras nervosas autonômicas situadas entre as camadas circular e longitudinal: o plexo de Auerbach.'),
          t('Interstitial cells of Cajal (ICCs) are found in the submucosa and the muscular layers. They contact nerve fibres and have numerous gap junctions with each other and with smooth muscle cells, so they generate the rhythmic slow contractions of the stomach: they are the electrical pacemaker for smooth muscle cells.',
            'As células intersticiais de Cajal (CIC) ficam na submucosa e nas camadas musculares. Elas fazem contato com fibras nervosas e têm numerosas junções comunicantes entre si e com as células musculares lisas, de modo que geram as contrações lentas e rítmicas do estômago: são o marca-passo elétrico das células musculares lisas.'),
          t('Most gastrointestinal contractions are rhythmic. The rhythm is maintained by slow waves, which are not action potentials but slow undulations of the resting membrane potential produced by the Cajal cells.',
            'A maioria das contrações gastrointestinais é rítmica. O ritmo é mantido pelas ondas lentas, que não são potenciais de ação, mas ondulações lentas do potencial de repouso da membrana produzidas pelas células de Cajal.'),
        ],
      },
      {
        id: 'st-p048', ref: '48', title: t('Endoscopic view and gastric ulcer', 'Visão endoscópica e úlcera gástrica'),
        focus: ['stomach'], view: 'ant',
        body: [
          t('Page 48 shows three endoscopic images. (A) The body of a normal stomach: the mucosa is raised into prominent, tortuous rugal folds that form the gastric canals. (B) The normal pyloric antrum: its folds are less prominent than in the body. (C) A gastric ulcer.',
            'A página 48 mostra três imagens endoscópicas. (A) O corpo de um estômago normal: a mucosa forma pregas gástricas proeminentes e tortuosas que formam os canais gástricos. (B) O antro pilórico normal: as pregas são menos proeminentes que no corpo. (C) Uma úlcera gástrica.'),
          t('A gastric ulcer is defined as a tissue defect that extends at least into the muscularis mucosae, but many ulcers extend much deeper into the stomach wall. Connect this with p040: the mucus layer is what normally protects the wall from the acid juice at pH 1–2.',
            'A úlcera gástrica é definida como uma perda de tecido que se estende pelo menos até a muscular da mucosa, mas muitas úlceras vão muito mais fundo na parede do estômago. Ligue isso à p040: a camada de muco é o que normalmente protege a parede do suco ácido de pH 1–2.'),
        ],
      },
    ],
    questions: [
      { ref: '40', q: 'What type of epithelium lines the stomach?', correct: 'Secretory simple columnar (mucus-secreting)', wrong: ['Stratified squamous non-keratinized', 'Simple cuboidal absorptive', 'Pseudostratified ciliated'], why: 'Slide 40: secretory simple columnar mucus-secreting epithelium covering the entire luminal surface; mucus protects against gastric juice pH 1–2.' },
      { ref: '42', q: 'Which cells secrete H+ through H+/K+ ATPase and also produce intrinsic factor?', correct: 'Parietal cells', wrong: ['Chief cells', 'Mucous neck cells', 'G cells'], why: 'Slide 42: parietal cells — microvilli rich in H+/K+ ATPase, many mitochondria, intrinsic factor.' },
      { ref: '42', q: 'What do chief (peptic) cells secrete?', correct: 'Pepsinogen and chymosin (rennin)', wrong: ['HCl and intrinsic factor', 'Gastrin', 'Mucus only'], why: 'Slide 42: chief cells secrete pepsinogen and chymosin and contain zymogen granules.' },
      { ref: '42', q: 'Which neuroendocrine product makes us hungry by acting on the hypothalamus?', correct: 'Ghrelin', wrong: ['Somatostatin', 'Serotonin', 'Histamine'], why: 'Slide 42: ghrelin stimulates the hypothalamus and makes us hungry.' },
      { ref: '44', q: 'Which glands contain mainly mucous cells and G (gastrin-producing) cells?', correct: 'Pyloric glands', wrong: ['Principal glands', 'Cardiac glands', 'Submucosal glands'], why: 'Slide 44: pyloric glands — mainly mucus-secreting cells and G cells.' },
      { ref: '46', q: 'Where does Auerbach’s plexus lie?', correct: 'Between the circular and longitudinal muscle layers', wrong: ['In the submucosa', 'In the lamina propria', 'Under the serosa only'], why: 'Slide 46: autonomic fibres between the circular and longitudinal layers (Auerbach’s plexus). Meissner’s plexus is in the submucosa (slide 45).' },
      { ref: '47', q: 'What do the interstitial cells of Cajal generate?', correct: 'Slow waves that pace smooth muscle', wrong: ['Action potentials in the vagus nerve', 'Gastric acid', 'Intrinsic factor'], why: 'Slide 47: ICCs are the electrical pacemaker; slow waves are not action potentials but slow undulations of the resting potential.' },
      { ref: '48', q: 'How deep must a tissue defect reach to be called a gastric ulcer?', correct: 'At least into the muscularis mucosae', wrong: ['Only the surface epithelium', 'Through the serosa', 'Only the lamina propria'], why: 'Slide 48: a gastric ulcer extends at least into the muscularis mucosae, often deeper.' },
    ],
  },
  {
    id: 'stomach-7', title: t('Innervation', 'Inervação'),
    cards: [
      {
        id: 'st-p049', ref: '49', title: t('Sympathetic and parasympathetic supply', 'Inervação simpática e parassimpática'),
        focus: ['stomach', 'esophagus'], view: 'ant',
        body: [
          t('The stomach receives both sympathetic and parasympathetic fibres. Sympathetic: splanchnic nerves and branches of the celiac (coeliac) plexus. Parasympathetic: branches of the vagus nerve.',
            'O estômago recebe fibras simpáticas e parassimpáticas. Simpáticas: nervos esplâncnicos e ramos do plexo celíaco. Parassimpáticas: ramos do nervo vago.'),
          t('The left figure follows the vagal fibres onto the stomach: the anterior vagus and posterior vagus descend along the Esophagus and give anterior gastric nerves, the greater anterior and greater posterior gastric nerves along the lesser curvature, hepatic nerves, coeliac nerves, and pyloric nerves and branches to the pylorus.',
            'A figura da esquerda acompanha as fibras vagais até o estômago: o vago anterior e o vago posterior descem ao longo do esôfago e dão os nervos gástricos anteriores, os nervos gástricos maiores anterior e posterior ao longo da curvatura menor, nervos hepáticos, nervos celíacos e nervos e ramos pilóricos para o piloro.'),
          t('The right diagram shows the hierarchy: the central nervous system acts through the autonomic nervous system (parasympathetic and sympathetic) on the enteric nervous system, made of the submucosal and myenteric plexuses. The enteric system, together with the interstitial cells of Cajal, controls the epithelium, vasculature, endocrine cells and muscle. These are the Meissner’s (submucosal) and Auerbach’s (myenteric) plexuses and the Cajal cells you met in the microscopic anatomy.',
            'O diagrama da direita mostra a hierarquia: o sistema nervoso central age através do sistema nervoso autônomo (parassimpático e simpático) sobre o sistema nervoso entérico, formado pelos plexos submucoso e mioentérico. O sistema entérico, junto com as células intersticiais de Cajal, controla o epitélio, a vasculatura, as células endócrinas e a musculatura. Esses são os plexos de Meissner (submucoso) e de Auerbach (mioentérico) e as células de Cajal que você viu na anatomia microscópica.'),
        ],
      },
      {
        id: 'st-p050', ref: '50–51', title: t('Vagal plexuses and sympathetic origin', 'Plexos vagais e origem simpática'),
        focus: ['celiac_trunk', 'stomach'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Page 50 states which vagus forms which plexus: the right vagus nerve forms the anterior gastric plexus and the left vagus nerve forms the posterior gastric plexus. Learn it as written on the slide. The first figure shows the parasympathetic outflow: cranial nerves III, VII, IX and X from the brainstem and the sacral nerves, with their target organs, among them the stomach, liver, gallbladder, pancreas, small and large intestine. A second figure shows the anterior vagal trunk on the esophagus, the celiac ganglia, the greater and lesser splanchnic nerves, the splenic and superior mesenteric plexuses and the superior mesenteric ganglion around the aorta.',
            'A página 50 diz qual vago forma qual plexo: o nervo vago direito forma o plexo gástrico anterior e o nervo vago esquerdo forma o plexo gástrico posterior. Aprenda como está escrito no slide. A primeira figura mostra a saída parassimpática: nervos cranianos III, VII, IX e X a partir do tronco encefálico e os nervos sacrais, com seus órgãos-alvo, entre eles estômago, fígado, vesícula, pâncreas e intestinos delgado e grosso. Uma segunda figura mostra o tronco vagal anterior sobre o esôfago, os gânglios celíacos, os nervos esplâncnicos maior e menor, os plexos esplênico e mesentérico superior e o gânglio mesentérico superior em volta da aorta.'),
          t('Page 51 gives the sympathetic pathway: greater splanchnic nerve + lesser splanchnic nerve + celiac ganglia (on the aorta), from neuromeres T5–T8. The celiac ganglia sit around the origin of the Celiac trunk, so in the 3D model the trunk marks where the sympathetic fibres relay before following the arteries to the stomach. The figure also shows the sympathetic trunk with its cervical, thoracic and lumbar ganglia and the superior and inferior mesenteric ganglia.',
            'A página 51 dá a via simpática: nervo esplâncnico maior + nervo esplâncnico menor + gânglios celíacos (sobre a aorta), a partir dos neurômeros T5–T8. Os gânglios celíacos ficam em volta da origem do tronco celíaco, então no modelo 3D o tronco marca onde as fibras simpáticas fazem sinapse antes de seguir as artérias até o estômago. A figura também mostra o tronco simpático com seus gânglios cervicais, torácicos e lombares e os gânglios mesentéricos superior e inferior.'),
        ],
      },
    ],
    questions: [
      { ref: '49', q: 'Which nerves carry the parasympathetic supply of the stomach?', correct: 'Branches of the vagus nerve', wrong: ['Greater splanchnic nerves', 'Pelvic splanchnic nerves', 'Phrenic nerves'], why: 'Slide 49: parasympathetic — branches of the vagus nerve; sympathetic — splanchnic nerves and coeliac plexus.' },
      { ref: '50', q: 'According to slide 50, which vagus nerve forms the anterior gastric plexus?', correct: 'Right vagus nerve', wrong: ['Left vagus nerve', 'Both equally', 'Neither — it comes from the splanchnic nerves'], why: 'Slide 50: right vagus nerve — anterior gastric plexus; left vagus nerve — posterior gastric plexus.' },
      { ref: '51', q: 'From which neuromeres does the sympathetic supply of the stomach arise?', correct: 'T5–T8', wrong: ['T10–T12', 'L1–L2', 'S2–S4'], why: 'Slide 51: greater and lesser splanchnic nerves + celiac ganglia, neuromeres T5–T8.' },
      { ref: '51', q: 'Where are the celiac ganglia located?', correct: 'On the aorta', wrong: ['In the gastric wall', 'Beside the pylorus', 'In the lesser omentum'], why: 'Slide 51: celiac ganglia (on aorta).' },
    ],
  },
];

// pt-BR for the question rows, keyed by the English question.
const QPT = {
  'Between which two segments does the stomach lie?': { q: 'Entre quais dois segmentos fica o estômago?', correct: 'Esôfago e duodeno', wrong: ['Faringe e esôfago', 'Duodeno e jejuno', 'Esôfago e jejuno'], why: 'Slide 1: o estômago é a parte mais larga do tubo digestivo, entre o esôfago e o duodeno.' },
  'Which stomach function is marked with a question mark on slide 2?': { q: 'Qual função do estômago aparece com ponto de interrogação no slide 2?', correct: 'Absorção', wrong: ['Armazenamento temporário', 'Secreção de fator intrínseco e hormônios', 'Defesa contra micróbios'], why: 'Slide 2 lista armazenamento, quebra mecânica, digestão de proteínas, fator intrínseco e hormônios, defesa microbiana e «Adsorption?» com ponto de interrogação.' },
  'Which vertebral levels does the stomach extend between?': { q: 'Entre quais níveis vertebrais o estômago se estende?', correct: 'T7–L3', wrong: ['T10–L1', 'T5–T12', 'L1–L4'], why: 'Slide 4: localização T7–L3, intraperitoneal, quadrante superior esquerdo.' },
  'What is the mean capacity of the adult stomach on slide 4?': { q: 'Qual é a capacidade média do estômago adulto no slide 4?', correct: '1–4 l', wrong: ['0,5–1 l', '5–6 l', '100–200 ml'], why: 'Slide 4: a capacidade média no adulto é de 1–4 l.' },
  'Which three compartments make up the supramesocolic space?': { q: 'Quais três compartimentos formam o espaço supramesocólico?', correct: 'Hepático, gástrico e esplênico', wrong: ['Renal, gástrico e esplênico', 'Hepático, duodenal e cólico', 'Vesical, prostático e retal'], why: 'Slide 5: compartimentos supramesocólicos são hepático, gástrico e esplênico.' },
  'Which stomach type is linked to a large thorax and a more horizontal position?': { q: 'Qual tipo de estômago está ligado a tórax largo e posição mais horizontal?', correct: 'Hipertônico', wrong: ['Ortotônico', 'Hipotônico', 'Atônico'], why: 'Slide 8: estômago hipertônico — tórax largo, posição mais horizontal.' },
  'At which vertebral level does the slide place the cardia?': { q: 'Em qual nível vertebral o slide coloca a cárdia?', correct: 'T10–T12', wrong: ['L1', 'T7', 'L3'], why: 'Slide 9: cárdia — região junto à abertura do esôfago, T10–T12. O piloro fica em L1.' },
  'Which part of the stomach is dome-shaped, full of air and linked on the slide to Roemheld syndrome?': { q: 'Qual parte do estômago tem forma de cúpula, contém ar e é ligada no slide à síndrome de Roemheld?', correct: 'Fundo', wrong: ['Cárdia', 'Corpo', 'Antro pilórico'], why: 'Slide 9: o fundo projeta-se acima da incisura cárdica rumo à cúpula esquerda do diafragma, com bastante ar (síndrome gastrocardíaca/de Roemheld).' },
  'How long is the pyloric canal?': { q: 'Qual o comprimento do canal pilórico?', correct: '1–2 cm', wrong: ['5–6 cm', '10 cm', '15 cm'], why: 'Slide 9: o canal pilórico tem 1–2 cm e termina no piloro.' },
  'How do the two curvatures compare in length?': { q: 'Como se comparam as duas curvaturas em comprimento?', correct: 'A curvatura maior é 2–3 vezes mais longa (~40 cm vs ~15 cm)', wrong: ['São iguais (~25 cm cada)', 'A curvatura menor é duas vezes mais longa', 'A curvatura maior é 10 vezes mais longa'], why: 'Slide 10: menor ~15 cm, maior ~40 cm, 2–3 vezes mais longa.' },
  'Where are the gastric folds permanent rather than obliterated by distension?': { q: 'Onde as pregas gástricas são permanentes em vez de se apagarem com a distensão?', correct: 'Ao longo da curvatura menor', wrong: ['Ao longo da curvatura maior', 'No fundo', 'No antro pilórico'], why: 'Slide 11: as rugas se apagam na distensão, exceto na curvatura menor, onde pregas permanentes ligam esôfago e piloro (atalho para líquidos).' },
  'What kind of sphincter is the lower esophageal sphincter, according to slide 21?': { q: 'Que tipo de esfíncter é o esfíncter esofágico inferior, segundo o slide 21?', correct: 'Funcional', wrong: ['Um esfíncter anatômico verdadeiro como o piloro', 'Músculo esquelético sob controle voluntário', 'Ausente no adulto'], why: 'Slide 21: esfíncter esofágico inferior (funcional); aberto, os líquidos refluem e causam DRGE. Slide 20: o piloro é um esfíncter anatômico verdadeiro.' },
  'During exhalation, how high does the fundus rise?': { q: 'Na expiração, até onde sobe o fundo?', correct: 'Até a 5ª costela na linha hemiclavicular', wrong: ['Até a 9ª costela na linha axilar média', 'Até o processo xifoide', 'Até o 2º espaço intercostal'], why: 'Slide 13: na expiração o fundo sobe até a altura da 5ª costela na linha hemiclavicular.' },
  'Which structures are related to the cardia?': { q: 'Quais estruturas se relacionam com a cárdia?', correct: 'Pilar esquerdo do diafragma e lobo esquerdo do fígado', wrong: ['Pilar direito e lobo caudado', 'Baço e rim esquerdo', 'Cabeça do pâncreas e duodeno'], why: 'Slide 14: cárdia — pilar esquerdo do diafragma e lobo esquerdo do fígado.' },
  'What is the superior boundary of Traube’s semilunar space?': { q: 'Qual é o limite superior do espaço semilunar de Traube?', correct: '5ª a 6ª costelas', wrong: ['9ª cartilagem costal', 'Linha axilar média', 'Lobo esquerdo do fígado'], why: 'Slide 15: medialmente a margem costal esquerda do xifoide à 9ª costela; superiormente 5ª–6ª costelas; lateralmente a linha axilar média da 5ª à 9ª costela.' },
  'Which structure forms the right side of Labbé’s triangle?': { q: 'Qual estrutura forma o lado direito do triângulo de Labbé?', correct: 'Lobo esquerdo do fígado', wrong: ['Margem costal esquerda', 'Uma linha horizontal abaixo da 9ª cartilagem costal', 'Linha hemiclavicular'], why: 'Slide 16: inferiormente uma linha horizontal abaixo da 9ª cartilagem costal, à esquerda a margem costal, à direita o lobo esquerdo do fígado.' },
  'Which of these is NOT listed on slide 18 among the posterior relations of the stomach?': { q: 'Qual destas NÃO está listada no slide 18 entre as relações posteriores do estômago?', correct: 'Vesícula biliar', wrong: ['Baço', 'Glândula suprarrenal esquerda', 'Mesocolo transverso'], why: 'Slide 18: de cima para baixo — diafragma, baço, suprarrenal esquerda, rim esquerdo, pâncreas, mesocolo transverso.' },
  'What lies directly behind the pylorus?': { q: 'O que fica diretamente atrás do piloro?', correct: 'Cabeça do pâncreas', wrong: ['Lobo caudado do fígado', 'Rim esquerdo', 'Baço'], why: 'Slide 19: piloro em L1, à direita da linha mediana; atrás a cabeça do pâncreas, na frente o lobo caudado.' },
  'Which ligament is formed where the two peritoneal sheets fuse at the hilum of the spleen?': { q: 'Qual ligamento se forma onde os dois folhetos peritoneais se fundem no hilo do baço?', correct: 'Ligamento gastroesplênico', wrong: ['Ligamento gastrofrênico', 'Ligamento gastrocólico', 'Ligamento hepatogástrico'], why: 'Slide 24: ligamento gastroesplênico — dois folhetos se fundem no hilo do baço.' },
  'Which ligament forms the anterior root of the greater omentum?': { q: 'Qual ligamento forma a raiz anterior do omento maior?', correct: 'Ligamento gastrocólico', wrong: ['Ligamento gastroesplênico', 'Ligamento hepatoduodenal', 'Ligamento gastrofrênico'], why: 'Slide 24: ligamento gastrocólico — dois folhetos se fundem para formar a raiz anterior do omento maior.' },
  'Which two ligaments form the small (lesser) omentum?': { q: 'Quais dois ligamentos formam o omento menor?', correct: 'Hepatogástrico e hepatoduodenal', wrong: ['Gastroesplênico e gastrocólico', 'Gastrofrênico e gastroesplênico', 'Falciforme e gastrocólico'], why: 'Slide 24: os ligamentos hepatogástrico e hepatoduodenal ligam-se ao hilo do fígado e formam o omento menor.' },
  'Through which opening does the omental bursa communicate with the peritoneal cavity?': { q: 'Por qual abertura a bolsa omental se comunica com a cavidade peritoneal?', correct: 'Forame epiploico', wrong: ['Hiato esofágico', 'Óstio pilórico', 'Hiato aórtico'], why: 'Slide 25: a bolsa omental (pequena cavidade) comunica-se com a cavidade peritoneal pelo forame epiploico.' },
  'Where does the posterior peritoneal sheet terminate superiorly?': { q: 'Onde termina superiormente o folheto peritoneal posterior?', correct: 'No corpo', wrong: ['No diafragma', 'No piloro', 'No hilo do baço'], why: 'Slide 23: folheto peritoneal posterior — superiormente termina no corpo; continua no duodeno.' },
  'At which vertebral level does the celiac trunk arise?': { q: 'Em qual nível vertebral nasce o tronco celíaco?', correct: 'T12', wrong: ['L1', 'T7', 'L3'], why: 'Slide 27: tronco celíaco em T12, com artérias gástrica esquerda, esplênica e hepática comum.' },
  'From which artery does the right gastric artery arise?': { q: 'De qual artéria nasce a artéria gástrica direita?', correct: 'Artéria hepática própria', wrong: ['Artéria gastroduodenal', 'Artéria esplênica', 'Artéria gástrica esquerda'], why: 'Slide 30: a artéria gástrica direita nasce da hepática própria perto do piloro.' },
  'What are the two terminal branches of the gastroduodenal artery?': { q: 'Quais são os dois ramos terminais da artéria gastroduodenal?', correct: 'Artérias gastromental direita e pancreaticoduodenal superior', wrong: ['Artérias gástricas direita e esquerda', 'Artérias gástricas curtas e gastromental esquerda', 'Artérias hepática própria e cística'], why: 'Slide 31: a gastroduodenal termina dividindo-se em gastromental direita e pancreaticoduodenal superior.' },
  'With which artery does the superior pancreaticoduodenal artery anastomose?': { q: 'Com qual artéria se anastomosa a artéria pancreaticoduodenal superior?', correct: 'Artéria pancreaticoduodenal inferior (da mesentérica superior)', wrong: ['Artéria gástrica direita', 'Artéria gastromental esquerda', 'Artérias gástricas curtas'], why: 'Slide 33: termina em anastomose com a pancreaticoduodenal inferior, ramo da mesentérica superior.' },
  'Which arteries reach the fundus directly from the splenic artery?': { q: 'Quais artérias chegam ao fundo diretamente a partir da artéria esplênica?', correct: 'Artérias gástricas curtas', wrong: ['Artéria gastromental direita', 'Ramos esofágicos', 'Artéria gástrica direita'], why: 'Slide 35: ramos da esplênica — gástricas curtas para o fundo e a gastromental esquerda.' },
  'Where does the venous blood of the stomach drain?': { q: 'Para onde drena o sangue venoso do estômago?', correct: 'Veia porta', wrong: ['Diretamente para a veia cava inferior', 'Veia ázigos', 'Veias renais'], why: 'Slide 37: drenagem venosa — veia porta.' },
  'What type of epithelium lines the stomach?': { q: 'Que tipo de epitélio reveste o estômago?', correct: 'Simples colunar secretor (secretor de muco)', wrong: ['Estratificado pavimentoso não queratinizado', 'Simples cúbico absortivo', 'Pseudoestratificado ciliado'], why: 'Slide 40: epitélio simples colunar secretor de muco cobrindo toda a superfície luminal; o muco protege do suco gástrico de pH 1–2.' },
  'Which cells secrete H+ through H+/K+ ATPase and also produce intrinsic factor?': { q: 'Quais células secretam H+ pela H+/K+ ATPase e também produzem fator intrínseco?', correct: 'Células parietais', wrong: ['Células principais', 'Células mucosas do colo', 'Células G'], why: 'Slide 42: células parietais — microvilosidades ricas em H+/K+ ATPase, muitas mitocôndrias, fator intrínseco.' },
  'What do chief (peptic) cells secrete?': { q: 'O que as células principais (pépticas) secretam?', correct: 'Pepsinogênio e quimosina (renina)', wrong: ['HCl e fator intrínseco', 'Gastrina', 'Só muco'], why: 'Slide 42: células principais secretam pepsinogênio e quimosina e contêm grânulos de zimogênio.' },
  'Which neuroendocrine product makes us hungry by acting on the hypothalamus?': { q: 'Qual produto neuroendócrino nos dá fome agindo no hipotálamo?', correct: 'Grelina', wrong: ['Somatostatina', 'Serotonina', 'Histamina'], why: 'Slide 42: a grelina estimula o hipotálamo e nos dá fome.' },
  'Which glands contain mainly mucous cells and G (gastrin-producing) cells?': { q: 'Quais glândulas contêm principalmente células mucosas e células G (produtoras de gastrina)?', correct: 'Glândulas pilóricas', wrong: ['Glândulas principais', 'Glândulas cárdicas', 'Glândulas submucosas'], why: 'Slide 44: glândulas pilóricas — principalmente células secretoras de muco e células G.' },
  'Where does Auerbach’s plexus lie?': { q: 'Onde fica o plexo de Auerbach?', correct: 'Entre as camadas musculares circular e longitudinal', wrong: ['Na submucosa', 'Na lâmina própria', 'Só sob a serosa'], why: 'Slide 46: fibras autonômicas entre as camadas circular e longitudinal (plexo de Auerbach). O plexo de Meissner fica na submucosa (slide 45).' },
  'What do the interstitial cells of Cajal generate?': { q: 'O que as células intersticiais de Cajal geram?', correct: 'Ondas lentas que marcam o ritmo do músculo liso', wrong: ['Potenciais de ação no nervo vago', 'Ácido gástrico', 'Fator intrínseco'], why: 'Slide 47: as CIC são o marca-passo elétrico; ondas lentas não são potenciais de ação, mas ondulações lentas do potencial de repouso.' },
  'How deep must a tissue defect reach to be called a gastric ulcer?': { q: 'Até que profundidade uma perda de tecido deve chegar para ser chamada de úlcera gástrica?', correct: 'Pelo menos até a muscular da mucosa', wrong: ['Só o epitélio superficial', 'Através da serosa', 'Só a lâmina própria'], why: 'Slide 48: a úlcera gástrica chega pelo menos à muscular da mucosa, muitas vezes mais fundo.' },
  'Which nerves carry the parasympathetic supply of the stomach?': { q: 'Quais nervos levam a inervação parassimpática do estômago?', correct: 'Ramos do nervo vago', wrong: ['Nervos esplâncnicos maiores', 'Nervos esplâncnicos pélvicos', 'Nervos frênicos'], why: 'Slide 49: parassimpática — ramos do vago; simpática — nervos esplâncnicos e plexo celíaco.' },
  'According to slide 50, which vagus nerve forms the anterior gastric plexus?': { q: 'Segundo o slide 50, qual nervo vago forma o plexo gástrico anterior?', correct: 'Nervo vago direito', wrong: ['Nervo vago esquerdo', 'Os dois igualmente', 'Nenhum — vem dos nervos esplâncnicos'], why: 'Slide 50: vago direito — plexo gástrico anterior; vago esquerdo — plexo gástrico posterior.' },
  'From which neuromeres does the sympathetic supply of the stomach arise?': { q: 'De quais neurômeros vem a inervação simpática do estômago?', correct: 'T5–T8', wrong: ['T10–T12', 'L1–L2', 'S2–S4'], why: 'Slide 51: nervos esplâncnicos maior e menor + gânglios celíacos, neurômeros T5–T8.' },
  'Where are the celiac ganglia located?': { q: 'Onde ficam os gânglios celíacos?', correct: 'Sobre a aorta', wrong: ['Na parede gástrica', 'Ao lado do piloro', 'No omento menor'], why: 'Slide 51: gânglios celíacos (sobre a aorta).' },
};
for (const block of blocks) for (const row of block.questions) if (QPT[row.q]) row.pt = QPT[row.q];

export const pt = Object.fromEntries(Object.entries(PT).filter(([, value]) => value));
