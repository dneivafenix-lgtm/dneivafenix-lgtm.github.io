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
    like: [1, 0, -1].includes(e.like) ? e.like : null, reaction: !!e.reaction, checked: !!e.checked, note: String(e.note || '').slice(0, 300)
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
  const METHODS = ['blw', 'spoon', 'both', 'unsure'];
  const GOALS = ['safe', 'allergens', 'meals', 'what', 'browse'];
  const MOODS = ['joy', 'proud', 'tender', 'laugh', 'tired', 'worry'];
  const cleanJournal = arr => (Array.isArray(arr) ? arr : []).filter(e => e && DATE.test(e.date)).slice(0, 500).map(e => ({
    id: String(e.id || 'j' + Math.random().toString(36).slice(2)), date: e.date, title: String(e.title || '').slice(0, 80),
    text: String(e.text || '').slice(0, 4000), audio: !!e.audio, secs: Math.max(0, Math.min(3600, Math.round(+e.secs || 0))),
    mood: MOODS.includes(e.mood) ? e.mood : '', photo: !!e.photo
  }));
  const cleanBaby = b => ({
    id: String(b.id || ''), name: String(b.name || '').slice(0, 40), birth: DATE.test(b.birth) ? b.birth : '', log: cleanLog(b.log), plan: cleanPlan(b.plan), notes: cleanNotes(b.notes), journal: cleanJournal(b.journal),
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
      babies, current: seen.has(s.current) ? s.current : babies[0].id
    });
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY))); } catch { return clean(null); } };
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } };

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
  const sheetHead = (emoji, title) => el('div', { class: 'sheethead' },
    el('h2', {}, title),
    el('button', { class: 'x', 'aria-label': t().close, onclick: closeSheet }, '✕'));

  const likeLabel = v => v === 1 ? t().liked : v === 0 ? t().neutral : v === -1 ? t().disliked : '';

  const foodInfo = food => [
    food.allergen && el('p', { class: 'info' }, t().infoAllergen(t().allergenName[food.allergen])),
    food.min12 && el('p', { class: 'info' }, t().infoMin12),
    food.choke && el('p', { class: 'info' }, t().infoChoke)
  ];

  const openLogForm = (food, date) => {
    let like = null;
    const likes = el('div', { class: 'likes', role: 'group', 'aria-label': t().howWasIt }, [1, 0, -1].map(v =>
      el('button', { type: 'button', 'aria-pressed': 'false', onclick: e => {
        like = like === v ? null : v;
        [...likes.children].forEach(b => b.setAttribute('aria-pressed', 'false'));
        if (like !== null) e.currentTarget.setAttribute('aria-pressed', 'true');
      } }, likeLabel(v))));
    const reaction = el('input', { type: 'checkbox' });
    const note = el('textarea', { rows: 2, maxLength: 300 });
    openSheet(
      sheetHead('', fname(food)),
      el('p', { class: 'muted' }, fmtDate(date, { weekday: 'long', day: 'numeric', month: 'long' })),
      foodInfo(food),
      el('h3', { class: 'sub' }, t().howWasIt), likes,
      el('label', { class: 'check' }, reaction, t().suspectReaction),
      el('label', { class: 'field' }, t().note, note),
      el('div', { class: 'btnrow' },
        el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
        el('button', { class: 'primary', onclick: () => {
          state.log.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), food: food.id, date, like, reaction: reaction.checked, checked: reaction.checked, note: note.value.trim() });
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
  const serveSection = food => {
    const lines = (SERVE[state.lang] || {})[food.id];
    if (!lines) return null;
    const age = ageMonths(), now = age === null ? -1 : age >= 12 ? 2 : age >= 9 ? 1 : 0;
    return [el('h3', { class: 'sub' }, t().serveTitle),
      el('div', { class: 'serve' }, lines.map((txt, i) => el('div', { class: 'srow' + (i === now ? ' now' : '') },
        el('span', { class: 'sage' }, t().stage(SERVE_STAGES[i]), i === now && el('b', {}, t().serveNow)),
        SERVE_PHOTOS[`${food.id}-${SERVE_STAGES[i]}`] && el('img', { class: 'sphoto', src: SERVE_PHOTOS[`${food.id}-${SERVE_STAGES[i]}`], alt: '', loading: 'lazy', width: 640, height: 640 }),
        el('p', {}, txt)))),
      el('p', { class: 'fine', style: 'margin-top:8px' }, t().serveNote)];
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
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openLogForm(food, todayIso()) }, t().logThis)),
      serveSection(food),
      food.allergen && [el('p', { class: 'info' }, t().infoAllergen(t().allergenName[food.allergen])), el('p', { class: 'fine', style: 'margin-top:6px' }, t().allergenKeep),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => { closeSheet(); tab = 'allergens'; render(); window.scrollTo(0, 0); } }, t().algTitle))],
      foodExtras(food),
      hist.length ? [el('h3', { class: 'sub' }, t().history), el('div', { class: 'card' }, hist.map(e => entryRow(e, true)))] : null,
      withFood.length ? [el('h3', { class: 'sub' }, t().recipesWith), el('div', { class: 'rlist' }, withFood.map(recipeRow))] : null);
  };

  const openPicker = date => {
    const list = el('div', { class: 'pills' });
    const fill = q => {
      const items = F.foods.filter(x => fname(x).toLowerCase().includes(q.toLowerCase()));
      list.replaceChildren(...(items.length ? items.map(x => foodCard(x, () => openLogForm(x, date))) : [el('p', { class: 'muted' }, t().noResults)]));
    };
    const input = el('input', { class: 'search', type: 'search', placeholder: t().search, 'aria-label': t().search, oninput: e => fill(e.target.value) });
    fill('');
    openSheet(sheetHead('', t().addFood.replace(/^\+\s*/, '')), input, list);
  };

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
        e.note && el('div', { class: 'note' }, e.note),
        e.reaction && el('span', { class: 'flag' }, t().reactionFlag)),
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
  const isPremium = () => !SUB.enabled || !SUB.enforce || entitled;
  const locked = r => SUB.enabled && r.min > SUB.freeStage;
  const ptag = () => SUB.enabled ? el('span', { class: 'ptag' }, t().premium) : null;
  const money = n => new Intl.NumberFormat(state.lang === 'pt' ? 'pt-PT' : state.lang, { style: 'currency', currency: SUB.currency }).format(n);
  const openPaywall = () => {
    let pick = 'yearly';
    const saving = Math.round((1 - SUB.yearly / (SUB.monthly * 12)) * 100);
    const opt = (id, name, price, badge) => el('button', { class: 'planopt', 'aria-pressed': String(pick === id), onclick: e => {
      pick = id; [...plans.children].forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
    } }, el('span', {}, el('b', {}, name), el('span', { class: 'muted' }, price)), badge && el('span', { class: 'ptag' }, badge));
    const plans = el('div', { class: 'plans', role: 'group', 'aria-label': t().subscription },
      opt('yearly', t().planYearly, t().perYear(money(SUB.yearly)), t().subSave(saving)),
      opt('monthly', t().planMonthly, t().perMonth(money(SUB.monthly))));
    openSheet(sheetHead('', t().subTitle), el('p', { class: 'muted' }, t().subLead),
      el('ul', { class: 'points', style: 'margin-top:16px' }, t().subPoints.map(x => el('li', {}, icon('check', 16), el('span', {}, x)))),
      plans,
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => {
        const url = SUB.checkout && SUB.checkout[pick];
        if (url) location.href = url; else toast(t().subSoon);
      } }, t().subStart)),
      el('p', { class: 'fine', style: 'margin-top:10px;text-align:center' }, t().trialNote(SUB.trialDays)),
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
    el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: () => openDayPicker(r) }, t().addToPlan)),
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
      const items = R.list.filter(r => (!rstage || r.min === rstage) && rx(r).t.toLowerCase().includes(rquery.toLowerCase()));
      box.replaceChildren(...(items.length ? items.map(recipeRow) : [el('p', { class: 'muted' }, t().recipesEmpty)]));
    };
    const opts = [0, ...R.stages];
    const chips = el('div', { class: 'chips' }, opts.map(m => el('button', { class: 'chip', 'aria-pressed': String(rstage === m), onclick: () => {
      rstage = m; [...chips.children].forEach((b, i) => b.setAttribute('aria-pressed', String(opts[i] === m))); fill();
    } }, m ? t().stage(m) : t().recipesAll)));
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
    return { put: (k, v) => run('readwrite', s => s.put(v, k)), get: k => run('readonly', s => s.get(k)), del: k => run('readwrite', s => s.delete(k)) };
  })();
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

  const openJournalForm = (entry, onDay) => {
    const e = entry || { id: 'j' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), date: onDay && onDay <= todayIso() ? onDay : todayIso(), title: '', text: '', audio: false, secs: 0, mood: '', photo: false };
    const date = el('input', { type: 'date', value: e.date, max: todayIso() });
    const title = el('input', { type: 'text', maxLength: 80, value: e.title, autocomplete: 'off' });
    const text = el('textarea', { rows: 6, maxLength: 4000, value: e.text, placeholder: t().journalPlaceholder });
    let blob = null, hasAudio = e.audio, secs = e.secs, rec = null, stream = null, timer = null, started = 0;
    let mood = e.mood, photoBlob = null, hasPhoto = e.photo;

    const moods = el('div', { class: 'chips', role: 'group', 'aria-label': t().moodTitle }, MOODS.map(id =>
      el('button', { class: 'chip', type: 'button', 'aria-pressed': String(mood === id), onclick: ev => {
        mood = mood === id ? '' : id; [...moods.children].forEach(b => b.setAttribute('aria-pressed', 'false'));
        if (mood) ev.currentTarget.setAttribute('aria-pressed', 'true');
      } }, t().moods[id])));
    // Ideias para escrever: três, a rodar de dia para dia.
    const P = t().prompts, k = Math.floor(parse(todayIso()).getTime() / 864e5);
    const prompts = !entry ? el('div', { class: 'prompts' }, el('p', { class: 'fine' }, t().promptsTitle),
      el('div', { class: 'chips' }, [0, 1, 2].map(n => P[(k + n) % P.length]).map(x =>
        el('button', { class: 'chip', type: 'button', onclick: () => { title.value = x; text.focus(); } }, x)))) : null;

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
      const out = { id: e.id, date: DATE.test(date.value) && date.value <= todayIso() ? date.value : e.date, title: title.value.trim(), text: text.value.trim(),
        audio: hasAudio, secs: hasAudio ? secs : 0, mood, photo: hasPhoto };
      if (!out.title && !out.text && !out.audio && !out.photo) return toast(t().journalNeed);
      try { if (blob) await audioStore.put(e.id, blob); else if (!hasAudio && e.audio) await audioStore.del(e.id); }
      catch { out.audio = false; out.secs = 0; toast(t().audioFail); }
      try { if (photoBlob) await audioStore.put(e.id + ':photo', photoBlob); else if (!hasPhoto && e.photo) await audioStore.del(e.id + ':photo'); }
      catch { out.photo = false; toast(t().photoFail); }
      const list = state.baby.journal, i = list.findIndex(x => x.id === e.id);
      if (i >= 0) list[i] = out; else list.push(out);
      save(); closeSheet(); render();
    };
    openSheet(sheetHead('', state.baby.name ? t().journalOf(state.baby.name) : t().journalYours),
      el('label', { class: 'field', style: 'margin-top:12px' }, t().date, date),
      el('p', { class: 'field', style: 'margin-bottom:6px' }, t().moodTitle), moods,
      prompts,
      el('label', { class: 'field' }, t().journalTitleField, title),
      el('label', { class: 'field' }, t().journalText, text),
      el('p', { class: 'fine', style: 'margin-top:6px' }, t().dictateTip),
      photoBox, box,
      el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel), el('button', { class: 'primary', onclick: saveEntry }, t().save)));
  };
  const deleteJournal = e => openSheet(sheetHead('', t().journalTitle), el('p', { style: 'margin-top:10px' }, t().journalDelete),
    el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
      el('button', { class: 'danger', onclick: () => { dropMedia(e); state.baby.journal = state.baby.journal.filter(x => x.id !== e.id); save(); closeSheet(); render(); } }, t().remove)));
  const viewJournal = () => {
    const list = [...state.baby.journal].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    const name = state.baby.name, first = list.length ? list[list.length - 1].date : '';
    const short = d => fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' });
    return [goBack('today'),
      el('div', { class: 'jcover' },
        el('img', { class: 'jart', src: 'img/diario.jpg', alt: '', width: 960, height: 640 }),
        el('p', { class: 'hand' }, name ? t().journalOf(name) : t().journalYours),
        el('p', { class: 'jmeta' }, list.length ? `${t().memories(list.length)} · ${t().since(short(first))}` : t().journalFirst),
        el('button', { class: 'primary', onclick: () => openJournalForm(null) }, t().journalNew)),
      el('div', { class: 'timeline' }, list.map(e => {
        const age = ageOn(e.date), foods = [...new Set(state.log.filter(x => x.date === e.date).map(x => x.food))].map(id => fname(F.byId.get(id)));
        const audio = el('div', { class: 'jaudio' }, el('button', { class: 'ghost withtag small', onclick: () => audioStore.get(e.id).then(b => { if (b) { const a = player(b); audio.replaceChildren(a); a.play().catch(() => {}); } else toast(t().audioFail); }).catch(() => toast(t().audioFail)) },
          icon('mic', 18), `${t().listen} · ${clock(e.secs)}`));
        const photo = e.photo ? el('img', { class: 'jphoto', alt: '', hidden: true }) : null;
        if (photo) audioStore.get(e.id + ':photo').then(b => { if (b) { photo.src = URL.createObjectURL(b); photo.hidden = false; } }).catch(() => {});
        return el('article', { class: 'jentry' },
          el('p', { class: 'jdate hand' }, fmtDate(e.date, { weekday: 'long', day: 'numeric', month: 'long' })),
          el('div', { class: 'card jcard' },
            (age || e.mood) && el('div', { class: 'jtags' }, age && el('span', { class: 'badge' }, t().ageThen(name, age)), e.mood && el('span', { class: 'badge nutri' }, t().moods[e.mood])),
            e.title && el('h2', {}, e.title),
            photo,
            e.text && el('p', { class: 'jtext' }, e.text),
            e.audio && audio,
            foods.length ? el('p', { class: 'jfoods' }, el('b', {}, t().thatDay + ': '), foods.join(', ')) : null,
            el('div', { class: 'jactions' }, el('button', { class: 'linkish', onclick: () => openJournalForm(e) }, t().edit), el('button', { class: 'linkish', onclick: () => deleteJournal(e) }, t().remove))));
      }))
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
    el('span', { class: 'gtxt' }, el('span', { class: 'rname' }, g.title), el('span', { class: 'gmin' }, icon('journal', 14), t().readMin(guideMinutes(g)))));
  const openGuide = g => openSheet(guideArt(g, 'hero'), sheetHead('', g.title), el('p', { class: 'gmin' }, icon('journal', 14), t().readMin(guideMinutes(g))), el('p', { class: 'muted', style: 'margin-top:8px' }, g.intro),
    g.sections.map(sec => [el('h3', { class: 'sub' }, sec.h), (sec.p || []).map(x => el('p', { class: 'gp' }, x)),
      sec.list ? el('ul', { class: 'ing' }, sec.list.map(x => el('li', {}, x))) : null]),
    g.id === 'gagging' && CFG.links && CFG.links.firstAid && CFG.links.firstAid[state.lang]
      ? el('div', { class: 'btnrow' }, el('a', { class: 'ghost linkbtn', href: CFG.links.firstAid[state.lang], rel: 'noopener', target: '_blank' }, t().firstAidLink)) : null,
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
        opt('foods', t().optFood, t().optFoodHint, () => openPicker(day)),
        hasRecipes() ? opt('recipes', t().optRecipe, t().optRecipeHint, premium(() => openRecipePicker(day)), ptag()) : null,
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
        entries.length ? entries.map(e => entryRow(e, false)) : el('p', { class: 'muted' }, t().emptyDay),
        note && el('button', { class: 'daynote', 'aria-label': t().editNote, onclick: openNote }, icon('note', 18), el('span', {}, note)),
        dayJournal.map(e => el('button', { class: 'daynote', 'aria-label': t().edit, onclick: () => openJournalForm(e) }, icon(e.audio ? 'mic' : 'journal', 18),
          el('span', {}, e.title || e.text.slice(0, 140) || t().voiceNote))),
        !entries.length && el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openPicker(day) }, t().addFood))),
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
      el('button', { class: 'ghost withtag', onclick: premium(() => { tab = 'report'; render(); window.scrollTo(0, 0); }) }, t().reportOpen, ptag()),
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
    const file = el('input', { type: 'file', accept: 'application/json,.json', hidden: true, onchange: async e => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const raw = JSON.parse(await f.text());
        if (!raw || !(Array.isArray(raw.log) || Array.isArray(raw.babies))) throw new Error('bad');
        state = clean(raw); save(); render(); toast(t().importOk);
      } catch { toast(t().importFail); }
    } });
    return [
      el('div', { class: 'card' }, el('label', { class: 'field' }, t().language, langSelect())),
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
          el('button', { class: 'ghost', onclick: () => {
            const a = el('a', { href: URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })), download: `diario-alimentar-${todayIso()}.json` });
            document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
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
      (window.DiaryLegal || {})[state.lang] ? el('div', { class: 'card' }, el('h2', {}, t().legalTitle), legalLinks()) : null,
      SUB.enabled && el('div', { class: 'card' }, el('h2', {}, t().subscription),
        el('p', { class: 'muted' }, !SUB.enforce ? t().subTest : entitled ? t().subActive : t().subFree),
        el('div', { class: 'btnrow' }, el('button', { class: 'ghost', onclick: openPaywall }, t().subSee))),
      el('p', { class: 'fine' }, t().disclaimer)
    ];
  };

  const langSelect = () => el('select', { 'aria-label': t().language, onchange: e => { state.lang = e.target.value; save(); render(); } },
    CFG.languages.map(l => el('option', { value: l, selected: l === state.lang }, I18N[l].langName)));

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

  const EXTRA = { path: [viewPath, 'today', 'pathTitle'], report: [viewReport, 'progress', 'reportOpen'], allergens: [viewAllergens, 'progress', 'algTitle'], guides: [viewGuides, 'today', 'guidesTitle'], journal: [viewJournal, 'today', 'journalTitle'] };
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

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
