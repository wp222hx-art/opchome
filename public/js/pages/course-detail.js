// 课程详情页 - 显示完整大纲（章节/目标/工具/产出/区块预览）
import { html, fmtMoney } from '../utils.js';
import { courseDetails, ensureBlocks } from '../data/course-details.js';

export function renderCourseDetail(root, params) {
  const D = window.OPC.data;
  const id = params.id;
  const course = D.allCourses.find(c => c.id === id);
  if (!course) {
    root.innerHTML = '<div class="empty"><i class="fas fa-bug"></i><p>课程不存在</p><button class="btn" onclick="OPC.go(\'courses\')">返回</button></div>';
    return;
  }
  const stage = D.courseStages.find(s => s.id === course.stage);
  const modules = courseDetails[id] || [];
  const totalMin = modules.reduce((s, m) => s + (m.duration || 0), 0);

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <button class="btn btn-sm" onclick="OPC.go('courses')"><i class="fas fa-arrow-left"></i> 返回课程列表</button>
        <div class="page-title" style="margin-top:10px;">
          <span style="font-size:32px;">${course.cover}</span>
          ${course.name}
          <span class="tag" style="background:${stage.color}20;color:${stage.color};margin-left:8px;">${stage.name}</span>
          <span class="tag tag-info" style="margin-left:4px;">${course.id}</span>
        </div>
        <div class="page-subtitle">${course.type} · ${course.duration} · 面向 ${course.target}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:28px;font-weight:700;color:var(--primary);">${fmtMoney(course.price)}</div>
        <button class="btn btn-primary" style="margin-top:8px;" onclick="OPC.toast('已加入学习计划: ${course.name}','success')"><i class="fas fa-cart-plus"></i> 立即报名</button>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 320px;gap:20px;">
      <!-- 主内容 -->
      <div>
        <!-- 课程概览 -->
        <div class="card">
          <h3 style="margin:0 0 12px;"><i class="fas fa-info-circle" style="color:var(--primary);"></i> 课程概览</h3>
          <div class="grid grid-3" style="gap:12px;margin-bottom:14px;">
            <div class="stat-card" style="padding:12px;">
              <div class="label">章节数</div>
              <div class="value">${modules.length}</div>
            </div>
            <div class="stat-card" style="padding:12px;">
              <div class="label">总学时</div>
              <div class="value">${(totalMin / 60).toFixed(1)}h</div>
            </div>
            <div class="stat-card" style="padding:12px;">
              <div class="label">所属阶段</div>
              <div class="value" style="font-size:16px;">${stage.icon} ${stage.name}</div>
            </div>
          </div>
          <div style="margin-top:10px;">
            <strong>🛠️ 涉及工具：</strong>
            ${course.tools.map(t => `<span class="tag" style="margin:2px;">${t}</span>`).join('')}
          </div>
          <div style="margin-top:10px;">
            <strong>📦 课程产出：</strong>${course.output}
          </div>
        </div>

        <!-- 章节列表 -->
        <div class="card" style="margin-top:16px;">
          <h3 style="margin:0 0 12px;"><i class="fas fa-list-ol" style="color:var(--primary);"></i> 课程大纲（共 ${modules.length} 章节）</h3>
          ${modules.length === 0 ? `
            <div class="empty"><i class="fas fa-file-alt"></i><p>课程大纲正在精修中，敬请期待</p></div>
          ` : modules.map((m, i) => {
            const blocks = ensureBlocks(course, m);
            return `
              <div class="lesson-item" style="cursor:pointer;" onclick="this.querySelector('.module-detail').classList.toggle('expanded')">
                <div style="display:flex;align-items:center;gap:14px;">
                  <div style="width:36px;height:36px;border-radius:50%;background:${stage.color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">${i + 1}</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;">${m.title}</div>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
                      <i class="far fa-clock"></i> ${m.duration} 分钟
                      · 产出：${m.deliverable || '小作品'}
                      ${m.tools && m.tools.length ? '· 工具：' + m.tools.slice(0, 3).join(' / ') : ''}
                    </div>
                  </div>
                  <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();OPC.go('lesson',{courseId:'${course.id}',moduleId:'${m.id}'})"><i class="fas fa-play"></i> 学习</button>
                </div>
                <div class="module-detail" style="display:none;margin-top:12px;padding-top:12px;border-top:1px dashed var(--border);">
                  ${m.objectives && m.objectives.length ? `
                    <div style="margin-bottom:8px;">
                      <strong style="font-size:12px;color:var(--primary);">🎯 学习目标</strong>
                      <ul style="margin:4px 0 0;padding-left:20px;font-size:13px;">
                        ${m.objectives.map(o => `<li>${o}</li>`).join('')}
                      </ul>
                    </div>` : ''}
                  <div style="font-size:12px;color:var(--text-muted);">
                    📚 包含 ${blocks.length} 个内容区块：
                    ${blocks.map(b => `<span class="tag" style="margin:2px;">${blockLabel(b.type)}</span>`).join('')}
                  </div>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- 侧栏 -->
      <div>
        <div class="card" style="position:sticky;top:80px;">
          <h4 style="margin:0 0 10px;">🚀 快速行动</h4>
          <button class="btn btn-primary" style="width:100%;margin-bottom:8px;" onclick="OPC.toast('已加入学习计划','success')"><i class="fas fa-rocket"></i> 立即报名 ${fmtMoney(course.price)}</button>
          ${modules.length > 0 ? `<button class="btn" style="width:100%;margin-bottom:8px;" onclick="OPC.go('lesson',{courseId:'${course.id}',moduleId:'${modules[0].id}'})"><i class="fas fa-play-circle"></i> 试听第 1 章</button>` : ''}
          <button class="btn" style="width:100%;" onclick="OPC.toast('已加入收藏','info')"><i class="far fa-heart"></i> 收藏课程</button>

          <hr style="border:none;border-top:1px solid var(--border);margin:14px 0;">

          <h4 style="margin:0 0 10px;">🎓 学习路径建议</h4>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.8;">
            ${getPathSuggestion(course, D)}
          </div>

          <hr style="border:none;border-top:1px solid var(--border);margin:14px 0;">

          <h4 style="margin:0 0 10px;">📊 学员评价</h4>
          <div style="display:flex;align-items:center;gap:6px;">
            <div style="font-size:24px;font-weight:700;color:var(--warning);">4.8</div>
            <div style="color:var(--warning);">★★★★★</div>
            <div style="font-size:12px;color:var(--text-muted);">(${Math.floor(Math.random() * 200) + 50} 评价)</div>
          </div>
          <div style="margin-top:8px;font-size:12px;color:var(--text-muted);">
            <div>"老师讲得很透彻" — 张同学</div>
            <div>"产出物可以直接用" — 李同学</div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .module-detail.expanded { display:block !important; }
      .lesson-item { transition: all .2s; }
      .lesson-item:hover { background:var(--bg-hover); }
    </style>
  `;
}

function blockLabel(type) {
  const m = { intro: '📖 导读', concept: '💡 概念', workflow: '🔧 流程', comparison: '⚖️ 对比', practice: '✍️ 练习', tip: '💎 洞察', summary: '📌 小结' };
  return m[type] || type;
}

function getPathSuggestion(course, D) {
  const stagePath = {
    S1: '本课为<strong>认知与基础</strong>阶段，建议优先学完，再进入 S2 技能提升',
    S2: '建议先完成 S1 基础课，再深入本课程',
    S3: '需要 S1 + S2 基础，本课为实战进阶',
    S4: '本课为商业变现阶段，需有 S1-S3 完整基础'
  };
  return stagePath[course.stage] || '';
}
