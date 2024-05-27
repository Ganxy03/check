<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <h3 class="tl">数据统计</h3>
        <el-row :gutter="20">
            <el-col style="margin: 8px 0" :span="8" v-for="item in DataType" :key="item.type">
                <div>
                    <el-statistic
                    :title="item.type">
                    <template slot="formatter">
                        <span v-if="item.type === '检查人员'">{{ DataType[1].nums }} / {{ allPeopleNum }}<small><br><span class="cp" @click="ToLink('/manager/member')" style="color: #64AAF5;font-size: 11px">管理</span></small></span>
                        <span v-if="item.type === '维保人员'">{{ DataType[2].nums }} / {{ allPeopleNum }}<small><br><span class="cp" @click="ToLink('/manager/clockIn')" style="color: #64AAF5;font-size: 11px">管理</span></small></span>
                        <span v-if="item.type === '检查记录'">{{ item.nums }} / {{ allInspectNums }}<br><small style="font-size: 11px">(今/总)<span class="cp" @click="ToLink('/manager/inspectRecord')" style="color: #64AAF5">详情</span></small></span>
                        <span v-if="item.type === '请假记录'">{{ item.nums }} / {{ allProblemNums }}<br><small style="font-size: 11px">(今/总)<span class="cp" @click="ToLink('/manager/problemRecord')" style="color: #64AAF5">详情</span></small></span>
    
                        <span v-if="item.type === '教室'">{{ item.nums }}</span>
                        <i @click="openQuestion" v-if="item.type == '教室'" class="el-icon-question" style="font-size: 14px"></i>
                    </template>
                    </el-statistic>
                </div>
            </el-col>
            
            <el-col :span="8">
                <h4 @click="ToLink('/manager/taskmanager')" style="background-color: #64AAF5;border-radius: 5px;padding: 12px;cursor: pointer;"><i class="el-icon-s-order"></i>任务管理</h4>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            fullscreenLoading: false,
            allInspectNums: 0,
            allProblemNums: 0,
            allPeopleNum: 0,
            DataType: [
                {
                    type: '教室',
                    nums: 0
                },
                {
                    type: '检查人员',
                    nums: 0
                },
                {
                    type: '维保人员',
                    nums: 0
                },
                {
                    type: '检查记录',
                    nums: 0
                },
                {
                    type: '请假记录',
                    nums: 0
                }
            ],
            roomNums: 20
        }
    },
    created() {
        this.getAllAccount()
        this.getAllRoom()
        // this.getAllSort()
        // this.getAllRecord()
        // this.getAllProblem()
        // this.getAllInspect()
    },
    methods: {
        getAllRoom() {
            const url = '/api/room/getAllRoom'
            axios.post(url, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                // res.data.forEach(item => {
                //     let total = 0
                //     total = total + item.room
                //     this.DataType[0].nums = total
                // })
                let total = res.data.reduce((accumulator, item) => {
                    return accumulator + item.room;
                }, 0);
                this.DataType[0].nums = total
            })
        },
        getAllSort() {
            const url = '/api/roomItem/getAllSort'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    console.log(res.data)
                    let sum = 0;
                    res.data.forEach(item => {
                        sum += item.nums;
                    });
                    this.DataType[0].nums = sum
                    // console.log(sum)
                }
            })
        },
        getAllAccount() {
            const url = '/api/manager/getAllAccount'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    const AllAccount = res.data
                     // 初始化计数器
                    let count = 0;
                    let count2 = 0;
                    // 遍历AllAccount中的userAccount数组，统计status为0的数量
                    AllAccount.forEach(account => {
                        if(account.role === 1) {
                            count++;
                        } else if(account.role === 2) {
                            count2++;
                        }
                    });
                    this.DataType[1].nums = count
                    this.DataType[2].nums = count2
                    this.allPeopleNum = count + count2
                    // console.log('status为0的数量为: ', count);
                }
            })
        },
        getAllRecord() {
            this.fullscreenLoading = true
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
                    // this.ClockRecord = res.data


                    let startDate = new Date();
                    let endDate = new Date();

                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                    // console.log(res.data)
                    let filteredData = res.data.filter(item => {
                        // let itemDate = new Date(item.time);
                        let itemDate = this.parseLocalDateTime(item.time);
                        return itemDate >= startDate && itemDate <= endDate;
                    })
                    // console.log("Filtered data length: ", filteredData.length);
                    this.DataType[2].nums = filteredData.length
                }
            }).finally(() => {
                this.fullscreenLoading = false;
            });
        },
        parseLocalDateTime(localDateTimeStr) {
            let dateTimeParts = localDateTimeStr.split(' ');
            let dateParts = dateTimeParts[0].split(':');
            let timeParts = dateTimeParts[1].split(':');
            // 注意：这里假设年、月、日是以"年:月:日"的形式呈现，时间是以"小时:分钟:秒"的形式呈现
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        },
        parseLocalDateTime2(localDateTimeStr) {
            let dateTimeParts = localDateTimeStr.split(' ');
            let dateParts = dateTimeParts[0].split('-');
            let timeParts = dateTimeParts[1].split(':');
            // 注意：这里假设年、月、日是以"年:月:日"的形式呈现，时间是以"小时:分钟:秒"的形式呈现
            return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        },
        openQuestion() {
            this.$alert('<strong>教室数量包括 <i>教室 </i>  和 <i>机房数量</i></strong>', '提示', {
                dangerouslyUseHTMLString: true
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消'
                });       
            });
        },
        ToLink(url) {
            this.$router.push(url)
        },
        getAllInspect() {
            const url = '/api/inspect/getAll'
            axios.post(url,{
                
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log("res.data:"+res.data)
                    const num = res.data.length
                    // console.log("inspect:"+num)
                    this.allInspectNums = num



                    let startDate = new Date();
                    let endDate = new Date();

                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                    // console.log(res.data)
                    let filteredData = res.data.filter(item => {
                        let itemDate = this.parseLocalDateTime2(item.time);
                        return itemDate >= startDate && itemDate <= endDate;
                    })
                    // console.log("Filtered data length: ", filteredData.length);
                    this.DataType[3].nums = filteredData.length

                }
            })
        },
        getAllProblem() {
            const url = '/api/problem/getAll'
            axios.post(url,{
                
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log("res.data:"+res.data)
                    const num = res.data.length
                    // console.log("problem:"+num)
                    this.allProblemNums = num

                    

                    
                    let startDate = new Date();
                    let endDate = new Date();

                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                    // console.log(res.data)
                    let filteredData = res.data.filter(item => {
                        // let itemDate = new Date(item.time);
                        let itemDate = this.parseLocalDateTime2(item.time);
                        return itemDate >= startDate && itemDate <= endDate;
                    })
                    // console.log("Filtered data length: ", filteredData.length);
                    this.DataType[4].nums = filteredData.length
                }
            })
        }
    }
}
</script>
<style>
@media screen and (max-width: 768px) {
    .el-message-box {
        width: 96%;
    }
}
</style>