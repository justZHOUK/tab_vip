App({

  globalData: {
    user_id: null,
    user_info: null,
    nickname: '',
    avatar: '',
    api_url: 'https://main.tnxls.vip/',
  },


  getuser_info() {
    return new Promise(function(resolve, reject) {
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          my.getAuthUserInfo({
            success: (res) => {
              resolve(res)
            },
          });
        },
      });
    })
  },


  get_location(){
    return new Promise(function(resolve, reject) {
        // 获取定位
    my.getLocation({
      type:2,
      success(res){
        resolve(res)
        // var address = res.province+res.city+res.district+res.streetNumber.street+res.streetNumber.number
        // this_.setData({
        //   address:address,
        //   longitude:res.longitude,
        //   latitude:res.latitude,
        //   province:res.province,
        //   city:res.city,
        //   district:res.district
        //   })
      }
    });// 获取定位ending
    })
  },


  onLaunch(options) {
    let this_ = this
    my.getStorage({
      key: 'user_id', // 缓存数据的key
      success: (res) => {
        if (!res.data) {  // 先从本地获取，没有的话再从后台获取
          this.save_user_id().then(function(res) {
          })
        } else {
          this_.globalData.user_id = res.data
        }

      }
    });
  },

  save_user_id() {
    let this_ = this
    return new Promise(function(resolve, reject) {


      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          console.log(res)

          my.request({
            url: 'https://main.tnxls.vip/alipay/get_user_id',
            method: 'post',
            data: { code: res.authCode },
            success: (res) => {
              console.log(res.data)
              if (res.data) {
                var user_id = res.data
                my.setStorage({
                  key: 'user_id', // 缓存数据的key
                  data: user_id, // 要缓存的数据
                  success: (res) => {
                    this_.globalData.user_id = user_id
                    resolve(user_id)
                  },
                });

              }
            },
          });
        },
      });
    })

  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
