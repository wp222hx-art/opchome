// AI 配置中心 - 统一接入 Tokenhot（一站式 AI 网关）
import { html } from '../utils.js';

const TOKENHOT_MODELS = [
  // OpenAI 系列
  'gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo', 'o1-mini', 'o1-preview',
  // Anthropic Claude 系列
  'claude-opus-4-6', 'claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229',
  // Google Gemini 系列
  'gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash',
  // DeepSeek
  'deepseek-chat', 'deepseek-reasoner',
  // 通义千问
  'qwen-plus', 'qwen-max', 'qwen-turbo',
  // Kimi
  'moonshot-v1-32k', 'moonshot-v1-128k',
  // 智谱
  'glm-4-plus', 'glm-4-flash',
  // 豆包
  'doubao-pro-32k', 'doubao-lite-32k'
];

const MODEL_PRICING = [
  { tag: '入门', desc: '基础模型 · $0.02 / M tokens', models: ['gpt-3.5-turbo', 'glm-4-flash', 'qwen-turbo', 'gemini-1.5-flash'] },
  { tag: '主力', desc: '核心模型 · $0.08 / M tokens', models: ['gpt-4o-mini', 'claude-3-5-haiku-20241022', 'deepseek-chat', 'moonshot-v1-32k'] },
  { tag: '旗舰', desc: '顶级模型 · $1.88 / M tokens', models: ['gpt-4o', 'claude-opus-4-6', 'claude-3-5-sonnet-20241022', 'o1-preview'] }
];

