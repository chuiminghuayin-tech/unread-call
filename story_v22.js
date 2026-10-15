/* V22 late-story patch. Load after romance_v21.js. */
(function () {
  'use strict';

  const S = STORY;
  const him = (text, delay = 1150) => ({ from: 'him', text, delay });
  const sys = (text, pause = 1300) => ({ from: 'sys', text, pause });
  const me = (text, delay = 550) => ({ from: 'me', text, delay });
  const setMessages = (id, messages) => {
    if (S[id]) S[id].messages = messages;
  };
  const setChoice = (id, index, patch) => {
    if (S[id] && S[id].choices && S[id].choices[index]) {
      Object.assign(S[id].choices[index], patch);
    }
  };

  /* Stopping is the first accountable action, not an instant recovery. */
  setMessages('d12_7', [
    sys('你没有再碰手机。过了很久，掌心的烫意才退下去。<br>窗外仍在下雨，屏幕边缘那道红色裂缝不再往外爬。'),
    him('刚才你不回，我又想把聊天框顶到你眼前。'),
    him('我打了“回来”。后来删掉了。'),
    him('这只能说明我停了一次，不代表我已经没事。'),
    him('我说过要锁门，也真的让你动不了。那不是一句对不起就能抹掉的。'),
    him('你刚才想说什么，我现在听。你不用先安慰我。')
  ]);
  setChoice('d12_7', 0, { text: '「先听清楚：我留下说话，不等于答应留下来。」' });
  setChoice('d12_7', 1, { text: '「我可以看你改变，但决定权还在我这里。」' });

  setMessages('d12_7_repair', [
    him('好。我听清楚了。'),
    him('你现在留下，是愿意把话说完。不是许诺以后都不走。'),
    him('你可以关屏，可以隔很久再回，也可以不告诉我去了哪里。'),
    him('我害怕的时候，可以说我害怕。不能拿害怕命令你。'),
    him('……这几句我可能要学很多次。'),
    him('你先决定，还要不要继续聊。')
  ]);
  setChoice('d12_7_repair', 0, { text: '「继续。手机放在窗边，我们慢慢说。」' });
  setChoice('d12_7_repair', 1, { text: '「先停一会儿。等我愿意时再看屏幕。」' });

  Object.assign(S.dawn_0, {
    phase: 'dark', avatar: 'dark', day: 13, time: '05:32', battery: '🔋 8%',
    effects: (S.dawn_0.effects || []).filter(e => (typeof e === 'string' ? e : e.type) !== 'dawnImage')
  });
  setMessages('dawn_0', [
    sys('天亮得很慢。<br>你把手机搁到窗边，退开半步。输入标记亮了一次，又灭了。'),
    him('刚才那一会儿，我还是想问你是不是走了。'),
    him('我把问题写了三遍，都没发。'),
    him('不是在等你夸我。我只是告诉你，我现在做到哪一步。'),
    him('你愿意继续说吗？不愿意也可以。')
  ]);
  setChoice('dawn_0', 0, { text: '「可以。但我什么时候停，由我决定。」' });
  setChoice('dawn_0', 1, { text: '「我还不确定。你先接受这个答案。」' });

  Object.assign(S.dawn_1, { phase: 'dark', avatar: 'dark', day: 13, time: '05:45', battery: '🔋 7%' });
  setMessages('dawn_1', [
    him('好。由你决定。'),
    him('我听见“不确定”时，还是会怕。'),
    him('可怕是我的感觉，不是你的任务。'),
    him('我不会再问你明天还在不在。'),
    him('你累了就把屏幕关掉。等你想说话，再回来。')
  ]);
  setChoice('dawn_1', 0, { text: '「先看窗外。别急着谈明天。」' });
  setChoice('dawn_1', 1, { text: '「记住刚才说的。现在安静一会儿。」' });

  Object.assign(S.dawn_2, {
    phase: 'dark', avatar: 'dark', day: 13, time: '06:08', battery: '🔋 6%',
    effects: (S.dawn_2.effects || []).filter(e => (typeof e === 'string' ? e : e.type) !== 'dawnImage')
  });
  setMessages('dawn_2', [
    sys('雨声渐渐稀了。<br>镜头对着窗玻璃，只照见灰白的天和一道没有继续裂开的红痕。'),
    him('我看见了。天还没亮透。'),
    him('你刚才离开镜头去倒水，我差点问你去哪。'),
    him('后来想到，你不在画面里，也不等于你出了事。'),
    him('我就等了一会儿。'),
    him('……原来什么都不做，也能等到你回来。')
  ]);
  setChoice('dawn_2', 0, { text: '「只是一次。以后还要慢慢练。」' });
  setChoice('dawn_2', 1, { text: '「嗯。先把这一刻记住。」' });

  Object.assign(S.dawn_3, { phase: 'dark', avatar: 'dark', day: 13, time: '06:24', battery: '🔋 5%' });
  setMessages('dawn_3', [
    him('我知道，停下一次不算痊愈。'),
    him('以后我可能还会把问题打出来，也可能又说错话。'),
    him('你不用守着屏幕教我。你可以提醒我，也可以直接关掉。'),
    him('我该学的是自己停下来，不是换一种说法让你留下。')
  ]);
  setChoice('dawn_3', 0, { text: '「那就从不追问这一刻开始。」', next: 'v22_dawn_still' });

  S.v22_dawn_still = {
    day: 13, time: '06:37', battery: '🔋 4%', phase: 'dark', avatar: 'dark',
    effects: [{ type: 'dawnTransition', stage: 1, duration: 3600 }],
    messages: [
      sys('你把手机留在窗边，去洗了把脸。<br>这一次，聊天框没有追到镜子前。'),
      him('刚才我数到一百，又从头数了一遍。'),
      him('还是想叫你回来。'),
      him('但我没有叫。'),
      him('我不是突然好了。我只是第一次让那句话停在我这里。')
    ],
    choices: [
      { text: '「我看见了。先这样待一会儿。」', next: 'v22_dawn_window' },
      { text: '「不用向我证明。继续看窗外。」', next: 'v22_dawn_window' }
    ]
  };

  S.v22_dawn_window = {
    day: 13, time: '06:49', battery: '🔋 4%', phase: 'dark', avatar: 'dark',
    effects: [{ type: 'dawnTransition', stage: 2, duration: 3600 }],
    messages: [
      sys('云层后面透出一线很淡的白。<br>镜头仍朝着窗外。你不在画面里，沈屿也没有叫你的名字。'),
      him('玻璃上有一道光。很窄。'),
      him('雨还没完全停，屋里也没有一下子变暖。'),
      him('可是我能看见窗框了。'),
      him('以前我只盯着你在不在。现在，我想再看一会儿天。')
    ],
    choices: [
      { text: '「看吧。我也在看。」', next: 'v22_dawn_photo' },
      { text: '（把镜头再朝窗边挪一点）', next: 'v22_dawn_photo', silent: true }
    ]
  };

  S.v22_dawn_photo = {
    day: 13, time: '07:03', battery: '🔋 3%', phase: 'dark', avatar: 'dark',
    effects: [{ type: 'dawnTransition', stage: 3, duration: 3600 }],
    messages: [
      sys('雨终于停了。<br>晨光越过湿漉漉的窗沿，落在旧手机上。画面里没有谁被困住，只有雨后的天。'),
      him('我想把窗边这点光拍下来，留在相册里。可以吗？'),
      him('刚才你去倒水，我差点又想问你在哪。'),
      him('但我等了一会儿。你回来了，天也亮了。'),
      him('明天未必会这么顺利。'),
      him('但下次害怕的时候，我可以先想起这扇窗。')
    ],
    choices: [
      { text: '「留着吧。然后我们都去休息。」', next: 'd12_8' },
      { text: '「可以。它只记录今天，不替以后保证。」', next: 'd12_8' }
    ]
  };

  /* Stage 3 stays dark; the next node turns warm and reveals the photo. */
  S.d12_8.phase = 'warm';
  S.d12_8.avatar = 'warm';
  S.d12_8.effects = [{ type: 'dawnImage' }].concat(S.d12_8.effects || []);

  /* The healing CG is deliberately not a CG_MAP entry: the parent visual
     patch displays it from dawnImage after the stage-3 fade reaches its low. */
  Object.keys(CG_MAP).forEach(id => {
    if (CG_MAP[id] === 'cg_dawn_heal' || id === 'dawn_3') delete CG_MAP[id];
  });
  const dawnDef = CG_DEFS.find(item => item.id === 'cg_dawn_heal');
  if (dawnDef) {
    dawnDef.title = '雨霁初晴';
    dawnDef.desc = '威胁停下以后，他们守住边界，等窗外一点点亮起来。';
  }
  setMessages('d12_8', [
    him('手机快没电了。接下来怎么做，还是由你决定。'),
    him('你可以给它充电。我会留下，但我们照刚才说的来。'),
    him('我想说早安，就只留一条。你不回，我也不让聊天框追着你。'),
    him('你出门，不需要向我报备。'),
    him('如果我又把害怕说成命令，你可以关掉我。'),
    him('你也可以砸掉手机。'),
    him('我会试着离开。刚才，我好像又听见小白的爪子声了。'),
    him('我当然想让你选我。'),
    him('可这一次，我不会拿这句话替你做决定。')
  ]);

  // Preserve the established month-later ending and consensual romantic surprise.
  if (S.end_keep) S.end_keep.messages = S.end_keep.messages.map(m =>
    m.text === '先睡吧。晚安。' ? {...m,text:'先歇一会儿吧。我也安静一会儿。'} : m);
})();
