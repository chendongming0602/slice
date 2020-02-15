// components/album/album.js
const APP=getApp();
let time1=null,time2=null;
import gfs from "../../utils/gfs.js";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasHeight: 0,
    isShow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isShowE(e){
      let that=this;
      if(e==="a"){
        if(!that._urls){
          that._count=6;
        }else{
          that._count=6-that._urls.length;
        }
      }
      console.log(that._count)
      that.setData({isShow:false});
    },
    closeIsAllAlbum(){
      this.setData({isShow:true});
    },
    // 压缩图片，当图片超过1mb时
    compressImage(temp) {
      let pmi=null;
      if (temp.size > 100000) {
        APP.loadShow("图片压缩中~",false);
        pmi=  new Promise((reslove)=>{
            wx.getImageInfo({
              src: temp.path,
              success: res => {
                let { width, height } = res,
                  ctx = wx.createCanvasContext('compress', this);
                height = height * (750 / width);
                ctx.height = height;
                // 可能它渲染还需要等一下
                this.setData({
                  canvasHeight: height
                }, () => {
                  time1=setTimeout(() => {
                    ctx.drawImage(temp.path, 0, 0, 750, height);
                    ctx.draw(false, () => {
                      // 据说某些机型需要等待
                      time2=setTimeout(() => {
                        wx.canvasToTempFilePath({
                          canvasId: 'compress',
                          fileType: 'jpg',
                          quality: 0.5,
                          destWidth: 750,
                          destHeight: height,
                          success: res => {
                            console.log(777)
                            reslove(res.tempFilePath)
                          },
                          fail:err=>{
                            APP.toastShow("压缩失败...")
                          }
                        },this);
                      }, 500);
                    });
                  }, 500);
                });
              },
              fail:err=>{
                APP.toastShow("压缩失败...")
              }
            });
          })
        
      
        // wx.showLoading({title: '正在压缩图片', mask: true});

      } else {
        pmi=Promise.resolve(temp.path)
      }
      return pmi
    },
    albumHandler(){//相册
      let that=this;
      wx.chooseImage({
        count:this._count,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: res => {
          that._temps=res.tempFiles;
          this.triggerEvent("returnImg",{urls:that._temps})
          if(this.isImg()) return APP.toastShow("请选择图片类型~");
          that.reduce();
        }
      });
    },
    reduce(){
      let arr1=[],arr2=[],that=this;
      that._temps.map((t)=>{
        arr1.push(this.compressImage(t)) 
      });
      Promise.all(arr1).then(res=>{//同步压缩
        that._urls=res;
        res.map(t=>{
          arr2.push(gfs.isAlbumGF(t))
        });
        Promise.all(arr2).then(res=>{//同步微信审核
         console.log(that._urls)
        }).catch(err=>{//审核不通过
          console.log(err,444)
        })
      })
    },
    isImg(){//判断是否是图片类型
      let reg= /\.(png|jpg|jpeg)(\?.*)?$/,isJpg=this._temps.map(t=>{
       return reg.test(t.path)
      }).some(t=>!t);
      return isJpg;
    }
  }
})
