App({
  data: {
    usertableID: 用户表ID,
    timecardtableID: 时间卡片ID,
    ADtableID: 广告表ID,
  },
  onLaunch() {
    // 引入 SDK
    require('./utils/sdk-v1.3.0.js');
    // 初始化 SDK
    let clientID = '知晓云clientID';
    wx.BaaS.init(clientID);

  }
})