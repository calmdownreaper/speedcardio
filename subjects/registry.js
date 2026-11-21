// Subject registry. Add a subject by exporting its pack module and listing it
// here; the engine loads only the selected subject's modules.
const V = '?v=56';

export const SUBJECTS = [
  {
    id: 'cardio',
    name: 'SpeedCardio',
    tagline: 'Heart and lung anatomy',
    load: () => import(`./cardio/index.js${V}`),
  },
  {
    id: 'msk',
    name: 'SpeedMSK',
    tagline: 'Musculoskeletal anatomy',
    load: () => import(`./msk/index.js${V}`),
  },
];

export const DEFAULT_SUBJECT = 'cardio';

export function subjectFromUrl(search = window.location.search) {
  const requested = new URLSearchParams(search).get('s');
  return SUBJECTS.some(subject => subject.id === requested) ? requested : DEFAULT_SUBJECT;
}

export function subjectUrl(id, href = window.location.href) {
  const url = new URL(href);
  url.searchParams.set('s', SUBJECTS.some(subject => subject.id === id) ? id : DEFAULT_SUBJECT);
  return url.toString();
}
