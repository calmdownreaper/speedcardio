import content from './pt-br-content.js';
import aliases from './pt-br-aliases.js';
import ui from './pt-br-ui.js';
import { structureNames } from './pt-br.js';

// Disambiguate anatomy terms and UI messages whose general translation can mislead.
Object.assign(content, {
  'Great vessels': 'Grandes vasos', 'Skull': 'Crânio', 'Lung lobes': 'Lobos pulmonares',
  'Trachea and main bronchi': 'Traqueia e brônquios principais',
  'Left upper lobe and its tongue-like part (lingula)': 'Lobo superior esquerdo e língula',
  'Bony frame': 'Arcabouço ósseo', '30L Foramina and contents': '30L Forames e conteúdos', 'Speed run': 'Speedrun',
  'Speed run · Part 1': 'Speedrun · Parte 1', 'Speed run · Part 2': 'Speedrun · Parte 2',
  'Follow the pulmonary artery into each lobe and segment beside its bronchus.': 'Acompanhe a artéria pulmonar até cada lobo e segmento, ao lado do respectivo brônquio.',
  'Heart and lung anatomy': 'Anatomia do coração e dos pulmões',
  'Bone of the forehead and orbital roofs': 'Osso da testa e do teto das órbitas',
  'Atrial roof': 'Teto do átrio',
  'Septum primum forms the floor. The surrounding raised limbus represents the rim associated with septum secundum.': 'O septum primum forma o assoalho. O limbo elevado ao redor corresponde à borda associada ao septum secundum.',
  'Recall: base and apex; anterior ventricle; right border; exit vessels; posterior atrium; surface vessels; lungs and posterior mediastinum.': 'Relembre: base e ápice; ventrículo anterior; borda direita; vasos de saída; átrio posterior; vasos da superfície; pulmões e mediastino posterior.',
});
for (const [source, translated] of Object.entries(content)) {
  // A pulmonary lobe is a lobo, not a smaller pulmonary lobule.
  if (/\blobes?\b/i.test(source) && !/\blobules?\b/i.test(source)) {
    content[source] = translated.replace(/\blóbulo(s)?\b/gi, (match, plural = '') =>
      (match[0] === match[0].toUpperCase() ? 'Lobo' : 'lobo') + plural);
  }
}
Object.assign(ui, {
  'Z-Anatomy': 'Z-Anatomy', 'Rotatable anatomical model': 'Modelo anatômico giratório',
  'Type it': 'Digite o nome', 'First letter + clue': 'Primeira letra e dica', 'From memory': 'De memória',
  'Recall all of ZXVAR0ZX': 'Relembrar todas as estruturas de ZXVAR0ZX',
  'ZXVAR0ZX · full recall': 'ZXVAR0ZX · revisão completa',
  'ZXVAR0ZX structures · one continuous recall, including unstudied material.': 'ZXVAR0ZX estruturas em uma revisão contínua, inclusive as ainda não estudadas.',
  'ZXVAR1ZX structures · one continuous recall, including unstudied material.': 'ZXVAR1ZX estruturas em uma revisão contínua, inclusive as ainda não estudadas.',
  '/ ZXVAR4ZX recalled': '/ ZXVAR4ZX lembradas',
  'ZXVAR2ZX of ZXVAR3ZX levels passed · Pass by recalling every structure in Rounds 2 and 3.': 'ZXVAR2ZX de ZXVAR3ZX níveis concluídos · Para passar, lembre todas as estruturas nas rodadas 2 e 3.',
  'Recall the name from a close-up, without a clue.': 'Lembre o nome a partir de uma visão aproximada, sem dica.',
  'Recall due structures from a close-up.': 'Lembre as estruturas programadas para revisão a partir de uma visão aproximada.',
  'Replay the recall rounds to pass': 'Repita as rodadas de revisão para passar',
  'To unlock the next level, recall every structure at least once in both recall rounds.': 'Para desbloquear o próximo nível, lembre cada estrutura pelo menos uma vez nas duas rodadas de revisão.',
  'L/R = patient’s': 'L/R = lados do paciente',
  'No streak yet': 'Nenhuma sequência ainda',
  'Theme settings (ZXVAR0ZX)': 'Configurações de tema (ZXVAR0ZX)',
  'Type answer': 'Digite a resposta', 'Check answer': 'Conferir resposta',
  'ZXVAR0ZX of ZXVAR1ZX structures': 'ZXVAR0ZX de ZXVAR1ZX estruturas',
  'ZXVAR0ZX of ZXVAR1ZX structures answered.': 'ZXVAR0ZX de ZXVAR1ZX estruturas respondidas.',
  'ZXVAR0ZX of ZXVAR1ZX structures located.': 'ZXVAR0ZX de ZXVAR1ZX estruturas localizadas.',
  'It will come up again.': 'Ela aparecerá novamente.',
  'ZXVAR4ZX structures · ZXVAR5ZX': 'ZXVAR4ZX estruturas · ZXVAR5ZX',
  'Pass ZXVAR0ZX to ZXVAR1ZX': 'Conclua ZXVAR0ZX para ZXVAR1ZX',
  'open this bonus': 'abrir este bônus', 'unlock': 'desbloquear',
  'One structure from memory.': 'Uma estrutura para lembrar de memória.',
  'Practice': 'Praticar', 'Check answer': 'Conferir resposta',
  'Theme settings (Dark)': 'Configurações de tema (Escuro)',
  'Theme settings (Light)': 'Configurações de tema (Claro)',
  'Theme settings (System)': 'Configurações de tema (Sistema)',
  'Pairs with ZXVAR0ZX': 'Relacionado a ZXVAR0ZX',
  'of ZXVAR1ZX stars': 'de ZXVAR1ZX estrelas', 'day streak': 'dias de sequência',
  'ZXVAR1ZX/ZXVAR2ZX mastered': 'ZXVAR1ZX/ZXVAR2ZX dominadas',
  'Finish a recall round to start tracking.': 'Conclua uma rodada de revisão para começar a acompanhar seu progresso.',
});

