// 获得工具utils工具js里面函数,先模块化引用utils里面的js地址  reqiure('js地址')成一个面向对象
var app = getApp();
var convertDate = require('../../utils/convertDate.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "请输入标题...",
    startdate: "2018-04-01",
    enddate: "2018-04-01",
    nowdate: "2018-04-01",
    cardstype: "",
    roleName: "Hulk",
    color: "#e63c56",
    roleGroups: {
      'Hulk': {
        'roleEname': 'Hulk',
        'roleName': '浩克'
      },
      'Superman': {
        'roleEname': 'Superman',
        'roleName': '超人'
      },
      'Thor': {
        'roleEname': 'Thor',
        'roleName': '雷神'
      },
      'Spider-Man': {
        'roleEname': 'Spider-Man',
        'roleName': '蜘蛛侠'
      },
      'Iron-Man': {
        'roleEname': 'Iron-Man',
        'roleName': '钢铁侠'
      },
      'Green-Lantern': {
        'roleEname': 'Green-Lantern',
        'roleName': '绿灯侠'
      },
      'Batman': {
        'roleEname': 'Batman',
        'roleName': '蝙蝠侠'
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getdate();
    that.setData({
      cardstype: options.cardstype
    })
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
  // 同步显示到下方预览处
  bindKeyInput: function(e) {
    var str = e.detail.value;
    if (str.length > 0 && str.length <= 10) {
      this.setData({
        title: e.detail.value
      })
    } else if (str.length == 0) {
      this.setData({
        title: "请输入标题..."
      })
    } else {
      this.setData({
        title: str.substring(0, 9) + "..."
      })
    }

  },
  // 改变颜色
  changecolor: function(e) {
    var that = this;
    var color = e.currentTarget.dataset.color;
    this.setData({
      color: color
    })
  },
  // 改变角色
  changerole: function(e) {
    var that = this;
    var roleName = e.currentTarget.dataset.rolename;
    this.setData({
      roleName: roleName
    })
  },
  // 获取所有角色
  getrolegroups: function() {
    var that = this;
    var temp = that.data.roleGroups;
    for (var i in temp) {
      console.log(i)
      console.log(temp[i].roleName)
    }
  },
  // 获取当前日期
  getdate: function() {
    var that = this;
    var d = new Date();
    var startdate = convertDate.dateformat("yyyy-MM-dd", d);
    that.setData({
      startdate: startdate,
      enddate: startdate,
      nowdate: startdate
    })
  },
  // 触发起始日选择器
  bindDateStart: function(e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
    var days = util.getdays(that.data.startdate, that.data.nowdate);
    var alldays = util.getdays(that.data.startdate, that.data.enddate);
    var percent = parseInt(days / alldays * 100);
    // console.log(percent)
    that.setData({
      complete: days,
      days: alldays,
      percent: percent
    })
  },
  // 触发目标日选择器
  bindDateEnd: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var d1 = e.detail.value
    var d2 = that.data.nowdate
    var days = util.getdays(that.data.startdate, d1);
    that.setData({
      days: days
    })
    var completedays = util.getdays(that.data.startdate, d2);
    var percent = parseInt(completedays / days * 100).toFixed(1);
    that.setData({
      enddate: e.detail.value,
      percent: percent
    })
  },
  // 保存选项
  formSubmit: function() {
    var that = this;
    that.addTimeCard();
  },
  // 创建一个新的卡片
  addTimeCard: function() {
    var that = this;
    /* 
      将卡片记录存储到数据库user-cards表中
      返回的记录id，存储到user-cards-set表中
    */
    const db = wx.cloud.database();
    db.collection('user-cards').add({
      data: {
        carditem: {
          title: that.data.title,
          starttime: that.data.startdate,
          endtime: that.data.enddate,
          color: that.data.color,
          cardstype: that.data.cardstype,
          rolename: that.data.roleName
        }
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        var recordid = res._id;
        var userCardsset = wx.getStorageSync('userCardsset');
        userCardsset.push(recordid);
        // 更新本地数据库
        wx.setStorageSync('userCardsset', userCardsset)
        // 更新网络数据库中的user-cards-set
        db.collection('user-cards-set').doc(wx.getStorageSync('userCardsset_id')).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 本地保存的卡片集添加新的数据并存储到数据库中
            cardsSet: userCardsset
          },
          success(res) {
            wx.setStorageSync('isNew', 1);
            // 新建成功，页面返回
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登录失败，请重新尝试'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})