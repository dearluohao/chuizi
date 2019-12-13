require(['./config'], () => {
    require(['template','header','footer'], (template) => {
      class Shopping{
        constructor(){
         
          this.renderTable()
          this.check_change()
        
          this.check_cose()
          this.delete()

          this.addBtn()
          this.all_btn()
        }
        renderTable(){
          let cart = localStorage.getItem('cart')
          // console.log(cart)
         
          if(cart){
            // console.log(110)
            //渲染
            // console.log( $('#cart-empty'))
            // console.log($('#shop_cont'))
            // console.log(template('srcShop',{cart}))

            this.cart = JSON.parse(cart)
            // console.log(template('srcShop',{cart}))

            $('#shop_cont').html(template('srcShop',{cart:this.cart}))
            $('#shopCose').html(template('shop_cose',{cart:this.cart}))
            this.serAllCose()
            this.calMoney()
          }else{
            $('#shopCose').html(template('shop_cose',{cart:this.cart}))
             $('#cart-empty').show()
            //  console.log(555)
            //  console.log( $('#cart-empty'))

          }
          //  this.serAllCose()
         
        }

    check_change(){
      // console.log($("#shop_cont input:checkbox"))
      const _this=this
      $("#shop_cont input:checkbox").on('change',function(){
        const id = Number($(this).parents('#shopping_quantity').attr('data_id'))
        // console.log(id)
    
// console.log(_this.cart)

        _this.cart = _this.cart.map(title => {
          // 把当前商品的check属性修改为当前选框的状态
          if (title.id === id) title.check = $(this).prop('checked')
          return title
        
        })


        localStorage.setItem('cart',JSON.stringify(_this.cart))
        _this.serAllCose()
        _this.calMoney()
      })
     
     
    }

// 所有单选选中了的时候 勾上全选
serAllCose(){
  const isAll = this.cart.every(title=>{
return title.check
  })
 
  $('#all-check').prop('checked',isAll)
   this.calMoney()
}

// 点击全选,所有的单选框选手

check_cose(){
  const  _this=this
 
 
  $('#all-check').on('change',function(){
  
    var shop = $(this).prop('checked')
// console.log(shop)
   let cart = localStorage.getItem('cart')
   this.cart = JSON.parse(cart)
  //  console.log(this.cart)
   if(shop){
    this.cart = this.cart.map(itme=>{
      if(itme.check === true){
     
      }else{
        itme.check = true
      }

      return itme
     })
   }else{
    this.cart = this.cart.map(itme=>{
      
        itme.check =false
      

      return itme
     })
   }
   
   localStorage.setItem('cart',JSON.stringify(this.cart))
  
   $("#shop_cont input:checkbox").prop('checked',shop)
  
 

  //  _this.renderTable()

  //  console.log(this.cart)
  //  _this.serAllCose()
 

  // if(shop){
  //   _this.calMoney()
  // }

  // if(shop.check){
    
  // }
  })

 
}





// 删除事件
delete(){
  const  _this =this
$('.delete').on('click',function(){
if(confirm('亲,你确定删除码?')){
  const id = Number($(this).parents('#shopping_quantity').attr('data_id'))
   $(this).parents('#shopping_quantity').remove();
   let cart = JSON.parse(localStorage.getItem('cart'))


   _this.cart = cart.filter((shop,index)=>{
     return shop.id !==id
   })

localStorage.setItem('cart',JSON.stringify(_this.cart))

if(_this.cart.length == 0){
  localStorage.removeItem('cart')
  $('#cart-empty').show()
} 

  

  // console.log(cart.length)
//   if(cart.length == 0){
// remove(cart)
//   }else{
//    $('#cart-empty').show()
//   }

// console.log(cart.length)
//   if(cart.length == 1){
//     $('#cart-empty').show()
//   }
}
_this.calMoney()
 })

}

// 点击增加事件
addBtn(){

  
  let sub=  $('.sub_btn');
  let  add=$('.add_btn')
  let input = $('.put')
  var  value = $('.put').val()
  const  _this =this
  var res
 
//  增加
 add.on('click',function(){
 
 
    let cart = JSON.parse(localStorage.getItem('cart'))
    const id = Number($(this).parents('#shopping_quantity').attr('data_id'))
    
var a =$(this).parents('li').find(input).val()

 
_this.cart=cart.map(itme=>{
  // console.log(itme.id)
  if(itme.id == id){
    res = ++a
var sum=($(this).parents('ul').find('.danjia').html()*res).toFixed(2)
 $(this).parents('ul').find('.xiaoji').html(sum)
    $(this).parents('li').find(input).val(res)
    itme.count =res
 
  }
  return itme
})
 localStorage.setItem('cart',JSON.stringify(_this.cart))
      _this.calMoney()
 })
 
// 减少
 sub.on('click',function(){
  let cart = JSON.parse(localStorage.getItem('cart'))
  const id = Number($(this).parents('#shopping_quantity').attr('data_id'))
  
var a =$(this).parents('li').find(input).val()

_this.cart=cart.map(itme=>{
  // console.log(itme.id)
  if(itme.id == id){
    res = --a
    var sum=($(this).parents('ul').find('.danjia').html()*res).toFixed(2)
 $(this).parents('ul').find('.xiaoji').html(sum)
    $(this).parents('li').find(input).val(res)
    itme.count =res
 
  }
  return itme
})
localStorage.setItem('cart',JSON.stringify(_this.cart))
_this.calMoney()
 })

}



// 计算总价


  calMoney(){
const money =this.cart.reduce((itme,shop)=>{

// console.log(itme = shop.jiage*shop.count)
  if(shop.check){
    itme += shop.jiage*shop.count-0
  }
  return itme

},0)
// console.log(money)
 $('.sumMoney').html(money.toFixed(2))
  }



  all_btn(){
    const _this=this
    // console.log( $('#all-check').check===false)
     $('#all-check').on('click',function(){
      let cart = JSON.parse(localStorage.getItem('cart'))

// console.log(cart)
//     const money =cart.reduce((itme,shop)=>{

//       // console.log(itme = shop.jiage*shop.count)
//          if(shop.check){
//           itme += shop.jiage*shop.count-0
//         }
//         return itme
      
//        },0)
//        console.log(money)
//        console.log(997)
//  $('.sumMoney').html(money.toFixed(2))


//  localStorage.setItem('cart',JSON.stringify(_this.cart))
























   if($(this).prop('checked')===true){

    const money =this.cart.reduce((itme,shop)=>{

      // console.log(itme = shop.jiage*shop.count)
        if(shop.check){
          itme += shop.jiage*shop.count-0
        }
        return itme
      
      },0)
      console.log(money)
      console.log(997)

$('.sumMoney').html(money.toFixed(2))
 
   }else{
     const money =this.cart.reduce((itme,shop)=>{

      // console.log(itme = shop.jiage*shop.count)
        if(shop.check){
          itme += shop.jiage*shop.count-0
        }
        return itme
      
      },0)
      console.log(money)
      console.log(998)
$('.sumMoney').html(money.toFixed(2))
var mon =this.cart.reduce((itme,shop)=>{
  if(shop.check){
    itme +=shop.jiage*shop.count-0
  }
  return itme
},0)
    
$('.sumMoney').html(mon.toFixed(2))
    console.log(666)
   }
     
    })
  }







      }
      new Shopping()
    })
  })