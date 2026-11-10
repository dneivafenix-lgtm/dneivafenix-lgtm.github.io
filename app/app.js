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
  const cleanBaby = b => ({
    id: String(b.id || ''), name: String(b.name || '').slice(0, 40), birth: DATE.test(b.birth) ? b.birth : '', log: cleanLog(b.log), plan: cleanPlan(b.plan),
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
      babies, current: seen.has(s.current) ? s.current : babies[0].id
    });
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY))); } catch { return clean(null); } };
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } };

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayIso = () => iso(new Date());
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
  const serveSection = food => {
    const lines = (SERVE[state.lang] || {})[food.id];
    if (!lines) return null;
    const age = ageMonths(), now = age === null ? -1 : age >= 12 ? 2 : age >= 9 ? 1 : 0;
    return [el('h3', { class: 'sub' }, t().serveTitle),
      el('div', { class: 'serve' }, lines.map((txt, i) => el('div', { class: 'srow' + (i === now ? ' now' : '') },
        el('span', { class: 'sage' }, t().stage(SERVE_STAGES[i]), i === now && el('b', {}, t().serveNow)),
        el('p', {}, txt)))),
      el('p', { class: 'fine', style: 'margin-top:8px' }, t().serveNote)];
  };
  const openFoodDetail = food => {
    const hist = state.log.filter(e => e.food === food.id).sort((a, b) => b.date.localeCompare(a.date));
    const withFood = hasRecipes() ? R.list.filter(r => r.foods.includes(food.id)) : [];
    openSheet(
      sheetHead('', fname(food)),
      el('p', { class: 'muted' }, `${t().cat[food.cat]} · ${hist.length ? t().triedTimes(hist.length) : t().notTried}`),
      (food.allergen || food.choke || food.min12) && el('div', { class: 'badges' },
        food.allergen && el('span', { class: 'badge warn' }, t().badgeAllergen(t().allergenName[food.allergen])),
        food.choke && el('span', { class: 'badge warn' }, t().badgeChoke),
        food.min12 && el('span', { class: 'badge warn' }, t().badgeMin12)),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openLogForm(food, todayIso()) }, t().logThis)),
      serveSection(food),
      food.allergen && el('p', { class: 'info' }, t().infoAllergen(t().allergenName[food.allergen])),
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
      !SUB.enforce && el('p', { class: 'info' }, t().subTest));
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
    if (PHOTOS[r.id]) { box.append(el('img', { src: PHOTOS[r.id], alt: '', loading: 'lazy' })); return box; }
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
        el('button', { class: 'danger', onclick: () => { state.babies.splice(i, 1); closeSheet(); switchBaby(state.babies[0].id); } }, t().removeBaby)));
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

  // ---------- views ----------
  const viewToday = () => {
    const today = todayIso();
    const entries = state.log.filter(e => e.date === day);
    const go = d => { day = d; render(); };
    const shiftWeek = n => { const d = parse(day); d.setDate(d.getDate() + n * 7); const v = iso(d); go(v > today ? today : v); };
    const age = ageMonths();
    const tips = t().tips, tip = tips[parse(day).getDate() % tips.length];
    const partner = CFG.partner && CFG.partner.enabled && CFG.partner.text[state.lang] ? CFG.partner : null;
    const long = d => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' });

    // Semana (segunda a domingo) do dia que está aberto.
    const monday = parse(day); monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return iso(d); });
    const logged = new Set(state.log.map(e => e.date));
    const narrow = new Intl.DateTimeFormat(state.lang, { weekday: 'narrow' });

    // Alergénios oferecidos nos últimos dois dias que ainda não têm resposta.
    const since = new Date(); since.setDate(since.getDate() - 2);
    const pending = state.log.filter(e => !e.checked && !e.reaction && e.date >= iso(since) && e.date <= today && F.byId.get(e.food).allergen);
    const answer = (e, reacted) => { e.checked = true; e.reaction = reacted; save(); render(); };

    // Sugestão: um alimento ainda não provado. Alergénios ficam de fora, porque essa decisão é dos pais.
    const triedSet = new Set(state.log.map(e => e.food));
    const untried = F.foods.filter(x => !triedSet.has(x.id) && !x.allergen && !(x.min12 && (age === null || age < 12)));
    const dayNum = Math.floor(parse(today).getTime() / 864e5);
    const suggestion = day === today && untried.length ? untried[dayNum % untried.length] : null;
    const pool = hasRecipes() && day === today ? eligible() : [];
    const daily = pool.length ? pool[dayNum % pool.length] : null;

    const planned = hasRecipes() ? planFor(day) : [];
    return [
      babySwitch(),
      el('div', { class: 'hello' },
        el('p', { class: 'muted' }, state.baby.name && age !== null ? t().ageLine(state.baby.name, t().ageMonths(age))
          : state.baby.name || (age !== null ? t().ageMonths(age) : t().setupHint)),
        el('h1', {}, day === today ? t().today : long(day))),
      el('div', { class: 'week' },
        el('button', { class: 'wnav', 'aria-label': t().prevWeek, onclick: () => shiftWeek(-1) }, '‹'),
        week.map(d => el('button', { class: 'wday' + (logged.has(d) ? ' has' : ''), 'aria-pressed': String(d === day), disabled: d > today,
          'aria-label': long(d), onclick: () => go(d) }, el('span', {}, narrow.format(parse(d))), el('b', {}, String(parse(d).getDate())))),
        el('button', { class: 'wnav', 'aria-label': t().nextWeek, disabled: week[6] >= today, onclick: () => shiftWeek(1) }, '›')),
      pending.map(e => el('div', { class: 'card watch' },
        el('p', { class: 'eyebrow' }, t().checkEyebrow),
        el('h2', {}, t().checkTitle(fname(F.byId.get(e.food)))),
        el('p', { class: 'muted' }, long(e.date)),
        el('div', { class: 'btnrow' },
          el('button', { class: 'ghost', onclick: () => answer(e, false) }, t().checkNone),
          el('button', { class: 'danger', onclick: () => answer(e, true) }, t().checkYes)))),
      el('div', { class: 'card' },
        entries.length ? entries.map(e => entryRow(e, false)) : el('p', { class: 'muted' }, t().emptyDay),
        el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openPicker(day) }, t().addFood))),
      suggestion && el('div', { class: 'card suggest' },
        el('div', {}, el('p', { class: 'eyebrow' }, t().suggestTitle), el('h2', {}, fname(suggestion))),
        el('button', { class: 'primary', onclick: () => openLogForm(suggestion, day) }, t().logShort)),
      planned.length ? el('div', { class: 'card' }, el('h2', {}, t().planDay), el('div', { class: 'rlist' }, planned.map(recipeRow))) : null,
      daily && !planned.length && el('button', { class: 'card daily', onclick: () => openRecipe(daily) },
        recipeArt(daily, 'thumb'),
        el('span', { class: 'rtxt' }, el('span', { class: 'eyebrow' }, t().recipeOfDay), el('span', { class: 'rname' }, rx(daily).t),
          el('span', { class: 'muted' }, recipeMeta(daily)), daily.kcal && el('span', { class: 'kcal' }, kcalLine(daily)))),
      el('div', { class: 'card tip' }, el('p', {}, tip)),
      partner && el('div', { class: 'card partner' }, el('p', {}, partner.text[state.lang]), el('a', { href: partner.url, rel: 'noopener' }, partner.name))
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
          open && el('div', { class: 'pills' }, items.map(x => foodCard(x, () => openFoodDetail(x)))),
          open && items.some(x => x.allergen) && el('p', { class: 'legend' }, el('i', {}), t().allergenBadge));
      }).filter(Boolean);
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
      })), el('p', { class: 'fine', style: 'margin-top:12px' }, t().allergenKeep)),
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
        el('div', { class: 'btnrow' },
          state.babies.length < 6 && el('button', { class: 'ghost withtag', onclick: premium(openAddBaby) }, t().addBaby, ptag()),
          state.babies.length > 1 && el('button', { class: 'danger', onclick: openRemoveBaby }, t().removeBaby))),
      el('div', { class: 'card' }, el('h2', {}, t().data), el('p', { class: 'muted' }, t().dataNote),
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
            el('button', { class: 'danger', onclick: () => { state = clean({ lang: state.lang, onboarded: true }); save(); closeSheet(); render(); } }, t().clearData))
        ) }, t().clearData))),
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

  const viewWelcome = () => {
    const start = el('button', { class: 'primary', disabled: true, onclick: () => { state.onboarded = true; save(); render(); window.scrollTo(0, 0); } }, t().obStart);
    return [el('div', { class: 'welcome', style: 'display:flex;flex-direction:column' },
      el('h1', {}, t().obTitle),
      el('p', { class: 'lead' }, t().obLead),
      el('ul', { class: 'points' }, t().obPoints.map(x => el('li', {}, icon('check', 16), el('span', {}, x)))),
      el('div', { class: 'card' },
        el('label', { class: 'field' }, t().babyName, el('input', { type: 'text', maxLength: 40, value: state.baby.name, autocomplete: 'off',
          oninput: e => { state.baby.name = e.target.value.trim(); save(); } })),
        el('label', { class: 'field' }, t().birthDate, el('input', { type: 'date', value: state.baby.birth, max: todayIso(),
          onchange: e => { state.baby.birth = e.target.value; save(); } })),
        el('label', { class: 'check' }, el('input', { type: 'checkbox', onchange: e => { start.disabled = !e.target.checked; } }), t().obAccept)),
      start,
      el('p', { class: 'fine' }, t().obPrivacy))];
  };

  // ---------- shell ----------
  let shown = '';
  const ALL_TABS = [['today', 'tabToday', viewToday], ['foods', 'tabFoods', viewFoods], ['recipes', 'tabRecipes', viewRecipes], ['progress', 'tabProgress', viewProgress], ['settings', 'tabSettings', viewSettings]];
  let TABS = ALL_TABS;
  const render = () => {
    const welcome = !state.onboarded;
    TABS = ALL_TABS.filter(x => x[0] !== 'recipes' || hasRecipes());
    if (tab === 'recipes' && !hasRecipes()) tab = 'today';
    document.documentElement.lang = state.lang;
    document.title = welcome || tab === 'today' ? CFG.brand.name : `${t()[tab === 'report' ? 'reportOpen' : TABS.find(x => x[0] === tab)[1]]} · ${CFG.brand.name}`;
    $('langQuick').replaceWith(Object.assign(langSelect(), { id: 'langQuick' }));
    document.body.classList.toggle('bare', welcome);
    $('tabs').hidden = welcome;
    const current = tab === 'report' ? 'progress' : tab;
    $('tabs').replaceChildren(...TABS.map(([id, key]) => el('button', { 'aria-current': current === id ? 'page' : null,
      onclick: () => { tab = id; render(); window.scrollTo(0, 0); } }, icon(id), t()[key])));
    const view = welcome ? viewWelcome : tab === 'report' ? viewReport : TABS.find(x => x[0] === tab)[2];
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
