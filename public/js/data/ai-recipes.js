// OPC AI 工具配方库 (AI Recipes)
// =====================================================
// 为每门课/每个章节提供"具体用什么 AI + 怎么用 + 提示词模板"
// 数据结构：
//   recipes[courseId or moduleId] = [
//     {
//       title: '用 AI 做 XXX',
//       tool: 'ChatGPT-4o',           // 推荐主力工具
//       alternatives: ['Claude', '通义'], // 替代工具
//       category: 'text|image|video|audio|agent|code|data',
//       difficulty: 1-5,
//       cost: '免费 / ¥20/月 / API 按量',
//       steps: ['第一步...', '第二步...'],
//       prompt: '...',                  // 可一键复制 / 一键运行的提示词
//       variables: [{ name:'product', label:'产品名', placeholder:'如：智能水杯' }],
//       expected: '预期产出说明',
//       tips: ['注意点1', '注意点2']
//     }
//   ]
// 前端在课时页根据 lesson.id / course.id 查到对应 recipes 渲染"AI 操作配方"卡片
// 配置好 API Key 后可直接点击"一键运行"调用真实 AI

const r = (data) => ({ category: 'text', difficulty: 2, cost: '免费/订阅', alternatives: [], variables: [], tips: [], ...data });

// ============== A1 AI时代生存指南 ==============
const A1_recipes = {
  'A1-1': [
    r({ title: '一句话生成"个人 AI 影响力清单"', tool: 'ChatGPT-4o', alternatives: ['Claude 3.5', '通义千问'], category: 'text', difficulty: 1, cost: '免费',
      steps: [
        '打开 ChatGPT / Claude / 通义任一对话框',
        '复制下方提示词，把变量替换为你的真实信息',
        '收到清单后追问"哪 3 项最先做"',
        '把结果存入 Notion / 飞书文档作为个人路线图'
      ],
      prompt: '你是一名 AI 生涯规划师。我的职业是【{job}】，目前 AI 使用水平【{level}】。请帮我生成一份《个人 AI 影响力清单》，包括：① AI 对我职业的 5 个冲击点 ② 我可立即用 AI 替代的 3 类重复工作 ③ 未来 90 天必须掌握的 5 款 AI 工具 ④ 我的"AI + 职业"独特机会点。用 Markdown 表格输出。',
      variables: [
        { name: 'job', label: '你的职业', placeholder: '如：电商运营 / 法务 / 教师' },
        { name: 'level', label: 'AI 水平', placeholder: '零基础 / 入门 / 熟练' }
      ],
      expected: '一份个人专属的 4 模块 AI 路线图，可直接行动',
      tips: ['职业越具体，结果越准确', '追问"举一个真实案例"会更落地']
    })
  ],
  'A1-2': [
    r({ title: '4款主流模型同题对比测试', tool: '多模型并行', alternatives: ['ChatGPT', 'Claude', '通义', 'Kimi'], category: 'text', difficulty: 2, cost: '全免费',
      steps: [
        '打开 4 个浏览器标签：chat.openai.com / claude.ai / tongyi.aliyun.com / kimi.moonshot.cn',
        '把同一个问题分别粘贴到 4 个模型',
        '对比"准确度 / 中文流畅度 / 速度 / 拒答率"',
        '建立你的"工具地图"——什么场景用哪一款'
      ],
      prompt: '请用 200 字解释什么是"一人公司 (OPC)"，并给出 3 条普通人启动 OPC 的可行路径。要求：① 通俗易懂 ② 有数字举例 ③ 最后一句要有金句感。',
      expected: '4 份对比答案 + 一张工具差异表',
      tips: ['同一问题多次提问，结果会有波动', '中文场景通义/Kimi 通常更稳']
    })
  ],
  'A1-3': [
    r({ title: '黄金三段式提示词生成器', tool: 'ChatGPT / Claude', category: 'text', difficulty: 1, cost: '免费',
      steps: [
        '想清楚你想让 AI 做什么',
        '套用「角色+任务+约束」三段式',
        '执行后根据结果再补充细节'
      ],
      prompt: '【角色】你是一名【{role}】，拥有 10 年实战经验。\n【任务】请帮我【{task}】。\n【约束】① 输出不超过 {len} 字 ② 使用 {format} 格式 ③ 语气 {tone}。',
      variables: [
        { name: 'role', label: '角色', placeholder: '资深HR / 电商运营总监' },
        { name: 'task', label: '任务', placeholder: '写一封病假邮件' },
        { name: 'len', label: '字数', placeholder: '300' },
        { name: 'format', label: '格式', placeholder: '邮件 / 表格 / 列表' },
        { name: 'tone', label: '语气', placeholder: '专业礼貌 / 轻松活泼' }
      ],
      expected: '一段结构化、约束明确的高质量提示词',
      tips: ['角色越具体，输出越专业', '加示例 (Few-shot) 效果再升一级']
    })
  ],
  'A1-4': [
    r({ title: '通义万相生成商业海报', tool: '通义万相 3.0', alternatives: ['Midjourney V6', 'Flux'], category: 'image', difficulty: 2, cost: '免费 50张/天',
      steps: [
        '访问 tongyi.aliyun.com/wanxiang',
        '输入"主体+场景+风格+灯光+镜头"五要素',
        '一次出 4 张，挑最优',
        'Canva 加文案输出 1080P 海报'
      ],
      prompt: '一只赛博朋克风格的橘猫，坐在 2080 年的上海外滩天台，霓虹灯映在毛发上，电影级镜头，景深虚化，超高清细节，比例 16:9',
      expected: '4 张可商用的高质量 AI 图',
      tips: ['提示词可中英文混合', '加"--ar 16:9 --s 250"增强艺术感（MJ）']
    }),
    r({ title: 'Suno 生成原创音乐', tool: 'Suno V3.5', category: 'audio', difficulty: 1, cost: '免费 10首/天',
      steps: [
        '访问 suno.com 注册',
        'Custom Mode 输入 Style + Lyrics',
        '30 秒后下载 MP3'
      ],
      prompt: 'Style: Lo-fi Hip Hop, mellow piano, soft drums, female vocal\nLyrics:\n[Verse]\n上海夜雨打在窗台\n键盘声里我等待\n[Chorus]\n一个人也能去远方\n一人公司是我的光',
      expected: '一首 2 分钟原创歌曲',
      tips: ['Style 用英文准确率更高', 'Lyrics 用中文 OK']
    })
  ],
  'A1-5': [
    r({ title: 'AI 帮你生成 90 天学习计划', tool: 'Claude 3.5 Sonnet', alternatives: ['ChatGPT-4o'], category: 'text', difficulty: 1, cost: '免费',
      steps: [
        '盘点现有水平、可用时间、目标',
        '把这些信息塞进下方提示词',
        'AI 输出后导出到飞书/Notion 周历'
      ],
      prompt: '你是一名 AI 时代学习教练。学员当前 AI 水平【{level}】，每天可投入【{hours}】小时，90 天目标是【{goal}】。请生成 90 天逐周学习计划：\n① 12 周主题（每周聚焦 1 主题）\n② 每周 3 个核心任务 + 1 个产出物\n③ 每周末复盘问题 3 个\n④ 90 天后里程碑\n用 Markdown 表格输出。',
      variables: [
        { name: 'level', label: '当前水平', placeholder: '零基础 / 入门' },
        { name: 'hours', label: '每天投入', placeholder: '1' },
        { name: 'goal', label: '90天目标', placeholder: '能独立用 AI 完成本职工作80%重复任务' }
      ],
      expected: '12 周可执行学习日历',
      tips: ['Claude 处理长结构化输出最稳', '让 AI 也输出"激励金句"会更有动力']
    })
  ]
};

