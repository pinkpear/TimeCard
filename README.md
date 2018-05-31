# TimeCard
微信小程序,倒计日
## 项目介绍  
TimeCard微信小程序是一个基于微信开发工具所编写的一款小程序，它是一个关于效率的小程序，主要提供倒计日和目标日（待完成）的功能。该项目正在持续开发中，目前版本是v0.0.8。（<a href='https://github.com/pinkpear/TimeCard/'>项目地址</a>）  

![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg) &nbsp;&nbsp;&nbsp;
![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)      

### 项目功能
> TimeCard  
>> 登录注册  
>> 倒计日  
>>> 创建  
>>> 保存分享  
>>> 修改  
>>> 删除  
>>
>> 目标日
>>> 创建  
>>> 保存分享  
>>> 修改  
>>> 删除  


### 已完成功能及还需完成功能  
- [x] 用户登录注册
- [x] 倒计日模块中创建、保存分享及删除
- [ ] 倒计日修改
- [ ] 目标日模块

## 项目运行效果图  
1. 小程序登录界面  
![登录注册页面](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/Cardregister.png)  

2. 倒计日卡片创建页  
![倒计日卡片创建页](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/Cardcreate.png)  

3. 时间卡片展示页  
![时间卡片展示页](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/Cardshow.png)  

4. 倒计日详情页  
![倒计日详情页](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/Carddetail.png)  

5. 分享卡片页  
![分享页](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/Cardsave.png)  

## 用户数据存储  
本项目数据存储的方式为知晓云，个人开发者小型项目免费版本基本可以满足需求（就是有时候存在网络延迟:anguished:...可能是本身服务器的原因，与账户类型无关）。  
总共设置了两个表：  
1. 用于存储用户信息的表（`userinfo表`）  
![userinfo表结构](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/userinfo.png)  

2. 用于存储用户所填卡片信息（`timecard表`）  
![timecard表](http://p9imm94yt.bkt.clouddn.com/image/TimeCard/userinfo.png)

## 使用方法
> 开发工具：`微信web开发者工具`（<a href='https://mp.weixin.qq.com/cgi-bin/wx'>下载与注册地址</a>）  
> 数据存储：`知晓云`（<a href='https://cloud.minapp.com/'>注册地址</a>）  

1. 将项目下载到本地，并使用微信web开发者工具导入项目，并填入自己的AppID。

2. 进入项目确保项目文件中`project.config.json`中的`appid`为自己的appid。并在`app.js`文件中的`clientID`填入自己的知晓云clientID。

3. 在`pages/register/register.js`文件中的data填入自己在知晓云创建的`userinfo表ID`。  

4. 在`pages/index/index.js`文件中填入创建的`timecard表ID`。同理修改`pages/index/carddetail.js`和`pages/create/create.js`。  

5. 运行即可

## 捐赠  

如果你喜欢这个项目，欢迎Star、Fork。也欢迎 Pull requests 一起完善这个项目。  
![微信支付](http://p9imm94yt.bkt.clouddn.com/image/paywechatpay.png)
![支付宝](http://p9imm94yt.bkt.clouddn.com/image/payAlipay.png)  
开发不易请作者喝杯饮料吧！


## License

>Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
<a href='http://www.apache.org/licenses/LICENSE-2.0'></a>http://www.apache.org/licenses/LICENSE-2.0  
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
