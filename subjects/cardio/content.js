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
    definition: ['Follow the RCA from the right aortic sinus to the crux, where the AV and posterior interventricular grooves meet.'],
    course: ['It passes between the right auricle and pulmonary trunk. The small cardiac vein accompanies it in the right AV groove as it rounds the acute margin.'],
    branches: ['Near the origin, look for conus and atrial branches, including the SA nodal branch when it comes from the RCA. RV branches and the acute marginal branch leave along the right AV groove. At the crux, look for the AV nodal branch and, in right dominance, the PDA. Posterolateral branches continue onto the inferior LV.'],
    supply: ['Supplies most of the right atrium and RV. In right dominance it also supplies the inferior LV and posterior third of the septum through distal branches.'],
    clinical: ['In right dominance a lesion before the PDA takeoff can cause an inferior infarct. A proximal lesion can also infarct the RV or interrupt nodal supply.'],
    imaging: ['Coronary angiography or gated CT traces the artery from its ostium through the right AV groove.'],
  }, [
    ['Which sinus contains its ostium?', 'Right aortic sinus', 'Left aortic sinus', 'Noncoronary sinus', 'Right pulmonary sinus', 'The right aortic sinus lies posterior to the right coronary cusp and normally contains the RCA ostium.'],
    ['Which branch identifies right dominance?', 'Posterior interventricular branch from the RCA', 'Right marginal branch from the RCA', 'Conus branch from the RCA', 'SA nodal branch from the RCA', 'Right dominance means the RCA gives rise to the posterior interventricular artery.'],
  ]),
  tce: card('left main coronary artery', {
    definition: ['Short proximal trunk of the left coronary circulation.'],
    course: ['Leaves the left aortic sinus and passes between the pulmonary trunk and left auricle. Its two main branches enter separate grooves.'],
    branches: ['The LAD descends in the anterior interventricular groove beside the great cardiac vein. The circumflex turns into the left AV groove. A ramus intermedius may arise between them.'],
    supply: ['Through its branches it supplies most LV myocardium, anterior septum and much of the LA.'],
    clinical: ['A left main lesion threatens both anterior and lateral LV territories and the anterior septum.'],
    imaging: ['Gated coronary CT identifies the ostium, proximal course and branching pattern.'],
  }, [
    ['Which structures flank its proximal course?', 'Pulmonary trunk and left auricle', 'SVC and right auricle', 'Esophagus and descending aorta', 'IVC and coronary sinus', 'The trunk passes between the pulmonary trunk and left auricle before dividing.'],
    ['What are its two usual terminal branches?', 'LAD and circumflex', 'RCA and LAD', 'Conus and right marginal', 'PDA and right marginal', 'The left main usually bifurcates into LAD and circumflex arteries.'],
  ]),
  dae: card('left anterior descending artery', {
    definition: ['Anterior interventricular branch of the left main coronary artery.'],
    course: ['Leaves the left main below the left auricle. It descends between the ventricles in the anterior interventricular groove. It may wrap around the apex.'],
    relations: ['The great cardiac vein accompanies it in the anterior interventricular groove.'],
    branches: ['From base to apex, look for a proximal conus branch when present, then successive septal perforators and diagonals. Septals dive deep. Diagonals cross the LV surface. Small branches cross onto the RV. The order of individual takeoffs varies.'],
    supply: ['Supplies anterior LV myocardium, apex and anterior two-thirds of the interventricular septum.'],
    clinical: ['Suspect the LAD for an anterior or anteroseptal infarct. Proximal occlusion can also affect the apex and conduction tissue.'],
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
    ['Which landmark identifies the region this branch supplies?', 'Pulmonary infundibulum', 'Left ventricular apex', 'Right atrial appendage', 'Posterior interventricular groove', 'The branch runs to the RV outflow tract below the pulmonary valve.']),
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
    course: ['Leaves the left main under the left auricle. It follows the left AV groove around the obtuse margin.'],
    relations: ['The great cardiac vein runs nearby in the left AV groove. The posterior mitral annulus lies close to the artery.'],
    branches: ['Atrial branches arise along the groove. Obtuse marginal branches leave for the lateral LV. In left dominance the distal circumflex reaches the crux and gives the PDA and posterolateral branches.'],
    supply: ['Supplies the lateral LV and parts of the LA. Its inferior and posterior territories increase with left dominance.'],
    clinical: ['Suspect the circumflex or an obtuse marginal branch for lateral LV infarction. Left dominance adds inferior and posterior septal territory.'],
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
    definition: ['Trace the PDA back to its parent at the crux. An RCA origin indicates right dominance in the usual pattern. A circumflex origin indicates left dominance.'],
    course: ['Usually arises from the RCA near the crux, or from the circumflex in left dominance. Runs toward the apex.'],
    relations: ['Accompanied by the middle cardiac vein in the posterior interventricular groove on the diaphragmatic surface.'],
    branches: ['Gives posterior septal perforators and branches to adjacent inferior ventricular myocardium.'],
    supply: ['Posterior septal perforators supply the posterior third of the septum. Ventricular branches supply the inferior wall beside the groove.'],
    clinical: ['The PDA and posterolateral branches are at risk in inferior infarction. Trace their origins before assigning the culprit.'],
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
    course: ['Starts where the great cardiac vein meets the oblique vein of the left atrium. Runs in the posterior left AV groove and opens into the right atrium.'],
    relations: ['Its atrial ostium lies between the IVC orifice and septal tricuspid attachment.'],
    branches: ['Trace from the great cardiac vein toward the right atrium. Posterior LV veins enter along the groove. The middle and small cardiac veins join near the atrial end.'],
    internal: ['A variable Thebesian valve guards the atrial ostium.'],
    development: ['Develops predominantly from the left horn of the sinus venosus.'],
    clinical: ['Provides access to LV epicardial veins for cardiac resynchronization leads.'],
    imaging: ['A dilated coronary sinus on echocardiography can suggest a persistent left SVC.'],
  }, [
    ['Where does the coronary sinus empty?', 'Right atrium', 'Left atrium', 'SVC', 'IVC', 'It opens directly into the RA between the IVC ostium and tricuspid orifice.'],
    ['What embryonic structure forms it?', 'Left horn of sinus venosus', 'Right horn of sinus venosus', 'Truncus arteriosus', 'Septum primum', 'The left sinus horn contributes the coronary sinus.'],
  ]),
  vcmagna: cardiacVein('great cardiac vein',
    'Ascends from the apex in the anterior interventricular groove. Turns left into the left AV groove and becomes the coronary sinus at the oblique vein of the left atrium.',
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
    'Runs on the LV side of the middle cardiac vein, near posterolateral arterial branches.',
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
    supply: [`A${number} runs with its bronchus inside the segment. Intersegmental veins mark the boundaries between adjacent segments.`],
    [detail.section]: [detail.bullet],
    imaging: ['On thin-section CT, trace the segmental bronchus and accompanying pulmonary artery from the hilum.'],
  }, [
    [`In the separate numbering used by the model, which bronchus corresponds to the ${name}?`, bronchus, ...otherNumbers.map(n => `B${n}`), `${bronchus} is the bronchial label for the ${name}.`],
    detail.question,
  ]);
}

function segmentDetail(section, bullet, question, correct, wrong1, wrong2, wrong3, why = bullet) {
  return { section, bullet, question: [question, correct, wrong1, wrong2, wrong3, why] };
}

const lungSegments = {
  sd_apical: segment('right', 'upper', 'apical', 1, 'Its tip reaches above the first rib at the thoracic inlet.',
    segmentDetail('relations', 'The apex is covered by cervical pleura and lies close to the subclavian vessels.',
      'Which pleural region covers its superior tip?', 'Cervical pleura', 'Diaphragmatic pleura', 'Costodiaphragmatic recess', 'Pulmonary ligament')),
  sd_post: segment('right', 'upper', 'posterior', 2, 'It lies above the oblique fissure against the back of the rib cage.',
    segmentDetail('clinical', 'The posterior upper lobe and superior lower lobe are dependent when supine and are common sites of aspiration.',
      'Which position makes this segment dependent?', 'Supine', 'Upright', 'Prone', 'Standing with arms raised')),
  sd_ant: segment('right', 'upper', 'anterior', 3, 'It lies against the front of the rib cage above the horizontal fissure.',
    segmentDetail('relations', 'The horizontal fissure separates it inferiorly from the right middle lobe.',
      'Which fissure separates it from the middle lobe?', 'Horizontal fissure', 'Left oblique fissure', 'Azygos fissure', 'Right oblique fissure')),
  sd_lat: segment('right', 'middle', 'lateral', 4, 'It lies toward the ribs between the horizontal and oblique fissures.',
    segmentDetail('clinical', 'Obstruction of the middle lobar bronchus can collapse both middle lobe segments.',
      'Which neighboring segment shares the middle lobar bronchus?', 'Medial middle lobe', 'Medial basal', 'Anterior upper lobe', 'Superior lower lobe',
      'Both lateral B4 and medial B5 arise from the right middle lobar bronchus.')),
  sd_med: segment('right', 'middle', 'medial', 5, 'It lies against the right atrial border.',
    segmentDetail('clinical', 'Consolidation abutting the right atrium can obscure the right heart border on frontal radiography.',
      'Which radiographic contour can be lost?', 'Right heart border', 'Left heart border', 'Aortic knob', 'Descending aortic stripe')),
  sd_sup: segment('right', 'lower', 'superior', 6, 'It lies behind the hilum just below the oblique fissure.',
    segmentDetail('clinical', 'The superior lower lobe is a dependent region during supine aspiration.',
      'Which other region is commonly dependent in supine aspiration?', 'Posterior upper lobe', 'Anterior upper lobe', 'Medial middle lobe', 'Lingula',
      'The posterior upper lobe and superior lower lobe are both dependent in the supine position.')),
  sd_bmed: segment('right', 'lower', 'medial basal', 7, 'It lies along the mediastinum above the diaphragm.',
    segmentDetail('relations', 'It lies near the inferior vena cava and medial diaphragm. A distinct B7 is usual on the right.',
      'Which left basal bronchus commonly shares its counterpart’s stem?', 'B8', 'B4', 'B6', 'B10',
      'Left B7 and B8 are commonly combined as an anteromedial basal bronchus.')),
  sd_bant: segment('right', 'lower', 'anterior basal', 8, 'It lies behind the oblique fissure above the front of the diaphragm.',
    segmentDetail('relations', 'The oblique fissure separates it from the middle lobe anteriorly.',
      'Which fissure separates it from the middle lobe?', 'Oblique fissure', 'Horizontal fissure', 'Azygos fissure', 'Accessory superior fissure')),
  sd_blat: segment('right', 'lower', 'lateral basal', 9, 'It lies against the outer rib cage near the costophrenic angle.',
    segmentDetail('relations', 'It lies lateral to the medial basal segment and contacts lateral costal and diaphragmatic surfaces.',
      'Which surface does this segment reach laterally?', 'Costal surface near the base', 'Cervical pleura at the apex', 'Anterior cardiac notch', 'Mediastinal surface at the carina')),
  sd_bpost: segment('right', 'lower', 'posterior basal', 10, 'It lies beside the spine over the back of the diaphragm.',
    segmentDetail('clinical', 'Basal lower lobe segments are common sites of aspiration in upright patients.',
      'Which posture favors aspiration into basal lower lobe segments?', 'Upright', 'Strictly supine', 'Head-down', 'Prone with hips elevated')),
  se_apical: segment('left', 'upper', 'apical', 1, 'Its tip reaches above the first rib at the thoracic inlet.',
    segmentDetail('internal', 'This territory usually forms part of apicoposterior S1+2 in the left upper lobe. Trace B1+2 and A1+2 into the shared segment.',
      'Which bronchus usually shares its stem?', 'B2', 'B3', 'B4', 'B6')),
  se_post: segment('left', 'upper', 'posterior', 2, 'It lies above the oblique fissure against the back of the rib cage.',
    segmentDetail('internal', 'This territory usually forms part of apicoposterior S1+2 in the left upper lobe. Trace B1+2 and A1+2 into the shared segment.',
      'What is the combined apicoposterior bronchus called?', 'B1+2', 'B2+3', 'B4+5', 'B7+8')),
  se_ant: segment('left', 'upper', 'anterior', 3, 'It lies against the front of the rib cage.',
    segmentDetail('relations', 'It sits anterior to the apicoposterior territory and superior to the lingular segments.',
      'Which left upper lobe region lies inferior to it?', 'Lingula', 'Apicoposterior territory', 'Right middle lobe', 'Superior lower lobe')),
  se_lsup: segment('left', 'upper', 'superior lingular', 4, 'It lies below S3 and above S5 near the cardiac notch.',
    segmentDetail('relations', 'The lingula lies inferior to the cardiac notch and corresponds to the right middle lobe.',
      'What is the right-sided counterpart of the lingula?', 'Middle lobe', 'Upper lobe apex', 'Superior segment of lower lobe', 'Entire lower lobe')),
  se_linf: segment('left', 'upper', 'inferior lingular', 5, 'It lies below S4 by the left heart border.',
    segmentDetail('clinical', 'Lingular consolidation abutting the heart can erase the left heart border on frontal radiography.',
      'Which contour may disappear with lingular consolidation?', 'Left heart border', 'Right heart border', 'Azygos arch', 'Aortic knob')),
  se_sup: segment('left', 'lower', 'superior', 6, 'It lies behind the hilum just below the oblique fissure.',
    segmentDetail('relations', 'B6 usually arises posteriorly from the lower lobar bronchus before division of the basal bronchial trunk.',
      'Which direction does B6 typically take?', 'Posterior', 'Directly anterior', 'Toward the lingula', 'Across the mediastinum')),
  se_bmed: segment('left', 'lower', 'medial basal', 7, 'It lies along the mediastinum above the diaphragm.',
    segmentDetail('internal', 'This territory usually forms part of anteromedial basal S7+8 in the left lower lobe. Trace B7+8 and A7+8 into the shared segment.',
      'Which branch commonly combines with B7?', 'B8', 'B6', 'B9', 'B10')),
  se_bant: segment('left', 'lower', 'anterior basal', 8, 'It lies behind the lingula across the oblique fissure.',
    segmentDetail('internal', 'This territory usually forms part of anteromedial basal S7+8 in the left lower lobe. Trace B7+8 and A7+8 into the shared segment.',
      'How is the common left anteromedial basal stem designated?', 'B7+8', 'B8+9', 'B6+8', 'B4+5')),
  se_blat: segment('left', 'lower', 'lateral basal', 9, 'It lies against the outer rib cage near the costophrenic angle.',
    segmentDetail('relations', 'It occupies the lateral base between anterior and posterior basal territories.',
      'Which neighboring basal territory lies posteriorly?', 'Posterior basal', 'Superior lingular', 'Apicoposterior', 'Inferior lingular')),
  se_bpost: segment('left', 'lower', 'posterior basal', 10, 'It lies beside the spine over the back of the diaphragm.',
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
    ['Which layer does this vessel lie deep to near the vertebral column?', 'Internal intercostal membrane', 'Superficial to the external intercostal muscle', 'Within the thoracic duct', 'Anterior to the sternum', 'It starts between parietal pleura and the internal intercostal membrane. In the costal groove it lies between the internal and innermost intercostal muscles.'],
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
    relations: ['Chest drains are usually inserted in the fifth intercostal space in the midaxillary line, just above the sixth rib.'],
    clinical: ['Rib fractures here may injure the lung and pleura.'],
    imaging: ['Chest radiography and CT show fractures and underlying lung injury.'],
  }, [
    ['Which vertebra does it articulate with?', 'T4', 'T2', 'T6', 'T8', 'The fourth rib articulates with T4.'],
    ['Which intercostal space in the midaxillary line is the usual site for a chest drain?', 'Fifth intercostal space', 'Fourth intercostal space', 'Sixth intercostal space', 'Second intercostal space', 'The safe triangle for a chest drain is the fifth intercostal space, just above the sixth rib.'],
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
    relations: ['T2–T9 carry costal demifacets; T1 has a full facet for rib 1 plus a demifacet for rib 2, and T10–T12 have single full facets.'],
    clinical: ['Osteoporotic compression fractures contribute to thoracic kyphosis.'],
    imaging: ['CT and MRI show vertebral bodies, facets and the spinal canal.'],
  }, [
    ['Which vertebrae bear costal facets?', 'All thoracic vertebrae', 'Only T1–T6', 'Only T10–T12', 'Only T1–T4', 'All twelve thoracic vertebrae bear costal facets, though their arrangement differs.'],
    ['What does the thoracic spine normally form?', 'Kyphosis', 'Lordosis', 'Scoliosis', 'No curve', 'The thoracic spine has a normal kyphotic curve.'],
  ]),
};

