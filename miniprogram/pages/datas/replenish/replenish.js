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
    markValue:"",//更多
    selects:{
      income:0,
      condition:0,
      house:0,
    }
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
    let {urls}=e.detail,that=this,urls2=[...urls],urls3=[...urls],dataUrl=[...this.data.urls];
    urls2.forEach(t=>{//切换和接口一样
      t.url=t.path;
      t.id=""
    });
    
    if(this._entrance){//修改进来添加
      this._Hurl=[...this._Hurl2];
      dataUrl=this._Hurl.concat(urls2);
      for(var i=0;i=6-dataUrl.length;i++){
        dataUrl.push({id:"",url:""})
      };
      this.setData({urls:dataUrl})
    }else{
      for(var i=0;i<6-urls3.length;i++){
        urls2.push({id:"",url:""})
      }
      that.setData({urls:urls2});
    }
  },
  addE(){//添加按钮
    // this.selectComponent('#album').isShowE({clas:"a"});
    let enUrl=[...this.data.urls],entranceCount=6;
    enUrl.map(t=>{//还可以加多少张
      if(t.url){
        entranceCount--
      }
    });
    this.selectComponent('#album').isShowE({clas:"a",entrance:this._entrance,entranceCount});
    //clas=是添加还是替换；entrance=修改资料；entranceCount=添加图片的数量
  },
  changeAlbum(e){//替换
    let {index,id}=e.currentTarget.dataset;
    if(this._entrance&&id==="") index=index-this._Hurl2.length;//如果替换的是刚刚选泽的（将下标减去之前的已经有的照片）
    this.selectComponent('#album').isShowE({clas:"t",index,id});
  },
  changeUrl(e){//修改替换反回来的的值
    let {url,index}=e.detail;
    let mb=`urls[${index}].url`
    this.setData({
      [mb]:url[0].path
    })
  },
  nextE(){//完成
    this._markValue=APP.eliminate(this.data.markValue,true);//只清楚两边空格
    this.selectComponent("#album").reduce((res)=>{
      console.log(res)
    });
    // this.requestE();
  },
  before(){
    if(wx.getStorageSync("dataDeta")) return this.dispose(JSON.parse(wx.getStorageSync("dataDeta")));//有缓存，拿缓存的
    return APP.request({
      path:"/my/detail",
    }).then(res=>{
      console.log(res)
      let dataDeta=JSON.stringify({...res});
      wx.setStorageSync("dataDeta",dataDeta);//存进缓存
       this.dispose(res)
    })
  },
  dispose(res){//数据处理
    let that=this,datas=this.data,extra=res.extra,income=datas.income.indexOf(extra.salary),condition=datas.condition.indexOf(extra.marital_status),house=datas.house.indexOf(extra.house),urls=[...res.album],urls2=[...res.album];
    this._Hurl=[...urls];
    this._Hurl2=[...urls];
      for(var i=0;i<6-urls2.length;i++){
        urls.push({
          id:"",
          url:""
        });
      }

      if(income!==-1) that.setData({"selects.income":income});//户籍
      if(condition!==-1) that.setData({"selects.condition":condition});//学历
      if(house!==-1) that.setData({"selects.house":house});//身高
      that.setData({
        incomeValue:extra.salary,
        conditionValue:extra.marital_status,
        houseValue:extra.house,
        markValue:extra.mark,
        urls
      });

      
  },
  requestE(){
    let values=this.data,datas={
      person_id:APP.userInfo.person_id||123,
      salary:values.incomeValue,
      marital_status:values.conditionValue,
      house:values.houseValue,
      mark:this._markValue
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
    let{come}=options;
    if(come) this.before();
    // this.setData({timeEnd});
    // this.before();
    // this._entrance=1
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