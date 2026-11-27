// SpeedMSK · Bone atlas data.
// The individual bone meshes come from the generated skeleton catalog
// (site/subjects/msk/skeleton-parts.js, built from the local BodyParts3D OBJs).
// The atlas uses only these individual meshes; the older merged MSK meshes stay
// in the study pack but are not painted here.

import { SKELETON_PARTS, SKELETON_TYPES, SKELETON_GROUPS, SKELETON_MISSING } from './skeleton-parts.js?v=2';

const ALIASES = {
  frontal: ['frontal'],
  parietal: ['parietal', 'parietal bones'],
  temporal: ['temporal', 'temporal bones'],
  occipital: ['occipital'],
  sphenoid: ['sphenoid'],
  ethmoid: ['ethmoid'],
  nasal: ['nasal', 'nasal bones'],
  lacrimal: ['lacrimal', 'lacrimal bones'],
  zygomatic: ['zygomatic', 'cheekbone', 'cheek bone', 'zigomatico'],
  maxilla: ['maxilla', 'upper jaw', 'maxila'],
  palatine: ['palatine', 'palatino'],
  inf_concha: ['inferior nasal concha', 'inferior concha', 'concha nasal inferior'],
  vomer: ['vomer', 'vômer'],
  mandible: ['mandible', 'lower jaw', 'jaw', 'mandibula'],
  hyoid: ['hyoid', 'hyoid bone', 'hioide', 'osso hioide'],
  malleus: ['malleus', 'hammer', 'martelo'],
  incus: ['incus', 'anvil', 'bigorna'],
  stapes: ['stapes', 'stirrup', 'estribo'],
  atlas: ['atlas', 'c1', 'atlas c1', 'first cervical vertebra'],
  axis: ['axis', 'c2', 'axis c2', 'second cervical vertebra', 'áxis'],
  cervical: ['cervical vertebra', 'cervical vertebrae', 'cervical spine', 'vertebrae cervicales', 'vértebra cervical', 'vértebras cervicais'],
  thoracic: ['thoracic vertebra', 'thoracic vertebrae', 'thoracic spine', 'vertebrae thoracicae', 'vértebra torácica', 'vértebras torácicas'],
  lumbar: ['lumbar vertebra', 'lumbar vertebrae', 'lumbar spine', 'vertebrae lumbales', 'vértebra lombar', 'vértebras lombares'],
  sacrum: ['sacrum', 'sacral bone', 'sacro'],
  coccyx: ['coccyx', 'tailbone', 'cóccix'],
  sternum: ['sternum', 'breastbone', 'esterno'],
  rib: ['rib', 'ribs', 'costela', 'costelas'],
  hip: ['hip bone', 'hip', 'coxal bone', 'os coxae', 'osso do quadril', 'quadril'],
  clavicle: ['clavicle', 'collarbone', 'clavícula'],
  scapula: ['scapula', 'shoulder blade', 'escápula'],
  humerus: ['humerus', 'úmero'],
  radius: ['radius', 'rádio'],
  ulna: ['ulna'],
  scaphoid: ['scaphoid', 'escafoide'],
  lunate: ['lunate', 'semilunar'],
  triquetrum: ['triquetrum', 'triquetral', 'piramidal'],
  pisiform: ['pisiform', 'pisiforme'],
  trapezium: ['trapezium', 'trapézio'],
  trapezoid: ['trapezoid', 'trapezoide'],
  capitate: ['capitate', 'capitato'],
  hamate: ['hamate', 'hamato'],
  metacarpal: ['metacarpal', 'metacarpals', 'metacarpal bone', 'metacarpo', 'metacarpais'],
  proximal_ph_hand: ['proximal phalanx of the hand', 'proximal phalanges of the hand', 'proximal phalanx hand', 'falange proximal da mão', 'falanges proximais da mão'],
  middle_ph_hand: ['middle phalanx of the hand', 'middle phalanges of the hand', 'middle phalanx hand', 'falange média da mão', 'falanges médias da mão'],
  distal_ph_hand: ['distal phalanx of the hand', 'distal phalanges of the hand', 'distal phalanx hand', 'falange distal da mão', 'falanges distais da mão'],
  femur: ['femur', 'thigh bone', 'fêmur'],
  patella: ['patella', 'kneecap', 'patela', 'rótula'],
  tibia: ['tibia', 'shin bone', 'tíbia'],
  fibula: ['fibula', 'calf bone', 'fíbula'],
  talus: ['talus', 'tálus'],
  calcaneus: ['calcaneus', 'heel bone', 'calcâneo'],
  navicular: ['navicular', 'navicular bone'],
  med_cuneiform: ['medial cuneiform', 'cuneiforme medial'],
  int_cuneiform: ['intermediate cuneiform', 'cuneiforme intermédio'],
  lat_cuneiform: ['lateral cuneiform', 'cuneiforme lateral'],
  cuboid: ['cuboid', 'cuboide'],
  metatarsal: ['metatarsal', 'metatarsals', 'metatarsal bone', 'metatarso', 'metatarsais'],
  proximal_ph_foot: ['proximal phalanx of the foot', 'proximal phalanges of the foot', 'proximal phalanx foot', 'falange proximal do pé', 'falanges proximais do pé'],
  middle_ph_foot: ['middle phalanx of the foot', 'middle phalanges of the foot', 'middle phalanx foot', 'falange média do pé', 'falanges médias do pé'],
  distal_ph_foot: ['distal phalanx of the foot', 'distal phalanges of the foot', 'distal phalanx foot', 'falange distal do pé', 'falanges distais do pé'],
};