// Identifiers, view directions and original answer aliases must not be translated.
const structuralKeys = new Set(['id', 'en', 'alt', 'ctx', 'ids', 'focus', 'scope', 'chips', 'view', 'region', 'level', 'anchors', 'key', 'choice', 'storagePrefix', 'cor']);
function translateValue(value, key = '') {
  if (structuralKeys.has(key)) return value;
  if (key === 'LEVEL_CONTRAST' && value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([id, contrast]) => [id, {
      ...translateValue(contrast), a: contrast.a, b: contrast.b,
    }]));
  }
  if (typeof value === 'string') {
    const translated = Object.hasOwn(content, value) ? content[value] : value;
    return /^[A-Z]/.test(value) && /^[a-zà-ÿ]/.test(translated)
      ? translated[0].toLocaleUpperCase('pt-BR') + translated.slice(1) : translated;
  }
  if (Array.isArray(value)) return value.map(item => translateValue(item, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, translateValue(item, name)]));
  return value;
}

export function localizePack(pack) {
  const localized = { ...pack };
  for (const key of ['decks', 'regions', 'content', 'lessons', 'territories', 'regionPurposes', 'tagline', 'description', 'mapHeading', 'atlasNote']) {
    if (pack[key] !== undefined) localized[key] = translateValue(pack[key]);
  }
  localized.decks = localized.decks.map((deck, deckIndex) => ({ ...deck,
    itens: deck.itens.map((item, itemIndex) => {
      const original = pack.decks[deckIndex].itens[itemIndex];
      const translatedAliases = (original.alt || []).map(name => aliases[name]).filter(Boolean);
      return { ...item, pt: structureNames[item.id] || item.pt,
        alt: [...new Set([...(original.alt || []), original.pt, ...translatedAliases])] };
    }),
  }));
  return localized;
}

const squash = text => text.replace(/\s+/g, ' ').trim();
const quoteRegex = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const templates = Object.entries(ui).filter(([source, target]) => {
  const tokens = source.match(/ZXVAR\d+ZX/g) || [];
  if (!tokens.length || !target || !/[A-Za-z]{2}/.test(source.replace(/ZXVAR\d+ZX/g, ''))) return false;
  return [...tokens].sort().join('|') === (target.match(/ZXVAR\d+ZX/g) || []).sort().join('|');
}).map(([source, target]) => {
  const parts = source.split(/(ZXVAR\d+ZX)/g);
  const tokens = parts.filter(part => /^ZXVAR\d+ZX$/.test(part));
  const pattern = parts.map(part => /^ZXVAR\d+ZX$/.test(part) ? '(.*?)' : quoteRegex(part)).join('');
  return { source, target, tokens, regex: new RegExp(`^${pattern}$`), specificity: source.replace(/ZXVAR\d+ZX/g, '').length };
}).sort((a, b) => b.specificity - a.specificity);

export function translateInterface(text, depth = 0) {
  const normalized = squash(text);
  if (!normalized) return text;
  let result = Object.hasOwn(ui, normalized) ? ui[normalized] : content[normalized];
  const reviews = normalized.match(/^\+(\d+) reviews?$/);
  const streak = normalized.match(/^(\d+)-day streak$/);
  if (reviews) result = `+${reviews[1]} ${reviews[1] === '1' ? 'revisão' : 'revisões'}`;
  if (streak) result = `${streak[1]} ${streak[1] === '1' ? 'dia' : 'dias'} de sequência`;
  if (!result) {
    for (const template of templates) {
      const match = normalized.match(template.regex);
      if (!match) continue;
      const values = Object.fromEntries(template.tokens.map((token, i) => {
        const captured = match[i + 1];
        return [token, depth < 3 && captured.length < normalized.length ? translateInterface(captured, depth + 1) : captured];
      }));
      result = template.target.replace(/ZXVAR\d+ZX/g, token => values[token] ?? token);
      break;
    }
  }
  if (!result || result === normalized) return text;
  return (text.match(/^\s*/)?.[0] || '') + result + (text.match(/\s*$/)?.[0] || '');
}

// Translate the app's authored UI messages whenever a screen or status changes.
// The input display is excluded so a learner's typed answer is never altered.
export function installInterfaceTranslation(root = document) {
  const attrs = ['aria-label', 'title', 'placeholder'];
  const ignore = element => element?.closest?.('script, style, textarea, code, #word, [translate="no"]');
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (ignore(node.parentElement)) return;
      const next = translateInterface(node.nodeValue || '');
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || ignore(node)) return;
    for (const attr of attrs) {
      if (!node.hasAttribute(attr)) continue;
      const value = node.getAttribute(attr), next = translateInterface(value);
      if (next !== value) node.setAttribute(attr, next);
    }
    for (const child of node.childNodes) translateNode(child);
  }
  translateNode(root.documentElement || root);
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' || mutation.type === 'characterData') translateNode(mutation.target);
      else for (const node of mutation.addedNodes) translateNode(node);
    }
  });
  observer.observe(root.documentElement || root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs });
  return observer;
}
