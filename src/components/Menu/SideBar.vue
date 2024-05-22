<template>
    <ul class="sideBar">
        <div class="avatar">
            <img src="@/assets/img/dog.jpg" alt="">
        </div>
        <div class="info">
            <h2>{{ account.name }}</h2>
            <p v-if="account.role == 0">管理员</p>
            <p v-if="account.role == 1">检查员</p>
            <p v-if="account.role == 2">维保员</p>
        </div>
        <div class="search">
            <el-input>
                <el-button slot="append"><i class="el-icon-search"></i></el-button>
            </el-input>
        </div>
        <div class="navi">
            <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1">请假</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="1-2">检查</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="1-3">管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">文档</span>
                </el-menu-item>
            </el-menu>
        </div>
    </ul>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SideBar',
    data() {
        return {
            isDarkMode: false,
            account: {
                name: '未登录',
                role: 3
            }
        }
    },
    mounted() {
        if(localStorage.getItem('account') != null) {
            this.account.name = localStorage.getItem('account')
        }
        this.getInfo()
    },
    methods: {
        getInfo() {
            const url = '/api/user/getInfos'
            axios.post(`${url}?account=${localStorage.getItem('account')}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    this.account.role = res.data.role
                }
            })
        },
    }
}
</script>

<style>
.sideBar {
    padding: 0;
}
.sideBar .avatar {
    width: 100%;
    height: 100px;
    background: url(@/assets/img/newstyle.gif) 50% no-repeat;
    background-size: cover;
    position: relative;
}
.sideBar .avatar img {
    width: 80px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: calc(50% - 40px);
    opacity: 0.8;
}
.sideBar .info {
    text-align: center;
    margin: 6px 0;
}
.sideBar .info p {
    font-size: 11px;
}
.sideBar .search {
    width: 90%;
    margin: 0 auto;
}
</style>