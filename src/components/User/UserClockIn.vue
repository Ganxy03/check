<template>
<div class="container">
    <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
    
    <div style="position: relative;">
        <el-tag v-if="!todayClockIn" style="position: absolute;right: 0;" size="mini" type="info">未打卡</el-tag>
        <el-tag v-else style="position: absolute;right: 0;" size="mini" type="success">已打卡</el-tag>
    </div>
    
    <el-breadcrumb style="font-size: 11px;" separator="/">
    <el-breadcrumb-item :to="{ path: '/user' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
    <el-breadcrumb-item>打卡</el-breadcrumb-item>
    </el-breadcrumb>

    

    <h2>打卡</h2>
    
    <!-- 打卡按钮 -->
    <LockInVue />
    
    <p style="font-size: 11px;">首页日历查看记录更直观</p>
    <!-- 打卡记录 -->
    <ClockRecord />


</div>
</template>
<script>
import axios from 'axios'
import LockInVue from '../ClockIn/ClockIn.vue'
import ClockRecord from '../ClockIn/ClockRecord.vue'
export default {
    components: {
        LockInVue,
        ClockRecord
    },
    data() {
        return {
            todayClockIn: this.$store.getters.todayClockIn,
        }
    },
    created() {
        // this.VerifyClock()
        // console.log(this.$store.getters.todayClockIn)
    },
    methods: {
        BackToHome() {
            this.$router.push("/user")
        },
        VerifyClock() {
            const url = '/api/clock/judgeTodayClock'
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
                    this.$store.dispatch('saveTodayClockIn', true);
                    this.todayClockIn = true
                }
            }).catch((error) => {
                console.error(error)
            })
        },
    }
}
</script>
<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
.container {
    min-height: calc(100vh - 144px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>