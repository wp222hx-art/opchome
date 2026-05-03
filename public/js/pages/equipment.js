// 设备台账
import { html, fmtMoney } from '../utils.js';

export function renderEquipment(root) {
  const D = window.OPC.data;
  const total = D.equipment.length;
  const totalCount = D.equipment.reduce((s, e) => s + e.count, 0);
  const totalValue = D.equipment.reduce((s, e) => s + e.count * e.value, 0);
  const broken = D.equipment.reduce((s, e) => s + e.broken, 0);

  const categoryGroups = {};
  D.equipment.forEach(e => {
    categoryGroups[e.category] = categoryGroups[e.category] || [];
    categoryGroups[e.category].push(e);
  });

  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🎛️ 设备台账</div>
        <div class="page-subtitle">${total} 类设备 · ${totalCount} 件 · 资产总值 ${fmtMoney(totalValue)}</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn"><i class="fas fa-clipboard-check"></i> 设备盘点</button>
        <button class="btn btn-primary"><i class="fas fa-plus"></i> 新增设备</button>
      </div>
    </div>

    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="stat-card"><div class="stat-icon" style="background:#eef2ff;color:#6366f1;"><i class="fas fa-camera"></i></div><div class="stat-content"><div class="label">设备总数</div><div class="value">${totalCount}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#d1fae5;color:#10b981;"><i class="fas fa-coins"></i></div><div class="stat-content"><div class="label">资产总值</div><div class="value">${fmtMoney(totalValue)}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef3c7;color:#f59e0b;"><i class="fas fa-hand-holding"></i></div><div class="stat-content"><div class="label">外借中</div><div class="value">${D.equipment.reduce((s, e) => s + e.borrower, 0)}</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fee2e2;color:#ef4444;"><i class="fas fa-screwdriver-wrench"></i></div><div class="stat-content"><div class="label">故障设备</div><div class="value">${broken}</div></div></div>
    </div>

    ${Object.entries(categoryGroups).map(([cat, list]) => `
      <div class="card" style="margin-bottom:16px;">
        <div class="card-title"><span><i class="fas fa-folder"></i> ${cat} <span style="color:var(--text-muted);font-weight:400;font-size:12px;">${list.length} 项</span></span></div>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>编号</th><th>名称</th><th>数量</th><th>单价</th><th>总值</th><th>位置</th><th>使用率</th><th>购入</th><th>状态</th></tr></thead>
          <tbody>
            ${list.map(e => `
              <tr>
                <td><strong>${e.id}</strong></td>
                <td>${e.name}</td>
                <td>${e.count}</td>
                <td>${fmtMoney(e.value)}</td>
                <td>${fmtMoney(e.count * e.value)}</td>
                <td>${e.location}</td>
                <td><div class="progress" style="height:6px;"><div class="progress-bar" style="width:${e.usage}"></div></div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${e.usage}</div></td>
                <td>${e.purchaseDate}</td>
                <td>${e.broken > 0 ? `<span class="tag tag-danger">⚠ 故障${e.broken}</span>` : '<span class="tag tag-success">✓ 正常</span>'}</td>
              </tr>`).join('')}
          </tbody>
        </table></div>
      </div>
    `).join('')}
  `;
}