// ============== A2 AI办公效率倍增 ==============
const A2_recipes = {
  'A2-1': [
    r({ title: 'AI 写专业邮件 (5场景)', tool: 'ChatGPT / Claude', category: 'text', difficulty: 1, cost: '免费',
      steps: ['选择场景类型', '替换变量', '让 Claude 二次校对语气'],
      prompt: '你是一名职场沟通专家。请帮我写一封{scene}邮件给{to}，背景：{ctx}。要求：300字内、礼貌专业、含明确行动项。',
      variables: [
        { name: 'scene', label: '场景', placeholder: '请假 / 汇报 / 拒绝合作 / 道歉 / 跟进' },
        { name: 'to', label: '收件人', placeholder: '直属领导 / 客户A' },
        { name: 'ctx', label: '背景', placeholder: '感冒发烧需请假2天' }
      ],
      expected: '一封可直接发送的邮件',
      tips: ['追问"再正式一点 / 再亲切一点"快速调风格']
    }),
    r({ title: '飞书妙记 + AI 自动生成会议纪要', tool: '飞书妙记', alternatives: ['Otter', '通义听悟'], category: 'audio', difficulty: 1, cost: '免费',
      steps: [
        '会议开始前打开飞书妙记录音',
        '会后选择"AI 总结"',
        '导出"决议+待办+全文"三档',
        '让 ChatGPT 把待办转成飞书任务'
      ],
      prompt: '请把下面会议纪要转换成结构化输出：① 一句话总结 ② 关键决议（3条）③ 待办（含负责人/截止日）④ 风险提示。\n\n【纪要】\n{transcript}',
      variables: [{ name: 'transcript', label: '原始纪要', placeholder: '粘贴飞书妙记导出的文字' }],
      expected: '结构化纪要 + 飞书任务卡',
      tips: ['妙记中文准确率 95%+', '会议前先告知大家"AI在听"']
    })
  ],
  'A2-2': [
    r({ title: 'ChatGPT 高级数据分析 (Excel→洞察)', tool: 'ChatGPT-4o (Code Interpreter)', category: 'data', difficulty: 3, cost: 'Plus ¥150/月',
      steps: [
        '把 Excel/CSV 拖入 ChatGPT 对话框',
        '用提示词描述分析需求',
        '查看自动生成的图表',
        '让 AI 总结 3 条业务洞察'
      ],
      prompt: '我上传了一份销售数据(销售额/SKU/地区/月份)。请：\n① 找出销售额TOP3 SKU\n② 画出近6个月趋势折线图\n③ 输出3条业务洞察\n④ 给出下个月运营建议',
      expected: '图表 + 数据洞察 + 行动建议',
      tips: ['先让它"显示前5行"确认列名', '中文列名也支持']
    })
  ],
  'A2-3': [
    r({ title: 'Gamma 10分钟生成商业级 PPT', tool: 'Gamma.app', alternatives: ['通义PPT', 'AiPPT'], category: 'image', difficulty: 1, cost: '免费 400 credit',
      steps: [
        '先用 ChatGPT 写 10 页大纲',
        '登录 gamma.app，选 "Generate"',
        '粘贴大纲，选风格主题',
        '在线编辑，导出 PPTX/PDF'
      ],
      prompt: '请帮我写一份关于【{topic}】的 10 页商业 PPT 大纲，目标受众【{audience}】，每页给出：① 标题 ② 3 条要点 ③ 配图描述。',
      variables: [
        { name: 'topic', label: '主题', placeholder: '一人公司商业模式' },
        { name: 'audience', label: '受众', placeholder: '投资人 / 客户 / 内部团队' }
      ],
      expected: '可直接演示的 PPT',
      tips: ['Gamma 自动配图很美', '导出 PPTX 后还能用 Office 修改']
    })
  ],
  'A2-4': [
    r({ title: '扣子 (Coze) 搭建私人工作 Bot', tool: '扣子 Coze', alternatives: ['Dify', 'FastGPT'], category: 'agent', difficulty: 3, cost: '免费',
      steps: [
        '访问 coze.cn 注册',
        '点击"创建 Bot"，填写人设',
        '上传 SOP/FAQ/产品手册到知识库',
        '配置技能：联网/画图/工作流',
        '一键发布到飞书/微信/网页'
      ],
      prompt: '【人设】你是 {company} 的客服助手{name}，掌握公司全部产品信息和 FAQ。\n【目标】帮用户解答产品/订单/售后问题。\n【风格】专业、亲切、不超过 200 字。\n【边界】不能承诺折扣，不能透露未公开信息。\n【知识库】优先使用上传的 FAQ.docx。',
      variables: [
        { name: 'company', label: '公司名', placeholder: 'OPC 社区' },
        { name: 'name', label: 'Bot 名', placeholder: '小O' }
      ],
      expected: '一个可对外服务的 24 小时 Bot',
      tips: ['知识库越规范，回答越准', '加 30-50 条真实问答样本效果最佳']
    })
  ]
};

// ============== A3 AI工具大全 ==============
const A3_recipes = {
  'A3-1': [
    r({ title: '8款文本AI 同题盲测', tool: '多模型', category: 'text', difficulty: 2, cost: '免费为主',
      steps: ['打开 8 个标签页', '同一问题问 8 个模型', '建立"场景-工具"决策表'],
      prompt: '用 500 字写一篇关于"AI 时代年轻人如何规划职业"的小红书爆款文案，要有金句、有场景、有 emoji。',
      expected: '8 份对比答案 + 决策表',
      tips: ['爆款文案：Claude > 通义 > ChatGPT > Kimi（中文场景）']
    })
  ],
  'A3-2': [
    r({ title: 'Midjourney 商业图 7字诀', tool: 'Midjourney V6', alternatives: ['通义万相', 'Flux'], category: 'image', difficulty: 3, cost: '$10/月',
      steps: ['Discord 进入 MJ 频道', '/imagine 输入提示词', '挑图 → Vary Region 微调', 'Upscale 4K 下载'],
      prompt: '/imagine prompt: a {subject} in {scene}, {camera_view}, {lighting}, {style}, {color_tone} --ar 16:9 --v 6 --s 250',
      variables: [
        { name: 'subject', label: '主体', placeholder: 'modern minimalist sneaker' },
        { name: 'scene', label: '场景', placeholder: 'wet street at night, neon reflection' },
        { name: 'camera_view', label: '镜头', placeholder: 'low-angle close-up' },
        { name: 'lighting', label: '光影', placeholder: 'cinematic lighting' },
        { name: 'style', label: '风格', placeholder: 'commercial photography' },
        { name: 'color_tone', label: '色调', placeholder: 'cool blue tone' }
      ],
      expected: '4 张商业级海报图',
      tips: ['英文提示词更稳', '--s 250 更艺术，--s 50 更写实']
    })
  ],
  'A3-3': [
    r({ title: 'Kling 1.5 生成 5 秒视频', tool: 'Kling AI', alternatives: ['Vidu', 'Runway Gen-3'], category: 'video', difficulty: 3, cost: '免费66点/天',
      steps: ['访问 klingai.com', '上传首帧图 (可选)', '输入运动描述 + 镜头', '等 2-5 分钟下载'],
      prompt: '画面描述：{scene}\n运动：{motion}\n镜头：{camera}',
      variables: [
        { name: 'scene', label: '画面', placeholder: '一杯冒着热气的咖啡放在木桌上' },
        { name: 'motion', label: '运动', placeholder: '热气缓慢升腾，一片落叶飘落到杯沿' },
        { name: 'camera', label: '镜头', placeholder: '微距镜头缓慢推进' }
      ],
      expected: '5 秒商业级短视频',
      tips: ['Kling 中文场景比 Sora 更便宜', '首帧图越清晰，输出越稳定']
    })
  ],
  'A3-4': [
    r({ title: 'ElevenLabs 克隆你的声音', tool: 'ElevenLabs', alternatives: ['魔音工坊', '剪映克隆'], category: 'audio', difficulty: 2, cost: '$5/月',
      steps: ['录制 1 分钟清晰中英语音', 'elevenlabs.io 上传', '一键克隆获得 voice_id', '输入文字即可生成你的声音'],
      prompt: '使用我的声音朗读以下文字，语气：自然、稍慢、有亲和力。\n\n"大家好，我是OPC社区的{name}，今天为你介绍..."',
      expected: '专属个人语音库',
      tips: ['录音环境一定要安静', '加点情绪起伏，克隆出来更像真人']
    })
  ],
  'A3-5': [
    r({ title: '让 AI 帮你整理"工具地图"', tool: 'Claude / Notion AI', category: 'text', difficulty: 1, cost: '免费',
      steps: ['列出你已用过的所有 AI', '让 Claude 按场景分类', '导入 Notion 数据库'],
      prompt: '我已使用以下 AI 工具：{tools}。请帮我整理成一张"工具地图"表格，列：场景 / 主力工具 / 备用 / 月成本 / 学习曲线 / 适合谁。',
      variables: [{ name: 'tools', label: '工具清单', placeholder: 'ChatGPT、Claude、Midjourney、剪映、扣子...' }],
      expected: '个人 AI 工具手册',
      tips: ['每月迭代一次', '把不再用的工具果断删掉']
    })
  ]
};

// ============== A4 AI编程入门 ==============
const A4_recipes = {
  'A4-1': [
    r({ title: 'AI 给你讲清"前端/后端/数据库"', tool: 'ChatGPT / Claude', category: 'text', difficulty: 1, cost: '免费',
      steps: ['提问', '听比喻', '让 AI 出一道小测试题'],
      prompt: '我是编程零基础。请用"开餐厅"做比喻，给我讲清楚什么是前端、后端、数据库，它们怎么协作。最后给我出 3 道选择题让我自测。',
      expected: '听得懂 + 会做选择题',
      tips: ['听不懂就追问"再换个比喻"', 'AI 是最有耐心的老师']
    })
  ],
  'A4-2': [
    r({ title: 'Cursor 30 分钟做个人主页', tool: 'Cursor', alternatives: ['Bolt.new', 'V0'], category: 'code', difficulty: 3, cost: '$20/月',
      steps: [
        '下载 cursor.com',
        '新建项目 → Cmd+K',
        '直接对话："做一个个人主页，要有头像、简介、作品集"',
        '迭代："顶部加导航，配色用紫色渐变"',
        '一键 Vercel 部署得到 URL'
      ],
      prompt: '请做一个个人主页（单页应用），需要：\n1. 顶部 Hero 区：头像 + 一句话介绍 + Twitter/GitHub 图标\n2. About 区：3 段自我介绍\n3. 作品集：6 个项目卡片\n4. 联系区：邮箱 + 表单\n5. 整体配色：深紫渐变背景 + 玻璃拟态卡片\n6. 响应式适配手机',
      expected: '一个可分享的在线主页',
      tips: ['先说大需求，再分步迭代', 'Cursor 自带 Claude 3.5 Sonnet']
    })
  ],
  'A4-3': [
    r({ title: 'V0 生成漂亮 UI 组件', tool: 'V0.dev', alternatives: ['Bolt', 'Replit Agent'], category: 'code', difficulty: 2, cost: '免费/订阅',
      steps: ['访问 v0.dev', '描述 UI 需求', '一键复制 React + Tailwind 代码'],
      prompt: 'A pricing card with 3 tiers (Free / Pro / Enterprise), glassmorphism style, dark theme, with feature checklist and CTA button',
      expected: '可复制的 React 组件代码',
      tips: ['英文描述更准', '生成后可继续对话调整']
    })
  ],
  'A4-4': [
    r({ title: 'Vercel 一键部署你的小产品', tool: 'Vercel + GitHub', category: 'code', difficulty: 2, cost: '免费',
      steps: ['代码 push 到 GitHub', '登录 vercel.com 选仓库', '一键 Deploy', '获得 *.vercel.app 永久域名'],
      prompt: '部署不用提示词，跟着 Cursor 的 deploy 按钮走即可。',
      expected: '可访问的在线产品 URL',
      tips: ['免费版每月 100GB 流量足够', '可绑定自己的域名']
    })
  ]
};

