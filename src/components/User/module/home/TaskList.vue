<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <h2>今日任务</h2>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="cp" @click="openTaskListDialog">
                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value= 'TaskStatistic.roomNums'
                        title="教室"
                    ></el-statistic>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="cp" @click="openTaskListDialog">
                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value= 'TaskStatistic.machineNums'
                        title="机房"
                    ></el-statistic>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="cp" @click="openFriendDialog">
                    <el-statistic
                        group-separator=","
                        :precision="0"
                        :value= 'TaskStatistic.friendNums'
                        title="小伙伴"
                    ></el-statistic>
                </div>
            </el-col>
        </el-row>


        <el-dialog title="任务清单" :visible.sync="TaskListDialog">
            <el-table
            :data="TaskList"
            height="60vh"
            style="overflow-y: auto;">
                <el-table-column
                prop="time"
                label="日期">
                </el-table-column>
                <el-table-column
                prop="area"
                label="区域">
                </el-table-column>
                <el-table-column
                prop="label"
                label="教室">
                </el-table-column>
                <el-table-column
                label="备注">
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="伙伴一览" :visible.sync="FriendDialog">
            <el-table
            height="60vh"
            style="overflow-y: auto;">
                <el-table-column
                label="名字">
                </el-table-column>
                <el-table-column
                label="区域">
                </el-table-column>
                <el-table-column
                label="数量">
                </el-table-column>
                <el-table-column
                label="打卡">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            TaskList: [],
            TaskStatistic: {
                roomNums: 0,
                machineNums: 0,
                friendNums: 9
            },
            TaskListDialog: false,
            FriendDialog: false,
            fullscreenLoading: false
        }
    },
    created() {
        // 暂时注释
        // this.getTodayTask()
    },
    methods: {
        console() {
            console.log('16')
        },
        openTaskListDialog() {
            this.TaskListDialog = true
        },
        openFriendDialog() {
            this.FriendDialog = true
        },
        getTodayTask() {
            // this.fullscreenLoading = true;
            const phone = localStorage.getItem('phone')
            if(phone == 'guest') {
                return
            }
            const url = '/api/task/getTodayTaskByPhone'
            // const phone = localStorage.getItem('phone')
            axios.post(`${url}?phone=${phone}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res.data)
                    this.TaskList = res.data

                    res.data.forEach(item => {
                        if (item.area === "机房") {
                            this.TaskStatistic.machineNums++;
                        } else {
                            this.TaskStatistic.roomNums++;
                        }
                    });
                }
            }).finally(() => {
                this.fullscreenLoading = false;
            });
        }
    }
}
</script>

<style>
@media screen and (max-width: 768px) {
    .el-dialog {
        width: 90%;
    }
}
</style>