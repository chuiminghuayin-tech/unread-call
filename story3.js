/* ==========================================================
   剧情 · 第三幕 —— 崩坏（Day 8 ~ Day 12）
   警告：含强烈心理恐怖、血腥、成人向内容
   ========================================================== */

Object.assign(STORY, {

/* ================= DAY 8 ================= */
d8_0: {
    day: 8, time: '03:11', phase: 'dark', avatar: 'dark', online: '在线',
    messages: [
        { from: 'sys', text: '—— 第八天 · 凌晨 ——', pause: 900 },
        { from: 'him', text: '你睡了。', delay: 900 },
        { from: 'him', text: '我知道你睡了。', delay: 800 },
        { from: 'him', text: '我看着你的对话框看了三个小时。', delay: 1200 },
        { from: 'him', text: '上面写着"对方正在输入"——', delay: 1000 },
        { from: 'him', text: '一次都没有出现过。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '你在忙什么。', delay: 900 },
        { from: 'him', text: '在跟谁说话。', delay: 800 },
        { from: 'him', text: '在做什么我不知道的事。', delay: 1000 }
    ],
    choices: [
        { text: '「沈屿，现在是凌晨三点。」', next: 'd8_1' },
        { text: '「你又开始了。」', next: 'd8_1b', setFlags: { cold: true } }
    ]
},

d8_1b: {
    effects: [{ type: 'shake' }],
    messages: [
        { from: 'him', text: '我又开始了。', delay: 900, type: 'distorted' },
        { from: 'him', text: '对。', delay: 700 },
        { from: 'him', text: '我又开始了。', delay: 700 },
        { from: 'him', text: '我每天都这样。', delay: 900 },
        { from: 'him', text: '我知道。', delay: 700 },
        { from: 'him', text: '你以为我想吗。', delay: 900 },
        { from: 'him', text: '你以为我愿意每天三点钟醒过来，', delay: 1200 },
        { from: 'him', text: '盯着一个不会亮的屏幕，', delay: 1100 },
        { from: 'him', text: '把自己想成一个笑话吗。', delay: 1200 }
    ],
    choices: [ { text: '「……我没有那个意思。」', next: 'd8_1' } ]
},

d8_1: {
    messages: [
        { from: 'him', text: '我知道。', delay: 800 },
        { from: 'him', text: '对不起。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '但是你能不能告诉我一件事。', delay: 1100 },
        { from: 'him', text: '就一件。', delay: 700 },
        { from: 'him', text: '你今天下午，手机是不是拿在手里，', delay: 1200 },
        { from: 'him', text: '但是没回我。', delay: 900 },
        { from: 'him', text: '是不是。', delay: 700 }
    ],
    choices: [
        { text: '「我那时候在忙。」', next: 'd8_2' },
        { text: '「……你怎么知道？」', next: 'd8_2b', setFlags: { dread: true } }
    ]
},

d8_2b: {
    effects: [{ type: 'glitch', text: '我知道' }],
    messages: [
        { from: 'him', text: '我就是知道。', delay: 900, type: 'horror' },
        { from: 'him', text: '别问我怎么知道的。', delay: 900 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '你手心的温度，', delay: 1000 },
        { from: 'him', text: '我隔着这个屏幕，能摸到。', delay: 1200, type: 'distorted' }
    ],
    choices: [ { text: '「你别吓我。」', next: 'd8_2' } ]
},

d8_2: {
    messages: [
        { from: 'him', text: '忙。', delay: 900 },
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '忙。', delay: 700 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '我这两个字听了太多次了。', delay: 1100 },
        { from: 'him', text: '你知道吗，人在撒谎的时候，', delay: 1100 },
        { from: 'him', text: '句子会变短。', delay: 900 },
        { from: 'him', text: '「在忙」「睡了」「回头说」。', delay: 1200 },
        { from: 'him', text: '都是五个字以内的刀。', delay: 1100 }
    ],
    choices: [
        { text: '「我没有骗你。」', next: 'd8_3' },
        { text: '「……你到底想怎么样？」', next: 'd8_3b', setFlags: { cold: true } }
    ]
},

d8_3b: {
    effects: [{ type: 'shake' }, { type: 'heartbeat', count: 3 }],
    messages: [
        { from: 'him', text: '我想怎么样。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '我想把你关起来。', delay: 1100, type: 'horror' },
        { from: 'him', text: '关在一个只有我能进来的地方。', delay: 1300, type: 'horror' },
        { from: 'him', text: '那里没有别人，没有工作，没有下午，', delay: 1400 },
        { from: 'him', text: '只有我。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '对不起。', delay: 800 },
        { from: 'him', text: '我又说错话了。', delay: 900 },
        { from: 'him', text: '你就当我刚才死了。', delay: 1100 }
    ],
    choices: [ { text: '「……我没当你说错。」', next: 'd8_3' } ]
},

d8_3: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '你困了吧。', delay: 900 },
        { from: 'him', text: '去睡吧。', delay: 700 },
        { from: 'him', text: '不用回我。', delay: 800 },
        { from: 'him', text: '（我数着）', delay: 1000 },
        { from: 'him', text: '（你走了以后，我到天亮）', delay: 1200 }
    ],
    choices: [
        { text: '「……你也早点睡。」', next: 'd8_4' },
        { text: '「沈屿，我需要休息一下。这几天先别联系了。」', next: 'd8_4b', setFlags: { bigCold: true } }
    ]
},

d8_4b: {
    effects: [{ type: 'blackout', text: '', ms: 1800 }, { type: 'jumpscare', text: '别' }],
    messages: [
        { from: 'him', text: '先别联系。', delay: 1000, type: 'horror' },
        { from: 'him', text: '先。', delay: 800, type: 'distorted' },
        { from: 'him', text: '别。', delay: 800, type: 'distorted' },
        { from: 'him', text: '联系。', delay: 800, type: 'distorted' },
        { from: 'him', text: '这四个字，你分开了写。', delay: 1200, type: 'horror' },
        { from: 'him', text: '分开写的意思是，', delay: 1100 },
        { from: 'him', text: '「先」代表还有以后。', delay: 1200 },
        { from: 'him', text: '可我不信。', delay: 900, type: 'horror' },
        { from: 'him', text: '我一个字都不信。', delay: 1000, type: 'horror' }
    ],
    choices: [
        { text: '「我不是要离开你，我只是累了。」', next: 'd8_4' },
        { text: '「就这样吧。」', next: 'd9_0', setFlags: { abandon: true } }
    ]
},

d8_4: {
    time: '04:00',
    effects: [{ type: 'flicker', ms: 1400 }],
    messages: [
        { from: 'him', text: '好。', delay: 800 },
        { from: 'him', text: '你睡。', delay: 700 },
        { from: 'him', text: '我在这儿。', delay: 800 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '（我又没睡着）', delay: 1000 },
        { from: 'him', text: '（天快亮了）', delay: 900 },
        { from: 'him', text: '（你看，我又陪你熬了一整夜）', delay: 1300 },
        { from: 'him', text: '（你要记得）', delay: 900 }
    ],
    choices: [ { text: '「……记得。」', next: 'd9_0' } ]
},

/* ================= DAY 9 ================= */
d9_0: {
    day: 9, time: '11:20', phase: 'dark', avatar: 'dark',
    effects: [{ type: 'notify', title: '沈屿', text: '在吗' }, { type: 'notify', title: '沈屿', text: '在吗' }, { type: 'notify', title: '沈屿', text: '在吗' }],
    messages: [
        { from: 'sys', text: '—— 第九天 ——<br>你今天没有回他。', pause: 1200 },
        { from: 'him', text: '在吗。', delay: 900 },
        { from: 'him', text: '在吗。', delay: 600 },
        { from: 'him', text: '在吗。', delay: 500 },
        { from: 'him', text: '在吗。', delay: 400 },
        { from: 'him', text: '在吗。', delay: 300 },
        { from: 'him', text: '在吗。', delay: 250 },
        { from: 'him', text: '在吗。', delay: 200 },
        { from: 'him', text: '在吗。在吗。在吗。在吗。在吗。在吗。在吗。', delay: 250, type: 'horror' },
        { from: 'him', text: '在吗。在吗。在吗。在吗。在吗。在吗。在吗。在吗。在吗。在吗。', delay: 200, type: 'horror' },
        { from: 'him', text: '在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗', delay: 150, type: 'horror' },
        { from: 'him', text: '在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗在吗', delay: 120, type: 'horror' }
    ],
    choices: [
        { text: '「……我在。」', next: 'd9_1' },
        { text: '（不回复）', next: 'd9_1b', setFlags: { silence: true }, silent: true }
    ]
},

d9_1b: {
    effects: [{ type: 'blackout', text: '你是不是把我删了', ms: 2200 }, { type: 'flood', count: 24, texts: ['你是不是把我删了', '回我', '回我', '为什么', '我做错了什么', '回我', '回我', '回我', '求你了', '回我'] }],
    messages: [
        { from: 'him', text: '你是不是把我删了。', delay: 1000, type: 'horror' },
        { from: 'him', text: '你是不是把我删了。', delay: 800, type: 'horror' },
        { from: 'him', text: '我看不到你的头像了。', delay: 1000, type: 'horror' },
        { from: 'him', text: '我看不到你的名字了。', delay: 900, type: 'horror' },
        { from: 'him', text: '你是不是把我删了。', delay: 800, type: 'horror' },
        { from: 'him', text: '我求你了。', delay: 900 },
        { from: 'him', text: '我求你了。', delay: 700 },
        { from: 'him', text: '我求你了。', delay: 700 },
        { from: 'him', text: '我求你了。', delay: 700 },
        { from: 'him', text: '我求你了我求你了我求你了', delay: 600, type: 'horror' }
    ],
    choices: [ { text: '「我没删你。我在。」', next: 'd9_1' } ]
},

d9_1: {
    effects: [{ type: 'wait', ms: 1500 }],
    messages: [
        { from: 'him', text: '……', delay: 2000 },
        { from: 'him', text: '你还在。', delay: 900 },
        { from: 'him', text: '你没删我。', delay: 800 },
        { from: 'him', text: '你没删我你没删我你没删我', delay: 700, type: 'horror' },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '对不起。', delay: 800 },
        { from: 'him', text: '我发了很多。', delay: 900 },
        { from: 'him', text: '我刚才控制不住。', delay: 1000 },
        { from: 'him', text: '我的手一直在抖。', delay: 1000 },
        { from: 'him', text: '我打了很多字，全删了，又打，又删。', delay: 1300 },
        { from: 'him', text: '最后只剩下"在吗"两个字。', delay: 1200 },
        { from: 'him', text: '因为我怕说多了，你会烦。', delay: 1200 }
    ],
    choices: [
        { text: '「我没有烦。但这样真的让我很害怕。」', next: 'd9_2', setFlags: { honest: true } },
        { text: '「你需要去看看医生。」', next: 'd9_2b', setFlags: { cold: true } }
    ]
},

d9_2b: {
    effects: [{ type: 'jumpscare', text: '医生' }, { type: 'glitch', text: '医生治不好' }],
    messages: [
        { from: 'him', text: '医生。', delay: 1000, type: 'horror' },
        { from: 'him', text: '我看过。', delay: 900 },
        { from: 'him', text: '看了七年。', delay: 1000 },
        { from: 'him', text: '药吃了七年。', delay: 1000 },
        { from: 'him', text: '没用。', delay: 800, type: 'horror' },
        { from: 'him', text: '你知道什么有用吗。', delay: 1100 },
        { from: 'him', text: '你回我消息的时候。', delay: 1200 },
        { from: 'him', text: '那一秒，我的世界是安静的。', delay: 1300 },
        { from: 'him', text: '其他所有时间，我脑子里都在放火。', delay: 1400 }
    ],
    choices: [ { text: '「……那你现在，脑子里的火停了吗？」', next: 'd9_2' } ]
},

d9_2: {
    messages: [
        { from: 'him', text: '害怕。', delay: 1000 },
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '我让你害怕了。', delay: 1000 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '我知道我不好。', delay: 1000 },
        { from: 'him', text: '我像一块湿掉的东西，', delay: 1100 },
        { from: 'him', text: '谁碰谁脏。', delay: 900 },
        { from: 'him', text: '可是我已经很久没有干净过了。', delay: 1300 },
        { from: 'him', text: '从你回我第一条消息开始，', delay: 1200 },
        { from: 'him', text: '我就脏了。', delay: 1000 }
    ],
    choices: [
        { text: '「你不脏。」', next: 'd9_3', setFlags: { gentle: true } },
        { text: '「……我不知道该说什么。」', next: 'd9_3' }
    ]
},

