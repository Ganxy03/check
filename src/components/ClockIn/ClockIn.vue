<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <div @click="ClockIn" class="circle">
    <div class="content">
        <div class="time">{{ currentTime }}</div>
        <div class="text">打卡</div>
    </div>
    </div>
    
    
    <div style="position: relative;">
        <el-button @click="lockInQuestion" class="question" type="text">
        <i class="el-icon-question"></i>
        </el-button>
        <el-button @click="openReplenishmentDialog" class="button" type="text">补打</el-button>
    </div>

    <el-dialog title="补打" :visible.sync="ReplenishmentDialog">
        <el-date-picker
        v-model="pickerTime"
        type="datetime"
        placeholder="选择日期时间">
        </el-date-picker>
        <el-button @click="Replenishment">打卡</el-button>
        <p style="font-size: 13px;line-height: 11px;">自己选择打卡时间哈</p>
        <p style="font-size: 13px;line-height: 11px;">选错了就改不了了</p>
    </el-dialog>

    
</div>
</template>
<style>
.circle {
width: 200px;
height: 200px;
border-radius: 50%;
background: linear-gradient(135deg, #00bcd4, #2196f3);
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.content {
text-align: center;
}
.time {
font-size: 24px;
font-weight: bold;
margin-bottom: 8px;
color: white;
}
.text {
font-size: 16px;
color: white;
}
.button {
position: absolute;
right: 16px;
color: #2196f3;
}
.question {
position: absolute;
right: 0;
color: #2196f3;
}

@media screen and (max-width: 768px) {
    .el-message-box {
        width: 96%;
    }
    .el-dialog {
        width: 96%;
        min-height: 20vh;
    }
}
</style>
<script>
import axios from 'axios'
export default {
data() {
    return {
        currentTime: '',
        todayClockIn: this.$store.getters.todayClockIn,
        ReplenishmentDialog: false,
        pickerTime: '',
        formattedTime: '',
        fullscreenLoading: false,
        replenishmentUse: 0
    }
},
mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
},
created() {
    // console.log(this.$store.getters.todayClockIn)
    // this.VerifyClock()
    // this.GetRemainTime()
},
methods: {
    ClockIn() {
        if(this.todayClockIn == true) {
            this.$message({
                message: '今天已经打过了',
                type: 'warning'
            })
            return
        }
        // console.log("打卡")
        this.$alert('冲冲冲 打卡', '打卡', {
          confirmButtonText: '确定',
          callback: action => {
            if(action == 'confirm') {
                const url = '/api/clock/clockRecord'
                const phone = localStorage.getItem('phone')
                axios.post(`${url}?phone=${phone}`,{
                    
                    },
                    {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if(res.status == 200) {
                        this.$message({
                            message: '打卡成功',
                            type: 'success'
                        })
                        // console.log("k")
                        this.$store.dispatch('saveTodayClockIn', true);
                        this.todayClockIn = true
                        // console.log(this.$store.getters.todayClockIn)
                    }
                })
            } else if(action == 'cancel') {
                // console.log("das")
            }
          }
        });
    },
    GetRemainTime() {
        const url = '/api/clock/getRemainTime'
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
                this.replenishmentUse = res.data
            }
        })
    },
    openReplenishmentDialog() {
        

        if(this.replenishmentUse == 10) {
            this.$message({
                message: '本月次数已用完',
                type: 'warning'
            })
            return
        }
        const residualUse = 10 - this.replenishmentUse
        this.$confirm('这个月你还有'+ residualUse + '次使用机会 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            if(action == 'confirm') {
                this.ReplenishmentDialog = true
            } else if(action == 'cancel') {
                this.$message({
                    message: '已取消',
                    type: 'info'
                })
            }
          }
        });
    },
    Replenishment() {
        // console.log(this.pickerTime)
        if(this.pickerTime == '') {
            this.$message({
                message: '不能为空',
                type: 'warning'
            })
            return
        }
        var parsedDate = new Date(this.pickerTime);
        // 格式化为"yyyy-MM-dd HH:mm:ss"的格式
        var formattedTime = parsedDate.getFullYear() + '-' + 
                            ('0' + (parsedDate.getMonth() + 1)).slice(-2) + '-' + 
                            ('0' + parsedDate.getDate()).slice(-2) + ' ' + 
                            ('0' + parsedDate.getHours()).slice(-2) + ':' + 
                            ('0' + parsedDate.getMinutes()).slice(-2) + ':' + 
                            ('0' + parsedDate.getSeconds()).slice(-2);
        this.formattedTime = formattedTime
        // console.log(formattedTime); // 输出格式化后的时间字符串

        const url = '/api/clock/judgeReplenishTime'
        const phone = localStorage.getItem('phone')
        const time = formattedTime
        axios.post(`${url}?phone=${phone}&time=${time}`,{
                
            },
            {
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            // console.log(res)
            if(res.status == 200) {
                if(res.data == 'Today is clock') {
                    this.$message({
                        message: '这天打过了',
                        type: 'warning'
                    })
                    return
                } else if(res.data == 'Today time is not clock') {
                    // this.$message({
                    //     message: '可以打卡',
                    //     type: 'success'
                    // })
                    // this.pickerTime
                    this.$confirm('此操作将于'+ this.pickerTime +'打卡, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: action => {
                            if(action == 'confirm') {
                                this.fullscreenLoading = true
                                this.ReplenishmentDialog = false
                                
                                setTimeout(function() {
                                    const url = '/api/clock/replenishment'
                                    const phone = localStorage.getItem('phone')
                                    const time = this.formattedTime
                                    axios.post(`${url}?phone=${phone}&time=${time}`,{
                                            
                                        },
                                        {
                                        headers: {
                                            'verifyCode': '2024'
                                        }
                                    }).then((res) => {
                                        if(res.status == 200) {
                                            this.$message({
                                                type: 'success',
                                                message: '打卡成功'
                                            });
                                        }
                                    })
                                    this.fullscreenLoading = false
                                }.bind(this), 1500)
                            } else if(action == 'cancel') {
                                // console.log("cancel")
                            }
                        }
                    });
                }
            }
        })

    },
    VerifyClock() {
        const url = '/api/clock/judgeTodayClock'
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
                this.$store.dispatch('saveTodayClockIn', true);
                this.todayClockIn = true
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
    lockInQuestion() {
        this.$alert('<p style="text-align: center">一个月三次 不能再多了</p><h3 style="text-align: center;">使用次数: ' + this.replenishmentUse + ' / 10</h3><p style="text-align: center;">葡萄美酒莫贪杯哦~</p>', '关于补打', {
          dangerouslyUseHTMLString: true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
}
}
</script>