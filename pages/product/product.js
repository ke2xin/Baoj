// e:\ckz\work\douyinproject\Baoj\pages\product\product.js
var app = getApp();
Page({
  data: {
    yuming: app.globalData.yuming,
  },
  tj(e) {
    console.log(e);
    // if (e.detail.value.count == "") {
    //   tt.showToast({
    //     title: "人数不可为空"
    //   });
    //   return false;
    // }
    tt.showLoading({
      title: "正在进行数据查询..."
    });
    var that = this;
    tt.request({
      url: that.data.yuming + 'ss.php',
      method: 'POST',
      data: {
        count: e.detail.value.count,
        dq: e.detail.value.dq,
        lb: e.detail.value.lb,
        md: e.detail.value.md,
        tcc: e.detail.value.tcc,
        page:1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        tt.hideLoading();
        if (res.data) {
          tt.navigateTo({
            url: '../detail/detail?count=' + e.detail.value.count+"&dq="+e.detail.value.dq
          });
        } else {
          tt.showToast({
            title: '暂无数据！'
          });
        }
      },
      fail: (res) => {
        console.log(res);
      },
    });
  },
  onLoad: function (options) {

  }
})