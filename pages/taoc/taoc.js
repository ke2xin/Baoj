// e:\ckz\work\douyinproject\Baoj\pages\taoc\taoc.js
const app = getApp()
Page({
  data: {
    yuming: app.globalData.yuming,
    item: {},
    windowWidth:0,
    windowHeight:0
  },
  onLoad: function (options) {
    const obj = tt.getSystemInfoSync();
    console.log(obj);
    tt.setNavigationBarTitle({
      title: options.name
    });

    var that = this;

    that.setData({
      windowWidth:obj.windowWidth,
      windowHeight:obj.windowHeight
    });
    tt.request({
      url: that.data.yuming + 'taoc.php',
      method: 'POST',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        that.setData({
          item: res.data
        });
      },
      fail: (res) => {
        console.log(res);
      },
    });
  },
  tj(e) {
    console.log(e);
    var that = this;
    if(e.detail.value.name==""){
        tt.showToast({
            title: '请填写您的称呼！'
        });
        return false;
    }
    if(e.detail.value.phone==""){
        tt.showToast({
            title: '请填写您的手机号！'
        });
        return false;
    }
    that.setData({
        hy_name:e.detail.value.name,
        hy_sj:e.detail.value.phone
    });
    tt.showLoading({
        title: '数据正在提交...'
    });
    tt.request({
        url: that.data.yuming + 'ss.php',
        method: 'POST',
        data: {
            count: e.detail.value.name,
            dq: e.detail.value.phone
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded;'
        },
        success: (res) => {
            console.log(res);
            tt.hideLoading();
            tt.showModal({
                title: '报名成功，2小时内有专人联系您，请保持手机畅通！'
            });
        },
        fail: (res) => {
            console.log(res);
        },
    });
}
})