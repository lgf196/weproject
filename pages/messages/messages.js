Page({
  /**
   * 页面的初始数据
   */
  data: {
    messages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const messages = this.data.messages
    for (var i = 0; i < 18; i++) {
      messages.push({
        title: '免费送票！超有内涵的门票。',
        date: i + ' September',
        image: 'https://unsplash.it/400/300',
        summary: '最糟糕的，也许就是最幸运的。'
      })
    }

    this.setData({ messages })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    const query = wx.createSelectorQuery()
    query.select('#bottom').boundingClientRect()
    query.exec(res => wx.pageScrollTo({ scrollTop: res[0].top + 200 }))
  }
})
