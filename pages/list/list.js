const fetch = require('../../assets/js/sane');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: {}, //表示的是商品的分类
    shops: [], //商品循环的数组
    pageIndex: 0, //实现加载页面的开始数据
    pageSize: 20, //加载数据最多显示的数据
    totalCount: 0,  //所有的数据总和，初始化为0
    hasMore: true //用来判断如果加载的数据大于totalCount就不在显示加载的动画
  },

  loadMore () {
    let { pageIndex, pageSize, searchText } = this.data //这里运用了es6的对象赋值
    const params = { _page: ++pageIndex, _limit: pageSize }
    if (searchText) params.q = searchText

    return fetch(`/categories/${this.data.category.id}/shops`, params)
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch(`/categories/${options.cat}`) //这里运用了es6的字符串拼接
      .then(res => {
        this.setData({ category: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })

        this.loadMore()
      })
      console.log(options); //就是前面index页面传进来的的参数
  },
  onReady: function () {
      if(this.data.category.name){
        wx.setNavigationBarTitle({ title: res.data.name })
      }
    },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    // TODO：节流
    this.loadMore()
  },

  searchHandle () {
    // console.log(this.data.searchText)
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
  },

  showSearchHandle () {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle () {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle () {
    this.setData({ searchText: '' })
  },
  searchChangeHandle (e) {
    this.setData({ searchText: e.detail.value })
  }
})
