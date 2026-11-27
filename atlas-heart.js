import { COLORS, DECKS, DEFAULT_COLOR } from './subjects/cardio/data.js?v=115';
import { ITEMS, answers, fold, initStudy, shuffle } from './study.js?v=115';

const V = '?v=115';
const MAX_QUESTIONS = 8;
const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
));

// ---------------------------------------------------------------------------
// Language
// ---------------------------------------------------------------------------
const params = new URLSearchParams(location.search);
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('anatomy_language') || 'en'; } catch { /* storage unavailable */ }
const requested = params.get('lang');
let lang = requested === 'pt-BR' ? 'pt-BR' : requested === 'en' ? 'en'
  : savedLanguage === 'pt-BR' ? 'pt-BR' : 'en';
const L = (en, pt) => (lang === 'pt-BR' ? pt : en);

const STRINGS = {
  en: {
    eyebrow: 'Cardio · Atlas',
    title: 'Heart atlas',
    lede: 'Learn the heart, the aorta and the great vessels on the 3D model. Choose an area, read the names, then find them or type them from memory.',
    metaCount: '{structures} structures · {areas} areas',
    patientSides: 'L/R = patient’s',
    loading: 'Loading the 3D model…',
    viewerFailed: '3D view unavailable',
    retry: 'Try again',
    resetView: 'Reset view',
    rotate: 'Rotate',
    viewpoint: 'Model viewpoint',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    resetCamera: 'Reset the camera',
    rotateTitle: 'Auto-rotate the model',
    area: 'Area of study',
    mode: 'Mode',
    vessels: 'Vessels',
    modeExplore: 'Explore',
    modeFind: 'Find it',
    modeType: 'Type it',
    modeNoteExplore: 'Click a vessel on the model or in the list to read its name and where it belongs.',
    modeNoteFind: 'Read the name, then click that vessel on the model. Wrong clicks tell you what you touched.',
    modeNoteType: 'The vessel is highlighted on the model. Type its name from memory.',
    modeNoteFindGroup: 'Read the group name, then click any of its parts on the model.',
    modeNoteTypeGroup: 'The group is highlighted on the model. Type its name from memory.',
    listKey: 'Most important',
    listGeneral: 'General',
    listNoteKey: 'Key vessels, one at a time.',
    listNoteGeneral: 'Grouped sets, such as the coronary arteries or the aortic arch branches.',
    listCount: '{n} vessel',
    listCountPlural: '{n} vessels',
    listCountGroup: '{n} set',
    listCountGroupPlural: '{n} sets',
    parts: '{n} parts',
    partOne: '{n} part',
    practiceNote: 'Names are hidden while you practise. Switch to Explore to read the list.',
    exploreHint: 'Pick a name in the list or click any vessel on the model.',
    exploreSelect: 'Selected',
    groupEyebrow: 'Group',
    partOf: 'Part of {group}.',
    contextStructure: 'Supporting structure in this view.',
    members: 'Members',
    clear: 'Clear selection',
    findEyebrow: 'Find it',
    questionOf: 'Question {i} of {n}',
    clickThe: 'Click on the model:',
    showMe: 'Show me',
    showMeFeedback: 'Shown on the model: {name}. Click it to continue.',
    rightClick: 'Right — {name}.',
    wrongClick: 'You clicked {clicked}. Look for {target}.',
    wrongClickEmpty: 'No structure there. Rotate the model and try again.',
    next: 'Next',
    seeResult: 'See result',
    doneTitle: 'Area complete',
    doneNote: 'Try the same area again or move to the next one.',
    withoutHelp: 'without using a hint',
    again: 'Practise again',
    nextArea: 'Next area',
    typeEyebrow: 'Type it',
    whichVessel: 'Which vessel is highlighted?',
    whichSet: 'Which set is highlighted?',
    typeHint: 'Type the name and press Enter. Accents and capital letters are ignored.',
    typeHintSet: 'Type the set name and press Enter. Accents and capital letters are ignored.',
    answerLabel: 'Vessel name',
    answerLabelSet: 'Set name',
    check: 'Check answer',
    reveal: 'Reveal',
    rightName: 'Right — {name}.',
    tryAgain: 'Not quite. Try again, or reveal the answer.',
    answerIs: 'Answer: {name}',
    typeSomething: 'Type a name first.',
    noEntries: 'No structures in this area.',
    backMap: 'Back to the cardio map',
    theme: 'Theme settings',
    activity: 'Atlas activity',
    settings: 'Atlas settings',
    viewControls: 'Model view controls',
    canvasAria: '3D heart and blood vessels. Drag to rotate, scroll or pinch to zoom.',
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    accent: 'Accent',
    accentNames: ['Violet accent', 'Blue accent', 'Teal accent', 'Amber accent', 'Rose accent', 'Slate accent'],
  },
  'pt-BR': {
    eyebrow: 'Cardio · Atlas',
    title: 'Atlas do coração',
    lede: 'Aprenda o coração, a aorta e os grandes vasos no modelo 3D. Escolha uma área, leia os nomes e depois encontre-os ou digite-os de memória.',
    metaCount: '{structures} estruturas · {areas} áreas',
    patientSides: 'D/E = do paciente',
    loading: 'Carregando o modelo 3D…',
    viewerFailed: 'Visão 3D indisponível',
    retry: 'Tentar de novo',
    resetView: 'Recentralizar',
    rotate: 'Girar',
    viewpoint: 'Ponto de vista do modelo',
    zoomIn: 'Aproximar',
    zoomOut: 'Afastar',
    resetCamera: 'Recentralizar a câmera',
    rotateTitle: 'Girar o modelo automaticamente',
    area: 'Área de estudo',
    mode: 'Modo',
    vessels: 'Vasos',
    modeExplore: 'Explorar',
    modeFind: 'Encontrar',
    modeType: 'Digitar',
    modeNoteExplore: 'Clique num vaso no modelo ou na lista para ler o nome e a que grupo pertence.',
    modeNoteFind: 'Leia o nome e clique nesse vaso no modelo. Um clique errado mostra o que você tocou.',
    modeNoteType: 'O vaso está destacado no modelo. Digite o nome de memória.',
    modeNoteFindGroup: 'Leia o nome do conjunto e clique em qualquer uma de suas partes no modelo.',
    modeNoteTypeGroup: 'O conjunto está destacado no modelo. Digite o nome de memória.',
    listKey: 'Mais importantes',
    listGeneral: 'Gerais',
    listNoteKey: 'Vasos-chave, um a um.',
    listNoteGeneral: 'Conjuntos agrupados, como as artérias coronárias ou os ramos do arco aórtico.',
    listCount: '{n} vaso',
    listCountPlural: '{n} vasos',
    listCountGroup: '{n} conjunto',
    listCountGroupPlural: '{n} conjuntos',
    parts: '{n} partes',
    partOne: '{n} parte',
    practiceNote: 'Os nomes ficam ocultos durante a prática. Volte a Explorar para ler a lista.',
    exploreHint: 'Escolha um nome na lista ou clique num vaso do modelo.',
    exploreSelect: 'Selecionado',
    groupEyebrow: 'Conjunto',
    partOf: 'Parte de {group}.',
    contextStructure: 'Estrutura de apoio nesta vista.',
    members: 'Membros',
    clear: 'Limpar seleção',
    findEyebrow: 'Encontrar',
    questionOf: 'Pergunta {i} de {n}',
    clickThe: 'Clique no modelo:',
    showMe: 'Mostrar no modelo',
    showMeFeedback: 'Mostrado no modelo: {name}. Clique para continuar.',
    rightClick: 'Certo — {name}.',
    wrongClick: 'Você clicou em {clicked}. Procure {target}.',
    wrongClickEmpty: 'Nenhuma estrutura nesse ponto. Gire o modelo e tente de novo.',
    next: 'Próximo',
    seeResult: 'Ver resultado',
    doneTitle: 'Área concluída',
    doneNote: 'Tente a mesma área de novo ou siga para a próxima.',
    withoutHelp: 'sem usar dica',
    again: 'Praticar de novo',
    nextArea: 'Próxima área',
    typeEyebrow: 'Digitar',
    whichVessel: 'Qual vaso está destacado?',
    whichSet: 'Qual conjunto está destacado?',
    typeHint: 'Digite o nome e pressione Enter. Acentos e maiúsculas são ignorados.',
    typeHintSet: 'Digite o nome do conjunto e pressione Enter. Acentos e maiúsculas são ignorados.',
    answerLabel: 'Nome do vaso',
    answerLabelSet: 'Nome do conjunto',
    check: 'Verificar',
    reveal: 'Mostrar resposta',
    rightName: 'Certo — {name}.',
    tryAgain: 'Não foi dessa vez. Tente de novo ou mostre a resposta.',
    answerIs: 'Resposta: {name}',
    typeSomething: 'Digite um nome primeiro.',
    noEntries: 'Nenhuma estrutura nesta área.',
    backMap: 'Voltar ao mapa do cardio',
    theme: 'Configurações de tema',
    activity: 'Atividade do atlas',
    settings: 'Configurações do atlas',
    viewControls: 'Controles de visualização do modelo',
    canvasAria: 'Coração e vasos sanguíneos em 3D. Arraste para girar, role ou faça pinça para ampliar.',
    appearance: 'Aparência',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    accent: 'Cor de destaque',
    accentNames: ['Destaque violeta', 'Destaque azul', 'Destaque verde-água', 'Destaque âmbar', 'Destaque rosa', 'Destaque ardósia'],
  },
};

