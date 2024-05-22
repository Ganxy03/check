<template>
  <div style="height: calc(70vh - 100px);">
    <div>
      <el-alert
        title="因为数据处理比较繁冗 所以响应会有些慢"
        type="info">
      </el-alert>
      <el-select style="float: left;" v-model="selectDate" placeholder="请选择">
        <el-option
        v-for="item in SelectDate"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="exportExcel" style="float: right;" size="mini">导出数据</el-button>
    </div>
    <!--当 row 中包含 children 字段时，被视为树形数据。渲染树形数据时，必须要指定 row-key。-->
    <!--通过指定 row 中的 hasChildren 字段来指定哪些行是包含子节点。children 与 hasChildren 都可以通过 tree-props 配置。-->
    <el-table
      ref="excelTable"
      height="50vh"
      row-key="id"
      :data="filteredTableData"
      :header-cell-style="{
        textAlign: 'center',
        background: 'rgba(0, 103, 214, 0.1)',
      }"
      :cell-style="{ paddingLeft: '5%' }"
      highlight-current-row>
      <el-table-column
        prop="time"
        label="日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="教室"
        prop="room"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="charge"
        label="维保人"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mark"
        label="备注"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
      >
      <template>
        <el-button type="text">查看</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import { exportExcel } from '../../utils/index'
