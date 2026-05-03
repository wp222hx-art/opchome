// 8 大行业赛道完整 12 课时（4 阶段 × 3 课时）
// 每个赛道结构：T1-S1-1 ... T1-S4-3，对应 OPC Learning OS 的 4 阶段进阶

const stage = [
  { code: 'S1', name: '认知阶段', icon: '🌱' },
  { code: 'S2', name: '落地阶段', icon: '🚀' },
  { code: 'S3', name: '深化阶段', icon: '⚙️' },
  { code: 'S4', name: '变现阶段', icon: '💎' }
];

// 通用区块构造器
const block = {
  intro: (c) => ({ type: 'intro', title: '本课导读', content: c }),
  concept: (t, items) => ({ type: 'concept', title: t, items }),
  workflow: (t, steps) => ({ type: 'workflow', title: t, steps }),
  practice: (t, c) => ({ type: 'practice', title: t, content: c }),
  tip: (c) => ({ type: 'tip', title: '💡 行业洞察', content: c }),
  summary: (pts, next = '') => ({ type: 'summary', title: '本课小结', points: pts, next })
};

// ============== T1 电商零售（跨境/服装/珠宝/家居） ==============
const T1 = [
  // S1 认知
  { id: 'T1-S1-1', stage: 'S1', title: 'AI 重塑电商：从流量到留量', duration: 30, target: '电商从业者', tools: ['ChatGPT', 'Claude', '生意参谋'],
    objectives: ['理解 AI 在电商全链路的应用', '识别自身业务的 AI 切入点'],
    blocks: [
      block.intro('过去 10 年电商打的是流量战，未来 10 年将是 "AI×留量×效率" 之战。本课带你认识 AI 在电商每个环节的杀手级应用。'),
      block.concept('电商 AI 全景图', [
        { name: '选品端', desc: 'AI 分析平台数据 + 评论挖掘 + 趋势预测' },
        { name: '内容端', desc: '主图/详情页/短视频/直播脚本 全 AI 生产' },
        { name: '客服端', desc: '7×24 智能客服 Bot，转化率 +20%' },
        { name: '运营端', desc: '广告投放/会员复购/数据分析 自动化' }
      ]),
      block.tip('单点 AI 不再是壁垒，"AI 全链路 SOP" 才是。一人公司式电商正在崛起。'),
      block.summary(['AI 已渗透电商全链路', '关键是建立全链路 SOP', '一人公司式电商已成可能'], '下一课：AI 选品方法论')
    ]},
  { id: 'T1-S1-2', stage: 'S1', title: 'AI 选品方法论', duration: 35, target: '电商从业者', tools: ['ChatGPT', '飞瓜', '生意参谋', '蝉妈妈'],
    objectives: ['用 AI 找到蓝海品类', '建立选品决策矩阵'],
    blocks: [
      block.workflow('AI 选品 5 步法', [
        { step: 1, title: '榜单扫描', desc: '飞瓜/蝉妈妈 抓取 7 天 Top100' },
        { step: 2, title: '评论挖掘', desc: 'ChatGPT 分析评论找差评机会点' },
        { step: 3, title: '趋势预测', desc: 'Claude 长文本读 100 篇行业报告' },
        { step: 4, title: '决策打分', desc: '从市场/竞争/利润/物流/合规 5 维打分' },
        { step: 5, title: '小步测试', desc: '选 3 款入仓测款，2 周决定追投' }
      ]),
      block.practice('实操', '请选定一个细分品类，按 5 步法完成选品分析报告。'),
      block.summary(['选品 = 数据 + 直觉 + 测试', 'AI 极大降低决策成本'])
    ]},
  { id: 'T1-S1-3', stage: 'S1', title: '电商账号定位与人设', duration: 30, target: '店铺主理人', tools: ['ChatGPT', 'Midjourney'],
    objectives: ['完成店铺/账号的差异化定位', '建立可复用人设'],
    blocks: [
      block.concept('店铺定位三要素', [
        { name: '人群', desc: '画像 5 维：年龄/性别/收入/兴趣/痛点' },
        { name: '差异', desc: '与 Top10 同行的 3 大差异化卖点' },
        { name: '人设', desc: '老板/主理人/客服 三类人设' }
      ]),
      block.summary(['先定位，再选品，最后引流', '人设是流量与转化的放大器'])
    ]},

  // S2 落地
  { id: 'T1-S2-1', stage: 'S2', title: 'AI 商品视觉生产线', duration: 45, target: '运营/设计', tools: ['Midjourney', 'SD', '美图AI', 'Canva'],
    objectives: ['搭建商品图片生产 SOP', '主图点击率提升 30%'],
    blocks: [
      block.workflow('主图生产 SOP', [
        { step: 1, title: '场景定义', desc: '用户使用场景描述' },
        { step: 2, title: 'MJ 出图', desc: '主图 + 4 个细节图' },
        { step: 3, title: '美图 AI 优化', desc: '换背景/换模特/调色' },
        { step: 4, title: 'Canva 加文案', desc: '套品类爆款模板' },
        { step: 5, title: 'A/B 测试', desc: '上线 2 版主图测试' }
      ]),
      block.tip('单图成本从 200 元降到 5 元，速度从 3 天降到 30 分钟。')
    ]},
  { id: 'T1-S2-2', stage: 'S2', title: 'AI 详情页与文案', duration: 45, target: '运营/文案', tools: ['ChatGPT', 'Claude'],
    objectives: ['10 分钟生成商业级详情页', '转化率提升 20%'],
    blocks: [
      block.workflow('详情页 7 段式', [
        { step: 1, title: '钩子标题', desc: '5 秒抓注意力' },
        { step: 2, title: '痛点放大', desc: '用户场景刺激' },
        { step: 3, title: '产品介绍', desc: '核心卖点 3 条' },
        { step: 4, title: '使用场景', desc: '生活化展示' },
        { step: 5, title: '用户证言', desc: '5 段真实评价' },
        { step: 6, title: '资质背书', desc: '认证/媒体/明星' },
        { step: 7, title: '行动号召', desc: '限时+稀缺' }
      ])
    ]},
  { id: 'T1-S2-3', stage: 'S2', title: 'AI 客服 Bot 上线', duration: 40, target: '客服/运营', tools: ['扣子', 'Dify'],
    objectives: ['搭建店铺专属客服 Bot', '咨询转化率 +25%'],
    blocks: [
      block.workflow('客服 Bot 5 步', [
        { step: 1, title: '梳理 100 个 FAQ', desc: '导出店铺 30 天客服记录' },
        { step: 2, title: '上传知识库', desc: '扣子上传 FAQ + 商品手册' },
        { step: 3, title: '配置技能', desc: '订单查询/退换货/优惠咨询' },
        { step: 4, title: '人工兜底', desc: '复杂问题转人工' },
        { step: 5, title: '上线', desc: '集成到淘宝/微信/网页' }
      ])
    ]},

  // S3 深化
  { id: 'T1-S3-1', stage: 'S3', title: 'AI 短视频/直播带货', duration: 50, target: '运营/主播', tools: ['Kling', '剪映AI', 'ChatGPT', 'HeyGen'],
    objectives: ['日产 5 条带货短视频', '搭建数字人直播间'],
    blocks: [
      block.tip('真人难复制，数字人 7×24 不下播。AI 带货正在重塑直播行业。')
    ]},
  { id: 'T1-S3-2', stage: 'S3', title: '广告投放与 ROI 优化', duration: 45, target: '投手', tools: ['ChatGPT', 'Google Ads', '钻展'],
    objectives: ['用 AI 写广告创意', 'ROI 提升 30%'],
    blocks: []},
  { id: 'T1-S3-3', stage: 'S3', title: '私域复购与会员体系', duration: 40, target: '私域运营', tools: ['企业微信', '扣子'],
    objectives: ['搭建私域 SOP', '复购率 +40%'],
    blocks: []},

  // S4 变现
  { id: 'T1-S4-1', stage: 'S4', title: '电商 AI 工作流自动化', duration: 50, target: '老板/运营', tools: ['n8n', '扣子', 'Make'],
    objectives: ['搭建一人电商全流程', '人效提升 5 倍'],
    blocks: []},
  { id: 'T1-S4-2', stage: 'S4', title: '数据驱动的精细化运营', duration: 45, target: '老板/数据', tools: ['ChatGPT', 'Excel', '生意参谋'],
    objectives: ['月度数据复盘 SOP', '决策提速 10 倍'],
    blocks: []},
  { id: 'T1-S4-3', stage: 'S4', title: '一人电商规模化', duration: 50, target: '创业者', tools: ['全套 AI'],
    objectives: ['打造可复制 SOP', '冲击月销 100 万'],
    blocks: [
      block.summary(['一人公司式电商可月入 10-100 万', 'SOP + AI = 规模化的核心', '把每个环节都做到 80 分以上'], '完成本赛道，恭喜！')
    ]}
];

