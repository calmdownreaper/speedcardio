// SpeedMSK · Thorax.
// Canonical answers avoid hyphens; hyphenated forms live in alt.
// Cage bones first, then the joints and ligaments as markers, then the wall
// and diaphragm muscles, with a bonus 30L level for origins and insertions.
// thoracic_vertebra is a cross-region id owned by the spine deck.

const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });

export const deck = {
  id: 'thorax',
  titulo: 'Thorax',
  cor: '#b5773f',
  ctx: ['ribs', 'sternum', 'thoracic_vertebra'],
  itens: [
    S('sternum', 'Sternum', 'Sternum', ['breastbone', 'sternum bone'], 'Flat midline bone with manubrium, body and xiphoid', [
      'The sternum has three parts: manubrium, body and xiphoid process.',
      'The sternal angle between manubrium and body lies at the level of the T4/T5 disc and the second costal cartilages.',
      'The jugular notch is the palpable upper border of the manubrium.',
    ]),
    S('ribs', 'Ribs', 'Ribs', ['rib', 'rib bones', 'costae'], 'Curved struts from the spine around the lungs toward the breastbone', [
      'Twelve pairs; ribs 1 to 7 are true, 8 to 10 false, and 11 and 12 floating.',
      'A typical rib has a head, neck, tubercle, angle and a costal groove along its lower inner border.',
      'The first rib is broad and flat, with grooves for the subclavian artery and vein.',
    ]),
    S('costal_cartilages', 'Costal cartilages', 'Costal cartilages', ['costal cartilage', 'rib cartilages', 'costal cartilage bars'], 'Hyaline bars between the ribs and the breastbone', [
      'Hyaline cartilage bars that continue each rib toward the sternum.',
      'They add elasticity to the chest wall and calcify with age.',
      'Cartilages 1 to 7 reach the sternum; 8 to 10 join the cartilage above; 11 and 12 end free.',
    ]),
    S('costovertebral_joint', 'Costovertebral joint', 'Costovertebral joint', ['costovertebral joints', 'joint of the head of the rib', 'costovertebral articulation'], 'Contact between the medial end of a rib and the sides of the spinal column', [
      'The joint of the rib head is a plane synovial joint. A typical rib head meets the bodies of its own vertebra and the one above.',
      'The radiate ligament reinforces the anterior capsule and checks displacement. The intra-articular ligament ties the head crest to the disc and limits gliding.',
      'Blunt trauma can disrupt the rib-head articulation near the spine.',
    ]),
    S('costotransverse_joint', 'Costotransverse joint', 'Costotransverse joint', ['costotransverse joints', 'costotransverse articulation'], 'Rib tubercle to the side projection of a spinal bone', [
      'The costotransverse joint is a plane synovial joint between a rib tubercle and its matching transverse process.',
      'The costotransverse ligament ties the neck to its transverse process. The lateral band holds the tubercle to the tip. The superior band ties the neck to the transverse process above. Together they check excessive glide and reinforce the capsule.',
      'A posterior rib injury can sprain the joint and hurt with deep breathing.',
    ]),
    S('costochondral_joint', 'Costochondral joint', 'Costochondral joint', ['costochondral joints', 'costochondral junction', 'costochondral articulation'], 'Where a rib meets its flexible front extension, away from the breastbone', [
      'The costochondral joint is a primary cartilaginous joint between a rib and its costal cartilage.',
      'Periosteum blends into perichondrium at the junction. Continuous cartilage supplies stability in place of a synovial capsule and discrete ligaments.',
      'Blunt trauma can separate the rib from its cartilage. Costochondritis more often causes parasternal tenderness.',
    ]),
    S('sternocostal_joint', 'Sternocostal joint', 'Sternocostal joint', ['sternocostal joints', 'sternocostal articulation'], 'Where a rib\'s flexible front extension meets the breastbone', [
      'The first sternocostal joint is a synchondrosis. Joints 2–7 are generally plane synovial joints.',
      'Radiate ligaments reinforce the synovial capsules and check displacement. The second joint usually has an intra-articular ligament from cartilage to the manubriosternal junction.',
      'Costochondritis commonly causes parasternal tenderness. Traumatic disruption can displace a costal cartilage from the sternum.',
    ]),
    S('manubriosternal_joint', 'Manubriosternal joint', 'Manubriosternal joint', ['manubriosternal symphysis', 'sternal angle joint', 'angle of Louis joint'], 'Palpable step between the top and body of the breastbone, at the second rib pair', [
      'The manubriosternal joint is usually a symphysis between the manubrium and sternal body.',
      'A fibrocartilaginous union and fibrous covering stabilize the junction and limit shear.',
      'A direct blow or flexion-compression injury can displace the joint and create a palpable step.',
    ]),
    S('xiphisternal_joint', 'Xiphisternal joint', 'Xiphisternal joint', ['xiphisternal synchondrosis', 'xiphisternal articulation'], 'Where the long body of the breastbone meets its small lower tip', [
      'The xiphisternal joint is a synchondrosis between the sternal body and xiphoid process.',
      'The cartilage anchors the xiphoid next to the diaphragm and rectus abdominis.',
      'A direct blow may fracture or displace the xiphoid below this junction.',
    ]),
    S('radiate_sternocostal_ligament', 'Radiate sternocostal ligament', 'Radiate sternocostal ligament', ['radiate sternocostal ligaments', 'sternocostal radiate ligament'], 'Fan-shaped band where the flexible rib extension meets the breastbone', [
      'Fibrous bands that radiate from the sternal end of a costal cartilage to the front and back of the sternum.',
      'They blend with the capsules of the sternocostal joints.',
      'The anterior bands are stronger than the posterior ones.',
    ]),
    S('intercostals_external', 'External intercostal', 'External intercostal', ['external intercostal muscle', 'external intercostals', 'intercostalis externus'], 'Outermost sheet between ribs. Fibers slope down and forward', [
      'Superficial layer between adjacent ribs. Fibers descend toward the front.',
      'Elevates the ribs in inspiration and supports the intercostal space. Supplied by intercostal nerves (anterior rami of T1 to T11).',
      'Arises from the lower border of the rib above. Inserts on the upper border of the rib below.',
    ]),
    S('intercostals_internal', 'Internal intercostal', 'Internal intercostal', ['internal intercostal muscle', 'internal intercostals', 'intercostalis internus'], 'Middle sheet between ribs. Fibers slope down and backward', [
      'Middle layer between adjacent ribs. Fibers descend toward the back.',
      'Interosseous fibers depress the ribs in forced expiration. Interchondral fibers can elevate them. Supplied by intercostal nerves.',
      'Arises from the floor of the costal groove of the rib above. Inserts on the upper border of the rib below.',
    ]),
    S('intercostals_innermost', 'Innermost intercostal', 'Innermost intercostal', ['innermost intercostal muscle', 'innermost intercostals', 'intercostalis intimus'], 'Deep sheet between ribs, inside the plane of the vessels', [
      'Deepest layer along the inner faces of the ribs, best developed laterally.',
      'Depresses the ribs and stabilizes the chest wall. Supplied by intercostal nerves.',
      'Arises from the medial edge of the costal groove. Inserts on the inner surface of the rib below.',
    ]),
    S('diaphragm', 'Diaphragm', 'Diaphragm', ['diaphragm muscle', 'thoracic diaphragm', 'phrenic muscle'], 'Dome between chest and abdomen', [
      'Two domes under the lungs, continuous with the central tendon beneath the heart.',
      'Flattens the domes during inspiration. The phrenic nerve (C3–C5) supplies the muscle.',
      'It arises from the xiphoid, lower six ribs and their cartilages, and lumbar crura. Fibers converge on the central tendon.',
    ]),
    S('transversus_thoracis', 'Transversus thoracis', 'Transversus thoracis', ['transversus thoracis muscle', 'transversus thoracis sternocostalis'], 'Thin muscle inside the front chest wall', [
      'On the inner surface of the anterior chest wall, between the sternum and costal cartilages.',
      'Depresses the ribs in expiration and stabilizes the anterior chest wall. Supplied by intercostal nerves (anterior rami of T2 to T6).',
      'Arises from the posterior surface of the lower sternum and xiphoid process. Inserts on the inner surfaces of costal cartilages 2 to 6.',
    ]),
    S('serratus_posterior_superior', 'Serratus posterior superior', 'Serratus posterior superior', ['serratus posterior superior muscle', 'posterior superior serratus'], 'Lower neck spines to upper ribs', [
      'Across the upper back between the lower cervical spines and ribs 2–5.',
      'Traditionally described as elevating the upper ribs. Intercostal nerves supply it.',
      'Arises from the nuchal ligament and spinous processes of C7 to T3. Inserts on the upper borders and external surfaces of ribs 2 to 5.',
    ]),
    S('serratus_posterior_inferior', 'Serratus posterior inferior', 'Serratus posterior inferior', ['serratus posterior inferior muscle'], 'Lower thoracic spines to lower ribs', [
      'Across the lower back between the thoracolumbar fascia and ribs 9–12.',
      'Traditionally described as depressing the lower ribs. The lower thoracic anterior rami supply it, including the subcostal nerve at T12.',
      'Arises from the spinous processes of T11 to L2 through the thoracolumbar fascia. Inserts on the lower borders and external surfaces of ribs 9 to 12.',
    ]),
    S('levatores_costarum', 'Levatores costarum', 'Levatores costarum', ['levator costarum', 'levatores costarum breves', 'levatores costarum longi'], 'Small fans from transverse processes to ribs', [
      'Deep posterior thorax, between the transverse processes and rib angles.',
      'Elevate the ribs in inspiration and assist lateral flexion of the thoracic spine. Supplied by posterior rami of the thoracic spinal nerves.',
      'Arise from the transverse processes of C7 and T1 to T11. Insert on the posterior surface of the rib below, or the second rib below for the longi.',
    ]),
  ],
};

