// pages/login/login.js
const app = getApp();
var convertDate = require('../../utils/convertDate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    loginStatus: 0,
    userInfo: {},
    cardsSet: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查看本地存储中的user-openid是否存在用户的openid
    var openid = wx.getStorageSync('user-openid');
    if (openid != '') {
      that.onQuery();
    }
    // 获取当前系统的宽高，并保存
    var a = wx.getSystemInfoSync();
    that.setData({
      screenHeight: a.screenHeight,
      screenWidth: a.screenWidth
    })
    // 按类获取元素的宽高
    var obj = wx.createSelectorQuery();
    obj.selectAll('.logo').boundingClientRect(function(rect) {
      that.setData({
        logoWidth: rect[0].width,
        logoHeight: rect[0].height
      })
    })
    obj.exec();
    // 获取本地卡片数组存储
    var cardsSet = wx.getStorageSync('cardsSet');
    if (cardsSet != '') {
      that.setData({
        cardsSet: cardsSet
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 点击登录按钮要做的事情
  // 获取用户信息，并存到当前的Data中
  onGotUserInfo: function (e) {
    var that = this;
    // 设置按钮的样式
    that.setLoading();
    // 获取用户的openid
    that.onGetOpenid();
    console.log(e)
    if (!that.data.logged && e.detail.userInfo) {
      that.setData({
        logged: true,
        userInfo: e.detail.userInfo
      });
      // 在插入时检查数据库中是否已经存在
      setTimeout(function () {
        that.onQuery();
      }, 1000)
    }
  },
  /* 

    登录状态：0：未登录/登录失败，1：登录成功，2：登录中
  */
  // 按钮出显示加载图标
  setLoading: function(e) {
    var that = this;
    var loginStatus = that.data.loginStatus;
    if (loginStatus == 0) {
      that.setData({
        loading: !this.data.loading,
        loginStatus: 2
      })
    }
  },
  // 获取用户的openid
  onGetOpenid: function() {
    var that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid;
        // 将openid存储到本地以便使用
        wx.setStorageSync("user-openid", res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        that.setData({
          loginStatus: 0
        })
        wx.showToast({
          title: '登录失败',
        })

      }
    })
  },

  // 登录成功
  loginSuccess: function() {
    var that = this;
    that.setData({
      loginStatus: 1
    });
    // 显示登录成功延迟0.5秒跳转页面
    setTimeout(function() {
      wx.redirectTo({
        url: '../index/index',
      })
    }, 200);
  },
  // 向数据库中添加用户数据
  onAdd: function() {
    const db = wx.cloud.database()
    db.collection('users').add({
      data: {
        userInfo: this.data.userInfo
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重新尝试'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  // 查询数据库中的记录
  onQuery: function() {
    var that = this;
    console.log('执行了Query');
    const db = wx.cloud.database()
    // 查询当前用户所有的 users
    db.collection('users').where({
      _openid: wx.getStorageSync('user-openid')
    }).get({
      success: res => {
        if (res.data.length != 0) {
          this.loginSuccess();
          this.setData({
            loginStatus: 1
          })
        } else {
          // 查询结果中没有存储用户的信息，将信息存储到云端
          if (that.data.loginStatus != 1 && wx.getStorageSync('user-openid') != '') {
            console.log("运行存储");
            // 添加用户信息、初始化卡片到数据库中
            this.onAdd();
            this.createFirst();
          }
        }

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  // 获取当前日期
  getdate: function() {
    var that = this;
    var d = new Date();
    var nowdate = convertDate.dateformat("yyyy-MM-dd", d);
    var year = convertDate.dateformat("yyyy", d);
    that.setData({
      startdate: year + '-01-01',
      enddate: year + '-12-31',
      nowdate: nowdate
    })
  },
  // 创建一个今年已经度过时间卡片
  createFirst: function() {
    var that = this;
    that.getdate();
    const db = wx.cloud.database();
    db.collection('user-cards').add({
      data: {
        carditem: {
          title: '距2019年结束',
          starttime: that.data.startdate,
          endtime: that.data.enddate,
          color: '#e63c56',
          cardstype: 'countback',
          rolename: 'Superman'
        }
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        var recordid = res._id;
        var cardsSet = that.data.cardsSet;
        cardsSet.push(recordid);
        db.collection('user-cards-set').add({
          data: {
            cardsSet: cardsSet
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            console.log('卡片集添加数据成功: ', res._id)
            // 将存放记录id存入到本地
            wx.setStorageSync('userCardsset_id', res._id)
            that.loginSuccess();
          },
          fail: err => {
            console.error('卡片集添加数据失败：', err)
          }
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重新尝试'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

})