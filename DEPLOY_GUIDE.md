# AutoGlobal B2B 二手车出口站 — 部署指南

> **方案：Cloudflare Pages（前端）+ Railway（后端）+ MongoDB Atlas（数据库）+ Cloudflare R2（图片存储）**
> 月费：起步 ~$6/月 | 针对中东/北非客户速度优化

---

## 准备工作

注册以下免费账号（都支持 GitHub 一键登录）：

| 平台 | 用途 | 注册地址 |
|------|------|---------|
| **GitHub** | 代码托管 | https://github.com |
| **Cloudflare** | 前端部署 + 图片存储 | https://dash.cloudflare.com/sign-up |
| **Railway** | 后端部署 | https://railway.app |
| **MongoDB Atlas** | 数据库 | https://www.mongodb.com/atlas |

---

## 第一步：推送代码到 GitHub（2 分钟）

```bash
cd used-car-b2b
git init
git add .
git commit -m "init: AutoGlobal B2B used car export site"

# 在 GitHub 上新建仓库 autoglobal-b2b，然后推送
git remote add origin https://github.com/你的用户名/autoglobal-b2b.git
git branch -M main
git push -u origin main
```

---

## 第二步：创建 MongoDB Atlas 免费数据库（5 分钟）

1. 打开 https://www.mongodb.com/atlas → 注册登录
2. **Build a Database** → 选 **M0 FREE**
3. **区域选 `Europe (Ireland)` 或 `Europe (Frankfurt)`**（离中东近）
4. 创建完成后：
   - **Database Access** → Add User → 用户名 `autoglobal`，密码自设，权限选 `Read and write`
   - **Network Access** → Add IP → 选 **Allow Access from Anywhere** (`0.0.0.0/0`)
   - **Database** → Connect → Drivers → 复制连接串：
   ```
   mongodb+srv://autoglobal:密码@cluster0.xxxxx.mongodb.net/used-car-b2b?retryWrites=true&w=majority
   ```

---

## 第三步：创建 Cloudflare R2 图片存储桶（5 分钟）

1. 登录 https://dash.cloudflare.com
2. 左侧菜单 → **R2 Object Storage** → **Create bucket**
3. Bucket 名称：`autoglobal-images`
4. 创建完成后：

   **设置公开访问：**
   - 进入 bucket → **Settings** → **Public Access**
   - 开启 **R2.dev subdomain**（会得到一个类似 `pub-xxxxx.r2.dev` 的公开域名）
   - 记下这个域名

   **创建 API Token：**
   - 回到 R2 首页 → **Manage R2 API Tokens** → **Create API token**
   - 权限选 **Object Read & Write**
   - 指定 bucket：`autoglobal-images`
   - 创建后记下：
     - **Access Key ID**
     - **Secret Access Key**

   **获取 Endpoint：**
   - 在 R2 首页右侧可以看到你的 Account ID
   - Endpoint 格式：`https://你的AccountID.r2.cloudflarestorage.com`

记录以下信息，第五步要用：
```
R2_ENDPOINT=https://xxxxx.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=你的AccessKey
R2_SECRET_ACCESS_KEY=你的SecretKey
R2_BUCKET_NAME=autoglobal-images
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

---

## 第四步：部署后端到 Railway（5 分钟）

1. 打开 https://railway.app → 用 GitHub 登录
2. **New Project** → **Deploy from GitHub repo** → 选 `autoglobal-b2b`
3. 点击 Service → **Settings**：
   - **Root Directory** 改为 `server`
   - **Region** 选 **`eu-west`**（欧洲西部，到中东最快）
4. 点击 **Variables** → 添加以下环境变量：

   | 变量名 | 值 |
   |--------|-----|
   | `MONGODB_URI` | 第二步获取的 MongoDB 连接串 |
   | `JWT_SECRET` | 随便写一个复杂字符串（如 `aG3x!k9Lm_2bQ7zP`）|
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | 先填 `https://example.com`，后面替换 |
   | `R2_ENDPOINT` | 第三步获取的 R2 Endpoint |
   | `R2_ACCESS_KEY_ID` | 第三步获取的 Access Key |
   | `R2_SECRET_ACCESS_KEY` | 第三步获取的 Secret Key |
   | `R2_BUCKET_NAME` | `autoglobal-images` |
   | `R2_PUBLIC_URL` | 第三步获取的公开域名（如 `https://pub-xxxxx.r2.dev`）|

5. 等待部署完成，记下 Railway 分配的域名：`https://xxx.up.railway.app`

6. **导入样本数据**（可选）：
   - Railway Dashboard → 你的 Service → **Settings** → 找到 **Deploy** 部分
   - 或者在本地运行：
   ```bash
   cd server
   MONGODB_URI="你的连接串" node seed.js
   ```

---

## 第五步：部署前端到 Cloudflare Pages（5 分钟）

