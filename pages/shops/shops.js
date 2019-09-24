const app = getApp()
Page({
  data: {},
  onLoad() {
    app.get_location().then(function(res){
     console.log(res)
   })
  },
  
});
