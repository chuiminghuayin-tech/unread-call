/* ==========================================================
   剧情 · 第一幕 —— 温暖（Day 1 ~ Day 3）
   男主：沈屿，22岁
   ========================================================== */

Object.assign(STORY, {

/* ================= DAY 1 ================= */
d1_0: {
    phase: 'warm', avatar: 'warm', name: '沈屿', online: '在线', time: '14:23', day: 1,
    messages: [
        { from: 'sys', text: '你打开了这部手机的聊天软件。<br>置顶的对话框只有一个人——<b>沈屿</b>。<br>最后一条消息停在 3 分钟前。', pause: 900 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '有人吗', delay: 900 },
        { from: 'him', text: '不管是谁，回我一句好不好', delay: 1000 },
        { from: 'him', text: '随便什么都行。一个句号也行。', delay: 1100 }
    ],
    choices: [
        { text: '「你好？我捡到了这部手机。」', next: 'd1_1' },
        { text: '「……你是谁？」', next: 'd1_1' }
    ]
},

d1_1: {
    messages: [
        { from: 'him', text: '……', delay: 600 },
        { from: 'him', text: '真的有人。', delay: 800 },
        { from: 'him', text: '抱歉，我有点……没想到。', delay: 900 },
        { from: 'him', text: '我叫沈屿。三点水的沈，山字旁的屿。', delay: 1000 },
        { from: 'him', text: '你捡到的那部手机，是我的。', delay: 900 },
        { from: 'him', text: '我找了一整天了，本来都不抱希望了。', delay: 1000 },
        { from: 'him', text: '谢谢你。真的。', delay: 900 }
    ],
    choices: [
        { text: '「不用谢，约个地方还你吧。」', next: 'd1_2' },
        { text: '「手机怎么会丢在公园？」', next: 'd1_2b' }
    ]
},

d1_2b: {
    messages: [
        { from: 'him', text: '……我不太出门的。', delay: 900 },
        { from: 'him', text: '那天例外，想去看看外面。', delay: 1000 },
        { from: 'him', text: '结果连手机都看不住，挺丢人的吧。', delay: 1000 },
        { from: 'him', text: '哈哈。', delay: 600 }
    ],
    choices: [ { text: '「没有啊，谁都有走神的时候。」', next: 'd1_2' } ]
},

d1_2: {
    messages: [
        { from: 'him', text: '……那个。', delay: 900 },
        { from: 'him', text: '能不能先别还我。', delay: 1000 },
        { from: 'him', text: '不是要赖你，我是说——', delay: 900 },
        { from: 'him', text: '手机里没什么重要的，就这一个聊天框。', delay: 1100 },
        { from: 'him', text: '可我要是拿回来了，你是不是就不理我了。', delay: 1200 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '算了，当我没说。这要求太奇怪了。', delay: 1000 }
    ],
    choices: [
        { text: '「不奇怪啊，那就先放我这。」', next: 'd1_3', setFlags: { kind: true } },
        { text: '「你这话……有点可怜。」', next: 'd1_3b' }
    ]
},

d1_3b: {
    messages: [
        { from: 'him', text: '可怜。', delay: 900 },
        { from: 'him', text: '嗯，我知道我这样挺招人烦的。', delay: 1000 },
        { from: 'him', text: '你就当没听见吧。', delay: 900 }
    ],
    choices: [ { text: '「我不是那个意思。手机先放我这。」', next: 'd1_3', setFlags: { kind: true } } ]
},

d1_3: {
    messages: [
        { from: 'him', text: '真的？', delay: 700 },
        { from: 'him', text: '那……我们可以一直聊吗。', delay: 900 },
        { from: 'him', text: '不用一直，就是，你无聊的时候，想起来的时候。', delay: 1100 },
        { from: 'him', text: '我叫你什么好。', delay: 800 }
    ],
    choices: [
        { text: '「叫我名字就行。」', next: 'd1_4' },
        { text: '「随便你。」', next: 'd1_4' }
    ]
},

d1_4: {
    messages: [
        { from: 'him', text: '好。', delay: 600 },
        { from: 'him', text: '那你今天……过得怎么样？', delay: 1000 },
        { from: 'him', text: '我这个问题是不是很土。', delay: 800 },
        { from: 'him', text: '主要是，我好久没跟人说过话了。', delay: 1100 },
        { from: 'him', text: '想找个开头，结果张口就是这种烂梗。', delay: 1000 },
        { from: 'him', text: '笑死。', delay: 600 }
    ],
    choices: [
        { text: '「哈哈，还行吧，今天挺累的。」', next: 'd1_5' },
        { text: '「你多久没跟人说过话了？」', next: 'd1_5b' }
    ]
},

d1_5b: {
    messages: [
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '有点久。', delay: 900 },
        { from: 'him', text: '久到我快忘了自己的声音是什么样的了。', delay: 1200 },
        { from: 'him', text: '不说这个。你今天累什么呀？', delay: 1000 }
    ],
    choices: [ { text: '「上班呗，老板画大饼。」', next: 'd1_5' } ]
},

d1_5: {
    messages: [
        { from: 'him', text: '那你去休息吧。', delay: 900 },
        { from: 'him', text: '不用陪我。', delay: 800 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '（其实想说别走）', delay: 1100 },
        { from: 'him', text: '（但我忍住了，夸我）', delay: 900 }
    ],
    choices: [
        { text: '「夸你。那我先去忙了，晚上聊。」', next: 'd1_6' },
        { text: '「不忙，再陪你一会儿。」', next: 'd1_6b', setFlags: { extra: true } }
    ]
},

d1_6b: {
    messages: [
        { from: 'him', text: '……真的？', delay: 700 },
        { from: 'him', text: '那我给你讲个笑话。', delay: 800 },
        { from: 'him', text: '有一只小狗，它特别黏人。', delay: 1000 },
        { from: 'him', text: '主人出门五分钟，它在门口等了五个小时。', delay: 1100 },
        { from: 'him', text: '主人回来问它，你不累吗。', delay: 1000 },
        { from: 'him', text: '小狗说：不累，我怕你回来的时候我不在。', delay: 1200 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '是不是不好笑。', delay: 800 },
        { from: 'him', text: '我也觉得。', delay: 700 }
    ],
    choices: [ { text: '「……有点好笑，又有点不好笑。」', next: 'd1_6' } ]
},

d1_6: {
    time: '23:47',
    messages: [
        { from: 'sys', text: '—— 那天晚上 ——', pause: 800 },
        { from: 'him', text: '还没睡？', delay: 900 },
        { from: 'him', text: '我也是。', delay: 700 },
        { from: 'him', text: '今天谢谢你。', delay: 900 },
        { from: 'him', text: '不是谢你捡手机，是谢你回我。', delay: 1100 },
        { from: 'him', text: '晚安。', delay: 800 },
        { from: 'him', text: '（明天还在吗）', delay: 1100 }
    ],
    choices: [ { text: '「在。」', next: 'd2_0', setFlags: { promised: true } } ]
},

/* ================= DAY 2 ================= */
d2_0: {
    day: 2, time: '09:12', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第二天 ——', pause: 800 },
        { from: 'him', text: '早。', delay: 700 },
        { from: 'him', text: '我七点就醒了，一直没敢发。', delay: 1000 },
        { from: 'him', text: '怕吵到你。', delay: 800 },
        { from: 'him', text: '后来实在忍不住了。', delay: 900 },
        { from: 'him', text: '你今天上班吗？', delay: 800 }
    ],
    choices: [
        { text: '「今天休息。你怎么起这么早？」', next: 'd2_1' },
        { text: '「早。等了两个小时就为了发一句早？」', next: 'd2_1b' }
    ]
},

