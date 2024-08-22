---
title: Electron 上架 Mac store
date: 2024-08-21
updated: 2024-8-21
author: 徐牧之啊
img: electron-mac.jpg
excerpt: Electron配置上架MAS
---
# Electron 上架 Mac store

## Core package version
+ `electron`: 30.0.8
+ `electron-builder`:  24.13.3


## Certifications
+ 根据[官方文档](https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide#legacy-certificate-names)，至少需要两个证书，下载后双击导入**钥匙串**的**登录**中:
    + 3rd Party Mac Developer Application (Mac App Distribution)
    + 3rd Party Mac Developer Installer (Mac Installer Distribution)
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240821230928567.png" width="45%" alt="Apple Certifications"/>
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240821231731637.png"  width="45%" alt="钥匙串导入"/>
</div>

+ 检查上述证书中对应的*Relations证书*是否齐全，在钥匙串中双击对应证书查看*Relations证书*:
	+ 如果证书缺失可前往[苹果官网](https://www.apple.com/certificateauthority/)下载，双击导入**钥匙串**的**系统**中
	+ 可能存在`unable to build chain to self-signed root for signer`等报错，或者导入了Relations证书还是无法使用上述的证书，请尝试下载并在**钥匙串**的**系统**中导入下方   *图(Apple Root Certifications)* 中左侧蓝色区域的根证书
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822153924010.png"/ width="45%" alt="Apple Relations Certifications">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822154518157.png"/ width="45%" alt="Apple Root Certifications">
</div>

## Additional entitlements
+ 对应三个权限文件，按照[Electron官网](https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide#additional-entitlements)设置如果没有特殊的权限设置，默认如下：
```xml
	<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
        <dict>
          <key>com.apple.security.app-sandbox</key>
            <true/>
          <key>com.apple.security.network.client</key>
            <true/>
          <key>com.apple.security.files.user-selected.read-write</key>
            <true/>
          <key>com.apple.security.files.user-selected.read-only</key>
            <true/>
          <key>com.apple.security.cs.allow-jit</key>
            <true/>
          <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
            <true/>
          <key>com.apple.security.cs.allow-dyld-environment-variables</key>
            <true/>
          <key>com.apple.security.cs.disable-library-validation</key>
            <true />
        </dict>
    </plist>

```





