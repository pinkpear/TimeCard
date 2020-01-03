var util = require('../../utils/util.js');
var convertDate = require('../../utils/convertDate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideAddPopup: true,
    // 存放用户创建的卡片对应的记录id
    userCardsset: [],
    // 云端的记录此id
    userCardsset_id: '',
    // 存放所有用户创建的卡片（直接从云端获取的）
    cardsSet: [],
    // 存放处理后的用户卡片
    cardsPed: [],
    // 第一次进入该页面
    firstIn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var cardsSet = wx.getStorageSync('cardsSet');
    that.getdate();
    if (cardsSet == '') {
      // 获取当前日期
      that.getCardsSet();
      if (wx.getStorageSync('userCardsset_id') == '') {
        // 获取用户卡片集_id
        that.getUserscardsSet();
      }
    } else {
      that.getCardsProgress(cardsSet);
      that.setData({
        cardsSet: cardsSet
        //     cardsPed: wx.getStorageSync('cardsPed')
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.aniAct();
    // 接收组件传递数据
    that.singList = that.selectComponent("#navComp");
    // console.log(that.singList)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (!that.data.firstIn) {
      console.log("第一次显示")
      if (wx.getStorageSync('isNew') == 1) {
        that.getCardsSet();
      }
      console.log("执行了查询卡片操作")
      that.getCardsProgress(wx.getStorageSync('cardsSet'));
    }
    that.setData({
      firstIn: false
    })

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
  switchAddPopup: function(e) {
    var that = this;
    // console.log(e);
    var temp = e.detail;
    if (!temp) {
      that.showAddPopup();
    } else {
      that.closeAddPopup();
    }
  },
  // 关闭Add弹出框
  closeAddPopup: function() {
    var that = this;
    // 运行组件navbar中的方法
    that.singList.createButtonHandle();
    // Add菜单下滑动画
    that.aniPopup.bottom("-380rpx").step();
    // 遮罩层动画
    that.aniMask.backgroundColor("#FFF").opacity(0).step();
    that.setData({
      aniPopupA: that.aniPopup.export(),
      aniMaskA: that.aniMask.export(),
    })
    setTimeout(function() {
      that.setData({
        hideAddPopup: !that.data.hideAddPopup
      })
    }, 1000)

  },
  // 显示Add弹出框
  showAddPopup() {
    // console.log(e) //可以从e中得到传过来信息
    var that = this;
    that.setData({
      hideAddPopup: !that.data.hideAddPopup
    });
    // Add菜单上滑动画
    that.aniPopup.bottom("0rpx").step();
    // 遮罩层动画
    that.aniMask.backgroundColor("#333").opacity(0.5).step();
    that.setData({
      aniPopupA: that.aniPopup.export(),
      aniMaskA: that.aniMask.export(),
    });
  },
  /*
  跳转到创建卡片页面
*/
  oncreate: function(e) {
    var that = this;
    that.closeAddPopup();
    var cardstype = e.target.dataset.type;
    // console.log(cardstype)
    wx.navigateTo({
      url: '/pages/create/create?cardstype=' + cardstype,
    })
  },
  // 创建动画总函数
  aniAct: function() {
    var that = this;
    // 定义遮罩层动画
    that.aniMask = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    // 定义Add菜单上滑动画
    that.aniPopup = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
  },
  // 查询数据库中用户所创建的时间卡片
  // 查询数据库中的记录
  getUserscardsSet: function() {
    var that = this;
    console.log('执行了Query');
    const db = wx.cloud.database()
    // 查询当前用户所有的 users
    db.collection('user-cards-set').where({
      _openid: wx.getStorageSync('user-openid')
    }).get({
      success: res => {
        console.log(res);
        // 如果记录为空的的话就保存查询到的记录集id

        wx.setStorageSync('userCardsset_id', res.data[0]._id);
        var userCard = res.data[0];
        wx.setStorageSync('userCardsset', userCard.cardsSet);
        that.setData({
          userCardsset: userCard.cardsSet
        })
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
  // 获取卡片集
  getCardsSet: function() {
    var cardsSet = [];
    var that = this;
    // 获取云端创建的所有卡片（默认：按创建时间排序）
    const db = wx.cloud.database()
    // 查询当前用户所有的 cards
    db.collection('user-cards').where({
      _openid: wx.getStorageSync('user-openid')
    }).get({
      success: res => {
        console.log("113")
        console.log(res)
        var cardsSet = res.data;
        that.getCardsProgress(cardsSet);
        wx.setStorageSync('cardsSet', cardsSet);
        // 更新标记设置为0
        wx.setStorageSync('isNew', 0);
        that.setData({
          cardsSet: cardsSet
        })
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
    that.setData({
      nowdate: nowdate
    })
  },
  // 处理所得到了卡片
  getCardsProgress: function(cardsSet) {
    console.log("执行了卡片处理函数");
    var that = this;
    var cardsSet = cardsSet;
    var userCardsset = wx.getStorageSync('userCardsset');
    var cardsPed = [];
    for (var i in userCardsset) {
      for (var j in cardsSet) {
        /*
          用户可定制顺序
        */
        // 用户创建的卡片对应的记录id与所有记录的id对应的存放到数组中
        if (userCardsset[i] == cardsSet[j]._id) {
          var carditem = cardsSet[j].carditem;
          var passeddays = util.getdays(carditem.starttime, that.data.nowdate);
          var alldays = util.getdays(carditem.starttime, carditem.endtime);
          var percent = ((passeddays / alldays) * 100).toFixed(1);
          var finished = false;
          // 使进度条的宽度不会超出
          if(percent > 100.0){
            percent = 100.0;
            finished = true;
          }
          var obj = {
            cardid: cardsSet[j]._id,
            cardtype: carditem.cardstype,
            cardcolor: carditem.color,
            cardendtime: carditem.endtime,
            cardrolename: carditem.rolename,
            cardstarttime: carditem.starttime,
            cardtitle: carditem.title,
            percent: percent,
            finished: finished
          }
          cardsPed.push(obj);
        }
      }
    }
    wx.setStorageSync('cardsPed', cardsPed)
    that.setData({
      cardsPed: cardsPed
    })
  }
})