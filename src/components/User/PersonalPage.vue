<template>
<div class="personalPage" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="container" >
        <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
    
        <span @click="logout" class="cp" style="float: right;font-size: 11px;font-weight: 400;color: #64aaf5;">退出账号</span>
        <!-- <span @click="forceOut" class="cp" style="float: right;font-size: 11px;font-weight: 400;color: #f59064;margin-right: 12px;">强制退出</span><i @click="openQuestion" style="float: right;font-size: 14px;color: #666;" class="el-icon-question"></i> -->
        <el-breadcrumb style="font-size: 11px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/user' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>个人中心</h2>

        <!-- 描述列表 -->
        <UserInfo />

        <!-- 登陆历史 -->
        <LoginRecordVue />
    </div>
    
</div>
</template>
<script>
import axios from 'axios'
import UserInfo from "./module/UserInfo.vue"
import LoginRecordVue from './module/LoginRecord.vue'
export default {
    components: {
        UserInfo,
        LoginRecordVue
    },
    data() {
        return {
            fullscreenLoading: false
        }
    },
    methods: {
        BackToHome() {
            this.$router.push("/user")
        },
        loading() {
            setTimeout(function() {
                this.fullscreenLoading = false;
                localStorage.clear()
                this.$router.push('/login')
                this.$message({
                    message: '退出成功',
                    type: 'success'
                })
            }.bind(this), 1000);
        },
        logout() {
            if(localStorage.getItem('account') == null || localStorage.getItem('account') == '') {
                this.fullscreenLoading = true
                this.loading()
                return
            }
            this.$confirm('此操作将退出账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(localStorage.getItem('account') == null || localStorage.getItem('account') == '') {
                    this.fullscreenLoading = true;
                }
                const url = '/api/user/logout'
                this.fullscreenLoading = true;
                axios.post(`${url}?account=${localStorage.getItem('account')}`,{
                    
                    },
                    {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if(res.status == 200) {
                        setTimeout(function() {
                            this.fullscreenLoading = false;
                            localStorage.clear()
                            this.$router.push('/login')
                            this.$message({
                                message: '退出成功',
                                type: 'success'
                            })
                        }.bind(this), 1000);
                    }
                }).catch( error => {
                    console.error('There was a problem with your axios request:', error);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        forceOut() {

            this.$confirm('此操作清除本地缓存强制退出, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        this.fullscreenLoading = true;
                        setTimeout(function() {
                            localStorage.clear()
                            this.$router.push('/login')
                        }.bind(this), 1500)
                    }
                }
            });

        },
        openQuestion() {
            this.$alert('当你使用过程中 因为一些原因退不出账号的话 可以选择清除缓存强制退出 但通常情况下不建议这么做', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    if(action == 'confirm') {
                        // console.log('comfirm')
                    }
                }
            });
        }
    }
}
</script>
<style>
button {
    width: auto;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
.personalPage {
    width: 100%;
}
.personalPage .container {
    height: calc(100vh - 64px - 24px - 12px);
    margin: 0 auto;
    width: 620px;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

@media screen and (max-width: 768px) {
    .personalPage .container {
        /* width: calc(100% - 24px); */
        width: 90%;
    }
}
</style>