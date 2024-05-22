<template>
    <div>
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
                <el-button @click="exportExcel" size="mini">导出数据</el-button>
            </div>
        </div>
        <!-- <el-button style="float: right;" size="mini">添加</el-button> -->
        <el-table
            ref="excelTable"
            :data="filteredTableData"
            height="50vh">
            <el-table-column
            prop="phone"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="time"
            label="任务">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div style="display: flex;justify-content: space-between;width: 100%;margin: 0;padding: 0;">
                    <el-button @click="like(scope.row)" type="text">查看(v.)</el-button>
                    <el-button @click="comment(scope.row)" type="text">记录(n.)</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import { exportExcel } from '.././../utils/index'
export default {
    data() {
        return {
            SelectDate: [
                {
                    label: '今天',
                    value: 'today'
                },
                {
                    label: '昨天',
                    value: 'yestoday'
                },
                {
                    label: '过去一周',
                    value: 'lastWeek'
                },
                {
                    label: '过去一月',
                    value: 'lastMonth'
                }
            ],
            selectDate: 'today',
            ClockRecord: []
        }
    },
    computed: {
        filteredTableData() {
            // return this.ClockRecord.filter(item => item.time === this.selectDate);
            if (this.selectDate !== '') {
                let startDate = new Date();
                let endDate = new Date();
                
                if (this.selectDate === 'today') {
                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                } else if (this.selectDate === 'yestoday') {
                    startDate.setDate(startDate.getDate() - 1);
                    startDate.setHours(0, 0, 0, 0);
                    endDate.setDate(endDate.getDate() - 1);
                    endDate.setHours(23, 59, 59, 999);
                } else if (this.selectDate === 'lastWeek') {
                    startDate.setDate(startDate.getDate() - 7);
                    startDate.setHours(0, 0, 0, 0);
                } else if (this.selectDate === 'lastMonth') {
                    startDate.setMonth(startDate.getMonth() - 1);
                    startDate.setDate(1);
                    startDate.setHours(0, 0, 0, 0);
                }
                
                return this.ClockRecord.filter(item => {
                    // let itemDate = new Date(item.time);
                    let itemDate = this.parseLocalDateTime(item.time);
                    return itemDate >= startDate && itemDate <= endDate;
                });
            } else {
                return this.ClockRecord;
            }
        },
    },
    created() {
        // this.getAllRecord()
    },
    methods: {
        parseLocalDateTime(localDateTimeStr) {
            let dateTimeParts = localDateTimeStr.split(' ');
            let dateParts = dateTimeParts[0].split(':');
            let timeParts = dateTimeParts[1].split(':');
            // 注意：这里假设年、月、日是以"年:月:日"的形式呈现，时间是以"小时:分钟:秒"的形式呈现
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        },
        getAllRecord() {
            const url = '/api/clock/getAllWithNoParam'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res.data)
                    this.ClockRecord = res.data
                }
            })
        },
        like(row) {
            this.$confirm('确定给 '+ row.phone +' 点赞吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        this.$message({
                            message: '点赞成功',
                            type: 'success'
                        })
                    }
                }
            });
        },
        comment(row) {
            this.$prompt('请输入对 '+ row.phone + ' 的评价', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: action => {
                    if(action == 'confirm') {
                        this.$message({
                            message: '评价成功',
                            type: 'success'
                        })
                    }
                }
            });
        },
        exportExcel() {
            exportExcel(this.$refs.excelTable, "测试测试", "测试.xlsx");
        }
    }
}
</script>