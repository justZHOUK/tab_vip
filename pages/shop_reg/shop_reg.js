const app = getApp();
const api_url = app.globalData.api_url;
Page({
  data: {
    code_btn_name:'获取验证码',
    time:60,
    disabled:false,
    loading:false,
    shop_name:'', // 店铺名称
    name:'', // 姓名
    phone:'', // 手机号
    code:'',  // 验证码
    address:'',  // 地址
    longitude:'',  // 经度
    latitude:'',  // 维度
    province:'', 
    city:'',
    district:'',
    default_img1:app.globalData.api_url+'static/alipay/images/img.png',
    default_img2:app.globalData.api_url+'static/alipay/images/img.png',
    mt:'',  // 门头照片
    md:'',  // 店内照片
  },
  onLoad() {
    var this_ = this
    my.getStorage({
      key: 'user_id', // 缓存数据的key
      success: (res) => {
        var user_id = res.data
        console.log(user_id)
        my.request({
          method:'POST',
          data:{user_id:user_id},
          url: api_url+'alipay/ck_reg',
          success: (res) => {
            console.log(res)
            if(res.data.st == '已通过'){
                my.alert({
                  title: '您的店铺已经通过审核' 
                });
            }else if(res.data.st == '待审核'){
              my.navigateTo({url:'../register_weit/register_weit'});
              return false
            }
          },
        });
      },
    });
    
   
    // my.alert({
    //   title:'注册提醒',
    //   content:'请确保您当前是在您自己的店铺前注册',
    //   success: (res) => {
    //     return true
    //   },
    // });

    // 获取定位
    my.getLocation({
      type:2,
      success(res){
        var address = res.province+res.city+res.district+res.streetNumber.street+res.streetNumber.number
        this_.setData({
          address:address,
          longitude:res.longitude,
          latitude:res.latitude,
          province:res.province,
          city:res.city,
          district:res.district
          })
      }
    });// 获取定位ending
  },



   // 获取店铺名称
  get_shop_name(e)
  {
    this.setData({shop_name:e.detail.value})
  },
  // 获取手机号
  get_phone(e)
  {
    this.setData({phone:e.detail.value})
  },
  // 获取姓名
  get_name(e)
  {
    this.setData({name:e.detail.value})
  },

  // 获取地址
  get_address(e)
  {
    this.setData({address:e.detail.value})
  },
  // 获取验证码
  get_code(e)
  {
    this.setData({code:e.detail.value})
  },
 

  // 发送短信验证码
  sendMsg()
  { 
   if(!this.checkPhone(this.data.phone)){
     my.alert({'title':"手机号码有误，请重填"})
     return false
   }
   this.setData({disabled:true,loading:true})
   my.request({
     url: app.globalData.api_url+'alipay/send_msg',
     method:'POST',
     data:{phone:this.data.phone},
     success: (res) => {
       console.log(res)
     },
   });
   this.setData({loading:false})
   this.timeout()
  },
  // 发送短信验证码ending


  // 设置倒计时60s
  timeout()
  {
    this.data.time--
    if(this.data.time <=0 ){
      this.setData({disabled:false,loading:false,time:60,code_btn_name:'重新获取'})
      return false
    }
    var this_ = this
    setTimeout(function(){
        
        this_.setData({code_btn_name:this_.data.time+'s'})
        this_.timeout()
    },1000);
  },
  // 设置倒计时 ending


  // 选择门头照片
  choose_img1()
  {
    var this_ = this
    my.chooseImage({
      success: (res) => {
        var filePath = res.apFilePaths[0]
        my.uploadFile({
          url: 'https://main.tnxls.vip/alipay/upload_img', // 开发者服务器地址
          filePath: filePath, // 要上传文件资源的本地定位符
          fileName: 'mt', // 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          fileType: 'image', // 文件类型，image / video / audio
          success: (res) => {
            if(res){
              this_.setData({
              mt:JSON.parse(res.data).name,
              default_img1:filePath
              })
            }else{
              my.alert({'title':'上传出错'})
            }
          },
        });
        
      },
    });
  },
  // 选择门头照片 ending

  // 选择店内照片
  choose_img2()
  {
    var this_ = this
    my.chooseImage({
      success: (res) => {
        var filePath = res.apFilePaths[0]
        my.uploadFile({
          url: 'https://main.tnxls.vip/alipay/upload_img', // 开发者服务器地址
          filePath: filePath, // 要上传文件资源的本地定位符
          fileName: 'mt', // 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          fileType: 'image', // 文件类型，image / video / audio
          success: (res) => {
            if(res){
              this_.setData({
              md:JSON.parse(res.data).name,
              default_img2:filePath
              })
            }else{
              my.alert({'title':'上传出错'})
            }
            
          },
        });
        
      },
    });
  },
  // 选择店内照片 ending


  // 检查手机号
  checkPhone(phone){ 
    if(!(/^1[345789]\d{9}$/.test(phone))){   
      return false; 
    }else{
		  return true;
	  }
  },
  // 检查手机号ending

  // 注册
  register(e)
  {

    if(this.data.shop_name == ''){
      my.alert({'title':'店铺名称不能为空'})
      return false
    } 
    if(this.data.name == ''){
      my.alert({'title':'姓名不能为空'})
      return false
    }
    if(!isNaN(this.data.name)){
      my.alert({'title':'姓名不能为数字'})
      return false
    }
    if(this.data.phone == ''){
      my.alert({'title':'手机号不能为空'})
      return false
    }
    if(!this.checkPhone(this.data.phone)){
      my.alert({'title':'手机号填写错误'})
      return false
    }
    if(this.data.code == ''){
      my.alert({'title':'验证码不能为空'})
      return false
    }
    if(this.data.address == ''){
      my.alert({'title':'地址不能为空'})
      return false
    }
    if(this.data.mt == ''){
      my.alert({'title':'缺少门头照片'})
      return false
    }
    if(this.data.md == ''){
      my.alert({'title':'缺少店内照片'})
      return false
    }
    my.getStorage({
      key: 'user_id', // 缓存数据的key
      success: (res) => {
        var user_id = res.data
        var data = e.detail.value
        data.user_id = user_id
        my.request({
          url: api_url+'alipay/register',
          method:'POST',
          data:data,
          success: (res) => {
            // console.log(res)
            if(res.data.st){
              my.showToast({
                type: 'success',
                content: '注册成功，等待审核',
                duration: 3000,
                success: (res) => {
                  my.navigateTo({url:'../register_weit/register_weit'});
                },
              });
            }else{
              my.showToast({
                type: 'fail',
                content: res.data.errMsg,
                duration: 3000,
                success: (res) => {
                  
                },
              });
            }
          },
        });
      }
    });
    
    
    // console.log(e.detail.value)
  },
  // 注册ending



  

});
