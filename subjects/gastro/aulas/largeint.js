// SpeedGastro · Aula 10 — Large intestine (Prof. Fiume deck 10_large_intestine, p001–p053).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/largeint.js?v=159';

export const unit = {
  id: 'largeint',
  label: t('10 · Large intestine', '10 · Intestino grosso'),
  visible: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum', 'duodenum', 'pancreas', 'abdominal_aorta_g', 'sma', 'imv', 'taeniae_coli', 'ileocecal_junction', 'appendix', 'ileum', 'appendicular_a', 'ileocolic_a', 'mesoappendix', 'gallbladder', 'hepatic_portal_v', 'spleen', 'smv', 'sigmoid_a', 'superior_rectal_a', 'celiac_trunk', 'ima', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'pancreaticoduodenal_a', 'splenic_v', 'gastric_v', 'jejunum', 'stomach', 'ivc_g', 'caudate_lobe', 'diaphragm_g'],
  ghost: ['ileum', 'jejunum', 'stomach', 'pancreas', 'duodenum', 'ivc_g', 'hepatic_portal_v', 'spleen', 'appendix', 'ileocecal_junction', 'rectum', 'taeniae_coli', 'ascending_colon', 'transverse_colon', 'caudate_lobe', 'gallbladder', 'diaphragm_g', 'ima', 'descending_colon', 'sigmoid_a', 'ileocolic_a', 'right_colic_a', 'appendicular_a', 'sma'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'largeint-1', title: t('Overview, functions and peritoneum', 'Visão geral, funções e peritônio'),
    cards: [
      {
        id: 'largeint-p01', ref: '1', title: t('Where the large intestine runs', 'Onde fica o intestino grosso'),
        focus: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum'], ghost: ['ileum', 'jejunum'], view: 'ant',
        body: [
          t('The large intestine extends from the ileocecal valve to the anal orifice. It is 1–1.8 m long and forms a horseshoe-shaped frame around the small intestine.',
            'O intestino grosso estende-se da válvula ileocecal ao orifício anal. Mede 1–1,8 m e forma uma moldura em ferradura ao redor do intestino delgado.'),
          t('The cecum lies in the right iliac fossa. The ascending colon rises to the right colic flexure; the transverse colon crosses to the left colic flexure. The descending colon runs to the sigmoid colon in the left lower quadrant, and the rectum continues into the anal canal.',
            'O ceco fica na fossa ilíaca direita. O colo ascendente sobe até a flexura cólica direita; o colo transverso atravessa até a flexura cólica esquerda. O colo descendente segue ao sigmoide no quadrante inferior esquerdo, e o reto continua no canal anal.'),
        ],
      },
      {
        id: 'largeint-p02', ref: '2', title: t('Functions of the large intestine', 'Funções do intestino grosso'),
        focus: ['ascending_colon', 'transverse_colon', 'descending_colon', 'rectum'], view: 'ant',
        body: [
          t('The large intestine has three functions. First, it reabsorbs water and electrolytes, and compacts the intestinal contents into faeces. Second, it absorbs important vitamins that are produced by bacterial action, since the bacteria release vitamins and digest materials. Third, it stores faecal material before defecation. The second item is printed as «Adsorption», but the sentence is about vitamins being taken up, so it means absorption.',
            'O intestino grosso tem três funções. Primeiro, reabsorve água e eletrólitos e compacta o conteúdo intestinal até formar as fezes. Segundo, absorve vitaminas importantes produzidas pela ação bacteriana, já que as bactérias liberam vitaminas e digerem materiais. Terceiro, armazena o material fecal antes da defecação. O segundo item está impresso como «Adsorption», mas a frase trata de vitaminas sendo captadas, então significa absorção.'),
          t('Read the three functions as a sequence. Water and salts are taken back first, which is why the contents become firmer along the colon. The vitamins made by the bacteria are then taken up. What remains is stored until it is passed out. The stored material is the faecal mass that leaves through the anal canal.',
            'Leia as três funções como uma sequência. Primeiro a água e os sais são recuperados, e por isso o conteúdo fica mais firme ao longo do colo. Depois as vitaminas produzidas pelas bactérias são captadas. O que sobra fica armazenado até ser eliminado. O material armazenado é a massa fecal que sai pelo canal anal.'),
        ],
      },
      {
        id: 'largeint-p03', ref: '3', title: t('Colon segments and peritoneal relations', 'Segmentos do colo e relações peritoneais'),
        focus: ['ascending_colon', 'transverse_colon', 'descending_colon'], ghost: ['stomach', 'pancreas', 'duodenum', 'jejunum', 'ileum'], view: 'ant',
        body: [
          t('The colon is divided into four segments, and each one has a defined relation to the peritoneum. (1) The ascending colon starts in the right iliac fossa and goes up to the right colic flexure; it is retroperitoneal. (2) The transverse colon runs from the right colic flexure to the left colic flexure; it is intraperitoneal and joins the posterior wall through the transverse mesocolon. The greater omentum adheres to the upper surface of that mesocolon. (3) The descending colon runs to the left iliac fossa and is retroperitoneal. (4) The sigmoid colon runs from the sigmoid flexure to the rectum and is intraperitoneal.',
            'O colo se divide em quatro segmentos, e cada um tem uma relação definida com o peritônio. (1) O colo ascendente começa na fossa ilíaca direita e sobe até a flexura cólica direita; é retroperitoneal. (2) O colo transverso vai da flexura cólica direita até a flexura cólica esquerda; é intraperitoneal e se prende à parede posterior pelo mesocolo transverso. O omento maior adere à superfície superior desse mesocolo. (3) O colo descendente vai até a fossa ilíaca esquerda e é retroperitoneal. (4) O colo sigmoide vai da flexura sigmoide até o reto e é intraperitoneal.'),
          t('The ascending and descending mesocolons fuse with parietal peritoneum, fixing those colons against the posterior wall. The jejunum and ileum retain their mesentery. The transverse and sigmoid colon remain suspended by mesocolons. The greater omentum descends from the stomach below the omental bursa and fuses with the transverse mesocolon, forming the gastrocolic ligament. The pancreas and duodenum lie retroperitoneally.',
            'Os mesocolos ascendente e descendente fundem-se ao peritônio parietal, fixando esses colos à parede posterior. O jejuno e o íleo mantêm seu mesentério. Os colos transverso e sigmoide permanecem suspensos por mesocolos. O omento maior desce do estômago abaixo da bolsa omental e se funde ao mesocolo transverso, formando o ligamento gastrocólico. O pâncreas e o duodeno ficam retroperitoneais.'),
        ],
      },
      {
        id: 'largeint-p04', ref: '4', title: t('The posterior wall and retroperitoneal structures', 'A parede posterior e as estruturas retroperitoneais'),
        focus: ['ascending_colon', 'descending_colon', 'duodenum', 'pancreas', 'abdominal_aorta_g', 'sma', 'imv', 'rectum'], ghost: ['ivc_g', 'hepatic_portal_v', 'spleen'], view: 'ant',
        body: [
          t('The ascending and descending colon attach to the posterior wall on the right and left, respectively. The left colic artery and vein lie near the descending colon. The duodenum curves around the pancreatic head; the superior mesenteric artery and vein lie in front of the aorta, and the inferior mesenteric artery lies to the left.',
            'Os colos ascendente e descendente fixam-se à parede posterior à direita e à esquerda, respectivamente. A artéria e veia cólicas esquerdas ficam perto do colo descendente. O duodeno contorna a cabeça pancreática; a artéria e veia mesentéricas superiores ficam à frente da aorta, e a artéria mesentérica inferior fica à esquerda.'),
          t('Around the pancreas (head, body and tail) and the four parts of the duodenum (superior, descending, horizontal and ascending), the upper bed exposes the diaphragm (hepatic surface), the inferior vena cava with the hepatic veins, the hepatoduodenal ligament (carrying the portal vein, hepatic artery and bile duct), the cardiac orifice of the stomach, the gastrosplenic ligament, the splenic artery and vein, and both suprarenal glands and kidneys. Laterally, the transversus abdominis and internal and external oblique muscles border the paracolic gutter and the ascending and descending colon attachments; below, the mesenteric root, mesoappendix, right common iliac vessels, both ureters and external iliac artery frame the sigmoid mesocolon descending toward the rectum.',
            'Ao redor do pâncreas (cabeça, corpo e cauda) e das quatro partes do duodeno (superior, descendente, horizontal e ascendente), o leito superior expõe o diafragma (face hepática), a veia cava inferior com as veias hepáticas, o ligamento hepatoduodenal (com a veia porta, a artéria hepática e o ducto colédoco/biliar), o óstio cárdico do estômago, o ligamento gastroesplênico, a artéria e a veia esplênicas e ambas as glândulas suprarrenais e rins. Lateralmente, o transverso do abdome e os oblíquos interno e externo delimitam a goteira paracólica e as fixações dos colos ascendente e descendente; embaixo, a raiz do mesentério, o mesoapêndice, os vasos ilíacos comuns direitos, ambos os ureteres e a artéria ilíaca externa emolduram o mesocolo sigmoide descendo até o reto.'),
          t('The colon attachments relate to the duodenum, pancreas, aorta, mesenteric vessels, hepatic portal vein, inferior vena cava and spleen.',
            'As fixações do colo relacionam-se com duodeno, pâncreas, aorta, vasos mesentéricos, veia porta hepática, veia cava inferior e baço.'),
        ],
      },
      {
        id: 'largeint-p05', ref: '5', title: t('Large versus small intestine, and the serosa', 'Intestino grosso versus delgado, e a serosa'),
        focus: ['ascending_colon', 'transverse_colon', 'descending_colon', 'taeniae_coli'], ghost: ['ileum', 'appendix'], view: 'ant',
        body: [
          t('The large intestine is compared with the small intestine. It has a wider circumference: 28 cm in the ascending part, gradually reduced to 14 cm in the descending part, and enlarged again in the rectum to 17–19 cm. It is also shorter, less motile, and different in both its external and its internal appearance. The wall is then described in layers, beginning with the serosa.',
            'O intestino grosso é comparado ao delgado. Tem circunferência maior: 28 cm na parte ascendente, reduzindo gradualmente para 14 cm na parte descendente, e aumentando de novo no reto para 17–19 cm. Ele também é mais curto, menos móvel e diferente tanto na aparência externa quanto na interna. Em seguida a parede é descrita em camadas, começando pela serosa.'),
          t('Omental appendices are small teardrop-shaped peritoneal sacs containing fat. They hang from the outer surface of the colon. The greater omentum, haustra, mesocolon, colic flexures and sigmoid mesocolon relate to the colon.',
            'Os apêndices omentais são pequenos sacos peritoneais em forma de gota que contêm gordura. Pendem da superfície externa do colo. O omento maior, as haustrações, o mesocolo, as flexuras cólicas e o mesocolo sigmoide relacionam-se com o colo.'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Where does the large intestine start and end?', correct: 'From the ileocaecal valve to the anal orifice', wrong: ['From the pylorus to the anal orifice', 'From the duodenum to the rectum', 'From the ileocaecal valve to the duodenum'], why: 'It starts at the ileocaecal valve and terminates at the anal orifice.',
        pt: { q: 'Onde começa e onde termina o intestino grosso?', correct: 'Da valva ileocecal ao orifício anal', wrong: ['Do piloro ao orifício anal', 'Do duodeno ao reto', 'Da valva ileocecal ao duodeno'], why: 'Começa na valva ileocecal e termina no orifício anal.' } },
      { ref: '1', q: 'What shape is given to the large intestine?', correct: 'Horseshoe-shaped, framing the small intestine', wrong: ['A straight tube in the midline', 'A spiral wrapped around the aorta', 'A ring around the liver'], why: 'Horseshoe-shaped, forming an almost complete frame around the small intestine.',
        pt: { q: 'Que forma é dada ao intestino grosso?', correct: 'Em forma de ferradura, emoldurando o intestino delgado', wrong: ['Um tubo reto no plano mediano', 'Uma espiral enrolada na aorta', 'Um anel ao redor do fígado'], why: 'Em forma de ferradura, formando uma moldura quase completa em torno do intestino delgado.' } },
      { ref: '2', q: 'Which process turns the contents of the large intestine into faeces?', correct: 'Reabsorption of water and electrolytes, with compaction', wrong: ['Digestion of proteins by pepsin', 'Secretion of intrinsic factor', 'Mechanical breakdown of solid food'], why: 'Reabsorbs water and electrolytes and compacts the contents into faeces.',
        pt: { q: 'Qual processo transforma o conteúdo do intestino grosso em fezes?', correct: 'Reabsorção de água e eletrólitos, com compactação', wrong: ['Digestão de proteínas pela pepsina', 'Secreção de fator intrínseco', 'Quebra mecânica do alimento sólido'], why: 'Reabsorve água e eletrólitos e compacta o conteúdo em fezes.' } },
      { ref: '3', q: 'What fixes the transverse colon to the posterior wall?', correct: 'The transverse mesocolon', wrong: ['The greater omentum', 'The mesoappendix', 'The mesentery of the small intestine'], why: 'The transverse colon joins the posterior peritoneal wall by the transverse mesocolon; the greater omentum adheres to the mesocolon’s upper surface.',
        pt: { q: 'O que prende o colo transverso à parede posterior?', correct: 'O mesocolo transverso', wrong: ['O omento maior', 'O mesoapêndice', 'O mesentério do intestino delgado'], why: 'O colo transverso se une à parede peritoneal posterior pelo mesocolo transverso; o omento maior adere à superfície superior desse mesocolo.' } },
      { ref: '3', q: 'Which colon segments are retroperitoneal?', correct: 'The ascending and the descending colon', wrong: ['The transverse and the sigmoid colon', 'The sigmoid colon only', 'The transverse colon only'], why: 'Ascending and descending colon are retroperitoneal; transverse and sigmoid are intraperitoneal.',
        pt: { q: 'Quais segmentos do colo são retroperitoneais?', correct: 'O colo ascendente e o descendente', wrong: ['O colo transverso e o sigmoide', 'Só o colo sigmoide', 'Só o colo transverso'], why: 'Ascendente e descendente são retroperitoneais; transverso e sigmoide são intraperitoneais.' } },
      { ref: '5', q: 'What does the class material say about the omental appendices?', correct: 'Fat-containing peritoneal projections found only on the colon', wrong: ['Muscle ribbons that run along the colon', 'Folds of the mucosa between the haustra', 'Lymph nodes along the mesocolon'], why: 'Small projections of peritoneum containing fat hanging from the outside surface (only colon).',
        pt: { q: 'O que o material da aula diz sobre os apêndices omentais?', correct: 'Projeções do peritônio com gordura, encontradas apenas no colo', wrong: ['Faixas musculares que correm ao longo do colo', 'Pregas da mucosa entre os haustros', 'Linfonodos ao longo do mesocolo'], why: 'Pequenas projeções do peritônio contendo gordura, pendendo da superfície externa (só no colo).' } },
    ],
  },
  {
    id: 'largeint-2', title: t('Wall of the colon: taeniae, haustra and mucosa', 'Parede do colo: tênias, haustros e mucosa'),
    cards: [
      {
        id: 'largeint-p06', ref: '6', title: t('The three taeniae coli', 'As três tênias do colo'),
        focus: ['taeniae_coli', 'transverse_colon', 'ascending_colon', 'descending_colon'], view: 'ant',
        body: [
          t('The second layer, the muscularis externa, is arranged as three separate longitudinal ribbons called taeniae coli. (1) The mesocolic taenia, on the posteromedial or posterior side, is where the transverse and sigmoid mesocolon attach. (2) The omental taenia, on the posterolateral or superior side, is where the omental appendices attach. (3) The free taenia, on the anterior or inferior side, has neither the mesocolon nor the appendices attached, and it can be followed along the surface of the colon.',
            'A segunda camada, a muscular externa, é organizada em três faixas longitudinais separadas chamadas tênias do colo. (1) A tênia mesocólica, no lado posteromedial ou posterior, é onde se prendem o mesocolo transverso e o sigmoide. (2) A tênia omental, no lado posterolateral ou superior, é onde se prendem os apêndices omentais. (3) A tênia livre, no lado anterior ou inferior, não tem mesocolo nem apêndices presos, e pode ser seguida ao longo da superfície do colo.'),
          t('The mesocolic, omental and free taeniae run along the colon. Omental appendices attach to the omental taenia. The transverse mesocolon connects the colon to the posterior wall; the greater omentum descends from the stomach.',
            'As tênias mesocólica, omental e livre percorrem o colo. Os apêndices omentais fixam-se à tênia omental. O mesocolo transverso liga o colo à parede posterior; o omento maior desce do estômago.'),
        ],
      },
      {
        id: 'largeint-p07', ref: '7', title: t('Colon overview: haustra, semilunar folds and marginal artery', 'Visão geral do colo: haustros, pregas semilunares e artéria marginal'),
        focus: ['taeniae_coli', 'transverse_colon', 'ascending_colon', 'descending_colon', 'rectum', 'ileocecal_junction', 'appendix'], ghost: ['ileum'], view: 'ant',
        body: [
          t('The ascending colon reaches the right colic flexure, continues as transverse colon to the left colic flexure, and then as descending and sigmoid colon to the rectum and anal canal. The external anal sphincter surrounds the canal. The ileum opens into the cecum at the ileal orifice; the vermiform appendix extends from the cecum. Haustra are separated internally by semilunar folds.',
            'O colo ascendente chega à flexura cólica direita, continua como colo transverso até a flexura cólica esquerda e depois como colos descendente e sigmoide até o reto e canal anal. O esfíncter anal externo envolve o canal. O íleo abre-se no ceco pelo orifício ileal; o apêndice vermiforme parte do ceco. As haustrações são separadas internamente por pregas semilunares.'),
          t('The mesocolic and omental taeniae lie in the outer muscular layer. Omental appendices project from the serosa, the marginal artery runs beside the colon and mucosa lines its lumen.',
            'As tênias mesocólica e omental ficam na camada muscular externa. Os apêndices omentais projetam-se da serosa, a artéria marginal corre junto ao colo e a mucosa reveste seu lúmen.'),
        ],
      },
      {
        id: 'largeint-p08', ref: '8', title: t('Haustra: mucosa and submucosa', 'Haustros: mucosa e submucosa'),
        focus: ['transverse_colon', 'ascending_colon', 'descending_colon', 'taeniae_coli'], ghost: ['ileocecal_junction', 'appendix', 'rectum'], view: 'ant',
        body: [
          t('Layers 3 and 4 are the mucosa and submucosa, and the key point is that the haustra «define the lumen into separate compartments when muscles contract». The haustra are pouches of the colon wall. When the taeniae pull, the wall bulges between them, and the lumen is divided into compartments. The semilunar folds of the mucosa sit between the haustra.',
            'As camadas 3 e 4 são a mucosa e a submucosa, e o ponto-chave é que os haustros «definem o lúmen em compartimentos separados quando os músculos se contraem». Os haustros são bolsas da parede do colo. Quando as tênias puxam, a parede se abaula entre elas, e o lúmen fica dividido em compartimentos. As pregas semilunares da mucosa ficam entre os haustros.'),
          t('Semilunar folds separate the haustral compartments. The ileocecal orifice contains the ileal papilla, its frenulum and the superior and inferior lips of the ileocecal labrum. The appendix has a mesoappendix carrying the appendicular artery; the mesentery carries the anterior cecal artery. The descending and sigmoid colon have taeniae, haustra, semilunar folds and epiploic appendices. The greater omentum, transverse and sigmoid mesocolons and the peritoneal reflection on the rectum are related folds.',
            'As pregas semilunares separam os compartimentos haustrais. O orifício ileocecal contém a papila ileal, seu frênulo e os lábios superior e inferior do lábio ileocecal. O apêndice tem um mesoapêndice que conduz a artéria apendicular; o mesentério conduz a artéria cecal anterior. Os colos descendente e sigmoide têm tênias, haustrações, pregas semilunares e apêndices epiploicos. O omento maior, os mesocolos transverso e sigmoide e a reflexão peritoneal no reto são pregas relacionadas.'),
        ],
      },
      {
        id: 'largeint-p09', ref: '9–10', title: t('Haustration and peristalsis', 'Haustração e peristaltismo'),
        focus: ['transverse_colon', 'taeniae_coli'], view: 'ant',
        body: [
          t('Two movements are contrasted. Peristalsis is a wave that propels material along the tract through coordinated contraction of the circular and longitudinal layers: the circular muscle contracts behind the bolus, and the longitudinal muscle contracts ahead of it. Segmentation movements mainly involve the circular muscle layers. They churn and mix the contents, but they produce no net movement in one particular direction.',
            'São contrastados dois movimentos. O peristaltismo é uma onda que empurra o conteúdo ao longo do trato por contrações coordenadas das camadas circular e longitudinal: o músculo circular se contrai atrás do bolo, e o longitudinal se contrai à frente dele. Os movimentos de segmentação envolvem principalmente as camadas musculares circulares. Eles misturam e revolvem o conteúdo, mas não produzem deslocamento líquido em nenhuma direção específica.'),
          t('During peristalsis the circular muscle contracts behind the bolus and the longitudinal muscle contracts ahead of it. The transverse colon has semilunar folds and haustra.',
            'Na peristalse, o músculo circular contrai-se atrás do bolo e o longitudinal à sua frente. O colo transverso tem pregas semilunares e haustrações.'),
        ],
      },
      {
        id: 'largeint-p11', ref: '11–13', title: t('Mucosa and musculature of the large intestine', 'Mucosa e musculatura do intestino grosso'),
        focus: ['transverse_colon'], ghost: ['taeniae_coli'], contextOnly: true, view: 'ant',
        body: [
          t('The large intestine differs from the small intestine in the mucosa. It has no plicae circulares and no villi, which are typical of the small intestine. Goblet cells are much more abundant. Its intestinal crypts are distinctive: they are deeper than those of the small intestine and dominated by goblet cells. Large lymphoid nodules are scattered through the lamina propria and extend into the submucosa. The muscularis externa has taeniae.',
            'O intestino grosso difere do delgado na mucosa. Ele não tem pregas circulares nem vilosidades, que são típicas do intestino delgado. As células caliciformes são muito mais abundantes. Suas criptas intestinais são características: são mais profundas do que as do intestino delgado e dominadas por células caliciformes. Nódulos linfoides grandes estão espalhados pela lâmina própria e se estendem até a submucosa. A muscular externa tem tênias.'),
          t('The mucosal epithelium is simple columnar and absorptive, with shorter microvilli than enterocytes and many goblet cells. The anal canal has stratified squamous epithelium, keratinised near the anal orifice. The lamina propria is connective tissue rich in lymphoid tissue. The mucosa has no villi but forms semilunar folds between haustra.',
            'O epitélio da mucosa é simples colunar e absortivo, com microvilosidades mais curtas que as dos enterócitos e muitas células caliciformes. O canal anal tem epitélio estratificado pavimentoso, queratinizado perto do orifício anal. A lâmina própria é tecido conjuntivo rico em tecido linfoide. A mucosa não tem vilosidades, mas forma pregas semilunares entre as haustrações.'),
          t('This dissection of the mucosa and musculature of the large intestine has the peritoneum cut away and the taeniae exposed with a hook. It shows the free, omental and mesocolic taeniae on the ascending, transverse, descending and sigmoid parts. At the rectosigmoid junction, the taeniae spread out and unite to form a continuous longitudinal muscle layer. The lower part shows the levator ani and the external anal sphincter next to the rectum.',
            'Esta dissecção da mucosa e da musculatura do intestino grosso tem o peritônio retirado e as tênias expostas com um gancho. Mostra as tênias livre, omental e mesocólica nas partes ascendente, transversa, descendente e sigmoide. Na junção retossigmoide, as tênias se abrem e se unem para formar uma camada muscular longitudinal contínua. A parte inferior mostra o músculo elevador do ânus e o esfíncter anal externo ao lado do reto.'),
        ],
      },
    ],
    questions: [
      { ref: '11', q: 'Which typical small-intestine feature is absent in the large intestine?', correct: 'Plicae circulares and villi', wrong: ['Goblet cells', 'Lymphoid nodules', 'Taeniae'], why: 'The large intestine lacks plicae circulares and villi, typical of the small intestine; its goblet cells are much more abundant.',
        pt: { q: 'Qual característica típica do intestino delgado está ausente no intestino grosso?', correct: 'Pregas circulares e vilosidades', wrong: ['Células caliciformes', 'Nódulos linfoides', 'Tênias'], why: 'O intestino grosso não tem pregas circulares nem vilosidades, típicas do intestino delgado; suas células caliciformes são muito mais abundantes.' } },
      { ref: '11', q: 'Which cells dominate the crypts of the large intestine?', correct: 'Goblet cells', wrong: ['Enterocytes with long microvilli', 'Parietal cells', 'Chief cells'], why: 'The large intestine has distinctive crypts, deeper than those of the small intestine and dominated by goblet cells.',
        pt: { q: 'Quais células dominam as criptas do intestino grosso?', correct: 'Células caliciformes', wrong: ['Enterócitos com microvilosidades longas', 'Células parietais', 'Células principais'], why: 'As criptas são características, mais profundas que as do delgado e dominadas por células caliciformes.' } },
      { ref: '9', q: 'Which layers coordinate peristalsis?', correct: 'The circular and longitudinal muscle layers', wrong: ['The mucosa alone', 'The serosa alone', 'The submucosa alone'], why: 'Peristalsis propels materials by coordinated contractions of the circular and longitudinal layers.',
        pt: { q: 'Quais camadas coordenam o peristaltismo?', correct: 'As camadas musculares circular e longitudinal', wrong: ['Só a mucosa', 'Só a serosa', 'Só a submucosa'], why: 'O peristaltismo empurra o conteúdo por contrações coordenadas das camadas circular e longitudinal.' } },
      { ref: '9', q: 'Which movement mainly involves the circular layer and produces no net movement?', correct: 'Segmentation', wrong: ['Peristalsis', 'Defecation', 'Absorption'], why: 'Segmentation movements mainly involve the circular muscle layers, churn and mix, but do not produce net movement.',
        pt: { q: 'Qual movimento envolve principalmente a camada circular e não produz deslocamento líquido?', correct: 'Segmentação', wrong: ['Peristaltismo', 'Defecação', 'Absorção'], why: 'A segmentação envolve principalmente as camadas circulares, mistura o conteúdo, mas não produz deslocamento líquido.' } },
      { ref: '6', q: 'Which taenia is free, with neither the mesocolon nor the appendices attached?', correct: 'The free taenia (anterior/inferior)', wrong: ['The mesocolic taenia (posteromedial)', 'The omental taenia (posterolateral)', 'The ileal taenia'], why: 'The free taenia is anterior or inferior; neither mesocolon nor appendices attach to it.',
        pt: { q: 'Qual tênia é livre, sem mesocolo nem apêndices presos?', correct: 'A tênia livre (anterior/inferior)', wrong: ['A tênia mesocólica (posteromedial)', 'A tênia omental (posterolateral)', 'A tênia ileal'], why: 'A tênia livre é anterior ou inferior; nela não se prendem nem o mesocolo nem os apêndices.' } },
      { ref: '8', q: 'What do the haustra do?', correct: 'They divide the lumen into separate compartments when the muscles contract', wrong: ['They are lined by villi', 'They are formed by the serosa alone', 'They are made of stratified squamous epithelium'], why: 'Haustra define the lumen into separate compartments when the muscles contract.',
        pt: { q: 'O que fazem os haustros?', correct: 'Dividem o lúmen em compartimentos separados quando os músculos se contraem', wrong: ['São revestidos por vilosidades', 'São formados só pela serosa', 'São feitos de epitélio estratificado pavimentoso'], why: 'Os haustros definem o lúmen em compartimentos separados quando os músculos se contraem.' } },
    ],
  },
  {
    id: 'largeint-3', title: t('Caecum, ileocaecal valve and appendix', 'Ceco, valva ileocecal e apêndice'),
    cards: [
      {
        id: 'largeint-p14', ref: '14', title: t('The caecum and its relations', 'O ceco e suas relações'),
        focus: ['ileocecal_junction', 'appendix', 'ileum'], ghost: ['duodenum', 'ascending_colon'], view: 'ant',
        body: [
          t('The caecum is the first part of the large intestine: a blind pouch that is continuous with the ascending colon. Its limit is given by the ileocaecal valve. The taeniae start here, around the base of the appendix, and then diverge into anterior, posteromedial and posterolateral positions. The caecum itself is not in this 3D set; the ileocaecal junction and the appendix show where it lies.',
            'O ceco é a primeira parte do intestino grosso: um fundo de saco contínuo com o colo ascendente. Seu limite é dado pela valva ileocecal. As tênias começam aqui, ao redor da base do apêndice, e depois se separam em posições anterior, posteromedial e posterolateral. O ceco em si não está neste conjunto 3D; a junção ileocecal e o apêndice mostram onde ele fica.'),
          t('The caecum lies in the right iliac fossa and has four faces. In front, it faces the anterior abdominal wall; when it is empty, the greater omentum or loops of small bowel lie between them. Behind and laterally, it faces the parietal peritoneum and, through it, the iliac fascia and the iliacus muscle. Medially, it is related to the psoas major and minor and to the iliac vessels.',
            'O ceco fica na fossa ilíaca direita e tem quatro faces. Na frente, ele olha para a parede abdominal anterior; quando está vazio, o omento maior ou alças do intestino delgado ficam entre os dois. Atrás e lateralmente, ele se relaciona com o peritônio parietal e, através dele, com a fáscia ilíaca e o músculo ilíaco. Medialmente, relaciona-se com o psoas maior e menor e com os vasos ilíacos.'),
          t('Behind the cecum and ascending colon, the right kidney and descending duodenum lie superiorly and transversus abdominis laterally. The iliacus, psoas major and minor lie posterior and medial in the right iliac fossa; ilioinguinal, lateral femoral cutaneous, genitofemoral and femoral nerves and testicular or ovarian vessels cross this bed.',
            'Atrás do ceco e do colo ascendente, o rim direito e o duodeno descendente ficam superiormente e o transverso do abdome lateralmente. O ilíaco e os psoas maior e menor ficam posterior e medialmente na fossa ilíaca direita; os nervos ilioinguinal, cutâneo femoral lateral, genitofemoral e femoral e os vasos testiculares ou ovarianos cruzam esse leito.'),
        ],
      },
      {
        id: 'largeint-p15', ref: '15', title: t('Caecal peritoneum and its recesses', 'Peritônio do ceco e seus recessos'),
        focus: ['ileocecal_junction', 'appendix', 'ileum', 'appendicular_a', 'ileocolic_a'], view: 'ant',
        body: [
          t('The caecum is often completely covered by peritoneum, which is reflected behind and below onto the floor of the right iliac fossa. The folds made by these reflections create recesses. Defects in these reflections can be dangerous, because they may allow a hernia.',
            'O ceco costuma ser completamente coberto por peritônio, que se reflete para trás e para baixo até o assoalho da fossa ilíaca direita. As pregas formadas por essas reflexões criam recessos. Defeitos nessas reflexões podem ser perigosos, porque podem permitir uma hérnia.'),
          t('Three recesses are named. The superior ileocaecal recess is at the level of the valve; its anterior border is the vascular fold of the caecum, and behind it is the mesentery. The inferior ileocaecal recess is bigger than the superior one; its anterior limit is the ileocaecal fold, called the bloodless fold of Treves, and behind it is the mesoappendix. The retrocaecal recess lies behind the caecum, and it frequently contains the appendix.',
            'Três recessos são nomeados. O recesso ileocecal superior fica no nível da valva; sua borda anterior é a prega vascular do ceco, e atrás dele está o mesentério. O recesso ileocecal inferior é maior que o superior; seu limite anterior é a prega ileocecal, chamada prega avascular de Treves, e atrás dele está o mesoapêndice. O recesso retrocecal fica atrás do ceco e frequentemente contém o apêndice.'),
          t('The ileocolic artery gives colic and ileal branches, anterior and posterior cecal arteries and the appendicular artery, which runs in the mesoappendix. Cecal folds and the right paracolic gutter lie near the terminal ileum; external iliac vessels lie behind the peritoneum.',
            'A artéria ileocólica dá ramos cólico e ileal, artérias cecais anterior e posterior e a artéria apendicular, que corre no mesoapêndice. Pregas cecais e a goteira paracólica direita ficam perto do íleo terminal; os vasos ilíacos externos ficam atrás do peritônio.'),
        ],
      },
      {
        id: 'largeint-p17', ref: '17–19', title: t('The ileocaecal valve', 'A valva ileocecal'),
        focus: ['ileocecal_junction', 'ileum', 'ascending_colon', 'taeniae_coli', 'appendix'], view: 'ant',
        body: [
          t('The ileum ends at the colon–cecum junction as an internal papilla with two labial folds. The superior ileocolic lip is horizontal; the inferior ileocecal lip is longer and more concave. At their base the lips unite as narrow muscular frenula. The labial form is usually seen after death and occasionally in life; the papillary form is more common in life.',
            'O íleo termina na junção entre colo e ceco como uma papila interna com duas pregas labiais. O lábio ileocólico superior é horizontal; o ileocecal inferior é mais longo e côncavo. Na base, os lábios unem-se em frênulos musculares estreitos. A forma labial é usual após a morte e ocasional em vida; a papilar é mais comum em vida.'),
          t('All layers of the ileal wall except the peritoneum contribute to the ileocecal orifice. Inner circular and outer longitudinal muscle fibres of the ileum and colon meet at the junction, the papilla and the taenia.',
            'Todas as camadas da parede ileal, exceto o peritônio, contribuem para o orifício ileocecal. Fibras musculares circulares internas e longitudinais externas do íleo e do colo encontram-se na junção, na papila e na tênia.'),
          t('The ileal orifice opens into the ascending colon. Its commissure joins the superior ileocolic and inferior ileocecal lips.',
            'O orifício ileal abre-se no colo ascendente. Sua comissura une os lábios ileocólico superior e ileocecal inferior.'),
        ],
      },
      {
        id: 'largeint-p20', ref: '20', title: t('The vermiform appendix: size and positions', 'O apêndice vermiforme: tamanho e posições'),
        focus: ['appendix', 'ileocecal_junction', 'ascending_colon'], ghost: ['ileum', 'transverse_colon'], view: 'ant',
        body: [
          t('The vermiform appendix is a narrow blind-ended tube, 6–10 cm long. It looks like a continuation of the fundus of the caecum, protrudes into the abdominal cavity and may reach as far as the pelvis. Its blind end can move freely into four positions, with these shares: pelvic (directed downwards), 20%; retrocaecal or retrocolic (directed upwards), 15%; pre-ileal (directed outwards), 2–5%; and post-ileal (directed inwards), 2–5%.',
            'O apêndice vermiforme é um tubo estreito de extremidade cega, com 6–10 cm. Parece uma continuação do fundo do ceco, projeta-se para a cavidade abdominal e pode alcançar a pelve. Sua extremidade cega pode se mover livremente em quatro posições, com estas porcentagens: pélvica (voltada para baixo), 20%; retrocecal ou retrocólica (voltada para cima), 15%; pré-ileal (voltada para fora), 2–5%; e pós-ileal (voltada para dentro), 2–5%.'),
          t('The appendix can lie pelvic, retrocecal, preileal, postileal, promontoric, paracolic or prececal, or subcecal. Its base is related to the cecum, ileum and taeniae coli.',
            'O apêndice pode ocupar posição pélvica, retrocecal, pré-ileal, pós-ileal, promontórica, paracólica ou pré-cecal, ou subcecal. Sua base relaciona-se com o ceco, o íleo e as tênias do colo.'),
        ],
      },
      {
        id: 'largeint-p21', ref: '21', title: t('Mesoappendix and the appendix wall', 'Mesoapêndice e a parede do apêndice'),
        focus: ['mesoappendix', 'appendix', 'appendicular_a', 'ileum'], view: 'ant',
        body: [
          t('The mesoappendix is a triangular mesentery that runs between the terminal ileum and the appendix. It carries the appendicular artery. The vermiform appendix has the typical wall structure of an intraperitoneal intestinal tube.',
            'O mesoapêndice é um mesentério triangular que corre entre o íleo terminal e o apêndice. Ele carrega a artéria apendicular. O apêndice vermiforme tem a estrutura típica de parede de um tubo intestinal intraperitoneal.'),
          t('The appendix has abundant lymphatic follicles in its submucosa, hence the name intestinal tonsil. Its wall includes mucosa, muscularis mucosae, submucosa, circular and longitudinal muscularis externa, subserosa and serosa. The mesoappendix carries the appendicular artery. The bloodless ileocecal fold, anterior and posterior cecal arteries, superior and inferior ileocecal and retrocecal recesses, vascular and cecal folds, external iliac vessels and right paracolic gutter lie nearby.',
            'O apêndice tem abundantes folículos linfáticos na submucosa, daí o nome tonsila intestinal. Sua parede inclui mucosa, muscular da mucosa, submucosa, camadas circular e longitudinal da muscular externa, subserosa e serosa. O mesoapêndice conduz a artéria apendicular. A prega ileocecal avascular, as artérias cecais anterior e posterior, os recessos ileocecais superior e inferior e retrocecal, as pregas vascular e cecais, os vasos ilíacos externos e a goteira paracólica direita ficam próximos.'),
        ],
      },
    ],
    questions: [
      { ref: '14', q: 'Where does the caecum lie, and what marks its upper limit?', correct: 'The right iliac fossa; the ileocaecal valve', wrong: ['The left iliac fossa; the sigmoid flexure', 'The epigastrium; the pyloric valve', 'The pelvis; the rectosigmoid junction'], why: 'The caecum is in the right iliac fossa, and its limit is the ileocaecal valve.',
        pt: { q: 'Onde fica o ceco, e o que marca seu limite superior?', correct: 'Na fossa ilíaca direita; a valva ileocecal', wrong: ['Na fossa ilíaca esquerda; a flexura sigmoide', 'No epigástrio; a valva pilórica', 'Na pelve; a junção retossigmoide'], why: 'O ceco fica na fossa ilíaca direita, e seu limite é a valva ileocecal.' } },
      { ref: '14', q: 'Which structures lie on the medial face of the caecum?', correct: 'The psoas major and minor and the iliac vessels', wrong: ['The anterior abdominal wall', 'The parietal peritoneum and the iliacus', 'The greater omentum'], why: 'Medially the caecum is related to psoas major and minor and the iliac vessels.',
        pt: { q: 'Quais estruturas ficam na face medial do ceco?', correct: 'O psoas maior e menor e os vasos ilíacos', wrong: ['A parede abdominal anterior', 'O peritônio parietal e o ilíaco', 'O omento maior'], why: 'Medialmente o ceco se relaciona com o psoas maior e menor e os vasos ilíacos.' } },
      { ref: '15', q: 'Which recess often contains the appendix?', correct: 'The retrocaecal recess', wrong: ['The superior ileocaecal recess', 'The inferior ileocaecal recess', 'The right paracolic gutter'], why: 'The retrocaecal recess is posterior to the caecum and frequently contains the appendix.',
        pt: { q: 'Qual recesso frequentemente contém o apêndice?', correct: 'O recesso retrocecal', wrong: ['O recesso ileocecal superior', 'O recesso ileocecal inferior', 'A goteira paracólica direita'], why: 'O recesso retrocecal fica atrás do ceco e frequentemente contém o apêndice.' } },
      { ref: '15', q: 'Why can defects in the caecal peritoneal folds be dangerous?', correct: 'They may allow a hernia', wrong: ['They may cause jaundice', 'They block the ileal papilla', 'They drain bile into the caecum'], why: 'Defects in these reflections can be dangerous because of possible hernia.',
        pt: { q: 'Por que defeitos nas pregas peritoneais do ceco podem ser perigosos?', correct: 'Podem permitir uma hérnia', wrong: ['Podem causar icterícia', 'Bloqueiam a papila ileal', 'Drenam bile para o ceco'], why: 'Defeitos nessas reflexões podem ser perigosos pela possibilidade de hérnia.' } },
      { ref: '17–19', q: 'Which lip sits at the ileum–colon junction?', correct: 'The superior lip (ileocolic lip)', wrong: ['The inferior lip (ileocaecal lip)', 'The frenulum', 'The free taenia'], why: 'Superior lip, horizontal, at the ileum–colon junction; inferior lip sits at the ileum–caecum junction.',
        pt: { q: 'Qual lábio fica na junção íleo-colo?', correct: 'O lábio superior (lábio ileocólico)', wrong: ['O lábio inferior (lábio ileocecal)', 'O frênulo', 'A tênia livre'], why: 'Lábio superior, horizontal, na junção íleo-colo; o inferior fica na junção íleo-ceco.' } },
      { ref: '18', q: 'Which layers of the ileal wall contribute to the ileocaecal orifice?', correct: 'All layers except the peritoneum', wrong: ['Only the mucosa', 'Only the serosa and the peritoneum', 'Only the circular layer'], why: 'All layers of the ileal wall except peritoneum contribute to the ileocaecal orifice.',
        pt: { q: 'Quais camadas da parede ileal contribuem para o orifício ileocecal?', correct: 'Todas as camadas, exceto o peritônio', wrong: ['Só a mucosa', 'Só a serosa e o peritônio', 'Só a camada circular'], why: 'Todas as camadas da parede ileal, exceto o peritônio, contribuem para o orifício ileocecal.' } },
      { ref: '20', q: 'Which position of the appendix is the most frequent?', correct: 'Retrocaecal, about 65%', wrong: ['Pelvic, about 30%', 'Post-ileal, 2–5%', 'Pre-ileal, 2–5%'], why: 'Retrocaecal ~65%, pelvic ~30% (Moore; Gray\'s). The class material gives pelvic 20% as the most common and retrocaecal 15%; large series disagree.',
        pt: { q: 'Qual posição do apêndice é a mais frequente?', correct: 'Retrocecal, cerca de 65%', wrong: ['Pélvica, cerca de 30%', 'Pós-ileal, 2–5%', 'Pré-ileal, 2–5%'], why: 'Retrocecal ~65%, pélvica ~30% (Moore; Gray\'s). O material da aula dá pélvica 20% como a mais comum e retrocecal 15%; grandes séries discordam.' } },
      { ref: '21', q: 'Why has the appendix been called the «intestinal tonsil»?', correct: 'Its submucosa has abundant lymphatic follicles', wrong: ['Its mesoappendix holds the largest lymph node', 'Its mucosa is replaced by lymphoid tissue', 'Its taeniae are filled with lymph'], why: 'Abundance of lymphatic follicles in the submucosa, so it is characterised as the «intestinal tonsil».',
        pt: { q: 'Por que o apêndice foi chamado de «amígdala intestinal»?', correct: 'A submucosa tem folículos linfáticos abundantes', wrong: ['O mesoapêndice guarda o maior linfonodo', 'A mucosa é substituída por tecido linfoide', 'As tênias são cheias de linfa'], why: 'Abundância de folículos linfáticos na submucosa, por isso é caracterizado como «amígdala intestinal».' } },
    ],
  },
  {
    id: 'largeint-4', title: t('Ascending and transverse colon', 'Colo ascendente e transverso'),
    cards: [
      {
        id: 'largeint-p22', ref: '22', title: t('Paracolic gutters and the ascending colon', 'Goteiras paracólicas e o colo ascendente'),
        focus: ['ascending_colon', 'ileocecal_junction', 'appendix'], ghost: ['ileum', 'transverse_colon'], view: 'ant',
        body: [
          t('Paracolic gutters are peritoneal recesses lateral to the colon. They allow infections to spread. At L3–L4, the right gutter lies beside the ascending colon and the left gutter beside the descending colon. The transverse colon, greater omentum, omental appendices, round ligament of the liver and abdominal wall layers lie anteriorly; quadratus lumborum, psoas major and minor, inferior vena cava and aorta lie posteriorly.',
            'As goteiras paracólicas são recessos peritoneais laterais ao colo. Elas permitem a propagação de infecções. Em L3–L4, a goteira direita fica junto ao colo ascendente e a esquerda junto ao descendente. O colo transverso, o omento maior, os apêndices omentais, o ligamento redondo do fígado e as camadas da parede abdominal ficam anteriormente; o quadrado lombar, os psoas maior e menor, a veia cava inferior e a aorta ficam posteriormente.'),
          t('The ascending colon is 15–20 cm long, from the ileocolic junction to the hepatic flexure. It attaches to posterior peritoneum, iliac fascia and renal fascia. The right paracolic gutter lies lateral to it and the cecum. The ileocolic artery gives ileal, colic, anterior and posterior cecal and appendicular branches.',
            'O colo ascendente mede 15–20 cm, da junção ileocólica à flexura hepática. Fixa-se ao peritônio posterior, à fáscia ilíaca e à fáscia renal. A goteira paracólica direita fica lateral a ele e ao ceco. A artéria ileocólica dá ramos ileal, cólico, cecais anterior e posterior e apendicular.'),
        ],
      },
      {
        id: 'largeint-p23', ref: '23', title: t('Relations of the ascending colon', 'Relações do colo ascendente'),
        focus: ['ascending_colon'], ghost: ['duodenum', 'pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('The relations are listed by face. The lateral face faces the lateral abdominal wall and the right paracolic recess. The medial face faces the psoas major, the mesenteric small intestine, the ureter and the gonadal vessels.',
            'As relações são listadas por face. A face lateral se volta para a parede abdominal lateral e para o recesso paracólico direito. A face medial se volta para o psoas maior, para o intestino delgado mesentérico, para o ureter e para os vasos gonadais.'),
          t('The ascending colon and cecum lie lateral to the small intestine and its mesentery, beside the right paracolic recess. The duodenum, pancreas, middle colic vessels, transverse colon, left paracolic recess and descending colon are nearby. The posterior muscular bed includes psoas major and minor, quadratus lumborum and iliacus. The ascending colon lies over the right kidney near the duodenum, right suprarenal gland, mesenteric root, ureters and testicular vessels.',
            'O colo ascendente e o ceco ficam laterais ao intestino delgado e seu mesentério, junto ao recesso paracólico direito. Duodeno, pâncreas, vasos cólicos médios, colo transverso, recesso paracólico esquerdo e colo descendente ficam próximos. O leito muscular posterior inclui psoas maior e menor, quadrado lombar e ilíaco. O colo ascendente fica sobre o rim direito perto do duodeno, suprarrenal direita, raiz do mesentério, ureteres e vasos testiculares.'),
        ],
      },
      {
        id: 'largeint-p24', ref: '24', title: t('The right colic (hepatic) flexure', 'A flexura cólica direita (hepática)'),
        focus: ['ascending_colon', 'transverse_colon', 'gallbladder', 'duodenum'], ghost: ['stomach', 'caudate_lobe'], view: 'ant',
        body: [
          t('The right colic flexure is where the ascending colon turns into the transverse colon. Its relations are given face by face. In front, it is related to the gallbladder and to the lower surface of the right lobe of the liver, which leaves the colic impression. Behind, it is related to the right kidney and to the descending part of the duodenum.',
            'A flexura cólica direita é onde o colo ascendente se transforma em colo transverso. Suas relações são dadas face a face. Na frente, relaciona-se com a vesícula biliar e com a face inferior do lobo direito do fígado, que deixa a impressão cólica. Atrás, relaciona-se com o rim direito e com a parte descendente do duodeno.'),
          t('The liver has colic, renal, suprarenal, duodenal and gastric impressions. Above the right colic flexure lie the gallbladder, pyloric canal, superior duodenum, omental foramen, hepatic nodes, right gastric vessels, cystic vessels and right branch of the proper hepatic artery. The transverse colon has an omental taenia and haustra. The right kidney and duodenum lie posterior to the flexure.',
            'O fígado tem impressões cólica, renal, suprarrenal, duodenal e gástrica. Acima da flexura cólica direita ficam a vesícula, o canal pilórico, o duodeno superior, o forame omental, os linfonodos hepáticos, os vasos gástricos direitos, os vasos císticos e o ramo direito da artéria hepática própria. O colo transverso tem tênia omental e haustrações. O rim direito e o duodeno ficam atrás da flexura.'),
        ],
      },
      {
        id: 'largeint-p25', ref: '25', title: t('The transverse colon', 'O colo transverso'),
        focus: ['transverse_colon'], ghost: ['stomach', 'spleen', 'pancreas'], view: 'ant',
        body: [
          t('The transverse colon is intraperitoneal and runs parallel to the greater curvature of the stomach. The left colic flexure lies below that curvature. The stomach has cardiac and pyloric parts, an angular notch, pyloric canal and antrum, body and lesser and greater curvatures.',
            'O colo transverso é intraperitoneal e corre paralelo à curvatura maior do estômago. A flexura cólica esquerda fica abaixo dessa curvatura. O estômago tem partes cardíaca e pilórica, incisura angular, canal e antro pilóricos, corpo e curvaturas menor e maior.'),
          t('Its important recesses are described below: the supramesocolic and submesocolic spaces, the right and left mesenteric-colic spaces and the paracolic gutters. The transverse colon is held to the posterior wall by its mesocolon, and the greater omentum sits on top of that mesocolon, as noted earlier.',
            'Seus recessos importantes são descritos a seguir: os espaços supramesocólico e inframesocólico, os espaços mesentérico-cólicos direito e esquerdo e as goteiras paracólicas. O colo transverso é preso à parede posterior pelo seu mesocolo, e o omento maior fica sobre esse mesocolo, como visto antes.'),
        ],
      },
      {
        id: 'largeint-p26', ref: '26–27', title: t('Transverse mesocolon, nodes and recesses', 'Mesocolo transverso, linfonodos e recessos'),
        focus: ['transverse_colon', 'pancreas', 'hepatic_portal_v', 'spleen', 'smv'], ghost: ['duodenum', 'stomach', 'caudate_lobe', 'gallbladder'], view: 'ant',
        body: [
          t('The root of the transverse mesocolon crosses the pancreas toward the spleen. Above it lie the liver lobes, hepatoduodenal ligament with portal vein, omental bursa, left gastric vessels and splenic and pancreatic nodes. Below are the mesenteric root, right and left mesenteric-colic spaces, duodenum, ileocolic and jejunal vessels, sigmoid mesocolon root, sigmoid and superior rectal vessels, and connective tissue behind the ascending and descending colon.',
            'A raiz do mesocolo transverso cruza o pâncreas em direção ao baço. Acima ficam os lobos hepáticos, o ligamento hepatoduodenal com a veia porta, a bolsa omental, os vasos gástricos esquerdos e os linfonodos esplênicos e pancreáticos. Abaixo ficam a raiz do mesentério, os espaços mesentérico-cólicos direito e esquerdo, o duodeno, os vasos ileocólicos e jejunais, a raiz do mesocolo sigmoide, os vasos sigmoides e retais superiores e o tecido conjuntivo atrás dos colos ascendente e descendente.'),
          t('The transverse mesocolon separates the supramesocolic space above from the submesocolic space below. The former contains the right and left subphrenic spaces, right subhepatic space and omental bursa near the gastrosplenic ligament. Below are the right mesenteric and left mesenteric-colic spaces and right and left paracolic recesses, related to the roots of the mesentery and sigmoid mesocolon.',
            'O mesocolo transverso separa o espaço supramesocólico acima do submesocólico abaixo. O primeiro contém os espaços subfrênicos direito e esquerdo, o sub-hepático direito e a bolsa omental junto ao ligamento gastroesplênico. Abaixo ficam os espaços mesentérico direito e mesentérico-cólico esquerdo e os recessos paracólicos direito e esquerdo, relacionados às raízes do mesentério e do mesocolo sigmoide.'),
        ],
      },
    ],
    questions: [
      { ref: '22', q: 'Why are the paracolic gutters clinically important?', correct: 'They allow a passage for infections', wrong: ['They produce bile', 'They hold the ileocaecal valve in place', 'They supply the appendix with blood'], why: 'Paracolic gutters are clinically important because they allow a passage for infections.',
        pt: { q: 'Por que as goteiras paracólicas são clinicamente importantes?', correct: 'Permitem a passagem de infecções', wrong: ['Produzem bile', 'Seguram a valva ileocecal no lugar', 'Irrigam o apêndice com sangue'], why: 'As goteiras paracólicas são clinicamente importantes porque permitem a passagem de infecções.' } },
      { ref: '22', q: 'How long is the ascending colon?', correct: '15–20 cm', wrong: ['5–8 cm', '25–30 cm', '1–1.8 m'], why: 'The ascending colon is 15–20 cm long, from the ileocolic junction to the hepatic flexure.',
        pt: { q: 'Qual é o comprimento do colo ascendente?', correct: '15–20 cm', wrong: ['5–8 cm', '25–30 cm', '1–1,8 m'], why: 'O colo ascendente tem 15–20 cm, da junção ileocólica até a flexura hepática.' } },
      { ref: '23', q: 'Which structure lies on the medial face of the ascending colon?', correct: 'The psoas major', wrong: ['The lateral abdominal wall', 'The right paracolic recess', 'The gallbladder'], why: 'Medial face: psoas major, mesenteric intestine, ureter, gonadic vessels.',
        pt: { q: 'Qual estrutura fica na face medial do colo ascendente?', correct: 'O psoas maior', wrong: ['A parede abdominal lateral', 'O recesso paracólico direito', 'A vesícula biliar'], why: 'Face medial: psoas maior, intestino mesentérico, ureter, vasos gonadais.' } },
      { ref: '24', q: 'Which organ lies in front of the right colic flexure?', correct: 'The gallbladder', wrong: ['The right kidney', 'The descending part of the duodenum', 'The spleen'], why: 'Anteriorly, the gallbladder and the lower surface of the right lobe of the liver (colic impression); posteriorly, the right kidney and the descending duodenum.',
        pt: { q: 'Qual órgão fica na frente da flexura cólica direita?', correct: 'A vesícula biliar', wrong: ['O rim direito', 'A parte descendente do duodeno', 'O baço'], why: 'Anteriormente, a vesícula biliar e a face inferior do lobo direito do fígado (impressão cólica); posteriormente, o rim direito e o duodeno descendente.' } },
      { ref: '24', q: 'What lies behind the right colic flexure?', correct: 'The right kidney and the descending duodenum', wrong: ['The gallbladder', 'The lower surface of the right lobe of the liver', 'The stomach'], why: 'Posteriorly, the right kidney and the descending part of the duodenum.',
        pt: { q: 'O que fica atrás da flexura cólica direita?', correct: 'O rim direito e o duodeno descendente', wrong: ['A vesícula biliar', 'A face inferior do lobo direito do fígado', 'O estômago'], why: 'Posteriormente, o rim direito e a parte descendente do duodeno.' } },
      { ref: '25', q: 'How is the transverse colon described?', correct: 'Intraperitoneal and parallel to the greater curvature of the stomach', wrong: ['Retroperitoneal and parallel to the lesser curvature', 'Intraperitoneal and at right angles to the stomach', 'Retroperitoneal and attached to the duodenum'], why: 'Intraperitoneal, parallel to the greater curvature.',
        pt: { q: 'Como o material da aula descreve o colo transverso?', correct: 'Intraperitoneal e paralelo à curvatura maior do estômago', wrong: ['Retroperitoneal e paralelo à curvatura menor', 'Intraperitoneal e em ângulo reto com o estômago', 'Retroperitoneal e preso ao duodeno'], why: 'Intraperitoneal, paralelo à curvatura maior.' } },
      { ref: '26–27', q: 'Which two large spaces does the transverse mesocolon divide?', correct: 'The supramesocolic and submesocolic spaces', wrong: ['The hepatic and splenic spaces', 'The pelvic and retroperitoneal spaces', 'The mesenteric and paracolic spaces'], why: 'The supramesocolic space lies above the transverse mesocolon and the submesocolic space lies below it.',
        pt: { q: 'Quais dois grandes espaços o mesocolo transverso divide?', correct: 'Os espaços supramesocólico e inframesocólico', wrong: ['Os espaços hepático e esplênico', 'Os espaços pélvico e retroperitoneal', 'Os espaços mesentérico e paracólico'], why: 'O espaço supramesocólico fica acima do mesocolo transverso e o inframesocólico fica abaixo dele.' } },
    ],
  },
  {
    id: 'largeint-5', title: t('Splenic flexure, descending and sigmoid colon', 'Flexura cólica esquerda, colo descendente e sigmoide'),
    cards: [
      {
        id: 'largeint-p28', ref: '28–29', title: t('The splenic flexure and its relations', 'A flexura cólica esquerda e suas relações'),
        focus: ['transverse_colon', 'descending_colon', 'spleen'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The splenic flexure is the left colic flexure. It lies in the left hypochondrium, in front of the tail of the pancreas and the left kidney. It sits more superiorly and more posteriorly than the hepatic flexure, and it is frequently attached to the splenic capsule.',
            'A flexura esplênica é a flexura cólica esquerda. Ela fica no hipocôndrio esquerdo, na frente da cauda do pâncreas e do rim esquerdo. Fica mais alta e mais posterior do que a flexura hepática, e costuma se prender à cápsula esplênica.'),
          t('The splenic flexure relates anteriorly to the stomach, posteriorly to the left kidney and suprarenal gland, and inferiorly to the spleen. The splenic hilum, pancreatic tail, left renal vein and pelvis, left ureter and inferior mesenteric vein lie nearby. The left colic flexure lies higher than the right. The stomach has a fundus, body and curvatures and is supplied by left gastric vessels; the left renal artery and vein lie behind.',
            'A flexura esplênica relaciona-se anteriormente com o estômago, posteriormente com o rim esquerdo e a suprarrenal e inferiormente com o baço. O hilo esplênico, a cauda pancreática, a veia e pelve renais esquerdas, o ureter esquerdo e a veia mesentérica inferior ficam próximos. A flexura cólica esquerda fica mais alta que a direita. O estômago tem fundo, corpo e curvaturas e recebe vasos gástricos esquerdos; a artéria e veia renais esquerdas ficam atrás.'),
        ],
      },
      {
        id: 'largeint-p30', ref: '30', title: t('The phrenicocolic ligament', 'O ligamento frenicocólico'),
        focus: ['spleen', 'transverse_colon', 'descending_colon'], ghost: ['stomach', 'pancreas', 'diaphragm_g'], view: 'ant',
        body: [
          t('The phrenicocolic ligament runs from the splenic flexure to the diaphragm at the inferior splenic pole, at the tenth rib. It supports the spleen.',
            'O ligamento frenocólico vai da flexura esplênica ao diafragma no nível do polo inferior do baço, na décima costela. Ele sustenta o baço.'),
          t('The phrenicocolic ligament supports the spleen near the left colic flexure. The gastrophrenic, gastrosplenic and splenorenal ligaments, hepatoduodenal ligament beside the omental foramen and transverse mesocolon relate to the omental bursa. The gastro-omental arterial arch runs in the greater omentum. Behind these structures lie the pancreas, left suprarenal gland, kidney, inferior vena cava and common hepatic artery.',
            'O ligamento frenocólico sustenta o baço perto da flexura cólica esquerda. Os ligamentos gastrofrênico, gastroesplênico e esplenorrenal, o hepatoduodenal junto ao forame omental e o mesocolo transverso relacionam-se com a bolsa omental. O arco arterial gastro-omental corre no omento maior. Atrás dessas estruturas ficam o pâncreas, a suprarrenal esquerda, o rim, a veia cava inferior e a artéria hepática comum.'),
        ],
      },
      {
        id: 'largeint-p31', ref: '31', title: t('The descending colon', 'O colo descendente'),
        focus: ['descending_colon'], ghost: ['transverse_colon', 'pancreas', 'spleen', 'duodenum'], view: 'ant',
        body: [
          t('The descending colon is 25–30 cm long. It runs from the splenic flexure to the iliac crest, in the left iliac region. In front, it is related to the intestinal loops. Behind, it is related to the diaphragm, the quadratus lumborum and the transversus abdominis. To the side, it is related to the paracolic gutter.',
            'O colo descendente tem 25–30 cm. Vai da flexura esplênica até a crista ilíaca, na região ilíaca esquerda. Na frente, relaciona-se com as alças intestinais. Atrás, com o diafragma, o músculo quadrado do lombo e o transverso do abdome. Lateralmente, com a goteira paracólica.'),
          t('The descending colon lies anterior to the spleen, left kidney, quadratus lumborum, transversus abdominis, iliac crest, iliacus and psoas major. Subcostal, iliohypogastric, ilioinguinal, genitofemoral, lateral femoral cutaneous and femoral nerves and gonadal vessels cross its posterior bed. It lies lateral to the small intestine beside the left paracolic recess. The greater omentum, duodenum, pancreas and middle colic vessels are nearby.',
            'O colo descendente fica anterior ao baço, rim esquerdo, quadrado lombar, transverso do abdome, crista ilíaca, ilíaco e psoas maior. Os nervos subcostal, ilio-hipogástrico, ilioinguinal, genitofemoral, cutâneo femoral lateral e femoral e os vasos gonadais cruzam seu leito posterior. Ele fica lateral ao intestino delgado junto ao recesso paracólico esquerdo. O omento maior, o duodeno, o pâncreas e os vasos cólicos médios ficam próximos.'),
        ],
      },
      {
        id: 'largeint-p32', ref: '32–33', title: t('The sigmoid colon: parts and taeniae', 'O colo sigmoide: partes e tênias'),
        focus: ['sigmoid_a', 'descending_colon', 'rectum'], ghost: ['ima', 'ileocecal_junction'], view: 'ant',
        body: [
          t('The sigmoid colon runs to the rectum at S3. Its length and position are very variable, and it is intraperitoneal. By its course it divides into two parts: an iliac part, up to the medial border of the psoas major, and a pelvic part, which travels from lateral to medial into the lesser pelvis, down to S3. The sigmoid colon itself is not in this 3D set; the descending colon and the rectum are focused next to it, and the sigmoid arteries are the vessels that supply it.',
            'O colo sigmoide vai até o reto em S3. Seu comprimento e sua posição são muito variáveis, e ele é intraperitoneal. Pelo seu trajeto, ele se divide em duas partes: uma parte ilíaca, até a borda medial do psoas maior, e uma parte pélvica, que segue da lateral para a medial até a pequena pelve, até S3. O colo sigmoide em si não está neste conjunto 3D; o colo descendente e o reto são destacados ao lado dele, e as artérias sigmoides são os vasos que o irrigam.'),
          t('The sigmoid mesocolon suspends the sigmoid colon. Its root relates to the intersigmoid recess, ureter and common iliac vessels. The greater omentum, transverse mesocolon, descending colon, rectosigmoid junction, levator ani and external anal sphincter are nearby.',
            'O mesocolo sigmoide suspende o colo sigmoide. Sua raiz relaciona-se com o recesso intersigmoide, o ureter e os vasos ilíacos comuns. O omento maior, o mesocolo transverso, o colo descendente, a junção retossigmoide, o levantador do ânus e o esfíncter anal externo ficam próximos.'),
          t('On the sigmoid, the anterior free taenia and the posterior omental taenia remain, and the mesocolic taenia is lost. The sigmoid then moves medially into the small pelvis and inferiorly in the pelvis, down to the third sacral vertebra. At the rectosigmoid junction, the taeniae spread out and unite to form a continuous longitudinal muscle layer.',
            'No sigmoide, permanecem a tênia livre anterior e a tênia omental posterior, e a tênia mesocólica se perde. Em seguida o sigmoide se move medialmente para a pequena pelve e inferiormente na pelve, até a terceira vértebra sacral. Na junção retossigmoide, as tênias se abrem e se unem para formar uma camada muscular longitudinal contínua.'),
        ],
      },
      {
        id: 'largeint-p34', ref: '34', title: t('Sigmoid colon: relations in men and women', 'Relações do colo sigmoide no homem e na mulher'),
        focus: ['sigmoid_a', 'rectum'], ghost: ['descending_colon'], view: 'ant',
        body: [
          t('The relations of the sigmoid colon differ between men and women. In men, the structures in front and below are the urinary bladder, the rectovesical pouch and the intestinal loops. In women, they are the uterus, the broad ligament of the uterus, the rectouterine pouch and the intestinal loops. Above, the sigmoid is related to intestinal loops. Behind, it is related to the iliopsoas, the ureter and the gonadal vessels.',
            'As relações do colo sigmoide diferem entre homens e mulheres. No homem, as estruturas na frente e embaixo são a bexiga urinária, o fundo de saco retovesical e as alças intestinais. Na mulher, são o útero, o ligamento largo do útero, o fundo de saco retouterino e as alças intestinais. Acima, o sigmoide se relaciona com alças intestinais. Atrás, com o ilíaco e o psoas, o ureter e os vasos gonadais.'),
          t('In the male pelvis, the rectovesical pouch lies between bladder and rectum near the seminal gland, prostate, bulbourethral gland, bulbospongiosus, suspensory ligament, corpora cavernosa and spongiosum of the penis and scrotal septum. In the female pelvis, the rectouterine pouch lies between rectum and uterus near the uterine fundus, vesicouterine pouch, bladder, crus of clitoris, broad ligament, vagina and rectovaginal fascia.',
            'Na pelve masculina, a escavação retovesical fica entre bexiga e reto perto da glândula seminal, próstata, glândula bulbouretral, bulboesponjoso, ligamento suspensor, corpos cavernosos e esponjoso do pênis e septo do escroto. Na pelve feminina, a escavação retouterina fica entre reto e útero perto do fundo uterino, escavação vesicouterina, bexiga, ramo do clitóris, ligamento largo, vagina e fáscia retovaginal.'),
        ],
      },
      {
        id: 'largeint-p35', ref: '35–36', title: t('The sigmoid mesocolon and its variations', 'O mesocolo sigmoide e suas variações'),
        focus: ['sigmoid_a', 'superior_rectal_a', 'descending_colon'], ghost: ['transverse_colon', 'pancreas', 'ima'], view: 'ant',
        body: [
          t('The sigmoid mesocolon suspends the sigmoid colon. Its root lies near sigmoid and superior rectal vessels, left testicular vessels and plexus, the left mesenteric-colic space and intersigmoid recess. The ureter and common iliac vessels lie behind the root. The jejunum and its mesentery, transverse colon and pancreas lie above; connective tissue lies behind the descending colon.',
            'O mesocolo sigmoide suspende o colo sigmoide. Sua raiz fica perto dos vasos sigmoides e retais superiores, vasos e plexo testiculares esquerdos, espaço mesentérico-cólico esquerdo e recesso intersigmoide. O ureter e os vasos ilíacos comuns ficam atrás da raiz. O jejuno e seu mesentério, o colo transverso e o pâncreas ficam acima; tecido conjuntivo fica atrás do colo descendente.'),
          t('The sigmoid colon varies in length and position: it can be short and straight, loop to the right, or rise high into the abdomen.',
            'O colo sigmoide varia em comprimento e posição: pode ser curto e reto, formar alça à direita ou subir no abdome.'),
        ],
      },
      {
        id: 'largeint-p37', ref: '37', title: t('Colitis and colon carcinoma (clinical boxes)', 'Colite e carcinoma do colo (caixas clínicas)'),
        focus: ['descending_colon', 'rectum'], ghost: ['sigmoid_a'], view: 'ant',
        body: [
          t('Ulcerative colitis is chronic inflammation of the large intestine, often beginning in the rectum. Symptoms include diarrhoea, sometimes bloody, pain, weight loss and inflammation of other organs. It increases the risk of colorectal carcinoma.',
            'A retocolite ulcerativa é uma inflamação crônica do intestino grosso, frequentemente iniciada no reto. Os sintomas incluem diarreia, às vezes com sangue, dor, perda de peso e inflamação de outros órgãos. Ela aumenta o risco de carcinoma colorretal.'),
          t('Malignant tumours of the colon and rectum are frequent solid tumours; the source states that over 90% occur after age 50. Early disease may be asymptomatic; later symptoms include loss of appetite, altered bowel habits and weight loss. Blood in the stool needs thorough investigation. Haemorrhoids are not a sufficient explanation unless other tests, including colonoscopy, are negative. A tumour can partially obstruct the colon lumen.',
            'Tumores malignos do colo e do reto são tumores sólidos frequentes; a fonte afirma que mais de 90% ocorrem após os 50 anos. A doença inicial pode ser assintomática; depois pode causar perda de apetite, alteração do hábito intestinal e perda de peso. Sangue nas fezes requer investigação cuidadosa. Hemorroidas não são explicação suficiente sem resultados negativos nos demais exames, incluindo colonoscopia. Um tumor pode obstruir parcialmente o lúmen do colo.'),
        ],
      },
    ],
    questions: [
      { ref: '28–29', q: 'Which organ lies in front of the splenic flexure?', correct: 'The stomach', wrong: ['The left kidney', 'The duodenum', 'The spleen'], why: 'Anteriorly, the stomach; posteriorly, the left kidney and adrenal; inferiorly, the spleen.',
        pt: { q: 'Qual órgão fica na frente da flexura esplênica?', correct: 'O estômago', wrong: ['O rim esquerdo', 'O duodeno', 'O baço'], why: 'Anteriormente, o estômago; posteriormente, o rim esquerdo e a suprarrenal; inferiormente, o baço.' } },
      { ref: '28–29', q: 'How does the splenic flexure compare with the hepatic flexure?', correct: 'It is higher and further back', wrong: ['It is lower and further forward', 'It is at the same level and position', 'It is lower and further back'], why: 'The splenic flexure is more superior and posterior than the hepatic flexure.',
        pt: { q: 'Como a flexura esplênica se compara com a flexura hepática?', correct: 'É mais alta e mais posterior', wrong: ['É mais baixa e mais anterior', 'Está no mesmo nível e posição', 'É mais baixa e mais posterior'], why: 'A flexura esplênica é mais superior e posterior do que a hepática.' } },
      { ref: '30', q: 'Where does the phrenicocolic ligament attach on the spleen side?', correct: 'At the inferior pole of the spleen, at the 10th rib', wrong: ['At the lower pole of the kidney, at the 12th rib', 'At the hepatic hilum, at the 8th rib', 'At the pelvic brim, at S3'], why: 'Level of the inferior pole of the spleen (10th rib); it runs from the splenic flexure to the diaphragm.',
        pt: { q: 'Onde fica o ligamento frenicocólico no lado do baço?', correct: 'No polo inferior do baço, na 10ª costela', wrong: ['No polo inferior do rim, na 12ª costela', 'No hilo hepático, na 8ª costela', 'Na borda da pelve, em S3'], why: 'Nível do polo inferior do baço (10ª costela); vai da flexura esplênica ao diafragma.' } },
      { ref: '31', q: 'How long is the descending colon?', correct: '25–30 cm', wrong: ['15–20 cm', '40 cm', '1–1.8 m'], why: 'The descending colon is 25–30 cm long.',
        pt: { q: 'Qual é o comprimento do colo descendente?', correct: '25–30 cm', wrong: ['15–20 cm', '40 cm', '1–1,8 m'], why: 'O colo descendente tem 25–30 cm.' } },
      { ref: '32–33', q: 'Where does the sigmoid colon end?', correct: 'At the rectum, at S3', wrong: ['At the anal canal, at S1', 'At the rectosigmoid junction, at L3', 'At the splenic flexure, at T12'], why: 'The sigmoid colon runs to the rectum (S3).',
        pt: { q: 'Onde termina o colo sigmoide?', correct: 'No reto, em S3', wrong: ['No canal anal, em S1', 'Na junção retossigmoide, em L3', 'Na flexura esplênica, em T12'], why: 'O colo sigmoide vai até o reto (S3).' } },
      { ref: '33', q: 'Which taenia is lost on the sigmoid colon?', correct: 'The mesocolic taenia', wrong: ['The free taenia', 'The omental taenia', 'The taenia at the ileal orifice'], why: 'The anterior free and posterior omental taeniae remain; the mesocolic taenia is lost.',
        pt: { q: 'Qual tênia se perde no colo sigmoide?', correct: 'A tênia mesocólica', wrong: ['A tênia livre', 'A tênia omental', 'A tênia do orifício ileal'], why: 'Permanecem a tênia livre anterior e a omental posterior; a tênia mesocólica se perde.' } },
      { ref: '34', q: 'Which structure lies in front and below the sigmoid colon in women?', correct: 'The uterus and the broad ligament of the uterus', wrong: ['The urinary bladder', 'The prostate', 'The seminal gland'], why: 'Female: uterus, broad ligament of the uterus, rectouterine pouch and intestinal loops; male: bladder, rectovesical pouch and loops.',
        pt: { q: 'Qual estrutura fica na frente e embaixo do colo sigmoide na mulher?', correct: 'O útero e o ligamento largo do útero', wrong: ['A bexiga urinária', 'A próstata', 'A glândula seminal'], why: 'Mulher: útero, ligamento largo do útero, fundo de saco retouterino e alças; homem: bexiga, fundo de saco retovesical e alças.' } },
      { ref: '37', q: 'What does the class material say about blood in the stools in colon carcinoma?', correct: 'It is particularly incriminating and needs a thorough examination', wrong: ['It is always explained by haemorrhoids', 'It is a sign of a healthy colon', 'It is ignored in patients under 50'], why: 'Blood in the stools is particularly incriminating, necessitating a thorough examination; haemorrhoids are not enough unless other tests, including colonoscopy, are negative.',
        pt: { q: 'O que o material da aula diz sobre sangue nas fezes no carcinoma do colo?', correct: 'É particularmente suspeito e exige exame minucioso', wrong: ['É sempre explicado por hemorroidas', 'É sinal de colo saudável', 'É ignorado em pacientes com menos de 50 anos'], why: 'Sangue nas fezes é particularmente suspeito e exige exame minucioso; hemorroidas não bastam, a menos que os outros exames, incluindo a colonoscopia, sejam negativos.' } },
    ],
  },
  {
    id: 'largeint-6', title: t('Arterial supply: origins and territories', 'Suprimento arterial: origens e territórios'),
    cards: [
      {
        id: 'largeint-p38', ref: '38–39', title: t('Arterial supply of the gut and the midgut rotation', 'Irrigação do tubo digestivo e a rotação do intestino médio'),
        focus: ['celiac_trunk', 'sma', 'ima'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The arterial supply of the gastrointestinal tract comes in three territories. The foregut is supplied by the celiac trunk, the midgut by the superior mesenteric artery, and the hindgut by the inferior mesenteric artery. The large intestine lies in the midgut and hindgut territories, so it is supplied by the superior and inferior mesenteric arteries.',
            'A irrigação arterial do tubo digestivo se divide em três territórios. O intestino anterior (foregut) é irrigado pelo tronco celíaco, o intestino médio (midgut) pela artéria mesentérica superior, e o intestino posterior (hindgut) pela artéria mesentérica inferior. O intestino grosso fica nos territórios do intestino médio e posterior, então é irrigado pelas artérias mesentéricas superior e inferior.'),
          t('The celiac trunk, superior mesenteric artery and inferior mesenteric artery supply the foregut, midgut and hindgut territories.',
            'O tronco celíaco e as artérias mesentéricas superior e inferior suprem os territórios dos intestinos anterior, médio e posterior.'),
        ],
      },
      {
        id: 'largeint-p40', ref: '40', title: t('Arterial territories of the large intestine', 'Territórios arteriais do intestino grosso'),
        focus: ['sma', 'ima', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a'], view: 'ant',
        body: [
          t('Each part of the large intestine is assigned to an arterial territory. The superior mesenteric artery (midgut) supplies the appendix, the caecum, the ascending colon and the proximal two-thirds of the transverse colon. The inferior mesenteric artery (hindgut), which arises at L3, supplies the distal third of the transverse colon, the descending colon, the sigmoid colon, the rectum and the upper anal canal.',
            'Cada parte do intestino grosso é atribuída a um território arterial. A artéria mesentérica superior (intestino médio) irriga o apêndice, o ceco, o colo ascendente e os dois terços proximais do colo transverso. A artéria mesentérica inferior (intestino posterior), que nasce em L3, irriga o terço distal do colo transverso, o colo descendente, o colo sigmoide, o reto e a porção superior do canal anal.'),
          t('The SMA gives the ileocolic, right colic and middle colic arteries to the colon, as well as jejunal and ileal arteries. The inferior mesenteric artery gives left colic, sigmoid and superior rectal arteries.',
            'A AMS dá ao colo as artérias ileocólica, cólica direita e cólica média, além das artérias jejunais e ileais. A artéria mesentérica inferior dá as artérias cólica esquerda, sigmoides e retal superior.'),
          t('⚠ Other lessons of this course (Jejunum and ileum, page 18, and Gallbladder and spleen, page 40) say the superior mesenteric artery supplies the «proximal one half» of the transverse colon, while this lesson gives two-thirds. Use two-thirds, and note the difference if it comes up.',
            '⚠ Outras aulas deste curso (Jejuno e íleo, página 18, e Vesícula e baço, página 40) dizem que a artéria mesentérica superior irriga a «metade proximal» do colo transverso, enquanto esta aula diz dois terços. Use dois terços e registre a diferença se ela aparecer.'),
        ],
      },
      {
        id: 'largeint-p41', ref: '41', title: t('The inferior mesenteric artery and the left colic artery', 'A artéria mesentérica inferior e a artéria cólica esquerda'),
        focus: ['ima', 'left_colic_a', 'middle_colic_a', 'sigmoid_a'], ghost: ['ileocolic_a', 'right_colic_a', 'appendicular_a'], view: 'ant',
        body: [
          t('The inferior mesenteric artery gives off the left colic artery first. The left colic artery runs upward behind the peritoneum and divides into a superior and an inferior branch. The ascending branch enters the transverse mesocolon to anastomose with the middle colic artery. The descending branch anastomoses with the highest sigmoid artery. The left colic artery supplies the descending colon and the transverse colon.',
            'A artéria mesentérica inferior dá origem primeiro à artéria cólica esquerda. Ela sobe atrás do peritônio e se divide em um ramo superior e um inferior. O ramo ascendente entra no mesocolo transverso para se anastomosar com a artéria cólica média. O ramo descendente se anastomosa com a artéria sigmoide mais alta. A artéria cólica esquerda irriga o colo descendente e o colo transverso.'),
          t('The middle colic artery has right, middle and left branches. The ileocolic trunk divides into superior and inferior branches, with anterior and posterior cecal and appendicular branches. The left colic artery has ascending and descending branches; sigmoid arteries arise from the inferior mesenteric artery.',
            'A artéria cólica média tem ramos direito, médio e esquerdo. O tronco ileocólico divide-se em ramos superior e inferior, com ramos cecais anterior e posterior e apendicular. A artéria cólica esquerda tem ramos ascendente e descendente; as sigmoides nascem da artéria mesentérica inferior.'),
        ],
      },
      {
        id: 'largeint-p47', ref: '47', title: t('Summary: what each main artery supplies', 'Resumo: o que cada artéria principal irriga'),
        focus: ['celiac_trunk', 'sma', 'ima', 'pancreaticoduodenal_a', 'middle_colic_a', 'left_colic_a', 'superior_rectal_a'], view: 'ant',
        body: [
          t('The celiac trunk supplies the esophagus, stomach, duodenum, liver, spleen, gallbladder and pancreas. The superior mesenteric artery supplies the pancreas, duodenum, jejunum, ileum, cecum, ascending and transverse colon. The inferior mesenteric artery supplies the transverse and descending colon, sigmoid colon, rectum and anal canal.',
            'O tronco celíaco irriga esôfago, estômago, duodeno, fígado, baço, vesícula e pâncreas. A artéria mesentérica superior irriga pâncreas, duodeno, jejuno, íleo, ceco e colos ascendente e transverso. A mesentérica inferior irriga colos transverso e descendente, sigmoide, reto e canal anal.'),
          t('The pancreaticoduodenal arteries, middle and left colic arteries, and superior with middle and inferior rectal arteries connect adjacent arterial territories. The internal iliac artery supplies reproductive organs.',
            'As artérias pancreaticoduodenais, as cólicas média e esquerda e as retais superior com média e inferior conectam territórios arteriais adjacentes. A artéria ilíaca interna supre os órgãos reprodutivos.'),
        ],
      },
    ],
    questions: [
      { ref: '38', q: 'Which artery supplies the hindgut?', correct: 'The inferior mesenteric artery', wrong: ['The celiac trunk', 'The superior mesenteric artery', 'The splenic artery'], why: 'Foregut, celiac trunk; midgut, superior mesenteric; hindgut, inferior mesenteric artery.',
        pt: { q: 'Qual artéria irriga o intestino posterior?', correct: 'A artéria mesentérica inferior', wrong: ['O tronco celíaco', 'A artéria mesentérica superior', 'A artéria esplênica'], why: 'Intestino anterior, tronco celíaco; médio, mesentérica superior; posterior, mesentérica inferior.' } },
      { ref: '38', q: 'Which artery supplies the midgut?', correct: 'The superior mesenteric artery', wrong: ['The celiac trunk', 'The inferior mesenteric artery', 'The superior rectal artery'], why: 'The midgut is supplied by the superior mesenteric artery.',
        pt: { q: 'Qual artéria irriga o intestino médio?', correct: 'A artéria mesentérica superior', wrong: ['O tronco celíaco', 'A artéria mesentérica inferior', 'A artéria retal superior'], why: 'O intestino médio é irrigado pela artéria mesentérica superior.' } },
      { ref: '40', q: 'Which part of the transverse colon does the superior mesenteric artery supply?', correct: 'The proximal two-thirds', wrong: ['The distal third', 'The whole transverse colon', 'Only the splenic flexure'], why: 'SMA supplies the proximal 2/3 of the transverse colon; the IMA supplies the distal third.',
        pt: { q: 'Qual parte do colo transverso é irrigada pela artéria mesentérica superior?', correct: 'Os dois terços proximais', wrong: ['O terço distal', 'Todo o colo transverso', 'Só a flexura esplênica'], why: 'A AMS irriga os 2/3 proximais do colo transverso; a AMI irriga o terço distal.' } },
      { ref: '40', q: 'At which vertebral level does the inferior mesenteric artery arise?', correct: 'L3', wrong: ['T12', 'L1', 'S3'], why: 'The inferior mesenteric artery is labelled at L3.',
        pt: { q: 'Em qual nível vertebral nasce a artéria mesentérica inferior?', correct: 'L3', wrong: ['T12', 'L1', 'S3'], why: 'A artéria mesentérica inferior aparece rotulada em L3.' } },
      { ref: '41', q: 'Which artery does the ascending branch of the left colic artery join?', correct: 'The middle colic artery', wrong: ['The superior rectal artery', 'The inferior pancreaticoduodenal artery', 'The ileocolic artery'], why: 'Ascending branch enters the transverse mesocolon to anastomose with the middle colic artery.',
        pt: { q: 'Com qual artéria se anastomosa o ramo ascendente da artéria cólica esquerda?', correct: 'A artéria cólica média', wrong: ['A artéria retal superior', 'A artéria pancreaticoduodenal inferior', 'A artéria ileocólica'], why: 'O ramo ascendente entra no mesocolo transverso para se anastomosar com a artéria cólica média.' } },
      { ref: '47', q: 'Which artery supplies the liver, spleen, gallbladder and stomach?', correct: 'The celiac trunk', wrong: ['The superior mesenteric artery', 'The inferior mesenteric artery', 'The superior rectal artery'], why: 'The celiac trunk supplies the oesophagus, stomach, duodenum, liver, spleen, gallbladder and pancreas.',
        pt: { q: 'Qual artéria irriga o fígado, o baço, a vesícula biliar e o estômago?', correct: 'O tronco celíaco', wrong: ['A artéria mesentérica superior', 'A artéria mesentérica inferior', 'A artéria retal superior'], why: 'O tronco celíaco irriga esôfago, estômago, duodeno, fígado, baço, vesícula biliar e pâncreas.' } },
    ],
  },
  {
    id: 'largeint-7', title: t('Marginal arcade, straight arteries and rectal supply', 'Arcada marginal, artérias retas e irrigação retal'),
    cards: [
      {
        id: 'largeint-p42', ref: '42', title: t('The marginal artery of Drummond and the arch of Riolan', 'A artéria marginal de Drummond e o arco de Riolan'),
        focus: ['ileocolic_a', 'right_colic_a', 'middle_colic_a', 'left_colic_a', 'transverse_colon'], ghost: ['pancreas', 'spleen', 'sma', 'ima'], view: 'ant',
        body: [
          t('The arteries of the midgut and hindgut anastomose to form the marginal arcade of Drummond. It runs in the mesentery and gives short terminal branches to the large intestine. The arcade is formed by branches arising from the ileocolic, right colic, middle colic and left colic arteries. The most susceptible part of this chain of anastomoses lies at the junction of the midgut and hindgut, in the distal transverse colon near the splenic flexure.',
            'As artérias do intestino médio e do posterior se anastomosam para formar a arcada marginal de Drummond. Ela corre no mesentério e dá ramos terminais curtos ao intestino grosso. A arcada é formada por ramos das artérias ileocólica, cólica direita, cólica média e cólica esquerda. A parte mais vulnerável dessa cadeia de anastomoses fica na junção do intestino médio com o posterior, no colo transverso distal, perto da flexura esplênica.'),
          t('The arch of Riolan can supply this region. It joins the main middle colic trunk to the ascending branch of the left colic artery near the left colic flexure. Three connections link arterial territories: pancreaticoduodenal arteries between celiac and superior mesenteric territories; middle and left colic arteries between superior and inferior mesenteric territories; and superior with middle and inferior rectal arteries between inferior mesenteric and internal iliac territories.',
            'O arco de Riolan pode irrigar essa região. Ele une o tronco principal da cólica média ao ramo ascendente da cólica esquerda perto da flexura cólica esquerda. Três conexões ligam territórios arteriais: artérias pancreaticoduodenais entre os territórios celíaco e mesentérico superior; cólicas média e esquerda entre os territórios mesentéricos superior e inferior; e retais superior com média e inferior entre os territórios mesentérico inferior e ilíaco interno.'),
        ],
      },
      {
        id: 'largeint-p43', ref: '43–44', title: t('Straight arteries: vasa longa and vasa brevia', 'Artérias retas: vasa longa e vasa brevia'),
        focus: ['transverse_colon', 'middle_colic_a', 'left_colic_a', 'sigmoid_a'], ghost: ['descending_colon', 'pancreas'], view: 'ant',
        body: [
          t('Straight arteries arise from the marginal artery of Drummond near the taeniae coli and epiploic appendices. The middle and left colic, sigmoid and superior rectal arteries, inferior pancreaticoduodenal vessels, jejunal and ileal arteries and testicular or ovarian vessels lie in the region. The greater omentum overlies the bowel.',
            'Artérias retas nascem da artéria marginal de Drummond perto das tênias do colo e dos apêndices epiploicos. As artérias cólicas média e esquerda, sigmoides e retal superior, os vasos pancreaticoduodenais inferiores, as artérias jejunais e ileais e os vasos testiculares ou ovarianos ficam na região. O omento maior recobre o intestino.'),
          t('From the marginal artery come straight arteries, which then give two kinds of vessel. The vasa longa run in the serosa and give branches that supply the epiploic appendages. The adipose content of these appendages reflects the person’s nutritional status and depends on this vascular supply; without it, no fat would be deposited there. The vasa brevia pierce the circular layer of the muscularis externa to supply the submucosa and the mucosa. Where they penetrate the circular muscle, the wall is weaker, which predisposes to herniation and diverticulum formation.',
            'Da artéria marginal saem artérias retas, que então dão dois tipos de vaso. Os vasa longa correm na serosa e dão ramos que irrigam os apêndices epiploicos. O conteúdo gorduroso desses apêndices reflete o estado nutricional da pessoa e depende dessa irrigação; sem ela, não haveria deposição de gordura ali. Os vasa brevia atravessam a camada circular da muscular externa para irrigar a submucosa e a mucosa. Onde penetram o músculo circular, a parede fica mais fraca, o que predispõe a hérnia e à formação de divertículos.'),
          t('There is also a contrast: all the vasa recta of the jejunum and ileum penetrate the muscular layer of the intestinal wall, whereas in the colon only the vasa brevia do so.',
            'Há também um contraste: todos os vasa recta do jejuno e do íleo penetram a camada muscular da parede intestinal, enquanto no colo só os vasa brevia fazem isso.'),
        ],
      },
      {
        id: 'largeint-p45', ref: '45', title: t('The sigmoid arteries and the rectosigmoid anastomosis', 'As artérias sigmoides e a anastomose retossigmoide'),
        focus: ['sigmoid_a', 'ima', 'left_colic_a', 'superior_rectal_a'], view: 'ant',
        body: [
          t('The sigmoid arteries descend obliquely towards the left, behind the peritoneum. They form arcades that supply the descending and the sigmoid colon. The last sigmoid artery anastomoses with the superior rectal artery, forming the rectosigmoid anastomosis, which is not always present.',
            'As artérias sigmoides descem obliquamente para a esquerda, atrás do peritônio. Elas formam arcadas que irrigam o colo descendente e o sigmoide. A última artéria sigmoide se anastomosa com a artéria retal superior, formando a anastomose retossigmoide, que nem sempre está presente.'),
          t('The inferior mesenteric artery gives the left colic and sigmoid arteries. The left colic ascending branch approaches the left colic flexure; sigmoid arcades connect toward the superior rectal artery.',
            'A artéria mesentérica inferior dá as artérias cólica esquerda e sigmoides. O ramo ascendente da cólica esquerda aproxima-se da flexura cólica esquerda; as arcadas sigmoides conectam-se em direção à artéria retal superior.'),
        ],
      },
      {
        id: 'largeint-p46', ref: '46', title: t('The superior rectal artery', 'A artéria retal superior'),
        focus: ['superior_rectal_a', 'ima', 'rectum'], view: 'ant',
        body: [
          t('The superior rectal artery is the terminal branch of the inferior mesenteric artery. It runs in the sigmoid mesocolon and descends into the pelvis. At S3 it divides into two branches that descend along the rectum. These split into smaller branches that pierce the wall of the rectum to reach the mucosa, down to the internal anal sphincter.',
            'A artéria retal superior é o ramo terminal da artéria mesentérica inferior. Ela corre no mesocolo sigmoide e desce para a pelve. Em S3 se divide em dois ramos que descem ao longo do reto. Estes se dividem em ramos menores que perfuram a parede do reto para alcançar a mucosa, até o esfíncter anal interno.'),
          t('The superior rectal artery anastomoses with the middle rectal artery from the internal iliac and the inferior rectal artery from the internal pudendal. The common iliac, internal iliac and internal pudendal arteries lie proximally.',
            'A artéria retal superior anastomosa-se com a retal média da ilíaca interna e a retal inferior da pudenda interna. As artérias ilíaca comum, ilíaca interna e pudenda interna ficam proximalmente.'),
        ],
      },
    ],
    questions: [
      { ref: '42', q: 'Where is the most susceptible point of the marginal arcade chain?', correct: 'The distal transverse colon, near the splenic flexure', wrong: ['The caecum, near the ileocaecal valve', 'The rectum, at S3', 'The sigmoid colon, in the pelvis'], why: 'The most susceptible part is at the midgut–hindgut junction, in the distal transverse colon near the splenic flexure.',
        pt: { q: 'Onde fica o ponto mais vulnerável da cadeia da arcada marginal?', correct: 'No colo transverso distal, perto da flexura esplênica', wrong: ['No ceco, perto da valva ileocecal', 'No reto, em S3', 'No colo sigmoide, na pelve'], why: 'A parte mais vulnerável fica na junção do intestino médio com o posterior, no colo transverso distal, perto da flexura esplênica.' } },
      { ref: '42', q: 'Which inner arterial arc can supply that weak region?', correct: 'The arch of Riolan', wrong: ['The arch of Treves', 'The gastro-omental arch', 'The arch of the aorta'], why: 'The arch of Riolan is formed by the main trunk of the middle colic artery and the ascending branch of the left colic artery.',
        pt: { q: 'Qual arco arterial interno pode irrigar essa região fraca?', correct: 'O arco de Riolan', wrong: ['O arco de Treves', 'O arco gastro-omental', 'O arco da aorta'], why: 'O arco de Riolan é formado pelo tronco principal da artéria cólica média e pelo ramo ascendente da artéria cólica esquerda.' } },
      { ref: '43–44', q: 'Which vessels pierce the circular muscle layer of the colon?', correct: 'The vasa brevia', wrong: ['The vasa longa', 'The sigmoid arteries', 'The epiploic appendices'], why: 'Vasa brevia pierce the circular layer; vasa longa run in the serosa.',
        pt: { q: 'Quais vasos perfuram a camada muscular circular do colo?', correct: 'Os vasa brevia', wrong: ['Os vasa longa', 'As artérias sigmoides', 'Os apêndices epiploicos'], why: 'Os vasa brevia perfuram a camada circular; os vasa longa correm na serosa.' } },
      { ref: '43–44', q: 'What do the vasa longa supply?', correct: 'Branches to the epiploic appendages', wrong: ['The mucosa of the rectum', 'The internal anal sphincter', 'The taeniae coli'], why: 'Vasa longa run in the serosa and give branches to the epiploic appendages.',
        pt: { q: 'O que irrigam os vasa longa?', correct: 'Ramos para os apêndices epiploicos', wrong: ['A mucosa do reto', 'O esfíncter anal interno', 'As tênias do colo'], why: 'Os vasa longa correm na serosa e dão ramos para os apêndices epiploicos.' } },
      { ref: '46', q: 'At which level does the superior rectal artery divide into two branches?', correct: 'S3', wrong: ['L3', 'T12', 'L1'], why: 'At S3 it divides into 2 branches that descend along the rectum.',
        pt: { q: 'Em qual nível a artéria retal superior se divide em dois ramos?', correct: 'S3', wrong: ['L3', 'T12', 'L1'], why: 'Em S3 se divide em dois ramos que descem ao longo do reto.' } },
      { ref: '46', q: 'Which arteries anastomose with the superior rectal artery?', correct: 'The middle rectal and inferior rectal arteries', wrong: ['The left colic and middle colic arteries', 'The ileocolic and appendicular arteries', 'The left gastric and splenic arteries'], why: 'Anastomoses with the middle rectal artery (internal iliac) and inferior rectal artery (internal pudendal).',
        pt: { q: 'Quais artérias se anastomosam com a artéria retal superior?', correct: 'As artérias retais média e inferior', wrong: ['As artérias cólicas esquerda e média', 'As artérias ileocólica e apendicular', 'As artérias gástrica esquerda e esplênica'], why: 'Anastomoses com a retal média (ilíaca interna) e a retal inferior (pudenda interna).' } },
    ],
  },
  {
    id: 'largeint-8', title: t('Veins, lymphatics and innervation', 'Veias, linfáticos e inervação'),
    cards: [
      {
        id: 'largeint-p48', ref: '48', title: t('Venous drainage of the colon', 'Drenagem venosa do colo'),
        focus: ['smv', 'imv', 'middle_colic_a', 'ileocolic_a'], ghost: ['hepatic_portal_v'], view: 'ant',
        body: [
          t('The ileocolic vein has superior and inferior, anterior and posterior cecal and appendicular tributaries. The middle colic vein has right and left branches. The inferior mesenteric vein receives the left colic vein with ascending and descending branches, sigmoid veins and superior rectal vein.',
            'A veia ileocólica tem tributárias superiores e inferiores, cecais anterior e posterior e apendicular. A veia cólica média tem ramos direito e esquerdo. A veia mesentérica inferior recebe a cólica esquerda com ramos ascendente e descendente, as sigmoides e a retal superior.'),
          t('The colic veins drain to the superior and inferior mesenteric veins and ultimately to the portal vein.',
            'As veias cólicas drenam para as veias mesentéricas superior e inferior e, por fim, para a veia porta.'),
        ],
      },
      {
        id: 'largeint-p49', ref: '49', title: t('Lymphatic drainage of the colon', 'Drenagem linfática do colo'),
        focus: ['sma', 'ima', 'superior_rectal_a'], view: 'ant',
        body: [
          t('The lymphatic drainage of the large intestine follows the same pathway as the arteries, and rectal cancers spread through the lymphatic vessels. The 3D set has no lymph nodes, so the superior and inferior mesenteric arteries are focused here as the route the lymph follows.',
            'A drenagem linfática do intestino grosso segue o mesmo trajeto das artérias, e os cânceres retais se espalham pelos vasos linfáticos. O conjunto 3D não tem linfonodos, então as artérias mesentéricas superior e inferior são destacadas aqui como o trajeto que a linfa segue.'),
          t('Lymph passes from paracolic, appendicular, anterior and posterior cecal, upper and lower ileocolic, right and middle colic nodes toward superior mesenteric nodes. Paracolic, ascending and descending left colic, sigmoid and superior rectal nodes drain toward inferior mesenteric nodes. Rectal lymph can pass upward via perirectal and superior rectal nodes, laterally to internal iliac nodes, and from the lower anal region to superficial inguinal nodes.',
            'A linfa passa dos linfonodos paracólicos, apendiculares, cecais anteriores e posteriores, ileocólicos superiores e inferiores, cólicos direitos e médios aos mesentéricos superiores. Os linfonodos paracólicos, cólicos esquerdos ascendentes e descendentes, sigmoides e retais superiores drenam para os mesentéricos inferiores. A linfa retal pode seguir para cima pelos linfonodos perirretais e retais superiores, lateralmente aos ilíacos internos e da região anal inferior aos inguinais superficiais.'),
        ],
      },
      {
        id: 'largeint-p50', ref: '50', title: t('Putting the intestinal circulation together', 'Juntando a circulação intestinal'),
        focus: ['hepatic_portal_v', 'smv', 'imv', 'splenic_v', 'gastric_v'], ghost: ['stomach', 'caudate_lobe', 'pancreas', 'spleen', 'duodenum'], view: 'ant',
        body: [
          t('This part is titled «let’s put the intestinal puzzle together». It joins the pieces in one line: the stomach and the intestine send their blood through the portal vein, which goes to the liver, while the lymph goes through the lymphatic vessels to the thoracic duct.',
            'Esta parte tem o título «vamos juntar o quebra-cabeça intestinal». Ela junta as peças em uma linha: o estômago e o intestino levam seu sangue pela veia porta, que vai ao fígado, enquanto a linfa segue pelos vasos linfáticos até o ducto torácico.'),
          t('Blood from the stomach, spleen, pancreas, duodenum, small intestine, ascending colon, appendix and descending colon reaches the hepatic portal vein through gastric, pancreatic, gastroepiploic, splenic and mesenteric veins. The portal vein enters the liver near the hepatic veins and inferior vena cava.',
            'O sangue do estômago, baço, pâncreas, duodeno, intestino delgado, colo ascendente, apêndice e colo descendente alcança a veia porta hepática pelas veias gástricas, pancreáticas, gastroepiploicas, esplênica e mesentéricas. A veia porta entra no fígado perto das veias hepáticas e da veia cava inferior.'),
          t('Intestinal lymph travels through lymphatic vessels to the thoracic duct. Small-intestinal villi contain lacteals; the colon has no villi.',
            'A linfa intestinal segue por vasos linfáticos até o ducto torácico. As vilosidades do intestino delgado contêm vasos quilíferos; o colo não tem vilosidades.'),
        ],
      },
      {
        id: 'largeint-p53', ref: '53', title: t('Innervation of the large intestine', 'Inervação do intestino grosso'),
        focus: ['superior_rectal_a', 'rectum', 'descending_colon'], ghost: ['transverse_colon', 'ascending_colon'], view: 'ant',
        body: [
          t('The innervation of the large intestine is given in two lines. The sympathetic supply comes from T10–T12, through the superior mesenteric ganglion. The parasympathetic supply is the vagus nerve.',
            'A inervação do intestino grosso é dada em duas linhas. A inervação simpática vem de T10–T12, pelo gânglio mesentérico superior. A inervação parassimpática é o nervo vago.'),
          t('The sympathetic pathway includes cervical ganglia and splanchnic nerves. The cranial parasympathetic outflow includes cranial nerves III, VII, IX and X. The vagus supplies the large intestine; sacral nerves reach the bladder and genital system.',
            'A via simpática inclui gânglios cervicais e nervos esplâncnicos. A saída parassimpática craniana inclui os nervos cranianos III, VII, IX e X. O vago supre o intestino grosso; nervos sacrais alcançam a bexiga e o sistema genital.'),
          t('The large intestine receives sympathetic fibres through the superior mesenteric ganglion and parasympathetic fibres through the vagus.',
            'O intestino grosso recebe fibras simpáticas pelo gânglio mesentérico superior e parassimpáticas pelo vago.'),
        ],
      },
    ],
    questions: [
      { ref: '48', q: 'Into which mesenteric veins does the colon’s venous blood drain?', correct: 'The superior and inferior mesenteric veins', wrong: ['The azygos and hemiazygos veins', 'The renal veins', 'The inferior vena cava directly'], why: 'The class material labels the colic veins, and shows the superior and inferior mesenteric veins feeding the portal vein.',
        pt: { q: 'Em quais veias mesentéricas o sangue venoso do colo drena?', correct: 'Nas veias mesentéricas superior e inferior', wrong: ['Nas veias ázigos e hemiázigos', 'Nas veias renais', 'Diretamente na veia cava inferior'], why: 'O material da aula rotula as veias cólicas e mostra as veias mesentéricas superior e inferior alimentando a veia porta.' } },
      { ref: '49', q: 'How do rectal cancers spread?', correct: 'Through the lymphatic vessels', wrong: ['Through the portal vein', 'Through the thoracic duct only', 'Along the sacral nerves'], why: 'Rectal cancers spread via lymphatic vessels.',
        pt: { q: 'Como se espalham os cânceres retais?', correct: 'Pelos vasos linfáticos', wrong: ['Pela veia porta', 'Só pelo ducto torácico', 'Ao longo dos nervos sacrais'], why: 'Os cânceres retais se espalham pelos vasos linfáticos.' } },
      { ref: '49', q: 'Which node groups are named for the rectum?', correct: 'Superior rectal, perirectal, internal iliac and superficial inguinal nodes', wrong: ['Ileocolic and appendicular nodes only', 'Celiac and splenic nodes', 'Mediastinal nodes'], why: 'Superior rectal, perirectal, internal iliac, superficial inguinal nodes.',
        pt: { q: 'Quais grupos de linfonodos são citados para o reto?', correct: 'Retais superiores, perirretais, ilíacos internos e inguinais superficiais', wrong: ['Só os ileocólicos e apendiculares', 'Os celíacos e esplênicos', 'Os mediastinais'], why: 'Retais superiores, perirretais, ilíacos internos e inguinais superficiais.' } },
      { ref: '50', q: 'Where does the venous blood of the intestine go?', correct: 'Through the portal vein to the liver', wrong: ['Directly to the inferior vena cava', 'Through the thoracic duct to the heart', 'Through the splenic artery'], why: 'The portal vein carries intestinal blood to the liver; the lymph goes to the thoracic duct.',
        pt: { q: 'Para onde vai o sangue venoso do intestino?', correct: 'Pela veia porta até o fígado', wrong: ['Diretamente para a veia cava inferior', 'Pelo ducto torácico até o coração', 'Pela artéria esplênica'], why: 'A veia porta leva o sangue intestinal ao fígado; a linfa vai ao ducto torácico.' } },
      { ref: '53', q: 'What is the sympathetic supply of the large intestine?', correct: 'T10–T12, through the superior mesenteric ganglion', wrong: ['S2–S4, through the pelvic splanchnic nerves', 'L1–L2, through the lumbar sympathetic trunk', 'C3–C5, through the phrenic nerve'], why: 'Sympathetic T10–T12, superior mesenteric ganglion.',
        pt: { q: 'Qual é a inervação simpática do intestino grosso?', correct: 'T10–T12, pelo gânglio mesentérico superior', wrong: ['S2–S4, pelos nervos esplâncnicos pélvicos', 'L1–L2, pelo tronco simpático lombar', 'C3–C5, pelo nervo frênico'], why: 'Simpático T10–T12, gânglio mesentérico superior.' } },
      { ref: '53', q: 'What is the parasympathetic supply named?', correct: 'The vagus nerve', wrong: ['The greater splanchnic nerves', 'The phrenic nerve', 'The hypogastric plexus'], why: 'Parasympathetic system, vagus nerve.',
        pt: { q: 'Qual é a inervação parassimpática citada?', correct: 'O nervo vago', wrong: ['Os nervos esplâncnicos maiores', 'O nervo frênico', 'O plexo hipogástrico'], why: 'Sistema parassimpático, nervo vago.' } },
    ],
  },
];

blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
