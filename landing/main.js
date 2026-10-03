// ReadiLY landing page behaviour. Ported from the DCLogic class in the
// Claude Design file "ReadiLY Landing Page.dc.html". No dependencies.

// Content switches (mirror the design file's props)
const HEADLINE = 'A';          // 'A' | 'B' — see PRD §5 headline options
const SHOW_CONFIRM = true;     // show [CONFIRM]/[VERIFY] markers; set false only once PRD §8 claims are cleared

// Where pilot-list entries go. Empty until storage and the privacy notice are
// settled (PRD open question 8). Until then entries are logged and kept locally.
const FORM_ENDPOINT = '';

window.__readily = true;
const doc = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!SHOW_CONFIRM) doc.dataset.confirm = 'off';

// ---------- Analytics (cookieless stub, PRD R9) ----------
const q = new URLSearchParams(location.search);
const utm = { source: q.get('utm_source'), medium: q.get('utm_medium'), campaign: q.get('utm_campaign') };
const referrer = document.referrer || null;
function track(name, data = {}) {
  const ev = { name, ...data, utm, referrer, t: Date.now() };
  (window.readilyEvents = window.readilyEvents || []).push(ev);
  (window.dataLayer = window.dataLayer || []).push({ event: name, ...data });
  console.debug('[analytics]', ev);
}

// ---------- Headline variant ----------
document.querySelectorAll('h1[data-headline]').forEach(h => { h.hidden = h.dataset.headline !== HEADLINE; });

// ---------- Nav ----------
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.querySelector('[data-menu]');
function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', String(open));
  if (open) {
    menu.hidden = false;
    menu.classList.add('is-closed');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.remove('is-closed')));
  } else {
    menu.classList.add('is-closed');
    const done = () => { if (menuBtn.getAttribute('aria-expanded') === 'false') menu.hidden = true; };
    reduceMotion ? done() : setTimeout(done, 200);
  }
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
});

// ---------- CTA + link tracking ----------
document.addEventListener('click', e => {
  const cta = e.target.closest('[data-cta]');
  if (cta) {
    const loc = cta.dataset.cta === 'nav' && window.innerWidth < 900 ? 'nav-mobile' : cta.dataset.cta;
    track('cta_click', { location: loc });
  }
  const t = e.target.closest('[data-track]');
  if (t) track(t.dataset.track);
});

// ---------- Time comparison accordion (one open at a time) ----------
document.querySelectorAll('[data-accordion]').forEach(group => {
  const items = [...group.querySelectorAll('.module')];
  const sync = () => items.forEach(m => m.classList.toggle('is-open', m.querySelector('.module-btn').getAttribute('aria-expanded') === 'true'));
  items.forEach(m => {
    const btn = m.querySelector('.module-btn');
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      items.forEach(o => o.querySelector('.module-btn').setAttribute('aria-expanded', 'false'));
      btn.setAttribute('aria-expanded', String(!open));
      sync();
      if (!open) track('time_row_open', { row: items.indexOf(m) + 1 });
    });
  });
  sync();
});

// ---------- Carousels (app screens, build targets) ----------
const SCREEN_CAPTIONS = [
  ['Class list', 'Pick Miguel and a passage matched to his grade. Four sets rotate so no child reads the same story twice.'],
  ['Before recording', 'The microphone stays off until consent is confirmed, and a noise check runs first. Bea gets her warm-up read here.'],
  ['Reading aloud', 'The tablet records on the device and compares what it hears with the text. Audio never leaves it.'],
  ['The result', 'About thirty seconds later: words correct per minute, accuracy, the official level, and every mistake labelled.'],
  ['Review and export', 'Tap a flagged word to change the call. Then export the DepEd spreadsheet, already filled in.']
];
document.querySelectorAll('[data-carousel]').forEach(car => {
  const name = car.dataset.carousel;
  const slides = [...car.querySelectorAll('.slide, .screen')];
  const count = car.querySelector('[data-count]');
  const capTitle = car.querySelector('[data-cap-title]');
  const capBody = car.querySelector('[data-cap-body]');
  let i = 0;
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
    if (count) count.textContent = `${i + 1}/${slides.length}`;
    if (capTitle && SCREEN_CAPTIONS[i]) { capTitle.textContent = SCREEN_CAPTIONS[i][0]; capBody.textContent = SCREEN_CAPTIONS[i][1]; }
    track('carousel_slide', { carousel: name, slide: i + 1 });
  };
  car.querySelector('[data-prev]').addEventListener('click', () => go(i - 1));
  car.querySelector('[data-next]').addEventListener('click', () => go(i + 1));
});

