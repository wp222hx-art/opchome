// AI 配置中心 - Tokenhot 一站式 AI 网关
// 只需一个 Key 即可调用 100+ 主流大模型 (GPT / Claude / Gemini / DeepSeek / 通义 / Kimi 等)
import { html } from '../utils.js';

// Tokenhot 网关支持的热门模型（OpenAI 兼容协议，统一通过 baseUrl + apiKey 调用）
const TOKENHOT_MODELS = [
  { group: 'OpenAI 系列', models: [
    { id: 'gpt-5.4', label: 'GPT-5.4 · 旗舰', tag: '顶级' },
    { id: 'gpt-4o', label: 'GPT-4o · 全模态', tag: '推荐' },
    { id: 'gpt-4o-mini', label: 'GPT-4o-mini · 高性价比', tag: '入门' },
    { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { id: 'o1-preview', label: 'o1-preview · 深度思考' },
    { id: 'o3-mini', label: 'o3-mini · 推理' }
  ]},
  { group: 'Anthropic Claude', models: [
    { id: 'claude-opus-4-5', label: 'Claude Opus 4.6 · 顶级', tag: '顶级' },
    { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', tag: '推荐' },
    { id: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku · 极速' }
  ]},
  { group: 'Google Gemini', models: [
    { id: 'gemini-3-pro', label: 'Gemini 3 Pro · 顶级', tag: '顶级' },
    { id: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash' },
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro · 长文本' }
  ]},
  { group: '国产大模型', models: [
    { id: 'deepseek-chat', label: 'DeepSeek-V3 · 极致性价比', tag: '便宜' },
    { id: 'deepseek-reasoner', label: 'DeepSeek-R1 · 深度推理' },
    { id: 'qwen-max', label: '通义千问 Qwen-Max' },
    { id: 'qwen-plus', label: '通义千问 Qwen-Plus' },
    { id: 'moonshot-v1-128k', label: 'Kimi 128k · 超长上下文' },
    { id: 'glm-4-plus', label: '智谱 GLM-4-Plus' },
    { id: 'doubao-pro-128k', label: '豆包 Pro 128k' }
  ]},
  { group: '图像/视频/音频', models: [
    { id: 'dall-e-3', label: 'DALL-E 3 · 文生图' },
    { id: 'flux-pro', label: 'FLUX Pro · 文生图' },
    { id: 'midjourney', label: 'Midjourney · 文生图' },
    { id: 'sora', label: 'Sora · 文生视频' },
    { id: 'suno-v4', label: 'Suno v4 · 文生音乐' }
  ]}
];

export function renderAiSettings(root) {
  root.innerHTML = html`
    <div class="page-header">
      <h2><i class="fa-solid fa-bolt"></i> AI 配置中心 · Tokenhot 一站式接入</h2>
      <p class="page-subtitle">只需 1 个 API Key，全平台 AI 助教 / 提示词运行 / 课时配方 / 智能体 全部解锁 100+ 主流大模型</p>
    </div>

    <!-- 顶部 Hero 卡片 -->
    <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg,#1e1b4b 0%,#7c3aed 50%,#ec4899 100%);color:#fff;border:none;">
      <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
        <div style="font-size:56px;line-height:1;">⚡</div>
        <div style="flex:1;min-width:280px;">
          <h3 style="margin:0 0 8px;color:#fff;font-size:22px;">Tokenhot · 中国大陆友好的 AI 网关</h3>
          <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:14px;opacity:0.95;line-height:1.8;">
            <div>🌐 <b>100+ 模型</b>统一接入</div>
            <div>⚡ <b>≤200ms</b> 平均延迟</div>
            <div>🛡️ <b>99.99%</b> 可用率</div>
            <div>💰 最高<b>节省 90%</b> 费用</div>
          </div>
          <div style="margin-top:10px;font-size:13px;opacity:0.9;">
            ✅ OpenAI 完全兼容协议 &nbsp;·&nbsp; ✅ 国内直连无需翻墙 &nbsp;·&nbsp; ✅ 按 Token 计费充多少用多少
          </div>
        </div>
        <a href="https://tokenhot.ai/zh" target="_blank" class="btn" style="background:#fff;color:#7c3aed;font-weight:600;padding:12px 22px;font-size:15px;">
          <i class="fa-solid fa-rocket"></i> 注册领免费额度 →
        </a>
      </div>
    </div>

    <!-- 当前状态 -->
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <h3 style="margin:0 0 4px;">当前配置状态</h3>
          <div id="ai-status-line" style="color:var(--text-secondary);font-size:14px;">加载中...</div>
        </div>
        <span id="ai-status-badge" class="tag" style="background:#94a3b8;color:#fff;font-size:13px;padding:6px 14px;">
          <i class="fa-solid fa-spinner fa-spin"></i> 检测中
        </span>
      </div>
    </div>

    <!-- 配置表单 -->
    <div class="card" style="margin-bottom:16px;">
      <h3 style="margin:0 0 16px;"><i class="fa-solid fa-key"></i> 填写 Tokenhot API Key</h3>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div>
          <label style="display:block;font-size:13px;color:var(--text-secondary);margin-bottom:6px;">
            <b>① Base URL</b>（接口地址，已默认填好）
          </label>
          <input id="th-baseurl" class="form-input" type="text" value="https://api.tokenhot.ai/v1" />
        </div>
        <div>
          <label style="display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--text-secondary);margin-bottom:6px;">
            <b>② Default Model</b>（默认模型，可在课时中切换）
            <button id="th-refresh-models" class="btn" style="padding:2px 10px;font-size:11px;line-height:1.4;">
              <i class="fa-solid fa-rotate"></i> 拉取可用模型
            </button>
          </label>
          <select id="th-model-select" class="form-input" style="display:none;"></select>
          <input id="th-model" class="form-input" type="text" value="gpt-4o-mini" list="th-models-datalist" placeholder="先填写并保存 Key 后点「拉取可用模型」" />
          <datalist id="th-models-datalist">
            ${TOKENHOT_MODELS.flatMap(g => g.models.map(m => `<option value="${m.id}">${m.label}</option>`)).join('')}
          </datalist>
          <div id="th-model-info" style="font-size:11px;color:var(--text-muted);margin-top:4px;">未拉取真实清单时使用内置 30+ 推荐模型；建议先保存 Key 再点「拉取可用模型」获取 Tokenhot 实际支持的全部模型。</div>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--text-secondary);margin-bottom:6px;">
          <span><b>③ API Key</b>（在 Tokenhot 后台创建，sk- 开头）</span>
          <a href="https://api.tokenhot.ai/register" target="_blank" style="color:var(--primary);text-decoration:none;font-size:13px;">
            <i class="fa-solid fa-up-right-from-square"></i> 前往 Tokenhot 获取
          </a>
        </label>
        <input id="th-apikey" class="form-input" type="password" placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" autocomplete="off" />
        <div id="th-key-hint" style="font-size:12px;color:var(--text-muted);margin-top:6px;"></div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button id="th-save" class="btn btn-primary" style="padding:10px 20px;">
          <i class="fa-solid fa-save"></i> 保存配置
        </button>
        <button id="th-test" class="btn" style="padding:10px 20px;">
          <i class="fa-solid fa-plug"></i> 测试连通
        </button>
        <button id="th-clear" class="btn" style="padding:10px 20px;color:var(--danger);">
          <i class="fa-solid fa-eraser"></i> 清除 Key
        </button>
        <span style="flex:1;"></span>
        <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:14px;">
          <input id="th-enabled" type="checkbox" /> <span>启用</span>
        </label>
      </div>

      <div id="th-result" style="margin-top:14px;font-size:14px;"></div>
    </div>

    <!-- 可选模型清单 -->
    <div class="card" style="margin-bottom:16px;">
      <h3 style="margin:0 0 12px;"><i class="fa-solid fa-layer-group"></i> 100+ 可调用模型一览</h3>
      <p style="color:var(--text-secondary);font-size:13px;margin:0 0 14px;">
        点击任意模型即可设为默认。每个课时的「AI 操作配方」也可以单独切换模型。
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;">
        ${TOKENHOT_MODELS.map(g => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:12px;background:var(--bg);">
            <div style="font-weight:600;color:var(--primary);font-size:14px;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              ${groupEmoji(g.group)} ${g.group}
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${g.models.map(m => `
                <div class="th-model-item" data-model="${m.id}" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:6px;cursor:pointer;font-size:13px;background:#fff;border:1px solid var(--border-light, #f1f5f9);transition:all .2s;">
                  <span>${m.label}</span>
                  ${m.tag ? `<span class="tag" style="background:${tagColor(m.tag)};color:#fff;font-size:10px;padding:2px 6px;">${m.tag}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 价格对比 -->
    <div class="card" style="margin-bottom:16px;">
      <h3 style="margin:0 0 12px;"><i class="fa-solid fa-coins"></i> 价格优势</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
        <div style="padding:14px;background:#f0fdf4;border-radius:10px;border-left:4px solid #10b981;">
          <div style="font-size:12px;color:#16a34a;margin-bottom:4px;">基础模型 (mini/haiku/flash 系列)</div>
          <div style="font-size:22px;font-weight:700;color:#15803d;">$0.02 <span style="font-size:13px;font-weight:400;">/M tokens</span></div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">日常对话 / 简单任务</div>
        </div>
        <div style="padding:14px;background:#eff6ff;border-radius:10px;border-left:4px solid #3b82f6;">
          <div style="font-size:12px;color:#2563eb;margin-bottom:4px;">核心模型 (4o/Sonnet/Pro 系列)</div>
          <div style="font-size:22px;font-weight:700;color:#1d4ed8;">$0.08 <span style="font-size:13px;font-weight:400;">/M tokens</span></div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">日常生产力主力</div>
        </div>
        <div style="padding:14px;background:#fdf4ff;border-radius:10px;border-left:4px solid #a855f7;">
          <div style="font-size:12px;color:#9333ea;margin-bottom:4px;">顶级模型 (Opus 4.6 / GPT-5.4)</div>
          <div style="font-size:22px;font-weight:700;color:#7e22ce;">$1.88 <span style="font-size:13px;font-weight:400;">/M tokens</span></div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">复杂推理 / 关键决策</div>
        </div>
      </div>
      <div style="margin-top:14px;padding:12px;background:#fff7ed;border-radius:8px;font-size:13px;color:#9a3412;">
        💡 <b>对比示例：</b>同样的月用量，传统直连 $8.60 → Tokenhot 仅需 $1.72，每月省 $6.88（年省 $82.56）。
      </div>
    </div>

    <!-- 接入说明 -->
    <div class="card" style="background:#f8fafc;">
      <h3 style="margin:0 0 12px;"><i class="fa-solid fa-circle-info"></i> 工作原理</h3>
      <ol style="margin:0;padding-left:20px;color:var(--text-secondary);font-size:13px;line-height:1.9;">
        <li>API Key 仅保存在服务端 <code>server/providers.json</code>（已 .gitignore），前端永远只看到脱敏字符串</li>
        <li>所有 AI 调用通过本平台后端转发到 <code>https://api.tokenhot.ai/v1</code>，浏览器不接触 Key</li>
        <li>100+ 模型走同一个 OpenAI 兼容协议，切换模型只需改 <code>model</code> 字段</li>
        <li>每个课时的「🛠️ AI 操作配方」会自动注入课时上下文 + 推荐工具 + 系统提示，一键运行得到真实 AI 输出</li>
        <li>「🤖 AI 助教」支持多轮对话，自动携带最近 10 轮历史上下文</li>
      </ol>
    </div>
  `;

  bindEvents();
  loadCurrent();
}

function groupEmoji(name) {
  if (name.includes('OpenAI')) return '🤖';
  if (name.includes('Claude')) return '📜';
  if (name.includes('Gemini')) return '✨';
  if (name.includes('国产')) return '🇨🇳';
  if (name.includes('图像')) return '🎨';
  return '🧠';
}

function tagColor(tag) {
  return ({ '顶级': '#a855f7', '推荐': '#3b82f6', '入门': '#10b981', '便宜': '#f59e0b' })[tag] || '#64748b';
}

function bindEvents() {
  document.getElementById('th-save')?.addEventListener('click', () => saveConfig(true));
  document.getElementById('th-test')?.addEventListener('click', testConnection);
  document.getElementById('th-clear')?.addEventListener('click', clearKey);
  document.getElementById('th-enabled')?.addEventListener('change', () => saveConfig(false));
  document.getElementById('th-refresh-models')?.addEventListener('click', refreshModelList);
  document.getElementById('th-model-select')?.addEventListener('change', (e) => {
    const v = e.target.value;
    if (v) {
      const input = document.getElementById('th-model');
      if (input) input.value = v;
      window.OPC?.toast?.(`已选择模型：${v}，点击「保存配置」生效`, 'info');
    }
  });

  document.querySelectorAll('.th-model-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.background = '#eef2ff';
      item.style.borderColor = 'var(--primary)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = '#fff';
      item.style.borderColor = 'var(--border-light, #f1f5f9)';
    });
    item.addEventListener('click', () => {
      const m = item.dataset.model;
      const input = document.getElementById('th-model');
      if (input) input.value = m;
      window.OPC?.toast?.(`已选择模型：${m}，点击「保存配置」生效`, 'info');
    });
  });
}

async function loadCurrent() {
  try {
    const res = await fetch('/api/ai/providers');
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    const p = (json.data.providers || []).find(x => x.id === 'tokenhot') || (json.data.providers || [])[0];
    if (!p) return;

    document.getElementById('th-baseurl').value = p.baseUrl || 'https://api.tokenhot.ai/v1';
    document.getElementById('th-model').value = p.model || 'gpt-4o-mini';
    document.getElementById('th-enabled').checked = !!p.enabled;
    if (p.hasKey) {
      document.getElementById('th-apikey').placeholder = p.apiKey + ' (留空保持不变)';
      document.getElementById('th-key-hint').innerHTML = `✅ 已保存：<code>${p.apiKey}</code>（输入新 Key 可覆盖；留空则保持不变）`;
    } else {
      document.getElementById('th-key-hint').innerHTML = '⚪ 还未配置 Key，请到 <a href="https://api.tokenhot.ai/register" target="_blank" style="color:var(--primary);">Tokenhot 注册</a> 后获取';
    }

    const statusLine = document.getElementById('ai-status-line');
    const badge = document.getElementById('ai-status-badge');
    if (p.hasKey && p.enabled) {
      statusLine.innerHTML = `已启用 · 默认模型 <code>${p.model || 'gpt-4o-mini'}</code> · 全平台 AI 功能已解锁 🎉`;
      badge.style.background = '#10b981';
      badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> 已就绪';
    } else if (p.hasKey) {
      statusLine.innerHTML = '已填 Key 但未启用，开启右侧「启用」开关即可';
      badge.style.background = '#f59e0b';
      badge.innerHTML = '<i class="fa-solid fa-pause"></i> 待启用';
    } else {
      statusLine.innerHTML = '尚未配置 API Key，全平台将使用 Mock 模式（可正常演示，但无真实 AI 输出）';
      badge.style.background = '#94a3b8';
      badge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> 未配置';
    }
  } catch (e) {
    document.getElementById('ai-status-line').textContent = '加载失败：' + e.message;
  }
}

async function saveConfig(showToast = true) {
  const baseUrl = document.getElementById('th-baseurl').value.trim();
  const model = document.getElementById('th-model').value.trim();
  const apiKey = document.getElementById('th-apikey').value.trim();
  const enabled = document.getElementById('th-enabled').checked;
  const result = document.getElementById('th-result');

  try {
    const res = await fetch('/api/ai/providers/tokenhot', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseUrl, model, apiKey, enabled })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    // 同时设为默认
    await fetch('/api/ai/providers/default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'tokenhot' })
    });
    if (showToast) {
      result.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;padding:10px;border-radius:8px;color:#166534;">✅ 已保存配置并设为默认</div>';
      window.OPC?.toast?.('配置已保存', 'success');
    }
    document.getElementById('th-apikey').value = '';
    setTimeout(loadCurrent, 200);
  } catch (e) {
    result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:10px;border-radius:8px;color:#991b1b;">❌ ${e.message}</div>`;
  }
}

