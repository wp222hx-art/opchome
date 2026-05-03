// OPC 全部课程详细大纲 - 每门课包含 章节(modules) + 学习目标 + 工具 + 产出
// 后端可通过 /api/courses/:id 返回此结构
// 数据结构：
//   modules: [{ id, title, duration, objectives[], tools[], deliverable, blocks[] }]
//   blocks 类型：intro / concept / workflow / comparison / practice / tip / summary

const T = {
  intro: (content) => ({ type: 'intro', title: '本节导读', content }),
  concept: (title, items) => ({ type: 'concept', title, items }),
  workflow: (title, steps) => ({ type: 'workflow', title, steps }),
  comparison: (title, headers, rows) => ({ type: 'comparison', title, headers, rows }),
  practice: (title, content) => ({ type: 'practice', title, content }),
  tip: (content) => ({ type: 'tip', title: '💡 关键洞察', content }),
  summary: (points, next = '') => ({ type: 'summary', title: '本节小结', points, next })
};

// ========================================================
// 第一阶 认知与基础
// ========================================================

const A1 = [
  { id: 'A1-1', title: 'AI时代的范式革命', duration: 60, objectives: ['理解AI对各行业的冲击与机会', '建立AI时代生存的底层认知'], tools: ['ChatGPT', 'Claude'], deliverable: '个人AI影响力清单',
    blocks: [
      T.intro('过去30年，互联网改变了信息流动；未来10年，AI将重塑生产关系。本节带你建立对AI时代的清醒认知。'),
      T.concept('AI带来的三大革命', [
        { name: '认知革命', desc: '从"找答案"到"提问题"，从"做事"到"指挥AI做事"' },
        { name: '生产革命', desc: '一人公司(OPC)成为可能，个人=超级个体' },
        { name: '协作革命', desc: '人+AI 双轮驱动，效率提升10-100倍' }
      ]),
      T.comparison('传统时代 vs AI时代', ['维度', '传统时代', 'AI时代'], [
        ['核心能力', '专业技能', '提示词+判断力'],
        ['团队结构', '5-50人', '1人+N个AI'],
        ['启动成本', '50-500万', '几千-几万'],
        ['迭代速度', '月/季度', '天/小时']
      ]),
      T.tip('AI 不会替代人，但会替代不会用 AI 的人。早 6 个月入局，胜过晚入 2 年。'),
      T.summary(['AI 是认知革命+生产革命+协作革命', '一人公司(OPC)是 AI 时代的最佳商业组织', '提示词+判断力 比专业技能更稀缺'], '下一节：6大主流AI工具速览')
    ]},
  { id: 'A1-2', title: '6大主流AI工具速览', duration: 60, objectives: ['认识 ChatGPT/Claude/Gemini 等主流模型', '区分文/图/视/音 四类AI工具'], tools: ['ChatGPT', 'Claude', 'Gemini', '通义千问', '通义万相', 'Kimi', 'Suno'],
    deliverable: '6款工具体验报告',
    blocks: [
      T.intro('一次性认识当下最强的6款AI工具，掌握它们的差异化定位与最佳使用场景。'),
      T.concept('文本类四强对比', [
        { name: 'ChatGPT', desc: '综合最强，多模态+插件生态' },
        { name: 'Claude', desc: '长文本+逻辑推理王者，200K上下文' },
        { name: 'Gemini', desc: 'Google 全家桶整合' },
        { name: '通义千问/Kimi', desc: '中文场景最佳，免费+长文本' }
      ]),
      T.workflow('5分钟工具试用流程', [
        { step: 1, title: '注册账号', desc: 'ChatGPT/Claude 需海外手机号；通义/Kimi 国内可直接用' },
        { step: 2, title: '同一问题测试', desc: '用同一个问题问4款模型，对比回答' },
        { step: 3, title: '记录差异', desc: '建立"自己的工具地图"' }
      ]),
      T.summary(['不同模型擅长不同场景', '中文优先用通义/Kimi', '英文/逻辑/编程优先 Claude/ChatGPT'])
    ]},
  { id: 'A1-3', title: '提示词的3个魔法句式', duration: 60, objectives: ['掌握"角色+任务+约束"基础结构', '会写日常工作10类提示词'], tools: ['ChatGPT', 'Claude'],
    deliverable: '10条个人提示词',
    blocks: [
      T.concept('黄金三段式', [
        { name: '角色 (Role)', desc: '"你是一名…"，让AI进入专业人设' },
        { name: '任务 (Task)', desc: '具体要做什么事，越明确越好' },
        { name: '约束 (Constraint)', desc: '格式/长度/语气/输出方式' }
      ]),
      T.practice('实战练习', '请用三段式撰写："帮我写一封请假邮件"的提示词。提示：角色=职场HR专家；任务=写一封因病请假邮件；约束=300字以内、礼貌、含日期。'),
      T.tip('好提示词 = 1分钟思考结构 + 30秒打字。质量提升 10 倍。')
    ]},
  { id: 'A1-4', title: 'AI生图与音视频初体验', duration: 90, objectives: ['用通义万相生成商业海报', '用 Suno 生成原创音乐'], tools: ['通义万相', 'Suno', 'Kling'],
    deliverable: '1张海报+1首歌+1段视频',
    blocks: [
      T.intro('AI 不只是文字，它正在重塑视觉与声音的生产方式。本节用 60 分钟生成你人生第一件 AI 创作作品。'),
      T.workflow('AI 海报 5 步', [
        { step: 1, title: '描述画面', desc: '主体+场景+风格+灯光' },
        { step: 2, title: '选择模型', desc: '通义万相3.0/Midjourney V6' },
        { step: 3, title: '生成', desc: '一次出4张，挑最优' },
        { step: 4, title: '加文案', desc: 'Canva 套模板' },
        { step: 5, title: '导出', desc: 'JPG/PNG 1080p' }
      ]),
      T.practice('AI 音乐 3 步', '① Suno 输入 "上海外滩夜景，City Pop 风格，女声" ② 选择 v3.5 模型 ③ 30秒后下载.mp3')
    ]},
  { id: 'A1-5', title: '制定你的90天AI学习计划', duration: 90, objectives: ['评估自身AI水平', '制定可落地90天学习路径'], tools: ['ChatGPT'],
    deliverable: '90天个人AI学习计划',
    blocks: [
      T.workflow('计划制定3步', [
        { step: 1, title: '能力盘点', desc: '从"知道→会用→精通"3级评估当前位置' },
        { step: 2, title: '目标拆解', desc: '90天 = 3个月 = 12周 = 90天，每月一个里程碑' },
        { step: 3, title: 'AI生成日历', desc: '让 ChatGPT 生成 90 天 checklist' }
      ]),
      T.summary(['学习 = 输入(看)+输出(做)+反馈(改)', 'AI 时代，1天1小时 > 1月100小时', '加入 OPC 社区，找到同行者'])
    ]}
];

