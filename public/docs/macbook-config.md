---
title: MacBook Config
createDate: 2020-12-27
updateDate: 2024-11-20
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/macbook.png
excerpt: Macbook的简单配置
---

# 从0开始配置MacBook

## 科学上网

+ ~~ClashX~~
+ Verge
  + [Releases](https://github.com/zzzgydi/clash-verge/releases)

## Homebrew

+ [官网](https://brew.sh/)

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 默认安装图形化软件

```shell
brew install --cask google-chrome qq  wechat  neteasemusic  qqmusic  tencent-meeting  dingtalk  feishu  intellij-idea  visual-studio-code  typora  picgo  apifox 
```

> 如果不知道`brew`是否可以安装想要的软件，可以使用`brew search <app-name>`查找;
>
> 可以根据 `brew info <app-name>`查看想要的软件详情；

## Nvm

```shell
brew install nvm
```

配置环境变量:

```shell
mkdir ~/.nvm
vim ~/.zshrc
```

`.zshrc`:
```shell
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```
重新加载`.zshrc`文件:

```shell
source ~/.zshrc
```

安装几个不同的版本（看个人需要）:

```shell
nvm install 16.15.0 
nvm install 18.12.0
nvm install node # 安装最新Node
```

配置代理:

> 配置的7890是因为我的第一步科学上网配置的端口是7890，根据自己情况配置

```shell
npm config set proxy "http://localhost:7890"
npm config set https-proxy "http://localhost:7890"
```

## Git

```shell
brew install git
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
```