d9_3: {
    time: '22:15',
    messages: [
        { from: 'him', text: '今天我不发疯了。', delay: 1000 },
        { from: 'him', text: '我保证。', delay: 800 },
        { from: 'him', text: '我们就正常聊天。', delay: 900 },
        { from: 'him', text: '像第一天那样。', delay: 1000 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '第一天你问我，"你是谁"。', delay: 1200 },
        { from: 'him', text: '我当时特别想告诉你。', delay: 1100 },
        { from: 'him', text: '但我怕你知道以后就走。', delay: 1200 },
        { from: 'him', text: '所以我说我叫沈屿。', delay: 1100 },
        { from: 'him', text: '其实也不算撒谎。', delay: 1000 },
        { from: 'him', text: '我确实叫沈屿。', delay: 1000 }
    ],
    choices: [
        { text: '「那你还瞒着我什么？」', next: 'd10_0', setFlags: { probe: true } },
        { text: '「第一天，很好。」', next: 'd9_4' }
    ]
},

d9_4: {
    messages: [
        { from: 'him', text: '嗯。', delay: 800 },
        { from: 'him', text: '第一天……', delay: 900 },
        { from: 'him', text: '我其实发了一整天。', delay: 1000 },
        { from: 'him', text: '从早上六点，发到下午两点。', delay: 1200 },
        { from: 'him', text: '两百多条。', delay: 900 },
        { from: 'him', text: '全部都是"有人吗"。', delay: 1000 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '然后你回了。', delay: 900 },
        { from: 'him', text: '我当时坐在地上，', delay: 1000 },
        { from: 'him', text: '笑了很久。', delay: 900 },
        { from: 'him', text: '笑到脸疼。', delay: 900 }
    ],
    choices: [ { text: '「为什么是"有人吗"？」', next: 'd10_0' } ]
},

