// Independent practice mode: name the coronary artery that supplies a wall,
// septum or conduction region. The model focus deliberately shows the territory,
// never the artery, so the answer is not leaked before the choice is made.
const CASES = [
  {
    label: 'Anterior left ventricular wall',
    prompt: 'Which coronary artery most commonly supplies the anterior wall and apex of the left ventricle?',
    correct: 'LAD',
    wrong: ['RCA', 'LCx', 'PDA'],
    why: 'The left anterior descending artery runs in the anterior interventricular groove and gives diagonal and septal branches to the anterior wall and apex.',
    focus: ['ve'], view: 'ant',
  },
  {
    label: 'Anterior interventricular septum',
    prompt: 'Which artery supplies the anterior two-thirds of the interventricular septum?',
    correct: 'LAD',
    wrong: ['RCA', 'LCx', 'PDA'],
    why: 'Anterior septal perforators from the LAD enter the septum and supply its anterior two-thirds, including the right bundle branch and left anterior fascicle.',
    focus: ['paredev'], view: 'ant',
  },
  {
    label: 'Lateral left ventricular wall',
    prompt: 'Which artery most commonly supplies the lateral wall of the left ventricle through its marginal branches?',
    correct: 'LCx',
    wrong: ['LAD', 'RCA', 'Left main'],
    why: 'The circumflex artery runs in the left atrioventricular groove and gives marginal branches to the lateral LV wall.',
    focus: ['ve'], view: 'esq',
  },
  {
    label: 'Inferior left ventricular wall',
    prompt: 'In a right-dominant heart, which artery supplies most of the inferior (diaphragmatic) wall of the left ventricle?',
    correct: 'RCA',
    wrong: ['LAD', 'LCx', 'Left main'],
    why: 'In right dominance the RCA gives the posterior descending artery, which supplies the inferior wall and posterior third of the septum.',
    focus: ['ve'], view: 'inf',
  },
  {
    label: 'Posterior interventricular septum',
    prompt: 'Which artery runs in the posterior interventricular groove to supply the posterior third of the septum?',
    correct: 'PDA',
    wrong: ['LAD', 'LCx', 'RCA'],
    why: 'The posterior descending artery supplies the posterior third of the interventricular septum; its parent artery defines coronary dominance.',
    focus: ['paredev'], view: 'post',
  },
  {
    label: 'Right ventricular free wall',
    prompt: 'Which coronary artery most commonly supplies the free wall of the right ventricle?',
    correct: 'RCA',
    wrong: ['LAD', 'LCx', 'PDA'],
    why: 'Right marginal and anterior ventricular branches of the RCA supply most of the RV free wall; small LAD branches contribute anteriorly.',
    focus: ['vd'], view: 'ant',
  },
  {
    label: 'Sinoatrial node region',
    prompt: 'Which coronary artery most commonly supplies the sinoatrial node?',
    correct: 'RCA',
    wrong: ['LAD', 'LCx', 'PDA'],
    why: 'The SA nodal branch arises from the RCA in about 60% of people and from the circumflex in most of the remainder.',
    focus: ['ad'], view: 'ant',
  },
  {
    label: 'Atrioventricular node region',
    prompt: 'Which coronary artery most commonly supplies the atrioventricular node?',
    correct: 'RCA',
    wrong: ['LAD', 'LCx', 'PDA'],
    why: 'The AV nodal branch usually arises from the dominant artery near the crux; in right dominance this is the RCA.',
    focus: ['ad'], view: 'post',
  },
];

export const TERRITORIES = CASES.map((item, index) => {
  const choices = [item.correct, ...item.wrong];
  const answer = index % choices.length;
  return {
    ...item,
    answer,
    options: choices.map((_, position) => choices[(position - answer + choices.length) % choices.length]),
  };
});
