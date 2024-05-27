<template>
    <div>
        <div style="display: flex;justify-content: space-between;align-items: center">
            <h3 style="">教室管理</h3>
            <div>
                <el-button @click="developing" disabled size="mini">教室一览</el-button>
                <el-button @click="openNewRoomDialog" size="mini">新增</el-button>
            </div>
        </div>
        <div>
            <el-table
            row-key="id"
            height="40vh"
            :data="RoomData"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="area"
                label="区域">
                </el-table-column>
                <el-table-column
                prop="room"
                label="教室">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="show(scope.row)" v-if="scope.row.area == '机房' || scope.row.area == '东教' || scope.row.area == '西教' || scope.row.area == '经管' || scope.row.area == '建工'" size="mini">修改</el-button>
                    <el-button v-else size="mini" type="danger">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加教室" :visible.sync="NewRoomDialog">
            <el-row>
                <el-col :span="6">
                    <h4 style="margin: 0;line-height: 40px;height: 40px;">区域:</h4>
                    <el-link @click="newSortBtn" style="color: #409EFF;font-size: 11px;">新建分类</el-link>
                </el-col>
                <el-col :span="18">
                    <el-select style="width: 100%;" v-model="newRoom.AreaValue" placeholder="请选择区域">
                        <el-option
                        v-for="item in roomArea"
                        :key="item.area"
                        :label="item.area"
                        :value="item.area">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-top: 12px;">
                <el-col :span="6">
                    <h4 style="margin: 0;line-height: 40px;">教室:</h4>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="newRoom.label" placeholder="请输入教室"></el-input>
                </el-col>
            </el-row>
            <div style="display: flex;justify-content: end;margin-top: 12px;">
                <el-button @click="AddBtn">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            newRoom: {
                AreaValue: '',
                label: ''
            },
            roomArea: [],
            RoomData:  [],
            NewRoomDialog: false,
        }
    },
    created() {
        // this.getAllSort()
        this.getAll()
    },
    methods: {
        developing() {
            this.$message({
                message: '开发中..',
                type: 'warning'
            })
        },
        show(row) {
            console.log(row)
        },
        openNewRoomDialog() {
            this.NewRoomDialog = true
        },
        getAll() {
            // /roomItem/getAllItem
            const url = '/api/room/getAllRoom'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res.data)
                    res.data.forEach((item, index) => {
                        item.id = -(index + 1); // 从1开始递增赋值给id字段
                    });
                    this.RoomData = res.data
                }
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
                    this.roomArea = res.data
                }
            })
        },
        AddBtn() {
            // console.log('das')
            if(this.newRoom.AreaValue == '') {
                this.$message({
                    message: '区域为空',
                    type: 'warning'
                })
                return
            } else if(this.newRoom.label == '') {
                this.$message({
                    message: '教室为空',
                    type: 'warning'
                })
                return
            } else {
                // console.log(this.newRoom)
                this.$confirm('确定添加 '+this.newRoom.AreaValue+this.newRoom.label+' ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action => {
                        if(action == 'confirm') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.NewRoomDialog = false
                        }
                    }
                });
            }
        },
        newSortBtn() {
            this.$prompt('请输入要新建的分类', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action, value) => {
                    if(action == 'confirm') {
                        // console.log(value._data.inputValue)
                        if(value._data.inputValue == null) {
                            this.$message({
                                type: 'warning',
                                message: '不能为空'
                            });
                            this.newSortBtn()
                            return
                        }
                        this.$message({
                            type: 'success',
                            message: '新建的分类是: ' + value._data.inputValue
                        });
                    }
                }
            });
        }
    }
}
</script>
<style>
@media screen and (max-width: 768px) {
    .el-dialog {
        width: 96%;
        min-height: 30vh;
    }
}
</style>