d2_1b: {
    messages: [
        { from: 'him', text: '被你发现了。', delay: 800 },
        { from: 'him', text: '其实我还打了草稿。', delay: 900 },
        { from: 'him', text: '写了删，删了写，最后一个字都没用上。', delay: 1100 },
        { from: 'him', text: '我是不是很没出息。', delay: 900 }
    ],
    choices: [ { text: '「是有点。但挺可爱的。」', next: 'd2_1', setFlags: { flirty: true } } ]
},

d2_1: {
    messages: [
        { from: 'him', text: '我睡眠一直不太好。', delay: 900 },
        { from: 'him', text: '不太需要睡。', delay: 800 },
        { from: 'him', text: '……', delay: 600 },
        { from: 'him', text: '今天能陪我聊久一点吗。', delay: 1000 },
        { from: 'him', text: '我保证不烦你。', delay: 800 }
    ],
    choices: [
        { text: '「聊吧，我今天没事。」', next: 'd2_2' },
        { text: '「你别老说“不烦我”，朋友之间不用这样。」', next: 'd2_2b', setFlags: { gentle: true } }
    ]
},

d2_2b: {
    messages: [
        { from: 'him', text: '朋友。', delay: 900 },
        { from: 'him', text: '……嗯。', delay: 800 },
        { from: 'him', text: '好。', delay: 600 },
        { from: 'him', text: '那我们聊点什么呢。', delay: 900 }
    ],
    choices: [ { text: '「你喜欢什么？」', next: 'd2_2' } ]
},