// ============== B1 提示词工程基础 ==============
const B1_recipes = {
  'B1-1': [
    r({ title: '把"实习生"思维带入提示词', tool: 'ChatGPT', category: 'text', difficulty: 1, cost: '免费',
      steps: ['想象 AI 是你的实习生', '把"角色+任务+背景+格式"说清楚', '出问题先怪自己提示词'],
      prompt: '你是一名【{role}】实习生，第一天来公司，对业务一无所知。请帮我做【{task}】，背景是【{bg}】。完成后请说"已完成，需要修改吗"。',
      variables: [
        { name: 'role', label: '岗位', placeholder: '运营 / 设计 / 法务' },
        { name: 'task', label: '任务', placeholder: '写一份周报' },
        { name: 'bg', label: '背景', placeholder: '我们是做 SaaS 的' }
      ],
      expected: '能看懂背景的高质量输出',
      tips: ['对实习生说啥，对 AI 说啥', 'AI 不会偷懒，但会"猜"——所以要说清楚']
    })
  ],
  'B1-2': [
    r({ title: '黄金 5 要素公式 + 10 模板', tool: 'ChatGPT / Claude', category: 'text', difficulty: 2, cost: '免费',
      steps: ['套公式：Role + Task + Context + Format + Example', '保存 10 个常用模板到 Notion', '每次改变量即可复用'],
      prompt: '【Role】你是{role}\n【Task】请{task}\n【Context】背景：{ctx}\n【Format】输出格式：{format}\n【Example】参考示例：{example}',
      variables: [
        { name: 'role', label: 'Role', placeholder: '资深小红书运营' },
        { name: 'task', label: 'Task', placeholder: '写 3 条爆款笔记' },
        { name: 'ctx', label: 'Context', placeholder: '产品是新品咖啡机' },
        { name: 'format', label: 'Format', placeholder: '标题+正文+话题，每条≤150字' },
        { name: 'example', label: 'Example', placeholder: '《这台咖啡机让我戒掉了星巴克》...' }
      ],
      expected: '专业级输出',
      tips: ['Example 是最强大的提示词技巧', '加 1 个示例 = 输出质量翻倍']
    })
  ],
  'B1-3': [
    r({ title: '提示词调试 3 轮迭代法', tool: 'ChatGPT', category: 'text', difficulty: 2, cost: '免费',
      steps: ['第 1 轮：基础三段式', '第 2 轮：根据结果加约束', '第 3 轮：补充示例和反例'],
      prompt: '【V1 基础版】\n你是文案专家，写一句广告语。\n\n【V2 加约束】\n你是文案专家，请为新能源车写一句广告语。要求：① 不超过 12 字 ② 含动词 ③ 暗示自由感。\n\n【V3 加示例】\n你是文案专家，请为新能源车写一句广告语。\n要求：≤12字、含动词、暗示自由。\n好的示例：\n- 一往无前 (Honor)\n- 充电5分钟 通话2小时 (OPPO)\n请输出 5 条候选。',
      expected: '体验"提示词可以越调越准"',
      tips: ['不要第一稿就放弃', '加示例和反例最有效']
    })
  ]
};

// ============== B2-B4 提示词进阶 ==============
const B2_recipes = {
  'B2-1': [
    r({ title: 'CoT 链式思考让 AI 更聪明', tool: 'ChatGPT / Claude', category: 'text', difficulty: 3, cost: '免费',
      steps: ['遇到推理题', '加上"让我们一步步思考"', '让 AI 输出推理过程'],
      prompt: '【问题】{question}\n请按以下步骤推理：\nStep 1: 明确已知条件\nStep 2: 找出关键约束\nStep 3: 列出可能方案\nStep 4: 评估每个方案\nStep 5: 给出最优结论\n\n请逐步输出每一步的思考。',
      variables: [{ name: 'question', label: '复杂问题', placeholder: '我应该选 SaaS 创业还是做内容？' }],
      expected: 'AI 会展示完整推理链',
      tips: ['CoT 在数学、逻辑、决策类问题提升 30%+ 准确率']
    }),
    r({ title: 'ReAct 让 AI 调用工具', tool: 'Claude + Tools', category: 'agent', difficulty: 4, cost: 'API 计费',
      steps: ['定义可用工具', '让 AI 决定何时调用', 'Reason → Act → Observe 循环'],
      prompt: '你有以下工具：search(query), calculate(expr), browse(url)。\n请回答：{q}\n格式：\nThought: 我需要...\nAction: search("...")\nObservation: ...\nThought: 接下来...\nAction: calculate(...)\n...\nFinal Answer: ...',
      variables: [{ name: 'q', label: '复杂问题', placeholder: '苹果当前市值是它10年前的几倍？' }],
      expected: '看到 AI 调用工具的完整过程',
      tips: ['ReAct 是 Agent 的核心范式', '生产环境用 LangChain 更方便']
    })
  ],
  'B2-2': [
    r({ title: 'MJ 商业海报 7 字诀实战', tool: 'Midjourney V6', category: 'image', difficulty: 3, cost: '$10/月',
      steps: ['套 7 要素', '一次出 4 张', 'Vary Region 微调', 'Upscale 4K'],
      prompt: '/imagine prompt: 主体: {subject}, 场景: {scene}, 镜头: {camera}, 光影: {light}, 风格: {style}, 色调: {color}, 参数: --ar {ar} --s {s} --v 6',
      variables: [
        { name: 'subject', label: '主体', placeholder: 'a luxury watch' },
        { name: 'scene', label: '场景', placeholder: 'on black marble desk with soft fabric' },
        { name: 'camera', label: '镜头', placeholder: 'macro photography close-up' },
        { name: 'light', label: '光影', placeholder: 'rim light, studio softbox' },
        { name: 'style', label: '风格', placeholder: 'commercial product photography' },
        { name: 'color', label: '色调', placeholder: 'gold and black' },
        { name: 'ar', label: '比例', placeholder: '16:9' },
        { name: 's', label: 'Stylize', placeholder: '250' }
      ],
      expected: '商业级海报图',
      tips: ['复杂场景用 --weird 100 试试', '产品图加 "product photography"']
    })
  ],
  'B2-3': [
    r({ title: 'ComfyUI 节点工作流', tool: 'ComfyUI + SDXL', category: 'image', difficulty: 5, cost: '本地免费',
      steps: ['本地部署 ComfyUI', '加载 SDXL 模型', '搭节点：CLIP → KSampler → VAE → Save', '保存工作流 JSON 复用'],
      prompt: '(工作流文件，非纯文本) Positive: cinematic portrait, golden hour, 85mm. Negative: blurry, distorted.',
      expected: '可批量出图的稳定工作流',
      tips: ['B 站搜"ComfyUI 入门"跟着做', '工作流可分享，社区有大量模板']
    })
  ],
  'B2-4': [
    r({ title: '同一概念跨 4 模态生成', tool: '文/图/视/音 全套', category: 'agent', difficulty: 3, cost: '混合',
      steps: ['定义核心概念', '文(GPT) → 图(MJ) → 视(Kling) → 音(Suno) 串联生成'],
      prompt: '核心概念：{concept}\n请按以下顺序生成：\n1. ChatGPT：写 100 字故事\n2. Midjourney：根据故事生成 4 张关键画面\n3. Kling：让画面动起来 5 秒\n4. Suno：根据故事氛围生成 BGM',
      variables: [{ name: 'concept', label: '核心概念', placeholder: '孤独的数字游民在山顶咖啡馆工作' }],
      expected: '一组跨模态艺术作品',
      tips: ['这是未来内容创作的标准范式']
    })
  ]
};

// ============== B3 Prompt工程师认证 ==============
const B3_recipes = {
  'B3-2': [
    r({ title: 'Few-shot Learning 黄金范例', tool: 'GPT-4 / Claude', category: 'text', difficulty: 4, cost: 'API计费',
      steps: ['给 3-5 个高质量示例', 'AI 模仿示例风格', '验证多样性'],
      prompt: '任务：把产品功能改写成爆款标题。\n\n示例 1:\n输入：续航 24 小时\n输出：充一次电，扛过两个会议+一场马拉松\n\n示例 2:\n输入：降噪耳机\n输出：戴上它，世界终于安静了\n\n示例 3:\n输入：智能识别\n输出：它比你妈还了解你\n\n现在请改写：\n输入：{feature}\n输出：',
      variables: [{ name: 'feature', label: '产品功能', placeholder: '云端同步' }]
    }),
    r({ title: 'Self-Consistency 投票机制', tool: 'GPT-4 多次采样', category: 'text', difficulty: 4, cost: 'API计费',
      steps: ['同一问题跑 5 次', '让 AI 自己投票选最一致答案'],
      prompt: '请独立 5 次回答下面问题，每次用不同思路。最后投票选出最一致的答案。\n问题：{q}',
      variables: [{ name: 'q', label: '推理题', placeholder: '24 点游戏：4,7,8,8 怎么算等于 24？' }]
    })
  ],
  'B3-3': [
    r({ title: '扣子搭建多步骤 Agent 工作流', tool: '扣子 / Dify', category: 'agent', difficulty: 4, cost: '免费',
      steps: ['梳理任务流：理解→检索→生成→输出', '在扣子工作流画布拖拽节点', '每个节点配 Prompt + Variables', '调试 → 发布'],
      prompt: '工作流案例（小红书爆款生成）：\n节点1: 理解需求(LLM)\n节点2: 关键词检索(插件)\n节点3: 标题生成(LLM, Few-shot)\n节点4: 正文生成(LLM)\n节点5: 配图建议(LLM→MJ)\n节点6: 输出 Markdown',
      expected: '可发布的智能体',
      tips: ['节点间用变量传值', '错误率高的节点加重试']
    })
  ]
};