function t(key, vars) {
  let text = STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
  if (typeof text !== 'string') return text;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

// ---------------------------------------------------------------------------
// Area data. Only mesh ids present in models.json are used.
// key: the "Most important" list. groups: the "General" list.
// The area/group split follows SampleSize_1's Heart Atlas; all labels and
// id mappings here are written for this subject.
// ---------------------------------------------------------------------------
const AREAS = [
  {
    id: 'heart',
    label: ['Heart & coronaries', 'Coração e coronárias'],
    blurb: [
      'The four chambers, the valves, and the arteries and veins that run on the surface of the heart.',
      'As quatro câmaras, as valvas e as artérias e veias que percorrem a superfície do coração.',
    ],
    view: 'ant',
    context: [],
    groups: [
      {
        id: 'chambers',
        label: ['Chambers', 'Câmaras'],
        note: [
          'The right atrium and ventricle handle venous blood; the left atrium and ventricle handle oxygenated blood.',
          'O átrio e o ventrículo direitos recebem sangue venoso; o átrio e o ventrículo esquerdos, sangue oxigenado.',
        ],
        ids: ['ad', 'vd', 'ae', 've', 'paredev'],
      },
      {
        id: 'valves',
        label: ['Heart valves', 'Valvas cardíacas'],
        note: [
          'Tricuspid and mitral valves guard the inlets; pulmonary and aortic valves guard the outlets.',
          'As valvas tricúspide e mitral guardam as entradas; as valvas pulmonar e aórtica guardam as saídas.',
        ],
        ids: ['tri_ant', 'tri_post', 'tri_sep', 'mit_ant', 'mit_post', 'pulm_ant_d', 'pulm_ant_e', 'pulm_post', 'ao_ant', 'ao_post_d', 'ao_post_e'],
      },
      {
        id: 'papillary',
        label: ['Papillary muscles', 'Músculos papilares'],
        note: [
          'They tighten the chordae tendineae so the atrioventricular leaflets stay closed during systole.',
          'Eles tensionam as cordas tendíneas para manter as cúspides atrioventriculares fechadas na sístole.',
        ],
        ids: ['pap_vd_ant', 'pap_vd_post', 'pap_vd_sep', 'pap_ve_al', 'pap_ve_pm'],
      },
      {
        id: 'coronary',
        label: ['Coronary arteries', 'Artérias coronárias'],
        note: [
          'The left coronary artery divides into the LAD and circumflex; the right coronary artery runs in the right atrioventricular groove.',
          'A artéria coronária esquerda divide-se em DA e circunflexa; a coronária direita percorre o sulco atrioventricular direito.',
        ],
        ids: ['tce', 'dae', 'cx', 'acd', 'dp'],
      },
      {
        id: 'coronary-branches',
        label: ['Coronary branches', 'Ramos coronários'],
        note: [
          'Diagonal and septal branches of the LAD, the right marginal and ventricular branches, and the posterior descending artery.',
          'Ramos diagonais e septais da DA, os ramos marginais e ventriculares direitos e a artéria descendente posterior.',
        ],
        ids: ['diag', 'vent_ant_d_dae', 'cone_e', 'sept_da', 'sept_dp', 'marg_d', 'vent_ant_acd', 'vent_post_acd'],
      },
      {
        id: 'cardiac-veins',
        label: ['Cardiac veins', 'Veias cardíacas'],
        note: [
          'They drain the myocardium into the coronary sinus and the right atrium.',
          'Drenam o miocárdio para o seio coronário e o átrio direito.',
        ],
        ids: ['seio', 'vcmagna', 'vcmedia', 'vcparva', 'vpve'],
      },
    ],
    key: ['tce', 'dae', 'cx', 'acd', 'dp', 'marg_d', 'seio', 'vcmagna', 'vcmedia', 'vcparva'],
  },
  {
    id: 'aorta',
    label: ['Aorta & great vessels', 'Aorta e grandes vasos'],
    blurb: [
      'The aorta from its root to its thoracic descent, the branches of the arch, and the pulmonary circuit.',
      'A aorta da raiz à porção torácica descendente, os ramos do arco e a circulação pulmonar.',
    ],
    view: 'sup',
    context: ['ad', 'vd', 'ae', 've', 'paredev', 'traqueia'],
    contextOpacity: .14,
    frameIds: ['aoasc', 'arco', 'tbc', 'ccd', 'cce', 'scd', 'sce', 'tp', 'apd', 'ape', 'vcs', 'vbcd', 'vbce', 'vpsd', 'vpid', 'vpse', 'vpie'],
    groups: [
      {
        id: 'aorta',
        label: ['Aorta', 'Aorta'],
        note: [
          'Ascending aorta, aortic arch and descending thoracic aorta.',
          'Aorta ascendente, arco aórtico e aorta torácica descendente.',
        ],
        ids: ['aoasc', 'arco', 'aodesc'],
      },
      {
        id: 'arch',
        label: ['Aortic arch branches', 'Ramos do arco aórtico'],
        note: [
          'The brachiocephalic trunk divides into the right common carotid and right subclavian; the left common carotid and left subclavian arise directly from the arch.',
          'O tronco braquiocefálico divide-se em carótida comum direita e subclávia direita; a carótida comum esquerda e a subclávia esquerda nascem diretamente do arco.',
        ],
        ids: ['tbc', 'ccd', 'cce', 'scd', 'sce'],
      },
      {
        id: 'cavae',
        label: ['Venae cavae', 'Veias cavas'],
        note: [
          'The superior and inferior venae cavae return systemic blood to the right atrium.',
          'As veias cavas superior e inferior trazem o sangue sistêmico ao átrio direito.',
        ],
        ids: ['vcs', 'vci'],
      },
      {
        id: 'brachiocephalic',
        label: ['Brachiocephalic veins', 'Veias braquiocefálicas'],
        note: [
          'The right and left brachiocephalic veins join behind the right first costal cartilage to form the superior vena cava.',
          'As veias braquiocefálicas direita e esquerda unem-se atrás da primeira cartilagem costal direita para formar a veia cava superior.',
        ],
        ids: ['vbcd', 'vbce'],
      },
      {
        id: 'pulmonary-arteries',
        label: ['Pulmonary trunk & arteries', 'Tronco e artérias pulmonares'],
        note: [
          'The right ventricle sends venous blood to both lungs through the pulmonary trunk and its branches.',
          'O ventrículo direito envia sangue venoso aos dois pulmões pelo tronco pulmonar e seus ramos.',
        ],
        ids: ['tp', 'apd', 'ape', 'lobsupd'],
      },
      {
        id: 'pulmonary-veins',
        label: ['Pulmonary veins', 'Veias pulmonares'],
        note: [
          'Four pulmonary veins carry oxygenated blood from the lungs to the left atrium.',
          'Quatro veias pulmonares levam sangue oxigenado dos pulmões ao átrio esquerdo.',
        ],
        ids: ['vpsd', 'vpid', 'vpse', 'vpie'],
      },
    ],
    key: ['aoasc', 'arco', 'aodesc', 'tbc', 'ccd', 'scd', 'vcs', 'vci', 'tp', 'apd', 'ape'],
  },
  {
    id: 'thorax',
    label: ['Thorax', 'Tórax'],
    blurb: [
      'The chest-wall vessels, the intercostal arteries, the azygos system and the vessels of the diaphragm.',
      'Os vasos da parede torácica, as artérias intercostais, o sistema ázigo e os vasos do diafragma.',
    ],
    view: 'ant',
    context: [
      'ad', 'vd', 'ae', 've', 'paredev', 'traqueia', 'esofago', 'diafragma',
      'manubrio', 'esterno', 'xifoide', 'claviculas', 'cart_costais',
      'costela_1', 'costela_2', 'costela_4', 'costela_5', 'costelas_rest', 'vertebras_toracicas',
    ],
    groups: [
      {
        id: 'thoracic-aorta',
        label: ['Thoracic aorta', 'Aorta torácica'],
        note: [
          'The descending thoracic aorta gives esophageal, phrenic and posterior intercostal branches before it reaches the diaphragm.',
          'A aorta torácica descendente origina ramos esofágicos, frênicos e intercostais posteriores antes de atravessar o diafragma.',
        ],
        ids: ['aodesc', 'eso_art'],
      },
      {
        id: 'internal-thoracic',
        label: ['Internal thoracic & epigastric arteries', 'Artérias torácicas internas e epigástricas'],
        note: [
          'The internal thoracic artery runs behind the sternum and continues as the superior epigastric artery; musculophrenic branches follow the costal margin.',
          'A artéria torácica interna corre atrás do esterno e continua como artéria epigástrica superior; ramos musculofrênicos seguem a margem costal.',
        ],
        ids: ['ita_d', 'ita_e', 'mfa_d', 'mfa_e', 'aes_d', 'aes_e'],
      },
      {
        id: 'intercostal',
        label: ['Posterior intercostal arteries', 'Artérias intercostais posteriores'],
        note: [
          'They run under the ribs; the first two spaces are supplied by the supreme intercostal from the costocervical trunk, the rest by the descending aorta.',
          'Correm sob as costelas; os dois primeiros espaços recebem a intercostal suprema do tronco costocervical, os demais vêm da aorta descendente.',
        ],
        ids: ['pica_d1', 'pica_e1', 'pica_d2', 'pica_e2', 'pica_sup_d', 'pica_sup_e', 'pica_rest_d', 'pica_rest_e'],
      },
      {
        id: 'azygos',
        label: ['Azygos system', 'Sistema ázigo'],
        note: [
          'The azygos and hemiazygos veins drain the thoracic wall; the azygos arches over the right main bronchus into the superior vena cava.',
          'As veias ázigo e hemiázigo drenam a parede torácica; a ázigo passa sobre o brônquio principal direito e desemboca na veia cava superior.',
        ],
        ids: ['azigo', 'hemiazigo', 'azigo_acs'],
      },
      {
        id: 'thoracic-veins',
        label: ['Thoracic wall veins', 'Veias da parede torácica'],
        note: [
          'Anterior intercostal veins drain into the internal thoracic veins, which follow the arteries behind the sternum.',
          'As veias intercostais anteriores drenam para as veias torácicas internas, que acompanham as artérias atrás do esterno.',
        ],
        ids: ['itv_d', 'itv_e', 'icv_ant_d', 'icv_ant_e'],
      },
      {
        id: 'phrenic',
        label: ['Phrenic vessels', 'Vasos frênicos'],
        note: [
          'Inferior phrenic vessels supply the underside of the diaphragm; superior phrenic vessels come from the thoracic aorta above it.',
          'Os vasos frênicos inferiores irrigam a face inferior do diafragma; os superiores vêm da aorta torácica acima dele.',
        ],
        ids: ['phren_inf_a_d', 'phren_inf_a_e', 'phren_inf_v', 'phren_sup_v'],
      },
    ],
    key: ['aodesc', 'ita_d', 'ita_e', 'pica_rest_d', 'pica_rest_e', 'azigo', 'hemiazigo'],
  },
  {
    id: 'neck',
    label: ['Head & neck', 'Cabeça e pescoço'],
    blurb: [
      'The carotid and vertebral arteries and the branches of the subclavian that supply the neck. The finer neck branches are shown on the right side.',
      'As artérias carótidas e vertebral e os ramos da subclávia que irrigam o pescoço. Os ramos finos do pescoço aparecem no lado direito.',
    ],
    view: 'ant',
    context: ['claviculas', 'manubrio', 'costela_1', 'vertebras_toracicas'],
    contextOpacity: .18,
    groups: [
      {
        id: 'carotids',
        label: ['Carotid arteries', 'Artérias carótidas'],
        note: [
          'The common carotid divides at the upper border of the thyroid cartilage; the internal carotid continues to the brain without branches in the neck.',
          'A carótida comum divide-se na borda superior da cartilagem tireóidea; a carótida interna segue para o encéfalo sem ramos no pescoço.',
        ],
        ids: ['ccd', 'cce', 'cid_d'],
      },
      {
        id: 'vertebral',
        label: ['Vertebral artery', 'Artéria vertebral'],
        note: [
          'The vertebral artery ascends through the transverse foramina of the cervical vertebrae and joins its fellow to form the basilar artery.',
          'A artéria vertebral sobe pelos forames transversos das vértebras cervicais e se une à contralateral para formar a artéria basilar.',
        ],
        ids: ['vert_d'],
      },
      {
        id: 'subclavian',
        label: ['Subclavian & thyrocervical branches', 'Subclávia e ramos tireocervicais'],
        note: [
          'The thyrocervical trunk gives the inferior thyroid, transverse cervical and suprascapular arteries; the dorsal scapular usually comes from the transverse cervical.',
          'O tronco tireocervical origina as artérias tireóidea inferior, cervical transversa e supraescapular; a escapular dorsal geralmente vem da cervical transversa.',
        ],
        ids: ['scd', 'sce', 'ttc_d', 'tirinf_d', 'tcerv_d', 'supsc_d', 'dscap_d'],
      },
      {
        id: 'costocervical',
        label: ['Costocervical trunk', 'Tronco costocervical'],
        note: [
          'The costocervical trunk gives the deep cervical artery and the supreme intercostal artery to the first two intercostal spaces.',
          'O tronco costocervical origina a artéria cervical profunda e a intercostal suprema para os dois primeiros espaços intercostais.',
        ],
        ids: ['tcc_d', 'cervprof_d', 'pica_sup_d'],
      },
      {
        id: 'neck-veins',
        label: ['Neck veins', 'Veias do pescoço'],
        note: [
          'The subclavian veins join the internal jugular veins behind the sternoclavicular joints to form the brachiocephalic veins.',
          'As veias subclávias unem-se às jugulares internas atrás das articulações esternoclaviculares para formar as veias braquiocefálicas.',
        ],
        ids: ['vsc_d', 'vsc_e'],
      },
    ],
    key: ['ccd', 'cce', 'cid_d', 'vert_d', 'scd', 'sce', 'ttc_d', 'tcc_d'],
  },
  {
    id: 'arm',
    label: ['Upper limb', 'Membro superior'],
    blurb: [
      'The right-sided arteries of the model, from the axilla through the elbow to the palmar arches.',
      'As artérias do lado direito do modelo, da axila ao cotovelo e aos arcos palmares.',
    ],
    view: 'ant',
    context: ['claviculas', 'humero_d', 'radio_d', 'ulna_d', 'costela_1'],
    contextOpacity: .34,
    groups: [
      {
        id: 'axillary',
        label: ['Axillary artery & branches', 'Artéria axilar e ramos'],
        note: [
          'The axillary artery supplies the shoulder and chest wall through its thoracic, scapular and humeral branches.',
          'A artéria axilar irriga o ombro e a parede torácica por seus ramos torácicos, escapulares e umerais.',
        ],
        ids: ['axa_d', 'torlat_d', 'subsc_d', 'circscap_d', 'thdors_d', 'chumant_d', 'chumpost_d'],
      },
      {
        id: 'brachial',
        label: ['Brachial artery & elbow anastomosis', 'Artéria braquial e anastomose do cotovelo'],
        note: [
          'The brachial artery gives the deep artery of the arm and the ulnar collateral arteries, which join the recurrent arteries around the elbow.',
          'A artéria braquial origina a artéria profunda do braço e as colaterais ulnares, que se unem às recorrentes ao redor do cotovelo.',
        ],
        ids: ['bra_d', 'bprof_d', 'ucs_d', 'uci_d', 'radrec_d', 'ulnrec_d', 'iorec_d'],
      },
      {
        id: 'forearm',
        label: ['Forearm & hand arteries', 'Artérias do antebraço e da mão'],
        note: [
          'The radial and ulnar arteries anastomose through the superficial and deep palmar arches; the deep arch gives the princeps pollicis and radialis indicis.',
          'As artérias radial e ulnar se anastomosam pelos arcos palmares superficial e profundo; o arco profundo origina a príncipe do polegar e a radial do índex.',
        ],
        ids: ['rad_d', 'uln_d', 'iocom_d', 'ioant_d', 'arcsup_d', 'arcprof_d', 'digpalm_d', 'metpalm_d', 'princeps_d', 'indicis_d'],
      },
    ],
    key: ['axa_d', 'bra_d', 'rad_d', 'uln_d', 'arcsup_d', 'arcprof_d'],
  },
  {
    id: 'veins',
    label: ['Veins', 'Veias'],
    blurb: [
      'The heart’s own veins, the pulmonary veins, the caval system and the veins that drain the chest wall.',
      'As veias do próprio coração, as veias pulmonares, o sistema das cavas e as veias que drenam a parede torácica.',
    ],
    view: 'post',
    context: ['ad', 'vd', 'ae', 've', 'paredev'],
    groups: [
      {
        id: 'cardiac-veins',
        label: ['Cardiac veins', 'Veias cardíacas'],
        note: [
          'The great, middle and small cardiac veins drain into the coronary sinus; the anterior cardiac veins open directly into the right atrium.',
          'As veias cardíacas magna, média e parva drenam para o seio coronário; as veias cardíacas anteriores abrem-se diretamente no átrio direito.',
        ],
        ids: ['seio', 'vcmagna', 'vcmedia', 'vcparva', 'vpve'],
      },
      {
        id: 'pulmonary-veins',
        label: ['Pulmonary veins', 'Veias pulmonares'],
        note: [
          'Four pulmonary veins, two from each lung, return oxygenated blood to the left atrium.',
          'Quatro veias pulmonares, duas de cada pulmão, trazem sangue oxigenado ao átrio esquerdo.',
        ],
        ids: ['vpsd', 'vpid', 'vpse', 'vpie'],
      },
      {
        id: 'caval',
        label: ['Venae cavae & brachiocephalic veins', 'Veias cavas e braquiocefálicas'],
        note: [
          'The brachiocephalic veins form the superior vena cava; the inferior vena cava reaches the right atrium through the diaphragm.',
          'As veias braquiocefálicas formam a veia cava superior; a veia cava inferior chega ao átrio direito atravessando o diafragma.',
        ],
        ids: ['vcs', 'vci', 'vbcd', 'vbce', 'vsc_d', 'vsc_e'],
      },
      {
        id: 'azygos',
        label: ['Azygos system', 'Sistema ázigo'],
        note: [
          'The azygos and hemiazygos veins collect the thoracic wall and drain into the superior vena cava.',
          'As veias ázigo e hemiázigo recolhem o sangue da parede torácica e drenam para a veia cava superior.',
        ],
        ids: ['azigo', 'hemiazigo', 'azigo_acs'],
      },
      {
        id: 'thoracic-veins',
        label: ['Thoracic wall veins', 'Veias da parede torácica'],
        note: [
          'Anterior intercostal veins join the internal thoracic veins; inferior phrenic veins drain the diaphragm.',
          'As veias intercostais anteriores unem-se às veias torácicas internas; as veias frênicas inferiores drenam o diafragma.',
        ],
        ids: ['itv_d', 'itv_e', 'icv_ant_d', 'icv_ant_e', 'phren_inf_v', 'phren_sup_v'],
      },
    ],
    key: ['vcs', 'vci', 'vbcd', 'vbce', 'seio', 'vcmagna', 'vcmedia', 'azigo', 'hemiazigo'],
  },
];

const MODES = ['explore', 'find', 'type'];
const VIEW_LABELS = {
  ant: ['Anterior', 'Anterior'],
  post: ['Posterior', 'Posterior'],
  dir: ['Right lateral', 'Lateral direita'],
  esq: ['Left lateral', 'Lateral esquerda'],
  sup: ['Superior', 'Superior'],
  inf: ['Inferior', 'Inferior'],
};
const VIEW_KEYS = Object.keys(VIEW_LABELS);

// ---------------------------------------------------------------------------
// Model colours, matching the subject pack
// ---------------------------------------------------------------------------
const DECK_OF = new Map(DECKS.flatMap(deck => deck.itens.map(item => [item.id, deck.id])));
function baseColor(id) {
  if (COLORS[id]) return COLORS[id];
  const deck = DECK_OF.get(id);
  if (deck === 'coronarias') return '#d35b54';
  if (deck === 'valvas') return id.startsWith('pap') ? '#d77a6e' : '#f0dcc4';
  if (deck === 'segd' || deck === 'sege') {
    const segment = id.slice(3);
    if (['apical', 'post', 'ant'].includes(segment)) return '#67b39b';
    if (['lat', 'med', 'lsup', 'linf'].includes(segment)) return '#d6aa6c';
    return '#759ebc';
  }
  return DEFAULT_COLOR;
}

// ---------------------------------------------------------------------------
// Study data (structure names and answer checking come from the shared engine)
// ---------------------------------------------------------------------------
// The shared PT dictionary has no right-sided limb and neck artery entries (the
// app's own PT mode keeps those in English). Fill them in locally for this page.
const PT_EXTRA = {
  vert_d: 'Artéria vertebral direita',
  cid_d: 'Artéria carótida interna direita',
  tirinf_d: 'Artéria tireóidea inferior direita',
  tcerv_d: 'Artéria cervical transversa direita',
  supsc_d: 'Artéria supraescapular direita',
  dscap_d: 'Artéria escapular dorsal direita',
  cervprof_d: 'Artéria cervical profunda direita',
  axa_d: 'Artéria axilar direita',
  torlat_d: 'Artéria torácica lateral direita',
  subsc_d: 'Artéria subescapular direita',
  circscap_d: 'Artéria circunflexa da escápula direita',
  thdors_d: 'Artéria toracodorsal direita',
  chumant_d: 'Artéria circunflexa anterior do úmero direita',
  chumpost_d: 'Artéria circunflexa posterior do úmero direita',
  bra_d: 'Artéria braquial direita',
  bprof_d: 'Artéria profunda do braço direita',
  ucs_d: 'Artéria colateral ulnar superior direita',
  uci_d: 'Artéria colateral ulnar inferior direita',
  rad_d: 'Artéria radial direita',
  radrec_d: 'Artéria recorrente radial direita',
  uln_d: 'Artéria ulnar direita',
  ulnrec_d: 'Artérias recorrentes ulnares direitas',
  iocom_d: 'Artéria interóssea comum direita',
  ioant_d: 'Artéria interóssea anterior direita',
  iorec_d: 'Artéria interóssea recorrente direita',
  arcsup_d: 'Arco palmar superficial direito',
  digpalm_d: 'Artérias digitais palmares comuns direitas',
  arcprof_d: 'Arco palmar profundo direito',
  metpalm_d: 'Artérias metacarpais palmares direitas',
  princeps_d: 'Artéria príncipe do polegar direita',
  indicis_d: 'Artéria radial do índex direita',
};

async function loadStudyPack() {
  if (lang === 'pt-BR') {
    const localize = await import('./translations/localize.js?v=162');
    const pack = localize.localizePack({ decks: DECKS, regions: [] });
    const decks = pack.decks.map(deck => ({
      ...deck,
      itens: deck.itens.map(item => (PT_EXTRA[item.id] ? { ...item, pt: PT_EXTRA[item.id] } : item)),
    }));
    return { ...pack, decks, regions: [] };
  }
  return { decks: DECKS, regions: [] };
}

// The arm bones are rendered as context but are not in the cardio decks.
const SUPPORT_NAMES = {
  humero_d: ['Humerus', 'Úmero'],
  radio_d: ['Radius', 'Rádio'],
  ulna_d: ['Ulna', 'Ulna'],
};

async function syncStudy() {
  try {
    const pack = await loadStudyPack();
    initStudy(pack);
  } catch {
    initStudy({ decks: DECKS, regions: [] });
  }
  for (const [id, names] of Object.entries(SUPPORT_NAMES)) {
    if (!ITEMS[id]) ITEMS[id] = { id, pt: L(...names), en: names[0], typing: names[0], alt: [names[1]] };
  }
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  area: AREAS[0].id,
  mode: 'explore',
  list: 'key',
  view: AREAS[0].view,
  selected: null,
  run: null,
};
let viewer = null;
let loadPromise = null;

const currentArea = () => AREAS.find(area => area.id === state.area) || AREAS[0];
function itemName(id) {
  return ITEMS[id]?.pt || id;
}

function areaMeshes(area) {
  return [...new Set([...area.groups.flatMap(group => group.ids), ...area.key])];
}
function totalStructures() {
  return new Set(AREAS.flatMap(area => areaMeshes(area))).size;
}
function viewLabel(key) {
  return L(...(VIEW_LABELS[key] || VIEW_LABELS.ant));
}
function firstId(entry) {
  return entry.ids[0] || 'ad';
}
function partCountText(count) {
  return t(count === 1 ? 'partOne' : 'parts', { n: count });
}

function itemNote(id, group) {
  const clue = ITEMS[id]?.dica;
  if (lang === 'pt-BR' && PT_EXTRA[id]) return group ? L(...group.note) : '';
  return clue || (group ? L(...group.note) : '');
}
function groupEntry(area, group) {
  return {
    key: `g:${area.id}:${group.id}`,
    kind: 'group',
    label: L(...group.label),
    note: L(...group.note),
    ids: [...group.ids],
    group,
  };
}
function itemEntry(area, id) {
  const group = area.groups.find(entry => entry.ids.includes(id));
  return {
    key: `i:${area.id}:${id}`,
    kind: 'item',
    label: itemName(id),
    note: itemNote(id, group),
    ids: [id],
    group,
  };
}
function listEntries(area, mode = state.list) {
  if (mode === 'general') return area.groups.map(group => groupEntry(area, group));
  return area.key.filter(id => ITEMS[id]).map(id => itemEntry(area, id));
}
function resolveEntry(key) {
  if (!key) return null;
  const parts = key.split(':');
  const [kind, areaId, ...rest] = parts;
  const id = rest.join(':');
  const area = AREAS.find(entry => entry.id === areaId);
  if (!area) return null;
  if (kind === 'g') {
    const group = area.groups.find(entry => entry.id === id);
    return group ? groupEntry(area, group) : null;
  }
  if ((kind === 'i' || kind === 'x') && ITEMS[id]) {
    const group = area.groups.find(entry => entry.ids.includes(id));
    return {
      key,
      kind: 'item',
      label: itemName(id),
      note: itemNote(id, group),
      ids: [id],
      group,
    };
  }
  return null;
}
function entryForMesh(id) {
  const area = currentArea();
  if (!ITEMS[id]) return null;
  const group = area.groups.find(entry => entry.ids.includes(id));
  if (state.list === 'general' && group) return groupEntry(area, group);
  return itemEntry(area, id);
}
function currentTarget(run = state.run) {
  return run && !run.done ? run.order[run.index] : null;
}

// ---------------------------------------------------------------------------
// Paint
// ---------------------------------------------------------------------------
function paintArea(preserveCamera = false) {
  const area = currentArea();
  const run = state.run;
  const target = currentTarget(run);
  const revealedFind = state.mode === 'find' && target && run.revealed && !run.locked;
  const ids = revealedFind ? [...target.ids] : areaMeshes(area);
  const context = revealedFind ? [] : (area.context || []).filter(id => !ids.includes(id));
  let focus = [];
  if (state.mode === 'explore') {
    const selected = resolveEntry(state.selected);
    if (selected) focus = selected.ids;
  } else if (target) {
    if (state.mode === 'type' || (state.mode === 'find' && (run.locked || run.revealed))) focus = target.ids;
  }
  const keepContext = state.mode === 'type' && target?.kind === 'group';
  // Frame a compact overview, unless a find question's target sits outside it.
  const outsideFrame = Boolean(target && area.frameIds && target.ids.some(id => !area.frameIds.includes(id)));
  const overviewFrame = !focus.length && !outsideFrame ? area.frameIds : undefined;
  $('#model-label').textContent = L(...area.label);
  $('#model-angle').textContent = viewLabel(state.view);
  if (!viewer) return;
  viewer.paint({
    ids,
    context,
    contextOpacity: area.contextOpacity,
    frameIds: overviewFrame,
    focus,
    close: focus.length > 0 && !keepContext,
    view: state.view,
    controls: true,
    explore: state.mode === 'explore',
    pick: state.mode === 'find' && Boolean(target) && !run.locked,
    pickIds: ids,
    title: L(...area.label),
  }, preserveCamera);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function applyStaticText() {
  for (const element of $$('[data-i18n]')) element.textContent = t(element.dataset.i18n);
  for (const element of $$('[data-i18n-label]')) element.setAttribute('aria-label', t(element.dataset.i18nLabel));
  for (const element of $$('[data-i18n-title]')) element.title = t(element.dataset.i18nTitle);
  document.title = `${t('title')} · SpeedCardio`;
  root.lang = lang;
  const back = $('#ah-back');
  back.href = `index.html?s=cardio${lang === 'pt-BR' ? '&lang=pt-BR' : ''}`;
  back.title = t('backMap');
  back.setAttribute('aria-label', t('backMap'));
  for (const element of $$('[data-lang-only]')) element.hidden = element.dataset.langOnly !== lang;
  $('#language-select').value = lang;
  $('#theme-toggle').setAttribute('aria-label', t('theme'));
  $('#theme-toggle').title = t('theme');
  $('#view canvas')?.setAttribute('aria-label', t('canvasAria'));
  const themeHead = $('#theme-mode-heading');
  if (themeHead) themeHead.textContent = t('appearance');
  const accentHead = $('#accent-heading');
  if (accentHead) accentHead.textContent = t('accent');
  $$('.theme-choices span').forEach((span, index) => {
    span.textContent = [t('light'), t('dark'), t('system')][index];
  });
  $$('[data-accent-choice]').forEach((swatch, index) => {
    const name = t('accentNames')[index];
    swatch.setAttribute('aria-label', name);
    swatch.title = name;
  });
}

function renderMeta() {
  $('#ah-meta').textContent = t('metaCount', { structures: totalStructures(), areas: AREAS.length });
}

function renderViewOptions() {
  const select = $('#view-direction');
  select.innerHTML = VIEW_KEYS.map(key => `<option value="${key}">${escapeHtml(viewLabel(key))}</option>`).join('');
  select.value = state.view;
  select.setAttribute('aria-label', t('viewpoint'));
}

function renderAreas() {
  const host = $('#ah-areas');
  host.innerHTML = AREAS.map(area => {
    const active = area.id === state.area;
    const count = area.key.filter(id => ITEMS[id]).length;
    return `<button type="button" class="ah-area" data-area="${area.id}" aria-pressed="${active}">
      <span class="ah-area-name">${escapeHtml(L(...area.label))}</span>
      <span class="ah-area-count">${escapeHtml(t(count === 1 ? 'listCount' : 'listCountPlural', { n: count }))}</span>
    </button>`;
  }).join('');
}

function renderModeButtons() {
  for (const button of $$('#ah-modes [data-mode]')) {
    button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode));
  }
  for (const button of $$('#ah-lists [data-list]')) {
    button.setAttribute('aria-pressed', String(button.dataset.list === state.list));
  }
}

