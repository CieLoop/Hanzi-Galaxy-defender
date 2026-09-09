import { HanziWord, ExampleSentence } from '../types';

// Curated high-yield authentic example sentences for HSK words
export const CURATED_SENTENCES: Record<string, ExampleSentence> = {
  // HSK 1
  '你': { hanzi: '你好，很高兴认识你！', pinyin: 'Nǐ hǎo, hěn gāoxìng rènshí nǐ!', english: 'Hello, nice to meet you!' },
  '好': { hanzi: '今天天气非常好，阳光明媚。', pinyin: 'Jīntiān tiānqì fēicháng hǎo, yángguāng míngmèi.', english: 'The weather is very good today with bright sunshine.' },
  '你好': { hanzi: '你好！欢迎来到中文学习课堂。', pinyin: 'Nǐ hǎo! Huānyíng láidào zhōngwén xuéxí kètáng.', english: 'Hello! Welcome to the Chinese learning classroom.' },
  '我': { hanzi: '我是一名热心学习汉语的学生。', pinyin: 'Wǒ shì yì míng rèxīn xuéxí hànyǔ de xuésheng.', english: 'I am a student enthusiastic about learning Chinese.' },
  '他': { hanzi: '他是我的大学同班同学。', pinyin: 'Tā shì wǒ de dàxué tóngbān tóngxué.', english: 'He is my university classmate.' },
  '她': { hanzi: '她喜欢在周末去图书馆看书。', pinyin: 'Tā xǐhuan zài zhōumò qù túshūguǎn kàn shū.', english: 'She likes going to the library to read on weekends.' },
  '我们': { hanzi: '我们一起去操场跑步吧。', pinyin: 'Wǒmen yìqǐ qù cāochǎng pǎobù ba.', english: 'Let us go running on the sports field together.' },
  '他们': { hanzi: '他们正在热烈讨论刚才的考试。', pinyin: 'Tāmen zhèngzài rèliè tǎolùn gāngcái de kǎoshì.', english: 'They are enthusiastically discussing the recent test.' },
  '是': { hanzi: '这本汉英词典是我的。', pinyin: 'Zhè běn hàn-yīng cídiǎn shì wǒ de.', english: 'This Chinese-English dictionary is mine.' },
  '有': { hanzi: '桌子上有一杯热绿茶。', pinyin: 'Zhuōzi shàng yǒu yì bēi rè lǜchá.', english: 'There is a cup of hot green tea on the table.' },
  '看': { hanzi: '我喜欢在傍晚看美丽的落日。', pinyin: 'Wǒ xǐhuan zài bàngwǎn kàn měilì de luòrì.', english: 'I enjoy watching the beautiful sunset in the evening.' },
  '听': { hanzi: '请认真听老师讲解生词用法。', pinyin: 'Qǐng rènzhēn tīng lǎoshī jiǎngjiě shēngcí yòngfǎ.', english: 'Please listen carefully to the teacher explaining vocabulary usage.' },
  '说': { hanzi: '他能说一口非常地道的普通话。', pinyin: 'Tā néng shuō yì kǒu fēicháng dìdao de pǔtōnghuà.', english: 'He can speak very authentic Mandarin.' },
  '读': { hanzi: '每天清晨我都会大声朗读课文。', pinyin: 'Měitiān qīngchén wǒ dōuhuì dàshēng lǎngdú kèwén.', english: 'Every morning I read the lesson text aloud.' },
  '写': { hanzi: '请在练习本上端正地写下汉字。', pinyin: 'Qǐng zài liànxíbìng shàng duānzhèng de xiě xià hànzì.', english: 'Please write down the Chinese characters neatly in the notebook.' },
  '叫': { hanzi: '我叫李华，请多关照。', pinyin: 'Wǒ jiào Lǐ Huá, qǐng duō guānzhào.', english: 'My name is Li Hua, please take care of me.' },
  '买': { hanzi: '我想买两张去北京的高铁票。', pinyin: 'Wǒ xiǎng mǎi liǎng zhāng qù Běijīng de gāotiě piào.', english: 'I want to buy two high-speed rail tickets to Beijing.' },
  '吃': { hanzi: '中国北方人过年喜欢吃水饺。', pinyin: 'Zhōngguó běifāng rén guònián xǐhuan chī shuǐjiǎo.', english: 'People in northern China like eating dumplings during New Year.' },
  '喝': { hanzi: '运动后喝一杯温开水对身体好。', pinyin: 'Yùndòng hòu hē yì bēi wēn kāishuǐ duì shēntǐ hǎo.', english: 'Drinking a cup of warm water after exercise is good for you.' },
  '走': { hanzi: '晚饭后散步走一走有助于消化。', pinyin: 'Wǎnfàn hòu sànbù zǒu yì zǒu yǒuzhù yú xiāohuà.', english: 'Taking a walk after dinner helps with digestion.' },
  '坐': { hanzi: '请坐在沙发上喝杯咖啡吧。', pinyin: 'Qǐng zuò zài shāfā shàng hē bēi kāfēi ba.', english: 'Please sit on the sofa and have a cup of coffee.' },
  '来': { hanzi: '欢迎大家来我的家乡旅游。', pinyin: 'Huānyíng dàjiā lái wǒ de jiāxiāng lǚyóu.', english: 'Welcome everyone to visit my hometown.' },
  '去': { hanzi: '周末我们打算去故宫博物院参观。', pinyin: 'Zhōumò wǒmen dǎsuàn qù Gùgōng Bówùyuàn cānguān.', english: 'We plan to go visit the Palace Museum this weekend.' },
  '做': { hanzi: '你将来最想做哪方面的工作？', pinyin: 'Nǐ jiānglái zuì xiǎng zuò nǎ fāngmiàn de gōngzuò?', english: 'What line of work do you most want to do in the future?' },
  '想': { hanzi: '我想通过努力考过汉语六级。', pinyin: 'Wǒ xiǎng tōngguò nǔlì kǎoguò hànyǔ liù jí.', english: 'I want to pass HSK Level 6 through hard work.' },
  '水': { hanzi: '人体每天都需要补充充足的水分。', pinyin: 'Réntǐ měitiān dōu xūyào bǔchōng chōngzú de shuǐfèn.', english: 'The human body needs to replenish adequate water daily.' },
  '茶': { hanzi: '中国传统的茶文化博大精深。', pinyin: 'Zhōngguó chuántǒng de chá wénhuà bódà jīngshēn.', english: 'Traditional Chinese tea culture is broad and profound.' },
  '米饭': { hanzi: '红烧牛肉配香喷喷的米饭太香了。', pinyin: 'Hóngshāo niúròu pèi xiāngpēnpēn de mǐfàn tài xiāng le.', english: 'Braised beef paired with fragrant rice is so delicious.' },
  '爸爸': { hanzi: '爸爸每天辛勤工作支持着全家。', pinyin: 'Bàba měitiān xīnqín gōngzuò zhīchízhe quánjiā.', english: 'Father works diligently every day to support the whole family.' },
  '妈妈': { hanzi: '妈妈经常提醒我注意劳逸结合。', pinyin: 'Māma jīngcháng tíxǐng wǒ zhùyì láoyì jiéhé.', english: 'Mother often reminds me to balance work and rest.' },
  '儿子': { hanzi: '他的儿子聪明好学，成绩优异。', pinyin: 'Tā de érzi cōngmíng hàoxué, chéngjì yōuyì.', english: 'His son is smart, eager to learn, and achieves top marks.' },
  '女儿': { hanzi: '女儿弹起钢琴来格外专注动情。', pinyin: 'Nǚ\'ér tán qǐ gāngqín lái géwài zhuānzhù dòngqíng.', english: 'The daughter plays the piano with extraordinary focus and passion.' },
  '朋友': { hanzi: '真诚的朋友会在你遇到困难时伸出援手。', pinyin: 'Zhēnchéng de péngyou huì zài nǐ yùdào kùnnan shí shēnchū yuánshǒu.', english: 'A true friend extends a helping hand when you are in trouble.' },
  '老师': { hanzi: '张老师用生动的例子帮助大家理解语法。', pinyin: 'Zhāng lǎoshī yòng shēngdòng de lìzi bāngzhù dàjiā lǐjiě yǔfǎ.', english: 'Teacher Zhang helps everyone understand grammar with lively examples.' },
  '学生': { hanzi: '这里的每一位学生都富有探索精神。', pinyin: 'Zhèlǐ de měi yí wèi xuésheng dōu fùyǒu tànsuǒ jīngshén.', english: 'Every student here is rich in exploring spirit.' },
  '中国': { hanzi: '中国是一个拥有五千年文明历史的古国。', pinyin: 'Zhōngguó shì yí gè yǒngyǒu wǔqiān nián wénmíng lìshǐ de gǔguó.', english: 'China is an ancient country with 5,000 years of civilization history.' },
  '北京': { hanzi: '北京既有厚重的古迹，又有现代化的繁华。', pinyin: 'Běijīng jì yǒu hòuzhòng de gǔjì, yòu yǒu xiàndàihuà de fánhuá.', english: 'Beijing boasts both rich historical relics and modern bustle.' },
  '钱': { hanzi: '知识是比金钱更为宝贵的财富。', pinyin: 'Zhīshi shì bǐ jīnqián gèngwéi bǎoguì de cáifù.', english: 'Knowledge is wealth more precious than money.' },
  '今天': { hanzi: '今天我们要把这一章节的内容全部复习完。', pinyin: 'Jīntiān wǒmen yào bǎ zhè yì zhāngjié de nèiróng quánbù fùxí wán.', english: 'Today we will review all the contents of this chapter.' },
  '明天': { hanzi: '把握好今天，明天才会更加美好光明。', pinyin: 'Bǎwò hǎo jīntiān, míngtiān cái huì gèngjiā měihǎo guāngmíng.', english: 'Seize today, and tomorrow will be even brighter.' },
  '昨天': { hanzi: '昨天的精彩讲座让我受益匪浅。', pinyin: 'Zuótiān de jīngcǎi jiǎngzuò ràng wǒ shòuyì fěi qiǎn.', english: 'Yesterday\'s splendid lecture benefited me tremendously.' },
  '年': { hanzi: '经过一整年的苦练，他的中文突飞猛进。', pinyin: 'Jīngguò yì zhěng nián de kǔliàn, tā de zhōngwén tūfēi-měngjìn.', english: 'After a full year of hard practice, his Chinese advanced by leaps and bounds.' },
  '月': { hanzi: '中秋之夜的圆月格外皎洁明朗。', pinyin: 'Zhōngqiū zhī yè de yuányuè géwài jiǎojié mínglǎng.', english: 'The round moon on Mid-Autumn night is exceptionally bright.' },
  '日': { hanzi: '五月四日是充满朝气的青年节。', pinyin: 'Wǔ yuè sì rì shì chōngmǎn zhāoqì de qīngnián jié.', english: 'May 4th is the energetic Youth Day.' },
  '猫': { hanzi: '那只温顺的小花猫在阳光下打瞌睡。', pinyin: 'Nà zhī wēnshùn de xiǎohuāmāo zài yángguāng xià dǎ kēshuì.', english: 'That gentle calico cat is dozing under the sunlight.' },
  '书': { hanzi: '经常翻阅好书能开阔人们的心胸与眼界。', pinyin: 'Jīngcháng fānyuè hǎo shū néng kāikuò rénmen de xīnxiōng yǔ yǎnjiè.', english: 'Reading good books regularly broadens one\'s mind and horizons.' },
  '飞机': { hanzi: '飞机划过晴朗的蓝天，留下一道白线。', pinyin: 'Fēijī huàguò qínglǎng de lántiān, liúxià yí dào bái xiàn.', english: 'The plane cut across the clear blue sky, leaving a white streak.' },
  '谢谢': { hanzi: '谢谢你在学习上给予我的无私帮助。', pinyin: 'Xièxie nǐ zài xuéxí shàng jǐyǔ wǒ de wúsī bāngzhù.', english: 'Thank you for your selfless help in my studies.' },
  '不客气': { hanzi: '朋友之间互相支持理所应当，不用客气！', pinyin: 'Péngyou zhījiān hùxiāng zhīchí lǐsuǒyīngdāng, bú yòng kèqi!', english: 'Mutual support between friends is natural, you\'re welcome!' },
  '再见': { hanzi: '期待与你下次相聚，大家再见！', pinyin: 'Qīdài yǔ nǐ xià cì xiāngjù, dàjiā zàijiàn!', english: 'Looking forward to meeting you next time, goodbye everyone!' },

  // HSK 2
  '帮助': { hanzi: '老师的热心帮助让他重拾了学习信心。', pinyin: 'Lǎoshī de rèxīn bāngzhù ràng tā chóngshí le xuéxí xìnxīn.', english: 'The teacher\'s warm help restored his confidence in learning.' },
  '旅游': { hanzi: '趁着假期去名胜古迹旅游能拓宽视野。', pinyin: 'Chènzhe jiàqī qù míngshèng gǔjì lǚyóu néng tuòkuān shìyě.', english: 'Traveling to historical sites during holidays broadens horizons.' },
  '公共汽车': { hanzi: '乘坐公共汽车绿色出行既便捷又省钱。', pinyin: 'Chéngzuò gōnggòng qìchē lǜsè chūxíng jì biànjié yòu shěngqián.', english: 'Taking the public bus for green travel is both convenient and economical.' },
  '自行车': { hanzi: '校园里许多同学都喜欢骑自行车去上课。', pinyin: 'Xiàoyuán lǐ xǔduō tóngxué dōu xǐhuan qí zìxíngchē qù shàngkè.', english: 'Many students on campus like riding bicycles to class.' },
  '医院': { hanzi: '感觉身体不舒服时一定要及时去医院检查。', pinyin: 'Gǎnjué shēntǐ bù shūfu shí yídìng yào jíshí qù yīyuàn jiǎnchá.', english: 'When feeling unwell, be sure to visit the hospital for a checkup promptly.' },
  '饭馆': { hanzi: '学校附近那家川菜饭馆味道十分正宗。', pinyin: 'Xuéxiào fùjìn nà jiā chuāncài fànguǎn wèidào shífēn zhèngzōng.', english: 'That Sichuan restaurant near the school has very authentic flavors.' },
  '生病': { hanzi: '生病期间要多喝温水，保证充足休息。', pinyin: 'Shēngbìng qījiān yào duō hē wēn shuǐ, bǎozhèng chōngzú xiūxi.', english: 'During illness, drink plenty of warm water and ensure adequate rest.' },
  '身体': { hanzi: '坚持体育锻炼是保持身体健康的关键。', pinyin: 'Jiānchí tǐyù duànliàn shì bǎochí shēntǐ jiànkāng de guānjiàn.', english: 'Persisting in physical exercise is key to maintaining good health.' },
  '准备': { hanzi: '充分的准备是取得考试成功的基石。', pinyin: 'Chōngfèn de zhǔnbèi shì qǔdé kǎoshì chénggōng de jīshí.', english: 'Adequate preparation is the cornerstone of passing tests.' },
  '懂': { hanzi: '经过老师生动形象的拆解，大家都听懂了。', pinyin: 'Jīngguò lǎoshī shēngdòng xíngxiàng de chāijiě, dàjiā dōu tīngdǒng le.', english: 'Through the teacher\'s vivid breakdown, everyone understood.' },
  '结束': { hanzi: '随着下课铃声敲响，今天的课程圆满结束。', pinyin: 'Suízhe xiàkè língshēng qiāoxiǎng, jīntiān de kèchéng yuánmǎn jiéshù.', english: 'As the dismissal bell rang, today\'s classes wrapped up successfully.' },
  '火车站': { hanzi: '我们在新建的高铁火车站东出口集合。', pinyin: 'Wǒmen zài xīnjiàn de gāotiě huǒchēzhàn dōng chūkǒu jíhé.', english: 'Let\'s gather at the east exit of the newly built high-speed train station.' },
  '机场': { hanzi: '前往国际机场前记得核对好护照和行李。', pinyin: 'Qiánwǎng guójì jīchǎng qián jìde héduì hǎo hùzhào hé xíngli.', english: 'Before heading to the international airport, double-check your passport and luggage.' },

  // HSK 3
  '环境': { hanzi: '保护自然生态环境是每个公民的责任。', pinyin: 'Bǎohù zìrán shēngtài huánjìng shì měi gè gōngmín de zérèn.', english: 'Protecting the natural ecological environment is the responsibility of every citizen.' },
  '解决': { hanzi: '通过深入沟通，团队顺利解决了技术难题。', pinyin: 'Tōngguò shēnrù gōutōng, tuánduì shùnlì jiějué le jìshù nántí.', english: 'Through in-depth communication, the team smoothly resolved technical hurdles.' },
  '历史': { hanzi: '阅读历史能让我们从过去中汲取智慧。', pinyin: 'Yuèdú lìshǐ néng ràng wǒmen cóng guòqù zhōng jíqǔ zhìhuì.', english: 'Reading history allows us to draw wisdom from the past.' },
  '决定': { hanzi: '他经过慎重考虑，决定去中国攻读硕士。', pinyin: 'Tā jīngguò shènzhòng kǎolǜ, juédìng qù Zhōngguó gōngdú shuòshì.', english: 'After careful consideration, he decided to study for a master\'s in China.' },
  '努力': { hanzi: '只要坚持努力，就一定能攻克汉语难关。', pinyin: 'Zhǐyào jiānchí nǔlì, jiù yídìng néng gōngkè hànyǔ nánguān.', english: 'As long as you persist with effort, you can surely overcome Chinese difficulties.' },
  '清楚': { hanzi: '老师把重点语法规则讲解得非常清楚明白。', pinyin: 'Lǎoshī bǎ zhòngdiǎn yǔfǎ guīzé jiǎngjiě de fēicháng qīngchu míngbai.', english: 'The teacher explained the key grammar rules very clearly and lucidly.' },
  '习惯': { hanzi: '养成早睡早起的好习惯有利于身体健康。', pinyin: 'Yǎngchéng zǎoshuì zǎoqǐ de hǎo xíguàn yǒulì yú shēntǐ jiànkāng.', english: 'Cultivating the habit of early to bed and early to rise benefits health.' },
  '提高': { hanzi: '每天坚持听汉语广播能有效提高听力水平。', pinyin: 'Měitiān jiānchí tīng hànyǔ guǎngbō néng yǒuxiào tígāo tīnglì shuǐpíng.', english: 'Listening to Chinese radio daily effectively elevates listening proficiency.' },

  // HSK 4
  '坚持': { hanzi: '贵在坚持，唯有日积月累方能成就卓越。', pinyin: 'Guì zài jiānchí, wéiyǒu rìjī-yuèlěi fāng néng chéngjiù zhuóyuè.', english: 'Value lies in persistence; only steady accumulation yields excellence.' },
  '成功': { hanzi: '成功往往垂青那些做足充分准备的人。', pinyin: 'Chénggōng wǎngwǎng chuíqīng nàxiē zuòzú chōngfèn zhǔnbèi de rén.', english: 'Success often favors those who make thorough preparations.' },
  '态度': { hanzi: '积极乐观的生活态度能帮助我们克服逆境。', pinyin: 'Jījí lèguān de shēnghuó tàidu néng bāngzhù wǒmen kèfú nìjìng.', english: 'A positive and optimistic attitude helps us overcome adversity.' },
  '经验': { hanzi: '他在跨国商务交流方面积累了丰富的实战经验。', pinyin: 'Tā zài kuàguó shāngwù jiāoliú fāngmiàn jīlěi le fēngfù de shízhàn jīngyàn.', english: 'He accumulated rich practical experience in cross-border business.' },
  '关键': { hanzi: '找到问题根源是推动项目解决的关键所在。', pinyin: 'Zhǎodào wèntí gēnyuán shì tuīdòng xiàngmù jiějué de guānjiàn suǒzài.', english: 'Finding the root cause is the key to advancing project resolution.' },
  '考虑': { hanzi: '做重大决策时，必须全面考虑各方面影响。', pinyin: 'Zuò zhòngdà juécè shí, bìxū quánmiàn kǎolǜ gè fāngmiàn yǐngxiǎng.', english: 'When making major decisions, one must comprehensively consider all impacts.' },

  // HSK 5
  '把握': { hanzi: '青年人应当勇于探索，牢牢把握时代赋予的机遇。', pinyin: 'Qīngnián rén yīngdāng yǒngyú tànsuǒ, láoláo bǎwò shídài fùyǔ de jīyù.', english: 'Young people should explore courageously and firmly grasp the opportunities of our era.' },
  '彼此': { hanzi: '团队成员之间坦诚相待，彼此充满信任。', pinyin: 'Tuánduì chéngyuán zhījiān tǎnchéng xiāngdài, bǐcǐ chōngmǎn xìnrèn.', english: 'Team members treat each other with candor, filled with mutual trust.' },
  '效率': { hanzi: '优化工作流程大幅提高了团队的研发效率。', pinyin: 'Yōuhuà gōngzuò liúchéng dàfú tígāo le tuánduì de yánfā xiàolǜ.', english: 'Optimizing workflow substantially increased the team\'s R&D efficiency.' },
  '趋势': { hanzi: '绿色低碳发展已成为不可逆转的世界潮流趋势。', pinyin: 'Lǜsè dītàn fāzhǎn yǐ chéngwéi bùkě nìzhuǎn de shìjiè cháoliú qūshì.', english: 'Green low-carbon development has become an irreversible global trend.' },

  // HSK 6
  '崩溃': { hanzi: '在连番高压考验面前，他的防线并未崩溃。', pinyin: 'Zài liánfān gāoyā kǎoyàn miànqián, tā de fángxiàn bìng wèi bēngkuì.', english: 'Faced with continuous high-pressure tests, his defense did not crumble.' },
  '和谐': { hanzi: '构建人与自然和谐共生的美好社会是共同愿景。', pinyin: 'Gòujiàn rén yǔ zìrán héxié gòngshēng de měihǎo shèhuì shì gòngtóng yuànjǐng.', english: 'Building a harmonious society where humans coexist with nature is a shared vision.' },
  '捍卫': { hanzi: '学者应当坚守学术诚信，勇敢捍卫科学真理。', pinyin: 'Xuézhě yīngdāng jiānshǒu xuéshù chéngxìn, yǒnggǎn hànwèi kēxué zhēnlǐ.', english: 'Scholars should adhere to academic integrity and bravely defend scientific truth.' },
  '宏观': { hanzi: '制定长远战略必须具备高瞻远瞩的宏观眼光。', pinyin: 'Zhìdìng chángyuǎn zhànlüè bìxū jùbèi gāozhān-yuǎnzhǔ de hóngguān yǎnguāng.', english: 'Formulating long-term strategy requires a far-sighted macroscopic vision.' },

  // HSK 7-9
  '秉持': { hanzi: '我们始终秉持开放包容与合作共赢的原则。', pinyin: 'Wǒmen shǐzhōng bǐngchí kāifàng bāoróng yǔ hézuò gòngyíng de yuánzé.', english: 'We consistently uphold the principles of openness, inclusivity, and win-win cooperation.' },
  '脉络': { hanzi: '理清思想发展脉络有助于把握学术核心。', pinyin: 'Lǐqīng sīxiǎng fāzhǎn màiluò yǒuzhù yú bǎwò xuéshù héxīn.', english: 'Clarifying the developmental thread of thought helps grasp the academic core.' },
  '融会贯通': { hanzi: '唯有广博涉猎并融会贯通，方能融铸真知灼见。', pinyin: 'Wéiyǒu guǎngbó shèliè bìng rónghuì-guàntōng, fāng néng róngzhù zhēnzhī-zhuójiàn.', english: 'Only through broad reading and synthesis can one forge true insights.' },
  '未雨绸缪': { hanzi: '面对复杂多变的市场环境，企业必须未雨绸缪做好储备。', pinyin: 'Miànduì fùzá duōbiàn de shìchǎng huánjìng, qǐyè bìxū wèiyǔ-chóumóu zuòhǎo chǔbèi.', english: 'Facing a volatile market environment, enterprises must take precautions beforehand.' },
  '潜移默化': { hanzi: '优良的家风在潜移默化中塑造着年轻一代的品格。', pinyin: 'Yōuliáng de jiāfēng zài qiányí-mòhuà zhōng sùzàozhe niánqīng yí dài de pǐngé.', english: 'Exemplary family traditions imperceptibly shape the character of the younger generation.' },
};