// ============== T2 健康美业 ==============
const T2 = [
  { id: 'T2-S1-1', stage: 'S1', title: '美业合规红线认知', duration: 30, target: '美业从业者', tools: ['ChatGPT', '合规词库'],
    objectives: ['熟悉美业广告法红线', '建立合规思维'],
    blocks: [
      block.concept('三色合规词库', [
        { name: '红色禁用', desc: '"绝对/最/第一/治愈/医疗"等' },
        { name: '黄色慎用', desc: '"快速/明显/立刻"等需谨慎' },
        { name: '绿色推荐', desc: '"温和/科学/呵护"等合规表达' }
      ]),
      block.tip('合规不是束缚，是美业最大的护城河。一次违规可能终结整个品牌。')
    ]},
  { id: 'T2-S1-2', stage: 'S1', title: '美业用户画像与人群分层', duration: 30, target: '运营', tools: ['ChatGPT'],
    objectives: ['完成美业用户画像', '人群分层运营'], blocks: []},
  { id: 'T2-S1-3', stage: 'S1', title: '产品定位与差异化', duration: 35, target: '品牌方', tools: ['Claude'],
    objectives: ['完成产品差异化定位'], blocks: []},

  { id: 'T2-S2-1', stage: 'S2', title: 'AI 合规种草内容生产', duration: 45, target: '内容创作者', tools: ['ChatGPT', 'Midjourney'],
    objectives: ['日产 10 篇合规种草', '0 违规'], blocks: []},
  { id: 'T2-S2-2', stage: 'S2', title: '肤质咨询 AI 助手', duration: 40, target: '客服', tools: ['扣子'],
    objectives: ['搭建肤质咨询 Bot'], blocks: []},
  { id: 'T2-S2-3', stage: 'S2', title: '私域社群运营', duration: 40, target: '私域', tools: ['企业微信', 'ChatGPT'],
    objectives: ['搭建美业私域 SOP'], blocks: []},

  { id: 'T2-S3-1', stage: 'S3', title: '专家 IP 打造', duration: 50, target: '主理人', tools: ['MJ', 'ChatGPT'],
    objectives: ['打造美业专家 IP'], blocks: []},
  { id: 'T2-S3-2', stage: 'S3', title: '直播话术与脚本', duration: 45, target: '主播', tools: ['ChatGPT', 'HeyGen'],
    objectives: ['美业直播话术 SOP'], blocks: []},
  { id: 'T2-S3-3', stage: 'S3', title: '会员复购体系', duration: 40, target: '运营', tools: ['ChatGPT'],
    objectives: ['复购率 +50%'], blocks: []},

  { id: 'T2-S4-1', stage: 'S4', title: '美业连锁 AI 化', duration: 50, target: '老板', tools: ['全套 AI'],
    objectives: ['连锁门店 AI 标准化'], blocks: []},
  { id: 'T2-S4-2', stage: 'S4', title: '数据洞察与决策', duration: 45, target: '管理层', tools: ['ChatGPT', 'Excel'],
    objectives: ['月度数据洞察 SOP'], blocks: []},
  { id: 'T2-S4-3', stage: 'S4', title: '美业品牌资产化', duration: 50, target: '创始人', tools: [],
    objectives: ['品牌价值 1000 万+'], blocks: []}
];

