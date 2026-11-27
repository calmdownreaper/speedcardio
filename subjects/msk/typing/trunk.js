// Source: standard anatomy. To be checked against the professor's slides.
// SpeedMSK typing · trunk: diaphragm, chest wall, abdominal wall and the back/scapular muscles.
const PHR = ['phrenic nerve', 'nervo frênico'];
const LTN = ['long thoracic nerve', 'nervo torácico longo'];
const DSN = ['dorsal scapular nerve', 'nervo escapular dorsal'];
const SAN = ['spinal accessory nerve', 'nervo acessório', 'accessory nerve', 'CN XI', 'XI'];
const ICN = ['intercostal nerves', 'nervos intercostais'];
const RAMI = ['posterior rami of spinal nerves', 'ramos posteriores dos nervos espinais'];
const LUMB = ['anterior rami of T7 to T11', 'ramos anteriores de T7 a T11', 'thoracoabdominal nerves', 'nervos toracoabdominais'];
const C35 = ['C3, C4 and C5', 'C3-C5', 'C3 to C5', 'C3, C4, C5'];
const SITS = ['ribs', 'sternum', 'thoracic_vertebra'];
const RETRACT = ['retraction of scapula', 'retração da escapula', 'retração da escápula'];
const ELEV = ['elevation of scapula', 'elevação da escápula'];
const n = (en, pt) => [`Innervation of ${en}?`, `Inervação do ${pt}?`];
const o = (en, pt) => [`Origin of ${en}?`, `Origem do ${pt}?`];
const i = (en, pt) => [`Insertion of ${en}?`, `Inserção do ${pt}?`];
const f = (en, pt) => [`Main action of ${en}?`, `Função principal do ${pt}?`];