async function testConnection() {
  const result = document.getElementById('th-result');
  result.innerHTML = '<div style="color:var(--text-muted);">⏳ 正在调用 Tokenhot 网关测试，请稍等 5-15 秒...</div>';
  try {
    await saveConfig(false);
    const res = await fetch('/api/ai/providers/tokenhot/test', { method: 'POST' });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    const d = json.data;
    result.innerHTML = `
      <div style="background:#f0fdf4;border:1px solid #86efac;padding:14px;border-radius:10px;color:#166534;">
        <div style="font-weight:600;margin-bottom:6px;">🎉 连通成功！全平台 AI 功能已就绪</div>
        <div style="font-size:13px;line-height:1.7;color:#374151;">
          · 模型：<code>${d.model}</code><br>
          · 耗时：<b>${d.ms}ms</b><br>
          · AI 回复样例：<i>"${d.sample}"</i>
        </div>
      </div>`;
    window.OPC?.toast?.('Tokenhot 连通成功！', 'success');
  } catch (e) {
    result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:14px;border-radius:10px;color:#991b1b;">
      ❌ 测试失败：${e.message}<br>
      <span style="font-size:12px;color:#64748b;">请检查 ① API Key 是否正确 ② Base URL 是否为 <code>https://api.tokenhot.ai/v1</code> ③ 模型名是否在 Tokenhot 列表内</span>
    </div>`;
  }
}

async function refreshModelList() {
  const btn = document.getElementById('th-refresh-models');
  const info = document.getElementById('th-model-info');
  const select = document.getElementById('th-model-select');
  const input = document.getElementById('th-model');
  const result = document.getElementById('th-result');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 拉取中...';
  }
  if (info) info.textContent = '⏳ 正在向 Tokenhot 网关请求 /models 列表...';

  try {
    // 如果用户刚刚输入了新 Key，先保存以确保后端用最新 Key 拉取
    const apiKeyVal = document.getElementById('th-apikey').value.trim();
    if (apiKeyVal) await saveConfig(false);

    const res = await fetch('/api/ai/providers/tokenhot/models');
    const json = await res.json();
    if (!json.success) throw new Error(json.message);

    const models = json.data.models || [];
    if (!models.length) throw new Error('Tokenhot 返回的模型列表为空');

    // 按 group 分组
    const groups = {};
    models.forEach(m => {
      const g = m.group || '🧠 其他';
      (groups[g] = groups[g] || []).push(m);
    });

    // 渲染 select（带 optgroup）
    const currentVal = input?.value || 'gpt-4o-mini';
    const matched = models.find(m => m.id === currentVal);
    select.innerHTML = Object.entries(groups)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([g, list]) => `
        <optgroup label="${g} (${list.length})">
          ${list.map(m => `<option value="${m.id}" ${m.id === currentVal ? 'selected' : ''}>${m.id}${m.owned_by ? ' · ' + m.owned_by : ''}</option>`).join('')}
        </optgroup>
      `).join('');

    // 显示 select，隐藏 input（保留 input 作为隐藏值同步）
    select.style.display = 'block';
    input.style.display = 'none';
    if (!matched) {
      // 当前值不在列表中，默认选第一个
      const first = models[0].id;
      select.value = first;
      input.value = first;
    }

    if (info) {
      info.innerHTML = `✅ 已拉取 <b>${models.length}</b> 个 Tokenhot 实际支持的模型，分 ${Object.keys(groups).length} 类。
        <a href="#" id="th-back-input" style="color:var(--primary);margin-left:8px;">切回手填</a>`;
    }
    document.getElementById('th-back-input')?.addEventListener('click', (e) => {
      e.preventDefault();
      select.style.display = 'none';
      input.style.display = 'block';
      info.textContent = '已切回手动输入模式。';
    });

    if (result) {
      result.innerHTML = `<div style="background:#f0fdf4;border:1px solid #86efac;padding:10px;border-radius:8px;color:#166534;">
        🎉 拉取到 <b>${models.length}</b> 个可用模型，已变为下拉菜单 ↑
      </div>`;
    }
    window.OPC?.toast?.(`成功拉取 ${models.length} 个模型`, 'success');
  } catch (e) {
    if (info) info.innerHTML = `❌ <span style="color:var(--danger);">${e.message}</span>（请先保存有效的 API Key 再点拉取）`;
    if (result) {
      result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:10px;border-radius:8px;color:#991b1b;">
        ❌ 拉取失败：${e.message}
      </div>`;
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rotate"></i> 拉取可用模型';
    }
  }
}

async function clearKey() {
  if (!confirm('确定清除已保存的 Tokenhot API Key？此操作不可恢复。')) return;
  try {
    await fetch('/api/ai/providers/tokenhot', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: '__CLEAR__', enabled: false })
    });
    window.OPC?.toast?.('已清除', 'success');
    loadCurrent();
  } catch (e) {
    window.OPC?.toast?.('清除失败：' + e.message, 'error');
  }
}
