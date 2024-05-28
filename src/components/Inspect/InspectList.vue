<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading" style="height: 40vh;overflow-y: auto;">
        
        <el-empty description="今日任务还没有分配哦" v-if="ListData == ''"></el-empty>
        <el-row>
            <el-col :span="24" v-for="item in ListData" :key="item.room">
                <el-row>
                    <el-col style="line-height: 40px" :span="12">
                        {{ item.room }}
                    </el-col>
                    <el-col :span="12">
                        <el-button v-if="item.inspect == 0" type="text" @click="inspectBtn(item)">检查</el-button>
                        <el-button type="text"><i v-if="item.inspect == 1" class="el-icon-check"></i></el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        
        
        <el-dialog title="检查" :visible.sync="InspectDialog">
            <el-form :data="currentData" label-width="80px">
                <el-form-item label="教室">
                    <el-input v-model="currentData.room" disabled></el-input>
                </el-form-item>
                <el-form-item label="维保人">
                    <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="请假">
                    <el-tag type="success">未请假</el-tag>
                </el-form-item>
                <el-form-item label="打扫情况">
                    <el-radio v-model="currentData.sweep" label="是">已打扫</el-radio>
                    <el-radio v-model="currentData.sweep" label="否">未打扫</el-radio>
                </el-form-item>
                <el-form-item label="评价">
                    <el-rate
                    v-model="currentData.score"
                    show-text
                    :texts= "['极差', '较差', '一般', '良好', '非常好']">
                    </el-rate>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="currentData.mark" type="textarea" placeholder="其他问题请写备注 务必上传图片作为附件"></el-input>
                </el-form-item>
                <el-form-item label="附件上传">
                    <el-upload
                    action="#"
                    :auto-upload="false"
                    :file-list="currentData.fileList"
                    list-type="picture"
                    :limit="1"
                    :before-upload="file => beforeUpload(file)">
                        <el-button type="text">
                            选择图片
                        </el-button>
                        <template slot="file" slot-scope="{file}">
                        <el-row>
                            <el-col style="" :span="24">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span style="color: #409EFF;font-size: 13px;">{{file.name}}</span><br>
                                <span @click="showFile(file)" style="color: #409EFF;font-size: 13px;cursor: pointer;">(点击查看)</span><br>
                                <span @click="uploadFile(file)" v-if="file.status == 'ready'" style="color: #409EFF;cursor: pointer;">上传 </span>
                                <span v-if="file.status == 'ready'" style="color: #409EFF;cursor: pointer;"> 移除</span>
                                <span v-else style="color: #409EFF;">已上传</span>
                            </el-col>
                        </el-row>
                    </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: flex-end;">
                <el-button @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    
    data() {
        return {
            fullscreenLoading: false,
            // dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            ListData: [
                // {
                //     room: '一号机房',
                //     detected: 0,
                //     fileList: []
                // },
                // {
                //     room: '二号机房',
                //     detected: 1,
                //     fileList: []
                // },
                // {
                //     room: '三号机房',
                //     detected: 0,
                //     fileList: []
                // },
                // {
                //     room: '四号机房',
                //     detected: 1,
                //     fileList: []
                // },
                // {
                //     room: '五号机房',
                //     detected: 1,
                //     fileList: []
                // },
                // {
                //     room: '六号机房',
                //     detected: 0,
                //     fileList: []
                // },
                // {
                //     room: '七号机房',
                //     detected: 0,
                //     fileList: []
                // },
            ],
            InspectDialog: false,
            // fileList: [],
            currentData: [],
        }
    },
    created() {
        this.getTodayTask()
    },
    methods: {
        async beforeUpload(file) {

            const allowedExtensions = ['.jpeg', '.png', '.gif', '.bmp', '.webp', '.heic'];
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            
            console.log("type: "+fileExtension)
            if (!allowedExtensions.includes(fileExtension)) {
                this.$message({
                    message: 'Only JPEG, PNG, GIF, BMP, WebP, and HEIC files are allowed.',
                    type: 'warning'
                })
                return false; // 返回 false 以阻止文件上传
            }


            const formData = new FormData();
            // const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
            // const newFileName = room + fileExtension;
            const newFileName = file.name

            // console.log(fileExtension)
            console.log(newFileName)
            const blob = new Blob([file.raw], { type: fileExtension });
            formData.append('file', blob, newFileName);

            // console.log(formData)

            const config = {
                headers: {
                    'verifyCode': '2024'
                }
            };

            try {
                const response = await axios.post('/api/upload/uploadFile', formData, config);
                const uploadedPath = response.data;
                const baseUrl = 'http://124.221.138.245:8899';
                const relativePath = uploadedPath.replace(/\\/g, '/').replace('/www/wwwroot/Task/Upload/', '');
                const fileUrl = `${baseUrl}/${relativePath}`;
                console.log(fileUrl)
                file.status = 'success'

                this.currentData.evidence = fileUrl

            } catch (error) {
                console.error(error);
                // 处理上传失败的逻辑
            }
        },
        uploadFile(file) {
            this.$confirm('确定上传' + file.name + ' 至 ' + this.currentData.room + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        this.beforeUpload(file)
                    }
                }
            });
        },
        showFile(file) {
            // console.log(file)
            const dialogImageUrl = file.url;
            
            // console.log(dialogImageUrl)
            this.$alert('<img style="width: 100%;" src="'+ dialogImageUrl +'">', '查看', {
                dangerouslyUseHTMLString: true,
                callback: action => {
                    if(action == 'comfirm') {
                        // console.log('comfirm')
                    }
                }
            });
        },
        submit() {
            // console.log(this.currentData)
            const url = '/api/room/inspect'
            axios.post(`${url}?room=${this.currentData.room}&sweep=${this.currentData.sweep}&scope=${this.currentData.score}&mark=${this.currentData.mark}&evidence=${this.currentData.evidence}&inspector=${localStorage.getItem('account')}`,{
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                if(res.data == 'Inspect success') {
                    this.$message({
                        message: '检查成功',
                        type: 'success'
                    })
                    this.InspectDialog = false
                    this.getTodayTask()
                }
            })
        },
        getTodayTask() {
            this.fullscreenLoading = true
            const url = '/api/room/getTodayTask'
            axios.post(url,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                this.ListData = res.data.filter(item => item.account === localStorage.getItem('account'));

                // console.log(this.ListData)
            }).finally(() => {
                this.fullscreenLoading = false;
            });
        },
        inspectBtn(item) {
            // console.log(item)
            this.currentData = item
            this.currentData.fileList = []
            this.InspectDialog = true
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