const CUES = {
  frontal: ['Forehead, orbital roofs and the floor of the anterior cranial fossa.', 'Testa, teto das órbitas e assoalho da fossa anterior do crânio.'],
  parietal: ['Paired vault plates between the coronal and lambdoid sutures.', 'Placas pares do teto entre as suturas coronal e lambdoide.'],
  temporal: ['Houses the inner ear; the mastoid and zygomatic processes are palpable.', 'Aloja a orelha interna; os processos mastoide e zigomático são palpáveis.'],
  occipital: ['Surrounds the foramen magnum and carries the occipital condyles.', 'Circunda o forame magno e sustenta os côndilos occipitais.'],
  sphenoid: ['Butterfly-shaped bone at the skull base holding the sella turcica.', 'Osso em forma de borboleta na base do crânio que aloja a sela turca.'],
  ethmoid: ['Sieve-like bone between the orbits and the nasal cavity.', 'Osso cribriforme entre as órbitas e a cavidade nasal.'],
  nasal: ['Paired bridge bones of the nose.', 'Ossos pares que formam a ponte do nariz.'],
  lacrimal: ['Small bone in the medial orbital wall, in front of the ethmoid.', 'Pequeno osso na parede medial da órbita, à frente do etmoide.'],
  zygomatic: ['Cheekbone that builds the lateral orbital wall.', 'Osso da bochecha que forma a parede lateral da órbita.'],
  maxilla: ['Upper jaw, orbital floor and most of the hard palate.', 'Maxilar superior, assoalho da órbita e maior parte do palato duro.'],
  palatine: ['L-shaped bone behind the maxilla in the hard palate.', 'Osso em L atrás da maxila, no palato duro.'],
  inf_concha: ['Scroll-like bone on the lateral wall of the nasal cavity.', 'Osso em forma de concha na parede lateral da cavidade nasal.'],
  vomer: ['Posterior part of the nasal septum.', 'Parte posterior do septo nasal.'],
  mandible: ['Lower jaw; the only movable bone of the skull.', 'Maxilar inferior; o único osso móvel do crânio.'],
  hyoid: ['U-shaped neck bone that articulates with no other bone.', 'Osso em U do pescoço que não se articula com nenhum outro osso.'],
  malleus: ['Outermost auditory ossicle; its handle attaches to the eardrum.', 'Ossículo mais lateral da orelha média; seu cabo se prende ao tímpano.'],
  incus: ['Middle auditory ossicle bridging the malleus and stapes.', 'Ossículo intermediário da orelha média entre o martelo e o estribo.'],
  stapes: ['Innermost stirrup-shaped ossicle; its footplate sits in the oval window.', 'Menor osso do corpo, em forma de estribo; sua base se apoia na janela oval.'],
  atlas: ['First cervical vertebra; it carries the skull and nods.', 'Primeira vértebra cervical; sustenta o crânio e permite a flexão.'],
  axis: ['Second cervical vertebra; its dens lets the head turn.', 'Segunda vértebra cervical; seu dente permite girar a cabeça.'],
  cervical: ['Five small vertebrae (C3–C7) with transverse foramina.', 'Cinco vértebras pequenas (C3–C7) com forames transversos.'],
  thoracic: ['Twelve vertebrae that carry the ribs.', 'Doze vértebras que sustentam as costelas.'],
  lumbar: ['Five large weight-bearing vertebrae.', 'Cinco vértebras grandes que suportam peso.'],
  sacrum: ['Five fused vertebrae between the hip bones.', 'Cinco vértebras fundidas entre os ossos do quadril.'],
  coccyx: ['Tailbone below the sacrum formed by three to five fused coccygeal vertebrae.', 'Osso terminal abaixo do sacro formado por três a cinco vértebras coccígeas fundidas.'],
  sternum: ['Manubrium, body and xiphoid process in the midline.', 'Manúbrio, corpo e processo xifoide na linha média.'],
  rib: ['Twelve pairs: 1–7 true, 8–10 false, 11–12 floating.', 'Doze pares: 1–7 verdadeiras, 8–10 falsas, 11–12 flutuantes.'],
  hip: ['Ilium, ischium and pubis fused into the hip bone.', 'Ílio, ísquio e púbis fundidos no osso do quadril.'],
  clavicle: ['S-shaped strut between the sternum and the acromion.', 'Escora em S entre o esterno e o acrômio.'],
  scapula: ['Flat triangle behind the ribs with a spine and a glenoid cavity.', 'Triângulo plano atrás das costelas, com espinha e cavidade glenoide.'],
  humerus: ['Arm bone; its head meets the shallow glenoid socket.', 'Osso do braço; sua cabeça se articula com a cavidade glenoide.'],
  radius: ['Lateral forearm bone, wide at the wrist.', 'Osso lateral do antebraço, largo no punho.'],
  ulna: ['Medial forearm bone; the olecranon forms the elbow point.', 'Osso medial do antebraço; o olecrano forma a ponta do cotovelo.'],
  scaphoid: ['Carpal on the thumb side that bridges the wrist and fractures easily.', 'Carpal do lado do polegar que atravessa o punho e fratura com facilidade.'],
  lunate: ['Moon-shaped carpal that articulates with the radius.', 'Carpal em forma de lua que se articula com o rádio.'],
  triquetrum: ['Pyramidal carpal on the medial side of the wrist.', 'Carpal piramidal na face medial do punho.'],
  pisiform: ['Pea-shaped carpal on the palmar side of the triquetrum.', 'Carpal em forma de ervilha na face palmar do piramidal.'],
  trapezium: ['Carpal at the base of the thumb; it forms the thumb carpometacarpal joint.', 'Carpal na base do polegar; forma a articulação carpometacarpal do polegar.'],
  trapezoid: ['Carpal between the trapezium and capitate, under the index metacarpal.', 'Carpal entre o trapézio e o capitato, sob o segundo metacarpal.'],
  capitate: ['Largest carpal, in the centre of the wrist.', 'Maior osso do carpo, no centro do punho.'],
  hamate: ['Carpal with the hook-like hamulus on the little-finger side.', 'Carpal com o gancho (hamulo) do lado do dedo mínimo.'],
  metacarpal: ['Five long bones of the palm, numbered from the thumb.', 'Cinco ossos longos da palma, numerados a partir do polegar.'],
  proximal_ph_hand: ['First phalanx of each finger; the thumb has one.', 'Primeira falange de cada dedo; o polegar tem uma.'],
  middle_ph_hand: ['Middle phalanx of fingers 2–5; the thumb has none.', 'Falange média dos dedos 2–5; o polegar não tem.'],
  distal_ph_hand: ['Fingertip phalanx of each finger.', 'Falange da ponta de cada dedo.'],
  femur: ['Thigh bone, the longest and strongest in the body.', 'Osso da coxa, o mais longo e resistente do corpo.'],
  patella: ['Sesamoid bone inside the quadriceps tendon.', 'Osso sesamoide dentro do tendão do quadríceps.'],
  tibia: ['Main weight-bearing bone of the leg.', 'Principal osso que suporta peso na perna.'],
  fibula: ['Thin lateral leg bone that does not carry weight.', 'Osso fino e lateral da perna que não suporta peso.'],
  talus: ['Ankle bone that carries the tibia and transmits weight to the foot.', 'Osso do tornozelo que recebe a tíbia e transmite peso ao pé.'],
  calcaneus: ['Heel bone; the largest tarsal.', 'Osso do calcanhar; o maior osso do tarso.'],
  navicular: ['Tarsal between the talus and the cuneiforms.', 'Osso do tarso entre o tálus e os cuneiformes.'],
  med_cuneiform: ['Medial tarsal at the base of the first metatarsal.', 'Cuneiforme medial na base do primeiro metatarsal.'],
  int_cuneiform: ['Middle tarsal at the base of the second metatarsal.', 'Cuneiforme intermédio na base do segundo metatarsal.'],
  lat_cuneiform: ['Lateral tarsal at the base of the third metatarsal.', 'Cuneiforme lateral na base do terceiro metatarsal.'],
  cuboid: ['Tarsal on the lateral side, in front of the calcaneus.', 'Osso do tarso lateral, à frente do calcâneo.'],
  metatarsal: ['Five long bones of the foot, numbered from the big toe.', 'Cinco ossos longos do pé, numerados a partir do hálux.'],
  proximal_ph_foot: ['First toe phalanx; the big toe has one.', 'Primeira falange de cada dedo do pé; o hálux tem uma.'],
  middle_ph_foot: ['Middle toe phalanx of toes 2–5; the big toe has none.', 'Falange média dos dedos 2–5; o hálux não tem.'],
  distal_ph_foot: ['Terminal toe phalanx of each toe.', 'Falange terminal de cada dedo do pé.'],
};

