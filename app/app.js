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
  const clean = raw => {
    const s = raw && typeof raw === 'object' ? raw : {};
    return {
      lang: CFG.languages.includes(s.lang) ? s.lang : detectLang(),
      onboarded: !!s.onboarded,
      baby: { name: String(s.baby?.name || '').slice(0, 40), birth: /^\d{4}-\d{2}-\d{2}$/.test(s.baby?.birth) ? s.baby.birth : '' },
      log: (Array.isArray(s.log) ? s.log : []).filter(e => e && F.byId.has(e.food) && /^\d{4}-\d{2}-\d{2}$/.test(e.date)).map(e => ({
        id: String(e.id || Math.random().toString(36).slice(2)), food: e.food, date: e.date,
        like: [1, 0, -1].includes(e.like) ? e.like : null, reaction: !!e.reaction, checked: !!e.checked, note: String(e.note || '').slice(0, 300)
      }))
    };
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY))); } catch { return clean(null); } };
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } };

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayIso = () => iso(new Date());
  let tab = 'today', day = todayIso(), query = '', cat = 'all', rquery = '', rstage = null;
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

  const openFoodDetail = food => {
    const hist = state.log.filter(e => e.food === food.id).sort((a, b) => b.date.localeCompare(a.date));
    const withFood = hasRecipes() ? R.list.filter(r => r.foods.includes(food.id)) : [];
    openSheet(
      sheetHead('', fname(food)),
      el('p', { class: 'muted' }, `${t().cat[food.cat]} · ${hist.length ? t().triedTimes(hist.length) : t().notTried}`),
      foodInfo(food),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openLogForm(food, todayIso()) }, t().logThis)),
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

  // ---------- receitas ----------
  const recipeMeta = r => [t().stage(r.min), rx(r).tempo, rx(r).por].join(' · ');
  const openRecipe = r => openSheet(
    sheetHead('', rx(r).t),
    el('p', { class: 'muted' }, recipeMeta(r)),
    el('h3', { class: 'sub' }, t().ingredients), el('ul', { class: 'ing' }, rx(r).ing.map(x => el('li', {}, x))),
    el('h3', { class: 'sub' }, t().howTo), el('ol', { class: 'steps' }, rx(r).passos.map(x => el('li', {}, x))),
    r.foods.length ? [el('h3', { class: 'sub' }, t().recipeFoods), el('p', { class: 'fine' }, t().recipeFoodsHint),
      el('div', { class: 'pills' }, r.foods.map(id => F.byId.get(id)).map(x => foodCard(x, () => openLogForm(x, todayIso()))))] : null,
    el('p', { class: 'fine', style: 'margin-top:16px' }, t().recipeNote));
  const recipeRow = r => el('button', { class: 'recipe', onclick: () => openRecipe(r) },
    el('span', { class: 'rname' }, rx(r).t), el('span', { class: 'muted' }, recipeMeta(r)));
  // Fase do bebé: a maior fase que já atingiu (6+ por omissão).
  const babyStage = () => { const a = ageMonths(); return a === null ? null : ([...R.stages].reverse().find(m => a >= m) || R.stages[0]); };

  const viewRecipes = () => {
    if (rstage === null) rstage = babyStage() || 0;
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
      el('div', { class: 'hello' }, el('h1', {}, t().tabRecipes)),
      el('input', { class: 'search', type: 'search', value: rquery, placeholder: t().searchRecipes, 'aria-label': t().searchRecipes, oninput: e => { rquery = e.target.value; fill(); } }),
      chips, box,
      R.lang === state.lang && el('div', { class: 'card book' }, el('h2', {}, t().bookTitle), el('p', {}, t().bookText),
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
    const pool = hasRecipes() && day === today ? R.list.filter(r => r.min <= Math.max(age === null ? 6 : age, 6)) : [];
    const daily = pool.length ? pool[dayNum % pool.length] : null;

    return [
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
      daily && el('button', { class: 'card daily', onclick: () => openRecipe(daily) },
        el('span', { class: 'eyebrow' }, t().recipeOfDay), el('span', { class: 'rname' }, rx(daily).t), el('span', { class: 'muted' }, recipeMeta(daily))),
      el('div', { class: 'card tip' }, el('p', {}, tip)),
      partner && el('div', { class: 'card partner' }, el('p', {}, partner.text[state.lang]), el('a', { href: partner.url, rel: 'noopener' }, partner.name))
    ];
  };

  const viewFoods = () => {
    const grid = el('div', {});
    const fill = () => {
      const match = x => fname(x).toLowerCase().includes(query.toLowerCase());
      const groups = F.categories.filter(c => cat === 'all' || c === cat).map(c => {
        const all = F.foods.filter(x => x.cat === c), items = all.filter(match);
        return items.length ? el('section', { class: 'group' },
          el('div', { class: 'grouphead' }, el('h2', {}, t().cat[c]), el('span', {}, `${all.filter(x => countFor(x.id)).length} / ${all.length}`)),
          el('div', { class: 'pills' }, items.map(x => foodCard(x, () => openFoodDetail(x))))) : null;
      }).filter(Boolean);
      grid.replaceChildren(...(groups.length ? groups : [el('p', { class: 'muted' }, t().noResults)]));
    };
    const chips = el('div', { class: 'chips' }, ['all', ...F.categories].map(c =>
      el('button', { class: 'chip', 'aria-pressed': String(cat === c), onclick: () => {
        cat = c; [...chips.children].forEach((b, i) => b.setAttribute('aria-pressed', String(['all', ...F.categories][i] === c))); fill();
      } }, c === 'all' ? t().all : t().cat[c])));
    fill();
    return [
      el('input', { class: 'search', type: 'search', value: query, placeholder: t().search, 'aria-label': t().search, oninput: e => { query = e.target.value; fill(); } }),
      chips, el('p', { class: 'legend' }, el('i', {}), t().allergenBadge), grid
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
      el('button', { class: 'ghost', onclick: () => { tab = 'report'; render(); window.scrollTo(0, 0); } }, t().reportOpen),
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
        if (!raw || !Array.isArray(raw.log)) throw new Error('bad');
        state = clean(raw); save(); render(); toast(t().importOk);
      } catch { toast(t().importFail); }
    } });
    return [
      el('div', { class: 'card' },
        el('label', { class: 'field' }, t().language, langSelect()),
        el('label', { class: 'field' }, t().babyName, el('input', { type: 'text', maxLength: 40, value: state.baby.name, autocomplete: 'off',
          onchange: e => { state.baby.name = e.target.value.trim(); save(); } })),
        el('label', { class: 'field' }, t().birthDate, el('input', { type: 'date', value: state.baby.birth, max: todayIso(),
          onchange: e => { state.baby.birth = e.target.value; save(); } }))),
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
