// Porta de acesso da fase de teste (12/11): a app só abre com o código dado às mães de teste.
// Não é segurança a sério (o código corre no telemóvel de quem abre); serve para o público em geral não entrar.
// Para desligar: ENABLED = false. Para mudar o código: trocar HASH pelo SHA-256 do código novo, em minúsculas.
(function () {
  var ENABLED = true;
  var HASH = '34c04cfc6507eabdb68dfd5777fb900b2093ac7050cf901fba1ecf015ef8488b';
  var KEY = 'pn-gate-ok';
  if (!ENABLED) return;
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) { /* sem armazenamento: pede sempre o código */ }

  var T = {
    pt: { t: 'Versão de teste', p: 'A app está em teste com um grupo pequeno de mães. Escreve o código de acesso que recebeste.', l: 'Código de acesso', b: 'Entrar', e: 'Código errado. Confirma e tenta outra vez.', f: 'Queres testar? Fala connosco no Instagram, em @petitnuvem_store.' },
    en: { t: 'Test version', p: 'The app is being tested with a small group of mums. Enter the access code you received.', l: 'Access code', b: 'Enter', e: 'Wrong code. Check it and try again.', f: 'Want to test it? Message us on Instagram at @petitnuvem_store.' },
    es: { t: 'Versión de prueba', p: 'La app está en pruebas con un grupo pequeño de madres. Escribe el código de acceso que recibiste.', l: 'Código de acceso', b: 'Entrar', e: 'Código incorrecto. Compruébalo e inténtalo de nuevo.', f: '¿Quieres probarla? Escríbenos en Instagram, en @petitnuvem_store.' },
    fr: { t: 'Version de test', p: 'L’app est en test avec un petit groupe de mamans. Saisissez le code d’accès que vous avez reçu.', l: 'Code d’accès', b: 'Entrer', e: 'Code incorrect. Vérifiez et réessayez.', f: 'Envie de tester ? Écrivez-nous sur Instagram, @petitnuvem_store.' }
  };
  var lang = ((navigator.language || 'pt').slice(0, 2)).toLowerCase();
  var t = T[lang] || T.pt;

  document.documentElement.classList.add('pn-locked');
  var css = document.createElement('style');
  css.textContent =
    'html.pn-locked body>*:not(#pnGate){display:none!important}' +
    '#pnGate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;background:#faf6f2;color:#4a3b33;font-family:"DM Sans",system-ui,sans-serif}' +
    '#pnGate form{width:100%;max-width:360px;display:flex;flex-direction:column;gap:14px;text-align:center}' +
    '#pnGate img{width:96px;height:96px;margin:0 auto;border-radius:22px}' +
    '#pnGate h1{margin:0;font:800 26px/1.2 Manrope,system-ui,sans-serif}' +
    '#pnGate p{margin:0;font-size:16px;line-height:1.5;color:#6b5a50}' +
    '#pnGate label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}' +
    '#pnGate input{width:100%;box-sizing:border-box;padding:14px 16px;border:1px solid #d9cabd;border-radius:14px;background:#fff;font:inherit;font-size:17px;text-align:center;color:#4a3b33}' +
    '#pnGate input:focus-visible,#pnGate button:focus-visible{outline:2px solid #6b5246;outline-offset:2px}' +
    '#pnGate button{min-height:48px;border:0;border-radius:999px;background:#6b5246;color:#fff;font:inherit;font-weight:700;font-size:16px;cursor:pointer}' +
    '#pnGate .err{color:#a23b2a;font-size:14px;min-height:20px}' +
    '#pnGate .fine{font-size:13px;color:#8f7d71}';
  document.head.appendChild(css);

  var sha = function (s) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  };
  var build = function () {
    var box = document.createElement('div'); box.id = 'pnGate';
    var form = document.createElement('form'); form.noValidate = true;
    var img = document.createElement('img'); img.src = 'icon-192.png'; img.alt = ''; img.width = 96; img.height = 96;
    var h = document.createElement('h1'); h.textContent = t.t;
    var p = document.createElement('p'); p.textContent = t.p;
    var lab = document.createElement('label'); lab.htmlFor = 'pnGateCode'; lab.textContent = t.l;
    var inp = document.createElement('input'); inp.id = 'pnGateCode'; inp.type = 'text'; inp.placeholder = t.l;
    inp.autocomplete = 'off'; inp.autocapitalize = 'none'; inp.spellcheck = false;
    var btn = document.createElement('button'); btn.type = 'submit'; btn.textContent = t.b;
    var err = document.createElement('p'); err.className = 'err'; err.setAttribute('role', 'alert');
    var fine = document.createElement('p'); fine.className = 'fine'; fine.textContent = t.f;
    form.append(img, h, p, lab, inp, btn, err, fine); box.appendChild(form); document.body.appendChild(box);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var v = inp.value.trim().toLowerCase(); if (!v) return;
      if (!(window.crypto && crypto.subtle)) { err.textContent = t.e; return; }
      sha(v).then(function (x) {
        if (x !== HASH) { err.textContent = t.e; inp.select(); return; }
        try { localStorage.setItem(KEY, HASH); } catch (e) { /* entra só nesta visita */ }
        document.documentElement.classList.remove('pn-locked'); box.remove();
      });
    });
    inp.focus();
  };
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
