<template>
<div class="userHome">
    <div class="container">
        <!-- <span style="float: left;font-size: 11px;font-weight: 400">淮南 · {{ weather.data.forecast[0].type }}</span> -->
        <span style="float: right;font-size: 11px;font-weight: 400">欢迎 <span class="cp" @click="LinkTo('/personal')" style="color: #64aaf5">{{ account.name }}</span><i @click="openQuestion" class="el-icon-question cp"></i></span>
        <!-- <span style="float: right;font-size: 11px;font-weight: 400">欢迎 <el-button type="text" @click="console" style="color: #64aaf5;font-size: 11px;">{{ account.name }}</el-button></span> -->
        
        <!-- 任务 -->
        <TaskList />

        <!-- <span style="float: right;font-size: 11px;font-weight: 400"><span  class="cp" v-for="item in Notice" :key="item" style="color: #64aaf5">{{ item.content }}</span></span> -->
        <!-- 公告栏 -->
        <NoticeModule />
        <!-- 功能清单 -->
        <FunctionList />

        <!-- 日历 -->
        <CalendarModule />

        <p>&copy;Ganxy|2024</p>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import TaskList from './module/home/TaskList.vue';
import NoticeModule from './module/home/NoticeModule.vue';
import FunctionList from './module/home/FunctionList.vue';
import CalendarModule from './module/home/CalendarModule.vue';
export default {
    components: {
        TaskList,
        NoticeModule,
        FunctionList,
        CalendarModule
    },
    data() {
        return {
            account: {
                name: '测试',
                ageing: 0
            },
            weather: []
        };
    },
    created() {
        if(localStorage.getItem('account') != null) {
            this.account.name = localStorage.getItem('account')
        }
        this.verifyLogin()
        // this.getWeather()
    },
    methods: {
        getWeather() {
            // fetch('http://t.weather.itboy.net/api/weather/city/101220401')
            // fetch('http://t.weather.itboy.net/api/weather/city/101220401')
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data);
            // })
            // const headers = new Headers();
            // headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0');
            // headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');
            // headers.append('Accept-Encoding', 'gzip, deflate');
            // headers.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6');
            // headers.append('Cache-Control', 'max-age=0');

            // 使用 fetch 发送请求，并传递 headers
            fetch('/weather/101220401')
            .then(response => response.json())
            .then(data => {
                this.weather = data
                console.log(data)
            })
            .catch(error => console.error(error));
        },
        verifyLogin() {
            if(localStorage.getItem('account') == null || localStorage.getItem('account') == '') {
                localStorage.clear()
                this.$router.push('/login')
                this.$message({
                    message: '身份失效',
                    type: 'warning'
                })
                return
            }
            const url = '/api/user/verify'
            axios.post(`${url}?account=${localStorage.getItem('account')}&token=${localStorage.getItem('token')}`, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                if(res.data == 'Verify success') {
                    console.log(res.data)
                } else {
                    localStorage.clear()
                    this.$router.push('/login')
                    this.$message({
                        message: '身份失效',
                        type: 'warning'
                    })
                }
            })
        },
        LinkTo(url) {
            this.$router.push(url)
        },
        openQuestion() {
            const formatTime = (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return `${minutes}分${remainingSeconds}秒`;
            };
            let remainingTime = this.account.ageing;
            
            this.$alert(`<p>为了您的账号安全，每次登录有三十分钟的时效</p><h2 style="text-align: center;font-size: 24px">${formatTime(remainingTime)}<br><small style="font-size: 13px;font-weight: 400">(剩余时间)</small></h2>`, '登陆时效', {
                dangerouslyUseHTMLString: true,
                callback: action => {
                    if (action === 'cancel') {
                        // console.log("close")
                    } else if (action === 'confirm') {
                        // console.log("confirm")
                    }
                },
                onClose: () => {
                    // clearInterval(this.timer);
                    // console.log("关闭叉叉被点击了")
                }
            })
        },
    }
};
</script>

<style>
.userHome {
    width: 100%;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    /* background: url(http://ganxy03.cn/img/background-image.jpg) 50% no-repeat;
    background-size: cover; */
}
.userHome .container {
    min-height: calc(100vh - 64px - 24px - 12px);
    width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
/* h2 {
    text-align: center;
    color: #333;
} */

@media screen and (max-width: 768px) {
    .userHome .container {
        width: 90%;
    }
    .el-message-box {
        width: 90%;
    }
}
</style>