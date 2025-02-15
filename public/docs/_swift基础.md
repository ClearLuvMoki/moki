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

### 常量和变量的声明使用

```swift
// 在变量和常量的声明可以不用赋值，但是使用会报错；
let name: String;
var age: Int;

// 如果是变量加上可选（请看下面章节`可选`）并且未赋值，那么name则是nil；常量则不行；
var name: String?;
print(name);

```

```swift
// 在变量和常量的声明需要避免关键词，但是如果必须使用关键词可以使用 `` 包裹
let `let`: String = "1212";
```

### 类型注解

本例为名为 `welcomeMessage` 的变量提供了一个类型注解，以指示该变量可以存储字符串值：

```swift
var welcomeMessage: String
```

或者可以直接赋值会自动推导类型:

```swift
var age = 25; // 会自动推导成Int
var pi = 3.142; // 小数会自动推导成 Double
```

### 类型别名

*类型别名*用于定义现有类型的替代名称。你可以使用 `typealias` 关键字定义类型别名：

```swift
typealias AutoInt = UInt8;

var max = AutoInt.max;
```

## print的使用

### 打印变量/常量

```swift
let name = "moki";
print("my name is \(name)"); // 使用反斜杠
```

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

# 字符串

## 字符串的声明

```swift
var name_1 = "moki";
var name_2 = "";
var name_3 = String(); // 同上声明了空字符串
var name_4 = String("moki");
var name_5 = String(repeating: "a", count: 10); // 声明了重复了10遍a的字符串
```

## 初始化空字符

```swift
var emptyString = ""               // 空字符串字面量
var anotherEmptyString = String()  // 初始化方法
// 两个字符串均为空并等价。
```



## 换行字符串

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

## 转义字符

使用反斜杠`\`或者`#"..."#`处理转义字符:

```swift
var text = "\"name \"";
print(text); // "name"


// 如果转义字符过多可以使用 #"..."# 包围字符串
var text_1 = #""name & age""#
print(text_1); // "name & age"
```

## 字符串相加

```swift
var name = "moki"
var age = "26";
print(name + age); // moki26 
```


## 字符串插值

```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message is "3 times 2.5 is 7.5"s

// 如果使用扩展字符串分隔符的插值(#""" ... """#)，需要按照如下写法
print(#"6 times 7 is \#(6 * 7)."#) // 使用 \#(...)
// 打印 "6 times 7 is 42."
```

## 字符串下标访问

```swift
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a
```

使用 `indices` 属性会创建一个包含全部索引的范围（`Range`），用来在一个字符串中访问单个字符。

```swift
for index in greeting.indices {
    print("\(greeting[index]) ", terminator: "")
}
// 打印 "G u t e n   T a g ! "
```



## 字符串判断是否为空

通过检查字符串值的布尔型 `isEmpty` 属性，来确定该字符串值是否为空。

```swift
if emptyString.isEmpty {
    print("Nothing to see here")
}
// 打印输出 "Nothing to see here"
```

## 字符个数

如果想要获得一个字符串中 `Character` 值的数量，可以使用 `count` 属性（包括空格和标点等）：

```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
print("unusualMenagerie has \(unusualMenagerie.count) characters")
// 打印 "unusualMenagerie has 40 characters"
```

## 字符串插入

调用 `insert(_:at:)` 方法可以在一个字符串的指定索引插入一个字符，调用 `insert(contentsOf:at:)` 方法可以在一个字符串的指定索引插入一段字符串，`insert`不会返回插入后的字符串;

```swift
var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome 变量现在等于 "hello!"
```

## 字符串删除

调用 `remove(at:)` 方法可以在一个字符串的指定索引删除一个字符，调用 `removeSubrange(_:)` 方法可以在一个字符串的指定索引删除一个子字符串。

```swift
var welcome = "hello";
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome 现在等于 "hello there"
```

或者可以删除一个range内的字符串

```swift
var welcome = "hello";
let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome 现在等于 "hello"
```

# 字符

如果您想要获取某个字符串里的每一个字符值，可以采用 `for`-`in` 循环的方式对该字符串进行遍历操作，从而逐个访问到其中的每一个字符。

```swift
for character in "Dog!🐶" {
    print(character)
}
// D
// o
// g
// !
// 🐶


// 声明字符
let exclamationMark: Character = "!"
```

## 字符串/字符比较相等

字符串/字符可以用等于操作符（`==`）和不等于操作符（`!=`）

