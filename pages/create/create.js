// pages/creat/creat.js
// 获得工具utils工具js里面函数,先模块化引用utils里面的js地址  reqiure('js地址')成一个面向对象
var app = getApp();
var convertDate = require('../../utils/convertDate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate: "2018-04-01",
    enddate: "2018-04-01",
    nowdate: "2018-04-01",
    color: 'ee4553',
    title: "标题",
    days: 0,
    complete: 0,
    percent: 0,
    timecardtableID: app.data.timecardtableID,
    ADtableID: app.data.ADtableID,
    ADshow: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdate();

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
    that.getAD();
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
  // 提醒用户保存
  alert:function(){
    wx.showToast({
      title: '赶快保存查看吧！',
      icon: 'none',
      duration: 1200
    })
  },
  // 同步显示到下方预览处
  bindKeyInput: function (e) {
    var str = e.detail.value;
    if (str.length > 0 && str.length <= 10){
      this.setData({
        title: e.detail.value
      })
    } else if (str.length == 0){
      this.setData({
        title: "标题"
      })
    }else{
      this.setData({
        title: str.substring(0, 9) + "..."
      })
    }

  },
  // 获取当前日期
  getdate:function(){
    var that = this;
    var d = new Date();
    var startdate = convertDate.dateformat("yyyy-MM-dd",d);
    that.setData({
      startdate: startdate,
      enddate: startdate,
      nowdate: startdate
    })
  },
  // 触发起始日选择器
  bindDateStart: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
    var days = that.getdays(that.data.startdate,that.data.nowdate);
    var alldays = that.getdays(that.data.startdate, that.data.enddate);
    var percent = parseInt(days/alldays*100);
    // console.log(percent)
    that.setData({
      complete: days,
      days: alldays,
      percent: percent
    })
  },
  // 触发目标日选择器
  bindDateEnd: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    var d1 = e.detail.value
    var d2 = that.data.nowdate
    var days = that.getdays(that.data.startdate, d1);
    that.setData({
      days: days
    })
    var completedays = that.getdays(that.data.startdate, d2);
    var percent = parseInt(completedays/days*100);
    that.setData({
      enddate: e.detail.value,
      percent: percent
    })
  },
  // 两日期相减得到相差天数
  getdays:function(day1,day2){
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
  // 获取广告
  getAD:function(){
    var that = this;
    var query1 = new wx.BaaS.Query();
    query1.compare('flag', '=', 1);
    var Product = new wx.BaaS.TableObject(that.data.ADtableID);
    Product.setQuery(query1).find().then(res => {
      // success
      // console.log(res)
      that.setData({
        ADshow: res.data.objects[0].content
      })
    }, err => {
      // err
    })
  },
  // 改变颜色
  changecolor: function(e){
    var that = this;
    var color = e.currentTarget.dataset.color;
    this.setData({
      color: color
    })
  },
  // 表单提交到数据库
  formSubmit: function (e) {
    var that = this;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // console.log(e.detail.value.textarea)
    // console.log(that.data.startdate)
    // console.log(that.data.nowdate)
    // console.log(that.data.enddate)
    var card = that.data
    // console.log(card)
    if(that.data.title != "标题"){
      // 插入timecard数据库
      let Timecard = new wx.BaaS.TableObject(card.timecardtableID);
      let Timecardinfo = Timecard.create();
      Timecardinfo.set("openid", wx.getStorageSync("ifx_baas_openid"));
      Timecardinfo.set("startdate", card.startdate);
      Timecardinfo.set("enddate", card.enddate);
      Timecardinfo.set("remarks", e.detail.value.textarea);
      Timecardinfo.set("title", card.title);
      Timecardinfo.set("color", card.color);
      Timecardinfo.set("flag", 0);
      Timecardinfo.save().then(res => {
        // success
        if(res.statusCode == 201){
          wx.showToast({
            title: '保存成功！',
            icon: 'none',
            duration: 1200
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }, err => {
        // err
        // console.log(err)
      })
    }
  }
})