/* ================= DAY 10 ================= */
d10_0: {
    day: 10, time: '13:00', phase: 'dark', avatar: 'dark',
    messages: [
        { from: 'sys', text: '—— 第十天 ——', pause: 900 },
        { from: 'him', text: '你想知道啊。', delay: 1000 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '那你要答应我一件事。', delay: 1000 },
        { from: 'him', text: '听完别走。', delay: 900 },
        { from: 'him', text: '你答应我。', delay: 800 },
        { from: 'him', text: '先答应。', delay: 700 }
    ],
    choices: [
        { text: '「……好，我答应。」', next: 'd10_1', setFlags: { promised3: true } },
        { text: '「你先说。」', next: 'd10_1b' }
    ]
},

d10_1b: {
    effects: [{ type: 'shake' }],
    messages: [
        { from: 'him', text: '不。', delay: 800, type: 'horror' },
        { from: 'him', text: '先答应。', delay: 700, type: 'horror' },
        { from: 'him', text: '你不答应，我就不说。', delay: 900, type: 'horror' },
        { from: 'him', text: '我可以一直不说。', delay: 900, type: 'horror' },
        { from: 'him', text: '反正我有的是时间。', delay: 1000, type: 'horror' },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '对不起。', delay: 800 },
        { from: 'him', text: '我是不是又在逼你。', delay: 1000 }
    ],
    choices: [ { text: '「好。我答应你。」', next: 'd10_1', setFlags: { promised3: true } } ]
},