const A2 = [
  { id: 'A2-1', title: 'AI写邮件与会议纪要', duration: 90, objectives: ['10分钟生成专业邮件', '5分钟生成完整会议纪要'], tools: ['ChatGPT', 'Claude', '飞书AI', 'Otter'],
    deliverable: '5封邮件+3份纪要',
    blocks: [
      T.workflow('AI 邮件 SOP', [
        { step: 1, title: '场景分类', desc: '请假/汇报/合作/拒绝/感谢 5 大类' },
        { step: 2, title: '调用模板', desc: '不同场景调用不同提示词模板' },
        { step: 3, title: '人设微调', desc: '加入 1-2 个个人风格细节' },
        { step: 4, title: 'AI 校对', desc: '让 Claude 检查语气与逻辑' }
      ]),
      T.practice('实战', '用 AI 撰写一封"礼貌拒绝合作邀约"的英文邮件。')
    ]},
  { id: 'A2-2', title: 'AI数据分析与图表生成', duration: 90, objectives: ['用 ChatGPT 高级数据分析处理 Excel', '生成洞察图表'], tools: ['ChatGPT (Code Interpreter)', 'Claude', 'Excel'],
    deliverable: '1份完整数据分析报告',
    blocks: [
      T.workflow('Excel + AI 分析流程', [
        { step: 1, title: '上传数据', desc: 'CSV/Excel 拖入 ChatGPT' },
        { step: 2, title: '提问', desc: '"分析销售数据，找出增长TOP3 SKU"' },
        { step: 3, title: '生成图表', desc: '柱状图/趋势图/热力图自动生成' },
        { step: 4, title: '导出报告', desc: 'PDF/PPT 一键导出' }
      ])
    ]},
  { id: 'A2-3', title: 'Gamma 一键生成 PPT', duration: 90, objectives: ['10分钟生成商业级PPT', '掌握 Gamma 编辑技巧'], tools: ['Gamma', 'ChatGPT'],
    deliverable: '1份20页商业PPT',
    blocks: [
      T.workflow('Gamma 制作 PPT', [
        { step: 1, title: '撰写大纲', desc: '让 ChatGPT 先列 10 页大纲' },
        { step: 2, title: '导入 Gamma', desc: '粘贴大纲，一键生成' },
        { step: 3, title: '修改样式', desc: '换主题/字体/配图' },
        { step: 4, title: '导出', desc: 'PPTX / PDF / 在线分享' }
      ])
    ]},
  { id: 'A2-4', title: '搭建你的第一个工作 Bot', duration: 120, objectives: ['用扣子搭建私人Bot', '上传知识库实现专属问答'], tools: ['扣子(Coze)', '飞书'],
    deliverable: '1个可用的私人Bot',
    blocks: [
      T.workflow('扣子 Bot 搭建 5 步', [
        { step: 1, title: '注册扣子', desc: '访问 coze.cn' },
        { step: 2, title: '创建Bot', desc: '填写名称+人设' },
        { step: 3, title: '上传知识', desc: '公司SOP/FAQ/产品手册' },
        { step: 4, title: '配置技能', desc: '联网/画图/工作流' },
        { step: 5, title: '发布', desc: '飞书/微信/网页内嵌' }
      ])
    ]}
];

const A3 = [
  { id: 'A3-1', title: '文本类AI工具大盘点(8款)', duration: 120, objectives: ['一次性掌握8款主流文本AI', '建立工具选型决策树'], tools: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', '通义', 'Kimi', '智谱清言', '文心一言'],
    deliverable: '工具选型决策表',
    blocks: [T.concept('8款工具差异化定位', [
      { name: 'ChatGPT', desc: '通用最强+插件生态' },
      { name: 'Claude', desc: '长文本+逻辑推理' },
      { name: 'Perplexity', desc: 'AI 搜索引擎，带引用' },
      { name: 'Kimi', desc: '中文长文本免费王者' }
    ])]},
  { id: 'A3-2', title: 'AI生图四大金刚', duration: 120, objectives: ['MJ/SD/通义/Flux 各擅长什么', '会基础提示词与参数'], tools: ['Midjourney', 'Stable Diffusion', '通义万相', 'Flux'], deliverable: '20张商业级AI图',
    blocks: [T.workflow('MJ 商业图工作流', [
      { step: 1, title: '场景描述', desc: 'subject + scene + style + lighting' },
      { step: 2, title: '参数调整', desc: '--ar 16:9 --v 6 --s 250' },
      { step: 3, title: '局部重绘', desc: 'Vary Region 微调' },
      { step: 4, title: '放大下载', desc: 'Upscale 4K' }
    ])]},
  { id: 'A3-3', title: 'AI视频工具实操', duration: 120, objectives: ['Kling/Vidu/Sora/Runway 各擅长什么', '生成 5 秒商业短视频'], tools: ['Kling', 'Vidu', 'Runway', '剪映AI'], deliverable: '5条AI短视频',
    blocks: [T.tip('国产 Kling 在中文场景、人物动作、性价比上已超越多数海外工具。')]},
  { id: 'A3-4', title: 'AI音频与语音克隆', duration: 90, objectives: ['ElevenLabs 克隆自己声音', 'Suno 生成原创音乐'], tools: ['ElevenLabs', 'Suno', '魔音工坊'], deliverable: '1个个人语音库+5首音乐',
    blocks: [T.workflow('声音克隆 3 步', [
      { step: 1, title: '录制样本', desc: '清晰 1 分钟' },
      { step: 2, title: '上传克隆', desc: 'ElevenLabs 一键克隆' },
      { step: 3, title: '生成内容', desc: '输入文字即可用你的声音输出' }
    ])]},
  { id: 'A3-5', title: '搭建个人AI工具地图', duration: 60, objectives: ['整理40+工具个人手册', '形成自己的工作流'], tools: ['Notion', 'Excel'], deliverable: '个人 AI 工具手册',
    blocks: [T.summary(['工具不在多，在精', '形成"主力3款+备用5款"组合', '每月迭代一次工具地图'])]}
];