const GROUP_ALIASES = {
  neurocranium: ['neurocranium', 'cranial vault', 'braincase', 'skull', 'neurocrânio', 'crânio'],
  face: ['facial skeleton', 'facial bones', 'viscerocranium', 'face bones', 'esqueleto facial', 'ossos da face'],
  cervical: ['cervical vertebrae', 'cervical spine', 'vértebras cervicais'],
  thoracic: ['thoracic vertebrae', 'thoracic spine', 'vértebras torácicas'],
  lumbar: ['lumbar vertebrae', 'lumbar spine', 'vértebras lombares'],
  sacrum: ['sacrum', 'sacro'],
  ribs: ['ribs', 'rib cage', 'costelas', 'caixa torácica'],
  sternum: ['sternum', 'breastbone', 'esterno'],
  pelvis: ['pelvic girdle', 'pelvis', 'hip bones', 'cintura pélvica', 'quadril'],
  shoulder: ['shoulder girdle', 'pectoral girdle', 'shoulder bones', 'cintura escapular'],
  arm: ['upper arm', 'arm', 'braço'],
  forearm: ['forearm', 'radius and ulna', 'antebraço'],
  carpals: ['carpals', 'carpal bones', 'wrist bones', 'ossos do carpo', 'carpo'],
  metacarpals: ['metacarpals', 'metacarpal bones', 'metacarpais'],
  hand_phalanges: ['hand phalanges', 'phalanges of the hand', 'falanges da mão', 'falanges dos dedos da mão'],
  thigh: ['thigh', 'femur', 'coxa', 'fêmur'],
  knee: ['knee', 'patella', 'kneecap', 'joelho', 'patela', 'rótula'],
  leg: ['leg', 'tibia and fibula', 'perna'],
  tarsals: ['tarsals', 'tarsal bones', 'ankle bones', 'ossos do tarso', 'tarso'],
  metatarsals: ['metatarsals', 'metatarsal bones', 'metatarsais'],
  foot_phalanges: ['foot phalanges', 'phalanges of the foot', 'falanges do pé', 'falanges dos dedos do pé'],
};

