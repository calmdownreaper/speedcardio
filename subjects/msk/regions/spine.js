// SpeedMSK · Spine.
// Canonical answers avoid hyphens; hyphenated forms live in alt.
// Bones first, then joints and ligaments as markers, then the deep muscles,
// with a bonus 30L level for origins and insertions.

const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });

export const deck = {
  id: 'spine',
  titulo: 'Spine',
  cor: '#7e8ea4',
  ctx: ['thoracic_vertebra', 'lumbar_vertebra', 'sacrum'],
  itens: [
    S('atlas', 'Atlas', 'Atlas', ['C1', 'first cervical vertebra', 'atlas vertebra'], 'Ring-shaped first vertebra with no body', [
      'C1 has no body and no spinous process; it is a ring of anterior and posterior arches with two lateral masses.',
      'Its superior articular facets cup the occipital condyles; its inferior facets sit on the axis.',
      'The vertebral artery runs in a groove on the upper surface of its posterior arch.',
    ]),
    S('axis', 'Axis', 'Axis', ['C2', 'second cervical vertebra', 'axis vertebra', 'epistropheus'], 'Second vertebra, whose upward peg is the pivot for turning the head', [
      'C2 carries the dens (odontoid process), which projects up through the front of the atlas ring.',
      'Its large bifid spinous process is the first bony ridge felt below the skull.',
      'The transverse ligament of the atlas holds the dens against the anterior arch.',
    ]),
    S('cervical_vertebra', 'Cervical vertebra', 'Cervical vertebra', ['cervical vertebrae', 'typical cervical vertebra', 'C3 to C7', 'cervical spine vertebra'], 'Typical neck bones with foramina for a vertical artery', [
      'C3 to C7 have small bodies, bifid spinous processes and transverse foramina for the vertebral artery.',
      'C7 is the vertebra prominens, with a long non-bifid spinous process.',
      'Their facet joints are angled to allow free flexion, extension and rotation.',
    ]),
    S('thoracic_vertebra', 'Thoracic vertebra', 'Thoracic vertebra', ['thoracic vertebrae', 'typical thoracic vertebra', 'T1 to T12', 'dorsal vertebra'], 'Twelve bones of the upper back that carry the ribs', [
      'Twelve vertebrae with heart-shaped bodies and costal facets for the rib heads.',
      'T1 to T10 have facets on the transverse processes for the rib tubercles.',
      'Their long spinous processes overlap like roof tiles, pointing downward.',
    ]),
    S('lumbar_vertebra', 'Lumbar vertebra', 'Lumbar vertebra', ['lumbar vertebrae', 'typical lumbar vertebra', 'L1 to L5'], 'Five large weight-bearing bones of the lower back', [
      'Five large vertebrae with kidney-shaped bodies and short, stout spinous processes.',
      'Their facet joints are oriented sagittally, which favors flexion and extension and limits rotation.',
      'The lumbar canal is triangular; L5 is the largest and carries the greatest load.',
    ]),
    S('sacrum', 'Sacrum', 'Sacrum', ['sacral bone', 'sacral vertebrae', 'S1 to S5'], 'Fused wedge between the hip bones', [
      'Five fused vertebrae form a wedge between the ilia, with four pairs of sacral foramina.',
      'Its base carries the L5/S1 disc; its apex joins the coccyx.',
      'The sacral promontory and ala are key obstetric landmarks.',
    ]),
    S('iv_disc', 'Intervertebral disc', 'Intervertebral disc', ['intervertebral disk', 'IV disc', 'IVD', 'disc'], 'Fibrocartilage cushion between vertebral bodies', [
      'A fibrocartilaginous pad of annulus fibrosus around a gel-like nucleus pulposus.',
      'There are 23 discs, from C2/C3 to L5/S1; the atlas and axis have none between them.',
      'Posterolateral herniation is commonest at L4/L5 and L5/S1, where it can compress a nerve root.',
    ]),
    S('atlantooccipital_joint', 'Atlantooccipital joint', 'Atlantooccipital joint', ['atlanto occipital joint', 'atlanto-occipital joint', 'C0 C1 joint'], 'Nodding joint at the base of the skull', [
      'A synovial ellipsoid joint between the occipital condyles and the superior facets of the atlas.',
      'It produces most of the nodding yes movement of the head.',
      'The vertebral arteries pass over the posterior arch just below it.',
    ]),
    S('atlantoaxial_joint', 'Atlantoaxial joint', 'Atlantoaxial joint', ['atlanto axial joint', 'atlanto-axial joint', 'C1 C2 joint'], 'Three joints that let the head turn', [
      'Three synovial joints: one median between the dens and the anterior arch, and two lateral between the articular facets.',
      'It provides about half of the rotation of the head, the no movement.',
      'The transverse ligament of the atlas holds the dens; the alar ligaments limit rotation.',
    ]),
    S('zygapophyseal_joint', 'Zygapophyseal joint', 'Zygapophyseal joint', ['facet joint', 'zygapophysial joint', 'facet joints'], 'Plane joint between the articular processes of adjacent vertebrae', [
      'A plane synovial joint between the inferior and superior articular processes of adjacent vertebrae.',
      'Its capsular ligaments are loose, allowing gliding that follows the orientation of the facets.',
      'Facet joints carry part of the axial load and are a common source of low back pain.',
    ]),
    S('anterior_longitudinal_ligament', 'Anterior longitudinal ligament', 'Anterior longitudinal ligament', ['anterior longitudinal ligament of the spine', 'ALL'], 'Broad band on the front of the vertebral bodies', [
      'A strong band on the anterior surfaces of the vertebral bodies, from the atlas to the sacrum.',
      'It blends with the annulus and limits extension of the spine.',
      'It is torn in severe hyperextension injuries.',
    ]),
    S('posterior_longitudinal_ligament', 'Posterior longitudinal ligament', 'Posterior longitudinal ligament', ['posterior longitudinal ligament of the spine', 'PLL'], 'Narrow band inside the canal, behind the bodies', [
      'Runs inside the vertebral canal on the posterior surfaces of the bodies, from the axis to the sacrum.',
      'It is narrow at disc levels and limits flexion.',
      'It is the last barrier a posterolateral disc herniation must cross.',
    ]),
    S('ligamentum_flavum', 'Ligamentum flavum', 'Ligamentum flavum', ['ligamenta flava', 'flaval ligament', 'yellow ligament'], 'Yellow elastic tissue between the laminae', [
      'Elastic yellow ligaments joining the laminae of adjacent vertebrae.',
      'They form the posterior wall of the vertebral canal and limit flexion.',
      'They are thickest in the lumbar region and can hypertrophy in stenosis.',
    ]),
    S('supraspinous_ligament', 'Supraspinous ligament', 'Supraspinous ligament', ['supraspinous ligament of the spine'], 'Cord along the tips of the spines', [
      'A cord along the tips of the spinous processes from C7 to the sacrum.',
      'It continues above as the nuchal ligament.',
      'It resists forward flexion of the spine.',
    ]),
    S('nuchal_ligament', 'Nuchal ligament', 'Nuchal ligament', ['ligamentum nuchae', 'nuchal ligament of the neck'], 'Elastic midline sheet at the back of the neck', [
      'A triangular elastic sheet from the external occipital protuberance to the spinous process of C7.',
      'It replaces the supraspinous ligament in the neck and gives attachment to trapezius and splenius.',
      'It limits flexion of the head and neck.',
    ]),
    S('iliocostalis', 'Iliocostalis', 'Iliocostalis', ['iliocostalis muscle', 'erector spinae iliocostalis', 'iliocostalis lumborum'], 'Lateral column of the erector spinae', [
      'Origin: common tendon from the sacrum, iliac crest and lower lumbar spinous processes. Insertion: angles of the ribs and cervical transverse processes.',
      'Nerve: posterior rami of the spinal nerves.',
      'Extends and laterally flexes the spine; the cervicis part extends the neck.',
    ]),
    S('longissimus', 'Longissimus', 'Longissimus', ['longissimus muscle', 'erector spinae longissimus', 'longissimus thoracis'], 'Middle and longest column of the erector spinae', [
      'Origin: common tendon and transverse processes. Insertion: transverse processes of the thoracic and cervical vertebrae, and the mastoid process for the capitis part.',
      'Nerve: posterior rami of the spinal nerves.',
      'Extends and laterally flexes the spine; the capitis part extends the head and turns the face to the same side.',
    ]),
    S('spinalis', 'Spinalis', 'Spinalis', ['spinalis muscle', 'erector spinae spinalis', 'spinalis thoracis'], 'Medial column of the erector spinae, near the spines', [
      'Origin: spinous processes of the lower thoracic and upper lumbar vertebrae. Insertion: spinous processes of the upper thoracic and cervical vertebrae.',
      'Nerve: posterior rami of the spinal nerves.',
      'Extends the vertebral column and is the medial column of the erector spinae.',
    ]),
    S('semispinalis', 'Semispinalis', 'Semispinalis', ['semispinalis muscle', 'semispinalis capitis', 'semispinalis cervicis', 'semispinalis thoracis'], 'Muscle whose fibres cross several levels to the occiput', [
      'Origin: transverse processes of the thoracic and lower cervical vertebrae. Insertion: spinous processes 4 to 6 levels above, and the occipital bone for the capitis part.',
      'Nerve: posterior rami of the cervical and thoracic spinal nerves.',
      'Extends the spine; semispinalis capitis extends the head and turns the face to the opposite side.',
    ]),
    S('splenius_capitis', 'Splenius capitis', 'Splenius capitis', ['splenius capitis muscle', 'splenius muscle of the head'], 'Broad neck muscle that turns the face to its own side', [
      'Origin: lower half of the nuchal ligament and the spinous processes of C7 to T3 or T4.',
      'Insertion: mastoid process and lateral third of the superior nuchal line.',
      'Nerve: posterior rami of C3 and C4. Extends the head and turns the face to the same side.',
    ]),
    S('rectus_capitis_posterior_major', 'Rectus capitis posterior major', 'Rectus capitis posterior major', ['rectus capitis posterior major muscle', 'RCP major'], 'Short suboccipital muscle from the axis to the skull', [
      'Origin: spinous process of the axis. Insertion: lateral part of the inferior nuchal line of the occipital bone.',
      'Nerve: posterior ramus of C1, the suboccipital nerve.',
      'Extends the head and turns the face to the same side; it forms the upper medial border of the suboccipital triangle.',
    ]),
    S('longus_colli', 'Longus colli', 'Longus colli', ['longus colli muscle', 'long muscle of the neck'], 'Prevertebral muscle on the front of the neck bones', [
      'Origin: bodies of C5 to T3 and their transverse processes. Insertion: anterior arch of the atlas, and bodies of C2 to C4.',
      'Nerve: anterior rami of C2 to C6.',
      'Flexes the neck and slightly laterally flexes it; it lies on the front of the cervical bodies.',
    ]),
    S('scalenus_anterior', 'Scalenus anterior', 'Scalenus anterior', ['anterior scalene', 'scalenus anterior muscle', 'anterior scalene muscle'], 'Key muscle of the thoracic inlet, with the phrenic nerve on it', [
      'Origin: anterior tubercles of the transverse processes of C3 to C6. Insertion: scalene tubercle of the first rib.',
      'Nerve: anterior rami of C4 to C6.',
      'Elevates the first rib in inspiration and laterally flexes the neck; the phrenic nerve runs on its anterior surface.',
    ]),
  ],
};

