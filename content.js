// Each question carries its correct choice first in the source. The export
// rotates choices so the correct answer does not occupy a fixed position.
function quiz(rows, offset = 0) {
  return rows.map(([q, correct, wrong1, wrong2, wrong3, why], index) => {
    const choices = [correct, wrong1, wrong2, wrong3];
    const answer = (offset + index) % choices.length;
    return {
      q,
      options: choices.map((_, position) => choices[(position - answer + choices.length) % choices.length]),
      answer,
      why,
    };
  });
}

function card(name, oral, questions) {
  return {
    prompt: `Describe the ${name}.`,
    oral,
    followups: questions.map(([q, , , , , why]) => ({ q, a: why })),
    mcq: quiz(questions, name.length),
  };
}

const chambers = {
  ad: card('right atrium', {
    definition: ['Systemic venous receiving chamber. Blood passes through the tricuspid orifice to the right ventricle.'],
    location: ['Forms the right cardiac border on the frontal chest radiograph.'],
    relations: ['The right auricle overlaps the ascending aortic root. The right atrioventricular groove contains the right coronary artery.'],
    internal: [
      'The crista terminalis separates the smooth sinus venarum from the pectinate anterior wall and auricle.',
      'The interatrial septal surface shows the fossa ovalis and its raised limbus.',
      'The caval veins and coronary sinus open into the atrium. The sinus opening lies between the IVC opening and tricuspid orifice.',
    ],
    supply: ['Atrial branches of the right coronary artery provide much of the arterial supply.'],
    development: ['The right horn of the sinus venosus forms the sinus venarum. Primitive atrium contributes the trabeculated portion.'],
    clinical: ['The triangle of Koch locates the AV node using the tendon of Todaro, septal tricuspid attachment and coronary sinus ostium.'],
    imaging: ['Apical four-chamber echocardiography displays the right atrium, interatrial septum and tricuspid valve.'],
  }, [
    ['What separates the smooth and pectinate portions?', 'Crista terminalis', 'Limbus', 'Tendon of Todaro', 'Moderator band', 'The crista terminalis divides the sinus venarum from pectinate myocardium.'],
    ['Where is the sinoatrial node?', 'Near the SVC–right atrial junction', 'At the fossa ovalis', 'At the apex', 'In the coronary sinus', 'The SA node lies subepicardially near the superior end of the terminal groove.'],
  ]),
  ae: card('left atrium', {
    definition: ['Receives oxygenated pulmonary venous blood and empties through the mitral valve.'],
    location: ['Forms most of the cardiac base, facing posteriorly.'],
    relations: ['The esophagus lies posterior to the pericardium over the atrium. The left auricle lies beside the pulmonary trunk.'],
    internal: ['The chamber is predominantly smooth. Pectinate muscles are concentrated in the auricle. Four pulmonary venous ostia are usual.'],
    development: ['Incorporation of the common pulmonary vein and its branches contributes to the smooth wall. The auricle derives from primitive atrium.'],
    clinical: ['Atrial fibrillation favors thrombus formation in the left atrial appendage, with risk of systemic embolism.'],
    imaging: ['Transesophageal echocardiography provides close views of the atrium and its appendage.'],
  }, [
    ['Which hollow viscus is directly posterior to its pericardial covering?', 'Esophagus', 'Trachea', 'Stomach', 'Thoracic duct', 'The thoracic esophagus lies directly posterior to the left atrium across the pericardium.'],
    ['Where are left atrial pectinate muscles concentrated?', 'Auricle', 'Pulmonary venous ostia', 'Atrial roof', 'Posterior wall', 'Pectinate muscles characterize the left auricle, a remnant of primitive atrium.'],
  ]),
  paredev: card('ventricular myocardium', {
    definition: ['Contractile cardiac muscle forming the ventricular free walls and muscular interventricular septum.'],
    location: ['The RV free wall is predominantly anterior. The LV wall extends around the apex and across most of the diaphragmatic surface.'],
    internal: ['The LV wall is substantially thicker than the RV wall. Trabeculae carneae project into the cavities.', 'The small membranous septum is fibrous and lies near the aortic and tricuspid valves.'],
    supply: ['LAD perforators supply the anterior two-thirds of the septum. Posterior interventricular perforators supply its posterior third.'],
    development: ['Ventricular chamber expansion forms the muscular septum. Endocardial cushion and outflow septal tissues contribute to membranous closure.'],
    clinical: ['Sustained systemic pressure overload produces LV hypertrophy. Infarction may cause regional thinning and impaired contraction.'],
    imaging: ['Cine cardiac MRI assesses wall motion. Late gadolinium enhancement identifies myocardial scar.'],
  }, [
    ['Why is the LV wall thicker?', 'Higher ejection pressure', 'Higher normal stroke volume', 'Absence of ventricular filling', 'Lower afterload', 'The LV generates higher pressure to eject into the systemic circulation.'],
    ['Which portion of the septum is fibrous?', 'Membranous portion', 'Apical portion', 'Trabecular portion', 'Inferior muscular portion', 'The membranous septum is a small fibrous area adjacent to the central fibrous body.'],
  ]),
  vd: card('right ventricle', {
    definition: ['Pumps systemic venous blood into the pulmonary trunk.'],
    location: ['Forms most of the sternocostal surface and much of the inferior border.'],
    relations: ['Lies anterior to the LV, separated by the interventricular septum. Its outflow passes superiorly toward the left.'],
    internal: ['Coarse trabeculae carneae characterize the inlet and apex. The supraventricular crest separates inflow from the smooth infundibulum.', 'The moderator band connects the septum to the anterior papillary muscle and carries right bundle branch fibers.'],
    supply: ['Right coronary ventricular branches supply much of the free wall. LAD branches contribute anteriorly.'],
    development: ['Proximal bulbus cordis contributes the trabeculated RV. The conus cordis contributes the outflow tract.'],
    clinical: ['Infundibular narrowing contributes to right ventricular outflow obstruction in tetralogy of Fallot.'],
    imaging: ['The RV lies closest to the sternum on the lateral chest radiograph. MRI can quantify its volumes.'],
  }, [
    ['What is the smooth RV outflow tract called?', 'Infundibulum', 'Aortic vestibule', 'Sinus venarum', 'Coronary sulcus', 'The infundibulum, or conus arteriosus, leads to the pulmonary valve.'],
    ['Which conduction fibers traverse the moderator band?', 'Right bundle branch fibers', 'Left posterior fascicle fibers', 'SA nodal fibers', 'AV nodal fibers', 'The moderator band carries right bundle fibers toward the anterior papillary muscle and free wall.'],
  ]),
  ve: card('left ventricle', {
    definition: ['Receives pulmonary venous blood through the mitral valve and ejects into the aorta.'],
    location: ['Forms the apex, left border and most of the diaphragmatic surface. The apex projects to the left fifth intercostal space near the midclavicular line.'],
    relations: ['Lies posterior and leftward of the RV. The anterior mitral leaflet borders the aortic vestibule.'],
    internal: ['A thick wall surrounds fine trabeculae, two papillary muscle groups and a smooth aortic vestibule.'],
    supply: ['LAD and circumflex branches supply most of the chamber. Inferior supply depends on coronary dominance.'],
    development: ['The primitive ventricle contributes the trabeculated LV. The conus cordis contributes the outflow tract.'],
    clinical: ['Afterload elevation can cause concentric hypertrophy. Ischemic remodeling may dilate the cavity and tether the mitral leaflets.'],
    imaging: ['Echocardiography assesses regional wall motion and ejection fraction from complementary views.'],
  }, [
    ['What is the smooth LV outflow tract called?', 'Aortic vestibule', 'Infundibulum', 'Sinus venarum', 'Aortic sinus', 'The aortic vestibule leads from the ventricular cavity to the aortic valve.'],
    ['Which chamber forms most of the diaphragmatic surface?', 'Left ventricle', 'Right atrium', 'Left atrium', 'Right ventricle', 'The LV forms most of the diaphragmatic surface, with a smaller RV contribution.'],
  ]),
};

function leaflet(name, location, relations, internal, clinical, imaging, questions) {
  return card(name, {
    definition: ['Atrioventricular valve leaflet that closes with its partners during ventricular systole.'],
    location: [location],
    relations: [relations],
    internal: [internal],
    clinical: [clinical],
    imaging: [imaging],
  }, questions);
}

function semilunar(name, location, relations, clinical, imaging, questions) {
  return card(name, {
    definition: ['Semilunar valve cusp that opens during ventricular ejection and contributes to the seal during diastole.'],
    location: [location],
    relations: [relations],
    internal: ['A central nodule and flanking lunules contribute to diastolic coaptation. The cusp has no chordal attachments.'],
    clinical: [clinical],
    imaging: [imaging],
  }, questions);
}

function papillary(name, location, relations, supply, clinical, questions) {
  return card(name, {
    definition: ['Ventricular myocardial projection whose contraction tensions chordae during systole and restrains atrioventricular leaflet prolapse.'],
    location: [location],
    relations: [relations],
    ...(supply && { supply: [supply] }),
    clinical: [clinical],
    imaging: ['Echocardiography can track papillary muscle motion and assess associated leaflet tethering or flail.'],
  }, questions);
}

const valves = {
  tri_ant: leaflet('anterior tricuspid leaflet',
    'Largest usual tricuspid leaflet, attached along the anterior to anterolateral annulus.',
    'The anterior papillary muscle sends chordae to the anterior and inferior leaflets.',
    'Its broad free margin coapts with the septal and inferior leaflets.',
    'Right ventricular dilation can tether the leaflet and produce functional tricuspid regurgitation.',
    'The anterior leaflet is commonly seen opposite the septal leaflet in an apical four-chamber view.', [
      ['Which tricuspid leaflet is usually largest?', 'Anterior', 'Inferior', 'Septal', 'Posteromedial', 'The anterior leaflet normally has the largest surface area of the tricuspid leaflets.'],
      ['Which papillary muscle receives the moderator band?', 'Anterior RV papillary muscle', 'Inferior RV papillary muscle', 'Anterolateral LV papillary muscle', 'Posteromedial LV papillary muscle', 'The moderator band reaches the base of the anterior RV papillary muscle, which supports the anterior and inferior leaflets.'],
    ]),
  tri_post: leaflet('posterior tricuspid leaflet',
    'Attaches along the inferior annulus, adjacent to the diaphragmatic RV wall.',
    'Lies between the anterior and septal leaflets and receives chordae from the anterior and inferior papillary groups.',
    'The inferior leaflet may show multiple scallops.',
    'Annular enlargement can separate its coaptation edge from neighboring leaflets.',
    'Three-dimensional echocardiography can show its inferior location and scallops.', [
      ['What is another name for this leaflet?', 'Inferior leaflet', 'Mural mitral leaflet', 'Septal leaflet', 'Aortic leaflet', 'Posterior and inferior name the same tricuspid leaflet beside the diaphragmatic RV wall.'],
      ['Which leaflet shares support from the inferior papillary muscle?', 'Septal tricuspid', 'Anterior mitral', 'Posterior mitral', 'Right coronary cusp', 'The inferior papillary group typically supports the inferior and septal tricuspid leaflets.'],
    ]),
  tri_sep: leaflet('septal tricuspid leaflet',
    'Attaches along the ventricular septum, apical to the mitral hinge in a four-chamber view.',
    'Its anteroseptal attachment is near the membranous septum and penetrating AV bundle.',
    'Some chordae attach directly to septal myocardium.',
    'Excessive apical displacement of the septal hinge is characteristic of Ebstein anomaly.',
    'Apical four-chamber echocardiography demonstrates septal leaflet offset.', [
      ['Which conduction structure is at risk near its anteroseptal attachment?', 'AV bundle', 'SA node', 'Left posterior fascicle', 'Right phrenic nerve', 'The penetrating AV bundle passes through the central fibrous body near the anteroseptal attachment.'],
      ['Which anomaly features excessive apical displacement?', 'Ebstein anomaly', 'Coarctation', 'Patent ductus arteriosus', 'Aortic atresia', 'Ebstein anomaly features abnormal delamination and apical displacement of septal and often inferior leaflet attachments.'],
    ]),
  mit_ant: leaflet('anterior mitral leaflet',
    'Hinges at the anterior mitral annulus, between the LV inflow and outflow.',
    'The aortomitral curtain connects it to the aortic root between the left and noncoronary cusps.',
    'Its tall leaflet receives chordae from both papillary muscle groups.',
    'Systolic anterior motion can obstruct the LV outflow in hypertrophic cardiomyopathy.',
    'Parasternal long-axis echocardiography shows the leaflet next to the aortic root.', [
      ['What links it to the aortic root?', 'Aortomitral curtain', 'Moderator band', 'Tendon of Todaro', 'Crista terminalis', 'Fibrous continuity between the anterior mitral hinge and the aortic root forms the aortomitral curtain.'],
      ['What can systolic anterior motion obstruct?', 'LV outflow tract', 'Coronary sinus', 'IVC', 'RV inflow tract', 'Anterior motion toward the ventricular septum can narrow the LV outflow tract during systole.'],
    ]),
  mit_post: leaflet('posterior mitral leaflet',
    'Attaches along the mural mitral annulus, with a broad base and shorter radial height than the anterior leaflet.',
    'The circumflex artery passes near the posterior annulus in the left atrioventricular groove.',
    'The leaflet has three usual scallops: P1 anterolateral, P2 central and P3 posteromedial.',
    'P2 is a common site of degenerative prolapse or flail.',
    'Three-dimensional transesophageal echocardiography localizes prolapse by scallop.', [
      ['Which scallop is central?', 'P2', 'P1', 'P3', 'A2', 'P2 is the central scallop of the posterior mitral leaflet.'],
      ['Which artery is at risk during posterior annular suturing?', 'Circumflex artery', 'LAD', 'Right marginal artery', 'Pulmonary trunk', 'The circumflex runs in the left AV groove near the posterior mitral annulus.'],
    ]),
  pulm_ant_d: semilunar('right semilunar cusp of the pulmonary valve',
    'Occupies the right sector of the pulmonary root at the infundibular outlet.',
    'Its pulmonary sinus lies between the cusp and the wall of the root.',
    'Restricted opening in congenital pulmonary stenosis increases RV systolic pressure.',
    'Parasternal short-axis and RV outflow views assess pulmonary cusp motion and Doppler gradients.', [
      ['What lies immediately arterial to this cusp?', 'Right pulmonary sinus', 'Right aortic sinus', 'Right atrial appendage', 'Coronary sinus', 'The right pulmonary sinus is the pouch posterior to the right pulmonary cusp.'],
      ['Which chamber faces increased pressure with pulmonary valve stenosis?', 'Right ventricle', 'Left ventricle', 'Left atrium', 'Aortic root', 'Pulmonary valve stenosis obstructs RV ejection and raises RV systolic pressure.'],
    ]),
  pulm_ant_e: semilunar('anterior semilunar cusp of the pulmonary valve',
    'Occupies the anterior sector of the pulmonary root, the most anterior great arterial root.',
    'The pulmonary valve lies anterior and superior to the aortic valve.',
    'Incomplete pulmonary cusp coaptation permits diastolic flow into the RV outflow tract.',
    'Color Doppler can identify diastolic pulmonary regurgitation.', [
      ['Which feature occupies the center of its free edge?', 'Nodule', 'Papillary muscle', 'Chordal insertion', 'Pectinate ridge', 'The central nodule meets the other cusp nodules during diastolic closure.'],
      ['When does pulmonary regurgitation occur?', 'Diastole', 'Ventricular ejection', 'Isovolumetric contraction only', 'Atrial systole only', 'Pulmonary arterial pressure drives reverse flow through an incompetent valve during diastole.'],
    ]),
  pulm_post: semilunar('left semilunar cusp of the pulmonary valve',
    'Occupies the left sector of the pulmonary root superior to the muscular RV infundibulum.',
    'Coapts with the anterior and right pulmonary cusps.',
    'Pulmonary regurgitation after repair of tetralogy of Fallot can cause RV volume overload.',
    'Phase-contrast MRI can quantify pulmonary regurgitation.', [
      ['Where is the pulmonary auscultation area?', 'Second left intercostal space at the sternum', 'Second right intercostal space at the sternum', 'Left fifth space at the midclavicular line', 'Right lower sternal edge', 'Pulmonary valve sounds are classically assessed at the upper left sternal border.'],
      ['Which tract lies immediately ventricular to the valve?', 'RV infundibulum', 'Aortic vestibule', 'Sinus venarum', 'Left atrial vestibule', 'The muscular infundibulum funnels RV ejection through the pulmonary valve.'],
    ]),
  ao_ant: semilunar('right coronary cusp',
    'Occupies the right coronary sector of the aortic root at the LV outflow tract.',
    'The right coronary ostium normally lies in the sinus superior to this cusp.',
    'A right coronary sinus of Valsalva aneurysm can rupture into a right-sided chamber.',
    'Short-axis echocardiography and gated CT can show the cusp, sinus and adjacent coronary ostium.', [
      ['Which vessel normally arises from its sinus?', 'Right coronary artery', 'Left main coronary artery', 'Pulmonary trunk', 'Circumflex artery', 'The right coronary ostium typically opens in the right aortic sinus.'],
      ['What marks the upper limit of the aortic sinuses?', 'Sinotubular junction', 'Mitral annulus', 'Crista terminalis', 'Aortic isthmus', 'The sinotubular junction marks the transition from the sinuses to the tubular ascending aorta.'],
    ]),
  ao_post_e: semilunar('left coronary cusp',
    'Occupies the left coronary sector of the aortic root.',
    'Its sinus normally contains the left main coronary ostium. Its basal attachment contributes to aortomitral continuity.',
    'A low left coronary ostium and displaced native leaflet can contribute to coronary obstruction after transcatheter valve implantation.',
    'Gated CT defines the left ostial height relative to the annular plane.', [
      ['Which artery normally starts in the adjacent sinus?', 'Left main coronary artery', 'Right coronary artery', 'Pulmonary trunk', 'Left subclavian artery', 'The left coronary ostium normally opens into the left aortic sinus superior to the cusp.'],
      ['Which AV leaflet is in fibrous continuity with this region?', 'Anterior mitral leaflet', 'Posterior mitral leaflet', 'Inferior tricuspid leaflet', 'Anterior tricuspid leaflet', 'The aortomitral curtain links the anterior mitral leaflet to the left and noncoronary sectors.'],
    ]),
  ao_post_d: semilunar('noncoronary cusp',
    'Occupies the posterior part of the aortic root toward the interatrial septum.',
    'The membranous septum lies near the right–noncoronary commissure.',
    'Intervention near the right–noncoronary commissure can injure the nearby conduction axis and cause AV block.',
    'Short-axis echocardiography shows the noncoronary cusp beside the interatrial septum.', [
      ['Which artery normally arises from this sinus?', 'No coronary artery', 'Right coronary artery', 'Left main coronary artery', 'Conus artery', 'The noncoronary sinus normally has no coronary ostium.'],
      ['Which structure lies near the right–noncoronary commissure?', 'Membranous septum', 'Moderator band', 'Left auricle tip', 'Pulmonary bifurcation', 'The membranous septum and adjacent His bundle lie just inferior to this region of the root.'],
    ]),
  pap_vd_ant: papillary('anterior papillary muscle of the right ventricle',
    'Usually the largest RV papillary muscle, arising from the anterior free wall.',
    'Receives the moderator band at its base and supports the anterior and inferior tricuspid leaflets.',
    'Right coronary ventricular branches commonly supply the adjacent free wall.',
    'Free-wall remodeling can displace this muscle and tether the tricuspid valve.', [
      ['Which muscular bundle reaches its base?', 'Moderator band', 'Crista terminalis', 'Interatrial bundle', 'Tendon of Todaro', 'The moderator band runs from the septum to the anterior papillary muscle.'],
      ['When does it actively tension the chordae?', 'Ventricular systole', 'Rapid ventricular filling', 'Diastasis', 'Isovolumetric relaxation', 'Contraction during ventricular systole limits leaflet displacement toward the atrium.'],
    ]),
  pap_vd_post: papillary('inferior papillary muscle of the right ventricle',
    'Often consists of several projections from the inferior RV wall.',
    'Its chordae usually support the inferior and septal tricuspid leaflets.',
    'The adjacent RV wall commonly receives right coronary branches.',
    'Inferior RV remodeling can displace the muscle and contribute to valve tethering.', [
      ['Where does it arise?', 'Inferior RV wall', 'Anterior RV wall', 'Inferior LV wall', 'Membranous septum', 'The posterior or inferior papillary group arises from the diaphragmatic wall of the RV.'],
      ['Which leaflets does it usually support?', 'Inferior and septal tricuspid', 'Anterior and posterior mitral', 'Right and left aortic', 'Anterior and right pulmonary', 'Its chordae typically reach the inferior and septal tricuspid leaflets.'],
    ]),
  pap_vd_sep: papillary('septal papillary muscle of the right ventricle',
    'Small, variable projection from the ventricular septum near the conus arteriosus.',
    'Chordae from the septal group can reach the septal and anterior tricuspid leaflets. Some chordae arise directly from the septum.',
    null,
    'Septal leaflet repair must account for variable direct chordal attachments to ventricular septal muscle.', [
      ['What is the conal papillary muscle also called?', 'Papillary muscle of Lancisi', 'Moderator band', 'Muscle of Treitz', 'Tendon of Todaro', 'The papillary muscle of Lancisi is the small medial or conal papillary muscle of the RV.'],
      ['From which wall does this group arise?', 'Interventricular septum', 'Anterior LV free wall', 'Right atrial wall', 'Inferior LV wall', 'This variable papillary group arises from the septal wall of the RV.'],
    ]),
  pap_ve_al: papillary('anterolateral papillary muscle of the left ventricle',
    'Arises from the anterolateral LV wall.',
    'Sends chordae to adjacent portions of both mitral leaflets.',
    'Commonly supplied by both LAD diagonal and circumflex marginal branches.',
    'Dual arterial supply makes ischemic rupture less common than rupture of the posteromedial papillary muscle.', [
      ['Which arteries commonly provide dual supply?', 'LAD and circumflex', 'RCA and pulmonary trunk', 'PDA and conus artery', 'Azygos and circumflex', 'Diagonal and obtuse marginal branches commonly provide overlapping supply.'],
      ['Which leaflets receive its chordae?', 'Both mitral leaflets', 'Anterior mitral only', 'Posterior mitral only', 'Anterior and septal tricuspid', 'Each LV papillary muscle supports portions of both mitral leaflets.'],
    ]),
};

function branch(name, parent, route, territory, clinical, distractors, relationQuestion, imaging = 'Coronary angiography shows the branch in relation to the parent vessel.') {
  return card(name, {
    definition: [`Coronary arterial branch arising from the ${parent}.`],
    course: [route],
    supply: [territory],
    clinical: [clinical],
    imaging: [imaging],
  }, [
    [`Which artery gives rise to the ${name}?`, parent, ...distractors, `This branch arises from the ${parent}.`],
    relationQuestion,
  ]);
}

const coronaryArteries = {
  acd: card('right coronary artery', {
    definition: ['Epicardial artery supplying much of the right heart.'],
    course: ['Arises from the right aortic sinus, passes between the pulmonary trunk and right auricle, and follows the right AV groove.'],
    branches: ['Gives conal, atrial, nodal, right ventricular and right marginal branches. In right dominance it gives the posterior interventricular artery.'],
    supply: ['Supplies much of the RA and RV. In right dominance, it supplies inferior LV myocardium and posterior septum.'],
    clinical: ['Proximal occlusion can cause RV infarction. Inferior infarction may involve the AV nodal blood supply and cause heart block.'],
    imaging: ['Coronary angiography or gated CT traces the artery from its ostium through the right AV groove.'],
  }, [
    ['Which sinus contains its ostium?', 'Right aortic sinus', 'Left aortic sinus', 'Noncoronary sinus', 'Right pulmonary sinus', 'The right aortic sinus lies posterior to the right coronary cusp and normally contains the RCA ostium.'],
    ['Which branch identifies right dominance?', 'Posterior interventricular branch from the RCA', 'Right marginal branch from the RCA', 'Conus branch from the RCA', 'SA nodal branch from the RCA', 'Right dominance means the RCA gives rise to the posterior interventricular artery.'],
  ]),
  tce: card('left main coronary artery', {
    definition: ['Short proximal trunk of the left coronary circulation.'],
    course: ['Leaves the left aortic sinus and passes between the pulmonary trunk and left auricle.'],
    branches: ['Usually divides into LAD and circumflex branches. A ramus intermedius may arise at a trifurcation.'],
    supply: ['Through its branches it supplies most LV myocardium, anterior septum and much of the LA.'],
    clinical: ['A proximal left main lesion jeopardizes both LAD and circumflex territories.'],
    imaging: ['Gated coronary CT identifies the ostium, proximal course and branching pattern.'],
  }, [
    ['Which structures flank its proximal course?', 'Pulmonary trunk and left auricle', 'SVC and right auricle', 'Esophagus and descending aorta', 'IVC and coronary sinus', 'The trunk passes between the pulmonary trunk and left auricle before dividing.'],
    ['What are its two usual terminal branches?', 'LAD and circumflex', 'RCA and LAD', 'Conus and right marginal', 'PDA and right marginal', 'The left main usually bifurcates into LAD and circumflex arteries.'],
  ]),
  dae: card('left anterior descending artery', {
    definition: ['Anterior interventricular branch of the left main coronary artery.'],
    course: ['Descends in the anterior interventricular groove toward the apex. It may wrap onto the inferior surface.'],
    relations: ['The great cardiac vein accompanies it in the anterior interventricular groove.'],
    branches: ['Gives diagonal, septal perforating and small right ventricular branches.'],
    supply: ['Supplies anterior LV myocardium, apex and anterior two-thirds of the interventricular septum.'],
    clinical: ['Proximal occlusion can cause extensive anterior and septal infarction and intraventricular conduction block.'],
    imaging: ['Coronary angiography separates diagonal branches from septal perforators by their course.'],
  }, [
    ['Which vein accompanies the LAD?', 'Great cardiac vein', 'Middle cardiac vein', 'Small cardiac vein', 'Oblique vein of the left atrium', 'The great cardiac vein ascends alongside the LAD in the anterior interventricular groove.'],
    ['Which branches enter the interventricular septum?', 'Septal perforators', 'Diagonals', 'Obtuse marginals', 'Acute marginals', 'Septal perforators enter the muscular septum from the anterior interventricular groove.'],
  ]),
  diag: branch('diagonal arteries', 'LAD',
    'Leave the LAD obliquely and spread across the anterolateral LV surface.',
    'Supply the anterolateral LV free wall.',
    'Occlusion can cause focal anterolateral ischemia.',
    ['Circumflex', 'RCA', 'PDA'],
    ['Which territory do they supply?', 'Anterolateral LV', 'Inferior RV margin', 'Posterior septum', 'Atrial septum', 'Diagonals run superficially onto the anterolateral LV free wall.']),
  vent_ant_d_dae: branch('right anterior ventricular branches of the LAD', 'LAD',
    'Cross from the anterior interventricular groove onto the anterior RV wall.',
    'Contribute to perfusion of anterior RV myocardium near the septum.',
    'Contribute to overlap between left and right coronary supply to the RV.',
    ['Circumflex', 'PDA', 'Right marginal artery'],
    ['Which wall do these branches reach?', 'Anterior RV free wall', 'Posterior LV free wall', 'Left atrial roof', 'Posterior interventricular septum', 'These branches leave the anterior interventricular groove toward the RV free wall.']),
  cone_e: branch('left conus branch', 'LAD',
    'Courses toward the pulmonary infundibulum and may meet the right conus branch.',
    'Contributes to perfusion of the RV outflow tract.',
    'An anastomosis between conus branches can provide intercoronary collateral flow.',
    ['PDA', 'Circumflex', 'Right marginal artery'],
    ['What is the conal intercoronary anastomosis called?', 'Ring of Vieussens', 'Circle of Willis', 'Triangle of Koch', 'Arc of Riolan', 'An anastomosis between left and right conus arteries can form the ring of Vieussens.']),
  sept_da: branch('anterior septal perforators', 'LAD',
    'Turn deeply into the muscular septum from the anterior interventricular groove.',
    'Supply anterior two-thirds of the septum, including much of the bundle branch system.',
    'A suitable septal perforator may be targeted in alcohol septal ablation for obstructive hypertrophic cardiomyopathy.',
    ['PDA', 'Circumflex', 'Right marginal artery'],
    ['Which region receives their principal supply?', 'Anterior two-thirds of the septum', 'Posterior third of the septum', 'Lateral right atrium', 'Inferior RV margin', 'Anterior septal perforators enter the septum from the LAD and supply its anterior portion.']),
  sept_dp: branch('posterior septal perforators', 'PDA',
    'Enter the ventricular septum from the posterior interventricular groove.',
    'Supply the posterior third of the interventricular septum.',
    'Posterior septal ischemia can accompany inferior myocardial infarction.',
    ['LAD', 'Diagonal artery', 'Right marginal artery'],
    ['Which region receives their principal supply?', 'Posterior third of the septum', 'Anterior two-thirds of the septum', 'Atrial appendage', 'Anterior RV outflow', 'These perforators enter the posterior septum from the inferior surface of the heart.']),
  cx: card('left circumflex artery', {
    definition: ['Epicardial branch of the left main coronary artery.'],
    course: ['Passes under the left auricle and follows the left atrioventricular groove toward the posterior heart.'],
    relations: ['The great cardiac vein runs nearby in the left AV groove. The posterior mitral annulus lies close to the artery.'],
    branches: ['Gives obtuse marginal and atrial branches. In left dominance it gives the posterior interventricular branch.'],
    supply: ['Supplies the lateral LV and parts of the LA. Its inferior and posterior territories increase with left dominance.'],
    clinical: ['Mitral annular sutures can compromise the adjacent circumflex artery.'],
    imaging: ['Coronary angiography defines obtuse marginal branches and the distal vessel at the crux.'],
  }, [
    ['Which groove does it follow?', 'Left AV groove', 'Anterior interventricular groove', 'Terminal groove', 'Right AV groove', 'The circumflex curves around the left heart in the groove separating LA and LV.'],
    ['Which branches cross the obtuse margin?', 'Obtuse marginal branches', 'Acute marginal branches', 'Anterior septal perforators', 'Conus branches', 'Obtuse marginal branches leave the circumflex for the lateral LV wall.'],
  ]),
  marg_d: branch('right marginal artery', 'RCA',
    'Courses along the acute inferior margin toward the apex.',
    'Supplies the adjacent RV free wall.',
    'A prominent branch can be a landmark for the acute margin on angiography.',
    ['LAD', 'Circumflex', 'Left main'],
    ['Which venous channel may accompany it?', 'Small cardiac vein', 'Great cardiac vein', 'Middle cardiac vein', 'Left superior pulmonary vein', 'The small cardiac vein may follow the right marginal artery before entering the right AV groove.']),
  vent_ant_acd: branch('anterior ventricular branch of the RCA', 'RCA',
    'Leaves the right AV groove and crosses the anterior RV free wall.',
    'Supplies sternocostal RV myocardium.',
    'Reduced flow to RV branches after proximal RCA occlusion can contribute to RV infarction.',
    ['LAD', 'Circumflex', 'PDA'],
    ['Which surface receives this branch?', 'Sternocostal RV', 'Posterior left atrium', 'Lateral LV', 'Posterior septum', 'The branch crosses the anterior, sternocostal surface of the RV.']),
  dp: card('posterior interventricular artery', {
    definition: ['Also called the posterior descending artery. Its parent coronary artery defines coronary dominance.'],
    course: ['Usually arises from the RCA near the crux, or from the circumflex in left dominance. Runs toward the apex.'],
    relations: ['Accompanied by the middle cardiac vein in the posterior interventricular groove on the diaphragmatic surface.'],
    branches: ['Gives posterior septal perforators and branches to adjacent inferior ventricular myocardium.'],
    supply: ['Supplies the posterior third of the septum and neighboring inferior ventricular walls.'],
    clinical: ['Occlusion may cause inferior myocardial infarction with posterior septal involvement.'],
    imaging: ['Angiography traces the vessel back to its parent and shows the branching pattern at the crux.'],
  }, [
    ['Which vein follows the same groove?', 'Middle cardiac vein', 'Great cardiac vein', 'Small cardiac vein', 'Oblique vein of the LA', 'The middle cardiac vein accompanies the PDA in the posterior interventricular groove.'],
    ['Where does the PDA arise in left dominance?', 'Circumflex artery', 'LAD', 'Left aortic sinus directly', 'Left marginal vein', 'Left dominance means the circumflex supplies the posterior interventricular artery.'],
  ]),
  vent_post_acd: branch('posterolateral ventricular branch of the RCA', 'RCA',
    'Passes beyond the crux in a right-dominant pattern to reach the inferior and inferolateral LV wall.',
    'Supplies diaphragmatic LV myocardium lateral to the posterior interventricular groove.',
    'The inferior and inferolateral infarct territory varies with the posterior branching pattern.',
    ['LAD', 'Left main', 'Right marginal artery'],
    ['Which territory is typical in right dominance?', 'Inferolateral LV', 'Anterior RV infundibulum', 'Anterior septum', 'Left atrial appendage', 'Right posterolateral branches fan across the inferior and inferolateral LV wall.']),
};

