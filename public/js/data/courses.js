// OPC 课程体系数据 - 基于《OPC培训课程体系完整版V2.0》
// 后端可通过 /api/courses 替换此数据

export const courseStages = [
  { id: 'S1', name: '认知与基础', icon: '🌱', color: '#10b981', desc: '建立AI使用习惯，掌握基础工具和提示词' },
  { id: 'S2', name: '技能与方向', icon: '🚀', color: '#3b82f6', desc: '系统提升专业技能，选定发展方向' },
  { id: 'S3', name: '实战与产出', icon: '⚙️', color: '#f59e0b', desc: '完成真实项目，产出可变现作品' },
  { id: 'S4', name: '商业与创业', icon: '💎', color: '#a855f7', desc: '项目落地盈利，规模化运营' }
];

export const allCourses = [
  // 第一阶 认知与基础
  { id: 'A1', stage: 'S1', name: 'AI时代生存指南', type: '体验课', duration: '1天(6h)', price: 99, target: '零基础所有人', tools: ['ChatGPT', 'Claude', 'Gemini', '通义千问', '通义万相', 'Kimi', 'Suno'], output: '个人AI学习计划', cover: '🌐' },
  { id: 'A2', stage: 'S1', name: 'AI办公效率倍增班', type: '基础课', duration: '2天(12h)', price: 599, target: '职场人/行政/教师', tools: ['ChatGPT', 'Claude', 'Excel', 'Gamma', 'Perplexity', '飞书AI', '扣子'], output: '邮件+纪要+数据报告+PPT+AI Bot', cover: '💼' },
  { id: 'A3', stage: 'S1', name: 'AI工具全景实操课', type: '基础课', duration: '3天(18h)', price: 899, target: '想系统了解AI的人', tools: ['ChatGPT', 'Midjourney', 'SD', 'Kling', 'ElevenLabs', '剪映AI'], output: '个人AI工具手册', cover: '🛠️' },
  { id: 'A4', stage: 'S1', name: 'AI编程零基础入门', type: '基础课', duration: '4天(12h)', price: 1299, target: '非技术想学编程的人', tools: ['Cursor', 'V0', 'Bolt.new', 'Replit'], output: '1个可运行的小产品', cover: '💻' },
  { id: 'B1', stage: 'S1', name: '提示词入门', type: '基础课', duration: '半天(3h)', price: 199, target: '所有AI使用者', tools: ['ChatGPT', 'Claude', 'Midjourney'], output: '提示词速查手册', cover: '✨' },
  // 第二阶 技能与方向
  { id: 'B2', stage: 'S2', name: '提示词进阶：达人到工程师', type: '技能课', duration: '2天(12h)', price: 999, target: '有基础的AI使用者', tools: ['ChatGPT', 'Midjourney', 'SD', 'ComfyUI', 'Kling', 'ElevenLabs'], output: '个人Prompt库≥100条', cover: '🧠' },
  { id: 'B3', stage: 'S2', name: 'Prompt工程师认证班', type: '认证课', duration: '4天(24h)', price: 2999, target: '想成为Prompt专家的人', tools: ['全套AI工具', '扣子', 'Dify', 'GPTs'], output: 'OPC认证Prompt工程师证书', cover: '🎓' },
  { id: 'B4', stage: 'S2', name: '提示词工具设计师特训', type: '技能课', duration: '2天(12h)', price: 1999, target: '想卖Prompt产品的人', tools: ['GPTs', '扣子', 'PromptBase', 'FlowGPT'], output: '可上架产品+商业计划', cover: '🛒' },
  { id: 'L2-A', stage: 'S2', name: 'AI短视频全流程训练营', type: '训练营', duration: '4天(12h)', price: 1299, target: '零基础/初级创作者', tools: ['Kling', 'Vidu', '剪映AI', 'ChatGPT', 'ElevenLabs'], output: '完整短视频作品集', cover: '🎬' },
  { id: 'L2-B', stage: 'S2', name: '微短剧编剧与制片训练营', type: '训练营', duration: '4天(12h)', price: 2999, target: '编剧/导演/制片', tools: ['ChatGPT', 'Claude', '飞书', 'Excel'], output: '完整短剧剧本+制片方案', cover: '📽️' },
  { id: 'L2-C', stage: 'S2', name: 'AI视觉设计训练营', type: '训练营', duration: '4天(12h)', price: 1999, target: '设计师/运营/品牌方', tools: ['Midjourney', 'SD', 'Canva', 'ComfyUI', 'Figma'], output: '品牌视觉系统', cover: '🎨' },
  { id: 'L2-D', stage: 'S2', name: '全平台新媒体运营训练营', type: '训练营', duration: '4天(12h)', price: 1599, target: '运营/自媒体/品牌方', tools: ['ChatGPT', '剪映', '飞瓜', '蝉妈妈'], output: '账号矩阵运营方案', cover: '📱' },
  { id: 'C1', stage: 'S2', name: 'AI+教育：智慧教学设计', type: '行业课', duration: '2天(12h)', price: 1299, target: '教师/培训师', tools: ['ChatGPT', 'Claude', '扣子', '腾讯课堂'], output: '智慧教学方案', cover: '📚' },
  { id: 'C2', stage: 'S2', name: 'AI+电商：全链路智能运营', type: '行业课', duration: '3天(18h)', price: 1999, target: '电商卖家/运营', tools: ['ChatGPT', 'Midjourney', '剪映', '生意参谋', '飞瓜'], output: '电商AI运营SOP', cover: '🛍️' },
  { id: 'C3', stage: 'S2', name: 'AI+营销：智能获客与转化', type: '行业课', duration: '2天(12h)', price: 1599, target: '市场/营销/品牌', tools: ['ChatGPT', 'Canva', '剪映', 'Google Ads'], output: '获客转化方案', cover: '📢' },
  { id: 'C4', stage: 'S2', name: 'AI+法律：智能法务助手', type: '行业课', duration: '2天(12h)', price: 1499, target: '律师/法务', tools: ['ChatGPT', 'Claude', 'Kimi', '北大法宝AI'], output: '法务AI工作流', cover: '⚖️' },
  { id: 'C5', stage: 'S2', name: 'AI+金融：智能分析与风控', type: '行业课', duration: '2天(12h)', price: 1999, target: '金融从业者', tools: ['ChatGPT', 'Python', 'Wind', '同花顺'], output: '金融分析模型', cover: '💰' },
  { id: 'C6', stage: 'S2', name: 'AI+设计：创意生产革命', type: '行业课', duration: '3天(18h)', price: 1999, target: '设计师/创意总监', tools: ['Midjourney', 'SD', 'ComfyUI', 'Figma'], output: '设计作品集', cover: '🖌️' },
  { id: 'C7', stage: 'S2', name: 'AI+自媒体：10倍生产力', type: '行业课', duration: '2天(12h)', price: 1299, target: '博主/UP主', tools: ['ChatGPT', '剪映', 'Canva', '飞瓜'], output: '内容生产SOP', cover: '🎙️' },
  { id: 'C8', stage: 'S2', name: 'AI+培训：智能课程设计', type: '行业课', duration: '2天(12h)', price: 1499, target: '培训师/知识付费', tools: ['ChatGPT', 'Gamma', '扣子', '小鹅通'], output: '完整课程产品', cover: '🧑‍🏫' },
  { id: 'C9', stage: 'S2', name: 'AI+餐饮零售：智能运营', type: '行业课', duration: '1天(6h)', price: 699, target: '餐饮/零售老板', tools: ['ChatGPT', 'Canva', '美团商家版'], output: '餐饮AI运营方案', cover: '🍱' },
  // 第三阶 实战与产出
  { id: 'D1', stage: 'S3', name: 'AI短视频实战：7天30条内容', type: '实战课', duration: '7天(21h)', price: 2499, target: '想做短视频的人', tools: ['剪映AI', 'Kling', 'ChatGPT', 'Canva', 'ElevenLabs'], output: '30条可发布短视频', cover: '📹' },
  { id: 'D2', stage: 'S3', name: 'AI电商实战：从0搭建店铺', type: '实战课', duration: '10天(30h)', price: 3999, target: '想开店的人', tools: ['ChatGPT', 'Midjourney', '扣子', '美图AI'], output: '可接单店铺', cover: '🏪' },
  { id: 'D3', stage: 'S3', name: 'AI微短剧实战：21天出一部剧', type: '实战课', duration: '21天', price: 6999, target: '短剧创作者/团队', tools: ['Kling', 'Vidu', 'ChatGPT', '剪映', 'ElevenLabs', 'Suno'], output: '完整短剧作品', cover: '🎞️' },
  { id: 'D4', stage: 'S3', name: 'AI数字人直播：7天开播', type: '实战课', duration: '7天(21h)', price: 3499, target: '想做直播的人', tools: ['HeyGen', '硅基智能', 'ChatGPT', '剪映', 'OBS'], output: '可播数字人直播间', cover: '📺' },
  { id: 'D5', stage: 'S3', name: 'AI品牌全案：14天真实交付', type: '实战课', duration: '14天', price: 4999, target: '设计师/品牌方', tools: ['Midjourney', 'Canva', '剪映', 'Figma', 'Gamma'], output: '完整品牌交付物', cover: '🏷️' },
  { id: 'D6', stage: 'S3', name: 'AI自动化工作流：搭建AI员工', type: '实战课', duration: '5天(20h)', price: 2999, target: '效率提升需求者', tools: ['扣子', 'Dify', 'n8n', 'Make', 'Python'], output: '部署完成的AI工作流', cover: '🤖' },
  { id: 'D7', stage: 'S3', name: 'AI产品经理：30天想法到MVP', type: '实战课', duration: '30天', price: 4999, target: '产品/创业者', tools: ['Cursor', 'ChatGPT', 'Figma', 'V0', 'Bolt', 'Vercel'], output: '可上线MVP产品', cover: '🧩' },
  { id: 'L3-A', stage: 'S3', name: 'AI微短剧全流程制作工坊', type: '工坊', duration: '8天(32h)', price: 9999, target: '专业短剧制作者', tools: ['Kling', 'Vidu', '剪映', 'ElevenLabs', 'Suno'], output: '院线级短剧作品', cover: '🎥' },
  { id: 'L3-B', stage: 'S3', name: 'AI漫剧制作工坊', type: '工坊', duration: '8天(32h)', price: 7999, target: '漫画/IP团队', tools: ['Midjourney', 'SD', 'ComfyUI', '剪映', 'ElevenLabs'], output: '完整漫剧作品', cover: '📖' },
  { id: 'L3-C', stage: 'S3', name: '品牌AI视觉全案工坊', type: '工坊', duration: '8天(32h)', price: 5999, target: '设计师/品牌团队', tools: ['Midjourney', 'Canva', 'Figma', '剪映'], output: '全套品牌视觉资产', cover: '🎯' },
  { id: 'E1', stage: 'S3', name: '企业AI转型诊断工作坊', type: '企业坊', duration: '1天', price: 10000, target: '企业管理团队', tools: ['ChatGPT', 'Claude', '行业AI工具'], output: 'AI转型诊断方案', cover: '🏢' },
  { id: 'E2', stage: 'S3', name: 'AI赋能销售团队实战坊', type: '企业坊', duration: '2天', price: 30000, target: '销售团队', tools: ['ChatGPT', '扣子', 'CRM'], output: '销售Bot+SOP', cover: '💼' },
  { id: 'E3', stage: 'S3', name: 'AI赋能HR团队实战坊', type: '企业坊', duration: '1天', price: 15000, target: 'HR团队', tools: ['ChatGPT', '扣子', '飞书'], output: 'HR Bot+流程', cover: '👥' },
  { id: 'E4', stage: 'S3', name: 'AI赋能财务团队实战坊', type: '企业坊', duration: '1天', price: 18000, target: '财务团队', tools: ['ChatGPT', 'Python', 'Excel'], output: '财务Bot+模型', cover: '📊' },
  { id: 'E5', stage: 'S3', name: 'AI赋能客服团队实战坊', type: '企业坊', duration: '2天', price: 20000, target: '客服团队', tools: ['扣子', 'Dify'], output: '可上线AI客服系统', cover: '☎️' },
  // 第四阶 商业与创业
  { id: 'F1', stage: 'S4', name: 'AI副业启动营：30天首笔收入', type: '创业营', duration: '30天', price: 1999, target: '想做副业的人', tools: ['全套AI工具'], output: '首笔副业收入', cover: '🌟' },
  { id: 'F2', stage: 'S4', name: 'AI创业加速营：90天想法到盈利', type: '创业营', duration: '90天', price: 9999, target: '创业者', tools: ['Cursor', 'ChatGPT', '飞书', 'Figma'], output: 'MVP+月稳定收入', cover: '🚀' },
  { id: 'L4-a', stage: 'S4', name: '微短剧项目孵化', type: '孵化', duration: '3个月', price: 29999, target: '短剧团队', tools: ['ChatGPT', 'Kling', '剪映', 'ElevenLabs', '蝉妈妈'], output: '可发行短剧+商业回报', cover: '🎬' },
  { id: 'L4-b', stage: 'S4', name: '账号矩阵孵化', type: '孵化', duration: '3个月', price: 19999, target: '自媒体团队', tools: ['ChatGPT', '剪映', 'Canva', '飞瓜'], output: '盈利账号矩阵', cover: '📱' },
  { id: 'L4-c', stage: 'S4', name: '品牌IP孵化', type: '孵化', duration: '3个月', price: 49999, target: '品牌/IP团队', tools: ['Midjourney', 'ChatGPT', '剪映', 'Figma'], output: '完整品牌IP+商业化', cover: '👑' }
];

