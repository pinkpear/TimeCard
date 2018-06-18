// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    tableID: userinfo表ID
=======
    tableID: usertableID
>>>>>>> origin/master
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化查询对象
    var query = new wx.BaaS.Query();
    // 设置查询条件（比较、字符串包含、组合等）
    query.compare('openid', '=', wx.getStorageSync("ifx_baas_openid"));
    // 应用查询对象
    var userquery = new wx.BaaS.TableObject(this.data.tableID)
    userquery.setQuery(query).find().then((res) => {
      if (res.data.objects.length != 0) {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  click: function () {
    var that = this;

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          if (that.selectUserinfo()){

          }else{
            that.getUserInfo()
          }
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      }
    });
  },
  getUserInfo: function (code) {
    var that = this;
    //设置延迟
    // that.insertUserinfo(res.data.openid)
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.insertUserinfo(userInfo)
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

      },
      fail: function (res) {
        wx.openSetting({
          success: (res) => {
            // console.log(res)
          }
        })
      }
    })
  },
  //  知晓云查询数据
  selectUserinfo: function(){
        // 实例化查询对象
    var query = new wx.BaaS.Query();
    // 设置查询条件（比较、字符串包含、组合等）
    query.compare('openid', '=', wx.getStorageSync("ifx_baas_openid"));
    // 应用查询对象
    var userquery = new wx.BaaS.TableObject(this.data.tableID)
    userquery.setQuery(query).find().then((res) => {
      // console.log(res)
      if (res.data.objects.length != 0) {
        wx.redirectTo({
          url: '/pages/index/index'
        })
        return 1;
      }
      return 0;
    })
  },
  // 向知晓云插入数据
  insertUserinfo: function (userInfo) {
    var that = this;
    wx.setStorageSync("nickName", userInfo.nickName);
    wx.setStorageSync("avatarUrl", userInfo.avatarUrl);
    if (userInfo.gender == 1) {
      var gender = "男";
    } else if (userInfo.gender == 2) {
      var gender = "女";
    } else {
      var gender = "未知";
    }

    let User = new wx.BaaS.TableObject(that.data.tableID);
    let user = User.create();
    user.set("openid", wx.getStorageSync("ifx_baas_openid"));
    user.set("nickName", userInfo.nickName);
    user.set("gender", gender);
    user.set("language", userInfo.language);
    user.set("country", userInfo.country);
    user.set("province", userInfo.province);
    user.set("city", userInfo.city);
    user.set("avatarUrl", userInfo.avatarUrl);
    user.set("cityid", -1);
    user.save().then(res => {
      // success
      wx.showToast({
        title: '登录成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      var openid = wx.getStorageSync("ifx_baas_openid");
      wx.setStorageSync("openid", openid)
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }, err => {
      // err
      // console.log("err")
      // 实例化查询对象
      var query = new wx.BaaS.Query();
      // 设置查询条件（比较、字符串包含、组合等）
      query.compare('openid', '=', wx.getStorageSync("openid"));
      // 应用查询对象
      var userquery = new wx.BaaS.TableObject(that.data.tableID)
      userquery.setQuery(query).find().then((res) => {
        // console.log(res)
        // success
        if (res.data.objects.length != 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          // wx.showToast({
          //   title: '请重新登录',
          //   icon: 'none',
          //   duration: 1500,
          //   mask: true
          // })
        }
      }, (err) => {
        // err
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      })
    })
  }

})
