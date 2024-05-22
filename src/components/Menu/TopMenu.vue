<template>
    <div class="topNav df fb" v-loading.fullscreen.lock="fullscreenLoading">
        <div @click="ToHome" class="df logo">
            <img src="@/assets/img/dog.jpg" alt="">
            <h2>Check</h2>
        </div>
        <ul class="df navi">
            <li @click="ToHome">首页</li>
            <li>文档</li>
            <li>API</li>
        </ul>
        <div class="df btn">
            <div @click="openSideBar" class="item more">
                <img src="@/assets/img/更多.png" alt="">
            </div>
            <div class="item github">
                <img src="@/assets/img/github-fill.png" alt="">
            </div>
            <div class="item qq">
                <img src="@/assets/img/QQ.png" alt="">
            </div>
            <div @click="toggleDarkMode" class="item">
                <img src="@/assets/img/月亮.png" alt="">
            </div>
        </div>

        <el-drawer
            size="60%"
            :visible.sync="sideBar"
            :direction="direction"
            :before-close="handleClose"
            :append-to-body="true"
            :wrapperClosable="true"
            :withHeader="false">
            <SideBar />
        </el-drawer>
    </div>
</template>

<script>
import '@/assets/css/topNav.css'
import SideBar from '@/components/Menu/SideBar.vue'
export default {
    name: 'TopMenu',
    components: {
        SideBar
    },
    data() {
        return {
            sideBar: false,
            direction: 'ltr',
            fullscreenLoading: false
        }
    },
    methods: {
        ToHome() {
            this.fullscreenLoading = true
            setTimeout(function() {
                this.fullscreenLoading = false
                this.$router.push('/').catch(err => (console.log(err))) 
            }.bind(this), 1000)
        },
        openSideBar() {
            this.sideBar = true
        },
        toggleDarkMode() {
            console.log("暗黑模式")
            // 这里可以调用父组件的方法，或者直接操作DOM
            // const appElement = document.getElementById('html');
            const appElement = document.getElementsByTagName('html')[0];
            if (this.isDarkMode) {
                appElement.classList.remove('dark');
            } else {
                appElement.classList.add('dark');
            }
            this.isDarkMode = !this.isDarkMode;
        },
        handleClose(done) {
            // this.$confirm('确认关闭？')
            // // eslint-disable-next-line
            // .then(_ => {
            //     done();
            // })
            // // eslint-disable-next-line
            // .catch(_ => {});
            done();
        }
    }
}
</script>

<style>
/* .drawerBackground .el-drawer__container {
    background-color: #000;
}
.el-drawer__wrapper {
  background-color: rgba(0, 0, 0, 0.3);
} */

/* .el-drawer__body, .el-drawer__header {
  background-color: #000;
  margin: 0;
} */
.el-drawer__body {
  background-color: #fff;
}
</style>