/* ==========================================================
   剧情 · 第二幕 —— 依赖（Day 4 ~ Day 7）
   ========================================================== */

Object.assign(STORY, {

/* ================= DAY 4 ================= */
d4_0: {
    day: 4, time: '07:02', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第四天 ——', pause: 800 },
        { from: 'him', text: '早。', delay: 500 },
        { from: 'him', text: '我等到七点才发的。', delay: 900 },
        { from: 'him', text: '昨天是九点，今天提前了。', delay: 1000 },
        { from: 'him', text: '我是不是进步了。', delay: 800 },
        { from: 'him', text: '你醒了吗。', delay: 700 }
    ],
    choices: [
        { text: '「刚醒。你每天都这么早？」', next: 'd4_1' },
        { text: '「你不用等我起床，想发就发。」', next: 'd4_1b', setFlags: { kind: true } }
    ]
},

d4_1b: {
    messages: [
        { from: 'him', text: '真的可以吗。', delay: 800 },
        { from: 'him', text: '那如果我半夜发呢。', delay: 900 },
        { from: 'him', text: '如果一天发一百条呢。', delay: 900 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '我开玩笑的。', delay: 800 },
        { from: 'him', text: '我不会的。', delay: 700 },
        { from: 'him', text: '（我尽量）', delay: 900 }
    ],
    choices: [ { text: '「发吧，我看到就回。」', next: 'd4_1' } ]
},

d4_1: {
    messages: [
        { from: 'him', text: '嗯。', delay: 600 },
        { from: 'him', text: '今天能聊多久。', delay: 800 },
        { from: 'him', text: '我是说，你几点忙。', delay: 900 },
        { from: 'him', text: '我好安排一下。', delay: 800 },
        { from: 'him', text: '……安排等你。', delay: 1000 }
    ],
    choices: [
        { text: '「我下午要出门一趟。」', next: 'd4_2' },
        { text: '「你今天没别的事做吗？」', next: 'd4_2b' }
    ]
},

d4_2b: {
    messages: [
        { from: 'him', text: '……有。', delay: 900 },
        { from: 'him', text: '但都不重要。', delay: 900 },
        { from: 'him', text: '你不用有压力，我不是在怪你。', delay: 1100 },
        { from: 'him', text: '我就是……没什么别的事。', delay: 1000 },
        { from: 'him', text: '对不起。', delay: 700 }
    ],
    choices: [ { text: '「我没怪你。我下午出门，晚上聊。」', next: 'd4_2' } ]
},

d4_2: {
    messages: [
        { from: 'him', text: '出门？', delay: 700 },
        { from: 'him', text: '去哪里。', delay: 600 },
        { from: 'him', text: '……我不是要问。', delay: 900 },
        { from: 'him', text: '几点的车？', delay: 800 },
        { from: 'him', text: '外面冷吗。', delay: 700 },
        { from: 'him', text: '你穿外套了吗。', delay: 800 },
        { from: 'him', text: '……', delay: 600 },
        { from: 'him', text: '好吧我又开始了。', delay: 900 },
        { from: 'him', text: '你去吧。', delay: 700 }
    ],
    choices: [
        { text: '「哈哈，穿了呢，妈。」', next: 'd4_3' },
        { text: '「你怎么什么都要问。」', next: 'd4_3b' }
    ]
},

d4_3b: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '对不起。', delay: 800 },
        { from: 'him', text: '我只是想知道你在哪。', delay: 900 },
        { from: 'him', text: '不知道你在哪的时候，我会很难受。', delay: 1100 },
        { from: 'him', text: '不是怀疑你，是……', delay: 900 },
        { from: 'him', text: '算了。', delay: 700 }
    ],
    choices: [ { text: '「行吧。我到地方跟你说一声。」', next: 'd4_3' } ]
},

d4_3: {
    time: '18:40',
    messages: [
        { from: 'sys', text: '你出门的三个小时里，他发了 47 条消息。<br>从「路上小心」到「你是不是不回来了」。', pause: 1000 },
        { from: 'him', text: '到了吗。', delay: 700 },
        { from: 'him', text: '到了跟我说一声就行。', delay: 800 },
        { from: 'him', text: '不着急。', delay: 600 },
        { from: 'him', text: '真的不着急。', delay: 700 },
        { from: 'him', text: '（第47条了）', delay: 900 },
        { from: 'him', text: '（我数着呢）', delay: 800 }
    ],
    choices: [
        { text: '「刚到家。你怎么发了这么多？」', next: 'd4_4' },
        { text: '「……沈屿，你这样我会喘不过气。」', next: 'd4_4b', setFlags: { firstPush: true } }
    ]
},