function entriesCountText(count, group) {
  const key = group ? (count === 1 ? 'listCountGroup' : 'listCountGroupPlural') : (count === 1 ? 'listCount' : 'listCountPlural');
  return t(key, { n: count });
}

function renderPanel() {
  const area = currentArea();
  const groupMode = state.list === 'general' && state.mode !== 'explore';
  const noteKey = state.mode === 'explore' ? 'modeNoteExplore'
    : state.mode === 'find' ? (groupMode ? 'modeNoteFindGroup' : 'modeNoteFind')
      : (groupMode ? 'modeNoteTypeGroup' : 'modeNoteType');
  $('#ah-mode-note').textContent = t(noteKey);
  $('#ah-list-note').textContent = t(state.list === 'key' ? 'listNoteKey' : 'listNoteGeneral');
  $('#ah-list-count').textContent = entriesCountText(listEntries(area).length, state.list === 'general');
}

function renderList() {
  const host = $('#ah-list');
  const practiceNote = $('#ah-practice-note');
  const detail = $('#ah-detail');
  if (state.mode !== 'explore') {
    host.hidden = true;
    detail.hidden = true;
    practiceNote.hidden = false;
    practiceNote.textContent = t('practiceNote');
    return;
  }
  host.hidden = false;
  detail.hidden = false;
  practiceNote.hidden = true;
  const entries = listEntries(currentArea());
  if (!entries.length) {
    host.innerHTML = `<p class="ah-note">${escapeHtml(t('noEntries'))}</p>`;
    return;
  }
  host.innerHTML = entries.map(entry => {
    const active = entry.key === state.selected;
    const subtitle = entry.kind === 'group'
      ? partCountText(entry.ids.length)
      : entry.group ? L(...entry.group.label) : t('contextStructure');
    return `<button type="button" class="ah-entry${active ? ' chosen' : ''}" data-entry="${escapeHtml(entry.key)}" aria-pressed="${active}">
      <span class="ah-swatch" style="--swatch:${baseColor(firstId(entry))}" aria-hidden="true"></span>
      <span class="ah-entry-text"><b>${escapeHtml(entry.label)}</b><small>${escapeHtml(subtitle)}</small></span>
      ${entry.kind === 'group' ? `<span class="ah-entry-count">${entry.ids.length}</span>` : ''}
    </button>`;
  }).join('');
}

