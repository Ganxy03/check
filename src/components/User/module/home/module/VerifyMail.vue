<template>
     <div class="input-group">
        <label >验证码:</label>
        <el-input style="width: 80%;" maxlength="4" @change="handInput" v-model="enrollForm.verify">
            </el-input>
            <img style="height: 32px;width: 17%;" :src="yan_picUrl" alt="验证码" />
    </div>
</template>
<script>
export default{
    data(){
        return{
            enrollForm:{
                verify: '',
                
            },
            yan_picUrl: '',
            yan_captcha: '',
        }
    },
    created() {
        this.generateCaptcha()
        // this.getYan()
    },
    methods:{
        handInput() {
            localStorage.setItem('verify', this.enrollForm.verify);
        },
        // getYanmail(){
        //     if(this.enrollForm.verify == '') {
        //         this.$message({
        //             message: '请输入验证码',
        //             type: 'warning'
        //         })
        //         return
        //     } else if(this.enrollForm.verify != this.yan_captcha) {
        //         this.enrollForm.verify = ''
        //         this.generateCaptcha()
        //         this.$message({
        //             message: '验证码错误',
        //             type: 'warning'
        //         })
        //         return
        //     }
        // },
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
            localStorage.setItem('code', code)
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

            this.yan_captcha = code
            this.yan_picUrl = canvas.toDataURL('image/png')
        },
        
    }
}
</script>