export const region = { id: 'thorax', title: 'Thorax', area: 'Thorax' };

export const levels = [
  { title: 'Thoracic cage bones', ids: ['sternum', 'ribs', 'costal_cartilages', 'thoracic_vertebra'] },
  { title: 'Thoracic joints and ligaments', ids: ['costovertebral_joint', 'costotransverse_joint', 'costochondral_joint', 'sternocostal_joint', 'manubriosternal_joint', 'xiphisternal_joint', 'radiate_sternocostal_ligament'] },
  { title: 'Thoracic wall and diaphragm muscles', ids: ['intercostals_external', 'intercostals_internal', 'intercostals_innermost', 'diaphragm', 'transversus_thoracis', 'serratus_posterior_superior', 'serratus_posterior_inferior', 'levatores_costarum'] },
  { title: '30L origins and insertions', bonus: true, ids: ['intercostals_external', 'intercostals_internal', 'intercostals_innermost', 'diaphragm', 'transversus_thoracis', 'serratus_posterior_superior', 'serratus_posterior_inferior', 'levatores_costarum'] },
];

export const colors = {
  sternum: '#d8c9a4', ribs: '#cfc3a6', costal_cartilages: '#dfd2b8',
  costovertebral_joint: '#c99a4e', costotransverse_joint: '#c99a4e', costochondral_joint: '#d0a458',
  sternocostal_joint: '#d0a458', manubriosternal_joint: '#c99a4e', xiphisternal_joint: '#c99a4e',
  radiate_sternocostal_ligament: '#c4974c',
  intercostals_external: '#b45f4f', intercostals_internal: '#a8544a', intercostals_innermost: '#9d4b43',
  diaphragm: '#b56755', transversus_thoracis: '#a95a4b', serratus_posterior_superior: '#bf6b56',
  serratus_posterior_inferior: '#a85448', levatores_costarum: '#b3624f',
};

