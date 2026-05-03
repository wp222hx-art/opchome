// OPC 社区运营端 Mock 数据 - 基于《OPC社区运营手册V2.0》
// 后端可通过 /api/* 系列接口替换

// 会员数据（4级：体验/标准/高级/孵化）
export const memberLevels = [
  { id: 'L0', name: '体验会员', monthlyFee: 0, color: '#94a3b8', icon: '🌱', target: '潜在用户/学生' },
  { id: 'L1', name: '标准会员', monthlyFee: 299, color: '#3b82f6', icon: '🌟', target: '个人创作者' },
  { id: 'L2', name: '高级会员', monthlyFee: 799, color: '#a855f7', icon: '💎', target: '小团队(2-5人)' },
  { id: 'L3', name: '孵化会员', monthlyFee: 1999, color: '#f59e0b', icon: '👑', target: '签约团队' }
];

export const memberRights = {
  'L0': { workspace: false, meeting: 0, studio: 0, equipment: false, mentor: 0, projectRec: false },
  'L1': { workspace: '不限时', meeting: 4, studio: 2, equipment: '基础', mentor: 0, projectRec: false },
  'L2': { workspace: '不限时', meeting: 12, studio: 8, equipment: '专业', mentor: 1, projectRec: true },
  'L3': { workspace: '专属工位', meeting: '不限', studio: '优先不限', equipment: '全部', mentor: 4, projectRec: '优先' }
};

// 模拟会员（45人样本）
const sampleNames = ['张明远','李思琪','王宇航','刘若彤','陈志强','赵一诺','孙佳豪','周婉清','吴俊杰','郑雅雯','黄子轩','许悦然','何梓萱','林浩然','罗思源','梁俊熙','宋书瑶','谢明轩','韩诗韵','唐雨桐','冯晨曦','朱嘉怡','马天宇','曹诗涵','邓子墨','蒋雨欣','沈嘉树','贾一鸣','彭佳琪','严子轩','叶宁致','潘思成','钟可儿','姚明远','汪文博','邹梦琪','江晓楠','尹乐怡','龚景行','顾辰逸','卢思齐','石天泽','邱悠然','袁慕白','梅子涵'];

export const members = sampleNames.map((name, i) => {
  const levelIdx = i < 5 ? 0 : i < 35 ? 1 : i < 42 ? 2 : 3;
  const level = memberLevels[levelIdx];
  const joinedDays = Math.floor(Math.random() * 300) + 10;
  return {
    id: 'M' + String(i + 1).padStart(4, '0'),
    name,
    avatar: name[0],
    level: level.id,
    levelName: level.name,
    phone: '138' + String(Math.floor(Math.random() * 100000000)).padStart(8, '0'),
    email: `user${i+1}@opc.com`,
    joinDate: new Date(Date.now() - joinedDays * 86400000).toISOString().slice(0, 10),
    expireDate: new Date(Date.now() + (365 - joinedDays % 365) * 86400000).toISOString().slice(0, 10),
    points: Math.floor(Math.random() * 500),
    activeScore: Math.floor(Math.random() * 100),
    track: ['电商零售', '健康美业', '餐饮生活', '房产金融', '教育招聘', '工业B2B', '社交营销', '短剧动漫'][i % 8],
    status: i < 40 ? 'active' : 'expiring',
    company: i % 3 === 0 ? '一人公司' : i % 3 === 1 ? '个人' : '小团队',
    lastVisit: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString().slice(0, 10)
  };
});

// 场地（7类）
export const venues = [
  { id: 'V01', name: '会议室A', type: '会议室(4-8人)', capacity: 8, memberPrice: 50, externalPrice: 150, unit: '小时', advance: '4小时', icon: '💼', total: 4 },
  { id: 'V02', name: '会议室B', type: '会议室(4-8人)', capacity: 6, memberPrice: 50, externalPrice: 150, unit: '小时', advance: '4小时', icon: '💼', total: 4 },
  { id: 'V03', name: '路演厅', type: '路演厅/活动厅', capacity: 80, memberPrice: 200, externalPrice: 800, unit: '半天', advance: '3天', icon: '🎤', total: 1 },
  { id: 'V04', name: '培训教室', type: '教室/培训室', capacity: 30, memberPrice: 100, externalPrice: 400, unit: '半天', advance: '1天', icon: '📚', total: 2 },
  { id: 'V05', name: '摄影棚A', type: '摄影棚', capacity: 15, memberPrice: 150, externalPrice: 600, unit: '4小时', advance: '2天', icon: '🎬', total: 2 },
  { id: 'V06', name: '录音棚', type: '录音棚', capacity: 6, memberPrice: 100, externalPrice: 300, unit: '2小时', advance: '2天', icon: '🎙️', total: 1 },
  { id: 'V07', name: '剪辑工位组', type: '调色/剪辑工位', capacity: 12, memberPrice: 30, externalPrice: 80, unit: '小时', advance: '4小时', icon: '🎞️', total: 12 }
];

