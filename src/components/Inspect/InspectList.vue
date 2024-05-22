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
                    :limit="3"
                    :before-upload="file => beforeUpload(file, currentData)">
                        <el-button disabled type="text">
                            选择图片
                        </el-button>
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
            fileList: [],
            currentData: [],
        }
    },
    created() {
        this.getTodayTask()
    },
    methods: {
        // uploadFile() {
        //     // const url = '/api/upload/uploadFile'
        // },
        submit() {
            console.log(this.currentData)
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
        removeFile() {
            // console.log(file, item);
            // const index = item.fileList.indexOf(file);

            // if (index !== -1) {
            // // 如果找到了要移除的文件，使用splice方法将其从fileList中删除
            // item.fileList.splice(index, 1);
            // this.$refs.uploadFile.abort()
        },
        async beforeUpload(file, item) {
            const formData = new FormData();
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
            const newFileName = item.room + fileExtension;

            const blob = new Blob([file.raw], { type: file.type });
            formData.append('file', blob, newFileName);

            // console.log(formData)
            
            const config = {
                headers: {
                    'verifyCode': '2024'
                }
            };
            
            try {
                const response = await axios.post('/api/inspect/uploadFile', formData, config);
                // console.log(response)
                const uploadedPath = response.data.split('File uploaded to: ')[1].trim();
                const baseUrl = 'http://localhost:5024';
                const relativePath = uploadedPath.replace(/\\/g, '/').replace('D:/APP/UploadTest/', '');
                // eslint-disable-next-line
                const fileUrl = `${baseUrl}/${relativePath}`;
                // console.log(fileUrl)
                // console.log(item.room)
                const phone = localStorage.getItem('phone')
                const url = '/api/inspect/record'
                axios.post(`${url}?room=${item.room}&url=${fileUrl}&phone=${phone}`,{
                    
                    },
                    {
                    headers: {
                        'verifyCode': '2024'
                    }
                }).then((res) => {
                    if(res.status == 200) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        })
                        item.fileList.push({
                            name: item.room,
                            url: file.url,
                            isUpload: true
                        });
                    }
                })

                // item.fileList.push({
                //     name: item.room,
                //     url: file.url,
                //     isUpload: true
                // });
            } catch (error) {
                console.error(error);
                // 处理上传失败的逻辑
            }
        },
        uploadFile(file, item) {
            // console.log(file)
            // console.log(item)
            this.$confirm('确定上传' + file.name + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: action => {
                    if(action == 'confirm') {
                        this.beforeUpload(file, item)
                    }
                }
            });
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