//app.js
try{
  wx.cloud.init({
    // env: 'my-env-id',
    traceUser: true,
  });
}catch(err){}

App({
  onLaunch: function () {
    

    this.globalData = {}
  },
  loadShow(text="加载中...",is=true){
    wx.showLoading({
      title: text,
      mask:is
    })
  },
  toastShow(text="温馨提示~"){
    wx.showToast({
      title: text,
      icon:"none"
    })
  }
})