export const markers = {
  costovertebral_joint: [[17.8, 56.6, 1330.0], [-17.8, 56.6, 1330.0]],
  costotransverse_joint: [[34.4, 82.8, 1330.0], [-34.4, 82.8, 1330.0]],
  costochondral_joint: [[51.2, -73.2, 1312.3], [-51.2, -73.2, 1312.3]],
  sternocostal_joint: [[16.6, -89.2, 1316.0], [-16.6, -89.2, 1316.0]],
  manubriosternal_joint: [-0.0, -83.2, 1356.9],
  xiphisternal_joint: [-0.0, -110.4, 1242.5],
  radiate_sternocostal_ligament: [-0.0, -87.4, 1285.0],
};

// Anchor bones for each point marker and the view that shows it best.
export const markerMeta = {
  costovertebral_joint: { anchors: ['thoracic_vertebra', 'ribs'], view: 'post' },
  costotransverse_joint: { anchors: ['thoracic_vertebra', 'ribs'], view: 'post' },
  costochondral_joint: { anchors: ['ribs', 'costal_cartilages'], view: 'ant' },
  sternocostal_joint: { anchors: ['sternum', 'costal_cartilages'], view: 'ant' },
  manubriosternal_joint: { anchors: ['sternum'], view: 'ant' },
  xiphisternal_joint: { anchors: ['sternum'], view: 'ant' },
  radiate_sternocostal_ligament: { anchors: ['sternum', 'costal_cartilages'], view: 'ant' },
};

export const purpose = 'Rib and sternal joints, then the wall layers and diaphragm.';

export const overview = 'Start with the two joints at the back of a typical rib, then follow it to the cartilage and sternum. Trace the rib movements during breathing. Then identify the wall muscles in order from superficial to deep.';

