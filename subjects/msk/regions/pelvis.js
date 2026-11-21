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
    S('sacroiliac_joint', 'Sacroiliac joint', 'Sacroiliac joint', ['SI joint', 'sacro-iliac joint', 'sacroiliac articulation'], 'Auricular surfaces of sacrum and ilium, strong behind', [
      'The anterior part is synovial; the posterior part is a strong syndesmosis of interosseous ligaments.',
      'Movement is small, mainly nutation and counternutation.',
      'It is the first joint affected in ankylosing spondylitis.',
    ]),
    S('pubic_symphysis', 'Pubic symphysis', 'Pubic symphysis', ['symphysis pubis', 'pubic symphysis joint'], 'Midline fibrocartilage between the two pubic bodies', [
      'A secondary cartilaginous joint with a fibrocartilaginous disc, reinforced by superior and inferior pubic ligaments.',
      'Relaxin softens it in pregnancy; a gap over 10 mm is diastasis.',
      'It allows slight expansion of the pelvic ring during childbirth.',
    ]),
    S('hip_joint', 'Hip joint', 'Hip joint', ['coxofemoral joint', 'acetabulofemoral joint', 'hip articulation'], 'Femoral head in the acetabulum', [
      'The iliofemoral, pubofemoral and ischiofemoral ligaments reinforce the capsule, with the iliofemoral the strongest.',
      'The acetabular labrum deepens the socket and the ligamentum teres carries the artery of the head of the femur.',
      'Posterior dislocation is the commonest type and may injure the sciatic nerve.',
    ]),
    S('sacrotuberous_ligament', 'Sacrotuberous ligament', 'Sacrotuberous ligament', ['sacrotuberal ligament', 'great sacrosciatic ligament'], 'Band from the sacrum to the sitting bone', [
      'It runs from the posterior iliac spines and lateral sacrum and coccyx to the ischial tuberosity.',
      'With the sacrospinous ligament it turns the greater and lesser sciatic notches into foramina.',
      'It resists nutation of the sacrum and gives origin to part of gluteus maximus.',
    ]),
    S('sacrospinous_ligament', 'Sacrospinous ligament', 'Sacrospinous ligament', ['small sacrosciatic ligament', 'sacro-spinous ligament'], 'Band from the sacrum to the ischial spine', [
      'It runs from the lateral sacrum and coccyx to the ischial spine.',
      'It separates the greater sciatic foramen above from the lesser sciatic foramen below.',
      'The coccygeus muscle lies on its pelvic surface.',
    ]),
    S('iliolumbar_ligament', 'Iliolumbar ligament', 'Iliolumbar ligament', ['ilio-lumbar ligament', 'iliolumbar ligament of the pelvis'], 'Band from L5 to the iliac crest', [
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
      'Origin: posterior ilium, sacrum, coccyx and sacrotuberous ligament. Insertion: iliotibial tract and gluteal tuberosity.',
      'Nerve: inferior gluteal nerve (L5, S1, S2).',
      'Extends and laterally rotates the hip and is used when rising from sitting or climbing stairs.',
    ]),
    S('gluteus_medius', 'Gluteus medius', 'Gluteus medius', ['gluteus medius muscle', 'medius gluteus'], 'Upper buttock abductor, keeps the pelvis level', [
      'Origin: ilium between the anterior and posterior gluteal lines. Insertion: lateral surface of the greater trochanter.',
      'Nerve: superior gluteal nerve (L4, L5, S1).',
      'Abducts and medially rotates the hip; its weakness gives a positive Trendelenburg sign.',
    ]),
    S('gluteus_minimus', 'Gluteus minimus', 'Gluteus minimus', ['gluteus minimus muscle', 'minimus gluteus'], 'Deepest of the three buttock abductors', [
      'Origin: ilium between the anterior and inferior gluteal lines. Insertion: anterior surface of the greater trochanter.',
      'Nerve: superior gluteal nerve (L4, L5, S1).',
      'Abducts and medially rotates the hip and stabilizes the femoral head in the acetabulum.',
    ]),
    S('piriformis', 'Piriformis', 'Piriformis', ['piriformis muscle', 'pear-shaped muscle'], 'The muscle the sciatic nerve passes beneath', [
      'Origin: anterior sacrum between the S2 and S4 foramina, sacrotuberous ligament and sacroiliac capsule.',
      'Insertion: superior border of the greater trochanter. Nerve: nerve to piriformis (S1, S2).',
      'Laterally rotates the extended hip and abducts the flexed hip; the sciatic nerve emerges below it.',
    ]),
    S('obturator_internus', 'Obturator internus', 'Obturator internus', ['obturator internus muscle', 'internal obturator muscle'], 'Inner pelvic wall muscle turning through the lesser sciatic foramen', [
      'Origin: pelvic surface of the obturator membrane and the surrounding ischiopubic ramus.',
      'Insertion: medial surface of the greater trochanter. Nerve: nerve to obturator internus (L5, S1).',
      'Laterally rotates the extended hip, abducts the flexed hip and forms the lateral wall of the ischioanal fossa.',
    ]),
    S('iliacus', 'Iliacus', 'Iliacus', ['iliacus muscle', 'iliac muscle'], 'Fills the hollow of the ilium and joins the psoas', [
      'Origin: iliac fossa, inner lip of the iliac crest and anterior sacroiliac ligaments.',
      'Insertion: lesser trochanter with the psoas tendon. Nerve: femoral nerve (L2, L3).',
      'Flexes the hip and helps stabilize the pelvis on the femur.',
    ]),
    S('psoas_major', 'Psoas major', 'Psoas major', ['psoas major muscle', 'psoas muscle', 'major psoas'], 'Long muscle from the lumbar vertebrae to the lesser trochanter', [
      'Origin: sides of the T12 to L5 vertebral bodies and discs and the lumbar transverse processes.',
      'Insertion: lesser trochanter with iliacus. Nerve: anterior rami of L1 to L3.',
      'The main hip flexor; it also laterally flexes the lumbar spine.',
    ]),
    S('coccygeus', 'Coccygeus', 'Coccygeus', ['ischiococcygeus', 'coccygeus muscle'], 'Small muscle on the pelvic surface of the sacrospinous ligament', [
      'Origin: ischial spine and sacrospinous ligament. Insertion: lateral coccyx and lower sacrum.',
      'Nerve: branches of the anterior rami of S4 and S5.',
      'Supports the pelvic viscera and flexes the coccyx; with levator ani it forms the pelvic diaphragm.',
    ]),
    S('pubococcygeus', 'Pubococcygeus', 'Pubococcygeus', ['pubococcygeus muscle', 'pubo-coccygeus'], 'Anterior part of the levator ani supporting the viscera', [
      'Origin: posterior surface of the pubis and the anterior tendinous arch of levator ani.',
      'Insertion: coccyx, anococcygeal raphe, perineal body and the walls of the prostate or vagina.',
      'Nerve: nerve to levator ani (S3, S4). Action: supports the pelvic viscera and helps maintain continence.',
    ]),
    S('iliococcygeus', 'Iliococcygeus', 'Iliococcygeus', ['iliococcygeus muscle', 'ilio-coccygeus'], 'Posterior part of the levator ani from the tendinous arch', [
      'Origin: tendinous arch of levator ani and the ischial spine.',
      'Insertion: coccyx and anococcygeal raphe. Nerve: nerve to levator ani (S3, S4).',
      'Supports the pelvic floor and elevates the anorectal canal.',
    ]),
  ],
};

