<template>
    <div class="publicFoot">
        <div class="first">
            <div class="infos">
                <img src="@/assets/img/dog.jpg" alt="">
                <h2>Check</h2>
            </div>
           <div style="display: flex;justify-content: space-between;flex-wrap: wrap;width: 100%;">
                <ul class="intros">
                    <li><a href="">2192767718@qq.com</a></li>
                    <li>如遇问题请联系</li>
                </ul>
                <div class="navi">
                    <ul style="display: flex;font-size: 16px;margin-top: 24px">
                        <ul style="margin: 0 6px;list-style: none;">
                            <li style="margin-bottom: 6px;"><h4>使用指南</h4></li>
                            <li>文档中心</li>
                        </ul>
                        <ul style="margin: 0 6px;list-style: none;">
                            <li style="margin-bottom: 6px;"><h4>关于我们</h4></li>
                            <li>关于我们</li>
                            <li>加入我们</li>
                        </ul>
                        <ul style="margin: 0 6px;list-style: none;">
                            <li style="margin-bottom: 6px;"><h4>网站站群</h4></li>
                            <li>晨跑告示</li>
                            <li>信息门户</li>
                        </ul>
                    </ul>
                </div>
           </div>
        </div>

        <hr style="margin: 24px auto;width: 96%;">

        <div class="two">
            <ul style="width: 200px;list-style: none;margin: 12px 0;text-align: left;">
                <li>&copy; Ganxy | 2024</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PublicFoot',
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style>
.publicFoot {
    min-height: 220px;
    width: 100%;
    /* display: flex;
    justify-content: space-between; */
}
.publicFoot .first {
    height: 120px;
    width: 90%;
    margin: 36px auto;
}
.publicFoot .first .infos {
    display: flex;
}
.publicFoot .first .infos img {
    width: 32px;
    border-radius: 50%;
    margin: 0 12px 0 0;
}
.publicFoot .first .intros {
    padding: 0;
    width: 200px;
    margin: 24px 0 0 0;
}
.publicFoot .first .intros li {
    list-style: none;
    text-align: left;
    color: #4B5563;
}
.publicFoot .first .intros li a {
    color: #4B5563;
    text-decoration: none;
}


.publicFoot .first .navi {
    width: 400px;
    display: flex;
    justify-content: space-between;
}
.publicFoot .first .navi ul {
    padding: 0;
}

@media screen and (max-width: 768px) {
    .publicFoot .first {
        height: 180px;
    }
}
</style>