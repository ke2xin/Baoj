const app = getApp()

Page({
  data: {
    yuming: app.globalData.yuming,
    jl: [],
    tabs: [{
        name: '历史查询',
        active: true
      },
      {
        name: '查询排行',
        active: false
      }
    ],
    panel: '历史查询',
    xm: []
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  onShow:function(){
    var that = this;
    const jl = tt.getStorageSync('jl');
    console.log("历史记录：",jl);
    that.setData({
      jl:jl
    })
  },
  go(e) {
    console.log(e)
    tt.navigateTo({
      url: '../search/search'
    });
  },
  goto(e) {
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id=' + e.currentTarget.dataset.id
    });
  },
  del(e) {
    var that = this;
    
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
    if(panel=='查询排行'){
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
  look(e){
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id='+e.currentTarget.dataset.id
    });
  },
})