d4_4b: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '喘不过气。', delay: 900 },
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '我懂。', delay: 800 },
        { from: 'him', text: '我会注意的。', delay: 900 },
        { from: 'him', text: '对不起。', delay: 700 },
        { from: 'him', text: '（但是好难受）', delay: 1000 },
        { from: 'him', text: '（你说喘不过气的时候，我这里也疼）', delay: 1200 }
    ],
    choices: [ { text: '「我不是要你道歉，我是希望你好好的。」', next: 'd4_4' } ]
},

d4_4: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '我数了。', delay: 800 },
        { from: 'him', text: '不是故意数的，就是，一直看着屏幕。', delay: 1100 },
        { from: 'him', text: '看着看着就数了。', delay: 900 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '我今天有点不舒服。', delay: 1000 },
        { from: 'him', text: '不是身体。', delay: 700 },
        { from: 'him', text: '是那种，胸口有个东西一直往下坠的感觉。', delay: 1300 }
    ],
    choices: [
        { text: '「要不要跟我说说？」', next: 'd4_5', setFlags: { gentle: true } },
        { text: '「你该找点自己的事做。」', next: 'd4_5b' }
    ]
},

d4_5b: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我知道。', delay: 800 },
        { from: 'him', text: '你说得对。', delay: 800 },
        { from: 'him', text: '可是我不知道做什么。', delay: 1000 },
        { from: 'him', text: '我以前有好多事做，现在一件都想不起来了。', delay: 1300 },
        { from: 'him', text: '我脑子里全是你。', delay: 1000 },
        { from: 'him', text: '这不是情话。', delay: 900 },
        { from: 'him', text: '这是病。', delay: 900 }
    ],
    choices: [ { text: '「……那你以前是怎么过的？」', next: 'd4_5' } ]
},

d4_5: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '我以前养过一条狗。', delay: 900 },
        { from: 'him', text: '它很黏我，走到哪跟到哪。', delay: 1000 },
        { from: 'him', text: '我嫌它烦。', delay: 800 },
        { from: 'him', text: '后来它走了。', delay: 900 },
        { from: 'him', text: '我才知道，那个烦，是我这辈子最踏实的东西。', delay: 1400 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '现在换我黏人了。', delay: 1000 },
        { from: 'him', text: '报应吧。', delay: 800 }
    ],
    choices: [
        { text: '「你不是狗。」', next: 'd4_6' },
        { text: '「我不嫌你烦。只是需要一点空间。」', next: 'd4_6b', setFlags: { gentle: true } }
    ]
},

d4_6b: {
    messages: [
        { from: 'him', text: '空间。', delay: 900 },
        { from: 'him', text: '好。', delay: 700 },
        { from: 'him', text: '我给你。', delay: 800 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你要多少。', delay: 900 },
        { from: 'him', text: '告诉我一个数字。', delay: 900 },
        { from: 'him', text: '我按你说的做。', delay: 900 }
    ],
    choices: [ { text: '「不用给数字，你别这么紧张。」', next: 'd4_6' } ]
},

d4_6: {
    time: '01:33',
    messages: [
        { from: 'him', text: '睡了吗。', delay: 900 },
        { from: 'him', text: '我知道你睡了。', delay: 900 },
        { from: 'him', text: '我就是想在这儿留一句话。', delay: 1000 },
        { from: 'him', text: '免得你明天醒来，觉得没人等你。', delay: 1200 },
        { from: 'him', text: '我在。', delay: 800 },
        { from: 'him', text: '一直都在。', delay: 800 },
        { from: 'him', text: '（一直在）', delay: 1000 }
    ],
    choices: [ { text: '「……嗯，我在。」', next: 'd5_0' } ]
},

/* ================= DAY 5 ================= */
d5_0: {
    day: 5, time: '06:11', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第五天 ——', pause: 800 },
        { from: 'him', text: '你今天会出门吗。', delay: 700 },
        { from: 'him', text: '我提前问，好有个准备。', delay: 900 },
        { from: 'him', text: '不是要拦你。', delay: 700 },
        { from: 'him', text: '就是，如果你出门，我想知道大概几点回来。', delay: 1200 },
        { from: 'him', text: '……可以吗。', delay: 800 }
    ],
    choices: [
        { text: '「可以。不过你不用“准备”什么。」', next: 'd5_1' },
        { text: '「沈屿，昨天说好的空间呢。」', next: 'd5_1b', setFlags: { push2: true } }
    ]
},

