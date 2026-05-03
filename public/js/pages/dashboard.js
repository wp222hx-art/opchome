// 学习仪表盘
import { html, greet, progressBar } from '../utils.js';

export function renderDashboard(root) {
  const D = window.OPC.data;
  const S = window.OPC.state;

  const totalLessons = D.baseLessons.length + D.tracks.length * 12;
  const completed = S.completedLessons.length;
  const pct = totalLessons ? Math.round(completed / totalLessons * 100) : 0;

  const trackProgress = D.tracks.map(t => {
    const trackLessons = S.completedLessons.filter(id => id.startsWith(t.id + '-')).length;
    return { ...t, completed: trackLessons, pct: Math.round(trackLessons / 12 * 100) };
  });

  const baseDone = D.baseLessons.filter(l => S.completedLessons.includes(l.id)).length;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">${greet()}，OPC 创作者 👋</div>
        <div class="page-subtitle">一个人 + AI工具 = 一个完整的内容/服务工作室。今日继续你的"一人公司"成长之旅。</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn" onclick="OPC.go('progress')"><i class="fas fa-chart-line"></i> 学习报告</button>
        <button class="btn btn-primary" onclick="OPC.go('courses')"><i class="fas fa-play"></i> 继续学习</button>
      </div>
    </div>

    <!-- 顶部统计 -->
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card">
        <div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-book-open"></i></div>
        <div class="stat-content"><div class="label">总课时</div><div class="value">${totalLessons}</div><div class="delta">5基础 + 8赛道×12</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-check-circle"></i></div>
        <div class="stat-content"><div class="label">已完成</div><div class="value">${completed}</div><div class="delta up">${pct}% 总进度</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-fire"></i></div>
        <div class="stat-content"><div class="label">连续学习</div><div class="value">${S.streak}天</div><div class="delta up">坚持就是胜利</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fce7f3;color:#ec4899;"><i class="fas fa-medal"></i></div>
        <div class="stat-content"><div class="label">已获徽章</div><div class="value">${S.unlockedBadges.length}/${D.achievements.length}</div><div class="delta">${Math.round(S.unlockedBadges.length / D.achievements.length * 100)}% 收集</div></div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns: 2fr 1fr; gap:16px; margin-bottom:20px;">
      <!-- 总进度环 + 8赛道 -->
      <div class="card">
        <div class="card-title">
          <span><i class="fas fa-route"></i> 8大行业赛道</span>
          <button class="btn btn-sm" onclick="OPC.go('tracks')">查看全部 →</button>
        </div>
        <div class="grid grid-2" style="gap:10px;">
          ${trackProgress.map(t => `
            <div onclick="OPC.go('tracks')" style="padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:all .15s;" onmouseover="this.style.borderColor='${t.color}'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <div style="font-size:13px;font-weight:700;"><span style="font-size:18px;margin-right:6px;">${t.icon}</span>${t.name}</div>
                <span class="tag" style="background:${t.color}20;color:${t.color};">${t.completed}/12</span>
              </div>
              ${progressBar(t.pct)}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="card">
        <div class="card-title"><span><i class="fas fa-bolt"></i> 快速操作</span></div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="btn" style="justify-content:flex-start;padding:12px;" onclick="OPC.go('ailab')">
            <span style="font-size:20px;">🤖</span>
            <div style="text-align:left;flex:1;margin-left:6px;">
              <div style="font-weight:600;">进入 AI 工坊</div>
              <div style="font-size:11px;color:var(--text-muted);">搭建你的第一个智能体</div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--text-muted);"></i>
          </button>
          <button class="btn" style="justify-content:flex-start;padding:12px;" onclick="OPC.go('prompts')">
            <span style="font-size:20px;">✨</span>
            <div style="text-align:left;flex:1;margin-left:6px;">
              <div style="font-weight:600;">提示词库</div>
              <div style="font-size:11px;color:var(--text-muted);">28个行业提示词模板</div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--text-muted);"></i>
          </button>
          <button class="btn" style="justify-content:flex-start;padding:12px;" onclick="OPC.go('progress')">
            <span style="font-size:20px;">📊</span>
            <div style="text-align:left;flex:1;margin-left:6px;">
              <div style="font-weight:600;">学习报告</div>
              <div style="font-size:11px;color:var(--text-muted);">查看雷达图与时间线</div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--text-muted);"></i>
          </button>
          <button class="btn" style="justify-content:flex-start;padding:12px;" onclick="OPC.go('achievements')">
            <span style="font-size:20px;">🏆</span>
            <div style="text-align:left;flex:1;margin-left:6px;">
              <div style="font-weight:600;">成就徽章</div>
              <div style="font-size:11px;color:var(--text-muted);">${S.unlockedBadges.length}/13 已解锁</div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--text-muted);"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 必修基础课 -->
    <div class="card">
      <div class="card-title">
        <span><i class="fas fa-star"></i> 必修基础课程 <span style="color:var(--text-muted);font-weight:400;font-size:12px;">通用基础 · ${baseDone}/${D.baseLessons.length}</span></span>
      </div>
      <div class="grid grid-3">
        ${D.baseLessons.map(l => {
          const done = S.completedLessons.includes(l.id);
          return `
            <div class="course-card" onclick="OPC.go('lesson',{lessonId:'${l.id}'})">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div class="course-id">${l.id}</div>
                ${done ? '<span class="tag tag-success"><i class="fas fa-check"></i> 已完成</span>' : '<span class="tag">未学习</span>'}
              </div>
              <div class="course-name">${l.title}</div>
              <div style="font-size:12.5px;color:var(--text-secondary);margin-bottom:10px;">${l.subtitle}</div>
              <div class="course-target">${l.points.map(p => `<div style="font-size:12px;margin:2px 0;"><i class="fas fa-circle" style="font-size:5px;color:var(--primary);vertical-align:middle;margin-right:6px;"></i>${p}</div>`).join('')}</div>
              <div class="course-footer">
                <span class="tag tag-info"><i class="far fa-clock"></i> ${l.duration}分钟</span>
                <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();OPC.go('lesson',{lessonId:'${l.id}'})">${done ? '复习' : '开始学习'} →</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
