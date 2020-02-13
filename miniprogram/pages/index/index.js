//index.js
const APP = getApp()

Page({
  data: {
    tabCount:2,//选择的tab
    tabIf:[false,false,false],
  },
  tabIdex(e){//tab事件
    this.setData({
      tabCount:e.detail,
      [`tabIf[${e.detail}]`]:true
    });

  },
  onLoad: function() {
    this.setData({
      [`tabIf[${this.data.tabCount}]`]: true
    });
  },


})
