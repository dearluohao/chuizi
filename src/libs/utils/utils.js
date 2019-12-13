

  const utils={
     


/*
    通过 id 获取元素
    @param id DOM 元素的 id 名
    @return 获取到的 DOM 元素
*/

 my$ (id) {
    return document.getElementById(id)
},

 $(id){
	return document.querySelector(id)
},
 $$(id){
	return document.querySelectorAll(id)
},
/*
    获取随机数 随机数的范围在 下限和上限之间   能够取到上限和下限的值
    @lower 最小值 下限
    @upper 最大值 上限
    @return 计算好的 随机数
    
*/
 reodm1(min, max) {
    return Math.round(Math.random() * (max - min) + min)
},
 reodm2(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
},

/* 
    获取随机的颜色 
*/
 getColor() {
    return "rgb(" + reodm2(0, 255) + "," + reodm2(0, 255) + "," + reodm2(0, 255) + ")"
},


/*
    获取或者设置元素的 css 样式
    @param ele 要设置的 DOM 元素
    @param attr 要设置的 css 属性
    @param value 要设置的属性值
    @return 返回的是 获取到的元素的样式属性值
*/

 css(ele, attr, value) {
    if (value === undefined) {
        return window.getComputedStyle
            ? window.getComputedStyle(ele)[attr]
            : ele.currentStyle[attr]
    }
    ele.style[attr] = value
},
/*
    pageX/pageY 兼容处理
    @param e 事件对象
    @return {x:..,y:..}
*/
 page(ev) {
    if (ev.pageX) {
        return { x: ev.pageX, y: ev.pageY }
    } else {
        var _left = document.documentElement ? document.documentElement.scrollLeft : document.body.scrollLeft
        var _top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop
        return { x: _left + ev.clientX, y: _top + ev.clientY }
    }
},
/*
    获取元素边框以内的宽度
    @param ele  DOM元素
    @return  处理后的元素的宽度
*/
 innerWidth(ele) {
    if (css(ele, "display") === "none") {
        return parseFloat(css(ele, "width")) + parseFloat(css(ele, "paddingLeft")) + parseFloat(css(ele, "paddingRight"))
    } else {
        return ele.clientWidth
    }
},
/*
    获取元素边框以内的高度
    @param ele  DOM元素
    @return  处理后的元素的高度
*/
 innerHeight(ele) {
    if (css(ele, "display") === "none") {
        return parseFloat(css(ele, "height")) + parseFloat(css(ele, "paddingTop")) + parseFloat(css(ele, "paddingBottom"))
    } else {
        return ele.clientHeight
    }
},

/*
    获取元素边框及边框以内的宽度
    @param ele  DOM元素
    @return  处理后的元素的宽度
*/
 outerWidth(ele) {
    if (css(ele, "display") === "none") {
        return parseFloat(css(ele, "width")) + parseFloat(css(ele, "paddingLeft")) + parseFloat(css(ele, "paddingRight")) + parseFloat(css(ele, "borderLeftWidth")) + parseFloat(css(ele, "borderRightWidth"))
    } else {
        return ele.offsetWidth
    }
},

/*
    获取元素边框及边框以内的高度
    @param ele  DOM元素
    @return  处理后的元素的高度
*/
 outerHeight(ele) {
    if (css(ele, "display") === "none") {
        return parseFloat(css(ele, "height")) + parseFloat(css(ele, "paddingTop")) + parseFloat(css(ele, "paddingBottom")) + parseFloat(css(ele, "borderTopWidth")) + parseFloat(css(ele, "borderBottomWidth"))
    } else {
        return ele.offsetHeight
    }
},


/*
    添加事件监听
    @param ele  DOM元素
    @param type  事件类型
    @param  callback  回调函数 事件处理函数
*/
 on(ele, type, callback) {
    if (ele.addEventListener) {
        if (type.indexOf("on") === 0) {
            type = type.slice(2)
        }
        ele.addEventListener(type, callback)
    } else {
        if (type.indexOf("on") !== 0) {
            type = "on" + type
        }
        ele.attachEvent(type, callback)
    }
},


/*
    移除事件监听
    @param ele  DOM元素
    @param type  事件类型
    @param  callback  回调函数 要移除事件处理函数
*/
 off(ele, type, callback) {
    if (ele.removeEventListener) {
        if (type.indexOf("on") === 0) {
            type = type.slice(2)
        }
        ele.removeEventListener(type, callback)
    } else {
        if (type.indexOf("on") !== 0) {
            type = "on" + type
        }
        ele.detachEvent(type, callback)
    }
}, 

/*
    @param ele DOM 元素
    @param options 对象 所有要改变属性的目标值 {left:500,top:1000}
    @param speed 运动经过的时间
    @param fn   运动执行完毕的回调函数
*/
 animate(ele, options, speed,fn) {
    // fn 是如果所有的运动执行完了以后 再来执行的函数
    // 一开始先清除定时器
    clearInterval(ele.timer)
    // 获取初始值和计算运动区间，获取起始时间
    let start = {}, range = {}, startTime = new Date().getTime()
    for (var key in options) {
        // 分别获取初始值
        start[key] = parseFloat(css(ele, key))
        // 分别计算区间值
        range[key] = options[key] - start[key]
    }
    // console.log(range);
    ele.timer = setInterval( ()=> {
        // 获取当前的时间 并且计算时间差
        let cha = Math.min(new Date().getTime() - startTime, speed)
        for (var key in options) {
            // 计算要设置的结果
            let result = range[key] / speed * cha + start[key]
            //给元素设置属性值
            ele.style[key] = result + "px"
        }
        // 判断停止条件  当经过的时间和我传入的时间一样 就停止运动
        if (cha >= speed) {
            clearInterval(ele.timer)
            // 判断用户有没有传入这个函数 如果传入了就调用 如果没有就不调用
            fn && fn()
        }
    }, 10)
},

/* 完成缓冲运动
    @param ele DOM 元素
    @param options 对象 所有要改变属性的目标值 {left:500,top:1000}
    @param cb   运动执行完毕的回调函数
*/
 move (ele, options, cb) {
    // 进入之前先清除上一次的定时器
    clearInterval(ele.timer)
    // 根据传进来的终点属性获取对应的起点值
    var start = {}, distance = {}, speed = {}
    // 记录运动的属性数量
    var count = 0
    for (var key in options) {
      start[key] = parseInt(css(ele, key))
      count++
    }
    ele.timer = setInterval(() => {
      // 记录运动结束的属性数量
      var n = 0
      for (var key in options) {
        // 计算剩下距离
        distance[key] = options[key] - start[key]
        // 计算速度
        speed[key] = distance[key] > 0 ? Math.ceil(distance[key] / 30) : Math.floor(distance[key] / 30)
        // 移动起始值
        start[key] += speed[key]
        // 样式赋值
        ele.style[key] = start[key] + 'px'
        if (options[key] === start[key]) {
          n++
        }
      }
      if (n === count) {
        // 代表每一个运动都结束了
        clearInterval(ele.timer)
        cb && cb()
      }
    } ,10)
  },

  
/** 获取某一条cookie
   * @param {string} key 要获取的cookie的名称
   * @retrun {string} 当前这条cookie的值
   */
  getCookie (key) {
    var str = document.cookie
    var arr = str.split('; ')
    var obj = new Object()
    arr.forEach(item => {
      var subArr = item.split('=')
      obj[subArr[0]] = decodeURIComponent(subArr[1])
    })
    return obj[key]
  },

  /** 存一条cookie
   * @param {string} key 要存的cookie的名称
   * @param {string} value 要存的cookie的值
   * @param {object} [options] 过期时间和目录，比如： {path: '/', expires: 7} 存根目录7天过期的cookie
   */
  setCookie (key, value, options) {
    var str = `${key}=${encodeURIComponent(value)}`
    // 先判断options是否传进来了
    if (options) {
      // 如果传进来了再判断有那个属性
      if (options.path) {
        str += `;path=${options.path}`
      }
      if (options.expires) {
        var date = new Date()
        date.setDate(date.getDate() + options.expires)
        str += `;expires=${date.toUTCString()}`
      }
    }
    document.cookie = str
  },

  
/**
   * ajax的get请求
   * @param {string} url 请求的地址
   * @param {object} query 请求要携带的参数
   * @param {function} callback 请求成功返回之后的回调函数
   * @param {boolean} [isJson] 返回的数据类型是否为json，默认为true
   */
  get: function (url, query, callback, isJson = true) {
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      // 去掉最后多余的&
      url = url.slice(0, -1)
    }
    // 1、创建核心对象
    var xhr = new XMLHttpRequest()
    // 2、简历2连接
    xhr.open('get', url)
    // 3、发送请求
    xhr.send()
    // 4、监听状态的修改
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          callback && callback(res)
        }
      }
    }
  },


  /**
   * ajax的post请求
   * @param {string} url 请求的地址
   * @param {object} query 请求要携带的参数
   * @param {function} callback 请求成功返回之后的回调函数
   * @param {boolean} [isJson] 返回的数据类型是否为json，默认为true
   */
  post: function (url, query, callback, isJson = true) {
    var str = ""
    if (query) {
      for (var key in query) {
        str += `${key}=${query[key]}&`
      }
      str = str.slice(0, -1)
    }

    var xhr = new XMLHttpRequest()
    xhr.open('post', url)
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    xhr.send(str)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
          callback && callback(res)
        }
      }
    }
  },

    /**
   *   jsonp 
   * @param {string} url 请求的地址
   * @param {string} cbName 回调函数名（必须是全局函数）
   * @param {object} query 其他要传的参数
   */
  jsonp (url, cbName, query) {
    // 拼接url
    url += `?cb=${cbName}`
    if (query) {
      for (var key in query) {
        url += `&${key}=${query[key]}`
      }
    }
    // 创建script
    var script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    document.body.removeChild(script)
  },

  /** 基于promise ajax的get请求
   * @param {string} url  请求的地址
   * @param {object} query 请求要传递的数据，如果没有请求参数，那么就要用一个null来占位
   * @param {boolean} [isJson] 接口返回的是否是json，默认值为true
   */
  fetch (url, query, isJson = true) {
    if (query) {
      url += '?'
      for (var key in query) {
        url += `${key}=${query[key]}&`
      }
      url = url.slice(0, -1)
    }
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
          } else {
            reject()
          }
        }
      }
    })
  },

  


}