```swift
let quotation = "We're a lot alike, you and I."
let sameQuotation = "We're a lot alike, you and I."
if quotation == sameQuotation {
    print("These two strings are considered equal")
}
// 打印 "These two strings are considered equal"
```

## 特定前缀或后缀

通过调用字符串的 `hasPrefix(*:)`或`hasSuffix(*:)` 方法来检查字符串是否拥有特定前缀或后缀，两个方法均接收一个 `String` 类型的参数，并返回一个布尔值。

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
var act1SceneCount = 0
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        act1SceneCount += 1
    }
}
print("There are \(act1SceneCount) scenes in Act 1")
// 打印 "There are 5 scenes in Act 1"
```

# 数字类型

## 整数

*整数*是没有小数成分的数字，如 `42` 和 `-23`。 整数可以是*有符号的*（正数、零或负数），也可以是*无符号的*（正数或零）。

Swift 提供 8、16、32 和 64 位有符号和无符号整数。

### 整数边界

- 在 32 位平台上，`Int` 的大小与 `Int32` 相同， `UInt` 的大小与 `UInt32` 相同。
- 在 64 位平台上，`Int` 的大小与 `Int64` 相同，`UInt` 的大小与 `UInt64` 相同。

```swift
let minValue = UInt8.min  // minValue 等于 0，类型为 UInt8
let maxValue = UInt8.max  // maxValue 等于 255，类型为 UInt8
```

## 浮点数

*浮点数*是带有小数成分的数字，如 `3.14159`、`0.1` 和 `-273.15`。

与整数类型相比，浮点类型可以表示的数值范围更广，而且可以存储比 `Int` 类型大得多或小得多的数字。Swift 提供了两种带符号浮点数类型：

- `Double` 表示 64 位浮点数。
- `Float` 表示 32 位浮点数。

> `Double` 的精度至少为小数点后 15 位，而 `Float` 的精度可以少至小数点后 6 位。

```swift
// 推断浮点数类型时，Swift 总是选择 Double（而非 Float）
let key = 3 + 0.14159; // key 也被推断为 Double 类型

let pi = 3.14159; // pi 推断为 Double 类型
```

### 数字类型转换

```swift
// 要将一种特定的数字类型转换为另一种，需要用现有值初始化一个所需类型的新数字。
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

整数和浮点数的转换：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi 等于 3.14159，并被推断为 Double 类型
```

# 布尔类型

Swift 有一种基本的*布尔*类型，称为 `Bool`。布尔值又被称为*逻辑值*，因为它们只能为真或假。Swift 提供了两个布尔常量值：`true` 和 `false`。

```swift
// orangesAreOrange 和 turnipsAreDelicious 的类型已被推断为 Bool
let orangesAreOrange = true
let turnipsAreDelicious = false
```

# 元组

*元组*将多个值组合成一个复合值。元组内的值可以是任何类型，且不必彼此属于同一类型。

```swift
let http404Error = (404, "Not Found")
// http404Error 的类型为（Int，String），且等于（404，"Not Found"）

// 结构访问元组:
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")

// 或者，使用从零开始的索引号访问元组中的单个元素值：
print("The status code is \(http404Error.0)") // 打印 "The status code is 404"
print("The status message is \(http404Error.1)") // 打印 "The status message is Not Found"
```

如果只需要元组的部分值，则在分解元组时使用下划线 (`_`) 忽略不需要的部分：

```swift
let (justTheStatusCode, _) = http404Error
print("The status code is \(justTheStatusCode)");
```

为元组中每个元素命名:

```swift
let http200Status = (statusCode: 200, description: "OK")
print("The status code is \(http200Status.statusCode)")
// 打印 "The status code is 200"
print("The status message is \(http200Status.description)")
// 打印 "The status message is OK"

