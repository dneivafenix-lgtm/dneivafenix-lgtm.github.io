(() => {
  const CFG = window.DiaryConfig, I18N = window.DiaryI18n, F = window.DiaryFoods;
  const KEY = 'petit-nuvem-diary';
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
      baby: { name: String(s.baby?.name || '').slice(0, 40), birth: /^\d{4}-\d{2}-\d{2}$/.test(s.baby?.birth) ? s.baby.birth : '' },
      log: (Array.isArray(s.log) ? s.log : []).filter(e => e && F.byId.has(e.food) && /^\d{4}-\d{2}-\d{2}$/.test(e.date)).map(e => ({
        id: String(e.id || Math.random().toString(36).slice(2)), food: e.food, date: e.date,
        like: [1, 0, -1].includes(e.like) ? e.like : null, reaction: !!e.reaction, note: String(e.note || '').slice(0, 300)
      }))
    };
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY))); } catch { return clean(null); } };
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ } };

  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayIso = () => iso(new Date());
  let tab = 'today', day = todayIso(), query = '', cat = 'all';

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
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'
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
      sheetHead(food.emoji, fname(food)),
      el('p', { class: 'muted' }, fmtDate(date, { weekday: 'long', day: 'numeric', month: 'long' })),
      foodInfo(food),
      el('h3', { class: 'sub' }, t().howWasIt), likes,
      el('label', { class: 'check' }, reaction, t().suspectReaction),
      el('label', { class: 'field' }, t().note, note),
      el('div', { class: 'btnrow' },
        el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
        el('button', { class: 'primary', onclick: () => {
          state.log.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), food: food.id, date, like, reaction: reaction.checked, note: note.value.trim() });
          save(); closeSheet(); render();
        } }, t().save)));
  };

  const openFoodDetail = food => {
    const hist = state.log.filter(e => e.food === food.id).sort((a, b) => b.date.localeCompare(a.date));
    openSheet(
      sheetHead(food.emoji, fname(food)),
      el('p', { class: 'muted' }, `${t().cat[food.cat]} · ${hist.length ? t().triedTimes(hist.length) : t().notTried}`),
      foodInfo(food),
      el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openLogForm(food, todayIso()) }, t().logThis)),
      hist.length ? [el('h3', { class: 'sub' }, t().history), el('div', { class: 'card' }, hist.map(e => entryRow(e, true)))] : null);
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

  // ---------- views ----------
  const viewToday = () => {
    const entries = state.log.filter(e => e.date === day);
    const shift = n => { const d = parse(day); d.setDate(d.getDate() + n); day = iso(d); render(); };
    const age = ageMonths();
    const tips = t().tips, tip = tips[parse(day).getDate() % tips.length];
    const shop = CFG.shop.enabled && CFG.shop.languages.includes(state.lang);
    return [
      el('div', { class: 'hero' },
        el('p', { class: 'eyebrow' }, t().appName),
        el('div', { class: 'daynav' },
          el('button', { 'aria-label': t().prevDay, onclick: () => shift(-1) }, '‹'),
          el('strong', {}, day === todayIso() ? t().today : fmtDate(day, { weekday: 'short', day: 'numeric', month: 'long' })),
          el('button', { 'aria-label': t().nextDay, disabled: day >= todayIso(), onclick: () => shift(1) }, '›')),
        el('p', { class: 'ageline' }, state.baby.name && age !== null ? t().ageLine(state.baby.name, t().ageMonths(age))
          : state.baby.name || (age !== null ? t().ageMonths(age) : t().setupHint))),
      el('div', { class: 'card' },
        entries.length ? entries.map(e => entryRow(e, false)) : el('p', { class: 'muted' }, t().emptyDay),
        el('div', { class: 'btnrow' }, el('button', { class: 'primary', onclick: () => openPicker(day) }, t().addFood))),
      el('div', { class: 'card tip' }, el('p', {}, tip)),
      shop && el('div', { class: 'card shop' }, el('p', { class: 'eyebrow' }, t().shopEyebrow), el('h2', {}, t().shopTitle),
        el('p', {}, t().shopText), el('a', { href: CFG.shop.url }, t().shopCta))
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

  const viewProgress = () => {
    const tried = new Set(state.log.map(e => e.food));
    const total = F.foods.length;
    const reactions = [...new Set(state.log.filter(e => e.reaction).map(e => e.food))].map(id => F.byId.get(id));
    return [
      el('div', { class: 'card scard' },
        state.baby.name && el('p', { class: 'eyebrow' }, state.baby.name),
        el('div', { class: 'big' }, el('b', {}, String(tried.size)), el('span', {}, `/ ${total} ${t().foodsTried}`)),
        el('div', { class: 'bar', role: 'img', 'aria-label': `${tried.size} / ${total}` }, el('i', { style: `width:${tried.size / total * 100}%` }))),
      el('div', { class: 'card' }, el('h2', {}, t().byCategory), F.categories.map(c => {
        const all = F.foods.filter(x => x.cat === c), done = all.filter(x => tried.has(x.id)).length;
        return [el('div', { class: 'row' }, el('span', {}, t().cat[c]), el('span', { class: 'muted' }, `${done} / ${all.length}`)),
          el('div', { class: 'bar' }, el('i', { style: `width:${done / all.length * 100}%` }))];
      })),
      el('div', { class: 'card' }, el('h2', {}, t().allergensTitle), el('div', { class: 'alist' }, F.allergens.map(a => {
        const done = F.foods.some(x => x.allergen === a && tried.has(x.id));
        return el('div', { class: done ? 'done' : '' }, t().allergenName[a], el('small', {}, done ? t().introduced : t().pending));
      }))),
      el('div', { class: 'card' }, el('h2', {}, t().reactionsTitle),
        reactions.length ? [reactions.map(x => el('button', { class: 'chip', style: 'margin:0 6px 6px 0', onclick: () => openFoodDetail(x) }, fname(x))),
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
            const a = el('a', { href: URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })), download: `diary-${todayIso()}.json` });
            document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
          } }, t().exportData),
          el('button', { class: 'ghost', onclick: () => file.click() }, t().importData), file),
        el('div', { class: 'btnrow' }, el('button', { class: 'danger', onclick: () => openSheet(
          sheetHead('', t().clearData), el('p', { style: 'margin-top:10px' }, t().confirmClear),
          el('div', { class: 'btnrow' },
            el('button', { class: 'ghost', onclick: closeSheet }, t().cancel),
            el('button', { class: 'danger', onclick: () => { state = clean({ lang: state.lang }); save(); closeSheet(); render(); } }, t().clearData))
        ) }, t().clearData))),
      el('p', { class: 'fine' }, t().disclaimer)
    ];
  };

  const langSelect = () => el('select', { 'aria-label': t().language, onchange: e => { state.lang = e.target.value; save(); render(); } },
    CFG.languages.map(l => el('option', { value: l, selected: l === state.lang }, I18N[l].langName)));

  // ---------- shell ----------
  const TABS = [['today', 'tabToday', viewToday], ['foods', 'tabFoods', viewFoods], ['progress', 'tabProgress', viewProgress], ['settings', 'tabSettings', viewSettings]];
  const render = () => {
    document.documentElement.lang = state.lang;
    document.title = `${t().appName} · Petit Nuvem`;
    $('langQuick').replaceWith(Object.assign(langSelect(), { id: 'langQuick' }));
    $('tabs').replaceChildren(...TABS.map(([id, key]) => el('button', { 'aria-current': tab === id ? 'page' : null,
      onclick: () => { tab = id; render(); window.scrollTo(0, 0); } }, icon(id), t()[key])));
    $('view').replaceChildren(...TABS.find(x => x[0] === tab)[2]().flat(Infinity).filter(Boolean));
  };
  render();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