export const lessons = {
  sternum: {
    lead: 'The **sternum** is the flat breastbone in the midline of the front of the chest.',
    where: 'It has a manubrium above, a body in the middle and a xiphoid process below. The jugular notch is felt at its upper border, and the sternal angle between manubrium and body is a key surface landmark.',
    relations: 'The clavicles and the first seven costal cartilages articulate with it. The internal thoracic vessels run behind it on each side, and the heart and great vessels lie behind the body.',
    function: 'It protects the heart and great vessels and forms the front of the thoracic cage. It is a site of origin for the diaphragm and the abdominal muscles.',
    clinical: 'Median sternotomy gives wide access to the heart; sternal fractures follow direct blows and may injure underlying structures.',
  },
  ribs: {
    lead: 'The **ribs** are the twelve curved bones that form the thoracic cage.',
    where: 'Each typical rib has a head, neck, tubercle, angle and shaft with a costal groove on its lower inner border. The first rib is broad and flat, and the lower ribs are shorter and more mobile.',
    relations: 'The head articulates with the vertebral bodies, the tubercle with the transverse process, and the anterior end with its costal cartilage. The intercostal vessels and nerve run in the costal groove.',
    function: 'They protect the lungs and heart and move during breathing: the upper ribs pump and the lower ribs swing outward.',
    clinical: 'Rib fractures are common after trauma; the middle ribs fracture most often. A flail segment moves paradoxically and impairs ventilation.',
  },
  costal_cartilages: {
    lead: 'The **costal cartilages** are the hyaline cartilage bars that extend each rib toward the sternum.',
    where: 'They continue the anterior end of each rib. Cartilages 1 to 7 reach the sternum, 8 to 10 join the cartilage above, and 11 and 12 end in the abdominal wall.',
    relations: 'They form the costochondral joints with the ribs and the sternocostal joints with the sternum. The internal thoracic vessels and the diaphragm attach behind them.',
    function: 'They give the chest wall elasticity, allowing it to expand in inspiration and recoil in expiration.',
    clinical: 'They calcify with age and may be mistaken for fractures on radiographs; costochondritis causes tender costochondral junctions.',
  },
  costovertebral_joint: {
    lead: 'The **joint of the rib head** is a plane synovial joint. A typical rib head meets the bodies of its own vertebra and the one above.',
    where: 'Find the rib head against the vertebral bodies and disc, medial to the tubercle and its costotransverse joint.',
    relations: 'The radiate ligament reinforces the anterior capsule and checks displacement. The intra-articular ligament ties the head crest to the disc and limits gliding.',
    function: 'The head rotates and glides with rib elevation and depression. The costotransverse joint helps guide the movement.',
    clinical: 'Blunt trauma can disrupt the rib-head articulation near the spine.',
  },
  costotransverse_joint: {
    lead: 'The **costotransverse joint** is a plane synovial joint between a rib tubercle and its matching transverse process.',
    where: 'Find it lateral to the rib-head joint, on the back of the rib neck. Ribs 11 and 12 lack this articulation.',
    relations: 'The costotransverse ligament ties the neck to its transverse process. The lateral band holds the tubercle to the tip. The superior band ties the neck to the transverse process above. Together they check excessive glide and reinforce the capsule.',
    function: 'Upper ribs rotate more. Lower ribs glide more. These linked movements raise or lower the cage with breathing.',
    clinical: 'A posterior rib injury can sprain the joint and hurt with deep breathing.',
  },
  costochondral_joint: {
    lead: 'The **costochondral joint** is a primary cartilaginous joint between a rib and its costal cartilage.',
    where: 'Follow the rib forward to the lateral end of its cartilage, away from the sternum.',
    relations: 'Periosteum blends into perichondrium at the junction. Continuous cartilage supplies stability in place of a synovial capsule and discrete ligaments.',
    function: 'The junction itself is essentially fixed. The cartilage bends as the ribs move.',
    clinical: 'Blunt trauma can separate the rib from its cartilage. Costochondritis more often causes parasternal tenderness.',
  },
  sternocostal_joint: {
    lead: 'The first **sternocostal joint** is a synchondrosis. Joints 2–7 are generally plane synovial joints.',
    where: 'Find the first cartilage at the manubrium and the second at the sternal angle. Cartilages 3–7 reach the sides of the sternal body.',
    relations: 'Radiate ligaments reinforce the synovial capsules and check displacement. The second joint usually has an intra-articular ligament from cartilage to the manubriosternal junction.',
    function: 'The first joint anchors rib 1. The lower joints permit small glides as the chest expands.',
    clinical: 'Costochondritis commonly causes parasternal tenderness. Traumatic disruption can displace a costal cartilage from the sternum.',
  },
  manubriosternal_joint: {
    lead: 'The **manubriosternal joint** is usually a symphysis between the manubrium and sternal body.',
    where: 'Find the step between the second costal cartilages. It lies roughly in the plane of the T4–T5 disc.',
    relations: 'A fibrocartilaginous union and fibrous covering stabilize the junction and limit shear.',
    function: 'Allows slight angulation as the sternum moves during breathing. The joint can fuse with age.',
    clinical: 'A direct blow or flexion-compression injury can displace the joint and create a palpable step.',
  },
  xiphisternal_joint: {
    lead: 'The **xiphisternal joint** is a synchondrosis between the sternal body and xiphoid process.',
    where: 'Find it where the costal margins converge on the lower end of the sternal body.',
    relations: 'The cartilage anchors the xiphoid next to the diaphragm and rectus abdominis.',
    function: 'The junction is essentially fixed. It often ossifies with age.',
    clinical: 'A direct blow may fracture or displace the xiphoid below this junction.',
  },
  radiate_sternocostal_ligament: {
    lead: 'The **radiate sternocostal ligaments** are fibrous bands that reinforce the front and back of the sternocostal joints.',
    where: 'They radiate from the sternal end of each costal cartilage to the anterior and posterior surfaces of the sternum.',
    relations: 'They blend with the capsules of the sternocostal joints and with the periosteum of the sternum. The anterior bands are the stronger.',
    function: 'They stabilize the costal cartilages on the sternum and limit excessive movement during breathing.',
    clinical: 'They are stretched in sternal fractures and are a source of anterior chest wall pain.',
  },
  intercostals_external: {
    lead: 'The **external intercostal** is the outer sheet of muscle in each intercostal space.',
    where: 'Superficial layer between adjacent ribs. Fibers descend toward the front.',
    relations: 'The internal layer lies deep to it. Near the sternum the muscle gives way to the external intercostal membrane.',
    function: 'Elevates the ribs in inspiration and supports the intercostal space. Supplied by intercostal nerves (anterior rami of T1 to T11).',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'lower border of the rib above',
    insertion: 'upper border of the rib below',
    clinical: 'The intercostal muscles are paralysed in high spinal cord injury, which reduces rib cage expansion.',
  },
  intercostals_internal: {
    lead: 'The **internal intercostal** is the middle sheet of the intercostal muscles.',
    where: 'Middle layer between adjacent ribs. Fibers descend toward the back.',
    relations: 'The external layer covers it. The neurovascular bundle lies deep to it in the rib groove. Near the spine the muscle gives way to a membrane.',
    function: 'Interosseous fibers depress the ribs in forced expiration. Interchondral fibers can elevate them. Supplied by intercostal nerves.',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'floor of the costal groove of the rib above',
    insertion: 'upper border of the rib below',
  },
  intercostals_innermost: {
    lead: 'The **innermost intercostal** is the deepest, incomplete sheet of the intercostal muscles.',
    where: 'Deepest layer along the inner faces of the ribs, best developed laterally.',
    relations: 'The intercostal neurovascular bundle separates it from the internal layer. Endothoracic fascia and pleura lie deep to it.',
    function: 'Depresses the ribs and stabilizes the chest wall. Supplied by intercostal nerves.',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'medial edge of the costal groove',
    insertion: 'inner surface of the rib below',
  },
  diaphragm: {
    lead: 'The **diaphragm** is the dome-shaped muscle that separates the thorax from the abdomen and drives breathing.',
    where: 'Two domes under the lungs, continuous with the central tendon beneath the heart.',
    relations: 'The pericardium is above the tendon and the liver lies beneath the right dome. The IVC crosses at T8, the esophagus at T10 and the aorta passes behind at T12.',
    function: 'Flattens the domes during inspiration. The phrenic nerve (C3–C5) supplies the muscle. Lower intercostal nerves carry peripheral sensation.',
    nerve: 'phrenic nerve (C3, C4, C5)',
    origin: 'xiphoid process, lower six ribs and their cartilages, and lumbar crura. The right crus usually reaches L3 and the left L2',
    insertion: 'central tendon',
    clinical: 'Paralysis of one half, after phrenic nerve injury, is seen as paradoxical elevation of that dome on inspiration. A posterolateral defect is a Bochdalek hernia; an anterior defect is a Morgagni hernia.',
  },
  transversus_thoracis: {
    lead: 'The **transversus thoracis** is a thin muscle on the inner front of the chest wall.',
    where: 'On the inner surface of the anterior chest wall, between the sternum and costal cartilages.',
    relations: 'The internal thoracic vessels run between it and the chest wall. Parietal pleura lies on its deep side.',
    function: 'Depresses the ribs in expiration and stabilizes the anterior chest wall. Supplied by intercostal nerves (anterior rami of T2 to T6).',
    nerve: 'intercostal nerves (anterior rami of T2 to T6)',
    origin: 'posterior surface of the lower sternum and xiphoid process',
    insertion: 'inner surfaces of costal cartilages 2 to 6',
  },
  serratus_posterior_superior: {
    lead: 'The **serratus posterior superior** is a thin muscle deep to the shoulder blade on the upper back.',
    where: 'Across the upper back between the lower cervical spines and ribs 2–5.',
    relations: 'The rhomboids cover it. Erector spinae lies deep to it.',
    function: 'Traditionally described as elevating the upper ribs. Intercostal nerves supply it.',
    nerve: 'intercostal nerves (anterior rami of T2 to T5)',
    origin: 'nuchal ligament and spinous processes of C7 to T3',
    insertion: 'upper borders and external surfaces of ribs 2 to 5',
    clinical: 'It is a source of upper back pain and is needled in myofascial pain of the rhomboid region.',
  },
  serratus_posterior_inferior: {
    lead: 'The **serratus posterior inferior** is a thin muscle across the lower back, deep to latissimus dorsi.',
    where: 'Across the lower back between the thoracolumbar fascia and ribs 9–12.',
    relations: 'Latissimus dorsi covers it. Erector spinae lies deep to it.',
    function: 'Traditionally described as depressing the lower ribs. The lower thoracic anterior rami supply it, including the subcostal nerve at T12.',
    nerve: 'anterior rami of T9–T12, including the subcostal nerve at T12',
    origin: 'spinous processes of T11 to L2 through the thoracolumbar fascia',
    insertion: 'lower borders and external surfaces of ribs 9 to 12',
  },
  levatores_costarum: {
    lead: 'The **levatores costarum** are small fan-shaped muscles between the transverse processes and the ribs.',
    where: 'Deep posterior thorax, between the transverse processes and rib angles.',
    relations: 'Erector spinae covers them. The rotatores lie medial, closer to the vertebral arches.',
    function: 'Elevate the ribs in inspiration and assist lateral flexion of the thoracic spine. Supplied by posterior rami of the thoracic spinal nerves.',
    nerve: 'posterior rami of the thoracic spinal nerves',
    origin: 'transverse processes of C7 and T1 to T11',
    insertion: 'posterior surface of the rib below, or the second rib below for the longi',
  },
};