// Z-Anatomy additions: lobar bronchi, lobes, pulmonary vessel branches, outlet vessels.
const zAnatomyExtras = {
  blob_sup_d: card("right upper lobe bronchus", {
    definition: ["Lobar airway of the right upper lobe arising from the right main bronchus."],
    location: ["From the right main bronchus above the right pulmonary artery."],
    relations: ["Lies above the right pulmonary artery at the hilum, so it is eparterial. The azygos arch passes over the right main bronchus just medial to it."],
    branches: ["B1 goes to apical S1. B2 goes to posterior S2. B3 goes to anterior S3. All three are in the right upper lobe."],
    clinical: ["A right-sided double-lumen tube must line up its side port with this early take-off, or the upper lobe is not ventilated."],
    imaging: ["On coronal CT it is the first lateral branch off the right main bronchus."],
  }, [
    ["Where does it lie relative to the right pulmonary artery at the hilum?", "Above it (eparterial)", "Below it (hyparterial)", "Behind the pulmonary veins", "Inside the pericardium", "The right upper lobe bronchus is the only eparterial lobar bronchus."],
    ["Which segmental bronchi arise from it?", "B1, B2 and B3", "B4 and B5", "B6 to B10", "B1+2 and B3 only", "The right upper lobe bronchus gives apical, posterior and anterior segmental bronchi."],
  ]),
  bint_d: card("bronchus intermedius", {
    definition: ["Right-sided airway segment between the upper lobe bronchus and the middle and lower lobe bronchi."],
    location: ["Between the upper lobar takeoff and the division into middle and lower lobar bronchi."],
    relations: ["The interlobar pulmonary artery lies anterolateral to it."],
    branches: ["The middle branch leads to S4–S5. The lower branch leads to S6–S10."],
    clinical: ["A tumour here can obstruct both the middle and lower lobes together."],
    imaging: ["On axial CT its posterior wall touches lung directly; thickening of that wall suggests oedema or tumour."],
  }, [
    ["Which lobes does it supply?", "Right middle and lower lobes", "Right upper lobe only", "Left upper lobe and lingula", "All three right lobes", "It lies between the upper lobe take-off and the middle and lower lobe bronchi."],
    ["Does it have a left-sided counterpart?", "No, it is only on the right", "Yes, between the left upper and lower lobe bronchi", "Yes, the lingular bronchus", "Yes, the left main bronchus itself", "The left main bronchus divides directly into upper and lower lobe bronchi."],
  ]),
  blob_med_d: card("middle lobe bronchus", {
    definition: ["Lobar airway of the right middle lobe."],
    location: ["From the front of the bronchus intermedius toward the wedge between the two fissures."],
    relations: ["Lies almost opposite the origin of the superior segment bronchus of the lower lobe."],
    branches: ["Lateral B4 goes toward the ribs to S4. Medial B5 goes toward the right heart border to S5. Both serve the right middle lobe."],
    clinical: ["Middle lobe syndrome is recurrent collapse caused by node compression or weak collateral ventilation."],
    imaging: ["A collapsed middle lobe blurs the right heart border on a frontal radiograph."],
  }, [
    ["Which segmental bronchi arise from it?", "B4 and B5", "B1, B2 and B3", "B6 and B7", "B4 and B5 of the lingula", "The middle lobe bronchus divides into lateral B4 and medial B5."],
    ["Why is the middle lobe prone to recurrent collapse?", "Its bronchus is long, narrow and ringed by nodes", "It has no pulmonary artery", "It lacks cartilage", "It is eparterial", "Node compression and poor collateral ventilation cause middle lobe syndrome."],
  ]),
  blob_inf_d: card("right lower lobe bronchus", {
    definition: ["Lobar airway of the right lower lobe."],
    location: ["Continues behind the middle lobar takeoff toward the diaphragm."],
    relations: ["The lower lobe artery lies lateral to it; the inferior pulmonary vein lies below and medial."],
    branches: ["B6 runs back to superior S6 first. The basal trunk gives medial B7, anterior B8, lateral B9 and posterior B10 to right lower lobe S7–S10."],
    clinical: ["Aspiration while upright favours its basal branches."],
    imaging: ["Collapse produces a triangular opacity behind the heart that hides the right hemidiaphragm."],
  }, [
    ["Which branch leaves its posterior wall first?", "Superior segment bronchus B6", "Medial basal B7", "Middle lobe bronchus", "Posterior segment B2", "B6 arises from the posterior wall before the basal trunk."],
    ["Which segments does its basal trunk ventilate?", "S7 to S10", "S4 and S5", "S1 to S3", "S6 only", "B7–B10 ventilate S7–S10. B6 branches off before the basal trunk."],
  ]),
  blob_sup_e: card("left upper lobe bronchus", {
    definition: ["Lobar airway of the left upper lobe, including the lingula."],
    location: ["Leaves the left main bronchus below the arching left pulmonary artery."],
    relations: ["The left pulmonary artery arches over it; the left superior pulmonary vein lies in front."],
    branches: ["The upper division gives B1+2 to apicoposterior S1+2 and B3 to anterior S3. The lingular division gives B4 above B5 to S4 and S5."],
    clinical: ["Left upper lobe collapse moves the lobe forward against the chest wall, giving a veil-like opacity."],
    imaging: ["On axial CT the left pulmonary artery is seen crossing over it from front to back."],
  }, [
    ["Which two divisions does it form?", "Upper division and lingular division", "Middle and lower divisions", "Superior and basal divisions", "Apical and intermediate divisions", "The left upper lobe bronchus divides into an upper (culminal) and a lingular division."],
    ["What arches over it at the left hilum?", "Left pulmonary artery", "Azygos vein", "Left superior pulmonary vein", "Thoracic duct", "The left pulmonary artery passes above the bronchus at the hilum. The right upper lobar bronchus is the eparterial exception."],
  ]),
  blob_inf_e: card("left lower lobe bronchus", {
    definition: ["Lobar airway of the left lower lobe."],
    location: ["Continues behind and below the upper lobar takeoff toward the diaphragm."],
    relations: ["The interlobar left pulmonary artery lies lateral to it; the descending aorta lies behind."],
    branches: ["B6 first turns back to superior S6. The basal trunk usually gives B7+8 to anteromedial basal S7+8, B9 to lateral basal S9 and B10 to posterior basal S10."],
    clinical: ["Left lower lobe collapse gives a triangle behind the heart and hides the medial left hemidiaphragm."],
    imaging: ["On a frontal radiograph its collapse shows as a retrocardiac opacity."],
  }, [
    ["Which basal segments often share one bronchus on the left?", "B7 and B8", "B9 and B10", "B6 and B7", "B4 and B5", "On the left the medial and anterior basal bronchi usually form an anteromedial trunk."],
    ["Which segment bronchus arises first from its posterior wall?", "B6", "B10", "B3", "B5", "As on the right, the superior segment bronchus leaves first, posteriorly."],
  ]),
  lobo_sup_d: card("right upper lobe", {
    definition: ["Superior lobe of the right lung, made of apical, posterior and anterior segments."],
    location: ["From the apex to the horizontal fissure in front and the oblique fissure behind."],
    relations: ["Its apex rises above the first rib beside the subclavian vessels; medially it lies against the SVC and the azygos arch."],
    branches: ["Aerated by the upper lobe bronchus with B1, B2 and B3."],
    clinical: ["Upper lobe cavitation is typical of reactivation tuberculosis."],
    imaging: ["Collapse pulls the horizontal fissure upward on a frontal radiograph."],
  }, [
    ["Which fissure separates it from the middle lobe?", "Horizontal fissure", "Oblique fissure", "Azygos fissure", "Inferior accessory fissure", "The horizontal fissure runs along the 4th costal cartilage."],
    ["Which segments does it contain?", "Apical, posterior and anterior", "Lateral and medial", "Superior and four basal", "Apicoposterior, anterior and lingular", "The right upper lobe has three segments: S1, S2 and S3."],
  ]),
  lobo_med_d: card("right middle lobe", {
    definition: ["Middle lobe of the right lung, made of lateral and medial segments."],
    location: ["Front of the right lung between the horizontal and oblique fissures."],
    relations: ["Its medial surface lies against the right atrium; it does not reach the posterior chest wall."],
    branches: ["Aerated by the middle lobe bronchus with B4 and B5."],
    clinical: ["Consolidation removes the right heart border on a frontal radiograph."],
    imaging: ["On a lateral radiograph it is a wedge over the heart between the two fissures."],
  }, [
    ["Which border disappears when it consolidates?", "Right heart border", "Right hemidiaphragm", "Aortic knob", "Left heart border", "The medial middle lobe lies against the right atrium."],
    ["Where is it best auscultated?", "Anterior chest, right 4th–6th ribs", "Posterior chest below the scapula", "Right supraclavicular fossa", "Left axilla", "The middle lobe lies at the front and does not reach the back."],
  ]),
  lobo_inf_d: card("right lower lobe", {
    definition: ["Inferior lobe of the right lung, with one superior and four basal segments."],
    location: ["Posterior and basal right lung, below the oblique fissure."],
    relations: ["Its base rests on the right hemidiaphragm; the pulmonary ligament runs down from its hilum."],
    branches: ["Aerated by the lower lobe bronchus: B6 and B7–B10."],
    clinical: ["Common site of aspiration pneumonia."],
    imaging: ["Consolidation silhouettes the right hemidiaphragm while the right heart border stays visible."],
  }, [
    ["How many segments does it contain?", "Five: superior plus four basal", "Three", "Two", "Four basal only", "The lower lobe has S6 and S7–S10."],
    ["Which border does its consolidation obscure?", "Right hemidiaphragm", "Right heart border", "Left heart border", "Superior mediastinum", "Lower lobe disease silhouettes the diaphragm; middle lobe disease silhouettes the heart."],
  ]),
  lobo_sup_e: card("left upper lobe", {
    definition: ["Superior lobe of the left lung, including the lingula."],
    location: ["Above and in front of the oblique fissure."],
    relations: ["The cardiac notch indents its anterior border; medially it lies against the aortic arch and left ventricle."],
    branches: ["Aerated by the upper lobe bronchus: upper division to B1+2 and B3, lingular division to B4 and B5."],
    clinical: ["Lingular consolidation silhouettes the left heart border."],
    imaging: ["Collapse moves it forward, giving a hazy veil over the left hemithorax."],
  }, [
    ["Which part of it corresponds to the right middle lobe?", "The lingula", "The apicoposterior segment", "The cardiac notch", "The superior segment", "The lingula has superior and inferior segments, like the middle lobe has lateral and medial."],
    ["Which fissure does the left lung have?", "Oblique only", "Horizontal only", "Oblique and horizontal", "None", "The left lung usually lacks a horizontal fissure, so it has two lobes."],
  ]),
  lobo_inf_e: card("left lower lobe", {
    definition: ["Inferior lobe of the left lung."],
    location: ["Posterior and basal left lung, behind the heart."],
    relations: ["Its medial surface is grooved by the descending aorta; its base rests on the left hemidiaphragm."],
    branches: ["Aerated by the lower lobe bronchus: B6, B7+8, B9 and B10."],
    clinical: ["Retrocardiac collapse is easily missed on a frontal radiograph."],
    imaging: ["Collapse hides the descending aortic outline and the medial left hemidiaphragm."],
  }, [
    ["Which large vessel grooves its medial surface?", "Descending aorta", "Superior vena cava", "Inferior vena cava", "Right pulmonary artery", "The descending thoracic aorta lies against the medial left lower lobe."],
    ["Where does its collapse appear on a frontal radiograph?", "Behind the heart", "Above the aortic knob", "Along the right heart border", "In the right costophrenic angle", "A collapsed left lower lobe forms a retrocardiac triangle."],
  ]),
  a_sd_apical: card("right apical segmental artery (A1)", {
    definition: ["Pulmonary arterial branch to the apical segment of the right upper lobe."],
    course: ["Arises from the anterior trunk and ascends beside B1."],
    relations: ["Runs with the segmental bronchus; the veins run between segments."],
    supply: ["Apical segment S1 of the right upper lobe."],
    clinical: ["Segmental pulmonary emboli appear as filling defects in these branches on CT pulmonary angiography."],
    imaging: ["Trace it from the anterior trunk on thin-section CT angiography."],
  }, [
    ["From which trunk does it usually arise?", "Anterior trunk of the right pulmonary artery", "Interlobar artery", "Middle lobe artery", "Right bronchial artery", "A1 and A3 usually share the anterior trunk."],
    ["Which structure runs beside it in the segment?", "Apical bronchus B1", "Apical vein V1", "Horizontal fissure", "Azygos arch", "Pulmonary arteries follow their bronchi; veins run between segments."],
  ]),
  a_sd_post: card("right posterior segmental artery (A2)", {
    definition: ["Pulmonary arterial branch to the posterior segment of the right upper lobe."],
    course: ["Arises from the anterior trunk or as an ascending branch of the interlobar artery and runs backward beside B2."],
    relations: ["Runs with B2 in the posterior upper lobe."],
    supply: ["Posterior segment S2 of the right upper lobe."],
    clinical: ["A missed ascending A2 bleeds during upper lobectomy."],
    imaging: ["CT angiography identifies whether it arises from the interlobar artery."],
  }, [
    ["Where does it often arise besides the anterior trunk?", "Interlobar artery", "Middle lobe artery", "Left pulmonary artery", "Superior vena cava", "An ascending A2 from the interlobar artery is common."],
    ["Which bronchus does it accompany?", "B2", "B1", "B3", "B6", "Segmental arteries run beside the bronchus of the same number."],
  ]),
  a_sd_ant: card("right anterior segmental artery (A3)", {
    definition: ["Pulmonary arterial branch to the anterior segment of the right upper lobe."],
    course: ["Leaves the anterior trunk with A1 and runs forward beside B3."],
    relations: ["Lies above the horizontal fissure."],
    supply: ["Anterior segment S3 of the right upper lobe."],
    clinical: ["Segmentectomy of S3 divides A3 and B3 at the segment hilum."],
    imaging: ["Seen on CT running forward from the upper hilum."],
  }, [
    ["Which branch does it usually share a trunk with?", "A1", "A6", "Middle lobe artery", "A2 only", "The anterior trunk usually gives A1 and A3."],
    ["Which fissure lies below its territory?", "Horizontal fissure", "Left oblique fissure", "Azygos fissure", "No fissure", "The anterior segment sits above the horizontal fissure."],
  ]),
  lobmedd: card("middle lobe artery", {
    definition: ["Lobar pulmonary artery to the right middle lobe."],
    course: ["Arises from the anterior side of the interlobar artery and runs forward beside the middle lobe bronchus."],
    relations: ["Lies roughly opposite the superior segment artery A6."],
    branches: ["A4 follows B4 to lateral S4. A5 follows B5 to medial S5. Both go to the right middle lobe."],
    clinical: ["Two separate middle lobe arteries are a common variant."],
    imaging: ["On CT it leaves the interlobar artery in the oblique fissure."],
  }, [
    ["From which vessel does it arise?", "Interlobar part of the right pulmonary artery", "Anterior trunk", "Left pulmonary artery", "Right superior pulmonary vein", "The middle lobe artery leaves the front of the interlobar artery."],
    ["Which branches does it give?", "A4 and A5", "A1 and A3", "A6 only", "A7 to A10", "The middle lobe artery supplies the lateral and medial segments."],
  ]),
  a_sd_lat: card("lateral segmental artery of the middle lobe (A4)", {
    definition: ["Segmental pulmonary artery to the lateral segment of the right middle lobe."],
    course: ["Arises from the middle lobe artery and runs laterally beside B4."],
    relations: ["Lies between the horizontal and oblique fissures."],
    supply: ["Lateral segment S4."],
    clinical: ["May arise directly from the interlobar artery as a separate middle lobe branch."],
    imaging: ["Seen on CT running laterally from the middle lobe artery."],
  }, [
    ["Which artery gives it?", "Middle lobe artery", "Anterior trunk", "Lower lobe artery", "Lingular artery", "A4 is a branch of the middle lobe artery."],
    ["Which bronchus runs beside it?", "B4", "B5", "B3", "B8", "A4 accompanies the lateral segmental bronchus."],
  ]),
  a_sd_med: card("medial segmental artery of the middle lobe (A5)", {
    definition: ["Segmental pulmonary artery to the medial segment of the right middle lobe."],
    course: ["Arises from the middle lobe artery and runs medially beside B5."],
    relations: ["Its segment lies against the right atrium."],
    supply: ["Medial segment S5."],
    clinical: ["Its territory produces the silhouette sign at the right heart border when consolidated."],
    imaging: ["Seen on CT running medially from the middle lobe artery."],
  }, [
    ["Which artery gives it?", "Middle lobe artery", "Anterior trunk", "Lingular artery", "Right bronchial artery", "A5 is the medial branch of the middle lobe artery."],
    ["Toward which structure does its segment face?", "Right atrium", "Lateral chest wall", "Right hemidiaphragm", "Vertebral column", "The medial middle lobe segment lies against the right heart border."],
  ]),
  lobinfd: card("right lower lobe artery", {
    definition: ["Lobar pulmonary artery of the right lower lobe."],
    course: ["Continues the interlobar artery downward, lateral to the lower lobe bronchus."],
    relations: ["The inferior pulmonary vein lies below and medial to it."],
    branches: ["Superior segment artery A6 and basal arteries A7–A10."],
    clinical: ["A common site for lobar pulmonary emboli."],
    imaging: ["CT pulmonary angiography shows it lateral to the lower lobe bronchus."],
  }, [
    ["Which artery does it continue?", "Interlobar part of the right pulmonary artery", "Anterior trunk", "Left pulmonary artery", "Middle lobe artery", "The lower lobe artery is the end of the interlobar artery."],
    ["Where does it lie relative to its bronchus?", "Lateral", "Medial", "Inside the lumen", "Above the trachea", "At the lower hilum the artery lies lateral to the bronchus."],
  ]),
  a_sd_sup: card("right superior segmental artery (A6)", {
    definition: ["Segmental pulmonary artery to the superior segment of the right lower lobe."],
    course: ["Arises from the back of the interlobar artery and runs backward beside B6."],
    relations: ["Arises almost opposite the middle lobe artery."],
    supply: ["Superior segment S6."],
    clinical: ["Can be injured during middle lobectomy because of its level."],
    imaging: ["Seen on CT running posteriorly from the interlobar artery."],
  }, [
    ["Which artery does it arise almost opposite?", "Middle lobe artery", "Anterior trunk", "Left pulmonary artery", "A1", "A6 leaves the back of the interlobar artery at about the level the middle lobe artery leaves the front."],
    ["Which bronchus accompanies it?", "B6", "B10", "B2", "B5", "A6 runs with the superior segment bronchus."],
  ]),
  a_sd_basal: card("right basal segmental arteries (A7–A10)", {
    definition: ["Terminal branches of the right lower lobe artery to the four basal segments."],
    course: ["Arise from the basal trunk and fan downward with the basal bronchi."],
    relations: ["Lie above the right hemidiaphragm."],
    supply: ["A7–A10 supply medial, anterior, lateral and posterior basal S7–S10 in the right lower lobe."],
    clinical: ["Gravity-dependent flow makes the basal arteries a common site of emboli."],
    imaging: ["CT pulmonary angiography shows emboli as filling defects in these branches."],
  }, [
    ["How many basal segments do they supply on the right?", "Four", "Two", "Three", "Five", "The right lower lobe has medial, anterior, lateral and posterior basal segments."],
    ["Why are emboli common in these branches?", "They receive most of the flow when upright", "They have no smooth muscle", "They arise from the aorta", "They are eparterial", "Pulmonary blood flow is greatest in the lung bases when upright."],
  ]),
  a_se_apical: card("left apical segmental artery (A1)", {
    definition: ["Pulmonary arterial branch to the apical part of the left upper lobe."],
    course: ["Arises from the left pulmonary artery as it arches over the bronchus and ascends."],
    relations: ["Lies beside the aortic arch and left subclavian artery."],
    supply: ["Apical part of the apicoposterior segment S1+2."],
    clinical: ["Variable separate origins make left upper lobectomy demanding."],
    imaging: ["CT angiography shows the left upper lobe branches leaving the arterial arch."],
  }, [
    ["How do the left upper lobe arteries usually arise?", "As several separate branches from the arching left pulmonary artery", "From one anterior trunk, as on the right", "From the aortic arch", "From the left superior pulmonary vein", "Several branches can leave the arching left pulmonary artery to supply the upper lobe. Their origins can vary."],
    ["Which artery does it often share a stem with?", "A2", "A6", "A4", "A8", "On the left A1 and A2 often arise together as A1+2."],
  ]),
  a_se_post: card("left posterior segmental artery (A2)", {
    definition: ["Pulmonary arterial branch to the posterior part of the left upper lobe."],
    course: ["Arises from the left pulmonary artery at the top of its arch and runs backward."],
    relations: ["Often arises with A1."],
    supply: ["Posterior part of the apicoposterior segment S1+2."],
    clinical: ["A small posterior branch is easily torn during left upper lobectomy."],
    imaging: ["Seen on CT leaving the posterior arch of the left pulmonary artery."],
  }, [
    ["Which bronchus does it run with?", "B1+2", "B3", "B4", "B6", "On the left the apical and posterior bronchi usually share a stem, B1+2."],
    ["From which part of the left pulmonary artery does it arise?", "The top of its arch over the bronchus", "The pulmonary trunk", "The interlobar part below the fissure", "The lingular artery", "A2 leaves the arch as the artery crosses the bronchus."],
  ]),
  a_se_ant: card("left anterior segmental artery (A3)", {
    definition: ["Pulmonary arterial branch to the anterior segment of the left upper lobe."],
    course: ["A large early branch of the left pulmonary artery, running forward with B3."],
    relations: ["The left superior pulmonary vein lies in front of it."],
    supply: ["Anterior segment S3."],
    clinical: ["A short, early branch that can tear during dissection."],
    imaging: ["Seen on CT as an early anterior branch of the left pulmonary artery."],
  }, [
    ["Which bronchus does it run with?", "B3", "B1+2", "B4", "B6", "A3 runs forward beside B3 into anterior S3."],
    ["Which vein lies in front of it at the hilum?", "Left superior pulmonary vein", "Left inferior pulmonary vein", "Hemiazygos vein", "Left brachiocephalic vein", "At the left hilum the superior pulmonary vein is the most anterior structure."],
  ]),
  a_se_lsup: card("superior lingular artery (A4)", {
    definition: ["Segmental pulmonary artery to the superior lingular segment."],
    course: ["Arises from the left interlobar artery and runs forward beside B4."],
    relations: ["Lies above A5 in the lingula."],
    supply: ["Superior lingular segment S4."],
    clinical: ["Lingulectomy divides the lingular artery or arteries in the oblique fissure."],
    imaging: ["Seen on CT running anteriorly from the interlobar artery."],
  }, [
    ["Where does it usually arise?", "Interlobar part of the left pulmonary artery", "Anterior trunk of the right pulmonary artery", "Aortic arch", "Basal trunk", "Lingular arteries leave the front of the left interlobar artery."],
    ["Which right-sided artery is its counterpart?", "Lateral middle lobe artery A4", "Right apical artery A1", "Right superior segment artery A6", "Right basal arteries", "The lingula corresponds to the right middle lobe."],
  ]),
  a_se_linf: card("inferior lingular artery (A5)", {
    definition: ["Segmental pulmonary artery to the inferior lingular segment."],
    course: ["Arises from the left interlobar artery and runs forward and down beside B5."],
    relations: ["Its segment lies over the left ventricle."],
    supply: ["Inferior lingular segment S5."],
    clinical: ["Its territory blurs the left heart border when consolidated."],
    imaging: ["Seen on CT running anteroinferiorly into the lingula."],
  }, [
    ["Which segment does it supply?", "Inferior lingular segment", "Superior lingular segment", "Anterior basal segment", "Medial middle lobe segment", "A5 runs with B5 to the inferior lingula."],
    ["What lies medial to its segment?", "Left ventricle", "Aortic arch", "Descending aorta", "Left subclavian artery", "The inferior lingula lies against the left ventricle."],
  ]),
  a_se_sup: card("left superior segmental artery (A6)", {
    definition: ["Segmental pulmonary artery to the superior segment of the left lower lobe."],
    course: ["Arises from the back of the left interlobar artery and runs backward with B6."],
    relations: ["Arises roughly level with the lingular arteries."],
    supply: ["Superior segment S6 of the left lower lobe."],
    clinical: ["S6 is a dependent segment when supine, a site of aspiration pneumonia."],
    imaging: ["Seen on CT running posteriorly from the interlobar artery."],
  }, [
    ["From which side of the interlobar artery does it arise?", "Posterior", "Anterior", "Medial, toward the heart", "Superior, over the bronchus", "A6 leaves the back of the interlobar artery."],
    ["Which bronchus accompanies it?", "B6", "B4", "B1+2", "B9", "A6 runs with the superior segment bronchus."],
  ]),
  a_se_basal: card("left basal segmental arteries (A7–A10)", {
    definition: ["Terminal branches of the left pulmonary artery to the basal segments."],
    course: ["Arise from the basal trunk and fan downward with the basal bronchi."],
    relations: ["Lie above the left hemidiaphragm, lateral to the descending aorta."],
    supply: ["A7+8, A9 and A10 supply left lower lobe S7+8, S9 and S10 in the usual fused pattern."],
    clinical: ["A common site of pulmonary emboli because of high basal flow."],
    imaging: ["CT pulmonary angiography shows them as the terminal fan of the left pulmonary artery."],
  }, [
    ["Which two basal arteries often share a stem on the left?", "A7 and A8", "A9 and A10", "A6 and A7", "A4 and A5", "Like their bronchi, the medial and anterior basal arteries often arise together."],
    ["Which artery do they terminate?", "Left pulmonary artery", "Descending aorta", "Left bronchial artery", "Left inferior pulmonary vein", "The basal arteries are the terminal branches of the left pulmonary artery."],
  ]),
  v_sd_apical: card("right apical vein (V1)", {
    definition: ["Tributary of the right superior pulmonary vein draining the apical segment."],
    course: ["Descends on the mediastinal side of the upper lobe to the right superior pulmonary vein."],
    relations: ["At the edge of S1, look for intersegmental branches between neighboring territories."],
    supply: ["Drains S1 of the right upper lobe. It usually reaches the right superior pulmonary vein."],
    clinical: ["Intersegmental veins guide the plane of a segmentectomy."],
    imaging: ["Seen on CT along the medial upper lobe, anterior to the bronchus."],
  }, [
    ["Into which vein does it drain?", "Right superior pulmonary vein", "Right inferior pulmonary vein", "Superior vena cava", "Azygos vein", "V1 usually joins the right superior pulmonary vein. The middle lobe also usually drains there."],
    ["Where are the veins that define segment boundaries?", "Between segments", "Beside the bronchus", "Inside the bronchial wall", "Only on the pleural surface", "Intersegmental veins mark the boundaries. The artery and bronchus run inside the segment."],
  ]),
  v_sd_post: card("right posterior vein (V2)", {
    definition: ["Posterior upper lobe drainage, commonly via a central venous pathway to the right superior pulmonary vein."],
    course: ["Runs forward across the hilum to join the right superior pulmonary vein."],
    relations: ["In the pattern shown, the interlobar pulmonary artery lies behind it at the hilum."],
    supply: ["Drains S2 of the right upper lobe. It usually reaches the right superior pulmonary vein."],
    clinical: ["Identify the central venous pathway before exposing the interlobar artery."],
    imaging: ["Trace V2 to the hilum on contrast CT. Its course varies."],
  }, [
    ["In the central drainage pattern shown here, what vessel lies behind the vein at the hilum?", "Interlobar pulmonary artery", "Ascending aorta", "Right bronchial artery", "Anterior trunk", "In this pattern the central vein passes in front of the interlobar artery as it approaches the upper venous outlet."],
    ["Into which vein does it drain?", "Right superior pulmonary vein", "Right inferior pulmonary vein", "Azygos vein", "Superior vena cava", "Upper lobe veins join the right superior pulmonary vein."],
  ]),
  v_sd_ant: card("right anterior vein (V3)", {
    definition: ["Tributary of the right superior pulmonary vein from the anterior upper lobe."],
    course: ["Runs medially across the front of the upper lobe to the right superior pulmonary vein."],
    relations: ["Lies above the middle lobe vein, separated by the horizontal fissure."],
    supply: ["Drains S3 of the right upper lobe. It usually reaches the right superior pulmonary vein."],
    clinical: ["Intersegmental branches mark the S3 boundary in segmentectomy."],
    imaging: ["Seen on CT at the anterior upper hilum."],
  }, [
    ["Which segment does it drain?", "Anterior segment of the right upper lobe", "Medial middle lobe segment", "Superior segment of the lower lobe", "Anterior basal segment", "V3 drains S3."],
    ["Into which vein does it empty?", "Right superior pulmonary vein", "Right inferior pulmonary vein", "Right internal thoracic vein", "Right brachiocephalic vein", "Upper lobe veins drain to the superior pulmonary vein."],
  ]),
  v_sd_lat: card("lateral middle lobe vein (V4)", {
    definition: ["Tributary of the middle lobe vein draining the lateral segment."],
    course: ["Runs medially and joins V5 to form the middle lobe vein."],
    relations: ["Lies between the horizontal and oblique fissures."],
    supply: ["Drains S4 of the right middle lobe. It usually reaches the right superior pulmonary vein through the middle lobe vein."],
    clinical: ["The middle lobe vein is preserved during right upper lobectomy."],
    imaging: ["Seen on CT as the lowest tributary of the right superior pulmonary vein."],
  }, [
    ["Where does the right middle lobe vein usually drain?", "Right superior pulmonary vein", "Right inferior pulmonary vein", "Azygos vein", "Inferior vena cava", "V4 and V5 usually join the right superior pulmonary vein."],
    ["Why preserve the middle lobe vein during right upper lobectomy in this pattern?", "It joins the same superior pulmonary vein", "It carries the bronchial arteries", "It drains the liver", "It is the azygos", "Ligating the whole superior vein would leave the middle lobe without venous drainage."],
  ]),
  v_sd_med: card("medial middle lobe vein (V5)", {
    definition: ["Tributary of the middle lobe vein draining the medial segment."],
    course: ["Joins V4 as the middle lobe vein, which enters the right superior pulmonary vein."],
    relations: ["Lies against the right atrium."],
    supply: ["Drains S5 of the right middle lobe. It usually reaches the right superior pulmonary vein through the middle lobe vein."],
    clinical: ["Preserved with V4 during right upper lobectomy."],
    imaging: ["Seen on CT next to the right heart border."],
  }, [
    ["Which segment does it drain?", "Medial segment of the middle lobe", "Lateral segment of the middle lobe", "Medial basal segment", "Apical segment", "V5 drains S5."],
    ["What lies medial to its segment?", "Right atrium", "Descending aorta", "Esophagus", "Left atrium", "The medial middle lobe touches the right heart border."],
  ]),
  v_sd_sup: card("right superior segmental vein (V6)", {
    definition: ["Tributary of the right inferior pulmonary vein draining the superior segment."],
    course: ["Runs forward from the back of the lower lobe to the inferior pulmonary vein."],
    relations: ["The highest tributary of the inferior pulmonary vein."],
    supply: ["Drains S6 of the right lower lobe. It usually reaches the right inferior pulmonary vein."],
    clinical: ["Marks the S6 boundary in a superior segmentectomy."],
    imaging: ["Seen on CT entering the top of the inferior pulmonary vein."],
  }, [
    ["Into which vein does it drain?", "Right inferior pulmonary vein", "Right superior pulmonary vein", "Azygos vein", "Coronary sinus", "Lower lobe veins drain to the inferior pulmonary vein."],
    ["Which segment does it drain?", "Superior segment of the lower lobe", "Posterior segment of the upper lobe", "Posterior basal segment", "Lateral middle lobe segment", "V6 drains S6."],
  ]),
  v_sd_bsup: card("right superior basal vein", {
    definition: ["Tributary of the common basal vein of the right lower lobe."],
    course: ["Joins the inferior basal vein to form the common basal vein."],
    relations: ["Lies above the inferior basal vein."],
    supply: ["Drains mainly S8 and S9 of the right lower lobe. It usually reaches the right inferior pulmonary vein through the common basal vein."],
    clinical: ["Basal veins are divided with the inferior pulmonary vein in a lower lobectomy."],
    imaging: ["Seen on CT converging on the right inferior pulmonary vein."],
  }, [
    ["Which vein does it help form?", "Common basal vein", "Middle lobe vein", "Azygos vein", "Right superior pulmonary vein", "The superior and inferior basal veins form the common basal vein."],
    ["The common basal vein drains into which vessel?", "Right inferior pulmonary vein", "Inferior vena cava", "Right superior pulmonary vein", "Hepatic vein", "With V6, the common basal vein forms the right inferior pulmonary vein."],
  ]),
  v_sd_binf: card("right inferior basal vein", {
    definition: ["Tributary of the common basal vein of the right lower lobe."],
    course: ["Runs upward to join the superior basal vein."],
    relations: ["Lies close to the pulmonary ligament."],
    supply: ["Drains mainly S10 of the right lower lobe. It usually reaches the right inferior pulmonary vein through the common basal vein."],
    clinical: ["Can be torn when the pulmonary ligament is divided."],
    imaging: ["Seen on CT at the lowest part of the right hilum."],
  }, [
    ["Which segment does it mainly drain?", "Posterior basal segment", "Anterior segment of the upper lobe", "Medial middle lobe segment", "Superior segment", "The inferior basal vein drains mainly S10."],
    ["Which fold of pleura lies just below the inferior pulmonary vein?", "Pulmonary ligament", "Horizontal fissure", "Cupula", "Costomediastinal recess", "The pulmonary ligament hangs down from the lower hilum."],
  ]),
  v_se_apicpost: card("left apicoposterior vein (V1+2)", {
    definition: ["Tributary of the left superior pulmonary vein from the apicoposterior segment."],
    course: ["Descends from the back and top of the upper lobe toward the left superior pulmonary vein."],
    relations: ["In the usual pattern, it enters the superior pulmonary vein above the lingular tributary."],
    supply: ["Drains S1+2 of the left upper lobe. It usually reaches the left superior pulmonary vein."],
    clinical: ["Intersegmental branches guide an apicoposterior segmentectomy."],
    imaging: ["Trace the apicoposterior drainage to the left superior vein on contrast CT."],
  }, [
    ["Into which vein does it drain?", "Left superior pulmonary vein", "Left inferior pulmonary vein", "Left brachiocephalic vein", "Hemiazygos vein", "V1+2 usually joins the left superior pulmonary vein."],
    ["Which segment does it drain?", "Apicoposterior segment", "Superior lingular segment", "Superior segment of the lower lobe", "Anterior basal segment", "V1+2 drains S1+2."],
  ]),
  v_se_ant: card("left anterior vein (V3)", {
    definition: ["Tributary of the left superior pulmonary vein from the anterior segment."],
    course: ["Runs medially to the left superior pulmonary vein."],
    relations: ["Enters between the apicoposterior and lingular tributaries."],
    supply: ["Drains S3 of the left upper lobe. It usually reaches the left superior pulmonary vein."],
    clinical: ["Identify V3 and preserve anterior segment drainage during lingulectomy."],
    imaging: ["Seen on CT at the anterior left hilum."],
  }, [
    ["Which tributary enters below it?", "Lingular vein", "Apicoposterior vein", "Superior segmental vein V6", "Common basal vein", "The lingular vein is the lowest tributary of the left superior pulmonary vein."],
    ["Into which vein does it drain?", "Left superior pulmonary vein", "Left inferior pulmonary vein", "Coronary sinus", "Left internal thoracic vein", "Upper lobe veins join the superior pulmonary vein."],
  ]),
  v_se_ling: card("lingular vein", {
    definition: ["Lowest tributary of the left superior pulmonary vein, draining the lingula."],
    course: ["Formed by superior and inferior lingular branches, it runs medially to the superior pulmonary vein."],
    relations: ["Lies over the left ventricle and auricle."],
    supply: ["Drains S4 and S5 of the left upper lobe. It usually reaches the left superior pulmonary vein."],
    clinical: ["Trace V4 and V5 before lingulectomy. Their drainage pattern can vary."],
    imaging: ["Seen on CT at the lower border of the left superior pulmonary vein."],
  }, [
    ["Which right-sided vein does it mirror?", "Middle lobe vein", "Right apical vein", "Right superior basal vein", "Azygos vein", "The lingula corresponds to the right middle lobe."],
    ["Into which vein does it drain?", "Left superior pulmonary vein", "Left inferior pulmonary vein", "Great cardiac vein", "Hemiazygos vein", "The lingular vein is the lowest tributary of the left superior pulmonary vein."],
  ]),
  v_se_sup: card("left superior segmental vein (V6)", {
    definition: ["Tributary of the left inferior pulmonary vein draining the superior segment."],
    course: ["Runs forward from the back of the lower lobe to the inferior pulmonary vein."],
    relations: ["The highest tributary of the left inferior pulmonary vein."],
    supply: ["Drains S6 of the left lower lobe. It usually reaches the left inferior pulmonary vein."],
    clinical: ["Marks the S6 boundary in a superior segmentectomy."],
    imaging: ["Seen on CT entering the top of the left inferior pulmonary vein."],
  }, [
    ["Into which vein does it drain?", "Left inferior pulmonary vein", "Left superior pulmonary vein", "Hemiazygos vein", "Coronary sinus", "Lower lobe veins drain to the inferior pulmonary vein."],
    ["Which segment does it drain?", "Superior segment of the lower lobe", "Apicoposterior segment", "Inferior lingular segment", "Lateral basal segment", "V6 drains S6."],
  ]),
  v_se_bsup: card("left superior basal vein", {
    definition: ["Tributary of the common basal vein of the left lower lobe."],
    course: ["Joins the inferior basal vein to form the common basal vein."],
    relations: ["Lies above the inferior basal vein."],
    supply: ["Drains mainly S7+8 and S9 of the left lower lobe. It usually reaches the left inferior pulmonary vein through the common basal vein."],
    clinical: ["Divided with the inferior pulmonary vein in a left lower lobectomy."],
    imaging: ["Seen on CT converging on the left inferior pulmonary vein."],
  }, [
    ["Which vein does it help form?", "Common basal vein", "Lingular vein", "Hemiazygos vein", "Left superior pulmonary vein", "The superior and inferior basal veins form the common basal vein."],
    ["Which pulmonary vein receives the common basal vein?", "Left inferior pulmonary vein", "Left superior pulmonary vein", "Right inferior pulmonary vein", "Coronary sinus", "With V6, the common basal vein forms the left inferior pulmonary vein."],
  ]),
  v_se_binf: card("left inferior basal vein", {
    definition: ["Tributary of the common basal vein of the left lower lobe."],
    course: ["Runs upward to join the superior basal vein."],
    relations: ["Lies close to the pulmonary ligament and descending aorta."],
    supply: ["Drains mainly S10 of the left lower lobe. It usually reaches the left inferior pulmonary vein through the common basal vein."],
    clinical: ["Can be torn when the pulmonary ligament is divided."],
    imaging: ["Seen on CT at the lowest part of the left hilum."],
  }, [
    ["Which segment does it mainly drain?", "Posterior basal segment", "Inferior lingular segment", "Anterior segment", "Superior segment", "The inferior basal vein drains mainly S10."],
    ["Which large vessel lies medial to it?", "Descending aorta", "Superior vena cava", "Pulmonary trunk", "Ascending aorta", "The left lower hilum lies beside the descending aorta."],
  ]),
  pap_ve_pm: card("posteromedial papillary muscle", {
    definition: ["Left ventricular papillary muscle on the inferior wall that tensions mitral chordae in systole."],
    location: ["Arises from the inferior wall of the left ventricle near the septum."],
    relations: ["Sends chordae to the posteromedial parts of both mitral leaflets."],
    supply: ["Usually a single arterial source in the inferior coronary territory, commonly the PDA."],
    clinical: ["Rupture after inferior infarction causes acute severe mitral regurgitation."],
    imaging: ["Echocardiography shows a flail mitral leaflet when it ruptures."],
  }, [
    ["Which artery usually supplies it alone?", "Posterior descending artery", "LAD", "Circumflex marginals and diagonals together", "Conus artery", "Single supply from the PDA makes it vulnerable to ischaemia."],
    ["Which infarct most often ruptures it?", "Inferior infarction", "Anterior infarction", "Lateral infarction", "Right atrial infarction", "The PDA supplies the inferior wall, so inferior infarction threatens this muscle."],
  ]),
  vsc_d: card("right subclavian vein", {
    definition: ["Continuation of the axillary vein from the first rib to the venous angle."],
    course: ["Arches over the first rib in front of the anterior scalene and joins the internal jugular vein behind the sternoclavicular joint."],
    relations: ["The anterior scalene separates it from the subclavian artery behind."],
    branches: ["Receives the external jugular vein; the right lymph trunks end at the right venous angle."],
    clinical: ["Central venous catheterisation risks pneumothorax because the pleural dome lies just below."],
    imaging: ["Ultrasound guides cannulation and shows thrombosis."],
  }, [
    ["What separates it from the subclavian artery?", "Anterior scalene muscle", "Middle scalene muscle", "Clavicle", "First rib", "The vein lies in front of the anterior scalene, the artery behind it."],
    ["With which vein does it form the brachiocephalic vein?", "Internal jugular vein", "External jugular vein", "Azygos vein", "Vertebral vein", "Subclavian and internal jugular veins meet behind the sternoclavicular joint."],
  ]),
  vsc_e: card("left subclavian vein", {
    definition: ["Continuation of the axillary vein from the first rib to the venous angle."],
    course: ["Arches over the first rib in front of the anterior scalene and joins the internal jugular vein behind the sternoclavicular joint."],
    relations: ["The anterior scalene separates it from the subclavian artery behind."],
    branches: ["Receives the external jugular vein; the thoracic duct ends at the left venous angle."],
    clinical: ["Central venous catheterisation risks pneumothorax because the pleural dome lies just below."],
    imaging: ["Ultrasound guides cannulation and shows thrombosis."],
  }, [
    ["What separates it from the subclavian artery?", "Anterior scalene muscle", "Middle scalene muscle", "Clavicle", "First rib", "The vein lies in front of the anterior scalene, the artery behind it."],
    ["With which vein does it form the brachiocephalic vein?", "Internal jugular vein", "External jugular vein", "Azygos vein", "Vertebral vein", "Subclavian and internal jugular veins meet behind the sternoclavicular joint."],
  ]),
  ttc_d: card("right thyrocervical trunk", {
    definition: ["Short branch of the first part of the subclavian artery."],
    course: ["Rises at the medial border of the anterior scalene and divides almost at once."],
    relations: ["The inferior thyroid artery loops medially behind the carotid sheath near the recurrent laryngeal nerve."],
    branches: ["Inferior thyroid, suprascapular and transverse cervical arteries."],
    clinical: ["Its branches form collaterals around the scapula when the subclavian or axillary artery is blocked."],
    imaging: ["Seen on subclavian angiography just distal to the vertebral artery."],
  }, [
    ["From which part of the subclavian artery does it arise?", "First part, medial to the anterior scalene", "Second part, behind the scalene", "Third part, lateral to the scalene", "Axillary artery", "The vertebral, internal thoracic and thyrocervical trunk come from the first part."],
    ["Which of these is one of its branches?", "Inferior thyroid artery", "Superior thyroid artery", "Vertebral artery", "Internal thoracic artery", "The superior thyroid comes from the external carotid."],
  ]),
  ttc_e: card("left thyrocervical trunk", {
    definition: ["Short branch of the first part of the subclavian artery."],
    course: ["Rises at the medial border of the anterior scalene and divides almost at once."],
    relations: ["The inferior thyroid artery loops medially behind the carotid sheath near the recurrent laryngeal nerve."],
    branches: ["Inferior thyroid, suprascapular and transverse cervical arteries."],
    clinical: ["Its branches form collaterals around the scapula when the subclavian or axillary artery is blocked."],
    imaging: ["Seen on subclavian angiography just distal to the vertebral artery."],
  }, [
    ["From which part of the subclavian artery does it arise?", "First part, medial to the anterior scalene", "Second part, behind the scalene", "Third part, lateral to the scalene", "Axillary artery", "The vertebral, internal thoracic and thyrocervical trunk come from the first part."],
    ["Which of these is one of its branches?", "Inferior thyroid artery", "Superior thyroid artery", "Vertebral artery", "Internal thoracic artery", "The superior thyroid comes from the external carotid."],
  ]),
  tcc_d: card("right costocervical trunk", {
    definition: ["Branch of the subclavian artery to the deep neck and the first two intercostal spaces."],
    course: ["Arches backward over the cervical pleura to the neck of the first rib."],
    relations: ["Lies above the pleural dome and near the cervicothoracic ganglion."],
    branches: ["Deep cervical artery and superior intercostal artery."],
    clinical: ["Rib notching in coarctation spares ribs 1 and 2 because their intercostals arise from this trunk."],
    imaging: ["Seen on subclavian angiography heading posteriorly."],
  }, [
    ["Which two branches does it give?", "Deep cervical and superior intercostal arteries", "Inferior thyroid and suprascapular arteries", "Vertebral and internal thoracic arteries", "Musculophrenic and superior epigastric arteries", "The costocervical trunk divides at the neck of the first rib."],
    ["Why are ribs 1–2 spared from notching in coarctation?", "Their intercostal arteries arise from this trunk", "They have no costal groove", "They are not ossified", "They lie below the coarctation", "The first two posterior intercostals come from the superior intercostal branch, not the aorta."],
  ]),
  tcc_e: card("left costocervical trunk", {
    definition: ["Branch of the subclavian artery to the deep neck and the first two intercostal spaces."],
    course: ["Arches backward over the cervical pleura to the neck of the first rib."],
    relations: ["Lies above the pleural dome and near the cervicothoracic ganglion."],
    branches: ["Deep cervical artery and superior intercostal artery."],
    clinical: ["Rib notching in coarctation spares ribs 1 and 2 because their intercostals arise from this trunk."],
    imaging: ["Seen on subclavian angiography heading posteriorly."],
  }, [
    ["Which two branches does it give?", "Deep cervical and superior intercostal arteries", "Inferior thyroid and suprascapular arteries", "Vertebral and internal thoracic arteries", "Musculophrenic and superior epigastric arteries", "The costocervical trunk divides at the neck of the first rib."],
    ["Why are ribs 1–2 spared from notching in coarctation?", "Their intercostal arteries arise from this trunk", "They have no costal groove", "They are not ossified", "They lie below the coarctation", "The first two posterior intercostals come from the superior intercostal branch, not the aorta."],
  ]),
  pica_rest_d: card("right posterior intercostal arteries 3–11", {
    definition: ["Paired segmental branches of the descending thoracic aorta to intercostal spaces 3–11."],
    course: ["Leave the back of the aorta and run laterally in the costal groove of the rib above."],
    relations: ["The right arteries are longer and cross the vertebral bodies; in the groove the order is vein, artery, nerve."],
    branches: ["Dorsal branches to the back muscles and spinal cord, collateral branches, and lateral cutaneous branches."],
    clinical: ["Rib notching in coarctation; a chest drain goes above the rib to avoid the neurovascular bundle."],
    imaging: ["CT angiography shows them enlarged and tortuous in coarctation."],
  }, [
    ["What is the order of the bundle in the costal groove from above down?", "Vein, artery, nerve", "Nerve, artery, vein", "Artery, vein, nerve", "Vein, nerve, artery", "VAN: vein highest, nerve lowest."],
    ["Why does a chest drain go just above a rib?", "To avoid the neurovascular bundle in the groove below the rib above", "Because the pleura is thinner there", "To enter the pericardium", "To avoid the internal thoracic artery", "The intercostal vessels and nerve run under the lower border of each rib."],
  ]),
  pica_rest_e: card("left posterior intercostal arteries 3–11", {
    definition: ["Paired segmental branches of the descending thoracic aorta to intercostal spaces 3–11."],
    course: ["Leave the back of the aorta and run laterally in the costal groove of the rib above."],
    relations: ["The right arteries are longer and cross the vertebral bodies; in the groove the order is vein, artery, nerve."],
    branches: ["Dorsal branches to the back muscles and spinal cord, collateral branches, and lateral cutaneous branches."],
    clinical: ["Rib notching in coarctation; a chest drain goes above the rib to avoid the neurovascular bundle."],
    imaging: ["CT angiography shows them enlarged and tortuous in coarctation."],
  }, [
    ["What is the order of the bundle in the costal groove from above down?", "Vein, artery, nerve", "Nerve, artery, vein", "Artery, vein, nerve", "Vein, nerve, artery", "VAN: vein highest, nerve lowest."],
    ["Why does a chest drain go just above a rib?", "To avoid the neurovascular bundle in the groove below the rib above", "Because the pleura is thinner there", "To enter the pericardium", "To avoid the internal thoracic artery", "The intercostal vessels and nerve run under the lower border of each rib."],
  ]),
  mfa_d: card("right musculophrenic artery", {
    definition: ["Lateral terminal branch of the internal thoracic artery."],
    course: ["Runs from the 6th intercostal space along the costal margin behind the cartilages."],
    relations: ["Lies on the diaphragm at the costal margin."],
    branches: ["Anterior intercostal arteries to spaces 7–9 and diaphragmatic branches."],
    clinical: ["Anastomoses with the lower posterior intercostals and can carry collateral flow."],
    imaging: ["Seen on CT angiography along the costal margin."],
  }, [
    ["Where does it arise?", "6th intercostal space, from the internal thoracic artery", "From the descending aorta at T10", "From the inferior phrenic artery", "From the costocervical trunk", "The internal thoracic artery divides in the 6th intercostal space."],
    ["Which anterior intercostal arteries does it give?", "Spaces 7–9", "Spaces 1–6", "Spaces 10–11", "None", "Spaces 1–6 are supplied directly by the internal thoracic artery."],
  ]),
  mfa_e: card("left musculophrenic artery", {
    definition: ["Lateral terminal branch of the internal thoracic artery."],
    course: ["Runs from the 6th intercostal space along the costal margin behind the cartilages."],
    relations: ["Lies on the diaphragm at the costal margin."],
    branches: ["Anterior intercostal arteries to spaces 7–9 and diaphragmatic branches."],
    clinical: ["Anastomoses with the lower posterior intercostals and can carry collateral flow."],
    imaging: ["Seen on CT angiography along the costal margin."],
  }, [
    ["Where does it arise?", "6th intercostal space, from the internal thoracic artery", "From the descending aorta at T10", "From the inferior phrenic artery", "From the costocervical trunk", "The internal thoracic artery divides in the 6th intercostal space."],
    ["Which anterior intercostal arteries does it give?", "Spaces 7–9", "Spaces 1–6", "Spaces 10–11", "None", "Spaces 1–6 are supplied directly by the internal thoracic artery."],
  ]),
  aes_d: card("right superior epigastric artery", {
    definition: ["Medial terminal branch of the internal thoracic artery."],
    course: ["Descends through the sternocostal triangle into the rectus sheath."],
    relations: ["Runs behind rectus abdominis to meet the inferior epigastric artery."],
    branches: ["Muscular and cutaneous branches to the upper abdominal wall."],
    clinical: ["Collateral route between subclavian and external iliac territories."],
    imaging: ["CT angiography shows it enlarged in aortic obstruction."],
  }, [
    ["Which artery does it anastomose with?", "Inferior epigastric artery", "Superficial epigastric artery", "Musculophrenic artery", "Inferior phrenic artery", "The superior and inferior epigastric arteries meet in the rectus sheath."],
    ["Through which gap does it leave the thorax?", "Sternocostal triangle of the diaphragm", "Aortic hiatus", "Esophageal hiatus", "Caval opening", "It passes between the sternal and costal parts of the diaphragm."],
  ]),
  aes_e: card("left superior epigastric artery", {
    definition: ["Medial terminal branch of the internal thoracic artery."],
    course: ["Descends through the sternocostal triangle into the rectus sheath."],
    relations: ["Runs behind rectus abdominis to meet the inferior epigastric artery."],
    branches: ["Muscular and cutaneous branches to the upper abdominal wall."],
    clinical: ["Collateral route between subclavian and external iliac territories."],
    imaging: ["CT angiography shows it enlarged in aortic obstruction."],
  }, [
    ["Which artery does it anastomose with?", "Inferior epigastric artery", "Superficial epigastric artery", "Musculophrenic artery", "Inferior phrenic artery", "The superior and inferior epigastric arteries meet in the rectus sheath."],
    ["Through which gap does it leave the thorax?", "Sternocostal triangle of the diaphragm", "Aortic hiatus", "Esophageal hiatus", "Caval opening", "It passes between the sternal and costal parts of the diaphragm."],
  ]),
};

