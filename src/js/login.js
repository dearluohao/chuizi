require(['./config'], () => {
    require(['header','footer','utils'], () => {
      // console.log(55)
      // console.log( $('#button'))
      // console.log( $('#username'))
      // console.log( $('#password'))

         $('#button').on('click',()=>{

        
            
            const username = document.querySelector('#username').value
            const password = document.querySelector('#password').value

         

            let userList = localStorage.getItem('userList')
            if (userList) {
                // 有注册信息
                userList = JSON.parse(userList)
                // 使用some方法来验证是否存在
                const isExist = userList.some(user => {
                  return user.username == username && user.password == password
                })
                if (isExist) {
                    // alert('登录成功')
                  // 数据存在
                  // 登录成功，应该把用户名存cookie
                  // TODO: 7天免登录
                  utils.setCookie('username', username, { path: '/' })
                  alert('登录成功，即将跳转首页')
                  window.open('/index.html')
                
                } else {
                  // 用户不存在
                  alert('用户名或者密码错误')
                }
              } else {
                alert('还没有注册信息，即将跳转注册页面')
                window.location.href = '/html/register.html'
              }
        
         })
    })
  })