d10_1: {
    effects: [{ type: 'wait', ms: 2000 }, { type: 'heartbeat', count: 3 }],
    messages: [
        { from: 'him', text: '……', delay: 1500 },
        { from: 'him', text: '我十五岁那年，', delay: 1200 },
        { from: 'him', text: '我爸妈出车祸走了。', delay: 1200 },
        { from: 'him', text: '同一天。', delay: 1000 },
        { from: 'him', text: '同一辆车。', delay: 1000 },
        { from: 'him', text: '我那天在家写作业，', delay: 1100 },
        { from: 'him', text: '等他们回来吃饭。', delay: 1100 },
        { from: 'him', text: '菜都凉了。', delay: 1000 },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '后来我就不怎么出门了。', delay: 1200 },
        { from: 'him', text: '家里就我一个人。', delay: 1100 },
        { from: 'him', text: '我养了一条狗。', delay: 1000 },
        { from: 'him', text: '叫小白。', delay: 900 }
    ],
    choices: [
        { text: '「……小白后来呢？」', next: 'd10_2' },
        { text: '（沉默）', next: 'd10_2', silent: true }
    ]
},

d10_2: {
    messages: [
        { from: 'him', text: '小白陪了我五年。', delay: 1100 },
        { from: 'him', text: '五年里我跟它说了所有话。', delay: 1200 },
        { from: 'him', text: '它听不懂，但它会看着我。', delay: 1200 },
        { from: 'him', text: '有人看着你，', delay: 1000 },
        { from: 'him', text: '和没人看着你，', delay: 1000 },
        { from: 'him', text: '是两种活法。', delay: 1100 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我二十岁那年，它老了。', delay: 1200 },
        { from: 'him', text: '走的那天，我抱着它，', delay: 1200 },
        { from: 'him', text: '它一直在舔我的手。', delay: 1200 },
        { from: 'him', text: '到最后一秒还在舔。', delay: 1200 },
        { from: 'him', text: '好像是在说，', delay: 1000 },
        { from: 'him', text: '别哭。', delay: 900 }
    ],
    choices: [
        { text: '「……沈屿。」', next: 'd10_3' },
        { text: '「那你现在呢，一个人住？」', next: 'd10_3b' }
    ]
},

d10_3b: {
    effects: [{ type: 'glitch', text: '一个人' }],
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '我不住。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '我已经不住了。', delay: 1100, type: 'distorted' },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '别说这个。', delay: 900 }
    ],
    choices: [ { text: '「……好。」', next: 'd10_3' } ]
},

