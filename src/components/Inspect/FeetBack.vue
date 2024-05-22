<template>
    <ul style="margin: 0;padding: 0">
        <el-row :gutter="20">
            <!-- <el-col :span="12" v-for="item in FeetBackItem" :key="item.name">
                <el-button @clicke="handleButtonClick(item.btn)" class="FeetBack_NavItem"><i :class="item.icon"></i>{{ item.name }}</el-button>
            </el-col> -->
            <el-col :span="12">
                <el-button @click="openInspectRecordDialog" style="width: 100%;">检查记录</el-button>
            </el-col>
            <el-col :span="12">
                <el-button @click="openProblemRecordDialog" style="width: 100%;">问题记录</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-button @click="openProblemDialog" style="margin-top: 12px;width: 100%;">问题上传</el-button>
            </el-col>
        </el-row>


        <!-- <el-dialog title="问题上传" :visible.sync="ProblemDialog">
            <UploadProblem />
        </el-dialog> -->
        <el-dialog title="问题记录" :visible.sync="ProblemRecordDialog">
            <ProblemTable />
        </el-dialog>
        <el-dialog title="检查记录" :visible.sync="InspectRecordDialog">
            <InspectTable />
        </el-dialog>
    </ul>
</template>

<script>
// import UploadProblem from './UploadProblem.vue'
import InspectTable from './InspectTable.vue'
import ProblemTable from './ProblemTable.vue'
export default {
    components: {
        // UploadProblem,
        InspectTable,
        ProblemTable
    },
    data() {
        return {
            FeetBackItem: [
                {
                    name: '问题上传',
                    icon: 'el-icon-camera-solid',
                    btn: 'openProblemDialog'
                },
                {
                    name: '问题记录',
                    icon: 'el-icon-s-order',
                    btn: 'openProblemRecordDialog'
                }
            ],
            InspectDialog: false,
            ProblemDialog: false,
            ProblemRecordDialog: false,
            InspectRecordDialog: false
        }
    },
    methods: {
        openProblemDialog() {
            this.ProblemDialog = true
        },
        openProblemRecordDialog() {
            this.ProblemRecordDialog = true
        },
        openInspectRecordDialog() {
            this.InspectRecordDialog = true
        }
    }
}
</script>

<style>
.el-dialog {
    height: 75vh;
    overflow-y: auto;
}
.FeetBack_NavItem {
    list-style: none;
    /* background-color: aqua; */
    margin: 12px 0;
}


@media screen and (max-width: 768px) {
    .el-dialog {
        width: 96%;
        height: 74vh;
        margin-top: 0;
    }
}
</style>
