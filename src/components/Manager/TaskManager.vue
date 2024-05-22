<template>
<div class="taskManager">
    <div class="container">
        <!-- <span style="float: right;font-size: 11px;font-weight: 400">欢迎 <span class="cp" @click="LinkTo('/user/personal')" style="color: #64aaf5">{{ account.name }}</span></span> -->
        <!-- <span style="float: left;font-size: 11px;font-weight: 400"><span @click="BackToHome" class="cp" style="color: #64aaf5">&lt; 返回</span></span> -->
        <el-breadcrumb style="font-size: 11px;" separator="/">
        <el-breadcrumb-item :to="{ path: '/manager' }"><span style="color: #64aaf5;font-weight: 400;">&lt;返回</span></el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>任务管理<i @click="openQuestion" style="font-size: 14px;cursor: pointer;" class="el-icon-question"></i></h2>

        <div style="display: flex;justify-content: space-between;">
            <el-button @click="openAutomaticAllocationDialog" size="mini">自动分配</el-button>
            <el-button @click="AllClear" size="mini">全部清空</el-button>
            <el-button @click="openTaskHistoryDialog" size="mini">历史任务</el-button>
            <el-button @click="openOperationRecordDialog" size="mini">操作记录</el-button>
        </div>

        <el-dialog title="分配管理" :visible="AutomaticAllocationDialog" :before-close="handleClose">
            <TaskAllocation />
        </el-dialog>

        <el-dialog title="历史任务" :visible="TaskHistoryDialog" :before-close="handleClose">
            <TaskHistory />
        </el-dialog>

        <el-dialog title="操作日志" :visible="OperationRecordDialog" :before-close="handleClose">
            <TaskOperation />
        </el-dialog>

        <TaskAllotVue />
    </div>
</div>
</template>
<script>
import TaskAllocation from './TaskAllocation.vue'
import TaskHistory from './TaskHistory.vue'
import TaskOperation from './TaskOperation.vue'
import TaskAllotVue from './TaskAllot.vue'
export default {
    components: {
        TaskAllocation,
        TaskHistory,
        TaskOperation,
        TaskAllotVue
    },
    data() {
        return {
            account: {
                name: '甘先懿'
            },
            AutomaticAllocationDialog: false,
            TaskHistoryDialog: false,
            OperationRecordDialog: false,
        }
    },
    created() {
    },
    methods: {
        BackToHome() {
            this.$router.push("/user/manager")
        },
        openQuestion() {
            this.$alert('<p>任务已实现脚本定时分配 如需调配 请手动更改</p>', '提示', {
                dangerouslyUseHTMLString: true
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        AllClear() {
            this.$confirm('此操作将清空所有任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '全部清空!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        openAutomaticAllocationDialog() {
            this.AutomaticAllocationDialog = true
        },
        openTaskHistoryDialog() {
            this.TaskHistoryDialog = true
        },
        openOperationRecordDialog() {
            this.OperationRecordDialog = true
        },
        handleClose() {
            this.AutomaticAllocationDialog = false
            this.TaskHistoryDialog = false
            this.OperationRecordDialog = false
        }
    }
}
</script>
<style>
.taskManager {
    width: 100%;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
.taskManager .container {
    min-height: calc(100vh - 64px - 24px - 12px);
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

@media screen and (max-width: 768px) {
    .el-dialog {
        width: 96%;
    }
    .el-message-box {
        width: 96%;
    }
    .taskManager .container {
        width: 90%;
    }
}
</style>