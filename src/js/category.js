require(['./config'], () => {
  require(['template','url','header','footer','bootstrap'], (template,url) => {
    console.log(url)
    class Shop{
      constructor(){
        
        this.get_shop()
        
      }
     
      get_shop(){
      
        $.get(`${url.shopUrl}/239112/shop`,resp=>{


            console.log(resp,520)
             if (resp.code === 200) {
            const {list} = resp.body
            console.log(list)

            // 模板引擎里需要list字段，接口返回的数据正好也叫list，所以可以这么写
            $('.b').html(template('a', { list }))
          }
         
        })
       
      }
  //升降排序


    }
    new Shop()
  })
})
