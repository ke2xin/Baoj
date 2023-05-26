// e:\ckz\work\douyinproject\Baoj\pages\tgt\tgt.js
Page({
  data: {
    bgColor: "#fbeeed",
    arr: [{
        nickName: "于红",
        reward: "199.00",
        avatarUrl: "../images/0.jpg"
      },
      {
        nickName: "严雪",
        reward: "99.00",
        avatarUrl: "../images/1.jpg"
      },
      {
        nickName: "冷露",
        reward: "2.00",
        avatarUrl: "../images/2.jpg"
      },
      {
        nickName: "陈明",
        reward: "1.00",
        avatarUrl: "../images/3.jpg"
      },
      {
        nickName: "陆家萱",
        reward: "156.00",
        avatarUrl: "../images/4.jpg"
      },
      {
        nickName: "陶秀玲",
        reward: "4.00",
        avatarUrl: "../images/5.jpg"
      },
      {
        nickName: "王莎莎",
        reward: "1999.00",
        avatarUrl: "../images/6.jpg"
      },
      {
        nickName: "黄凯威",
        reward: "152.00",
        avatarUrl: "../images/7.jpg"
      },
      {
        nickName: "陈晓明",
        reward: "132.00",
        avatarUrl: "../images/8.jpg"
      },
      {
        nickName: " 邓燕",
        reward: "2.12",
        avatarUrl: "../images/4.jpg"
      },
    ],
    arr2: [{
        nickName: "",
        avatarUrl: ""
      },
      {
        nickName: "",
        avatarUrl: ""
      },
      {
        nickName: "",
        avatarUrl: ""
      },
      {
        nickName: "于红...刚刚抢购成功",
        avatarUrl: "../images/0.jpg",
      },
      {
        nickName: "严雪...刚刚抢购成功",
        avatarUrl: "../images/1.jpg",
      },
      {
        nickName: "冷露...刚刚抢购成功",
        avatarUrl: "../images/2.jpg",
      },
      {
        nickName: "陈明...刚刚抢购成功",
        avatarUrl: "../images/3.jpg",
      },
      {
        nickName: "陆家萱...刚刚抢购成功",
        avatarUrl: "../images/4.jpg",
      },
      {
        nickName: "陶秀玲...刚刚抢购成功",
        avatarUrl: "../images/5.jpg",
      },
      {
        nickName: "王莎莎...刚刚抢购成功",
        avatarUrl: "../images/6.jpg",
      },
      {
        nickName: "黄凯威...刚刚抢购成功",
        avatarUrl: "../images/7.jpg",
      },
      {
        nickName: "陈晓明...刚刚抢购成功",
        avatarUrl: "../images/8.jpg",
      },
      {
        nickName: " 邓燕...刚刚抢购成功",
        avatarUrl: "../images/4.jpg",
      },
    ],
    index: 0,
    i: 1
  },
  onLoad: function (options) {

  },
  onShow() {
    // tt.hideHomeButton({
    //   success(){
    //     console.log("调用成功");
    //   }
    // });
  },
  changeHandle(e) {
    console.log(e);
    var that = this;

    // if(that.data.isShow){
    //   if (e.detail.current >= 10) {
    //     // that.data.arr2.splice(0, 4);
    //     // console.log(that.data.arr2);
    //     // that.setData({
    //     //   arr2: that.data.arr2,
    //     //   isShow:false
    //     // });
    //     that.setData({
    //       isShow:false
    //     });
    //   }
    // }

  }
})