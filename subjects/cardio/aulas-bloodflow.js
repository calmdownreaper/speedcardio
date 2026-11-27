// Adult circulation: professor's Heart digest H6, H17–H28 and lower-airway digest R2-36.
// Labels, model IDs, views and blood colors come from the localized BLOOD_FLOW steps.
export function createBloodFlowDrill(steps, text) {
  if (!Array.isArray(steps) || steps.length !== 12 || typeof text !== 'function') {
    throw new Error('Blood flow drill requires the twelve localized steps and a text selector');
  }
  const t = text;
  const facts = [
    [t('The superior and inferior venae cavae return systemic venous blood to the heart.', 'As veias cavas superior e inferior devolvem ao coração o sangue venoso sistêmico.'), t('Both open into the right atrium.', 'Ambas desembocam no átrio direito.')],
    [t('The right atrium receives the superior and inferior venae cavae.', 'O átrio direito recebe as veias cavas superior e inferior.'), t('The coronary sinus also opens into the right atrium.', 'O seio coronário também desemboca no átrio direito.')],
    [t('The tricuspid valve is the right atrioventricular valve.', 'A valva tricúspide é a valva atrioventricular direita.'), t('Its cusps are anterior, posterior and septal.', 'Suas cúspides são anterior, posterior e septal.')],
    [t('The right ventricle contains papillary muscles and chordae tendineae.', 'O ventrículo direito contém músculos papilares e cordas tendíneas.'), t('The conus arteriosus leads toward the pulmonary outflow.', 'O cone arterial conduz à via de saída pulmonar.')],
    [t('The pulmonary valve is a semilunar valve at the right ventricular outflow.', 'A valva pulmonar é uma valva semilunar na saída do ventrículo direito.'), t('Semilunar valve closure accompanies the second heart sound.', 'O fechamento das valvas semilunares acompanha a segunda bulha cardíaca.')],
    [t('The pulmonary trunk divides into right and left pulmonary arteries.', 'O tronco pulmonar divide-se nas artérias pulmonares direita e esquerda.'), t('The pulmonary circulation connects the heart to the lungs.', 'A circulação pulmonar conecta o coração aos pulmões.')],
    [t('Pulmonary veins return blood from the lungs to the left atrium.', 'As veias pulmonares devolvem sangue dos pulmões ao átrio esquerdo.'), t('The class material describes two pulmonary veins per lung.', 'O material da aula descreve duas veias pulmonares por pulmão.')],
    [t('Pulmonary veins open into the left atrium.', 'As veias pulmonares desembocam no átrio esquerdo.'), t('The left atrium connects to the left ventricle through the mitral valve.', 'O átrio esquerdo conecta-se ao ventrículo esquerdo pela valva mitral.')],
    [t('The mitral valve is the left atrioventricular valve.', 'A valva mitral é a valva atrioventricular esquerda.'), t('It has two cusps and connects the left atrium and ventricle.', 'Ela tem duas cúspides e conecta o átrio e o ventrículo esquerdos.')],
    [t('The left ventricle contains papillary muscles and chordae tendineae.', 'O ventrículo esquerdo contém músculos papilares e cordas tendíneas.'), t('Its outflow passes through the aortic valve.', 'Sua via de saída passa pela valva aórtica.')],
    [t('The aortic valve is a semilunar valve at the left ventricular outflow.', 'A valva aórtica é uma valva semilunar na saída do ventrículo esquerdo.'), t('The aortic sinuses contain the openings of the coronary arteries.', 'Os seios aórticos contêm os óstios das artérias coronárias.')],
    [t('The aorta carries blood from the left ventricle toward the systemic circulation.', 'A aorta conduz sangue do ventrículo esquerdo à circulação sistêmica.'), t('The systemic circuit connects the heart and body.', 'A circulação sistêmica conecta o coração ao corpo.')],
  ];
  const refs = ['H6, H17', 'H17', 'H23', 'H18', 'H24, H28', 'H6; R2-36', 'H19; R2-36', 'H19', 'H23, H27', 'H20', 'H22, H25–H26', 'H6, H21'];
  const cards = steps.map((step, index) => ({
    id: step.id, ref: refs[index], title: step.label, short: step.short, facts: facts[index],
    focus: [...step.ids], view: step.view, blood: step.blood,
  }));
  const questions = steps.map((target, index) => {
    const previous = steps[index - 1];
    // Three distinct distractors; the correct answer occupies each position three times.
    const distractors = [3, 6, 9].map(offset => steps[(index + offset) % steps.length]);
    const answer = index % 4;
    const options = distractors.map(step => step.label);
    options.splice(answer, 0, target.label);
    const q = index === 0
      ? t('Systemic venous blood returns to the heart through which vessels?', 'Por quais vasos o sangue venoso sistêmico retorna ao coração?')
      : index === 6
        ? t('After blood passes through the lungs, which vessels return it to the heart?', 'Depois de passar pelos pulmões, quais vasos devolvem o sangue ao coração?')
        : t(`After ${previous.label}, which structure is next in the pathway?`, `Após a etapa “${previous.label}”, qual é a próxima estrutura no trajeto?`);
    const why = index === 0
      ? facts[0][0]
      : index === 6
        ? facts[6][0]
        : t(`The next step after ${previous.label} is ${target.label}.`, `Após “${previous.label}”, a próxima etapa é “${target.label}”.`);
    return { id: `drill-bloodflow:${target.id}`, q, why, options, answer,
      focus: previous ? [...previous.ids] : [], reveal: [...target.ids],
      view: previous?.view || target.view, highlight: false,
      blood: previous?.blood || target.blood, revealBlood: target.blood };
  });
  return { id: 'drill-bloodflow', unit: 'heart', title: t('Blood flow through the heart', 'Trajeto do sangue pelo coração'), cards, questions, sequence: true };
}