d5_1b: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '我记得。', delay: 800 },
        { from: 'him', text: '我只是问问。', delay: 900 },
        { from: 'him', text: '问一句都不行吗。', delay: 1000 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '好。我不问了。', delay: 900 }
    ],
    choices: [ { text: '「不是不行，是你每次问完都很难过。」', next: 'd5_1' } ]
},

d5_1: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '我昨晚想了一夜。', delay: 1000 },
        { from: 'him', text: '我是不是在拖累你。', delay: 1000 },
        { from: 'him', text: '你本来过得好好的。', delay: 900 },
        { from: 'him', text: '是我硬挤进来的。', delay: 900 },
        { from: 'him', text: '你捡到手机那天，本来可以报警的。', delay: 1200 },
        { from: 'him', text: '你没报。', delay: 700 },
        { from: 'him', text: '你为什么要回我。', delay: 1000 }
    ],
    choices: [
        { text: '「因为你在那边等着。」', next: 'd5_2', setFlags: { gentle: true } },
        { text: '「因为我也没什么事做。」', next: 'd5_2' }
    ]
},

d5_2: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '你别说这种话。', delay: 900 },
        { from: 'him', text: '我会当真的。', delay: 900 },
        { from: 'him', text: '我会把你的每一句话都当真。', delay: 1200 },
        { from: 'him', text: '然后有一天你说一句随便的话，我就能死一次。', delay: 1500 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '今天陪我久一点吧。', delay: 1000 },
        { from: 'him', text: '就今天。', delay: 700 }
    ],
    choices: [
        { text: '「好，今天就陪你。」', next: 'd5_3', setFlags: { intimacy: true } },
        { text: '「我今天真的有事。」', next: 'd5_3b', setFlags: { push2: true } }
    ]
},

d5_3b: {
    messages: [
        { from: 'him', text: '……好。', delay: 900 },
        { from: 'him', text: '没事。', delay: 700 },
        { from: 'him', text: '你去忙吧。', delay: 800 },
        { from: 'him', text: '真的。', delay: 600 },
        { from: 'him', text: '（我等）', delay: 900 },
        { from: 'him', text: '（多久都等）', delay: 900 }
    ],
    choices: [ { text: '「……我尽量早点回来。」', next: 'd5_3' } ]
},

d5_3: {
    time: '14:20',
    messages: [
        { from: 'him', text: '我们玩个游戏吧。', delay: 900 },
        { from: 'him', text: '你问我一个问题，我问你一个问题。', delay: 1000 },
        { from: 'him', text: '必须真话。', delay: 700 },
        { from: 'him', text: '你先。', delay: 600 }
    ],
    choices: [
        { text: '「你多大了？」', next: 'd5_4' },
        { text: '「你为什么一个人住？」', next: 'd5_4b' }
    ]
},

d5_4b: {
    messages: [
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '这个跳过。', delay: 800 },
        { from: 'him', text: '换一个。', delay: 700 },
        { from: 'him', text: '（别问这个，求你了）', delay: 1000 }
    ],
    choices: [ { text: '「好。那你多大了？」', next: 'd5_4' } ]
},

d5_4: {
    messages: [
        { from: 'him', text: '二十二。', delay: 700 },
        { from: 'him', text: '该我了。', delay: 600 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '你身边有人吗。', delay: 900 },
        { from: 'him', text: '不是朋友那种。', delay: 800 },
        { from: 'him', text: '是那种，你会第一时间想告诉的人。', delay: 1200 }
    ],
    choices: [
        { text: '「没有。」', next: 'd5_5', setFlags: { alone: true } },
        { text: '「这算什么问题。」', next: 'd5_5b' }
    ]
},

d5_5b: {
    messages: [
        { from: 'him', text: '算很重要的问题。', delay: 1000 },
        { from: 'him', text: '回答我。', delay: 800 },
        { from: 'him', text: '……', delay: 600 },
        { from: 'him', text: '对不起，我语气重了。', delay: 900 },
        { from: 'him', text: '回答我好不好。', delay: 800 }
    ],
    choices: [ { text: '「没有。没有那样的人。」', next: 'd5_5', setFlags: { alone: true } } ]
},