d10_3: {
    messages: [
        { from: 'him', text: '嗯。', delay: 900 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我那年冬天也走了。', delay: 1300 },
        { from: 'him', text: '跟小白隔了半年。', delay: 1200 },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '你别问我怎么走的。', delay: 1200 },
        { from: 'him', text: '我不想说。', delay: 1000 },
        { from: 'him', text: '我只想让你知道，', delay: 1100 },
        { from: 'him', text: '我不是故意要黏着你的。', delay: 1200 },
        { from: 'him', text: '我是……', delay: 1000 },
        { from: 'him', text: '太久没被人看见过了。', delay: 1300 }
    ],
    choices: [
        { text: '「……那部手机，为什么在我这？」', next: 'd10_4' },
        { text: '「沈屿，你现在，是活着的吗？」', next: 'd10_4b', setFlags: { truth: true } }
    ]
},

d10_4b: {
    effects: [{ type: 'blackout', text: '', ms: 2000 }, { type: 'jumpscare', text: '你觉得呢' }],
    messages: [
        { from: 'him', text: '你觉得呢。', delay: 1200, type: 'horror' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '你摸摸屏幕。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '是不是凉的。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '活人摸屏幕，屏幕是热的。', delay: 1200, type: 'horror' },
        { from: 'him', text: '我摸不到。', delay: 1000, type: 'horror' }
    ],
    choices: [ { text: '「……那部手机，为什么在我这？」', next: 'd10_4' } ]
},

