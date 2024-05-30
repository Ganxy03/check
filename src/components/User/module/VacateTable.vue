<template>
    <div>
        <el-table :data="tableData">
            <el-table-column
            label="日期"
            prop="time">
            </el-table-column>
            <el-table-column
            label="备注"
            prop="mark">
            </el-table-column>
            <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 1">已通过</el-tag>
                    <el-tag v-else-if="scope.row.status === 0">未通过</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        
        getAll() {
            const url = '/api/manager/getAllVacate'
            axios.post(url, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                this.tableData = res.data.filter(item => {
                    return item.account == localStorage.getItem('account')
                })
            })
        }
    }
}
</script>