function renderDetail() {
  if (state.mode !== 'explore') return;
  const host = $('#ah-detail');
  const entry = resolveEntry(state.selected);
  host.classList.toggle('is-empty', !entry);
  if (!entry) {
    host.innerHTML = `<p class="ah-note">${escapeHtml(t('exploreHint'))}</p>`;
    return;
  }
  const groupLabel = entry.group ? L(...entry.group.label) : '';
  const members = entry.kind === 'group'
    ? `<p class="ah-label">${escapeHtml(t('members'))}</p>
       <div class="ah-members">${entry.ids.map(id => `<span>${escapeHtml(itemName(id))}</span>`).join('')}</div>`
    : '';
  host.innerHTML = `
    <p class="eyebrow">${escapeHtml(entry.kind === 'group' ? t('groupEyebrow') : L(...currentArea().label))}</p>
    <h3>${escapeHtml(entry.label)}</h3>
    ${entry.note ? `<p class="ah-note">${escapeHtml(entry.note)}</p>` : ''}
    ${entry.kind === 'item'
      ? `<p class="ah-where">${escapeHtml(groupLabel ? t('partOf', { group: groupLabel }) : t('contextStructure'))}</p>`
      : ''}
    ${members}
    <div class="actions"><button type="button" class="button" data-ah="clear">${escapeHtml(t('clear'))}</button></div>`;
}

