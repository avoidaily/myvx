// pages/home/home.js

// 1:初始化数据库  获取数据库的引用
const db = wx.cloud.database({
  // 多个环境时，要切换 环境id
  env: 'xiong-web-01-by7i4'
})

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    auto:[],  // newlist云函数，home 要闻
    tech: [],  
    money:[],
    sports:[],
    dy:[],
    template:[],  //tuijian 云函数， home 推荐
    videoList:[],  //video 云函数，home 视频
    videomore:[],
    videobest:[],


    // 下拉菜单
    list:[],
    active: 0,
    activeNames: ['1'],// 下拉菜单
    isOpen: false,// 声明变量 isOpen 来判断是否展开收起
    isFold: false,// 是否显示'展开' 默认不显示显示 
    // 轮播
    previousMargin:20,
    nextMargin:20,
    autoplay:true,
    interval:5000,
    duration:1000,
  },

  // 要闻
  loadMore() {
    // 0：提示数据加载框
    wx.showLoading({
      title: '加载中',
    });
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "newslist",//云函数名称
      // 3：显示当前组件
    }).then(res => {
      // console.log(res); //***
      // 转为json文件
      var obj = JSON.parse(res.result);
      // console.log(obj)

      // 保存 接口中的8个数组 
      var arr = obj.data;
      // console.log(arr.auto) // **********8个数组 查看其中一个*********

      // 创建空数组保存 拿到指定数组
      var auto = []; 
      var tech = []; 
      var money = [];
      var sports= [];
      var dy = [];

      auto=auto.concat(arr.auto); // 将数据拼接到空数组auto
      tech = tech.concat(arr.tech);
      money = money.concat(arr.money);
      sports = sports.concat(arr.sports);
      dy=dy.concat(arr.dy);

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
      // 5：隐藏加载框
      wx.hideLoading();  //加载进来
    }).catch(err => {
      console.log(err);
    })

  },

  // 推荐
  loadMore1() {
    // 0：提示数据加载框
    wx.showLoading({
      title: '加载中',
    });
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "tuijian",//云函数名称
      // 3：显示当前组件
    }).then(res => {
      // console.log(res); //***/
      // 转为json文件
      var obj = JSON.parse(res.result);
      // console.log(obj) //***

      // 创建空数组保存 拿到指定数组
      var template = [];
      template = obj.T1467284926140.concat(template);
      // console.log(template)  //将20个对象数组保存到data的template[]
      // console.log(template[1].url)
      this.setData({
        template: template.concat(template)
      });
      // console.log(template); //***
      // 5：隐藏加载框
      wx.hideLoading();  //加载进来
    }).catch(err => {
      console.log(err);
    })

    
  },

  // 视频
  loadMore2() {
    // 0：提示数据加载框
    wx.showLoading({
      title: '加载中',
    });
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "video",//云函数名称
      // 3：显示当前组件
    })
    .then(res => {
      // console.log(res); //***
      // 转为json文件
      var obj = JSON.parse(res.result);
      // console.log(obj) //***

      var arr = obj.result;
      // console.log(arr);//16个数组对象[{...},{...}]
      for (var key in arr){
        // console.log(arr);
        // console.log(arr[key].type);  //下标
        var text=[];
        if (arr[key].type=="textCard"){
          text=key;
          // console.log(text); //0 4 10
          arr.splice(text,1) //一次性删除指定下标
        }
      }
      // console.log(arr); //13个[]
      // 创建空数组保存 拿到指定数组
      var videoList = [];  //用于保存13个视频
      // console.log(arr); //去除0,4,10，剩余有视频的
      videoList = videoList.concat(arr);  //13个

      this.setData({
        videoList: videoList, // 保存到data中的videoList[]
        // videoList: videoList.slice(0,5), 
      });
      // console.log(videoList); //***
      // 5：隐藏加载框
      wx.hideLoading();  //加载进来
    }).catch(err => {
      console.log(err);
    })
  },

  // 视频2
  loadMore3() {
    // 0：提示数据加载框
    wx.showLoading({
      title: '加载中',
    });
    // 1：调用云函数
    wx.cloud.callFunction({
      // 2：将云函数返回电影列表保存
      name: "videoo",//云函数名称
    }).then(res => {
        // console.log(res); //***
        // 转为json文件
        var obj = JSON.parse(res.result);
        // console.log(obj) //***

        var arr = obj.result;
        // console.log(arr);//10个数组对象[{...},{...}]
        // 创建空数组保存 拿到指定数组
        var videomore = [];  //用于保存10个视频
        videomore = videomore.concat(arr); 
        // console.log(videomore);
        this.setData({
          // videomore: videomore, // 保存到data中的videoList[]
          videomore: videomore.slice(0,5),
        });
      // console.log(videomore); //***
      // 5：隐藏加载框
      wx.hideLoading();  //加载进来
      }).catch(err => {
        console.log(err);
      })

  },

  // 视频3
  // loadMore4() {
  // 0：提示数据加载框
  // wx.showLoading({
  //   title: '加载中',
  // });
  //   // 1：调用云函数
  //   wx.cloud.callFunction({
  //     // 2：将云函数返回电影列表保存
  //     name: "videooo",//云函数名称
  //   }).then(res => {
  //     // console.log(res); //***
  //     // 转为json文件
  //     var obj = JSON.parse(res.result);
  //     // console.log(obj) //***

  //     var arr = obj.result;
  //     // console.log(arr);//11个数组对象[{...},{...}]
  //     // 创建空数组保存 拿到指定数组
  //     var videobest = [];  //用于保存11个视频
  //     videobest = videobest.concat(arr);
  //     // console.log(videobest);
  //     this.setData({
  //       videobest: videobest, // 保存到data中的videobest[]
  //     });
  //     // console.log(videobest); //***
  //      // 5：隐藏加载框
  //      wx.hideLoading();  //加载进来
  //   }).catch(err => {
  //     console.log(err);
  //   })

  // },
  

  // 下拉菜单的点击展开或收起
  onChange() {
    this.setData({
      isOpen: this.data.isOpen ? false : true
    })
  },
  // 跳转至指定id栏目
  jumpChannel(e){
    var id = e.target.dataset.channelid
    // 带返回的跳转
    wx.navigateTo({
      url: '/pages/newsChannel/newsChannel?id=' + id,  //home接收参数  生命周期onload
    })
  },
  // 要闻：跳转详情
  jump(e){
    console.log(e);
    var link = e.currentTarget.dataset.link;
    console.log(link)
    wx.navigateTo({
      url: `/pages/ex/ex?link=`+ link,
    })
  },
  // 推荐：跳转详情
  jumptwo(e){
    console.log(e);
    var url = e.currentTarget.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: `/pages/ex2/ex2?url=` + url,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();//调用
    this.loadMore1();//调用
    this.loadMore2();//调用
    this.loadMore3();//调用
    // this.loadMore4();//调用

    // *****下拉菜单*****
    let _that = this; // 一定要先存this，避免在回调中设置data时报错
    let query = wx.createSelectorQuery();
    query.select('.wap-section').boundingClientRect();
    query.exec(function (rect) {
      if (rect[0] === null) {
        return
      } else if (rect[0].height > 160) { // 自定义一个边界高度
        _that.setData({
          isFold: true
        })
      }
    });



    // // 2:操作一个集合，collection 方法 需先获取它的引用。
    // // 往集合 wangyi 添加一条json数据。在云开发控制台打印查看是否添加成功
    // const lists = db.collection('wangyi')
    // lists.add({
    //   data: {
    //     // 下拉菜单内容
    //    list: ["新闻","娱乐","体育","财经","图片","汽车","星闻","军事","直播","视频","科技","手机","数码","本地","网易","段子","时尚","跟帖","游戏","教育","课程","健康","旅游","亲子","艺术","双创","房产","家居",
        // ],
    //     // 轮播图+标题
    //     newIntr:[
    //       {"item":"习近平同保加利亚总统拉德夫会谈",
    //       "img": '/images/banner01.jpg'
    //       },
    //       {"item":"中国好，世界才更好——新中国70年世界贡献的历史逻辑",
    //       "img": '/images/banner02.jpg'
    //       },
    //       {"item":"漫画《过早介入》",
    //         "img": '/images/banner03.jpg'
    //       },
    //       {"item":"图解丨乡村迸发新活力 晒晒产业振兴的亮眼成绩单",
    //         "img": '/images/banner04.jpg'
    //       },
    //       {"item":"祝贺！中国再添一处世界遗产",
    //         "img": '/images/banner05.jpg'
    //       }
    //     ],
    //   },
    //   success: function (res) {
    //     console.log(res._id)  //插入成功
    //   }
    // });


    // 3.1：读取数据： 现在读取数据库中刚刚插入的一条数据，doc就是对应的id的值。
    // 创建一个变量_this来保存页面page示例中的this, 方便后续使用
    // var _this = this;
    db.collection('wangyi').get({
      success: res => {
        // console.log(res.data); //[{...}]
        //拿到res.data之后，要赋值给page实例里面的data
        // 所以在page示例中data里面设置一个默认的空数组list:[]
        // 打印一下this, 看是不是page示例
          // console.log(_this);
          this.setData({
            list:res.data[0].list,  //坐标0 => 插入的数据
            newIntr:res.data[0].newIntr, //同
        })
      }
    })



    // 3.2：读取多条数据 ：要读取多条数据时，就在获取集合后添加where判断。
   
    // lists.where({
    //   _openid: 'oVCMd5NRcXUF0Pkf51A--5zEcyuY'
    // }).get({
    //   success: function (res) {
    //     console.log(res.data); //res.data :包含该记录的数据
    //     var list = this;//把this对象复制到临时变量list
    //     lists.setData({
    //       lists: res.data
    //       // 拿到数据进行文章列表视图渲
    //     })
    //     console.log(list);
    //   }
    // });





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