// OPC 管理平台 - 主应用入口
import { courseStages, allCourses, tracks, baseLessons, lessonContent, prompts, achievements } from './data/courses.js';
import { memberLevels, memberRights, members, venues, bookings, eventTypes, events, equipment, financeData, kpiData, sopTasks, emergencyPlans, tickets } from './data/operations.js';

import { renderDashboard } from './pages/dashboard.js';
import { renderCourses } from './pages/courses.js';
import { renderCourseDetail } from './pages/course-detail.js';
import { renderTracks, renderTrackDetail } from './pages/tracks.js';
import { renderLesson } from './pages/lesson.js';
import { renderAILab } from './pages/ailab.js';
import { renderPrompts } from './pages/prompts.js';
import { renderProgress } from './pages/progress.js';
import { renderAchievements } from './pages/achievements.js';

import { renderOpsOverview } from './pages/ops-overview.js';
import { renderMembers } from './pages/members.js';
import { renderVenues } from './pages/venues.js';
import { renderEvents } from './pages/events.js';
import { renderEquipment } from './pages/equipment.js';
import { renderSop } from './pages/sop.js';
import { renderTickets } from './pages/tickets.js';
import { renderEmergency } from './pages/emergency.js';
import { renderFinance } from './pages/finance.js';
import { renderKpi } from './pages/kpi.js';
import { renderAiSettings } from './pages/ai-settings.js';

// 全局数据状态（暴露到 window 供页面访问）
window.OPC = {
  data: {
    courseStages, allCourses, tracks, baseLessons, lessonContent, prompts, achievements,
    memberLevels, memberRights, members, venues, bookings, eventTypes, events, equipment,
    financeData, kpiData, sopTasks, emergencyPlans, tickets
  },
  state: loadState(),
  // 路由跳转
  go(page, params = {}) {
    window.OPC.app.page = page;
    window.OPC.params = params;
    window.scrollTo(0, 0);
    render();
  },
  // 状态保存
  save() {
    localStorage.setItem('opc_state', JSON.stringify(window.OPC.state));
  },
  // 通知
  toast(msg, type = 'info') {
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;top:80px;right:24px;z-index:9999;background:var(--bg-card);
      padding:12px 18px;border-radius:8px;border-left:4px solid var(--${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'});
      box-shadow:var(--shadow-lg);font-size:13px;animation:fadeIn 0.2s;max-width:320px;`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; }, 2200);
    setTimeout(() => el.remove(), 2500);
  },
  // 调用 API（预留 AI 后端接口）
  async api(path, method = 'GET', body = null) {
    try {
      const res = await fetch('/api' + path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
      });
      return await res.json();
    } catch (e) {
      console.warn('[API] fallback to mock', path);
      return null;
    }
  }
};

function loadState() {
  const saved = localStorage.getItem('opc_state');
  const init = {
    completedLessons: [],     // 已完成课时id
    streak: 3,                // 连续学习天数
    timeline: [],             // 学习时间线
    favoritePrompts: [],      // 收藏的提示词
    unlockedBadges: [],       // 已解锁徽章
    deployedAgents: [],       // 已部署的智能体
    notes: {},                // 课时笔记
  };
  return saved ? { ...init, ...JSON.parse(saved) } : init;
}

// Alpine.js 主应用
window.app = function () {
  return {
    page: 'dashboard',
    mode: 'learning',          // learning | ops
    sidebarCollapsed: false,
    mobileOpen: false,
    theme: localStorage.getItem('opc_theme') || 'light',
    search: '',
    userLevel: 'Lv.2 进阶学员',

    init() {
      window.OPC.app = this;
      document.documentElement.setAttribute('data-theme', this.theme);
      this.computeUserLevel();
      render();
      // 路由 hash 同步
      window.addEventListener('hashchange', () => {
        const h = location.hash.replace('#', '');
        if (h) { this.page = h; render(); }
      });
    },
    go(page) {
      this.page = page;
      window.OPC.params = {};
      location.hash = page;
      window.scrollTo(0, 0);
      render();
    },
    switchMode(m) {
      this.mode = m;
      // 切到对应默认首页
      this.go(m === 'learning' ? 'dashboard' : 'ops-overview');
    },
    toggleSidebar() {
      if (window.innerWidth < 768) this.mobileOpen = !this.mobileOpen;
      else this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('opc_theme', this.theme);
    },
    computeUserLevel() {
      const total = window.OPC.data.baseLessons.length + window.OPC.data.tracks.length * 12;
      const completed = window.OPC.state.completedLessons.length;
      const pct = (completed / total) * 100;
      if (pct >= 80) this.userLevel = 'Lv.5 全域大师';
      else if (pct >= 50) this.userLevel = 'Lv.4 行业专家';
      else if (pct >= 30) this.userLevel = 'Lv.3 实战达人';
      else if (pct >= 10) this.userLevel = 'Lv.2 进阶学员';
      else this.userLevel = 'Lv.1 入门新手';
    }
  };
};

// 路由分发
const router = {
  // 学习端
  dashboard: renderDashboard,
  courses: renderCourses,
  'course-detail': renderCourseDetail,
  tracks: renderTracks,
  'track-detail': renderTrackDetail,
  lesson: renderLesson,
  ailab: renderAILab,
  prompts: renderPrompts,
  progress: renderProgress,
  achievements: renderAchievements,
  // 运营端
  'ops-overview': renderOpsOverview,
  members: renderMembers,
  venues: renderVenues,
  events: renderEvents,
  equipment: renderEquipment,
  sop: renderSop,
  tickets: renderTickets,
  emergency: renderEmergency,
  finance: renderFinance,
  kpi: renderKpi,
  // AI 配置中心（横跨学习+运营）
  'ai-settings': renderAiSettings
};

function render() {
  const root = document.getElementById('view-root');
  if (!root) return;
  const page = window.OPC.app.page;
  const renderer = router[page] || renderDashboard;
  root.innerHTML = '';
  try {
    renderer(root, window.OPC.params || {});
  } catch (e) {
    console.error('render error:', e);
    root.innerHTML = `<div class="empty"><i class="fas fa-bug"></i><p>页面加载失败：${e.message}</p></div>`;
  }
}

window.OPC.render = render;