export default {
  data() {
    return {
        changeFx:false,
        tableData:[],
        SelectDate: [
            {
                label: '今天',
                value: 'today'
            },
            {
                label: '昨天',
                value: 'yestoday'
            },
            {
                label: '过去一周',
                value: 'lastWeek'
            },
            {
                label: '过去一月',
                value: 'lastMonth'
            }
        ],
        selectDate: 'today',
        tempImgUrl: ''
    };
  },
  mounted(){
      // this.tableData = [
      //     {"path":"F:\\ppt资源","modifyTime":"2023-02-07 12:42:06","children":[
      //         {"path":"F:\\照片资源\\111.jpg","modifyTime":"2022-11-01 10:12:09","resourceName":"111.jpg","id":"1-1","folderName":""},
      //         {"path":"F:\\照片资源\\888.jpg","modifyTime":"2023-02-07 12:42:06","resourceName":"888.jpg","id":"1-2","folderName":""},
      //         {"path":"F:\\照片资源\\111.jpg","modifyTime":"2022-11-01 10:12:09","resourceName":"111.jpg","id":"1-3","folderName":""},
      //         {"path":"F:\\照片资源\\888.jpg","modifyTime":"2023-02-07 12:42:06","resourceName":"888.jpg","id":"1-4","folderName":""},
      //     ],"resourceName":"","id":1,"folderName":"东教"},
      //     {"path":"F:\\照片资源","modifyTime":"2023-02-07 12:42:06","children":
      //         [{"path":"F:\\照片资源\\111.jpg","modifyTime":"2022-11-01 10:12:09","resourceName":"111.jpg","id":"2-1","folderName":""},
      //         {"path":"F:\\照片资源\\888.jpg","modifyTime":"2023-02-07 12:42:06","resourceName":"888.jpg","id":"2-2","folderName":""}],
      //     "resourceName":"","id":2,"folderName":"西教"},
      //     {"path":"F:\\留言资源","modifyTime":"2023-02-07 12:41:53","children":
      //         [{"path":"F:\\留言资源\\777.jpg","modifyTime":"2023-02-07 11:26:54","resourceName":"777.jpg","id":"3-1","folderName":""},
      //         {"path":"F:\\留言资源\\map.jpg","modifyTime":"2023-02-07 12:41:53","resourceName":"map.jpg","id":"3-2","folderName":""}],
      //     "resourceName":"","id":3,"folderName":"经管"},
      //     {"path":"F:\\留言资源","modifyTime":"2023-02-07 12:41:53","children":
      //         [{"path":"F:\\留言资源\\777.jpg","modifyTime":"2023-02-07 11:26:54","resourceName":"777.jpg","id":"4-1","folderName":""},
      //         {"path":"F:\\留言资源\\map.jpg","modifyTime":"2023-02-07 12:41:53","resourceName":"map.jpg","id":"4-2","folderName":""}],
      //     "resourceName":"","id":4,"folderName":"建工"},
      //     {"path":"F:\\留言资源","modifyTime":"2023-02-07 12:41:53","children":
      //         [{"path":"F:\\留言资源\\777.jpg","modifyTime":"2023-02-07 11:26:54","resourceName":"777.jpg","id":"5-1","folderName":""},
      //         {"path":"F:\\留言资源\\map.jpg","modifyTime":"2023-02-07 12:41:53","resourceName":"map.jpg","id":"5-2","folderName":""}],
      //     "resourceName":"","id":5,"folderName":"机房"}
      // ];
      
  },
  computed: {
    filteredTableData() {
      // return this.ClockRecord.filter(item => item.time === this.selectDate);
      if (this.selectDate != '') {
        let startDate = new Date();
        let endDate = new Date();
        
        if (this.selectDate === 'today') {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
        } else if (this.selectDate === 'yestoday') {
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
        } else if (this.selectDate === 'lastWeek') {
            startDate.setDate(startDate.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
        } else if (this.selectDate === 'lastMonth') {
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
        }
        
        console.log(this.tableData)
        let filteredData = this.tableData.filter(item => {
          let itemDate = new Date(item.time);
          // console.log(itemDate)
          // console.log(startDate)
          // console.log(endDate)
          // return itemDate >= startDate && itemDate <= endDate;
          return itemDate >= startDate && itemDate <= endDate;
        });
        // console.log(filteredData)

        return filteredData;
        // return this.parselData(filteredData)
      } else {
        return this.tableData;
      }
    },
  },
  created() {
    // this.getAll()
    this.getAllInspect()
  },
  methods:{
    getAllInspect() {
      const url = '/api/room/getAllInspect'
      axios.post(url, {}, {
        headers: {
          'verifyCOde': '2024'
        }
      }).then(res => {
        // console.log(res.data);
        this.tableData = res.data.filter(item => {
          return item.inspector === localStorage.getItem('account');
        });
        // console.log(this.tableData);
      })
    },
    parselData(data) {
      const transformData = data.reduce((acc, curr) => {
          const existing = acc.find(item => item.folderName === curr.sort);
          
          if (existing) {
              existing.children.push({
                  path: curr.url,
                  modifyTime: curr.time,
                  resourceName: curr.room,
                  // id: `${existing.id}-${existing.children.length + 1}`,
                  id: `${existing.id}-${existing.children.length + 1}`,
                  folderName: ""
              });
              existing.resourceName = existing.children.length;
          } else {
              acc.push({
                  path: curr.sort,
                  children: [
                      {
                          path: curr.url,
                          modifyTime: curr.time,
                          resourceName: curr.room,
                          // id: `${curr.id}-1`,
                          id: `${acc.length + 1}-1`,
                          folderName: ""
                      }
                  ],
                  // resourceName: curr.id,
                  resourceName: 1,
                  id: acc.length + 1,
                  folderName: curr.sort
              });
          }
          return acc;
      }, []);
      // console.log("transformData:"+transformData)
      return transformData
    },
    handleView(row) {
      // console.log(row)
      this.tempImgUrl = row.path
      this.$alert('<img style="width: 100%" src="'+ this.tempImgUrl +'"></img>', '查看', {
        dangerouslyUseHTMLString: true,
        callback: action => {
          if(action == 'confirm') {
            // this.$message({
            //   message: '删除成功',
            //   type: 'success'
            // })
          }
        }
      });
    },
    handleDelete(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除 '+ row.resourceName +' 的该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if(action == 'confirm') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        }
      })
    },
    changeArrow(){
        this.changeFx = !this.changeFx;
    },
    // 合并单元格
    // eslint-disable-next-line
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    
    //     if (columnIndex === 4) {
    //         return {
    //           rowspan: 10,
    //           colspan: 0,
    //         };
    //     }
    // },
    exportExcel() {
      exportExcel(this.$refs.excelTable, "检查记录", "检查记录.xlsx");
    }
  },
};
</script>