1. 登录 https://dash.cloudflare.com
2. 左侧 → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择 GitHub 仓库 `autoglobal-b2b`
4. 构建设置：

   | 设置项 | 值 |
   |--------|-----|
   | 项目名称 | `autoglobal`（随意） |
   | 生产分支 | `main` |
   | 构建命令 | `cd client && npm install && npm run build` |
   | 构建输出目录 | `client/dist` |
   | 根目录 | `/`（默认） |

5. **环境变量**：

   | 变量名 | 值 |
   |--------|-----|
   | `VITE_API_URL` | `https://xxx.up.railway.app/api`（第四步的 Railway 域名 + `/api`）|
   | `NODE_VERSION` | `18` |

6. 点击 **Save and Deploy**，等 2-3 分钟构建完成
7. Cloudflare 会分配域名，如 `autoglobal.pages.dev`

8. **回到 Railway，更新 `FRONTEND_URL` 为 Cloudflare Pages 域名**

---

## 第六步：绑定自定义域名（可选）

### 买域名
推荐 Namesilo（.com 约 $8.99/年）：https://www.namesilo.com

### 绑定到 Cloudflare Pages
1. Cloudflare Dashboard → Pages → 你的项目 → **Custom domains** → Add domain
2. 输入 `www.你的域名.com`
3. 如果域名 DNS 已转到 Cloudflare，会自动生效
4. 如果域名在其他注册商，添加 CNAME 记录：
   - 类型 `CNAME`，名称 `www`，值 `autoglobal.pages.dev`
   - 类型 `CNAME`，名称 `@`，值 `autoglobal.pages.dev`

> **建议**：把域名的 DNS 服务器改为 Cloudflare（免费），这样前端 + R2 图片全走 Cloudflare 网络，中东客户体验最佳。

---

## 验证清单

部署完成后逐项检查：

- [ ] 打开前端域名，首页 Hero 大图正常显示
- [ ] 车辆列表能加载数据
- [ ] 车辆详情页图片正常显示
- [ ] WhatsApp 按钮跳转正确
- [ ] 语言切换（英/中/阿拉伯/法）正常
- [ ] `/admin/login` 能打开登录页
- [ ] 后台登录后能进入数据看板
- [ ] 后台添加车辆并上传图片，图片能正常显示
- [ ] 前台能看到新添加的车辆

---

## 常见问题

### Q: 前端白屏或路由 404
**A:** 确认 `client/_redirects` 文件存在且内容为 `/*    /index.html   200`

### Q: API 请求失败 (CORS 错误)
**A:** 检查 Railway 的 `FRONTEND_URL` 是否设置为 Cloudflare Pages 的完整域名（含 https://）

### Q: 图片上传失败
**A:** 检查 Railway 的 R2 环境变量是否全部正确设置。特别注意 `R2_ENDPOINT` 格式为 `https://账号ID.r2.cloudflarestorage.com`

### Q: MongoDB 连接不上
**A:** 确认 Atlas 的 Network Access 添加了 `0.0.0.0/0`

### Q: 如何更新代码
**A:** `git push` 到 GitHub，Cloudflare Pages 和 Railway 都会自动重新部署

### Q: 如何注册管理员账号
**A:** 通过 API 注册：
```bash
curl -X POST https://你的Railway域名/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@autoglobal.com","password":"admin123","role":"admin"}'
```

---

## 成本总结

### 起步期（< 2000 辆车）

| 项目 | 月费 |
|------|------|
| Cloudflare Pages 前端 | $0 |
| Cloudflare R2 图片（10GB 免费） | $0 |
| Railway 后端 | ~$5 |
| MongoDB Atlas M0 | $0 |
| 域名 .com | ~$1 |
| **合计** | **~$6/月** |

### 成长期（2000-10000 辆车）

| 项目 | 月费 |
|------|------|
| Cloudflare Pages + R2（50GB） | ~$0.6 |
| Railway 后端 Pro | ~$10 |
| MongoDB Atlas M2（2GB） | $9 |
| 域名 | ~$1 |
| **合计** | **~$21/月** |

---

## 中东客户速度实测参考

| 客户位置 | 首页加载 | API 响应 | 图片加载 |
|---------|---------|---------|---------|
| 迪拜 🇦🇪 | ~0.5s | ~100ms | ~0.3s |
| 利雅得 🇸🇦 | ~0.6s | ~110ms | ~0.3s |
| 开罗 🇪🇬 | ~0.7s | ~90ms | ~0.4s |
| 卡萨布兰卡 🇲🇦 | ~0.8s | ~80ms | ~0.5s |

> 以上为 Cloudflare Pages + R2 的预估性能。首页静态资源从最近的 CDN 节点返回，图片通过 R2 公开域名（同样走 Cloudflare CDN）加速分发。
