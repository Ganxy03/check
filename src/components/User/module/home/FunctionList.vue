<template>
    <div>
        <h3 class="tl">常用功能</h3>
        <ul style="padding: 0;margin: 0;">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in FunctionList" :key="item.name">
                    <li @click="LinkTo(item.url)" class="FunctionItem cp" :class="item.icon" :style="{ backgroundColor: item.color }"></li>
                    <span class="FunctionItem_label">{{ item.name }}</span>
                </el-col>
            </el-row>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import LinkClass from './module/LinkClass.vue'
export default {
    components: {
        // eslint-disable-next-line
        LinkClass
    },
    data() {
        return {
            FunctionList: [
                {
                    name: '请假',
                    icon: 'icon-clockIn',
                    color: '#AA53F2',
                    url: '/vacate'
                },
                {
                    name: '检查',
                    icon: 'icon-inspect',
                    color: '#5FC5ED',
                    url: '/inspect'
                },
                // {
                //     name: '打卡',
                //     icon: 'icon-clockIn',
                //     color: '#F2A853',
                //     url: '/user/clockIn'
                // },
                {
                    name: '管理',
                    icon: 'icon-manager',
                    color: '#AA53F2',
                    url: '/manager'
                },
                {
                    name: '关联',
                    icon: 'icon-relevance',
                    color: '#5FC5ED',
                    url: '/relevance'
                }
            ],
            role: ''
        }
    },
    created() {
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
                    this.role = res.data.role
                }
            })
        },
        openLinkDialog() {
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    // h('span', null, '内容可以是 '),
                    // h('i', { style: 'color: teal' }, 'VNode')
                    h(LinkClass),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // eslint-disable-next-line
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm' || action === 'cancel') {
                        // done();
                        this.$msgbox.close();
                    }
                }
            })
            // .then(action => {
            //     // this.$message({
            //     //     type: 'info',
            //     //     message: 'action: ' + action
            //     // });
            // });
        },
        LinkTo(url) {
            
            console.log(this.role)
            if(url == '/vacate' && (this.role == 2 || this.role == 0)) {
                this.$router.push(url)
            } else if(url == '/inspect' && (this.role == 1 || this.role == 0)) {
                this.$router.push(url)
            } else if(url == '/manager' && this.role == 0) {
                this.$router.push(url)
            }  else if(url == '/relevance' && this.role == 0) {
                this.openLinkDialog()
            } else {
                this.$message({
                    message: '权限不足',
                    type: 'warning'
                })
            }
            // if((url == '/user/manager' && localStorage.getItem('phone') == '13735820244') || url != '/user/manager') {
            //     this.$router.push(url)
            //     return
            // } 
            // this.$message({
            //     message: '该功能仅限管理员使用',
            //     type: 'warning'
            // })
        }
        
    }
}
</script>
<style>
/* icon */
.icon-clockIn {
    background: url(@/assets/img/icon/打卡.png) 50% no-repeat;
}
.icon-inspect {
    background: url(@/assets/img/icon/检查.png) 50% no-repeat;
}
.icon-manager {
    background: url(@/assets/img/icon/管理.png) 50% no-repeat;
}
.icon-relevance{
    background: url(@/assets/img/icon/关联.png) 50% no-repeat;
}



.FunctionItem {
    list-style: none;
    height: 60px;
    border-radius: 5px;
    /* background-color: rgb(236, 171, 86); */
}
.FunctionItem_label {
    font-size: 13px;
}
</style>