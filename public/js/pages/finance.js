// 财务看板
import { html, fmtMoney, makeChart } from '../utils.js';

export function renderFinance(root) {
  const D = window.OPC.data;
  const f = D.financeData;

  const totalRev = f.monthlyRevenue.reduce((s, r) => s + r.current, 0);
  const totalCost = f.monthlyCost.reduce((s, c) => s + c.amount, 0);
  const fixedCost = f.monthlyCost.filter(c => c.type_en === 'fixed').reduce((s, c) => s + c.amount, 0);
  const variableCost = f.monthlyCost.filter(c => c.type_en === 'variable').reduce((s, c) => s + c.amount, 0);
  const profit = totalRev - totalCost;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">💰 财务看板</div>
        <div class="page-subtitle">收入预算、成本核算、ROI 分析、盈亏平衡</div>
      </div>
      <div style="display:flex;gap:8px;">
        <select class="select" style="width:auto;"><option>2026年5月</option><option>2026年4月</option><option>全年</option></select>
        <button class="btn"><i class="fas fa-file-pdf"></i> 导出报表</button>
      </div>
    </div>

    <!-- 顶部 KPI -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-arrow-trend-up"></i></div><div class="stat-content"><div class="label">本月收入</div><div class="value">${fmtMoney(totalRev)}</div><div class="delta up">同比 +18%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-arrow-trend-down"></i></div><div class="stat-content"><div class="label">本月成本</div><div class="value">${fmtMoney(totalCost)}</div><div class="delta">固定 ${Math.round(fixedCost / totalCost * 100)}%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:${profit >= 0 ? '#eef2ff' : '#fee2e2'};color:${profit >= 0 ? '#6366f1' : '#ef4444'};"><i class="fas fa-coins"></i></div><div class="stat-content"><div class="label">本月利润</div><div class="value" style="color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'};">${fmtMoney(profit)}</div><div class="delta">毛利率 ${Math.round(profit / totalRev * 100)}%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-bullseye"></i></div><div class="stat-content"><div class="label">营收达成率</div><div class="value">87%</div><div class="delta up">距目标 ¥21,400</div></div></div>
    </div>

    <!-- 图表 -->
    <div class="grid" style="grid-template-columns:1.5fr 1fr;gap:16px;margin-bottom:20px;">
      <div class="card">
        <div class="card-title"><span><i class="fas fa-chart-line"></i> 12 个月收入/成本/利润趋势</span></div>
        <div style="height:280px;"><canvas id="trend"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title"><span><i class="fas fa-chart-pie"></i> 收入结构</span></div>
        <div style="height:280px;"><canvas id="pie-rev"></canvas></div>
      </div>
    </div>

    <!-- 收入明细 -->
    <div class="grid grid-2" style="margin-bottom:20px;">
      <div class="card">
        <div class="card-title"><span><i class="fas fa-arrow-up"></i> 收入分项（月度）</span></div>
        <table class="table">
          <thead><tr><th>类型</th><th>当月</th><th>保守</th><th>乐观</th><th>达成</th></tr></thead>
          <tbody>
            ${f.monthlyRevenue.map(r => `
              <tr>
                <td>${r.type}</td>
                <td><strong>${fmtMoney(r.current)}</strong></td>
                <td style="color:var(--text-muted);">${fmtMoney(r.conservative)}</td>
                <td style="color:var(--text-muted);">${fmtMoney(r.optimistic)}</td>
                <td><span class="tag ${r.current >= r.conservative ? 'tag-success' : 'tag-warning'}">${Math.round(r.current / r.conservative * 100)}%</span></td>
              </tr>`).join('')}
            <tr style="font-weight:700;background:var(--bg-hover);">
              <td>合计</td><td>${fmtMoney(totalRev)}</td><td colspan="3">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-title"><span><i class="fas fa-arrow-down"></i> 成本分项（月度）</span></div>
        <table class="table">
          <thead><tr><th>类型</th><th>金额</th><th>占比</th><th>类型</th></tr></thead>
          <tbody>
            ${f.monthlyCost.map(c => `
              <tr>
                <td>${c.type}</td>
                <td><strong>${fmtMoney(c.amount)}</strong></td>
                <td><div class="progress" style="height:6px;"><div class="progress-bar" style="width:${c.ratio * 2}%;"></div></div><div style="font-size:11px;margin-top:2px;">${c.ratio}%</div></td>
                <td><span class="tag ${c.type_en === 'fixed' ? 'tag-info' : 'tag-warning'}">${c.type_en === 'fixed' ? '固定' : '可变'}</span></td>
              </tr>`).join('')}
            <tr style="font-weight:700;background:var(--bg-hover);">
              <td>合计</td><td>${fmtMoney(totalCost)}</td><td colspan="2">固定 ${fmtMoney(fixedCost)} + 可变 ${fmtMoney(variableCost)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 会员增长预测 -->
    <div class="card">
      <div class="card-title"><span><i class="fas fa-users-line"></i> 会员增长预测模型</span></div>
      <table class="table">
        <thead><tr><th>月份</th><th>体验</th><th>标准</th><th>高级</th><th>孵化</th><th>付费总数</th><th>会员月收入</th></tr></thead>
        <tbody>
          ${f.memberGrowth.map(g => `
            <tr>
              <td><strong>${g.month}</strong></td>
              <td>${g.exp}</td>
              <td>${g.std}</td>
              <td>${g.sr}</td>
              <td>${g.inc}</td>
              <td><strong style="color:var(--primary);">${g.paid}</strong></td>
              <td><strong style="color:var(--success);">${fmtMoney(g.revenue)}</strong></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div style="margin-top:12px;font-size:12px;color:var(--text-muted);"><i class="fas fa-info-circle"></i> 假设：月新增 15 人，流失率 20%，升级率 10%</div>
    </div>
  `;

  setTimeout(() => {
    makeChart(document.getElementById('trend').getContext('2d'), 'line', {
      labels: f.trend.map(t => t.month.slice(5)),
      datasets: [
        { label: '收入', data: f.trend.map(t => t.revenue), borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.12)', fill: true, tension: 0.3 },
        { label: '成本', data: f.trend.map(t => t.cost), borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)', fill: true, tension: 0.3 },
        { label: '利润', data: f.trend.map(t => t.profit), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.12)', fill: true, tension: 0.3 }
      ]
    }, { plugins: { legend: { position: 'bottom' } } });

    makeChart(document.getElementById('pie-rev').getContext('2d'), 'doughnut', {
      labels: f.monthlyRevenue.map(r => r.type),
      datasets: [{ data: f.monthlyRevenue.map(r => r.current), backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#94a3b8'] }]
    }, { plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } });
  }, 100);
}