const A4 = [
  { id: 'A4-1', title: '编程零基础认知打通', duration: 90, objectives: ['理解前端/后端/数据库三件套', '建立编程世界观'], tools: ['Cursor', 'ChatGPT'], deliverable: '编程世界观笔记',
    blocks: [T.concept('Web 应用三层结构', [
      { name: '前端 (Frontend)', desc: '用户看到的界面，HTML/CSS/JS' },
      { name: '后端 (Backend)', desc: '服务器逻辑，处理请求与数据' },
      { name: '数据库 (Database)', desc: '存储数据，MySQL/PostgreSQL' }
    ])]},
  { id: 'A4-2', title: 'Cursor + AI 写第一个网页', duration: 120, objectives: ['用 Cursor 30分钟做一个个人主页', '理解 AI 编程的对话模式'], tools: ['Cursor'], deliverable: '个人主页(已部署)',
    blocks: [T.workflow('Cursor 上手', [
      { step: 1, title: '下载安装', desc: 'cursor.com 下载' },
      { step: 2, title: 'Cmd+K 提需求', desc: '"做一个个人主页，含头像、简介、作品"' },
      { step: 3, title: '迭代', desc: '直接对话改样式' },
      { step: 4, title: '部署', desc: '一键 Vercel 部署' }
    ])]},
  { id: 'A4-3', title: 'V0 + Bolt 快速做产品原型', duration: 120, objectives: ['用 V0 做 UI', '用 Bolt 做全栈应用'], tools: ['V0', 'Bolt.new', 'Replit'], deliverable: '1个全栈Demo',
    blocks: []},
  { id: 'A4-4', title: '部署你的第一个 AI 小产品', duration: 90, objectives: ['用 Vercel/Netlify 部署', '获得可分享 URL'], tools: ['Vercel', 'GitHub'], deliverable: '可访问的在线产品',
    blocks: [T.tip('部署不再是程序员特权，AI 时代每个人都该有自己的小产品。')]}
];

const B1 = [
  { id: 'B1-1', title: '提示词的本质是"沟通"', duration: 45, objectives: ['理解 AI 是"实习生"思维', '建立提示词写作心法'], tools: ['ChatGPT'], deliverable: '5条改造前后对比',
    blocks: [T.concept('好提示词的4要素', [
      { name: '角色 Role', desc: '让AI进入专业人设' },
      { name: '任务 Task', desc: '具体要做什么' },
      { name: '上下文 Context', desc: '背景信息' },
      { name: '格式 Format', desc: '输出格式' }
    ])]},
  { id: 'B1-2', title: '黄金公式与10个常用模板', duration: 60, objectives: ['掌握"角色+任务+上下文+格式+示例"', '熟练使用10类模板'], tools: ['ChatGPT', 'Claude'], deliverable: '个人提示词速查手册',
    blocks: [T.workflow('5要素公式', [
      { step: 1, title: 'Role', desc: '你是…' },
      { step: 2, title: 'Task', desc: '请帮我…' },
      { step: 3, title: 'Context', desc: '背景是…' },
      { step: 4, title: 'Format', desc: '输出格式：' },
      { step: 5, title: 'Example', desc: '示例如下…' }
    ])]},
  { id: 'B1-3', title: '提示词调试与迭代', duration: 75, objectives: ['会调试不满意的输出', '迭代提示词到满意'], tools: ['ChatGPT'], deliverable: '迭代3轮的高质量提示词',
    blocks: [T.tip('提示词不是写出来的，是调出来的。第一稿永远只是起点。')]}
];

// ========================================================
// 第二阶 技能与方向
// ========================================================
const B2 = [
  { id: 'B2-1', title: 'CoT/ToT/ReAct 进阶推理', duration: 90, objectives: ['理解链式思考(CoT)', '掌握思维树(ToT)与ReAct'], tools: ['ChatGPT', 'Claude'], deliverable: '3类推理提示词',
    blocks: [T.concept('三种推理范式', [
      { name: 'CoT 链式思考', desc: '"让我们一步步思考"，引导分步推理' },
      { name: 'ToT 思维树', desc: '生成多条思考路径，自我评估最优' },
      { name: 'ReAct', desc: 'Reason + Act，思考+调用工具' }
    ])]},
  { id: 'B2-2', title: 'MJ 商业级提示词工程', duration: 90, objectives: ['掌握 MJ 高级参数', '生成商业海报级图像'], tools: ['Midjourney V6'], deliverable: '20张商业级图',
    blocks: [T.workflow('MJ 商业级 7 字诀', [
      { step: 1, title: '主体', desc: '清晰单一的主体' },
      { step: 2, title: '场景', desc: '环境/季节/时间' },
      { step: 3, title: '镜头', desc: '远景/中景/特写' },
      { step: 4, title: '光影', desc: '自然光/影棚光' },
      { step: 5, title: '风格', desc: '电影感/油画/极简' },
      { step: 6, title: '色调', desc: '暖色/冷色/对比色' },
      { step: 7, title: '参数', desc: '--ar 16:9 --s 250' }
    ])]},
  { id: 'B2-3', title: 'ComfyUI 工作流搭建', duration: 120, objectives: ['搭建 SDXL 出图工作流', '理解节点式编程思维'], tools: ['ComfyUI', 'SDXL'], deliverable: '3条可复用工作流',
    blocks: []},
  { id: 'B2-4', title: '跨模态提示词矩阵', duration: 60, objectives: ['打通文/图/视/音 提示词', '建立个人 100 条 Prompt 库'], tools: ['全套AI工具'], deliverable: '100条Prompt库',
    blocks: [T.summary(['文->图->视->音 是创作流水线', '同一概念可跨4种模态复用', '高质量提示词是数字资产'])]}
];

