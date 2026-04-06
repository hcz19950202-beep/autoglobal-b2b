# AutoGlobal B2B 二手车出口独立站 — 完整项目规格书

---

## 一、项目概述

| 项目 | 说明 |
|------|------|
| **项目名称** | AutoGlobal B2B Used Car Export Platform |
| **业务模式** | B2B 二手车出口贸易 |
| **目标客户** | 中东（UAE/沙特/埃及/约旦）、北非（摩洛哥/尼日利亚）等地区的二手车经销商 |
| **技术栈** | React 18 + Vite + TailwindCSS（前端）/ Node.js + Express + MongoDB（后端） |
| **支持语言** | 英语、中文、阿拉伯语（RTL）、法语 |
| **部署方案** | Vercel（前端）+ Railway（后端）+ MongoDB Atlas（数据库），月费约 $6 |

---

## 二、前端页面清单（共 11 个页面）

### 2.1 前台页面（6 个）

| 页面 | 路由 | 功能说明 |
|------|------|---------|
| **首页** | `/` | Hero 大图（视差滚动）+ 搜索栏 + 公告横幅 + 品牌展示 + 广告轮播 + 精选车辆 + 优势介绍 + 数据统计 + 出口流程 + 客户评价 + CTA 号召 |
| **车辆列表** | `/vehicles` | 水平筛选栏（品牌/价格/年份/里程/车身/燃料/变速箱）+ 排序 + 网格卡片 + 分页 + URL 参数同步 |
| **车辆详情** | `/vehicles/:id` | 图片画廊（触控滑动）+ 规格参数表 + 功能配置列表 + 车辆描述 + 询盘按钮 + WhatsApp 联系 + PDF 导出 + 加入对比 + 相似车辆推荐 |
| **车型对比** | `/compare` | 2-4 辆车横向规格对比表，差异项高亮，支持移动端横滚 |
| **关于我们** | `/about` | 公司介绍、使命愿景、历史时间线、团队展示 |
| **联系我们** | `/contact` | 联系表单 + WhatsApp/微信/邮件多渠道 + 公司地址 |

### 2.2 管理后台页面（7 个）

| 页面 | 路由 | 功能说明 |
|------|------|---------|
| **管理员登录** | `/admin/login` | 邮箱+密码登录，JWT 认证，演示账号提示 |
| **数据看板** | `/admin` | 统计卡片（车辆总数/在售/已售/新询盘）+ 最近询盘表 + 月度销售柱状图 + 热销车型 |
| **车辆管理** | `/admin/vehicles` | 车辆列表（图片/信息/品牌/价格/状态）+ 搜索 + 分页 + 编辑/删除 + 添加车辆 |
| **车辆表单** | `/admin/vehicles/new` `/admin/vehicles/edit/:id` | 完整表单：基本信息/规格/物流状态/图片上传/描述/配置标签 + 精选开关 |
| **询盘管理** | `/admin/inquiries` | 状态 Tab 筛选（全部/待处理/已联系/谈判中/已成交）+ 详情弹窗 + 状态更新 |
| **首页装修** | `/admin/homepage` | 板块排序拖拽 + Hero 大图/文案/遮罩 + 公告栏 + 广告轮播位 CRUD + 数据统计编辑 + 主题色配置 |
| **系统设置** | `/admin/settings` | WhatsApp 号码 + 默认消息 + 联系邮箱/电话/地址 + 公司名称 + 报价币种 |

---

## 三、前端组件清单（19 个）

