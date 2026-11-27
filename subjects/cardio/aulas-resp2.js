import questions from './slides/airways_lower.js?v=160';

const textPairs = [
  [
    "Trachea and main bronchi",
    "Traqueia e brônquios principais"
  ],
  [
    "Tracheal extent",
    "Extensão da traqueia"
  ],
  [
    "The trachea extends about 10–11 cm.",
    "A traqueia tem cerca de 10–11 cm de extensão."
  ],
  [
    "It begins at the larynx near C6.",
    "Ela começa na laringe perto de C6."
  ],
  [
    "It divides into main bronchi near T5.",
    "Ela divide-se em brônquios principais perto de T5."
  ],
  [
    "The trachea divides into bronchi; the esophagus lies behind it.",
    "A traqueia divide-se em brônquios; o esôfago fica atrás dela."
  ],
  [
    "Tracheal relations",
    "Relações da traqueia"
  ],
  [
    "The esophagus lies behind the trachea.",
    "O esôfago fica atrás da traqueia."
  ],
  [
    "The thyroid isthmus lies anterior to the cervical trachea.",
    "O istmo da tireoide fica anterior à traqueia cervical."
  ],
  [
    "The aortic arch is anterior to the thoracic portion.",
    "O arco aórtico fica anterior à porção torácica."
  ],
  [
    "Cervical and thoracic describe portions of the same trachea.",
    "Cervical e torácica descrevem porções da mesma traqueia."
  ],
  [
    "Bifurcation",
    "Bifurcação"
  ],
  [
    "The trachea divides into right and left main bronchi.",
    "A traqueia divide-se nos brônquios principais direito e esquerdo."
  ],
  [
    "The right main bronchus is shorter.",
    "O brônquio principal direito é mais curto."
  ],
  [
    "The right main bronchus has a more vertical course.",
    "O brônquio principal direito tem trajeto mais vertical."
  ],
  [
    "The angle between the two main bronchi at the bifurcation is about 70°.",
    "O ângulo entre os dois brônquios principais na bifurcação é de cerca de 70°."
  ],
  [
    "The right and left main bronchi differ in direction.",
    "Os brônquios principais direito e esquerdo diferem em direção."
  ],
  [
    "Right bronchial relations",
    "Relações do brônquio direito"
  ],
  [
    "The azygos vein arches above the right bronchus.",
    "A veia ázigos forma um arco acima do brônquio direito."
  ],
  [
    "The right pulmonary artery is initially below the right superior lobar bronchus.",
    "A artéria pulmonar direita fica inicialmente abaixo do brônquio lobar superior direito."
  ],
  [
    "The superior lobar bronchus is called eparterial.",
    "O brônquio lobar superior é chamado eparterial."
  ],
  [
    "A bronchus carries air; a pulmonary artery carries blood.",
    "Um brônquio conduz ar; uma artéria pulmonar conduz sangue."
  ],
  [
    "Left bronchial relations",
    "Relações do brônquio esquerdo"
  ],
  [
    "The aortic arch lies above the left main bronchus.",
    "O arco aórtico fica acima do brônquio principal esquerdo."
  ],
  [
    "The left pulmonary artery lies anterior and then superior to it.",
    "A artéria pulmonar esquerda fica anterior e depois superior a ele."
  ],
  [
    "The figure also labels the esophagus near the bronchi.",
    "A figura também identifica o esôfago perto dos brônquios."
  ],
  [
    "The aortic arch is a vessel, not a bronchus.",
    "O arco aórtico é um vaso, não um brônquio."
  ],
  [
    "Bronchial branching and walls",
    "Ramificação e paredes brônquicas"
  ],
  [
    "Lobar bronchi",
    "Brônquios lobares"
  ],
  [
    "The right lung has three lobar bronchi.",
    "O pulmão direito tem três brônquios lobares."
  ],
  [
    "The left lung has two lobar bronchi.",
    "O pulmão esquerdo tem dois brônquios lobares."
  ],
  [
    "The right superior lobar bronchus branches before the hilum.",
    "O brônquio lobar superior direito se ramifica antes do hilo."
  ],
  [
    "The right has three lobar bronchi; the left has two.",
    "O lado direito tem três brônquios lobares; o esquerdo tem dois."
  ],
  [
    "Smaller airways",
    "Vias aéreas menores"
  ],
  [
    "Segmental bronchi give rise to smaller airways.",
    "Os brônquios segmentares dão origem a vias aéreas menores."
  ],
  [
    "Terminal bronchioles precede respiratory bronchioles.",
    "Os bronquíolos terminais precedem os bronquíolos respiratórios."
  ],
  [
    "Alveolar ducts lead to alveolar sacs and alveoli.",
    "Os ductos alveolares conduzem aos sacos alveolares e alvéolos."
  ],
  [
    "Bronchioles and alveoli are different parts of the airway sequence.",
    "Bronquíolos e alvéolos são partes diferentes da sequência das vias aéreas."
  ],
  [
    "Tracheal wall",
    "Parede da traqueia"
  ],
  [
    "The tracheal wall contains cartilage.",
    "A parede da traqueia contém cartilagem."
  ],
  [
    "The posterior wall contains trachealis smooth muscle.",
    "A parede posterior contém o músculo liso traqueal."
  ],
  [
    "The lining includes ciliated columnar epithelium.",
    "O revestimento inclui epitélio colunar ciliado."
  ],
  [
    "The posterior muscle and cartilage are different wall components.",
    "O músculo posterior e a cartilagem são componentes diferentes da parede."
  ],
  [
    "Bronchial wall",
    "Parede brônquica"
  ],
  [
    "Airways have an internal mucosal layer.",
    "As vias aéreas têm uma camada mucosa interna."
  ],
  [
    "The wall contains smooth muscle and glands.",
    "A parede contém músculo liso e glândulas."
  ],
  [
    "Cartilage becomes thinner and disappears in bronchioles.",
    "A cartilagem fica mais fina e desaparece nos bronquíolos."
  ],
  [
    "Bronchioles lack the cartilage described in larger bronchi.",
    "Os bronquíolos não têm a cartilagem descrita nos brônquios maiores."
  ],
  [
    "Airway supply",
    "Irrigação e inervação das vias aéreas"
  ],
  [
    "Inferior thyroid and bronchial arteries supply the trachea.",
    "As artérias tireóideas inferiores e brônquicas irrigam a traqueia."
  ],
  [
    "Bronchial vessels supply the bronchi.",
    "Os vasos brônquicos irrigam os brônquios."
  ],
  [
    "Anterior and posterior pulmonary plexuses contribute to airway innervation.",
    "Os plexos pulmonares anterior e posterior contribuem para a inervação das vias aéreas."
  ],
  [
    "Vessels supply blood; nerves carry innervation.",
    "Os vasos levam sangue; os nervos fornecem inervação."
  ],
  [
    "Lung surfaces and lobes",
    "Faces e lobos pulmonares"
  ],
  [
    "Lungs in the chest",
    "Pulmões no tórax"
  ],
  [
    "The lungs are covered by pleura.",
    "Os pulmões são cobertos pela pleura."
  ],
  [
    "The mediastinum separates the lungs.",
    "O mediastino separa os pulmões."
  ],
  [
    "The concave base rests on the diaphragm.",
    "A base côncava repousa sobre o diafragma."
  ],
  [
    "The mediastinum separates the lungs; pleura covers them.",
    "O mediastino separa os pulmões; a pleura os reveste."
  ],
  [
    "Pulmonary hila",
    "Hilos pulmonares"
  ],
  [
    "The right hilum lies below the azygos vein.",
    "O hilo direito fica abaixo da veia ázigos."
  ],
  [
    "The left hilum lies below the aortic arch.",
    "O hilo esquerdo fica abaixo do arco aórtico."
  ],
  [
    "The left pulmonary artery lies above the left main bronchus at the hilum.",
    "A artéria pulmonar esquerda fica acima do brônquio principal esquerdo no hilo."
  ],
  [
    "Right and left hila have different vessel relations.",
    "Os hilos direito e esquerdo têm relações vasculares diferentes."
  ],
  [
    "Lung edges",
    "Margens pulmonares"
  ],
  [
    "The anterior edge of the left lung has a cardiac notch.",
    "A margem anterior do pulmão esquerdo tem uma incisura cardíaca."
  ],
  [
    "The posterior edge separates costovertebral and medial faces.",
    "A margem posterior separa as faces costovertebral e medial."
  ],
  [
    "The inferior edge borders the base.",
    "A margem inferior limita a base."
  ],
  [
    "The cardiac notch is on the left lung.",
    "A incisura cardíaca fica no pulmão esquerdo."
  ],
  [
    "Lobes and fissures",
    "Lobos e fissuras"
  ],
  [
    "The right lung has superior, middle and inferior lobes.",
    "O pulmão direito tem lobos superior, médio e inferior."
  ],
  [
    "The right lung has horizontal and oblique fissures.",
    "O pulmão direito tem fissuras horizontal e oblíqua."
  ],
  [
    "The left lung has two lobes separated by an oblique fissure.",
    "O pulmão esquerdo tem dois lobos separados por uma fissura oblíqua."
  ],
  [
    "The middle lobe belongs to the right lung.",
    "O lobo médio pertence ao pulmão direito."
  ],
  [
    "Bronchopulmonary segments",
    "Segmentos broncopulmonares"
  ],
  [
    "Lobes are divided into bronchopulmonary segments.",
    "Os lobos dividem-se em segmentos broncopulmonares."
  ],
  [
    "Segmental bronchi supply the segments.",
    "Brônquios segmentares suprem os segmentos."
  ],
  [
    "Connective tissue separates these functional units.",
    "Tecido conjuntivo separa essas unidades funcionais."
  ],
  [
    "A segment is a subdivision of a lobe.",
    "Um segmento é uma subdivisão de um lobo."
  ],
  [
    "Pulmonary circulation and nerves",
    "Circulação e nervos pulmonares"
  ],
  [
    "Two blood supplies",
    "Duas circulações"
  ],
  [
    "Bronchial circulation provides nutritional supply.",
    "A circulação brônquica fornece irrigação nutritiva."
  ],
  [
    "Pulmonary circulation serves respiration.",
    "A circulação pulmonar serve à respiração."
  ],
  [
    "The pulmonary trunk divides into right and left pulmonary arteries.",
    "O tronco pulmonar divide-se nas artérias pulmonares direita e esquerda."
  ],
  [
    "Bronchial and pulmonary circulations have different roles.",
    "As circulações brônquica e pulmonar têm funções diferentes."
  ],
  [
    "Alveoli and surfactant",
    "Alvéolos e surfactante"
  ],
  [
    "Type I pneumocytes cover most of the alveolar area.",
    "Pneumócitos tipo I cobrem a maior parte da área alveolar."
  ],
  [
    "Type II pneumocytes secrete surfactant.",
    "Pneumócitos tipo II secretam surfactante."
  ],
  [
    "Surfactant reduces surface tension.",
    "O surfactante reduz a tensão superficial."
  ],
  [
    "Type I cells cover most area; type II cells secrete surfactant.",
    "Células tipo I cobrem a maior área; células tipo II secretam surfactante."
  ],
  [
    "Pulmonary arteries",
    "Artérias pulmonares"
  ],
  [
    "Pulmonary arteries enter the respective lung hila.",
    "As artérias pulmonares entram nos respectivos hilos pulmonares."
  ],
  [
    "They follow the segmental bronchi.",
    "Elas acompanham os brônquios segmentares."
  ],
  [
    "The right pulmonary artery usually divides into superior and inferior branches.",
    "A artéria pulmonar direita geralmente divide-se em ramos superior e inferior."
  ],
  [
    "Pulmonary arteries carry blood; bronchi carry air.",
    "As artérias pulmonares conduzem sangue; os brônquios conduzem ar."
  ],
  [
    "Pulmonary veins",
    "Veias pulmonares"
  ],
  [
    "Each lung generally has two pulmonary veins.",
    "Cada pulmão geralmente tem duas veias pulmonares."
  ],
  [
    "The superior right vein drains the superior and middle lobes.",
    "A veia superior direita drena os lobos superior e médio."
  ],
  [
    "The inferior right vein drains the inferior lobe.",
    "A veia inferior direita drena o lobo inferior."
  ],
  [
    "Pulmonary veins return blood; pulmonary arteries carry blood to lungs.",
    "As veias pulmonares retornam sangue; as artérias pulmonares levam sangue aos pulmões."
  ],
  [
    "Lymph and nerves",
    "Linfa e nervos"
  ],
  [
    "Lung lymph reaches tracheobronchial nodes.",
    "A linfa pulmonar chega aos linfonodos traqueobrônquicos."
  ],
  [
    "Pulmonary plexuses have vagal and sympathetic components.",
    "Os plexos pulmonares têm componentes vagais e simpáticos."
  ],
  [
    "These nerves regulate airway muscle tone and mucus secretion.",
    "Esses nervos regulam o tônus muscular das vias aéreas e a secreção de muco."
  ],
  [
    "Lymphatic drainage and nerve supply are different pathways.",
    "A drenagem linfática e a inervação são vias diferentes."
  ],
  [
    "Pleura and recesses",
    "Pleura e recessos"
  ],
  [
    "Pleural layers",
    "Camadas pleurais"
  ],
  [
    "Visceral pleura adheres to the lung surface.",
    "A pleura visceral adere à superfície do pulmão."
  ],
  [
    "Parietal pleura forms the outer layer.",
    "A pleura parietal forma a camada externa."
  ],
  [
    "Pleural fluid lies between the layers.",
    "O líquido pleural fica entre as camadas."
  ],
  [
    "Visceral pleura covers the lung; parietal pleura is the outer layer.",
    "A pleura visceral cobre o pulmão; a parietal é a camada externa."
  ],
  [
    "Parietal pleura",
    "Pleura parietal"
  ],
  [
    "Parietal pleura has costovertebral and diaphragmatic parts.",
    "A pleura parietal tem partes costovertebral e diafragmática."
  ],
  [
    "It also has mediastinal and cervical parts.",
    "Ela também tem partes mediastinal e cervical."
  ],
  [
    "The cervical part forms the pleural dome.",
    "A parte cervical forma a cúpula pleural."
  ],
  [
    "The lung apex is closely related to the inferior cervical (stellate) sympathetic ganglion and the supreme intercostal artery.",
    "O ápice pulmonar tem relação íntima com o gânglio simpático cervical inferior (estrelado) e com a artéria intercostal suprema."
  ],
  [
    "These are continuous portions of parietal pleura.",
    "Essas são porções contínuas da pleura parietal."
  ],
  [
    "Pleural cavity",
    "Cavidade pleural"
  ],
  [
    "The pleural cavity is between visceral and parietal layers.",
    "A cavidade pleural fica entre as camadas visceral e parietal."
  ],
  [
    "The visceral layer reflects into the parietal layer at the hilum.",
    "A camada visceral reflete-se na parietal no hilo."
  ],
  [
    "Each lung has a separate pleural covering.",
    "Cada pulmão tem um revestimento pleural separado."
  ],
  [
    "The pleural cavity is a space between layers, not lung tissue.",
    "A cavidade pleural é um espaço entre camadas, não tecido pulmonar."
  ],
  [
    "Pleural recesses",
    "Recessos pleurais"
  ],
  [
    "The costodiaphragmatic recess lies between costovertebral and diaphragmatic pleura.",
    "O recesso costodiafragmático fica entre as pleuras costovertebral e diafragmática."
  ],
  [
    "The costomediastinal recess lies between costovertebral and mediastinal pleura.",
    "O recesso costomediastinal fica entre as pleuras costovertebral e mediastinal."
  ],
  [
    "The lungs partially occupy these recesses during inspiration.",
    "Os pulmões ocupam parcialmente esses recessos durante a inspiração."
  ],
  [
    "The two recesses are named for the pleural parts that meet.",
    "Os dois recessos recebem nomes das partes pleurais que se encontram."
  ],
  [
    "Pleural supply and sensation",
    "Irrigação e sensibilidade pleurais"
  ],
  [
    "Visceral pleura is sensitive to stretch.",
    "A pleura visceral é sensível ao estiramento."
  ],
  [
    "Parietal pleura is sensitive to pain and temperature.",
    "A pleura parietal é sensível à dor e à temperatura."
  ],
  [
    "Intercostal and phrenic nerves supply parietal pleura.",
    "Os nervos intercostais e frênico inervam a pleura parietal."
  ],
  [
    "Visceral and parietal pleura differ in sensation.",
    "As pleuras visceral e parietal diferem na sensibilidade."
  ]
];
export const RESP2_AULAS_PT = Object.fromEntries(textPairs);

