# Moki Blog

基于 Next.js + React + Tailwind CSS 的个人博客框架。

## 功能

- 简洁的博客 UI，支持亮色/暗色/跟随系统主题切换
- 中英文国际化切换
- 移动端与多尺寸自适应布局
- 博客访问量统计与评论系统（SQLite + Prisma）
- Hexo 风格全局配置 `_config.yml`

## 快速开始

```bash
# 安装依赖（会自动生成配置与 Prisma Client）
npm install

# 复制环境变量
cp .env.example .env

# 初始化数据库
npm run db:push

# 启动开发服务器
npm run dev
```

访问 http://localhost:3020

## 全局配置

编辑根目录 `_config.yml` 即可修改站点名称、头像、导航、主题、评论、社交链接等配置。修改后执行：

```bash
npm run generate-config
```

或在 `npm run dev` / `npm run build` 时自动重新生成。

## 环境变量

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | 数据库连接，默认 `file:./prisma/dev.db` |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL，用于 tRPC 等 |

## 写博客

在 `src/content/blogs/` 下新建 `.mdx` 文件，frontmatter 示例：

```mdx
---
title: 文章标题
createDate: 2024-01-01
updateDate: 2024-01-01
excerpt: 摘要
author: Moki
img: /images/blog/cover.jpg
tags: []
---
```

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式 |
| `npm run build` | 生产构建 |
| `npm run db:push` | 同步数据库 schema |
| `npm run db:studio` | 打开 Prisma Studio |
