$(function(){
    $('#link_reg').on('click',function (){
            $('.log_box').hide()
            $('.reg_box').show();
    })
    $('#link_login').on('click',function (){
        $('.log_box').show()
        $('.reg_box').hide();
    })
    //添加表单验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //再来一个校验两次密码是否一致的校验规则
        repwd: function (value){
            //拿到两个密码框的值,比较是否一直,不一致就return
            // 拿到元素,注意后面的方式
            let pwd = $('.reg_box [name=password]').val()
            if (pwd !== value){
                console.log(pwd)
                console.log(value)
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function (e){
        //阻止默认行为
        //一般这么长的值不会写在里面
        let data = {username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()}
        e.preventDefault()
        $.post('/api/reguser',data,function (res){
            if (res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功!请前往登录')
            $('#link_login').click();
        })
    })

    //给登录页面添加注册事件
    $('#form_log').submit(function (e){
        //阻止默认事件
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res){
                if (res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')

                localStorage.setItem('token',res.token)
                location.href = 'index.html'
            }
        })
    })
})