const larynx = {
  lar_hio: card('hyoid bone', {
    definition: ['Mobile U-shaped bone at C3, between the tongue and the larynx.'],
    location: ['Body in front, greater horns projecting backward and upward; it lies above the thyroid cartilage and below the mandible.'],
    relations: ['Thyrohyoid membrane below, hyoepiglottic ligament behind and stylohyoid ligament to the styloid process; suprahyoid and infrahyoid muscles attach to it.'],
    function: ['Suspends the larynx and tongue and rises with the larynx during swallowing.'],
    clinical: ['It is the only bone of the laryngeal skeleton and can be fractured by strangulation; its greater horn is palpable deep to the sternocleidomastoid.'],
  }, [
    ["Which bone suspends the larynx from above?", "Hyoid", "Thyroid cartilage", "Cricoid cartilage", "Mandible", "The hyoid sits at C3, and the thyrohyoid membrane hangs the larynx from it."],
    ["At which vertebral level is the hyoid bone?", "C3", "C4", "C6", "T1", "The hyoid lies at C3, above the thyroid cartilage at C4–C5 and the cricoid at C6."],
  ]),
  lar_tir: card('thyroid cartilage', {
    definition: ['Largest laryngeal cartilage, formed by two laminae that meet anteriorly at the laryngeal prominence.'],
    location: ['Anterior neck at C4–C5, below the hyoid and above the cricoid.'],
    relations: ['Thyrohyoid membrane above; cricothyroid ligament and cricothyroid muscle below; arytenoids behind; vocal ligaments attach to its inner angle.'],
    function: ['Shields the vocal folds; its inferior horns form the cricothyroid joints, so tilting the cartilage tenses the folds.'],
    clinical: ['The laryngeal prominence is the palpable Adam\'s apple; a fracture can compromise the airway.'],
  }, [
    ["Which laryngeal cartilage is the largest?", "Thyroid", "Cricoid", "Arytenoid", "Epiglottis", "The thyroid cartilage is the largest; its two laminae meet at the laryngeal prominence."],
    ["Which joint do the inferior horns of the thyroid cartilage form?", "Cricothyroid joint", "Cricoarytenoid joint", "Thyrohyoid joint", "Temporomandibular joint", "The inferior horns articulate with the cricoid, allowing the thyroid to tilt and tense the vocal folds."],
  ]),
  lar_cri: card('cricoid cartilage', {
    definition: ['Only complete cartilaginous ring of the airway, shaped like a signet ring.'],
    location: ['At C6, below the thyroid cartilage and directly above the first tracheal ring.'],
    relations: ['Arytenoids on its lamina; thyroid inferior horns at its sides; median cricothyroid ligament in front; esophagus behind.'],
    function: ['Keeps the airway open and provides the pivot for arytenoid movement.'],
    clinical: ['C6 marks the cricoid and the start of the trachea and esophagus; cricoid pressure compresses the esophagus during rapid-sequence intubation.'],
  }, [
    ["Which cartilage is the only complete ring in the airway?", "Cricoid", "Thyroid", "Arytenoid", "Epiglottis", "The cricoid is a full ring with a narrow arch in front and a tall lamina behind."],
    ["At which vertebral level does the cricoid cartilage lie?", "C6", "C3", "C4", "T4", "The cricoid lies at C6, where the trachea and esophagus begin."],
  ]),
  lar_epi: card('epiglottis', {
    definition: ['Leaf-shaped elastic cartilage guarding the laryngeal inlet.'],
    location: ['Behind the tongue root and hyoid, with its stalk fixed to the back of the thyroid angle.'],
    relations: ['Hyoepiglottic ligament in front, thyroepiglottic ligament below, aryepiglottic folds at its sides; the vallecula separates it from the tongue.'],
    function: ['Folds backward over the inlet during swallowing to keep food out of the airway.'],
    clinical: ['Epiglottitis causes a swollen epiglottis (thumb sign) and airway obstruction; the vallecula is the laryngoscopic landmark.'],
  }, [
    ["Which cartilage guards the laryngeal inlet?", "Epiglottis", "Thyroid", "Cricoid", "Corniculate", "The epiglottis folds back over the inlet during swallowing."],
    ["What is the vallecula?", "The depression between the tongue base and the epiglottis", "The space between the arytenoids", "The recess below the vocal folds", "The pocket above the cricoid", "The vallecula lies between the tongue root and the anterior epiglottis and receives the laryngoscope blade."],
  ]),
  lar_ari: card('arytenoid cartilages', {
    definition: ['Paired pyramidal cartilages that pivot on the cricoid and move the vocal folds.'],
    location: ['On the upper border of the cricoid lamina at the back of the larynx.'],
    relations: ['Vocal process forward for the vocal ligament; muscular process laterally for the posterior and lateral cricoarytenoids; corniculate cartilage on the apex.'],
    function: ['Rotation and sliding open or close the rima glottidis and adjust fold tension.'],
    clinical: ['Every intrinsic muscle except the cricothyroid acts on them, so fixation after recurrent nerve injury holds the fold still.'],
  }, [
    ["Which process of the arytenoid holds the vocal ligament?", "Vocal process", "Muscular process", "Superior process", "Articular process", "The vocal process points forward and gives attachment to the vocal ligament."],
    ["On which cartilage do the arytenoids sit?", "Cricoid", "Thyroid", "Epiglottis", "Hyoid", "The arytenoids articulate with the upper border of the cricoid lamina."],
  ]),
  lar_cor: card('corniculate cartilages', {
    definition: ['Small conical nodules of elastic cartilage on the arytenoid apices.'],
    location: ['At the top of each arytenoid, inside the aryepiglottic fold.'],
    relations: ['They sit on the arytenoids, with the cuneiform cartilages just in front in the same fold.'],
    function: ['They support the aryepiglottic fold and serve as laryngoscopic landmarks; they have no muscle attachments.'],
    clinical: ['They are visible at laryngoscopy at the back of the inlet and take no part in vocal fold movement.'],
  }, [
    ["On which cartilages do the corniculate cartilages sit?", "Arytenoids", "Cricoid", "Thyroid", "Epiglottis", "Each corniculate sits on the apex of an arytenoid and projects into the aryepiglottic fold."],
    ["What is the main role of the corniculate cartilages?", "They support the aryepiglottic folds", "They tense the vocal folds", "They open the glottis", "They seal the trachea", "They are minor elastic cartilages that reinforce the aryepiglottic folds."],
  ]),
  lar_mth: card('thyrohyoid membrane', {
    definition: ['Fibroelastic sheet between the hyoid and the upper border of the thyroid cartilage.'],
    location: ['From the hyoid down to the thyroid lamina, thickened in the midline as the median thyrohyoid ligament.'],
    relations: ['Pierced by the internal branch of the superior laryngeal nerve and the superior laryngeal artery; lateral thyrohyoid ligaments at its edges.'],
    function: ['Suspends the larynx from the hyoid and allows it to rise during swallowing.'],
    clinical: ['The internal laryngeal nerve carries sensation above the vocal folds; its injury predisposes to aspiration.'],
  }, [
    ["Which nerve pierces the thyrohyoid membrane?", "Internal branch of the superior laryngeal nerve", "Recurrent laryngeal nerve", "External branch of the superior laryngeal nerve", "Glossopharyngeal nerve", "The internal laryngeal nerve and superior laryngeal artery pierce the membrane."],
    ["What does the thyrohyoid membrane connect?", "Hyoid and thyroid cartilage", "Thyroid and cricoid cartilage", "Cricoid and trachea", "Epiglottis and hyoid", "It hangs the thyroid cartilage from the hyoid."],
  ]),
  lar_mct: card('median cricothyroid ligament', {
    definition: ['Thick midline part of the cricothyroid membrane between the cricoid arch and the lower thyroid border.'],
    location: ['Just under the skin in the midline, below the laryngeal prominence.'],
    relations: ['Laterally continuous with the conus elasticus, whose free edge is the vocal ligament; cricothyroid muscles lie on each side.'],
    function: ['Closes the front of the larynx below the vocal folds and is the route for emergency cricothyrotomy.'],
    clinical: ['It lies below the vocal folds, so cricothyrotomy avoids them; in small children the ligament is narrow, so needle access or tracheotomy is preferred.'],
  }, [
    ["Which structure is divided in an emergency cricothyrotomy?", "Median cricothyroid ligament", "Thyrohyoid membrane", "Vocal ligament", "Hyoepiglottic ligament", "Cricothyrotomy passes through the median cricothyroid ligament below the vocal folds."],
    ["The vocal ligaments are the free upper edge of which membrane?", "Cricothyroid membrane (conus elasticus)", "Thyrohyoid membrane", "Quadrangular membrane", "Pharyngobasilar fascia", "The conus elasticus rises from the cricoid, and its free upper border is the vocal ligament."],
  ]),
  lar_vl: card('vocal ligaments', {
    definition: ['Paired bands of dense connective tissue forming the core of the true vocal folds.'],
    location: ['From the vocal process of the arytenoid to the inner angle of the thyroid cartilage.'],
    relations: ['Free upper edge of the conus elasticus; vocalis muscle lies lateral; the gap between them is the rima glottidis.'],
    function: ['They vibrate for phonation; tension and length set pitch.'],
    clinical: ['Vocal fold nodules and polyps form on the mucosa over them; their tension is adjusted by cricothyroid and thyroarytenoid.'],
  }, [
    ["Between which two structures does each vocal ligament run?", "Thyroid angle and vocal process", "Cricoid arch and muscular process", "Hyoid and epiglottis", "Arytenoid apex and corniculate", "Each vocal ligament stretches from the inner thyroid angle to the vocal process of the arytenoid."],
    ["What is the gap between the vocal ligaments called?", "Rima glottidis", "Laryngeal inlet", "Laryngeal vestibule", "Vallecula", "The rima glottidis is the space between the vocal folds and their cartilaginous support."],
  ]),
  lar_he: card('hyoepiglottic ligament', {
    definition: ['Short elastic band between the anterior epiglottis and the body of the hyoid.'],
    location: ['In the midline, forming the floor of the vallecula.'],
    relations: ['Above the thyrohyoid membrane; the tongue root lies in front and the epiglottis behind.'],
    function: ['Holds the epiglottis forward and lets it fold back during swallowing.'],
    clinical: ['The vallecula is where the laryngoscope blade tip sits; tumours here can spread to the pre-epiglottic space.'],
  }, [
    ["Which ligament forms the floor of the vallecula?", "Hyoepiglottic ligament", "Thyroepiglottic ligament", "Thyrohyoid membrane", "Vocal ligament", "The hyoepiglottic ligament spans the gap between hyoid and epiglottis as the vallecular floor."],
    ["What does the hyoepiglottic ligament connect?", "Epiglottis and hyoid", "Epiglottis and thyroid cartilage", "Hyoid and thyroid cartilage", "Cricoid and thyroid cartilage", "It ties the front of the epiglottis to the hyoid body."],
  ]),
  lar_te: card('thyroepiglottic ligament', {
    definition: ['Ligament attaching the stalk of the epiglottis to the inner surface of the thyroid angle.'],
    location: ['Inside the thyroid angle, just above the vocal ligament attachment.'],
    relations: ['Continuous with the quadrangular membrane; pre-epiglottic fat lies in front of it.'],
    function: ['Fixes the lower epiglottis so the upper part can tip backward over the inlet.'],
    clinical: ['It defines the lower limit of the pre-epiglottic space, a route for spread of supraglottic carcinoma.'],
  }, [
    ["Where does the thyroepiglottic ligament attach?", "Stalk of the epiglottis to the thyroid angle", "Hyoid to the thyroid cartilage", "Arytenoid to the cricoid", "Cricoid to the trachea", "It anchors the epiglottic petiole inside the thyroid angle."],
    ["Which structure does the thyroepiglottic ligament fix?", "Epiglottis", "Arytenoid cartilage", "Corniculate cartilage", "Cricoid cartilage", "It fixes the lower end of the epiglottis while the upper part folds back."],
  ]),
  lar_ct: card('cricothyroid muscle', {
    definition: ['Only intrinsic laryngeal muscle on the external surface and the main tensor of the vocal folds.'],
    location: ['From the cricoid arch up to the thyroid lamina and inferior horn, with straight and oblique parts.'],
    relations: ['Supplied by the external branch of the superior laryngeal nerve; lies deep to the sternothyroid.'],
    function: ['Tilts the thyroid forward, lengthening and tightening the vocal ligaments to raise pitch.'],
    clinical: ['Thyroidectomy can injure its nerve, causing loss of high pitch and a monotone voice.'],
  }, [
    ["Which laryngeal muscle is supplied by the external branch of the superior laryngeal nerve?", "Cricothyroid", "Posterior cricoarytenoid", "Thyroarytenoid", "Lateral cricoarytenoid", "The cricothyroid is the only intrinsic muscle not supplied by the recurrent laryngeal nerve."],
    ["What action does the cricothyroid produce?", "Tilts the thyroid forward and tenses the folds", "Adducts the arytenoid", "Abducts the folds", "Shortens and relaxes the folds", "Tilting the thyroid forward lengthens and tightens the vocal ligaments."],
  ]),
  lar_pca: card('posterior cricoarytenoid muscle', {
    definition: ['Only abductor of the vocal folds.'],
    location: ['From the posterior surface of the cricoid lamina to the arytenoid muscular process.'],
    relations: ['Supplied by the recurrent laryngeal nerve; lies against the laryngopharynx and is the first muscle to act during inspiration.'],
    function: ['Rotates the arytenoid outward and opens the rima glottidis for breathing.'],
    clinical: ['Bilateral recurrent nerve palsy paralyses both muscles, leaving the folds near the midline and causing stridor.'],
  }, [
    ["Which muscle is the only abductor of the vocal folds?", "Posterior cricoarytenoid", "Lateral cricoarytenoid", "Cricothyroid", "Thyroarytenoid", "The posterior cricoarytenoid is the only muscle that opens the rima glottidis."],
    ["Bilateral paralysis of which muscle causes stridor?", "Posterior cricoarytenoid", "Lateral cricoarytenoid", "Cricothyroid", "Vocalis", "Losing both abductors leaves the folds closed near the midline, obstructing the airway."],
  ]),
  lar_lca: card('lateral cricoarytenoid muscle', {
    definition: ['Main adductor of the vocal folds, closing the glottis during phonation, coughing and swallowing.'],
    location: ['From the lateral cricoid arch to the arytenoid muscular process, inside the thyroid lamina.'],
    relations: ['Supplied by the recurrent laryngeal nerve; antagonist of the posterior cricoarytenoid.'],
    function: ['Rotates the arytenoid inward and closes the intermembranous glottis.'],
    clinical: ['After recurrent nerve injury, unopposed cricothyroid action and fibrosis can hold the fold in a paramedian position.'],
  }, [
    ["Which muscle adducts the vocal folds?", "Lateral cricoarytenoid", "Posterior cricoarytenoid", "Cricothyroid", "Thyroarytenoid", "The lateral cricoarytenoid rotates the arytenoid inward and closes the glottis."],
    ["On which process does the lateral cricoarytenoid insert?", "Muscular process", "Vocal process", "Superior process", "Styloid process", "It inserts on the muscular process of the arytenoid, like the posterior cricoarytenoid."],
  ]),
  lar_arit: card('interarytenoid muscles', {
    definition: ['Transverse and oblique arytenoid muscles that pull the arytenoids together.'],
    location: ['Between the posterior surfaces of the two arytenoids.'],
    relations: ['Transverse fibres span the gap; oblique fibres cross to the opposite apex and continue as the aryepiglottic muscle; recurrent laryngeal nerve.'],
    function: ['They close the posterior intercartilaginous glottis and narrow the laryngeal inlet.'],
    clinical: ['They complete glottic closure during phonation and coughing; weakness causes a breathy voice.'],
  }, [
    ["Which muscle closes the posterior intercartilaginous glottis?", "Transverse arytenoid", "Posterior cricoarytenoid", "Cricothyroid", "Thyroarytenoid", "The transverse arytenoid adducts the arytenoids and closes the posterior glottis."],
    ["Which intrinsic laryngeal muscle is unpaired?", "Transverse arytenoid", "Oblique arytenoid", "Lateral cricoarytenoid", "Vocalis", "The transverse arytenoid is the only unpaired intrinsic muscle; the oblique fibres are paired and crossed."],
  ]),
  lar_ta: card('thyroarytenoid muscle', {
    definition: ['Muscle running beside each vocal fold that shortens and relaxes it.'],
    location: ['From the inner thyroid angle to the anterolateral arytenoid, lateral to the vocal ligament.'],
    relations: ['Its medial part is the vocalis; supplied by the recurrent laryngeal nerve.'],
    function: ['Pulls the arytenoid forward, shortening and relaxing the fold and lowering pitch; also helps adduct.'],
    clinical: ['It is the muscle injected in spasmodic dysphonia and affected by age-related atrophy.'],
  }, [
    ["Which muscle shortens and relaxes the vocal folds?", "Thyroarytenoid", "Cricothyroid", "Posterior cricoarytenoid", "Lateral cricoarytenoid", "The thyroarytenoid pulls the arytenoid forward and slackens the vocal ligament."],
    ["Which part of the thyroarytenoid lies against the vocal ligament?", "Vocalis", "Oblique part", "Straight part", "Aryepiglottic part", "The vocalis is the deep medial portion of the thyroarytenoid beside the vocal ligament."],
  ]),
  lar_voc: card('vocalis muscle', {
    definition: ['Deep medial part of the thyroarytenoid lying against the vocal ligament.'],
    location: ['Within the vocal fold, from the thyroid angle to the vocal process.'],
    relations: ['Lateral to the vocal ligament and medial to the rest of the thyroarytenoid; recurrent laryngeal nerve.'],
    function: ['Fine-tunes tension along different parts of the fold for pitch and voice quality.'],
    clinical: ['Atrophy with age contributes to presbyphonia; strain causes mucosal changes and dysphonia.'],
  }, [
    ["The vocalis is the medial part of which muscle?", "Thyroarytenoid", "Cricothyroid", "Posterior cricoarytenoid", "Interarytenoid", "The vocalis is the deep medial portion of the thyroarytenoid."],
    ["What is the main action of the vocalis?", "Fine-tunes tension along the vocal fold", "Abducts the vocal fold", "Closes the laryngeal inlet", "Tilts the thyroid cartilage", "Vocalis fibres adjust tension along parts of the fold for pitch and voice quality."],
  ]),
};