const B3 = [
  { id: 'B3-1', title: 'Prompt工程师认知体系', duration: 120, objectives: ['理解Prompt工程师核心价值', '建立职业认知'], tools: [], deliverable: '职业规划书', blocks: []},
  { id: 'B3-2', title: '高级Prompt技巧:Few-shot / Self-Consistency', duration: 180, objectives: ['Few-shot Learning', 'Self-Consistency 投票'], tools: ['ChatGPT', 'Claude'], deliverable: '10个高级模板', blocks: []},
  { id: 'B3-3', title: '智能体工作流:扣子+Dify', duration: 240, objectives: ['搭建多步骤Agent', 'API集成与部署'], tools: ['扣子', 'Dify'], deliverable: '完整Agent作品', blocks: []},
  { id: 'B3-4', title: '认证作品集与考试', duration: 180, objectives: ['完成认证作品', '通过OPC认证'], tools: [], deliverable: 'OPC Prompt工程师证书', blocks: []}
];

const B4 = [
  { id: 'B4-1', title: 'GPTs 创建与上架', duration: 180, objectives: ['创建商业级GPTs', '上架GPTs Store'], tools: ['GPTs', 'ChatGPT Plus'], deliverable: '1个上架的GPTs', blocks: []},
  { id: 'B4-2', title: 'Prompt 产品商业化', duration: 180, objectives: ['PromptBase 上架', '定价与营销策略'], tools: ['PromptBase', 'FlowGPT'], deliverable: '可销售Prompt产品', blocks: []},
  { id: 'B4-3', title: '商业计划与持续运营', duration: 120, objectives: ['月度迭代SOP', '社群运营'], tools: ['ChatGPT'], deliverable: '商业计划书', blocks: []}
];

const L2A = [
  { id: 'L2A-1', title: '短视频AI工具全景', duration: 180, objectives: ['熟悉Kling/Vidu/Runway/剪映AI', '建立工具选型表'], tools: ['Kling', 'Vidu', 'Runway', '剪映AI'], deliverable: '工具对比表', blocks: []},
  { id: 'L2A-2', title: '脚本+分镜+配音全流程', duration: 240, objectives: ['ChatGPT写脚本', 'ElevenLabs配音'], tools: ['ChatGPT', 'ElevenLabs'], deliverable: '完整脚本+配音', blocks: []},
  { id: 'L2A-3', title: 'AI视频生成与剪辑', duration: 240, objectives: ['Kling生成视频', '剪映剪辑'], tools: ['Kling', '剪映AI'], deliverable: '3条完整短视频', blocks: []},
  { id: 'L2A-4', title: '发布运营与流量', duration: 60, objectives: ['抖音/视频号发布SOP', '冷启动流量'], tools: ['抖音', '飞瓜'], deliverable: '运营计划', blocks: []}
];

const L2B = [
  { id: 'L2B-1', title: '微短剧市场与赛道', duration: 120, objectives: ['理解微短剧爆发逻辑', '定位赛道'], tools: [], deliverable: '赛道选择', blocks: []},
  { id: 'L2B-2', title: 'AI编剧工作流', duration: 240, objectives: ['ChatGPT写剧本', '剧情结构设计'], tools: ['ChatGPT', 'Claude'], deliverable: '完整剧本', blocks: []},
  { id: 'L2B-3', title: '制片管理SOP', duration: 240, objectives: ['项目管理飞书', '预算与进度'], tools: ['飞书', 'Excel'], deliverable: '制片方案', blocks: []},
  { id: 'L2B-4', title: '发行与变现', duration: 120, objectives: ['平台对接', '分账模式'], tools: [], deliverable: '发行计划', blocks: []}
];

const L2C = [
  { id: 'L2C-1', title: '视觉设计基础与AI融合', duration: 180, objectives: ['设计基础原则', 'AI辅助设计'], tools: ['Midjourney', 'Figma'], deliverable: '基础设计作品', blocks: []},
  { id: 'L2C-2', title: '品牌LOGO与VI生成', duration: 240, objectives: ['MJ生成LOGO', 'Canva做VI'], tools: ['MJ', 'Canva'], deliverable: '完整品牌VI', blocks: []},
  { id: 'L2C-3', title: '海报与详情页设计', duration: 180, objectives: ['电商海报', '详情页排版'], tools: ['MJ', 'Canva', 'Figma'], deliverable: '10张海报+3个详情页', blocks: []},
  { id: 'L2C-4', title: '动态视觉与发布', duration: 120, objectives: ['动效设计', '多平台输出'], tools: ['ComfyUI'], deliverable: '动态视觉作品集', blocks: []}
];

