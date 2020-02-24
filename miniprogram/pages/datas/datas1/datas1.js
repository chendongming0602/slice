// miniprogram/pages/datas/datas1/datas1.js
const APP=getApp();
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
    ],
    isNext:true
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
  nextE(){//下一步/完成
    this.requestE().then(res=>{
      APP.userInfo.person_id=res.person_id;
      wx.navigateTo({
        url: '/pages/datas/basics/basics',
      });
    });
  },
  noE(){//暂不填写

  },
  requestE(){
    return APP.request({
      path:"/person/edit/bloodRelation",
      method:"POST",
      data:{
        blood_relation:this.data.value
      }
    });
  },
  before(){
    let that=this,datas=this.data;
    return APP.request({
      path:"/my/detail",
    }).then(res=>{
      let dataDeta=JSON.stringify({...res});
      wx.setStorageSync("dataDeta",dataDeta);//存进缓存
      let deforeValue=res.base.blood_relation,childrenList=datas.childrenList.indexOf(deforeValue),kithList=datas.kithList.indexOf(deforeValue);
      that.setData({value:deforeValue});
      if(childrenList!==-1) that.setData({
        "isCss.isChildren":false,
        "isCss.children":true,
        chidsIndex:childrenList,
        isCount:2
      });
      if(kithList!==-1) that.setData({
        "isCss.isKith":false,
        "isCss.kith":true,
        kithIndex:kithList,
        isCount:2
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {come}=options,that=this;
    if(come){
      that.setData({isNext:false});
      this.before();
    } 
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