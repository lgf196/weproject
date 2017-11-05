const app = getApp() //注意这个不需要写的，不写的话，在其他的文件中不能应用
module.exports = (url, data, method = 'GET', header = {}) => {
    wx.showLoading({ title: 'Loading...' }) //注意这个是运用了微信的API
    return new Promise((resolve, reject) => { //注意这里运用了es6的Promise语法
      wx.request({
        url: app.config.apiBase + url, //注意这里进行了调用app.js的配置文件的内容
        data, //这里进行了es6简写的语法
        header,
        method,
        dataType: 'json',
        success: resolve,
        fail: reject,
        complete: wx.hideLoading //注意这个是运用了微信的API
      })
    })
  }
  