function cardiacVein(name, course, relations, drainage, clinical, questions) {
  return card(name, {
    definition: ['Epicardial venous channel returning myocardial blood to the right atrium via the coronary venous system.'],
    course: [course],
    relations: [relations],
    supply: [drainage],
    clinical: [clinical],
    imaging: ['Coronary venography depicts its course and connection to the coronary sinus.'],
  }, questions);
}

const cardiacVeins = {
  seio: card('coronary sinus', {
    definition: ['Main collecting channel of the cardiac venous system.'],
    course: ['Continues the great cardiac vein in the posterior left AV groove and opens into the right atrium.'],
    relations: ['Its atrial ostium lies between the IVC orifice and septal tricuspid attachment.'],
    branches: ['Receives the middle and small cardiac veins, posterior LV veins and oblique vein of the left atrium.'],
    internal: ['A variable Thebesian valve guards the atrial ostium.'],
    development: ['Develops predominantly from the left horn of the sinus venosus.'],
    clinical: ['Provides access to LV epicardial veins for cardiac resynchronization leads.'],
    imaging: ['A dilated coronary sinus on echocardiography can suggest a persistent left SVC.'],
  }, [
    ['Where does the coronary sinus empty?', 'Right atrium', 'Left atrium', 'SVC', 'IVC', 'It opens directly into the RA between the IVC ostium and tricuspid orifice.'],
    ['What embryonic structure forms it?', 'Left horn of sinus venosus', 'Right horn of sinus venosus', 'Truncus arteriosus', 'Septum primum', 'The left sinus horn contributes the coronary sinus.'],
  ]),
  vcmagna: cardiacVein('great cardiac vein',
    'Ascends from near the apex in the anterior interventricular groove, turns into the left AV groove and continues as the coronary sinus.',
    'Accompanies the LAD anteriorly and runs near the circumflex in the left AV groove.',
    'Drains anterior ventricular and septal territories and receives left ventricular tributaries.',
    'Its proximity to epicardial coronary arteries matters during coronary venous ablation.', [
      ['What artery accompanies its ascending portion?', 'LAD', 'PDA', 'RCA', 'Right marginal artery', 'The LAD and great cardiac vein occupy the anterior interventricular groove.'],
      ['What is its terminal continuation?', 'Coronary sinus', 'Azygos vein', 'Right superior pulmonary vein', 'IVC', 'The great cardiac vein becomes the coronary sinus in the posterior portion of the left AV groove.'],
    ]),
  vcmedia: cardiacVein('middle cardiac vein',
    'Ascends from near the apex in the posterior interventricular groove and enters the coronary sinus near its atrial end.',
    'Accompanies the posterior interventricular artery.',
    'Drains adjacent inferior ventricular walls and septal tributaries.',
    'Its ostium near the coronary sinus opening is a landmark during venous catheterization.', [
      ['Which artery accompanies it?', 'PDA', 'LAD', 'Left main', 'Circumflex', 'The middle cardiac vein runs with the PDA in the posterior interventricular groove.'],
      ['Where does it usually drain?', 'Coronary sinus near its right atrial end', 'Left superior pulmonary vein', 'Azygos vein', 'SVC', 'The middle cardiac vein usually joins the sinus shortly before its right atrial opening.'],
    ]),
  vcparva: cardiacVein('small cardiac vein',
    'Follows the right margin variably, then travels in the right AV groove toward the coronary sinus.',
    'Runs near the right marginal artery and RCA. The vein may be absent.',
    'Drains portions of the right atrium and right ventricle.',
    'Its caliber and termination vary on coronary venography.', [
      ['Which groove carries its terminal portion?', 'Right AV groove', 'Left AV groove', 'Anterior interventricular groove', 'Terminal groove', 'The vein traverses the right AV groove toward the right end of the coronary sinus.'],
      ['What territory does it help drain?', 'Right atrium and right ventricle', 'Left atrium and lung', 'Thoracic esophagus', 'Anterior chest wall', 'The small cardiac vein collects blood from right atrial and right ventricular myocardium.'],
    ]),
  vpve: cardiacVein('posterior vein of the left ventricle',
    'Ascends along the diaphragmatic LV surface to join the coronary sinus, sometimes through the great cardiac vein.',
    'Typically lies left of the posterior interventricular groove.',
    'Drains inferior and posterior LV myocardium.',
    'A suitable posterior or lateral coronary venous tributary can accommodate an LV pacing lead.', [
      ['Which surface does it drain?', 'Diaphragmatic LV', 'Sternocostal RV', 'Left atrial roof', 'Superior vena cava wall', 'This vein collects blood from the inferior and posterior LV wall.'],
      ['What is its usual receiving channel?', 'Coronary sinus', 'Left inferior pulmonary vein', 'Hemiazygos vein', 'SVC', 'The posterior LV vein usually drains to the coronary sinus along the posterior AV groove.'],
    ]),
};

const greatVessels = {
  aoasc: card('ascending aorta', {
    definition: ['Intrapericardial proximal segment of the systemic arterial trunk.'],
    course: ['Begins at the LV aortic orifice and ascends to the arch near the right second sternocostal joint.'],
    relations: ['The pulmonary trunk lies anterior and then leftward. The right pulmonary artery and transverse pericardial sinus lie posteriorly.'],
    internal: ['The root contains three sinuses. The sinotubular junction separates the root from the tubular ascending segment.'],
    branches: ['Right and left coronary arteries arise from their corresponding sinuses.'],
    clinical: ['An ascending dissection may cause aortic regurgitation, coronary malperfusion or hemopericardium.'],
    imaging: ['ECG-gated CT limits motion artifact at the root and ascending aorta.'],
  }, [
    ['Which arteries arise directly from this segment?', 'Coronary arteries', 'Common carotid arteries', 'Bronchial arteries', 'Posterior intercostal arteries', 'The two coronary ostia lie in the right and left aortic sinuses.'],
    ['Which recess lies posterior to the proximal arterial trunks?', 'Transverse pericardial sinus', 'Oblique pericardial sinus', 'Costomediastinal recess', 'Costodiaphragmatic recess', 'The transverse sinus lies posterior to the ascending aorta and pulmonary trunk.'],
  ]),
  arco: card('aortic arch', {
    definition: ['Curved arterial segment in the superior mediastinum connecting ascending and descending aorta.'],
    course: ['Arches superiorly, posteriorly and leftward over the left lung root, ending near the T4–T5 transverse thoracic plane.'],
    relations: ['The left recurrent laryngeal nerve loops beneath the arch near the ligamentum arteriosum.'],
    branches: ['Normally gives the brachiocephalic trunk, left common carotid and left subclavian arteries in that order.'],
    development: ['The left fourth pharyngeal arch artery contributes the segment between the left common carotid and left subclavian arteries.'],
    clinical: ['Coarctation commonly involves the isthmus near the ductal attachment, just beyond the left subclavian origin.'],
    imaging: ['The aortic knob forms part of the left mediastinal contour on a PA radiograph.'],
  }, [
    ['Which nerve hooks beneath the arch?', 'Left recurrent laryngeal', 'Right recurrent laryngeal', 'Left phrenic', 'Right phrenic', 'The left recurrent laryngeal nerve turns inferior to the arch near the arterial ligament.'],
    ['Which branch usually arises last?', 'Left subclavian', 'Left common carotid', 'Right common carotid', 'Brachiocephalic trunk', 'The left subclavian is usually the third and most distal arch branch.'],
  ]),
  aodesc: card('descending thoracic aorta', {
    definition: ['Posterior mediastinal portion of the aorta between the arch and abdominal segment.'],
    course: ['Begins left of the vertebral column near T4–T5, approaches the midline and passes through the aortic hiatus at T12.'],
    relations: ['The esophagus crosses anterior to it in the lower thorax. The thoracic duct ascends between it and the azygos vein inferiorly.'],
    branches: ['Gives posterior intercostal, subcostal, superior phrenic, bronchial, esophageal and mediastinal branches.'],
    clinical: ['Thoracic aortic repair can compromise segmental arterial contributions to spinal cord perfusion.'],
    imaging: ['CTA shows the lumen, wall, branch origins and extent of aneurysm or dissection.'],
  }, [
    ['At what level does it traverse the diaphragm?', 'T12', 'T8', 'T10', 'L2', 'The aortic hiatus at T12 transmits the aorta and thoracic duct.'],
    ['Which arteries typically arise from it?', 'Third through eleventh posterior intercostals', 'First and second posterior intercostals', 'Anterior intercostals', 'Internal thoracic arteries', 'The first two posterior intercostal spaces usually receive branches of the supreme intercostal artery.'],
  ]),
  tbc: card('brachiocephalic trunk', {
    definition: ['First and usually largest branch of the aortic arch.'],
    course: ['Ascends obliquely rightward in the superior mediastinum and divides posterior to the right sternoclavicular joint.'],
    relations: ['Crosses anterior to the trachea. The left brachiocephalic vein crosses anterior to the arch branches.'],
    branches: ['Terminates as the right common carotid and right subclavian arteries. A thyroid ima artery occasionally arises from it.'],
    development: ['Develops from the right horn of the aortic sac.'],
    clinical: ['A high-riding trunk can lie in the path of a low tracheostomy.'],
    imaging: ['CTA defines its height relative to the trachea and sternoclavicular joint.'],
  }, [
    ['Where does it normally bifurcate?', 'Behind the right sternoclavicular joint', 'At the left hilum', 'At the aortic hiatus', 'Behind the left sternoclavicular joint', 'It ascends to the right sternoclavicular joint before giving its two terminal arteries.'],
    ['Which pair does it give?', 'Right common carotid and right subclavian', 'Both common carotids', 'Both subclavians', 'Left common carotid and left subclavian', 'Its terminal branches serve the right head and neck and the right upper limb.'],
  ]),
};

function carotid(side, origin, thoracicRelation, embryology, otherOrigin) {
  const name = `${side} common carotid artery`;
  return card(name, {
    definition: ['Arterial inflow to the internal and external carotid systems.'],
    course: [`Arises from the ${origin} and ascends to bifurcate near the upper border of the thyroid cartilage, typically around C4.`],
    relations: [thoracicRelation, 'In the carotid sheath, the internal jugular vein is lateral and the vagus nerve lies posteriorly between artery and vein.'],
    branches: ['Usually gives no branches before its division into internal and external carotids.'],
    development: [embryology],
    clinical: ['The carotid sinus senses arterial pressure. The neighboring carotid body senses changes in arterial blood gases and pH.'],
    imaging: ['Duplex ultrasonography assesses the bifurcation and internal carotid origin.'],
  }, [
    [`What is the usual origin of the ${name}?`, origin, otherOrigin, 'Ascending aorta', 'Internal thoracic artery', `It normally arises from the ${origin}.`],
    ['Which structure is the arterial baroreceptor?', 'Carotid sinus', 'Carotid body', 'Jugular bulb', 'Cervical sympathetic trunk', 'Stretch receptors in the carotid sinus detect arterial pressure.'],
  ]);
}

function subclavian(side, origin, relation, development, otherOrigin) {
  const name = `${side} subclavian artery`;
  return card(name, {
    definition: ['Proximal arterial conduit to the upper limb.'],
    course: [`Arises from the ${origin}, arches across the first rib and becomes axillary at its lateral border.`],
    relations: [relation, 'Anterior scalene divides the artery into three parts. The subclavian vein passes anterior to the muscle.'],
    branches: ['Major branches include vertebral, internal thoracic, thyrocervical and costocervical vessels. Dorsal scapular origin varies.'],
    development: [development],
    clinical: ['Stenosis proximal to the vertebral origin can reverse ipsilateral vertebral flow in subclavian steal.'],
    imaging: ['Duplex ultrasound can show vertebral flow reversal. CTA defines the stenosis and arch branches.'],
  }, [
    [`What is the normal origin of the ${name}?`, origin, otherOrigin, 'Descending thoracic aorta', 'Axillary artery', `It normally arises from the ${origin}.`],
    ['Where does it become the axillary artery?', 'Lateral border of first rib', 'Medial border of first rib', 'Lateral border of second rib', 'Inferior border of teres major', 'The artery becomes axillary at the lateral border of the first rib.'],
  ]);
}

Object.assign(greatVessels, {
  ccd: carotid('right', 'brachiocephalic trunk',
    'Begins posterior to the right sternoclavicular joint.',
    'The third pharyngeal arch artery contributes to the common carotid.',
    'Aortic arch'),
  cce: carotid('left', 'aortic arch',
    'Has a thoracic segment that ascends to the left of the trachea and posterior to the left brachiocephalic vein.',
    'The third pharyngeal arch artery contributes to the common carotid.',
    'Brachiocephalic trunk'),
  scd: subclavian('right', 'brachiocephalic trunk',
    'The right recurrent laryngeal nerve hooks beneath its proximal segment.',
    'The right fourth arch artery, dorsal aorta and seventh intersegmental artery contribute to its formation.',
    'Aortic arch'),
  sce: subclavian('left', 'aortic arch',
    'Its thoracic portion ascends in the superior mediastinum before reaching the root of the neck.',
    'Develops from the left seventh intersegmental artery.',
    'Brachiocephalic trunk'),
  vcs: card('superior vena cava', {
    definition: ['Returns venous blood from the head, neck, upper limbs and much of the thorax to the RA.'],
    course: ['Formed posterior to the right first costal cartilage by the brachiocephalic veins. Descends to the RA near the right third costal cartilage.'],
    relations: ['The right phrenic nerve descends along its lateral aspect. The ascending aorta lies medially.'],
    branches: ['Receives the azygos arch before entering the pericardium.'],
    development: ['Derived from the right common cardinal vein and proximal right anterior cardinal vein.'],
    clinical: ['Obstruction may cause head and upper-limb swelling with collateral venous enlargement.'],
    imaging: ['Contrast CT can show the level of obstruction and collateral pathways.'],
  }, [
    ['What veins unite to form it?', 'Right and left brachiocephalic veins', 'Right and left subclavian veins', 'Azygos and hemiazygos veins', 'Right and left jugular veins', 'The brachiocephalic veins unite posterior to the right first costal cartilage.'],
    ['Which major tributary arches into it?', 'Azygos vein', 'Hemiazygos vein', 'Coronary sinus', 'Left superior intercostal vein', 'The azygos arches over the right lung root to enter the SVC.'],
  ]),
  vci: card('inferior vena cava', {
    definition: ['Major systemic vein returning blood from inferior to the diaphragm to the RA.'],
    course: ['Common iliac veins unite near L5. The IVC ascends right of the aorta, crosses the diaphragm at T8 and enters the RA.'],
    relations: ['Lies in a groove on the posterior liver and traverses the central tendon.'],
    branches: ['Receives lumbar, renal, hepatic, inferior phrenic, right gonadal and right suprarenal veins.'],
    internal: ['A variable Eustachian valve is present at the atrial opening.'],
    development: ['Develops from several embryonic venous segments, including hepatic, subcardinal and supracardinal channels.'],
    clinical: ['Azygos continuation can provide an alternative return pathway when the hepatic connection is interrupted.'],
    imaging: ['Subcostal ultrasound shows the IVC and hepatic veins entering near the right atrium.'],
  }, [
    ['Which part of the diaphragm does it traverse?', 'Central tendon', 'Right crus at the esophageal hiatus', 'Median arcuate ligament', 'Left costal muscle', 'The caval opening lies in the right part of the central tendon at T8.'],
    ['Which fold can guard its atrial opening?', 'Eustachian valve', 'Thebesian valve', 'Limbus of fossa ovalis', 'Tendon of Todaro', 'The Eustachian valve is a variable remnant at the IVC ostium.'],
  ]),
});

function brachiocephalicVein(side, course, relations, tributaries, clinical, question) {
  return card(`${side} brachiocephalic vein`, {
    definition: ['Formed by the union of the internal jugular and subclavian veins posterior to the sternoclavicular joint.'],
    course: [course],
    relations: [relations],
    branches: [tributaries],
    clinical: [clinical],
    imaging: ['Contrast-enhanced CT demonstrates its course and patency to the SVC.'],
  }, [
    ['Which veins unite at its origin?', 'Internal jugular and subclavian', 'External jugular and axillary', 'Vertebral and internal thoracic', 'Azygos and hemiazygos', 'The venous angle is the junction of the internal jugular and subclavian veins.'],
    question,
  ]);
}

Object.assign(greatVessels, {
  vbcd: brachiocephalicVein('right',
    'Descends nearly vertically to meet the left vein posterior to the first right costal cartilage.',
    'Lies to the right of the brachiocephalic arterial trunk.',
    'Receives vertebral and internal thoracic veins, among other tributaries.',
    'A right internal jugular catheter takes a relatively direct course to the SVC.', [
      'Where does it join its left counterpart?', 'Posterior to the first right costal cartilage', 'At the left second sternocostal joint', 'At the caval hiatus', 'Posterior to the xiphoid', 'The two veins unite posterior to the first right costal cartilage to form the SVC.',
    ]),
  vbce: brachiocephalicVein('left',
    'Crosses obliquely rightward from the left venous angle to join the right brachiocephalic vein.',
    'Traverses posterior to the manubrium and anterior to the branches of the aortic arch.',
    'Receives vertebral, internal thoracic, inferior thyroid, thymic and left superior intercostal tributaries.',
    'An enlarged aortic arch can compress this vein against the manubrium.', [
      'Where does it cross the arch branches?', 'Anterior to them', 'Immediately posterior to them', 'Between the arch and left pulmonary artery', 'Through the transverse pericardial sinus', 'The left brachiocephalic vein crosses the superior mediastinum anterior to the arch branches.',
    ]),
  azigo: card('azygos vein', {
    definition: ['Right paravertebral venous channel connecting superior and inferior caval territories.'],
    course: ['Usually forms from the right ascending lumbar and subcostal veins, ascends in the thorax and arches into the SVC.'],
    relations: ['The arch crosses over the right lung root. The vertical portion lies right of the thoracic vertebral bodies.'],
    branches: ['Receives right posterior intercostal veins, hemiazygos and accessory hemiazygos channels, and mediastinal tributaries.'],
    clinical: ['Enlarges when it carries collateral flow around caval obstruction.'],
    imaging: ['The azygos arch may form a small right tracheobronchial contour on frontal radiography.'],
  }, [
    ['What does the azygos arch cross?', 'Right lung root', 'Left lung root', 'Right subclavian artery', 'Left atrial appendage', 'The azygos vein arches over the right lung root before reaching the SVC.'],
    ['Which channel receives its terminal flow?', 'Superior vena cava', 'Inferior vena cava', 'Coronary sinus', 'Left brachiocephalic vein', 'The azygos arch opens into the SVC before the latter enters the pericardium.'],
  ]),
  hemiazigo: card('hemiazygos vein', {
    definition: ['Inferior left paravertebral component of the azygos venous system.'],
    course: ['Usually forms from the left ascending lumbar and subcostal veins, ascends and crosses near T8–T9 to join the azygos.'],
    relations: ['Passes posterior to the thoracic aorta, esophagus and thoracic duct at its crossing.'],
    branches: ['Receives lower left posterior intercostal and esophageal tributaries.'],
    clinical: ['Provides a collateral route from lower left thoracic and abdominal territories.'],
    imaging: ['Contrast CT distinguishes the enhancing paravertebral vein from adjacent nodes.'],
  }, [
    ['What does it drain into?', 'Azygos vein', 'Coronary sinus', 'Left superior pulmonary vein', 'Left brachiocephalic vein', 'The hemiazygos crosses the midline posteriorly to enter the azygos vein.'],
    ['Which territory does it principally drain?', 'Lower left posterior intercostal spaces', 'Upper right anterior intercostal spaces', 'Left ventricular wall', 'Left upper limb', 'Lower left posterior intercostal veins commonly join the hemiazygos.'],
  ]),
  tp: card('pulmonary trunk', {
    definition: ['Common arterial outflow from the RV to both lungs.'],
    course: ['Begins at the pulmonary valve, ascends leftward and posteriorly and bifurcates beneath the aortic arch near the sternal angle plane.'],
    relations: ['Begins anterior to the ascending aorta. The transverse pericardial sinus lies posterior to the arterial roots.'],
    branches: ['Divides into right and left pulmonary arteries.'],
    development: ['Forms through partitioning of the embryonic common outflow tract.'],
    clinical: ['Pulmonary hypertension can enlarge the trunk and central pulmonary arteries.'],
    imaging: ['CT pulmonary angiography depicts the trunk and searches for central emboli at its bifurcation.'],
  }, [
    ['Which ventricular tract feeds it?', 'RV infundibulum', 'Aortic vestibule', 'Left ventricular inflow tract', 'Sinus venarum', 'The infundibulum leads from the RV to the pulmonary valve and trunk.'],
    ['What arches superior to its bifurcation?', 'Aortic arch', 'Azygos arch', 'Left brachiocephalic vein', 'Coronary sinus', 'The pulmonary trunk divides inferior to the arch of the aorta.'],
  ]),
  apd: card('right pulmonary artery', {
    definition: ['Carries blood from the pulmonary trunk to the right lung for gas exchange.'],
    course: ['Passes rightward posterior to the ascending aorta and SVC to the right lung root.'],
    relations: ['Lies anterior to the right main bronchus. The right upper lobar bronchus is eparterial.'],
    branches: ['Gives upper lobar branches and continues as the interlobar artery to the middle and lower lobes.'],
    development: ['The proximal right sixth arch artery contributes to the right pulmonary artery.'],
    clinical: ['A pulmonary embolus may lodge centrally or extend into lobar branches.'],
    imaging: ['CT angiography distinguishes the right pulmonary artery from adjacent mediastinal vessels.'],
  }, [
    ['Where does it lie relative to the right main bronchus?', 'Anterior', 'Posterior', 'Within the lumen', 'Always inferior', 'The right pulmonary artery passes anterior to the right main bronchus at the root.'],
    ['What lies anterior to its mediastinal course?', 'Ascending aorta and SVC', 'Descending aorta and azygos vein', 'Esophagus and thoracic duct', 'Left main bronchus and IVC', 'The right pulmonary artery crosses posterior to the ascending aorta and SVC.'],
  ]),
  ape: card('left pulmonary artery', {
    definition: ['Carries blood from the pulmonary trunk to the left lung for gas exchange.'],
    course: ['Runs leftward under the aortic arch, over the left main bronchus and into the left lung root.'],
    relations: ['The ligamentum arteriosum joins its proximal region to the aortic arch near the isthmus.'],
    branches: ['Supplies the upper lobe, including the lingula, and the lower lobe through lobar and segmental branches.'],
    development: ['The proximal left sixth arch artery contributes to the left pulmonary artery. Its distal portion forms the ductus arteriosus.'],
    clinical: ['A left pulmonary artery sling can course between trachea and esophagus and compress the airway.'],
    imaging: ['CT angiography shows its superior relationship to the left main bronchus.'],
  }, [
    ['Where does it lie relative to the left main bronchus at the root?', 'Superior', 'Anterior only', 'Inferior', 'Within the bronchus', 'The left pulmonary artery arches superior to the left main bronchus.'],
    ['What connects it to the aortic isthmus?', 'Ligamentum arteriosum', 'Ligamentum venosum', 'Inferior pulmonary ligament', 'Median arcuate ligament', 'The ligamentum arteriosum is the postnatal remnant of the ductus arteriosus.'],
  ]),
  lobsupd: card('right upper lobar pulmonary artery', {
    definition: ['Pulmonary arterial supply to part or all of the right upper lobe through a variable branching pattern.'],
    course: ['An anterior trunk commonly arises proximally from the right pulmonary artery and ascends into the upper lobe.'],
    relations: ['At the root, the upper lobar bronchus is superior to the main right pulmonary artery.'],
    branches: ['Apical and anterior arteries commonly arise from the anterior trunk. A posterior segmental artery can arise from the interlobar artery.'],
    clinical: ['Variant upper lobe arterial branches must be recognized during lobectomy.'],
    imaging: ['Thin-section CT angiography can map upper lobar arterial variants.'],
  }, [
    ['Which vessel gives the usual anterior trunk?', 'Right pulmonary artery', 'Left pulmonary artery', 'Ascending aorta', 'Right bronchial artery', 'The anterior trunk commonly branches from the proximal right pulmonary artery.'],
    ['Which segment may receive a separate branch from the interlobar artery?', 'Posterior upper lobe segment', 'Medial middle lobe segment', 'Posterior basal segment', 'Superior lower lobe segment', 'An ascending posterior segmental artery may arise from the interlobar artery.'],
  ]),
});

function pulmonaryVein(side, level, territory, route, variant, otherLobes) {
  const name = `${side} ${level} pulmonary vein`;
  return card(name, {
    definition: ['Returns oxygenated blood from the lung to the left atrium.'],
    course: [route],
    relations: ['Pulmonary veins sit anteriorly and inferiorly in the lung root relative to the main bronchus.'],
    supply: [`Usually drains the ${territory}.`],
    development: ['Pulmonary venous incorporation into the posterior left atrium produces the usual separate ostia.'],
    clinical: [variant, 'Pulmonary vein ostia are important landmarks during atrial fibrillation ablation.'],
    imaging: ['Contrast CT maps pulmonary venous drainage and ostial variants.'],
  }, [
    [`What does the ${name} usually drain?`, territory, ...otherLobes, `Its typical drainage territory is the ${territory}.`],
    ['Which chamber directly receives it?', 'Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle', 'Pulmonary veins normally enter the posterior left atrium.'],
  ]);
}

Object.assign(greatVessels, {
  vpsd: pulmonaryVein('right', 'superior', 'right upper and middle lobes',
    'Passes medially from the anterior right hilum to the upper right ostium of the left atrium.',
    'The middle lobe may drain separately into the left atrium.',
    ['Right lower lobe', 'Left upper and lower lobes', 'Left upper lobe']),
  vpid: pulmonaryVein('right', 'inferior', 'right lower lobe',
    'Converges from lower lobe veins at the inferior right hilum and enters the lower right ostium of the left atrium.',
    'A middle lobe tributary may occasionally join it.',
    ['Right upper lobe', 'Right upper and middle lobes', 'Left lower lobe']),
  vpse: pulmonaryVein('left', 'superior', 'left upper lobe including the lingula',
    'Passes from the anterior left hilum to the upper left ostium of the left atrium.',
    'It can join the left inferior vein in a common left pulmonary venous trunk.',
    ['Left lower lobe', 'Right upper lobe', 'Right middle lobe']),
  vpie: pulmonaryVein('left', 'inferior', 'left lower lobe',
    'Passes from the inferior left hilum to the lower left ostium of the left atrium.',
    'A common left venous trunk can alter the number and location of ablation targets.',
    ['Left upper lobe', 'Lingula alone', 'Right lower lobe']),
  esofago: card('thoracic esophagus', {
    definition: ['Muscular foregut conduit from the pharynx to the stomach.'],
    course: ['Begins at C6, descends through the thorax, crosses the diaphragm at T10 and reaches the gastric cardia.'],
    relations: ['Lies posterior to the trachea and left atrium. The aortic arch and left main bronchus cross its upper thoracic course.'],
    supply: ['Thoracic supply comes from aortic and bronchial branches. Venous drainage reaches the azygos system.'],
    internal: ['Nonkeratinized stratified squamous epithelium lines the lumen. Muscle transitions from skeletal to smooth along its length.'],
    development: ['Derives from dorsal foregut after separation from the ventral respiratory diverticulum.'],
    clinical: ['Normal impressions include the cricopharyngeus, arch, left main bronchus and diaphragmatic hiatus. Distal portosystemic channels can form varices.'],
    imaging: ['A barium swallow shows extrinsic impressions. Transesophageal ultrasound images the atrium across the anterior esophageal wall.'],
  }, [
    ['What is the level of the esophageal hiatus?', 'T10', 'T8', 'T12', 'L2', 'The esophagus and vagal trunks traverse the diaphragm at about T10.'],
    ['What cardiac chamber can compress it when enlarged?', 'Left atrium', 'Right atrium', 'Right ventricle', 'Left ventricle', 'The esophagus lies immediately posterior to the pericardium over the left atrium.'],
  ]),
});

