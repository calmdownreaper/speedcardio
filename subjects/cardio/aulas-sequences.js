// Professor's cardiogenesis C2–C3, C6–C7, C13, C15, C20, C31, C52–C54;
// lymphatics L2–L4, L8, L10–L12, L14–L18. Model landmarks are adult anatomy.
export function createAulaSequences(text) {
  const t = text;
  const card = (id, short, title, ref, facts, focus = [], view, contextOnly = false) => ({
    id, short, title, ref, facts, focus, ...(view ? { view } : {}), ...(contextOnly ? { contextOnly: true } : {})
  });
  const cardiogenesis = {
    id: 'sequence-cardiogenesis', unit: 'cardiogenesis', sequence: true, sequenceOnly: true,
    title: t('Cardiogenesis: weeks 3–8 and birth', 'Cardiogênese: semanas 3–8 e nascimento'),
    cards: [
      card('cardiogenesis-week-3', t('Week 3', 'Semana 3'), t('Early vessels and cardiac tubes', 'Vasos iniciais e tubos cardíacos'), 'C6–C7, C20', [
        t('Angiogenic clusters appear in the yolk sac and chorion; paired endocardial tubes begin to form and fuse.', 'Agrupamentos angiogênicos surgem no saco vitelino e no córion; tubos endocárdicos pares começam a se formar e a se fundir.'),
        t('Events overlap across weeks. Any 3D heart shown is an adult model, not an embryo.', 'Os eventos se sobrepõem entre as semanas. Qualquer coração 3D exibido é um modelo adulto, não um embrião.')
      ]),
      card('cardiogenesis-week-4', t('Week 4', 'Semana 4'), t('Looping and early circulation', 'Formação da alça e circulação inicial'), 'C13, C15, C20', [
        t('The cardiac tube folds into an S shape between days 23 and 28.', 'O tubo cardíaco dobra-se em forma de S entre os dias 23 e 28.'),
        t('The slide places the first irregular contractions at the end of day 23 and intraembryonic circulation at day 25.', 'O slide situa as primeiras contrações irregulares no fim do dia 23 e a circulação intraembrionária no dia 25.')
      ]),
      card('cardiogenesis-week-5', t('Week 5', 'Semana 5'), t('Chambers and septation', 'Câmaras e septação'), 'C31, C42, C52', [
        t('The asymmetric venous system and four cardiac chambers develop; aortic–pulmonary septation begins.', 'O sistema venoso assimétrico e as quatro câmaras cardíacas se desenvolvem; começa a septação aortopulmonar.'),
        t('The interventricular opening narrows but has not yet closed.', 'A abertura interventricular estreita-se, mas ainda não se fechou.'),
        t('The highlighted adult chambers are context for the structures being formed.', 'As câmaras adultas destacadas são contexto para as estruturas em formação.')
      ], ['ad','ae','vd','ve'], 'ant', true),
      card('cardiogenesis-week-6', t('Week 6', 'Semana 6'), t('Aortic arch remodeling', 'Remodelação dos arcos aórticos'), 'C52', [
        t('The aortic arches remodel during the sixth week.', 'Os arcos aórticos remodelam-se durante a sexta semana.'),
        t('The highlighted aortic arch is an adult landmark, not the embryonic arches.', 'O arco aórtico destacado é uma referência adulta, não os arcos embrionários.')
      ], ['arco'], 'ant', true),
      card('cardiogenesis-week-7', t('Week 7', 'Semana 7'), t('Flow and septal division', 'Divisão do fluxo e dos septos'), 'C52', [
        t('The aortic and pulmonary flows become completely divided.', 'Os fluxos aórtico e pulmonar tornam-se completamente separados.'),
        t('The ostium secundum and foramen ovale form, and the interventricular septum closes.', 'Formam-se o óstio secundum e o forame oval, e o septo interventricular se fecha.'),
        t('The adult great vessels are shown only as context.', 'Os grandes vasos adultos são mostrados apenas como contexto.')
      ], ['aoasc','tp'], 'ant', true),
      card('cardiogenesis-week-8', t('Week 8', 'Semana 8'), t('Fetal heart configuration', 'Configuração do coração fetal'), 'C52', [
        t('The slide places complete development of the heart valves in week eight.', 'O slide situa o desenvolvimento completo das valvas cardíacas na oitava semana.'),
        t('The heart has the characteristics of the fetal apparatus.', 'O coração apresenta as características do aparelho fetal.'),
        t('The highlighted valves belong to the adult model.', 'As valvas destacadas pertencem ao modelo adulto.')
      ], ['tri_ant','tri_post','tri_sep','mit_ant','mit_post','ao_ant','ao_post_d','ao_post_e','pulm_ant_e','pulm_ant_d','pulm_post'], 'sup', true),
      card('cardiogenesis-birth', t('Birth', 'Nascimento'), t('Transition to pulmonary circulation', 'Transição para a circulação pulmonar'), 'C53–C54', [
        t('With breathing, pulmonary blood flow and venous return to the left atrium increase.', 'Com a respiração, aumentam o fluxo pulmonar e o retorno venoso ao átrio esquerdo.'),
        t('Pressure changes bring the atrial septa together; the arterial duct begins to close.', 'As mudanças de pressão aproximam os septos atriais; o ducto arterial começa a se fechar.'),
        t('The adult heart and pulmonary vessels are contextual landmarks.', 'O coração e os vasos pulmonares adultos são referências de contexto.')
      ], ['ae','apd','ape','vpse','vpie','vpsd','vpid'], 'ant', true),
    ],
  };
  const lymph = {
    id: 'sequence-lymph', unit: 'lymph', sequence: true, sequenceOnly: true,
    title: t('Lymphatic return: tissues to veins', 'Retorno linfático: dos tecidos às veias'),
    cards: [
      card('lymph-interstitium', t('Tissues', 'Tecidos'), t('Fluid in the tissues', 'Líquido nos tecidos'), 'L2–L4, L8', [
        t('Lymphatic vessels collect excess fluid from tissues and return it to the venous system.', 'Os vasos linfáticos recolhem o excesso de líquido dos tecidos e o devolvem ao sistema venoso.'),
        t('Fluid outside blood capillaries in connective tissue is interstitial fluid.', 'O líquido fora dos capilares sanguíneos no tecido conjuntivo é líquido intersticial.')
      ]),
      card('lymph-capillaries', t('Capillaries', 'Capilares'), t('Entry into lymphatic capillaries', 'Entrada nos capilares linfáticos'), 'L8, L10', [
        t('Blind-ended lymphatic capillaries absorb fluid directly from interstitial spaces.', 'Capilares linfáticos de fundo cego absorvem líquido diretamente dos espaços intersticiais.'),
        t('Their wall consists of a single endothelial cell layer.', 'Sua parede consiste em uma única camada de células endoteliais.')
      ]),
      card('lymph-collectors', t('Collectors and nodes', 'Coletores e linfonodos'), t('Larger vessels and lymph nodes', 'Vasos maiores e linfonodos'), 'L8, L10–L11', [
        t('Larger lymphatic vessels arise from capillary networks and pass through lymph nodes.', 'Vasos linfáticos maiores surgem das redes capilares e passam por linfonodos.'),
        t('Superficial, deep and organ-specific systems are connected by perforating branches.', 'Os sistemas superficial, profundo e específico dos órgãos são conectados por ramos perfurantes.')
      ]),
      card('lymph-trunks', t('Trunks', 'Troncos'), t('Lymphatic trunks', 'Troncos linfáticos'), 'L14–L16', [
        t('The cisterna chyli receives the intestinal and inferior lumbar trunks.', 'A cisterna do quilo recebe os troncos intestinal e lombares inferiores.'),
        t('Jugular, subclavian and bronchomediastinal trunks collect lymph from neck, upper limb and thorax.', 'Os troncos jugular, subclávio e broncomediastinal recolhem linfa do pescoço, membro superior e tórax.')
      ]),
      card('lymph-left', t('Thoracic duct', 'Ducto torácico'), t('Thoracic duct: left and below the diaphragm', 'Ducto torácico: esquerda e regiões abaixo do diafragma'), 'L12, L14–L16', [
        t('The thoracic duct collects lymph from below the diaphragm and the left side above it.', 'O ducto torácico recolhe linfa das regiões abaixo do diafragma e do lado esquerdo acima dele.'),
        t('It receives left jugular, subclavian and bronchomediastinal trunks and enters the venous system near the left subclavian vein.', 'Ele recebe os troncos jugular, subclávio e broncomediastinal esquerdos e entra no sistema venoso próximo à veia subclávia esquerda.'),
        t('The highlighted vein is a nearby adult landmark; the duct itself is not shown.', 'A veia destacada é uma referência adulta próxima; o próprio ducto não está representado.')
      ], ['vsc_e'], 'ant', true),
      card('lymph-right', t('Right drainage', 'Drenagem direita'), t('Right upper drainage', 'Drenagem superior direita'), 'L12, L15', [
        t('The right upper territory drains through the right jugular, subclavian and bronchomediastinal pathways.', 'O território superior direito drena pelas vias jugular, subclávia e broncomediastinal direitas.'),
        t('The slide describes a common right lymphatic duct in 20% of people; otherwise the trunks drain separately into veins.', 'O slide descreve um ducto linfático direito comum em 20% das pessoas; nos demais casos os troncos drenam separadamente nas veias.'),
        t('The highlighted right subclavian vein is a nearby landmark; the duct itself is not shown.', 'A veia subclávia direita destacada é uma referência próxima; o próprio ducto não está representado.')
      ], ['vsc_d'], 'ant', true),
      card('lymph-venous', t('Venous return', 'Retorno venoso'), t('Return to the venous system', 'Retorno ao sistema venoso'), 'L2, L12, L15', [
        t('The lymphatic pathways return collected fluid to the venous system.', 'As vias linfáticas devolvem o líquido recolhido ao sistema venoso.'),
        t('The left and right upper routes are alternatives for different territories, not consecutive steps.', 'As vias superiores esquerda e direita são alternativas para territórios diferentes, não etapas consecutivas.'),
        t('The highlighted veins are landmarks for the drainage region.', 'As veias destacadas são referências da região de drenagem.')
      ], ['vsc_d','vsc_e','vbcd','vbce'], 'ant', true),
      card('lymph-heart', t('Heart networks', 'Redes do coração'), t('Cardiac wall lymphatics', 'Linfáticos da parede cardíaca'), 'L17', [
        t('The subendocardial network drains directly or via the myocardial network to the subepicardial network.', 'A rede subendocárdica drena diretamente ou pela rede miocárdica para a rede subepicárdica.'),
        t('The subepicardial network drains into collector vessels and cardiac lymph nodes.', 'A rede subepicárdica drena para vasos coletores e linfonodos cardíacos.'),
        t('The highlighted ventricular wall is an adult landmark; the lymphatic networks are not shown.', 'A parede ventricular destacada é uma referência adulta; as redes linfáticas não estão representadas.')
      ], ['paredev'], 'ant', true),
    ],
  };
  return [cardiogenesis, lymph];
}
