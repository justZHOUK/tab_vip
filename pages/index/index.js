var app = getApp();
Page({
   data: {
    nickName:'',
    avatar:'',
  },
  onLoad(query) {
    // 页面加载
   
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  getcode(){
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        console.log(res)
      },
    });
  },


onGetAuthorize(res) {
     my.getOpenUserInfo({
      fail: (res) => {
      },
      success: (res) => {
        let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
        console.log(res)
      }
    });
},

  onReady() {
    // 页面加载完成
  },
  onShow() {
     let this_ = this
    app.getuser_info().then(function(res){
      this_.setData({nickName:res.nickName,avatar:res.avatar})
      console.log(res)
    })
    
  },

  
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
