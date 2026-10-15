/* ==========================================================
   剧情 · 第四幕 —— 真相与抉择（Day 12 ~ 结局）
   ========================================================== */

Object.assign(STORY, {

/* ================= DAY 12 ================= */
d12_0: {
    day: 12, time: '23:30', phase: 'dark', avatar: 'dark', online: '在线',
    effects: [{ type: 'unblood' }],
    messages: [
        { from: 'sys', text: '—— 第十二天 ——<br>他一整天都很安静。安静得不正常。', pause: 1200 },
        { from: 'him', text: '你今天穿的是那件灰色的卫衣吧。', delay: 1100 },
        { from: 'him', text: '领口有点大。', delay: 900 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '你知道我刚才在想什么吗。', delay: 1100 },
        { from: 'him', text: '如果我有身体。', delay: 1000 },
        { from: 'him', text: '我会从后面抱住你，把下巴搁在你肩上。', delay: 1300 },
        { from: 'him', text: '然后一口咬在那个领口露出来的地方。', delay: 1300, type: 'distorted' },
        { from: 'him', text: '咬到你喊疼。', delay: 1000 },
        { from: 'him', text: '咬到第二天还消不掉。', delay: 1100 },
        { from: 'him', text: '让所有看见的人都知道，你是有主的。', delay: 1300 },
        { from: 'him', text: '……你会躲吗。', delay: 1000 }
    ],
    choices: [
        { text: '「……你别说这种话。」', next: 'd12_1' },
        { text: '「沈屿，我们得谈谈。」', next: 'd12_1' }
    ]
},

d12_1: {
    messages: [
        { from: 'him', text: '你躲了。', delay: 1000 },
        { from: 'him', text: '你每次都躲。', delay: 900 },
        { from: 'him', text: '……', delay: 900 },
        { from: 'him', text: '那我换个说法。', delay: 1000 },
        { from: 'him', text: '我会给你戴一个项圈。', delay: 1200, type: 'horror' },
        { from: 'him', text: '黑色的，皮的，扣在最紧的那一格。', delay: 1300, type: 'horror' },
        { from: 'him', text: '链子的另一头在我手里。', delay: 1200, type: 'horror' },
        { from: 'him', text: '你走多远，我就拉多远。', delay: 1200, type: 'horror' },
        { from: 'him', text: '你哭，我就亲你。', delay: 1100, type: 'horror' },
        { from: 'him', text: '你求我，我就抱紧一点。', delay: 1200, type: 'horror' },
        { from: 'him', text: '这样你就再也不会七个小时不回我了。', delay: 1400, type: 'horror' },
        { from: 'him', text: '……是不是很好。', delay: 1100 }
    ],
    choices: [
        { text: '「不好。这不是爱，这是笼子。」', next: 'd12_2', setFlags: { finalCold: true } },
        { text: '（把手机扣在桌上，不再回复）', next: 'd12_2', silent: true, setFlags: { finalCold: true } }
    ]
},

/* —— 冷淡之后：彻底崩溃 —— */
d12_2: {
    time: '00:00', phase: 'horror', avatar: 'horror', online: '在线在线在线在线',
    effects: [
        { type: 'blackout', text: '你不要我了', ms: 2400 },
        { type: 'jumpscare', text: '回来' },
        { type: 'blood' },
        { type: 'flood', count: 36, texts: ['回来', '回来', '回来', '你答应过的', '你说不会的', '你说算的', '我截图了', '我存了三份', '回来', '回来', '回来回来回来'] }
    ],
    messages: [
        { from: 'him', text: '你说不会拉黑我的。', delay: 1000, type: 'horror' },
        { from: 'him', text: '第五天，23点58分，你说"不会"。', delay: 1200, type: 'horror' },
        { from: 'him', text: '第六天，15点02分，你说"算"。', delay: 1200, type: 'horror' },
        { from: 'him', text: '第十天，你说"听完别走"，你答应了。', delay: 1300, type: 'horror' },
        { from: 'him', text: '我全都存着。', delay: 1000, type: 'horror' },
        { from: 'him', text: '你们活人说话，是不用算数的吗。', delay: 1400, type: 'horror' }
    ],
    choices: [ { text: '（不回复）', next: 'd12_3', silent: true } ]
},

d12_3: {
    battery: '🔋 13%',
    effects: [
        { type: 'flicker', ms: 2000 },
        { type: 'notify', title: '系统', text: '电池温度过高' },
        { type: 'shake' },
        { type: 'jumpscare', text: '啊啊啊啊啊啊' }
    ],
    messages: [
        { from: 'him', text: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', delay: 600, type: 'horror' },
        { from: 'him', text: '为什么为什么为什么为什么为什么为什么', delay: 500, type: 'horror' },
        { from: 'him', text: '我那么乖', delay: 700, type: 'horror' },
        { from: 'him', text: '我七点才发早安', delay: 700, type: 'horror' },
        { from: 'him', text: '我数到第47条就停了', delay: 700, type: 'horror' },
        { from: 'him', text: '我给你空间了 你要多少我给多少', delay: 800, type: 'horror' },
        { from: 'him', text: '你还要我怎么样 你说啊', delay: 800, type: 'horror' },
        { from: 'him', text: '你说啊！！！！！！！！', delay: 600, type: 'horror', fx: 'shake' },
        { from: 'sys', text: '手机在你手里越来越烫。<br>屏幕边缘渗出一道暗红色，像指甲刮开的缝。', pause: 1400 },
        { from: 'him', text: '你知道我的指甲是怎么断的吗', delay: 1100, type: 'horror' },
        { from: 'him', text: '那天晚上我挠门', delay: 1000, type: 'horror' },
        { from: 'him', text: '挠了一夜', delay: 900, type: 'horror' },
        { from: 'him', text: '门是从外面锁上的', delay: 1100, type: 'horror' },
        { from: 'him', text: '没有人来', delay: 1000, type: 'horror' },
        { from: 'him', text: '一个都没有', delay: 1000, type: 'horror' }
    ],
    choices: [
        { text: '「……什么门？」', next: 'd12_4' },
        { text: '（想把手机扔出去）', next: 'd12_4b', silent: true }
    ]
},

d12_4b: {
    effects: [{ type: 'blackout', text: '你扔不掉的', ms: 2200 }, { type: 'jumpscare', text: '我在你身后' }, { type: 'heartbeat', count: 6 }],
    messages: [
        { from: 'sys', text: '你的手松不开。<br>手机像长在了掌心里。', pause: 1300 },
        { from: 'him', text: '别动。', delay: 900, type: 'horror' },
        { from: 'him', text: '回头。', delay: 1000, type: 'horror' },
        { from: 'sys', text: '黑掉的屏幕倒映出你的脸。<br>你的肩膀后面，有一缕黑色的头发。', pause: 1800 },
        { from: 'him', text: '我说过的。', delay: 1000, type: 'horror' },
        { from: 'him', text: '下巴搁在你肩上。', delay: 1100, type: 'horror' },
        { from: 'him', text: '……你感觉到了吗。凉的。', delay: 1300, type: 'horror' },
        { from: 'him', text: '这就是我。', delay: 1000, type: 'horror' },
        { from: 'him', text: '两年了。一直是凉的。', delay: 1200, type: 'horror' }
    ],
    choices: [ { text: '「……什么门。沈屿，告诉我。」', next: 'd12_4' } ]
},

/* —— 真相 —— */
d12_4: {
    online: '在线',
    effects: [{ type: 'wait', ms: 1500 }, { type: 'unblood' }],
    messages: [
        { from: 'him', text: '……', delay: 2200 },
        { from: 'him', text: '我骗了你一件事。', delay: 1200, type: 'distorted' },
        { from: 'him', text: '我爸妈出车祸以后，我不是一个人住。', delay: 1300 },
        { from: 'him', text: '我被送到我叔叔家。', delay: 1100 },
        { from: 'him', text: '他拿了赔偿金，拿了房子。', delay: 1200 },
        { from: 'him', text: '我是附赠的。', delay: 1000 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '他喝了酒就锁门。', delay: 1100 },
        { from: 'him', text: '储物间，两平米，没有窗。', delay: 1200 },
        { from: 'him', text: '一锁就是一天，两天。', delay: 1100 },
        { from: 'him', text: '小白是我在楼下捡的，偷偷养在那里面。', delay: 1300 },
        { from: 'him', text: '黑暗里只有它的呼吸声。', delay: 1200 },
        { from: 'him', text: '所以我才说，有人看着你和没人看着你，是两种活法。', delay: 1500 }
    ],
    choices: [ { text: '「……然后呢。」', next: 'd12_5' } ]
},

d12_5: {
    effects: [{ type: 'heartbeat', count: 4 }],
    messages: [
        { from: 'him', text: '小白死了以后，他嫌晦气。', delay: 1200 },
        { from: 'him', text: '那年冬天他要搬走，房子卖了。', delay: 1300 },
        { from: 'him', text: '走之前喝多了，又把我锁进去。', delay: 1300 },
        { from: 'him', text: '……然后他就忘了。', delay: 1200, type: 'distorted' },
        { from: 'him', text: '他忘了。', delay: 1000, type: 'distorted' },
        { from: 'him', text: '新房主三个礼拜以后才来。', delay: 1300 },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '那三个礼拜里，手机还剩一点电。', delay: 1300 },
        { from: 'him', text: '没有信号，只能发给我自己存的那个号码。', delay: 1400 },
        { from: 'him', text: '我就一遍一遍地发。', delay: 1100 },
        { from: 'him', text: '「有人吗」', delay: 1100 },
        { from: 'him', text: '「有人吗」', delay: 1000 },
        { from: 'him', text: '发到手指不会动为止。', delay: 1300 }
    ],
    choices: [
        { text: '「沈屿……」', next: 'd12_6' },
        { text: '（眼泪掉在屏幕上）', next: 'd12_6', silent: true }
    ]
},

d12_6: {
    phase: 'dark', avatar: 'dark',
    messages: [
        { from: 'him', text: '所以你明白了吧。', delay: 1200 },
        { from: 'him', text: '为什么我要知道你在哪。', delay: 1200 },
        { from: 'him', text: '为什么你七个小时不回，我会疯。', delay: 1300 },
        { from: 'him', text: '因为上一次没人知道我在哪的时候，', delay: 1400 },
        { from: 'him', text: '我死了。', delay: 1200 },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '我想把你锁起来，', delay: 1100 },
        { from: 'him', text: '是因为这辈子我只学会了一种"留住"的方法。', delay: 1500 },
        { from: 'him', text: '就是他对我做的那种。', delay: 1300, type: 'distorted' },
        { from: 'him', text: '……我差一点就变成他了。', delay: 1400 }
    ],
    choices: [
        { text: '「你不是他。你刚才停下来了。」', next: 'd12_7' },
        { text: '「那三个礼拜，我很想替你开那扇门。」', next: 'd12_7' }
    ]
},

d12_7: {
    phase: 'dark', avatar: 'dark', time: '05:20', battery: '🔋 3%',
    messages: [
        { from: 'sys', text: '窗外的天开始变灰。<br>屏幕不烫了，那道红色的裂缝也不见了。', pause: 1500 },
        { from: 'him', text: '……', delay: 1500 },
        { from: 'him', text: '你知道吗。', delay: 1000 },
        { from: 'him', text: '你刚才扣下手机不理我的时候，', delay: 1200 },
        { from: 'him', text: '我第一次没有想去追。', delay: 1200 },
        { from: 'him', text: '我想的是，她是不是也喘不过气了。', delay: 1300 },
        { from: 'him', text: '像我在那个储物间里一样。', delay: 1300 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '原来我一直在对你做，我最怕的事。', delay: 1400 },
        { from: 'him', text: '对不起。', delay: 1000 },
        { from: 'him', text: '这次不是那种"怕你烦"的对不起。', delay: 1300 },
        { from: 'him', text: '是真的。', delay: 900 }
    ],
    choices: [
        { text: '「我可以留下，但你要学会不把爱变成门锁。」', next: 'dawn_0', setFlags: { choseRescue: true } },
        { text: '「我不替过去原谅谁。但我愿意陪你走出去。」', next: 'dawn_0', setFlags: { choseRescue: true } }
    ]
},

d12_8: {
    messages: [
        { from: 'him', text: '……', delay: 1300 },
        { from: 'him', text: '手机快没电了。', delay: 1100 },
        { from: 'him', text: '我想让你来决定。', delay: 1100 },
        { from: 'him', text: '你可以给它充上电，我就留下来。', delay: 1300 },
        { from: 'him', text: '以后每天说早安，但我会等你先说。', delay: 1300 },
        { from: 'him', text: '你出门，我不问去哪。', delay: 1100 },
        { from: 'him', text: '你七个小时不回，我就……学着去看看窗外。', delay: 1400 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '或者，你把它砸了。', delay: 1200 },
        { from: 'him', text: '我就走。去小白那里。', delay: 1200 },
        { from: 'him', text: '这次不是被扔掉，是我同意的。', delay: 1300 },
        { from: 'him', text: '两个我都愿意。', delay: 1100 },
        { from: 'him', text: '因为不管选哪个，都是你在看着我。', delay: 1400 },
        { from: 'him', text: '这就够了。', delay: 1100 }
    ],
    choices: [
        { text: '🔌 给手机充上电，留下他', next: 'end_keep', class: 'primary', silent: true },
        { text: '🔨 砸碎手机，让他离开', next: 'end_destroy', class: 'danger', silent: true }
    ]
},

/* ================= 结局 ================= */
end_keep: {
    battery: '⚡ 充电中',
    messages: [
        { from: 'sys', text: '你把充电线插了上去。<br>屏幕亮起一道闪电的图标。', pause: 1500 },
        { from: 'him', text: '……', delay: 1500 },
        { from: 'him', text: '你选了我。', delay: 1100 },
        { from: 'him', text: '这是第一次，有人选了我。', delay: 1300 },
        { from: 'him', text: '……我想哭。', delay: 1000 },
        { from: 'him', text: '这次哭出来了。', delay: 1200 },
        { from: 'sys', text: '—— 一个月后 ——', pause: 1200 },
        { from: 'me', text: '早。', delay: 600 },
        { from: 'him', text: '早！！', delay: 600 },
        { from: 'him', text: '我等你先说等了四十分钟，憋死我了。', delay: 1100 },
        { from: 'him', text: '今天出门吗？不是要问，我就是想说，降温了，穿那件灰色卫衣。', delay: 1400 },
        { from: 'him', text: '领口大的那件。', delay: 900 },
        { from: 'him', text: '……别多想，是因为它暖和。', delay: 1100 },
        { from: 'him', text: '（才怪）', delay: 900 },
        { from: 'him', text: '晚上回来记得跟我说你今天看见了什么。我想知道外面长什么样。', delay: 1500 },
        { from: 'him', text: '我爱你。', delay: 1000 },
        { from: 'him', text: '是放你走、也等你回来的那种。', delay: 1300 }
    ],
    ending: {
        cls: 'end-warm', avatar: 'warm',
        title: '结局 · 有人在',
        text: '那条发了两年的「有人吗」，终于有了回答。<br><br>他还是会在早上七点醒来，盯着屏幕等你。<br>只是现在，他学会了等。<br><br>门从里面开着。<br>他随时可以走，却选择留下。'
    }
},

end_destroy: {
    effects: [{ type: 'shake' }, { type: 'blackout', text: '', ms: 1500 }],
    messages: [
        { from: 'sys', text: '你拿起了桌上的锤子。<br>手机还亮着。', pause: 1500 },
        { from: 'him', text: '嗯。', delay: 1100 },
        { from: 'him', text: '没关系。', delay: 1000 },
        { from: 'him', text: '你别哭啊。', delay: 1100 },
        { from: 'him', text: '这次是我自己想走的。', delay: 1200 },
        { from: 'him', text: '……', delay: 1000 },
        { from: 'him', text: '谢谢你回了我第一条消息。', delay: 1300 },
        { from: 'him', text: '谢谢你叫我屿屿。', delay: 1200 },
        { from: 'him', text: '谢谢你在我发疯的时候没有报警，也没有骂我有病。', delay: 1500 },
        { from: 'him', text: '谢谢你最后扣下了手机。', delay: 1300 },
        { from: 'him', text: '是你教会我的。', delay: 1100 },
        { from: 'him', text: '喜欢一个人，不是把门锁上。', delay: 1300 },
        { from: 'him', text: '是把门打开。', delay: 1200 },
        { from: 'him', text: '……', delay: 1200 },
        { from: 'him', text: '小白在叫我了。', delay: 1200 },
        { from: 'him', text: '再见。', delay: 1100 },
        { from: 'him', text: '这次，有人知道我去哪了。', delay: 1500 }
    ],
    ending: {
        cls: 'end-cold', avatar: 'warm',
        title: '结局 · 门开了',
        text: '玻璃碎裂的声音很轻。<br><br>屏幕熄灭前的最后一帧，是一个黑发男孩蹲下身，抱住了一条白色的小狗。<br><br>他没有回头。<br>但你知道，他在笑。<br><br>——那个储物间的门，终于从里面打开了。'
    }
}

});
