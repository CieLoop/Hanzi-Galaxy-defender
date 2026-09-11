import { HanziWord, ExampleSentence } from '../types';

/**
 * Curated authentic example sentences tailored directly to the learner's HSK level:
 * - HSK 1: Very short (3-6 chars), basic grammar (S+V+O / S+Adj), everyday beginner vocabulary.
 * - HSK 2: Short daily conversational sentences (5-9 chars), simple practical situations.
 * - HSK 3: Clear intermediate phrases (7-12 chars), natural everyday topics.
 * - HSK 4: Upper-intermediate sentences with common idioms and practical expressions.
 * - HSK 5: Advanced practical sentences for work and discussion.
 * - HSK 6: Proficient sentences with nuanced vocabulary.
 * - HSK 7-9: Literary expressions and traditional idioms (Chengyu).
 */
export const CURATED_SENTENCES: Record<string, ExampleSentence> = {
  // === HSK 1: Core Basics (Simple 3-6 words, beginner vocabulary) ===
  '你': { hanzi: '你好！很高兴认识你。', pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.', english: 'Hello! Nice to meet you.' },
  '好': { hanzi: '今天天气很好。', pinyin: 'Jīntiān tiānqì hěn hǎo.', english: 'The weather is very good today.' },
  '你好': { hanzi: '你好，老师！', pinyin: 'Nǐ hǎo, lǎoshī!', english: 'Hello, teacher!' },
  '我': { hanzi: '我是学生。', pinyin: 'Wǒ shì xuésheng.', english: 'I am a student.' },
  '他': { hanzi: '他是我的好朋友。', pinyin: 'Tā shì wǒ de hǎo péngyou.', english: 'He is my good friend.' },
  '她': { hanzi: '她喜欢看书。', pinyin: 'Tā xǐhuan kàn shū.', english: 'She likes reading books.' },
  '我们': { hanzi: '我们一起去学校。', pinyin: 'Wǒmen yìqǐ qù xuéxiào.', english: 'We go to school together.' },
  '他们': { hanzi: '他们都在中国。', pinyin: 'Tāmen dōu zài Zhōngguó.', english: 'They are all in China.' },
  '是': { hanzi: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', english: 'This is my book.' },
  '不': { hanzi: '我不喝咖啡。', pinyin: 'Wǒ bù hē kāfēi.', english: 'I do not drink coffee.' },
  '有': { hanzi: '我有一只小猫。', pinyin: 'Wǒ yǒu yì zhī xiǎo māo.', english: 'I have a little cat.' },
  '看': { hanzi: '我看中国电影。', pinyin: 'Wǒ kàn Zhōngguó diànyǐng.', english: 'I watch Chinese movies.' },
  '听': { hanzi: '请听老师说。', pinyin: 'Qǐng tīng lǎoshī shuō.', english: 'Please listen to the teacher speak.' },
  '说': { hanzi: '他说中文。', pinyin: 'Tā shuō zhōngwén.', english: 'He speaks Chinese.' },
  '读': { hanzi: '我们一起读课文。', pinyin: 'Wǒmen yìqǐ dú kèwén.', english: 'Let us read the lesson text together.' },
  '写': { hanzi: '我会写汉字。', pinyin: 'Wǒ huì xiě hànzì.', english: 'I can write Chinese characters.' },
  '叫': { hanzi: '我叫大卫。', pinyin: 'Wǒ jiào Dàwèi.', english: 'My name is David.' },
  '买': { hanzi: '我想买一个苹果。', pinyin: 'Wǒ xiǎng mǎi yí gè píngguǒ.', english: 'I want to buy an apple.' },
  '吃': { hanzi: '我喜欢吃米饭。', pinyin: 'Wǒ xǐhuan chī mǐfàn.', english: 'I like eating rice.' },
  '喝': { hanzi: '请喝温水。', pinyin: 'Qǐng hē wēn shuǐ.', english: 'Please drink warm water.' },
  '走': { hanzi: '我们慢慢走。', pinyin: 'Wǒmen mànmàn zǒu.', english: 'We walk slowly.' },
  '坐': { hanzi: '请坐，喝茶。', pinyin: 'Qǐng zuò, hē chá.', english: 'Please sit down and drink tea.' },
  '来': { hanzi: '欢迎来北京！', pinyin: 'Huānyíng lái Běijīng!', english: 'Welcome to Beijing!' },
  '去': { hanzi: '他去商店了。', pinyin: 'Tā qù shāngdiàn le.', english: 'He went to the shop.' },
  '做': { hanzi: '你在做什么？', pinyin: 'Nǐ zài zuò shénme?', english: 'What are you doing?' },
  '想': { hanzi: '我想学中文。', pinyin: 'Wǒ xiǎng xué zhōngwén.', english: 'I want to learn Chinese.' },
  '水': { hanzi: '我想喝水。', pinyin: 'Wǒ xiǎng hē shuǐ.', english: 'I want to drink water.' },
  '火': { hanzi: '小心火，很热。', pinyin: 'Xiǎoxīn huǒ, hěn rè.', english: 'Be careful with fire, it is hot.' },
  '茶': { hanzi: '爸爸喜欢喝茶。', pinyin: 'Bàba xǐhuan hē chá.', english: 'Dad likes drinking tea.' },
  '米饭': { hanzi: '我们吃米饭吧。', pinyin: 'Wǒmen chī mǐfàn ba.', english: 'Let us eat rice.' },
  '苹果': { hanzi: '这个苹果很甜。', pinyin: 'Zhè gè píngguǒ hěn tián.', english: 'This apple is very sweet.' },
  '中国': { hanzi: '中国很大。', pinyin: 'Zhōngguó hěn dà.', english: 'China is very big.' },
  '北京': { hanzi: '他在北京上大学。', pinyin: 'Tā zài Běijīng shàng dàxué.', english: 'He attends university in Beijing.' },
  '学校': { hanzi: '这是我的学校。', pinyin: 'Zhè shì wǒ de xuéxiào.', english: 'This is my school.' },
  '老师': { hanzi: '张老师好！', pinyin: 'Zhāng lǎoshī hǎo!', english: 'Hello, Teacher Zhang!' },
  '学生': { hanzi: '我们都是好学生。', pinyin: 'Wǒmen dōu shì hǎo xuésheng.', english: 'We are all good students.' },
  '朋友': { hanzi: '他是我的好朋友。', pinyin: 'Tā shì wǒ de hǎo péngyou.', english: 'He is my good friend.' },
  '医生': { hanzi: '妈妈是医生。', pinyin: 'Māma shì yīshēng.', english: 'Mom is a doctor.' },
  '爸爸': { hanzi: '爸爸去上班了。', pinyin: 'Bàba qù shàngbān le.', english: 'Dad went to work.' },
  '妈妈': { hanzi: '妈妈爱我。', pinyin: 'Māma ài wǒ.', english: 'Mom loves me.' },
  '儿子': { hanzi: '他的儿子五岁了。', pinyin: 'Tā de érzi wǔ suì le.', english: 'His son is five years old.' },
  '女儿': { hanzi: '她的女儿很聪明。', pinyin: 'Tā de nǚ\'ér hěn cōngming.', english: 'Her daughter is very smart.' },
  '猫': { hanzi: '这只猫很可爱。', pinyin: 'Zhè zhī māo hěn kě\'ài.', english: 'This cat is very cute.' },
  '狗': { hanzi: '我家有一只小狗。', pinyin: 'Wǒ jiā yǒu yì zhī xiǎogǒu.', english: 'My family has a little puppy.' },
  '大': { hanzi: '这个西瓜很大。', pinyin: 'Zhè gè xīguā hěn dà.', english: 'This watermelon is big.' },
  '小': { hanzi: '这只鸟很小。', pinyin: 'Zhè zhī niǎo hěn xiǎo.', english: 'This bird is small.' },
  '多': { hanzi: '今天人很多。', pinyin: 'Jīntiān rén hěn duō.', english: 'There are many people today.' },
  '少': { hanzi: '这里的车很少。', pinyin: 'Zhèlǐ de chē hěn shǎo.', english: 'There are very few cars here.' },
  '冷': { hanzi: '今天很冷。', pinyin: 'Jīntiān hěn lěng.', english: 'Today is cold.' },
  '热': { hanzi: '夏天天气很热。', pinyin: 'Xiàtiān tiānqì hěn rè.', english: 'In summer the weather is hot.' },
  '高兴': { hanzi: '今天我很高兴。', pinyin: 'Jīntiān wǒ hěn gāoxìng.', english: 'Today I am very happy.' },
  '今天': { hanzi: '今天星期一。', pinyin: 'Jīntiān xīngqīyī.', english: 'Today is Monday.' },
  '明天': { hanzi: '明天见！', pinyin: 'Míngtiān jiàn!', english: 'See you tomorrow!' },
  '昨天': { hanzi: '昨天是晴天。', pinyin: 'Zuótiān shì qíngtiān.', english: 'Yesterday was sunny.' },
  '年': { hanzi: '一年有十二个月。', pinyin: 'Yì nián yǒu shí\'èr gè yuè.', english: 'A year has twelve months.' },
  '月': { hanzi: '这个月我很忙。', pinyin: 'Zhè gè yuè wǒ hěn máng.', english: 'I am busy this month.' },
  '日': { hanzi: '今天是十月一日。', pinyin: 'Jīntiān shì shí yuè yī rì.', english: 'Today is October 1st.' },
  '书': { hanzi: '这是一本好书。', pinyin: 'Zhè shì yì běn hǎo shū.', english: 'This is a good book.' },
  '飞机': { hanzi: '我坐飞机去北京。', pinyin: 'Wǒ zuò fēijī qù Běijīng.', english: 'I take a plane to Beijing.' },
  '谢谢': { hanzi: '谢谢你帮我！', pinyin: 'Xièxie nǐ bāng wǒ!', english: 'Thank you for helping me!' },
  '不客气': { hanzi: '不客气，请进！', pinyin: 'Bú kèqi, qǐng jìn!', english: 'You are welcome, please come in!' },
  '再见': { hanzi: '明天见，再见！', pinyin: 'Míngtiān jiàn, zàijiàn!', english: 'See you tomorrow, goodbye!' },
  '对不起': { hanzi: '对不起，我来晚了。', pinyin: 'Duìbuqǐ, wǒ lái wǎn le.', english: 'Sorry, I came late.' },
  '没关系': { hanzi: '没关系，别担心。', pinyin: 'Méi guānxi, bié dānxīn.', english: 'It does not matter, do not worry.' },

  // === HSK 2: Elementary (Everyday conversational, 5-9 words) ===
  '帮助': { hanzi: '谢谢你的帮助。', pinyin: 'Xièxie nǐ de bāngzhù.', english: 'Thank you for your help.' },
  '唱歌': { hanzi: '她很喜欢唱歌。', pinyin: 'Tā hěn xǐhuan chànggē.', english: 'She likes singing very much.' },
  '跳舞': { hanzi: '我们一起跳舞吧！', pinyin: 'Wǒmen yìqǐ tiàowǔ ba!', english: 'Let us dance together!' },
  '旅游': { hanzi: '我想去中国旅游。', pinyin: 'Wǒ xiǎng qù Zhōngguó lǚyóu.', english: 'I want to travel to China.' },
  '运动': { hanzi: '多做运动身体好。', pinyin: 'Duō zuò yùndòng shēntǐ hǎo.', english: 'Doing more exercise is good for health.' },
  '跑步': { hanzi: '他每天早上在公园跑步。', pinyin: 'Tā měitiān zǎoshang zài gōngyuán pǎobù.', english: 'He jogs in the park every morning.' },
  '游泳': { hanzi: '夏天我们去游泳吧。', pinyin: 'Xiàtiān wǒmen qù yóuyǒng ba.', english: 'Let us go swimming in summer.' },
  '时间': { hanzi: '你现在有时间吗？', pinyin: 'Nǐ xiànzài yǒu shíjiān ma?', english: 'Do you have time right now?' },
  '手表': { hanzi: '这块手表很漂亮。', pinyin: 'Zhè kuài shǒubiǎo hěn piàoliang.', english: 'This watch is very pretty.' },
  '手机': { hanzi: '我的手机没电了。', pinyin: 'Wǒ de shǒujī méi diàn le.', english: 'My phone has run out of battery.' },
  '电脑': { hanzi: '他用电脑做作业。', pinyin: 'Tā yòng diànnǎo zuò zuòyè.', english: 'He uses the computer to do homework.' },
  '电影': { hanzi: '今晚我们去看电影吧。', pinyin: 'Jīnwǎn wǒmen qù kàn diànyǐng ba.', english: 'Let us go watch a movie tonight.' },
  '天气': { hanzi: '今天天气真好。', pinyin: 'Jīntiān tiānqì zhēn hǎo.', english: 'The weather is really nice today.' },
  '下雨': { hanzi: '外面下雨了，带把伞。', pinyin: 'Wàimiàn xiàyǔ le, dài bǎ sǎn.', english: 'It is raining outside, take an umbrella.' },
  '晴天': { hanzi: '明天是晴天，可以去公园。', pinyin: 'Míngtiān shì qíngtiān, kěyǐ qù gōngyuán.', english: 'Tomorrow is sunny, we can go to the park.' },
  '便宜': { hanzi: '这件衣服很便宜。', pinyin: 'Zhè jiàn yīfu hěn piányi.', english: 'This piece of clothing is cheap.' },
  '贵': { hanzi: '这个手机太贵了。', pinyin: 'Zhè gè shǒujī tài guì le.', english: 'This phone is too expensive.' },
  '准备': { hanzi: '你准备好了吗？', pinyin: 'Nǐ zhǔnbèi hǎo le ma?', english: 'Are you ready?' },
  '希望': { hanzi: '我希望能学好中文。', pinyin: 'Wǒ xīwàng néng xuéhǎo zhōngwén.', english: 'I hope I can learn Chinese well.' },
  '开始': { hanzi: '我们开始上课吧。', pinyin: 'Wǒmen kāishǐ shàngkè ba.', english: 'Let us start class now.' },
  '结束': { hanzi: '考试很快就结束了。', pinyin: 'Kǎoshì hěn kuài jiù jiéshù le.', english: 'The exam finished very quickly.' },
  '火车站': { hanzi: '我们在火车站门口见。', pinyin: 'Wǒmen zài huǒchēzhàn ménkǒu jiàn.', english: 'See you at the train station entrance.' },
  '机场': { hanzi: '他坐出租车去机场接朋友。', pinyin: 'Tā zuò chūzūchē qù jīchǎng jiē péngyou.', english: 'He took a taxi to the airport to meet a friend.' },
  '公共汽车': { hanzi: '我每天坐公共汽车上班。', pinyin: 'Wǒ měitiān zuò gōnggòng qìchē shàngbān.', english: 'I take the bus to work every day.' },
  '自行车': { hanzi: '哥哥骑自行车去上学。', pinyin: 'Gēge qí zìxíngchē qù shàngxué.', english: 'Older brother rides a bicycle to school.' },
  '医院': { hanzi: '身体不舒服要去医院看医生。', pinyin: 'Shēntǐ bù shūfu yào qù yīyuàn kàn yīshēng.', english: 'If you feel unwell, go to the hospital to see a doctor.' },
  '饭馆': { hanzi: '我们去那家饭馆吃午饭吧。', pinyin: 'Wǒmen qù nà jiā fànguǎn chī wǔfàn ba.', english: 'Let us go eat lunch at that restaurant.' },
  '生病': { hanzi: '他生病了，在家里休息。', pinyin: 'Tā shēngbìng le, zài jiālǐ xiūxi.', english: 'He is sick and resting at home.' },
  '身体': { hanzi: '祝你身体健康！', pinyin: 'Zhù nǐ shēntǐ jiànkāng!', english: 'Wish you good health!' },
  '药': { hanzi: '记得按时吃药。', pinyin: 'Jìde ànshí chī yào.', english: 'Remember to take your medicine on time.' },
  '休息': { hanzi: '累了就去休息一会儿。', pinyin: 'Lèi le jiù qù xiūxi yíhuìr.', english: 'Go rest for a while if you are tired.' },
  '起床': { hanzi: '我每天早上七点起床。', pinyin: 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng.', english: 'I get up at 7:00 every morning.' },
  '睡觉': { hanzi: '时间不早了，快去睡觉。', pinyin: 'Shíjiān bù zǎo le, kuài qù shuìjiào.', english: 'It is late, quickly go to sleep.' },
  '穿': { hanzi: '今天很冷，多穿件衣服。', pinyin: 'Jīntiān hěn lěng, duō chuān jiàn yīfu.', english: 'It is cold today, put on an extra layer.' },
  '衣服': { hanzi: '这件衣服很好看。', pinyin: 'Zhè jiàn yīfu hěn hǎokàn.', english: 'This piece of clothing looks very nice.' },
  '妻子': { hanzi: '他和妻子一起散步。', pinyin: 'Tā hé qīzi yìqǐ sànbù.', english: 'He takes a walk together with his wife.' },
  '丈夫': { hanzi: '她的丈夫是一位工程师。', pinyin: 'Tā de zhàngfu shì yí wèi gōngchéngshī.', english: 'Her husband is an engineer.' },
  '懂': { hanzi: '老师讲的话，我都听懂了。', pinyin: 'Lǎoshī jiǎng de huà, wǒ dōu tīngdǒng le.', english: 'I understood everything the teacher explained.' },

  // === HSK 3: Intermediate (Clear, natural everyday context) ===
  '环境': { hanzi: '我们学校的环境非常安静。', pinyin: 'Wǒmen xuéxiào de huánjìng fēicháng ānjìng.', english: 'Our school\'s environment is very quiet.' },
  '解决': { hanzi: '这个问题很容易解决。', pinyin: 'Zhè gè wèntí hěn róngyì jiějué.', english: 'This problem is easy to solve.' },
  '历史': { hanzi: '我对中国历史很感兴趣。', pinyin: 'Wǒ duì Zhōngguó lìshǐ hěn gǎn xìngqù.', english: 'I am very interested in Chinese history.' },
  '努力': { hanzi: '只要努力学习，就会有进步。', pinyin: 'Zhǐyào nǔlì xuéxí, jiù huì yǒu jìnbù.', english: 'As long as you study hard, you will make progress.' },
  '热情': { hanzi: '这里的朋友都很热情。', pinyin: 'Zhèlǐ de péngyou dōu hěn rèqíng.', english: 'The friends here are all very enthusiastic.' },
  '聪明': { hanzi: '小明是一个聪明的孩子。', pinyin: 'Xiǎomíng shì yí gè cōngming de háizi.', english: 'Xiaoming is a clever child.' },
  '简单': { hanzi: '这次考试的题目挺简单的。', pinyin: 'Zhè cì kǎoshì de tímù tǐng jiǎndān de.', english: 'The questions on this test were quite simple.' },
  '健康': { hanzi: '多吃水果蔬菜有利于健康。', pinyin: 'Duō chī shuǐguǒ shūcài yǒulì yú jiànkāng.', english: 'Eating more fruits and vegetables benefits health.' },
  '满意': { hanzi: '老师对我的考试成绩很满意。', pinyin: 'Lǎoshī duì wǒ de kǎoshì chéngjì hěn mǎnyì.', english: 'The teacher is very pleased with my test score.' },
  '相信': { hanzi: '我相信你一定能做到。', pinyin: 'Wǒ xiāngxìn nǐ yídìng néng zuòdào.', english: 'I believe you can definitely do it.' },
  '决定': { hanzi: '我决定下个月去旅行。', pinyin: 'Wǒ juédìng xià gè yuè qù lǚxíng.', english: 'I decided to go on a trip next month.' },
  '清楚': { hanzi: '黑板上的字写得很清楚。', pinyin: 'Hēibǎn shàng de zì xiě de hěn qīngchu.', english: 'The words on the blackboard are written very clearly.' },
  '习惯': { hanzi: '我习惯每天早起看书。', pinyin: 'Wǒ xíguàn měitiān zǎoqǐ kàn shū.', english: 'I am used to getting up early every day to read.' },
  '提高': { hanzi: '每天听中文广播能提高听力。', pinyin: 'Měitiān tīng zhōngwén guǎngbō néng tígāo tīnglì.', english: 'Listening to Chinese radio daily improves listening skills.' },

  // === HSK 4: Upper-Intermediate (Practical, expressive) ===
  '坚持': { hanzi: '坚持每天练习，就会取得好成绩。', pinyin: 'Jiānchí měitiān liànxí, jiù huì qǔdé hǎo chéngjì.', english: 'Persisting in daily practice leads to good marks.' },
  '成功': { hanzi: '经过大家的努力，活动圆满成功了。', pinyin: 'Jīngguò dàjiā de nǔlì, huódòng yuánmǎn chénggōng le.', english: 'Through everyone\'s effort, the event succeeded.' },
  '态度': { hanzi: '认真的态度能帮助我们把事情做好。', pinyin: 'Rènzhēn de tàidu néng bāngzhù wǒmen bǎ shìqing zuò hǎo.', english: 'A serious attitude helps us do things well.' },
  '经验': { hanzi: '老师在教学上有丰富的经验。', pinyin: 'Lǎoshī zài jiàoxué shàng yǒu fēngfù de jīngyàn.', english: 'The teacher has rich experience in teaching.' },
  '关键': { hanzi: '找到问题的原因是解决它的关键。', pinyin: 'Zhǎodào wèntí de yuányīn shì jiějué tā de guānjiàn.', english: 'Finding the cause of the problem is key to solving it.' },
  '考虑': { hanzi: '请大家认真考虑这个建议。', pinyin: 'Qǐng dàjiā rènzhēn kǎolǜ zhè gè jiànyì.', english: 'Please consider this suggestion seriously.' },
  '安排': { hanzi: '今天的会议时间已经安排好了。', pinyin: 'Jīntiān de huìyì shíjiān yǐjīng ānpái hǎo le.', english: 'Today\'s meeting time has already been arranged.' },
  '负责': { hanzi: '他是一个对工作非常负责的人。', pinyin: 'Tā shì yí gè duì gōngzuò fēicháng fùzé de rén.', english: 'He is someone who is very responsible about work.' },

  // === HSK 5: Advanced Fluency (Clear professional & formal usage) ===
  '把握': { hanzi: '我们要把握好这次难得的学习机会。', pinyin: 'Wǒmen yào bǎwò hǎo zhè cì nándé de xuéxí jīhuì.', english: 'We must grasp this rare opportunity to learn.' },
  '彼此': { hanzi: '朋友之间要彼此信任，互相支持。', pinyin: 'Péngyou zhījiān yào bǐcǐ xìnrèn, hùxiāng zhīchí.', english: 'Friends should trust each other and support each other.' },
  '效率': { hanzi: '合理安排时间可以大大提高工作效率。', pinyin: 'Hélǐ ānpái shíjiān kěyǐ dàdà tígāo gōngzuò xiàolǜ.', english: 'Arranging time reasonably can greatly improve work efficiency.' },
  '趋势': { hanzi: '绿色低碳出行是未来城市的发展趋势。', pinyin: 'Lǜsè dītàn chūxíng shì wèilái chéngshì de fāzhǎn qūshì.', english: 'Green low-carbon travel is the development trend of future cities.' },
  '充分': { hanzi: '我们需要做好充分的准备来迎接挑战。', pinyin: 'Wǒmen xūyào zuò hǎo chōngfèn de zhǔnbèi lái yíngjiē tiǎozhàn.', english: 'We need to make ample preparations to meet the challenge.' },

  // === HSK 6: Proficient (Rich vocabulary, natural prose) ===
  '崩溃': { hanzi: '突发断电导致电脑系统暂时崩溃了。', pinyin: 'Tūfā duàndiàn dǎozhì diànnǎo xìtǒng zànshí bēngkuì le.', english: 'A sudden power outage caused the computer system to temporarily crash.' },
  '和谐': { hanzi: '人与自然和谐共处是大家共同的心愿。', pinyin: 'Rén yǔ zìrán héxié gòngchǔ shì dàjiā gòngtóng de xīnyuàn.', english: 'Living in harmony between humans and nature is everyone\'s shared wish.' },
  '捍卫': { hanzi: '每个人都应当勇敢捍卫自己的合法权益。', pinyin: 'Měi gè rén dōu yīngdāng yǒnggǎn hànwèi zìjǐ de héfǎ quányì.', english: 'Everyone should bravely defend their legitimate rights.' },
  '宏观': { hanzi: '分析经济形势需要具备更宽广的宏观眼光。', pinyin: 'Fēnxī jīngjì xíngshì xūyào jùbèi gèng kuānguǎng de hóngguān yǎnguāng.', english: 'Analyzing economic trends requires a broader macroscopic perspective.' },

  // === HSK 7-9: Mastery & Idioms (Chengyu, literary nuance) ===
  '秉持': { hanzi: '我们始终秉持诚实守信与合作共赢的原则。', pinyin: 'Wǒmen shǐzhōng bǐngchí chéngshí-shǒuxìn yǔ hézuò-gòngyíng de yuánzé.', english: 'We consistently uphold the principles of honesty and win-win cooperation.' },
  '脉络': { hanzi: '理清文章的脉络有助于深刻把握作者的中心思想。', pinyin: 'Lǐqīng wénzhāng de màiluò yǒuzhù yú shēnkè bǎwò zuòzhě de zhōngxīn sīxiǎng.', english: 'Clarifying the article\'s thread helps grasp the author\'s core message.' },
  '融会贯通': { hanzi: '多读书、多思考，才能把所学知识融会贯通。', pinyin: 'Duō dúshū, duō sīkǎo, cái néng bǎ suǒxué zhīshi rónghuì-guàntōng.', english: 'Reading and thinking more allows one to synthesize and master learned knowledge.' },
  '未雨绸缪': { hanzi: '面对未知的变化，我们要未雨绸缪，提早做好规划。', pinyin: 'Miànduì wèizhī de biànhuà, wǒmen yào wèiyǔ-chóumóu, tízǎo zuòhǎo guīhuà.', english: 'Facing unknown changes, we must take precautions beforehand and plan early.' },
  '潜移默化': { hanzi: '良好的家庭环境在潜移默化中塑造着青少年的品格。', pinyin: 'Liánghǎo de jiātíng huánjìng zài qiányí-mòhuà zhōng sùzàozhe qīngshàonián de pǐngé.', english: 'A good family environment shapes youth character imperceptibly.' },
};

/**
 * Fallback generator strictly conditioned on the word's HSK level:
 * - HSK 1: Very simple (3-5 words), no complex grammar or obscure terms.
 * - HSK 2: Everyday conversational phrases (5-8 words).
 * - HSK 3: Intermediate level.
 * - HSK 4+: Advanced level.
 */
function createSmartSentence(word: HanziWord): ExampleSentence {
  const hz = word.hanzi;
  const py = word.pinyin;
  const eng = word.english;
  const level = word.hskLevel || 1;
  const cat = word.category?.toLowerCase() || '';

  // HSK 1: Ultra simple (3-6 characters), basic grammar (S + V + O or S + Adj)
  if (level === 1) {
    if (cat.includes('food') || cat.includes('drink')) {
      return {
        hanzi: `我喜欢吃${hz}。`,
        pinyin: `Wǒ xǐhuan chī ${py}.`,
        english: `I like to eat ${eng}.`,
      };
    }
    if (cat.includes('verb')) {
      return {
        hanzi: `我想${hz}。`,
        pinyin: `Wǒ xiǎng ${py}.`,
        english: `I want to ${eng}.`,
      };
    }
    if (cat.includes('adj')) {
      return {
        hanzi: `这个很${hz}。`,
        pinyin: `Zhè gè hěn ${py}.`,
        english: `This is very ${eng}.`,
      };
    }
    if (cat.includes('people') || cat.includes('family')) {
      return {
        hanzi: `他是我的${hz}。`,
        pinyin: `Tā shì wǒ de ${py}.`,
        english: `He is my ${eng}.`,
      };
    }
    if (cat.includes('place')) {
      return {
        hanzi: `我在${hz}。`,
        pinyin: `Wǒ zài ${py}.`,
        english: `I am at ${eng}.`,
      };
    }
    return {
      hanzi: `这是${hz}。`,
      pinyin: `Zhè shì ${py}.`,
      english: `This is ${eng}.`,
    };
  }

  // HSK 2: Simple daily conversational phrases (5-8 characters)
  if (level === 2) {
    if (cat.includes('verb') || cat.includes('activit') || cat.includes('sport')) {
      return {
        hanzi: `我们一起${hz}吧。`,
        pinyin: `Wǒmen yìqǐ ${py} ba.`,
        english: `Let us ${eng} together.`,
      };
    }
    if (cat.includes('adj') || cat.includes('color')) {
      return {
        hanzi: `我觉得这个很${hz}。`,
        pinyin: `Wǒ juéde zhè gè hěn ${py}.`,
        english: `I think this is very ${eng}.`,
      };
    }
    if (cat.includes('food')) {
      return {
        hanzi: `我想买一些${hz}。`,
        pinyin: `Wǒ xiǎng mǎi yìxiē ${py}.`,
        english: `I want to buy some ${eng}.`,
      };
    }
    if (cat.includes('place') || cat.includes('travel')) {
      return {
        hanzi: `我们去${hz}看一看。`,
        pinyin: `Wǒmen qù ${py} kàn yí kàn.`,
        english: `Let us go visit the ${eng}.`,
      };
    }
    return {
      hanzi: `我们在学校学了“${hz}”。`,
      pinyin: `Wǒmen zài xuéxiào xué le "${py}".`,
      english: `We learned "${hz}" (${eng}) at school.`,
    };
  }

  // HSK 3: Intermediate clear sentences
  if (level === 3) {
    if (cat.includes('verb')) {
      return {
        hanzi: `多练习${hz}对学中文很有用。`,
        pinyin: `Duō liànxí ${py} duì xué zhōngwén hěn yǒuyòng.`,
        english: `Practicing to ${eng} more is very useful for learning Chinese.`,
      };
    }
    return {
      hanzi: `老师向大家解释了“${hz}”的意思。`,
      pinyin: `Lǎoshī xiàng dàjiā jiěshì le "${py}" de yìsi.`,
      english: `The teacher explained the meaning of "${hz}" (${eng}) to everyone.`,
    };
  }

  // HSK 4: Upper-intermediate sentences
  if (level === 4) {
    return {
      hanzi: `掌握“${hz}”这个词对中文表达很有帮助。`,
      pinyin: `Zhǎngwò "${py}" zhè gè cí duì zhōngwén biǎodá hěn yǒu bāngzhù.`,
      english: `Mastering the word "${hz}" (${eng}) is helpful for Chinese expression.`,
    };
  }

  // HSK 5+: Advanced natural sentences
  return {
    hanzi: `在日常工作与交流中，我们经常使用“${hz}”。`,
    pinyin: `Zài rìcháng gōngzuò yǔ jiāoliú zhōng, wǒmen jīngcháng shǐyòng "${py}".`,
    english: `In daily work and communication, we often use "${hz}" (${eng}).`,
  };
}

/**
 * Returns a level-appropriate example sentence for any HanziWord (from curated pool or contextual generator)
 */
export function getExampleSentence(word: HanziWord): ExampleSentence {
  if (word.exampleSentence) {
    return word.exampleSentence;
  }
  if (CURATED_SENTENCES[word.hanzi]) {
    return CURATED_SENTENCES[word.hanzi];
  }
  return createSmartSentence(word);
}
