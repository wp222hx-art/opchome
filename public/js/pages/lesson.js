// 课时详情（沉浸式阅读 + Quiz + AI助教 + 笔记）
// 支持两种模式：
//  - 通用基础课（C01-C05，使用 baseLessons + lessonContent）
//  - 课程章节（任意课程ID + 章节ID，使用 courseDetails）
//  - 行业赛道课（赛道ID-S?-?，使用 trackLessons）
import { html } from '../utils.js';
import { courseDetails, ensureBlocks } from '../data/course-details.js';
import { trackLessons } from '../data/track-lessons.js';
import { getRecipes, toolIcon } from '../data/ai-recipes.js';

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
    } else if (activeTab === 'recipe') {
      const recipes = getRecipes(view.id, view.title);
      c.innerHTML = `
        <div style="background:linear-gradient(135deg,#eef2ff,#fae8ff);padding:14px 16px;border-radius:10px;margin-bottom:14px;font-size:13px;color:var(--text-secondary);">
          💡 本节配套 <b>${recipes.length}</b> 个 AI 操作配方，每个含<b>具体工具</b>、<b>提示词模板</b>、<b>操作步骤</b>。配置好 <a onclick="OPC.go('ai-settings')" style="cursor:pointer;color:var(--primary);font-weight:600;">AI 配置中心</a> 后可<b>一键真实运行</b>，未配置则展示渲染后的提示词。
        </div>
        ${recipes.map((re, idx) => renderRecipeCard(re, idx, view)).join('')}
      `;
      // 绑定按钮
      recipes.forEach((re, idx) => {
        const cid = `recipe-${idx}`;
        document.getElementById(cid + '-copy')?.addEventListener('click', () => {
          const txt = renderPromptWithVars(re, idx);
          navigator.clipboard.writeText(txt);
          OPC.toast('提示词已复制到剪贴板', 'success');
        });
        document.getElementById(cid + '-run')?.addEventListener('click', () => runRecipe(re, idx, view));
      });
    } else if (activeTab === 'ai') {
      c.innerHTML = `
        <div style="display:flex;flex-direction:column;height:60vh;background:var(--bg);border-radius:12px;">
          <div class="chat-area" id="chat-area">
            ${chatMessages.map(m => `
              <div class="chat-msg ${m.role === 'user' ? 'user' : ''}">
                <div class="chat-avatar">${m.role === 'user' ? 'U' : '🤖'}</div>
                <div class="chat-bubble">${m.text.replace(/\n/g, '<br>')}</div>
              </div>`).join('')}
          </div>
          <div style="padding:8px 12px;display:flex;gap:6px;flex-wrap:wrap;">
            ${['核心概念讲解', '实操步骤', '案例分析', '常见问题', 'ROI分析'].map(q =>
              `<button class="btn btn-sm" onclick="OPC.askAI('${q}')">${q}</button>`
            ).join('')}
          </div>
          <div class="chat-input-bar">
            <input id="chat-input" placeholder="向 AI 助教提问（已接入真实 AI，需配置 Key）..." onkeypress="if(event.key==='Enter')OPC.askAI(this.value)">
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
    // 显示"正在思考"
    chatMessages.push({ role: 'ai', text: '⏳ AI 正在思考...' });
    renderTab();
    const inp = document.getElementById('chat-input'); if (inp) inp.value = '';

    // 构造系统提示词 + 课时上下文
    const tools = (view.tools || []).join('、');
    const systemPrompt = `你是 OPC 学院的 AI 助教，擅长把 AI 工具用到学员的真实业务场景中。当前学员正在学习课时《${view.title}》${view.subtitle ? '（' + view.subtitle + '）' : ''}。\n本节学习目标：${(view.objectives || []).join('；')}。\n本节涉及工具：${tools || '通用 AI 工具'}。\n本节产出物：${view.deliverable || '本节小作品'}。\n请结构化、简明、可执行地回答，多用分点和具体工具名称。`;
    const lessonContext = `课时标题：${view.title}；课时ID：${view.id}；推荐工具：${tools}`;

    const history = chatMessages.slice(0, -2)
      .filter(m => m.text && !m.text.startsWith('⏳'))
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const reply = await OPC.api('/ai/chat', 'POST', {
        lessonId: view.id, message: text, systemPrompt, lessonContext, history
      });
      const answer = (reply && reply.success && reply.data && reply.data.reply)
        ? reply.data.reply
        : (reply && reply.message ? '⚠️ ' + reply.message : mockAIReply(text, view));
      // 替换"正在思考"
      chatMessages.pop();
      chatMessages.push({ role: 'ai', text: answer });
      renderTab();
      const area = document.getElementById('chat-area');
      if (area) area.scrollTop = area.scrollHeight;
    } catch (e) {
      chatMessages.pop();
      chatMessages.push({ role: 'ai', text: '❌ 调用失败：' + e.message });
      renderTab();
    }
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
          { k: 'recipe', n: '🛠️ AI 操作配方' },
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

// ============== AI 配方渲染 ==============
// 把变量值渲染到提示词模板
function renderPromptWithVars(recipe, idx) {
  let prompt = recipe.prompt || '';
  (recipe.variables || []).forEach(v => {
    const input = document.getElementById(`recipe-${idx}-var-${v.name}`);
    const val = (input && input.value) || v.placeholder || '';
    prompt = prompt.split('{' + v.name + '}').join(val);
  });
  return prompt;
}

function renderRecipeCard(re, idx, view) {
  const cid = `recipe-${idx}`;
  const cat = ({
    text: '📝 文本', image: '🎨 视觉', video: '🎬 视频', audio: '🎙️ 音频',
    agent: '🤝 智能体', code: '💻 代码', data: '📊 数据'
  })[re.category] || '🛠️';
  const diff = '⭐'.repeat(Math.min(re.difficulty || 1, 5));

  return `
    <div class="card" style="margin-bottom:14px;border-left:4px solid var(--primary);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
        <div style="flex:1;min-width:250px;">
          <h3 style="margin:0;font-size:17px;">
            ${toolIcon(re.tool)} ${re.title}
          </h3>
          <div style="margin-top:6px;font-size:13px;color:var(--text-secondary);display:flex;gap:10px;flex-wrap:wrap;">
            <span><b>主力：</b>${re.tool}</span>
            ${re.alternatives && re.alternatives.length ? `<span><b>替代：</b>${re.alternatives.join(' / ')}</span>` : ''}
            <span>${cat}</span>
            <span>难度 ${diff}</span>
            <span>💰 ${re.cost || '免费'}</span>
          </div>
        </div>
      </div>

      ${re.steps && re.steps.length ? `
      <div style="margin:10px 0;">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:6px;">📋 操作步骤</div>
        <ol style="margin:0;padding-left:20px;font-size:13.5px;line-height:1.8;color:var(--text-secondary);">
          ${re.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>` : ''}

      ${re.variables && re.variables.length ? `
      <div style="margin:10px 0;padding:10px;background:var(--bg-hover);border-radius:8px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">✏️ 填入你的变量（变量值会自动替换到提示词的 {var} 占位）</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;">
          ${re.variables.map(v => `
            <div>
              <label style="display:block;font-size:11px;color:var(--text-muted);margin-bottom:2px;">${v.label || v.name}</label>
              <input id="${cid}-var-${v.name}" class="form-input" style="font-size:13px;" placeholder="${v.placeholder || ''}" />
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <div style="margin:10px 0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:13px;font-weight:600;">💬 提示词模板</span>
          <div style="display:flex;gap:6px;">
            <button id="${cid}-copy" class="btn btn-sm" title="复制提示词"><i class="fa-solid fa-copy"></i> 复制</button>
            <button id="${cid}-run" class="btn btn-sm btn-primary" title="一键调用 AI"><i class="fa-solid fa-bolt"></i> 一键运行</button>
          </div>
        </div>
        <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;font-size:13px;line-height:1.7;white-space:pre-wrap;word-break:break-word;max-height:280px;overflow:auto;font-family:'JetBrains Mono','Cascadia Code',Consolas,monospace;">${escapeHtml(re.prompt || '')}</pre>
      </div>

      ${re.expected ? `<div style="font-size:13px;color:var(--text-secondary);margin:6px 0;"><b>📦 预期产出：</b>${re.expected}</div>` : ''}
      ${re.tips && re.tips.length ? `
      <div style="background:#fef3c7;border-left:3px solid #f59e0b;padding:8px 12px;border-radius:6px;margin-top:8px;font-size:13px;">
        <b style="color:#92400e;">💡 关键提示：</b>
        <ul style="margin:4px 0 0;padding-left:18px;color:#78350f;">${re.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>` : ''}

      <div id="${cid}-result" style="margin-top:10px;"></div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

async function runRecipe(re, idx, view) {
  const cid = `recipe-${idx}`;
  const result = document.getElementById(cid + '-result');
  if (!result) return;
  result.innerHTML = `<div style="background:var(--bg-hover);padding:12px;border-radius:8px;color:var(--text-muted);font-size:13px;">⏳ AI 正在生成，请稍候 5-30 秒...</div>`;

  // 收集变量
  const variables = {};
  (re.variables || []).forEach(v => {
    const input = document.getElementById(`${cid}-var-${v.name}`);
    variables[v.name] = (input && input.value) || v.placeholder || '';
  });

  try {
    const resp = await OPC.api('/ai/recipe/run', 'POST', {
      promptTemplate: re.prompt || '',
      variables,
      lessonTitle: view.title,
      toolName: re.tool
    });
    if (resp && resp.success && resp.data) {
      const d = resp.data;
      result.innerHTML = `
        <div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:8px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#166534;margin-bottom:8px;">
            <span>✅ AI 生成结果 · 模型 <code>${d.model || '-'}</code> · Provider <code>${d.provider || '-'}</code></span>
            <button class="btn btn-sm" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent);OPC.toast('已复制','success')"><i class="fa-solid fa-copy"></i> 复制结果</button>
          </div>
          <div style="background:white;padding:12px;border-radius:6px;white-space:pre-wrap;font-size:13.5px;line-height:1.7;color:#111;max-height:500px;overflow:auto;">${escapeHtml(d.output || '(无返回)')}</div>
        </div>
      `;
    } else {
      result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:10px;border-radius:8px;color:#991b1b;">❌ ${(resp && resp.message) || '调用失败'}<br><span style="font-size:12px;">提示：到 <a onclick="OPC.go('ai-settings')" style="cursor:pointer;color:var(--primary);">AI 配置中心</a> 配置 API Key 后即可获得真实 AI 结果。</span></div>`;
    }
  } catch (e) {
    result.innerHTML = `<div style="background:#fef2f2;border:1px solid #fca5a5;padding:10px;border-radius:8px;color:#991b1b;">❌ ${e.message}</div>`;
  }
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