const L2D = [
  { id: 'L2D-1', title: '新媒体平台分发策略', duration: 120, objectives: ['抖快小红视频号特性', '分发策略'], tools: [], deliverable: '分发策略表', blocks: []},
  { id: 'L2D-2', title: 'AI内容生产流水线', duration: 240, objectives: ['ChatGPT批量内容', '剪映AI批量剪辑'], tools: ['ChatGPT', '剪映'], deliverable: '30条内容', blocks: []},
  { id: 'L2D-3', title: '账号矩阵搭建', duration: 240, objectives: ['多账号定位', '矩阵协同'], tools: ['飞瓜', '蝉妈妈'], deliverable: '账号矩阵', blocks: []},
  { id: 'L2D-4', title: '数据复盘与优化', duration: 120, objectives: ['数据维度', 'A/B测试'], tools: ['飞瓜'], deliverable: '运营复盘报告', blocks: []}
];

const C1 = [
  { id: 'C1-1', title: 'AI助力备课与教研', duration: 240, objectives: ['ChatGPT写教案', 'AI出题'], tools: ['ChatGPT', 'Claude'], deliverable: '完整教案', blocks: []},
  { id: 'C1-2', title: '智慧课件与互动', duration: 240, objectives: ['Gamma做课件', '扣子做答疑Bot'], tools: ['Gamma', '扣子'], deliverable: '互动课件+Bot', blocks: []},
  { id: 'C1-3', title: '学情分析与个性化', duration: 240, objectives: ['学情数据', '个性化推送'], tools: ['Claude'], deliverable: '学情报告', blocks: []}
];

const C2 = [
  { id: 'C2-1', title: 'AI选品与市场分析', duration: 240, objectives: ['用AI分析平台数据', '找蓝海选品'], tools: ['ChatGPT', '生意参谋', '飞瓜'], deliverable: '选品分析报告', blocks: []},
  { id: 'C2-2', title: '商品视觉与详情页', duration: 360, objectives: ['MJ生成商品图', 'AI写详情页'], tools: ['Midjourney', 'ChatGPT', '美图AI'], deliverable: '完整商品视觉包', blocks: []},
  { id: 'C2-3', title: 'AI客服与转化', duration: 240, objectives: ['扣子搭客服Bot', '提升转化'], tools: ['扣子'], deliverable: '客服Bot+SOP', blocks: []},
  { id: 'C2-4', title: '直播与短视频带货', duration: 240, objectives: ['AI写直播脚本', 'AI做短视频'], tools: ['ChatGPT', '剪映'], deliverable: '直播+短视频内容', blocks: []}
];

const C3 = [
  { id: 'C3-1', title: 'AI用户画像与定位', duration: 180, objectives: ['用AI生成用户画像', 'STP定位'], tools: ['ChatGPT'], deliverable: '完整用户画像', blocks: []},
  { id: 'C3-2', title: '内容营销与SEO', duration: 240, objectives: ['内容选题', 'AI写文+SEO'], tools: ['ChatGPT', 'Perplexity'], deliverable: '20篇SEO内容', blocks: []},
  { id: 'C3-3', title: '广告投放与转化优化', duration: 180, objectives: ['Google Ads', 'AI生成广告创意'], tools: ['Google Ads', 'Canva'], deliverable: '投放方案', blocks: []}
];

const C4 = [
  { id: 'C4-1', title: '法律检索与摘要', duration: 240, objectives: ['Kimi读判例', '北大法宝AI检索'], tools: ['Kimi', '北大法宝AI'], deliverable: '案例摘要', blocks: []},
  { id: 'C4-2', title: '合同审查与起草', duration: 240, objectives: ['AI审合同', 'AI起草合同'], tools: ['Claude', 'ChatGPT'], deliverable: '审查报告+合同模板', blocks: []},
  { id: 'C4-3', title: '法务工作流自动化', duration: 240, objectives: ['搭建法务Bot', '工作流自动化'], tools: ['扣子', 'Dify'], deliverable: '法务Bot', blocks: []}
];

const C5 = [
  { id: 'C5-1', title: 'AI财务报告分析', duration: 240, objectives: ['Wind+ChatGPT', '财报快读'], tools: ['ChatGPT', 'Wind'], deliverable: '3份分析报告', blocks: []},
  { id: 'C5-2', title: '量化模型搭建', duration: 240, objectives: ['Python+AI', '简单量化策略'], tools: ['Python', 'ChatGPT'], deliverable: '量化模型', blocks: []},
  { id: 'C5-3', title: '风控与合规', duration: 240, objectives: ['AI识别风险', '合规检查'], tools: ['Claude'], deliverable: '风控方案', blocks: []}
];

const C6 = [
  { id: 'C6-1', title: '设计师AI工具栈', duration: 240, objectives: ['MJ/SD/Figma AI', 'ComfyUI'], tools: ['MJ', 'SD', 'ComfyUI', 'Figma'], deliverable: '工具地图', blocks: []},
  { id: 'C6-2', title: '品牌设计全案', duration: 360, objectives: ['LOGO/VI/包装', '一站式产出'], tools: ['MJ', 'Figma'], deliverable: '完整品牌全案', blocks: []},
  { id: 'C6-3', title: 'UI/UX 与原型', duration: 240, objectives: ['V0生成UI', '产品原型'], tools: ['V0', 'Figma'], deliverable: 'UI作品集', blocks: []},
  { id: 'C6-4', title: '商业接单流程', duration: 240, objectives: ['客户对接', '交付SOP'], tools: [], deliverable: '接单SOP', blocks: []}
];

const C7 = [
  { id: 'C7-1', title: '内容定位与选题', duration: 240, objectives: ['垂直领域定位', 'AI选题'], tools: ['ChatGPT', '飞瓜'], deliverable: '内容定位文档', blocks: []},
  { id: 'C7-2', title: '高效内容生产SOP', duration: 240, objectives: ['每日5条内容', 'AI批量生产'], tools: ['ChatGPT', '剪映', 'Canva'], deliverable: '内容生产SOP', blocks: []},
  { id: 'C7-3', title: '账号成长与变现', duration: 240, objectives: ['10万粉成长路径', '商单/带货/广告'], tools: ['飞瓜'], deliverable: '成长方案', blocks: []}
];