export default {
  id: 'trunk',
  title: ['Trunk', 'Tronco'],
  sets: [
    {
      id: 'breathing', d3ctx: [...SITS, 'lumbar_vertebra', 'cervical_vertebra'], d3anchor: ['ribs', 'sternum'], d3frame: ['ribs', 'sternum', 'thoracic_vertebra'],
      title: ['Breathing · diaphragm and intercostals', 'Respiração · diafragma e intercostais'],
      rule: ['Diaphragm = phrenic n. (C3–C5), the only breathing muscle from the cervical cord. Intercostals keep their own segmental supply from the intercostal nerves. External intercostals elevate, internal intercostals depress the ribs.',
        'Diafragma = n. frênico (C3–C5), único músculo respiratório da medula cervical. Os intercostais mantêm sua inervação segmentar pelos nervos intercostais. Os intercostais externos elevam, os internos deprimem as costelas.'],
      items: [
        { id: 'dia-n', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'ribs'], glass: .12 }, q: n('diaphragm', 'diafragma'), a: [PHR] },
        { id: 'dia-o', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'ribs'], glass: .12 }, q: o('diaphragm', 'diafragma'), a: [['xiphoid process', 'processo xifoide', 'sternal part', 'parte esternal'], ['internal surfaces of the lower six ribs and costal cartilages', 'faces internas das seis costelas e cartilagens costais inferiores', 'lower six ribs and cartilages', 'seis costelas inferiores e cartilagens'], ['lumbar crura', 'pilares lombares', 'right crus (L1-L3) and left crus (L1-L2)', 'pilar direito (L1-L3) e pilar esquerdo (L1-L2)'], ['medial and lateral arcuate ligaments', 'ligamentos arqueados medial e lateral']] },
        { id: 'dia-i', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'sternum'], glass: .12 }, q: i('diaphragm', 'diafragma'), a: [['central tendon', 'centro tendíneo', 'trifoliate central tendon', 'centro tendíneo trifoliado', 'central aponeurosis', 'aponeurose central']] },
        { id: 'dia-f', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'ribs'], glass: .12 }, q: f('diaphragm', 'diafragma'), a: [['inspiration', 'inspiração'], ['flattens the domes', 'achata as cúpulas', 'descends during inspiration', 'desce na inspiração', 'dome descends', 'a cúpula desce']] },
        { id: 'ic-n', d3: { focus: ['intercostals_external', 'intercostals_internal'], view: 'esq', frame: ['intercostals_external', 'ribs'], glass: .12 }, q: ['Innervation of the intercostal muscles?', 'Inervação dos músculos intercostais?'], a: [['intercostal nerves', 'nervos intercostais', 'anterior rami of T1-T11', 'ramos anteriores de T1-T11', 'ramos ventrais de T1-T11']] },
        { id: 'ext-ic-f', d3: { focus: ['intercostals_external'], view: 'esq', frame: ['intercostals_external', 'ribs'], glass: .12 }, q: f('external intercostals', 'intercostais externos'), a: [['elevate the ribs', 'elevam as costelas', 'elevation of the ribs', 'elevação das costelas', 'inspiration', 'inspiração']] },
        { id: 'int-ic-f', d3: { focus: ['intercostals_internal'], view: 'esq', frame: ['intercostals_internal', 'ribs'], glass: .12 }, q: f('internal intercostals', 'intercostais internos'), a: [['depress the ribs', 'deprimem as costelas', 'depression of the ribs', 'depressão das costelas', 'forced expiration', 'expiração forçada', 'expiration', 'expiração']] },
        { id: 'phr-c', q: ['Which cord levels give the phrenic nerve?', 'Quais níveis medulares originam o nervo frênico?'], a: [C35] },
      ],
    },
    {
      id: 'diaphragm-openings', d3ctx: ['diaphragm', 'ribs', 'sternum', 'thoracic_vertebra', 'lumbar_vertebra', 'costal_cartilages'], d3anchor: ['diaphragm', 'thoracic_vertebra'], d3frame: ['diaphragm', 'ribs', 'thoracic_vertebra'],
      title: ['Diaphragm openings · levels and contents', 'Aberturas do diafragma · níveis e conteúdos'],
      rule: ['8, 10, 12: vena Cava at T8, ESophagus at T10, Aorta at T12. The crura also transmit the greater and lesser splanchnic nerves, and the median arcuate ligament arches over the aorta.',
        '8, 10, 12: veia Cava em T8, ESôfago em T10, Aorta em T12. Os pilares também transmitem os nervos esplâncnicos maior e menor, e o ligamento arqueado mediano passa sobre a aorta.'],
      items: [
        { id: 'dia-t8', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'thoracic_vertebra'], glass: .12 }, q: ['At which vertebral level is the caval opening?', 'Em que nível vertebral está o forame da veia cava?'], a: [['T8', 'T8']] },
        { id: 'dia-t10', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'thoracic_vertebra'], glass: .12 }, q: ['At which vertebral level is the esophageal hiatus?', 'Em que nível vertebral está o hiato esofágico?'], a: [['T10', 'T10']] },
        { id: 'dia-t12', d3: { focus: ['diaphragm'], view: 'post', frame: ['diaphragm', 'lumbar_vertebra'], glass: .12 }, q: ['At which vertebral level is the aortic hiatus?', 'Em que nível vertebral está o hiato aórtico?'], a: [['T12', 'T12']] },
        { id: 'dia-cav-cont', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'ribs'], glass: .12 }, q: ['What passes through the caval opening?', 'O que passa pelo forame da veia cava?'], a: [['inferior vena cava', 'veia cava inferior']] },
        { id: 'dia-eso-cont', d3: { focus: ['diaphragm'], view: 'ant', frame: ['diaphragm', 'ribs'], glass: .12 }, q: ['What passes through the esophageal hiatus?', 'O que passa pelo hiato esofágico?'], a: [['esophagus', 'esôfago'], ['vagal trunks', 'troncos vagais', 'gastric nerves', 'nervos gástricos'], ['branches of the left gastric vessels', 'ramos dos vasos gástricos esquerdos']] },
        { id: 'dia-aor-cont', d3: { focus: ['diaphragm'], view: 'post', frame: ['diaphragm', 'lumbar_vertebra'], glass: .12 }, q: ['What passes through the aortic hiatus?', 'O que passa pelo hiato aórtico?'], a: [['aorta', 'aorta'], ['thoracic duct', 'ducto torácico'], ['azygos and hemiazygos veins', 'veias ázigos e hemiázigo', 'azygos vein', 'veia ázigos']] },
        { id: 'dia-aor-wall', d3: { focus: ['diaphragm'], view: 'post', frame: ['diaphragm', 'lumbar_vertebra'], glass: .12 }, q: ['Which structures form the aortic hiatus?', 'Quais estruturas formam o hiato aórtico?'], a: [['diaphragmatic crura', 'pilares do diafragma'], ['median arcuate ligament', 'ligamento arqueado mediano'], ['vertebral column', 'coluna vertebral']] },
        { id: 'dia-splanch', d3: { focus: ['diaphragm'], view: 'post', frame: ['diaphragm', 'lumbar_vertebra'], glass: .12 }, q: ['Which nerves pass through the crura of the diaphragm?', 'Quais nervos passam pelos pilares do diafragma?'], a: [['greater splanchnic nerve', 'nervo esplâncnico maior'], ['lesser splanchnic nerve', 'nervo esplâncnico menor']] },
      ],
    },
    {
      id: 'abdominal-wall', d3ctx: ['ribs', 'lumbar_vertebra', 'hip_bone', 'sternum'], d3anchor: ['ribs', 'hip_bone'], d3frame: ['ribs', 'hip_bone', 'lumbar_vertebra'],
      title: ['Abdominal wall', 'Parede abdominal'],
      rule: ['Three flat sheets, superficial to deep: external oblique (fibers down and in), internal oblique (down and out), transversus (horizontal). Unilateral action bends the trunk to the SAME side; bilateral action flexes it, compresses the abdomen and is active in expiration.',
        'Três lâminas planas, de superficial para profundo: oblíquo externo (fibras para baixo e para dentro), oblíquo interno (para baixo e para fora), transverso (horizontal). A ação unilateral inclina o tronco para o MESMO lado; a bilateral flexiona o tronco, comprime o abdome e é ativa na expiração.'],
      items: [
        { id: 'eo-o', d3: { focus: ['external_oblique'], view: 'ant', frame: ['external_oblique', 'ribs'], glass: .12 }, q: o('external oblique', 'oblíquo externo'), a: [['external surfaces of ribs 5 to 12', 'faces externas das costelas 5 a 12', 'outer surface of ribs 5 to 12', 'face externa das costelas 5 a 12']] },
        { id: 'eo-i', d3: { focus: ['external_oblique'], view: 'ant', frame: ['external_oblique', 'hip_bone'], glass: .12 }, q: i('external oblique', 'oblíquo externo'), a: [['linea alba', 'linha alba'], ['outer lip of the iliac crest', 'lábio externo da crista ilíaca', 'iliac crest', 'crista ilíaca', 'anterior half of the iliac crest', 'metade anterior da crista ilíaca'], ['anterior layer of the rectus sheath', 'lâmina anterior da bainha do reto', 'anterior rectus sheath', 'bainha anterior do reto']] },
        { id: 'eo-n', d3: { focus: ['external_oblique'], view: 'ant', frame: ['external_oblique', 'ribs'], glass: .12 }, q: n('external oblique', 'oblíquo externo'), a: [LUMB, ['subcostal nerve (T12)', 'nervo subcostal (T12)']] },
        { id: 'eo-f', d3: { focus: ['external_oblique'], view: 'ant', frame: ['external_oblique', 'ribs'], glass: .12 }, q: f('external oblique', 'oblíquo externo'), a: [['trunk flexion', 'flexão do tronco', 'flexes the trunk', 'flexiona o tronco'], ['bends the trunk to the same side', 'inclina o tronco para o mesmo lado', 'lateral flexion to the same side', 'flexão lateral para o mesmo lado', 'contralateral rotation', 'rotação contralateral'], ['compresses the abdomen', 'comprime o abdome'], ['active in expiration', 'ativo na expiração', 'expiration', 'expiração']] },
        { id: 'io-f', q: f('internal oblique', 'oblíquo interno'), a: [['trunk flexion', 'flexão do tronco', 'flexes the trunk', 'flexiona o tronco'], ['bends the trunk to the same side', 'inclina o tronco para o mesmo lado', 'ipsilateral rotation', 'rotação ipsilateral', 'lateral flexion to the same side', 'flexão lateral para o mesmo lado'], ['compresses the abdomen', 'comprime o abdome'], ['active in expiration', 'ativo na expiração', 'expiration', 'expiração']] },
        { id: 'ta-f', q: f('transversus abdominis', 'transverso do abdome'), a: [['compresses the abdomen', 'comprime o abdome', 'stabilizes the core', 'estabiliza o core', 'rotates the trunk to the same side', 'roda o tronco para o mesmo lado'], ['active in expiration', 'ativo na expiração', 'expiration', 'expiração']] },
        { id: 'ra-f', q: f('rectus abdominis', 'reto do abdome'), a: [['trunk flexion', 'flexão do tronco', 'flexes the lumbar spine', 'flexiona a coluna lombar'], ['compresses the abdomen', 'comprime o abdome'], ['active in expiration', 'ativo na expiração', 'expiration', 'expiração']] },
        { id: 'ra-n', q: n('rectus abdominis', 'reto do abdome'), a: [LUMB] },
      ],
    },
    {
      id: 'rectus-pyramidalis', d3ctx: ['ribs', 'sternum', 'costal_cartilages', 'hip_bone', 'linea_alba'], d3anchor: ['linea_alba', 'sternum'], d3frame: ['ribs', 'sternum', 'hip_bone'],
      title: ['Rectus abdominis and pyramidalis', 'Reto do abdome e piramidal'],
      rule: ['Rectus abdominis is the long strap from the 5th–7th costal cartilages and xiphoid to the pubis, crossed by tendinous intersections. Pyramidalis is the small triangle inside the rectus sheath that tenses the linea alba.',
        'Reto do abdome: faixa longa das cartilagens costais 5–7 e processo xifoide ao púbis, cruzada por interseções tendíneas. O piramidal é o pequeno triângulo dentro da bainha do reto que tensiona a linha alba.'],
      items: [
        { id: 'ra-o', q: o('rectus abdominis', 'reto do abdome'), a: [['costal cartilages of ribs 5 to 7', 'cartilagens costais das costelas 5 a 7', 'cartilages of the fifth to seventh ribs', 'cartilagens da quinta à sétima costela'], ['xiphoid process', 'processo xifoide']] },
        { id: 'ra-i', q: i('rectus abdominis', 'reto do abdome'), a: [['pubis between the pubic tubercle and the symphysis', 'púbis entre o tubérculo púbico e a sínfise', 'pubic crest', 'crista púbica']] },
        { id: 'py-o', q: o('pyramidalis', 'piramidal'), a: [['pubis, anterior to the rectus insertion', 'púbis, anterior à inserção do reto', 'body of the pubis', 'corpo do púbis']] },
        { id: 'py-i', q: i('pyramidalis', 'piramidal'), a: [['linea alba', 'linha alba', 'within the rectus sheath', 'dentro da bainha do reto']] },
        { id: 'py-f', q: f('pyramidalis', 'piramidal'), a: [['tenses the linea alba', 'tensiona a linha alba']] },
      ],
    },
    {
      id: 'oblique-transversus', d3ctx: ['ribs', 'costal_cartilages', 'hip_bone', 'inguinal_ligament', 'external_oblique', 'linea_alba'], d3anchor: ['external_oblique', 'hip_bone'], d3frame: ['ribs', 'hip_bone', 'external_oblique'],
      title: ['Internal oblique and transversus · origin and insertion', 'Oblíquo interno e transverso · origem e inserção'],
      rule: ['Internal oblique runs down and out from the thoracolumbar fascia, iliac crest and inguinal ligament to the lower ribs and rectus sheath. Transversus, the deepest sheet, runs horizontally from the costal cartilages, thoracolumbar fascia, iliac crest and inguinal ligament to the pubis and linea alba.',
        'O oblíquo interno vai para baixo e para fora da fáscia toracolombar, crista ilíaca e ligamento inguinal para as costelas inferiores e a bainha do reto. O transverso, a lâmina mais profunda, é horizontal e vai das cartilagens costais, fáscia toracolombar, crista ilíaca e ligamento inguinal ao púbis e à linha alba.'],
      items: [
        { id: 'io-o', q: o('internal oblique', 'oblíquo interno'), a: [['deep layer of the thoracolumbar fascia', 'lâmina profunda da fáscia toracolombar', 'thoracolumbar fascia', 'fáscia toracolombar'], ['iliac crest', 'crista ilíaca'], ['inguinal ligament', 'ligamento inguinal']] },
        { id: 'io-i', q: i('internal oblique', 'oblíquo interno'), a: [['lower borders of ribs 10 to 12', 'bordas inferiores das costelas 10 a 12', 'lower ribs', 'costelas inferiores'], ['anterior and posterior layers of the rectus sheath', 'lâminas anterior e posterior da bainha do reto'], ['linea alba', 'linha alba']] },
        { id: 'ta-o', q: o('transversus abdominis', 'transverso do abdome'), a: [['inner surfaces of costal cartilages 7 to 12', 'faces internas das cartilagens costais 7 a 12'], ['deep layer of the thoracolumbar fascia', 'lâmina profunda da fáscia toracolombar', 'thoracolumbar fascia', 'fáscia toracolombar'], ['inner lip of the iliac crest', 'lábio interno da crista ilíaca'], ['lateral part of the inguinal ligament', 'parte lateral do ligamento inguinal']] },
        { id: 'ta-i', q: i('transversus abdominis', 'transverso do abdome'), a: [['pubic crest and pectineal line', 'crista púbica e linha pectínea'], ['linea alba', 'linha alba']] },
      ],
    },
    {
      id: 'posterior-abdominal', d3ctx: ['lumbar_vertebra', 'hip_bone', 'ribs', 'psoas_major', 'iliacus'], d3anchor: ['lumbar_vertebra', 'hip_bone'], d3frame: ['lumbar_vertebra', 'hip_bone', 'ribs'],
      title: ['Posterior abdominal wall · quadratus lumborum', 'Parede abdominal posterior · quadrado lombar'],
      rule: ['Quadratus lumborum fills the space between the iliac crest, the 12th rib and the lumbar transverse processes; the lateral arcuate ligament crosses it. Unilaterally it bends the trunk to the same side, bilaterally it extends the spine.',
        'O quadrado lombar preenche o espaço entre a crista ilíaca, a 12ª costela e os processos transversos lombares; o ligamento arqueado lateral o cruza. Unilateralmente inclina o tronco para o mesmo lado; bilateralmente estende a coluna.'],
      items: [
        { id: 'ql-o', q: o('quadratus lumborum', 'quadrado lombar'), a: [['iliac crest', 'crista ilíaca']] },
        { id: 'ql-i', q: i('quadratus lumborum', 'quadrado lombar'), a: [['12th rib', '12ª costela', 'twelfth rib', 'décima segunda costela'], ['costal processes of L1 to L4', 'processos costais de L1 a L4', 'transverse processes of L1 to L4', 'processos transversos de L1 a L4']] },
        { id: 'ql-f', q: f('quadratus lumborum', 'quadrado lombar'), a: [['unilateral: bends the trunk to the same side', 'unilateral: inclina o tronco para o mesmo lado', 'lateral flexion to the same side', 'flexão lateral para o mesmo lado'], ['bilateral: extends the vertebral column', 'bilateral: estende a coluna vertebral', 'extends the spine', 'estende a coluna']] },
      ],
    },
    {
      id: 'inguinal-canal', d3ctx: ['hip_bone', 'inguinal_ligament', 'external_oblique', 'lumbar_vertebra'], d3anchor: ['inguinal_ligament', 'hip_bone'], d3frame: ['hip_bone', 'inguinal_ligament'],
      title: ['Inguinal canal · walls, rings and contents', 'Canal inguinal · paredes, anéis e conteúdo'],
      rule: ['The canal runs 4–6 cm obliquely above the inguinal ligament, from the deep ring in the transversalis fascia to the superficial ring in the external oblique aponeurosis. Floor = inguinal, lacunar and pectineal ligaments; roof = internal oblique + transversus; anterior wall = external (and internal) oblique aponeurosis; posterior wall = transversalis fascia + conjoint tendon + reflected ligament.',
        'O canal corre 4–6 cm obliquamente acima do ligamento inguinal, do anel profundo na fáscia transversal ao anel superficial na aponeurose do oblíquo externo. Assoalho = ligamentos inguinal, lacunar e pectíneo; teto = oblíquo interno + transverso; parede anterior = aponeurose do oblíquo externo (e interno); parede posterior = fáscia transversal + tendão conjunto + ligamento inguinal refletido.'],
      items: [
        { id: 'ic-floor', d3: { focus: ['inguinal_ligament'], view: 'ant', frame: ['inguinal_ligament', 'hip_bone'], glass: .12 }, q: ['Which structures form the floor of the inguinal canal?', 'Quais estruturas formam o assoalho do canal inguinal?'], a: [['inguinal ligament', 'ligamento inguinal'], ['lacunar ligament', 'ligamento lacunar'], ['pectineal ligament', 'ligamento pectíneo']] },
        { id: 'ic-roof', q: ['Which muscles form the roof of the inguinal canal?', 'Quais músculos formam o teto do canal inguinal?'], a: [['internal oblique', 'oblíquo interno'], ['transversus abdominis', 'transverso do abdome']] },
        { id: 'ic-ant', q: ['Which structures form the anterior wall of the inguinal canal?', 'Quais estruturas formam a parede anterior do canal inguinal?'], a: [['external oblique aponeurosis', 'aponeurose do oblíquo externo'], ['internal oblique aponeurosis', 'aponeurose do oblíquo interno', 'internal oblique fibers', 'fibras do oblíquo interno']] },
        { id: 'ic-post', q: ['Which structures form the posterior wall of the inguinal canal?', 'Quais estruturas formam a parede posterior do canal inguinal?'], a: [['transversalis fascia', 'fáscia transversal'], ['conjoint tendon', 'tendão conjunto'], ['reflected inguinal ligament', 'ligamento inguinal refletido']] },
        { id: 'ic-sup-ring', q: ['What is the superficial inguinal ring?', 'O que é o anel inguinal superficial?'], a: [['slit-like opening in the external oblique aponeurosis', 'abertura em fenda na aponeurose do oblíquo externo', 'slit in external oblique aponeurosis', 'fenda na aponeurose do oblíquo externo'], ['superolateral to the pubic tubercle', 'superolateral ao tubérculo púbico', 'above and lateral to the pubic tubercle', 'acima e lateral ao tubérculo púbico'], ['medial and lateral crura', 'pilares medial e lateral', 'crura', 'intercrural fibers', 'fibras intercrurrais']] },
        { id: 'ic-deep-ring', q: ['Where is the deep inguinal ring?', 'Onde está o anel inguinal profundo?'], a: [['midway along and 1 cm above the inguinal ligament', 'no ponto médio e 1 cm acima do ligamento inguinal', 'halfway along the inguinal ligament', 'na metade do ligamento inguinal'], ['opening in the transversalis fascia', 'abertura na fáscia transversal'], ['lateral to the inferior epigastric vessels', 'lateral aos vasos epigástricos inferiores']] },
        { id: 'ic-contents', q: ['What does the inguinal canal contain?', 'O que o canal inguinal contém?'], a: [['spermatic cord (male) or round ligament of the uterus (female)', 'funículo espermático (homem) ou ligamento redondo do útero (mulher)', 'spermatic cord', 'funículo espermático', 'round ligament of the uterus', 'ligamento redondo do útero'], ['ilioinguinal nerve', 'nervo ilioinguinal'], ['genital branch of the genitofemoral nerve', 'ramo genital do nervo genitofemoral']] },
        { id: 'ic-conjoint', q: ['What forms the conjoint tendon (inguinal falx)?', 'O que forma o tendão conjunto (foice inguinal)?'], a: [['aponeurotic fibers of internal oblique and transversus abdominis', 'fibras aponeuróticas do oblíquo interno e do transverso do abdome', 'internal oblique and transversus', 'oblíquo interno e transverso'], ['pubic crest and pectineal line', 'crista púbica e linha pectínea']] },
      ],
    },
    {
      id: 'erector-spinae', d3ctx: ['ribs', 'lumbar_vertebra', 'thoracic_vertebra', 'cervical_vertebra', 'sacrum'], d3anchor: ['lumbar_vertebra', 'thoracic_vertebra'], d3frame: ['lumbar_vertebra', 'thoracic_vertebra', 'ribs'],
      title: ['Erector spinae', 'Erector da espinha'],
      rule: ['From lateral to medial: I Love Standing — Iliocostalis, Longissimus, Spinalis, all from a common tendon on the sacrum and iliac crest. All are supplied by posterior rami.',
        'De lateral para medial: I Love Standing — Iliocostal, Longuíssimo, Espinal, todos de um tendão comum no sacro e na crista ilíaca. Todos são inervados por ramos posteriores.'],
      items: [
        { id: 'ili-o', d3: { focus: ['iliocostalis'], view: 'post', frame: ['iliocostalis', 'lumbar_vertebra'], glass: .12 }, q: o('iliocostalis', 'iliocostal'), a: [['common tendon from sacrum and iliac crest', 'tendão comum do sacro e da crista ilíaca'], ['lower lumbar spinous processes', 'processos espinhosos lombares inferiores']] },
        { id: 'ili-i', d3: { focus: ['iliocostalis'], view: 'post', frame: ['iliocostalis', 'ribs'], glass: .12 }, q: i('iliocostalis', 'iliocostal'), a: [['angles of the ribs', 'ângulos das costelas'], ['cervical transverse processes', 'processos transversos cervicais']] },
        { id: 'long-o', d3: { focus: ['longissimus'], view: 'post', frame: ['longissimus', 'lumbar_vertebra'], glass: .12 }, q: o('longissimus', 'longuíssimo'), a: [['common tendon and thoracic/lumbar transverse processes', 'tendão comum e processos transversos toracolombares']] },
        { id: 'long-i', d3: { focus: ['longissimus'], view: 'post', frame: ['longissimus', 'thoracic_vertebra'], glass: .12 }, q: i('longissimus', 'longuíssimo'), a: [['thoracic and cervical transverse processes', 'processos transversos torácicos e cervicais'], ['mastoid process (capitis part)', 'processo mastoide (parte capitits)']] },
        { id: 'spin-o', d3: { focus: ['spinalis'], view: 'post', frame: ['spinalis', 'lumbar_vertebra'], glass: .12 }, q: o('spinalis', 'espinal'), a: [['spinous processes of lower thoracic and upper lumbar vertebrae', 'processos espinhosos torácicos inferiores e lombares superiores']] },
        { id: 'spin-i', d3: { focus: ['spinalis'], view: 'post', frame: ['spinalis', 'thoracic_vertebra'], glass: .12 }, q: i('spinalis', 'espinal'), a: [['spinous processes of upper thoracic and cervical vertebrae', 'processos espinhosos torácicos superiores e cervicais']] },
        { id: 'es-n', q: ['Innervation of the erector spinae?', 'Inervação do eretor da espinha?'], a: [RAMI] },
        { id: 'es-f', q: f('erector spinae', 'eretor da espinha'), a: [['spinal extension', 'extensão da coluna'], ['lateral flexion', 'flexão lateral'], ['posture', 'postura']] },
      ],
    },
    {
      id: 'superficial-back', d3ctx: ['ribs', 'thoracic_vertebra', 'lumbar_vertebra', 'cervical_vertebra', 'scapula', 'clavicle', 'humerus', 'sacrum'], d3anchor: ['thoracic_vertebra', 'scapula'], d3frame: ['thoracic_vertebra', 'scapula', 'lumbar_vertebra'],
      title: ['Superficial back and scapular movers', 'Dorso superficial e movimentadores da escápula'],
      rule: ['Dorsal scapular n. = rhomboids + levator scapulae. Long thoracic n. = serratus anterior. Trapezius is the odd one out: spinal accessory n. (CN XI).',
        'N. escapular dorsal = romboides + levantador da escápula. N. torácico longo = serrátil anterior. O trapézio é a exceção: n. acessório (XI).'],
      items: [
        { id: 'lats-o', q: o('latissimus dorsi', 'latíssimo do dorso'), a: [['T7 to T12 spinous processes', 'processos espinhosos T7 a T12', 'T6 to T12 spinous processes', 'processos espinhosos de T6 a T12'], ['thoracolumbar fascia', 'fáscia toracolombar'], ['iliac crest', 'crista ilíaca'], ['lower ribs', 'costelas inferiores', '10th to 12th ribs', '10ª a 12ª costelas']] },
        { id: 'lats-i', q: i('latissimus dorsi', 'latíssimo do dorso'), a: [['intertubercular sulcus', 'sulco intertubercular', 'floor of intertubercular sulcus', 'assoalho do sulco intertubercular']] },
        { id: 'lats-n', q: n('latissimus dorsi', 'latíssimo do dorso'), a: [['thoracodorsal nerve', 'nervo toracodorsal']] },
        { id: 'lats-f', q: f('latissimus dorsi', 'latíssimo do dorso'), a: [['arm extension', 'extensão do braço'], ['arm adduction', 'adução do braço'], ['medial rotation', 'rotação medial']] },
        { id: 'tmaj-note', q: ['Which muscles does the dorsal scapular nerve supply?', 'Quais músculos o nervo escapular dorsal inerva?'], a: [['rhomboid major', 'romboide maior'], ['rhomboid minor', 'romboide menor'], ['levator scapulae', 'levantador da escápula']] },
        { id: 'rhomb-f', d3: { focus: ['rhomboid_major', 'rhomboid_minor'], view: 'post', frame: ['rhomboid_major', 'scapula'], glass: .12 }, q: f('rhomboids', 'romboides'), a: [[...RETRACT, 'retraction of the scapula', 'retração da escápula', 'downward rotation of the scapula', 'rotação inferior da escápula']] },
        { id: 'lev-f', d3: { focus: ['levator_scapulae'], view: 'post', frame: ['levator_scapulae', 'scapula'], glass: .12 }, q: f('levator scapulae', 'levantador da escápula'), a: [[...ELEV, 'elevation of the scapula', 'elevação da escápula', 'downward rotation of the scapula', 'rotação inferior da escápula']] },
        { id: 'trap-n', d3: { focus: ['trapezius'], view: 'post', frame: ['trapezius', 'scapula'], glass: .12 }, q: n('trapezius', 'trapézio'), a: [SAN, ['C3 and C4 proprioception', 'propriocepção C3 e C4']] },
      ],
    },
    {
      id: 'scapular-attach', d3ctx: ['scapula', 'clavicle', 'cervical_vertebra', 'thoracic_vertebra', 'levator_scapulae', 'rhomboid_major', 'rhomboid_minor'], d3anchor: ['scapula', 'cervical_vertebra'], d3frame: ['scapula', 'clavicle', 'thoracic_vertebra'],
      title: ['Levator scapulae and rhomboids · origin and insertion', 'Levantador da escápula e romboides · origem e inserção'],
      rule: ['Levator scapulae hangs from the cervical transverse processes (C1–C4) to the superior angle; rhomboid minor (C7–T1) and major (T2–T5) go to the medial border. All three are on the dorsal scapular nerve.',
        'O levantador da escápula vai dos processos transversos cervicais (C1–C4) ao ângulo superior; o romboide menor (C7–T1) e o maior (T2–T5) vão à borda medial. Os três são do nervo escapular dorsal.'],
      items: [
        { id: 'lev-o', d3: { focus: ['levator_scapulae'], view: 'post', frame: ['levator_scapulae', 'scapula'], glass: .12 }, q: o('levator scapulae', 'levantador da escápula'), a: [['C1 to C4 transverse processes', 'processos transversos de C1 a C4', 'C1-C4', 'transverse processes of C1 to C4', 'processos transversos de C1–C4']] },
        { id: 'lev-i', d3: { focus: ['levator_scapulae'], view: 'post', frame: ['levator_scapulae', 'scapula'], glass: .12 }, q: i('levator scapulae', 'levantador da escápula'), a: [['superior angle of the scapula', 'ângulo superior da escápula']] },
        { id: 'rhomb-o', d3: { focus: ['rhomboid_major', 'rhomboid_minor'], view: 'post', frame: ['rhomboid_major', 'scapula'], glass: .12 }, q: o('rhomboids (minor and major)', 'romboides (menor e maior)'), a: [['C7 and T1 spinous processes (minor) and T2 to T5 (major)', 'processos espinhosos de C7 e T1 (menor) e T2 a T5 (maior)', 'C7-T1 and T2-T5 spinous processes', 'processos espinhosos C7-T1 e T2-T5']] },
        { id: 'rhomb-i', d3: { focus: ['rhomboid_major', 'rhomboid_minor'], view: 'post', frame: ['rhomboid_major', 'scapula'], glass: .12 }, q: i('rhomboids (minor and major)', 'romboides (menor e maior)'), a: [['medial border of the scapula', 'borda medial da escápula', 'margem medial da escápula']] },
      ],
    },
    {
      id: 'serratus-posterior', d3ctx: ['ribs', 'thoracic_vertebra', 'lumbar_vertebra', 'cervical_vertebra', 'serratus_posterior_superior', 'serratus_posterior_inferior'], d3anchor: ['ribs', 'thoracic_vertebra'], d3frame: ['thoracic_vertebra', 'ribs'],
      title: ['Serratus posterior · intermediate layer of the back', 'Serrátil posterior · camada intermediária do dorso'],
      rule: ['Intermediate layer = respiratory muscles (vertebrae to ribs). Superior (C7–T3 → ribs 2–5) elevates the ribs; inferior (T11–L3 → lower 4 ribs) lowers them. Upper and lower thoracic nerves, respectively.',
        'Camada intermediária = músculos respiratórios (vértebras às costelas). O superior (C7–T3 → costelas 2–5) eleva as costelas; o inferior (T11–L3 → 4 costelas inferiores) as deprime. Nervos torácicos superiores e inferiores, respectivamente.'],
      items: [
        { id: 'sps-o', d3: { focus: ['serratus_posterior_superior'], view: 'post', frame: ['serratus_posterior_superior', 'thoracic_vertebra'], glass: .12 }, q: o('serratus posterior superior', 'serrátil posterior superior'), a: [['C7 to T3 spinous processes', 'processos espinhosos de C7 a T3', 'C7-T3', 'processos espinhosos C7-T3']] },
        { id: 'sps-i', d3: { focus: ['serratus_posterior_superior'], view: 'post', frame: ['serratus_posterior_superior', 'ribs'], glass: .12 }, q: i('serratus posterior superior', 'serrátil posterior superior'), a: [['2nd to 5th ribs', '2ª a 5ª costelas', 'ribs 2, 3, 4 and 5', 'costelas 2, 3, 4 e 5']] },
        { id: 'sps-f', d3: { focus: ['serratus_posterior_superior'], view: 'post', frame: ['serratus_posterior_superior', 'ribs'], glass: .12 }, q: f('serratus posterior superior', 'serrátil posterior superior'), a: [['elevates the ribs', 'eleva as costelas', 'elevation of the ribs', 'elevação das costelas']] },
        { id: 'spi-o', d3: { focus: ['serratus_posterior_inferior'], view: 'post', frame: ['serratus_posterior_inferior', 'lumbar_vertebra'], glass: .12 }, q: o('serratus posterior inferior', 'serrátil posterior inferior'), a: [['T11 to L3 spinous processes', 'processos espinhosos de T11 a L3', 'T11-L3', 'processos espinhosos T11-L3']] },
        { id: 'spi-i', d3: { focus: ['serratus_posterior_inferior'], view: 'post', frame: ['serratus_posterior_inferior', 'ribs'], glass: .12 }, q: i('serratus posterior inferior', 'serrátil posterior inferior'), a: [['lower four ribs', 'quatro costelas inferiores', 'ribs 9 to 12', '9ª a 12ª costelas']] },
        { id: 'spi-f', d3: { focus: ['serratus_posterior_inferior'], view: 'post', frame: ['serratus_posterior_inferior', 'ribs'], glass: .12 }, q: f('serratus posterior inferior', 'serrátil posterior inferior'), a: [['depresses the ribs', 'deprime as costelas', 'lowers the ribs', 'baixa as costelas']] },
        { id: 'serp-n', q: ['Innervation of the serratus posterior muscles?', 'Inervação dos músculos serrátil posterior?'], a: [['upper thoracic nerves (superior) and lower thoracic nerves (inferior)', 'nervos torácicos superiores (superior) e inferiores (inferior)', 'upper and lower thoracic nerves', 'nervos torácicos superiores e inferiores']] },
      ],
    },
    {
      id: 'chest-front', d3ctx: ['ribs', 'sternum', 'clavicle', 'scapula', 'humerus', 'thoracic_vertebra'], d3anchor: ['ribs', 'sternum'], d3frame: ['ribs', 'sternum', 'clavicle'],
      title: ['Chest wall and scapular protractor', 'Parede torácica e protrator da escápula'],
      rule: ['Pectoralis major and minor stack at the front: minor lies deep, from ribs to coracoid. Serratus anterior hugs the ribs to the medial scapular border and is the only one on the long thoracic nerve. Subclavius is the small muscle from the clavicle to the first rib.',
        'Pectoral maior e menor se empilham na frente: o menor é profundo, das costelas ao coracoide. O serrátil anterior abraça as costelas até a borda medial da escápula e é o único no nervo torácico longo. O subclávio é o pequeno músculo da clavícula à primeira costela.'],
      items: [
        { id: 'pmaj-o', d3: { focus: ['pectoralis_major'], view: 'ant', frame: ['pectoralis_major', 'sternum'], glass: .12 }, q: o('pectoralis major', 'pectoral maior'), a: [['clavicle', 'clavícula', 'sternal half of the clavicle', 'metade esternal da clavícula'], ['sternum', 'esterno', 'sternum to the 6th and 7th costal cartilages', 'esterno até a 6ª e 7ª cartilagens costais'], ['costal cartilages', 'cartilagens costais'], ['aponeurosis of external oblique', 'aponeurose do oblíquo externo', 'rectus sheath', 'bainha do reto']] },
        { id: 'pmaj-i', d3: { focus: ['pectoralis_major'], view: 'ant', frame: ['pectoralis_major', 'humerus'], glass: .12 }, q: i('pectoralis major', 'pectoral maior'), a: [['lateral lip of intertubercular sulcus', 'lábio lateral do sulco intertubercular']] },
        { id: 'pmaj-n', d3: { focus: ['pectoralis_major'], view: 'ant', frame: ['pectoralis_major', 'sternum'], glass: .12 }, q: n('pectoralis major', 'pectoral maior'), a: [['lateral and medial pectoral nerves', 'nervos peitorais lateral e medial']] },
        { id: 'pmin-o', q: o('pectoralis minor', 'pectoral menor'), a: [['ribs 3 to 5', 'costelas 3 a 5']] },
        { id: 'pmin-i', q: i('pectoralis minor', 'pectoral menor'), a: [['coracoid process', 'processo coracoide']] },
        { id: 'ser-o', d3: { focus: ['serratus_anterior'], view: 'esq', frame: ['serratus_anterior', 'ribs'], glass: .12 }, q: o('serratus anterior', 'serrátil anterior'), a: [['ribs 1 to 8 or 9', 'costelas 1 a 8 ou 9', 'upper 8 to 10 ribs', '8 a 10 costelas superiores']] },
        { id: 'ser-i', d3: { focus: ['serratus_anterior'], view: 'esq', frame: ['serratus_anterior', 'scapula'], glass: .12 }, q: i('serratus anterior', 'serrátil anterior'), a: [['anterior medial border of scapula', 'borda medial anterior da escápula', 'medial border of the scapula', 'borda medial da escápula', 'margem medial da escápula']] },
        { id: 'ser-n', d3: { focus: ['serratus_anterior'], view: 'esq', frame: ['serratus_anterior', 'ribs'], glass: .12 }, q: n('serratus anterior', 'serrátil anterior'), a: [LTN] },
        { id: 'subcl-o', q: o('subclavius', 'subclávio'), a: [['clavicle', 'clavícula']] },
        { id: 'subcl-i', q: i('subclavius', 'subclávio'), a: [['first rib', 'primeira costela']] },
      ],
    },
  ],
};
