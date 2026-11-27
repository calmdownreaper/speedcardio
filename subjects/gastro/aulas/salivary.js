// SpeedGastro · Aula 02 — Salivary glands (Prof. Fiume deck 02_salivary_glands, p003–p045).
// One card per slide page (or a short run of pages on one topic). Every card
// body explains the whole page, in order, using only the slide's own facts.
// t(en, pt) records the pt-BR pair and returns the English text.
const PT = {};
const t = (en, pt) => { PT[en] = pt; return en; };
import * as supply from './supply/salivary.js?v=159';

export const unit = {
  id: 'salivary',
  label: t('02 · Salivary glands', '02 · Glândulas salivares'),
  visible: ['submandibular_gland', 'sublingual_gland', 'tongue', 'teeth', 'stylopharyngeus', 'superior_constrictor'],
  ghost: ['tongue', 'teeth', 'superior_constrictor'],
  view: 'ant',
};

export const blocks = [
  {
    id: 'salivary-1', title: t('Saliva and the minor glands', 'Saliva e as glândulas menores'),
    cards: [
      {
        id: 'salivary-p003', ref: '3', title: t('Saliva: composition and functions', 'Saliva: composição e funções'),
        focus: ['submandibular_gland', 'sublingual_gland'], view: 'ant',
        body: [
          t('The salivary glands are divided into major glands, which are the parotid, submandibular and sublingual glands, and minor glands, which are spread through the whole oral cavity. They are organs whose ducts open into the oral cavity, so they release their secretion there. That secretion is saliva.',
            'As glândulas salivares se dividem em glândulas maiores, que são a parótida, a submandibular e a sublingual, e glândulas menores, espalhadas por toda a cavidade oral. São órgãos cujos ductos se abrem na cavidade oral, então liberam ali a sua secreção. Essa secreção é a saliva.'),
          t('Saliva is 99.5% water, at about 0.5 litre per day. It contains salivary amylase and buccal lipase, which are the digestive enzymes; mucin, which lubricates the oral cavity and the bolus; and lysozyme, IgA and lactoferrin, which have a bactericidal action.',
            'A saliva é 99,5% água, em cerca de 0,5 litro por dia. Contém amilase salivar e lipase bucal, que são as enzimas digestivas; mucina, que lubrifica a cavidade oral e o bolo alimentar; e lisozima, IgA e lactoferrina, que têm ação bactericida.'),
          t('Saliva has these functions. It keeps the mucosa of the oral cavity moist, which protects it. It contributes to the formation of the food bolus. It dissolves the molecules of food so that they can stimulate taste (buffer enzymes are also included). It protects against harmful micro-organisms (antibacterial function) and helps prevent tooth decay, and it also helps clotting and repair. Salivation is controlled by the autonomic nervous system.',
            'A saliva tem estas funções. Ela mantém a mucosa da cavidade oral úmida, o que a protege. Contribui para a formação do bolo alimentar. Dissolve as moléculas dos alimentos para que estimulem o paladar (enzimas-tampão também estão incluídas). Protege contra micro-organismos nocivos (função antibacteriana) e ajuda a prevenir a cárie, além de ajudar na coagulação e no reparo. A salivação é controlada pelo sistema nervoso autônomo.'),
        ],
      },
      {
        id: 'salivary-p004', ref: '4', title: t('The minor salivary glands', 'As glândulas salivares menores'),
        focus: ['tongue'], ghost: ['superior_constrictor'], view: 'ant',
        body: [
          t('Minor glands. Besides the major glands, about 1000 minor salivary glands release their secretion into the oral cavity. Together they produce only about 10% of the total saliva. Tumours originating from the minor salivary glands, compared with those from the major glands, are malignant, so their clinical significance must be taken into account.',
            'Glândulas menores. Além das glândulas maiores, cerca de 1000 glândulas salivares menores liberam sua secreção na cavidade oral. Juntas produzem apenas cerca de 10% da saliva total. Os tumores originados nas glândulas salivares menores, em comparação com os das glândulas maiores, são malignos, então sua importância clínica deve ser levada em conta.'),
          t('Minor glands are scattered throughout the oral cavity. Labial glands lie in the lips, palatine glands in the palate and pharyngeal glands posteriorly.',
            'As glândulas menores espalham-se pela cavidade oral. As labiais ficam nos lábios, as palatinas no palato e as faríngeas posteriormente.'),
        ],
      },
    ],
    questions: [
      { ref: '3', q: 'How much of saliva is water?', correct: '99.5%', wrong: ['90%', '70%', '50%'], why: 'Saliva is made of 99.5% H2O (0.5 l/day).', pt: { q: 'Quanto da saliva é água?', correct: '99,5%', wrong: ['90%', '70%', '50%'], why: 'A saliva é 99,5% H2O (0,5 l/dia).' } },
      { ref: '3', q: 'Which two digestive enzymes does saliva contain?', correct: 'Salivary amylase and buccal lipase', wrong: ['Pepsin and gastric lipase', 'Trypsin and chymotrypsin', 'Lactase and sucrase'], why: 'Salivary amylase and buccal lipase are the digestive enzymes of saliva.', pt: { q: 'Quais são as duas enzimas digestivas da saliva?', correct: 'Amilase salivar e lipase bucal', wrong: ['Pepsina e lipase gástrica', 'Tripsina e quimotripsina', 'Lactase e sacarase'], why: 'Amilase salivar e lipase bucal são as enzimas digestivas da saliva.' } },
      { ref: '3', q: 'Which components of saliva have a bactericidal action?', correct: 'Lysozyme, IgA and lactoferrin', wrong: ['Mucin and amylase', 'Pepsinogen and gastrin', 'Intrinsic factor and renin'], why: 'Lysozyme, IgA and lactoferrin have a bactericidal action.', pt: { q: 'Quais componentes da saliva têm ação bactericida?', correct: 'Lisozima, IgA e lactoferrina', wrong: ['Mucina e amilase', 'Pepsinogênio e gastrina', 'Fator intrínseco e renina'], why: 'Lisozima, IgA e lactoferrina têm ação bactericida.' } },
      { ref: '4', q: 'About how many minor salivary glands open into the oral cavity?', correct: 'About 1000', wrong: ['About 100', 'About 10', 'About 5000'], why: 'Approximately 1000 minor salivary glands.', pt: { q: 'Quantas glândulas salivares menores aproximadamente se abrem na cavidade oral?', correct: 'Cerca de 1000', wrong: ['Cerca de 100', 'Cerca de 10', 'Cerca de 5000'], why: 'Aproximadamente 1000 glândulas salivares menores.' } },
      { ref: '4', q: 'What share of total saliva do the minor glands produce?', correct: 'About 10%', wrong: ['About 50%', 'About 65%', 'About 20%'], why: 'The minor glands produce only about 10% of total saliva.', pt: { q: 'Qual parte da saliva total as glândulas menores produzem?', correct: 'Cerca de 10%', wrong: ['Cerca de 50%', 'Cerca de 65%', 'Cerca de 20%'], why: 'As glândulas menores produzem apenas cerca de 10% da saliva total.' } },
      { ref: '4', q: 'How do tumours of the minor salivary glands compare with those of the major glands?', correct: 'They are more often malignant', wrong: ['They are always benign', 'They never occur', 'They are less often malignant'], why: 'Tumours originating from the minor salivary glands, compared with those from the major glands, are malignant.', pt: { q: 'Como se comparam os tumores das glândulas menores com os das maiores?', correct: 'São mais frequentemente malignos', wrong: ['São sempre benignos', 'Nunca ocorrem', 'São menos frequentemente malignos'], why: 'Os tumores originados nas glândulas salivares menores, em comparação com os das maiores, são malignos.' } },
    ],
  },
  {
    id: 'salivary-2', title: t('Parotid gland: parts, relations and capsule', 'Parótida: partes, relações e cápsula'),
    cards: [
      {
        id: 'salivary-p005', ref: '5–6', title: t('Parotid gland: overview and its two parts', 'Parótida: visão geral e suas duas partes'),
        focus: ['submandibular_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The parotid produces 20% of saliva, rising to 50% with stimulation. Its enzyme-rich secretion enters the vestibule. It weighs 15–30 g, is bilateral and lobulated, and has superficial and deep parts. The parotid is serous; the submandibular gland is mostly serous and partly mucous, and the sublingual gland is almost entirely mucous. The parotid lies over the masseter and in front of sternocleidomastoid. An accessory parotid lies above the duct, which crosses masseter toward buccinator. The facial artery and vein cross near the submandibular gland below.',
            'A parótida produz 20% da saliva, chegando a 50% quando estimulada. Sua secreção rica em enzimas entra no vestíbulo. Pesa 15–30 g, é bilateral e lobulada e tem partes superficial e profunda. A parótida é serosa; a submandibular é predominantemente serosa e parcialmente mucosa, e a sublingual é quase totalmente mucosa. A parótida fica sobre o masseter e à frente do esternocleidomastóideo. Uma parótida acessória fica acima do ducto, que cruza o masseter em direção ao bucinador. A artéria e a veia faciais passam perto da glândula submandibular abaixo.'),
          t('The superficial part lies on the posterior cheek; the deep part lies between the ramus of the mandible and the sternocleidomastoid. The apex of the superficial parotid points toward the submandibular gland.',
            'A parte superficial fica na bochecha posterior; a parte profunda fica entre o ramo da mandíbula e o esternocleidomastóideo. O ápice da parótida superficial aponta para a glândula submandibular.'),
        ],
      },
      {
        id: 'salivary-p007', ref: '7–8', title: t('Deep part of the parotid and its relations', 'Parte profunda da parótida e suas relações'),
        focus: ['submandibular_gland'], ghost: ['stylopharyngeus'], view: 'ant',
        body: [
          t('The deep part: its anteromedial surface is grooved by the posterior border of the ramus of the mandible. It covers the posteroinferior part of the masseter and the lateral aspect of the temporomandibular joint (TMJ). It passes forward to reach the medial pterygoid muscle.',
            'A parte profunda: sua face anteromedial é sulcada pela borda posterior do ramo da mandíbula. Ela cobre a parte posteroinferior do masseter e a face lateral da articulação temporomandibular (ATM). Avança para a frente até alcançar o músculo pterigoide medial.'),
          t('The temporalis lies beneath the superficial and deep temporal fascia. The zygomatic arch and articular disc lie above the temporomandibular joint. The parotid duct crosses the superficial and deep masseter toward the buccinator and facial expression muscles. Deep to the gland are the medial and lateral pterygoids and lateral pterygoid plate, hamulus, choanae, cartilaginous auditory tube, sphenomandibular ligament, otic ganglion and masseteric and auriculotemporal nerves. The deep parotid lies between the masseter and TMJ anteriorly, the zygomatic arch above and sternocleidomastoid posteriorly.',
            'O temporal fica sob as lâminas superficial e profunda da fáscia temporal. O arco zigomático e o disco articular ficam acima da articulação temporomandibular. O ducto parotídeo cruza as partes superficial e profunda do masseter em direção ao bucinador e aos músculos da expressão facial. Profundamente à glândula ficam os pterigoideos medial e lateral e a lâmina pterigoide lateral, o hâmulo, as coanas, a parte cartilaginosa da tuba auditiva, o ligamento esfenomandibular, o gânglio ótico e os nervos massetérico e auriculotemporal. A parótida profunda fica entre o masseter e a ATM anteriormente, o arco zigomático acima e o esternocleidomastóideo posteriormente.'),
        ],
      },
      {
        id: 'salivary-p010', ref: '10–11', title: t('Superficial part of the parotid and its covering', 'Parte superficial da parótida e seu revestimento'),
        focus: ['submandibular_gland'], view: 'ant',
        body: [
          t('The triangular superficial part extends superiorly to the zygomatic arch and inferiorly to the mandibular angle. Its anterior limit is the anterior border of the masseter. Superficial fascia and skin cover it. Facial nerve branches run through the gland, and the parotid duct emerges from its anterior edge.',
            'A parte superficial, triangular, chega ao arco zigomático superiormente e ao ângulo da mandíbula inferiormente. Seu limite anterior é a borda anterior do masseter. A fáscia superficial e a pele a recobrem. Ramos do nervo facial atravessam a glândula, e o ducto parotídeo sai de sua borda anterior.'),
        ],
      },
      {
        id: 'salivary-p015', ref: '15', title: t('Shape of the superficial part and its borders', 'Forma da parte superficial e suas bordas'),
        focus: ['submandibular_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The superficial part is concave and shaped like a triangle, with the base upward and the apex downward. Its anterior border is the masseter, on which the gland partly projects. Its posterior border is the sternocleidomastoid. Its base is the cartilaginous part of the external acoustic meatus and the posterior aspect of the temporomandibular joint. Its apex points toward the submandibular gland, overlapping the posterior belly of the digastric and the carotid triangle. It is covered by superficial fascia and skin.',
            'A parte superficial é côncava e em forma de triângulo, com a base para cima e o ápice para baixo. Sua borda anterior é o masseter, sobre o qual a glândula se projeta em parte. Sua borda posterior é o esternocleidomastóideo. A base é a parte cartilaginosa do meato acústico externo e a face posterior da articulação temporomandibular. O ápice aponta para a glândula submandibular, sobrepondo-se ao ventre posterior do digástrico e ao triângulo carotídeo. É coberta pela fáscia superficial e pela pele.'),
          t('The parotid duct emerges anteriorly. The facial nerve exits the stylomastoid foramen and gives the posterior auricular nerve, a nerve to the posterior digastric belly and stylohyoid, and temporal, zygomatic, buccal, marginal mandibular and cervical branches.',
            'O ducto parotídeo emerge anteriormente. O nervo facial sai do forame estilomastóideo e dá o nervo auricular posterior, um nervo para o ventre posterior do digástrico e o estilo-hióideo, e os ramos temporal, zigomático, bucal, marginal da mandíbula e cervical.'),
        ],
      },
      {
        id: 'salivary-p013', ref: '13–14', title: t('Parotid capsule and the cervical fascia', 'Cápsula parotídea e a fáscia cervical'),
        focus: ['submandibular_gland'], ghost: ['stylopharyngeus'], view: 'ant',
        body: [
          t('The investing layer of deep cervical fascia splits into superficial and deep laminae around the parotid, forming its capsule. The platysma lies over the investing layer. The tympanic plate, styloid process and stylomandibular ligament lie deeply, and the zygomatic arch lies superficially. The superficial lamina is the parotidomasseteric fascia. Because the capsule encloses the gland tightly, acute inflammation can be very painful, especially during meals.',
            'A lâmina investidora da fáscia cervical profunda divide-se em lâminas superficial e profunda ao redor da parótida, formando sua cápsula. O platisma fica sobre a lâmina investidora. A lâmina timpânica, o processo estiloide e o ligamento estilomandibular ficam profundamente, e o arco zigomático superficialmente. A lâmina superficial é a fáscia parotidomassetérica. Como a cápsula envolve firmemente a glândula, a inflamação aguda pode ser muito dolorosa, sobretudo durante as refeições.'),
          t('In an anterior view of the cervical fascial layers, the parotid gland sits inside the yellow investing layer above the sternocleidomastoid and sternohyoid, while deeper layers exposed below include the muscular and visceral portions of the pretracheal layer, the carotid sheath and the prevertebral layer, bounded by the mandible above and the trapezius and clavicle below.',
            'Numa vista anterior das camadas fasciais do pescoço, a parótida fica dentro da camada investidora amarela acima do esternocleidomastóideo e do esterno-hióideo, enquanto camadas mais profundas expostas abaixo incluem as porções muscular e visceral da camada pré-traqueal, a bainha carotídea e a camada pré-vertebral, limitadas pela mandíbula acima e pelo trapézio e clavícula abaixo.'),
        ],
      },
    ],
    questions: [
      { ref: '5', q: 'What share of saliva does the parotid produce, and how much when stimulated?', correct: '20%, up to 50% when stimulated', wrong: ['65%, up to 80% when stimulated', '15%, up to 25% when stimulated', '10%, up to 15% when stimulated'], why: 'The parotid produces 20% of saliva; when stimulated it can reach 50%.', pt: { q: 'Qual parte da saliva a parótida produz, e quanto quando estimulada?', correct: '20%, até 50% quando estimulada', wrong: ['65%, até 80% quando estimulada', '15%, até 25% quando estimulada', '10%, até 15% quando estimulada'], why: 'A parótida produz 20% da saliva; estimulada, pode chegar a 50%.' } },
      { ref: '5', q: 'What is the character of the parotid secretion?', correct: 'Totally serous, rich in enzymes', wrong: ['Almost completely mucous', 'Mostly mucous with serous demilunes', 'Mixed, with equal serous and mucous parts'], why: 'The parotid is totally serous and its secretion is rich in enzymes released into the vestibule.', pt: { q: 'Qual é o caráter da secreção parotídea?', correct: 'Totalmente serosa, rica em enzimas', wrong: ['Quase totalmente mucosa', 'Predominantemente mucosa com semiluas serosas', 'Mista, com partes serosa e mucosa iguais'], why: 'A parótida é totalmente serosa e sua secreção é rica em enzimas liberadas no vestíbulo.' } },
      { ref: '6', q: 'Between which two structures does the deep part of the parotid lie?', correct: 'The ramus of the mandible and the sternocleidomastoid', wrong: ['The masseter and the buccinator', 'The mylohyoid and the digastric', 'The zygomatic arch and the maxilla'], why: 'The deep part lies between the ramus of the mandible and the sternocleidomastoid.', pt: { q: 'Entre quais duas estruturas fica a parte profunda da parótida?', correct: 'O ramo da mandíbula e o esternocleidomastóideo', wrong: ['O masseter e o bucinador', 'O milo-hióideo e o digástrico', 'O arco zigomático e a maxila'], why: 'A parte profunda fica entre o ramo da mandíbula e o esternocleidomastóideo.' } },
      { ref: '7', q: 'Which muscle does the deep part of the parotid cover posteroinferiorly?', correct: 'Masseter', wrong: ['Mylohyoid', 'Temporalis', 'Buccinator'], why: 'The deep part covers the posteroinferior part of the masseter and the lateral aspect of the TMJ.', pt: { q: 'Qual músculo a parte profunda da parótida cobre na porção posteroinferior?', correct: 'Masseter', wrong: ['Milo-hióideo', 'Temporal', 'Bucinador'], why: 'A parte profunda cobre a porção posteroinferior do masseter e a face lateral da ATM.' } },
      { ref: '15', q: 'What does the apex of the superficial parotid point toward?', correct: 'The submandibular gland', wrong: ['The sublingual gland', 'The pterygoid plexus', 'The mandibular foramen'], why: 'The apex points towards the submandibular gland, overlapping the posterior belly of the digastric.', pt: { q: 'Para o que aponta o ápice da parte superficial da parótida?', correct: 'Glândula submandibular', wrong: ['Glândula sublingual', 'Plexo pterigóideo', 'Forame mandibular'], why: 'O ápice aponta para a glândula submandibular, sobrepondo-se ao ventre posterior do digástrico.' } },
      { ref: '13', q: 'Why is acute inflammation of the parotid so painful, especially at meals?', correct: 'The gland is enclosed in a parotid capsule', wrong: ['It is fed by a dense nerve plexus only', 'Its duct is blocked by bone', 'The gland lies directly on the TMJ'], why: 'The parotid is enclosed in a parotid capsule, so acute inflammation causes very severe pain, especially during meals.', pt: { q: 'Por que a inflamação aguda da parótida é tão dolorosa, sobretudo nas refeições?', correct: 'A glândula está envolvida por uma cápsula parotídea', wrong: ['É inervada só por um plexo nervoso denso', 'O ducto é bloqueado por osso', 'A glândula fica diretamente sobre a ATM'], why: 'A parótida fica envolvida por uma cápsula parotídea, então a inflamação aguda causa dor muito intensa, sobretudo nas refeições.' } },
    ],
  },
  {
    id: 'salivary-3', title: t('Parotid: facial nerve, duct and mumps', 'Parótida: nervo facial, ducto e caxumba'),
    cards: [
      {
        id: 'salivary-p009', ref: '9', title: t('Facial nerve and the innervation of the parotid', 'Nervo facial e a inervação da parótida'),
        focus: ['stylopharyngeus'], ghost: ['submandibular_gland'], view: 'ant',
        body: [
          t('The facial nerve emerges from the posterior margin of the deep surface and fans upward, forward and downward. Its branches divide the gland into deep and superficial parts.',
            'O nervo facial emerge da margem posterior da face profunda e se ramifica para cima, para frente e para baixo. Seus ramos dividem a glândula em partes profunda e superficial.'),
          t('The facial nerve supplies the muscles of facial expression; it does not innervate the gland. Autonomic innervation controlling saliva production comes from the glossopharyngeal nerve.',
            'O nervo facial inerva os músculos da expressão facial; não inerva a glândula. A inervação autônoma que controla a produção de saliva vem do nervo glossofaríngeo.'),
        ],
      },
      {
        id: 'salivary-p012', ref: '12', title: t('The facial nerve in parotid surgery', 'O nervo facial na cirurgia da parótida'),
        focus: ['stylopharyngeus'], ghost: ['superior_constrictor'], view: 'ant',
        body: [
          t('The risk: the facial nerve branches into the parotid, so it can be damaged when a parotid tumour is removed surgically. To identify the facial nerve, the surgeon first identifies the external, cartilaginous third of the external acoustic meatus.',
            'O risco: o nervo facial se ramifica dentro da parótida, então pode ser lesado na retirada cirúrgica de um tumor parotídeo. Para identificar o nervo facial, primeiro se identifica o terço externo, cartilaginoso, do meato acústico externo.'),
          t('The facial nerve trunk passes near the mastoid process into the parotid, behind the mandibular ramus and masseter and superficial to the medial pterygoid. It gives the posterior auricular nerve and a nerve to the posterior digastric belly and stylohyoid, then divides into temporofacial and cervicofacial divisions. Its terminal branches are temporal, zygomatic, buccal, marginal mandibular and cervical. The parotid plexus separates superficial and deep glandular parts. The superficial temporal vessels and sternocleidomastoid lie nearby.',
            'O tronco do nervo facial passa perto do processo mastoide até a parótida, atrás do ramo mandibular e do masseter e superficial ao pterigoideo medial. Dá o nervo auricular posterior e um nervo para o ventre posterior do digástrico e o estilo-hióideo, depois se divide em ramos temporofacial e cervicofacial. Seus ramos terminais são temporal, zigomático, bucal, marginal da mandíbula e cervical. O plexo parotídeo separa as partes superficial e profunda da glândula. Os vasos temporais superficiais e o esternocleidomastóideo ficam próximos.'),
        ],
      },
      {
        id: 'salivary-p016', ref: '16', title: t('Stensen’s duct and mumps', 'Ducto de Stensen e caxumba'),
        focus: ['tongue'], ghost: ['submandibular_gland'], view: 'ant',
        body: [
          t('The parotid (Stensen’s) duct arises from the anterior border of the gland and runs horizontally below and parallel to the zygomatic arch, superficial to masseter. An accessory parotid lies above it. The duct pierces the buccal fat, buccopharyngeal fascia, buccinator and mucosa, opening at the parotid papilla in the oral vestibule. The submandibular gland and duct lie below; a secretory branch reaches the parotid.',
            'O ducto parotídeo (de Stensen) origina-se na borda anterior da glândula e corre horizontalmente abaixo e paralelo ao arco zigomático, superficial ao masseter. Uma parótida acessória fica acima dele. O ducto atravessa a gordura bucal, a fáscia bucofaríngea, o bucinador e a mucosa, abrindo-se na papila parotídea no vestíbulo oral. A glândula e o ducto submandibulares ficam abaixo; um ramo secretor alcança a parótida.'),
          t('The mumps virus most often affects the parotid in children aged 5 to 9 years. In post-adolescent males it can affect the testicles and cause infertility.',
            'O vírus da caxumba afeta com mais frequência a parótida em crianças de 5 a 9 anos. Em homens pós-adolescentes pode atingir os testículos e causar infertilidade.'),
        ],
      },
    ],
    questions: [
      { ref: '9', q: 'Which nerve supplies the secretory (autonomic) innervation of the parotid?', correct: 'Glossopharyngeal nerve (CN IX)', wrong: ['Facial nerve (CN VII)', 'Hypoglossal nerve (CN XII)', 'Trigeminal nerve (CN V)'], why: 'The facial nerve does not innervate the gland; the autonomic supply comes from the glossopharyngeal nerve.', pt: { q: 'Qual nervo fornece a inervação secretora (autônoma) da parótida?', correct: 'Nervo glossofaríngeo (CN IX)', wrong: ['Nervo facial (CN VII)', 'Nervo hipoglosso (CN XII)', 'Nervo trigêmeo (CN V)'], why: 'O nervo facial não inerva a glândula; a inervação autônoma vem do glossofaríngeo.' } },
      { ref: '9', q: 'What does the facial nerve innervate?', correct: 'The muscles of facial expression', wrong: ['The parotid gland', 'The submandibular gland', 'The tongue taste buds'], why: 'The facial nerve does not innervate the gland; it innervates the muscles of facial expression.', pt: { q: 'O que o nervo facial inerva?', correct: 'Os músculos da mímica', wrong: ['A glândula parótida', 'A glândula submandibular', 'Os botões gustativos da língua'], why: 'O nervo facial não inerva a glândula; inerva os músculos da mímica.' } },
      { ref: '12', q: 'Which landmark is used to identify the facial nerve during parotid surgery?', correct: 'The outer cartilaginous third of the external acoustic meatus', wrong: ['The posterior belly of the digastric', 'The masseter muscle', 'The lingual nerve'], why: 'To identify the facial nerve, the external (cartilaginous) third of the external acoustic meatus is identified.', pt: { q: 'Qual referência é usada para identificar o nervo facial na cirurgia da parótida?', correct: 'O terço externo, cartilaginoso, do meato acústico externo', wrong: ['O ventre posterior do digástrico', 'O músculo masseter', 'O nervo lingual'], why: 'Para identificar o nervo facial, identifica-se o terço externo (cartilaginoso) do meato acústico externo.' } },
      { ref: '12', q: 'Which branches does the facial nerve give inside the parotid?', correct: 'Temporal, zygomatic, buccal, marginal mandibular and cervical', wrong: ['Lingual, hypoglossal and vagal', 'Mandibular, maxillary and ophthalmic', 'Chorda tympani and otic'], why: 'Branches — temporal, zygomatic, buccal, marginal mandibular and cervical.', pt: { q: 'Quais ramos o nervo facial dá dentro da parótida?', correct: 'Temporal, zigomáticos, bucais, marginal da mandíbula e cervical', wrong: ['Lingual, hipoglosso e vagais', 'Mandibular, maxilar e oftálmico', 'Corda do tímpano e óticos'], why: 'Ramos — temporal, zigomáticos, bucais, marginal da mandíbula e cervical.' } },
      { ref: '16', q: 'Where does the parotid duct open into the mouth?', correct: 'Into the vestibule at the parotid papilla', wrong: ['Into the sublingual fold', 'Beside the frenulum of the tongue', 'Into the pharynx at the tonsil'], why: 'The parotid duct opens into the vestibule of the mouth at the parotid papilla.', pt: { q: 'Onde o ducto parotídeo se abre na boca?', correct: 'No vestíbulo, na papila parotídea', wrong: ['Na prega sublingual', 'Ao lado do frênulo da língua', 'Na faringe, na tonsila'], why: 'O ducto parotídeo se abre no vestíbulo da boca, na papila parotídea.' } },
      { ref: '16', q: 'In which age group does the mumps virus most often affect the parotid?', correct: 'Children aged 5 to 9', wrong: ['Adults over 40', 'Newborns', 'Teenagers only'], why: 'Mumps most frequently affects the parotid gland in children aged 5 to 9 years.', pt: { q: 'Em qual faixa etária o vírus da caxumba mais afeta a parótida?', correct: 'Crianças de 5 a 9 anos', wrong: ['Adultos acima de 40 anos', 'Recém-nascidos', 'Apenas adolescentes'], why: 'A caxumba afeta a parótida sobretudo em crianças de 5 a 9 anos.' } },
      { ref: '16', q: 'What can mumps affect in post-adolescent males?', correct: 'The testicles, causing infertility', wrong: ['The thyroid, causing goitre', 'The eyes, causing blindness', 'The heart valves'], why: 'In post-adolescent males mumps can affect the testicles and cause infertility.', pt: { q: 'O que a caxumba pode afetar em homens pós-adolescentes?', correct: 'Os testículos, causando infertilidade', wrong: ['A tireoide, causando bócio', 'Os olhos, causando cegueira', 'As valvas cardíacas'], why: 'Em homens pós-adolescentes a caxumba pode atingir os testículos e causar infertilidade.' } },
    ],
  },
  {
    id: 'salivary-4', title: t('Parotid: blood supply, drainage and passing structures', 'Parótida: irrigação, drenagem e estruturas que a atravessam'),
    cards: [
      {
        id: 'salivary-p026', ref: '26', title: t('Arteries of the parotid', 'Artérias da parótida'),
        focus: ['submandibular_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The arterial supply of the parotid comes from branches of the external carotid next to the gland, together with the transverse facial artery, which is the first branch of the superficial temporal artery. These vessels form a rich capillary network around the acini, the secretory units of the gland.',
            'O suprimento arterial da parótida vem de ramos da carótida externa vizinhos à glândula, junto com a artéria facial transversa, que é o primeiro ramo da artéria temporal superficial. Esses vasos formam uma rede capilar rica em volta dos ácinos, as unidades secretoras da glândula.'),
          t('Inside the parotid, the external carotid artery gives off the posterior auricular artery and ends as the superficial temporal and maxillary arteries. Its other branches in this region include the superior thyroid, ascending pharyngeal, lingual, facial and occipital arteries; a parotid branch arises near the posterior auricular and occipital arteries.',
            'Dentro da parótida, a carótida externa dá a artéria auricular posterior e termina nas artérias temporal superficial e maxilar. Seus outros ramos na região incluem as artérias tireóidea superior, faríngea ascendente, lingual, facial e occipital; um ramo parotídeo nasce perto das artérias auricular posterior e occipital.'),
        ],
      },
      {
        id: 'salivary-p027', ref: '27', title: t('Venous drainage of the parotid', 'Drenagem venosa da parótida'),
        focus: ['submandibular_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The superficial temporal and maxillary veins unite as the retromandibular vein, which descends through the parotid. Its anterior branch joins the facial vein; its posterior branch joins the posterior auricular vein to form the external jugular vein. The parotid drains into the external jugular vein.',
            'As veias temporal superficial e maxilar unem-se para formar a veia retromandibular, que desce pela parótida. Seu ramo anterior une-se à veia facial; o posterior une-se à veia auricular posterior para formar a jugular externa. A parótida drena para a jugular externa.'),
          t('The retromandibular vein lies in the parotid beneath its fascia, alongside the external carotid artery and facial nerve (VII). The internal carotid artery and internal jugular vein lie deeper; the external jugular descends below. Superficial parotid and lateral cervical nodes drain the region.',
            'A veia retromandibular fica na parótida sob sua fáscia, junto à carótida externa e ao nervo facial (VII). A carótida interna e a jugular interna ficam mais profundas; a jugular externa desce abaixo. Linfonodos parotídeos superficiais e cervicais laterais drenam a região.'),
        ],
      },
      {
        id: 'salivary-p028', ref: '28–30', title: t('Structures that pass through the parotid', 'Estruturas que atravessam a parótida'),
        focus: ['submandibular_gland'], ghost: ['stylopharyngeus', 'tongue'], view: 'ant',
        body: [
          t('The external carotid artery, retromandibular vein and facial nerve pass through the parotid. The gland is enclosed by parotid fascia beneath skin and subcutaneous tissue. It extends from the masseter and mandibular ramus anteriorly to the sternocleidomastoid and mastoid process posteriorly. Deeply it reaches past the styloid process and medial pterygoid toward the internal carotid artery, internal jugular vein and posterior digastric belly. Superficial parotid nodes lie on its surface.',
            'A artéria carótida externa, a veia retromandibular e o nervo facial atravessam a parótida. A fáscia parotídea envolve a glândula sob a pele e o tecido subcutâneo. Ela se estende do masseter e ramo da mandíbula anteriormente ao esternocleidomastóideo e processo mastoide posteriormente. Profundamente alcança além do processo estiloide e do pterigoideo medial, em direção à carótida interna, à jugular interna e ao ventre posterior do digástrico. Linfonodos parotídeos superficiais ficam em sua superfície.'),
          t('The structures crossing the parotid lie from superficial to deep in this order: facial nerve (VII), retromandibular vein and external carotid artery. They pass between its superficial and deep parts.',
            'As estruturas que atravessam a parótida ficam, de superficial para profundo, nesta ordem: nervo facial (VII), veia retromandibular e artéria carótida externa. Elas passam entre as partes superficial e profunda da glândula.'),
        ],
      },
    ],
    questions: [
      { ref: '26', q: 'Which artery is the first branch of the superficial temporal and supplies the parotid?', correct: 'Transverse facial artery', wrong: ['Posterior auricular artery', 'Lingual artery', 'Occipital artery'], why: 'The transverse facial artery is the first branch of the superficial temporal artery and supplies the parotid.', pt: { q: 'Qual artéria é o primeiro ramo da temporal superficial e irriga a parótida?', correct: 'Artéria facial transversa', wrong: ['Artéria auricular posterior', 'Artéria lingual', 'Artéria occipital'], why: 'A artéria facial transversa é o primeiro ramo da temporal superficial e irriga a parótida.' } },
      { ref: '26', q: 'Which branch does the external carotid give off inside the parotid?', correct: 'Posterior auricular artery', wrong: ['Lingual artery', 'Facial artery', 'Superior thyroid artery'], why: 'When the external carotid is in the parotid it emits the posterior auricular artery.', pt: { q: 'Qual ramo a carótida externa dá dentro da parótida?', correct: 'Artéria auricular posterior', wrong: ['Artéria lingual', 'Artéria facial', 'Artéria tireóidea superior'], why: 'Dentro da parótida, a carótida externa emite a artéria auricular posterior.' } },
      { ref: '27', q: 'Which two veins form the retromandibular vein?', correct: 'Superficial temporal and maxillary veins', wrong: ['Facial and lingual veins', 'Posterior auricular and occipital veins', 'Internal jugular and sublingual veins'], why: 'The superficial temporal and maxillary veins form the retromandibular vein.', pt: { q: 'Quais duas veias formam a veia retromandibular?', correct: 'Veias temporal superficial e maxilar', wrong: ['Veias facial e lingual', 'Veias auricular posterior e occipital', 'Veias jugular interna e sublingual'], why: 'As veias temporal superficial e maxilar formam a veia retromandibular.' } },
      { ref: '27', q: 'Into which vein does the parotid ultimately drain?', correct: 'External jugular vein', wrong: ['Internal jugular vein', 'Facial vein', 'Brachiocephalic vein'], why: 'The posterior branch of the retromandibular vein joins the posterior auricular vein to form the external jugular vein.', pt: { q: 'Em qual veia a parótida drena no fim?', correct: 'Veia jugular externa', wrong: ['Veia jugular interna', 'Veia facial', 'Veia braquiocefálica'], why: 'O ramo posterior da veia retromandibular se une à auricular posterior para formar a jugular externa.' } },
      { ref: '28', q: 'Which three structures pass through the parotid?', correct: 'External carotid artery, retromandibular vein and facial nerve', wrong: ['Lingual artery, hypoglossal nerve and submental vein', 'Maxillary artery, glossopharyngeal nerve and facial vein', 'Facial artery, vagus nerve and angular vein'], why: 'The parotid is traversed by the external carotid artery, the retromandibular vein and the facial nerve.', pt: { q: 'Quais três estruturas atravessam a parótida?', correct: 'Artéria carótida externa, veia retromandibular e nervo facial', wrong: ['Artéria lingual, nervo hipoglosso e veia submentual', 'Artéria maxilar, nervo glossofaríngeo e veia facial', 'Artéria facial, nervo vago e veia angular'], why: 'A parótida é atravessada pela artéria carótida externa, pela veia retromandibular e pelo nervo facial.' } },
    ],
  },
  {
    id: 'salivary-5', title: t('Submandibular gland and its duct', 'Glândula submandibular e seu ducto'),
    cards: [
      {
        id: 'salivary-p017', ref: '17', title: t('Submandibular gland: secretion and size', 'Glândula submandibular: secreção e tamanho'),
        focus: ['submandibular_gland'], ghost: ['tongue', 'teeth'], view: 'ant',
        body: [
          t('The submandibular gland produces 65% of saliva, and its secretion is predominantly serous, but also mucous. The gland is the size of a walnut and weighs 7 to 8 g.',
            'A glândula submandibular produz 65% da saliva, e sua secreção é predominantemente serosa, mas também mucosa. A glândula tem o tamanho de uma noz e pesa de 7 a 8 g.'),
          t('The submandibular gland lies beneath the mandibular body against the mylohyoid and hyoglossus, between the digastric bellies and below the parotid. On the medial mandible, the mylohyoid line separates the submandibular fossa below from the sublingual fossa above and anteriorly. The digastric fossa and superior and inferior mental spines are nearby. The parotid is serous, the submandibular mostly serous and partly mucous, and the sublingual almost entirely mucous.',
            'A glândula submandibular fica sob o corpo da mandíbula, junto ao milo-hióideo e hioglosso, entre os ventres do digástrico e abaixo da parótida. Na face medial da mandíbula, a linha milo-hióidea separa a fossa submandibular abaixo da fossa sublingual acima e anteriormente. A fossa digástrica e as espinhas mentais superior e inferior ficam próximas. A parótida é serosa, a submandibular principalmente serosa e parcialmente mucosa, e a sublingual quase totalmente mucosa.'),
        ],
      },
      {
        id: 'salivary-p018', ref: '18–19', title: t('Two parts of the submandibular gland: the superficial part', 'Duas partes da glândula submandibular: a parte superficial'),
        focus: ['submandibular_gland'], ghost: ['sublingual_gland'], view: 'ant',
        body: [
          t('The gland has a large superficial part and a small deep part, continuous around the posterior margin of mylohyoid. This bend lies beside the hyoglossus and genioglossus. The submandibular duct runs forward toward the sublingual gland.',
            'A glândula tem uma parte superficial grande e uma profunda pequena, contínuas ao redor da margem posterior do milo-hióideo. Essa curva fica ao lado do hioglosso e do genioglosso. O ducto submandibular corre para a frente em direção à glândula sublingual.'),
          t('The superficial part is wedge-shaped and lies in the submandibular triangle, between the mandible and the two digastric bellies. It reaches the anterior belly anteriorly, the mandibular angle posteriorly and the mylohyoid line superiorly. Inferiorly it overlaps both bellies. The masseter lies nearby.',
            'A parte superficial tem forma de cunha e fica no triângulo submandibular, entre a mandíbula e os dois ventres do digástrico. Alcança o ventre anterior anteriormente, o ângulo da mandíbula posteriormente e a linha milo-hióidea superiormente. Inferiormente sobrepõe os dois ventres. O masseter fica próximo.'),
        ],
      },
      {
        id: 'salivary-p020', ref: '20', title: t('Deep part of the submandibular gland', 'Parte profunda da glândula submandibular'),
        focus: ['submandibular_gland', 'sublingual_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The small deep part lies deep to mylohyoid, reaches the posterior sublingual gland anteriorly and lies between the lingual nerve above and hypoglossal nerve below. The gland and duct run forward above mylohyoid and geniohyoid, near hyoglossus. The hyoid body and horns lie posteriorly. The superior mental spine gives origin to genioglossus. The inferior alveolar nerve and artery and the nerve and artery to mylohyoid lie nearby.',
            'A pequena parte profunda fica profunda ao milo-hióideo, alcança anteriormente a parte posterior da glândula sublingual e situa-se entre o nervo lingual acima e o hipoglosso abaixo. A glândula e o ducto seguem para a frente acima do milo-hióideo e do gênio-hióideo, perto do hioglosso. O corpo e os cornos do hioide ficam posteriormente. A espinha mental superior dá origem ao genioglosso. O nervo e a artéria alveolares inferiores e o nervo e a artéria do milo-hióideo ficam próximos.'),
        ],
      },
      {
        id: 'salivary-p021', ref: '21–22', title: t('The submandibular duct', 'O ducto submandibular'),
        focus: ['submandibular_gland', 'tongue'], view: 'ant',
        body: [
          t('The submandibular duct is 5 cm long. It emerges from the medial surface of the superficial part, crosses the deep part and runs forward in the floor of the mouth. It passes beneath the lingual nerve, above the mylohyoid and geniohyoid, toward the sublingual gland.',
            'O ducto submandibular tem 5 cm de comprimento. Emerge da face medial da parte superficial, cruza a parte profunda e segue para a frente no assoalho da boca. Passa sob o nervo lingual, acima do milo-hióideo e do gênio-hióideo, em direção à glândula sublingual.'),
          t('The submandibular duct opens at the summit of the sublingual papilla in the floor of the mouth, beside the lingual frenulum. A papilla lies on each side of the frenulum.',
            'O ducto submandibular abre-se no ápice da papila sublingual no assoalho da boca, ao lado do frênulo lingual. Há uma papila de cada lado do frênulo.'),
        ],
      },
      {
        id: 'salivary-p031', ref: '31', title: t('Blood supply and drainage of the submandibular gland', 'Irrigação e drenagem da glândula submandibular'),
        focus: ['submandibular_gland'], ghost: ['tongue'], view: 'ant',
        body: [
          t('The submandibular gland receives branches of the facial artery and drains into the facial vein. The facial artery also gives ascending palatine, tonsillar, submental, labial, angular and dorsal nasal branches. The external carotid gives the facial, superior thyroid, lingual, ascending pharyngeal, maxillary and superficial temporal arteries. The facial vein drains to the internal jugular vein. Nearby venous pathways include the external and anterior jugular, dural sinuses, superficial temporal, suprascapular, subclavian and left brachiocephalic veins.',
            'A glândula submandibular recebe ramos da artéria facial e drena para a veia facial. A artéria facial também dá ramos palatino ascendente, tonsilar, submentual, labiais, angular e nasal dorsal. A carótida externa dá as artérias facial, tireóidea superior, lingual, faríngea ascendente, maxilar e temporal superficial. A veia facial drena para a jugular interna. Vias venosas próximas incluem as jugulares externa e anterior, os seios durais e as veias temporal superficial, supraescapular, subclávia e braquiocefálica esquerda.'),
        ],
      },
    ],
    questions: [
      { ref: '17', q: 'What share of saliva does the submandibular gland produce?', correct: '65%', wrong: ['20%', '15%', '50%'], why: 'The submandibular gland produces 65% of saliva.', pt: { q: 'Qual parte da saliva a glândula submandibular produz?', correct: '65%', wrong: ['20%', '15%', '50%'], why: 'A glândula submandibular produz 65% da saliva.' } },
      { ref: '17', q: 'How big is the submandibular gland and how much does it weigh?', correct: 'Walnut-sized, 7–8 g', wrong: ['Pea-sized, 1 g', 'Fist-sized, 40 g', 'Grape-sized, 3 g'], why: 'The gland is the size of a walnut and weighs 7–8 g.', pt: { q: 'Qual o tamanho da glândula submandibular e quanto ela pesa?', correct: 'Tamanho de uma noz, 7–8 g', wrong: ['Tamanho de uma ervilha, 1 g', 'Tamanho de um punho, 40 g', 'Tamanho de uma uva, 3 g'], why: 'A glândula tem o tamanho de uma noz e pesa 7–8 g.' } },
      { ref: '19', q: 'The superficial part of the submandibular gland overlaps which structure inferiorly?', correct: 'Both bellies of the digastric muscle', wrong: ['The masseter', 'The mylohyoid only', 'The platysma'], why: 'Inferiorly the superficial part overlaps the two bellies of the digastric.', pt: { q: 'A parte superficial da glândula submandibular se sobrepõe, inferiormente, a qual estrutura?', correct: 'Aos dois ventres do músculo digástrico', wrong: ['Ao masseter', 'Apenas ao milo-hióideo', 'Ao platisma'], why: 'Inferiormente a parte superficial se sobrepõe aos dois ventres do digástrico.' } },
      { ref: '20', q: 'Between which two nerves does the deep part of the submandibular gland lie?', correct: 'Lingual nerve above and hypoglossal nerve below', wrong: ['Facial nerve above and vagus nerve below', 'Mandibular nerve above and glossopharyngeal below', 'Chorda tympani above and phrenic below'], why: 'The deep part lies between the lingual nerve above and the hypoglossal nerve below.', pt: { q: 'Entre quais dois nervos fica a parte profunda da glândula submandibular?', correct: 'Nervo lingual acima e nervo hipoglosso abaixo', wrong: ['Nervo facial acima e nervo vago abaixo', 'Nervo mandibular acima e glossofaríngeo abaixo', 'Corda do tímpano acima e frênico abaixo'], why: 'A parte profunda fica entre o nervo lingual, acima, e o nervo hipoglosso, abaixo.' } },
      { ref: '21', q: 'How long is the submandibular duct?', correct: '5 cm', wrong: ['1 cm', '10 cm', '2 cm'], why: 'The submandibular duct is 5 cm long.', pt: { q: 'Qual o comprimento do ducto submandibular?', correct: '5 cm', wrong: ['1 cm', '10 cm', '2 cm'], why: 'O ducto submandibular tem 5 cm.' } },
      { ref: '22', q: 'Where does the submandibular duct open?', correct: 'On the summit of the sublingual papilla, beside the frenulum of the tongue', wrong: ['On the sublingual fold, at its lower edge', 'At the parotid papilla in the vestibule', 'In the middle of the dorsum of the tongue'], why: 'It opens on the summit of the sublingual papilla, at the side of the frenulum of the tongue.', pt: { q: 'Onde o ducto submandibular se abre?', correct: 'No ápice da papila sublingual, ao lado do frênulo da língua', wrong: ['Na prega sublingual, na borda inferior', 'Na papila parotídea, no vestíbulo', 'No meio do dorso da língua'], why: 'Abre-se no ápice da papila sublingual, ao lado do frênulo da língua.' } },
    ],
  },
  {
    id: 'salivary-6', title: t('Sublingual gland and its clinical examination', 'Glândula sublingual e o exame clínico'),
    cards: [
      {
        id: 'salivary-p023', ref: '23', title: t('Sublingual gland: position and relations', 'Glândula sublingual: posição e relações'),
        focus: ['sublingual_gland'], ghost: ['tongue', 'submandibular_gland'], view: 'ant',
        body: [
          t('The sublingual gland is the smallest of the three major salivary glands. It produces about 5% of saliva (the class material says 15%; Guyton & Hall and Moore give about 5%), and its secretion is almost all mucous. Each gland is narrow, flat and almond-shaped, and weighs 4 g. It lies on the mylohyoid and is covered by the mucosa of the floor of the mouth. Its lateral face sits in the sublingual groove of the mandible.',
            'A glândula sublingual é a menor das três glândulas salivares maiores. Produz cerca de 5% da saliva (o material da aula diz 15%; Guyton & Hall e Moore dão cerca de 5%), e sua secreção é quase toda mucosa. Cada glândula é estreita, achatada e em forma de amêndoa, e pesa 4 g. Fica sobre o milo-hióideo e é coberta pela mucosa do assoalho da boca. Sua face lateral se encaixa no sulco sublingual da mandíbula.'),
          t('The medial face of the sublingual gland relates to genioglossus, the sublingual artery, submandibular duct and lingual nerve. It rests on mylohyoid in the sublingual fossa, above the mylohyoid line; the submandibular fossa lies below. Nearby are the superior mental spine for genioglossus, geniohyoid, hyoglossus, nerve and artery to mylohyoid and hyoid bone. The parotid and submandibular glands also drain through their own ducts.',
            'A face medial da glândula sublingual relaciona-se com o genioglosso, a artéria sublingual, o ducto submandibular e o nervo lingual. Ela repousa sobre o milo-hióideo na fossa sublingual, acima da linha milo-hióidea; a fossa submandibular fica abaixo. Perto dela estão a espinha mental superior para o genioglosso, o gênio-hióideo, o hioglosso, o nervo e a artéria do milo-hióideo e o hioide. As glândulas parótida e submandibular também drenam por seus próprios ductos.'),
        ],
      },
      {
        id: 'salivary-p024', ref: '24', title: t('Sublingual ducts', 'Ductos sublinguais'),
        focus: ['sublingual_gland', 'tongue'], ghost: ['submandibular_gland'], view: 'ant',
        body: [
          t('The gland has 8 to 20 ducts. The smaller sublingual ducts usually open separately, from the posterior part of the gland, onto the summit of the sublingual fold. A few sometimes open into the submandibular duct.',
            'A glândula tem de 8 a 20 ductos. Os ductos sublinguais menores costumam se abrir separadamente, a partir da parte posterior da glândula, no ápice da prega sublingual. Alguns poucos às vezes se abrem no ducto submandibular.'),
          t('The lesser sublingual ducts open along the sublingual fold; the greater duct joins near the sublingual caruncle. The submandibular gland and duct, lingual nerve, genioglossus, geniohyoid, mylohyoid, anterior digastric belly, medial pterygoid and hyoid lie nearby. The submandibular duct opens beside the lingual frenulum; the parotid duct opens in the vestibule.',
            'Os ductos sublinguais menores abrem-se ao longo da prega sublingual; o ducto maior une-se perto da carúncula sublingual. A glândula e o ducto submandibulares, o nervo lingual, o genioglosso, o gênio-hióideo, o milo-hióideo, o ventre anterior do digástrico, o pterigoideo medial e o hioide ficam próximos. O ducto submandibular abre-se ao lado do frênulo lingual; o ducto parotídeo abre-se no vestíbulo.'),
        ],
      },
      {
        id: 'salivary-p025', ref: '25', title: t('Bimanual examination of the salivary glands', 'Exame bimanual das glândulas salivares'),
        focus: ['submandibular_gland', 'sublingual_gland'], view: 'ant',
        body: [
          t('For the bimanual examination, the two salivary glands of the mandible, the submandibular gland and the sublingual gland, together with the adjacent lymph nodes, are grouped around the mobile floor of the mouth. For that reason they must be palpated against resistance, and this is done with a bimanual examination.',
            'No exame bimanual, as duas glândulas salivares da mandíbula, a submandibular e a sublingual, junto com os linfonodos vizinhos, ficam agrupadas em volta do assoalho móvel da boca. Por isso devem ser palpadas contra resistência, e isso é feito com o exame bimanual.'),
          t('The submandibular and sublingual glands and nearby lymph nodes can be palpated through the floor of the mouth.',
            'As glândulas submandibular e sublingual e os linfonodos próximos podem ser palpados pelo assoalho da boca.'),
        ],
      },
      {
        id: 'salivary-p032', ref: '32', title: t('Sublingual gland: artery, veins and innervation', 'Glândula sublingual: artéria, veias e inervação'),
        focus: ['sublingual_gland', 'tongue'], ghost: ['submandibular_gland'], view: 'ant',
        body: [
          t('The sublingual gland is supplied by the sublingual branch of the lingual artery. Its venous drainage runs from the sublingual vein into the lingual vein, and then into the internal jugular vein.',
            'A glândula sublingual é irrigada pelo ramo sublingual da artéria lingual. Sua drenagem venosa vai da veia sublingual para a veia lingual e depois para a veia jugular interna.'),
          t('The innervation is parasympathetic: fibres carried by the lingual nerve, originating from the submandibular ganglion. Both dissections trace these neurovascular bundles along the floor of the mouth: the lingual nerve carries the submandibular ganglion above the hyoglossus and hypoglossal nerve [XII], while the lingual artery and vein give off the sublingual artery (and deep lingual artery) between the mandible, hyoid bone, styloglossus, stylopharyngeus, stylohyoid and posterior belly of the digastric, alongside the glossopharyngeal nerve [IX], lingual nodes, occipital and carotid arteries, and the facial, submental and internal jugular veins.',
            'A inervação é parassimpática: fibras levadas pelo nervo lingual, originadas no gânglio submandibular. As duas dissecções acompanham esses feixes neurovasculares pelo assoalho da boca: o nervo lingual sustenta o gânglio submandibular acima do hioglosso e do nervo hipoglosso [XII], enquanto a artéria e veia linguais emitem a artéria sublingual (e a artéria lingual profunda) entre a mandíbula, o osso hioide, o estiloglosso, o estilofaríngeo, o estilo-hióideo e o ventre posterior do digástrico, ao lado do nervo glossofaríngeo [IX], dos linfonodos linguais, das artérias occipital e carótidas e das veias facial, submentual e jugular interna.'),
        ],
      },
    ],
    questions: [
      { ref: '23', q: 'What share of saliva is produced by the sublingual gland, and what is its secretion like?', correct: 'About 5%, almost all mucous', wrong: ['65%, mostly serous', '20%, totally serous', '50%, mixed'], why: 'The sublingual gland produces about 5% of saliva, almost all mucous (Guyton & Hall; Moore). The class material gives 15%.', pt: { q: 'Qual parte da saliva a glândula sublingual produz, e como é a secreção?', correct: 'Cerca de 5%, quase toda mucosa', wrong: ['65%, predominantemente serosa', '20%, totalmente serosa', '50%, mista'], why: 'A glândula sublingual produz cerca de 5% da saliva, quase toda mucosa (Guyton & Hall; Moore). O material da aula dá 15%.' } },
      { ref: '23', q: 'Which structure lies on the medial face of the sublingual gland?', correct: 'Genioglossus', wrong: ['Masseter', 'Digastric', 'Parotid duct'], why: 'The medial face is related to the genioglossus, the sublingual artery, the submandibular duct and the lingual nerve.', pt: { q: 'Qual estrutura fica na face medial da glândula sublingual?', correct: 'Genioglosso', wrong: ['Masseter', 'Digástrico', 'Ducto parotídeo'], why: 'A face medial se relaciona com o genioglosso, a artéria sublingual, o ducto submandibular e o nervo lingual.' } },
      { ref: '24', q: 'How many excretory ducts does the sublingual gland have?', correct: '8 to 20', wrong: ['1 to 3', '30 to 40', '2 to 5'], why: 'The gland has 8–20 excretory ducts.', pt: { q: 'Quantos ductos excretores tem a glândula sublingual?', correct: 'De 8 a 20', wrong: ['De 1 a 3', 'De 30 a 40', 'De 2 a 5'], why: 'A glândula tem 8–20 ductos excretores.' } },
      { ref: '25', q: 'Why are the submandibular and sublingual glands examined against resistance?', correct: 'They sit around the mobile floor of the mouth', wrong: ['They are fixed to the skull', 'They lie under the parotid', 'They are only palpable under anaesthesia'], why: 'The glands and the adjacent lymph nodes are grouped around the mobile oral floor, so they are palpated against resistance.', pt: { q: 'Por que as glândulas submandibular e sublingual são examinadas contra resistência?', correct: 'Ficam em volta do assoalho móvel da boca', wrong: ['Estão presas ao crânio', 'Ficam sob a parótida', 'Só são palpáveis sob anestesia'], why: 'As glândulas e os linfonodos vizinhos ficam em volta do assoalho móvel da boca, então são palpados contra resistência.' } },
      { ref: '32', q: 'Which artery supplies the sublingual gland?', correct: 'Sublingual branch of the lingual artery', wrong: ['Facial artery', 'Superior thyroid artery', 'Posterior auricular artery'], why: 'The sublingual gland is supplied by the sublingual branch of the lingual artery.', pt: { q: 'Qual artéria irriga a glândula sublingual?', correct: 'Ramo sublingual da artéria lingual', wrong: ['Artéria facial', 'Artéria tireóidea superior', 'Artéria auricular posterior'], why: 'A glândula sublingual é irrigada pelo ramo sublingual da artéria lingual.' } },
      { ref: '32', q: 'Where does the parasympathetic innervation of the sublingual gland come from?', correct: 'The submandibular ganglion, carried by the lingual nerve', wrong: ['The superior cervical sympathetic ganglion', 'The vagus nerve directly', 'The glossopharyngeal nerve directly'], why: 'Parasympathetic fibres carried by the lingual nerve from the submandibular ganglion.', pt: { q: 'De onde vem a inervação parassimpática da glândula sublingual?', correct: 'Do gânglio submandibular, levada pelo nervo lingual', wrong: ['Do gânglio cervical superior simpático', 'Diretamente do nervo vago', 'Diretamente do nervo glossofaríngeo'], why: 'Fibras parassimpáticas levadas pelo nervo lingual a partir do gânglio submandibular.' } },
    ],
  },
  {
    id: 'salivary-7', title: t('General and glandular histology', 'Histologia geral e das glândulas'),
    cards: [
      {
        id: 'salivary-p033', ref: '33–34', title: t('Solid and hollow organs and how vessels enter', 'Órgãos sólidos e ocos e a entrada dos vasos'),
        focus: ['submandibular_gland'], view: 'ant', contextOnly: true,
        body: [
          t('A solid organ is enclosed by a connective tissue capsule. Septa radiate inward from it and form the stroma, which supports vessels and nerves and divides the organ into lobes and lobules. The parenchyma is the typical component of the organ and may contain one or more tissues. Organs may also be hollow.',
            'Um órgão sólido é envolvido por uma cápsula de tecido conjuntivo. Septos irradiam dela para dentro e formam o estroma, que sustenta vasos e nervos e divide o órgão em lobos e lóbulos. O parênquima é o componente típico do órgão e pode conter um ou mais tecidos. Os órgãos também podem ser ocos.'),
          t('Blood vessels enter an organ through its capsule or its hilum. In the pancreas, arterial branches enter along the surface and capsule; in the kidney, the renal artery enters at the hilum.',
            'Os vasos sanguíneos entram em um órgão pela cápsula ou pelo hilo. No pâncreas, ramos arteriais entram pela superfície e cápsula; no rim, a artéria renal entra pelo hilo.'),
        ],
      },
      {
        id: 'salivary-p035', ref: '35–36', title: t('Architecture of the major salivary glands and gland classification', 'Arquitetura das glândulas salivares maiores e classificação'),
        focus: ['submandibular_gland', 'sublingual_gland'], view: 'ant', contextOnly: true,
        body: [
          t('A connective tissue capsule surrounds the major salivary glands. Septa extend inward and divide them into lobes and lobules; interlobar and interlobular septa carry vessels, nerves and large excretory ducts. This supporting stroma surrounds the parenchyma, which is branched and tubulo-acinar. The parotid has serous acini; the submandibular has serous and mucous acini; and the sublingual has mucous acini.',
            'Uma cápsula de tecido conjuntivo envolve as glândulas salivares maiores. Septos entram na glândula e a dividem em lobos e lóbulos; septos interlobares e interlobulares conduzem vasos, nervos e grandes ductos excretores. Esse estroma de sustentação envolve o parênquima, ramificado e túbulo-acinar. A parótida tem ácinos serosos; a submandibular tem ácinos serosos e mucosos; e a sublingual tem ácinos mucosos.'),
          t('Glands are classified as follows. Simple glands have unbranched ducts (simple tubular without duct, simple tubular with duct, simple branched tubular, simple coiled tubular, simple acinar or alveolar), and complex glands have branched ducts (branched tubular, branched acinar or alveolar, branched tubulo-acinar). The major salivary glands are branched tubulo-acinar.',
            'As glândulas se classificam assim. As glândulas simples têm ductos não ramificados (tubular simples sem ducto, tubular simples com ducto, tubular simples ramificada, tubular simples enrolada, acinosa ou alveolar simples), e as compostas têm ductos ramificados (tubular ramificada, acinosa ou alveolar ramificada, tubulo-acinosa ramificada). As glândulas salivares maiores são tubulo-acinosas ramificadas.'),
        ],
      },
      {
        id: 'salivary-p037', ref: '37–38', title: t('Serous and mucous end-pieces and the secretory products', 'Ácinos serosos e mucosos e os produtos secretados'),
        focus: ['submandibular_gland'], view: 'ant', contextOnly: true,
        body: [
          t('The parotid is serous, the submandibular mostly serous and partly mucous, and the sublingual almost entirely mucous. In a tubulo-acinar gland, serous end-pieces produce water, salts, α-amylase, peroxidase and proline-rich proteins. Mucous end-pieces produce water, salts, neutral glycoproteins, sialomucins and sulphomucins. A serous demilune is a cap of serous cells on a mucous end-piece in routine histological preparations.',
            'A parótida é serosa, a submandibular é principalmente serosa e parcialmente mucosa, e a sublingual é quase inteiramente mucosa. Em uma glândula túbulo-acinar, as unidades serosas produzem água, sais, α-amilase, peroxidase e proteínas ricas em prolina. As unidades mucosas produzem água, sais, glicoproteínas neutras, sialomucinas e sulfomucinas. Uma semilua serosa é uma cobertura de células serosas sobre uma unidade mucosa em preparações histológicas de rotina.'),
          t('Intercalated ducts lead into striated ducts and then interlobular excretory ducts. The ducts secrete immunoglobulin, lysozyme, kallikrein and K⁺, and reabsorb Na⁺ and Cl⁻. Myoepithelial cells surround the secretory units. Adrenergic and cholinergic axons branch around them; cholinergic axons contact intercalated and striated duct cells, and adrenergic axons accompany an arteriole.',
            'Os ductos intercalares conduzem aos estriados e depois aos ductos excretores interlobulares. Os ductos secretam imunoglobulina, lisozima, calicreína e K⁺ e reabsorvem Na⁺ e Cl⁻. Células mioepiteliais envolvem as unidades secretoras. Axônios adrenérgicos e colinérgicos ramificam-se ao redor delas; axônios colinérgicos contatam células dos ductos intercalares e estriados, e axônios adrenérgicos acompanham uma arteríola.'),
        ],
      },
      {
        id: 'salivary-p039', ref: '39–40', title: t('Duct sequence: intercalated, striated and excretory ducts', 'Sequência de ductos: intercalares, estriados e excretores'),
        focus: ['submandibular_gland'], view: 'ant', contextOnly: true,
        body: [
          t('At electron level, the cells are: serous cells with apical microvilli, pinocytotic vesicles, heterogeneous electron-dense secretory granules, an intercellular secretory canaliculus, tight junctions and a spherical nucleus; mucous cells with tight junctions, homogeneous electron-translucent secretory vesicles and a flattened basal nucleus (sometimes capped by a serous demilune); intercalated duct cells with a prominent apical web of microfilaments and an underlying process of a myoepithelial cell; and striated duct cells with a centrally located nucleus, mitochondria and infoldings of the basal plasma membrane that give the striated appearance.',
            'Em nível de elétron, as células são: células serosas com microvilosidades apicais, vesículas pinocíticas, grânulos secretores heterogêneos e eletrondensos, canalículo secretor intercelular, junções oclusivas e núcleo esférico; células mucosas com junções oclusivas, vesículas secretoras homogêneas e eletrontransparentes e núcleo basal achatado (por vezes cobertas por uma semilua serosa); células dos ductos intercalares com uma rede apical proeminente de microfilamentos e um prolongamento subjacente de célula mioepitelial; e células dos ductos estriados com núcleo central, mitocôndrias e dobras da membrana plasmática basal que dão o aspecto estriado.'),
          t('Intercalated ducts follow the terminal secretory unit. Their cuboidal cells secrete water and electrolytes. Striated ducts have basal cytoplasmic infoldings with many mitochondria. They secrete K⁺ and reabsorb excess Na⁺, making saliva hypotonic; they also secrete lysozyme and IgA. Cl⁻ is also reabsorbed, while kallikrein and immunoglobulin enter the duct. The interlobular excretory ducts follow.',
            'Os ductos intercalares seguem a unidade secretora terminal. Suas células cúbicas secretam água e eletrólitos. Os ductos estriados têm pregas basais do citoplasma com muitas mitocôndrias. Secretam K⁺ e reabsorvem o excesso de Na⁺, tornando a saliva hipotônica; também secretam lisozima e IgA. Cl⁻ também é reabsorvido, enquanto calicreína e imunoglobulina entram no ducto. Em seguida vêm os ductos excretores interlobulares.'),
        ],
      },
      {
        id: 'salivary-p041', ref: '41', title: t('Myoepithelial cells', 'Células mioepiteliais'),
        focus: ['submandibular_gland'], view: 'ant', contextOnly: true,
        body: [
          t('The myoepithelial cells wrap around the secretory unit. They surround the intercalated ducts and the adenomeres (end-pieces). Their contraction causes three things: the saliva is pushed out, the lumen is reduced, and the secretion pressure increases.',
            'As células mioepiteliais envolvem a unidade secretora. Elas envolvem os ductos intercalares e os adenômeros (ácinos). Sua contração causa três efeitos: a saliva é expelida, a luz é reduzida e a pressão de secreção aumenta.'),
        ],
      },
      {
        id: 'salivary-p042', ref: '42–45', title: t('Histology of the parotid, sublingual and submandibular glands', 'Histologia das glândulas parótida, sublingual e submandibular'),
        focus: ['submandibular_gland', 'sublingual_gland'], view: 'ant', contextOnly: true,
        body: [
          t('The parotid consists mainly of serous secretory units containing enzymes, arranged in lobules. Connective tissue septa extend from its capsule between lobules and carry vessels, nerves and large excretory ducts. Striated duct cells lie among the serous cells.',
            'A parótida consiste principalmente em unidades secretoras serosas que contêm enzimas, organizadas em lóbulos. Septos conjuntivos partem da cápsula entre os lóbulos e conduzem vasos, nervos e grandes ductos excretores. Células dos ductos estriados ficam entre as células serosas.'),
          t('The sublingual gland consists mostly of mucous acini, which stain poorly. Excretory ducts lie in fibrous septa with vessels and nerves. The amount of adipose tissue generally increases with age. The submandibular gland contains serous and mucous units, including mucous acini with serous demilunes.',
            'A glândula sublingual consiste principalmente em ácinos mucosos, que se coram pouco. Ductos excretores ficam nos septos fibrosos com vasos e nervos. A quantidade de tecido adiposo geralmente aumenta com a idade. A glândula submandibular contém unidades serosas e mucosas, incluindo ácinos mucosos com semiluas serosas.'),
        ],
      },
    ],
    questions: [
      { ref: '33', q: 'What encloses a solid organ?', correct: 'An outer capsule of connective tissue', wrong: ['A layer of epithelium', 'A serous membrane only', 'A shell of cartilage'], why: 'A solid organ is enclosed by an outer capsule of connective tissue, from which the stroma radiates.', pt: { q: 'O que envolve um órgão sólido?', correct: 'Uma cápsula externa de tecido conjuntivo', wrong: ['Uma camada de epitélio', 'Apenas uma membrana serosa', 'Uma casca de cartilagem'], why: 'Um órgão sólido é envolvido por uma cápsula externa de tecido conjuntivo, de onde irradia o estroma.' } },
      { ref: '34', q: 'Through which two routes can blood vessels enter an organ?', correct: 'Through the capsule or through the hilum', wrong: ['Through the ducts only', 'Through the mucosa only', 'Through the parenchyma from the skin'], why: 'Vessels enter through the capsule or through the hilum.', pt: { q: 'Por quais duas vias os vasos sanguíneos entram num órgão?', correct: 'Pela cápsula ou pelo hilo', wrong: ['Apenas pelos ductos', 'Apenas pela mucosa', 'Pelo parênquima, a partir da pele'], why: 'Os vasos entram pela cápsula ou pelo hilo.' } },
      { ref: '35', q: 'What kind of acini make up the parotid parenchyma?', correct: 'Serous', wrong: ['Mucous', 'Mixed serous and mucous', 'Striated'], why: 'The parotid parenchyma is made of serous acini.', pt: { q: 'Que tipo de ácinos forma o parênquima da parótida?', correct: 'Serosos', wrong: ['Mucosos', 'Mistos, serosos e mucosos', 'Estriados'], why: 'O parênquima da parótida é formado por ácinos serosos.' } },
      { ref: '35', q: 'What acini make up the submandibular parenchyma?', correct: 'Serous and mucous acini', wrong: ['Purely mucous acini', 'Purely serous acini', 'Myoepithelial cells'], why: 'The submandibular parenchyma is made of serous and mucous acini.', pt: { q: 'Que ácinos formam o parênquima da submandibular?', correct: 'Ácinos serosos e mucosos', wrong: ['Apenas ácinos mucosos', 'Apenas ácinos serosos', 'Células mioepiteliais'], why: 'O parênquima da submandibular é formado por ácinos serosos e mucosos.' } },
      { ref: '40', q: 'What do the striated ducts secrete and reabsorb to make saliva hypotonic?', correct: 'They secrete K+ and reabsorb excess Na+', wrong: ['They secrete Na+ and reabsorb K+', 'They secrete water only', 'They produce pepsinogen'], why: 'Striated ducts secrete K+ and reabsorb excess Na+, which makes saliva hypotonic.', pt: { q: 'O que os ductos estriados secretam e reabsorvem para deixar a saliva hipotônica?', correct: 'Secretam K+ e reabsorvem o Na+ em excesso', wrong: ['Secretam Na+ e reabsorvem K+', 'Secretam apenas água', 'Produzem pepsinogênio'], why: 'Os ductos estriados secretam K+ e reabsorvem o Na+ em excesso, o que torna a saliva hipotônica.' } },
      { ref: '40', q: 'What do the intercalated ducts secrete?', correct: 'Water and electrolytes', wrong: ['Mucin only', 'Amylase', 'Immunoglobulin only'], why: 'Intercalated ducts are cuboidal cells that secrete water and electrolytes.', pt: { q: 'O que os ductos intercalares secretam?', correct: 'Água e eletrólitos', wrong: ['Apenas mucina', 'Amilase', 'Apenas imunoglobulina'], why: 'Os ductos intercalares são células cúbicas que secretam água e eletrólitos.' } },
      { ref: '41', q: 'What does the contraction of myoepithelial cells do?', correct: 'Expels saliva, narrows the lumen and raises secretion pressure', wrong: ['Produces mucin', 'Dilates the duct', 'Stores fat'], why: 'Myoepithelial contraction expels saliva, reduces the lumen and increases secretion pressure.', pt: { q: 'O que faz a contração das células mioepiteliais?', correct: 'Expele a saliva, reduz a luz e aumenta a pressão de secreção', wrong: ['Produz mucina', 'Dilata o ducto', 'Armazena gordura'], why: 'A contração mioepitelial expele a saliva, reduz a luz e aumenta a pressão de secreção.' } },
      { ref: '43', q: 'With what does the amount of adipose tissue in the sublingual gland generally increase?', correct: 'Age', wrong: ['Pregnancy', 'Smoking', 'A high-salt diet'], why: 'The adipose portion of the sublingual gland generally increases with age.', pt: { q: 'Com o que costuma aumentar a quantidade de tecido adiposo na glândula sublingual?', correct: 'Idade', wrong: ['Gravidez', 'Tabagismo', 'Dieta rica em sal'], why: 'A porção adiposa da glândula sublingual costuma aumentar com a idade.' } },
    ],
  },
];
blocks.push(...supply.blocks);

// Table entries for the question rows are inline (pt on each row), so the
// PT map only carries the t() pairs above.
export const pt = { ...Object.fromEntries(Object.entries(PT).filter(([, value]) => value)), ...supply.pt };