// ---------- FAQ ----------
const FAQ = [
  ['Is ReadiLY a new test?', 'No. It gives CRLA and Phil-IRI as they are, using DepEd’s own formulas and levels: Independent (97–100%), Instructional (90–96%) and Frustration (89% and below).'],
  ['Does it need internet?', 'No. Everything works in airplane mode. When a connection appears, only scores sync. Audio never does.'],
  ['Do we need new tablets?', 'No. One tablet per teacher is enough, and a single shared tablet per grade level works because children are tested one after another. The app needs about 200 MB of memory. We will check how many of your tablets still work before we start. A boom-mic headset comes in the onboarding kit.'],
  ['What about Filipino?', 'At launch, automatic scoring is English only. You can record Filipino passages and review them yourself. Automatic Filipino scoring is planned.'],
  ['Will it understand my pupils, and a noisy room?', 'Accent substitutions count as correct by default. The app checks the noise level before recording and warns you when conditions are too poor to score fairly. You can overrule any score. Whether this is enough in open-air classrooms is a named question for the pilot.'],
  ['How accurate is it?', 'We have no classroom results yet, so we will not quote a figure. Our build targets are on this page. After the pilot we plan a formal study: 300 children, each recording scored independently by two trained DepEd reading coordinators.'],
  ['Does it submit to the DepEd portal for me?', 'No. It produces the filled-in spreadsheet. You upload it.'],
  ['How is it different from Microsoft Reading Progress?', 'Reading Progress is free inside Microsoft Teams. It sends audio to Microsoft’s cloud, needs internet and a Microsoft account for each child, and produces its own report. ReadiLY works offline, keeps audio on the tablet and fills in the DepEd spreadsheet.', true],
  ['Who owns the data?', 'Your school. We are only the processor, under a written agreement, and the data exports to a spreadsheet whenever you ask.'],
  ['Does it replace the teacher’s judgement?', 'No. Every flagged word can be changed, and the score recalculates.'],
  ['We use ARAL tutors who are not licensed teachers. Can they use it?', 'We expect them to benefit most, because ReadiLY gives the same test the same way every time. We want to hear from ARAL coordinators on the pilot list.']
];
const faqRoot = document.querySelector('[data-faq]');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
faqRoot.innerHTML = FAQ.map(([qq, a, verify], k) => `
  <div class="faq-item${k === 0 ? ' is-open' : ''}" data-reveal style="--d:${Math.min(k, 5)}">
    <h3><button type="button" class="faq-btn" id="faq-b-${k}" aria-expanded="${k === 0}" aria-controls="faq-p-${k}">
      <span>${esc(qq)}</span><span class="pm" aria-hidden="true"></span>
    </button></h3>
    <div class="faq-panel" id="faq-p-${k}" role="region" aria-labelledby="faq-b-${k}">
      <div><p>${esc(a)}</p>${verify ? '<span class="confirm">VERIFY before publishing</span>' : ''}</div>
    </div>
  </div>`).join('');
const faqItems = [...faqRoot.querySelectorAll('.faq-item')];
faqItems.forEach((item, k) => {
  const btn = item.querySelector('.faq-btn');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    faqItems.forEach(o => { o.classList.remove('is-open'); o.querySelector('.faq-btn').setAttribute('aria-expanded', 'false'); });
    if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); track('faq_open', { question: k + 1 }); }
  });
});