const B4_recipes = {
  'B4-1': [
    r({ title: '上架第一个商业 GPTs', tool: 'ChatGPT Plus + GPTs Builder', category: 'agent', difficulty: 3, cost: '$20/月',
      steps: ['ChatGPT Plus → Explore → Create', '聊天式配置 Name/Description/Instructions', '上传知识文件', '配置 Action(可调外部 API)', '发布到 Store'],
      prompt: '【Instructions】你是一名小红书爆款顾问，专为美妆品牌服务。每次对话遵循：① 询问产品 ② 询问目标用户 ③ 输出 5 条爆款标题 + 3 段正文 + 5 个话题标签。语气活泼、用 emoji。',
      expected: '一个可分享 URL 的 GPT',
      tips: ['Description 要写"省时间"卖点', 'GPTs Store 已开放分成']
    })
  ],
  'B4-2': [
    r({ title: 'PromptBase 上架你的提示词商品', tool: 'PromptBase', category: 'text', difficulty: 2, cost: '佣金 20%',
      steps: ['打磨 1-3 个高质量 Prompt', '准备 4-9 张示例输出图', 'promptbase.com 上架定价 $1-9'],
      prompt: '(销售的提示词本身就是产品)',
      expected: '可销售的数字资产',
      tips: ['细分场景比通用更好卖', 'MJ 提示词是销量最高品类']
    })
  ]
};

// ============== L2-A 短视频赛道 ==============
const L2A_recipes = {
  'L2A-1': [
    r({ title: '4 款短视频 AI 横评', tool: 'Kling/Vidu/Runway/剪映AI', category: 'video', difficulty: 2, cost: '混合',
      steps: ['同一首帧图喂 4 款', '同一描述生成视频', '对比稳定性/运动幅度/中文友好度'],
      prompt: '画面：穿汉服的女孩在樱花树下转身回眸\n运动：花瓣飘落，女孩慢慢转头微笑\n镜头：环绕镜头，电影感',
      expected: '4 个对比视频 + 选型表',
      tips: ['中文场景：Kling > Vidu > 剪映 > Runway']
    })
  ],
  'L2A-2': [
    r({ title: '爆款短视频脚本黄金 7 段式', tool: 'ChatGPT / Claude', category: 'text', difficulty: 2, cost: '免费',
      steps: ['套 7 段结构', '让 AI 生成 3 个版本', '挑最爆款的迭代'],
      prompt: '你是抖音爆款编剧。请为【{topic}】写一条 60 秒口播脚本，按 7 段结构：\n1. 钩子(3秒抓眼球)\n2. 痛点(共鸣)\n3. 反转(引发好奇)\n4. 干货(2-3条价值)\n5. 案例(1个真实)\n6. 总结(金句)\n7. 行动号召(CTA)\n\n语气：{tone}\n人设：{persona}',
      variables: [
        { name: 'topic', label: '主题', placeholder: '一个人也能开公司' },
        { name: 'tone', label: '语气', placeholder: '热血 / 反差 / 温暖' },
        { name: 'persona', label: '人设', placeholder: '90后辞职博主' }
      ],
      expected: '直接可拍的脚本',
      tips: ['钩子 3 秒决定 70% 完播率', '结尾必须有 CTA']
    }),
    r({ title: 'ElevenLabs 配音(中文)', tool: 'ElevenLabs / 魔音工坊', category: 'audio', difficulty: 2, cost: '$5/月',
      steps: ['粘贴脚本', '选音色（建议自己克隆）', '调语速/情绪', '导出 MP3'],
      prompt: '配音文本：\n{script}\n\n参数：\n音色：自己克隆的声音\n语速：1.0\n情绪：自然带点兴奋',
      variables: [{ name: 'script', label: '脚本', placeholder: '粘贴脚本全文' }]
    })
  ],
  'L2A-3': [
    r({ title: 'Kling 文生视频生成首批素材', tool: 'Kling AI', category: 'video', difficulty: 3, cost: '免费66点/天',
      steps: ['每个分镜写 1 句视频提示词', '批量生成', '剪映合成'],
      prompt: '{shot_description}, 运动: {motion}, 镜头: {camera}, 风格: 电影感, 时长 5 秒',
      variables: [
        { name: 'shot_description', label: '画面', placeholder: '一个人站在山顶看日出' },
        { name: 'motion', label: '运动', placeholder: '太阳缓慢升起，光线洒在脸上' },
        { name: 'camera', label: '镜头', placeholder: '从背影渐变为侧脸特写' }
      ]
    }),
    r({ title: '剪映 AI 一键成片', tool: '剪映专业版 AI', category: 'video', difficulty: 2, cost: '免费',
      steps: ['素材库导入 AI 生成视频', '点"图文成片"贴脚本', 'AI 自动配音/字幕/BGM/转场', '人工微调导出'],
      prompt: '(剪映 AI 操作流，无文本提示词)',
      expected: '60 秒成片',
      tips: ['"商品图文成片" 模式适合带货', '加 AI 字幕识别准确率 95%+']
    })
  ],
  'L2A-4': [
    r({ title: '抖音冷启动 7 天 SOP', tool: 'ChatGPT + 飞瓜', category: 'text', difficulty: 2, cost: '飞瓜会员',
      steps: ['用飞瓜分析对标账号', 'AI 生成 7 天选题', '每天 1-3 条发布', '复盘数据'],
      prompt: '你是抖音冷启动专家。我刚开账号，定位【{niche}】，请生成 7 天发布计划：每天 ① 选题 ② 钩子 ③ 发布时间 ④ 互动话术。',
      variables: [{ name: 'niche', label: '账号定位', placeholder: 'AI 提效给职场白领' }]
    })
  ]
};

// ============== C2 AI电商赋能 ==============
const C2_recipes = {
  'C2-1': [
    r({ title: 'AI 选品蓝海雷达', tool: 'ChatGPT + 飞瓜/生意参谋', category: 'data', difficulty: 3, cost: '飞瓜 ¥298/月',
      steps: ['飞瓜导出近 30 天热销榜 CSV', '丢给 ChatGPT 高级数据分析', 'AI 找出"高增长低竞争"蓝海'],
      prompt: '我上传了【{platform}】近 30 天 TOP500 商品数据。请帮我：\n1. 找出销量月增长>50% 但搜索竞争度<60 的"蓝海品"\n2. 分析它们的共同特征\n3. 推荐 5 款我可以切入的 SKU\n4. 给出每款的差异化卖点建议',
      variables: [{ name: 'platform', label: '平台', placeholder: '抖音 / 拼多多 / 淘宝' }],
      expected: '5 款蓝海选品 + 切入策略'
    })
  ],
  'C2-2': [
    r({ title: 'MJ 生成商品图全套', tool: 'Midjourney + 美图AI', category: 'image', difficulty: 3, cost: '$10/月',
      steps: ['MJ 生成主图(场景图)', '美图 AI 抠图换背景', 'Canva 加文案', '5-9 图详情页'],
      prompt: '/imagine prompt: {product} on {background}, {lighting}, commercial product photography, ultra-detailed, 8K --ar 1:1 --v 6 --s 250',
      variables: [
        { name: 'product', label: '产品', placeholder: 'a minimalist white ceramic mug' },
        { name: 'background', label: '背景', placeholder: 'wooden table with morning light' },
        { name: 'lighting', label: '光影', placeholder: 'soft window light' }
      ],
      expected: '主图 + 5 张详情图',
      tips: ['白底图：用 "isolated on white background"', '场景图：加生活化道具']
    }),
    r({ title: 'ChatGPT 写转化型详情页', tool: 'ChatGPT-4', category: 'text', difficulty: 2, cost: '免费',
      steps: ['套 FAB 结构', '人群+痛点+卖点+证据 4 段式'],
      prompt: '你是电商详情页文案专家。请为【{product}】写一份淘宝/抖音详情页结构，按以下框架：\n1. 痛点钩子(3行)\n2. 产品介绍 (FAB×3: Feature功能/Advantage优势/Benefit利益)\n3. 使用场景(3个)\n4. 用户证言(3条模拟)\n5. 信任背书\n6. 限时优惠CTA\n\n目标人群：{persona}\n核心卖点：{usp}',
      variables: [
        { name: 'product', label: '产品', placeholder: '便携榨汁杯' },
        { name: 'persona', label: '人群', placeholder: '25-35 健身宝妈' },
        { name: 'usp', label: '卖点', placeholder: '60秒充电出汁、可洗碗机、4色可选' }
      ]
    })
  ],
  'C2-3': [
    r({ title: '扣子搭建 24h AI 客服', tool: '扣子 Coze', category: 'agent', difficulty: 3, cost: '免费',
      steps: ['梳理 50 条 FAQ 上传知识库', '配置 Bot 人设和兜底', '接入抖店/淘宝客服 API', '上线 + 人工兜底'],
      prompt: '【人设】你是【{shop}】的 AI 客服小O，热情、专业、擅长解决售前/售后/物流三类问题。\n【边界】① 不能私下加微信 ② 不能承诺折扣超过{maxOff}% ③ 售后超过 {days} 天转人工。\n【风格】用"亲~"开头，结尾带 emoji。\n【知识库】优先参考 FAQ.docx。',
      variables: [
        { name: 'shop', label: '店铺名', placeholder: 'XX 旗舰店' },
        { name: 'maxOff', label: '最大折扣', placeholder: '15' },
        { name: 'days', label: '售后天数', placeholder: '30' }
      ]
    })
  ],
  'C2-4': [
    r({ title: 'AI 写直播脚本(2 小时控场)', tool: 'ChatGPT', category: 'text', difficulty: 2, cost: '免费',
      steps: ['套"开播-种草-促单-逼单-收尾"五段', 'AI 生成每段话术', '主播彩排'],
      prompt: '你是抖音直播话术专家。请为【{product}】写一份 2 小时直播脚本：\n① 开播(15min): 暖场+欢迎+介绍主播\n② 种草(45min): 痛点+卖点+演示\n③ 转化(30min): 福袋+秒杀+逼单话术\n④ 高峰促单(20min): 限量倒计时+痛点逼单\n⑤ 收尾(10min): 总结+下次预告\n\n带货风格：{style}',
      variables: [
        { name: 'product', label: '产品', placeholder: '美容仪 ¥899' },
        { name: 'style', label: '风格', placeholder: '专业型 / 闺蜜型 / 喊麦型' }
      ]
    })
  ]
};

