<template>
  <div id="app">
    <TopMenu class="nav"/>
    <router-view class="content"/>

    <el-backtop :visibility-height="100" :bottom="100">
      
    </el-backtop>
  </div>
</template>
<script>
import '@/assets/css/darkness.css'
import TopMenu from '@/components/Menu/TopMenu.vue'
export default {
  components: {
    TopMenu,
  },
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>
<style>
* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* height: 100vh; */
}

#app .nav {
  width: calc(100% - 32px);
  position: fixed;
  z-index: 999;
}
#app .content {
  margin-top: 10%;
  position: absolute;
  top: 64px;
  margin: 0 auto;
  /* left: 30%; */
}
 .container{
  /* margin-top: 100px; */
}
</style>