const GROUP_CUES = {
  neurocranium: ['The cranial bones that enclose the brain.', 'Os ossos do crânio que envolvem o encéfalo.'],
  face: ['Bones that build the face, the jaws and the nasal cavity.', 'Ossos que formam a face, as maxilas e a cavidade nasal.'],
  cervical: ['Seven cervical vertebrae, C1 to C7.', 'Sete vértebras cervicais, C1 a C7.'],
  thoracic: ['Twelve thoracic vertebrae, T1 to T12.', 'Doze vértebras torácicas, T1 a T12.'],
  lumbar: ['Five lumbar vertebrae, L1 to L5.', 'Cinco vértebras lombares, L1 a L5.'],
  sacrum: ['Five fused vertebrae between the hip bones.', 'Cinco vértebras fundidas entre os ossos do quadril.'],
  ribs: ['Twelve pairs of ribs around the thoracic cavity.', 'Doze pares de costelas ao redor da cavidade torácica.'],
  sternum: ['Manubrium, body and xiphoid process.', 'Manúbrio, corpo e processo xifoide.'],
  pelvis: ['The two hip bones that ring the pelvic cavity.', 'Os dois ossos do quadril que formam o anel da pelve.'],
  shoulder: ['Clavicle and scapula suspending the upper limb.', 'Clavícula e escápula que suspendem o membro superior.'],
  arm: ['The humerus between shoulder and elbow.', 'O úmero entre o ombro e o cotovelo.'],
  forearm: ['Radius and ulna between elbow and wrist.', 'Rádio e ulna entre o cotovelo e o punho.'],
  carpals: ['The eight carpal bones of each wrist.', 'Os oito ossos do carpo de cada punho.'],
  metacarpals: ['The five metacarpals of each palm.', 'Os cinco metacarpais de cada palma.'],
  hand_phalanges: ['Fourteen phalanges in each hand.', 'Catorze falanges em cada mão.'],
  thigh: ['The femur between hip and knee.', 'O fêmur entre o quadril e o joelho.'],
  knee: ['The patella guarding the front of the knee.', 'A patela protegendo a frente do joelho.'],
  leg: ['Tibia and fibula between knee and ankle.', 'Tíbia e fíbula entre o joelho e o tornozelo.'],
  tarsals: ['The seven tarsal bones of each ankle and hindfoot.', 'Os sete ossos do tarso de cada tornozelo e retropé.'],
  metatarsals: ['The five metatarsals of each foot.', 'Os cinco metatarsais de cada pé.'],
  foot_phalanges: ['Fourteen phalanges in each foot; the big toe has two.', 'Catorze falanges em cada pé; o hálux tem duas.'],
};

