<template>
  <div class="home" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="intro">
      <h2 @click="clearCache">忽如一夜春风来 千树万树梨花开</h2>
      <p>心血来潮写的检查与请假系统，第一版写的冗杂故改了第二版；现用作测试，好用便继续维护，不好用就做罢</p>
      <p>在这里>> <a href="/">文档</a> &lt;&lt; 可以查看使用说明</p>
      <p>在这里>> <a href="/">Github</a> &lt;&lt; 可以获取源码</p>
      <el-button @click="ToLogin"><i class="el-icon-s-promotion"></i>去登录</el-button>
    </div>
    <div class="radian"></div>
    <!-- <img style="width: 100%;height: 80px;margin: 0" src="@/assets/img/radian.png" alt=""> -->
    <div class="function">
      <h3>&常用<span>功能</span></h3>
      <div class="card">
        <div class="item">
          <h2>请假</h2>
          <p>请假功能：</p>
          <p>标注请假将不分配检查任务，前提是需在请假前关联对应教室</p>
          <el-button>获取更多</el-button>
        </div>
        <div class="item">
          <h2>检查</h2>
          <p>检查功能：</p>
          <p>根据管理员的任务设置，自动化分配检查任务</p>
          <el-button>获取更多</el-button>
        </div>
        <div class="item">
          <h2>管理</h2>
          <p>管理系统</p>
          <p>综合人员管理、任务管理、检查管理、反馈管理为一体，实现有效监督</p>
          <el-button>获取更多</el-button>
        </div>
      </div>
    </div>
    <PublicFoot />
  </div>
</template>

<script>
import PublicFoot from '@/components/Foot/PublicFoot.vue'

export default {
  name: 'HomeView',
  components: {
    PublicFoot,
  },
  data() {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    clearCache() {
      localStorage.clear()
    },

    ToLogin() {
      // this.$router.push('/login')
      this.fullscreenLoading = true

      setTimeout(function() {
        this.fullscreenLoading = false
        this.$router.push('/login')
      }.bind(this), 1000)
    }
  }
}
</script>
<!-- split 分割 -->
<style>
.home {
  /* padding: 0 24px; */
  min-height: calc(100vh - 64px);
  /* min-height: 100vh; */
  width: 100%;
  /* background-color: antiquewhite; */
}
.home h3 {
  font-size: 36px;
  padding: 12px 0;
}
.home h3 span {
  border-bottom: 6px solid #76a9fa;
}

.home .intro {
  min-height: 240px;
  width: 100%;
}
.home .intro h2 {
  font-size: 64px;
  margin: 24px 0;
}
.home .intro p {
  width: 36%;
  line-height: 32px;
  font-size: 18px;
  color: #6B7280;
  margin: 8px auto;
  /* text-indent: 2rem; */
}
.home .intro a {
  color: rgb(28, 142, 229);
  text-decoration: none;
}
.home .intro .el-button {
  width: 200px;
}

.home .radian {
  background: url(@/assets/img/radian.png) 100% no-repeat;
  background-size: cover;
  width: 100%;
  height: 80px;
}

.home .function {
  margin: 0 0 24px 0;
  padding: 80px 0;
  width: 100%;
  min-height: 265px;
  background-color: #f3f4f6;
}
.home .function .card {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home .function .card .item {
  margin: 12px auto;
  padding: 24px;
  width: 384px;
  height: 185px;
  background-color: #F9FAFB;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left
}
.home .function .card .item h2,.home .function .card .item p {
  margin-bottom: 12px;
}
@media screen and (max-width: 768px) {
  .home .intro h2 {
    font-size: 28px;
    width: 90%;
    margin: 24px auto;
  }
  .home .intro p {
    width: 90%;
  }
  .home .intro .el-button {
    width: 90%;
  }
}
</style>