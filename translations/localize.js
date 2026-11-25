import content from './pt-br-content.js?v=100';
import aliases from './pt-br-aliases.js?v=100';
import ui from './pt-br-ui.js?v=100';
import { structureNames } from './pt-br.js?v=100';

// Disambiguate anatomy terms and UI messages whose general translation can mislead.
Object.assign(content, {
  '· Landmark areas from': '· Áreas de referência de',
  'Great vessels': 'Grandes vasos', 'Skull': 'Crânio', 'Lung lobes': 'Lobos pulmonares',
  'Trachea and main bronchi': 'Traqueia e brônquios principais',
  'Left upper lobe and its tongue-like part (lingula)': 'Lobo superior esquerdo e língula',
  'Bony frame': 'Arcabouço ósseo', '30L Foramina and contents': '30L Forames e conteúdos', 'Speed run': 'Speedrun',
  'Speed run · Part 1': 'Speedrun · Parte 1', 'Speed run · Part 2': 'Speedrun · Parte 2',
  'Follow the pulmonary artery into each lobe and segment beside its bronchus.': 'Acompanhe a artéria pulmonar até cada lobo e segmento, ao lado do respectivo brônquio.',
  'Heart and lung anatomy': 'Anatomia do coração e dos pulmões',
  'Bone of the forehead and orbital roofs': 'Osso da testa e do teto das órbitas',
  'Atrial roof': 'Teto do átrio',
  'Septum primum forms the floor. The surrounding raised limbus represents the rim associated with septum secundum.': 'O septum primum forma o assoalho. O limbo elevado ao redor corresponde à borda associada ao septum secundum.',
  'Recall: base and apex; anterior ventricle; right border; exit vessels; posterior atrium; surface vessels; lungs and posterior mediastinum.': 'Relembre: base e ápice; ventrículo anterior; borda direita; vasos de saída; átrio posterior; vasos da superfície; pulmões e mediastino posterior.',
  // R1 Area labels
  'Airways and lungs': 'Vias aéreas e pulmões',
  // R2 Blood pathway
  'SVC / IVC': 'VCS / VCI',
  'Superior & inferior venae cavae': 'Veias cavas superior e inferior',
  'Systemic venous blood returns from the upper body via the SVC and from the lower body via the IVC.': 'O sangue venoso sistêmico retorna da metade superior pela VCS e da metade inferior pela VCI.',
  'RA': 'AD',
  'Receives systemic venous return from the venae cavae and myocardial venous blood from the coronary sinus.': 'Recebe o retorno venoso sistêmico das cavas e o sangue venoso do miocárdio pelo seio coronário.',
  'Tricuspid': 'Tricúspide',
  'Tricuspid valve': 'Valva tricúspide',
  'Three-leaflet right atrioventricular valve opens in diastole into the right ventricle.': 'Valva atrioventricular direita tricúspide; abre-se na diástole para o ventrículo direito.',
  'RV': 'VD',
  'Contracts to eject deoxygenated blood upward through the infundibulum toward the pulmonary valve.': 'Contrai-se para ejetar sangue venoso pelo infundíbulo em direção à valva pulmonar.',
  'Pulmonary valve': 'Valva pulmonar',
  'Three semilunar cusps open during right ventricular systole and close to prevent regurgitation.': 'Três cúspides semilunares que se abrem na sístole ventricular direita e se fecham na diástole.',
  'Pulmonary trunk': 'Tronco pulmonar',
  'Divides beneath the aortic arch into right and left pulmonary arteries carrying venous blood to the lungs.': 'Divide-se sob o arco aórtico nas artérias pulmonares direita e esquerda rumo aos pulmões.',
  'Pulmonary veins': 'Veias pulmonares',
  'Four pulmonary veins return freshly oxygenated blood from the lungs to the heart.': 'Quatro veias pulmonares trazem o sangue oxigenado dos pulmões ao coração.',
  'LA': 'AE',
  'Posterior chamber receiving oxygenated blood from all four pulmonary veins.': 'Câmara posterior que recebe sangue oxigenado das quatro veias pulmonares.',
  'Mitral': 'Mitral',
  'Mitral valve': 'Valva mitral',
  'Bicuspid left atrioventricular valve directs oxygenated blood into the left ventricle.': 'Valva atrioventricular esquerda bicúspide que direciona o sangue oxigenado ao ventrículo esquerdo.',
  'LV': 'VE',
  'Thick-walled systemic pump ejecting oxygenated blood through the aortic vestibule.': 'Câmara de parede espessa que ejeta sangue oxigenado pelo vestíbulo aórtico.',
  'Aortic valve': 'Valva aórtica',
  'Three semilunar cusps open during systole; in diastole their sinuses fill the coronary arteries.': 'Três cúspides semilunares que se abrem na sístole; na diástole seus seios preenchem as artérias coronárias.',
  'Aorta': 'Aorta',
  'Distributes oxygenated blood to the myocardium and systemic circulation via the arch and descending aorta.': 'Distribui o sangue oxigenado ao miocárdio e à circulação sistêmica pelo arco e aorta descendente.',
  // R3 Coronary territories (expanded & reverse cases)
  'The circumflex artery runs in the left atrioventricular groove and gives obtuse marginal branches to the lateral LV wall.': 'A artéria circunflexa percorre o sulco atrioventricular esquerdo e origina ramos marginais obtusos para a parede lateral do VE.',
  'Inferior LV wall (left dominance)': 'Parede inferior do VE (dominância esquerda)',
  'In a left-dominant heart (~10% of people), which artery gives the PDA to supply the inferior LV wall and posterior septum?': 'Em um coração com dominância esquerda (~10% das pessoas), qual artéria origina a DP/AIP para irrigar a parede inferior do VE e o septo posterior?',
  'In left dominance the circumflex artery continues to the crux as the PDA, so a proximal LCx occlusion causes an inferolateral infarct.': 'Na dominância esquerda, a artéria circunflexa continua até a cruz do coração como DP/AIP, portanto uma oclusão proximal da Cx causa infarto inferolateral.',
  'Posteromedial papillary muscle': 'Músculo papilar posteromedial',
  'Which artery usually supplies the posteromedial papillary muscle, making it vulnerable to rupture after an inferior myocardial infarction?': 'Qual artéria costuma irrigar o músculo papilar posteromedial, tornando-o vulnerável à ruptura após um infarto inferior?',
  'The posteromedial papillary muscle typically has a single blood supply from the PDA (from the RCA in right dominance or LCx in left dominance), so inferior infarction risks acute mitral regurgitation.': 'O músculo papilar posteromedial costuma ter irrigação única pela DP/AIP (da ACD na dominância direita ou da Cx na dominância esquerda), por isso o infarto inferior traz risco de insuficiência mitral aguda.',
  'SA nodal branch': 'Ramo do nó sinoatrial',
  'Anterolateral papillary muscle': 'Músculo papilar anterolateral',
  'Which arteries provide a dual blood supply that protects the anterolateral papillary muscle from single-vessel infarction?': 'Quais artérias fornecem irrigação dupla que protege o músculo papilar anterolateral contra infarto de vaso único?',
  'LAD and LCx': 'DAE e ACx',
  'RCA only': 'Apenas ACD',
  'PDA only': 'Apenas AIP',
  'RCA and PDA': 'ACD e AIP',
  'The anterolateral papillary muscle receives dual arterial supply from LAD diagonal branches and LCx obtuse marginal branches, making rupture far rarer.': 'O músculo papilar anterolateral recebe irrigação dupla dos ramos diagonais da DA e dos ramos marginais obtusos da Cx, tornando sua ruptura muito mais rara.',
  'ECG leads V1–V4 (Anterior STEMI)': 'Derivações V1–V4 do ECG (IAM anterior)',
  'ST-segment elevation in precordial leads V1–V4 points to acute occlusion of which artery?': 'O supradesnivelamento do segmento ST nas derivações precordiais V1–V4 aponta para oclusão aguda de qual artéria?',
  'Leads V1–V4 face the anterior LV wall and anterior interventricular septum, supplied by the LAD and its septal and diagonal branches.': 'As derivações V1–V4 observam a parede anterior do VE e o septo interventricular anterior, irrigados pela DA/DAE e seus ramos septais e diagonais.',
  'ECG leads II, III, aVF (Inferior STEMI)': 'Derivações II, III, aVF do ECG (IAM inferior)',
  'ST-segment elevation in leads II, III, and aVF (often complicated by AV block) most commonly indicates occlusion of which artery in right dominance?': 'O supradesnivelamento de ST em II, III e aVF (frequentemente com bloqueio AV) indica mais comumente oclusão de qual artéria na dominância direita?',
  'Leads II, III, and aVF view the inferior (diaphragmatic) surface supplied by the RCA and PDA in right-dominant hearts; proximal RCA occlusion also threatens the AV node.': 'As derivações II, III e aVF avaliam a face inferior (diafragmática), irrigada pela ACD e DP na dominância direita; a oclusão proximal da ACD também ameaça o nó AV.',
  'ECG leads I, aVL, V5–V6 (Lateral STEMI)': 'Derivações I, aVL, V5–V6 do ECG (IAM lateral)',
  'ST-segment elevation localized to leads I, aVL, and V5–V6 points to ischemia in the territory of which artery?': 'O supradesnivelamento de ST localizado em I, aVL e V5–V6 indica isquemia no território de qual artéria?',
  'Conus branch': 'Ramo do cone',
  'Leads I, aVL, V5, and V6 face the lateral LV wall supplied by the LCx (obtuse marginal branches) and high diagonal branches.': 'As derivações I, aVL, V5 e V6 observam a parede lateral do VE, irrigada pela Cx/ACx (marginais obtusos) e por ramos diagonais altos.',
  'Proximal LAD occlusion': 'Oclusão proximal da DA (DAE)',
  'Proximal LAD occlusion interrupts flow before the first septal and diagonal branches. Which territory becomes ischemic?': 'A oclusão proximal da DA (DAE) interrompe o fluxo antes dos primeiros ramos septais e diagonais. Qual território entra em isquemia?',
  'Anterior LV, apex, and anterior two-thirds of the septum (V1–V4)': 'VE anterior, ápice e dois terços anteriores do septo (V1–V4)',
  'Inferior LV and posterior third of the septum (II, III, aVF)': 'VE inferior e terço posterior do septo (II, III, aVF)',
  'Isolated lateral LV wall and left atrium': 'Parede lateral isolada do VE e átrio esquerdo',
  'Right ventricular free wall and SA node': 'Parede livre do ventrículo direito e nó SA',
  'Proximal LAD occlusion threatens the anterior LV wall, apex, anterior two-thirds of the interventricular septum (bundle branches), and anterolateral LV.': 'A oclusão proximal da DA (DAE) ameaça a parede anterior do VE, o ápice, os dois terços anteriores do septo interventricular (ramos do feixe) e a região anterolateral do VE.',
  'Proximal RCA occlusion (right dominance)': 'Oclusão proximal da ACD (dominância direita)',
  'In a right-dominant heart, proximal RCA occlusion threatens which combination of structures?': 'Em um coração com dominância direita, a oclusão proximal da ACD ameaça qual conjunto de estruturas?',
  'RV free wall, inferior LV, SA/AV nodes, and posteromedial papillary muscle': 'Parede livre do VD, VE inferior, nós SA/AV e músculo papilar posteromedial',
  'Anterior LV wall and anterior two-thirds of the septum': 'Parede anterior do VE e dois terços anteriores do septo',
  'Lateral LV wall and anterolateral papillary muscle only': 'Apenas parede lateral do VE e músculo papilar anterolateral',
  'Left atrium and pulmonary trunk': 'Átrio esquerdo e tronco pulmonar',
  'A proximal RCA lesion before the RV marginal and PDA branches causes RV and inferior LV ischemia, nodal conduction block, and posteromedial papillary muscle dysfunction.': 'Uma lesão proximal da ACD antes dos ramos marginais do VD e da DP causa isquemia do VD e do VE inferior, bloqueio nodal e disfunção do músculo papilar posteromedial.',
  'LCx occlusion (left dominance)': 'Oclusão da Cx/ACx (dominância esquerda)',
  'In a left-dominant heart, proximal LCx occlusion cuts off both obtuse marginal and PDA flow. Which territories become ischemic?': 'Em dominância esquerda, a oclusão proximal da Cx interrompe o fluxo marginal obtuso e da DP. Quais territórios ficam isquêmicos?',
  'Lateral and inferior LV, posterior septum, and posteromedial papillary muscle': 'VE lateral e inferior, septo posterior e músculo papilar posteromedial',
  'Right ventricular free wall and anterior septum': 'Parede livre do VD e septo anterior',
  'Anterior LV wall and apex only': 'Apenas parede anterior do VE e ápice',
  'Right atrium and anterior tricuspid leaflet': 'Átrio direito e cúspide anterior da tricúspide',
  'In left dominance the LCx supplies the lateral wall, the inferior wall, the posterior third of the septum, and the posteromedial papillary muscle.': 'Na dominância esquerda, a Cx/ACx irriga a parede lateral, a parede inferior, o terço posterior do septo e o músculo papilar posteromedial.',
  'Left main coronary artery (LMCA) occlusion': 'Oclusão do tronco da coronária esquerda (TCE)',
  'Acute occlusion of the left main coronary artery simultaneously cuts off LAD and LCx flow. Which territory is at risk?': 'A oclusão aguda do tronco da coronária esquerda (TCE) interrompe simultaneamente o fluxo da DA e da Cx. Qual território está em risco?',
  'Anterior, lateral, and apical LV plus anterior septum': 'VE anterior, lateral e apical, além do septo anterior',
  'Right atrium and SA node only': 'Apenas átrio direito e nó SA',
  'Inferior right ventricle only': 'Apenas ventrículo direito inferior',
  'Posterior third of the septum only': 'Apenas terço posterior do septo',
  'Because the left main bifurcates into the LAD and LCx, its occlusion causes extensive anterior, lateral, and septal LV ischemia with high risk of cardiogenic shock.': 'Como o TCE se bifurca em DA e Cx, sua oclusão provoca isquemia extensa anterior, lateral e septal do VE, com alto risco de choque cardiogênico.',
  'PDA occlusion': 'Oclusão da DP (AIP)',
  'Occlusion of the posterior descending artery (PDA) selectively endangers which deep LV structure alongside the inferior wall and posterior septum?': 'A oclusão da artéria interventricular posterior (DP/AIP) coloca em risco seletivo qual estrutura profunda do VE além da parede inferior e do septo posterior?',
  'Anterior RV papillary muscle (moderator band)': 'Músculo papilar anterior do VD (banda moderadora)',
  'Left atrial appendage': 'Aurícula esquerda',
  'The posteromedial papillary muscle usually depends solely on the PDA, so PDA ischemia can cause papillary rupture and acute mitral regurgitation.': 'O músculo papilar posteromedial costuma depender exclusivamente da DP/AIP; por isso, sua isquemia pode causar ruptura papilar e insuficiência mitral aguda.',
  'Diffuse anterior + lateral ST changes': 'Alterações difusas de ST anterior + lateral',
  // R4 Cross-deck neighbor contrasts
  'The great cardiac vein drains along the anterior groove beside the LAD before curving under the left auricle beside the LCx.': 'A grande veia cardíaca drena pelo sulco interventricular anterior ao lado da DA antes de contornar sob a aurícula esquerda junto à Cx.',
  'The great cardiac vein accompanies the circumflex artery in the left AV groove before widening into the coronary sinus.': 'A grande veia cardíaca acompanha a artéria circunflexa no sulco atrioventricular esquerdo antes de se alargar no seio coronário.',
  'The middle cardiac vein ascends beside the PDA in the posterior interventricular groove toward the coronary sinus.': 'A veia cardíaca média ascende ao lado da DP no sulco interventricular posterior até o seio coronário.',
  'The small cardiac vein runs in the right AV groove alongside the RCA before opening into the coronary sinus.': 'A veia cardíaca pequena percorre o sulco atrioventricular direito junto à ACD antes de desembocar no seio coronário.',
  'The posterior vein of the LV ascends on the inferior LV wall near the posterolateral arterial branches.': 'A veia posterior do VE ascende na parede inferior do VE próxima aos ramos arteriais posterolaterais.',
  'The coronary sinus is the wide venous channel in the posterior left AV groove; the circumflex artery runs alongside it.': 'O seio coronário é o canal venoso largo no sulco AV esquerdo posterior; a artéria circunflexa corre ao seu lado.',
  'In the superior view, the pulmonary valve sits anteriorly and the aortic valve sits posteriorly right behind it.': 'Na vista superior, a valva pulmonar fica em posição anterior e a valva aórtica fica imediatamente posterior a ela.',
  'Pulmonary cusps guard the anterior outflow trunk to the lungs; aortic cusps sit posteriorly at the root of the aorta.': 'As cúspides pulmonares guardam a via de saída anterior para os pulmões; as cúspides aórticas ficam posteriormente na raiz da aorta.',
  'The anterior mitral leaflet is an inlet flap continuous with the aortic root, whereas aortic cusps guard the outflow tract.': 'A cúspide anterior da mitral é uma valva de entrada contínua com a raiz aórtica, enquanto as cúspides aórticas guardam a via de saída.',
  'The septal tricuspid leaflet sits on the right and attaches more apically than the anterior mitral leaflet on the left.': 'A cúspide septal da tricúspide fica à direita e tem inserção mais apical que a cúspide anterior da mitral à esquerda.',
  'The pulmonary trunk arises anteriorly from the RV and crosses in front of the ascending aorta, which rises behind it from the LV.': 'O tronco pulmonar origina-se anteriormente do VD e cruza à frente da aorta ascendente, que sobe posteriormente a partir do VE.',
  'The SVC enters the upper right atrium from above; the right atrium is the chamber forming the right cardiac border.': 'A VCS entra por cima no átrio direito; o átrio direito é a câmara que forma a borda cardíaca direita.',
  'The IVC ascends through the diaphragm at T8 into the inferior right atrium; the right atrium is the receiving chamber itself.': 'A VCI atravessa o diafragma em T8 para entrar na porção inferior do átrio direito; o átrio direito é a própria câmara receptora.',
  'The right ventricle is the broad anterior chamber whose infundibulum narrows upward into the pulmonary trunk.': 'O ventrículo direito é a câmara anterior ampla cujo infundíbulo se estreita superiormente até o tronco pulmonar.',
  'The left ventricle forms the thick-walled apex; the ascending aorta is the systemic outflow vessel rising from it.': 'O ventrículo esquerdo forma o ápice de parede espessa; a aorta ascendente é o vaso de saída sistêmico que parte dele.',
  'The left atrium forms the posterior cardiac base; the esophagus is the muscular tube descending directly behind it.': 'O átrio esquerdo forma a base posterior do coração; o esôfago é o tubo muscular que desce diretamente atrás dele.',
  'The descending thoracic aorta runs to the left of the vertebral bodies, whereas the esophagus descends in front of it toward T10.': 'A aorta torácica descendente corre à esquerda dos corpos vertebrais, enquanto o esôfago desce à frente dela rumo a T10.',
  'The trachea is the anterior cartilaginous airway; the esophagus lies directly posterior to its membranous wall.': 'A traqueia é a via aérea cartilaginosa anterior; o esôfago situa-se diretamente atrás de sua parede membranácea.',
  'The right main bronchus is the airway fork to the right lung; the right pulmonary artery crosses anterior to it at the hilum.': 'O brônquio principal direito é o ramo da via aérea para o pulmão direito; a artéria pulmonar direita cruza à sua frente no hilo.',
  'The left main bronchus passes beneath the aortic arch and left pulmonary artery; the artery arches above it.': 'O brônquio principal esquerdo passa sob o arco aórtico e a artéria pulmonar esquerda; a artéria arqueia-se acima dele.',
});
for (const [source, translated] of Object.entries(content)) {
  // A pulmonary lobe is a lobo, not a smaller pulmonary lobule.
  if (/\blobes?\b/i.test(source) && !/\blobules?\b/i.test(source)) {
    content[source] = translated.replace(/\blóbulo(s)?\b/gi, (match, plural = '') =>
      (match[0] === match[0].toUpperCase() ? 'Lobo' : 'lobo') + plural);
  }
}
Object.assign(ui, {
  'Z-Anatomy': 'Z-Anatomy', 'Rotatable anatomical model': 'Modelo anatômico giratório',
  'Type it': 'Digite o nome', 'First letter + clue': 'Primeira letra e dica', 'From memory': 'De memória',
  'Recall all of ZXVAR0ZX': 'Relembrar todas as estruturas de ZXVAR0ZX',
  'ZXVAR0ZX · full recall': 'ZXVAR0ZX · revisão completa',
  'ZXVAR0ZX structures · one continuous recall, including unstudied material.': 'ZXVAR0ZX estruturas em uma revisão contínua, inclusive as ainda não estudadas.',
  'ZXVAR1ZX structures · one continuous recall, including unstudied material.': 'ZXVAR1ZX estruturas em uma revisão contínua, inclusive as ainda não estudadas.',
  '/ ZXVAR4ZX recalled': '/ ZXVAR4ZX lembradas',
  'ZXVAR2ZX of ZXVAR3ZX levels passed · Pass by recalling every structure in Rounds 2 and 3.': 'ZXVAR2ZX de ZXVAR3ZX níveis concluídos · Para passar, lembre todas as estruturas nas rodadas 2 e 3.',
  'Recall the name from a close-up, without a clue.': 'Lembre o nome a partir de uma visão aproximada, sem dica.',
  'Recall due structures from a close-up.': 'Lembre as estruturas programadas para revisão a partir de uma visão aproximada.',
  'Replay the recall rounds to pass': 'Repita as rodadas de revisão para passar',
  'To unlock the next level, recall every structure at least once in both recall rounds.': 'Para desbloquear o próximo nível, lembre cada estrutura pelo menos uma vez nas duas rodadas de revisão.',
  'L/R = patient’s': 'L/R = lados do paciente',
  'No streak yet': 'Nenhuma sequência ainda',
  'Theme settings (ZXVAR0ZX)': 'Configurações de tema (ZXVAR0ZX)',
  'Type answer': 'Digite a resposta', 'Check answer': 'Conferir resposta',
  'ZXVAR0ZX of ZXVAR1ZX structures': 'ZXVAR0ZX de ZXVAR1ZX estruturas',
  'ZXVAR0ZX of ZXVAR1ZX structures answered.': 'ZXVAR0ZX de ZXVAR1ZX estruturas respondidas.',
  'ZXVAR0ZX of ZXVAR1ZX structures located.': 'ZXVAR0ZX de ZXVAR1ZX estruturas localizadas.',
  'It will come up again.': 'Ela aparecerá novamente.',
  'ZXVAR4ZX structures · ZXVAR5ZX': 'ZXVAR4ZX estruturas · ZXVAR5ZX',
  'Pass ZXVAR0ZX to ZXVAR1ZX': 'Conclua ZXVAR0ZX para ZXVAR1ZX',
  'open this bonus': 'abrir este bônus', 'unlock': 'desbloquear',
  'One structure from memory.': 'Uma estrutura para lembrar de memória.',
  'Practice': 'Praticar', 'Check answer': 'Conferir resposta',
  'Theme settings (Dark)': 'Configurações de tema (Escuro)',
  'Theme settings (Light)': 'Configurações de tema (Claro)',
  'Theme settings (System)': 'Configurações de tema (Sistema)',
  'Pairs with ZXVAR0ZX': 'Relacionado a ZXVAR0ZX',
  'of ZXVAR1ZX stars': 'de ZXVAR1ZX estrelas', 'day streak': 'dias de sequência',
  'ZXVAR1ZX/ZXVAR2ZX mastered': 'ZXVAR1ZX/ZXVAR2ZX dominadas',
  'Finish a recall round to start tracking.': 'Conclua uma rodada de revisão para começar a acompanhar seu progresso.',
  'Blood pathway': 'Trajeto do sangue',
  'Airways and lungs': 'Vias aéreas e pulmões',
  'Coronary territories': 'Territórios coronários',
  'Artery branching': 'Ramificação das artérias',
  'Where each artery comes from, what it divides into, where it changes name.': 'De onde vem cada artéria, em que se divide e onde muda de nome.',
  'Neck & upper limb arteries': 'Artérias do pescoço e do membro superior',
  'Neck and upper limb': 'Pescoço e membro superior',
  "Professor's slides": 'Slides do professor',
  'All decks': 'Todas as aulas', 'Lecture deck': 'Aula',
  'Heart': 'Coração', 'Aorta and arteries': 'Aorta e artérias', 'Veins': 'Veias', 'Lymphatic system': 'Sistema linfático',
  'Cardiogenesis': 'Cardiogênese', 'Upper airways and larynx': 'Vias aéreas superiores e laringe',
  'Trachea, bronchi and lungs': 'Traqueia, brônquios e pulmões',
  'Next run': 'Próxima rodada', 'Weak topics': 'Tópicos fracos', 'Question review': 'Revisão das questões',
});

