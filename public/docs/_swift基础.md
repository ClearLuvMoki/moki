---
title: Swift基础
createDate: 2023-7-18
updateDate: 2023-7-18
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/git.png
excerpt: Swift语言的基础
---

# Swift语言基础

## 变量和常量

### 变量

变量关键词是`var`:

```swift
// 同时声明多个变量,使用逗号分隔
var a = 1, b = 2, c = 3;
print(a, b, c);
```

```swift
// 变量可修改成相同类型
var name = "moki";
name = "clearluv";

print(name); // clearluv

// 不可修改成不同的类型
var age = 25;
age = "26"; // ❌ 编译器会报错
```

### 常量

常量关键词是`let`声明后不可修改

```swift
let name = "moki";
name = "clearluv"; // ❌不可修改
```

## print的使用

### 打印多个参数

```swift
// 打印多个参数
var a = 1, b = 2, c = 3;
print(a, b, c);
```

### 使用特定的分隔符

```swift
var a = 1, b = 2, c = 3;
print(a, b, c, separator: "_"); // 1_2_3
```

### 设置结尾的格式

```swift
var a = 1, b = 2, c = 3;
print(a, b, c, separator: "_", terminator: "\t"); 
print("===>")
// 最后输出 // 1_2_3 ===>
// 在第一个 print 输入设置结束以制表符结尾，所有不会换行
```

## 字符串

### 字符串的声明

```swift
var name_1 = "moki";
var name_2 = "";
var name_3 = String(); // 同上声明了空字符串
var name_4 = String("moki");
var name_5 = String(repeating: "a", count: 10); // 声明了重复了10遍a的字符串
```

### 换行字符串

使用`###`包围前后：

```swift
var text_1 = """
原神
启动!
"""
print(text_1);
/*
原神
启动!
*/

// 或者可以设置不用换行，在每一行的末尾加上 \，最后一行不用
var text_2 = """
原神\
启动!
"""
print(text_2);
// 输出： 原神启动!
```

### 转义字符

使用反斜杠`\`或者`#"..."#`处理转义字符:

```swift
var text = "\"name \"";
print(text); // "name"


// 如果转义字符过多可以使用 #"..."# 包围字符串
var text_1 = #""name & age""#
print(text_1); // "name & age"
```

### 字符串相加

```swift
var name = "moki"
var age = "26";
print(name + age); // moki26 
```