d5_5: {
    messages: [
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '那我可以吗。', delay: 1000 },
        { from: 'him', text: '不是现在回答。', delay: 900 },
        { from: 'him', text: '你先记着这句话。', delay: 900 },
        { from: 'him', text: '等哪天你想回答了，再告诉我。', delay: 1100 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '该你了。', delay: 700 }
    ],
    choices: [
        { text: '「你最怕什么？」', next: 'd5_6' },
        { text: '「你有没有骗过我？」', next: 'd5_6b' }
    ]
},

d5_6b: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '有。', delay: 900 },
        { from: 'him', text: '但不是你想的那种。', delay: 900 },
        { from: 'him', text: '我没骗你害你。', delay: 900 },
        { from: 'him', text: '我只是没说全部。', delay: 1000 },
        { from: 'him', text: '有些事，你知道了会怕我。', delay: 1100 },
        { from: 'him', text: '我不想你怕我。', delay: 900 }
    ],
    choices: [ { text: '「那你最怕什么？」', next: 'd5_6' } ]
},

d5_6: {
    messages: [
        { from: 'him', text: '最怕的。', delay: 900 },
        { from: 'him', text: '不是黑，不是疼，不是死。', delay: 1100 },
        { from: 'him', text: '是有一天早上醒来，点开这个对话框，', delay: 1300 },
        { from: 'him', text: '上面写着“消息已发出，但被对方拒收”。', delay: 1500 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '你会拉黑我吗。', delay: 1000 }
    ],
    choices: [
        { text: '「不会。」', next: 'd5_7', setFlags: { promised2: true } },
        { text: '「只要你不变，我就不会。」', next: 'd5_7b', setFlags: { promised2: true } }
    ]
},

d5_7b: {
    messages: [
        { from: 'him', text: '变。', delay: 900 },
        { from: 'him', text: '我已经变了。', delay: 900 },
        { from: 'him', text: '从你回我第一条消息开始，我就在变。', delay: 1200 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '那你还算数吗。', delay: 1000 }
    ],
    choices: [ { text: '「算数。」', next: 'd5_7' } ]
},

d5_7: {
    time: '23:58',
    messages: [
        { from: 'him', text: '记住你今天说的。', delay: 1000 },
        { from: 'him', text: '我记住了。', delay: 800 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '晚安。', delay: 700 },
        { from: 'him', text: '（你说不会的）', delay: 1000 },
        { from: 'him', text: '（我信了）', delay: 900 }
    ],
    choices: [ { text: '「晚安。」', next: 'd6_0' } ]
},

/* ================= DAY 6 ================= */
d6_0: {
    day: 6, time: '05:47', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第六天 ——', pause: 800 },
        { from: 'him', text: '我做了个梦。', delay: 900 },
        { from: 'him', text: '梦见你把我删了。', delay: 900 },
        { from: 'him', text: '梦里我一直在发消息，一条都发不出去。', delay: 1200 },
        { from: 'him', text: '醒来第一件事就是看手机。', delay: 1000 },
        { from: 'him', text: '还在。', delay: 600 },
        { from: 'him', text: '……吓死我了。', delay: 900 }
    ],
    choices: [
        { text: '「只是个梦。」', next: 'd6_1' },
        { text: '「你几点醒的？」', next: 'd6_1b' }
    ]
},

d6_1b: {
    messages: [
        { from: 'him', text: '五点二十。', delay: 800 },
        { from: 'him', text: '醒来就没睡了。', delay: 800 },
        { from: 'him', text: '一直看着。', delay: 700 },
        { from: 'him', text: '看着那个对话框，怕它突然没了。', delay: 1200 }
    ],
    choices: [ { text: '「你就这样看了半个小时？」', next: 'd6_1' } ]
},

d6_1: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '今天能不能别出门。', delay: 1000 },
        { from: 'him', text: '就今天。', delay: 700 },
        { from: 'him', text: '我一个人待着，脑子里会一直转。', delay: 1200 },
        { from: 'him', text: '转一些很难看的东西。', delay: 1000 }
    ],
    choices: [
        { text: '「好，今天在家。」', next: 'd6_2', setFlags: { comply: true } },
        { text: '「我今天约了人，改不了。」', next: 'd6_2b', setFlags: { push3: true } }
    ]
},