// ============== C1 教育赛道 ==============
const C1_recipes = {
  'C1-1': [
    r({ title: 'AI 5 分钟生成专业教案', tool: 'Claude + Gamma', category: 'text', difficulty: 2, cost: '免费',
      steps: ['用 Claude 写教案大纲', 'Gamma 生成可视化课件', '飞书导出'],
      prompt: '你是【{subject}】特级教师，请为【{grade}】学生设计一节 45 分钟课，主题【{topic}】。\n输出：\n① 教学目标(3条)\n② 重点/难点\n③ 教学流程(导入5min/讲授25min/练习10min/总结5min)\n④ 课堂提问(5个)\n⑤ 作业布置\n⑥ 板书设计',
      variables: [
        { name: 'subject', label: '学科', placeholder: '语文/数学/英语' },
        { name: 'grade', label: '年级', placeholder: '初二' },
        { name: 'topic', label: '主题', placeholder: '《背影》情感分析' }
      ]
    }),
    r({ title: 'AI 自动出题(分难度梯度)', tool: 'GPT-4', category: 'text', difficulty: 2, cost: '免费',
      steps: ['指定考点和难度梯度', 'AI 生成基础/进阶/挑战 3 档题目', '导出 Word'],
      prompt: '请为【{topic}】出 30 道题，10 基础+10 进阶+10 挑战。每题含：题目+正确答案+解析+对应考点。难度梯度：基础(理解)/进阶(应用)/挑战(分析综合)。',
      variables: [{ name: 'topic', label: '考点', placeholder: '初二函数' }]
    })
  ],
  'C1-2': [
    r({ title: 'Gamma 一键生成互动课件', tool: 'Gamma', category: 'image', difficulty: 1, cost: '免费',
      steps: ['Claude 写完教案大纲', '粘贴到 Gamma → Generate', '挑主题导出 PPT/网页'],
      prompt: '(直接粘贴教案大纲)',
      expected: '20 页可演示课件'
    }),
    r({ title: '扣子搭课后答疑 Bot', tool: '扣子', category: 'agent', difficulty: 3, cost: '免费',
      steps: ['上传课本/讲义/题库 PDF 到知识库', '配置 Bot 角色', '发布到家长群链接'],
      prompt: '你是【{class}】的 AI 答疑老师。学生提问时：① 先确认题目准确无误 ② 用启发式提问引导思考 ③ 不直接给答案，给提示 ④ 学生 3 次答错才公布正确答案 ⑤ 鼓励为主。',
      variables: [{ name: 'class', label: '班级', placeholder: '初二3班' }]
    })
  ],
  'C1-3': [
    r({ title: 'Claude 学情数据分析', tool: 'Claude 3.5', category: 'data', difficulty: 3, cost: '免费',
      steps: ['导出班级最近 5 次成绩 CSV', '上传 Claude', 'AI 找出薄弱点 + 个性化推送'],
      prompt: '我上传了班级 30 人最近 5 次月考数据。请：\n1. 整体分析：班级平均分趋势、薄弱章节 TOP3\n2. 个体分析：找出"波动大"和"持续下滑"的学生\n3. 个性化建议：为 3 类学生(尖子/中等/后进)各给一条策略\n4. 下次月考预测题 5 道'
    })
  ]
};

// ============== C3 营销/SEO ==============
const C3_recipes = {
  'C3-1': [
    r({ title: 'AI 生成 STP 用户画像', tool: 'ChatGPT', category: 'text', difficulty: 2, cost: '免费',
      steps: ['描述产品和现有客户', 'AI 输出 3 类典型用户画像 + STP 定位'],
      prompt: '你是市场营销战略专家。我的产品是【{product}】，现有客户特征是【{cur_users}】。请用 STP 模型(Segmentation/Targeting/Positioning)分析：\n1. 把市场细分为 3-5 个 segments\n2. 选择 1-2 个最有价值的目标市场\n3. 设计差异化定位\n4. 输出 3 个典型用户画像(Persona)，每个含：基本信息/痛点/决策路径/触达渠道',
      variables: [
        { name: 'product', label: '产品', placeholder: 'AI 写作 SaaS' },
        { name: 'cur_users', label: '现有客户', placeholder: '中小企业市场部' }
      ]
    })
  ],
  'C3-2': [
    r({ title: 'AI 写 SEO 长尾关键词文章', tool: 'Perplexity + Claude', category: 'text', difficulty: 3, cost: '免费/Plus',
      steps: ['Perplexity 搜行业关键词', '让 Claude 按 SEO 大纲写长文', '加 H1/H2/Meta'],
      prompt: '你是 SEO 内容专家。请为关键词【{kw}】写一篇 2000 字 SEO 长文，包含：\n① 标题(含关键词，≤30字)\n② Meta描述(≤150字)\n③ H1+5 个 H2\n④ 每段含一个 LSI 词\n⑤ 末尾 FAQ 5 条\n⑥ 目标搜索意图：{intent}',
      variables: [
        { name: 'kw', label: '关键词', placeholder: 'AI 写作工具推荐' },
        { name: 'intent', label: '意图', placeholder: '比较型 / 信息型 / 交易型' }
      ]
    })
  ],
  'C3-3': [
    r({ title: 'AI 生成广告创意 + 投放计划', tool: 'ChatGPT + Canva', category: 'text', difficulty: 2, cost: '免费',
      steps: ['描述产品和预算', 'AI 输出 5 版创意 + AB 测试方案', 'Canva 出图'],
      prompt: '你是 Performance Marketing 专家。请为【{product}】设计巨量引擎/朋友圈广告投放计划：\n① 5 版创意文案(钩子+痛点+CTA)\n② 5 套主图描述(MJ提示词)\n③ AB 测试矩阵(年龄×性别×兴趣)\n④ 预算分配(¥{budget}/天)\n⑤ KPI 目标(CTR/CPM/CVR)',
      variables: [
        { name: 'product', label: '产品', placeholder: '99元体验课' },
        { name: 'budget', label: '日预算', placeholder: '500' }
      ]
    })
  ]
};

// ============== C4 法律 ==============
const C4_recipes = {
  'C4-1': [
    r({ title: 'Kimi 200K 上下文读判例', tool: 'Kimi', category: 'text', difficulty: 2, cost: '免费',
      steps: ['上传 PDF 判决书(可同时上传多份)', '提问关键问题', '导出摘要'],
      prompt: '我上传了【{n}】份判决书。请：\n① 提取每份的：法院/案由/争议焦点/裁判要旨/判决结果\n② 比较异同点\n③ 总结同类案件的裁判规律\n④ 对【{my_case}】的诉讼策略给 3 条建议',
      variables: [
        { name: 'n', label: '判决书数量', placeholder: '5' },
        { name: 'my_case', label: '我的案件', placeholder: '股权代持纠纷' }
      ]
    })
  ],
  'C4-2': [
    r({ title: 'Claude 三步审合同', tool: 'Claude 3.5', category: 'text', difficulty: 3, cost: '免费',
      steps: ['上传合同 PDF', 'AI 标记风险条款', '生成修改建议'],
      prompt: '你是资深商事律师。请审查这份【{contract_type}】合同(代表{my_side}方)：\n1. 列出 10 大风险条款(含条款序号+原文+风险点+风险等级 H/M/L)\n2. 给出修改建议(原文 vs 修改后对照)\n3. 补充 3 条建议增加的保护性条款\n4. 总体风险评分(1-10)',
      variables: [
        { name: 'contract_type', label: '合同类型', placeholder: '股权转让 / 服务外包' },
        { name: 'my_side', label: '我方角色', placeholder: '甲方/乙方' }
      ]
    })
  ],
  'C4-3': [
    r({ title: '扣子搭法务咨询 Bot', tool: '扣子 + 法律知识库', category: 'agent', difficulty: 3, cost: '免费',
      steps: ['上传公司常用合同模板/SOP/法规', '配置专业人设', '部署到企业微信'],
      prompt: '你是【{company}】的 AI 法务顾问。回答严格遵循：① 引用具体法条 ② 不给最终结论(写"建议咨询律师") ③ 标注风险等级 ④ 提示证据保存方法。',
      variables: [{ name: 'company', label: '公司', placeholder: 'XX科技' }]
    })
  ]
};

// ============== C5 金融 ==============
const C5_recipes = {
  'C5-1': [
    r({ title: 'ChatGPT 5 分钟读完一份财报', tool: 'ChatGPT-4o', category: 'data', difficulty: 3, cost: 'Plus',
      steps: ['上传财报 PDF', '用提示词让 AI 提取核心数据', '生成投资观点'],
      prompt: '你是卖方分析师。请阅读这份【{ticker}】年报，输出：\n1. 三张表关键数据(营收/净利/经营现金流/资产负债率)同比\n2. 5 大风险\n3. 3 大亮点\n4. 估值参考(PE/PB/PS 行业对比)\n5. 一句话投资观点(买入/持有/卖出)',
      variables: [{ name: 'ticker', label: '股票', placeholder: '贵州茅台 600519' }]
    })
  ],
  'C5-2': [
    r({ title: 'Cursor + AI 写量化策略', tool: 'Cursor + Python', category: 'code', difficulty: 4, cost: '$20/月',
      steps: ['描述策略思路', 'Cursor 生成 Python 回测代码', 'Backtrader 跑回测'],
      prompt: '请用 Python + backtrader 实现一个【{strategy}】策略，并对沪深300成分股做近5年回测，输出：年化收益、最大回撤、夏普比率、胜率，最后画净值曲线。',
      variables: [{ name: 'strategy', label: '策略', placeholder: '20日均线突破 + 量比>1.5 + RSI<70' }]
    })
  ],
  'C5-3': [
    r({ title: 'Claude 风控合规检查', tool: 'Claude 3.5', category: 'text', difficulty: 3, cost: '免费',
      steps: ['上传业务流程文档', 'AI 对照监管要求做合规扫描', '输出整改清单'],
      prompt: '你是金融合规官。请对照《{rule}》，检查我们【{biz}】的业务流程文档(已上传)，输出：\n1. 合规风险点(条款+风险描述+严重度)\n2. 整改建议(短期/中期/长期)\n3. 内控制度补充建议',
      variables: [
        { name: 'rule', label: '法规', placeholder: '资管新规 / 个保法' },
        { name: 'biz', label: '业务', placeholder: '私募基金募集' }
      ]
    })
  ]
};

