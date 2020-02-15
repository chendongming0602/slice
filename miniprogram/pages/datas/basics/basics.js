// miniprogram/pages/datas/basics/basics.js
import datas from "../../../utils/datas.js";
// console.log(datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:datas.sex,
    occupation:datas.occupation,
    education:datas.education,
    stature:datas.stature,
    sexValue:"",//性别
    timeEnd:"2020-12-30",
    birthValue:"",//出生
    province: datas.city.map(it => it.label),
    city: datas.city[0].children.map(it => it.label),
    area: datas.city[0].children[0].children.map(it => it.label),
    census:"",//户籍
    place:[0,0,0],
    placeValue:"",//居住地
    educValue:"",//学历
    statureValue:"",//身高
    occupValue:"",//职业
    isNext:true
  },
  changeSex(e){//性别
    let that=this,{value}=e.detail;
    that.setData({
      sexValue:that.data.sex[value]
    });
  },
  changeTime(e){//出生
    let {value}=e.detail;
    this.setData({birthValue:value});
  },
  changeCensus(e){//户籍
    let {value}=e.detail,that=this;
    that.setData({census:that.data.province[value]});
  },
  changePlaceC(e){
    let {column,value}=e.detail;
    switch(column){
      case 0:
        this.setData({
          city: datas.city[value].children.map(it => it.label),
          area: datas.city[value].children[0].children.map(it => it.label),
          
        });
        this._city=value;
      case 1:
        this.setData({
          area: datas.city[this._city].children[value].children.map(it => it.label),
        });
    }
  },
  changePlace(e){
    let that=this,{value}=e.detail,province=that.data.province[value[0]],city=that.data.city[value[1]],area=that.data.area[value[2]],placeValue=province+","+city+","+area;
    that.setData({
      placeValue
    })
  },
  changeEduc(e){//学历
    let {value}=e.detail;
    this.setData({
      educValue:this.data.education[value]
    });
  },
  changeStature(e){//身高
    let {value}=e.detail;
    this.setData({
      statureValue:this.data.stature[value]
    });
  },
  changeOccup(e){//职业
    let {value}=e.detail;
    this.setData({
      occupValue:this.data.occupation[value]
    });
  },
  changephone(e){//电话/微信号
    let {value}=e.detail;
    this._phone=value;
  },
  nextE(){//下一步/完成
    wx.navigateTo({
      url: '/pages/datas/mate/mate',
    });
  },
  noE(){//暂不填写
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let{come}=options,that=this,timeEnd=new Date().getFullYear()+"-01-01";
    that.setData({timeEnd});
    if(come) that.setData({isNext:false});
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