export const region = { id: 'spine', title: 'Spine', area: 'Spine' };

export const levels = [
  { title: 'Vertebral column bones', ids: ['atlas', 'axis', 'cervical_vertebra', 'thoracic_vertebra', 'lumbar_vertebra', 'sacrum', 'iv_disc'] },
  { title: 'Craniovertebral and facet joints with ligaments', ids: ['atlantooccipital_joint', 'atlantoaxial_joint', 'zygapophyseal_joint', 'anterior_longitudinal_ligament', 'posterior_longitudinal_ligament', 'ligamentum_flavum', 'supraspinous_ligament', 'nuchal_ligament'] },
  { title: 'Deep back and neck muscles', ids: ['iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior'] },
  { title: '30L origins and insertions', bonus: true, ids: ['iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'splenius_capitis', 'rectus_capitis_posterior_major', 'longus_colli', 'scalenus_anterior'] },
];

export const colors = {
  atlas: '#cfd9e5', axis: '#cad4e1', cervical_vertebra: '#c4cfdd', thoracic_vertebra: '#bfcad9',
  lumbar_vertebra: '#bac6d6', sacrum: '#b3c0d1', iv_disc: '#d9c9a6',
  atlantooccipital_joint: '#d8ab52', atlantoaxial_joint: '#d8ab52', zygapophyseal_joint: '#d3a54c',
  anterior_longitudinal_ligament: '#cfa052', posterior_longitudinal_ligament: '#c69a4e',
  ligamentum_flavum: '#c9a94e', supraspinous_ligament: '#c69a4e', nuchal_ligament: '#c9a94e',
  iliocostalis: '#a85248', longissimus: '#b05a4c', spinalis: '#9d4a43', semispinalis: '#b46252',
  splenius_capitis: '#c06a56', rectus_capitis_posterior_major: '#a9554a', longus_colli: '#b26753', scalenus_anterior: '#bd7059',
};

export const markers = {
  atlantooccipital_joint: [[19.6, 22.3, 1551.5], [-19.6, 22.3, 1551.5]],
  atlantoaxial_joint: [[25.1, 13.6, 1533.3], [-25.1, 13.6, 1533.3]],
  zygapophyseal_joint: [[25.3, 44.3, 1003.2], [-25.3, 44.3, 1003.2]],
};

// Anchor bones for each point marker and the view that shows it best.
export const markerMeta = {
  atlantooccipital_joint: { anchors: ['occipital', 'atlas'], view: 'post' },
  atlantoaxial_joint: { anchors: ['atlas', 'axis'], view: 'post' },
  zygapophyseal_joint: { anchors: ['thoracic_vertebra', 'lumbar_vertebra'], view: 'post' },
};

export const purpose = 'Vertebrae, discs, joints and ligaments of the column, then the deep muscles that hold the head and trunk upright.';

export const overview = 'The vertebral column runs from the skull to the pelvis and is built for support, protection and movement. Cervical vertebrae carry the head and give the neck its range; thoracic vertebrae anchor the ribs; lumbar vertebrae carry the load. Between the bones sit the discs, the joints and the ligaments, and behind them the deep muscles that extend and rotate the trunk. This region follows the bones first, then the craniovertebral and facet joints with their ligaments, then the deep back and neck muscles.';

export const lessons = {
  atlas: {
    lead: 'The **atlas** is the first cervical vertebra, a bony ring that carries the skull.',
    where: 'It sits between the occipital condyles above and the axis below, at the level of the lower jaw and the hard palate. It has no body and no spinous process; instead it has anterior and posterior arches and two lateral masses.',
    relations: 'The anterior arch articulates with the dens of the axis. The posterior arch carries a groove for the vertebral artery. The vertebral arteries and the first cervical nerves run in that groove before entering the foramen magnum.',
    function: 'It supports the head and, with the occipital condyles, allows nodding. It rotates around the dens of the axis for turning the head.',
    name: 'Atlas, because like the Titan it carries the globe of the head.',
    clinical: 'Fractures of the atlas, the Jefferson fracture, usually result from axial loading such as a dive into shallow water.',
  },
  axis: {
    lead: 'The **axis** is the second cervical vertebra and the pivot of the neck.',
    where: 'It lies below the atlas, with its dens projecting upward through the front of the atlas ring. Its spinous process is large and bifid, the first bony ridge felt below the occiput.',
    relations: 'The dens is held against the anterior arch of the atlas by the transverse ligament. The alar ligaments tether the dens to the occipital condyles. The vertebral artery runs lateral to the dens.',
    function: 'It provides the axis for rotation of the head. The atlantoaxial joints allow about half of the rotation of the head.',
    name: 'Axis, because the head turns around its peg.',
    clinical: 'The dens is a site of fracture in falls and in rheumatoid disease, where the transverse ligament can become incompetent.',
  },
  cervical_vertebra: {
    lead: 'The **cervical vertebrae** are the five typical vertebrae of the neck, C3 to C7.',
    where: 'They form the lordotic curve between the axis and the first thoracic vertebra. Their bodies are small and their intervertebral discs thin.',
    relations: 'Each has a transverse foramen for the vertebral artery and vein, and short bifid spinous processes except at C7. Uncinate processes project upward from the lateral margins of the bodies.',
    function: 'Together they allow the greatest range of flexion, extension, lateral flexion and rotation of any spinal region.',
    clinical: 'C7 has the longest spinous process and is the vertebra prominens, the landmark for counting vertebrae. Degenerative change at C5/C6 is common and can narrow the intervertebral foramen.',
  },
  thoracic_vertebra: {
    lead: 'The **thoracic vertebrae** are the twelve vertebrae that carry the ribs.',
    where: 'They form the kyphotic curve from T1 to T12. Their bodies are heart-shaped and increase in size downward.',
    relations: 'Costal facets on the bodies and transverse processes receive each rib. Their spinous processes are long and slope downward, overlapping the vertebra below.',
    function: 'They form the posterior wall of the thorax and anchor the ribs. Their facet orientation permits rotation and limits flexion.',
    clinical: 'Compression fractures from osteoporosis are common in the lower thoracic and upper lumbar spine.',
  },
  lumbar_vertebra: {
    lead: 'The **lumbar vertebrae** are the five large vertebrae of the lower back.',
    where: 'They form the lumbar lordosis between T12 and the sacrum. Their bodies are kidney-shaped and their spinous processes are short and stout.',
    relations: 'Mammillary and accessory processes give attachment to the deep back muscles. The cauda equina lies in the triangular lumbar canal below the L1/L2 level.',
    function: 'They carry most of the body weight and allow flexion, extension and lateral flexion, with little rotation.',
    clinical: 'Lumbar puncture is usually done at L3/L4 or L4/L5, below the cord. Degenerative disc and facet disease is commonest at L4/L5 and L5/S1.',
  },
  sacrum: {
    lead: 'The **sacrum** is the fused wedge of five vertebrae that links the spine to the pelvis.',
    where: 'It lies between the two iliac bones, with its base above at L5 and its apex below at the coccyx. The sacral promontory projects forward at the upper border.',
    relations: 'Its auricular surfaces join the ilia at the sacroiliac joints. Four pairs of sacral foramina transmit the sacral nerves. The sacral canal ends in the sacral hiatus.',
    function: 'It transmits the weight of the trunk to the pelvis and forms the posterior wall of the pelvic cavity.',
    clinical: 'Sacral fractures and sacroiliac disruption follow high-energy trauma; the sacral hiatus is the route for caudal epidural injection.',
  },
  iv_disc: {
    lead: 'The **intervertebral disc** is the fibrocartilaginous cushion between vertebral bodies.',
    where: 'Each disc lies between adjacent vertebral bodies from C2/C3 to L5/S1. The outer annulus fibrosus surrounds the gel-like nucleus pulposus, and thin cartilaginous endplates cover both surfaces.',
    relations: 'The anterior and posterior longitudinal ligaments blend with the annulus. The disc is avascular in adults and is nourished by diffusion through the endplates.',
    function: 'It absorbs load, allows slight movement between vertebrae and maintains the height of the disc space.',
    clinical: 'With age the nucleus loses water and the annulus cracks. A posterolateral herniation can compress the nerve root and cause sciatica; L4/L5 and L5/S1 are the commonest levels.',
  },
  atlantooccipital_joint: {
    lead: 'The **atlantooccipital joint** is the synovial joint between the occipital condyles and the atlas.',
    where: 'Two condyloid joints lie at the base of the skull, one on each side of the foramen magnum, above the lateral masses of the atlas.',
    relations: 'Anterior and posterior atlantooccipital membranes close the joint. The vertebral artery passes over the posterior arch of the atlas just below the joint.',
    function: 'Nodding: flexion and extension of the head, with a little lateral flexion. It is the yes joint.',
    clinical: 'It can be injured in whiplash, though it is more stable than the atlantoaxial joint, and it may be congenitally assimilated to the skull.',
  },
  atlantoaxial_joint: {
    lead: 'The **atlantoaxial joint** is the complex of three joints between the atlas and the axis.',
    where: 'A median joint lies between the dens and the anterior arch of the atlas; two lateral joints lie between the inferior facets of the atlas and the superior facets of the axis.',
    relations: 'The transverse ligament of the atlas holds the dens in place behind the anterior arch. The alar ligaments and tectorial membrane limit rotation. The vertebral arteries run lateral to the joints.',
    function: 'It turns the head from side to side, the no movement, and contributes about half of the total rotation of the head and neck.',
    clinical: 'Rheumatoid arthritis and Down syndrome weaken the transverse ligament and can cause atlantoaxial subluxation with cord compression.',
  },
  zygapophyseal_joint: {
    lead: 'The **zygapophyseal joint**, or facet joint, is the plane synovial joint between adjacent vertebrae.',
    where: 'It forms between the inferior articular process of one vertebra and the superior articular process of the next, at each level from C2 to the sacrum.',
    relations: 'A loose fibrous capsule surrounds it, and the ligamentum flavum and interspinous ligaments lie close by. The exiting nerve root passes just in front of the joint in the intervertebral foramen.',
    function: 'It guides and limits movement of the vertebral column; the orientation of the facets decides how much rotation each region allows.',
    clinical: 'Facet joint arthritis and facet tropism are common causes of axial back pain; the joints are a target for medial branch blocks.',
  },
  anterior_longitudinal_ligament: {
    lead: 'The **anterior longitudinal ligament** is the strong band on the front of the vertebral column.',
    where: 'It runs from the anterior arch of the atlas and the occipital bone down the anterior surfaces of the vertebral bodies to the sacrum.',
    relations: 'It blends with the annulus fibrosus and the periosteum of the bodies. It is broader and stronger than the posterior ligament.',
    function: 'It limits extension and reinforces the front of the discs; it is the main restraint against hyperextension.',
    clinical: 'It is torn in hyperextension injuries such as whiplash and can ossify in diffuse idiopathic skeletal hyperostosis.',
  },
  posterior_longitudinal_ligament: {
    lead: 'The **posterior longitudinal ligament** runs inside the vertebral canal on the back of the vertebral bodies.',
    where: 'From the body of the axis down to the sacrum, attached to the discs and the posterior margins of the bodies.',
    relations: 'It lies in front of the spinal cord and dura, separated from the dura by the epidural space. It is narrow at disc levels and broader over the bodies.',
    function: 'It limits flexion and helps prevent posterior herniation of the disc.',
    clinical: 'It is the barrier the nucleus must breach in a posterior disc herniation; its ossification causes thoracic myelopathy.',
  },
  ligamentum_flavum: {
    lead: 'The **ligamentum flavum** is the elastic yellow ligament that connects adjacent laminae.',
    where: 'It runs from the anterior surface of the lamina above to the posterior surface of the lamina below, on both sides, from C2 to S1.',
    relations: 'It forms the posterior wall of the vertebral canal and meets its partner in the midline. The epidural space lies in front of it.',
    function: 'It limits flexion and helps the spine return to the upright position after bending.',
    clinical: 'Hypertrophy narrows the lumbar canal in older adults; the ligament is pierced during midline epidural access.',
  },
  supraspinous_ligament: {
    lead: 'The **supraspinous ligament** is the cord along the tips of the spinous processes.',
    where: 'It runs from the spinous process of C7 to the sacrum, on the midline of the back.',
    relations: 'It is continuous above with the nuchal ligament and blends with the interspinous ligaments between the spines. It is covered by the thoracolumbar fascia.',
    function: 'It limits flexion of the vertebral column and gives attachment to the back muscles.',
    clinical: 'It is torn in flexion injuries and is a source of midline tenderness after a fall.',
  },
  nuchal_ligament: {
    lead: 'The **nuchal ligament** is the elastic sheet in the midline of the back of the neck.',
    where: 'It runs from the external occipital protuberance to the spinous process of C7, between the posterior neck muscles.',
    relations: 'It replaces the supraspinous ligament above C7 and blends with the cervical fascia. Trapezius and splenius capitis attach to it.',
    function: 'It limits flexion of the head and neck and gives a stable attachment for the neck muscles.',
    clinical: 'It is sometimes used as a graft and is a landmark for midline cervical approaches.',
  },
  iliocostalis: {
    lead: '**Iliocostalis** is the lateral column of the erector spinae.',
    where: 'It runs from the sacrum and iliac crest upward along the angles of the ribs to the cervical transverse processes. Its lumbar, thoracic and cervical parts are continuous.',
    relations: 'It lies lateral to longissimus and deep to the thoracolumbar fascia and serratus posterior inferior. The posterior rami of the spinal nerves supply it segmentally.',
    function: 'Extends and laterally flexes the spine and helps maintain posture; the cervical part extends the neck. Nerve: posterior rami of the spinal nerves.',
    nerve: 'posterior rami of the spinal nerves',
    origin: 'common tendon from the sacrum, iliac crest and lower lumbar spinous processes',
    insertion: 'angles of the ribs and transverse processes of the cervical vertebrae',
    clinical: 'Its lumbar part is a frequent site of myofascial strain in low back pain.',
  },
  longissimus: {
    lead: '**Longissimus** is the middle column of the erector spinae and the longest of its muscles.',
    where: 'From the common tendon and transverse processes it reaches the transverse processes of the thoracic and cervical vertebrae, and the mastoid process in its capitis part.',
    relations: 'It lies between iliocostalis and spinalis, deep to the thoracolumbar fascia. Its capitis part is covered by splenius capitis and trapezius.',
    function: 'Extends and laterally flexes the spine; the capitis part extends the head and turns the face to the same side. Nerve: posterior rami of the spinal nerves.',
    nerve: 'posterior rami of the spinal nerves',
    origin: 'common tendon and transverse processes of the thoracic and lumbar vertebrae',
    insertion: 'transverse processes of the thoracic and cervical vertebrae, and the mastoid process for the capitis part',
  },
  spinalis: {
    lead: '**Spinalis** is the medial column of the erector spinae, nearest the spinous processes.',
    where: 'It runs from the lower thoracic and upper lumbar spinous processes to the upper thoracic and cervical spinous processes; a capitis part is variable.',
    relations: 'It lies between longissimus and the midline, deep to the rhomboids and trapezius. It is often fused with semispinalis in the upper thorax.',
    function: 'Extends the vertebral column and assists lateral flexion. Nerve: posterior rami of the spinal nerves.',
    nerve: 'posterior rami of the spinal nerves',
    origin: 'spinous processes of the lower thoracic and upper lumbar vertebrae',
    insertion: 'spinous processes of the upper thoracic and cervical vertebrae',
  },
  semispinalis: {
    lead: '**Semispinalis** is the superficial layer of the transversospinalis group.',
    where: 'Its fibres run from transverse processes upward and medially, crossing 4 to 6 vertebrae to reach spinous processes, and to the occipital bone in the capitis part.',
    relations: 'It lies deep to the erector spinae and splenius, and superficial to multifidus and rotatores. The greater occipital nerve pierces semispinalis capitis.',
    function: 'Extends the thoracic and cervical spine; semispinalis capitis extends the head and turns the face to the opposite side. Nerve: posterior rami of the cervical and thoracic spinal nerves.',
    nerve: 'posterior rami of the cervical and thoracic spinal nerves',
    origin: 'transverse processes of the thoracic and lower cervical vertebrae',
    insertion: 'spinous processes 4 to 6 levels above, and the occipital bone between the nuchal lines for the capitis part',
    clinical: 'The greater occipital nerve can be compressed as it pierces semispinalis capitis, causing occipital neuralgia.',
  },
  splenius_capitis: {
    lead: '**Splenius capitis** is the broad muscle at the back of the neck that turns the face to its own side.',
    where: 'From the lower nuchal ligament and the spinous processes of C7 to T3 or T4 it runs up and laterally to the mastoid process and the lateral superior nuchal line.',
    relations: 'It lies superficial to semispinalis capitis and the suboccipital muscles, deep to trapezius. The greater occipital nerve emerges below its lateral border.',
    function: 'Extends the head and neck and turns the face to the same side; acting alone it laterally flexes the neck. Nerve: posterior rami of C3 and C4.',
    nerve: 'posterior rami of C3 and C4',
    origin: 'lower half of the nuchal ligament and spinous processes of C7 to T3 or T4',
    insertion: 'mastoid process and lateral third of the superior nuchal line',
    clinical: 'It is a site of trigger points and tension headache and is injected in cervicogenic headache.',
  },
  rectus_capitis_posterior_major: {
    lead: '**Rectus capitis posterior major** is a short suboccipital muscle from the axis to the skull.',
    where: 'From the spinous process of the axis it runs up and laterally to the lateral part of the inferior nuchal line of the occipital bone.',
    relations: 'It forms the medial border of the suboccipital triangle, with the vertebral artery and the suboccipital nerve in its floor. It lies deep to semispinalis capitis.',
    function: 'Extends the head and turns the face to the same side. Nerve: posterior ramus of C1, the suboccipital nerve.',
    nerve: 'posterior ramus of C1 (suboccipital nerve)',
    origin: 'spinous process of the axis',
    insertion: 'lateral part of the inferior nuchal line of the occipital bone',
    clinical: 'It is tender in cervicogenic headache and is a target of suboccipital release.',
  },
  longus_colli: {
    lead: '**Longus colli** is the long prevertebral muscle on the front of the cervical spine.',
    where: 'It has vertical, superior oblique and inferior oblique parts, spanning from the bodies of T1 to T3 up to the anterior arch of the atlas and the bodies of C2 to C4.',
    relations: 'It lies behind the prevertebral fascia, the pharynx and the esophagus, and in front of the cervical vertebrae. The sympathetic trunk runs on its anterior surface and the vertebral artery lies lateral to it.',
    function: 'Flexes the neck and slightly laterally flexes it, and stabilizes the cervical spine. Nerve: anterior rami of C2 to C6.',
    nerve: 'anterior rami of C2 to C6',
    origin: 'bodies of C5 to T3 and their transverse processes',
    insertion: 'anterior arch of the atlas and bodies of C2 to C4',
    clinical: 'It is a surgical plane in anterior cervical approaches and can be strained in whiplash.',
  },
  scalenus_anterior: {
    lead: '**Scalenus anterior** is the key muscle of the thoracic inlet.',
    where: 'From the anterior tubercles of the transverse processes of C3 to C6 it descends to the scalene tubercle on the first rib.',
    relations: 'The phrenic nerve runs on its anterior surface. The subclavian vein passes in front of it, and the subclavian artery and brachial plexus pass behind it, between it and scalenus medius.',
    function: 'Elevates the first rib in inspiration, and flexes and laterally flexes the neck; acting alone it rotates the neck to the opposite side. Nerve: anterior rami of C4 to C6.',
    nerve: 'anterior rami of C4 to C6',
    origin: 'anterior tubercles of the transverse processes of C3 to C6',
    insertion: 'scalene tubercle of the first rib',
    clinical: 'Scalene contraction or fibrous bands can compress the brachial plexus and subclavian artery in thoracic outlet syndrome.',
  },
};

export const lessonCues = {
  atlas: 'Ring-shaped C1 with no body',
  axis: 'C2 with the upward dens',
  cervical_vertebra: 'C3 to C7 with transverse foramina',
  thoracic_vertebra: 'Heart-shaped bodies with rib facets',
  lumbar_vertebra: 'Large kidney-shaped bodies of the lower back',
  sacrum: 'Five fused vertebrae between the ilia',
  iv_disc: 'Annulus around a gel core',
  atlantooccipital_joint: 'Nodding at the base of the skull',
  atlantoaxial_joint: 'Three joints for turning the head',
  zygapophyseal_joint: 'Facet joint between articular processes',
  anterior_longitudinal_ligament: 'Broad band on the front of the bodies',
  posterior_longitudinal_ligament: 'Narrow band inside the canal',
  ligamentum_flavum: 'Yellow elastic tissue between laminae',
  supraspinous_ligament: 'Cord along the spinous tips',
  nuchal_ligament: 'Midline elastic sheet of the neck',
  iliocostalis: 'Lateral erector spinae column to the ribs',
  longissimus: 'Middle erector spinae column to the mastoid',
  spinalis: 'Medial erector spinae column on the spines',
  semispinalis: 'Transversospinalis crossing several levels',
  splenius_capitis: 'Neck muscle turning the face to its own side',
  rectus_capitis_posterior_major: 'Axis to the occiput, same-side turn',
  longus_colli: 'Prevertebral flexor on the cervical bodies',
  scalenus_anterior: 'First rib elevator under the phrenic nerve',
};

export const roundClues = {
  atlas: 'The ring-shaped top vertebra has no body or spinous process and carries the skull.',
  axis: 'The vertebra with an upward peg around which the head turns.',
  cervical_vertebra: 'The small neck bones with foramina for a vertical artery.',
  thoracic_vertebra: 'The rib-bearing bones of the upper back, with long overlapping spines.',
  lumbar_vertebra: 'The five large weight-bearing bones of the lower back, with short stout spines.',
  sacrum: 'A fused wedge that sits between the hip bones and ends in a hiatus.',
  iv_disc: 'A cushion of annulus around a gel core, absent between the first two neck bones.',
  atlantooccipital_joint: 'The nodding joint between the skull base and the first vertebra.',
  atlantoaxial_joint: 'Three small joints that let the head turn from side to side.',
  zygapophyseal_joint: 'The plane joint between the articular processes of neighbouring vertebrae.',
  anterior_longitudinal_ligament: 'The broad band down the front of the vertebral bodies, checking extension.',
  posterior_longitudinal_ligament: 'The narrow band down the back of the bodies inside the canal.',
  ligamentum_flavum: 'The yellow elastic tissue that joins neighbouring laminae.',
  supraspinous_ligament: 'The cord that runs along the tips of the spines from the neck to the sacrum.',
  nuchal_ligament: 'The elastic midline sheet from the occiput to the seventh neck vertebra.',
  iliocostalis: 'The outer column of the back extensors, attached to the angles of the ribs.',
  longissimus: 'The longest column of the back extensors, reaching the mastoid process.',
  spinalis: 'The innermost column of the back extensors, running spine to spine.',
  semispinalis: 'The muscle whose fibres cross four to six levels and reach the occiput.',
  splenius_capitis: 'The broad muscle that turns the face toward its own side.',
  rectus_capitis_posterior_major: 'The short muscle from the peg of the second vertebra to the skull, turning the face to its own side.',
  longus_colli: 'The prevertebral muscle lying on the front of the cervical bodies and flexing the neck.',
  scalenus_anterior: 'The muscle of the thoracic inlet with the phrenic nerve on its front and the first rib below.',
};

export const content = {
  REGION_OVERVIEW: { spine: overview },
  LESSON_CUES: lessonCues,
  ROUND_CLUES: roundClues,
  LEVEL_OVERVIEW: {
    'spine-1': 'The column is a stack of different vertebrae. The atlas is a ring without a body, the axis carries the dens, and the cervical, thoracic and lumbar vertebrae change shape with their load. The sacrum fuses five vertebrae into a wedge, and the discs sit between the bodies from C2/C3 down to L5/S1.',
    'spine-2': 'The craniovertebral joints explain the two head movements: nodding at the atlantooccipital joint and turning at the atlantoaxial complex. Below the skull, the facet joints guide motion, while the longitudinal, flaval, supraspinous and nuchal ligaments check the extremes of flexion and extension.',
    'spine-3': 'The deep muscles are arranged in three erector spinae columns, a transversospinalis layer and the short suboccipital muscles. They are all supplied by posterior rami except the prevertebral longus colli and the scalenus anterior, which take anterior rami. Learn each muscle by its attachments, its nerve and its direction of pull.',
    'spine-30l': 'Bonus level: origins and insertions of the deep back and neck muscles. This is the 30L layer that turns a name into an exam answer. It is optional and does not block the next region.',
  },
  LEVEL_CONTRAST: {
    'spine-1': { a: 'atlas', b: 'axis', title: 'Atlas or axis', text: 'Both are the top two cervical vertebrae. The atlas is a ring with no body and no spinous process; it carries the skull. The axis has the dens, a large bifid spine and the pivot for rotation. The atlas rotates around the axis, not the other way round.' },
    'spine-2': { a: 'atlantooccipital_joint', b: 'atlantoaxial_joint', title: 'Nod or turn', text: 'The atlantooccipital joint is between the occipital condyles and the atlas and produces nodding. The atlantoaxial complex is between the atlas and the axis and produces rotation. One is the yes joint, the other the no joint.' },
    'spine-3': { a: 'splenius_capitis', b: 'semispinalis', title: 'Splenius or semispinalis capitis', text: 'Both extend the head from the back of the neck. Splenius capitis lies superficially and turns the face to the same side; semispinalis capitis lies deeper, reaches the occipital bone between the nuchal lines, and turns the face to the opposite side.' },
    'spine-30l': { a: 'longus_colli', b: 'scalenus_anterior', title: 'Longus colli or scalenus anterior', text: 'Both are anterior neck muscles. Longus colli lies directly on the cervical bodies, from the upper thoracic bodies to the atlas, and flexes the neck. Scalenus anterior runs from the cervical transverse processes to the first rib, elevates the rib and has the phrenic nerve on its anterior surface.' },
  },
  LEVEL_CHECK: {
    'spine-1': [
      { q: 'Which cervical vertebra has no body and no spinous process?', options: ['Atlas', 'Axis', 'C7', 'T1'], answer: 0, why: 'The atlas is a ring of anterior and posterior arches with lateral masses; it has neither a body nor a spinous process.', exam: true },
      { q: 'The dens projects upward from which vertebra?', options: ['Axis', 'Atlas', 'C7', 'T1'], answer: 0, why: 'The dens is the odontoid process of the axis, C2, and is held against the anterior arch of the atlas.', exam: true },
      { q: 'Which feature of a cervical vertebra transmits the vertebral artery?', options: ['Transverse foramen', 'Vertebral foramen', 'Intervertebral foramen', 'Costal facet'], answer: 0, why: 'Each cervical transverse process has a foramen for the vertebral artery and vein.', exam: true },
      { q: 'At which level is lumbar puncture usually performed?', options: ['L3/L4', 'T12/L1', 'L1/L2', 'L5/S1'], answer: 0, why: 'The L3/L4 or L4/L5 interspace lies below the conus medullaris, so the needle enters the cauda equina.', exam: true },
      { q: 'How many vertebrae fuse to form the sacrum?', options: ['Five', 'Three', 'Seven', 'Twelve'], answer: 0, why: 'Five sacral vertebrae fuse into a single wedge between the ilia.', exam: true },
    ],
    'spine-2': [
      { q: 'Which ligament holds the dens against the anterior arch of the atlas?', options: ['Transverse ligament of the atlas', 'Alar ligament', 'Ligamentum flavum', 'Supraspinous ligament'], answer: 0, why: 'The transverse ligament of the atlas stretches behind the dens and is the main restraint against anterior displacement.', exam: true },
      { q: 'Nodding the head yes occurs mainly at which joint?', options: ['Atlantooccipital joint', 'Atlantoaxial joint', 'Zygapophyseal joint', 'Intervertebral disc'], answer: 0, why: 'The atlantooccipital joint between the occipital condyles and the atlas produces most of the flexion and extension of the head.', exam: true },
      { q: 'Turning the head no occurs mainly at which joint?', options: ['Atlantoaxial joint', 'Atlantooccipital joint', 'C5/C6 facet', 'Sacroiliac joint'], answer: 0, why: 'The atlantoaxial complex supplies about half of head rotation, with the rest spread through the cervical spine.', exam: true },
      { q: 'Which ligament runs on the anterior surface of the vertebral bodies and limits extension?', options: ['Anterior longitudinal ligament', 'Posterior longitudinal ligament', 'Ligamentum flavum', 'Nuchal ligament'], answer: 0, why: 'The anterior longitudinal ligament is the broad band on the front of the bodies and discs and checks hyperextension.', exam: true },
      { q: 'Which ligament connects adjacent laminae and is rich in elastic fibres?', options: ['Ligamentum flavum', 'Supraspinous ligament', 'Anterior longitudinal ligament', 'Nuchal ligament'], answer: 0, why: 'The ligamentum flavum is yellow elastic tissue between the laminae and forms the posterior wall of the canal.', exam: true },
    ],
    'spine-3': [
      { q: 'Which muscle group is supplied by posterior rami and extends the spine?', options: ['Erector spinae', 'Scalene muscles', 'Longus colli', 'Rectus capitis anterior'], answer: 0, why: 'The erector spinae, including iliocostalis, longissimus and spinalis, is supplied by posterior rami of the spinal nerves.', exam: true },
      { q: 'Which muscle extends the head and turns the face to the opposite side?', options: ['Semispinalis capitis', 'Splenius capitis', 'Rectus capitis posterior major', 'Longissimus capitis'], answer: 0, why: 'Semispinalis capitis extends the head and rotates it to the opposite side; splenius and rectus capitis posterior major turn it to the same side.', exam: true },
      { q: 'Splenius capitis turns the face to which side?', options: ['The same side', 'The opposite side', 'It does not rotate', 'Both sides together'], answer: 0, why: 'Acting alone, splenius capitis extends, laterally flexes and rotates the head toward its own side.', exam: true },
      { q: 'Which nerve supplies rectus capitis posterior major?', options: ['Posterior ramus of C1', 'Anterior ramus of C1', 'Posterior ramus of C2', 'Spinal accessory nerve'], answer: 0, why: 'The suboccipital nerve is the posterior ramus of C1 and supplies the suboccipital muscles.', exam: true },
      { q: 'Which muscle flexes the neck and lies directly on the anterior vertebral bodies?', options: ['Longus colli', 'Scalenus anterior', 'Splenius capitis', 'Semispinalis cervicis'], answer: 0, why: 'Longus colli is the prevertebral muscle on the front of the cervical and upper thoracic bodies.', exam: true },
      { q: 'The phrenic nerve runs on the anterior surface of which muscle?', options: ['Scalenus anterior', 'Longus colli', 'Iliocostalis', 'Semispinalis capitis'], answer: 0, why: 'The phrenic nerve descends on the anterior surface of scalenus anterior under the prevertebral fascia.', exam: true },
    ],
    'spine-30l': [
      { q: 'Where does rectus capitis posterior major arise?', options: ['Spinous process of the axis', 'Transverse process of the atlas', 'Occipital condyle', 'Mastoid process'], answer: 0, why: 'It arises from the spinous process of C2 and inserts on the lateral part of the inferior nuchal line.', exam: true },
      { q: 'Where does splenius capitis insert?', options: ['Mastoid process and superior nuchal line', 'Occipital bone between the nuchal lines', 'Transverse processes of C3 to C6', 'First rib'], answer: 0, why: 'Splenius capitis inserts on the mastoid process and the lateral third of the superior nuchal line.', exam: true },
      { q: 'Which muscle arises from the anterior tubercles of the transverse processes of C3 to C6?', options: ['Scalenus anterior', 'Longus colli', 'Splenius capitis', 'Semispinalis capitis'], answer: 0, why: 'Scalenus anterior arises from the anterior tubercles of C3 to C6 and inserts on the scalene tubercle of the first rib.', exam: true },
      { q: 'Which muscle has its origin on the spinous process of the axis?', options: ['Rectus capitis posterior major', 'Rectus capitis posterior minor', 'Semispinalis capitis', 'Splenius capitis'], answer: 0, why: 'Rectus capitis posterior major arises from the axis spine; rectus capitis posterior minor arises from the posterior arch of the atlas.', exam: true },
      { q: 'Where does iliocostalis insert?', options: ['Angles of the ribs and cervical transverse processes', 'Mastoid process', 'Occipital bone', 'First rib'], answer: 0, why: 'Iliocostalis inserts on the angles of the ribs and the transverse processes of the cervical vertebrae.', exam: true },
    ],
  },
};

export const viewHints = {
  post: ['atlas', 'axis', 'cervical_vertebra', 'thoracic_vertebra', 'lumbar_vertebra', 'sacrum', 'iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'splenius_capitis', 'rectus_capitis_posterior_major',
    'posterior_longitudinal_ligament', 'ligamentum_flavum', 'supraspinous_ligament', 'nuchal_ligament'],
};
