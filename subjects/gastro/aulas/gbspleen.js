// SpeedGastro · Aula 13 — Gallbladder, spleen and SMA (Prof. Fiume deck 13_gallbladder_spleen_SMA, p001–p052).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/gbspleen.js?v=157';

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
          t('The spleen is a lymphoid organ, like the adenoid, tonsil, thymus, lymph nodes, Peyer’s patches of the small intestine, appendix and bone marrow. Lymphatic vessels connect parts of the lymphatic system.',
            'O baço é um órgão linfoide, assim como a adenoide, tonsila, timo, linfonodos, placas de Peyer do intestino delgado, apêndice e medula óssea. Vasos linfáticos conectam partes do sistema linfático.'),
        ],
      },
      {
        id: 'gbspleen-p02', ref: '2', title: t('Location: left hypochondrium', 'Localização: hipocôndrio esquerdo'),
        focus: ['spleen'], ghost: ['pancreas', 'stomach', 'diaphragm_g', 'splenic_a', 'splenic_v'], view: 'ant',
        body: [
          t('The spleen lies in the left hypochondrium below the diaphragm, between the stomach and left kidney. Its superior and inferior borders lie in the region of the ninth, tenth and eleventh ribs, between the midaxillary and scapular lines. At the level of L1, the gastrosplenic ligament connects the spleen to the stomach. The tail of the pancreas and splenic artery and vein approach its hilum. The left kidney lies behind it. Medially, the omental bursa extends toward the omental foramen near the duodenum. The transverse colon lies inferiorly.',
            'O baço fica no hipocôndrio esquerdo, abaixo do diafragma, entre o estômago e o rim esquerdo. Suas bordas superior e inferior ficam na região da nona, décima e décima primeira costelas, entre as linhas axilar média e escapular. Ao nível de L1, o ligamento gastroesplênico liga o baço ao estômago. A cauda do pâncreas e a artéria e a veia esplênicas chegam perto do hilo. O rim esquerdo fica atrás do baço. Medialmente, a bolsa omental se estende em direção ao forame omental, perto do duodeno. O colo transverso fica inferiormente.'),
        ],
      },
      {
        id: 'gbspleen-p03', ref: '3', title: t('Traube’s semilunar space', 'O espaço semilunar de Traube'),
        focus: ['spleen'], view: 'ant',
        body: [
          t('The spleen is difficult to palpate. Traube’s semilunar space lies near the spleen and the T12 vertebra.',
            'O baço é difícil de palpar. O espaço semilunar de Traube fica próximo ao baço e à vértebra T12.'),
        ],
      },
      {
        id: 'gbspleen-p04', ref: '4', title: t('Shape, surfaces, borders and poles', 'Forma, faces, bordas e polos'),
        focus: ['spleen', 'diaphragm_g'], ghost: ['stomach'], view: 'ant',
        body: [
          t('The spleen is bean-shaped soft tissue, which is difficult for a surgeon to suture. It has a diaphragmatic surface (superior and lateral) and a visceral surface (inferior and medial). The visceral surface contains the splenic hilum, where the vessels, nerves and lymphatics enter. Anterosuperior and posteroinferior borders separate the two surfaces, and the superior and inferior extremities are the poles.',
            'O baço é um tecido mole em forma de feijão, que é difícil de suturar para um cirurgião. Tem uma face diafragmática (superior e lateral) e uma face visceral (inferior e medial). A face visceral contém o hilo esplênico, por onde entram os vasos, os nervos e os linfáticos. Bordas anterossuperior e posteroinferior separam as duas faces, e as extremidades superior e inferior são os polos.'),
          t('The convex diaphragmatic surface matches the dome of the diaphragm. Through it, the spleen relates to the left costodiaphragmatic pleural recess, lower lobe of the left lung and rib cage. Its visceral surface has gastric, renal and colic areas and a hilum for the splenic artery and vein. The surfaces meet at superior and inferior borders between anterior and posterior extremities.',
            'A face diafragmática convexa acompanha a cúpula do diafragma. Por meio dele, o baço relaciona-se com o recesso pleural costodiafragmático esquerdo, o lobo inferior do pulmão esquerdo e a caixa torácica. Sua face visceral tem áreas gástrica, renal e cólica e um hilo para a artéria e veia esplênicas. As faces encontram-se nas bordas superior e inferior entre as extremidades anterior e posterior.'),
        ],
      },
      {
        id: 'gbspleen-p05', ref: '5', title: t('The visceral surface: gastric, renal and colic impressions', 'A face visceral: impressões gástrica, renal e cólica'),
        focus: ['spleen', 'stomach', 'pancreas', 'descending_colon'], ghost: ['transverse_colon', 'duodenum'], view: 'ant',
        body: [
          t('The visceral surface is concave. The gastric impression faces anteromedially, against the posterior part of the fundus, the upper body and the greater curvature of the stomach. The renal impression lies on the posteroinferior part, against the upper lateral area of the front of the left kidney and sometimes the suprarenal gland. The colic impression lies at the inferior pole, against the splenic flexure and the phrenicocolic ligament. The hilum separates the gastric and renal parts.',
            'A face visceral é côncava. A impressão gástrica se volta anteromedialmente, contra a parte posterior do fundo, o corpo superior e a curvatura maior do estômago. A impressão renal fica na parte posteroinferior, contra a área lateral superior da face anterior do rim esquerdo e, às vezes, a suprarrenal. A impressão cólica fica no polo inferior, contra a flexura esplênica e o ligamento frenicocólico. O hilo separa as partes gástrica e renal.'),
          t('The gastric impression contacts the stomach fundus and body; the renal impression contacts the kidney and suprarenal gland. The anterior extremity relates to the left colic flexure and phrenicocolic ligament, and the hilum to the omental bursa and pancreatic tail. At L1, the gastrosplenic ligament, splenic vessels, portal triad, epiploic foramen, duodenum and transverse colon are nearby.',
            'A impressão gástrica toca o fundo e o corpo do estômago; a renal toca o rim e a suprarrenal. A extremidade anterior relaciona-se com a flexura cólica esquerda e o ligamento frenocólico, e o hilo com a bolsa omental e a cauda pancreática. Em L1, o ligamento gastroesplênico, os vasos esplênicos, a tríade portal, o forame epiploico, o duodeno e o colo transverso ficam próximos.'),
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
          t('The gastrosplenic ligament extends from the splenic hilum to the greater curvature of the stomach and continues the greater omentum superiorly. The omental bursa lies behind it; the pancreatic tail, splenic vessels and left kidney lie farther posteriorly.',
            'O ligamento gastroesplênico vai do hilo esplênico à curvatura maior do estômago e continua superiormente o omento maior. A bolsa omental fica atrás dele; a cauda pancreática, os vasos esplênicos e o rim esquerdo ficam mais posteriormente.'),
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
          t('The primitive dorsal and ventral mesenteries relate to the aorta, kidney, liver and stomach. In the adult, fused membranes forming the fascia of Treitz lie behind the pancreas. The dorsal mesentery gives rise to the splenorenal and gastrosplenic ligaments; the falciform ligament derives from the ventral mesentery.',
            'Os mesentérios dorsal e ventral primitivos relacionam-se com a aorta, o rim, o fígado e o estômago. No adulto, membranas fundidas que formam a fáscia de Treitz ficam atrás do pâncreas. O mesentério dorsal origina os ligamentos esplenorrenal e gastroesplênico; o ligamento falciforme deriva do mesentério ventral.'),
          t('The dorsal mesogastrium expands into the future greater omentum. The omental bursa, spleen, stomach, left kidney, aorta and hepatic triad lie in this region.',
            'O mesogástrio dorsal expande-se no futuro omento maior. A bolsa omental, o baço, o estômago, o rim esquerdo, a aorta e a tríade hepática ficam nessa região.'),
        ],
      },
      {
        id: 'gbspleen-p11', ref: '11', title: t('The short gastric vessels in the gastrosplenic ligament', 'Os vasos gástricos curtos no ligamento gastroesplênico'),
        focus: ['spleen', 'stomach', 'splenic_a', 'splenic_v'], ghost: ['pancreas', 'transverse_colon'], view: 'ant',
        body: [
          t('The gastrosplenic ligament carries short gastric vessels to the gastric fundus. The spleen lies near the diaphragm and ninth rib, left suprarenal gland and kidney, splenic artery and vein, pancreatic tail, transverse mesocolon and transverse colon. The splenorenal ligament connects the spleen and left kidney.',
            'O ligamento gastroesplênico conduz vasos gástricos curtos ao fundo do estômago. O baço fica perto do diafragma e da nona costela, da suprarrenal e do rim esquerdos, da artéria e veia esplênicas, da cauda pancreática, do mesocolo transverso e do colo transverso. O ligamento esplenorrenal liga o baço ao rim esquerdo.'),
        ],
      },
      {
        id: 'gbspleen-p12', ref: '12', title: t('The splenorenal (lienorenal) ligament', 'O ligamento esplenorrenal (lienorrenal)'),
        focus: ['spleen', 'splenic_a', 'splenic_v', 'pancreas'], ghost: ['stomach', 'diaphragm_g'], view: 'ant',
        body: [
          t('The splenorenal, or lienorenal, ligament is the posterior part of the primitive dorsal mesogastrium. It runs from the splenic hilum to the front of the left kidney. It contains the terminal part of the splenic vessels and the tail of the pancreas. From the spleen it continues with the parietal peritoneum of the posterior wall, in front of the left kidney.',
            'O ligamento esplenorrenal, ou lienorrenal, é a parte posterior do mesogástrio dorsal primitivo. Vai do hilo esplênico até a frente do rim esquerdo. Contém a parte terminal dos vasos esplênicos e a cauda do pâncreas. A partir do baço continua com o peritônio parietal da parede posterior, à frente do rim esquerdo.'),
          t('The splenorenal ligament connects the splenic hilum to the left kidney; the gastrosplenic ligament connects it to the stomach. Visceral peritoneum covers the spleen. The lesser omentum, aorta, inferior vena cava, liver, pancreas, fascia of Treitz and falciform ligament lie in the same region.',
            'O ligamento esplenorrenal liga o hilo esplênico ao rim esquerdo; o gastroesplênico liga-o ao estômago. O peritônio visceral cobre o baço. O omento menor, a aorta, a veia cava inferior, o fígado, o pâncreas, a fáscia de Treitz e o ligamento falciforme ficam na mesma região.'),
        ],
      },
      {
        id: 'gbspleen-p13', ref: '13', title: t('The splenocolic and splenophrenic ligaments', 'Os ligamentos esplenocólico e esplenofrênico'),
        focus: ['spleen', 'diaphragm_g', 'transverse_colon'], ghost: ['pancreas', 'stomach'], view: 'ant',
        body: [
          t('The splenocolic ligament is a remnant of the extreme left end of the transverse mesocolon, and it is avascular. The splenophrenic ligament is the reflection of the leaves of the mesentery onto the posterior body wall and the inferior surface of the diaphragm, at the upper pole of the spleen close to the stomach. It usually has no vessels.',
            'O ligamento esplenocólico é um remanescente da extremidade esquerda extrema do mesocolo transverso, e é avascular. O ligamento esplenofrênico é a reflexão das lâminas do mesentério sobre a parede posterior do corpo e a face inferior do diafragma, no polo superior do baço perto do estômago. Em geral não tem vasos.'),
          t('The splenocolic ligament connects the lower pole of the spleen to the colon. The splenophrenic ligament lies near the upper pole and diaphragm. The pancreas and pancreaticocolic and phrenicocolic ligaments are nearby.',
            'O ligamento esplenocólico liga o polo inferior do baço ao colo. O ligamento esplenofrênico fica perto do polo superior e do diafragma. O pâncreas e os ligamentos pancreaticocólico e frenocólico ficam próximos.'),
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
          t('The pancreaticocolic, splenocolic and phrenicocolic ligaments relate the colon to the pancreas, spleen and diaphragm. The splenorenal, gastrosplenic and pancreaticosplenic ligaments connect the spleen to the kidney, stomach and pancreas. The phrenicocolic ligament connects the colon to the diaphragm.',
            'Os ligamentos pancreaticocólico, esplenocólico e frenocólico relacionam o colo ao pâncreas, baço e diafragma. Os ligamentos esplenorrenal, gastroesplênico e pancreaticoesplênico ligam o baço ao rim, estômago e pâncreas. O ligamento frenocólico liga o colo ao diafragma.'),
        ],
      },
      {
        id: 'gbspleen-p16', ref: '16', title: t('The splenic artery and its segmental branches', 'A artéria esplênica e seus ramos segmentares'),
        focus: ['splenic_a', 'spleen', 'celiac_trunk'], ghost: ['common_hepatic_a', 'gastroepiploic_a', 'pancreas', 'gallbladder'], view: 'ant',
        body: [
          t('The splenic artery divides into two or three branches before it enters the hilum. These divide into four or five segmental arteries, with no collateral circulation between the segments. The segmental arteries divide into trabecular arteries, which give rise to follicular arteries. The superior pole gets an extra supply from the short gastric arteries in the gastrosplenic ligament.',
            'A artéria esplênica se divide em dois ou três ramos antes de entrar no hilo. Estes se dividem em quatro ou cinco artérias segmentares, sem circulação colateral entre os segmentos. As artérias segmentares se dividem em artérias trabeculares, que dão origem às artérias foliculares. O polo superior recebe um suprimento extra das artérias gástricas curtas do ligamento gastroesplênico.'),
          t('The splenic artery runs from the celiac trunk along the pancreas to the splenic hilum. It gives dorsal pancreatic, greater pancreatic and pancreatic tail arteries, the left gastro-omental artery and short gastric arteries to the stomach and superior splenic pole. Nearby arteries include the left gastric, inferior phrenic arteries from a common stem, common, proper, right, intermediate and left hepatic, cystic, right gastric, supraduodenal, gastroduodenal and inferior pancreatic arteries. The cystic artery lies in Calot’s triangle near the portal vein and bile ducts.',
            'A artéria esplênica segue do tronco celíaco ao longo do pâncreas até o hilo esplênico. Dá as artérias pancreática dorsal, pancreática magna e da cauda do pâncreas, a gastro-omental esquerda e as gástricas curtas para o estômago e polo superior do baço. Artérias próximas incluem a gástrica esquerda, as frênicas inferiores de um tronco comum, as hepáticas comum, própria, direita, intermediária e esquerda, a cística, gástrica direita, supraduodenal, gastroduodenal e pancreática inferior. A artéria cística fica no triângulo de Calot perto da veia porta e dos ductos biliares.'),
        ],
      },
      {
        id: 'gbspleen-p17', ref: '17', title: t('The splenic vein and the portal vein', 'A veia esplênica e a veia porta'),
        focus: ['splenic_v', 'hepatic_portal_v', 'smv', 'spleen'], ghost: ['pancreas', 'gastric_v', 'ivc_g'], view: 'ant',
        body: [
          t('The segmental veins join to form two (superior and inferior) or three (superior, middle and inferior) lobar veins, which leave the hilum and join to form the splenic vein. The splenic vein runs medially below the splenic artery and posterior to the tail and body of the pancreas, and it forms the portal vein.',
            'As veias segmentares se unem para formar duas (superior e inferior) ou três (superior, média e inferior) veias lobares, que saem do hilo e se unem para formar a veia esplênica. A veia esplênica corre medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas, e forma a veia porta.'),
          t('Behind the pancreas, the splenic vein receives the short gastric, left gastro-omental and inferior mesenteric veins before joining the superior mesenteric vein to form the portal vein. The portal system also receives right and left gastric and pancreaticoduodenal veins. Nearby are hepatic veins, inferior vena cava, celiac trunk, hepatic and gastroduodenal arteries, inferior pancreaticoduodenal branches, middle colic vein, right gastro-omental vessels, left suprarenal, renal and gonadal vessels, left ascending lumbar vein and left ureter.',
            'Atrás do pâncreas, a veia esplênica recebe as veias gástricas curtas, gastro-omental esquerda e mesentérica inferior antes de unir-se à mesentérica superior para formar a veia porta. O sistema porta também recebe as veias gástricas direita e esquerda e pancreaticoduodenais. Próximos ficam veias hepáticas, veia cava inferior, tronco celíaco, artérias hepática e gastroduodenal, ramos pancreaticoduodenais inferiores, veia cólica média, vasos gastro-omentais direitos, vasos suprarrenais, renais e gonadais esquerdos, veia lombar ascendente esquerda e ureter esquerdo.'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Which kind of organ is the spleen?', correct: 'A secondary lymphatic organ', wrong: ['A primary lymphoid organ', 'An endocrine gland', 'A skeletal muscle'], why: 'The spleen is a secondary lymphatic organ.',
        pt: { q: 'Que tipo de órgão é o baço?', correct: 'Um órgão linfático secundário', wrong: ['Um órgão linfoide primário', 'Uma glândula endócrina', 'Um músculo esquelético'], why: 'O baço é um órgão linfático secundário.' } },
      { ref: '2', q: 'Which ribs relate to the spleen?', correct: 'The ninth to eleventh ribs', wrong: ['The first to third ribs', 'The twelfth rib only', 'The fifth to seventh ribs'], why: 'The spleen relates to the ninth, tenth and eleventh ribs.',
        pt: { q: 'Quais costelas se relacionam com o baço?', correct: 'Da nona à décima primeira costela', wrong: ['Da primeira à terceira costela', 'Somente a décima segunda costela', 'Da quinta à sétima costela'], why: 'O baço relaciona-se com as costelas nona, décima e décima primeira.' } },
      { ref: '5', q: 'Which impression of the visceral surface lies at the inferior pole?', correct: 'The colic impression', wrong: ['The gastric impression', 'The renal impression', 'The suprarenal impression'], why: 'The colic impression lies at the inferior pole, against the splenic flexure.',
        pt: { q: 'Qual impressão da face visceral fica no polo inferior?', correct: 'A impressão cólica', wrong: ['A impressão gástrica', 'A impressão renal', 'A impressão suprarrenal'], why: 'A impressão cólica fica no polo inferior, contra a flexura esplênica.' } },
      { ref: '6', q: 'Which three are the major peritoneal ligaments of the spleen?', correct: 'Gastrosplenic, splenorenal and splenocolic', wrong: ['Hepatogastric, hepatoduodenal and falciform', 'Phrenicocolic, pancreaticocolic and round', 'Cystoduodenocolic, gastrocolic and omental'], why: 'Three major ligaments: gastrosplenic, splenorenal and splenocolic.',
        pt: { q: 'Quais são os três ligamentos peritoneais maiores do baço?', correct: 'Gastroesplênico, esplenorrenal e esplenocólico', wrong: ['Hepatogástrico, hepatoduodenal e falciforme', 'Frenicocólico, pancreaticocólico e redondo', 'Cistoduodenocólico, gastrocólico e omental'], why: 'Três ligamentos maiores: gastroesplênico, esplenorrenal e esplenocólico.' } },
      { ref: '16', q: 'Is there collateral circulation between the segmental arteries of the spleen?', correct: 'No, there is no collateral circulation between the segments', wrong: ['Yes, a rich collateral network', 'Only through the short gastric arteries', 'Only through the splenic vein'], why: 'The splenic artery gives 4–5 segmental arteries with NO collateral circulation between the segments.',
        pt: { q: 'Há circulação colateral entre as artérias segmentares do baço?', correct: 'Não, não há circulação colateral entre os segmentos', wrong: ['Sim, uma rede colateral rica', 'Somente pelas artérias gástricas curtas', 'Somente pela veia esplênica'], why: 'A artéria esplênica dá 4–5 artérias segmentares, sem circulação colateral entre os segmentos.' } },
      { ref: '17', q: 'Where does the splenic vein run relative to the splenic artery?', correct: 'Below the splenic artery', wrong: ['Above the splenic artery', 'In front of the stomach', 'Through the diaphragm'], why: 'The splenic vein runs medially below the splenic artery and behind the tail and body of the pancreas.',
        pt: { q: 'Onde a veia esplênica corre em relação à artéria esplênica?', correct: 'Abaixo da artéria esplênica', wrong: ['Acima da artéria esplênica', 'Na frente do estômago', 'Através do diafragma'], why: 'A veia esplênica corre medialmente abaixo da artéria esplênica e atrás da cauda e do corpo do pâncreas.' } },
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
          t('The gallbladder stores and concentrates bile produced by the liver before it enters the duodenum. It also helps eliminate endogenous waste such as bilirubin from red blood cells and exogenous substances such as drugs. The gallbladder and hepatic and cystic ducts lie near the stomach, colon and pancreas, in relation to the epigastric, hypochondriac, umbilical, lumbar and iliac regions.',
            'A vesícula armazena e concentra a bile produzida pelo fígado antes de ela entrar no duodeno. Também ajuda a eliminar resíduos endógenos, como bilirrubina das hemácias, e substâncias exógenas, como fármacos. A vesícula e os ductos hepáticos e cístico ficam perto do estômago, colo e pâncreas, em relação com as regiões epigástrica, hipocondríacas, umbilical, lombares e ilíacas.'),
        ],
      },
      {
        id: 'gbspleen-p19', ref: '19', title: t('General: shape, size, capacity and regions', 'Geral: forma, tamanho, capacidade e regiões'),
        focus: ['gallbladder', 'common_hepatic_duct', 'pancreatic_duct', 'duodenum', 'hepatic_portal_v', 'common_hepatic_a'], ghost: ['caudate_lobe', 'stomach', 'pancreas'], view: 'ant',
        body: [
          t('The gallbladder is a hollow, pear-shaped, muscular sac. It is 7–10 cm long and holds between 25 and 50 ml. It sits in a fossa on the visceral surface of the right lobe of the liver. Like the liver, it is covered by peritoneum that continues with the peritoneum of the liver. It is divided into three regions: the fundus, the body and the neck.',
            'A vesícula é um saco muscular oco, em forma de pera. Tem 7–10 cm de comprimento e comporta de 25 a 50 ml. Fica em uma fossa na face visceral do lobo direito do fígado. Como o fígado, é coberta por peritônio que se continua com o do fígado. É dividida em três regiões: o fundo, o corpo e o colo.'),
          t('The gallbladder has a fundus, body, infundibulum (Hartmann’s pouch) and neck. The cystic duct has spiral and smooth parts and joins the common hepatic duct, formed by the right and left hepatic ducts. Nearby are the round ligament, descending duodenum, major duodenal papilla, hepatopancreatic ampulla, hepatic and right gastric arteries, portal vein and lesser omentum.',
            'A vesícula tem fundo, corpo, infundíbulo (bolsa de Hartmann) e colo. O ducto cístico tem partes espiral e lisa e une-se ao ducto hepático comum, formado pelos ductos hepáticos direito e esquerdo. Próximos ficam o ligamento redondo, o duodeno descendente, a papila duodenal maior, a ampola hepatopancreática, as artérias hepática e gástrica direita, a veia porta e o omento menor.'),
        ],
      },
      {
        id: 'gbspleen-p20', ref: '20', title: t('The fundus and Murphy’s point', 'O fundo e o ponto de Murphy'),
        focus: ['gallbladder', 'transverse_colon', 'caudate_lobe'], ghost: ['duodenum', 'stomach'], view: 'ant',
        body: [
          t('The fundus projects beyond the inferior border of the liver to a variable extent, and it is completely covered by visceral peritoneum. Posteriorly and inferiorly it is related to the transverse mesocolon. Anteriorly it is related to the anterior abdominal wall, at the point where a vertical line through the lateral margin of rectus abdominis meets a horizontal line through the tenth rib. This is Murphy’s point, used to examine the gallbladder clinically.',
            'O fundo ultrapassa a margem inferior do fígado em grau variável, e é totalmente coberto por peritônio visceral. Posterior e inferiormente relaciona-se com o mesocolo transverso. Anteriormente relaciona-se com a parede abdominal anterior, no ponto em que uma linha vertical pela margem lateral do músculo reto do abdome encontra uma linha horizontal pela décima costela. Esse é o ponto de Murphy, usado para examinar clinicamente a vesícula.'),
          t('The gallbladder lies near the ninth rib, while Murphy’s point lies at the tenth rib. The liver has caudate-lobe hepatic ducts and a bare area; the bile duct carries bile away from the liver.',
            'A vesícula fica perto da nona costela, enquanto o ponto de Murphy fica na décima costela. O fígado tem ductos hepáticos do lobo caudado e uma área nua; o ducto biliar conduz a bile para fora do fígado.'),
        ],
      },
      {
        id: 'gbspleen-p21', ref: '21', title: t('The body and its relations to the duodenum and colon', 'O corpo e suas relações com o duodeno e o colo'),
        focus: ['gallbladder', 'duodenum', 'transverse_colon', 'cystic_duct', 'hepatic_portal_v'], ghost: ['pancreas', 'stomach', 'common_hepatic_a', 'gastroduodenal_a'], view: 'ant',
        body: [
          t('The body lies in the cystic fossa. Its inferior face is related to the anterior face of the duodenum and to the transverse mesocolon. A small peritoneal fold, the cysto-duodenocolic ligament, may join the gallbladder to the duodenum and the right colic flexure.',
            'O corpo fica na fossa cística. Sua face inferior se relaciona com a face anterior do duodeno e com o mesocolo transverso. Uma pequena prega peritoneal, o ligamento cistoduodenocólico, pode unir a vesícula ao duodeno e à flexura cólica direita.'),
          t('The gallbladder body relates inferiorly to the superior duodenum, transverse colon and pancreatic head. Near Calot’s triangle lie the cystic artery and duct, hepatic ducts, portal vein, common, proper, right and left hepatic arteries, right gastric and gastroduodenal arteries, lesser omentum and stomach. The gallbladder has a fundus, body, infundibulum and neck. The cystic duct has spiral and smooth parts and joins the common hepatic duct to form the common bile duct. Gland orifices, the pancreatic duct and hepatopancreatic ampulla relate to the descending duodenum. The cystoduodenocolic ligament connects the gallbladder to the duodenum and right colic flexure. The liver has right and left lobes and coronary, falciform and round ligaments.',
            'O corpo da vesícula relaciona-se inferiormente com o duodeno superior, o colo transverso e a cabeça pancreática. Perto do triângulo de Calot ficam a artéria e o ducto císticos, os ductos hepáticos, a veia porta, as artérias hepáticas comum, própria, direita e esquerda, gástrica direita e gastroduodenal, o omento menor e o estômago. A vesícula tem fundo, corpo, infundíbulo e colo. O ducto cístico tem partes espiral e lisa e une-se ao ducto hepático comum para formar o colédoco. Orifícios glandulares, ducto pancreático e ampola hepatopancreática relacionam-se com o duodeno descendente. O ligamento cistoduodenocólico liga a vesícula ao duodeno e à flexura cólica direita. O fígado tem lobos direito e esquerdo e ligamentos coronário, falciforme e redondo.'),
        ],
      },
      {
        id: 'gbspleen-p22', ref: '22', title: t('The body in the fossa, and the cystic veins', 'O corpo na fossa, e as veias císticas'),
        focus: ['gallbladder', 'cystic_duct', 'common_hepatic_duct', 'hepatic_portal_v'], ghost: ['caudate_lobe', 'duodenum'], view: 'ant',
        body: [
          t('The gallbladder body lies in the cystic fossa and connects to the liver through small accessory hepatic portal veins of the cystic group. The cystic artery and anterior and posterior cystic veins accompany the fundus, body and neck. The neck continues into the cystic duct near the common hepatic duct and a visceral sensory nerve.',
            'O corpo da vesícula fica na fossa cística e liga-se ao fígado por pequenas veias porta hepáticas acessórias do grupo cístico. A artéria cística e as veias císticas anterior e posterior acompanham o fundo, corpo e colo. O colo continua no ducto cístico perto do ducto hepático comum e de um nervo sensitivo visceral.'),
        ],
      },
      {
        id: 'gbspleen-p23', ref: '23', title: t('The neck of the gallbladder', 'O colo da vesícula biliar'),
        focus: ['gallbladder', 'cystic_duct', 'duodenum', 'hepatic_portal_v', 'pancreatic_duct'], ghost: ['common_hepatic_duct', 'caudate_lobe'], view: 'ant',
        body: [
          t('The neck ends by continuing into the cystic duct. It has an S-shaped course that ends in a larger part. Posteriorly and inferiorly it is related to the duodenum, and medially on the left it is related to the components of the porta hepatis. The mucosa at the medial end of the neck is obliquely ridged, forming a crescent-shaped fold that continues with the spirally arranged mucosal folds of the cystic duct.',
            'O colo termina continuando-se no ducto cístico. Tem trajeto em S que termina em uma parte maior. Posterior e inferiormente relaciona-se com o duodeno, e medialmente à esquerda com os componentes do hilo hepático. A mucosa na extremidade medial do colo tem cristas oblíquas, formando uma prega em forma de crescente que continua com as pregas espiraladas da mucosa do ducto cístico.'),
          t('The cystic duct has a spiral fold and a smooth part; it joins the common hepatic duct to form the bile duct. The gallbladder has a fundus, body, neck and infundibulum (Hartmann’s pouch). The right and left hepatic ducts form the common hepatic duct. The pancreatic duct and bile duct enter the hepatopancreatic ampulla at the major duodenal papilla in the descending duodenum; gland orifices lie there.',
            'O ducto cístico tem uma prega espiral e uma parte lisa; une-se ao ducto hepático comum para formar o colédoco. A vesícula tem fundo, corpo, colo e infundíbulo (bolsa de Hartmann). Os ductos hepáticos direito e esquerdo formam o hepático comum. Os ductos pancreático e biliar entram na ampola hepatopancreática na papila duodenal maior, no duodeno descendente; ali ficam orifícios glandulares.'),
        ],
      },
      {
        id: 'gbspleen-p24', ref: '24', title: t('The cystic duct and the spiral valve of Heister', 'O ducto cístico e a válvula espiral de Heister'),
        focus: ['cystic_duct', 'common_hepatic_duct', 'gallbladder', 'pancreatic_duct'], ghost: ['hepatic_ducts', 'duodenum'], view: 'ant',
        body: [
          t('The cystic duct runs backward and downward from the neck of the gallbladder to the common hepatic duct, where the common bile duct begins. Its length varies, usually about 3–4 cm, and it runs in the free border of the pars tensa of the lesser omentum.',
            'O ducto cístico corre para trás e para baixo, do colo da vesícula até o ducto hepático comum, onde começa o colédoco. Seu comprimento varia, costumando ser de cerca de 3–4 cm, e corre na borda livre da pars tensa do omento menor.'),
          t('The cystic duct mucosa forms 5–10 crescent-shaped folds arranged spirally. These form the spiral valve of Heister, which regulates bile flow. The gallbladder has a fundus, body and neck. The right and left hepatic ducts form the common hepatic duct, which joins the cystic duct to form the common bile duct. The bile duct joins the main pancreatic duct at the hepatopancreatic ampulla.',
            'A mucosa do ducto cístico forma 5 a 10 pregas semilunares dispostas em espiral. Elas formam a válvula espiral de Heister, que regula o fluxo da bile. A vesícula tem fundo, corpo e colo. Os ductos hepáticos direito e esquerdo formam o ducto hepático comum, que se une ao cístico para formar o colédoco. O colédoco une-se ao ducto pancreático principal na ampola hepatopancreática.'),
        ],
      },
      {
        id: 'gbspleen-p25', ref: '25', title: t('The route of the bile duct and the visceral surface of the liver', 'O trajeto do colédoco e a face visceral do fígado'),
        focus: ['gallbladder', 'common_hepatic_duct', 'duodenum', 'pancreas', 'caudate_lobe', 'hepatic_portal_v', 'ivc_g'], ghost: ['stomach', 'spleen', 'abdominal_aorta_g'], view: 'ant',
        body: [
          t('The gallbladder is partly contained in a fossa on the visceral surface of the liver. The common bile duct passes behind the duodenum toward the head of the pancreas. After passing through the head of the pancreas, the bile duct frequently joins the pancreatic duct.',
            'A vesícula fica em parte contida em uma fossa na face visceral do fígado. O colédoco passa atrás do duodeno em direção à cabeça do pâncreas. Depois de atravessar a cabeça do pâncreas, o colédoco frequentemente se une ao ducto pancreático.'),
          t('The gallbladder lies in a fossa on the visceral surface of the liver. That surface has colic, duodenal, renal, suprarenal, esophageal and gastric impressions, the fissures for the round and venous ligaments, the quadrate and caudate lobes and the caudate process. The porta hepatis transmits the proper hepatic artery, portal vein and hepatic ducts. The hepatic veins, inferior vena cava, cystic and common bile ducts, bare area and coronary and triangular ligaments are also related to the liver. The bile duct passes behind the duodenum and through the pancreatic head, often joining the pancreatic duct before opening at the major duodenal papilla.',
            'A vesícula fica em uma fossa na face visceral do fígado. Essa face tem impressões cólica, duodenal, renal, suprarrenal, esofágica e gástrica, fissuras dos ligamentos redondo e venoso, lobos quadrado e caudado e processo caudado. A porta do fígado conduz a artéria hepática própria, a veia porta e os ductos hepáticos. As veias hepáticas, a veia cava inferior, os ductos cístico e biliar comum, a área nua e os ligamentos coronário e triangulares também se relacionam ao fígado. O colédoco passa atrás do duodeno e pela cabeça pancreática, frequentemente unindo-se ao ducto pancreático antes de abrir-se na papila duodenal maior.'),
        ],
      },
    ],
    questions: [
      { ref: '18', q: 'Where does the bile duct open into the duodenum?', correct: 'The second part of the duodenum, at L2', wrong: ['The first part of the duodenum, at L1', 'The pylorus, at L1', 'The third part of the duodenum, at L3'], why: 'The bile duct opens into the second part of the duodenum, usually with the main pancreatic duct, at L2.',
        pt: { q: 'Onde o colédoco se abre no duodeno?', correct: 'Na segunda parte do duodeno, em L2', wrong: ['Na primeira parte do duodeno, em L1', 'No piloro, em L1', 'Na terceira parte do duodeno, em L3'], why: 'O colédoco se abre na segunda parte do duodeno, em geral junto com o ducto pancreático principal, em L2.' } },
      { ref: '19', q: 'What is the capacity of the gallbladder?', correct: '25 to 50 ml', wrong: ['5 to 10 ml', '100 to 150 ml', '250 to 500 ml'], why: '7–10 cm long, capacity 25 ml to 50 ml.',
        pt: { q: 'Qual a capacidade da vesícula?', correct: 'De 25 a 50 ml', wrong: ['De 5 a 10 ml', 'De 100 a 150 ml', 'De 250 a 500 ml'], why: '7–10 cm de comprimento, capacidade de 25 ml a 50 ml.' } },
      { ref: '20', q: 'Where is Murphy’s point?', correct: 'Where the lateral margin of rectus abdominis meets a horizontal line through the tenth rib', wrong: ['Where the midline meets the ninth rib', 'At the umbilicus, on the twelfth rib', 'At the xiphoid, on the seventh rib'], why: 'The vertical line through the lateral margin of rectus abdominis meets the horizontal line through the 10th rib.',
        pt: { q: 'Onde fica o ponto de Murphy?', correct: 'Onde a margem lateral do reto do abdome encontra uma linha horizontal pela décima costela', wrong: ['Onde a linha média encontra a nona costela', 'No umbigo, na décima segunda costela', 'No apêndice xifoide, na sétima costela'], why: 'A linha vertical pela margem lateral do reto encontra a linha horizontal pela 10ª costela.' } },
      { ref: '21', q: 'Which structures lie against the inferior face of the body of the gallbladder?', correct: 'The superior part of the duodenum and the transverse mesocolon', wrong: ['The head of the pancreas and the right kidney', 'The spleen and the stomach', 'The splenic flexure and the phrenicocolic ligament'], why: 'The inferior face relates to the anterior face of the duodenum and to the transverse mesocolon.',
        pt: { q: 'Quais estruturas ficam contra a face inferior do corpo da vesícula?', correct: 'A parte superior do duodeno e o mesocolo transverso', wrong: ['A cabeça do pâncreas e o rim direito', 'O baço e o estômago', 'A flexura esplênica e o ligamento frenicocólico'], why: 'A face inferior se relaciona com a face anterior do duodeno e com o mesocolo transverso.' } },
      { ref: '23', q: 'What is the larger part at the end of the neck of the gallbladder called?', correct: 'Hartmann’s pouch, the infundibulum', wrong: ['The fundus', 'The common hepatic duct', 'The cystic artery'], why: 'The infundibulum, or Hartmann’s pouch, is the larger part at the end of the S-shaped neck.',
        pt: { q: 'Como se chama a parte maior no fim do colo da vesícula?', correct: 'A bolsa de Hartmann, o infundíbulo', wrong: ['O fundo', 'O ducto hepático comum', 'A artéria cística'], why: 'O infundíbulo, ou bolsa de Hartmann, é a parte maior no fim do colo em S.' } },
      { ref: '24', q: 'How long is the cystic duct, usually?', correct: 'About 3–4 cm', wrong: ['About 1 cm', 'About 8–10 cm', 'About 15–20 cm'], why: 'Usually around 3–4 cm.',
        pt: { q: 'Quanto mede o ducto cístico, em geral?', correct: 'Cerca de 3–4 cm', wrong: ['Cerca de 1 cm', 'Cerca de 8–10 cm', 'Cerca de 15–20 cm'], why: 'Em geral cerca de 3–4 cm.' } },
      { ref: '24', q: 'What is the name of the spiral folds of the cystic duct?', correct: 'The spiral valve of Heister', wrong: ['The valve of Kerckring', 'The ileocaecal valve of Bauhin', 'The Houston valve'], why: 'The mucosa is lifted by 5–10 crescentic folds in a spiral, the spiral valve of Heister.',
        pt: { q: 'Como se chamam as pregas espiraladas do ducto cístico?', correct: 'A válvula espiral de Heister', wrong: ['A válvula de Kerckring', 'A válvula ileocecal de Bauhin', 'A válvula de Houston'], why: 'A mucosa se eleva em 5–10 pregas em crescente, em espiral, a válvula espiral de Heister.' } },
    ],
  },
  {
    id: 'gbspleen-3', title: t('Bile and the bile ducts', 'A bile e os ductos biliares'),
    cards: [
      {
        id: 'gbspleen-p26', ref: '26', title: t('Bile and the liver lobule', 'A bile e o lóbulo hepático'),
        focus: ['caudate_lobe', 'hepatic_portal_v', 'gallbladder'], ghost: ['common_hepatic_duct', 'hepatic_ducts'], view: 'ant',
        body: [
          t('Hepatocytes secrete 600–1000 ml of bile daily from their biliary poles into bile canaliculi. The liver can be organized as classic lobules around central veins, portal lobules or acini with metabolic zones. The portal triad contains branches of the hepatic artery, portal vein and bile duct.',
            'Os hepatócitos secretam 600–1000 ml de bile por dia de seus polos biliares aos canalículos biliares. O fígado pode ser organizado em lóbulos clássicos ao redor de veias centrais, lóbulos portais ou ácinos com zonas metabólicas. A tríade portal contém ramos da artéria hepática, da veia porta e do ducto biliar.'),
          t('Lobules vary in shape. Functionally, liver acini extend between adjacent central venules and have three zones.',
            'Os lóbulos variam de forma. Funcionalmente, os ácinos hepáticos estendem-se entre vênulas centrais adjacentes e têm três zonas.'),
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
          t('Intrahepatic bile pathways begin as canaliculi without their own wall, formed by opposing hepatocyte membranes and a junction complex at the biliary pole. Nearby are the sinusoidal lumen, porous endothelial cells, perisinusoidal space, stellate macrophage, collagen fibres and red blood cells. Hepatocytes contain Golgi complexes, rough endoplasmic reticulum, mitochondria and lysosomes.',
            'As vias biliares intra-hepáticas começam como canalículos sem parede própria, formados pelas membranas de hepatócitos opostos e por um complexo juncional no polo biliar. Próximos ficam o lúmen sinusoidal, células endoteliais com poros, espaço perissinusoidal, macrófago estrelado, fibras colágenas e hemácias. Os hepatócitos contêm complexos de Golgi, retículo endoplasmático rugoso, mitocôndrias e lisossomos.'),
          t('The initial canaliculi lack a separate wall. Toward the lobular periphery, later bile channels have their own wall.',
            'Os canalículos iniciais não têm parede própria. Em direção à periferia do lóbulo, os canais biliares posteriores passam a ter parede própria.'),
        ],
      },
      {
        id: 'gbspleen-p29', ref: '29', title: t('From the periphery to the major intrahepatic ducts', 'Da periferia aos grandes ductos intra-hepáticos'),
        focus: ['hepatic_ducts', 'hepatic_portal_v', 'ivc_g'], view: 'ant',
        body: [
          t('Moving towards the periphery of the lobule, the canaliculi become ducts with a proper wall, which unite to form the intralobular bile ductules, called cholangioles. The cholangioles unite toward the angle of the lobule to form the periportal bile ductules, the canals of Hering. The canals of Hering unite to form the major intrahepatic bile ducts.',
            'Indo para a periferia do lóbulo, os canalículos se tornam ductos com parede própria, que se unem para formar os ductúlos biliares intralobulares, chamados colangíolos. Os colangíolos se unem em direção ao ângulo do lóbulo para formar os ductúlos biliares periportais, os canais de Hering. Os canais de Hering se unem para formar os grandes ductos biliares intra-hepáticos.'),
          t('The portal space contains a portal vein branch and an interlobular bile duct beside its limiting plate. Sinusoids connect the portal region to the central vein. Bile ducts unite and leave the liver as the right and left hepatic ducts.',
            'O espaço porta contém um ramo da veia porta e um ducto biliar interlobular junto à sua placa limitante. Os sinusoides ligam a região porta à veia central. Os ductos biliares se unem e deixam o fígado como ductos hepáticos direito e esquerdo.'),
        ],
      },
      {
        id: 'gbspleen-p30', ref: '30', title: t('The left and right hepatic ducts and the sectoral ducts', 'Os ductos hepáticos direito e esquerdo e os ductos setoriais'),
        focus: ['hepatic_ducts', 'gallbladder', 'cystic_duct', 'common_hepatic_duct', 'duodenum', 'pancreas'], ghost: ['caudate_lobe', 'stomach', 'common_hepatic_a'], view: 'ant',
        body: [
          t('Bile ducts unite and leave the liver as right and left hepatic ducts. The right system includes anterior (medial) and posterior (lateral) sectoral ducts. The round ligament, cystic duct, gallbladder fundus, body and neck, common hepatic duct and common bile duct lie nearby.',
            'Os ductos biliares se unem e deixam o fígado como ductos hepáticos direito e esquerdo. O sistema direito inclui ductos setoriais anterior (medial) e posterior (lateral). O ligamento redondo, o ducto cístico, o fundo, corpo e colo da vesícula, o ducto hepático comum e o colédoco ficam próximos.'),
          t('The bile duct has supraduodenal, retroduodenal and retropancreatic segments. It passes behind the duodenum toward the pancreas. The left hepatic duct, stomach and common hepatic artery are nearby.',
            'O ducto biliar tem segmentos supraduodenal, retroduodenal e retropancreático. Passa atrás do duodeno em direção ao pâncreas. O ducto hepático esquerdo, o estômago e a artéria hepática comum ficam próximos.'),
        ],
      },
      {
        id: 'gbspleen-p31', ref: '31', title: t('The common hepatic duct and the porta hepatis', 'O ducto hepático comum e o hilo hepático'),
        focus: ['common_hepatic_duct', 'hepatic_ducts', 'caudate_lobe', 'hepatic_portal_v', 'ivc_g', 'gallbladder'], view: 'ant',
        body: [
          t('The right and left hepatic ducts unite at the porta hepatis between the caudate and quadrate lobes to form the common hepatic duct. It joins the cystic duct to form the bile duct. Nearby are the portal vein, left liver lobe, round ligament, gallbladder, inferior vena cava and its ligament, left hepatic vein and bare area.',
            'Os ductos hepáticos direito e esquerdo unem-se na porta do fígado, entre os lobos caudado e quadrado, para formar o ducto hepático comum. Ele se une ao ducto cístico para formar o colédoco. Próximos ficam a veia porta, o lobo esquerdo do fígado, o ligamento redondo, a vesícula biliar, a veia cava inferior e seu ligamento, a veia hepática esquerda e a área nua.'),
        ],
      },
      {
        id: 'gbspleen-p32', ref: '32', title: t('The common bile duct, the ampulla and the sequence of ducts', 'O colédoco, a ampola e a sequência dos ductos'),
        focus: ['common_hepatic_duct', 'pancreatic_duct', 'duodenum', 'hepatic_ducts', 'gallbladder', 'cystic_duct', 'pancreas'], view: 'ant',
        body: [
          t('The common hepatic duct and the cystic duct unite to form the common bile duct. The common bile duct enters the hepatopancreatic ampulla (of Vater) together with the main pancreatic duct. The ampulla is seen in the duodenum as the major duodenal papilla.',
            'O ducto hepático comum e o ducto cístico se unem para formar o colédoco. O colédoco entra na ampola hepatopancreática (de Vater) junto com o ducto pancreático principal. A ampola é vista no duodeno como a papila duodenal maior.'),
          t('Bile passes through canaliculi, bile canals, ductules, interlobular and major intrahepatic ducts, then right and left hepatic ducts. These form the common hepatic duct, which joins the cystic duct. The resulting common bile duct joins the main pancreatic duct at the hepatopancreatic ampulla. The accessory pancreatic duct opens at the minor papilla.',
            'A bile passa por canalículos, canais biliares, ductúlos, ductos interlobulares e grandes ductos intra-hepáticos, depois pelos ductos hepáticos direito e esquerdo. Estes formam o ducto hepático comum, que se une ao cístico. O colédoco resultante une-se ao ducto pancreático principal na ampola hepatopancreática. O ducto pancreático acessório abre-se na papila menor.'),
        ],
      },
      {
        id: 'gbspleen-p33', ref: '33', title: t('The hepatoduodenal ligament and Calot’s triangle (figure)', 'O ligamento hepatoduodenal e o triângulo de Calot (figura)'),
        focus: ['pancreas', 'duodenum', 'gallbladder', 'hepatic_portal_v', 'common_hepatic_a', 'common_hepatic_duct', 'sma', 'smv'], ghost: ['transverse_colon', 'caudate_lobe'], view: 'ant',
        body: [
          t('The hepatoduodenal ligament contains the portal vein, proper hepatic artery and common bile duct above the descending duodenum. It relates to the pancreas, transverse mesocolon root, duodenojejunal flexure, transverse colon, greater omentum, mesenteric root and superior mesenteric artery and vein. Calot’s triangle lies near the gallbladder, cystic duct, cystic artery and common bile duct region, beside the proper hepatic artery and portal vein.',
            'O ligamento hepatoduodenal contém a veia porta, a artéria hepática própria e o colédoco acima do duodeno descendente. Relaciona-se com o pâncreas, a raiz do mesocolo transverso, a flexura duodenojejunal, o colo transverso, o omento maior, a raiz do mesentério e a artéria e veia mesentéricas superiores. O triângulo de Calot fica perto da vesícula, do ducto e da artéria císticos e da região do colédoco, ao lado da artéria hepática própria e da veia porta.'),
        ],
      },
    ],
    questions: [
      { ref: '26', q: 'How much bile does the liver secrete per day?', correct: '600–1000 ml per day', wrong: ['50–100 ml per day', '2–3 litres per day', '10–20 ml per day'], why: 'Bile is secreted at 600–1000 ml per day.',
        pt: { q: 'Quanta bile o fígado secreta por dia?', correct: '600–1000 ml por dia', wrong: ['50–100 ml por dia', '2–3 litros por dia', '10–20 ml por dia'], why: 'A bile é secretada a 600–1000 ml por dia.' } },
      { ref: '27', q: 'What forms the bile canaliculi?', correct: 'Grooves in the membranes of two opposing hepatocytes, sealed by tight junctions', wrong: ['A wall of cholangiocytes alone', 'A branch of the portal vein', 'The endothelial cells of the sinusoid'], why: 'Canaliculi are spaces between opposing grooves in two hepatocytes, sealed by tight junctions (blood–bile barrier).',
        pt: { q: 'O que forma os canalículos biliares?', correct: 'Sulcos nas membranas de dois hepatócitos opostos, selados por junções oclusivas', wrong: ['Somente uma parede de colangiócitos', 'Um ramo da veia porta', 'As células endoteliais do sinusoide'], why: 'Os canalículos são espaços entre sulcos opostos de dois hepatócitos, selados por junções oclusivas (barreira sangue-bile).' } },
      { ref: '29', q: 'What are the canals of Hering?', correct: 'Periportal bile ductules', wrong: ['Intralobular bile ductules (cholangioles)', 'The left hepatic duct', 'The cystic duct'], why: 'The cholangioles unite to form the periportal bile ductules, the canals of Hering.',
        pt: { q: 'O que são os canais de Hering?', correct: 'Ductúlos biliares periportais', wrong: ['Ductúlos biliares intralobulares (colangíolos)', 'O ducto hepático esquerdo', 'O ducto cístico'], why: 'Os colangíolos se unem para formar os ductúlos biliares periportais, os canais de Hering.' } },
      { ref: '30', q: 'As what do the bile ducts leave the liver?', correct: 'The left and right hepatic ducts', wrong: ['The common bile duct', 'The cystic duct', 'The hepatopancreatic ampulla'], why: 'The bile ducts unite and leave the liver as the left and right hepatic ducts.',
        pt: { q: 'Como os ductos biliares deixam o fígado?', correct: 'Como os ductos hepáticos direito e esquerdo', wrong: ['Como o colédoco', 'Como o ducto cístico', 'Como a ampola hepatopancreática'], why: 'Os ductos biliares se unem e deixam o fígado como os ductos hepáticos direito e esquerdo.' } },
      { ref: '31', q: 'Where does the common hepatic duct leave the liver?', correct: 'At the porta hepatis', wrong: ['At the fundus of the gallbladder', 'At the major duodenal papilla', 'At the lesser sac'], why: 'The left and right hepatic ducts unite to form the common hepatic duct, which leaves the liver at the porta hepatis.',
        pt: { q: 'Onde o ducto hepático comum deixa o fígado?', correct: 'No hilo hepático', wrong: ['No fundo da vesícula', 'Na papila duodenal maior', 'Na bolsa omental'], why: 'Os ductos hepáticos direito e esquerdo se unem no ducto hepático comum, que deixa o fígado no hilo hepático.' } },
      { ref: '32', q: 'Which duct joins the common bile duct at the hepatopancreatic ampulla?', correct: 'The main pancreatic duct', wrong: ['The accessory pancreatic duct', 'The cystic artery', 'The right hepatic duct'], why: 'The bile duct enters, together with the main pancreatic duct, the hepatopancreatic ampulla of Vater.',
        pt: { q: 'Qual ducto se une ao colédoco na ampola hepatopancreática?', correct: 'O ducto pancreático principal', wrong: ['O ducto pancreático acessório', 'A artéria cística', 'O ducto hepático direito'], why: 'O colédoco entra, junto com o ducto pancreático principal, na ampola hepatopancreática de Vater.' } },
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
          t('When stones block bile flow to the duodenum, jaundice can result. Bile pigments enter the blood and accumulate in tissues, yellowing the skin and whites of the eyes. Pancreatic cancer in the head can also obstruct bile flow.',
            'Quando cálculos bloqueiam o fluxo de bile ao duodeno, pode surgir icterícia. Pigmentos biliares entram no sangue e acumulam-se nos tecidos, amarelando a pele e o branco dos olhos. O câncer na cabeça do pâncreas também pode obstruir o fluxo biliar.'),
        ],
      },
      {
        id: 'gbspleen-p35', ref: '35', title: t('The cystic artery and its two branches', 'A artéria cística e seus dois ramos'),
        focus: ['cystic_duct', 'gallbladder', 'proper_hepatic_a', 'common_hepatic_a', 'celiac_trunk'], ghost: ['splenic_a', 'gastroduodenal_a', 'left_gastric_a', 'pancreaticoduodenal_a', 'gastroepiploic_a', 'pancreas'], view: 'ant',
        body: [
          t('The cystic artery usually arises from the right branch of the hepatic artery, behind the common hepatic duct, and only a few times directly from the proper hepatic artery. On reaching the superior aspect of the neck, it divides into a superficial branch, which runs along the inferior surface of the gallbladder, and a deep branch, which runs between the gallbladder and its fossa. The two branches anastomose over the surface of the body and fundus.',
            'A artéria cística costuma nascer do ramo direito da artéria hepática, atrás do ducto hepático comum, e só algumas vezes diretamente da artéria hepática própria. Ao chegar à face superior do colo, divide-se em um ramo superficial, que corre ao longo da face inferior da vesícula, e um ramo profundo, que corre entre a vesícula e a sua fossa. Os dois ramos se anastomosam sobre a superfície do corpo e do fundo.'),
          t('The upper abdominal arteries include the celiac trunk, left gastric artery with its esophageal branch, recurrent branch of the left inferior phrenic artery, hepatic and splenic arteries, short gastric, supraduodenal and pancreaticoduodenal arteries, right and left gastro-omental arteries, gastroduodenal artery and dorsal pancreatic artery.',
            'As artérias do abdome superior incluem o tronco celíaco, a artéria gástrica esquerda com seu ramo esofágico, o ramo recorrente da frênica inferior esquerda, as artérias hepáticas e esplênica, gástricas curtas, supraduodenal e pancreaticoduodenais, gastro-omentais direita e esquerda, gastroduodenal e pancreática dorsal.'),
        ],
      },
      {
        id: 'gbspleen-p36', ref: '36', title: t('The variants of the cystic artery', 'As variantes da artéria cística'),
        focus: ['cystic_duct', 'gallbladder', 'proper_hepatic_a', 'sma', 'common_hepatic_a', 'celiac_trunk'], ghost: ['abdominal_aorta_g', 'splenic_a'], view: 'ant',
        body: [
          t('Four variants of the cystic artery are listed. (a) It arises from the right hepatic artery, behind the common hepatic duct, in 46% of cases. (b) There are two cystic arteries, in 13% of cases. (c) It arises from the right branch of the superior mesenteric artery, in 12% of cases. (d) It arises from the left branch of the proper hepatic artery, in 5% of cases.',
            'São listadas quatro variantes da artéria cística. (a) Nasce do ramo direito da artéria hepática, atrás do ducto hepático comum, em 46% dos casos. (b) Há duas artérias císticas, em 13% dos casos. (c) Nasce do ramo direito da artéria mesentérica superior, em 12% dos casos. (d) Nasce do ramo esquerdo da artéria hepática própria, em 5% dos casos.'),
          t('The cystic artery can arise from a right branch of the superior mesenteric artery; this variant is reported in 12% of cases.',
            'A artéria cística pode originar-se de um ramo direito da artéria mesentérica superior; essa variante é relatada em 12% dos casos.'),
        ],
      },
      {
        id: 'gbspleen-p37', ref: '37', title: t('The cystic veins', 'As veias císticas'),
        focus: ['gallbladder', 'hepatic_portal_v', 'smv', 'splenic_v', 'imv', 'gastric_v'], ghost: ['pancreas', 'transverse_colon', 'ileum'], view: 'ant',
        body: [
          t('The cystic veins are many small veins. A few end in the right branch of the portal vein. Others lie in the areolar tissue between the gallbladder and the liver and drain into segmental portal veins inside the liver. These form the cystic group of accessory hepatic portal veins.',
            'As veias císticas são muitas veias pequenas. Algumas terminam no ramo direito da veia porta. Outras ficam no tecido areolar entre a vesícula e o fígado e drenam para as veias porta segmentares dentro do fígado. Elas formam o grupo cístico das veias porta hepáticas acessórias.'),
          t('The portal venous system includes left gastric and esophageal, short gastric, pancreaticoduodenal, superior mesenteric, right and left gastro-omental, pancreatic, splenic, left, middle and right colic, ileocolic and inferior mesenteric veins. The cystic artery, anterior and posterior cystic veins and a visceral sensory nerve lie near the gallbladder.',
            'O sistema venoso porta inclui as veias gástrica esquerda e esofágica, gástricas curtas, pancreaticoduodenais, mesentérica superior, gastro-omentais direita e esquerda, pancreáticas, esplênica, cólicas esquerda, média e direita, ileocólica e mesentérica inferior. A artéria cística, as veias císticas anterior e posterior e um nervo sensitivo visceral ficam perto da vesícula.'),
        ],
      },
      {
        id: 'gbspleen-p38', ref: '38', title: t('Calot’s triangle at the hilum', 'O triângulo de Calot no hilo'),
        focus: ['gallbladder', 'cystic_duct', 'common_hepatic_duct', 'proper_hepatic_a', 'hepatic_portal_v'], ghost: ['caudate_lobe', 'duodenum'], view: 'ant',
        body: [
          t('At the hepatic hilum, after opening the hepatoduodenal ligament and removing nerves and lymphatics, the cystic hilum can be recognised by three structures: the cystic artery (or the ventral surface of the right lobe of the liver), the cystic duct, and the common hepatic duct. Identifying them helps to minimise complications of laparoscopic cholecystectomy, such as injury to the biliary tree.',
            'No hilo hepático, depois de abrir o ligamento hepatoduodenal e retirar nervos e linfáticos, o hilo cístico pode ser reconhecido por três estruturas: a artéria cística (ou a face ventral do lobo direito do fígado), o ducto cístico e o ducto hepático comum. Identificá-las ajuda a reduzir as complicações da colecistectomia laparoscópica, como a lesão da árvore biliar.'),
          t('Calot’s triangle lies at the portal fissure. The source reports that 95% of extrahepatic bile duct injuries occur during surgery, most often cholecystectomy. Identifying the triangle before clipping and cutting the cystic artery and duct helps avoid injury.',
            'O triângulo de Calot fica na fissura portal. A fonte relata que 95% das lesões dos ductos biliares extra-hepáticos ocorrem durante cirurgias, sobretudo colecistectomias. Identificar o triângulo antes de clipar e cortar a artéria e o ducto císticos ajuda a evitar lesões.'),
        ],
      },
    ],
    questions: [
      { ref: '34', q: 'Which substances make up gallstones mainly?', correct: 'Cholesterol, calcium carbonate and bilirubin', wrong: ['Iron oxide, urea and sodium chloride', 'Uric acid, phosphate and protein', 'Keratin, calcium phosphate and mucus'], why: 'Gallstones are composed mainly of cholesterol, calcium carbonate and bilirubin.',
        pt: { q: 'Quais substâncias compõem principalmente os cálculos biliares?', correct: 'Colesterol, carbonato de cálcio e bilirrubina', wrong: ['Óxido de ferro, ureia e cloreto de sódio', 'Ácido úrico, fosfato e proteína', 'Queratina, fosfato de cálcio e muco'], why: 'Os cálculos são compostos principalmente de colesterol, carbonato de cálcio e bilirrubina.' } },
      { ref: '34', q: 'Why does a blocked bile flow cause jaundice?', correct: 'Bile is not eliminated in the faeces and is absorbed into the blood', wrong: ['Bile is stored in the spleen instead of the gallbladder', 'The duodenum produces excess bile', 'The pancreas secretes bile instead of juice'], why: 'The bile is not eliminated in the faeces but absorbed into the blood, and its pigments yellow the tissues.',
        pt: { q: 'Por que o bloqueio do fluxo biliar causa icterícia?', correct: 'A bile não é eliminada nas fezes e é absorvida pelo sangue', wrong: ['A bile fica armazenada no baço em vez da vesícula', 'O duodeno produz bile em excesso', 'O pâncreas secreta bile em vez de suco'], why: 'A bile não é eliminada nas fezes, mas absorvida pelo sangue, e seus pigmentos amarelam os tecidos.' } },
      { ref: '35', q: 'From which artery does the cystic artery usually arise?', correct: 'The right branch of the hepatic artery, behind the common hepatic duct', wrong: ['The splenic artery', 'The left gastric artery', 'The superior mesenteric artery'], why: 'The cystic artery usually arises from the right branch of the hepatic artery, posterior to the common hepatic duct.',
        pt: { q: 'De qual artéria costuma nascer a artéria cística?', correct: 'Do ramo direito da artéria hepática, atrás do ducto hepático comum', wrong: ['Da artéria esplênica', 'Da artéria gástrica esquerda', 'Da artéria mesentérica superior'], why: 'A artéria cística costuma nascer do ramo direito da artéria hepática, posterior ao ducto hepático comum.' } },
      { ref: '36', q: 'In what percentage of cases does the cystic artery arise from the right branch of the hepatic artery, behind the common hepatic duct?', correct: '46%', wrong: ['13%', '12%', '5%'], why: 'In the class material, variant a: 46% of cases.',
        pt: { q: 'Em que porcentagem dos casos a artéria cística nasce do ramo direito da artéria hepática, atrás do ducto hepático comum?', correct: '46%', wrong: ['13%', '12%', '5%'], why: 'No material da aula, variante a: 46% dos casos.' } },
      { ref: '37', q: 'Where do some of the cystic veins drain?', correct: 'Into segmental portal veins inside the liver (cystic group of accessory hepatic portal veins)', wrong: ['Directly into the inferior vena cava', 'Into the splenic artery', 'Into the superior mesenteric artery'], why: 'Some drain into segmental portal veins inside the liver, the cystic group of accessory hepatic portal veins.',
        pt: { q: 'Para onde drenam algumas das veias císticas?', correct: 'Em veias porta segmentares dentro do fígado (grupo cístico das veias porta acessórias)', wrong: ['Diretamente na veia cava inferior', 'Na artéria esplênica', 'Na artéria mesentérica superior'], why: 'Algumas drenam para veias porta segmentares dentro do fígado, o grupo cístico das veias porta hepáticas acessórias.' } },
      { ref: '38', q: 'Which three structures border Calot’s triangle?', correct: 'The cystic artery, the cystic duct and the common hepatic duct', wrong: ['The cystic artery, the hepatic artery and the portal vein', 'The cystic duct, the pancreatic duct and the duodenum', 'The common bile duct, the gastroduodenal artery and the fundus'], why: 'The triangle is bordered by the cystic artery, the cystic duct and the common hepatic duct.',
        pt: { q: 'Quais três estruturas delimitam o triângulo de Calot?', correct: 'A artéria cística, o ducto cístico e o ducto hepático comum', wrong: ['A artéria cística, a artéria hepática e a veia porta', 'O ducto cístico, o ducto pancreático e o duodeno', 'O colédoco, a artéria gastroduodenal e o fundo'], why: 'O triângulo é delimitado pela artéria cística, pelo ducto cístico e pelo ducto hepático comum.' } },
    ],
  },
  {
    id: 'gbspleen-5', title: t('Vascularisation of the gut: origin, course and jejunal and ileal arteries', 'Vascularização do intestino: origem, trajeto e artérias jejunais e ileais'),
    cards: [
      {
        id: 'gbspleen-p39', ref: '39', title: t('The three arterial territories of the gut', 'Os três territórios arteriais do intestino'),
        focus: ['celiac_trunk', 'sma', 'ima'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The celiac trunk supplies the foregut, the superior mesenteric artery supplies the midgut, and the inferior mesenteric artery supplies the hindgut.',
            'O tronco celíaco irriga o intestino anterior, a artéria mesentérica superior irriga o intestino médio e a artéria mesentérica inferior irriga o intestino posterior.'),
          t('The mesenteric intestine is the part suspended by a mesentery.',
            'O intestino mesentérico é a parte suspensa por um mesentério.'),
        ],
      },
      {
        id: 'gbspleen-p40', ref: '40', title: t('What the SMA supplies, and where it starts', 'O que a AMS irriga e de onde ela começa'),
        focus: ['sma', 'ileocolic_a', 'right_colic_a', 'middle_colic_a', 'appendicular_a', 'celiac_trunk'], ghost: ['ascending_colon', 'transverse_colon', 'ileum', 'appendix', 'pancreas', 'duodenum'], view: 'ant',
        body: [
          t('The superior mesenteric artery supplies the structures of the midgut: the distal half of the duodenum, the jejunum and ileum, the caecum and appendix, the ascending colon, the right colic flexure, and the proximal half of the transverse colon. It arises from the aorta 1 cm below the coeliac trunk, at L1.',
            'A artéria mesentérica superior irriga as estruturas do intestino médio: a metade distal do duodeno, o jejuno e o íleo, o ceco e o apêndice, o colo ascendente, a flexura cólica direita e a metade proximal do colo transverso. Ela nasce da aorta 1 cm abaixo do tronco celíaco, em L1.'),
          t('The SMA gives inferior pancreaticoduodenal, middle colic, right colic, ileocolic, jejunal and ileal branches. The appendicular artery supplies the appendix. The left colic flexure marks the distal colic region; the SMA arises from the abdominal aorta above L4.',
            'A AMS dá ramos pancreaticoduodenal inferior, cólico médio, cólico direito, ileocólico, jejunais e ileais. A artéria apendicular irriga o apêndice. A flexura cólica esquerda marca a região cólica distal; a AMS nasce da aorta abdominal acima de L4.'),
          t('⚠ Page 40 of the gallbladder and SMA lesson assigns the proximal half of the transverse colon to the SMA; page 40 of the large intestine lesson assigns it the proximal two-thirds.',
            '⚠ A página 40 da aula de vesícula e AMS atribui à AMS a metade proximal do colo transverso; a página 40 da aula de intestino grosso atribui os dois terços proximais.'),
        ],
      },
      {
        id: 'gbspleen-p41', ref: '41', title: t('The origins of the abdominal branches, with vertebral levels', 'As origens dos ramos abdominais, com os níveis vertebrais'),
        focus: ['celiac_trunk', 'sma', 'ima', 'splenic_a', 'common_hepatic_a', 'gastroduodenal_a', 'abdominal_aorta_g'], ghost: ['spleen', 'stomach', 'duodenum', 'ivc_g'], view: 'ant',
        body: [
          t('The celiac trunk arises at T12, the SMA at L1, the renal arteries at L1–L2 and the inferior mesenteric artery at L3. The aorta bifurcates at L4. Other branches include inferior phrenic, suprarenal, gonadal and lumbar arteries and the median sacral artery.',
            'O tronco celíaco nasce em T12, a AMS em L1, as artérias renais em L1–L2 e a artéria mesentérica inferior em L3. A aorta bifurca-se em L4. Outros ramos incluem as artérias frênicas inferiores, suprarrenais, gonadais e lombares e a artéria sacral mediana.'),
          t('The common hepatic, proper hepatic, gastroduodenal, splenic, left gastric and right gastric arteries supply the upper abdomen. The SMA arises between the celiac trunk and inferior mesenteric artery.',
            'As artérias hepática comum, hepática própria, gastroduodenal, esplênica, gástrica esquerda e gástrica direita irrigam o abdome superior. A AMS nasce entre o tronco celíaco e a artéria mesentérica inferior.'),
        ],
      },
      {
        id: 'gbspleen-p42', ref: '42', title: t('The course of the SMA behind the pancreas', 'O trajeto da AMS atrás do pâncreas'),
        focus: ['sma', 'smv', 'pancreas', 'duodenum', 'ivc_g'], ghost: ['celiac_trunk', 'abdominal_aorta_g', 'spleen'], view: 'ant',
        body: [
          t('The SMA originates beneath the pancreatic head, next to the superior mesenteric vein. It passes anterior to the uncinate process, third part of the duodenum and left renal vein. Its branches run left to the small intestine and right to the colon. The celiac trunk arises above it from the aorta, near the left renal artery.',
            'A AMS nasce abaixo da cabeça pancreática, junto à veia mesentérica superior. Passa à frente do processo uncinado, da terceira parte do duodeno e da veia renal esquerda. Seus ramos seguem à esquerda para o intestino delgado e à direita para o colo. O tronco celíaco nasce acima dela na aorta, perto da artéria renal esquerda.'),
          t('The left renal vein and horizontal duodenum pass between the aorta and SMA.',
            'A veia renal esquerda e o duodeno horizontal passam entre a aorta e a AMS.'),
        ],
      },
      {
        id: 'gbspleen-p43', ref: '43', title: t('The course of the SMA and the jejunal and ileal arteries', 'O trajeto da AMS e as artérias jejunais e ileais'),
        focus: ['sma', 'ileocolic_a', 'middle_colic_a', 'right_colic_a', 'appendicular_a', 'left_colic_a'], ghost: ['ileum', 'jejunum', 'ascending_colon', 'transverse_colon'], view: 'ant',
        body: [
          t('The SMA descends in a curve with its convexity to the left, and it reaches the right iliac fossa, where it ends by anastomosing with the ileocolic artery, one of its own branches. Its first branches are the jejunal and ileal arteries, which come from the left side of the SMA and supply the jejunum and ileum, but not the distal end of the ileum.',
            'A AMS desce em uma curva com a convexidade voltada para a esquerda, e alcança a fossa ilíaca direita, onde termina anastomosando-se com a artéria ileocólica, um de seus próprios ramos. Seus primeiros ramos são as artérias jejunais e ileais, que saem do lado esquerdo da AMS e irrigam o jejuno e o íleo, mas não a extremidade distal do íleo.'),
          t('Jejunal and ileal arteries run parallel in the mesentery, divide and join neighbouring branches to form arcades. Straight arteries arise from these arcades. Regional arteries also include the middle, left and right colic and appendicular arteries.',
            'As artérias jejunais e ileais correm paralelas no mesentério, dividem-se e unem-se a ramos vizinhos para formar arcadas. Artérias retas nascem dessas arcadas. As artérias regionais também incluem as cólicas média, esquerda e direita e a apendicular.'),
        ],
      },
      {
        id: 'gbspleen-p44', ref: '44', title: t('The straight arteries (arteriae rectae)', 'As artérias retas (arteriae rectae)'),
        focus: ['sma', 'ileum', 'jejunum'], ghost: ['appendix'], view: 'ant',
        body: [
          t('From the distal arcades, the straight arteries (arteriae rectae) are given off, and they end in the layers of the small intestine. The straight arteries reach the concave margin of the small intestine and bifurcate, running along the opposite surfaces of the loop. Then they anastomose with their corresponding terminal branches on the convex margin.',
            'Das arcadas distais saem as artérias retas (arteriae rectae), que terminam nas camadas do intestino delgado. As artérias retas alcançam a margem côncava do intestino delgado e se bifurcam, correndo pelas superfícies opostas da alça. Depois se anastomosam com seus ramos terminais correspondentes na margem convexa.'),
          t('Straight arteries run through the mesentery to the wall of the small intestine.',
            'As artérias retas atravessam o mesentério até a parede do intestino delgado.'),
        ],
      },
      {
        id: 'gbspleen-p45', ref: '45', title: t('The tiers of arcades in the jejunum and the ileum', 'As camadas de arcadas no jejuno e no íleo'),
        focus: ['sma', 'jejunum', 'ileum'], view: 'ant',
        body: [
          t('The jejunum has 1–3 tiers of vascular arcades, whereas the ileum has 2–6. Arcades increase distally.',
            'O jejuno tem 1–3 camadas de arcadas vasculares, enquanto o íleo tem 2–6. As arcadas aumentam distalmente.'),
        ],
      },
    ],
    questions: [
      { ref: '39', q: 'Which artery supplies the midgut?', correct: 'The superior mesenteric artery', wrong: ['The coeliac trunk', 'The inferior mesenteric artery', 'The left gastric artery'], why: 'Coeliac trunk for the foregut, SMA for the midgut, IMA for the hindgut.',
        pt: { q: 'Qual artéria irriga o intestino médio?', correct: 'A artéria mesentérica superior', wrong: ['O tronco celíaco', 'A artéria mesentérica inferior', 'A artéria gástrica esquerda'], why: 'Tronco celíaco para o intestino anterior, AMS para o médio, AMI para o posterior.' } },
      { ref: '40', q: 'Where does the SMA arise from the aorta?', correct: '1 cm below the coeliac trunk, at L1', wrong: ['Just above the coeliac trunk, at T12', 'At the aortic bifurcation, at L4', 'At L3, together with the inferior mesenteric artery'], why: 'The SMA arrives from the aorta 1 cm below the coeliac trunk (L1).',
        pt: { q: 'De onde a AMS nasce na aorta?', correct: '1 cm abaixo do tronco celíaco, em L1', wrong: ['Logo acima do tronco celíaco, em T12', 'Na bifurcação aórtica, em L4', 'Em L3, junto com a artéria mesentérica inferior'], why: 'A AMS sai da aorta 1 cm abaixo do tronco celíaco (L1).' } },
      { ref: '40', q: 'Which part of the transverse colon is assigned to the SMA?', correct: 'The proximal one half', wrong: ['The distal one half', 'The whole transverse colon', 'Only the splenic flexure'], why: 'The SMA supplies the proximal one half of the transverse colon (deck 10 says two-thirds).',
        pt: { q: 'Qual parte do colo transverso é atribuída à AMS?', correct: 'A metade proximal', wrong: ['A metade distal', 'Todo o colo transverso', 'Somente a flexura esplênica'], why: 'A AMS irriga a metade proximal do colo transverso (o deck 10 diz dois terços).' } },
      { ref: '41', q: 'At which vertebral level does the coeliac trunk arise?', correct: 'T12', wrong: ['L1', 'L3', 'L4'], why: 'Coeliac trunk at T12; SMA at L1; IMA at L3; aortic bifurcation at L4.',
        pt: { q: 'Em qual nível vertebral nasce o tronco celíaco?', correct: 'T12', wrong: ['L1', 'L3', 'L4'], why: 'Tronco celíaco em T12; AMS em L1; AMI em L3; bifurcação aórtica em L4.' } },
      { ref: '42', q: 'Which structures does the SMA pass in front of?', correct: 'The uncinate process of the pancreas and the third part of the duodenum', wrong: ['The splenic artery and the stomach', 'The gallbladder and the cystic duct', 'The spleen and the left kidney'], why: 'The SMA passes in front of the uncinate process and the third part of the duodenum.',
        pt: { q: 'Na frente de quais estruturas passa a AMS?', correct: 'Do processo uncinado do pâncreas e da terceira parte do duodeno', wrong: ['Da artéria esplênica e do estômago', 'Da vesícula e do ducto cístico', 'Do baço e do rim esquerdo'], why: 'A AMS passa na frente do processo uncinado e da terceira parte do duodeno.' } },
      { ref: '45', q: 'How many tiers of arcades does the ileum contain?', correct: '2–6 tiers', wrong: ['1–3 tiers', '7–9 tiers', 'No arcades'], why: 'The jejunum has 1–3 tiers; the ileum has 2–6 tiers.',
        pt: { q: 'Quantas camadas de arcadas tem o íleo?', correct: '2–6 camadas', wrong: ['1–3 camadas', '7–9 camadas', 'Nenhuma arcada'], why: 'O jejuno tem 1–3 camadas; o íleo tem 2–6 camadas.' } },
    ],
  },
  {
    id: 'gbspleen-6', title: t('SMA branches and the veins of the small and large intestine', 'Ramos da AMS e as veias do intestino delgado e grosso'),
    cards: [
      {
        id: 'gbspleen-p46', ref: '46', title: t('The inferior pancreaticoduodenal artery', 'A artéria pancreaticoduodenal inferior'),
        focus: ['pancreaticoduodenal_a', 'sma', 'gastroduodenal_a', 'splenic_a', 'pancreas', 'duodenum'], ghost: ['celiac_trunk', 'common_hepatic_a', 'common_hepatic_duct'], view: 'ant',
        body: [
          t('The inferior pancreaticoduodenal artery is the second branch of the superior mesenteric artery. Its anterior and posterior branches reach opposite sides of the pancreatic head and duodenum.',
            'A artéria pancreaticoduodenal inferior é o segundo ramo da artéria mesentérica superior. Seus ramos anterior e posterior chegam a lados opostos da cabeça do pâncreas e do duodeno.'),
          t('The two inferior branches anastomose with their superior counterparts from the gastroduodenal artery. The gastroduodenal artery descends from the common hepatic artery near the common bile duct. The proper hepatic artery continues upward. Above the pancreas, the abdominal aorta gives rise to the coeliac trunk, which gives off the left gastric, common hepatic and splenic arteries. Along the pancreas, dorsal, inferior and great pancreatic arteries supply the gland. A pancreatic branch reaches the tail near the splenic hilum.',
            'Os dois ramos inferiores se anastomosam com os ramos superiores correspondentes, que vêm da artéria gastroduodenal. A gastroduodenal desce da artéria hepática comum perto do colédoco. A artéria hepática própria continua para cima. Acima do pâncreas, a aorta abdominal dá origem ao tronco celíaco, do qual saem as artérias gástrica esquerda, hepática comum e esplênica. Ao longo do pâncreas, as artérias pancreáticas dorsal, inferior e magna irrigam a glândula. Um ramo pancreático chega à cauda, perto do hilo esplênico.'),
        ],
      },
      {
        id: 'gbspleen-p47', ref: '47', title: t('The ileocolic artery and its two branches', 'A artéria ileocólica e seus dois ramos'),
        focus: ['ileocolic_a', 'sma', 'appendicular_a', 'right_colic_a', 'ileum', 'ascending_colon'], ghost: ['middle_colic_a', 'left_colic_a', 'transverse_colon', 'ima', 'sigmoid_a'], view: 'ant',
        body: [
          t('The ileocolic artery comes from the right side of the SMA. It descends on the right, behind the parietal peritoneum, to the right iliac fossa, where it divides into two branches. The superior colic branch anastomoses with the right colic artery, which supplies the ascending colon. The inferior ileal branch anastomoses with the final tract of the SMA, which supplies the distal part of the ileum, the caecum and the appendix.',
            'A artéria ileocólica sai do lado direito da AMS. Desce do lado direito, atrás do peritônio parietal, até a fossa ilíaca direita, onde se divide em dois ramos. O ramo cólico superior se anastomosa com a artéria cólica direita, que irriga o colo ascendente. O ramo ileal inferior se anastomosa com o trecho final da AMS, que irriga a parte distal do íleo, o ceco e o apêndice.'),
          t('The ileocolic artery divides into superior colic and inferior ileal branches. These relate to the marginal artery, anterior and posterior cecal arteries, appendicular and terminal ileal arteries. Nearby SMA branches include inferior pancreaticoduodenal, jejunal, ileal, right colic and middle colic arteries; the middle colic runs in the transverse mesocolon. Straight arteries supply the bowel. The inferior mesenteric artery gives left colic and sigmoid arteries; sigmoid arteries run in the sigmoid mesocolon. The internal iliac artery lies below.',
            'A artéria ileocólica divide-se em ramos cólico superior e ileal inferior. Eles se relacionam com a artéria marginal, as artérias cecais anterior e posterior, apendicular e ileal terminal. Ramos próximos da AMS incluem as artérias pancreaticoduodenal inferior, jejunais, ileais, cólica direita e cólica média; a cólica média corre no mesocolo transverso. Artérias retas suprem o intestino. A artéria mesentérica inferior dá as artérias cólica esquerda e sigmoides; as sigmoides correm no mesocolo sigmoide. A artéria ilíaca interna fica abaixo.'),
        ],
      },
      {
        id: 'gbspleen-p48', ref: '48–49', title: t('The branches of the inferior ileal branch', 'Os ramos do ramo ileal inferior'),
        focus: ['ileocolic_a', 'appendicular_a', 'ileum', 'ileocecal_junction', 'appendix', 'sma', 'middle_colic_a', 'left_colic_a', 'sigmoid_a', 'superior_rectal_a', 'ima'], ghost: ['abdominal_aorta_g', 'ascending_colon', 'transverse_colon', 'celiac_trunk'], view: 'ant',
        body: [
          t('The inferior ileal branch gives anterior and posterior cecal branches, the appendicular artery and an ileal branch. The ileal branch runs left to the last part of the ileum and anastomoses with the end of the SMA. The marginal artery of Drummond and the arch of Riolan connect colic vessels; the sigmoid and superior rectal arteries arise in the inferior mesenteric territory.',
            'O ramo ileal inferior dá ramos cecais anterior e posterior, a artéria apendicular e um ramo ileal. O ramo ileal segue à esquerda até a última parte do íleo e se anastomosa com o fim da AMS. A artéria marginal de Drummond e o arco de Riolan ligam vasos cólicos; as artérias sigmoides e retal superior nascem no território mesentérico inferior.'),
          t('The inferior division of the ileocolic artery gives anterior and posterior cecal arteries, a terminal ileal artery and an appendicular artery. Its ileal branch joins the termination of the SMA in the mesenteric-terminal ileal anastomosis. Anastomotic arcades, the ascending and colic branches, and a recurrent branch near the appendix are distinct vessels in this region.',
            'A divisão inferior da artéria ileocólica dá as artérias cecais anterior e posterior, ileal terminal e apendicular. Seu ramo ileal une-se à terminação da AMS na anastomose mesentérico-ileal terminal. Arcadas anastomóticas, os ramos ascendente e cólico e um ramo recorrente perto do apêndice são vasos distintos nessa região.'),
        ],
      },
      {
        id: 'gbspleen-p50', ref: '50', title: t('The right colic artery and the marginal artery', 'A artéria cólica direita e a artéria marginal'),
        focus: ['right_colic_a', 'sma', 'ileocolic_a', 'middle_colic_a', 'ascending_colon'], ghost: ['jejunum', 'ileum', 'transverse_colon'], view: 'ant',
        body: [
          t('The right colic artery comes from the right side of the SMA. It runs posteriorly to the parietal peritoneum, towards the right, and it has many variants. Close to the ascending colon it divides into two branches. The descending branch anastomoses with the superior colic branch of the ileocolic artery. The ascending branch anastomoses with the right branch of the middle colic artery.',
            'A artéria cólica direita sai do lado direito da AMS. Corre posteriormente ao peritônio parietal, em direção à direita, e tem muitas variantes. Perto do colo ascendente se divide em dois ramos. O ramo descendente se anastomosa com o ramo cólico superior da ileocólica. O ramo ascendente se anastomosa com o ramo direito da artéria cólica média.'),
          t('Together these anastomoses form the marginal artery, supplying the ascending colon and hepatic flexure. The right colic artery arises from the right side of the SMA between the middle colic and ileocolic arteries; jejunal and ileal arteries arise on the left.',
            'Juntas, essas anastomoses formam a artéria marginal, que irriga o colo ascendente e a flexura hepática. A cólica direita nasce do lado direito da AMS entre as artérias cólica média e ileocólica; as artérias jejunais e ileais nascem à esquerda.'),
        ],
      },
      {
        id: 'gbspleen-p51', ref: '51', title: t('The middle colic artery and the transverse colon', 'A artéria cólica média e o colo transverso'),
        focus: ['middle_colic_a', 'sma', 'transverse_colon', 'left_colic_a', 'right_colic_a'], ghost: ['pancreas', 'ileocolic_a', 'jejunum'], view: 'ant',
        body: [
          t('The middle colic artery originates below the pancreas. It runs anteriorly and to the right, between the two sheets of the transverse mesocolon. It divides into a left and a right branch, which anastomose with the left and right colic arteries to form arcades that supply the transverse colon.',
            'A artéria cólica média nasce abaixo do pâncreas. Corre anteriormente e para a direita, entre as duas lâminas do mesocolo transverso. Divide-se em um ramo esquerdo e um direito, que se anastomosam com as artérias cólicas esquerda e direita para formar arcadas que irrigam o colo transverso.'),
          t('The middle colic artery runs from the SMA through the transverse mesocolon toward the transverse colon. Its branches form arcades with the right and left colic arteries. Other regional arteries include the ileocolic, appendicular, jejunal and ileal arteries and the straight arteries.',
            'A artéria cólica média segue da AMS pelo mesocolo transverso em direção ao colo transverso. Seus ramos formam arcadas com as artérias cólicas direita e esquerda. Outras artérias regionais incluem a ileocólica, a apendicular, as jejunais e ileais e as artérias retas.'),
        ],
      },
      {
        id: 'gbspleen-p52', ref: '52', title: t('The veins of the small intestine and the portal drainage', 'As veias do intestino delgado e a drenagem porta'),
        focus: ['smv', 'hepatic_portal_v', 'splenic_v', 'imv', 'gastric_v', 'ileocolic_a'], ghost: ['transverse_colon', 'ileum', 'jejunum', 'pancreas', 'sigmoid_a'], view: 'ant',
        body: [
          t('The jejunal and ileal veins anastomose to form venous arches, which are the anastomotic loops of the straight veins, the venae rectae. They drain into the superior mesenteric vein, which joins the splenic vein to form the hepatic portal vein. The inferior mesenteric vein joins the splenic vein as well.',
            'As veias jejunais e ileais se anastomosam para formar arcos venosos, que são as alças anastomóticas das veias retas, as venae rectae. Elas drenam para a veia mesentérica superior, que se une à veia esplênica para formar a veia porta hepática. A veia mesentérica inferior também se une à veia esplênica.'),
          t('Straight veins form anastomotic loops and drain through jejunal and ileal veins into the superior mesenteric vein. The ileocolic, right and middle colic, appendicular, pancreaticoduodenal and right gastro-omental veins also relate to this drainage. The splenic vein receives pancreatic, short gastric, left gastro-omental and inferior mesenteric veins; the latter receives left colic, sigmoid and superior rectal veins. The superior mesenteric and splenic veins unite to form the hepatic portal vein. Right and left gastric, esophageal and cystic veins also belong to the portal system.',
            'As veias retas formam alças anastomóticas e drenam pelas veias jejunais e ileais para a veia mesentérica superior. As veias ileocólica, cólicas direita e média, apendicular, pancreaticoduodenais e gastro-omental direita também se relacionam a essa drenagem. A veia esplênica recebe veias pancreáticas, gástricas curtas, gastro-omental esquerda e mesentérica inferior; esta recebe as veias cólica esquerda, sigmoides e retal superior. As veias mesentérica superior e esplênica unem-se para formar a veia porta hepática. As veias gástricas direita e esquerda, esofágicas e císticas também pertencem ao sistema porta.'),
        ],
      },
    ],
    questions: [
      { ref: '47', q: 'Which branch of the ileocolic artery anastomoses with the right colic artery?', correct: 'The superior colic branch', wrong: ['The inferior ileal branch', 'The appendicular artery', 'The caecal branches'], why: 'The superior colic branch anastomoses with the right colic artery; the inferior ileal branch anastomoses with the end of the SMA.',
        pt: { q: 'Qual ramo da artéria ileocólica se anastomosa com a artéria cólica direita?', correct: 'O ramo cólico superior', wrong: ['O ramo ileal inferior', 'A artéria apendicular', 'Os ramos cecais'], why: 'O ramo cólico superior se anastomosa com a cólica direita; o ramo ileal inferior se anastomosa com o final da AMS.' } },
      { ref: '47', q: 'What does the inferior ileal branch anastomose with?', correct: 'The final tract of the SMA (distal ileum, caecum and appendix)', wrong: ['The inferior mesenteric artery', 'The splenic artery', 'The superior rectal artery'], why: 'The inferior ileal branch anastomoses with the final tract of the SMA, which supplies the distal ileum, caecum and appendix.',
        pt: { q: 'Com o que se anastomosa o ramo ileal inferior?', correct: 'Com o trecho final da AMS (íleo distal, ceco e apêndice)', wrong: ['Com a artéria mesentérica inferior', 'Com a artéria esplênica', 'Com a artéria retal superior'], why: 'O ramo ileal inferior se anastomosa com o trecho final da AMS, que irriga o íleo distal, o ceco e o apêndice.' } },
      { ref: '48–49', q: 'Which structures does the inferior ileal branch give off?', correct: 'Caecal branches, the appendicular artery and an ileal branch', wrong: ['The superior rectal artery and the left colic artery', 'The gastroduodenal artery and the splenic artery', 'The right colic artery and the coeliac branches'], why: 'The inferior ileal branch gives caecal branches (anterior and posterior), the appendicular artery and an ileal branch.',
        pt: { q: 'Quais estruturas o ramo ileal inferior dá?', correct: 'Ramos cecais, a artéria apendicular e um ramo ileal', wrong: ['A artéria retal superior e a artéria cólica esquerda', 'A artéria gastroduodenal e a artéria esplênica', 'A artéria cólica direita e os ramos celíacos'], why: 'O ramo ileal inferior dá ramos cecais (anterior e posterior), a artéria apendicular e um ramo ileal.' } },
      { ref: '50', q: 'Which artery does the descending branch of the right colic artery anastomose with?', correct: 'The superior (colic) branch of the ileocolic artery', wrong: ['The left colic artery', 'The superior rectal artery', 'The inferior pancreaticoduodenal artery'], why: 'The descending branch anastomoses with the superior (colic) branch of the ileocolic artery.',
        pt: { q: 'Com qual artéria se anastomosa o ramo descendente da artéria cólica direita?', correct: 'Com o ramo cólico superior da artéria ileocólica', wrong: ['Com a artéria cólica esquerda', 'Com a artéria retal superior', 'Com a artéria pancreaticoduodenal inferior'], why: 'O ramo descendente se anastomosa com o ramo cólico superior da ileocólica.' } },
      { ref: '51', q: 'Where does the middle colic artery originate?', correct: 'Below the pancreas', wrong: ['Above the coeliac trunk', 'In the splenic hilum', 'In the iliac fossa'], why: 'The middle colic artery originates below the pancreas.',
        pt: { q: 'Onde nasce a artéria cólica média?', correct: 'Abaixo do pâncreas', wrong: ['Acima do tronco celíaco', 'No hilo esplênico', 'Na fossa ilíaca'], why: 'A artéria cólica média nasce abaixo do pâncreas.' } },
      { ref: '52', q: 'Into which vein do the jejunal and ileal veins drain?', correct: 'The superior mesenteric vein', wrong: ['The inferior mesenteric vein', 'The inferior vena cava', 'The splenic artery'], why: 'The jejunal and ileal veins anastomose to form venous arches, which drain into the superior mesenteric vein.',
        pt: { q: 'Em qual veia drenam as veias jejunais e ileais?', correct: 'Na veia mesentérica superior', wrong: ['Na veia mesentérica inferior', 'Na veia cava inferior', 'Na artéria esplênica'], why: 'As veias jejunais e ileais formam arcos venosos e drenam para a veia mesentérica superior.' } },
    ],
  },
];

blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