for (const c of Object.values(larynx)) for (const q of c.mcq) q.exam = true;

export const CONTENT = {
  ...larynx,
  ...chambers,
  ...valves,
  ...coronaryArteries,
  ...cardiacVeins,
  ...greatVessels,
  ...airways,
  ...lungSegments,
  ...mediastinum,
  ...zAnatomyExtras,
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
    q: 'How do you distinguish the PDA from a wraparound LAD?',
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
    a: 'A2 to posterior S2 can arise separately from the interlobar artery. Trace its origin before assigning the upper lobe supply.',
  },
  vpsd: {
    q: 'Why does middle lobe drainage matter in right upper lobectomy?',
    a: 'V4 and V5 usually reach the right superior pulmonary vein. Preserve the middle lobe outflow when it shares that vein with the upper lobe.',
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
  lar_hio: {
    q: 'Why does the larynx rise during swallowing?',
    a: 'Suprahyoid muscles lift the hyoid and larynx, helping the epiglottis fold and the bolus pass into the esophagus.',
  },
  lar_tir: {
    q: 'What is the clinical importance of the laryngeal prominence?',
    a: 'It is the palpable surface landmark at C4–C5, and the cricothyroid membrane lies just below it.',
  },
  lar_cri: {
    q: 'Why is cricoid pressure used during rapid-sequence intubation?',
    a: 'It compresses the esophagus against the vertebral column to reduce the risk of aspiration.',
  },
  lar_epi: {
    q: 'What radiographic sign suggests acute epiglottitis?',
    a: 'A lateral neck radiograph may show a swollen epiglottis, the thumb sign.',
  },
  lar_ari: {
    q: 'Why does recurrent laryngeal nerve palsy leave the vocal fold fixed?',
    a: 'The nerve supplies all the intrinsic muscles that move the arytenoid except the cricothyroid.',
  },
  lar_cor: {
    q: 'Why are the corniculate cartilages useful at laryngoscopy?',
    a: 'They mark the posterior end of the aryepiglottic folds and the top of the arytenoids.',
  },
  lar_mth: {
    q: 'What happens if the internal laryngeal nerve is divided?',
    a: 'Sensation above the vocal folds is lost, so the laryngeal protective reflex is impaired and aspiration risk rises.',
  },
  lar_mct: {
    q: 'Why is cricothyrotomy avoided in small children?',
    a: 'The cricothyroid membrane is narrow and the subglottic airway is small, so needle access or tracheotomy is preferred.',
  },
  lar_vl: {
    q: 'What determines vocal pitch?',
    a: 'Pitch depends on the length, tension and vibrating mass of the vocal ligaments and the folds that cover them.',
  },
  lar_he: {
    q: 'Why is the vallecula used to guide laryngoscopy?',
    a: 'Its floor is the hyoepiglottic ligament; pressure there lifts the epiglottis and exposes the glottis.',
  },
  lar_te: {
    q: 'What is the pre-epiglottic space?',
    a: 'The fat-filled space between the epiglottis and the thyrohyoid membrane, bounded below by the thyroepiglottic ligament.',
  },
  lar_ct: {
    q: 'Why does thyroidectomy threaten the cricothyroid?',
    a: 'The external branch of the superior laryngeal nerve runs close to the superior thyroid vessels and can be injured during ligation.',
  },
  lar_pca: {
    q: 'Why does unilateral recurrent laryngeal nerve palsy cause hoarseness rather than stridor?',
    a: 'One abductor still opens the glottis enough for breathing, but the two folds no longer meet evenly for phonation.',
  },
  lar_lca: {
    q: 'What happens to the fold after recurrent laryngeal nerve injury?',
    a: 'It loses abduction and adduction and usually settles in a paramedian position, causing hoarseness and a weak cough.',
  },
  lar_arit: {
    q: 'Why is posterior glottic closure important?',
    a: 'It completes glottic closure during phonation and coughing, preventing air escape and helping clear secretions.',
  },
  lar_ta: {
    q: 'How does thyroarytenoid action differ from cricothyroid action?',
    a: 'Cricothyroid tenses and lengthens the folds to raise pitch; thyroarytenoid shortens and relaxes them to lower it.',
  },
  lar_voc: {
    q: 'What is presbyphonia?',
    a: 'Age-related vocal fold atrophy, including vocalis thinning, that produces a weak, breathy and higher-pitched voice.',
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
  "lar_hio": "U-shaped bone at C3 above the shield cartilage, slung by muscles",
  "lar_tir": "Largest cartilage, whose two plates meet in front at the midline",
  "lar_cri": "The only complete ring, narrow in front and tall behind",
  "lar_epi": "Leaf-shaped flap behind the tongue root that folds over the inlet",
  "lar_ari": "Paired pyramids on the cricoid lamina that move the vocal folds",
  "lar_cor": "Small horn-like nodules perched on the arytenoid apices inside the fold",
  "lar_mth": "Sheet between the U-shaped neck bone above and the shield cartilage below",
  "lar_mct": "Midline band between the shield cartilage and the signet-ring cartilage, the site of emergency airway access",
  "lar_vl": "Free upper edges of the elastic cone inside the vibrating folds",
  "lar_he": "Ties the front of the leaf-shaped flap to the U-shaped neck bone",
  "lar_te": "Anchors the stalk of the leaf-shaped flap to the shield angle",
  "lar_ct": "Only intrinsic muscle on the outside; tenses the cords",
  "lar_pca": "The only muscle that opens the glottis",
  "lar_lca": "Rotates the paired pyramids inward to close the glottis",
  "lar_arit": "Unpaired band plus crossed fibres bridging the two pyramids at the back",
  "lar_ta": "Runs beside the vocal fold and shortens it, lowering pitch",
  "lar_voc": "Deep medial fibres of the thyroarytenoid alongside the fold's edge",
  "ad": "Look for the chamber at the patient's right border, between the great veins entering superiorly and inferiorly.",
  "ae": "Chamber behind the aortic root where four vessels return from the lungs",
  "vd": "Look for the broad anterior chamber deep to the sternum. It leads superiorly toward the pulmonary trunk.",
  "ve": "Look for the pointed inferior tip (apex), on the patient's left. This chamber has the thickest muscle wall.",
  "paredev": "Contractile layer surrounding both pumping chambers, thickest on the left",
  "tri_ant": "Broad flap at the front of the right inlet, beside the outflow tract",
  "tri_post": "Flap at the right inlet nearest the diaphragmatic wall",
  "tri_sep": "Flap at the right inlet tethered to the partition between the pumping chambers",
  "mit_ant": "Flap beside the outlet to the aorta at the left inlet",
  "mit_post": "Short flap on the side of the left inlet farthest from the outlet to the aorta",
  "pulm_ant_d": "Pocket on the front right of the outlet to the lungs",
  "pulm_ant_e": "Pocket on the front left of the outlet to the lungs",
  "pulm_post": "Pocket at the back of the outlet to the lungs, nearest the base of the aorta",
  "ao_ant": "Pocket at the left pump outlet on the side nearest the right auricle, below an arterial opening",
  "ao_post_e": "Pocket at the left pump outlet beside the left auricle, below an arterial opening",
  "ao_post_d": "Pocket at the left pump outlet beside the wall between the filling chambers, with no arterial opening above it",
  "pap_vd_ant": "Projection on the front wall of the right pump at the end of the moderator band",
  "pap_vd_post": "Projection from the diaphragmatic wall of the right pump that anchors cords to the inlet",
  "pap_vd_sep": "Small projection by the partition inside the right pump, below the outlet",
  "pap_ve_al": "Projection from the front and outer wall of the left pump that anchors cords to both inlet flaps",
  "acd": "Leaves the aortic root between the pulmonary trunk and right auricle and curves around the right heart border",
  "tce": "Short vessel between the pulmonary trunk and left auricle before the fork",
  "dae": "Runs beside the great cardiac vein down the front of the heart to the apex",
  "diag": "Spreads obliquely from the groove on the front of the heart across the left pump",
  "vent_ant_d_dae": "Leaves the vessel in the front midline groove and crosses onto the right pump",
  "cone_e": "Small vessel curving below the pulmonary valve onto the funnel-shaped outlet",
  "sept_da": "Small vessels diving deep from the groove on the front of the heart",
  "sept_dp": "Small vessels diving deep from the groove on the underside of the heart",
  "cx": "Turns beneath the left auricle and curves around the left edge of the heart",
  "marg_d": "Runs toward the apex along the lower edge of the right pump",
  "vent_ant_acd": "Leaves the groove under the right auricle and spreads across the front of the right pump",
  "dp": "Runs from the crux toward the apex beside the middle cardiac vein on the underside",
  "vent_post_acd": "Find it crossing the inferior (diaphragmatic) surface toward the posterior aspect of the left ventricle.",
  "seio": "Wide channel between the left filling and pumping chambers that opens by the IVC",
  "vcmagna": "Ascends from the apex in the front groove, then turns under the left auricle",
  "vcmedia": "Ascends beside the artery in the groove on the underside toward the right filling chamber",
  "vcparva": "Follows the lower right edge of the heart and turns into the groove below the right auricle",
  "vpve": "Ascends from the underside of the left pump, left of the middle cardiac vein",
  "aoasc": "Rises from the left pump behind the pulmonary trunk, before the arch",
  "arco": "The large curved vessel superior to the heart, over the left main bronchus.",
  "aodesc": "Runs down beside the spine on the left, behind the heart",
  "tbc": "Rightmost outlet of the arch. Forks toward the neck and arm",
  "ccd": "Find it ascending toward the right neck from the first arch branch.",
  "cce": "Find it ascending toward the left neck directly from the middle arch branch.",
  "scd": "Find it coursing laterally toward the right arm from the first arch branch.",
  "sce": "Find it coursing laterally toward the left arm from the last arch branch.",
  "vcs": "Find it entering the right atrium from superiorly, on the patient’s right.",
  "vci": "Find it entering the right atrium from inferior to the heart.",
  "vbcd": "Short vertical vein superior to the right atrium, joining its counterpart to form the superior vena cava.",
  "vbce": "Long vein crossing anterior to the arch branches from left to right.",
  "azigo": "Ascends beside the right vertebrae, then arches over the lung root",
  "hemiazigo": "Ascends next to lower vertebral bodies on the left, then crosses behind the aorta",
  "tp": "Find it leaving the right ventricle anteriorly and splitting inferior to the aortic arch.",
  "apd": "Runs behind the ascending aorta and SVC toward the right lung root",
  "ape": "Passes below the aortic arch and over the airway to the left lung",
  "lobsupd": "Rises toward the right apex from the vessel in front of the main airway",
  "vpsd": "Enters the back of the left atrium on the right, above the other opening",
  "vpid": "Enters the back of the left atrium from the base of the right lung",
  "vpse": "Enters the back of the left atrium on the left, above the other opening",
  "vpie": "Enters the back of the left atrium from the base of the left lung",
  "esofago": "Muscular tube behind the left atrium, from pharynx to stomach",
  "timo_d": "Find it anterior to the great vessels, on the patient’s right and posterior to the sternum.",
  "timo_e": "Find it anterior to the great vessels, on the patient’s left and posterior to the sternum.",
  "traqueia": "The central ringed airway superior to the bifurcation into the two main bronchi.",
  "bpd": "Look for the shorter, steeper branch from the airway bifurcation toward the right lung.",
  "bpe": "Longer and more horizontal, inferior to the aortic arch.",
  "sd_apical": "Right lung: toward the thoracic inlet above the first rib",
  "sd_post": "Right lung: against the back of the rib cage, above the oblique fissure",
  "sd_ant": "Right lung: against the front of the rib cage above the horizontal fissure",
  "sd_lat": "Right lung: between the two fissures on the rib-facing side of the wedge",
  "sd_med": "Right lung: between the two fissures on the heart-facing side of the wedge",
  "sd_sup": "Right lung: behind the hilum, just below the oblique fissure",
  "sd_bmed": "Right lung: at the base beside the mediastinum and diaphragm",
  "sd_bant": "Right lung: at the foot of the oblique fissure against the front of the diaphragm",
  "sd_blat": "Right lung: against the outer ribs just above the diaphragm",
  "sd_bpost": "Right lung: beside the spine over the back of the diaphragm",
  "se_apical": "Left lung: toward the thoracic inlet above the first rib",
  "se_post": "Left lung: against the back of the rib cage, above the oblique fissure",
  "se_ant": "Left lung: against the front of the rib cage",
  "se_lsup": "Left lung: tongue-shaped projection just below the notch by the heart",
  "se_linf": "Left lung: tip of the tongue-shaped projection beside the heart",
  "se_sup": "Left lung: behind the hilum, just below the oblique fissure",
  "se_bmed": "Left lung: at the base beside the mediastinum and diaphragm",
  "se_bant": "Left lung: behind the tongue-shaped projection across the oblique fissure",
  "se_blat": "Left lung: against the outer ribs just above the diaphragm",
  "se_bpost": "Left lung: beside the spine over the back of the diaphragm",
  "diafragma": "Look for the dome-shaped muscle at the floor of the thorax, below the heart and lungs.",
  "eso_art": "Small vessel to the food passage behind the heart from the large artery beside the spine",
  "azigo_acs": "Left paravertebral vessel descending above the crossing from the lower ribs",
  "ita_d": "A vertical vessel behind the right costal cartilages, just lateral to the sternal edge.",
  "ita_e": "A vertical vessel behind the left costal cartilages, just lateral to the sternal edge.",
  "itv_d": "Draining vessel behind the right costal cartilages beside the vertical artery",
  "itv_e": "Draining vessel behind the left costal cartilages beside the vertical artery",
  "pica_d1": "Small vessel deep to rib 1 on the right, close to the spine",
  "pica_e1": "Small vessel deep to rib 1 on the left, close to the spine",
  "pica_d2": "Small vessel deep to rib 2 on the right, close to the spine",
  "pica_e2": "Small vessel deep to rib 2 on the left, close to the spine",
  "pica_sup_d": "Short vessel running down from the neck toward the top two rib spaces on the right",
  "pica_sup_e": "Short vessel running down from the neck toward the top two rib spaces on the left",
  "icv_ant_d": "Thin draining channels crossing rib spaces near the right edge of the breastbone",
  "icv_ant_e": "Thin draining channels crossing rib spaces near the left edge of the breastbone",
  "phren_inf_a_d": "Vessel spreading over the underside of the right diaphragm behind the IVC",
  "phren_inf_a_e": "Vessel spreading over the underside of the left diaphragm beside the esophagus",
  "phren_inf_v": "Draining channels beneath the diaphragm beside its paired arteries",
  "phren_sup_v": "Draining channels above the diaphragm beside the descending aorta",
  "manubrio": "Broad plate between the clavicles, above the ridge at the second rib pair",
  "esterno": "Flat plate between the broad upper piece and the small tip in front of the heart",
  "xifoide": "The small tip at the lower end of the breastbone.",
  "claviculas": "The two S-shaped bones at the top of the chest, from breastbone to shoulder.",
  "cart_costais": "Flexible bars between the rib ends and the breastbone",
  "costela_1": "The short, broad rib at the very top of the rib cage.",
  "costela_2": "The rib whose cartilage marks the angle of the breastbone.",
  "costela_4": "Rib at nipple level, above the safe triangle for chest drains",
  "costela_5": "The rib at the level of the heart’s apex.",
  "costelas_rest": "Curved struts wrapping around the sides and back of the chest",
  "vertebras_toracicas": "Twelve stacked units behind the chest, with facets for the ribs",
  "blob_sup_d": "Side branch of the short right airway. Runs above the artery toward the apex",
  "bint_d": "Short right airway between the takeoff toward the apex and the fork below",
  "blob_med_d": "Forward airway from the right-sided stem to the wedge between the two fissures",
  "blob_inf_d": "Airway that continues back toward the right diaphragm after the forward branch",
  "blob_sup_e": "Airway under the left arterial arch. Forks toward the apex and the tongue-shaped projection",
  "blob_inf_e": "Airway that continues behind the left hilar fork toward the diaphragm",
  "lobo_sup_d": "Above the horizontal fissure on the side with two fissures. Reaches the first rib",
  "lobo_med_d": "Wedge between the two fissures beside the right heart border",
  "lobo_inf_d": "Behind the oblique fissure on the side with two fissures. Rests on the diaphragm",
  "lobo_sup_e": "In front of the single oblique fissure, with a tongue-shaped tip beside the heart",
  "lobo_inf_e": "Behind the single oblique fissure, resting on the diaphragm behind the heart",
  "a_sd_apical": "Leaves a trunk by the right airway and climbs toward the first rib",
  "a_sd_post": "Reaches the back of the right apex, often from the vessel in the oblique fissure",
  "a_sd_ant": "Runs forward from the first arterial trunk toward the right ribs above the horizontal fissure",
  "lobmedd": "Vessel that leaves the right oblique fissure toward the wedge by the heart",
  "a_sd_lat": "Outer vessel to the wedge between the fissures, toward the ribs",
  "a_sd_med": "Inner vessel to the wedge between the fissures, toward the right heart border",
  "lobinfd": "Continues from the right oblique fissure beside the airway toward the diaphragm",
  "a_sd_sup": "Leaves the back of the vessel in the right oblique fissure, level with the branch to the wedge",
  "a_sd_basal": "Arterial fan beyond the backward branch, spreading over the right diaphragm",
  "a_se_apical": "Climbs toward the left first rib beside the airway under the aortic arch",
  "a_se_post": "Runs toward the ribs behind the left apex, above the oblique fissure",
  "a_se_ant": "Runs toward the ribs in front of the left hilum, above the cardiac notch",
  "a_se_lsup": "Vessel to the tongue-shaped projection just below the cardiac notch",
  "a_se_linf": "Vessel to the tip of the tongue-shaped projection beside the heart",
  "a_se_sup": "Backward branch from the left oblique fissure toward the area behind the hilum",
  "a_se_basal": "Arterial fan beyond the backward branch, spreading over the left diaphragm",
  "v_sd_apical": "Find it descending from the right apex along the medial edge of the upper lobe toward the superior pulmonary vein.",
  "v_sd_post": "Find the large vein coming forward from the back of the right upper lobe to the superior pulmonary vein.",
  "v_sd_ant": "Find it running from the front of the right upper lobe to the superior pulmonary vein.",
  "v_sd_lat": "Drains the rib-facing side of the right wedge between the fissures",
  "v_sd_med": "Drains the heart-facing side of the right wedge between the fissures",
  "v_sd_sup": "Returns blood from behind the right hilum to the top of the outlet from the base",
  "v_sd_bsup": "Higher draining channel from the right dome of the diaphragm to the shared outlet below the hilum",
  "v_sd_binf": "Lowest draining channel at the right base beside the back of the diaphragm",
  "v_se_apicpost": "Find it descending from the left apex to the top of the superior pulmonary vein.",
  "v_se_ant": "Find it running from the front of the left upper lobe to the superior pulmonary vein.",
  "v_se_ling": "Collects blood from the tongue-shaped projection below the cardiac notch",
  "v_se_sup": "Returns blood from behind the left hilum to the top of the outlet from the base",
  "v_se_bsup": "Higher draining channel from the left dome of the diaphragm to the shared outlet below the hilum",
  "v_se_binf": "Lowest draining channel at the left base beside the back of the diaphragm",
  "pap_ve_pm": "Projection from the underside of the left pump close to the partition, with cords to both inlet flaps",
  "vsc_d": "Crosses the right first rib in front of the artery and anterior scalene",
  "vsc_e": "Crosses the left first rib in front of the artery and anterior scalene",
  "ttc_d": "Short vessel rising medial to the right anterior scalene toward the neck and shoulder",
  "ttc_e": "Short vessel rising medial to the left anterior scalene toward the neck and shoulder",
  "tcc_d": "Passes back over the right pleural dome toward the top two rib spaces",
  "tcc_e": "Passes back over the left pleural dome toward the top two rib spaces",
  "pica_rest_d": "Repeated branches from the back of the descending aorta running under the right ribs",
  "pica_rest_e": "Repeated branches from the back of the descending aorta running under the left ribs",
  "mfa_d": "Find it running down and laterally along the right costal margin from the end of the internal thoracic artery.",
  "mfa_e": "Find it running down and laterally along the left costal margin from the end of the internal thoracic artery.",
  "aes_d": "Find it continuing straight down from the right internal thoracic artery below the costal margin.",
  "aes_e": "Find it continuing straight down from the left internal thoracic artery below the costal margin.",
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
    "subtle": false,
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
  "lar_hio": "The U-shaped bone at the top of the airway, at C3",
  "lar_tir": "The largest cartilage, two plates joined in front at C4–C5",
  "lar_cri": "The only complete cartilage ring, at C6 below the large shield",
  "lar_epi": "Leaf-shaped flap behind the root of the tongue",
  "lar_ari": "Paired pyramids sitting on the back of the ring below",
  "lar_cor": "Tiny horns perched on the apices of the paired pyramids",
  "lar_mth": "The sheet hanging the larynx from the U-shaped bone",
  "lar_mct": "Midline band between the large plate and the ring below",
  "lar_vl": "Paired bands running from the back of the large plate to the paired pyramids",
  "lar_he": "Connects the front of the leaf-shaped flap to the U-shaped bone",
  "lar_te": "Holds the flap's stalk inside the angle of the shield cartilage",
  "lar_ct": "The only intrinsic muscle on the outside, front of the larynx",
  "lar_pca": "On the back of the ring, pulling the paired pyramids outward",
  "lar_lca": "On the side of the ring, pulling the muscular process forward",
  "lar_arit": "Fibres bridging the back of the two pyramids",
  "lar_ta": "From inside the large plate back to the paired pyramids, beside the cords",
  "lar_voc": "Fine fibres against the fold's free edge, tuning its tension",
  "ad": "At the patient’s right border, between the veins entering superiorly and inferiorly.",
  "ae": "Chamber behind the aortic root where four vessels return from the lungs",
  "paredev": "The thick muscular wall shared by both lower chambers",
  "vd": "Across the anterior aspect of the heart, inferior to the pulmonary trunk.",
  "ve": "On the patient’s left, extending to the pointed inferior tip.",
  "tri_ant": "Broad flap at the front of the right inlet, beside the outflow tract",
  "tri_post": "Flap at the right inlet nearest the diaphragmatic wall",
  "tri_sep": "Flap at the right inlet tethered to the partition between the pumping chambers",
  "mit_ant": "Flap beside the outlet to the aorta at the left inlet",
  "mit_post": "Short flap on the side of the left inlet farthest from the outlet to the aorta",
  "pulm_ant_d": "Pocket on the front right of the outlet to the lungs",
  "pulm_ant_e": "Pocket on the front left of the outlet to the lungs",
  "pulm_post": "Pocket at the back of the outlet to the lungs, nearest the base of the aorta",
  "ao_ant": "Pocket at the left pump outlet on the side nearest the right auricle, below an arterial opening",
  "ao_post_e": "Pocket at the left pump outlet beside the left auricle, below an arterial opening",
  "ao_post_d": "Pocket at the left pump outlet beside the wall between the filling chambers, with no arterial opening above it",
  "pap_vd_ant": "Projection on the front wall of the right pump at the end of the moderator band",
  "pap_vd_post": "Projection from the diaphragmatic wall of the right pump that anchors cords to the inlet",
  "pap_vd_sep": "Small projection by the partition inside the right pump, below the outlet",
  "pap_ve_al": "Projection from the front and outer wall of the left pump that anchors cords to both inlet flaps",
  "acd": "Leaves the aortic root between the pulmonary trunk and right auricle and curves around the right heart border",
  "tce": "Short vessel between the pulmonary trunk and left auricle before the fork",
  "dae": "Runs beside the great cardiac vein down the front of the heart to the apex",
  "diag": "Spreads obliquely from the groove on the front of the heart across the left pump",
  "vent_ant_d_dae": "Leaves the vessel in the front midline groove and crosses onto the right pump",
  "cone_e": "Small vessel curving below the pulmonary valve onto the funnel-shaped outlet",
  "sept_da": "Small vessels diving deep from the groove on the front of the heart",
  "sept_dp": "Small vessels diving deep from the groove on the underside of the heart",
  "cx": "Turns beneath the left auricle and curves around the left edge of the heart",
  "marg_d": "Runs toward the apex along the lower edge of the right pump",
  "vent_ant_acd": "Leaves the groove under the right auricle and spreads across the front of the right pump",
  "dp": "Runs from the crux toward the apex beside the middle cardiac vein on the underside",
  "vent_post_acd": "Crossing the inferior (diaphragmatic) surface toward the posterior aspect of the left ventricle.",
  "seio": "Wide channel between the left filling and pumping chambers that opens by the IVC",
  "vcmagna": "Ascends from the apex in the front groove, then turns under the left auricle",
  "vcmedia": "Ascends beside the artery in the groove on the underside toward the right filling chamber",
  "vcparva": "Follows the lower right edge of the heart and turns into the groove below the right auricle",
  "vpve": "Ascends from the underside of the left pump, left of the middle cardiac vein",
  "aoasc": "Rises from the left pump behind the pulmonary trunk, before the arch",
  "arco": "The large curved vessel superior to the heart, over the left main bronchus.",
  "aodesc": "Runs down beside the spine on the left, behind the heart",
  "tbc": "Rightmost outlet of the arch. Forks toward the neck and arm",
  "ccd": "Ascending toward the right neck from the first arch branch.",
  "cce": "Ascending toward the left neck directly from the middle arch branch.",
  "scd": "Coursing laterally toward the right arm from the first arch branch.",
  "sce": "Coursing laterally toward the left arm from the last arch branch.",
  "vcs": "Entering the right atrium from superiorly, on the patient’s right.",
  "vci": "Entering the right atrium from inferior to the heart.",
  "vbcd": "Short vertical vein superior to the right atrium, joining its counterpart to form the superior vena cava.",
  "vbce": "Long vein crossing anterior to the arch branches from left to right.",
  "azigo": "Right-sided channel that hooks over the lung root into the superior vena cava",
  "hemiazigo": "Ascends next to lower vertebral bodies on the left, then crosses behind the aorta",
  "tp": "Leaving the right ventricle anteriorly and splitting inferior to the aortic arch.",
  "apd": "Runs behind the ascending aorta and SVC toward the right lung root",
  "ape": "Passes below the aortic arch and over the airway to the left lung",
  "lobsupd": "Rises toward the right apex from the vessel in front of the main airway",
  "vpsd": "Enters the back of the left atrium on the right, above the other opening",
  "vpid": "Enters the back of the left atrium from the base of the right lung",
  "vpse": "Enters the back of the left atrium on the left, above the other opening",
  "vpie": "Enters the back of the left atrium from the base of the left lung",
  "esofago": "Tube behind the left atrium, passing through the diaphragm at T10",
  "timo_d": "Anterior to the great vessels, on the patient’s right and posterior to the sternum.",
  "timo_e": "Anterior to the great vessels, on the patient’s left and posterior to the sternum.",
  "traqueia": "The central ringed airway superior to the bifurcation into the two main bronchi.",
  "bpd": "From the airway bifurcation toward the right lung: the shorter, steeper branch.",
  "bpe": "Longer and more horizontal, inferior to the aortic arch",
  "sd_apical": "Right lung: toward the thoracic inlet above the first rib",
  "sd_post": "Right lung: against the back of the rib cage, above the oblique fissure",
  "sd_ant": "Right lung: against the front of the rib cage above the horizontal fissure",
  "sd_lat": "Right lung: between the two fissures on the rib-facing side of the wedge",
  "sd_med": "Right lung: between the two fissures on the heart-facing side of the wedge",
  "sd_sup": "Right lung: behind the hilum, just below the oblique fissure",
  "sd_bmed": "Right lung: at the base beside the mediastinum and diaphragm",
  "sd_bant": "Right lung: at the foot of the oblique fissure against the front of the diaphragm",
  "sd_blat": "Right lung: against the outer ribs just above the diaphragm",
  "sd_bpost": "Right lung: beside the spine over the back of the diaphragm",
  "se_apical": "Left lung: toward the thoracic inlet above the first rib",
  "se_post": "Left lung: against the back of the rib cage, above the oblique fissure",
  "se_ant": "Left lung: against the front of the rib cage",
  "se_lsup": "Left lung: tongue-shaped projection just below the notch by the heart",
  "se_linf": "Left lung: tip of the tongue-shaped projection beside the heart",
  "se_sup": "Left lung: behind the hilum, just below the oblique fissure",
  "se_bmed": "Left lung: at the base beside the mediastinum and diaphragm",
  "se_bant": "Left lung: behind the tongue-shaped projection across the oblique fissure",
  "se_blat": "Left lung: against the outer ribs just above the diaphragm",
  "se_bpost": "Left lung: beside the spine over the back of the diaphragm",
  "diafragma": "The dome-shaped muscle at the floor of the thorax.",
  "eso_art": "Small vessel to the food passage behind the heart from the large artery beside the spine",
  "azigo_acs": "Left paravertebral vessel descending above the crossing from the lower ribs",
  "ita_d": "Vertical artery behind the right costal cartilages, lateral to the sternal edge.",
  "ita_e": "Vertical artery behind the left costal cartilages, lateral to the sternal edge.",
  "itv_d": "Draining vessel behind the right costal cartilages beside the vertical artery",
  "itv_e": "Draining vessel behind the left costal cartilages beside the vertical artery",
  "pica_d1": "Small vessel deep to rib 1 on the right, close to the spine",
  "pica_e1": "Small vessel deep to rib 1 on the left, close to the spine",
  "pica_d2": "Small vessel deep to rib 2 on the right, close to the spine",
  "pica_e2": "Small vessel deep to rib 2 on the left, close to the spine",
  "pica_sup_d": "Short vessel running down from the neck toward the top two rib spaces on the right",
  "pica_sup_e": "Short vessel running down from the neck toward the top two rib spaces on the left",
  "icv_ant_d": "Thin draining channels crossing rib spaces near the right edge of the breastbone",
  "icv_ant_e": "Thin draining channels crossing rib spaces near the left edge of the breastbone",
  "phren_inf_a_d": "Vessel spreading over the underside of the right diaphragm behind the IVC",
  "phren_inf_a_e": "Vessel spreading over the underside of the left diaphragm beside the esophagus",
  "phren_inf_v": "Draining channels beneath the diaphragm beside its paired arteries",
  "phren_sup_v": "Draining channels above the diaphragm beside the descending aorta",
  "manubrio": "Broad plate between the clavicles, above the ridge at the second rib pair",
  "esterno": "Flat plate between the broad upper piece and the small tip in front of the heart",
  "xifoide": "Small cartilaginous tip at the lower end of the breastbone",
  "claviculas": "Paired S-shaped bones from breastbone to shoulder tip",
  "cart_costais": "Flexible bars between the rib ends and the breastbone",
  "costela_1": "Shortest, broadest rib, curving sharply at the thoracic inlet",
  "costela_2": "Rib whose cartilage marks the sternal angle at T4–T5",
  "costela_4": "Mid-chest rib at nipple level, over the cardiac silhouette",
  "costela_5": "Rib at the level of the cardiac apex.",
  "costelas_rest": "Curved struts wrapping around the sides and back of the chest",
  "vertebras_toracicas": "Twelve stacked units behind the chest, with facets for the ribs",
  "blob_sup_d": "Side branch of the short right airway. Runs above the artery toward the apex",
  "bint_d": "Short right airway between the takeoff toward the apex and the fork below",
  "blob_med_d": "Forward airway from the right-sided stem to the wedge between the two fissures",
  "blob_inf_d": "Airway that continues back toward the right diaphragm after the forward branch",
  "blob_sup_e": "Airway under the left arterial arch. Forks toward the apex and the tongue-shaped projection",
  "blob_inf_e": "Airway that continues behind the left hilar fork toward the diaphragm",
  "lobo_sup_d": "Above the horizontal fissure on the side with two fissures. Reaches the first rib",
  "lobo_med_d": "Wedge between the two fissures beside the right heart border",
  "lobo_inf_d": "Behind the oblique fissure on the side with two fissures. Rests on the diaphragm",
  "lobo_sup_e": "In front of the single oblique fissure, with a tongue-shaped tip beside the heart",
  "lobo_inf_e": "Behind the single oblique fissure, resting on the diaphragm behind the heart",
  "a_sd_apical": "Leaves a trunk by the right airway and climbs toward the first rib",
  "a_sd_post": "Reaches the back of the right apex, often from the vessel in the oblique fissure",
  "a_sd_ant": "Runs forward from the first arterial trunk toward the right ribs above the horizontal fissure",
  "lobmedd": "Vessel that leaves the right oblique fissure toward the wedge by the heart",
  "a_sd_lat": "Outer vessel to the wedge between the fissures, toward the ribs",
  "a_sd_med": "Inner vessel to the wedge between the fissures, toward the right heart border",
  "lobinfd": "Continues from the right oblique fissure beside the airway toward the diaphragm",
  "a_sd_sup": "Leaves the back of the vessel in the right oblique fissure, level with the branch to the wedge",
  "a_sd_basal": "Arterial fan beyond the backward branch, spreading over the right diaphragm",
  "a_se_apical": "Climbs toward the left first rib beside the airway under the aortic arch",
  "a_se_post": "Runs toward the ribs behind the left apex, above the oblique fissure",
  "a_se_ant": "Runs toward the ribs in front of the left hilum, above the cardiac notch",
  "a_se_lsup": "Vessel to the tongue-shaped projection just below the cardiac notch",
  "a_se_linf": "Vessel to the tip of the tongue-shaped projection beside the heart",
  "a_se_sup": "Backward branch from the left oblique fissure toward the area behind the hilum",
  "a_se_basal": "Arterial fan beyond the backward branch, spreading over the left diaphragm",
  "v_sd_apical": "Descends from the right apex toward the upper right pulmonary vein.",
  "v_sd_post": "Large vein coming forward from the back of the right upper lobe.",
  "v_sd_ant": "Drains the front of the right upper lobe toward the upper hilum.",
  "v_sd_lat": "Drains the rib-facing side of the right wedge between the fissures",
  "v_sd_med": "Drains the heart-facing side of the right wedge between the fissures",
  "v_sd_sup": "Returns blood from behind the right hilum to the top of the outlet from the base",
  "v_sd_bsup": "Higher draining channel from the right dome of the diaphragm to the shared outlet below the hilum",
  "v_sd_binf": "Lowest draining channel at the right base beside the back of the diaphragm",
  "v_se_apicpost": "Drains the top and back of the left upper lobe.",
  "v_se_ant": "Drains the front of the left upper lobe.",
  "v_se_ling": "Collects blood from the tongue-shaped projection below the cardiac notch",
  "v_se_sup": "Returns blood from behind the left hilum to the top of the outlet from the base",
  "v_se_bsup": "Higher draining channel from the left dome of the diaphragm to the shared outlet below the hilum",
  "v_se_binf": "Lowest draining channel at the left base beside the back of the diaphragm",
  "pap_ve_pm": "Projection from the underside of the left pump close to the partition, with cords to both inlet flaps",
  "vsc_d": "Crosses the right first rib in front of the artery and anterior scalene",
  "vsc_e": "Crosses the left first rib in front of the artery and anterior scalene",
  "ttc_d": "Short vessel rising medial to the right anterior scalene toward the neck and shoulder",
  "ttc_e": "Short vessel rising medial to the left anterior scalene toward the neck and shoulder",
  "tcc_d": "Passes back over the right pleural dome toward the top two rib spaces",
  "tcc_e": "Passes back over the left pleural dome toward the top two rib spaces",
  "pica_rest_d": "Repeated branches from the back of the descending aorta running under the right ribs",
  "pica_rest_e": "Repeated branches from the back of the descending aorta running under the left ribs",
  "mfa_d": "Lateral terminal branch of the right internal thoracic artery along the costal margin.",
  "mfa_e": "Lateral terminal branch of the left internal thoracic artery along the costal margin.",
  "aes_d": "Medial terminal branch of the right internal thoracic artery, heading into the abdominal wall.",
  "aes_e": "Medial terminal branch of the left internal thoracic artery, heading into the abdominal wall.",
};

// ── Rich lesson content (lessons v2) ───────────────────────────────────────
// LESSON_DETAIL: per-structure teaching text (30–70 words, name in bold).
// LEVEL_OVERVIEW / LEVEL_CONTRAST / LEVEL_CHECK: per-level lesson phases.
export const LESSON_DETAIL = {
  // Larynx
  lar_hio: {
    text: "**Hyoid bone** is the U-shaped, mobile bone at C3, between the tongue and the larynx. Its body, greater horns and lesser horns give attachment to suprahyoid and infrahyoid muscles and to the thyrohyoid membrane. It has no direct bony articulation and rises with the larynx during swallowing. Exam point: it is the only bone of the laryngeal skeleton, and its greater horn is palpable deep to the sternocleidomastoid.",
  },
  lar_tir: {
    text: "**Thyroid cartilage** is the largest laryngeal cartilage, at C4–C5. Its two laminae fuse anteriorly at the laryngeal prominence, larger in men, and diverge behind to leave the inlet open. The superior thyroid notch, oblique line and superior and inferior horns are exam landmarks. Its inferior horns form the cricothyroid joints, letting the cartilage tilt and tense the folds. A fracture may compromise the airway.",
  },
  lar_cri: {
    text: "**Cricoid cartilage** is the only complete cartilaginous ring of the airway, shaped like a signet ring: a narrow arch in front and a tall lamina behind. It sits at C6, where the trachea and esophagus begin. Its lamina carries the arytenoids at the cricoarytenoid joints, and its sides articulate with the thyroid inferior horns. The cricothyroid ligament closes the gap in front. Exam point: cricoid pressure compresses the esophagus.",
  },
  lar_epi: {
    text: "**Epiglottis** is a leaf-shaped elastic cartilage guarding the laryngeal inlet. Its stalk, the petiole, is fixed to the back of the thyroid angle, while its free upper border projects above the hyoid into the pharynx. The hyoepiglottic ligament ties its front to the hyoid, and the vallecula separates it from the tongue base. It folds backward during swallowing. Clinical: epiglottitis produces a swollen thumb sign on a lateral neck radiograph.",
  },
  lar_ari: {
    text: "**Arytenoid cartilages** are paired pyramids on the upper border of the cricoid lamina. Each base has a forward-pointing vocal process for the vocal ligament and a lateral muscular process for the posterior and lateral cricoarytenoids. They rotate and slide at the cricoarytenoid joints, opening or closing the rima glottidis and adjusting fold tension. Exam point: every intrinsic muscle except the cricothyroid acts on these cartilages.",
  },
  lar_cor: {
    text: "**Corniculate cartilages** are small conical nodules of elastic cartilage perched on the arytenoid apices. They project into the aryepiglottic folds and have no muscle attachments. The cuneiform cartilages lie just in front of them in the same fold. Their main importance is as laryngoscopic landmarks at the back of the laryngeal inlet; enlargement or calcification is occasionally seen but is not clinically significant.",
  },
  lar_mth: {
    text: "**Thyrohyoid membrane** is the fibroelastic sheet between the hyoid and the upper border of the thyroid cartilage. It is thickened in the midline as the median thyrohyoid ligament and at its edges as the lateral thyrohyoid ligaments. The internal branch of the superior laryngeal nerve and the superior laryngeal artery pierce it. It suspends the larynx and lets it rise during swallowing. Clinical: that nerve carries sensation above the vocal folds.",
  },
  lar_mct: {
    text: "**Median cricothyroid ligament** is the thick midline part of the cricothyroid membrane, between the cricoid arch and the lower thyroid border. Laterally it continues as the conus elasticus, whose free upper edge forms the vocal ligament. Only skin, fascia and the strap muscles cover it, and it lies below the vocal folds. Exam point: it is the standard route for emergency cricothyrotomy; the cricoid ring itself is avoided.",
  },
  lar_vl: {
    text: "**Vocal ligaments** are paired bands of dense connective tissue forming the core of the true vocal folds. Each runs from the vocal process of the arytenoid to the inner angle of the thyroid cartilage. They are the free upper edges of the conus elasticus and are covered by mucosa; the gap between them is the rima glottidis. They vibrate for phonation. Exam point: their tension and length set pitch.",
  },
  lar_he: {
    text: "**Hyoepiglottic ligament** is a short elastic band between the anterior surface of the epiglottis and the body of the hyoid. It forms the floor of the vallecula, the pocket between the tongue root and the epiglottis. It holds the epiglottis forward and lets its upper part fold back during swallowing. Clinical: the vallecula is where the tip of a laryngoscope blade is placed to expose the glottis.",
  },
  lar_te: {
    text: "**Thyroepiglottic ligament** attaches the stalk of the epiglottis to the inner surface of the thyroid angle, just above the vocal ligaments. It fixes the lower end of the epiglottis while the free upper part tips backward over the laryngeal inlet during swallowing. It is continuous with the quadrangular membrane. Exam point: it marks the lower limit of the epiglottis and helps define the pre-epiglottic space.",
  },
  lar_ct: {
    text: "**Cricothyroid** is the only intrinsic laryngeal muscle on the external surface and the main tensor of the vocal folds. It arises from the cricoid arch and inserts on the thyroid lamina and inferior horn; its straight and oblique parts tilt the thyroid forward. This lengthens and tightens the vocal ligaments, raising pitch. It is supplied by the external branch of the superior laryngeal nerve. Clinical: thyroidectomy injury causes a weak, monotone voice.",
  },
  lar_pca: {
    text: "**Posterior cricoarytenoid** is the only abductor of the vocal folds. It arises from the posterior surface of the cricoid lamina and inserts on the arytenoid muscular process. Contraction rotates the arytenoid outward, opening the rima glottidis for breathing. It is supplied by the recurrent laryngeal nerve. Exam point: bilateral recurrent nerve palsy removes both abductors, leaving the folds near the midline and causing stridor.",
  },
  lar_lca: {
    text: "**Lateral cricoarytenoid** lies inside the thyroid lamina, running from the upper lateral cricoid arch to the arytenoid muscular process. Its contraction rotates the arytenoid inward and closes the intermembranous part of the glottis. It is supplied by the recurrent laryngeal nerve and opposes the posterior cricoarytenoid. Clinical: after recurrent nerve injury, unopposed cricothyroid action and fibrosis can hold the fold in a paramedian position.",
  },
  lar_arit: {
    text: "**Interarytenoid muscles** are the transverse and oblique arytenoids. The unpaired transverse band spans the posterior surfaces of the two arytenoids and adducts them, closing the intercartilaginous glottis. The crossed oblique fibres run from one muscular process to the opposite apex and continue into the aryepiglottic fold, narrowing the laryngeal inlet. Both are supplied by the recurrent laryngeal nerve and complete glottic closure during phonation and coughing.",
  },
  lar_ta: {
    text: "**Thyroarytenoid** lies beside each vocal fold. It arises from the inner surface of the thyroid angle and inserts on the anterolateral arytenoid, lateral to the vocal ligament. Its contraction pulls the arytenoid forward, shortening and relaxing the fold and lowering pitch, and it also helps adduct the fold. Its deep medial part is the vocalis. It is supplied by the recurrent laryngeal nerve. Clinical: it is the muscle injected in spasmodic dysphonia.",
  },
  lar_voc: {
    text: "**Vocalis** is the deep medial part of the thyroarytenoid, lying immediately lateral to the vocal ligament. Its fibres run from the thyroid angle to the vocal process and can tense or relax different parts of the fold, fine-tuning pitch and voice quality. It is supplied by the recurrent laryngeal nerve. Clinical: age-related vocalis atrophy contributes to presbyphonia, and vocalis strain is common in voice abuse.",
  },

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
    text: "**Anterior right ventricular papillary muscle** projects from the anterior RV wall where the moderator band ends. The band carries the right bundle branch. Chordae from the muscle help stabilize the adjacent tricuspid leaflets during systole.",
  },
  pap_vd_post: {
    text: "**Right ventricular posterior papillary muscle** arises from the inferior wall of the right ventricle, sometimes as several bellies. Its chordae attach to the posterior and septal tricuspid leaflets, and it prevents leaflet prolapse during systole. On the model, look along the inferior wall inside the right ventricle, opposite the anterior muscle.",
  },
  pap_vd_sep: {
    text: "**Right ventricular septal papillary muscle** is a small muscle on the interventricular septum inside the right ventricle, near the conus arteriosus. Also called the conal papillary muscle or muscle of Lancisi, its chordae help anchor the anterior and septal tricuspid leaflets. It contracts during systole to keep the valve competent. Find it high on the septum near the pulmonary outflow.",
  },
  pap_ve_al: {
    text: "**Anterolateral papillary muscle** arises from the lateral LV wall and sends chordae to both mitral leaflets. Its dual supply, from LAD diagonals and circumflex obtuse marginals, makes it less vulnerable to ischemia than the posteromedial muscle. It contracts during systole to hold the leaflets together. Exam point: rupture is more often posteromedial, so this muscle may survive an infarct that destroys the other.",
  },

  // Coronary arteries
  acd: {
    text: "**Right coronary artery (RCA)** leaves the right aortic sinus between the pulmonary trunk and right auricle. The small cardiac vein shares its right AV groove. Find conus and atrial branches proximally, then RV and acute marginal branches. At the crux, look for the AV nodal branch and the PDA in right dominance. Posterolateral branches extend onto the inferior LV.",
    clinical: "An inferior infarct usually implicates the RCA in right dominance. Proximal occlusion may also affect the RV or nodal supply: the SA nodal branch comes from the RCA in about 60% of hearts, and the AV nodal branch from the dominant artery, usually the RCA (about 80–90%).",
  },
  tce: {
    text: "**Left main coronary artery** leaves the left aortic sinus. It passes between the pulmonary trunk and left auricle. The LAD turns toward the apex. The circumflex turns left into the AV groove. A ramus intermedius may arise between them.",
    clinical: "A proximal lesion threatens both the LAD and circumflex territories.",
  },
  dae: {
    text: "**Left anterior descending artery (LAD)** leaves the left main and runs to the apex in the anterior interventricular groove with the great cardiac vein. Septal perforators dive into the anterior two-thirds of the septum. Diagonals fan across the anterolateral LV. Small branches cross onto the RV.",
    clinical: "Suspect the LAD in anterior or anteroseptal infarction. Proximal occlusion also threatens the apex.",
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
    text: "**Circumflex artery** leaves the left main and turns under the left auricle into the left AV groove beside the great cardiac vein. Atrial branches feed the left atrium. Obtuse marginals supply the lateral LV. In left dominance, the distal circumflex gives the PDA and posterolateral branches at the back of the heart.",
  },
  marg_d: {
    text: "**Right marginal branch** leaves the right coronary artery at the acute margin of the right ventricle and runs toward the apex along the inferior border. It supplies the lateral and inferior right ventricular wall and anastomoses with branches of the LAD. On the model, follow it along the sharp lower-right edge of the heart.",
  },
  vent_ant_acd: {
    text: "**Anterior ventricular branch of the RCA** is a small right coronary branch that crosses the anterior wall of the right ventricle. It supplies the anterior right ventricular myocardium and anastomoses with right anterior branches of the LAD. On the model, find it leaving the right atrioventricular groove and passing onto the front of the ventricle.",
  },
  dp: {
    text: "**Posterior descending artery (PDA)** runs from the crux toward the apex beside the middle cardiac vein. Its septal perforators supply the posterior third of the septum. In right dominance it comes from the RCA, and in left dominance from the circumflex. Check the posterolateral supply for codominance. Dominance is right in about 70% of hearts, left in about 10% and codominant in about 20%.",
  },
  vent_post_acd: {
    text: "**Posterior ventricular branch of the RCA** leaves the right coronary artery near the crux and crosses the diaphragmatic surface toward the left ventricle. Also called posterolateral branches, they supply the inferior and posterior left ventricular wall in right-dominant hearts. On the model, find the branches running leftward on the underside of the heart.",
  },

  // Cardiac veins
  seio: {
    text: "**Coronary sinus** starts at the junction of the great cardiac vein and oblique vein of the left atrium. Posterior LV veins join along the posterior left AV groove. The middle and small cardiac veins usually enter near its opening into the right atrium, between the IVC opening and tricuspid orifice.",
    clinical: "Its ostium is used for cardiac resynchronization pacing leads.",
  },
  vcmagna: {
    text: "**Great cardiac vein** begins near the apex and ascends in the anterior interventricular sulcus beside the LAD, then turns left in the atrioventricular groove. It receives the left marginal vein and continues as the coronary sinus. It drains the anterior and lateral left ventricle. On the model, follow it alongside the anterior interventricular artery.",
  },
  vcmedia: {
    text: "**Middle cardiac vein**, or posterior interventricular vein, runs in the posterior interventricular sulcus beside the posterior descending artery. It drains the inferior ventricular walls and the posterior part of the septum and empties into the coronary sinus near its termination. On the model, find it on the diaphragmatic surface between the ventricles.",
  },
  vcparva: {
    text: "**Small cardiac vein** follows the RCA in the right AV groove toward the coronary sinus. It may run with the right marginal artery along the acute margin and drains parts of the right atrium and ventricle. Its size and even its presence vary. Exam point: it is the vein that accompanies the right marginal branch, just as the great cardiac vein accompanies the LAD.",
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
    text: "**Hemiazygos vein** ascends on the left side of the lower thoracic vertebrae, draining the lower left posterior intercostal veins. At about T9 it crosses behind the aorta, esophagus and thoracic duct to join the azygos vein. Above it continues as the accessory hemiazygos. Exam point: it is the left-sided channel that crosses the midline, unlike the accessory hemiazygos, which crosses higher.",
  },

  // Pulmonary arteries
  tp: {
    text: "**Pulmonary trunk** leaves the right ventricular conus arteriosus and ascends anterior and to the left of the ascending aorta. It divides into the right and left pulmonary arteries beneath the aortic arch at about T4–T5. It carries deoxygenated blood to the lungs. On the model, follow it from the front of the heart to its bifurcation.",
  },
  apd: {
    text: "**Right pulmonary artery** leaves the pulmonary trunk below the aortic arch and passes behind the ascending aorta and SVC. At the hilum it lies in front of the right main bronchus, below the eparterial upper lobe bronchus, and gives the anterior trunk before entering the oblique fissure. Exam point: the right artery is anterior to the bronchus, while the left artery arches over it.",
  },
  ape: {
    text: "**Left pulmonary artery** passes beneath the aortic arch and above the left main bronchus, so all left lobar bronchi are hyparterial. The ligamentum arteriosum tethers it to the arch near the isthmus. It gives upper lobe branches as it arches, then continues as the interlobar artery behind the fissure. Exam point: the left artery is superior to the bronchus, the right is anterior.",
  },
  lobsupd: {
    text: "**Right upper lobar pulmonary artery** usually gives A1 and A3 through the anterior trunk. Trace A1 with B1 to apical S1 and A3 with B3 toward the chest wall in S3. A2 to posterior S2 often comes separately from the interlobar artery.",
  },

  // Pulmonary veins
  vpsd: {
    text: "**Right superior pulmonary vein** receives V1–V3 from the upper lobe and usually V4–V5 from the middle lobe. It enters the upper part of the posterior left atrial wall, above the inferior vein. At the hilum it lies anterior to the right pulmonary artery and bronchus. Exam point: in an upper lobectomy the middle lobe tributaries must be spared, because they drain into this vein.",
  },
  vpid: {
    text: "**Right inferior pulmonary vein** receives V6 from the superior segment and the common basal vein from S7–S10. It enters the lower part of the posterior left atrial wall, below the superior vein, and is the lowest structure in the right hilum. Exam point: lower lobectomy ligates this vein, while the superior vein drains the upper and middle lobes.",
  },
  vpse: {
    text: "**Left superior pulmonary vein** receives V1+2 and V3 from the upper division and V4–V5 from the lingula. It enters the upper part of the posterior left atrial wall, above the inferior vein, and lies anterior to the left main bronchus at the hilum. Exam point: the lingular tributaries are the lowest of this vein, the counterpart of the right middle lobe veins.",
  },
  vpie: {
    text: "**Left inferior pulmonary vein** receives V6 from behind the hilum and the common basal vein from the lower lobe base. It enters the left atrium below the superior vein, in front of the descending aorta.",
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
    text: "**Trachea** runs about 10–11 cm from the cricoid at C6 to its bifurcation at about T5, lying in front of the esophagus. Its C-shaped cartilage rings are open posteriorly, where the trachealis muscle spans the gap. The carina is a sagittal ridge at the bifurcation. Exam point: the right main bronchus is wider and steeper, so aspirated objects lodge there.",
  },
  bpd: {
    text: "**Right main bronchus** is shorter, wider and steeper than the left. It gives the upper lobar bronchus above the artery, then continues as the bronchus intermedius. That stem splits into middle and lower lobar bronchi.",
    clinical: "Foreign bodies and aspirated vomit favour the right main bronchus.",
  },
  bpe: {
    text: "**Left main bronchus** passes beneath the aortic arch and anterior to the esophagus. The left pulmonary artery lies above it at the hilum. Its upper lobar branch serves the upper division and lingula. Its lower lobar branch serves S6 and the basal segments.",
  },

  // Right lung segments
  sd_apical: {
    text: "**S1** is the apical segment of the right upper lobe, reaching the thoracic inlet above the first rib. It is bounded below by S3 and behind by S2. B1 and A1 run together inside the segment, while intersegmental veins mark its planes. Exam point: S1 and S2 are separate on the right but usually fuse as S1+2 on the left.",
  },
  sd_post: {
    text: "**S2** is the posterior segment of the right upper lobe. It lies above the oblique fissure against the back of the rib cage. B2 and A2 run together inside S2. Intersegmental veins mark its boundaries.",
  },
  sd_ant: {
    text: "**S3** is the anterior segment of the right upper lobe. It lies against the front of the rib cage above the horizontal fissure. B3 and A3 run together inside S3. Intersegmental veins mark its boundaries.",
  },
  sd_lat: {
    text: "**S4** is the lateral segment of the right middle lobe, facing the ribs between the horizontal and oblique fissures. It lies above S5 and is separated from it by an intersegmental vein. B4 and A4 run together inside S4. Exam point: S4 consolidation reaches the chest wall, whereas S5 consolidation hides the right heart border.",
  },
  sd_med: {
    text: "**S5** is the medial segment of the right middle lobe, lying against the right atrial border between the two fissures. It sits below S4, separated by an intersegmental vein. B5 and A5 run together inside S5. Exam point: S5 consolidation erases the right heart border on a frontal radiograph, the silhouette sign.",
  },
  sd_sup: {
    text: "**S6** is the superior segment of the right lower lobe, capping the lobe behind the hilum just below the oblique fissure. It is separated from the basal segments by an intersegmental vein. B6 and A6 run together inside it. Exam point: S6 is dependent when the patient lies supine, a common aspiration site.",
  },
  sd_bmed: {
    text: "**S7** is the medial basal segment of the right lower lobe, lying along the mediastinum beside the right heart border. B7 and A7 run together inside it. It is usually a separate segment on the right but fuses with S8 on the left. Exam point: S7 has its own B7 and A7, while the left usually shares a B7+8 stem.",
  },
  sd_bant: {
    text: "**S8** is the anterior basal segment of the right lower lobe. It lies behind the oblique fissure above the front of the diaphragm. B8 and A8 run together inside S8. Intersegmental veins mark its boundaries.",
  },
  sd_blat: {
    text: "**S9** is the lateral basal segment of the right lower lobe, against the outer ribs above the costophrenic angle. It lies between S8 anteriorly and S10 posteriorly, with intersegmental veins on both planes. B9 and A9 run together inside S9. Exam point: S9 is dependent in lateral decubitus; supine retention favours S10 and S6.",
  },
  sd_bpost: {
    text: "**S10** is the posterior basal segment of the right lower lobe, beside the spine over the diaphragm. It is the most dependent segment when supine and the largest of the basal segments. B10 and A10 run together inside it, with an intersegmental vein separating it from S9. Exam point: S10 is a classic aspiration site when supine.",
  },

  // Left lung segments
  se_apical: {
    text: "**Apical territory (S1)** usually forms part of apicoposterior S1+2 in the left upper lobe. Its tip reaches above the first rib at the thoracic inlet. B1+2 and A1+2 run together inside S1+2. Intersegmental veins mark its boundaries.",
  },
  se_post: {
    text: "**Posterior territory (S2)** usually forms part of apicoposterior S1+2 in the left upper lobe. It lies above the oblique fissure against the back of the rib cage. B1+2 and A1+2 run together inside S1+2. Intersegmental veins mark its boundaries.",
  },
  se_ant: {
    text: "**S3** is the anterior segment of the left upper lobe, lying against the front of the rib cage above the cardiac notch. It is separated from S1+2 above and the lingula below by intersegmental veins. B3 and A3 run together inside S3. Exam point: B3 is a separate branch of the upper division, unlike the fused B1+2.",
  },
  se_lsup: {
    text: "**S4** is the superior lingular segment of the left upper lobe, lying below S3 and above S5 near the cardiac notch. It is separated from S3 by an intersegmental vein. B4 and A4 run together inside S4. Exam point: the lingula mirrors the right middle lobe; S4 faces the ribs while S5 lies against the left heart border.",
  },
  se_linf: {
    text: "**S5** is the inferior lingular segment of the left upper lobe, beside the left heart border. It lies below S4 and is separated from it by an intersegmental vein. B5 and A5 run together inside S5. Exam point: S5 consolidation erases the left heart border; the lingula mirrors the right middle lobe.",
  },
  se_sup: {
    text: "**S6** is the superior segment of the left lower lobe, capping the lobe behind the hilum just below the oblique fissure. It is separated from the basal segments by an intersegmental vein. B6 and A6 run together inside it. Exam point: S6 is dependent when supine, a common site of aspiration and of spread from hilar disease.",
  },
  se_bmed: {
    text: "**Medial basal territory (S7)** usually forms part of anteromedial basal S7+8 in the left lower lobe. It lies along the mediastinum above the diaphragm. B7+8 and A7+8 run together inside S7+8. Intersegmental veins mark its boundaries.",
  },
  se_bant: {
    text: "**Anterior basal territory (S8)** usually forms part of anteromedial basal S7+8 in the left lower lobe. It lies behind the lingula across the oblique fissure. B7+8 and A7+8 run together inside S7+8. Intersegmental veins mark its boundaries.",
  },
  se_blat: {
    text: "**S9** is the lateral basal segment of the left lower lobe, against the outer ribs above the costophrenic angle. It lies between S7+8 anteriorly and S10 posteriorly, with intersegmental veins on both planes. B9 and A9 run together inside S9. Exam point: S9 is dependent in lateral decubitus; supine retention favours S10 and S6.",
  },
  se_bpost: {
    text: "**S10** is the posterior basal segment of the left lower lobe, beside the spine above the back of the diaphragm. It is the most dependent segment when supine and the largest basal segment. B10 and A10 run together inside it, with an intersegmental vein separating it from S9. Exam point: S10 is a classic aspiration site in a supine patient.",
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
    text: "**Second rib** is a typical rib. It articulates with T2, and its costal cartilage meets the sternal angle, where the second intercostal space is a standard auscultation landmark. On the model, find the rib just below the first, at the level of the angle of Louis.",
  },
  costela_4: {
    text: "**Fourth rib** is a mid-thoracic typical rib at nipple level in men. It articulates with T4. Chest drains are usually inserted in the fifth intercostal space in the midaxillary line, just above the sixth rib. It overlies the middle of the cardiac silhouette. On the model, find the rib at the mid-chest, above the apex.",
  },
  costela_5: {
    text: "**Fifth rib** is a typical rib at the level of the cardiac apex. It articulates with T5, and the fifth intercostal space near the midclavicular line overlies the apex beat. On the model, find the rib crossing the lower cardiac border.",
  },
  costelas_rest: {
    text: "**Ribs 3 and 6–12** complete the thoracic cage. Ribs 3–9 are typical, with head, neck, tubercle and angle; ribs 8–10 attach indirectly through costal cartilages, and ribs 11–12 are floating. They protect the lungs, pleura and upper abdominal organs. On the model, find the remaining bars around the sides and back of the chest.",
  },
  vertebras_toracicas: {
    text: "**Thoracic vertebrae** are twelve vertebrae with costal facets that form the posterior thoracic wall. T2–T9 bear demifacets for rib heads; T1 has a full facet for rib 1 plus a demifacet for rib 2, and T10–T12 have single full facets. They contribute to the thoracic kyphosis, and their intervertebral foramina transmit the thoracic spinal nerves. On the model, find the column behind the ribs.",
  },
  // Z-Anatomy additions
  blob_sup_d: {
    text: "**Right upper lobar bronchus** is the only eparterial bronchus, leaving the right main bronchus above the pulmonary artery. B1 climbs to apical S1, B2 runs back to posterior S2 and B3 runs forward to anterior S3. All three serve the right upper lobe. Exam point: because it lies above the artery, it is the landmark that makes the right hilum eparterial.",
  },
  bint_d: {
    text: "**Bronchus intermedius** is the 3 cm stretch of the right bronchial tree between the origin of the upper lobe bronchus and the origin of the middle lobe bronchus. It has no left counterpart. The interlobar pulmonary artery crosses in front of and lateral to it. On the model, follow the right main bronchus down past the upper lobe branch.",
  },
  blob_med_d: {
    text: "**Right middle lobar bronchus** leaves the front of the bronchus intermedius and runs to the wedge between the horizontal and oblique fissures. B4 passes laterally to S4 toward the ribs; B5 passes medially to S5 against the right heart border. It is long, narrow and surrounded by lymph nodes. Exam point: this anatomy explains middle lobe syndrome and the silhouette sign.",
  },
  blob_inf_d: {
    text: "**Right lower lobar bronchus** continues from the bronchus intermedius behind the middle lobe branch. B6 leaves first and runs back to S6 behind the hilum; the basal trunk then gives B7, B8, B9 and B10 to the medial, anterior, lateral and posterior basal segments. Its steep course favours aspiration. Exam point: S6 is dependent when the patient lies supine.",
  },
  blob_sup_e: {
    text: "**Left upper lobar bronchus** leaves the left main bronchus below the arching pulmonary artery, so it is hyparterial. Its upper division gives B1+2 to apicoposterior S1+2 and B3 to anterior S3. Its lingular division gives B4 above B5 to the lingula. Exam point: all left lobar bronchi are hyparterial, but only the right upper lobe bronchus is eparterial.",
  },
  blob_inf_e: {
    text: "**Left lower lobar bronchus** continues behind the left hilar fork toward the diaphragm. B6 turns back first to S6 behind the hilum; the basal trunk then gives B7+8 to the anteromedial basal segment, B9 laterally and B10 posteriorly. Exam point: the fused B7+8 pattern is usual on the left, while B7 and B8 are usually separate on the right.",
  },
  lobo_sup_d: {
    text: "**Right upper lobe** fills the top of the right lung. The horizontal fissure, along the 4th costal cartilage, separates it from the middle lobe; the oblique fissure separates it from the lower lobe behind. It contains the apical, posterior and anterior segments and reaches the root of the neck. On the model, find the cap of the right lung.",
  },
  lobo_med_d: {
    text: "**Right middle lobe** is the smallest lobe, a wedge at the front of the right lung between the horizontal fissure above and the oblique fissure below. Its medial surface lies against the right atrium. It contains the lateral and medial segments and is auscultated anteriorly, between the 4th and 6th ribs. On the model, find it at the front of the right lung.",
  },
  lobo_inf_d: {
    text: "**Right lower lobe** is the largest right lobe, lying behind and below the oblique fissure, which runs from about T3 behind to the 6th costal cartilage in front. Its base rests on the right dome of the diaphragm over the liver. It contains the superior segment and four basal segments. On the model, view the right lung from behind.",
  },
  lobo_sup_e: {
    text: "**Left upper lobe** lies in front of and above the oblique fissure of the left lung. It has no horizontal fissure; its lower part, the lingula, plays the role of the right middle lobe. Its anterior border is indented by the cardiac notch, where the heart touches the chest wall. On the model, find the front of the left lung.",
  },
  lobo_inf_e: {
    text: "**Left lower lobe** lies behind and below the oblique fissure of the left lung. Its base rests on the left dome of the diaphragm, and its medial surface lies against the descending aorta and the back of the heart. It contains a superior segment and basal segments, with the anteromedial B7+8 often fused. On the model, view the left lung from behind.",
  },
  a_sd_apical: {
    text: "**Right apical segmental artery** (A1) supplies the apical segment of the right upper lobe. It usually arises from the anterior trunk, the first branch of the right pulmonary artery, together with A3. It runs upward beside B1 into the apex. On the model, find the vessel rising from the upper lobar artery toward the top of the lung.",
  },
  a_sd_post: {
    text: "**Right posterior segmental artery** (A2) supplies the posterior segment of the right upper lobe. It may come from the anterior trunk, but often arises separately as an ascending branch of the interlobar artery. It runs with B2. On the model, find the branch running backward into the upper lobe.",
  },
  a_sd_ant: {
    text: "**Right anterior segmental artery** (A3) supplies the anterior segment of the right upper lobe. It usually leaves the anterior trunk with A1 and runs forward and laterally beside B3, above the horizontal fissure. On the model, find the forward branch of the upper lobar artery.",
  },
  lobmedd: {
    text: "**Middle lobe artery** arises from the anterior side of the interlobar part of the right pulmonary artery, roughly opposite the superior segment artery A6. It runs forward beside the middle lobe bronchus and divides into A4 and A5. On the model, find the forward branch of the right pulmonary artery between the upper and lower lobe vessels.",
  },
  a_sd_lat: {
    text: "**Lateral segmental artery of the middle lobe** (A4) is the outer branch of the middle lobe artery. It runs with B4 toward the lateral chest wall. On the model, follow the middle lobe artery and take its lateral branch.",
  },
  a_sd_med: {
    text: "**Medial segmental artery of the middle lobe** (A5) is the inner branch of the middle lobe artery. It runs with B5 toward the medial surface of the lobe, which lies against the right atrium. On the model, follow the middle lobe artery and take its medial branch.",
  },
  lobinfd: {
    text: "**Right lower lobe artery** continues the interlobar artery downward after the middle lobe artery and A6 leave it. It runs lateral to the lower lobe bronchus and ends as the basal arteries A7–A10. On the model, follow the right pulmonary artery down and back into the lower lobe.",
  },
  a_sd_sup: {
    text: "**Right superior segmental artery** (A6) supplies the superior segment of the right lower lobe. It arises from the posterior side of the interlobar artery, roughly opposite the middle lobe artery, and runs backward with B6. On the model, view from behind and find the branch to the top of the lower lobe.",
  },
  a_sd_basal: {
    text: "**Right basal segmental arteries** (A7–A10) are the terminal branches of the right lower lobe artery. They fan out with the basal bronchi into the medial, anterior, lateral and posterior basal segments above the diaphragm. Their branching pattern varies, so the model shows them as one group. On the model, find the fan of vessels at the base of the right lung.",
  },
  a_se_apical: {
    text: "**Left apical segmental artery** (A1) supplies the apical part of the left upper lobe. Unlike the right side, there is no single upper lobar trunk: the left pulmonary artery gives several separate branches as it arches over the left main bronchus, and A1 is one of the first. It often shares a stem with A2. On the model, find the vessel rising to the left apex.",
  },
  a_se_post: {
    text: "**Left posterior segmental artery** (A2) supplies the posterior part of the left upper lobe. It arises from the upper side of the left pulmonary artery as the artery crosses over the left main bronchus to reach its posterior side, often together with A1. On the model, find the branch heading backward from the top of the arch.",
  },
  a_se_ant: {
    text: "**Left anterior segmental artery** (A3) supplies the anterior segment of the left upper lobe. It is a large early branch of the left pulmonary artery, usually leaving its anterosuperior side before or near the arch. It runs forward with B3. On the model, find the forward branch of the left pulmonary artery.",
  },
  a_se_lsup: {
    text: "**Superior lingular artery** (A4) supplies the upper half of the lingula. It arises from the front of the interlobar part of the left pulmonary artery, in the oblique fissure, alone or with A5 as a common lingular artery. It runs forward with B4. On the model, find the upper forward branch into the lingula.",
  },
  a_se_linf: {
    text: "**Inferior lingular artery** (A5) supplies the lower half of the lingula, which lies over the left ventricle. It arises from the interlobar part of the left pulmonary artery, alone or with A4 as a common lingular artery, and runs forward and down with B5. On the model, find the lower branch into the lingula.",
  },
  a_se_sup: {
    text: "**Left superior segmental artery** (A6) supplies the superior segment of the left lower lobe. It leaves the posterior side of the interlobar part of the left pulmonary artery, at about the level of the lingular branches, and runs backward with B6. On the model, view from behind and find the branch to the top of the left lower lobe.",
  },
  a_se_basal: {
    text: "**Left basal segmental arteries** (A7–A10) are the terminal branches of the left pulmonary artery in the lower lobe. They fan out with the basal bronchi above the left hemidiaphragm; A7 and A8 often share a stem, as their bronchi do. The model shows them as one group. On the model, find the fan of vessels at the base of the left lung.",
  },
  v_sd_apical: {
    text: "The **apical vein (V1)** drains S1 of the right upper lobe and ascends near the mediastinal surface toward the hilum. It often joins V3 before entering the right superior pulmonary vein. Pulmonary veins run between segments, not with the bronchi. Exam point: intersegmental veins like V1 mark the plane a surgeon follows during segmentectomy.",
  },
  v_sd_post: {
    text: "The **posterior vein (V2)** drains S2 of the right upper lobe and is usually the largest upper lobe vein. It runs forward from behind the upper lobar bronchus, often through a central pathway, to reach the right superior pulmonary vein. Exam point: because it lies between segments, V2 helps define the posterior plane during upper lobectomy.",
  },
  v_sd_ant: {
    text: "The **anterior vein (V3)** drains S3 of the right upper lobe and runs from the anterior hilum to the right superior pulmonary vein, often joining V1. It lies in the intersegmental plane between S1 and S3. Exam point: pulmonary veins run between segments, unlike the segmental arteries, which run with the bronchi inside them.",
  },
  v_sd_lat: {
    text: "The **lateral middle lobe vein (V4)** drains S4 of the right middle lobe. Follow it from the rib-facing side of the wedge between the fissures. It usually reaches the right superior pulmonary vein through the middle lobe vein.",
  },
  v_sd_med: {
    text: "The **medial middle lobe vein (V5)** drains S5 of the right middle lobe. Follow it from the heart-facing side of the wedge between the fissures. It usually reaches the right superior pulmonary vein through the middle lobe vein.",
  },
  v_sd_sup: {
    text: "The **superior segmental vein (V6)** drains S6 of the right lower lobe and is the highest tributary of the right inferior pulmonary vein. It runs from behind the right hilum above the common basal vein. Exam point: V6 lies in the plane between the superior segment and the basal segments, which the surgeon follows during lower lobectomy.",
  },
  v_sd_bsup: {
    text: "The **superior basal vein** drains mainly S8 and S9 of the right lower lobe. Follow it from the front and outer side of the base beside the diaphragm. It usually reaches the right inferior pulmonary vein through the common basal vein.",
  },
  v_sd_binf: {
    text: "The **inferior basal vein** drains mainly S10 of the right lower lobe. Follow it from the back of the base beside the diaphragm. It usually reaches the right inferior pulmonary vein through the common basal vein.",
  },
  v_se_apicpost: {
    text: "The **apicoposterior vein (V1+2)** drains S1+2 of the left upper lobe and is the highest tributary of the left superior pulmonary vein. It descends from the apex near the mediastinal surface. Exam point: on the left, V1 and V2 usually join as V1+2 because S1 and S2 fuse, mirroring the fused B1+2.",
  },
  v_se_ant: {
    text: "The **anterior vein (V3)** drains S3 of the left upper lobe and enters the left superior pulmonary vein between the apicoposterior and lingular tributaries. It lies in the intersegmental plane between S1+2 and S3. Exam point: like all intersegmental veins, it marks a segment boundary rather than running with a bronchus.",
  },
  v_se_ling: {
    text: "The **lingular vein** combines V4 from S4 and V5 from S5 beside the left heart border below the cardiac notch. It is the lowest tributary of the left superior pulmonary vein and the counterpart of the right middle lobe veins. Exam point: it is the venous landmark of the lingula; a lingula-sparing resection must preserve it, while a standard left upper lobectomy divides it.",
  },
  v_se_sup: {
    text: "The **superior segmental vein (V6)** drains S6 of the left lower lobe and is the highest tributary of the left inferior pulmonary vein. It runs from behind the left hilum above the common basal vein. Exam point: V6 marks the plane between the superior segment and the basal segments, a key landmark in lower lobectomy.",
  },
  v_se_bsup: {
    text: "The **superior basal vein** drains mainly S7+8 and S9 of the left lower lobe. Follow it from the front and outer side of the base beside the diaphragm. It usually reaches the left inferior pulmonary vein through the common basal vein.",
  },
  v_se_binf: {
    text: "The **inferior basal vein** drains mainly S10 of the left lower lobe. Follow it from the back of the base beside the diaphragm. It usually reaches the left inferior pulmonary vein through the common basal vein.",
  },
  pap_ve_pm: {
    text: "**Posteromedial papillary muscle** arises from the inferior LV wall near the septum and sends chordae to both mitral leaflets. It usually receives a single arterial supply from the PDA, so it is the muscle that ruptures after inferior infarction. Rupture causes acute mitral regurgitation and pulmonary oedema. Exam point: a new systolic murmur with shock after inferior infarction suggests this complication.",
  },
  vsc_d: {
    text: "**Right subclavian vein** continues the axillary vein from the outer border of the first rib. It arches over the rib in front of the anterior scalene, which separates it from the subclavian artery, and joins the internal jugular vein behind the sternoclavicular joint to form the brachiocephalic vein. On the model, find it above the right first rib.",
  },
  vsc_e: {
    text: "**Left subclavian vein** continues the axillary vein from the outer border of the first rib. It arches over the rib in front of the anterior scalene, which separates it from the subclavian artery, and joins the internal jugular vein behind the sternoclavicular joint to form the brachiocephalic vein. On the model, find it above the left first rib.",
  },
  ttc_d: {
    text: "**Right thyrocervical trunk** is a short branch of the first part of the subclavian artery, rising just medial to the anterior scalene. It divides into the inferior thyroid, suprascapular and transverse cervical arteries. On the model, find the short vessel rising from the right subclavian artery.",
  },
  ttc_e: {
    text: "**Left thyrocervical trunk** is a short branch of the first part of the subclavian artery, rising just medial to the anterior scalene. It divides into the inferior thyroid, suprascapular and transverse cervical arteries. On the model, find the short vessel rising from the left subclavian artery.",
  },
  tcc_d: {
    text: "**Right costocervical trunk** arises from the back of the subclavian artery, behind the anterior scalene on the right and usually medial to it on the left. It arches backward over the dome of the pleura to the neck of the first rib, where it divides into the deep cervical artery and the superior intercostal artery. On the model, find the short vessel heading back toward the first rib.",
  },
  tcc_e: {
    text: "**Left costocervical trunk** arises from the back of the subclavian artery, behind the anterior scalene on the right and usually medial to it on the left. It arches backward over the dome of the pleura to the neck of the first rib, where it divides into the deep cervical artery and the superior intercostal artery. On the model, find the short vessel heading back toward the first rib.",
  },
  pica_rest_d: {
    text: "**Right posterior intercostal arteries 3–11** arise from the descending aorta. They cross the vertebral bodies behind the esophagus and azygos vein. In the costal groove the vein lies above the artery and the nerve below.",
  },
  pica_rest_e: {
    text: "**Left posterior intercostal arteries 3–11** arise from the back of the descending thoracic aorta and enter the left rib spaces. In each costal groove the vein lies above the artery and the nerve below (VAN). They anastomose with anterior intercostal branches. Exam point: enlargement in coarctation erodes ribs 3–8, but ribs 1–2 are spared because they arise from the costocervical trunk.",
  },
  mfa_d: {
    text: "**Right musculophrenic artery** is the lateral terminal branch of the internal thoracic artery, formed in the 6th intercostal space. It runs down and laterally behind the costal cartilages along the costal margin, giving anterior intercostal arteries to spaces 7–9 and branches to the diaphragm. On the model, follow the internal thoracic artery to its end and take the lateral branch.",
  },
  mfa_e: {
    text: "**Left musculophrenic artery** is the lateral terminal branch of the internal thoracic artery, formed in the 6th intercostal space. It runs down and laterally behind the costal cartilages along the costal margin, giving anterior intercostal arteries to spaces 7–9 and branches to the diaphragm. On the model, follow the internal thoracic artery to its end and take the lateral branch.",
  },
  aes_d: {
    text: "**Right superior epigastric artery** is the medial terminal branch of the internal thoracic artery. It descends through the sternocostal triangle between the sternal and costal parts of the diaphragm and enters the rectus sheath behind rectus abdominis, where it meets the inferior epigastric artery. On the model, follow the internal thoracic artery straight down past the costal margin.",
  },
  aes_e: {
    text: "**Left superior epigastric artery** is the medial terminal branch of the internal thoracic artery. It descends through the sternocostal triangle between the sternal and costal parts of the diaphragm and enters the rectus sheath behind rectus abdominis, where it meets the inferior epigastric artery. On the model, follow the internal thoracic artery straight down past the costal margin.",
  },
};