// Identifiers, view directions, blood flags and structural IDs must never be translated.
const structuralKeys = new Set([
  'id', 'en', 'alt', 'ctx', 'ids', 'focus', 'scope', 'chips', 'view', 'region', 'level',
  'anchors', 'key', 'choice', 'storagePrefix', 'cor',
  'mode', 'reveal', 'ecg', 'blood', 'abbr', 'arteries', 'clinicalAbbr', 'neighborMap',
  'group', 'visible', 'ghost', 'unit', 'ref', 'questionIds',
]);
function translateValue(value, key = '', dictionary = content) {
  if (structuralKeys.has(key)) return value;
  if (key === 'LEVEL_CONTRAST' && value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([id, contrast]) => [id, {
      ...translateValue(contrast, '', dictionary), a: contrast.a, b: contrast.b,
    }]));
  }
  if (typeof value === 'string') {
    const translated = Object.hasOwn(dictionary, value) ? dictionary[value] : value;
    return /^[A-Z]/.test(value) && /^[a-zà-ÿ]/.test(translated)
      ? translated[0].toLocaleUpperCase('pt-BR') + translated.slice(1) : translated;
  }
  if (Array.isArray(value)) return value.map(item => translateValue(item, key, dictionary));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, translateValue(item, name, dictionary)]));
  return value;
}