export function renderAiSettings(root) {
  root.innerHTML = html`
    <div class="page-header">
      <h2><i class="fa-solid fa-key"></i> AI 配置中心</h2>
      <p class="page-subtitle">统一接入 <b>Tokenhot</b> · 一个 Key 调用 100+ 大模型，覆盖全平台课时助教 / 提示词运行 / AI 配方一键执行</p>
    </div>

    <!-- 顶部介绍卡片 -->
    <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1px solid #fcd34d;">
      <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
        <div style="font-size:42px;line-height:1;">🔥</div>
        <div style="flex:1;min-width:280px;">
          <h3 style="margin:0 0 6px;color:#b45309;">Tokenhot · 一站式 AI API 网关</h3>
          <p style="margin:0 0 10px;color:#92400e;font-size:14px;line-height:1.7;">
            ✅ <b>OpenAI 兼容协议</b>，无缝替换原 ChatGPT 调用<br>
            ✅ 一个 Key 调用 <b>OpenAI / Claude / Gemini / DeepSeek / 通义 / Kimi / GLM / 豆包</b> 等 100+ 模型<br>
            ✅ 平均延迟 &lt; 200 ms · 99.99% 可用性 · 节省 90% 成本 · 多通道冗余 · 全球加速<br>
            ✅ 按量付费 · 无订阅 · 多模型一键切换 · 国内直连免代理
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="https://api.tokenhot.ai/register" target="_blank" class="btn btn-primary"><i class="fa-solid fa-user-plus"></i> 注册账号</a>
            <a href="https://api.tokenhot.ai/console/token" target="_blank" class="btn"><i class="fa-solid fa-key"></i> 控制台 / 获取 Key</a>
            <a href="https://tokenhot.ai/zh" target="_blank" class="btn"><i class="fa-solid fa-circle-info"></i> 了解更多</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 当前状态 -->
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        <h3 style="margin:0;"><i class="fa-solid fa-circle-check"></i> 当前状态</h3>
        <span id="ai-default-badge" class="tag" style="background:var(--primary);color:#fff;">加载中...</span>
      </div>
      <p style="margin:0;color:var(--text-secondary);font-size:13px;">
        填好 API Key 并启用后，全平台 AI 功能（课时 AI 助教 / 提示词运行 / AI 配方一键执行）将自动调用真实模型；未配置时使用本地 Mock 兜底，不影响演示。
      </p>
    </div>

    <!-- Tokenhot 配置卡片 -->
    <div id="tokenhot-card-container"></div>

    <!-- 模型推荐 -->
    <div class="card" style="margin-top:16px;">
      <h3 style="margin:0 0 12px;"><i class="fa-solid fa-layer-group"></i> 模型选择推荐</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">
        ${MODEL_PRICING.map(p => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:14px;background:var(--bg-secondary);">
            <div style="font-weight:600;color:var(--primary);margin-bottom:6px;">${p.tag}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">${p.desc}</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">
              ${p.models.map(m => `<span class="tag" style="font-size:11px;cursor:pointer;" onclick="document.getElementById('th-model').value='${m}';">${m}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <p style="margin:12px 0 0;font-size:12px;color:var(--text-muted);">
        💡 点击任意模型标签可快速填入上方 Model 输入框。建议日常使用 <b>gpt-4o-mini</b> 或 <b>deepseek-chat</b>，性价比最高。
      </p>
    </div>

    <!-- 安全说明 -->
    <div class="card" style="margin-top:16px;background:#f0f9ff;border:1px solid #bae6fd;">
      <h3 style="margin:0 0 8px;color:#075985;"><i class="fa-solid fa-shield-halved"></i> 安全说明</h3>
      <ul style="margin:0;padding-left:20px;color:#0c4a6e;font-size:13px;line-height:1.8;">
        <li>API Key 只保存在 <code>server/providers.json</code>（本机 / 私有服务器），不会进入 Git 仓库</li>
        <li>前端永远只看到 <b>脱敏字符串</b>（如 sk-tok****a3c2），原值仅在服务端用于代理调用</li>
        <li>所有 AI 调用均经后端转发，浏览器侧绝不暴露 Key</li>
      </ul>
    </div>
  `;

  loadProviders();
}

async function loadProviders() {
  const container = document.getElementById('tokenhot-card-container');
  if (!container) return;
  container.innerHTML = '<div class="card" style="text-align:center;padding:40px;color:var(--text-muted);">⏳ 加载中...</div>';

  try {
    const res = await fetch('/api/ai/providers');
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'failed');

    const providers = json.data.providers || [];
    // 只展示 Tokenhot（如果存在），否则取第一个
    const p = providers.find(x => x.id === 'tokenhot') || providers[0];
    if (!p) {
      container.innerHTML = '<div class="card" style="color:var(--danger);">未找到 Provider 配置</div>';
      return;
    }
    renderTokenhotCard(p);

    const defaultBadge = document.getElementById('ai-default-badge');
    if (defaultBadge) {
      const status = p.hasKey && p.enabled ? '✓ 已就绪' : (p.hasKey ? '⏸ 已保存 / 未启用' : '⚪ 未配置');
      defaultBadge.textContent = `${p.name} · ${p.model || '未填模型'} · ${status}`;
    }
  } catch (e) {
    container.innerHTML = `<div class="card" style="color:var(--danger);">加载失败：${e.message}</div>`;
  }
}

function renderTokenhotCard(p) {
  const container = document.getElementById('tokenhot-card-container');
  const status = p.hasKey ? (p.enabled ? '✅ 已启用' : '⏸️ 未启用') : '⚪ 未配置';
  const statusColor = p.hasKey && p.enabled ? '#10b981' : (p.hasKey ? '#f59e0b' : '#94a3b8');

  container.innerHTML = html`
    <div class="card" style="border-left:4px solid #f97316;">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
        <h3 style="margin:0;flex:1;min-width:200px;font-size:18px;">
          🔥 ${p.name}
          <span class="tag" style="background:#f97316;color:#fff;margin-left:8px;font-size:11px;">默认 / 唯一入口</span>
        </h3>
        <span style="color:${statusColor};font-size:14px;font-weight:600;">${status}</span>
        <label class="switch" style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
          <input type="checkbox" id="th-toggle" ${p.enabled ? 'checked' : ''} ${!p.hasKey ? 'disabled' : ''} />
          <span style="font-size:13px;color:var(--text-secondary);">启用</span>
        </label>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div>
          <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
            <i class="fa-solid fa-link"></i> Base URL
          </label>
          <input id="th-baseurl" class="form-input" type="text" value="${p.baseUrl || 'https://api.tokenhot.ai/v1'}" placeholder="https://api.tokenhot.ai/v1" />
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">默认无需修改 · 支持自部署网关</div>
        </div>
        <div>
          <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
            <i class="fa-solid fa-microchip"></i> Model
          </label>
          <input id="th-model" class="form-input" type="text" value="${p.model || 'gpt-4o-mini'}" placeholder="gpt-4o-mini" list="th-models" />
          <datalist id="th-models">
            ${TOKENHOT_MODELS.map(m => `<option value="${m}">`).join('')}
          </datalist>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">支持 100+ 模型 · 可输入或下拉选择</div>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          <span><i class="fa-solid fa-key"></i> API Key</span>
          <a href="https://api.tokenhot.ai/console/token" target="_blank" style="color:#f97316;text-decoration:none;font-size:12px;font-weight:600;">前往 Tokenhot 控制台获取 →</a>
        </label>
        <input id="th-apikey" class="form-input" type="password" value="${p.apiKey || ''}" placeholder="sk-..." autocomplete="off" />
        ${p.hasKey ? `<div style="font-size:11px;color:#10b981;margin-top:4px;"><i class="fa-solid fa-shield-halved"></i> 已保存：${p.apiKey}（输入新 Key 可覆盖；保留脱敏字符串则不变）</div>` : `<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">在 <a href="https://api.tokenhot.ai/register" target="_blank" style="color:#f97316;">tokenhot.ai</a> 注册后即可获取</div>`}
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button id="th-save" class="btn btn-primary"><i class="fa-solid fa-save"></i> 保存配置</button>
        <button id="th-test" class="btn"><i class="fa-solid fa-plug"></i> 测试连通</button>
        <span style="flex:1;"></span>
        <span style="color:var(--text-muted);font-size:12px;align-self:center;">${p.notes || ''}</span>
      </div>

      <div id="th-result" style="margin-top:12px;font-size:13px;"></div>
    </div>
  `;

  // 绑定事件
  document.getElementById('th-save')?.addEventListener('click', () => saveProvider(p.id));
  document.getElementById('th-test')?.addEventListener('click', () => testProvider(p.id));
  document.getElementById('th-toggle')?.addEventListener('change', (e) => {
    saveProvider(p.id, { enabled: e.target.checked });
  });
}

async function saveProvider(id, override = {}) {
  const baseUrl = document.getElementById('th-baseurl')?.value;
  const model = document.getElementById('th-model')?.value;
  const apiKey = document.getElementById('th-apikey')?.value;
  const enabled = override.enabled !== undefined ? override.enabled : document.getElementById('th-toggle')?.checked;
  const result = document.getElementById('th-result');

  try {
    const res = await fetch('/api/ai/providers/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseUrl, model, apiKey, enabled })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    if (result) result.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;padding:8px 12px;border-radius:8px;color:#166534;">✅ 已保存</div>';
    window.OPC?.toast?.('已保存配置', 'success');
    setTimeout(() => loadProviders(), 300);
  } catch (e) {
    if (result) result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:8px 12px;border-radius:8px;color:#991b1b;">❌ ${e.message}</div>`;
  }
}

