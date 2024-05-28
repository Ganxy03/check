<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div style="display: flex;justify-content: space-between;">
            <el-select v-model="selectDate" placeholder="请选择">
                <el-option
                v-for="item in SelectDate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <div>
                <!-- <el-button disabled size="mini">一键生图</el-button> -->
                <!-- <el-button @click="exportExcel" size="mini">导出数据</el-button> -->
                <el-button @click="addUser">添加</el-button>
            </div>
        </div>
        <!-- <el-button style="float: right;" size="mini">添加</el-button> -->
        <el-table
            ref="excelTable"
            :data="filteredTableData"
            height="70vh">
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="mail"
            label="邮箱">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别">
            </el-table-column>
            <el-table-column
            label="身份">
            <span>维保员</span>
            </el-table-column>
            <el-table-column
            prop="account"
            label="手机号">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="like(scope.row)" type="text">点赞</el-button>
                <el-button @click="comment(scope.row)" type="text">评价</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加成员" :visible.sync="NewUserDialog">
            <el-form :model="AddUser"  label-width="80px">
                <el-form-item label="姓名">
                    <el-input maxlength="5" v-model="AddUser.name" placeholder="请输入姓名" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="AddUser.sex" label="男">男</el-radio>
                    <el-radio v-model="AddUser.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="AddUser.mail" maxlength="13" placeholder="请输入邮箱" ></el-input>
                </el-form-item>
                <el-form-item label="身份">
                    <el-radio v-model="AddUser.type" label="2">维保员</el-radio>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input maxlength="11" v-model="AddUser.account" placeholder="请输入手机号" ></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <el-button @click="AddReturn">完成</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { exportExcel } from '.././../utils/index'
export default {
    data() {
        return {
            fullscreenLoading: false,
            NewUserDialog:false,
            SelectDate: [
                {
                    label: '在岗',
                    value: 'on'
                },
                {
                    label: '不在岗',
                    value: 'off'
                }
            ],
            AddUser:{
                    name:'',
                    sex:'',
                    mail:'',
                    account:'',
                    type:'',
                    pwd:'inc123456'
                },
            selectDate: 'on',
            ClockRecord: [],
        }
    },
    computed: {
        filteredTableData() {
            // return this.ClockRecord.filter(item => item.time === this.selectDate);
            return this.ClockRecord;
        },
    },
    created() {
        this.getAll()
    },
    methods: {
        addUser() {
            this.NewUserDialog = true
        },
        getAll() {
            const url = '/api/manager/getAllAccount'
            axios.post(url,{},{
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // this.userInfo = res.data
                    // console.log(this.userInfo)
                    this.ClockRecord = res.data.filter(item => {
                        return item.role == '2'
                    })
                }
            })
        },
        parseLocalDateTime(localDateTimeStr) {
            let dateTimeParts = localDateTimeStr.split(' ');
            let dateParts = dateTimeParts[0].split(':');
            let timeParts = dateTimeParts[1].split(':');
            // 注意：这里假设年、月、日是以"年:月:日"的形式呈现，时间是以"小时:分钟:秒"的形式呈现
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        },
        
        exportExcel() {
            exportExcel(this.$refs.excelTable, "测试测试", "测试.xlsx");
        },
        AddReturn(){
            if(this.AddUser.name == '') {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                })
                return
            } else if(this.AddUser.sex == '') {
                this.$message({
                    message: '请选择性别',
                    type: 'warning'
                })
                return
            
            } else if(this.AddUser.mail == '') {
                this.$message({
                    message: '请输入邮箱',
                    type: 'warning'
                })
                return
            } else if(this.AddUser.type == '') {
                this.$message({
                    message: '请选择身份',
                    type: 'warning'
                })
                return
            } else if(this.AddUser.account == '') {
                this.$message({
                    message: '请输入手机号',
                    type: 'warning'
                })
                return
            }else{
                console.log(this.AddUser)
            const url = '/api/user/create'
            axios.post(`${url}?account=${this.AddUser.account}&pwd=${this.AddUser.pwd}&type=${this.AddUser.type}`,{
        
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            if(res.status == 200) {
                const url='/api/user/updateInfos'
            axios.post(`${url}?account=${this.AddUser.account}&mail=${this.AddUser.mail}&name=${this.AddUser.name}&sex=${this.AddUser.sex}`,{
        
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            if(res.status == 200) {
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.NewUserDialog = false
            }
        })
            }
        })
            }
       
        }

    }
}
</script>