const cleanKeys = values => [...new Set(values.filter(Boolean))];

const TYPES_BY_KEY = Object.fromEntries(SKELETON_TYPES.map(type => [type.key, type]));
const EN_ORDINAL = number => number === 1 ? '1st' : number === 2 ? '2nd' : number === 3 ? '3rd' : `${number}th`;
const SIDE_EN = side => side === 'l' ? 'Left' : 'Right';
const SIDE_PT_M = side => side === 'l' ? 'esquerdo' : 'direito';
const SIDE_PT_F = side => side === 'l' ? 'esquerda' : 'direita';
const SEGMENT_EN = code => code === 'pph' ? 'proximal' : code === 'mph' ? 'middle' : 'distal';
const SEGMENT_PT = code => code === 'pph' ? 'proximal' : code === 'mph' ? 'média' : 'distal';

// Compact names for the individual-mesh list. They match the way the Bone
// Atlas names single bones: "Right 7th rib", "T5", "Left middle phalanx of
// 3rd finger"; everything else uses the anatomical catalog name.
function compactPartName(part) {
  const rib = part.id.match(/^rib(\d+)_([lr])$/);
  if (rib) {
    const number = Number(rib[1]);
    const side = rib[2];
    return [`${SIDE_EN(side)} ${EN_ORDINAL(number)} rib`, `${number}ª costela ${SIDE_PT_F(side)}`];
  }
  const vertebra = part.id.match(/^([ctl])(\d+)$/);
  if (vertebra) {
    const code = `${vertebra[1].toUpperCase()}${vertebra[2]}`;
    return [code, code];
  }
  const metacarpal = part.id.match(/^mc(\d+)_([lr])$/);
  if (metacarpal) {
    const number = Number(metacarpal[1]);
    const side = metacarpal[2];
    return [`${SIDE_EN(side)} ${EN_ORDINAL(number)} metacarpal`, `${number}º metacarpal ${SIDE_PT_M(side)}`];
  }
  const metatarsal = part.id.match(/^mt(\d+)_([lr])$/);
  if (metatarsal) {
    const number = Number(metatarsal[1]);
    const side = metatarsal[2];
    return [`${SIDE_EN(side)} ${EN_ORDINAL(number)} metatarsal`, `${number}º metatarsal ${SIDE_PT_M(side)}`];
  }
  const phalanx = part.id.match(/^(pph|mph|dph)(\d+)_(hand|foot)_([lr])$/);
  if (phalanx) {
    const code = phalanx[1];
    const number = Number(phalanx[2]);
    const limb = phalanx[3];
    const side = phalanx[4];
    const segment = SEGMENT_EN(code);
    const segmentPt = SEGMENT_PT(code);
    if (limb === 'hand') {
      const digit = number === 1 ? 'thumb' : `${EN_ORDINAL(number)} finger`;
      const digitPt = number === 1 ? 'polegar' : `${number}º dedo`;
      return [`${SIDE_EN(side)} ${segment} phalanx of ${digit}`, `Falange ${segmentPt} do ${digitPt} ${SIDE_PT_M(side)}`];
    }
    const digit = number === 1 ? 'big toe' : `${EN_ORDINAL(number)} toe`;
    const digitPt = number === 1 ? 'hálux' : `${number}º dedo do pé`;
    return [`${SIDE_EN(side)} ${segment} phalanx of ${digit}`, `Falange ${segmentPt} do ${digitPt} ${SIDE_PT_M(side)}`];
  }
  return [part.en, part.pt];
}

