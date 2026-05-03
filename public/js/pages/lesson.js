// 课时详情（沉浸式阅读 + Quiz + AI助教 + 笔记）
// 支持两种模式：
//  - 通用基础课（C01-C05，使用 baseLessons + lessonContent）
//  - 课程章节（任意课程ID + 章节ID，使用 courseDetails）
//  - 行业赛道课（赛道ID-S?-?，使用 trackLessons）
import { html } from '../utils.js';
import { courseDetails, ensureBlocks } from '../data/course-details.js';
import { trackLessons } from '../data/track-lessons.js';

export function renderLesson(root, params) {
  const D = window.OPC.data;
  const S = window.OPC.state;

  // 解析参数 -> 统一为 { id, title, subtitle, duration, blocks, quiz, breadcrumb, prev, next }
  const view = resolveLesson(params, D);
  if (!view) {
    root.innerHTML = '<div class="empty"><i class="fas fa-bug"></i><p>课时不存在</p><button class="btn" onclick="OPC.go(\'courses\')">返回课程</button></div>';
    return;
  }

  const done = S.completedLessons.includes(view.id);
  let activeTab = 'content';
  let chatMessages = [
    { role: 'ai', text: `你好！我是本课的 AI 助教。这一节《${view.title}》${view.subtitle ? '主要讲解 ' + view.subtitle + '。' : ''}你可以问我任何问题。` }
  ];
  let quizAnswers = {};

  const renderBlock = (b) => {
    switch (b.type) {
      case 'intro':
        return `<div class="lc-intro lc-block"><h3><i class="fas fa-bookmark"></i> ${b.title}</h3><p>${b.content}</p></div>`;
      case 'concept':
        return `<div class="lc-block">
          <h2 class="lc-section-title">💡 ${b.title}</h2>
          ${b.items.map(it => `<div class="lc-concept-item"><h4>${it.name}</h4><p>${it.desc}</p></div>`).join('')}
        </div>`;
      case 'comparison':
        return `<div class="lc-block">
          <h2 class="lc-section-title">⚖️ ${b.title}</h2>
          <div class="table-wrap"><table class="table">
            <thead><tr>${b.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </div>`;
      case 'workflow':
        return `<div class="lc-block">
          <h2 class="lc-section-title">⚙️ ${b.title}</h2>
          ${b.steps.map(s => `
            <div class="lc-step">
              <div class="lc-step-num">${s.step}</div>
              <div class="lc-step-body"><h4>${s.title}</h4><p>${s.desc}</p></div>
            </div>`).join('')}
        </div>`;
      case 'practice':
        return `<div class="lc-block" style="background:#fef3c7;border-left:4px solid #f59e0b;padding:14px 16px;border-radius:8px;">
          <h4 style="margin:0 0 6px;color:#92400e;">✍️ ${b.title}</h4>
          <p style="margin:0;">${b.content}</p>
        </div>`;
      case 'tip':
        return `<div class="lc-tip lc-block"><h4>${b.title}</h4><p>${b.content}</p></div>`;
      case 'summary':
        return `<div class="lc-summary lc-block"><h4>📌 ${b.title}</h4>
          <ul>${b.points.map(p => `<li>${p}</li>`).join('')}</ul>
          ${b.next ? `<p style="font-size:13px;color:#047857;"><strong>下一步：</strong>${b.next}</p>` : ''}
        </div>`;
      default:
        return '';
    }
  };

  const renderTab = () => {
    const c = document.getElementById('tab-content');
    if (!c) return;
    if (activeTab === 'content') {
      c.innerHTML = view.blocks.map(renderBlock).join('');
    } else if (activeTab === 'note') {
      const notes = S.notes[view.id] || [];
      c.innerHTML = `
        <div style="margin-bottom:14px;">
          <textarea class="textarea" id="new-note" placeholder="记录学习笔记... (Ctrl+Enter 保存)"></textarea>
          <button class="btn btn-primary btn-sm" style="margin-top:8px;" id="save-note"><i class="fas fa-save"></i> 保存笔记</button>
        </div>
        <div>
          ${notes.length ? notes.map((n, i) => `
            <div style="padding:12px;background:var(--bg-hover);border-radius:8px;margin-bottom:8px;">
              <div style="font-size:11px;color:var(--text-muted);">${n.time}</div>
              <div style="margin-top:4px;white-space:pre-wrap;">${n.text}</div>
              <button class="btn btn-sm" style="margin-top:6px;" onclick="OPC.deleteNote('${view.id}',${i})">删除</button>
            </div>
          `).join('') : '<div class="empty"><i class="far fa-sticky-note"></i><p>还没有笔记，开始记录吧</p></div>'}
        </div>`;
      const ta = document.getElementById('new-note');
      const save = () => {
        if (!ta.value.trim()) return;
        S.notes[view.id] = S.notes[view.id] || [];
        S.notes[view.id].unshift({ text: ta.value, time: new Date().toLocaleString('zh-CN') });
        OPC.save(); OPC.toast('笔记已保存', 'success');
        renderTab();
      };
      document.getElementById('save-note').onclick = save;
      ta.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') save(); });
    } else if (activeTab === 'ai') {
      c.innerHTML = `
        <div style="display:flex;flex-direction:column;height:60vh;background:var(--bg);border-radius:12px;">
          <div class="chat-area" id="chat-area">
            ${chatMessages.map(m => `
              <div class="chat-msg ${m.role === 'user' ? 'user' : ''}">
                <div class="chat-avatar">${m.role === 'user' ? 'U' : '🤖'}</div>
                <div class="chat-bubble">${m.text}</div>
              </div>`).join('')}
          </div>
          <div style="padding:8px 12px;display:flex;gap:6px;flex-wrap:wrap;">
            ${['核心概念讲解', '实操步骤', '案例分析', '常见问题', 'ROI分析'].map(q =>
              `<button class="btn btn-sm" onclick="OPC.askAI('${q}')">${q}</button>`
            ).join('')}
          </div>
          <div class="chat-input-bar">
            <input id="chat-input" placeholder="向 AI 助教提问..." onkeypress="if(event.key==='Enter')OPC.askAI(this.value)">
            <button class="btn btn-primary" onclick="OPC.askAI(document.getElementById('chat-input').value)">发送</button>
          </div>
        </div>`;
    } else if (activeTab === 'quiz') {
      const quiz = view.quiz || [];
      if (!quiz.length) {
        c.innerHTML = '<div class="empty"><i class="far fa-question-circle"></i><p>本节暂无知识检测，完成学习后请进入下一节</p></div>';
        return;
      }
      c.innerHTML = `
        <h3 style="margin-bottom:14px;">📋 知识检测 (${quiz.length}题)</h3>
        ${quiz.map((q, i) => `
          <div class="card" style="margin-bottom:12px;">
            <div style="font-weight:600;margin-bottom:10px;">${i + 1}. ${q.q}</div>
            ${q.options.map((opt, j) => `
              <label style="display:flex;align-items:center;gap:8px;padding:8px;border-radius:6px;cursor:pointer;${quizAnswers[i] === j ? (j === q.answer ? 'background:#d1fae5' : 'background:#fee2e2') : ''}">
                <input type="radio" name="q${i}" value="${j}" ${quizAnswers[i] !== undefined ? 'disabled' : ''} onchange="OPC.answerQuiz(${i},${j})">
                <span>${String.fromCharCode(65 + j)}. ${opt}</span>
                ${quizAnswers[i] === j ? (j === q.answer ? '<i class="fas fa-check" style="color:var(--success);margin-left:auto;"></i>' : '<i class="fas fa-times" style="color:var(--danger);margin-left:auto;"></i>') : ''}
              </label>`).join('')}
            ${quizAnswers[i] !== undefined && quizAnswers[i] !== q.answer ? `<div style="margin-top:8px;font-size:12px;color:var(--success);">✓ 正确答案：${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</div>` : ''}
          </div>
        `).join('')}
        <div id="quiz-result" style="margin-top:12px;"></div>`;
    }
  };

  // 全局辅助函数
  OPC.deleteNote = (lid, idx) => { S.notes[lid].splice(idx, 1); OPC.save(); renderTab(); };
  OPC.answerQuiz = (i, j) => {
    const quiz = view.quiz || [];
    quizAnswers[i] = j;
    renderTab();
    if (Object.keys(quizAnswers).length === quiz.length) {
      const correct = quiz.filter((q, k) => quizAnswers[k] === q.answer).length;
      const score = Math.round(correct / quiz.length * 100);
      setTimeout(() => {
        const r = document.getElementById('quiz-result');
        if (r) r.innerHTML = `<div class="lc-summary"><h4>🎉 测验完成</h4><p>得分：<strong style="font-size:20px;color:${score >= 60 ? 'var(--success)' : 'var(--danger)'};">${score}</strong>/100 · 答对 ${correct}/${quiz.length} 题</p></div>`;
      }, 200);
    }
  };
  OPC.askAI = async (text) => {
    if (!text || !text.trim()) return;
    chatMessages.push({ role: 'user', text });
    renderTab();
    const inp = document.getElementById('chat-input'); if (inp) inp.value = '';
    const reply = await OPC.api('/ai/chat', 'POST', { lessonId: view.id, message: text });
    const answer = (reply && reply.data && reply.data.reply) || mockAIReply(text, view);
    setTimeout(() => {
      chatMessages.push({ role: 'ai', text: answer });
      renderTab();
      const area = document.getElementById('chat-area');
      if (area) area.scrollTop = area.scrollHeight;
    }, 400);
  };

  root.innerHTML = html`
    <div style="margin-bottom:16px;display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-muted);flex-wrap:wrap;">
      ${view.breadcrumb.map((b, i) => `
        ${i > 0 ? '<i class="fas fa-chevron-right" style="font-size:9px;"></i>' : ''}
        ${b.go ? `<a onclick="OPC.go('${b.go}'${b.params ? ',' + JSON.stringify(b.params) : ''})" style="cursor:pointer;color:var(--primary);">${b.label}</a>` : `<span>${b.label}</span>`}
      `).join('')}
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-size:11px;color:var(--text-muted);font-weight:600;">${view.id} · ${view.category || ''}</div>
          <div style="font-size:24px;font-weight:700;margin:4px 0;">${view.title}</div>
          ${view.subtitle ? `<div style="font-size:14px;color:var(--text-secondary);">${view.subtitle}</div>` : ''}
          <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
            <span class="tag tag-info"><i class="far fa-clock"></i> ${view.duration} 分钟</span>
            ${view.tools && view.tools.length ? `<span class="tag">🛠️ ${view.tools.slice(0, 4).join(' / ')}</span>` : ''}
            ${view.deliverable ? `<span class="tag">📦 ${view.deliverable}</span>` : ''}
            ${done ? '<span class="tag tag-success"><i class="fas fa-check"></i> 已完成</span>' : '<span class="tag tag-warning">未完成</span>'}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          ${done
            ? `<button class="btn"><i class="fas fa-redo"></i> 重新学习</button>`
            : `<button class="btn btn-success" onclick="OPC.markDone('${view.id}','${view.title.replace(/'/g, '')}')"><i class="fas fa-check"></i> 标记完成</button>`}
          <button class="btn btn-primary" onclick="OPC.go('ailab')"><i class="fas fa-robot"></i> 进入工坊</button>
        </div>
      </div>
      ${view.objectives && view.objectives.length ? `
        <div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--border);">
          <strong style="font-size:13px;color:var(--primary);">🎯 学习目标：</strong>
          <span style="font-size:13px;">${view.objectives.join(' · ')}</span>
        </div>` : ''}
    </div>

    <div class="card">
      <div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:16px;gap:4px;">
        ${[
          { k: 'content', n: '📖 课程内容' },
          { k: 'note', n: '📝 学习笔记' },
          { k: 'ai', n: '🤖 AI 助教' },
          { k: 'quiz', n: '📋 知识检测' }
        ].map(t => `<button class="btn btn-sm tab-btn" data-tab="${t.k}" style="border:none;border-bottom:2px solid transparent;border-radius:0;padding:10px 16px;${activeTab === t.k ? 'border-bottom-color:var(--primary);color:var(--primary);font-weight:700;' : ''}">${t.n}</button>`).join('')}
      </div>
      <div id="tab-content" style="min-height:300px;"></div>
    </div>

    <div style="margin-top:16px;display:flex;justify-content:space-between;">
      ${view.prev
        ? `<button class="btn" onclick='OPC.go("lesson",${JSON.stringify(view.prev.params)})'><i class="fas fa-chevron-left"></i> ${view.prev.title}</button>`
        : `<span></span>`}
      ${view.next
        ? `<button class="btn btn-primary" onclick='OPC.go("lesson",${JSON.stringify(view.next.params)})'>${view.next.title} <i class="fas fa-chevron-right"></i></button>`
        : `<button class="btn btn-primary" onclick="OPC.go('courses')">返回课程</button>`}
    </div>
  `;

  root.querySelectorAll('.tab-btn').forEach(b => {
    b.onclick = () => {
      activeTab = b.dataset.tab;
      root.querySelectorAll('.tab-btn').forEach(x => { x.style.borderBottomColor = 'transparent'; x.style.color = ''; x.style.fontWeight = ''; });
      b.style.borderBottomColor = 'var(--primary)'; b.style.color = 'var(--primary)'; b.style.fontWeight = '700';
      renderTab();
    };
  });

  OPC.markDone = (lid, title) => {
    if (!S.completedLessons.includes(lid)) {
      S.completedLessons.push(lid);
      S.timeline.unshift({ id: lid, title, time: new Date().toISOString() });
      OPC.save();
      OPC.toast('🎉 已标记完成，进度已更新', 'success');
    }
  };

  renderTab();
}

