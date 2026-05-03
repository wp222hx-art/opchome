// 学习进度（雷达图 + 进度条 + 时间线）
import { html, makeChart, progressBar } from '../utils.js';

export function renderProgress(root) {
  const D = window.OPC.data;
  const S = window.OPC.state;
  const baseDone = D.baseLessons.filter(l => S.completedLessons.includes(l.id)).length;
  const basePct = Math.round(baseDone / D.baseLessons.length * 100);

  const trackData = D.tracks.map(t => {
    const done = S.completedLessons.filter(id => id.startsWith(t.id + '-')).length;
    return { ...t, done, pct: Math.round(done / 12 * 100) };
  });

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">📈 学习进度报告</div>
        <div class="page-subtitle">基于 Chart.js 的可视化数据看板</div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:1.2fr 1fr;gap:16px;margin-bottom:20px;">
      <div class="card">
        <div class="card-title"><span><i class="fas fa-chart-area"></i> 8大赛道完成度雷达图</span></div>
        <div style="height:340px;"><canvas id="radar"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title"><span><i class="fas fa-tasks"></i> 进度矩阵</span></div>
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
            <strong>📚 通用基础课程</strong>
            <span style="color:var(--primary);font-weight:700;">${baseDone}/${D.baseLessons.length}</span>
          </div>
          ${progressBar(basePct)}
        </div>
        ${trackData.map(t => `
          <div style="margin-top:10px;">
            <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px;">
              <span>${t.icon} ${t.name}</span>
              <span style="color:${t.color};font-weight:700;">${t.done}/12</span>
            </div>
            <div class="progress" style="height:6px;"><div style="width:${t.pct}%;height:100%;background:${t.color};border-radius:3px;"></div></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span><i class="fas fa-history"></i> 学习时间线</span></div>
      ${S.timeline.length ? `
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${S.timeline.slice(0, 20).map(t => `
            <div style="display:flex;gap:14px;padding:12px;background:var(--bg-hover);border-radius:8px;">
              <div style="width:8px;background:var(--gradient);border-radius:4px;"></div>
              <div style="flex:1;">
                <div style="font-weight:600;">${t.title}</div>
                <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">${new Date(t.time).toLocaleString('zh-CN')}</div>
              </div>
              <span class="tag tag-success"><i class="fas fa-check"></i> 已完成</span>
            </div>
          `).join('')}
        </div>` : '<div class="empty"><i class="far fa-calendar"></i><p>还没有学习记录，快去开始第一堂课吧！</p></div>'}
    </div>
  `;

  setTimeout(() => {
    const ctx = document.getElementById('radar').getContext('2d');
    makeChart(ctx, 'radar', {
      labels: trackData.map(t => t.name),
      datasets: [{
        label: '完成度 %',
        data: trackData.map(t => t.pct),
        backgroundColor: 'rgba(99, 102, 241, 0.18)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366f1'
      }]
    }, {
      scales: {
        r: { min: 0, max: 100, ticks: { stepSize: 25, color: '#94a3b8' }, grid: { color: '#e2e8f0' }, pointLabels: { color: '#475569', font: { size: 12, weight: '600' } } }
      },
      plugins: { legend: { display: false } }
    });
  }, 100);
}