export const lessonCues = {
  sternum: 'Midline plate of manubrium, body and xiphoid',
  ribs: 'Curved struts from the spine around the lungs toward the breastbone',
  costal_cartilages: 'Hyaline bars from ribs to sternum',
  costovertebral_joint: 'A typical rib\'s rounded end meets two adjacent blocks of the spinal column',
  costotransverse_joint: 'Small synovial contact between a rib\'s bump and a side projection of a spinal bone',
  costochondral_joint: 'Where a rib meets its flexible front extension, away from the breastbone',
  sternocostal_joint: 'Fixed first, then small gliding contacts beside the midline chest plate',
  manubriosternal_joint: 'Palpable step between the top and body of the breastbone, at the second rib pair',
  xiphisternal_joint: 'Where the long body of the breastbone meets its small lower tip',
  radiate_sternocostal_ligament: 'Fan-shaped band where the flexible rib extension meets the breastbone',
  intercostals_external: 'Outermost sheet between ribs. Fibers slope down and forward',
  intercostals_internal: 'Middle sheet between ribs. Fibers slope down and backward',
  intercostals_innermost: 'Deep sheet between ribs, inside the plane of the vessels',
  diaphragm: 'Dome between chest and abdomen with three named hiatuses',
  transversus_thoracis: 'Thin muscle on the inner sternum',
  serratus_posterior_superior: 'Upper back muscle to ribs 2 to 5',
  serratus_posterior_inferior: 'Lower back muscle to ribs 9 to 12',
  levatores_costarum: 'Small fans from transverse processes to ribs',
};