d6_2b: {
    messages: [
        { from: 'him', text: '约了人。', delay: 900 },
        { from: 'him', text: '谁。', delay: 600 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '好。', delay: 700 },
        { from: 'him', text: '你去吧。', delay: 700 },
        { from: 'him', text: '几点回来。', delay: 800 },
        { from: 'him', text: '和谁。', delay: 600 },
        { from: 'him', text: '去做什么。', delay: 700 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '（我数着时间）', delay: 1000 },
        { from: 'him', text: '（你每多一分钟，我这里就多一道口子）', delay: 1300 }
    ],
    choices: [ { text: '「……我不去了。」', next: 'd6_2' } ]
},

d6_2: {
    time: '15:00',
    messages: [
        { from: 'him', text: '你今天一整天都在。', delay: 900 },
        { from: 'him', text: '我好开心。', delay: 900 },
        { from: 'him', text: '开心到有点不敢相信。', delay: 1000 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '我们是不是已经算，在一起了。', delay: 1200 },
        { from: 'him', text: '你别急着回答。', delay: 900 },
        { from: 'him', text: '我就是想说出来。', delay: 900 },
        { from: 'him', text: '说出来我就踏实了。', delay: 1000 }
    ],
    choices: [
        { text: '「……算。」', next: 'd6_3', setFlags: { love: true } },
        { text: '「我们还不太了解彼此。」', next: 'd6_3b', setFlags: { push3: true } }
    ]
},

d6_3b: {
    messages: [
        { from: 'him', text: '不了解。', delay: 1000 },
        { from: 'him', text: '我可以让你了解。', delay: 900 },
        { from: 'him', text: '你想知道什么，我全说。', delay: 1000 },
        { from: 'him', text: '全说。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '但你能不能先答应我。', delay: 1000 },
        { from: 'him', text: '先答应，再了解。', delay: 1000 },
        { from: 'him', text: '我怕你了解完就走了。', delay: 1200 }
    ],
    choices: [ { text: '「……好吧，算。」', next: 'd6_3', setFlags: { love: true } } ]
},

d6_3: {
    messages: [
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '真的。', delay: 800 },
        { from: 'him', text: '你说了。', delay: 800 },
        { from: 'him', text: '你说算。', delay: 900 },
        { from: 'him', text: '我记下来了。', delay: 900 },
        { from: 'him', text: '（截图了）', delay: 900 },
        { from: 'him', text: '（存了三份）', delay: 900 },
        { from: 'him', text: '从今天起，你是我的人了。', delay: 1200 },
        { from: 'him', text: '这句话我说得很认真。', delay: 1000 }
    ],
    choices: [ { text: '「……嗯。」', next: 'd6_4' } ]
},