function thymus(side, relation) {
  return card(`${side} thymic lobe`, {
    definition: ['One lobe of the bilobed primary lymphoid organ for T-cell maturation and selection.'],
    location: ['Retrosternal in the superior and anterior mediastinum. A superior pole may extend into the lower neck.'],
    relations: [relation],
    supply: ['Receives branches from internal thoracic and inferior thyroid arteries. Veins often drain to the left brachiocephalic vein.'],
    internal: ['Lobules contain a thymocyte-rich cortex and paler medulla. Hassall corpuscles lie in the medulla.'],
    development: ['Epithelium arises from the ventral third pharyngeal pouch. The two primordia descend and meet in the mediastinum.'],
    clinical: ['Thymoma is associated with myasthenia gravis. Thymic hypoplasia can accompany 22q11.2 deletion.'],
    imaging: ['The thymus may form a normal sail sign in infants. Fatty involution changes its appearance after puberty.'],
  }, [
    ['Which pharyngeal pouch forms the thymic epithelium?', 'Third', 'First', 'Second', 'Fourth', 'The ventral wings of the third pharyngeal pouches form the thymic epithelium.'],
    ['Where are Hassall corpuscles found?', 'Thymic medulla', 'Thymic cortex', 'Germinal center', 'Marginal sinus', 'Hassall corpuscles are concentric epithelial structures in the thymic medulla.'],
  ]);
}

greatVessels.timo_d = thymus('right', 'Lies posterior to the manubrium, anterior to upper mediastinal great vessels on the right.');
greatVessels.timo_e = thymus('left', 'Lies posterior to the manubrium, anterior to the left brachiocephalic vein and arch branches.');

const airways = {
  traqueia: card('trachea', {
    definition: ['Fibrocartilaginous conducting airway between larynx and main bronchi.'],
    course: ['Begins at the lower cricoid border at C6 and bifurcates at the carina near the T4–T5 plane.'],
    relations: ['Esophagus lies posteriorly. Thyroid isthmus crosses anteriorly in the neck. Recurrent laryngeal nerves ascend in the tracheoesophageal grooves.'],
    supply: ['Inferior thyroid branches supply the cervical trachea. Bronchial branches contribute within the thorax.'],
    internal: ['C-shaped hyaline cartilages maintain patency. The posterior membranous wall contains trachealis muscle and borders the esophagus.'],
    development: ['Respiratory epithelium derives from foregut endoderm. Supporting cartilage and muscle derive from splanchnic mesoderm.'],
    clinical: ['The carina is sensitive and can trigger a cough. Excessively deep endotracheal tubes often enter the right main bronchus.'],
    imaging: ['Chest radiography shows the air column, carina and endotracheal tube tip.'],
  }, [
    ['Which muscle bridges the open posterior ends of the cartilages?', 'Trachealis', 'Cricothyroid', 'Cricopharyngeus', 'Posterior cricoarytenoid', 'Trachealis smooth muscle spans the posterior gap between cartilage ends.'],
    ['Which landmark approximates the resting carinal level?', 'Sternal angle', 'Xiphisternal joint', 'Jugular notch', 'Inferior scapular angle', 'The carina is near the transverse thoracic plane through the sternal angle, with movement during respiration.'],
  ]),
  bpd: card('right main bronchus', {
    definition: ['Primary conducting bronchus from the carina to the right lung.'],
    course: ['Descends more vertically and is shorter and wider than the left. Gives the upper lobar bronchus and continues as the bronchus intermedius.'],
    relations: ['The azygos arch passes over the root. The right pulmonary artery lies anterior to the main bronchus.'],
    branches: ['The eparterial upper lobar bronchus arises superior to the pulmonary artery. The bronchus intermedius divides into middle and lower lobar bronchi.'],
    supply: ['Bronchial arteries supply the conducting airway wall.'],
    clinical: ['Aspirated material or a deeply inserted endotracheal tube more often enters the right main bronchus.'],
    imaging: ['CT and bronchoscopy show the upper lobar orifice and bronchus intermedius.'],
  }, [
    ['What continues beyond the upper lobar takeoff?', 'Bronchus intermedius', 'Lingula', 'Carina', 'Left main bronchus', 'The bronchus intermedius serves the middle and lower lobes after the upper lobar bronchus branches off.'],
    ['Which bronchus is eparterial?', 'Right upper lobar bronchus', 'Right middle lobar bronchus', 'Left upper lobar bronchus', 'Right lower lobar bronchus', 'The right upper lobar bronchus typically arises superior to the right pulmonary artery.'],
  ]),
  bpe: card('left main bronchus', {
    definition: ['Primary conducting bronchus from the carina to the left lung.'],
    course: ['Passes inferolaterally inferior to the aortic arch toward the left hilum. It is longer, narrower and less vertical than the right.'],
    relations: ['Crosses anterior to the esophagus and descending thoracic aorta. The left pulmonary artery passes superiorly at the root.'],
    branches: ['Divides into upper and lower lobar bronchi. The upper lobar bronchus gives upper division and lingular branches.'],
    supply: ['Bronchial arteries supply its conducting wall.'],
    clinical: ['An enlarged left atrium can elevate or compress the left main bronchus.'],
    imaging: ['Coronal CT shows the left main bronchus beneath the arch and its division at the hilum.'],
  }, [
    ['Which vessel arches over this bronchus in the mediastinum?', 'Aortic arch', 'Azygos arch', 'Inferior vena cava', 'Right pulmonary artery', 'The left main bronchus passes beneath the aortic arch on its way to the lung root.'],
    ['Which structure crosses superiorly at the left root?', 'Left pulmonary artery', 'Left inferior pulmonary vein', 'Azygos vein', 'Right pulmonary artery', 'At the left hilum, the left pulmonary artery is superior to the left main bronchus.'],
  ]),
};

function segment(side, lobe, label, number, location, detail) {
  const name = `${label} segment of the ${side} ${lobe} lobe`;
  const bronchus = `B${number}`;
  const otherNumbers = [1, 3, 6, 10].filter(n => n !== number).slice(0, 3);
  return card(name, {
    definition: [`Bronchopulmonary territory S${number} of the ${side} ${lobe} lobe, ventilated through ${bronchus}.`],
    location: [location],
    course: [`Its segmental airway arises from the ${lobe} lobar bronchial tree and arborizes within the segment.`],
    supply: [`A${number} denotes the corresponding pulmonary arterial supply. Pulmonary venous branches often mark intersegmental planes.`],
    [detail.section]: [detail.bullet],
    imaging: ['On thin-section CT, trace the segmental bronchus and accompanying pulmonary artery from the hilum.'],
  }, [
    [`Which bronchial designation identifies the ${name}?`, bronchus, ...otherNumbers.map(n => `B${n}`), `${bronchus} supplies the ${name}.`],
    detail.question,
  ]);
}

function segmentDetail(section, bullet, question, correct, wrong1, wrong2, wrong3, why = bullet) {
  return { section, bullet, question: [question, correct, wrong1, wrong2, wrong3, why] };
}

const lungSegments = {
  sd_apical: segment('right', 'upper', 'apical', 1, 'Extends superiorly from the hilum toward the thoracic inlet.',
    segmentDetail('relations', 'The apex is covered by cervical pleura and lies close to the subclavian vessels.',
      'Which pleural region covers its superior tip?', 'Cervical pleura', 'Diaphragmatic pleura', 'Costodiaphragmatic recess', 'Pulmonary ligament')),
  sd_post: segment('right', 'upper', 'posterior', 2, 'Occupies the dorsal upper lobe, superior to the oblique fissure.',
    segmentDetail('clinical', 'The posterior upper lobe and superior lower lobe are dependent when supine and are common sites of aspiration.',
      'Which position makes this segment dependent?', 'Supine', 'Upright', 'Prone', 'Standing with arms raised')),
  sd_ant: segment('right', 'upper', 'anterior', 3, 'Occupies the ventral upper lobe against the anterior chest wall.',
    segmentDetail('relations', 'The horizontal fissure separates it inferiorly from the right middle lobe.',
      'Which fissure separates it from the middle lobe?', 'Horizontal fissure', 'Left oblique fissure', 'Azygos fissure', 'Right oblique fissure')),
  sd_lat: segment('right', 'middle', 'lateral', 4, 'Extends toward the anterolateral chest wall between the horizontal and oblique fissures.',
    segmentDetail('clinical', 'Obstruction of the middle lobar bronchus can collapse both middle lobe segments.',
      'Which neighboring segment shares the middle lobar bronchus?', 'Medial middle lobe', 'Medial basal', 'Anterior upper lobe', 'Superior lower lobe',
      'Both lateral B4 and medial B5 arise from the right middle lobar bronchus.')),
  sd_med: segment('right', 'middle', 'medial', 5, 'Occupies the medial middle lobe next to the right cardiac border.',
    segmentDetail('clinical', 'Consolidation abutting the right atrium can obscure the right heart border on frontal radiography.',
      'Which radiographic contour can be lost?', 'Right heart border', 'Left heart border', 'Aortic knob', 'Descending aortic stripe')),
  sd_sup: segment('right', 'lower', 'superior', 6, 'Lies posteriorly, superior to the basal segments and inferior to the oblique fissure.',
    segmentDetail('clinical', 'The superior lower lobe is a dependent region during supine aspiration.',
      'Which other region is commonly dependent in supine aspiration?', 'Posterior upper lobe', 'Anterior upper lobe', 'Medial middle lobe', 'Lingula',
      'The posterior upper lobe and superior lower lobe are both dependent in the supine position.')),
  sd_bmed: segment('right', 'lower', 'medial basal', 7, 'Occupies the mediastinal aspect of the lower lobe base.',
    segmentDetail('relations', 'It lies near the inferior vena cava and medial diaphragm. A distinct B7 is usual on the right.',
      'Which left basal bronchus commonly shares its counterpart’s stem?', 'B8', 'B4', 'B6', 'B10',
      'Left B7 and B8 are commonly combined as an anteromedial basal bronchus.')),
  sd_bant: segment('right', 'lower', 'anterior basal', 8, 'Occupies the anterior portion of the right lower lobe base.',
    segmentDetail('relations', 'The oblique fissure separates it from the middle lobe anteriorly.',
      'Which fissure separates it from the middle lobe?', 'Oblique fissure', 'Horizontal fissure', 'Azygos fissure', 'Accessory superior fissure')),
  sd_blat: segment('right', 'lower', 'lateral basal', 9, 'Extends from the basal bronchial tree toward the lateral costophrenic region.',
    segmentDetail('relations', 'It lies lateral to the medial basal segment and contacts lateral costal and diaphragmatic surfaces.',
      'Which surface does this segment reach laterally?', 'Costal surface near the base', 'Cervical pleura at the apex', 'Anterior cardiac notch', 'Mediastinal surface at the carina')),
  sd_bpost: segment('right', 'lower', 'posterior basal', 10, 'Extends toward the posterior diaphragm and posterior costophrenic region.',
    segmentDetail('clinical', 'Basal lower lobe segments are common sites of aspiration in upright patients.',
      'Which posture favors aspiration into basal lower lobe segments?', 'Upright', 'Strictly supine', 'Head-down', 'Prone with hips elevated')),
  se_apical: segment('left', 'upper', 'apical', 1, 'Represents the apical territory of the left upper division.',
    segmentDetail('internal', 'B1 and B2 usually share an apicoposterior stem, designated B1+2.',
      'Which bronchus usually shares its stem?', 'B2', 'B3', 'B4', 'B6')),
  se_post: segment('left', 'upper', 'posterior', 2, 'Represents the posterior territory of the left upper division, superior to the oblique fissure.',
    segmentDetail('internal', 'The posterior component commonly shares a stem with B1 in the apicoposterior segment.',
      'What is the combined apicoposterior bronchus called?', 'B1+2', 'B2+3', 'B4+5', 'B7+8')),
  se_ant: segment('left', 'upper', 'anterior', 3, 'Occupies the ventral upper division superior to the lingula.',
    segmentDetail('relations', 'It sits anterior to the apicoposterior territory and superior to the lingular segments.',
      'Which left upper lobe region lies inferior to it?', 'Lingula', 'Apicoposterior territory', 'Right middle lobe', 'Superior lower lobe')),
  se_lsup: segment('left', 'upper', 'superior lingular', 4, 'Occupies the upper part of the lingula beneath the anterior upper division.',
    segmentDetail('relations', 'The lingula lies inferior to the cardiac notch and corresponds to the right middle lobe.',
      'What is the right-sided counterpart of the lingula?', 'Middle lobe', 'Upper lobe apex', 'Superior segment of lower lobe', 'Entire lower lobe')),
  se_linf: segment('left', 'upper', 'inferior lingular', 5, 'Forms the lower tip of the lingula along the left cardiac contour.',
    segmentDetail('clinical', 'Lingular consolidation abutting the heart can erase the left heart border on frontal radiography.',
      'Which contour may disappear with lingular consolidation?', 'Left heart border', 'Right heart border', 'Azygos arch', 'Aortic knob')),
  se_sup: segment('left', 'lower', 'superior', 6, 'Projects posteriorly, superior to the basal segments and inferior to the oblique fissure.',
    segmentDetail('relations', 'B6 usually arises posteriorly from the lower lobar bronchus before division of the basal bronchial trunk.',
      'Which direction does B6 typically take?', 'Posterior', 'Directly anterior', 'Toward the lingula', 'Across the mediastinum')),
  se_bmed: segment('left', 'lower', 'medial basal', 7, 'Represents the mediastinal basal territory of the left lower lobe.',
    segmentDetail('internal', 'A distinct B7 is variable. It commonly combines with B8 as an anteromedial basal bronchus.',
      'Which branch commonly combines with B7?', 'B8', 'B6', 'B9', 'B10')),
  se_bant: segment('left', 'lower', 'anterior basal', 8, 'Occupies the anterior lower lobe base, posterior to the lingula across the oblique fissure.',
    segmentDetail('internal', 'B8 commonly shares a stem with B7, forming the anteromedial basal bronchus.',
      'How is the common left anteromedial basal stem designated?', 'B7+8', 'B8+9', 'B6+8', 'B4+5')),
  se_blat: segment('left', 'lower', 'lateral basal', 9, 'Reaches the lateral lower chest wall and lateral diaphragmatic dome.',
    segmentDetail('relations', 'It occupies the lateral base between anterior and posterior basal territories.',
      'Which neighboring basal territory lies posteriorly?', 'Posterior basal', 'Superior lingular', 'Apicoposterior', 'Inferior lingular')),
  se_bpost: segment('left', 'lower', 'posterior basal', 10, 'Occupies the dorsal base posterior to the other basal territories.',
    segmentDetail('relations', 'Its peripheral surface reaches the posterior diaphragm and posterior costodiaphragmatic recess region.',
      'Which pleural recess lies deep to the posterior costophrenic angle?', 'Costodiaphragmatic recess', 'Costomediastinal recess', 'Oblique pericardial sinus', 'Transverse pericardial sinus')),
};

function internalThoracicArtery(side, relation) {
  const name = `${side} internal thoracic artery`;
  return card(name, {
    definition: ['Branch of the first part of the subclavian artery supplying the anterior thoracic and upper abdominal walls.'],
    course: ['Descends vertically behind the costal cartilages, about 1–2 cm lateral to the sternal edge, and ends near the sixth intercostal space.'],
    relations: [relation],
    branches: ['Gives anterior intercostal, perforating, musculophrenic and superior epigastric branches.'],
    clinical: ['The left internal thoracic artery is a preferred coronary bypass conduit because of its long-term patency.'],
    imaging: ['CT angiography and selective angiography show its origin, course and intercostal branches.'],
  }, [
    [`Which vessel gives rise to the ${name}?`, 'Subclavian artery', 'Axillary artery', 'Descending thoracic aorta', 'Brachiocephalic trunk', 'The internal thoracic artery arises from the first part of the subclavian artery.'],
    ['Which terminal branch continues onto the abdominal wall?', 'Superior epigastric artery', 'Inferior epigastric artery', 'Musculophrenic artery', 'Pericardiophrenic artery', 'The superior epigastric artery is the medial terminal continuation; the musculophrenic artery is the lateral one.'],
  ]);
}

function internalThoracicVein(side, relation) {
  const name = `${side} internal thoracic vein`;
  return card(name, {
    definition: ['Venous companion of the internal thoracic artery draining the anterior thoracic wall.'],
    course: ['Ascends behind the costal cartilages beside the internal thoracic artery.'],
    relations: [relation],
    branches: ['Receives anterior intercostal, perforating, musculophrenic and superior epigastric tributaries.'],
    clinical: ['It is a route for collateral venous return when the superior vena cava is obstructed.'],
    imaging: ['Contrast CT shows the vein beside the artery in the anterior mediastinum.'],
  }, [
    [`What is the usual destination of the ${name}?`, 'Brachiocephalic vein', 'Superior vena cava directly', 'Azygos vein', 'Coronary sinus', 'The internal thoracic vein usually ends in the brachiocephalic vein.'],
    ['Which veins does it receive from the chest wall?', 'Anterior intercostal veins', 'Posterior intercostal veins', 'Bronchial veins', 'Esophageal veins', 'Anterior intercostal veins drain into the internal thoracic veins.'],
  ]);
}

function posteriorIntercostal(side, number, origin, relation) {
  const name = `${side} ${number} posterior intercostal artery`;
  return card(name, {
    definition: ['Arterial supply to the chest wall and parietal pleura in an upper posterior intercostal space.'],
    course: ['Passes laterally between the pleura and the internal intercostal membrane, then runs in the intercostal groove.'],
    relations: [relation],
    branches: ['Gives muscular, pleural, cutaneous and collateral branches.'],
    clinical: ['Intercostal vessels are at risk during thoracocentesis and chest drain insertion.'],
    imaging: ['CT angiography and intercostal angiography show the vessel and its collateral channels.'],
  }, [
    [`What is the usual origin of the ${name}?`, origin, 'Descending thoracic aorta', 'Internal thoracic artery', 'Azygos vein', `The ${name} usually arises from the ${origin}.`],
    ['Where does it run in the intercostal space?', 'Between pleura and internal intercostal membrane', 'Superficial to the external intercostal muscle', 'Within the thoracic duct', 'Anterior to the sternum', 'The posterior intercostal vessels lie deep to the pleura in the intercostal groove.'],
  ]);
}

function anteriorIntercostalVeins(side) {
  const name = `${side} anterior intercostal veins`;
  return card(name, {
    definition: ['Venous drainage of the anterior intercostal spaces into the internal thoracic system.'],
    course: ['Run with the anterior intercostal arteries between the internal intercostal and innermost intercostal muscles.'],
    relations: ['The internal thoracic vein lies medial to the corresponding artery behind the costal cartilages.'],
    branches: ['Receive muscular and pleural tributaries and anastomose with posterior intercostal veins.'],
    clinical: ['They provide a collateral route between the caval and azygos systems.'],
    imaging: ['CT venography can show enlarged collateral anterior intercostal veins.'],
  }, [
    [`Which vein receives the ${name}?`, 'Internal thoracic vein', 'Azygos vein', 'Hemiazygos vein', 'Coronary sinus', 'Anterior intercostal veins drain into the internal thoracic vein.'],
    ['With which vessels do they anastomose posteriorly?', 'Posterior intercostal veins', 'Pulmonary veins', 'Bronchial veins', 'Esophageal veins', 'Anterior and posterior intercostal veins anastomose around the chest wall.'],
  ]);
}

function inferiorPhrenicArtery(side, relation) {
  const name = `${side} inferior phrenic artery`;
  return card(name, {
    definition: ['Paired artery from the abdominal aorta supplying the inferior surface of the diaphragm.'],
    course: ['Arises below the diaphragm, ascends onto its inferior surface and divides into medial and lateral branches.'],
    relations: [relation],
    branches: ['Gives superior suprarenal branches and anastomoses with lower intercostal and musculophrenic arteries.'],
    clinical: ['It can supply collateral flow to the diaphragm after internal thoracic artery harvest.'],
    imaging: ['CTA defines its origin and its relationship to the crus and adrenal gland.'],
  }, [
    [`What is the usual origin of the ${name}?`, 'Abdominal aorta', 'Descending thoracic aorta', 'Celiac trunk', 'Internal thoracic artery', 'The inferior phrenic arteries usually arise from the abdominal aorta just below the diaphragm.'],
    ['Which gland receives its superior branches?', 'Suprarenal gland', 'Thyroid gland', 'Thymus', 'Pancreas', 'Superior suprarenal arteries arise from the inferior phrenic arteries.'],
  ]);
}

const mediastinum = {
  diafragma: card('diaphragm', {
    definition: ['Musculotendinous dome separating the thoracic and abdominal cavities and the principal muscle of inspiration.'],
    location: ['Attaches to the xiphoid process, lower six costal cartilages and L1–L3 through its crura.'],
    relations: ['The right crus surrounds the esophageal hiatus. The aortic hiatus lies behind the diaphragm at T12.'],
    supply: ['Phrenic nerves (C3–C5) provide motor supply; lower intercostal nerves carry peripheral sensation.'],
    clinical: ['Paralysis elevates the affected hemidiaphragm. Hiccups reflect reflex phrenic irritation.'],
    imaging: ['Chest radiography shows the domes; ultrasound assesses excursion during breathing.'],
  }, [
    ['At which level does the esophagus cross the diaphragm?', 'T10', 'T8', 'T12', 'L1', 'The esophageal hiatus lies at T10, between the caval and aortic openings.'],
    ['Which nerve provides its motor supply?', 'Phrenic nerve', 'Vagus nerve', 'Intercostal nerve', 'Recurrent laryngeal nerve', 'The phrenic nerve (C3–C5) supplies the diaphragm.'],
  ]),
  eso_art: card('esophageal artery', {
    definition: ['Small aortic branch supplying the thoracic esophagus.'],
    course: ['Arises from the descending thoracic aorta and passes to the esophageal wall.'],
    relations: ['Branches reach the esophagus between the aorta and the left atrium.'],
    supply: ['Supplies the thoracic esophagus and anastomoses with inferior thyroid and left gastric branches.'],
    clinical: ['Submucosal anastomoses permit collateral flow but also form varices in portal hypertension.'],
    imaging: ['CT angiography can show enlarged esophageal branches in portal hypertension.'],
  }, [
    ['Which vessel usually gives the esophageal arteries?', 'Descending thoracic aorta', 'Ascending aorta', 'Internal thoracic artery', 'Pulmonary trunk', 'Thoracic esophageal arteries usually arise from the descending thoracic aorta.'],
    ['With which gastric artery do they anastomose?', 'Left gastric artery', 'Right gastric artery', 'Gastroduodenal artery', 'Splenic artery', 'Esophageal branches anastomose with left gastric branches at the cardia.'],
  ]),
  azigo_acs: card('accessory hemiazygos vein', {
    definition: ['Upper left paravertebral vein of the azygos system.'],
    course: ['Descends on the left side of the thoracic vertebrae and crosses to the azygos vein near T8.'],
    relations: ['Lies posterior to the descending thoracic aorta and esophagus at its crossing.'],
    branches: ['Receives left 4th–8th posterior intercostal veins and mediastinal tributaries.'],
    clinical: ['It enlarges as a collateral channel in caval obstruction.'],
    imaging: ['Contrast CT distinguishes it from paravertebral lymph nodes and the hemiazygos vein.'],
  }, [
    ['Where does it usually join the azygos system?', 'Near T8', 'At T4', 'At T12', 'At the left brachiocephalic vein', 'The accessory hemiazygos crosses to the azygos around T8.'],
    ['Which spaces does it principally drain?', 'Left 4th–8th posterior intercostal spaces', 'Right 1st–3rd posterior intercostal spaces', 'Anterior intercostal spaces', 'Left upper limb', 'It receives the middle left posterior intercostal veins.'],
  ]),
  ita_d: internalThoracicArtery('right', 'Lies behind the right costal cartilages, lateral to the right sternal edge.'),
  ita_e: internalThoracicArtery('left', 'Lies behind the left costal cartilages, lateral to the left sternal edge.'),
  itv_d: internalThoracicVein('right', 'Accompanies the right internal thoracic artery and drains into the right brachiocephalic vein.'),
  itv_e: internalThoracicVein('left', 'Accompanies the left internal thoracic artery and drains into the left brachiocephalic vein.'),
  pica_d1: posteriorIntercostal('right', 'first', 'costocervical trunk', 'The first posterior intercostal artery usually arises from the supreme intercostal branch of the costocervical trunk.'),
  pica_e1: posteriorIntercostal('left', 'first', 'costocervical trunk', 'The first posterior intercostal artery usually arises from the supreme intercostal branch of the costocervical trunk.'),
  pica_d2: posteriorIntercostal('right', 'second', 'costocervical trunk', 'The second posterior intercostal artery usually arises from the superior intercostal branch of the costocervical trunk.'),
  pica_e2: posteriorIntercostal('left', 'second', 'costocervical trunk', 'The second posterior intercostal artery usually arises from the superior intercostal branch of the costocervical trunk.'),
  pica_sup_d: card('right superior intercostal artery', {
    definition: ['Branch of the costocervical trunk supplying the upper right posterior intercostal spaces.'],
    course: ['Descends from the costocervical trunk in the upper posterior thorax and gives the first and second posterior intercostal arteries.'],
    relations: ['Lies posterior to the pleura and anterior to the necks of the upper ribs.'],
    branches: ['Gives posterior intercostal branches and muscular and pleural twigs.'],
    clinical: ['It can contribute collateral flow to the arm and chest wall.'],
    imaging: ['Selective subclavian angiography shows its origin and descending course.'],
  }, [
    ['Which trunk gives rise to it?', 'Costocervical trunk', 'Thyrocervical trunk', 'Cervical trunk of the subclavian', 'Descending thoracic aorta', 'The superior intercostal artery arises from the costocervical trunk.'],
    ['Which spaces does it supply?', 'Upper posterior intercostal spaces', 'Lower anterior intercostal spaces', 'Anterior mediastinum', 'Upper abdominal wall', 'It supplies the first and second posterior intercostal spaces.'],
  ]),
  pica_sup_e: card('left superior intercostal artery', {
    definition: ['Branch of the costocervical trunk supplying the upper left posterior intercostal spaces.'],
    course: ['Descends from the costocervical trunk in the upper posterior thorax and gives the first and second posterior intercostal arteries.'],
    relations: ['Lies posterior to the pleura and anterior to the necks of the upper ribs.'],
    branches: ['Gives posterior intercostal branches and muscular and pleural twigs.'],
    clinical: ['It can contribute collateral flow to the arm and chest wall.'],
    imaging: ['Selective subclavian angiography shows its origin and descending course.'],
  }, [
    ['Which trunk gives rise to it?', 'Costocervical trunk', 'Thyrocervical trunk', 'Cervical trunk of the subclavian', 'Descending thoracic aorta', 'The superior intercostal artery arises from the costocervical trunk.'],
    ['Which spaces does it supply?', 'Upper posterior intercostal spaces', 'Lower anterior intercostal spaces', 'Anterior mediastinum', 'Upper abdominal wall', 'It supplies the first and second posterior intercostal spaces.'],
  ]),
  icv_ant_d: anteriorIntercostalVeins('right'),
  icv_ant_e: anteriorIntercostalVeins('left'),
  phren_inf_a_d: inferiorPhrenicArtery('right', 'Passes behind the inferior vena cava on the right.'),
  phren_inf_a_e: inferiorPhrenicArtery('left', 'Passes behind the esophagus on the left.'),
  phren_inf_v: card('inferior phrenic veins', {
    definition: ['Venous channels draining the inferior surface of the diaphragm.'],
    course: ['Accompany the inferior phrenic arteries along the diaphragmatic crura.'],
    relations: ['The right vein runs beside the inferior vena cava; the left lies near the left suprarenal gland.'],
    branches: ['Receive diaphragmatic and suprarenal tributaries.'],
    clinical: ['They provide a collateral route between the caval and portal systems.'],
    imaging: ['Contrast CT shows them as small enhancing veins along the diaphragmatic crura.'],
  }, [
    ['Where does the right inferior phrenic vein usually drain?', 'Inferior vena cava', 'Azygos vein', 'Left renal vein', 'Hepatic portal vein', 'The right inferior phrenic vein usually enters the inferior vena cava.'],
    ['Which artery do these veins accompany?', 'Inferior phrenic artery', 'Superior phrenic artery', 'Internal thoracic artery', 'Celiac trunk', 'The veins follow the inferior phrenic arteries.'],
  ]),
  phren_sup_v: card('superior phrenic veins', {
    definition: ['Small veins draining the superior surface of the diaphragm.'],
    course: ['Accompany the superior phrenic arteries from the thoracic aorta.'],
    relations: ['Run between the diaphragm and the pericardium.'],
    branches: ['Drain into pericardiophrenic and internal thoracic veins.'],
    clinical: ['They form part of the collateral venous channels of the diaphragm.'],
    imaging: ['CT shows small veins along the superior diaphragmatic surface.'],
  }, [
    ['Which venous system receives these veins?', 'Internal thoracic system', 'Azygos system', 'Portal system', 'Coronary sinus', 'Superior phrenic veins drain toward the internal thoracic and pericardiophrenic veins.'],
    ['Which arteries do they accompany?', 'Superior phrenic arteries', 'Inferior phrenic arteries', 'Intercostal arteries', 'Bronchial arteries', 'They follow the superior phrenic arteries.'],
  ]),
  manubrio: card('manubrium', {
    definition: ['Superior segment of the sternum.'],
    location: ['Lies at the thoracic inlet between the clavicular notches.'],
    relations: ['Articulates with both clavicles and the first costal cartilages. Its lower border forms the sternal angle with the sternal body.'],
    clinical: ['The jugular notch is a surface landmark for the trachea and superior mediastinum.'],
    imaging: ['Lateral chest radiography and CT show its relation to the great vessels.'],
  }, [
    ['Which ribs articulate directly with the manubrium?', 'First ribs', 'Second ribs', 'Third ribs', 'Fourth ribs', 'The first costal cartilages articulate with the manubrium.'],
    ['What does its lower border form with the sternal body?', 'Sternal angle', 'Xiphisternal joint', 'Costal margin', 'Jugular notch', 'The manubriosternal joint forms the sternal angle at T4–T5.'],
  ]),
  esterno: card('body of the sternum', {
    definition: ['Long flat middle segment of the sternum.'],
    location: ['Extends from the sternal angle to the xiphisternal joint.'],
    relations: ['Its lateral costal notches receive costal cartilages 2–7.'],
    clinical: ['Sternal fractures may injure the underlying right ventricle or great vessels.'],
    imaging: ['Lateral radiography and CT show the sternal body and retrosternal space.'],
  }, [
    ['Which costal cartilages articulate with its lateral borders?', 'Second through seventh', 'First through fourth', 'Eighth through tenth', 'Eleventh and twelfth', 'The sternal body receives costal cartilages 2–7.'],
    ['Which chamber lies directly behind it?', 'Right ventricle', 'Left atrium', 'Descending aorta', 'Esophagus', 'The right ventricle is the most anterior cardiac chamber behind the lower sternum.'],
  ]),
  xifoide: card('xiphoid process', {
    definition: ['Small inferior cartilaginous or bony tip of the sternum.'],
    location: ['Lies at the xiphisternal joint near the T9 level.'],
    relations: ['Receives the costal margins and attachments of the diaphragm and rectus sheath.'],
    clinical: ['Chest compressions are delivered on the lower sternum, avoiding direct pressure on the xiphoid.'],
    imaging: ['Its ossification and shape vary widely on radiographs and CT.'],
  }, [
    ['At which vertebral level does it lie?', 'T9', 'T4', 'T12', 'L1', 'The xiphisternal joint lies near the T9 level.'],
    ['Which muscle attaches to it?', 'Diaphragm', 'Serratus anterior', 'Trapezius', 'Latissimus dorsi', 'The diaphragm attaches to the xiphoid process.'],
  ]),
  claviculas: card('clavicles', {
    definition: ['Paired S-shaped bones connecting the upper limb to the axial skeleton.'],
    location: ['Lie subcutaneously at the thoracic inlet, from manubrium to acromion.'],
    relations: ['The subclavian vessels and brachial plexus pass posterior to the middle third.'],
    clinical: ['Fractures commonly occur at the junction of the middle and lateral thirds and may injure underlying vessels.'],
    imaging: ['AP radiography shows the clavicle; CT defines displaced fragments and vascular relations.'],
  }, [
    ['What does the lateral end articulate with?', 'Acromion', 'Manubrium', 'Glenoid fossa', 'First rib', 'The lateral clavicle articulates with the acromion at the acromioclavicular joint.'],
    ['Which vessels pass behind its middle third?', 'Subclavian vessels', 'Internal jugular vessels', 'Axillary vessels', 'Vertebral vessels', 'The subclavian artery and vein pass behind the clavicle.'],
  ]),
  cart_costais: card('costal cartilages', {
    definition: ['Hyaline cartilage bars connecting ribs to the sternum or costal margin.'],
    location: ['Extend from the anterior ends of ribs 1–10 toward the sternum or costal margin.'],
    relations: ['Ribs 1–7 articulate directly with the sternum; ribs 8–10 join the costal margin.'],
    clinical: ['They provide chest wall elasticity but calcify with age, reducing compliance.'],
    imaging: ['Chest radiography shows calcification; CT distinguishes cartilage from soft tissue.'],
  }, [
    ['Which ribs connect directly to the sternum?', 'First through seventh', 'First through tenth', 'Eighth through tenth', 'Eleventh and twelfth', 'True ribs 1–7 have direct sternal cartilages.'],
    ['What do the cartilages of ribs 8–10 form?', 'Costal margin', 'Sternal angle', 'Jugular notch', 'Xiphisternal joint', 'Ribs 8–10 join the costal margin above the lowest rib.'],
  ]),
  costela_1: card('first rib', {
    definition: ['Short, broad first true rib at the thoracic inlet.'],
    location: ['Curves sharply from T1 to the manubrium.'],
    relations: ['The scalene tubercle separates grooves for the subclavian vein and artery.'],
    clinical: ['A cervical rib or first-rib anomaly can compress the brachial plexus or subclavian vessels.'],
    imaging: ['Chest radiography and CT show its grooves and the thoracic inlet.'],
  }, [
    ['Which groove lies anterior to the scalene tubercle?', 'Subclavian vein groove', 'Subclavian artery groove', 'Vertebral artery groove', 'Aortic groove', 'The subclavian vein lies anterior to the anterior scalene insertion; the artery lies behind it.'],
    ['Which vertebra does it articulate with?', 'T1', 'T2', 'C7', 'T3', 'The first rib articulates with T1 and the manubrium.'],
  ]),
  costela_2: card('second rib', {
    definition: ['Typical true rib whose cartilage marks the sternal angle.'],
    location: ['Curves from T2 to the sternal body.'],
    relations: ['The second intercostal space is a standard auscultation landmark.'],
    clinical: ['The second rib is a reference for counting intercostal spaces.'],
    imaging: ['Chest radiography shows its posterior and anterior arcs.'],
  }, [
    ['Which surface landmark does its cartilage mark?', 'Sternal angle', 'Xiphisternal joint', 'Jugular notch', 'Costal margin', 'The second costal cartilage marks the sternal angle.'],
    ['Which vertebra does it articulate with?', 'T2', 'T1', 'T3', 'T4', 'The second rib articulates with T2.'],
  ]),
  costela_4: card('fourth rib', {
    definition: ['Typical mid-thoracic true rib.'],
    location: ['Curves from T4 to the sternal body.'],
    relations: ['The fourth intercostal space is used for chest drain insertion in the midaxillary line.'],
    clinical: ['Rib fractures here may injure the lung and pleura.'],
    imaging: ['Chest radiography and CT show fractures and underlying lung injury.'],
  }, [
    ['Which vertebra does it articulate with?', 'T4', 'T2', 'T6', 'T8', 'The fourth rib articulates with T4.'],
    ['Which procedure commonly uses the fourth intercostal space?', 'Chest drain insertion', 'Pericardiocentesis', 'Tracheostomy', 'Lumbar puncture', 'Midaxillary chest drains are often placed in the fourth or fifth intercostal space.'],
  ]),
  costela_5: card('fifth rib', {
    definition: ['Typical lower true rib at the level of the cardiac apex.'],
    location: ['Curves from T5 to the sternal body.'],
    relations: ['The fifth intercostal space near the midclavicular line overlies the apex beat.'],
    clinical: ['Fractures of the middle ribs are common after blunt trauma.'],
    imaging: ['Chest radiography and CT show fractures and associated pneumothorax.'],
  }, [
    ['Which surface landmark lies at its level?', 'Cardiac apex', 'Sternal angle', 'Jugular notch', 'Xiphisternal joint', 'The cardiac apex lies near the fifth intercostal space at the midclavicular line.'],
    ['Which vertebra does it articulate with?', 'T5', 'T3', 'T7', 'T9', 'The fifth rib articulates with T5.'],
  ]),
  costelas_rest: card('ribs 3 and 6–12', {
    definition: ['Remaining ribs completing the lateral and posterior thoracic cage.'],
    location: ['Ribs 3–9 are typical; ribs 8–10 join the costal margin; ribs 11–12 are floating.'],
    relations: ['They protect the lungs, pleura and upper abdominal organs.'],
    clinical: ['Lower rib fractures may injure the liver, spleen or kidneys.'],
    imaging: ['Chest radiography and CT assess fractures and underlying organ injury.'],
  }, [
    ['Which ribs are floating?', 'Eleventh and twelfth', 'First and second', 'Eighth and ninth', 'Third and fourth', 'Ribs 11–12 have no anterior costal cartilage attachment.'],
    ['Which ribs are typical?', 'Third through ninth', 'First through twelfth', 'Only the first two', 'Only the last two', 'Ribs 3–9 share the typical head, neck, tubercle and angle.'],
  ]),
  vertebras_toracicas: card('thoracic vertebrae', {
    definition: ['Twelve vertebrae forming the posterior wall of the thorax.'],
    location: ['Extend from T1 to T12 between the cervical and lumbar spine.'],
    relations: ['T1–T10 carry costal demifacets; T11–T12 have single costal facets.'],
    clinical: ['Osteoporotic compression fractures contribute to thoracic kyphosis.'],
    imaging: ['CT and MRI show vertebral bodies, facets and the spinal canal.'],
  }, [
    ['Which vertebrae bear costal facets?', 'All thoracic vertebrae', 'Only T1–T6', 'Only T10–T12', 'Only T1–T4', 'All twelve thoracic vertebrae bear costal facets, though their arrangement differs.'],
    ['What does the thoracic spine normally form?', 'Kyphosis', 'Lordosis', 'Scoliosis', 'No curve', 'The thoracic spine has a normal kyphotic curve.'],
  ]),
};

