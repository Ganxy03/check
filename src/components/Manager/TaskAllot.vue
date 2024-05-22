<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="wrapper">
        <el-select v-model="selectMember" placeholder="请选择">
            <el-option
            v-for="item in member"
            :key="item.value"
            :label="item.name"
            :value="item.account"
            ></el-option>
        </el-select>
        <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入教室"
        v-model="value"
        :data="filteredData"
        style="text-align: left;"
        :titles="['已分配', '未分配']"
        :button-texts="[ '分配','取消']"
        >
        <el-button @click="saveCurrentData" class="transfer-footer" style="float: right;" slot="left-footer" size="small">保存</el-button>
        </el-transfer>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            fullscreenLoading: false,
            data: [],
            value: [],
            resultList: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            selectMember: '',
            member: [
                // {
                //     label: '王小庆',
                //     value: '18855040242'
                // },
                // {
                //     label: '邹宇杰',
                //     value: '18355420946'
                // },
                // {
                //     label: '徐梦琪',
                //     value: '15255681059'
                // },
                // {
                //     label: '蒋佳佳',
                //     value: '13695540413'
                // },
                // {
                //     label: '甘先懿',
                //     value: '13735820244'
                // },
                // {
                //     label: '韩子龙',
                //     value: '19213092652'
                // },
                // {
                //     label: '刘昊雨',
                //     value: '13955709747'
                // },
                // {
                //     label: '郎志新',
                //     value: '18456239639'
                // },
                // {
                //     label: '刘林',
                //     value: '15655459224'
                // },
                // {
                //     label: '胡烁琳',
                //     value: '15655639323'
                // },
            ]
        };
    },
    created() {
        this.generateData().then((generatedData) => {
            this.data = generatedData;
        });
        this.getInspector()
    },
    computed: {
        filteredData() {
            const data = this.resultList.map(item => ({ label: item.room, pinyin: item.room, name: item.account }));
            return data.filter(item => {
                return item.name === this.selectMember;
            });
        }
    },
    methods: {
        getInspector() {
            const url = '/api/user/getAll'
            axios.post(url, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                this.member = res.data.filter(item => {
                    return item.role === 1;
                })
                this.selectMember = res.data[0].account
                // console.log(this.member)
            })
        },
        async generateData() {
            await this.getAllRoom(); 
            const data = [];
            const rooms = this.resultList.map(item => item);
            const pinyin = this.resultList.map(item => item.room);
            rooms.forEach((item, index) => {
                data.push({
                    label: item.room,
                    key: index,
                    pinyin: pinyin[index],
                    name: item.phone
                });
            });
            return data;
        },
        getAllRoom() {
            return new Promise((resolve, reject) => {
                const url = '/api/room/getTodayTask'
                axios.post(url, {}, {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.resultList = res.data;
                        resolve();
                    } else {
                        reject();
                    }
                }).finally(() => {
                    this.fullscreenLoading = false;
                });
            });
        },
        saveCurrentData() {
            this.$confirm('确定保存吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        let labels = [];
                        this.value.forEach(item => {
                            let foundItem = this.data.find(dataItem => dataItem.key === item);
                            if (foundItem) {
                                labels.push(foundItem.label);
                            }
                        });
                        console.log(labels);
                    }
                }
            });
        }
    }
};
</script>
<style>
.wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}
.el-transfer-panel {
    width: 100%;
}
.el-transfer__buttons {
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.el-transfer__buttons .el-button:nth-child(1) {
    margin: 0;
}
</style>

