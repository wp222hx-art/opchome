// SOP 执行
import { html, tagFor, statusLabel } from '../utils.js';

export function renderSop(root) {
  const D = window.OPC.data;
  const sop = D.sopTasks;

  const morningDone = sop.daily.morning.filter(t => t.status === 'done').length;
  const morningTotal = sop.daily.morning.length;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">📋 SOP 执行中心</div>
        <div class="page-subtitle">日/周/月 标准操作流程 · 服务标准化、问题闭环</div>
      </div>
      <button class="btn btn-primary"><i class="fas fa-plus"></i> 自定义SOP</button>
    </div>

    <!-- 顶部统计 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-sun"></i></div><div class="stat-content"><div class="label">开馆SOP</div><div class="value">${morningDone}/${morningTotal}</div><div class="delta up">已完成 ${Math.round(morningDone / morningTotal * 100)}%</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-clipboard-list"></i></div><div class="stat-content"><div class="label">日常巡检</div><div class="value">5</div><div class="delta">每2小时1次</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-calendar-week"></i></div><div class="stat-content"><div class="label">本周会议</div><div class="value">3</div><div class="delta">周一/周三/周五</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-flag"></i></div><div class="stat-content"><div class="label">月度任务</div><div class="value">3</div><div class="delta">月初/月中/月末</div></div></div>
    </div>

    <!-- 每日 SOP -->
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span><i class="fas fa-sun"></i> 每日 SOP — 开馆前 (T-60min 启动)</span></div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>序号</th><th>时间</th><th>执行人</th><th>动作</th><th>检查标准</th><th>状态</th><th></th></tr></thead>
        <tbody>
          ${sop.daily.morning.map((t, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><span class="tag tag-info">${t.time}</span></td>
              <td>${t.actor}</td>
              <td>${t.action}</td>
              <td style="color:var(--text-muted);font-size:12.5px;">${t.standard}</td>
              <td><span class="tag ${tagFor(t.status)}">${statusLabel[t.status]}</span></td>
              <td>${t.status === 'pending' ? '<button class="btn btn-sm btn-primary">执行</button>' : t.status === 'in_progress' ? '<button class="btn btn-sm btn-success">完成</button>' : '<i class="fas fa-check" style="color:var(--success);"></i>'}</td>
            </tr>`).join('')}
        </tbody>
      </table></div>
    </div>

    <div class="grid grid-2" style="margin-bottom:16px;">
      <div class="card">
        <div class="card-title"><span><i class="fas fa-running"></i> 日间运营 SOP</span></div>
        ${sop.daily.daytime.map(t => `
          <div style="padding:10px 0;border-bottom:1px dashed var(--border);">
            <div style="display:flex;justify-content:space-between;font-size:13px;">
              <strong>${t.actor}</strong><span class="tag tag-info">${t.frequency}</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-secondary);margin-top:4px;">${t.action}</div>
            <div style="font-size:11px;color:var(--primary);margin-top:2px;"><i class="fas fa-tools"></i> ${t.tool}</div>
          </div>`).join('')}
      </div>

      <div class="card">
        <div class="card-title"><span><i class="fas fa-moon"></i> 闭馆 SOP — T-30min 启动</span></div>
        ${sop.daily.closing.map((t, i) => `
          <div style="display:flex;gap:10px;padding:10px;background:var(--bg-hover);border-radius:8px;margin-bottom:6px;">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--gradient);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">${i + 1}</div>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;font-size:12.5px;">
                <strong>${t.actor}</strong><span class="tag tag-info">${t.time}</span>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${t.action}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 每周 SOP -->
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title"><span><i class="fas fa-calendar-week"></i> 每周 SOP — 例会与固定任务</span></div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>时间</th><th>会议</th><th>参会人</th><th>时长</th><th>内容</th><th>产出</th><th>状态</th></tr></thead>
        <tbody>
          ${sop.weekly.map(w => `
            <tr>
              <td><strong>${w.day}</strong></td>
              <td>${w.meeting}</td>
              <td>${w.participants}</td>
              <td>${w.duration}</td>
              <td>-</td>
              <td>${w.output}</td>
              <td><span class="tag ${tagFor(w.status)}">${statusLabel[w.status]}</span></td>
            </tr>`).join('')}
        </tbody>
      </table></div>
    </div>

    <!-- 每月 SOP -->
    <div class="card">
      <div class="card-title"><span><i class="fas fa-calendar"></i> 每月 SOP</span></div>
      <div class="grid grid-3">
        ${sop.monthly.map(m => `
          <div style="padding:14px;border:1px solid var(--border);border-radius:10px;border-left:4px solid var(--primary);">
            <div style="font-weight:700;font-size:13px;color:var(--primary);">${m.date}</div>
            <div style="margin:6px 0;font-weight:600;">${m.task}</div>
            <div style="font-size:11.5px;color:var(--text-muted);">负责人：${m.owner}</div>
            <div style="font-size:11.5px;color:var(--text-muted);">产出：${m.output}</div>
            <div style="margin-top:8px;"><span class="tag ${tagFor(m.status)}">${statusLabel[m.status]}</span></div>
          </div>`).join('')}
      </div>
    </div>
  `;
}
