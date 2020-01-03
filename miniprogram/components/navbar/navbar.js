Component({
  properties: {
    /*title: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },*/

    // 背景颜色
    backgroundColor: {
      type: String,
      value: '#FFFBF3'
    },
    // 导航栏标题
    navTitleText: {
      type: String,
      value: '导航栏'
    },
    // 导航栏操作图标
    navHandleImg: {
      type: String,
      value: ''
    },
    method: {
      type: String,
      value: ''
    }
  },
  attached: function() {
    var that = this;
    that.setNavSize();
    that.setAnimate();
  },
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
    animationB: {},
    addStatus: false,
    hideAddPopup: true
  },
  methods: {
    // 通过获取系统信息计算导航栏高度 
    setNavSize: function() {
      var sysinfo = wx.getSystemInfoSync();
      var statusBarH = sysinfo.statusBarHeight;
      if (sysinfo.system.indexOf('iOS') > -1) {
        // 导航栏高度 = 胶囊按钮高度 + 状态栏到胶囊按钮间距 * 2
        // ios的导航栏高度
        var titleBarH = 32 + 6 * 2;
      } else {
        // Android的导航栏高度
        var titleBarH = 32 + 8 * 2;
      }
      this.setData({
        // 状态栏高度 + 标题栏高度
        statusBarHeight: sysinfo.statusBarHeight,
        titleBarHeight: titleBarH
      });
    },
    // 设置动画
    setAnimate: function() {
      var that = this;
      that.animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
    },
    // 点击添加按钮，旋转图标并弹出菜单栏
    /*
      点击出现菜单后，在点击时会出现bug
        目前解决办法：使用遮罩层进行屏蔽，覆盖在按钮上面
    */
    createButtonHandle: function() {
      var that = this;
      var addStatus = that.data.addStatus;
      // 旋转角度是固定的，不是基于当前的位置
      if (!addStatus) {
        that.animation.rotate(45).step();
        // console.log("运行了1")
        that.setData({
          animationB: that.animation.export(),
          addStatus: !addStatus,
          hideAddPopup: !that.data.hideAddPopup
        })
        that.TAddPopup();

      } else {
        that.animation.rotate(0).step();
        that.setData({
          animationB: that.animation.export(),
          addStatus: !addStatus,
          hideAddPopup: !that.data.hideAddPopup
        })
      }

    },
    // 改变hideAddPopup的值实现对AddPopup的控制
    TAddPopup: function() {
      // console.log(this.data.hideAddPopup)
      let temp = this.data.hideAddPopup;
      // 点击事件带参传入父级
      this.triggerEvent('updataAddPopup', temp);
    },

    // 隐藏Add菜单
    hideAddPopup: function() {
      var that = this;
      that.setData({
        hideAddPopup: true
      })
    },
    // 显示Add菜单
    showAddPopup: function() {
      var that = this;
      that.setData({
        hideAddPopup: false
      })
    },
    // 返回按钮
    goback: function() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})