export const CONTENT = {
  ...chambers,
  ...valves,
  ...coronaryArteries,
  ...cardiacVeins,
  ...greatVessels,
  ...airways,
  ...lungSegments,
  ...mediastinum,
};

const clinicalFollowups = {
  ad: {
    q: 'Which route can an embolus take if right atrial pressure transiently exceeds left atrial pressure in a patient with a patent foramen ovale?',
    a: 'It can cross into the left atrium and enter the systemic circulation.',
  },
  ae: {
    q: 'Why can left atrial enlargement cause dysphagia?',
    a: 'The enlarged atrium can compress the esophagus immediately posterior to the pericardium.',
  },
  paredev: {
    q: 'Which wall layer is most vulnerable during reduced coronary perfusion?',
    a: 'Subendocardial myocardium is especially vulnerable because systolic compression is greatest there.',
  },
  vd: {
    q: 'Why can a proximal RCA infarct produce jugular venous distension?',
    a: 'Ischemic right ventricular dysfunction raises right atrial and systemic venous pressures.',
  },
  ve: {
    q: 'Why can ischemia cause mitral regurgitation with intact chordae?',
    a: 'Regional ventricular remodeling can displace papillary muscles and tether the leaflets.',
  },
  tri_ant: {
    q: 'What happens when anterior leaflet chordae rupture?',
    a: 'The unsupported leaflet can become flail and permit systolic regurgitation into the right atrium.',
  },
  tri_post: {
    q: 'How can posterior leaflet anatomy vary?',
    a: 'The posterior leaflet region can have multiple scallops separated by indentations.',
  },
  tri_sep: {
    q: 'Which conduction structure is at risk near the anteroseptal commissure?',
    a: 'The penetrating His bundle lies close to the membranous septum and septal leaflet attachment.',
  },
  mit_ant: {
    q: 'How can systolic anterior motion of this leaflet affect outflow?',
    a: 'It can narrow the left ventricular outflow tract and impair mitral coaptation.',
  },
  mit_post: {
    q: 'What jet direction is typical with a flail posterior leaflet?',
    a: 'The regurgitant jet often points anteriorly, away from the flail leaflet.',
  },
  pulm_ant_d: {
    q: 'What happens to the RV if pulmonary cusps become fused at their commissures?',
    a: 'The obstructed outflow increases RV pressure load and can cause hypertrophy.',
  },
  pulm_ant_e: {
    q: 'Why may cusp malcoaptation dilate the RV?',
    a: 'Diastolic backflow from the pulmonary trunk increases RV volume load.',
  },
  pulm_post: {
    q: 'Can this cusp prolapse if a chorda ruptures?',
    a: 'Pulmonary cusps lack chordae. Their competence depends on cusp geometry, commissures and root dimensions.',
  },
  ao_ant: {
    q: 'Which cusp fusion pattern is common in bicuspid aortic valves?',
    a: 'Fusion of the right and left coronary cusps is common.',
  },
  ao_post_e: {
    q: 'Why assess left coronary ostial height before transcatheter valve replacement?',
    a: 'Displacement of the native cusp can obstruct a low left coronary ostium.',
  },
  ao_post_d: {
    q: 'Which conduction structure lies near the commissure between the right and noncoronary cusps?',
    a: 'The penetrating His bundle lies near the adjacent membranous septum.',
  },
  pap_vd_ant: {
    q: 'What else can be injured when the moderator band is divided?',
    a: 'Right bundle branch fibers travel within it toward the anterior papillary muscle.',
  },
  pap_vd_post: {
    q: 'Can the posterior papillary muscle support more than one leaflet?',
    a: 'Its chordae commonly support adjacent anterior and posterior tricuspid leaflet margins.',
  },
  pap_vd_sep: {
    q: 'How can septal leaflet support vary if septal papillary muscles are small or absent?',
    a: 'Some chordae arise directly from the interventricular septum.',
  },
  pap_ve_al: {
    q: 'Why is rupture less common here than in the posteromedial group?',
    a: 'The anterolateral group commonly receives both diagonal and circumflex arterial supply.',
  },
  acd: {
    q: 'How does left dominance affect the inferior LV territory at risk from RCA occlusion?',
    a: 'The circumflex supplies the posterior interventricular artery, limiting the inferior LV territory usually dependent on the RCA.',
  },
  tce: {
    q: 'What is a ramus intermedius?',
    a: 'An additional branch between the LAD and circumflex that can supply part of the anterolateral LV.',
  },
  dae: {
    q: 'What is a wraparound LAD?',
    a: 'An LAD that curves around the apex and supplies a variable portion of the apical inferior LV.',
  },
  diag: {
    q: 'How would you distinguish a diagonal branch from a septal perforator on angiography?',
    a: 'A diagonal runs over the anterolateral LV surface. A septal perforator dives into the interventricular septum.',
  },
  vent_ant_d_dae: {
    q: 'Can LAD occlusion affect the right ventricle?',
    a: 'It can compromise the anterior RV territory supplied by LAD branches.',
  },
  cone_e: {
    q: 'What happens to conal perfusion if its branch arises proximal to an LAD occlusion?',
    a: 'Flow can persist in that conal branch if its origin remains upstream and patent.',
  },
  sept_da: {
    q: 'Why can first septal perforator injury disturb conduction?',
    a: 'Anterior septal ischemia can involve the His–Purkinje system and produce bundle branch block.',
  },
  sept_dp: {
    q: 'How does left dominance change the upstream source of posterior septal perfusion?',
    a: 'The posterior septal perforators arise from the circumflex-derived posterior interventricular artery.',
  },
  cx: {
    q: 'How does left dominance change the territory threatened by proximal circumflex occlusion?',
    a: 'It can add inferior ventricular and posterior septal ischemia to the lateral LV territory.',
  },
  marg_d: {
    q: 'Does a large right marginal artery establish right dominance?',
    a: 'Dominance depends principally on the origin of the posterior interventricular artery.',
  },
  vent_ant_acd: {
    q: 'Why can distal RCA occlusion spare anterior RV perfusion?',
    a: 'A distal lesion may lie beyond the origins of the anterior RV branches.',
  },
  dp: {
    q: 'How can a dominant PDA be distinguished from a wraparound LAD?',
    a: 'Trace the PDA from the crux into the posterior interventricular groove. A wraparound LAD reaches the inferior surface by crossing the apex.',
  },
  vent_post_acd: {
    q: 'Can the RCA give posterolateral branches when the circumflex supplies part of the same surface?',
    a: 'Yes. In shared posterior supply, both arteries can contribute to the inferoposterior LV.',
  },
  seio: {
    q: 'How does a persistent left superior vena cava alter the coronary sinus?',
    a: 'When it drains through the coronary sinus, the sinus commonly dilates.',
  },
  vcmagna: {
    q: 'How can the great cardiac vein identify the LAD groove?',
    a: 'Its anterior interventricular portion ascends beside the LAD before turning into the left atrioventricular groove.',
  },
  vcmedia: {
    q: 'Would left coronary dominance change the groove occupied by this vein?',
    a: 'It still occupies the posterior interventricular groove beside the posterior interventricular artery.',
  },
  vcparva: {
    q: 'Can RV venous return reach the right atrium independently of this vein?',
    a: 'Anterior cardiac veins often drain the RV free wall directly into the right atrium.',
  },
  vpve: {
    q: 'Why does variation in this vein matter for cardiac resynchronization?',
    a: 'A suitable LV venous branch must have a course and caliber that permit lead placement.',
  },
  aoasc: {
    q: 'Why can a proximal ascending aortic dissection cause myocardial ischemia?',
    a: 'The dissection can extend to a coronary ostium and compromise coronary flow.',
  },
  arco: {
    q: 'What nerve can an arch aneurysm compress to cause hoarseness?',
    a: 'The left recurrent laryngeal nerve loops beneath the arch near the ligamentum arteriosum.',
  },
  aodesc: {
    q: 'Why can extensive descending aortic repair threaten spinal cord perfusion?',
    a: 'It can interrupt segmental arteries contributing radiculomedullary branches to the spinal cord.',
  },
  tbc: {
    q: 'What is a common variant of the proximal arch branching pattern?',
    a: 'The brachiocephalic trunk and left common carotid can share an origin, or the carotid can arise from the trunk.',
  },
  ccd: {
    q: 'Which territories are threatened by a lesion proximal to the right common carotid origin in the brachiocephalic trunk?',
    a: 'The ipsilateral carotid and subclavian territories can both lose inflow.',
  },
  cce: {
    q: 'What changes if the left common carotid shares an origin with the brachiocephalic trunk?',
    a: 'Its proximal access route changes, but it still ascends on the left to the carotid bifurcation.',
  },
  scd: {
    q: 'Where can an aberrant right subclavian artery run, and what symptom can it produce?',
    a: 'It often passes posterior to the esophagus and can cause dysphagia.',
  },
  sce: {
    q: 'Why can proximal left subclavian stenosis reverse vertebral flow?',
    a: 'If stenosis precedes the vertebral origin, blood can flow retrogradely down the vertebral artery into the distal subclavian.',
  },
  vcs: {
    q: 'How does the level of obstruction relative to the azygos entry affect collateral flow?',
    a: 'Above the azygos entry, collateral blood can reenter the lower SVC. Below it, azygos flow can reverse toward channels draining to the IVC.',
  },
  vci: {
    q: 'How can systemic venous return bypass an interrupted hepatic IVC segment?',
    a: 'An azygos continuation can carry lower body venous blood into the SVC while hepatic veins drain separately to the right atrium.',
  },
  vbcd: {
    q: 'Why is the right brachiocephalic route relatively direct for a right internal jugular central line?',
    a: 'The short right brachiocephalic vein descends almost vertically into the SVC.',
  },
  vbce: {
    q: 'Why can a retrosternal mass obstruct the left brachiocephalic vein?',
    a: 'The vein crosses posterior to the manubrium and anterior to the aortic arch branches.',
  },
  azigo: {
    q: 'How does an azygos fissure form?',
    a: 'An aberrant azygos course draws a pleural fold into the apex of the right lung.',
  },
  hemiazigo: {
    q: 'How does the hemiazygos vein usually reach the azygos vein?',
    a: 'It crosses to the right posterior to the aorta, esophagus and thoracic duct.',
  },
  tp: {
    q: 'Which nerve can be affected by marked pulmonary trunk enlargement?',
    a: 'The left recurrent laryngeal nerve can be compressed in the aortopulmonary window.',
  },
  apd: {
    q: 'What is the anomalous course in a pulmonary artery sling?',
    a: 'An anomalous left pulmonary artery arises from the right pulmonary artery and passes between the trachea and esophagus.',
  },
  ape: {
    q: 'Which vessel is linked to the proximal left pulmonary artery by a fetal shunt?',
    a: 'The ductus arteriosus connects the pulmonary arterial side to the aorta near the isthmus.',
  },
  lobsupd: {
    q: 'Why must the right upper lobar arterial branches be mapped individually before lobectomy?',
    a: 'Upper lobe branches vary and can arise separately, including a recurrent branch from the interlobar pulmonary artery.',
  },
  vpsd: {
    q: 'Why does middle lobe drainage matter in right upper lobectomy?',
    a: 'A middle lobe tributary may join the right superior pulmonary vein and requires preservation if the middle lobe remains.',
  },
  vpid: {
    q: 'What can happen after thermal injury near the right inferior pulmonary venous ostium?',
    a: 'Scarring can narrow the vein and cause venous congestion in its drainage territory.',
  },
  vpse: {
    q: 'How can a common left pulmonary venous ostium affect imaging interpretation?',
    a: 'The superior and inferior veins may unite before reaching the atrium, creating a single left ostium.',
  },
  vpie: {
    q: 'What is the consequence of inadvertently dividing an inferior vein that shares a short common trunk with the superior vein?',
    a: 'Division through the common trunk can obstruct upper lobe venous drainage as well.',
  },
  esofago: {
    q: 'Where can an enlarged left atrium indent the esophagus?',
    a: 'It can indent the anterior esophageal wall where the esophagus lies posterior to the left atrium.',
  },
  timo_d: {
    q: 'Where might ectopic thymic tissue be found?',
    a: 'It can remain along the descent pathway from the pharynx through the neck into the mediastinum.',
  },
  timo_e: {
    q: 'Which other organ shares a pouch origin with the thymus?',
    a: 'The inferior parathyroid derives from the dorsal third pharyngeal pouch and descends with the thymus before separating.',
  },
  traqueia: {
    q: 'How can a tracheoesophageal fistula cause abdominal distension in esophageal atresia?',
    a: 'A distal fistula lets airway gas enter the stomach through the distal esophageal segment.',
  },
  bpd: {
    q: 'Which lobes lose ventilation if an obstruction lies just inferior to the right upper lobar bronchial origin?',
    a: 'The middle and lower lobes, because the obstruction is in the bronchus intermedius.',
  },
  bpe: {
    q: 'What arch variant can form a complete vascular ring around the trachea and esophagus superior to this bronchus?',
    a: 'A double aortic arch can encircle and compress both foregut structures.',
  },
  sd_apical: {
    q: 'What airway variant can leave the right apex unventilated during intubation?',
    a: 'A displaced apical bronchus can arise directly from the trachea and be bypassed by the tube.',
  },
  sd_post: {
    q: 'Why can the posterior upper lobe receive aspirated material in a supine patient?',
    a: 'Its dorsal position makes it relatively dependent in the supine position.',
  },
  sd_ant: {
    q: 'Which surface would overlie an anterior segment lesion?',
    a: 'The anterior chest wall overlies this ventral upper lobe territory.',
  },
  sd_lat: {
    q: 'Why can an incomplete horizontal fissure complicate lateral middle lobe resection?',
    a: 'It obscures the boundary with the upper lobe and can leave parenchymal bridges to divide.',
  },
  sd_med: {
    q: 'What radiographic border may disappear when the medial middle lobe consolidates?',
    a: 'The right cardiac border can disappear because the segment abuts the right atrium.',
  },
  sd_sup: {
    q: 'What happens to this segment if only the basal bronchial trunk is obstructed?',
    a: 'The superior segment can remain aerated because B6 usually arises proximal to the basal trunk.',
  },
  sd_bmed: {
    q: 'What if B7 shares a stem with an adjacent basal bronchus?',
    a: 'Obstruction of their common stem can affect both segmental territories.',
  },
  sd_bant: {
    q: 'How would you distinguish B8 from B6 on coronal CT?',
    a: 'Trace B8 from the basal bronchial tree toward the anterior base. B6 usually arises separately superior to the basal trunk.',
  },
  sd_blat: {
    q: 'Why preserve a vein running between the lateral and posterior basal segments during isolated S9 resection?',
    a: 'It may drain the retained posterior basal segment and marks the intersegmental plane.',
  },
  sd_bpost: {
    q: 'Why can this segment receive aspirate in an upright patient?',
    a: 'Its basal position makes it a dependent lower lobe territory.',
  },
  se_apical: {
    q: 'What does a B1+2 bronchus imply for an isolated apical resection?',
    a: 'A shared apicoposterior stem requires distinction of its distal branches to preserve posterior ventilation.',
  },
  se_post: {
    q: 'How can you distinguish S2 from S6 on a sagittal CT?',
    a: 'The oblique fissure places S2 within the upper lobe and S6 within the lower lobe.',
  },
  se_ant: {
    q: 'What is at risk if the upper division bronchus is obstructed proximal to B3?',
    a: 'The anterior and apicoposterior territories can lose ventilation while the lingula remains aerated.',
  },
  se_lsup: {
    q: 'What if obstruction occurs at the origin of the lingular bronchus?',
    a: 'Both superior and inferior lingular segments can lose ventilation.',
  },
  se_linf: {
    q: 'Why can inferior lingular consolidation erase the left heart border?',
    a: 'The segment contacts the left ventricular contour, so consolidation effaces the air–soft tissue interface.',
  },
  se_sup: {
    q: 'What happens if the left lower lobar bronchus is obstructed proximal to B6?',
    a: 'Both the superior and basal segments can lose ventilation.',
  },
  se_bmed: {
    q: 'Why might bronchoscopy show no separate left B7 orifice?',
    a: 'The medial basal territory often shares an anteromedial basal bronchus with S8.',
  },
  se_bant: {
    q: 'How can a B7+8 variant affect the extent of atelectasis?',
    a: 'Obstruction of the common bronchus can collapse both anterior and medial basal territories.',
  },
  se_blat: {
    q: 'How would you identify the S9 pedicle if its bronchus shares a stem with B10?',
    a: 'Follow the distal bronchus and accompanying arterial branch toward the lateral basal territory.',
  },
  se_bpost: {
    q: 'Why might posterior basal collapse be less obvious on a frontal film?',
    a: 'Its retrocardiac position can obscure it. A lateral view can show posterior basal opacity.',
  },
};

for (const [id, followup] of Object.entries(clinicalFollowups)) {
  CONTENT[id].followups.push(followup);
}

const developmentalOrigins = [
  [['tri_ant', 'tri_post', 'tri_sep', 'mit_ant', 'mit_post'], [
    'Atrioventricular leaflets form through remodeling of cushion mesenchyme and delamination from adjacent ventricular myocardium.',
  ]],
  [['pulm_ant_d', 'pulm_ant_e', 'pulm_post', 'ao_ant', 'ao_post_e', 'ao_post_d'], [
    'Semilunar cusps form by remodeling mesenchymal swellings in the embryonic outflow tract.',
  ]],
  [['pap_vd_ant', 'pap_vd_post', 'pap_vd_sep', 'pap_ve_al'], [
    'Papillary muscles form from ventricular trabecular myocardium as the valve apparatus remodels.',
  ]],
  [['acd', 'tce', 'dae', 'diag', 'vent_ant_d_dae', 'cone_e', 'sept_da', 'sept_dp', 'cx', 'marg_d', 'vent_ant_acd', 'dp', 'vent_post_acd'], [
    'Coronary arteries remodel from the embryonic coronary vascular plexus after it connects to the aortic root.',
  ]],
  [['vcmagna', 'vcmedia', 'vcparva', 'vpve'], [
    'Cardiac veins develop from the superficial coronary plexus, with endothelial contributions from sprouts of the sinus venosus.',
  ]],
  [['aoasc'], [
    'The ascending aorta develops from the aortic channel of the partitioned embryonic outflow tract and the adjacent aortic sac.',
  ]],
  [['aodesc'], [
    'The descending thoracic aorta derives from the left dorsal aorta and the fused caudal dorsal aortae.',
  ]],
  [['vbcd'], [
    'The right brachiocephalic vein develops from the right anterior cardinal venous pathway cranial to the transverse anastomosis.',
  ]],
  [['vbce'], [
    'The left brachiocephalic vein develops from the transverse anastomosis between the anterior cardinal veins.',
  ]],
  [['azigo'], [
    'The azygos vein develops predominantly from the right supracardinal system.',
  ]],
  [['hemiazigo'], [
    'The hemiazygos vein develops predominantly from the left supracardinal system.',
  ]],
  [['lobsupd'], [
    'Lobar pulmonary arteries develop as the pulmonary vascular plexus remodels along the branching airways.',
  ]],
  [['bpd', 'bpe'], [
    'The main bronchus develops from a primary bronchial bud of the ventral foregut respiratory diverticulum.',
    'Foregut endoderm forms its epithelium. Splanchnic mesoderm supplies cartilage, smooth muscle and connective tissue.',
  ]],
  [Object.keys(lungSegments), [
    'Tertiary bronchial buds establish the bronchopulmonary segments by branching into surrounding splanchnic mesoderm.',
  ]],
];

for (const [ids, bullets] of developmentalOrigins) {
  for (const id of ids) {
    CONTENT[id].oral.development = [...bullets];
  }
}


function theory(id, title, deck, sections, oral, questions) {
  return {
    id,
    title,
    level: `after:${deck}`,
    sections: sections.map(([h, ...bullets]) => ({ h, bullets })),
    oral: oral.map(([q, ...a]) => ({ q, a })),
    mcq: quiz(questions, title.length),
  };
}

