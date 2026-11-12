(() => {
  const CFG = window.DiaryConfig, I18N = window.DiaryI18n, F = window.DiaryFoods, R = window.DiaryRecipes;
  const KEY = 'pn-food-diary';
  const $ = id => document.getElementById(id);

  // ---------- state ----------
  const detectLang = () => {
    const prefs = navigator.languages || [navigator.language || ''];
    for (const p of prefs) { const c = p.slice(0, 2).toLowerCase(); if (CFG.languages.includes(c)) return c; }
    return CFG.fallbackLanguage;
  };
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  const cleanLog = arr => (Array.isArray(arr) ? arr : []).filter(e => e && F.byId.has(e.food) && DATE.test(e.date)).map(e => ({
    id: String(e.id || Math.random().toString(36).slice(2)), food: e.food, date: e.date,
    like: [1, 0, -1].includes(e.like) ? e.like : null, reaction: !!e.reaction, checked: !!e.checked, note: String(e.note || '').slice(0, 300),
    meal: MEALS.includes(e.meal) ? e.meal : '', recipe: Number.isInteger(e.recipe) && R && R.list[e.recipe] ? e.recipe : null
  }));
  // Plano: dia -> números das receitas.
  const cleanPlan = p => {
    const out = {};
    if (p && typeof p === 'object') for (const [d, ids] of Object.entries(p)) {
      if (!DATE.test(d) || !Array.isArray(ids)) continue;
      const ok = [...new Set(ids)].filter(n => Number.isInteger(n) && R && R.list[n]).slice(0, 8);
      if (ok.length) out[d] = ok;
    }
    return out;
  };
  // Notas do dia: dia -> texto.
  const cleanNotes = n => {
    const out = {};
    if (n && typeof n === 'object') for (const [d, txt] of Object.entries(n)) if (DATE.test(d) && typeof txt === 'string' && txt.trim()) out[d] = txt.slice(0, 500);
    return out;
  };
  // Diário dos pais. O áudio de cada entrada fica à parte, no IndexedDB, com a mesma chave.
  const MEALS = ['breakfast', 'lunch', 'snack', 'dinner'];
  const METHODS = ['blw', 'spoon', 'both', 'unsure'];
  const GOALS = ['safe', 'allergens', 'meals', 'what', 'browse'];
  const MOODS = ['joy', 'proud', 'tender', 'laugh', 'tired', 'worry'];
  const cleanJournal = arr => (Array.isArray(arr) ? arr : []).filter(e => e && DATE.test(e.date)).slice(0, 500).map(e => ({
    id: String(e.id || 'j' + Math.random().toString(36).slice(2)), date: e.date, title: String(e.title || '').slice(0, 80),
    text: String(e.text || '').slice(0, 4000), audio: !!e.audio, secs: Math.max(0, Math.min(3600, Math.round(+e.secs || 0))),
    mood: MOODS.includes(e.mood) ? e.mood : '', photo: !!e.photo, at: /^\d\d:\d\d$/.test(e.at) ? e.at : '', book: e.book === 'parents' ? 'parents' : 'baby'
  }));
  const cleanBaby = b => ({
    id: String(b.id || ''), name: String(b.name || '').slice(0, 40), birth: DATE.test(b.birth) ? b.birth : '', log: cleanLog(b.log), plan: cleanPlan(b.plan), notes: cleanNotes(b.notes), journal: cleanJournal(b.journal),
    jmoods: Object.fromEntries(Object.entries(b.jmoods && typeof b.jmoods === 'object' ? b.jmoods : {}).filter(([d, m]) => /^\d{4}-\d\d-\d\d(\|p)?$/.test(d) && MOODS.includes(m))),
    method: METHODS.includes(b.method) ? b.method : '', premature: !!b.premature, eczema: !!b.eczema, diet: ['veg', 'vegan'].includes(b.diet) ? b.diet : '',
    avoid: (Array.isArray(b.avoid) ? b.avoid : []).filter(a => F.allergens.includes(a)),
    bought: { week: DATE.test(b.bought?.week) ? b.bought.week : '', lines: (Array.isArray(b.bought?.lines) ? b.bought.lines : []).filter(x => typeof x === 'string').slice(0, 300) }
  });
  // O bebé ativo fica acessível em state.baby e os seus registos em state.log (não são gravados em duplicado).
  const withCurrent = st => {
    const cur = () => st.babies.find(b => b.id === st.current) || st.babies[0];
    Object.defineProperty(st, 'baby', { get: cur, enumerable: false });
    Object.defineProperty(st, 'log', { get: () => cur().log, set: v => { cur().log = v; }, enumerable: false });
    return st;
  };
  const clean = raw => {
    const s = raw && typeof raw === 'object' ? raw : {};
    // Versões antigas guardavam um só bebé em s.baby e s.log.
    const source = Array.isArray(s.babies) && s.babies.length ? s.babies : [{ name: s.baby?.name, birth: s.baby?.birth, log: s.log }];
    const seen = new Set();
    const babies = source.slice(0, 6).map((b, i) => {
      const x = cleanBaby(b && typeof b === 'object' ? b : {});
      if (!x.id || seen.has(x.id)) x.id = 'b' + i + Math.random().toString(36).slice(2, 6);
      seen.add(x.id); return x;
    });
    return withCurrent({
      lang: CFG.languages.includes(s.lang) ? s.lang : detectLang(),
      onboarded: !!s.onboarded,
      goals: (Array.isArray(s.goals) ? s.goals : []).filter(g => GOALS.includes(g)), started: typeof s.started === 'boolean' ? s.started : null, hideStart: !!s.hideStart,
      favFoods: [...new Set(Array.isArray(s.favFoods) ? s.favFoods : [])].filter(id => F.byId.has(id)),
      favRecipes: [...new Set(Array.isArray(s.favRecipes) ? s.favRecipes : [])].filter(n => Number.isInteger(n) && R && R.list[n]),
      babies, current: seen.has(s.current) ? s.current : babies[0].id
    });
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY))); } catch { return clean(null); } };
  let state = load();
  // Se o dispositivo não deixar guardar (armazenamento cheio ou bloqueado), avisa em vez de falhar em silêncio.
  let saveWarned = false;
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); saveWarned = false; }
    catch { if (!saveWarned) { saveWarned = true; try { toast(t().saveFail); } catch { /* ainda sem interface */ } } }
  };
  // Pede ao browser para não apagar os registos quando precisar de espaço (não mostra nada à pessoa na maioria dos browsers).
  if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => p || navigator.storage.persist()).catch(() => {});
  // Instalação no ecrã principal: o Android/Chrome oferece um pedido próprio; no iPhone só há instruções.
  let installEvt = null;
  const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (tab === 'settings') render(); });
  window.addEventListener('appinstalled', () => { installEvt = null; if (tab === 'settings') render(); });

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayIso = () => iso(new Date());
  let calFilter = 'all'; // all | new | reaction | note
  let calMonth = null; // mês aberto no calendário (AAAA-MM); null = o mês do dia escolhido
  let tab = 'today', day = todayIso(), query = '', rquery = '', rstage = null, rseg = 'list', planOffset = 0;
  // Receitas: originais em português; os outros idiomas vêm dos ficheiros recipes.<idioma>.js.
  const RX = window.DiaryRecipesI18n || {};
  const hasRecipes = () => !!R && (R.lang === state.lang || Array.isArray(RX[state.lang]));
  const rx = r => R.lang === state.lang ? r : Object.assign({}, r, RX[state.lang][r.id]);

  const t = () => I18N[state.lang];
  const fname = food => F.name(food, state.lang);
  const fmtDate = (s, opts) => new Intl.DateTimeFormat(state.lang, opts).format(parse(s));
  const countFor = id => state.log.filter(e => e.food === id).length;
  const ageMonths = () => {
    if (!state.baby.birth) return null;
    const b = parse(state.baby.birth), n = new Date();
    let m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth();
    if (n.getDate() < b.getDate()) m--;
    return m >= 0 ? m : null;
  };

  // Perfil do bebé: alergias confirmadas e alimentação da família.
  const MEAT = ['chicken', 'turkey', 'beef', 'pork', 'lamb', 'rabbit'];
  const avoided = food => !!food.allergen && state.baby.avoid.includes(food.allergen);
  const dietOut = food => {
    const d = state.baby.diet;
    if (!d) return false;
    if (MEAT.includes(food.id) || food.allergen === 'fish' || food.allergen === 'shellfish') return true;
    return d === 'vegan' && (food.allergen === 'milk' || food.allergen === 'egg' || food.id === 'honey');
  };
  // Plano guiado. A REVER POR PROFISSIONAL DE SAÚDE: o ritmo vem de config.js > plan.
  // Os alimentos seguem a ordem de foods.js, alternando categorias; em cada semana entra, no máximo, um grupo de alergénio novo.
  const PLAN = Object.assign({ perWeek: 5, allergensFromWeek: 2, freeWeeks: 2 }, CFG.plan);
  const buildPath = () => {
    const pool = F.foods.filter(x => !avoided(x) && !dietOut(x));
    const main = pool.filter(x => !x.min12), q = {};
    for (const c of F.categories) q[c] = main.filter(x => x.cat === c);
    // Alimentos a puxar para o início da sua categoria (config.js > plan.early).
    for (const id of [...(PLAN.early || [])].reverse()) { const x = F.byId.get(id), l = x && q[x.cat], i = l ? l.indexOf(x) : -1; if (i > 1) { l.splice(i, 1); l.splice(1, 0, x); } }
    const pattern = ['veg', 'fruit', 'protein', 'grain', 'veg', 'fruit', 'dairy', 'herb', 'other'];
    const weeks = [], opened = new Set();
    let pi = 0, left = main.length;
    while (left) {
      const wk = [], allowAlg = weeks.length + 1 >= PLAN.allergensFromWeek;
      let newAlg = false, misses = 0;
      while (wk.length < PLAN.perWeek && left && misses < pattern.length) {
        const list = q[pattern[pi++ % pattern.length]];
        const i = list.findIndex(x => !x.allergen || (allowAlg && (opened.has(x.allergen) || !newAlg)));
        if (i < 0) { misses++; continue; }
        const x = list.splice(i, 1)[0];
        if (x.allergen && !opened.has(x.allergen)) { opened.add(x.allergen); newAlg = true; }
        wk.push(x); left--; misses = 0;
      }
      if (!wk.length) { for (const c of F.categories) wk.push(...q[c].splice(0)); left = 0; }
      weeks.push(wk);
    }
    const tried = new Set(state.log.map(e => e.food));
    const cur = weeks.findIndex(w => w.some(x => !tried.has(x.id)));
    return { weeks, late: pool.filter(x => x.min12), tried, cur, total: pool.length, done: pool.filter(x => tried.has(x.id)).length, excluded: F.foods.length - pool.length };
  };

  // ---------- tiny DOM helper (text is always set via textContent) ----------
  const el = (tag, props, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (k in n && k !== 'list') n[k] = v;
      else n.setAttribute(k, v);
    }
    for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) n.append(kid);
    return n;
  };
  // Ícones de traço (conteúdo estático, nunca texto do utilizador).
  const ICONS = {
    today: '<path d="M4 10l8-6 8 6v10H4z"/>',
    foods: '<path d="M5 12l4 4 10-10"/>',
    progress: '<path d="M5 20V11M12 20V4M19 20v-6"/>',
    settings: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    photo: '<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>',
    journal: '<path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2z"/><path d="M6 17a2 2 0 0 1 2-2h10M10 8h4"/>',
    note: '<path d="M6 4h9l3 3v13H6z"/><path d="M9 10h6M9 14h6"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    edit: '<path d="M4 20h4l11-11-4-4L4 16z"/><path d="M13 7l4 4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    recipes: '<path d="M4 13h16a8 8 0 0 1-16 0z"/><path d="M15 9l5-5"/>'
  };
  const icon = (name, size = 22) => {
    const n = el('span', { class: 'ico', 'aria-hidden': 'true' });
    n.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
    return n;
  };
  const toast = msg => { const b = $('toast'); b.textContent = msg; b.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => b.classList.remove('show'), 2200); };

  // ---------- sheet (dialog) ----------
  const sheet = $('sheet');
  const openSheet = (...kids) => { $('sheetBody').replaceChildren(...kids.flat(Infinity).filter(k => k != null && k !== false)); if (!sheet.open) sheet.showModal(); $('sheetBody').scrollTop = 0; };
  const closeSheet = () => sheet.open && sheet.close();
  sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
  // Fechar a folha arrastando para baixo: a partir da pega, ou de qualquer ponto quando o conteúdo está no topo.
  (() => {
    const body = $('sheetBody');
    let y0 = 0, x0 = 0, ok = false, drag = false, dy = 0;
    const reset = () => { sheet.style.transition = ''; sheet.style.transform = ''; };
    body.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) { ok = false; return; }
      const tch = e.touches[0];
      y0 = tch.clientY; x0 = tch.clientX; dy = 0; drag = false;
      ok = body.scrollTop <= 0 || tch.clientY - body.getBoundingClientRect().top < 36;
    }, { passive: true });
    body.addEventListener('touchmove', e => {
      if (!ok) return;
      const tch = e.touches[0], mx = tch.clientX - x0;
      dy = tch.clientY - y0;
      if (!drag) {
        if (dy < 0 || Math.abs(mx) > Math.abs(dy)) { ok = false; return; }
        if (dy < 10) return;
        drag = true; sheet.style.transition = 'none';
      }
      e.preventDefault();
      sheet.style.transform = `translateY(${Math.max(0, dy)}px)`;
    }, { passive: false });
    const end = () => {
      if (!drag) return;
      drag = false; ok = false;
      sheet.style.transition = 'transform .2s ease';
      if (dy > 110) { sheet.style.transform = 'translateY(100%)'; setTimeout(() => { closeSheet(); reset(); }, 180); }
      else { sheet.style.transform = ''; setTimeout(reset, 220); }
    };
    body.addEventListener('touchend', end);
    body.addEventListener('touchcancel', end);
    sheet.addEventListener('close', reset);
  })();
  const sheetHead = (emoji, title) => el('div', { class: 'sheethead' },
    el('h2', {}, title),
    el('button', { class: 'x', 'aria-label': t().close, onclick: closeSheet }, '✕'));

  const likeLabel = v => v === 1 ? t().liked : v === 0 ? t().neutral : v === -1 ? t().disliked : '';

  const foodInfo = food => [
    food.allergen && el('p', { class: 'info' }, t().infoAllergen(t().allergenName[food.allergen])),
    food.min12 && el('p', { class: 'info' }, t().infoMin12),
    food.choke && el('p', { class: 'info' }, t().infoChoke)
  ];

  // Favoritos: alimentos (por id) e receitas (por número).
  const favBtn = (key, id) => {
    const on = () => state[key].includes(id);
    const b = el('button', { class: 'ghost favbtn', 'aria-pressed': String(on()), onclick: () => {
      state[key] = on() ? state[key].filter(x => x !== id) : [...state[key], id];
      save(); b.setAttribute('aria-pressed', String(on())); label.textContent = on() ? t().favOn : t().favAdd; render();
    } }, icon('heart', 18));
    const label = el('span', {}, on() ? t().favOn : t().favAdd);
    b.append(label);
    return b;
  };
  // Refeição sugerida pela hora do dia (só para poupar um toque).
  const mealNow = () => { const h = new Date().getHours(); return h < 11 ? 'breakfast' : h < 15 ? 'lunch' : h < 18 ? 'snack' : 'dinner'; };
  // Registo de um alimento: novo, ou edição de um registo existente (entry).
  const openLogForm = (food, date, meal, entry) => {
    let like = entry ? entry.like : null, m = entry ? entry.meal : (meal || mealNow());
    const likes = el('div', { class: 'likes', role: 'group', 'aria-label': t().howWasIt }, [1, 0, -1].map(v =>
      el('button', { type: 'button', 'aria-pressed': String(like === v), onclick: e => {
        like = like === v ? null : v;
        [...likes.children].forEach(b => b.setAttribute('aria-pressed', 'false'));
        if (like !== null) e.currentTarget.setAttribute('aria-pressed', 'true');
      } }, likeLabel(v))));
    const meals = el('div', { class: 'chips', role: 'group', 'aria-label': t().mealLabel, style: 'margin-top:8px' }, MEALS.map(v =>
      el('button', { type: 'button', class: 'chip', 'aria-pressed': String(m === v), onclick: e => {
        m = m === v ? '' : v;
        [...meals.children].forEach(b => b.setAttribute('aria-pressed', 'false'));
        if (m) e.currentTarget.setAttribute('aria-pressed', 'true');
      } }, t().meals[v])));
    const reaction = el('input', { type: 'checkbox', checked: !!(entry && entry.reaction) });
    const note = el('textarea', { rows: 2, maxLength: 300, value: entry ? entry.note : '' });
    openSheet(
      sheetHead('', fname(food)),
      el('p', { class: 'muted' }, fmtDate(date, { weekday: 'long', day: 'numeric', month: 'long' })),
      !entry && foodInfo(food),
      el('h3', { class: 'sub' }, t().mealLabel), meals,
      el('h3', { class: 'sub' }, t().howWasIt), likes,
      el('label', { class: 'check' }, reaction, t().suspectReaction),
      el('label', { class: 'field' }, t().note, note),
      el('div', { class: 'btnrow' },
        el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
        el('button', { class: 'primary', onclick: () => {
          if (entry) Object.assign(entry, { like, meal: m, reaction: reaction.checked, checked: entry.checked || reaction.checked, note: note.value.trim() });
          else state.log.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), food: food.id, date, like, reaction: reaction.checked, checked: reaction.checked, note: note.value.trim(), meal: m });
          save(); closeSheet(); render();
        } }, t().save)));
  };

  // Como servir por idade: textos em serve.<idioma>.js.
  const SERVE = window.DiaryServe || {};
  const SERVE_STAGES = [6, 9, 12];
  const INFO = window.DiaryFoodInfo || {}, SERVE_PHOTOS = window.DiaryServePhotos || {};
  const foodFacts = food => {
    const info = (INFO[state.lang] || {})[food.id];
    return el('div', { class: 'facts' },
      el('span', { class: 'badge' }, t().fromAge(food.min12 ? 12 : 6)),
      food.allergen && el('span', { class: 'badge warn' }, t().badgeAllergen(t().allergenName[food.allergen])),
      info ? el('span', { class: 'badge choke-' + info.choke[0] }, t().chokeLevel[info.choke[0]]) : (food.choke && el('span', { class: 'badge warn' }, t().badgeChoke)),
      info && el('p', { class: 'chokeline' }, info.choke[1]));
  };
  const foodExtras = food => {
    const info = (INFO[state.lang] || {})[food.id];
    return info ? [
      el('h3', { class: 'sub' }, t().nutriTitle), el('div', { class: 'badges' }, info.nutri.map(x => el('span', { class: 'badge nutri' }, x))),
      el('h3', { class: 'sub' }, t().tipTitle), el('p', { class: 'tipline' }, info.tip)] : null;
  };
  // Sugestões da loja: só nos idiomas e nos sítios definidos em config.js > shop.
  const SHOP = CFG.shop || {};
  const shopOn = () => !!SHOP.enabled && (SHOP.languages || []).includes(state.lang);
  const shopLink = h => el('a', { class: 'shoplink', href: SHOP.base + h, target: '_blank', rel: 'noopener' }, el('span', {}, (SHOP.names || {})[h] || h), el('span', { 'aria-hidden': 'true' }, '›'));
  const shopBlock = handles => shopOn() && handles && handles.length ? el('div', { class: 'shopbox' },
    el('p', { class: 'eyebrow' }, t().shopTitle), handles.map(shopLink), el('p', { class: 'fine' }, t().shopNote)) : null;
  const serveSection = food => {
    const lines = (SERVE[state.lang] || {})[food.id];
    if (!lines) return null;
    const age = ageMonths(), now = age === null ? -1 : age >= 12 ? 2 : age >= 9 ? 1 : 0;
    return [el('h3', { class: 'sub' }, t().serveTitle),
      el('div', { class: 'serve' }, lines.map((txt, i) => el('div', { class: 'srow' + (i === now ? ' now' : '') },
        el('span', { class: 'sage' }, t().stage(SERVE_STAGES[i]), i === now && el('b', {}, t().serveNow)),
        SERVE_PHOTOS[`${food.id}-${SERVE_STAGES[i]}`] && el('img', { class: 'sphoto', src: SERVE_PHOTOS[`${food.id}-${SERVE_STAGES[i]}`], alt: '', loading: 'lazy', width: 640, height: 640 }),
        el('p', {}, txt)))),
      el('p', { class: 'fine', style: 'margin-top:8px' }, t().serveNote),
      shopOn() && SHOP.serve && SHOP.serve[SERVE_STAGES[Math.max(0, now)]] ? el('p', { class: 'shopline' }, t().shopServe + ' ', shopLink(SHOP.serve[SERVE_STAGES[Math.max(0, now)]])) : null];
  };
  const openFoodDetail = food => {
    const hist = state.log.filter(e => e.food === food.id).sort((a, b) => b.date.localeCompare(a.date));
    const withFood = hasRecipes() ? R.list.filter(r => r.foods.includes(food.id)) : [];
    openSheet(
      FOOD_PHOTOS[food.id] && foodArt(food, 'hero'),
      sheetHead('', fname(food)),
      el('p', { class: 'muted' }, `${t().cat[food.cat]} · ${hist.length ? t().triedTimes(hist.length) : t().notTried}`),
      avoided(food) && el('p', { class: 'info warnbox' }, t().avoidWarn(t().allergenName[food.allergen])),
      !avoided(food) && dietOut(food) && el('p', { class: 'info' }, t().dietNote),
      foodFacts(food),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openLogForm(food, todayIso()) }, t().logThis), favBtn('favFoods', food.id)),
      serveSection(food),
      food.allergen && [el('p', { class: 'info' }, t().infoAllergen(t().allergenName[food.allergen])), el('p', { class: 'fine', style: 'margin-top:6px' }, t().allergenKeep),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => { closeSheet(); tab = 'allergens'; render(); window.scrollTo(0, 0); } }, t().algTitle))],
      foodExtras(food),
      hist.length ? [el('h3', { class: 'sub' }, t().history), el('div', { class: 'card' }, hist.map(e => entryRow(e, true)))] : null,
      withFood.length ? [el('h3', { class: 'sub' }, t().recipesWith), el('div', { class: 'rlist' }, withFood.map(recipeRow))] : null);
  };

  // Escolher a refeição e, depois, os alimentos (vários de uma vez).
  const openMealPick = date => openSheet(sheetHead('', t().mealPick), el('p', { class: 'muted' }, fmtDate(date, { weekday: 'long', day: 'numeric', month: 'long' })),
    el('div', { class: 'addopts' }, MEALS.map(m => el('button', { class: 'addopt', onclick: () => openPicker(date, m) }, icon('recipes', 22),
      el('span', {}, el('b', {}, t().meals[m]), el('span', { class: 'muted' }, mealLine(date, m) || t().mealEmpty))))));
  const mealLine = (date, m) => state.log.filter(e => e.date === date && e.meal === m).map(e => fname(F.byId.get(e.food))).join(', ');
  // Junta alimentos a uma refeição, sem repetir os que já lá estão. Devolve quantos entraram.
  const addFoods = (date, meal, ids, recipe) => {
    const have = new Set(state.log.filter(e => e.date === date && e.meal === meal).map(e => e.food)), stamp = Date.now().toString(36);
    const fresh = [...new Set(ids)].filter(id => !have.has(id));
    fresh.forEach((id, i) => state.log.push({ id: stamp + i + Math.random().toString(36).slice(2, 6), food: id, date, like: null, reaction: false, checked: false, note: '', meal, recipe: recipe ?? null }));
    save(); return fresh.length;
  };
  let pickMode = 'foods', pickCat = '';
  const openPicker = (date, meal) => {
    if (!meal) return openMealPick(date);
    if (!hasRecipes()) pickMode = 'foods';
    const picked = new Set(), rpicked = new Set(), list = el('div', {});
    let q = '', allRecipes = false;
    const total = () => new Set([...picked, ...[...rpicked].flatMap(n => R.list[n].foods)]).size;
    const addBtn = el('button', { class: 'primary', disabled: true, onclick: () => {
      let n = 0;
      for (const r of rpicked) n += addFoods(date, meal, R.list[r].foods, r);
      n += addFoods(date, meal, [...picked]);
      closeSheet(); render(); toast(t().mealAdded(n, t().meals[meal]));
    } }, t().addN(0));
    const sync = () => { addBtn.disabled = !total(); addBtn.textContent = t().addN(total()); };
    const fill = () => {
      const ql = q.toLowerCase();
      if (pickMode === 'recipes') {
        // Sem pesquisa, só as receitas próprias desta refeição; a pesquisa e "ver todas" mostram as restantes.
        const all = eligible().filter(r => r.foods.length), fit = all.filter(r => r.meals.includes(meal));
        const narrowed = !ql && !allRecipes && fit.length > 0 && fit.length < all.length;
        const items = ql ? all.filter(r => rx(r).t.toLowerCase().includes(ql)) : narrowed ? fit : all;
        list.className = 'rlist'; cats.hidden = true;
        list.replaceChildren(...(items.length ? items.map(r => el('button', { class: 'recipe rpick', 'aria-pressed': String(rpicked.has(r.id)),
          onclick: e => { rpicked.has(r.id) ? rpicked.delete(r.id) : rpicked.add(r.id); e.currentTarget.setAttribute('aria-pressed', String(rpicked.has(r.id))); sync(); } },
          recipeArt(r, 'thumb'), el('span', { class: 'rtxt' }, el('span', { class: 'rname' }, rx(r).t), el('span', { class: 'muted' }, r.foods.map(id => fname(F.byId.get(id))).join(', '))),
          el('span', { class: 'obtick', 'aria-hidden': 'true' }, icon('check', 16)))) : [el('p', { class: 'muted' }, t().recipesEmpty)]),
          ...(narrowed ? [el('button', { class: 'linkish', style: 'align-self:center', onclick: () => { allRecipes = true; fill(); } }, t().recipesShowAll)] : []));
        return;
      }
      const fav = x => state.favFoods.includes(x.id) ? 0 : 1;
      // Sem pesquisa, mostra só a categoria escolhida; a pesquisa procura em todas.
      const items = ql ? F.foods.filter(x => fname(x).toLowerCase().includes(ql)).sort((x, y) => fav(x) - fav(y))
        : pickCat === 'fav' ? F.foods.filter(x => !fav(x)) : F.foods.filter(x => x.cat === pickCat);
      cats.hidden = !!ql;
      list.className = 'picklist';
      list.replaceChildren(...(items.length ? items.map(x => el('button', { class: 'pickrow', role: 'checkbox', 'aria-checked': String(picked.has(x.id)),
        'aria-label': `${fname(x)}${x.allergen ? ', ' + t().allergenBadge : ''}${avoided(x) ? ', ' + t().avoidMark : ''}`,
        onclick: e => { picked.has(x.id) ? picked.delete(x.id) : picked.add(x.id); e.currentTarget.setAttribute('aria-checked', String(picked.has(x.id))); sync(); } },
        foodArt(x, 'pthumb'),
        el('span', { class: 'pname' }, fname(x), !fav(x) && el('span', { class: 'pfav', 'aria-hidden': 'true' }, icon('heart', 14)), countFor(x.id) ? null : el('span', { class: 'newtag' }, t().newTag)),
        x.allergen && el('span', { class: 'palg' }, el('i', {}), t().allergenShort),
        el('span', { class: 'pbox', 'aria-hidden': 'true' }, icon('check', 16)))) : [el('p', { class: 'muted' }, t().noResults)]));
    };
    const input = el('input', { class: 'search', type: 'search', 'aria-label': t().search, oninput: e => { q = e.target.value; fill(); } });
    const catIds = [...(state.favFoods.length ? ['fav'] : []), ...F.categories];
    if (!catIds.includes(pickCat)) pickCat = catIds[0];
    const cats = el('div', { class: 'chips catstrip', role: 'group', 'aria-label': t().byCategory }, catIds.map(c => el('button', { class: 'chip', 'aria-pressed': String(pickCat === c), onclick: () => {
      pickCat = c; [...cats.children].forEach((b, i) => b.setAttribute('aria-pressed', String(catIds[i] === c))); fill();
      // Se a lista já estava deslocada, volta ao início da nova categoria.
      const gap = list.getBoundingClientRect().top - cats.getBoundingClientRect().bottom; if (gap < 0) document.getElementById('sheetBody').scrollTop += gap;
    } }, c === 'fav' ? t().favs : t().cat[c])));
    const hint = el('p', { class: 'muted' });
    const modes = hasRecipes() ? el('div', { class: 'chips seg two', role: 'group', style: 'margin-top:12px' }, [['foods', t().tabFoods], ['recipes', t().tabRecipes]].map(([id, label]) =>
      el('button', { class: 'chip', 'aria-pressed': String(pickMode === id), onclick: () => { pickMode = id; setMode(); } }, label))) : null;
    const setMode = () => {
      if (modes) [...modes.children].forEach((b, i) => b.setAttribute('aria-pressed', String((i ? 'recipes' : 'foods') === pickMode)));
      hint.textContent = pickMode === 'recipes' ? t().pickRecipesHint : t().pickFoodsHint;
      input.placeholder = pickMode === 'recipes' ? t().searchRecipes : t().search;
      input.value = q = ''; fill(); cats.hidden = pickMode === 'recipes';
    };
    setMode();
    openSheet(sheetHead('', t().meals[meal]), modes, hint, input, cats, list, el('div', { class: 'pickbar' }, addBtn));
  };
  // Registar uma receita inteira numa refeição de hoje.
  const openRecipeLog = r => openSheet(sheetHead('', t().mealPick), el('p', { class: 'muted' }, rx(r).t),
    el('div', { class: 'addopts' }, MEALS.map(m => el('button', { class: 'addopt', onclick: () => { const n = addFoods(todayIso(), m, r.foods, r.id); closeSheet(); render(); toast(t().mealAdded(n, t().meals[m])); } },
      icon('recipes', 22), el('span', {}, el('b', {}, t().meals[m]), el('span', { class: 'muted' }, mealLine(todayIso(), m) || t().mealEmpty))))));

  // ---------- pieces ----------
  // Imagem do alimento: a foto, se existir; senão um quadrado com a inicial.
  const FOOD_PHOTOS = window.DiaryFoodPhotos || {};
  const foodArt = (food, cls) => {
    const box = el('span', { class: 'art ' + cls, 'aria-hidden': 'true' });
    if (FOOD_PHOTOS[food.id]) box.append(el('img', { src: FOOD_PHOTOS[food.id], alt: '', loading: 'lazy', width: 640, height: 640 }));
    else box.append(el('span', { class: 'initial' }, fname(food).charAt(0)));
    return box;
  };
  // Cartão com foto, para o ecrã Alimentos.
  const foodTile = food => {
    const n = countFor(food.id);
    return el('button', { class: 'tile' + (n ? ' tried' : ''), onclick: () => openFoodDetail(food),
      'aria-label': `${fname(food)}${food.allergen ? ', ' + t().allergenBadge : ''}${avoided(food) ? ', ' + t().avoidMark : ''}, ${n ? t().triedTimes(n) : t().notTried}` },
      foodArt(food, 'tileart'),
      avoided(food) && el('span', { class: 'avoidmark', 'aria-hidden': 'true' }, '!'),
      n ? el('span', { class: 'tick', 'aria-hidden': 'true' }, icon('check', 14), n > 1 ? String(n) : null) : null,
      el('span', { class: 'tname' }, food.allergen && el('span', { class: 'dot', title: t().allergenBadge }), fname(food)));
  };
  const foodCard = (food, onclick) => {
    const n = countFor(food.id);
    return el('button', { class: 'food' + (n ? ' tried' : ''), onclick,
      'aria-label': `${fname(food)}${food.allergen ? ', ' + t().allergenBadge : ''}, ${n ? t().triedTimes(n) : t().notTried}` },
      food.allergen && el('span', { class: 'dot', title: t().allergenBadge }),
      fname(food),
      n > 1 ? el('span', { class: 'count' }, String(n)) : null);
  };

  const entryRow = (e, showDate) => {
    const food = F.byId.get(e.food);
    return el('div', { class: 'entry' },
      !showDate && foodArt(food, 'ethumb'),
      el('div', { class: 'body' },
        el('div', { class: 'name' }, showDate ? fmtDate(e.date, { day: 'numeric', month: 'short', year: 'numeric' }) : fname(food)),
        e.like !== null && el('div', { class: 'muted' }, likeLabel(e.like)),
        !showDate && e.recipe != null && hasRecipes() && el('div', { class: 'fromrecipe' }, t().fromRecipe(rx(R.list[e.recipe]).t)),
        e.note && el('div', { class: 'note' }, e.note),
        e.reaction && el('span', { class: 'flag' }, t().reactionFlag)),
      !showDate && el('button', { class: 'del', 'aria-label': `${t().edit}: ${fname(food)}`, onclick: () => openLogForm(food, e.date, e.meal, e) }, icon('edit', 20)),
      el('button', { class: 'del', 'aria-label': `${t().remove}: ${fname(food)}`, onclick: () => {
        state.log = state.log.filter(x => x.id !== e.id); save();
        if (sheet.open) openFoodDetail(food);
        render();
      } }, icon('trash', 20)));
  };

  // ---------- subscrição ----------
  // Quem pagou só pode ser confirmado por um servidor. Até existir, entitled fica a false e,
  // com enforce desligado em config.js, tudo está desbloqueado (modo de teste).
  const SUB = Object.assign({ enabled: false, enforce: false }, CFG.subscription);
  let entitled = false;

  // ---------- conta (conta de cliente da loja Shopify) ----------
  // Início de sessão OAuth com PKCE, sem segredo. A app guarda os tokens neste dispositivo e lê as encomendas
  // da própria pessoa para saber se comprou o Premium. A verificação é feita no dispositivo: serve para
  // reconhecer quem comprou, não é uma barreira contra quem altere os dados do browser.
  const ACC = Object.assign({ enabled: false }, CFG.account);
  const ACC_KEY = 'pn-account', OAUTH_KEY = 'pn-oauth';
  let acc = (() => { try { return JSON.parse(localStorage.getItem(ACC_KEY)) || {}; } catch { return {}; } })();
  const accSave = () => { try { localStorage.setItem(ACC_KEY, JSON.stringify(acc)); } catch { /* sem armazenamento */ } };
  const accOn = () => !!ACC.enabled && !!ACC.clientId && !!window.crypto && !!crypto.subtle;
  const signedIn = () => !!acc.refresh || (!!acc.access && acc.expires > Date.now());
  const syncEntitled = () => { entitled = !!acc.until && acc.until > Date.now(); };
  syncEntitled();
  const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const rand = n => b64url(crypto.getRandomValues(new Uint8Array(n)));
  const accSignIn = async () => {
    const verifier = rand(32), state = rand(16), nonce = rand(16);
    const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    // localStorage e não sessionStorage: no iPhone, a app instalada pode voltar do início de sessão noutro contexto.
    localStorage.setItem(OAUTH_KEY, JSON.stringify({ verifier, state, nonce, at: Date.now() }));
    const u = new URL(ACC.authorize);
    for (const [k, v] of Object.entries({ client_id: ACC.clientId, response_type: 'code', redirect_uri: ACC.redirect, scope: ACC.scope, state, nonce, code_challenge: challenge, code_challenge_method: 'S256' })) u.searchParams.set(k, v);
    location.href = u.toString();
  };
  const accToken = async params => {
    const res = await fetch(ACC.token, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(Object.assign({ client_id: ACC.clientId }, params)) });
    if (!res.ok) { const e = new Error('token'); e.status = res.status; throw e; }
    const j = await res.json();
    acc.access = j.access_token; acc.expires = Date.now() + (j.expires_in || 3600) * 1000 - 60000;
    if (j.refresh_token) acc.refresh = j.refresh_token;
    if (j.id_token) acc.idToken = j.id_token;
    accSave();
  };
  const accForget = () => { acc = {}; accSave(); syncEntitled(); };
  const accAccess = async () => {
    if (acc.access && acc.expires > Date.now()) return acc.access;
    if (!acc.refresh) throw new Error('signed-out');
    try { await accToken({ grant_type: 'refresh_token', refresh_token: acc.refresh }); }
    catch (e) { if (e.status === 400 || e.status === 401) accForget(); throw e; } // sessão revogada ou expirada
    return acc.access;
  };
  const accGraphql = async query => {
    if (!acc.api) { acc.api = ACC.graphql || (await (await fetch(ACC.shop + '/.well-known/customer-account-api')).json()).graphql_api; accSave(); }
    const res = await fetch(acc.api, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: await accAccess() }, body: JSON.stringify({ query }) });
    if (!res.ok) { const e = new Error('api'); e.status = res.status; throw e; }
    const j = await res.json();
    if (j.errors || !j.data) throw new Error('graphql');
    return j.data;
  };
  // Lê as encomendas e calcula até quando o Premium está ativo: a compra mais recente do artigo, mais os dias de config.
  const accRefresh = async () => {
    const P = ACC.premium || {}, q = fields => `query { customer { emailAddress { emailAddress } orders(first: 50, reverse: true) { nodes { processedAt ${fields} lineItems(first: 50) { nodes { title ${fields ? 'productId' : ''} } } } } } }`;
    let data;
    try { data = await accGraphql(q('financialStatus cancelledAt')); }
    catch (e) { if (e.message !== 'graphql') throw e; data = await accGraphql(q('')); } // campos que a versão da API não conheça
    const c = data.customer || {};
    let until = 0;
    for (const o of (c.orders && c.orders.nodes) || []) {
      if (o.cancelledAt || ['REFUNDED', 'VOIDED'].includes(o.financialStatus)) continue;
      const has = ((o.lineItems && o.lineItems.nodes) || []).some(l => l.productId ? l.productId === P.productId : !!P.title && l.title === P.title);
      if (has) until = Math.max(until, new Date(o.processedAt).getTime() + (P.days || 365) * 864e5);
    }
    acc.email = (c.emailAddress && c.emailAddress.emailAddress) || acc.email || '';
    acc.until = until; acc.checked = Date.now();
    accSave(); syncEntitled();
  };
  const accSignOut = () => {
    const hint = acc.idToken;
    accForget();
    if (ACC.logout && hint) { const u = new URL(ACC.logout); u.searchParams.set('id_token_hint', hint); u.searchParams.set('post_logout_redirect_uri', ACC.redirect); location.href = u.toString(); }
    else render();
  };
  // Ao abrir: termina um início de sessão que venha no endereço, ou volta a confirmar a conta de vez em quando.
  const accInit = async () => {
    if (!accOn()) return;
    const q = new URLSearchParams(location.search), code = q.get('code'), state = q.get('state');
    if (code || q.get('error')) {
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(OAUTH_KEY)); } catch { /* ignorar */ }
      localStorage.removeItem(OAUTH_KEY);
      history.replaceState(null, '', location.pathname);
      if (!code || !saved || saved.state !== state) return toast(t().accFail);
      try {
        await accToken({ grant_type: 'authorization_code', redirect_uri: ACC.redirect, code, code_verifier: saved.verifier });
        await accRefresh();
        tab = 'settings'; render(); toast(entitled ? t().accPremiumOn : t().accSignedIn);
      } catch { render(); toast(t().accFail); }
      return;
    }
    if (signedIn() && navigator.onLine !== false && (!acc.checked || Date.now() - acc.checked > 12 * 36e5)) {
      try { await accRefresh(); render(); } catch { /* fica com o que estava guardado */ }
    }
  };
  const accountCard = () => {
    if (!accOn()) return null;
    const longDate = ms => new Intl.DateTimeFormat(state.lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(ms));
    if (!signedIn()) return el('div', { class: 'card' }, el('h2', {}, t().accTitle), el('p', { class: 'muted' }, t().accLead),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => accSignIn().catch(() => toast(t().accFail)) }, t().accSignIn)));
    return el('div', { class: 'card' }, el('h2', {}, t().accTitle),
      acc.email && el('p', { class: 'muted' }, t().accAs(acc.email)),
      el('p', { style: 'margin-top:6px;font-weight:600' }, entitled ? t().accPremiumUntil(longDate(acc.until)) : t().accNoPremium),
      el('div', { class: 'btnrow' },
        el('button', { class: 'ghost', onclick: () => accRefresh().then(() => { render(); toast(t().accChecked); }).catch(() => { render(); toast(t().accOffline); }) }, t().accRefresh),
        el('button', { class: 'ghost', onclick: accSignOut }, t().accSignOut)));
  };
  const isPremium = () => !SUB.enabled || !SUB.enforce || entitled;
  const locked = r => SUB.enabled && r.min > SUB.freeStage;
  const PREM = Object.assign({ parentsJournal: true, journalBook: true, report: true, extraBabies: true, weekPlan: true }, SUB.premium);
  const guideLocked = g => SUB.enabled && Array.isArray(SUB.freeGuides) && !SUB.freeGuides.includes(g.id);
  // Só pede subscrição se a funcionalidade estiver marcada como premium em config.js.
  const gate = (key, fn) => (...a) => !PREM[key] || isPremium() ? fn(...a) : openPaywall();
  const gtag = key => PREM[key] ? ptag() : null;
  const ptag = () => SUB.enabled ? el('span', { class: 'ptag' }, t().premium) : null;
  const money = n => new Intl.NumberFormat(state.lang === 'pt' ? 'pt-PT' : state.lang, { style: 'currency', currency: SUB.currency }).format(n);
  // Preço do plano anual: o de lançamento, enquanto estiver ativo (config.js > subscription.launch), ou o normal.
  const launchOn = () => { const L = SUB.launch || {}; return L.yearly > 0 && L.yearly < SUB.yearly && (!DATE.test(L.until) || todayIso() <= L.until); };
  const yearPrice = () => launchOn() ? SUB.launch.yearly : SUB.yearly;
  const openPaywall = () => {
    const hasMonthly = SUB.monthly > 0, launch = launchOn(), year = yearPrice(), trial = SUB.trialDays > 0;
    let pick = 'yearly';
    const saving = hasMonthly ? Math.round((1 - year / (SUB.monthly * 12)) * 100) : 0;
    const opt = (id, name, price, badge) => el('button', { class: 'planopt', 'aria-pressed': String(pick === id), onclick: e => {
      pick = id; [...plans.children].forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
    } }, el('span', {}, el('b', {}, name), el('span', { class: 'muted' }, price)), badge && el('span', { class: 'ptag' }, badge));
    const yearLine = [launch ? t().perYearFirst(money(year)) : t().perYear(money(year)), launch && el('s', { class: 'was' }, money(SUB.yearly))];
    const plans = el('div', { class: 'plans', role: 'group', 'aria-label': t().subscription },
      opt('yearly', t().planYearly, yearLine, saving > 0 && t().subSave(saving)),
      hasMonthly && opt('monthly', t().planMonthly, t().perMonth(money(SUB.monthly))));
    const list = items => el('ul', { class: 'points' }, items.map(x => el('li', {}, icon('check', 16), el('span', {}, x))));
    openSheet(sheetHead('', t().subTitle),
      el('div', { class: 'trialhead' },
        launch && el('span', { class: 'ptag' }, t().launchBadge),
        // O valor cobrado de uma vez é o que aparece em grande; o valor por mês é só uma conta de apoio.
        el('p', { class: 'trialbig' }, launch ? t().perYearFirst(money(year)) : t().perYear(money(year)), launch && el('s', { class: 'was' }, money(SUB.yearly))),
        el('p', { class: 'trialsub' }, t().equalsPerMonth(money(year / 12))),
        launch && el('p', { class: 'trialsub' }, DATE.test(SUB.launch.until) ? t().launchUntil(fmtDate(SUB.launch.until, { day: 'numeric', month: 'long', year: 'numeric' }), money(SUB.yearly)) : t().launchNote(money(SUB.yearly))),
        trial && el('p', { class: 'trialsub strong' }, t().trialHead(SUB.trialDays))),
      el('h3', { class: 'sub' }, t().premiumTitle), list(t().subPoints),
      plans,
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => {
        const url = SUB.checkout && SUB.checkout[pick];
        if (url) location.href = url; else toast(t().subSoon);
      } }, trial ? t().subStart : t().subBuy)),
      el('p', { class: 'renew' }, SUB.autoRenew ? t().renewAuto : t().renewNone),
      accOn() && el('p', { class: 'renew' }, t().accBuyHint),
      accOn() && !signedIn() && el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => accSignIn().catch(() => toast(t().accFail)) }, t().accHave)),
      trial && el('p', { class: 'fine', style: 'margin-top:6px;text-align:center' }, t().trialNote(SUB.trialDays)),
      el('h3', { class: 'sub' }, t().freeTitle), list(t().freePoints),
      !SUB.enforce && el('p', { class: 'info' }, t().subTest),
      legalLinks());
  };
  const premium = fn => (...a) => isPremium() ? fn(...a) : openPaywall();

  // ---------- receitas ----------
  const recipeMeta = r => [t().stage(r.min), rx(r).tempo, rx(r).por].join(' · ');
  const kcalLine = r => r.kcal ? t().kcal[r.per](r.kcal) : '';
  // Imagem da receita: a foto, se existir; senão uma taça com a cor do ingrediente principal.
  const PHOTOS = window.DiaryRecipePhotos || {};
  const TINT = { carrot: '#f2a65a', pumpkin: '#f0a04b', sweetpotato: '#e8935a', potato: '#e6cf9a', courgette: '#a9c98a', broccoli: '#8fbf7a', cauliflower: '#eee6cf',
    spinach: '#7fb37a', peas: '#9ccc7c', greenbeans: '#93c47d', leek: '#bcd69a', beetroot: '#c4577a', tomato: '#e5695a', mushroom: '#c9b199', cabbage: '#b5d39a',
    banana: '#f3d86b', apple: '#e98b7a', pear: '#cfd87a', avocado: '#a9c77a', mango: '#f5b647', peach: '#f6b08a', plum: '#a977b0', blueberry: '#7f8fd0', strawberry: '#e86a7a',
    rice: '#f1e9d6', oats: '#e3cfa6', pasta: '#f0d79a', bread: '#dfbf8f', chicken: '#edc9a0', turkey: '#e8c4a3', beef: '#b9775f', whitefish: '#cfdde6', salmon: '#f29b82',
    egg: '#f6d977', lentils: '#d98a5a', chickpeas: '#e3c184', beans: '#b98a6a', yogurt: '#f3efe6', cheese: '#f3d88a', freshcheese: '#f5f0e2', coconut: '#efe9df' };
  const recipeArt = (r, cls) => {
    const box = el('span', { class: 'art ' + cls, 'aria-hidden': 'true' });
    if (PHOTOS[r.id]) { box.append(el('img', { src: PHOTOS[r.id], alt: '', loading: 'lazy', width: 800, height: 800 })); return box; }
    const main = r.foods.find(id => TINT[id] && id !== 'oliveoil'), c = TINT[main] || '#e6d9cc';
    box.style.background = `color-mix(in srgb, ${c} 28%, var(--card))`;
    box.innerHTML = `<svg viewBox="0 0 64 64" width="100%" height="100%"><ellipse cx="32" cy="30" rx="20" ry="7" fill="${c}"/><path d="M10 30h44a22 22 0 0 1-44 0z" fill="var(--card)" stroke="var(--edge)" stroke-width="1.5"/><ellipse cx="32" cy="30" rx="19" ry="6" fill="${c}"/><path d="M40 27l12-13" stroke="var(--brand)" stroke-width="3" stroke-linecap="round"/></svg>`;
    return box;
  };
  const openRecipe = r => openSheet(
    recipeArt(r, 'hero'),
    sheetHead('', rx(r).t),
    el('p', { class: 'muted' }, recipeMeta(r)),
    r.kcal && el('p', { class: 'kcal' }, kcalLine(r)),
    r.foods.some(id => avoided(F.byId.get(id))) && el('p', { class: 'info warnbox' }, t().recipeAvoid([...new Set(r.foods.map(id => F.byId.get(id)).filter(avoided).map(x => t().allergenName[x.allergen]))].join(', '))),
    el('div', { class: 'btnrow' }, r.foods.length ? el('button', { class: 'primary', onclick: () => openRecipeLog(r) }, t().logRecipe) : null, el('button', { class: 'ghost', onclick: () => openDayPicker(r) }, t().addToPlan)),
    el('div', { class: 'btnrow' }, favBtn('favRecipes', r.id)),
    el('h3', { class: 'sub' }, t().ingredients), el('ul', { class: 'ing' }, rx(r).ing.map(x => el('li', {}, x))),
    el('h3', { class: 'sub' }, t().howTo), el('ol', { class: 'steps' }, rx(r).passos.map(x => el('li', {}, x))),
    r.foods.length ? [el('h3', { class: 'sub' }, t().recipeFoods), el('p', { class: 'fine' }, t().recipeFoodsHint),
      el('div', { class: 'pills' }, r.foods.map(id => F.byId.get(id)).map(x => foodCard(x, () => openLogForm(x, todayIso()))))] : null,
    el('p', { class: 'fine', style: 'margin-top:16px' }, t().recipeNote),
    r.kcal && el('p', { class: 'fine', style: 'margin-top:8px' }, t().kcalNote));
  const recipeRow = r => el('button', { class: 'recipe', onclick: () => locked(r) && !isPremium() ? openPaywall() : openRecipe(r) },
    recipeArt(r, 'thumb'),
    el('span', { class: 'rtxt' }, locked(r) && ptag(), el('span', { class: 'rname' }, rx(r).t), el('span', { class: 'muted' }, recipeMeta(r)),
      r.kcal && el('span', { class: 'kcal' }, kcalLine(r))));
  // Fase do bebé: a maior fase que já atingiu (6+ por omissão).
  const babyStage = () => { const a = ageMonths(); return a === null ? null : ([...R.stages].reverse().find(m => a >= m) || R.stages[0]); };

  // ---------- vários bebés ----------
  const babyLabel = (b, i) => b.name || `${t().babyDefault} ${i + 1}`;
  const switchBaby = id => { state.current = id; rstage = null; save(); render(); };
  const babySwitch = () => state.babies.length > 1 ? el('div', { class: 'chips', role: 'group', 'aria-label': t().babies }, state.babies.map((b, i) =>
    el('button', { class: 'chip', 'aria-pressed': String(b.id === state.current), onclick: () => switchBaby(b.id) }, babyLabel(b, i)))) : null;
  const openAddBaby = () => {
    const name = el('input', { type: 'text', maxLength: 40, autocomplete: 'off' }), birth = el('input', { type: 'date', max: todayIso() });
    openSheet(sheetHead('', t().addBaby.replace(/^\+\s*/, '')),
      el('label', { class: 'field', style: 'margin-top:14px' }, t().babyName, name), el('label', { class: 'field' }, t().birthDate, birth),
      el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
        el('button', { class: 'primary', onclick: () => {
          const b = cleanBaby({ id: 'b' + Date.now().toString(36), name: name.value.trim(), birth: birth.value });
          state.babies.push(b); closeSheet(); switchBaby(b.id);
        } }, t().save)));
  };
  const openRemoveBaby = () => {
    const i = state.babies.indexOf(state.baby);
    openSheet(sheetHead('', t().removeBaby), el('p', { style: 'margin-top:10px' }, t().confirmRemoveBaby(babyLabel(state.baby, i))),
      el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
        el('button', { class: 'danger', onclick: () => { state.baby.journal.forEach(dropMedia); state.babies.splice(i, 1); closeSheet(); switchBaby(state.babies[0].id); } }, t().removeBaby)));
  };

  // ---------- plano da semana e lista de compras ----------
  const weekOf = off => {
    const m = parse(todayIso()); m.setDate(m.getDate() - ((m.getDay() + 6) % 7) + off * 7);
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(m); d.setDate(m.getDate() + i); return iso(d); });
  };
  const dayLong = d => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' });
  const eligible = () => { const a = ageMonths(), max = Math.max(a === null ? 6 : a, 6); return R.list.filter(r => r.min <= max && (isPremium() || !locked(r))); };
  const planFor = d => (state.baby.plan[d] || []).map(id => R.list[id]).filter(Boolean);
  const addToPlan = (d, id) => { const p = state.baby.plan; p[d] = p[d] || []; if (!p[d].includes(id) && p[d].length < 8) p[d].push(id); save(); };
  const removeFromPlan = (d, id) => { const p = state.baby.plan; p[d] = (p[d] || []).filter(x => x !== id); if (!p[d].length) delete p[d]; save(); };
  const openDayPicker = r => {
    const start = parse(todayIso()), days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return iso(d); });
    openSheet(sheetHead('', t().chooseDay), el('p', { class: 'muted' }, rx(r).t),
      el('div', { class: 'daylist' }, days.map(d => el('button', { class: 'ghost', onclick: () => { addToPlan(d, r.id); closeSheet(); render(); toast(t().planAdded); } }, dayLong(d)))));
  };
  const openRecipePicker = d => {
    const box = el('div', { class: 'rlist' });
    const fill = q => {
      const items = eligible().filter(r => rx(r).t.toLowerCase().includes(q.toLowerCase()));
      box.replaceChildren(...(items.length ? items.map(r => el('button', { class: 'recipe', onclick: () => { addToPlan(d, r.id); closeSheet(); render(); } },
        recipeArt(r, 'thumb'), el('span', { class: 'rtxt' }, el('span', { class: 'rname' }, rx(r).t), el('span', { class: 'muted' }, recipeMeta(r))))) : [el('p', { class: 'muted' }, t().recipesEmpty)]));
    };
    fill('');
    openSheet(sheetHead('', dayLong(d)), el('input', { class: 'search', type: 'search', placeholder: t().searchRecipes, 'aria-label': t().searchRecipes, oninput: e => fill(e.target.value) }), box);
  };
  const plannedRow = (d, r) => el('div', { class: 'prow' }, recipeRow(r),
    el('button', { class: 'del', 'aria-label': `${t().removeFromPlan}: ${rx(r).t}`, onclick: () => { removeFromPlan(d, r.id); render(); } }, icon('trash', 20)));
  const weekNav = week => el('div', { class: 'week' },
    el('button', { class: 'wnav', 'aria-label': t().prevWeek, disabled: planOffset <= -4, onclick: () => { planOffset--; render(); } }, '‹'),
    el('strong', { class: 'wlabel' }, `${fmtDate(week[0], { day: 'numeric', month: 'short' })} – ${fmtDate(week[6], { day: 'numeric', month: 'short' })}`),
    el('button', { class: 'wnav', 'aria-label': t().nextWeek, disabled: planOffset >= 8, onclick: () => { planOffset++; render(); } }, '›'));

  const viewPlan = () => {
    const week = weekOf(planOffset);
    const suggest = () => {
      const pool = eligible(), used = new Set(week.flatMap(d => state.baby.plan[d] || []));
      let k = Math.floor(parse(week[0]).getTime() / 864e5);
      for (const d of week) {
        if ((state.baby.plan[d] || []).length) continue;
        for (let tries = 0; tries < pool.length; tries++) { const r = pool[k++ % pool.length]; if (!used.has(r.id)) { used.add(r.id); addToPlan(d, r.id); break; } }
      }
      render();
    };
    const clear = () => { for (const d of week) delete state.baby.plan[d]; save(); render(); };
    return [
      weekNav(week),
      el('div', { class: 'btnrow', style: 'margin-top:0' }, el('button', { class: 'primary', onclick: suggest }, t().planSuggest),
        el('button', { class: 'ghost', disabled: !week.some(d => state.baby.plan[d]), onclick: clear }, t().planClear)),
      week.map(d => el('div', { class: 'card pday' + (d === todayIso() ? ' now' : '') },
        el('h2', {}, dayLong(d)),
        planFor(d).length ? planFor(d).map(r => plannedRow(d, r)) : el('p', { class: 'muted' }, t().planEmpty),
        el('button', { class: 'ghost small', onclick: () => openRecipePicker(d) }, t().planAdd)))
    ];
  };

  const viewShop = () => {
    const week = weekOf(planOffset), counts = new Map();
    for (const d of week) for (const r of planFor(d)) for (const line of rx(r).ing) counts.set(line, (counts.get(line) || 0) + 1);
    const b = state.baby.bought, done = new Set(b.week === week[0] ? b.lines : []);
    const toggle = (line, on) => { on ? done.add(line) : done.delete(line); state.baby.bought = { week: week[0], lines: [...done] }; save(); };
    const lines = [...counts].sort((x, y) => x[0].localeCompare(y[0], state.lang));
    return [
      weekNav(week),
      lines.length ? el('div', { class: 'card' }, el('p', { class: 'muted', style: 'margin-bottom:6px' }, t().shopNote),
        lines.map(([line, n]) => el('label', { class: 'shopline' },
          el('input', { type: 'checkbox', checked: done.has(line), onchange: e => toggle(line, e.target.checked) }),
          el('span', {}, line), n > 1 ? el('b', {}, `×${n}`) : null)))
        : el('div', { class: 'card' }, el('p', { class: 'muted' }, t().shopEmpty))
    ];
  };

  const viewRecipes = () => {
    if (rstage === null) rstage = babyStage() || 0;
    const segs = [['list', t().tabRecipes], ['plan', t().segPlan], ['shop', t().segShop]];
    const head = [
      el('div', { class: 'hello' }, el('h1', {}, t().tabRecipes)),
      el('div', { class: 'chips seg', role: 'group' }, segs.map(([id, label]) =>
        el('button', { class: 'chip', 'aria-pressed': String(rseg === id), onclick: () => { if (id !== 'list' && !isPremium()) return openPaywall(); rseg = id; render(); } }, label)))
    ];
    if (rseg === 'plan') return [...head, viewPlan()];
    if (rseg === 'shop') return [...head, viewShop()];
    const box = el('div', { class: 'rlist' });
    const fill = () => {
      if (rstage === 'fav' && !state.favRecipes.length) rstage = 0;
      const items = R.list.filter(r => (rstage === 'fav' ? state.favRecipes.includes(r.id) : (!rstage || r.min === rstage)) && rx(r).t.toLowerCase().includes(rquery.toLowerCase()));
      box.replaceChildren(...(items.length ? items.map(recipeRow) : [el('p', { class: 'muted' }, t().recipesEmpty)]));
    };
    const opts = [0, ...R.stages, ...(state.favRecipes.length ? ['fav'] : [])];
    const chips = el('div', { class: 'chips' }, opts.map(m => el('button', { class: 'chip', 'aria-pressed': String(rstage === m), onclick: () => {
      rstage = m; [...chips.children].forEach((b, i) => b.setAttribute('aria-pressed', String(opts[i] === m))); fill();
    } }, m === 'fav' ? t().favs : m ? t().stage(m) : t().recipesAll)));
    fill();
    return [
      ...head,
      el('input', { class: 'search', type: 'search', value: rquery, placeholder: t().searchRecipes, 'aria-label': t().searchRecipes, oninput: e => { rquery = e.target.value; fill(); } }),
      chips, box,
      R.book.languages.includes(state.lang) && el('div', { class: 'card book' }, el('h2', {}, t().bookTitle), el('p', {}, t().bookText),
        el('a', { href: R.book.url, rel: 'noopener' }, t().bookCta)),
      el('p', { class: 'fine' }, t().recipeNote)
    ];
  };

  // ---------- programa de alergénios ----------
  // A REVER POR PROFISSIONAL DE SAÚDE: os limites vêm de config.js > allergens.
  const ALG = Object.assign({ introducedAfter: 3, remindAfterDays: 7 }, CFG.allergens);
  const allergenStatus = () => F.allergens.map(id => {
    const hits = state.log.filter(e => F.byId.get(e.food).allergen === id).sort((a, b) => a.date.localeCompare(b.date));
    const reacted = hits.some(e => e.reaction), n = hits.length, last = n ? hits[n - 1].date : '';
    const state_ = reacted ? 'reaction' : n === 0 ? 'todo' : n < ALG.introducedAfter ? 'doing' : 'done';
    const days = last ? Math.round((parse(todayIso()) - parse(last)) / 864e5) : 0;
    return { id, n, last, days, state: state_, due: state_ === 'done' && days > ALG.remindAfterDays };
  });
  const goBack = to => el('button', { class: 'ghost noprint', style: 'align-self:flex-start', onclick: () => { tab = to; render(); window.scrollTo(0, 0); } }, '‹ ' + t()[TAB_LABEL[to]]);
  const viewAllergens = () => {
    const list = allergenStatus(), next = list.find(x => x.state === 'doing') || list.find(x => x.state === 'todo');
    return [
      goBack('progress'),
      el('div', { class: 'hello' }, el('h1', {}, t().algTitle), el('p', { class: 'muted', style: 'margin-top:6px' }, t().algIntro)),
      el('div', { class: 'card watch' }, el('p', {}, t().algBefore), el('p', { class: 'fine', style: 'margin-top:8px' }, t().algEmergency)),
      list.map(x => el('div', { class: 'card alg ' + x.state + (x.due ? ' due' : '') },
        el('div', { class: 'alghead' }, el('h2', {}, t().allergenName[x.id]), el('span', { class: 'badge st-' + x.state }, t().algState[x.state])),
        next && next.id === x.id && el('p', { class: 'eyebrow' }, t().algNext),
        el('p', { class: 'algstep' }, x.due ? t().algDue(x.days) : t().algStep[x.state]),
        (x.state === 'doing' || x.state === 'done') && el('div', { class: 'steps3', role: 'img', 'aria-label': t().algCount(Math.min(x.n, ALG.introducedAfter), ALG.introducedAfter) },
          Array.from({ length: ALG.introducedAfter }, (_, i) => el('i', { class: i < x.n ? 'on' : '' })),
          el('span', { class: 'muted' }, t().algCount(Math.min(x.n, ALG.introducedAfter), ALG.introducedAfter) + (x.last ? ' · ' + t().lastOffered(fmtDate(x.last, { day: 'numeric', month: 'short' })) : ''))),
        el('p', { class: 'fine', style: 'margin:10px 0 6px' }, t().algFoods),
        el('div', { class: 'pills' }, F.foods.filter(f => f.allergen === x.id).map(f => foodCard(f, () => openFoodDetail(f)))))),
      el('p', { class: 'fine' }, t().disclaimer)
    ];
  };

  // ---------- diário dos pais ----------
  // Gravações de voz: ficam no IndexedDB deste dispositivo, nunca saem daqui.
  const audioStore = (() => {
    let db;
    const open = () => db || (db = new Promise((res, rej) => {
      const r = indexedDB.open('pn-diary-audio', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('audio');
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    }));
    const run = (mode, fn) => open().then(d => new Promise((res, rej) => {
      const tx = d.transaction('audio', mode), rq = fn(tx.objectStore('audio'));
      tx.oncomplete = () => res(rq.result); tx.onerror = tx.onabort = () => rej(tx.error);
    }));
    return { put: (k, v) => run('readwrite', s => s.put(v, k)), get: k => run('readonly', s => s.get(k)), del: k => run('readwrite', s => s.delete(k)), clear: () => run('readwrite', s => s.clear()) };
  })();
  // Ficheiro .zip sem compressão, para a cópia de segurança levar as fotos e as gravações.
  const zip = (() => {
    const T = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
    const crc = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = T[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
    const enc = new TextEncoder(), dec = new TextDecoder();
    const pack = files => {
      const now = new Date(), day = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate(), parts = [], central = [];
      let off = 0;
      for (const f of files) {
        const name = enc.encode(f.name), c = crc(f.data), n = f.data.length;
        const h = new DataView(new ArrayBuffer(30));
        h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(12, day, true);
        h.setUint32(14, c, true); h.setUint32(18, n, true); h.setUint32(22, n, true); h.setUint16(26, name.length, true);
        parts.push(h.buffer, name, f.data);
        const d = new DataView(new ArrayBuffer(46));
        d.setUint32(0, 0x02014b50, true); d.setUint16(4, 20, true); d.setUint16(6, 20, true); d.setUint16(8, 0x0800, true); d.setUint16(14, day, true);
        d.setUint32(16, c, true); d.setUint32(20, n, true); d.setUint32(24, n, true); d.setUint16(28, name.length, true); d.setUint32(42, off, true);
        central.push(d.buffer, name);
        off += 30 + name.length + n;
      }
      const size = central.reduce((a, x) => a + x.byteLength, 0), e = new DataView(new ArrayBuffer(22));
      e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, size, true); e.setUint32(16, off, true);
      return new Blob([...parts, ...central, e.buffer], { type: 'application/zip' });
    };
    const unpack = buf => {
      const v = new DataView(buf), u = new Uint8Array(buf), out = {};
      let i = buf.byteLength - 22;
      while (i >= 0 && v.getUint32(i, true) !== 0x06054b50) i--;
      if (i < 0) throw new Error('zip');
      let p = v.getUint32(i + 16, true);
      for (let k = v.getUint16(i + 10, true); k > 0; k--) {
        if (v.getUint32(p, true) !== 0x02014b50 || v.getUint16(p + 10, true) !== 0) throw new Error('zip');
        const size = v.getUint32(p + 20, true), nl = v.getUint16(p + 28, true), lo = v.getUint32(p + 42, true);
        const start = lo + 30 + v.getUint16(lo + 26, true) + v.getUint16(lo + 28, true);
        out[dec.decode(u.subarray(p + 46, p + 46 + nl))] = u.slice(start, start + size);
        p += 46 + nl + v.getUint16(p + 30, true) + v.getUint16(p + 32, true);
      }
      return out;
    };
    return { pack, unpack, text: s => enc.encode(s), str: u => dec.decode(u) };
  })();
  // Cópia de segurança: dados.json mais um ficheiro por cada foto e gravação do diário.
  const exportBackup = async () => {
    const files = [], media = [];
    for (const b of state.babies) for (const e of b.journal) for (const key of [e.audio && e.id, e.photo && e.id + ':photo']) {
      if (!key) continue;
      const blob = await audioStore.get(key).catch(() => null);
      if (!blob) continue;
      const file = `media/${String(media.length + 1).padStart(4, '0')}`;
      media.push({ key, file, type: blob.type || '' });
      files.push({ name: file, data: new Uint8Array(await blob.arrayBuffer()) });
    }
    files.unshift({ name: 'dados.json', data: zip.text(JSON.stringify(Object.assign({}, state, { media }), null, 2)) });
    return zip.pack(files);
  };
  const importBackup = async file => {
    const buf = await file.arrayBuffer(), u = new Uint8Array(buf);
    const isZip = u[0] === 0x50 && u[1] === 0x4b, files = isZip ? zip.unpack(buf) : null;
    const raw = JSON.parse(isZip ? zip.str(files['dados.json'] || new Uint8Array()) : new TextDecoder().decode(u));
    if (!raw || !(Array.isArray(raw.log) || Array.isArray(raw.babies))) throw new Error('bad');
    let n = 0;
    if (isZip) {
      await audioStore.clear();
      for (const m of Array.isArray(raw.media) ? raw.media : []) {
        if (!m || typeof m.key !== 'string' || !files[m.file]) continue;
        await audioStore.put(m.key, new Blob([files[m.file]], { type: String(m.type || '') })); n++;
      }
    }
    state = clean(raw); save();
    return n;
  };
  const JMAX = (CFG.journal && CFG.journal.maxSeconds) || 180;
  const clock = n => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
  const canRecord = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const player = blob => el('audio', { controls: true, src: URL.createObjectURL(blob), class: 'player' });

  // Fotos e gravações de uma entrada: chave do áudio = id; chave da foto = id + ':photo'.
  const dropMedia = e => { if (e.audio) audioStore.del(e.id).catch(() => {}); if (e.photo) audioStore.del(e.id + ':photo').catch(() => {}); };
  // Reduz a foto no próprio dispositivo antes de a guardar.
  const shrinkPhoto = file => createImageBitmap(file).then(bmp => {
    const k = Math.min(1, 1280 / Math.max(bmp.width, bmp.height)), c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('blob')), 'image/jpeg', 0.82));
  });
  // Idade do bebé numa data, em meses e dias.
  const ageOn = dateIso => {
    if (!state.baby.birth || dateIso < state.baby.birth) return '';
    const b = parse(state.baby.birth), d = parse(dateIso);
    let m = (d.getFullYear() - b.getFullYear()) * 12 + d.getMonth() - b.getMonth();
    if (d.getDate() < b.getDate()) m--;
    const from = new Date(b.getFullYear(), b.getMonth() + m, b.getDate());
    return t().ageLong(m, Math.round((d - from) / 864e5));
  };

  const bookTitle = b => b === 'parents' ? t().journalParents : state.baby.name ? t().journalOf(state.baby.name) : t().journalBaby;
  const nowHM = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
  let jbook = 'baby'; // caderno aberto: o do bebé ou o dos pais
  let jday = null, jq = null; // página aberta no diário e pergunta escolhida (null = a do dia; -1 = sem pergunta)
  const openJournalForm = (entry, onDay) => {
    const e = entry || { id: 'j' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), date: onDay && onDay <= todayIso() ? onDay : todayIso(), title: '', text: '', audio: false, secs: 0, mood: '', photo: false, at: nowHM(), book: jbook };
    const date = el('input', { class: 'jpdate hand', type: 'date', value: e.date, max: todayIso(), 'aria-label': t().date });
    const text = el('textarea', { class: 'jlines', rows: 8, maxLength: 4000, value: e.text, placeholder: t().journalPlaceholder, 'aria-label': t().journalText });
    let blob = null, hasAudio = e.audio, secs = e.secs, rec = null, stream = null, timer = null, started = 0;
    let mood = e.mood, photoBlob = null, hasPhoto = e.photo;

    const moods = el('div', { class: 'chips', role: 'group', 'aria-label': t().moodTitle }, MOODS.map(id =>
      el('button', { class: 'chip', type: 'button', 'aria-pressed': String(mood === id), onclick: ev => {
        mood = mood === id ? '' : id; [...moods.children].forEach(b => b.setAttribute('aria-pressed', 'false'));
        if (mood) ev.currentTarget.setAttribute('aria-pressed', 'true');
      } }, t().moods[id])));
    // Pergunta do dia, escrita na página: roda de dia para dia e pode ser trocada.
    const Q = e.book === 'parents' ? t().questionsParents : t().questions;
    let qi = Math.floor(parse(todayIso()).getTime() / 864e5) % Q.length, qText = entry ? e.title : Q[qi];
    // A linha da pergunta pode ser corrigida ou reescrita.
    const qLine = el('input', { class: 'jq hand jqedit', type: 'text', maxLength: 80, value: qText || '', 'aria-label': t().journalTitleField, placeholder: t().journalTitleField, autocomplete: 'off' });
    const other = !entry ? el('button', { class: 'jother', type: 'button', onclick: () => { qi = (qi + 1) % Q.length; qLine.value = Q[qi]; text.focus(); } }, t().otherQuestion) : null;

    const photoBox = el('div', { class: 'photobox' });
    const pick = el('input', { type: 'file', accept: 'image/*', hidden: true, onchange: ev => {
      const f = ev.target.files[0]; if (!f) return;
      shrinkPhoto(f).then(b => { photoBlob = b; hasPhoto = true; drawPhoto(); }).catch(() => toast(t().photoFail));
    } });
    const drawPhoto = () => {
      if (!hasPhoto) return photoBox.replaceChildren(el('button', { class: 'ghost withtag', type: 'button', onclick: () => pick.click() }, icon('photo', 20), t().addPhoto), el('p', { class: 'fine' }, t().photoHint), pick);
      const img = el('img', { class: 'jphoto', alt: '' });
      if (photoBlob) img.src = URL.createObjectURL(photoBlob); else audioStore.get(e.id + ':photo').then(b => { if (b) img.src = URL.createObjectURL(b); }).catch(() => {});
      photoBox.replaceChildren(img, el('button', { class: 'ghost', type: 'button', onclick: () => { photoBlob = null; hasPhoto = false; drawPhoto(); } }, t().removePhoto), pick);
    };
    drawPhoto();

    const box = el('div', { class: 'recbox' });
    const release = () => { clearInterval(timer); if (stream) stream.getTracks().forEach(x => x.stop()); stream = null; };
    const idle = () => box.replaceChildren(...(canRecord()
      ? [el('button', { class: 'ghost withtag', type: 'button', onclick: start }, icon('mic', 20), t().recStart), el('p', { class: 'fine' }, t().recHint(Math.round(JMAX / 60)))]
      : [el('p', { class: 'fine' }, t().recUnsupported)]));
    const done = () => {
      const slot = el('div', { class: 'recdone' });
      if (blob) slot.append(player(blob));
      else { slot.append(el('span', { class: 'muted' }, `${t().voiceNote} · ${clock(secs)}`)); audioStore.get(e.id).then(b => { if (b && !blob && hasAudio) slot.replaceChildren(player(b)); }).catch(() => {}); }
      box.replaceChildren(slot, el('button', { class: 'ghost', type: 'button', onclick: () => { blob = null; hasAudio = false; secs = 0; idle(); } }, t().recDelete));
    };
    function start() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        stream = s; const chunks = [];
        rec = new MediaRecorder(s);
        rec.ondataavailable = ev => { if (ev.data && ev.data.size) chunks.push(ev.data); };
        rec.onstop = () => { secs = Math.max(1, Math.round((Date.now() - started) / 1000)); blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' }); hasAudio = true; release(); done(); };
        rec.start(); started = Date.now();
        const time = el('b', { class: 'rectime' }, clock(0));
        timer = setInterval(() => { const n = Math.round((Date.now() - started) / 1000); time.textContent = clock(n); if (n >= JMAX && rec.state === 'recording') rec.stop(); }, 500);
        box.replaceChildren(el('div', { class: 'recording', role: 'status' }, el('i', {}), el('span', {}, t().recording), time),
          el('button', { class: 'danger', type: 'button', onclick: () => rec.state === 'recording' && rec.stop() }, t().recStop));
      }).catch(() => toast(t().micDenied));
    }
    hasAudio ? done() : idle();
    sheet.addEventListener('close', () => { if (rec && rec.state === 'recording') { rec.onstop = null; rec.stop(); } release(); }, { once: true });

    const saveEntry = async () => {
      if (rec && rec.state === 'recording') return toast(t().recStop);
      const out = { id: e.id, date: DATE.test(date.value) && date.value <= todayIso() ? date.value : e.date, title: qLine.value.trim().slice(0, 80), text: text.value.trim(),
        audio: hasAudio, secs: hasAudio ? secs : 0, mood, photo: hasPhoto, at: e.at || '', book: e.book || 'baby' };
      if (!out.text && !out.audio && !out.photo) return toast(t().journalNeed);
      try { if (blob) await audioStore.put(e.id, blob); else if (!hasAudio && e.audio) await audioStore.del(e.id); }
      catch { out.audio = false; out.secs = 0; toast(t().audioFail); }
      try { if (photoBlob) await audioStore.put(e.id + ':photo', photoBlob); else if (!hasPhoto && e.photo) await audioStore.del(e.id + ':photo'); }
      catch { out.photo = false; toast(t().photoFail); }
      const list = state.baby.journal, i = list.findIndex(x => x.id === e.id);
      if (i >= 0) list[i] = out; else list.push(out);
      jday = out.date; save(); closeSheet(); render();
    };
    openSheet(sheetHead('', bookTitle(e.book)),
      el('div', { class: 'jpaper jwrite' }, date, qLine, other, text),
      el('p', { class: 'fine', style: 'margin-top:8px' }, t().dictateTip),
      photoBox, box,
      el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel), el('button', { class: 'primary', onclick: saveEntry }, t().save)),
      entry && el('div', { class: 'btnrow' }, el('button', { class: 'danger', onclick: () => deleteJournal(e) }, t().remove)));
  };
  const deleteJournal = e => openSheet(sheetHead('', t().journalTitle), el('p', { style: 'margin-top:10px' }, t().journalDelete),
    el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
      el('button', { class: 'danger', onclick: () => { dropMedia(e); state.baby.journal = state.baby.journal.filter(x => x.id !== e.id); save(); closeSheet(); render(); } }, t().remove)));
  // Diário: um caderno com uma página por dia. Tudo o que se escreve num dia vai para a mesma página.
  const viewJournal = () => {
    const J = state.baby.journal.filter(e => e.book === jbook), today = todayIso(), name = state.baby.name, mkey = d => jbook === 'parents' ? d + '|p' : d;
    const days = [...new Set([...J.map(e => e.date), today, ...(jday ? [jday] : [])])].sort();
    if (!jday || !days.includes(jday)) jday = today;
    const at = days.indexOf(jday), short = d => fmtDate(d, { day: 'numeric', month: 'short' });
    const go = d => { jday = d; jq = null; render(); };
    const moments = J.filter(e => e.date === jday).sort((a, b) => (a.at || '').localeCompare(b.at || '') || a.id.localeCompare(b.id));
    const age = ageOn(jday), foods = [...new Set(state.log.filter(x => x.date === jday).map(x => x.food))].map(id => fname(F.byId.get(id)));
    const written = new Set(J.map(e => e.date)).size;

    const moment = e => {
      const audio = el('div', { class: 'jaudio' }, el('button', { class: 'ghost withtag small', onclick: () => audioStore.get(e.id).then(b => { if (b) { const a = player(b); audio.replaceChildren(a); a.play().catch(() => {}); } else toast(t().audioFail); }).catch(() => toast(t().audioFail)) },
        icon('mic', 18), `${t().listen} · ${clock(e.secs)}`));
      const photo = e.photo ? el('img', { class: 'jphoto', alt: '', hidden: true }) : null;
      if (photo) audioStore.get(e.id + ':photo').then(b => { if (b) { photo.src = URL.createObjectURL(b); photo.hidden = false; } }).catch(() => {});
      return el('section', { class: 'jmoment' },
        el('div', { class: 'jmhead' }, el('span', { class: 'jtime' }, e.at || ''), el('button', { class: 'jedit', 'aria-label': t().edit, onclick: () => openJournalForm(e) }, icon('edit', 16))),
        e.title && el('p', { class: 'jq hand' }, e.title),
        photo && el('div', { class: 'jpolaroid' }, photo),
        e.text && el('p', { class: 'jlines' }, e.text),
        e.audio && audio);
    };

    // Escrever diretamente na página: o texto junta-se ao dia aberto.
    const Q = jbook === 'parents' ? t().questionsParents : t().questions, used = new Set(moments.map(e => e.title));
    const base = Math.floor(parse(today).getTime() / 864e5);
    const qIndex = jq === -1 ? -1 : (jq ?? base) % Q.length;
    const question = qIndex >= 0 && !used.has(Q[qIndex]) ? Q[qIndex] : '';
    const area = el('textarea', { class: 'jlines', rows: 3, maxLength: 4000, placeholder: moments.length ? t().jContinue : t().journalPlaceholder, 'aria-label': t().journalText,
      oninput: () => { area.style.height = 'auto'; area.style.height = area.scrollHeight + 'px'; saveBtn.disabled = !area.value.trim(); } });
    const saveBtn = el('button', { class: 'primary small', disabled: true, onclick: () => {
      const text = area.value.trim(); if (!text) return;
      state.baby.journal.push({ book: jbook, id: 'j' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), date: jday, title: question, text, audio: false, secs: 0, mood: '', photo: false, at: jday === today ? nowHM() : '' });
      jq = null; save(); render(); toast(t().jSaved);
    } }, t().jSavePage);
    const writer = el('div', { class: 'jwriter' },
      question && el('p', { class: 'jq hand' }, question),
      el('div', { class: 'jqlinks' },
        el('button', { class: 'jother', onclick: () => { jq = ((qIndex < 0 ? base : qIndex) + 1) % Q.length; render(); } }, t().otherQuestion),
        question && el('button', { class: 'jother', onclick: () => { jq = -1; render(); } }, t().jNoQuestion)),
      area,
      el('div', { class: 'jtools' }, saveBtn, el('button', { class: 'ghost small withtag', onclick: () => openJournalForm(null, jday) }, icon('photo', 18), t().jMedia)));

    const mood = state.baby.jmoods[mkey(jday)] || '';
    const page = el('article', { class: 'jpaper jpage' },
      el('p', { class: 'jdate hand' }, fmtDate(jday, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })),
      jbook === 'baby' && age && el('p', { class: 'jside' }, t().ageThen(name, age)),
      moments.length ? moments.map(moment) : null,
      jbook === 'baby' && foods.length ? el('p', { class: 'jfoods' }, el('b', {}, t().thatDay + ': '), foods.join(', ')) : null,
      writer,
      el('div', { class: 'jmoodrow' }, el('p', { class: 'jside' }, t().jDayMood),
        el('div', { class: 'chips' }, MOODS.map(id => el('button', { class: 'chip sticker', 'aria-pressed': String(mood === id), onclick: () => {
          if (mood === id) delete state.baby.jmoods[mkey(jday)]; else state.baby.jmoods[mkey(jday)] = id; save(); render();
        } }, t().moods[id])))));
    // Virar a página com o dedo.
    let x0 = 0, y0 = 0;
    page.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    page.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5 || e.target.closest('textarea')) return;
      const to = days[at + (dx < 0 ? 1 : -1)]; if (to) go(to);
    }, { passive: true });

    const jump = el('input', { type: 'date', class: 'jjump', max: today, value: jday, 'aria-label': t().jGoTo, onchange: e => { if (DATE.test(e.target.value) && e.target.value <= today) go(e.target.value); } });
    return [goBack('today'),
      el('div', { class: 'jcover slim' },
        el('img', { class: 'jart', src: 'img/diario.jpg', alt: '', width: 960, height: 640 }),
        el('p', { class: 'hand' }, bookTitle(jbook)),
        el('p', { class: 'jmeta' }, written ? t().jPagesCount(written) : t().journalFirst)),
      el('div', { class: 'chips seg two', role: 'group', 'aria-label': t().journalTitle }, [['baby', t().journalBaby], ['parents', t().journalParents]].map(([id, label]) =>
        el('button', { class: 'chip', 'aria-pressed': String(jbook === id), onclick: () => { if (id === 'parents' && PREM.parentsJournal && !isPremium()) return openPaywall(); jbook = id; jday = null; jq = null; render(); } }, label, id === 'parents' && gtag('parentsJournal')))),
      el('div', { class: 'jnav' },
        el('button', { class: 'ghost jarrow', disabled: at <= 0, 'aria-label': t().jPrev, onclick: () => go(days[at - 1]) }, '‹'),
        el('span', { class: 'jnavtxt' }, jday === today ? t().jToday : short(jday), el('small', {}, t().jPageOf(at + 1, days.length))),
        el('button', { class: 'ghost jarrow', disabled: at >= days.length - 1, 'aria-label': t().jNext, onclick: () => go(days[at + 1]) }, '›')),
      page,
      el('div', { class: 'jpages' }, el('p', { class: 'eyebrow' }, t().jPages),
        el('div', { class: 'chips catstrip', style: 'position:static;border:0;margin-top:6px' }, [...days].reverse().map(d => el('button', { class: 'chip', 'aria-pressed': String(d === jday), onclick: () => go(d) }, d === today ? t().jToday : short(d)))),
        el('label', { class: 'field' }, t().jGoTo, jump)),
      written ? el('div', { class: 'card' }, el('h2', {}, t().jExportTitle), el('p', { class: 'muted' }, t().jExportHint),
        el('div', { class: 'btnrow' }, el('button', { class: 'primary withtag', onclick: gate('journalBook', () => { tab = 'jbook'; render(); window.scrollTo(0, 0); }) }, t().jExportOpen, gtag('journalBook')))) : null
    ];
  };

  // Livro do diário: todas as páginas seguidas, para imprimir ou guardar em PDF.
  const viewJBook = () => {
    const J = state.baby.journal.filter(e => e.book === jbook), name = state.baby.name;
    const days = [...new Set(J.map(e => e.date))].sort();
    const long = d => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), short = d => fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' });
    return [
      el('button', { class: 'ghost noprint', style: 'align-self:flex-start', onclick: () => { tab = 'journal'; render(); window.scrollTo(0, 0); } }, '‹ ' + t().journalTitle),
      el('div', { class: 'bookcover' }, el('img', { src: 'img/diario-fundo.jpg', alt: '', width: 1100, height: 733 }),
        el('p', { class: 'hand' }, bookTitle(jbook)),
        days.length ? el('p', { class: 'jmeta' }, days.length > 1 ? `${short(days[0])} – ${short(days[days.length - 1])}` : short(days[0])) : el('p', { class: 'jmeta' }, t().journalFirst)),
      el('div', { class: 'card noprint' }, el('p', { class: 'muted' }, t().jExportNote),
        el('div', { class: 'btnrow' }, el('button', { class: 'primary', disabled: !days.length, onclick: () => window.print() }, t().jExportPrint))),
      days.map(d => {
        const age = jbook === 'baby' ? ageOn(d) : '', mood = state.baby.jmoods[jbook === 'parents' ? d + '|p' : d];
        const foods = jbook === 'baby' ? [...new Set(state.log.filter(x => x.date === d).map(x => x.food))].map(id => fname(F.byId.get(id))) : [];
        return el('article', { class: 'bookday' },
          el('p', { class: 'jdate hand' }, long(d)),
          (age || mood) && el('p', { class: 'jside' }, [age && t().ageThen(name, age), mood && t().moods[mood]].filter(Boolean).join(' · ')),
          J.filter(e => e.date === d).sort((a, b) => (a.at || '').localeCompare(b.at || '') || a.id.localeCompare(b.id)).map(e => {
            const photo = e.photo ? el('img', { class: 'jphoto', alt: '', hidden: true }) : null;
            if (photo) audioStore.get(e.id + ':photo').then(b => { if (b) { photo.src = URL.createObjectURL(b); photo.hidden = false; } }).catch(() => {});
            return el('section', { class: 'bookmoment' },
              e.at && el('span', { class: 'jtime' }, e.at),
              e.title && el('p', { class: 'jq hand' }, e.title),
              photo && el('div', { class: 'jpolaroid' }, photo),
              e.text && el('p', { class: 'booktext hand' }, e.text),
              e.audio && el('p', { class: 'jside' }, `${t().voiceNote} · ${clock(e.secs)}`));
          }),
          foods.length ? el('p', { class: 'jfoods' }, el('b', {}, t().thatDay + ': '), foods.join(', ')) : null);
      })
    ];
  };

  // ---------- guias ----------
  const sourcesText = () => (CFG.content && CFG.content.sources || []).join(', ');
  // Ilustração de cada guia (desenho fixo, sem texto do utilizador).
  const GUIDE_ART = {
    ready: '<path d="M44 50h72a36 36 0 0 1-72 0z" class="f"/><ellipse cx="80" cy="50" rx="36" ry="7" class="a"/><path d="M104 46l22-26" class="l"/><ellipse cx="129" cy="16" rx="6" ry="8" transform="rotate(40 129 16)" class="f"/><path d="M66 34c-4-5 4-8 0-13M80 32c-4-5 4-8 0-13M94 34c-4-5 4-8 0-13" class="l thin"/>',
    gagging: '<circle cx="74" cy="52" r="30" class="f"/><path d="M60 46c3-4 7-4 10 0M79 46c3-4 7-4 10 0" class="l"/><ellipse cx="74" cy="64" rx="7" ry="8" class="a"/><circle cx="116" cy="28" r="17" class="b"/><path d="M116 19v18M107 28h18" class="w"/>',
    textures: '<path d="M18 52h36a18 18 0 0 1-36 0z" class="f"/><ellipse cx="36" cy="52" rx="18" ry="4" class="a"/><rect x="68" y="30" width="11" height="42" rx="5.5" class="a"/><rect x="85" y="34" width="11" height="38" rx="5.5" class="f"/><rect x="116" y="38" width="13" height="13" rx="3" class="a"/><rect x="133" y="38" width="13" height="13" rx="3" class="f"/><rect x="116" y="55" width="13" height="13" rx="3" class="f"/><rect x="133" y="55" width="13" height="13" rx="3" class="a"/><path d="M57 86h46M97 81l6 5-6 5" class="l thin"/>',
    avoid: '<rect x="58" y="34" width="44" height="48" rx="10" class="f"/><rect x="62" y="22" width="36" height="12" rx="4" class="a"/><path d="M68 58c6-8 18-8 24 0-6 8-18 8-24 0z" class="a"/><circle cx="110" cy="66" r="19" class="b"/><path d="M98 78l24-24" class="w"/>',
    refusal: '<circle cx="62" cy="52" r="28" class="f"/><path d="M48 46c3 3 7 3 10 0M66 46c3 3 7 3 10 0" class="l"/><path d="M52 66h20" class="l"/><ellipse cx="108" cy="58" rx="9" ry="6" class="a"/><path d="M116 56l28-12" class="l"/><path d="M92 40l8 6M92 76l8-6" class="l thin"/>',
    water: '<path d="M52 30h56l-7 54H59z" class="f"/><path d="M56 52h48l-4 32H60z" class="b" opacity=".28"/><path d="M92 30l14-18h10" class="l"/><path d="M126 48c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" class="a"/>',
    routine: '<circle cx="58" cy="50" r="30" class="f"/><path d="M58 32v18l12 8" class="l"/><circle cx="116" cy="62" r="20" class="f"/><circle cx="116" cy="62" r="11" class="a"/><path d="M144 44v36M88 30v10" class="l thin"/>',
    cutting: '<circle cx="54" cy="52" r="26" class="a"/><path d="M54 26v52M28 52h52" class="l"/><rect x="98" y="26" width="12" height="48" rx="6" class="f"/><rect x="116" y="26" width="12" height="48" rx="6" class="a"/><rect x="134" y="26" width="12" height="48" rx="6" class="f"/>',
    storage: '<rect x="30" y="38" width="46" height="42" rx="8" class="f"/><rect x="26" y="28" width="54" height="12" rx="5" class="a"/><path d="M40 56h26M40 66h16" class="l thin"/><path d="M116 30v44M97 41l38 22M97 63l38-22M110 34l6 6 6-6M110 70l6-6 6 6" class="l"/>'
  };
  const guideArt = (g, cls) => {
    const box = el('span', { class: `gart g-${g.id} ${cls || ''}`, 'aria-hidden': 'true' });
    box.innerHTML = `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${GUIDE_ART[g.id] || GUIDE_ART.ready}</svg>`;
    return box;
  };
  // Tempo de leitura, a cerca de 200 palavras por minuto.
  const guideMinutes = g => {
    const words = [g.intro, ...g.sections.flatMap(x => [x.h, ...(x.p || []), ...(x.list || [])])].join(' ').split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  };
  const guideCard = g => el('button', { class: 'gcard', onclick: () => openGuide(g) }, guideArt(g),
    el('span', { class: 'gtxt' }, guideLocked(g) && ptag(), el('span', { class: 'rname' }, g.title), el('span', { class: 'gmin' }, icon('journal', 14), t().readMin(guideMinutes(g)))));
  const openGuide = g => guideLocked(g) && !isPremium() ? openPaywall() : openSheet(guideArt(g, 'hero'), sheetHead('', g.title), el('p', { class: 'gmin' }, icon('journal', 14), t().readMin(guideMinutes(g))), el('p', { class: 'muted', style: 'margin-top:8px' }, g.intro),
    g.sections.map(sec => [el('h3', { class: 'sub' }, sec.h), (sec.p || []).map(x => el('p', { class: 'gp' }, x)),
      sec.list ? el('ul', { class: 'ing' }, sec.list.map(x => el('li', {}, x))) : null]),
    g.id === 'gagging' && CFG.links && CFG.links.firstAid && CFG.links.firstAid[state.lang]
      ? el('div', { class: 'btnrow' }, el('a', { class: 'ghost linkbtn', href: CFG.links.firstAid[state.lang], rel: 'noopener', target: '_blank' }, t().firstAidLink)) : null,
    shopBlock((SHOP.guides || {})[g.id]),
    el('p', { class: 'fine', style: 'margin-top:16px' }, t().guideSources(sourcesText())),
    el('p', { class: 'fine', style: 'margin-top:6px' }, t().disclaimer));
  const viewGuides = () => {
    const guides = (window.DiaryGuides || {})[state.lang] || [];
    return [goBack('today'),
      el('div', { class: 'hello' }, el('h1', {}, t().guidesTitle), el('p', { class: 'muted', style: 'margin-top:6px' }, t().guidesHint)),
      el('div', { class: 'ggrid' }, guides.map(guideCard)),
      el('p', { class: 'fine' }, t().disclaimer)];
  };

  // ---------- páginas legais ----------
  const openLegal = key => {
    const page = ((window.DiaryLegal || {})[state.lang] || {})[key];
    if (!page) return;
    const L = Object.assign({ controller: CFG.brand.name, contact: '', updated: '' }, CFG.legal);
    const fill = x => x.replace(/\{controller\}/g, L.controller).replace(/\{contact\}/g, L.contact || t().legalNoContact)
      .replace(/\{date\}/g, L.updated ? fmtDate(L.updated, { day: 'numeric', month: 'long', year: 'numeric' }) : '—');
    openSheet(sheetHead('', page.title), el('p', { class: 'badge warn', style: 'display:inline-block;margin-top:8px' }, t().legalDraft),
      page.sections.map(sec => [el('h3', { class: 'sub' }, fill(sec.h)), sec.p.map(x => el('p', { class: 'gp' }, fill(x)))]));
  };
  const legalLinks = () => (window.DiaryLegal || {})[state.lang] ? el('div', { class: 'legallinks' }, [['privacy', 'legalPrivacy'], ['terms', 'legalTerms'], ['medical', 'legalMedical']].map(([k, label]) =>
    el('button', { class: 'linkish', onclick: () => openLegal(k) }, t()[label]))) : null;

  // ---------- views ----------
  const viewToday = () => {
    const today = todayIso();
    const entries = state.log.filter(e => e.date === day);
    const go = d => { day = d; calMonth = null; render(); };
    const age = ageMonths();
    const tips = t().tips, tip = tips[parse(day).getDate() % tips.length];
    const partner = CFG.partner && CFG.partner.enabled && CFG.partner.text[state.lang] ? CFG.partner : null;
    const long = d => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' });
    const planned = hasRecipes() ? planFor(day) : [];

    // Calendário do mês: cada dia mostra se houve registos e se houve suspeita de reação.
    const [cy, cm] = (calMonth || day.slice(0, 7)).split('-').map(Number);
    const lead = (new Date(cy, cm - 1, 1).getDay() + 6) % 7, daysInMonth = new Date(cy, cm, 0).getDate();
    const shiftMonth = n => { calMonth = iso(new Date(cy, cm - 1 + n, 1)).slice(0, 7); render(); };
    const perDay = new Map(), firstSeen = new Map();
    const info = d => { let v = perDay.get(d); if (!v) perDay.set(d, v = { n: 0, reaction: false, fresh: false, plan: 0, note: false }); return v; };
    for (const e of state.log) {
      const v = info(e.date); v.n++; v.reaction = v.reaction || e.reaction;
      if (!firstSeen.has(e.food) || e.date < firstSeen.get(e.food)) firstSeen.set(e.food, e.date);
    }
    for (const d of firstSeen.values()) info(d).fresh = true;
    if (hasRecipes()) for (const [d, ids] of Object.entries(state.baby.plan)) info(d).plan = ids.length;
    for (const d of Object.keys(state.baby.notes)) info(d).note = true;
    for (const e of state.baby.journal) info(e.date).note = true;
    const dayJournal = state.baby.journal.filter(e => e.date === day);
    const matches = v => calFilter === 'all' || (v && (calFilter === 'new' ? v.fresh : calFilter === 'reaction' ? v.reaction : v.note));
    const note = state.baby.notes[day] || '';
    const narrow = new Intl.DateTimeFormat(state.lang, { weekday: 'narrow' });
    const weekdays = Array.from({ length: 7 }, (_, i) => narrow.format(new Date(2024, 0, 1 + i))); // 1 de janeiro de 2024 foi segunda-feira
    const monthTitle = new Intl.DateTimeFormat(state.lang, { month: 'long', year: 'numeric' }).format(new Date(cy, cm - 1, 1));
    const cell = n => {
      const d = `${cy}-${String(cm).padStart(2, '0')}-${String(n).padStart(2, '0')}`, v = perDay.get(d);
      return el('button', { class: 'cday' + (d === today ? ' today' : '') + (matches(v) ? '' : ' dim'),
        'aria-pressed': String(d === day), disabled: d > today, 'aria-label': t().calDay(long(d), v ? v.n : 0), onclick: () => go(d) },
        String(n),
        v && el('span', { class: 'dots', 'aria-hidden': 'true' }, v.n ? el('i', { class: 'df' }) : null, v.plan ? el('i', { class: 'dp' }) : null,
          v.note ? el('i', { class: 'dn' }) : null, v.reaction ? el('i', { class: 'dr' }) : null));
    };
    const filters = [['all', t().all], ['new', t().filterNew], ['reaction', t().legendReactions], ['note', t().legendNotes]];
    const openNote = () => {
      const area = el('textarea', { rows: 5, maxLength: 500, placeholder: t().notePlaceholder, value: note });
      openSheet(sheetHead('', t().noteTitle), el('p', { class: 'muted' }, long(day)), el('label', { class: 'field', style: 'margin-top:12px' }, el('span', { hidden: true }, t().noteTitle), area),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
          el('button', { class: 'primary', onclick: () => { const v = area.value.trim(); if (v) state.baby.notes[day] = v; else delete state.baby.notes[day]; save(); closeSheet(); render(); } }, t().save)));
    };
    const opt = (ic, title, hint, fn, tag) => el('button', { class: 'addopt', onclick: fn }, icon(ic, 22),
      el('span', {}, el('b', {}, title, tag), el('span', { class: 'muted' }, hint)));
    const openAdd = () => openSheet(sheetHead('', t().addWhat), el('p', { class: 'muted' }, long(day)),
      el('div', { class: 'addopts' },
        opt('recipes', t().optMeal, t().optMealHint, () => openPicker(day)),
        hasRecipes() ? opt('journal', t().optRecipe, t().optRecipeHint, premium(() => openRecipePicker(day)), ptag()) : null,
        opt('note', t().optNote, t().optNoteHint, openNote),
        opt('journal', t().optJournal, t().optJournalHint, () => openJournalForm(null, day))));
    const fresh = entries.filter(e => firstSeen.get(e.food) === day).length, reacted = entries.filter(e => e.reaction).length;

    // Alergénios oferecidos nos últimos dois dias que ainda não têm resposta.
    const since = new Date(); since.setDate(since.getDate() - 2);
    const pending = state.log.filter(e => !e.checked && !e.reaction && e.date >= iso(since) && e.date <= today && F.byId.get(e.food).allergen);
    const answer = (e, reacted) => { e.checked = true; e.reaction = reacted; save(); render(); };

    // Próximos alimentos: os que faltam na semana atual do plano guiado.
    const path = day === today ? buildPath() : null;
    const nextFoods = path && path.cur >= 0 ? path.weeks[path.cur].filter(x => !path.tried.has(x.id)).slice(0, 3) : [];
    const dayNum = Math.floor(parse(today).getTime() / 864e5);
    const due = allergenStatus().filter(x => x.due);
    const guides = (window.DiaryGuides || {})[state.lang];
    const pool = hasRecipes() && day === today ? eligible() : [];
    const daily = pool.length ? pool[dayNum % pool.length] : null;

    return [
      babySwitch(),
      el('div', { class: 'hello' },
        el('p', { class: 'muted' }, state.baby.name && age !== null ? t().ageLine(state.baby.name, t().ageMonths(age))
          : state.baby.name || (age !== null ? t().ageMonths(age) : t().setupHint)),
        el('h1', {}, day === today ? t().today : long(day))),
      startCard(),
      el('div', { class: 'card cal' },
        el('div', { class: 'calhead' },
          el('button', { 'aria-label': t().prevMonth, onclick: () => shiftMonth(-1) }, '‹'),
          el('strong', {}, monthTitle),
          day !== today && el('button', { class: 'caltoday', onclick: () => go(today) }, t().today),
          el('button', { 'aria-label': t().nextMonth, disabled: `${cy}-${String(cm).padStart(2, '0')}` >= today.slice(0, 7), onclick: () => shiftMonth(1) }, '›')),
        el('div', { class: 'chips calfilters' }, filters.map(([id, label]) =>
          el('button', { class: 'chip', 'aria-pressed': String(calFilter === id), onclick: () => { calFilter = id; render(); } }, label))),
        el('div', { class: 'calgrid' },
          weekdays.map(w => el('span', { class: 'wd', 'aria-hidden': 'true' }, w)),
          Array.from({ length: lead }, () => el('span', {})),
          Array.from({ length: daysInMonth }, (_, i) => cell(i + 1))),
        el('div', { class: 'callegend' },
          [['df', t().legendFoods], hasRecipes() && ['dp', t().legendPlan], ['dn', t().legendNotes], ['dr', t().legendReactions]].filter(Boolean).map(([c, label]) =>
            el('span', {}, el('i', { class: c }), label)))),
      pending.map(e => el('div', { class: 'card watch' },
        el('p', { class: 'eyebrow' }, t().checkEyebrow),
        el('h2', {}, t().checkTitle(fname(F.byId.get(e.food)))),
        el('p', { class: 'muted' }, long(e.date)),
        el('div', { class: 'btnrow' },
          el('button', { class: 'ghost', onclick: () => answer(e, false) }, t().checkNone),
          el('button', { class: 'danger', onclick: () => answer(e, true) }, t().checkYes)))),
      el('div', { class: 'card' },
        el('p', { class: 'eyebrow daytitle' }, long(day)),
        el('h2', {}, t().daySummary),
        (entries.length || planned.length || note || dayJournal.length) ? el('div', { class: 'sumchips' },
          entries.length ? el('span', { class: 'sumchip' }, t().sumFoods(entries.length)) : null,
          fresh ? el('span', { class: 'sumchip new' }, t().sumNew(fresh)) : null,
          reacted ? el('span', { class: 'sumchip warn' }, t().sumReactions(reacted)) : null,
          planned.length ? el('span', { class: 'sumchip' }, t().sumPlanned(planned.length)) : null,
          note ? el('span', { class: 'sumchip note' }, t().optNote) : null,
          dayJournal.length ? el('span', { class: 'sumchip note' }, t().journalTitle) : null) : null,
        el('div', { class: 'meals' }, MEALS.map(m => {
          const rows = entries.filter(e => e.meal === m);
          return el('section', { class: 'meal' },
            el('div', { class: 'mealhead' }, el('h3', {}, t().meals[m]), el('button', { class: 'mealadd', 'aria-label': t().addToMeal(t().meals[m]), onclick: () => openPicker(day, m) }, icon('plus', 20))),
            rows.length ? el('div', { class: 'mealrows' }, rows.map(e => entryRow(e, false))) : null);
        }),
          entries.some(e => !e.meal) ? el('section', { class: 'meal' }, el('div', { class: 'mealhead' }, el('h3', {}, t().mealOther)),
            el('div', { class: 'mealrows' }, entries.filter(e => !e.meal).map(e => entryRow(e, false)))) : null),
        note && el('button', { class: 'daynote', 'aria-label': t().editNote, onclick: openNote }, icon('note', 18), el('span', {}, note)),
        dayJournal.map(e => el('button', { class: 'daynote', 'aria-label': t().edit, onclick: () => openJournalForm(e) }, icon(e.audio ? 'mic' : 'journal', 18),
          el('span', {}, e.title || e.text.slice(0, 140) || t().voiceNote))),
        ),
      due.length ? el('button', { class: 'card nudge', onclick: () => { tab = 'allergens'; render(); window.scrollTo(0, 0); } },
        el('span', { class: 'eyebrow' }, t().algTitle), el('span', { class: 'rname' }, t().algDueCard(due.length)),
        el('span', { class: 'muted' }, due.map(x => t().allergenName[x.id]).join(', '))) : null,
      nextFoods.length ? el('div', { class: 'card' }, el('h2', { style: 'margin-bottom:2px' }, t().pathToday(path.cur + 1)), el('p', { class: 'muted', style: 'margin-bottom:12px' }, t().pathTodayHint),
        el('div', { class: 'tiles three' }, nextFoods.map(foodTile)),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => { tab = 'path'; render(); window.scrollTo(0, 0); } }, t().pathOpen))) : null,
      planned.length ? el('div', { class: 'card' }, el('h2', {}, t().planDay), el('div', { class: 'rlist' }, planned.map(recipeRow))) : null,
      daily && !planned.length && el('button', { class: 'card daily', onclick: () => openRecipe(daily) },
        recipeArt(daily, 'thumb'),
        el('span', { class: 'rtxt' }, el('span', { class: 'eyebrow' }, t().recipeOfDay), el('span', { class: 'rname' }, rx(daily).t),
          el('span', { class: 'muted' }, recipeMeta(daily)), daily.kcal && el('span', { class: 'kcal' }, kcalLine(daily)))),
      el('button', { class: 'card nudge jbanner', onclick: () => { tab = 'journal'; render(); window.scrollTo(0, 0); } },
        el('img', { class: 'jart', src: 'img/diario.jpg', alt: '', width: 960, height: 640, loading: 'lazy' }),
        el('span', { class: 'jbtxt' },
          el('span', { class: 'hand' }, state.baby.name ? t().journalOf(state.baby.name) : t().journalYours),
          el('span', { class: 'muted' }, state.baby.journal.length ? t().memories(state.baby.journal.length) : t().optJournalHint))),
      guides ? el('div', { class: 'card gbox' },
        el('h2', { style: 'margin-bottom:2px' }, t().guidesTitle), el('p', { class: 'muted' }, t().guidesHint),
        el('div', { class: 'gstrip' }, guides.map(guideCard)),
        el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => { tab = 'guides'; render(); window.scrollTo(0, 0); } }, t().guidesAll(guides.length)))) : null,
      el('div', { class: 'card tip' }, el('p', {}, tip)),
      partner && el('div', { class: 'card partner' }, el('p', {}, partner.text[state.lang]), el('a', { href: partner.url, rel: 'noopener' }, partner.name)),
      el('button', { class: 'fab', 'aria-label': t().add, onclick: openAdd }, icon('plus', 26))
    ];
  };

  // Alimentos: só as categorias à vista; os alimentos aparecem ao abrir uma categoria ou ao procurar.
  const openCats = new Set();
  const viewFoods = () => {
    const box = el('div', { class: 'cats' });
    const fill = () => {
      const q = query.trim().toLowerCase();
      const rows = F.categories.map(c => {
        const all = F.foods.filter(x => x.cat === c), items = q ? all.filter(x => fname(x).toLowerCase().includes(q)) : all;
        if (!items.length) return null;
        const done = all.filter(x => countFor(x.id)).length, open = q ? true : openCats.has(c);
        return el('section', { class: 'cat' + (open ? ' open' : '') },
          el('button', { class: 'cathead', 'aria-expanded': String(open), disabled: !!q, onclick: () => { openCats.has(c) ? openCats.delete(c) : openCats.add(c); fill(); } },
            el('span', { class: 'catname' }, t().cat[c]),
            el('span', { class: 'catcount' }, `${done} / ${all.length}`),
            el('span', { class: 'chev', 'aria-hidden': 'true' }, '›'),
            el('span', { class: 'bar' }, el('i', { style: `width:${done / all.length * 100}%` }))),
          open && el('div', { class: 'tiles' }, items.map(foodTile)),
          open && items.some(x => x.allergen) && el('p', { class: 'legend' }, el('i', {}), t().allergenBadge));
      }).filter(Boolean);
      const favs = q ? [] : F.foods.filter(x => state.favFoods.includes(x.id));
      if (favs.length) rows.unshift(el('section', { class: 'cat open' }, el('div', { class: 'cathead', style: 'min-height:52px' }, el('span', { class: 'catname' }, t().favs), el('span', { class: 'catcount' }, String(favs.length))),
        el('div', { class: 'tiles' }, favs.map(foodTile))));
      const found = q && hasRecipes() ? R.list.filter(r => rx(r).t.toLowerCase().includes(q)).slice(0, 12) : [];
      if (found.length) rows.push(el('h3', { class: 'sub' }, t().tabRecipes), el('div', { class: 'rlist' }, found.map(recipeRow)));
      box.replaceChildren(...(rows.length ? rows : [el('p', { class: 'muted' }, t().noResults)]));
    };
    fill();
    return [
      el('div', { class: 'hello' }, el('h1', {}, t().tabFoods)),
      el('input', { class: 'search', type: 'search', value: query, placeholder: t().search, 'aria-label': t().search, oninput: e => { query = e.target.value; fill(); } }),
      box
    ];
  };

  // Anel de progresso (só números, nunca texto do utilizador).
  const ring = (v, total) => {
    const C = 2 * Math.PI * 52, n = el('div', { class: 'ring', role: 'img', 'aria-label': `${v} / ${total}` });
    n.innerHTML = `<svg viewBox="0 0 120 120" width="128" height="128" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--track)" stroke-width="10"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--brand)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - v / total)}" transform="rotate(-90 60 60)"/></svg>`;
    n.append(el('div', { class: 'ringtxt' }, el('b', {}, String(v)), el('span', {}, `/ ${total}`)));
    return n;
  };

  const viewProgress = () => {
    const tried = new Set(state.log.map(e => e.food));
    const total = F.foods.length;
    const reactions = [...new Set(state.log.filter(e => e.reaction).map(e => e.food))].map(id => F.byId.get(id));
    const next = CFG.milestones.find(m => m > tried.size);
    const short = d => fmtDate(d, { day: 'numeric', month: 'short' });

    // Dias seguidos com registo, a contar de hoje (ou de ontem, se hoje ainda não houver nada).
    const days = new Set(state.log.map(e => e.date));
    const cursor = new Date(); if (!days.has(iso(cursor))) cursor.setDate(cursor.getDate() - 1);
    let streak = 0; while (days.has(iso(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }

    // Alimentos cuja última vez foi "não gostou" e que não deram reação.
    const latest = new Map();
    for (const e of [...state.log].sort((a, b) => a.date.localeCompare(b.date))) latest.set(e.food, e);
    const retry = [...latest.values()].filter(e => e.like === -1 && !state.log.some(x => x.food === e.food && x.reaction)).map(e => F.byId.get(e.food));

    return [
      el('div', { class: 'card scard' },
        el('div', { class: 'ringrow' }, ring(tried.size, total),
          el('div', {},
            state.baby.name && el('p', { class: 'eyebrow' }, state.baby.name),
            el('h2', {}, t().foodsTried),
            el('p', { class: 'next' }, next ? t().nextMilestone(next) : t().allDone))),
        el('div', { class: 'medals' }, CFG.milestones.map(m => el('span', { class: 'medal' + (tried.size >= m ? ' on' : '') }, String(m))))),
      el('div', { class: 'stats' }, [[state.log.length, t().statLogs], [streak, t().statStreak], [days.size, t().statDays]].map(([n, label]) =>
        el('div', { class: 'card stat' }, el('b', {}, String(n)), el('span', {}, label(n))))),
      el('button', { class: 'ghost', onclick: () => { tab = 'path'; render(); window.scrollTo(0, 0); } }, t().pathTitle),
      el('button', { class: 'ghost withtag', onclick: gate('report', () => { tab = 'report'; render(); window.scrollTo(0, 0); }) }, t().reportOpen, gtag('report')),
      el('div', { class: 'card' }, el('h2', {}, t().byCategory), F.categories.map(c => {
        const all = F.foods.filter(x => x.cat === c), done = all.filter(x => tried.has(x.id)).length;
        return [el('div', { class: 'row' }, el('span', {}, t().cat[c]), el('span', { class: 'muted' }, `${done} / ${all.length}`)),
          el('div', { class: 'bar' }, el('i', { style: `width:${done / all.length * 100}%` }))];
      })),
      el('div', { class: 'card' }, el('h2', {}, t().allergensTitle), el('div', { class: 'alist' }, F.allergens.map(a => {
        const hits = state.log.filter(e => F.byId.get(e.food).allergen === a);
        const last = hits.reduce((m, e) => e.date > m ? e.date : m, '');
        return el('div', { class: hits.length ? 'done' : '' }, t().allergenName[a],
          el('small', {}, hits.length ? `${t().lastOffered(short(last))} · ${hits.length}×` : t().pending));
      })), el('p', { class: 'fine', style: 'margin-top:12px' }, t().allergenKeep),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => { tab = 'allergens'; render(); window.scrollTo(0, 0); } }, t().algOpen))),
      retry.length ? el('div', { class: 'card' }, el('h2', {}, t().retryTitle),
        el('div', { class: 'pills' }, retry.map(x => el('button', { class: 'chip', onclick: () => openFoodDetail(x) }, fname(x)))),
        el('p', { class: 'fine', style: 'margin-top:12px' }, t().retryNote)) : null,
      el('div', { class: 'card' }, el('h2', {}, t().reactionsTitle),
        reactions.length ? [el('div', { class: 'pills' }, reactions.map(x => el('button', { class: 'chip', onclick: () => openFoodDetail(x) }, fname(x)))),
          el('p', { class: 'info' }, t().reactionAdvice)] : el('p', { class: 'muted' }, t().noReactions))
    ];
  };

  const viewSettings = () => {
    const file = el('input', { type: 'file', accept: '.zip,.json,application/zip,application/json', hidden: true, onchange: async e => {
      const f = e.target.files[0]; if (!f) return;
      try { const n = await importBackup(f); render(); toast(n ? t().importMedia(n) : t().importOk); }
      catch { toast(t().importFail); }
    } });
    return [
      el('div', { class: 'card' }, el('h2', {}, t().babies),
        babySwitch(),
        el('label', { class: 'field', style: state.babies.length > 1 ? '' : 'margin-top:0' }, t().babyName, el('input', { type: 'text', maxLength: 40, value: state.baby.name, autocomplete: 'off',
          onchange: e => { state.baby.name = e.target.value.trim(); save(); render(); } })),
        el('label', { class: 'field' }, t().birthDate, el('input', { type: 'date', value: state.baby.birth, max: todayIso(),
          onchange: e => { state.baby.birth = e.target.value; rstage = null; save(); } })),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: openProfile }, t().profOpen)),
        el('div', { class: 'btnrow' },
          state.babies.length < 6 && el('button', { class: 'ghost withtag', onclick: premium(openAddBaby) }, t().addBaby, ptag()),
          state.babies.length > 1 && el('button', { class: 'danger', onclick: openRemoveBaby }, t().removeBaby))),
      el('div', { class: 'card' }, el('h2', {}, t().data), el('p', { class: 'muted' }, t().dataNote), el('p', { class: 'fine', style: 'margin-top:6px' }, t().backupNoAudio),
        el('div', { class: 'btnrow' },
          el('button', { class: 'ghost', onclick: async () => {
            toast(t().exportBusy);
            try {
              const a = el('a', { href: URL.createObjectURL(await exportBackup()), download: `petit-nuvem-copia-${todayIso()}.zip` });
              document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
            } catch { toast(t().exportFail); }
          } }, t().exportData),
          el('button', { class: 'ghost', onclick: () => file.click() }, t().importData), file),
        el('div', { class: 'btnrow' }, el('button', { class: 'danger', onclick: () => openSheet(
          sheetHead('', t().clearData), el('p', { style: 'margin-top:10px' }, t().confirmClear),
          el('div', { class: 'btnrow' },
            el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
            el('button', { class: 'danger', onclick: () => { state.babies.forEach(b => b.journal.forEach(dropMedia)); state = clean({ lang: state.lang, onboarded: true }); save(); closeSheet(); render(); } }, t().clearData))
        ) }, t().clearData))),
      el('div', { class: 'card' }, el('h2', {}, t().aboutTitle),
        el('p', { class: 'muted' }, t().aboutText),
        el('p', { class: 'muted', style: 'margin-top:6px' }, CFG.content && CFG.content.reviewedBy ? t().aboutReviewed(CFG.content.reviewedBy, CFG.content.reviewedOn ? fmtDate(CFG.content.reviewedOn, { day: 'numeric', month: 'long', year: 'numeric' }) : '') : t().aboutNotReviewed),
        el('p', { class: 'muted', style: 'margin-top:6px' }, t().aboutSources(sourcesText()))),
      el('div', { class: 'card' }, el('h2', {}, t().installTitle),
        isStandalone() ? el('p', { class: 'muted' }, t().installDone) : [
          el('p', { class: 'muted' }, t().installText),
          installEvt
            ? el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => { const e = installEvt; installEvt = null; e.prompt(); } }, t().installBtn))
            : el('p', { class: 'fine', style: 'margin-top:6px' }, isIos() ? t().installIos : t().installAndroid)
        ]),
      (window.DiaryLegal || {})[state.lang] ? el('div', { class: 'card' }, el('h2', {}, t().legalTitle), legalLinks()) : null,
      accountCard(),
      SUB.enabled && el('div', { class: 'card' }, el('h2', {}, t().subscription),
        el('p', { class: 'muted' }, !SUB.enforce ? t().subTest : entitled ? t().subActive : t().subFree),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: openPaywall }, t().subSee))),
      el('p', { class: 'fine' }, t().disclaimer)
    ];
  };

  const langSelect = () => el('select', { 'aria-label': t().language, onchange: e => { state.lang = e.target.value; save(); render(); } },
    CFG.languages.map(l => el('option', { value: l, selected: l === state.lang }, I18N[l].langName)));

  let reportNotes = false;
  const viewReport = () => {
    const d = iso => fmtDate(iso, { day: 'numeric', month: 'short', year: 'numeric' });
    const byFood = new Map();
    for (const e of state.log) {
      const r = byFood.get(e.food) || { first: e.date, n: 0 };
      r.n++; if (e.date < r.first) r.first = e.date; byFood.set(e.food, r);
    }
    const tried = [...byFood].map(([id, r]) => ({ food: F.byId.get(id), ...r })).sort((a, b) => a.first.localeCompare(b.first));
    const reactions = state.log.filter(e => e.reaction).sort((a, b) => a.date.localeCompare(b.date));
    const age = ageMonths();
    // Notas do calendário e do diário do bebé: só entram se os pais o pedirem.
    const notes = reportNotes ? [
      ...Object.entries(state.baby.notes).map(([date, text]) => ({ date, text })),
      ...state.baby.journal.filter(e => e.book !== 'parents' && e.text).map(e => ({ date: e.date, text: (e.title ? e.title + ' ' : '') + e.text }))
    ].sort((a, b) => a.date.localeCompare(b.date)) : [];
    const table = (head, rows) => el('div', { class: 'scroll' }, el('table', {},
      el('thead', {}, el('tr', {}, head.map(([h, c]) => el('th', { class: c || '', scope: 'col' }, h)))),
      el('tbody', {}, rows.map(r => el('tr', {}, r.map((v, i) => el('td', { class: head[i][1] || '' }, v)))))));
    return [el('div', { class: 'report', style: 'display:flex;flex-direction:column;gap:14px' },
      el('button', { class: 'ghost noprint', style: 'align-self:flex-start', onclick: () => { tab = 'progress'; render(); } }, '‹ ' + t().reportBack),
      el('div', {},
        el('h1', {}, t().reportTitle),
        el('p', { class: 'muted' }, [state.baby.name, age !== null && t().reportAge(t().ageMonths(age)), t().reportDate(d(todayIso()))].filter(Boolean).join(' · '))),
      el('div', { class: 'card' }, el('h2', {}, `${tried.length} / ${F.foods.length} ${t().foodsTried}`),
        el('p', { class: 'muted' }, F.categories.map(c => `${t().cat[c]} ${tried.filter(x => x.food.cat === c).length}`).join(' · '))),
      el('div', { class: 'card' }, el('h2', {}, t().allergensTitle), table(
        [[t().reportAllergen], [t().reportFood], [t().reportFirst, 'n']],
        F.allergens.map(a => {
          const hits = tried.filter(x => x.food.allergen === a);
          return [t().allergenName[a], hits.length ? hits.map(x => fname(x.food)).join(', ') : '–', hits.length ? d(hits[0].first) : t().pending];
        }))),
      el('div', { class: 'card' }, el('h2', {}, t().reactionsTitle), reactions.length
        ? table([[t().reportDateCol], [t().reportFood], [t().reportNoteCol]], reactions.map(e => [d(e.date), fname(F.byId.get(e.food)), e.note || '–']))
        : el('p', { class: 'muted' }, t().noReactions)),
      el('div', { class: 'card' }, el('h2', {}, t().reportFoods), tried.length
        ? table([[t().reportFood], [t().reportFirst], [t().reportTimes, 'n']], tried.map(x => [fname(x.food), d(x.first), String(x.n)]))
        : el('p', { class: 'muted' }, t().reportNone)),
      el('label', { class: 'check noprint' }, el('input', { type: 'checkbox', checked: reportNotes, onchange: e => { reportNotes = e.target.checked; render(); } }), t().reportNotesToggle),
      reportNotes && el('div', { class: 'card' }, el('h2', {}, t().reportNotes), notes.length
        ? table([[t().reportDateCol], [t().reportNoteCol]], notes.map(n => [d(n.date), n.text]))
        : el('p', { class: 'muted' }, t().reportNotesNone)),
      el('p', { class: 'fine' }, t().disclaimer),
      el('button', { class: 'primary noprint', onclick: () => window.print() }, t().reportPrint))];
  };

  // Boas-vindas em passos curtos: uma pergunta por ecrã.
  let obStep = 0;
  const OB_STEPS = 6;
  const viewWelcome = () => {
    const go = n => { obStep = Math.max(0, Math.min(OB_STEPS - 1, obStep + n)); save(); render(); window.scrollTo(0, 0); };
    const bar = el('div', { class: 'obbar', role: 'img', 'aria-label': t().stepOf(obStep + 1, OB_STEPS) }, Array.from({ length: OB_STEPS }, (_, i) => el('i', { class: i < obStep ? 'done' : i === obStep ? 'now' : '' })));
    const nav = (nextLabel, onNext, disabled) => el('div', { class: 'obnav' },
      obStep > 0 ? el('button', { class: 'ghost', onclick: () => go(-1) }, t().back) : null,
      el('button', { class: 'primary', disabled: !!disabled, onclick: onNext || (() => go(1)) }, nextLabel || t().next));
    let body;
    if (obStep === 0) body = [
      el('img', { class: 'obart', src: 'img/diario.jpg', alt: '', width: 960, height: 640 }),
      el('h1', {}, t().obTitle), el('p', { class: 'lead' }, t().obLead),
      el('ul', { class: 'points' }, t().obPoints.map(x => el('li', {}, icon('check', 16), el('span', {}, x)))),
      nav()];
    else if (obStep === 1) body = [
      el('h1', {}, t().obQ1), el('p', { class: 'lead' }, t().obQ1Hint),
      el('div', { class: 'obopts' }, GOALS.map(g => el('button', { class: 'obopt', 'aria-pressed': String(state.goals.includes(g)), onclick: ev => {
        state.goals = state.goals.includes(g) ? state.goals.filter(x => x !== g) : [...state.goals, g];
        ev.currentTarget.setAttribute('aria-pressed', String(state.goals.includes(g))); save();
      } }, el('span', {}, el('b', {}, t().goals[g][0]), el('span', { class: 'muted' }, t().goals[g][1])), el('span', { class: 'obtick', 'aria-hidden': 'true' }, icon('check', 16))))),
      nav()];
    else if (obStep === 2) body = [
      el('h1', {}, t().obQ2), el('p', { class: 'lead' }, t().obQ2Hint),
      el('div', { class: 'obopts' }, [[true, t().yes], [false, t().notYet]].map(([v, label]) => el('button', { class: 'obopt big', 'aria-pressed': String(state.started === v),
        onclick: () => { state.started = v; go(1); } }, el('span', {}, el('b', {}, label)), el('span', { class: 'obtick', 'aria-hidden': 'true' }, icon('check', 16))))),
      nav(t().next, null, state.started === null)];
    else if (obStep === 3) body = [
      el('h1', {}, t().obQm), el('p', { class: 'lead' }, t().obQmHint),
      el('div', { class: 'obopts' }, METHODS.map(m => el('button', { class: 'obopt', 'aria-pressed': String(state.baby.method === m),
        onclick: () => { state.baby.method = m; go(1); } }, el('span', {}, el('b', {}, t().methods[m][0]), el('span', { class: 'muted' }, t().methods[m][1])), el('span', { class: 'obtick', 'aria-hidden': 'true' }, icon('check', 16))))),
      nav(t().next, null, !state.baby.method)];
    else if (obStep === 4) body = [
      el('h1', {}, t().obQ3), el('p', { class: 'lead' }, t().obQ3Hint),
      el('div', { class: 'card' },
        el('label', { class: 'field' }, t().babyName, el('input', { type: 'text', maxLength: 40, value: state.baby.name, autocomplete: 'off',
          oninput: e => { state.baby.name = e.target.value.trim(); save(); } })),
        el('label', { class: 'field' }, t().birthDate, el('input', { type: 'date', value: state.baby.birth, max: todayIso(),
          onchange: e => { state.baby.birth = e.target.value; save(); } }))),
      nav()];
    else {
      const start = nav(t().obStart, () => { state.onboarded = true; obStep = 0; save(); render(); window.scrollTo(0, 0); }, true);
      body = [
        el('h1', {}, t().obQ4),
        el('div', { class: 'card' }, el('p', { class: 'muted' }, t().disclaimer),
          el('label', { class: 'check' }, el('input', { type: 'checkbox', onchange: e => { start.querySelector('.primary').disabled = !e.target.checked; } }), t().obAccept)),
        el('p', { class: 'fine' }, t().obPrivacy), legalLinks(), start];
    }
    return [el('div', { class: 'welcome', style: 'display:flex;flex-direction:column' }, bar, body)];
  };

  // Cartão "Para começar" no ecrã Hoje, feito a partir das respostas das boas-vindas.
  const startCard = () => {
    if (state.hideStart || state.log.length >= 3) return null;
    const guides = (window.DiaryGuides || {})[state.lang] || [], guide = id => guides.find(g => g.id === id);
    const goTab = id => () => { tab = id; render(); window.scrollTo(0, 0); };
    const links = [], add = (label, fn) => { if (label && !links.some(x => x[0] === label)) links.push([label, fn]); };
    const g = state.goals.length ? state.goals : ['browse'];
    if (state.started === false && guide('ready')) add(guide('ready').title, () => openGuide(guide('ready')));
    if (g.includes('safe')) { if (guide('gagging')) add(guide('gagging').title, () => openGuide(guide('gagging'))); if (guide('textures')) add(guide('textures').title, () => openGuide(guide('textures'))); }
    if (g.includes('allergens')) add(t().algTitle, goTab('allergens'));
    if (g.includes('what') || g.includes('browse')) add(t().startFoods, goTab('foods'));
    if (g.includes('meals') && hasRecipes()) add(t().tabRecipes, goTab('recipes'));
    if (state.started !== false) add(t().startLog, () => openPicker(todayIso()));
    add(t().pathTitle, goTab('path'));
    if (!state.baby.avoid.length && !state.baby.diet && !state.baby.eczema && !state.baby.premature) add(t().startProfile, openProfile);
    return el('div', { class: 'card startcard' },
      el('div', { class: 'alghead' }, el('h2', {}, t().startTitle), el('button', { class: 'linkish', onclick: () => { state.hideStart = true; save(); render(); } }, t().startHide)),
      el('div', { class: 'startlinks' }, links.slice(0, 5).map(([label, fn]) => el('button', { class: 'startlink', onclick: fn }, el('span', {}, label), el('span', { 'aria-hidden': 'true' }, '›')))));
  };

  // ---------- shell ----------
  let shown = '';
  const TAB_LABEL = { today: 'tabToday', progress: 'tabProgress' };
  // Perfil do bebé (opcional).
  const openProfile = () => {
    const b = state.baby, changed = () => { save(); openProfile(); render(); };
    const chip = (label, on, fn) => el('button', { class: 'chip', 'aria-pressed': String(!!on), onclick: () => { fn(); changed(); } }, label);
    const tick = (label, key, note) => [el('label', { class: 'check' }, el('input', { type: 'checkbox', checked: b[key], onchange: e => { b[key] = e.target.checked; changed(); } }), label),
      b[key] && el('p', { class: 'info' }, note)];
    openSheet(sheetHead('', t().profTitle), el('p', { class: 'muted' }, t().profHint),
      el('h3', { class: 'sub' }, t().obQm), el('div', { class: 'chips', style: 'margin-top:8px' }, METHODS.map(m => chip(t().methods[m][0], b.method === m, () => { b.method = b.method === m ? '' : m; }))),
      el('h3', { class: 'sub' }, t().profAvoid), el('p', { class: 'fine' }, t().profAvoidHint),
      el('div', { class: 'chips', style: 'margin-top:8px' }, F.allergens.map(a => chip(t().allergenName[a], b.avoid.includes(a), () => { b.avoid = b.avoid.includes(a) ? b.avoid.filter(x => x !== a) : [...b.avoid, a]; }))),
      el('h3', { class: 'sub' }, t().profDiet),
      el('div', { class: 'chips', style: 'margin-top:8px' }, [['', 'none'], ['veg', 'veg'], ['vegan', 'vegan']].map(([v, k]) => chip(t().diets[k], b.diet === v, () => { b.diet = v; }))),
      b.diet === 'vegan' && el('p', { class: 'info' }, t().profVeganNote),
      tick(t().profEczema, 'eczema', t().profEczemaNote),
      tick(t().profPremature, 'premature', t().profPrematureNote),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: closeSheet }, t().done || t().close)));
  };

  // Plano guiado: semanas com os alimentos a provar.
  let openWeeks = null;
  const viewPath = () => {
    const P = buildPath();
    if (!openWeeks) openWeeks = new Set([Math.max(0, P.cur)]);
    const section = (key, title, foods, isNow, lock) => {
      const done = foods.filter(x => P.tried.has(x.id)).length, open = openWeeks.has(key) && !lock;
      return el('section', { class: 'cat' + (open ? ' open' : '') + (isNow ? ' nowweek' : '') },
        el('button', { class: 'cathead', 'aria-expanded': String(open), onclick: () => { if (lock) return openPaywall(); openWeeks.has(key) ? openWeeks.delete(key) : openWeeks.add(key); render(); } },
          el('span', { class: 'catname' }, title, isNow && el('span', { class: 'badge nutri', style: 'margin-left:8px' }, t().pathNow), lock && el('span', { style: 'margin-left:8px' }, ptag())),
          el('span', { class: 'catcount' }, `${done} / ${foods.length}`),
          el('span', { class: 'chev', 'aria-hidden': 'true' }, '›'),
          el('span', { class: 'bar' }, el('i', { style: `width:${foods.length ? done / foods.length * 100 : 0}%` }))),
        open && el('div', { class: 'tiles' }, foods.map(foodTile)),
        open && foods.some(x => x.allergen) && el('p', { class: 'legend' }, el('i', {}), t().allergenBadge));
    };
    return [
      goBack('today'),
      el('div', { class: 'hello' }, el('h1', {}, t().pathTitle), el('p', { class: 'muted', style: 'margin-top:6px' }, t().pathIntro(PLAN.perWeek))),
      el('div', { class: 'card' }, el('div', { class: 'row' }, el('b', {}, P.cur < 0 ? t().pathDone : t().pathWeekN(P.cur + 1)), el('span', { class: 'muted' }, t().pathCount(P.done, P.total))),
        el('div', { class: 'bar' }, el('i', { style: `width:${P.total ? P.done / P.total * 100 : 0}%` })),
        el('p', { class: 'fine', style: 'margin-top:12px' }, t().pathNote),
        state.baby.eczema && el('p', { class: 'info' }, t().profEczemaNote),
        state.baby.premature && el('p', { class: 'info' }, t().profPrematureNote),
        P.excluded ? el('p', { class: 'fine', style: 'margin-top:10px' }, t().pathExcluded(P.excluded)) : null,
        el('button', { class: 'linkish', onclick: openProfile }, t().profOpen)),
      el('div', { class: 'cats' }, P.weeks.map((w, i) => section(i, t().pathWeekN(i + 1), w, i === P.cur, i >= PLAN.freeWeeks && !isPremium())),
        P.late.length ? section('late', t().pathLate, P.late, false, false) : null)
    ];
  };

  const EXTRA = { path: [viewPath, 'today', 'pathTitle'], report: [viewReport, 'progress', 'reportOpen'], allergens: [viewAllergens, 'progress', 'algTitle'], guides: [viewGuides, 'today', 'guidesTitle'], journal: [viewJournal, 'today', 'journalTitle'], jbook: [viewJBook, 'today', 'jExportTitle'] };
  const ALL_TABS = [['today', 'tabToday', viewToday], ['foods', 'tabFoods', viewFoods], ['recipes', 'tabRecipes', viewRecipes], ['progress', 'tabProgress', viewProgress], ['settings', 'tabSettings', viewSettings]];
  let TABS = ALL_TABS;
  const render = () => {
    const welcome = !state.onboarded;
    TABS = ALL_TABS.filter(x => x[0] !== 'recipes' || hasRecipes());
    if (tab === 'recipes' && !hasRecipes()) tab = 'today';
    document.documentElement.lang = state.lang;
    document.title = welcome || tab === 'today' ? CFG.brand.name : `${t()[EXTRA[tab] ? EXTRA[tab][2] : TABS.find(x => x[0] === tab)[1]]} · ${CFG.brand.name}`;
    $('langQuick').replaceWith(Object.assign(langSelect(), { id: 'langQuick' }));
    document.body.classList.toggle('bare', welcome);
    $('tabs').hidden = welcome;
    const current = EXTRA[tab] ? EXTRA[tab][1] : tab;
    $('tabs').replaceChildren(...TABS.map(([id, key]) => el('button', { 'aria-current': current === id ? 'page' : null,
      onclick: () => { tab = id; render(); window.scrollTo(0, 0); } }, icon(id), t()[key])));
    const view = welcome ? viewWelcome : EXTRA[tab] ? EXTRA[tab][0] : TABS.find(x => x[0] === tab)[2];
    const main = $('view'), key = welcome ? 'welcome' : tab;
    main.replaceChildren(...view().flat(Infinity).filter(Boolean));
    if (key !== shown) { shown = key; main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter'); }
  };
  // Marca: tenta a imagem do logótipo; se falhar fica a nuvem com o nome.
  $('brandName').textContent = CFG.brand.name;
  if (CFG.brand.url) $('brandLink').href = CFG.brand.url;
  if (CFG.brand.logo) {
    const img = $('brandLogo');
    img.alt = CFG.brand.name;
    img.onload = () => document.body.classList.add('haslogo');
    img.src = CFG.brand.logo;
  }
  render();
  accInit();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
