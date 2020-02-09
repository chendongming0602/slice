// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabCount:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        name:"推荐",
        url:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/t1.png",
        urlNo:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/t0.png"
      },
      {
        name:"广场",
        url:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/g1.png",
        urlNo:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/g0.png"
      },
      {
        name:"我的",
        url:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/w1.png",
        urlNo:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/slice/tab/w0.png"
      }
    ],
    count:1
  },
  attached(){
    this.setData({
      count: this.data.tabCount
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabEvent(e){
      let { index } = e.currentTarget.dataset
      this.setData({
        count:index
      },()=>{
        this.triggerEvent("tabIdex",index)
      })
    }
  }
})