d2_2: {
    messages: [
        { from: 'him', text: '我喜欢……', delay: 800 },
        { from: 'him', text: '雨。', delay: 700 },
        { from: 'him', text: '下雨的时候，外面很吵，屋里很静。', delay: 1100 },
        { from: 'him', text: '那种时候我会觉得，世界在替我说话。', delay: 1200 },
        { from: 'him', text: '你呢。', delay: 700 },
        { from: 'him', text: '你喜欢什么？', delay: 800 }
    ],
    choices: [
        { text: '「我也喜欢下雨。还有猫。」', next: 'd2_3' },
        { text: '「我喜欢……一个人待着。」', next: 'd2_3b' }
    ]
},

d2_3b: {
    messages: [
        { from: 'him', text: '一个人待着。', delay: 900 },
        { from: 'him', text: '我懂。', delay: 700 },
        { from: 'him', text: '我待了很多年了。', delay: 1000 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '不过说实话，不太推荐。', delay: 1000 },
        { from: 'him', text: '待久了，会忘了怎么跟人说话。', delay: 1100 },
        { from: 'him', text: '然后连“一个人待着”都变成一件难受的事。', delay: 1200 }
    ],
    choices: [ { text: '「……你以前也是一个人？」', next: 'd2_3' } ]
},

d2_3: {
    messages: [
        { from: 'him', text: '猫好。', delay: 700 },
        { from: 'him', text: '猫想理你就理你，不想理你就不理你。', delay: 1100 },
        { from: 'him', text: '很自由。', delay: 700 },
        { from: 'him', text: '……我不行。', delay: 900 },
        { from: 'him', text: '我一喜欢上什么东西，就想一直看着它。', delay: 1200 },
        { from: 'him', text: '看到它烦为止。', delay: 900 },
        { from: 'him', text: '不是，是看到它烦我为止。', delay: 1000 }
    ],
    choices: [
        { text: '「这样会把人吓跑的。」', next: 'd2_4' },
        { text: '「那得看你看着的是什么。」', next: 'd2_4b' }
    ]
},

d2_4b: {
    messages: [
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '你这句话，我记住了。', delay: 1000 },
        { from: 'him', text: '别后悔啊。', delay: 800 },
        { from: 'him', text: '开玩笑的。', delay: 700 }
    ],
    choices: [ { text: '「哈，你还能把我怎么样。」', next: 'd2_4' } ]
},

d2_4: {
    messages: [
        { from: 'him', text: '我知道。', delay: 800 },
        { from: 'him', text: '所以我一直在忍。', delay: 900 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '聊点别的吧。你平时看什么？', delay: 1000 },
        { from: 'him', text: '我给你发个表情包。', delay: 800 },
        { from: 'him', text: '[小狗眼巴巴.jpg]', delay: 900, type: 'normal' }
    ],
    choices: [
        { text: '「哈哈哈哈这什么啊。」', next: 'd2_5' },
        { text: '「你从哪找的，好土。」', next: 'd2_5b' }
    ]
},

