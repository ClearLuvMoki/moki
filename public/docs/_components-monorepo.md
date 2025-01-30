---
title: Components monorepo简单实践
createDate: 2024-11-04
updateDate: 2024-11-04
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/electron-typeorm.png
---

# Components monorepo简单实践

> 前言： 为了在编写组件库的时候为了拆分组件在生产环境的使用，并且为了同步到组件库文档；

## 初始化项目

```shell
npm init -y
```

## 指定项目的`PakcageManager`和`workspace`文件夹

> 该问指定`pnpm`作为`package manager`,如果使用`yarn , npm`会有不同的配置

```shell
touch pnpm-workspace.yaml
mkdir packages apps
```

指定`workspace`的文件夹：

```yaml
packages:
  - 'packages/**'
  - 'apps/**'
```

## 目录说明

```markdown
Root
├── packages --- 用作组件库的文件夹
├── apps --- 用作其他多个仓库的入口文件夹，例如放组件库文档或者其余项目
├── package.json
└── tsconfig.json
```