// ============== T3 餐饮生活 ==============
const T3 = [
  { id: 'T3-S1-1', stage: 'S1', title: '餐饮 AI 化全景', duration: 30, target: '餐饮老板', tools: ['ChatGPT', '美团商家版'],
    objectives: ['理解餐饮 AI 切入点'], blocks: []},
  { id: 'T3-S1-2', stage: 'S1', title: '门店定位与差异化', duration: 30, target: '老板', tools: ['ChatGPT'], objectives: ['门店定位'], blocks: []},
  { id: 'T3-S1-3', stage: 'S1', title: '美团/大众点评数据解读', duration: 30, target: '运营', tools: ['ChatGPT'], objectives: ['数据解读 SOP'], blocks: []},

  { id: 'T3-S2-1', stage: 'S2', title: 'AI 菜单与菜品摄影', duration: 45, target: '运营', tools: ['MJ', 'Canva'], objectives: ['全套菜单视觉'], blocks: []},
  { id: 'T3-S2-2', stage: 'S2', title: '到店活动策划', duration: 40, target: '运营', tools: ['ChatGPT'], objectives: ['月度活动方案'], blocks: []},
  { id: 'T3-S2-3', stage: 'S2', title: '点评评价管理', duration: 35, target: '老板', tools: ['ChatGPT'], objectives: ['好评率 +30%'], blocks: []},

  { id: 'T3-S3-1', stage: 'S3', title: '私域社群与会员', duration: 45, target: '运营', tools: ['企业微信'], objectives: ['会员体系'], blocks: []},
  { id: 'T3-S3-2', stage: 'S3', title: '抖音本地生活', duration: 50, target: '运营', tools: ['剪映', 'Kling'], objectives: ['抖音本地团购'], blocks: []},
  { id: 'T3-S3-3', stage: 'S3', title: '外卖优化', duration: 40, target: '老板', tools: ['ChatGPT'], objectives: ['外卖单量 +50%'], blocks: []},

  { id: 'T3-S4-1', stage: 'S4', title: '门店 SOP 标准化', duration: 50, target: '管理者', tools: [], objectives: ['标准化 SOP'], blocks: []},
  { id: 'T3-S4-2', stage: 'S4', title: '数据驱动决策', duration: 45, target: '老板', tools: ['ChatGPT'], objectives: ['月度决策 SOP'], blocks: []},
  { id: 'T3-S4-3', stage: 'S4', title: '餐饮连锁化', duration: 50, target: '创始人', tools: [], objectives: ['连锁可复制'], blocks: []}
];

