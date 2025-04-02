---
title: Apple login
createDate: 2025-03-10
updateDate: 2025-03-10
author: 徐牧之啊
img: [https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/sign-in-with-apple-1.webp]
excerpt: 使用 JS 在 WebPage 实现 Apple Login 
---

# Apple Login for JavaScript 

> 官方文档：https://developer.apple.com/documentation/signinwithapplejs

## 参数说明

### Response type

控制登录后返回的类型，可选是`code`,`id_token`等，如果是`id_token`,下面的`response_mode`则必须是`form_post`

### Response Mode

控制登录后`code/id_token`返回方式;

1. 如果`response_type`是`query`则会拼接在下面配置的`redirect_uri`的后面
2. 如果`response_type`是`id_token`,则需要配置`form_post`，则会以`post`方法请求`redirect_uri`

### Client Id

在Apple 开发者账户创建`Identifier`:

![新建证书](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331001109445.png)

![选择Services ID](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331001147980.png)

![填写Identifier](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331001244812.png)

注册成功则`Identifier`则是`Client Id`;

### Redirect uri

1. 如果`response_type`是`query`则登录获取的`code`则会拼接在`url`后面
2. 如果`response_type`是`id_token`,则需要配置`form_post`，则会以`post`方法请求返回该`url`

![选择证书](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331005422468.png)

![编辑](/Users/moki/Library/Application Support/typora-user-images/image-20250331005459622.png)

![配置url](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331005602165.png)

### Scope

向Apple请求的用户信息, 比如`name email`使用空格分割



## JS使用Apple登录（前端部分）

### 使用url

可以使用拼接的url打开苹果登录页，文档: https://developer.apple.com/documentation/sign_in_with_apple/incorporating-sign-in-with-apple-into-other-platforms:

```typescript
const baseUrl = "https://appleid.apple.com/auth/authorize";
const url = new URL(baseUrl);

url.searchParams.append("response_type", "code"); 
url.searchParams.append("response_mode", "query");
url.searchParams.append("client_id", "xxx");
url.searchParams.append("nonce", "name email");
url.searchParams.append("redirect_uri", "https://xxx.com");

window.open(url.torString(), "_blank");
```

### 使用JS SDK

在`body`中引入js文件:

```html

<body>
        <script 
                type="text/javascript" 			   src="https://appleid.cdnapple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
        </script>
    </body>
```

初始化:

```js
// 参数值同上
AppleID.auth.init({
    clientId : '[CLIENT_ID]',
    scope : '[SCOPES]',
    redirectURI : '[REDIRECT_URI]',
    usePopup : true
});
```

主动调用登录：

```typescript
interface SignResponseType {
  authorization: {
    code: string;
    id_token: string;
    state: string;
  },
  user: {
       email: string,
       name: {
         firstName: string,
         lastName: string
       }
     }
}

const onCode = () => {
  try {
    // AppleID是根据上面 body 中导入的 js 挂载
  	window.AppleID.auth
      .signIn()
      .then((res: SignResponseType) => {
    			console.log("code: ", res?.authorization?.code)
      })
      .catch(console.log);
  }catch(err) {
    // TODO...
  }
}

onCode();
```

## 校验Apple Code （后端部分）

> 该部分以 Node 为例子，处理前端获取到`apple code`传递给后端进行校验

首选需要登录apple开发者账户创建一个`keys`:



![image-20250331010947545](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331010947545.png)

需要勾选上`Sign in with Apple`:

![image-20250331011007371](https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/image-20250331011007371.png)

记住 `key`的`id`和保存证书为`xx.p8`格式，该证书只能下载一次！

![image-20250331011349189](/Users/moki/Library/Application Support/typora-user-images/image-20250331011349189.png)



 使用 `apple-signin-auth`处理：

```typescript
import appleSignin from 'apple-signin-auth';


const clientSecret = appleSignin.getClientSecret({
    clientID: 'xxxx', // 与上面创建的 clientID 为同一个
    teamID: 'x x x x', // Appl 开发者账户的 唯一标识符
    privateKey: '', // 该值为上面导出的`xxx.p8`的证书的值，可用文本编辑器打开
  	// privateKeyPath: "", // 不想用 privateKey 可以用 该属性代替，表示 xxx.p8 证书的地址
    keyIdentifier: '', // 上面创建 key 的 key Id
    expAfter: 15777000, 
});
const options = {
    clientID: '', // Apple Client ID
    redirectUri: '', // use the same value which you passed to authorisation URL.
    clientSecret: clientSecret
};


// 测试前端的token是否有效
try {
    const tokenResponse = await appleSignin.getAuthorizationToken("x x x", options);

} catch (err) {
    console.error(err);
}
```

