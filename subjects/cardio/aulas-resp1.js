import questions from './slides/airways_upper.js?v=100';

const textPairs = [
  [
    "Nose and nasal cavities",
    "Nariz e cavidades nasais"
  ],
  [
    "Respiration",
    "Respiração"
  ],
  [
    "Ventilation is one process of respiration.",
    "A ventilação é um processo da respiração."
  ],
  [
    "Gas exchange occurs between air and blood.",
    "As trocas gasosas ocorrem entre ar e sangue."
  ],
  [
    "Blood transports oxygen and carbon dioxide.",
    "O sangue transporta oxigênio e dióxido de carbono."
  ],
  [
    "Ventilation moves air; gas exchange transfers gases.",
    "A ventilação movimenta o ar; as trocas gasosas transferem gases."
  ],
  [
    "External nose",
    "Nariz externo"
  ],
  [
    "The external nose has bones and cartilages.",
    "O nariz externo tem ossos e cartilagens."
  ],
  [
    "The major alar cartilage has medial and lateral crura.",
    "A cartilagem alar maior tem ramos medial e lateral."
  ],
  [
    "The nasal vestibules are shown beneath the cartilages.",
    "Os vestíbulos nasais aparecem abaixo das cartilagens."
  ],
  [
    "The septal cartilage and major alar cartilage are distinct.",
    "A cartilagem do septo e a cartilagem alar maior são distintas."
  ],
  [
    "Nasal regions",
    "Regiões nasais"
  ],
  [
    "The nasal cavity includes a vestibular region.",
    "A cavidade nasal inclui uma região vestibular."
  ],
  [
    "It also includes a respiratory region.",
    "Ela também inclui uma região respiratória."
  ],
  [
    "The olfactory region is another nasal region.",
    "A região olfatória é outra região nasal."
  ],
  [
    "The vestibular and olfactory regions are different regions.",
    "As regiões vestibular e olfatória são distintas."
  ],
  [
    "Roof and floor",
    "Teto e assoalho"
  ],
  [
    "The nasal vault includes nasal, frontal and ethmoid bones.",
    "A abóbada nasal inclui os ossos nasal, frontal e etmoide."
  ],
  [
    "The floor includes the palatine process of the maxilla.",
    "O assoalho inclui o processo palatino da maxila."
  ],
  [
    "The palatine bone also contributes to the floor.",
    "O osso palatino também contribui para o assoalho."
  ],
  [
    "The vault forms the roof; the palatine bones contribute to the floor.",
    "A abóbada forma o teto; os ossos palatinos contribuem para o assoalho."
  ],
  [
    "Lateral wall and septum",
    "Parede lateral e septo"
  ],
  [
    "Each nasal cavity has four walls.",
    "Cada cavidade nasal tem quatro paredes."
  ],
  [
    "The lateral wall includes the inferior nasal concha.",
    "A parede lateral inclui a concha nasal inferior."
  ],
  [
    "The septal wall includes the vomer and cartilage.",
    "A parede septal inclui o vômer e cartilagem."
  ],
  [
    "The septal wall separates the cavities; conchae are on the lateral wall.",
    "A parede septal separa as cavidades; as conchas ficam na parede lateral."
  ],
  [
    "Nasal openings and mucosa",
    "Aberturas e mucosa nasais"
  ],
  [
    "Middle meatus",
    "Meato médio"
  ],
  [
    "The frontal sinus opens into the middle meatus.",
    "O seio frontal abre-se no meato médio."
  ],
  [
    "The maxillary and anterior ethmoidal sinuses also open there.",
    "Os seios maxilar e etmoidais anteriores também se abrem ali."
  ],
  [
    "The semilunar hiatus marks the opening.",
    "O hiato semilunar marca a abertura."
  ],
  [
    "The middle meatus differs from the superior meatus.",
    "O meato médio é distinto do meato superior."
  ],
  [
    "Other sinus openings",
    "Outras aberturas dos seios"
  ],
  [
    "Middle ethmoidal sinuses open into the ethmoidal bulla.",
    "Os seios etmoidais médios abrem-se na bolha etmoidal."
  ],
  [
    "Posterior ethmoidal sinuses open at the superior meatus.",
    "Os seios etmoidais posteriores abrem-se no meato superior."
  ],
  [
    "The sphenoidal sinus opens at the posterior roof.",
    "O seio esfenoidal abre-se na parte posterior do teto."
  ],
  [
    "The sphenoidal opening is in the roof, not the lateral wall.",
    "A abertura esfenoidal fica no teto, não na parede lateral."
  ],
  [
    "Ducts and tubes",
    "Ductos e tubos"
  ],
  [
    "The nasolacrimal duct drains tears.",
    "O ducto nasolacrimal drena lágrimas."
  ],
  [
    "It opens into the inferior meatus.",
    "Ele se abre no meato inferior."
  ],
  [
    "The auditory tube opens into the nasopharynx.",
    "A tuba auditiva se abre na nasofaringe."
  ],
  [
    "The auditory tube and nasolacrimal duct have different openings.",
    "A tuba auditiva e o ducto nasolacrimal têm aberturas diferentes."
  ],
  [
    "Conchae and airflow",
    "Conchas e fluxo de ar"
  ],
  [
    "Nasal conchae are covered by glandular and vascular tissue.",
    "As conchas nasais são cobertas por tecido glandular e vascular."
  ],
  [
    "Their erectile tissue changes volume.",
    "Seu tecido erétil muda de volume."
  ],
  [
    "Allergic conditions can obstruct airflow.",
    "Condições alérgicas podem obstruir o fluxo de ar."
  ],
  [
    "Conchae are structures; meatuses are passages beside them.",
    "As conchas são estruturas; os meatos são passagens ao lado delas."
  ],
  [
    "Nasal mucosa",
    "Mucosa nasal"
  ],
  [
    "Respiratory nasal mucosa has cilia and seromucous glands.",
    "A mucosa respiratória nasal tem cílios e glândulas seromucosas."
  ],
  [
    "It filters, humidifies and warms air.",
    "Ela filtra, umidifica e aquece o ar."
  ],
  [
    "Olfactory mucosa has fibers directed to the olfactory bulb.",
    "A mucosa olfatória tem fibras dirigidas ao bulbo olfatório."
  ],
  [
    "Respiratory and olfactory mucosa have different roles.",
    "As mucosas respiratória e olfatória têm funções diferentes."
  ],
  [
    "Nasal supply and sensation",
    "Irrigação e sensibilidade nasais"
  ],
  [
    "Nasal arteries",
    "Artérias nasais"
  ],
  [
    "Nasal vascularization includes ophthalmic, maxillary and facial arteries.",
    "A vascularização nasal inclui as artérias oftálmica, maxilar e facial."
  ],
  [
    "Ethmoidal branches supply the vault and septum.",
    "Ramos etmoidais irrigam a abóbada e o septo."
  ],
  [
    "The sphenopalatine artery supplies conchae and meatuses.",
    "A artéria esfenopalatina irriga conchas e meatos."
  ],
  [
    "The facial and ophthalmic arteries are separate sources.",
    "As artérias facial e oftálmica são fontes distintas."
  ],
  [
    "Vascular plexuses",
    "Plexos vasculares"
  ],
  [
    "The septal arteries form an anastomosis in the Kiesselbach area.",
    "As artérias do septo formam uma anastomose na área de Kiesselbach."
  ],
  [
    "A submucosal cavernous plexus contributes to venous return.",
    "Um plexo cavernoso submucoso contribui para o retorno venoso."
  ],
  [
    "The superior part drains through ethmoidal veins.",
    "A parte superior drena pelas veias etmoidais."
  ],
  [
    "Arterial anastomoses and venous plexuses are different networks.",
    "Anastomoses arteriais e plexos venosos são redes diferentes."
  ],
  [
    "Olfaction",
    "Olfação"
  ],
  [
    "Olfactory receptors respond to molecules in nasal mucus.",
    "Os receptores olfatórios respondem a moléculas no muco nasal."
  ],
  [
    "Olfactory filaments cross the cribriform plate.",
    "Os filamentos olfatórios atravessam a lâmina crivosa."
  ],
  [
    "They reach the olfactory bulb.",
    "Eles chegam ao bulbo olfatório."
  ],
  [
    "Olfactory sensation differs from trigeminal touch and pain.",
    "A sensibilidade olfatória difere do tato e da dor trigeminais."
  ],
  [
    "Nasal nerves",
    "Nervos nasais"
  ],
  [
    "Trigeminal branches carry tactile, pain and thermal sensation.",
    "Ramos do trigêmeo conduzem sensibilidade tátil, dolorosa e térmica."
  ],
  [
    "Parasympathetic fibers can stimulate nasal gland secretion.",
    "Fibras parassimpáticas podem estimular a secreção das glândulas nasais."
  ],
  [
    "Sympathetic fibers have vasomotor action on nasal vessels.",
    "Fibras simpáticas têm ação vasomotora nos vasos nasais."
  ],
  [
    "Parasympathetic secretion and sympathetic vasomotor action are different functions.",
    "A secreção parassimpática e a ação vasomotora simpática são funções diferentes."
  ],
  [
    "Choanae and pharynx",
    "Coanas e faringe"
  ],
  [
    "The figure labels the choana as a posterior nasal opening.",
    "A figura identifica a coana como abertura nasal posterior."
  ],
  [
    "The pharynx includes nasopharynx, oropharynx and laryngopharynx.",
    "A faringe inclui nasofaringe, orofaringe e laringofaringe."
  ],
  [
    "The auditory tube opens into the nasopharynx.",
    "A tuba auditiva abre-se na nasofaringe."
  ],
  [
    "The choana is an opening; the nasopharynx is a pharyngeal region.",
    "A coana é uma abertura; a nasofaringe é uma região da faringe."
  ],
  [
    "Laryngeal framework",
    "Estrutura da laringe"
  ],
  [
    "Larynx and hyoid",
    "Laringe e hioide"
  ],
  [
    "The larynx is shown at C3–C6.",
    "A laringe é mostrada de C3 a C6."
  ],
  [
    "The hyoid has a body and greater and lesser horns.",
    "O hioide tem corpo e cornos maiores e menores."
  ],
  [
    "The thyrohyoid membrane connects the hyoid and thyroid region.",
    "A membrana tireo-hióidea liga o hioide à região tireóidea."
  ],
  [
    "The hyoid is a bone; the thyroid is a laryngeal cartilage.",
    "O hioide é um osso; a tireóidea é uma cartilagem da laringe."
  ],
  [
    "Laryngeal cartilages",
    "Cartilagens da laringe"
  ],
  [
    "The larynx has three paired and three unpaired cartilages.",
    "A laringe tem três cartilagens pares e três ímpares."
  ],
  [
    "The figures label the thyroid and cricoid cartilages.",
    "As figuras identificam as cartilagens tireóidea e cricóidea."
  ],
  [
    "The figures also show arytenoid and corniculate cartilages.",
    "As figuras também mostram as cartilagens aritenóidea e corniculada."
  ],
  [
    "The cricoid and thyroid cartilages are distinct.",
    "As cartilagens cricóidea e tireóidea são distintas."
  ],
  [
    "Thyroid and cricoid",
    "Tireóidea e cricóidea"
  ],
  [
    "The thyroid cartilage has right and left laminae.",
    "A cartilagem tireóidea tem lâminas direita e esquerda."
  ],
  [
    "The thyroid cartilage has superior and inferior horns.",
    "A cartilagem tireóidea tem cornos superiores e inferiores."
  ],
  [
    "The cricoid cartilage has an arch and a lamina.",
    "A cartilagem cricóidea tem arco e lâmina."
  ],
  [
    "The thyroid has two laminae; the cricoid has an arch and lamina.",
    "A tireóidea tem duas lâminas; a cricóidea tem arco e lâmina."
  ],
  [
    "Epiglottis and arytenoid",
    "Epiglote e aritenoide"
  ],
  [
    "The epiglottis contains elastic cartilage.",
    "A epiglote contém cartilagem elástica."
  ],
  [
    "Most of the arytenoid cartilage is hyaline.",
    "A maior parte da cartilagem aritenóidea é hialina."
  ],
  [
    "The arytenoid has vocal and muscular processes.",
    "A aritenoide tem processos vocal e muscular."
  ],
  [
    "The vocal and muscular processes are parts of the arytenoid.",
    "Os processos vocal e muscular são partes da aritenoide."
  ],
  [
    "Laryngeal joints",
    "Articulações da laringe"
  ],
  [
    "The cricothyroid joint permits rotation.",
    "A articulação cricotireóidea permite rotação."
  ],
  [
    "That movement is important for vocal cord tension.",
    "Esse movimento é importante para a tensão das pregas vocais."
  ],
  [
    "The cricoarytenoid joint moves the vocal processes.",
    "A articulação cricoaritenóidea movimenta os processos vocais."
  ],
  [
    "Cricothyroid and cricoarytenoid joints have different movements.",
    "As articulações cricotireóidea e cricoaritenóidea têm movimentos diferentes."
  ],
  [
    "Laryngeal cavity and function",
    "Cavidade e função da laringe"
  ],
  [
    "Laryngeal cavity",
    "Cavidade da laringe"
  ],
  [
    "The cavity includes a vestibule and an infraglottic space.",
    "A cavidade inclui vestíbulo e espaço infraglótico."
  ],
  [
    "The laryngeal ventricle lies between vestibular and vocal folds.",
    "O ventrículo da laringe fica entre as pregas vestibular e vocal."
  ],
  [
    "The vocal folds have nonkeratinized stratified epithelium.",
    "As pregas vocais têm epitélio estratificado não queratinizado."
  ],
  [
    "The vestibular fold is distinct from the vocal fold.",
    "A prega vestibular é distinta da prega vocal."
  ],
  [
    "Intrinsic membranes",
    "Membranas intrínsecas"
  ],
  [
    "The quadrangular membrane runs from the epiglottis to the arytenoid.",
    "A membrana quadrangular vai da epiglote à aritenoide."
  ],
  [
    "Its inferior free border forms the vestibular ligament.",
    "Sua borda livre inferior forma o ligamento vestibular."
  ],
  [
    "The conus elasticus is continuous with the vocal ligaments.",
    "O cone elástico continua-se com os ligamentos vocais."
  ],
  [
    "The vestibular and vocal ligaments belong to different membranes.",
    "Os ligamentos vestibular e vocal pertencem a membranas diferentes."
  ],
  [
    "Movement and phonation",
    "Movimento e fonação"
  ],
  [
    "Extrinsic muscles help move the larynx vertically.",
    "Músculos extrínsecos ajudam a mover a laringe verticalmente."
  ],
  [
    "Exhaled air provides energy for phonation.",
    "O ar expirado fornece energia para a fonação."
  ],
  [
    "The vocal folds oscillate during phonation.",
    "As pregas vocais oscilam durante a fonação."
  ],
  [
    "Air provides energy; vocal folds are the oscillating structures.",
    "O ar fornece energia; as pregas vocais são as estruturas que oscilam."
  ],
  [
    "Intrinsic muscles",
    "Músculos intrínsecos"
  ],
  [
    "The posterior cricoarytenoid abducts the rima glottidis.",
    "O cricoaritenóideo posterior abduz a rima da glote."
  ],
  [
    "The lateral cricoarytenoid adducts the rima glottidis.",
    "O cricoaritenóideo lateral aduz a rima da glote."
  ],
  [
    "The cricothyroid increases vocal ligament tension.",
    "O cricotireóideo aumenta a tensão dos ligamentos vocais."
  ],
  [
    "Posterior cricoarytenoid abducts; lateral cricoarytenoid adducts.",
    "O cricoaritenóideo posterior abduz; o lateral aduz."
  ],
  [
    "Vessels, nerves and lymph",
    "Vasos, nervos e linfa"
  ],
  [
    "The figures label superior and inferior laryngeal arteries.",
    "As figuras identificam as artérias laríngeas superior e inferior."
  ],
  [
    "The superior laryngeal nerve has internal and external branches.",
    "O nervo laríngeo superior tem ramos interno e externo."
  ],
  [
    "The lymphatic diagram labels upper and lower deep cervical nodes.",
    "O esquema linfático identifica linfonodos cervicais profundos superiores e inferiores."
  ],
  [
    "Superior and recurrent laryngeal nerves are separate branches.",
    "Os nervos laríngeos superior e recorrente são ramos distintos."
  ]
];
export const RESP1_AULAS_PT = Object.fromEntries(textPairs);