export const roundClues = {
  sternum: 'The flat midline bone of the front of the chest, with three parts.',
  ribs: 'Curved struts from the spine around the lungs toward the breastbone',
  costal_cartilages: 'The hyaline bars that continue the ribs to the breastbone.',
  costovertebral_joint: 'Small synovial contact between a rib end and two adjacent spinal blocks',
  costotransverse_joint: 'The contact linking a rib\'s bump to the side projection of its spinal segment',
  costochondral_joint: 'Where a rib meets its flexible front extension, away from the breastbone',
  sternocostal_joint: 'Where the flexible bar from a rib meets the flat midline bone of the chest',
  manubriosternal_joint: 'Palpable step between the top and body of the breastbone, at the second rib pair',
  xiphisternal_joint: 'Where the long body of the breastbone meets its small lower tip',
  radiate_sternocostal_ligament: 'Fan-shaped band where the flexible rib extension meets the breastbone',
  intercostals_external: 'Outermost sheet between ribs. Fibers slope down and forward',
  intercostals_internal: 'Middle sheet between ribs. Fibers slope down and backward',
  intercostals_innermost: 'Deep sheet between ribs, inside the plane of the vessels',
  diaphragm: 'The dome that separates chest from abdomen and drives breathing.',
  transversus_thoracis: 'The thin muscle on the inner surface of the front chest wall.',
  serratus_posterior_superior: 'The thin muscle from the lower neck spines to the upper ribs, deep to the shoulder blade.',
  serratus_posterior_inferior: 'The thin muscle from the lower thoracic spines to the lowest ribs.',
  levatores_costarum: 'The small fan-shaped muscles from transverse processes to the rib below.',
};

