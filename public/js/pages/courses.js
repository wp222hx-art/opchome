// 课程体系（40+ 课程）
import { html, fmtMoney } from '../utils.js';

export function renderCourses(root) {
  const D = window.OPC.data;
  let stageFilter = 'all';
  let typeFilter = 'all';
  let kw = '';

  const types = [...new Set(D.allCourses.map(c => c.type))];

  const draw = () => {
    const list = D.allCourses.filter(c => {
      if (stageFilter !== 'all' && c.stage !== stageFilter) return false;
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (kw && !(c.name + c.id + c.target).toLowerCase().includes(kw.toLowerCase())) return false;
      return true;
    });

    document.getElementById('course-grid').innerHTML = list.length ? list.map(c => {
      const stage = D.courseStages.find(s => s.id === c.stage);
      return `
        <div class="course-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
            <div class="course-cover" style="margin-bottom:0;width:48px;height:48px;font-size:24px;">${c.cover}</div>
            <div style="text-align:right;">
              <span class="tag" style="background:${stage.color}20;color:${stage.color};">${stage.name}</span>
              <div class="course-id" style="margin-top:4px;">${c.id}</div>
            </div>
          </div>
          <div class="course-name">${c.name}</div>
          <div class="course-meta">
            <span class="tag">${c.type}</span>
            <span class="tag tag-info"><i class="far fa-clock"></i> ${c.duration}</span>
          </div>
          <div class="course-target"><strong>👥 目标：</strong>${c.target}</div>
          <div style="margin-top:8px;font-size:11.5px;color:var(--text-muted);"><strong>🛠️ 工具：</strong>${c.tools.slice(0, 4).join(' / ')}${c.tools.length > 4 ? '...' : ''}</div>
          <div style="margin-top:6px;font-size:11.5px;color:var(--text-muted);"><strong>📦 产出：</strong>${c.output}</div>
          <div class="course-footer">
            <span class="course-price">${fmtMoney(c.price)}</span>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-sm" onclick="OPC.go('course-detail',{id:'${c.id}'})"><i class="fas fa-eye"></i> 大纲</button>
              <button class="btn btn-sm btn-primary" onclick="OPC.toast('已加入学习计划: ${c.name}','success')">报名</button>
            </div>
          </div>
        </div>`;
    }).join('') : '<div class="empty"><i class="fas fa-search"></i><p>没有符合条件的课程</p></div>';

    document.getElementById('course-count').textContent = list.length;
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">📚 课程体系 <span style="color:var(--text-muted);font-weight:400;font-size:14px;">认知→技能→实战→商业 四阶递进</span></div>
        <div class="page-subtitle">共 ${D.allCourses.length} 门课程 · 显示中 <strong id="course-count">${D.allCourses.length}</strong> 门</div>
      </div>
    </div>

    <!-- 四阶段导览 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${D.courseStages.map(s => {
        const cnt = D.allCourses.filter(c => c.stage === s.id).length;
        return `
          <div class="stat-card" style="cursor:pointer;border-left:4px solid ${s.color};" onclick="document.querySelector('[data-stage=\\'${s.id}\\']').click()">
            <div class="stat-icon" style="background:${s.color}20;color:${s.color};font-size:24px;">${s.icon}</div>
            <div class="stat-content">
              <div class="label">${s.name}</div>
              <div class="value">${cnt} 门</div>
              <div class="delta" style="color:var(--text-muted);">${s.desc}</div>
            </div>
          </div>`;
      }).join('')}
    </div>

    <!-- 筛选 -->
    <div class="card" style="margin-bottom:16px;padding:14px 18px;">
      <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm" data-stage="all" id="st-all" style="background:var(--primary);color:white;border:none;">全部阶段</button>
          ${D.courseStages.map(s => `<button class="btn btn-sm" data-stage="${s.id}">${s.icon} ${s.name}</button>`).join('')}
        </div>
        <div style="border-left:1px solid var(--border);height:24px;"></div>
        <select class="select" id="type-filter" style="width:auto;">
          <option value="all">全部类型</option>
          ${types.map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>
        <input class="input" id="kw" placeholder="搜索课程名称/编号..." style="flex:1;max-width:280px;">
      </div>
    </div>

    <div class="grid grid-auto" id="course-grid"></div>
  `;

  // 绑定事件
  root.querySelectorAll('[data-stage]').forEach(b => {
    b.onclick = () => {
      stageFilter = b.dataset.stage;
      root.querySelectorAll('[data-stage]').forEach(x => { x.style.background = ''; x.style.color = ''; x.style.border = ''; });
      b.style.background = 'var(--primary)'; b.style.color = 'white'; b.style.border = 'none';
      draw();
    };
  });
  root.querySelector('#type-filter').onchange = (e) => { typeFilter = e.target.value; draw(); };
  root.querySelector('#kw').oninput = (e) => { kw = e.target.value; draw(); };
  draw();
}
