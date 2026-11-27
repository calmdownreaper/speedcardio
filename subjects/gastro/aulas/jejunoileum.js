// SpeedGastro · Aula 09 — Jejunum and ileum (Prof. Fiume deck 09_jejunum_and_ileum, p001–p061; p062 blank).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/jejunoileum.js?v=157';

export const unit = {
  id: 'jejunoileum',
  label: t('09 · Jejunum and ileum', '09 · Jejuno e íleo'),
  visible: ['jejunum', 'ileum', 'duodenum', 'stomach', 'pancreas', 'spleen', 'transverse_colon',
    'ascending_colon', 'descending_colon', 'appendix', 'rectum', 'taeniae_coli', 'diaphragm_g', 'sma', 'ima',
    'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'appendicular_a', 'sigmoid_a', 'superior_rectal_a',
    'celiac_trunk', 'common_hepatic_a', 'proper_hepatic_a', 'gastroduodenal_a', 'pancreaticoduodenal_a', 'splenic_a',
    'gastroepiploic_a', 'left_gastric_a', 'abdominal_aorta_g', 'ivc_g', 'smv', 'imv', 'splenic_v', 'gastric_v',
    'hepatic_portal_v'],
  ghost: ['duodenum', 'stomach', 'pancreas', 'transverse_colon', 'ascending_colon', 'descending_colon', 'spleen', 'abdominal_aorta_g', 'gallbladder'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'jejunoileum-1', title: t('General features, location and the constrictions', 'Aspectos gerais, localização e as constrições'),
    cards: [
      {
        id: 'jei-p01', ref: '1–2', title: t('The small intestine and the mesenteric part: jejunum and ileum', 'O intestino delgado e a parte mesentérica: jejuno e íleo'),
        focus: ['jejunum', 'ileum', 'duodenum'], ghost: ['transverse_colon', 'stomach'], view: 'ant',
        body: [
          t('The basic numbers of the small intestine are repeated: the primary role in digestion and absorption of nutrients (90% of nutrients), an average length of 6 m (range 5–8 m), a diameter from 4 cm at the stomach to about 2.5 cm at the junction with the large intestine, and three parts: the duodenum (about 25 cm), the jejunum (about 2.5 m) and the ileum (about 3.5 m). The mesenteric intestine, which is the jejunum and the ileum, comes next. It is the movable portion of the small intestine, because it lies within the free lower border of the mesentery. It measures 6–7 m, arranged in numerous convoluted loops that run transversally, vertically and obliquely. It is one continuous tube, divided into two: the jejunum, the proximal 2/5 of the length, whose name comes from the Latin «ieiunus» (empty), and which starts at the duodenojejunal flexure; and the ileum, the distal 3/5, which ends at the ileocecal valve.',
            'Os números básicos do intestino delgado são repetidos: papel principal na digestão e absorção dos nutrientes (90% deles), comprimento médio de 6 m (variação de 5 a 8 m), diâmetro de 4 cm no estômago a cerca de 2,5 cm na junção com o intestino grosso, e três partes: o duodeno (cerca de 25 cm), o jejuno (cerca de 2,5 m) e o íleo (cerca de 3,5 m). Em seguida vem o intestino mesentérico, que é o jejuno e o íleo. É a parte móvel do intestino delgado, porque fica dentro da borda inferior livre do mesentério. Mede 6–7 m, disposto em muitas alças sinuosas que correm transversal, vertical e obliquamente. É um tubo contínuo, dividido em dois: o jejuno, os 2/5 proximais do comprimento, cujo nome vem do latim «ieiunus» (vazio), que começa na flexura duodenojejunal; e o íleo, os 3/5 distais, que termina na válvula ileocecal.'),
          t('In the 3D model, the Jejunum and the Ileum are the two long segments that follow the Duodenum. The Duodenum is the short start and is not part of the mesenteric intestine.',
            'No modelo 3D, o Jejuno e o Íleo são os dois segmentos longos que seguem o Duodeno. O Duodeno é o início curto e não faz parte do intestino mesentérico.'),
        ],
      },
      {
        id: 'jei-p03', ref: '3', title: t('Location: the submesocolic space and the right iliac fossa', 'Localização: o espaço inframesocólico e a fossa ilíaca direita'),
        focus: ['jejunum', 'ileum'], ghost: ['transverse_colon', 'ascending_colon', 'descending_colon'], view: 'ant',
        body: [
          t('The mesenteric intestine starts left of the midline in the umbilical region, runs downward and to the right, and ends at the ileocecal valve in the right iliac fossa. It sits in the submesocolic space, framed by the transverse colon above, the ascending colon on the right, and the descending colon on the left. Within this space, the jejunum occupies the superior submesocolic compartment down to the umbilical region, while the ileum occupies the hypogastric and right iliac regions. Above the root of the transverse mesocolon lie the supramesocolic compartments, and below the submesocolic space lies the root of the sigmoid mesocolon.',
            'O intestino mesentérico começa à esquerda da linha mediana, na região umbilical, desce em direção à direita e termina na válvula ileocecal, na fossa ilíaca direita. Fica no espaço inframesocólico, emoldurado pelo colo transverso acima, pelo colo ascendente à direita e pelo colo descendente à esquerda. Nesse espaço, o jejuno ocupa o compartimento inframesocólico superior até a região umbilical, enquanto o íleo ocupa as regiões hipogástrica e ilíaca direita. Acima da raiz do mesocolo transverso situam-se os compartimentos supramesocólicos, e abaixo do espaço inframesocólico fica a raiz do mesocolo sigmoide.'),
          t('In the 3D model, use the Transverse colon above and the Ascending and Descending colon at the sides to frame the loops of the Jejunum and the Ileum. The Ileum ends on the right near the Ascending colon.',
            'No modelo 3D, use o Colo transverso acima e os colos ascendente e descendente nas laterais para enquadrar as alças do Jejuno e do Íleo. O Íleo termina à direita, perto do Colo ascendente.'),
        ],
      },
      {
        id: 'jei-p04', ref: '4', title: t('The submesocolic space and the supramesocolic map', 'O espaço inframesocólico e o mapa supramesocólico'),
        focus: ['jejunum', 'ileum', 'transverse_colon'], ghost: ['stomach', 'spleen', 'pancreas'], view: 'ant',
        body: [
          t('The abdominopelvic spaces divide into the peritoneal cavity and the extraperitoneal spaces (the extraperitoneal pelvic space and the retroperitoneal space). Inside the peritoneal cavity, the supramesocolic space contains three compartments (hepatic, gastric and splenic), two omenta (lesser and greater), and the subphrenic, subhepatic, hepatorenal, gastrosplenic and phrenicosplenic recesses together with the omental bursa. Below it, the submesocolic space—where the small intestine lies—contains the superior and inferior duodenal, paraduodenal, duodenojejunal and retroduodenal recesses, the intersigmoid recess, the superior and inferior ileocecal recesses, the retrocecal recess, the right and left mesenteric-colic recesses, and the right and left paracolic recesses.',
            'Os espaços abdominopélvicos dividem-se em cavidade peritoneal e espaços extraperitoneais (o espaço pélvico extraperitoneal e o espaço retroperitoneal). Na cavidade peritoneal, o espaço supramesocólico contém três compartimentos (hepático, gástrico e esplênico), dois omentos (menor e maior) e os recessos subfrênico, sub-hepático, hepatorrenal, gastroesplênico e frenicoesplênico, além da bolsa omental. Abaixo dele, o espaço inframesocólico — onde se situa o intestino delgado — contém os recessos duodenais superior e inferior, paraduodenal, duodenojejunal e retroduodenal, o recesso intersigmoide, os recessos ileocecais superior e inferior, o recesso retrocecal, os recessos mesentérico-cólicos direito e esquerdo e os recessos paracólicos direito e esquerdo.'),
        ],
      },
      {
        id: 'jei-p05', ref: '5', title: t('Mobility and the three normal constrictions', 'Mobilidade e as três constrições normais'),
        focus: ['duodenum', 'jejunum', 'ileum'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The small intestine cannot be located by bony landmarks, because its loops are intraperitoneal and therefore very mobile. Three normal anatomical constrictions are named: the junction of the pylorus and the duodenum, where the pyloric orifice has a luminal diameter of only 2–3 mm; the duodenojejunal flexure; and the ileocecal orifice. Swallowed foreign bodies may lodge at these sites, obstructing transit and causing mechanical intestinal paralysis, that is mechanical ileus. It is a life-threatening condition and an absolute indication for surgery.',
            'O intestino delgado não pode ser localizado por marcos ósseos, porque suas alças são intraperitoneais e, portanto, muito móveis. Três constrições anatômicas normais são nomeadas: a junção do piloro com o duodeno, onde o orifício pilórico tem diâmetro luminal de apenas 2–3 mm; a flexura duodenojejunal; e o orifício ileocecal. Corpos estranhos engolidos podem se alojar nesses pontos, obstruindo o trânsito e causando paralisia intestinal mecânica, ou seja, íleo mecânico. É uma condição que ameaça a vida e uma indicação absoluta de cirurgia.'),
          t('Along the tract, the first constriction sits at the pyloric orifice, the second at the duodenojejunal flexure (between the duodenum and the jejunum), and the third inferiorly at the ileocecal orifice where the ileum meets the ascending colon. In the 3D model, the Pylorus and the Duodenum form the first constriction, and the ileocecal end lies on the right side.',
            'Ao longo do trato, a primeira constrição fica no orifício pilórico, a segunda na flexura duodenojejunal (entre o duodeno e o jejuno) e a terceira, mais abaixo, no orifício ileocecal, onde o íleo encontra o colo ascendente. No modelo 3D, o Piloro e o Duodeno formam a primeira constrição, e a extremidade ileocecal fica do lado direito.'),
        ],
      },
      {
        id: 'jei-p06', ref: '6', title: t('Jejunum versus ileum: the gradual change', 'Jejuno versus íleo: a mudança gradual'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant',
        body: [
          t('There is no sharp boundary between the jejunum and the ileum; the transition is gradual. Moving distally, the bowel becomes narrower (the jejunum measures 4 cm externally and 3 cm internally, whereas the ileum measures 3 cm externally and 2.5 cm internally), thinner-walled (the plicae circulares grow progressively shorter), and less vascularised (the jejunal arteries are slightly larger than the ileal arteries). Across both segments, the mesentery carries the vasa recta to the intestinal wall, whose layers—serosa, longitudinal muscle, circular muscle, submucosa (with the submucosal arterial plexus) and mucosa—shift from tall plicae circulares in the jejunum to prominent lymphatic follicles and Peyer’s patches in the ileum.',
            'Não há separação nítida entre o jejuno e o íleo; a transição é gradual. Seguindo distalmente, o intestino fica mais estreito (o jejuno mede 4 cm por fora e 3 cm por dentro, enquanto o íleo mede 3 cm por fora e 2,5 cm por dentro), com parede mais fina (as pregas circulares ficam progressivamente mais baixas) e menos vascularizado (as artérias jejunais são um pouco maiores que as ileais). Nos dois segmentos, o mesentério leva os vasa recta até a parede intestinal, cujas camadas — serosa, músculo longitudinal, músculo circular, submucosa (com o plexo arterial submucoso) e mucosa — passam de pregas circulares altas no jejuno a folículos linfáticos proeminentes e placas de Peyer no íleo.'),
          t('In the 3D model, the Jejunum sits higher and the Ileum lower and further to the right. Use the change in calibre along the loops to place the boundary, which is not sharp.',
            'No modelo 3D, o Jejuno fica mais alto e o Íleo mais baixo e mais à direita. Use a mudança de calibre ao longo das alças para situar a fronteira, que não é nítida.'),
        ],
      },
    ],
    questions: [
      { ref: '2', q: 'What is the proximal part of the mesenteric intestine called, and what fraction of its length does it make up?', correct: 'Jejunum, the proximal 2/5', wrong: ['Ileum, the proximal 3/5', 'Duodenum, the proximal 1/5', 'Cecum, the proximal 1/2'], why: 'The jejunum is the proximal 2/5 of the mesenteric intestine, from Latin ieiunus (empty), starting at the duodenojejunal flexure.',
        pt: { q: 'Como se chama a parte proximal do intestino mesentérico, e que fração do comprimento ela representa?', correct: 'Jejuno, os 2/5 proximais', wrong: ['Íleo, os 3/5 proximais', 'Duodeno, o 1/5 proximal', 'Ceco, a metade proximal'], why: 'O jejuno são os 2/5 proximais do intestino mesentérico, do latim ieiunus (vazio), começando na flexura duodenojejunal.' } },
      { ref: '3', q: 'In which iliac fossa does the mesenteric intestine end?', correct: 'The right iliac fossa', wrong: ['The left iliac fossa', 'The umbilical region', 'The hypogastric region only'], why: 'The small intestine starts left of the midline in the umbilical region and ends at the ileocecal valve in the right iliac fossa.',
        pt: { q: 'Em qual fossa ilíaca termina o intestino mesentérico?', correct: 'Na fossa ilíaca direita', wrong: ['Na fossa ilíaca esquerda', 'Na região umbilical', 'Apenas na região hipogástrica'], why: 'O intestino delgado começa à esquerda da linha mediana, na região umbilical, e termina na válvula ileocecal, na fossa ilíaca direita.' } },
      { ref: '5', q: 'Which of these is NOT one of the three normal anatomical constrictions?', correct: 'The ileal end of the mesentery', wrong: ['The pyloroduodenal junction', 'The duodenojejunal flexure', 'The ileocecal orifice'], why: 'The three constrictions are the pyloroduodenal junction, the duodenojejunal flexure and the ileocecal orifice.',
        pt: { q: 'Qual destes NÃO é uma das três constrições anatômicas normais?', correct: 'A extremidade ileal do mesentério', wrong: ['A junção piloroduodenal', 'A flexura duodenojejunal', 'O orifício ileocecal'], why: 'As três constrições são a junção piloroduodenal, a flexura duodenojejunal e o orifício ileocecal.' } },
      { ref: '6', q: 'What is the external diameter of the jejunum?', correct: '4 cm', wrong: ['3 cm', '2.5 cm', '6 cm'], why: 'Jejunum external diameter 4 cm, internal 3 cm; ileum external 3 cm, internal 2.5 cm.',
        pt: { q: 'Qual é o diâmetro externo do jejuno?', correct: '4 cm', wrong: ['3 cm', '2,5 cm', '6 cm'], why: 'Diâmetro externo do jejuno 4 cm, interno 3 cm; do íleo, externo 3 cm, interno 2,5 cm.' } },
    ],
  },
  {
    id: 'jejunoileum-2', title: t('The mesentery and the relations of the jejunum and ileum', 'O mesentério e as relações do jejuno e do íleo'),
    cards: [
      {
        id: 'jei-p08', ref: '8', title: t('The mesentery: the fold that holds the small intestine', 'O mesentério: a prega que sustenta o intestino delgado'),
        focus: ['jejunum', 'ileum', 'transverse_colon', 'descending_colon', 'appendix', 'rectum'], ghost: ['ascending_colon', 'stomach'], view: 'ant',
        body: [
          t('The mesentery is a peritoneal fold that attaches the small intestine to the posterior abdominal wall. Its anterior free border holds the jejunum and the ileum and is 6 m long; its attached posterior border, the root of the mesentery, is 15 cm long. Deep to the greater omentum and the transverse colon (which bears the free tenia and omental appendices) and inferior to the transverse mesocolon over the pancreas, the mesentery fans out between the duodenojejunal flexure (near the superior and inferior duodenal recesses) and the terminal ileum at the cecum (near the inferior ileocecal recess, vermiform appendix and retrocecal recess). Along its margins, the abdominal frame consists of the ascending colon and right colic flexure with the right paracolic gutter on the right, the descending colon and left colic flexure with the left paracolic gutter on the left, and the sigmoid colon, sigmoid mesocolon (with the intersigmoidal recess) and rectum below.',
            'O mesentério é uma prega peritoneal que prende o intestino delgado à parede abdominal posterior. Sua borda anterior livre contém o jejuno e o íleo e tem 6 m de comprimento; sua borda posterior fixa, a raiz do mesentério, tem 15 cm. Profundamente ao omento maior e ao colo transverso (que apresenta a tênia livre e os apêndices omentais) e abaixo do mesocolo transverso sobre o pâncreas, o mesentério abre-se em leque da flexura duodenojejunal (junto aos recessos duodenais superior e inferior) até o íleo terminal no ceco (junto ao recesso ileocecal inferior, ao apêndice vermiforme e ao recesso retrocecal). Ao redor, a moldura cólica é formada pelo colo ascendente e flexura cólica direita com a goteira paracólica direita à direita, pelo colo descendente e flexura cólica esquerda com a goteira paracólica esquerda à esquerda, e pelo colo sigmoide, mesocolo sigmoide (com o recesso intersigmoide) e reto abaixo.'),
          t('In the 3D model, follow the root of the mesentery from the Duodenum toward the Ileum; the Transverse colon and the Descending colon are the edges of the field, and the Appendix is near the cecal end.',
            'No modelo 3D, siga a raiz do mesentério do Duodeno em direção ao Íleo; o Colo transverso e o Colo descendente são as bordas do campo, e o Apêndice fica perto da extremidade cecal.'),
        ],
      },
      {
        id: 'jei-p09', ref: '9', title: t('The root of the mesentery from the duodenojejunal flexure to the ileocecal junction', 'A raiz do mesentério da flexura duodenojejunal à junção ileocecal'),
        focus: ['jejunum', 'ileum', 'duodenum', 'transverse_colon', 'abdominal_aorta_g', 'ivc_g', 'ima', 'rectum'], ghost: ['pancreas', 'stomach'], view: 'post',
        body: [
          t('The root of the mesentery is 15–20 cm long and runs obliquely from the duodenojejunal flexure to the ileocecal junction. Along the posterior abdominal wall (retroperitoneum), it crosses over the duodenum, abdominal aorta, inferior vena cava, right ureter and right common iliac artery toward the ileocecal junction. This oblique root lies within the submesocolic space between the retroperitoneal attachment areas of the ascending and descending colon, inferior to the root of the transverse mesocolon (which sits below the pancreas and the splenic and common hepatic arteries) and superior to the root of the sigmoid mesocolon (which sits above the rectum and urinary bladder, with the inferior mesenteric artery descending between the mesentery and sigmoid roots).',
            'A raiz do mesentério tem 15–20 cm de comprimento e corre obliquamente da flexura duodenojejunal até a junção ileocecal. Na parede abdominal posterior (retroperitônio), ela cruza sobre o duodeno, a aorta abdominal, a veia cava inferior, o ureter direito e a artéria ilíaca comum direita em direção à junção ileocecal. Essa raiz oblíqua situa-se no espaço inframesocólico, entre as áreas retroperitoneais de fixação dos colos ascendente e descendente, abaixo da raiz do mesocolo transverso (abaixo do pâncreas e das artérias esplênica e hepática comum) e acima da raiz do mesocolo sigmoide (acima do reto e da bexiga urinária, com a artéria mesentérica inferior descendo entre a raiz do mesentério e a do sigmoide).'),
          t('⚠ Page 9 gives the root as 15–20 cm, while page 10 gives 14–17 cm; page 8 gives 15 cm. The class material disagrees on this measure.',
            '⚠ A página 9 dá a raiz como 15–20 cm, enquanto a página 10 dá 14–17 cm; a página 8 dá 15 cm. O material da aula diverge sobre essa medida.'),
        ],
      },
      {
        id: 'jei-p10', ref: '10', title: t('The length of the mesentery: an inconsistency in the class material', 'O comprimento do mesentério: uma inconsistência do material da aula'),
        focus: ['duodenum', 'jejunum', 'ileum', 'transverse_colon', 'descending_colon'], ghost: ['ascending_colon'], view: 'ant',
        body: [
          t('The mesentery is shaped like a pleated fan: a short posterior root of 14–17 cm spans between the duodenojejunal flexure and the ileocecal valve, with a radial depth of 12 cm out to a 6–7 m outer intestinal border. On the posterior abdominal wall, the root runs obliquely across the inferior part of the duodenum (near the descending and ascending parts and the duodenojejunal flexure) toward the cecum, framed by the transverse mesocolon and transverse colon above, the ascending colon on the right, the descending colon on the left, and the sigmoid colon and rectum below.',
            'O mesentério tem a forma de um leque pregueado: uma raiz posterior curta de 14–17 cm estende-se entre a flexura duodenojejunal e a válvula ileocecal, com profundidade radial de 12 cm até uma borda intestinal externa de 6–7 m. Na parede abdominal posterior, a raiz corre obliquamente sobre a parte inferior do duodeno (perto das partes descendente e ascendente e da flexura duodenojejunal) em direção ao ceco, emoldurada pelo mesocolo transverso e colo transverso acima, pelo colo ascendente à direita, pelo colo descendente à esquerda e pelo colo sigmoide e reto abaixo.'),
          t('⚠ Three root lengths appear across the deck: 15 cm on page 8, 15–20 cm on page 9, and 14–17 cm on page 10. All three values are kept so each answer matches the cited source.',
            '⚠ Aparecem três comprimentos para a raiz no material: 15 cm na página 8, 15–20 cm na página 9 e 14–17 cm na página 10. Os três valores são mantidos para que cada resposta siga a fonte citada.'),
          t('In the 3D model, the Duodenum and the Ascending and Descending colon are the fixed points of the root, and the Transverse colon lies above it.',
            'No modelo 3D, o Duodeno e os colos ascendente e descendente são os pontos fixos da raiz, e o Colo transverso fica acima dela.'),
        ],
      },
      {
        id: 'jei-p11', ref: '11', title: t('Embryology: the midgut and the dorsal mesentery', 'Embriologia: o intestino médio e o mesentério dorsal'),
        focus: ['stomach', 'pancreas', 'duodenum', 'jejunum', 'ileum', 'transverse_colon'], ghost: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('In the embryo, ventral to the neural tube and enclosed by the body folds and amnion, the midgut hangs within the abdominal cavity from the dorsal mesentery, while only persisting edges of the ventral mesentery remain anteriorly. Visceral peritoneum lines the gut and mesentery, and parietal peritoneum lines the cavity wall. In the adult arrangement, the pancreas and duodenum sit posteriorly in the retroperitoneal space, whereas the greater omentum descends from the stomach behind the omental bursa and fuses with the transverse colon and transverse mesocolon to form the gastrocolic ligament; below it, the jejunum and ileum remain freely suspended by the mesentery.',
            'No embrião, ventralmente ao tubo neural e dentro das pregas corporais e do âmnio, o intestino médio fica suspenso na cavidade abdominal pelo mesentério dorsal, enquanto apenas bordas persistentes do mesentério ventral permanecem anteriormente. O peritônio visceral reveste o intestino e o mesentério, e o peritônio parietal reveste a parede da cavidade. No arranjo adulto, o pâncreas e o duodeno ficam posteriormente no espaço retroperitoneal, enquanto o omento maior desce do estômago atrás da bolsa omental e se funde ao colo transverso e ao mesocolo transverso para formar o ligamento gastrocólico; abaixo dele, o jejuno e o íleo permanecem livremente suspensos pelo mesentério.'),
        ],
      },
      {
        id: 'jei-p12', ref: '12', title: t('The functions of the mesentery and the two kinds of motility', 'As funções do mesentério e os dois tipos de motilidade'),
        focus: ['jejunum', 'ileum', 'duodenum'], ghost: ['transverse_colon'], view: 'ant',
        body: [
          t('The mesentery has three functions: it carries blood vessels, lymphatics and nerves; it permits intestinal motility (peristalsis); and it is anti-inflammatory. Intestinal motility takes two forms. Peristalsis propels contents along the tract through coordinated contraction of the circular and longitudinal layers: circular muscle contracts behind the bolus while longitudinal muscle contracts ahead of it, driving a wave forward. Segmentation mainly involves the circular muscle layers, which churn and mix the contents without producing net movement in a single direction.',
            'O mesentério tem três funções: contém vasos sanguíneos, linfáticos e nervos; permite a motilidade intestinal (peristaltismo); e tem ação anti-inflamatória. A motilidade assume dois tipos. O peristaltismo impulsiona o conteúdo ao longo do trato por contrações coordenadas das camadas circular e longitudinal: o músculo circular contrai-se atrás do bolo enquanto o longitudinal contrai-se à frente dele, empurrando uma onda para a frente. A segmentação envolve principalmente as camadas musculares circulares, que misturam o conteúdo sem produzir movimento líquido em uma única direção.'),
          t('In the 3D model, the Jejunum and the Ileum are the loops where you can see both kinds of movement: the peristaltic wave moves contents along the loop, while segmentation churns it in place.',
            'No modelo 3D, o Jejuno e o Íleo são as alças em que você pode ver os dois tipos de movimento: a onda peristáltica move o conteúdo ao longo da alça, enquanto a segmentação o mistura no lugar.'),
        ],
      },
    ],
    questions: [
      { ref: '8', q: 'How long is the anterior border of the mesentery, which contains the jejunum and ileum?', correct: '6 m', wrong: ['15 cm', '2.5 m', '20 cm'], why: 'The anterior border contains the jejunum and ileum and is 6 m long; the root is 15 cm long.',
        pt: { q: 'Qual o comprimento da borda anterior do mesentério, que contém o jejuno e o íleo?', correct: '6 m', wrong: ['15 cm', '2,5 m', '20 cm'], why: 'A borda anterior contém o jejuno e o íleo e tem 6 m; a raiz tem 15 cm.' } },
      { ref: '9', q: 'Between which two points does the root of the mesentery run?', correct: 'From the duodenojejunal flexure to the ileocecal junction', wrong: ['From the pylorus to the rectum', 'From the ileocecal valve to the anus', 'From the duodenal bulb to the transverse colon'], why: 'The root runs from the duodenojejunal flexure to the ileocecal junction.',
        pt: { q: 'Entre quais pontos vai a raiz do mesentério?', correct: 'Da flexura duodenojejunal à junção ileocecal', wrong: ['Do piloro ao reto', 'Da válvula ileocecal ao ânus', 'Do bulbo duodenal ao colo transverso'], why: 'A raiz vai da flexura duodenojejunal até a junção ileocecal.' } },
      { ref: '10', q: 'What length is given for the root between the duodenojejunal flexure and the ileocecal valve?', correct: '14–17 cm', wrong: ['6–7 cm', '6–7 m', '1–2 m'], why: 'The mesentery is 6–7 m along the outer border, and the root between the duodenojejunal flexure and the ileocecal valve is 14–17 cm.',
        pt: { q: 'Qual comprimento é dado para a raiz entre a flexura duodenojejunal e a válvula ileocecal?', correct: '14–17 cm', wrong: ['6–7 cm', '6–7 m', '1–2 m'], why: 'O mesentério tem 6–7 m na borda externa, e a raiz entre a flexura duodenojejunal e a válvula ileocecal tem 14–17 cm.' } },
      { ref: '12', q: 'Which movement propels the contents along the tract by coordinated contraction of the circular and longitudinal layers?', correct: 'Peristalsis', wrong: ['Segmentation', 'Peyer’s patch activity', 'Mucin secretion'], why: 'Peristalsis propels materials by coordinated circular and longitudinal contractions; segmentation churns without net movement.',
        pt: { q: 'Qual movimento impulsiona o conteúdo ao longo do trato por contrações coordenadas das camadas circular e longitudinal?', correct: 'Peristaltismo', wrong: ['Segmentação', 'Atividade das placas de Peyer', 'Secreção de muco'], why: 'O peristaltismo impulsiona o conteúdo por contrações circulares e longitudinais coordenadas; a segmentação mistura sem movimento líquido.' } },
    ],
  },
  {
    id: 'jejunoileum-3', title: t('The superior mesenteric artery and its branches', 'A artéria mesentérica superior e seus ramos'),
    cards: [
      {
        id: 'jei-p17', ref: '17–18', title: t('The three gut territories and the supply of the SMA', 'Os três territórios intestinais e o suprimento da mesentérica superior'),
        focus: ['celiac_trunk', 'sma', 'ima', 'duodenum', 'jejunum', 'ileum', 'appendix', 'ascending_colon', 'transverse_colon'], ghost: ['stomach', 'descending_colon'], view: 'ant',
        body: [
          t('The vascularisation of the gut as a whole: the early tube is supplied by the Celiac trunk (foregut), the Superior mesenteric artery (midgut) and the Inferior mesenteric artery (hindgut). The Superior mesenteric artery supplies the structures of the midgut: the distal half of the duodenum, the jejunum and the ileum, the cecum and the appendix, the ascending colon, the right colic flexure and the proximal one half of the transverse colon. It arises from the aorta 1 cm below the celiac trunk, at L1.',
            'A vascularização do intestino como um todo: o tubo inicial é suprido pelo Tronco celíaco (intestino anterior), pela Artéria mesentérica superior (intestino médio) e pela Artéria mesentérica inferior (intestino posterior). A Artéria mesentérica superior supre as estruturas do intestino médio: a metade distal do duodeno, o jejuno e o íleo, o ceco e o apêndice, o colo ascendente, a flexura cólica direita e a metade proximal do colo transverso. Ela nasce da aorta 1 cm abaixo do tronco celíaco, em L1.'),
          t('⚠ Page 18 gives the midgut share of the transverse colon as the proximal one half. Deck 08 (page 24) gives two-thirds, and deck 10 (page 40) also says proximal two-thirds. The decks disagree; both versions are kept, and the value given in this card is one half.',
            '⚠ A página 18 dá a parte do intestino médio no colo transverso como a metade proximal. O deck 08 (página 24) dá dois terços, e o deck 10 (página 40) também diz dois terços proximais. Os decks divergem; as duas versões são mantidas, e o valor deste cartão é a metade.'),
        ],
      },
      {
        id: 'jei-p19', ref: '19', title: t('The levels of the great arteries of the abdomen', 'Os níveis das grandes artérias do abdome'),
        focus: ['celiac_trunk', 'sma', 'ima', 'abdominal_aorta_g', 'common_hepatic_a', 'splenic_a', 'left_gastric_a', 'gastroduodenal_a', 'proper_hepatic_a'], ghost: ['stomach', 'spleen'], view: 'ant',
        body: [
          t('Along the vertebral column, the abdominal aorta gives off its major branches at fixed levels: the celiac trunk at T12, the superior mesenteric artery at L1, the renal arteries at L1/L2, the inferior mesenteric artery at L3, and the aortic bifurcation into the right and left common iliac arteries at L4. From superior to inferior, the full branching sequence comprises the right and left inferior phrenic and superior suprarenal arteries; the celiac trunk (dividing into the common hepatic—with the right gastric, proper hepatic and gastroduodenal arteries—left gastric and splenic arteries); the superior mesenteric artery flanked by the middle and inferior suprarenal and renal arteries; the lumbar and left testicular/ovarian arteries; the inferior mesenteric artery; and the terminal bifurcation into the right and left common iliac arteries with the median sacral artery between them.',
            'Ao longo da coluna vertebral, a aorta abdominal emite seus principais ramos em níveis definidos: o tronco celíaco em T12, a artéria mesentérica superior em L1, as artérias renais em L1/L2, a artéria mesentérica inferior em L3 e a bifurcação aórtica nas artérias ilíacas comuns direita e esquerda em L4. De cima para baixo, a sequência completa de ramos compreende as artérias frênicas inferiores e suprarrenais superiores direita e esquerda; o tronco celíaco (dividindo-se nas artérias hepática comum — com as artérias gástrica direita, hepática própria e gastroduodenal —, gástrica esquerda e esplênica); a artéria mesentérica superior ladeada pelas artérias suprarrenais médias e inferiores e renais; as artérias lombares e a artéria testicular/ovariana esquerda; a artéria mesentérica inferior; e a bifurcação terminal nas artérias ilíacas comuns direita e esquerda com a artéria sacral mediana entre elas.'),
          t('In the 3D model, the Superior mesenteric artery sits at L1, one centimetre below the Celiac trunk, and the Inferior mesenteric artery lies lower at L3.',
            'No modelo 3D, a Artéria mesentérica superior fica em L1, um centímetro abaixo do Tronco celíaco, e a Artéria mesentérica inferior fica mais abaixo, em L3.'),
        ],
      },
      {
        id: 'jei-p20', ref: '20', title: t('Origin and course of the SMA', 'Origem e trajeto da mesentérica superior'),
        focus: ['sma', 'smv', 'pancreas', 'duodenum', 'jejunum', 'transverse_colon'], ghost: ['ascending_colon', 'spleen'], view: 'ant',
        body: [
          t('The superior mesenteric artery (SMA) arises from the abdominal aorta below the celiac trunk and beneath the head of the pancreas, with the superior mesenteric vein beside it. Descending anterior to the left renal vein (beside the left renal artery), the uncinate process of the pancreas, and the third (horizontal) part of the duodenum toward the small intestine, it gives numerous branches to the small intestine on its left side and to the colon on its right side.',
            'A artéria mesentérica superior (AMS) origina-se da aorta abdominal abaixo do tronco celíaco e sob a cabeça do pâncreas, com a veia mesentérica superior ao seu lado. Descendo anteriormente à veia renal esquerda (ao lado da artéria renal esquerda), ao processo uncinado do pâncreas e à terceira parte (horizontal) do duodeno em direção ao intestino delgado, ela emite numerosos ramos para o intestino delgado à esquerda e para o colo à direita.'),
          t('The SMA descends in a curve, convex to the left, until it reaches the right iliac fossa, where it ends by anastomosing with the ileocolic artery, one of its own branches. In the 3D model, follow the SMA down from under the Pancreas, past the Third part of the Duodenum, and along the curve toward the right iliac fossa.',
            'A mesentérica superior desce em uma curva convexa para a esquerda até a fossa ilíaca direita, onde termina anastomosando-se com a artéria ileocólica, um de seus próprios ramos. No modelo 3D, siga a mesentérica superior descendo de sob o Pâncreas, passando pela terceira parte do Duodeno e seguindo a curva até a fossa ilíaca direita.'),
        ],
      },
      {
        id: 'jei-p21', ref: '21', title: t('The jejunal and ileal arteries and their arcades', 'As artérias jejunais e ileais e suas arcadas'),
        focus: ['sma', 'jejunum', 'ileum', 'middle_colic_a', 'left_colic_a', 'appendicular_a'], ghost: ['transverse_colon'], view: 'ant',
        body: [
          t('The first branches of the SMA are the jejunal and ileal arteries, which arise from its left side to supply the jejunum and ileum (except the distal end). They enter the mesentery parallel to one another, and each vessel divides into two branches that unite with adjacent branches to form tiers of arcades giving off straight arteries. Meanwhile, from the right side of the SMA—which descends in a curve convex to the left—arise the middle colic, right colic and ileocolic arteries (with the appendicular artery), anastomosing along the colon up to the left colic artery.',
            'Os primeiros ramos da AMS são as artérias jejunais e ileais, que nascem do seu lado esquerdo para suprir o jejuno e o íleo (exceto a extremidade distal). Elas entram paralelas no mesentério, e cada vaso se divide em dois ramos que se unem aos ramos vizinhos para formar níveis de arcadas, dos quais partem as artérias retas. Enquanto isso, do lado direito da AMS — que desce em uma curva convexa para a esquerda — nascem as artérias cólica média, cólica direita e ileocólica (com a artéria apendicular), que se anastomosam ao longo do colo até a artéria cólica esquerda.'),
          t('From the distal arcades, the straight arteries (arteriae rectae) travel through the mesentery and terminate in the layers of the small intestine. They reach the concave margin of the bowel, bifurcate to run along opposite surfaces of the loop, and anastomose with their corresponding terminal branches on the convex margin. In the 3D model, the Jejunum and the Ileum show these arteries in the mesentery as the loops run from the concave to the convex margin.',
            'A partir das arcadas distais, as artérias retas (arteriae rectae) percorrem o mesentério e terminam nas camadas do intestino delgado. Elas alcançam a margem côncava do intestino, bifurcam-se para correr ao longo das superfícies opostas da alça e se anastomosam com seus ramos terminais correspondentes na margem convexa. No modelo 3D, o Jejuno e o Íleo mostram essas artérias no mesentério enquanto as alças vão da margem côncava à convexa.'),
        ],
      },
      {
        id: 'jei-p23', ref: '23', title: t('The arcade tiers of the jejunum and the ileum', 'Os níveis de arcadas do jejuno e do íleo'),
        focus: ['jejunum', 'ileum'], ghost: ['sma'], view: 'ant',
        body: [
          t('The jejunum, proximally, contains one to three tiers. The ileum, more distally, contains two to six tiers. It is a short comparison: the arcades multiply as the segment moves distally, in line with the gradual change of the loops described above.',
            'O jejuno, proximalmente, tem de um a três níveis. O íleo, mais distalmente, tem de dois a seis níveis. É uma comparação curta: as arcadas se multiplicam à medida que o segmento avança para distal, de acordo com a mudança gradual das alças descrita acima.'),
        ],
      },
      {
        id: 'jei-p24', ref: '24', title: t('The inferior pancreaticoduodenal artery branch of the SMA', 'O ramo da mesentérica superior, a artéria pancreaticoduodenal inferior'),
        focus: ['pancreaticoduodenal_a', 'sma', 'pancreas', 'duodenum', 'gastroduodenal_a', 'common_hepatic_a', 'proper_hepatic_a', 'gastroepiploic_a', 'splenic_a'], ghost: ['stomach', 'spleen'], view: 'ant',
        body: [
          t('The second branch of the superior mesenteric artery (SMA) is the inferior pancreaticoduodenal artery, which forms anterior and posterior arterial arcades around the head of the pancreas and the duodenum. Its anterior and posterior branches ascend in front of and behind the pancreatic head to anastomose with the anterior and posterior superior pancreaticoduodenal arteries from the gastroduodenal artery (a branch of the common hepatic artery from the celiac trunk). Behind the duodenum runs the common bile duct, while the rest of the pancreas is supplied by the splenic artery—via the dorsal, inferior and great pancreatic arteries—alongside the left gastric and proper hepatic arteries arising from the celiac trunk.',
            'O segundo ramo da AMS é a artéria pancreaticoduodenal inferior, que forma arcadas arteriais anterior e posterior ao redor da cabeça do pâncreas e do duodeno. Seus ramos anterior e posterior sobem pela frente e por trás da cabeça do pâncreas para se anastomosar com as artérias pancreaticoduodenais superiores anterior e posterior vindas da artéria gastroduodenal (ramo da artéria hepática comum do tronco celíaco). Atrás do duodeno corre o ducto colédoco, enquanto o restante do pâncreas é suprido pela artéria esplênica — por meio das artérias pancreática dorsal, pancreática inferior e grande artéria pancreática — ao lado das artérias gástrica esquerda e hepática própria vindas do tronco celíaco.'),
        ],
      },
    ],
    questions: [
      { ref: '17', q: 'Which artery supplies the midgut?', correct: 'Superior mesenteric artery', wrong: ['Celiac trunk', 'Inferior mesenteric artery', 'Internal iliac artery'], why: 'Foregut — celiac trunk; midgut — superior mesenteric artery; hindgut — inferior mesenteric artery.',
        pt: { q: 'Qual artéria supre o intestino médio?', correct: 'Artéria mesentérica superior', wrong: ['Tronco celíaco', 'Artéria mesentérica inferior', 'Artéria ilíaca interna'], why: 'Anterior — tronco celíaco; médio — mesentérica superior; posterior — mesentérica inferior.' } },
      { ref: '18', q: 'From where does the superior mesenteric artery arise?', correct: '1 cm below the celiac trunk (L1)', wrong: ['1 cm above the celiac trunk (T12)', 'From the common iliac arteries', 'From the renal artery at L2'], why: 'The SMA arrives from the aorta 1 cm below the celiac trunk (L1).',
        pt: { q: 'De onde nasce a artéria mesentérica superior?', correct: '1 cm abaixo do tronco celíaco (L1)', wrong: ['1 cm acima do tronco celíaco (T12)', 'Das artérias ilíacas comuns', 'Da artéria renal em L2'], why: 'A mesentérica superior sai da aorta 1 cm abaixo do tronco celíaco (L1).' } },
      { ref: '23', q: 'How many tiers of vascular arcades does the ileum have?', correct: 'Two to six', wrong: ['One to three', 'Four to eight', 'None'], why: 'The jejunum has 1–3 tiers of arcades; the ileum has 2–6.',
        pt: { q: 'Quantos níveis de arcadas vasculares tem o íleo?', correct: 'De dois a seis', wrong: ['De um a três', 'De quatro a oito', 'Nenhum'], why: 'O jejuno tem 1–3 níveis de arcadas; o íleo tem 2–6.' } },
      { ref: '22', q: 'What do the straight arteries (arteriae rectae) do in the small intestine?', correct: 'Arise from the distal arcades and bifurcate along the opposite surfaces of the loop', wrong: ['Drain the lacteals into the thoracic duct', 'Secrete Brunner’s glands mucus', 'Lie only in the submucosa of the duodenum'], why: 'Straight arteries arise from the distal arcades, reach the concave margin, bifurcate along opposite surfaces and anastomose on the convex margin.',
        pt: { q: 'O que fazem as artérias retas (arteriae rectae) no intestino delgado?', correct: 'Nascem das arcadas distais e se bifurcam ao longo das superfícies opostas da alça', wrong: ['Drenam os quilíferos para o ducto torácico', 'Secretam muco das glândulas de Brunner', 'Ficam apenas na submucosa do duodeno'], why: 'As artérias retas nascem das arcadas distais, alcançam a margem côncava, bifurcam-se nas superfícies opostas e se anastomosam na margem convexa.' } },
    ],
  },
  {
    id: 'jejunoileum-4', title: t('The ileocolic and colic branches, the veins and innervation', 'Os ramos ileocólico e cólicos, as veias e a inervação'),
    cards: [
      {
        id: 'jei-p25', ref: '25', title: t('The ileocolic artery', 'A artéria ileocólica'),
        focus: ['ileocolic_a', 'right_colic_a', 'appendicular_a', 'sma', 'ileum', 'appendix', 'ascending_colon'], ghost: ['transverse_colon'], view: 'ant',
        body: [
          t('The ileocolic artery arises from the right side of the SMA and runs behind the parietal peritoneum to the right iliac fossa. Its superior colic branch joins the right colic artery along the ascending colon. Its inferior ileal branch gives off the anterior and posterior caecal branches and the appendicular artery. The terminal ileal branch joins the end of the SMA. Together these branches supply the distal ileum, caecum and appendix. The SMA also gives off inferior pancreaticoduodenal, middle colic, right colic, jejunal and ileal arteries. The jejunal and ileal arcades give rise to straight arteries. The marginal artery connects colic branches from the SMA with the left colic and sigmoid branches from the IMA.',
            'A artéria ileocólica nasce à direita da mesentérica superior e passa atrás do peritônio parietal até a fossa ilíaca direita. Seu ramo cólico superior se anastomosa com a cólica direita ao longo do colo ascendente. Seu ramo ileal inferior dá origem aos ramos cecais anterior e posterior e à artéria apendicular. O ramo ileal terminal se anastomosa com a extremidade da mesentérica superior. Juntos, esses ramos irrigam o íleo distal, o ceco e o apêndice. A mesentérica superior também dá origem às artérias pancreaticoduodenal inferior, cólica média, cólica direita, jejunais e ileais. Das arcadas jejunais e ileais saem artérias retas. A artéria marginal liga ramos cólicos da mesentérica superior aos ramos cólico esquerdo e sigmoideos da mesentérica inferior.'),
          t('In the 3D model, the Ileocolic artery is the branch to follow down to the right iliac fossa, where it ends at the Appendix and the caecal end of the Ileum.',
            'No modelo 3D, a artéria ileocólica é o ramo a seguir até a fossa ilíaca direita, onde termina no Apêndice e na extremidade cecal do Íleo.'),
        ],
      },
      {
        id: 'jei-p26', ref: '26–27', title: t('The inferior ileal branch: caecal, appendicular and ileal branches', 'O ramo ileal inferior: ramos cecais, apendicular e ileais'),
        focus: ['ileocolic_a', 'appendicular_a', 'ileum', 'appendix', 'ascending_colon', 'middle_colic_a', 'right_colic_a', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a', 'sma'], ghost: ['transverse_colon', 'descending_colon'], view: 'ant',
        body: [
          t('The inferior ileal branch gives rise to the anterior and posterior caecal arteries and the appendicular artery. An ileal branch runs left to the terminal ileum and joins the end of the superior mesenteric artery. Below the celiac trunk, inferior pancreaticoduodenal branches run from the superior mesenteric artery toward the pancreas and duodenum. Along the colon, the marginal artery (artery of Drummond) links the territories of the superior and inferior mesenteric arteries. The arch of Riolan connects the middle colic artery with the ascending branch of the left colic artery.',
            'O ramo ileal inferior dá origem às artérias cecais anterior e posterior e à artéria apendicular. Um ramo ileal segue para a esquerda até o íleo terminal e se anastomosa com a extremidade da artéria mesentérica superior. Abaixo do tronco celíaco, os ramos pancreaticoduodenais inferiores seguem da mesentérica superior em direção ao pâncreas e ao duodeno. Ao longo do colo, a artéria marginal (artéria de Drummond) conecta os territórios das mesentéricas superior e inferior. O arco de Riolan liga a artéria cólica média ao ramo ascendente da cólica esquerda.'),
          t('The colic branch continues upward as the ascending branch along the ascending colon. The inferior division gives off the anterior and posterior caecal arteries and the appendicular artery, which has a recurrent branch. The terminal ileal artery forms anastomotic arcades with the end of the superior mesenteric artery.',
            'O ramo cólico continua para cima como ramo ascendente ao longo do colo ascendente. A divisão inferior dá origem às artérias cecais anterior e posterior e à artéria apendicular, que tem um ramo recorrente. A artéria ileal terminal forma arcadas anastomóticas com a extremidade da artéria mesentérica superior.'),
        ],
      },
      {
        id: 'jei-p28', ref: '28', title: t('The right colic artery and the marginal artery', 'A artéria cólica direita e a artéria marginal'),
        focus: ['right_colic_a', 'ileocolic_a', 'middle_colic_a', 'ascending_colon', 'sma'], ghost: ['transverse_colon'], view: 'ant',
        body: [
          t('The right colic artery usually arises from the right side of the SMA, between the middle colic and ileocolic arteries. Its origin varies. It runs to the right behind the parietal peritoneum. Near the ascending colon, its descending branch joins the colic branch of the ileocolic artery, and its ascending branch joins the right branch of the middle colic artery. These connections form the marginal artery that supplies the ascending colon and hepatic flexure. The jejunal and ileal arteries arise on the opposite side of the SMA.',
            'A artéria cólica direita costuma nascer à direita da mesentérica superior, entre as artérias cólica média e ileocólica. Sua origem varia. Ela segue para a direita atrás do peritônio parietal. Perto do colo ascendente, o ramo descendente se une ao ramo cólico da ileocólica e o ascendente se une ao ramo direito da cólica média. Essas anastomoses formam a artéria marginal, que irriga o colo ascendente e a flexura hepática. As artérias jejunais e ileais nascem do lado oposto da mesentérica superior.'),
        ],
      },
      {
        id: 'jei-p29', ref: '29', title: t('The middle colic artery and the transverse colon arcades', 'A artéria cólica média e as arcadas do colo transverso'),
        focus: ['middle_colic_a', 'transverse_colon', 'pancreas', 'ileocolic_a', 'left_colic_a'], ghost: ['sma', 'descending_colon'], view: 'ant',
        body: [
          t('The middle colic artery originates below the pancreas, and then runs anteriorly and to the right, between the two sheets of the transverse mesocolon. It divides into a left and a right branch, which anastomose with the left and right colic arteries to form arcades that supply the transverse colon. In the 3D model, the Middle colic artery is the vessel that crosses under the Pancreas and into the mesocolon toward the Transverse colon.',
            'A artéria cólica média se origina abaixo do pâncreas e depois corre anteriormente e para a direita, entre as duas lâminas do mesocolo transverso. Divide-se em um ramo esquerdo e um direito, que se anastomosam com as artérias cólicas esquerda e direita e formam arcadas que suprem o colo transverso. No modelo 3D, a artéria cólica média é o vaso que cruza sob o Pâncreas e entra no mesocolo em direção ao Colo transverso.'),
        ],
      },
      {
        id: 'jei-p30', ref: '30', title: t('Veins of the small intestine and the portal drainage', 'Veias do intestino delgado e a drenagem porta'),
        focus: ['smv', 'hepatic_portal_v', 'splenic_v', 'imv', 'gastric_v', 'jejunum', 'ileum', 'transverse_colon'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('Straight veins (venae rectae) from the jejunum and ileum join anastomotic arches. Jejunal and ileal veins collect blood from the arches and drain to the superior mesenteric vein. The ileocolic, appendicular, right colic, middle colic, right gastro-omental and pancreaticoduodenal veins also feed this drainage. The superior mesenteric vein joins the splenic vein to form the hepatic portal vein. The inferior mesenteric, pancreatic, short gastric and left gastro-omental veins drain toward the splenic vein. The left and right gastric and cystic veins drain into the portal system.',
            'As veias retas (venae rectae) do jejuno e do íleo se unem em arcadas anastomóticas. As veias jejunais e ileais recolhem o sangue das arcadas e drenam para a mesentérica superior. As veias ileocólica, apendicular, cólica direita, cólica média, gastro-omental direita e pancreaticoduodenais também participam dessa drenagem. A veia mesentérica superior se une à esplênica para formar a veia porta hepática. As veias mesentérica inferior, pancreáticas, gástricas curtas e gastro-omental esquerda drenam em direção à esplênica. As veias gástricas esquerda e direita e as císticas drenam para o sistema porta.'),
        ],
      },
    ],
    questions: [
      { ref: '25', q: 'Where does the ileocolic artery end after it descends on the right?', correct: 'In the right iliac fossa, by dividing into colic and ileal branches', wrong: ['In the splenic flexure', 'In the sigmoid colon', 'In the liver hilum'], why: 'The ileocolic artery descends to the right iliac fossa and divides into a superior colic branch and an inferior ileal branch.',
        pt: { q: 'Onde termina a artéria ileocólica depois de descer à direita?', correct: 'Na fossa ilíaca direita, dividindo-se em ramos cólico e ileal', wrong: ['Na flexura esplênica', 'No colo sigmoide', 'No hilo do fígado'], why: 'A artéria ileocólica desce até a fossa ilíaca direita e se divide em ramo cólico superior e ileal inferior.' } },
      { ref: '28', q: 'Which arteries anastomose to form the marginal artery that supplies the ascending colon and hepatic flexure?', correct: 'The descending branch of the right colic with the ileocolic, and the ascending branch with the middle colic', wrong: ['The left colic with the sigmoid', 'The splenic with the left gastric', 'The jejunal with the ileal arteries only'], why: 'The right colic divides into a descending branch (anastomosing with the ileocolic colic branch) and an ascending branch (anastomosing with the right middle colic branch), forming the marginal artery.',
        pt: { q: 'Quais artérias se anastomosam para formar a artéria marginal que supre o colo ascendente e a flexura hepática?', correct: 'O ramo descendente da cólica direita com a ileocólica, e o ramo ascendente com a cólica média', wrong: ['A cólica esquerda com a sigmoide', 'A esplênica com a gástrica esquerda', 'Apenas as artérias jejunais com as ileais'], why: 'A cólica direita se divide em ramo descendente (anastomosa com o ramo cólico da ileocólica) e ascendente (anastomosa com o ramo direito da cólica média), formando a marginal.' } },
      { ref: '29', q: 'Where does the middle colic artery run after originating below the pancreas?', correct: 'Anteriorly and to the right, in the two sheets of the mesocolon', wrong: ['Posteriorly along the retroperitoneal wall', 'Between the two layers of the greater omentum', 'Inside the sigmoid mesocolon'], why: 'The middle colic artery originates below the pancreas and runs anteriorly and to the right, in the two sheets of the mesocolon.',
        pt: { q: 'Por onde corre a artéria cólica média após se originar abaixo do pâncreas?', correct: 'Anteriormente e para a direita, nas duas lâminas do mesocolo', wrong: ['Posteriormente pela parede retroperitoneal', 'Entre as duas camadas do omento maior', 'Dentro do mesocolo sigmoide'], why: 'A artéria cólica média origina-se abaixo do pâncreas e corre anteriormente e para a direita, nas duas lâminas do mesocolo.' } },
      { ref: '30', q: 'Where do the straight veins (venae rectae) of the small intestine drain?', correct: 'Into the superior mesenteric vein and then the portal vein', wrong: ['Directly into the inferior vena cava', 'Into the renal veins', 'Into the thoracic duct'], why: 'The jejunal and ileal veins form arches; the straight veins drain to the superior mesenteric vein, and from there to the portal vein.',
        pt: { q: 'Para onde drenam as veias retas (venae rectae) do intestino delgado?', correct: 'Para a veia mesentérica superior e depois para a veia porta', wrong: ['Diretamente na veia cava inferior', 'Nas veias renais', 'No ducto torácico'], why: 'As veias jejunais e ileais formam arcos; as veias retas drenam para a mesentérica superior e dali para a veia porta.' } },
    ],
  },
  {
    id: 'jejunoileum-5', title: t('Histology: the wall of the jejunum and the ileum', 'Histologia: a parede do jejuno e do íleo'),
    cards: [
      {
        id: 'jei-p31', ref: '31', title: t('The three structures that enlarge the absorbing surface', 'As três estruturas que aumentam a superfície absortiva'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('The small intestine increases its absorptive surface at three scales. Plicae circulares (valves of Kerckring) are permanent folds of mucosa and submucosa, unlike the folds of the stomach. They are easy to see with the naked eye and occur in the duodenal papillary region but absent in the first centimetre of the duodenum and the distal ileum. Finger-like mucosal villi cover the folds and are barely visible to the naked eye. Each villus has a lacteal and a lining of simple columnar enterocytes. On the apical surface of each enterocyte, microscopic microvilli add more surface area. Intestinal crypts descend between the villi toward the muscularis mucosae, and lymphoid nodules lie near the crypt bases. The submucosa contains an artery, a vein, a lymphatic vessel and the submucosal plexus. Farther out, the myenteric plexus lies between the circular and longitudinal smooth muscle layers of the muscularis externa. The serosa covers these layers.',
            'O intestino delgado amplia sua superfície de absorção em três escalas. As pregas circulares (válvulas de Kerckring) são dobras permanentes de mucosa e submucosa, ao contrário das pregas gástricas. São fáceis de ver a olho nu e ocorrem na região papilar do duodeno, mas faltam no primeiro centímetro do duodeno e no íleo distal. Vilosidades digitiformes da mucosa cobrem as pregas e mal se distinguem a olho nu. Cada vilosidade tem um vaso quilífero e um revestimento de enterócitos cilíndricos em camada única. Na superfície apical de cada enterócito, microvilosidades microscópicas ampliam ainda mais a área. As criptas intestinais descem entre as vilosidades em direção à muscular da mucosa, e nódulos linfoides ficam próximos às bases das criptas. A submucosa contém uma artéria, uma veia, um vaso linfático e o plexo submucoso. Mais externamente, o plexo mioentérico ocupa o espaço entre as camadas musculares lisas circular e longitudinal da muscular externa. A serosa recobre essas camadas.'),
        ],
      },
      {
        id: 'jei-p32', ref: '32', title: t('Internal conformation: how the jejunum and ileum differ in the wall', 'Conformação interna: como o jejuno e o íleo diferem na parede'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('From jejunum to ileum, the intestine gradually becomes narrower, thinner-walled and less vascularised. In both segments the mesentery meets the serosa, or visceral peritoneum. From the serosa inward lie the longitudinal muscle, circular muscle, submucosa and mucosa. The jejunal arteries form simpler anastomotic loops and give rise to long straight arteries. The jejunum has tall circular folds (valves of Kerckring) and solitary lymphoid nodules. Ileal arteries form several tiers of arcades. The ileum has lower circular folds and both solitary lymphoid nodules and aggregated lymphoid nodules (Peyer’s patches).',
            'Do jejuno ao íleo, o intestino fica aos poucos mais estreito, com parede mais fina e menos vascularizada. Nos dois segmentos, o mesentério encontra a serosa, ou peritônio visceral. Da serosa para dentro ficam a camada muscular longitudinal, a circular, a submucosa e a mucosa. As artérias jejunais formam arcadas mais simples e dão origem a artérias retas longas. O jejuno tem pregas circulares altas (válvulas de Kerckring) e nódulos linfoides solitários. As artérias ileais formam arcadas em vários níveis. O íleo tem pregas circulares mais baixas e nódulos linfoides tanto solitários quanto agregados (placas de Peyer).'),
        ],
      },
      {
        id: 'jei-p33', ref: '33–34', title: t('The jejunum: circular folds at their highest, villi, and plicae circulares', 'O jejuno: pregas circulares no ponto mais alto, vilosidades e pregas'),
        focus: ['jejunum'], ghost: ['ileum'], view: 'ant', contextOnly: true,
        body: [
          t('The circular folds are tallest in the jejunum. The mucosa and submucosa rise together into the plicae circulares of Kerckring. Finger-like villi project from the mucosa, with lamina propria at their core and the muscularis mucosae at the base of the mucosa. A solitary lymphoid nodule can lie in the mucosa. In the ileum the circular folds are lower and lymphatic follicles are prominent. Outside the jejunal submucosa lie the circular then longitudinal muscle layers, followed by the serosa. Mesenteric arterial arcades give rise to straight arteries that supply this wall. The tall folds and finger-like villi help identify the jejunum.',
            'As pregas circulares atingem a maior altura no jejuno. Mucosa e submucosa se elevam juntas nas pregas circulares de Kerckring. Vilosidades digitiformes partem da mucosa, com lâmina própria no centro e a muscular da mucosa na base da mucosa. Um nódulo linfoide solitário pode ficar na mucosa. No íleo as pregas circulares são mais baixas e os folículos linfáticos são proeminentes. Por fora da submucosa jejunal ficam as camadas musculares circular e longitudinal, seguidas pela serosa. As arcadas arteriais do mesentério dão origem às artérias retas que irrigam essa parede. As pregas altas e vilosidades digitiformes ajudam a identificar o jejuno.'),
        ],
      },
      {
        id: 'jei-p35', ref: '35', title: t('Goblet cells and the lamina propria of the jejunum', 'Células caliciformes e a lâmina própria do jejuno'),
        focus: ['jejunum'], ghost: ['ileum'], view: 'ant', contextOnly: true,
        body: [
          t('In the jejunum, the lamina propria forms the core of the villi beneath the epithelium. Goblet cells are scattered among the enterocytes that line the villi.',
            'No jejuno, a lâmina própria forma o centro das vilosidades, sob o epitélio. As células caliciformes ficam dispersas entre os enterócitos que revestem as vilosidades.'),
        ],
      },
      {
        id: 'jei-p36', ref: '36–37', title: t('The ileum: circular folds, goblet cells and Peyer’s patches', 'O íleo: pregas circulares, células caliciformes e placas de Peyer'),
        focus: ['ileum'], ghost: ['jejunum'], view: 'ant', contextOnly: true,
        body: [
          t('The ileal wall gets thinner distally. Its circular folds are present proximally, get lower along the ileum and disappear at the end. Goblet cells increase distally. In the wall, the mucosa is followed outward by the submucosa, the circular and longitudinal muscle layers and the serosa. Straight arteries arise from ileal arcades in the mesentery and reach the wall. Both jejunum and ileum have solitary lymphoid nodules. In the ileum, aggregated lymphatic follicles form Peyer’s patches. These oval patches measure 2 to 10 cm and form an incomplete ring around the wall. They have few villi over them, and their epithelium captures antigen.',
            'A parede do íleo fica mais fina distalmente. As pregas circulares estão presentes no início, diminuem de altura ao longo do íleo e desaparecem no final. As células caliciformes aumentam distalmente. Na parede, à mucosa seguem-se a submucosa, as camadas musculares circular e longitudinal e a serosa. Artérias retas saem das arcadas ileais no mesentério e alcançam a parede. Tanto o jejuno quanto o íleo têm nódulos linfoides solitários. No íleo, folículos linfáticos agregados formam as placas de Peyer. Essas placas ovais medem de 2 a 10 cm e formam um anel incompleto ao redor da parede. Sobre elas há poucas vilosidades e seu epitélio captura antígenos.'),
        ],
      },
      {
        id: 'jei-p38', ref: '38', title: t('Peyer’s patches', 'Placas de Peyer'),
        focus: ['ileum'], ghost: ['jejunum'], view: 'ant', contextOnly: true,
        body: [
          t('Peyer’s patches occupy the mucosa and reach the submucosa. Outside them are the circular muscle, longitudinal muscle and serosa. The patches consist of aggregated lymphatic follicles, measure 2 to 10 cm and form an oval, incomplete ring in the intestinal wall. Few villi cover them. Their epithelium captures antigen.',
            'As placas de Peyer ocupam a mucosa e chegam à submucosa. Por fora delas ficam o músculo circular, o longitudinal e a serosa. As placas são agregados de folículos linfáticos, medem de 2 a 10 cm e formam um anel oval incompleto na parede intestinal. Poucas vilosidades as recobrem. Seu epitélio captura antígenos.'),
        ],
      },
    ],
    questions: [
      { ref: '31', q: 'Where are the plicae circulares (valves of Kerckring) absent?', correct: 'In the first centimetre of the duodenum and in the distal ileum', wrong: ['In the jejunum only', 'In the whole duodenum', 'In the cecum only'], why: 'The plicae are absent in the first cm of the duodenum and the distal part of the ileum.',
        pt: { q: 'Onde faltam as pregas circulares (válvulas de Kerckring)?', correct: 'No primeiro centímetro do duodeno e no íleo distal', wrong: ['Apenas no jejuno', 'Em todo o duodeno', 'Apenas no ceco'], why: 'Faltam no primeiro cm do duodeno e na parte distal do íleo.' } },
      { ref: '33', q: 'In which part of the small intestine do the circular folds reach their highest?', correct: 'The jejunum', wrong: ['The distal ileum', 'The duodenal bulb', 'The cecum'], why: 'In the jejunum the circular folds reach their highest.',
        pt: { q: 'Em qual parte do intestino delgado as pregas circulares atingem a altura máxima?', correct: 'No jejuno', wrong: ['No íleo distal', 'No bulbo duodenal', 'No ceco'], why: 'No jejuno as pregas circulares atingem a altura máxima.' } },
      { ref: '37', q: 'How large can Peyer’s patches reach?', correct: '2 to 10 cm', wrong: ['2 to 10 mm', '10 to 20 cm', '0.5 to 1 cm'], why: 'Peyer’s patches are aggregated lymphatic follicles that can reach from 2 to 10 cm.',
        pt: { q: 'Qual o tamanho que as placas de Peyer podem atingir?', correct: '2 a 10 cm', wrong: ['2 a 10 mm', '10 a 20 cm', '0,5 a 1 cm'], why: 'As placas de Peyer são folículos linfáticos agregados que podem atingir de 2 a 10 cm.' } },
      { ref: '37', q: 'Which part of the small intestine is identified by Peyer’s patches?', correct: 'The ileum', wrong: ['The jejunum', 'The duodenum', 'The rectum'], why: 'The ileum can be distinguished by its Peyer’s patches.',
        pt: { q: 'Qual parte do intestino delgado é identificada pelas placas de Peyer?', correct: 'O íleo', wrong: ['O jejuno', 'O duodeno', 'O reto'], why: 'O íleo se distingue pelas suas placas de Peyer.' } },
    ],
  },
  {
    id: 'jejunoileum-6', title: t('Brunner’s glands, crypts, the cells of the wall and the lacteals', 'Glândulas de Brunner, criptas, células da parede e os quilíferos'),
    cards: [
      {
        id: 'jei-p39', ref: '39', title: t('Duodenal and small-intestine glands: Brunner’s glands', 'Glândulas duodenais e do intestino delgado: as glândulas de Brunner'),
        focus: ['duodenum', 'jejunum', 'ileum'], ghost: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('In the duodenum, villi and intestinal crypts occupy the mucosa. Brunner’s glands lie deeper in the submucosa and are most abundant in the proximal duodenum. They secrete large amounts of mucus, which protects the epithelium against acidic chyme from the stomach. Buffers in the mucus raise the pH of the chyme. By the start of the jejunum it rises from 1–2 to 7–8, and no extra mucus is needed there.',
            'No duodeno, as vilosidades e as criptas intestinais ocupam a mucosa. As glândulas de Brunner ficam mais fundo, na submucosa, e são mais abundantes no duodeno proximal. Elas secretam muito muco, que protege o epitélio do quimo ácido vindo do estômago. Os tampões no muco elevam o pH do quimo. No começo do jejuno, o pH já passou de 1–2 para 7–8 e a secreção extra de muco deixa de ser necessária.'),
          t('Brunner’s glands are a histological specialisation of the duodenum. In the 3D model, the Duodenum is the segment to use for them, since they are not assigned to the jejunum or ileum.',
            'As glândulas de Brunner são uma especialização histológica do duodeno. No modelo 3D, o Duodeno é o segmento a usar para elas, já que elas não são atribuídas ao jejuno nem ao íleo.'),
        ],
      },
      {
        id: 'jei-p40', ref: '40', title: t('Gross and microscopic views of the duodenum, jejunum and ileum', 'Vistas macro e microscópica do duodeno, do jejuno e do íleo'),
        focus: ['duodenum', 'jejunum', 'ileum'], ghost: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('All three parts of the small intestine have circular folds, though their prominence varies. The duodenal ampulla lies at the proximal end. From the lumen outward, the wall has mucosal epithelium, muscularis mucosae, submucosa, a muscle layer and serosa. Brunner’s glands occupy the duodenal submucosa. The jejunum has prominent folds and villi and lacks both submucosal glands and Peyer’s patches. The ileum contains aggregated lymphoid nodules called Peyer’s patches.',
            'As três partes do intestino delgado têm pregas circulares, com diferentes graus de proeminência. A ampola duodenal fica na extremidade proximal. Da luz para fora, a parede tem epitélio da mucosa, muscular da mucosa, submucosa, camada muscular e serosa. As glândulas de Brunner ocupam a submucosa duodenal. O jejuno tem pregas e vilosidades proeminentes e não tem glândulas submucosas nem placas de Peyer. O íleo contém nódulos linfoides agregados, as placas de Peyer.'),
        ],
      },
      {
        id: 'jei-p41', ref: '41', title: t('The intestinal crypts and the renewal of the epithelium', 'As criptas intestinais e a renovação do epitélio'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('Between the columnar epithelial cells (enterocytes), goblet cells eject mucins onto the surface. At the bases of the villi are the intestinal crypts, or crypts of Lieberkühn. They extend deep into the underlying lamina propria. Near the base of each crypt, stem cell divisions continually produce new generations of epithelial cells. These cells are pushed toward the surface, and within a few days they reach the tip of a villus, where they are shed into the lumen. This ongoing process renews the epithelial surface and adds intracellular enzymes to the chyme.',
            'Entre as células epiteliais colunares (enterócitos), as células caliciformes lançam mucinas na superfície. Nas bases das vilosidades ficam as criptas intestinais, ou criptas de Lieberkühn. Elas se estendem profundamente na lâmina própria subjacente. Perto da base de cada cripta, divisões de células-tronco produzem continuamente novas gerações de células epiteliais. Essas células são empurradas para a superfície, e em poucos dias chegam à ponta de uma vilosidade, onde se soltam na luz. Esse processo contínuo renova a superfície epitelial e acrescenta enzimas intracelulares ao quimo.'),
        ],
      },
      {
        id: 'jei-p42', ref: '42', title: t('The cells of the crypts of Lieberkühn', 'As células das criptas de Lieberkühn'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('The crypts extend just above the muscularis mucosae. Columnar enterocytes absorb substances. Goblet cells among them secrete mucin to lubricate and protect the epithelium. Paneth cells secrete antibacterial lysozyme, defensins and TNF. Stem cells renew the epithelium. Neuroendocrine cells secrete local hormones that regulate intestinal motility and secretion. Intraepithelial lymphocytes are mainly T cells.',
            'As criptas se estendem até pouco acima da muscular da mucosa. Os enterócitos cilíndricos absorvem substâncias. Entre eles, células caliciformes secretam mucina para lubrificar e proteger o epitélio. Células de Paneth secretam lisozima antibacteriana, defensinas e TNF. Células-tronco renovam o epitélio. Células neuroendócrinas secretam hormônios locais que regulam a motilidade e a secreção intestinal. Os linfócitos intraepiteliais são principalmente células T.'),
        ],
      },
      {
        id: 'jei-p43', ref: '43', title: t('Normal gut and coeliac disease', 'Intestino normal e doença celíaca'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('In the normal jejunum, tall finger-like villi project from the circular folds. In coeliac disease, loss of villi flattens the mucosal surface and reduces its projections.',
            'No jejuno normal, vilosidades altas e digitiformes se projetam das pregas circulares. Na doença celíaca, a perda das vilosidades achata a superfície da mucosa e reduz suas projeções.'),
        ],
      },
      {
        id: 'jei-p44', ref: '44', title: t('Tuft or brush cells', 'Células em tufo ou em escova'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('A tuft (brush) cell sits between enterocytes on the basal lamina of the crypt–villus epithelium. Its prominent apical microvilli face the lumen and extend into a filamentous bundle. It has lateral cytospinules and contains a nucleus, Golgi apparatus, endoplasmic reticulum and cargo vesicles. In this epithelium, stem, Paneth, goblet and enteroendocrine cells lie nearby. Tuft cells interact with gut hormones and with microbial metabolites and IgA in the lumen. On the tissue side, they interact with dendritic cells and macrophages in the lamina propria and fibres of the vagus nerve. They participate in gastrointestinal chemosensation and can mediate inflammation.',
            'Uma célula em tufo fica entre enterócitos, apoiada na lâmina basal do epitélio das criptas e vilosidades. Suas microvilosidades apicais proeminentes voltam-se para a luz e se prolongam em um feixe filamentoso. Ela tem espínulas citoplasmáticas laterais e contém núcleo, aparelho de Golgi, retículo endoplasmático e vesículas de transporte. Nesse epitélio ficam também células-tronco, células de Paneth, caliciformes e enteroendócrinas. Células em tufo interagem com hormônios intestinais e com metabólitos microbianos e IgA na luz. Do lado tecidual, interagem com células dendríticas e macrófagos da lâmina própria e com fibras do nervo vago. Elas participam da quimiossensação gastrointestinal e podem mediar a inflamação.'),
        ],
      },
      {
        id: 'jei-p45', ref: '45', title: t('Regulatory T cells, inflammation and the 2025 Nobel Prize', 'Células T reguladoras, inflamação e o Nobel de 2025'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('In the healthy gut, short-chain fatty acids (SCFAs) and the epithelial barrier support regulatory T cells (Treg), which help maintain an anti-inflammatory response. In the inflamed gut, the barrier breaks down, and bacterial lipopolysaccharide (LPS) and effector T cells (Teff) increase. Macrophages release proinflammatory cytokines that drive chronic inflammation. The 2025 Nobel Prize in Physiology or Medicine was awarded to Mary E. Brunkow, Frederick J. Ramsdell and Shimon Sakaguchi.',
            'No intestino saudável, os ácidos graxos de cadeia curta (AGCC) e a barreira epitelial favorecem as células T reguladoras (Treg), que ajudam a manter uma resposta anti-inflamatória. No intestino inflamado, a barreira se rompe e aumentam o lipopolissacarídeo bacteriano (LPS) e as células T efetoras (Teff). Os macrófagos liberam citocinas pró-inflamatórias que perpetuam a inflamação crônica. O Nobel de Fisiologia ou Medicina de 2025 foi concedido a Mary E. Brunkow, Frederick J. Ramsdell e Shimon Sakaguchi.'),
        ],
      },
      {
        id: 'jei-p46', ref: '46', title: t('The glycocalyx and the enzymes that finish digestion', 'O glicocálix e as enzimas que terminam a digestão'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant', contextOnly: true,
        body: [
          t('A villus contains a central chyliferous vessel and smooth muscle cells in the lamina propria beneath the surface epithelium. The muscularis mucosae lies at the base of the mucosa. The submucosa and the circular and longitudinal muscle layers lie deeper. Enterocytes line the surface, and cells are shed at the villus tip. Goblet, Paneth and neuroendocrine cells also occur in this epithelium. In enterocytes, core filament bundles extend from the microvilli into the terminal web. The glycocalyx lies beneath the mucus and is anchored to integral proteins and glycolipids in the lipid bilayer. It holds the enzymes that finish digestion near the cell surface.',
            'Uma vilosidade contém um vaso quilífero central e células musculares lisas na lâmina própria, sob o epitélio superficial. A muscular da mucosa fica na base da mucosa. A submucosa e as camadas musculares circular e longitudinal ficam mais fundo. Enterócitos revestem a superfície e células se desprendem na ponta da vilosidade. Nesse epitélio também há células caliciformes, de Paneth e neuroendócrinas. Nos enterócitos, feixes de filamentos partem das microvilosidades e chegam à rede terminal. O glicocálix fica sob o muco e se ancora em proteínas integrais e glicolipídios da bicamada lipídica. Ele mantém junto à superfície celular as enzimas que finalizam a digestão.'),
        ],
      },
      {
        id: 'jei-p47', ref: '47', title: t('Lymphatics of the villi, the lacteal and the fat-absorption pathway', 'Linfáticos das vilosidades, o quilífero e a via de absorção de gordura'),
        focus: ['jejunum', 'ileum'], ghost: ['duodenum'], view: 'ant',
        body: [
          t('Lymphatic capillaries begin as lacteals in the mucosal villi. They drain into a dense submucosal network, then into larger collecting vessels in the serosa. In the lumen, digested fat from the emulsion supplies fatty acids and monoglycerides to micelles. These lipids leave the micelles and enter the epithelial cell across the surface with its glycocalyx and underlying terminal web. Inside the cell they form triglycerides. Fat droplets combine with proteins in the Golgi apparatus to form chylomicrons. The cell releases the chylomicrons into the tissue, where they enter a lacteal and are carried away.',
            'Os capilares linfáticos começam como vasos quilíferos nas vilosidades da mucosa. Eles drenam para uma rede densa na submucosa e depois para vasos coletores maiores na serosa. Na luz, a digestão da gordura emulsificada fornece ácidos graxos e monoglicerídeos às micelas. Esses lipídios saem das micelas e entram na célula epitelial pela superfície com glicocálix e rede terminal subjacente. Dentro da célula, formam triglicerídeos. As gotículas de gordura se unem a proteínas no aparelho de Golgi e formam quilomícrons. A célula libera os quilomícrons no tecido, de onde entram no vaso quilífero e são transportados.'),
        ],
      },
    ],
    questions: [
      { ref: '39', q: 'Which submucosal glands are a histological specialisation of the duodenum?', correct: 'Brunner’s glands', wrong: ['Peyer’s patches', 'Paneth cells', 'Goblet cells only'], why: 'As a histological specialisation of the duodenum, its submucosa contains Brunner’s glands, which produce mucus and buffers.',
        pt: { q: 'Quais glândulas submucosas são uma especialização histológica do duodeno?', correct: 'Glândulas de Brunner', wrong: ['Placas de Peyer', 'Células de Paneth', 'Apenas células caliciformes'], why: 'Como especialização histológica do duodeno, sua submucosa contém as glândulas de Brunner, que produzem muco e tampões.' } },
      { ref: '39', q: 'Why are Brunner’s glands needed in the duodenum?', correct: 'Their mucus protects the epithelium from the acid chyme from the stomach', wrong: ['They make the villi grow', 'They absorb fat into the lacteals', 'They secrete intrinsic factor'], why: 'The mucus protects the epithelium from acid chyme from the stomach and contains buffers that raise the pH.',
        pt: { q: 'Por que as glândulas de Brunner são necessárias no duodeno?', correct: 'O muco protege o epitélio do quimo ácido vindo do estômago', wrong: ['Fazem as vilosidades crescer', 'Absorvem gordura para os quilíferos', 'Secretam fator intrínseco'], why: 'O muco protege o epitélio do quimo ácido vindo do estômago e contém tampões que elevam o pH.' } },
      { ref: '42', q: 'Which crypt cells secrete lysozyme, defensins and TNF?', correct: 'Paneth cells', wrong: ['Goblet cells', 'Enterocytes', 'Tuft cells'], why: 'Paneth cells secrete lysozyme, defensins and TNF.',
        pt: { q: 'Quais células das criptas secretam lisozima, defensinas e TNF?', correct: 'Células de Paneth', wrong: ['Células caliciformes', 'Enterócitos', 'Células em tufo'], why: 'As células de Paneth secretam lisozima, defensinas e TNF.' } },
      { ref: '41', q: 'Where do the new epithelial cells of the intestine come from?', correct: 'Stem cells near the base of the crypt', wrong: ['The surface of the villus', 'The lacteals', 'The muscularis externa'], why: 'Stem cell divisions near the base of each crypt produce new cells, which move up to the tip of the villus and are shed.',
        pt: { q: 'De onde vêm as novas células epiteliais do intestino?', correct: 'Das células-tronco perto da base da cripta', wrong: ['Da superfície da vilosidade', 'Dos quilíferos', 'Da muscular externa'], why: 'As divisões das células-tronco perto da base de cada cripta produzem as células novas, que sobem até a ponta da vilosidade e se soltam.' } },
      { ref: '47', q: 'What do the enterocytes form inside the Golgi apparatus before they enter a lacteal?', correct: 'Chylomicrons', wrong: ['Micelles', 'Lysozyme', 'Mucins'], why: 'Fatty globules combine with proteins inside the Golgi to form chylomicrons, which enter the lacteal.',
        pt: { q: 'O que os enterócitos formam dentro do complexo de Golgi antes de entrarem em um quilífero?', correct: 'Quilomícrons', wrong: ['Micelas', 'Lisozima', 'Mucinas'], why: 'As gotículas de gordura se combinam com proteínas dentro do Golgi para formar quilomícrons, que entram no quilífero.' } },
    ],
  },
  {
    id: 'jejunoileum-7', title: t('Lymphatic drainage and the innervation of the small intestine', 'Drenagem linfática e inervação do intestino delgado'),
    cards: [
      {
        id: 'jei-p48', ref: '48', title: t('The lymphatic plexuses of the wall and their route along the mesentery', 'Os plexos linfáticos da parede e sua rota ao longo do mesentério'),
        focus: ['jejunum', 'ileum', 'sma', 'smv'], ghost: ['duodenum', 'transverse_colon'], view: 'ant',
        body: [
          t('Lymph first collects in three networks in the intestinal wall. From inner to outer, these are the submucosal plexus, muscular plexus and subserosal collectors. Collecting vessels then run between the two layers of the mesentery alongside the arteries and veins. Each group generally drains the same intestinal segment as the blood vessels it accompanies.',
            'A linfa se reúne primeiro em três redes na parede intestinal. De dentro para fora, são o plexo submucoso, o plexo muscular e os coletores subserosos. Os vasos coletores seguem entre as duas lâminas do mesentério, junto às artérias e veias. Cada grupo costuma drenar o mesmo segmento intestinal dos vasos sanguíneos que acompanha.'),
        ],
      },
      {
        id: 'jei-p49', ref: '49', title: t('The lymph pathway: juxta-intestinal nodes, the SMA nodes and the intestinal trunk', 'A via da linfa: nodos juxta-intestinais, nodos da mesentérica superior e o tronco intestinal'),
        focus: ['sma', 'jejunum', 'ileum', 'celiac_trunk', 'abdominal_aorta_g', 'duodenum', 'transverse_colon'], ghost: ['ascending_colon'], view: 'ant',
        body: [
          t('Lymph from the jejunum and ileum first reaches the regional juxta-intestinal nodes. It passes through intermediate mesenteric nodes to the superior mesenteric nodes and then into the intestinal trunk. Ileocolic nodes lie along the ascending colon. Celiac nodes lie higher near the abdominal aorta and cisterna chyli. The intestinal lymphatics connect with those of the liver, pancreas, stomach and proximal large intestine. The small-intestinal nodes form the largest group in the body, with about 100 to 150 nodes of varying size. Below the diaphragm, near the inferior vena cava, the cisterna chyli receives the intestinal trunk and both lumbar trunks. The thoracic duct rises between the azygos and hemiazygos veins near thoracic lymph nodes. It reaches the left venous angle between the left internal jugular and subclavian veins, near the corresponding lymphatic trunks. The right lymphatic duct receives the right jugular, subclavian and bronchomediastinal trunks.',
            'A linfa do jejuno e do íleo chega primeiro aos linfonodos regionais justaintestinais. Passa pelos linfonodos mesentéricos intermediários até os mesentéricos superiores e entra no tronco intestinal. Os linfonodos ileocólicos ficam ao longo do colo ascendente. Os celíacos ficam mais acima, perto da aorta abdominal e da cisterna do quilo. Os linfáticos intestinais se comunicam com os do fígado, pâncreas, estômago e intestino grosso proximal. Os linfonodos do intestino delgado formam o maior grupo do corpo, com cerca de 100 a 150 linfonodos de tamanhos variados. Abaixo do diafragma, perto da veia cava inferior, a cisterna do quilo recebe o tronco intestinal e os dois troncos lombares. O ducto torácico sobe entre as veias ázigos e hemiázigos, perto dos linfonodos torácicos. Ele chega ao ângulo venoso esquerdo, entre as veias jugular interna e subclávia esquerdas, perto dos troncos linfáticos correspondentes. O ducto linfático direito recebe os troncos jugular, subclávio e broncomediastinal direitos.'),
        ],
      },
      {
        id: 'jei-p50', ref: '50', title: t('The general lymphatic system and its two ducts', 'O sistema linfático geral e seus dois ductos'),
        focus: ['jejunum', 'ileum', 'abdominal_aorta_g'], ghost: ['duodenum'], view: 'ant',
        body: [
          t('Peripheral lymphatic capillaries join into progressively larger vessels. Lymph returns to the venous system through two large ducts in the thoracic region. The right lymphatic duct drains the right upper territory, and the thoracic duct drains the remaining territory.',
            'Os capilares linfáticos periféricos se unem em vasos progressivamente maiores. A linfa retorna ao sistema venoso por dois grandes ductos na região torácica. O ducto linfático direito drena o território superior direito, e o ducto torácico drena o território restante.'),
        ],
      },
      {
        id: 'jei-p51', ref: '51', title: t('The thoracic duct and the cisterna chyli', 'O ducto torácico e a cisterna do quilo'),
        focus: ['jejunum', 'ileum', 'abdominal_aorta_g', 'ivc_g'], ghost: ['diaphragm_g'], view: 'ant',
        body: [
          t('Below the diaphragm, near the inferior vena cava, the cisterna chyli receives the intestinal trunk and both lumbar trunks. From there the thoracic duct ascends between the azygos and hemiazygos veins. Along its thoracic course it passes near lymph nodes, the superior intercostal vein, the ribs and the parietal pleura. It empties at the left venous angle between the left internal jugular and left subclavian veins, near the left jugular, subclavian and bronchomediastinal trunks. The right lymphatic duct receives those three trunks on the right side.',
            'Abaixo do diafragma, perto da veia cava inferior, a cisterna do quilo recebe o tronco intestinal e os dois troncos lombares. Dali o ducto torácico sobe entre as veias ázigos e hemiázigos. No tórax, passa perto dos linfonodos, da veia intercostal superior, das costelas e da pleura parietal. Desemboca no ângulo venoso esquerdo, entre as veias jugular interna e subclávia esquerdas, junto aos troncos jugular, subclávio e broncomediastinal esquerdos. O ducto linfático direito recebe esses três troncos do lado direito.'),
        ],
      },
      {
        id: 'jei-p61', ref: '61', title: t('Innervation of the small intestine: sympathetic and parasympathetic supply', 'Inervação do intestino delgado: suprimento simpático e parassimpático'),
        focus: ['celiac_trunk', 'sma', 'jejunum', 'ileum', 'stomach', 'duodenum'], ghost: ['transverse_colon'], view: 'ant',
        body: [
          t('Thoracolumbar sympathetic fibres leave the spinal cord and enter the sympathetic chain. Gray rami communicantes connect the chain to spinal nerves. The greater and lesser splanchnic nerves carry sympathetic fibres toward the celiac and superior mesenteric ganglia. The small intestine receives parasympathetic branches from the vagus nerve (cranial nerve X). Its sympathetic and parasympathetic fibres converge in the celiac and superior mesenteric plexuses. Cranial nerves III, VII and IX carry other cranial parasympathetic pathways. Sacral outflow from S2–S4 supplies lower viscera.',
            'As fibras simpáticas toracolombares saem da medula espinal e entram na cadeia simpática. Os ramos comunicantes cinzentos ligam a cadeia aos nervos espinais. Os nervos esplâncnicos maior e menor levam fibras simpáticas aos gânglios celíaco e mesentérico superior. O intestino delgado recebe ramos parassimpáticos do nervo vago (nervo craniano X). As fibras simpáticas e parassimpáticas convergem nos plexos celíaco e mesentérico superior. Os nervos cranianos III, VII e IX conduzem outras vias parassimpáticas cranianas. A via sacral de S2 a S4 supre as vísceras inferiores.'),
        ],
      },
    ],
    questions: [
      { ref: '48', q: 'In which wall networks is lymph first collected in the intestinal wall?', correct: 'Submucosal plexus, muscular plexus and subserosal collectors', wrong: ['Myenteric and submucosal only', 'Mucosal and lamina propria only', 'Peritoneal and retroperitoneal'], why: 'Lymph collects in the submucosal and muscular plexuses and the subserosal collectors.',
        pt: { q: 'Em quais redes da parede a linfa é recolhida primeiro na parede intestinal?', correct: 'Plexo submucoso, plexo muscular e coletores subserosos', wrong: ['Apenas mioentérico e submucoso', 'Apenas mucosa e lâmina própria', 'Peritoneal e retroperitoneal'], why: 'A linfa se reúne nos plexos submucoso e muscular e nos coletores subserosos.' } },
      { ref: '49', q: 'How many lymph nodes does the small intestine have?', correct: 'About 100–150, the largest group of lymph nodes in the body', wrong: ['About 10', 'About 1000', 'About 20, all in the pelvis'], why: 'The small intestine nodes are the largest group of lymph nodes in the human body, about 100 to 150.',
        pt: { q: 'Quantos linfonodos tem o intestino delgado?', correct: 'Cerca de 100 a 150, o maior grupo de linfonodos do corpo', wrong: ['Cerca de 10', 'Cerca de 1000', 'Cerca de 20, todos na pelve'], why: 'Os linfonodos do intestino delgado são o maior grupo de linfonodos do corpo humano, cerca de 100 a 150.' } },
      { ref: '50', q: 'Through which two large ducts is lymph finally introduced into the venous system?', correct: 'The right lymphatic duct and the thoracic duct', wrong: ['The cisterna chyli and the azygos vein', 'The intestinal trunk and the lumbar trunks', 'The inferior vena cava and the portal vein'], why: 'The two large ducts are the right lymphatic duct and the thoracic duct (the left lymphatic duct).',
        pt: { q: 'Por meio de quais dois grandes ductos a linfa é levada ao sistema venoso?', correct: 'O ducto linfático direito e o ducto torácico', wrong: ['A cisterna do quilo e a veia ázigos', 'O tronco intestinal e os troncos lombares', 'A veia cava inferior e a veia porta'], why: 'Os dois grandes ductos são o ducto linfático direito e o ducto torácico (o linfático esquerdo).' } },
      { ref: '51', q: 'Where does the thoracic duct begin?', correct: 'In the cisterna chyli', wrong: ['In the right lymphatic duct', 'In the azygos vein', 'In the superior vena cava'], why: 'The thoracic duct begins at the cisterna chyli, which receives the intestinal trunk and the lumbar trunks.',
        pt: { q: 'Onde começa o ducto torácico?', correct: 'Na cisterna do quilo', wrong: ['No ducto linfático direito', 'Na veia ázigos', 'Na veia cava superior'], why: 'O ducto torácico começa na cisterna do quilo, que recebe o tronco intestinal e os troncos lombares.' } },
    ],
  },
  {
    id: 'jejunoileum-8', title: t('The gut microbiota', 'A microbiota intestinal'),
    cards: [
      {
        id: 'jei-p52', ref: '52', title: t('The human microbiota: numbers and distribution', 'A microbiota humana: números e distribuição'),
        focus: ['jejunum', 'ileum', 'stomach', 'transverse_colon'], ghost: ['duodenum'], view: 'ant',
        body: [
          t('The estimated ratio is 1.3 microbes per human cell. The body houses 10 to 100 trillion symbiotic bacteria from more than 10,000 species. Their distribution is 30% in the gastrointestinal tract, 26% in the mouth, 21% on the skin, 14% in the airways and 9% in the urogenital tract. Symbiotic bacteria can become pathogenic if they move to a different body site.',
            'A estimativa é de 1,3 micróbio por célula humana. O corpo abriga de 10 a 100 trilhões de bactérias simbiontes de mais de 10.000 espécies. A distribuição é de 30% no trato gastrointestinal, 26% na boca, 21% na pele, 14% nas vias aéreas e 9% no trato urogenital. Bactérias simbiontes podem se tornar patogênicas quando passam para outro local do corpo.'),
          t('In the 3D model, the Jejunum, the Ileum and the Transverse colon are the GI segments placed among the body sites.',
            'No modelo 3D, o Jejuno, o Íleo e o Colo transverso são os segmentos gastrointestinais colocados entre os sítios do corpo.'),
        ],
      },
      {
        id: 'jei-p53', ref: '53', title: t('«We are 90% bacteria»: the density along the tract', '«Somos 90% bactérias»: a densidade ao longo do trato'),
        focus: ['stomach', 'duodenum', 'jejunum', 'ileum', 'transverse_colon'], ghost: ['descending_colon', 'ascending_colon'], view: 'ant',
        body: [
          t('The human body contains an estimated 10¹³–10¹⁴ microbes, most in the gastrointestinal tract, where they can weigh up to 2 kg. The gut contains the densest bacterial ecosystem on the planet. Density increases along the tract. The stomach and duodenum contain 10¹–10² CFU/mL, including lactobacilli, streptococci and yeasts. The jejunum and ileum contain 10⁴–10⁸ CFU/mL, including lactobacilli, coliform bacteria, streptococci, bacteroides, bifidobacteria and fusobacteria. The colon contains 10¹⁰–10¹² CFU/mL, including bacteroides, bifidobacteria, streptococci, eubacteria, fusobacteria, clostridia, veillonella, coliform bacteria, lactobacilli, proteus, staphylococci, pseudomonads, yeasts and protozoa.',
            'O corpo humano contém cerca de 10¹³–10¹⁴ micróbios, a maioria no trato gastrointestinal, onde podem pesar até 2 kg. O intestino abriga o ecossistema bacteriano mais denso do planeta. A densidade aumenta ao longo do trato. O estômago e o duodeno contêm 10¹–10² UFC/mL, incluindo lactobacilos, estreptococos e leveduras. O jejuno e o íleo contêm 10⁴–10⁸ UFC/mL, incluindo lactobacilos, coliformes, estreptococos, bacteroides, bifidobactérias e fusobactérias. O colo contém 10¹⁰–10¹² UFC/mL, incluindo bacteroides, bifidobactérias, estreptococos, eubactérias, fusobactérias, clostrídios, veilonelas, coliformes, lactobacilos, proteus, estafilococos, pseudomonas, leveduras e protozoários.'),
          t('⚠ The estimate of 1.3 microbial cells per human cell (p. 52) conflicts with the claim that 90% of cells are bacterial (p. 53). The jejunal and ileal concentration is 10⁴–10⁸ CFU/mL.',
            '⚠ A estimativa de 1,3 célula microbiana para cada célula humana (p. 52) diverge da afirmação de que 90% das células são bacterianas (p. 53). A concentração no jejuno e no íleo é de 10⁴–10⁸ UFC/mL.'),
        ],
      },
      {
        id: 'jei-p54', ref: '54', title: t('The functions provided by the microbiota', 'As funções fornecidas pela microbiota'),
        focus: ['jejunum', 'ileum', 'transverse_colon', 'stomach'], ghost: ['duodenum'], view: 'ant',
        body: [
          t('The microbial partner provides: enhancement of digestive efficiency and modulation of energy homeostasis; vitamin synthesis; a competitive barrier against external colonisation and invasion; development, education and function of the immune system; strengthening of the GI epithelium and its permeability; detoxification of xenobiotics; modulation of the central nervous system through the gut–brain axis; modulation of the endocrine system; and more. The gut microbiome is said to encode more than 10⁶ genes.',
            'O parceiro microbiano fornece: melhora da eficiência digestiva e modulação da homeostasia energética; síntese de vitaminas; uma barreira competitiva contra a colonização e a invasão externas; desenvolvimento, educação e função do sistema imune; fortalecimento do epitélio do trato gastrointestinal e de sua permeabilidade; desintoxicação de xenobióticos; modulação do sistema nervoso central pelo eixo intestino–cérebro; modulação do sistema endócrino; e muito mais. Diz-se que o microbioma intestinal codifica mais de 10⁶ genes.'),
        ],
      },
      {
        id: 'jei-p55', ref: '55', title: t('Diet and the microbiota: SCFAs from fermented fibre', 'A dieta e a microbiota: AGCC da fibra fermentada'),
        focus: ['transverse_colon', 'jejunum', 'ileum'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Diet shapes the gut microbiota. The broad microbial glycobiome complements the more limited human glycobiome and allows the host and microbes together to metabolise complex polysaccharides. Adult microbiota adapt to many indigestible dietary and host substrates. With a diet rich in plant fibre and low in animal fat and protein, fermentation of indigestible polysaccharides yields acetate, propionate and butyrate. These short-chain fatty acids (SCFAs) affect the host in several ways. This diet is associated with more mucus, methane, lower luminal pH, the gut hormones PYY and GLP-1, lower blood glucose, higher energy expenditure and more insulin secretion. With a diet high in animal fat and protein and low in plant fibre, microbial proteolysis of sulfur, aromatic and other amino acids yields hydrogen sulfide, ammonia, amines, phenylacetate, p-cresol, phenylpropionate, indole derivatives, acetaldehyde, BCFAs, TMAO and LPS. This pattern is associated with less mucus, higher luminal pH, higher blood glucose and metabolic endotoxaemia.',
            'A dieta molda a microbiota intestinal. O amplo glicobioma microbiano complementa o glicobioma humano, mais limitado, e permite que hospedeiro e micróbios metabolizem juntos polissacarídeos complexos. A microbiota adulta se adapta a muitos substratos não digeríveis da dieta e do hospedeiro. Numa dieta rica em fibras vegetais e pobre em gordura e proteína animal, a fermentação de polissacarídeos não digeríveis produz acetato, propionato e butirato. Esses ácidos graxos de cadeia curta (AGCC) afetam o hospedeiro de várias maneiras. Essa dieta se associa a mais muco e metano, pH luminal mais baixo, hormônios intestinais PYY e GLP-1, menor glicemia, maior gasto energético e mais secreção de insulina. Numa dieta rica em gordura e proteína animal e pobre em fibras vegetais, a proteólise microbiana de aminoácidos sulfurados, aromáticos e outros produz sulfeto de hidrogênio, amônia, aminas, fenilacetato, p-cresol, fenilpropionato, derivados indólicos, acetaldeído, ácidos graxos de cadeia ramificada (BCFAs), TMAO e LPS. Esse padrão se associa a menos muco, pH luminal mais alto, maior glicemia e endotoxemia metabólica.'),
        ],
      },
      {
        id: 'jei-p56', ref: '56', title: t('The gut microbiome-host axis: end-products and their effects', 'O eixo microbioma–hospedeiro: produtos finais e seus efeitos'),
        focus: ['transverse_colon', 'jejunum', 'ileum'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The gut microbiome ferments dietary substrates into acetate, propionate and butyrate. These products are linked to energy storage, immune regulation and energy supply. The microbiome also generates vitamins such as folic acid and riboflavin for nutrition and indolic compounds such as indole for immune regulation. Neurotransmitters such as GABA, dopamine, serotonin and noradrenaline can modulate behaviour, including reductions in anxiety and depression. Urolithin and equol are phytoestrogens linked to anticarcinogenic activity.',
            'O microbioma intestinal fermenta substratos da dieta e produz acetato, propionato e butirato. Esses produtos estão ligados ao armazenamento e ao fornecimento de energia e à regulação imune. O microbioma também gera vitaminas como ácido fólico e riboflavina para a nutrição e compostos indólicos como o indol para a regulação imune. Neurotransmissores como GABA, dopamina, serotonina e noradrenalina podem modular o comportamento, inclusive reduzindo ansiedade e depressão. A urolitina e o equol são fitoestrógenos associados à atividade anticarcinogênica.'),
        ],
      },
      {
        id: 'jei-p57', ref: '57', title: t('The microbiota in health and in disease', 'A microbiota na saúde e na doença'),
        focus: ['jejunum', 'ileum', 'transverse_colon'], ghost: ['stomach'], view: 'ant',
        body: [
          t('In health, microbial antigens and metabolites such as SCFAs support the epithelial barrier, mucin secretion and immune tolerance. Mucin and antimicrobial peptides protect the barrier. Regulatory T cells (Treg) and anti-inflammatory cytokines support tolerance. Changes in microbiota can favour conversion to pathobionts and extensive colonisation. If the barrier breaks down, bacteria and components such as LPS can pass beyond the lumen. Effector T cells (Teff), macrophages and proinflammatory cytokines participate in chronic inflammation.',
            'Na saúde, antígenos e metabólitos microbianos, como os AGCC, sustentam a barreira epitelial, a secreção de mucina e a tolerância imunológica. A mucina e os peptídeos antimicrobianos protegem a barreira. As células T reguladoras (Treg) e as citocinas anti-inflamatórias favorecem a tolerância. Alterações da microbiota podem favorecer a conversão em patobiontes e a colonização intensa. Se a barreira se rompe, bactérias e componentes como o LPS podem passar para fora da luz. Células T efetoras (Teff), macrófagos e citocinas pró-inflamatórias participam da inflamação crônica.'),
        ],
      },
      {
        id: 'jei-p58', ref: '58', title: t('Dysbiosis and the diseases linked to it', 'Disbiose e as doenças a ela ligadas'),
        focus: ['jejunum', 'ileum', 'transverse_colon', 'rectum'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Dysbiosis is a persistent, dysfunctional change in the gut microbiota. Eubiosis is the balanced state. Dysbiosis is linked to Crohn’s disease, ulcerative colitis, cirrhosis, hepatitis and lung, colorectal, pancreatic and oral cancers. Other links include hypertension, atherosclerosis, asthma, bronchitis, chronic kidney disease, type 1, type 2 and gestational diabetes, Parkinson’s disease, Alzheimer’s disease and depression. Metabolites and signals in this context include vitamins, SCFAs, LPS and inflammatory cytokines such as IL-6 and TNF-α.',
            'A disbiose é uma alteração persistente e disfuncional da microbiota intestinal. A eubiose é o estado de equilíbrio. A disbiose está ligada à doença de Crohn, à retocolite ulcerativa, à cirrose, à hepatite e aos cânceres de pulmão, colorretal, pancreático e oral. Outras associações incluem hipertensão, aterosclerose, asma, bronquite, doença renal crônica, diabetes tipos 1 e 2 e gestacional, doença de Parkinson, doença de Alzheimer e depressão. Entre os metabólitos e sinais desse contexto estão vitaminas, AGCC, LPS e citocinas inflamatórias como IL-6 e TNF-α.'),
        ],
      },
      {
        id: 'jei-p59', ref: '59', title: t('Clinical trials and microbiota-targeted treatments', 'Ensaios clínicos e tratamentos voltados à microbiota'),
        focus: ['jejunum', 'ileum', 'transverse_colon'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Clinical trials involving the gut microbiota are increasing. The microbiota can influence treatment response, although its role is only partly understood. Microbiota-targeted treatments are expected to become more common alongside conventional drugs. Trial counts include 1,332 in Europe, 853 in North America, 662 in Asia, 69 in South America, 56 in Africa and 13 in the Pacific region. Trials range from early phase 1 to phase 4 and study allergy, cancer, diabetes-related conditions, C. difficile infection, heart disease, HIV, inflammatory bowel disorders, cirrhosis, mental and neurological disorders, obesity, other bowel disorders, other infections and other inflammatory conditions. Response and nonresponse counts are 331 and 210 in inflammatory bowel disorders, 92 and 25 in C. difficile infection, and 315 and 124 in cancer.',
            'Os ensaios clínicos envolvendo a microbiota intestinal estão aumentando. A microbiota pode influenciar a resposta ao tratamento, embora seu papel seja compreendido só em parte. Espera-se que tratamentos voltados à microbiota se tornem mais comuns ao lado dos medicamentos convencionais. As contagens incluem 1.332 ensaios na Europa, 853 na América do Norte, 662 na Ásia, 69 na América do Sul, 56 na África e 13 no Pacífico. Os ensaios vão da fase 1 inicial à fase 4 e estudam alergia, câncer, condições ligadas ao diabetes, infecção por C. difficile, doença cardíaca, HIV, distúrbios inflamatórios intestinais, cirrose, transtornos mentais e neurológicos, obesidade, outros distúrbios intestinais, outras infecções e outras condições inflamatórias. As contagens de resposta e ausência de resposta são, respectivamente, 331 e 210 nos distúrbios inflamatórios intestinais, 92 e 25 na infecção por C. difficile e 315 e 124 no câncer.'),
        ],
      },
      {
        id: 'jei-p60', ref: '60', title: t('How the microbiota is manipulated: prebiotics, probiotics, transplantation and phage therapy', 'Como a microbiota é manipulada: prebióticos, probióticos, transplante e terapia com fagos'),
        focus: ['jejunum', 'ileum', 'transverse_colon'], ghost: ['stomach'], view: 'ant',
        body: [
          t('Prebiotics are fermentable foods and their derivatives that favour the growth of microbial populations associated with health. Probiotic supplements introduce a few million CFUs into an ecosystem of more than a billion CFUs. Higher-impact treatments include faecal microbiota transplantation, used in Bologna, and targeted approaches such as phage therapy and engineered probiotics.',
            'Prebióticos são alimentos fermentáveis e seus derivados que favorecem o crescimento de populações microbianas associadas à saúde. Suplementos probióticos introduzem poucos milhões de UFC em um ecossistema com mais de um bilhão de UFC. Entre os tratamentos de maior impacto estão o transplante de microbiota fecal, usado em Bolonha, e abordagens direcionadas como a terapia com fagos e os probióticos geneticamente modificados.'),
        ],
      },
    ],
    questions: [
      { ref: '52', q: 'What is the estimated ratio of microbes to human cells?', correct: '1.3:1', wrong: ['1:1.3', '10:1', '1:10'], why: 'It is estimated that the ratio of microbes to human cells is 1.3:1.',
        pt: { q: 'Qual é a razão estimada de micróbios para células humanas?', correct: '1,3:1', wrong: ['1:1,3', '10:1', '1:10'], why: 'Estima-se que a razão de micróbios para células humanas seja 1,3:1.' } },
      { ref: '53', q: 'What do the jejunum and ileum harbour, according to the counts?', correct: '10⁴–10⁸ CFU/mL', wrong: ['10¹–10² CFU/mL', '10¹⁰–10¹² CFU/mL', '10¹³–10¹⁴ CFU/mL'], why: 'Jejunum and ileum 10⁴–10⁸ CFU/mL; stomach and duodenum 10¹–10²; colon 10¹⁰–10¹².',
        pt: { q: 'Quanto o jejuno e o íleo abrigam, segundo as contagens do material da aula?', correct: '10⁴–10⁸ UFC/mL', wrong: ['10¹–10² UFC/mL', '10¹⁰–10¹² UFC/mL', '10¹³–10¹⁴ UFC/mL'], why: 'Jejuno e íleo 10⁴–10⁸ UFC/mL; estômago e duodeno 10¹–10²; colo 10¹⁰–10¹².' } },
      { ref: '55', q: 'Which products of fermenting indigestible fibre are named first?', correct: 'Short-chain fatty acids (SCFAs), such as acetate, propionate and butyrate', wrong: ['Lactic acid and ethanol', 'Bile salts and cholesterol', 'Hydrochloric acid and pepsin'], why: 'Indigestible dietary sources are fermented into SCFAs, which have broad effects on the host.',
        pt: { q: 'Quais produtos da fermentação de fibra não digerível são citados primeiro?', correct: 'Ácidos graxos de cadeia curta (AGCC), como acetato, propionato e butirato', wrong: ['Ácido láctico e etanol', 'Sais biliares e colesterol', 'Ácido clorídrico e pepsina'], why: 'Fontes não digeríveis são fermentadas em AGCC, com efeitos amplos no hospedeiro.' } },
      { ref: '58', q: 'What is the name for the persistent and dysfunctional alteration of the gut microbiota?', correct: 'Dysbiosis (the opposite of eubiosis)', wrong: ['Eubiosis', 'Symbiosis', 'Prebiosis'], why: 'The persistent and dysfunctional alteration of the gut microbiota is called dysbiosis, the opposite of eubiosis.',
        pt: { q: 'Como se chama a alteração persistente e disfuncional da microbiota intestinal?', correct: 'Disbiose (o oposto da eubiose)', wrong: ['Eubiose', 'Simbiose', 'Prebiose'], why: 'A alteração persistente e disfuncional da microbiota intestinal é chamada de disbiose, o oposto da eubiose.' } },
      { ref: '60', q: 'Which treatment is called a higher-impact option than probiotics?', correct: 'Faecal microbiota transplantation', wrong: ['Taking a daily probiotic supplement', 'Eating fermentable foods only', 'Drinking more water'], why: 'Higher-impact treatments include faecal microbiota transplantation, phage therapy and engineered probiotics; probiotics introduce few CFUs.',
        pt: { q: 'Qual tratamento é chamado de opção de maior impacto que os probióticos?', correct: 'Transplante de microbiota fecal', wrong: ['Tomar um suplemento probiótico diário', 'Comer apenas alimentos fermentáveis', 'Beber mais água'], why: 'Os tratamentos de maior impacto incluem o transplante de microbiota fecal, a terapia com fagos e os probióticos geneticamente modificados.' } },
    ],
  },
];

blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