// 行业赛道（基于 OPC Learning OS 8大赛道）
export const tracks = [
  { id: 'T1', name: '电商零售', icon: '🛍️', color: '#ec4899', industries: '跨境电商、服装零售、珠宝首饰、家居装饰', formula: '客服节省 + 转化提升 × GMV = 月增2-10万', lessons: 12 },
  { id: 'T2', name: '健康美业', icon: '💄', color: '#f43f5e', industries: '美容美妆、保健品、健身减肥、母婴用品', formula: '私域复购 + 新客转化 - 合规风险 = 月增3-15万', lessons: 12 },
  { id: 'T3', name: '餐饮生活', icon: '🍽️', color: '#f97316', industries: '餐饮连锁、旅游出行、宠物用品', formula: '人力节省 + 翻台率×客单提升 = 月增利2-8万', lessons: 12 },
  { id: 'T4', name: '房产金融', icon: '🏙️', color: '#eab308', industries: '房产中介、保险代理、财富管理', formula: '线索转化率 × 单笔佣金 = 月增5-20万', lessons: 12 },
  { id: 'T5', name: '教育招聘', icon: '🎓', color: '#22c55e', industries: '在线教育、职业培训、猎头招聘', formula: '获客成本↓ + 续课率↑ = 月增3-12万', lessons: 12 },
  { id: 'T6', name: '工业B2B', icon: '🏭', color: '#06b6d4', industries: '制造业、外贸出口、企业服务', formula: '询盘转化 × 客单价 = 月增5-30万', lessons: 12 },
  { id: 'T7', name: '社交营销', icon: '🎮', color: '#6366f1', industries: '直销/网络营销、游戏娱乐', formula: '裂变系数K值 × 团队规模 = 收益指数级增长', lessons: 12 },
  { id: 'T8', name: '短剧动漫创作', icon: '🎬', color: '#a855f7', industries: 'AI漫剧、AI短剧、AI商业广告', formula: '内容产出×平台分发×付费转化 = 月收入3-50万', lessons: 12 }
];

