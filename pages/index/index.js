//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page: 1,
    jokeList: [],
    showMask: false, // 显示蒙版
    imcurImgObjgObj: {},
    scrollTop: 0,
    distance: 0,
    maskImgBaseWidth: wx.getSystemInfoSync().windowWidth,
    maskImgWidth: wx.getSystemInfoSync().windowWidth,
    scale: 1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.ajaxJokeList(data => {
      this.setData({ jokeList: data })
    });
  },
  onPullDownRefresh() {
    this.setData({ page: 1 })
    this.ajaxJokeList(data => {
      this.setData({ jokeList: data })
    });
  },
  onReachBottom() {
    wx.showLoading({
      title: '正在加载下一页...',
    });
    this.data.page ++
    this.ajaxJokeList(data => {
      wx.hideLoading();
      this.setData({ jokeList: this.data.jokeList.concat(data) })
    });
  },
  // onPageScroll(e) {
  //   if (this.data.showMask) {
  //     return false;
  //   }
  //   // this.setData({
  //   //   scrollTop: e.scrollTop
  //   // })
  // },
  ajaxJokeList(callback = () => {}) {
    let param = {
      page: Number.parseInt(this.data.page / 2) + 1,
      maxResult: 20
    };
    let urlTail = this.data.page % 2 === 1 ? 'gifJoke' : 'picJoke';
    // app.ajax.get("joke/img/text.php", data).then(res => {    
    app.ajax.get(urlTail, param).then(res => {
      // let data = res.result.data;
      let data = res.showapi_res_body.contentlist;
      callback(data);
    })
  },
  showMask(e) {
    let imgObj = e.currentTarget.dataset.imgObj;
    this.setData({
      showMask: true,
      curImgObj: imgObj
    })
  },
  closeMask() {
    this.setData({
      showMask: false
    })
  },
  maskTouchMove(e) {
    if (e.touches.length === 1) { // 单手拖动
      return;
    } else if (e.touches.length === 2) { // 两指放大缩小图片
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      let distanceDiff = distance - this.data.distance;
      if (distance !== this.data.distance) {
        let scale = this.data.scale + 0.005 * distanceDiff;
        this.setData({
          scale : scale < 1 ? 1 : scale,
          distance: distance,
          maskImgWidth: this.data.maskImgBaseWidth * (scale < 1 ? 1 : scale)
        })
      }
    }
  }
})
