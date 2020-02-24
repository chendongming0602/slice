// miniprogram/pages/datas/basics/basics.js
import datas from "../../../utils/datas.js";
const APP=getApp();
// console.log(datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age:datas.age,
    income:datas.year,
    education:datas.education,
    stature:datas.stature,
    ageValue:"",//年龄
    // timeEnd:"2020-12-30",
    birthValue:"",//身高
    province: datas.city.map(it => it.label),
    // city: datas.city[0].children.map(it => it.label),
    // area: datas.city[0].children[0].children.map(it => it.label),
    censusValue:"",//户籍
    place:[0,0,0],
    // placeValue:"",//居住地
    educValue:"",//学历
    statureValue:"",//身高
    incomeValue:"",//收入
    house:[
      "有",
      "无"
    ],
    houseValue:"",//婚房
    educValue:"",//学历
    isNext:true,
    markValue:"",//更多说明
  },
  changeSex(e){//年龄
    let that=this,{value}=e.detail;
    that.setData({
      ageValue:that.data.age[value]
    });
  },
  changeTime(e){//身高
    let {value}=e.detail;
    this.setData({birthValue:this.data.stature[value]});
  },
  changeCensus(e){//户籍
    let {value}=e.detail,that=this;
    that.setData({censusValue:that.data.province[value]});
  },
  // changePlaceC(e){
  //   let {column,value}=e.detail;
  //   switch(column){
  //     case 0:
  //       this.setData({
  //         city: datas.city[value].children.map(it => it.label),
  //         area: datas.city[value].children[0].children.map(it => it.label),
          
  //       });
  //       this._city=value;
  //     case 1:
  //       this.setData({
  //         area: datas.city[this._city].children[value].children.map(it => it.label),
  //       });
  //   }
  // },
  changePlace(e){
    let that=this,{value}=e.detail,province=that.data.province[value[0]],city=that.data.city[value[1]],area=that.data.area[value[2]],placeValue=province+","+city+","+area;
    that.setData({
      placeValue
    })
  },
  changeEduc(e){//是否有婚房
    let {value}=e.detail;
    this.setData({
      houseValue:this.data.house[value]
    });
  },
  changeStature(e){//身高
    let {value}=e.detail;
    this.setData({
      incomeValue:this.data.income[value]
    });
  },
  changeOccup(e){//学历
    let {value}=e.detail;
    this.setData({
      educValue:this.data.education[value]
    });
  },
  changephone(e){//电话/微信号
    let {value}=e.detail;
    this._phone=value;
  },
  textareaEvent(e){//更多择偶要求
    let {value}=e.detail;
    this.setData({markValue:value})
  },
  before(){
    if(wx.getStorageSync("dataDeta")) return this.dispose(JSON.parse(wx.getStorageSync("dataDeta")));//有缓存，拿缓存的
    return APP.request({
      path:"/my/detail",
    }).then(res=>{
      let dataDeta=JSON.stringify({...res});
      wx.setStorageSync("dataDeta",dataDeta);//存进缓存
      this.dispose(res)
    })
  },
  dispose(res){//数据处理
    let that=this,datas=this.data,base=res.base,census=datas.province.indexOf(base.birthplace),educValue=datas.education.indexOf(base.education),stature=datas.stature.indexOf(base.height),occupation=datas.occupation.indexOf(base.occupation);
    if(census!==-1) that.setData({"selects.census":census});//户籍
    if(educValue!==-1) that.setData({"selects.educValue":educValue});//学历
    if(stature!==-1) that.setData({"selects.stature":stature});//身高
    if(occupation!==-1) that.setData({"selects.occupation":occupation});//职业
    that.setData({
      name:base.nickname,
      sexValue:"男",
      birthValue:"1998-06-02",
      census:base.birthplace,
      placeValue:base.residence,
      educValue:base.education,
      statureValue:base.height,
      occupValue:base.occupation,
      phoneVlue:base.phone
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  nextE(){//下一步/完成
    this.requestE().then(res=>{
      wx.navigateTo({
        url: '/pages/datas/replenish/replenish',
      });
    })
   
  },
  noE(){//暂不填写
    
  },
  requestE(){
    let values=this.data,datas={
      person_id:APP.userInfo.id||123,
      age:values.ageValue,
      height:values.birthValue,
      salary:values.incomeValue,
      birthplace:values.censusValue,
      house:values.houseValue,
      education:values.educValue,
      mark:values.markValue
    }
    return APP.request({
      path:"/person/edit/loveCondition",
      method:"POST",
      data:datas
    })
  },
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