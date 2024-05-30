<template>
    <div>
      <el-select v-model="value" multiple
    filterable
    allow-create
    @change="handSelect"
    default-first-option placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.room"
        :value="item.room">
      </el-option>
    </el-select>
    <!-- <el-button @click="getSelectedOptions">获取选中的选项</el-button> -->

    </div>
    
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
            // console.log(this.options);
            let result = res.data.reduce((acc, item) => {
              if(item.children && item.children.length > 0){
                acc = acc.concat(item.children);
              }
              return acc;
            }, []);

            this.options = result;
            // console.log(result);
        })
    },
    handSelect() {
            localStorage.setItem('class', this.value);
        },
    getSelectedOptions() {
    console.log(this.value); // 输出被选中的选项的值
  }
  }
}
</script>