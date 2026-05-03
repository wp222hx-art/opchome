// 场地预约
import { html, fmtMoney, tagFor, statusLabel, openModal } from '../utils.js';

export function renderVenues(root) {
  const D = window.OPC.data;
  let activeView = 'list'; // list | calendar
  let venueFilter = 'all';

  const today = new Date().toISOString().slice(0, 10);
  const todayBookings = D.bookings.filter(b => b.date === today).length;
  const futureBookings = D.bookings.filter(b => b.date >= today).length;
  const monthRev = D.venues.reduce((s, v) => {
    const cnt = D.bookings.filter(b => b.venueId === v.id && b.status !== 'cancelled').length;
    return s + cnt * v.memberPrice * 1.5;
  }, 0);

  const drawList = () => {
    const list = D.bookings
      .filter(b => venueFilter === 'all' || b.venueId === venueFilter)
      .slice(0, 80);
    document.getElementById('booking-tbody').innerHTML = list.map(b => {
      const v = D.venues.find(x => x.id === b.venueId);
      return `
        <tr>
          <td><strong>${b.id}</strong></td>
          <td>${v.icon} ${v.name}</td>
          <td>${b.memberName}</td>
          <td>${b.date}</td>
          <td>${b.startTime} (${b.duration}h)</td>
          <td>${b.purpose}</td>
          <td>${b.priority}</td>
          <td><span class="tag ${tagFor(b.status)}">${statusLabel[b.status]}</span></td>
          <td>
            <button class="btn btn-sm"><i class="fas fa-eye"></i></button>
            ${b.status === 'pending' ? '<button class="btn btn-sm btn-success"><i class="fas fa-check"></i></button>' : ''}
          </td>
        </tr>`;
    }).join('');
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🏢 场地预约管理</div>
        <div class="page-subtitle">7 类场地 · 优先级：战略 → 孵化 → 高级 → 标准 → 外部</div>
      </div>
      <button class="btn btn-primary" onclick="window._newBooking()"><i class="fas fa-plus"></i> 新建预约</button>
    </div>

    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-calendar-day"></i></div><div class="stat-content"><div class="label">今日预约</div><div class="value">${todayBookings}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-calendar-week"></i></div><div class="stat-content"><div class="label">未来预约</div><div class="value">${futureBookings}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-percent"></i></div><div class="stat-content"><div class="label">空间利用率</div><div class="value">72%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-coins"></i></div><div class="stat-content"><div class="label">本月场地收入</div><div class="value">${fmtMoney(monthRev)}</div></div></div>
    </div>

    <!-- 场地概览 -->
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span><i class="fas fa-th-large"></i> 场地资源</span></div>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">
        ${D.venues.map(v => {
          const cnt = D.bookings.filter(b => b.venueId === v.id && b.date >= today).length;
          return `
            <div onclick="window._filterVenue('${v.id}')" style="padding:14px;border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:all .15s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="font-size:24px;">${v.icon}</div>
              <div style="font-weight:700;margin:4px 0;">${v.name}</div>
              <div style="font-size:11px;color:var(--text-muted);">${v.type} · ${v.capacity}人</div>
              <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;">
                <span>会员价 <strong style="color:var(--success);">${fmtMoney(v.memberPrice)}/${v.unit}</strong></span>
                <span class="tag tag-info">${cnt}单</span>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>

    <!-- 预约表 -->
    <div class="card" style="padding:0;">
      <div style="padding:14px 18px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--border);">
        <button class="btn btn-sm vf" data-vid="all" style="background:var(--primary);color:white;border:none;">全部场地</button>
        ${D.venues.map(v => `<button class="btn btn-sm vf" data-vid="${v.id}">${v.icon} ${v.name}</button>`).join('')}
      </div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>预约号</th><th>场地</th><th>会员</th><th>日期</th><th>时段</th><th>用途</th><th>优先级</th><th>状态</th><th></th></tr></thead>
        <tbody id="booking-tbody"></tbody>
      </table></div>
    </div>
  `;

  root.querySelectorAll('.vf').forEach(b => b.onclick = () => {
    venueFilter = b.dataset.vid;
    root.querySelectorAll('.vf').forEach(x => { x.style.background = ''; x.style.color = ''; x.style.border = ''; });
    b.style.background = 'var(--primary)'; b.style.color = 'white'; b.style.border = 'none';
    drawList();
  });
  window._filterVenue = (id) => { const b = root.querySelector(`.vf[data-vid="${id}"]`); if (b) b.click(); };
  window._newBooking = () => openModal({
    title: '新建场地预约',
    body: `
      <div class="form-group"><label class="label">选择场地</label><select class="select">${D.venues.map(v => `<option>${v.icon} ${v.name}</option>`).join('')}</select></div>
      <div class="grid grid-2" style="gap:10px;">
        <div class="form-group"><label class="label">日期</label><input class="input" type="date" value="${today}"></div>
        <div class="form-group"><label class="label">开始时间</label><input class="input" type="time" value="09:00"></div>
      </div>
      <div class="form-group"><label class="label">时长（小时）</label><input class="input" type="number" value="2" min="1"></div>
      <div class="form-group"><label class="label">用途说明</label><textarea class="textarea" placeholder="项目拍摄/会议/培训..."></textarea></div>`,
    footer: `<button class="btn" data-close>取消</button><button class="btn btn-primary" onclick="OPC.toast('预约已提交，待审核','success');document.querySelector('.modal-mask').remove();">提交</button>`
  });
  drawList();
}
