const app = getApp()

Page({
  data: {
    yuming: app.globalData.yuming,
    item: {}
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')

  
    tt.getLocation({
      success: (res) => {
        console.log("获取经纬度",res);
        console.log("经度",res.longitude);
        console.log("纬度",res.latitude);
      },
      fail: (res) => {
        console.log("获取失败");
      },
    });

    var that = this;
    tt.request({
      url: that.data.yuming + 'home.php',
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
  onShow: function () {

  },
  go(e) {
    console.log(e)
    if (e.currentTarget.dataset.index == 3) {
      tt.navigateTo({
        url: '../taoc/taoc?name=' + e.currentTarget.dataset.name +
          '&index=' + e.currentTarget.dataset.index
      });
    } else {
      tt.navigateTo({
        url: '../sous/sous?name=' + e.currentTarget.dataset.name +
          '&index=' + e.currentTarget.dataset.index
      });
    }
  },
  goto(e) {
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id=' + e.currentTarget.dataset.id
    });
  },
  del(e) {
    var that = this;
    //测试
    const res = tt.setStorageSync('jl', []);
    that.setData({
      jl: []
    });
  },
  swtabs(e) {
    console.log(e);
    var that = this;
    var tabs = that.data.tabs;
    var panel = e.currentTarget.dataset.name;
    if (panel == '查询排行') {
      that.getData(0)
    }

    for (let i = 0; i < tabs.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        tabs[i].active = true;
      } else {
        tabs[i].active = false
      }
    }
    that.setData({
      tabs: tabs,
      panel: panel
    });
  },
  getData(fun) {
    var that = this;
    console.log(that.data.yuming);
    tt.request({
      url: that.data.yuming + 'index.php',
      method: 'POST',
      data: {
        fun: fun,
        k: that.data.inputvalue
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
  look(e) {
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id=' + e.currentTarget.dataset.id
    });
  },
  product(e) {
    tt.navigateTo({
      url: '../product/product'
    });
  },
  getPhoneNumberHandler(e){
    console.log(e);
  },
  tg(e){
    console.log(e)
    tt.navigateTo({
      url: '../tgt/tgt',
      success: (res) => {
        
      },
      fail: (res) => {
        
      },
    });
  }
})