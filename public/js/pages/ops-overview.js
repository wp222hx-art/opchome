// 运营总览
import { html, fmtMoney, makeChart } from '../utils.js';

export function renderOpsOverview(root) {
  const D = window.OPC.data;
  const totalMembers = D.members.length;
  const activeMembers = D.members.filter(m => m.status === 'active').length;
  const todayBookings = D.bookings.filter(b => b.date === new Date().toISOString().slice(0, 10)).length;
  const upcomingEvents = D.events.filter(e => e.status === 'upcoming' || e.status === 'planning').length;
  const monthRev = D.financeData.monthlyRevenue.reduce((s, r) => s + r.current, 0);
  const monthCost = D.financeData.monthlyCost.reduce((s, c) => s + c.amount, 0);
  const profit = monthRev - monthCost;

  const pendingTickets = D.tickets.filter(t => t.status !== 'resolved').length;
  const equipBroken = D.equipment.reduce((s, e) => s + e.broken, 0);

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🎯 运营总览</div>
        <div class="page-subtitle">实时关键指标 · 围绕"有序运营、稳定活跃、持续产出、可持续变现"四大目标</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn"><i class="fas fa-download"></i> 导出日报</button>
        <button class="btn btn-primary" onclick="OPC.go('finance')"><i class="fas fa-coins"></i> 财务详情</button>
      </div>
    </div>

    <!-- 核心指标 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card">
        <div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-users"></i></div>
        <div class="stat-content"><div class="label">付费会员</div><div class="value">${activeMembers}</div><div class="delta up">+18 本月新增</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-coins"></i></div>
        <div class="stat-content"><div class="label">本月收入</div><div class="value">${fmtMoney(monthRev)}</div><div class="delta up">达成率 87%</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:${profit >= 0 ? '#fef3c7' : '#fee2e2'};color:${profit >= 0 ? '#f59e0b' : '#ef4444'};"><i class="fas fa-chart-line"></i></div>
        <div class="stat-content"><div class="label">本月利润</div><div class="value" style="color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'};">${fmtMoney(profit)}</div><div class="delta">毛利率 ${Math.round(profit / monthRev * 100)}%</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-calendar-day"></i></div>
        <div class="stat-content"><div class="label">今日预约</div><div class="value">${todayBookings}</div><div class="delta up">空间利用 72%</div></div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px;">
      <div class="card">
        <div class="card-title">
          <span><i class="fas fa-chart-column"></i> 12 个月经营趋势</span>
          <span class="tag tag-info">第 ${D.financeData.trend.findIndex(t => t.profit >= 0) + 1} 个月起开始盈利</span>
        </div>
        <div style="height:280px;"><canvas id="trend-chart"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title"><span><i class="fas fa-bell"></i> 待办与告警</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${pendingTickets > 0 ? `<div style="display:flex;gap:10px;padding:12px;background:#fef3c7;border-radius:8px;border-left:4px solid var(--warning);">
            <i class="fas fa-ticket" style="font-size:20px;color:#92400e;"></i>
            <div style="flex:1;"><div style="font-weight:600;">${pendingTickets} 个待处理工单</div><div style="font-size:12px;color:var(--text-muted);">含报修/投诉/违规</div></div>
            <button class="btn btn-sm" onclick="OPC.go('tickets')">处理</button>
          </div>` : ''}
          ${equipBroken > 0 ? `<div style="display:flex;gap:10px;padding:12px;background:#fee2e2;border-radius:8px;border-left:4px solid var(--danger);">
            <i class="fas fa-screwdriver-wrench" style="font-size:20px;color:#b91c1c;"></i>
            <div style="flex:1;"><div style="font-weight:600;">${equipBroken} 件设备故障</div><div style="font-size:12px;color:var(--text-muted);">需技术支持响应</div></div>
            <button class="btn btn-sm" onclick="OPC.go('equipment')">查看</button>
          </div>` : ''}
          <div style="display:flex;gap:10px;padding:12px;background:#cffafe;border-radius:8px;border-left:4px solid var(--info);">
            <i class="fas fa-calendar-check" style="font-size:20px;color:#0e7490;"></i>
            <div style="flex:1;"><div style="font-weight:600;">${upcomingEvents} 场活动待开</div><div style="font-size:12px;color:var(--text-muted);">含路演/分享会/训练营</div></div>
            <button class="btn btn-sm" onclick="OPC.go('events')">详情</button>
          </div>
          <div style="display:flex;gap:10px;padding:12px;background:#d1fae5;border-radius:8px;border-left:4px solid var(--success);">
            <i class="fas fa-clipboard-check" style="font-size:20px;color:#047857;"></i>
            <div style="flex:1;"><div style="font-weight:600;">日常 SOP 已完成 5/7</div><div style="font-size:12px;color:var(--text-muted);">距闭馆 SOP 还有 4 小时</div></div>
            <button class="btn btn-sm" onclick="OPC.go('sop')">查看</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 三个快捷模块 -->
    <div class="grid grid-3">
      <div class="card">
        <div class="card-title">
          <span><i class="fas fa-users"></i> 会员构成</span>
          <button class="btn btn-sm" onclick="OPC.go('members')">详情</button>
        </div>
        ${D.memberLevels.map(lv => {
          const cnt = D.members.filter(m => m.level === lv.id).length;
          const pct = Math.round(cnt / totalMembers * 100);
          return `
            <div style="margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12.5px;">
                <span>${lv.icon} ${lv.name}</span><span style="color:${lv.color};font-weight:700;">${cnt}人 · ${pct}%</span>
              </div>
              <div class="progress" style="height:6px;"><div style="width:${pct}%;height:100%;background:${lv.color};border-radius:3px;"></div></div>
            </div>`;
        }).join('')}
      </div>

      <div class="card">
        <div class="card-title">
          <span><i class="fas fa-building"></i> 场地利用</span>
          <button class="btn btn-sm" onclick="OPC.go('venues')">详情</button>
        </div>
        ${D.venues.map(v => {
          const todayCnt = D.bookings.filter(b => b.venueId === v.id && b.date === new Date().toISOString().slice(0, 10)).length;
          const usage = Math.min(100, todayCnt * 25);
          return `
            <div style="margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px;">
                <span>${v.icon} ${v.name}</span><span style="color:var(--primary);font-weight:600;">${todayCnt} 单</span>
              </div>
              <div class="progress" style="height:6px;"><div class="progress-bar" style="width:${usage}%;"></div></div>
            </div>`;
        }).join('')}
      </div>

      <div class="card">
        <div class="card-title">
          <span><i class="fas fa-calendar-check"></i> 近期活动</span>
          <button class="btn btn-sm" onclick="OPC.go('events')">详情</button>
        </div>
        ${D.events.slice(0, 5).map(e => {
          const t = D.eventTypes.find(t => t.id === e.type);
          return `
            <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px dashed var(--border);">
              <div style="font-size:24px;">${t.icon}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.name}</div>
                <div style="font-size:11.5px;color:var(--text-muted);">${e.date} · ${e.registered}/${e.expected} 报名</div>
              </div>
              <span class="tag tag-${e.status === 'completed' ? 'success' : e.status === 'upcoming' ? 'warning' : 'info'}" style="font-size:10px;">${e.status === 'completed' ? '已完成' : e.status === 'upcoming' ? '即将' : e.status === 'in_progress' ? '进行中' : '筹备'}</span>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;

  setTimeout(() => {
    const ctx = document.getElementById('trend-chart').getContext('2d');
    makeChart(ctx, 'bar', {
      labels: D.financeData.trend.map(t => t.month.slice(5)),
      datasets: [
        { label: '收入', data: D.financeData.trend.map(t => t.revenue), backgroundColor: '#6366f1' },
        { label: '成本', data: D.financeData.trend.map(t => t.cost), backgroundColor: '#fbbf24' },
        { label: '利润', data: D.financeData.trend.map(t => t.profit), type: 'line', borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.3 }
      ]
    }, { plugins: { legend: { position: 'bottom' } } });
  }, 100);
}
