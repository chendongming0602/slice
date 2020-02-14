// components/tabTop/tabTop.js
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
    scroll:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabTop(e){
      let {index}=e.currentTarget.dataset,that=this;
      if(index==1){
        that.setData({scroll:true});
      }else{
        that.setData({scroll:false})
      };
      that.triggerEvent("tabTop",that.data.scroll)
    }
  }
})