export const REGION_OVERVIEW = {
  laringe: "The larynx is the cartilage box at the top of the trachea, from C3 to C6. A frame of cartilages, joined by membranes and ligaments, carries the vocal folds; small intrinsic muscles open, close and tense them. Exam key: the posterior cricoarytenoid is the only opener, and every intrinsic muscle is supplied by the recurrent laryngeal nerve except the cricothyroid.",
  camaras: "The atria receive blood. The right ventricle forms most of the front of the heart. The left ventricle forms the apex.",
  vasos: "Trace the aorta from the left ventricle and the pulmonary trunk from the right. The cavae return to the right atrium and the pulmonary veins to the left.",
  valvas: "Identify the inlet valves by their chordae. The semilunar valves sit at the arterial outlets and have pocket-shaped cusps.",
  coronarias: "Trace both ostia from the aortic root. Follow each artery in its groove, name its branches, then predict which wall an occlusion would affect.",
  veias: "Most cardiac veins drain into the coronary sinus, a wide channel in the posterior atrioventricular groove that opens into the right atrium. The great, middle and small cardiac veins follow the main arterial grooves and return blood from the myocardium.",
  vias: "The trachea is the main airway between the larynx and the lungs. It descends in the midline, divides at the carina into two main bronchi, and each bronchus enters a hilum to supply one lung. Inside the lung, each main bronchus divides into lobar bronchi, one for each of the five lobes.",
  segd: "Use the fissures to identify the lobe, then follow B1–B10. A segmental artery travels with its bronchus inside the segment. Intersegmental veins run along the boundaries and drain adjacent territories.",
  sege: "Use the oblique fissure to separate the lobes. In the usual left pattern, S1+2 is apicoposterior and S7+8 is anteromedial basal. A segmental artery travels with its bronchus inside the segment. Intersegmental veins run along the boundaries and drain adjacent territories.",
  mediastino: "Use the sternal angle to separate the superior and inferior mediastinum. Below it, the pericardium divides the anterior, middle and posterior compartments.",
  artpulm: "Match A to B: each segmental artery runs with the corresponding bronchus. On the right the anterior trunk usually gives A1 and A3. Trace A2 separately if it rises from the interlobar artery. On the left look for separate upper lobe branches as the artery arches over the bronchus.",
  veipulm: "Intersegmental veins mark boundaries between adjacent segments. Other venous branches drain within segments. In the usual pattern, each superior pulmonary vein drains the upper lobe and on the right also the middle lobe. Each inferior pulmonary vein receives V6 and the common basal vein.",
};