export const THEORY = [
  theory('conduction', 'Conduction system', 'camaras', [
    ['SA node', 'The dominant pacemaker lies subepicardially near the SVC–RA junction at the superior end of the terminal groove.'],
    ['AV node and His bundle', 'The AV node lies in the triangle of Koch. Its delay allows atrial emptying before ventricular systole.',
      'The AV bundle penetrates the central fibrous body and divides into right and left bundle branches along the ventricular septum.'],
    ['Ventricular distribution', 'The right branch reaches the anterior papillary muscle through the moderator band. The left branch divides into fascicles.',
      'Subendocardial Purkinje fibers distribute excitation through both ventricles.'],
    ['Arterial supply', 'The SA nodal artery commonly arises from the RCA and sometimes from the circumflex. The AV nodal artery usually arises from the dominant artery.'],
  ], [
    ['Trace excitation from the pacemaker to ventricular myocardium.', 'SA node activates atrial myocardium, including the left atrium via Bachmann bundle.',
      'The AV node delays conduction. The His bundle crosses the fibrous skeleton, then bundle branches and Purkinje fibers distribute the impulse.'],
    ['Name the boundaries of the triangle of Koch.', 'Tendon of Todaro, septal tricuspid annulus and coronary sinus ostium.'],
    ['How can an inferior infarct cause AV block?', 'Ischemia can interrupt the AV nodal branch, which usually arises near the crux from the dominant coronary artery.'],
    ['How can an accessory pathway produce ventricular pre-excitation?', 'An anomalous myocardial connection bypasses the AV nodal delay across the atrioventricular junction.'],
  ], [
    ['What normally crosses the electrically insulating fibrous skeleton?', 'AV bundle', 'SA nodal artery', 'Bachmann bundle', 'Moderator band', 'The AV bundle is the normal conducting bridge between atrial and ventricular myocardium.'],
    ['Which tract carries right bundle fibers to the RV free wall?', 'Moderator band', 'Crista terminalis', 'Tendon of Todaro', 'Aortomitral curtain', 'Right bundle fibers traverse the septomarginal trabecula, or moderator band.'],
    ['Which vessel commonly gives the AV nodal branch in right dominance?', 'Right coronary artery', 'Left anterior descending artery', 'Left marginal artery', 'First diagonal artery', 'The branch usually arises from the RCA near the crux.'],
  ]),
  theory('pericardium', 'Pericardium and pericardial sinuses', 'camaras', [
    ['Layers', 'Fibrous pericardium anchors to the central tendon and blends with adventitia of great vessels.',
      'Parietal and visceral serous layers enclose a potential cavity. The visceral layer is epicardium.'],
    ['Transverse sinus', 'Passes behind the ascending aorta and pulmonary trunk, anterior to the SVC and above the left atrium.'],
    ['Oblique sinus', 'Blind recess behind the left atrium between serous reflections around the pulmonary veins and IVC.'],
    ['Innervation and clinical anatomy', 'Phrenic nerves carry pain from fibrous and parietal serous pericardium. Pain may refer to the shoulder.',
      'Rapid fluid accumulation can impede cardiac filling and cause tamponade.'],
  ], [
    ['How do the transverse and oblique sinuses differ?', 'The transverse sinus is a passage along the back of the arterial trunks and permits surgical control of both.',
      'The oblique sinus is a blind recess posterior to the left atrium.'],
    ['Why can a small acute effusion cause tamponade?', 'A rapidly accumulating effusion raises intrapericardial pressure before the fibrous sac can stretch, limiting diastolic filling.'],
    ['Relate each phrenic nerve to the lung root and pericardium.', 'It passes anterior to the root between mediastinal pleura and fibrous pericardium with the pericardiacophrenic vessels.'],
    ['Why is the oblique sinus blind superiorly?', 'Serous reflections around the pulmonary veins define a cul-de-sac entered from below behind the left atrium.'],
  ], [
    ['Which recess can accommodate a clamp behind both arterial trunks?', 'Transverse sinus', 'Oblique sinus', 'Costomediastinal recess', 'Costodiaphragmatic recess', 'The transverse sinus passes behind the ascending aorta and pulmonary trunk.'],
    ['Which nerves carry parietal pericardial pain?', 'Phrenic nerves', 'Vagus nerves', 'Recurrent laryngeal nerves', 'Greater splanchnic nerves', 'Phrenic afferents enter C3–C5, accounting for possible shoulder referral.'],
    ['What directly covers the heart beneath the pericardial cavity?', 'Visceral serous pericardium', 'Parietal serous pericardium', 'Fibrous pericardium', 'Mediastinal pleura', 'Visceral serous pericardium forms the epicardium.'],
  ]),
  theory('cardiac-skeleton', 'Cardiac fibrous skeleton', 'valvas', [
    ['Components', 'Dense connective tissue around valve orifices supports leaflets and gives attachment to atrial and ventricular myocardium.',
      'Fibrous trigones link the aortic and mitral regions. The right trigone contributes to the central fibrous body.'],
    ['Continuity and conduction', 'The aortomitral curtain links the anterior mitral leaflet and aortic root.',
      'Fibrous tissue electrically insulates atrial from ventricular myocardium. The penetrating AV bundle normally bridges the insulation.'],
  ], [
    ['What are the mechanical and electrical functions?', 'Supports the valve orifices and anchors myocardium. Provides electrical insulation between the atria and ventricles.'],
    ['Why can valve surgery cause AV block?', 'The penetrating AV bundle passes through the central fibrous body near the membranous septum and septal tricuspid attachment.'],
    ['How can aortic root infection produce both mitral dysfunction and conduction block?', 'Infection can track through aortomitral continuity toward the anterior mitral leaflet or extend toward the membranous septum and penetrating His bundle.'],
    ['How does the mitral annulus differ anteriorly and posteriorly?', 'The anterior annulus is continuous with the aortic root between the fibrous trigones. The posterior annulus is less rigid and more prone to dilation.'],
  ], [
    ['What is continuous with the anterior mitral leaflet?', 'Aortic root', 'Pulmonary trunk', 'Coronary sinus', 'Crista terminalis', 'The aortomitral curtain joins the anterior mitral hinge to the aortic root.'],
    ['Which structure normally penetrates the central fibrous body?', 'AV bundle', 'SA node', 'Bachmann bundle', 'Interatrial septum', 'The penetrating AV bundle crosses the central fibrous body to reach the ventricular septum.'],
    ['Which structure helps form the central fibrous body?', 'Right fibrous trigone', 'Crista terminalis', 'Moderator band', 'Pulmonary ligament', 'The right trigone abuts the membranous septum and the penetrating conduction axis.'],
  ]),
  theory('surface-projection', 'Cardiac surface projection and auscultation', 'valvas', [
    ['Surface landmarks', 'The cardiac apex projects near the left midclavicular line in the fifth intercostal space.',
      'Valve orifices cluster behind the sternum and adjacent costal cartilages. Listening sites follow sound transmission.'],
    ['Auscultation areas', 'Aortic: second right intercostal space. Pulmonary: second left intercostal space. Both lie at the sternal edge.',
      'Tricuspid: lower left sternal border. Mitral: cardiac apex.'],
    ['Sound timing and radiation', 'S1 accompanies AV valve closure. S2 accompanies semilunar valve closure.',
      'Aortic stenosis often radiates toward the carotids. Mitral regurgitation often radiates toward the left axilla.'],
  ], [
    ['Locate all four standard auscultation areas.', 'Aortic and pulmonary at the second right and left interspaces, respectively.',
      'Tricuspid at the lower left sternal border. Mitral at the apex.'],
    ['How do you distinguish aortic stenosis from mitral regurgitation by radiation?', 'Aortic stenosis often radiates toward the carotids. Mitral regurgitation often radiates from the apex toward the left axilla.'],
    ['Why does inspiration normally widen S2 splitting?', 'Increased right ventricular filling prolongs right ventricular ejection and delays pulmonary valve closure.'],
    ['Why can tricuspid regurgitation become louder during inspiration?', 'Inspiration increases systemic venous return and can augment regurgitant flow across the tricuspid valve.'],
  ], [
    ['Where is the usual mitral listening point?', 'Left fifth interspace near the midclavicular line', 'Second right interspace', 'Second left interspace', 'Suprasternal notch', 'Mitral sounds are assessed at the cardiac apex.'],
    ['Which closures produce S2?', 'Aortic and pulmonary', 'Mitral and tricuspid', 'Aortic and mitral', 'Pulmonary and tricuspid', 'The aortic and pulmonary valves close at the end of ventricular ejection.'],
    ['Where is a pulmonary ejection murmur usually loudest?', 'Left upper sternal border', 'Right lower sternal border', 'Cardiac apex', 'Left axilla', 'The pulmonary listening area is at the second left interspace near the sternum.'],
  ]),
  theory('chest-xray', 'Cardiac and mediastinal borders on chest radiographs', 'camaras', [
    ['PA right contour', 'The SVC contributes superiorly and the right atrium forms the right cardiac border inferiorly.'],
    ['PA left contour', 'From superior to inferior: aortic knob, main pulmonary artery, left atrial appendage region and LV.'],
    ['Lateral view', 'The RV forms the anterior cardiac contour. The LA is upper posterior and the LV lower posterior.'],
    ['Interpretation', 'AP projection magnifies the heart. Assess apparent enlargement on an adequately inspired PA image when available.',
      'Loss of the right heart border suggests adjacent middle lobe disease. Loss of the left border suggests lingular disease.'],
  ], [
    ['Describe the PA cardiac and mediastinal contours.', 'SVC and RA on the right. Aortic knob, pulmonary trunk, left atrial appendage region and LV on the left.'],
    ['Why does a portable AP radiograph exaggerate cardiac size?', 'The heart lies anteriorly, farther from the detector in AP projection, so geometric magnification increases.'],
    ['How can left atrial enlargement alter the frontal silhouette?', 'An enlarged left atrium can create a double right heart contour and widen the carinal angle.'],
    ['Why can lingular consolidation erase the left heart border?', 'The lingula contacts the left ventricular contour. Consolidation removes the normal air–soft tissue interface.'],
  ], [
    ['Which chamber borders the sternum on a lateral image?', 'Right ventricle', 'Left atrium', 'Left ventricle', 'Right atrium', 'The RV is the most anterior cardiac chamber.'],
    ['Which lobe abuts the right cardiac silhouette?', 'Right middle lobe', 'Right upper lobe', 'Left upper lobe', 'Left lower lobe', 'The medial middle lobe abuts the right atrium, so consolidation there can obscure its border.'],
    ['What usually forms the upper posterior cardiac contour on a lateral radiograph?', 'Left atrium', 'Right atrium', 'Right ventricle', 'Left ventricle', 'The left atrium lies above the left ventricle on the posterior cardiac contour.'],
  ]),
  theory('fetal-circulation', 'Fetal circulation and postnatal transitions', 'vasos', [
    ['Placental flow', 'The umbilical vein carries oxygenated placental blood. The ductus venosus allows part of this blood to bypass hepatic sinusoids.'],
    ['Cardiac pathways', 'Preferential streaming directs IVC blood across the foramen ovale to the LA. Much RV output passes through the ductus arteriosus.'],
    ['Return to placenta', 'Two umbilical arteries carry blood from the internal iliac circulation back to the placenta.'],
    ['Postnatal changes', 'Lung expansion lowers pulmonary resistance and raises LA pressure above RA pressure, closing the foramen ovale flap.',
      'Increased oxygen tension and reduced prostaglandin support favor ductus arteriosus constriction.',
      'The ductus venosus becomes ligamentum venosum. The umbilical vein becomes the round ligament of the liver.',
      'Distal umbilical arteries become medial umbilical ligaments. Proximal portions remain patent as superior vesical arteries.'],
  ], [
    ['Name the three fetal shunts and what they bypass.', 'Ductus venosus bypasses hepatic sinusoids. Foramen ovale shunts RA to LA. Ductus arteriosus shunts pulmonary arterial blood into the descending aorta.'],
    ['Trace the preferential route of placental blood toward the fetal brain.', 'Umbilical venous blood partly bypasses hepatic sinusoids through the ductus venosus and enters the IVC.', 'Preferential streaming carries it through the foramen ovale, left ventricle and ascending aorta to the arch branches.'],
    ['What direction does flow usually take through a persistent ductus after pulmonary resistance falls?', 'Aortic pressure drives blood into the pulmonary artery, increasing pulmonary flow and left heart volume load.'],
    ['Compare a patent foramen ovale with a secundum atrial septal defect.', 'A patent foramen ovale leaves a potential flap channel. A secundum defect leaves deficient septal tissue at the oval fossa.'],
  ], [
    ['What becomes the ligamentum arteriosum?', 'Ductus arteriosus', 'Ductus venosus', 'Left umbilical vein', 'Foramen ovale', 'The closed ductus arteriosus leaves a ligament between the proximal left pulmonary artery and aortic isthmus.'],
    ['What closes the flap of the foramen ovale after birth?', 'LA pressure exceeds RA pressure', 'RA pressure exceeds LA pressure', 'Aortic pressure falls below pulmonary pressure', 'Portal venous pressure rises', 'Increased pulmonary venous return raises LA pressure and presses septum primum against the adjacent septal rim.'],
    ['Which fetal vessel leaves the ligamentum venosum?', 'Ductus venosus', 'Ductus arteriosus', 'Left umbilical vein', 'Distal umbilical artery', 'The ductus venosus bypasses hepatic sinusoids before birth and later becomes the ligamentum venosum.'],
  ]),
  theory('embryology', 'Cardiac embryology and septation', 'camaras', [
    ['Looping', 'The primitive heart tube loops rightward, positioning the ventricles ventrally and the atria dorsocranially.'],
    ['Atrial septation', 'Septum primum grows toward the cushions. Perforations form the ostium secundum before the ostium primum closes.',
      'Septum secundum leaves the foramen ovale. Septum primum acts as its flap valve.'],
    ['Ventricular and outflow septation', 'The muscular septum grows with the ventricles. Cushion and outflow components participate in membranous closure.',
      'Neural crest cells contribute to outflow cushions that partition the common outflow into aortic and pulmonary channels.'],
    ['Defects', 'Failure of outflow partitioning can produce persistent truncus arteriosus. Malalignment can produce tetralogy of Fallot.',
      'Tetralogy combines RV outflow obstruction, overriding aorta, ventricular septal defect and RV hypertrophy.'],
  ], [
    ['Explain the embryological basis of the fossa ovalis.', 'Septum primum forms the floor. The surrounding raised limbus represents the rim associated with septum secundum.'],
    ['Why are membranous ventricular septal defects common sites of incomplete closure?', 'Membranous closure requires alignment and fusion at the junction of the muscular septum, atrioventricular cushions and outflow septal tissues.'],
    ['Explain the developmental anatomy of tetralogy of Fallot.', 'Anterosuperior displacement of the outlet septum narrows the right ventricular outflow and produces a malalignment defect with aortic override.', 'Right ventricular hypertrophy develops in response to the outflow obstruction.'],
    ['How does deficient atrioventricular septation affect the valve junction?', 'A common atrioventricular junction persists and bridging leaflets span the septal region. Associated defects can involve atrial and ventricular levels.'],
  ], [
    ['What forms the flap valve of the foramen ovale?', 'Septum primum', 'Septum secundum', 'Truncal septum', 'Sinus venosus', 'Septum primum permits fetal right-to-left flow and is pressed shut when left atrial pressure rises.'],
    ['Which cell population contributes to outflow partitioning?', 'Cardiac neural crest', 'Surface epidermis', 'Notochord', 'Hepatic endoderm', 'Cardiac neural crest cells contribute to the cushions that partition the arterial outflow.'],
    ['Which embryonic structure forms the smooth right ventricular infundibulum?', 'Conus cordis', 'Primitive atrium', 'Left sinus horn', 'Septum primum', 'The right ventricular outflow tract develops from the conal portion of the embryonic outflow tract.'],
  ]),
  theory('innervation', 'Cardiac plexus and autonomic innervation', 'camaras', [
    ['Plexuses', 'The superficial cardiac plexus lies below the aortic arch near the ligamentum arteriosum. The deep plexus lies anterior to the tracheal bifurcation.'],
    ['Sympathetic and vagal pathways', 'Upper thoracic sympathetic preganglionic fibers synapse in cervical and upper thoracic sympathetic ganglia. Cardiac nerves carry postganglionic fibers.',
      'Vagal cardiac branches carry preganglionic parasympathetic fibers to ganglia on or near the heart.'],
    ['Effects and afferents', 'Sympathetic stimulation increases rate, AV conduction and contractility. Vagal input slows rate and AV conduction.',
      'Ischemic pain afferents generally travel with sympathetics to upper thoracic spinal levels. Reflex afferents commonly travel with the vagus.'],
  ], [
    ['Why can cardiac ischemia produce medial arm pain?', 'Cardiac nociceptive and upper thoracic somatic afferents converge in the spinal cord. The brain may refer pain to corresponding dermatomes.'],
    ['Where do cardiac sympathetic and parasympathetic efferents synapse?', 'Sympathetic fibers synapse in cervical and upper thoracic sympathetic ganglia. Vagal fibers synapse in intrinsic cardiac ganglia.'],
    ['How does autonomic input change AV nodal conduction?', 'Sympathetic input accelerates AV nodal conduction. Vagal input slows conduction and can prolong AV nodal delay.'],
    ['Compare the routes of cardiac pain and cardiovascular reflex afferents.', 'Ischemic pain generally follows sympathetic pathways to upper thoracic spinal levels. Many cardiac reflex afferents travel in the vagus to the brainstem.'],
  ], [
    ['Where is the deep cardiac plexus?', 'Anterior to the tracheal bifurcation', 'Within the coronary sinus', 'Posterior to the esophageal hiatus', 'At the diaphragm central tendon', 'The deep plexus sits near the carina and posterior to the aortic arch.'],
    ['Which nerve conveys cardiac parasympathetic efferents?', 'Vagus', 'Phrenic', 'Intercostobrachial', 'Greater splanchnic', 'Vagal cardiac branches carry preganglionic fibers to intrinsic cardiac ganglia.'],
    ['What fibers run in vagal cardiac branches to intrinsic ganglia?', 'Preganglionic parasympathetic fibers', 'Postganglionic parasympathetic fibers', 'Preganglionic sympathetic fibers', 'Somatic motor fibers', 'Vagal efferents synapse with postganglionic neurons in ganglia on or near the heart.'],
  ]),
  theory('lung-lobes-hila', 'Lung lobes, fissures and hila', 'vias', [
    ['Lobes and fissures', 'The right lung has upper, middle and lower lobes. The horizontal fissure separates upper and middle lobes.',
      'The oblique fissures separate lower lobes from the remaining lobes. The left upper lobe includes the lingula.'],
    ['Root and hilum', 'The hilum is the medial surface gateway. The root contains bronchi, pulmonary and bronchial vessels, lymphatics and nerves.',
      'The phrenic nerve passes anterior to each root and the vagus posterior. The pulmonary ligament descends below the root.'],
    ['Vascular relationships', 'Pulmonary artery relative to main bronchus: right anterior, left superior. The right upper lobar bronchus is eparterial.',
      'Pulmonary veins generally occupy anterior and inferior positions, with the inferior vein lowest.'],
    ['Segments', 'Each segment has a segmental bronchus and pulmonary arterial branch. Intersegmental veins help identify segmentectomy planes.'],
  ], [
    ['Compare the main arteries at the two roots.', 'The right pulmonary artery is anterior to the right main bronchus. The left pulmonary artery is superior to the left main bronchus.'],
    ['Why can a bronchopulmonary segment be resected anatomically?', 'Its bronchus and pulmonary artery are intrasegmental. Intersegmental pulmonary veins help locate the plane and may drain neighboring segments.'],
    ['What makes the right upper lobar bronchus eparterial?', 'It arises superior to the right pulmonary artery. The remaining right lobar bronchi arise below that artery.'],
    ['How do the pleural layers continue at the lung root?', 'Mediastinal parietal pleura reflects onto the root and continues as visceral pleura. The inferior double fold forms the pulmonary ligament.'],
  ], [
    ['Which nerve passes in front of the lung root?', 'Phrenic', 'Vagus', 'Greater splanchnic', 'Left recurrent laryngeal', 'The phrenic nerve passes anterior to the root between mediastinal pleura and fibrous pericardium.'],
    ['Which structure is usually lowest at the hilum?', 'Inferior pulmonary vein', 'Main bronchus', 'Pulmonary artery', 'Superior pulmonary vein', 'The inferior pulmonary vein occupies the lowest part of the lung root.'],
    ['Which bronchus is normally eparterial?', 'Right upper lobar bronchus', 'Right middle lobar bronchus', 'Left upper lobar bronchus', 'Left lower lobar bronchus', 'The right upper lobar bronchus arises above the right pulmonary artery.'],
  ]),
  theory('pleura', 'Pleura and recesses', 'vias', [
    ['Layers', 'Visceral pleura coats the lung and enters fissures. Parietal pleura lines the thoracic wall, diaphragm and mediastinum.',
      'The pleural cavity is a potential space with lubricating fluid.'],
    ['Recesses and surface projection', 'The costodiaphragmatic recess lies between costal and diaphragmatic pleura. The costomediastinal recess is larger on the left near the cardiac notch.',
      'At quiet expiration the lung margin crosses ribs 6, 8 and 10 at midclavicular, midaxillary and scapular lines. Pleura extends about two ribs lower.'],
    ['Pain and imaging', 'Intercostal nerves supply costal and peripheral diaphragmatic pleura. Phrenic nerves supply mediastinal and central diaphragmatic pleura.',
      'Upright pleural effusion often blunts the costophrenic angle. Ultrasound depicts and localizes pleural fluid.'],
  ], [
    ['Explain shoulder referral from pleural irritation.', 'Central diaphragmatic and mediastinal pleura send pain through the phrenic nerve to C3–C5. Pain can be perceived at the shoulder.'],
    ['Why does pneumothorax allow the lung to recoil?', 'Air entering the pleural cavity disrupts the pressure difference that holds the lung expanded against the chest wall.'],
    ['Where does costal pleural irritation refer pain and why?', 'Intercostal afferents localize pain to the corresponding thoracic wall or upper abdominal dermatomes.'],
    ['What happens to the costodiaphragmatic recess on deep inspiration?', 'The descending lung margin occupies more of the recess as the diaphragm contracts.'],
  ], [
    ['Where does free pleural fluid collect dependently when upright?', 'Costodiaphragmatic recess', 'Transverse pericardial sinus', 'Oblique pericardial sinus', 'Pulmonary fissure apex', 'The costodiaphragmatic recess is the lowest pleural reflection in an upright patient.'],
    ['Which pleura directly covers the fissures?', 'Visceral pleura', 'Costal pleura', 'Mediastinal pleura', 'Diaphragmatic pleura', 'Visceral pleura follows the lung surface into its fissures.'],
    ['Which nerve carries pain from peripheral diaphragmatic pleura?', 'Intercostal nerve', 'Vagus nerve', 'Phrenic nerve', 'Greater splanchnic nerve', 'Peripheral diaphragmatic pleura receives segmental intercostal innervation.'],
  ]),
  theory('lung-lymphatics', 'Pulmonary and pleural lymphatic drainage', 'vias', [
    ['Intrapulmonary pathways', 'Superficial subpleural and deep peribronchovascular plexuses drain toward bronchopulmonary nodes.',
      'Deep lymph may first pass through pulmonary nodes along lobar and segmental bronchi.'],
    ['Central drainage', 'Bronchopulmonary nodes drain to inferior and superior tracheobronchial nodes, then paratracheal nodes and bronchomediastinal trunks.',
      'Lower lobe lymph, especially from the left, can cross to right tracheobronchial nodes.'],
    ['Parietal pleura', 'Parietal pleura drains to chest wall and mediastinal nodes, including intercostal, parasternal and diaphragmatic groups.'],
  ], [
    ['Trace lymph from a peripheral pulmonary lesion to the mediastinum.', 'Subpleural or deep plexus to hilar bronchopulmonary nodes, then tracheobronchial and paratracheal nodes.',
      'Cross-midline drainage can account for contralateral nodal spread.'],
    ['Distinguish the territories of the superficial and deep pulmonary lymphatic plexuses.', 'The superficial plexus drains peripheral lung and visceral pleura. The deep plexus follows bronchi and vessels and may pass through intrapulmonary nodes.'],
    ['Why can a left lower lobe tumor spread to right mediastinal nodes?', 'Lymph can cross through inferior tracheobronchial nodes to right superior tracheobronchial nodes.'],
    ['How does costal parietal pleural drainage differ from visceral pleural drainage?', 'Costal pleura drains to chest wall nodes, including intercostal and parasternal groups. Visceral pleura drains through the subpleural plexus toward hilar nodes.'],
  ], [
    ['Which nodes lie at the hilum?', 'Bronchopulmonary', 'Parasternal', 'Submental', 'Axillary', 'Bronchopulmonary nodes at the lung root receive lymph from both intrapulmonary plexuses.'],
    ['Which nodes lie at the carinal bifurcation?', 'Inferior tracheobronchial', 'Parasternal', 'Superior lumbar', 'Subclavian', 'Inferior tracheobronchial nodes occupy the subcarinal region.'],
    ['Which plexus primarily drains the visceral pleura?', 'Superficial subpleural plexus', 'Deep peribronchial plexus', 'Intercostal venous plexus', 'Internal vertebral venous plexus', 'Lymph from visceral pleura joins the superficial pulmonary plexus.'],
  ]),
  theory('bronchial-vessels', 'Bronchial arteries and veins', 'vias', [
    ['Arterial origins', 'Two left bronchial arteries usually arise from the descending thoracic aorta.',
      'The right bronchial artery commonly arises from an intercostobronchial trunk. Origins vary.'],
    ['Territory', 'Bronchial arteries supply conducting airways, supporting tissues and visceral pleura through systemic-pressure flow.'],
    ['Venous return', 'Proximal bronchial veins drain to azygos channels on the right and hemiazygos or superior intercostal channels on the left.',
      'Much intrapulmonary bronchial venous blood drains into pulmonary veins, contributing to physiologic venous admixture.'],
    ['Clinical correlation', 'Hypertrophied bronchial arteries are a common source of major hemoptysis.'],
  ], [
    ['Compare bronchial and pulmonary circulations.', 'Bronchial arteries provide systemic nutritive flow to conducting airways. Pulmonary arteries bring RV output to alveolar capillaries for gas exchange.',
      'Part of the bronchial circulation returns through pulmonary veins.'],
    ['Why can bronchiectasis cause substantial hemoptysis?', 'Chronic inflammation can enlarge fragile bronchial arteries, which bleed under systemic arterial pressure.'],
    ['Trace the proximal bronchial venous return on each side.', 'Right bronchial veins usually drain into the azygos vein. Left bronchial veins commonly drain into accessory hemiazygos or left superior intercostal channels.'],
    ['Why can bronchial venous drainage lower systemic arterial oxygen content slightly?', 'Some deoxygenated bronchial blood enters pulmonary veins and mixes with oxygenated blood returning from alveolar capillaries.'],
  ], [
    ['Where do the left bronchial arteries usually originate?', 'Descending thoracic aorta', 'Pulmonary trunk', 'Coronary sinus', 'Left common carotid', 'The left bronchial arteries usually arise directly from the descending thoracic aorta.'],
    ['Which veins carry much intrapulmonary bronchial venous blood to the heart?', 'Pulmonary veins', 'Hepatic veins', 'Brachiocephalic veins', 'Coronary veins', 'Bronchopulmonary venous communications pass deoxygenated blood into pulmonary venous return.'],
    ['Which vessel commonly shares an origin with the right bronchial artery?', 'Posterior intercostal artery', 'Right pulmonary artery', 'Internal thoracic artery', 'Inferior phrenic artery', 'The right bronchial artery often arises from an intercostobronchial trunk.'],
  ]),
  theory('mediastinum', 'Mediastinal divisions and contents', 'vasos', [
    ['Boundaries and dividing plane', 'The mediastinum lies between pleural sacs, from sternum to thoracic spine and from thoracic inlet to diaphragm.',
      'The sternal angle to T4–T5 disc plane separates superior and inferior mediastina.'],
    ['Superior mediastinum', 'Contains thymic tissue, brachiocephalic veins, upper SVC, aortic arch and branches, trachea, esophagus, thoracic duct and major nerves.'],
    ['Inferior mediastinum', 'Anterior: between sternum and pericardium, containing fat, lymph nodes and thymic remnants.',
      'Middle: pericardium, heart and roots of great vessels, with phrenic nerves along the pericardium.',
      'Posterior: esophagus, descending aorta, thoracic duct, azygos system and thoracic splanchnic nerves.'],
  ], [
    ['Name the mediastinal compartments using gross anatomical landmarks.', 'The sternal angle plane separates superior and inferior compartments. The inferior mediastinum is anterior to, within, or posterior to the pericardial region.'],
    ['Trace the left recurrent laryngeal nerve through the superior mediastinum.', 'It branches from the left vagus, loops under the aortic arch beside the ligamentum arteriosum and ascends in the tracheoesophageal groove.'],
    ['Why can a posterior mediastinal mass cause chylothorax?', 'The thoracic duct ascends between the aorta and azygos vein behind the esophagus. Disruption can release chyle into the pleural cavity.'],
    ['Compare the phrenic and vagus courses at the lung roots.', 'The phrenic nerves pass anterior to the roots on the pericardium. The vagus nerves pass posterior and contribute to pulmonary and esophageal plexuses.'],
  ], [
    ['Which compartment contains the descending thoracic aorta below the arch?', 'Posterior mediastinum', 'Anterior mediastinum', 'Middle mediastinum', 'Right pleural cavity', 'The descending thoracic aorta courses through the posterior mediastinum alongside the vertebral column.'],
    ['Which compartment contains the heart and pericardium?', 'Middle mediastinum', 'Anterior mediastinum', 'Posterior mediastinum', 'Superior mediastinum', 'The pericardium and heart occupy the middle division of the inferior mediastinum.'],
    ['Which vein arches over the right lung root to enter the SVC?', 'Azygos vein', 'Hemiazygos vein', 'Left brachiocephalic vein', 'Right inferior pulmonary vein', 'The azygos arch turns anteriorly over the right lung root before joining the SVC.'],
  ]),
];

