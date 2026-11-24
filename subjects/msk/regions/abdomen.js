// SpeedMSK · Abdominal wall.
// Canonical answers avoid hyphens; hyphenated forms live in alt so Round 1
// can be typed letter by letter. The inguinal ligament is owned by pelvis.js
// and is only referenced here.

const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });

export const deck = {
  id: 'abdomen',
  titulo: 'Abdominal wall & inguinal region',
  cor: '#b08a5a',
  ctx: ['external_oblique', 'linea_alba', 'hip_bone'],
  itens: [
    S('external_oblique', 'External oblique', 'External oblique muscle', ['external oblique muscle', 'obliquus externus abdominis', 'external abdominal oblique'], 'Outermost sheet between the lower ribs and iliac crest. Fibers run down and inward', [
      'Superficial flat layer between the lower ribs and iliac crest. Its fibers run down and medially.',
      'Compresses the abdomen and flexes the trunk. One side rotates the trunk to the opposite side. Supplied by anterior rami of T7–T11 and the subcostal nerve (T12).',
      'Arises from the external surfaces of ribs 5 to 12. Inserts on the linea alba, pubic tubercle and anterior half of the iliac crest.',
    ]),
    S('linea_alba', 'Linea alba', 'Linea alba', ['white line', 'linea alba of abdomen'], 'Midline seam between the paired sheaths of the straight belly muscles', [
      'It runs from the xiphoid process to the pubic symphysis and is formed by the decussating aponeuroses of the flat abdominal muscles.',
      'It is relatively avascular and is used for midline laparotomy incisions.',
      'The umbilical ring is a gap in it, and widening between the rectus muscles is divarication of the recti.',
    ]),
    S('superficial_inguinal_ring', 'Superficial inguinal ring', 'Superficial inguinal ring', ['external inguinal ring', 'superficial ring', 'subcutaneous inguinal ring'], 'Triangular exit just above and medial to the pubic tubercle', [
      'It lies above and medial to the pubic tubercle and is bounded by the medial and lateral crura and the intercrural fibres.',
      'It transmits the spermatic cord in the male and the round ligament of the uterus in the female.',
      'The ilioinguinal nerve emerges through it; an indirect hernia can exit here.',
    ]),
    S('deep_inguinal_ring', 'Deep inguinal ring', 'Deep inguinal ring', ['internal inguinal ring', 'deep ring', 'internal ring'], 'Opening in the transversalis fascia lateral to the epigastric vessels', [
      'It lies about 1.25 cm above the midpoint of the inguinal ligament and lateral to the inferior epigastric vessels.',
      'It is the internal opening of the inguinal canal; the spermatic cord or round ligament enters here.',
      'An indirect inguinal hernia passes through it, lateral to the inferior epigastric vessels.',
    ]),
    S('rectus_sheath', 'Rectus sheath', 'Rectus sheath', ['rectus abdominis sheath', 'sheath of rectus abdominis'], 'Fibrous covering around the paired straight muscles beside the midline seam', [
      'It is formed by the aponeuroses of the external oblique, internal oblique and transversus abdominis.',
      'Between the costal margin and arcuate line, external oblique and anterior internal oblique pass in front. Posterior internal oblique and transversus pass behind.',
      'Below the arcuate line all three aponeuroses pass anteriorly, leaving only transversalis fascia behind the rectus.',
    ]),
    S('arcuate_line', 'Arcuate line', 'Arcuate line', ['semicircular line', 'semicircular line of Douglas', 'arcuate line of Douglas'], 'Curved lower edge of the posterior rectus sheath', [
      'It is the free inferior margin of the posterior layer of the rectus sheath, about midway between the umbilicus and the pubic crest.',
      'The inferior epigastric vessels enter the rectus sheath at this level.',
      'Below it the rectus abdominis lies directly on the transversalis fascia.',
    ]),
  ],
};

export const region = { id: 'abdomen', title: 'Abdominal wall', area: 'Abdomen' };