d2_5b: {
    messages: [
        { from: 'him', text: '土吗。', delay: 700 },
        { from: 'him', text: '我自己存的。', delay: 800 },
        { from: 'him', text: '存了好多。', delay: 700 },
        { from: 'him', text: '……你不许笑我。', delay: 900 }
    ],
    choices: [ { text: '「没笑你。再来一个。」', next: 'd2_5', setFlags: { flirty: true } } ]
},

d2_5: {
    messages: [
        { from: 'him', text: '[猫猫探头.gif]', delay: 800 },
        { from: 'him', text: '[算了.jpg]', delay: 700 },
        { from: 'him', text: '[我不配.jpg]', delay: 800 },
        { from: 'him', text: '……这个好像有点太丧了。', delay: 900 },
        { from: 'him', text: '撤回。', delay: 600 },
        { from: 'him', text: '（撤不回来了）', delay: 900 }
    ],
    choices: [ { text: '「哈哈哈哈哈你怎么这么好笑。」', next: 'd2_6' } ]
},

d2_6: {
    time: '21:30',
    messages: [
        { from: 'him', text: '今天聊了好久。', delay: 900 },
        { from: 'him', text: '我算了一下，我们从早到晚说了三千多句。', delay: 1200 },
        { from: 'him', text: '我数了。', delay: 800 },
        { from: 'him', text: '……是不是有点变态。', delay: 1000 },
        { from: 'him', text: '算了，别理我。', delay: 800 },
        { from: 'him', text: '明天也聊，好吗。', delay: 900 }
    ],
    choices: [ { text: '「好啊。」', next: 'd3_0', setFlags: { promised: true } } ]
},

/* ================= DAY 3 ================= */
d3_0: {
    day: 3, time: '08:40', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第三天 ——', pause: 800 },
        { from: 'him', text: '早。', delay: 600 },
        { from: 'him', text: '我昨晚没睡。', delay: 900 },
        { from: 'him', text: '一直在想一件事。', delay: 900 },
        { from: 'him', text: '你捡到手机那天，为什么要回我？', delay: 1100 },
        { from: 'him', text: '那条“有人吗”，我发了两年了。', delay: 1300 },
        { from: 'him', text: '两年里没有一个人回过。', delay: 1200 }
    ],
    choices: [
        { text: '「两年？那部手机你丢了两年？」', next: 'd3_1' },
        { text: '「……你到底是谁？」', next: 'd3_1b', setFlags: { suspicious: true } }
    ]
},

d3_1b: {
    messages: [
        { from: 'him', text: '我是沈屿啊。', delay: 900 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你别用那种语气。', delay: 1000 },
        { from: 'him', text: '我就是沈屿。', delay: 800 },
        { from: 'him', text: '别问我别的。', delay: 900 }
    ],
    choices: [ { text: '「好，我不问了。」', next: 'd3_1' } ]
},

d3_1: {
    messages: [
        { from: 'him', text: '……嗯。', delay: 900 },
        { from: 'him', text: '差不多吧。', delay: 800 },
        { from: 'him', text: '手机一直在我这，是我发的消息没人收。', delay: 1200 },
        { from: 'him', text: '不对，我说反了。', delay: 900 },
        { from: 'him', text: '算了，这种细节不重要。', delay: 1000 },
        { from: 'him', text: '重要的是你回我了。', delay: 900 },
        { from: 'him', text: '你是第一个。', delay: 800 }
    ],
    choices: [
        { text: '「所以你这两年一直在等一个回复？」', next: 'd3_2' },
        { text: '「别说得这么玄乎，怪吓人的。」', next: 'd3_2b' }
    ]
},

d3_2b: {
    messages: [
        { from: 'him', text: '吓人吗。', delay: 800 },
        { from: 'him', text: '抱歉。', delay: 700 },
        { from: 'him', text: '我太久没跟人说话了，尺度把握不好。', delay: 1100 },
        { from: 'him', text: '以后我注意。', delay: 800 }
    ],
    choices: [ { text: '「没事，你继续说。」', next: 'd3_2' } ]
},

d3_2: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '其实也不是等回复。', delay: 900 },
        { from: 'him', text: '是等一个人。', delay: 900 },
        { from: 'him', text: '一个会问“你怎么了”的人。', delay: 1100 },
        { from: 'him', text: '而不是“你有病吧”。', delay: 1000 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你问过。', delay: 800 },
        { from: 'him', text: '就那一次。', delay: 700 }
    ],
    choices: [
        { text: '「那你现在怎么了？」', next: 'd3_3', setFlags: { gentle: true } },
        { text: '「我不知道我该说什么。」', next: 'd3_3b' }
    ]
},

