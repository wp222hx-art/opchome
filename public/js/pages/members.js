// 会员管理
import { html, fmtMoney, tagFor, statusLabel, openModal } from '../utils.js';

export function renderMembers(root) {
  const D = window.OPC.data;
  let levelFilter = 'all';
  let kw = '';

  const draw = () => {
    const list = D.members.filter(m => {
      if (levelFilter !== 'all' && m.level !== levelFilter) return false;
      if (kw && !(m.name + m.id + m.phone + m.track).toLowerCase().includes(kw.toLowerCase())) return false;
      return true;
    });
    document.getElementById('mem-tbody').innerHTML = list.map(m => {
      const lv = D.memberLevels.find(l => l.id === m.level);
      return `
        <tr>
          <td><div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:50%;background:${lv.color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;">${m.avatar}</div>
            <div><div style="font-weight:600;">${m.name}</div><div style="font-size:11px;color:var(--text-muted);">${m.id}</div></div>
          </div></td>
          <td><span class="tag" style="background:${lv.color}20;color:${lv.color};">${lv.icon} ${lv.name}</span></td>
          <td>${m.phone}</td>
          <td>${m.track}</td>
          <td>${m.joinDate}</td>
          <td><span style="color:${m.status === 'expiring' ? 'var(--warning)' : ''};">${m.expireDate}</span></td>
          <td><strong>${m.points}</strong></td>
          <td><span class="tag ${tagFor(m.status)}">${statusLabel[m.status]}</span></td>
          <td>
            <button class="btn btn-sm" onclick="window._showMember('${m.id}')"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm"><i class="fas fa-edit"></i></button>
          </td>
        </tr>`;
    }).join('');
    document.getElementById('mem-count').textContent = list.length;
  };

  window._showMember = (id) => {
    const m = D.members.find(x => x.id === id);
    const lv = D.memberLevels.find(l => l.id === m.level);
    const rights = D.memberRights[m.level];
    openModal({
      title: `${m.name} · ${lv.name}`,
      body: `
        <div class="grid grid-2" style="gap:12px;font-size:13px;">
          <div><strong>会员ID：</strong>${m.id}</div>
          <div><strong>电话：</strong>${m.phone}</div>
          <div><strong>邮箱：</strong>${m.email}</div>
          <div><strong>赛道：</strong>${m.track}</div>
          <div><strong>加入：</strong>${m.joinDate}</div>
          <div><strong>到期：</strong>${m.expireDate}</div>
          <div><strong>积分：</strong>${m.points}</div>
          <div><strong>活跃度：</strong>${m.activeScore}/100</div>
          <div><strong>公司类型：</strong>${m.company}</div>
          <div><strong>最近来访：</strong>${m.lastVisit}</div>
        </div>
        <h4 style="margin:16px 0 8px;">权益</h4>
        <table class="table">
          <tr><td>共享工位</td><td>${rights.workspace || '❌'}</td></tr>
          <tr><td>会议室</td><td>${rights.meeting === false ? '❌' : rights.meeting + (typeof rights.meeting === 'number' ? '小时/月' : '')}</td></tr>
          <tr><td>棚区</td><td>${rights.studio === false ? '❌' : rights.studio + (typeof rights.studio === 'number' ? '小时/月' : '')}</td></tr>
          <tr><td>设备借用</td><td>${rights.equipment || '❌'}</td></tr>
          <tr><td>导师资源</td><td>${rights.mentor ? rights.mentor + ' 次/月' : '❌'}</td></tr>
        </table>`,
      footer: `<button class="btn" data-close>关闭</button><button class="btn btn-primary">续费/升级</button>`
    });
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">👥 会员管理</div>
        <div class="page-subtitle">共 ${D.members.length} 位会员 · 显示 <strong id="mem-count">${D.members.length}</strong></div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn"><i class="fas fa-file-import"></i> 导入</button>
        <button class="btn"><i class="fas fa-file-export"></i> 导出</button>
        <button class="btn btn-primary"><i class="fas fa-user-plus"></i> 新增会员</button>
      </div>
    </div>

    <!-- 等级统计 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${D.memberLevels.map(lv => {
        const cnt = D.members.filter(m => m.level === lv.id).length;
        const rev = cnt * lv.monthlyFee;
        return `
          <div class="stat-card" style="cursor:pointer;border-left:4px solid ${lv.color};" onclick="window._filterLevel('${lv.id}')">
            <div class="stat-icon" style="background:${lv.color}20;color:${lv.color};font-size:22px;">${lv.icon}</div>
            <div class="stat-content"><div class="label">${lv.name}</div><div class="value">${cnt}<span style="font-size:13px;color:var(--text-muted);">人</span></div><div class="delta" style="color:${lv.color};">${fmtMoney(rev)}/月</div></div>
          </div>`;
      }).join('')}
    </div>

    <!-- 表格 -->
    <div class="card" style="padding:0;">
      <div style="padding:14px 18px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--border);">
        <button class="btn btn-sm lvl" data-level="all" style="background:var(--primary);color:white;border:none;">全部</button>
        ${D.memberLevels.map(lv => `<button class="btn btn-sm lvl" data-level="${lv.id}">${lv.icon} ${lv.name}</button>`).join('')}
        <input class="input" id="kw" placeholder="搜索姓名/ID/电话..." style="margin-left:auto;flex:1;max-width:240px;">
      </div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>会员</th><th>等级</th><th>电话</th><th>赛道</th><th>加入</th><th>到期</th><th>积分</th><th>状态</th><th></th></tr></thead>
        <tbody id="mem-tbody"></tbody>
      </table></div>
    </div>
  `;

  root.querySelectorAll('.lvl').forEach(b => b.onclick = () => {
    levelFilter = b.dataset.level;
    root.querySelectorAll('.lvl').forEach(x => { x.style.background = ''; x.style.color = ''; x.style.border = ''; });
    b.style.background = 'var(--primary)'; b.style.color = 'white'; b.style.border = 'none';
    draw();
  });
  root.querySelector('#kw').oninput = e => { kw = e.target.value; draw(); };
  window._filterLevel = (id) => { const b = root.querySelector(`.lvl[data-level="${id}"]`); if (b) b.click(); };
  draw();
}