function renderSession() {
  const host = $('#ah-session');
  const area = currentArea();
  if (state.mode === 'explore') {
    const entry = resolveEntry(state.selected);
    const picked = entry ? `
      <div class="ah-picked">
        <p class="eyebrow">${escapeHtml(entry.kind === 'group' ? t('groupEyebrow') : t('exploreSelect'))}</p>
        <h2>${escapeHtml(entry.label)}</h2>
        ${entry.note ? `<p class="ah-note">${escapeHtml(entry.note)}</p>` : ''}
        ${entry.kind === 'item' && entry.group ? `<p class="ah-where">${escapeHtml(t('partOf', { group: L(...entry.group.label) }))}</p>` : ''}
      </div>` : `<p class="ah-note">${escapeHtml(t('exploreHint'))}</p>`;
    host.innerHTML = `
      <div class="ah-session-head">
        <div><p class="eyebrow">${escapeHtml(t('modeExplore'))}</p><h2>${escapeHtml(L(...area.label))}</h2></div>
        <p class="ah-step">${escapeHtml(entriesCountText(listEntries(area).length, state.list === 'general'))}</p>
      </div>
      <p class="ah-note">${escapeHtml(L(...area.blurb))}</p>
      ${picked}`;
    return;
  }

  const run = state.run;
  const target = currentTarget(run);
  if (!run || !run.order.length) {
    host.innerHTML = `<p class="eyebrow">${escapeHtml(t(state.mode === 'find' ? 'modeFind' : 'modeType'))}</p>
      <p class="ah-note">${escapeHtml(t('noEntries'))}</p>
      <div class="actions"><button type="button" class="button" data-mode-jump="explore">${escapeHtml(t('modeExplore'))}</button></div>`;
    return;
  }

  if (run.done) {
    host.innerHTML = `
      <p class="eyebrow">${escapeHtml(t(run.mode === 'find' ? 'modeFind' : 'modeType'))} · ${escapeHtml(L(...area.label))}</p>
      <h2>${escapeHtml(t('doneTitle'))}</h2>
      <p class="ah-score"><b>${run.correct}</b> / ${run.order.length} <span>${escapeHtml(t('withoutHelp'))}</span></p>
      <p class="ah-note">${escapeHtml(t('doneNote'))}</p>
      <div class="actions">
        <button type="button" class="button" data-ah="again">${escapeHtml(t('again'))}</button>
        <button type="button" class="button primary" data-ah="next-area">${escapeHtml(t('nextArea'))}</button>
      </div>`;
    return;
  }

  const total = run.order.length;
  const step = run.index + 1;
  const width = Math.round(((run.index + (run.locked ? 1 : 0)) / total) * 100);
  const feedback = (id, item) => {
    const text = item ? t(item.key, item.vars) : '';
    return `<p${id ? ` id="${id}"` : ''} class="feedback ${item?.tone || ''}" role="status" aria-live="polite">${escapeHtml(text)}</p>`;
  };

  if (run.mode === 'find') {
    host.innerHTML = `
      <div class="ah-session-head">
        <div>
          <p class="eyebrow">${escapeHtml(t('modeFind'))} · ${escapeHtml(L(...area.label))}</p>
          <h2 id="ah-prompt" tabindex="-1">${escapeHtml(t('clickThe'))} <span class="ah-target">${escapeHtml(target.label)}</span></h2>
        </div>
        <p class="ah-step">${escapeHtml(t('questionOf', { i: step, n: total }))}</p>
      </div>
      <div class="ah-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${run.index + (run.locked ? 1 : 0)}" aria-label="${escapeHtml(t('questionOf', { i: step, n: total }))}"><span style="width:${width}%"></span></div>
      ${feedback('', run.feedback)}
      <div class="actions">
        ${run.locked
          ? `<button type="button" class="button primary" data-ah="next">${escapeHtml(t(step === total ? 'seeResult' : 'next'))}</button>`
          : `<button type="button" class="button" data-ah="reveal" ${run.revealed ? 'disabled' : ''}>${escapeHtml(t('showMe'))}</button>`}
      </div>`;
    if (run.locked) $('#ah-session [data-ah="next"]')?.focus({ preventScroll: true });
    return;
  }

  host.innerHTML = `
    <div class="ah-session-head">
      <div>
        <p class="eyebrow">${escapeHtml(t('modeType'))} · ${escapeHtml(L(...area.label))}</p>
        <h2>${escapeHtml(t(target.kind === 'group' ? 'whichSet' : 'whichVessel'))}</h2>
      </div>
      <p class="ah-step">${escapeHtml(t('questionOf', { i: step, n: total }))}</p>
    </div>
    <div class="ah-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${run.index + (run.locked ? 1 : 0)}" aria-label="${escapeHtml(t('questionOf', { i: step, n: total }))}"><span style="width:${width}%"></span></div>
    <p class="ah-note">${escapeHtml(t(target.kind === 'group' ? 'typeHintSet' : 'typeHint'))}</p>
    <form id="ah-type-form" class="ah-type" autocomplete="off">
      <label class="ah-sr" for="ah-answer">${escapeHtml(t(target.kind === 'group' ? 'answerLabelSet' : 'answerLabel'))}</label>
      <input id="ah-answer" type="text" value="${escapeHtml(run.typed || '')}" ${run.locked ? 'readonly' : ''} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-describedby="ah-type-feedback">
      <button type="submit" class="button primary" ${run.locked ? 'disabled' : ''}>${escapeHtml(t('check'))}</button>
    </form>
    ${feedback('ah-type-feedback', run.feedback)}
    <div class="actions">
      ${run.locked
        ? `<button type="button" class="button primary" data-ah="next">${escapeHtml(t(step === total ? 'seeResult' : 'next'))}</button>`
        : `<button type="button" class="button" data-ah="reveal">${escapeHtml(t('reveal'))}</button>`}
    </div>`;
  if (run.locked) $('#ah-session [data-ah="next"]')?.focus({ preventScroll: true });
  else $('#ah-answer')?.focus({ preventScroll: true });
}

