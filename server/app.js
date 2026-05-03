/**
 * OPC 管理平台 - 轻量级 Express 服务器
 * 1) 静态托管 /public
 * 2) 提供 Mock API（GET 优先，写操作模拟成功）
 * 3) 使用单文件 JSON 数据库 (db.json) - 接近 lowdb 的轻量方案
 *    - 体积小、零依赖、读写极快，可作为最轻量的 "AI 数据库"
 *    - 后续接入真实 AI 服务时，只需替换 /api/ai/* 路由实现
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'db.json');
const PROVIDERS_PATH = path.join(__dirname, 'providers.json');

app.use(cors());
app.use(express.json({ limit: '4mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// ============== AI Provider 配置（API Key 管理）==============
// 使用独立 providers.json，避免和业务数据混在一起
// API Key 在响应时仅返回脱敏字符串，原值仅在服务端使用
function loadProviders() {
  try {
    if (!fs.existsSync(PROVIDERS_PATH)) {
      const init = {
        defaultProvider: 'openai',
        providers: [
          { id: 'openai', name: 'OpenAI / Compatible', baseUrl: 'https://api.openai.com/v1', apiKey: '', model: 'gpt-4o-mini', enabled: false, format: 'openai', notes: 'ChatGPT 官方/中转' },
          { id: 'anthropic', name: 'Anthropic Claude', baseUrl: 'https://api.anthropic.com/v1', apiKey: '', model: 'claude-3-5-sonnet-20241022', enabled: false, format: 'anthropic', notes: 'Claude 系列' },
          { id: 'deepseek', name: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', apiKey: '', model: 'deepseek-chat', enabled: false, format: 'openai', notes: '国产高性价比' },
          { id: 'qwen', name: '通义千问', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', apiKey: '', model: 'qwen-plus', enabled: false, format: 'openai', notes: '阿里云灵积' },
          { id: 'moonshot', name: 'Kimi (Moonshot)', baseUrl: 'https://api.moonshot.cn/v1', apiKey: '', model: 'moonshot-v1-32k', enabled: false, format: 'openai', notes: '月之暗面 Kimi' },
          { id: 'zhipu', name: '智谱 GLM', baseUrl: 'https://open.bigmodel.cn/api/paas/v4', apiKey: '', model: 'glm-4-flash', enabled: false, format: 'openai', notes: 'GLM-4 系列' },
          { id: 'doubao', name: '豆包 (火山方舟)', baseUrl: 'https://ark.cn-beijing.volces.com/api/v3', apiKey: '', model: '', enabled: false, format: 'openai', notes: '需填 endpoint id 作为 model' },
          { id: 'gemini', name: 'Google Gemini', baseUrl: 'https://generativelanguage.googleapis.com/v1beta', apiKey: '', model: 'gemini-1.5-flash', enabled: false, format: 'gemini', notes: 'Google AI Studio' },
          { id: 'custom', name: '自定义 (OpenAI兼容)', baseUrl: '', apiKey: '', model: '', enabled: false, format: 'openai', notes: '任意 OpenAI 兼容端点' }
        ]
      };
      fs.writeFileSync(PROVIDERS_PATH, JSON.stringify(init, null, 2));
      return init;
    }
    return JSON.parse(fs.readFileSync(PROVIDERS_PATH, 'utf-8'));
  } catch (e) {
    console.error('[Providers] load error', e);
    return { defaultProvider: 'openai', providers: [] };
  }
}
function saveProviders(p) {
  try { fs.writeFileSync(PROVIDERS_PATH, JSON.stringify(p, null, 2)); }
  catch (e) { console.error('[Providers] save error', e); }
}
function maskKey(k) {
  if (!k) return '';
  if (k.length <= 10) return '****';
  return k.slice(0, 6) + '****' + k.slice(-4);
}
function sanitizeProviders(p) {
  return {
    defaultProvider: p.defaultProvider,
    providers: p.providers.map(x => ({ ...x, apiKey: maskKey(x.apiKey), hasKey: !!x.apiKey }))
  };
}
let providers = loadProviders();

// ============== 轻量级 JSON DB ==============
function loadDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const init = {
        agents: [],            // AI 智能体配置
        promptHistory: [],     // 提示词执行历史
        notes: {},             // 课程笔记
        completedLessons: [],  // 已完成课程
        bookings: [],          // 用户新增预约
        tickets: [],           // 工单
        events: [],            // 用户新增活动
        knowledge: [],         // 知识库片段（向量近似 - 仅占位）
        meta: { version: '2.0.0', createdAt: new Date().toISOString() }
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(init, null, 2));
      return init;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (e) {
    console.error('[DB] load error', e);
    return { agents: [], promptHistory: [], notes: {}, completedLessons: [], bookings: [], tickets: [], events: [], knowledge: [], meta: {} };
  }
}
function saveDB(db) {
  try { fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); }
  catch (e) { console.error('[DB] save error', e); }
}
let db = loadDB();

const ok = (data) => ({ success: true, data });
const fail = (msg) => ({ success: false, message: msg });

// ============== 课程相关 ==============
app.get('/api/courses', (req, res) => res.json(ok({ message: '使用前端 mock 数据' })));
app.get('/api/lessons/completed', (req, res) => res.json(ok(db.completedLessons || [])));
app.post('/api/lessons/:id/complete', (req, res) => {
  const id = req.params.id;
  if (!db.completedLessons.includes(id)) db.completedLessons.push(id);
  saveDB(db);
  res.json(ok({ id, completed: true }));
});
app.get('/api/notes/:lessonId', (req, res) => res.json(ok(db.notes[req.params.lessonId] || '')));
app.post('/api/notes/:lessonId', (req, res) => {
  db.notes[req.params.lessonId] = req.body.content || '';
  saveDB(db);
  res.json(ok({ saved: true }));
});

// ============== AI 智能体（预留 AI 后端配置接口）==============
app.get('/api/ai/agents', (req, res) => res.json(ok(db.agents)));
app.post('/api/ai/agents', (req, res) => {
  const agent = {
    id: 'AGT' + Date.now(),
    name: req.body.name || '未命名智能体',
    industry: req.body.industry || 'general',
    type: req.body.type || 'chat',
    systemPrompt: req.body.systemPrompt || '',
    knowledge: req.body.knowledge || [],
    temperature: req.body.temperature ?? 0.7,
    deployedAt: new Date().toISOString(),
    status: 'deployed'
  };
  db.agents.push(agent);
  saveDB(db);
  res.json(ok(agent));
});
app.delete('/api/ai/agents/:id', (req, res) => {
  db.agents = db.agents.filter(a => a.id !== req.params.id);
  saveDB(db);
  res.json(ok({ deleted: true }));
});

// ============== AI Provider 管理 API ==============
// 列出所有 Provider（API Key 已脱敏）
app.get('/api/ai/providers', (req, res) => res.json(ok(sanitizeProviders(providers))));

// 更新某个 Provider 配置（baseUrl / apiKey / model / enabled）
app.put('/api/ai/providers/:id', (req, res) => {
  const p = providers.providers.find(x => x.id === req.params.id);
  if (!p) return res.json(fail('provider not found'));
  const { baseUrl, apiKey, model, enabled, name, notes } = req.body || {};
  if (typeof baseUrl === 'string') p.baseUrl = baseUrl.trim();
  if (typeof model === 'string') p.model = model.trim();
  if (typeof enabled === 'boolean') p.enabled = enabled;
  if (typeof name === 'string') p.name = name.trim();
  if (typeof notes === 'string') p.notes = notes;
  // 仅当传入非空且不是脱敏字符串时才更新 key
  if (typeof apiKey === 'string' && apiKey && !apiKey.includes('****')) p.apiKey = apiKey.trim();
  saveProviders(providers);
  res.json(ok(sanitizeProviders(providers)));
});

// 设置默认 Provider
app.post('/api/ai/providers/default', (req, res) => {
  const { id } = req.body || {};
  if (!providers.providers.some(p => p.id === id)) return res.json(fail('provider not found'));
  providers.defaultProvider = id;
  saveProviders(providers);
  res.json(ok(sanitizeProviders(providers)));
});

// 测试某个 Provider 连通性
app.post('/api/ai/providers/:id/test', async (req, res) => {
  const p = providers.providers.find(x => x.id === req.params.id);
  if (!p) return res.json(fail('provider not found'));
  if (!p.apiKey) return res.json(fail('请先填写 API Key'));
  try {
    const t0 = Date.now();
    const result = await callProvider(p, [{ role: 'user', content: '请用一句话介绍你自己（不超过20字）' }], { temperature: 0.3, max_tokens: 64 });
    res.json(ok({ ok: true, ms: Date.now() - t0, sample: result.content, model: p.model }));
  } catch (e) {
    res.json(fail('调用失败: ' + (e.message || e)));
  }
});

// ============== 真实 AI 调用核心 ==============
async function callProvider(p, messages, opts = {}) {
  const fmt = p.format || 'openai';
  const temperature = opts.temperature ?? 0.7;
  const maxTokens = opts.max_tokens ?? 2048;

  if (fmt === 'openai') {
    const url = (p.baseUrl || '').replace(/\/+$/, '') + '/chat/completions';
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + p.apiKey },
      body: JSON.stringify({ model: p.model, messages, temperature, max_tokens: maxTokens, stream: false })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error?.message || JSON.stringify(data).slice(0, 300));
    const content = data?.choices?.[0]?.message?.content || '';
    return { content, raw: data, tokens: data?.usage?.total_tokens };
  }

  if (fmt === 'anthropic') {
    const url = (p.baseUrl || '').replace(/\/+$/, '') + '/messages';
    // Anthropic: system 单独字段
    const sys = messages.find(m => m.role === 'system')?.content || '';
    const msgs = messages.filter(m => m.role !== 'system');
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': p.apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: p.model, system: sys || undefined, messages: msgs, max_tokens: maxTokens, temperature })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error?.message || JSON.stringify(data).slice(0, 300));
    const content = (data?.content || []).map(c => c.text || '').join('\n');
    return { content, raw: data, tokens: (data?.usage?.input_tokens || 0) + (data?.usage?.output_tokens || 0) };
  }

  if (fmt === 'gemini') {
    const url = `${(p.baseUrl || '').replace(/\/+$/, '')}/models/${p.model}:generateContent?key=${encodeURIComponent(p.apiKey)}`;
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : (m.role === 'system' ? 'user' : m.role),
      parts: [{ text: m.content }]
    }));
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig: { temperature, maxOutputTokens: maxTokens } })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error?.message || JSON.stringify(data).slice(0, 300));
    const content = (data?.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('\n');
    return { content, raw: data };
  }

  throw new Error('未知 provider 格式: ' + fmt);
}

// 选择 provider：优先 req.body.providerId，否则用 default 且 enabled
function pickProvider(preferId) {
  if (preferId) {
    const p = providers.providers.find(x => x.id === preferId && x.enabled && x.apiKey);
    if (p) return p;
  }
  const def = providers.providers.find(x => x.id === providers.defaultProvider && x.enabled && x.apiKey);
  if (def) return def;
  // fallback: 任意已启用且有 key 的
  return providers.providers.find(x => x.enabled && x.apiKey) || null;
}

// 行业系统提示（兜底/未配置 AI 时使用）
const INDUSTRY_SYS = {
  ecommerce: '你是 OPC 学院电商赛道资深教练，擅长选品、视觉、详情页、客服 Bot、直播带货。回答需结构化、有数字、给具体工具组合。',
  education: '你是 OPC 学院教育赛道资深教练，擅长 AI 备课、出题、学情分析、答疑 Bot。回答需结构化、贴近教学场景。',
  legal: '你是 OPC 学院法律赛道资深教练，擅长判例检索、合同审查、法务自动化。回答需引用法条思路、标注风险等级。',
  finance: '你是 OPC 学院金融赛道资深教练，擅长财报分析、量化策略、风控合规。回答需有数据、有方法论。',
  general: '你是 OPC 学院 AI 教练，专为"一人公司"创业者服务。回答需结构化(分点)、有具体工具、有可执行步骤、有金句收尾。'
};

// AI 对话：真实模型调用，配置缺失时回退到 mock
app.post('/api/ai/chat', async (req, res) => {
  const { agentId, message, industry, providerId, history, systemPrompt, lessonContext } = req.body || {};
  const p = pickProvider(providerId);

  // 构造 system prompt：优先使用前端传入的（含课时上下文/工具说明），否则按行业兜底
  const sys = systemPrompt || INDUSTRY_SYS[industry] || INDUSTRY_SYS.general;
  const messages = [{ role: 'system', content: sys }];
  if (lessonContext) {
    messages.push({ role: 'system', content: `当前学习上下文：${lessonContext}` });
  }
  if (Array.isArray(history)) {
    history.slice(-10).forEach(h => {
      if (h && h.role && h.content) messages.push({ role: h.role, content: h.content });
    });
  }
  messages.push({ role: 'user', content: message || '' });

  if (!p) {
    // 未配置真实模型，回退 mock
    const mockResponses = {
      ecommerce: `【电商场景·Mock】基于您的问题"${message}"，建议：\n1. 选品：AI 分析平台热销榜+评论关键词\n2. 标题：DeepSeek 生成 5 版 A/B 测试\n3. 主图：Midjourney + Canva\n4. 详情页：ChatGPT 卖点结构\n5. 客服：扣子专属 Bot\n\n💡 在「AI 配置中心」填入 API Key 后即可获得真实回答。`,
      education: `【教育场景·Mock】围绕"${message}"：\n1. 学情：Claude 分析作业找薄弱点\n2. 课件：Gamma 一键生成 PPT\n3. 习题：GPT 难度梯度生成\n4. 答疑：扣子 24h Bot\n\n💡 在「AI 配置中心」填入 API Key 后即可获得真实回答。`,
      general: `【通用·Mock】针对"${message}"：\n1) ChatGPT/Claude 拆解为 5 子任务\n2) Perplexity 行业检索\n3) Midjourney/Canva 视觉化\n4) 扣子/Dify 流程自动化\n\n💡 在「AI 配置中心」填入 API Key 后即可获得真实回答。`
    };
    const reply = mockResponses[industry] || mockResponses.general;
    await new Promise(r => setTimeout(r, 300));
    return res.json(ok({ reply, agentId, ts: Date.now(), provider: 'mock', model: 'mock' }));
  }

  try {
    const result = await callProvider(p, messages, { temperature: 0.7, max_tokens: 2048 });
    res.json(ok({ reply: result.content, agentId, ts: Date.now(), provider: p.id, model: p.model, tokens: result.tokens }));
  } catch (e) {
    console.error('[AI chat error]', e);
    res.json(fail('AI 调用失败：' + (e.message || e) + '。请到「AI 配置中心」检查 API Key 与 baseUrl。'));
  }
});

// 提示词运行：直接把模板渲染后送给真实 AI
app.post('/api/ai/prompt/run', async (req, res) => {
  const { promptId, content, params, providerId, systemPrompt } = req.body || {};
  db.promptHistory.unshift({ id: 'PR' + Date.now(), promptId, content: (content || '').slice(0, 500), params, ts: Date.now() });
  if (db.promptHistory.length > 200) db.promptHistory.pop();
  saveDB(db);

  const p = pickProvider(providerId);
  if (!p) {
    await new Promise(r => setTimeout(r, 200));
    return res.json(ok({
      output: `[Mock 输出 - 未配置 AI]\n您发送的提示词：\n${(content || '').slice(0, 200)}...\n\n💡 请到「AI 配置中心」配置 OpenAI/Claude/DeepSeek/通义 任一供应商即可获得真实结果。`,
      tokens: 0, model: 'mock', provider: 'mock'
    }));
  }
  const messages = [
    { role: 'system', content: systemPrompt || 'You are a helpful AI assistant. Respond in Chinese unless asked otherwise. Be structured and actionable.' },
    { role: 'user', content: content || '' }
  ];
  try {
    const result = await callProvider(p, messages, { temperature: 0.7, max_tokens: 2048 });
    res.json(ok({ output: result.content, tokens: result.tokens, model: p.model, provider: p.id }));
  } catch (e) {
    res.json(fail('AI 调用失败：' + (e.message || e)));
  }
});

// AI 配方一键运行：根据 lesson + recipe + variables 自动拼装并调用
app.post('/api/ai/recipe/run', async (req, res) => {
  const { promptTemplate, variables, providerId, lessonTitle, toolName } = req.body || {};
  let prompt = promptTemplate || '';
  // 替换 {var} 占位
  Object.entries(variables || {}).forEach(([k, v]) => {
    prompt = prompt.split('{' + k + '}').join(v || '');
  });
  const p = pickProvider(providerId);
  const sys = `你是 OPC 学院 AI 教练。当前课时：《${lessonTitle || '未知'}》，推荐工具：${toolName || '通用 AI'}。请按照学员发来的提示词输出高质量、结构化的结果。`;
  if (!p) {
    return res.json(ok({
      output: `[Mock 输出]\n变量替换后的完整提示词：\n\n${prompt}\n\n💡 请到「AI 配置中心」配置 API Key 后获得真实 AI 结果。`,
      rendered: prompt, tokens: 0, model: 'mock', provider: 'mock'
    }));
  }
  try {
    const result = await callProvider(p, [
      { role: 'system', content: sys },
      { role: 'user', content: prompt }
    ], { temperature: 0.7, max_tokens: 2048 });
    res.json(ok({ output: result.content, rendered: prompt, tokens: result.tokens, model: p.model, provider: p.id }));
  } catch (e) {
    res.json(fail('AI 调用失败：' + (e.message || e)));
  }
});

// 知识库（用于 AI 智能体上下文检索）
app.get('/api/ai/knowledge', (req, res) => res.json(ok(db.knowledge)));
app.post('/api/ai/knowledge', (req, res) => {
  const item = { id: 'KB' + Date.now(), title: req.body.title, content: req.body.content, ts: Date.now() };
  db.knowledge.push(item);
  saveDB(db);
  res.json(ok(item));
});

// ============== 运营端 ==============
app.get('/api/members', (req, res) => res.json(ok({ message: '前端 mock' })));
app.post('/api/bookings', (req, res) => {
  const b = { id: 'BK' + Date.now(), ...req.body, status: 'confirmed', createdAt: new Date().toISOString() };
  db.bookings.push(b); saveDB(db);
  res.json(ok(b));
});
app.get('/api/bookings', (req, res) => res.json(ok(db.bookings)));

app.post('/api/tickets', (req, res) => {
  const t = { id: 'TK' + Date.now(), ...req.body, status: 'pending', createdAt: new Date().toISOString() };
  db.tickets.push(t); saveDB(db);
  res.json(ok(t));
});
app.get('/api/tickets', (req, res) => res.json(ok(db.tickets)));
app.patch('/api/tickets/:id', (req, res) => {
  const t = db.tickets.find(x => x.id === req.params.id);
  if (!t) return res.json(fail('not found'));
  Object.assign(t, req.body);
  saveDB(db);
  res.json(ok(t));
});

app.post('/api/events', (req, res) => {
  const ev = { id: 'EV' + Date.now(), ...req.body, status: 'planning', createdAt: new Date().toISOString() };
  db.events.push(ev); saveDB(db);
  res.json(ok(ev));
});
app.get('/api/events', (req, res) => res.json(ok(db.events)));

// ============== 健康检查 ==============
app.get('/api/health', (req, res) => res.json(ok({
  status: 'running',
  version: '2.0.0',
  db: { agents: db.agents.length, tickets: db.tickets.length, bookings: db.bookings.length },
  uptime: process.uptime()
})));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 OPC 管理平台已启动`);
  console.log(`   本地访问: http://localhost:${PORT}`);
  console.log(`   API 健康: http://localhost:${PORT}/api/health`);
  console.log(`   DB 文件: ${DB_PATH}\n`);
});