export const region = { id: 'pelvis', title: 'Pelvic girdle', area: 'Pelvis' };

export const levels = [
  { title: 'Pelvic bones', ids: ['hip_bone', 'sacrum'] },
  { title: 'Pelvic joints and ligaments', ids: ['sacroiliac_joint', 'pubic_symphysis', 'hip_joint', 'sacrotuberous_ligament', 'sacrospinous_ligament', 'iliolumbar_ligament', 'inguinal_ligament'] },
  { title: 'Gluteal and pelvic muscles', ids: ['gluteus_maximus', 'gluteus_medius', 'gluteus_minimus', 'piriformis', 'obturator_internus', 'iliacus', 'psoas_major', 'coccygeus', 'pubococcygeus', 'iliococcygeus'] },
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
  sacroiliac_joint: [[38.6, 24.2, 948.7], [-38.6, 24.2, 948.7]],
};

// Anchor bones for each point marker and the view that shows it best.
export const markerMeta = {
  sacroiliac_joint: { anchors: ['hip_bone', 'sacrum'], view: 'post' },
};

export const purpose = 'Bones and joints of the pelvic ring, then the gluteal, iliopsoas and pelvic floor muscles.';

export const overview = 'The pelvic girdle is a ring made of the two hip bones, the sacrum and the coccyx, closed in front by the pubic symphysis. It transfers the weight of the trunk to the lower limbs and forms the bony canal for the pelvic viscera. This region follows the hip bone and sacrum, then the joints and ligaments of the ring, then the gluteal, iliopsoas and pelvic floor muscles.';

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
    lead: 'The **sacroiliac joint** is the joint between the auricular surface of the sacrum and the ilium.',
    where: 'Lies at the back of the pelvis, between the sacral ala and the iliac auricular surface, with the joint line running obliquely from the posterior superior iliac spine downward.',
    relations: 'The anterior part has a synovial cavity; the posterior part is a strong syndesmosis of interosseous sacroiliac ligaments. The posterior and anterior sacroiliac ligaments, the iliolumbar ligament and the sacrotuberous and sacrospinous ligaments all reinforce it.',
    function: 'It transmits the weight of the upper body to the hip bones and allows a small amount of nutation and counternutation during walking and childbirth.',
    clinical: 'It is the first joint involved in ankylosing spondylitis, and its pain is felt in the buttock. Sacroiliac disruption is a major component of pelvic ring fractures.',
  },
  pubic_symphysis: {
    lead: 'The **pubic symphysis** is the midline joint between the bodies of the two pubic bones.',
    where: 'Lies in the midline below the umbilicus, in front of the bladder and urethra, at the lower end of the linea alba. It lies just below the pubic crest.',
    relations: 'A fibrocartilaginous disc unites the two hyaline-covered surfaces. The superior pubic ligament runs above and the inferior pubic ligament, or arcuate pubic ligament, below. The aponeuroses of the external oblique and the rectus sheath attach around it.',
    function: 'It holds the anterior pelvic ring together and allows slight movement, which increases in pregnancy under the influence of relaxin.',
    clinical: 'A gap over 10 mm is diastasis of the symphysis, seen after childbirth or pelvic trauma; it can cause groin pain and instability.',
  },
  hip_joint: {
    lead: 'The **hip joint** is the ball-and-socket joint between the femoral head and the acetabulum of the hip bone.',
    where: 'Lies deep in the groin, below the midpoint of the inguinal ligament and behind the femoral vessels. The groin crease overlies it, and the greater trochanter marks its lateral side.',
    relations: 'The acetabular labrum rims the socket. The capsule is reinforced by the iliofemoral, pubofemoral and ischiofemoral ligaments and by the zona orbicularis. The ligamentum teres runs from the acetabular notch to the fovea of the femoral head.',
    function: 'It allows flexion, extension, abduction, adduction, medial and lateral rotation and circumduction with great stability. The iliofemoral ligament is the strongest ligament in the body and limits extension.',
    clinical: 'The medial circumflex femoral artery supplies most of the femoral head, so a displaced femoral neck fracture risks avascular necrosis. Posterior dislocation may injure the sciatic nerve.',
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
    where: 'Forms the contour of the buttock. It arises from the posterior ilium behind the posterior gluteal line, the sacrum and coccyx, and the sacrotuberous ligament.',
    relations: 'Its upper border lies just below the iliac crest and its lower fibres blend with the iliotibial tract. The sciatic nerve and the posterior cutaneous nerve of the thigh lie deep to it. The inferior gluteal vessels and nerve enter its deep surface.',
    function: 'Extends and laterally rotates the hip; its upper fibres abduct and its lower fibres adduct. It is important for rising from sitting, climbing and running. Nerve: inferior gluteal nerve (L5, S1, S2).',
    origin: 'posterior ilium, sacrum, coccyx and sacrotuberous ligament.',
    insertion: 'iliotibial tract and gluteal tuberosity of the femur.',
    nerve: 'inferior gluteal nerve (L5, S1, S2)',
    clinical: 'It is used for intramuscular injections in its upper lateral quadrant. Weakness causes difficulty climbing stairs and rising from a chair.',
  },
  gluteus_medius: {
    lead: '**Gluteus medius** is the fan-shaped abductor on the lateral surface of the ilium.',
    where: 'Lies between the anterior and posterior gluteal lines, deep to the upper part of gluteus maximus and covered by the gluteal aponeurosis.',
    relations: 'The superior gluteal nerve and vessels run between it and gluteus minimus. The trochanteric bursa separates its tendon from the greater trochanter.',
    function: 'Abducts the hip and, with its anterior fibres, medially rotates it; it keeps the pelvis level in single-leg stance. Nerve: superior gluteal nerve (L4, L5, S1).',
    origin: 'ilium between the anterior and posterior gluteal lines.',
    insertion: 'lateral surface of the greater trochanter.',
    nerve: 'superior gluteal nerve (L4, L5, S1)',
    clinical: 'Weakness or superior gluteal nerve injury gives a positive Trendelenburg sign: the pelvis drops on the opposite side when standing on the affected leg.',
  },
  gluteus_minimus: {
    lead: '**Gluteus minimus** is the deepest and smallest of the three gluteal muscles.',
    where: 'Lies between the anterior and inferior gluteal lines, covered by gluteus medius, and runs to the front of the greater trochanter.',
    relations: 'Its tendon inserts on the anterior surface of the greater trochanter and often has a bursa deep to it. The superior gluteal nerve runs between it and gluteus medius.',
    function: 'Abducts and medially rotates the hip and stabilizes the femoral head in the acetabulum during walking. Nerve: superior gluteal nerve (L4, L5, S1).',
    origin: 'ilium between the anterior and inferior gluteal lines.',
    insertion: 'anterior surface of the greater trochanter.',
    nerve: 'superior gluteal nerve (L4, L5, S1)',
    clinical: 'It is a common site of tendon degeneration in greater trochanteric pain syndrome.',
  },
  piriformis: {
    lead: '**Piriformis** is the pear-shaped muscle that crosses the greater sciatic foramen.',
    where: 'Arises from the anterior surface of the sacrum between the S2 and S4 foramina, from the sacrotuberous ligament and the capsule of the sacroiliac joint. It passes through the greater sciatic foramen to the greater trochanter.',
    relations: 'The sciatic nerve emerges below it in most people; in about 10 to 15 percent the nerve splits and the common fibular part passes through the muscle. The superior gluteal nerve and vessels pass above it; the pudendal nerve and internal pudendal vessels cross the ischial spine below it.',
    function: 'Laterally rotates the extended hip and abducts the flexed hip; it stabilizes the femoral head. Nerve: nerve to piriformis (S1, S2).',
    origin: 'anterior sacrum between the S2 and S4 foramina, sacrotuberous ligament and sacroiliac capsule.',
    insertion: 'superior border of the greater trochanter.',
    nerve: 'nerve to piriformis (S1, S2)',
    clinical: 'Piriformis syndrome causes deep buttock pain with sciatic radiation, especially with sitting or internal rotation. The muscle is a key landmark for the gluteal approach to the hip.',
  },
  obturator_internus: {
    lead: '**Obturator internus** is the muscle that lines the inner wall of the pelvis and turns through the lesser sciatic foramen.',
    where: 'Arises from the pelvic surface of the obturator membrane and the surrounding ischiopubic ramus. Its tendon turns around the ischial spine through the lesser sciatic foramen to reach the greater trochanter.',
    relations: 'It forms the lateral wall of the ischioanal fossa and lines the lateral wall of the true pelvis. Its tendon is separated from the hip capsule by a bursa. The pudendal nerve runs in the obturator fascia on its medial side, in the pudendal canal.',
    function: 'Laterally rotates the extended hip and abducts the flexed hip; it stabilizes the hip. Nerve: nerve to obturator internus (L5, S1).',
    origin: 'pelvic surface of the obturator membrane and surrounding ischiopubic ramus.',
    insertion: 'medial surface of the greater trochanter.',
    nerve: 'nerve to obturator internus (L5, S1)',
    clinical: 'Its fascia forms the pudendal canal, so spasm or fibrosis can entrap the pudendal nerve. It is also a landmark in the ischioanal approach.',
  },
  iliacus: {
    lead: '**Iliacus** is the broad muscle that fills the iliac fossa and joins the psoas.',
    where: 'Arises from the iliac fossa, the inner lip of the iliac crest and the anterior sacroiliac ligaments. Its fibres converge on the iliopsoas tendon.',
    relations: 'It joins psoas major to form iliopsoas, which passes under the inguinal ligament and inserts on the lesser trochanter. The femoral nerve lies in the groove between iliacus and psoas. The iliac fascia covers it.',
    function: 'Flexes the hip and helps stabilize the pelvis on the femur during standing; with psoas major it is the main hip flexor. Nerve: femoral nerve (L2, L3).',
    origin: 'iliac fossa, inner lip of the iliac crest and anterior sacroiliac ligaments.',
    insertion: 'lesser trochanter, blending with the psoas tendon.',
    nerve: 'femoral nerve (L2, L3)',
    clinical: 'A psoas abscess can spread into the iliac fossa and present as a limp with hip flexion. Iliopsoas tightness limits hip extension.',
  },
  psoas_major: {
    lead: '**Psoas major** is the long muscle from the lumbar vertebrae to the lesser trochanter and the main flexor of the hip.',
    where: 'Arises from the sides of the T12 to L5 vertebral bodies and intervertebral discs and from the transverse processes of the lumbar vertebrae. It descends through the abdomen and pelvis to the lesser trochanter.',
    relations: 'The lumbar plexus lies within its substance. The ureter, gonadal vessels and abdominal aorta lie in front of it; the femoral nerve lies in the groove between it and iliacus. It passes under the inguinal ligament to form iliopsoas.',
    function: 'Flexes the hip and laterally flexes the lumbar spine; with both sides acting it flexes the trunk. Nerve: anterior rami of L1 to L3, with a small contribution from T12.',
    origin: 'sides of the T12 to L5 vertebral bodies and discs and the lumbar transverse processes.',
    insertion: 'lesser trochanter with iliacus.',
    nerve: 'anterior rami of L1 to L3, with a small contribution from T12',
    clinical: 'Psoas spasm causes the psoas sign in appendicitis and hip pathology. A psoas abscess can track down the muscle and present in the groin.',
  },
  coccygeus: {
    lead: '**Coccygeus**, also called ischiococcygeus, is the small triangular muscle behind the levator ani.',
    where: 'Arises from the ischial spine and the sacrospinous ligament and inserts on the lateral border of the coccyx and the lower sacrum.',
    relations: 'It lies on the pelvic surface of the sacrospinous ligament, with the pudendal nerve and internal pudendal vessels crossing just below the ischial spine. It completes the pelvic diaphragm with levator ani.',
    function: 'Supports the pelvic viscera and flexes the coccyx. Nerve: branches of the anterior rami of S4 and S5.',
    origin: 'ischial spine and sacrospinous ligament.',
    insertion: 'lateral border of the coccyx and lower sacrum.',
    nerve: 'branches of the anterior rami of S4 and S5',
    clinical: 'It can be injured in a fall onto the coccyx, contributing to coccydynia.',
  },
  pubococcygeus: {
    lead: '**Pubococcygeus** is the anterior part of levator ani, the main muscle of the pelvic floor.',
    where: 'Arises from the posterior surface of the pubis and the anterior part of the tendinous arch of levator ani on the obturator fascia. It runs back to the coccyx, the anococcygeal raphe and the perineal body.',
    relations: 'Its medial fibres surround the prostate in the male or the vagina in the female and blend with the perineal body. It lies above the urogenital hiatus and medial to iliococcygeus. The nerve to levator ani runs on its pelvic surface.',
    function: 'Supports the pelvic viscera, elevates the pelvic floor and helps maintain urinary and fecal continence by compressing the urethra and anus. Nerve: nerve to levator ani (S3, S4), with variable pudendal branches.',
    origin: 'posterior surface of the pubis and the anterior tendinous arch of levator ani.',
    insertion: 'coccyx, anococcygeal raphe, perineal body and the walls of the prostate or vagina.',
    nerve: 'nerve to levator ani (S3, S4), with variable pudendal branches',
    clinical: 'Weakness after childbirth or prostate surgery contributes to stress incontinence and prolapse. Kegel exercises train this muscle.',
  },
  iliococcygeus: {
    lead: '**Iliococcygeus** is the posterior and lateral part of levator ani.',
    where: 'Arises from the tendinous arch of levator ani on the obturator fascia and the ischial spine, then runs medially to the coccyx and the anococcygeal raphe.',
    relations: 'It lies behind pubococcygeus and in front of coccygeus, forming the funnel of the pelvic floor. The pudendal canal runs on the lateral wall of the ischioanal fossa below it.',
    function: 'Supports the pelvic floor and elevates the anorectal canal. Nerve: nerve to levator ani (S3, S4).',
    origin: 'tendinous arch of levator ani and the ischial spine.',
    insertion: 'coccyx and anococcygeal raphe.',
    nerve: 'nerve to levator ani (S3, S4)',
    clinical: 'It forms the posterior part of the levator plate, whose descent is seen in pelvic organ prolapse.',
  },
};

