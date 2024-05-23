<template>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
      </el-option>
    </el-select>
  </template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      Selected: [],
      value: '',
      options: [
        
      ],
    }
  },
  created() {
    this.LinkClass()
 },
  methods:{
    LinkClass() {
        const url='/api/room/getAllRoom';
        axios.post(url,{},{
            headers: {
                'verifyCode': '2024'
            }
        }).then((res) => {
            this.options = res.data;
            console.log(this.options);


        })
    }
  }
}
</script>