<template>
    <div>
        <el-row :gutter="20">
            <el-col style="height: 300px;" :span="12">
                <el-row>
                    <el-col style="height: 100px;" :span="24">
                        <el-card shadow="hover" style="width: 100%;">
                        <!-- <div style="display: flex;justify-content: end;height: 20px;">
                            <el-button style="line-height: 0px;" type="text">配额</el-button>
                        </div> -->
                        <div style="width: 100%; display: inline-block; ">
                            <el-statistic
                            group-separator=","
                            :precision="0"
                            :value="roomNum.total"
                            title="教室数量"
                            >
                            <template slot="suffix">
                                <el-button size="mini" @click="openQuotaDialog" type="text">配额</el-button>
                                <br><span style="font-size: 11px;">(当前10人)</span>
                            </template>
                            </el-statistic>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="height: 100px;" :span="24">
                        <el-card shadow="hover" style="width: 100%;margin-top: 10px; ">
                        <!-- <div style="display: flex;justify-content: end;height: 20px;">
                            <el-button style="line-height: 0px;" type="text">配额</el-button>
                        </div> -->
                        <el-row>
                            <el-col :span="5">
                                <el-statistic
                                group-separator=","
                                :precision="0"
                                :value="roomNum.E"
                                title="东教"
                                ></el-statistic>
                            </el-col>
                            <el-col :span="5">
                                <el-statistic
                                group-separator=","
                                :precision="0"
                                :value="roomNum.W"
                                title="西教"
                                ></el-statistic>
                            </el-col>
                            <el-col :span="4">
                                <el-statistic
                                group-separator=","
                                :precision="0"
                                :value="roomNum.JF"
                                title="机房"
                                ></el-statistic>
                            </el-col>
                            <el-col :span="5">
                                <el-statistic
                                group-separator=","
                                :precision="0"
                                :value="roomNum.J"
                                title="经管"
                                ></el-statistic>
                            </el-col>
                            <el-col :span="5">
                                <el-statistic
                                group-separator=","
                                :precision="0"
                                :value="roomNum.G"
                                title="建工"
                                ></el-statistic>
                            </el-col>
                        </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="height: 100px;" :span="24">
                        <el-card shadow="hover" style="width: 100%;margin-top: 10px;">
                        <div style="width: 100%; display: inline-block;">
                            <el-statistic
                            :value="countdown"
                            :format="formatTime" 
                            time-indices
                            title="距离下一次执行还有："
                            >
                            </el-statistic>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col style="height: 300px;" :span="12">
                <el-card shadow="hover" style="width: 100%;height: 300px;">
                <div slot="header" class="clearfix" style="position: relative;">
                    <span style="font-weight: 700;position: absolute;left: 0;">执行记录</span>
                    <!-- <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    >管理</el-button> -->
                </div>
                <el-table
                :data="executionRecord"
                stripe
                height="240"
                style="width: 100%">
                <el-table-column
                prop="time"
                label="日期">
                </el-table-column>
                <el-table-column
                prop="tag"
                label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.tag == 1" style="display: flex;justify-content: space-between;">
                        <el-tag type="warning">休息</el-tag>
                        <el-button type="text">工作</el-button>
                    </div>
                    <div v-else style="display: flex;justify-content: space-between;">
                        <el-tag type="success">工作</el-tag>
                        <el-button type="text">休息</el-button>
                    </div>
                </template>
                </el-table-column>
            </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            roomNum: {
                total: 113,
                E: 58,
                W: 25,
                JF: 7,
                J: 11,
                G: 11
            },
            intervalId: null,
            countdown: 86400,
            executionRecord: [
                {
                    time: '2022-02-05 16:22:12',
                    tag: 0
                },
                {
                    time: '2022-02-05 16:22:12',
                    tag: 1
                },
                {
                    time: '2022-02-05 16:22:12',
                    tag: 0
                },
                {
                    time: '2022-02-05 16:22:12',
                    tag: 1
                },
                {
                    time: '2022-02-05 16:22:12',
                    tag: 0
                },
                {
                    time: '2022-02-05 16:22:12',
                    tag: 0
                }
            ]
        }
    },
    computed: {
        formatTime() {
            const hours = Math.floor(this.countdown / 3600);
            const minutes = Math.floor((this.countdown % 3600) / 60);
            const seconds = this.countdown % 60;
            return `${hours.toString().padStart(2, '0')}小时${minutes.toString().padStart(2, '0')}分钟${seconds.toString().padStart(2, '0')}秒`;
        }
    },
    mounted() {
        
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        // eslint-disable-next-line
        const totalSecondsInADay = 24 * 3600;
        const remainingSeconds = (24 - hours - 1) * 3600 + (60 - minutes - 1) * 60 + (60 - seconds);
        this.countdown = remainingSeconds;

        this.intervalId = setInterval(() => {
            this.countdown--;
            if (this.countdown < 0) {
                this.Allocation()
                clearInterval(this.intervalId);
                this.handleTimer()
                // 在倒计时结束后的逻辑处理处添加你需要的逻辑
                return;
            }
        }, 1000);
    },
    methods: {
        handleTimer() {
            // 在这里定义定时执行的任务
            console.log('定时任务执行了！')
            clearInterval(this.intervalId);
            console.log('定时器销毁了')

            this.intervalId = null
            // this.countdown = 86400
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            // eslint-disable-next-line
            const totalSecondsInADay = 24 * 3600;
            const remainingSeconds = (24 - hours - 1) * 3600 + (60 - minutes - 1) * 60 + (60 - seconds);
            this.countdown = remainingSeconds;

            // 重新开始倒计时循环
            this.intervalId = setInterval(() => {
                this.countdown--;
                if (this.countdown < 0) {
                    this.Allocation()
                    clearInterval(this.intervalId);
                    this.handleTimer();
                    // 在倒计时结束后的逻辑处理处添加你需要的逻辑
                    return;
                }
            }, 1000);
        },
        openQuotaDialog() {
            this.$alert('<div><label for="cars">选择每日分配人数:</label><select id="nums"><option value="10">10人</option></select></div>', '配额设置', {
                dangerouslyUseHTMLString: true,
                callback: action => {
                    if(action == 'cancel') {
                        // console.log('cancel')
                    }
                }
            });
        },
        Allocation() {
            const url = '/api/task/record'
            axios.post(url, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    console.log(res)
                }
            })
        }
    },
    beforeDestroy() {
        // 组件销毁前清除定时器
        clearInterval(this.intervalId);
        console.log('定时器销毁了')
    }
}
</script>