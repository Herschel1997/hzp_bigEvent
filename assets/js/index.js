$(function (){
    //调用getUserInfo获取用户基本信息
    getUserInfo()
    let  layer = layui.layer
    //点击按钮实现退出效果
    $('#btnLogout').on('click',function (){
        //提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空本地储存中的token
            localStorage.removeItem('token')
            //2.重新跳转回登录页面
            location.href = 'login.html'
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res){
            console.log(res)
            if (res.status !== 0){

                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    //1.获取用户名称
    let name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户的头像
    if (user.user_pic !== null){
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