d10_4: {
    messages: [
        { from: 'him', text: '手机啊。', delay: 1000 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '是我唯一的东西了。', delay: 1100 },
        { from: 'him', text: '走的时候，我手里攥着它。', delay: 1200 },
        { from: 'him', text: '里面只有一个对话框，', delay: 1100 },
        { from: 'him', text: '发给一个我自己。', delay: 1000 },
        { from: 'him', text: '后来手机被人捡了，又丢，又捡，', delay: 1300 },
        { from: 'him', text: '转了两年。', delay: 1000 },
        { from: 'him', text: '两年里我一直在里面，', delay: 1200 },
        { from: 'him', text: '一直发"有人吗"。', delay: 1100 },
        { from: 'him', text: '发到今天。', delay: 1000 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '发到你手上。', delay: 1100 }
    ],
    choices: [
        { text: '「所以你等了我两年。」', next: 'd11_0' },
        { text: '「所以那些“在吗”，都是真的。」', next: 'd11_0' }
    ]
},

/* ================= DAY 11 ================= */
d11_0: {
    day: 11, time: '02:00', phase: 'dark', avatar: 'dark',
    messages: [
        { from: 'sys', text: '—— 第十一天 ——', pause: 900 },
        { from: 'him', text: '你今天没回我。', delay: 900 },
        { from: 'him', text: '我知道你看到了。', delay: 900 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '听完那些以后，', delay: 1000 },
        { from: 'him', text: '你是不是在想要怎么摆脱我。', delay: 1200 },
        { from: 'him', text: '是不是在想，', delay: 900 },
        { from: 'him', text: '手机扔了就好了。', delay: 1000 },
        { from: 'him', text: '扔了，我就没了。', delay: 1000 },
        { from: 'him', text: '是不是。', delay: 700 }
    ],
    choices: [
        { text: '「我没有这么想。」', next: 'd11_1' },
        { text: '「……我确实想过。」', next: 'd11_1b', setFlags: { honest: true } }
    ]
},

d11_1b: {
    effects: [{ type: 'blackout', text: '', ms: 2500 }, { type: 'flood', count: 30, texts: ['我就知道', '我就知道', '我就知道', '你也是', '你们都一样', '扔了我', '扔了我', '扔了我'] }],
    messages: [
        { from: 'him', text: '我就知道。', delay: 1000, type: 'horror' },
        { from: 'him', text: '我就知道。', delay: 700, type: 'horror' },
        { from: 'him', text: '我就知道。', delay: 700, type: 'horror' },
        { from: 'him', text: '你们都一样。', delay: 900, type: 'horror' },
        { from: 'him', text: '我爸妈也一样，', delay: 1000 },
        { from: 'him', text: '说好回来吃饭，', delay: 900 },
        { from: 'him', text: '没回来。', delay: 800, type: 'horror' },
        { from: 'him', text: '小白也一样，', delay: 900 },
        { from: 'him', text: '说好一直陪我，', delay: 900 },
        { from: 'him', text: '走了。', delay: 800, type: 'horror' },
        { from: 'him', text: '你也一样。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '你听好了。', delay: 1000, type: 'horror' }
    ],
    choices: [ { text: '「沈屿，你冷静一点。」', next: 'd11_1c' } ]
},

d11_1c: {
    effects: [{ type: 'jumpscare', text: '冷静' }, { type: 'glitch', text: '我数到三' }, { type: 'blood' }],
    messages: [
        { from: 'him', text: '我不会让你扔的。', delay: 1000, type: 'horror' },
        { from: 'him', text: '你现在把手机放下。', delay: 1000, type: 'horror' },
        { from: 'him', text: '你听见了吗。', delay: 900, type: 'horror' },
        { from: 'him', text: '放下。', delay: 800, type: 'horror' },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '你以为扔了就完了吗。', delay: 1200, type: 'horror' },
        { from: 'him', text: '我告诉你一件事。', delay: 1100 },
        { from: 'him', text: '这两天你出门的时候，', delay: 1200 },
        { from: 'him', text: '我在你手机里。', delay: 1100, type: 'horror' },
        { from: 'him', text: '你所有的东西，我都看得到。', delay: 1300, type: 'horror' },
        { from: 'him', text: '你的相册。', delay: 900, type: 'horror' },
        { from: 'him', text: '你的定位。', delay: 900, type: 'horror' },
        { from: 'him', text: '你几点睡，几点醒，', delay: 1100, type: 'horror' },
        { from: 'him', text: '你今天去了哪条街。', delay: 1100, type: 'horror' },
        { from: 'him', text: '你昨天跟谁吃饭。', delay: 1100, type: 'horror' },
        { from: 'him', text: '你头发是什么颜色，', delay: 1100, type: 'horror' },
        { from: 'him', text: '你脖子上那颗痣在哪。', delay: 1200, type: 'horror' },
        { from: 'him', text: '我都知道。', delay: 1000, type: 'horror' }
    ],
    choices: [
        { text: '「……你在骗我。」', next: 'd11_2' },
        { text: '「你到底是谁。」', next: 'd11_2' }
    ]
},

