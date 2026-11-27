// SpeedMSK typing pilot · cranium: what passes through each opening, and the eye muscles' nerves.
// Source: standard anatomy + subjects/msk/regions/skull.js, checked against the professor's slides (01_skull).
// Required answers stay the core; the extra contents the slides also list are named in each set's rule.
const V3 = ['mandibular nerve', 'nervo mandibular', 'v3', 'cn v3'];
const V2 = ['maxillary nerve', 'nervo maxilar', 'v2', 'cn v2'];
const MMA = ['middle meningeal artery', 'artéria meníngea média'];
const CN3 = ['oculomotor nerve', 'nervo oculomotor', 'cn iii', 'iii', 'oculomotor'];
const CN4 = ['trochlear nerve', 'nervo troclear', 'cn iv', 'iv', 'troclear'];
const CN6 = ['abducens nerve', 'nervo abducente', 'cn vi', 'vi', 'abducente'];
const GPAL_N = ['greater palatine nerve', 'nervo palatino maior'];
const GPAL_V = ['greater palatine vessels', 'vasos palatinos maiores'];
const LPAL_N = ['lesser palatine nerve', 'nervo palatino menor'];
const LPAL_V = ['lesser palatine vessels', 'vasos palatinos menores'];
const p = (en, pt) => [`What passes through the ${en}?`, `O que passa pelo ${pt}?`];
const e = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];