const PT_BR_CLINICAL_ABBR = {
  ad: 'AD', ae: 'AE', vd: 'VD', ve: 'VE',
  acd: 'ACD', tce: 'TCE', dae: 'DA', cx: 'Cx', dp: 'DP',
  vcs: 'VCS', vci: 'VCI', tp: 'TP', apd: 'APD', ape: 'APE',
  vpsd: 'VPSD', vpid: 'VPID', vpse: 'VPSE', vpie: 'VPIE',
  seio: 'SC', vcmagna: 'GVC', vcmedia: 'VCM', vcparva: 'VCP',
  bpd: 'BPD', bpe: 'BPE', bint_d: 'BI',
  lobo_sup_d: 'LSD', lobo_med_d: 'LMD', lobo_inf_d: 'LID', lobo_sup_e: 'LSE', lobo_inf_e: 'LIE',
  ccd: 'ACCD', cce: 'ACCE', scd: 'ASCD', sce: 'ASCE',
  ita_d: 'ATID', ita_e: 'ATIE',
  lar_pca: 'CAP', lar_lca: 'CAL',
};

const PT_BR_VEIN_ARTERY_LABELS = {
  vcmagna: 'DA / Cx',
  vcmedia: 'DP',
  vcparva: 'ACD',
  vpve: 'Ramos posterolaterais',
  seio: 'Cx / DP (sulco AV)',
};