// 通用基础课时（C01-C05，OPC Learning OS）
export const baseLessons = [
  { id: 'C01', title: 'AI智能体认知革命', subtitle: 'LLM + RAG + Tools 三大核心引擎', duration: 25, points: ['智能体 vs 传统工具对比', '10分钟创建第一个智能体', '认知破局'] },
  { id: 'C02', title: 'OPC平台全功能实操', subtitle: '知识库 + 对话流 + 工作流引擎', duration: 35, points: ['文档/网页/FAQ知识库', '多轮交互设计', 'API对接'] },
  { id: 'C03', title: 'AI赋能商业变现', subtitle: '降本/增效/创收三大路径', duration: 30, points: ['行业变现公式', 'ROI量化框架', '汇报话术'] },
  { id: 'C04', title: 'OPC社区战略全景', subtitle: '一人公司理念 + 万亿市场', duration: 35, points: ['三方合作架构', '四层技术栈', '三阶段路径'] },
  { id: 'C05', title: 'OPC社区商业模式与产教融合', subtitle: '七大收入 + 五维闭环', duration: 30, points: ['七大收入来源', 'KPI体系', 'OPC认证体系'] }
];

// 课时区块示例（C01）
export const lessonContent = {
  'C01': {
    blocks: [
      { type: 'intro', title: '本课导读', content: '本节课将带你从0认知AI智能体的三大核心引擎，理解智能体与传统工具的本质区别，并在10分钟内创建你的第一个智能体。' },
      { type: 'concept', title: '智能体三大核心引擎', items: [
        { name: 'LLM (大语言模型)', desc: '提供推理与对话能力，是智能体的"大脑"' },
        { name: 'RAG (检索增强)', desc: '让智能体拥有专属知识库，回答更精准' },
        { name: 'Tools (工具调用)', desc: '让智能体能调用外部API，真正"做事"' }
      ]},
      { type: 'comparison', title: '智能体 vs 传统工具', headers: ['维度', '传统工具', 'AI智能体'], rows: [
        ['交互方式', '点击/填表', '自然语言对话'],
        ['知识范围', '固定功能', '动态学习+检索'],
        ['任务复杂度', '单一任务', '复杂多步推理'],
        ['迭代成本', '需要开发', '改提示词即可']
      ]},
      { type: 'workflow', title: '10分钟创建第一个智能体', steps: [
        { step: 1, title: '注册扣子(Coze)账号', desc: '访问 coze.cn，使用手机号注册' },
        { step: 2, title: '创建Bot', desc: '点击"创建Bot"，填写名称和介绍' },
        { step: 3, title: '编写提示词', desc: '在人设中描述Bot的角色、任务、风格' },
        { step: 4, title: '上传知识库', desc: '上传PDF/Word文档，让Bot拥有专属知识' },
        { step: 5, title: '测试与发布', desc: '右侧测试对话，满意后发布到飞书/微信' }
      ]},
      { type: 'tip', title: '💡 关键洞察', content: '不要把智能体当成"更聪明的搜索"，要当成"7×24小时的专业助理"。它的价值在于"代替你做事"，而不是"告诉你答案"。' },
      { type: 'summary', title: '本课小结', points: ['LLM + RAG + Tools = 完整智能体', '智能体是"会做事"的AI，不是更强的搜索引擎', '10分钟即可在扣子平台搭建第一个智能体'], next: '下一课：OPC平台全功能实操' }
    ],
    quiz: [
      { q: '智能体的三大核心引擎是？', options: ['LLM + RAG + Tools', 'GPT + Claude + Gemini', 'Midjourney + SD + Kling', 'Python + JavaScript + Go'], answer: 0 },
      { q: 'RAG 的主要作用是？', options: ['让模型变快', '让智能体拥有专属知识库', '降低成本', '生成图片'], answer: 1 },
      { q: '与传统工具相比，智能体最大的优势是？', options: ['更便宜', '自然语言交互+复杂推理', '不需要电脑', '完全开源'], answer: 1 }
    ]
  }
};

