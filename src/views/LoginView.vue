<template>
<div class="login-page" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <video autoplay loop muted playsinline class="background-video">
    <img src="@/assets/img/110503466_p0_master1200.jpg" alt="">
    </video> -->

    <div class="box">
        <div class="welcome">
            <div>
                <h2 style="font-size: 32px;">Welcome</h2>
                <h3>欢迎使用！</h3>
                <img style="border-radius: 50%;width: 260px;" src="@/assets/img/dog.jpg" alt="">
            </div>
        </div>
        <div class="container">
            <div>
                <img style="border-radius: 50%;width: 120px;" src="@/assets/img/dog.jpg" alt="">
                <h2 style="font-size: 32px;">Login</h2>
                <!-- <el-button @click="testAccount" type="text">测试账号</el-button> -->
                <div class="login-form">
                    <div class="input-group">
                        <label>用户名:</label>
                        <el-input v-model="loginForm.account"></el-input>
                    </div>
                    <div class="input-group">
                        <label>密码:</label>
                        <el-input type="password" v-model="loginForm.pwd"></el-input>
                    </div>
                    <div class="input-group">
                        <label >验证码:</label>
                        <div style="display: flex;">
                            <el-input style="width: 100%;" maxlength="4" v-model="loginForm.verify">
                            </el-input>
                            <img style="height: 32px;" :src="yan_picUrl" alt="验证码" />
                        </div>
                    </div>
                    <button @click="loginBtn" id="btn" >登录</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginForm: {
                account: '',
                pwd: '',
                verify: ''
            },
            yan_picUrl: '',
            yan_captcha: '',
            fullscreenLoading: false
        }
    },
    created() {
        this.generateCaptcha()
        if(localStorage.getItem('account') != null) {
            this.$router.push('/user')
        }
    },
    methods: {
        loginBtn() {
            if(this.loginForm.account == '') {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                })
                return
            } else if(this.loginForm.pwd == '') {
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                })
                return
            } else if(this.loginForm.verify == '') {
                this.$message({
                    message: '请输入验证码',
                    type: 'warning'
                })
                return
            } else if(this.loginForm.verify != this.yan_captcha) {
                this.loginForm.verify = ''
                this.generateCaptcha()
                this.$message({
                    message: '验证码错误',
                    type: 'warning'
                })
                return
            }
             else {
                const url = '/api/user/login'
                this.fullscreenLoading = true
                axios.post(`${url}?account=${this.loginForm.account}&pwd=${this.loginForm.pwd}`, {}, {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then(res => {
                    if(res.data != 'Account not exited or pwd is wrong') {
                        setTimeout(function() {
                            this.fullscreenLoading = false
                            localStorage.setItem('account', this.loginForm.account)
                            localStorage.setItem('token', res.data)
                            this.$router.push('/user')
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            })
                        }.bind(this), 1000)
                    } else {
                        setTimeout(function() {
                            this.fullscreenLoading = false
                            this.$message({
                                message: '账号或密码错误',
                                type: 'warning'
                            })
                        }.bind(this), 1000)
                    }
                })
                
            }
        },
        testAccount() {
            this.loginForm.account = 'admin'
            this.loginForm.pwd = '@inc123456.'
            this.loginForm.verify = this.yan_captcha
        },
        generateCaptcha() {
            const img_w = 100;
            const img_h = 40;
            const char_len = 4;
            const font = '25px Arial';

            const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
            let code = '';
            for (let i = 0; i < char_len; i++) {
            code += char[Math.floor(Math.random() * char.length)];
            }
            // console.log(code)
            const canvas = document.createElement('canvas');
            canvas.width = img_w;
            canvas.height = img_h;
            const ctx = canvas.getContext('2d');

            // 背景色
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, img_w, img_h);

            // 画点
            for (let i = 0; i < 300; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.arc(Math.random() * img_w, Math.random() * img_h, 1, 0, 2 * Math.PI);
            ctx.fill();
            }

            // 画线
            for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * img_w, Math.random() * img_h);
            ctx.lineTo(Math.random() * img_w, Math.random() * img_h);
            ctx.stroke();
            }

            // 画矩形
            ctx.fillStyle = 'rgba(144, 144, 144, 0.8)';
            ctx.fillRect(0, 0, img_w, img_h);

            // 写文字
            ctx.font = font;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 1)`;
            const textWidth = ctx.measureText(code).width;
            ctx.fillText(code, (img_w - textWidth) / 2, (img_h + parseInt(font) - 20) / 2);

            this.yan_captcha = code
            this.yan_picUrl = canvas.toDataURL('image/png')
        },
    }
}
</script>

<style>
.login-page {
    position: relative;
    width: 100%;
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/img/110503466_p0_master1200.jpg) 50% no-repeat;
    background-size: cover;
}
.login-page h2, .login-page h3 {
    margin: 6px 0 6px 0 ;
}
.login-page .background-video {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100vh;
    z-index: -1;
}
.login-page .box {
    width: 60%;
    height: 60vh;
    background-color: rgba(255, 255, 255, 0.4);
    position: relative;
    display: flex;
    overflow-y: auto;
}
.login-page .welcome {
    width: 50%;background-color: rgba(40, 191, 202, 0.6);color: #000;display: flex;align-items: center;justify-content: center;
    height: 100%;
}
.login-page .container {
    width: calc(50% - 48px);
    min-height: 60vh;
    color: #000;
    padding: 0 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-page .login-form {
    width: 100%;
    margin: 0 auto;
}
.login-page .input-group {
margin-bottom: 1rem;
display: flex;
}
.login-page .el-input-group__append {
    padding: 0;
}
.login-page label {
width: 80px;
line-height: 44px;
}

.login-page input {
height: calc(44px - 12px);
width: calc(100% - 24px - 48px);
padding: 0;
font-size: 1rem;
border-radius: 0.5rem;
}
.login-page #btn {
width: 100%;
padding: 0.5rem;
font-size: 1rem;
background-color: #007bff;
color: #000;
border: none;
border-radius: 0.5rem;
cursor: pointer;
}
@media screen and (max-width: 976px) {
    .login-page .box {
        width: 90%;
    }
    .login-page .box .welcome {
        display: none;
    }
    .login-page .container {
        width: calc(100% - 48px);
    }
}
</style>