// miniprogram/pages/datas/basics/basics.js
import datas from "../../../utils/datas.js";
const APP=getApp();
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
    isNext:true,
    name:"",
    phoneVlue:"",
    selects:{
      census:0,
      educValue:0,
      stature:0,
      occupation:0
    }
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
    this.setData({
      phoneVlue:value
    })
  },
  changeName(e){//昵称
    let {value}=e.detail;
    this.setData({
      name:value
    })
  },
  nextE(){//下一步/完成
    let that=this,reg=/^[a-zA-Z\d_]{5,}$/;

    that.isPhoneVlue=APP.eliminate(that.data.phoneVlue);
    that.isName=APP.eliminate(that.data.name);
    if(!that.isName||!that.isPhoneVlue||!reg.test(that.isPhoneVlue)) return APP.toastShow("请填写正确信息");//判断昵称和联系方式
    return 
    that.requestE().then(res=>{
      wx.navigateTo({
        url: '/pages/datas/mate/mate',
     });
    })
   
  },
  noE(){//暂不填写
    
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
  requestE(){
    let values=this.data,datas={
      person_id:APP.userInfo.person_id||123,
      nickname:values.name,
      sex:values.sexValue,
      birthday:values.birthValue,
      birthplace:values.census,
      residence:values.placeValue,
      education:values.educValue,
      height:values.statureValue,
      occupation:values.occupValue,
      phone:values.phoneVlue
    }
    return APP.request({
      path:"/person/edit/baseinfo",
      method:"POST",
      data:{
        ...datas
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let{come}=options,that=this,timeEnd=new Date().getFullYear()+"-01-01";
    that.setData({timeEnd});
    if(come) that.setData({isNext:false});
    that.before();
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