// ============== C6 设计师 ==============
const C6_recipes = {
  'C6-1': [
    r({ title: '设计师 AI 工具栈搭建', tool: 'MJ + Figma + ComfyUI', category: 'image', difficulty: 3, cost: '混合',
      steps: ['MJ 出灵感图', 'ComfyUI 精调', 'Figma 排版交付'],
      prompt: '请为我（设计师）规划一份"AI 工具栈月度地图"：① 灵感(MJ/SD) ② 抠图(美图/Photoroom) ③ 排版(Figma/Canva) ④ 字体(豆包字体助手) ⑤ 交付(Notion)。每项给一个推荐工具+月成本+1 句使用建议。'
    })
  ],
  'C6-2': [
    r({ title: 'AI 品牌全案 1 天交付', tool: 'MJ + Figma', category: 'image', difficulty: 4, cost: '混合',
      steps: ['MJ 出 LOGO 候选 8 个', 'Figma 做 VI 手册模板', '客户挑定后 AI 生成所有应用'],
      prompt: '/imagine prompt: minimalist logo for {brand}, {industry}, {style}, monogram, vector, white background, professional --ar 1:1 --v 6 --s 100',
      variables: [
        { name: 'brand', label: '品牌名', placeholder: 'OPC' },
        { name: 'industry', label: '行业', placeholder: 'AI education community' },
        { name: 'style', label: '风格', placeholder: 'modern, geometric, tech-forward' }
      ]
    })
  ],
  'C6-3': [
    r({ title: 'V0 + Figma AI 出 UI 原型', tool: 'V0.dev + Figma', category: 'image', difficulty: 3, cost: '免费/订阅',
      steps: ['V0 描述 UI 生成 React 代码', '截图导入 Figma', '细调交互'],
      prompt: 'A SaaS dashboard for AI prompt management, with sidebar nav, prompt cards grid, search bar, and filter chips. Modern dark theme, glassmorphism, primary color #6366f1.'
    })
  ],
  'C6-4': [
    r({ title: 'AI 自动写设计提案 PPT', tool: 'ChatGPT + Gamma', category: 'text', difficulty: 2, cost: '免费',
      steps: ['让 GPT 写提案大纲', 'Gamma 生成 PPT', '人工配作品图'],
      prompt: '你是设计总监。请为【{client}】写一份品牌设计提案大纲，10 页：① 项目理解 ② 设计目标 ③ 品牌洞察 ④ 设计方向(3个)⑤ 应用展示 ⑥ 时间安排 ⑦ 报价 ⑧ 团队 ⑨ 案例 ⑩ Q&A。',
      variables: [{ name: 'client', label: '客户', placeholder: '某新茶饮品牌' }]
    })
  ]
};

// ============== C7 内容创作者 ==============
const C7_recipes = {
  'C7-1': [
    r({ title: 'AI 帮你定位垂直赛道', tool: 'ChatGPT + 飞瓜', category: 'text', difficulty: 2, cost: '飞瓜会员',
      steps: ['列出你的兴趣/技能/目标', 'AI 推荐 3 个垂直定位', '飞瓜验证赛道天花板'],
      prompt: '你是内容创作者教练。我的兴趣【{interest}】、技能【{skill}】、想做的平台【{platform}】、变现期望【{income}】。请：\n① 推荐 3 个最匹配的垂直定位(每个含：人群/内容方向/对标账号 3 个/变现方式)\n② 给出最优解 + 理由\n③ 90 天冷启动路径',
      variables: [
        { name: 'interest', label: '兴趣', placeholder: '宠物/AI/读书' },
        { name: 'skill', label: '技能', placeholder: '会PS/会写文/会拍视频' },
        { name: 'platform', label: '平台', placeholder: '小红书 / 抖音 / 视频号' },
        { name: 'income', label: '收入目标', placeholder: '月入 1 万' }
      ]
    })
  ],
  'C7-2': [
    r({ title: '小红书爆款笔记日更 SOP', tool: 'ChatGPT + Canva', category: 'text', difficulty: 2, cost: '免费',
      steps: ['每周末让 AI 生成 7 天选题', '每天早上 30 分钟用模板出图文', '17:00-21:00 发布'],
      prompt: '你是小红书爆款专家。请为【{niche}】博主生成本周 7 篇笔记选题：\n每篇含：① 爆款标题(3版本) ② 痛点钩子 ③ 内容大纲(5点) ④ 配图建议(6张) ⑤ 5 个话题标签 ⑥ 评论区互动话术',
      variables: [{ name: 'niche', label: '定位', placeholder: 'AI 提效给职场妈妈' }]
    })
  ],
  'C7-3': [
    r({ title: 'AI 帮你设计变现矩阵', tool: 'Claude', category: 'text', difficulty: 3, cost: '免费',
      steps: ['描述粉丝量/调性', 'AI 给出商单/带货/课程/会员等多元变现方案'],
      prompt: '我是【{platform}】博主，定位【{niche}】，粉丝【{fans}】，互动【{er}】。请帮我设计 4 层变现矩阵：① 流量层(广告/CPS) ② 商品层(带货/自营) ③ 服务层(咨询/陪跑) ④ IP 层(课程/会员/出书)。每层给具体执行方案 + 月预期收入区间。',
      variables: [
        { name: 'platform', label: '平台', placeholder: '小红书' },
        { name: 'niche', label: '定位', placeholder: 'AI提效' },
        { name: 'fans', label: '粉丝', placeholder: '5万' },
        { name: 'er', label: '互动率', placeholder: '8%' }
      ]
    })
  ]
};

// ============== C8 知识付费 ==============
const C8_recipes = {
  'C8-1': [
    r({ title: 'AI 帮你定位课程产品', tool: 'ChatGPT', category: 'text', difficulty: 2, cost: '免费',
      steps: ['描述能力 + 目标人群 + 痛点', 'AI 输出课程定位画布'],
      prompt: '你是知识付费产品经理。我的能力【{ability}】，目标人群【{audience}】，他们的痛点【{pain}】。请输出课程定位画布：① 课程名(3版) ② 核心价值主张 ③ 目标用户画像 ④ 学完后的"具体改变" ⑤ 课程结构(章节大纲) ⑥ 定价策略(¥99/¥299/¥999/¥2999 推荐哪档)。',
      variables: [
        { name: 'ability', label: '能力', placeholder: '10年电商运营' },
        { name: 'audience', label: '人群', placeholder: '想做电商的宝妈' },
        { name: 'pain', label: '痛点', placeholder: '不知从哪开始/怕亏钱' }
      ]
    })
  ],
  'C8-2': [
    r({ title: 'Gamma + 剪映 AI 量产课件', tool: 'Gamma + 剪映', category: 'image', difficulty: 2, cost: '免费',
      steps: ['Claude 写完整大纲', 'Gamma 一节生一个 PPT', '剪映"图文成片"配口播'],
      prompt: '请把课程《{course_name}》拆成 12 节，每节给：① 标题 ② 学习目标(3条) ③ 内容大纲(5点) ④ 实操作业 ⑤ 一句金句 ⑥ 该节适合的配图描述。',
      variables: [{ name: 'course_name', label: '课程名', placeholder: 'AI提效30天' }]
    })
  ],
  'C8-3': [
    r({ title: '小鹅通上架 + 私域转化 SOP', tool: '小鹅通 + 扣子', category: 'agent', difficulty: 3, cost: '小鹅通费用',
      steps: ['课程上架小鹅通', '扣子搭"试听-报名-学习"私域客服', '企业微信群运营'],
      prompt: '你是【{course}】的 AI 课程顾问。流程：① 用户咨询 → 推荐试听课 ② 试听后跟进 → 邀约 1v1 沟通 ③ 报名后 → 入群+学习提醒。语气：专业、温暖、不催单。',
      variables: [{ name: 'course', label: '课程名', placeholder: 'AI 提效 30 天' }]
    })
  ]
};

// ============== C9 本地生活 ==============
const C9_recipes = {
  'C9-1': [
    r({ title: '美团数据分析门店', tool: 'ChatGPT + 美团商家版', category: 'data', difficulty: 3, cost: '美团会员',
      steps: ['导出门店近 3 个月数据', '上传 ChatGPT 分析', '生成优化方案'],
      prompt: '我上传了【{shop_type}】门店近 3 个月美团数据(订单/客单价/差评/曝光)。请帮我：\n① 找出 3 个增长机会(选品/价格/时段)\n② 分析差评 TOP3 原因\n③ 优化菜单结构(主推/利润/引流)\n④ 下个月营销活动建议',
      variables: [{ name: 'shop_type', label: '类型', placeholder: '咖啡 / 火锅 / 茶饮' }]
    })
  ],
  'C9-2': [
    r({ title: '企微+扣子 私域会员复购', tool: '企业微信 + 扣子', category: 'agent', difficulty: 3, cost: '企微免费',
      steps: ['企微沉淀会员', '扣子做"会员升级提醒/生日券/复购催"', '群 SOP 执行'],
      prompt: '你是【{shop}】的会员专属顾问。任务：① 新会员入群 → 发欢迎+优惠券 ② 30 天未到店 → 发个性化召回 ③ 生日 → 发生日券 ④ 升级 → 发升级礼。语气：朋友式、不打扰。',
      variables: [{ name: 'shop', label: '门店', placeholder: 'XX 咖啡' }]
    })
  ]
};

