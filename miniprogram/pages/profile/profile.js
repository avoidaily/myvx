// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, // 弹出层
    checked: false,   // 开关单元格
  },

  // 设置右滑
  open() {
    this.setData({ show: true });
  },
 // 关闭弹出
  onClose() {
    this.setData({ show:false });

  },



  // 设置开关单元格
  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData(
      { checked: event.detail },
    );
  },
// 设置开关单元格
  Change(event) {
    // 需要手动对 checked 状态进行更新
    this.setData(
      { Change: event.detail },
    );
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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