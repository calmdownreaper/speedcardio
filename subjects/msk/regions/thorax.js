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
    S('ribs', 'Ribs', 'Ribs', ['rib', 'rib bones', 'costae'], 'Twelve curved bones with a costal groove', [
      'Twelve pairs; ribs 1 to 7 are true, 8 to 10 false, and 11 and 12 floating.',
      'A typical rib has a head, neck, tubercle, angle and a costal groove along its lower inner border.',
      'The first rib is broad and flat, with grooves for the subclavian artery and vein.',
    ]),
    S('costal_cartilages', 'Costal cartilages', 'Costal cartilages', ['costal cartilage', 'rib cartilages', 'costal cartilage bars'], 'Hyaline bars between the ribs and the breastbone', [
      'Hyaline cartilage bars that continue each rib toward the sternum.',
      'They add elasticity to the chest wall and calcify with age.',
      'Cartilages 1 to 7 reach the sternum; 8 to 10 join the cartilage above; 11 and 12 end free.',
    ]),
    S('costovertebral_joint', 'Costovertebral joint', 'Costovertebral joint', ['costovertebral joints', 'joint of the head of the rib', 'costovertebral articulation'], 'Rib head to two vertebral bodies', [
      'A synovial joint between the head of a rib and the demifacets of two adjacent vertebral bodies.',
      'The intra-articular ligament binds the rib head to the disc; the radiate ligament reinforces the capsule.',
      'Ribs 1, 10, 11 and 12 articulate with a single vertebral body.',
    ]),
    S('costotransverse_joint', 'Costotransverse joint', 'Costotransverse joint', ['costotransverse joints', 'costotransverse articulation'], 'Rib tubercle to the transverse process', [
      'A plane synovial joint between the tubercle of a rib and the transverse process of its own vertebra.',
      'It is reinforced by the costotransverse and lateral costotransverse ligaments.',
      'Ribs 11 and 12 lack a costotransverse joint.',
    ]),
    S('costochondral_joint', 'Costochondral joint', 'Costochondral joint', ['costochondral joints', 'costochondral junction', 'costochondral articulation'], 'Bony rib to its cartilage, immobile', [
      'A synchondrosis between the bony rib and its costal cartilage.',
      'It is immobile and has no capsule or synovial cavity.',
      'It is a common site of tenderness in chest wall pain.',
    ]),
    S('sternocostal_joint', 'Sternocostal joint', 'Sternocostal joint', ['sternocostal joints', 'sternocostal articulation'], 'Cartilage to breastbone', [
      'The first rib joins the manubrium by a synchondrosis.',
      'Ribs 2 to 7 form plane synovial joints with the sternum, reinforced by radiate sternocostal ligaments.',
      'Rib 8 and often 9 and 10 join the costal cartilage above at interchondral joints.',
    ]),
    S('manubriosternal_joint', 'Manubriosternal joint', 'Manubriosternal joint', ['manubriosternal symphysis', 'sternal angle joint', 'angle of Louis joint'], 'Symphysis that forms the sternal angle', [
      'A secondary cartilaginous joint, a symphysis, between the manubrium and the body of the sternum.',
      'It forms the sternal angle, felt at the level of the second costal cartilages and the T4/T5 disc.',
      'It permits slight movement during respiration and may ossify with age.',
    ]),
    S('xiphisternal_joint', 'Xiphisternal joint', 'Xiphisternal joint', ['xiphisternal synchondrosis', 'xiphisternal articulation'], 'Synchondrosis at the lower breastbone', [
      'A synchondrosis between the body of the sternum and the xiphoid process.',
      'It lies at the level of T9 and often ossifies in adult life.',
      'The xiphoid gives attachment to the diaphragm and the rectus abdominis.',
    ]),
    S('radiate_sternocostal_ligament', 'Radiate sternocostal ligament', 'Radiate sternocostal ligament', ['radiate sternocostal ligaments', 'sternocostal radiate ligament'], 'Bands fanning onto the breastbone', [
      'Fibrous bands that radiate from the sternal end of a costal cartilage to the front and back of the sternum.',
      'They blend with the capsules of the sternocostal joints.',
      'The anterior bands are stronger than the posterior ones.',
    ]),
    S('intercostals_external', 'External intercostal', 'External intercostal', ['external intercostal muscle', 'external intercostals', 'intercostalis externus'], 'Outer layer, fibres down and forward', [
      'Origin: lower border of the rib above. Insertion: upper border of the rib below.',
      'Nerve: intercostal nerves (anterior rami of T1 to T11).',
      'Fibres run downward and forward and elevate the ribs in inspiration.',
    ]),
    S('intercostals_internal', 'Internal intercostal', 'Internal intercostal', ['internal intercostal muscle', 'internal intercostals', 'intercostalis internus'], 'Middle layer, fibres down and backward', [
      'Origin: floor of the costal groove of the rib above. Insertion: upper border of the rib below.',
      'Nerve: intercostal nerves (anterior rami of T1 to T11).',
      'Fibres run downward and backward and depress the ribs in forced expiration.',
    ]),
    S('intercostals_innermost', 'Innermost intercostal', 'Innermost intercostal', ['innermost intercostal muscle', 'innermost intercostals', 'intercostalis intimus'], 'Deepest layer, deep to the vessel plane', [
      'Origin: medial edge of the costal groove. Insertion: inner surface of the rib below.',
      'Nerve: intercostal nerves (anterior rami of T1 to T11).',
      'It is the deepest layer, separated from the internal intercostals by the intercostal vessels and nerve, and it depresses the ribs.',
    ]),
    S('diaphragm', 'Diaphragm', 'Diaphragm', ['diaphragm muscle', 'thoracic diaphragm', 'phrenic muscle'], 'Dome between chest and abdomen', [
      'Origin: xiphoid, lower six costal cartilages, and crura from L1 to L3. Insertion: central tendon.',
      'Nerve: phrenic nerve (C3, C4, C5) for motor supply.',
      'It is the main muscle of inspiration; the right dome sits higher than the left. The vena cava crosses at T8, the esophagus at T10 and the aorta at T12.',
    ]),
    S('transversus_thoracis', 'Transversus thoracis', 'Transversus thoracis', ['transversus thoracis muscle', 'transversus thoracis sternocostalis'], 'Thin muscle inside the front chest wall', [
      'Origin: posterior surface of the lower sternum and xiphoid process. Insertion: inner surfaces of costal cartilages 2 to 6.',
      'Nerve: intercostal nerves (anterior rami of T2 to T6).',
      'Depresses the ribs and stabilizes the anterior chest wall.',
    ]),
    S('serratus_posterior_superior', 'Serratus posterior superior', 'Serratus posterior superior', ['serratus posterior superior muscle', 'posterior superior serratus'], 'Lower neck spines to upper ribs', [
      'Origin: nuchal ligament and spinous processes of C7 to T3. Insertion: upper borders of ribs 2 to 5.',
      'Nerve: intercostal nerves (anterior rami of T2 to T5).',
      'Elevates the upper ribs in inspiration.',
    ]),
    S('serratus_posterior_inferior', 'Serratus posterior inferior', 'Serratus posterior inferior', ['serratus posterior inferior muscle'], 'Lower thoracic spines to lower ribs', [
      'Origin: spinous processes of T11 to L2 through the thoracolumbar fascia. Insertion: lower borders of ribs 9 to 12.',
      'Nerve: intercostal nerves (anterior rami of T9 to T12).',
      'Depresses the lower ribs in expiration and resists the pull of the diaphragm.',
    ]),
    S('levatores_costarum', 'Levatores costarum', 'Levatores costarum', ['levator costarum', 'levatores costarum breves', 'levatores costarum longi'], 'Small fans from transverse processes to ribs', [
      'Origin: transverse processes of C7 and T1 to T11. Insertion: posterior surface of the rib below, or the second rib below for the longi.',
      'Nerve: posterior rami of the thoracic spinal nerves.',
      'Elevates the ribs in inspiration and assists lateral flexion of the thoracic spine.',
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
  costovertebral_joint: [[31.8, 39.3, 1327.6], [-30.5, 39.3, 1327.6]],
  costotransverse_joint: [[57.8, 54.7, 1327.6], [-56.4, 54.7, 1327.6]],
  costochondral_joint: [[57.8, -64.5, 1295.3], [-56.4, -64.5, 1295.3]],
  sternocostal_joint: [[26.9, -88.0, 1318.6], [-26.9, -88.0, 1318.6]],
  manubriosternal_joint: [-0.0, -86.1, 1341.3],
  xiphisternal_joint: [-0.0, -102.6, 1220.9],
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

export const purpose = 'The bony cage, the joints that let it move, and the muscles that inflate it.';

export const overview = 'The thorax is a flexible cage of bone and cartilage around the heart and lungs. The sternum closes it in front, the ribs and costal cartilages form the sides, and the thoracic vertebrae form the back. Its joints allow the ribs to rise and swing out during inspiration, and its muscles and diaphragm drive the movement. This region follows the cage bones first, then the joints and ligaments, then the wall and diaphragm muscles.';

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
    lead: 'The **costovertebral joint** is the synovial joint between the head of a rib and the vertebral bodies.',
    where: 'A typical rib head has two facets that meet the demifacets of two adjacent vertebral bodies and the disc between them.',
    relations: 'The intra-articular ligament attaches the crest of the rib head to the disc. The radiate ligament fans from the head to the bodies and disc, and the costotransverse joint lies just lateral.',
    function: 'It allows the rib head to rotate and glide, so the rib can rise and swing out during inspiration.',
    clinical: 'Its arthritis causes chest wall pain, and the joint is a landmark for thoracic facet interventions.',
  },
  costotransverse_joint: {
    lead: 'The **costotransverse joint** is the plane synovial joint between a rib tubercle and the transverse process of its own vertebra.',
    where: 'It lies just lateral to the costovertebral joint, between the tubercle of the rib and the costal facet of the transverse process.',
    relations: 'The costotransverse ligament binds the neck of the rib to the transverse process; the lateral costotransverse ligament runs from the tubercle to the transverse process tip. Ribs 11 and 12 have no such joint.',
    function: 'It acts as a pivot for the rib during breathing, guiding the bucket-handle and pump-handle movements.',
    clinical: 'It is a target of thoracic facet and costotransverse joint injections for chest wall pain.',
  },
  costochondral_joint: {
    lead: 'The **costochondral joint** is the immobile junction between a rib and its costal cartilage.',
    where: 'It lies at the lateral end of each costal cartilage, where the bony rib begins.',
    relations: 'It is a primary cartilaginous joint with no capsule or synovial cavity. The perichondrium blends with the periosteum at the junction.',
    function: 'It anchors the cartilage to the rib and transmits the movement of the chest wall to the cartilage.',
    clinical: 'The junction is a classic site of tenderness in costochondritis, and swelling there suggests Tietze syndrome.',
  },
  sternocostal_joint: {
    lead: 'The **sternocostal joint** is the joint between a costal cartilage and the sternum.',
    where: 'The first rib joins the manubrium by a synchondrosis; ribs 2 to 7 form plane synovial joints along the sides of the manubrium and body.',
    relations: 'Radiate sternocostal ligaments reinforce the capsules, and an intra-articular ligament may divide the cavity. The internal thoracic vessels lie behind.',
    function: 'It allows small gliding movements of the cartilages on the sternum during respiration.',
    clinical: 'The second costal cartilage at the sternal angle is the key surface landmark for counting ribs.',
  },
  manubriosternal_joint: {
    lead: 'The **manubriosternal joint** is the symphysis between the manubrium and the body of the sternum.',
    where: 'It forms the sternal angle, the ridge felt about 5 cm below the jugular notch.',
    relations: 'It lies at the level of the second costal cartilages and the T4/T5 intervertebral disc. The aortic arch begins and ends at this level, and the trachea bifurcates here.',
    function: 'It allows slight movement during respiration and contributes to the pump-handle motion of the upper chest.',
    clinical: 'The sternal angle is the starting point for counting ribs and for identifying the level of the tracheal bifurcation.',
  },
  xiphisternal_joint: {
    lead: 'The **xiphisternal joint** is the synchondrosis between the body of the sternum and the xiphoid process.',
    where: 'It lies at the lower end of the sternum, at the level of T9, in the epigastric region.',
    relations: 'The diaphragm and the rectus abdominis attach to the xiphoid. The heart lies above and behind it.',
    function: 'It allows slight movement of the xiphoid and gives attachment to the diaphragm.',
    clinical: 'The xiphoid can be mistaken for an epigastric mass; it ossifies with age and may be fractured in blunt trauma.',
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
    where: 'It runs from the lower border of the rib above to the upper border of the rib below, with fibres directed downward and forward. It reaches from the rib tubercle back to the costochondral junction, where it becomes the anterior intercostal membrane.',
    relations: 'It lies superficial to the internal intercostal, separated from it by a thin layer of loose tissue. The intercostal vessels and nerve lie deep to the internal layer.',
    function: 'Elevates the ribs in inspiration and supports the intercostal space. Nerve: intercostal nerves (anterior rami of T1 to T11).',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'lower border of the rib above',
    insertion: 'upper border of the rib below',
    clinical: 'The intercostal muscles are paralysed in high spinal cord injury, which reduces rib cage expansion.',
  },
  intercostals_internal: {
    lead: 'The **internal intercostal** is the middle sheet of the intercostal muscles.',
    where: 'It runs from the floor of the costal groove of the rib above to the upper border of the rib below, with fibres directed downward and backward. It spans from the sternum to the angle of the rib, where it becomes the posterior intercostal membrane.',
    relations: 'It lies between the external and innermost layers. The intercostal vessels and nerve run in the plane between it and the innermost layer.',
    function: 'Depresses the ribs in forced expiration and supports the intercostal space. Nerve: intercostal nerves.',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'floor of the costal groove of the rib above',
    insertion: 'upper border of the rib below',
  },
  intercostals_innermost: {
    lead: 'The **innermost intercostal** is the deepest, incomplete sheet of the intercostal muscles.',
    where: 'Its fibres run in the same direction as the internal intercostals, from the medial edge of the costal groove to the inner surface of the rib below, in the midportion of each space.',
    relations: 'It is separated from the internal intercostal by the intercostal vessels and nerve, and from the pleura by the endothoracic fascia. It is continuous with transversus thoracis in front and with the subcostales behind.',
    function: 'Depresses the ribs and stabilizes the chest wall. Nerve: intercostal nerves.',
    nerve: 'intercostal nerves (anterior rami of T1 to T11)',
    origin: 'medial edge of the costal groove',
    insertion: 'inner surface of the rib below',
  },
  diaphragm: {
    lead: 'The **diaphragm** is the dome-shaped muscle that separates the thorax from the abdomen and drives breathing.',
    where: 'Its fibres arise from the xiphoid process, the lower six costal cartilages and ribs, and the crura attached to the upper lumbar vertebrae, and converge on the central tendon. The right dome is higher than the left because of the liver.',
    relations: 'It is pierced by the inferior vena cava at T8, the esophagus at T10 and the aorta at T12. The phrenic nerves run on its upper surface, and the pleura and pericardium lie above it.',
    function: 'It is the principal muscle of inspiration: contraction flattens the domes and lowers the pressure in the thorax. Nerve: phrenic nerve (C3, C4, C5) for motor supply, with sensory fibres from the lower intercostal nerves at the periphery.',
    nerve: 'phrenic nerve (C3, C4, C5)',
    origin: 'xiphoid process, lower six costal cartilages, and crura from L1 to L3',
    insertion: 'central tendon',
    clinical: 'Paralysis of one half, after phrenic nerve injury, is seen as paradoxical elevation of that dome on inspiration. A posterolateral defect is a Bochdalek hernia; an anterior defect is a Morgagni hernia.',
  },
  transversus_thoracis: {
    lead: 'The **transversus thoracis** is a thin muscle on the inner front of the chest wall.',
    where: 'It arises from the posterior surface of the lower sternum and xiphoid and spreads upward and laterally to the inner surfaces of the costal cartilages 2 to 6.',
    relations: 'It lies deep to the internal thoracic vessels and the pleura, and is continuous with the innermost intercostal layer. It is also called the sternocostalis.',
    function: 'Depresses the ribs in expiration and stabilizes the anterior chest wall. Nerve: intercostal nerves (anterior rami of T2 to T6).',
    nerve: 'intercostal nerves (anterior rami of T2 to T6)',
    origin: 'posterior surface of the lower sternum and xiphoid process',
    insertion: 'inner surfaces of costal cartilages 2 to 6',
  },
  serratus_posterior_superior: {
    lead: 'The **serratus posterior superior** is a thin muscle deep to the shoulder blade on the upper back.',
    where: 'It arises from the nuchal ligament and the spinous processes of C7 to T3 and runs down and laterally to the upper borders of ribs 2 to 5.',
    relations: 'It lies deep to the rhomboids and superficial to the erector spinae. The posterior rami and posterior intercostal vessels pass around it.',
    function: 'Elevates ribs 2 to 5 in inspiration. Nerve: intercostal nerves (anterior rami of T2 to T5).',
    nerve: 'intercostal nerves (anterior rami of T2 to T5)',
    origin: 'nuchal ligament and spinous processes of C7 to T3',
    insertion: 'upper borders and external surfaces of ribs 2 to 5',
    clinical: 'It is a source of upper back pain and is needled in myofascial pain of the rhomboid region.',
  },
  serratus_posterior_inferior: {
    lead: 'The **serratus posterior inferior** is a thin muscle across the lower back, deep to latissimus dorsi.',
    where: 'It arises from the spinous processes of T11 to L2 through the thoracolumbar fascia and runs up and laterally to the lower borders of ribs 9 to 12.',
    relations: 'It lies deep to latissimus dorsi and superficial to the erector spinae and quadratus lumborum. The subcostal vessels and nerve pass near its lower border.',
    function: 'Depresses the lower ribs in expiration and resists the upward pull of the diaphragm. Nerve: intercostal nerves (anterior rami of T9 to T12).',
    nerve: 'intercostal nerves (anterior rami of T9 to T12)',
    origin: 'spinous processes of T11 to L2 through the thoracolumbar fascia',
    insertion: 'lower borders and external surfaces of ribs 9 to 12',
  },
  levatores_costarum: {
    lead: 'The **levatores costarum** are small fan-shaped muscles between the transverse processes and the ribs.',
    where: 'Twelve pairs arise from the transverse processes of C7 and T1 to T11 and pass down and laterally to the rib below. The longi skip one rib and reach the second rib below.',
    relations: 'They lie deep to the erector spinae, in the same plane as the rotatores. The posterior rami of the thoracic nerves supply them.',
    function: 'Elevate the ribs in inspiration and assist lateral flexion of the thoracic spine. Nerve: posterior rami of the thoracic spinal nerves.',
    nerve: 'posterior rami of the thoracic spinal nerves',
    origin: 'transverse processes of C7 and T1 to T11',
    insertion: 'posterior surface of the rib below, or the second rib below for the longi',
  },
};

