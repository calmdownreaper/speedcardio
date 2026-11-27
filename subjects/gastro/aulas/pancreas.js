// SpeedGastro · Aula 12 — Pancreas and spleen (Prof. Fiume deck 12_pancreas_spleen, p001–p067).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/pancreas.js?v=115';

export const unit = {
  id: 'pancreas',
  label: t('12 · Pancreas and spleen', '12 · Pâncreas e baço'),
  visible: ['pancreas', 'transverse_colon', 'hepatic_portal_v', 'pancreatic_duct', 'duodenum', 'sma', 'ivc_g', 'gastroduodenal_a', 'pancreaticoduodenal_a', 'common_hepatic_a', 'common_hepatic_duct', 'celiac_trunk', 'splenic_a', 'splenic_v', 'spleen', 'descending_colon', 'ascending_colon', 'gallbladder', 'smv', 'imv', 'gastric_v', 'stomach', 'caudate_lobe', 'diaphragm_g', 'gastroepiploic_a', 'left_gastric_a', 'abdominal_aorta_g', 'right_gastric_a', 'ileocolic_a', 'ileum'],
  ghost: ['spleen', 'duodenum', 'stomach', 'sma', 'abdominal_aorta_g', 'splenic_a', 'hepatic_portal_v', 'splenic_v', 'ivc_g', 'gallbladder', 'descending_colon', 'transverse_colon', 'caudate_lobe', 'celiac_trunk', 'left_gastric_a', 'right_gastric_a', 'gastroepiploic_a', 'common_hepatic_a', 'pancreas', 'gastric_v', 'imv', 'ileocolic_a', 'ileum', 'diaphragm_g'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'pancreas-1', title: t('The pancreas: position, parts, relations and peritoneum', 'O pâncreas: posição, partes, relações e peritônio'),
    cards: [
      {
        id: 'pancreas-p01', ref: '1', title: t('Size, position and the mixed gland', 'Tamanho, posição e a glândula mista'),
        focus: ['pancreas'], ghost: ['spleen', 'duodenum', 'stomach'], view: 'ant',
        body: [
          t('The pancreas is the second biggest gland of the gastrointestinal tract, and it is a mixed gland, with an exocrine and an endocrine part. It measures 12–15 cm long, 2–3 cm wide and 4–5 cm high, and weighs 70–80 g. It is concave at the back, because it lies on the vertebral bodies and the vessels.',
            'O pâncreas é a segunda maior glândula do trato gastrointestinal, e é uma glândula mista, com uma parte exócrina e uma parte endócrina. Mede 12–15 cm de comprimento, 2–3 cm de largura e 4–5 cm de altura, e pesa 70–80 g. É côncavo na face posterior, porque se apoia nos corpos vertebrais e nos vasos.'),
          t('It lies at L1–L2 as a retroperitoneal organ in the epigastrium and the left hypochondrium. Lying deep to the liver, stomach, and small and large intestines, it sits in place beside the duodenum, the kidneys and the spleen: its head nestles inside the duodenum, the transverse mesocolon crosses it anteriorly, and its tail reaches toward the spleen alongside the splenic vessels.',
            'Fica em L1–L2 como um órgão retroperitoneal no epigástrio e no hipocôndrio esquerdo. Situado profundamente ao fígado, ao estômago e aos intestinos delgado e grosso, posiciona-se junto ao duodeno, aos rins e ao baço: sua cabeça se encaixa no duodeno, o mesocolo transverso o cruza anteriormente e sua cauda segue em direção ao baço acompanhada pelos vasos esplênicos.'),
        ],
      },
      {
        id: 'pancreas-p02', ref: '2', title: t('Supramesocolic or submesocolic?', 'Supramesocólico ou inframesocólico?'),
        focus: ['pancreas', 'transverse_colon', 'hepatic_portal_v'], ghost: ['stomach', 'spleen', 'duodenum', 'sma'], view: 'ant',
        body: [
          t('Is the pancreas supramesocolic or submesocolic? It lies across both spaces. The attachment of the transverse mesocolon runs across the front of the pancreas, placing its upper portion in the supramesocolic space and the uncinate process and lower head in the submesocolic space.',
            'O pâncreas é supramesocólico ou inframesocólico? Ele se estende pelos dois espaços. A inserção do mesocolo transverso cruza a frente do pâncreas, deixando a porção superior no espaço supramesocólico e o processo uncinado junto com a parte inferior da cabeça no espaço inframesocólico.'),
          t('Along the posterior abdominal wall, the root of the transverse mesocolon crosses the pancreas and duodenum above the root of the mesentery. This attachment divides the surrounding vessels: the portal triad and coeliac branches lie above it, whereas the superior mesenteric vessels emerge below the neck beside the uncinate process, duodenojejunal flexure and jejunum. In the 3D model, the pancreas is focused with the hepatic portal vein passing behind its neck.',
            'Na parede abdominal posterior, a raiz do mesocolo transverso cruza o pâncreas e o duodeno acima da raiz do mesentério. Essa inserção divide os vasos vizinhos: a tríade portal e os ramos do tronco celíaco ficam acima dela, enquanto os vasos mesentéricos superiores emergem abaixo do colo ao lado do processo uncinado, da flexura duodenojejunal e do jejuno. No modelo 3D, o pâncreas está em destaque com a veia porta hepática passando atrás do seu colo.'),
        ],
      },
      {
        id: 'pancreas-p03', ref: '3', title: t('The four parts: head, neck, body and tail', 'As quatro partes: cabeça, colo, corpo e cauda'),
        focus: ['pancreas', 'pancreatic_duct', 'duodenum', 'sma', 'ivc_g'], ghost: ['spleen', 'abdominal_aorta_g'], view: 'ant',
        body: [
          t('The external conformation has four parts: the head, with the uncinate process; the neck; the body; and the tail. It measures 12–15 cm long, 2–3 cm wide and 4–5 cm high.',
            'A conformação externa tem quatro partes: a cabeça, com o processo uncinado; o colo; o corpo; e a cauda. Mede 12–15 cm de comprimento, 2–3 cm de largura e 4–5 cm de altura.'),
          t('Arranged in situ from right to left, the head lies inside the curve of the duodenum with the inferior vena cava behind it, while the uncinate process hooks behind the superior mesenteric vein and artery. Inside the head, the bile duct and the main and accessory pancreatic ducts converge to open into the duodenum at the hepatopancreatic ampulla. Extending across in front of the left kidney, the body continues into the tail alongside the anterior border of the spleen.',
            'Disposto in situ da direita para a esquerda, o pâncreas tem a cabeça encaixada na curva do duodeno com a veia cava inferior atrás dela, enquanto o processo uncinado se curva atrás da veia e da artéria mesentéricas superiores. Dentro da cabeça, o colédoco e os ductos pancreáticos principal e acessório convergem para abrir no duodeno pela ampola hepatopancreática. Estendendo-se à frente do rim esquerdo, o corpo continua na cauda junto à borda anterior do baço.'),
        ],
      },
      {
        id: 'pancreas-p04', ref: '4', title: t('Relations of the head: anterior face', 'Relações da cabeça: face anterior'),
        focus: ['pancreas', 'gastroduodenal_a', 'pancreaticoduodenal_a', 'common_hepatic_a', 'duodenum'], ghost: ['sma', 'splenic_a', 'hepatic_portal_v'], view: 'ant',
        body: [
          t('The anterior face of the head has four relations: the gastroduodenal artery, which terminates by dividing into its branches; the posterior parietal peritoneum; the root of the transverse mesocolon; and the duodenum.',
            'A face anterior da cabeça tem quatro relações: a artéria gastroduodenal, que termina se dividindo nos seus ramos; o peritônio parietal posterior; a raiz do mesocolo transverso; e o duodeno.'),
          t('Here on the anterior aspect of the head, the gastroduodenal artery divides into the right gastroepiploic artery and the posterior and anterior superior pancreaticoduodenal arteries. These superior arteries anastomose with the anterior and posterior inferior pancreaticoduodenal arteries from the superior mesenteric artery, while the splenic artery supplies the body and tail through the dorsal pancreatic artery (with right and left branches), the greater pancreatic artery and the artery to the tail. Surrounding the pancreas and duodenum in the retroperitoneum lie the root of the transverse mesocolon and the regional lymph nodes, including the suprapyloric and pancreaticoduodenal nodes.',
            'Aqui na face anterior da cabeça, a artéria gastroduodenal se divide na artéria gastroepiploica direita e nas artérias pancreaticoduodenais superiores posterior e anterior. Essas artérias superiores se anastomosam com as artérias pancreaticoduodenais inferiores anterior e posterior vindas da artéria mesentérica superior, enquanto a artéria esplênica irriga o corpo e a cauda por meio da artéria pancreática dorsal (com ramos direito e esquerdo), da artéria pancreática magna e da artéria da cauda. Ao redor do pâncreas e do duodeno no retroperitônio situam-se a raiz do mesocolo transverso e os linfonodos regionais, incluindo os linfonodos suprapilórico e pancreaticoduodenais.'),
        ],
      },
      {
        id: 'pancreas-p05', ref: '5', title: t('Relations of the head: posterior face', 'Relações da cabeça: face posterior'),
        focus: ['pancreas', 'common_hepatic_duct', 'pancreaticoduodenal_a', 'duodenum', 'ivc_g'], ghost: ['sma', 'splenic_v', 'abdominal_aorta_g'], view: 'ant',
        body: [
          t('The posterior face of the head is related to four structures: the common bile duct, the pancreaticoduodenal arteries and veins, the duodenum and the right kidney.',
            'A face posterior da cabeça se relaciona com quatro estruturas: o colédoco, as artérias e veias pancreaticoduodenais, o duodeno e o rim direito.'),
          t('Behind the head and the duodenal C-loop run the common bile duct and the posterior superior and posterior inferior pancreaticoduodenal vessels. Behind the neck, the splenic vein—receiving pancreatic branches and the inferior mesenteric vein—joins the superior mesenteric vein to form the hepatic portal vein below the coeliac trunk. Moving from right to left across the posterior contact areas: the head rests against the right kidney, common bile duct, superior mesenteric vessels and duodenum; the neck against the retropancreatic fascia (fascia of Treitz); the body against the left kidney; and the tail against the spleen.',
            'Atrás da cabeça e da alça duodenal em C correm o colédoco e os vasos pancreaticoduodenais superiores posteriores e inferiores posteriores. Atrás do colo, a veia esplênica — recebendo ramos pancreáticos e a veia mesentérica inferior — une-se à veia mesentérica superior para formar a veia porta hepática abaixo do tronco celíaco. Da direita para a esquerda pelas áreas de contato posteriores, a cabeça apoia-se no rim direito, no colédoco, nos vasos mesentéricos superiores e no duodeno; o colo, na fáscia retropancreática (fáscia de Treitz); o corpo, no rim esquerdo; e a cauda, no baço.'),
        ],
      },
      {
        id: 'pancreas-p06', ref: '6', title: t('The neck: why it is short', 'O colo: por que é curto'),
        focus: ['pancreas', 'celiac_trunk', 'sma', 'splenic_a'], ghost: ['stomach', 'spleen', 'duodenum', 'hepatic_portal_v'], view: 'ant',
        body: [
          t('The neck is short because it lies between the coeliac trunk and the superior mesenteric vessels, so there is little room for it. Above the neck, the coeliac trunk gives off the common hepatic and splenic arteries; below the neck, the superior mesenteric vessels emerge next to the uncinate process and the duodenojejunal junction.',
            'O colo é curto porque fica entre o tronco celíaco e os vasos mesentéricos superiores, então há pouco espaço para ele. Acima do colo, o tronco celíaco dá origem às artérias hepática comum e esplênica; abaixo do colo, os vasos mesentéricos superiores emergem ao lado do processo uncinado e da junção duodenojejunal.'),
          t('Anteriorly across the head and neck, the gastroduodenal artery gives off the anterior superior pancreaticoduodenal vessels to meet the anterior inferior pancreaticoduodenal branch from the superior mesenteric artery and vein, with the hepatic portal vein and gastric vessels above and the inferior mesenteric vein and jejunal vessels below. Posteriorly across the gland, the contact areas span the right kidney, duodenum, common bile duct, SMA, SMV, fascia of Treitz, left kidney and spleen.',
            'Anteriormente na cabeça e no colo, a artéria gastroduodenal origina os vasos pancreaticoduodenais superiores anteriores para encontrar o ramo anterior dos vasos pancreaticoduodenais inferiores vindos da artéria e veia mesentéricas superiores, com a veia porta hepática e os vasos gástricos acima e a veia mesentérica inferior e os vasos jejunais abaixo. Posteriormente pela glândula, as áreas de contato abrangem o rim direito, o duodeno, o colédoco, a AMS, a VMS, a fáscia de Treitz, o rim esquerdo e o baço.'),
        ],
      },
      {
        id: 'pancreas-p07', ref: '7', title: t('The body: a triangular pyramid', 'O corpo: uma pirâmide triangular'),
        focus: ['pancreas', 'splenic_a', 'splenic_v', 'hepatic_portal_v'], ghost: ['abdominal_aorta_g', 'ivc_g', 'spleen', 'stomach', 'sma'], view: 'ant',
        body: [
          t('The body is a triangular pyramid with an anterior face, a posterior face, a superior margin and an inferior margin.',
            'O corpo é uma pirâmide triangular, com uma face anterior, uma face posterior, uma margem superior e uma margem inferior.'),
          t('The neck and body arch anteriorly across the portal vein, superior mesenteric artery, splenic vein, left renal vein, inferior vena cava, aorta, left crus and left kidney, while the second part of the duodenum sits to the right of the head. Extending between the neck and the tail, the body carries the coeliac trunk and tortuous splenic artery along its superior margin, framed by the stomach above, the spleen and left colic flexure laterally, and the jejunum and left kidney below.',
            'O colo e o corpo passam anteriormente sobre a veia porta, a artéria mesentérica superior, a veia esplênica, a veia renal esquerda, a veia cava inferior, a aorta, o pilar esquerdo e o rim esquerdo, enquanto a segunda parte do duodeno fica à direita da cabeça. Estendendo-se entre o colo e a cauda, o corpo tem o tronco celíaco e a tortuosa artéria esplênica percorrendo sua margem superior, com o estômago acima, o baço e a flexura cólica esquerda lateralmente, e o jejuno e o rim esquerdo abaixo.'),
        ],
      },
      {
        id: 'pancreas-p08', ref: '8', title: t('Relations of the body and tail', 'Relações do corpo e da cauda'),
        focus: ['pancreas', 'splenic_v', 'splenic_a'], ghost: ['stomach', 'abdominal_aorta_g', 'sma', 'duodenum', 'spleen'], view: 'ant',
        body: [
          t('Anteriorly, the body is related to the organ that lies against the posterior surface of the stomach, through the omental bursa and the root of the transverse mesocolon. Posteriorly, it is related to the left kidney.',
            'Anteriormente, o corpo se relaciona com o órgão que fica contra a face posterior do estômago, por meio da bolsa omental e da raiz do mesocolo transverso. Posteriormente, relaciona-se com o rim esquerdo.'),
          t('These contact zones partition both surfaces of the gland. Anteriorly, the upper body faces the stomach and the lower body faces the posterior surface of the transverse mesocolon, with the duodenum at the head, the spleen at the tail and the superior mesenteric vessels below. Posteriorly, the left kidney occupies the back of the body, flanked by the spleen at the tail, the retropancreatic fascia (fascia of Treitz) and superior mesenteric vessels behind the neck, and the right kidney, common bile duct and duodenum behind the head.',
            'Essas zonas de contato dividem as duas faces da glândula. Anteriormente, a parte superior do corpo volta-se para o estômago e a parte inferior para a face posterior do mesocolo transverso, com o duodeno na cabeça, o baço na cauda e os vasos mesentéricos superiores abaixo. Posteriormente, o rim esquerdo ocupa o dorso do corpo, ladeado pelo baço na cauda, pela fáscia retropancreática (de Treitz) e pelos vasos mesentéricos superiores atrás do colo, e pelo rim direito, colédoco e duodeno atrás da cabeça.'),
        ],
      },
      {
        id: 'pancreas-p09', ref: '9', title: t('The tail and the pancreaticosplenic ligament', 'A cauda e o ligamento pancreaticoesplênico'),
        focus: ['pancreas', 'spleen', 'splenic_a', 'splenic_v'], ghost: ['stomach', 'gallbladder', 'duodenum', 'descending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('The tail runs towards the left and upward. It is intraperitoneal. The pancreaticosplenic ligament is not always present: it is present when the tail of the pancreas does not touch the spleen. It is usually thin and cord-like, and it is avascular.',
            'A cauda segue para a esquerda e para cima. É intraperitoneal. O ligamento pancreaticoesplênico nem sempre está presente: aparece quando a cauda do pâncreas não toca o baço. Costuma ser fino e em forma de cordão, e é avascular.'),
          t('As the tail extends upward and to the left toward the spleen, it runs alongside the splenic artery in front of the left kidney, while the portal triad, duodenum and transverse mesocolon attachment remain around the head and body. In the left upper quadrant, the tail meets the spleen next to the colon and diaphragm, surrounded by the pancreaticocolic, splenocolic and phrenicocolic ligaments.',
            'Ao estender-se para a esquerda e para cima até o baço, a cauda acompanha a artéria esplênica diante do rim esquerdo, enquanto a tríade portal, o duodeno e a inserção do mesocolo transverso permanecem ao redor da cabeça e do corpo. No quadrante superior esquerdo, a cauda encontra o baço junto ao colo e ao diafragma, cercada pelos ligamentos pancreaticocólico, esplenocólico e frenicocólico.'),
        ],
      },
      {
        id: 'pancreas-p10', ref: '10', title: t('Means of attachment and the fascia of Treitz and Toldt', 'Meios de fixação e as fáscias de Treitz e de Toldt'),
        focus: ['pancreas', 'duodenum', 'ivc_g', 'hepatic_portal_v'], ghost: ['spleen', 'stomach'], view: 'ant',
        body: [
          t('The pancreas is attached by the parietal peritoneum, the duodenum and the retropancreatic fascia of Treitz and Toldt. This fascia is a layer of loose connective tissue behind the pancreas. It is called the fascia of Treitz in the region of the head, and the fascia of Toldt in the region of the body and tail. It contains the vessels that supply the pancreas.',
            'O pâncreas é fixado pelo peritônio parietal, pelo duodeno e pela fáscia retropancreática de Treitz e Toldt. Essa fáscia é uma camada de tecido conjuntivo frouxo atrás do pâncreas. Chama-se fáscia de Treitz na região da cabeça e fáscia de Toldt na região do corpo e da cauda. Ela contém os vasos que irrigam o pâncreas.'),
          t('At the level of the T12–L1 intervertebral disc, the pancreas lies behind the omental bursa, sandwiched between the preduodenopancreatic fascia (fascia of Fredet) in front and the retropancreatic fascia (fascia of Treitz) behind. Behind that fascial plane lie the abdominal aorta, the inferior vena cava and both kidneys—each enclosed within its renal capsule, perirenal space, prerenal anterior and retrorenal posterior renal fasciae, and suprarenal gland, inside the transversalis fascia—while the omental foramen (of Winslow) and hepatic portal vein sit to the right.',
            'No nível do disco intervertebral T12–L1, o pâncreas fica atrás da bolsa omental, entre a fáscia preduodenopancreática (fáscia de Fredet) à frente e a fáscia retropancreática (fáscia de Treitz) atrás. Atrás desse plano fascial situam-se a aorta abdominal, a veia cava inferior e os dois rins — cada um envolto por sua cápsula renal, espaço perirrenal, lâminas pré-renal anterior e retrorrenal posterior da fáscia renal e glândula suprarrenal, dentro da fáscia transversal — enquanto o forame omental (de Winslow) e a veia porta hepática ficam à direita.'),
        ],
      },
      {
        id: 'pancreas-p11', ref: '11–12', title: t('Primarily and secondarily retroperitoneal organs; the peritoneal development', 'Órgãos primária e secundariamente retroperitoneais; o desenvolvimento do peritônio'),
        focus: ['pancreas', 'duodenum', 'descending_colon', 'ascending_colon'], ghost: ['abdominal_aorta_g', 'ivc_g', 'spleen', 'stomach'], view: 'ant',
        body: [
          t('Two groups are separated. The primarily retroperitoneal organs are the aorta, the inferior vena cava, the kidneys, the suprarenal glands, the urinary bladder, the prostate, the vagina and the rectum. The secondarily retroperitoneal organs are the pancreas, the duodenum, and the ascending and descending colon.',
            'Dois grupos são separados. Os órgãos primariamente retroperitoneais são a aorta, a veia cava inferior, os rins, as glândulas suprarrenais, a bexiga urinária, a próstata, a vagina e o reto. Os órgãos secundariamente retroperitoneais são o pâncreas, o duodeno, e os colos ascendente e descendente.'),
          t('Embryologically, the pancreatic bud shifts posteriorly against the body wall to become secondarily retroperitoneal behind the stomach and lesser omentum (hepatogastric ligament), while the hepatic bud grows into the falciform ligament and the splenic bud remains intraperitoneal between the splenorenal and gastrosplenic ligaments (parts of the greater omentum). As the dorsal mesogastrium, transverse mesocolon and mesentery fuse posteriorly, they form the retropancreatic fascia—called the fascia of Treitz behind the head and duodenum, and the fascia of Toldt behind the pancreas and colon.',
            'Embriologicamente, o broto pancreático desloca-se posteriormente contra a parede corporal para se tornar secundariamente retroperitoneal atrás do estômago e do omento menor (ligamento hepatogástrico), enquanto o broto hepático cresce no ligamento falciforme e o broto esplênico permanece intraperitoneal entre os ligamentos esplenorrenal e gastroesplênico (partes do omento maior). À medida que o mesogástrio dorsal, o mesocolo transverso e o mesentério se fundem posteriormente, formam a fáscia retropancreática — chamada fáscia de Treitz atrás da cabeça e do duodeno, e fáscia de Toldt atrás do pâncreas e do colo.'),
        ],
      },
      {
        id: 'pancreas-p13', ref: '13', title: t('The hepatoduodenal ligament and Calot’s triangle', 'O ligamento hepatoduodenal e o triângulo de Calot'),
        focus: ['pancreas', 'gallbladder', 'hepatic_portal_v', 'common_hepatic_a', 'smv'], ghost: ['duodenum', 'caudate_lobe', 'transverse_colon'], view: 'ant',
        body: [
          t('Above the descending part of the duodenum and pancreas, the hepatoduodenal ligament encloses the portal vein, the proper hepatic artery and the common bile duct. Below and in front of the gland lie the root of the transverse mesocolon, the transverse colon, the greater omentum, the duodenojejunal flexure, the superior mesenteric artery and vein and the root of the mesentery.',
            'Acima da parte descendente do duodeno e do pâncreas, o ligamento hepatoduodenal envolve a veia porta, a artéria hepática própria e o colédoco. Abaixo e à frente da glândula ficam a raiz do mesocolo transverso, o colo transverso, o omento maior, a flexura duodenojejunal, a artéria e a veia mesentéricas superiores e a raiz do mesentério.'),
          t('At the hepatoduodenal ligament near the gallbladder, the cystic artery courses within Calot’s triangle alongside the common bile duct, the hepatic portal vein and the proper hepatic artery. Use the 3D model to locate the gallbladder and common bile duct next to the pancreatic head.',
            'No ligamento hepatoduodenal, próximo à vesícula biliar, a artéria cística cursa dentro do triângulo de Calot ao lado do colédoco, da veia porta hepática e da artéria hepática própria. Use o modelo 3D para localizar a vesícula biliar e o colédoco junto à cabeça do pâncreas.'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Which gland does page 1 call the second largest in the gastrointestinal tract?', correct: 'The pancreas', wrong: ['The liver', 'The spleen', 'The thyroid'], why: 'Slide 1: the pancreas is the second biggest gland of the GI tract and a mixed gland.',
        pt: { q: 'Qual glândula a página 1 chama de a segunda maior do trato gastrointestinal?', correct: 'O pâncreas', wrong: ['O fígado', 'O baço', 'A tireoide'], why: 'Slide 1: o pâncreas é a segunda maior glândula do trato gastrointestinal e uma glândula mista.' } },
      { ref: '1', q: 'What is the mean weight and length of the pancreas on slide 1?', correct: '70–80 g and 12–15 cm', wrong: ['150–350 g and 9–14 cm', '5–10 g and 3–5 cm', '400–500 g and 25–30 cm'], why: 'Slide 1: 12–15 cm long, 70–80 g.',
        pt: { q: 'Qual é o peso e o comprimento do pâncreas no slide 1?', correct: '70–80 g e 12–15 cm', wrong: ['150–350 g e 9–14 cm', '5–10 g e 3–5 cm', '400–500 g e 25–30 cm'], why: 'Slide 1: 12–15 cm de comprimento, 70–80 g.' } },
      { ref: '2', q: 'Where does the pancreas lie in relation to the mesocolic spaces?', correct: 'Across both the supramesocolic and submesocolic spaces', wrong: ['Entirely in the supramesocolic space', 'Entirely in the submesocolic space', 'Entirely inside the lesser sac'], why: 'Slide 2: the transverse mesocolon attachment runs along the front of the pancreas, so it lies across both spaces.',
        pt: { q: 'Em relação aos espaços mesocólicos, onde fica o pâncreas?', correct: 'Atravessando os espaços supramesocólico e inframesocólico', wrong: ['Inteiramente no espaço supramesocólico', 'Inteiramente no espaço inframesocólico', 'Inteiramente dentro da bolsa omental'], why: 'Slide 2: a inserção do mesocolo transverso corre pela frente do pâncreas, então ele fica entre os dois espaços.' } },
      { ref: '4', q: 'Which artery ends by dividing into its branches on the anterior face of the head?', correct: 'The gastroduodenal artery', wrong: ['The splenic artery', 'The superior mesenteric artery', 'The left gastric artery'], why: 'Slide 4: the gastroduodenal artery terminates by dividing into its branches.',
        pt: { q: 'Qual artéria termina se dividindo nos seus ramos na face anterior da cabeça?', correct: 'A artéria gastroduodenal', wrong: ['A artéria esplênica', 'A artéria mesentérica superior', 'A artéria gástrica esquerda'], why: 'Slide 4: a artéria gastroduodenal termina se dividindo nos seus ramos.' } },
      { ref: '5', q: 'Which structure lies behind the head of the pancreas, on its posterior face?', correct: 'The common bile duct', wrong: ['The stomach', 'The spleen', 'The transverse mesocolon'], why: 'Slide 5: the posterior face of the head is related to the common bile duct, the pancreaticoduodenal vessels, the duodenum and the right kidney.',
        pt: { q: 'Qual estrutura fica atrás da cabeça do pâncreas, na face posterior?', correct: 'O colédoco', wrong: ['O estômago', 'O baço', 'O mesocolo transverso'], why: 'Slide 5: a face posterior da cabeça se relaciona com o colédoco, os vasos pancreaticoduodenais, o duodeno e o rim direito.' } },
      { ref: '6', q: 'Why is the neck of the pancreas short?', correct: 'It lies between the coeliac trunk and the superior mesenteric vessels', wrong: ['It has no blood supply', 'It is fused with the spleen', 'It lies outside the peritoneum'], why: 'Slide 6: the neck is shorter because it lies between the coeliac trunk and the superior mesenteric vessels.',
        pt: { q: 'Por que o colo do pâncreas é curto?', correct: 'Fica entre o tronco celíaco e os vasos mesentéricos superiores', wrong: ['Não tem irrigação', 'Está fundido com o baço', 'Fica fora do peritônio'], why: 'Slide 6: o colo é mais curto porque fica entre o tronco celíaco e os vasos mesentéricos superiores.' } },
      { ref: '7', q: 'How many faces and margins does the body of the pancreas have, according to slide 7?', correct: 'Two faces and two margins (triangular pyramid)', wrong: ['One face and one margin', 'Four faces and no margins', 'Three faces and one margin'], why: 'Slide 7: body is a triangular pyramid with anterior and posterior faces and superior and inferior margins.',
        pt: { q: 'Quantas faces e margens tem o corpo do pâncreas, segundo o slide 7?', correct: 'Duas faces e duas margens (pirâmide triangular)', wrong: ['Uma face e uma margem', 'Quatro faces e nenhuma margem', 'Três faces e uma margem'], why: 'Slide 7: o corpo é uma pirâmide triangular, com faces anterior e posterior e margens superior e inferior.' } },
      { ref: '8', q: 'Which kidney is related to the posterior surface of the body of the pancreas?', correct: 'The left kidney', wrong: ['The right kidney', 'Both kidneys equally', 'Neither kidney'], why: 'Slide 8: posteriorly, the body is related to the left kidney.',
        pt: { q: 'Qual rim se relaciona com a face posterior do corpo do pâncreas?', correct: 'O rim esquerdo', wrong: ['O rim direito', 'Os dois rins igualmente', 'Nenhum dos rins'], why: 'Slide 8: posteriormente, o corpo se relaciona com o rim esquerdo.' } },
      { ref: '9', q: 'When is the pancreaticosplenic ligament present?', correct: 'When the tail of the pancreas does not touch the spleen', wrong: ['Always, in every person', 'When the tail touches the spleen', 'Only in women'], why: 'Slide 9: not always present; present when the tail of the pancreas does not touch the spleen.',
        pt: { q: 'Quando o ligamento pancreaticoesplênico está presente?', correct: 'Quando a cauda do pâncreas não toca o baço', wrong: ['Sempre, em todas as pessoas', 'Quando a cauda toca o baço', 'Somente nas mulheres'], why: 'Slide 9: nem sempre está presente; está presente quando a cauda do pâncreas não toca o baço.' } },
      { ref: '10', q: 'What is the retropancreatic fascia called in the region of the head?', correct: 'The fascia of Treitz', wrong: ['The fascia of Toldt', 'The fascia of Fredet', 'The fascia of Winslow'], why: 'Slide 10: fascia of Treitz at the head; fascia of Toldt at the body and tail.',
        pt: { q: 'Como se chama a fáscia retropancreática na região da cabeça?', correct: 'Fáscia de Treitz', wrong: ['Fáscia de Toldt', 'Fáscia de Fredet', 'Fáscia de Winslow'], why: 'Slide 10: fáscia de Treitz na cabeça; fáscia de Toldt no corpo e na cauda.' } },
      { ref: '11–12', q: 'Which of these is a primarily retroperitoneal organ?', correct: 'The kidney', wrong: ['The pancreas', 'The duodenum', 'The ascending colon'], why: 'Slide 11: primarily retroperitoneal: aorta, IVC, kidneys, suprarenal glands, bladder, prostate, vagina, rectum; pancreas, duodenum and colon are secondarily retroperitoneal.',
        pt: { q: 'Qual destes é um órgão primariamente retroperitoneal?', correct: 'O rim', wrong: ['O pâncreas', 'O duodeno', 'O colo ascendente'], why: 'Slide 11: primariamente retroperitoneais: aorta, VCI, rins, suprarrenais, bexiga, próstata, vagina, reto; pâncreas, duodeno e colo são secundariamente retroperitoneais.' } },
    ],
  },
  {
    id: 'pancreas-2', title: t('Development, ducts and the sphincters', 'Desenvolvimento, ductos e esfíncteres'),
    cards: [
      {
        id: 'pancreas-p14', ref: '14', title: t('Development: the dorsal and ventral buds', 'Desenvolvimento: os brotos dorsal e ventral'),
        focus: ['pancreas', 'pancreatic_duct', 'duodenum', 'gallbladder'], ghost: ['stomach', 'caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('Growing off the abdominal foregut are a dorsal pancreatic bud and a ventral liver diverticulum. The ventral diverticulum gives rise to the gallbladder and to the ventral pancreatic bud. The hepatic diverticulum gives rise to the hepatocytes, the gallbladder and the entire biliary apparatus.',
            'Crescendo a partir do intestino anterior abdominal estão um broto pancreático dorsal e um divertículo hepático ventral. Do divertículo ventral brotam a vesícula biliar e o broto pancreático ventral. O divertículo hepático dá origem aos hepatócitos, à vesícula biliar e todo o aparelho biliar.'),
          t('Behind the stomach, the ventral pancreatic bud and the common bile duct migrate clockwise around the duodenum into the dorsal mesentery, where the ventral and dorsal buds fuse. Although the ventral bud forms only part of the head of the pancreas, its duct joins that of the dorsal bud to become the main (major) pancreatic duct (of Wirsung), opening at the major duodenal papilla. The remaining proximal portion of the dorsal duct forms the accessory pancreatic duct (duct of Santorini), opening at the minor duodenal papilla.',
            'Atrás do estômago, o broto pancreático ventral e o colédoco migram no sentido horário ao redor do duodeno para dentro do mesentério dorsal, onde os brotos ventral e dorsal se fundem. Embora o broto ventral forme apenas parte da cabeça do pâncreas, seu ducto se une ao do broto dorsal para formar o ducto pancreático principal (de Wirsung), que se abre na papila duodenal maior. A porção proximal restante do ducto dorsal forma o ducto pancreático acessório (ducto de Santorini), que se abre na papila duodenal menor.'),
        ],
      },
      {
        id: 'pancreas-p15', ref: '15–16', title: t('The developing gut in sections, and the papillae', 'O intestino em desenvolvimento em cortes, e as papilas'),
        focus: ['pancreas', 'pancreatic_duct', 'duodenum', 'gallbladder'], view: 'ant', contextOnly: true,
        body: [
          t('During gut rotation, the primordial liver, gallbladder and bile duct lie within the ventral mesogastrium (alongside the free edge of the lesser omentum), while the spleen and dorsal pancreatic bud lie within the dorsal mesogastrium and dorsal mesentery. As the duodenum rotates, the ventral pancreatic bud and bile duct swing around the duodenum into the dorsal mesentery to fuse with the dorsal bud, forming the head, body and tail of the pancreas.',
            'Durante a rotação intestinal, o fígado primitivo, a vesícula biliar e o colédoco situam-se no mesogástrio ventral (junto à borda livre do omento menor), enquanto o baço e o broto pancreático dorsal situam-se no mesogástrio dorsal e no mesentério dorsal. À medida que o duodeno gira, o broto pancreático ventral e o colédoco contornam o duodeno para dentro do mesentério dorsal e se fundem ao broto dorsal, formando a cabeça, o corpo e a cauda do pâncreas.'),
          t('Following fusion, the pancreatic duct system opens onto the duodenal wall at two sites: the main pancreatic duct opens at the major duodenal papilla alongside the biliary tract from the gallbladder, while the accessory pancreatic duct opens separately at the minor duodenal papilla.',
            'Após a fusão, o sistema de ductos pancreáticos abre-se na parede duodenal em dois pontos: o ducto pancreático principal abre-se na papila duodenal maior ao lado da via biliar vinda da vesícula biliar, enquanto o ducto pancreático acessório abre-se separadamente na papila duodenal menor.'),
        ],
      },
      {
        id: 'pancreas-p17', ref: '17', title: t('The normal ducts and their variations', 'Os ductos normais e suas variações'),
        focus: ['pancreas', 'pancreatic_duct', 'common_hepatic_duct'], view: 'ant',
        body: [
          t('In the normal pattern, two pancreatic ducts enter the duodenum alongside the (common) bile duct: the (principal) pancreatic duct (Wirsung) and the accessory pancreatic duct (Santorini), situated near the pancreatic notch.',
            'No padrão normal, dois ductos pancreáticos entram no duodeno ao lado do colédoco: o ducto pancreático principal (de Wirsung) e o ducto pancreático acessório (de Santorini), situados junto à incisura pancreática.'),
          t('Eight anatomical variations of the pancreatic ducts occur: a double accessory pancreatic duct (Santorini); an anastomosis between ducts; crossing ducts; double crossing of ducts; no communication between ducts; a double (principal) pancreatic duct (Wirsung); tortuosity of ducts; and absence of the accessory pancreatic duct (Santorini). None is designated as the commonest variant.',
            'Ocorrem oito variações anatômicas dos ductos pancreáticos: ducto pancreático acessório duplo (Santorini); anastomose entre ductos; cruzamento de ductos; duplo cruzamento de ductos; ausência de comunicação entre ductos; ducto pancreático principal duplo (Wirsung); tortuosidade dos ductos; e ausência do ducto pancreático acessório (Santorini). Nenhuma é apontada como a mais comum.'),
        ],
      },
      {
        id: 'pancreas-p18', ref: '18', title: t('The hepatopancreatic ampulla and the sphincter of Oddi', 'A ampola hepatopancreática e o esfíncter de Oddi'),
        focus: ['pancreas', 'common_hepatic_duct', 'pancreatic_duct', 'duodenum'], view: 'ant',
        body: [
          t('At the hepatopancreatic ampulla inside the wall of the duodenum, the sphincter of Oddi comprises three distinct muscular sphincters: the sphincter of the common bile duct, the sphincter of the pancreatic duct and the sphincter of the hepatopancreatic ampulla.',
            'Na ampola hepatopancreática dentro da parede do duodeno, o esfíncter de Oddi compreende três esfíncteres musculares distintos: o esfíncter do colédoco, o esfíncter do ducto pancreático e o esfíncter da ampola hepatopancreática.'),
          t('Outside the ampulla, the duodenum’s muscularis externa consists of a longitudinal layer and a circular layer, with longitudinal slips of duodenal muscle extending onto the common bile duct beside the pancreatic duct where both converge at the sphincter of the hepatopancreatic ampulla. Use the 3D model to locate the common bile duct and pancreatic duct meeting at the duodenum.',
            'Por fora da ampola, a muscular externa do duodeno é formada por uma camada longitudinal e uma camada circular, com feixes longitudinais do músculo duodenal se estendendo até o colédoco ao lado do ducto pancreático, onde ambos convergem no esfíncter da ampola hepatopancreática. Use o modelo 3D para localizar o colédoco e o ducto pancreático se encontrando no duodeno.'),
        ],
      },
      {
        id: 'pancreas-p19', ref: '19', title: t('The three sphincters at the papilla', 'Os três esfíncteres na papila'),
        focus: ['pancreas', 'common_hepatic_duct', 'pancreatic_duct', 'duodenum'], view: 'ant',
        body: [
          t('Both ducts have their own sphincter: the muscular sphincter of the bile duct and the muscular sphincter of the pancreatic duct. Where both ducts open into the duodenum at the papilla, the muscle fibres of the ampulla form a ring around the two sphincters. This forms a third, supplementary sphincter, the sphincter of the hepatopancreatic ampulla.',
            'Os dois ductos têm cada um seu próprio esfíncter: o esfíncter muscular do colédoco e o esfíncter muscular do ducto pancreático. Na papila, onde os dois ductos se abrem no duodeno, as fibras musculares da ampola formam um anel em torno dos dois esfíncteres. Isso forma um terceiro esfíncter, suplementar: o esfíncter da ampola hepatopancreática.'),
          t('This ampullary sphincter contracts independently of the muscular layer of the duodenum: during fasting it can remain contracted (closed) while the duodenal muscle is relaxed, and during digestion the duodenal muscle contracts while the ampullary sphincter relaxes. Structurally, this junction also includes reinforcing fibres, a longitudinal bundle receiving duodenal muscle fibres, and the sphincter of the pancreatic duct, which is inconstant. Clinically, gallstones can block the ampullary sphincter, obstructing the flow of pancreatic juice and leading to pancreatitis.',
            'Esse esfíncter ampular se contrai independentemente da camada muscular do duodeno: em jejum pode permanecer contraído (fechado) enquanto a musculatura duodenal está relaxada, e durante a digestão a musculatura duodenal se contrai enquanto o esfíncter ampular relaxa. Estruturalmente, essa junção também inclui fibras de reforço, um feixe longitudinal que recebe fibras musculares duodenais e o esfíncter do ducto pancreático, que é inconstante. Clinicamente, cálculos biliares podem bloquear esse esfíncter, obstruindo a saída do suco pancreático e levando à pancreatite.'),
        ],
      },
      {
        id: 'pancreas-p20', ref: '20', title: t('CCK, gallbladder storage and bile concentration', 'CCK, armazenamento na vesícula e concentração da bile'),
        focus: ['gallbladder', 'common_hepatic_duct', 'pancreas'], ghost: ['duodenum', 'caudate_lobe'], view: 'ant',
        body: [
          t('During digestion, lipids inside the duodenum trigger the secretion of cholecystokinin (CCK, also called pancreozymin). CCK causes two coordinated effects: the gallbladder muscle contracts vigorously, and the sphincter of Oddi relaxes, releasing bile through the common bile duct and hepatopancreatic ampulla into the duodenum.',
            'Durante a digestão, lipídios no interior do duodeno desencadeiam a secreção de colecistocinina (CCK, também chamada pancreozimina). A CCK provoca dois efeitos coordenados: a musculatura da vesícula se contrai vigorosamente e o esfíncter de Oddi relaxa, liberando a bile pelo colédoco e pela ampola hepatopancreática para o duodeno.'),
          t('During fasting, the sphincter of Oddi remains closed while the gallbladder stores the bile. As it stores it, the gallbladder absorbs 90% of the water and NaCl (salts), concentrating the remaining components by 10 times.',
            'Em jejum, o esfíncter de Oddi permanece fechado enquanto a vesícula armazena a bile. Durante o armazenamento, a vesícula absorve 90% da água e do NaCl (sais), concentrando os demais componentes em 10 vezes.'),
        ],
      },
    ],
    questions: [
      { ref: '14', q: 'Which duct of the pancreas is formed when the two buds join?', correct: 'The main pancreatic duct (of Wirsung)', wrong: ['The accessory pancreatic duct (of Santorini)', 'The cystic duct', 'The hepatic duct'], why: 'Slide 14: the duct of the ventral bud joins the dorsal bud’s duct to become the major pancreatic duct (Wirsung).',
        pt: { q: 'Qual ducto do pâncreas se forma quando os dois brotos se unem?', correct: 'O ducto pancreático principal (de Wirsung)', wrong: ['O ducto pancreático acessório (de Santorini)', 'O ducto cístico', 'O ducto hepático'], why: 'Slide 14: o ducto do broto ventral se une ao do broto dorsal para formar o ducto pancreático principal (Wirsung).' } },
      { ref: '14', q: 'How much of the head does the ventral pancreatic bud form, according to slide 14?', correct: 'Only part of the head', wrong: ['The whole head', 'The tail', 'The neck'], why: 'Slide 14: the ventral bud forms only part of the head of the pancreas.',
        pt: { q: 'Quanto da cabeça o broto pancreático ventral forma, segundo o slide 14?', correct: 'Apenas parte da cabeça', wrong: ['A cabeça inteira', 'A cauda', 'O colo'], why: 'Slide 14: o broto ventral forma apenas parte da cabeça do pâncreas.' } },
      { ref: '17', q: 'Which variation is listed among the pancreatic ducts?', correct: 'Absence of the accessory pancreatic duct', wrong: ['Absence of the common bile duct as a rule', 'Duplication of the spleen', 'Absence of the duodenum'], why: 'Slide 17 lists absence of the accessory duct among the variations.',
        pt: { q: 'Qual variação aparece entre os ductos pancreáticos?', correct: 'Ausência do ducto pancreático acessório', wrong: ['Ausência do colédoco como regra', 'Duplicação do baço', 'Ausência do duodeno'], why: 'Slide 17 lista a ausência do ducto acessório entre as variações.' } },
      { ref: '19', q: 'What does the sphincter of the hepatopancreatic ampulla contract independently of?', correct: 'The muscular layer of the duodenum', wrong: ['The gallbladder', 'The pancreatic islets', 'The splenic artery'], why: 'Slide 19: the ampullary sphincter contracts independently from the muscular layer of the duodenum.',
        pt: { q: 'De que o esfíncter da ampola hepatopancreática se contrai independentemente?', correct: 'Da camada muscular do duodeno', wrong: ['Da vesícula biliar', 'Das ilhotas pancreáticas', 'Da artéria esplênica'], why: 'Slide 19: o esfíncter ampular se contrai independentemente da camada muscular do duodeno.' } },
      { ref: '19', q: 'What can block the sphincter of the ampulla, leading to pancreatitis?', correct: 'Gallstones', wrong: ['Pancreatic islets', 'Enterokinase', 'Secretin'], why: 'Slide 19: gallstones can block this sphincter and obstruct pancreatic juice, leading to pancreatitis.',
        pt: { q: 'O que pode bloquear o esfíncter da ampola, levando à pancreatite?', correct: 'Cálculos biliares', wrong: ['Ilhotas pancreáticas', 'Enteroquinase', 'Secretina'], why: 'Slide 19: cálculos biliares podem bloquear esse esfíncter e obstruir o suco pancreático, levando à pancreatite.' } },
      { ref: '20', q: 'What does cholecystokinin do during digestion?', correct: 'Contracts the gallbladder and relaxes the sphincter of Oddi', wrong: ['Relaxes the gallbladder and contracts the sphincter of Oddi', 'Stops bile release', 'Raises the pH of the stomach'], why: 'Slide 20: CCK makes the gallbladder muscle contract and the sphincter of Oddi relax, so bile is released.',
        pt: { q: 'O que a colecistocinina faz durante a digestão?', correct: 'Contrai a vesícula e relaxa o esfíncter de Oddi', wrong: ['Relaxa a vesícula e contrai o esfíncter de Oddi', 'Impede a liberação da bile', 'Eleva o pH do estômago'], why: 'Slide 20: a CCK faz a musculatura da vesícula contrair e o esfíncter de Oddi relaxar, liberando a bile.' } },
      { ref: '20', q: 'How much of the water and NaCl does the gallbladder adsorb during fasting, according to slide 20?', correct: '90%', wrong: ['10%', '50%', '99%'], why: 'Slide 20: during fasting the gallbladder adsorbs 90% of water and NaCl, concentrating the other components 10 times.',
        pt: { q: 'Qual a porcentagem de água e NaCl que a vesícula retém em jejum, segundo o slide 20?', correct: '90%', wrong: ['10%', '50%', '99%'], why: 'Slide 20: em jejum a vesícula retém 90% da água e do NaCl, concentrando os outros componentes 10 vezes.' } },
    ],
  },
  {
    id: 'pancreas-3', title: t('Blood supply, venous drainage, innervation and anomalies', 'Irrigação, drenagem venosa, inervação e anomalias'),
    cards: [
      {
        id: 'pancreas-p21', ref: '21', title: t('The arterial supply of the head', 'A irrigação arterial da cabeça'),
        focus: ['gastroduodenal_a', 'pancreaticoduodenal_a', 'sma', 'pancreas', 'duodenum'], ghost: ['celiac_trunk', 'splenic_a', 'left_gastric_a', 'right_gastric_a', 'gastroepiploic_a'], view: 'ant',
        body: [
          t('The head has a double arcade of pancreaticoduodenal arteries. The superior arcade, anterior and posterior, comes from the gastroduodenal artery. The inferior arcade, anterior and posterior, comes from the superior mesenteric artery.',
            'A cabeça tem uma dupla arcada de artérias pancreaticoduodenais. A arcada superior, anterior e posterior, vem da artéria gastroduodenal. A arcada inferior, anterior e posterior, vem da artéria mesentérica superior.'),
          t('Tracing this arterial network from the coeliac trunk: the common hepatic artery gives off the gastroduodenal artery, which divides into the right gastro-omental artery and the superior pancreaticoduodenal arteries (posterior superior and anterior superior). From below, the superior mesenteric artery gives off the inferior pancreaticoduodenal artery, which divides into posterior inferior and anterior inferior branches to close the double arcade along the duodenum; meanwhile, along the upper border of the gland, the splenic artery runs to the spleen and gives off the short gastric and left gastro-omental arteries. In the 3D model, follow the superior arcade from the gastroduodenal artery and the inferior arcade from the superior mesenteric artery.',
            'Seguindo essa rede arterial a partir do tronco celíaco: a artéria hepática comum dá origem à artéria gastroduodenal, que se divide na artéria gastro-omental direita e nas artérias pancreaticoduodenais superiores (superior posterior e superior anterior). Por baixo, a artéria mesentérica superior dá origem à artéria pancreaticoduodenal inferior, que se divide em ramos inferior posterior e inferior anterior para fechar a dupla arcada ao longo do duodeno; enquanto isso, pela borda superior da glândula, a artéria esplênica segue até o baço emitindo as artérias gástricas curtas e gastro-omental esquerda. No modelo 3D, siga a arcada superior a partir da gastroduodenal e a inferior a partir da mesentérica superior.'),
        ],
      },
      {
        id: 'pancreas-p22', ref: '22', title: t('The splenic artery and the body and tail', 'A artéria esplênica e o corpo e a cauda'),
        focus: ['splenic_a', 'pancreas', 'gastroduodenal_a', 'pancreaticoduodenal_a'], ghost: ['celiac_trunk', 'common_hepatic_a', 'sma', 'spleen'], view: 'ant',
        body: [
          t('The body and tail are supplied by the splenic artery, which is very tortuous. It gives three pancreatic branches. (1) The dorsal pancreatic artery runs downward and divides into two. The right branch goes towards the uncinate process and anastomoses with the anterior superior pancreaticoduodenal arcade. The left branch is the bigger one: it is the inferior pancreatic artery, which runs towards the tail. (2) The greater pancreatic artery, the arteria pancreatica magna, anastomoses with the inferior pancreatic artery. (3) The artery to the tail, the arteria caudae pancreatis, also anastomoses with the inferior pancreatic artery.',
            'O corpo e a cauda são irrigados pela artéria esplênica, que é muito tortuosa. Ela dá três ramos pancreáticos. (1) A artéria pancreática dorsal desce e se divide em duas. O ramo direito vai para o processo uncinado e se anastomosa com a arcada pancreaticoduodenal superior anterior. O ramo esquerdo é o maior: é a artéria pancreática inferior, que segue para a cauda. (2) A artéria pancreática magna, a arteria pancreatica magna, anastomosa-se com a artéria pancreática inferior. (3) A artéria da cauda, a arteria caudae pancreatis, também se anastomosa com a artéria pancreática inferior.'),
          t('Together with the coeliac trunk, the common hepatic and gastroduodenal arteries and the superior mesenteric artery, these branches of the splenic artery build an extensive anastomotic network around the pancreas. On the posterior aspect of the gland, the greater, inferior and dorsal pancreatic arteries link via an anastomotic branch with the posterior pancreaticoduodenal arcades, running alongside the common bile duct and the supraduodenal artery. The 3D model focuses the splenic artery along the upper border of the body and tail.',
            'Junto com o tronco celíaco, as artérias hepática comum e gastroduodenal e a artéria mesentérica superior, esses ramos da artéria esplênica formam uma ampla rede anastomótica ao redor do pâncreas. Na face posterior da glândula, as artérias pancreática magna, inferior e dorsal conectam-se por um ramo anastomótico com as arcadas pancreaticoduodenais posteriores, ao lado do colédoco e da artéria supraduodenal. O modelo 3D destaca a artéria esplênica ao longo da margem superior do corpo e da cauda.'),
        ],
      },
      {
        id: 'pancreas-p23', ref: '23', title: t('Venous drainage of the body and tail', 'Drenagem venosa do corpo e da cauda'),
        focus: ['splenic_v', 'smv', 'hepatic_portal_v', 'imv', 'gastric_v'], ghost: ['pancreas', 'spleen'], view: 'ant',
        body: [
          t('The body and tail drain mainly into the splenic vein. Leaving the spleen, the splenic vein runs medially behind the body and tail of the pancreas, collecting pancreatic tributaries—including the (great) pancreatic vein—as well as the short gastric veins, the left gastro-omental vein and the inferior mesenteric vein.',
            'O corpo e a cauda drenam principalmente para a veia esplênica. Saindo do baço, a veia esplênica segue medialmente por trás do corpo e da cauda do pâncreas, recebendo tributárias pancreáticas — incluindo a grande veia pancreática — além das veias gástricas curtas, da veia gastro-omental esquerda e da veia mesentérica inferior.'),
          t('Behind the neck of the pancreas, the splenic vein joins the superior mesenteric vein (which receives the right gastro-omental and the anterior superior, anterior inferior and posterior inferior pancreaticoduodenal veins) to form the hepatic portal vein, which also receives the right gastric and posterior superior pancreaticoduodenal veins. The 3D model shows the splenic vein running behind the body and tail.',
            'Atrás do colo do pâncreas, a veia esplênica une-se à veia mesentérica superior (que recebe a veia gastro-omental direita e as veias pancreaticoduodenais superior anterior, inferior anterior e inferior posterior) para formar a veia porta hepática, que também recebe as veias gástrica direita e pancreaticoduodenal superior posterior. O modelo 3D mostra a veia esplênica passando atrás do corpo e da cauda.'),
        ],
      },
      {
        id: 'pancreas-p24', ref: '24', title: t('Venous drainage of the head', 'Drenagem venosa da cabeça'),
        focus: ['smv', 'hepatic_portal_v', 'pancreas', 'duodenum'], ghost: ['gastric_v', 'splenic_v', 'imv', 'ileocolic_a'], view: 'ant',
        body: [
          t('The head is drained by the pancreaticoduodenal veins in two groups. The two inferior pancreaticoduodenal veins and the anterior superior pancreaticoduodenal vein drain into the superior mesenteric vein. The posterior superior pancreaticoduodenal vein drains into the portal vein.',
            'A cabeça é drenada pelas veias pancreaticoduodenais em dois grupos. As duas veias pancreaticoduodenais inferiores e a veia pancreaticoduodenal superior anterior drenam para a veia mesentérica superior. A veia pancreaticoduodenal superior posterior drena para a veia porta.'),
          t('These pancreaticoduodenal and pancreatic veins around the pancreatic head and superior mesenteric vein belong to the wider portal system—which drains blood from the spleen, stomach (left gastric with oesophageal veins, right gastric, short gastric and gastro-omental veins), gallbladder (cystic vein), small intestine (jejunal and ileal veins) and colon and rectum (middle colic, right colic, ileocolic, appendicular, left colic, sigmoid and superior rectal veins via the superior and inferior mesenteric veins), alongside the azygos and hemiazygos venous connection.',
            'Essas veias pancreaticoduodenais e pancreáticas ao redor da cabeça do pâncreas e da veia mesentérica superior integram o sistema porta mais amplo — que drena o sangue do baço, do estômago (veia gástrica esquerda com veias esofágicas, gástrica direita, gástricas curtas e gastro-omentais), da vesícula biliar (veia cística), do intestino delgado (veias jejunais e ileais) e do colo e reto (veias cólica média, cólica direita, ileocólica, apendicular, cólica esquerda, sigmoides e retal superior pelas veias mesentéricas superior e inferior), além da conexão venosa com as veias ázigos e hemiázigos.'),
        ],
      },
      {
        id: 'pancreas-p25', ref: '25', title: t('Innervation of the pancreas', 'Inervação do pâncreas'),
        focus: ['pancreas', 'celiac_trunk'], ghost: ['stomach', 'duodenum', 'spleen'], view: 'ant',
        body: [
          t('The sympathetic supply comes from T5–T8, through the coeliac ganglion. The parasympathetic supply is the vagus nerve.',
            'A inervação simpática vem de T5–T8, pelo gânglio celíaco. A inervação parassimpática é o nervo vago.'),
          t('Follow the sympathetic fibres from T5–T8 through the splanchnic nerves to the coeliac ganglion. From there they reach the pancreas. The coeliac ganglion also sends fibres toward the stomach, liver, gallbladder and small intestine. The superior and inferior mesenteric ganglia lie below the coeliac ganglion along the abdominal autonomic routes. The superior, middle and inferior cervical ganglia belong to the sympathetic chain higher in the neck. The pancreas receives parasympathetic fibres from the vagus nerve (CN X). The vagus also reaches the stomach, liver, gallbladder, intestines and kidney. Cranial nerves III, VII and IX carry other parasympathetic pathways in the head. The sacral parasympathetic nerves reach lower viscera, including the urinary bladder.',
            'Siga as fibras simpáticas de T5–T8 pelos nervos esplâncnicos até o gânglio celíaco. Dali elas chegam ao pâncreas. O gânglio celíaco também envia fibras em direção ao estômago, ao fígado, à vesícula biliar e ao intestino delgado. Os gânglios mesentéricos superior e inferior ficam abaixo do celíaco, ao longo das vias autonômicas abdominais. Os gânglios cervicais superior, médio e inferior pertencem à cadeia simpática, mais acima no pescoço. O pâncreas recebe fibras parassimpáticas do nervo vago (NC X). O vago também chega ao estômago, ao fígado, à vesícula biliar, aos intestinos e ao rim. Os nervos cranianos III, VII e IX conduzem outras vias parassimpáticas na cabeça. Os nervos parassimpáticos sacrais chegam às vísceras inferiores, incluindo a bexiga.'),
        ],
      },
      {
        id: 'pancreas-p26', ref: '26', title: t('Congenital anomalies: annular pancreas and aberrant tissue', 'Anomalias congênitas: pâncreas anular e tecido aberrante'),
        focus: ['pancreas', 'duodenum', 'stomach', 'spleen'], ghost: ['gallbladder', 'ileum'], view: 'ant',
        body: [
          t('An annular pancreas occurs when the pancreas encircles and constricts the duodenum. This happens when the ventral pancreatic bud is bifid and passes around both sides of the duodenum. Pancreatic tissue can also develop abnormally in many locations in the gastrointestinal tract, in the spleen and even in the lungs.',
            'O pâncreas anular ocorre quando o pâncreas circunda e constringe o duodeno. Isso acontece quando o broto pancreático ventral é bífido e passa em volta dos dois lados do duodeno. Tecido pancreático também pode se desenvolver de forma anormal em muitos locais do trato gastrointestinal, no baço e até nos pulmões.'),
          t('The reported sites of aberrant pancreatic tissue are ranked in approximate order of frequency: 1. duodenum; 2. stomach; 3. jejunum; 4. ileum; 5. Meckel’s diverticulum; 6. gallbladder; 7. splenic capsule; and 8. oesophagus. In the stomach, such ectopic tissue typically forms a nodule protruding on the mucosal aspect and seated within the gastric submucosa.',
            'Os locais relatados de tecido pancreático aberrante são classificados em ordem aproximada de frequência: 1. duodeno; 2. estômago; 3. jejuno; 4. íleo; 5. divertículo de Meckel; 6. vesícula biliar; 7. cápsula esplênica; e 8. esôfago. No estômago, esse tecido ectópico forma um nódulo na face mucosa situado dentro da submucosa gástrica.'),
        ],
      },
    ],
    questions: [
      { ref: '21', q: 'Where does the superior arcade of pancreaticoduodenal arteries come from?', correct: 'The gastroduodenal artery', wrong: ['The superior mesenteric artery', 'The splenic artery', 'The coeliac trunk directly'], why: 'Slide 21: superior arcade (anterior and posterior) from the gastroduodenal artery; the inferior arcade comes from the SMA.',
        pt: { q: 'De onde vem a arcada superior das artérias pancreaticoduodenais?', correct: 'Da artéria gastroduodenal', wrong: ['Da artéria mesentérica superior', 'Da artéria esplênica', 'Diretamente do tronco celíaco'], why: 'Slide 21: a arcada superior (anterior e posterior) vem da gastroduodenal; a inferior vem da mesentérica superior.' } },
      { ref: '22', q: 'Which branch of the dorsal pancreatic artery is the bigger one, and what is it called?', correct: 'The left branch, the inferior pancreatic artery', wrong: ['The right branch, the uncinate artery', 'The greater pancreatic artery', 'The artery to the tail'], why: 'Slide 22: the left branch is the bigger one and is the inferior pancreatic artery, running to the tail.',
        pt: { q: 'Qual ramo da artéria pancreática dorsal é o maior, e como se chama?', correct: 'O ramo esquerdo, a artéria pancreática inferior', wrong: ['O ramo direito, a artéria uncinada', 'A artéria pancreática magna', 'A artéria da cauda'], why: 'Slide 22: o ramo esquerdo é o maior e é a artéria pancreática inferior, que segue para a cauda.' } },
      { ref: '23', q: 'Where do the body and tail of the pancreas drain mainly?', correct: 'The splenic vein', wrong: ['The inferior vena cava', 'The superior mesenteric vein', 'The azygos vein'], why: 'Slide 23: body and tail mainly drain into the splenic vein.',
        pt: { q: 'Para onde drenam principalmente o corpo e a cauda do pâncreas?', correct: 'A veia esplênica', wrong: ['A veia cava inferior', 'A veia mesentérica superior', 'A veia ázigos'], why: 'Slide 23: o corpo e a cauda drenam principalmente para a veia esplênica.' } },
      { ref: '24', q: 'Which vein receives the posterior superior pancreaticoduodenal vein?', correct: 'The portal vein', wrong: ['The superior mesenteric vein', 'The splenic vein', 'The inferior mesenteric vein'], why: 'Slide 24: the posterior superior pancreaticoduodenal vein drains into the portal vein.',
        pt: { q: 'Qual veia recebe a veia pancreaticoduodenal superior posterior?', correct: 'A veia porta', wrong: ['A veia mesentérica superior', 'A veia esplênica', 'A veia mesentérica inferior'], why: 'Slide 24: a veia pancreaticoduodenal superior posterior drena para a veia porta.' } },
      { ref: '25', q: 'Which ganglion gives the sympathetic supply of the pancreas?', correct: 'The coeliac ganglion (T5–T8)', wrong: ['The inferior mesenteric ganglion', 'The pterygopalatine ganglion', 'The sacral ganglia'], why: 'Slide 25: sympathetic T5–T8 via the coeliac ganglion; parasympathetic is the vagus nerve.',
        pt: { q: 'Qual gânglio dá a inervação simpática do pâncreas?', correct: 'O gânglio celíaco (T5–T8)', wrong: ['O gânglio mesentérico inferior', 'O gânglio pterigopalatino', 'Os gânglios sacrais'], why: 'Slide 25: simpático T5–T8 pelo gânglio celíaco; parassimpático é o nervo vago.' } },
      { ref: '26', q: 'Which site ranks first in the frequency of aberrant pancreatic tissue?', correct: 'The duodenum', wrong: ['The stomach', 'The spleen', 'The oesophagus'], why: 'Slide 26: the sites are ranked by frequency, with the duodenum first and the stomach second.',
        pt: { q: 'Qual local ocupa o primeiro lugar na frequência de tecido pancreático aberrante?', correct: 'O duodeno', wrong: ['O estômago', 'O baço', 'O esôfago'], why: 'Slide 26: os locais são ordenados por frequência, com o duodeno em primeiro e o estômago em segundo.' } },
    ],
  },
  {
    id: 'pancreas-4', title: t('Exocrine pancreas: microanatomy and secretion', 'Pâncreas exócrino: microanatomia e secreção'),
    cards: [
      {
        id: 'pancreas-p27', ref: '27', title: t('The exocrine gland and its ducts', 'A glândula exócrina e seus ductos'),
        focus: ['pancreas', 'pancreatic_duct'], view: 'ant',
        body: [
          t('The pancreas is a compound tubulo-acinar gland. Connective tissue septa divide the pancreatic tissue into distinct lobules, and the blood vessels and the tributaries of the pancreatic ducts run within these septa. The secretory units are the pancreatic acini, each made of simple cuboidal epithelium.',
            'O pâncreas é uma glândula túbulo-acinosa composta. Septos de tecido conjuntivo dividem o tecido pancreático em lóbulos distintos, e os vasos sanguíneos e os afluentes dos ductos pancreáticos correm dentro desses septos. As unidades secretoras são os ácinos pancreáticos, cada um formado por epitélio cúbico simples.'),
          t('The acini are the beginning of the duct system. The ducts drain into progressively larger ducts, which drain into the main pancreatic duct, which runs the length of the pancreas. The output is about 2 litres of pancreatic juice per day, produced by the acinar cells.',
            'Os ácinos são o começo do sistema de ductos. Os ductos drenam para ductos cada vez maiores, que desembocam no ducto pancreático principal, que percorre todo o comprimento do pâncreas. A produção é de cerca de 2 litros de suco pancreático por dia, produzidos pelas células acinares.'),
        ],
      },
      {
        id: 'pancreas-p28', ref: '28', title: t('Activation of the pancreatic enzymes', 'Ativação das enzimas pancreáticas'),
        focus: ['pancreas', 'duodenum'], ghost: ['ileum'], view: 'ant',
        body: [
          t('The pancreas secretes most of its digestive enzymes as inactive precursors, the proenzymes or zymogens. In the duodenum, the enzyme enterokinase breaks down trypsinogen into trypsin, the active protease, and into an inactive residue. Trypsin then activates the other proenzymes, and it is itself able to convert more trypsinogen into trypsin.',
            'O pâncreas secreta a maior parte das suas enzimas digestivas como precursores inativos, os pró-enzimas ou zimogênios. No duodeno, a enzima enteroquinase quebra o tripsinogênio em tripsina, a protease ativa, e em um resíduo inativo. Em seguida a tripsina ativa as outras pró-enzimas, e ela mesma é capaz de converter mais tripsinogênio em tripsina.'),
          t('Leaving the pancreatic duct to enter the duodenal lumen, trypsinogen and the other zymogens reach the surface of the enterocytes. Along the enterocytes, enterokinase converts trypsinogen into trypsin, which then activates the remaining zymogens into active enzymes.',
            'Saindo do ducto pancreático para o lúmen duodenal, o tripsinogênio e os demais zimogênios alcançam a superfície dos enterócitos. Junto aos enterócitos, a enteroquinase converte o tripsinogênio em tripsina, e a tripsina então ativa os demais zimogênios em enzimas ativas.'),
        ],
      },
      {
        id: 'pancreas-p29', ref: '29', title: t('The exocrine lobule and the acinar cell', 'O lóbulo exócrino e a célula acinar'),
        focus: ['pancreas', 'pancreatic_duct', 'common_hepatic_duct'], view: 'ant', contextOnly: true,
        body: [
          t('Many acini form the lobules, which are separated by fibrous septa. Alongside the common bile duct, the main pancreatic duct collects secretions from the lobules, where pancreatic islets (traversed by capillaries) sit next to the pancreatic acini; inside each acinus, centroacinar cells lead via intracellular canaliculi into the intercalated duct and intralobular duct.',
            'Muitos ácinos formam os lóbulos, separados por septos fibrosos. Ao lado do colédoco, o ducto pancreático principal recolhe as secreções dos lóbulos, onde ilhotas pancreáticas (atravessadas por capilares) ficam ao lado dos ácinos pancreáticos; dentro de cada ácino, células centroacinares drenam por canalículos intracelulares para o ducto intercalado e o ducto intralobular.'),
          t('At the cellular level, the exocrine cell of the pancreas lies beside the centroacinar cell and contains rough endoplasmic reticulum, a Golgi complex and zymogen granules clustered at the apex. Use the 3D model only to find the pancreas and its ducts; the cell itself is not in the set.',
            'No nível celular, a célula exócrina do pâncreas fica ao lado da célula centroacinar e contém retículo endoplasmático rugoso, um complexo de Golgi e grânulos de zimogênio agrupados no ápice. Use o modelo 3D apenas para localizar o pâncreas e seus ductos; a célula em si não está no conjunto.'),
        ],
      },
      {
        id: 'pancreas-p30', ref: '30', title: t('Nervous and hormonal control of the exocrine pancreas', 'Controle nervoso e hormonal do pâncreas exócrino'),
        focus: ['pancreas', 'duodenum', 'gallbladder'], ghost: ['spleen', 'stomach'], view: 'ant',
        body: [
          t('Two sets of control are set out. Enzyme secretion from the acinar cells is mainly under vagal cholinergic nerves, and hormonally it is mainly under duodenal cholecystokinin (CCK). The enzymes are granule contents, including proteases, esterase, amylase and lipase.',
            'São apresentados dois conjuntos de controle. A secreção de enzimas pelas células acinares está principalmente sob as fibras vagais colinérgicas, e hormonalmente principalmente sob a colecistocinina (CCK) duodenal. As enzimas são conteúdo de grânulos, entre elas proteases, esterase, amilase e lipase.'),
          t('Bicarbonate and water, moved by the ductal and centroacinar cells, are under neural control that is mainly vagal cholinergic, and hormonal control that is mainly secretin, from the duodenum and jejunum. Locally, the insulo-acinar portal system allows islet hormones to modulate acinar secretion by way of local capillaries, while sympathetic and parasympathetic fibres regulate sphincteric tone.',
            'Bicarbonato e água, transportados pelas células ductais e centroacinares, estão sob controle nervoso principalmente vagal colinérgico, e controle hormonal principalmente pela secretina, vinda do duodeno e do jejuno. Localmente, o sistema porta insulo-acinar permite que os hormônios das ilhotas modulem a secreção acinar por meio de capilares locais, enquanto fibras simpáticas e parassimpáticas regulam o tônus do esfíncter.'),
        ],
      },
      {
        id: 'pancreas-p31', ref: '31–32', title: t('The centroacinar cells', 'As células centroacinares'),
        focus: ['pancreas'], view: 'ant', contextOnly: true,
        body: [
          t('The initial portion of the part that transports secretions is invaginated into the centre of the acinus. This part stains more intensely, so it is conspicuous in histological sections. These cells lie at the centre of the acinus but belong to the secretion-transporting part; they are called centroacinar cells.',
            'A parte inicial da porção que transporta as secreções fica invaginada no centro do ácino. Essa parte cora de forma mais intensa, por isso se destaca nos cortes histológicos. Essas células ficam no centro do ácino, mas pertencem à porção que transporta a secreção; são chamadas células centroacinares.'),
          t('In both cross-section and longitudinal section of the acinus, the glandular cells surround the lumen of the proximal ductule, while the epithelial cells of the proximal ductule project into that lumen as centroacinar cells.',
            'Tanto em corte transversal quanto em corte longitudinal do ácino, as células glandulares envolvem o lúmen do dúctulo proximal, enquanto as células epiteliais do dúctulo proximal se projetam para o interior desse lúmen como células centroacinares.'),
        ],
      },
    ],
    questions: [
      { ref: '27', q: 'What is the secretory unit of the exocrine pancreas?', correct: 'The pancreatic acinus', wrong: ['The islet of Langerhans', 'The centroacinar cell', 'The intercalated duct'], why: 'Slide 27: the secretory units of the exocrine pancreas are the pancreatic acini, of simple cuboidal epithelium.',
        pt: { q: 'Qual é a unidade secretora do pâncreas exócrino?', correct: 'O ácino pancreático', wrong: ['A ilhota de Langerhans', 'A célula centroacinar', 'O ducto intercalado'], why: 'Slide 27: as unidades secretoras do pâncreas exócrino são os ácinos pancreáticos, de epitélio cúbico simples.' } },
      { ref: '27', q: 'About how much pancreatic juice do the acinar cells produce per day?', correct: 'About 2 litres', wrong: ['About 200 ml', 'About 10 litres', 'About 50 ml'], why: 'Slide 27: acinar cells produce approximately 2 litres of pancreatic juice per day.',
        pt: { q: 'Quanto suco pancreático as células acinares produzem por dia?', correct: 'Cerca de 2 litros', wrong: ['Cerca de 200 ml', 'Cerca de 10 litros', 'Cerca de 50 ml'], why: 'Slide 27: as células acinares produzem aproximadamente 2 litros de suco pancreático por dia.' } },
      { ref: '28', q: 'Which enzyme converts trypsinogen into trypsin in the duodenum?', correct: 'Enterokinase', wrong: ['Secretin', 'Gastrin', 'Pepsin'], why: 'Slide 28: in the duodenum, enterokinase breaks down trypsinogen into trypsin.',
        pt: { q: 'Qual enzima converte o tripsinogênio em tripsina no duodeno?', correct: 'Enteroquinase', wrong: ['Secretina', 'Gastrina', 'Pepsina'], why: 'Slide 28: no duodeno, a enteroquinase quebra o tripsinogênio em tripsina.' } },
      { ref: '30', q: 'Which hormone mainly controls enzyme secretion from the acinar cells?', correct: 'Duodenal cholecystokinin (CCK)', wrong: ['Secretin', 'Glucagon', 'Insulin'], why: 'Slide 30: enzyme secretion (acinar cells) is hormonally mainly controlled by duodenal CCK.',
        pt: { q: 'Qual hormônio controla principalmente a secreção de enzimas das células acinares?', correct: 'A colecistocinina (CCK) duodenal', wrong: ['A secretina', 'O glucagon', 'A insulina'], why: 'Slide 30: a secreção de enzimas (células acinares) é controlada hormonalmente principalmente pela CCK duodenal.' } },
      { ref: '30', q: 'Which hormone mainly controls bicarbonate and water secretion from the ductal cells?', correct: 'Secretin', wrong: ['Cholecystokinin', 'Ghrelin', 'Somatostatin'], why: 'Slide 30: bicarbonate and water are hormonally controlled mainly by secretin, from the duodenum and jejunum.',
        pt: { q: 'Qual hormônio controla principalmente a secreção de bicarbonato e água pelas células ductais?', correct: 'A secretina', wrong: ['A colecistocinina', 'A grelina', 'A somatostatina'], why: 'Slide 30: bicarbonato e água são controlados hormonalmente principalmente pela secretina, do duodeno e do jejuno.' } },
    ],
  },
  {
    id: 'pancreas-5', title: t('Endocrine pancreas: islets and hormones', 'Pâncreas endócrino: ilhotas e hormônios'),
    cards: [
      {
        id: 'pancreas-p33', ref: '33', title: t('The pancreatic islets', 'As ilhotas pancreáticas'),
        focus: ['pancreas'], ghost: ['spleen'], view: 'ant',
        body: [
          t('The endocrine pancreas is made of groups of cells that form the pancreatic islets, also called the islets of Langerhans. The islets are scattered between the acini. They account for about 1% of the cell population of the pancreas, and they are more concentrated in the tail.',
            'O pâncreas endócrino é formado por grupos de células que constituem as ilhotas pancreáticas, também chamadas ilhotas de Langerhans. As ilhotas estão espalhadas entre os ácinos. Representam cerca de 1% da população celular do pâncreas, e estão mais concentradas na cauda.'),
          t('The islets are surrounded by connective tissue that forms a net, which helps the arrival of fenestrated capillaries and autonomic nerve fibres. In the 3D model, the pancreas is focused; the microscopic islets are too small to be shown separately.',
            'As ilhotas são cercadas por tecido conjuntivo que forma uma rede, que ajuda a chegada de capilares fenestrados e de fibras nervosas autônomas. No modelo 3D, o pâncreas está em destaque; as ilhotas microscópicas são pequenas demais para aparecer separadas.'),
        ],
      },
      {
        id: 'pancreas-p34', ref: '34', title: t('The islet cell types and their proportions', 'Os tipos de células das ilhotas e suas proporções'),
        focus: ['pancreas', 'spleen'], ghost: ['duodenum', 'stomach'], view: 'ant',
        body: [
          t('The proportions are: β cells 70–80%, α cells 10–15%, and δ cells 5%. The β cells make insulin, the α cells make glucagon, and the δ cells make somatostatin. The PP cells make pancreatic polypeptide, and the ε cells make ghrelin. No proportion is given for PP or ε cells.',
            'As proporções são: células β 70–80%, células α 10–15%, e células δ 5%. As células β fazem insulina, as células α fazem glucagon, e as células δ fazem somatostatina. As células PP fazem o polipeptídeo pancreático, e as células ε fazem grelina. Não há proporção dada para as células PP ou ε.'),
          t('Each islet is enclosed by a capsule and supplied by an arteriole and drained by a venule through an anastomosis of venous and arterial vessels. Its autonomic innervation includes preganglionic vagal fibres synapsing on a ganglion cell, postganglionic sympathetic endings with a vasomotor function, and sympathetic and parasympathetic endings with an excitosecretory function acting on the endocrine cell types.',
            'Cada ilhota é envolvida por uma cápsula, suprida por uma arteríola e drenada por uma vênula por meio de uma anastomose de vasos venosos e arteriais. Sua inervação autonômica inclui fibras vagais pré-ganglionares fazendo sinapse em uma célula ganglionar, terminações simpáticas pós-ganglionares com função vasomotora e terminações simpáticas e parassimpáticas com função excitossecretora sobre os tipos celulares endócrinos.'),
        ],
      },
      {
        id: 'pancreas-p35', ref: '35', title: t('Insulin and glucagon: effects on the target cells', 'Insulina e glucagon: efeitos nas células-alvo'),
        focus: ['pancreas', 'hepatic_portal_v', 'caudate_lobe'], ghost: ['stomach', 'spleen'], view: 'ant',
        body: [
          t('Within each pancreatic islet, the α cells secrete glucagon and the β cells secrete insulin, while the δ cells inhibit both α and β cells. Glucagon and insulin enter the islet capillaries and travel in the blood alongside glucose to reach their target cells.',
            'Dentro de cada ilhota pancreática, as células α secretam glucagon e as células β secretam insulina, enquanto as células δ inibem tanto as células α quanto as β. O glucagon e a insulina entram nos capilares das ilhotas e viajam pelo sangue junto com a glicose até alcançar suas células-alvo.'),
          t('Acting through hormone receptors and glucose transport, glucagon and insulin regulate their target tissues—the liver, white adipose tissue and skeletal muscle: in the fat cell (adipocyte), storing fatty acids; in the hepatocyte, handling glucose, glycogen and fatty acids; and in the muscle cell, handling glucose, glycogen, amino acids and proteins.',
            'Atuando por meio de receptores hormonais e do transporte de glicose, glucagon e insulina regulam seus tecidos-alvo — fígado, tecido adiposo branco e músculo esquelético: no adipócito (célula adiposa), armazenando ácidos graxos; no hepatócito, processando glicose, glicogênio e ácidos graxos; e na célula muscular, processando glicose, glicogênio, aminoácidos e proteínas.'),
        ],
      },
      {
        id: 'pancreas-p36', ref: '36', title: t('Somatostatin, gastrin and pancreatic polypeptide', 'Somatostatina, gastrina e polipeptídeo pancreático'),
        focus: ['pancreas'], ghost: ['stomach', 'duodenum'], view: 'ant',
        body: [
          t('Somatostatin also acts locally on the α and β cells, regulating their activity. Gastrin regulates gastric secretion: it increases the secretion of hydrochloric acid and pepsinogen. Pancreatic polypeptide reduces gastric emptying and intestinal transit.',
            'A somatostatina também age localmente sobre as células α e β, regulando sua atividade. A gastrina regula a secreção gástrica: aumenta a secreção de ácido clorídrico e de pepsinogênio. O polipeptídeo pancreático reduz o esvaziamento gástrico e o trânsito intestinal.'),
          t('Between the islet capillaries, a δ cell links directly to an α cell via a gap (communicating) junction, releasing somatostatin to regulate glucagon secretion locally. In the 3D model, the stomach and the duodenum appear as ghost context because gastrin and pancreatic polypeptide act on them.',
            'Entre os capilares da ilhota, uma célula δ conecta-se diretamente a uma célula α por uma junção comunicante (gap), liberando somatostatina para regular localmente a secreção de glucagon. No modelo 3D, o estômago e o duodeno aparecem como contexto fantasma porque a gastrina e o polipeptídeo pancreático atuam neles.'),
        ],
      },
      {
        id: 'pancreas-p37', ref: '37', title: t('Cell types, stimulation of insulin and neural modulation', 'Tipos celulares, estimulação da insulina e modulação neural'),
        focus: ['pancreas'], ghost: ['spleen'], view: 'ant',
        body: [
          t('Insulin synthesis and secretion are stimulated in two ways. The β cells receive a direct stimulus from glucose at their receptors, and an indirect stimulus after ingestion, through the vagus and gastrointestinal hormones. The cells are linked by gap junctions and discontinuous tight junctions.',
            'A síntese e a secreção de insulina são estimuladas de duas formas. As células β recebem um estímulo direto da glicose em seus receptores, e um estímulo indireto após a ingestão, pelo vago e pelos hormônios gastrointestinais. As células são ligadas por junções comunicantes e por junções oclusivas descontínuas.'),
          t('Somatostatin released by the D (δ) cells inhibits the release of glucagon, and of insulin by the β cells, locally, and it also passes into the vessels to exert distant effects. Together, the four cell types—A (Alpha), B (Beta), D (Delta) and F cells—sit within a neuroinsular complex supplied by fenestrated capillaries and sympathetic and parasympathetic secretomotor and vasomotor terminals, while neuroendocrine cells are also incorporated directly into the exocrine pancreatic acinus and pancreatic duct.',
            'A somatostatina liberada pelas células D (δ) inibe localmente a liberação de glucagon e, pelas células β, a de insulina, e também passa para os vasos para exercer efeitos à distância. Em conjunto, os quatro tipos celulares — células A (Alfa), B (Beta), D (Delta) e F — ficam inseridos em um complexo neuroinsular com capilares fenestrados e terminações secretomotoras e vasomotoras simpáticas e parassimpáticas, enquanto células neuroendócrinas também se incorporam diretamente ao ácino e ao ducto pancreáticos exócrinos.'),
        ],
      },
      {
        id: 'pancreas-p38', ref: '38–39', title: t('Islets differ between species', 'As ilhotas diferem entre as espécies'),
        focus: ['pancreas'], view: 'ant', contextOnly: true,
        body: [
          t('The cellular organization of the islets of Langerhans differs across species (Cabrera et al., PNAS 2006), as demonstrated across mouse, human, monkey and pig islets for glucagon-producing α cells, insulin-producing β cells and somatostatin-producing δ cells. In the mouse, the β cells form the core while the α cells sit at the periphery, with δ cells also at the edge; in humans, the α, β and δ cells are intermingled throughout the islet, while monkey and pig islets display their own species-specific arrangements.',
            'A organização celular das ilhotas de Langerhans difere entre as espécies (Cabrera et al., PNAS 2006), como se observa ao comparar ilhotas de camundongo, humano, macaco e porco quanto às células α (produtoras de glucagon), β (produtoras de insulina) e δ (produtoras de somatostatina). No camundongo, as células β formam o centro enquanto as células α ficam na periferia, com as células δ também na borda; nos humanos, as células α, β e δ ficam misturadas por toda a ilhota, enquanto as ilhotas de macaco e de porco exibem arranjos próprios de cada espécie.'),
          t('At a single β cell, glucose binds its receptor to trigger insulin release into an adjacent capillary, coordinated across adjacent cells through cell junctions and under autonomic control: sympathetic fibres are inhibitory, whereas vagal fibres are stimulatory.',
            'Em uma célula β isolada, a glicose se liga ao seu receptor para desencadear a liberação de insulina para um capilar adjacente, coordenada entre células vizinhas por junções celulares e sob controle autonômico: a fibra simpática é inibitória, enquanto a fibra vagal é estimulatória.'),
        ],
      },
    ],
    questions: [
      { ref: '33', q: 'Where are the pancreatic islets more concentrated?', correct: 'In the tail', wrong: ['In the head', 'In the neck', 'In the uncinate process'], why: 'Slide 33: the islets are scattered between the acini and more concentrated at the tail of the pancreas.',
        pt: { q: 'Onde as ilhotas pancreáticas estão mais concentradas?', correct: 'Na cauda', wrong: ['Na cabeça', 'No colo', 'No processo uncinado'], why: 'Slide 33: as ilhotas estão espalhadas entre os ácinos e mais concentradas na cauda do pâncreas.' } },
      { ref: '34', q: 'Which cells make insulin, according to slide 34?', correct: 'β (B) cells', wrong: ['α (A) cells', 'δ (D) cells', 'PP (F) cells'], why: 'Slide 34: β cells, 70–80%, make insulin.',
        pt: { q: 'Quais células fazem a insulina, segundo o slide 34?', correct: 'Células β (B)', wrong: ['Células α (A)', 'Células δ (D)', 'Células PP (F)'], why: 'Slide 34: células β, 70–80%, fazem insulina.' } },
      { ref: '34', q: 'What percentage of islet cells are δ cells, according to the slide?', correct: '5%', wrong: ['10–15%', '70–80%', '1%'], why: 'Slide 34: δ cells 5%, α 10–15%, β 70–80%.',
        pt: { q: 'Qual a porcentagem de células δ nas ilhotas, segundo o slide?', correct: '5%', wrong: ['10–15%', '70–80%', '1%'], why: 'Slide 34: células δ 5%, α 10–15%, β 70–80%.' } },
      { ref: '36', q: 'What does pancreatic polypeptide do?', correct: 'Reduces gastric emptying and intestinal transit', wrong: ['Increases hydrochloric acid secretion', 'Makes the gallbladder contract', 'Causes insulin release'], why: 'Slide 36: pancreatic polypeptide reduces gastric emptying and intestinal transit.',
        pt: { q: 'O que faz o polipeptídeo pancreático?', correct: 'Reduz o esvaziamento gástrico e o trânsito intestinal', wrong: ['Aumenta a secreção de ácido clorídrico', 'Faz a vesícula contrair', 'Causa a liberação de insulina'], why: 'Slide 36: o polipeptídeo pancreático reduz o esvaziamento gástrico e o trânsito intestinal.' } },
      { ref: '37', q: 'How does somatostatin act on the β cells, according to slide 37?', correct: 'Locally, inhibiting insulin release, and also reaching the vessels for distant effects', wrong: ['Only through the vagus nerve', 'It stimulates insulin release strongly', 'It has no effect on the islets'], why: 'Slide 37: somatostatin from D cells inhibits glucagon and β-cell insulin release locally and also acts at a distance.',
        pt: { q: 'Como a somatostatina age sobre as células β, segundo o slide 37?', correct: 'Localmente, inibindo a liberação de insulina, e também atingindo os vasos para efeitos à distância', wrong: ['Somente pelo nervo vago', 'Estimula fortemente a liberação de insulina', 'Não tem efeito sobre as ilhotas'], why: 'Slide 37: a somatostatina das células D inibe localmente a liberação de glucagon e de insulina pelas células β, e também age à distância.' } },
      { ref: '38–39', q: 'In which animal are the α, β and δ cells intermingled?', correct: 'Human', wrong: ['Mouse, where β cells form the core', 'Pig, where the islets are only β cells', 'Monkey, where islets are absent'], why: 'Slide 38: in humans α, β and δ cells are intermingled; in the mouse, β cells form the core with α at the periphery.',
        pt: { q: 'Em qual animal as células α, β e δ estão misturadas?', correct: 'Humano', wrong: ['Camundongo, onde as células β formam o centro', 'Porco, onde as ilhotas são só de células β', 'Macaco, onde não há ilhotas'], why: 'Slide 38: nos humanos as células α, β e δ estão misturadas; no camundongo, as células β formam o centro e as α ficam na periferia.' } },
    ],
  },
  {
    id: 'spleen-6', title: t('Spleen: location, surfaces and relations', 'Baço: localização, faces e relações'),
    cards: [
      {
        id: 'pancreas-p41', ref: '41', title: t('The spleen: a secondary lymphatic organ', 'O baço: um órgão linfático secundário'),
        focus: ['spleen'], ghost: ['pancreas', 'stomach', 'diaphragm_g'], view: 'ant',
        body: [
          t('The spleen is a secondary lymphatic organ. Its size varies with sex and age, and it is biggest at puberty. In an adult it is usually 9–14 cm long, 6–8 cm wide and 3–5 cm thick. Its weight depends on the volume of blood it contains, and it weighs 150–350 g.',
            'O baço é um órgão linfático secundário. Seu tamanho varia com o sexo e a idade, e é maior na puberdade. No adulto costuma medir 9–14 cm de comprimento, 6–8 cm de largura e 3–5 cm de espessura. Seu peso depende do volume de sangue que contém, e varia de 150 a 350 g.'),
          t('It lies in the left hypochondrium, below the diaphragm, between the stomach and the left kidney. Along the thoracic cage, the spleen sits between the midaxillary and scapular lines, directly opposite the ninth, tenth and eleventh ribs, with the tail of the pancreas, the splenic artery and vein and the left kidney beside it.',
            'Fica no hipocôndrio esquerdo, abaixo do diafragma, entre o estômago e o rim esquerdo. Na parede torácica, o baço situa-se entre as linhas axilar média e escapular, exatamente em frente à nona, à décima e à décima primeira costelas, tendo ao lado a cauda do pâncreas, a artéria e a veia esplênicas e o rim esquerdo.'),
        ],
      },
      {
        id: 'pancreas-p42', ref: '42', title: t('Palpation and Traube’s semilunar space', 'Palpação e o espaço semilunar de Traube'),
        focus: ['spleen'], view: 'ant',
        body: [
          t('The spleen lies beside vertebra T12 under cover of the lower ribs, which makes it difficult to palpate. Clinically, Traube’s semilunar space serves as the surface landmark associated with this region.',
            'O baço fica ao lado da vértebra T12, protegido pelas costelas inferiores, o que o torna difícil de palpar. Clinicamente, o espaço semilunar de Traube serve como o ponto de referência clínico associado a essa região.'),
        ],
      },
      {
        id: 'pancreas-p43', ref: '43', title: t('Shape, surfaces, borders and poles', 'Forma, faces, bordas e polos'),
        focus: ['spleen', 'diaphragm_g'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The spleen is bean-shaped and made of soft tissue, which is difficult for a surgeon to suture. It has two surfaces. The diaphragmatic surface is superior and lateral. The visceral surface is inferior and medial, and it contains the splenic hilum, where the vessels, nerves and lymphatics enter. The two surfaces are separated by an anterosuperior and a posteroinferior border. It has a superior and an inferior extremity, the poles.',
            'O baço tem forma de feijão e é feito de tecido mole, que é difícil de suturar para um cirurgião. Tem duas faces. A face diafragmática é superior e lateral. A face visceral é inferior e medial, e contém o hilo esplênico, por onde entram os vasos, os nervos e os linfáticos. As duas faces são separadas por uma borda anterossuperior e uma borda posteroinferior. Tem um polo superior e um polo inferior, as extremidades.'),
          t('The diaphragmatic surface is convex, matching the underside of the dome of the diaphragm, and through it relates to the left pleural costodiaphragmatic recess, the lower lobe of the left lung and the rib cage. On the visceral surface, the hilum transmits the splenic artery and vein and separates the gastric, renal and colic surfaces; in anatomical descriptions of this surface, the poles and margins are also termed the posterior and anterior extremities and the superior and inferior borders.',
            'A face diafragmática é convexa, acompanhando a face inferior da cúpula do diafragma, e através dela relaciona-se com o recesso costodiafragmático pleural esquerdo, o lobo inferior do pulmão esquerdo e a caixa torácica. Na face visceral, o hilo dá passagem à artéria e à veia esplênicas e separa as faces gástrica, renal e cólica; em descrições anatômicas dessa face, os polos e as margens também recebem os nomes de extremidades posterior e anterior e bordas superior e inferior.'),
        ],
      },
      {
        id: 'pancreas-p44', ref: '44', title: t('The visceral surface: gastric, renal and colic impressions', 'A face visceral: impressões gástrica, renal e cólica'),
        focus: ['spleen', 'stomach', 'pancreas', 'descending_colon'], ghost: ['transverse_colon', 'gallbladder'], view: 'ant',
        body: [
          t('The visceral surface is concave and has three impressions. The gastric impression faces anteromedially, against the posterior part of the fundus, the upper body and the greater curvature of the stomach. The renal impression lies on the posteroinferior part, against the upper lateral area of the front of the left kidney, and sometimes the suprarenal gland. The colic impression lies at the inferior pole, against the splenic flexure of the colon and the phrenicocolic ligament.',
            'A face visceral é côncava e tem três impressões. A impressão gástrica se volta para a frente e para dentro, contra a parte posterior do fundo, o corpo superior e a curvatura maior do estômago. A impressão renal fica na parte posteroinferior, contra a área lateral superior da face anterior do rim esquerdo, e às vezes a glândula suprarrenal. A impressão cólica fica no polo inferior, contra a flexura esplênica do colo e o ligamento frenicocólico.'),
          t('The gastric and renal parts are separated by the hilum, which lies directly against the omental bursa and the tail of the pancreas. Near the gastric impression against the stomach, the anterior extremity rests against the left colic flexure. In the 3D model, the spleen is focused with the pancreas and the descending colon as context, so the colic impression can be found near the splenic flexure.',
            'As partes gástrica e renal são separadas pelo hilo, que fica em contato direto com a bolsa omental e com a cauda do pâncreas. Junto à impressão gástrica voltada para o estômago, a extremidade anterior apoia-se contra a flexura cólica esquerda. No modelo 3D, o baço está em destaque com o pâncreas e o colo descendente como contexto, para que a impressão cólica seja encontrada perto da flexura esplênica.'),
        ],
      },
    ],
    questions: [
      { ref: '41', q: 'What is the adult weight range of the spleen?', correct: '150–350 g', wrong: ['70–80 g', '400–500 g', '20–40 g'], why: 'Slide 41: the spleen weighs 150–350 g, depending on the volume of blood it contains.',
        pt: { q: 'Qual é a faixa de peso do baço no adulto?', correct: '150–350 g', wrong: ['70–80 g', '400–500 g', '20–40 g'], why: 'Slide 41: o baço pesa 150–350 g, dependendo do volume de sangue que contém.' } },
      { ref: '41', q: 'Between which two structures does the spleen lie?', correct: 'The stomach and the left kidney', wrong: ['The liver and the right kidney', 'The pancreas and the duodenum', 'The diaphragm and the colon'], why: 'Slide 41: in the left hypochondrium, below the diaphragm, between the stomach and the left kidney.',
        pt: { q: 'Entre quais duas estruturas fica o baço?', correct: 'O estômago e o rim esquerdo', wrong: ['O fígado e o rim direito', 'O pâncreas e o duodeno', 'O diafragma e o colo'], why: 'Slide 41: no hipocôndrio esquerdo, abaixo do diafragma, entre o estômago e o rim esquerdo.' } },
      { ref: '42', q: 'Which clinical landmark does page 42 name?', correct: 'Traube’s semilunar space', wrong: ['Calot’s triangle', 'Winslow’s foramen', 'Morison’s pouch'], why: 'Slide 42: the spleen is difficult to palpate; the page names Traube’s semilunar space.',
        pt: { q: 'Qual ponto de referência clínico a página 42 nomeia?', correct: 'O espaço semilunar de Traube', wrong: ['O triângulo de Calot', 'O forame de Winslow', 'O fundo de saco de Morison'], why: 'Slide 42: o baço é difícil de palpar; a página nomeia o espaço semilunar de Traube.' } },
      { ref: '43', q: 'Which surface of the spleen is convex and matches the dome of the diaphragm?', correct: 'The diaphragmatic surface', wrong: ['The visceral surface', 'The gastric impression', 'The renal impression'], why: 'Slide 43: the diaphragmatic surface is convex, matching the underside of the dome of the diaphragm.',
        pt: { q: 'Qual face do baço é convexa e acompanha a cúpula do diafragma?', correct: 'A face diafragmática', wrong: ['A face visceral', 'A impressão gástrica', 'A impressão renal'], why: 'Slide 43: a face diafragmática é convexa, acompanhando a face inferior da cúpula do diafragma.' } },
      { ref: '44', q: 'Which impression of the visceral surface lies at the inferior pole?', correct: 'The colic impression', wrong: ['The gastric impression', 'The renal impression', 'The hepatic impression'], why: 'Slide 44: the colic impression lies at the inferior pole, against the splenic flexure and the phrenicocolic ligament.',
        pt: { q: 'Qual impressão da face visceral fica no polo inferior?', correct: 'A impressão cólica', wrong: ['A impressão gástrica', 'A impressão renal', 'A impressão hepática'], why: 'Slide 44: a impressão cólica fica no polo inferior, contra a flexura esplênica e o ligamento frenicocólico.' } },
      { ref: '44', q: 'What separates the gastric and renal parts of the visceral surface?', correct: 'The hilum', wrong: ['The splenic artery alone', 'The gastrosplenic ligament', 'The diaphragm'], why: 'Slide 44: the gastric and renal parts are separated by the hilum.',
        pt: { q: 'O que separa as partes gástrica e renal da face visceral?', correct: 'O hilo', wrong: ['Somente a artéria esplênica', 'O ligamento gastroesplênico', 'O diafragma'], why: 'Slide 44: as partes gástrica e renal são separadas pelo hilo.' } },
    ],
  },
  {
    id: 'spleen-7', title: t('Peritoneal ligaments of the spleen', 'Ligamentos peritoneais do baço'),
    cards: [
      {
        id: 'pancreas-p45', ref: '45', title: t('The spleen’s peritoneum and its ligaments', 'O peritônio do baço e seus ligamentos'),
        focus: ['spleen'], ghost: ['stomach', 'pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('The spleen is covered by visceral peritoneum. Three major peritoneal ligaments are listed: the gastrosplenic, the splenorenal and the splenocolic. Two minor ligaments are also listed: the splenophrenic and the pancreaticosplenic.',
            'O baço é coberto por peritônio visceral. São listados três ligamentos peritoneais principais: o gastroesplênico, o esplenorrenal e o esplenocólico. Também são listados dois ligamentos menores: o esplenofrênico e o pancreaticoesplênico.'),
          t('Each of these ligaments is a fold of the peritoneum that carries the spleen to a neighbouring structure. The following sections describe each one in order, starting with the gastrosplenic ligament.',
            'Cada um desses ligamentos é uma prega do peritônio que liga o baço a uma estrutura vizinha. As seções seguintes descrevem cada um em ordem, começando pelo ligamento gastroesplênico.'),
        ],
      },
      {
        id: 'pancreas-p46', ref: '46', title: t('The gastrosplenic ligament', 'O ligamento gastroesplênico'),
        focus: ['spleen', 'stomach', 'gastroepiploic_a', 'left_gastric_a'], ghost: ['pancreas', 'diaphragm_g'], view: 'ant',
        body: [
          t('The gastrosplenic ligament is peritoneal. It runs from the hilum of the spleen to the greater curvature of the stomach. It is the upper continuation of the greater omentum. Behind it, if you cut the ligament, lies the lesser sac.',
            'O ligamento gastroesplênico é peritoneal. Vai do hilo do baço até a curvatura maior do estômago. É a continuação superior do omento maior. Atrás dele, se o ligamento for cortado, fica a bolsa omental (saco menor).'),
          t('At the level of L1, the gastrosplenic ligament bridges the space between the spleen and the stomach directly in front of the omental bursa (lesser sac), so dividing it opens into the lesser sac in front of the tail of the pancreas and the left kidney. Inside this fold, the short gastric vessels run to the fundus of the stomach.',
            'No nível de L1, o ligamento gastroesplênico atravessa o espaço entre o baço e o estômago diretamente à frente da bolsa omental (saco menor), de modo que seccioná-lo dá acesso ao saco menor diante da cauda do pâncreas e do rim esquerdo. Dentro dessa prega, os vasos gástricos curtos seguem até o fundo do estômago.'),
        ],
      },
      {
        id: 'pancreas-p47', ref: '47', title: t('How the ligaments develop from the dorsal mesogastrium', 'Como os ligamentos se desenvolvem a partir do mesogástrio dorsal'),
        focus: ['spleen'], ghost: ['stomach', 'pancreas'], view: 'ant', contextOnly: true,
        body: [
          t('The spleen develops between the two layers of the dorsal mesogastrium. These layers form the visceral peritoneum of the spleen, the gastrosplenic ligament (in front) and the lienorenal, or splenorenal, ligament (behind). The lesser sac lies between them.',
            'O baço se desenvolve entre as duas camadas do mesogástrio dorsal. Essas camadas formam o peritônio visceral do baço, o ligamento gastroesplênico (na frente) e o ligamento lienorrenal, ou esplenorrenal (atrás). A bolsa omental fica entre eles.'),
          t('Each of these ligaments is made of two layers of peritoneum, which can contain vessels and nerves, and also fat and lymphatics. This explains why the ligaments carry the splenic vessels and the lymphatics.',
            'Cada um desses ligamentos é feito de duas camadas de peritônio, que podem conter vasos e nervos, e também gordura e linfáticos. Isso explica por que os ligamentos levam os vasos esplênicos e os linfáticos.'),
        ],
      },
      {
        id: 'pancreas-p48', ref: '48–49', title: t('The embryonic and adult relations of the spleen', 'As relações embrionárias e adultas do baço'),
        focus: ['spleen', 'stomach', 'pancreas'], ghost: ['abdominal_aorta_g', 'diaphragm_g', 'caudate_lobe', 'ivc_g'], view: 'ant', contextOnly: true,
        body: [
          t('Comparing the primitive embryonic stage with the adult arrangement clarifies how the splenic ligaments form. In the embryo, the stomach and spleen suspend inside the primitive dorsal mesentery in front of the aorta and kidney, while the liver sits inside the primitive ventral mesentery. In the adult, the fused membranes behind the pancreas form the fascia of Treitz, the ventral mesentery persists at the liver as the falciform ligament, and the dorsal mesentery persists as the splenorenal ligament (to the kidney) and the gastrosplenic ligament (to the stomach).',
            'Comparar o estágio embrionário primitivo com a disposição adulta esclarece como os ligamentos esplênicos se formam. No embrião, o estômago e o baço ficam suspensos no mesentério dorsal primitivo à frente da aorta e do rim, enquanto o fígado fica no mesentério ventral primitivo. No adulto, as membranas fundidas atrás do pâncreas formam a fáscia de Treitz, o mesentério ventral persiste junto ao fígado como ligamento falciforme e o mesentério dorsal persiste como ligamento esplenorrenal (para o rim) e ligamento gastroesplênico (para o estômago).'),
          t('During this rotation, the expansion of the dorsal mesogastrium forms the omental bursa and the future greater omentum in front of the left kidney and aorta while carrying the hepatic triad anteriorly, leaving the spleen anchored by the splenorenal and gastrosplenic ligaments.',
            'Durante essa rotação, a expansão do mesogástrio dorsal forma a bolsa omental e o futuro omento maior à frente do rim esquerdo e da aorta enquanto conduz a tríade hepática anteriormente, deixando o baço ancorado pelos ligamentos esplenorrenal e gastroesplênico.'),
        ],
      },
      {
        id: 'pancreas-p50', ref: '50', title: t('The short gastric vessels in the gastrosplenic ligament', 'Os vasos gástricos curtos no ligamento gastroesplênico'),
        focus: ['spleen', 'stomach', 'splenic_a', 'splenic_v'], ghost: ['pancreas', 'transverse_colon', 'diaphragm_g'], view: 'ant',
        body: [
          t('The gastrosplenic ligament contains short gastric vessels for the fundus of the stomach. In situ beneath the diaphragm and the 9th rib, the spleen relates anteriorly to the stomach, posteriorly to the left kidney and suprarenal gland, inferiorly to the transverse colon and the attachment of the transverse mesocolon, and medially to the tail of the pancreas and the splenic artery and vein coursing through the splenorenal ligament.',
            'O ligamento gastroesplênico contém vasos gástricos curtos para o fundo do estômago. Situado in situ sob o diafragma e a 9ª costela, o baço relaciona-se anteriormente com o estômago, posteriormente com o rim esquerdo e a glândula suprarrenal, inferiormente com o colo transverso e a inserção do mesocolo transverso, e medialmente com a cauda do pâncreas e com a artéria e a veia esplênicas que atravessam o ligamento esplenorrenal.'),
          t('The short gastric vessels reach the fundus through this ligament, which is why the superior pole of the spleen also gets an additional supply from the short gastric arteries in the gastrosplenic ligament.',
            'Os vasos gástricos curtos alcançam o fundo por esse ligamento, e por isso o polo superior do baço também recebe um suprimento extra das artérias gástricas curtas do ligamento gastroesplênico.'),
        ],
      },
      {
        id: 'pancreas-p51', ref: '51', title: t('The splenorenal (lienorenal) ligament', 'O ligamento esplenorrenal (lienorrenal)'),
        focus: ['spleen', 'splenic_a', 'splenic_v', 'pancreas'], ghost: ['stomach', 'transverse_colon', 'diaphragm_g'], view: 'ant',
        body: [
          t('The splenorenal, or lienorenal, ligament is the posterior part of the primitive dorsal mesogastrium. It runs from the hilum of the spleen to the anterior surface of the left kidney. It contains the terminal portion of the splenic vessels and the tail of the pancreas. From the spleen it continues with the parietal peritoneum of the posterior wall, in front of the left kidney.',
            'O ligamento esplenorrenal, ou lienorrenal, é a parte posterior do mesogástrio dorsal primitivo. Vai do hilo do baço até a face anterior do rim esquerdo. Contém a porção terminal dos vasos esplênicos e a cauda do pâncreas. A partir do baço continua com o peritônio parietal da parede posterior, à frente do rim esquerdo.'),
          t('In transverse relation across the upper abdomen, the splenorenal ligament bridges the left kidney and the splenic hilum while the gastrosplenic ligament extends from the hilum to the stomach—both continuous with the visceral peritoneum of the spleen—and the lesser omentum lies medially. Together, the adult arrangement places the pancreas against the fused membranes (fascia of Treitz) in front of the kidney, aorta and inferior vena cava, with the liver anchored anteriorly by the lesser omentum and the falciform ligament (ventral mesentery).',
            'Em relação transversal no abdome superior, o ligamento esplenorrenal une o rim esquerdo ao hilo esplênico enquanto o ligamento gastroesplênico se estende do hilo ao estômago — ambos contínuos com o peritônio visceral do baço — e o omento menor situa-se medialmente. Em conjunto, a disposição adulta posiciona o pâncreas junto às membranas fundidas (fáscia de Treitz) à frente do rim, da aorta e da veia cava inferior, com o fígado ancorado anteriormente pelo omento menor e pelo ligamento falciforme (mesentério ventral).'),
        ],
      },
      {
        id: 'pancreas-p52', ref: '52', title: t('The splenocolic ligament', 'O ligamento esplenocólico'),
        focus: ['spleen', 'transverse_colon', 'descending_colon'], ghost: ['pancreas', 'diaphragm_g'], view: 'ant',
        body: [
          t('The splenocolic ligament is a remnant of the extreme left end of the transverse mesocolon. It is avascular, which means it carries no vessels of its own.',
            'O ligamento esplenocólico é um remanescente da extremidade esquerda extrema do mesocolo transverso. Ele é avascular, ou seja, não tem vasos próprios.'),
          t('Situated between the spleen and the colon, the splenocolic ligament lies beside the diaphragm, the pancreas, the pancreaticocolic ligament and the phrenicocolic ligament.',
            'Situado entre o baço e o colo, o ligamento esplenocólico fica ao lado do diafragma, do pâncreas, do ligamento pancreaticocólico e do ligamento frenicocólico.'),
        ],
      },
      {
        id: 'pancreas-p53', ref: '53', title: t('The splenophrenic ligament', 'O ligamento esplenofrênico'),
        focus: ['spleen', 'diaphragm_g'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The splenophrenic ligament is a reflection of the leaves of the mesentery onto the posterior body wall and onto the underside of the diaphragm, at the area of the upper pole of the spleen, close to the stomach. It usually has no vessels.',
            'O ligamento esplenofrênico é uma reflexão das lâminas do mesentério sobre a parede posterior do corpo e sobre a face inferior do diafragma, na área do polo superior do baço, perto do estômago. Em geral não tem vasos.'),
          t('Positioned at the upper pole of the spleen with the pancreas lying beside it, the splenophrenic ligament anchors this superior pole toward the diaphragm.',
            'Posicionado no polo superior do baço com o pâncreas ao lado, o ligamento esplenofrênico ancora esse polo superior em direção ao diafragma.'),
        ],
      },
      {
        id: 'pancreas-p54', ref: '54', title: t('The pancreaticosplenic ligament', 'O ligamento pancreaticoesplênico'),
        focus: ['spleen', 'pancreas', 'splenic_v'], view: 'ant',
        body: [
          t('The pancreaticosplenic ligament is not always present. It is present when the tail of the pancreas does not touch the spleen. It is usually thin and cord-like, and it is avascular.',
            'O ligamento pancreaticoesplênico nem sempre está presente. Está presente quando a cauda do pâncreas não toca o baço. Costuma ser fino e em forma de cordão, e é avascular.'),
        ],
      },
      {
        id: 'pancreas-p55', ref: '55', title: t('The phrenicocolic ligament', 'O ligamento frenicocólico'),
        focus: ['spleen', 'descending_colon', 'transverse_colon', 'diaphragm_g'], ghost: ['pancreas', 'stomach'], view: 'ant',
        body: [
          t('The phrenicocolic ligament connects the splenic flexure of the colon to the diaphragm. It runs inferior and lateral to the lower pole of the spleen. It is not connected directly to the spleen, but it helps to stabilise the spleen.',
            'O ligamento frenicocólico liga a flexura esplênica do colo ao diafragma. Corre inferior e lateralmente ao polo inferior do baço. Não se liga diretamente ao baço, mas ajuda a estabilizá-lo.'),
          t('Together around the spleen, pancreas, stomach, colon and diaphragm, these folds form a connected suspensory group: around the hilum and tail attach the splenorenal (SRL), gastrosplenic (GSL) and pancreaticosplenic (PSL) ligaments, while below them the pancreaticocolic, splenocolic (SCL) and phrenicocolic ligaments span the colon, pancreas, spleen and diaphragm—with the phrenicocolic ligament anchored directly between the colic flexure and the diaphragm.',
            'Em conjunto ao redor do baço, do pâncreas, do estômago, do colo e do diafragma, essas pregas formam um grupo suspensor conectado: ao redor do hilo e da cauda prendem-se os ligamentos esplenorrenal (SRL), gastroesplênico (GSL) e pancreaticoesplênico (PSL), enquanto abaixo deles os ligamentos pancreaticocólico, esplenocólico (SCL) e frenicocólico se estendem entre o colo, o pâncreas, o baço e o diafragma — com o ligamento frenicocólico fixado diretamente entre a flexura cólica e o diafragma.'),
        ],
      },
      {
        id: 'pancreas-p56', ref: '56', title: t('The pancreaticocolic ligament and the three colic ligaments', 'O ligamento pancreaticocólico e os três ligamentos cólicos'),
        focus: ['pancreas', 'transverse_colon', 'spleen'], ghost: ['descending_colon', 'stomach'], view: 'ant',
        body: [
          t('The pancreaticocolic ligament is the upper extension of the transverse mesocolon. Together, all three «colic» ligaments—the pancreaticocolic, the splenocolic and the phrenicocolic—are prolongations of the transverse mesocolon.',
            'O ligamento pancreaticocólico é a extensão superior do mesocolo transverso. Em conjunto, os três ligamentos «cólicos» — o pancreaticocólico, o esplenocólico e o frenicocólico — são prolongamentos do mesocolo transverso.'),
          t('Arranged between the pancreas, spleen, colon and diaphragm, the pancreaticocolic, splenocolic and phrenicocolic ligaments form one continuous family extending from the transverse mesocolon region toward the spleen and diaphragm.',
            'Dispostos entre o pâncreas, o baço, o colo e o diafragma, os ligamentos pancreaticocólico, esplenocólico e frenicocólico formam uma única família contínua que se estende da região do mesocolo transverso em direção ao baço e ao diafragma.'),
        ],
      },
    ],
    questions: [
      { ref: '45', q: 'Which of these is one of the three major peritoneal ligaments of the spleen?', correct: 'The splenocolic ligament', wrong: ['The hepatoduodenal ligament', 'The falciform ligament', 'The round ligament'], why: 'Slide 45: three major ligaments are gastrosplenic, splenorenal and splenocolic.',
        pt: { q: 'Qual destes é um dos três ligamentos peritoneais principais do baço?', correct: 'O ligamento esplenocólico', wrong: ['O ligamento hepatoduodenal', 'O ligamento falciforme', 'O ligamento redondo'], why: 'Slide 45: os três principais são gastroesplênico, esplenorrenal e esplenocólico.' } },
      { ref: '46', q: 'What does the gastrosplenic ligament carry to the fundus of the stomach?', correct: 'Short gastric vessels', wrong: ['The splenic artery itself', 'The common bile duct', 'The left renal vein'], why: 'Slide 50: the gastrosplenic ligament carries the short gastric vessels for the fundus.',
        pt: { q: 'O que o ligamento gastroesplênico leva até o fundo do estômago?', correct: 'Vasos gástricos curtos', wrong: ['A própria artéria esplênica', 'O colédoco', 'A veia renal esquerda'], why: 'Slide 50: o ligamento gastroesplênico leva os vasos gástricos curtos para o fundo.' } },
      { ref: '47', q: 'Between which two layers of the dorsal mesogastrium does the spleen develop?', correct: 'The two layers of the dorsal mesogastrium', wrong: ['The two layers of the ventral mesentery', 'The two layers of the falciform ligament', 'The layers of the greater sac only'], why: 'Slide 47: the spleen develops between the two layers of the dorsal mesogastrium.',
        pt: { q: 'Entre quais camadas do mesogástrio dorsal o baço se desenvolve?', correct: 'As duas camadas do mesogástrio dorsal', wrong: ['As duas camadas do mesentério ventral', 'As duas camadas do ligamento falciforme', 'Somente as camadas do saco maior'], why: 'Slide 47: o baço se desenvolve entre as duas camadas do mesogástrio dorsal.' } },
      { ref: '52', q: 'What is the splenocolic ligament, according to slide 52?', correct: 'A remnant of the extreme left end of the transverse mesocolon, avascular', wrong: ['A vessel that carries blood from the colon to the spleen', 'A muscle that moves the spleen', 'A remnant of the falciform ligament'], why: 'Slide 52: remnant of the extreme left end of the transverse mesocolon; avascular.',
        pt: { q: 'O que é o ligamento esplenocólico, segundo o slide 52?', correct: 'Um remanescente da extremidade esquerda extrema do mesocolo transverso, avascular', wrong: ['Um vaso que leva sangue do colo ao baço', 'Um músculo que move o baço', 'Um remanescente do ligamento falciforme'], why: 'Slide 52: remanescente da extremidade esquerda extrema do mesocolo transverso; avascular.' } },
      { ref: '54', q: 'When is the pancreaticosplenic ligament present?', correct: 'When the tail of the pancreas does not touch the spleen', wrong: ['Always, in every person', 'When the tail touches the spleen', 'Only when the spleen is enlarged'], why: 'Slide 54: present when the tail of the pancreas does not touch the spleen; not always present.',
        pt: { q: 'Quando o ligamento pancreaticoesplênico está presente?', correct: 'Quando a cauda do pâncreas não toca o baço', wrong: ['Sempre, em todas as pessoas', 'Quando a cauda toca o baço', 'Somente quando o baço está aumentado'], why: 'Slide 54: está presente quando a cauda do pâncreas não toca o baço; nem sempre está presente.' } },
      { ref: '55', q: 'To which structure does the phrenicocolic ligament connect the splenic flexure?', correct: 'The diaphragm', wrong: ['The liver', 'The left kidney', 'The stomach'], why: 'Slide 55: the phrenicocolic ligament connects the splenic flexure of the colon to the diaphragm.',
        pt: { q: 'A que estrutura o ligamento frenicocólico liga a flexura esplênica?', correct: 'Ao diafragma', wrong: ['Ao fígado', 'Ao rim esquerdo', 'Ao estômago'], why: 'Slide 55: o ligamento frenicocólico liga a flexura esplênica do colo ao diafragma.' } },
    ],
  },
  {
    id: 'spleen-8', title: t('Vessels, functions and histology of the spleen', 'Vasos, funções e histologia do baço'),
    cards: [
      {
        id: 'pancreas-p57', ref: '57', title: t('The splenic artery and its segmental branches', 'A artéria esplênica e seus ramos segmentares'),
        focus: ['splenic_a', 'spleen', 'celiac_trunk'], ghost: ['common_hepatic_a', 'gastroepiploic_a', 'pancreas', 'gallbladder'], view: 'ant',
        body: [
          t('The splenic artery divides into two or three branches before it enters the hilum of the spleen. These divide into four or five segmental arteries, with no collateral circulation between the segments. The segmental arteries divide into trabecular arteries, which then give rise to follicular arteries. The superior pole of the spleen gains an extra arterial supply from the short gastric arteries in the gastrosplenic ligament.',
            'A artéria esplênica se divide em dois ou três ramos antes de entrar no hilo do baço. Estes se dividem em quatro ou cinco artérias segmentares, sem circulação colateral entre os segmentos. As artérias segmentares se dividem em artérias trabeculares, que então dão origem às artérias foliculares. O polo superior do baço recebe um suprimento arterial extra das artérias gástricas curtas do ligamento gastroesplênico.'),
          t('Arising from the coeliac trunk alongside the left gastric and common hepatic arteries, the tortuous splenic artery runs behind the stomach to give off the dorsal, greater and tail pancreatic arteries, the left gastro-omental artery and the short gastric arteries before branching at the splenic hilum. Meanwhile, the common hepatic artery gives off the gastroduodenal, right gastric, supraduodenal and proper hepatic arteries supplying the liver and the gallbladder inside the cystohepatic triangle (of Calot). In the 3D model, the splenic artery is the vessel the coeliac trunk gives to the spleen.',
            'Originando-se do tronco celíaco ao lado das artérias gástrica esquerda e hepática comum, a tortuosa artéria esplênica corre atrás do estômago dando as artérias pancreáticas dorsal, magna e da cauda, a artéria gastro-omental esquerda e as artérias gástricas curtas antes de se ramificar no hilo esplênico. Enquanto isso, a artéria hepática comum dá as artérias gastroduodenal, gástrica direita, supraduodenal e hepática própria que irrigam o fígado e a vesícula biliar dentro do triângulo cisto-hepático (de Calot). No modelo 3D, a artéria esplênica é o vaso que o tronco celíaco dá ao baço.'),
        ],
      },
      {
        id: 'pancreas-p58', ref: '58', title: t('The splenic vein and its tributaries', 'A veia esplênica e seus afluentes'),
        focus: ['splenic_v', 'hepatic_portal_v', 'smv', 'spleen'], ghost: ['pancreas', 'gastric_v', 'ivc_g'], view: 'ant',
        body: [
          t('The segmental veins join to form two (superior and inferior) or three (superior, middle and inferior) lobar veins, which leave the hilum and join to form the splenic vein. The splenic vein runs medially below the splenic artery and behind the tail and body of the pancreas. It joins the superior mesenteric vein to form the portal vein.',
            'As veias segmentares se unem para formar duas (superior e inferior) ou três (superior, média e inferior) veias lobares, que saem do hilo e se unem para formar a veia esplênica. A veia esplênica corre medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas. Ela se une à veia mesentérica superior para formar a veia porta.'),
          t('Emerging from the hilum below the splenic artery, the splenic vein collects short gastric and left gastro-omental tributaries as well as the inferior mesenteric vein before meeting the superior mesenteric vein (which receives the pancreaticoduodenal, right gastro-omental and middle colic veins) to form the portal vein. Behind this plane lie the left renal, left suprarenal, left ovarian/testicular and left ascending lumbar veins and the left ureter, beside the inferior vena cava and the hepatic veins. Use the 3D model to follow the splenic vein from the hilum to the portal vein.',
            'Saindo do hilo abaixo da artéria esplênica, a veia esplênica recebe tributárias gástricas curtas e gastro-omental esquerda, além da veia mesentérica inferior, antes de encontrar a veia mesentérica superior (que recebe as veias pancreaticoduodenais, gastro-omental direita e cólica média) para formar a veia porta. Atrás desse plano situam-se as veias renal esquerda, suprarrenal esquerda, ovárica/testicular esquerda e lombar ascendente esquerda e o ureter esquerdo, ao lado da veia cava inferior e das veias hepáticas. Use o modelo 3D para seguir a veia esplênica do hilo até a veia porta.'),
        ],
      },
      {
        id: 'pancreas-p59', ref: '59', title: t('The functions of the spleen', 'As funções do baço'),
        focus: ['spleen'], ghost: ['splenic_a', 'splenic_v'], view: 'ant',
        body: [
          t('The spleen receives about 7% of the cardiac output, and this high perfusion matches its functions. The first is that resident macrophages remove old or damaged red blood cells, a process called haemocatheresis. Closely linked to this, iron accumulates from the recycling of red blood cells. The second function is an immune response against antigens carried in the blood.',
            'O baço recebe cerca de 7% do débito cardíaco, e essa alta perfusão corresponde às suas funções. A primeira é que os macrófagos residentes removem as hemácias velhas ou danificadas, processo chamado de hemocaterese. Ligado diretamente a isso, o ferro se acumula com a reciclagem das hemácias. A segunda função é uma resposta imune contra antígenos transportados pelo sangue.'),
          t('Histologically, these two roles divide across the two regions of the splenic parenchyma: the red pulp carries out haemocatheresis and iron recycling, whereas the white pulp—with its splenic nodules—mounts the immune response against antigens carried by the blood.',
            'Histologicamente, esses dois papéis se dividem entre as duas regiões do parênquima esplênico: a polpa vermelha realiza a hemocaterese e a reciclagem do ferro, enquanto a polpa branca — com seus nódulos esplênicos — organiza a resposta imune contra antígenos transportados pelo sangue.'),
        ],
      },
      {
        id: 'pancreas-p60', ref: '60', title: t('The capsule and the parenchyma: white and red pulp', 'A cápsula e o parênquima: polpa branca e polpa vermelha'),
        focus: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('The capsule is made of collagen and elastic fibres. Many trabeculae branch off from it, forming a connective-tissue scaffold that supports the branching vessels and nerves. The parenchyma has two parts: the white pulp, the whiter area where the immune response occurs, and the red pulp, the red area where haemocatheresis and iron recycling occur.',
            'A cápsula é feita de fibras de colágeno e elásticas. Dela se projetam muitas trabéculas, que formam um arcabouço de tecido conjuntivo que sustenta os vasos e nervos ramificados. O parênquima tem duas partes: a polpa branca, a área mais clara onde ocorre a resposta imune, e a polpa vermelha, a área vermelha onde ocorrem a hemocaterese e a reciclagem do ferro.'),
        ],
      },
      {
        id: 'pancreas-p61', ref: '61–62', title: t('The white pulp: PALS, follicles and the marginal zone', 'A polpa branca: bainha linfática periarteriolar, folículos e zona marginal'),
        focus: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('The branches of the splenic artery run into the trabeculae as trabecular arteries. They leave the trabeculae as central arteries, which are surrounded by white pulp. From inside to outside, the white pulp has three parts. (1) The PALS, the periarteriolar lymphatic sheath, which contains T lymphocytes around the central artery. (2) The lymphatic follicles, made of B lymphocytes, which are vascularised by radial arteries. (3) The marginal, or perifollicular, zone, which is the transition between the red and the white pulp.',
            'Os ramos da artéria esplênica entram nas trabéculas como artérias trabeculares. Saem das trabéculas como artérias centrais, que ficam cercadas pela polpa branca. De dentro para fora, a polpa branca tem três partes. (1) A bainha linfática periarteriolar, PALS, que contém linfócitos T ao redor da artéria central. (2) Os folículos linfáticos, feitos de linfócitos B, irrigados por artérias radiais. (3) A zona marginal, ou perifolicular, que é a transição entre a polpa vermelha e a branca.'),
          t('The marginal zone is an important area of transit for lymphocytes leaving the systemic circulation to enter the white pulp. Around each splenic lymphoid nodule with its germinal centre and surrounding PALS, the central and radial arterioles supply the white pulp before continuing outward into the red pulp as penicillar arterioles, sheathed capillaries and sinusoids. At the interface between the two, the marginal sinus and marginal zone contain lymphocytes, marginal-zone macrophages, marginal-zone metallophilic macrophages, marginal-zone B cells, sinus-lining cells, reticular fibroblasts and dendritic cells.',
            'A zona marginal é uma área importante de trânsito para os linfócitos que deixam a circulação sistêmica para entrar na polpa branca. Ao redor de cada nódulo linfoide esplênico com seu centro germinativo e a PALS circundante, as arteríolas central e radial irrigam a polpa branca antes de seguir para a polpa vermelha como arteríolas penicilares, capilares embainhados e sinusoides. Na interface entre as duas regiões, o seio marginal e a zona marginal abrigam linfócitos, macrófagos da zona marginal, macrófagos metalofílicos da zona marginal, células B da zona marginal, células de revestimento dos seios, fibroblastos reticulares e células dendríticas.'),
        ],
      },
      {
        id: 'pancreas-p63', ref: '63–64', title: t('The central artery and the open circulation', 'A artéria central e a circulação aberta'),
        focus: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('The central artery leaves the white pulp and enters the red pulp, where it becomes the penicillar arterioles. Some of these are sheathed with a layer of macrophages, forming sheathed capillaries. Ninety per cent of the sheathed capillaries end open into the splenic cords. This is the open circulation.',
            'A artéria central deixa a polpa branca e entra na polpa vermelha, onde se transforma nas arteríolas penicilares. Algumas delas são revestidas por uma camada de macrófagos, formando os capilares embainhados. Noventa por cento dos capilares embainhados terminam abertos nos cordões esplênicos. Essa é a circulação aberta.'),
          t('In the open circulation, the blood diffuses into an interstitial area supported by reticular fibres without capillaries, situated among the trabeculae, white pulp and outer capsule. To reach the venous drainage, blood either enters the sinusoids of the red pulp across their lining stave cells—the specialised endothelial cells of the sinusoid—or arrives directly via the closed circulation.',
            'Na circulação aberta, o sangue se difunde por uma área intersticial sustentada por fibras reticulares sem capilares, situada entre as trabéculas, a polpa branca e a cápsula externa. Para alcançar a drenagem venosa, o sangue precisa entrar nos sinusoides da polpa vermelha passando pelas células em duela (stave cells) — as células endoteliais especializadas do sinusoide — ou chegar diretamente pela circulação fechada.'),
        ],
      },
      {
        id: 'pancreas-p65', ref: '65', title: t('The red pulp sinusoids and the barrel-stave cells', 'Os sinusoides da polpa vermelha e as células em duela'),
        focus: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('For a blood cell to return to the circulation, it must enter a vessel: the sinusoids of the red pulp. These sinusoids are special. Their cells look like the planks of a barrel, so the endothelial cells are also called stave cells. The endothelial cells are long and are surrounded by a discontinuous basal lamina.',
            'Para uma célula sanguínea voltar à circulação, ela precisa entrar em um vaso: os sinusoides da polpa vermelha. Esses sinusoides são especiais. Suas células se parecem com as tábuas de um barril, por isso as células endoteliais também são chamadas de células em duela. As células endoteliais são longas e são cercadas por uma lâmina basal descontínua.'),
          t('Old red blood cells are not elastic and cannot warp, so they cannot get into the sinusoid; they stay in the red pulp and are destroyed by the resident macrophages. Healthy erythrocytes, by contrast, squeeze between the endothelial stave cells—which contain internal stress fibres, rest on a discontinuous basement membrane and are encircled externally by annular and reticular fibres. Once inside, the sinusoids of the red pulp unite into venules, which unite into trabecular veins that form the splenic vein.',
            'As hemácias velhas não são elásticas e não conseguem se deformar, por isso não conseguem entrar no sinusoide; permanecem na polpa vermelha e são destruídas pelos macrófagos residentes. Já os eritrócitos saudáveis se espremem entre as células endoteliais em duela — que contêm fibras de estresse internas, repousam sobre uma membrana basal descontínua e são envolvidas externamente por fibras anulares e reticulares. Uma vez lá dentro, os sinusoides da polpa vermelha se unem em vênulas, que se unem em veias trabeculares para formar a veia esplênica.'),
        ],
      },
      {
        id: 'pancreas-p66', ref: '66–67', title: t('The closed circulation and the final diagram of the spleen', 'A circulação fechada e o diagrama final do baço'),
        focus: ['spleen'], view: 'ant', contextOnly: true,
        body: [
          t('Ten per cent of the sheathed capillaries continue directly into the sinusoids of the red pulp. This is the closed circulation, and it is the counterpart of the 90% open circulation described above.',
            'Dez por cento dos capilares embainhados continuam diretamente nos sinusoides da polpa vermelha. Essa é a circulação fechada, e é o contrapeso dos 90% da circulação aberta descritos acima.'),
          t('Organised from the whole spleen, its fibrous capsule and splenic trabecula inward: the white pulp houses the splenic lymphoid nodule with its germinal centre and PALS around the central and radial arterioles, while the red pulp contains the penicillar arterioles, sheathed capillaries and barrel-shaped venous sinusoids. Each venous sinusoid is built like a barrel: the elongated endothelial cells form the staves of the barrel, held together by reticular cells as the hoops of the barrel and resting on a discontinuous basement membrane with reticular fibres so erythrocytes can squeeze between the endothelial cells.',
            'Organizado a partir do baço inteiro, de sua cápsula fibrosa e trabécula esplênica para dentro: a polpa branca abriga o nódulo linfoide esplênico com seu centro germinativo e a PALS ao redor das arteríolas central e radial, enquanto a polpa vermelha contém as arteríolas penicilares, os capilares embainhados e os sinusoides venosos em forma de barril. Cada seio venoso é estruturado como um barril: as células endoteliais alongadas formam as aduelas do barril, unidas pelas células reticulares como os aros do barril e apoiadas em uma membrana basal descontínua com fibras reticulares para que os eritrócitos possam se espremer entre as células endoteliais.'),
        ],
      },
    ],
    questions: [
      { ref: '57', q: 'How many segmental arteries does the splenic artery divide into before the hilum?', correct: 'Four or five', wrong: ['One or two', 'Eight or nine', 'Twelve'], why: 'Slide 57: the splenic artery divides into 2 or 3 branches that divide into 4 or 5 segmental arteries, with no collateral circulation between them.',
        pt: { q: 'Em quantas artérias segmentares a artéria esplênica se divide antes do hilo?', correct: 'Quatro ou cinco', wrong: ['Uma ou duas', 'Oito ou nove', 'Doze'], why: 'Slide 57: a artéria esplênica se divide em 2 ou 3 ramos, que se dividem em 4 ou 5 artérias segmentares, sem circulação colateral entre elas.' } },
      { ref: '58', q: 'Into which vein do the segmental veins finally form the splenic vein?', correct: 'The lobar veins, which then join into the splenic vein', wrong: ['The inferior vena cava directly', 'The azygos vein', 'The renal vein'], why: 'Slide 58: segmental veins form lobar veins, which leave the hilum and join to form the splenic vein.',
        pt: { q: 'Como as veias segmentares formam a veia esplênica?', correct: 'Formam veias lobares, que saem do hilo e se unem na veia esplênica', wrong: ['Diretamente na veia cava inferior', 'Na veia ázigos', 'Na veia renal'], why: 'Slide 58: as veias segmentares formam veias lobares, que saem do hilo e se unem para formar a veia esplênica.' } },
      { ref: '59', q: 'What percentage of the cardiac output does the spleen receive?', correct: 'About 7%', wrong: ['About 25%', 'About 1%', 'About 50%'], why: 'Slide 59: the spleen receives about 7% of cardiac output.',
        pt: { q: 'Que porcentagem do débito cardíaco o baço recebe?', correct: 'Cerca de 7%', wrong: ['Cerca de 25%', 'Cerca de 1%', 'Cerca de 50%'], why: 'Slide 59: o baço recebe cerca de 7% do débito cardíaco.' } },
      { ref: '61–62', q: 'Which lymphocytes are found in the PALS around the central artery?', correct: 'T lymphocytes', wrong: ['B lymphocytes', 'Plasma cells only', 'Eosinophils'], why: 'Slide 61: PALS contains T lymphocytes around the central artery; the follicles contain B lymphocytes.',
        pt: { q: 'Quais linfócitos estão na bainha periarteriolar (PALS) ao redor da artéria central?', correct: 'Linfócitos T', wrong: ['Linfócitos B', 'Somente plasmócitos', 'Eosinófilos'], why: 'Slide 61: a PALS contém linfócitos T ao redor da artéria central; os folículos contêm linfócitos B.' } },
      { ref: '63–64', q: 'What percentage of sheathed capillaries end open into the splenic cords?', correct: 'Ninety per cent', wrong: ['Ten per cent', 'Fifty per cent', 'Thirty per cent'], why: 'Slide 63: 90% of sheathed capillaries end open into the splenic cords (open circulation).',
        pt: { q: 'Qual porcentagem dos capilares embainhados termina aberta nos cordões esplênicos?', correct: 'Noventa por cento', wrong: ['Dez por cento', 'Cinquenta por cento', 'Trinta por cento'], why: 'Slide 63: 90% dos capilares embainhados terminam abertos nos cordões esplênicos (circulação aberta).' } },
      { ref: '65', q: 'Why can old red blood cells not re-enter the sinusoids?', correct: 'They are not elastic and cannot deform', wrong: ['They are too small', 'They have no membrane', 'They are attached to the capsule'], why: 'Slide 65: old erythrocytes are not elastic and cannot warp, so they cannot get into the sinusoid and are destroyed by resident macrophages.',
        pt: { q: 'Por que as hemácias velhas não conseguem voltar aos sinusoides?', correct: 'Não são elásticas e não conseguem se deformar', wrong: ['São pequenas demais', 'Não têm membrana', 'Estão presas à cápsula'], why: 'Slide 65: as hemácias velhas não são elásticas e não se deformam, então não entram no sinusoide e são destruídas pelos macrófagos residentes.' } },
    ],
  },
];

blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
