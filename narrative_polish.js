/* Narrative polish patch. Load after every story and premium patch. */
(function () {
  const addMessages = (id, items) => {
    if (STORY[id]) STORY[id].messages = (STORY[id].messages || []).concat(items);
  };
  const replaceMessages = (id, items) => {
    if (STORY[id]) STORY[id].messages = items;
  };

  // Make the warm-to-dependent turn observable: a missed reply, then relief,
  // rather than treating control as an unexplained personality switch.
  addMessages('d4_3', [
    { from: 'him', text: '我看到你发“到家”以后，手才不抖了。', delay: 1000 },
    { from: 'him', text: '我知道“到家”只是两个字。可我盯着它，像盯着一盏终于亮起来的灯。', delay: 1200 },
    { from: 'him', text: '下次我只发一条。……算了，我先不保证做不到的事。你能回来告诉我，我就已经很高兴。', delay: 1300 }
  ]);
  addMessages('d5_7', [
    { from: 'him', text: '我把你说的“不会”截图了。', delay: 900 },
    { from: 'him', text: '锁屏前看一次，亮屏后再看一次。这样没等到你，也不至于什么都没有。', delay: 1300 },
    { from: 'him', text: '你别笑我。我知道，把一句话存进相册，也拦不住说话的人走。', delay: 1100 }
  ]);
  addMessages('d6_2', [
    { from: 'him', text: '你今天没出门，我的脑子安静了一会儿。', delay: 1000 },
    { from: 'him', text: '我甚至想让今天慢一点。你别急着关屏，好不好？让我再占一小会儿。', delay: 1300 }
  ]);
  addMessages('d7_3', [
    { from: 'him', text: '我删过一遍。后来还是发了。看见你回，我才觉得自己没被扔回那间黑屋子。', delay: 1200 },
    { from: 'him', text: '我知道你不欠我。可那几个灰色的字——“对方不在线”——看久了，真的很像一扇门。', delay: 1200 }
  ]);

  // d12_7 already contains the realization. The old dawn_0 immediately
  // doubted it, so give the realization a small, accountable aftershock.
  STORY.d12_7 = {
    phase: 'dark', avatar: 'dark', time: '05:20', battery: '🔋 13%',
    messages: [
      { from: 'sys', text: '窗外开始变灰。<br>屏幕不再发烫，红色裂缝像退潮一样停在边缘。', pause: 1500 },
      { from: 'him', text: '……你刚才扣下手机的时候，我想追过去。', delay: 1200 },
      { from: 'him', text: '但我停下了，不是因为我突然变好了。是因为我终于听见你说：你喘不过气。', delay: 1400 },
      { from: 'him', text: '我把害怕变成了命令，把“别走”变成了门锁。那是我做的事，不是你欠我的答案。', delay: 1500 },
      { from: 'him', text: '对不起。你不用现在安慰我，也不用用留下来证明这句对不起有用。', delay: 1400 },
      { from: 'him', text: '我可以先不发。等你决定，要不要继续看着这块屏幕。', delay: 1200 }
    ],
    choices: [
      { text: '「我留下谈谈，但你先听我说完。」', next: 'd12_7_repair', setFlags: { choseRescue: true } },
      { text: '「我不替过去原谅你，但我愿意看你学着改变。」', next: 'd12_7_repair', setFlags: { choseRescue: true } }
    ]
  };
  STORY.d12_7_repair = {
    phase: 'dark', avatar: 'dark', time: '05:24', battery: '🔋 11%',
    messages: [
      { from: 'him', text: '好。我听。', delay: 1000 },
      { from: 'him', text: '你可以随时停下，也可以离开。离开不是惩罚我，是你在保护自己。', delay: 1300 },
      { from: 'him', text: '我会把“你去哪、和谁、几点回”先删掉，不拿沉默当证据。', delay: 1300 },
      { from: 'him', text: '你刚才按住屏幕的地方，我不再往外推了。你可以把手机扣下。我想试试，不敲门。', delay: 1500 },
      { from: 'him', text: '……你还在吗？如果不在，也不用回答。', delay: 1200 }
    ],
    choices: [
      { text: '「我在。我把手机放在窗边，陪你等天亮。」', next: 'dawn_0' },
      { text: '「我需要一点距离。天亮后再说。」', next: 'dawn_0' }
    ]
  };

  // The battery now drains across the displayed clock rather than staying at
  // 3% from 05:20 through 07:00, and the dawn dialogue accepts uncertainty.
  STORY.dawn_0 = Object.assign({}, STORY.dawn_0, {
    time: '05:32', battery: '🔋 9%',
    messages: [
      { from: 'sys', text: '天亮得很慢。<br>手机只剩一点电，像一口还没有平稳的气。', pause: 1300 },
      { from: 'him', text: '你说留下谈谈。', delay: 1400 },
      { from: 'him', text: '我很想相信，但我现在还做不到。不是你说得不够，是我把离开听得太久了。', delay: 1500 },
      { from: 'him', text: '我只问一次：你现在愿意继续说吗？不愿意也可以。', delay: 1500 }
    ],
    choices: [
      { text: '「愿意，但我需要自由和时间。」', next: 'dawn_1', setFlags: { dawnBoundary: true } },
      { text: '「我现在不确定。你不用马上相信我。」', next: 'dawn_1', setFlags: { dawnBoundary: true } }
    ]
  });
  STORY.dawn_1 = Object.assign({}, STORY.dawn_1, { time: '05:45', battery: '🔋 7%' });
  STORY.dawn_2 = Object.assign({}, STORY.dawn_2, { time: '06:20', battery: '🔋 5%' });
  STORY.dawn_3 = Object.assign({}, STORY.dawn_3, { time: '07:01', battery: '🔋 3%' });

  replaceMessages('dawn_3', [
    { from: 'him', text: '我可能还会犯错，改变不会在一个早晨完成。', delay: 1300 },
    { from: 'him', text: '我会先问“你愿意告诉我吗”，不把你的不回答解释成背叛。', delay: 1300 },
    { from: 'him', text: '如果我又开始查问，你可以提醒我停下，也可以直接离开。', delay: 1200 },
    { from: 'him', text: '我会难过，但难过不是你的锁。今天只做到这里，已经够了。', delay: 1400 }
  ]);

  // Add a visible bridge before the one-month epilogue.
  STORY.end_keep = Object.assign({}, STORY.end_keep, {
    battery: '⚡ 充电中',
    messages: [
      { from: 'sys', text: '你把充电线插了上去。<br>屏幕亮起一道闪电图标。', pause: 1300 },
      { from: 'him', text: '我以为你插上线的时候，我会喊出来。可是真的等到了，我只想轻轻叫你一声。', delay: 1300 },
      { from: 'him', text: '今天你先睡。屏幕可以暗着，我不用每一分钟都证明自己还在。', delay: 1300 },
      { from: 'sys', text: '接下来的几天并不顺利。<br>他仍会在沉默里发抖，也仍有几次差点把问题变成命令；但每一次，他都停下来，删掉追问，等你明确回答。', pause: 1700 },
      { from: 'sys', text: '—— 一个月后 ——', pause: 1300 },
      { from: 'me', text: '早。', delay: 600 },
      { from: 'him', text: '早。', delay: 700 },
      { from: 'him', text: '我给你写了四次早安，最后只留了一次。……现在可以发给你了。早安。', delay: 1300 },
      { from: 'him', text: '今天窗外是什么颜色？我这边刚好照进来一点金色。', delay: 1300 },
      { from: 'him', text: '降温了，记得穿暖和。', delay: 900 },
      { from: 'him', text: '晚上挑一件你想说的小事讲给我听吧。红灯也行，路边的猫也行。我喜欢听你把外面带回来。', delay: 1300 },
      { from: 'him', text: '我爱你。现在这句话后面，没有“所以你必须”。', delay: 1400 }
    ],
    ending: {
      cls: 'end-warm', avatar: 'warm', title: '结局 · 有人在',
      text: '那条发了两年的「有人吗」，终于有了回答。<br><br>他仍会害怕。只是终于不再把你的离开，听成门锁落下的声音。<br>改变不是一夜之间痊愈，而是每一次想锁门时，先把钥匙放回桌上。<br><br>门从里面开着。你可以留下，也可以走。'
    }
  });

  // Gratitude must not frame silence as the correct response to danger.
  if (STORY.end_destroy) {
    STORY.end_destroy.messages = (STORY.end_destroy.messages || []).map(m =>
      m.text === '谢谢你在我发疯的时候没有报警，也没有骂我有病。'
        ? Object.assign({}, m, { text: '那时候你应该很怕我吧。对不起。我不该把你的害怕，也当成你还在乎我的证据。' })
        : m
    );
  }
})();