export const content = {
  REGION_OVERVIEW: { thorax: overview },
  LESSON_CUES: lessonCues,
  ROUND_CLUES: roundClues,
  LEVEL_OVERVIEW: {
    'thorax-1': 'The cage is built from the sternum in front, twelve pairs of ribs and their costal cartilages, and the thoracic vertebrae behind. True ribs reach the sternum, false ribs join the cartilage above, and floating ribs end free. The sternal angle and the jugular notch are the surface landmarks that let you count the rest.',
    'thorax-2': 'At the back, the rib head meets the vertebral bodies and the tubercle meets the transverse process. At the front, rib meets cartilage. Trace the cartilage to the sternum to distinguish the fixed first junction from the mobile joints below.',
    'thorax-3': 'Three layers of intercostal muscle fill each space: external fibres run down and forward and elevate the ribs, internal and innermost fibres run down and backward and depress them. The diaphragm is the main inspiratory muscle. The serratus posteriors and levatores costarum adjust the upper and lower ribs, while transversus thoracis stabilizes the front wall.',
    'thorax-30l': 'Bonus level: origins and insertions of the thoracic wall and diaphragm muscles. Fix the costal, xiphoid and crural origins of the diaphragm, the three intercostal layers, and the serratus posterior and levator costarum attachments. This is the 30L layer that turns a name into an exam answer. It is optional and does not block the next region.',
  },
  LEVEL_CONTRAST: {
    'thorax-1': { a: 'sternum', b: 'ribs', title: 'Sternum or ribs', text: 'Both frame the chest. The sternum is the single midline plate of manubrium, body and xiphoid, with the sternal angle as its key landmark. The ribs are twelve paired curved bones with a head, tubercle and costal groove; they move, while the sternum mostly stays put.' },
    'thorax-2': { a: 'costovertebral_joint', b: 'costotransverse_joint', title: 'Costovertebral or costotransverse', text: 'Both are synovial joints of a rib, one behind the other. The costovertebral joint is between the rib head and the vertebral bodies, with an intra-articular ligament to the disc. The costotransverse joint is between the rib tubercle and the transverse process of the same vertebra.' },
    'thorax-3': { a: 'intercostals_external', b: 'intercostals_internal', title: 'External or internal intercostal', text: 'They are the outer and middle sheets of each space, with fibres at right angles. External fibres run downward and forward and elevate the ribs in inspiration; internal fibres run downward and backward and depress the ribs in forced expiration. Innermost fibres follow the internal direction, deep to the vessel plane.' },
    'thorax-30l': { a: 'serratus_posterior_superior', b: 'serratus_posterior_inferior', title: 'Serratus posterior superior or inferior', text: 'Both are thin muscles of the back attached to the spines and the ribs. The superior arises from C7 to T3 and reaches ribs 2 to 5, elevating them; the inferior arises from T11 to L2 and reaches ribs 9 to 12, depressing them.' },
  },
  LEVEL_CHECK: {
    'thorax-1': [
      { q: 'Which ribs are true ribs?', options: ['Ribs 1 to 7', 'Ribs 1 to 10', 'Ribs 8 to 10', 'Ribs 11 and 12'], answer: 0, why: 'True ribs have their own costal cartilage reaching the sternum; these are ribs 1 to 7.', exam: true },
      { q: 'The sternal angle lies at which level?', options: ['T4/T5 disc', 'T2/T3 disc', 'T8', 'L1'], answer: 0, why: 'The manubriosternal joint forms the sternal angle at the level of the second costal cartilages and the T4/T5 disc.', exam: true },
      { q: 'Which part of a typical rib carries the intercostal vessels and nerve?', options: ['Costal groove', 'Head', 'Neck', 'Tubercle'], answer: 0, why: 'The costal groove runs along the lower inner border of the rib and holds the intercostal vein, artery and nerve.', exam: true },
      { q: 'Which ribs are floating ribs?', options: ['Ribs 11 and 12', 'Ribs 8 to 10', 'Ribs 1 and 2', 'Ribs 5 to 7'], answer: 0, why: 'Ribs 11 and 12 have no anterior costal cartilage attachment and end in the abdominal wall.', exam: true },
      { q: 'How many pairs of ribs are there?', options: ['Twelve', 'Ten', 'Seven', 'Fourteen'], answer: 0, why: 'There are twelve pairs: seven true, three false and two floating.', exam: true },
    ],
    'thorax-2': [
      { q: 'Which bony surfaces articulate with the head of a typical rib?', options: ['Demifacets on two adjacent vertebral bodies', 'One vertebral body only', 'The transverse process only', 'The sternum'], answer: 0, why: 'Its two facets meet the demifacets of the corresponding vertebra and the vertebra above. Its crest attaches to the disc by the intra-articular ligament.', exam: true },
      { q: 'Which joint is a synchondrosis with no movement?', options: ['Costochondral joint', 'Sternocostal joint of rib 2', 'Costovertebral joint', 'Costotransverse joint'], answer: 0, why: 'The costochondral junction is a primary cartilaginous joint with no capsule or cavity, so it does not move.', exam: true },
      { q: 'Which ribs lack a costotransverse joint?', options: ['Ribs 11 and 12', 'Ribs 1 and 2', 'Ribs 8 to 10', 'Ribs 5 to 7'], answer: 0, why: 'Ribs 11 and 12 have no tubercle articulating with a transverse process, so they have no costotransverse joint.', exam: true },
      { q: 'The manubriosternal joint is what kind of joint?', options: ['Symphysis', 'Synchondrosis', 'Plane synovial', 'Ball and socket'], answer: 0, why: 'It is a secondary cartilaginous joint, a symphysis, between the manubrium and the body of the sternum.', exam: true },
      { q: 'Which ligament reinforces the sternocostal joints?', options: ['Radiate sternocostal ligament', 'Supraspinous ligament', 'Ligamentum flavum', 'Costotransverse ligament'], answer: 0, why: 'Radiate sternocostal ligaments fan from each costal cartilage onto the front and back of the sternum.', exam: true },
    ],
    'thorax-3': [
      { q: 'Which intercostal layer elevates the ribs in inspiration?', options: ['External intercostal', 'Internal intercostal', 'Innermost intercostal', 'Transversus thoracis'], answer: 0, why: 'External intercostal fibres run downward and forward, so contraction raises the ribs.', exam: true },
      { q: 'Which nerve supplies the diaphragm?', options: ['Phrenic nerve', 'Intercostal nerves', 'Vagus nerve', 'Spinal accessory nerve'], answer: 0, why: 'The phrenic nerve (C3, C4, C5) provides the motor supply to the diaphragm.', exam: true },
      { q: 'Which structure passes through the diaphragm at T10?', options: ['Esophagus', 'Inferior vena cava', 'Aorta', 'Thoracic duct'], answer: 0, why: 'The esophagus and vagal trunks pass through the esophageal hiatus at T10; the vena cava is at T8 and the aorta at T12.', exam: true },
      { q: 'Which muscle lies deep to latissimus dorsi and attaches to ribs 9–12?', options: ['Serratus posterior inferior', 'Serratus posterior superior', 'Levatores costarum', 'Diaphragm'], answer: 0, why: 'Serratus posterior inferior spans the thoracolumbar fascia and lower ribs. Its supply comes from anterior rami T9–T12.', exam: true },
      { q: 'The innermost intercostal muscle lies deep to which plane?', options: ['The intercostal vessels and nerve', 'The endothoracic fascia', 'The parietal pleura', 'The external intercostal'], answer: 0, why: 'The neurovascular plane lies between the internal and innermost intercostal layers, so the innermost layer is deep to it.', exam: true },
      { q: 'Which muscle arises from the transverse processes of C7 to T11 and inserts on the rib below?', options: ['Levatores costarum', 'Serratus posterior superior', 'Transversus thoracis', 'External intercostal'], answer: 0, why: 'Levatores costarum arise from those transverse processes and pass to the posterior surface of the rib below.', exam: true },
    ],
    'thorax-30l': [
      { q: 'Where does the diaphragm insert?', options: ['Central tendon', 'Xiphoid process', 'First rib', 'Lumbar vertebrae'], answer: 0, why: 'The muscle fibres of the diaphragm converge on the central tendon, which is not a bony insertion.', exam: true },
      { q: 'Which muscle arises from the nuchal ligament and the spinous processes of C7 to T3?', options: ['Serratus posterior superior', 'Serratus posterior inferior', 'Levatores costarum', 'Transversus thoracis'], answer: 0, why: 'Serratus posterior superior arises from the nuchal ligament and C7 to T3 and inserts on ribs 2 to 5.', exam: true },
      { q: 'Where does transversus thoracis insert?', options: ['Inner surfaces of costal cartilages 2 to 6', 'Upper borders of ribs 2 to 5', 'Lower borders of ribs 9 to 12', 'Central tendon'], answer: 0, why: 'Transversus thoracis runs from the lower sternum and xiphoid to the inner surfaces of costal cartilages 2 to 6.', exam: true },
      { q: 'Where does serratus posterior inferior arise?', options: ['Spinous processes of T11 to L2', 'Spinous processes of C7 to T3', 'Transverse processes of C7 to T11', 'Lower six costal cartilages'], answer: 0, why: 'It arises from the spinous processes of T11 to L2 through the thoracolumbar fascia and inserts on ribs 9 to 12.', exam: true },
      { q: 'Which of these is part of the origin of the diaphragm?', options: ['Lower six costal cartilages', 'First rib', 'Manubrium', 'Clavicle'], answer: 0, why: 'The costal part of the diaphragm arises from the inner surfaces of the lower six costal cartilages and adjacent ribs.', exam: true },
    ],
  },
};

export const viewHints = {
  post: ['ribs', 'levatores_costarum', 'serratus_posterior_superior', 'serratus_posterior_inferior'],
  sup: ['sternum', 'costal_cartilages', 'ribs'],
};
