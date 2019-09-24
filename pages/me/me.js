var app = getApp();
Page({
  data: {
    nickname:'',
    avatar:'',
  },
  onLoad() {
    let this_ = this
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: (res) => {
            console.log(res)
            this_.setData({nickname:res.nickName,avatar:res.avatar})        
          },
        });
      },
    });
   

   
  },

  to_shop_reg()
  {
    my.navigateTo({url:'../shop_reg/shop_reg'});
  },

});
