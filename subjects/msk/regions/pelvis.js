// SpeedMSK · Pelvic girdle.
// Canonical answers avoid hyphens; hyphenated forms live in alt so Round 1
// can be typed letter by letter.

const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });

export const deck = {
  id: 'pelvis',
  titulo: 'Pelvic girdle & hip',
  cor: '#8f6a9e',
  ctx: ['hip_bone', 'sacrum', 'gluteus_maximus'],
  itens: [
    S('hip_bone', 'Hip bone', 'Hip bone', ['os coxae', 'innominate bone', 'coxal bone', 'pelvic bone'], 'Three fused bones meeting in the socket', [
      'The ilium, ischium and pubis fuse at the acetabulum; the iliac crest lies at the level of L4.',
      'The obturator foramen is closed by the obturator membrane, leaving only the obturator canal open.',
      'The greater sciatic notch is closed by the sacrotuberous and sacrospinous ligaments.',
    ]),
    S('sacroiliac_joint', 'Sacroiliac joint', 'Sacroiliac joint', ['SI joint', 'sacro-iliac joint', 'sacroiliac articulation'], 'Auricular surfaces between the fused pelvic wedge and the hip bone, strong behind', [
      'The sacroiliac joint combines an anterior plane synovial articulation with a strong posterior syndesmosis.',
      'The anterior sacroiliac ligament reinforces the capsule. The interosseous and posterior bands check separation and shear and are among the strongest ligaments in the body. The sacrotuberous and sacrospinous ligaments check nutation. The iliolumbar ligament stabilizes L5 on the ilium.',
      'Pelvic ring trauma can disrupt the joint and its posterior ligaments, leaving the hemipelvis unstable.',
    ]),
    S('pubic_symphysis', 'Pubic symphysis', 'Pubic symphysis', ['symphysis pubis', 'pubic symphysis joint'], 'Midline fibrocartilage pad between the front ends of the hip bones', [
      'The pubic symphysis is a secondary cartilaginous joint between the hyaline-covered surfaces of the pubic bodies.',
      'A fibrocartilaginous disc joins the bodies. The superior pubic ligament spans their crests and checks separation. The inferior arcuate ligament reinforces the lower margin and resists shear. The disc softens and widens in pregnancy.',
      'An open-book pelvic injury can widen the joint. Painful separation can also follow childbirth.',
    ]),
    S('hip_joint', 'Hip joint', 'Hip joint', ['coxofemoral joint', 'acetabulofemoral joint', 'hip articulation'], 'Femoral head in the acetabulum', [
      'The hip joint is a synovial ball-and-socket joint. The femoral head articulates with the lunate surface of the acetabulum.',
      'The capsule encloses the head and most of the neck. The iliofemoral ligament checks hyperextension. The pubofemoral checks abduction and extension. The ischiofemoral checks extension and medial rotation. The zona orbicularis resists distraction, and the ligament of the head carries a small artery but adds little stability.',
      'A dashboard blow with the hip flexed and adducted can drive the head posteriorly and injure the sciatic nerve; the limb lies shortened, adducted and medially rotated. A displaced intracapsular neck fracture can tear retinacular vessels and cause femoral head necrosis.',
    ]),
    S('sacrotuberous_ligament', 'Sacrotuberous ligament', 'Sacrotuberous ligament', ['sacrotuberal ligament', 'great sacrosciatic ligament'], 'Band from the fused pelvic wedge to the sitting bone, behind the pointed projection', [
      'It runs from the posterior iliac spines and lateral sacrum and coccyx to the ischial tuberosity.',
      'With the sacrospinous ligament it turns the greater and lesser sciatic notches into foramina.',
      'It resists nutation of the sacrum and gives origin to part of gluteus maximus.',
    ]),
    S('sacrospinous_ligament', 'Sacrospinous ligament', 'Sacrospinous ligament', ['small sacrosciatic ligament', 'sacro-spinous ligament'], 'Band from the fused pelvic wedge to the pointed spur of the hip bone', [
      'It runs from the lateral sacrum and coccyx to the ischial spine.',
      'It separates the greater sciatic foramen above from the lesser sciatic foramen below.',
      'The coccygeus muscle lies on its pelvic surface.',
    ]),
    S('iliolumbar_ligament', 'Iliolumbar ligament', 'Iliolumbar ligament', ['ilio-lumbar ligament', 'iliolumbar ligament of the pelvis'], 'Band from the L5 transverse process to the inner edge of the pelvic crest', [
      'It runs from the transverse process of L5 to the iliac crest and the posterior ilium.',
      'It has superior and inferior bands and stabilizes the lumbosacral junction.',
      'It resists forward slipping of L5 on the sacrum.',
    ]),
    S('inguinal_ligament', 'Inguinal ligament', 'Inguinal ligament', ['Poupart ligament', 'pouparts ligament', 'inguinal arch'], 'Rolled edge of the external oblique from spine to tubercle', [
      'It runs from the anterior superior iliac spine to the pubic tubercle as the thickened lower border of the external oblique aponeurosis.',
      'The lacunar ligament curves back from its medial end to the pectineal line.',
      'The iliopsoas, femoral vessels and femoral nerve pass beneath it; it forms the floor of the inguinal canal.',
    ]),
    S('gluteus_maximus', 'Gluteus maximus', 'Gluteus maximus', ['gluteus maximus muscle', 'maximus gluteus'], 'Largest buttock muscle, extends the hip', [
      'Superficial across the posterior ilium and sacrum.',
      'Extends and laterally rotates the hip. Its upper fibres abduct and its lower fibres adduct. It is important for rising from sitting, climbing and running. Supplied by the inferior gluteal nerve (L5, S1, S2).',
      'Arises from the posterior ilium, sacrum, coccyx and sacrotuberous ligament. Inserts on the iliotibial tract and gluteal tuberosity of the femur.',
    ]),
    S('gluteus_medius', 'Gluteus medius', 'Gluteus medius', ['gluteus medius muscle', 'medius gluteus'], 'Upper buttock abductor, keeps the pelvis level', [
      'On the lateral ilium between the iliac crest and greater trochanter.',
      'Abducts the hip and, with its anterior fibres, medially rotates it. It keeps the pelvis level in single-leg stance. Supplied by the superior gluteal nerve (L4, L5, S1).',
      'Arises from the ilium between the anterior and posterior gluteal lines. Inserts on the lateral surface of the greater trochanter.',
    ]),
    S('gluteus_minimus', 'Gluteus minimus', 'Gluteus minimus', ['gluteus minimus muscle', 'minimus gluteus'], 'Deepest of the three buttock abductors', [
      'Deep to gluteus medius, against the outer ilium above the hip capsule.',
      'Abducts and medially rotates the hip and stabilizes the femoral head in the acetabulum during walking. Supplied by the superior gluteal nerve (L4, L5, S1).',
      'Arises from the ilium between the anterior and inferior gluteal lines. Inserts on the anterior surface of the greater trochanter.',
    ]),
    S('piriformis', 'Piriformis', 'Piriformis', ['piriformis muscle', 'pear-shaped muscle'], 'The muscle the sciatic nerve passes beneath', [
      'Crosses from the pelvic face of the sacrum through the greater sciatic foramen.',
      'Laterally rotates the extended hip and abducts the flexed hip. It stabilizes the femoral head. Supplied by the nerve to piriformis (S1, S2).',
      'Arises from the anterior sacrum between the S2 and S4 foramina, sacrotuberous ligament and sacroiliac capsule. Inserts on the superior border of the greater trochanter.',
    ]),
    S('obturator_internus', 'Obturator internus', 'Obturator internus', ['obturator internus muscle', 'internal obturator muscle'], 'Inner pelvic wall muscle turning through the lesser sciatic foramen', [
      'Lines the pelvic side of the obturator membrane and turns around the lesser sciatic notch.',
      'Laterally rotates the extended hip and abducts the flexed hip. It also stabilizes the femoral head. Supplied by the nerve to obturator internus (L5–S2).',
      'Arises from the pelvic surface of the obturator membrane and surrounding ischiopubic ramus. Inserts on the medial surface of the greater trochanter.',
    ]),
    S('superior_gemellus_muscle', 'Superior gemellus', 'Superior gemellus', ['superior gemellus muscle', 'gemellus superior'], 'Small deep lateral rotator above the obturator internus tendon', [
      'Deep in the gluteal region, lying on the tendon of obturator internus.',
      'Laterally rotates the extended hip and stabilizes the femoral head. Supplied by the nerve to obturator internus.',
      'Arises from the ischial spine. Inserts on the medial surface of the greater trochanter.',
    ]),
    S('inferior_gemellus_muscle', 'Inferior gemellus', 'Inferior gemellus', ['inferior gemellus muscle', 'gemellus inferior'], 'Small deep lateral rotator below the obturator internus tendon', [
      'Deep in the gluteal region, lying on the tendon of obturator internus.',
      'Laterally rotates the extended hip and stabilizes the femoral head. Supplied by the nerve to quadratus femoris.',
      'Arises from the ischial tuberosity. Inserts on the medial surface of the greater trochanter.',
    ]),
    S('quadratus_femoris_muscle', 'Quadratus femoris', 'Quadratus femoris', ['quadratus femoris muscle'], 'Square deep lateral rotator from the ischial tuberosity to the quadrate tubercle', [
      'In the gluteal region, deep to gluteus maximus.',
      'Laterally rotates the extended hip and stabilizes the femoral head. Supplied by the nerve to quadratus femoris.',
      'Arises from the lateral border of the ischial tuberosity. Inserts on the quadrate tubercle on the intertrochanteric crest.',
    ]),
    S('obturator_externus', 'Obturator externus', 'Obturator externus', ['obturator externus muscle', 'external obturator muscle'], 'Deep lateral rotator on the outer surface of the obturator membrane', [
      'On the outer surface of the obturator membrane.',
      'Laterally rotates and adducts the hip and stabilizes the pelvis. Supplied by the obturator nerve.',
      'Arises from the outer surface of the obturator membrane and its bony boundaries. Inserts into the trochanteric fossa.',
    ]),
    S('iliacus', 'Iliacus', 'Iliacus', ['iliacus muscle', 'iliac muscle'], 'Fills the hollow of the ilium and joins the psoas', [
      'Fills the inner iliac fossa lateral to psoas major.',
      'Flexes the hip with psoas major. The femoral nerve supplies it.',
      'Arises from the iliac fossa, inner lip of the iliac crest and anterior sacroiliac ligaments. Inserts on the lesser trochanter, blending with the psoas tendon.',
    ]),
    S('psoas_major', 'Psoas major', 'Psoas major', ['psoas major muscle', 'psoas muscle', 'major psoas'], 'Long muscle from the lumbar vertebrae to the lesser trochanter', [
      'On the posterior abdominal wall beside the lumbar bodies, medial to iliacus.',
      'Flexes the hip and laterally flexes the lumbar spine. With both sides acting it flexes the trunk. Supplied by anterior rami of L1 to L3, with a small contribution from T12.',
      'Arises from the sides of the T12 to L5 vertebral bodies and discs and the lumbar transverse processes. Inserts on the lesser trochanter with iliacus.',
    ]),
    S('coccygeus', 'Coccygeus', 'Coccygeus', ['ischiococcygeus', 'coccygeus muscle'], 'Small muscle on the pelvic surface of the sacrospinous ligament', [
      'Posterior pelvic floor between the ischial spine and the coccyx.',
      'Supports the pelvic viscera and flexes the coccyx. Supplied by branches of the anterior rami of S4 and S5.',
      'Arises from the ischial spine and sacrospinous ligament. Inserts on the lateral border of the coccyx and lower sacrum.',
    ]),
    S('pubococcygeus', 'Pubococcygeus', 'Pubococcygeus', ['pubococcygeus muscle', 'pubo-coccygeus'], 'Anterior part of the levator ani supporting the viscera', [
      'Anteromedial levator ani, beside the urethra and anal canal.',
      'Supports the pelvic viscera, elevates the pelvic floor and helps maintain urinary and fecal continence by compressing the urethra and anus. Supplied by the nerve to levator ani (S3, S4), with variable pudendal branches.',
      'Arises from the posterior surface of the pubis and the anterior tendinous arch of levator ani. Inserts on the coccyx, anococcygeal raphe, perineal body and the walls of the prostate or vagina.',
    ]),
    S('iliococcygeus', 'Iliococcygeus', 'Iliococcygeus', ['iliococcygeus muscle', 'ilio-coccygeus'], 'Posterior part of the levator ani from the tendinous arch', [
      'Posterolateral levator ani, medial to obturator internus and in front of coccygeus.',
      'Supports the pelvic floor and elevates the anorectal canal. Supplied by the nerve to levator ani (S3, S4).',
      'Arises from the tendinous arch of levator ani and the ischial spine. Inserts on the coccyx and anococcygeal raphe.',
    ]),
  ],
};

