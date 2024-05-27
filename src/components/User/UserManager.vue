<template>
<div class="managerPage">
    <div class="container">
        <span style="float: right;font-size: 11px;font-weight: 400">欢迎 <span class="cp" @click="LinkTo('/personal')" style="color: #64aaf5">{{ account.name }}</span></span>
        <el-breadcrumb style="font-size: 11px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/user' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->

        <h2>管理</h2>
        <el-button style="float: right;" size="mini" @click="TolinkLiveServer">文件目录</el-button>

        <!-- 数据分析 -->
        <DataAnalysis />

        <!-- 教室管理 -->
        <RoomManager />
    </div>
</div>
</template>
<script>
import axios from 'axios' 
import DataAnalysis from '../Manager/DataAnalysis.vue'
import RoomManager from '../Manager/RoomManager.vue'
export default {
    components: {
        DataAnalysis,
        RoomManager
    },
    data() {
        return {
            account: {
                name: '测试'
            },
        }
    },
    created() {
        // this.getAccountName()
    },
    methods: {
        TolinkLiveServer() {
            // this.$router.push('http://localhost:5024')
            window.location.href = 'http://124.221.138.245:8899';
        },
        getAccountName() {
            const url = '/api/user-account/getInfo'
            const phone = localStorage.getItem('phone')
            axios.post(`${url}?phone=${phone}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    this.account.name = res.data.name
                }
            })
        },
        BackToHome() {
            this.$router.push("/user")
        },
        LinkTo(url) {
            this.$router.push(url)
        }
    }
}
</script>
<style>
.managerPage {
    width: 100%;

}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
.managerPage .container {
    height: calc(100vh - 64px - 24px - 12px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

@media screen and (max-width: 768px){
    .managerPage .container {
        width: 90%;
    }
}
</style>