// ============== T4 房产金融 ==============
const T4 = [
  { id: 'T4-S1-1', stage: 'S1', title: '房产/金融 AI 应用全景', duration: 35, target: '从业者', tools: ['ChatGPT'], objectives: ['行业 AI 全景'], blocks: []},
  { id: 'T4-S1-2', stage: 'S1', title: '客户画像与需求挖掘', duration: 35, target: '销售', tools: ['ChatGPT'], objectives: ['SPIN 提问法'], blocks: []},
  { id: 'T4-S1-3', stage: 'S1', title: '行业合规要点', duration: 30, target: '所有人', tools: [], objectives: ['熟悉合规'], blocks: []},

  { id: 'T4-S2-1', stage: 'S2', title: '楼盘/产品对比报告', duration: 45, target: '销售', tools: ['ChatGPT', 'Claude'], objectives: ['对比报告 SOP'], blocks: []},
  { id: 'T4-S2-2', stage: 'S2', title: 'AI 客户跟进 SOP', duration: 40, target: '销售', tools: ['扣子'], objectives: ['跟进 SOP'], blocks: []},
  { id: 'T4-S2-3', stage: 'S2', title: '内容种草与个人 IP', duration: 45, target: '销售', tools: ['MJ', 'ChatGPT'], objectives: ['个人 IP'], blocks: []},

  { id: 'T4-S3-1', stage: 'S3', title: '直播带房/带保', duration: 50, target: '主播', tools: ['ChatGPT'], objectives: ['直播话术'], blocks: []},
  { id: 'T4-S3-2', stage: 'S3', title: '客户 CRM 与精细化', duration: 45, target: '销售', tools: ['CRM'], objectives: ['CRM 体系'], blocks: []},
  { id: 'T4-S3-3', stage: 'S3', title: '高净值客户运营', duration: 45, target: '资深销售', tools: [], objectives: ['高净值 SOP'], blocks: []},

  { id: 'T4-S4-1', stage: 'S4', title: '团队 AI 工作流', duration: 50, target: '团队长', tools: ['n8n'], objectives: ['团队工作流'], blocks: []},
  { id: 'T4-S4-2', stage: 'S4', title: '佣金规模化', duration: 45, target: '销冠', tools: [], objectives: ['月佣 5-20 万'], blocks: []},
  { id: 'T4-S4-3', stage: 'S4', title: '财富管理品牌化', duration: 50, target: '资深', tools: [], objectives: ['个人品牌'], blocks: []}
];

