// require(['../config'], () => {
//   console.log(5555)
//   require(['template','url'], (template,url) =>{

//     class Header {
//       constructor () {
//         // 需要每个方法各司其职
//         this.search()
//         this. calcCartCount()
        
//       }
     
//       search () {
//         console.log($('#input_search'))
//         $('#input_search').on('keyup', function () {
//           console.log($(this).val())
//           // TODO：拿到value值请求百度搜索的jsonp接口，完成功能
//         })
//       }

//       calcCartCount(){
//         let cart = localStorage.getItem('cart')
//         let count =0
//         if(cart){
//           cart = JSON.parse(cart)
//           count = cart.reduce((num,shop)=>{
//             return num += shop.count
//           },0)

//         }
//         $('#shopNum,#shop_num').html(count)
//         console.log($('#shopNum,#shop_num'))
//       }
//     }
//      return new Header()
//   })
    
 
//   })
  


























  
  define(['jquery','utils'], function(require, factory) {
    
    class Header {
      constructor () {
        // 需要每个方法各司其职
        this.loadHTML();
       
      }
      loadHTML () {
        // 把异步代码写成同步形式，套路就是 return new Promise
          $('header').load('/html/modules/header.html', ()=>{
            this.search()
            this. calcCartCount()
            this.cooki()
            this.navBlock()
            this.navScroll()
            this.scrollReturn()
         
            
          })
    
      }
      search () {
       
 console.log($.getJSON)
        $('#input_search').on('keyup', function () {
      
          var wd = $(this).val()
          // TODO：拿到value值请求百度搜索的jsonp接口，完成功能
      
      
          $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=&{wd}&cb=?'),resp=>{
            console.log(resp)
          }
        })
      
      }
// 购物车数量加加
      calcCartCount(){
        let cart = localStorage.getItem('cart')
        let count =0
        if(cart){
          cart = JSON.parse(cart)
          count = cart.reduce((num,shop)=>{
            return num += shop.count
          },0)

        }
        $('#shopNum,#shop_num').html(count)
        // console.log($('#shopNum,#shop_num'))
      }
// 通过登陆的页面传过来的数据在头部渲染
      cooki(){
    

        const unLogin = document.querySelector('#un-login')
         const isLogin = document.querySelector('#is-login')
         const nameB = document.querySelector('#name-b')
       const username = utils.getCookie('username')
      
        
        
        if (username) {
          unLogin.className = 'header-right-logg hide'
           isLogin.className = 'header-right-logg'
          nameB.innerHTML = username
        }
        
        document.querySelector('#logout').onclick = function () {
          if (confirm('确定要退出吗？')) {
            utils.setCookie('username', '', { path: '/', expires: -1 })
            unLogin.className = 'header-right-logg'
            isLogin.className = 'header-right-logg hide'
          }
        }


        

        
      }
//导航栏下拉菜单显示隐藏效果
      navBlock(){
        // console.log( $('#nav-phone,#shou_ye'))
        var ul= document.querySelector("#nav-phone ul")
      //  console.log(ul)
       $(ul).hide()
        $('#nav-phone,#shou_ye').hover(()=>{
          $(ul).stop().show(1000) 
        },()=>{
          $(ul).stop().hide(1000) 
        })
      }



   
// 导航栏吸顶效果
      navScroll(){
        onscroll = function(){
          var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
       if(scrollTop>=50){

         $('#header-nav').css('top','0').css('position','fixed').css('transition','all 2s').css('background','#fff').css('width','100%').css('z-index','6')
        $('.return').css('opacity','1').css('transition','all 2s')
       }else{
      $('#header-nav').css('top','45px').css('transition','all 2s').css('position','')
        $('.return').css('opacity','0').css('transition','all 2s')
       }
        }
      }
// 返回顶部效果
  scrollReturn(){
    $('.return').on('click',()=>{
   
      var time=setInterval(()=>{
        var top =document.documentElement.scrollTop || document.body.scrollTop;
        top >=0?document.documentElement.scrollTop -=30 : document.body.scrollTop -=30
    
      
        if(top == 0){
          clearInterval(time)
          }
      },30)
     

    })
  }



    }
   return new Header()
  })
  