// 模拟预约
export const bookings = (() => {
  const list = [];
  const now = new Date();
  const purposes = ['项目拍摄', '团队会议', '客户路演', '课程培训', '直播录制', '剧本研讨', '剪辑后期', '配音录制'];
  const statuses = ['confirmed', 'pending', 'completed', 'cancelled'];
  for (let i = 0; i < 60; i++) {
    const offset = Math.floor(Math.random() * 14) - 7;
    const date = new Date(now.getTime() + offset * 86400000);
    list.push({
      id: 'B' + String(i + 1).padStart(4, '0'),
      venueId: venues[Math.floor(Math.random() * venues.length)].id,
      memberId: members[Math.floor(Math.random() * members.length)].id,
      memberName: members[Math.floor(Math.random() * members.length)].name,
      date: date.toISOString().slice(0, 10),
      startTime: ['09:00', '10:00', '13:00', '14:00', '15:00', '16:00', '19:00'][Math.floor(Math.random() * 7)],
      duration: [1, 2, 3, 4][Math.floor(Math.random() * 4)],
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      status: statuses[offset > 0 ? (Math.random() > 0.3 ? 0 : 1) : Math.random() > 0.1 ? 2 : 3],
      priority: ['🔴战略', '🟠孵化', '🟡高级', '🔵标准', '⚪外部'][Math.floor(Math.random() * 5)]
    });
  }
  return list.sort((a, b) => a.date.localeCompare(b.date));
})();

// 活动（5类）
export const eventTypes = [
  { id: 'ET1', name: '公开课/沙龙', size: '20-50', frequency: 4, budget: 1000, icon: '☕', color: '#10b981' },
  { id: 'ET2', name: '行业分享会', size: '30-80', frequency: 2, budget: 2250, icon: '🎙️', color: '#3b82f6' },
  { id: 'ET3', name: '创作训练营', size: '15-30', frequency: 1, budget: 4000, icon: '🚀', color: '#a855f7' },
  { id: 'ET4', name: '项目路演', size: '20-40', frequency: 1, budget: 1500, icon: '💎', color: '#f59e0b' },
  { id: 'ET5', name: '品牌合作活动', size: '50-100', frequency: 1, budget: 0, icon: '🏷️', color: '#ec4899' }
];

export const events = [
  { id: 'E001', name: 'AI短视频创作沙龙', type: 'ET1', date: '2026-05-08', time: '19:00-21:00', venue: 'V03', host: '李思琪', expected: 40, registered: 35, attended: 28, satisfaction: 4.5, leads: 8, converted: 3, status: 'completed', budget: 1200, actualCost: 980 },
  { id: 'E002', name: 'AI微短剧行业大咖分享', type: 'ET2', date: '2026-05-12', time: '14:00-17:00', venue: 'V03', host: '陈志强', expected: 60, registered: 58, attended: 52, satisfaction: 4.7, leads: 15, converted: 5, status: 'completed', budget: 2500, actualCost: 2300 },
  { id: 'E003', name: '21天AI短剧创作训练营', type: 'ET3', date: '2026-05-15', time: '全天', venue: 'V04', host: '王宇航', expected: 25, registered: 25, attended: 25, satisfaction: 4.8, leads: 12, converted: 10, status: 'in_progress', budget: 4500, actualCost: 4200 },
  { id: 'E004', name: 'OPC孵化项目月度路演', type: 'ET4', date: '2026-05-18', time: '14:00-18:00', venue: 'V03', host: '张明远', expected: 30, registered: 28, attended: 0, satisfaction: 0, leads: 0, converted: 0, status: 'upcoming', budget: 1500, actualCost: 0 },
  { id: 'E005', name: '字节×OPC：AI内容生态合作', type: 'ET5', date: '2026-05-22', time: '13:30-18:00', venue: 'V03', host: '刘若彤', expected: 80, registered: 75, attended: 0, satisfaction: 0, leads: 0, converted: 0, status: 'upcoming', budget: 0, actualCost: 0, sponsor: '字节跳动', sponsorRevenue: 15000 },
  { id: 'E006', name: 'AI图像生成提示词工作坊', type: 'ET1', date: '2026-05-25', time: '14:00-17:00', venue: 'V04', host: '赵一诺', expected: 30, registered: 22, attended: 0, satisfaction: 0, leads: 0, converted: 0, status: 'upcoming', budget: 800, actualCost: 0 },
  { id: 'E007', name: '电商赛道：AI数字人直播实战', type: 'ET3', date: '2026-06-01', time: '全天', venue: 'V04', host: '孙佳豪', expected: 25, registered: 18, attended: 0, satisfaction: 0, leads: 0, converted: 0, status: 'upcoming', budget: 4000, actualCost: 0 },
  { id: 'E008', name: '上戏×迭代影视×OPC联合发布会', type: 'ET2', date: '2026-06-08', time: '14:00-17:00', venue: 'V03', host: '周婉清', expected: 80, registered: 0, attended: 0, satisfaction: 0, leads: 0, converted: 0, status: 'planning', budget: 3000, actualCost: 0 }
];