const specs = [
  [
    "nose",
    "Nose and nasal cavities",
    2,
    5,
    [
      [
        "breathing",
        "Respiration",
        "R1-2",
        3,
        []
      ],
      [
        "external",
        "External nose",
        "R1-3",
        3,
        []
      ],
      [
        "regions",
        "Nasal regions",
        "R1-4",
        3,
        []
      ],
      [
        "roof",
        "Roof and floor",
        "R1-5",
        3,
        []
      ],
      [
        "walls",
        "Lateral wall and septum",
        "R1-5",
        3,
        []
      ]
    ]
  ],
  [
    "nasal-openings",
    "Nasal openings and mucosa",
    6,
    9,
    [
      [
        "middle",
        "Middle meatus",
        "R1-6",
        3,
        []
      ],
      [
        "other",
        "Other sinus openings",
        "R1-6–R1-8",
        3,
        []
      ],
      [
        "ducts",
        "Ducts and tubes",
        "R1-6",
        3,
        []
      ],
      [
        "conchae",
        "Conchae and airflow",
        "R1-7",
        3,
        []
      ],
      [
        "mucosa",
        "Nasal mucosa",
        "R1-7",
        3,
        []
      ]
    ]
  ],
  [
    "nasal-supply",
    "Nasal supply and sensation",
    10,
    21,
    [
      [
        "arteries",
        "Nasal arteries",
        "R1-10–R1-13",
        3,
        []
      ],
      [
        "plexuses",
        "Vascular plexuses",
        "R1-14–R1-15",
        3,
        []
      ],
      [
        "smell",
        "Olfaction",
        "R1-16–R1-18",
        3,
        []
      ],
      [
        "nerves",
        "Nasal nerves",
        "R1-18",
        3,
        []
      ],
      [
        "pharynx",
        "Choanae and pharynx",
        "R1-19–R1-21",
        3,
        []
      ]
    ]
  ],
  [
    "cartilage",
    "Laryngeal framework",
    22,
    35,
    [
      [
        "position",
        "Larynx and hyoid",
        "R1-23–R1-24",
        3,
        [
          "lar_hio",
          "lar_tir"
        ]
      ],
      [
        "cartilages",
        "Laryngeal cartilages",
        "R1-25–R1-27",
        3,
        [
          "lar_tir",
          "lar_cri",
          "lar_ari",
          "lar_cor"
        ]
      ],
      [
        "thyroid",
        "Thyroid and cricoid",
        "R1-28–R1-29",
        3,
        [
          "lar_tir",
          "lar_cri"
        ]
      ],
      [
        "epiglottis",
        "Epiglottis and arytenoid",
        "R1-30–R1-32",
        3,
        [
          "lar_epi",
          "lar_ari"
        ]
      ],
      [
        "joints",
        "Laryngeal joints",
        "R1-33–R1-35",
        3,
        [
          "lar_tir",
          "lar_cri",
          "lar_ari"
        ]
      ]
    ]
  ],
  [
    "larynx",
    "Laryngeal cavity and function",
    36,
    54,
    [
      [
        "cavity",
        "Laryngeal cavity",
        "R1-36–R1-37",
        3,
        []
      ],
      [
        "membranes",
        "Intrinsic membranes",
        "R1-38–R1-40",
        3,
        [
          "lar_epi",
          "lar_ari",
          "lar_cri",
          "lar_vl"
        ]
      ],
      [
        "phonation",
        "Movement and phonation",
        "R1-42–R1-43",
        3,
        []
      ],
      [
        "muscles",
        "Intrinsic muscles",
        "R1-44–R1-48",
        3,
        [
          "lar_mct",
          "lar_pca",
          "lar_lca"
        ]
      ],
      [
        "supply",
        "Vessels, nerves and lymph",
        "R1-49–R1-54",
        3,
        []
      ]
    ]
  ]
];
export const RESP1_AULAS = specs.map(([id, title, first, last, rows]) => ({
  id: 'airwaysUpper-' + id, unit: 'airwaysUpper', title,
  cards: rows.map(([cardId, cardTitle, ref, count, focus]) => {
    const start = textPairs.findIndex(([english]) => english === cardTitle);
    return { id: 'airwaysUpper-' + id + '-' + cardId, title: cardTitle, ref, facts: textPairs.slice(start + 1, start + 1 + count).map(([english]) => english), confusion: textPairs[start + 1 + count][0], focus };
  }),
  questionIds: questions.filter(({ ref }) => { const slide = Number(ref.split('-')[1]); return slide >= first && slide <= last; }).map(({ ref, q }) => `airwaysUpper:${ref}:${q}`),
}));
