// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()



// 1:引入request-promise库
var rp = require("request-promise");
// 2：发送请求豆瓣电影详情
exports.main = async (event, context) => {
  // event：事件对象，可以获取指定的参数 ，传啥写啥
  //context：上下文对象，可以获得当前用户信息：openid、登录
  var url = `http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html` //请求地址   //精选
  return rp(url)
    .then(res => {  //请求成功回调
      console.log(res);  //只能日志控制台输出
      return res;        //将请求数据返回调用者
    }).catch(err => {  //请求失败回调
      console.log(err);
    })
}