// 设备台账
export const equipment = [
  { id: 'EQ001', name: '高配工作站(RTX4060/32GB)', category: '电脑', count: 15, status: 'active', purchaseDate: '2026-01-15', value: 12000, location: 'L3工坊', usage: '95%', borrower: 0, broken: 0 },
  { id: 'EQ002', name: '75寸智慧屏', category: '显示设备', count: 2, status: 'active', purchaseDate: '2026-01-10', value: 12000, location: '主教室+路演厅', usage: '78%', borrower: 0, broken: 0 },
  { id: 'EQ003', name: '投影仪(3000流明)', category: '显示设备', count: 2, status: 'active', purchaseDate: '2026-01-12', value: 4000, location: '基础教室', usage: '65%', borrower: 0, broken: 0 },
  { id: 'EQ004', name: '无线麦克风系统', category: '音视频', count: 3, status: 'active', purchaseDate: '2026-01-15', value: 2500, location: '设备库', usage: '85%', borrower: 1, broken: 0 },
  { id: 'EQ005', name: '4K摄像机', category: '音视频', count: 2, status: 'active', purchaseDate: '2026-01-20', value: 8000, location: '摄影棚A', usage: '90%', borrower: 0, broken: 0 },
  { id: 'EQ006', name: '直播推流设备(全套)', category: '音视频', count: 1, status: 'active', purchaseDate: '2026-01-25', value: 7500, location: '路演厅', usage: '60%', borrower: 0, broken: 0 },
  { id: 'EQ007', name: '企业级路由器+AP', category: '网络', count: 1, status: 'active', purchaseDate: '2026-01-08', value: 8000, location: '机房', usage: '100%', borrower: 0, broken: 0 },
  { id: 'EQ008', name: '4G/5G备用热点', category: '网络', count: 3, status: 'active', purchaseDate: '2026-01-08', value: 600, location: '前台', usage: '15%', borrower: 0, broken: 0 },
  { id: 'EQ009', name: '摄影棚灯光绿幕套装', category: '棚区设备', count: 1, status: 'active', purchaseDate: '2026-02-01', value: 22000, location: '摄影棚A', usage: '88%', borrower: 0, broken: 0 },
  { id: 'EQ010', name: '专业录音棚套装', category: '棚区设备', count: 1, status: 'active', purchaseDate: '2026-02-05', value: 15000, location: '录音棚', usage: '70%', borrower: 0, broken: 0 },
  { id: 'EQ011', name: 'AED自动除颤仪', category: '安全设备', count: 1, status: 'active', purchaseDate: '2026-01-30', value: 18000, location: '前台', usage: '0%', borrower: 0, broken: 0 },
  { id: 'EQ012', name: '消防器材套装', category: '安全设备', count: 12, status: 'active', purchaseDate: '2026-01-30', value: 200, location: '各楼层', usage: '0%', borrower: 0, broken: 0 },
  { id: 'EQ013', name: '调色显示器(广色域)', category: '后期设备', count: 4, status: 'active', purchaseDate: '2026-02-10', value: 6500, location: '剪辑工位区', usage: '82%', borrower: 0, broken: 1 }
];

