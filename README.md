@[TOC](TimeCard)
`微信小程序`  `倒计日`  `累计日`
# 项目介绍
**TimeCard**——一个基于微信开发工具所编写的一款小程序，它是一个关于效率的小程序，主要提供倒计日和目标日（待完成）的功能。该项目正在持续开发中（2019年12月31日重新启动），目前版本更新为`v0.1.1`。（<a href='https://github.com/pinkpear/TimeCard/'>项目地址</a>v0.0.8）待上传。

# 新的改变

我对**时光车站**项目进行了一些界面上的优化与数据存储结构和存储位置调整：
 1. **船新的界面设计** ，增加了相应的按钮旋转动画，类型选择`ease`。这样在按下按钮时，动画不会过于生硬。同时为遮罩层添加**颜色渐变动画**，同时也为弹出的功能抽屉赋予动画。为使用者带来良好的编辑体验；
 2. 为首页的卡片展示，**重新布局样式**，使用<font color="#eee8aa" >**金色**</font>来标记起始时间与结束时间，寓意着时间的珍贵；
 3. 将时间进度条拉长~~~~长，**加粗**；
 4. 去掉了 ~~**已过天数 / 总天数**~~ 的显示；
 5. 增加了进度条上的图表显示，如**漫威人物**等；![美国队长，来自Iconfont](https://img-blog.csdnimg.cn/20191231201954871.png#pic_center)
 6. 增加了 **可旋转的** 操作按钮；

# 项目功能

> TimeCard  
>> 登录注册（使用微信自身提供的方法）
>> 选择创建类型
>>
>>> 倒计日  
>>>> 创建  
>>>> 分享  
>>>> 修改  
>>>> 删除  
>>>
>>> 累计日
>>>> 创建  
>>>> 分享  
>>>> 修改  
>>>> 删除

## 已完成功能及还需完成功能  
- [x] 用户登录注册
- [x] 新建时点击按钮的动画
- [x] 倒计日创建
- [ ] 倒计日模块中修改、分享及删除
- [ ] 累计日模块
- [ ] 名称搜索
- [ ] 日期筛选
- [ ] 标签模块



## 项目运行效果图

1. 登录界面  
<img src="https://img-blog.csdnimg.cn/20191231204944869.jpg"   width="40%">
2. 程序主页
<img src="https://img-blog.csdnimg.cn/20191231205313718.jpg"   width="40%">
3. 选择创建类型
<img src="https://img-blog.csdnimg.cn/20191231205553436.jpg"   width="40%">
4. 创建倒计日
<img src="https://img-blog.csdnimg.cn/20191231205809984.jpg"   width="40%">

## 用户数据存储
本项目数据存储的方式由`知晓云`更改为`云开发`（微信开发工具自己开发的数据存储，为了方便前后端结合在一起开发），个人开发者小型项目免费版本基本可以满足需求。  

总共设置了三个集合来存储相应的数据（以后还会增加...）
1. 用于存储用户信息的集合（`user表`）  
2. 用于存储用户所填卡片信息的集合（`user-cards表`）
3. 用于存储一个用户下所有的卡片ID的集合（`user-cards-set表`）

## 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

### 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

# 联系我  

如果你喜欢这个项目，欢迎Star、Fork。也欢迎 Pull requests 一起完善这个项目。  
邮箱：agonyperkey@gmail.com
QQ：314068298

目前，该项目已有旧版在微信小程序上发布，但是这次所做出的修改与变化是巨大的，明年年初可以将新版本发布到微信平台，自己也在这个项目中学习到了许多关于项目开发的常识。
最后，祝大家新年快乐，不忘初心，砥砺前行！
# License

>Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
<a href='http://www.apache.org/licenses/LICENSE-2.0'></a>http://www.apache.org/licenses/LICENSE-2.0  
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
