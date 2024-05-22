<template>
<div class="problemRecord">
    <div class="container">
        <!-- <span style="float: right;font-size: 11px;font-weight: 400">欢迎 <span class="cp" @click="LinkTo('/user/personal')" style="color: #64aaf5">{{ account.name }}</span></span> -->
        <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
        <el-breadcrumb style="font-size: 11px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/manager' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
        <el-breadcrumb-item>问题管理</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>问题记录</h2>
        
        <PerblemTable />
    </div>
</div>
</template>
<script>
import PerblemTable from './ProblemTable.vue'
export default {
    components: {
        PerblemTable
    },
    data() {
        return {
            account: {
                name: '甘先懿'
            },
        }
    },
    methods: {
        BackToHome() {
            this.$router.push("/user/manager")
        },
        // LinkTo(url) {
        //     this.$router.push(url)
        // }
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
.problemRecord {
    width: 100%;
}
.problemRecord .container {
    min-height: calc(100vh - 64px - 24px - 12px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.problemRecord .container {
    width: 90%;
}
</style>