// ============== T5 教育招聘 ==============
const T5 = [
  { id: 'T5-S1-1', stage: 'S1', title: '教育 AI 应用全景', duration: 30, target: '教师/培训师', tools: ['ChatGPT'], objectives: ['教育 AI 全景'], blocks: []},
  { id: 'T5-S1-2', stage: 'S1', title: '学员画像与需求', duration: 30, target: '运营', tools: ['ChatGPT'], objectives: ['画像 SOP'], blocks: []},
  { id: 'T5-S1-3', stage: 'S1', title: '行业合规与资质', duration: 30, target: '管理者', tools: [], objectives: ['合规要点'], blocks: []},

  { id: 'T5-S2-1', stage: 'S2', title: 'AI 备课与教研', duration: 45, target: '教师', tools: ['ChatGPT', 'Gamma'], objectives: ['备课 SOP'], blocks: []},
  { id: 'T5-S2-2', stage: 'S2', title: '智慧课件与互动', duration: 45, target: '教师', tools: ['Gamma', '扣子'], objectives: ['互动课件'], blocks: []},
  { id: 'T5-S2-3', stage: 'S2', title: 'AI 出题与批改', duration: 40, target: '教师', tools: ['ChatGPT', 'Claude'], objectives: ['题库 SOP'], blocks: []},

  { id: 'T5-S3-1', stage: 'S3', title: '招生引流与转化', duration: 50, target: '招生老师', tools: ['ChatGPT'], objectives: ['招生 SOP'], blocks: []},
  { id: 'T5-S3-2', stage: 'S3', title: '续课与转介绍', duration: 45, target: '运营', tools: ['ChatGPT'], objectives: ['续课率 +30%'], blocks: []},
  { id: 'T5-S3-3', stage: 'S3', title: '知识付费课程化', duration: 45, target: '主理人', tools: ['Gamma', '小鹅通'], objectives: ['课程上架'], blocks: []},

  { id: 'T5-S4-1', stage: 'S4', title: '教培机构 AI 化', duration: 50, target: '管理者', tools: ['全套 AI'], objectives: ['机构标准化'], blocks: []},
  { id: 'T5-S4-2', stage: 'S4', title: '招聘 AI 工作流', duration: 45, target: 'HR/猎头', tools: ['ChatGPT', '飞书'], objectives: ['招聘 SOP'], blocks: []},
  { id: 'T5-S4-3', stage: 'S4', title: '个人 IP 知识付费', duration: 50, target: '老师', tools: [], objectives: ['月入 5-15 万'], blocks: []}
];

// ============== T6 工业 B2B ==============
const T6 = [
  { id: 'T6-S1-1', stage: 'S1', title: '制造业 AI 化趋势', duration: 35, target: '管理者', tools: ['ChatGPT'], objectives: ['趋势认知'], blocks: []},
  { id: 'T6-S1-2', stage: 'S1', title: '外贸 B2B 客户画像', duration: 35, target: '业务员', tools: ['ChatGPT'], objectives: ['客户画像'], blocks: []},
  { id: 'T6-S1-3', stage: 'S1', title: 'B2B 内容营销逻辑', duration: 30, target: '市场', tools: [], objectives: ['内容逻辑'], blocks: []},

  { id: 'T6-S2-1', stage: 'S2', title: '英文询盘与报价', duration: 45, target: '业务员', tools: ['ChatGPT', 'Claude'], objectives: ['询盘 SOP'], blocks: []},
  { id: 'T6-S2-2', stage: 'S2', title: '产品手册与画册', duration: 45, target: '市场', tools: ['MJ', 'Canva'], objectives: ['全套画册'], blocks: []},
  { id: 'T6-S2-3', stage: 'S2', title: 'LinkedIn 个人品牌', duration: 40, target: '业务员', tools: ['ChatGPT'], objectives: ['LinkedIn 营销'], blocks: []},

  { id: 'T6-S3-1', stage: 'S3', title: '展会与海外营销', duration: 50, target: '业务', tools: ['ChatGPT'], objectives: ['展会 SOP'], blocks: []},
  { id: 'T6-S3-2', stage: 'S3', title: 'CRM 与客户运营', duration: 45, target: '销售', tools: ['CRM'], objectives: ['CRM 体系'], blocks: []},
  { id: 'T6-S3-3', stage: 'S3', title: '工厂直播与短视频', duration: 45, target: '主播', tools: ['Kling'], objectives: ['工厂直播'], blocks: []},

  { id: 'T6-S4-1', stage: 'S4', title: '工厂数字化 AI 工作流', duration: 50, target: '老板', tools: ['n8n'], objectives: ['工作流 SOP'], blocks: []},
  { id: 'T6-S4-2', stage: 'S4', title: '海外品牌建设', duration: 50, target: '创始人', tools: [], objectives: ['品牌化路径'], blocks: []},
  { id: 'T6-S4-3', stage: 'S4', title: 'B2B 规模化', duration: 50, target: '创始人', tools: [], objectives: ['年销千万'], blocks: []}
];

