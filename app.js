App({
  onLaunch() {
    // 引入 SDK
    require('./utils/sdk-v1.3.0.js');
    // 初始化 SDK
    let clientID = 'e281bb8d19fbfa131389';
    wx.BaaS.init(clientID);
  }
})