| 组件 | 文件 | 功能 |
|------|------|------|
| **Header** | `Header.jsx` | 固定顶部导航栏 + 语言切换下拉 + 移动端汉堡菜单 |
| **Footer** | `Footer.jsx` | 深色页脚（公司信息/快捷链接/品牌/联系方式/信任徽章）|
| **HeroBanner** | `HeroBanner.jsx` | 视差滚动背景 + 毛玻璃搜索栏 + 浮动光斑 + 渐变遮罩（蓝/绿/深色可选）|
| **SearchFilters** | `SearchFilters.jsx` | 瓜子网式水平筛选栏 + 车身类型 Tab + 筛选标签展示 + 移动端折叠 |
| **VehicleCard** | `VehicleCard.jsx` | 3D 悬浮卡片 + 金色星标 Featured + 对比按钮 + 价格/参数/位置 |
| **VehicleGrid** | `VehicleGrid.jsx` | 响应式网格（4/3/2列）+ 骨架屏加载 + 空状态 |
| **Pagination** | `Pagination.jsx` | 页码导航 + 上/下页 |
| **InquiryForm** | `InquiryForm.jsx` | 询盘弹窗表单（姓名/邮箱/电话/公司/目标国/港口/数量/留言）+ WhatsApp 快捷按钮 |
| **BrandShowcase** | `BrandShowcase.jsx` | 品牌 Logo 网格（10 品牌）+ 悬浮变彩色 + 点击跳转筛选 |
| **WhyChooseUs** | `WhyChooseUs.jsx` | 4 列优势展示 + 渐变图标背景 + 滚动渐入动画 |
| **StatsCounter** | `StatsCounter.jsx` | 数字滚动计数器 + 深蓝渐变背景 + 网格纹理装饰 |
| **ExportProcess** | `ExportProcess.jsx` | 5 步出口流程（询盘→检测→文件→发运→交付）+ 虚线连接 + 悬浮放大 |
| **Testimonials** | `Testimonials.jsx` | 客户评价轮播（4 条中东客户证言）+ 金色左边框 + 星级评分 |
| **TrustBadges** | `TrustBadges.jsx` | 信任认证横栏（SGS/ISO/200 点检测/安全支付/全球保险）|
| **WhatsAppButton** | `WhatsAppButton.jsx` | 右下角浮动按钮 + 脉冲动画 + 悬浮提示 + 从全局配置读取号码 |
| **PdfExport** | `PdfExport.jsx` | 生成 A4 车辆规格报告（品牌头+FOB 价+参数+图片+联系方式）|
| **CompareBar** | `CompareBar.jsx` | 底部对比浮条（缩略图+数量+比较按钮）|
| **MobileBottomNav** | `MobileBottomNav.jsx` | 移动端底部 4 Tab 导航（首页/车辆/对比/联系）+ 对比徽标 |
| **ProtectedRoute** | `ProtectedRoute.jsx` | JWT 路由守卫，未登录重定向到 /admin/login |

---

## 四、全局状态管理

### 4.1 Contexts（3 个）

| Context | 文件 | 功能 |
|---------|------|------|
| **SiteConfigContext** | `contexts/SiteConfigContext.jsx` | 全站配置中心：WhatsApp 号码、联系方式、公司信息、首页装修配置（Hero/公告/广告/板块排序/统计数据/主题色）。持久化到 localStorage |
| **CompareContext** | `contexts/CompareContext.jsx` | 车辆对比列表管理：添加/移除/清空/数量限制（最多 4 辆）|
| **LanguageContext** | `i18n/LanguageContext.jsx` | 多语言切换：当前语言/翻译函数 t()/RTL 检测/语言持久化 |

### 4.2 Custom Hooks（2 个）

| Hook | 文件 | 功能 |
|------|------|------|
| **useScrollReveal** | `hooks/useScrollReveal.js` | IntersectionObserver 滚动渐入动画，支持子元素交错延迟 |
| **useCountUp** | `hooks/useCountUp.js` | 数字从 0 滚动到目标值动画，支持解析 "10,000+" 格式 |

---

## 五、多语言支持

| 语言 | 文件 | RTL | 覆盖模块 |
|------|------|-----|---------|
| 英语 (English) | `locales/en.json` | LTR | 16 个模块全覆盖 |
| 中文 (简体) | `locales/zh.json` | LTR | 16 个模块全覆盖 |
| 阿拉伯语 (العربية) | `locales/ar.json` | **RTL** | 16 个模块全覆盖，CSS 自动反转布局 |
| 法语 (Français) | `locales/fr.json` | LTR | 16 个模块全覆盖 |

**翻译模块**：nav / hero / brands / featured / whyUs / stats / cta / listing / filters / card / detail / inquiry / compare / whatsapp / footer / pdf

---

## 六、后端 API 接口

### 6.1 认证接口 `/api/auth`

| 方法 | 路径 | 权限 | 功能 |
|------|------|------|------|
| POST | `/api/auth/register` | 公开 | 注册新用户（含角色 admin/buyer）|
| POST | `/api/auth/login` | 公开 | 登录获取 JWT Token |
| GET | `/api/auth/me` | 需登录 | 获取当前用户信息 |

### 6.2 车辆接口 `/api/vehicles`

| 方法 | 路径 | 权限 | 功能 |
|------|------|------|------|
| GET | `/api/vehicles` | 公开 | 车辆列表（支持 brand/model/年份范围/价格范围/里程范围/bodyType/fuelType/transmission/search 全文搜索/sort 排序/page+limit 分页）|
| GET | `/api/vehicles/featured` | 公开 | 精选车辆（isFeatured=true，限 6 条）|
| GET | `/api/vehicles/brands` | 公开 | 品牌列表（distinct）|
| GET | `/api/vehicles/:id` | 公开 | 车辆详情（自动 +1 viewCount）|
| POST | `/api/vehicles` | 管理员 | 创建车辆 |
| PUT | `/api/vehicles/:id` | 管理员 | 更新车辆 |
| DELETE | `/api/vehicles/:id` | 管理员 | 删除车辆 |