// 提示词库（28条，9行业 × 5类别）
export const prompts = [
  { id: 'P01', track: '电商', category: '客服', title: '智能客服欢迎话术', content: '你是一名电商资深客服，请根据用户进店时段（早/中/晚）输出三套差异化欢迎话术，每套包含问候+商品引导+优惠提示，语气亲切自然，单条≤80字。' },
  { id: 'P02', track: '电商', category: '内容', title: '商品详情页文案', content: '请为以下商品撰写小红书风格详情页：商品=[商品名]。包含：①痛点钩子 ②核心卖点3条 ③使用场景 ④用户证言 ⑤行动号召。每段≤30字，总长≤300字。' },
  { id: 'P03', track: '电商', category: '销售', title: '促销转化话术', content: '基于"限时+稀缺+从众"心理学设计大促话术，目标转化率提升20%，输出5种话术版本及适用场景。' },
  { id: 'P04', track: '美业', category: '内容', title: '合规种草文案', content: '撰写美业产品种草文案，严格规避"绝对化用语/治疗效果/医疗术语"三色合规词库，输出小红书+抖音双版本。' },
  { id: 'P05', track: '美业', category: '客服', title: '肤质咨询脚本', content: '设计肤质咨询5轮对话脚本：①问候 ②肤质判断 ③产品推荐 ④合规免责 ⑤预约引导。' },
  { id: 'P06', track: '餐饮', category: '营销', title: '到店活动文案', content: '为[餐厅名]策划月度到店活动，输出活动主题+海报文案+大众点评推文+微信群推送话术。' },
  { id: 'P07', track: '餐饮', category: '客服', title: '预订接待话术', content: '设计电话预订标准话术：确认人数+时间+特殊需求+到店引导，包含3种突发情况应对。' },
  { id: 'P08', track: '房产', category: '销售', title: '客户需求挖掘', content: '通过SPIN提问法设计10个客户需求挖掘问题，覆盖预算/家庭/生活/投资四大维度。' },
  { id: 'P09', track: '房产', category: '分析', title: '楼盘对比报告', content: '生成3个楼盘对比报告，维度包含：地段/价格/户型/配套/学区/升值潜力，输出客户决策建议。' },
  { id: 'P10', track: '教育', category: '销售', title: '课程咨询转化', content: '撰写教育课程咨询5步话术：兴趣激发→痛点放大→方案匹配→价值传递→限时促单。' },
  { id: 'P11', track: '教育', category: '内容', title: '知识点讲解卡', content: '将[知识点]改写为3种风格：①小红书种草版 ②抖音口播版 ③朋友圈分享版。' },
  { id: 'P12', track: 'B2B', category: '销售', title: '询盘报价邮件', content: '撰写跨境B2B询盘回复邮件，包含：感谢+产品确认+MOQ+价格阶梯+认证文件+样品方案。' },
  { id: 'P13', track: 'B2B', category: '内容', title: '工厂介绍文案', content: '为外贸工厂撰写英文LinkedIn介绍，突出资质/规模/客户/认证四大信任要素。' },
  { id: 'P14', track: '社交', category: '营销', title: '社群运营SOP', content: '设计30天社群冷启动SOP，包含：种子用户/内容日历/活动节点/裂变机制/转化路径。' },
  { id: 'P15', track: '社交', category: '内容', title: '裂变海报文案', content: '设计高转化裂变海报文案：钩子标题+稀缺承诺+权威背书+行动指令+扫码引导。' },
  { id: 'P16', track: '短剧', category: '内容', title: 'AI短剧剧本生成', content: '生成3分钟竖屏短剧剧本：前3秒钩子+30秒反转+悬念结尾+下集预告，主题=[主题]，包含分镜+台词+BGM建议。' },
  { id: 'P17', track: '短剧', category: '内容', title: 'AI漫剧角色设定', content: '为漫剧主角生成完整设定卡：外貌/服装/性格/背景/口头禅/标志动作，确保跨场景一致性。' },
  { id: 'P18', track: '短剧', category: '内容', title: '分镜脚本生成', content: '将剧本拆解为分镜脚本：镜号/景别/运镜/画面描述/台词/时长/音效，输出表格格式。' },
  { id: 'P19', track: '短剧', category: '分析', title: '短剧爆款分析', content: '分析[剧名]爆款要素：钩子机制/反转节奏/情绪曲线/付费点设计，输出可复用模板。' },
  { id: 'P20', track: 'OPC社区', category: '销售', title: 'OPC商业计划书', content: '撰写OPC一人公司商业计划书：①市场机会 ②产品定位 ③商业模式 ④运营计划 ⑤团队 ⑥财务预测 ⑦风险与融资，面向投资人版本。' },
  { id: 'P21', track: 'OPC社区', category: '内容', title: '创作者90天计划', content: '为AI创作者制定90天行动计划：分月任务+所需AI工具+预期产出+变现节点，含每周checklist。' },
  { id: 'P22', track: 'OPC社区', category: '分析', title: 'OPC项目ROI分析', content: '生成OPC孵化项目ROI分析：投入成本+七大收入预测+盈亏平衡测算+敏感度分析。' },
  { id: 'P23', track: 'OPC社区', category: '销售', title: '会员升级话术', content: '设计OPC会员升级话术（标准→高级→孵化），突出权益对比+ROI+成功案例。' },
  { id: 'P24', track: '电商', category: '分析', title: '竞品对标分析', content: '生成同品类Top5竞品对标报告：定价/卖点/视觉/评价/差评分析，输出差异化策略。' },
  { id: 'P25', track: '美业', category: '销售', title: '私域复购脚本', content: '设计美业私域复购话术：到货关怀+使用反馈+连带推荐+复购优惠+转介绍激励。' },
  { id: 'P26', track: '餐饮', category: '分析', title: '门店数据洞察', content: '基于美团/饿了么数据生成月度运营报告：流量/转化/复购/差评，输出3条优化建议。' },
  { id: 'P27', track: '教育', category: '分析', title: '学员续课预测', content: '基于学员学习行为数据，预测续课概率并输出分层运营策略（高/中/低）。' },
  { id: 'P28', track: 'OPC社区', category: '营销', title: 'OPC招商海报文案', content: '撰写OPC社区入驻招商文案：使命愿景+权益亮点+成功案例+入驻路径+扫码报名。' },
  // ====== 扩展提示词（覆盖所有赛道，含通用类） ======
  { id: 'P29', track: '电商', category: '内容', title: '小红书爆款笔记', content: '生成小红书爆款笔记：标题(吸睛+数字+痛点) + 正文(故事+干货+清单) + 标签 5 个 + 配图建议 3 张。主题=[商品/品类]。' },
  { id: 'P30', track: '电商', category: '营销', title: '直播带货脚本', content: '撰写 30 分钟直播带货脚本：开场暖场 5 分 + 产品介绍 15 分(含 3 次互动) + 促单 8 分 + 收尾 2 分。商品=[]，价格=[]。' },
  { id: 'P31', track: '美业', category: '内容', title: '美业朋友圈日更', content: '生成美业 7 天朋友圈日更内容：①早安鸡汤 ②产品干货 ③客户案例 ④活动预告 ⑤晚安互动 ⑥科普避坑 ⑦优惠引导，每条 ≤100 字 + 配图建议。' },
  { id: 'P32', track: '美业', category: '分析', title: '美业用户画像', content: '基于到店消费数据生成用户画像：年龄/职业/消费水平/肤质/护肤习惯/痛点，并按 RFM 模型分层。' },
  { id: 'P33', track: '餐饮', category: '内容', title: '餐厅菜单文案', content: '为新菜单撰写菜品文案：每道菜 50 字 = 食材原产地 + 烹饪工艺 + 风味描述 + 适合人群，激发食欲与下单冲动。' },
  { id: 'P34', track: '餐饮', category: '销售', title: '会员储值话术', content: '设计餐饮会员储值话术 3 套：充 500 送 50/充 1000 送 200/充 3000 送 800，含场景对白与异议处理。' },
  { id: 'P35', track: '房产', category: '内容', title: '房源短视频脚本', content: '生成房源 60 秒短视频脚本：前 3 秒钩子 + 户型亮点 3 条 + 周边配套 + 价格对比 + 行动号召，竖屏 9:16。' },
  { id: 'P36', track: '房产', category: '客服', title: '客户跟进话术', content: '设计客户跟进 5 阶话术：初识破冰/需求确认/带看邀约/异议处理/逼单促成，每阶含 3 种异议应对。' },
  { id: 'P37', track: '教育', category: '营销', title: '试听课转化邮件', content: '撰写试听课转化邮件 3 封：①试听后 24h ②3 天后 ③7 天最后促单，含案例+优惠+紧迫感。' },
  { id: 'P38', track: '教育', category: '客服', title: '家长答疑话术', content: '设计家长常见 10 大问题答疑话术：价格/效果/师资/退费/学习压力等，专业且温暖。' },
  { id: 'P39', track: 'B2B', category: '营销', title: '展会邀约函', content: '撰写英文展会邀约函：展位号 + 新品亮点 + 限定优惠 + 一对一洽谈预约链接 + 礼品。' },
  { id: 'P40', track: 'B2B', category: '分析', title: '海外客户开发', content: '基于 LinkedIn 开发 100 位精准海外客户：行业/职位/公司规模/采购特征筛选 + 个性化首封开发信模板。' },
  { id: 'P41', track: '社交', category: '客服', title: '社群活跃 SOP', content: '设计 7 天社群活跃 SOP：每日话题/打卡/福利/答疑/案例分享/晚安仪式，配每日具体话术。' },
  { id: 'P42', track: '社交', category: '分析', title: '裂变效果分析', content: '基于活动数据生成裂变效果分析：K 值/转化漏斗/分层用户/优化建议，输出可视化报告大纲。' },
  { id: 'P43', track: '短剧', category: '营销', title: '短剧投流脚本', content: '为微短剧设计 30 秒投流物料：3 秒钩子 + 高潮预告 + 悬念断点 + CTA，吸引点击付费。' },
  { id: 'P44', track: '短剧', category: '销售', title: '短剧 IP 招商', content: '撰写短剧 IP 品牌植入招商方案：受众画像 + 植入位置 + 露出形式 + 数据预估 + 报价。' },
  { id: 'P45', track: 'OPC社区', category: '客服', title: '社区入驻咨询', content: '设计 OPC 社区入驻咨询 7 步话术：欢迎 → 需求挖掘 → 权益匹配 → ROI 测算 → 案例佐证 → 异议处理 → 邀约到访。' },
  { id: 'P46', track: 'OPC社区', category: '内容', title: 'OPC 学员故事', content: '将一段学员经历改写为 3 种内容：小红书种草帖 + 视频号脚本 + 朋友圈长文，突出 "一人公司" 的转变。' },
  { id: 'P47', track: '通用', category: '内容', title: '万能拆解器', content: '请将以下内容拆解为：①核心观点 3 条 ②支撑论据 ③可执行动作清单 ④可能的反对意见 ⑤金句 1 条。内容=[]。' },
  { id: 'P48', track: '通用', category: '分析', title: 'SWOT 分析', content: '为 [项目/产品] 生成 SWOT 分析：优势/劣势/机会/威胁各 3-5 条 + 综合策略建议。' },
  { id: 'P49', track: '通用', category: '销售', title: 'BP 商业计划书', content: '生成完整商业计划书框架：市场/产品/团队/竞争/财务/融资 6 大模块，每模块要点 + 数据支撑提示。' },
  { id: 'P50', track: '通用', category: '营销', title: '内容选题 30 个', content: '基于 [行业/账号定位]，生成 30 个高传播潜力的选题：钩子标题 + 角度 + 受众痛点，分 5 类排布。' }
];

