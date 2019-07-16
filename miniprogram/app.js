//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        // web-test-x-fz22m ：自动生成的环境id——控制台；切换环境时注意替换
        env: 'xiong-web-01-by7i4'
      })
    }

    this.globalData = {}
  }
})


