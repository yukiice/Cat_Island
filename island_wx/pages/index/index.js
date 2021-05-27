import {Base64} from 'js-base64'
Page({
  onGetToken() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: "POST",
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              console.log(res.data);
              const code = res.statusCode.toString()
              if (code.startsWith('2')) {
                wx.setStorage({
                  data: res.data.token,
                  key: 'token',
                })
              }
            }
          })
        }
      }
    })
  },
  verifyToken(){
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method:'POST',
      data:{
        token:wx.getStorageSync('token')
      },
      success:(res)=>{
        console.log(res);
      }
    })
  },

  // 获取最大值
  getBig(){
    wx.request({
      url: 'http://localhost:3000/v1/classic',
      method:'GET',
      success:(res)=>{
        console.log(res);
      },
      header:{
       Authorization:this._encode()
      }
    })
  },
  _encode(){
    const token = wx.getStorageSync('token')
    const base64  = Base64.encode(token+':')
    return 'Basic ' + base64
  }
})