const C8 = [
  { id: 'C8-1', title: '课程产品化定位', duration: 240, objectives: ['课程选题', '用户画像'], tools: ['ChatGPT'], deliverable: '课程定位书', blocks: []},
  { id: 'C8-2', title: '内容设计与制作', duration: 240, objectives: ['课程大纲', 'Gamma+剪映出课件'], tools: ['Gamma', '剪映'], deliverable: '完整课程', blocks: []},
  { id: 'C8-3', title: '上架与转化', duration: 240, objectives: ['小鹅通上架', '私域转化'], tools: ['小鹅通', '扣子'], deliverable: '可销售课程', blocks: []}
];

const C9 = [
  { id: 'C9-1', title: '门店AI化经营', duration: 180, objectives: ['美团数据分析', 'AI写菜单'], tools: ['ChatGPT', '美团商家版'], deliverable: '门店AI运营方案', blocks: []},
  { id: 'C9-2', title: '私域与会员复购', duration: 180, objectives: ['企业微信私域', 'AI会员SOP'], tools: ['企业微信', '扣子'], deliverable: '私域运营SOP', blocks: []}
];

// 第三阶 实战与产出
const D1 = [
  { id: 'D1-1', title: '账号定位与选题库', duration: 180, objectives: ['赛道定位', '选题30个'], tools: ['ChatGPT', '飞瓜'], deliverable: '选题库', blocks: []},
  { id: 'D1-2', title: '脚本与素材批量生产', duration: 240, objectives: ['批量脚本', '批量素材'], tools: ['ChatGPT', 'MJ'], deliverable: '30条脚本', blocks: []},
  { id: 'D1-3', title: '剪辑发布每日3条', duration: 720, objectives: ['每天剪3条', '7天30条'], tools: ['剪映AI', 'Kling'], deliverable: '30条短视频', blocks: []},
  { id: 'D1-4', title: '数据复盘与迭代', duration: 120, objectives: ['数据复盘', '优化方向'], tools: ['飞瓜'], deliverable: '复盘报告', blocks: []}
];

const D2 = [
  { id: 'D2-1', title: '店铺定位与选品', duration: 360, objectives: ['店铺战略', '5款主推品'], tools: ['ChatGPT', '生意参谋'], deliverable: '店铺规划书', blocks: []},
  { id: 'D2-2', title: '视觉与内容包', duration: 360, objectives: ['店招/海报/详情页', 'AI生产'], tools: ['MJ', '美图AI'], deliverable: '完整视觉包', blocks: []},
  { id: 'D2-3', title: '上架运营全流程', duration: 720, objectives: ['上架SOP', '客服Bot'], tools: ['扣子'], deliverable: '可经营店铺', blocks: []},
  { id: 'D2-4', title: '推广与首单', duration: 360, objectives: ['付费推广', '首单获取'], tools: ['钻展', '直通车'], deliverable: '首单达成', blocks: []}
];

const D3 = [
  { id: 'D3-1', title: '剧本创作7天', duration: 1680, objectives: ['完整剧本', '分镜表'], tools: ['ChatGPT', 'Claude'], deliverable: '完整剧本+分镜', blocks: []},
  { id: 'D3-2', title: 'AI生成分镜画面7天', duration: 1680, objectives: ['MJ/Kling 出画面', '一致性维持'], tools: ['MJ', 'Kling', 'Vidu'], deliverable: '完整分镜画面', blocks: []},
  { id: 'D3-3', title: '配音与音乐3天', duration: 720, objectives: ['ElevenLabs配音', 'Suno配乐'], tools: ['ElevenLabs', 'Suno'], deliverable: '完整音轨', blocks: []},
  { id: 'D3-4', title: '剪辑与发行4天', duration: 960, objectives: ['剪映成片', '平台发行'], tools: ['剪映'], deliverable: '完整短剧', blocks: []}
];

const D4 = [
  { id: 'D4-1', title: '数字人创建与训练', duration: 240, objectives: ['HeyGen 数字人', '形象+声音克隆'], tools: ['HeyGen', '硅基智能'], deliverable: '专属数字人', blocks: []},
  { id: 'D4-2', title: '直播话术与脚本', duration: 240, objectives: ['ChatGPT 写话术', '直播脚本'], tools: ['ChatGPT'], deliverable: '直播脚本库', blocks: []},
  { id: 'D4-3', title: 'OBS推流与开播', duration: 360, objectives: ['OBS配置', '7天开播'], tools: ['OBS', '剪映'], deliverable: '可播直播间', blocks: []}
];

const D5 = [
  { id: 'D5-1', title: '客户访谈与调研', duration: 480, objectives: ['深度访谈', '需求洞察'], tools: ['ChatGPT'], deliverable: '调研报告', blocks: []},
  { id: 'D5-2', title: '品牌定位与VI', duration: 720, objectives: ['品牌定位', 'LOGO+VI'], tools: ['MJ', 'Figma'], deliverable: '品牌定位+VI', blocks: []},
  { id: 'D5-3', title: '应用物料设计', duration: 1200, objectives: ['名片/海报/物料', '完整应用'], tools: ['Canva', 'Figma'], deliverable: '完整应用物料', blocks: []},
  { id: 'D5-4', title: '交付与复盘', duration: 360, objectives: ['交付演示', '客户复盘'], tools: ['Gamma'], deliverable: '完整交付物', blocks: []}
];

const D6 = [
  { id: 'D6-1', title: 'AI工作流设计', duration: 360, objectives: ['流程梳理', 'AI工作流图'], tools: ['ChatGPT'], deliverable: '工作流设计图', blocks: []},
  { id: 'D6-2', title: '扣子/Dify 搭建', duration: 480, objectives: ['搭建Bot', '配置工作流'], tools: ['扣子', 'Dify'], deliverable: 'Bot+工作流', blocks: []},
  { id: 'D6-3', title: 'n8n/Make 自动化', duration: 360, objectives: ['n8n节点编排', 'Make自动化'], tools: ['n8n', 'Make'], deliverable: '自动化流水线', blocks: []}
];