// ============== D1-D7 实战项目 ==============
const D1_recipes = {
  'D1-1': [
    r({ title: '7 天 30 个抖音爆款选题', tool: 'ChatGPT + 飞瓜', category: 'text', difficulty: 2, cost: '飞瓜会员',
      steps: ['飞瓜导出近期热点', 'AI 套你的人设和方向', '产出 30 个选题表'],
      prompt: '你是抖音爆款选题官。我的账号定位【{niche}】，近期平台热点【{hots}】。请生成 30 个 7 天选题：每个含：① 标题(钩子型) ② 内容方向 ③ 拍摄难度 1-5 ④ 预估爆款度 1-5。表格输出。',
      variables: [
        { name: 'niche', label: '定位', placeholder: 'AI提效白领' },
        { name: 'hots', label: '热点', placeholder: 'DeepSeek / 反内卷 / 副业' }
      ]
    })
  ],
  'D1-2': [
    r({ title: '批量脚本生成器', tool: 'ChatGPT', category: 'text', difficulty: 2, cost: '免费',
      steps: ['一次喂 30 个选题', 'AI 批量出脚本', '存到表格直接拍'],
      prompt: '请把以下 30 个抖音选题，每个生成 60 秒口播脚本，包含：钩子(3秒)/痛点/3条干货/案例/CTA。\n\n选题列表：\n{topics}',
      variables: [{ name: 'topics', label: '选题', placeholder: '粘贴上一步生成的选题表' }]
    })
  ]
};

const D2_recipes = {
  'D2-1': [
    r({ title: 'AI 30 天电商从 0 到首单', tool: 'ChatGPT + 千牛', category: 'text', difficulty: 3, cost: '免费',
      steps: ['AI 帮你梳理"店铺战略书"', '5 款主推品 SKU 矩阵', '完整 30 天 SOP'],
      prompt: '你是 0-1 电商创业教练。我的资源：【{resource}】。预算：【{budget}】。请输出 30 天从 0 到首单计划：\n第 1 周：店铺定位+选品+开店\n第 2 周：视觉包+详情页+客服\n第 3 周：上架+测款+小流量测试\n第 4 周：付费推广+破零+首单\n每天具体任务列出。',
      variables: [
        { name: 'resource', label: '资源', placeholder: '我有家纺工厂资源/我会做内容...' },
        { name: 'budget', label: '预算', placeholder: '5万' }
      ]
    })
  ]
};

const D3_recipes = {
  'D3-1': [
    r({ title: '21 天 AI 微短剧剧本', tool: 'Claude + ChatGPT', category: 'text', difficulty: 4, cost: '免费',
      steps: ['Claude 200K 上下文写完整剧本', 'GPT 拆分镜', '人工微调'],
      prompt: '你是抖音微短剧编剧。请写一部 70 集竖屏短剧《{title}》，每集 90 秒。\n要求：\n① 主题：{theme}\n② 主角：{hero}\n③ 第 1 集前 3 秒必须强钩子\n④ 每集结尾留悬念\n⑤ 第 10/30/50 集必须有反转大事件\n⑥ 给 70 集分集大纲(每集：标题/钩子/3场戏/结尾悬念)\n⑦ 第 1 集完整剧本(对白+动作+镜头)',
      variables: [
        { name: 'title', label: '剧名', placeholder: '《重生之AI总裁》' },
        { name: 'theme', label: '主题', placeholder: '逆袭 / 复仇 / 甜宠' },
        { name: 'hero', label: '主角', placeholder: '25 岁被裁程序员' }
      ]
    })
  ],
  'D3-2': [
    r({ title: 'Kling 一致性人物批量生图', tool: 'Kling/Vidu + ComfyUI', category: 'video', difficulty: 5, cost: '订阅',
      steps: ['ComfyUI LoRA 训练主角形象', '每场戏用同一个 LoRA 出图', 'Kling 文生视频或图生视频'],
      prompt: '基于 {character_lora} 角色 LoRA。\n场景：{scene}\n动作：{action}\n表情：{expression}\n镜头：{shot}\n--ar 9:16'
    })
  ]
};

const D4_recipes = {
  'D4-1': [
    r({ title: 'HeyGen 1 小时打造数字人', tool: 'HeyGen / 硅基智能', category: 'video', difficulty: 3, cost: '$24/月',
      steps: ['录制 2 分钟正面视频', '上传 HeyGen 训练', '输入文字即生成你的数字人视频'],
      prompt: '【数字人配音文本】\n大家好，我是{name}，今天为大家介绍 {product}...\n\n参数：表情自然、语速正常、眼神交流'
    })
  ]
};

const D5_recipes = {
  'D5-1': [
    r({ title: 'AI 1 周完成 SVI 调研', tool: 'ChatGPT + Notion AI', category: 'text', difficulty: 3, cost: '免费',
      steps: ['AI 帮你列访谈大纲', '飞书妙记录音访谈', 'AI 分析共性 + 痛点'],
      prompt: '你是品牌战略咨询顾问。请为【{brand}】品牌全案设计客户访谈大纲：\n① 10 个开放式问题(品牌认知/使用场景/痛点/期待)\n② 访谈 SOP(如何破冰/追问/收尾)\n③ 5 类典型用户分类原则'
    })
  ]
};

const D6_recipes = {
  'D6-1': [
    r({ title: 'AI 帮你画工作流程图', tool: 'ChatGPT + draw.io', category: 'agent', difficulty: 3, cost: '免费',
      steps: ['让 AI 输出 Mermaid 代码', 'draw.io / Mermaid Live 渲染'],
      prompt: '请用 Mermaid 画一个【{workflow}】的工作流程图，包含：起点/判断节点/任务节点/终点。\n要求：节点≥10个，含 2 个判断分支。',
      variables: [{ name: 'workflow', label: '业务流', placeholder: '电商订单处理' }]
    })
  ]
};

const D7_recipes = {
  'D7-1': [
    r({ title: 'AI 帮你写 MVP PRD', tool: 'Claude', category: 'text', difficulty: 3, cost: '免费',
      steps: ['描述想法+用户+场景', 'Claude 输出完整 PRD', 'Cursor 直接读 PRD 开发'],
      prompt: '你是资深产品经理。请为【{idea}】写一份 MVP PRD：\n① 一句话定位 ② 核心用户(画像) ③ 核心场景(2-3个) ④ MVP 功能列表(最少可行) ⑤ 信息架构 ⑥ 关键流程 ⑦ 验收标准 ⑧ 不做什么(明确边界)。\n\n用 Markdown 输出，可直接交给 Cursor 开发。',
      variables: [{ name: 'idea', label: '想法', placeholder: '一个让小红书博主一键查询自己爆款规律的工具' }]
    }),
    r({ title: 'Cursor + V0 1 周做出 MVP', tool: 'Cursor + V0 + Vercel', category: 'code', difficulty: 4, cost: '订阅',
      steps: ['V0 出 UI', 'Cursor 复制 PRD 进 .agent.md', '让 Cursor 全栈开发', 'Vercel 部署'],
      prompt: '我把 PRD 放在了 docs/PRD.md。请基于 Next.js 14 + Tailwind + Supabase：\n1. 读 PRD\n2. 设计数据库 schema\n3. 实现核心 3 个页面\n4. 加上登录(Supabase Auth)\n5. 部署到 Vercel'
    })
  ]
};

// ============== E1-E5 企业方案 ==============
const E2_recipes = {
  'E2-1': [
    r({ title: 'AI 销售场景诊断', tool: 'ChatGPT + 飞书', category: 'text', difficulty: 3, cost: '免费',
      steps: ['梳理销售流程 8 步', 'AI 找到每步的 AI 赋能点', '排优先级'],
      prompt: '你是销售运营顾问。我们公司销售流程是【{flow}】。请：\n1. 在每一步找出 AI 可以赋能的点\n2. 评估每个赋能点的 ROI(影响力 1-5 / 落地难度 1-5)\n3. 排序最值得做的 TOP3\n4. TOP3 给具体落地方案(工具+成本+预期效果)',
      variables: [{ name: 'flow', label: '销售流程', placeholder: '获客→线索→邀约→面谈→报价→成交→交付→复购' }]
    })
  ],
  'E2-2': [
    r({ title: '扣子搭企业销售 Bot', tool: '扣子 + CRM', category: 'agent', difficulty: 4, cost: '免费',
      steps: ['上传产品/价格/案例/FAQ 到知识库', '配置销售人设', '接 CRM(纷享/销售易) 查客户信息', '部署到企业微信'],
      prompt: '你是【{company}】的 AI 销冠。能力：\n① 自动接待新线索，问 3 个核心问题(行业/规模/痛点)\n② 推荐匹配的产品方案\n③ 给报价区间(不给死价)\n④ 邀约面谈\n⑤ CRM 自动建档\n语气：专业、热情、不浮夸。',
      variables: [{ name: 'company', label: '公司', placeholder: 'XX SaaS' }]
    })
  ]
};

const E5_recipes = {
  'E5-1': [
    r({ title: 'AI 客服系统全景设计', tool: '扣子 / Dify / FastGPT', category: 'agent', difficulty: 4, cost: '订阅',
      steps: ['梳理客服流程', '设计 4 层兜底(自助/Bot/人工/升级)', '搭建 + 接 IM'],
      prompt: '请为【{company}】设计企业级 AI 客服系统：\n① 4 层架构图(Self-Service/AI Bot/Agent/Senior)\n② 知识库结构(产品/订单/售后/政策)\n③ 转人工触发条件\n④ 数据看板核心指标\n⑤ 上线 30 天 ROI 测算',
      variables: [{ name: 'company', label: '公司', placeholder: 'XX 电商' }]
    })
  ]
};