// 财务数据
export const financeData = {
  // 收入分项（月）
  monthlyRevenue: [
    { type: '会员费', conservative: 26955, optimistic: 45000, current: 35200 },
    { type: '场地租赁', conservative: 31300, optimistic: 66600, current: 48500 },
    { type: '活动收入', conservative: 5000, optimistic: 20000, current: 12800 },
    { type: '品牌赞助', conservative: 5000, optimistic: 30000, current: 15000 },
    { type: '培训课程', conservative: 8000, optimistic: 25000, current: 18600 },
    { type: '孵化分成', conservative: 0, optimistic: 15000, current: 8000 },
    { type: '设备租赁', conservative: 3000, optimistic: 8000, current: 4200 },
    { type: '其他', conservative: 2000, optimistic: 5000, current: 3100 }
  ],
  // 成本分项（月）
  monthlyCost: [
    { type: '场地租金', amount: 55000, ratio: 32, type_en: 'fixed' },
    { type: '人力成本', amount: 75000, ratio: 43, type_en: 'fixed' },
    { type: '水电物业', amount: 8000, ratio: 5, type_en: 'fixed' },
    { type: '网络通信', amount: 3500, ratio: 2, type_en: 'fixed' },
    { type: '保险', amount: 2000, ratio: 1, type_en: 'fixed' },
    { type: '软件订阅', amount: 2500, ratio: 1, type_en: 'fixed' },
    { type: '活动费用', amount: 14000, ratio: 8, type_en: 'variable' },
    { type: '耗材物料', amount: 3500, ratio: 2, type_en: 'variable' },
    { type: '设备维护', amount: 3500, ratio: 2, type_en: 'variable' },
    { type: '营销推广', amount: 5000, ratio: 4, type_en: 'variable' }
  ],
  // 12个月趋势
  trend: [
    { month: '2025-06', revenue: 81255, cost: 168000, profit: -86745 },
    { month: '2025-07', revenue: 95000, cost: 168000, profit: -73000 },
    { month: '2025-08', revenue: 108000, cost: 170000, profit: -62000 },
    { month: '2025-09', revenue: 125000, cost: 170000, profit: -45000 },
    { month: '2025-10', revenue: 138000, cost: 172000, profit: -34000 },
    { month: '2025-11', revenue: 152000, cost: 172000, profit: -20000 },
    { month: '2025-12', revenue: 168000, cost: 172000, profit: -4000 },
    { month: '2026-01', revenue: 178000, cost: 172000, profit: 6000 },
    { month: '2026-02', revenue: 188000, cost: 172000, profit: 16000 },
    { month: '2026-03', revenue: 195000, cost: 172000, profit: 23000 },
    { month: '2026-04', revenue: 210000, cost: 174000, profit: 36000 },
    { month: '2026-05', revenue: 145400, cost: 172000, profit: -26600 } // 当月在途
  ],
  // 会员增长预测
  memberGrowth: [
    { month: 'M1', exp: 20, std: 10, sr: 3, inc: 1, paid: 14, revenue: 7387 },
    { month: 'M2', exp: 35, std: 15, sr: 5, inc: 2, paid: 22, revenue: 12383 },
    { month: 'M3', exp: 50, std: 22, sr: 7, inc: 3, paid: 32, revenue: 18175 },
    { month: 'M6', exp: 100, std: 35, sr: 12, inc: 5, paid: 52, revenue: 30453 },
    { month: 'M12', exp: 200, std: 55, sr: 18, inc: 8, paid: 81, revenue: 48637 }
  ]
};

