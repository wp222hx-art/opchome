// 8大行业赛道
import { html, progressBar } from '../utils.js';
import { trackLessons, trackStages } from '../data/track-lessons.js';

export function renderTracks(root) {
  const D = window.OPC.data;
  const S = window.OPC.state;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🚀 8大行业赛道</div>
        <div class="page-subtitle">每个赛道 12 课时 · 4 阶段：认知 → 落地 → 深化 → 变现</div>
      </div>
    </div>

    <div class="grid grid-2">
      ${D.tracks.map(t => {
        const lessons = trackLessons[t.id] || [];
        const done = S.completedLessons.filter(id => id.startsWith(t.id + '-')).length;
        const pct = lessons.length ? Math.round(done / lessons.length * 100) : 0;
        const byStage = trackStages.map(s => ({
          ...s,
          done: lessons.filter(l => l.stage === s.code && S.completedLessons.includes(l.id)).length,
          total: lessons.filter(l => l.stage === s.code).length
        }));
        return `
          <div class="card" style="border-left:4px solid ${t.color};">
            <div style="display:flex;align-items:flex-start;gap:14px;">
              <div style="font-size:48px;flex-shrink:0;">${t.icon}</div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <div style="font-size:18px;font-weight:700;">${t.name}</div>
                  <span class="tag" style="background:${t.color}20;color:${t.color};">${done}/${lessons.length || 12} 课时</span>
                </div>
                <div style="font-size:12.5px;color:var(--text-muted);margin-bottom:8px;"><strong>覆盖：</strong>${t.industries}</div>
                <div style="font-size:13px;background:var(--bg-hover);padding:10px;border-radius:8px;margin-bottom:10px;">
                  <strong style="color:${t.color};">💰 变现公式：</strong>${t.formula}
                </div>
                ${progressBar(pct)}

                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px;">
                  ${byStage.map(s => `
                    <div style="text-align:center;padding:6px;background:var(--bg-hover);border-radius:6px;">
                      <div style="font-size:11px;font-weight:600;color:var(--text-secondary);">${s.icon} ${s.name}</div>
                      <div style="font-size:11px;color:${t.color};font-weight:700;margin-top:3px;">${s.done}/${s.total}</div>
                    </div>
                  `).join('')}
                </div>

                <div style="margin-top:12px;display:flex;gap:6px;">
                  <button class="btn btn-sm btn-primary" style="flex:1;" onclick="OPC.go('track-detail',{id:'${t.id}'})"><i class="fas fa-list"></i> 查看 ${lessons.length} 课时</button>
                  <button class="btn btn-sm" ${lessons[0] ? `onclick="OPC.go('lesson',{trackId:'${t.id}',moduleId:'${lessons[0].id}'})"` : 'disabled'}><i class="fas fa-play"></i> 开始学习</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 赛道详情页：显示 12 课时大纲
export function renderTrackDetail(root, params) {
  const D = window.OPC.data;
  const S = window.OPC.state;
  const t = D.tracks.find(x => x.id === params.id);
  if (!t) {
    root.innerHTML = '<div class="empty"><i class="fas fa-bug"></i><p>赛道不存在</p></div>';
    return;
  }
  const lessons = trackLessons[t.id] || [];

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <button class="btn btn-sm" onclick="OPC.go('tracks')"><i class="fas fa-arrow-left"></i> 返回赛道列表</button>
        <div class="page-title" style="margin-top:10px;">
          <span style="font-size:32px;">${t.icon}</span> ${t.name}
        </div>
        <div class="page-subtitle">${t.industries}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;border-left:4px solid ${t.color};">
      <div style="font-size:14px;"><strong style="color:${t.color};">💰 变现公式：</strong>${t.formula}</div>
    </div>

    ${trackStages.map(s => {
      const stageList = lessons.filter(l => l.stage === s.code);
      if (!stageList.length) return '';
      return `
        <div class="card" style="margin-bottom:16px;">
          <h3 style="margin:0 0 12px;color:${t.color};">${s.icon} ${s.name}（${stageList.length} 课时）</h3>
          ${stageList.map((l, i) => {
            const done = S.completedLessons.includes(l.id);
            return `
              <div class="lesson-item">
                <div style="display:flex;align-items:center;gap:14px;">
                  <div style="width:32px;height:32px;border-radius:50%;background:${done ? 'var(--success)' : t.color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">${done ? '✓' : i + 1}</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;">${l.title}</div>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
                      <i class="far fa-clock"></i> ${l.duration} 分钟
                      ${l.target ? '· 面向 ' + l.target : ''}
                      ${l.tools && l.tools.length ? '· ' + l.tools.slice(0, 3).join(' / ') : ''}
                    </div>
                  </div>
                  <button class="btn btn-sm btn-primary" onclick="OPC.go('lesson',{trackId:'${t.id}',moduleId:'${l.id}'})"><i class="fas fa-play"></i> 学习</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('')}
  `;
}
