<template>
<div class="userInspect">
    <div class="container">
        
        <div style="position: relative;">
            <el-tag style="position: absolute;right: 0;" size="mini" type="info">未完成(0/ {{ total }})</el-tag>
        </div>
        
        <el-breadcrumb style="font-size: 11px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/user' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
        <el-breadcrumb-item>检查</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
    

        <h2>检查</h2>
        <p style="font-size: 11px;">此程序仅为了省去纸质的麻烦</p>
        <p style="font-size: 11px;">每天上传随机需要检查的三个教室即可打卡</p>
        <p style="font-size: 11px;">如遇问题请qq联系</p>
        <p style="font-size: 11px;">每天检查时间： 20:30 - 22:30</p>
        <!-- 检查清单 -->
        <InspectListVue />

        <!-- 反馈 -->
        <ProblemFeetBack />
        
    </div>
</div>
</template>
<script>
import axios from 'axios'
import InspectListVue from '../Inspect/InspectList.vue'
import ProblemFeetBack from '../Inspect/FeetBack.vue'
export default {
    components: {
        InspectListVue,
        ProblemFeetBack
    },
    data() {
        return {
            total: 0
        }
    },
    created() {
        // this.getTask()
        this.getTodayTask()
    },
    methods: {
        BackToHome() {
            this.$router.push("/user")
        },
        // getTask() {
        //     const url = '/api/task/getAllTask'
        //     if(localStorage.getItem('phone') == 'guest') {
        //         return
        //     }

        //     axios.post(url,{
                    
        //         },
        //         {
        //         headers: {
        //             'verifyCode': '2024'
        //         }
        //     }).then((res) => {
        //         this.total = res.data.filter(item => item.phone === localStorage.getItem('phone')).length;
        //     }).finally(() => {
        //         this.fullscreenLoading = false;
        //     });
        // }
        getTodayTask() {
            const url = '/api/room/getTodayTask'
            axios.post(url,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                const temp = res.data.filter(item => item.account === localStorage.getItem('account')).length;
                // console.log(temp)
                this.total = temp
            })
        },
    }
}
</script>
<style>
.userInspect {
    width: 100%;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.userInspect .container {
    height: calc(100vh - 64px - 24px - 12px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

@media screen and (max-width: 768px) {
    .userInspect .container {
        width: 90%;
    }
}
</style>