// 解析三类课时来源
function resolveLesson(params, D) {
  // 1) 通用基础课
  if (params.lessonId && D.baseLessons.find(l => l.id === params.lessonId)) {
    const meta = D.baseLessons.find(l => l.id === params.lessonId);
    const content = D.lessonContent[meta.id] || D.lessonContent['C01'];
    const idx = D.baseLessons.findIndex(l => l.id === meta.id);
    const prev = idx > 0 ? D.baseLessons[idx - 1] : null;
    const next = idx < D.baseLessons.length - 1 ? D.baseLessons[idx + 1] : null;
    return {
      id: meta.id, title: meta.title, subtitle: meta.subtitle, duration: meta.duration,
      category: '通用基础', objectives: meta.points,
      blocks: content.blocks, quiz: content.quiz,
      breadcrumb: [
        { label: '仪表盘', go: 'dashboard' },
        { label: '课程体系', go: 'courses' },
        { label: meta.id }
      ],
      prev: prev ? { title: prev.title, params: { lessonId: prev.id } } : null,
      next: next ? { title: next.title, params: { lessonId: next.id } } : null
    };
  }

  // 2) 课程章节（任意课程ID + 章节ID）
  if (params.courseId && courseDetails[params.courseId]) {
    const course = D.allCourses.find(c => c.id === params.courseId);
    const modules = courseDetails[params.courseId];
    const idx = params.moduleId
      ? modules.findIndex(m => m.id === params.moduleId)
      : 0;
    const m = modules[idx >= 0 ? idx : 0];
    if (!m) return null;
    const blocks = ensureBlocks(course, m);
    const prev = idx > 0 ? modules[idx - 1] : null;
    const next = idx < modules.length - 1 ? modules[idx + 1] : null;
    return {
      id: m.id, title: m.title, subtitle: course ? course.name : '',
      duration: m.duration, category: course ? course.name : '课程章节',
      objectives: m.objectives, tools: m.tools, deliverable: m.deliverable,
      blocks, quiz: m.quiz || [],
      breadcrumb: [
        { label: '课程体系', go: 'courses' },
        { label: course ? course.name : '课程', go: 'course-detail', params: { id: params.courseId } },
        { label: '第 ' + (idx + 1) + ' 章' }
      ],
      prev: prev ? { title: prev.title, params: { courseId: params.courseId, moduleId: prev.id } } : null,
      next: next ? { title: next.title, params: { courseId: params.courseId, moduleId: next.id } } : null
    };
  }

  // 3) 行业赛道课
  if (params.trackId && trackLessons[params.trackId]) {
    const track = D.tracks.find(t => t.id === params.trackId);
    const lessons = trackLessons[params.trackId];
    const idx = params.moduleId
      ? lessons.findIndex(l => l.id === params.moduleId)
      : 0;
    const m = lessons[idx >= 0 ? idx : 0];
    if (!m) return null;
    const blocks = (m.blocks && m.blocks.length) ? m.blocks : ensureBlocks(track, m);
    const prev = idx > 0 ? lessons[idx - 1] : null;
    const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;
    return {
      id: m.id, title: m.title, subtitle: track ? track.name + ' · ' + m.stage : '',
      duration: m.duration, category: track ? track.name : '行业赛道',
      objectives: m.objectives, tools: m.tools, deliverable: m.target,
      blocks, quiz: m.quiz || [],
      breadcrumb: [
        { label: '8大行业赛道', go: 'tracks' },
        { label: track ? track.name : '赛道' },
        { label: '第 ' + (idx + 1) + ' 课' }
      ],
      prev: prev ? { title: prev.title, params: { trackId: params.trackId, moduleId: prev.id } } : null,
      next: next ? { title: next.title, params: { trackId: params.trackId, moduleId: next.id } } : null
    };
  }

  // 默认 C01
  const meta = D.baseLessons[0];
  const content = D.lessonContent[meta.id];
  return {
    id: meta.id, title: meta.title, subtitle: meta.subtitle, duration: meta.duration,
    category: '通用基础', objectives: meta.points,
    blocks: content.blocks, quiz: content.quiz,
    breadcrumb: [{ label: '仪表盘', go: 'dashboard' }, { label: meta.id }],
    prev: null,
    next: D.baseLessons[1] ? { title: D.baseLessons[1].title, params: { lessonId: D.baseLessons[1].id } } : null
  };
}

