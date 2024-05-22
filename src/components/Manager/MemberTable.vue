<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-select style="float: left;" v-model="selectDate" placeholder="请选择">
            <el-option
            v-for="item in SelectDate"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button @click="openNewAccountDialog" style="float: right;" size="mini">添加</el-button>
        <el-table
            :data="filteredTableData"
            height="70vh">
            <el-table-column
            prop="userInfo.name"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="userInfo.sno"
            label="学号">
            </el-table-column>
            <el-table-column
            prop="userInfo.belong"
            label="班级">
            </el-table-column>
            <el-table-column
            prop="userInfo.phone"
            label="手机号">
            </el-table-column>
            <el-table-column>
            <template slot="header">
                操作<i @click="openQuestion" class="el-icon-question"></i>
            </template>
            <template slot-scope="scope">
                <div v-if="scope.row.userAccount.status == 0">
                    <el-button @click="dismissBtn(scope.row)" style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">辞离</el-button>
                    <el-button @click="UpdateBtn(scope.row)" style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">修改</el-button>
                    <el-button @click="resetPwd(scope.row)" style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">重置密码</el-button>
                </div>
                <div v-else>
                    <el-button @click="Recover(scope.row)" style="width: 100%;text-align: center;padding: 0;margin: 0;" type="text">恢复</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加成员" :visible.sync="NewAccountDialog">
            <el-form :model="newMemberForm" label-width="80px">
                <el-form-item label="姓名">
                    <el-input maxlength="5" placeholder="请输入姓名" v-model="newMemberForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="newMemberForm.sex" label="男">男</el-radio>
                    <el-radio v-model="newMemberForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input maxlength="13" placeholder="请输入学号" v-model="newMemberForm.sno"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="newMemberForm.belong" placeholder="xx级xx专业xx班" filterable>
                        <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input maxlength="11" placeholder="请输入手机" v-model="newMemberForm.phone"></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <el-button @click="finishBtn">完成</el-button>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog title="确认信息" :visible.sync="EnsureAccountDialog">
            <el-form :model="tempMemberForm" label-width="80px">
                <el-form-item label="姓名">
                    <el-input disabled maxlength="5" placeholder="请输入姓名" v-model="tempMemberForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio disabled v-model="tempMemberForm.sex" label="男">男</el-radio>
                    <el-radio disabled v-model="tempMemberForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input disabled maxlength="13" placeholder="请输入学号" v-model="tempMemberForm.sno"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select disabled v-model="tempMemberForm.belong" placeholder="xx级xx专业xx班" filterable>
                        <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input disabled maxlength="11" placeholder="请输入手机" v-model="tempMemberForm.phone"></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <el-button @click="cancelBtn">取消</el-button>
                    <el-button @click="ensureBtn">确认</el-button>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog title="修改信息" :visible.sync="UpdateAccountDialog">
            <el-form :model="CurrentAccount" label-width="80px">
                <el-form-item label="姓名">
                    <el-input :disabled="UpdateClock" maxlength="5" placeholder="请输入姓名" v-model="CurrentAccount.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio :disabled="UpdateClock" v-model="CurrentAccount.sex" label="男">男</el-radio>
                    <el-radio :disabled="UpdateClock" v-model="CurrentAccount.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input :disabled="UpdateClock" maxlength="13" placeholder="请输入学号" v-model="CurrentAccount.sno"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select :disabled="UpdateClock" v-model="CurrentAccount.belong" placeholder="xx级xx专业xx班" filterable>
                        <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input :disabled="UpdateClock" maxlength="11" placeholder="请输入手机" v-model="CurrentAccount.phone"></el-input>
                    <p style="font-size: 11px;margin: 0;height: 20px;line-height: 20px;">注意: 手机将做为登陆的账号 请务必准确</p>
                </el-form-item>
                <div style="display: flex;justify-content: end;">
                    <el-button @click="unLock">
                        <span v-if="UpdateClock">解锁</span>
                        <span v-else>上锁</span>
                    </el-button>
                    <el-button @click="reSureBtn">确认</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            SelectDate: [
                {
                    label: '在职',
                    value: 0
                },
                {
                    label: '离职',
                    value: 1
                }
            ],
            selectDate: 0,
            AllAccount: [],
            CurrentAccount: [],
            NewAccountDialog: false,
            EnsureAccountDialog: false,
            UpdateAccountDialog: false,
            UpdateClock: true,
            newMemberForm: {},
            tempMemberForm: {},
            options: [
                {
                    label: '22级计应3班',
                    value: '22级计应3班'
                },
                {
                    label: '22级计应2班',
                    value: '22级计应2班'
                },
                {
                    label: '22级计应1班',
                    value: '22级计应1班'
                }
            ],
            fullscreenLoading: false
        }
    },
    computed: {
        filteredTableData() {
            return this.AllAccount.filter(item => item.userAccount.status === this.selectDate);
        },
    },
    created() {
        // this.getAllAccount()
    },
    methods: {
        getAllAccount() {
            this.fullscreenLoading = true;
            const url = '/api/user-account/getAllAccount'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    this.AllAccount = res.data
                }
            }).finally(() => {
                this.fullscreenLoading = false;
            });
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
        openNewAccountDialog() {
            this.NewAccountDialog = true
        },
        finishBtn() {
            if(this.newMemberForm.name == null) {
                this.$message({
                    message: '名字没写',
                    type: 'warning'
                })
                return
            } else if(this.newMemberForm.sex == null) {
                this.$message({
                    message: '性别没写',
                    type: 'warning'
                })
                return
            } else if(this.newMemberForm.sno == null) {
                this.$message({
                    message: '学号没写',
                    type: 'warning'
                })
                return
            } else if(this.newMemberForm.belong == null) {
                this.$message({
                    message: '班级没写',
                    type: 'warning'
                })
                return
            } else if(this.newMemberForm.phone == null) {
                this.$message({
                    message: '手机没写',
                    type: 'warning'
                })
                return
            } else {
                // console.log(this.newMemberForm)
                this.NewAccountDialog = false

                this.tempMemberForm = this.newMemberForm
                this.EnsureAccountDialog = true
            }
        },
        cancelBtn() {
            this.EnsureAccountDialog = false
            this.NewAccountDialog = false
            this.UpdateClock = true
        },
        ensureBtn() {
            if(this.UpdateClock == false) {
                this.$confirm('确定修改该用户信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action => {
                        if(action == 'confirm') {
                            // console.log(this.newMemberForm)
                            console.log(this.tempMemberForm)
                            // const url = 'http://localhost:24221/api/user-account/newAccount';
                            // /user-account/newAccount
                            const url = '/api/user-account/updateInfo'
                            axios.post(url, this.tempMemberForm, {
                                headers: {
                                    'verifyCode': '2024',
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }).then((res) => {
                                if(res.status == 200) {
                                    // console.log(res)
                                    this.$message({
                                        message: '更新成功',
                                        type: 'success'
                                    })
                                    this.EnsureAccountDialog = false
                                    this.UpdateAccountDialog = false
                                    this.UpdateClock = true
                                    this.getAllAccount()
                                }
                            }).catch((error) => {
                                // 请求失败时的处理逻辑
                                console.error(error);
                            });

                        }
                    }
                });
                return
            }
            this.$confirm('确定注册该用户信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        // console.log(this.newMemberForm)
                        // const url = 'http://localhost:24221/api/user-account/newAccount';
                        // /user-account/newAccount
                        const url = '/api/user-account/newAccount'
                        axios.post(url, this.tempMemberForm, {
                            headers: {
                                'verifyCode': '2024',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then((res) => {
                            if(res.status == 200) {
                                // console.log(res)
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.EnsureAccountDialog = false
                                this.getAllAccount()
                            }
                        }).catch((error) => {
                            // 请求失败时的处理逻辑
                            console.error(error);
                        });

                    }
                }
            });
        },
        UpdateBtn(row) {
            // console.log(row)
            this.UpdateAccountDialog = true
            this.CurrentAccount = row.userInfo
        },
        unLock() {
            this.UpdateClock = !this.UpdateClock
        },
        reSureBtn() {
            // console.log(this.CurrentAccount)
            if(this.UpdateClock == true) {
                this.$message({
                    message: '先解锁',
                    type: 'warning'
                })
                return
            }
            this.tempMemberForm = this.CurrentAccount
            this.EnsureAccountDialog = true
        },
        Recover(row) {
            // console.log(row)
            this.$confirm('此操作将恢复该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',

                callback: action => {
                    if(action == 'confirm') {
                        const url = '/api/user-account/recover'
                        const phone = row.userInfo.phone
                        axios.post(`${url}?phone=${phone}`,{
        
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
                                    message: '恢复成功!'
                                });
                                this.getAllAccount()
                            }
                        })
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
                        const url = '/api/user-account/signOut'
                        const phone = row.userInfo.phone
                        axios.post(`${url}?phone=${phone}`,{
        
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
                        const url = '/api/user-account/resetPwd'
                        const phone = row.userInfo.phone
                        axios.post(`${url}?phone=${phone}`,{
        
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
        }
    }
}
</script>

<style>
@media screen and (max-width: 768px) {
    .el-dialog {
        width: 96%;
    }
}
</style>