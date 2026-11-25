// Lesson content follows the Heart slide digest (H6–H54). Question IDs use the
// same stable formula as slides/index.js; each slide belongs to one block.
import heartQuestions from './slides/heart.js?v=100';

const textPairs = [
  ['Circulation and position', 'Circulação e posição'],
  ['Pulmonary and systemic circuits', 'Circulações pulmonar e sistêmica'],
  ['The heart has two pumps: right chambers carry deoxygenated blood to the lungs (pulmonary circulation); left chambers carry oxygenated blood to the body (systemic circulation).', 'O coração tem duas bombas: as câmaras direitas levam sangue desoxigenado aos pulmões (circulação pulmonar); as esquerdas levam sangue oxigenado ao corpo (circulação sistêmica).'],
  ['The professor sorts blood vessels into four types: capacitance, conducting, distributing and exchange vessels.', 'O professor divide os vasos sanguíneos em quatro tipos: vasos de capacitância, condutores, distribuidores e de troca.'],
  ['The overview also notes the portal system and lymphatic vessels alongside these circuits.', 'O panorama também inclui o sistema porta e os vasos linfáticos ao lado desses circuitos.'],
  ['Pulmonary circulation connects heart and lungs (right pump); systemic circulation connects heart and body (left pump).', 'A circulação pulmonar conecta coração e pulmões (lado direito); a sistêmica conecta coração e corpo (lado esquerdo).'],

  ['Anterior thoracic wall', 'Parede anterior do tórax'],
  ['The sternum and ribs form the main landmarks of the anterior thoracic wall.', 'O esterno e as costelas são as principais referências da parede anterior do tórax.'],
  ['The internal thoracic artery and vein run along the inner anterior wall beside the sternum, with the transversus thoracis muscle next to them.', 'A artéria e a veia torácicas internas correm na face interna da parede anterior, ao lado do esterno, junto ao músculo transverso do tórax.'],
  ['The phrenic nerve runs alongside the pericardiacophrenic artery and vein on the anterior thoracic wall.', 'O nervo frênico corre junto com a artéria e a veia pericardiofrênicas na parede torácica anterior.'],
  ['Internal thoracic branches include the musculophrenic and superior epigastric arteries.', 'Os ramos da torácica interna incluem as artérias musculofrênica e epigástrica superior.'],
  ['The phrenic nerve accompanies the pericardiacophrenic vessels, whereas the vagus and recurrent laryngeal nerves follow separate paths.', 'O nervo frênico acompanha os vasos pericardiofrênicos; já os nervos vago e laríngeo recorrente seguem trajetos distintos.'],

  ['Heart in situ', 'Coração in situ'],
  ['The heart lies between the lungs and rests above the diaphragm, where the fibrous pericardium fuses with the diaphragm.', 'O coração fica entre os pulmões e repousa sobre o diafragma, onde o pericárdio fibroso se funde ao diafragma.'],
  ['The inferior border is called the acute margin, and the left border is called the obtuse margin.', 'A borda inferior é chamada de margem aguda, e a borda esquerda é chamada de margem obtusa.'],
  ['The transverse pericardial sinus is the passage between the aorta and pulmonary trunk in front and the superior vena cava behind.', 'O seio pericárdico transverso é a passagem entre a aorta e o tronco pulmonar à frente e a veia cava superior atrás.'],
  ['The acute margin is the inferior border; the obtuse margin is the left border.', 'A margem aguda é a borda inferior; a margem obtusa é a borda esquerda.'],

  ['Mediastinum and relations', 'Mediastino e relações'],
  ['The superior mediastinum extends upward to the superior thoracic opening; the inferior mediastinum extends to the diaphragm and is split into anterior, middle and posterior parts.', 'O mediastino superior estende-se até a abertura torácica superior; o mediastino inferior vai até o diafragma e subdivide-se em anterior, médio e posterior.'],
  ['The transverse section at the T8 vertebra shows the esophagus, descending aorta, azygos vein, thoracic duct and the ligamentum arteriosum (Italian: Legamento arterioso di Botallo).', 'O corte transversal no nível da vértebra T8 mostra esôfago, aorta descendente, veia ázigos, ducto torácico e ligamento arterioso (em italiano: Legamento arterioso di Botallo).'],
  ['On the lateral mediastinum views, the thymus gland is seen through the mediastinal pleura.', 'Nas vistas laterais do mediastino, o timo é visto através da pleura mediastinal.'],
  ['Anatomical relations of the heart include the thyroid, pleura, lungs and abdominal organs: liver, stomach, spleen and transverse colon.', 'As relações anatômicas do coração incluem tireoide, pleura, pulmões e órgãos abdominais: fígado, estômago, baço e cólon transverso.'],
  ['Superior and inferior (anterior, middle, posterior) are divisions of the mediastinum, not chambers of the heart.', 'Superior e inferior (anterior, médio e posterior) são divisões do mediastino, não câmaras cardíacas.'],

  ['Heart surfaces', 'Faces do coração'],
  ['The anterior surface is the sternocostal face; anteriorly, the pulmonary trunk gives off its left branch, the left pulmonary artery.', 'A face anterior é a face esternocostal; na frente, o tronco pulmonar dá seu ramo esquerdo, a artéria pulmonar esquerda.'],
  ['The posterior and inferior surface resting on the diaphragm is called the diaphragmatic face.', 'A face posterior e inferior que repousa sobre o diafragma é chamada de face diafragmática.'],
  ['On the posterior view, the coronary sinus runs in the coronary groove (which also carries the right coronary artery).', 'Na vista posterior, o seio coronário corre no sulco coronário (que também aloja a artéria coronária direita).'],
  ['The oblique vein of the left atrium, also called the vein of Marshall, runs on the posterior surface of the left atrium.', 'A veia oblíqua do átrio esquerdo, também chamada de veia de Marshall, percorre a face posterior do átrio esquerdo.'],
  ['The coronary sinus is a venous channel in the coronary groove, whereas the coronary arteries supply the heart muscle.', 'O seio coronário é um canal venoso no sulco coronário, enquanto as artérias coronárias irrigam o músculo cardíaco.'],

  ['Chambers and septum', 'Câmaras e septo'],
  ['Right atrium', 'Átrio direito'],
  ['The superior vena cava, inferior vena cava and coronary sinus all empty venous blood into the right atrium.', 'A veia cava superior, a veia cava inferior e o seio coronário desembocam sangue venoso no átrio direito.'],
  ['Internally, the right atrium shows the crista terminalis, pectinate muscles, the fossa ovalis (with its limbus) and the Koch triangle.', 'Internamente, o átrio direito apresenta a crista terminal, os músculos pectíneos, a fossa oval (com seu limbo) e o triângulo de Koch.'],
  ['The Eustachian valve lies at the opening of the inferior vena cava; the Thebesian valve lies at the opening of the coronary sinus.', 'A valva de Eustáquio fica na abertura da veia cava inferior; a valva de Tebésio fica na abertura do seio coronário.'],
  ['Eustachian valve = inferior vena cava; Thebesian valve = coronary sinus.', 'Valva de Eustáquio = veia cava inferior; valva de Tebésio = seio coronário.'],

  ['Right ventricle', 'Ventrículo direito'],
  ['The right ventricle contains trabeculae carneae, three papillary muscles (anterior, posterior and septal) and chordae tendineae.', 'O ventrículo direito contém trabéculas cárneas, três músculos papilares (anterior, posterior e septal) e cordas tendíneas.'],
  ['The conus arteriosus is the outflow funnel that directs blood up to the pulmonary trunk.', 'O cone arterial é o funil de saída que direciona o sangue para o tronco pulmonar.'],
  ['The moderator band is another name for the septomarginal trabecula.', 'A banda moderadora é outro nome da trabécula septomarginal.'],
  ['The moderator band is a right ventricular trabecula, not an atrial pectinate muscle.', 'A banda moderadora é uma trabécula do ventrículo direito, não um músculo pectíneo do átrio.'],

  ['Left atrium', 'Átrio esquerdo'],
  ['Four pulmonary veins bring oxygenated blood from the lungs into the left atrium.', 'Quatro veias pulmonares trazem sangue oxigenado dos pulmões para o átrio esquerdo.'],
  ['Internally, the atrial wall shows the fossa ovalis and the valve of the foramen ovale.', 'Internamente, a parede atrial mostra a fossa oval e a valva do forame oval.'],
  ['The left atrium empties into the left ventricle through the mitral valve.', 'O átrio esquerdo esvazia-se no ventrículo esquerdo pela valva mitral.'],
  ['Pulmonary veins enter the left atrium; venae cavae enter the right atrium.', 'As veias pulmonares chegam ao átrio esquerdo; as veias cavas chegam ao átrio direito.'],

  ['Left ventricle', 'Ventrículo esquerdo'],
  ['The left ventricle has two papillary muscles—anterior and posterior—connected by chordae tendineae to the mitral valve.', 'O ventrículo esquerdo tem dois músculos papilares — anterior e posterior — ligados por cordas tendíneas à valva mitral.'],
  ['Blood leaves the left ventricle through the aortic valve into the ascending aorta.', 'O sangue sai do ventrículo esquerdo pela valva aórtica em direção à aorta ascendente.'],
  ['On the posterolateral view, the fold of the left vena cava is also called the ligament of Marshall (near the oblique vein of the left atrium).', 'Na vista posterolateral, a prega da veia cava esquerda também é chamada de ligamento de Marshall (próximo à veia oblíqua do átrio esquerdo).'],
  ['The mitral valve is an atrioventricular inlet valve; the aortic valve is a semilunar outlet valve.', 'A valva mitral é atrioventricular (entrada); a valva aórtica é semilunar (saída).'],

  ['Ventricular septum and comparison', 'Septo e comparação dos ventrículos'],
  ['The interventricular septum has a muscular part and a membranous part called the pars membranacea.', 'O septo interventricular tem uma parte muscular e uma parte membranosa chamada pars membranacea (parte membranácea).'],
  ['From outside to inside, the three layers of the heart wall are epicardium, myocardium and endocardium.', 'De fora para dentro, as três camadas da parede cardíaca são epicárdio, miocárdio e endocárdio.'],
  ['The openings of the coronary arteries sit inside the aortic sinuses (of Valsalva) just above the aortic valve.', 'As aberturas das artérias coronárias ficam nos seios aórticos (de Valsalva), logo acima da valva aórtica.'],
  ['Aortic sinuses (of Valsalva) hold coronary artery openings; the coronary sinus is a vein draining into the right atrium.', 'Os seios aórticos (de Valsalva) abrigam os óstios das artérias coronárias; o seio coronário é uma veia que drena no átrio direito.'],

  ['Valves and cardiac cycle', 'Valvas e ciclo cardíaco'],
  ['Atrioventricular valves', 'Valvas atrioventriculares'],
  ['The tricuspid valve lies between the right atrium and right ventricle and has three cusps: anterior, posterior and septal.', 'A valva tricúspide fica entre átrio direito e ventrículo direito e tem três cúspides: anterior, posterior e septal.'],
  ['The mitral valve lies between the left atrium and left ventricle and has anterior and posterior cusps plus commissural cusps.', 'A valva mitral fica entre átrio esquerdo e ventrículo esquerdo e tem cúspides anterior e posterior, além de cúspides comissurais.'],
  ['Chordae tendineae anchor both AV valves to the papillary muscles.', 'As cordas tendíneas ancoram ambas as valvas AV aos músculos papilares.'],
  ['Tricuspid is right-sided (anterior, posterior, septal); mitral is left-sided (anterior, posterior and commissural).', 'A tricúspide fica à direita (anterior, posterior e septal); a mitral fica à esquerda (anterior, posterior e comissurais).'],

  ['Semilunar valves', 'Valvas semilunares'],
  ['The pulmonary valve guards the outflow from the right ventricle to the pulmonary trunk; the aortic valve guards the outflow from the left ventricle.', 'A valva pulmonar guarda a saída do ventrículo direito para o tronco pulmonar; a valva aórtica guarda a saída do ventrículo esquerdo.'],
  ['The aortic valve has right, left and posterior cusps; the posterior cusp is called noncoronary because it has no coronary artery opening above it.', 'A valva aórtica tem cúspides direita, esquerda e posterior; a posterior é chamada não coronariana por não ter abertura de artéria coronária acima dela.'],
  ['The middle of the free edge of each aortic cusp carries a thickening called the nodule of Arantius (with a thin lunula beside it).', 'O centro da borda livre de cada cúspide aórtica tem um espessamento chamado nódulo de Arantius (ou Arâncio), com uma lúnula ao lado.'],
  ['Aortic and pulmonary valves are semilunar (outflow); mitral and tricuspid valves are atrioventricular (inflow).', 'As valvas aórtica e pulmonar são semilunares (saída); mitral e tricúspide são atrioventriculares (entrada).'],

  ['Valve mechanism', 'Mecanismo das valvas'],
  ['The mitral (left atrioventricular) valve is described as bicuspid.', 'A valva mitral (atrioventricular esquerda) é descrita como bicúspide.'],
  ['The tricuspid (right atrioventricular) valve has three named cusps.', 'A valva tricúspide (atrioventricular direita) tem três cúspides nomeadas.'],
  ['On the frontal view, the pulmonary valve sits above the outflow tract of the right ventricle (conus arteriosus).', 'Na vista frontal, a valva pulmonar fica acima da via de saída do ventrículo direito (cone arterial).'],
  ['Bicuspid always refers to the mitral valve, never to the tricuspid valve.', 'Bicúspide refere-se sempre à valva mitral, nunca à tricúspide.'],

  ['Heart sounds', 'Bulhas cardíacas'],
  ['First heart sound (I): closure of the atrioventricular (AV) valves at the start of systole.', 'Primeira bulha (I): fechamento das valvas atrioventriculares (AV) no início da sístole.'],
  ['Second heart sound (II): closure of the semilunar valves at the start of diastole.', 'Segunda bulha (II): fechamento das valvas semilunares no início da diástole.'],
  ['Third heart sound (III): rapid ventricular filling; it is rare above 40 years of age.', 'Terceira bulha (III): enchimento ventricular rápido; é rara após os 40 anos de idade.'],
  ['Sound I marks AV closure (start of systole); sound II marks semilunar closure (start of diastole).', 'A bulha I marca o fechamento AV (início da sístole); a bulha II marca o fechamento semilunar (início da diástole).'],

  ['Ventricular filling', 'Enchimento ventricular'],
  ['Rapid ventricular filling in early diastole can generate the third heart sound (III), rare above age 40.', 'O enchimento ventricular rápido no início da diástole pode gerar a terceira bulha (III), rara após os 40 anos.'],
  ['The fourth heart sound (IV) accompanies a strong contraction of the atrial muscle.', 'A quarta bulha (IV) acompanha uma contração forte do músculo atrial.'],
  ['The fourth heart sound is usually not normal (pathological).', 'A quarta bulha geralmente não é fisiológica (é anormal).'],
  ['Sound III comes from rapid ventricular filling; sound IV comes from atrial contraction.', 'A bulha III vem do enchimento ventricular rápido; a bulha IV vem da contração atrial.'],

  ['Surface anatomy and auscultation', 'Anatomia de superfície e focos de ausculta'],
  ['Aortic focus (A): second right intercostal space beside the sternum.', 'Foco aórtico (A): segundo espaço intercostal direito, ao lado do esterno.'],
  ['Pulmonary focus (P): second left intercostal space beside the sternum.', 'Foco pulmonar (P): segundo espaço intercostal esquerdo, ao lado do esterno.'],
  ['Tricuspid focus (T): lower body of the sternum.', 'Foco tricúspide (T): parte inferior do corpo do esterno.'],
  ['Mitral focus (M): cardiac apex, in the fifth intercostal space.', 'Foco mitral (M): ápice cardíaco, no quinto espaço intercostal.'],
  ['Aortic is on the RIGHT (2nd right ICS) and pulmonary is on the LEFT (2nd left ICS)—opposite to what beginners often guess.', 'O foco aórtico fica à DIREITA (2º espaço intercostal direito) e o pulmonar à ESQUERDA (2º espaço intercostal esquerdo).'],

  ['Wall and conduction', 'Parede e condução'],
  ['Heart wall', 'Parede cardíaca'],
  ['The epicardium is the outer layer—the visceral layer of the serous pericardium.', 'O epicárdio é a camada externa — a lâmina visceral do pericárdio seroso.'],
  ['The myocardium is the middle muscular layer that contracts.', 'O miocárdio é a camada muscular intermediária que se contrai.'],
  ['The endocardium is the smooth, translucent inner lining (endothelium, lamina propria, subendocardium), important for elasticity.', 'O endocárdio é o revestimento interno liso e translúcido (endotélio, lâmina própria e subendocárdio), importante para a elasticidade.'],
  ['Epicardium covers the outside; endocardium lines the inside cavities.', 'O epicárdio reveste o exterior; o endocárdio reveste o interior das cavidades.'],

  ['Fibrous skeleton', 'Esqueleto fibroso'],
  ['Dense collagen fibers form a network at the base of the ventricles (fibrous rings, right and left trigones, central fibrous body, tendon of the conus).', 'Fibras colágenas densas formam uma rede na base dos ventrículos (anéis fibrosos, trígonos direito e esquerdo, corpo fibroso central e tendão do cone).'],
  ['It keeps the valve openings open, prevents excessive distention under blood pressure and gives the cusps a stable (not rigid) base.', 'Ele mantém os orifícios valvares abertos, impede distensão excessiva sob a pressão do sangue e dá às cúspides uma base estável (não rígida).'],
  ['It electrically isolates atria from ventricles, except where the bundle of His crosses the right trigone.', 'Ele isola eletricamente átrios e ventrículos, exceto onde o feixe de His cruza o trígono direito.'],
  ['The fibrous skeleton is a stable base—not rigid—and the bundle of His crosses the right trigone (not the left).', 'O esqueleto fibroso oferece base estável — não rígida — e o feixe de His atravessa o trígono direito (não o esquerdo).'],

  ['Valves at the base', 'Valvas na base'],
  ['Viewed from the base with the atria removed, all four valve openings are seen in systole and diastole.', 'Vistos pela base sem os átrios, os quatro orifícios valvares aparecem em sístole e diástole.'],
  ['The pulmonary valve has three semilunar cusps: anterior, right and left.', 'A valva pulmonar tem três cúspides semilunares: anterior, direita e esquerda.'],
  ['In this base view, the right coronary artery gives off the AV nodal branch.', 'Nessa vista da base, a artéria coronária direita origina o ramo para o nó AV.'],
  ['Pulmonary cusps are anterior, right and left; aortic cusps are right, left and posterior (noncoronary).', 'As cúspides pulmonares são anterior, direita e esquerda; as aórticas são direita, esquerda e posterior (não coronariana).'],

  ['Myocardial fibers', 'Fibras miocárdicas'],
  ['The myocardium is the muscular wall of the heart.', 'O miocárdio é a parede muscular do coração.'],
  ['In the ventricles, the slide labels a superficial layer and an intermediate layer of myocardial fibers.', 'Nos ventrículos, o slide identifica uma camada superficial e uma camada intermediária de fibras miocárdicas.'],
  ['These fiber layers curve around the ventricles toward the apex.', 'Essas camadas de fibras curvam-se ao redor dos ventrículos em direção ao ápice.'],
  ['Superficial and intermediate fiber layers belong to the myocardium, distinct from the epicardium and endocardium.', 'As camadas superficial e intermediária pertencem ao miocárdio, distintas do epicárdio e do endocárdio.'],

  ['Conduction and ECG', 'Condução e ECG'],
  ['Pacemaker P cells are modified cardiomyocytes—pale and rich in glycogen—that spontaneously generate electrical impulses; transitional (T) cells transmit them.', 'As células P (marcapasso) são cardiomiócitos modificados — pálidos e ricos em glicogênio — que geram impulsos espontaneamente; as células T (transicionais) transmitem o impulso.'],
  ['The sinoatrial (SA) node has the highest concentration of P cells and acts as the natural pacemaker, producing sinus rhythm.', 'O nó sinoatrial (SA) concentra as células P e atua como marcapasso natural, gerando o ritmo sinusal.'],
  ['The AV node delays the impulse by about 0.09 seconds so the atria empty into the ventricles before ventricular contraction; conduction then follows the bundle of His, branches (moderator band) and Purkinje fibers.', 'O nó AV atrasa o impulso em cerca de 0,09 segundo para os átrios esvaziarem antes da contração ventricular; depois o impulso segue pelo feixe de His, ramos (banda moderadora) e fibras de Purkinje.'],
  ['On the ECG, the P wave is atrial depolarization, the QRS complex is ventricular depolarization and the T wave is ventricular repolarization.', 'No ECG, a onda P é a despolarização atrial, o complexo QRS é a despolarização ventricular e a onda T é a repolarização ventricular.'],
  ['P wave = atrial depolarization; QRS = ventricular depolarization; T wave = ventricular repolarization.', 'Onda P = despolarização atrial; QRS = despolarização ventricular; onda T = repolarização ventricular.'],

  ['Coronary circulation', 'Circulação coronariana'],
  ['Coronary arteries', 'Artérias coronárias'],
  ['Coronary arteries lie epicardially—under the epicardium and above the myocardium—running along the cardiac grooves.', 'As artérias coronárias ficam na região epicárdica — sob o epicárdio e acima do miocárdio — percorrendo os sulcos cardíacos.'],
  ['They first spread across the surface, then send deeper branches into the myocardium to vascularize the muscle.', 'Primeiro espalham-se pela superfície e depois enviam ramos profundos para dentro do miocárdio.'],
  ['Coronary arteries supply the myocardium; cardiac veins drain it.', 'As artérias coronárias irrigam o miocárdio; as veias cardíacas o drenam.'],
  ['Coronary arteries run beneath the epicardium along grooves—not inside the endocardium or pericardial cavity.', 'As artérias coronárias correm sob o epicárdio nos sulcos — não dentro do endocárdio nem na cavidade pericárdica.'],

  ['Right coronary artery', 'Artéria coronária direita'],
  ['The right coronary artery (RCA) supplies the right atrium and right ventricle and gives off the SA nodal artery in 55% of cases.', 'A artéria coronária direita (ACD) irriga o átrio direito e o ventrículo direito e origina a artéria do nó SA em 55% dos casos.'],
  ['The RCA is dominant in 85% of hearts, giving off the posterior interventricular (posterior descending, PDA) branch.', 'A ACD é dominante em 85% dos corações, originando o ramo interventricular posterior (artéria descendente posterior, PDA).'],
  ['Coronary dominance is defined by which artery supplies most of the heart surface, especially the inferior wall of the left ventricle and the AV node.', 'A dominância coronária é definida pela artéria que irriga a maior parte da superfície cardíaca, especialmente a parede inferior do ventrículo esquerdo e o nó AV.'],
  ['RCA arteriograms are shown in two standard projections: left anterior oblique (LAO) and right anterior oblique (RAO).', 'As arteriografias da ACD são mostradas em duas projeções: oblíqua anterior esquerda (LAO) e oblíqua anterior direita (RAO).'],
  ['Dominance is defined by who feeds the inferior LV wall and AV node (via the PDA), not by which artery feeds the largest total muscle mass.', 'Dominância define quem irriga a parede inferior do VE e o nó AV (pela PDA), não quem irriga a maior massa muscular total.'],

  ['Left coronary artery', 'Artéria coronária esquerda'],
  ['After a few centimeters, the left coronary artery (LCA) divides into the anterior interventricular branch (LAD) and the circumflex branch (Cx).', 'Após poucos centímetros, a artéria coronária esquerda (ACE) divide-se em ramo interventricular anterior (LAD) e ramo circunflexo (Cx).'],
  ['The LCA supplies the left atrium and left ventricle and gives the SA nodal artery in 45% of cases.', 'A ACE irriga o átrio esquerdo e o ventrículo esquerdo e origina a artéria do nó SA em 45% dos casos.'],
  ['The left coronary artery is dominant in about 10–15% of hearts.', 'A artéria coronária esquerda é dominante em cerca de 10–15% dos corações.'],
  ['The LAD descends anteriorly in the anterior interventricular groove; the PDA runs posteriorly on the underside.', 'A LAD desce na frente, no sulco interventricular anterior; a PDA corre atrás, na face inferior.'],

  ['Variations and territories', 'Variações e territórios'],
  ['Right and left codominance occurs in about 10–15% of cases; when a PDA is absent, small RCA/Cx branches or an elongated LAD curving around the apex supply that region.', 'A codominância direita e esquerda ocorre em cerca de 10–15% dos casos; quando a PDA está ausente, pequenos ramos da ACD/Cx ou uma LAD longa contornando o ápice irrigam a região.'],
  ['Even in right dominance, the LCA—especially the LAD—supplies most of the myocardial mass.', 'Mesmo na dominância direita, a coronária esquerda — especialmente a LAD — irriga a maior parte da massa miocárdica.'],
  ['The LCA/LAD territory includes the anterior wall of the left ventricle, the anterior interventricular septum and much of the lateral left ventricular wall.', 'O território da ACE/LAD inclui a parede anterior do ventrículo esquerdo, o septo interventricular anterior e grande parte da parede lateral do VE.'],
  ['Right dominance (85%) does not mean the RCA supplies most of the myocardium—the LCA/LAD still feeds the largest share.', 'Dominância direita (85%) não significa que a ACD irriga a maior parte do miocárdio — a ACE/LAD continua irrigando a maior fatia.'],

  ['Cardiac veins', 'Veias cardíacas'],
  ['Most cardiac veins converge into the coronary sinus and then empty into the right atrium.', 'A maioria das veias cardíacas converge para o seio coronário e depois desemboca no átrio direito.'],
  ['Great cardiac vein runs alongside the LAD; middle cardiac vein runs alongside the PDA; small cardiac vein runs in the right AV groove near the RCA (plus the posterior vein of the LV).', 'A veia cardíaca magna acompanha a LAD; a veia cardíaca média acompanha a PDA; a pequena veia cardíaca (parva) corre no sulco AV direito junto à ACD (além da veia posterior do VE).'],
  ['Two exceptions bypass the coronary sinus: anterior cardiac veins drain the anterior RV directly into the right atrium, and minimal (Thebesian) veins drain directly into the cardiac chambers.', 'Duas exceções contornam o seio coronário: as veias cardíacas anteriores drenam a parede anterior do VD direto no átrio direito, e as veias mínimas (de Tebésio) drenam direto nas câmaras.'],
  ['Do not confuse the small cardiac vein (right AV groove → coronary sinus) with minimal/Thebesian veins (drain directly into chambers).', 'Não confunda a pequena veia cardíaca/parva (sulco AV direito → seio coronário) com as veias mínimas/de Tebésio (drenam direto nas câmaras).'],

  ['Pericardium and drainage', 'Pericárdio e drenagem'],
  ['Pericardial layers', 'Camadas do pericárdio'],
  ['The pericardium has an external fibrous layer and a double internal serous layer: parietal and visceral (the visceral layer is the epicardium).', 'O pericárdio tem uma camada fibrosa externa e uma camada serosa dupla interna: parietal e visceral (a visceral é o epicárdio).'],
  ['It keeps the heart fixed in the mediastinum, attached to the central (phrenic) tendon of the diaphragm and bound to the posterior sternum.', 'Ele mantém o coração fixo no mediastino, aderido ao centro frênico (tendão central) do diafragma e ligado à face posterior do esterno.'],
  ['It acts as a barrier against inflammation and supports the thinnest parts of the myocardium.', 'Ele funciona como barreira contra inflamação e dá suporte às partes mais finas do miocárdio.'],
  ['Normally 15–20 mL of pericardial fluid reduces friction so the heart can move and beat.', 'Normalmente há 15–20 mL de líquido pericárdico para reduzir o atrito enquanto o coração bate.'],
  ['Fibrous pericardium is the tough outer sac; epicardium is the inner visceral serous layer directly on the heart.', 'O pericárdio fibroso é o saco externo resistente; o epicárdio é a lâmina serosa visceral colada ao coração.'],

  ['Pericardial reflections', 'Reflexões pericárdicas'],
  ['The serous pericardium reflects around the great vessels, creating the pericardial sinuses.', 'O pericárdio seroso reflete-se ao redor dos grandes vasos, formando os seios pericárdicos.'],
  ['On the posterior pericardial sac, an esophageal prominence marks the impression left by the esophagus.', 'Na parede posterior do saco pericárdico, a proeminência esofágica marca a impressão deixada pelo esôfago.'],
  ['The pericardial reflections around the great vessels trace an upside-down J shape.', 'As reflexões pericárdicas ao redor dos grandes vasos formam um J invertido.'],
  ['A pericardial sinus is a space inside the pericardial sac, not the coronary venous sinus.', 'Um seio pericárdico é um espaço dentro do saco pericárdico, não o seio venoso coronário.'],

  ['Transverse sinus', 'Seio transverso'],
  ['Breakdown of the embryonic dorsal mesocardium creates the transverse pericardial sinus.', 'A degeneração do mesocárdio dorsal embrionário cria o seio transverso do pericárdio.'],
  ['It runs behind the aorta and pulmonary trunk and in front of the superior vena cava.', 'Ele passa atrás da aorta e do tronco pulmonar e à frente da veia cava superior.'],
  ['Clinically, passing one blade of a surgical clamp through the transverse sinus and the other in front of the aorta and pulmonary trunk blocks blood output during heart surgery.', 'Clinicamente, passar uma haste de pinça cirúrgica pelo seio transverso e a outra à frente da aorta e do tronco pulmonar bloqueia a saída de sangue em cirurgias cardíacas.'],
  ['The transverse sinus is an open through-passage between arterial outflow vessels (front) and the SVC (back).', 'O seio transverso é uma passagem aberta entre os vasos de saída arterial (frente) e a veia cava superior (atrás).'],

  ['Oblique sinus', 'Seio oblíquo'],
  ['The oblique pericardial sinus is a blind-ending passage behind the heart.', 'O seio oblíquo do pericárdio é uma passagem em fundo cego atrás do coração.'],
  ['It lies directly posterior to the left atrium, bounded by pericardial reflections around the veins.', 'Ele fica logo atrás do átrio esquerdo, delimitado pelas reflexões pericárdicas em torno das veias.'],
  ['It is also called the diverticulum of Haller.', 'Ele também é chamado de divertículo de Haller.'],
  ['The oblique sinus is a blind-ending pouch behind the left atrium; the transverse sinus is an open passage between vessels.', 'O seio oblíquo é um fundo cego atrás do átrio esquerdo; o transverso é uma passagem aberta entre vasos.'],

  ['Pericardium around the great vessels', 'Pericárdio em torno dos grandes vasos'],
  ['The pericardial reflections around the great vessels trace an upside-down J around the transverse and oblique sinuses.', 'As reflexões do pericárdio ao redor dos grandes vasos desenham um J invertido em torno dos seios transverso e oblíquo.'],
  ['This view shows the aorta, superior vena cava, pulmonary trunk bifurcation and pulmonary veins.', 'Essa vista mostra a aorta, a veia cava superior, a bifurcação do tronco pulmonar e as veias pulmonares.'],
  ['Behind the oblique sinus lies the esophageal impression on the posterior pericardium.', 'Atrás do seio oblíquo aparece a impressão esofágica no pericárdio posterior.'],
  ['The esophageal impression is a mark on the pericardial sac; the esophagus itself lies behind the sac.', 'A impressão esofágica é uma marca no saco pericárdico; o esôfago fica atrás do saco.'],

  ['Pericardial supply', 'Irrigação e inervação pericárdicas'],
  ['Arteries from the internal thoracic artery supply the pericardium: pericardiacophrenic, anterior mediastinal, intercostal and musculophrenic branches.', 'Artérias vindas da torácica interna irrigam o pericárdio: ramos pericardicofrênico, mediastinais anteriores, intercostais e musculofrênicos.'],
  ['Esophageal and bronchial branches (from the aorta) also supply the sac, while coronary arteries supply the epicardium.', 'Ramos esofágicos e brônquicos (da aorta) também irrigam o saco, enquanto as coronárias irrigam o epicárdio.'],
  ['Innervation comes from the phrenic nerve, the vagus nerve and the sympathetic trunk.', 'A inervação vem do nervo frênico, do nervo vago e do tronco simpático.'],
  ['Pericardiacophrenic and mediastinal branches feed the pericardial sac; coronary arteries feed the heart muscle.', 'Os ramos pericardicofrênicos e mediastinais irrigam o saco pericárdico; as coronárias irrigam o músculo cardíaco.'],

  ['Nerves and lymphatics', 'Nervos e linfáticos'],
  ['Cardiac plexus', 'Plexo cardíaco'],
  ['The cardiac plexus is divided into superficial and deep parts.', 'O plexo cardíaco divide-se em partes superficial e profunda.'],
  ['It receives cardiac nerves from both sympathetic and vagal (parasympathetic) pathways.', 'Ele recebe nervos cardíacos tanto das vias simpáticas quanto das vias vagais (parassimpáticas).'],
  ['The cervicothoracic sympathetic ganglion is also called the stellate ganglion.', 'O gânglio simpático cervicotorácico também é chamado de gânglio estrelado.'],
  ['Superficial and deep refer to the two parts of the cardiac plexus, not to heart wall layers.', 'Superficial e profunda referem-se às duas partes do plexo cardíaco, não às camadas da parede do coração.'],

  ['Cardiac nerve pathways', 'Vias nervosas cardíacas'],
  ['The nerve loop around the subclavian region in the cardiac plexus pathway is the ansa subclavia.', 'A alça nervosa na região subclávia das vias do plexo cardíaco é a alça subclávia (ansa subclavia).'],
  ['Superior, middle and inferior cervical sympathetic ganglia and thoracic ganglia send cardiac nerves to the plexus.', 'Os gânglios simpáticos cervicais superior, médio e inferior e os gânglios torácicos enviam nervos cardíacos ao plexo.'],
  ['Vagus nerves contribute cervical and thoracic vagal cardiac branches to the plexus.', 'Os nervos vagos contribuem com ramos cardíacos vagais cervicais e torácicos para o plexo.'],
  ['The ansa subclavia is a nerve loop; the stellate ganglion is the fused cervicothoracic ganglion.', 'A alça subclávia é uma alça nervosa; o gânglio estrelado é o gânglio cervicotorácico.'],

  ['Thoracic wall nodes', 'Linfonodos da parede torácica'],
  ['Thoracic wall lymph nodes are grouped into parasternal, intercostal and diaphragmatic nodes.', 'Os linfonodos da parede torácica dividem-se em paraesternais, intercostais e diafragmáticos.'],
  ['They drain the superficial and deep chest wall and breast.', 'Eles drenam a parede torácica superficial e profunda e a mama.'],
  ['Wall node groups are distinct from organ (visceral) node groups of the thorax.', 'Os grupos de linfonodos da parede são distintos dos grupos viscerais (dos órgãos) do tórax.'],
  ['Parasternal, intercostal and diaphragmatic nodes belong to the thoracic wall, not the visceral organ group.', 'Linfonodos paraesternais, intercostais e diafragmáticos pertencem à parede torácica, não ao grupo dos órgãos.'],

  ['Organ nodes', 'Linfonodos dos órgãos'],
  ['Organ (visceral) lymph nodes of the thorax include brachiocephalic, tracheobronchial and posterior mediastinal nodes.', 'Os linfonodos dos órgãos (viscerais) do tórax incluem os braquiocefálicos, traqueobrônquicos e mediastinais posteriores.'],
  ['They receive lymph from thoracic organs such as lungs, pleura and heart.', 'Eles recebem linfa dos órgãos torácicos, como pulmões, pleura e coração.'],
  ['Brachiocephalic, tracheobronchial and posterior mediastinal are organ nodes; parasternal and intercostal are wall nodes.', 'Braquiocefálicos, traqueobrônquicos e mediastinais posteriores são linfonodos dos órgãos; paraesternais e intercostais são da parede.'],
  ['Keep wall nodes (parasternal, intercostal, diaphragmatic) separate from organ nodes (brachiocephalic, tracheobronchial, posterior mediastinal).', 'Separe linfonodos da parede (paraesternais, intercostais, diafragmáticos) dos linfonodos dos órgãos (braquiocefálicos, traqueobrônquicos, mediastinais posteriores).'],

  ['Heart lymphatic drainage', 'Drenagem linfática do coração'],
  ['The heart drains through left and right cardiac lymphatic trunks.', 'O coração drena pelos troncos linfáticos cardíacos esquerdo e direito.'],
  ['Cardiac lymph reaches the inferior tracheobronchial nodes and the brachiocephalic nodes.', 'A linfa cardíaca chega aos linfonodos traqueobrônquicos inferiores e aos linfonodos braquiocefálicos.'],
  ['Lymphatic drainage uses separate vessels and nodes from the cardiac veins.', 'A drenagem linfática usa vasos e linfonodos diferentes das veias cardíacas.'],
  ['Heart lymph drains to inferior tracheobronchial and brachiocephalic nodes—not to parasternal or axillary nodes.', 'A linfa do coração drena para linfonodos traqueobrônquicos inferiores e braquiocefálicos — não para paraesternais ou axilares.'],
];

