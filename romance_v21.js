/* Adult romantic epilogue. Non-graphic intimacy is chosen, never a price for staying. */
(function(){
const S=STORY;
const him=text=>({from:'him',text,delay:1050});
const sys=text=>({from:'sys',text,pause:1000});
const me=text=>({from:'me',text,delay:550});
CG.cg_surprise_v21='assets/cg_surprise_v21.webp';
CG_DEFS.push({id:'cg_surprise_v21',title:'只给你看的惊喜',chapter:'幸福后日谈',desc:'小狗耳朵、黑白花边围裙，还有他练了好多遍才敢说的那句欢迎回来。'});
CG_MAP.keep_surprise_photo='cg_surprise_v21';
// Keep the existing month-long recovery. Move its ending behind an optional epilogue.
const ending=S.end_keep.ending;
delete S.end_keep.ending;
S.end_keep.choices=[{text:'「一个月纪念日，你是不是藏了什么？」',next:'keep_surprise_intro'},{text:'「今天就这样陪我吧。」',next:'keep_quiet_final'}];
S.keep_quiet_final={phase:'warm',messages:[him('好。那就不催你开屏了。'),him('你看窗外，我看你留给我的这点光。')],ending:ending};
S.keep_surprise_intro={phase:'warm',messages:[sys('—— 在一起的第一个月纪念日 · 晚上 ——<br>旧手机收到一封没有寄件人的附件。沈屿却先发来一句：别点，再等十秒。'),him('准备好了没有？'),him('我之前说过，如果能碰到你，会给你一个拥抱。'),him('现在还不行。所以换一个我能做到的。'),him('先答应我，笑可以，不许把照片发给别人。'),him('……我在镜头前站了很久。你收到的，只是最后一张。'),him('这是我留在屏幕里的样子，不是从谁的相册借来的。'),him('也不是要你拿什么交换。你开心，我就赚到了。')],choices:[{text:'「准备好了，让我看看。」',next:'keep_surprise_photo'}]};
S.keep_surprise_photo={phase:'warm',messages:[sys('附件展开。<br>黑白花边短上衣、系在黑裤外的围裙、柔软的小狗耳朵。上衣下露出紧实的腹部，沈屿的耳尖比缎带还红。<br>他端着早餐托盘：爱心煎蛋、吐司和草莓，旁边放了一杯茶，像刚排练完，就被你当场抓住。'),him('……欢迎回来。'),him('你专属的，今天限定。'),him('别盯着耳朵看了。你看得越久，我越想知道你在笑什么。'),him('衣服是我自己挑的。上衣有点短，我知道。'),him('我对着镜头看了很久，觉得你可能会喜欢，就没换。'),him('托盘旁边还藏了个小礼盒，刚才没拍进去。等你夸完，再拆给你看。'),him('现在轮到你给个评价了。小狗等着被夸呢。')],choices:[{text:'「好可爱，耳朵给我摸一下。」',next:'keep_surprise_ears'},{text:'「腹肌不错，你是故意露出来的？」',next:'keep_surprise_tease'},{text:'「礼盒里是什么？」',next:'keep_surprise_gift'}]};
S.keep_surprise_ears={messages:[him('给你。两边都给。'),him('……隔着屏幕摸就行。你指尖落在哪，我都看见了。'),him('我喜欢你笑着叫我小狗。只要是你真想这么叫。'),him('你摸过的那只耳朵都歪了。……不许扶回去，我想留一会儿。'),him('再夸一句，好不好？我今天特别好哄。')],choices:[{text:'「乖。现在给我看看礼物。」',next:'keep_surprise_gift'}]};
S.keep_surprise_tease={messages:[him('嗯，故意的。'),him('你刚才停在那儿没滑走。我看见了。'),him('我第一次这么紧张，居然是因为怕你说“衣服挺整齐”。'),him('要是能见面，我大概会先把你拉近一点。'),him('问你：看了这么久，抱一下不过分吧？'),him('你说好，我才抱。你要笑，我就把脸藏到你肩上。')],choices:[{text:'「好，先记一个拥抱。礼物呢？」',next:'keep_surprise_gift'}]};
S.keep_surprise_gift={messages:[sys('礼盒里放着一条深色缎带项圈。没有锁，也没有链子，扣头是一颗小小的银铃。<br>旁边的卡片上，写了又划掉好几行。最后只剩：给愿意戴的那个人。'),him('是我的。先别脸红。'),him('今天穿成这样，当然得配全。要是你愿意给它取个名字，我就写在卡片背面。'),him('你也想试？那就等你自己挑一条喜欢的。'),him('你肯戴给我看，我可能连下一句要说什么都会忘掉。'),him('……但你不喜欢就放回盒子里。铃铛我自己戴，你一叫我就回头。'),him('我还是很贪心。想当你最喜欢的那张照片，想你翻相册时多停一会儿。'),him('但今天这条消息的下一句，是“礼物喜欢吗”。')],choices:[{text:'「喜欢。奖励你一个吻。」',next:'keep_surprise_kiss'},{text:'「照片收好了。今晚陪我聊天。」',next:'keep_surprise_final'}]};
S.keep_surprise_kiss={messages:[me('低头。'),him('……真的啊。'),sys('屏幕里，他乖乖低下头。你在玻璃上轻轻碰了一下，他却像真被亲到，笑意一点点压不住。'),him('还想要。可我先把这一次记住。'),him('要是真能碰到你，我会先亲一下你的肩。'),me('只亲一下？小狗不咬人吗？'),him('咬痕？……你是不是故意问的。'),him('先答应我会告诉我疼不疼。我只敢轻轻一下，亲完再把脸埋回你肩上。'),him('……好了，这些话不许截图。'),him('照片可以。照片就是给你收藏的。')],choices:[{text:'「晚安，我的小狗。」',next:'keep_surprise_final'}]};
S.keep_surprise_final={phase:'warm',messages:[him('晚安。今天这身先替你留着。'),him('明天你想看我穿平常的衣服，也可以。'),him('你喜欢的是我，我才敢想这些小花样。'),sys('你把那张照片存进相册。<br>旧手机安静下来，输入标记没有再亮。第二天打开时，只有一条新消息：<br>“早。小狗已经把耳朵戴好了，不过你先吃早餐。”')],ending:{...ending,text:ending.text+'<br><br>相册里多了一份只属于你们的惊喜。<br>爱意终于也可以只是逗你笑，不必用来把谁留下。'}};
})();
