require(['./config'], () => {
  require(['template','url','header','footer','bootstrap','zoom','fly'], (template,url,header) => {
    
    class Detail{
      constructor(){
      // console.dir($)
        this.get_detail().then(()=>{
          this.rendDeatli()
          this.zoom()
          this.addTocrat()
        })
        
      }
    //  页面渲染
      get_detail(){

       const id = Number(window.location.search.slice(4))
      //  console.log(id)
       return new Promise(resolve=>{


        $.get(`${url.shopUrl}/239112/detail`,{ id },resp=>{
          // console.log(resp)
         if(resp.code == 200){
           const {detail} =resp.body

           this.detail={
             ...detail,
             id
           }
          //  console.log(resp)
           resolve()
         } 
        })
       })
      }
      //页面渲染
      rendDeatli(){
       
        var str =template("detail-content",{...this.detail})
        // console.log(str)
        $("#getdetail-content").html(str)
        $("#detail-images").html(template("detail-imgs",{...this.detail}))
        $("#detailShop").html(template("detail-shops",{...this.detail}))

      }
      // 放大镜效果
      zoom(){
        $('.img-zoom').elevateZoom({
          gallery:'gall'
        })
      }
// 加入购物车
      addTocrat(){
       
        $('#gouwuche').on('click',(e)=>{
        
          this.fly(e)
          //把详情数据存localstorage
        
          let cart = localStorage.getItem('cart')
          // 判断是否幼稚
          if(cart){
           
            cart =JSON.parse(cart)
            const isExist = cart.some(shop=>{
              return shop.id === this.detail.id
            })
            if(isExist){
              cart = cart.map(shop=>{
                if(shop.id==this.detail.id)shop.count++
                return shop
              })
            }else{
              cart.push({...this.detail,count:1,check:true})
            }
            // // if(){}
            // cart.push(this.detail)

            localStorage.setItem('cart',JSON.stringify(cart))


          //  console.log(cart)
          }else{
            localStorage.setItem('cart',JSON.stringify([{
              ...this.detail,
              count:1,
              check:true
            }]))

          }
          // console.log(shop.id)
          // console.log(this.detail.id)

        })
      }

       // 飞入购物车抛物线效果
       fly(e){
        $(`<img src="/images/1.jpg" style="width: 20px; height: 20px;border-radius: 50%">`).fly({
          start:{
            left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
            top: e.clientY,  //开始位置（必填）
          },
          end:{
            left: $('#shop_fly').offset().left - $(window).scrollLeft(), //结束位置（必填）
            top: $('#shop_fly').offset().top - $(window).scrollTop(),  //结束位置（必填）
            // width: 0, //结束时宽度
            // height: 0, //结束时高度
          },
          speed: 1.2, //越大越快，默认1.2
          vertex_Rtop: 20, //运动轨迹最高点top值，默认20
          onEnd: function(){
           // 加入购物车成功重新调用一次header的计算数量的方法
           header.calcCartCount()
          
           this.destroy()
    
            // $('#shop_num').html($('#shop_num').html()-0+1)
  
          } //结束回调
        })
      }

    }
    new Detail()
  })
})
