// AI 配置中心页面 - 管理各家 AI Provider 的 API Key
import { html } from '../utils.js';

const PROVIDER_TIPS = {
  openai: { keyHint: 'sk-...', getUrl: 'https://platform.openai.com/api-keys', models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  anthropic: { keyHint: 'sk-ant-...', getUrl: 'https://console.anthropic.com/settings/keys', models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'] },
  deepseek: { keyHint: 'sk-...', getUrl: 'https://platform.deepseek.com/api_keys', models: ['deepseek-chat', 'deepseek-reasoner'] },
  qwen: { keyHint: 'sk-...', getUrl: 'https://bailian.console.aliyun.com/?apiKey=1', models: ['qwen-plus', 'qwen-max', 'qwen-turbo', 'qwen-long'] },
  moonshot: { keyHint: 'sk-...', getUrl: 'https://platform.moonshot.cn/console/api-keys', models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'] },
  zhipu: { keyHint: '...token', getUrl: 'https://open.bigmodel.cn/usercenter/apikeys', models: ['glm-4-flash', 'glm-4-plus', 'glm-4-air'] },
  doubao: { keyHint: '...', getUrl: 'https://www.volcengine.com/product/ark', models: ['填入 endpoint id (ep-xxxx)'] },
  gemini: { keyHint: 'AIza...', getUrl: 'https://aistudio.google.com/app/apikey', models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'] },
  custom: { keyHint: '...', getUrl: '', models: ['任意 OpenAI 兼容端点'] }
};

export function renderAiSettings(root) {
  root.innerHTML = html`
    <div class="page-header">
      <h2><i class="fa-solid fa-key"></i> AI 配置中心</h2>
      <p class="page-subtitle">配置各家 AI 大模型的 API Key，让全平台 AI 助教 / 提示词运行 / 配方一键执行 全部接入真实模型</p>
    </div>

    <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg,#eef2ff,#fae8ff);border:1px solid var(--primary-light);">
      <div style="display:flex;gap:16px;align-items:flex-start;">
        <div style="font-size:32px;">🔐</div>
        <div style="flex:1;">
          <h3 style="margin:0 0 6px;">私有部署 / 安全说明</h3>
          <ul style="margin:0;padding-left:20px;color:var(--text-secondary);font-size:14px;line-height:1.8;">
            <li>API Key 只保存在 <code>server/providers.json</code>（本机 / 私有服务器），<b>前端永远只看到脱敏字符串</b></li>
            <li>所有 AI 调用都通过后端转发，避免在浏览器暴露 Key</li>
            <li>支持 9 家主流模型：OpenAI / Claude / DeepSeek / 通义千问 / Kimi / GLM / 豆包 / Gemini / 自定义 OpenAI 兼容端点</li>
            <li>设为「默认」的 Provider 会被全平台 AI 功能（课时助教 / 提示词运行 / AI 配方一键运行）使用</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3 style="margin:0;">当前默认 Provider</h3>
        <span id="ai-default-badge" class="tag" style="background:var(--primary);color:#fff;">加载中...</span>
      </div>
      <p style="margin:0;color:var(--text-secondary);font-size:13px;">下方启用并填好 Key 的供应商中，可点击「设为默认」切换。</p>
    </div>

    <div id="ai-providers-list"></div>
  `;

  loadProviders();
}

async function loadProviders() {
  const list = document.getElementById('ai-providers-list');
  if (!list) return;
  list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">加载中...</div>';

  try {
    const res = await fetch('/api/ai/providers');
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'failed');
    renderProviderCards(json.data);
  } catch (e) {
    list.innerHTML = `<div class="card" style="color:var(--danger);">加载失败：${e.message}</div>`;
  }
}

function renderProviderCards(data) {
  const { defaultProvider, providers } = data;
  const defaultBadge = document.getElementById('ai-default-badge');
  const def = providers.find(p => p.id === defaultProvider);
  if (defaultBadge) {
    defaultBadge.textContent = def ? `${def.name} · ${def.model || '未填模型'}${def.hasKey && def.enabled ? ' ✓' : ' (未启用)'}` : '未设置';
  }

  const list = document.getElementById('ai-providers-list');
  list.innerHTML = providers.map(p => providerCard(p, defaultProvider)).join('');

  // 绑定事件
  providers.forEach(p => {
    document.getElementById('save-' + p.id)?.addEventListener('click', () => saveProvider(p.id));
    document.getElementById('test-' + p.id)?.addEventListener('click', () => testProvider(p.id));
    document.getElementById('default-' + p.id)?.addEventListener('click', () => setDefaultProvider(p.id));
    document.getElementById('toggle-' + p.id)?.addEventListener('change', (e) => {
      // toggle 时自动保存
      saveProvider(p.id, { enabled: e.target.checked });
    });
  });
}

function providerCard(p, defaultId) {
  const tip = PROVIDER_TIPS[p.id] || { keyHint: '...', getUrl: '', models: [] };
  const isDefault = p.id === defaultId;
  const status = p.hasKey ? (p.enabled ? '✅ 已启用' : '⏸️ 未启用') : '⚪ 未配置';
  const statusColor = p.hasKey && p.enabled ? '#10b981' : (p.hasKey ? '#f59e0b' : '#94a3b8');

  return html`
    <div class="card" style="margin-bottom:14px;border-left:4px solid ${isDefault ? 'var(--primary)' : 'var(--border)'};">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
        <h3 style="margin:0;flex:1;min-width:200px;">
          ${providerEmoji(p.id)} ${p.name}
          ${isDefault ? '<span class="tag" style="background:var(--primary);color:#fff;margin-left:8px;font-size:11px;">默认</span>' : ''}
        </h3>
        <span style="color:${statusColor};font-size:13px;font-weight:600;">${status}</span>
        <label class="switch" style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
          <input type="checkbox" id="toggle-${p.id}" ${p.enabled ? 'checked' : ''} ${!p.hasKey ? 'disabled' : ''} />
          <span style="font-size:13px;color:var(--text-secondary);">启用</span>
        </label>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">Base URL</label>
          <input id="baseurl-${p.id}" class="form-input" type="text" value="${p.baseUrl || ''}" placeholder="https://..." />
        </div>
        <div>
          <label style="display:block;font-size:12px;color:var(--text-muted);margin-bottom:4px;">Model</label>
          <input id="model-${p.id}" class="form-input" type="text" value="${p.model || ''}" placeholder="${(tip.models[0] || '')}" list="models-${p.id}" />
          <datalist id="models-${p.id}">
            ${(tip.models || []).map(m => `<option value="${m}">`).join('')}
          </datalist>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <label style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          <span>API Key</span>
          ${tip.getUrl ? `<a href="${tip.getUrl}" target="_blank" style="color:var(--primary);text-decoration:none;font-size:12px;">前往获取 →</a>` : ''}
        </label>
        <input id="apikey-${p.id}" class="form-input" type="password" value="${p.apiKey || ''}" placeholder="${tip.keyHint}" autocomplete="off" />
        ${p.hasKey ? `<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">已保存：${p.apiKey}（输入新 Key 可覆盖；保留脱敏字符串则不变）</div>` : ''}
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button id="save-${p.id}" class="btn btn-primary"><i class="fa-solid fa-save"></i> 保存</button>
        <button id="test-${p.id}" class="btn"><i class="fa-solid fa-plug"></i> 测试连通</button>
        ${p.hasKey && p.enabled && !isDefault ? `<button id="default-${p.id}" class="btn"><i class="fa-solid fa-star"></i> 设为默认</button>` : ''}
        <span style="flex:1;"></span>
        <span style="color:var(--text-muted);font-size:12px;align-self:center;">${p.notes || ''}</span>
      </div>

      <div id="result-${p.id}" style="margin-top:10px;font-size:13px;"></div>
    </div>
  `;
}

function providerEmoji(id) {
  return ({
    openai: '🤖', anthropic: '📜', deepseek: '🐳', qwen: '🐻',
    moonshot: '🌙', zhipu: '💎', doubao: '🥟', gemini: '✨', custom: '⚙️'
  })[id] || '🤖';
}

async function saveProvider(id, override = {}) {
  const baseUrl = document.getElementById('baseurl-' + id)?.value;
  const model = document.getElementById('model-' + id)?.value;
  const apiKey = document.getElementById('apikey-' + id)?.value;
  const enabled = override.enabled !== undefined ? override.enabled : document.getElementById('toggle-' + id)?.checked;
  const result = document.getElementById('result-' + id);

  try {
    const res = await fetch('/api/ai/providers/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseUrl, model, apiKey, enabled })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    if (result) result.innerHTML = '<span style="color:#10b981;">✅ 已保存</span>';
    window.OPC?.toast?.('已保存配置', 'success');
    setTimeout(() => loadProviders(), 300);
  } catch (e) {
    if (result) result.innerHTML = `<span style="color:var(--danger);">❌ ${e.message}</span>`;
  }
}

async function testProvider(id) {
  const result = document.getElementById('result-' + id);
  if (result) result.innerHTML = '<span style="color:var(--text-muted);">⏳ 正在测试调用，请稍等 5-15 秒...</span>';
  try {
    // 先保存当前表单
    await saveProvider(id);
    const res = await fetch('/api/ai/providers/' + id + '/test', { method: 'POST' });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    const d = json.data;
    if (result) {
      result.innerHTML = `<div style="background:#f0fdf4;border:1px solid #86efac;padding:10px;border-radius:8px;color:#166534;">
        ✅ 调用成功 · 模型 <code>${d.model}</code> · 耗时 ${d.ms}ms<br>
        <span style="color:#374151;">AI 回复示例：${d.sample}</span>
      </div>`;
    }
    window.OPC?.toast?.('测试成功！', 'success');
  } catch (e) {
    if (result) result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:10px;border-radius:8px;color:#991b1b;">❌ ${e.message}</div>`;
  }
}

async function setDefaultProvider(id) {
  try {
    const res = await fetch('/api/ai/providers/default', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    window.OPC?.toast?.('已设为默认', 'success');
    loadProviders();
  } catch (e) {
    window.OPC?.toast?.('设置失败：' + e.message, 'error');
  }
}