export default {
  id: 'cranium',
  rewards: true, // pilot: micro-rewards (rewards.js)
  title: ['Cranium', 'Crânio'],
  sets: [
    {
      id: 'sphenoid-row', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'zygomatic', 'nasal'], d3anchor: ['sphenoid', 'occipital', 'temporal'], d3frame: ['frontal', 'occipital', 'temporal'],
      title: ['Sphenoid row · what passes', 'Fileira do esfenoide · o que passa'],
      rule: ['On each side of the sphenoid, front to back: superior orbital fissure (V1) → rotundum (V2) → ovale (V3) → spinosum (middle meningeal artery). The slides add: ovale also carries the lesser petrosal nerve and the accessory meningeal artery; spinosum also carries the meningeal branch of V3.',
        'De cada lado do esfenoide, de frente para trás: fissura orbital superior (V1) → redondo (V2) → oval (V3) → espinhoso (artéria meníngea média). Os slides acrescentam: o oval também leva o nervo petroso menor e a artéria meníngea acessória; o espinhoso também leva o ramo meníngeo do V3.'],
      items: [
        { id: 'rotundum', rule: ['The sphenoid doors give V1, V2, V3 in order, front to back. Rotundum is the 2nd → V2, the maxillary nerve.', 'As portas do esfenoide dão V1, V2, V3 em ordem, de frente para trás. O redondo é a 2ª → V2, o nervo maxilar.'], d3: { focus: ['foramen_rotundum', 'foramen_rotundum_path'], view: 'inf_oblique', frame: ['sphenoid', 'occipital', 'temporal'], glass: .15 }, q: p('foramen rotundum', 'forame redondo'), a: [V2] },
        { id: 'ovale', rule: ['3rd door of the sphenoid row → V3, the mandibular nerve.', '3ª porta da fileira do esfenoide → V3, o nervo mandibular.'], d3: { focus: ['foramen_ovale', 'foramen_ovale_path'], view: 'inf_oblique', frame: ['sphenoid', 'occipital', 'temporal'], glass: .15 }, q: p('foramen ovale (main nerve)', 'forame oval (nervo principal)'), a: [V3] },
        { id: 'spinosum', rule: ['Last and smallest door, just behind ovale: the middle meningeal artery.', 'Última e menor porta, logo atrás do oval: a artéria meníngea média.'], d3: { focus: ['foramen_spinosum', 'foramen_spinosum_path'], view: 'inf_oblique', frame: ['sphenoid', 'occipital', 'temporal'], glass: .15 }, q: p('foramen spinosum (artery)', 'forame espinhoso (artéria)'), a: [MMA] },
      ],
    },
    {
      id: 'pterygopalatine', d3ctx: ['sphenoid', 'palatine', 'maxilla', 'vomer', 'ethmoid', 'temporal'], d3anchor: ['sphenoid', 'palatine'], d3frame: ['sphenoid', 'palatine', 'maxilla'],
      title: ['Pterygopalatine fossa · doors', 'Fossa pterigopalatina · portas'],
      rule: ['Pterygopalatine fossa doors: lacerum + pterygoid canal (greater petrosal nerve), sphenopalatine foramen (to the nose), palatine and incisive foramina (to the palate).',
        'Portas da fossa pterigopalatina: lacerado + canal pterigóideo (nervo petroso maior), forame esfenopalatino (para o nariz), forames palatinos e incisivo (para o palato).'],
      items: [
        { id: 'lacerum', rule: ['Filled with cartilage in life; the only nerve that crosses it is the greater petrosal.', 'Preenchido por cartilagem em vida; o único nervo que o cruza é o petroso maior.'], d3: { focus: ['temporal'], view: 'inf_oblique', frame: ['sphenoid', 'temporal', 'occipital'], glass: .15 }, q: p('foramen lacerum (nerve)', 'forame lacerado (nervo)'), a: [['greater petrosal nerve', 'nervo petroso maior', 'greater petrosal nerves', 'nervos petrosos maiores', 'greater superficial petrosal nerve']] },
        { id: 'pterygoid-canal', rule: ['The greater petrosal nerve enters this canal and takes its name: nerve of the pterygoid (Vidian) canal.', 'O nervo petroso maior entra neste canal e ganha o nome dele: nervo do canal pterigóideo (vidiano).'], d3: { focus: ['sphenoid'], view: 'inf_oblique', frame: ['sphenoid', 'palatine'], glass: .15 }, q: p('pterygoid canal (Vidian canal)', 'canal pterigóideo (canal vidiano)'), a: [['nerve of the pterygoid canal', 'nervo do canal pterigóideo', 'vidian nerve', 'nervo vidiano']] },
        { id: 'sphenopalatine', rule: ['Same name as what passes: the sphenopalatine artery, into the nasal cavity.', 'Mesmo nome do que passa: a artéria esfenopalatina, para a cavidade nasal.'], d3: { focus: ['palatine'], view: 'inf_oblique', frame: ['palatine', 'sphenoid', 'maxilla'], glass: .15 }, q: p('sphenopalatine foramen (artery)', 'forame esfenopalatino (artéria)'), a: [['sphenopalatine artery', 'artéria esfenopalatina']] },
        { id: 'greater-palatine', rule: ['Same name as what passes: greater palatine nerve + greater palatine vessels.', 'Mesmo nome do que passa: nervo palatino maior + vasos palatinos maiores.'], d3: { focus: ['palatine'], view: 'inf', frame: ['palatine', 'maxilla'], glass: .15 }, q: p('greater palatine foramen (nerve + vessels)', 'forame palatino maior (nervo + vasos)'), a: [GPAL_N, GPAL_V] },
        { id: 'lesser-palatine', rule: ['Same pattern, one size down: lesser palatine nerve + lesser palatine vessels.', 'Mesmo padrão, um tamanho menor: nervo palatino menor + vasos palatinos menores.'], d3: { focus: ['palatine'], view: 'inf', frame: ['palatine', 'maxilla'], glass: .15 }, q: p('lesser palatine foramen (nerve + vessels)', 'forame palatino menor (nervo + vasos)'), a: [LPAL_N, LPAL_V] },
        { id: 'incisive', rule: ['Front of the palate: nasopalatine nerve + greater palatine vessels.', 'Frente do palato: nervo nasopalatino + vasos palatinos maiores.'], d3: { focus: ['maxilla'], view: 'inf', frame: ['maxilla', 'palatine'], glass: .15 }, q: p('incisive foramen (nerve + vessels)', 'forame incisivo (nervo + vasos)'), a: [['nasopalatine nerve', 'nervo nasopalatino', 'nasopalatine nerves', 'nervos nasopalatinos'], GPAL_V] },
      ],
    },
    {
      id: 'posterior', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'zygomatic', 'nasal'], d3anchor: ['sphenoid', 'occipital', 'temporal'], d3frame: ['frontal', 'occipital', 'temporal'],
      title: ['Posterior fossa · what passes', 'Fossa posterior · o que passa'],
      rule: ['Foramen magnum = medulla + vertebral arteries. Jugular foramen = "9-10-11" + internal jugular vein.',
        'Forame magno = bulbo + artérias vertebrais. Forame jugular = "9-10-11" + veia jugular interna.'],
      items: [
        { id: 'magnum', rule: ['Where the brainstem meets the spinal cord: medulla oblongata + vertebral arteries.', 'Onde o tronco encontra a medula: bulbo + artérias vertebrais.'], d3: { focus: ['foramen_magnum', 'foramen_magnum_path'], view: 'inf_oblique', frame: ['sphenoid', 'occipital', 'temporal'], glass: .15 }, q: p('foramen magnum (2 things)', 'forame magno (2 estruturas)'), a: [['medulla oblongata', 'bulbo', 'medulla', 'medula oblonga'], ['vertebral arteries', 'artérias vertebrais', 'vertebral artery', 'artéria vertebral']] },
        { id: 'jugular', rule: ['"9-10-11 + the jugular": glossopharyngeal, vagus, accessory + internal jugular vein.', '"9-10-11 + a jugular": glossofaríngeo, vago, acessório + veia jugular interna.'], d3: { focus: ['jugular_foramen', 'jugular_foramen_path'], view: 'inf_oblique', frame: ['sphenoid', 'occipital', 'temporal'], glass: .15 }, q: p('jugular foramen (3 nerves + 1 vein)', 'forame jugular (3 nervos + 1 veia)'), a: [['glossopharyngeal nerve', 'nervo glossofaríngeo', 'ix', 'cn ix'], ['vagus nerve', 'nervo vago', 'x', 'cn x'], ['accessory nerve', 'nervo acessório', 'xi', 'cn xi'], ['internal jugular vein', 'veia jugular interna']] },
      ],
    },
    {
      id: 'eye', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'zygomatic', 'nasal'], d3anchor: ['sphenoid', 'occipital', 'temporal'], d3frame: ['frontal', 'occipital', 'temporal'],
      title: ['Eye muscles · innervation', 'Músculos do olho · inervação'],
      rule: ['LR6 SO4, the rest 3: Lateral Rectus = abducens (VI), Superior Oblique = trochlear (IV); every other eye muscle (and levator palpebrae) = oculomotor (III).',
        'LR6 SO4, o resto 3: Reto Lateral = abducente (VI), Oblíquo Superior = troclear (IV); todos os outros músculos do olho (e o levantador da pálpebra) = oculomotor (III).'],
      items: [
        { id: 'lr', rule: ['LR6: Lateral Rectus = abducens (VI).', 'LR6: Reto Lateral = abducente (VI).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('lateral rectus', 'reto lateral'), a: [CN6] },
        { id: 'so', rule: ['SO4: Superior Oblique = trochlear (IV).', 'SO4: Oblíquo Superior = troclear (IV).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('superior oblique', 'oblíquo superior'), a: [CN4] },
        { id: 'mr', rule: ['LR6 SO4, the rest 3: not LR, not SO → oculomotor (III).', 'LR6 SO4, o resto 3: não é RL nem OS → oculomotor (III).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('medial rectus', 'reto medial'), a: [CN3] },
        { id: 'sr', rule: ['LR6 SO4, the rest 3: not LR, not SO → oculomotor (III).', 'LR6 SO4, o resto 3: não é RL nem OS → oculomotor (III).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('superior rectus', 'reto superior'), a: [CN3] },
        { id: 'ir', rule: ['LR6 SO4, the rest 3: not LR, not SO → oculomotor (III).', 'LR6 SO4, o resto 3: não é RL nem OS → oculomotor (III).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('inferior rectus', 'reto inferior'), a: [CN3] },
        { id: 'io', rule: ['LR6 SO4, the rest 3: not LR, not SO → oculomotor (III).', 'LR6 SO4, o resto 3: não é RL nem OS → oculomotor (III).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('inferior oblique', 'oblíquo inferior'), a: [CN3] },
        { id: 'lps', rule: ['Levator palpebrae counts in "the rest 3" → oculomotor (III).', 'O levantador da pálpebra entra no "resto 3" → oculomotor (III).'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path', 'optic_canal', 'optic_canal_path'], view: 'ant', note: ['Nerves to the eye muscles enter the orbit through the superior orbital fissure.', 'Os nervos dos músculos do olho entram na órbita pela fissura orbital superior.'] }, q: e('levator palpebrae superioris', 'levantador da pálpebra superior'), a: [CN3] },
      ],
    },
    {
      id: 'orbit-ear', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'zygomatic', 'nasal'], d3anchor: ['sphenoid', 'occipital', 'temporal'], d3frame: ['frontal', 'occipital', 'temporal'],
      title: ['Orbit and ear · what passes', 'Órbita e orelha · o que passa'],
      rule: ['Each opening carries the nerve(s) of where it leads: orbit (II, III, IV, VI, V1), ear (VII, VIII), nose (I), tongue (XII).',
        'Cada abertura leva o(s) nervo(s) do lugar aonde vai: órbita (II, III, IV, VI, V1), orelha (VII, VIII), nariz (I), língua (XII).'],
      items: [
        { id: 'optic', rule: ['Optic canal: optic nerve + ophthalmic artery.', 'Canal óptico: nervo óptico + artéria oftálmica.'], d3: { focus: ['optic_canal', 'optic_canal_path'], view: 'ant', frame: ['sphenoid', 'frontal'], glass: .15 }, q: p('optic canal (2 things)', 'canal óptico (2 estruturas)'), a: [['optic nerve', 'nervo óptico', 'ii', 'cn ii'], ['ophthalmic artery', 'artéria oftálmica']] },
        { id: 'sof', rule: ['Every nerve that moves the eye (III, IV, VI) + V1, the ophthalmic nerve.', 'Todos os nervos que movem o olho (III, IV, VI) + V1, o nervo oftálmico.'], d3: { focus: ['superior_orbital_fissure', 'superior_orbital_fissure_path'], view: 'ant', frame: ['sphenoid', 'frontal'], glass: .15 }, q: p('superior orbital fissure (4 nerves)', 'fissura orbital superior (4 nervos)'), a: [CN3, CN4, CN6, ['ophthalmic nerve', 'nervo oftálmico', 'v1', 'cn v1']] },
        { id: 'iam', rule: ['"7 and 8 go to the ear": facial (VII) + vestibulocochlear (VIII).', '"7 e 8 vão para a orelha": facial (VII) + vestibulococlear (VIII).'], q: p('internal acoustic meatus (2 nerves)', 'meato acústico interno (2 nervos)'), a: [['facial nerve', 'nervo facial', 'vii', 'cn vii'], ['vestibulocochlear nerve', 'nervo vestibulococlear', 'viii', 'cn viii']] },
        { id: 'hypoglossal', rule: ['Same name as what passes: hypoglossal nerve (XII).', 'Mesmo nome do que passa: nervo hipoglosso (XII).'], q: p('hypoglossal canal', 'canal do hipoglosso'), a: [['hypoglossal nerve', 'nervo hipoglosso', 'xii', 'cn xii']] },
        { id: 'cribriform', rule: ['The sieve in the roof of the nose: olfactory nerves (I).', 'A peneira no teto do nariz: nervos olfatórios (I).'], q: p('cribriform plate', 'lâmina cribriforme'), a: [['olfactory nerve', 'nervo olfatório', 'olfactory nerves', 'nervos olfatórios', 'i', 'cn i']] },
        { id: 'stylomastoid', rule: ['Between the styloid and the mastoid: the facial nerve (VII) leaves the skull here.', 'Entre o estiloide e o mastoide: o nervo facial (VII) sai do crânio aqui.'], q: p('stylomastoid foramen', 'forame estilomastóideo'), a: [['facial nerve', 'nervo facial', 'vii', 'cn vii']] },
        { id: 'carotid', rule: ['Same name as what passes: internal carotid artery.', 'Mesmo nome do que passa: artéria carótida interna.'], q: p('carotid canal', 'canal carótico'), a: [['internal carotid artery', 'artéria carótida interna']] },
        { id: 'petrotympanic', rule: ['The chorda tympani leaves the skull through this fissure.', 'A corda do tímpano sai do crânio por esta fissura.'], d3: { focus: ['temporal'], view: 'inf', frame: ['temporal', 'mandible'], glass: .15 }, q: p('petrotympanic fissure (nerve)', 'fissura petrotimpânica (nervo)'), a: [['chorda tympani', 'corda do tímpano', 'chorda tympani nerve', 'nervo corda do tímpano']] },
      ],
    },
    {
      id: 'face', d3ctx: ['frontal', 'parietal', 'temporal', 'occipital', 'sphenoid', 'ethmoid', 'maxilla', 'zygomatic', 'nasal', 'mandible'], d3anchor: ['mandible', 'maxilla'], d3frame: ['mandible', 'maxilla'],
      title: ['Face · what passes', 'Face · o que passa'],
      rule: ['V1 → V2 → V3 exits line up under the pupil: supraorbital, infraorbital, mental.',
        'As saídas V1 → V2 → V3 ficam alinhadas abaixo da pupila: supraorbital, infraorbital, mentual.'],
      items: [
        { id: 'infraorbital', rule: ['V1 → V2 → V3 exits line up under the pupil. Under the orbit is the middle one: V2\'s infraorbital nerve.', 'As saídas V1 → V2 → V3 ficam alinhadas abaixo da pupila. Sob a órbita fica a do meio: o nervo infraorbital, do V2.'], d3: { focus: ['infraorbital_foramen', 'infraorbital_foramen_path'], view: 'ant', frame: ['maxilla'], glass: .15 }, q: p('infraorbital foramen', 'forame infraorbital'), a: [['infraorbital nerve', 'nervo infraorbital']] },
        { id: 'mental', rule: ['Lowest exit of the line under the pupil (V3): the mental nerve.', 'Saída mais baixa da linha abaixo da pupila (V3): o nervo mentual.'], d3: { focus: ['mental_foramen', 'mental_foramen_path'], view: 'ant', frame: ['mandible'], glass: .15 }, q: p('mental foramen', 'forame mentual'), a: [['mental nerve', 'nervo mentual', 'nervo mentoniano']] },
        { id: 'mandibular-foramen', rule: ['Where V3 enters the mandible: the inferior alveolar bundle (it exits at the mental foramen).', 'Onde o V3 entra na mandíbula: o feixe alveolar inferior (que sai pelo forame mentual).'], d3: { focus: ['mandible'], view: 'esq', frame: ['mandible'], glass: .15 }, q: p('mandibular foramen (bundle)', 'forame mandibular (feixe)'), a: [['inferior alveolar nerve bundle', 'feixe alveolar inferior', 'inferior alveolar neurovascular bundle', 'feixe neurovascular alveolar inferior', 'inferior alveolar bundle', 'inferior alveolar nerve', 'nervo alveolar inferior', 'inferior alveolar vessels', 'vasos alveolares inferiores']] },
      ],
    },
  ],
};
