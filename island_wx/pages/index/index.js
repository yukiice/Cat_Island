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
  }
})