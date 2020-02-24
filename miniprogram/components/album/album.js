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
      let that=this,{clas,index,entrance}=e;
      that._entrance=entrance;
      that._index="";
      if(clas==="a"){
        if(!that._urls){
          that._count=6;
        }else{
          that._count=6-that._urls.length;
        }
      }else{
        that._count=1;
        that._index=index;
      }
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
          that.closeIsAllAlbum();
          if(that._entrance){//修改
            console.log("修改")
          }else{
            if(that._index!==""){//替换(第一次进入)
              that._urls[that._index].path=res.tempFiles[0].path;
            }else{//添加
              if(!that._urls){
                that._urls=res.tempFiles;
              }else{
                res.tempFiles.map(t=>{
                  that._urls.push(t)
                });
              };
            };
          }
          
          that.triggerEvent("returnImg",{urls:that._urls});
          // if(that.isImg()) return APP.toastShow("请选择图片类型~");
          // that.reduce();
        }
      });
    },
    reduce(elents){
      let arr1=[],arr2=[],that=this,arr3=[];
      that._urls.map((t)=>{
        arr1.push(this.compressImage(t)) 
      });
       Promise.all(arr1).then(res=>{//同步压缩
        res.map(t=>{
          arr2.push(gfs.isAlbumGF(t));
          arr3.push(APP.uploadFile({
            path:"/person/edit/photo",
            data:t,
            ids:{
              person_id:123
            }
          }));
        });
        Promise.all(arr2).then(res=>{//同步微信审核
          console.log(8888)
           Promise.all(arr3).then(res=>{
            elents(res)
            //  console.log(res)
           })
        }).catch(err=>{//审核不通过
          console.log(err,444)
        })
      });
    },
    isImg(){//判断是否是图片类型
      let reg= /\.(png|jpg|jpeg)(\?.*)?$/,isJpg=this._temps.map(t=>{
       return reg.test(t.path)
      }).some(t=>!t);
      return isJpg;
    }
  }
})