// ---------- Benefits: 40 dots, the last one is Miguel ----------
const dots = document.querySelector('.dot-grid');
if (dots) dots.innerHTML = '<i></i>'.repeat(40);

// ---------- Pilot-list form ----------
const form = document.querySelector('[data-form]');
const success = document.querySelector('[data-success]');
const roleOther = document.querySelector('[data-role-other]');
const REQUIRED = ['name', 'role', 'school', 'city', 'contact', 'consent'];
let started = false;

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Please add your name.';
  if (!f.role) e.role = 'Please choose your role.';
  if (!f.school.trim()) e.school = 'Please add your school name.';
  if (!f.city.trim()) e.city = 'Please add your city or municipality.';
  if (!f.contact.trim()) e.contact = 'Please add a mobile number or an email so we can reach you.';
  if (!f.consent) e.consent = 'Please tick the box so we can contact you about the pilot.';
  return e;
}
function readForm() {
  const d = new FormData(form);
  return {
    name: d.get('name') || '', role: d.get('role') || '', school: d.get('school') || '', city: d.get('city') || '',
    count: d.get('count') || '', contact: d.get('contact') || '', consent: form.elements.consent.checked
  };
}
function showError(k, msg) {
  const input = document.getElementById('f-' + k);
  const err = document.getElementById('e-' + k);
  input.setAttribute('aria-invalid', String(!!msg));
  err.hidden = !msg;
  err.textContent = msg || '';
}

form.addEventListener('focusin', () => { if (!started) { started = true; track('form_start'); } });
form.addEventListener('input', e => {
  const k = e.target.name;
  if (REQUIRED.includes(k)) showError(k, '');
  if (k === 'role') roleOther.hidden = e.target.value !== 'Other';
});
form.addEventListener('change', e => { if (e.target.name === 'role') roleOther.hidden = e.target.value !== 'Other'; });

form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = readForm();
  const errors = validate(f);
  REQUIRED.forEach(k => showError(k, errors[k]));
  const keys = Object.keys(errors);
  if (keys.length) {
    track('form_error', { fields: keys });
    document.getElementById('f-' + keys[0]).focus();
    return;
  }
  const entry = { ...f, count: f.count ? Number(f.count) : null, consentAt: new Date().toISOString(), utm, referrer };
  if (FORM_ENDPOINT) {
    try {
      await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) });
    } catch (err) { console.warn('[lead] send failed', err); }
  } else {
    console.debug('[lead]', entry);
    try {
      const list = JSON.parse(localStorage.getItem('readily-leads') || '[]');
      list.push(entry);
      localStorage.setItem('readily-leads', JSON.stringify(list));
    } catch { /* storage blocked: the console log above is the record */ }
  }
  track('form_submit', { role: entry.role });
  form.hidden = true;
  success.hidden = false;
  success.querySelector('p').setAttribute('tabindex', '-1');
  success.querySelector('p').focus();
});

const copyBtn = document.querySelector('[data-copy]');
copyBtn.addEventListener('click', () => {
  const url = location.origin + location.pathname + '?utm_source=forward';
  (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).catch(() => {});
  copyBtn.textContent = 'Link copied';
  track('copy_link');
});

// ---------- Section views + scroll reveal ----------
if ('IntersectionObserver' in window) {
  const seen = new Set();
  const secObs = new IntersectionObserver(es => es.forEach(en => {
    const id = en.target.dataset.section;
    if (en.isIntersecting && !seen.has(id)) { seen.add(id); track('section_view', { section: id }); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-section]').forEach(el => secObs.observe(el));

  const revObs = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); revObs.unobserve(en.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    // Anything already on screen at load is shown at once, with no animation.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.transition = 'none';
      el.classList.add('is-in');
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = ''; }));
    } else {
      revObs.observe(el);
    }
  });
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
}
