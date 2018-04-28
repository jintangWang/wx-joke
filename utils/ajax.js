// const globalUrl = "http://v.juhe.cn/";
const globalUrl = "https://ali-joke.showapi.com/";

function catchCb(error) {
  console.log(error)
  wx.showToast({
    icon: "none",
    title: "错误代码：" + error.statusCode,
  })
}

const param = {
  // key: "7e69e71b2fe39a230367f65d590ceb6c" // 聚合key
}

function get(url, data) {
  return new Promise(function(resolve, reject) {
    wx.request({
      method: "GET",
      data: Object.assign({}, param, data),
      url: globalUrl + url,
      header: { 
        'Content-Type': 'json; charset=utf-8',
        'Authorization': 'APPCODE 9bfb10d6d2984da0bdcb016411a8d7b9'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: function(res) {
        reject()
      }
    })
  }).catch(catchCb)
}

function post(url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: globalUrl + url,
      data: data,
      header: {
        'Content-Type': 'json; charset=utf-8',
        'Authorization': 'APPCODE 9bfb10d6d2984da0bdcb016411a8d7b9'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: reject
    }).catch(catchCb)
  })
}

module.exports = {
  get,
  post
}