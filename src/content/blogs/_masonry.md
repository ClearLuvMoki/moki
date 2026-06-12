---
title: Masonry浅析
createDate: 2025-03-13
updateDate: 2025-03-13
author: 徐牧之啊
img: 
excerpt: Masonry
---

# Masonry浅析

## 前言

### 功能需求

1. 需要满足不同高度卡片的瀑布流
2. 需要在不同尺寸下适配列宽（动态列数）
3. 如果数据量过大需要虚拟滚动
4. 最好支持自定义动画
5. 对于文献/图文类数据，瀑布流是最好的表达方式

### 虚拟滚动

在一般在一列的列表中虚拟滚动下区分为固定高度和不固定高度，以下简单讲解固定高度的虚拟滚动：

![image-20250317125231752](/Users/moki/Library/Application Support/typora-user-images/image-20250317125231752.png)

1. 要实现虚拟滚动只需要在`window view`展示满足条件的元素即可，比如：
  ```typescript
  // 在高度为 2000px 的 window view中需要需要展示 高度为 300px 的元素，需要向上取整，因为例如上图右侧，可能存在部分元素展示不全的问题，则展示的条目为：
  const count = Math.ceil(1000 / 200)
  ```

2. 计算滚动的元素的位置 + 可展示的元素，则是需要展示的元素

```typescript
const list = [ 
  /* item */
]

// 容器滚动的高度 / 每一个元素的高度 则是已经滚动的元素的个数
const scrollTop = containerRef.current.scrollTop
const startIndex = Math.floor(scrollTop / itemHeight);


// 需要比较 startIndex + count 和 list 的长度，使用最小者
const endIndex = Math.min(startIndex + count, list.length);

// 那么裁剪部分则是可见部分
const visibleItems = items.slice(startIndex, endIndex);
```



  

   ## 不同之处

![image-20250317130531146](/Users/moki/Library/Application Support/typora-user-images/image-20250317130531146.png)



 瀑布流虚拟滚动和普通虚拟滚动不同之处在于:

1. 由于每一列都是层次不齐的所以不能使用`startIndex和endIndex`确定展示的元素
2. 需要计算每一列的高度然后补充元素需要从最短的开始补齐，如果每一列都补可能会出现长的更长，短的更短

3. 元素是否可见是通过以下判断的：
	 ```typescript
   // item 为瀑布流每一项元素
   const top = item.getClientRects().top;
   const height = item.getClientRects().height;
   
   // 判断 top + height 是否 <= scrollTop， 或者 >= 容器的底部
   // 反之： top + height > scrollTop && y < 容器的底部则在视图内部
   ```

如果需要做一个满足需求的组件，我们需要拆解任务：

1. 确定每一个元素的高度，或者动态计算每一个元素的高度，计算出每一项的位置信息`{y: number, x: number, height: number}`
2. 需要有一个`store`存放计算出来的所有数据的高度等信息，如果需要的时候可以直接通过id/索引直接获取，或者通过id/索引修改信息；
3. 计算出一列的高度，当需要补充元素的时候优先补充短的列（待定）



## 实现

### 计算每一项高度

1. 如果是图片类型，最好后端在处理上url带上宽高的值，会方便很多计算，请参考小红书的url返回
2. 如果是混合类型，需要自行计算每一项item的高度，比如当某一项显示出来的时候计算高度然后更新样式信息等

```typescript
// 1. 如果可以确定高度的情况

const listSize = useCallback(() => {
  // TODO: ...
  return list.map(item => {
    return {
      width: props?.width, // 瀑布流一般宽度是固定的或者是外部传入动态的，无需额外关心
      height: item?.height // 根据图片的url计算出来的高度 + 其他固定样式的高度
    }
  })
}, [])


// 2. 如果是动态高度, 保证 list 中每一个有唯一值 id
const itemRefs = React.useRef([]) // 每一项的ref的数组
const [sizeList, setSizeList] = useState([]) // 存放样式的 store
const columnCount = 3; // 动态列数

// 监听每一项的高度变化
useEffect(() => {
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const index = itemRefs.current.indexOf(entry.target);
      if (index !== -1) {
        // 如果下标一样则修改样式
        const _index = index % columnCount;
        setSizeList(list.map((_, idx) => {
          return idx === _index ? {height: entry.contentRect.height} : null
        }))
      }
    });
  });

  itemRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  return () => {
    itemRefs.current.forEach((ref) => {
      if (ref) observer.unobserve(ref);
    });
  };
}, [columnCount]);
```



   

## 第三方组件库实现

#### react-virtualized

Demo : https://bvaughn.github.io/react-virtualized/#/components/Masonry

Demo Code: https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/Masonry.example.js

Source Code: https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/Masonry.js

1. 通过`overscanByPixels`额外渲染的元素，单位px

通过计算出每一项的位置信息，然后判断是否在`overscanByPixels`内则渲染：

Source Code: 

a. 使用`postionCache`缓存：https://github.com/bvaughn/react-virtualized/blob/c737715486f724586aee8870ebea1e9efb7b0bfe/source/Masonry/Masonry.js#L204

b.`positionCache`内部实现:  https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/PositionCache.js

2. 通过`CellMeasurerCache`存储元素的位置信息：

Source Code：https://github.com/bvaughn/react-virtualized/blob/c737715486f724586aee8870ebea1e9efb7b0bfe/source/CellMeasurer/CellMeasurerCache.js#L179



#### TansTack virtual

Demo(Masonry): https://tanstack.com/virtual/latest/docs/framework/react/examples/variable

Source Code: https://github.com/TanStack/virtual/blob/1a25b1677fd78915adc09cb62d0fc08c96f4810d/packages/virtual-core/src/index.ts#L386C1-L387C1

1. 存在一个实例（Virtualizer）监听并且缓存每一项的高度
2. 监听容器变换等（observeWindowOffset）



#### egjs-infinitegrid

Demo: https://naver.github.io/egjs-infinitegrid/Guides

Source Code:  

1. `groupManager`管理每组元素: https://github.com/naver/egjs-infinitegrid/blob/91d0c070fe29d07068120c2dd57166129914f1db/packages/infinitegrid/src/InfiniteGrid.ts#L1025C14-L1025C26
2. https://github.com/naver/egjs-infinitegrid/blob/master/packages/infinitegrid/src/GroupManager.ts

无需关心startIndex和endIndex，直接每一组渲染，不在当前组的移除



#### react-masonry-css

没有虚拟滚动，单纯根据column分组，使用flex布局column，然后每一组顺序排列

Source Code: https://github.com/paulcollett/react-masonry-css/blob/72dd46dc71742af15b4f3cfcdb7681e7be9f7773/src/react-masonry-css.js#L112







### 问题

1. 使用虚拟滚动需要注意当用户快速滚动/拖动滚动条，则会出现短暂的白屏，特别是图片类重新加载，如果想让图片等不重新加载最好使用真实dom
2. 批量计算dom大小的消耗时间，主要是每个库对于计算样式的消耗
3. 每个库对于滚动状态的记住处理也不一样，除了`egjs-infinitegrid`都需要自己实现