/**
 * Fallback contextual sentence templates based on category or part of speech
 */
function createSmartSentence(word: HanziWord): ExampleSentence {
  const hz = word.hanzi;
  const py = word.pinyin;
  const eng = word.english;
  const cat = word.category?.toLowerCase() || '';

  if (cat.includes('verb') || cat.includes('daily') || cat.includes('activit')) {
    return {
      hanzi: `在日常学习生活中，我们经常需要${hz}。`,
      pinyin: `Zài rìcháng xuéxí shēnghuó zhōng, wǒmen jīngcháng xūyào ${py}.`,
      english: `In our daily study and life, we often need to ${eng}.`,
    };
  }

  if (cat.includes('adj') || cat.includes('feeling')) {
    return {
      hanzi: `大家都认为这个做法非常${hz}。`,
      pinyin: `Dàjiā dōu rènwéi zhè gè zuòfǎ fēicháng ${py}.`,
      english: `Everyone considers this approach to be very ${eng}.`,
    };
  }

  if (cat.includes('place') || cat.includes('travel')) {
    return {
      hanzi: `我们明天打算前往${hz}参观交流。`,
      pinyin: `Wǒmen míngtiān dǎsuàn qiánwǎng ${py} cānguān jiāoliú.`,
      english: `Tomorrow we plan to travel to the ${eng} for a visit.`,
    };
  }

  if (cat.includes('food') || cat.includes('object')) {
    return {
      hanzi: `桌面摆放着精致新鲜的${hz}。`,
      pinyin: `Zhuōmiàn bǎifàngzhe jīngzhì xīnxīan de ${py}.`,
      english: `Exquisite and fresh ${eng} is arranged on the table.`,
    };
  }

  if (cat.includes('family') || cat.includes('people') || cat.includes('social')) {
    return {
      hanzi: `这位可敬的${hz}总是真诚地关照着周围的人。`,
      pinyin: `Zhè wèi kějìng de ${py} zǒngshì zhēnchéng de guānzhàozhe zhōuwéi de rén.`,
      english: `This respectable ${eng} always genuinely cares for those around them.`,
    };
  }

  // General high quality contextual template
  return {
    hanzi: `掌握“${hz}”这个词的用法对学好汉语很有帮助。`,
    pinyin: `Zhǎngwò "${py}" zhè gè cí de yòngfǎ duì xuéhǎo hànyǔ hěn yǒu bāngzhù.`,
    english: `Mastering the usage of "${hz}" (${eng}) is very helpful for learning Chinese well.`,
  };
}

/**
 * Returns a high-quality example sentence for any HanziWord (from curated pool or contextual generator)
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
