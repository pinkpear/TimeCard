App({
  data: {
    timecardtableID: timecard表ID,
    ADtableID: 新增广告表ID
  },
  onLaunch() {
    // 引入 SDK
    require('./utils/sdk-v1.3.0.js');
    // 初始化 SDK
    let clientID = '填写知晓云中clientID';
    wx.BaaS.init(clientID);

  }
})