## 变量

```dart
// 初始化变量，自动推断类型
var name = 'Bob';

// 显式初始化变量
String name = 'Bob';
```

### 空安全

为了防止当一个值为null，而调用上面的属性或者方法报错

#### 1. 可空类型和非空类型

```dart
// 非空类型（默认）
String name = 'Bob';  // 不能为null
int age = 25;         // 不能为null

// 可空类型（添加?）
String? nullableName = null;  // 可以为null
int? nullableAge = null;      // 可以为null
```

#### 2. 空安全操作符

**安全调用操作符 (?.)：**
```dart
String? name = null;
print(name?.length);  // 输出: null（不会报错）

name = 'Bob';
print(name?.length);  // 输出: 3
```

**空合并操作符 (??)：**
```dart
String? name = null;
String displayName = name ?? 'Unknown';  // 如果name为null，使用'Unknown'
print(displayName);  // 输出: Unknown
```

**空合并赋值操作符 (??=)：**
```dart
String? name = null;
name ??= 'Default';  // 只有当name为null时才赋值
print(name);  // 输出: Default
```

**非空断言操作符 (!)：**
```dart
String? name = 'Bob';
String definitelyName = name!;  // 断言name不为null
print(definitelyName.length);   // 输出: 3

// 注意：如果name实际为null，会抛出运行时异常
```

#### 3. 空检查

```dart
String? getUserName() {
  // 可能返回null
  return null;
}

void printUserInfo() {
  String? name = getUserName();
  
  // 方法1：使用if检查
  if (name != null) {
    print('用户名长度: ${name.length}');  // 此时name被提升为非空类型
  }
  
  // 方法2：使用安全调用
  print('用户名长度: ${name?.length ?? 0}');
}
```

#### 4. late关键字

```dart
// 延迟初始化非空变量
late String description;

void initializeDescription() {
  description = '这是描述';  // 必须在使用前初始化
}

void printDescription() {
  print(description);  // 如果未初始化会抛出异常
}
```

#### 5. 实际应用例子

```dart
class User {
  String name;
  String? email;  // 邮箱可选
  int? age;       // 年龄可选
  
  User(this.name, {this.email, this.age});
  
  // 获取显示信息
  String getDisplayInfo() {
    String info = '姓名: $name';
    
    // 安全地处理可空字段
    if (email != null) {
      info += '\n邮箱: $email';
    }
    
    info += '\n年龄: ${age ?? '未知'}';
    
    return info;
  }
  
  // 发送邮件（只有当邮箱存在时）
  void sendEmail(String message) {
    email?.let((e) => print('发送邮件到 $e: $message'));
    // 或者使用传统方式
    if (email != null) {
      print('发送邮件到 $email: $message');
    }
  }
}

// 使用示例
void main() {
  User user1 = User('张三', email: 'zhangsan@example.com', age: 25);
  User user2 = User('李四');  // 只有姓名
  
  print(user1.getDisplayInfo());
  print('---');
  print(user2.getDisplayInfo());
  
  user1.sendEmail('你好！');
  user2.sendEmail('你好！');  // 不会发送，因为邮箱为null
}
```

#### 6. 集合的空安全

```dart
// 可空列表 vs 包含可空元素的列表
List<String>? nullableList = null;        // 整个列表可以为null
List<String?> listWithNullableItems = []; // 列表不为null，但元素可以为null

// 安全地操作列表
void processItems(List<String?>? items) {
  // 检查列表本身是否为null
  if (items != null) {
    for (String? item in items) {
      // 检查每个元素是否为null
      if (item != null) {
        print('处理项目: $item');
      }
    }
  }
  
  // 或者使用链式安全调用
  items?.where((item) => item != null)
        .forEach((item) => print('处理项目: $item'));
}
```

空安全是Dart的重要特性，它在编译时就能帮助我们避免空指针异常，让代码更加安全可靠。