export const LESSON_CUES = {
  "ad": "Look for the chamber at the patient's right border, between the great veins entering superiorly and inferiorly.",
  "ae": "Look from the posterior view: this superior chamber receives the pulmonary veins and forms the base, the superior-posterior part of the heart.",
  "vd": "Look for the broad anterior chamber deep to the sternum. It leads superiorly toward the pulmonary trunk.",
  "ve": "Look for the pointed inferior tip (apex), on the patient's left. This chamber has the thickest muscle wall.",
  "paredev": "Look for the muscle covering both ventricles, the inferior chambers. Myocardium means heart muscle; it is a wall, not another chamber.",
  "tri_ant": "Find it at the anterior aspect of the opening between the right atrium and right ventricle.",
  "tri_post": "Find it at the inferior-posterior edge of the opening between the right atrium and right ventricle.",
  "tri_sep": "Find it against the interventricular septum (central dividing wall) at the right atrium-to-ventricle opening.",
  "mit_ant": "Find it between the left atrium and ventricle, beside the aortic outlet.",
  "mit_post": "Find it along the posterior (mural) wall of the opening between the left atrium and ventricle.",
  "pulm_ant_d": "Pulmonary valve cusp at the anterior right.",
  "pulm_ant_e": "Pulmonary valve cusp at the anterior left.",
  "pulm_post": "Pulmonary valve cusp at the posterior aspect.",
  "ao_ant": "Find it at the anterior-right aspect of the aortic root, beside the right coronary artery opening.",
  "ao_post_e": "Find it at the left-posterior aspect of the aortic root, beside the left coronary artery opening.",
  "ao_post_d": "Find it at the right-posterior aspect of the aortic root, near the interatrial septum.",
  "pap_vd_ant": "Find it projecting inward from the anterior wall of the right ventricle.",
  "pap_vd_post": "Find it projecting inward from the inferior wall of the right ventricle.",
  "pap_vd_sep": "Find it on the interventricular septum inside the right ventricle, near its superior outlet.",
  "pap_ve_al": "Find it inside the left ventricle, attached to its anterolateral wall.",
  "acd": "Find it in the right atrioventricular groove, curving around the right border.",
  "tce": "Short vessel between the pulmonary trunk and the small ear-shaped extension of the left atrium.",
  "dae": "Find it in the anterior interventricular groove, running toward the apex.",
  "diag": "Find it branching diagonally from the anterior interventricular artery (LAD) across the left ventricle.",
  "vent_ant_d_dae": "Small branches crossing from the anterior interventricular artery onto the right ventricle.",
  "cone_e": "Curves around the funnel-shaped outlet of the right ventricle.",
  "sept_da": "Small branches entering the interventricular septum from the artery in the anterior interventricular groove.",
  "sept_dp": "Small branches entering the interventricular septum from the artery in the posterior interventricular groove.",
  "cx": "Runs in the left atrioventricular groove between the left atrium and left ventricle.",
  "marg_d": "Find it along the acute inferior margin of the right ventricle.",
  "vent_ant_acd": "Find it crossing the anterior right ventricular wall from the right atrioventricular groove.",
  "dp": "Look for the artery in the posterior interventricular groove between the ventricles, beside the middle cardiac vein.",
  "vent_post_acd": "Find it crossing the inferior (diaphragmatic) surface toward the posterior aspect of the left ventricle.",
  "seio": "Runs in the posterior atrioventricular groove between the left atrium and left ventricle and empties into the right atrium.",
  "vcmagna": "Follows the artery in the anterior interventricular groove between the ventricles and then the circumflex artery.",
  "vcmedia": "Look for the vein in the posterior interventricular groove between the ventricles, beside the artery in that groove.",
  "vcparva": "Runs with the right coronary artery and its right marginal branch.",
  "vpve": "Find it on the inferior (diaphragmatic) surface of the left ventricle.",
  "aoasc": "Find it rising from the left ventricle, posterior to the pulmonary trunk.",
  "arco": "The large curved vessel superior to the heart, over the left main bronchus.",
  "aodesc": "Find it descending posterior to the heart, lateral to the spine on the left.",
  "tbc": "First superior branch of the arch, coursing to the patient’s right.",
  "ccd": "Find it ascending toward the right neck from the first arch branch.",
  "cce": "Find it ascending toward the left neck directly from the middle arch branch.",
  "scd": "Find it coursing laterally toward the right arm from the first arch branch.",
  "sce": "Find it coursing laterally toward the left arm from the last arch branch.",
  "vcs": "Find it entering the right atrium from superiorly, on the patient’s right.",
  "vci": "Find it entering the right atrium from inferior to the heart.",
  "vbcd": "Short vertical vein superior to the right atrium, joining its counterpart to form the superior vena cava.",
  "vbce": "Long vein crossing anterior to the arch branches from left to right.",
  "azigo": "Arches over the right lung root.",
  "hemiazigo": "Crosses from the left to the azygos vein around the inferior thorax.",
  "tp": "Find it leaving the right ventricle anteriorly and splitting inferior to the aortic arch.",
  "apd": "Passes inferior to the aortic arch and posterior to the ascending aorta and superior vena cava.",
  "ape": "Find it running left from the pulmonary trunk inferior to the aortic arch.",
  "lobsupd": "Find it turning superiorly from the right pulmonary artery toward the superior right lung.",
  "vpsd": "Find it entering the superior right aspect of the posterior left atrium.",
  "vpid": "Find it entering the inferior right aspect of the posterior left atrium.",
  "vpse": "Find it entering the superior left aspect of the posterior left atrium.",
  "vpie": "Find it entering the inferior left aspect of the posterior left atrium.",
  "esofago": "Find it posterior to the left atrium.",
  "timo_d": "Find it anterior to the great vessels, on the patient’s right and posterior to the sternum.",
  "timo_e": "Find it anterior to the great vessels, on the patient’s left and posterior to the sternum.",
  "traqueia": "The central ringed airway superior to the bifurcation into the two main bronchi.",
  "bpd": "Look for the shorter, steeper branch from the airway bifurcation toward the right lung.",
  "bpe": "Longer and more horizontal, inferior to the aortic arch.",
  "sd_apical": "Find it at the apex of the right upper lobe.",
  "sd_post": "Find it in the posterior part of the right upper lobe.",
  "sd_ant": "Find it in the anterior part of the right upper lobe.",
  "sd_lat": "Find it on the lateral aspect of the right middle lobe.",
  "sd_med": "Find it on the medial aspect of the right middle lobe, next to the heart.",
  "sd_sup": "Find it in the superior part of the right lower lobe.",
  "sd_bmed": "Find it at the medial base of the right lower lobe.",
  "sd_bant": "Find it in the anterior part of the right lower lobe base.",
  "sd_blat": "Find it on the lateral aspect of the right lower lobe base.",
  "sd_bpost": "Find it in the posterior part of the right lower lobe base.",
  "se_apical": "Find it at the apex of the left upper lobe.",
  "se_post": "Find it in the posterior part of the left upper lobe.",
  "se_ant": "Find it in the anterior part of the left upper lobe.",
  "se_lsup": "Superior part of the lingula (the tongue-like part of the left upper lobe).",
  "se_linf": "Inferior part of the lingula (the tongue-like part of the left upper lobe).",
  "se_sup": "Find it in the superior part of the left lower lobe.",
  "se_bmed": "Find it at the medial base of the left lower lobe.",
  "se_bant": "Find it in the anterior part of the left lower lobe base.",
  "se_blat": "Find it on the lateral aspect of the left lower lobe base.",
  "se_bpost": "Find it in the posterior part of the left lower lobe base.",
  "diafragma": "Look for the dome-shaped muscle at the floor of the thorax, below the heart and lungs.",
  "eso_art": "A small vessel running along the esophagus behind the left atrium, from the descending aorta.",
  "azigo_acs": "On the left of the vertebral column in the upper thorax, crossing toward the right-sided azygos channel.",
  "ita_d": "A vertical vessel behind the right costal cartilages, just lateral to the sternal edge.",
  "ita_e": "A vertical vessel behind the left costal cartilages, just lateral to the sternal edge.",
  "itv_d": "The thin venous companion of the vertical artery behind the right costal cartilages.",
  "itv_e": "The thin venous companion of the vertical artery behind the left costal cartilages.",
  "pica_d1": "A small artery in the first right intercostal space, behind the pleura near the top of the rib cage.",
  "pica_e1": "A small artery in the first left intercostal space, behind the pleura near the top of the rib cage.",
  "pica_d2": "A small artery in the second right intercostal space, behind the pleura.",
  "pica_e2": "A small artery in the second left intercostal space, behind the pleura.",
  "pica_sup_d": "A short descending trunk in the upper right posterior thorax, giving the upper intercostal arteries.",
  "pica_sup_e": "A short descending trunk in the upper left posterior thorax, giving the upper intercostal arteries.",
  "icv_ant_d": "A set of thin veins in the right anterior intercostal spaces, running toward the sternal edge.",
  "icv_ant_e": "A set of thin veins in the left anterior intercostal spaces, running toward the sternal edge.",
  "phren_inf_a_d": "Runs onto the underside of the right diaphragm, behind the inferior vena cava.",
  "phren_inf_a_e": "Runs onto the underside of the left diaphragm, behind the esophagus.",
  "phren_inf_v": "Thin veins on the underside of the diaphragm, beside the inferior phrenic arteries.",
  "phren_sup_v": "Thin veins on the upper surface of the diaphragm, between it and the pericardium.",
  "manubrio": "The upper segment of the breastbone, between the two clavicles.",
  "esterno": "The flat middle segment of the breastbone, below the manubrium.",
  "xifoide": "The small tip at the lower end of the breastbone.",
  "claviculas": "The two S-shaped bones at the top of the chest, from breastbone to shoulder.",
  "cart_costais": "The cartilage bars joining the ribs to the breastbone.",
  "costela_1": "The short, broad rib at the very top of the rib cage.",
  "costela_2": "The rib whose cartilage marks the angle of the breastbone.",
  "costela_4": "A mid-chest rib at nipple level.",
  "costela_5": "The rib at the level of the heart’s apex.",
  "costelas_rest": "The remaining ribs around the sides and back of the chest.",
  "vertebras_toracicas": "The twelve bones of the spine behind the chest, each with facets for ribs."
};
export const ORIENTATION = [
  {
    "title": "How to look at the heart",
    "text": "Left and right are the patient\u2019s: in the anterior view, their left is your right. The left atrium marks the base (superior-posterior); the left ventricle forms the apex (inferior-left tip).",
    "notice": "Click the base, then the apex to follow the long axis.",
    "focus": [
      "ae",
      "ve"
    ],
    "view": "ant"
  },
  {
    "title": "The anterior chamber",
    "text": "The right ventricle fills much of the anterior aspect of the heart. The pulmonary trunk leaves it toward the lungs.",
    "notice": "Follow the broad chamber superiorly to its vessel.",
    "focus": [
      "vd",
      "tp"
    ],
    "view": "ant"
  },
  {
    "title": "The right border",
    "text": "The right atrium receives the superior vena cava from superiorly and the inferior vena cava from inferiorly.",
    "notice": "The two veins bracket the chamber.",
    "focus": [
      "ad",
      "vcs",
      "vci"
    ],
    "view": "dir"
  },
  {
    "title": "The pointed tip",
    "text": "The left ventricle forms the apex and the left border. The left atrium lies superior to it; its small ear-shaped extension is called an auricle.",
    "notice": "Compare the large inferior chamber with the small superior chamber.",
    "focus": [
      "ve",
      "ae"
    ],
    "view": "esq"
  },
  {
    "title": "Look from superior",
    "text": "The pulmonary trunk lies anterior to the ascending aorta. The ascending aorta bends into the aortic arch.",
    "notice": "Trace the straight aorta into its curved arch.",
    "focus": [
      "tp",
      "aoasc",
      "arco"
    ],
    "view": "sup"
  },
  {
    "title": "Two exit valves",
    "choice": "valves",
    "text": "The pulmonary valve leads to the lungs; the aortic valve leads to the body. Each has three flaps, called cusps: click each name below to isolate a flap.",
    "notice": "The pulmonary cusps are anterior to the aortic cusps.",
    "focus": [
      "pulm_ant_d",
      "pulm_ant_e",
      "pulm_post",
      "ao_ant",
      "ao_post_e",
      "ao_post_d"
    ],
    "view": "sup"
  },
  {
    "title": "The posterior chamber",
    "text": "In the posterior view, the left atrium receives four pulmonary veins.",
    "notice": "Click each vein to see where it meets the chamber.",
    "focus": [
      "ae",
      "vpsd",
      "vpid",
      "vpse",
      "vpie"
    ],
    "view": "post"
  },
  {
    "title": "The inferior (underside) surface",
    "text": "The left ventricle and right ventricle form the inferior (diaphragmatic) surface resting on the diaphragm, the breathing muscle inferior to the lungs.",
    "notice": "Compare the two ventricles from the inferior view.",
    "focus": [
      "ve",
      "vd"
    ],
    "view": "inf"
  },
  {
    "title": "Vessels on the anterior surface",
    "text": "The anterior interventricular branch (LAD) and great cardiac vein run beside each other between the ventricles.",
    "notice": "Click each vessel separately to trace its course toward the apex.",
    "focus": [
      "dae",
      "vcmagna"
    ],
    "view": "ant"
  },
  {
    "title": "Two lungs around the heart",
    "padding": 1.45,
    "text": "The right lung has three lobes and the left two, with the lingula below the cardiac notch. Both surround the heart inside the rib cage and move with every breath; the right lung is shorter because the liver raises the right diaphragm.",
    "notice": "Compare the three lobes on the right with the two on the left.",
    "focus": [
      "sd_apical",
      "sd_post",
      "sd_ant",
      "sd_lat",
      "sd_med",
      "sd_sup",
      "sd_bmed",
      "sd_bant",
      "sd_blat",
      "sd_bpost",
      "se_apical",
      "se_post",
      "se_ant",
      "se_lsup",
      "se_linf",
      "se_sup",
      "se_bmed",
      "se_bant",
      "se_blat",
      "se_bpost"
    ],
    "chips": [
      "sd_apical",
      "sd_lat",
      "sd_bpost",
      "se_apical",
      "se_lsup",
      "se_bpost"
    ],
    "scope": [
      "traqueia",
      "bpd",
      "bpe",
      "sd_apical",
      "sd_post",
      "sd_ant",
      "sd_lat",
      "sd_med",
      "sd_sup",
      "sd_bmed",
      "sd_bant",
      "sd_blat",
      "sd_bpost",
      "se_apical",
      "se_post",
      "se_ant",
      "se_lsup",
      "se_linf",
      "se_sup",
      "se_bmed",
      "se_bant",
      "se_blat",
      "se_bpost"
    ],
    "view": "ant"
  },
  {
    "title": "The airway fork",
    "text": "The trachea descends in the midline and divides at the carina into two main bronchi. The right bronchus is wider and steeper; the left passes under the aortic arch. Air follows this fork into both hila, where bronchi and vessels enter each lung.",
    "notice": "Follow the trachea down to the carina, then compare the angle of the two bronchi.",
    "focus": [
      "traqueia",
      "bpd",
      "bpe"
    ],
    "scope": [
      "traqueia",
      "bpd",
      "bpe",
      "sd_apical",
      "sd_post",
      "sd_ant",
      "sd_lat",
      "sd_med",
      "sd_sup",
      "sd_bmed",
      "sd_bant",
      "sd_blat",
      "sd_bpost",
      "se_apical",
      "se_post",
      "se_ant",
      "se_lsup",
      "se_linf",
      "se_sup",
      "se_bmed",
      "se_bant",
      "se_blat",
      "se_bpost"
    ],
    "view": "ant"
  },
  {
    "title": "Behind and between",
    "subtle": false,
    "padding": 1.85,
    "text": "The mediastinum is the central compartment between the pleural cavities. The esophagus and descending aorta run behind the heart, the thymus lies in front of the great vessels, and the diaphragm forms the floor. These relations explain why an enlarged left atrium can press on the esophagus.",
    "notice": "Rotate to the posterior view: the esophagus is midline, the aorta to its left, the spine behind.",
    "focus": [
      "esofago",
      "aodesc",
      "azigo",
      "hemiazigo"
    ],
    "scope": [
      "diafragma",
      "aodesc",
      "azigo",
      "hemiazigo",
      "timo_d",
      "timo_e",
      "vertebras_toracicas",
      "costelas_rest"
    ],
    "view": "post"
  },
  {
    "title": "Landmarks to remember",
    "text": "The coronary sinus drains the heart wall into the right atrium; the lungs flank the heart, and the esophagus and descending aorta pass behind it. Review the landmarks below before Level 1.",
    "notice": "Recall: base and apex; anterior ventricle; right border; exit vessels; posterior atrium; surface vessels; lungs and posterior mediastinum.",
    "focus": [
      "seio",
      "ad"
    ],
    "view": "post"
  }
];

export const ROUND_CLUES = {
  "ad": "At the patient’s right border, between the veins entering superiorly and inferiorly.",
  "ae": "Posterior to the right atrium, receiving four pulmonary veins at the superior-posterior part of the heart.",
  "paredev": "The muscular covering around both ventricles, the inferior chambers.",
  "vd": "Across the anterior aspect of the heart, inferior to the pulmonary trunk.",
  "ve": "On the patient’s left, extending to the pointed inferior tip.",
  "tri_ant": "At the anterior aspect of the opening between the right atrium and right ventricle.",
  "tri_post": "At the inferior-posterior edge of the opening between the right atrium and right ventricle.",
  "tri_sep": "Against the interventricular septum at the right atrium-to-ventricle opening.",
  "mit_ant": "Between the left atrium and ventricle, beside the aortic outlet.",
  "mit_post": "Along the posterior (mural) wall of the opening between the left atrium and ventricle.",
  "pulm_ant_d": "Pulmonary valve cusp at the anterior right",
  "pulm_ant_e": "Pulmonary valve cusp at the anterior left",
  "pulm_post": "Pulmonary valve cusp at the posterior aspect",
  "ao_ant": "At the anterior-right aspect of the aortic root, beside the right coronary artery opening.",
  "ao_post_e": "At the left-posterior aspect of the aortic root, beside the left coronary artery opening.",
  "ao_post_d": "At the right-posterior aspect of the aortic root, near the interatrial septum.",
  "pap_vd_ant": "Projecting inward from the anterior wall of the right ventricle.",
  "pap_vd_post": "Projecting inward from the inferior wall of the right ventricle.",
  "pap_vd_sep": "On the interventricular septum inside the right ventricle, near its superior outlet.",
  "pap_ve_al": "Inside the left ventricle, attached to its anterolateral wall.",
  "acd": "In the right atrioventricular groove, curving around the right border.",
  "tce": "Short vessel between the pulmonary trunk and the small ear-shaped extension of the left atrium",
  "dae": "In the anterior interventricular groove, running toward the apex.",
  "diag": "Branching diagonally from the anterior interventricular artery across the left ventricle.",
  "vent_ant_d_dae": "Small branches crossing from the anterior interventricular artery onto the right ventricle.",
  "cone_e": "Curves around the pulmonary infundibulum",
  "sept_da": "Small branches entering the interventricular septum from the artery in the anterior interventricular groove.",
  "sept_dp": "Small branches entering the interventricular septum from the artery in the posterior interventricular groove.",
  "cx": "Runs in the left atrioventricular groove",
  "marg_d": "Along the acute inferior margin of the right ventricle.",
  "vent_ant_acd": "Crossing the anterior right ventricular wall from the right atrioventricular groove.",
  "dp": "In the posterior interventricular groove between the ventricles, beside the middle cardiac vein.",
  "vent_post_acd": "Crossing the inferior (diaphragmatic) surface toward the posterior aspect of the left ventricle.",
  "seio": "Runs in the posterior atrioventricular groove and empties into the right atrium",
  "vcmagna": "Follows the artery in the anterior interventricular groove between the ventricles and then the circumflex artery",
  "vcmedia": "In the posterior interventricular groove between the ventricles, beside the artery in that groove.",
  "vcparva": "Runs with the right coronary artery and its right marginal branch",
  "vpve": "On the inferior (diaphragmatic) surface of the left ventricle",
  "aoasc": "Rising from the left ventricle, posterior to the pulmonary trunk.",
  "arco": "The large curved vessel superior to the heart, over the left main bronchus.",
  "aodesc": "Descending posterior to the heart, lateral to the spine on the left.",
  "tbc": "First superior branch of the arch, coursing to the patient’s right.",
  "ccd": "Ascending toward the right neck from the first arch branch.",
  "cce": "Ascending toward the left neck directly from the middle arch branch.",
  "scd": "Coursing laterally toward the right arm from the first arch branch.",
  "sce": "Coursing laterally toward the left arm from the last arch branch.",
  "vcs": "Entering the right atrium from superiorly, on the patient’s right.",
  "vci": "Entering the right atrium from inferior to the heart.",
  "vbcd": "Short vertical vein superior to the right atrium, joining its counterpart to form the superior vena cava.",
  "vbce": "Long vein crossing anterior to the arch branches from left to right.",
  "azigo": "Arches over the right lung hilum",
  "hemiazigo": "Crosses from the left to the azygos vein around T8",
  "tp": "Leaving the right ventricle anteriorly and splitting inferior to the aortic arch.",
  "apd": "Passes inferior to the aortic arch and posterior to the ascending aorta and superior vena cava",
  "ape": "Running left from the pulmonary trunk inferior to the aortic arch.",
  "lobsupd": "Turning superiorly from the right pulmonary artery toward the superior right lung.",
  "vpsd": "Entering the superior right aspect of the posterior left atrium.",
  "vpid": "Entering the inferior right aspect of the posterior left atrium.",
  "vpse": "Entering the superior left aspect of the posterior left atrium.",
  "vpie": "Entering the inferior left aspect of the posterior left atrium.",
  "esofago": "Posterior to the left atrium",
  "timo_d": "Anterior to the great vessels, on the patient’s right and posterior to the sternum.",
  "timo_e": "Anterior to the great vessels, on the patient’s left and posterior to the sternum.",
  "traqueia": "The central ringed airway superior to the bifurcation into the two main bronchi.",
  "bpd": "From the airway bifurcation toward the right lung: the shorter, steeper branch.",
  "bpe": "Longer and more horizontal, inferior to the aortic arch",
  "sd_apical": "At the apex of the right upper lobe",
  "sd_post": "In the posterior part of the right upper lobe",
  "sd_ant": "In the anterior part of the right upper lobe",
  "sd_lat": "On the lateral aspect of the right middle lobe",
  "sd_med": "On the medial aspect of the right middle lobe, next to the heart",
  "sd_sup": "In the superior part of the right lower lobe",
  "sd_bmed": "At the medial base of the right lower lobe",
  "sd_bant": "In the anterior part of the right lower lobe base",
  "sd_blat": "On the lateral aspect of the right lower lobe base",
  "sd_bpost": "In the posterior part of the right lower lobe base",
  "se_apical": "At the apex of the left upper lobe",
  "se_post": "In the posterior part of the left upper lobe",
  "se_ant": "In the anterior part of the left upper lobe",
  "se_lsup": "Superior part of the lingula (the tongue-like part of the left upper lobe)",
  "se_linf": "Inferior part of the lingula (the tongue-like part of the left upper lobe)",
  "se_sup": "In the superior part of the left lower lobe",
  "se_bmed": "At the medial base of the left lower lobe",
  "se_bant": "In the anterior part of the left lower lobe base",
  "se_blat": "On the lateral aspect of the left lower lobe base",
  "se_bpost": "In the posterior part of the left lower lobe base",
  "diafragma": "The dome-shaped muscle at the floor of the thorax.",
  "eso_art": "A small aortic branch running to the esophagus behind the left atrium.",
  "azigo_acs": "Left paravertebral vein of the upper thorax, crossing to the azygos near T8.",
  "ita_d": "Vertical artery behind the right costal cartilages, lateral to the sternal edge.",
  "ita_e": "Vertical artery behind the left costal cartilages, lateral to the sternal edge.",
  "itv_d": "Vertical vein beside the right internal thoracic artery.",
  "itv_e": "Vertical vein beside the left internal thoracic artery.",
  "pica_d1": "Small artery in the first right posterior intercostal space.",
  "pica_e1": "Small artery in the first left posterior intercostal space.",
  "pica_d2": "Small artery in the second right posterior intercostal space.",
  "pica_e2": "Small artery in the second left posterior intercostal space.",
  "pica_sup_d": "Short trunk in the upper right posterior thorax, from the costocervical region.",
  "pica_sup_e": "Short trunk in the upper left posterior thorax, from the costocervical region.",
  "icv_ant_d": "Thin veins in the right anterior intercostal spaces, near the sternal edge.",
  "icv_ant_e": "Thin veins in the left anterior intercostal spaces, near the sternal edge.",
  "phren_inf_a_d": "Artery on the underside of the right diaphragm, behind the inferior vena cava.",
  "phren_inf_a_e": "Artery on the underside of the left diaphragm, behind the esophagus.",
  "phren_inf_v": "Thin veins on the underside of the diaphragm.",
  "phren_sup_v": "Thin veins on the upper surface of the diaphragm.",
  "manubrio": "Upper segment of the breastbone between the clavicles.",
  "esterno": "Flat middle segment of the breastbone.",
  "xifoide": "Small lower tip of the breastbone.",
  "claviculas": "S-shaped bones from breastbone to shoulder.",
  "cart_costais": "Cartilage bars between ribs and breastbone.",
  "costela_1": "Short, broad top rib.",
  "costela_2": "Rib whose cartilage marks the sternal angle.",
  "costela_4": "Mid-chest rib at nipple level.",
  "costela_5": "Rib at the level of the cardiac apex.",
  "costelas_rest": "Remaining ribs around the sides and back of the chest.",
  "vertebras_toracicas": "Twelve vertebrae with costal facets behind the chest."
};

