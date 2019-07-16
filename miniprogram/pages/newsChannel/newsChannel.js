
Page({
  /**
   * 页面的初始数据
   */
  data: {
    channelid:[], //频道信息，调用接口
    // 滚动加载更多
    windowHeight: '800',//窗口高度
    page: 1,//页码
    flag: true,  //开关 true表示可以请求数据

    auto: [],  // newlist云函数，home 要闻
    tech: [],
    money: [],
    sports: [],
    dy: [],
    yule:[],

    // 专栏名称
    channelName: ["新闻频道"],
    // 顶部导航栏
    active: 0,
    title: ["首页", "国内", "国际","历史"],
    // 大图文字、轮播
    // 轮播
    autoplay: true,
    interval: 5000,
    duration: 500,
    newIntr: [],
    sectionFocus:[
      {
        "img":"/images/newsimg1.webp.jpg",
        "title":"半分钟一震!加州强震后小地震4700次"
      }, 
      {
        "img": "/images/newsimg2.webp.jpg",
        "title": "强降雨致福建泰宁严重内涝 灾情频发"
      },
      {
        "img": "/images/newsimg3.webp.jpg",
        "title": "深圳体育中心工地突然发生倾倒坍塌"
      },
    ],

  },

  // 要闻
  loadMore(){
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "newslist",//云函数名称
      // 3：显示当前组件
    })
    .then(res => {
      // console.log(res); //***
      // 转为json文件
      var obj = JSON.parse(res.result);
      // console.log(obj)

      // 保存 接口中的8个数组 
      var arr = obj.data;
      // console.log(arr);
      // console.log(arr.auto) // **********8个数组 查看其中一个*********

      // 创建空数组保存 拿到指定数组
      var auto = [];
      var tech = [];
      var money = [];
      var sports = [];
      var dy = [];

      auto = auto.concat(arr.auto); // 将数据拼接到空数组auto
      tech = tech.concat(arr.tech);
      money = money.concat(arr.money);
      sports = sports.concat(arr.sports);
      dy = dy.concat(arr.dy);

      // console.log(auto) // 打桩data中数组auto能否拿到数据
      // console.log(auto[0].link)//查看其中一项
      this.setData({
        // 重新赋值给 data的auto[],保存起来
        auto: this.data.auto.concat(auto),
        tech: this.data.tech.concat(tech),
        money: this.data.money.concat(money),
        sports: this.data.sports.concat(sports),
        dy: this.data.dy.concat(dy),
      });
      // console.log(this.data.auto) ; //***
    }).catch(err => {
      console.log(err);
    })

  },

  // 娱乐/国内
  loadMore2() {
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
      this.setData({
        yule: yule,
      });
      // console.log(yule); //***
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
  // 要闻：跳转详情
  jump(e) {
    console.log(e);
    var link = e.currentTarget.dataset.link;
    console.log(link)
    wx.navigateTo({
      url: `/pages/ex/ex?link=` + link,
    })
  },

  requestData(){
    this.setData({
      flag: false
    })

    var that = this;
    var api = 'https://www.apiopen.top/journalismApi';

    wx.request({
      url: api,
      data: {
        a: 'getPortalList',
        catid: '8',
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        if (res.data.data.auto.length < 8) {//请求到的数据length<20时候，表示已经是最后一页，关掉开关
          var f = false;
        } else {
          var f = true;
        }
        // res.data.result
        
        var auto = that.data.auto.concat(auto)
        var tech = that.data.tech.concat(tech)
        var page = ++that.data.page;
        that.setData({
          auto: auto,
          tech: tech,
          page: page,
          flag: f
        })
      }

    })

  },

  loadadd() {//出发加载更多
    if (this.data.flag) {
      this.requestData();
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收组件的传参
    console.log(options.id)
    // 1:接收电影列表传递参数id并且保存data
    this.setData({
      channelid: options.id
    });

    this.loadMore();//调用
    this.loadMore2();//调用
    
    this.requestData();
    //获取屏幕高度
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })

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