
    // class Register{
    //     constructor(){
    //         // 注册的接口
    //         this.url = "http://api.icodeilife.cn:81/user";
    //         // 获取元素
    //         this.user = $(".user");
    //         this.pass = $(".pass");
    //         // this.tel = $("#tel");
    //         // this.email = $("#email");
    //         this.btn = $(".btn");
    //         this.state = $("span");
    //         // 绑定点击事件
    //         this.addEvent();
    //     }
    //     addEvent(){
    //         var that = this;
    //         this.btn.click(function(){
    //             // 开启ajax
    //             that.load()
    //         })
    //     }
    //     load(){
    //         // 请求注册接口
    //         $.ajax({
    //             url:this.url,
    //             data:{
    //                 type:"register",
    //                 user:this.user.val(),
    //                 pass:this.pass.val(),
    //                 // tel:this.tel.val(),
    //                 // email:this.email.val()
    //             },
    //             success:(res)=>{
    //                 // 请求成功之后，解析数据，根据数据的返回信息，决定不同的状态
    //                 res = JSON.parse(res);
    //                 // console.log(res);
    //                 if(res.code == 0){
                        
    //                     this.state.html("注册失败，请重新注册");

    //                 }else if(res.code == 1){
                        
    //                     this.state.html("注册成功，请点击登录");
                        
                        
    //                 }
    //             }
    //         })
    //     }
    // }
    
    // new Register();

    $(function() {
        // 正则提示
        var re_username = /^[a-zA-Z-_]{1}[A-Za-z0-9_-]{3,9}$/;
        var re_password = /^[a-zA-Z]\w{5,17}$/;
        var re_tel = /^1[34578]\d{9}$/;
        var re_code = /^[a-zA-Z]\d{6}$/;
    
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user != null) {
            var arr = Object.keys(this.user);
            var len = arr.length;
        } else {
            var len = 0;
        }
    
        var that = this;
    
        // 用户名验证
        $("#username").change(() => {
                $("#username").blur(function() {
                    if (!re_username.test($("#username").val())) {
                        $(".username").children("span").html("用户名不符，请重新输入");
                        $("#username").val("");
                    }
                    // 验证用户名是否存在
                    if (that.user) {
                        for (var i = 0; i < len; i++) {
                            if (that.user[i].username == $("#username").val()) {
                                $(".test").html("用户名已存在");
                            }
                        }
                    }
                })
            })
            // 手机号验证
        $("#tel").change(() => {
                $("#tel").blur(function() {
                    if (!re_tel.test($("#tel").val())) {
                        $(".tel").children("span").html("手机号不正确，请重新输入");
                        $("#tel").val("");
                    } else {
                        $(".tel").children("span").html("获取验证码");
                    }
                })
            })
            // 密码验证
        $("#password").change(() => {
                $("#password").blur(function() {
                    if (!re_password.test($("#password").val())) {
                        $(".password").children("span").html("密码格式不正确，请重新输入");
                        $("#password").val("");
                    }
                })
            })
            // 验证两次输入的密码是否相同
        $("#confirm").change(() => {
            $("#confirm").blur(function() {
                if ($("#password").val() != $("#confirm").val()) {
                    $(".confirm").children("span").html("两次输入密码不一致，请重新输入");
                }
            })
        })
    
        // 点击注册按钮，验证所有信息
        $("#btn").click(function() {
            var jump = true;
            if ($("#username").val() == "") {
                $(".username").children("span").html("用户名不能为空");
                jump = false;
            }
            if ($("#tel").val() == "") {
                $(".tel").children("span").html("手机号不能为空");
                jump = false;
            }
            if ($("#code").val() == "") {
                $(".code").children("span").html("重新获取短信验证码");
                jump = false;
            }
            if ($("#password").val() == "") {
                $(".password").children("span").html("密码不能为空");
                jump = false;
            }
            if ($("#password").val() != $("#confirm").val()) {
                $(".confirm").children("span").html("请验证密码");
                jump = false;
            }
    
            var name = $("#username").val();
            var word = $("#password").val()
            var tel = $("#tel").val();
    
            if (that.user == null) {
                that.user = [{
                    username: name,
                    password: word,
                    tel: tel
                }]
            } else {
                that.user.push({
                    username: name,
                    password: word,
                    tel: tel
                })
            }
            localStorage.setItem("user", JSON.stringify(that.user));
    
            if (jump) {
                window.location.href = "http://localhost/project/frist.html";
            }
        })
    })