// 除此之外可以结构访问或者下标访问
var (code, des) = http200Status;
print(code, http200Status.1);
```

# 可选

在可能缺失值的情况下，请使用*可选*。可选代表两种可能性：要么*存在*一个指定类型的值，并可以解包可选以访问该值；要么*根本就没有*值。

```swift
var serverResponseCode: Int? = 404 // Optional Int
// serverResponseCode 包含一个实际 Int 值 404
serverResponseCode = nil;
print(serverResponseCode); // nil
```

# 可选绑定

你可以使用可选绑定来确定可选是否包含值，如果包含，则将该值作为临时常量或变量使用。

```swift
// 语法
if let <#constantName#> = <#someOptional#> {
   <#statements#>
}
```

示例:

```swift
// 以下代码可以解释成： 如果 possibleNumber 能转换成Int，那么就不为 nil，则可以直接匹配到该if的分支中
// 在 = 的右边必须是 Optional 的类型，Int() 转换也是 Optional<Int> 的类型
// 打印 "The string "123" has an integer value of 123"
var possibleNumber = "1212";
if let actualNumber = Int(possibleNumber) {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
} else {
    print("The string \"\(possibleNumber)\" couldn't be converted to an integer")
}
```

# 后备值

处理缺失值的另一种方法是使用 nil-coalescing 操作符（`??`）提供一个缺省值。如果 `??` 左边的可选值不是 `nil`，那么该值将被解包并使用。

```swift
let name: String? = nil
let greeting = "Hello, " + (name ?? "friend") + "!"
print(greeting)
// 打印 "Hello, friend!"
```

# 错误处理

```swift
// 在函数使用关键字 throws ,那么此函数可能抛出错误，也可能不抛错
func canThrowAnError() throws {
    // TODO...
}

do {
    try canThrowAnError()
    // 无错误的情况
} catch {
    // 抛出错误的情况
}
```

# 断言

如果断言或前提条件中的布尔条件为 `true`，代码将照常执行。

如果条件的计算结果为 `false`，则程序的当前状态无效;代码执行结束，应用会被终止。

注意： 断言只在调试构建中进行检查！

可以调用 Swift 标准库中的 `assert(_:_:file:line:)`函数来编写断言。你可以向该函数传递一个计算结果为 `true` 或 `false` 的表达式，以及一条在条件结果为 `false` 时显示的信息。例如：

```swift
let age = -3
assert(age >= 0, "A person's age can't be less than zero.") // 因为前置条件是false， 则会出现断言信息;
```

如果出现了判断条件，只是需要断言的提示信息，可以使用`assertionFailure`:

```swift
let age = -3
if(age > 0) {
  print("You can ride the ferris wheel.")
}else {
  assertionFailure("A person's age can't be less than zero.")
}
```



# 基本运算符

## 术语

运算符可以是一元、二元或三元：

- *一元*运算符作用于单个目标（如 `-a`）。一元*前置*运算符紧跟在其目标之前（如 `!b`），一元*后置*运算符紧跟在其目标之后（如 `c!`）。
- *二元*运算符作用于两个目标（如 `2 + 3`），是*中置*的，因为它们出现在两个目标之间。
- *三元*运算符作用于三个目标。与 C 一样，Swift 只有一个三元运算符，即三元条件运算符（`a ? b : c`）。

## 赋值运算符

```swift
let b = 10
var a = 5
a = b
// a 现在等于 10

let (x, y) = (1, 2) // x 等于 1, y 等于 2
```

## 算术运算符

- 加法（`+`）
- 减法（`-`）
- 乘法（`*`）
- 除法（`/`）

```swift
1 + 2       // 等于 3
5 - 3       // 等于 2
2 * 3       // 等于 6 
10.0 / 2.5  // 等于 4.0

// 支持字符串拼接
"Hello" + "World"
```

##  余数运算符

*余数运算符*（`a % b`）计算出 `b` 在 `a` 中能容纳多少个倍数，并返回剩余的值（称为*余数*）。

```swift
9 % 4    // 等于 1
```



## 一元负号运算符

数值的正负号可以使用前缀 `-` 切换，称为*一元负号运算符*：

```swift
let three = 3
let minusThree = -three       // minusThree 等于 -3
let plusThree = -minusThree   // plusThree 等于 3，或 "负负三"
```

##  一元正号运算符

*一元正号运算符*（`+`）只是返回它所作用的值，不做任何改变：

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix 等于 -6 
```

## 复合赋值运算符

与 C 语言一样，Swift 提供了*复合赋值运算符*，它将赋值（`=`）与另一个操作结合起来。 一个例子是*加法赋值运算符*（`+=`）：

```swift
var a = 1
a += 2
// a 现在等于 3, 表达式 a += 2 是 a = a + 2 的简写。
```

## 比较运算符

Swift 支持以下比较运算符：

- 等于（`a == b`）
- 不等于（`a != b`）
- 大于（`a > b`）
- 小于（`a < b`）
- 大于等于（`a >= b`）
- 小于等于（`a <= b`）



如果两个元组具有相同的类型和相同数量的值，则可以比较它们， 规则则是先比较第一个，如果第一个相等则比较第二个

