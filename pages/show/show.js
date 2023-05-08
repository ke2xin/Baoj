// e:\ckz\work\douyinproject\Baoj\pages\show\show.js  ../../../utils/wxcharts.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;


Page({
    data: {
        yuming: app.globalData.yuming,
        item: {},
        windowWidth: '320',
        windowHeight: '540',
        show: false,
        list: [],
        page: 2,
        id: 0
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('2023-' + (i + 1));
            data.push(Math.random() * (20 - 10) + 10);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },
    updateData: function () {
        var simulationData = this.createSimulationData();
        var series = [{
            name: '成交量',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },
    onLoad: function (e) {
        console.log(e);
        var date = new Date();
        console.log(date.getDate());
        var windowWidth = 320;
        var that = this;
        try {
            var res = wx.getSystemInfoSync();
            console.log('获取系统信息', res);
            windowWidth = res.windowWidth;
            that.setData({
                windowWidth: res.windowWidth,
                windowHeight: res.windowHeight
            });
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '成交量',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
        this.getData(e.id);
    },
    getData(id) {
        var that = this;
        that.setData({
            id: id
        });
        console.log(that.data.yuming);
        tt.request({
            url: that.data.yuming + 'detail.php',
            method: 'POST',
            data: {
                id: id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;'
            },
            success: (res) => {
                console.log(res);
                that.setData({
                    item: res.data.item,
                    list: res.data.list
                });
                var jl = tt.getStorageSync('jl');
                if (jl) {
                    let newjl = jl.map(item => {
                        return item.id
                    })
                    console.log("添加", newjl);
                    if (newjl.indexOf(that.data.item.id) == -1) {
                        jl.push(that.data.item);
                        tt.setStorageSync('jl', jl);
                    }
                } else {
                    jl = [];
                    jl.push(that.data.item);
                    tt.setStorageSync('jl', jl);
                }
            },
            fail: (res) => {
                console.log(res);
            },
        });
    },
    buy(e) {
        console.log(e);
        var that = this;
        if (e.detail.value.name == "") {
            tt.showToast({
                title: "收件人姓名不可为空"
            });
            return false;
        }
        if (e.detail.value.phone == "") {
            tt.showToast({
                title: "收件人手机号不可为空"
            });
            return false;
        }
        if (e.detail.value.address == "") {
            tt.showToast({
                title: "收件人地址不可为空"
            });
            return false;
        }
        tt.showLoading({
            title: "您正在进行支付操作..."
        });
        that.setData({
            show: false
        });
        //return false;
        tt.request({
            url: that.data.yuming + 'pay.php',
            method: 'POST',
            data: {
                hy_name: e.detail.value.name,
                address: e.detail.value.address,
                phone: e.detail.value.phone,
                xm_id: e.detail.value.xm_id,
                xm_name: e.detail.value.xm_name,
                xm_pic: e.detail.value.xm_pic
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;'
            },
            success: (res) => {
                console.log(res);
                tt.hideLoading();
                if (res.data.err_no == 0) {
                    tt.pay({
                        orderInfo: res.data.data,
                        service: 5,
                        success: (res) => {
                            console.log('支付完成');
                            console.log(res);
                            if (res.code == 0) {
                                tt.showToast({
                                    title: '支付成功',
                                    success: (res) => {
                                        setTimeout(() => {
                                            tt.reLaunch({
                                                url: '../index/index'
                                            });
                                        }, 1000);
                                    },
                                    fail: (res) => {

                                    },
                                });
                            } else if (res.code == 4) {
                                tt.showToast({
                                    title: '你已取消支付',
                                    success: (res) => {
                                        setTimeout(() => {
                                            tt.reLaunch({
                                                url: '../index/index'
                                            });
                                        }, 1000);
                                    },
                                    fail: (res) => {

                                    },
                                });
                            }
                        },
                        fail: (res) => {
                            console.log('支付失败');
                        },
                    });
                } else {
                    tt.showToast({
                        title: '支付失败！'
                    });
                    setTimeout(() => {
                        tt.reLaunch({
                            url: '../index/index'
                        });
                    }, 1000);
                }
            },
            fail: (res) => {
                console.log(res);
            },
        });
    },
    go(e) {
        this.setData({
            show: true
        });
    },
    more(e) {
        console.log(e);
        var that = this;
        if (that.data.list.length < 4) {
            tt.showToast({
                title: '暂无更多！'
            });
        } else {
            tt.request({
                url: that.data.yuming + 'more.php',
                method: 'POST',
                data: {
                    id: that.data.id,
                    page: that.data.page
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded;'
                },
                success: (res) => {
                    console.log(res);
                    if (res.data.list.length > 0) {
                        var list = that.data.list.concat(res.data.list);
                        var page = that.data.page + 1;
                        that.setData({
                            list: list,
                            page: page
                        });
                    } else {
                        tt.showToast({
                            title: '暂无更多！'
                        });
                    }

                },
                fail: (res) => {
                    console.log(res);
                },
            });
        }
    },
    zzc(e) {
        console.log(e);
        this.setData({
            show: false
        });
    }
})