export const lessonCues = {
  sternum: 'Midline plate of manubrium, body and xiphoid',
  ribs: 'Twelve curved bones with a costal groove',
  costal_cartilages: 'Hyaline bars from ribs to sternum',
  costovertebral_joint: 'Rib head to the vertebral bodies',
  costotransverse_joint: 'Rib tubercle to the transverse process',
  costochondral_joint: 'Rib to cartilage, no movement',
  sternocostal_joint: 'Costal cartilage to the sternum',
  manubriosternal_joint: 'Symphysis at the sternal angle',
  xiphisternal_joint: 'Synchondrosis at the lower sternum',
  radiate_sternocostal_ligament: 'Fibrous fans over the sternocostal joints',
  intercostals_external: 'Outer layer, elevates the ribs',
  intercostals_internal: 'Middle layer, depresses the ribs',
  intercostals_innermost: 'Deepest incomplete layer under the vessels',
  diaphragm: 'Dome with three hiatuses',
  transversus_thoracis: 'Thin muscle on the inner sternum',
  serratus_posterior_superior: 'Upper back muscle to ribs 2 to 5',
  serratus_posterior_inferior: 'Lower back muscle to ribs 9 to 12',
  levatores_costarum: 'Small fans from transverse processes to ribs',
};

export const roundClues = {
  sternum: 'The flat midline bone of the front of the chest, with three parts.',
  ribs: 'The curved bones that form the cage and carry a groove for the intercostal vessels.',
  costal_cartilages: 'The hyaline bars that continue the ribs to the breastbone.',
  costovertebral_joint: 'The joint between the head of a rib and the vertebral bodies.',
  costotransverse_joint: 'The joint between the tubercle of a rib and the transverse process.',
  costochondral_joint: 'The immobile junction where the bony rib meets its cartilage.',
  sternocostal_joint: 'The joint between a costal cartilage and the breastbone.',
  manubriosternal_joint: 'The symphysis that forms the angle of Louis.',
  xiphisternal_joint: 'The synchondrosis at the lower end of the breastbone.',
  radiate_sternocostal_ligament: 'The fibrous bands that fan from each costal cartilage onto the breastbone.',
  intercostals_external: 'The outer layer of the intercostal space, whose fibres run down and forward.',
  intercostals_internal: 'The middle layer of the intercostal space, whose fibres run down and backward.',
  intercostals_innermost: 'The deepest, incomplete layer, deep to the intercostal vessels and nerve.',
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
    'thorax-2': 'Each rib moves at three places: the costovertebral joint at its head, the costotransverse joint at its tubercle, and the costochondral junction where it meets cartilage. In front, the costal cartilages join the sternum at the sternocostal joints, reinforced by radiate ligaments, while the manubriosternal and xiphisternal joints let the sternum flex.',
    'thorax-3': 'Three layers of intercostal muscle fill each space: external fibres run down and forward and elevate the ribs, internal and innermost fibres run down and backward and depress them. The diaphragm is the main inspiratory muscle. The serratus posteriors and levatores costarum adjust the upper and lower ribs, while transversus thoracis stabilizes the front wall.',
    'thorax-30l': 'Bonus level: origins and insertions of the thoracic wall and diaphragm muscles. This is the 30L layer that turns a name into an exam answer. It is optional and does not block the next region.',
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
      { q: 'The head of a typical rib articulates with which structures?', options: ['Two vertebral bodies and the disc between them', 'One vertebral body only', 'The transverse process only', 'The sternum'], answer: 0, why: 'A typical rib head has two facets for the demifacets of adjacent bodies, with the intra-articular ligament attaching to the disc.', exam: true },
      { q: 'Which joint is a synchondrosis with no movement?', options: ['Costochondral joint', 'Sternocostal joint of rib 2', 'Costovertebral joint', 'Costotransverse joint'], answer: 0, why: 'The costochondral junction is a primary cartilaginous joint with no capsule or cavity, so it does not move.', exam: true },
      { q: 'Which ribs lack a costotransverse joint?', options: ['Ribs 11 and 12', 'Ribs 1 and 2', 'Ribs 8 to 10', 'Ribs 5 to 7'], answer: 0, why: 'Ribs 11 and 12 have no tubercle articulating with a transverse process, so they have no costotransverse joint.', exam: true },
      { q: 'The manubriosternal joint is what kind of joint?', options: ['Symphysis', 'Synchondrosis', 'Plane synovial', 'Ball and socket'], answer: 0, why: 'It is a secondary cartilaginous joint, a symphysis, between the manubrium and the body of the sternum.', exam: true },
      { q: 'Which ligament reinforces the sternocostal joints?', options: ['Radiate sternocostal ligament', 'Supraspinous ligament', 'Ligamentum flavum', 'Costotransverse ligament'], answer: 0, why: 'Radiate sternocostal ligaments fan from each costal cartilage onto the front and back of the sternum.', exam: true },
    ],
    'thorax-3': [
      { q: 'Which intercostal layer elevates the ribs in inspiration?', options: ['External intercostal', 'Internal intercostal', 'Innermost intercostal', 'Transversus thoracis'], answer: 0, why: 'External intercostal fibres run downward and forward, so contraction raises the ribs.', exam: true },
      { q: 'Which nerve supplies the diaphragm?', options: ['Phrenic nerve', 'Intercostal nerves', 'Vagus nerve', 'Spinal accessory nerve'], answer: 0, why: 'The phrenic nerve (C3, C4, C5) provides the motor supply to the diaphragm.', exam: true },
      { q: 'Which structure passes through the diaphragm at T10?', options: ['Esophagus', 'Inferior vena cava', 'Aorta', 'Thoracic duct'], answer: 0, why: 'The esophagus and vagal trunks pass through the esophageal hiatus at T10; the vena cava is at T8 and the aorta at T12.', exam: true },
      { q: 'Which muscle depresses the lower ribs and is supplied by T9 to T12?', options: ['Serratus posterior inferior', 'Serratus posterior superior', 'Levatores costarum', 'Diaphragm'], answer: 0, why: 'Serratus posterior inferior arises from T11 to L2 and is supplied by the anterior rami of T9 to T12.', exam: true },
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
