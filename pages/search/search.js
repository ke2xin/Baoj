// e:\ckz\work\douyinproject\Baoj\pages\search\search.js
const app=getApp()
Page({
  data: {
    yuming:app.globalData.yuming,
    jl:[],
    show:false,
    tips:'取消',
    tips_css:"tips",
    items:[
      {
        name:'综合',
        active:true,
      },
      {
        name:'销量',
        active:false
      },
      {
        name:'价格',
        active:false
      },
      {
        name:'自营',
        active:false
      }
    ],
    type:1,
    inputvalue:'',
    xm:[]
  },
  onLoad: function (options) {
    var that=this;
    
  },
  onShow:function(){
    var that = this;
    const jl = tt.getStorageSync('jl');
    console.log("历史记录：",jl);
    that.setData({
      jl:jl
    })
  },
  handleInput(e){
    console.log(e);
    console.log(e.detail.value);
    var that=this;
    if(e.detail.value.trim()==""){
      that.setData({
        show:false,
        tips:'取消',
        tips_css:'tips',
        inputvalue:e.detail.value
      })
    }else{
      that.setData({
        show:true,
        tips:'搜索',
        tips_css:'tips_on',
        inputvalue:e.detail.value
      })
    }
  },
  search(e){
    console.log(e);
    var that=this;
    if(e.currentTarget.dataset.name=="搜索"){
      that.setData({
        type:2
      });
      that.getData(0);
    }else{
      tt.navigateBack();
    }
  },
  close(e){
    console.log(e);

    var that=this;
    that.setData({
      inputvalue:'',
      type:1,
      show:false
    });
  },
  del(e){
    var that = this;
    const res = tt.setStorageSync('jl', []);
    that.setData({
      jl: []
    });
  },
  getData(fun){
    var that=this;
   console.log(that.data.yuming);
   tt.request({
     url: that.data.yuming+'index.php',
     method:'POST',
     data:{
       fun:fun,
       k:that.data.inputvalue
     },
     header:{
       'content-type':'application/x-www-form-urlencoded;'
     },
     success: (res) => {
      console.log(res);
      that.setData({
        xm:res.data,
        type:2
      });
     },
     fail: (res) => {
      console.log(res);
     },
   });
  },
  sw(e){
    console.log(e);
    var that=this;
    var items=that.data.items;
    for(let i=0;i<items.length;i++){
      if(i==e.currentTarget.dataset.index){
        items[i].active=true
      }else{
        items[i].active=false
      }
    }
    that.setData({
      items:items
    });
    that.getData(e.currentTarget.dataset.index);
  },
  look(e){
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id='+e.currentTarget.dataset.id
    });
  },
  goto(e){
    console.log(e);
    tt.navigateTo({
      url: '../show/show?id='+e.currentTarget.dataset.id
    });
  },
})