const PT_BR_ECG = {
  'Diffuse anterior + lateral ST changes': 'Alterações difusas de ST anterior + lateral',
};

const PT_BR_SLIDE_UNITS = {
  heart: 'Coração',
  arteries: 'Aorta e artérias',
  veins: 'Veias',
  lymph: 'Sistema linfático',
  cardiogenesis: 'Cardiogênese',
  airwaysUpper: 'Vias aéreas superiores e laringe',
  airwaysLower: 'Traqueia, brônquios e pulmões',
};

const PT_BR_EXTRA_ALIASES = {
  ad: ['AD'], ae: ['AE'], vd: ['VD'], ve: ['VE'],
  acd: ['ACD'], tce: ['TCE'], dae: ['DA', 'DAE'], cx: ['Cx', 'ACx'], dp: ['DP', 'AIP'],
  vcs: ['VCS'], vci: ['VCI'], tp: ['TP'], apd: ['APD'], ape: ['APE'],
  vpsd: ['VPSD'], vpid: ['VPID'], vpse: ['VPSE'], vpie: ['VPIE'],
  seio: ['SC'], vcmagna: ['GVC'], vcmedia: ['VCM'], vcparva: ['VCP'],
  bpd: ['BPD'], bpe: ['BPE'],
};

export function localizePack(pack) {
  const localized = { ...pack };
  for (const [key, dictionary] of [['aulas', pack.aulasPt], ['slideQuestions', pack.aulasPt], ['notes', pack.notesPt], ['arteryTree', pack.arteryTreePt],
    ['branches', pack.branchesPt], ['branchGroups', pack.branchesPt]]) {
    if (pack[key]) localized[key] = translateValue(pack[key], key, { ...content, ...dictionary });
  }
  for (const key of ['decks', 'regions', 'content', 'lessons', 'territories', 'bloodFlow', 'pairContrasts', 'regionPurposes', 'tagline', 'description', 'mapHeading', 'atlasNote']) {
    if (pack[key] !== undefined) localized[key] = translateValue(pack[key]);
  }
  if (pack.slideUnits) {
    localized.slideUnits = Object.fromEntries(Object.entries(pack.slideUnits).map(([id, unit]) =>
      [id, { ...unit, label: PT_BR_SLIDE_UNITS[id] || translateValue(unit.label, 'label', { ...content, ...pack.aulasPt }) }]));
  }
  if (pack.clinicalAbbr) {
    localized.clinicalAbbr = Object.fromEntries(
      Object.entries(pack.clinicalAbbr).map(([id, abbr]) => [id, PT_BR_CLINICAL_ABBR[id] || abbr]),
    );
  }
  if (pack.veinArteryPairs) {
    localized.veinArteryPairs = Object.fromEntries(
      Object.entries(pack.veinArteryPairs).map(([id, pair]) => [id, {
        ...pair,
        label: PT_BR_VEIN_ARTERY_LABELS[id] || pair.label,
      }]),
    );
  }
  if (Array.isArray(localized.territories)) {
    localized.territories = localized.territories.map(t => t.ecg && Object.hasOwn(PT_BR_ECG, t.ecg)
      ? { ...t, ecg: PT_BR_ECG[t.ecg] } : t);
  }
  localized.decks = localized.decks.map((deck, deckIndex) => ({ ...deck,
    itens: deck.itens.map((item, itemIndex) => {
      const original = pack.decks[deckIndex].itens[itemIndex];
      const translatedAliases = (original.alt || []).map(name => aliases[name]).filter(t => t && t !== 'rapaz');
      const extraAliases = PT_BR_EXTRA_ALIASES[item.id] || [];
      return { ...item, pt: structureNames[item.id] || item.pt,
        alt: [...new Set([...(original.alt || []), original.pt, ...translatedAliases, ...extraAliases])] };
    }),
  }));
  return localized;
}

