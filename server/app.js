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

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

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

// AI 对话：留接口给后台真实模型，目前返回模拟响应
app.post('/api/ai/chat', async (req, res) => {
  const { agentId, message, industry } = req.body || {};
  // TODO: 此处接入真实 AI（OpenAI/Claude/通义/Coze/Dify 等）
  const mockResponses = {
    ecommerce: `【电商场景】基于您的问题"${message}"，建议：
1. 选品策略：用 AI 分析平台热销榜单 + 评论关键词
2. 标题优化：DeepSeek + 关键词工具生成 5 版 A/B 测试
3. 主图设计：Midjourney 生成情绪图 + Canva 加文案
4. 详情页：ChatGPT 生成卖点结构 + 美图 AI 优化排版
5. 客服话术：扣子搭建专属问答 Bot`,
    education: `【教育场景】围绕"${message}"的智能教学方案：
1. 学情分析：让 Claude 分析学生作业找薄弱点
2. 课件生成：Gamma 一键生成 PPT
3. 个性化习题：GPT 按难度梯度生成
4. 课后答疑：扣子部署 7×24 答疑机器人`,
    general: `针对"${message}"的通用 AI 工作流建议：
1) 使用 ChatGPT/Claude 拆解问题为 5 个子任务
2) 用 Perplexity 做行业资料检索
3) 关键产出用 Midjourney/Canva 视觉化
4) 部署到扣子/Dify 做流程自动化`
  };
  const reply = mockResponses[industry] || mockResponses.general;
  // 模拟延迟
  await new Promise(r => setTimeout(r, 300));
  res.json(ok({ reply, agentId, ts: Date.now() }));
});

// 提示词运行
app.post('/api/ai/prompt/run', async (req, res) => {
  const { promptId, content, params } = req.body || {};
  db.promptHistory.unshift({ id: 'PR' + Date.now(), promptId, content, params, ts: Date.now() });
  if (db.promptHistory.length > 100) db.promptHistory.pop();
  saveDB(db);
  await new Promise(r => setTimeout(r, 250));
  res.json(ok({
    output: `[Mock 输出]\n基于提示词模板生成的内容示例：\n${(content || '').slice(0, 80)}...\n\n[此处接入真实 AI 后将返回完整结果]`,
    tokens: 168, model: 'mock-gpt-4'
  }));
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