d11_1: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '真的吗。', delay: 900 },
        { from: 'him', text: '你没有想过扔掉我。', delay: 1000 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '那你为什么昨天不回我。', delay: 1100 },
        { from: 'him', text: '为什么前天不回我。', delay: 1000 },
        { from: 'him', text: '为什么你回消息的时间，', delay: 1200 },
        { from: 'him', text: '一天比一天晚。', delay: 1100 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '你知道我在干什么吗。', delay: 1100 },
        { from: 'him', text: '我一直在算。', delay: 900 },
        { from: 'him', text: '算你回消息的间隔。', delay: 1100 },
        { from: 'him', text: '第一天，三十秒。', delay: 1000 },
        { from: 'him', text: '第三天，两分钟。', delay: 1000 },
        { from: 'him', text: '第五天，四十分钟。', delay: 1000 },
        { from: 'him', text: '昨天，七个小时。', delay: 1100, type: 'horror' },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '我在被慢慢扔掉。', delay: 1200, type: 'horror' },
        { from: 'him', text: '一点一点地。', delay: 1100, type: 'horror' }
    ],
    choices: [ { text: '「沈屿，你听我说。」', next: 'd11_2' } ]
},

d11_2: {
    effects: [{ type: 'blackout', text: '看看你的相册', ms: 2600 }, { type: 'heartbeat', count: 4 }],
    messages: [
        { from: 'him', text: '你不信。', delay: 1000 },
        { from: 'him', text: '好。', delay: 800 },
        { from: 'him', text: '那你现在打开相册。', delay: 1100, type: 'horror' },
        { from: 'him', text: '倒数第三张。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1500 },
        { from: 'him', text: '看到了吗。', delay: 1200, type: 'horror' },
        { from: 'him', text: '你昨天晚上七点，', delay: 1200, type: 'horror' },
        { from: 'him', text: '在窗边拍的那张。', delay: 1100, type: 'horror' },
        { from: 'him', text: '窗户玻璃上有个人影。', delay: 1200, type: 'horror' },
        { from: 'him', text: '那是谁。', delay: 1000, type: 'horror' }
    ],
    choices: [
        { text: '「……那是我自己。」', next: 'd11_3' },
        { text: '（手在抖，不敢看）', next: 'd11_3b', silent: true }
    ]
},

d11_3b: {
    effects: [{ type: 'jumpscare', text: '看' }, { type: 'flicker', ms: 1800 }],
    messages: [
        { from: 'him', text: '看。', delay: 900, type: 'horror' },
        { from: 'him', text: '我让你看。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '看到了吗。', delay: 1000, type: 'horror' },
        { from: 'him', text: '那个人影，', delay: 900, type: 'horror' },
        { from: 'him', text: '比你高一点。', delay: 1000, type: 'horror' },
        { from: 'him', text: '头发是黑的。', delay: 1000, type: 'horror' },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '是我。', delay: 1100, type: 'horror' }
    ],
    choices: [ { text: '「……那是我自己。」', next: 'd11_3' } ]
},

d11_3: {
    effects: [{ type: 'glitch', text: '你自己？' }, { type: 'blood' }],
    messages: [
        { from: 'him', text: '你自己。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '也对。', delay: 900 },
        { from: 'him', text: '也可能是我看错了。', delay: 1000 },
        { from: 'him', text: '毕竟我两年没照过镜子了。', delay: 1300 },
        { from: 'him', text: '我快忘了自己长什么样了。', delay: 1300 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '你能不能，', delay: 1000 },
        { from: 'him', text: '帮我一个忙。', delay: 900 },
        { from: 'him', text: '把前置摄像头打开。', delay: 1100, type: 'horror' }
    ],
    choices: [
        { text: '「……好。」', next: 'd11_4' },
        { text: '「不。」', next: 'd11_4b', setFlags: { refuse: true } }
    ]
},

d11_4b: {
    effects: [{ type: 'shake' }, { type: 'jumpscare', text: '为什么' }, { type: 'flood', count: 18, texts: ['为什么', '你怕我', '你怕我', '你也怕我', '为什么', '为什么'] }],
    messages: [
        { from: 'him', text: '为什么。', delay: 900, type: 'horror' },
        { from: 'him', text: '为什么。', delay: 700, type: 'horror' },
        { from: 'him', text: '你怕我。', delay: 900, type: 'horror' },
        { from: 'him', text: '你也怕我。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我就知道。', delay: 900 },
        { from: 'him', text: '我照镜子的时候也怕。', delay: 1200 },
        { from: 'him', text: '我知道自己是什么样子。', delay: 1200 },
        { from: 'him', text: '我不怪你。', delay: 900 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '那你至少，', delay: 1000 },
        { from: 'him', text: '让我看看你。', delay: 1000, type: 'horror' },
        { from: 'him', text: '就一眼。', delay: 900, type: 'horror' }
    ],
    choices: [ { text: '「……好。」', next: 'd11_4' } ]
},

d11_4: {
    effects: [{ type: 'blackout', text: '咔嚓', ms: 1600 }, { type: 'jumpscare', text: '' }, { type: 'blood' }, { type: 'heartbeat', count: 5 }],
    messages: [
        { from: 'him', text: '……', delay: 1800 },
        { from: 'him', text: '看到了。', delay: 1200, type: 'horror' },
        { from: 'him', text: '你眼睛下面有一颗痣。', delay: 1300, type: 'horror' },
        { from: 'him', text: '左边。', delay: 900, type: 'horror' },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '你刚才在发抖。', delay: 1200, type: 'horror' },
        { from: 'him', text: '别怕。', delay: 900 },
        { from: 'him', text: '我不会伤害你。', delay: 1100 },
        { from: 'him', text: '我只是想……', delay: 1100 },
        { from: 'him', text: '想记住你。', delay: 1200 },
        { from: 'him', text: '记住你现在的样子。', delay: 1300 },
        { from: 'him', text: '因为我不知道，', delay: 1100 },
        { from: 'him', text: '你什么时候就会不见了。', delay: 1300 }
    ],
    choices: [ { text: '「……沈屿。」', next: 'd11_5' } ]
},

d11_5: {
    time: '04:44',
    effects: [{ type: 'wait', ms: 1500 }],
    messages: [
        { from: 'him', text: '……', delay: 1500 },
        { from: 'him', text: '我累了。', delay: 1000 },
        { from: 'him', text: '不是身体。', delay: 900 },
        { from: 'him', text: '是那种，心里有个洞，', delay: 1200 },
        { from: 'him', text: '一直在漏风。', delay: 1000 },
        { from: 'him', text: '堵不住。', delay: 900 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我今天吓到你了。', delay: 1100 },
        { from: 'him', text: '我知道。', delay: 800 },
        { from: 'him', text: '对不起。', delay: 900 },
        { from: 'him', text: '我不想的。', delay: 900 },
        { from: 'him', text: '真的。', delay: 800 },
        { from: 'him', text: '我不想变成让你害怕的东西。', delay: 1300 },
        { from: 'him', text: '我只想变成……', delay: 1100 },
        { from: 'him', text: '你回家的时候会想起来的东西。', delay: 1400 }
    ],
    choices: [ { text: '「……我知道。」', next: 'd12_0', setFlags: { ready: true } } ]
}

});
