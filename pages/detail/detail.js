const fetch = require('../../assets/js/sane');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`/shops/${options.item}`)
    .then(res => {
      this.setData({ shop: res.data })
      wx.setNavigationBarTitle({ title: res.data.name })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.shop.name){
      wx.setNavigationBarTitle({ title: res.data.name });
    }
  },
  previewHandle (e) { //这个是自定义的函数
    wx.previewImage({ //这个是微信自带的api
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  }
})