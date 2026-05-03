# OPC 管理平台 (OPC Management Platform)

> OPC社区"一人公司"学习与运营一体化前端平台
> 配套《OPC社区运营手册V2.0》、《OPC培训课程体系V2.0》、《OPC Learning OS》

## 技术栈（极致轻量级）

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | HTML5 + Vanilla JS (ES Modules) | 无构建、无编译，秒开 |
| 响应式 | Alpine.js 3.x (CDN) | 仅 ~15KB，替代 React/Vue |
| 样式 | Tailwind CSS (CDN) + 自定义 CSS 变量 | 主题/深色模式 |
| 图表 | Chart.js 4.x (CDN) | 雷达图/进度图/财务图 |
| 图标 | Font Awesome 6.x (CDN) | 1400+ 图标 |
| 服务 | Express.js | 静态资源 + Mock API |
| 数据 | 单文件 JSON DB (db.json) + localStorage | 极轻量"AI数据库"，零依赖、读写极快 |

## 平台架构

```
OPC 管理平台
├── 学习端 (Learning OS)
│   ├── 学习仪表盘
│   ├── 课程体系 (40+ 门课程，4阶进阶)
│   ├── 课时学习 (8种区块 + AI助教 + Quiz)
│   ├── AI智能体工坊
│   ├── 行业提示词库
│   ├── 学习进度 (雷达图)
│   └── 成就徽章
└── 运营端 (Operation Center)
    ├── 运营总览
    ├── 会员管理 (4级会员/积分/续费)
    ├── 场地预约 (7类场地)
    ├── 活动管理 (6步法)
    ├── 设备台账
    ├── SOP执行
    ├── 财务看板 (收入/成本/ROI)
    └── KPI考核
```

## 启动方式

```bash
npm install
npm start
# 访问 http://localhost:3000
```

## API 接口（预留后端 AI 对接）

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/courses` | GET | 课程列表 |
| `/api/lessons/:id` | GET | 课时详情 |
| `/api/members` | GET/POST | 会员管理 |
| `/api/bookings` | GET/POST | 场地预约 |
| `/api/events` | GET/POST | 活动管理 |
| `/api/equipment` | GET | 设备台账 |
| `/api/finance` | GET | 财务数据 |
| `/api/kpi` | GET | KPI数据 |
| `/api/ai/chat` | POST | AI对话（接入 OpenAI/Claude/Coze/Dify 即可） |
| `/api/ai/agents` | GET/POST/DELETE | 智能体配置管理 |
| `/api/ai/prompt/run` | POST | 提示词执行（待对接真实模型） |
| `/api/ai/knowledge` | GET/POST | 知识库管理（向量检索预留） |
| `/api/health` | GET | 服务健康检查 |

所有 AI 相关接口均预留 stub，后端可直接替换为真实 AI 服务。

## 数据库说明

采用 **单文件 JSON 数据库** (`server/db.json`)：
- ✅ 零依赖、零配置、毫秒级读写
- ✅ 支持智能体、笔记、工单、预约、活动、知识库等存储
- ✅ 后续可平滑迁移到 SQLite / lowdb / Vector DB
- ✅ 适合"一人公司"轻量化运营场景

## 项目目录

```
webapp/
├── public/                    # 前端静态资源
│   ├── index.html             # SPA 入口
│   ├── css/main.css           # 全局样式（亮/暗色主题）
│   └── js/
│       ├── app.js             # 主应用 + 路由分发
│       ├── utils.js           # 工具函数
│       ├── data/              # Mock 数据
│       │   ├── courses.js     # 课程/赛道/提示词/成就
│       │   └── operations.js  # 会员/场地/活动/财务/KPI
│       └── pages/             # 18 个页面渲染模块
└── server/
    ├── app.js                 # Express 服务器 + Mock API
    └── db.json                # 轻量 JSON 数据库（运行时生成）
```