export const levels = [
  { title: 'Bony frame', ids: ['lumbar_vertebra', 'hip_bone', 'ribs'] },
  { title: 'Abdominal wall muscles', ids: ['external_oblique', 'psoas_major', 'iliacus', 'linea_alba'] },
  { title: 'Inguinal region', ids: ['inguinal_ligament', 'superficial_inguinal_ring', 'deep_inguinal_ring', 'rectus_sheath', 'arcuate_line'] },
  { title: '30L origins, insertions and the inguinal canal', bonus: true, ids: ['external_oblique', 'psoas_major', 'iliacus'] },
];

export const colors = {
  external_oblique: '#c76a58',
  linea_alba: '#e8dcc8',
  superficial_inguinal_ring: '#e0b45a', deep_inguinal_ring: '#e0b45a',
  rectus_sheath: '#d7a94c', arcuate_line: '#d7a94c',
};

export const markers = {
  superficial_inguinal_ring: [[20.6, -51.8, 847.4], [-20.4, -51.8, 847.4]],
  deep_inguinal_ring: [[42.0, -20.8, 930.6], [-41.9, -20.8, 930.6]],
  rectus_sheath: [[23.3, -41.4, 1053.4], [-23.2, -41.4, 1053.4]],
  arcuate_line: [0.1, -36.6, 1053.4],
};

// Anchor bones for each point marker and the view that shows it best.
export const markerMeta = {
  superficial_inguinal_ring: { anchors: ['hip_bone'], view: 'ant' },
  deep_inguinal_ring: { anchors: ['hip_bone'], view: 'ant' },
  rectus_sheath: { anchors: ['linea_alba', 'hip_bone'], view: 'ant' },
  arcuate_line: { anchors: ['linea_alba', 'hip_bone'], view: 'ant' },
};

export const purpose = 'Layers of the abdominal wall and the two inguinal openings.';

export const overview = 'Find the superficial muscle between the lower ribs and iliac crest. Trace its aponeurosis toward the rectus sheath and inguinal ligament. Compare the two inguinal rings using the pubic tubercle and inferior epigastric vessels.';