// KPI 数据（按岗位）
export const kpiData = [
  {
    role: '社区总负责人',
    items: [
      { name: '月营收达成率', target: 90, actual: 87, weight: 30, unit: '%' },
      { name: '空间利用率', target: 65, actual: 72, weight: 20, unit: '%' },
      { name: '核心会员留存率', target: 80, actual: 82, weight: 20, unit: '%' },
      { name: '项目转化率', target: 15, actual: 18, weight: 15, unit: '%' },
      { name: '重大投诉率', target: 2, actual: 0.8, weight: 10, unit: '%', reverse: true },
      { name: '安全事故', target: 0, actual: 0, weight: 5, unit: '次', reverse: true }
    ]
  },
  {
    role: '空间运营主管',
    items: [
      { name: '预约满足率', target: 90, actual: 93, weight: 25, unit: '%' },
      { name: '场地冲突率', target: 3, actual: 1.5, weight: 20, unit: '%', reverse: true },
      { name: '48小时修复率', target: 95, actual: 96, weight: 20, unit: '%' },
      { name: '违规使用率', target: 5, actual: 2.8, weight: 15, unit: '%', reverse: true },
      { name: '巡检完成率', target: 100, actual: 100, weight: 20, unit: '%' }
    ]
  },
  {
    role: '会员运营经理',
    items: [
      { name: '月新增会员', target: 15, actual: 18, weight: 25, unit: '人' },
      { name: '续费率', target: 70, actual: 73, weight: 25, unit: '%' },
      { name: '月活跃率', target: 60, actual: 64, weight: 20, unit: '%' },
      { name: '满意度', target: 4.0, actual: 4.3, weight: 15, unit: '/5.0' },
      { name: '重点会员转化率', target: 20, actual: 22, weight: 15, unit: '%' }
    ]
  },
  {
    role: '活动运营经理',
    items: [
      { name: '到场率', target: 70, actual: 78, weight: 25, unit: '%' },
      { name: '活动满意度', target: 4.2, actual: 4.6, weight: 20, unit: '/5.0' },
      { name: '线索转化率', target: 10, actual: 14, weight: 25, unit: '%' },
      { name: '复盘完成率', target: 100, actual: 100, weight: 15, unit: '%' },
      { name: '传播曝光量', target: 50000, actual: 68000, weight: 15, unit: '次' }
    ]
  },
  {
    role: '前台/客服',
    items: [
      { name: '接待满意度', target: 4.5, actual: 4.7, weight: 25, unit: '/5.0' },
      { name: '响应时效', target: 3, actual: 1.8, weight: 25, unit: '分钟', reverse: true },
      { name: '投诉转办时效', target: 2, actual: 1.2, weight: 20, unit: '小时', reverse: true },
      { name: '差错率', target: 1, actual: 0.3, weight: 15, unit: '%', reverse: true },
      { name: '登记准确率', target: 98, actual: 99.2, weight: 15, unit: '%' }
    ]
  },
  {
    role: '技术支持',
    items: [
      { name: '设备故障率', target: 5, actual: 3.2, weight: 25, unit: '%', reverse: true },
      { name: '报修响应时效', target: 30, actual: 18, weight: 25, unit: '分钟', reverse: true },
      { name: '修复时效', target: 2, actual: 1.5, weight: 20, unit: '小时', reverse: true },
      { name: '盘点准确率', target: 100, actual: 100, weight: 15, unit: '%' },
      { name: '活动技术事故率', target: 0, actual: 0, weight: 15, unit: '次', reverse: true }
    ]
  }
];

// SOP 任务（每日/每周/每月）
export const sopTasks = {
  daily: {
    morning: [
      { time: 'T-60', actor: '前台', action: '到岗，开启照明、空调、电脑、管理系统', standard: '所有系统正常启动', status: 'done' },
      { time: 'T-55', actor: '前台', action: '检查门禁、监控、网络、电话、广播', standard: '全部正常，异常立即报修', status: 'done' },
      { time: 'T-50', actor: '空间运营', action: '巡查办公区、会议区、棚区、活动区', standard: '无垃圾、无安全隐患、消防通道通畅', status: 'done' },
      { time: 'T-40', actor: '安保', action: '检查消防设施', standard: '全部在有效期内且可用', status: 'done' },
      { time: 'T-30', actor: '空间运营', action: '核对当日预约表', standard: '预约场地已准备就绪', status: 'in_progress' },
      { time: 'T-20', actor: '前台', action: '准备当日所需物料', standard: '物料齐全', status: 'pending' },
      { time: 'T-10', actor: '全员', action: '在运营群汇报准备状态', standard: '所有岗位确认 Ready', status: 'pending' }
    ],
    daytime: [
      { actor: '前台', frequency: '持续', action: '访客接待、电话、咨询、快递', tool: '来访登记本+飞书表格' },
      { actor: '空间运营', frequency: '每2小时', action: '巡场（卫生/秩序/设备/噪音）', tool: '飞书打卡点' },
      { actor: '技术支持', frequency: '按需', action: '5分钟内响应故障，活动前30分钟测试', tool: '报修群' },
      { actor: '会员运营', frequency: '持续', action: '社群消息回复、新会员接待、资源对接', tool: '企微/飞书群' }
    ],
    closing: [
      { time: 'T-30', actor: '前台', action: '广播闭馆提醒', status: 'pending' },
      { time: 'T-15', actor: '空间运营', action: '清点人员，确认无滞留', status: 'pending' },
      { time: 'T-10', actor: '技术', action: '归还设备入库，关闭专业设备', status: 'pending' },
      { time: 'T-5', actor: '安保', action: '关闭空调照明，锁门', status: 'pending' },
      { time: 'T+0', actor: '空间运营', action: '发送日报到运营群', status: 'pending' }
    ]
  },
  weekly: [
    { day: '周一 9:00', meeting: '周计划会', participants: '全员', duration: '30分钟', output: '本周任务清单', status: 'done' },
    { day: '周三 14:00', meeting: '运营巡检会', participants: '主管级', duration: '20分钟', output: '整改清单', status: 'done' },
    { day: '周五 16:00', meeting: '周复盘会', participants: '全员', duration: '30分钟', output: '周报', status: 'pending' }
  ],
  monthly: [
    { date: '月初(1-3日)', task: '发布月度计划，核算上月收支', owner: '总负责人', output: '月度计划表+财务报表', status: 'done' },
    { date: '月中(15日)', task: '会员满意度调研，设备盘点', owner: '会员运营+技术', output: '调研报告+盘点表', status: 'in_progress' },
    { date: '月末(最后周五)', task: '经营复盘会，制定整改清单', owner: '全员', output: '月度经营复盘报告', status: 'pending' }
  ]
};

