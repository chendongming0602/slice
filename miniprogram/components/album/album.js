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
      let that=this,{clas,index,entrance,entranceCount,id}=e;
      that._entrance=entrance;
      that._index="";
      that._id="";
      that._count=entranceCount;
      if(clas==="t"){
        that._count=1;
        that._index=index;
        that._id=id;
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
        pmi=  new Promise((reslove,reject)=>{
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
                            reslove(res.tempFilePath)
                          },
                          fail:reject
                        },this);
                      }, 500);
                    });
                  }, 500);
                });
              },
              fail:reject
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
          that.judgeImg(res)
        }
      });
    },
    cameraHandler(){
      wx.chooseImage({
        count:this._count,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: res => {
          that.judgeImg(res)
        }
      });
    },
    judgeImg(res){
      let that=this;
      if(that.isImg(res.tempFiles)) return APP.toastShow("请选泽图片类型！")
      that.closeIsAllAlbum();
      if(that._id){//替换-已经有的
        that._idUrl=res.tempFiles;
        return that.reduce(()=>{
          that._id=""
          that.triggerEvent("changeUrl",{url:that._idUrl,index:that._index});
        });
      } 
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
      that.triggerEvent("returnImg",{urls:that._urls});
    },
    reduce(elents){//上传主函数
      let arr1=[],arr2=[],that=this,arr3=[],arr4=[];
      if(!that._urls&&!that._id) return elents("没动照片");
      if(that._id){//替换已经有的
        that._idUrl.map((t)=>{
          arr1.push(this.compressImage(t)) 
        });
      }else{
        that._urls.map((t)=>{
          arr1.push(this.compressImage(t)) 
        });
      }
       Promise.all(arr1).then(res=>{//同步压缩
        res.map(t=>{
          arr2.push(gfs.isAlbumGF(t));
          arr3.push(t);
        });
        Promise.all(arr2).then(res=>{//同步微信审核
          arr3.map(t=>{
            if(that._id){//替换之前的
              arr4.push(that.upRequest(1,t));
            }else{
              arr4.push(that.upRequest(0,t));
            }
          })
           Promise.all(arr4).then(res=>{//上传
            elents(res)
            //  console.log(res)
           }).catch(err=>{
            that._id=""
            APP.toastShow("图片上传失败！")
           })
        }).catch(err=>{//审核不通过
          that._id=""
          APP.toastShow("图片存在违规问题！")
        })
      }).catch(err=>{
        that._id=""
        APP.toastShow("图片压缩失败！")
      });
    },
    isImg(res){//判断是否是图片类型(true==不合格)
      let reg= /\.(png|jpg|jpeg)(\?.*)?$/,isJpg=res.map(t=>{
       return reg.test(t.path)
      }).some(t=>!t);
      return isJpg;
    },
    upRequest(e,t){//上传主要函数
      let ids={person_id:123},that=this;
      if(e) ids={person_id:123,photo_id:that._id}
      return APP.uploadFile({
        path:"/person/edit/photo",
        data:t,
        ids
      })
    }
  }
})
