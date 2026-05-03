// AI 智能体工坊
import { html } from '../utils.js';

export function renderAILab(root) {
  const tracks = window.OPC.data.tracks;
  const state = {
    name: '我的电商客服小助手',
    industry: '电商零售',
    type: '智能客服',
    prompt: '',
    knowledge: [],
    temperature: 0.7,
    deployed: false,
    messages: [{ role: 'ai', text: '👋 你好！我是你的智能体测试对话窗口。请先在左侧配置面板完成设置，然后点击"一键部署"开始对话测试。' }]
  };

  // 行业模板
  const industryTemplates = {
    '电商零售': { prompt: '你是一名【品牌名】电商客服，请基于知识库回答用户问题：1. 商品咨询（参考产品手册）2. 订单/物流查询（调用订单系统API）3. 退换货政策（参考售后政策）4. 优惠活动（参考最新促销）。语气亲切专业，回答简洁准确，不确定的问题转人工。', kb: ['产品手册.pdf', '售后政策.pdf', '促销活动.docx'] },
    '健康美业': { prompt: '你是一名美业顾问，严格遵守"三色合规词库"：禁用医疗术语、绝对化表述、虚假承诺。回答时：1. 询问肤质/需求 2. 推荐产品（基于知识库）3. 说明使用方法 4. 注意事项免责。', kb: ['产品配方表.xlsx', '合规词库.docx', '使用手册.pdf'] },
    '餐饮生活': { prompt: '你是一家【餐厅名】智能客服，处理：1. 预订（确认人数+时间+特殊需求）2. 推荐菜品（基于今日菜单）3. 优惠活动 4. 评价处理。', kb: ['今日菜单.json', '门店信息.docx', '会员权益.pdf'] },
    '房产金融': { prompt: '你是一名持证房产顾问，遵守金融合规：1. 通过 SPIN 提问挖掘需求 2. 推荐楼盘（基于楼盘库）3. 贷款方案测算 4. 风险提示必填。', kb: ['楼盘库.xlsx', '贷款政策.pdf', '合规话术.docx'] },
    '教育招聘': { prompt: '你是教育顾问：1. 兴趣激发 2. 痛点放大 3. 课程匹配（基于课程库）4. 试听预约 5. 限时促单。语气真诚不强推。', kb: ['课程目录.xlsx', '学员案例.docx', '试听安排.json'] },
    '工业B2B': { prompt: 'You are a professional B2B sales assistant. Reply in formal English. Cover: 1. Product specs 2. MOQ/Pricing tiers 3. Certifications 4. Lead time 5. Payment terms.', kb: ['Product Catalog.pdf', 'Certifications.zip', 'Pricing Tiers.xlsx'] },
    '社交营销': { prompt: '你是社群运营助手：1. 欢迎新成员 2. 活动报名引导 3. 内容分享激励 4. 推荐裂变机制。', kb: ['活动日历.xlsx', '裂变话术.docx', '社群守则.pdf'] },
    '短剧动漫创作': { prompt: '你是 AI 短剧/漫剧创作顾问：1. 剧本创作建议（前3秒钩子+反转+悬念）2. 角色设定 3. 渲染参数建议（Kling/Vidu/Midjourney）4. 数据分析（爆款拆解）。', kb: ['爆款剧本库.docx', '角色设定模板.json', 'AI工具参数表.xlsx'] },
    'OPC社区': { prompt: '你是 OPC 一人公司战略顾问：1. 定位诊断 2. 入驻规划（体验/标准/高级/孵化）3. 变现方案（七大收入路径）4. OPC认证指引（基础/专业/大师）。', kb: ['OPC社区战略方案.pdf', '七大收入解析.docx', 'OPC认证体系.pdf'] }
  };

  const draw = () => {
    document.getElementById('cfg-prompt').value = state.prompt;
    document.getElementById('cfg-name').value = state.name;
    document.getElementById('temp-val').textContent = state.temperature.toFixed(1);
    const kb = document.getElementById('cfg-kb');
    if (kb) kb.innerHTML = state.knowledge.map(k => `<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-hover);border-radius:6px;margin-bottom:4px;font-size:12.5px;"><i class="fas fa-file-alt" style="color:var(--primary);"></i> ${k}</div>`).join('') || '<div style="font-size:12px;color:var(--text-muted);">未选择知识库（选择行业后自动填充）</div>';

    document.getElementById('deploy-status').innerHTML = state.deployed
      ? '<span class="tag tag-success"><span class="status-dot active"></span>运行中</span>'
      : '<span class="tag"><span class="status-dot pending"></span>未部署</span>';

    const ca = document.getElementById('chat-area');
    if (ca) {
      ca.innerHTML = state.messages.map(m => `
        <div class="chat-msg ${m.role === 'user' ? 'user' : ''}">
          <div class="chat-avatar">${m.role === 'user' ? 'U' : '🤖'}</div>
          <div class="chat-bubble">${m.text}</div>
        </div>`).join('');
      ca.scrollTop = ca.scrollHeight;
    }
  };

  // 应用行业模板
  const applyTemplate = () => {
    const tpl = industryTemplates[state.industry];
    if (tpl) {
      state.prompt = tpl.prompt;
      state.knowledge = tpl.kb;
      draw();
    }
  };

  // 部署
  const deploy = async () => {
    if (!state.prompt.trim()) {
      OPC.toast('请先填写系统提示词', 'error'); return;
    }
    state.deployed = true;
    OPC.state.deployedAgents.push({ name: state.name, industry: state.industry, time: new Date().toISOString() });
    OPC.save();
    state.messages = [{ role: 'ai', text: `🎉 智能体「${state.name}」部署成功！\n\n• 行业：${state.industry}\n• 类型：${state.type}\n• 知识库：${state.knowledge.length} 个文档\n• Temperature：${state.temperature}\n\n现在可以开始对话测试了。` }];
    draw();
    // 调用预留接口
    OPC.api('/ai/agent/deploy', 'POST', state);
    OPC.toast('智能体部署成功', 'success');
  };

  // 发送消息
  const send = async (text) => {
    if (!state.deployed) { OPC.toast('请先部署智能体', 'error'); return; }
    if (!text || !text.trim()) return;
    state.messages.push({ role: 'user', text });
    draw();
    document.getElementById('msg-input').value = '';
    const reply = await OPC.api('/ai/chat', 'POST', { agent: state, message: text });
    const answer = (reply && reply.answer) || mockReply(state, text);
    setTimeout(() => {
      state.messages.push({ role: 'ai', text: answer });
      draw();
    }, 500);
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🤖 AI 智能体工坊</div>
        <div class="page-subtitle">在平台内完成智能体搭建全流程：配置 → 部署 → 测试 → 上线</div>
      </div>
      <div>
        <span class="tag tag-info" id="deploy-status"><span class="status-dot pending"></span>未部署</span>
      </div>
    </div>

    <div class="aibench">
      <!-- 左：配置面板 -->
      <div class="aibench-panel">
        <h3 style="font-size:14px;margin-bottom:14px;"><i class="fas fa-sliders-h"></i> 智能体配置</h3>

        <div class="form-group">
          <label class="label">智能体名称</label>
          <input class="input" id="cfg-name" oninput="window._labOnName(this.value)">
        </div>

        <div class="form-group">
          <label class="label">行业场景</label>
          <select class="select" id="cfg-industry" onchange="window._labOnIndustry(this.value)">
            ${Object.keys(industryTemplates).map(i => `<option ${state.industry === i ? 'selected' : ''}>${i}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="label">智能体类型</label>
          <select class="select" id="cfg-type" onchange="window._labOnType(this.value)">
            <option>智能客服</option><option>销售助手</option><option>内容生产</option><option>数据分析</option><option>个性化推荐</option>
          </select>
        </div>

        <div class="form-group">
          <label class="label">系统提示词 (System Prompt)</label>
          <textarea class="textarea" id="cfg-prompt" style="min-height:140px;font-size:12.5px;" oninput="window._labOnPrompt(this.value)" placeholder="选择行业后自动填充模板..."></textarea>
        </div>

        <div class="form-group">
          <label class="label">知识库</label>
          <div id="cfg-kb"></div>
        </div>

        <div class="form-group">
          <label class="label">Temperature: <span id="temp-val">0.7</span></label>
          <input type="range" min="0" max="1" step="0.1" value="0.7" style="width:100%;" oninput="window._labOnTemp(this.value)">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);"><span>严谨(0)</span><span>创意(1)</span></div>
        </div>

        <button class="btn btn-primary" style="width:100%;" onclick="window._labDeploy()">
          <i class="fas fa-rocket"></i> 一键部署
        </button>
      </div>

      <!-- 右：对话测试 -->
      <div class="aibench-panel" style="display:flex;flex-direction:column;padding:0;">
        <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:14px;"><i class="fas fa-comments"></i> 对话测试</h3>
          <button class="btn btn-sm" onclick="window._labClearMsg()"><i class="fas fa-trash"></i> 清空</button>
        </div>

        <div class="chat-area" id="chat-area"></div>

        <div style="padding:8px 14px;display:flex;gap:6px;flex-wrap:wrap;">
          ${['打招呼', '了解产品', '退货咨询', '优惠活动'].map(q => `<button class="btn btn-sm" onclick="window._labSend('${q}')">${q}</button>`).join('')}
        </div>

        <div class="chat-input-bar">
          <input id="msg-input" placeholder="输入消息测试..." onkeypress="if(event.key==='Enter')window._labSend(this.value)">
          <button class="btn btn-primary" onclick="window._labSend(document.getElementById('msg-input').value)"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;

  // 暴露事件
  window._labOnName = v => state.name = v;
  window._labOnIndustry = v => { state.industry = v; applyTemplate(); };
  window._labOnType = v => state.type = v;
  window._labOnPrompt = v => state.prompt = v;
  window._labOnTemp = v => { state.temperature = parseFloat(v); document.getElementById('temp-val').textContent = (+v).toFixed(1); };
  window._labDeploy = deploy;
  window._labSend = send;
  window._labClearMsg = () => { state.messages = state.messages.slice(0, 1); draw(); };

  applyTemplate();
  draw();
}

function mockReply(state, text) {
  const t = text;
  const replies = {
    '电商零售': {
      '打招呼': '您好，欢迎光临本店！🛍️ 今天想看护肤品、家居好物，还是限时秒杀专区？',
      '了解产品': '我们今日热销 Top3：①夏日清爽护肤套装（¥299，原价¥499）②智能厨房四件套（¥199）③国潮帆布包（¥89）。需要我详细介绍哪一款？',
      '退货咨询': '本店支持 7 天无理由退换。请提供订单号，我帮您查询：①未拆封：包邮退换 ②已使用：影响二次销售不退；质量问题：包邮退换+赔付优惠券。',
      '优惠活动': '本周大促中：满 200-30，店铺会员再 9.5 折，加购 ¥9.9 抢运费险。再送您一张新人 ¥20 无门槛券~'
    },
    '健康美业': {
      '打招呼': '您好~ 很高兴为您服务 💄 请问您当前主要的肌肤困扰是什么呢？我会为您匹配最合适的护理方案。',
      '了解产品': '推荐我们的明星组合：① 烟酰胺亮肌精华 ② 玻尿酸保湿水。坚持使用 28 天可见改善肤质（注：效果因人而异，本品为护肤品非药品，如有不适请停用）。',
      '退货咨询': '已开封产品出于卫生考虑暂不支持退换；如有过敏不适，请立即停用并就医，凭医院诊断我们将协助处理。',
      '优惠活动': '会员专享：满 ¥499 送同款 30ml 旅行装 + 1 次到店深层护理（价值 ¥299）。'
    },
    '餐饮生活': {
      '打招呼': '您好，欢迎光临！🍽️ 是想预订位置、查看今日菜单，还是了解会员活动呢？',
      '了解产品': '今日招牌：①招牌酸菜鱼（¥68）②黑松露牛肉饭（¥58）③茉莉百香果茶（¥18）。两人套餐立减 ¥30。',
      '退货咨询': '如菜品有质量问题，请告知桌号，我们立即重做或全额退款。感谢您的反馈！',
      '优惠活动': '工作日午市 8.5 折，会员日（每月15日）全单 7.8 折，团餐 6 人以上送果盘。'
    },
    '房产金融': {
      '打招呼': '您好，我是您的专属房产顾问 🏙️ 请问您是首次置业、改善居住，还是投资需求呢？',
      '了解产品': '为您推荐 3 个适配楼盘：①浦东金桥（地铁+学区，¥6.8万/㎡）②虹桥商务区（升值潜力大）③松江大学城（性价比高）。需要详细对比吗？',
      '退货咨询': '房产交易已签认购书：30 天内可退（扣 1% 手续费）；签订正式合同后退款需协商。请提供合同号查询。',
      '优惠活动': '本月开盘特惠：①认购送 5 万家电基金 ②全款 98 折 ③老带新双方各得 5000 元红包。⚠️ 房产投资有风险，请理性决策。'
    },
    '教育招聘': {
      '打招呼': '您好~ 🎓 我是 AI 学习顾问。请问您是想提升职业技能、备考证书，还是为孩子规划课程？',
      '了解产品': '推荐 3 门热门课程：①AI 编程零基础（¥1299）②AI 短视频实战（¥2499）③Prompt 工程师认证（¥2999）。可免费试听 2 节~',
      '退货咨询': '课程开通后 7 天内、未学习超过 20% 可全额退款，已学习超过 20% 按比例退款。',
      '优惠活动': '老学员推荐新学员：双方各得 ¥200 学费返还 + 一对一规划 30 分钟。'
    },
    '工业B2B': {
      '打招呼': 'Hello! Welcome to our company. May I know your specific product interest and target market?',
      '了解产品': 'Our flagship products: ① Industrial sensors (MOQ: 500pcs, $12-18/unit) ② Custom modules (MOQ: 100pcs). All with CE/FCC/RoHS certifications.',
      '退货咨询': 'Quality issues: full replacement within 30 days. Please send photos + batch number for verification.',
      '优惠活动': 'Promotion: Order >5000pcs gets 8% off + free shipping to main port. Extended 18-month warranty available.'
    },
    '社交营销': {
      '打招呼': '欢迎入群！🎉 群规：①禁止广告 ②每日早安打卡 ③参与活动有积分奖励。点击菜单查看本周活动~',
      '了解产品': '本周精选活动：①周三晚 8 点直播分享 ②周五裂变拼团 ③周日大咖连麦。参与即送 100 积分！',
      '退货咨询': '社群权益不支持退款，但您可申请暂停 1 个月。继续参与可累积积分兑换会员服务。',
      '优惠活动': '裂变福利：邀 3 人入群享 7 折优惠，邀 10 人解锁 VIP 群（含一对一辅导）。'
    },
    '短剧动漫创作': {
      '打招呼': '🎬 欢迎来到 AI 短剧创作工坊！请问您是想：①生成剧本 ②角色设定 ③渲染参数 ④数据分析？',
      '了解产品': '本周爆款剧本模板：①霸总赘婿（钩子率 92%）②穿越逆袭（完播率 78%）③重生复仇（付费率 28%）。需要哪一款？',
      '退货咨询': 'AI 生成内容版权归创作者所有；如对生成质量不满意可重新生成（每天 5 次免费）。',
      '优惠活动': 'OPC 短剧孵化营开营：3 个月陪跑 + 全平台分发（抖音/快手）+ 收益 7:3 分成。'
    },
    'OPC社区': {
      '打招呼': '您好！👑 我是 OPC 一人公司战略顾问。请问您是创作者、企业管理者，还是创业者？',
      '了解产品': 'OPC 社区四大权益：①8大行业赛道课程 ②共享空间+棚区 ③项目孵化陪跑 ④七大变现路径。会员等级：体验/标准 ¥299/高级 ¥799/孵化 ¥1999。',
      '退货咨询': '会员费支持开通后 7 天无理由全额退款，孵化项目按合同约定。',
      '优惠活动': '入驻特惠：年付享 7 折（标准 ¥2,512/年），团报 3 人享 85 折，老会员推荐新会员各得 ¥200。'
    }
  };
  const ind = replies[state.industry] || replies['电商零售'];
  return ind[t] || `(${state.industry} · Temperature ${state.temperature}) 我已收到您的问题"${t}"。基于本智能体的知识库（${state.knowledge.length} 个文档），结合系统提示词规则，给出如下回答：\n\n这是一个示例回复，实际生产环境会调用真实 LLM API（OpenAI/扣子/Dify 等）。后端可在 /api/ai/chat 接入真实模型。`;
}
