// 工具函数库

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

export const html = (strings, ...values) => {
  let result = '';
  strings.forEach((s, i) => {
    result += s;
    if (i < values.length) {
      const v = values[i];
      if (Array.isArray(v)) result += v.join('');
      else if (v == null) result += '';
      else result += v;
    }
  });
  return result;
};

export const fmtMoney = (n) => '¥' + Number(n).toLocaleString('zh-CN');
export const fmtPct = (n, d = 1) => Number(n).toFixed(d) + '%';
export const fmtDate = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};
export const greet = () => {
  const h = new Date().getHours();
  if (h < 12) return '早上好';
  if (h < 18) return '下午好';
  return '晚上好';
};

export const statusLabel = {
  active: '活跃', expiring: '即将到期', confirmed: '已确认',
  pending: '待处理', completed: '已完成', cancelled: '已取消',
  in_progress: '进行中', upcoming: '即将开始', planning: '筹备中',
  done: '已完成', resolved: '已解决', broken: '故障',
  high: '高', medium: '中', low: '低'
};

export const tagFor = (status) => {
  const map = {
    active: 'tag-success', confirmed: 'tag-success', completed: 'tag-success',
    done: 'tag-success', resolved: 'tag-success',
    pending: 'tag-warning', upcoming: 'tag-warning', in_progress: 'tag-info',
    cancelled: 'tag-muted', broken: 'tag-danger', expiring: 'tag-warning',
    planning: 'tag-info', high: 'tag-danger', medium: 'tag-warning', low: 'tag-muted'
  };
  return map[status] || 'tag-muted';
};

// 模态框
export function openModal(opts) {
  const { title, body, footer, onClose } = opts;
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  mask.innerHTML = `
    <div class="modal" @click.stop>
      <div class="modal-header">
        <div class="modal-title">${title || ''}</div>
        <button class="btn-icon btn" data-close><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">${body || ''}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
    </div>`;
  mask.addEventListener('click', (e) => {
    if (e.target === mask || e.target.closest('[data-close]')) {
      mask.remove();
      onClose && onClose();
    }
  });
  document.body.appendChild(mask);
  return mask;
}

// 简单进度条
export const progressBar = (val, label = '') => `
  <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
    <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${val}%"></div></div>
    <span style="min-width:42px;text-align:right;color:var(--text-muted);">${label || val + '%'}</span>
  </div>`;

// 节流
export function debounce(fn, ms = 300) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

// Chart.js helper
export function makeChart(ctx, type, data, options = {}) {
  if (typeof Chart === 'undefined') return null;
  return new Chart(ctx, { type, data, options: { responsive: true, maintainAspectRatio: false, ...options } });
}