const D7 = [
  { id: 'D7-1', title: '想法到MVP需求', duration: 360, objectives: ['MVP定义', '核心需求'], tools: ['ChatGPT'], deliverable: 'MVP需求书', blocks: []},
  { id: 'D7-2', title: 'UI原型设计', duration: 480, objectives: ['Figma原型', 'V0生成UI'], tools: ['Figma', 'V0'], deliverable: '高保真原型', blocks: []},
  { id: 'D7-3', title: 'Cursor 全栈开发', duration: 1200, objectives: ['Cursor 开发MVP', '前后端打通'], tools: ['Cursor', 'Bolt'], deliverable: 'MVP产品', blocks: []},
  { id: 'D7-4', title: '部署上线与冷启动', duration: 360, objectives: ['Vercel部署', '冷启动用户'], tools: ['Vercel'], deliverable: '可访问产品', blocks: []}
];

const L3A = [
  { id: 'L3A-1', title: '院线级剧本', duration: 480, objectives: ['专业剧本', '商业化考量'], tools: ['Claude'], deliverable: '专业剧本', blocks: []},
  { id: 'L3A-2', title: '高质量画面生成', duration: 960, objectives: ['Kling/Vidu高级用法', '一致性'], tools: ['Kling', 'Vidu'], deliverable: '院线级画面', blocks: []},
  { id: 'L3A-3', title: '专业配音音乐', duration: 480, objectives: ['ElevenLabs+Suno', '专业级'], tools: ['ElevenLabs', 'Suno'], deliverable: '专业音轨', blocks: []},
  { id: 'L3A-4', title: '剪辑调色发行', duration: 480, objectives: ['DaVinci调色', '院线发行'], tools: ['剪映', 'DaVinci'], deliverable: '院线级作品', blocks: []}
];

const L3B = [
  { id: 'L3B-1', title: '漫剧IP与角色', duration: 480, objectives: ['IP定位', '角色设计'], tools: ['MJ', 'SD'], deliverable: 'IP+角色设定', blocks: []},
  { id: 'L3B-2', title: '分镜与画面', duration: 960, objectives: ['ComfyUI 一致性', '批量画面'], tools: ['ComfyUI'], deliverable: '完整分镜画面', blocks: []},
  { id: 'L3B-3', title: '配音音效', duration: 480, objectives: ['配音表演', '音效设计'], tools: ['ElevenLabs'], deliverable: '完整音轨', blocks: []},
  { id: 'L3B-4', title: '成片发行', duration: 480, objectives: ['剪映成片', '平台发行'], tools: ['剪映'], deliverable: '完整漫剧', blocks: []}
];

const L3C = [
  { id: 'L3C-1', title: '品牌战略与定位', duration: 480, objectives: ['品牌战略', '视觉定位'], tools: ['ChatGPT'], deliverable: '战略文档', blocks: []},
  { id: 'L3C-2', title: 'LOGO与VI系统', duration: 960, objectives: ['LOGO设计', '完整VI'], tools: ['MJ', 'Figma'], deliverable: 'VI手册', blocks: []},
  { id: 'L3C-3', title: '应用与传播物料', duration: 720, objectives: ['全套应用', '传播物料'], tools: ['Canva', 'Figma'], deliverable: '完整应用包', blocks: []},
  { id: 'L3C-4', title: '动态视觉与交付', duration: 480, objectives: ['动效海报', '专业交付'], tools: ['剪映', 'AE'], deliverable: '完整资产包', blocks: []}
];

const E1 = [
  { id: 'E1-1', title: '企业现状诊断', duration: 240, objectives: ['现状分析', '痛点梳理'], tools: ['ChatGPT'], deliverable: '诊断报告', blocks: []},
  { id: 'E1-2', title: 'AI转型路径设计', duration: 240, objectives: ['转型路径', '优先级排序'], tools: ['Claude'], deliverable: '转型方案', blocks: []}
];

const E2 = [
  { id: 'E2-1', title: '销售场景AI化', duration: 360, objectives: ['销售流程梳理', 'AI赋能点'], tools: ['ChatGPT'], deliverable: 'AI赋能点', blocks: []},
  { id: 'E2-2', title: '销售Bot搭建', duration: 480, objectives: ['扣子搭Bot', 'CRM集成'], tools: ['扣子', 'CRM'], deliverable: '销售Bot', blocks: []},
  { id: 'E2-3', title: 'SOP与培训', duration: 360, objectives: ['销售SOP', '团队培训'], tools: [], deliverable: '团队SOP', blocks: []}
];

const E3 = [
  { id: 'E3-1', title: 'HR场景AI化', duration: 240, objectives: ['招聘/培训/绩效', 'AI赋能'], tools: ['ChatGPT', '飞书'], deliverable: 'AI HR方案', blocks: []},
  { id: 'E3-2', title: 'HR Bot 搭建', duration: 240, objectives: ['搭建HR Bot', '部署'], tools: ['扣子'], deliverable: 'HR Bot', blocks: []}
];

const E4 = [
  { id: 'E4-1', title: '财务流程AI化', duration: 240, objectives: ['报表/凭证/分析', 'AI赋能'], tools: ['ChatGPT', 'Excel'], deliverable: '财务AI方案', blocks: []},
  { id: 'E4-2', title: '财务Bot与模型', duration: 240, objectives: ['财务Bot', 'Python模型'], tools: ['Python', '扣子'], deliverable: '财务Bot+模型', blocks: []}
];

