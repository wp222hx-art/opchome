// 活动管理
import { html, fmtMoney, tagFor, statusLabel } from '../utils.js';

export function renderEvents(root) {
  const D = window.OPC.data;

  const total = D.events.length;
  const completed = D.events.filter(e => e.status === 'completed').length;
  const totalBudget = D.events.reduce((s, e) => s + e.budget, 0);
  const totalAttend = D.events.reduce((s, e) => s + e.attended, 0);
  const totalLeads = D.events.reduce((s, e) => s + e.leads, 0);
  const totalConverted = D.events.reduce((s, e) => s + e.converted, 0);

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">📅 活动管理</div>
        <div class="page-subtitle">活动六步法：立项 → 筹备 → 预热 → 现场执行 → 收尾 → 复盘</div>
      </div>
      <button class="btn btn-primary"><i class="fas fa-plus"></i> 新建活动</button>
    </div>

    <!-- 统计 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-calendar-alt"></i></div><div class="stat-content"><div class="label">活动总数</div><div class="value">${total}</div><div class="delta">已完成 ${completed}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-users"></i></div><div class="stat-content"><div class="label">累计到场</div><div class="value">${totalAttend}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-magnet"></i></div><div class="stat-content"><div class="label">线索/转化</div><div class="value">${totalLeads}/${totalConverted}</div><div class="delta up">转化率 ${Math.round(totalConverted / Math.max(totalLeads, 1) * 100)}%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-coins"></i></div><div class="stat-content"><div class="label">预算总投入</div><div class="value">${fmtMoney(totalBudget)}</div></div></div>
    </div>

    <!-- 活动类型 -->
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span><i class="fas fa-shapes"></i> 活动类型与频次（建议月度）</span></div>
      <div class="grid grid-3">
        ${D.eventTypes.map(t => `
          <div style="padding:14px;border:1px solid var(--border);border-radius:10px;border-left:4px solid ${t.color};">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:24px;">${t.icon}</div>
              <span class="tag" style="background:${t.color}20;color:${t.color};">月 ${t.frequency} 次</span>
            </div>
            <div style="font-weight:700;margin:8px 0 4px;">${t.name}</div>
            <div style="font-size:12px;color:var(--text-muted);">规模 ${t.size} 人 · 单次预算 ${fmtMoney(t.budget)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 活动列表 -->
    <div class="card" style="padding:0;">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);font-weight:700;"><i class="fas fa-list"></i> 活动列表</div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>活动</th><th>类型</th><th>日期/时间</th><th>负责人</th><th>报名/到场</th><th>满意度</th><th>线索/转化</th><th>预算</th><th>状态</th></tr></thead>
        <tbody>
          ${D.events.map(e => {
            const t = D.eventTypes.find(x => x.id === e.type);
            return `
              <tr>
                <td><strong>${e.name}</strong>${e.sponsor ? `<div style="font-size:11px;color:var(--accent);margin-top:3px;">🏷️ 赞助：${e.sponsor} (${fmtMoney(e.sponsorRevenue)})</div>` : ''}</td>
                <td><span class="tag" style="background:${t.color}20;color:${t.color};">${t.icon} ${t.name}</span></td>
                <td>${e.date}<div style="font-size:11px;color:var(--text-muted);">${e.time}</div></td>
                <td>${e.host}</td>
                <td>${e.registered}/${e.expected}<br><span style="font-size:11px;color:${e.attended ? 'var(--success)' : 'var(--text-muted)'};">到场 ${e.attended}</span></td>
                <td>${e.satisfaction ? '⭐ ' + e.satisfaction.toFixed(1) : '-'}</td>
                <td>${e.leads > 0 ? `${e.leads} → <strong style="color:var(--success);">${e.converted}</strong>` : '-'}</td>
                <td>${fmtMoney(e.budget)}<br><span style="font-size:11px;color:var(--text-muted);">实际 ${fmtMoney(e.actualCost)}</span></td>
                <td><span class="tag ${tagFor(e.status)}">${statusLabel[e.status]}</span></td>
              </tr>`;
          }).join('')}
        </tbody>
      </table></div>
    </div>

    <!-- 活动六步法 -->
    <div class="card" style="margin-top:16px;">
      <div class="card-title"><span><i class="fas fa-list-ol"></i> 活动六步法 SOP</span></div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;">
        ${[
          { n: 1, name: '立项', t: 'T-21~14天', desc: '名称/日期/目标/预算/转化目标' },
          { n: 2, name: '筹备', t: 'T-14~7天', desc: '嘉宾/海报/技术/物料' },
          { n: 3, name: '预热', t: 'T-7~1天', desc: '公众号/社群/定向邀约' },
          { n: 4, name: '现场执行', t: 'T 当日', desc: '总控/接待/技术/转化' },
          { n: 5, name: '收尾', t: 'T+2h', desc: '场地恢复/资料归档' },
          { n: 6, name: '复盘', t: 'T+24h', desc: '数据/转化/改进/下一步' }
        ].map(s => `
          <div style="padding:10px;background:var(--bg-hover);border-radius:8px;text-align:center;">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--gradient);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 6px;">${s.n}</div>
            <div style="font-weight:700;font-size:13px;">${s.name}</div>
            <div style="font-size:11px;color:var(--primary);margin-top:2px;">${s.t}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
