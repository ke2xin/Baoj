// e:\ckz\work\douyinproject\Baoj\pages\sous\sous.js
var tcity = require("../../utils/citys.js");
const app = getApp()
Page({
  data: {
    yuming: app.globalData.yuming,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    title: ''
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  tj(e) {
    console.log(e);
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
        tcc: e.detail.value.tcc,
        page: 1,
        fun: 0,
        title:that.data.title
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: (res) => {
        console.log(res);
        tt.hideLoading();
        if (res.data) {
          tt.navigateTo({
            url: '../detail/detail?count=' + e.detail.value.count + "&dq=" 
            + e.detail.value.dq+'&title='+that.data.title
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
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');


    tt.setNavigationBarTitle({
      title: options.name
    });

    that.setData({
      title: options.name
    });

    tt.request({
      url: that.data.yuming + 'sous.php',
      method: 'POST',
      data: {
        index: options.index,
        title: options.name
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
  }
})