const COMPACT_NAMES = Object.fromEntries(SKELETON_PARTS.map(part => [part.id, compactPartName(part)]));

export const BONE_IMPORTANT = SKELETON_TYPES.map(type => ({
  key: type.key,
  area: type.area,
  ids: type.ids,
  name: [type.en, type.pt],
  say: [type.sayEn, type.sayPt],
  keys: cleanKeys([type.en, type.pt, type.sayEn, type.sayPt, ...(ALIASES[type.key] || [])]),
  cue: CUES[type.key] || ['Bone of the skeleton.', 'Osso do esqueleto.'],
}));

// Every individual mesh as its own entry, named for its side and number.
export const BONE_ALL = SKELETON_PARTS.map(part => {
  const type = TYPES_BY_KEY[part.type];
  const names = COMPACT_NAMES[part.id] || [part.en, part.pt];
  return {
    key: part.id,
    area: part.area,
    ids: [part.id],
    name: names,
    say: names,
    keys: cleanKeys([names[0], names[1], part.en, part.pt]),
    cue: type ? (CUES[type.key] || ['Bone of the skeleton.', 'Osso do esqueleto.'])
      : ['Bone of the skeleton.', 'Osso do esqueleto.'],
  };
});

// Bone types covered by the professor's MSK material. The evidence file is
// research/prof_slides/cobertura/bone_atlas_professor_list.md. Hand and foot
// bones are not part of her bone coverage; the atlas shows them in the other
// two lists only.
export const BONE_PROFESSOR_KEYS = [
  'frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid',
  'nasal', 'lacrimal', 'zygomatic', 'maxilla', 'palatine', 'inf_concha', 'vomer', 'mandible', 'hyoid',
  'atlas', 'axis', 'cervical', 'thoracic', 'lumbar', 'sacrum',
  'sternum', 'rib', 'hip',
  'clavicle', 'scapula', 'humerus', 'radius', 'ulna',
  'femur', 'patella', 'tibia', 'fibula',
];