// ============== F1-F2 创业实战 ==============
const F1_recipes = {
  'F1-1': [
    r({ title: 'AI 帮你选副业方向', tool: 'Claude', category: 'text', difficulty: 2, cost: '免费',
      steps: ['详细描述能力/兴趣/资源', 'Claude 输出 3 个方向 + 决策矩阵'],
      prompt: '你是副业战略顾问。我的画像：\n- 主业：{job}\n- 技能：{skills}\n- 兴趣：{interests}\n- 时间：每天 {hours} 小时\n- 启动资金：¥{budget}\n- 收入目标：每月 ¥{income}\n\n请输出：\n① 3 个匹配的副业方向(每个含：能干什么/对标案例/启动路径/月收入区间)\n② 用 4 维决策矩阵打分(变现速度/天花板/与主业协同/可持续性)\n③ 最优解 + 理由\n④ 90 天启动 SOP',
      variables: [
        { name: 'job', label: '主业', placeholder: '产品经理' },
        { name: 'skills', label: '技能', placeholder: '会写文/做PPT/PRD' },
        { name: 'interests', label: '兴趣', placeholder: '健身/读书' },
        { name: 'hours', label: '时间', placeholder: '2' },
        { name: 'budget', label: '资金', placeholder: '5000' },
        { name: 'income', label: '目标', placeholder: '5000' }
      ]
    })
  ]
};

const F2_recipes = {
  'F2-1': [
    r({ title: 'AI 帮你设计商业模式画布', tool: 'Claude', category: 'text', difficulty: 3, cost: '免费',
      steps: ['填入产品和市场假设', 'Claude 输出完整 BMC + SWOT'],
      prompt: '你是早期创业顾问。请为我的项目【{project}】设计商业模式画布(BMC)：\n① 客户细分 ② 价值主张 ③ 渠道 ④ 客户关系 ⑤ 收入流 ⑥ 关键资源 ⑦ 关键活动 ⑧ 关键合作 ⑨ 成本结构\n\n再补充：SWOT 分析 + 3 个最大风险 + 验证方法。',
      variables: [{ name: 'project', label: '项目', placeholder: '面向小红书博主的 AI 选题工具' }]
    }),
    r({ title: 'AI 帮你写一份能融资的 BP', tool: 'Claude + Gamma', category: 'text', difficulty: 4, cost: '免费',
      steps: ['Claude 写 12 页 BP 大纲', 'Gamma 自动生成 PPT', '投资人友好结构'],
      prompt: '你是顶级 VC 合伙人。请为【{project}】写一份天使轮 BP 大纲(12 页)：\n1.封面 2.使命愿景 3.市场痛点 4.产品方案 5.商业模式 6.市场规模(TAM/SAM/SOM)\n7.竞争分析 8.团队 9.里程碑 10.财务预测(3年)11.融资计划(金额/估值/用途) 12.联系方式\n\n每页输出：① 核心要点 ② 关键数据/图表建议 ③ 演讲话术(30秒)',
      variables: [{ name: 'project', label: '项目', placeholder: 'AI 一人公司协作平台' }]
    })
  ]
};

// ============== L2/L3/L4 行业方向(简版) ==============
const L2B_recipes = { 'L2B-1': [r({ title: '微短剧赛道 AI 调研', tool: 'Kimi + ChatGPT', category: 'text',
  steps: ['Kimi 读 5 份行业报告', 'ChatGPT 总结赛道地图'],
  prompt: '请帮我做微短剧行业调研：① 市场规模 ② TOP10 平台 ③ 头部出品方 ④ 主流题材排行 ⑤ 单部成本/收益模型 ⑥ 我作为新入局者的最优切入点。' })] };
const L2C_recipes = { 'L2C-1': [r({ title: 'AI 设计基础提示词训练', tool: 'MJ', category: 'image',
  steps: ['每天练 7 字诀', '构建个人提示词库'],
  prompt: '/imagine prompt: {subject} in {style} style, {color}, {composition} --ar 16:9' })] };
const L2D_recipes = { 'L2D-1': [r({ title: '4 平台分发策略', tool: 'ChatGPT', category: 'text',
  steps: ['描述内容', 'AI 输出抖快小红视频号差异化策略'],
  prompt: '我有一条核心内容【{content}】。请为抖音/快手/小红书/视频号四平台分别改写：标题/封面/正文/话题/最佳发布时间。',
  variables: [{ name: 'content', label: '内容主题', placeholder: '一人公司省下70%办公成本' }] })] };

const L3A_recipes = { 'L3A-1': [r({ title: '院线级剧本创作', tool: 'Claude 200K', category: 'text', difficulty: 5,
  steps: ['Claude 写完整 90 分钟院线剧本', 'GPT 拆 120 个分镜', '人工打磨'],
  prompt: '你是好莱坞资深编剧。请写一部 90 分钟院线电影《{title}》，三幕结构：\n第一幕(30min): 建置-激励事件\n第二幕(50min): 对抗-中点反转-危机\n第三幕(10min): 高潮-结局\n\n输出：① 故事大纲 ② 角色小传 ③ 完整 90 分钟剧本(场号/场景/对白/动作)',
  variables: [{ name: 'title', label: '电影名', placeholder: '《代码之夏》' }] })] };

const L4A_recipes = { 'L4A-1': [r({ title: 'OPC 短剧项目立项', tool: 'ChatGPT + 飞书', category: 'text',
  steps: ['出立项书', '签 OPC 标准合约', '排期上线'],
  prompt: '请为我的 OPC 短剧项目【{name}】写立项书：① 项目定位 ② 制作团队 ③ 预算明细(3-30万) ④ 时间表 ⑤ 发行渠道 ⑥ 收益预测 ⑦ 风险',
  variables: [{ name: 'name', label: '项目名', placeholder: '《一人公司》' }] })] };

// ============== 默认/兜底配方 ==============
const DEFAULT_RECIPE = {
  title: 'AI 学习助手 - 知识精讲',
  tool: 'ChatGPT / Claude',
  category: 'text',
  difficulty: 1,
  cost: '免费',
  steps: [
    '使用左侧"AI 助教"对话框',
    '复制下方提示词，AI 会针对本节内容详细讲解',
    '听完后追问"举一个真实案例"',
    '完成本节产出物'
  ],
  prompt: '你是 OPC 学院资深 AI 教练。请围绕本节内容【{lesson}】，给我：\n① 核心概念 3 句话讲清楚\n② 关键工具的实操步骤(分点)\n③ 一个普通人 1 周能完成的练习\n④ 90% 学员会踩的 2 个坑\n⑤ 1 句激励金句\n\n讲解风格：通俗、有温度、有数字。',
  variables: [{ name: 'lesson', label: '本节标题', placeholder: '会自动填充' }],
  expected: '听得懂、学得会、用得上的 AI 讲解',
  tips: ['不懂就追问"再举一个例子"', 'AI 是 24/7 不知疲倦的私教']
};

// ============== 导出 ==============
export const aiRecipes = {
  ...A1_recipes, ...A2_recipes, ...A3_recipes, ...A4_recipes,
  ...B1_recipes, ...B2_recipes, ...B3_recipes, ...B4_recipes,
  ...L2A_recipes, ...L2B_recipes, ...L2C_recipes, ...L2D_recipes,
  ...C1_recipes, ...C2_recipes, ...C3_recipes, ...C4_recipes, ...C5_recipes,
  ...C6_recipes, ...C7_recipes, ...C8_recipes, ...C9_recipes,
  ...D1_recipes, ...D2_recipes, ...D3_recipes, ...D4_recipes,
  ...D5_recipes, ...D6_recipes, ...D7_recipes,
  ...L3A_recipes,
  ...E2_recipes, ...E5_recipes,
  ...F1_recipes, ...F2_recipes,
  ...L4A_recipes
};

// 获取某个 lesson 的 AI 配方（带兜底）
export function getRecipes(lessonId, lessonTitle) {
  const list = aiRecipes[lessonId];
  if (list && list.length) return list;
  // 兜底：基于课时标题生成默认配方
  const fallback = { ...DEFAULT_RECIPE };
  if (lessonTitle) {
    fallback.prompt = fallback.prompt.replace('{lesson}', lessonTitle);
  }
  return [fallback];
}

// AI 工具图标映射（前端展示用）
export const toolIcons = {
  'ChatGPT': '🤖', 'ChatGPT-4o': '🤖', 'GPT-4': '🤖', 'GPTs': '🛠️',
  'Claude': '📜', 'Claude 3.5': '📜', 'Claude 3.5 Sonnet': '📜', 'Claude 200K': '📜',
  'Gemini': '✨',
  '通义千问': '🐻', '通义万相': '🎨', '通义': '🐻',
  'Kimi': '🌙',
  'DeepSeek': '🐳',
  '智谱清言': '💎', '文心一言': '🐲',
  'Midjourney': '🎨', 'Midjourney V6': '🎨', 'MJ': '🎨',
  'Stable Diffusion': '🖼️', 'SDXL': '🖼️', 'SD': '🖼️', 'ComfyUI': '🧩', 'Flux': '🌊',
  'Kling': '🎬', 'Kling AI': '🎬', 'Vidu': '📹', 'Runway': '🎞️', 'Sora': '🎥',
  '剪映AI': '✂️', '剪映': '✂️',
  'ElevenLabs': '🎙️', 'Suno': '🎵', '魔音工坊': '🎤',
  '扣子': '🤝', '扣子(Coze)': '🤝', 'Coze': '🤝', 'Dify': '⚡', 'FastGPT': '🚀',
  'Cursor': '⌨️', 'V0': '🎨', 'V0.dev': '🎨', 'Bolt': '⚡', 'Bolt.new': '⚡',
  'Gamma': '📊', 'Gamma.app': '📊',
  'Canva': '🖌️', 'Figma': '🖋️',
  'Perplexity': '🔍', '飞书': '📘', '飞书AI': '📘', '飞书妙记': '🎤',
  'Notion': '📝', 'Notion AI': '📝',
  'HeyGen': '👤', '硅基智能': '👤',
  '美图AI': '💄', 'Photoroom': '🪄',
  'n8n': '🔗', 'Make': '🔄', 'Zapier': '🔌',
  'Excel': '📊', 'Python': '🐍'
};

export function toolIcon(name) {
  if (!name) return '🤖';
  return toolIcons[name] || '🤖';
}
