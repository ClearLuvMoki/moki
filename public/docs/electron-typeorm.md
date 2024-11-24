---
title: Electron+Typeorm+Sqlite3实践
createDate: 2024-05-29
updateDate: 2024-05-29
author: 徐牧之啊
img: electron-typeorm.jpg
excerpt: Typeorm + Sqlite3 实践
---

# Electron+Typeorm+Sqlite3实践

## 背景

Electron关于本地数据的存储一般分为以下几类:

+ `JSON`存储：推荐库[electron-store](https://github.com/sindresorhus/electron-store#readme)，支持`JS`中对象方式的访问，并且直接加密，但是有需求对于数据的频繁读写性能不是很好；
+ `localStorage`/`IndexedDB`存储：
	+ `localStorage`同步的操作，CURD方便，前端可以直接操作，但是容量有限，可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)了解相关API以及存储上限，并且提供了[测试](http://dev-test.nemikor.com/web-storage/support-test/)获取你当前浏览器的最高`localStorage`上限;
	+ `IndexedDB`全异步的操作，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)上有很详细的操作，但是无法初始化数据库的值，如果使用前端框架推荐[dexie](https://dexie.org/)，支持`react`/`vue`等主流框架，操作简单；
+ 本地数据库: 比如`sqlite`，配置简单无需服务器，数据库直接访问单一文件即可，数据保存在本地以及能进行，但是数据库一般需要写`sql`，所以本文主要介绍在`electron`中链接`sqlite3`以及不需要`sql`的主流解决方案`orm`;

## Core NPM Packages
默认安装`electron`以及渲染进程需要的相关代码，还需要：
`npm install @electron/rebuild better-sqlite3 typeorm`

## Electron rebuild
该package主要是根据 Electron 项目所使用的 Node.js 版本重建原生 Node.js 模块，由于`better-sqlite3`内置的`node`版本可能跟项目本身使用的`node`版本不一样，所以需要`rebuild`，可以在`packages.json`中设置:
```json
{
	"scripts": {
		 "rebuild": "electron-rebuild -f -w better-sqlite3",
	}
}
```
⚠️: 每次`install`依赖后可能都需要`rebuild`一次！否则会导致后续数据库启动失败！

## Use sqlite3 & Typeorm
这里选择了`better-sqlite3`:
1. 新建文件夹`dataBase`以及文件`index.ts`:
```javascript
import {join} from "path";
import {DataSource} from "typeorm";
import {app} from "electron";

const dataBasePath = join(
    app.getPath("appData"),
    app.getName(),
    `./Your Dir/index.db`
);

console.log("DataBase init path: ", dataBasePath)
const DataBase = new DataSource({
    type: "better-sqlite3",
    entities: [], // 后续新建表的实体
    database: dataBasePath, // 数据库地址
    synchronize: true, // 自动同步表
    logging: ["error"],
    /* 
    	1. 这里是 better-sqlite3 的 二进制文件，在 rebuild 后生成，然后指向该文件；
    	2. 后续在打包也需要 copy 至打包后的文件夹中，并且路径访问需要跟以下一致
    */
    nativeBinding: join(__dirname, "./better_sqlite3.node")
})

export default DataBase;
```
2. 数据库初始化
```javascript
import DataBase from "@src/dataBase";

app.on('ready', async () => {
  if (!DataBase.isInitialized) {
      const [err] = await to(DataBase.initialize());
      if (err) {
          console.log("数据库已初始化失败!")
      } else {
          console.log("数据库已初始化成功!")
      }
  } else {
      console.log("数据库已初始化成功!")
  }
  // ... 初始化窗口等操作
});
```
3. 新建表实体
在`dataBase`中新建文件夹`entities`用来存储业务对应的表，一下是新建一个配置表`config.ts`:
```javascript
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("config")
export class ConfigEntities {
		// 主键设置，无需手动生成，自动为uuid
    @PrimaryGeneratedColumn("uuid")
    id: string = "";

		// 注意sqlite3中文本的存储没有varchar等,这里可以选择text存储
    @Column({type: "text", default: ""})
    locale?: string | undefined = "";

		// default 设置默认值
    @Column({type: "text", default: "light"})
    theme?: string | undefined = "";

    @Column({type: "text", default: "magazine"})
    listMode?: string | undefined = "";
    
    // 创建数据条的时间，无需手动维护插入单条数据的时间
    @CreateDateColumn()
    createDate?: Date | undefined;
}
```
4. 在第一步的`dataBase`文件中修改`entities`字段注入实体:
```javascript
import {ConfigEntities} from "./entities/config.ts";
const DataBase = new DataSource({
  // 其他配置不变
  entities: [ConfigEntities]
})
```
5. 新建`service`文件夹处理不用表中的对应事务:
```javascript
import Database from "../dataBase";
import {ConfigEntities} from "../entities/config";

const getOSQueryBuilder = async () => {
    return Database.getRepository(ConfigEntities)
};

class OSService {
		// 根据ID查询操作
     static async getConfig(id: string) {
        return new Promise(async (resolve) => {
            const osQueryBuilder = await getOSQueryBuilder();
            const data = await osQueryBuilder.findOne({
                where: {
                    id
                }
            })
            resolve(data);
        })
    }
    
    // 插入数据操作
    static async updateConfig(config: ConfigEntities) {
        return new Promise(async (resolve) => {
            const osQueryBuilder = await getOSQueryBuilder();
            const existingOS = await osQueryBuilder.findOne({
                where: {
                    id: config.id,
                }
            });
            // 如果不存在导入，存在就直接返回
            if (!existingOS) {
                osQueryBuilder.save(config)
                    .then((saveRes) => {
                        console.log("导入OS成功: ", JSON.stringify(saveRes))
                        resolve(saveRes)
                    })
            } else {
                resolve(existingOS)
            }
        })
    }
    
    // 根据ID更新数据
    static async updateOS(data: {
        id: string;
        locale?: string;
    }) {
        const osQueryBuilder = await getOSQueryBuilder();
        const config = await osQueryBuilder.findOne({
            where: {
                id: data.id
            }
        });
        if (config?.id) {
            const item = await osQueryBuilder.save({
                id: config.id,
                title: data?.locale || "",
            })
            return item;
        } else {
            return null
        }
    }
    
    // 根据ID删除数据
    static async removeOS(id: string) {
        const osQueryBuilder = await getOSQueryBuilder();
        const deleteResult = await osQueryBuilder.delete(id);
        return deleteResult;
    }
}

export default OSService;
```
6. IPC调用事务，通过前端的IPC请求区分不同的事务:
```javascript
import {ipcMain} from "electron";
import OSService from "../dataBase/server/os";

ipcMain.handle("os:config", () => {
    return OSService.getConfig()
})
```
前端调用，比如`react`中：
```javascript
useEffect(() => {
	// 这里是需要在 electron 中 preload 中设置 contextBridge
	window.IPC.invoke("os:config")
		.then(console.log)
		.catch(console.err)
}, [])
```

## Example
[Moki RSS](https://github.com/ClearLuvMoki/Moki-RSS)