// 提示词库
import { html } from '../utils.js';

export function renderPrompts(root) {
  const D = window.OPC.data;
  const S = window.OPC.state;
  let trackFilter = 'all';
  let categoryFilter = 'all';
  let kw = '';

  const tracks = [...new Set(D.prompts.map(p => p.track))];
  const categories = [...new Set(D.prompts.map(p => p.category))];

  const draw = () => {
    const list = D.prompts.filter(p => {
      if (trackFilter !== 'all' && p.track !== trackFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (kw && !(p.title + p.content).toLowerCase().includes(kw.toLowerCase())) return false;
      return true;
    });
    document.getElementById('prompt-grid').innerHTML = list.length ? list.map(p => {
      const fav = S.favoritePrompts.includes(p.id);
      return `
        <div class="prompt-card">
          <div class="prompt-tags">
            <span class="tag tag-primary">${p.track}</span>
            <span class="tag tag-info">${p.category}</span>
          </div>
          <div class="prompt-title">${p.title}</div>
          <div class="prompt-content">${p.content}</div>
          <div class="prompt-actions">
            <button class="btn btn-sm" onclick="window._copyPrompt('${p.id}')"><i class="far fa-copy"></i> 复制</button>
            <button class="btn btn-sm btn-primary" onclick="window._usePrompt('${p.id}')"><i class="fas fa-rocket"></i> 使用</button>
            <button class="btn btn-sm" onclick="window._favPrompt('${p.id}')" style="margin-left:auto;color:${fav ? 'var(--warning)' : ''};"><i class="${fav ? 'fas' : 'far'} fa-star"></i></button>
          </div>
        </div>`;
    }).join('') : '<div class="empty"><i class="fas fa-search"></i><p>没有符合条件的提示词</p></div>';
    document.getElementById('prompt-count').textContent = list.length;
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">✨ 行业提示词库</div>
        <div class="page-subtitle">${D.prompts.length} 个精选提示词 · 9行业 × 5类别 · 显示中 <strong id="prompt-count">${D.prompts.length}</strong> 个</div>
      </div>
      <button class="btn btn-primary"><i class="fas fa-plus"></i> 提交提示词</button>
    </div>

    <div class="card" style="margin-bottom:16px;padding:14px 18px;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px;">
        <strong style="font-size:12px;color:var(--text-muted);width:48px;">行业:</strong>
        <button class="btn btn-sm trk" data-track="all" style="background:var(--primary);color:white;border:none;">全部</button>
        ${tracks.map(t => `<button class="btn btn-sm trk" data-track="${t}">${t}</button>`).join('')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <strong style="font-size:12px;color:var(--text-muted);width:48px;">类别:</strong>
        <button class="btn btn-sm cat" data-cat="all" style="background:var(--primary);color:white;border:none;">全部</button>
        ${categories.map(c => `<button class="btn btn-sm cat" data-cat="${c}">${c}</button>`).join('')}
        <input class="input" id="kw" placeholder="搜索提示词..." style="margin-left:auto;flex:1;max-width:240px;">
      </div>
    </div>

    <div class="grid grid-auto" id="prompt-grid"></div>
  `;

  root.querySelectorAll('.trk').forEach(b => b.onclick = () => {
    trackFilter = b.dataset.track;
    root.querySelectorAll('.trk').forEach(x => { x.style.background = ''; x.style.color = ''; x.style.border = ''; });
    b.style.background = 'var(--primary)'; b.style.color = 'white'; b.style.border = 'none';
    draw();
  });
  root.querySelectorAll('.cat').forEach(b => b.onclick = () => {
    categoryFilter = b.dataset.cat;
    root.querySelectorAll('.cat').forEach(x => { x.style.background = ''; x.style.color = ''; x.style.border = ''; });
    b.style.background = 'var(--primary)'; b.style.color = 'white'; b.style.border = 'none';
    draw();
  });
  root.querySelector('#kw').oninput = e => { kw = e.target.value; draw(); };

  window._copyPrompt = (id) => {
    const p = D.prompts.find(x => x.id === id);
    navigator.clipboard.writeText(p.content).then(() => OPC.toast('已复制到剪贴板', 'success'));
  };
  window._usePrompt = (id) => {
    const p = D.prompts.find(x => x.id === id);
    OPC.toast(`已加载到 AI 工坊：${p.title}`, 'success');
    setTimeout(() => OPC.go('ailab'), 600);
  };
  window._favPrompt = (id) => {
    const i = S.favoritePrompts.indexOf(id);
    if (i >= 0) S.favoritePrompts.splice(i, 1);
    else S.favoritePrompts.push(id);
    OPC.save(); draw();
  };

  draw();
}
