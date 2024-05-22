<template>
    <div class="Vacate-Container">
        <div>
            <h2>请假</h2>
            <!-- <p style="font-size: 11px;">请假请提前与网络小组服务部负责人沟通</p>
            <p style="font-size: 11px;">第一次申请请先注册本程序账号<br>（需要手机验证 3月23前）</p>
            <p style="font-size: 11px;">跟辅导员请假一样 需要审核</p>
            <p style="font-size: 11px;">做的不好的地方 多多担待</p> -->
            <p style="font-size: 11px;">开发中...敬请期待</p>
            <div class="FormArea">
                <el-form v-model="formData" label-width="80px">
                    <el-form-item label="用户">
                        <el-select disabled v-model="formData.name" filterable placeholder="请选择你的名字">
                            <el-option v-for="item in user" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教室">
                        <el-input disabled>

                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input disabled placeholder="输入密码">

                        </el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="验证码">
                                <el-input disabled placeholder="输入验证码">
                                    
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <img style="height: 44px;" :src="yan_picUrl" alt="验证码" />
                        </el-col>
                    </el-row>
                    <el-form-item label="备注">
                        <el-input disabled max-height="300" maxlength="100" show-word-limit type="textarea" placeholder="备注">

                        </el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex;justify-content: flex-end;">
                    <el-button disabled>
                        立即提交
                    </el-button>
                </div>
            </div>
        </div>
        <div class="buttonGroup">
            
            <el-button disabled @click="openApplyListDialog">请假记录</el-button>
            
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-button disabled @click="Register">注册</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button disabled>登陆</el-button>
                </el-col>
            </el-row>
        </div>


        <el-dialog :before-close="handleClose" title="查看申请记录" :visible="ApplyListDialog">
            <ApplyList />
        </el-dialog>
    </div>
</template>
<script>
// import axios from 'axios'
import ApplyList from './ApplyTable.vue'
export default {
    components: {
        ApplyList
    },
    data() {
        return {
            user: [
                {
                    label: '甘先懿',
                    value: '甘先懿'
                },
                {
                    label: '韩子龙',
                    value: '韩子龙'
                }
            ],
            formData: {
                name: ''
            },
            ApplyListDialog: false,
            yan_picUrl: '',
            yan_captcha: '',
        }
    },
    created() {
        this.generateCaptcha()
    },
    methods: {
        Register() {
            this.$router.push('/register')
        },
        openApplyListDialog() {
            this.ApplyListDialog = true
        },
        handleClose(done) {
            done()
            this.ApplyListDialog = false
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
.Vacate-Container {
    min-height: calc(100vh - 120px);
    position: relative;
}
.Vacate-Container .buttonGroup {
    width: calc(40% - 40px);
    position: absolute;
    bottom: 0;
    left: 30%;
}
.Vacate-Container .buttonGroup .el-button {
    width: 100%;
    margin: 0;
}
.FormArea {
    width: 35%;
    margin: 0 auto;
}
.FormArea .el-select {
    width: 100%;
}
.el-dialog {
    min-height: 500px;
}

@media screen and (max-width: 768px) {
    .Vacate-Container .buttonGroup {
        width: calc(100% - 2px);
        left: 0;
    }
    .FormArea {
        width: 96%;
    }
    .el-dialog {
        width: 96%;
    }
}
@media screen and (max-height: 730px) {
    .Vacate-Container {
        padding-bottom: 80px;
    }
}
</style>