export const LEVEL_OVERVIEW = {
  "laringe-1": "The laryngeal skeleton: the hyoid above, the large thyroid cartilage, the cricoid ring below at C6, the epiglottis guarding the inlet, and the small arytenoid and corniculate cartilages that move the vocal folds.",
  "laringe-2": "Membranes and ligaments tie the cartilages together. The thyrohyoid membrane hangs the larynx from the hyoid; the cricothyroid ligament closes the gap below and rises as the conus elasticus, whose free edges are the vocal ligaments.",
  "laringe-3": "Intrinsic muscles move the vocal folds. Posterior cricoarytenoid opens; lateral cricoarytenoid and interarytenoids close; cricothyroid tenses; thyroarytenoid and vocalis relax and fine-tune. All are recurrent laryngeal except the cricothyroid (external superior laryngeal).",
  "camaras-1": "Find the right ventricle behind the sternum and the left ventricle at the apex. The right atrium forms the right border and receives the caval veins; the left atrium forms most of the base behind the aortic root. Wall thickness separates the ventricles, and the apex belongs to the left.",
  "vasos-1": "The aorta is the body's main arterial trunk. It leaves the left ventricle, ascends, arches over the left main bronchus and descends behind the heart, giving three branches to the head, neck and arms. This level follows that course and the branches that spring from the arch.",
  "vasos-2": "The two brachiocephalic veins unite behind the first right costal cartilage to form the SVC, which descends into the right atrium. The IVC ascends from the abdomen through the diaphragm at T8 to enter the same chamber from below. The azygos vein joins the SVC just before it reaches the atrium.",
  "vasos-3": "The pulmonary trunk divides beneath the aortic arch. At the hila, the right pulmonary artery is anterior to the right main bronchus. The left artery passes above the left main bronchus.",
  "vasos-4": "The pulmonary veins usually enter the back of the left atrium through four openings. Superior veins drain the upper lobes and the right middle lobe. Inferior veins drain the lower lobes.",
  "vasos-5": "The azygos arches over the right hilum to join the SVC; the hemiazygos and accessory hemiazygos drain the left spaces and cross to it. The esophagus descends behind the trachea and left atrium. The thymus lies between the manubrium and the great vessels, largest in childhood.",
  "valvas-1": "The atrioventricular valves guard the openings between atria and ventricles. The tricuspid valve on the right has three leaflets; the mitral valve on the left has two. They hang from fibrous rings, are tethered by chordae to papillary muscles, and close during ventricular systole.",
  "valvas-2": "The semilunar valves guard the two outflow tracts. The pulmonary valve sits anterior and superior, leading to the lungs; the aortic valve sits centrally, leading to the body. Each has three thin cusps with a nodule and lunules, and neither has chordae.",
  "valvas-3": "Papillary muscles are ventricular muscles that anchor the atrioventricular valve leaflets through chordae tendineae. They contract during systole, tightening the chordae so the leaflets meet without prolapsing. This level contrasts the three right ventricular muscles with the two left ventricular muscles: the anterolateral, with a dual blood supply, and the posteromedial, with a single one.",
  "coronarias-1": "LAD usually means anterior LV, apex and anterior septum. Circumflex or obtuse marginal usually means lateral LV. The RCA usually supplies the inferior wall through the PDA and posterolateral branches. In left dominance, suspect the circumflex for an inferior infarct.",
  "coronarias-2": "From base to apex, look for a proximal conus branch when present, then successive septal perforators and diagonals. Septals dive deep. Diagonals cross the LV surface. Small branches cross onto the RV. The order of individual takeoffs varies. The great cardiac vein follows the LAD in the anterior groove.",
  "coronarias-3": "At the crux, trace the PDA back to the RCA or circumflex to establish dominance. The posterolateral branches can share supply between the two systems in a codominant pattern. The middle cardiac vein follows the PDA regardless of its origin.",
  "veias-1": "Match the great cardiac vein to the LAD and circumflex, the middle cardiac vein to the PDA, and the small cardiac vein to the RCA. Follow all three to the coronary sinus and then to the right atrium.",
  "vias-1": "The trachea is the main airway between the larynx and the lungs. It descends in the midline, divides at the carina into two main bronchi, and each bronchus enters a hilum to supply one lung. The right bronchus is wider and steeper, the left longer and more horizontal.",
  "segd-1": "Right upper lobe: apical S1, posterior S2 and anterior S3. Right middle lobe: lateral S4 toward the ribs and medial S5 against the right heart border. Each segment has its own bronchus and arterial branch, and intersegmental veins run on the boundaries.",
  "segd-2": "Right lower lobe: S6 caps the lobe behind the hilum. At the diaphragm, find medial S7 beside the mediastinum, anterior S8, lateral S9 by the ribs and posterior S10 beside the spine. B7–B10 and A7–A10 run inside their segments, with intersegmental veins between them.",
  "sege-1": "Left upper lobe: apicoposterior S1+2 and anterior S3 above the cardiac notch. The lingula lies below the notch, with S4 above S5. Its upper division gives B1+2 and B3; the lingular division gives B4 and B5, each with its artery.",
  "sege-2": "Left lower lobe: S6 caps the lobe behind the hilum. At the base, anteromedial S7+8 lies beside the heart, lateral basal S9 by the ribs and posterior basal S10 beside the spine. B7+8, B9 and B10 follow their arteries, and intersegmental veins mark the planes.",
  "mediastino-1": "Find the thymus behind the manubrium and the esophagus behind the trachea and left atrium. The aorta and azygos system lie beside the spine. This level follows the superior mediastinum from the thoracic inlet to the sternal angle, where the aortic arch, tracheal bifurcation and azygos arch cluster.",
  "mediastino-2": "The diaphragm is the muscular floor of the thorax and the principal muscle of breathing. Its right and left domes are supplied by the phrenic nerves and by vessels that reach them from above and below. This level follows the inferior and superior phrenic vessels onto its surfaces.",
  "mediastino-3": "The internal thoracic arteries run beside the sternum behind the costal cartilages, giving anterior intercostal branches. These meet posterior intercostal branches in the rib spaces. Below, each internal thoracic artery ends as the musculophrenic and superior epigastric arteries; the first two posterior spaces come from the costocervical trunk.",
  "mediastino-4": "The thoracic skeleton is the bony frame that protects the heart and lungs. The sternum forms the front, the ribs and costal cartilages form the sides, and the thoracic vertebrae form the back. This level identifies the landmarks used to count ribs and locate the heart.",
  "vias-2": "Five lobar bronchi serve five lobes. On the right the upper lobar bronchus leaves above the pulmonary artery. The bronchus intermedius then divides into the middle and lower lobar bronchi. On the left the upper and lower lobar bronchi arise below the arching pulmonary artery.",
  "vias-3": "The right lung has three lobes, split by the oblique and horizontal fissures; the left lung has two, split by the oblique fissure alone, with the lingula standing in for a middle lobe. The upper lobes face forward and up, the lower lobes backward and down. This level places the five lobes and the borders they hide on a radiograph.",
  "artpulm-1": "The right upper lobe gets its blood mainly from the anterior trunk, the first branch of the right pulmonary artery. That trunk gives the apical and anterior segmental arteries; the posterior segmental artery often arises separately, as an ascending branch of the interlobar artery. Each artery runs beside the bronchus of the same number.",
  "artpulm-2": "After the anterior trunk, the right pulmonary artery continues as the interlobar artery in the depth of the oblique fissure. It gives the middle lobe artery forward and the superior segmental artery backward at almost the same level, then continues as the lower lobe artery and ends as the basal arteries.",
  "artpulm-3": "Trace the left pulmonary artery over the main bronchus. A1+2 and A3 supply the upper division. A4 and A5 run toward the lingula. A6 runs back behind the hilum. A7+8, A9 and A10 continue toward the diaphragm in the usual fused pattern.",
  "veipulm-1": "Right superior pulmonary vein: V1–V3 from the upper lobe and usually V4–V5 from the middle lobe. Right inferior pulmonary vein: V6 behind the hilum and a common basal trunk draining S7–S10.",
  "veipulm-2": "Left superior pulmonary vein: V1+2 and V3 from the upper division, plus V4–V5 from the lingula. Left inferior pulmonary vein: V6 behind the hilum and a common basal trunk from S7+8, S9 and S10.",
  "mediastino-5": "The thoracic outlet and chest wall vessels link the subclavian vessels above with the aorta and the abdominal wall below. The subclavian vein crosses the first rib in front of the anterior scalene; the thyrocervical and costocervical trunks leave the subclavian artery; the aortic posterior intercostal arteries supply spaces 3–11; and the internal thoracic artery ends as the musculophrenic and superior epigastric arteries.",
};