function mockAIReply(text, view) {
  const t = text.toLowerCase();
  if (t.includes('核心') || t.includes('概念')) {
    return `本课《${view.title}》的核心概念${view.subtitle ? '是 ' + view.subtitle + '。' : '。'}\n\n关键点：\n${(view.objectives || []).map(p => '• ' + p).join('\n')}\n\n建议：先理解概念框架，再动手实操。`;
  }
  if (t.includes('实操') || t.includes('步骤') || t.includes('如何')) {
    return `实操建议：\n\n1️⃣ 准备好本节工具：${(view.tools || ['ChatGPT']).join('、')}\n2️⃣ 跟着课程内容的"流程"区块逐步操作\n3️⃣ 完成产出：${view.deliverable || '本节小作品'}\n4️⃣ 遇到问题随时来问我\n\n点击"进入工坊"按钮即可开始实操！`;
  }
  if (t.includes('案例') || t.includes('例子')) {
    return `举一个真实案例：\n\n某 OPC 学员将本课所学应用到他的电商业务，3 个月内 GMV 从 5 万增长到 30 万。关键动作：\n\n• 严格按 SOP 执行\n• 每天 1 小时复盘\n• 加入 OPC 社区互助\n\n完整案例可在课后社群分享会查看。`;
  }
  if (t.includes('roi') || t.includes('收益') || t.includes('变现')) {
    return `ROI 分析框架：\n\n💰 收入端（增量）：\n• 转化率提升 × 流量 × 客单价\n\n💸 成本端（节省）：\n• 人力替代 + 时间节省 + 错误率降低\n\n📊 投入：\n• AI工具订阅 ¥200~500/月\n• 学习时间 30~60h\n\n典型 ROI：3~10倍，6个月内回本。`;
  }
  return `我已收到你的问题。本课聚焦"${view.title}"，建议结合"📖 课程内容"详细学习。\n\n💡 你也可以试试：核心概念讲解、实操步骤、案例分析、ROI分析。`;
}
