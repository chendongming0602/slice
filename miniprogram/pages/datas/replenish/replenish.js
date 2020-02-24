// miniprogram/pages/datas/basics/basics.js
import datas from "../../../utils/datas.js";
const APP=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    income:datas.year,
    incomeValue:"",//收入
    house:[
      "有",
      "无"
    ],
    condition:[
      "单身",
      "已婚",
      "离异"
    ],
    houseValue:"",//婚房
    conditionValue:"",//状况
    urls:[
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    markValue:""
  },
  changeEduc(e){//是否有婚房
    let {value}=e.detail;
    this.setData({
      houseValue:this.data.house[value]
    });
  },
  changeStature(e){//收入
    let {value}=e.detail;
    this.setData({
      incomeValue:this.data.income[value]
    });
  },
  changeOccup(e){//婚姻状况
    let {value}=e.detail;
    this.setData({
      conditionValue:this.data.condition[value]
    });
  },

  textareaEvent(e){//更多择偶要求
    let {value}=e.detail;
    this.setData({markValue:value})
  },
  returnImg(e){
    let {urls}=e.detail,that=this,urlss=[...urls];
    urlss=urlss.map(t=>t.path);
    urlss.length=6;
    that.setData({urls:urlss})
  },
  addE(){//添加按钮
    this.selectComponent('#album').isShowE({clas:"a"});
  },
  changeAlbum(e){//替换
    let {index}=e.currentTarget.dataset;
    this.selectComponent('#album').isShowE({clas:"t",index});
  },
  nextE(){//完成
    this.selectComponent("#album").reduce((res)=>{
      console.log(res)
    });
    // this.requestE();
  },
  requestE(){
    let values=this.data,datas={
      person_id:APP.userInfo.id||123,
      salary:values.incomeValue,
      marital_status:values.conditionValue,
      house:values.houseValue,
      mark:values.markValue
    }
    return APP.request({
      path:"/person/edit/extraInfo",
      method:"POST",
      data:datas
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let timeEnd=new Date().getFullYear()+"-01-01";
    this.setData({timeEnd})
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