// 突发情况预案
export const emergencyPlans = [
  { id: 'EP1', type: '医疗突发', icon: '🚑', priority: '🔴 最高', steps: ['就近通知前台/主管', '判断伤者状态，必要时拨120', '疏散围观者', '禁止随意搬动重伤者', '联系紧急联系人', '填写异常事件记录表'] },
  { id: 'EP2', type: '火灾/烟雾', icon: '🔥', priority: '🔴 最高', steps: ['立即报警119', '切断非消防电源', '组织有序撤离（禁乘电梯）', '小型火情用灭火器扑救', '到指定集合点清点人数', '等待消防专业处理'] },
  { id: 'EP3', type: '停电断网', icon: '⚡', priority: '🟠 高', steps: ['广播说明情况', '技术排查', '暂停高风险设备', '保护数据存储设备', '启用4G/5G热点'] },
  { id: 'EP4', type: '设备损坏', icon: '🔧', priority: '🟡 中', steps: ['立即停止使用', '拍照记录', '调取监控确认人为因素', '启用备用设备', '评估维修+赔付', '更新设备台账'] },
  { id: 'EP5', type: '人员冲突', icon: '⚠️', priority: '🟡 中', steps: ['第一时间分开双方', '转移至会客区单独沟通', '调取监控/记录', '视情况警告或报警', '书面记录存档'] },
  { id: 'EP6', type: '内容/舆情风险', icon: '📢', priority: '🔴 最高', steps: ['暂停相关内容传播', '通知总负责人', '调取相关资料内部会商', '统一对外口径', '形成整改方案'] },
  { id: 'EP7', type: '重要嘉宾接待异常', icon: '🎩', priority: '🟠 高', steps: ['指定专人对接', '优先保障休息区', '现场问题最高优先级', '事后发送致歉函'] }
];

// 工单/通知
export const tickets = [
  { id: 'T001', type: '报修', title: '调色显示器#3 偏色严重', submitter: '李思琪', priority: 'high', status: 'in_progress', createdAt: '2026-05-02 14:22', assignee: '技术支持' },
  { id: 'T002', type: '投诉', title: '会议室B 空调不制冷', submitter: '陈志强', priority: 'medium', status: 'resolved', createdAt: '2026-05-02 10:15', assignee: '空间运营' },
  { id: 'T003', type: '咨询', title: '孵化会员升级流程', submitter: '王宇航', priority: 'low', status: 'resolved', createdAt: '2026-05-01 16:40', assignee: '会员运营' },
  { id: 'T004', type: '报修', title: '路演厅麦克风电池告急', submitter: '前台', priority: 'medium', status: 'pending', createdAt: '2026-05-03 09:30', assignee: '技术支持' },
  { id: 'T005', type: '违规', title: '会员M0023 未归还摄像机超24小时', submitter: '设备库', priority: 'high', status: 'in_progress', createdAt: '2026-05-03 08:00', assignee: '会员运营' }
];
