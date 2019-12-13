require(['./config'], () => {
    require(['template','register','url'], (template) => {
    var form = document.querySelector("form")
             var input = document.querySelectorAll("input");
             var sp = document.querySelectorAll("em");
             var user = 	/^[\u4e00-\u9fa5]{1,6}$/;
             var sj = /^1[3-9][0-9]{9}$/;
             var password  = /^[a-z0-9A-Z_-]{8,14}$/;
             var yzm = /^\d{4}$/
             var spp=["只能输入汉字,设置后不可更改,最长6个汉字","请输入中国大陆手机号","可以有数字,字母 空格,8-14位","请输入四位数的手机验证码"];



spp.forEach(function(value,index){
    input[index].onfocus=function() {
        //当鼠标滑入第一个input的时候,span的样式显示出来
        sp[index].innerHTML = spp[index]
        //设置span的文字颜色
        sp[index].style.color ="blue"
}	

})

	//将上面的正则表达式放到一个组长里面(变量不加引号)
    var sdd = [user,sj,password,yzm]

    sdd.forEach(function(value,index){
        //当第一个input失去焦点的时候,执行以下代码
        input[index].onblur = function(){
        
            //input.value的值为空则不验证  ,直接退出循环
            if(input[index].value == ""){
                return false
            }else{
                
                //将以下代码传入函数中去
                    //元素input[0,1,2,3]  元素span[0,1,2,3]   sdd 的值[0,1,2,3](就是上见面的正则公式)
                tab(input[index],sp[index],sdd[index]);	
                
            }
            
        }
        
    })

	//这里是上面传进来的值       yz就表示sdd的正则表达式公式  { index [0]	ar user =/^[\u4e00-\u9fa5]{1,6}$/  } { index [2]  sj = /^1[3-9][0-9]{9}$/;}
    function tab( input,sp,yz){
        //检测 用公式检测input的值 时候符合  如果满足就执行if里面的语句,否则执行 else
    if(yz.test(input.value)){
        sp.style.color = "green";
        sp.innerHTML ="正确";
        sp.className = "bg";
        
    }else{
        sp.innerHTML = "您那你错啦错啦,请重新输入";
        sp.style.color = "red";
        sp.className = "bgg";

    }
}





    document.querySelector("#button").onclick = function(){
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value
        //把用户名存进localstorage
        const user = {username:username,password:password}
        //存一个数组 先取
        var userList = localStorage.getItem("userList")
        //判断里面是否有
        if(userList){
            userList = JSON.parse(userList)
            userList.push(user)
            localStorage.setItem("userList",JSON.stringify(userList))
        }else{
            var arr = new Array()
            arr.push(user)
            localStorage.setItem("userList",JSON.stringify(arr))
        }
        alert("注册成功啦,亲 请登陆哟")
       
    }






    })
  })