export const lessonCues = {
  hip_bone: 'Fused ilium, ischium and pubis around the socket',
  sacroiliac_joint: 'Auricular surfaces, strong behind',
  pubic_symphysis: 'Midline fibrocartilage between the pubic bodies',
  hip_joint: 'Femoral head in the deep socket',
  sacrotuberous_ligament: 'Band from the sacrum to the sitting bone',
  sacrospinous_ligament: 'Band from the sacrum to the ischial spine',
  iliolumbar_ligament: 'Band from L5 to the iliac crest',
  inguinal_ligament: 'Rolled edge of the external oblique',
  gluteus_maximus: 'Largest buttock muscle, extends the hip',
  gluteus_medius: 'Upper buttock abductor, keeps the pelvis level',
  gluteus_minimus: 'Deepest of the three buttock abductors',
  piriformis: 'The muscle the sciatic nerve passes beneath',
  obturator_internus: 'Inner pelvic wall muscle turning through the lesser foramen',
  iliacus: 'Fills the hollow of the ilium and joins the psoas',
  psoas_major: 'Long muscle from the lumbar vertebrae to the lesser trochanter',
  coccygeus: 'Small muscle on the sacrospinous ligament',
  pubococcygeus: 'Anterior part of the levator ani',
  iliococcygeus: 'Posterior part of the levator ani',
};

