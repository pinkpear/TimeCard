var app = getApp();
var convertDate = require('../../utils/convertDate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timecardtableID: app.data.timecardtableID,
    nowdate: "2018-04-30"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    that.showCard();
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
  // 跳转添加timeCard页面
  creatCard: function () {
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  // 展示已经存在的卡片
  showCard: function () {
    var that = this;
    that.getdate();
    var mycards = [];
    var query1 = new wx.BaaS.Query();
    query1.compare('openid', '=', wx.getStorageSync("ifx_baas_openid"));
    var query2 = new wx.BaaS.Query();
    query2.compare('flag', '=', 0);
    let andQuery = wx.BaaS.Query.and(query1, query2)

    // 应用查询对象
    var userquery1 = new wx.BaaS.TableObject(that.data.timecardtableID);
    userquery1.setQuery(andQuery).find().then((res) => {
      // success
      var result = res.data.objects;
      for (var idx in result) {
        var startdate = result[idx].startdate;
        var enddate = result[idx].enddate;
        var surplus = that.getdays(that.data.nowdate, enddate);
        var scope = that.getdays(startdate, enddate);
        if (surplus >= 0) {
          var completed = that.getdays(startdate, that.data.nowdate);
          var percent = completed/scope*100;
        } else {
          var completed = scope;
          var percent = 100;
          surplus = "已结束";
        }

        var temp = {
          id: result[idx].id,
          startdate: startdate,
          enddate: enddate,
          remarks: result[idx].remarks,
          title: result[idx].title,
          color: result[idx].color,
          scope: scope,
          completed: completed,
          percent: percent,
          surplus: surplus
        }
        mycards.push(temp)
      }
      that.setData({
        mycards: mycards
      })
    }, err => {
      // err
    })
  },
  // 获取当前日期
  getdate: function () {
    var that = this;
    var d = new Date();
    var nowdate = convertDate.dateformat("yyyy-MM-dd", d);
    that.setData({
      nowdate: nowdate
    })
  },
  // 两日期相减得到相差天数
  getdays: function (day1, day2) {
    var that = this;
    var d1 = day1;
    var d2 = day2;
    d1 = d1.replace(/\-/g, "/");
    d2 = d2.replace(/\-/g, "/");
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var days = Math.ceil((date2 - date1) / (24 * 60 * 60 * 1000));
    return days;
  },
  // 跳转详情页面
  ondetail: function(e){
    wx.navigateTo({
      url: 'carddetail/carddetail?cardid='+e.currentTarget.dataset.cardid,
    })
  }
})