### 6.3 询盘接口 `/api/inquiries`

| 方法 | 路径 | 权限 | 功能 |
|------|------|------|------|
| POST | `/api/inquiries` | 公开 | 提交询盘 |
| GET | `/api/inquiries` | 管理员 | 获取所有询盘（populate 车辆信息）|
| PUT | `/api/inquiries/:id/status` | 管理员 | 更新询盘状态（new/contacted/negotiating/closed）|

---

## 七、数据模型

### 7.1 Vehicle（车辆）

| 字段 | 类型 | 说明 |
|------|------|------|
| title | String | 车辆标题 |
| brand | String | 品牌 |
| model | String | 型号 |
| year | Number | 年份 |
| mileage | Number | 里程 (km) |
| price | Number | 价格 (USD) |
| currency | String | 币种，默认 USD |
| bodyType | String | 车身类型 (sedan/suv/mpv/truck/van/coupe) |
| fuelType | String | 燃料 (gasoline/diesel/electric/hybrid) |
| transmission | String | 变速箱 (auto/manual) |
| driveType | String | 驱动 (FWD/RWD/AWD/4WD) |
| engineCapacity | String | 排量 |
| exteriorColor | String | 外观色 |
| interiorColor | String | 内饰色 |
| vin | String | VIN 码 |
| condition | String | 车况 (excellent/good/fair) |
| location | String | 所在地 |
| port | String | 出口港口 |
| images | [String] | 图片 URL 数组 |
| thumbnail | String | 缩略图 |
| description | String | 描述 |
| features | [String] | 功能配置列表 |
| stockStatus | String | 库存状态 (available/reserved/sold) |
| isFeatured | Boolean | 是否精选 |
| viewCount | Number | 浏览次数 |
| createdAt | Date | 创建时间 |

**索引**：title + brand + model 全文索引（支持搜索）

### 7.2 User（用户）

| 字段 | 类型 | 说明 |
|------|------|------|
| name | String | 姓名 |
| email | String | 邮箱（唯一）|
| password | String | 密码（bcrypt 加密）|
| role | String | 角色 (admin/buyer) |
| company | String | 公司名 |
| country | String | 国家 |
| phone | String | 电话 |

### 7.3 Inquiry（询盘）

| 字段 | 类型 | 说明 |
|------|------|------|
| vehicleId | ObjectId (ref Vehicle) | 关联车辆 |
| buyerName | String | 买家姓名 |
| buyerEmail | String | 邮箱 |
| buyerPhone | String | 电话 |
| company | String | 公司名 |
| country | String | 国家 |
| shippingDestination | String | 目的港 |
| quantity | Number | 采购数量 |
| message | String | 留言 |
| status | String | 状态 (new/contacted/negotiating/closed) |
| createdAt | Date | 创建时间 |

---

## 八、UI/UX 特性

### 8.1 动效系统

| 动效 | 说明 |
|------|------|
| 视差滚动 | Hero 背景图随页面滚动位移 |
| 滚动渐入 | 板块进入视口时从下方淡入（useScrollReveal）|
| 数字计数器 | 统计数字从 0 动态增长（useCountUp）|
| 3D 卡片悬浮 | 车辆卡片 hover 时浮起并加深阴影（card-3d）|
| 脉冲光效 | WhatsApp 按钮外围绿色脉冲圈 |
| 渐变文字 | 可选的动态渐变色文字效果 |
| 骨架屏 | 车辆列表加载中显示动画占位 |

### 8.2 移动端适配

| 特性 | 说明 |
|------|------|
| 底部导航栏 | 4 Tab 固定底部（首页/车辆/对比/联系）|
| 触控手势 | 详情页图片画廊支持左右滑动 |
| 折叠筛选 | 移动端筛选器可展开/收起 |
| 最小触控区 | 所有按钮/链接最小 44px 高度 |
| iOS 防缩放 | select 字号 16px 防止自动放大 |
| 图片计数器 | 画廊底部 "1/4" 计数显示 |
| 响应断点 | 2 列 (mobile) / 3 列 (tablet) / 4 列 (desktop) |

### 8.3 中东市场适配

