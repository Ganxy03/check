<template>
    <div style="height: calc(70vh - 100px);">
        <!-- <el-alert
            title="因为数据处理比较繁冗 所以响应会有些慢"
            type="info">
        </el-alert> -->
        <el-row>
            <el-col :span="24">
                <el-select style="width: 100%;" v-model="areaValue" placeholder="请选择">
                    <el-option
                    style="width: 100%;"
                    v-for="item in AllSorts"
                    :key="item.id"
                    :label="item.area"
                    :value="item.area">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-top: 16px">
            <el-col :span="24">
                <el-autocomplete
                style="width: 100%;max"
                v-model="selectRoom"
                :fetch-suggestions="querySearchAsync"
                placeholder="请选择教室"
                @select="handleSelect">
                </el-autocomplete>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col class="uploadList" style="display: flex;justify-content: flex-start;margin-top: 12px;width: 100%;" :span="24">
                <el-upload
                action="#"
                :auto-upload="false"
                :file-list="fileList"
                list-type="picture"
                :limit="3"
                :before-upload="file => beforeUpload(file)">
                <el-button style="width: 80px;display: flex;justify-content: flex-start;" size="mini">选择文件</el-button>
                <template slot="file" slot-scope="{file}">
                    <el-row>
                        <el-col style="" :span="24">
                            <!-- class="el-upload-list__item-thumbnail" -->
                            <!-- style="height: 70px;width: 70px;" -->
                            <!-- vertical-align: middle;
                            display: inline-block;
                            width: 70px;
                            height: 67px;
                            float: left;
                            position: relative;
                            z-index: 1;
                            margin-left: -80px;
                            background-color: #FFF; -->
                            <!-- style="height: 70px;width: 70px;display: inline-block;position: relative;margin-left: -80px;" -->
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span style="color: #409EFF;font-size: 13px;" class="cp">{{file.name}}</span><br>
                            <span style="color: #409EFF;font-size: 13px;" @click="showFile(file)" class="cp">(点击查看)</span><br>
                            <span v-if="file.status == 'ready'" class="cp" @click="uploadFile(file)" style="color: #409EFF;">上传 </span>
                            <span v-if="file.status == 'ready'" class="cp" @click="removeFile(file)" style="color: #409EFF;"> 移除</span>
                            <span v-else class="cp" style="color: #409EFF;">已上传</span>
                        </el-col>
                    </el-row>
                </template>
                </el-upload>
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="24">

            </el-col>
        </el-row> -->
        <!-- <div style="display: flex;justify-content: flex-end;margin-top: 12px">
            <el-button @click="uploadFile">查看记录</el-button>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            AllSorts: [],
            allRooms: [],
            areaValue: '东教',
            selectRoom: '',
            timeout:  null,
            fileList: [],
        }
    },
    created() {
        this.getAllSort()
        this.loadAllRoom()
    },
    mounted() {
        this.loadAllRoom();
    },
    methods: {
        getAllSort() {
            // /roomItem/getAllSort
            
            const url = '/api/roomItem/getAllSort'
            axios.post(url,{
                
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log("res.data:"+res.data)
                    this.AllSorts = res.data
                    // this.$message({
                    //     message: '查询成功',
                    //     type: 'success'
                    // })
                }
            })
        },
        loadAllRoom() {
            const url = '/api/roomItem/getAllItem'
            axios.post(url,{
                
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log("res.data:"+res.data)
                    this.allRooms = res.data
                }
            })
            return this.allRooms
        },
        querySearchAsync(queryString, cb) {
            // var selectedArea = this.allRooms.find(area => area.area === this.areaValue);
            // var results = [];
            // if (selectedArea) {
            //     results = selectedArea.children.map(item => {
            //         return {
            //             value: item.room,
            //             label: item.room
            //         };
            //     });
            // }
            // clearTimeout(this.timeout);
            // this.timeout = setTimeout(() => {
            //     cb(results);
            // }, 3000 * Math.random());
            var selectedArea = this.allRooms.find(area => area.area === this.areaValue);
            var results = [];
            if (selectedArea) {
                // Filter the children based on input query
                results = selectedArea.children.filter(item => item.room.toLowerCase().startsWith(queryString.trim().toLowerCase()))
                    .map(filteredItem => {
                        return {
                            value: filteredItem.room,
                            label: filteredItem.room
                        };
                    });
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        handleSelect(item) {
            console.log(item);
        },
        // inspectRoom() {
        //     this.querySearchAsync(this.selectRoom, (results) => {
        //         if(results.some(result => result.value === this.selectRoom)) {
        //             // console.log(`${this.selectRoom} is in the search results.`);

        //         } else {
        //             // console.log(`${this.selectRoom} is not in the search results.`);
        //             this.$message({
        //                 message: '教室不存在',
        //                 type: 'warning'
        //             })
        //             this.selectRoom = ''
        //             // console.log(this.roomIsExist)

        //         }
        //     });
        // },
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
        async beforeUpload(file) {
            // console.log(this.selectRoom)
            const formData = new FormData();
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
            const newFileName = this.selectRoom + fileExtension;

            const blob = new Blob([file.raw], { type: file.type });
            formData.append('file', blob, newFileName);

            // console.log(formData)
            
            const config = {
                headers: {
                    'verifyCode': '2024'
                }
            };
            
            try {
                const response = await axios.post('/api/problem/uploadFile', formData, config);
                // console.log(response)
                const uploadedPath = response.data.split('File uploaded to: ')[1].trim();
                const baseUrl = 'http://localhost:5024';
                const relativePath = uploadedPath.replace(/\\/g, '/').replace('D:/APP/UploadTest/', '');
                // eslint-disable-next-line
                const fileUrl = `${baseUrl}/${relativePath}`;
                // console.log(fileUrl)
                // console.log(item)

                // selectRoom
                const phone = localStorage.getItem('phone')
                const url = '/api/problem/record'
                axios.post(`${url}?room=${this.selectRoom}&url=${fileUrl}&phone=${phone}`,{
                    
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
                        this.fileList.push({
                            name: this.selectRoom,
                            url: file.url,
                            isUpload: true
                        });
                    }
                })

                // this.fileList.push({
                //     name: this.selectRoom.name,
                //     url: file.url,
                //     isUpload: true
                // });
            } catch (error) {
                console.error(error);
                // 处理上传失败的逻辑
            }
        },
        // eslint-disable-next-line
        // async uploadFile(file, item) {
        // eslint-disable-next-line
        uploadFile(file) {
        // this.inspectRoom()
        // await this.inspectRoom();
            this.querySearchAsync(this.selectRoom, (results) => {
                if(results.some(result => result.value === this.selectRoom)) {
                    // console.log(`${this.selectRoom} is in the search results.`);
                    this.$confirm('确定上传' + file.name + ' 吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: action => {
                            if(action == 'confirm') {
                                this.beforeUpload(file)
                            }
                        }
                    });
                } else {
                    // console.log(`${this.selectRoom} is not in the search results.`);
                    this.$message({
                        message: '教室不存在',
                        type: 'warning'
                    })
                    this.selectRoom = ''
                    // console.log(this.roomIsExist)

                }
            });
        },
        removeFile(file) {
            console.log(file)
        }
    }
}
</script>

<style>
.uploadList div {
    width: 100%;
}
</style>