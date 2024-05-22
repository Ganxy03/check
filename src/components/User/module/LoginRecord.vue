<template>
    <div>
        <h4 class="tl">登陆历史</h4>
        <el-table
        height="45vh"
        :data="loginHistory.data">
            <el-table-column
            prop="time"
            label="时间">
            </el-table-column>
            <el-table-column
            prop="ip"
            label="IP">
            </el-table-column>
            <el-table-column
            prop="city">
            <template slot="header">
                地址<i @click="openQuestion" class="el-icon-question"></i>
            </template>
            </el-table-column>
            <el-table-column
            prop="isp"
            label="运营商">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginHistory: []
        }
    },
    created() {
        this.getLoginHistory()
    },
    methods: {
        getLoginHistory() {
            const url = '/api/user/getAllIP'
            const phone = localStorage.getItem('account')
            axios.post(`${url}?account=${phone}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    this.loginHistory = res
                }
            })
        },
        openQuestion() {
            this.$alert('<p>只是根据你通信运营商使用的ip查询出来的行政区划 定位精度并不准确 仅供参考</p>', '关于定位', {
                dangerouslyUseHTMLString: true,
                
                callback: action => {
                    if(action == 'confirm') {
                        // console.log("confirm")
                    } else if(action == 'cancel') {
                        // console.log("cancel")
                    }
                }
            });
        }
    }
}
</script>