export const BONE_PROFESSOR = BONE_IMPORTANT.filter(entry => BONE_PROFESSOR_KEYS.includes(entry.key));

export const BONE_GENERAL = SKELETON_GROUPS.map(group => ({
  key: `group:${group.key}`,
  area: group.area,
  ids: group.ids,
  name: [group.en, group.pt],
  say: [group.en, group.pt],
  keys: cleanKeys([group.en, group.pt, ...(GROUP_ALIASES[group.key] || [])]),
  cue: GROUP_CUES[group.key] || ['Group of bones of the skeleton.', 'Grupo de ossos do esqueleto.'],
}));

export const BONE_MEMBER_NAMES = Object.fromEntries(SKELETON_PARTS.map(entry => [entry.id, COMPACT_NAMES[entry.id] || [entry.en, entry.pt]]));
export const BONE_IDS = BONE_IMPORTANT.flatMap(entry => entry.ids);
export const BONE_MISSING = SKELETON_MISSING;

// Bone ids used by the older MSK study regions (merged pairs, ribs, vertebrae,
// sternum, tarsals, metatarsals, toe phalanges). The atlas does not paint them.
export const LEGACY_BONE_IDS = [
  'frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'mandible', 'zygomatic', 'nasal', 'vomer', 'palatine',
  'atlas', 'axis', 'cervical_vertebra', 'thoracic_vertebra', 'lumbar_vertebra', 'sacrum',
  'sternum', 'ribs', 'hip_bone', 'clavicle', 'scapula', 'humerus', 'radius', 'ulna',
  'tarsal_bones', 'metatarsals', 'toe_phalanges', 'femur', 'patella', 'tibia', 'fibula',
];

const idsFor = areas => SKELETON_PARTS.filter(entry => areas.includes(entry.area)).map(entry => entry.id);

export const BONE_AREAS = [
  { id: 'all', name: ['Whole body', 'Corpo inteiro'], view: 'ant', ids: BONE_IDS,
    note: ['208 individual bone meshes (206 bones), combining BodyParts3D with Z-Anatomy coccyx and ear ossicles.', '208 malhas ósseas individuais (206 ossos), combinando BodyParts3D com cóccix e ossículos da orelha do Z-Anatomy.'] },
  { id: 'skull', name: ['Skull', 'Crânio'], view: 'ant', ids: idsFor(['skull']),
    note: ['Cranial and facial bones, hyoid included. Deep bones sit inside the vault.', 'Ossos do crânio e da face, incluindo o hioide. Ossos profundos ficam dentro da abóbada.'] },
  { id: 'axial', name: ['Axial / trunk', 'Axial / tronco'], view: 'ant', ids: idsFor(['spine', 'thorax', 'pelvis']),
    note: ['Vertebral column, ribs, sternum and both hip bones.', 'Coluna vertebral, costelas, esterno e ambos os ossos do quadril.'] },
  { id: 'upper', name: ['Upper limb', 'Membro superior'], view: 'ant', ids: idsFor(['upper', 'hand']),
    note: ['Shoulder girdle, arm, forearm and every bone of the hand.', 'Cintura escapular, braço, antebraço e todos os ossos da mão.'] },
  { id: 'hand', name: ['Hand', 'Mão'], view: 'ant', ids: idsFor(['hand']),
    note: ['Carpals, metacarpals and all phalanges of the hand.', 'Ossos do carpo, metacarpais e todas as falanges da mão.'] },
  { id: 'lower', name: ['Lower limb', 'Membro inferior'], view: 'ant', ids: idsFor(['lower', 'foot']),
    note: ['Thigh, knee, leg and every bone of the foot.', 'Coxa, joelho, perna e todos os ossos do pé.'] },
  { id: 'foot', name: ['Foot', 'Pé'], view: 'sup', ids: idsFor(['foot']),
    note: ['Tarsals, metatarsals and all toe phalanges.', 'Ossos do tarso, metatarsais e todas as falanges dos dedos do pé.'] },
];
