<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
        <el-select style="float: left;" v-model="selectValue" placeholder="请选择">
            <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button  @click="openNewAccountDialog"  style="float: right;" size="mini">添加</el-button>
        <el-table
            :data="userInfo"
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
            prop="role"
            label="身份"
            :formatter="roleFormatter">
            <template>
                <!-- <el-tag type="warning" v-if="scope.row == 0">管理员</el-tag>
                <el-tag v-if="scope.row.role == 1">检查员</el-tag>
                <el-tag type="success" v-if="currentData.row.role == 2">维保员</el-tag> -->
            </template>
            </el-table-column>
            <el-table-column
            prop="account"
            label="手机号">
            </el-table-column>
            <el-table-column>
            <template slot="header">
                操作<i @click="openQuestion" class="el-icon-question"></i>
            </template>
            <!-- <template slot-scope="scope">
                <div v-if="scope.row.userAccount.status == 0">
                    <el-button style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">辞离</el-button>
                    <el-button  style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">修改</el-button>
                    <el-button  style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">重置密码</el-button>
                </div>
                <div v-else>
                    <el-button  style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">恢复</el-button>
                </div>
            </template> -->
            <template slot-scope="scope">
                <el-button @click="dismissBtn(scope.row)" type="text" size="small">辞离</el-button>
                <el-button @click="UpdateBtn(scope.row)"  type="text" size="small">修改</el-button>
                <el-button  @click="resetPwd(scope.row)" type="text" size="small">重置密码</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog :close-on-click-modal="false" title="修改信息" :visible.sync="UpdateAccountDialog">
            <el-form :model="currentData" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="currentData.name" maxlength="5" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="currentData.sex" label="男">男</el-radio>
                    <el-radio v-model="currentData.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="currentData.mail" maxlength="13" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="currentData.account" maxlength="11" placeholder="请输入手机号"></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <el-form-item label="身份">
                    <el-tag type="warning" v-if="currentData.role == 0">管理员</el-tag>
                    <el-tag v-if="currentData.role == 1">检查员</el-tag>
                    <el-tag type="success" v-if="currentData.role == 2">维保员</el-tag>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <!-- <el-button @click="unLock">
                        <span v-if="UpdateClock">解锁</span>
                        <span v-else>上锁</span>
                    </el-button> -->
                    <el-button @click="CurrentAndData">确认</el-button>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog title="添加成员" :visible.sync="NewAccountDialog">
            <el-form :model="AddMember"  label-width="80px">
                <el-form-item label="姓名">
                    <el-input maxlength="5" v-model="AddMember.name" placeholder="请输入姓名" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="AddMember.sex" label="男">男</el-radio>
                    <el-radio v-model="AddMember.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="AddMember.mail" maxlength="13" placeholder="请输入邮箱" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="身份"> -->
                    <!-- <el-select placeholder="xx级xx专业xx班" filterable>
                        <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
                    </el-select> -->
                    <!-- <el-checkbox-group v-model="checkedRoles">
                        <el-checkbox style="margin: 0 15px;" label="管理员">管理员</el-checkbox>
                        <el-checkbox style="margin: 0 15px;" label="检查员">检查员</el-checkbox>
                        <el-checkbox style="margin: 0 15px;" label="维保员">维保员</el-checkbox>
                    </el-checkbox-group> -->
                    <!-- <el-input maxlength="13" placeholder="请输入班级" ></el-input> -->
                <!-- </el-form-item> -->
                <el-form-item label="身份">
                    <el-radio v-model="AddMember.type" label="0">管理员</el-radio>
                    <el-radio v-model="AddMember.type" label="1">检查员</el-radio>
                    <el-radio v-model="AddMember.type" label="2">维保员</el-radio>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input maxlength="11" v-model="AddMember.account" placeholder="请输入手机号" ></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <el-button @click="AddMem">完成</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            selectValue: '',
            option: [
                {
                    label: '在职',
                    value: 0
                },
                {
                    label: '离职',
                    value: 1
                }
            ],
            userInfo:[
                
            ],
            fullscreenLoading: false,
            UpdateAccountDialog: false,
            currentData: [],
            NewAccountDialog:false,
            AddMember:{
                    name:'',
                    sex:'',
                    mail:'',
                    account:'',
                    type:'',
                    pwd:'inc123456'
                },
            checkedRoles: [],
           
            // options: [
            //     {
            //         label: '22级计应3班',
            //         value: '22级计应3班'
            //     },
            //     {
            //         label: '22级计应2班',
            //         value: '22级计应2班'
            //     },
            //     {
            //         label: '22级计应1班',
            //         value: '22级计应1班'
            //     }
            // ],
        }
        
    },
    created() {
        this.getAllAccount()
    },
    methods:{
        UpdateBtn(row) {
            // console.log(row)
            this.UpdateAccountDialog = true
            this.currentData = row
        },
        getAllAccount(){
            // this.fullscreenLoading = true;
            const url = '/api/manager/getAllAccount'
            axios.post(url,{},{
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // this.userInfo = res.data
                    // console.log(this.userInfo)
                    this.userInfo = res.data.filter(item => {
                        return item.role == '1'
                    })
                }
            })
        },
        openQuestion() {
            this.$alert('<p style="text-indent: 2em;font-size: 16px;"><strong>辞离:</strong> 该操作将使用户账号显示注销状态 影响任务派发和打卡</p><p style="text-indent: 2em;font-size: 16px;"><strong>修改:</strong> 修改用户账号信息</p><p style="text-indent: 2em;font-size: 16px;"><strong>重置:</strong> 重置的初始密码为 <i>inc123456</i></p>', '操作', {
                dangerouslyUseHTMLString: true,
                callback: action => {
                    if(action == 'confirm' || action == 'cancel') {
                        // console.log(action)
                    }
                }
            });
        },
        dismissBtn(row) {
            // console.log(row)
            this.$confirm('此操作将辞离该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',

                callback: action => {
                    if(action == 'confirm') {
                        const url = '/api/manager/delete'
                        // const account = row.account
                        // console.log(row.account)
                        // console.log(row.userInfo.account)
                        axios.post(`${url}?account=${row.account}`,{
        
                            },
                            {
                            headers: {
                                'verifyCode': '2024'
                            }
                        }).then((res) => {
                            if(res.status == 200) {
                                console.log(res)
                                this.$message({
                                    type: 'success',
                                    message: '辞离成功!'
                                });
                                this.getAllAccount()
                            }
                        })
                    }
                }
            });
        },
        resetPwd(row) {
            // console.log(row)
            this.$confirm('此操作将重置密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',

                callback: action => {
                    if(action == 'confirm') {
                        const url = '/api/manager/resetPwd'
                        // const phone = row.userInfo.phone
                        axios.post(`${url}?account=${row.account}`,{
        
                            },
                            {
                            headers: {
                                'verifyCode': '2024'
                            }
                        }).then((res) => {
                            if(res.status == 200) {
                                // console.log(res)
                                
                                this.$message({
                                    type: 'success',
                                    message: '密码重置成功!'
                                });
                                this.getAllAccount()
                            }
                        })
                    }
                }
            });
        },
    roleFormatter(row, column, cellValue) {
        if (cellValue === 0) {
        return '管理员';
        } else if (cellValue === 1) {
        return '检查员';
        }else if (cellValue === 2) {
        return '维保员';
        }else{
            return cellValue;
        }
    },
    CurrentAndData(){
        if (this.currentData === this.userInfo) {
            this.$message({
                type: 'success',
                message: '取消成功！'
            });
            return;
        } else if (this.currentData !== this.userInfo) {
            const url = '/api/user/updateInfos';
            axios.post(`${url}?account=${this.currentData.account}&mail=${this.currentData.mail}&name=${this.currentData.name}&sex=${this.currentData.sex}`, {

            }, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    this.UpdateAccountDialog = false
                }
            })
        }
    },
    openNewAccountDialog(){
        this.NewAccountDialog = true
    },
        AddMem(){
            if(this.AddMember.name == '') {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                })
                return
            } else if(this.AddMember.sex == '') {
                this.$message({
                    message: '请选择性别',
                    type: 'warning'
                })
                return
            
            } else if(this.AddMember.mail == '') {
                this.$message({
                    message: '请输入邮箱',
                    type: 'warning'
                })
                return
            } else if(this.AddMember.type == '') {
                this.$message({
                    message: '请选择身份',
                    type: 'warning'
                })
                return
            } else if(this.AddMember.account == '') {
                this.$message({
                    message: '请输入手机号',
                    type: 'warning'
                })
                return
            }else{
                console.log(this.AddMember)
            const url = '/api/user/create'
            axios.post(`${url}?account=${this.AddMember.account}&pwd=${this.AddMember.pwd}&type=${this.AddMember.type}`,{
        
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            if(res.status == 200) {
                
                const url='/api/user/updateInfos'
            axios.post(`${url}?account=${this.AddMember.account}&mail=${this.AddMember.mail}&name=${this.AddMember.name}&sex=${this.AddMember.sex}`,{
        
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            if(res.status == 200) {
                this.$message({
                    // distinguishCancelAndClose: true,
                    type: 'success',
                    message: '添加成功!'
                });
                this.NewAccountDialog = false
            }
        })
            }
        })
            }
       
        }

        
    }
}
</script>