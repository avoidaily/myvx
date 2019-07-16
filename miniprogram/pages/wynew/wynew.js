// pages/wynew/wynew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yule: [], // 云函数 娱乐
    // yulepic:[], //没有连接的
  },

  // 娱乐/国内
  loadMore() {
    // 0：提示数据加载框
    wx.showLoading({
      title: '加载中',
    });
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "yule",//云函数名称
      // 3：显示当前组件
    }).then(res => {
      console.log(res); //***/
      // 转为json文件
      var obj = JSON.parse(res.result);
      console.log(obj) //***

      // 创建空数组保存 拿到指定数组
      var yule = [];
      yule = obj.T1348648517839.concat(yule);
      // console.log(yule);  //将20个对象数组保存到data的yule[]
      // console.log(yule[1].url)

      // var arr1=[],
      // arr1=yule.splice(1,6);  //开始 个数
      // // console.log(arr1);
      // // console.log(yule);

      // var arr2 = [],
      // arr2=yule.splice(4,1);
      // // console.log(arr2);
      // // console.log(yule);
      // // arr1=arr1.concat(arr2);
      // // console.log(arr1);
      
      // var arr3 = [],
      // arr3=yule.splice(8,1);
      // // console.log(arr3);
      // // console.log(yule);
      // // arr1 = arr1.concat(arr3);
      // // console.log(arr1);
      
      // var arr4 = [],
      // arr4=yule.splice(11,1);
      // // console.log(arr4);
      // // console.log(yule);
      // // arr1 = arr1.concat(arr4);
      // // console.log(arr1);

      // var yulepic=[];
      // yulepic = yulepic.concat(arr1);

      this.setData({
        yule: yule,
        // yulepic: yulepic,
      });
      // console.log(yulepic); //*** 11 pic
      console.log(yule); //***  6 url
      // 5：隐藏加载框
      wx.hideLoading();  //加载进来
    }).catch(err => {
      console.log(err);
    })
  },

  // 跳转详情
  yulejump(e) {
    var url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: `/pages/ex3/ex3?url=` + url,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();//调用
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})