export const roundClues = {
  hip_bone: 'The three-part bone that forms each side of the pelvis.',
  sacroiliac_joint: 'The joint between the auricular surface of the sacrum and the ilium.',
  pubic_symphysis: 'The midline joint between the two pubic bones.',
  hip_joint: 'The ball-and-socket joint between the femoral head and the acetabulum.',
  sacrotuberous_ligament: 'The strong band that turns the greater sciatic notch into a foramen and runs to the sitting bone.',
  sacrospinous_ligament: 'The band from the ischial spine to the side of the sacrum and coccyx.',
  iliolumbar_ligament: 'The band from the fifth lumbar transverse process to the iliac crest.',
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
    'pelvis-2': 'The pelvic ring is held by strong joints and ligaments. Anteriorly the pubic symphysis is a fibrocartilaginous joint; posteriorly the sacroiliac joint is synovial in front and a syndesmosis behind. The sacrotuberous and sacrospinous ligaments convert the sciatic notches into foramina, the iliolumbar ligament braces L5, and the inguinal ligament spans the front of the hip bone. The hip joint is a deep ball-and-socket with the strongest ligament in the body.',
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
      { q: 'At which vertebral level does the iliac crest lie?', options: ['L4', 'T12', 'L1', 'S1'], answer: 0, why: 'The highest point of the iliac crest is at the level of L4, a key surface landmark.', exam: true },
      { q: 'Which part of the hip bone do you sit on?', options: ['Ischial tuberosity', 'Anterior superior iliac spine', 'Pubic tubercle', 'Acetabulum'], answer: 0, why: 'The ischial tuberosity is the lower posterior projection that bears weight in sitting.', exam: true },
      { q: 'The sacral promontory is the anterior projection of which structure?', options: ['The base of the sacrum at S1', 'The coccyx', 'The ischial spine', 'The fifth lumbar vertebra'], answer: 0, why: 'The promontory is the anterior superior edge of the S1 body and a landmark of the pelvic inlet.', exam: true },
    ],
    'pelvis-2': [
      { q: 'Which ligament converts the greater sciatic notch into the greater sciatic foramen?', options: ['Sacrotuberous ligament', 'Sacrospinous ligament', 'Iliolumbar ligament', 'Inguinal ligament'], answer: 0, why: 'The sacrotuberous ligament runs to the ischial tuberosity and completes the greater sciatic foramen with the sacrospinous ligament.', exam: true },
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
