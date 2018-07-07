// pages/index/carddetail/carddetail.js
var app = getApp();
var convertDate = require('../../../utils/convertDate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardid: "",
    timecardtableID: app.data.timecardtableID,
    nowdate: "2018-04-30",
    timecard: {},
    shareImgSrc: "",
    hishare: true,
    ADtableID: app.data.ADtableID,
    ADshow: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cardid = options.cardid;
    that.setData({
      cardid: cardid
    })
    that.selectTimecard(cardid);
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
  selectTimecard: function (cardid) {
    var that = this;
    that.getdate();
    // 实例化查询对象
    let selectcard = new wx.BaaS.Query()
    // 设置查询条件（比较、字符串包含、组合等）
    selectcard.compare('id', '=', cardid);
    // 应用查询对象
    let query = new wx.BaaS.TableObject(that.data.timecardtableID)
    query.setQuery(selectcard).find().then(res => {
      var result = res.data.objects[0];
      // 设置导航栏颜色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: "#" + result.color,
      })
      /**
       * 判断卡片类型
       */
      if (result.type == 'countback') {
        var startdate = result.startdate;
        var enddate = result.enddate;
        var surplus = that.getdays(that.data.nowdate, enddate);
        var scope = that.getdays(startdate, enddate);
        if (surplus >= 0) {
          var completed = that.getdays(startdate, that.data.nowdate);
          var percent = completed / scope * 100;
        } else {
          var completed = scope;
          var percent = 100;
          surplus = "已结束";
        }

        var temp = {
          id: result.id,
          startdate: startdate,
          enddate: enddate,
          title: result.title,
          color: result.color,
          scope: scope,
          completed: completed,
          percent: percent,
          surplus: surplus,
          cardstype: result.type
        }
      } else {
        // 处理累计日
        var startdate = result.startdate;
        var completed = that.getdays(startdate, that.data.nowdate);
        var temp = {
          id: result.id,
          cardstype: result.type,
          startdate: startdate,
          title: result.title,
          color: result.color,
          completed: completed
        }
      }
      that.setData({
        timecard: temp
      })
    }, err => {
      wx.showToast({
        title: '获取详细信息失败！',
        icon: 'none',
        duration: 1200
      })
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
  // 获取广告
  getAD: function () {
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
  ondelete: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      cancelColor: '#ee3f4d',
      success: function (res) {
        // 对数据进行软删除
        if (res.confirm) {
          // console.log('用户点击确定')
          let MyTableObject = new wx.BaaS.TableObject(that.data.timecardtableID);
          let product = MyTableObject.getWithoutData(that.data.timecard.id);
          product.set('flag', 1);
          product.update().then(res => {
            // success
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }, err => {
            // err
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onshare: function () {
    var that = this;
    that.setData({
      hishare: false
    })
    const ctx = wx.createCanvasContext('myCanvas')

    var img = "/images/icon/model.png"
    ctx.setFillStyle("#" + that.data.timecard.color)
    ctx.fillRect(0, 0, 320, 239)
    ctx.drawImage(img, 0, 0, 320, 239)

    ctx.setFontSize(18)
    ctx.setFillStyle('#ffffff')
    ctx.fillText(that.data.timecard.title, 30, 72)

    if (that.data.timecard.cardstype == 'countback'){
      ctx.setFontSize(10)
      ctx.setFillStyle('#CCCCCC')
      ctx.fillText('剩余天数', 30, 100)

      ctx.setFontSize(40)
      ctx.setFillStyle('#FFFFFF')
      ctx.fillText(that.data.timecard.surplus, 30, 145)

      ctx.setFontSize(13)
      ctx.setFillStyle('#CCCCCC')
      ctx.fillText("目标日：" + that.data.timecard.enddate, 30, 195)
    }else{
      ctx.setFontSize(10)
      ctx.setFillStyle('#CCCCCC')
      ctx.fillText('累计天数', 30, 100)

      ctx.setFontSize(40)
      ctx.setFillStyle('#FFFFFF')
      ctx.fillText(that.data.timecard.completed, 30, 145)

      ctx.setFontSize(13)
      ctx.setFillStyle('#CCCCCC')
      ctx.fillText("起始日：" + that.data.timecard.startdate, 30, 195)
    }
    

    ctx.draw()
  },
  on: function () {
    var that = this;
    // 3. canvas画布转成图片
    wx.canvasToTempFilePath({
      width: 320,
      height: 239,
      destWidth: 960,
      destHeight: 620,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath);
        that.saveimg(res.tempFilePath)
      },
      fail: function (res) {
        console.log(res)
      }
    })

  },
  saveimg: function (path) {
    //4. 当用户点击分享到朋友圈时，将图片保存到相册
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success(res) {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，去发圈噻~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hishare: true
              })
            }
          }
        })
      }
    })
  },
  back: function () {
    var that = this;
    that.setData({
      hishare: true
    })
  }

})