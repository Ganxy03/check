<template>
    <div>
        <div @click="LinkToVacate" style="color: slategrey;font-size: 11px;display: flex;justify-content: flex-start;" class="cp">&lt;返回</div>
        <h2>注册</h2>

        <div class="FormArea">
            <el-form v-model="formData" label-width="80px">
                <el-form-item label="名字">
                    <el-input v-model="formData.name" placeholder="输入你的名字">

                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.pwd" placeholder="输入密码">

                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="formData.pwd2" placeholder="再次输入密码">
                        
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.phone" placeholder="输入邮箱">
                        <el-button  slot="append" @click="SendMsmBtn">发送</el-button>
                    </el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="验证码">
                            <el-input v-model="formData.verify" placeholder="输入验证码">

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <img style="height: 44px;" :src="yan_picUrl" alt="验证码" />
                    </el-col>
                </el-row>
                <el-form-item label="教室">
                      <el-select
                        v-model="roomValue"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择教室标签">
                        <el-option
                        v-for="item in allRooms"
                        :key="item.id"
                        :label="item.room"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: flex-end;">
                <el-button @click="RegisterBtn">
                    立即注册
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            formData: {
                name: '',
                pwd: '',
                pwd2: '',
                verify: '',
                phone: '',
                room: ''
            },
            yan_picUrl: '',
            yan_captcha: '',
            allRooms: [],
            roomValue: []
        }
    },
    created() {
        this.generateCaptcha()
        // this.getAllRooms()
    },
    methods: {
        getAllRooms() {
            const url = '/api/roomItem/getAllItem'

            axios.post(url, {}, {
                headers: {
                    'verifyCode': '2024'
                }
            }).then(res => {
                res.data.forEach(area => {
                // 检查area对象是否包含children属性
                if (area.children) {
                    // 将children中的每个对象的id和room属性提取出来，并添加到allRooms数组中
                    area.children.forEach(child => {
                        this.allRooms.push({
                                id: child.id,
                                room: child.room
                            });
                        });
                    }
                });
                console.log(this.allRooms);
            })
        },
        LinkToVacate() {
            this.$router.push('/vacate').catch(console.error())
        },
        SendMsmBtn() {
            if(this.formData.phone == '') {
                this.$message({
                    message: '手机为空',
                    type: 'warning'
                })
            } else {
                this.$message({
                    message: '发送成功',
                    type: 'success'
                })
            }
        },
        sendMsm() {
            // /Tencent-sms/Send-sms

            const url = '/api/Tencent-sms/Send-sms'
            axios.post(url,{

                },
                {
                headers: {
                    'verifyCode': '2024'
                }
            }).then((res) => {
                if(res.status == 200) {
                    // console.log(res.data)
                    this.$message({
                        message: '发送成功',
                        type: 'success'
                    })
                }
            })

        },
        RegisterBtn() {
            if(this.formData.name == '') {
                this.$message({
                    message: '名字为空',
                    type: 'warning'
                })
            } else if(this.formData.pwd == '') {
                this.$message({
                    message: '名字不能为空',
                    type: 'warning'
                })
            } else if(this.formData.pwd2 == '') {
                this.$message({
                    message: '确认密码为空',
                    type: 'warning'
                })
            } else if(this.formData.phone == '') {
                this.$message({
                    message: '手机为空',
                    type: 'warning'
                })
            } else if(this.formData.verify == '') {
                this.$message({
                    message: '验证码为空',
                    type: 'warning'
                })
            } else if(this.formData.room == '') {
                this.$message({
                    message: '教室为空',
                    type: 'warning'
                })
            } else {
                console.log(this.formData)
            }
        },
        generateCaptcha() {
            const img_w = 100;
            const img_h = 40;
            const char_len = 4;
            const font = '25px Arial';

            const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
            let code = '';
            for (let i = 0; i < char_len; i++) {
            code += char[Math.floor(Math.random() * char.length)];
            }
            // console.log(code)
            const canvas = document.createElement('canvas');
            canvas.width = img_w;
            canvas.height = img_h;
            const ctx = canvas.getContext('2d');

            // 背景色
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, img_w, img_h);

            // 画点
            for (let i = 0; i < 300; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.arc(Math.random() * img_w, Math.random() * img_h, 1, 0, 2 * Math.PI);
            ctx.fill();
            }

            // 画线
            for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * img_w, Math.random() * img_h);
            ctx.lineTo(Math.random() * img_w, Math.random() * img_h);
            ctx.stroke();
            }

            // 画矩形
            ctx.fillStyle = 'rgba(144, 144, 144, 0.8)';
            ctx.fillRect(0, 0, img_w, img_h);

            // 写文字
            ctx.font = font;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 1)`;
            const textWidth = ctx.measureText(code).width;
            ctx.fillText(code, (img_w - textWidth) / 2, (img_h + parseInt(font) - 20) / 2);
            // ctx.fillText(code, (textWidth), (textWidth));

            this.yan_captcha = code
            // console.log(this.captcha)
            // console.log(canvas.toDataURL('image/png'));
            this.yan_picUrl = canvas.toDataURL('image/png')
        },
    }
}
</script>

<style>
.FormArea {
    width: 35%;
    margin: 0 auto;
}
.FormArea .el-select {
    width: 100%;
}
@media screen and (max-width: 768px) {
    .FormArea {
        width: 96%;
    }
}
</style>