```swift
(1, "zebra") < (2, "apple")   // 为 true，因为 1 小于 2; "zebra" 和 "apple" 未比较
(3, "apple") < (3, "bird")    // 为 true，因为 3 等于 3，而 "apple" 小于 "bird"
(4, "dog") == (4, "dog")      // 为 true，因为 4 等于 4，而 "dog" 等于 "dog"
```

## 三元条件运算符

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeight 等于 90
```

## 空合并运算符

*空合并运算符*（`a ?? b`）如果可选项`a`包含一个值，则会解包该值，否则会返回默认值`b`（如果`a`为`nil`）。表达式`a`始终是一个可选类型。表达式`b`必须与存储在`a`中的类型相匹配。

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // 默认为 nil


var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName 为空，所以 colorNameToUse 为默认值 "red"
```

## 闭区间运算符



*闭区间运算符*（`a...b`）定义了一个从 `a` 到 `b` 的范围，包括 `a` 和 `b` 的值。`a` 的值不能大于 `b`

```swift
for index in 1...5 {
    print("\(index) 乘以 5 等于 \(index * 5)") 
}
// 1 乘以 5 等于 5
// 2 乘以 5 等于 10
// 3 乘以 5 等于 15 
// 4 乘以 5 等于 20
// 5 乘以 5 等于 25
```

## 半开区间运算符

*半开区间运算符*（`a..<b`）定义了一个从 `a` 到 `b` 但不包括 `b` 的范围

```swift
let names = ["Anna", "Alex", "Brian", "Jack"] 
let count = names.count
for i in 0..<count {
    print("第 \(i + 1) 个人叫 \(names[i])")
}
// 第 1 个人叫 Anna
// 第 2 个人叫 Alex
// 第 3 个人叫 Brian 
// 第 4 个人叫 Jack
```

## 单侧区间

闭区间运算符有一种替代形式，用于一直延伸到尽可能远的区间，是包含区间开始的值：

```swift
let names = ["Anna", "Alex", "Brian", "Jack"] 

for name in names[2...] { print(name) }
// Brian
// Jack

for name in names[...2] { print(name) }
// Anna
// Alex
// Brian 

for name in names[..<2] { print(name) }
// Anna
// Alex
```



## 逻辑运算符

*逻辑运算符*修改或组合布尔逻辑值 `true` 和 `false`。 Swift 支持 C 语言中的三个标准逻辑运算符：

- 逻辑非（`!a`）
- 逻辑与（`a && b`）
- 逻辑或（`a || b`）

```swift
// 逻辑非
let allowedEntry = false
if !allowedEntry {
    print("ACCESS DENIED")
} // 打印 "ACCESS DENIED"

// 逻辑与
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "ACCESS DENIED"

// 逻辑或
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "Welcome!"
```

# 集合类型

> 如果您创建一个数组、集合或字典，并将其赋值给一个变量，则创建的集合将是 **可变的**。这意味着，在创建集合后，您可以通过添加、删除或更改集合中的元素来改变（或称为 **变异**）集合。如果您将数组、集合或字典分配给常量，则该集合是 **不可变的**，并且其大小和内容无法更改。

## 数组

**数组** 将相同类型的值存储在一个有序列表中。相同的值可以在数组中以不同位置多次出现。

### 创建数组

创建空数组:

```swift
var someInts: [Int] = []
print("someInts is of type [Int] with \(someInts.count) items.")
// 打印 “someInts is of type [Int] with 0 items.“
```

使用默认值创建重复项数组，和合并数组:

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles 的类型是 [Double]，并且等于 [0.0, 0.0, 0.0]

//合并数组
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
// anotherThreeDoubles 的类型是 [Double]，并且等于 [2.5, 2.5, 2.5]

var sixDoubles = threeDoubles + anotherThreeDoubles
// sixDoubles 被推断为 [Double] 类型，并且等于 [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

数组字面量 来初始化数组：

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingList 已经用两个初始项进行了初始化
```

###  数组是否为空

```swift
// 可以通过 count 是否为 0 判断是否为空，也可以使用 isEmpty 返回的布尔值是否知道为空
print("The shopping list contains \(shoppingList.count) items.")
print(shoppingList.isEmpty);
```

### 数组添加元素

```swift
// 使用append关键字添加数组元素
var name: [String] = []
name.append("jack");
print(name); // ["jack"]

// 或者两个数组相加
var a: [String] = ["jack"];
var b: [String] = ["moki"];
print(a + b); // ["jack", "moki"]

```



