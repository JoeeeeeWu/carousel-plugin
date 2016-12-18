# 旋转木马jQuery插件

## 方法

### 引入插件

本插件依赖于jQuery，所以使用本插件需要先在你的页面尾部引入jQuery，再在其后面引入本插件carousel—plugin.js。

本插件也定义了一些必要的样式，所以需要在页面头部引入一个css文件carousel.css。

### HTML结构

```
<div class="poster-main j_poster" data-setting='{ "width":1000, "height":270, "posterWidth":640, "posterHight":270, "verticalAlign": "middle", "scale":0.9, "speed":500 }'>
        <div class="poster-btn poster-prev-btn"></div>
        <ul class="poster-list">
            <li class="poster-item">
                <a href=""><img src="image/1.jpg" alt="" width="100%"></a>
            </li>
            <li class="poster-item">
                <a href=""><img src="image/2.jpg" alt="" width="100%"></a>
            </li>
            <li class="poster-item">
                <a href=""><img src="image/3.jpg" alt="" width="100%"></a>
            </li>
            <li class="poster-item">
                <a href=""><img src="image/4.jpg" alt="" width="100%"></a>
            </li>
            <li class="poster-item">
                <a href=""><img src="image/5.jpg" alt="" width="100%"></a>
            </li>
        </ul>
        <div class="poster-btn poster-next-btn"></div>
    </div>
```

### 使用方法

（1）把HTML结构中的图片都换成自己的图片

（2）把HTML结构中data-setting的参数改成你自己的参数

可以设置的参数有：

- width：旋转木马的宽度
- height：旋转木马的高度
- posterWidth：第一张图片的宽度
- posterHeight：第一张图片的高度
- verticalAlign：图片的对齐方式取值有
  - middle：居中对齐（默认）
  - top：顶部对齐
  - bottom：底部对齐
- scale：相邻图片之间的缩放比，默认为0.9
- speed：图片的轮换速度，默认为500
- delay：图片轮换的间隔，默认为3000
- autoplay：是否开启自动播放，取值有true、false

（3）在你的JS里加一句：
```
Carousel.init($(".j_poster"));

```

## 说明

（1）参数请严格按json格式来写，否则会导致解析出错

（2）本插件支持在同一页面里开启多个旋转木马轮播，即使是有多个同样的HTML结构，都可以用上面的一句JS搞定。




  