// ── Rich lesson content (lessons v2) ───────────────────────────────────────
// LESSON_DETAIL: per-structure teaching text (30–70 words, name in bold).
// LEVEL_OVERVIEW / LEVEL_CONTRAST / LEVEL_CHECK: per-level lesson phases.
export const LESSON_DETAIL = {
  // Heart chambers
  ad: {
    text: "**Right atrium** forms the right border of the heart, between the superior and inferior venae cavae. Its smooth posterior part, the sinus venarum, receives both cavae and the coronary sinus; the rough anterior appendage is trabeculated by pectinate muscles. It primes venous blood into the right ventricle. On the model, follow the right border between the two caval openings.",
  },
  ae: {
    text: "**Left atrium** is the most posterior chamber and forms most of the base. Four pulmonary veins enter its smooth posterior wall, while the left auricle projects anteriorly beside the pulmonary trunk. It delivers oxygenated blood to the left ventricle. Seen from behind, it lies immediately in front of the esophagus.",
    clinical: "A dilated left atrium can compress the esophagus and cause dysphagia; its appendage is a common site of thrombus in atrial fibrillation.",
  },
  paredev: {
    text: "**Ventricular myocardium** is the muscular wall common to both ventricles. Its thickness differs sharply: about 3–5 mm on the right and 10–15 mm on the left. It includes the muscular interventricular septum and is supplied by the coronary arteries. On the model it forms the outer surface of the lower chambers, not a chamber itself.",
  },
  vd: {
    text: "**Right ventricle** is the most anterior chamber, lying directly behind the sternum. Its wall is 3–5 mm thick and throws up trabeculae carneae; the conus arteriosus funnels blood into the pulmonary trunk, and the moderator band crosses to the anterior papillary muscle. It pumps deoxygenated blood to the lungs.",
  },
  ve: {
    text: "**Left ventricle** forms the apex and the left border of the heart. Its wall is about 10–15 mm thick, roughly three times that of the right ventricle, and its smooth aortic vestibule leads to the aorta. It pumps systemic blood. On the model the apex points inferolaterally to the patient's left.",
  },

  // Atrioventricular leaflets
  tri_ant: {
    text: "**Anterior tricuspid leaflet** is the largest of the three leaflets guarding the right atrioventricular orifice. It hangs from the annulus between the right atrium and ventricle, anchored by chordae to the anterior papillary muscle. It closes during ventricular systole and prevents backflow. On the model it faces the anterior wall through the open atrium.",
  },
  tri_post: {
    text: "**Posterior tricuspid leaflet** is the smaller inferior leaflet of the right atrioventricular valve, also called the inferior cusp. It attaches along the posterior annulus and is tethered by chordae mainly to the posterior papillary muscle. It meets the other leaflets in systole to seal the orifice. Look along the inferior edge of the right atrioventricular opening.",
  },
  tri_sep: {
    text: "**Septal tricuspid leaflet** lies against the interventricular septum at the right atrioventricular orifice. Its attachment is slightly more apical than that of the anterior mitral leaflet, a useful echocardiographic landmark, and septal chordae tether it. It helps close the right valve in systole. On the model, find the leaflet adjacent to the central septum.",
  },
  mit_ant: {
    text: "**Anterior mitral leaflet** is the larger, sail-like leaflet of the left atrioventricular valve. It lies in fibrous continuity with the aortic valve, separates left ventricular inflow from the outflow tract, and is anchored by chordae to both papillary muscles. It closes during systole to prevent regurgitation. Look between the left atrium and ventricle beside the aortic root.",
  },
  mit_post: {
    text: "**Posterior mitral leaflet** is the mural leaflet of the left atrioventricular valve, attached along the posterior annulus. It is shorter but has a wider base and three scallops, P1–P3; chordae from both left ventricular papillary muscles tether it. It closes against the anterior leaflet in systole. On the model it lines the posterior wall of the left atrioventricular opening.",
    clinical: "Prolapse most often affects the middle scallop, P2.",
  },

  // Semilunar cusps
  pulm_ant_d: {
    text: "**Right anterior pulmonary valve cusp** is one of the three semilunar cusps of the pulmonary valve. It sits anteriorly and to the patient's right within the pulmonary root, with a nodule and lunules on its free edge and no chordal attachments. It opens in systole and closes in diastole. On the model, find it at the front-right of the valve ring.",
  },
  pulm_ant_e: {
    text: "**Left anterior pulmonary valve cusp** is the anterior-left semilunar cusp of the pulmonary valve. Its thin free edge carries a nodule and lunules, and it has no chordae. It opens during right ventricular ejection and closes to prevent backflow. Find it at the front-left of the pulmonary root, anterior to the aortic valve.",
  },
  pulm_post: {
    text: "**Posterior pulmonary valve cusp** is the semilunar cusp at the back of the pulmonary valve, called the left cusp in Terminologia Anatomica. It lies deep to the other two cusps and bears a nodule and lunules on its free margin. It closes in diastole. On the model, approach from above or behind the pulmonary trunk to see its posterior position.",
  },
  ao_ant: {
    text: "**Right coronary cusp** is the anterior-right semilunar cusp of the aortic valve. Its sinus of Valsalva gives origin to the right coronary artery, and it sits at the centre of the heart, related anteriorly to the right ventricular outflow tract. It closes in diastole to prevent aortic regurgitation. On the model, find its coronary ostium just above the cusp.",
  },
  ao_post_e: {
    text: "**Left coronary cusp** is the left-posterior semilunar cusp of the aortic valve. Its sinus gives off the left coronary artery, usually from a single ostium, and it lies beside the pulmonary trunk. It closes in diastole and helps maintain coronary perfusion. On the model, trace the left coronary artery from the left posterior aspect of the aortic root.",
  },
  ao_post_d: {
    text: "**Noncoronary cusp** is the right-posterior semilunar cusp of the aortic valve and has no coronary ostium in its sinus. It lies close to the interatrial septum and the membranous septum, relations that matter in valve surgery and in perivalvular abscess. It closes in diastole. On the model, find the cusp without a coronary artery arising beside it.",
  },

  // Papillary muscles
  pap_vd_ant: {
    text: "**Right ventricular anterior papillary muscle** is the largest papillary muscle of the right ventricle, arising from its anterior wall. The septomarginal trabecula, or moderator band, reaches its base carrying the right bundle branch, and its chordae anchor the anterior tricuspid leaflet. It contracts with the ventricle to hold the valve closed. Look on the anterior wall inside the right ventricle.",
  },
  pap_vd_post: {
    text: "**Right ventricular posterior papillary muscle** arises from the inferior wall of the right ventricle, sometimes as several bellies. Its chordae attach to the posterior and septal tricuspid leaflets, and it prevents leaflet prolapse during systole. On the model, look along the inferior wall inside the right ventricle, opposite the anterior muscle.",
  },
  pap_vd_sep: {
    text: "**Right ventricular septal papillary muscle** is a small muscle on the interventricular septum inside the right ventricle, near the conus arteriosus. Also called the conal papillary muscle or muscle of Lancisi, its chordae help anchor the anterior and septal tricuspid leaflets. It contracts during systole to keep the valve competent. Find it high on the septum near the pulmonary outflow.",
  },
  pap_ve_al: {
    text: "**Anterolateral papillary muscle** arises from the anterolateral wall of the left ventricle and anchors the anterior and posterior mitral leaflets through chordae. It has a dual blood supply from the LAD and circumflex, so it resists ischaemia better than the posteromedial muscle, which depends on the posterior descending artery. It holds the mitral valve closed in systole. Look inside the left ventricle on its lateral wall.",
  },

  // Coronary arteries
  acd: {
    text: "**Right coronary artery** arises from the right aortic sinus and runs in the right atrioventricular groove toward the crux. It supplies the right atrium and ventricle, the SA node in about 60% and the AV node in about 80% of hearts, and gives the posterior descending artery in right-dominant hearts. On the model, follow it around the right border.",
    clinical: "Proximal occlusion can cause an inferior infarct with bradyarrhythmia or AV block.",
  },
  tce: {
    text: "**Left main coronary artery** is a short trunk, usually 5–10 mm long, arising from the left aortic sinus. It passes between the pulmonary trunk and the left atrial appendage before dividing into the anterior interventricular and circumflex branches. It supplies most of the left ventricle. On the model, find the short segment hidden just below the pulmonary trunk.",
    clinical: "A left main lesion threatens a large territory and is treated as a high-risk stenosis.",
  },
  dae: {
    text: "**Anterior interventricular branch**, or LAD, runs in the anterior interventricular sulcus from the left main trunk toward the apex, giving diagonal and septal branches. It supplies the anterior two-thirds of the interventricular septum and the anterior left ventricular wall. On the model, follow it beside the great cardiac vein.",
    clinical: "Its proximal occlusion is the classic widow-maker infarct.",
  },
  diag: {
    text: "**Diagonal branches** leave the anterior interventricular artery at an acute angle and course laterally across the anterior left ventricular wall. They supply the anterolateral myocardium and anastomose with marginal branches of the circumflex. Their number varies from one to four. On the model, look for vessels fanning diagonally away from the LAD, not diving into the septum.",
  },
  vent_ant_d_dae: {
    text: "**Right anterior ventricular branches of the LAD** are small branches that cross the anterior interventricular groove onto the anterior wall of the right ventricle. They supply the upper anterior right ventricular myocardium and anastomose with branches of the right coronary artery. On the model, find the fine twigs leaving the LAD toward the right side of the heart.",
  },
  cone_e: {
    text: "**Conus branch of the LAD** is a small artery that curves around the pulmonary infundibulum, the funnel-shaped outflow of the right ventricle. It frequently anastomoses with the conus branch of the right coronary artery, forming the ring of Vieussens, a collateral route. On the model, find it turning onto the front of the pulmonary trunk.",
  },
  sept_da: {
    text: "**Septal branches of the LAD** are several perforators that dive from the anterior interventricular artery into the interventricular septum. They supply the anterior two-thirds of the septum, including the right bundle branch and the left anterior fascicle. On the model, look for short branches entering the septum rather than crossing its surface.",
    clinical: "They are targeted in alcohol septal ablation for hypertrophic cardiomyopathy.",
  },
  sept_dp: {
    text: "**Septal branches of the PDA** arise from the posterior descending artery and enter the interventricular septum from behind. They supply the posterior third of the septum and anastomose with the anterior septal perforators. Their territory includes the posterior part of the conduction system. On the model, find them leaving the posterior interventricular artery and turning into the septum.",
  },
  cx: {
    text: "**Circumflex branch** arises from the left main trunk and runs in the left atrioventricular groove around the obtuse margin. It supplies the left atrium and the lateral and posterior left ventricular walls, and gives the left marginal branches. In about 10% of hearts it is left-dominant and gives the posterior descending artery. On the model, follow it between the left atrium and ventricle.",
  },
  marg_d: {
    text: "**Right marginal branch** leaves the right coronary artery at the acute margin of the right ventricle and runs toward the apex along the inferior border. It supplies the lateral and inferior right ventricular wall and anastomoses with branches of the LAD. On the model, follow it along the sharp lower-right edge of the heart.",
  },
  vent_ant_acd: {
    text: "**Anterior ventricular branch of the RCA** is a small right coronary branch that crosses the anterior wall of the right ventricle. It supplies the anterior right ventricular myocardium and anastomoses with right anterior branches of the LAD. On the model, find it leaving the right atrioventricular groove and passing onto the front of the ventricle.",
  },
  dp: {
    text: "**Posterior interventricular branch**, or PDA, runs in the posterior interventricular sulcus from the crux toward the apex, accompanied by the middle cardiac vein. It supplies the posterior third of the septum and the inferior walls of both ventricles. The artery that gives origin to it defines coronary dominance. On the model, follow it on the diaphragmatic surface.",
  },
  vent_post_acd: {
    text: "**Posterior ventricular branch of the RCA** leaves the right coronary artery near the crux and crosses the diaphragmatic surface toward the left ventricle. Also called posterolateral branches, they supply the inferior and posterior left ventricular wall in right-dominant hearts. On the model, find the branches running leftward on the underside of the heart.",
  },

  // Cardiac veins
  seio: {
    text: "**Coronary sinus** is the large venous channel in the posterior atrioventricular groove, formed by the great cardiac vein and receiving the middle and small cardiac veins. It drains most of the heart's venous blood into the right atrium through an opening guarded by the Thebesian valve. On the model, follow it along the posterior surface toward the right atrium.",
    clinical: "Its ostium is used for cardiac resynchronization pacing leads.",
  },
  vcmagna: {
    text: "**Great cardiac vein** begins near the apex and ascends in the anterior interventricular sulcus beside the LAD, then turns left in the atrioventricular groove. It receives the left marginal vein and continues as the coronary sinus. It drains the anterior and lateral left ventricle. On the model, follow it alongside the anterior interventricular artery.",
  },
  vcmedia: {
    text: "**Middle cardiac vein**, or posterior interventricular vein, runs in the posterior interventricular sulcus beside the posterior descending artery. It drains the inferior ventricular walls and the posterior part of the septum and empties into the coronary sinus near its termination. On the model, find it on the diaphragmatic surface between the ventricles.",
  },
  vcparva: {
    text: "**Small cardiac vein** runs in the right atrioventricular groove with the right coronary artery and its marginal branch. It drains the right atrium and ventricle and usually enters the coronary sinus near its right end, though it may open directly into the right atrium. On the model, follow it around the right border.",
  },
  vpve: {
    text: "**Posterior vein of the left ventricle** is a small vein on the diaphragmatic surface of the left ventricle. It drains the inferior left ventricular wall and opens into the coronary sinus or one of its tributaries. On the model, look for a short vein running toward the posterior atrioventricular groove, distinct from the middle cardiac vein.",
  },
  // Aorta and arch branches
  aoasc: {
    text: "**Ascending aorta** begins at the aortic valve behind the left half of the sternum and ascends inside the pericardium. It gives the right and left coronary arteries from its sinuses, then continues as the aortic arch at the sternal angle. It carries the entire systemic output. On the model, find it rising behind the pulmonary trunk.",
  },
  arco: {
    text: "**Aortic arch** curves from the ascending to the descending aorta at the level of the sternal angle, about T4. It gives the brachiocephalic trunk, left common carotid and left subclavian arteries, and the ligamentum arteriosum tethers it to the left pulmonary artery. The left recurrent laryngeal nerve loops beneath it. On the model, trace its curve over the left main bronchus.",
    clinical: "An aneurysm here can stretch the left recurrent laryngeal nerve and cause hoarseness.",
  },
  aodesc: {
    text: "**Descending thoracic aorta** continues from the arch at T4 and descends left of the vertebral column to the aortic hiatus at T12. It gives posterior intercostal, bronchial, esophageal and superior phrenic branches. It lies in the posterior mediastinum, behind the left atrium and esophagus. On the model, follow it behind the heart along the spine.",
  },
  tbc: {
    text: "**Brachiocephalic trunk** is the first and largest branch of the aortic arch. It ascends to the right and divides behind the right sternoclavicular joint into the right subclavian and right common carotid arteries. It supplies the right head, neck and upper limb. On the model, find it arising first from the arch and coursing rightward.",
  },
  ccd: {
    text: "**Right common carotid artery** arises from the brachiocephalic trunk behind the right sternoclavicular joint and ascends in the neck. It supplies the right side of the head and neck and divides into the internal and external carotid arteries at the upper border of the thyroid cartilage. On the model, follow it upward from the brachiocephalic bifurcation.",
  },
  cce: {
    text: "**Left common carotid artery** is the second branch of the aortic arch. It ascends in the neck to divide into the internal and external carotid arteries at about C4. Unlike the right common carotid, it usually arises directly from the arch. On the model, find it between the brachiocephalic trunk and the left subclavian artery.",
  },
  scd: {
    text: "**Right subclavian artery** arises from the brachiocephalic trunk behind the right sternoclavicular joint and arches over the cervical pleura to the right arm. It gives the vertebral artery, internal thoracic artery and thyrocervical trunk before becoming the axillary artery. On the model, follow it laterally at the thoracic inlet.",
  },
  sce: {
    text: "**Left subclavian artery** is the third branch of the aortic arch. It arches over the left cervical pleura and gives the vertebral, internal thoracic and thyrocervical branches before entering the arm. It lies posterior to the left brachiocephalic vein. On the model, find it leaving the arch most distally and coursing laterally.",
  },

  // Systemic veins
  vcs: {
    text: "**Superior vena cava** forms behind the first right costal cartilage by union of the two brachiocephalic veins. It descends vertically to the right of the ascending aorta and enters the right atrium; the azygos vein joins it at T4. It returns blood from the head, neck, upper limbs and thorax. On the model, follow it into the right atrium.",
  },
  vci: {
    text: "**Inferior vena cava** returns blood from the lower body and enters the right atrium from below after passing through the diaphragm at T8. It lies in the posterior mediastinum, to the right of the aorta, and its opening is guarded by the Eustachian valve. On the model, find it entering the lower right atrium.",
  },
  vbcd: {
    text: "**Right brachiocephalic vein** is a short, nearly vertical vein formed behind the right sternoclavicular joint by the internal jugular and subclavian veins. It joins the left brachiocephalic vein to form the superior vena cava and receives the right internal thoracic, vertebral and inferior thyroid veins. On the model, find it above the right atrium.",
  },
  vbce: {
    text: "**Left brachiocephalic vein** is longer than the right and crosses the midline anterior to the branches of the aortic arch. It is formed by the left internal jugular and subclavian veins and joins the right brachiocephalic vein to form the superior vena cava. It receives the thymic, inferior thyroid and left internal thoracic veins. On the model, follow its long oblique course.",
  },
  azigo: {
    text: "**Azygos vein** ascends along the right side of the thoracic vertebrae, receives the right posterior intercostal veins and the hemiazygos systems, then arches over the right lung root to join the superior vena cava at T4. It is a collateral route between the caval systems. On the model, follow its arch above the right hilum.",
  },
  hemiazigo: {
    text: "**Hemiazygos vein** descends on the left side of the vertebrae, receives the lower left posterior intercostal veins, and crosses the midline at about T8 to join the azygos vein. It drains the left posterior thoracic wall and connects the left and right caval systems. On the model, find it low in the left posterior thorax crossing to the right.",
  },

  // Pulmonary arteries
  tp: {
    text: "**Pulmonary trunk** leaves the right ventricular conus arteriosus and ascends anterior and to the left of the ascending aorta. It divides into the right and left pulmonary arteries beneath the aortic arch at about T4–T5. It carries deoxygenated blood to the lungs. On the model, follow it from the front of the heart to its bifurcation.",
  },
  apd: {
    text: "**Right pulmonary artery** is the longer, more horizontal branch of the pulmonary trunk. It passes beneath the aortic arch and behind the ascending aorta and superior vena cava to reach the right hilum, where it divides. It carries deoxygenated blood to the right lung. On the model, find it running rightward behind the SVC.",
  },
  ape: {
    text: "**Left pulmonary artery** is the shorter branch of the pulmonary trunk. It passes anterior to the descending aorta and left main bronchus and is connected to the aortic arch by the ligamentum arteriosum. It carries deoxygenated blood to the left lung. On the model, follow it leftward under the arch.",
  },
  lobsupd: {
    text: "**Right upper lobar pulmonary artery**, or truncus anterior, is the first major branch of the right pulmonary artery. It arises before or at the hilum and supplies the apical, posterior and anterior segments of the right upper lobe. On the model, find it turning upward from the right pulmonary artery toward the upper lung.",
  },

  // Pulmonary veins
  vpsd: {
    text: "**Right superior pulmonary vein** drains the right upper and middle lobes and enters the superolateral aspect of the left atrium's posterior wall. It carries oxygenated blood from the right lung. On the model, follow it from the right hilum to the upper right corner of the left atrial roof.",
  },
  vpid: {
    text: "**Right inferior pulmonary vein** drains the right lower lobe and enters the lower right aspect of the left atrial posterior wall. It is one of four pulmonary veins, all of which lack valves. On the model, find it below the right superior vein, entering the left atrium from the right hilum.",
  },
  vpse: {
    text: "**Left superior pulmonary vein** drains the left upper lobe, including the lingula, and enters the upper left aspect of the left atrial posterior wall. It carries oxygenated blood to the heart. On the model, follow it from the left hilum to the left atrial roof, above the left inferior vein.",
  },
  vpie: {
    text: "**Left inferior pulmonary vein** drains the left lower lobe and enters the lower left aspect of the left atrium. It is the most inferior of the four pulmonary veins. On the model, find it entering the left atrium below the left superior pulmonary vein, close to the esophagus.",
  },

  // Mediastinal neighbours
  esofago: {
    text: "**Esophagus** is a muscular tube descending behind the trachea and left atrium through the posterior mediastinum. It passes through the diaphragm at T10 and ends at the cardia of the stomach. It carries food and is separated from the left atrium only by pericardium, which explains dysphagia in atrial enlargement. On the model, find it behind the heart.",
  },
  timo_d: {
    text: "**Right lobe of the thymus** lies in the anterior superior mediastinum, behind the manubrium and anterior to the brachiocephalic veins and trachea. It is largest in childhood and involutes after puberty, when it is replaced by fat. It is a primary lymphoid organ for T-cell maturation. On the model, find it in front of the great vessels on the right.",
  },
  timo_e: {
    text: "**Left lobe of the thymus** lies in the anterior superior mediastinum, in front of the left brachiocephalic vein and aortic arch. It is part of a bilobed lymphoid organ that matures T lymphocytes and involutes with age. On the model, find it behind the sternum on the patient's left, anterior to the great vessels.",
  },

  // Trachea and bronchi
  traqueia: {
    text: "**Trachea** begins below the cricoid cartilage at C6 and descends in the midline to the carina at T4–T5. It has 16–20 C-shaped cartilage rings, completed posteriorly by the trachealis muscle, and lies in front of the esophagus. It conducts air to the main bronchi. On the model, follow the ribbed tube to its bifurcation.",
  },
  bpd: {
    text: "**Right main bronchus** is shorter, wider and more vertical than the left, so it continues the tracheal axis. It enters the right hilum behind the pulmonary artery and divides into upper and lower lobe bronchi. Its steep angle explains why aspirated objects lodge on the right. On the model, find the steeper branch at the carina.",
    clinical: "Foreign bodies and aspirated vomit favour the right main bronchus.",
  },
  bpe: {
    text: "**Left main bronchus** is longer, narrower and more horizontal than the right. It passes beneath the aortic arch and in front of the esophagus to reach the left hilum, where it divides into upper and lower lobe bronchi. On the model, follow it under the arch; its lesser angle protects it from aspiration.",
  },

  // Right lung segments
  sd_apical: {
    text: "**Right apical segment** (B1) is the uppermost part of the right upper lobe, above the posterior and anterior segments. Its segmental bronchus B1 leaves the upper lobe bronchus and its artery accompanies it. It lies against the cupula of the pleura. On the model, find the cap of the right lung at the thoracic inlet.",
  },
  sd_post: {
    text: "**Right posterior segment** (B2) occupies the posterior part of the right upper lobe, behind the apical and anterior segments. It is bounded above by the apical segment and below by the oblique fissure. It is a classic site of reactivation tuberculosis and of aspiration in a supine patient. On the model, look at the back of the right upper lobe.",
  },
  sd_ant: {
    text: "**Right anterior segment** (B3) is the anterior part of the right upper lobe, lying behind the anterior chest wall. It is separated from the posterior segment by the apical segment and reaches the oblique fissure below. On the model, find it at the front of the right upper lobe, above the middle lobe.",
  },
  sd_lat: {
    text: "**Lateral segment of the middle lobe** (B4) occupies the outer part of the right middle lobe, against the lateral chest wall. Its bronchus and artery enter the middle lobe together. It is separated from the medial segment by an imperfect plane. On the model, look at the lateral surface of the middle lobe, above the oblique fissure.",
  },
  sd_med: {
    text: "**Medial segment of the middle lobe** (B5) lies against the right heart border, medial to the lateral segment. It is separated from it by an incomplete fissure and is the segment that silhouettes the right atrium on a frontal radiograph. On the model, find the inner part of the middle lobe next to the heart.",
  },
  sd_sup: {
    text: "**Right superior segment** (B6) is the top of the right lower lobe, behind the oblique fissure and above the basal segments. Its bronchus arises first from the lower lobe bronchus and runs posteriorly. It is a common site of aspiration when lying supine. On the model, find the crown of the right lower lobe behind the hilum.",
  },
  sd_bmed: {
    text: "**Right medial basal segment** (B7) is the medial part of the right lower lobe base, against the right atrium and inferior vena cava. It is the only basal segment that is consistently separate on the right, though its bronchus may arise with B8. On the model, find the innermost wedge at the bottom of the right lung.",
  },
  sd_bant: {
    text: "**Right anterior basal segment** (B8) forms the anterior part of the right lower lobe base, behind the middle lobe and above the diaphragm. Its bronchus and artery descend anteriorly. On the model, look at the front of the right lower lobe, below the oblique fissure.",
  },
  sd_blat: {
    text: "**Right lateral basal segment** (B9) occupies the lateral part of the right lower lobe base, against the chest wall. Its bronchus B9 is the last of the basal bronchi to arise in many lungs. On the model, find it at the outer edge of the right lower lobe, above the diaphragm.",
  },
  sd_bpost: {
    text: "**Right posterior basal segment** (B10) is the largest basal segment, filling the posterior part of the right lower lobe base beside the vertebrae. It is a common site of aspiration in an upright patient and of basal pneumonia. On the model, find the broad posterior wedge at the bottom of the right lung.",
  },

  // Left lung segments
  se_apical: {
    text: "**Left apical segment** (B1) is the top of the left upper lobe. On the left it usually fuses with the posterior segment to form the apicoposterior segment B1+2, though the model shows it separately. It lies against the pleural cupula. On the model, find the cap of the left lung at the thoracic inlet.",
  },
  se_post: {
    text: "**Left posterior segment** (B2) occupies the back of the left upper lobe, behind the apical and anterior segments. It usually joins B1 as the apicoposterior segment; its bronchus arises from the upper lobe bronchus. On the model, look at the posterior part of the left upper lobe, above the oblique fissure.",
  },
  se_ant: {
    text: "**Left anterior segment** (B3) is the anterior part of the left upper lobe, behind the anterior chest wall. It lies above the lingula and in front of the apical and posterior segments. On the model, find it at the front of the left upper lobe, above the cardiac notch.",
  },
  se_lsup: {
    text: "**Superior lingular segment** (B4) is the upper half of the lingula, the tongue-like part of the left upper lobe that corresponds to the right middle lobe. It lies against the left heart border above the inferior lingular segment. On the model, find the upper part of the lingula, above the cardiac notch.",
  },
  se_linf: {
    text: "**Inferior lingular segment** (B5) is the lower half of the lingula. It lies against the left ventricle and, when consolidated, obscures the left heart border on a frontal radiograph. On the model, find it below the superior lingular segment, at the lower edge of the left upper lobe.",
  },
  se_sup: {
    text: "**Left superior segment** (B6) is the top of the left lower lobe, behind the oblique fissure and above the basal segments. Its bronchus arises first from the lower lobe bronchus and runs posteriorly. It is a site of aspiration in supine patients. On the model, find the crown of the left lower lobe behind the hilum.",
  },
  se_bmed: {
    text: "**Left medial basal segment** (B7) is the medial part of the left lower lobe base, next to the heart and esophagus. On the left it usually joins the anterior basal segment as the anteromedial basal segment B7+8, so it is less often independent than on the right. On the model, find the inner base of the left lung.",
  },
  se_bant: {
    text: "**Left anterior basal segment** (B8) forms the anterior part of the left lower lobe base, behind the lingula and above the diaphragm. It often fuses with B7. On the model, look at the front of the left lower lobe, below the oblique fissure.",
  },
  se_blat: {
    text: "**Left lateral basal segment** (B9) occupies the lateral part of the left lower lobe base, against the chest wall. Its bronchus is the last basal branch in many lungs. On the model, find it at the outer edge of the left lower lobe, above the diaphragm.",
  },
  se_bpost: {
    text: "**Left posterior basal segment** (B10) is the largest basal segment, filling the posterior part of the left lower lobe beside the vertebrae. It is a common site of aspiration in an upright patient and of basal pneumonia. On the model, find the broad posterior wedge at the bottom of the left lung.",
  },
  // Mediastinum
  diafragma: {
    text: "**Diaphragm** is the dome-shaped muscle separating the thorax from the abdomen. Its central tendon is pierced by the inferior vena cava at T8; the esophagus passes at T10 and the aorta at T12. The right crus arises from L1–L3 and the left from L1–L2, and the phrenic nerve, C3–C5, supplies it. On the model, find the floor beneath the lungs.",
  },
  eso_art: {
    text: "**Esophageal artery** is a small branch of the descending thoracic aorta that runs to the esophagus behind the left atrium. Several such branches usually arise instead of one trunk, and they anastomose with esophageal branches of the inferior thyroid and left gastric arteries. On the model, find the fine vessel on the esophageal wall behind the heart.",
  },
  azigo_acs: {
    text: "**Accessory hemiazygos vein** descends on the left side of the upper thoracic vertebrae and drains the left 4th–8th posterior intercostal veins. It crosses to the azygos vein at about T8, above the hemiazygos, or may join the left superior intercostal vein. On the model, find it in the upper left posterior thorax crossing rightward.",
  },
  ita_d: {
    text: "**Right internal thoracic artery** arises from the first part of the right subclavian artery and descends vertically behind the right costal cartilages, about 1–2 cm from the sternal edge. It gives anterior intercostal branches and ends as the musculophrenic and superior epigastric arteries. On the model, find the vertical vessel behind the ribs.",
  },
  ita_e: {
    text: "**Left internal thoracic artery** arises from the first part of the left subclavian artery and descends behind the left costal cartilages, 1–2 cm lateral to the sternal edge. It gives anterior intercostal branches and ends as the musculophrenic and superior epigastric arteries. On the model, find the vertical vessel behind the ribs.",
    clinical: "It is the standard conduit for coronary bypass to the LAD.",
  },
  itv_d: {
    text: "**Right internal thoracic vein** ascends beside the right internal thoracic artery behind the costal cartilages. It receives the anterior intercostal veins and ends near the right brachiocephalic vein. Its tributaries anastomose with posterior intercostal veins, forming a collateral route. On the model, find the thin vein alongside the artery.",
  },
  itv_e: {
    text: "**Left internal thoracic vein** ascends beside the left internal thoracic artery behind the costal cartilages. It receives the left anterior intercostal veins and drains into the left brachiocephalic vein. On the model, find the thin vein medial to the artery, close to the sternal edge.",
  },
  pica_d1: {
    text: "**Right first posterior intercostal artery** runs in the first right intercostal space behind the pleura. Unlike lower intercostal arteries, it usually arises from the costocervical trunk rather than the descending aorta. It supplies the chest wall and parietal pleura and anastomoses with the anterior intercostal arteries. On the model, find it high in the right posterior thorax.",
  },
  pica_e1: {
    text: "**Left first posterior intercostal artery** runs in the first left intercostal space behind the pleura. It usually arises from the costocervical trunk through the superior intercostal artery. It supplies the chest wall and parietal pleura and joins the anterior intercostal circulation. On the model, find it high in the left posterior thorax.",
  },
  pica_d2: {
    text: "**Right second posterior intercostal artery** runs in the second right intercostal space, usually from the superior intercostal branch of the costocervical trunk. It accompanies the posterior intercostal vein and nerve between the pleura and the internal intercostal membrane. On the model, find it one space below the first.",
  },
  pica_e2: {
    text: "**Left second posterior intercostal artery** runs in the second left intercostal space, usually from the superior intercostal branch of the costocervical trunk. It passes between the internal and innermost intercostal muscles and anastomoses with anterior intercostal arteries. On the model, find it one space below the first on the left.",
  },
  pica_sup_d: {
    text: "**Right superior intercostal artery** arises from the right costocervical trunk and descends in the upper posterior intercostal spaces. It usually gives the first and second posterior intercostal arteries and runs behind the pleura. On the model, find the short trunk high in the right posterior thorax, giving the upper intercostal branches.",
  },
  pica_sup_e: {
    text: "**Left superior intercostal artery** arises from the left costocervical trunk and descends in the upper posterior intercostal spaces. It gives the first and second posterior intercostal arteries and contributes collateral flow between the subclavian and aortic territories. On the model, find it high in the left posterior thorax.",
  },
  icv_ant_d: {
    text: "**Right anterior intercostal veins** run in the anterior intercostal spaces and drain toward the right internal thoracic vein. They accompany the anterior intercostal arteries and drain the anterior chest wall and parietal pleura. They anastomose with posterior intercostal veins around the chest wall. On the model, find the thin venous set near the right sternal edge.",
  },
  icv_ant_e: {
    text: "**Left anterior intercostal veins** run in the anterior intercostal spaces and drain toward the left internal thoracic vein. They accompany the anterior intercostal arteries and provide collateral communication with the azygos system. On the model, find the thin venous set near the left sternal edge.",
  },
  phren_inf_a_d: {
    text: "**Right inferior phrenic artery** arises from the abdominal aorta below the diaphragm and ascends onto the underside of the right diaphragm, passing behind the inferior vena cava. It supplies the diaphragm and gives superior suprarenal branches. On the model, find it on the abdominal surface of the right dome.",
  },
  phren_inf_a_e: {
    text: "**Left inferior phrenic artery** arises from the abdominal aorta below the diaphragm and ascends onto the underside of the left diaphragm, passing behind the esophagus. It supplies the diaphragm and gives superior suprarenal branches, anastomosing with lower intercostal arteries. On the model, find it on the abdominal surface of the left dome.",
  },
  phren_inf_v: {
    text: "**Inferior phrenic veins** accompany the inferior phrenic arteries on the underside of the diaphragm. The right usually drains into the inferior vena cava, while the left often drains into the left suprarenal or left renal vein. On the model, find the thin veins on the abdominal surface of the diaphragm.",
  },
  phren_sup_v: {
    text: "**Superior phrenic veins** are small veins on the upper surface of the diaphragm, between it and the pericardium. They accompany the superior phrenic arteries and drain into pericardiophrenic and internal thoracic veins, forming part of the collateral venous channels. On the model, find them on the thoracic surface of the diaphragm.",
  },

  // Thoracic skeleton
  manubrio: {
    text: "**Manubrium** is the upper segment of the sternum, between the clavicular notches and above the sternal angle. It articulates with both clavicles and the first costal cartilages, and its lower border meets the body at T4–T5. The jugular notch is its superior midline depression. On the model, find the broad plate at the top of the breastbone.",
  },
  esterno: {
    text: "**Body of the sternum** is the long flat segment below the manubrium, articulating with costal cartilages 2–7. The sternal angle marks its junction with the manubrium, and it lies anterior to the right ventricle and ascending aorta. On the model, find the central plate of the breastbone between the costal cartilages.",
  },
  xifoide: {
    text: "**Xiphoid process** is the small inferior tip of the sternum at about T9. It ossifies late, varies in shape, and forms the xiphisternal joint with the sternal body. Chest compressions are delivered on the lower sternum above it, avoiding the xiphoid. On the model, find the pointed tip at the bottom of the breastbone.",
  },
  claviculas: {
    text: "**Clavicles** are paired S-shaped bones at the thoracic inlet. The medial end articulates with the manubrium and the lateral end with the acromion; the clavicle is the first fetal bone to begin ossification. Fractures usually occur at the junction of its middle and lateral thirds. On the model, find the two struts from breastbone to shoulder.",
  },
  cart_costais: {
    text: "**Costal cartilages** are bars of hyaline cartilage between the ribs and the sternum. Ribs 1–7 connect directly to the sternum, ribs 8–10 join the costal margin above, and they provide elasticity for chest expansion. They calcify with age. On the model, find the pale bars between ribs and breastbone.",
  },
  costela_1: {
    text: "**First rib** is the shortest, broadest and most sharply curved rib at the thoracic inlet. Its scalene tubercle separates grooves for the subclavian vein and artery, and it articulates with T1 and the manubrium. On the model, find the tight ring at the very top of the rib cage.",
  },
  costela_2: {
    text: "**Second rib** is a typical rib whose costal cartilage marks the sternal angle. It articulates with T2 and the sternal body, and the second intercostal space is a standard auscultation landmark. On the model, find the rib just below the first, at the level of the angle of Louis.",
  },
  costela_4: {
    text: "**Fourth rib** is a mid-thoracic typical rib at nipple level in men. It articulates with T4, and the fourth intercostal space in the midaxillary line is used for chest drain insertion. It overlies the middle of the cardiac silhouette. On the model, find the rib at the mid-chest, above the apex.",
  },
  costela_5: {
    text: "**Fifth rib** is a typical rib at the level of the cardiac apex. It articulates with T5, and the fifth intercostal space near the midclavicular line overlies the apex beat. On the model, find the rib crossing the lower cardiac border.",
  },
  costelas_rest: {
    text: "**Ribs 3 and 6–12** complete the thoracic cage. Ribs 3–9 are typical, with head, neck, tubercle and angle; ribs 8–10 attach indirectly through costal cartilages, and ribs 11–12 are floating. They protect the lungs, pleura and upper abdominal organs. On the model, find the remaining bars around the sides and back of the chest.",
  },
  vertebras_toracicas: {
    text: "**Thoracic vertebrae** are twelve vertebrae with costal facets that form the posterior thoracic wall. T1–T10 bear demifacets for rib heads, while T11–T12 have single facets; they contribute to the thoracic kyphosis. Their intervertebral foramina transmit thoracic spinal nerves. On the model, find the column behind the ribs.",
  },
};

export const REGION_OVERVIEW = {
  camaras: "The heart has four chambers: two thin-walled atria that receive blood and two ventricles that pump it out. They sit in the middle mediastinum behind the sternum, with the right side serving the lungs and the left side the body.",
  vasos: "The great vessels are the large conduits that enter and leave the heart. The aorta and its branches carry systemic blood, the venae cavae return it, and the pulmonary arteries and veins connect the right ventricle and left atrium to the lungs.",
  valvas: "The heart valves keep blood moving in one direction. Atrioventricular valves guard the inlet orifices and semilunar valves guard the outflow tracts; all are anchored to the fibrous skeleton of the heart and open or close with the pressure changes of the cardiac cycle.",
  coronarias: "The coronary arteries arise from the aortic sinuses and run in the grooves on the heart's surface. The right coronary artery follows the right atrioventricular groove, while the left main trunk divides into the anterior interventricular and circumflex branches.",
  veias: "Most cardiac veins drain into the coronary sinus, a wide channel in the posterior atrioventricular groove that opens into the right atrium. The great, middle and small cardiac veins follow the main arterial grooves and return blood from the myocardium.",
  vias: "The trachea is the main airway between the larynx and the lungs. It descends in the midline, divides at the carina into two main bronchi, and each bronchus enters a hilum to supply one lung.",
  segd: "The right lung has three lobes divided by oblique and horizontal fissures. Each lobe is made of bronchopulmonary segments with their own bronchus and artery, which is why this region is taught segment by segment.",
  sege: "The left lung has two lobes divided by the oblique fissure. Its upper lobe includes the lingula, a tongue-like part corresponding to the right middle lobe, and its lower lobe mirrors the right lower lobe segments.",
  mediastino: "The mediastinum is the central compartment between the two pleural cavities. It holds the heart and pericardium, the great vessels, the airway, the esophagus and the thoracic duct, and its contents are arranged from the sternum in front to the vertebral column behind.",
};