function renderAll({ preserveCamera = false } = {}) {
  applyStaticText();
  renderMeta();
  renderViewOptions();
  renderAreas();
  renderModeButtons();
  renderPanel();
  renderList();
  renderDetail();
  renderSession();
  paintArea(preserveCamera);
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function setArea(id, { force = false } = {}) {
  if (!force && id === state.area) return;
  const area = AREAS.find(entry => entry.id === id);
  if (!area) return;
  state.area = id;
  state.selected = null;
  state.run = null;
  state.view = area.view;
  $('#view-direction').value = state.view;
  renderAreas();
  renderPanel();
  renderList();
  renderDetail();
  if (state.mode === 'explore') {
    renderSession();
    paintArea();
  } else {
    startRun(state.mode);
  }
}

function setMode(mode) {
  if (!MODES.includes(mode) || mode === state.mode) return;
  state.mode = mode;
  state.selected = null;
  state.run = null;
  renderModeButtons();
  renderPanel();
  renderDetail();
  if (mode === 'explore') {
    renderList();
    renderSession();
    paintArea();
  } else {
    startRun(mode);
  }
}

function setListMode(mode) {
  if (!['key', 'general'].includes(mode) || mode === state.list) return;
  state.list = mode;
  state.selected = null;
  state.run = null;
  renderModeButtons();
  renderPanel();
  if (state.mode === 'explore') {
    renderList();
    renderDetail();
    renderSession();
    paintArea();
  } else {
    startRun(state.mode);
  }
}

function ensureSessionVisible() {
  requestAnimationFrame(() => {
    const host = $('#ah-session');
    const rect = host.getBoundingClientRect();
    if (rect.top < 80 || rect.bottom > innerHeight - 8) {
      host.scrollIntoView({ block: 'end', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  });
}

function startRun(mode) {
  const area = currentArea();
  const pool = listEntries(area);
  if (!pool.length) {
    state.run = null;
    renderList();
    renderSession();
    paintArea();
    return;
  }
  const order = shuffle(pool).slice(0, Math.min(MAX_QUESTIONS, pool.length));
  state.run = {
    mode,
    order,
    index: 0,
    correct: 0,
    locked: false,
    revealed: false,
    done: false,
    feedback: null,
    typed: '',
  };
  state.selected = null;
  renderList();
  renderDetail();
  renderSession();
  paintArea();
  ensureSessionVisible();
  if (mode === 'find') $('#ah-prompt')?.focus({ preventScroll: true });
}

function advanceRun() {
  const run = state.run;
  if (!run || run.done) return;
  if (run.index + 1 >= run.order.length) {
    run.done = true;
    run.feedback = null;
    renderSession();
    paintArea();
    return;
  }
  const wasRevealed = run.revealed;
  run.index += 1;
  run.locked = false;
  run.revealed = false;
  run.feedback = null;
  run.typed = '';
  renderSession();
  if (run.mode === 'type') paintArea();
  else paintArea(!wasRevealed);
  if (run.mode === 'find') $('#ah-prompt')?.focus({ preventScroll: true });
}

function selectEntry(key, { preserveCamera = false } = {}) {
  state.selected = key;
  renderList();
  renderDetail();
  renderSession();
  paintArea(preserveCamera);
}

function handleExplore(id) {
  if (state.mode !== 'explore' || !id) return;
  const entry = entryForMesh(id);
  if (!entry) return;
  selectEntry(entry.key, { preserveCamera: true });
}

function handlePick(id) {
  const run = state.run;
  if (state.mode !== 'find' || !run || run.done || run.locked) return;
  const target = currentTarget(run);
  if (!target) return;
  if (!id) {
    run.feedback = { tone: 'bad', key: 'wrongClickEmpty' };
    renderSession();
    return;
  }
  if (target.ids.includes(id)) {
    if (!run.revealed) run.correct += 1;
    run.locked = true;
    run.feedback = { tone: 'good', key: 'rightClick', vars: { name: target.label } };
    renderSession();
    paintArea(true);
    return;
  }
  run.feedback = { tone: 'bad', key: 'wrongClick', vars: { clicked: itemName(id), target: target.label } };
  renderSession();
}

function revealFind() {
  const run = state.run;
  if (!run || run.mode !== 'find' || run.locked) return;
  const target = currentTarget(run);
  if (!target) return;
  run.revealed = true;
  run.feedback = { tone: '', key: 'showMeFeedback', vars: { name: target.label } };
  renderSession();
  paintArea();
}

function normalise(value) {
  return fold(String(value)).replace(/[–—-]/g, ' ').replace(/\s+/g, '').trim();
}

function acceptsAnswer(target, value) {
  const guess = normalise(value);
  if (!guess) return false;
  if (target.kind === 'group' && target.group) {
    const names = [L(...target.group.label), target.group.label[0], target.group.label[1]];
    const variants = names.flatMap(name => [name, name.replace(/\s*&\s*/g, ' and '), name.replace(/\s*&\s*/g, ' e ')]);
    return variants.some(name => normalise(name) === guess);
  }
  return answers(target.ids[0]).includes(guess);
}

function submitTyped() {
  const run = state.run;
  if (!run || run.mode !== 'type' || run.locked) {
    if (run?.locked) advanceRun();
    return;
  }
  const target = currentTarget(run);
  if (!target) return;
  const input = $('#ah-answer');
  const value = input?.value || '';
  run.typed = value;
  if (!value.trim()) {
    run.feedback = { tone: 'bad', key: 'typeSomething' };
    renderSession();
    return;
  }
  if (acceptsAnswer(target, value)) {
    run.correct += 1;
    run.locked = true;
    run.feedback = { tone: 'good', key: 'rightName', vars: { name: target.label } };
    renderSession();
    paintArea(true);
    return;
  }
  run.feedback = { tone: 'bad', key: 'tryAgain' };
  renderSession();
}

function revealType() {
  const run = state.run;
  if (!run || run.mode !== 'type' || run.locked) return;
  const target = currentTarget(run);
  if (!target) return;
  run.locked = true;
  run.feedback = { tone: '', key: 'answerIs', vars: { name: target.label } };
  renderSession();
}

function nextArea() {
  const index = AREAS.findIndex(area => area.id === state.area);
  const next = AREAS[(index + 1) % AREAS.length];
  setArea(next.id, { force: true });
}

// ---------------------------------------------------------------------------
// Viewer
// ---------------------------------------------------------------------------
function preloadModel() {
  return {
    manifest: fetch(`./models.json${V}`, { cache: 'force-cache' })
      .then(response => (response.ok ? response.json() : null)).catch(() => null),
    buffer: fetch(`./models.bin${V}`, { cache: 'force-cache' })
      .then(response => (response.ok ? response.arrayBuffer() : null)).catch(() => null),
  };
}

function showViewerFailure() {
  viewer = null;
  const status = $('#model-status');
  const fallback = $('#view-fallback');
  if (status) status.hidden = true;
  if (fallback) fallback.hidden = false;
}

function loadViewer() {
  if (loadPromise) return loadPromise;
  const status = $('#model-status');
  const fallback = $('#view-fallback');
  if (status) { status.hidden = false; status.textContent = t('loading'); }
  if (fallback) fallback.hidden = true;
  loadPromise = import('./viewer.js?v=115').then(async ({ createViewer }) => {
    viewer = await createViewer(
      $('#view'),
      id => handlePick(id),
      () => showViewerFailure(),
      (id) => handleExplore(id),
      {
        kind: 'packed',
        manifest: './models.json',
        minDistanceMm: 12,
        colors: COLORS,
        defaultColor: DEFAULT_COLOR,
        baseColor,
        markers: {},
        preload: preloadModel(),
      },
    );
    loadPromise = null;
    $('#view canvas')?.setAttribute('aria-label', t('canvasAria'));
    if (status) status.hidden = true;
    if (fallback) fallback.hidden = true;
    paintArea();
  }).catch(() => {
    loadPromise = null;
    showViewerFailure();
  });
  return loadPromise;
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------
function syncThemeControls() {
  const theme = root.dataset.theme || 'dark';
  for (const radio of $$('input[name="theme-choice"]')) radio.checked = radio.value === theme;
  const accent = root.dataset.accent || 'violet';
  for (const swatch of $$('[data-accent-choice]')) {
    swatch.setAttribute('aria-pressed', String(swatch.dataset.accentChoice === accent));
  }
}

function paintThemeColor() {
  const theme = root.dataset.theme || 'dark';
  const light = theme === 'light' || (theme === 'system' && matchMedia('(prefers-color-scheme: light)').matches);
  $('meta[name="theme-color"]')?.setAttribute('content', light ? '#f6f7fb' : '#08090b');
}

function applyTheme(theme) {
  if (!['light', 'dark', 'system'].includes(theme)) return;
  root.dataset.theme = theme;
  try { localStorage.setItem('sc2_theme', theme); } catch { /* storage unavailable */ }
  syncThemeControls();
  paintThemeColor();
  viewer?.refreshTheme?.();
}

function applyAccent(accent) {
  if (!['violet', 'blue', 'teal', 'amber', 'rose', 'slate'].includes(accent)) return;
  root.dataset.accent = accent;
  try { localStorage.setItem('sc2_accent', accent); } catch { /* storage unavailable */ }
  syncThemeControls();
  viewer?.refreshTheme?.();
}

function closeThemePopover({ restoreFocus = false } = {}) {
  const popover = $('#theme-popover');
  const toggle = $('#theme-toggle');
  if (!popover || popover.hidden) return;
  popover.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  if (restoreFocus) toggle.focus();
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
document.addEventListener('click', event => {
  const areaButton = event.target.closest('#ah-areas [data-area]');
  if (areaButton) { setArea(areaButton.dataset.area); return; }

  const modeButton = event.target.closest('#ah-modes [data-mode]');
  if (modeButton) { setMode(modeButton.dataset.mode); return; }

  const listButton = event.target.closest('#ah-lists [data-list]');
  if (listButton) { setListMode(listButton.dataset.list); return; }

  const jump = event.target.closest('[data-mode-jump]');
  if (jump) { setMode(jump.dataset.modeJump); return; }

  const entryButton = event.target.closest('#ah-list [data-entry]');
  if (entryButton) { selectEntry(entryButton.dataset.entry); return; }

  const viewSwatch = event.target.closest('[data-accent-choice]');
  if (viewSwatch) { applyAccent(viewSwatch.dataset.accentChoice); return; }

  const themeToggle = event.target.closest('#theme-toggle');
  if (themeToggle) {
    const popover = $('#theme-popover');
    const open = popover.hidden;
    popover.hidden = !open;
    themeToggle.setAttribute('aria-expanded', String(open));
    if (open) $('input[name="theme-choice"]:checked')?.focus();
    return;
  }
  if (!event.target.closest('#theme-popover')) closeThemePopover();

  const action = event.target.closest('[data-ah]')?.dataset.ah;
  if (action === 'next') { advanceRun(); return; }
  if (action === 'reveal') {
    if (state.mode === 'find') revealFind();
    else if (state.mode === 'type') revealType();
    return;
  }
  if (action === 'again') { startRun(state.mode); return; }
  if (action === 'next-area') { nextArea(); return; }
  if (action === 'clear') {
    state.selected = null;
    renderList();
    renderDetail();
    renderSession();
    paintArea();
  }
});

document.addEventListener('submit', event => {
  if (event.target.id !== 'ah-type-form') return;
  event.preventDefault();
  submitTyped();
});

document.addEventListener('input', event => {
  if (event.target.id === 'ah-answer' && state.run) state.run.typed = event.target.value;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeThemePopover({ restoreFocus: true });
  if (event.key === 'Enter' && event.target?.id === 'ah-answer' && state.run?.locked) {
    event.preventDefault();
    advanceRun();
  }
});

$('#language-select').addEventListener('change', async event => {
  const select = event.currentTarget;
  const next = select.value === 'pt-BR' ? 'pt-BR' : 'en';
  if (next === lang) return;
  select.disabled = true;
  lang = next;
  try { localStorage.setItem('anatomy_language', lang); } catch { /* storage unavailable */ }
  const url = new URL(location.href);
  if (lang === 'pt-BR') url.searchParams.set('lang', lang); else url.searchParams.delete('lang');
  history.replaceState(null, '', url);
  applyStaticText();
  try {
    await syncStudy();
    if (state.run) {
      state.run.feedback = null;
      state.run.order = state.run.order.map(entry => resolveEntry(entry.key) || entry);
    }
    renderAll({ preserveCamera: true });
  } finally {
    select.disabled = false;
  }
});

$('#view-direction').addEventListener('change', event => {
  state.view = event.currentTarget.value;
  paintArea();
});
$('#view-zoom-in').addEventListener('click', () => viewer?.zoom?.(.8));
$('#view-zoom-out').addEventListener('click', () => viewer?.zoom?.(1.25));
$('#view-reset').addEventListener('click', () => { viewer?.resetView?.(); });
$('#view-rotate').addEventListener('click', event => {
  const button = event.currentTarget;
  const on = button.getAttribute('aria-pressed') !== 'true';
  const applied = viewer?.setAutoRotate?.(on) ?? false;
  button.setAttribute('aria-pressed', String(applied));
});
$('#view-retry').addEventListener('click', () => { if (!loadPromise) loadViewer(); });

for (const radio of $$('input[name="theme-choice"]')) {
  radio.addEventListener('change', () => { if (radio.checked) applyTheme(radio.value); });
}

document.addEventListener('focusin', event => {
  if (!event.target.closest('#theme-popover') && !event.target.closest('#theme-toggle')) closeThemePopover();
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('#theme-popover') && !event.target.closest('#theme-toggle')) closeThemePopover();
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
async function boot() {
  syncThemeControls();
  applyStaticText();
  loadViewer();
  $('#language-select').disabled = true;
  try {
    await syncStudy();
    renderAll({ preserveCamera: true });
  } finally {
    $('#language-select').disabled = false;
  }
}

boot();
