Component({
  properties: {
    /*title: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },*/
    cardTitle: {
      type: String,
      value: '请输入标题...'
    },
    cardColor: {
      type: String,
      value: '#e63c56'
    },
    startTime: {
      type: String,
      value: '2019-05-01'
    },
    roleName: {
      type: String,
      value: 'Superman'
    },
    endTime: {
      type: String,
      value: '2019-09-01'
    },
    percent: {
      type: Number,
      value: 0
    },
    finished: {
      type: Boolean,
      value: false
    }
  },
  attached: function() {
    this.aniAct();
  },
  data: {
    cardHandle: true,
  },
  methods: {
    aniAct: function() {
      var that = this;
      // 定义旋转动画
      that.aniRotate = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
    },
    // 点击操作，按钮旋转
    rotate90: function() {
      var that = this
      // 旋转角度是固定的，不是基于当前的位置
      if (that.data.cardHandle) {
        that.aniRotate.rotate(90).step()
      } else {
        that.aniRotate.rotate(0).step()
      }
      that.setData({
        aniRotateA: that.aniRotate.export(),
        cardHandle: !that.data.cardHandle
      })
    },
  }
})