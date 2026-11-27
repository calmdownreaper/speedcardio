// SpeedGastro · Aula 07 — Liver (Prof. Fiume deck 07_liver, p001–p045).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/liver.js?v=160';

export const unit = {
  id: 'liver',
  label: t('07 · Liver', '07 · Fígado'),
  visible: ['caudate_lobe', 'gallbladder', 'stomach', 'duodenum', 'pancreas', 'spleen', 'ascending_colon', 'transverse_colon',
    'diaphragm_g', 'ivc_g', 'hepatic_v', 'hepatic_portal_v', 'proper_hepatic_a', 'common_hepatic_a', 'common_hepatic_duct',
    'hepatic_ducts', 'cystic_duct', 'gastroduodenal_a', 'right_gastric_a', 'left_gastric_a', 'gastroepiploic_a', 'splenic_a',
    'pancreaticoduodenal_a', 'celiac_trunk', 'sma', 'smv', 'splenic_v', 'gastric_v', 'imv', 'esophagus', 'rectum',
    'descending_colon', 'abdominal_aorta_g'],
  ghost: ['stomach', 'duodenum', 'pancreas', 'spleen', 'transverse_colon', 'diaphragm_g', 'gallbladder', 'caudate_lobe', 'ivc_g'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'liver-1', title: t('General features, location and relations', 'Aspectos gerais, localização e relações'),
    cards: [
      {
        id: 'liver-p01', ref: '1–2', title: t('General features and location of the liver', 'Aspectos gerais e localização do fígado'),
        focus: ['caudate_lobe', 'gallbladder', 'stomach'], ghost: ['transverse_colon', 'diaphragm_g'], view: 'ant',
        body: [
          t('The liver is the largest visceral organ of the gastrointestinal system and the second largest organ of the body. Its weight is 1.4–1.8 kg in males and 1.2–1.4 kg in females, and it contains 0.8 litres of blood. The shape of the liver conforms to its surroundings, and it has two faces separated by the inferior border: an anterosuperior diaphragmatic face and a posteroinferior visceral face. (The whole liver is not in this 3D set. Use the Caudate lobe of liver and the Gallbladder as the landmarks for the liver region.)',
            'O fígado é a maior víscera do sistema gastrointestinal e o segundo maior órgão do corpo. Pesa 1,4–1,8 kg nos homens e 1,2–1,4 kg nas mulheres, e contém 0,8 litro de sangue. A forma do fígado se adapta ao seu entorno, e ele tem duas faces separadas pela borda inferior: uma face diafragmática anterossuperior e uma face visceral posteroinferior. (O fígado inteiro não está neste conjunto 3D. Use o Lobo caudado do fígado e a Vesícula biliar como referências para a região do fígado.)'),
          t('In the abdominal cavity, the liver lies in the supramesocolic space and reaches upward to the 5th rib, occupying the right hypochondriac region (right hypochondrium) and the epigastrium. In the regional topography of the abdomen, the neighbouring organs occupy specific regions: the Stomach spans the epigastric, left hypochondriac and umbilical regions; the Gallbladder and right colic flexure lie in the right hypochondriac region; the ascending colon occupies the right lumbar region; and the small intestine and rectum lie lower down.',
            'Na cavidade abdominal, o fígado situa-se no espaço supramesocólico e alcança superiormente a 5ª costela, ocupando o hipocôndrio direito (região hipocondríaca direita) e o epigástrio. Na topografia regional do abdome, os órgãos vizinhos ocupam regiões específicas: o Estômago estende-se pelas regiões epigástrica, hipocondríaca esquerda e umbilical; a Vesícula biliar e a flexura cólica direita ficam na região hipocondríaca direita; o colo ascendente ocupa a região lombar direita; e o intestino delgado e o reto ficam mais abaixo.'),
          t('Liver functions are not covered in this lesson; they belong to the physiology course («Funções: feitas na fisiologia»).',
            'As funções do fígado não são tratadas nesta aula; elas pertencem ao curso de fisiologia («Funções: feitas na fisiologia»).'),
          t('In the regional map, the left lumbar region holds the descending colon, and the hypogastric (pubic) region holds the sigmoid colon and the rectum.',
            'No mapa regional, a região lombar esquerda contém o colo descendente, e a região hipogástrica (púbica) contém o colo sigmoide e o reto.'),
        ],
      },
      {
        id: 'liver-p03', ref: '3', title: t('The diaphragmatic surface: relations to the lung and heart', 'A face diafragmática: relações com o pulmão e o coração'),
        focus: ['diaphragm_g', 'ivc_g', 'hepatic_portal_v'], ghost: ['stomach', 'gallbladder'], view: 'ant',
        body: [
          t('Relations: the diaphragmatic face of the liver lies directly beneath the diaphragm, and through the interposition of the diaphragm it relates to the base of the right lung and to the heart. Across this thoracoabdominal junction, the heart (right atrium and ventricles), the right and left lungs and the costodiaphragmatic recess sit above the diaphragm, while the liver, inferior vena cava, hepatic portal vein, stomach and esophagogastric junction lie below it.',
            'Relações: a face diafragmática do fígado fica logo abaixo do diafragma e, com a interposição do diafragma, relaciona-se com a base do pulmão direito e com o coração. Nessa transição toracoabdominal, o coração (átrio direito e ventrículos), os pulmões direito e esquerdo e o recesso costodiafragmático situam-se acima do diafragma, enquanto o fígado, a veia cava inferior, a veia porta hepática, o estômago e a junção esofagogástrica ficam abaixo dele.'),
          t('On the diaphragmatic surface itself, the liver is contacted directly by the diaphragm and, with the interposition of the diaphragm, by the heart superiorly and by the inferior lobe of the right lung and the right diaphragmatic recess on its right lateral aspect. In the 3D model, the Inferior vena cava and the Diaphragm are the posterior and upper neighbours of the liver, while the Stomach is a near neighbour on the left.',
            'Na própria face diafragmática, o fígado entra em contato direto com o diafragma e, com interposição do diafragma, com o coração superiormente e com o lobo inferior do pulmão direito e o recesso diafragmático direito em sua face lateral direita. No modelo 3D, a Veia cava inferior e o Diafragma são os vizinhos posteriores e superiores do fígado, enquanto o Estômago é um vizinho próximo à esquerda.'),
          t('The thoracic relations figure also labels the anterior scalene, the brachiocephalic trunk, the lateral cord of the brachial plexus, the clavicle and subclavius, the axillary artery, the deltoid and the pectoralis major.',
            'A figura das relações torácicas também identifica o músculo escaleno anterior, o tronco braquiocefálico, o fascículo lateral do plexo braquial, a clavícula e o músculo subclávio, a artéria axilar e os músculos deltoide e peitoral maior.'),
        ],
      },
      {
        id: 'liver-p04', ref: '4', title: t('The visceral surface: organs and impressions', 'A face visceral: órgãos e impressões'),
        focus: ['stomach', 'duodenum', 'ascending_colon'], ghost: ['pancreas', 'spleen', 'transverse_colon', 'gallbladder'], view: 'post',
        body: [
          t('The visceral face lies against the ascending colon and the right colic flexure, the stomach, the duodenum, the right kidney and the suprarenal gland. Each contact leaves a depression on the liver called an impression: the colic, duodenal, renal, suprarenal and gastric impressions.',
            'A face visceral se apoia no colo ascendente e na flexura cólica direita, no estômago, no duodeno, no rim direito e na glândula suprarrenal. Cada contato deixa no fígado uma depressão chamada impressão: as impressões cólica, duodenal, renal, suprarrenal e gástrica.'),
          t('In the posterior trunk topography, the liver occupies the right upper quadrant alongside the right kidney and suprarenal gland and the ascending colon, while the pancreas, the left kidney and suprarenal gland, and the spleen lie further to the left; those five contacts produce the impressions across the visceral surface. In the 3D model, turn the view to the back: the Duodenum and the Stomach press on the visceral face of the liver, and the ascending colon sits beside it on the right.',
            'Na topografia posterior do tronco, o fígado ocupa o quadrante superior direito ao lado do rim direito, da glândula suprarrenal direita e do colo ascendente, enquanto o pâncreas, o rim esquerdo, a glândula suprarrenal esquerda e o baço ficam mais à esquerda; esses cinco contatos formam as impressões na face visceral. No modelo 3D, gire a vista para trás: o Duodeno e o Estômago pressionam a face visceral do fígado, e o colo ascendente fica ao lado dele, à direita.'),
        ],
      },
    ],
    questions: [
      { ref: '1', q: 'Which place does the liver hold in the body?', correct: 'The second largest organ of the body', wrong: ['The largest organ of the body', 'The third largest organ', 'The smallest visceral organ'], why: 'Largest visceral organ of the GI system and second largest organ of the body.',
        pt: { q: 'Que posição o fígado ocupa no corpo?', correct: 'O segundo maior órgão do corpo', wrong: ['O maior órgão do corpo', 'O terceiro maior órgão', 'A menor víscera'], why: 'Maior víscera do sistema GI e segundo maior órgão do corpo.' } },
      { ref: '1', q: 'How much blood does the liver contain?', correct: '0.8 litres', wrong: ['0.08 litres', '8 litres', '1.8 litres'], why: 'The liver weighs 1.4–1.8 kg in males (1.2–1.4 kg in females) and contains 0.8 l of blood.',
        pt: { q: 'Quanto sangue o fígado contém?', correct: '0,8 litro', wrong: ['0,08 litro', '8 litros', '1,8 litro'], why: 'O fígado pesa 1,4–1,8 kg nos homens (1,2–1,4 kg nas mulheres) e contém 0,8 l de sangue.' } },
      { ref: '3', q: 'Through the diaphragm, which structures are related to the diaphragmatic face of the liver?', correct: 'The base of the right lung and the heart', wrong: ['The left kidney and spleen', 'The duodenum and pancreas', 'The transverse colon and gallbladder'], why: 'Diaphragmatic face, through the diaphragm, base of right lung and heart.',
        pt: { q: 'Através do diafragma, quais estruturas se relacionam com a face diafragmática do fígado?', correct: 'A base do pulmão direito e o coração', wrong: ['O rim esquerdo e o baço', 'O duodeno e o pâncreas', 'O colo transverso e a vesícula'], why: 'Face diafragmática, através do diafragma, base do pulmão direito e coração.' } },
      { ref: '4', q: 'What is an impression on the visceral face of the liver?', correct: 'A depression left by contact with a neighbouring organ', wrong: ['A ligament joining the liver to the wall', 'A duct carrying bile', 'A vein leaving the liver'], why: 'The visceral face has colic, duodenal, renal, suprarenal and gastric impressions from its neighbours.',
        pt: { q: 'O que é uma impressão na face visceral do fígado?', correct: 'Uma depressão deixada pelo contato com um órgão vizinho', wrong: ['Um ligamento que une o fígado à parede', 'Um ducto que leva bile', 'Uma veia que sai do fígado'], why: 'A face visceral tem impressões cólica, duodenal, renal, suprarrenal e gástrica causadas pelos vizinhos.' } },
      { ref: '4', q: 'Which organ forms a gastric impression on the visceral face of the liver?', correct: 'Stomach', wrong: ['Right kidney', 'Suprarenal gland', 'Spleen'], why: 'The visceral face is related to the stomach, duodenum, ascending colon, right kidney and suprarenal gland, producing the gastric impression among others.',
        pt: { q: 'Qual órgão forma a impressão gástrica na face visceral do fígado?', correct: 'Estômago', wrong: ['Rim direito', 'Glândula suprarrenal', 'Baço'], why: 'A face visceral se relaciona com estômago, duodeno, colo ascendente, rim direito e glândula suprarrenal, formando entre outras a impressão gástrica.' } },
    ],
  },
  {
    id: 'liver-2', title: t('External conformation and the lobes', 'Conformação externa e os lobos'),
    cards: [
      {
        id: 'liver-p05', ref: '5', title: t('The anterior and visceral external features', 'As características externas anteriores e viscerais'),
        focus: ['caudate_lobe', 'gallbladder', 'ivc_g', 'hepatic_v', 'hepatic_portal_v', 'common_hepatic_duct', 'cystic_duct', 'proper_hepatic_a'], ghost: ['diaphragm_g', 'stomach', 'duodenum'], view: 'ant',
        body: [
          t('On the anterior diaphragmatic surface beneath the diaphragm, the falciform ligament separates the right and left lobes and holds the round ligament (ligamentum teres, the obliterated left umbilical vein) in its free border. Superiorly, the coronary ligament and the right and left triangular ligaments attach the liver, while the fibrous appendix extends from the left lobe, costal impressions mark the right lobe, and the fundus of the gallbladder projects below.',
            'Na face diafragmática anterior, sob o diafragma, o ligamento falciforme separa os lobos direito e esquerdo e abriga o ligamento redondo (ligamentum teres, a veia umbilical esquerda obliterada) em sua borda livre. Superiormente, o ligamento coronário e os ligamentos triangulares direito e esquerdo fixam o fígado, enquanto o apêndice fibroso se estende do lobo esquerdo, impressões costais marcam o lobo direito e o fundo da vesícula biliar projeta-se abaixo.'),
          t('On the posteroinferior visceral surface, the porta hepatis forms the central hilum carrying the hepatic portal vein, the hepatic artery proper, and the common hepatic, cystic and (common) bile ducts. To its left, the fissures for the ligamentum teres and ligamentum venosum separate the left lobe from the quadrate lobe anteriorly and the caudate lobe (with its caudate process) posteriorly, while the bare area (bordered by the hepatorenal portion of the coronary ligament), inferior vena cava, hepatic veins and the oesophageal, gastric, duodenal, colic, renal and suprarenal impressions occupy the surrounding surface. In the 3D model, the Caudate lobe of liver, the Gallbladder and the Inferior vena cava are the three main landmarks on the visceral surface.',
            'Na face visceral posteroinferior, o hilo do fígado (porta hepatis) forma a entrada central que leva a veia porta hepática, a artéria hepática própria e os ductos hepático comum, cístico e colédoco. À esquerda, as fissuras do ligamento redondo e do ligamento venoso separam o lobo esquerdo do lobo quadrado anteriormente e do lobo caudado (com seu processo caudado) posteriormente, enquanto a área nua (delimitada pela porção hepatorrenal do ligamento coronário), a veia cava inferior, as veias hepáticas e as impressões esofágica, gástrica, duodenal, cólica, renal e suprarrenal ocupam a superfície ao redor. No modelo 3D, o Lobo caudado do fígado, a Vesícula biliar e a Veia cava inferior são os três principais pontos de referência nessa face visceral.'),
        ],
      },
      {
        id: 'liver-p06', ref: '6', title: t('The round and venous ligaments: obliterated fetal vessels', 'Os ligamentos redondo e venoso: vasos fetais obliterados'),
        focus: ['hepatic_portal_v', 'ivc_g', 'caudate_lobe'], ghost: ['gallbladder'], view: 'ant',
        body: [
          t('Two ligaments are remnants of fetal vessels. The round ligament is the obliteration of the umbilical vein. The venous ligament (ligamentum venosum of Arantius) is the obliteration of the ductus venosus. The ductus venosus forms from the anastomosis of the vitelline veins, and the venous duct of Arantius goes on to form the suprahepatic veins. The umbilical veins, which carry oxygenated blood, also join the duct of Arantius, so it carries mixed blood towards the vena cava. It has no use after birth.',
            'Dois ligamentos são restos de vasos fetais. O ligamento redondo é a obliteração da veia umbilical. O ligamento venoso (ligamentum venosum de Arantius) é a obliteração do ducto venoso. O ducto venoso se forma a partir da anastomose das veias vitelinas, e o ducto venoso de Arantius segue e forma as veias supra-hepáticas. As veias umbilicais, que levam sangue oxigenado, também se unem ao ducto de Arantius, então ele leva sangue misto à veia cava. Não tem utilidade depois do nascimento.'),
          t('Comparing prenatal and postnatal circulation: in the prenatal circulation, umbilical blood flows alongside the Hepatic portal vein through the ductus venosus toward the Inferior vena cava, whereas in the postnatal circulation those fetal channels are closed. In the 3D model, the fissure for the ligamentum venosum lies between the Caudate lobe of liver and the left part of the organ, and the Inferior vena cava runs behind it.',
            'Comparando as circulações pré e pós-natal: na circulação pré-natal, o fluxo umbilical segue ao lado da Veia porta hepática pelo ducto venoso em direção à Veia cava inferior, ao passo que na circulação pós-natal esses canais fetais se fecham. No modelo 3D, a fissura do ligamento venoso fica entre o Lobo caudado do fígado e a parte esquerda do órgão, e a Veia cava inferior corre atrás dela.'),
        ],
      },
      {
        id: 'liver-p07', ref: '7', title: t('The four structural lobes', 'Os quatro lobos estruturais'),
        focus: ['caudate_lobe', 'gallbladder', 'ivc_g', 'hepatic_v', 'hepatic_portal_v'], ghost: ['diaphragm_g', 'stomach'], view: 'ant',
        body: [
          t('The structural lobes of the liver are named in order. The Left lobe is the first. The Right lobe is the second and the biggest, and it carries the porta hepatis. The Quadrate lobe is third: it lies between the round ligament and the gallbladder, anterior to the porta hepatis. The Caudate lobe is fourth: it lies between the ligamentum venosum and the inferior vena cava, posterior to the porta hepatis.',
            'Os lobos estruturais do fígado são nomeados em ordem. O lobo esquerdo é o primeiro. O lobo direito é o segundo e o maior, e leva o hilo do fígado. O lobo quadrado é o terceiro: fica entre o ligamento redondo e a vesícula biliar, anterior ao hilo. O lobo caudado é o quarto: fica entre o ligamento venoso e a veia cava inferior, posterior ao hilo.'),
          t('Anteriorly, the right and left lobes are divided by the falciform ligament; on the visceral surface, the caudate and quadrate lobes flank the porta hepatis, alongside the caudate process and papillary process of the caudate lobe, while the hepatic veins drain posteriorly and the hepatic artery proper and hepatic portal vein enter at the porta hepatis. In the 3D model, find the Caudate lobe of liver behind the porta hepatis and the Gallbladder beside the quadrate lobe in front.',
            'Anteriormente, os lobos direito e esquerdo são separados pelo ligamento falciforme; na face visceral, os lobos caudado e quadrado flanqueiam o hilo hepático, junto ao processo caudado e ao processo papilar do lobo caudado, enquanto as veias hepáticas drenam posteriormente e a artéria hepática própria e a veia porta hepática entram no hilo. No modelo 3D, encontre o Lobo caudado do fígado atrás do hilo e a Vesícula biliar ao lado do lobo quadrado, na frente.'),
        ],
      },
      {
        id: 'liver-p08', ref: '8', title: t('Variations in the form of the liver', 'Variações na forma do fígado'),
        focus: ['caudate_lobe', 'gallbladder', 'stomach', 'duodenum'], ghost: ['diaphragm_g'], view: 'ant',
        body: [
          t('Several anatomical variations in the form of the liver occur: a very small left lobe with deep costal impressions; complete atrophy of the left lobe, caused by compression of the left portal vein; a transverse, «saddle-like» liver with a relatively large left lobe; a «tongue-like» process of the right lobe; a very deep renal impression with a «corset constriction»; and diaphragmatic grooves.',
            'Ocorrem diversas variações anatômicas na forma do fígado: um lobo esquerdo muito pequeno, com impressões costais profundas; atrofia completa do lobo esquerdo, causada pela compressão da veia porta esquerda; um fígado transverso, «em forma de sela», com lobo esquerdo relativamente grande; um processo «em forma de língua» do lobo direito; uma impressão renal muito profunda com «constrição de espartilho»; e sulcos diafragmáticos.'),
          t('No further explanation is given for these morphological variants. In the 3D model, the Gallbladder and the Caudate lobe are the references, and the Duodenum and the Stomach are the neighbours that the impressions of the visceral face correspond to. The whole liver is not in this 3D set.',
            'Nenhuma explicação adicional é dada para essas variantes morfológicas. No modelo 3D, a Vesícula biliar e o Lobo caudado servem de referência, e o Duodeno e o Estômago são os vizinhos a que correspondem as impressões da face visceral. O fígado inteiro não está neste conjunto 3D.'),
        ],
      },
    ],
    questions: [
      { ref: '5', q: 'What is the ligamentum teres of the liver?', correct: 'The obliterated left umbilical vein', wrong: ['The obliterated ductus venosus', 'The lesser omentum', 'The fibrous appendix'], why: 'The round ligament (ligamentum teres) is the obliterated left umbilical vein.',
        pt: { q: 'O que é o ligamento redondo (ligamentum teres) do fígado?', correct: 'A veia umbilical esquerda obliterada', wrong: ['O ducto venoso obliterado', 'O omento menor', 'O apêndice fibroso'], why: 'O ligamento redondo (ligamentum teres) é a veia umbilical esquerda obliterada.' } },
      { ref: '6', q: 'What is the ligamentum venosum (of Arantius) the remnant of?', correct: 'The ductus venosus', wrong: ['The umbilical vein', 'The vitelline vein', 'The hepatic artery'], why: 'The venous ligament (of Arantius) is the obliteration of the ductus venosus.',
        pt: { q: 'De que é remanescente o ligamento venoso (de Arantius)?', correct: 'Do ducto venoso', wrong: ['Da veia umbilical', 'Da veia vitelina', 'Da artéria hepática'], why: 'O ligamento venoso (de Arantius) é a obliteração do ducto venoso.' } },
      { ref: '7', q: 'Which structural lobe lies between the round ligament and the gallbladder?', correct: 'Quadrate lobe', wrong: ['Caudate lobe', 'Right lobe', 'Left lobe'], why: 'The quadrate lobe lies between the round ligament and the gallbladder, anterior to the porta hepatis.',
        pt: { q: 'Qual lobo estrutural fica entre o ligamento redondo e a vesícula biliar?', correct: 'Lobo quadrado', wrong: ['Lobo caudado', 'Lobo direito', 'Lobo esquerdo'], why: 'O lobo quadrado fica entre o ligamento redondo e a vesícula biliar, anterior ao hilo.' } },
      { ref: '7', q: 'Which lobe is the largest and carries the porta hepatis?', correct: 'Right lobe', wrong: ['Left lobe', 'Quadrate lobe', 'Caudate lobe'], why: 'The right lobe is the biggest and carries the porta hepatis.',
        pt: { q: 'Qual lobo é o maior e leva o hilo do fígado?', correct: 'Lobo direito', wrong: ['Lobo esquerdo', 'Lobo quadrado', 'Lobo caudado'], why: 'O lobo direito é o maior e leva o hilo do fígado.' } },
      { ref: '8', q: 'Which variation is linked to compression of the left portal vein?', correct: 'Complete atrophy of the left lobe', wrong: ['Very small left lobe with deep costal impressions', 'Tongue-like process of the right lobe', 'Diaphragmatic grooves'], why: 'Complete atrophy of the left lobe, left portal vein compression.',
        pt: { q: 'Qual variação está ligada à compressão da veia porta esquerda?', correct: 'Atrofia completa do lobo esquerdo', wrong: ['Lobo esquerdo muito pequeno com impressões costais profundas', 'Processo em forma de língua do lobo direito', 'Sulcos diafragmáticos'], why: 'Atrofia completa do lobo esquerdo, compressão da veia porta esquerda.' } },
    ],
  },
  {
    id: 'liver-3', title: t('Falciform, coronary and triangular ligaments; the lesser omentum', 'Ligamentos falciforme, coronário e triangulares; omento menor'),
    cards: [
      {
        id: 'liver-p09', ref: '9–11', title: t('The falciform ligament and the fetal origin of the round ligament', 'O ligamento falciforme e a origem fetal do ligamento redondo'),
        focus: ['caudate_lobe', 'gallbladder', 'stomach', 'diaphragm_g'], ghost: ['spleen', 'pancreas'], view: 'ant',
        body: [
          t('On the anterior surface beneath the diaphragm, a ventral mesentery, the falciform ligament, binds the liver to the anterior abdominal wall and marks the division of the liver into a left lobe and a right lobe. A thickening of its inferior margin forms the round (teres) ligament, the fibrous residue of the degenerated fetal umbilical vein—which embryologically connected the hepatic bud to the anterior wall (opposite the stomach, splenic bud, pancreatic bud, left kidney and retroperitoneal space) and in the fetal circulation joined the ductus venosus and inferior vena cava.',
            'Na face anterior, sob o diafragma, um mesentério ventral, o ligamento falciforme, prende o fígado à parede abdominal anterior e marca a divisão do fígado em lobo esquerdo e lobo direito. Um espessamento de sua margem inferior forma o ligamento redondo (teres), resíduo fibroso da veia umbilical fetal degenerada — que embriologicamente ligava o broto hepático à parede anterior (em frente ao estômago, broto esplênico, broto pancreático, rim esquerdo e espaço retroperitoneal) e, na circulação fetal, unia-se ao ducto venoso e à veia cava inferior.'),
          t('Peritoneal development repeats around the rotation of the foregut and its dorsal and ventral mesogastria: the liver lies in the ventral mesogastrium and the spleen in the dorsal one. The falciform ligament has two borders: the anterior border is attached to the anterior abdominal wall, and the posterior border hangs free down to the umbilicus.',
            'O desenvolvimento do peritônio se organiza em torno da rotação do intestino anterior e de seus mesogástrios dorsal e ventral: o fígado fica no mesogástrio ventral e o baço no dorsal. O ligamento falciforme tem duas bordas: a borda anterior é presa à parede abdominal anterior, e a borda posterior fica livre, descendo até o umbigo.'),
          t('In the prenatal circulation figure the foramen ovale is open, letting oxygenated blood pass from the right to the left atrium.',
            'Na figura da circulação pré-natal, o forame oval está aberto, permitindo que o sangue oxigenado passe do átrio direito para o esquerdo.'),
        ],
      },
      {
        id: 'liver-p12', ref: '12–14', title: t('The coronary and triangular ligaments: the real suspensory ligaments', 'Os ligamentos coronário e triangulares: os verdadeiros ligamentos suspensórios'),
        focus: ['diaphragm_g', 'ivc_g', 'caudate_lobe', 'stomach'], ghost: ['gallbladder'], view: 'ant',
        body: [
          t('Five named ligaments are listed: falciform, round, coronary, triangular and lesser omentum. The liver is suspended from the inferior surface of the diaphragm by the coronary ligaments. They are reflections of the peritoneum from the diaphragm onto the superior and posterior surfaces of the liver. There is an anterosuperior ligament, where the left and right parts unite in the falciform ligament, which continues into the posteroinferior ligament (left and right). They are called the real suspensory ligaments.',
            'São listados os cinco ligamentos nomeados: falciforme, redondo, coronário, triangular e omento menor. O fígado é suspenso da face inferior do diafragma pelos ligamentos coronários. Eles são reflexões do peritônio do diafragma para as faces superior e posterior do fígado. Há um ligamento anterossuperior, onde as partes esquerda e direita se unem no ligamento falciforme, que continua no ligamento posteroinferior (esquerdo e direito). Eles são chamados de verdadeiros ligamentos suspensórios.'),
          t('On each side, the coronary ligaments extend laterally into the left and right triangular ligaments. On the visceral surface, the coronary and triangular ligaments frame the bare area around the inferior vena cava and hepatic veins, with the caudate process and porta hepatis below. In the 3D model, follow the coronary ligament from the Diaphragm to the Caudate lobe of liver and the Inferior vena cava.',
            'De cada lado, os ligamentos coronários se estendem lateralmente até os ligamentos triangulares esquerdo e direito. Na face visceral, os ligamentos coronário e triangulares delimitam a área nua em torno da veia cava inferior e das veias hepáticas, com o processo caudado e o hilo do fígado abaixo. No modelo 3D, siga o ligamento coronário do Diafragma até o Lobo caudado do fígado e a Veia cava inferior.'),
        ],
      },
      {
        id: 'liver-p15', ref: '15', title: t('The bare area, and what runs in the hepatoduodenal ligament', 'A área nua e o que corre no ligamento hepatoduodenal'),
        focus: ['hepatic_v', 'ivc_g', 'diaphragm_g', 'duodenum', 'hepatic_portal_v', 'common_hepatic_duct'], ghost: ['stomach', 'spleen', 'pancreas'], view: 'ant',
        body: [
          t('The bare area is firmly attached to the inferior surface of the diaphragm by the peritoneal reflections (the coronary ligaments). That fixes the liver in place, so it is immobile even though it is intraperitoneal. The hepatic veins, usually three in number, leave the liver in the bare area and so are outside the peritoneal covering. This differs from all other intraperitoneal veins.',
            'A área nua é firmemente presa à face inferior do diafragma pelas reflexões peritoneais (os ligamentos coronários). Isso fixa o fígado no lugar, então ele é imóvel, mesmo sendo intraperitoneal. As veias hepáticas, em geral três, deixam o fígado na área nua e por isso ficam fora do revestimento peritoneal. Isso difere de todas as outras veias intraperitoneais.'),
          t('Only the afferent vessels (the artery and the portal vein) and the common bile duct run in the hepatoduodenal ligament; the efferent veins do not. On the posterior diaphragmatic surface of the liver, the bare area is bordered by the coronary and triangular ligaments, while the matching hepatic surface of the diaphragm opposite it is devoid of parietal peritoneum beside the inferior vena cava, abdominal aorta, hepatoduodenal ligament, right kidney and suprarenal gland, duodenum, pancreas, stomach and spleen. In the 3D model, the Hepatic portal vein and the Common hepatic duct are the afferent structures, while the Hepatic veins leave from the bare area toward the Inferior vena cava.',
            'Só os vasos aferentes (a artéria e a veia porta) e o colédoco passam no ligamento hepatoduodenal; as veias eferentes não. Na face diafragmática posterior do fígado, a área nua é delimitada pelos ligamentos coronário e triangulares, enquanto a superfície hepática correspondente do diafragma, em frente a ela, é desprovida de peritônio parietal ao lado da veia cava inferior, aorta abdominal, ligamento hepatoduodenal, rim direito e glândula suprarrenal, duodeno, pâncreas, estômago e baço. No modelo 3D, a Veia porta hepática e o Ducto hepático comum são as estruturas aferentes, enquanto as Veias hepáticas saem pela área nua em direção à Veia cava inferior.'),
        ],
      },
      {
        id: 'liver-p16', ref: '16–17', title: t('The lesser omentum and the window into the hepatoduodenal ligament', 'O omento menor e a janela no ligamento hepatoduodenal'),
        focus: ['hepatic_portal_v', 'proper_hepatic_a', 'common_hepatic_duct', 'caudate_lobe', 'stomach', 'duodenum'], ghost: ['gallbladder', 'spleen', 'diaphragm_g'], view: 'ant',
        body: [
          t('At its upper end, the left layer of the lesser omentum continues with the posterior layer of the left triangular ligament, and the right layer continues with the coronary ligament as it encloses the inferior vena cava. The lesser omentum divides into the hepatogastric and hepatoduodenal ligaments, with the omental (epiploic) foramen of Winslow behind it—an adult arrangement that arises from the primitive abdomen through rotation of the liver, stomach and spleen.',
            'Na extremidade superior do omento menor, a camada esquerda continua com a camada posterior do ligamento triangular esquerdo, e a camada direita continua com o ligamento coronário ao envolver a veia cava inferior. O omento menor divide-se nos ligamentos hepatogástrico e hepatoduodenal, com o forame omental (epiploico) de Winslow atrás dele — disposição adulta resultante da rotação de fígado, estômago e baço a partir do abdome primitivo.'),
          t('Inside the hepatoduodenal ligament lies the portal triad: the hepatic portal vein is posterior, the hepatic artery proper is anterior and medial, and the common hepatic duct (or common bile duct) is anterior and lateral. The caudate lobe lies behind the hepatogastric ligament, and the omental (epiploic) foramen of Winslow opens behind the free edge between the liver, duodenum, retroperitoneal kidney, stomach and spleen. In the 3D model, the Caudate lobe of liver is visible behind the lesser omentum.',
            'Dentro do ligamento hepatoduodenal corre a tríade portal: a veia porta hepática fica posterior, a artéria hepática própria fica anterior e medial, e o ducto hepático comum (ou colédoco) fica anterior e lateral. O lobo caudado fica atrás do ligamento hepatogástrico, e o forame omental (epiploico) de Winslow se abre atrás da borda livre, entre fígado, duodeno, rim retroperitoneal, estômago e baço. No modelo 3D, o Lobo caudado do fígado é visível atrás do omento menor.'),
        ],
      },
      {
        id: 'liver-p18', ref: '18', title: t('Review of the omental bursa', 'Revisão da bolsa omental'),
        focus: ['stomach', 'pancreas', 'transverse_colon', 'duodenum', 'spleen'], ghost: ['caudate_lobe', 'gallbladder'], view: 'ant',
        body: [
          t('Reviewing the omental bursa: the parietal and visceral peritoneum, omental bursa and greater omentum, and the insertion of the transverse mesocolon and small-bowel mesentery together establish the partitioning of the peritoneal cavity. In the sagittal plane, the omental bursa lies behind the liver, lesser omentum and stomach (with a superior recess behind the liver and an inferior recess extending into the greater omentum anterior to the transverse colon), above the pancreas and the inferior part of the duodenum, while the sigmoid mesocolon root, rectum and urinary bladder lie lower down.',
            'Revisando a bolsa omental: o peritônio parietal e o visceral, a bolsa omental e o omento maior, e a inserção do mesocolo transverso e do mesentério do intestino delgado estabelecem a septação da cavidade peritoneal. No plano sagital, a bolsa omental fica atrás do fígado, do omento menor e do estômago (com um recesso superior atrás do fígado e um recesso inferior estendendo-se pelo omento maior adiante do colo transverso), acima do pâncreas e da parte inferior do duodeno, enquanto a raiz do mesocolo sigmoide, o reto e a bexiga urinária ficam mais abaixo.'),
          t('Developmentally, gut rotation around the splenic, pancreatic and hepatic buds forms the lesser omentum (hepatogastric ligament), the falciform ligament, and the splenorenal and gastrosplenic ligaments (parts of the greater omentum), separating them from the retroperitoneal space. In the 3D model, use the Stomach, the Pancreas and the Transverse colon as the landmarks around the omental bursa.',
            'No desenvolvimento, a rotação intestinal em torno dos brotos esplênico, pancreático e hepático forma o omento menor (ligamento hepatogástrico), o ligamento falciforme e os ligamentos esplenorrenal e gastroesplênico (partes do omento maior), separando-os do espaço retroperitoneal. No modelo 3D, use o Estômago, o Pâncreas e o Colo transverso como referências em volta da bolsa omental.'),
        ],
      },
    ],
    questions: [
      { ref: '9', q: 'What does the falciform ligament mark on the liver?', correct: 'The division into a left and a right lobe', wrong: ['The porta hepatis', 'The bare area', 'The caudate process'], why: 'The falciform ligament, a ventral mesentery, marks the division of the liver into a left and right lobe.',
        pt: { q: 'O que o ligamento falciforme marca no fígado?', correct: 'A divisão em lobo esquerdo e lobo direito', wrong: ['O hilo do fígado', 'A área nua', 'O processo caudado'], why: 'O ligamento falciforme, um mesentério ventral, marca a divisão do fígado em lobo esquerdo e direito.' } },
      { ref: '12', q: 'Which ligaments suspend the liver from the underside of the diaphragm?', correct: 'The coronary ligaments', wrong: ['The falciform ligaments', 'The round ligaments', 'The hepatoduodenal ligaments'], why: 'The liver is suspended from the inferior surface of the diaphragm by the coronary ligaments (the real suspensory ligaments).',
        pt: { q: 'Quais ligamentos suspendem o fígado da face inferior do diafragma?', correct: 'Os ligamentos coronários', wrong: ['Os ligamentos falciformes', 'Os ligamentos redondos', 'Os ligamentos hepatoduodenais'], why: 'O fígado é suspenso da face inferior do diafragma pelos ligamentos coronários (os verdadeiros ligamentos suspensórios).' } },
      { ref: '15', q: 'Why is the liver immobile even though it is intraperitoneal?', correct: 'The bare area is firmly attached to the diaphragm by the coronary ligaments', wrong: ['It has no peritoneal covering at all', 'It is held by the falciform ligament alone', 'It is suspended from the spleen'], why: 'The bare area is firmly attached to the inferior surface of the diaphragm by peritoneal reflections (coronary ligaments), rendering the liver immobile.',
        pt: { q: 'Por que o fígado é imóvel mesmo sendo intraperitoneal?', correct: 'A área nua é firmemente presa ao diafragma pelos ligamentos coronários', wrong: ['Não tem revestimento peritoneal', 'É mantido apenas pelo ligamento falciforme', 'É suspenso do baço'], why: 'A área nua é firmemente presa à face inferior do diafragma por reflexões peritoneais (ligamentos coronários), tornando o fígado imóvel.' } },
      { ref: '15', q: 'Which vessels leave the liver through the bare area rather than the hepatoduodenal ligament?', correct: 'The hepatic veins', wrong: ['The hepatic artery', 'The portal vein', 'The common bile duct'], why: 'The hepatic veins leave the liver in the bare area; only the afferent artery, portal vein and common bile duct run in the hepatoduodenal ligament.',
        pt: { q: 'Quais vasos deixam o fígado pela área nua, e não pelo ligamento hepatoduodenal?', correct: 'As veias hepáticas', wrong: ['A artéria hepática', 'A veia porta', 'O colédoco'], why: 'As veias hepáticas deixam o fígado pela área nua; só a artéria aferente, a veia porta e o colédoco passam no ligamento hepatoduodenal.' } },
      { ref: '16', q: 'Where is the portal vein located within the hepatoduodenal ligament?', correct: 'Posterior', wrong: ['Anterior and lateral', 'Anterior and medial', 'Superior to the bile duct'], why: 'Portal vein posterior; hepatic artery anterior and medial; common hepatic duct anterior and lateral.',
        pt: { q: 'Onde fica a veia porta dentro do ligamento hepatoduodenal?', correct: 'Posterior', wrong: ['Anterior e lateral', 'Anterior e medial', 'Superior ao ducto biliar'], why: 'Veia porta posterior; artéria hepática anterior e medial; ducto hepático comum anterior e lateral.' } },
    ],
  },
  {
    id: 'liver-4', title: t('Hepatic arteries, the portal vein and the portocaval anastomoses', 'Artérias hepáticas, veia porta e anastomoses portocavas'),
    cards: [
      {
        id: 'liver-p19', ref: '19', title: t('The two blood supplies of the liver', 'As duas irrigações sanguíneas do fígado'),
        focus: ['proper_hepatic_a', 'hepatic_portal_v'], ghost: ['ivc_g', 'caudate_lobe', 'gallbladder'], view: 'ant',
        body: [
          t('Vascularisation of the liver: it receives two blood supplies entering at the porta hepatis, situated between the caudate, quadrate, right and left lobes. The proper hepatic artery supplies 20% of the total blood, rich in oxygen, from the systemic circulation. The portal vein supplies 80% of the total, poor in oxygen, but rich in nutrients, from the digestive system. Alongside these two entrances at the porta hepatis lie the right and left hepatic branches and ducts, the gallbladder with its cystic duct and cystic artery, and the bile duct.',
            'Vascularização do fígado: ele recebe duas irrigações sanguíneas que entram no hilo do fígado, situado entre os lobos caudado, quadrado, direito e esquerdo. A artéria hepática própria fornece 20% do total, rica em oxigênio, vinda da circulação sistêmica. A veia porta fornece 80% do total, pobre em oxigênio mas rica em nutrientes, vinda do sistema digestório. Ao lado dessas duas entradas no hilo situam-se os ramos e ductos hepáticos direito e esquerdo, a vesícula biliar com seu ducto e artéria císticos e o colédoco.'),
          t('In the 3D model, the Proper hepatic artery and the Hepatic portal vein are the two entries that carry the 20% and 80%. The two blood sources are set side by side: one from the systemic circulation, one from the digestive tract.',
            'No modelo 3D, a Artéria hepática própria e a Veia porta hepática são as duas entradas que levam os 20% e os 80%. As duas fontes de sangue ficam lado a lado: uma da circulação sistêmica e outra do trato digestivo.'),
        ],
      },
      {
        id: 'liver-p20', ref: '20', title: t('The proper hepatic artery and the cystohepatic triangle', 'A artéria hepática própria e o triângulo cisto-hepático'),
        focus: ['proper_hepatic_a', 'common_hepatic_a', 'gastroduodenal_a', 'right_gastric_a', 'left_gastric_a', 'celiac_trunk', 'gallbladder', 'cystic_duct', 'common_hepatic_duct', 'pancreaticoduodenal_a', 'gastroepiploic_a', 'splenic_a', 'sma'], ghost: ['stomach', 'duodenum', 'pancreas', 'diaphragm_g'], view: 'ant',
        body: [
          t('From its origin, the celiac trunk divides into the left gastric, splenic and common hepatic arteries; the common hepatic artery gives off the gastroduodenal and right gastric arteries before continuing as the hepatic artery proper toward the liver (while pancreaticoduodenal and gastro-omental branches supply the stomach, duodenum and pancreas). Within the free margin of the lesser omentum (the hepatoduodenal ligament), the proper hepatic artery ascends anterior to the portal vein and medial to the bile duct.',
            'Em sua origem, o tronco celíaco divide-se nas artérias gástrica esquerda, esplênica e hepática comum; a artéria hepática comum emite as artérias gastroduodenal e gástrica direita antes de continuar como artéria hepática própria rumo ao fígado (enquanto ramos pancreaticoduodenais e gastromentais irrigam estômago, duodeno e pâncreas). Na margem livre do omento menor (o ligamento hepatoduodenal), a artéria hepática própria sobe anterior à veia porta e medial ao ducto biliar.'),
          t('Distally, the proper hepatic artery divides into its right and left hepatic branches serving segments I–VIII, and the cystic artery arises from the right hepatic artery within the cystohepatic triangle (of Calot). In the 3D model, the Gallbladder sits beside the Cystic duct and the Common hepatic duct, and the cystic artery arises from the right hepatic artery.',
            'Distalmente, a artéria hepática própria divide-se nos ramos hepáticos direito e esquerdo para os segmentos I–VIII, e a artéria cística nasce da artéria hepática direita dentro do triângulo cisto-hepático (de Calot). No modelo 3D, a Vesícula biliar fica ao lado do Ducto cístico e do Ducto hepático comum, e a artéria cística sai da artéria hepática direita.'),
          t('Besides the right and left hepatic arteries, an intermediate (middle) hepatic artery, usually from the left hepatic artery, supplies segment IV.',
            'Além das artérias hepáticas direita e esquerda, uma artéria hepática intermediária (média), geralmente originada da artéria hepática esquerda, irriga o segmento IV.'),
        ],
      },
      {
        id: 'liver-p21', ref: '21', title: t('Variants of the proper hepatic artery', 'Variantes da artéria hepática própria'),
        focus: ['proper_hepatic_a', 'sma', 'celiac_trunk'], ghost: ['gallbladder', 'stomach'], view: 'ant',
        body: [
          t('Three anatomical variants of the proper hepatic artery occur relative to the celiac trunk and the superior mesenteric artery below it: (a) the typical division into right and left branches occurs in 75% of cases; (b) the right branch originates separately from the superior mesenteric artery in 10% of cases; and (c) both the left and right branches originate independently from the celiac trunk in less than 5% of cases.',
            'Ocorrem três variantes anatômicas da artéria hepática própria em relação ao tronco celíaco e à artéria mesentérica superior logo abaixo: (a) a divisão típica em ramos direito e esquerdo ocorre em 75% dos casos; (b) o ramo direito nasce separadamente da artéria mesentérica superior em 10% dos casos; e (c) os ramos esquerdo e direito nascem ambos diretamente do tronco celíaco em menos de 5% dos casos.'),
          t('In the 3D model, the Celiac trunk and the Superior mesenteric artery are the two origins to compare. The normal variant starts from the Celiac trunk, so the variant (b) would move the right branch down to the Superior mesenteric artery.',
            'No modelo 3D, o Tronco celíaco e a Artéria mesentérica superior são as duas origens a comparar. A variante típica sai do Tronco celíaco, então a variante (b) transferiria o ramo direito para a Artéria mesentérica superior.'),
        ],
      },
      {
        id: 'liver-p22', ref: '22', title: t('The portal vein: formation, course and tributaries', 'A veia porta: formação, trajeto e afluentes'),
        focus: ['hepatic_portal_v', 'smv', 'splenic_v', 'gastric_v', 'pancreas', 'duodenum'], ghost: ['stomach', 'transverse_colon'], view: 'ant',
        body: [
          t('The portal vein is formed behind the neck of the pancreas (L2) and ascends to the right, posterior to the first part of the duodenum. It runs from the head of the pancreas toward the hilum of the liver. It is short: 8–10 cm long and 8–10 mm across. Its main tributaries are the left and right gastric veins, the posterior superior pancreaticoduodenal vein and the cystic vein.',
            'A veia porta se forma atrás do colo do pâncreas (L2) e sobe para a direita, posterior à primeira porção do duodeno. Vai da cabeça do pâncreas em direção ao hilo do fígado. É curta: 8–10 cm de comprimento e 8–10 mm de diâmetro. Seus principais afluentes são as veias gástricas esquerda e direita, a veia pancreaticoduodenal superior posterior e a veia cística.'),
          t('In this typical portal venous system, the superior mesenteric vein (draining jejunal, ileal, ileocolic, right and middle colic, right gastro-omental and inferior pancreaticoduodenal veins) joins the splenic vein (which receives the inferior mesenteric vein with the left colic vein, plus pancreatic, short gastric and left gastro-omental veins) to form the hepatic portal vein, which then receives its four direct main tributaries (left and right gastric, posterior superior pancreaticoduodenal and cystic veins). In the 3D model, follow the Splenic vein behind the Pancreas and the Superior mesenteric vein up from below: they form the Hepatic portal vein at the head of the pancreas.',
            'Nesse arranjo típico do sistema porta, a veia mesentérica superior (drenando as veias jejunais, ileais, ileocólica, cólicas direita e média, gastromental direita e pancreaticoduodenais inferiores) une-se à veia esplênica (que recebe a veia mesentérica inferior com a cólica esquerda, além das veias pancreáticas, gástricas curtas e gastromental esquerda) para formar a veia porta hepática, que então recebe seus quatro principais afluentes diretos (veias gástricas esquerda e direita, pancreaticoduodenal superior posterior e cística). No modelo 3D, siga a Veia esplênica atrás do Pâncreas e a Veia mesentérica superior subindo de baixo: elas formam a Veia porta hepática na cabeça do pâncreas.'),
        ],
      },
      {
        id: 'liver-p23', ref: '23', title: t('The portocaval anastomoses', 'As anastomoses portocavas'),
        focus: ['hepatic_portal_v', 'gastric_v', 'ivc_g', 'imv', 'smv', 'splenic_v', 'esophagus', 'rectum'], ghost: ['stomach', 'transverse_colon', 'descending_colon'], view: 'ant',
        body: [
          t('Topographically, the portal vein, superior mesenteric vein, splenic vein and inferior mesenteric vein lie in the anterior abdomen relative to vertebral level L4 above the iliac confluence. Within this network, venous blood from the superior mesenteric vein and blood from the splenic, gastric and inferior mesenteric veins mix in the portal vein before perfusing the liver, alongside separate caval tributaries.',
            'Topograficamente, a veia porta, a veia mesentérica superior, a veia esplênica e a veia mesentérica inferior situam-se no abdome anterior em relação ao nível vertebral L4, acima da confluência ilíaca. Nessa rede, o sangue venoso da veia mesentérica superior e o sangue das veias esplênica, gástrica e mesentérica inferior misturam-se na veia porta antes de perfundir o fígado, ao lado dos afluentes cavais separados.'),
          t('There are four portocaval anastomoses where portal and caval veins meet: (1) esophageal (between the left gastric and esophageal veins), (2) paraumbilical (along the falciform and round ligaments to the umbilicus), (3) rectal (between the superior rectal veins and the middle and inferior rectal veins around the levator ani), and (4) retroperitoneal (along the duodenum, pancreas and ascending and descending colon). In the 3D model, the Esophagus, the Gastric veins, the Rectum and the Hepatic portal vein are the places where these routes meet the caval system.',
            'Existem quatro anastomoses portocavas onde os sistemas porta e cava se encontram: (1) esofágica (entre as veias gástrica esquerda e esofágicas), (2) paraumbilical (ao longo dos ligamentos falciforme e redondo até o umbigo), (3) retal (entre as veias retais superiores e as veias retais médias e inferiores em torno do levantador do ânus) e (4) retroperitoneal (ao longo do duodeno, do pâncreas e dos colos ascendente e descendente). No modelo 3D, o Esôfago, as Veias gástricas, o Reto e a Veia porta hepática são os pontos em que essas vias encontram o sistema cava.'),
        ],
      },
      {
        id: 'liver-p24', ref: '24', title: t('Variations of the portal vein', 'Variações da veia porta'),
        focus: ['gastric_v', 'splenic_v', 'smv', 'imv', 'hepatic_portal_v'], ghost: ['stomach', 'pancreas'], view: 'ant',
        body: [
          t('The variations of the portal vein concern how its tributaries enter the confluence. The left gastric vein often enters the junction of the splenic and superior mesenteric veins, and in 24% of cases it enters the splenic vein. The inferior mesenteric vein may enter the junction of the splenic and superior mesenteric veins, or it may enter the superior mesenteric vein alone—altering how the Left gastric vein and Inferior mesenteric vein join the Splenic vein and Superior mesenteric vein to form the Hepatic portal vein.',
            'As variações da veia porta dizem respeito ao modo como seus afluentes entram na confluência. A veia gástrica esquerda frequentemente entra na junção das veias esplênica e mesentérica superior, e em 24% dos casos entra na veia esplênica. A veia mesentérica inferior pode entrar na junção das veias esplênica e mesentérica superior, ou pode entrar apenas na veia mesentérica superior — variando a forma como a Veia gástrica esquerda e a Veia mesentérica inferior se unem à Veia esplênica e à Veia mesentérica superior para formar a Veia porta hepática.'),
          t('In the 3D model, check the Gastric veins and the Inferior mesenteric vein when you trace the portal system: the Left gastric vein can join the Splenic vein, and the Inferior mesenteric vein can join the Superior mesenteric vein or the junction of the two.',
            'No modelo 3D, verifique as Veias gástricas e a Veia mesentérica inferior ao seguir o sistema porta: a veia gástrica esquerda pode se unir à Veia esplênica, e a veia mesentérica inferior pode se unir à Veia mesentérica superior ou à junção das duas.'),
          t('Among the portal variations the figure shows "high intestinal veins", where intestinal veins join the portal system higher than usual.',
            'Entre as variações portais, a figura mostra “veias intestinais altas”, em que as veias intestinais se unem ao sistema porta em uma posição mais alta que a habitual.'),
        ],
      },
    ],
    questions: [
      { ref: '19', q: 'What share of the liver blood comes from the portal vein?', correct: '80%', wrong: ['20%', '50%', '100%'], why: 'The proper hepatic artery gives 20% of the blood, the portal vein 80%.',
        pt: { q: 'Qual a fração do sangue do fígado que vem da veia porta?', correct: '80%', wrong: ['20%', '50%', '100%'], why: 'A artéria hepática própria fornece 20% do sangue, e a veia porta 80%.' } },
      { ref: '20', q: 'Where does the proper hepatic artery ascend relative to the portal vein and the bile duct?', correct: 'Anterior to the portal vein and medial to the bile duct', wrong: ['Posterior to the portal vein and lateral to the bile duct', 'Posterior to both', 'Lateral to the portal vein and anterior to the bile duct'], why: 'It ascends anterior to the portal vein and medial to the bile duct, in the free margin of the lesser omentum.',
        pt: { q: 'Em relação à veia porta e ao ducto biliar, por onde sobe a artéria hepática própria?', correct: 'Anterior à veia porta e medial ao ducto biliar', wrong: ['Posterior à veia porta e lateral ao ducto biliar', 'Posterior a ambos', 'Lateral à veia porta e anterior ao ducto biliar'], why: 'Ela sobe anterior à veia porta e medial ao ducto biliar, na margem livre do omento menor.' } },
      { ref: '21', q: 'In what share of cases does the right branch of the proper hepatic artery come from the superior mesenteric artery?', correct: '10%', wrong: ['75%', 'Less than 5%', '25%'], why: 'The right branch originates from the superior mesenteric artery in 10% of cases; the typical division is 75%.',
        pt: { q: 'Em que fração dos casos o ramo direito da artéria hepática própria nasce da artéria mesentérica superior?', correct: '10%', wrong: ['75%', 'Menos de 5%', '25%'], why: 'O ramo direito nasce da artéria mesentérica superior em 10% dos casos; a divisão típica é de 75%.' } },
      { ref: '22', q: 'At which vertebral level is the portal vein formed?', correct: 'L2, behind the neck of the pancreas', wrong: ['T12, at the celiac trunk', 'L4, at the bifurcation', 'T10, at the diaphragm'], why: 'The portal vein is formed behind the neck of the pancreas (L2).',
        pt: { q: 'Em que nível vertebral se forma a veia porta?', correct: 'L2, atrás do colo do pâncreas', wrong: ['T12, no tronco celíaco', 'L4, na bifurcação', 'T10, no diafragma'], why: 'A veia porta se forma atrás do colo do pâncreas (L2).' } },
      { ref: '23', q: 'Which number marks the paraumbilical portocaval anastomosis?', correct: '2', wrong: ['1', '3', '4'], why: '1 oesophageal, 2 paraumbilical, 3 rectal, 4 retroperitoneal.',
        pt: { q: 'Qual número marca a anastomose portocava paraumbilical?', correct: '2', wrong: ['1', '3', '4'], why: '1 esofágica, 2 paraumbilical, 3 retal, 4 retroperitoneal.' } },
      { ref: '24', q: 'In what share of cases does the left gastric vein enter the splenic vein?', correct: '24%', wrong: ['10%', '50%', '75%'], why: 'The left gastric vein may enter the splenic vein in 24% of cases.',
        pt: { q: 'Em que fração dos casos a veia gástrica esquerda entra na veia esplênica?', correct: '24%', wrong: ['10%', '50%', '75%'], why: 'A veia gástrica esquerda pode entrar na veia esplênica em 24% dos casos.' } },
    ],
  },
  {
    id: 'liver-5', title: t('Intrahepatic systems and the functional segments', 'Sistemas intra-hepáticos e os segmentos funcionais'),
    cards: [
      {
        id: 'liver-p25', ref: '25', title: t('The intrahepatic vascular and duct systems', 'Os sistemas vasculares e ductais intra-hepáticos'),
        focus: ['hepatic_portal_v', 'proper_hepatic_a', 'common_hepatic_duct', 'hepatic_v', 'hepatic_ducts'], ghost: ['caudate_lobe'], view: 'ant',
        body: [
          t('Inside the liver, the vascular and duct systems are organised around the portal triad: the Hepatic artery proper, the Hepatic portal vein and the Common hepatic duct, which run together through the parenchyma. Arterial and portal venous branches feed the sinusoids, which empty into the central vein; the central veins drain into the sublobular veins, which merge into the hepatic vein.',
            'Dentro do fígado, os sistemas vasculares e ductais organizam-se em torno da tríade portal: a artéria hepática própria, a veia porta hepática e o ducto hepático comum, que correm juntos pelo parênquima. Ramos arteriais e venosos portais alimentam os sinusoides, que desembocam na veia central; as veias centrais drenam para as veias sublobulares, que se unem na veia hepática.'),
          t('Glisson’s perivascular fibrous capsule surrounds these structures and extends into the porta hepatis along the vessels and the bile duct. In the 3D model, the Hepatic portal vein, the Proper hepatic artery and the Common hepatic duct enter the liver together, wrapped by that fibrous sheath, and the Hepatic veins leave it separately.',
            'A cápsula fibrosa perivascular de Glisson envolve essas estruturas e se estende até o hilo do fígado ao longo dos vasos e do ducto biliar. No modelo 3D, a Veia porta hepática, a Artéria hepática própria e o Ducto hepático comum entram no fígado juntos, envoltos por essa bainha fibrosa, e as Veias hepáticas saem à parte.'),
        ],
      },
      {
        id: 'liver-p26', ref: '26–27', title: t('The segmental distribution and the eight functional segments', 'A distribuição segmentar e os oito segmentos funcionais'),
        focus: ['caudate_lobe', 'hepatic_portal_v', 'hepatic_v', 'ivc_g', 'gallbladder', 'proper_hepatic_a', 'common_hepatic_duct'], ghost: ['diaphragm_g'], view: 'ant',
        body: [
          t('Within the liver, the common hepatic duct, hepatic portal vein and proper hepatic artery divide into right and left branches, then into segmental branches (anterior, medial, posterior and lateral), supplying the numbered parenchymal territories (II–VIII) plus the right and left caudate lobe and caudate process; a conceptual «phantom division» separates the posterior lateral (VII) and posterior medial (VIII) segments.',
            'Dentro do fígado, o ducto hepático comum, a veia porta hepática e a artéria hepática própria dividem-se em ramos direito e esquerdo, depois em ramos segmentares (anterior, medial, posterior e lateral), suprindo os territórios parenquimatosos numerados (II–VIII) além do lobo caudado (direito e esquerdo) e do processo caudado; uma «divisão fantasma» conceitual separa os segmentos posterolateral (VII) e posteromedial (VIII).'),
          t('The functional segments are based on how the portal venous branches are distributed in the parenchyma, and there are eight of them, I to VIII, with IV split into 4a and 4b. Neighbouring segments have no vessel anastomoses, which makes partial hepatectomy possible. The first segment is the Caudate lobe. The division into segments follows the ramifications of the bile ducts and hepatic vessels, and it does not entirely correspond with the anatomical division into lobes: surgically, the Right and Left portal fissures, the Main portal fissure and the Umbilical fissure separate the Right and Left lateral sectors and the Right and Left medial sectors.',
            'Os segmentos funcionais baseiam-se na distribuição dos ramos da veia porta no parênquima, e são oito, de I a VIII, com o IV dividido em 4a e 4b. Segmentos vizinhos não têm anastomoses vasculares, o que torna possível a hepatectomia parcial. O primeiro segmento é o Lobo caudado. A divisão em segmentos segue as ramificações dos ductos biliares e dos vasos hepáticos, e não corresponde totalmente à divisão anatômica em lobos: cirurgicamente, as fissuras portais direita e esquerda, a fissura portal principal e a fissura umbilical separam os setores laterais direito e esquerdo e os setores mediais direito e esquerdo.'),
          t('In the 3D model, the Caudate lobe of liver is segment I. Use the Gallbladder and the Inferior vena cava as the landmarks for the surface division.',
            'No modelo 3D, o Lobo caudado do fígado é o segmento I. Use a Vesícula biliar e a Veia cava inferior como referências para a divisão de superfície.'),
          t('Area names for the left segments: segment II is the lateral superior area, segment III the lateral inferior area, and segment IV the medial area, with anterior and posterior portions.',
            'Nomes das áreas dos segmentos esquerdos: o segmento II é a área lateral superior, o segmento III é a área lateral inferior e o segmento IV é a área medial, com porções anterior e posterior.'),
        ],
      },
      {
        id: 'liver-p28', ref: '28', title: t('The Cantlie line, the portal branching and the segment table', 'A linha de Cantlie, a bifurcação porta e a tabela de segmentos'),
        focus: ['gallbladder', 'ivc_g', 'caudate_lobe', 'hepatic_portal_v', 'common_hepatic_duct', 'proper_hepatic_a'], ghost: ['diaphragm_g'], view: 'ant',
        body: [
          t('Each segment is served by tertiary branches of the hepatic artery, the portal vein and the common hepatic duct, which together make up the portal triad. At the Cantlie line the portal vein divides into left and right branches. The right branch divides into a lateral and a paramedian branch, and each of these divides into an anterior and a posterior branch: four branches in total. The left branch divides into a lateral branch (posterior and anterior), a medial branch and a branch for the caudate lobe.',
            'Cada segmento é suprido por ramos terciários da artéria hepática, da veia porta e do ducto hepático comum, que juntos formam a tríade portal. Na linha de Cantlie, a veia porta se divide em ramos esquerdo e direito. O ramo direito se divide em um ramo lateral e um paramediano, e cada um deles se divide em anterior e posterior: quatro ramos no total. O ramo esquerdo se divide em um ramo lateral (posterior e anterior), um ramo medial e um ramo para o lobo caudado.'),
          t('On the surface of the liver, the line of Cantlie passes across the diaphragmatic surface through the fossa for the gallbladder and the groove for the inferior vena cava, separating the surgical right and left parts of the liver (unlike the falciform ligament and round ligament, which mark the anatomical right and left lobes). It serves as the main anatomical landmark for liver surgery.',
            'Na superfície do fígado, a linha de Cantlie atravessa a face diafragmática pela fossa da vesícula biliar e pelo sulco da veia cava inferior, separando as partes cirúrgicas direita e esquerda do fígado (ao contrário do ligamento falciforme e do ligamento redondo, que marcam os lobos anatômicos direito e esquerdo). Ela é a principal referência anatômica para a cirurgia do fígado.'),
          t('The hepatic segments are organised by left and right parts. The Left part consists of the Posterior part (segment I, Caudate lobe), the Left lateral division (segments II and III) and the Left medial division (segment IV). The Right part consists of the Right medial (anterior) division (V, anterior inferior, and VIII, anterior superior) and the Right lateral (posterior) division (VI, posterior inferior, and VII, posterior superior).',
            'Os segmentos hepáticos organizam-se em partes esquerda e direita. A Parte esquerda compreende a Parte posterior (segmento I, Lobo caudado), a divisão lateral esquerda (segmentos II e III) e a divisão medial esquerda (segmento IV). A Parte direita compreende a divisão medial (anterior) direita (V, anterior inferior, e VIII, anterior superior) e a divisão lateral (posterior) direita (VI, posterior inferior, e VII, posterior superior).'),
          t('⚠ One table in the class material (page 28) groups V with VI and VII with VIII. That grouping is wrong: in Couinaud’s scheme the right medial (anterior) division is V + VIII and the right lateral (posterior) division is VI + VII, drained by the right anterior and posterior sectoral ducts (Sobotta; Gray’s). The Gallbladder and spleen lesson (page 30) shows the correct grouping.',
            '⚠ Uma tabela do material da aula (página 28) agrupa V com VI e VII com VIII. Esse agrupamento está errado: no esquema de Couinaud a divisão medial (anterior) direita é V + VIII e a divisão lateral (posterior) direita é VI + VII, drenadas pelos ductos setoriais anterior e posterior direitos (Sobotta; Gray’s). A aula de Vesícula e baço (página 30) mostra o agrupamento correto.'),
        ],
      },
    ],
    questions: [
      { ref: '26–27', q: 'Which segment is the first functional segment?', correct: 'The caudate lobe (segment I)', wrong: ['The left lateral segment (II)', 'The right posterolateral segment (VII)', 'The left medial segment (IV)'], why: 'The first segment is the Caudate lobe (segment I).',
        pt: { q: 'Qual é o primeiro segmento funcional?', correct: 'O lobo caudado (segmento I)', wrong: ['O segmento lateral esquerdo (II)', 'O segmento posterolateral direito (VII)', 'O segmento medial esquerdo (IV)'], why: 'O primeiro segmento é o Lobo caudado (segmento I).' } },
      { ref: '27', q: 'Why is partial hepatectomy possible?', correct: 'Neighbouring segments have no vessel anastomoses', wrong: ['The liver has two independent lobes', 'The bile ducts are outside the liver', 'The hepatic veins are very large'], why: 'No vessel anastomoses between neighbouring segments, which makes partial hepatectomy possible.',
        pt: { q: 'Por que a hepatectomia parcial é possível?', correct: 'Segmentos vizinhos não têm anastomoses vasculares', wrong: ['O fígado tem dois lobos independentes', 'Os ductos biliares ficam fora do fígado', 'As veias hepáticas são muito grandes'], why: 'Não há anastomoses vasculares entre segmentos vizinhos, o que torna possível a hepatectomia parcial.' } },
      { ref: '28', q: 'Which landmark, separates the right and left parts of the liver?', correct: 'The line of Cantlie', wrong: ['The falciform ligament', 'The coronary ligament', 'The porta hepatis'], why: 'The line of Cantlie separates the right and left parts of the liver; it passes through the gallbladder fossa and the vena cava groove.',
        pt: { q: 'Qual referência, separa as partes direita e esquerda do fígado?', correct: 'A linha de Cantlie', wrong: ['O ligamento falciforme', 'O ligamento coronário', 'O hilo do fígado'], why: 'A linha de Cantlie separa as partes direita e esquerda do fígado; passa pela fossa da vesícula e pelo sulco da veia cava.' } },
      { ref: '28', q: 'How many branches does the right branch of the portal vein give in total at the Cantlie line?', correct: 'Four', wrong: ['Two', 'Three', 'Six'], why: 'The right branch divides into lateral and paramedian branches, each dividing into anterior and posterior: 4 in total.',
        pt: { q: 'Quantos ramos o ramo direito da veia porta dá no total, na linha de Cantlie?', correct: 'Quatro', wrong: ['Dois', 'Três', 'Seis'], why: 'O ramo direito se divide em lateral e paramediano, cada um em anterior e posterior: 4 no total.' } },
      { ref: '28', q: 'Which segments form the right medial division?', correct: 'V and VIII', wrong: ['V and VI', 'VI and VII', 'II and III'], why: 'Right medial (anterior) division = V and VIII; right lateral (posterior) division = VI and VII (Couinaud; Sobotta). One table in the class material shows V+VI — that grouping is wrong.',
        pt: { q: 'Quais segmentos formam a divisão medial direita?', correct: 'V e VIII', wrong: ['V e VI', 'VI e VII', 'II e III'], why: 'Divisão medial (anterior) direita = V e VIII; divisão lateral (posterior) direita = VI e VII (Couinaud; Sobotta). Uma tabela do material da aula mostra V+VI — esse agrupamento está errado.' } },
    ],
  },
  {
    id: 'liver-6', title: t('Hepatic veins and the microscopic structure of the liver', 'Veias hepáticas e estrutura microscópica do fígado'),
    cards: [
      {
        id: 'liver-p29', ref: '29', title: t('The direction of blood and bile', 'A direção do sangue e da bile'),
        focus: ['hepatic_v', 'hepatic_portal_v'], ghost: ['caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('Blood and bile flow in opposite directions within the liver lobule. Blood flows centripetally, from the peripheral branches of the hepatic portal vein and hepatic artery toward the central vein. Bile produced by hepatocytes flows centrifugally, through the bile canaliculi toward the bile duct in the portal triad.',
            'O sangue e a bile fluem em direções opostas dentro do lóbulo hepático. O sangue flui centripetamente, dos ramos periféricos da veia porta hepática e da artéria hepática em direção à veia central. A bile produzida pelos hepatócitos flui centrifugamente, pelos canalículos biliares em direção ao ducto biliar na tríade portal.'),
          t('For the 3D model, the Hepatic veins are where the blood ends: the central veins merge into them, and the Hepatic portal vein and the Proper hepatic artery are where the blood starts.',
            'Para o modelo 3D, as Veias hepáticas são onde o sangue termina: as veias centrais se unem a elas; a Veia porta hepática e a Artéria hepática própria são onde o sangue começa.'),
        ],
      },
      {
        id: 'liver-p30', ref: '30', title: t('The hepatic lobule and the portal triad', 'O lóbulo hepático e a tríade portal'),
        focus: ['hepatic_portal_v', 'proper_hepatic_a', 'common_hepatic_duct'], ghost: ['hepatic_v'], view: 'ant', contextOnly: true,
        body: [
          t('The structural unit of the liver is the hepatic lobule, which has a polygonal (hexagonal) shape bordered by fibrous interlobular septa, with a central vein in the middle of each lobule. At each angle of the lobule sits a portal triad made of a branch of the hepatic artery, a branch of the portal vein and a bile duct with bile ductules. The hepatocytes are not arranged like the spokes of a wheel: their cords anastomose and branch.',
            'A unidade estrutural do fígado é o lóbulo hepático, de forma poligonal (hexagonal) delimitada por septos fibrosos interlobulares, com uma veia central no meio de cada lóbulo. Em cada ângulo do lóbulo há uma tríade portal formada por um ramo da artéria hepática, um ramo da veia porta e um ducto biliar com dúctulos biliares. Os hepatócitos não se dispõem como raios de uma roda: seus cordões se anastomosam e se ramificam.'),
          t('At each lobular corner, small branches of the hepatic artery and portal vein lie next to a bile ductule. The vessels deliver blood to the lobule, and the ductule drains bile from it.',
            'Em cada ângulo do lóbulo, pequenos ramos da artéria hepática e da veia porta ficam junto a um dúctulo biliar. Os vasos levam sangue ao lóbulo e o dúctulo drena a bile.'),
        ],
      },
      {
        id: 'liver-p31', ref: '31–32', title: t('The lobule, the sinusoids and the cells in the figures', 'O lóbulo, os sinusoides e as células nas figuras'),
        focus: ['hepatic_v', 'hepatic_portal_v', 'proper_hepatic_a'], ghost: ['common_hepatic_duct'], view: 'ant', contextOnly: true,
        body: [
          t('At the microscopic level, adjacent hexagonal hepatic lobules surround their central veins, with sinusoids and bile canaliculi running between hepatocyte cords. Along each lobular wedge, the portal triad—composed of branches of the bile duct, hepatic portal vein and hepatic artery, together with a lymphatic vessel—feeds Kupffer-cell-lined sinusoids between hepatocyte cords toward the central vein.',
            'No nível microscópico, lóbulos hepáticos hexagonais vizinhos circundam suas veias centrais, com sinusoides e canalículos biliares correndo entre cordões de hepatócitos. Ao longo de cada cunha lobular, a tríade portal — composta por ramos do ducto biliar, da veia porta hepática e da artéria hepática, junto a um vaso linfático — alimenta sinusoides revestidos por células de Kupffer entre os cordões de hepatócitos rumo à veia central.'),
          t('Within a single lobular sector, the two flows move in opposite directions: blood from the branches of the hepatic artery and hepatic portal vein mixes into a sinusoid (containing a Kupffer cell) on its way to a branch of the hepatic vein, while bile from the liver cells drains in the opposite direction through a bile canaliculus into a branch of the bile duct.',
            'Dentro de um único setor lobular, os dois fluxos seguem em direções opostas: o sangue vindo dos ramos da artéria hepática e da veia porta hepática se mistura em um sinusoide (contendo uma célula de Kupffer) rumo a um ramo da veia hepática, enquanto a bile das células hepáticas drena na direção oposta por um canalículo biliar até um ramo do ducto biliar.'),
        ],
      },
      {
        id: 'liver-p33', ref: '33', title: t('The hepatic veins and the portal branches', 'As veias hepáticas e os ramos porta'),
        focus: ['hepatic_v', 'ivc_g', 'hepatic_portal_v', 'hepatic_ducts', 'common_hepatic_duct', 'cystic_duct'], ghost: ['caudate_lobe', 'stomach', 'gallbladder'], view: 'ant',
        body: [
          t('The central veins progressively merge to form the hepatic veins on the visceral face. There are three main hepatic veins—1, the right hepatic vein; 2, the left hepatic vein; and 3, the median (intermediate) hepatic vein—along with minor inferior hepatic veins, and all of them converge superiorly into the Inferior vena cava. Inferiorly, the hepatic portal vein, hepatic artery proper and common hepatic duct enter from below alongside the celiac trunk, common hepatic, gastroduodenal and right gastric arteries and the cystic duct.',
            'As veias centrais se unem progressivamente para formar as veias hepáticas na face visceral. Há três veias hepáticas principais — 1, a veia hepática direita; 2, a veia hepática esquerda; e 3, a veia hepática mediana (intermediária) — além de pequenas veias hepáticas inferiores, e todas convergem superiormente para a Veia cava inferior. Inferiormente, a veia porta hepática, a artéria hepática própria e o ducto hepático comum entram por baixo ao lado do tronco celíaco, das artérias hepática comum, gastroduodenal e gástrica direita e do ducto cístico.'),
          t('In the abdomen, the oesophagus approaches the stomach beside the aorta. Gastric veins drain into the portal system. Veins from the spleen, pancreas and left side of the stomach drain into the splenic vein. The superior mesenteric vein collects blood from the small intestine, ascending colon and transverse colon. Veins from the descending colon, sigmoid colon and upper rectum reach the inferior mesenteric vein. These routes converge on the hepatic portal vein, which carries blood into the liver. The hepatic veins then return it to the inferior vena cava.',
            'No abdome, o esôfago chega ao estômago junto à aorta. As veias gástricas drenam para o sistema porta. As veias do baço, do pâncreas e do lado esquerdo do estômago drenam na veia esplênica. A veia mesentérica superior recolhe sangue do intestino delgado e dos colos ascendente e transverso. As veias do colo descendente, do sigmoide e da parte superior do reto chegam à mesentérica inferior. Essas vias convergem para a veia porta hepática, que leva o sangue ao fígado. As veias hepáticas devolvem o sangue à veia cava inferior.'),
        ],
      },
      {
        id: 'liver-p34', ref: '34–35', title: t('The sinusoids and the space of Disse', 'Os sinusoides e o espaço de Disse'),
        focus: ['hepatic_v'], ghost: ['caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('The hepatic sinusoids are fenestrated capillaries that lack a basal lamina, which favours metabolic exchange between the blood in the sinusoids and the hepatocytes. Within each sinusoid, erythrocytes and a macrophage travel inside the lumen bounded by endothelial cells pierced by fenestrations and surrounded by hepatocytes.',
            'Os sinusoides hepáticos são capilares fenestrados sem lâmina basal, o que favorece as trocas metabólicas entre o sangue dos sinusoides e os hepatócitos. Dentro de cada sinusoide, eritrócitos e um macrófago circulam na luz delimitada por células endoteliais perfuradas por fenestrações e cercadas por hepatócitos.'),
          t('The sinusoids are separated from the hepatocytes by a narrow gap, the perisinusoidal space of Disse, which contains hepatocyte microvilli, stellate cells and nerve terminals. So the exchange path goes from the sinusoid, across the fenestrated wall, through the space of Disse, to the hepatocyte.',
            'Os sinusoides são separados dos hepatócitos por uma fenda estreita, o espaço perisinusoidal de Disse, que contém microvilosidades dos hepatócitos, células estreladas e terminações nervosas. Assim, o caminho de troca vai do sinusoide, atravessa a parede fenestrada, passa pelo espaço de Disse e chega ao hepatócito.'),
        ],
      },
      {
        id: 'liver-p36', ref: '36', title: t('The hepatic acinus and the metabolic zones', 'O ácino hepático e as zonas metabólicas'),
        focus: ['hepatic_v', 'hepatic_portal_v', 'proper_hepatic_a'], ghost: ['common_hepatic_duct'], view: 'ant', contextOnly: true,
        body: [
          t('The hepatic acinus is the area supplied by one terminal branch of the hepatic artery and of the portal venule, and it describes the liver better in relation to its function. There are three ways to conceive this functional unit: the classic hepatic lobule (with the central vein as a tributary of the hepatic vein), the portal lobule, and the liver acinus with its metabolic zonation. Although classic lobules are often schematised as regular hexagons, their real appearance in the liver is highly variable.',
            'O ácino hepático é a área suprida por um ramo terminal da artéria hepática e da vênula porta, descrevendo melhor o fígado em relação à sua função. Há três formas de conceber essa unidade funcional: o lóbulo hepático clássico (com a veia central como afluente da veia hepática), o lóbulo porta e o ácino hepático com sua zonação metabólica. Embora os lóbulos clássicos sejam muitas vezes esquematizados como hexágonos regulares, sua aparência real no fígado é altamente variável.'),
          t('Functionally, the liver microarchitecture is better considered as acini that extend between adjacent central venules, divided into three zones. In the 3D model, the Hepatic veins are the endpoints of those central venules, and the portal triad at the edge of the acinus carries the Hepatic portal vein and the Proper hepatic artery.',
            'Do ponto de vista funcional, a microarquitetura do fígado é melhor considerada como ácinos que se estendem entre vênulas centrais vizinhas, divididos em três zonas. No modelo 3D, as Veias hepáticas são os pontos finais dessas vênulas centrais, e a tríade portal na borda do ácino leva a Veia porta hepática e a Artéria hepática própria.'),
        ],
      },
      {
        id: 'liver-p37', ref: '37', title: t('Hepatic stellate (Ito) cells', 'Células estreladas hepáticas (de Ito)'),
        focus: ['hepatic_v'], ghost: ['caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('The hepatic stellate cells lie within the perisinusoidal space of Disse, between the hepatocytes and the sinusoids. They store fat-soluble vitamin A in their lipid droplets and serve as a source of growth factors for liver homeostasis. Across the lobular architecture from the portal triad inward, the portal connective-tissue space is bordered by the limiting hepatic plate and contains interlobular vessels, a bile ductule and a peribiliary lymphatic vessel; deeper along the sinusoid wall, each perisinusoidal cell lies beside collagen fibers in the space of Disse opposite a Kupffer cell in the lumen, while each hepatocyte sits between the porous endothelium and a bile canaliculus.',
            'As células estreladas hepáticas ficam dentro do espaço perisinusoidal de Disse, entre os hepatócitos e os sinusoides. Armazenam vitamina A, solúvel em gordura, em gotículas lipídicas e são fonte de fatores de crescimento para a homeostasia do fígado. Da tríade portal para o interior do lóbulo, o espaço porta conjuntivo é delimitado pela placa hepática limitante e contém vasos interlobulares, um dúctulo biliar e um vaso linfático peribiliar; mais internamente, junto à parede do sinusoide, cada célula perisinusoidal fica ao lado de fibras colágenas no espaço de Disse em frente a uma célula de Kupffer na luz, enquanto cada hepatócito situa-se entre o endotélio poroso e um canalículo biliar.'),
        ],
      },
      {
        id: 'liver-p38', ref: '38–39', title: t('Pit cells and Kupffer cells', 'Células pit e células de Kupffer'),
        focus: ['hepatic_v'], ghost: ['caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('Pit cells are large granular lymphocytes that function as natural killer (NK) cells, especially active against viral infections. They reside inside the sinusoid lumen alongside Kupffer cells, separated by the fenestrated endothelium and the space of Disse (which holds Ito cells and hepatocyte microvilli) from the hepatocytes, where bile canaliculi are sealed off by tight and gap junctions.',
            'As células pit são grandes linfócitos granulares que funcionam como células NK, especialmente ativas contra infecções virais. Elas residem dentro da luz do sinusoide ao lado das células de Kupffer, separadas pelo endotélio fenestrado e pelo espaço de Disse (que abriga células de Ito e microvilosidades dos hepatócitos) dos hepatócitos, onde os canalículos biliares são vedados por junções íntimas e comunicantes.'),
          t('Kupffer cells are resident macrophages in the lumen of the sinusoids. They remove from the bloodstream microbial residues and old erythrocytes. Fenestrated endothelial cells line the sinusoid, and stellate cells store vitamin A in the space of Disse.',
            'As células de Kupffer são macrófagos residentes na luz dos sinusoides. Elas retiram da corrente sanguínea resíduos microbianos e eritrócitos velhos. Células endoteliais fenestradas revestem o sinusoide, e células estreladas armazenam vitamina A no espaço de Disse.'),
        ],
      },
    ],
    questions: [
      { ref: '29', q: 'In which direction does blood flow inside the liver lobule?', correct: 'Centripetally, toward the central vein', wrong: ['Centrifugally, toward the portal triad', 'Toward the bile canaliculi', 'Toward the hepatic artery only'], why: 'Blood flows centripetally toward the central vein; bile flows centrifugally toward the portal triad.',
        pt: { q: 'Em que direção o sangue flui dentro do lóbulo hepático?', correct: 'Centripetamente, em direção à veia central', wrong: ['Centrifugamente, em direção à tríade portal', 'Em direção aos canalículos biliares', 'Apenas em direção à artéria hepática'], why: 'O sangue flui centripetamente para a veia central; a bile flui centrifugamente para a tríade portal.' } },
      { ref: '30', q: 'What is at each corner of the hexagonal hepatic lobule?', correct: 'A portal triad (hepatic artery branch, portal vein branch and bile duct)', wrong: ['A central vein', 'A hepatic vein', 'A sinusoid'], why: 'At each angle of the lobule there is a portal triad: a branch of the hepatic artery, a branch of the portal vein and a bile duct.',
        pt: { q: 'O que existe em cada canto do lóbulo hepático hexagonal?', correct: 'Uma tríade portal (ramo da artéria hepática, ramo da veia porta e ducto biliar)', wrong: ['Uma veia central', 'Uma veia hepática', 'Um sinusoide'], why: 'Em cada ângulo do lóbulo há uma tríade portal: ramo da artéria hepática, ramo da veia porta e ducto biliar.' } },
      { ref: '33', q: 'How many main hepatic veins are listed, and where do they drain?', correct: 'Three main hepatic veins, draining into the inferior vena cava', wrong: ['Two, draining into the portal vein', 'Five, draining into the superior vena cava', 'Three, draining into the hepatic artery'], why: 'Right, left and median hepatic veins (plus minor inferior hepatic veins) all drain into the IVC.',
        pt: { q: 'Quantas veias hepáticas principais são listadas, e para onde drenam?', correct: 'Três veias hepáticas principais, que drenam para a veia cava inferior', wrong: ['Duas, que drenam para a veia porta', 'Cinco, que drenam para a veia cava superior', 'Três, que drenam para a artéria hepática'], why: 'As veias hepáticas direita, esquerda e mediana (além das pequenas veias hepáticas inferiores) drenam todas para a VCI.' } },
      { ref: '34–35', q: 'What makes hepatic sinusoids different from ordinary capillaries?', correct: 'They are fenestrated and lack a basal lamina', wrong: ['They have a thick basal lamina', 'They have no endothelium', 'They are lined by smooth muscle'], why: 'Hepatic sinusoids are fenestrated capillaries that lack a basal lamina, favouring metabolic exchange.',
        pt: { q: 'O que diferencia os sinusoides hepáticos dos capilares comuns?', correct: 'São fenestrados e não têm lâmina basal', wrong: ['Têm lâmina basal espessa', 'Não têm endotélio', 'São revestidos por músculo liso'], why: 'Os sinusoides hepáticos são capilares fenestrados sem lâmina basal, o que favorece a troca metabólica.' } },
      { ref: '37', q: 'What do hepatic stellate cells store?', correct: 'Fat-soluble vitamin A', wrong: ['Bile salts', 'Iron', 'Glycogen only'], why: 'Hepatic stellate cells store fat-soluble vitamin A in lipid droplets and are a source of growth factors.',
        pt: { q: 'O que as células estreladas hepáticas armazenam?', correct: 'Vitamina A, solúvel em gordura', wrong: ['Sais biliares', 'Ferro', 'Apenas glicogênio'], why: 'As células estreladas armazenam vitamina A solúvel em gordura em gotículas lipídicas e são fonte de fatores de crescimento.' } },
      { ref: '39', q: 'What are Kupffer cells described as?', correct: 'Resident macrophages in the sinusoid lumen that remove microbial residues and old erythrocytes', wrong: ['Large granular lymphocytes that act as NK cells', 'Fat-storing cells in the space of Disse', 'Bile canaliculi with walls of their own'], why: 'Kupffer cells are resident macrophages within the sinusoidal lumen, removing microbial residues and old erythrocytes. Pit cells are the NK-like lymphocytes.',
        pt: { q: 'Como as células de Kupffer são descritas?', correct: 'Macrófagos residentes na luz do sinusoide que retiram resíduos microbianos e eritrócitos velhos', wrong: ['Grandes linfócitos granulares que atuam como células NK', 'Células que armazenam gordura no espaço de Disse', 'Canalículos biliares com parede própria'], why: 'As células de Kupffer são macrófagos residentes na luz dos sinusoides, retirando resíduos microbianos e eritrócitos velhos. As células pit são os linfócitos tipo NK.' } },
    ],
  },
  {
    id: 'liver-7', title: t('Bile canaliculi, the bile pathway and the capsule', 'Canalículos biliares, via da bile e cápsula'),
    cards: [
      {
        id: 'liver-p40', ref: '40', title: t('Bile canaliculi: spaces, sealed by tight junctions', 'Canalículos biliares: espaços selados por junções íntimas'),
        focus: ['hepatic_v'], ghost: ['caudate_lobe'], view: 'ant', contextOnly: true,
        body: [
          t('Bile canaliculi are not real ducts with a proper structure of their own; they are spaces between opposing grooves in the plasma membranes of hepatocytes, sealed by tight junctions that form the blood–bile barrier. Around the hepatocyte cords sit the fenestrated sinusoids with Kupffer cells and the space of Disse containing stellate cells with vitamin A.',
            'Os canalículos biliares não são ductos verdadeiros com estrutura própria; são espaços entre sulcos opostos das membranas plasmáticas dos hepatócitos, selados por junções íntimas que formam a barreira sangue–bile. Em torno dos cordões de hepatócitos ficam os sinusoides fenestrados com células de Kupffer e o espaço de Disse contendo células estreladas com vitamina A.'),
        ],
      },
      {
        id: 'liver-p41', ref: '41–42', title: t('The four stages of the bile pathway', 'As quatro etapas da via da bile'),
        focus: ['common_hepatic_duct', 'hepatic_ducts', 'gallbladder'], ghost: ['hepatic_portal_v'], view: 'ant', contextOnly: true,
        body: [
          t('The bile pathway proceeds in four stages: 1. The bile canaliculi, which have no wall, run between adjacent hepatocytes. 2. The intralobular bile ductules, called cholangioles, collect them. 3. The periportal bile ductules, called canals of Hering, cross the limiting plate of the portal space. 4. The bile ducts, the interlobular bile ducts, receive them. Meanwhile, the sinusoids of the hepatic lobule originate from the terminal branch of the hepatic portal vein (the interlobular vein) and open into the central vein.',
            'A via da bile segue em quatro etapas: 1. Os canalículos biliares, que não têm parede, correm entre hepatócitos vizinhos. 2. Os dúctulos biliares intralobulares, chamados colangíolos, os recolhem. 3. Os dúctulos biliares periportais, chamados canais de Hering, atravessam a placa limitante do espaço porta. 4. Os ductos biliares, os ductos biliares interlobulares, os recebem. Enquanto isso, os sinusoides do lóbulo hepático originam-se do ramo terminal da veia porta hepática (a veia interlobular) e se abrem na veia central.'),
          t('Adjacent hepatocyte membranes form the boundaries of the bile canaliculi. The right and left hepatic ducts carry bile out of the liver into the common hepatic duct. The cystic duct connects this drainage pathway to the gallbladder.',
            'As membranas de hepatócitos vizinhos formam os limites dos canalículos biliares. Os ductos hepáticos direito e esquerdo levam a bile para fora do fígado até o ducto hepático comum. O ducto cístico conecta essa via de drenagem à vesícula biliar.'),
        ],
      },
      {
        id: 'liver-p43', ref: '43', title: t('Histology labels of the lobule and the portal tract', 'Legendas histológicas do lóbulo e do trato porta'),
        focus: ['hepatic_v', 'hepatic_portal_v', 'proper_hepatic_a'], ghost: ['common_hepatic_duct'], view: 'ant', contextOnly: true,
        body: [
          t('In classic lobular histological architecture, polygonal lobules are separated by fibrous septa, with a centrilobular venule at the centre of each lobule, sinusoids radiating through the parenchyma, and a portal tract at the meeting of septa containing terminal branches of the hepatic artery and portal vein.',
            'Na arquitetura histológica lobular clássica, lóbulos poligonais são separados por septos fibrosos, com uma vênula centrolobular no centro de cada lóbulo, sinusoides irradiando-se pelo parênquima e um trato porta na junção dos septos contendo ramos terminais da artéria hepática e da veia porta.'),
        ],
      },
      {
        id: 'liver-p44', ref: '44', title: t('The capsule of the liver: Glisson’s capsule and the peritoneum', 'A cápsula do fígado: cápsula de Glisson e o peritônio'),
        focus: ['caudate_lobe'], ghost: ['gallbladder', 'diaphragm_g'], view: 'ant', contextOnly: true,
        body: [
          t('The outer surface of the liver is covered by a capsule of collagenous tissue called Glisson’s capsule, and that capsule is covered by a layer of mesothelial cells from the peritoneum. Thus, the peritoneum is the outermost covering of the liver, superficial to Glisson’s capsule.',
            'A superfície externa do fígado é recoberta por uma cápsula de tecido colágeno chamada cápsula de Glisson, e essa cápsula é recoberta por uma camada de células mesoteliais do peritônio. Assim, o peritônio é a cobertura mais externa do fígado, superficial à cápsula de Glisson.'),
        ],
      },
    ],
    questions: [
      { ref: '40', q: 'What forms the blood–bile barrier between the hepatocytes and the bile canaliculi?', correct: 'Tight junctions sealing the spaces between hepatocyte grooves', wrong: ['A basal lamina around the sinusoid', 'The walls of the canaliculi themselves', 'Kupffer cells lining the canaliculi'], why: 'Bile canaliculi are spaces between opposing grooves in hepatocyte membranes, sealed by tight junctions (blood–bile barrier).',
        pt: { q: 'O que forma a barreira sangue–bile entre os hepatócitos e os canalículos biliares?', correct: 'Junções íntimas selando os espaços entre os sulcos dos hepatócitos', wrong: ['Uma lâmina basal em volta do sinusoide', 'As próprias paredes dos canalículos', 'Células de Kupffer revestindo os canalículos'], why: 'Os canalículos biliares são espaços entre sulcos opostos das membranas dos hepatócitos, selados por junções íntimas (barreira sangue–bile).' } },
      { ref: '41', q: 'What is the second stage of the bile pathway, after the bile canaliculi?', correct: 'Intralobular bile ductules (cholangioles)', wrong: ['Canals of Hering', 'Interlobular bile ducts', 'The sinusoids'], why: '1 bile canaliculi (no wall), 2 intralobular bile ductules (cholangioles), 3 periportal bile ductules (canals of Hering), 4 bile ducts.',
        pt: { q: 'Qual é a segunda etapa da via da bile, depois dos canalículos biliares?', correct: 'Ductos biliares intralobulares (colangíolos)', wrong: ['Canais de Hering', 'Ductos biliares interlobulares', 'Os sinusoides'], why: '1 canalículos biliares (sem parede), 2 ductos biliares intralobulares (colangíolos), 3 ductos biliares periportais (canais de Hering), 4 ductos biliares.' } },
      { ref: '41', q: 'What are the periportal bile ductules called?', correct: 'Canals of Hering', wrong: ['Cholangioles', 'Interlobular bile ducts', 'Portal triads'], why: 'Periportal bile ductules are the canals of Hering.',
        pt: { q: 'Como são chamados os ductos biliares periportais?', correct: 'Canais de Hering', wrong: ['Colangíolos', 'Ductos biliares interlobulares', 'Tríades portais'], why: 'Os ductos biliares periportais são os canais de Hering.' } },
      { ref: '44', q: 'What is the outer capsule of the liver called, and what covers it?', correct: 'Glisson’s capsule, covered by mesothelium from the peritoneum', wrong: ['Glisson’s capsule, covered by hepatocytes', 'Ito cell layer, covered by bile ducts', 'Fibrous appendix, covered by sinusoids'], why: 'The outer surface is covered by a collagenous capsule called Glisson’s capsule, which is covered by mesothelial cells from the peritoneum.',
        pt: { q: 'Como se chama a cápsula externa do fígado, e o que a recobre?', correct: 'Cápsula de Glisson, recoberta por mesotélio do peritônio', wrong: ['Cápsula de Glisson, recoberta por hepatócitos', 'Camada de células de Ito, recoberta por ductos biliares', 'Apêndice fibroso, recoberto por sinusoides'], why: 'A superfície externa é recoberta por uma cápsula colágena chamada cápsula de Glisson, recoberta por células mesoteliais do peritônio.' } },
    ],
  },
];
blocks.push(...supply.blocks);

export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
