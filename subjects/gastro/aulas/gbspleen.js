// SpeedGastro · Aula 13 — Gallbladder, spleen and SMA (Prof. Fiume deck 13_gallbladder_spleen_SMA, p001–p052).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/gbspleen.js?v=115';

export const unit = {
  id: 'gbspleen',
  label: t('13 · Gallbladder, spleen and SMA', '13 · Vesícula, baço e AMS'),
  visible: ['spleen', 'diaphragm_g', 'stomach', 'pancreas', 'descending_colon', 'splenic_a', 'splenic_v', 'transverse_colon', 'celiac_trunk', 'hepatic_portal_v', 'smv', 'gallbladder', 'duodenum', 'common_hepatic_duct', 'pancreatic_duct', 'common_hepatic_a', 'caudate_lobe', 'cystic_duct', 'ivc_g', 'hepatic_ducts', 'sma', 'proper_hepatic_a', 'imv', 'gastric_v', 'ima', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'appendicular_a', 'gastroduodenal_a', 'abdominal_aorta_g', 'left_colic_a', 'ileum', 'jejunum', 'pancreaticoduodenal_a', 'ascending_colon', 'ileocecal_junction', 'appendix', 'sigmoid_a', 'superior_rectal_a', 'gastroepiploic_a', 'left_gastric_a'],
  ghost: ['stomach', 'pancreas', 'diaphragm_g', 'splenic_a', 'splenic_v', 'transverse_colon', 'duodenum', 'gastroepiploic_a', 'abdominal_aorta_g', 'ivc_g', 'caudate_lobe', 'common_hepatic_a', 'gallbladder', 'gastric_v', 'descending_colon', 'gastroduodenal_a', 'common_hepatic_duct', 'hepatic_ducts', 'spleen', 'hepatic_portal_v', 'left_gastric_a', 'pancreaticoduodenal_a', 'ileum', 'ascending_colon', 'appendix', 'celiac_trunk', 'jejunum', 'middle_colic_a', 'left_colic_a', 'ima', 'sigmoid_a', 'ileocolic_a'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'gbspleen-1', title: t('Spleen review: location, surfaces, ligaments and vessels', 'Revisão do baço: localização, faces, ligamentos e vasos'),
    cards: [
      {
        id: 'gbspleen-p01', ref: '1', title: t('The spleen again, among the lymphoid organs', 'O baço de novo, entre os órgãos linfoides'),
        focus: ['spleen'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The spleen is introduced as a secondary lymphatic organ. Its size varies with sex and age and is largest at puberty. In an adult it is usually 9–14 cm long, 6–8 cm wide and 3–5 cm thick, and it weighs 150–350 g, depending on the volume of blood it holds.',
            'O baço é apresentado como um órgão linfático secundário. Seu tamanho varia com o sexo e a idade e é maior na puberdade. No adulto costuma medir 9–14 cm de comprimento, 6–8 cm de largura e 3–5 cm de espessura, e pesa 150–350 g, dependendo do volume de sangue que contém.'),
          t('The figure places the spleen among the lymphoid organs: the adenoid, the tonsil, the lymphatic vessels, the thymus, the lymph nodes, the Peyer’s patches of the small intestine, the appendix and the bone marrow. It shows these as parts of one lymphatic system, of which the spleen is one.',
            'A figura reúne o baço entre os órgãos linfoides: adenoide, tonsila, vasos linfáticos, timo, linfonodos, placas de Peyer do intestino delgado, apêndice e medula óssea. Ela os mostra como partes de um mesmo sistema linfático, do qual o baço é um.'),
        ],
      },
      {
        id: 'gbspleen-p02', ref: '2', title: t('Location: left hypochondrium', 'Localização: hipocôndrio esquerdo'),
        focus: ['spleen'], ghost: ['pancreas', 'stomach', 'diaphragm_g', 'splenic_a', 'splenic_v'], view: 'ant',
        body: [
          t('The spleen lies in the left hypochondrium, below the diaphragm, between the stomach and the left kidney. Lateral and posterior skeletal views place it along the ninth, tenth and eleventh ribs between the midaxillary and scapular lines, showing its superior and inferior borders. An axial section at the L1 vertebra shows the spleen next to the stomach (via the gastrosplenic ligament), the tail of the pancreas, the splenic artery and vein, the left kidney, the omental bursa, the omental foramen, the duodenum and the transverse colon.',
            'O baço fica no hipocôndrio esquerdo, abaixo do diafragma, entre o estômago e o rim esquerdo. As vistas esqueléticas lateral e posterior o situam ao longo da nona, décima e décima primeira costelas entre as linhas axilar média e escapular, mostrando suas bordas superior e inferior. Um corte axial na vértebra L1 mostra o baço ao lado do estômago (pelo ligamento gastroesplênico), da cauda do pâncreas, da artéria e da veia esplênicas, do rim esquerdo, da bolsa omental, do forame omental, do duodeno e do colo transverso.'),
        ],
      },
      {
        id: 'gbspleen-p03', ref: '3', title: t('Traube’s semilunar space', 'O espaço semilunar de Traube'),
        focus: ['spleen'], view: 'ant',
        body: [
          t('The spleen is difficult to palpate. A rib-cage specimen showing vertebra T12 beside the spleen is paired with a diagram outlining Traube’s semilunar space in a dashed triangle. Numbered lines (1–11) surround the diagram without text labels, and the borders of the space are not described in words.',
            'O baço é difícil de palpar. Uma peça anatômica da caixa torácica mostrando a vértebra T12 ao lado do baço é associada a um diagrama que delimita o espaço semilunar de Traube com um triângulo tracejado. Linhas numeradas (1–11) cercam o diagrama sem legenda textual, e os limites do espaço não são descritos em palavras.'),
        ],
      },
      {
        id: 'gbspleen-p04', ref: '4', title: t('Shape, surfaces, borders and poles', 'Forma, faces, bordas e polos'),
        focus: ['spleen', 'diaphragm_g'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The spleen is bean-shaped soft tissue, which is difficult for a surgeon to suture. It has a diaphragmatic surface (superior and lateral) and a visceral surface (inferior and medial). The visceral surface contains the splenic hilum, where the vessels, nerves and lymphatics enter. Anterosuperior and posteroinferior borders separate the two surfaces, and the superior and inferior extremities are the poles.',
            'O baço é um tecido mole em forma de feijão, que é difícil de suturar para um cirurgião. Tem uma face diafragmática (superior e lateral) e uma face visceral (inferior e medial). A face visceral contém o hilo esplênico, por onde entram os vasos, os nervos e os linfáticos. Bordas anterossuperior e posteroinferior separam as duas faces, e as extremidades superior e inferior são os polos.'),
          t('The diaphragmatic surface is convex, matching the underside of the dome of the diaphragm. Through the diaphragm it relates to the left pleural costodiaphragmatic recess, the lower lobe of the left lung and the rib cage. The two figures contrast the visceral and diaphragmatic surfaces: the visceral view labels the posterior and anterior extremities, superior and inferior borders, the gastric, renal and colic surfaces, and the hilum with the splenic artery and vein; the lateral view shows the convex diaphragmatic surface between the same borders and extremities.',
            'A face diafragmática é convexa e acompanha a face inferior da cúpula do diafragma. Através do diafragma relaciona-se com o recesso costodiafragmático pleural esquerdo, o lobo inferior do pulmão esquerdo e a caixa torácica. As duas figuras contrastam as faces visceral e diafragmática: a vista visceral rotula as extremidades posterior e anterior, as bordas superior e inferior, as superfícies gástrica, renal e cólica, e o hilo com a artéria e a veia esplênicas; a vista lateral mostra a face diafragmática convexa entre as mesmas bordas e extremidades.'),
        ],
      },
      {
        id: 'gbspleen-p05', ref: '5', title: t('The visceral surface: gastric, renal and colic impressions', 'A face visceral: impressões gástrica, renal e cólica'),
        focus: ['spleen', 'stomach', 'pancreas', 'descending_colon'], ghost: ['transverse_colon', 'duodenum'], view: 'ant',
        body: [
          t('The visceral surface is concave. The gastric impression faces anteromedially, against the posterior part of the fundus, the upper body and the greater curvature of the stomach. The renal impression lies on the posteroinferior part, against the upper lateral area of the front of the left kidney and sometimes the suprarenal gland. The colic impression lies at the inferior pole, against the splenic flexure and the phrenicocolic ligament. The hilum separates the gastric and renal parts.',
            'A face visceral é côncava. A impressão gástrica se volta anteromedialmente, contra a parte posterior do fundo, o corpo superior e a curvatura maior do estômago. A impressão renal fica na parte posteroinferior, contra a área lateral superior da face anterior do rim esquerdo e, às vezes, a suprarrenal. A impressão cólica fica no polo inferior, contra a flexura esplênica e o ligamento frenicocólico. O hilo separa as partes gástrica e renal.'),
          t('The left diagram colour-codes the visceral surface by its relations: the gastric impression against the fundus and body of the stomach, the renal impression against the kidney and suprarenal gland, the anterior extremity against the left colic flexure and phrenicocolic ligament, and the splenic hilum against the omental bursa and the tail of the pancreas. The right axial section at L1 places these relations in situ alongside the gastrosplenic ligament, the splenic artery and vein, the portal triad, the omental (epiploic) foramen, the duodenum and the transverse colon.',
            'O diagrama à esquerda colore a face visceral segundo suas relações: a impressão gástrica contra o fundo e o corpo do estômago, a impressão renal contra o rim e a glândula suprarrenal, a extremidade anterior contra a flexura cólica esquerda e o ligamento frenicocólico, e o hilo esplênico contra a bolsa omental e a cauda do pâncreas. O corte axial à direita em L1 situa essas relações in situ ao lado do ligamento gastroesplênico, da artéria e da veia esplênicas, da tríade portal, do forame omental (epiploico), do duodeno e do colo transverso.'),
        ],
      },
      {
        id: 'gbspleen-p06', ref: '6', title: t('Peritoneum and the five ligaments', 'Peritônio e os cinco ligamentos'),
        focus: ['spleen'], ghost: ['stomach', 'pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('The spleen is covered by visceral peritoneum. Three major peritoneal ligaments are listed: the gastrosplenic, the splenorenal and the splenocolic. Two minor ones are also listed: the splenophrenic and the pancreaticosplenic.',
            'O baço é coberto por peritônio visceral. São listados três ligamentos peritoneais maiores: o gastroesplênico, o esplenorrenal e o esplenocólico. Também são listados dois menores: o esplenofrênico e o pancreaticoesplênico.'),
        ],
      },
      {
        id: 'gbspleen-p07', ref: '7', title: t('The gastrosplenic ligament', 'O ligamento gastroesplênico'),
        focus: ['spleen', 'stomach'], ghost: ['pancreas', 'gastroepiploic_a'], view: 'ant',
        body: [
          t('The gastrosplenic ligament is peritoneal. It runs from the splenic hilum to the greater curvature of the stomach, and it is the upper continuation of the greater omentum. Behind it, if the ligament is cut, lies the lesser sac. A dissection view points to the gastrosplenic ligament, paired with an axial cross-section showing scissors cutting that ligament between the stomach and spleen to enter the omental bursa (lesser sac), with the tail of the pancreas, the splenic vessels and the left kidney lying posterior to it.',
            'O ligamento gastroesplênico é peritoneal. Vai do hilo esplênico até a curvatura maior do estômago e é a continuação superior do omento maior. Atrás dele, se o ligamento for cortado, fica a bolsa omental (saco menor). Uma vista de dissecção aponta o ligamento gastroesplênico, junto a um corte axial que mostra uma tesoura seccionando esse ligamento entre o estômago e o baço para entrar na bolsa omental (saco menor), com a cauda do pâncreas, os vasos esplênicos e o rim esquerdo situados posteriormente a ele.'),
        ],
      },
      {
        id: 'gbspleen-p08', ref: '8', title: t('Development between the layers of the dorsal mesogastrium', 'Desenvolvimento entre as camadas do mesogástrio dorsal'),
        focus: ['spleen'], ghost: ['stomach'], view: 'ant', contextOnly: true,
        body: [
          t('The spleen develops between the two layers of the dorsal mesogastrium. These form the visceral peritoneum, the gastrosplenic ligament (in front) and the lienorenal ligament (behind). The lesser sac lies between them. Each ligament is made of two layers of peritoneum, which can contain vessels, nerves, fat and lymphatics.',
            'O baço se desenvolve entre as duas camadas do mesogástrio dorsal. Elas formam o peritônio visceral, o ligamento gastroesplênico (na frente) e o ligamento lienorrenal (atrás). A bolsa omental fica entre elas. Cada ligamento é feito de duas camadas de peritônio, que podem conter vasos, nervos, gordura e linfáticos.'),
        ],
      },
      {
        id: 'gbspleen-p09', ref: '9–10', title: t('The embryonic and adult spleen relations', 'As relações embrionárias e adultas do baço'),
        focus: ['spleen', 'stomach', 'pancreas'], ghost: ['abdominal_aorta_g', 'ivc_g', 'caudate_lobe', 'diaphragm_g'], view: 'ant', contextOnly: true,
        body: [
          t('The primitive embryonic stage (A) is compared with the adult (B). The embryo shows the primitive dorsal and ventral mesenteries, the aorta, the kidney, the liver and the stomach. In the adult, the fused membranes that form the fascia of Treitz lie behind the pancreas, and the splenorenal and gastrosplenic ligaments and the falciform ligament (ventral mesentery) are labelled.',
            'O estágio embrionário primitivo (A) é comparado com o adulto (B). O embrião mostra os mesentérios dorsal e ventral primitivos, a aorta, o rim, o fígado e o estômago. No adulto, as membranas fundidas que formam a fáscia de Treitz ficam atrás do pâncreas, e estão rotulados os ligamentos esplenorrenal e gastroesplênico e o ligamento falciforme (mesentério ventral).'),
          t('It shows the dorsal mesogastrium and its expansion into the future greater omentum, with the omental bursa, the spleen, the stomach, the left kidney, the aorta and the hepatic triad. It is the figure of the same development described earlier.',
            'Mostra o mesogástrio dorsal e sua expansão no futuro omento maior, com a bolsa omental, o baço, o estômago, o rim esquerdo, a aorta e a tríade hepática. É a figura do mesmo desenvolvimento descrito antes.'),
        ],
      },
      {
        id: 'gbspleen-p11', ref: '11', title: t('The short gastric vessels in the gastrosplenic ligament', 'Os vasos gástricos curtos no ligamento gastroesplênico'),
        focus: ['spleen', 'stomach', 'splenic_a', 'splenic_v'], ghost: ['pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('The gastrosplenic ligament carries short gastric vessels for the fundus of the stomach. The figure shows the spleen in situ, with the stomach cut, the diaphragm, the ninth rib, the suprarenal gland, the left kidney, the splenic artery and vein, the splenorenal ligament, the cut attachment of the transverse mesocolon, the transverse colon and the tail of the pancreas.',
            'O ligamento gastroesplênico leva vasos gástricos curtos para o fundo do estômago. A figura mostra o baço in situ, com o estômago seccionado, o diafragma, a nona costela, a suprarrenal, o rim esquerdo, a artéria e a veia esplênicas, o ligamento esplenorrenal, a inserção seccionada do mesocolo transverso, o colo transverso e a cauda do pâncreas.'),
        ],
      },
      {
        id: 'gbspleen-p12', ref: '12', title: t('The splenorenal (lienorenal) ligament', 'O ligamento esplenorrenal (lienorrenal)'),
        focus: ['spleen', 'splenic_a', 'splenic_v', 'pancreas'], ghost: ['stomach', 'diaphragm_g'], view: 'ant',
        body: [
          t('The splenorenal, or lienorenal, ligament is the posterior part of the primitive dorsal mesogastrium. It runs from the splenic hilum to the front of the left kidney. It contains the terminal part of the splenic vessels and the tail of the pancreas. From the spleen it continues with the parietal peritoneum of the posterior wall, in front of the left kidney.',
            'O ligamento esplenorrenal, ou lienorrenal, é a parte posterior do mesogástrio dorsal primitivo. Vai do hilo esplênico até a frente do rim esquerdo. Contém a parte terminal dos vasos esplênicos e a cauda do pâncreas. A partir do baço continua com o peritônio parietal da parede posterior, à frente do rim esquerdo.'),
          t('The left cross-section shows the splenorenal ligament extending from the splenic hilum to the left kidney while the gastrosplenic ligament runs to the stomach and the visceral peritoneum covers the spleen, beside the lesser omentum. The right adult diagram (B) shows these same peritoneal reflections relative to the aorta, inferior vena cava, liver, pancreas, fused membranes (fascia of Treitz) and falciform ligament.',
            'O corte transversal à esquerda mostra o ligamento esplenorrenal indo do hilo esplênico ao rim esquerdo, enquanto o ligamento gastroesplênico vai ao estômago e o peritônio visceral recobre o baço, ao lado do omento menor. O diagrama adulto à direita (B) mostra essas mesmas reflexões peritoneais em relação à aorta, veia cava inferior, fígado, pâncreas, membranas fundidas (fáscia de Treitz) e ligamento falciforme.'),
        ],
      },
      {
        id: 'gbspleen-p13', ref: '13', title: t('The splenocolic and splenophrenic ligaments', 'Os ligamentos esplenocólico e esplenofrênico'),
        focus: ['spleen', 'diaphragm_g', 'transverse_colon'], ghost: ['pancreas', 'stomach'], view: 'ant',
        body: [
          t('The splenocolic ligament is a remnant of the extreme left end of the transverse mesocolon, and it is avascular. The splenophrenic ligament is the reflection of the leaves of the mesentery onto the posterior body wall and the inferior surface of the diaphragm, at the upper pole of the spleen close to the stomach. It usually has no vessels.',
            'O ligamento esplenocólico é um remanescente da extremidade esquerda extrema do mesocolo transverso, e é avascular. O ligamento esplenofrênico é a reflexão das lâminas do mesentério sobre a parede posterior do corpo e a face inferior do diafragma, no polo superior do baço perto do estômago. Em geral não tem vasos.'),
          t('The left figure shows the splenocolic ligament attaching the lower pole of the spleen to the colon alongside the diaphragm, pancreas, pancreaticocolic ligament and phrenicocolic ligament. The right figure labels the splenophrenic ligament as «2» at the upper pole beside the pancreas (with «1» and «4» unlabelled).',
            'A figura à esquerda mostra o ligamento esplenocólico prendendo o polo inferior do baço ao colo, ao lado do diafragma, do pâncreas, do ligamento pancreaticocólico e do ligamento frenicocólico. A figura à direita rotula o ligamento esplenofrênico como «2» no polo superior ao lado do pâncreas (com «1» e «4» sem legenda).'),
        ],
      },
      {
        id: 'gbspleen-p14', ref: '14', title: t('The pancreaticosplenic and pancreaticocolic ligaments', 'Os ligamentos pancreaticoesplênico e pancreaticocólico'),
        focus: ['spleen', 'pancreas', 'transverse_colon'], ghost: ['splenic_v', 'diaphragm_g'], view: 'ant',
        body: [
          t('The pancreaticosplenic ligament is not always present. It is present when the tail of the pancreas does not touch the spleen. It is usually thin and cord-like, and it is avascular. The pancreaticocolic ligament is the upper extension of the transverse mesocolon.',
            'O ligamento pancreaticoesplênico nem sempre está presente. Está presente quando a cauda do pâncreas não toca o baço. Costuma ser fino e em forma de cordão, e é avascular. O ligamento pancreaticocólico é a extensão superior do mesocolo transverso.'),
          t('A note adds that the three «colic» ligaments, the pancreaticocolic, the splenocolic and the phrenicocolic, are prolongations of the transverse mesocolon.',
            'Uma nota acrescenta que os três ligamentos «cólicos», o pancreaticocólico, o esplenocólico e o frenicocólico, são prolongamentos do mesocolo transverso.'),
        ],
      },
      {
        id: 'gbspleen-p15', ref: '15', title: t('The phrenicocolic ligament', 'O ligamento frenicocólico'),
        focus: ['spleen', 'descending_colon', 'diaphragm_g'], ghost: ['pancreas', 'stomach'], view: 'ant',
        body: [
          t('The phrenicocolic ligament connects the splenic flexure of the colon to the diaphragm. It runs inferior and lateral to the lower pole of the spleen. It is not connected directly to the spleen, but it helps to stabilise it.',
            'O ligamento frenicocólico liga a flexura esplênica do colo ao diafragma. Corre inferior e lateralmente ao polo inferior do baço. Não se liga diretamente ao baço, mas ajuda a estabilizá-lo.'),
          t('The left diagram shows the pancreaticocolic, splenocolic and phrenicocolic ligaments around the colon, spleen, pancreas and diaphragm. The schematic on the right maps all five splenic ligaments around the spleen, stomach, pancreas, colon and diaphragm: the splenorenal (SRL), gastrosplenic (GSL), pancreaticosplenic (PSL), splenocolic (SCL) and phrenicocolic ligaments, confirming that the phrenicocolic ligament runs between the colon and the diaphragm rather than attaching to the spleen.',
            'O diagrama à esquerda mostra os ligamentos pancreaticocólico, esplenocólico e frenicocólico em torno do colo, baço, pâncreas e diafragma. O esquema à direita mapeia todos os ligamentos ao redor do baço, estômago, pâncreas, colo e diafragma: os ligamentos esplenorrenal (SRL), gastroesplênico (GSL), pancreaticoesplênico (PSL), esplenocólico (SCL) e frenicocólico, confirmando que o ligamento frenicocólico vai do colo ao diafragma em vez de se prender ao baço.'),
        ],
      },
      {
        id: 'gbspleen-p16', ref: '16', title: t('The splenic artery and its segmental branches', 'A artéria esplênica e seus ramos segmentares'),
        focus: ['splenic_a', 'spleen', 'celiac_trunk'], ghost: ['common_hepatic_a', 'gastroepiploic_a', 'pancreas', 'gallbladder'], view: 'ant',
        body: [
          t('The splenic artery divides into two or three branches before it enters the hilum. These divide into four or five segmental arteries, with no collateral circulation between the segments. The segmental arteries divide into trabecular arteries, which give rise to follicular arteries. The superior pole gets an extra supply from the short gastric arteries in the gastrosplenic ligament.',
            'A artéria esplênica se divide em dois ou três ramos antes de entrar no hilo. Estes se dividem em quatro ou cinco artérias segmentares, sem circulação colateral entre os segmentos. As artérias segmentares se dividem em artérias trabeculares, que dão origem às artérias foliculares. O polo superior recebe um suprimento extra das artérias gástricas curtas do ligamento gastroesplênico.'),
          t('The dissection diagram traces the splenic artery from the celiac trunk along the pancreas to the splenic hilum, giving off the dorsal pancreatic, greater pancreatic and tail-of-pancreas arteries, the left gastro-omental artery and the short gastric arteries to the stomach and superior pole of the spleen. It also displays the coeliac neighbours: the left gastric artery, inferior phrenic arteries (from a common stem), common, proper, right, intermediate and left hepatic arteries, cystic artery in Calot’s triangle, right gastric, supraduodenal, gastroduodenal and inferior pancreatic arteries, alongside the hepatic portal vein and bile ducts.',
            'O diagrama de dissecção acompanha a artéria esplênica do tronco celíaco ao longo do pâncreas até o hilo esplênico, emitindo as artérias pancreática dorsal, pancreática magna e da cauda do pâncreas, a artéria gastro-omental esquerda e as artérias gástricas curtas para o estômago e o polo superior do baço. Também mostra os vasos vizinhos do tronco celíaco: a artéria gástrica esquerda, as frênicas inferiores (de um tronco comum), as artérias hepáticas comum, própria, direita, intermédia e esquerda, a artéria cística no triângulo de Calot, as artérias gástrica direita, supraduodenal, gastroduodenal e pancreática inferior, junto à veia porta hepática e aos ductos biliares.'),
        ],
      },
      {
        id: 'gbspleen-p17', ref: '17', title: t('The splenic vein and the portal vein', 'A veia esplênica e a veia porta'),
        focus: ['splenic_v', 'hepatic_portal_v', 'smv', 'spleen'], ghost: ['pancreas', 'gastric_v', 'ivc_g'], view: 'ant',
        body: [
          t('The segmental veins join to form two (superior and inferior) or three (superior, middle and inferior) lobar veins, which leave the hilum and join to form the splenic vein. The splenic vein runs medially below the splenic artery and posterior to the tail and body of the pancreas, and it forms the portal vein.',
            'As veias segmentares se unem para formar duas (superior e inferior) ou três (superior, média e inferior) veias lobares, que saem do hilo e se unem para formar a veia esplênica. A veia esplênica corre medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas, e forma a veia porta.'),
          t('The figure maps the portal venous drainage behind the pancreas: the splenic vein receives the short gastric, left gastro-omental and inferior mesenteric veins before uniting with the superior mesenteric vein to form the portal vein, which also receives the right and left gastric and pancreaticoduodenal veins. Surrounding landmarks include the hepatic veins, inferior vena cava, celiac trunk, hepatic and gastroduodenal arteries, inferior pancreaticoduodenal branches, middle colic vein, right gastro-omental vessels, left suprarenal, renal and gonadal vessels, left ascending lumbar vein and left ureter.',
            'A figura mapeia a drenagem venosa porta atrás do pâncreas: a veia esplênica recebe as veias gástricas curtas, gastro-omental esquerda e mesentérica inferior antes de se unir à veia mesentérica superior para formar a veia porta, que também recebe as veias gástricas direita e esquerda e as pancreaticoduodenais. Entre os marcos vizinhos estão as veias hepáticas, a veia cava inferior, o tronco celíaco, as artérias hepáticas e gastroduodenal, os ramos pancreaticoduodenais inferiores, a veia cólica média, os vasos gastro-omentais direitos, os vasos suprarrenais, renais e gonadais esquerdos, a veia lombar ascendente esquerda e o ureter esquerdo.'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Which kind of organ does the slide say the spleen is?', correct: 'A secondary lymphatic organ', wrong: ['A primary lymphoid organ', 'An endocrine gland', 'A skeletal muscle'], why: 'Slide 1: the spleen is a secondary lymphatic organ.',
        pt: { q: 'Que tipo de órgão o slide diz que o baço é?', correct: 'Um órgão linfático secundário', wrong: ['Um órgão linfoide primário', 'Uma glândula endócrina', 'Um músculo esquelético'], why: 'Slide 1: o baço é um órgão linfático secundário.' } },
      { ref: '2', q: 'Which ribs does the figure on slide 2 mark for the spleen?', correct: 'The ninth to eleventh ribs', wrong: ['The first to third ribs', 'The twelfth rib only', 'The fifth to seventh ribs'], why: 'Slide 2: the figure labels the ninth, tenth and eleventh ribs.',
        pt: { q: 'Quais costelas a figura do slide 2 marca para o baço?', correct: 'Da nona à décima primeira costela', wrong: ['Da primeira à terceira costela', 'Somente a décima segunda costela', 'Da quinta à sétima costela'], why: 'Slide 2: a figura rotula as costelas nona, décima e décima primeira.' } },
      { ref: '5', q: 'Which impression of the visceral surface lies at the inferior pole?', correct: 'The colic impression', wrong: ['The gastric impression', 'The renal impression', 'The suprarenal impression'], why: 'Slide 5: the colic impression lies at the inferior pole, against the splenic flexure.',
        pt: { q: 'Qual impressão da face visceral fica no polo inferior?', correct: 'A impressão cólica', wrong: ['A impressão gástrica', 'A impressão renal', 'A impressão suprarrenal'], why: 'Slide 5: a impressão cólica fica no polo inferior, contra a flexura esplênica.' } },
      { ref: '6', q: 'Which three are the major peritoneal ligaments of the spleen?', correct: 'Gastrosplenic, splenorenal and splenocolic', wrong: ['Hepatogastric, hepatoduodenal and falciform', 'Phrenicocolic, pancreaticocolic and round', 'Cystoduodenocolic, gastrocolic and omental'], why: 'Slide 6: three major ligaments: gastrosplenic, splenorenal and splenocolic.',
        pt: { q: 'Quais são os três ligamentos peritoneais maiores do baço?', correct: 'Gastroesplênico, esplenorrenal e esplenocólico', wrong: ['Hepatogástrico, hepatoduodenal e falciforme', 'Frenicocólico, pancreaticocólico e redondo', 'Cistoduodenocólico, gastrocólico e omental'], why: 'Slide 6: três ligamentos maiores: gastroesplênico, esplenorrenal e esplenocólico.' } },
      { ref: '16', q: 'Is there collateral circulation between the segmental arteries of the spleen?', correct: 'No, there is no collateral circulation between the segments', wrong: ['Yes, a rich collateral network', 'Only through the short gastric arteries', 'Only through the splenic vein'], why: 'Slide 16: the splenic artery gives 4–5 segmental arteries with NO collateral circulation between the segments.',
        pt: { q: 'Há circulação colateral entre as artérias segmentares do baço?', correct: 'Não, não há circulação colateral entre os segmentos', wrong: ['Sim, uma rede colateral rica', 'Somente pelas artérias gástricas curtas', 'Somente pela veia esplênica'], why: 'Slide 16: a artéria esplênica dá 4–5 artérias segmentares, sem circulação colateral entre os segmentos.' } },
      { ref: '17', q: 'Where does the splenic vein run relative to the splenic artery?', correct: 'Below the splenic artery', wrong: ['Above the splenic artery', 'In front of the stomach', 'Through the diaphragm'], why: 'Slide 17: the splenic vein runs medially below the splenic artery and behind the tail and body of the pancreas.',
        pt: { q: 'Onde a veia esplênica corre em relação à artéria esplênica?', correct: 'Abaixo da artéria esplênica', wrong: ['Acima da artéria esplênica', 'Na frente do estômago', 'Através do diafragma'], why: 'Slide 17: a veia esplênica corre medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas.' } },
    ],
  },
  {
    id: 'gbspleen-2', title: t('Gallbladder: location, regions, fundus, body and neck', 'Vesícula biliar: localização, regiões, fundo, corpo e colo'),
    cards: [
      {
        id: 'gbspleen-p18', ref: '18', title: t('Location of the gallbladder and its functions', 'Localização da vesícula biliar e suas funções'),
        focus: ['gallbladder', 'duodenum', 'common_hepatic_duct', 'pancreatic_duct'], ghost: ['stomach', 'pancreas', 'descending_colon'], view: 'ant',
        body: [
          t('The gallbladder lies in the right hypochondrium, on the midclavicular line, at the level of the inferior margin of the ninth rib (its costal cartilage). The bile duct opens into the second part of the duodenum, usually together with the main pancreatic duct, at L2. At L1–L2 the gallbladder emerges below the rib arcade, and this area is painful on palpation in gallbladder disease.',
            'A vesícula biliar fica no hipocôndrio direito, na linha hemiclavicular, no nível da margem inferior da nona costela (sua cartilagem costal). O colédoco se abre na segunda parte do duodeno, em geral junto com o ducto pancreático principal, em L2. Em L1–L2 a vesícula aparece abaixo do arco costal, e essa área dói à palpação nas doenças da vesícula.'),
          t('Two functions are given. At the intestinal level, the gallbladder stores and concentrates the bile produced by the liver before it is excreted into the duodenum. At the systemic level, it helps to eliminate endogenous catabolites, such as bilirubin from red blood cells, and exogenous substances, such as drugs. The figure, titled Location, shows the gallbladder in an anterior view against the epigastric, hypochondriac, umbilical, lumbar and iliac regions, with the hepatic and cystic ducts and the stomach, colon and pancreas.',
            'São dadas duas funções. No nível intestinal, a vesícula armazena e concentra a bile produzida pelo fígado antes que ela seja liberada no duodeno. No nível sistêmico, ajuda a eliminar catabólitos endógenos, como a bilirrubina das hemácias, e substâncias exógenas, como os medicamentos. A figura, intitulada Localização, mostra a vesícula em vista anterior sobre as regiões epigástrica, hipocondríaca, umbilical, lombar e ilíaca, com os ductos hepático e cístico e o estômago, o colo e o pâncreas.'),
        ],
      },
      {
        id: 'gbspleen-p19', ref: '19', title: t('General: shape, size, capacity and regions', 'Geral: forma, tamanho, capacidade e regiões'),
        focus: ['gallbladder', 'common_hepatic_duct', 'pancreatic_duct', 'duodenum', 'hepatic_portal_v', 'common_hepatic_a'], ghost: ['caudate_lobe', 'stomach', 'pancreas'], view: 'ant',
        body: [
          t('The gallbladder is a hollow, pear-shaped, muscular sac. It is 7–10 cm long and holds between 25 and 50 ml. It sits in a fossa on the visceral surface of the right lobe of the liver. Like the liver, it is covered by peritoneum that continues with the peritoneum of the liver. It is divided into three regions: the fundus, the body and the neck.',
            'A vesícula é um saco muscular oco, em forma de pera. Tem 7–10 cm de comprimento e comporta de 25 a 50 ml. Fica em uma fossa na face visceral do lobo direito do fígado. Como o fígado, é coberta por peritônio que se continua com o do fígado. É dividida em três regiões: o fundo, o corpo e o colo.'),
          t('The figure is an inferior view of the liver showing the gallbladder and the ducts. It labels the spiral fold of the cystic duct, the neck, the body, the infundibulum (Hartmann’s pouch), the smooth part of the cystic duct, the fundus, the right and left hepatic ducts, the common hepatic duct, the round ligament, the descending duodenum, the major duodenal papilla (of Vater) and the hepatopancreatic ampulla, with the hepatic artery, the portal vein, the right gastric artery and the cut edge of the lesser omentum.',
            'A figura é uma vista inferior do fígado mostrando a vesícula e os ductos. Rotula a prega espiral do ducto cístico, o colo, o corpo, o infundíbulo (bolsa de Hartmann), a parte lisa do ducto cístico, o fundo, os ductos hepáticos direito e esquerdo, o ducto hepático comum, o ligamento redondo, o duodeno descendente, a papila duodenal maior (de Vater) e a ampola hepatopancreática, com a artéria hepática, a veia porta, a artéria gástrica direita e a borda seccionada do omento menor.'),
        ],
      },
      {
        id: 'gbspleen-p20', ref: '20', title: t('The fundus and Murphy’s point', 'O fundo e o ponto de Murphy'),
        focus: ['gallbladder', 'transverse_colon', 'caudate_lobe'], ghost: ['duodenum', 'stomach'], view: 'ant',
        body: [
          t('The fundus projects beyond the inferior border of the liver to a variable extent, and it is completely covered by visceral peritoneum. Posteriorly and inferiorly it is related to the transverse mesocolon. Anteriorly it is related to the anterior abdominal wall, at the point where a vertical line through the lateral margin of rectus abdominis meets a horizontal line through the tenth rib. This is Murphy’s point, used to examine the gallbladder clinically.',
            'O fundo ultrapassa a margem inferior do fígado em grau variável, e é totalmente coberto por peritônio visceral. Posterior e inferiormente relaciona-se com o mesocolo transverso. Anteriormente relaciona-se com a parede abdominal anterior, no ponto em que uma linha vertical pela margem lateral do músculo reto do abdome encontra uma linha horizontal pela décima costela. Esse é o ponto de Murphy, usado para examinar clinicamente a vesícula.'),
          t('⚠ Page 18 gives the ninth rib and this page the tenth rib for the same region. The two numbers are not reconciled, so state both as printed if asked. The figure shows Murphy’s sign, the hepatic ducts of the caudate lobe, the bare area and the bile duct.',
            '⚠ A página 18 dá a nona costela e esta página, a décima, para a mesma região. Os dois números não são conciliados, então cite os dois como estão impressos, se for perguntado. A figura mostra o sinal de Murphy, os ductos hepáticos do lobo caudado, a área nua e o colédoco.'),
        ],
      },
      {
        id: 'gbspleen-p21', ref: '21', title: t('The body and its relations to the duodenum and colon', 'O corpo e suas relações com o duodeno e o colo'),
        focus: ['gallbladder', 'duodenum', 'transverse_colon', 'cystic_duct', 'hepatic_portal_v'], ghost: ['pancreas', 'stomach', 'common_hepatic_a', 'gastroduodenal_a'], view: 'ant',
        body: [
          t('The body lies in the cystic fossa. Its inferior face is related to the anterior face of the duodenum and to the transverse mesocolon. A small peritoneal fold, the cysto-duodenocolic ligament, may join the gallbladder to the duodenum and the right colic flexure.',
            'O corpo fica na fossa cística. Sua face inferior se relaciona com a face anterior do duodeno e com o mesocolo transverso. Uma pequena prega peritoneal, o ligamento cistoduodenocólico, pode unir a vesícula ao duodeno e à flexura cólica direita.'),
          t('The left illustration and its biliary inset show the body of the gallbladder resting directly on the superior (first) part of the duodenum, the transverse colon (cut) and the head of the pancreas, below the cystohepatic (Calot’s) triangle where the cystic artery, cystic duct and hepatic ducts meet the hepatic portal vein and the common, proper, right and left hepatic, right gastric and gastroduodenal arteries (alongside the cut anterior layer of the lesser omentum and the stomach). The inset details the fundus, body, infundibulum (Hartmann’s pouch), neck, spiral fold and smooth part of the cystic duct, common hepatic and common bile ducts, gland orifices, pancreatic duct and hepatopancreatic ampulla entering the descending (second) part of the duodenum. On the right, a cadaver dissection photograph with forceps retracting the liver highlights the cysto-duodenocolic ligament (CDL) between the gallbladder and duodenum beneath the right and left lobes, coronary, falciform and round ligaments.',
            'A ilustração à esquerda e seu detalhe biliar mostram o corpo da vesícula apoiado diretamente sobre a parte superior (primeira) do duodeno, o colo transverso (seccionado) e a cabeça do pâncreas, abaixo do triângulo cistohepático (de Calot), onde a artéria cística, o ducto cístico e os ductos hepáticos encontram a veia porta hepática e as artérias hepáticas comum, própria, direita e esquerda, gástrica direita e gastroduodenal (ao lado da borda seccionada da camada anterior do omento menor e do estômago). O detalhe mostra o fundo, o corpo, o infundíbulo (bolsa de Hartmann), o colo, a prega espiral e a parte lisa do ducto cístico, os ductos hepático comum e colédoco, os orifícios das glândulas, o ducto pancreático e a ampola hepatopancreática abrindo-se na parte descendente (segunda) do duodeno. À direita, uma foto de dissecção com pinça retraindo o fígado destaca o ligamento cistoduodenocólico (CDL) entre a vesícula e o duodeno, sob os lobos direito e esquerdo e os ligamentos coronário, falciforme e redondo.'),
        ],
      },
      {
        id: 'gbspleen-p22', ref: '22', title: t('The body in the fossa, and the cystic veins', 'O corpo na fossa, e as veias císticas'),
        focus: ['gallbladder', 'cystic_duct', 'common_hepatic_duct', 'hepatic_portal_v'], ghost: ['caudate_lobe', 'duodenum'], view: 'ant',
        body: [
          t('The body lies in the cystic fossa and is connected to the liver by the cystic group of accessory hepatic portal veins, which are small veins in the fossa. The figure labels the fossa for the gallbladder, the cystic artery, the anterior and posterior cystic veins, the fundus, the body, the neck, the cystic duct and the common hepatic duct, and a visceral sensory nerve.',
            'O corpo fica na fossa cística e se liga ao fígado pelo grupo cístico das veias porta hepáticas acessórias, pequenas veias da fossa. A figura rotula a fossa da vesícula, a artéria cística, as veias císticas anterior e posterior, o fundo, o corpo, o colo, o ducto cístico e o ducto hepático comum, e um nervo sensitivo visceral.'),
        ],
      },
      {
        id: 'gbspleen-p23', ref: '23', title: t('The neck of the gallbladder', 'O colo da vesícula biliar'),
        focus: ['gallbladder', 'cystic_duct', 'duodenum', 'hepatic_portal_v', 'pancreatic_duct'], ghost: ['common_hepatic_duct', 'caudate_lobe'], view: 'ant',
        body: [
          t('The neck ends by continuing into the cystic duct. It has an S-shaped course that ends in a larger part. Posteriorly and inferiorly it is related to the duodenum, and medially on the left it is related to the components of the porta hepatis. The mucosa at the medial end of the neck is obliquely ridged, forming a crescent-shaped fold that continues with the spirally arranged mucosal folds of the cystic duct.',
            'O colo termina continuando-se no ducto cístico. Tem trajeto em S que termina em uma parte maior. Posterior e inferiormente relaciona-se com o duodeno, e medialmente à esquerda com os componentes do hilo hepático. A mucosa na extremidade medial do colo tem cristas oblíquas, formando uma prega em forma de crescente que continua com as pregas espiraladas da mucosa do ducto cístico.'),
          t('The figure labels the spiral fold of the cystic duct, the neck, the body, the right and left hepatic ducts, the common hepatic duct, the infundibulum (Hartmann’s pouch), the smooth part of the cystic duct, the fundus, the common bile duct, the descending part of the duodenum, the gland orifices, the major duodenal papilla (of Vater), the pancreatic duct and the hepatopancreatic ampulla.',
            'A figura rotula a prega espiral do ducto cístico, o colo, o corpo, os ductos hepáticos direito e esquerdo, o ducto hepático comum, o infundíbulo (bolsa de Hartmann), a parte lisa do ducto cístico, o fundo, o colédoco, a parte descendente do duodeno, os orifícios das glândulas, a papila duodenal maior (de Vater), o ducto pancreático e a ampola hepatopancreática.'),
        ],
      },
      {
        id: 'gbspleen-p24', ref: '24', title: t('The cystic duct and the spiral valve of Heister', 'O ducto cístico e a válvula espiral de Heister'),
        focus: ['cystic_duct', 'common_hepatic_duct', 'gallbladder', 'pancreatic_duct'], ghost: ['hepatic_ducts', 'duodenum'], view: 'ant',
        body: [
          t('The cystic duct runs backward and downward from the neck of the gallbladder to the common hepatic duct, where the common bile duct begins. Its length varies, usually about 3–4 cm, and it runs in the free border of the pars tensa of the lesser omentum.',
            'O ducto cístico corre para trás e para baixo, do colo da vesícula até o ducto hepático comum, onde começa o colédoco. Seu comprimento varia, costumando ser de cerca de 3–4 cm, e corre na borda livre da pars tensa do omento menor.'),
          t('Its internal conformation is particular: the mucosa is lifted by a series of 5–10 crescent-shaped folds. They project into the lumen in a spiral and act as valves that regulate the direction of bile flow, which is the spiral valve of Heister. The left cutaway shows the mucosal surface of the gallbladder (fundus, body, neck) and the spiral folds inside the cystic duct joining the common hepatic duct (formed by the right and left hepatic ducts) to make the common bile duct; the right schematic outlines the cystic duct with its spiral fold (spiral valve of Heister) beside the common hepatic duct, bile duct, main pancreatic duct and hepatopancreatic ampulla.',
            'Sua conformação interna é particular: a mucosa se eleva em uma série de 5–10 pregas em forma de crescente. Elas se projetam para o lúmen em espiral e funcionam como válvulas que regulam a direção do fluxo da bile, é a válvula espiral de Heister. O corte anatômico à esquerda mostra a mucosa da vesícula (fundo, corpo, colo) e as pregas espirais dentro do ducto cístico unindo-se ao ducto hepático comum (formado pelos ductos hepáticos direito e esquerdo) para formar o colédoco; o esquema à direita destaca o ducto cístico com sua prega espiral (válvula espiral de Heister) ao lado do ducto hepático comum, do colédoco, do ducto pancreático principal e da ampola hepatopancreática.'),
        ],
      },
      {
        id: 'gbspleen-p25', ref: '25', title: t('The route of the bile duct and the visceral surface of the liver', 'O trajeto do colédoco e a face visceral do fígado'),
        focus: ['gallbladder', 'common_hepatic_duct', 'duodenum', 'pancreas', 'caudate_lobe', 'hepatic_portal_v', 'ivc_g'], ghost: ['stomach', 'spleen', 'abdominal_aorta_g'], view: 'ant',
        body: [
          t('The gallbladder is partly contained in a fossa on the visceral surface of the liver. The common bile duct passes behind the duodenum toward the head of the pancreas. After passing through the head of the pancreas, the bile duct frequently joins the pancreatic duct.',
            'A vesícula fica em parte contida em uma fossa na face visceral do fígado. O colédoco passa atrás do duodeno em direção à cabeça do pâncreas. Depois de atravessar a cabeça do pâncreas, o colédoco frequentemente se une ao ducto pancreático.'),
          t('The left figure shows the visceral surface of the liver with the gallbladder in its fossa, the colic, duodenal, renal, suprarenal, oesophageal and gastric impressions, the round ligament (fissure for ligamentum teres), fissure for ligamentum venosum, the quadrate and caudate lobes, the caudate process, the porta hepatis, the hepatic veins, the inferior vena cava, the hepatic artery proper, the hepatic portal vein, the common hepatic, cystic and common bile ducts, and the bare area with the coronary and triangular ligaments. The right coronal dissection traces the common bile duct in situ passing behind the duodenum and through the head of the pancreas to join the pancreatic duct and open on the major duodenal papilla. Use the 3D model to find the caudate lobe and the gallbladder on the same surface.',
            'A figura à esquerda mostra a face visceral do fígado com a vesícula em sua fossa, as impressões cólica, duodenal, renal, suprarrenal, esofágica e gástrica, o ligamento redondo (fissura do ligamento redondo), a fissura do ligamento venoso, os lobos quadrado e caudado, o processo caudado, o hilo hepático, as veias hepáticas, a veia cava inferior, a artéria hepática própria, a veia porta hepática, os ductos hepático comum, cístico e colédoco, e a área nua com os ligamentos coronário e triangulares. A dissecção coronal à direita acompanha o trajeto do colédoco in situ passando atrás do duodeno e pela cabeça do pâncreas até se unir ao ducto pancreático e se abrir na papila duodenal maior. Use o modelo 3D para encontrar o lobo caudado e a vesícula na mesma face.'),
        ],
      },
    ],
    questions: [
      { ref: '18', q: 'Where does the bile duct open into the duodenum?', correct: 'The second part of the duodenum, at L2', wrong: ['The first part of the duodenum, at L1', 'The pylorus, at L1', 'The third part of the duodenum, at L3'], why: 'Slide 18: the bile duct opens into the second part of the duodenum, usually with the main pancreatic duct, at L2.',
        pt: { q: 'Onde o colédoco se abre no duodeno?', correct: 'Na segunda parte do duodeno, em L2', wrong: ['Na primeira parte do duodeno, em L1', 'No piloro, em L1', 'Na terceira parte do duodeno, em L3'], why: 'Slide 18: o colédoco se abre na segunda parte do duodeno, em geral junto com o ducto pancreático principal, em L2.' } },
      { ref: '19', q: 'What is the capacity of the gallbladder according to slide 19?', correct: '25 to 50 ml', wrong: ['5 to 10 ml', '100 to 150 ml', '250 to 500 ml'], why: 'Slide 19: 7–10 cm long, capacity 25 ml to 50 ml.',
        pt: { q: 'Qual a capacidade da vesícula, segundo o slide 19?', correct: 'De 25 a 50 ml', wrong: ['De 5 a 10 ml', 'De 100 a 150 ml', 'De 250 a 500 ml'], why: 'Slide 19: 7–10 cm de comprimento, capacidade de 25 ml a 50 ml.' } },
      { ref: '20', q: 'Where is Murphy’s point, according to slide 20?', correct: 'Where the lateral margin of rectus abdominis meets a horizontal line through the tenth rib', wrong: ['Where the midline meets the ninth rib', 'At the umbilicus, on the twelfth rib', 'At the xiphoid, on the seventh rib'], why: 'Slide 20: the vertical line through the lateral margin of rectus abdominis meets the horizontal line through the 10th rib.',
        pt: { q: 'Onde fica o ponto de Murphy, segundo o slide 20?', correct: 'Onde a margem lateral do reto do abdome encontra uma linha horizontal pela décima costela', wrong: ['Onde a linha média encontra a nona costela', 'No umbigo, na décima segunda costela', 'No apêndice xifoide, na sétima costela'], why: 'Slide 20: a linha vertical pela margem lateral do reto encontra a linha horizontal pela 10ª costela.' } },
      { ref: '21', q: 'Which structures lie against the inferior face of the body of the gallbladder?', correct: 'The superior part of the duodenum and the transverse mesocolon', wrong: ['The head of the pancreas and the right kidney', 'The spleen and the stomach', 'The splenic flexure and the phrenicocolic ligament'], why: 'Slide 21: the inferior face relates to the anterior face of the duodenum and to the transverse mesocolon.',
        pt: { q: 'Quais estruturas ficam contra a face inferior do corpo da vesícula?', correct: 'A parte superior do duodeno e o mesocolo transverso', wrong: ['A cabeça do pâncreas e o rim direito', 'O baço e o estômago', 'A flexura esplênica e o ligamento frenicocólico'], why: 'Slide 21: a face inferior se relaciona com a face anterior do duodeno e com o mesocolo transverso.' } },
      { ref: '23', q: 'What is the larger part at the end of the neck of the gallbladder called?', correct: 'Hartmann’s pouch, the infundibulum', wrong: ['The fundus', 'The common hepatic duct', 'The cystic artery'], why: 'Slides 19 and 23: the infundibulum, or Hartmann’s pouch, is the larger part at the end of the S-shaped neck.',
        pt: { q: 'Como se chama a parte maior no fim do colo da vesícula?', correct: 'A bolsa de Hartmann, o infundíbulo', wrong: ['O fundo', 'O ducto hepático comum', 'A artéria cística'], why: 'Slides 19 e 23: o infundíbulo, ou bolsa de Hartmann, é a parte maior no fim do colo em S.' } },
      { ref: '24', q: 'How long is the cystic duct, usually?', correct: 'About 3–4 cm', wrong: ['About 1 cm', 'About 8–10 cm', 'About 15–20 cm'], why: 'Slide 24: usually around 3–4 cm.',
        pt: { q: 'Quanto mede o ducto cístico, em geral?', correct: 'Cerca de 3–4 cm', wrong: ['Cerca de 1 cm', 'Cerca de 8–10 cm', 'Cerca de 15–20 cm'], why: 'Slide 24: em geral cerca de 3–4 cm.' } },
      { ref: '24', q: 'What is the name of the spiral folds of the cystic duct?', correct: 'The spiral valve of Heister', wrong: ['The valve of Kerckring', 'The ileocaecal valve of Bauhin', 'The Houston valve'], why: 'Slide 24: the mucosa is lifted by 5–10 crescentic folds in a spiral, the spiral valve of Heister.',
        pt: { q: 'Como se chamam as pregas espiraladas do ducto cístico?', correct: 'A válvula espiral de Heister', wrong: ['A válvula de Kerckring', 'A válvula ileocecal de Bauhin', 'A válvula de Houston'], why: 'Slide 24: a mucosa se eleva em 5–10 pregas em crescente, em espiral, a válvula espiral de Heister.' } },
    ],
  },
  {
    id: 'gbspleen-3', title: t('Bile and the bile ducts', 'A bile e os ductos biliares'),
    cards: [
      {
        id: 'gbspleen-p26', ref: '26', title: t('Bile and the liver lobule', 'A bile e o lóbulo hepático'),
        focus: ['caudate_lobe', 'hepatic_portal_v', 'gallbladder'], ghost: ['common_hepatic_duct', 'hepatic_ducts'], view: 'ant',
        body: [
          t('Bile is secreted from the biliary pole of the hepatocytes and released into the bile capillaries. The daily output is 600–1000 ml per day. The figure reviews the liver lobule: the central vein, the portal triad with the branches of the hepatic artery, the bile duct and the hepatic portal vein, the classic hepatic lobule, the portal lobule and the liver acinus with its metabolic zones.',
            'A bile é secretada pelo polo biliar dos hepatócitos e liberada nos capilares biliares. A produção diária é de 600–1000 ml por dia. A figura revisa o lóbulo hepático: a veia central, a tríade portal com os ramos da artéria hepática, o colédoco e a veia porta hepática, o lóbulo hepático clássico, o lóbulo portal e o ácino hepático com suas zonas metabólicas.'),
          t('The lower panel is a functional view. The territories of the lobules are drawn as regular hexagons, which is unlike their real appearance, which is highly variable. Functionally, the liver microarchitecture is better considered as acini that extend between adjacent central venules and are divided into three zones.',
            'O painel inferior é uma vista funcional. Os territórios dos lóbulos são desenhados como hexágonos regulares, o que é diferente da aparência real, muito variável. Do ponto de vista funcional, a microarquitetura hepática é melhor entendida como ácinos que se estendem entre vênulas centrais vizinhas e se dividem em três zonas.'),
        ],
      },
      {
        id: 'gbspleen-p27', ref: '27', title: t('The bile ducts: intrahepatic and extrahepatic', 'Os ductos biliares: intra-hepáticos e extra-hepáticos'),
        focus: ['hepatic_ducts', 'common_hepatic_duct', 'gallbladder', 'cystic_duct'], view: 'ant',
        body: [
          t('The bile ducts are divided into intrahepatic and extrahepatic ducts. The bile canaliculi are defined first: they are not real ducts with their own vessel structure, but spaces between opposing grooves in the plasma membranes of hepatocytes, sealed by tight junctions. These tight junctions form the blood–bile barrier.',
            'Os ductos biliares se dividem em intra-hepáticos e extra-hepáticos. Os canalículos biliares são definidos primeiro: não são ductos verdadeiros com estrutura própria de parede, mas espaços entre sulcos opostos da membrana plasmática dos hepatócitos, selados por junções oclusivas. Essas junções formam a barreira sangue-bile.'),
          t('This repeats that bile is secreted from the biliary pole of the hepatocytes into the bile capillaries, at 600–1000 ml per day. Use this to fix the two groups before the sequence that follows.',
            'Isto repete que a bile é secretada pelo polo biliar dos hepatócitos para os capilares biliares, à razão de 600–1000 ml por dia. Use isto para fixar os dois grupos antes da sequência que segue.'),
        ],
      },
      {
        id: 'gbspleen-p28', ref: '28', title: t('The intrahepatic canaliculi and the blood–bile barrier', 'Os canalículos intra-hepáticos e a barreira sangue-bile'),
        focus: ['hepatic_ducts', 'caudate_lobe'], ghost: ['hepatic_portal_v', 'ivc_g'], view: 'ant',
        body: [
          t('Intrahepatic bile ducts begin as bile canaliculi. These are described as ducts without a proper wall, delimited by invaginations of the plasma membrane of two opposing hepatocytes. The figure labels the endothelial cell with its pores, the lumen of the sinusoid, the perisinusoidal space, the stellate macrophage, the canaliculus, the junction complex of the biliary pole, the Golgi complex, the rough endoplasmic reticulum, the mitochondrion, the lysosome, the collagen fibres and a red blood cell.',
            'Os ductos biliares intra-hepáticos começam como canalículos biliares. São descritos como ductos sem parede própria, delimitados por invaginações da membrana plasmática de dois hepatócitos opostos. A figura rotula a célula endotelial com seus poros, o lúmen do sinusoide, o espaço perissinusoidal, o macrófago estrelado, o canalículo, o complexo de junção do polo biliar, o complexo de Golgi, o retículo endoplasmático rugoso, a mitocôndria, o lisossomo, as fibras de colágeno e uma hemácia.'),
          t('⚠ At the canalicular stage, page 28 describes the structure as a «duct without a proper wall». Page 29 uses the same word, canaliculi, for a later stage and says those do have a proper wall. This is a terminology conflict: the canalicular stage has no wall, as page 28 says, and the later canaliculi have a wall, as page 29 says.',
            '⚠ Na fase canalicular, a página 28 descreve a estrutura como um «ducto sem parede própria». A página 29 usa a mesma palavra, canalículos, para uma fase posterior e diz que essas já têm parede própria. Isso é um conflito de terminologia: a fase canalicular não tem parede, como diz a página 28, e os canalículos posteriores têm parede, como diz a página 29.'),
        ],
      },
      {
        id: 'gbspleen-p29', ref: '29', title: t('From the periphery to the major intrahepatic ducts', 'Da periferia aos grandes ductos intra-hepáticos'),
        focus: ['hepatic_ducts', 'hepatic_portal_v', 'ivc_g'], view: 'ant',
        body: [
          t('Moving towards the periphery of the lobule, the canaliculi become ducts with a proper wall, which unite to form the intralobular bile ductules, called cholangioles. The cholangioles unite toward the angle of the lobule to form the periportal bile ductules, the canals of Hering. The canals of Hering unite to form the major intrahepatic bile ducts.',
            'Indo para a periferia do lóbulo, os canalículos se tornam ductos com parede própria, que se unem para formar os ductúlos biliares intralobulares, chamados colangíolos. Os colangíolos se unem em direção ao ângulo do lóbulo para formar os ductúlos biliares periportais, os canais de Hering. Os canais de Hering se unem para formar os grandes ductos biliares intra-hepáticos.'),
          t('The figure labels the branch of the portal vein, the central vein, the limiting plate of the portal space, the interlobular bile duct, the terminal branch of the hepatic portal vein and the sinusoids. The bile ducts then reunite and leave the liver as the left and right hepatic ducts.',
            'A figura rotula o ramo da veia porta, a veia central, a placa limitante do espaço porta, o ducto biliar interlobular, o ramo terminal da veia porta hepática e os sinusoides. Os ductos biliares então se reúnem e deixam o fígado como os ductos hepáticos direito e esquerdo.'),
        ],
      },
      {
        id: 'gbspleen-p30', ref: '30', title: t('The left and right hepatic ducts and the sectoral ducts', 'Os ductos hepáticos direito e esquerdo e os ductos setoriais'),
        focus: ['hepatic_ducts', 'gallbladder', 'cystic_duct', 'common_hepatic_duct', 'duodenum', 'pancreas'], ghost: ['caudate_lobe', 'stomach', 'common_hepatic_a'], view: 'ant',
        body: [
          t('The bile ducts unite and leave the liver as the left and right hepatic ducts. The figure labels the right anterior (medial) sectoral duct and the right posterior (lateral) sectoral duct, which are the two parts of the right hepatic duct system, together with the round ligament, the cystic duct, the gallbladder fundus, body and neck, the common hepatic duct and the common bile duct.',
            'Os ductos biliares se unem e deixam o fígado como os ductos hepáticos direito e esquerdo. A figura rotula o ducto setorial anterior (medial) direito e o ducto setorial posterior (lateral) direito, que são as duas partes do sistema do ducto hepático direito, junto com o ligamento redondo, o ducto cístico, o fundo, o corpo e o colo da vesícula, o ducto hepático comum e o colédoco.'),
          t('The bile duct is labelled in three segments: the supraduodenal segment, the retroduodenal segment and the retropancreatic segment. The figure also shows the duodenum, the left hepatic duct and the pancreas, with the stomach and the common hepatic artery in the view. The bile duct passes behind the duodenum, and these three segments are that route.',
            'O colédoco aparece em três segmentos rotulados: o segmento supraduodenal, o retroduodenal e o retropancreático. A figura também mostra o duodeno, o ducto hepático esquerdo e o pâncreas, com o estômago e a artéria hepática comum na vista. O colédoco passa atrás do duodeno, e esses três segmentos são esse trajeto.'),
        ],
      },
      {
        id: 'gbspleen-p31', ref: '31', title: t('The common hepatic duct and the porta hepatis', 'O ducto hepático comum e o hilo hepático'),
        focus: ['common_hepatic_duct', 'hepatic_ducts', 'caudate_lobe', 'hepatic_portal_v', 'ivc_g', 'gallbladder'], view: 'ant',
        body: [
          t('The left and right hepatic ducts unite to form the common hepatic duct, which leaves the liver at the porta hepatis. The figure frames this junction in the porta hepatis between the caudate and quadrate lobes, showing the left and right hepatic ducts uniting into the common hepatic duct and then meeting the cystic duct to form the bile duct, surrounded by the portal vein, left lobe, round ligament of the liver, gallbladder, inferior vena cava, ligament of the vena cava, left hepatic vein and bare area.',
            'Os ductos hepáticos direito e esquerdo se unem para formar o ducto hepático comum, que deixa o fígado no hilo hepático. A figura enquadra essa junção no hilo hepático entre os lobos caudado e quadrado, mostrando os ductos hepáticos esquerdo e direito se unindo no ducto hepático comum e depois encontrando o ducto cístico para formar o colédoco, cercados pela veia porta, lobo esquerdo, ligamento redondo do fígado, vesícula biliar, veia cava inferior, ligamento da veia cava, veia hepática esquerda e área nua.'),
        ],
      },
      {
        id: 'gbspleen-p32', ref: '32', title: t('The common bile duct, the ampulla and the sequence of ducts', 'O colédoco, a ampola e a sequência dos ductos'),
        focus: ['common_hepatic_duct', 'pancreatic_duct', 'duodenum', 'hepatic_ducts', 'gallbladder', 'cystic_duct', 'pancreas'], view: 'ant',
        body: [
          t('The common hepatic duct and the cystic duct unite to form the common bile duct. The common bile duct enters the hepatopancreatic ampulla (of Vater) together with the main pancreatic duct. The ampulla is seen in the duodenum as the major duodenal papilla.',
            'O ducto hepático comum e o ducto cístico se unem para formar o colédoco. O colédoco entra na ampola hepatopancreática (de Vater) junto com o ducto pancreático principal. A ampola é vista no duodeno como a papila duodenal maior.'),
          t('The full sequence is given: bile canaliculi, bile canals, bile ductules, interlobular bile ducts, major intrahepatic bile ducts, right and left hepatic ducts, common hepatic duct with the cystic duct, the common bile duct, the common bile duct with the main pancreatic duct, and the hepatopancreatic ampulla. The figure, Fig. 15.27, is an anterior view with the gallbladder and duodenum opened, and it also shows the accessory pancreatic duct and the minor papilla.',
            'A sequência completa é dada: canalículos biliares, canais biliares, ductúlos biliares, ductos biliares interlobulares, grandes ductos biliares intra-hepáticos, ductos hepáticos direito e esquerdo, ducto hepático comum com o ducto cístico, o colédoco, o colédoco com o ducto pancreático principal e a ampola hepatopancreática. A figura, Fig. 15.27, é uma vista anterior com a vesícula e o duodeno abertos, e também mostra o ducto pancreático acessório e a papila menor.'),
        ],
      },
      {
        id: 'gbspleen-p33', ref: '33', title: t('The hepatoduodenal ligament and Calot’s triangle (figure)', 'O ligamento hepatoduodenal e o triângulo de Calot (figura)'),
        focus: ['pancreas', 'duodenum', 'gallbladder', 'hepatic_portal_v', 'common_hepatic_a', 'common_hepatic_duct', 'sma', 'smv'], ghost: ['transverse_colon', 'caudate_lobe'], view: 'ant',
        body: [
          t('This is a figure only, pairing two views of the hepatoduodenal ligament. Panel (a) shows the hepatoduodenal ligament carrying the portal vein, proper hepatic artery and common bile duct above the descending part of the duodenum, in relation to the pancreas, root of the transverse mesocolon, duodenojejunal flexure, transverse colon, greater omentum, root of the mesentery and superior mesenteric artery and vein. Panel (b) opens the hepatoduodenal ligament to highlight Calot’s triangle (the textbook reference is not reproduced) between the gallbladder/cystic duct, common bile duct region and cystic artery, beside the proper hepatic artery and hepatic portal vein.',
            'Há apenas uma figura, reunindo duas vistas do ligamento hepatoduodenal. O painel (a) mostra o ligamento hepatoduodenal levando a veia porta, a artéria hepática própria e o colédoco acima da parte descendente do duodeno, em relação com o pâncreas, a raiz do mesocolo transverso, a flexura duodenojejunal, o colo transverso, o omento maior, a raiz do mesentério e a artéria e veia mesentéricas superiores. O painel (b) abre o ligamento hepatoduodenal para destacar o triângulo de Calot (a referência ao livro-texto não é reproduzida) entre a vesícula/ducto cístico, a região do colédoco e a artéria cística, ao lado da artéria hepática própria e da veia porta hepática.'),
        ],
      },
    ],
    questions: [
      { ref: '26', q: 'How much bile does the liver secrete per day, according to slide 26?', correct: '600–1000 ml per day', wrong: ['50–100 ml per day', '2–3 litres per day', '10–20 ml per day'], why: 'Slide 26: bile is secreted at 600–1000 ml per day.',
        pt: { q: 'Quanta bile o fígado secreta por dia, segundo o slide 26?', correct: '600–1000 ml por dia', wrong: ['50–100 ml por dia', '2–3 litros por dia', '10–20 ml por dia'], why: 'Slide 26: a bile é secretada a 600–1000 ml por dia.' } },
      { ref: '27', q: 'What forms the bile canaliculi, according to slide 27?', correct: 'Grooves in the membranes of two opposing hepatocytes, sealed by tight junctions', wrong: ['A wall of cholangiocytes alone', 'A branch of the portal vein', 'The endothelial cells of the sinusoid'], why: 'Slide 27: canaliculi are spaces between opposing grooves in two hepatocytes, sealed by tight junctions (blood–bile barrier).',
        pt: { q: 'O que forma os canalículos biliares, segundo o slide 27?', correct: 'Sulcos nas membranas de dois hepatócitos opostos, selados por junções oclusivas', wrong: ['Somente uma parede de colangiócitos', 'Um ramo da veia porta', 'As células endoteliais do sinusoide'], why: 'Slide 27: os canalículos são espaços entre sulcos opostos de dois hepatócitos, selados por junções oclusivas (barreira sangue-bile).' } },
      { ref: '29', q: 'What are the canals of Hering, according to slide 29?', correct: 'Periportal bile ductules', wrong: ['Intralobular bile ductules (cholangioles)', 'The left hepatic duct', 'The cystic duct'], why: 'Slide 29: the cholangioles unite to form the periportal bile ductules, the canals of Hering.',
        pt: { q: 'O que são os canais de Hering, segundo o slide 29?', correct: 'Ductúlos biliares periportais', wrong: ['Ductúlos biliares intralobulares (colangíolos)', 'O ducto hepático esquerdo', 'O ducto cístico'], why: 'Slide 29: os colangíolos se unem para formar os ductúlos biliares periportais, os canais de Hering.' } },
      { ref: '30', q: 'As what do the bile ducts leave the liver, according to slide 30?', correct: 'The left and right hepatic ducts', wrong: ['The common bile duct', 'The cystic duct', 'The hepatopancreatic ampulla'], why: 'Slide 30: the bile ducts unite and leave the liver as the left and right hepatic ducts.',
        pt: { q: 'Como os ductos biliares deixam o fígado, segundo o slide 30?', correct: 'Como os ductos hepáticos direito e esquerdo', wrong: ['Como o colédoco', 'Como o ducto cístico', 'Como a ampola hepatopancreática'], why: 'Slide 30: os ductos biliares se unem e deixam o fígado como os ductos hepáticos direito e esquerdo.' } },
      { ref: '31', q: 'Where does the common hepatic duct leave the liver?', correct: 'At the porta hepatis', wrong: ['At the fundus of the gallbladder', 'At the major duodenal papilla', 'At the lesser sac'], why: 'Slide 31: the left and right hepatic ducts unite to form the common hepatic duct, which leaves the liver at the porta hepatis.',
        pt: { q: 'Onde o ducto hepático comum deixa o fígado?', correct: 'No hilo hepático', wrong: ['No fundo da vesícula', 'Na papila duodenal maior', 'Na bolsa omental'], why: 'Slide 31: os ductos hepáticos direito e esquerdo se unem no ducto hepático comum, que deixa o fígado no hilo hepático.' } },
      { ref: '32', q: 'Which duct joins the common bile duct at the hepatopancreatic ampulla?', correct: 'The main pancreatic duct', wrong: ['The accessory pancreatic duct', 'The cystic artery', 'The right hepatic duct'], why: 'Slide 32: the bile duct enters, together with the main pancreatic duct, the hepatopancreatic ampulla of Vater.',
        pt: { q: 'Qual ducto se une ao colédoco na ampola hepatopancreática?', correct: 'O ducto pancreático principal', wrong: ['O ducto pancreático acessório', 'A artéria cística', 'O ducto hepático direito'], why: 'Slide 32: o colédoco entra, junto com o ducto pancreático principal, na ampola hepatopancreática de Vater.' } },
    ],
  },
  {
    id: 'gbspleen-4', title: t('Gallstones, cystic artery and veins, and Calot’s triangle', 'Cálculos biliares, artéria e veias císticas, e o triângulo de Calot'),
    cards: [
      {
        id: 'gbspleen-p34', ref: '34', title: t('Gallstones and jaundice', 'Cálculos biliares e icterícia'),
        focus: ['gallbladder', 'cystic_duct', 'common_hepatic_duct', 'pancreas', 'pancreatic_duct'], ghost: ['duodenum', 'stomach'], view: 'ant',
        body: [
          t('Gallstones are hard stones, possibly a few centimetres across, found in the gallbladder or in the ducts. They are composed mainly of cholesterol, calcium carbonate and bilirubin. They cause strong pain when they clog the bile ducts, or when the gallbladder or the ducts contract.',
            'Os cálculos biliares são pedras duras, possivelmente com alguns centímetros, encontradas na vesícula ou nos ductos. São compostos principalmente de colesterol, carbonato de cálcio e bilirrubina. Causam dor intensa quando obstruem os ductos biliares, ou quando a vesícula ou os ductos se contraem.'),
          t('When they block the bile flow to the duodenum, they cause jaundice. The bile is then not eliminated through the faeces; it is absorbed into the blood, and the yellow bile pigments are deposited in the tissues, yellowing the skin. The figure shows post-hepatic jaundice, with normal bile flow beside the blocked flow, bilirubin processed in the liver, and a blockage by pancreatic cancer in the head, with the yellowing of the whites of the eyes.',
            'Quando bloqueiam o fluxo da bile para o duodeno, causam icterícia. A bile então não é eliminada pelas fezes; é absorvida pelo sangue, e os pigmentos biliares amarelos se depositam nos tecidos, deixando a pele amarelada. A figura mostra a icterícia pós-hepática, com o fluxo normal da bile ao lado do fluxo bloqueado, a bilirrubina processada no fígado e um bloqueio por câncer de pâncreas na cabeça, com o amarelamento da esclera.'),
        ],
      },
      {
        id: 'gbspleen-p35', ref: '35', title: t('The cystic artery and its two branches', 'A artéria cística e seus dois ramos'),
        focus: ['cystic_duct', 'gallbladder', 'proper_hepatic_a', 'common_hepatic_a', 'celiac_trunk'], ghost: ['splenic_a', 'gastroduodenal_a', 'left_gastric_a', 'pancreaticoduodenal_a', 'gastroepiploic_a', 'pancreas'], view: 'ant',
        body: [
          t('The cystic artery usually arises from the right branch of the hepatic artery, behind the common hepatic duct, and only a few times directly from the proper hepatic artery. On reaching the superior aspect of the neck, it divides into a superficial branch, which runs along the inferior surface of the gallbladder, and a deep branch, which runs between the gallbladder and its fossa. The two branches anastomose over the surface of the body and fundus.',
            'A artéria cística costuma nascer do ramo direito da artéria hepática, atrás do ducto hepático comum, e só algumas vezes diretamente da artéria hepática própria. Ao chegar à face superior do colo, divide-se em um ramo superficial, que corre ao longo da face inferior da vesícula, e um ramo profundo, que corre entre a vesícula e a sua fossa. Os dois ramos se anastomosam sobre a superfície do corpo e do fundo.'),
          t('The figure is the arterial map of the upper abdomen: the celiac trunk, the left gastric artery with its oesophageal branch and recurrent branch of the left inferior phrenic artery, the hepatic arteries, the splenic artery and its branches, the short gastric arteries, the supraduodenal artery, the pancreaticoduodenal arteries, the right and left gastro-omental arteries, the gastroduodenal artery, and the dorsal pancreatic artery.',
            'A figura é o mapa arterial do abdome superior: o tronco celíaco, a artéria gástrica esquerda com seu ramo esofágico e o ramo recorrente da frênica inferior esquerda, as artérias hepáticas, a artéria esplênica e seus ramos, as artérias gástricas curtas, a artéria supraduodenal, as artérias pancreaticoduodenais, as artérias gastro-omentais direita e esquerda, a artéria gastroduodenal e a artéria pancreática dorsal.'),
        ],
      },
      {
        id: 'gbspleen-p36', ref: '36', title: t('The variants of the cystic artery', 'As variantes da artéria cística'),
        focus: ['cystic_duct', 'gallbladder', 'proper_hepatic_a', 'sma', 'common_hepatic_a', 'celiac_trunk'], ghost: ['abdominal_aorta_g', 'splenic_a'], view: 'ant',
        body: [
          t('Four variants of the cystic artery are listed. (a) It arises from the right hepatic artery, behind the common hepatic duct, in 46% of cases. (b) There are two cystic arteries, in 13% of cases. (c) It arises from the right branch of the superior mesenteric artery, in 12% of cases. (d) It arises from the left branch of the proper hepatic artery, in 5% of cases.',
            'São listadas quatro variantes da artéria cística. (a) Nasce do ramo direito da artéria hepática, atrás do ducto hepático comum, em 46% dos casos. (b) Há duas artérias císticas, em 13% dos casos. (c) Nasce do ramo direito da artéria mesentérica superior, em 12% dos casos. (d) Nasce do ramo esquerdo da artéria hepática própria, em 5% dos casos.'),
          t('The figure shows these variants with the right and left branches and the cystic artery arising from the superior mesenteric artery. It is not said whether the variant from the superior mesenteric artery counts as normal or abnormal, so state it as a variant, with its percentage.',
            'A figura mostra essas variantes com os ramos direito e esquerdo e a artéria cística originada da artéria mesentérica superior. Não se diz se a variante originada da mesentérica superior é normal ou anormal, então apresente-a como uma variante, com sua porcentagem.'),
        ],
      },
      {
        id: 'gbspleen-p37', ref: '37', title: t('The cystic veins', 'As veias císticas'),
        focus: ['gallbladder', 'hepatic_portal_v', 'smv', 'splenic_v', 'imv', 'gastric_v'], ghost: ['pancreas', 'transverse_colon', 'ileum'], view: 'ant',
        body: [
          t('The cystic veins are many small veins. A few end in the right branch of the portal vein. Others lie in the areolar tissue between the gallbladder and the liver and drain into segmental portal veins inside the liver. These form the cystic group of accessory hepatic portal veins.',
            'As veias císticas são muitas veias pequenas. Algumas terminam no ramo direito da veia porta. Outras ficam no tecido areolar entre a vesícula e o fígado e drenam para as veias porta segmentares dentro do fígado. Elas formam o grupo cístico das veias porta hepáticas acessórias.'),
          t('The figure is the typical arrangement of the portal vein, with the left gastric vein and the oesophageal vein, the short gastric veins, the hepatic portal vein, the posterior superior pancreaticoduodenal vein, the superior mesenteric vein, the right and left gastro-omental veins, the inferior pancreaticoduodenal veins, the pancreatic veins, the splenic vein, the left, middle and right colic veins, the ileocolic vein and the inferior mesenteric vein. It also shows the cystic artery, the anterior and posterior cystic veins and a visceral sensory nerve.',
            'A figura é o arranjo típico da veia porta, com a veia gástrica esquerda e a veia esofágica, as veias gástricas curtas, a veia porta hepática, a veia pancreaticoduodenal superior posterior, a veia mesentérica superior, as veias gastro-omentais direita e esquerda, as veias pancreaticoduodenais inferiores, as veias pancreáticas, a veia esplênica, as veias cólicas esquerda, média e direita, a veia ileocólica e a veia mesentérica inferior. Também mostra a artéria cística, as veias císticas anterior e posterior e um nervo sensitivo visceral.'),
        ],
      },
      {
        id: 'gbspleen-p38', ref: '38', title: t('Calot’s triangle at the hilum', 'O triângulo de Calot no hilo'),
        focus: ['gallbladder', 'cystic_duct', 'common_hepatic_duct', 'proper_hepatic_a', 'hepatic_portal_v'], ghost: ['caudate_lobe', 'duodenum'], view: 'ant',
        body: [
          t('At the hepatic hilum, after opening the hepatoduodenal ligament and removing nerves and lymphatics, the cystic hilum can be recognised by three structures: the cystic artery (or the ventral surface of the right lobe of the liver), the cystic duct, and the common hepatic duct. Identifying them helps to minimise complications of laparoscopic cholecystectomy, such as injury to the biliary tree.',
            'No hilo hepático, depois de abrir o ligamento hepatoduodenal e retirar nervos e linfáticos, o hilo cístico pode ser reconhecido por três estruturas: a artéria cística (ou a face ventral do lobo direito do fígado), o ducto cístico e o ducto hepático comum. Identificá-las ajuda a reduzir as complicações da colecistectomia laparoscópica, como a lesão da árvore biliar.'),
          t('The figure is a topography of Calot’s triangle at the portal fissure, with the gallbladder lifted from its bed. It notes that 95% of injuries to the extrahepatic bile ducts happen during surgery, most commonly during cholecystectomy. Before cutting the cystic artery and the cystic duct, the triangle must be identified: the gallbladder fundus is grasped and pulled up to open it, and the structures to be cut are ligated with clips.',
            'A figura é a topografia do triângulo de Calot na fissura porta, com a vesícula levantada do leito. Ela registra que 95% das lesões dos ductos biliares extra-hepáticos ocorrem durante a cirurgia, mais comumente na colecistectomia. Antes de cortar a artéria cística e o ducto cístico, o triângulo precisa ser identificado: o fundo da vesícula é segurado e puxado para cima para abri-lo, e as estruturas a cortar são ligadas com clipes.'),
        ],
      },
    ],
    questions: [
      { ref: '34', q: 'Which substances make up gallstones mainly, according to slide 34?', correct: 'Cholesterol, calcium carbonate and bilirubin', wrong: ['Iron oxide, urea and sodium chloride', 'Uric acid, phosphate and protein', 'Keratin, calcium phosphate and mucus'], why: 'Slide 34: gallstones are composed mainly of cholesterol, calcium carbonate and bilirubin.',
        pt: { q: 'Quais substâncias compõem principalmente os cálculos biliares, segundo o slide 34?', correct: 'Colesterol, carbonato de cálcio e bilirrubina', wrong: ['Óxido de ferro, ureia e cloreto de sódio', 'Ácido úrico, fosfato e proteína', 'Queratina, fosfato de cálcio e muco'], why: 'Slide 34: os cálculos são compostos principalmente de colesterol, carbonato de cálcio e bilirrubina.' } },
      { ref: '34', q: 'Why does a blocked bile flow cause jaundice, according to slide 34?', correct: 'Bile is not eliminated in the faeces and is absorbed into the blood', wrong: ['Bile is stored in the spleen instead of the gallbladder', 'The duodenum produces excess bile', 'The pancreas secretes bile instead of juice'], why: 'Slide 34: the bile is not eliminated in the faeces but absorbed into the blood, and its pigments yellow the tissues.',
        pt: { q: 'Por que o bloqueio do fluxo biliar causa icterícia, segundo o slide 34?', correct: 'A bile não é eliminada nas fezes e é absorvida pelo sangue', wrong: ['A bile fica armazenada no baço em vez da vesícula', 'O duodeno produz bile em excesso', 'O pâncreas secreta bile em vez de suco'], why: 'Slide 34: a bile não é eliminada nas fezes, mas absorvida pelo sangue, e seus pigmentos amarelam os tecidos.' } },
      { ref: '35', q: 'From which artery does the cystic artery usually arise, according to slide 35?', correct: 'The right branch of the hepatic artery, behind the common hepatic duct', wrong: ['The splenic artery', 'The left gastric artery', 'The superior mesenteric artery'], why: 'Slide 35: the cystic artery usually arises from the right branch of the hepatic artery, posterior to the common hepatic duct.',
        pt: { q: 'De qual artéria costuma nascer a artéria cística, segundo o slide 35?', correct: 'Do ramo direito da artéria hepática, atrás do ducto hepático comum', wrong: ['Da artéria esplênica', 'Da artéria gástrica esquerda', 'Da artéria mesentérica superior'], why: 'Slide 35: a artéria cística costuma nascer do ramo direito da artéria hepática, posterior ao ducto hepático comum.' } },
      { ref: '36', q: 'In what percentage of cases does the cystic artery arise from the right branch of the hepatic artery, behind the common hepatic duct?', correct: '46%', wrong: ['13%', '12%', '5%'], why: 'Slide 36, variant a: 46% of cases.',
        pt: { q: 'Em que porcentagem dos casos a artéria cística nasce do ramo direito da artéria hepática, atrás do ducto hepático comum?', correct: '46%', wrong: ['13%', '12%', '5%'], why: 'Slide 36, variante a: 46% dos casos.' } },
      { ref: '37', q: 'Where do some of the cystic veins drain, according to slide 37?', correct: 'Into segmental portal veins inside the liver (cystic group of accessory hepatic portal veins)', wrong: ['Directly into the inferior vena cava', 'Into the splenic artery', 'Into the superior mesenteric artery'], why: 'Slide 37: some drain into segmental portal veins inside the liver, the cystic group of accessory hepatic portal veins.',
        pt: { q: 'Para onde drenam algumas das veias císticas, segundo o slide 37?', correct: 'Em veias porta segmentares dentro do fígado (grupo cístico das veias porta acessórias)', wrong: ['Diretamente na veia cava inferior', 'Na artéria esplênica', 'Na artéria mesentérica superior'], why: 'Slide 37: algumas drenam para veias porta segmentares dentro do fígado, o grupo cístico das veias porta hepáticas acessórias.' } },
      { ref: '38', q: 'Which three structures border Calot’s triangle, according to slide 38?', correct: 'The cystic artery, the cystic duct and the common hepatic duct', wrong: ['The cystic artery, the hepatic artery and the portal vein', 'The cystic duct, the pancreatic duct and the duodenum', 'The common bile duct, the gastroduodenal artery and the fundus'], why: 'Slide 38: the triangle is bordered by the cystic artery, the cystic duct and the common hepatic duct.',
        pt: { q: 'Quais três estruturas delimitam o triângulo de Calot, segundo o slide 38?', correct: 'A artéria cística, o ducto cístico e o ducto hepático comum', wrong: ['A artéria cística, a artéria hepática e a veia porta', 'O ducto cístico, o ducto pancreático e o duodeno', 'O colédoco, a artéria gastroduodenal e o fundo'], why: 'Slide 38: o triângulo é delimitado pela artéria cística, pelo ducto cístico e pelo ducto hepático comum.' } },
    ],
  },
  {
    id: 'gbspleen-5', title: t('Vascularisation of the gut: origin, course and jejunal and ileal arteries', 'Vascularização do intestino: origem, trajeto e artérias jejunais e ileais'),
    cards: [
      {
        id: 'gbspleen-p39', ref: '39', title: t('The three arterial territories of the gut', 'Os três territórios arteriais do intestino'),
        focus: ['celiac_trunk', 'sma', 'ima'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The arterial supply of the gastrointestinal tract is given in three territories: the coeliac trunk for the foregut, the superior mesenteric artery (SMA) for the midgut, and the inferior mesenteric artery (IMA) for the hindgut. The figure labels these three, with the midgut in the middle of the diagram.',
            'O suprimento arterial do trato gastrointestinal é dado em três territórios: o tronco celíaco para o intestino anterior, a artéria mesentérica superior (AMS) para o intestino médio, e a artéria mesentérica inferior (AMI) para o intestino posterior. A figura rotula esses três, com o intestino médio no centro do desenho.'),
          t('This part is headed «vascularization» and repeats the list of the three arteries. The 3D model focuses the coeliac trunk, the SMA and the IMA, which lets you see the three territories at once.',
            'Esta parte tem o título «vascularização» e repete a lista das três artérias. O modelo 3D destaca o tronco celíaco, a AMS e a AMI, o que permite ver os três territórios de uma vez.'),
        ],
      },
      {
        id: 'gbspleen-p40', ref: '40', title: t('What the SMA supplies, and where it starts', 'O que a AMS irriga e de onde ela começa'),
        focus: ['sma', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'appendicular_a', 'celiac_trunk'], ghost: ['ascending_colon', 'transverse_colon', 'ileum', 'appendix', 'pancreas', 'duodenum'], view: 'ant',
        body: [
          t('The superior mesenteric artery supplies the structures of the midgut: the distal half of the duodenum, the jejunum and ileum, the caecum and appendix, the ascending colon, the right colic flexure, and the proximal half of the transverse colon. It arises from the aorta 1 cm below the coeliac trunk, at L1.',
            'A artéria mesentérica superior irriga as estruturas do intestino médio: a metade distal do duodeno, o jejuno e o íleo, o ceco e o apêndice, o colo ascendente, a flexura cólica direita e a metade proximal do colo transverso. Ela nasce da aorta 1 cm abaixo do tronco celíaco, em L1.'),
          t('⚠ The left diagram traces the SMA branches across the midgut—labelling the inferior pancreaticoduodenal artery, middle colic, right colic, ileocolic and appendicular arteries, jejunal and ileal arteries, and the left colic flexure as the distal landmark—while the right skeletal figure marks the SMA arising from the abdominal aorta above the L4 vertebra. Deck 10 (page 40) gives the SMA’s share of the transverse colon as proximal two-thirds, while this section says proximal one half. If a question uses the proportion, answer with the value the question itself uses.',
            '⚠ O diagrama à esquerda traça os ramos da AMS ao longo do intestino médio — rotulando a artéria pancreaticoduodenal inferior, as artérias cólica média, cólica direita, ileocólica e apendicular, as artérias jejunais e ileais, e a flexura cólica esquerda como limite distal —, enquanto a figura esquelética à direita marca a AMS saindo da aorta abdominal acima da vértebra L4. O deck 10 (página 40) dá a parcela da AMS no colo transverso como dois terços proximais, enquanto esta seção diz metade proximal. Se uma questão usar a proporção, use o valor que a própria questão usa.'),
        ],
      },
      {
        id: 'gbspleen-p41', ref: '41', title: t('The origins of the abdominal branches, with vertebral levels', 'As origens dos ramos abdominais, com os níveis vertebrais'),
        focus: ['celiac_trunk', 'sma', 'ima', 'splenic_a', 'common_hepatic_a', 'gastroduodenal_a', 'abdominal_aorta_g'], ghost: ['spleen', 'stomach', 'duodenum', 'ivc_g'], view: 'ant',
        body: [
          t('The figure is the arterial map of the aorta and its anterior branches, with the levels given on the drawing: the coeliac trunk at T12, the superior mesenteric artery at L1, the renal arteries at L1/L2, the inferior mesenteric artery at L3 and the aortic bifurcation at L4. Other labelled branches are the inferior phrenic, suprarenal, gonadal and lumbar arteries, and the median sacral artery.',
            'A figura é o mapa arterial da aorta e de seus ramos anteriores, com os níveis indicados no desenho: o tronco celíaco em T12, a artéria mesentérica superior em L1, as artérias renais em L1/L2, a artéria mesentérica inferior em L3 e a bifurcação aórtica em L4. Outros ramos rotulados são as frênicas inferiores, as suprarrenais, as gonadais e as lombares, e a artéria sacral mediana.'),
          t('The figure also labels the common hepatic artery, the proper hepatic artery, the gastroduodenal artery, the splenic artery, the left gastric artery and the right gastric artery. Use the levels to place the SMA between the coeliac trunk and the inferior mesenteric artery on the aorta.',
            'A figura também rotula a artéria hepática comum, a artéria hepática própria, a artéria gastroduodenal, a artéria esplênica, a artéria gástrica esquerda e a artéria gástrica direita. Use os níveis para situar a AMS entre o tronco celíaco e a artéria mesentérica inferior na aorta.'),
        ],
      },
      {
        id: 'gbspleen-p42', ref: '42', title: t('The course of the SMA behind the pancreas', 'O trajeto da AMS atrás do pâncreas'),
        focus: ['sma', 'smv', 'pancreas', 'duodenum', 'ivc_g'], ghost: ['celiac_trunk', 'abdominal_aorta_g', 'spleen'], view: 'ant',
        body: [
          t('The SMA originates beneath the head of the pancreas, next to the superior mesenteric vein. It passes in front of the uncinate process of the pancreas and the third part of the duodenum. It gives numerous branches: to the left side of the small intestine and to the right side of the colon. The schematic diagram shows the celiac trunk above the SMA on the abdominal aorta, with the left renal artery beside it and the left renal vein and horizontal part of the duodenum passing between the aorta and the SMA above the small intestine.',
            'A AMS nasce abaixo da cabeça do pâncreas, junto com a veia mesentérica superior. Passa na frente do processo uncinado do pâncreas e da terceira parte do duodeno. Dá numerosos ramos: para o lado esquerdo do intestino delgado e para o lado direito do colo. O diagrama esquemático mostra o tronco celíaco acima da AMS na aorta abdominal, com a artéria renal esquerda ao lado e a veia renal esquerda e a parte horizontal do duodeno passando entre a aorta e a AMS, acima do intestino delgado.'),
          t('The relation to the left renal vein is not stated in words; the diagram places it posterior to the SMA, and two dissection photographs show the SMA crossing anteriorly over the duodenum and branching to the left (small intestine) and right (colon). Use the 3D model to see the SMA emerging from the aorta and descending in front of the duodenum.',
            'A relação com a veia renal esquerda não é dita em palavras; o diagrama a situa posteriormente à AMS, e duas fotografias de dissecção mostram a AMS cruzando anteriormente sobre o duodeno e emitindo ramos para a esquerda (intestino delgado) e para a direita (colo). Use o modelo 3D para ver a AMS saindo da aorta e descendo na frente do duodeno.'),
        ],
      },
      {
        id: 'gbspleen-p43', ref: '43', title: t('The course of the SMA and the jejunal and ileal arteries', 'O trajeto da AMS e as artérias jejunais e ileais'),
        focus: ['sma', 'ileocolic_a', 'middle_colic_a', 'right_colic_a', 'appendicular_a', 'left_colic_a'], ghost: ['ileum', 'jejunum', 'ascending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('The SMA descends in a curve with its convexity to the left, and it reaches the right iliac fossa, where it ends by anastomosing with the ileocolic artery, one of its own branches. Its first branches are the jejunal and ileal arteries, which come from the left side of the SMA and supply the jejunum and ileum, but not the distal end of the ileum.',
            'A AMS desce em uma curva com a convexidade voltada para a esquerda, e alcança a fossa ilíaca direita, onde termina anastomosando-se com a artéria ileocólica, um de seus próprios ramos. Seus primeiros ramos são as artérias jejunais e ileais, que saem do lado esquerdo da AMS e irrigam o jejuno e o íleo, mas não a extremidade distal do íleo.'),
          t('The jejunal and ileal arteries start parallel to one another in the mesentery. Each divides into two branches, and the branches join their neighbours to form arcades. The figure labels the middle colic, left colic, right colic, appendicular arteries and the jejunal and ileal arteries, with the straight arteries running from the arcades.',
            'As artérias jejunais e ileais começam paralelas umas às outras no mesentério. Cada uma se divide em dois ramos, e os ramos se unem aos vizinhos para formar arcadas. A figura rotula as artérias cólicas média, esquerda e direita, a apendicular e as artérias jejunais e ileais, com as artérias retas saindo das arcadas.'),
        ],
      },
      {
        id: 'gbspleen-p44', ref: '44', title: t('The straight arteries (arteriae rectae)', 'As artérias retas (arteriae rectae)'),
        focus: ['sma', 'ileum', 'jejunum'], ghost: ['appendix'], view: 'ant',
        body: [
          t('From the distal arcades, the straight arteries (arteriae rectae) are given off, and they end in the layers of the small intestine. The straight arteries reach the concave margin of the small intestine and bifurcate, running along the opposite surfaces of the loop. Then they anastomose with their corresponding terminal branches on the convex margin.',
            'Das arcadas distais saem as artérias retas (arteriae rectae), que terminam nas camadas do intestino delgado. As artérias retas alcançam a margem côncava do intestino delgado e se bifurcam, correndo pelas superfícies opostas da alça. Depois se anastomosam com seus ramos terminais correspondentes na margem convexa.'),
          t('The figure shows the branches of a straight artery running through the mesentery to the loop of the small intestine.',
            'A figura mostra os ramos de uma artéria reta correndo pelo mesentério até a alça do intestino delgado.'),
        ],
      },
      {
        id: 'gbspleen-p45', ref: '45', title: t('The tiers of arcades in the jejunum and the ileum', 'As camadas de arcadas no jejuno e no íleo'),
        focus: ['sma', 'jejunum', 'ileum'], view: 'ant',
        body: [
          t('The tiers of vascular arcades are counted: the jejunum contains 1–3 tiers, whereas the ileum contains 2–6 tiers. Two dissection photographs compare a proximal loop with a more distal loop, showing the arcades increasing distally.',
            'São contadas as camadas de arcadas vasculares: o jejuno contém 1–3 camadas, enquanto o íleo contém 2–6 camadas. Duas fotografias de dissecção comparam uma alça proximal com uma alça mais distal, mostrando as arcadas aumentando distalmente.'),
        ],
      },
    ],
    questions: [
      { ref: '39', q: 'Which artery supplies the midgut, according to slide 39?', correct: 'The superior mesenteric artery', wrong: ['The coeliac trunk', 'The inferior mesenteric artery', 'The left gastric artery'], why: 'Slide 39: coeliac trunk for the foregut, SMA for the midgut, IMA for the hindgut.',
        pt: { q: 'Qual artéria irriga o intestino médio, segundo o slide 39?', correct: 'A artéria mesentérica superior', wrong: ['O tronco celíaco', 'A artéria mesentérica inferior', 'A artéria gástrica esquerda'], why: 'Slide 39: tronco celíaco para o intestino anterior, AMS para o médio, AMI para o posterior.' } },
      { ref: '40', q: 'Where does the SMA arise from the aorta, according to slide 40?', correct: '1 cm below the coeliac trunk, at L1', wrong: ['Just above the coeliac trunk, at T12', 'At the aortic bifurcation, at L4', 'At L3, together with the inferior mesenteric artery'], why: 'Slide 40: the SMA arrives from the aorta 1 cm below the coeliac trunk (L1).',
        pt: { q: 'De onde a AMS nasce na aorta, segundo o slide 40?', correct: '1 cm abaixo do tronco celíaco, em L1', wrong: ['Logo acima do tronco celíaco, em T12', 'Na bifurcação aórtica, em L4', 'Em L3, junto com a artéria mesentérica inferior'], why: 'Slide 40: a AMS sai da aorta 1 cm abaixo do tronco celíaco (L1).' } },
      { ref: '40', q: 'Which part of the transverse colon does slide 40 assign to the SMA?', correct: 'The proximal one half', wrong: ['The distal one half', 'The whole transverse colon', 'Only the splenic flexure'], why: 'Slide 40: the SMA supplies the proximal one half of the transverse colon (deck 10 says two-thirds).',
        pt: { q: 'Qual parte do colo transverso o slide 40 atribui à AMS?', correct: 'A metade proximal', wrong: ['A metade distal', 'Todo o colo transverso', 'Somente a flexura esplênica'], why: 'Slide 40: a AMS irriga a metade proximal do colo transverso (o deck 10 diz dois terços).' } },
      { ref: '41', q: 'At which vertebral level does the coeliac trunk arise, according to the figure on slide 41?', correct: 'T12', wrong: ['L1', 'L3', 'L4'], why: 'Slide 41: coeliac trunk at T12; SMA at L1; IMA at L3; aortic bifurcation at L4.',
        pt: { q: 'Em qual nível vertebral nasce o tronco celíaco, segundo a figura do slide 41?', correct: 'T12', wrong: ['L1', 'L3', 'L4'], why: 'Slide 41: tronco celíaco em T12; AMS em L1; AMI em L3; bifurcação aórtica em L4.' } },
      { ref: '42', q: 'Which structures does the SMA pass in front of, according to slide 42?', correct: 'The uncinate process of the pancreas and the third part of the duodenum', wrong: ['The splenic artery and the stomach', 'The gallbladder and the cystic duct', 'The spleen and the left kidney'], why: 'Slide 42: the SMA passes in front of the uncinate process and the third part of the duodenum.',
        pt: { q: 'Na frente de quais estruturas passa a AMS, segundo o slide 42?', correct: 'Do processo uncinado do pâncreas e da terceira parte do duodeno', wrong: ['Da artéria esplênica e do estômago', 'Da vesícula e do ducto cístico', 'Do baço e do rim esquerdo'], why: 'Slide 42: a AMS passa na frente do processo uncinado e da terceira parte do duodeno.' } },
      { ref: '45', q: 'How many tiers of arcades does the ileum contain, according to slide 45?', correct: '2–6 tiers', wrong: ['1–3 tiers', '7–9 tiers', 'No arcades'], why: 'Slide 45: the jejunum has 1–3 tiers; the ileum has 2–6 tiers.',
        pt: { q: 'Quantas camadas de arcadas tem o íleo, segundo o slide 45?', correct: '2–6 camadas', wrong: ['1–3 camadas', '7–9 camadas', 'Nenhuma arcada'], why: 'Slide 45: o jejuno tem 1–3 camadas; o íleo tem 2–6 camadas.' } },
    ],
  },
  {
    id: 'gbspleen-6', title: t('SMA branches and the veins of the small and large intestine', 'Ramos da AMS e as veias do intestino delgado e grosso'),
    cards: [
      {
        id: 'gbspleen-p46', ref: '46', title: t('The inferior pancreaticoduodenal artery', 'A artéria pancreaticoduodenal inferior'),
        focus: ['pancreaticoduodenal_a', 'sma', 'gastroduodenal_a', 'splenic_a', 'pancreas', 'duodenum'], ghost: ['celiac_trunk', 'common_hepatic_a', 'common_hepatic_duct'], view: 'ant',
        body: [
          t('The second SMA branch is introduced: the inferior pancreaticoduodenal artery, with its anterior and posterior branches.',
            'Apresenta-se o segundo ramo da AMS: a artéria pancreaticoduodenal inferior, com seus ramos anterior e posterior.'),
          t('Two pancreatic and coeliac arterial diagrams (anterior view a and posterior view b) show the inferior pancreaticoduodenal artery arising from the superior mesenteric artery and dividing into anterior and posterior branches that anastomose with the anterior and posterior superior pancreaticoduodenal arteries from the gastroduodenal artery. Around the pancreas and duodenum, the drawings also label the abdominal aorta, celiac trunk, left gastric, common hepatic, proper hepatic and splenic arteries, the dorsal, inferior and great pancreatic arteries (and artery of pancreatic artery), and the common bile duct.',
            'Dois diagramas arteriais pancreáticos e celíacos (vista anterior a e vista posterior b) mostram a artéria pancreaticoduodenal inferior nascendo da artéria mesentérica superior e se dividindo em ramos anterior e posterior que se anastomosam com as artérias pancreaticoduodenais superiores anterior e posterior vindas da artéria gastroduodenal. Ao redor do pâncreas e do duodeno, os desenhos também rotulam a aorta abdominal, o tronco celíaco, as artérias gástrica esquerda, hepática comum, hepática própria e esplênica, as artérias pancreáticas dorsal, inferior e magna (e artéria da artéria pancreática), além do colédoco.'),
        ],
      },
      {
        id: 'gbspleen-p47', ref: '47', title: t('The ileocolic artery and its two branches', 'A artéria ileocólica e seus dois ramos'),
        focus: ['ileocolic_a', 'sma', 'appendicular_a', 'right_colic_a', 'ileum', 'ascending_colon'], ghost: ['middle_colic_a', 'left_colic_a', 'transverse_colon', 'ima', 'sigmoid_a'], view: 'ant',
        body: [
          t('The ileocolic artery comes from the right side of the SMA. It descends on the right, behind the parietal peritoneum, to the right iliac fossa, where it divides into two branches. The superior colic branch anastomoses with the right colic artery, which supplies the ascending colon. The inferior ileal branch anastomoses with the final tract of the SMA, which supplies the distal part of the ileum, the caecum and the appendix.',
            'A artéria ileocólica sai do lado direito da AMS. Desce do lado direito, atrás do peritônio parietal, até a fossa ilíaca direita, onde se divide em dois ramos. O ramo cólico superior se anastomosa com a artéria cólica direita, que irriga o colo ascendente. O ramo ileal inferior se anastomosa com o trecho final da AMS, que irriga a parte distal do íleo, o ceco e o apêndice.'),
          t('Two diagrams trace this division and its anastomoses. On the left, the ileocolic artery arises from the SMA and splits into colic and ileal branches feeding the marginal artery along the ascending colon, with anterior and posterior cecal and appendicular arteries, alongside the inferior pancreaticoduodenal (common, anterior, posterior), jejunal/ileal, right colic and middle colic arteries (in the transverse mesocolon), straight arteries (arteriae rectae), the IMA with the left colic (ascending and descending branches) and sigmoid arteries (in the sigmoid mesocolon), and the internal iliac artery below. On the right, a schematic highlights the ileocolic artery dividing into superior and inferior divisions, giving anterior and posterior caecal branches, the appendicular artery and the terminal ileal branch, alongside the jejunal and ileal branches, inferior pancreaticoduodenal artery, right colic artery, and the right, middle and left branches of the middle colic artery.',
            'Dois diagramas acompanham essa divisão e suas anastomoses. À esquerda, a artéria ileocólica nasce da AMS e se divide nos ramos cólico e ileal que alimentam a artéria marginal ao longo do colo ascendente, com as artérias cecais anterior e posterior e a artéria apendicular, ao lado das artérias pancreaticoduodenais inferiores (porção comum, anterior e posterior), jejunais/ileais, cólica direita e cólica média (no mesocolo transverso), das artérias retas (arteriae rectae), da AMI com a cólica esquerda (ramos ascendente e descendente) e das artérias sigmoides (no mesocolo sigmoide), e da artéria ilíaca interna abaixo. À direita, um esquema destaca a artéria ileocólica dividindo-se nas divisões superior e inferior, emitindo os ramos cecais anterior e posterior, a artéria apendicular e o ramo ileal terminal, junto aos ramos jejunais e ileais, artéria pancreaticoduodenal inferior, artéria cólica direita e os ramos direito, médio e esquerdo da artéria cólica média.'),
        ],
      },
      {
        id: 'gbspleen-p48', ref: '48–49', title: t('The branches of the inferior ileal branch', 'Os ramos do ramo ileal inferior'),
        focus: ['ileocolic_a', 'appendicular_a', 'ileum', 'ileocecal_junction', 'appendix', 'sma', 'middle_colic_a', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a', 'ima'], ghost: ['abdominal_aorta_g', 'ascending_colon', 'transverse_colon', 'celiac_trunk'], view: 'ant',
        body: [
          t('The inferior ileal branch gives off caecal branches (anterior and posterior), the appendicular artery, and an ileal branch that runs to the left to the last part of the ileum and anastomoses with the final part of the SMA. A numbered diagram of the whole SMA system runs from 1 (the abdominal aorta) to 24 (the coeliac trunk), with the marginal artery of Drummond (2), the arch of Riolan (7) and the sigmoid and superior rectal arteries (11 and 12).',
            'O ramo ileal inferior dá ramos cecais (anterior e posterior), a artéria apendicular e um ramo ileal que segue para a esquerda até a última parte do íleo e se anastomosa com a parte final da AMS. Um diagrama numerado de todo o sistema da AMS vai de 1 (a aorta abdominal) a 24 (o tronco celíaco), com a artéria marginal de Drummond (2), o arco de Riolan (7) e as artérias sigmoides e retal superior (11 e 12).'),
          t('The inferior ileal branch is repeated with its figure: the ascending branch, the posterior and anterior caecal arteries, the inferior division of the ileocolic artery, the colic branch, the termination of the superior mesenteric artery, the mesenteric-terminal ileal anastomosis, the terminal ileal artery, the anastomosing arcades and a recurrent branch. The mesenteric-terminal ileal anastomosis and the recurrent branch are labelled as separate structures; the recurrent branch is a vessel near the appendix, not the ileal branch.',
            'O ramo ileal inferior é repetido com sua figura: o ramo ascendente, as artérias cecais posterior e anterior, a divisão inferior da artéria ileocólica, o ramo cólico, o término da artéria mesentérica superior, a anastomose ileal mesentérico-terminal, a artéria ileal terminal, as arcadas anastomosantes e um ramo recorrente. A anastomose ileal mesentérico-terminal e o ramo recorrente são rotulados como estruturas separadas; o ramo recorrente é um vaso perto do apêndice, não o ramo ileal.'),
        ],
      },
      {
        id: 'gbspleen-p50', ref: '50', title: t('The right colic artery and the marginal artery', 'A artéria cólica direita e a artéria marginal'),
        focus: ['right_colic_a', 'sma', 'ileocolic_a', 'middle_colic_a', 'ascending_colon'], ghost: ['jejunum', 'ileum', 'transverse_colon'], view: 'ant',
        body: [
          t('The right colic artery comes from the right side of the SMA. It runs posteriorly to the parietal peritoneum, towards the right, and it has many variants. Close to the ascending colon it divides into two branches. The descending branch anastomoses with the superior colic branch of the ileocolic artery. The ascending branch anastomoses with the right branch of the middle colic artery.',
            'A artéria cólica direita sai do lado direito da AMS. Corre posteriormente ao peritônio parietal, em direção à direita, e tem muitas variantes. Perto do colo ascendente se divide em dois ramos. O ramo descendente se anastomosa com o ramo cólico superior da ileocólica. O ramo ascendente se anastomosa com o ramo direito da artéria cólica média.'),
          t('Together, these anastomoses form the marginal artery, which supplies the ascending colon and the hepatic flexure. The diagram highlights the right colic artery branching from the right side of the SMA between the middle colic artery above and the ileocolic artery below, opposite the jejunal and ileal arteries on the left.',
            'Juntas, essas anastomoses formam a artéria marginal, que irriga o colo ascendente e a flexura hepática. O diagrama destaca a artéria cólica direita saindo do lado direito da AMS entre a artéria cólica média acima e a artéria ileocólica abaixo, em frente às artérias jejunais e ileais à esquerda.'),
        ],
      },
      {
        id: 'gbspleen-p51', ref: '51', title: t('The middle colic artery and the transverse colon', 'A artéria cólica média e o colo transverso'),
        focus: ['middle_colic_a', 'sma', 'transverse_colon', 'left_colic_a', 'right_colic_a'], ghost: ['pancreas', 'ileocolic_a', 'jejunum'], view: 'ant',
        body: [
          t('The middle colic artery originates below the pancreas. It runs anteriorly and to the right, between the two sheets of the transverse mesocolon. It divides into a left and a right branch, which anastomose with the left and right colic arteries to form arcades that supply the transverse colon.',
            'A artéria cólica média nasce abaixo do pâncreas. Corre anteriormente e para a direita, entre as duas lâminas do mesocolo transverso. Divide-se em um ramo esquerdo e um direito, que se anastomosam com as artérias cólicas esquerda e direita para formar arcadas que irrigam o colo transverso.'),
          t('Two figures illustrate the middle colic artery ascending from the SMA toward the transverse colon to form arcades with the right and left colic arteries: the left schematic labels the middle colic, right colic, ileocolic and jejunal and ileal arteries coming off the SMA, while the right drawing labels the middle colic, right colic, ileocolic, appendicular, jejunal and ileal and straight arteries together with the left colic artery. Use the 3D model to follow the middle colic artery from below the pancreas into the transverse mesocolon.',
            'Duas figuras ilustram a artéria cólica média subindo da AMS em direção ao colo transverso para formar arcadas com as artérias cólicas direita e esquerda: o esquema à esquerda rotula as artérias cólica média, cólica direita, ileocólica e jejunais e ileais saindo da AMS, enquanto o desenho à direita rotula a cólica média, cólica direita, ileocólica, apendicular, jejunais e ileais e artérias retas junto com a artéria cólica esquerda. Use o modelo 3D para seguir a artéria cólica média de baixo do pâncreas até o mesocolo transverso.'),
        ],
      },
      {
        id: 'gbspleen-p52', ref: '52', title: t('The veins of the small intestine and the portal drainage', 'As veias do intestino delgado e a drenagem porta'),
        focus: ['smv', 'hepatic_portal_v', 'splenic_v', 'imv', 'gastric_v', 'ileocolic_a'], ghost: ['transverse_colon', 'ileum', 'jejunum', 'pancreas', 'sigmoid_a'], view: 'ant',
        body: [
          t('The jejunal and ileal veins anastomose to form venous arches, which are the anastomotic loops of the straight veins, the venae rectae. They drain into the superior mesenteric vein, which joins the splenic vein to form the hepatic portal vein. The inferior mesenteric vein joins the splenic vein as well.',
            'As veias jejunais e ileais se anastomosam para formar arcos venosos, que são as alças anastomóticas das veias retas, as venae rectae. Elas drenam para a veia mesentérica superior, que se une à veia esplênica para formar a veia porta hepática. A veia mesentérica inferior também se une à veia esplênica.'),
          t('On the left (transverse colon cut), the dissection shows the straight veins (venae rectae) and their anastomotic loops draining through the jejunal and ileal, ileocolic, right colic and middle colic veins into the superior mesenteric vein, which meets the splenic and gastric veins to form the hepatic portal vein. On the right, the full portal schematic places these tributaries alongside the appendicular, ileal and jejunal veins, pancreaticoduodenal, cystic and right gastro-omental veins, and the splenic vein receiving the pancreatic, short gastric, left gastro-omental and inferior mesenteric veins (left colic, sigmoid and superior rectal veins), plus the left and right gastric veins with oesophageal veins. The 3D model highlights the superior mesenteric vein as the trunk that the small intestine drains into.',
            'À esquerda (colo transverso seccionado), a dissecção mostra as veias retas (venae rectae) e suas alças anastomóticas drenando pelas veias jejunais e ileais, ileocólica, cólica direita e cólica média para a veia mesentérica superior, que encontra as veias esplênica e gástricas para formar a veia porta hepática. À direita, o esquema porta completo situa essas tributárias junto às veias apendicular, ileais e jejunais, pancreaticoduodenais, cística e gastro-omental direita, e à veia esplênica recebendo as veias pancreáticas, gástricas curtas, gastro-omental esquerda e mesentérica inferior (veias cólica esquerda, sigmoides e retal superior), além das veias gástricas esquerda e direita com as veias esofágicas. O modelo 3D destaca a veia mesentérica superior como o tronco para o qual o intestino delgado drena.'),
        ],
      },
    ],
    questions: [
      { ref: '47', q: 'Which branch of the ileocolic artery anastomoses with the right colic artery?', correct: 'The superior colic branch', wrong: ['The inferior ileal branch', 'The appendicular artery', 'The caecal branches'], why: 'Slide 47: the superior colic branch anastomoses with the right colic artery; the inferior ileal branch anastomoses with the end of the SMA.',
        pt: { q: 'Qual ramo da artéria ileocólica se anastomosa com a artéria cólica direita?', correct: 'O ramo cólico superior', wrong: ['O ramo ileal inferior', 'A artéria apendicular', 'Os ramos cecais'], why: 'Slide 47: o ramo cólico superior se anastomosa com a cólica direita; o ramo ileal inferior se anastomosa com o final da AMS.' } },
      { ref: '47', q: 'What does the inferior ileal branch anastomose with?', correct: 'The final tract of the SMA (distal ileum, caecum and appendix)', wrong: ['The inferior mesenteric artery', 'The splenic artery', 'The superior rectal artery'], why: 'Slide 47: the inferior ileal branch anastomoses with the final tract of the SMA, which supplies the distal ileum, caecum and appendix.',
        pt: { q: 'Com o que se anastomosa o ramo ileal inferior?', correct: 'Com o trecho final da AMS (íleo distal, ceco e apêndice)', wrong: ['Com a artéria mesentérica inferior', 'Com a artéria esplênica', 'Com a artéria retal superior'], why: 'Slide 47: o ramo ileal inferior se anastomosa com o trecho final da AMS, que irriga o íleo distal, o ceco e o apêndice.' } },
      { ref: '48–49', q: 'Which structures does the inferior ileal branch give off?', correct: 'Caecal branches, the appendicular artery and an ileal branch', wrong: ['The superior rectal artery and the left colic artery', 'The gastroduodenal artery and the splenic artery', 'The right colic artery and the coeliac branches'], why: 'Slides 48 and 49: the inferior ileal branch gives caecal branches (anterior and posterior), the appendicular artery and an ileal branch.',
        pt: { q: 'Quais estruturas o ramo ileal inferior dá?', correct: 'Ramos cecais, a artéria apendicular e um ramo ileal', wrong: ['A artéria retal superior e a artéria cólica esquerda', 'A artéria gastroduodenal e a artéria esplênica', 'A artéria cólica direita e os ramos celíacos'], why: 'Slides 48 e 49: o ramo ileal inferior dá ramos cecais (anterior e posterior), a artéria apendicular e um ramo ileal.' } },
      { ref: '50', q: 'Which artery does the descending branch of the right colic artery anastomose with?', correct: 'The superior (colic) branch of the ileocolic artery', wrong: ['The left colic artery', 'The superior rectal artery', 'The inferior pancreaticoduodenal artery'], why: 'Slide 50: the descending branch anastomoses with the superior (colic) branch of the ileocolic artery.',
        pt: { q: 'Com qual artéria se anastomosa o ramo descendente da artéria cólica direita?', correct: 'Com o ramo cólico superior da artéria ileocólica', wrong: ['Com a artéria cólica esquerda', 'Com a artéria retal superior', 'Com a artéria pancreaticoduodenal inferior'], why: 'Slide 50: o ramo descendente se anastomosa com o ramo cólico superior da ileocólica.' } },
      { ref: '51', q: 'Where does the middle colic artery originate?', correct: 'Below the pancreas', wrong: ['Above the coeliac trunk', 'In the splenic hilum', 'In the iliac fossa'], why: 'Slide 51: the middle colic artery originates below the pancreas.',
        pt: { q: 'Onde nasce a artéria cólica média?', correct: 'Abaixo do pâncreas', wrong: ['Acima do tronco celíaco', 'No hilo esplênico', 'Na fossa ilíaca'], why: 'Slide 51: a artéria cólica média nasce abaixo do pâncreas.' } },
      { ref: '52', q: 'Into which vein do the jejunal and ileal veins drain?', correct: 'The superior mesenteric vein', wrong: ['The inferior mesenteric vein', 'The inferior vena cava', 'The splenic artery'], why: 'Slide 52: the jejunal and ileal veins anastomose to form venous arches, which drain into the superior mesenteric vein.',
        pt: { q: 'Em qual veia drenam as veias jejunais e ileais?', correct: 'Na veia mesentérica superior', wrong: ['Na veia mesentérica inferior', 'Na veia cava inferior', 'Na artéria esplênica'], why: 'Slide 52: as veias jejunais e ileais formam arcos venosos e drenam para a veia mesentérica superior.' } },
    ],
  },
];

blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