// ============== T7 社交营销 ==============
const T7 = [
  { id: 'T7-S1-1', stage: 'S1', title: '社交营销底层逻辑', duration: 30, target: '所有人', tools: ['ChatGPT'], objectives: ['底层逻辑'], blocks: []},
  { id: 'T7-S1-2', stage: 'S1', title: '裂变机制设计', duration: 30, target: '运营', tools: ['ChatGPT'], objectives: ['裂变机制'], blocks: []},
  { id: 'T7-S1-3', stage: 'S1', title: '团队招募与培训', duration: 30, target: '团队长', tools: [], objectives: ['招募 SOP'], blocks: []},

  { id: 'T7-S2-1', stage: 'S2', title: 'AI 朋友圈批量内容', duration: 45, target: '推广员', tools: ['ChatGPT', '剪映'], objectives: ['朋友圈 SOP'], blocks: []},
  { id: 'T7-S2-2', stage: 'S2', title: '社群冷启动 SOP', duration: 45, target: '社群长', tools: ['ChatGPT'], objectives: ['社群运营'], blocks: []},
  { id: 'T7-S2-3', stage: 'S2', title: '裂变海报与活动', duration: 40, target: '运营', tools: ['Canva'], objectives: ['裂变海报'], blocks: []},

  { id: 'T7-S3-1', stage: 'S3', title: '直播沙龙与公开课', duration: 50, target: '团队长', tools: ['HeyGen'], objectives: ['沙龙 SOP'], blocks: []},
  { id: 'T7-S3-2', stage: 'S3', title: '团队复制与传承', duration: 45, target: '资深', tools: [], objectives: ['团队复制'], blocks: []},
  { id: 'T7-S3-3', stage: 'S3', title: '游戏化激励', duration: 40, target: '团队长', tools: [], objectives: ['激励机制'], blocks: []},

  { id: 'T7-S4-1', stage: 'S4', title: '组织 AI 工作流', duration: 50, target: '高层', tools: ['n8n'], objectives: ['组织工作流'], blocks: []},
  { id: 'T7-S4-2', stage: 'S4', title: '合规与风险管控', duration: 45, target: '高层', tools: [], objectives: ['合规要点'], blocks: []},
  { id: 'T7-S4-3', stage: 'S4', title: '社交品牌化', duration: 50, target: '创始人', tools: [], objectives: ['品牌资产'], blocks: []}
];