// 成就徽章
export const achievements = [
  { id: 'A1', icon: '🎯', name: '初入AI世界', desc: '完成第一堂课', condition: 'lessons>=1' },
  { id: 'A2', icon: '📚', name: '基础奠基者', desc: '完成全部5门通用基础课', condition: 'baseLessons==5' },
  { id: 'A3', icon: '🛍️', name: '电商先锋', desc: '完成电商赛道第一阶段', condition: 'track1Stage1' },
  { id: 'A4', icon: '🎬', name: '短剧新星', desc: '完成短剧动漫赛道第一阶段', condition: 'track8Stage1' },
  { id: 'A5', icon: '🤖', name: 'AI工程师', desc: '在AI工坊部署第一个智能体', condition: 'agentDeployed>=1' },
  { id: 'A6', icon: '🔥', name: '连续学习7天', desc: '保持7天连续学习', condition: 'streak>=7' },
  { id: 'A7', icon: '💪', name: '半程英雄', desc: '完成任一赛道50%课时', condition: 'anyTrack>=50%' },
  { id: 'A8', icon: '🏆', name: '赛道冠军', desc: '完成任一完整赛道', condition: 'anyTrack==100%' },
  { id: 'A9', icon: '✨', name: '全能大师', desc: '完成3个以上赛道', condition: 'tracks>=3' },
  { id: 'A10', icon: '💡', name: '提示词达人', desc: '收藏10个以上提示词', condition: 'prompts>=10' },
  { id: 'A11', icon: '🚀', name: '变现实战家', desc: '完成任一赛道第四阶段', condition: 'anyTrackStage4' },
  { id: 'A12', icon: '🌟', name: '知识传播者', desc: '分享课程给3位好友', condition: 'shares>=3' },
  { id: 'A13', icon: '👑', name: 'OPC全域大师', desc: '完成全部课程', condition: 'allComplete' }
];
