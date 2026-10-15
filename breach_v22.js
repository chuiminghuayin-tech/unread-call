/* Breach V22: staged local reveals from V21 PNGs; no canvas or message mutation. */
(function () {
  'use strict';
  if (window.BreachV22) window.BreachV22.cancel('reinstall');
  if (window.BreachV21 && typeof window.BreachV21.cancel === 'function') window.BreachV21.cancel('replaced-by-v22');
  const sources = {hand: 'assets/breach_hand_v21.webp', eyes: 'assets/breach_eyes_v21.webp', tear: 'assets/breach_tear_v21.webp'};
  const aliases = {screenHand: 'hand', bubbleHand: 'hand', bubbleEyes: 'eyes', bubbleTear: 'tear', breachHand: 'hand', breachEyes: 'eyes', breachTear: 'tear'};
  const lengths = {hand: 8400, eyes: 5700, tear: 5600};
  let active = null, last = {state: 'idle', kind: null, reason: null};
  const nodeId = () => typeof STATE !== 'undefined' ? STATE.nodeId : null;
  const make = (cls, parent) => { const e = document.createElement('div'); e.className = cls; parent.appendChild(e); return e; };
  function art(kind, parent) {
    const image = document.createElement('img'); image.className = 'bv22-art';
    image.src = sources[kind]; image.alt = ''; image.draggable = false;
    parent.appendChild(image); return image;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function finish(s, reason) {
    if (!s || s.done) return;
    s.done = true; cancelAnimationFrame(s.raf);
    if (s.observer) s.observer.disconnect();
    s.animations.forEach(a => { try { a.cancel(); } catch (_) {} });
    s.disposers.forEach(f => { try { f(); } catch (_) {} });
    s.images.forEach(i => { i.onload = i.onerror = null; });
    if (s.soundCancel && typeof window.audioBurst === 'function' && window.audioBurst.cancel === s.soundCancel) s.soundCancel();
    if (s.root) s.root.remove();
    if (active === s) active = null;
    last = {state: 'idle', kind: s.kind, reason};
    s.resolve({kind: s.kind, reason, completed: reason === 'complete'});
  }
  function cancel(reason) { finish(active, reason || 'cancelled'); }
  function invalid(s) {
    if (document.hidden) return 'hidden';
    if (nodeId() !== s.node) return 'node-change';
    if (!s.bubble.isConnected || !s.messages.isConnected) return 'origin-removed';
    const game = document.getElementById('game');
    if (game && (game.hidden || game.classList.contains('hidden'))) return 'game-hidden';
    if (s.root && !s.root.isConnected) return 'overlay-removed';
    return null;
  }
  // All WAAPI animations stay paused. Exactly one owned RAF advances their time.
  function animate(s, element, frames, start, end) {
    if (!element.animate) throw new Error('Web Animations API unavailable');
    const a = element.animate(frames, {duration: (end - start) * s.scale, delay: start * s.scale, fill: 'forwards', easing: 'linear'});
    a.pause(); a.currentTime = 0; s.animations.push(a); return a;
  }
  function sound(s, kind) {
    if (document.hidden) return;
    try {
      if (typeof window.audioBurst === 'function') {
        window.audioBurst(kind);
        s.soundCancel = window.audioBurst.cancel;
      }
    } catch (_) {}
  }
  function glass(s) {
    try {
      if (typeof SETTINGS === 'undefined' || !SETTINGS.sound || SETTINGS.volume <= 0 || typeof audioCtx === 'undefined' || !audioCtx || audioCtx.state !== 'running' || typeof sfxGain === 'undefined') return;
      const ctx = audioCtx, t = ctx.currentTime, nodes = [];
      [2260, 3341, 4799].forEach((hz, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain(); nodes.push(o, g);
        o.type = 'sine'; o.frequency.value = hz;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.018 / (i + 1), t + .004);
        g.gain.exponentialRampToValueAtTime(.0001, t + .18 + i * .045);
        o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + .31);
        o.onended = () => { o.disconnect(); g.disconnect(); };
      });
      s.disposers.push(() => nodes.forEach(n => { if (n.stop) { try { n.stop(); } catch (_) {} } n.disconnect(); }));
    } catch (_) {}
  }
  function preload(s, now) {
    if (!s.images.length) {
      [...new Set([s.kind, 'tear'])].forEach(k => {
        const image = new Image(); image._breachKind = k; image.src = sources[k]; s.images.push(image);
      });
      s.loadStart = now;
    }
    const failed = s.images.some(i => i.complete && !i.naturalWidth);
    if (failed) { finish(s, 'asset-unavailable'); return false; }
    if (s.images.every(i => i.complete && i.naturalWidth)) return true;
    if (now - s.loadStart > 2500) finish(s, 'asset-timeout');
    return false;
  }
  function compose(s) {
    const r = s.bubble.getBoundingClientRect(), w = innerWidth, h = innerHeight;
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= h) { finish(s, 'origin-not-visible'); return; }
    s.viewport = [w, h];
    const left = clamp(r.left, 0, w), top = clamp(r.top, 0, h), right = clamp(r.right, 0, w), bottom = clamp(r.bottom, 0, h);
    const bw = right - left, bh = bottom - top, cx = left + bw * .54, cy = top + bh * .53;
    if (bw < 2 || bh < 2) { finish(s, 'origin-not-visible'); return; }
    const root = make('bv22-root', document.body); s.root = root;
    root.setAttribute('aria-hidden', 'true'); root.style.setProperty('--cx', cx + 'px'); root.style.setProperty('--cy', cy + 'px');
    const veil = make('bv22-veil', root), wound = make('bv22-wound', root);
    Object.assign(wound.style, {left: left + 'px', top: top + 'px', width: bw + 'px', height: bh + 'px'});
    art('tear', wound);
    // Thin fissure first, completely clipped to the actual bubble rectangle.
    animate(s, wound, [
      {opacity: 0, clipPath: 'polygon(19% 51%,40% 50%,53% 51%,72% 49%,84% 50%,72% 51%,53% 52%,40% 51%)'},
      {offset: .15, opacity: .9, clipPath: 'polygon(12% 49%,39% 46%,54% 49%,74% 45%,91% 48%,74% 53%,54% 54%,39% 53%)'},
      {offset: .62, opacity: 1, clipPath: 'polygon(5% 34%,33% 22%,56% 29%,79% 18%,97% 39%,81% 71%,55% 83%,24% 73%)'},
      {opacity: 1, clipPath: 'polygon(0% 0%,33% 0%,66% 0%,100% 0%,100% 100%,66% 100%,33% 100%,0% 100%)'}
    ], 0, 2400);
    animate(s, veil, [{opacity: 0}, {offset: .45, opacity: .32}, {opacity: .94}], 400, s.kind === 'hand' ? 5900 : 3900);
    // Droplets are moving crops of the painted tear texture, never solid red geometry.
    for (let i = 0; i < 4; i++) {
      const blood = make('bv22-blood', root), image = art('tear', blood);
      Object.assign(blood.style, {left: (cx + (i - 1.5) * bw * .13) + 'px', top: (cy - 2) + 'px', width: (9 + i % 2 * 7) + 'px', height: Math.min(h * .4, 180 + i * 36) + 'px'});
      image.style.objectPosition = (31 + i * 13) + '% 65%';
      animate(s, blood, [{opacity: 0, transform: 'scaleY(.015)'}, {offset: .22, opacity: .82, transform: 'scaleY(.12)'}, {offset: .8, opacity: .88, transform: 'scaleY(1)'}, {opacity: 0, transform: 'translateY(50px) scaleY(1.18)'}], 800 + i * 130, s.kind === 'hand' ? 5100 : 3700);
      animate(s, image, [{transform: 'translateY(-28%)'}, {transform: 'translateY(0%)'}], 850 + i * 130, 3700);
    }
    const portal = make('bv22-portal bv22-soft', root), hero = art(s.kind, portal);
    const inset = `inset(${top}px ${w - right}px ${h - bottom}px ${left}px round 9px)`;
    const slit = `ellipse(${Math.max(8, bw * .16)}px 2px at ${cx}px ${cy}px)`;
    // The source coordinate maps to the same point on the full artwork as it grows.
    hero.style.transformOrigin = `${cx / w * 100}% ${cy / h * 100}%`;
    const full = 'inset(-2px -2px -2px -2px round 0px)';
    const coverScale = Math.max(w / bw, h / bh) * 1.1;
    const initial = `translate(${cx - w / 2}px,${cy - h / 2}px) scale(${1 / coverScale})`;
    hero.style.transformOrigin = '50% 50%';
    if (s.kind === 'hand') {
      animate(s, portal, [{opacity: 0, clipPath: slit}, {offset: .14, opacity: .82, clipPath: slit}, {offset: .29, opacity: 1, clipPath: inset}, {offset: .48, opacity: 1, clipPath: inset}, {offset: .76, opacity: 1, clipPath: full}, {opacity: 1, clipPath: full}], 1000, 6600);
      // Keep the first beat a finger-sized crop. The full painting only expands after a held pause.
      hero.style.width = '245%'; hero.style.height = '245%'; hero.style.objectFit = 'cover';
      hero.style.objectPosition = '27% 72%';
      animate(s, hero, [
        {transform: `translate(${cx - w * .30}px,${cy - h * .28}px) scale(.26)`, filter: 'brightness(.24) contrast(1.35) saturate(.72)'},
        {offset: .28, transform: `translate(${cx - w * .30}px,${cy - h * .28 + bh * .04}px) scale(.31)`, filter: 'brightness(.42) contrast(1.25) saturate(.82)'},
        {offset: .47, transform: `translate(${cx - w * .30}px,${cy - h * .28}px) scale(.33)`, filter: 'brightness(.58) contrast(1.2) saturate(.9)'},
        {offset: .61, transform: `translate(${cx - w * .30}px,${cy - h * .28}px) scale(.46)`, filter: 'brightness(.78) contrast(1.15)'},
        {offset: .78, transform: 'translate(-2%,2%) scale(.78) rotate(-2deg)', filter: 'brightness(.96) contrast(1.1)'},
        {offset: .91, transform: 'translate(-3%,4%) scale(1.08) rotate(-1deg)', filter: 'brightness(.82) contrast(1.18)'},
        {transform: 'translate(2%,8%) scale(1.42) rotate(1deg)', filter: 'brightness(.4) contrast(1.3)'}
      ], 1000, 7400);
    } else {
      animate(s, portal, [{opacity: 0, clipPath: slit}, {offset: .25, opacity: .9, clipPath: inset}, {offset: .54, opacity: 1, clipPath: inset}, {offset: .87, opacity: 1, clipPath: full}, {opacity: 1, clipPath: full}], 950, 4050);
      animate(s, hero, [{transform: initial, filter: 'brightness(.4)'}, {offset: .4, transform: initial, filter: 'brightness(.8)'}, {offset: .83, transform: 'scale(1.04)', filter: 'brightness(1)'}, {transform: 'scale(1.26)', filter: 'brightness(.62)'}], 950, 4800);
    }
    if (s.kind === 'eyes') {
      // Each aperture samples a different region of the eye painting; no CSS-drawn eyeballs.
      [[.25,.37,.30,.30],[.67,.43,.31,.36],[.45,.67,.36,.33],[.80,.70,.24,.27],[.16,.73,.22,.25]].forEach((p, i) => {
        const eye = make('bv22-eye', root), image = art('eyes', eye);
        const ew = bw * p[2], eh = Math.max(12, bh * p[3]);
        Object.assign(eye.style, {left: (left + bw * p[0] - ew / 2) + 'px', top: (top + bh * p[1] - eh / 2) + 'px', width: ew + 'px', height: eh + 'px'});
        Object.assign(image.style, {width: '330%', height: '300%', left: (-p[0] * 230) + '%', top: (-p[1] * 200) + '%', objectFit: 'cover'});
        animate(s, eye, [{opacity: 0, clipPath: 'inset(49% 0% 49% 0%)', transform: 'scale(.9)'}, {offset: .28, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transform: 'scale(1)'}, {offset: .68, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transform: 'scale(1.06)'}, {opacity: 0, clipPath: 'inset(0% 0% 0% 0%)', transform: 'scale(1.2)'}], 650 + i * 230, 3200 + i * 110);
      });
    }
    if (s.kind === 'tear') {
      // Painted fragments share source registration before moving out into depth.
      for (let i = 0; i < 9; i++) {
        const shard = make('bv22-shard', root), image = art('tear', shard);
        const sw = bw * .43, sh = Math.max(bh, 65), angle = i * 2.399;
        Object.assign(shard.style, {left: (cx - sw / 2) + 'px', top: (cy - sh / 2) + 'px', width: sw + 'px', height: sh + 'px', clipPath: i % 2 ? 'polygon(2% 6%,95% 35%,35% 97%)' : 'polygon(15% 1%,97% 88%,3% 70%)'});
        image.style.width = '240%'; image.style.left = (-i % 3 * 43) + '%'; image.style.objectPosition = (i * 11) + '% 50%';
        const dx = Math.cos(angle) * w * .74, dy = Math.sin(angle) * h * .71;
        animate(s, shard, [{opacity: 0, transform: 'translate(0px,0px) scale(.4) rotate(0deg)'}, {offset: .13, opacity: .95, transform: 'translate(0px,0px) scale(.9) rotate(0deg)'}, {offset: .76, opacity: .92, transform: `translate(${dx * .6}px,${dy * .6}px) scale(1.8) rotate(${i % 2 ? 48 : -58}deg)`}, {opacity: 0, transform: `translate(${dx}px,${dy}px) scale(3) rotate(${i % 2 ? 91 : -106}deg)`}], 1550 + i * 85, 4100 + i * 65);
      }
    }
    const black = make('bv22-black', root), end = lengths[s.kind];
    animate(s, black, [{opacity: 0}, {offset: .4, opacity: 1}, {offset: .67, opacity: 1}, {opacity: 0}], end - 1400, end);
    animate(s, portal, [{opacity: 1}, {opacity: 0}], end - 1050, end - 480);
    animate(s, wound, [{opacity: 1}, {opacity: 0}], end - 1050, end - 480);
    animate(s, veil, [{opacity: .94}, {opacity: 0}], end - 650, end);
    const semanticCue = 'bubble' + s.kind[0].toUpperCase() + s.kind.slice(1);
    s.cues = [
      {at: 130, fire: () => sound(s, semanticCue)},
      {at: 1180, fire: () => glass(s)},
      {at: s.kind === 'hand' ? 2800 : 2400, fire: () => sound(s, semanticCue)},
      {at: end - 2300, fire: () => sound(s, semanticCue)}
    ];
    s.began = null;
    last = {state: 'playing', kind: s.kind, reason: null};
  }
  function frame(s, now) {
    if (s.done) return;
    const reason = invalid(s); if (reason) return finish(s, reason);
    try {
      if (!s.root) {
        if (!preload(s, now)) { if (!s.done) s.raf = requestAnimationFrame(t => frame(s, t)); return; }
        compose(s); if (s.done) return;
      }
      if (innerWidth !== s.viewport[0] || innerHeight !== s.viewport[1]) return finish(s, 'viewport-change');
      // Once placed, scrolling/reflow cannot leave a disembodied fissure on the screen.
      const rect = s.bubble.getBoundingClientRect();
      if (!s.anchor) s.anchor = rect;
      else if (Math.abs(rect.left - s.anchor.left) + Math.abs(rect.top - s.anchor.top) + Math.abs(rect.width - s.anchor.width) + Math.abs(rect.height - s.anchor.height) > 3) return finish(s, 'origin-moved');
      if (s.began === null) s.began = now;
      if (s.previousFrame != null && now - s.previousFrame > 650) return finish(s, 'frame-gap');
      s.previousFrame = now;
      const elapsed = now - s.began, time = elapsed / s.scale;
      s.animations.forEach(a => { a.currentTime = elapsed; });
      s.cues.forEach(c => { if (!c.done && time >= c.at) { c.done = true; c.fire(); } });
      if (time >= lengths[s.kind]) return finish(s, 'complete');
      s.raf = requestAnimationFrame(t => frame(s, t));
    } catch (error) { finish(s, 'composition-error'); if (window.console) console.warn('[BreachV22]', error); }
  }
  function play(kind = 'hand', options = {}) {
    kind = aliases[kind] || kind;
    cancel('superseded');
    if (!sources[kind]) return Promise.resolve({completed: false, reason: 'unknown-kind', kind});
    if (document.hidden) return Promise.resolve({completed: false, reason: 'hidden', kind});
    const messages = document.getElementById('messages');
    const bubbles = messages ? Array.from(messages.querySelectorAll('.other .message-bubble')) : [];
    const bubble = options.bubble || bubbles[bubbles.length - 1];
    if (!bubble || !bubble.isConnected) return Promise.resolve({completed: false, reason: 'no-origin', kind});
    const value = Number(options.durationScale == null ? api.durationScale : options.durationScale);
    const scale = Number.isFinite(value) && value > 0 ? clamp(value, .01, 8) : 1;
    return new Promise(resolve => {
      const s = {kind, bubble, messages, node: nodeId(), scale, resolve, images: [], animations: [], disposers: [], raf: 0, root: null, done: false};
      active = s; last = {state: 'loading', kind, reason: null};
      if (typeof MutationObserver !== 'undefined') {
        s.observer = new MutationObserver(() => { const reason = invalid(s); if (reason) finish(s, reason); });
        s.observer.observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden']});
      }
      s.raf = requestAnimationFrame(t => frame(s, t));
    });
  }
  const api = {play, cancel, durationScale: 1, status: () => ({...last, active: !!active, progress: active && active.began !== null && active.began != null ? clamp((performance.now() - active.began) / (lengths[active.kind] * active.scale), 0, 1) : 0, animations: active ? active.animations.length : 0})};
  window.BreachV22 = api;
  window.bubbleBreachV22 = (kind, options) => play(kind, options);
  const previousEffect = window.runEffect;
  window.runEffect = function (effect) {
    const e = typeof effect === 'string' ? {type: effect} : effect;
    if (e && aliases[e.type]) return play(aliases[e.type], e);
    return typeof previousEffect === 'function' ? previousEffect.apply(this, arguments) : Promise.resolve();
  };
  // replay_patch may remove transient nodes without changing the story id.
  ['returnTitle', 'loadData', 'startGame', 'stopAndClear', 'showEnding'].forEach(name => {
    const previous = window[name];
    if (typeof previous !== 'function') return;
    window[name] = function () { cancel(name); return previous.apply(this, arguments); };
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel('hidden'); });
  window.addEventListener('pagehide', () => cancel('pagehide'));
})();