| 特性 | 说明 |
|------|------|
| RTL 布局 | 阿拉伯语自动切换 dir="rtl"，margin/padding/方向全反转 |
| 金色元素 | Featured 徽章使用金色渐变（amber-500 → yellow-400）|
| 中东客户证言 | 来自 UAE/摩洛哥/埃及/沙特的真实场景评价 |
| WhatsApp 优先 | 浮动按钮 + 详情页 + 询盘弹窗 + 页脚多处入口 |
| 目的港字段 | 询盘表单含 Destination Port 字段（如 Jebel Ali）|
| FOB 报价 | 价格标注 "FOB Price (USD)"，附欧元换算 |

---

## 九、后台装修系统

管理员可在 `/admin/homepage` 可视化配置首页，无需改代码：

| 配置项 | 说明 |
|--------|------|
| **板块排序** | 拖拽调整 6 个板块的显示顺序（品牌/广告/精选/优势/统计/CTA）|
| **板块显隐** | 每个板块可单独开关 |
| **Hero 大图** | 替换背景图（URL 或本地上传）+ 自定义标题/副标题 |
| **遮罩风格** | 蓝色渐变 / 绿色渐变 / 深色渐变 三选一 |
| **公告横幅** | 开关 + 文字 + 链接 + 6 种预设颜色 |
| **广告轮播** | 多个广告位增删 + 标题/图片/链接 + 启用/禁用 |
| **数据统计** | 自定义 4 项数字（出口车辆/覆盖国家/合作伙伴/行业经验）|
| **主题色** | 主色 + CTA 色，预设色板 + 自定义 hex |

---

## 十、部署架构

```
                    ┌──────────────┐
                    │   用户浏览器   │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┐ ┌───▼────┐ ┌─────▼──────┐
        │  Vercel    │ │ WhatsApp│ │   域名     │
        │  前端 CDN  │ │  wa.me  │ │  DNS/SSL   │
        │ (全球节点) │ │         │ │ (Namesilo) │
        └─────┬─────┘ └────────┘ └────────────┘
              │ API 请求
        ┌─────▼──────────┐
        │   Railway      │
        │ 后端 Node.js   │
        │ (eu-west 欧洲) │
        └─────┬──────────┘
              │
        ┌─────▼──────────┐
        │ MongoDB Atlas  │
        │ 免费集群       │
        │ (eu-west 欧洲) │
        └────────────────┘
```

| 服务 | 平台 | 月费 |
|------|------|------|
| 前端 CDN | Vercel | $0 |
| 后端 API | Railway (eu-west) | ~$5 |
| 数据库 | MongoDB Atlas (eu-west) | $0 |
| 域名 | Namesilo .com | ~$0.8 (年均) |
| **合计** | | **~$6/月** |

---

## 十一、技术依赖

### 前端 (client)

| 依赖 | 版本 | 用途 |
|------|------|------|
| react | 18.2 | UI 框架 |
| react-router-dom | 6.22 | 路由 |
| axios | 1.6 | HTTP 请求 |
| tailwindcss | 3.4 | 样式框架 |
| @headlessui/react | 1.7 | 无障碍弹窗 |
| react-icons | 5.0 | 图标库 |
| lucide-react | 0.344 | 图标库（后台）|
| swiper | 11.0 | 轮播 |
| framer-motion | 11.0 | 动画 |

### 后端 (server)

| 依赖 | 版本 | 用途 |
|------|------|------|
| express | 4.18 | Web 框架 |
| mongoose | 7.1 | MongoDB ORM |
| bcryptjs | 2.4 | 密码加密 |
| jsonwebtoken | 9.0 | JWT 认证 |
| cors | 2.8 | 跨域 |
| multer | 1.4 | 文件上传 |
| express-validator | 7.0 | 请求校验 |

---

## 十二、项目文件总数

| 目录 | 文件数 |
|------|--------|
| client/src/components | 19 |
| client/src/pages | 6 |
| client/src/pages/admin | 8 |
| client/src/contexts | 2 |
| client/src/hooks | 2 |
| client/src/i18n | 5 |
| client/src/services | 1 |
| client (配置文件) | 7 |
| server | 12 |
| 根目录 | 3 |
| **合计** | **65 个文件** |

---

## 十三、种子数据

`server/seed.js` 包含 **21 条**示范车辆数据，覆盖：
- 品牌：Toyota, Honda, BMW, Mercedes, Tesla, Ford, Hyundai, Lexus, Audi, Nissan 等
- 年份：2018-2024
- 价格：$15,000 - $95,000
- 车身：轿车/SUV/皮卡/MPV
- 地区：日本/中国/德国/美国/UAE

---

*文档生成时间：2026-03-31*
*项目版本：1.0.0*
