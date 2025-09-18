---
title: Python基础
createDate: 2023-7-18
updateDate: 2023-7-18
author: 徐牧之啊
img: https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/git.png
excerpt: Python语言的基础
---

## API

```python
# 	获取内置函数
print(dir(__builtins__))
```



## 变量

```python
# 变量名不能以数字名开头
x = 3;

# 值交换
x = 3;
y = 5;
x, y = y, x;
print(x, y); # 5, 3
```



## 字符串

```python
# 单引号
print('Hello world');

# 双引号
print("Hello world");

# 单双引号混杂
print("Let's go");
print('包括一句名言: "只争朝夕"');

# 转义字符 
print("\"Lift is short, Let\'s learn Python\"");

# 反斜杠 /
print("D:\\dir\\game");

# 原始字符串, 告诉解释器这一行中的斜杠(/)不需要转义
print(r"D:\dir\game");

# 多行字符串
print("""
	这里可以写多行的文本，
	这是第二行
""")
print('''
	这里可以写多行的文本，
	这是第二行
''')
```

### 字符串的加法和乘法

```python
# 字符串的加法只是拼接
x = "hello";
y = "world";
print(x + y); # hello world

x = 3;
y = 5;
print(x + y); # "35"


# 字符串的乘法是将字符串乘以倍数然后拼接起来
x = "Hello";
print("Hello" * 3000); # 3000遍的 Hello 拼接
```

## 比较运算符

1. `==` 是否相等
2. `>` 是否大于
3. `<`是否小于
4. `>=`是否大于等于
5. `<=`是否小于等于
6. `!=` 是否不等于
7. `is` 判断两个对象的id是否相等
8. `is not` 判断两个对象的id是否不等



## 循环语句

```python
while Boolean:
  	# TODO:...
```



## 数字类型

```python
# 使用IEEE754所以计算会有误差
0.3 == 0.1 + 0.2 # False


# 使用 decimal 来确保数字的精准
import decimal

x = decimal.Decimal("0.1");
y = decimal.Decimal("0.2");
z = decimal.Decimal("0.3");
print(z == x + y);
```

## 运算符

```python
x + y # 加法
x - y # 减法
x * y # 乘法
x / y # 除法
x // y # 结果向下取整
x % y # 取余
-x # 相反数
+x # 本身
abs(x) # 绝对值
int(x) # 转换成整数，直接舍弃小数部分
float(x) #转换成浮点数
divmod(x, y) # 返回向下取整数的结果和余数 ，等于 (x // y, x % y)
pow(x, y) # x 的 y次方
x ** y # x 的 y次方
```

## 布尔运算



