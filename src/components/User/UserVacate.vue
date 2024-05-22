<template>
    <div class="vacatePage">
        <div class="container">
            <div style="position: relative;">
                <!-- <el-tag style="position: absolute;right: 0;" size="mini" type="info">未完成(0/ {{  }})</el-tag> -->
            </div>
            
            <el-breadcrumb style="font-size: 11px;" separator="/">
            <el-breadcrumb-item :to="{ path: '/user' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
            <el-breadcrumb-item>检查</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
        

            <h2>请假</h2>
            <p style="font-size: 11px;">请假务必与管理员联系</p>
            <p style="font-size: 11px;">在管理员审核后即可</p>
            <p style="font-size: 11px;">工作时间： 17:40 - 19:00</p>
            <p style="font-size: 11px;">检查时间： 20:30 - 21:00</p>
            <p style="font-size: 11px;">如遇问题请qq联系</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
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
.vacatePage {
    width: 100%;
}

.vacatePage .container {
    height: calc(100vh - 64px - 24px - 12px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
@media screen and (max-width: 768px) {
    .vacatePage .container {
        width: 90%;
    }
}
</style>