# 关于URL Logger  
一个**支持PC+移动端**的`FireFox`浏览器插件，通过配置的不同可以实现不限于**获取视频下载链接**、**监控可疑HTTP请求**等功能。  

## 功能  
* **复杂一点:**可以快速提取某些特征的URL链接，输出到控制台、剪贴板或提示  
* **简单来说:**你可以根据需要来  

## 使用方法  
* 关于URL Pattern：
    * 具体可参照[Mozzila 文档](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)
    * `<scheme>://<host><path>`, 有很多小细节，比如path带参数加上`?*`，不带参数不加 
    * Pattern 不对可能会导致功能失效

* 如何提取视频链接(下载可能需要配合HEADER)  
    * 一般情况，直接提取mp4/flv/m3u8的链接即可：  
    ```
    *://*/*.flv
    *://*/*.flv?*
    *://*/*.mp4
    *://*/*.mp4?*
    *://*/*.m3u8
    *://*/*.m3u8?*
    ```
    
    * 特殊情况下，如果URL不带媒体格式的那种，一次解析，长时间受用。  
    比如，爱奇艺：
    ```
    https://cache.video.iqiyi.com/jp/dash?*
    ```

    * 注1：如果请求次数过于频繁，建议关闭`复制/提示`功能，按F12在控制台查看输出。
    * 注2：另一种提取video标签src的视频源提取插件[VideoSnipper]<https://github.com/nICEnnnnnnnLee/VideoSnipper>
* 如何监控可疑HTTP请求
    比如，看网页是否开启了百度统计(其它类似)
    ```
    https://hm.baidu.com/hm.gif?*
    ```
