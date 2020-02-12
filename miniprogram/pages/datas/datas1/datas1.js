// miniprogram/pages/datas/datas1/datas1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCss:{
      isChildren:true,//控制子女面板
      children:false,//控制子女箭头
      isKith:true,//控制亲友面板
      kith:false//控制亲友箭头
    },
    isCount:1,
    chidsIndex:null,
    kithIndex:null,
    value:"本人",
    childrenList:[
      "我电风扇",
      "我电风扇",
      "地方",
    ],
    kithList:[
      "阿斯蒂",
      "d时代峰"
    ]
  },

  selfE(){//本人
    let that=this;
    that.setData({
      isCount:1,
      chidsIndex:null,
      'isCss.isChildren':true,
      'isCss.children':false,
      kithIndex:null,
      "isCss.isKith":true,
      "isCss.kith":false,
      value:"本人"
    });
  },
  childrenE(){//子女按钮
    let that=this;
    that.setData({
      'isCss.children':!that.data.isCss.children,
      'isCss.isChildren':!that.data.isCss.isChildren,
      "isCss.isKith":true,
      "isCss.kith":false
    });
  },
  chidsE(e){//子女面板
    let {index,value}=e.currentTarget.dataset,that=this;
    that.setData({
      chidsIndex:index,
      isCount:2,
      kithIndex:null,
      value
    });

  },

  kithE(){//亲友按钮
    let that=this;
    that.setData({
      'isCss.kith':!that.data.isCss.kith,
      'isCss.isKith':!that.data.isCss.isKith,
      'isCss.isChildren':true,
      'isCss.children':false,
    });
  },
  kithItemE(e){//亲友面板
    let {index,value}=e.currentTarget.dataset,that=this;
    that.setData({
      kithIndex:index,
      isCount:2,
      chidsIndex:null,
      value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})