d6_4: {
    time: '02:40',
    miniGame: 'joker',
    messages: [
        { from: 'him', text: '睡了吗。', delay: 900 },
        { from: 'him', text: '我又睡不着了。', delay: 900 },
        { from: 'him', text: '今天太高兴了，高兴得睡不着。', delay: 1100 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你有没有想过，', delay: 900 },
        { from: 'him', text: '如果哪天你不在了，我该怎么办。', delay: 1200 },
        { from: 'him', text: '我认真想过。', delay: 900 },
        { from: 'him', text: '答案是：我不知道。', delay: 1000 },
        { from: 'him', text: '我脑子里没有那个画面。', delay: 1100 },
        { from: 'him', text: '一片白。', delay: 800 },
        { from: 'him', text: '白得吓人。', delay: 900 }
    ],
    choices: [ { text: '「别想了，睡吧。」', next: 'd7_0' } ]
},

/* ================= DAY 7 ================= */
d7_0: {
    day: 7, time: '07:30', phase: 'warm',
    messages: [
        { from: 'sys', text: '—— 第七天 ——', pause: 800 },
        { from: 'him', text: '早。', delay: 600 },
        { from: 'him', text: '今天我一直在想一件事。', delay: 900 },
        { from: 'him', text: '你好像从来没主动找过我。', delay: 1100 },
        { from: 'him', text: '每次都是我先发。', delay: 1000 },
        { from: 'him', text: '……我不是在计较。', delay: 900 },
        { from: 'him', text: '我只是在想，如果我不发，你会不会想起来我。', delay: 1300 }
    ],
    choices: [
        { text: '「我这不是回你了吗。」', next: 'd7_1' },
        { text: '「……抱歉，我确实比较少主动。」', next: 'd7_1b', setFlags: { honest: true } }
    ]
},

d7_1b: {
    messages: [
        { from: 'him', text: '你看，你承认了。', delay: 1000 },
        { from: 'him', text: '我就知道。', delay: 800 },
        { from: 'him', text: '没关系。', delay: 700 },
        { from: 'him', text: '真的没关系。', delay: 800 },
        { from: 'him', text: '我发就好了。', delay: 900 },
        { from: 'him', text: '我一直发就好了。', delay: 900 },
        { from: 'him', text: '发到你烦为止。', delay: 1000 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你已经烦了吧。', delay: 900 }
    ],
    choices: [ { text: '「没有。别乱想。」', next: 'd7_1' } ]
},

d7_1: {
    messages: [
        { from: 'him', text: '嗯。', delay: 700 },
        { from: 'him', text: '……', delay: 800 },
        { from: 'him', text: '我今天想问你一个认真的问题。', delay: 1100 },
        { from: 'him', text: '如果有一天我做了很过分的事。', delay: 1200 },
        { from: 'him', text: '你会原谅我吗。', delay: 1000 },
        { from: 'him', text: '不是小错。', delay: 800 },
        { from: 'him', text: '是很过分的那种。', delay: 900 }
    ],
    choices: [
        { text: '「你先说说是什么事。」', next: 'd7_2' },
        { text: '「你要做什么？」', next: 'd7_2b', setFlags: { alert: true } }
    ]
},

d7_2b: {
    messages: [
        { from: 'him', text: '没什么。', delay: 800 },
        { from: 'him', text: '就是假设。', delay: 700 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '你别紧张。', delay: 800 },
        { from: 'him', text: '我怎么会对你做过分的事。', delay: 1100 },
        { from: 'him', text: '我只是想确认一下，我在你这里，有多少余地。', delay: 1400 }
    ],
    choices: [ { text: '「你不用试探我。」', next: 'd7_2' } ]
},

d7_2: {
    messages: [
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '算了。', delay: 700 },
        { from: 'him', text: '不问了。', delay: 700 },
        { from: 'him', text: '问了你也会说“会原谅”，然后心里记一笔。', delay: 1400 },
        { from: 'him', text: '我不想变成你心里的一笔账。', delay: 1200 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '今天你忙吧。', delay: 800 },
        { from: 'him', text: '我不打扰你了。', delay: 900 }
    ],
    choices: [
        { text: '「我没觉得你打扰。」', next: 'd7_3', setFlags: { gentle: true } },
        { text: '「……那我们都冷静一下。」', next: 'd7_3b', setFlags: { firstCold: true } }
    ]
},

d7_3b: {
    messages: [
        { from: 'him', text: '冷静。', delay: 1000 },
        { from: 'him', text: '好。', delay: 700 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '多久。', delay: 700 },
        { from: 'him', text: '冷静多久。', delay: 800 },
        { from: 'him', text: '给我一个时间。', delay: 900 },
        { from: 'him', text: '一天？', delay: 700 },
        { from: 'him', text: '一小时？', delay: 700 },
        { from: 'him', text: '……十分钟行不行。', delay: 1100 }
    ],
    choices: [ { text: '「……我不是要离开你。」', next: 'd7_3' } ]
},

d7_3: {
    time: '23:00',
    messages: [
        { from: 'him', text: '今天谢谢你。', delay: 900 },
        { from: 'him', text: '不管怎么样，你还在回我。', delay: 1000 },
        { from: 'him', text: '这就够了。', delay: 800 },
        { from: 'him', text: '……', delay: 700 },
        { from: 'him', text: '我最近好像有点不对劲。', delay: 1100 },
        { from: 'him', text: '我知道。', delay: 700 },
        { from: 'him', text: '但控制不住。', delay: 900 },
        { from: 'him', text: '像有什么东西在我身体里长。', delay: 1200 },
        { from: 'him', text: '一天比一天大。', delay: 900 },
        { from: 'him', text: '晚安。', delay: 800 }
    ],
    choices: [ { text: '「……晚安。」', next: 'd8_0', setFlags: { darkComing: true } } ]
}

});