const E5 = [
  { id: 'E5-1', title: '客服系统AI化', duration: 480, objectives: ['客服流程梳理', 'AI赋能'], tools: ['扣子', 'Dify'], deliverable: 'AI客服设计', blocks: []},
  { id: 'E5-2', title: 'AI客服系统搭建', duration: 480, objectives: ['搭建+集成+部署'], tools: ['扣子', 'Dify'], deliverable: '可上线AI客服', blocks: []}
];

// 第四阶 商业与创业
const F1 = [
  { id: 'F1-1', title: '副业方向选择', duration: 480, objectives: ['副业方向评估', '匹配自身'], tools: ['ChatGPT'], deliverable: '副业方向书', blocks: []},
  { id: 'F1-2', title: 'MVP产品打造', duration: 1200, objectives: ['最小可行产品', '快速上线'], tools: ['全套AI'], deliverable: 'MVP产品', blocks: []},
  { id: 'F1-3', title: '冷启动与首单', duration: 1200, objectives: ['冷启动SOP', '获取首单'], tools: ['ChatGPT'], deliverable: '首单收入', blocks: []},
  { id: 'F1-4', title: '复盘与持续运营', duration: 720, objectives: ['月度复盘', '持续迭代'], tools: [], deliverable: '运营SOP', blocks: []}
];

const F2 = [
  { id: 'F2-1', title: '商业模式设计', duration: 720, objectives: ['BMC画布', '商业模式'], tools: ['ChatGPT'], deliverable: '商业计划书', blocks: []},
  { id: 'F2-2', title: 'MVP开发上线', duration: 2400, objectives: ['Cursor开发', '快速上线'], tools: ['Cursor', 'V0'], deliverable: 'MVP上线', blocks: []},
  { id: 'F2-3', title: '增长与变现', duration: 1800, objectives: ['用户增长', '商业变现'], tools: ['ChatGPT'], deliverable: '月稳定收入', blocks: []},
  { id: 'F2-4', title: '融资或规模化', duration: 1080, objectives: ['BP准备', '融资或自我造血'], tools: ['ChatGPT', 'Gamma'], deliverable: 'BP/规模化方案', blocks: []}
];

const L4A = [
  { id: 'L4A-1', title: '项目立项与签约', duration: 1200, objectives: ['项目立项', 'OPC签约'], tools: [], deliverable: '签约项目', blocks: []},
  { id: 'L4A-2', title: '完整制作交付', duration: 4800, objectives: ['全流程制作', '高品质交付'], tools: ['全套AI'], deliverable: '可发行短剧', blocks: []},
  { id: 'L4A-3', title: '发行与商业回报', duration: 1200, objectives: ['平台发行', '商业回报'], tools: [], deliverable: '商业收益', blocks: []}
];

const L4B = [
  { id: 'L4B-1', title: '矩阵规划', duration: 1200, objectives: ['账号矩阵规划', '内容定位'], tools: ['ChatGPT'], deliverable: '矩阵规划', blocks: []},
  { id: 'L4B-2', title: '矩阵搭建运营', duration: 4800, objectives: ['多账号搭建', '协同运营'], tools: ['全套AI'], deliverable: '盈利矩阵', blocks: []},
  { id: 'L4B-3', title: '商业变现', duration: 1200, objectives: ['广告/带货/知识付费'], tools: [], deliverable: '稳定收入', blocks: []}
];

const L4C = [
  { id: 'L4C-1', title: '品牌IP战略', duration: 1200, objectives: ['IP战略', '商业化路径'], tools: ['ChatGPT'], deliverable: 'IP战略书', blocks: []},
  { id: 'L4C-2', title: 'IP视觉与内容', duration: 4800, objectives: ['完整视觉', '持续内容'], tools: ['MJ', 'Figma'], deliverable: '完整IP资产', blocks: []},
  { id: 'L4C-3', title: '商业化与运营', duration: 1200, objectives: ['IP授权', '商业合作'], tools: [], deliverable: '商业化案例', blocks: []}
];

// ========================================================
// 导出全部课程详细内容映射
// ========================================================
export const courseDetails = {
  A1, A2, A3, A4, B1,
  B2, B3, B4,
  'L2-A': L2A, 'L2-B': L2B, 'L2-C': L2C, 'L2-D': L2D,
  C1, C2, C3, C4, C5, C6, C7, C8, C9,
  D1, D2, D3, D4, D5, D6, D7,
  'L3-A': L3A, 'L3-B': L3B, 'L3-C': L3C,
  E1, E2, E3, E4, E5,
  F1, F2,
  'L4-a': L4A, 'L4-b': L4B, 'L4-c': L4C
};

// 默认章节生成器：当某章节没填 blocks 时，自动生成基础区块结构
export function ensureBlocks(course, module) {
  if (module.blocks && module.blocks.length > 0) return module.blocks;
  return [
    T.intro(`本节聚焦【${module.title}】，预计学时 ${module.duration} 分钟。${course?.target ? '面向' + course.target + '。' : ''}`),
    T.concept('学习目标', (module.objectives || []).map(o => ({ name: '✓', desc: o }))),
    T.concept('核心工具', (module.tools || []).map(t => ({ name: t, desc: '本节将实操使用' }))),
    T.workflow('实操流程（参考）', [
      { step: 1, title: '理论讲解', desc: '理解核心概念与原理' },
      { step: 2, title: '工具演示', desc: '老师 / 视频实际操作演示' },
      { step: 3, title: '动手练习', desc: '跟随练习，遇到问题问 AI 助教' },
      { step: 4, title: '产出作品', desc: `完成本节产出：${module.deliverable || '小作品'}` },
      { step: 5, title: '复盘提交', desc: '上传作品到课程平台' }
    ]),
    { type: 'tip', title: '💡 学习建议', content: '动手做比看10遍更重要。本节请准备好工具账号、留出整段时间、不要被打断。' },
    T.summary([
      `掌握 ${module.title} 的核心方法`,
      `完成产出物：${module.deliverable || '本节作品'}`,
      '把所学应用到自己的真实场景'
    ])
  ];
}
