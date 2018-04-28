// pages/bookstore/bookstore.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    jokeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ajaxJokeList(data => {
      this.setData({ jokeList: data })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ page: 1 })
    this.ajaxJokeList(data => {
      this.setData({ jokeList: data })
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载下一页...',
    });
    this.data.page++
    this.ajaxJokeList(data => {
      wx.hideLoading();
      this.setData({ jokeList: this.data.jokeList.concat(data) })
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  ajaxJokeList(callback = () => { }) {
    let data = {
      page: 1,
      maxResult: 20
    };
    // app.ajax.get("joke/img/text.php", data).then(res => {    
    app.ajax.get("textJoke", data).then(res => {
      // let data = res.result.data;
      let data = res.showapi_res_body.contentlist.map(item => {
        item.text = this.filterText(item.text);
        return item;
      });
      callback(data);
    })
  },
  filterText(text) {
    return text.replace(/<.+>/g, '');
  }
})