export const LEVEL_OVERVIEW = {
  "camaras-1": "The heart has four chambers: two thin-walled atria that receive blood and two ventricles that pump it out. They sit in the middle mediastinum behind the sternum, with the right side serving the lungs and the left side the body. This level shows the chambers and the shared muscular wall that gives the heart its shape.",
  "vasos-1": "The aorta is the body's main arterial trunk. It leaves the left ventricle, ascends, arches over the left main bronchus and descends behind the heart, giving three branches to the head, neck and arms. This level follows that course and the branches that spring from the arch.",
  "vasos-2": "The venae cavae return systemic blood to the right atrium. The superior vena cava drains the head, neck, arms and thorax; the inferior vena cava drains everything below the diaphragm. Both enter the right atrium, and the brachiocephalic veins form the upper one behind the sternum.",
  "vasos-3": "The pulmonary arteries carry deoxygenated blood from the right ventricle to the lungs. The pulmonary trunk leaves the front of the heart and divides beneath the aortic arch into right and left branches, which enter the hila and follow the airways. This level traces that low-pressure circuit.",
  "vasos-4": "Four pulmonary veins return oxygenated blood from the lungs to the left atrium. Two come from each lung and enter the smooth posterior wall of the atrium, which forms most of the heart's base. They are the only veins in the body that carry oxygen-rich blood.",
  "vasos-5": "The mediastinum holds the heart and the structures around it. Behind the heart run the azygos and hemiazygos veins and the esophagus; in front of the great vessels lies the thymus. This level introduces those neighbours, which explain many of the heart's posterior and anterior relations.",
  "valvas-1": "The atrioventricular valves guard the openings between atria and ventricles. The tricuspid valve on the right has three leaflets; the mitral valve on the left has two. They hang from fibrous rings, are tethered by chordae to papillary muscles, and close during ventricular systole.",
  "valvas-2": "The semilunar valves guard the two outflow tracts. The pulmonary valve sits anterior and superior, leading to the lungs; the aortic valve sits centrally, leading to the body. Each has three thin cusps with a nodule and lunules, and neither has chordae.",
  "valvas-3": "Papillary muscles are ventricular muscles that anchor the atrioventricular valve leaflets through chordae tendineae. They contract during systole, tightening the chordae so the leaflets meet without prolapsing. This level contrasts the three right ventricular muscles with the single large anterolateral muscle of the left ventricle.",
  "coronarias-1": "The coronary arteries arise from the aortic sinuses and run in the grooves on the heart's surface. The right coronary artery follows the right atrioventricular groove; the left main trunk divides into the anterior interventricular and circumflex branches. Together they supply the entire myocardium.",
  "coronarias-2": "The anterior interventricular artery, or LAD, runs in the anterior groove toward the apex. Its diagonal branches cross the anterior left ventricular wall, while its septal perforators dive into the interventricular septum. This level follows those branches and their smaller ventricular twigs.",
  "coronarias-3": "The right coronary artery gives branches to the right ventricular walls and, at the crux, the posterior descending artery. The right marginal branch follows the acute margin; posterior ventricular branches cross the diaphragmatic surface. Their territory depends on coronary dominance.",
  "veias-1": "Most cardiac veins drain into the coronary sinus, a wide channel in the posterior atrioventricular groove that opens into the right atrium. The great cardiac vein follows the LAD, the middle cardiac vein follows the PDA, and the small cardiac vein follows the right coronary artery. This level traces that drainage.",
  "vias-1": "The trachea is the main airway between the larynx and the lungs. It descends in the midline, divides at the carina into two main bronchi, and each bronchus enters a hilum to supply one lung. The right bronchus is wider and steeper, the left longer and more horizontal.",
  "segd-1": "The right lung has three lobes. The upper lobe carries apical, posterior and anterior segments; the middle lobe has lateral and medial segments. Each segment has its own bronchus and artery, so this level maps the six segments above the oblique fissure.",
  "segd-2": "The right lower lobe lies below the oblique fissure. It has a superior segment at the top and four basal segments at the bottom: medial, anterior, lateral and posterior. This level maps those five segments and their relations to the diaphragm, heart and chest wall.",
  "sege-1": "The left lung has two lobes. The upper lobe carries apical, posterior and anterior segments plus the lingula, a tongue-like projection with superior and inferior segments that corresponds to the right middle lobe. This level maps the five segments above the oblique fissure.",
  "sege-2": "The left lower lobe lies below the oblique fissure. It mirrors the right lower lobe with a superior segment and four basal segments, although the medial and anterior basal segments often fuse. This level maps those five segments around the left hemidiaphragm and heart.",
  "mediastino-1": "The mediastinum is the central compartment between the two pleural cavities. It contains the heart and pericardium, the great vessels, the trachea, the esophagus, the thoracic duct and nerves. This level focuses on the central compartment, its posterior neighbours and the thymus in front.",
  "mediastino-2": "The diaphragm is the muscular floor of the thorax and the principal muscle of breathing. Its right and left domes are supplied by the phrenic nerves and by vessels that reach them from above and below. This level follows the inferior and superior phrenic vessels onto its surfaces.",
  "mediastino-3": "The thoracic wall is supplied by two arterial systems that meet around each rib. The internal thoracic artery runs behind the costal cartilages in front; posterior intercostal arteries run behind the pleura at the back. Their veins follow the same routes. This level traces those vessels.",
  "mediastino-4": "The thoracic skeleton is the bony frame that protects the heart and lungs. The sternum forms the front, the ribs and costal cartilages form the sides, and the thoracic vertebrae form the back. This level identifies the landmarks used to count ribs and locate the heart.",
};

export const LEVEL_CONTRAST = {
  "camaras-1": {
    a: "vd", b: "ve", title: "Right or left ventricle",
    text: "Both are lower chambers, but the right ventricle is anterior, crescent-shaped and 3–5 mm thick, with a moderator band and an outflow conus. The left ventricle forms the apex, has a 10–15 mm wall and a smooth aortic vestibule. On the model, the apex belongs to the left; the broad front belongs to the right.",
  },
  "vasos-1": {
    a: "aoasc", b: "arco", title: "Ascending aorta or aortic arch",
    text: "The ascending aorta is the straight intrapericardial segment that begins at the aortic valve and gives the coronary arteries. The arch is its continuation, curving backward over the left main bronchus and giving the three branches to the head, neck and arm. Straight and coronary-bearing versus curved and branching separates them.",
  },
  "vasos-2": {
    a: "vcs", b: "vci", title: "Superior or inferior vena cava",
    text: "Both enter the right atrium, but from opposite ends. The superior vena cava descends from above, formed by the brachiocephalic veins at the first right costal cartilage; the inferior vena cava ascends from below through the diaphragm at T8. On the model, the upper vertical tube is the SVC, the lower one the IVC.",
  },
  "vasos-3": {
    a: "apd", b: "ape", title: "Right or left pulmonary artery",
    text: "Both branch from the pulmonary trunk under the aortic arch. The right artery is longer and passes behind the ascending aorta and superior vena cava; the left is shorter, passes in front of the descending aorta and is tethered to the arch by the ligamentum arteriosum. Follow the side of the hilum.",
  },
  "vasos-4": {
    a: "vpsd", b: "vpid", title: "Superior or inferior pulmonary vein",
    text: "Four veins enter the left atrium, two on each side. The superior veins enter the upper corners of the posterior atrial wall and drain the upper lobes, plus the middle lobe on the right; the inferior veins enter below and drain the lower lobes. Compare their vertical level at the hilum.",
  },
  "vasos-5": {
    a: "azigo", b: "hemiazigo", title: "Azygos or hemiazygos vein",
    text: "The azygos runs on the right of the vertebrae and arches over the right hilum into the superior vena cava. The hemiazygos runs on the left and crosses to the azygos at about T8. Side and level separate them: right and high versus left and low.",
  },
  "valvas-1": {
    a: "tri_sep", b: "mit_ant", title: "Tricuspid or mitral leaflet",
    text: "The tricuspid valve has three leaflets and sits on the right; the mitral has two and sits on the left. A reliable model cue is the septal tricuspid leaflet, whose attachment is more apical than the anterior mitral leaflet. The mitral valve also lies in fibrous continuity with the aortic valve.",
  },
  "valvas-2": {
    a: "pulm_post", b: "ao_ant", title: "Pulmonary or aortic valve",
    text: "The pulmonary valve is anterior and superior, at the front of the outflow tract; the aortic valve is central, behind it. Both have three cusps, but only the aortic cusps have coronary ostia in their sinuses. From the front, the pulmonary root hides the aortic root.",
  },
  "valvas-3": {
    a: "pap_vd_ant", b: "pap_ve_al", title: "Right or left papillary muscle",
    text: "The right ventricle has three papillary muscles; its anterior one is the largest and receives the moderator band. The left ventricle has two; the anterolateral is large and has a dual blood supply. Chamber side and wall position tell them apart.",
  },
  "coronarias-1": {
    a: "acd", b: "cx", title: "Right coronary or circumflex",
    text: "Both run in atrioventricular grooves. The right coronary artery follows the right groove around the acute margin toward the crux; the circumflex follows the left groove around the obtuse margin. Look at which side of the heart the vessel curves.",
  },
  "coronarias-2": {
    a: "diag", b: "vent_ant_d_dae", title: "Diagonal or right anterior branch",
    text: "Both leave the anterior interventricular artery. The diagonal branches run laterally across the left ventricular wall; the right anterior ventricular branches cross the groove onto the right ventricular wall. Side of the groove is the discriminator.",
  },
  "coronarias-3": {
    a: "vent_ant_acd", b: "vent_post_acd", title: "Anterior or posterior ventricular branch",
    text: "Both are right coronary branches to the ventricular walls. The anterior ventricular branch crosses the front of the right ventricle; the posterior ventricular branches cross the diaphragmatic surface toward the left ventricle. Front versus underside is the quickest cue.",
  },
  "veias-1": {
    a: "vcmagna", b: "vcmedia", title: "Great or middle cardiac vein",
    text: "Both are named for their groove. The great cardiac vein ascends in the anterior interventricular groove beside the LAD, then turns into the coronary sinus. The middle cardiac vein runs in the posterior interventricular groove beside the PDA. Anterior versus posterior is the discriminator.",
  },
  "vias-1": {
    a: "bpd", b: "bpe", title: "Right or left main bronchus",
    text: "The right main bronchus is shorter, wider and steeper, almost continuing the tracheal line. The left is longer, narrower and more horizontal, passing under the aortic arch. At the carina, the steeper branch goes right.",
  },
  "segd-1": {
    a: "sd_lat", b: "sd_med", title: "Lateral or medial middle lobe segment",
    text: "Both belong to the right middle lobe. The lateral segment B4 faces the chest wall; the medial segment B5 faces the heart and silhouettes the right atrial border. Look at the inner or outer surface of the middle lobe.",
  },
  "segd-2": {
    a: "sd_sup", b: "sd_bpost", title: "Superior or posterior basal segment",
    text: "Both lie in the right lower lobe. The superior segment B6 is at the top of the lobe, behind the hilum; the posterior basal segment B10 is at the bottom, beside the vertebrae. Top versus bottom of the lower lobe separates them.",
  },
  "sege-1": {
    a: "se_lsup", b: "se_linf", title: "Superior or inferior lingular segment",
    text: "The lingula has two halves. The superior lingular segment B4 is above, the inferior B5 below, against the left ventricle. The inferior one silhouettes the left heart border when consolidated; the superior one sits higher in the lingula.",
  },
  "sege-2": {
    a: "se_sup", b: "se_bpost", title: "Superior or posterior basal segment",
    text: "Both lie in the left lower lobe. The superior segment B6 caps the lobe behind the hilum; the posterior basal segment B10 fills the bottom beside the vertebrae. Find the top of the lobe versus its posterior base.",
  },
  "mediastino-1": {
    a: "hemiazigo", b: "azigo_acs", title: "Hemiazygos or accessory hemiazygos vein",
    text: "Both run on the left of the vertebrae. The hemiazygos drains the lower left posterior intercostal veins and crosses to the azygos at about T8. The accessory hemiazygos drains the middle left spaces and crosses above it, or joins the left superior intercostal vein. Lower versus upper is the cue.",
  },
  "mediastino-2": {
    a: "phren_inf_a_d", b: "phren_inf_a_e", title: "Right or left inferior phrenic artery",
    text: "Both arise below the diaphragm and climb onto its underside. The right passes behind the inferior vena cava; the left passes behind the esophagus. Side of the cava versus side of the esophagus is the quickest cue.",
  },
  "mediastino-3": {
    a: "ita_d", b: "pica_d1", title: "Internal thoracic or posterior intercostal artery",
    text: "Both supply the chest wall. The internal thoracic artery runs vertically behind the costal cartilages near the sternum; the posterior intercostal arteries run horizontally in the spaces at the back, behind the pleura. Front-vertical versus back-horizontal separates them.",
  },
  "mediastino-4": {
    a: "manubrio", b: "esterno", title: "Manubrium or body of the sternum",
    text: "Both are parts of the sternum. The manubrium is the upper plate between the clavicles, bearing the jugular notch; the body is the long plate below it, from the sternal angle to the xiphoid. The angle of Louis is the joint between them.",
  },
};

export const LEVEL_CHECK = {
  "camaras-1": [
    { q: "Which chamber forms the apex and has the thickest wall?", options: ["Left ventricle", "Right ventricle", "Right atrium", "Left atrium"], answer: 0, why: "The left ventricle forms the apex and its wall is 10–15 mm thick, about three times the right ventricular wall." },
    { q: "Which chamber receives the superior and inferior venae cavae?", options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"], answer: 0, why: "The right atrium forms the right border and receives the SVC above, the IVC below and the coronary sinus behind." },
    { q: "Which structure is the shared muscular wall of both ventricles?", options: ["Ventricular myocardium", "Right atrium", "Left atrium", "Pulmonary trunk"], answer: 0, why: "The ventricular myocardium is 3–5 mm thick on the right and 10–15 mm on the left; it is a wall, not a chamber." },
  ],
  "vasos-1": [
    { q: "Which branch of the aortic arch arises first?", options: ["Brachiocephalic trunk", "Left common carotid artery", "Left subclavian artery", "Right subclavian artery"], answer: 0, why: "The brachiocephalic trunk is the first branch, followed by the left common carotid and left subclavian arteries." },
    { q: "At which level does the aortic arch begin and end?", options: ["T4, at the sternal angle", "T1, at the thoracic inlet", "T8, at the caval opening", "T12, at the aortic hiatus"], answer: 0, why: "The arch runs from the ascending to the descending aorta at the sternal angle, about T4, where the ligamentum arteriosum also attaches." },
    { q: "Which part of the aorta gives rise to the coronary arteries?", options: ["Ascending aorta", "Aortic arch", "Descending thoracic aorta", "Pulmonary trunk"], answer: 0, why: "The right and left coronary arteries arise from the aortic sinuses of the ascending aorta." },
  ],
  "vasos-2": [
    { q: "Which vein enters the right atrium after passing through the diaphragm at T8?", options: ["Inferior vena cava", "Superior vena cava", "Azygos vein", "Coronary sinus"], answer: 0, why: "The inferior vena cava pierces the central tendon of the diaphragm at T8 on its way to the right atrium." },
    { q: "The superior vena cava is formed by the union of which vessels?", options: ["The two brachiocephalic veins", "The right internal jugular and subclavian veins", "The azygos and hemiazygos veins", "The four pulmonary veins"], answer: 0, why: "The right and left brachiocephalic veins join behind the first right costal cartilage to form the superior vena cava." },
    { q: "Which vein crosses anterior to the branches of the aortic arch?", options: ["Left brachiocephalic vein", "Right brachiocephalic vein", "Azygos vein", "Superior vena cava"], answer: 0, why: "The left brachiocephalic vein is long and oblique, crossing the midline in front of the arch branches." },
  ],
  "vasos-3": [
    { q: "The pulmonary trunk divides beneath which structure?", options: ["Aortic arch", "Sternum", "Right atrium", "Diaphragm"], answer: 0, why: "The pulmonary trunk bifurcates beneath the aortic arch at about T4–T5." },
    { q: "Which pulmonary artery passes behind the ascending aorta and superior vena cava?", options: ["Right pulmonary artery", "Left pulmonary artery", "Pulmonary trunk", "Right upper lobar artery"], answer: 0, why: "The longer right pulmonary artery runs behind the ascending aorta and SVC to reach the right hilum." },
    { q: "Which structure connects the left pulmonary artery to the aortic arch?", options: ["Ligamentum arteriosum", "Azygos vein", "Coronary sinus", "Trachea"], answer: 0, why: "The ligamentum arteriosum, the remnant of the fetal ductus arteriosus, tethers the left pulmonary artery to the arch." },
  ],
  "vasos-4": [
    { q: "How many pulmonary veins enter the left atrium?", options: ["Four", "Two", "Three", "Six"], answer: 0, why: "Two superior and two inferior pulmonary veins enter the posterior wall of the left atrium." },
    { q: "Which pulmonary vein drains the right middle lobe?", options: ["Right superior pulmonary vein", "Right inferior pulmonary vein", "Left superior pulmonary vein", "Left inferior pulmonary vein"], answer: 0, why: "The right superior pulmonary vein drains both the right upper and middle lobes." },
    { q: "Pulmonary veins carry which blood?", options: ["Oxygenated blood to the left atrium", "Deoxygenated blood to the lungs", "Blood to the right atrium", "Lymph to the thoracic duct"], answer: 0, why: "Pulmonary veins are the only veins carrying oxygen-rich blood, returning it from the lungs to the left atrium." },
  ],
  "vasos-5": [
    { q: "Which vein arches over the right lung root?", options: ["Azygos vein", "Hemiazygos vein", "Left brachiocephalic vein", "Right superior pulmonary vein"], answer: 0, why: "The azygos vein arches anteriorly over the right lung root before joining the superior vena cava at T4." },
    { q: "The hemiazygos vein crosses to the azygos vein at about which level?", options: ["T8", "T4", "T10", "T12"], answer: 0, why: "The hemiazygos crosses the midline at about T8, below the accessory hemiazygos." },
    { q: "Where does the thymus lie?", options: ["Anterior to the great vessels in the superior mediastinum", "Posterior to the esophagus", "In the middle mediastinum behind the heart", "Below the diaphragm"], answer: 0, why: "The thymus occupies the anterior superior mediastinum, behind the manubrium and in front of the great vessels." },
  ],
  "valvas-1": [
    { q: "Which atrioventricular valve has three leaflets?", options: ["Tricuspid", "Mitral", "Aortic", "Pulmonary"], answer: 0, why: "The tricuspid valve has anterior, posterior and septal leaflets; the mitral valve has anterior and posterior leaflets." },
    { q: "Which leaflet lies in fibrous continuity with the aortic valve?", options: ["Anterior mitral leaflet", "Septal tricuspid leaflet", "Posterior mitral leaflet", "Anterior tricuspid leaflet"], answer: 0, why: "The anterior mitral leaflet and the aortic root share a fibrous curtain, the mitral–aortic continuity." },
    { q: "The septal tricuspid leaflet attaches in which position?", options: ["More apically than the anterior mitral leaflet", "More basally than the anterior mitral leaflet", "To the aortic sinus", "To the pulmonary trunk"], answer: 0, why: "Its more apical attachment is a standard echocardiographic landmark for identifying the right-sided valve." },
  ],
  "valvas-2": [
    { q: "Which valve lies most anteriorly?", options: ["Pulmonary", "Aortic", "Mitral", "Tricuspid"], answer: 0, why: "The pulmonary valve is anterior and superior to the aortic valve, at the front of the outflow tract." },
    { q: "Which aortic cusp has no coronary ostium in its sinus?", options: ["Noncoronary cusp", "Right coronary cusp", "Left coronary cusp", "Posterior pulmonary cusp"], answer: 0, why: "The noncoronary cusp is the right-posterior cusp; the right and left coronary cusps give the coronary arteries." },
    { q: "How are semilunar cusps anchored?", options: ["They attach to the arterial wall without chordae", "By chordae to papillary muscles", "By the moderator band", "By the coronary sinus"], answer: 0, why: "Semilunar cusps have no chordae; they attach to the fibrous ring and arterial wall and close by pressure differences." },
  ],
  "valvas-3": [
    { q: "Which papillary muscle receives the moderator band?", options: ["Anterior right ventricular papillary muscle", "Posterior right ventricular papillary muscle", "Septal right ventricular papillary muscle", "Anterolateral left ventricular papillary muscle"], answer: 0, why: "The septomarginal trabecula, or moderator band, crosses the right ventricular cavity to the base of the anterior papillary muscle." },
    { q: "Which papillary muscle has a dual blood supply?", options: ["Anterolateral left ventricular papillary muscle", "Anterior right ventricular papillary muscle", "Septal right ventricular papillary muscle", "Posterior right ventricular papillary muscle"], answer: 0, why: "The anterolateral muscle is supplied by both the LAD and circumflex, making it more resistant to ischaemia." },
  ],
  "coronarias-1": [
    { q: "Which artery runs in the right atrioventricular groove?", options: ["Right coronary artery", "Circumflex artery", "LAD", "Posterior descending artery"], answer: 0, why: "The right coronary artery curves around the right border in the right atrioventricular groove." },
    { q: "The left main coronary artery divides into which branches?", options: ["LAD and circumflex", "RCA and circumflex", "LAD and PDA", "RCA and PDA"], answer: 0, why: "The short left main trunk divides into the anterior interventricular and circumflex arteries." },
    { q: "Which artery supplies the SA node in about 60% of people?", options: ["Right coronary artery", "Left circumflex artery", "LAD", "Left main coronary artery"], answer: 0, why: "A branch of the right coronary artery reaches the SA node in most hearts." },
  ],
  "coronarias-2": [
    { q: "Which vessel runs in the anterior interventricular groove?", options: ["LAD", "Circumflex", "RCA", "PDA"], answer: 0, why: "The anterior interventricular branch, or LAD, runs in the anterior groove toward the apex." },
    { q: "Septal branches of the LAD supply which part of the septum?", options: ["The anterior two-thirds", "The posterior third", "The whole right atrium", "The mitral valve"], answer: 0, why: "Anterior septal perforators supply the anterior two-thirds of the interventricular septum." },
    { q: "Diagonal branches of the LAD run where?", options: ["Across the anterior left ventricular wall", "Into the interventricular septum", "Along the right border", "In the posterior groove"], answer: 0, why: "Diagonal branches leave the LAD at an acute angle and cross the anterolateral left ventricular wall." },
  ],
  "coronarias-3": [
    { q: "Which artery defines coronary dominance?", options: ["The artery that gives the posterior descending branch", "The right coronary artery in every heart", "The circumflex in every heart", "The left main coronary artery"], answer: 0, why: "Dominance is defined by which artery supplies the posterior descending branch and the inferior septum." },
    { q: "The right marginal branch runs along which margin?", options: ["The acute margin of the right ventricle", "The obtuse margin of the left ventricle", "The anterior interventricular groove", "The posterior interventricular groove"], answer: 0, why: "The right marginal branch follows the acute inferior margin of the right ventricle." },
    { q: "Posterior ventricular branches of the RCA supply which surface?", options: ["The diaphragmatic surface of the left ventricle in right-dominant hearts", "The anterior right atrium", "The septum only", "The pulmonary trunk"], answer: 0, why: "Posterolateral branches cross the diaphragmatic surface toward the left ventricle in right-dominant hearts." },
  ],
  "veias-1": [
    { q: "Most cardiac veins drain into which structure?", options: ["Coronary sinus", "Superior vena cava", "Pulmonary veins", "Inferior vena cava"], answer: 0, why: "The coronary sinus collects most myocardial venous blood and opens into the right atrium." },
    { q: "The great cardiac vein begins beside which artery?", options: ["LAD", "RCA", "PDA", "Circumflex"], answer: 0, why: "It ascends in the anterior interventricular groove beside the LAD before turning into the coronary sinus." },
    { q: "The middle cardiac vein runs with which artery?", options: ["Posterior descending artery", "Right coronary artery", "LAD", "Circumflex"], answer: 0, why: "The middle cardiac vein lies in the posterior interventricular groove beside the PDA." },
  ],
  "vias-1": [
    { q: "At which level does the trachea divide?", options: ["T4–T5, at the carina", "C6", "T10", "T12"], answer: 0, why: "The carina lies at the level of the sternal angle, about T4–T5." },
    { q: "Which main bronchus is shorter, wider and more vertical?", options: ["Right", "Left", "Both are equal", "Neither"], answer: 0, why: "The right main bronchus is shorter, wider and steeper, which is why aspirated objects favour it." },
    { q: "Which structure does the left main bronchus pass beneath?", options: ["Aortic arch", "Pulmonary trunk", "Superior vena cava", "Azygos vein"], answer: 0, why: "The left main bronchus passes under the aortic arch on its way to the left hilum." },
  ],
  "segd-1": [
    { q: "Which segments form the right upper lobe?", options: ["Apical, posterior and anterior", "Lateral and medial", "Superior and basal", "Apical and lingular"], answer: 0, why: "The right upper lobe has apical B1, posterior B2 and anterior B3 segments." },
    { q: "Which middle lobe segment lies against the heart?", options: ["Medial segment B5", "Lateral segment B4", "Superior segment B6", "Posterior segment B2"], answer: 0, why: "The medial segment B5 lies next to the right heart border and can produce a silhouette sign." },
    { q: "Which segment is a classic site of reactivation tuberculosis?", options: ["Posterior segment of the right upper lobe B2", "Medial segment of the middle lobe B5", "Anterior basal segment B8", "Apical segment B1"], answer: 0, why: "The posterior segment B2 is a classic site for reactivation tuberculosis and supine aspiration." },
  ],
  "segd-2": [
    { q: "Which right lower lobe segment is at the top of the lobe?", options: ["Superior segment B6", "Posterior basal B10", "Medial basal B7", "Lateral basal B9"], answer: 0, why: "The superior segment B6 caps the lower lobe behind the hilum." },
    { q: "Which segment is a common aspiration site when upright?", options: ["Posterior basal segment B10", "Superior segment B6", "Anterior segment B3", "Medial segment B5"], answer: 0, why: "Gravity directs aspirated material to the posterior basal segments in an upright patient." },
    { q: "Which basal segment is consistently separate only on the right?", options: ["Medial basal B7", "Anterior basal B8", "Lateral basal B9", "Posterior basal B10"], answer: 0, why: "The right medial basal segment B7 is usually independent, while on the left B7 often fuses with B8." },
  ],
  "sege-1": [
    { q: "The lingula corresponds to which right lung structure?", options: ["The middle lobe", "The upper lobe", "The lower lobe", "The superior segment"], answer: 0, why: "The lingula is the tongue-like part of the left upper lobe and corresponds to the right middle lobe." },
    { q: "Which lingular segment lies against the left ventricle?", options: ["Inferior lingular segment B5", "Superior lingular segment B4", "Anterior segment B3", "Superior segment B6"], answer: 0, why: "The inferior lingular segment B5 lies against the left ventricle and can obscure its border." },
    { q: "Which segments usually fuse on the left as the apicoposterior segment?", options: ["B1 and B2", "B3 and B4", "B4 and B5", "B7 and B8"], answer: 0, why: "The left apical and posterior segments usually form a single apicoposterior segment, B1+2." },
  ],
  "sege-2": [
    { q: "Which left lower lobe segment caps the lobe?", options: ["Superior segment B6", "Posterior basal B10", "Medial basal B7", "Lateral basal B9"], answer: 0, why: "The superior segment B6 lies at the top of the left lower lobe, behind the hilum." },
    { q: "Which left basal segments often fuse?", options: ["Medial and anterior basal B7 and B8", "Lateral and posterior basal B9 and B10", "Superior and medial basal B6 and B7", "Anterior and lateral basal B8 and B9"], answer: 0, why: "On the left, B7 and B8 frequently form a single anteromedial basal segment." },
    { q: "The left lower lobe lies below which fissure?", options: ["Oblique fissure", "Horizontal fissure", "Both fissures", "No fissure"], answer: 0, why: "The left lung has only an oblique fissure, which separates the upper and lower lobes." },
  ],
  "mediastino-1": [
    { q: "Which structure lies immediately behind the left atrium?", options: ["Esophagus", "Trachea", "Thymus", "Manubrium"], answer: 0, why: "The esophagus descends directly behind the left atrium, separated from it by pericardium." },
    { q: "Where does the descending thoracic aorta lie?", options: ["In the posterior mediastinum, left of the vertebrae", "In the anterior mediastinum", "In the middle mediastinum", "In the neck"], answer: 0, why: "The descending thoracic aorta runs through the posterior mediastinum, to the left of the vertebral column." },
    { q: "Which gland lies anterior to the great vessels in the superior mediastinum?", options: ["Thymus", "Thyroid", "Pituitary", "Adrenal"], answer: 0, why: "The thymus occupies the anterior superior mediastinum, in front of the great vessels." },
  ],
  "mediastino-2": [
    { q: "At which level does the inferior vena cava pass through the diaphragm?", options: ["T8", "T10", "T12", "T4"], answer: 0, why: "The caval opening lies in the central tendon at T8; the esophagus passes at T10 and the aorta at T12." },
    { q: "Which nerve supplies the diaphragm?", options: ["Phrenic nerve, C3–C5", "Vagus nerve", "Intercostal nerves only", "Recurrent laryngeal nerve"], answer: 0, why: "The phrenic nerve arises from C3–C5 and provides the motor supply to the diaphragm." },
    { q: "The right inferior phrenic artery passes behind which structure?", options: ["The inferior vena cava", "The esophagus", "The aorta", "The trachea"], answer: 0, why: "The right inferior phrenic artery ascends behind the inferior vena cava onto the right diaphragm." },
  ],
  "mediastino-3": [
    { q: "Where does the internal thoracic artery run?", options: ["Behind the costal cartilages, lateral to the sternal edge", "In the posterior intercostal spaces", "Along the vertebral bodies", "Inside the pericardium"], answer: 0, why: "The internal thoracic artery descends vertically behind the costal cartilages, about 1–2 cm from the sternal edge." },
    { q: "The first and second posterior intercostal arteries usually arise from which structure?", options: ["Costocervical trunk", "Descending aorta", "Internal thoracic artery", "Subclavian vein"], answer: 0, why: "The upper posterior intercostal arteries usually arise from the costocervical trunk via the superior intercostal artery." },
    { q: "Anterior intercostal veins drain mainly into which veins?", options: ["Internal thoracic veins", "Azygos vein", "Pulmonary veins", "Coronary sinus"], answer: 0, why: "Anterior intercostal veins accompany the arteries toward the internal thoracic veins." },
  ],
  "mediastino-4": [
    { q: "Which sternal landmark marks the level of T4–T5?", options: ["The sternal angle", "The jugular notch", "The xiphisternal joint", "The clavicular notch"], answer: 0, why: "The sternal angle, or angle of Louis, marks the manubriosternal joint at T4–T5." },
    { q: "Which rib's costal cartilage marks the sternal angle?", options: ["Second", "First", "Fourth", "Seventh"], answer: 0, why: "The second costal cartilage articulates at the sternal angle, a key surface landmark." },
    { q: "Which ribs are floating ribs?", options: ["Ribs 11 and 12", "Ribs 8–10", "Ribs 1–7", "Ribs 3–5"], answer: 0, why: "Ribs 11 and 12 have no anterior attachment and end free in the muscles of the abdominal wall." },
  ],
};
