---
title: Electron 上架 Mac store
createDate: 2024-04-21
updateDate: 2024-04-21
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/electron-mac.png
excerpt: Electron上架Mac Store全流程
---
# Electron 上架 Mac store

> 开始前需要购买 Apple Developer 账号，¥688一年

## Core package version
+ `electron`: 30.0.8
+ `electron-builder`:  24.13.3

## Profiles
### 创建证书助理
将创建的`CertificateSigningRequest.certSigningRequest`的文件可以按照如下方式保存在本地，或者使用邮箱发送：
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822185425314.png" width="45%" alt="Create SigningRequest">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822185523593.png" width="45%" alt="Save SigningRequest">
</div>

## Certifications
+ 创建证书需要`Signing request file`即上面创建的`CertificateSigningRequest.certSigningRequest`文件，创建时候导入即可;
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
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822153924010.png" width="45%" alt="Apple Relations Certifications">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822154518157.png" width="45%" alt="Apple Root Certifications">
</div>

## Additional entitlements
对应三个权限文件，按照[Electron官网](https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide#additional-entitlements)设置，如果没有特殊的权限设置，默认如下：
### 1. entitlements.mas.plist
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
### 2. entitlements.mas.inherit.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 	"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>com.apple.security.app-sandbox</key><true/>
      <key>com.apple.security.inherit</key><true/>
    </dict>
  </plist>
```
### 3. entitlements.mas.loginhelper.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
   <key>com.apple.security.app-sandbox</key>
   <true/>
  </dict>
</plist>
```

## Register identifier
注册`AppId`是当作程序的唯一标识符，该`AppId`不能与其他App重复，否则在后续审核会导致不通过:

<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190244990.png" width="45%" alt="Identifier list">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190314670.png" width="45%" alt="Select identifier type">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190347066.png" width="45%" alt="Select identifier platform">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190438785.png" width="45%" alt="identifier">
</div>


### Register a New Provisioning Profile
如图按照流程选择即可，但是在*图(Select certification)*请选择在上面*Certifications*中创建的*Mac App Distribution*证书:
<div style="display: flex;flex-wrap: wrap;justify-content: space-around;width:100%">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190014178.png" width="45%" alt="Profile list">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822190045291.png" width="45%" alt="Select profile type">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822191608389.png" width="45%" alt="Select app-id">
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822191659405.png" width="45%" alt="Select certification">
</div>

## Builder
`electron-build`打包的配置方式有很多，包括`.json`，`.js`等，这里使用了`.js`进行配置，并且放置在了项目根目录，最后在`package.json`中运行`electron-builder -c electron-builder.js`即可。
以下是全部代码：
```javascript
const {version} = require('./package.json')
const {resolve} = require("path")

const versionArr = version.split('-')
const bundleShortVersion = versionArr[0]
const bundleVersion = versionArr[1]

const config = {
    asar: true,
    productName: 'Your app anme',
    appId: 'Create AppID',
    directories: {
        output: 'dist'
    },
    icon: resolve(__dirname, "./icons/icon.icns"),
    asarUnpack: "**\\*.{node,dll}",
    files: [
        "./release/dist", // 这里build主进程和渲染进程的目录
        "node_modules",
        "package.json"
    ],
    mac: {
        icon: resolve(__dirname, "./icons/icon.icns"),
        target: [
            "mas" // 选择构建类型为: mas
        ],
        bundleVersion: bundleVersion,
        bundleShortVersion: bundleShortVersion,
        artifactName: '${productName}-${version}-${arch}.${ext}',
        extendInfo: {
            ElectronTeamID: 'Your Apple TeamId',
            ITSAppUsesNonExemptEncryption: 'NO'
        },
        asarUnpack: [
            '**/*.node',
        ],
    },
    mas: {
        hardenedRuntime: false,
        gatekeeperAssess: false,
        entitlements: 'mas/entitlements.mas.plist',
        entitlementsInherit: 'mas/entitlements.mas.inherit.plist',
        entitlementsLoginHelper: 'mas/entitlements.mas.loginhelper.plist',
        provisioningProfile: 'mas/provisioning.provisionprofile',
    },
    dmg: {
        sign: false
    }
}
module.exports = config
```

## Release
理论在运行`electron-builder -c electron-builder.js`的情况下，只会打包当前使用mac版本的对应的包，根据Apple的介绍，Apple的芯片可以部分运行Intel芯片打包的App，但是反之不行，如果需要在Intel芯片上和Apple芯片上运行有如下三个方式:
+  命令区分: 使用`Mac`打包使用如下参数: `electron-builder -c electron-builder.js --mac --x64 --arm64`,该命令可以打包出intel和apple芯片两个版本，打包时候`electron-builder`会去下载对应的依赖;
+ 硬件区分: 有条件的情况下可以单独在intel和apple芯片的两个`Mac`中使用`electron-builder -c electron-builder.js`单独打包，这样会自动构建系统对应的包;
+ package合并：可以使用`electron-builder -c electron-builder.js --universal`命令打包出intel和apple芯片合并的包，缺点就是包的体积可能是上述两个方法的两倍;


## Transport
+ 在Mac Store下载`Transporter`软件；
+ 登录创建`Certifications`的账号;
+ 上传刚才打包好的`.pkg`;
<img src="https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20240822210833532.png" alt="Transporter">

## Distribution info
需要使用创建`Certifications`的账号登录到[App Store Connet](https://appstoreconnect.apple.com/apps),然后填写要上架的APP信息，等到审核通过即可;

## Example
[Moki RSS](https://github.com/ClearLuvMoki/Moki-RSS)
