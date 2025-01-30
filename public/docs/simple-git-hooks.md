---
title: Simple git hook
createDate: 2021-5-15
updateDate: 2021-5-15
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/git.png
excerpt: Git 提交的简单规范化
---

# Simple git hook

> 前言: 为了同组内规范化`git`的提交记录，并且可以自定义一些`commit`内容，约束提交规范，以及自动生成一些 change log prefix;

## Packages

```shell
npm install cz-git commitizen simple-git-hooks @commitlint/cli @commitlint/config-conventional
```

## Introduce

### @commitlint/cli, @commitlint/config-conventional

[官网地址](https://commitlint.js.org/guides/local-setup.html)

为了提供一些`commit-msg`的规范，以及`prompt`,约束`git`提交的信息，比如约束提交前缀:

```js
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];

```

### cz-git

[Github](https://cz-git.qbb.sh/zh/)

提供可视化的操作`git`提交的方式;

### simple-git-hooks

[Github](https://github.com/toplenboren/simple-git-hooks#readme)

比 [husky](https://typicode.github.io/husky/) 更加轻量级，简单的`git hook`管理包;

关于`git hook`的介绍请看官方文档[ -> Git ](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

## Start

下载依赖并且写入配置:

```shell
npm install cz-git commitizen simple-git-hooks @commitlint/cli @commitlint/config-conventional;
npm pkg set scripts.prepare="npx simple-git-hooks"
npx simple-git-hooks
npm pkg set scripts.commitlint="commitlint --edit"
npm pkg set scripts.cz="git add . && git-cz"
```

其他配置:

```json
{
     // package.json
  	"scripts": {
      	"commitlint": "commitlint --edit",
        "cz": "git add . && git-cz",
        "prepare": "npx simple-git-hooks"
    },
    "simple-git-hooks": {
      	"pre-commit": "<pre-commit hook:做一些需要在commit前的操作，比如结合 biome/eslint 检查代码>",
        "commit-msg": "npx --no-install commitlint --edit ${1}",
        "preserveUnused": ["commit-msg"]
    },
    "config": {
      "commitizen": {
        // 指定cz-git为使用的适配器
        "path": "node_modules/cz-git"
      }
    }
}
```

然后复制至`commitlint.config.js`:

```js
/** @type {import('cz-git').UserConfig} */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	prompt: {
		alias: {
			f: "docs: fix typos",
			r: "docs: update README",
			s: "style: update code format",
			b: "build: bump dependencies",
			c: "chore: update config",
		},
		messages: {
			type: "选择你要提交的类型 :",
			scope: "选择一个提交范围（可选）:",
			customScope: "请输入自定义的提交范围 :",
			subject: "填写简短精炼的变更描述 :\n",
			body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			footerPrefixesSelect: "选择关联issue前缀（可选）:",
			customFooterPrefix: "输入自定义issue前缀 :",
			footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
			confirmCommit: "是否提交或修改commit ?",
		},
		types: [
			{
				value: "feat",
				name: "feat:      ✨  新增功能 | A new feature",
				emoji: "✨",
			},
			{ value: "fix", name: "fix:       🐞 修复缺陷 | A bug fix", emoji: "🐞" },
			{
				value: "docs",
				name: "docs:      📝 文档更新 | Documentation only changes",
				emoji: "📝",
			},
			{
				value: "style",
				name: "style:     💄 代码格式 | Changes that do not affect the meaning of the code",
				emoji: "💄",
			},
			{
				value: "refactor",
				name: "refactor:  ♻️ 代码重构 | A code change that neither fixes a bug nor adds a feature",
				emoji: "♻️",
			},
			{
				value: "perf",
				name: "perf:      ⚡️ 性能提升 | A code change that improves performance",
				emoji: "⚡️",
			},
			{
				value: "test",
				name: "test:      ✅  测试相关 | Adding missing tests or correcting existing tests",
				emoji: "✅",
			},
			{
				value: "build",
				name: "build:     📦️构建相关 | Changes that affect the build system or external dependencies",
				emoji: "📦️",
			},
			{
				value: "ci",
				name: "ci:        🎡 持续集成 | Changes to our CI configuration files and scripts",
				emoji: "🎡",
			},
			{
				value: "revert",
				name: "revert:    🔨 回退代码 | Revert to a commit",
				emoji: "🔨",
			},
			{
				value: "chore",
				name: "chore:     ⏪️ 其他修改 | Other changes that do not modify src or test files",
				emoji: "⏪️",
			},
		],
		useEmoji: true,
		emojiAlign: "center",
		useAI: false,
		aiNumber: 1,
		themeColorCode: "",
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: "bottom",
		customScopesAlias: "custom",
		emptyScopesAlias: "empty",
		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ["feat", "fix"],
		breaklineNumber: 100,
		breaklineChar: "|",
		skipQuestions: [],
		issuePrefixes: [
			{ value: "closed", name: "closed:   ISSUES has been processed" },
		],
		customIssuePrefixAlign: "top",
		emptyIssuePrefixAlias: "skip",
		customIssuePrefixAlias: "custom",
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		scopeOverrides: undefined,
		defaultBody: "",
		defaultIssues: "",
		defaultScope: "",
		defaultSubject: "",
	},
};

```

检查`git hooks path`：

```shell
git config core.hooksPath
```

如果hooks path不在 `.git/hooks`下，请依次执行如下命令:

```shell
git config core.hooksPath .git/hooks/
npx simple-git-hooks
```