const specs = [
  [
    "trachea",
    "Trachea and main bronchi",
    2,
    8,
    [
      [
        "extent",
        "Tracheal extent",
        "R2-2",
        3,
        [
          "traqueia",
          "bpd",
          "bpe"
        ]
      ],
      [
        "relations",
        "Tracheal relations",
        "R2-3–R2-5",
        3,
        [
          "traqueia",
          "esofago"
        ]
      ],
      [
        "bifurcation",
        "Bifurcation",
        "R2-6",
        4,
        [
          "traqueia",
          "bpd",
          "bpe"
        ]
      ],
      [
        "right-relations",
        "Right bronchial relations",
        "R2-7",
        3,
        [
          "bpd",
          "azigo",
          "apd"
        ]
      ],
      [
        "left-relations",
        "Left bronchial relations",
        "R2-7–R2-8",
        3,
        [
          "bpe",
          "esofago",
          "arco",
          "ape"
        ]
      ]
    ]
  ],
  [
    "bronchi",
    "Bronchial branching and walls",
    9,
    20,
    [
      [
        "lobar",
        "Lobar bronchi",
        "R2-9–R2-10",
        3,
        [
          "bpd",
          "bpe"
        ]
      ],
      [
        "branching",
        "Smaller airways",
        "R2-11–R2-12",
        3,
        []
      ],
      [
        "tracheal-wall",
        "Tracheal wall",
        "R2-13–R2-15",
        3,
        [
          "traqueia"
        ]
      ],
      [
        "bronchial-wall",
        "Bronchial wall",
        "R2-16",
        3,
        []
      ],
      [
        "vessels-nerves",
        "Airway supply",
        "R2-17–R2-20",
        3,
        []
      ]
    ]
  ],
  [
    "lungs",
    "Lung surfaces and lobes",
    21,
    35,
    [
      [
        "overview",
        "Lungs in the chest",
        "R2-21–R2-23",
        3,
        [
          "lobo_inf_d",
          "lobo_inf_e",
          "diafragma"
        ]
      ],
      [
        "hilum",
        "Pulmonary hila",
        "R2-24–R2-25",
        3,
        [
          "bpd",
          "bpe",
          "azigo",
          "arco",
          "ape"
        ]
      ],
      [
        "edges",
        "Lung edges",
        "R2-26–R2-29",
        3,
        [
          "lobo_sup_e",
          "lobo_inf_e"
        ]
      ],
      [
        "lobes",
        "Lobes and fissures",
        "R2-30",
        3,
        [
          "lobo_sup_d",
          "lobo_med_d",
          "lobo_inf_d",
          "lobo_sup_e",
          "lobo_inf_e"
        ]
      ],
      [
        "segments",
        "Bronchopulmonary segments",
        "R2-31–R2-35",
        3,
        []
      ]
    ]
  ],
  [
    "circulation",
    "Pulmonary circulation and nerves",
    36,
    41,
    [
      [
        "blood",
        "Two blood supplies",
        "R2-36",
        3,
        [
          "tp"
        ]
      ],
      [
        "alveoli",
        "Alveoli and surfactant",
        "R2-36",
        3,
        []
      ],
      [
        "arteries",
        "Pulmonary arteries",
        "R2-36–R2-37",
        3,
        [
          "tp",
          "bpd",
          "bpe",
          "apd",
          "ape"
        ]
      ],
      [
        "veins",
        "Pulmonary veins",
        "R2-36–R2-38",
        3,
        [
          "vpsd",
          "vpid",
          "vpse",
          "vpie"
        ]
      ],
      [
        "lymph-nerves",
        "Lymph and nerves",
        "R2-39–R2-41",
        3,
        []
      ]
    ]
  ],
  [
    "pleura",
    "Pleura and recesses",
    42,
    54,
    [
      [
        "layers",
        "Pleural layers",
        "R2-42",
        3,
        []
      ],
      [
        "parts",
        "Parietal pleura",
        "R2-43–R2-45",
        4,
        []
      ],
      [
        "cavity",
        "Pleural cavity",
        "R2-46–R2-47",
        3,
        []
      ],
      [
        "recesses",
        "Pleural recesses",
        "R2-48–R2-50",
        3,
        []
      ],
      [
        "sensation",
        "Pleural supply and sensation",
        "R2-51–R2-53",
        3,
        []
      ]
    ]
  ]
];
export const RESP2_AULAS = specs.map(([id, title, first, last, rows]) => ({
  id: 'airwaysLower-' + id, unit: 'airwaysLower', title,
  cards: rows.map(([cardId, cardTitle, ref, count, focus]) => {
    const start = textPairs.findIndex(([english]) => english === cardTitle);
    return { id: 'airwaysLower-' + id + '-' + cardId, title: cardTitle, ref, facts: textPairs.slice(start + 1, start + 1 + count).map(([english]) => english), confusion: textPairs[start + 1 + count][0], focus };
  }),
  questionIds: questions.filter(({ ref }) => { const slide = Number(ref.split('-')[1]); return slide >= first && slide <= last; }).map(({ ref, q }) => `airwaysLower:${ref}:${q}`),
}));
