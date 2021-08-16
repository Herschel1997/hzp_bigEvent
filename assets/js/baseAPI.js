//在每次执行$.post 或者$.get 或者$.ajax 都默认会执行这个函数
//这个函数相当于一个配置函数

$.ajaxPrefilter(function (options){
    //这是获取的url
    console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})
