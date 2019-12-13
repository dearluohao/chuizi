
require(['./config'], () => {
  require(['template','url','swiper','header','footer','bootstrap'], (template,url,Swiper) => {

    class Index{
      constructor(){
        this.getiamges()
        this.getshop()
       
        this.swiper()
      }
      getiamges(){

      
        $.get('/libs/json/homeCategory.json',resp=>{
          
          $('#shop-details-content').html(template('cateGoryTemplate', {  list: resp }))
        })
      }
      getshop(){
      
        $.get(`${url.shopUrl}/239112/shop`,resp=>{


             if (resp.code === 200) {
            const {list} = resp.body
            // 模板引擎里需要list字段，接口返回的数据正好也叫list，所以可以这么写
            $('#hotgoods-bottom').html(template('hotgoods-shop', { list }))
          }
       
        })
       
      }

      // 轮播图线上渲染
      // getImagesShow(){
      //   $.get(`${url.shopUrl}/239132/images`,resp=>{
      //     if(resp.code == 200){
      //       const { list } = resp.body
      //       console.log(list)
      //       // 模板引擎里需要list字段，接口返回的数据正好也叫list，所以可以这么写
      //       $('#slideshow-top').html(template('getImagesShow', { list }))
      //     }
      //     console.log(resp)
      //   })
      // }
      


  //  轮播图自动轮播   
swiper(){
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    speed: 1220,
   grabCursor: true,
    effect: "coverflow",
    keyboard: true,
    disablenOnInteraction:true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        
}

    }
    new Index()
  })
})

