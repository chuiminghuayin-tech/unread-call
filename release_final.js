/* Final release accessibility controls. Load last. */
(function () {
  'use strict';
  const KEY = 'youremai_settings';
  const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : {matches:false};
  const stored = safeStoredJSON(KEY, {});
  if (typeof SETTINGS === 'undefined') return;
  if (typeof SETTINGS.skipScares !== 'boolean') SETTINGS.skipScares = false;
  if (typeof SETTINGS.reduceFlashes !== 'boolean') SETTINGS.reduceFlashes = !!media.matches;
  if (typeof SETTINGS.reduceMotion !== 'boolean') SETTINGS.reduceMotion = !!media.matches;

  function applyAccess() {
    document.body.classList.toggle('a11y-skip-scares', !!SETTINGS.skipScares);
    document.body.classList.toggle('a11y-no-flash', !!SETTINGS.reduceFlashes);
    document.body.classList.toggle('a11y-reduce-motion', !!SETTINGS.reduceMotion);
    document.documentElement.style.setProperty('--release-motion', SETTINGS.reduceMotion ? '0.01ms' : '1s');
    if (SETTINGS.skipScares) {
      if (window.BreachV22) window.BreachV22.cancel('setting');
      if (window.ScareAudioV22) window.ScareAudioV22.cancel();
      document.querySelectorAll('.jump-scare,.premium-image,.bubble-breach,.bv22-root,.joker-reveal-overlay').forEach(x => x.remove());
    }
    if (SETTINGS.reduceFlashes) document.body.classList.remove('flicker','interface-tear');
    if (!SETTINGS.vibrate && navigator.vibrate) navigator.vibrate(0);
  }

  const baseApply = applySettings;
  applySettings = function () {
    const result = baseApply.apply(this, arguments);
    applyAccess();
    return result;
  };
  saveSettings = function () {
    const persisted = Object.assign({}, SETTINGS);
    ['reduceMotion','reduceFlashes'].forEach(key => {
      if (typeof stored[key] !== 'boolean') delete persisted[key];
    });
    try { localStorage.setItem(KEY, JSON.stringify(persisted)); } catch (_) {}
    applySettings();
  };

  window.setReleaseSetting = function (key, button) {
    SETTINGS[key] = !SETTINGS[key];
    stored[key] = SETTINGS[key];
    if (button) {
      button.classList.toggle('on', !!SETTINGS[key]);
      button.setAttribute('aria-pressed', String(!!SETTINGS[key]));
    }
    saveSettings();
  };

  const baseOpen = openSettings;
  openSettings = function () {
    baseOpen.apply(this, arguments);
    const card = document.getElementById('modalCard');
    const done = card && card.querySelector('.cover-btn');
    if (!card || !done) return;
    const title = card.querySelector('.sub');
    if (title) title.textContent = '声音、画面与惊吓强度都可以随时调整。';
    const row = (key, label, note) => {
      const wrap = document.createElement('div');
      wrap.className = 'setting-row release-setting';
      const line = document.createElement('label');
      const text = document.createElement('span');
      text.innerHTML = label + '<small>' + note + '</small>';
      const toggle = document.createElement('button');
      toggle.type = 'button'; toggle.className = 'toggle' + (SETTINGS[key] ? ' on' : '');
      toggle.setAttribute('aria-label', label); toggle.setAttribute('aria-pressed', String(!!SETTINGS[key]));
      toggle.onclick = () => setReleaseSetting(key, toggle);
      toggle.appendChild(document.createElement('i'));
      line.append(text, toggle); wrap.appendChild(line);
      card.insertBefore(wrap, done);
    };
    row('skipScares', '跳过贴脸演出', '保留剧情，略过突然覆盖全屏的画面与声音');
    row('reduceFlashes', '关闭闪烁', '故障字、频闪和反色效果改为静态显示');
    row('reduceMotion', '减少动态效果', '减弱震屏、漂移、快速缩放和持续抖动');
  };

  const scareTypes = new Set(['jumpscare','screenHand','bubbleHand','bubbleEyes','bubbleTear','breachHand','breachEyes','breachTear','eyeWall','bloodCrack']);
  const flashTypes = new Set(['flicker','interfaceTear','tear']);
  const motionTypes = new Set(['shake']);
  const baseEffect = runEffect;
  runEffect = function (effect) {
    const e = typeof effect === 'string' ? {type:effect} : effect;
    if (e && SETTINGS.skipScares && scareTypes.has(e.type)) return Promise.resolve({skipped:true,type:e.type});
    if (e && SETTINGS.reduceFlashes && flashTypes.has(e.type)) return Promise.resolve({skipped:true,type:e.type});
    if (e && SETTINGS.reduceMotion && motionTypes.has(e.type)) return Promise.resolve({skipped:true,type:e.type});
    return baseEffect.apply(this, arguments);
  };

  if (typeof imageMoment === 'function') {
    const baseImageMoment = imageMoment;
    imageMoment = function (kind) {
      if (SETTINGS.skipScares && (kind === 'screenHand' || kind === 'eyeWall' || kind === 'bloodCrack')) return Promise.resolve({skipped:true,type:kind});
      return baseImageMoment.apply(this, arguments);
    };
  }
  if (typeof jokerReveal === 'function') {
    const baseJokerReveal = jokerReveal;
    jokerReveal = function () {
      return SETTINGS.skipScares ? Promise.resolve({skipped:true,type:'jokerReveal'}) : baseJokerReveal.apply(this, arguments);
    };
  }
  if (typeof jumpScare === 'function') {
    const baseJump = jumpScare;
    jumpScare = function () {
      return SETTINGS.skipScares ? Promise.resolve({skipped:true,type:'jumpscare'}) : baseJump.apply(this, arguments);
    };
  }
  if (window.BreachV22 && typeof window.BreachV22.play === 'function') {
    const api = window.BreachV22;
    window.BreachV22 = Object.freeze({
      play:function () { return SETTINGS.skipScares ? Promise.resolve({skipped:true,type:'BreachV22'}) : api.play.apply(api, arguments); },
      cancel:function () { return api.cancel.apply(api, arguments); },
      status:function () { return api.status.apply(api, arguments); },
      get durationScale() { return api.durationScale; },
      set durationScale(value) { api.durationScale = value; }
    });
  }
  if (typeof window.bubbleBreach === 'function') {
    const baseBubble = window.bubbleBreach;
    window.bubbleBreach = function () {
      return SETTINGS.skipScares ? Promise.resolve({skipped:true,type:'bubbleBreach'}) : baseBubble.apply(this, arguments);
    };
  }
  if (typeof window.bubbleBreachV22 === 'function') {
    const baseBubbleV22 = window.bubbleBreachV22;
    window.bubbleBreachV22 = function () {
      return SETTINGS.skipScares ? Promise.resolve({skipped:true,type:'bubbleBreachV22'}) : baseBubbleV22.apply(this, arguments);
    };
  }
  if (typeof vibrate === 'function') {
    const baseVibrate = vibrate;
    vibrate = function () {
      if (!SETTINGS.vibrate || SETTINGS.reduceMotion) return;
      return baseVibrate.apply(this, arguments);
    };
  }

  if (media.addEventListener) media.addEventListener('change', e => {
    if (!Object.prototype.hasOwnProperty.call(stored, 'reduceMotion')) SETTINGS.reduceMotion = e.matches;
    if (!Object.prototype.hasOwnProperty.call(stored, 'reduceFlashes')) SETTINGS.reduceFlashes = e.matches;
    applyAccess();
  });
  applyAccess();
  // Persist only explicit user choices; system defaults remain dynamic.
  window.ReleaseFinal = Object.freeze({apply:applyAccess,status:()=>({skipScares:!!SETTINGS.skipScares,reduceFlashes:!!SETTINGS.reduceFlashes,reduceMotion:!!SETTINGS.reduceMotion,vibrate:!!SETTINGS.vibrate,systemReducedMotion:!!media.matches})});
})();