const squash = text => text.replace(/\s+/g, ' ').trim();
const quoteRegex = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const templates = Object.entries(ui).filter(([source, target]) => {
  const tokens = source.match(/ZXVAR\d+ZX/g) || [];
  if (!tokens.length || !target || !/[A-Za-z]{2}/.test(source.replace(/ZXVAR\d+ZX/g, ''))) return false;
  return [...tokens].sort().join('|') === (target.match(/ZXVAR\d+ZX/g) || []).sort().join('|');
}).map(([source, target]) => {
  const parts = source.split(/(ZXVAR\d+ZX)/g);
  const tokens = parts.filter(part => /^ZXVAR\d+ZX$/.test(part));
  const pattern = parts.map(part => /^ZXVAR\d+ZX$/.test(part) ? '(.*?)' : quoteRegex(part)).join('');
  return { source, target, tokens, regex: new RegExp(`^${pattern}$`), specificity: source.replace(/ZXVAR\d+ZX/g, '').length };
}).sort((a, b) => b.specificity - a.specificity);

export function translateInterface(text, depth = 0) {
  const normalized = squash(text);
  if (!normalized) return text;
  let result = Object.hasOwn(ui, normalized) ? ui[normalized] : content[normalized];
  const reviews = normalized.match(/^\+(\d+) reviews?$/);
  const streak = normalized.match(/^(\d+)-day streak$/);
  if (reviews) result = `+${reviews[1]} ${reviews[1] === '1' ? 'revisão' : 'revisões'}`;
  if (streak) result = `${streak[1]} ${streak[1] === '1' ? 'dia' : 'dias'} de sequência`;
  if (!result) {
    for (const template of templates) {
      const match = normalized.match(template.regex);
      if (!match) continue;
      const values = Object.fromEntries(template.tokens.map((token, i) => {
        const captured = match[i + 1];
        return [token, depth < 3 && captured.length < normalized.length ? translateInterface(captured, depth + 1) : captured];
      }));
      result = template.target.replace(/ZXVAR\d+ZX/g, token => values[token] ?? token);
      break;
    }
  }
  if (!result || result === normalized) return text;
  return (text.match(/^\s*/)?.[0] || '') + result + (text.match(/\s*$/)?.[0] || '');
}

// Translate the app's authored UI messages whenever a screen or status changes.
// The input display is excluded so a learner's typed answer is never altered.
export function installInterfaceTranslation(root = document) {
  const attrs = ['aria-label', 'title', 'placeholder'];
  const ignore = element => element?.closest?.('script, style, textarea, code, #word, [translate="no"]');
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (ignore(node.parentElement)) return;
      const next = translateInterface(node.nodeValue || '');
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || ignore(node)) return;
    for (const attr of attrs) {
      if (!node.hasAttribute(attr)) continue;
      const value = node.getAttribute(attr), next = translateInterface(value);
      if (next !== value) node.setAttribute(attr, next);
    }
    for (const child of node.childNodes) translateNode(child);
  }
  translateNode(root.documentElement || root);
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' || mutation.type === 'characterData') translateNode(mutation.target);
      else for (const node of mutation.addedNodes) translateNode(node);
    }
  });
  observer.observe(root.documentElement || root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs });
  return observer;
}
