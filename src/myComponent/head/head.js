Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    is_back:{
      type:Boolean,
      value:false
    },
    custom_style:{
      type:String,
      value:''
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
    back(){
      wx.navigateBack()
    }
  }
})