export const LEVEL_CONTRAST = {
  "laringe-1": { a: "lar_tir", b: "lar_cri", title: "Thyroid or cricoid", text: "The thyroid is the large open shield with two plates meeting in front. The cricoid lies below it at C6 and is the only complete ring, tall at the back where the arytenoids sit." },
  "laringe-2": { a: "lar_mth", b: "lar_mct", title: "Thyrohyoid membrane or cricothyroid ligament", text: "The thyrohyoid membrane is above the thyroid cartilage and is pierced by the internal laryngeal nerve. The cricothyroid ligament is below it, between thyroid and cricoid, and is where a cricothyrotomy goes." },
  "laringe-3": { a: "lar_pca", b: "lar_lca", title: "Posterior or lateral cricoarytenoid", text: "Both pull on the arytenoid muscular process. The posterior one, on the back of the cricoid, rotates the folds apart and is the only opener; the lateral one, on the side, rotates them together and closes." },
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
    text: "The azygos ascends on the right, then arches over the right hilum to the SVC. The hemiazygos ascends beside the lower left vertebral bodies and crosses behind the aorta to join it.",
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
    text: "The great cardiac vein ascends beside the LAD and turns left beside the circumflex. The middle cardiac vein ascends beside the PDA on the diaphragmatic surface to the atrial end of the sinus.",
  },
  "vias-1": {
    a: "bpd", b: "bpe", title: "Right or left main bronchus",
    text: "The right main bronchus is shorter, wider and steeper, almost continuing the tracheal line. The left is longer, narrower and more horizontal, passing under the aortic arch. At the carina, the steeper branch goes right.",
  },
  "segd-1": {
    a: "sd_lat", b: "sd_med", title: "Lateral or medial middle lobe segment",
    text: "Both belong to the right middle lobe. The lateral segment S4 faces the chest wall; the medial segment S5 faces the heart and silhouettes the right atrial border. Look at the inner or outer surface of the middle lobe.",
  },
  "segd-2": {
    a: "sd_sup", b: "sd_bpost", title: "Superior or posterior basal segment",
    text: "Both lie in the right lower lobe. The superior segment S6 is at the top of the lobe, behind the hilum; the posterior basal segment S10 is at the bottom, beside the vertebrae. Top versus bottom of the lower lobe separates them.",
  },
  "sege-1": {
    a: "se_lsup", b: "se_linf", title: "Superior or inferior lingular segment",
    text: "S4 lies above S5 in the lingula. S5 forms its tip along the left heart border. Lingular consolidation can obscure that border.",
  },
  "sege-2": {
    a: "se_sup", b: "se_bpost", title: "Superior or posterior basal segment",
    text: "Both lie in the left lower lobe. The superior segment S6 caps the lobe behind the hilum; the posterior basal segment S10 fills the bottom beside the vertebrae. Find the top of the lobe versus its posterior base.",
  },
  "mediastino-1": {
    a: "hemiazigo", b: "azigo_acs", title: "Hemiazygos or accessory hemiazygos vein",
    text: "The hemiazygos drains the lower left posterior rib spaces. The accessory hemiazygos descends from the middle rib spaces. Look at which side of the lower crossing each vein approaches from.",
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
  "vias-2": {
    a: "blob_sup_d", b: "blob_sup_e", title: "Right or left upper lobe bronchus",
    text: "The right one leaves the main bronchus only 1–2.5 cm below the carina and runs above its artery (eparterial). The left one leaves the end of a 5 cm main bronchus, below the arching left pulmonary artery, and splits into an upper division and the lingular bronchus.",
  },
  "vias-3": {
    a: "lobo_med_d", b: "lobo_inf_d", title: "Middle or lower lobe",
    text: "The middle lobe is a small anterior wedge against the right atrium: its consolidation hides the right heart border and is heard at the front. The lower lobe is large and posterior, resting on the diaphragm: its consolidation hides the hemidiaphragm and is heard at the back.",
  },
  "artpulm-1": {
    a: "a_sd_apical", b: "a_sd_post", title: "Apical or posterior segmental artery",
    text: "Both supply the right upper lobe. The apical artery climbs from the anterior trunk to the apex with B1. The posterior artery runs backward with B2 and often arises separately from the interlobar artery, a branch easily missed in an upper lobectomy.",
  },
  "artpulm-2": {
    a: "lobmedd", b: "a_sd_sup", title: "Middle lobe artery or superior segmental artery",
    text: "Both leave the interlobar artery at almost the same level. The middle lobe artery goes forward to the small wedge between the fissures; the superior segmental artery goes backward to the top of the lower lobe.",
  },
  "artpulm-3": {
    a: "a_se_ant", b: "a_se_lsup", title: "Anterior segmental or superior lingular artery",
    text: "Both run forward in the left upper lobe. The anterior segmental artery is usually the first branch, leaving the artery before its arch. The superior lingular artery leaves later, from the interlobar part in the oblique fissure, and runs down into the tongue of the lobe.",
  },
  "veipulm-1": {
    a: "v_sd_lat", b: "v_sd_sup", title: "Middle lobe vein or superior segmental vein",
    text: "The lateral middle lobe vein drains forward lung into the superior pulmonary vein, which is why that vein must not be tied whole in an upper lobectomy. The superior segmental vein drains the top of the lower lobe into the inferior pulmonary vein.",
  },
  "veipulm-2": {
    a: "v_se_ling", b: "v_se_sup", title: "Lingular vein or superior segmental vein",
    text: "The lingular vein is the lowest tributary of the left superior pulmonary vein, draining the tongue of the upper lobe. The superior segmental vein is the highest tributary of the left inferior pulmonary vein, draining the top of the lower lobe.",
  },
  "mediastino-5": {
    a: "ttc_d", b: "tcc_d", title: "Thyrocervical or costocervical trunk",
    text: "Both are short branches of the subclavian artery. The thyrocervical trunk rises in front, medial to the anterior scalene, toward the thyroid and shoulder. The costocervical trunk arches backward over the pleural dome to the first rib and gives the first two intercostal arteries.",
  },
};

