<template>
    <div>
      <el-descriptions class="margin-top" title="账号信息" :column="3" size="medium" border>
        <template slot="extra">
          <el-button @click="ChangePwd" size="small">修改密码</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{ UserAccount.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ UserAccount.account }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-sex"></i>
            性别
          </template>
          {{ UserAccount.sex }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            身份
          </template>
          <el-tag type="success" v-if="UserAccount.role == 0" size="small">管理员</el-tag>
          <el-tag type="warning" v-if="UserAccount.role == 1" size="small">检查员</el-tag>
          <el-tag type="warning" v-if="UserAccount.role == 2" size="small">维保员</el-tag>
        </el-descriptions-item>
        <!-- <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-key"></i>
            密码
          </template>
          {{ UserAccount.pwd }}
        </el-descriptions-item> -->
      </el-descriptions>
      <p style="font-size: 16px;height: 20px;line-height: 20px;color: #9a9a9a;" v-if="this.UserAccount.name == '游客'">此账号为演示账号 <br>所有功能皆为注销状态</p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      UserAccount: [],
      UpdatePwd: ''
    }
  },
  created() {
      this.getInfo()
  },
  methods: {
    getInfo() {
      const url = '/api/user/getInfos'
      axios.post(`${url}?account=${localStorage.getItem('account')}`,{
              
          },
          {
          headers: {
              'verifyCode': '2024'
          }
      }).then((res) => {
          if(res.status == 200) {
              this.UserAccount = res.data
          }
      })
    },
    ReTypePwd() {
      this.$confirm('密码不能为空, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
        this.$prompt('请输入要更新的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.UpdatePwd = value
            if(this.UpdatePwd == null) {
              this.ReTypePwd()
              return
            }

            this.$confirm('要修改的密码是: '+this.UpdatePwd+' , 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {


              const url = '/api//user-account/updatePwd'
              const phone = localStorage.getItem('phone')
              const newPwd = this.UpdatePwd
              axios.post(`${url}?phone=${phone}&newPwd=${newPwd}`,{
                    
                },
                {
                headers: {
                    'verifyCode': '2024'
                }
              }).then((res) => {
                if(res.status == 200) {
                    // console.log(res)
                    this.loginHistory = res
                    this.$message({
                      type: 'success',
                      message: '更新成功!'
                    });
                }
              })


            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消更新'
              });          
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });

      
    },
    ChangePwd() {
      this.$confirm('此操作将修改密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        

        this.$prompt('请输入要更新的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '你的密码是: ' + value
          // });
          this.UpdatePwd = value
          if(this.UpdatePwd == null) {
            this.ReTypePwd()
            return
          }
          this.$confirm('要修改的密码是: '+this.UpdatePwd+' , 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {



            const url = '/api/user/changePwd'
            const newPwd = this.UpdatePwd
            axios.post(`${url}?account=${localStorage.getItem('account')}&pwd=${newPwd}`,{
                  
              },
              {
              headers: {
                  'verifyCode': '2024'
              }
            }).then((res) => {
              if(res.status == 200) {
                  // console.log(res)
                  this.loginHistory = res
                  this.$message({
                    type: 'success',
                    message: '更新成功!'
                  });
              }
            })




            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消更新'
            });          
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
  }
}
</script>

<style>
.el-icon-sex {
  background: url(@/assets/img/icon/性别.png) 50% no-repeat;
  width: 16px;
  height: 16px;
}

@media screen and (max-width: 768px) {
  .el-message-box {
    width: 96%;
  }
}
</style>