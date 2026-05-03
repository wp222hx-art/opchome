// 应急预案
import { html } from '../utils.js';

export function renderEmergency(root) {
  const D = window.OPC.data;
  root.innerHTML = html`
    <div class="page-header">
      <div>
        <div class="page-title">🚨 突发情况处理预案</div>
        <div class="page-subtitle">总体原则：先控风险 → 再保人员 → 再保秩序 → 后做记录</div>
      </div>
      <button class="btn"><i class="fas fa-phone"></i> 紧急联系</button>
    </div>

    <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg,#fef3c7 0%,#fee2e2 100%);border-left:4px solid var(--danger);">
      <div style="display:flex;gap:14px;align-items:flex-start;">
        <i class="fas fa-triangle-exclamation" style="font-size:36px;color:#dc2626;"></i>
        <div>
          <div style="font-weight:700;font-size:16px;color:#991b1b;">应急联络速查</div>
          <div style="margin-top:8px;display:flex;gap:14px;flex-wrap:wrap;font-size:13px;">
            <span>🚓 报警 110</span>
            <span>🔥 火警 119</span>
            <span>🚑 急救 120</span>
            <span>📞 总负责人 138-XXXX-1888</span>
            <span>🛠️ 物业值班 021-XXXX-8888</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      ${D.emergencyPlans.map(p => `
        <div class="card" style="border-left:4px solid ${p.priority.includes('🔴') ? 'var(--danger)' : p.priority.includes('🟠') ? 'var(--warning)' : 'var(--info)'};">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
            <div>
              <div style="font-size:32px;">${p.icon}</div>
              <div style="font-weight:700;font-size:16px;margin-top:4px;">${p.type}</div>
            </div>
            <span class="tag" style="font-size:11px;">${p.priority}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">处理步骤：</div>
          <ol style="padding-left:20px;font-size:13px;line-height:2;">
            ${p.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
      `).join('')}
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="card-title"><span><i class="fas fa-shield-alt"></i> 必备物资清单</span></div>
      <div class="grid grid-3">
        ${[
          { i: '🩹', n: '急救箱', d: '每层 1 套', p: '¥200' },
          { i: '⚡', n: 'AED 除颤仪', d: '建议配 1 台', p: '¥15-20K' },
          { i: '🧯', n: '灭火器+烟感+应急灯', d: '消防器材', p: '¥10-30K' },
          { i: '📡', n: '4G/5G 备用热点', d: '建议 2 个', p: '¥100/月' },
          { i: '🔌', n: 'UPS 不间断电源', d: '保护数据存储', p: '¥3-5K' },
          { i: '📹', n: '监控+门禁', d: '24h 录像', p: '¥20-50K' }
        ].map(x => `
          <div style="padding:12px;border:1px solid var(--border);border-radius:8px;display:flex;gap:10px;align-items:center;">
            <div style="font-size:28px;">${x.i}</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:13px;">${x.n}</div>
              <div style="font-size:11px;color:var(--text-muted);">${x.d}</div>
            </div>
            <div style="font-weight:700;color:var(--accent);font-size:13px;">${x.p}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
