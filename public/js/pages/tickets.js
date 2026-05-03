// 工单/通知
import { html, tagFor, statusLabel } from '../utils.js';

export function renderTickets(root) {
  const D = window.OPC.data;
  const t = D.tickets;
  const counts = {
    pending: t.filter(x => x.status === 'pending').length,
    in_progress: t.filter(x => x.status === 'in_progress').length,
    resolved: t.filter(x => x.status === 'resolved').length
  };

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🎫 工单与通知</div>
        <div class="page-subtitle">投诉24小时内闭环 · 报修30分钟内响应、2小时内修复</div>
      </div>
      <button class="btn btn-primary"><i class="fas fa-plus"></i> 新建工单</button>
    </div>

    <div class="grid grid-3" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-hourglass"></i></div><div class="stat-content"><div class="label">待处理</div><div class="value">${counts.pending}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#cffafe;color:#0891b2;"><i class="fas fa-spinner"></i></div><div class="stat-content"><div class="label">处理中</div><div class="value">${counts.in_progress}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-check-circle"></i></div><div class="stat-content"><div class="label">已解决</div><div class="value">${counts.resolved}</div></div></div>
    </div>

    <div class="card" style="padding:0;">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);font-weight:700;"><i class="fas fa-list"></i> 工单列表</div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>工单号</th><th>类型</th><th>标题</th><th>提交人</th><th>分派</th><th>优先级</th><th>状态</th><th>创建时间</th><th></th></tr></thead>
        <tbody>
          ${t.map(x => `
            <tr>
              <td><strong>${x.id}</strong></td>
              <td><span class="tag">${x.type}</span></td>
              <td>${x.title}</td>
              <td>${x.submitter}</td>
              <td>${x.assignee}</td>
              <td><span class="tag ${tagFor(x.priority)}">${statusLabel[x.priority]}</span></td>
              <td><span class="tag ${tagFor(x.status)}">${statusLabel[x.status]}</span></td>
              <td>${x.createdAt}</td>
              <td>
                <button class="btn btn-sm"><i class="fas fa-eye"></i></button>
                ${x.status !== 'resolved' ? '<button class="btn btn-sm btn-success">处理</button>' : ''}
              </td>
            </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  `;
}