export const lessons = {
  external_oblique: {
    lead: 'The **external oblique** is the largest and most superficial flat muscle of the abdominal wall.',
    where: 'Superficial flat layer between the lower ribs and iliac crest. Its fibers run down and medially.',
    relations: 'Internal oblique lies deep to it. Its aponeurosis meets the rectus sheath medially and forms the inguinal ligament below.',
    function: 'Compresses the abdomen and flexes the trunk. One side rotates the trunk to the opposite side. Supplied by anterior rami of T7–T11 and the subcostal nerve (T12).',
    origin: 'external surfaces of ribs 5 to 12.',
    insertion: 'linea alba, pubic tubercle and anterior half of the iliac crest.',
    nerve: 'anterior rami of T7 to T11 and the subcostal nerve (T12)',
    clinical: 'Its aponeurosis is opened in inguinal hernia repair, and a lumbar hernia can emerge through the inferior lumbar triangle between it, latissimus dorsi and the iliac crest.',
  },
  linea_alba: {
    lead: 'The **linea alba** is the white midline raphe of the anterior abdominal wall.',
    where: 'Runs vertically from the xiphoid process to the pubic symphysis between the two rectus sheaths. It is broad above the umbilicus and narrows below; the umbilical ring lies in it.',
    relations: 'It is formed by the decussating aponeuroses of the external oblique, internal oblique and transversus abdominis. The rectus muscles lie on either side, and the peritoneum and transversalis fascia lie behind.',
    function: 'It anchors the aponeuroses at the midline and transmits the pull of the flat muscles without a bony attachment. It is relatively avascular, which makes it a safe line for surgical incisions.',
    clinical: 'Midline laparotomy incisions pass through it. Divarication of the recti widens it after pregnancy, and an umbilical hernia passes through the umbilical ring.',
  },
  superficial_inguinal_ring: {
    lead: 'The **superficial inguinal ring** is the triangular opening of the inguinal canal in the external oblique aponeurosis.',
    where: 'Lies just above and medial to the pubic tubercle, at the medial end of the inguinal ligament. The medial crus attaches to the pubic symphysis and the lateral crus to the pubic tubercle.',
    relations: 'The intercrural fibres cross the crura and close the upper part of the ring. The spermatic cord in the male or the round ligament in the female passes through it, and the ilioinguinal nerve emerges through it.',
    function: 'The cord or round ligament and the ilioinguinal nerve leave the canal through this opening.',
    clinical: 'An indirect inguinal hernia passes through the deep ring and can reach this ring, producing a groin swelling above and medial to the pubic tubercle.',
  },
  deep_inguinal_ring: {
    lead: 'The **deep inguinal ring** is the internal opening of the inguinal canal in the transversalis fascia.',
    where: 'Lies about 1.25 cm above the midpoint of the inguinal ligament, lateral to the inferior epigastric vessels and deep to the internal oblique.',
    relations: 'The inferior epigastric vessels lie medial to it. The spermatic cord or round ligament enters with the genital branch of the genitofemoral nerve. The ilioinguinal nerve joins the canal farther along.',
    function: 'It is the gateway from the abdominal cavity into the inguinal canal. The oblique course of the canal from this ring to the superficial ring helps prevent herniation.',
    clinical: 'An indirect inguinal hernia enters through this ring, lateral to the inferior epigastric vessels. It is the landmark that separates indirect from direct hernias at laparoscopic repair.',
  },
  rectus_sheath: {
    lead: 'The **rectus sheath** is the fibrous compartment that encloses the rectus abdominis and pyramidalis.',
    where: 'Extends from the costal margin to the pubic crest, on each side of the linea alba. It contains the rectus abdominis, pyramidalis, the superior and inferior epigastric vessels and the anterior rami of T7 to T12.',
    relations: 'Between the costal margin and arcuate line, external oblique and half the internal oblique aponeurosis pass in front. The rest of internal oblique and the transversus aponeurosis pass behind. Below the arcuate line, all three pass in front and transversalis fascia lies behind.',
    function: 'It holds the rectus muscle in place and keeps its line of pull vertical. It also protects the epigastric vessels and the terminal thoracic nerves.',
    clinical: 'A rectus sheath hematoma follows rupture of the inferior epigastric vessels; below the arcuate line it can spread freely because there is no posterior aponeurotic wall.',
  },
  arcuate_line: {
    lead: 'The **arcuate line** is the curved lower edge of the posterior layer of the rectus sheath.',
    where: 'Lies on the posterior surface of the rectus abdominis, about midway between the umbilicus and the pubic crest. Its exact level varies with body habitus.',
    relations: 'The inferior epigastric vessels ascend behind rectus abdominis into the sheath. Below the line, transversalis fascia lies behind rectus abdominis.',
    function: 'It marks the transition where the aponeuroses of the internal oblique and transversus pass from behind the rectus to in front of it. It is a key landmark for the layered anatomy of the anterior abdominal wall.',
    clinical: 'A Spigelian hernia occurs at the semilunar line, usually below this level, and the weak posterior wall below the line explains the spread of rectus sheath hematomas.',
  },
};

export const lessonCues = {
  external_oblique: 'Outermost sheet between the lower ribs and iliac crest. Fibers run down and inward',
  linea_alba: 'Midline seam between the paired sheaths of the straight belly muscles',
  superficial_inguinal_ring: 'Triangular exit just above and medial to the pubic tubercle',
  deep_inguinal_ring: 'Opening in the transversalis fascia beside the epigastric vessels',
  rectus_sheath: 'Fibrous covering around the paired straight muscles beside the midline seam',
  arcuate_line: 'Curved lower edge of the posterior rectus sheath',
};

export const roundClues = {
  external_oblique: 'Outermost sheet between the lower ribs and iliac crest. Fibers run down and inward',
  linea_alba: 'Midline seam between the paired sheaths of the straight belly muscles',
  superficial_inguinal_ring: 'Triangular exit just above and medial to the pubic tubercle',
  deep_inguinal_ring: 'The opening in the transversalis fascia lateral to the inferior epigastric vessels.',
  rectus_sheath: 'Fibrous covering around the paired straight muscles beside the midline seam',
  arcuate_line: 'The curved lower edge of the posterior wall of the rectus sheath.',
};

