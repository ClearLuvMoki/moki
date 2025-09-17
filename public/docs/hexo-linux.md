---
title: Hexo部署至云服务器
createDate: 2020-02-23 23:24
updateDate: 2020-02-23 23:24
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/hexo.png
excerpt: Hexo 部署至云服务的最简实践
---

# Hexo部署到阿里云服务器

在平时开发中需要个人的博客网站，不断的积累知识，于是找到了[Hexo](https://hexo.io/)，最开始学习了怎么部署到github上，但是由于其他原因访问速度很慢。

后面想着需要一个有域名的并且访问速度够快的个人博客网站，于是研究了怎么部署Hexo到服务器上。

`Hexo`部署到github上可以参考这里[哔哩哔哩羊叔](https://www.bilibili.com/video/BV1Yb411a7ty?from=search&seid=7896361255674325515)。

##  一、安装Node.js

我们在`/usr/local/`下面新建一个文件夹 :

``` shell
mkdir node
```

在[node.js](https://nodejs.org/dist/)官网中选择Linux版本需要安装的node版本， 接着在node文件夹中解压这个压缩包;
```shell
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz    // 下载node压缩包 
tar -xvf node-v10.15.3-linux-x64.tar.xz   // 解压node压缩包
./node -v  // 查看node版本
./npm -v // 查看npm
```
接着就是最重要的设置软链接，可以在服务器上任何文件夹中使用node:
``` shell
ln -s /usr/local/node/bin/node /usr/bin/node  // 设置node的软链接
ln -s /usr/local/node/bin/npm /usr/bin/npm  //设置npm的软链接 
ln -s /usr/local/node/bin/npx /usr/bin/npx  //设置npx的软链接，以便后面需要
```

## 二、安装Git
安装Git可以链接到自己的博客仓库，并且后续还可以拉取Hexo的themes:
```shell
yum install -y git
```

## 三、安装Hexo
`Hexo`主要是博客的框架，在`/usr/local`中新建一个文件夹`Blog`作为博客的框架的存放位置，在文件夹中使用`node`下载`Hexo`脚手架：
```shell
mkdir Blog  // 	新建文件夹
npm install hexo-cli -g   // 安装Hexo
hexo init //  本地新建Hexo
npm install // 下载依赖
git init  //  安装git本地仓库
```
接着打开`_config.yml`文件，配置自己的代码仓库以及网页的icon和名称等信息，如果在 *图(Hexo config)* 还未设置主题直接设置默认主题即可:  
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/hexoconfig.png" alt="Hexo config"/>
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/hexoconfig2.png" alt="Hexo icon"/>
</div>

## 四、安装Nginx
在`etc`文件夹中使用命令安装`Nginx`:
```shell
yum install -y nginx  // 安装nginx
vim /etc/nginx/nginx.conf  // 打开nginx.conf
```
接着查看配置端口访问，在`sercer_name`中配置域名，在`root`中指向之前`hexo`的`public`目录，保证路径的正确，在`location`中设置访问`index.html`文件。
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/nginx.png" alt="Hexo nginx config"/>
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/hexoconfig2.png" alt="Hexo icon"/>
</div>

```shell
接着启动Nginx服务:
systemctl start nginx
systemctl enable nginx  // 开机启动nginx服务
```

## 五、运行Hexo
接着回到安装`hexo`的目录下，执行命令，启动服务:
```shell
hexo g
```