async function testProvider(id) {
  const result = document.getElementById('th-result');
  if (result) result.innerHTML = '<div style="color:var(--text-muted);padding:8px 0;"><i class="fa-solid fa-spinner fa-spin"></i> 正在测试调用，请稍等 5-15 秒...</div>';
  try {
    await saveProvider(id);
    const res = await fetch('/api/ai/providers/' + id + '/test', { method: 'POST' });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    const d = json.data;
    if (result) {
      result.innerHTML = `<div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:8px;color:#166534;">
        <div style="font-weight:600;margin-bottom:6px;">✅ 调用成功 · 模型 <code>${d.model}</code> · 耗时 ${d.ms}ms</div>
        <div style="color:#374151;font-size:13px;">AI 回复示例：${d.sample}</div>
      </div>`;
    }
    window.OPC?.toast?.('测试成功！Tokenhot 连接正常', 'success');
  } catch (e) {
    if (result) result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:12px;border-radius:8px;color:#991b1b;">
      <div style="font-weight:600;margin-bottom:4px;">❌ 测试失败</div>
      <div style="font-size:13px;">${e.message}</div>
      <div style="font-size:12px;margin-top:6px;color:#7f1d1d;">提示：请确认 API Key 正确、Base URL 为 <code>https://api.tokenhot.ai/v1</code>、模型名称有效。</div>
    </div>`;
  }
}