export const LEVEL_CHECK = {
  "laringe-1": [
    { q: "Which laryngeal cartilage is the only complete ring?", options: ["Cricoid", "Thyroid", "Arytenoid", "Epiglottis"], answer: 0, why: "The cricoid is a full signet ring at C6; the thyroid is open behind.", exam: true },
    { q: "At what vertebral level is the cricoid cartilage?", options: ["C6", "C3", "C4", "T4"], answer: 0, why: "C6 marks the cricoid and the start of the trachea and esophagus; the hyoid is at C3.", exam: true },
    { q: "Which cartilages do almost all intrinsic muscles act on?", options: ["Arytenoids", "Corniculates", "Epiglottis", "Hyoid"], answer: 0, why: "The arytenoids pivot on the cricoid; their movement opens and closes the rima glottidis.", exam: true },
  ],
  "laringe-2": [
    { q: "Emergency airway access below the vocal folds goes through which structure?", options: ["Median cricothyroid ligament", "Thyrohyoid membrane", "Hyoepiglottic ligament", "First tracheal ring"], answer: 0, why: "Cricothyrotomy passes through the cricothyroid ligament, just under the skin below the vocal folds.", exam: true },
    { q: "Which nerve pierces the thyrohyoid membrane?", options: ["Internal branch of the superior laryngeal nerve", "Recurrent laryngeal nerve", "External branch of the superior laryngeal nerve", "Vagus trunk"], answer: 0, why: "The internal laryngeal nerve and superior laryngeal artery pierce the membrane; the nerve gives sensation above the vocal folds.", exam: true },
    { q: "The vocal ligament is the free upper edge of which structure?", options: ["Conus elasticus (cricothyroid membrane)", "Thyrohyoid membrane", "Quadrangular membrane", "Hyoepiglottic ligament"], answer: 0, why: "The conus elasticus rises from the cricoid; its free upper border thickens as the vocal ligament.", exam: true },
  ],
  "laringe-3": [
    { q: "Which is the only muscle that opens the rima glottidis?", options: ["Posterior cricoarytenoid", "Lateral cricoarytenoid", "Cricothyroid", "Interarytenoid"], answer: 0, why: "The posterior cricoarytenoid is the only abductor; all the others close, tense or relax.", exam: true },
    { q: "Which intrinsic laryngeal muscle is not supplied by the recurrent laryngeal nerve?", options: ["Cricothyroid", "Posterior cricoarytenoid", "Thyroarytenoid", "Lateral cricoarytenoid"], answer: 0, why: "The cricothyroid is supplied by the external branch of the superior laryngeal nerve.", exam: true },
    { q: "Which muscle tenses the vocal folds to raise pitch?", options: ["Cricothyroid", "Thyroarytenoid", "Posterior cricoarytenoid", "Interarytenoid"], answer: 0, why: "Cricothyroid tilts the thyroid forward, lengthening the folds; thyroarytenoid does the opposite.", exam: true },
    { q: "Which muscle shortens and relaxes the vocal folds?", options: ["Thyroarytenoid", "Cricothyroid", "Posterior cricoarytenoid", "Lateral cricoarytenoid"], answer: 0, why: "Thyroarytenoid pulls the arytenoids toward the thyroid, slackening the folds.", exam: true },
    { q: "Bilateral recurrent laryngeal nerve injury causes what?", options: ["Stridor, because neither fold can open", "Monotone voice only", "Loss of sensation above the folds", "No effect on breathing"], answer: 0, why: "Losing both posterior cricoarytenoids leaves the folds near the midline, blocking the airway.", exam: true },
  ],
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
    { q: "How many pulmonary veins usually enter the left atrium?", options: ["Four", "Two", "Three", "Six"], answer: 0, why: "Two superior and two inferior pulmonary veins enter the posterior wall of the left atrium." },
    { q: "Which pulmonary vein usually drains the right middle lobe?", options: ["Right superior pulmonary vein", "Right inferior pulmonary vein", "Left superior pulmonary vein", "Left inferior pulmonary vein"], answer: 0, why: "V4 and V5 usually join the right superior pulmonary vein." },
    { q: "Pulmonary veins carry which blood?", options: ["Oxygenated blood to the left atrium", "Deoxygenated blood to the lungs", "Blood to the right atrium", "Lymph to the thoracic duct"], answer: 0, why: "Pulmonary veins are the only veins carrying oxygen-rich blood, returning it from the lungs to the left atrium." },
  ],
  "vasos-5": [
    { q: "Which vein arches over the right lung root?", options: ["Azygos vein", "Hemiazygos vein", "Left brachiocephalic vein", "Right superior pulmonary vein"], answer: 0, why: "The azygos vein arches anteriorly over the right lung root before joining the superior vena cava at T4." },
    { q: "Which route does the hemiazygos vein take to join the azygos vein?", options: ["Behind the descending aorta", "Over the right lung root", "In front of the left main bronchus", "Through the aortic hiatus"], answer: 0, why: "It ascends on the left and crosses behind the descending aorta, esophagus and thoracic duct." },
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
    { q: "Which mitral papillary muscle usually receives both LAD and circumflex branches?", options: ["Anterolateral left ventricular papillary muscle", "Anterior right ventricular papillary muscle", "Septal right ventricular papillary muscle", "Posterior right ventricular papillary muscle"], answer: 0, why: "The anterolateral papillary muscle usually receives blood from diagonals and obtuse marginal branches." },
    { q: "Which papillary muscle is particularly vulnerable to rupture after an inferior LV infarct?", options: ["Posteromedial papillary muscle", "Anterolateral LV papillary muscle", "Anterior RV papillary muscle", "Septal RV papillary muscle"], answer: 0, why: "The posteromedial muscle usually relies on a single arterial source in the inferior territory.", exam: true },
  ],
  "coronarias-1": [
    { q: "Which artery runs in the right atrioventricular groove?", options: ["Right coronary artery", "Circumflex artery", "LAD", "Posterior descending artery"], answer: 0, why: "The right coronary artery curves around the right border in the right atrioventricular groove." },
    { q: "The left main coronary artery divides into which branches?", options: ["LAD and circumflex", "RCA and circumflex", "LAD and PDA", "RCA and PDA"], answer: 0, why: "The short left main trunk divides into the anterior interventricular and circumflex arteries." },
    { q: "Which artery most often gives the SA nodal branch?", options: ["Right coronary artery", "Left circumflex artery", "LAD", "Left main coronary artery"], answer: 0, why: "A branch of the right coronary artery reaches the SA node in most hearts." },
    { q: "Occlusion of the circumflex artery mainly affects which wall?", options: ["Lateral wall of the left ventricle", "Anterior septum", "Inferior right ventricle", "Apex"], answer: 0, why: "The circumflex and its obtuse marginal branches supply the lateral LV wall (leads I, aVL, V5–V6).", exam: true },
  ],
  "coronarias-2": [
    { q: "Which vessel runs in the anterior interventricular groove?", options: ["LAD", "Circumflex", "RCA", "PDA"], answer: 0, why: "The anterior interventricular branch, or LAD, runs in the anterior groove toward the apex." },
    { q: "Septal branches of the LAD supply which part of the septum?", options: ["The anterior two-thirds", "The posterior third", "The whole right atrium", "The mitral valve"], answer: 0, why: "Anterior septal perforators supply the anterior two-thirds of the interventricular septum." },
    { q: "Diagonal branches of the LAD run where?", options: ["Across the anterior left ventricular wall", "Into the interventricular septum", "Along the right border", "In the posterior groove"], answer: 0, why: "Diagonal branches leave the LAD at an acute angle and cross the anterolateral left ventricular wall." },
    { q: "A proximal LAD occlusion causes infarction of which wall?", options: ["Anterior wall and anterior septum of the left ventricle", "Inferior wall", "Lateral wall only", "Posterior wall of the right ventricle"], answer: 0, why: "The LAD supplies the anterior LV wall, the apex and the anterior two-thirds of the septum (ECG leads V1–V4).", exam: true },
  ],
  "coronarias-3": [
    { q: "Which artery defines coronary dominance?", options: ["The artery that gives the posterior descending branch", "The right coronary artery in every heart", "The circumflex in every heart", "The left main coronary artery"], answer: 0, why: "Start by tracing the PDA to its parent. If the RCA supplies the PDA, check the posterolateral LV supply to distinguish right dominance from a shared pattern." },
    { q: "The right marginal branch runs along which margin?", options: ["The acute margin of the right ventricle", "The obtuse margin of the left ventricle", "The anterior interventricular groove", "The posterior interventricular groove"], answer: 0, why: "The right marginal branch follows the acute inferior margin of the right ventricle." },
    { q: "Posterior ventricular branches of the RCA supply which surface?", options: ["The diaphragmatic surface of the left ventricle in right-dominant hearts", "The anterior right atrium", "The septum only", "The pulmonary trunk"], answer: 0, why: "Posterolateral branches cross the diaphragmatic surface toward the left ventricle in right-dominant hearts." },
    { q: "In right dominance, which LV wall loses its usual blood supply with RCA occlusion proximal to the PDA?", options: ["Inferior wall", "Anterior wall", "Lateral wall", "Apex only"], answer: 0, why: "The RCA gives the PDA and posterolateral branches in right dominance. Together they supply the inferior LV and posterior septum.", exam: true },
    { q: "Inferior myocardial infarction often causes heart block because the RCA usually supplies which structure?", options: ["AV node", "SA node only", "Left bundle branch", "Bundle of His via the LAD"], answer: 0, why: "The AV nodal branch usually leaves the dominant artery near the crux. The RCA supplies it in most hearts.", exam: true },
    { q: "Which artery gives the posterior descending branch in about 70% of hearts?", options: ["Right coronary artery", "Circumflex artery", "LAD", "Left main coronary artery"], answer: 0, why: "Right dominance is usual (about 70%); left dominance is about 10% and codominance about 20%.", exam: true },
    { q: "Which statement about nodal arterial supply is correct?", options: ["SA node about 60% RCA; AV node about 80–90% RCA", "SA node about 90% RCA; AV node about 10% RCA", "Both nodes are supplied mainly by the LAD", "Both nodes are supplied mainly by the circumflex"], answer: 0, why: "The SA nodal branch comes from the RCA in about 60% of hearts; the AV nodal branch comes from the dominant artery, usually the RCA (about 80–90%).", exam: true },
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
    { q: "Which segments form the right upper lobe?", options: ["Apical, posterior and anterior", "Lateral and medial", "Superior and basal", "Apical and lingular"], answer: 0, why: "The right upper lobe has apical S1, posterior S2 and anterior S3 segments." },
    { q: "Which right middle lobe segment lies against the heart?", options: ["Medial segment S5", "Lateral segment S4", "Superior segment S6", "Posterior segment S2"], answer: 0, why: "Medial S5 abuts the right atrial border." },
    { q: "Which right upper lobe segment lies against the back of the rib cage above the oblique fissure?", options: ["Posterior segment of the right upper lobe S2", "Medial segment of the middle lobe S5", "Anterior basal segment S8", "Apical segment S1"], answer: 0, why: "S2 faces the posterior ribs. S1 reaches the thoracic inlet." },
    { q: "Which upper-lobe segments are separate on the right but usually fused on the left?", options: ["Apical and posterior (S1 and S2)", "Anterior and lingular (S3 and S4)", "Lateral and medial (S4 and S5)", "Apical and anterior (S1 and S3)"], answer: 0, why: "On the left, S1 and S2 commonly share one bronchus as the apicoposterior segment.", exam: true },
    { q: "Which right lobe has exactly two segments?", options: ["Middle lobe: lateral and medial", "Upper lobe: apical and posterior", "Lower lobe: superior and basal", "Upper lobe: anterior and lingular"], answer: 0, why: "The right middle lobe has lateral S4 and medial S5 segments; the left lingula is its counterpart.", exam: true },
  ],
  "segd-2": [
    { q: "Which right lower lobe segment is at the top of the lobe?", options: ["Superior segment S6", "Posterior basal S10", "Medial basal S7", "Lateral basal S9"], answer: 0, why: "The superior segment S6 caps the lower lobe behind the hilum." },
    { q: "Which segment is a common aspiration site when upright?", options: ["Posterior basal segment S10", "Superior segment S6", "Anterior segment S3", "Medial segment S5"], answer: 0, why: "Gravity directs aspirated material to the posterior basal segments in an upright patient." },
    { q: "Which right basal segment corresponds to the medial component of left S7+8?", options: ["Medial basal S7", "Anterior basal S8", "Lateral basal S9", "Posterior basal S10"], answer: 0, why: "The right medial basal segment S7 is usually independent, while on the left S7 often fuses with S8." },
    { q: "Which right lower lobe segment lies directly behind the hilum and is dependent when supine?", options: ["Right superior segment S6", "Right posterior basal segment S10", "Medial segment of the middle lobe S5", "Right anterior segment S3"], answer: 0, why: "S6 projects behind the hilum and is dependent when supine. Posterior upper lobe segments are also common sites of supine aspiration.", exam: true },
  ],
  "sege-1": [
    { q: "The lingula corresponds to which right lung structure?", options: ["The middle lobe", "The upper lobe", "The lower lobe", "The superior segment"], answer: 0, why: "The lingula is the tongue-like part of the left upper lobe and corresponds to the right middle lobe." },
    { q: "Which segment forms the lower tip of the lingula?", options: ["Inferior lingular segment S5", "Superior lingular segment S4", "Anterior segment S3", "Superior segment S6"], answer: 0, why: "S5 lies below S4 at the tip of the lingula beside the left heart border." },
    { q: "Which segments usually fuse on the left as the apicoposterior segment?", options: ["S1 and S2", "S3 and S4", "S4 and S5", "S7 and S8"], answer: 0, why: "S1 and S2 usually form apicoposterior S1+2. Its bronchus is B1+2." },
  ],
  "sege-2": [
    { q: "Which left lower lobe segment caps the lobe?", options: ["Superior segment S6", "Posterior basal S10", "Medial basal S7", "Lateral basal S9"], answer: 0, why: "The superior segment S6 lies at the top of the left lower lobe, behind the hilum." },
    { q: "Which left basal segments often fuse?", options: ["Medial and anterior basal S7 and S8", "Lateral and posterior basal S9 and S10", "Superior and medial basal S6 and S7", "Anterior and lateral basal S8 and S9"], answer: 0, why: "On the left, S7 and S8 frequently form a single anteromedial basal segment." },
    { q: "The left lower lobe lies below which fissure?", options: ["Oblique fissure", "Horizontal fissure", "Both fissures", "No fissure"], answer: 0, why: "The oblique fissure separates the two lobes in the usual left lung." },
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
    { q: "Which trunk supplies the first two posterior intercostal arteries through its superior intercostal branch?", options: ["Costocervical trunk", "Descending aorta", "Internal thoracic artery", "Subclavian vein"], answer: 0, why: "The superior intercostal artery branches from the costocervical trunk." },
    { q: "Anterior intercostal veins drain mainly into which veins?", options: ["Internal thoracic veins", "Azygos vein", "Pulmonary veins", "Coronary sinus"], answer: 0, why: "Anterior intercostal veins accompany the arteries toward the internal thoracic veins." },
  ],
  "mediastino-4": [
    { q: "Which sternal landmark marks the level of T4–T5?", options: ["The sternal angle", "The jugular notch", "The xiphisternal joint", "The clavicular notch"], answer: 0, why: "The sternal angle, or angle of Louis, marks the manubriosternal joint at T4–T5." },
    { q: "Which rib's costal cartilage marks the sternal angle?", options: ["Second", "First", "Fourth", "Seventh"], answer: 0, why: "The second costal cartilage articulates at the sternal angle, a key surface landmark." },
    { q: "Which ribs are floating ribs?", options: ["Ribs 11 and 12", "Ribs 8–10", "Ribs 1–7", "Ribs 3–5"], answer: 0, why: "Ribs 11 and 12 have no anterior attachment and end free in the muscles of the abdominal wall." },
  ],
  "vias-2": [
    {"q": "Which lobar bronchus is eparterial?", "options": ["Right upper lobe bronchus", "Left upper lobe bronchus", "Middle lobe bronchus", "Right lower lobe bronchus"], "answer": 0, "why": "Only the right upper lobe bronchus lies above its pulmonary artery.", "exam": true},
    {"q": "Which airway lies between the right upper lobe bronchus and the middle lobe bronchus?", "options": ["Bronchus intermedius", "Right main bronchus", "Lingular bronchus", "Basal trunk"], "answer": 0, "why": "The bronchus intermedius is the 3 cm right airway that carries air to the middle and lower lobes.", "exam": true},
    {"q": "Which segmental bronchi come from the left upper lobe bronchus?", "options": ["B1+2, B3, B4 and B5", "B1, B2 and B3 only", "B6 to B10", "B4 and B5 only"], "answer": 0, "why": "Its upper division gives B1+2 and B3; its lingular division gives B4 and B5."},
  ],
  "vias-3": [
    {"q": "Consolidation of which lobe hides the right heart border?", "options": ["Right middle lobe", "Right lower lobe", "Right upper lobe", "Left lower lobe"], "answer": 0, "why": "The middle lobe lies against the right atrium (silhouette sign).", "exam": true},
    {"q": "Which fissure normally separates the right upper and middle lobes?", "options": ["Horizontal fissure", "Oblique fissure", "Cardiac notch", "Pulmonary ligament"], "answer": 0, "why": "The horizontal fissure separates those two lobes.", "exam": true},
    {"q": "Where should you listen for the lower lobes?", "options": ["Over the back", "Over the front, 4th–6th ribs", "Above the clavicle", "Over the sternum"], "answer": 0, "why": "The lower lobes are mostly posterior, below the oblique fissure."},
  ],
  "artpulm-1": [
    {"q": "Which artery usually gives the right apical and anterior segmental arteries?", "options": ["Anterior trunk", "Interlobar artery", "Middle lobe artery", "Right bronchial artery"], "answer": 0, "why": "The anterior trunk, the first branch of the right pulmonary artery, gives A1 and A3.", "exam": true},
    {"q": "Which right upper lobe artery often arises from the interlobar artery?", "options": ["Posterior segmental artery (A2)", "Apical segmental artery (A1)", "Anterior segmental artery (A3)", "Middle lobe artery"], "answer": 0, "why": "An ascending A2 from the interlobar artery is a common variant and a surgical hazard.", "exam": true},
    {"q": "Which structure does each segmental pulmonary artery follow?", "options": ["Its segmental bronchus", "The intersegmental vein", "The fissure", "The bronchial artery"], "answer": 0, "why": "Arteries run with the bronchi; veins run between segments."},
  ],
  "artpulm-2": [
    {"q": "Which artery leaves the interlobar artery almost opposite the middle lobe artery?", "options": ["Superior segmental artery (A6)", "Apical artery (A1)", "Basal arteries", "Anterior trunk"], "answer": 0, "why": "A6 leaves the back of the interlobar artery at about the level the middle lobe artery leaves the front.", "exam": true},
    {"q": "Which segments does the middle lobe artery supply?", "options": ["Lateral S4 and medial S5", "Apical and anterior", "Superior and basal", "Superior and inferior lingular"], "answer": 0, "why": "A4 follows lateral B4 and A5 follows medial B5 into the right middle lobe."},
    {"q": "Where do the basal arteries lead?", "options": ["Toward the diaphragmatic surface of the lower lobe", "To the apex", "To the middle lobe", "To the mediastinal pleura"], "answer": 0, "why": "A7–A10 fan out with the basal bronchi above the diaphragm."},
  ],
  "artpulm-3": [
    {"q": "How do the left upper lobe arteries usually arise?", "options": ["As several separate branches from the arching left pulmonary artery", "From a single anterior trunk", "From the aortic arch", "From the bronchial arteries"], "answer": 0, "why": "Several branches can leave the arching left pulmonary artery to supply the upper lobe. Their origins vary.", "exam": true},
    {"q": "Where do the lingular arteries commonly arise?", "options": ["Interlobar part in the oblique fissure", "The top of the arch", "The pulmonary trunk", "The basal trunk"], "answer": 0, "why": "A4 and A5 commonly leave the front of the interlobar artery and run toward the lingula with B4 and B5."},
    {"q": "What does the left pulmonary artery hook over at the hilum?", "options": ["Left main bronchus", "Left superior pulmonary vein", "Aortic arch", "Esophagus"], "answer": 0, "why": "The artery arches over the bronchus, so all left lobar bronchi are hyparterial."},
  ],
  "veipulm-1": [
    {"q": "Into which vein does the right middle lobe vein usually drain?", "options": ["Right superior pulmonary vein", "Right inferior pulmonary vein", "Azygos vein", "Superior vena cava"], "answer": 0, "why": "V4 and V5 usually drain to the right superior pulmonary vein.", "exam": true},
    {"q": "Which veins form the right inferior pulmonary vein?", "options": ["Superior segmental vein and common basal vein", "Apical and anterior veins", "Middle lobe veins", "Bronchial veins"], "answer": 0, "why": "V6 and the common basal vein join to form the inferior pulmonary vein.", "exam": true},
    {"q": "Where do the veins that mark segment boundaries run?", "options": ["Between segments", "Beside the segmental bronchi", "Inside the fissures only", "With the bronchial arteries"], "answer": 0, "why": "Intersegmental veins run at the boundaries. Segmental arteries accompany the bronchi inside each segment."},
  ],
  "veipulm-2": [
    {"q": "Which vein of the left lung mirrors the right middle lobe vein?", "options": ["Lingular vein", "Apicoposterior vein", "Superior segmental vein", "Superior basal vein"], "answer": 0, "why": "The lingula corresponds to the right middle lobe.", "exam": true},
    {"q": "Into which vein does left V6 usually drain?", "options": ["Left inferior pulmonary vein", "Left superior pulmonary vein", "Hemiazygos vein", "Coronary sinus"], "answer": 0, "why": "Lower lobe veins drain to the inferior pulmonary vein."},
    {"q": "Which tributaries usually form the left superior pulmonary vein?", "options": ["Apicoposterior, anterior and lingular veins", "Superior and basal veins", "Bronchial veins", "Anterior intercostal veins"], "answer": 0, "why": "V1+2 and V3 drain the upper division. The lingular V4 and V5 usually join the same superior vein."},
  ],
  "mediastino-5": [
    {"q": "What separates the subclavian vein from the subclavian artery?", "options": ["Anterior scalene muscle", "Middle scalene muscle", "Clavicle", "First rib"], "answer": 0, "why": "The vein lies in front of the anterior scalene; the artery lies behind it.", "exam": true},
    {"q": "Why are ribs 1 and 2 spared from notching in coarctation?", "options": ["Their intercostal arteries come from the costocervical trunk", "They have no costal groove", "Their intercostal arteries come from the aorta", "They are cartilaginous"], "answer": 0, "why": "The first two posterior intercostals arise from the superior intercostal branch of the costocervical trunk.", "exam": true},
    {"q": "Into which two branches does the internal thoracic artery divide?", "options": ["Musculophrenic and superior epigastric", "Thyrocervical and costocervical", "Deep cervical and superior intercostal", "Inferior thyroid and suprascapular"], "answer": 0, "why": "It divides in the 6th intercostal space.", "exam": true},
  ],
};
