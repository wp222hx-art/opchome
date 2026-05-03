// KPI 考核
import { html, makeChart } from '../utils.js';

export function renderKpi(root) {
  const D = window.OPC.data;

  const calcScore = (item) => {
    if (item.target === 0 && item.actual === 0) return 100;
    const t = item.target || 0.001;
    const ratio = item.reverse
      ? Math.min(100, (1 - item.actual / Math.max(t, 0.001)) * 100 + 100) // 越低越好（actual<=target为100，超过就降）
      : Math.min(120, item.actual / t * 100);
    if (item.reverse) {
      return item.actual <= t ? 100 : Math.max(0, 100 - (item.actual - t) / t * 100);
    }
    return Math.max(0, Math.min(120, ratio));
  };

  const calcRoleScore = (role) => {
    let total = 0;
    role.items.forEach(it => { total += calcScore(it) * it.weight / 100; });
    return total;
  };

  const overallScore = D.kpiData.reduce((s, r) => s + calcRoleScore(r), 0) / D.kpiData.length;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🎯 KPI 考核中心</div>
        <div class="page-subtitle">岗位 KPI 实时追踪 · 月度评分 · 整体绩效 <strong style="color:${overallScore >= 90 ? 'var(--success)' : overallScore >= 70 ? 'var(--warning)' : 'var(--danger)'};">${overallScore.toFixed(1)}</strong> 分</div>
      </div>
    </div>

    <!-- 岗位评分概览 -->
    <div class="grid" style="grid-template-columns: 1.5fr 1fr; gap: 16px; margin-bottom:20px;">
      <div class="card">
        <div class="card-title"><span><i class="fas fa-chart-bar"></i> 各岗位综合得分</span></div>
        <div style="height:280px;"><canvas id="role-bar"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title"><span><i class="fas fa-radar-chart"></i> 岗位达成度雷达</span></div>
        <div style="height:280px;"><canvas id="role-radar"></canvas></div>
      </div>
    </div>

    <!-- 各岗位详细 -->
    ${D.kpiData.map(role => {
      const score = calcRoleScore(role);
      return `
        <div class="card" style="margin-bottom:14px;">
          <div class="card-title">
            <span><i class="fas fa-user-tie"></i> ${role.role}</span>
            <span class="tag ${score >= 90 ? 'tag-success' : score >= 70 ? 'tag-warning' : 'tag-danger'}" style="font-size:14px;">综合得分 ${score.toFixed(1)} 分</span>
          </div>
          <table class="table">
            <thead><tr><th>指标</th><th>目标</th><th>实际</th><th>权重</th><th>达成度</th><th>得分</th></tr></thead>
            <tbody>
              ${role.items.map(it => {
                const sc = calcScore(it);
                const achievement = it.reverse
                  ? (it.actual <= it.target ? '✓' : '✗')
                  : (it.actual >= it.target ? '✓' : '✗');
                return `
                  <tr>
                    <td>${it.name}</td>
                    <td>${it.target}${it.unit}</td>
                    <td><strong>${it.actual}${it.unit}</strong></td>
                    <td>${it.weight}%</td>
                    <td>
                      <div class="progress" style="height:6px;"><div style="width:${Math.min(100, sc)}%;height:100%;background:${sc >= 100 ? 'var(--success)' : sc >= 70 ? 'var(--warning)' : 'var(--danger)'};border-radius:3px;"></div></div>
                      <span style="font-size:11px;color:${sc >= 100 ? 'var(--success)' : sc >= 70 ? 'var(--warning)' : 'var(--danger)'};">${achievement} ${sc.toFixed(0)}%</span>
                    </td>
                    <td><strong>${sc.toFixed(1)}</strong></td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }).join('')}
  `;

  setTimeout(() => {
    const labels = D.kpiData.map(r => r.role);
    const scores = D.kpiData.map(r => calcRoleScore(r));

    makeChart(document.getElementById('role-bar').getContext('2d'), 'bar', {
      labels,
      datasets: [{ label: '综合得分', data: scores, backgroundColor: scores.map(s => s >= 90 ? '#10b981' : s >= 70 ? '#f59e0b' : '#ef4444'), borderRadius: 6 }]
    }, { plugins: { legend: { display: false } }, scales: { y: { max: 110 } } });

    makeChart(document.getElementById('role-radar').getContext('2d'), 'radar', {
      labels,
      datasets: [{
        label: '达成度', data: scores,
        backgroundColor: 'rgba(168,85,247,0.18)', borderColor: '#a855f7',
        pointBackgroundColor: '#a855f7'
      }]
    }, { scales: { r: { min: 0, max: 110, ticks: { stepSize: 20 } } }, plugins: { legend: { display: false } } });
  }, 100);
}