// ============== T8 短剧动漫创作 ==============
const T8 = [
  { id: 'T8-S1-1', stage: 'S1', title: '短剧/漫剧爆款逻辑', duration: 35, target: '创作者', tools: ['ChatGPT'],
    objectives: ['理解爆款公式', '建立创作思维'],
    blocks: [
      block.intro('过去 3 年，微短剧从 0 到 600 亿。AI 时代，普通人也能做出爆款短剧。'),
      block.concept('爆款 4 要素', [
        { name: '前 3 秒钩子', desc: '冲突/反差/悬念，决定 70% 完播率' },
        { name: '30 秒反转', desc: '每 30 秒一个情节反转' },
        { name: '情绪曲线', desc: '愤怒→爽→甜，情绪起伏' },
        { name: '付费节点', desc: '第 8-15 集设付费点' }
      ]),
      block.tip('短剧不是缩短的电影，是"情绪过山车"。')
    ]},
  { id: 'T8-S1-2', stage: 'S1', title: 'AI 短剧赛道与定位', duration: 35, target: '创作者', tools: ['ChatGPT'], objectives: ['赛道选择'], blocks: []},
  { id: 'T8-S1-3', stage: 'S1', title: '工具栈选型', duration: 30, target: '创作者', tools: ['Kling', 'Vidu', 'MJ'], objectives: ['工具栈'], blocks: []},

  { id: 'T8-S2-1', stage: 'S2', title: 'AI 编剧与剧本结构', duration: 50, target: '编剧', tools: ['ChatGPT', 'Claude'],
    objectives: ['10 分钟生成剧本', '结构化叙事'],
    blocks: [
      block.workflow('AI 编剧 5 步', [
        { step: 1, title: '类型定位', desc: '甜宠/逆袭/穿越/复仇' },
        { step: 2, title: '人物设定', desc: '主角/反派/工具人' },
        { step: 3, title: '主线大纲', desc: '20 集剧情主线' },
        { step: 4, title: '分集脚本', desc: '每集 1 个钩子+1 个反转' },
        { step: 5, title: '台词润色', desc: 'Claude 润色情感表达' }
      ])
    ]},
  { id: 'T8-S2-2', stage: 'S2', title: 'AI 角色与场景设计', duration: 45, target: '美术', tools: ['MJ', 'SD', 'ComfyUI'],
    objectives: ['角色设定一致性', '场景批量生成'],
    blocks: [
      block.tip('一致性是 AI 短剧最大难题。用同一角色 reference + ComfyUI 工作流 解决。')
    ]},
  { id: 'T8-S2-3', stage: 'S2', title: 'AI 视频生成与调教', duration: 50, target: '导演', tools: ['Kling', 'Vidu'],
    objectives: ['镜头语言', '动作流畅'],
    blocks: []},

  { id: 'T8-S3-1', stage: 'S3', title: '配音音乐与音效', duration: 45, target: '后期', tools: ['ElevenLabs', 'Suno'],
    objectives: ['专业级音轨'],
    blocks: []},
  { id: 'T8-S3-2', stage: 'S3', title: '剪辑成片与调色', duration: 50, target: '剪辑师', tools: ['剪映', 'DaVinci'],
    objectives: ['完整成片'],
    blocks: []},
  { id: 'T8-S3-3', stage: 'S3', title: '短剧发行与平台', duration: 45, target: '制片', tools: [],
    objectives: ['平台对接 SOP'],
    blocks: []},

  { id: 'T8-S4-1', stage: 'S4', title: '短剧商业模式', duration: 50, target: '制片人', tools: [],
    objectives: ['付费/分账/广告'],
    blocks: [
      block.concept('短剧 4 大变现', [
        { name: '充值付费', desc: '红果/抖音/快手 付费观看' },
        { name: '平台分账', desc: '腾讯/优酷分账' },
        { name: '品牌定制', desc: '品牌定制短剧' },
        { name: 'IP 衍生', desc: '番外/小说/周边' }
      ])
    ]},
  { id: 'T8-S4-2', stage: 'S4', title: '团队制片化', duration: 50, target: '团队长', tools: [],
    objectives: ['团队协作 SOP'],
    blocks: []},
  { id: 'T8-S4-3', stage: 'S4', title: '一年 12 部 AI 短剧规划', duration: 50, target: '创始人', tools: [],
    objectives: ['年度规划', '稳定盈利'],
    blocks: [
      block.summary([
        '一人 / 小团队可月产 1-2 部短剧',
        '稳定爆款率 = 持续投入 + 数据复盘',
        'AI 短剧将催生大量百万级一人公司'
      ], '完成 T8 赛道，恭喜你成为 OPC 短剧创作者！')
    ]}
];

// 导出
export const trackLessons = {
  T1, T2, T3, T4, T5, T6, T7, T8
};

export const trackStages = stage;
