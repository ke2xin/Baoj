// e:\ckz\work\douyinproject\Baoj\pages\detail\detail.js
var app = getApp();
Page({
  data: {
    yuming: app.globalData.yuming,
    xm: [],
    page: 1,
    items: [{
        name: '综合',
        active: true,
      },
      {
        name: '销量',
        active: false
      },
      {
        name: '价格',
        active: false
      },
      {
        name: '自营',
        active: false
      }
    ],
    triangle: 'triangle_top',
    type: 1,
    fun: 0
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      count: options.count,
      dq: options.dq,
      title: options.title
    });
    tt.request({
      url: that.data.yuming + 'ss.php',
      method: 'POST',
      data: {
        page: that.data.page,
        count: options.count,
        dq: options.dq,
        fun: 0,
        title: options.title
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        if (res.data) {
          that.setData({
            xm: res.data
          });
        } else {
          tt.showToast({
            title: '暂无数据！'
          });
        }
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  look(e) {
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id=' + e.currentTarget.dataset.id
    });
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("页面触底");
    var that = this;
    var page = that.data.page + 1;
    //var xm=that.data.xm;
    tt.request({
      url: that.data.yuming + 'ss.php',
      method: 'POST',
      data: {
        page: page,
        count: that.data.count,
        dq: that.data.dq,
        fun: that.data.fun,
        title:that.data.title
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        if (res.data) {
          //var xm=xm.concat(res.data);
          var xm = that.data.xm;
          var newxm = xm.concat(res.data);

          that.setData({
            xm: newxm,
            page: page
          });
        } else {
          tt.showToast({
            title: '暂无数据！'
          });
        }
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  sw(e) {
    console.log(e);
    var that = this;
    var items = that.data.items;
    var type = that.data.type;
    for (let i = 0; i < items.length; i++) {
      if (e.currentTarget.dataset.name == '价格') {
        if (type == 1) {
          that.setData({
            triangle: 'triangle_top_on',
            type: 2
          });
        } else {
          that.setData({
            triangle: 'triangle_bottom_on',
            type: 1
          });
        }

      } else {
        that.setData({
          triangle: 'triangle_top'
        });
      }
      if (i == e.currentTarget.dataset.index) {
        items[i].active = true
      } else {
        items[i].active = false
      }
    }
    that.setData({
      items: items,
      page: 1,
      fun: e.currentTarget.dataset.index
    });
    that.getData(e.currentTarget.dataset.index);
  },
  getData(fun) {
    var that = this;
    console.log(that.data.yuming);
    tt.request({
      url: that.data.yuming + 'ss.php',
      method: 'POST',
      data: {
        fun: fun,
        page: 1,
        count: that.data.count,
        dq: that.data.dq,
        type: that.data.type,
        title:that.data.title
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        that.setData({
          xm: res.data,
        });
      },
      fail: (res) => {
        console.log(res);
      },
    });
  },
})