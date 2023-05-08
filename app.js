App({
  onLaunch: function () {
    tt.login({
      success: (res) => {
        console.log("临时登录票据", res);
        tt.request({
          url: 'https://slpos.kosm.com.cn/ypps/ps/ckz/Baoj/login.php',
          method: 'POST',
          data: {
            code: res.code,
            anonymous_code: res.anonymous_code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;'
          },
          success: (res) => {
            console.log("登录openid",res);
          },
          fail: (res) => {
            console.log(res);
          },
        });
      },
      fail: (res) => {

      },
    });
  },
  globalData: {
    yuming: 'https://slpos.kosm.com.cn/ypps/ps/ckz/Baoj/'
  }
})