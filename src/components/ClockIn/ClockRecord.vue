<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <h3 class="tl">打卡记录</h3>
        <el-table
            :data="ClockInData"
            height="40vh">
            <el-table-column
            prop="time"
            label="时间">
            </el-table-column>
            <el-table-column
            prop="label"
            label="标签">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.label == 1" type="warning">补打</el-tag>
                <el-tag v-if="scope.row.label == 0" type="success">正常</el-tag>
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
            ClockInData: [],
            fullscreenLoading: false
        }
    },
    created() {
        // this.getAllRecord()
    },
    methods: {
        getAllRecord() {
            this.fullscreenLoading = true;
            const url = '/api/clock/getAllRecord'
            const phone = localStorage.getItem('phone')
            axios.post(`${url}?phone=${phone}`,{
                
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    this.ClockInData = res.data
                }
            }).finally(() => {
                this.fullscreenLoading = false;
            });
        }
    }
}
</script>