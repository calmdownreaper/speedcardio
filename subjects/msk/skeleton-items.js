// SpeedMSK · Skeleton deck for the individual bones built by
// research/tools/build_msk_bones.mjs. These items give the atlas ITEMS entries
// (names, typing strings, colours) without changing any existing MSK id.
import { SKELETON_PARTS } from './skeleton-parts.js?v=1';

export const deck = {
  id: 'skeleton',
  titulo: 'Skeleton',
  cor: '#d9cbb4',
  ctx: [],
  itens: SKELETON_PARTS.map(part => ({
    id: part.id,
    pt: part.en,
    en: part.en,
    alt: [part.pt],
    dica: part.en,
    fatos: [],
  })),
};

export const colors = Object.fromEntries(SKELETON_PARTS.map(part => [part.id, part.color]));
