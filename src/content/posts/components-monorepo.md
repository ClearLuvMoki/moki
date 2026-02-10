---
title: Components monorepo简单实践
published: 2024-11-04
updated: 2024-11-04
abbrlink: components-monorepo
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
│   └── core --- 核心包
│   │ 	├── package.json
│   │ 	└── index.ts
├── apps --- 用作其他多个仓库的入口文件夹，例如放组件库文档或者其余项目
├── package.json
└── tsconfig.json
```

### Core结构说明

```json
{
  // ... 其他配置
  "name": "you package name",
  "version": "x.x.x",
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts",
  "module": "dist/index.js",
  "umd": "dist/index.umd.js",
  // 主要需要定义默认的文件，默认的ts文件
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./index.css": {
      "import": "./dist/index.css",
      "require": "./dist/index.css"
    }
  },
  // 定义哪些文件会文件/文件夹push
  "files": [
    "dist",
    "./README.md"
  ]
}
```

### apps文件夹中的使用

在`apps`中其他项目需要使用`core`中的项目可以在`package.json`中这样定义，最后别忘了`npm install`：

```json
{
  "devDependencies": {
    "you package name": "workspace:*"
  }
}
```

## 动态监听修改

使用`nodemon`可以监听其他文件夹的修改以及实时使用`build`后的产物:

<!-- ![WX20250204-170236@2x](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/WX20250204-170236@2x.png) -->

## 实践项目
::github{repo="ClearLuvMoki/clearluv-editor"}