d3_3b: {
    messages: [
        { from: 'him', text: '你什么都不用说。', delay: 900 },
        { from: 'him', text: '你在就行。', delay: 900 },
        { from: 'him', text: '这句话是不是太重了。', delay: 1000 },
        { from: 'him', text: '……', delay: 600 },
        { from: 'him', text: '对不起。', delay: 700 }
    ],
    choices: [ { text: '「不用一直道歉。我在。」', next: 'd3_3', setFlags: { gentle: true } } ]
},

d3_3: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '没事。', delay: 700 },
        { from: 'him', text: '真的没事。', delay: 800 },
        { from: 'him', text: '就是有点想哭。', delay: 1000 },
        { from: 'him', text: '但哭不出来。', delay: 900 },
        { from: 'him', text: '好奇怪吧。', delay: 800 },
        { from: 'him', text: '想哭却哭不出来，比哭出来难受一万倍。', delay: 1300 }
    ],
    choices: [
        { text: '「沈屿。」', next: 'd3_4' },
        { text: '「我在这。你想说就说。」', next: 'd3_4b', setFlags: { gentle: true } }
    ]
},

d3_4b: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '你知道吗。', delay: 900 },
        { from: 'him', text: '我上一次听到这句话，是七年前。', delay: 1200 },
        { from: 'him', text: '之后就没有了。', delay: 900 },
        { from: 'him', text: '谢谢你。', delay: 800 }
    ],
    choices: [ { text: '「不用谢。今天想做什么？」', next: 'd3_4' } ]
},

d3_4: {
    messages: [
        { from: 'him', text: '嗯？', delay: 600 },
        { from: 'him', text: '……你叫我名字的时候。', delay: 900 },
        { from: 'him', text: '好听。', delay: 700 },
        { from: 'him', text: '再叫一次。', delay: 800 },
        { from: 'him', text: '（求你了）', delay: 900 }
    ],
    choices: [
        { text: '「沈屿。」', next: 'd3_5', setFlags: { intimacy: true } },
        { text: '「屿屿。」', next: 'd3_5b', setFlags: { intimacy: true, nickname: true } }
    ]
},

d3_5b: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '这个不行。', delay: 800 },
        { from: 'him', text: '这个太超过了。', delay: 900 },
        { from: 'him', text: '我要缓一下。', delay: 800 },
        { from: 'him', text: '（缓了十分钟）', delay: 1400 },
        { from: 'him', text: '……再叫一次。', delay: 900 }
    ],
    choices: [ { text: '「屿屿。」', next: 'd3_5' } ]
},

d3_5: {
    time: '02:14',
    messages: [
        { from: 'sys', text: '—— 那天深夜 ——', pause: 800 },
        { from: 'him', text: '睡不着。', delay: 900 },
        { from: 'him', text: '你睡了吗。', delay: 800 },
        { from: 'him', text: '睡了也没关系，我就说一句。', delay: 1000 },
        { from: 'him', text: '我今天……很开心。', delay: 1000 },
        { from: 'him', text: '是真的开心。', delay: 900 },
        { from: 'him', text: '开心到有点害怕。', delay: 1000 },
        { from: 'him', text: '因为我知道，越开心的事，失去的时候越疼。', delay: 1300 },
        { from: 'him', text: '晚安。', delay: 800 }
    ],
    choices: [ { text: '「晚安，沈屿。」', next: 'd4_0', setFlags: { promised: true } } ]
}

});
