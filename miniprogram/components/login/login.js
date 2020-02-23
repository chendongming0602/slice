// components/login/login.js
const APP=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    execute:{//根据父组件传来的值进行判断授权后需要做什么
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e){
      if (e.detail.rawData){//同意授权
        wx.showLoading({
          title: '登录中...',
          mask:true
        })
        APP.userLogin().then(res=>{//调用全局登录接口
          this.triggerEvent("loginEvent", this.data.execute);
          wx.hideLoading()
        }).catch(err=>{
          wx.hideLoading()
          console.log("登录失败,请重新登录",err)
        })
      }else{
        console.log(e)
        console.log("拒绝授权")
      }
    },
    lgNoBtn(){//关闭
      this.triggerEvent("noLogin")
    },
  }
})
