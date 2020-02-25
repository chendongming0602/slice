//app.js
import {config} from "./utils/config.js";

try{
  wx.cloud.init({
    // env: 'my-env-id',
    traceUser: true,
  });
}catch(err){}

App({
  userInfo:{//用户信息
    person_id:undefined
  },
  onLaunch: function () {
    this.getUserPic();
  },
  eliminate(text,is=false){//清除两边空格
    text.toString().trim();
    if(text.toString().trim().length>0||is) return text.toString().trim();
    return false
  },
  getUserPic(){//授权请求
    return new Promise((resolve,reject)=>{
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("用户授权")
            //this.userInfo.isPower = true;//已经授权
      ///////////////////////////////////
            // console.log(this.userInfo.isPower)
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            /////////////////////////////////////////////////////////
             //this.userLogin().then(resolve);//登录函数
          } else {
            console.log("app: " + "用户暂时未授权")
            resolve()
          };
          
        }
      });
    })
     
  },
  userLogin(){//登录请求
    let _this=this
    return new Promise((resolve, reject)=>{
      wx.login({
        success: res => {
          let codes=res.code
          wx.getUserInfo({
            success:(res)=> {
              _this.request({
                path: "/user/wxapp/login",
                method: "POST",
                data: {
                  code: codes,
                  simple: false,
                  ...res
                }
              }).then(res => {
                //_this.isCallback = true;//告诉主页登录成功
               
                // console.log("用户信息", res)
                _this.openids=res.openid
                _this.userInfo = {
                  isPower: true,
                  ...res
                };
                wx.setStorage({//缓存token
                  key: "tokens",
                  data: res.token
                });
                try{
                  wx.aldstat.sendOpenid(res.openid);
                }catch(err){
                  console.log("阿拉丁记录问题！",err);
                }
                resolve();
                }).catch(reject);
            },
            fail: reject

          });


        },
        fail: reject
      });
    });
  },
  request({ path = '/', method, data }) {//封装的请求
    // let tokens="";
    // try{
    //   tokens = wx.getStorageSync("tokens");
    // }catch(err){
    //   console.log("获取缓存token失败",tokens)
    // }
    return new Promise((resolve, reject) => {
      const headers = {
        // "XX-Wxapp-AppId": config.appid,
        // "XX-Token": tokens ? tokens:'',
        // "XX-Api-Version": config.version,
        // "XX-Device-Type": config.deviceType
        "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb24iOnsiaWQiOjEsIm5pY2tuYW1lIjoiXHU1ZjIwXHU1ZjIwIn0sInVzZXJJZCI6MX0.hR9aTGOgOeL0tV082KMt1dS7dTcWGqQbs9OnFw1TqE8"
      };
      wx.request({
        url: `${config.apiHost}${path}`,
        method: method || 'GET',
        header: headers,
        data: data || {},
        success: res => {
          let data=res.data;
          if (data.code === 1 || res.statusCode===200){
            if (data.code === 10001) {
              this.userLogin();//重新登录
            }else{
              resolve(data.data)
            }
          }else if(res){
            reject(res)
          }else{
            wx.toastShow({
              title: '小程序开启失败',
              icon: "none"
            });
          }
        },
        fail: reject
      });
    });
  },

  uploadFile({ path = "/", data, ids={},}){
    // let tokens = "";
    // try {
    //   tokens = wx.getStorageSync("tokens");
    // } catch (err) {
    //   console.log("获取缓存token失败", tokens)
    // };
    const headers = {
      "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb24iOnsiaWQiOjEsIm5pY2tuYW1lIjoiXHU1ZjIwXHU1ZjIwIn0sInVzZXJJZCI6MX0.hR9aTGOgOeL0tV082KMt1dS7dTcWGqQbs9OnFw1TqE8"
    };
    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: `${config.apiHost}${path}`,
        filePath: data,
        name: 'file',
        header:headers,
        formData:ids,
        success:res=>{
          if (res.statusCode===200){
            resolve(res.data)
          }else{
            reject();
          }
        },
        fail: reject
      })
    })
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