export const region = { id: 'pelvis', title: 'Pelvic girdle', area: 'Pelvis' };

export const levels = [
  { title: 'Pelvic bones', ids: ['hip_bone', 'sacrum'] },
  { title: 'Pelvic joints and ligaments', ids: ['sacroiliac_joint', 'pubic_symphysis', 'hip_joint', 'sacrotuberous_ligament', 'sacrospinous_ligament', 'iliolumbar_ligament', 'inguinal_ligament'] },
  { title: 'Gluteal and pelvic muscles', ids: ['gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'superior_gemellus_muscle', 'inferior_gemellus_muscle', 'quadratus_femoris_muscle', 'obturator_externus', 'iliacus', 'psoas_major', 'coccygeus', 'pubococcygeus', 'iliococcygeus'] },
  { title: '30L origins and insertions', bonus: true, ids: ['gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'iliacus', 'psoas_major', 'coccygeus', 'pubococcygeus', 'iliococcygeus'] },
];

export const colors = {
  hip_bone: '#c3cedd',
  sacroiliac_joint: '#e0b45a', pubic_symphysis: '#e0b45a', hip_joint: '#e0b45a',
  sacrotuberous_ligament: '#d7a94c', sacrospinous_ligament: '#d7a94c',
  iliolumbar_ligament: '#d7a94c', inguinal_ligament: '#d7a94c',
  gluteus_maximus: '#b9574c', gluteus_medius: '#c06455', gluteus_minimus: '#a94c46',
  piriformis: '#bd6553', obturator_internus: '#a95147', iliacus: '#c76a58',
  psoas_major: '#b25a4b', coccygeus: '#c47a63', pubococcygeus: '#b86a58', iliococcygeus: '#a95f50',
};

export const markers = {
  sacroiliac_joint: [[57.0, 32.2, 936.7], [-57.0, 32.2, 936.7]],
};

// Anchor bones for each point marker and the view that shows it best.
export const markerMeta = {
  sacroiliac_joint: { anchors: ['hip_bone', 'sacrum'], view: 'post' },
};

export const purpose = 'Pelvic ring and hip joints, then gluteal, iliopsoas and pelvic floor layers.';

export const overview = 'Start with the sacroiliac joints, pubic symphysis and hip. Trace force from the sacrum through the pelvic ring to each femoral head. Then locate the muscles by layer and relate them to the hip, sciatic foramina or pelvic floor.';

export const lessons = {
  hip_bone: {
    lead: 'The **hip bone** is the large irregular bone that forms each side of the pelvic girdle.',
    where: 'It has a flared upper ilium, a lower posterior ischium and an anterior pubis, all fused at the acetabulum. The iliac crest is felt from the flank to the anterior superior iliac spine; the ischial tuberosity is the bone you sit on.',
    relations: 'It joins the sacrum at the sacroiliac joint, the opposite hip bone at the pubic symphysis and the femur at the hip joint. Its lateral surface gives origin to the gluteal muscles; its medial surface is lined by iliacus and obturator internus.',
    function: 'It transfers the weight of the trunk from the sacrum through the acetabulum to the femur. It also forms the bony walls of the true and false pelvis and gives attachment to the pelvic floor.',
    name: 'Os coxae, from Latin coxa, hip.',
    clinical: 'Falls in older people often fracture the pubic rami or the femoral neck; the iliac crest is a standard site for bone marrow aspiration.',
  },
  sacroiliac_joint: {
    lead: 'The **sacroiliac joint** combines an anterior plane synovial articulation with a strong posterior syndesmosis.',
    where: 'The auricular surfaces of the ilium and sacrum meet just anterior to the rough areas that anchor the interosseous ligaments.',
    relations: 'The anterior sacroiliac ligament reinforces the capsule. The interosseous and posterior bands check separation and shear and are among the strongest ligaments in the body. The sacrotuberous and sacrospinous ligaments check nutation. The iliolumbar ligament stabilizes L5 on the ilium.',
    function: 'Transfers trunk load to the hip bones. Allows slight nutation and counternutation. Interlocking surfaces and strong ligaments resist displacement.',
    clinical: 'Pelvic ring trauma can disrupt the joint and its posterior ligaments, leaving the hemipelvis unstable.',
  },
  pubic_symphysis: {
    lead: 'The **pubic symphysis** is a secondary cartilaginous joint between the hyaline-covered surfaces of the pubic bodies.',
    where: 'Find it between the pubic tubercles, below the pubic crest and in front of the bladder.',
    relations: 'The interpubic disc holds the bodies together. The superior ligament runs between the pubic crests. The inferior arcuate ligament bridges the arch. Together they resist separation and shear, and the disc softens and widens in pregnancy.',
    function: 'Closes the anterior pelvic ring and shares load across the midline. Allows slight compression, shear and rotation. The disc and ligaments limit separation.',
    clinical: 'An open-book pelvic injury can widen the joint. Painful separation can also follow childbirth.',
  },
  hip_joint: {
    lead: 'The **hip joint** is a synovial ball-and-socket joint. The femoral head articulates with the lunate surface of the acetabulum.',
    where: 'The femoral head sits in the lunate surface of the acetabulum, deepened by the labrum, medial to the greater trochanter.',
    relations: 'The capsule wraps the femoral neck. The anterior iliofemoral ligament checks hyperextension. The inferomedial pubofemoral ligament checks abduction and extension. The posterior ischiofemoral ligament checks extension and medial rotation. Circular fibers resist distraction, and the ligament of the head carries a small artery but adds little stability.',
    function: 'Allows flexion, extension, abduction, adduction, rotation and circumduction. The deep socket and labrum grip the head; gluteus medius and minimus, iliopsoas and the adductors are the main muscular stabilisers.',
    clinical: 'A dashboard blow with the hip flexed and adducted can drive the head posteriorly and injure the sciatic nerve; the limb lies shortened, adducted and medially rotated. A displaced intracapsular neck fracture can tear retinacular vessels and cause femoral head necrosis.',
  },
  sacrotuberous_ligament: {
    lead: 'The **sacrotuberous ligament** is a strong band from the sacrum to the ischial tuberosity.',
    where: 'Runs from the posterior superior and posterior inferior iliac spines and the lateral sacrum and coccyx down to the ischial tuberosity, deep to gluteus maximus.',
    relations: 'Its lower fibres blend with the tendon of biceps femoris. With the sacrospinous ligament it converts the greater sciatic notch into the greater sciatic foramen and the lesser sciatic notch into the lesser sciatic foramen.',
    function: 'It resists nutation of the sacrum on the ilium and helps stabilize the sacroiliac joint. It also gives origin to part of gluteus maximus.',
    clinical: 'The pudendal nerve can be compressed as it passes between this ligament and the sacrospinous ligament, a cause of perineal pain in cyclists.',
  },
  sacrospinous_ligament: {
    lead: 'The **sacrospinous ligament** is a triangular band from the sacrum and coccyx to the ischial spine.',
    where: 'Lies deep in the pelvis, running from the lateral border of the sacrum and coccyx to the ischial spine. It forms the lower boundary of the greater sciatic foramen.',
    relations: 'The coccygeus muscle lies on its pelvic surface. The pudendal nerve and internal pudendal vessels cross its tip at the ischial spine, between it and the sacrotuberous ligament.',
    function: 'It limits nutation of the sacrum and, with the sacrotuberous ligament, completes the greater and lesser sciatic foramina.',
    clinical: 'It is used in sacrospinous colpopexy to suspend the vaginal vault after prolapse; the pudendal vessels lie close to the ischial spine and must be avoided.',
  },
  iliolumbar_ligament: {
    lead: 'The **iliolumbar ligament** is the band that ties the fifth lumbar vertebra to the ilium.',
    where: 'Runs from the transverse process of L5 laterally to the iliac crest and the posterior part of the ilium, deep to the psoas major.',
    relations: 'It has superior and inferior bands and lies in front of the sacroiliac joint. The lumbosacral trunk and the iliolumbar vessels pass near it.',
    function: 'It stabilizes L5 on the sacrum and limits flexion and side bending at the lumbosacral junction.',
    clinical: 'It is a key landmark at the lumbosacral junction and is tense in lumbosacral flexion, so it is often assessed in low back pain.',
  },
  inguinal_ligament: {
    lead: 'The **inguinal ligament** is the thickened lower border of the external oblique aponeurosis.',
    where: 'Runs from the anterior superior iliac spine to the pubic tubercle, forming a palpable ridge in the groin.',
    relations: 'The lacunar ligament curves backward from its medial end to the pectineal line. The iliopsoas, femoral artery, femoral vein, femoral nerve and lymphatics pass beneath it. It forms the floor of the inguinal canal and the superior boundary of the femoral triangle.',
    function: 'It holds the abdominal wall to the hip bone and separates the abdominal cavity from the thigh. It also gives attachment to the inguinal canal and the transversalis fascia.',
    clinical: 'A direct inguinal hernia pushes through the posterior wall above it; a femoral hernia passes below it into the femoral canal. Its midpoint is a landmark for the deep inguinal ring and the femoral pulse.',
  },
  gluteus_maximus: {
    lead: '**Gluteus maximus** is the largest and most superficial muscle of the gluteal region.',
    where: 'Superficial across the posterior ilium and sacrum.',
    relations: 'It covers the short lateral rotators and sciatic nerve. Its lower edge forms part of the posterior hip contour.',
    function: 'Extends and laterally rotates the hip. Its upper fibres abduct and its lower fibres adduct. It is important for rising from sitting, climbing and running. Supplied by the inferior gluteal nerve (L5, S1, S2).',
    origin: 'posterior ilium, sacrum, coccyx and sacrotuberous ligament.',
    insertion: 'iliotibial tract and gluteal tuberosity of the femur.',
    nerve: 'inferior gluteal nerve (L5, S1, S2)',
    clinical: 'It is used for intramuscular injections in its upper lateral quadrant. Weakness causes difficulty climbing stairs and rising from a chair.',
  },
  gluteus_medius: {
    lead: '**Gluteus medius** is the fan-shaped abductor on the lateral surface of the ilium.',
    where: 'On the lateral ilium between the iliac crest and greater trochanter.',
    relations: 'Gluteus maximus covers it posteriorly. Gluteus minimus lies deep to it with superior gluteal vessels and nerve between them.',
    function: 'Abducts the hip and, with its anterior fibres, medially rotates it. It keeps the pelvis level in single-leg stance. Supplied by the superior gluteal nerve (L4, L5, S1).',
    origin: 'ilium between the anterior and posterior gluteal lines.',
    insertion: 'lateral surface of the greater trochanter.',
    nerve: 'superior gluteal nerve (L4, L5, S1)',
    clinical: 'Weakness or superior gluteal nerve injury gives a positive Trendelenburg sign: the pelvis drops on the opposite side when standing on the affected leg.',
  },
  gluteus_minimus: {
    lead: '**Gluteus minimus** is the deepest and smallest of the three gluteal muscles.',
    where: 'Deep to gluteus medius, against the outer ilium above the hip capsule.',
    relations: 'The superior gluteal nerve and vessels lie between it and medius. Its tendon crosses the front of the greater trochanter.',
    function: 'Abducts and medially rotates the hip and stabilizes the femoral head in the acetabulum during walking. Supplied by the superior gluteal nerve (L4, L5, S1).',
    origin: 'ilium between the anterior and inferior gluteal lines.',
    insertion: 'anterior surface of the greater trochanter.',
    nerve: 'superior gluteal nerve (L4, L5, S1)',
    clinical: 'It is a common site of tendon degeneration in greater trochanteric pain syndrome.',
  },
  piriformis: {
    lead: '**Piriformis** is the pear-shaped muscle that crosses the greater sciatic foramen.',
    where: 'Crosses from the pelvic face of the sacrum through the greater sciatic foramen.',
    relations: 'Gluteus maximus covers it outside the pelvis. The superior gluteal bundle passes above it and the sciatic nerve usually below.',
    function: 'Laterally rotates the extended hip and abducts the flexed hip. It stabilizes the femoral head. Supplied by the nerve to piriformis (S1, S2).',
    origin: 'anterior sacrum between the S2 and S4 foramina, sacrotuberous ligament and sacroiliac capsule.',
    insertion: 'superior border of the greater trochanter.',
    nerve: 'nerve to piriformis (S1, S2)',
    clinical: 'Piriformis syndrome causes deep buttock pain with sciatic radiation, especially with sitting or internal rotation. The muscle is a key landmark for the gluteal approach to the hip.',
  },
  obturator_internus: {
    lead: '**Obturator internus** is the muscle that lines the inner wall of the pelvis and turns through the lesser sciatic foramen.',
    where: 'Lines the pelvic side of the obturator membrane and turns around the lesser sciatic notch.',
    relations: 'Its tendon passes between the two gemelli behind the hip capsule. Gluteus maximus covers the tendon in the buttock.',
    function: 'Laterally rotates the extended hip and abducts the flexed hip. It also stabilizes the femoral head. Supplied by the nerve to obturator internus (L5–S2).',
    origin: 'pelvic surface of the obturator membrane and surrounding ischiopubic ramus.',
    insertion: 'medial surface of the greater trochanter.',
    nerve: 'nerve to obturator internus (L5–S2)',
    clinical: 'Its fascia forms the pudendal canal, so spasm or fibrosis can entrap the pudendal nerve. It is also a landmark in the ischioanal approach.',
  },
  iliacus: {
    lead: '**Iliacus** is the broad muscle that fills the iliac fossa and joins the psoas.',
    where: 'Fills the inner iliac fossa lateral to psoas major.',
    relations: 'The femoral nerve descends in the groove between the two muscles. They pass behind the inguinal ligament.',
    function: 'Flexes the hip with psoas major. The femoral nerve supplies it.',
    origin: 'iliac fossa, inner lip of the iliac crest and anterior sacroiliac ligaments.',
    insertion: 'lesser trochanter, blending with the psoas tendon.',
    nerve: 'femoral nerve (L2–L4)',
    clinical: 'A psoas abscess can spread into the iliac fossa and present as a limp with hip flexion. Iliopsoas tightness limits hip extension.',
  },
  psoas_major: {
    lead: '**Psoas major** is the long muscle from the lumbar vertebrae to the lesser trochanter and the main flexor of the hip.',
    where: 'On the posterior abdominal wall beside the lumbar bodies, medial to iliacus.',
    relations: 'The lumbar plexus forms within it. The femoral nerve emerges laterally and the genitofemoral nerve runs on its front surface.',
    function: 'Flexes the hip and laterally flexes the lumbar spine. With both sides acting it flexes the trunk. Supplied by anterior rami of L1 to L3, with a small contribution from T12.',
    origin: 'sides of the T12 to L5 vertebral bodies and discs and the lumbar transverse processes.',
    insertion: 'lesser trochanter with iliacus.',
    nerve: 'anterior rami of L1 to L3, with a small contribution from T12',
    clinical: 'Psoas spasm causes the psoas sign in appendicitis and hip pathology. A psoas abscess can track down the muscle and present in the groin.',
  },
  coccygeus: {
    lead: '**Coccygeus**, also called ischiococcygeus, is the small triangular muscle behind the levator ani.',
    where: 'Posterior pelvic floor between the ischial spine and the coccyx.',
    relations: 'It lies behind iliococcygeus and on the pelvic surface of the sacrospinous ligament.',
    function: 'Supports the pelvic viscera and flexes the coccyx. Supplied by branches of the anterior rami of S4 and S5.',
    origin: 'ischial spine and sacrospinous ligament.',
    insertion: 'lateral border of the coccyx and lower sacrum.',
    nerve: 'branches of the anterior rami of S4 and S5',
    clinical: 'It can be injured in a fall onto the coccyx, contributing to coccydynia.',
  },
  pubococcygeus: {
    lead: '**Pubococcygeus** is the anterior part of levator ani, the main muscle of the pelvic floor.',
    where: 'Anteromedial levator ani, beside the urethra and anal canal.',
    relations: 'Iliococcygeus lies lateral and puborectalis lies medial along the anorectal junction.',
    function: 'Supports the pelvic viscera, elevates the pelvic floor and helps maintain urinary and fecal continence by compressing the urethra and anus. Supplied by the nerve to levator ani (S3, S4), with variable pudendal branches.',
    origin: 'posterior surface of the pubis and the anterior tendinous arch of levator ani.',
    insertion: 'coccyx, anococcygeal raphe, perineal body and the walls of the prostate or vagina.',
    nerve: 'nerve to levator ani (S3, S4), with variable pudendal branches',
    clinical: 'Weakness after childbirth or prostate surgery contributes to stress incontinence and prolapse. Kegel exercises train this muscle.',
  },
  iliococcygeus: {
    lead: '**Iliococcygeus** is the posterior and lateral part of levator ani.',
    where: 'Posterolateral levator ani, medial to obturator internus and in front of coccygeus.',
    relations: 'The pelvic viscera lie above it. Its medial fibers meet the opposite side behind the anal canal.',
    function: 'Supports the pelvic floor and elevates the anorectal canal. Supplied by the nerve to levator ani (S3, S4).',
    origin: 'tendinous arch of levator ani and the ischial spine.',
    insertion: 'coccyx and anococcygeal raphe.',
    nerve: 'nerve to levator ani (S3, S4)',
    clinical: 'It forms the posterior part of the levator plate, whose descent is seen in pelvic organ prolapse.',
  },
};

export const lessonCues = {
  hip_bone: 'Fused ilium, ischium and pubis around the socket',
  sacroiliac_joint: 'Ear-shaped surfaces linking the fused pelvic wedge to the pelvic side bone, braced behind',
  pubic_symphysis: 'Midline fibrocartilage pad between the front ends of the hip bones',
  hip_joint: 'Femoral head in the deep acetabular socket, held by strong capsular ligaments',
  sacrotuberous_ligament: 'Strong cord from the fused pelvic wedge down to the bony seat, behind the pointed spur',
  sacrospinous_ligament: 'Triangular band from the fused pelvic wedge to the pointed spur of the pelvic side bone',
  iliolumbar_ligament: 'Band from the L5 transverse process to the inner edge of the pelvic crest',
  inguinal_ligament: 'Rolled lower edge of the external oblique from spine to pubic tubercle',
  gluteus_maximus: 'Largest buttock muscle, extends the hip',
  gluteus_medius: 'Upper buttock abductor, keeps the pelvis level',
  gluteus_minimus: 'Deepest buttock abductor, inserting on the front of the greater trochanter',
  piriformis: 'The muscle the sciatic nerve passes beneath',
  obturator_internus: 'Inner pelvic wall muscle turning through the lesser foramen',
  iliacus: 'Fills the hollow of the ilium and joins the psoas',
  psoas_major: 'Long muscle from the lumbar vertebrae to the lesser trochanter',
  coccygeus: 'Small muscle on the sacrospinous ligament',
  pubococcygeus: 'Anterior part of the pelvic floor sling beside urethra and anal canal',
  iliococcygeus: 'Posterolateral part of the pelvic floor, arising from the tendinous arch',
};

export const roundClues = {
  hip_bone: 'The three-part bone that forms each side of the pelvis.',
  sacroiliac_joint: 'The strong, ear-shaped contact between the fused pelvic wedge and the back of the hip bone',
  pubic_symphysis: 'Midline fibrocartilage pad between the front ends of the hip bones',
  hip_joint: 'The ball-and-socket joint between the femoral head and the acetabulum.',
  sacrotuberous_ligament: 'It tethers the fused pelvic wedge to the bony seat and braces the pelvic ring',
  sacrospinous_ligament: 'It divides the two openings behind the hip and gives the pelvic floor muscle a base',
  iliolumbar_ligament: 'Band from the L5 transverse process to the inner edge of the pelvic crest',
  inguinal_ligament: 'The rolled lower edge of the external oblique, from the anterior superior iliac spine to the pubic tubercle.',
  gluteus_maximus: 'The largest muscle of the buttock, used to climb stairs and rise from a chair.',
  gluteus_medius: 'The hip abductor above the big buttock muscle whose weakness drops the opposite pelvis.',
  gluteus_minimus: 'The deepest of the three buttock abductors, inserting on the front of the greater trochanter.',
  piriformis: 'The muscle that marks the exit of the sciatic nerve from the pelvis.',
  obturator_internus: 'The muscle on the inner pelvic wall whose tendon turns through the lesser sciatic foramen.',
  iliacus: 'The muscle that fills the inner hollow of the hip bone and joins the psoas to the lesser trochanter.',
  psoas_major: 'The long muscle from the lumbar vertebrae to the lesser trochanter.',
  coccygeus: 'The small muscle on the pelvic surface of the sacrospinous ligament.',
  pubococcygeus: 'The anterior part of the levator ani that supports the prostate or vagina.',
  iliococcygeus: 'The part of the levator ani that arises from the tendinous arch and ischial spine.',
};

export const content = {
  REGION_OVERVIEW: { pelvis: overview },
  LESSON_CUES: lessonCues,
  ROUND_CLUES: roundClues,
  LEVEL_OVERVIEW: {
    'pelvis-1': 'The pelvic girdle is a bony ring made of the two hip bones and the sacrum, with the coccyx below. Each hip bone is a fusion of ilium, ischium and pubis at the acetabulum. The ring transfers trunk weight to the femora and encloses the pelvic viscera; find the iliac crest, the ischial tuberosity and the sacral promontory first.',
    'pelvis-2': 'The sacroiliac joints transfer trunk load to the hip bones through interlocking auricular surfaces and very strong posterior ligaments. The pubic symphysis closes the ring in front and allows slight give. At the hip, the deep socket, labrum and three capsular ligaments stabilize the femoral head, helped by the gluteal and iliopsoas muscles.',
    'pelvis-3': 'The gluteal muscles abduct and extend the hip, with the sciatic nerve emerging below piriformis. Obturator internus lines the inner pelvic wall, while iliacus and psoas major form iliopsoas, the main hip flexor. The pelvic floor adds coccygeus and two parts of levator ani, pubococcygeus and iliococcygeus; they support the viscera and resist rises in intra-abdominal pressure.',
    'pelvis-30l': 'Bonus level: origins, insertions and nerve supply of the gluteal, iliopsoas and pelvic floor muscles. Learn the trochanteric attachments of the short rotators and the lesser trochanter insertion shared by iliacus and psoas; this is optional and does not block the next region.',
  },
  LEVEL_CONTRAST: {
    'pelvis-1': { a: 'hip_bone', b: 'sacrum', title: 'Hip bone or sacrum', text: 'The hip bone is the paired appendicular bone formed by ilium, ischium and pubis; the sacrum is the fused axial bone between the iliac bones. The hip bone carries the acetabulum and the gluteal origins; the sacrum carries the sacral foramina and the sacral canal. They meet at the sacroiliac joint.' },
    'pelvis-2': { a: 'sacroiliac_joint', b: 'pubic_symphysis', title: 'Sacroiliac joint or pubic symphysis', text: 'Both close the pelvic ring. The sacroiliac joint is posterior, partly synovial and strongly ligamentous, and transmits trunk weight; the pubic symphysis is anterior, fibrocartilaginous and allows slight expansion in pregnancy. One is a weight-bearing joint, the other a midline cushion.' },
    'pelvis-3': { a: 'piriformis', b: 'obturator_internus', title: 'Piriformis or obturator internus', text: 'Both are lateral rotators of the extended hip. Piriformis crosses the greater sciatic foramen and the sciatic nerve emerges below it; obturator internus lines the inner pelvic wall and its tendon turns through the lesser sciatic foramen. Piriformis is a gluteal landmark, obturator internus a pelvic wall landmark.' },
    'pelvis-30l': { a: 'gluteus_medius', b: 'gluteus_minimus', title: 'Gluteus medius or minimus', text: 'Both abduct and medially rotate the hip through the superior gluteal nerve. Gluteus medius is superficial and inserts on the lateral greater trochanter; gluteus minimus is deeper and inserts on the anterior greater trochanter. The superior gluteal nerve runs between them.' },
  },
  LEVEL_CHECK: {
    'pelvis-1': [
      { q: 'Which three bones fuse to form the hip bone?', options: ['Ilium, ischium and pubis', 'Ilium, sacrum and pubis', 'Ischium, pubis and femur', 'Sacrum, coccyx and ilium'], answer: 0, why: 'The three parts meet in the acetabulum and fuse during growth; the sacrum and coccyx are separate bones.', exam: true },
      { q: 'At which level is the line between the highest points of the iliac crests classically drawn?', options: ['L4', 'T12', 'L1', 'S1'], answer: 0, why: 'The intercristal line is an approximate landmark for L4 or the L4–L5 interspace.', exam: true },
      { q: 'Which part of the hip bone do you sit on?', options: ['Ischial tuberosity', 'Anterior superior iliac spine', 'Pubic tubercle', 'Acetabulum'], answer: 0, why: 'The ischial tuberosity is the lower posterior projection that bears weight in sitting.', exam: true },
      { q: 'The sacral promontory is the anterior projection of which structure?', options: ['The base of the sacrum at S1', 'The coccyx', 'The ischial spine', 'The fifth lumbar vertebra'], answer: 0, why: 'The promontory is the anterior superior edge of the S1 body and a landmark of the pelvic inlet.', exam: true },
    ],
    'pelvis-2': [
      { q: 'Which ligament runs behind the sciatic notches and attaches to the ischial tuberosity?', options: ['Sacrotuberous ligament', 'Sacrospinous ligament', 'Iliolumbar ligament', 'Inguinal ligament'], answer: 0, why: 'The sacrotuberous ligament reaches the tuberosity. The sacrospinous ligament ends at the ischial spine. Both help form the sciatic foramina.', exam: true },
      { q: 'Which ligament runs from the ischial spine to the lateral sacrum and coccyx?', options: ['Sacrospinous ligament', 'Sacrotuberous ligament', 'Iliolumbar ligament', 'Superior pubic ligament'], answer: 0, why: 'The sacrospinous ligament separates the greater and lesser sciatic foramina and gives attachment to coccygeus.', exam: true },
      { q: 'Which joint is a secondary cartilaginous joint with a fibrocartilaginous disc?', options: ['Pubic symphysis', 'Sacroiliac joint', 'Hip joint', 'Lumbosacral joint'], answer: 0, why: 'The pubic symphysis is a midline symphysis with a fibrocartilaginous disc between hyaline-covered pubic surfaces.', exam: true },
      { q: 'Which is the strongest ligament of the hip joint?', options: ['Iliofemoral ligament', 'Pubofemoral ligament', 'Ischiofemoral ligament', 'Ligamentum teres'], answer: 0, why: 'The Y-shaped iliofemoral ligament reinforces the anterior capsule and limits extension; it is the strongest ligament in the body.', exam: true },
      { q: 'The artery of the head of the femur runs in which structure?', options: ['Ligamentum teres', 'Iliofemoral ligament', 'Acetabular labrum', 'Zona orbicularis'], answer: 0, why: 'The ligamentum teres carries a small branch of the obturator artery to the fovea of the femoral head.', exam: true },
    ],
    'pelvis-3': [
      { q: 'Which muscle is supplied by the inferior gluteal nerve?', options: ['Gluteus maximus', 'Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'], answer: 0, why: 'The inferior gluteal nerve (L5, S1, S2) supplies gluteus maximus; the other gluteal muscles use the superior gluteal nerve.', exam: true },
      { q: 'The sciatic nerve emerges from the pelvis below which muscle?', options: ['Piriformis', 'Gluteus medius', 'Obturator internus', 'Coccygeus'], answer: 0, why: 'The sciatic nerve leaves the greater sciatic foramen below piriformis, which is the key landmark of the gluteal region.', exam: true },
      { q: 'Which muscle forms the lateral wall of the ischioanal fossa?', options: ['Obturator internus', 'Piriformis', 'Levator ani', 'Gluteus maximus'], answer: 0, why: 'Obturator internus and its fascia form the lateral wall of the ischioanal fossa and the pudendal canal.', exam: true },
      { q: 'Which muscle inserts on the lesser trochanter together with psoas major?', options: ['Iliacus', 'Gluteus minimus', 'Piriformis', 'Obturator internus'], answer: 0, why: 'Iliacus and psoas major form iliopsoas and share the lesser trochanter insertion.', exam: true },
      { q: 'Which muscle lies on the pelvic surface of the sacrospinous ligament?', options: ['Coccygeus', 'Piriformis', 'Obturator internus', 'Pubococcygeus'], answer: 0, why: 'Coccygeus arises from the ischial spine and sacrospinous ligament and forms the posterior part of the pelvic diaphragm.', exam: true },
      { q: 'Which nerve supplies the levator ani?', options: ['Nerve to levator ani from S3 and S4', 'Inferior gluteal nerve', 'Nerve to obturator internus', 'Femoral nerve'], answer: 0, why: 'The levator ani receives direct branches from S3 and S4, with possible pudendal contributions.', exam: true },
    ],
    'pelvis-30l': [
      { q: 'Where does gluteus maximus insert?', options: ['Iliotibial tract and gluteal tuberosity', 'Lateral surface of the greater trochanter', 'Medial surface of the greater trochanter', 'Lesser trochanter'], answer: 0, why: 'Most fibres insert into the iliotibial tract and the deeper fibres into the gluteal tuberosity of the femur.', exam: true },
      { q: 'Where does gluteus medius insert?', options: ['Lateral surface of the greater trochanter', 'Anterior surface of the greater trochanter', 'Superior border of the greater trochanter', 'Ischial tuberosity'], answer: 0, why: 'Gluteus medius inserts on the lateral greater trochanter; gluteus minimus inserts on its anterior surface.', exam: true },
      { q: 'Where does piriformis arise?', options: ['Anterior sacrum between the S2 and S4 foramina', 'Ischial spine', 'Iliac fossa', 'Posterior ilium'], answer: 0, why: 'Piriformis arises from the anterior sacrum, sacrotuberous ligament and sacroiliac capsule, and inserts on the superior greater trochanter.', exam: true },
      { q: 'Where does obturator internus insert?', options: ['Medial surface of the greater trochanter', 'Lateral surface of the greater trochanter', 'Lesser trochanter', 'Gluteal tuberosity'], answer: 0, why: 'Its tendon turns through the lesser sciatic foramen and inserts on the medial surface of the greater trochanter.', exam: true },
      { q: 'Where does iliacus arise?', options: ['Iliac fossa', 'Lumbar vertebral bodies', 'Ischial spine', 'Anterior sacrum'], answer: 0, why: 'Iliacus arises from the iliac fossa, inner iliac crest and anterior sacroiliac ligaments.', exam: true },
      { q: 'Where does pubococcygeus insert?', options: ['Coccyx, anococcygeal raphe and perineal body', 'Ischial spine only', 'Greater trochanter', 'Lesser trochanter'], answer: 0, why: 'Pubococcygeus runs from the pubis to the coccyx, anococcygeal raphe, perineal body and the walls of the prostate or vagina.', exam: true },
    ],
  },
};

export const viewHints = {
  post: ['hip_bone', 'sacrum', 'gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis',
    'sacrotuberous_ligament', 'sacrospinous_ligament', 'iliolumbar_ligament'],
  inf: ['pubic_symphysis', 'pubococcygeus', 'iliococcygeus', 'coccygeus'],
};
