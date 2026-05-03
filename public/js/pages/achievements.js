// 成就徽章
import { html } from '../utils.js';

export function renderAchievements(root) {
  const D = window.OPC.data;
  const S = window.OPC.state;

  // 自动检测可解锁
  const checks = {
    'A1': () => S.completedLessons.length >= 1,
    'A2': () => D.baseLessons.every(l => S.completedLessons.includes(l.id)),
    'A5': () => S.deployedAgents.length >= 1,
    'A6': () => S.streak >= 7,
    'A10': () => S.favoritePrompts.length >= 10
  };
  D.achievements.forEach(a => {
    const fn = checks[a.id];
    if (fn && fn() && !S.unlockedBadges.includes(a.id)) {
      S.unlockedBadges.push(a.id);
    }
  });
  OPC.save();

  const unlocked = S.unlockedBadges.length;

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🏆 成就徽章</div>
        <div class="page-subtitle">已解锁 <strong style="color:var(--warning);">${unlocked}</strong>/${D.achievements.length} · 收集进度 ${Math.round(unlocked / D.achievements.length * 100)}%</div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;">
      ${D.achievements.map(a => {
        const got = S.unlockedBadges.includes(a.id);
        return `
          <div class="badge-card ${got ? 'unlocked' : 'locked'}">
            <div class="icon">${a.icon}</div>
            <div class="name">${a.name}</div>
            <div class="desc">${a.desc}</div>
            <div style="margin-top:8px;">
              ${got ? '<span class="tag tag-success"><i class="fas fa-check"></i> 已解锁</span>' : '<span class="tag tag-muted"><i class="fas fa-lock"></i> 未解锁</span>'}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