export const HEART_AULAS_PT = Object.fromEntries(textPairs);

const CHAMBERS_GHOST = ['ad', 'ae', 'vd', 've', 'paredev'];
const card = (id, title, ref, facts, confusion, focus = [], view, ghost) => ({
  id, title, ref, facts, confusion, focus,
  ...(view ? { view } : {}),
  ...(ghost ? { ghost } : {}),
});
const specs = [
  ['position', 'Circulation and position', 6, 16, [
    ['circuits', 'Pulmonary and systemic circuits', 'H6', 3, ['ad', 'ae', 'vd', 've'], 'ant'],
    ['wall', 'Anterior thoracic wall', 'H7–H8', 4, ['esterno', 'ita_d', 'ita_e'], 'ant'],
    ['situ', 'Heart in situ', 'H9', 3, ['ad', 'vd', 've', 'aoasc', 'tp', 'vcs'], 'ant'],
    ['mediastinum', 'Mediastinum and relations', 'H10–H13', 4, ['esofago', 'diafragma', 'aodesc', 'timo_d', 'timo_e'], 'dir'],
    ['surfaces', 'Heart surfaces', 'H14–H16', 4, ['vd', 've', 'seio', 'ape'], 'post'],
  ]],
  ['chambers', 'Chambers and septum', 17, 22, [
    ['right-atrium', 'Right atrium', 'H17', 3, ['ad', 'vcs', 'vci', 'seio'], 'dir'],
    ['right-ventricle', 'Right ventricle', 'H18', 3, ['vd', 'tp', 'pap_vd_ant'], 'ant', ['ad', 'ae', 've']],
    ['left-atrium', 'Left atrium', 'H19', 3, ['ae', 'vpsd', 'vpid', 'vpse', 'vpie'], 'post'],
    ['left-ventricle', 'Left ventricle', 'H20', 3, ['ve', 'mit_ant', 'mit_post', 'pap_ve_al', 'pap_ve_pm'], 'ant', ['ad', 'vd']],
    ['septum', 'Ventricular septum and comparison', 'H21–H22', 3, ['paredev', 'ao_ant', 'ao_post_e', 'ao_post_d'], 'ant'],
  ]],
  ['valves', 'Valves and cardiac cycle', 23, 29, [
    ['av', 'Atrioventricular valves', 'H23–H24', 3, ['tri_ant', 'tri_post', 'tri_sep', 'mit_ant', 'mit_post'], 'sup', CHAMBERS_GHOST],
    ['semilunar', 'Semilunar valves', 'H25–H26', 3, ['ao_ant', 'ao_post_d', 'ao_post_e', 'pulm_ant_e', 'pulm_ant_d', 'pulm_post'], 'sup', CHAMBERS_GHOST],
    ['mechanism', 'Valve mechanism', 'H27', 3, ['mit_ant', 'tri_ant', 'pulm_ant_e'], 'ant', CHAMBERS_GHOST],
    ['sounds', 'Heart sounds', 'H28', 3, ['mit_ant', 'tri_ant', 'ao_ant', 'pulm_ant_e'], 'sup', CHAMBERS_GHOST],
    ['filling', 'Ventricular filling', 'H28', 3, ['ad', 'ae', 'vd', 've'], 'ant'],
    ['auscultation', 'Surface anatomy and auscultation', 'H29', 4, ['ve', 'aoasc', 'tp', 'costela_5'], 'ant'],
  ]],
  ['wall-conduction', 'Wall and conduction', 30, 35, [
    ['layers', 'Heart wall', 'H30', 3, ['paredev'], 'ant'],
    ['skeleton', 'Fibrous skeleton', 'H31', 3, ['paredev', 'tri_ant', 'mit_ant', 'ao_ant', 'pulm_ant_e'], 'sup', ['ad', 'ae', 'vd', 've']],
    ['base', 'Valves at the base', 'H32', 3, ['acd', 'ao_ant', 'ao_post_d', 'ao_post_e', 'pulm_ant_e', 'pulm_ant_d', 'pulm_post'], 'sup', CHAMBERS_GHOST],
    ['myocardium', 'Myocardial fibers', 'H33', 3, ['paredev'], 'ant'],
    ['conduction', 'Conduction and ECG', 'H34–H35', 4, ['ad', 'paredev'], 'ant'],
  ]],
  ['coronary', 'Coronary circulation', 36, 44, [
    ['arteries', 'Coronary arteries', 'H36', 3, ['acd', 'tce'], 'ant'],
    ['rca', 'Right coronary artery', 'H37–H38', 4, ['acd', 'dp'], 'inf'],
    ['lca', 'Left coronary artery', 'H39–H40', 3, ['tce', 'dae', 'cx'], 'ant'],
    ['territories', 'Variations and territories', 'H41–H42', 3, ['dae', 'cx', 'acd'], 'ant'],
    ['veins', 'Cardiac veins', 'H43–H44', 3, ['vcmagna', 'vcmedia', 'vcparva', 'seio'], 'post'],
  ]],
  ['pericardium', 'Pericardium and drainage', 45, 51, [
    ['layers', 'Pericardial layers', 'H45–H46', 4, ['diafragma', 'esterno'], 'ant'],
    ['reflections', 'Pericardial reflections', 'H47', 3, ['esofago'], 'post'],
    ['transverse', 'Transverse sinus', 'H48', 3, ['vcs', 'aoasc', 'tp'], 'sup'],
    ['oblique', 'Oblique sinus', 'H49', 3, ['ae'], 'post'],
    ['vessels', 'Pericardium around the great vessels', 'H50', 3, ['aoasc', 'vcs', 'tp', 'esofago'], 'post'],
    ['supply', 'Pericardial supply', 'H51', 3, ['ita_d', 'ita_e'], 'ant'],
  ]],
  ['nerves-lymph', 'Nerves and lymphatics', 52, 54, [
    ['plexus', 'Cardiac plexus', 'H52', 3, []],
    ['pathways', 'Cardiac nerve pathways', 'H52', 3, []],
    ['wall-nodes', 'Thoracic wall nodes', 'H53–H54', 3, []],
    ['organ-nodes', 'Organ nodes', 'H54', 3, []],
    ['heart-lymph', 'Heart lymphatic drainage', 'H54', 3, []],
  ]],
];

export const HEART_AULAS = specs.map(([id, title, first, last, rows]) => ({
  id, title,
  cards: rows.map(([cardId, cardTitle, ref, count, focus, view, ghost]) => {
    const start = textPairs.findIndex(([english]) => english === cardTitle);
    return card(`${id}-${cardId}`, cardTitle, ref,
      textPairs.slice(start + 1, start + 1 + count).map(([english]) => english),
      textPairs[start + 1 + count][0], focus, view, ghost);
  }),
  questionIds: heartQuestions.filter(({ ref }) => {
    const slide = Number(ref.slice(1));
    return slide >= first && slide <= last;
  }).map(({ ref, q }) => `heart:${ref}:${q}`),
}));
