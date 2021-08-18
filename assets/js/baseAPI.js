//在每次执行$.post 或者$.get 或者$.ajax 都默认会执行这个函数
//这个函数相当于一个配置函数

$.ajaxPrefilter(function (options){
    //这是获取的url
    // console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //不论成功还是失败,最终都会调用complete回调函数
    options.complete = function (res){
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = 'login.html'
        }
    }

})
