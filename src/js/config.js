require.config({
    baseUrl: '/',
    paths: {
      // 配置模块短名称，以后再引入模块的时候直接写短名称而不需要写完整路径了，这里配置的时候一定不能写后缀名
      'jquery': 'libs/jquery/jquery-3.4.1.min',
      'header': 'js/modules/header',
      'footer': 'js/modules/footer',
      'template': 'libs/art-template/template-web',
      'bootstrap': 'libs/bootstrap/js/bootstrap.min',
      'url':'js/modules/url',
      'zoom':'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
      'fly':'libs/jquery-plugins/jquery.fly',
      'register':'js/register.js',
      'utils':'/libs/utils/utils',
     'swiper':'/libs/swiper/js/swiper.min',


    },
    shim:{
      'bootstrap': {
        deps: ['jquery']
      },
      'zoom':{
        deps: ['jquery']
      },
      'fly':{
        deps: ['jquery']
      },
      
     
    }
})
  