export const content = {
  REGION_OVERVIEW: { abdomen: overview },
  LESSON_CUES: lessonCues,
  ROUND_CLUES: roundClues,
  LEVEL_OVERVIEW: {
    'abdomen-1': 'The abdominal wall is built on the lumbar spine, the upper parts of the hip bones and the lower ribs. The lumbar vertebrae carry the weight of the trunk, the iliac crest marks the L4 level, and the costal cartilages of ribs 7 to 10 form the costal margin. These bones also give attachment to the abdominal muscles and the diaphragm.',
    'abdomen-2': 'The flat muscles of the abdominal wall compress and rotate the trunk. External oblique is the most superficial, with fibres running down and forward; its aponeurosis helps form the linea alba and the inguinal ligament. Psoas major and iliacus lie behind the wall and flex the hip. The linea alba is the midline seam where the aponeuroses cross.',
    'abdomen-3': 'The inguinal region is the weak point of the lower abdominal wall. The inguinal ligament spans from the anterior superior iliac spine to the pubic tubercle. The superficial ring lies in the external oblique aponeurosis, the deep ring in the transversalis fascia lateral to the inferior epigastric vessels, and the canal between them carries the spermatic cord in the male and the round ligament in the female. The rectus sheath and its arcuate line explain the layered wall.',
    'abdomen-30l': 'Bonus level: origins, insertions and the inguinal canal. Fix the costal origin of external oblique, the lumbar origin of psoas major and the iliac fossa origin of iliacus, then test the canal. Its anterior wall is the external oblique aponeurosis, its posterior wall the transversalis fascia reinforced medially by the conjoint tendon, its roof the arching internal oblique and transversus, and its floor the inguinal and lacunar ligaments. It carries the spermatic cord in the male and the round ligament in the female, with the ilioinguinal nerve in both sexes. This is optional and does not block the next region.',
  },
  LEVEL_CONTRAST: {
    'abdomen-1': { a: 'lumbar_vertebra', b: 'hip_bone', title: 'Lumbar vertebra or hip bone', text: 'The lumbar vertebra is axial, with a body, a triangular canal and transverse processes; the hip bone is appendicular, formed by ilium, ischium and pubis. The lumbar spine carries the trunk and gives origin to psoas major; the iliac crest marks L4 and receives the abdominal wall muscles. Both frame the posterior and lateral abdominal wall.' },
    'abdomen-2': { a: 'external_oblique', b: 'psoas_major', title: 'External oblique or psoas major', text: 'External oblique is superficial, arises from the ribs and rotates the trunk; psoas major is deep, arises from the lumbar vertebrae and flexes the hip. One belongs to the abdominal wall, the other to the posterior abdominal wall and iliopsoas. Their nerves differ: thoracic rami for the flat muscle, lumbar rami for the psoas.' },
    'abdomen-3': { a: 'superficial_inguinal_ring', b: 'deep_inguinal_ring', title: 'Superficial or deep inguinal ring', text: 'Both are openings of the inguinal canal. The superficial ring is a defect in the external oblique aponeurosis above and medial to the pubic tubercle; the deep ring is a defect in the transversalis fascia lateral to the inferior epigastric vessels. The canal runs between them, and indirect hernias enter at the deep ring.' },
    'abdomen-30l': { a: 'psoas_major', b: 'iliacus', title: 'Psoas major or iliacus', text: 'Both flex the hip and join to insert on the lesser trochanter. Psoas major arises from T12 to L5 and is supplied by anterior rami L1 to L3; iliacus arises from the iliac fossa and is supplied by the femoral nerve. The lumbar plexus lies within psoas major, while iliacus lies in the false pelvis.' },
  },
  LEVEL_CHECK: {
    'abdomen-1': [
      { q: 'At which level is the line between the highest points of the iliac crests classically drawn?', options: ['L4', 'T12', 'L2', 'S1'], answer: 0, why: 'The intercristal line is an approximate landmark for L4 or the L4–L5 interspace.', exam: true },
      { q: 'How many lumbar vertebrae are there?', options: ['Five', 'Seven', 'Twelve', 'Four'], answer: 0, why: 'There are five lumbar vertebrae, L1 to L5, between the thoracic spine and the sacrum.', exam: true },
      { q: 'The costal margin is formed by the costal cartilages of which ribs?', options: ['Ribs 7 to 10', 'Ribs 1 to 6', 'Ribs 11 and 12', 'Ribs 5 to 12'], answer: 0, why: 'The costal margin is the arch formed by the cartilages of ribs 7 to 10; ribs 11 and 12 are floating ribs without anterior cartilage.', exam: true },
      { q: 'Which ribs have free anterior ends?', options: ['Ribs 11 and 12', 'Ribs 7 and 8', 'Ribs 9 and 10', 'Ribs 5 and 6'], answer: 0, why: 'Ribs 11 and 12 end in the abdominal wall. Their short cartilages do not attach to the sternum or the cartilage above.', exam: true },
    ],
    'abdomen-2': [
      { q: 'Where does external oblique arise?', options: ['External surfaces of ribs 5 to 12', 'Lumbar vertebral bodies', 'Iliac fossa', 'Pubic tubercle'], answer: 0, why: 'External oblique arises from the external surfaces of ribs 5 to 12 and inserts on the linea alba, pubic tubercle and anterior iliac crest.', exam: true },
      { q: 'Which action is produced by the external oblique?', options: ['Rotation of the trunk to the opposite side', 'Rotation of the trunk to the same side', 'Extension of the trunk', 'Elevation of the scapula'], answer: 0, why: 'The external oblique rotates the trunk to the opposite side; the internal oblique rotates it to the same side.', exam: true },
      { q: 'Which nerve supplies psoas major?', options: ['Anterior rami of L1 to L3', 'Femoral nerve only', 'Subcostal nerve only', 'Superior gluteal nerve'], answer: 0, why: 'Psoas major is supplied by the anterior rami of L1 to L3, with a small contribution from T12.', exam: true },
      { q: 'Which nerve supplies iliacus?', options: ['Femoral nerve (L2, L3)', 'Obturator nerve', 'Anterior rami of L1 to L3', 'Sciatic nerve'], answer: 0, why: 'Iliacus is supplied by the femoral nerve (L2, L3), while psoas major uses the anterior lumbar rami.', exam: true },
      { q: 'The linea alba is formed by the aponeuroses of which muscles?', options: ['External oblique, internal oblique and transversus abdominis', 'External oblique and rectus abdominis only', 'Internal oblique and psoas major', 'Transversus abdominis and quadratus lumborum'], answer: 0, why: 'The aponeuroses of the three flat abdominal muscles decussate at the midline to form the linea alba.', exam: true },
    ],
    'abdomen-3': [
      { q: 'Which structure forms the anterior wall of the inguinal canal?', options: ['External oblique aponeurosis', 'Transversalis fascia', 'Inguinal ligament', 'Conjoint tendon'], answer: 0, why: 'The anterior wall is the external oblique aponeurosis, reinforced laterally by the internal oblique.', exam: true },
      { q: 'The deep inguinal ring lies in which relation to the inferior epigastric vessels?', options: ['Lateral', 'Medial', 'Posterior', 'Inferior'], answer: 0, why: 'The deep ring is lateral to the inferior epigastric vessels; this relation separates indirect from direct hernias.', exam: true },
      { q: 'Which structures are contents of the spermatic cord?', options: ['Ductus deferens, testicular artery and pampiniform plexus', 'Round ligament of the uterus and uterine artery', 'Femoral artery and femoral vein', 'Obturator nerve and obturator artery'], answer: 0, why: 'The cord contains the ductus deferens, testicular artery, pampiniform plexus, lymphatics, autonomic nerves and the genital branch of the genitofemoral nerve.', exam: true },
      { q: 'Which uterine structure passes through the inguinal canal?', options: ['Round ligament of the uterus', 'Spermatic cord', 'Ovarian ligament', 'Uterine tube'], answer: 0, why: 'The round ligament of the uterus traverses the canal toward the labium majus.', exam: true },
      { q: 'The inguinal ligament attaches between which two points?', options: ['Anterior superior iliac spine and pubic tubercle', 'Posterior superior iliac spine and ischial spine', 'Anterior inferior iliac spine and pubic symphysis', 'Iliac crest and sacrum'], answer: 0, why: 'It runs from the anterior superior iliac spine to the pubic tubercle as the lower border of the external oblique aponeurosis.', exam: true },
      { q: 'What lies immediately behind rectus abdominis below the arcuate line?', options: ['Transversalis fascia', 'External oblique aponeurosis', 'Internal oblique aponeurosis', 'Transversus abdominis aponeurosis'], answer: 0, why: 'All three aponeuroses pass in front of the rectus. Transversalis fascia lies directly behind it.', exam: true },
    ],
    'abdomen-30l': [
      { q: 'Where does external oblique insert?', options: ['Linea alba, pubic tubercle and anterior iliac crest', 'Lesser trochanter', 'Iliac fossa', 'Lumbar transverse processes'], answer: 0, why: 'Its aponeurosis inserts on the linea alba, pubic tubercle and anterior half of the iliac crest.', exam: true },
      { q: 'Where does psoas major arise?', options: ['T12 to L5 vertebral bodies, discs and lumbar transverse processes', 'Iliac fossa only', 'Ischial spine', 'Lower six ribs'], answer: 0, why: 'Psoas major arises from the sides of T12 to L5, the intervening discs and the lumbar transverse processes.', exam: true },
      { q: 'Where does iliacus arise?', options: ['Iliac fossa and inner lip of the iliac crest', 'Lumbar vertebral bodies', 'Pubic tubercle', 'Ischial tuberosity'], answer: 0, why: 'Iliacus fills the iliac fossa and arises from it, the inner iliac crest and the anterior sacroiliac ligaments.', exam: true },
      { q: 'The conjoint tendon is formed by the aponeuroses of which muscles?', options: ['Internal oblique and transversus abdominis', 'External oblique and internal oblique', 'External oblique and transversus abdominis', 'Rectus abdominis and pyramidalis'], answer: 0, why: 'The conjoint tendon is the combined aponeurosis of internal oblique and transversus abdominis and reinforces the posterior wall medially.', exam: true },
      { q: 'Which structure forms the roof of the inguinal canal?', options: ['Arching fibres of internal oblique and transversus abdominis', 'External oblique aponeurosis', 'Inguinal ligament', 'Transversalis fascia'], answer: 0, why: 'The roof is formed by the arching lower fibres of internal oblique and transversus abdominis.', exam: true },
      { q: 'What can reinforce the posterior wall of the inguinal canal near the pubic tubercle?', options: ['Conjoint tendon', 'External oblique aponeurosis', 'Inguinal ligament', 'Internal oblique muscle'], answer: 0, why: 'Transversalis fascia forms the posterior wall. The conjoint tendon can reinforce it medially.', exam: true },
      { q: 'Which structures form the floor of the inguinal canal?', options: ['Inguinal ligament and lacunar ligament', 'External oblique aponeurosis and internal oblique', 'Transversalis fascia and conjoint tendon', 'Internal oblique and transversus abdominis'], answer: 0, why: 'The floor is the inguinal ligament, with the lacunar ligament at its medial end.', exam: true },
      { q: 'Which nerve runs in the inguinal canal but does not pass through the deep ring?', options: ['Ilioinguinal nerve', 'Genital branch of the genitofemoral nerve', 'Iliohypogastric nerve', 'Subcostal nerve'], answer: 0, why: 'The ilioinguinal nerve enters the canal from the side and exits the superficial ring; the genital branch of the genitofemoral nerve enters through the deep ring with the cord.', exam: true },
    ],
  },
};

export const viewHints = {
  post: ['lumbar_vertebra', 'external_oblique'],
  ant: ['external_oblique', 'linea_alba', 'rectus_sheath'],
};
