<template>
  <div class="login-container">
    <div class="login">
      <div class="title">
        <h3>欢迎使用企业管理系统</h3>
      </div>
      <div class="login-form">
        <el-form :model="ruleForm" status-icon :rules="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="number">
            <div class="icon">
              <i class="el-icon-user user"></i>
            </div>
            <div class="input">
              <input v-model="ruleForm.username" placeholder="账号(李逍遥)"></input>
            </div>
          </div>
          <div class="password">
            <div class="icon">
              <i class="el-icon-lock user"></i>
            </div>
            <div class="input">
              <input type="password" placeholder="密码(123456)" v-model="ruleForm.password"></input>
            </div>
          </div>
          <div class="login-submit">
            <el-button type="primary" @click="submitForm" class="submit">登录</el-button>
          </div>
        </el-form>
      </div>
      <div class="logon-container">
        <div class="retrieve">
          <el-button type="text" size="small" @click="linkRetrieve">忘记密码了?</el-button>
        </div>
        <div class="logon">
          <el-button type="text" size="small" @click="linkRegister">注册一个新的账号</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import {loginRequest} from 'network/login'
  import axios from 'axios'
  import qs from 'qs'
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // axios.defaults.headers['Content-Type'] = 'application/json'
  // axios.defaults.baseURL = 'http://121.41.67.25:8060/login'

  export default {
    name: "LoginModule",
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },

      }
    },
    methods: {
      /**
       * 1. 登录
       * */
      submitForm() {
        function httpPost(url, data = {}) {
          return new Promise((resolve, reject) => {
            axios.post(url, data).then(res => {
              resolve(res.data)
            }, err => {
              reject(err)
            })
          })
        }
        httpPost('https://www.liulongbin.top:8888/api/private/v1/login', qs.stringify(this.ruleForm)).then(res => {
          console.log(res);
          if(res.meta.status === 200) {
            // 获取后台返回的用户令牌 并且存储起来
            window.sessionStorage.setItem('token', res.data.token)
            this.$message.success(res.meta.msg)
            this.$router.replace('/user')
          }else {
            this.$message.warning(res.meta.msg)
          }

        }).catch(err => {
          console.log(err);
        })
        // console.log(qs.formats(this.ruleForm));
        // let Ajax = {
        //   post: function(url, data, fn) { //datat应为'a=a1&b=b1'这种字符串格式
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("POST", url, true);
        //     // 添加http头，发送信息至服务器时内容编码类型
        //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     xhr.onreadystatechange = function() {
        //       if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        //         fn.call(this, xhr.responseText);
        //       }
        //     };
        //     xhr.send(data);
        //   }
        // }
        // Ajax.post('http://121.41.67.25:8060/login', form, function(res) {
        //   console.log(JSON.parse(res));
        // })
      },
      /**
       * 2. 注册
       * */
      linkRegister() {
        // this.$router.replace('/register')
      },
      /**
       * 3. 找回密码
       * */
      linkRetrieve() {
        // this.$router.replace('/retrieve')
      }
    }
  }
</script>

<style scoped lang="less">
  @color: #2d3a4b;
  .login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: @color;

    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 350px;

      .title {
        width: 100%;
        font-size: 18px;
        text-align: center;
        color: #eee;
      }

      .login-form {
        padding: 10px;
        div {
          display: flex;
          width: 100%;
          height: 40px;
          line-height: 40px;

          .icon {
            padding-left: 10px;
            width: 40px;
            font-size: 18px;
            line-height: 40px;
            text-align: center;
            
            .user {
              line-height: 40px;
              font-size: 14px;
              color: #409eff;
            }
          }
          .input {
            flex: 1;
            height: 40px;
            input {
              width: 100%;
              height: 40px;
              outline: none;
              background: rgba(0, 0, 0, 0);
              border: none;
              color: #fff;
            }
            input::-ms-input-placeholder {
              color: #777;
              font-size: 14px;
            }
            input::-webkit-input-placeholder {
              color: #777;
              font-size: 14px;
            }
            input::-moz-placeholder {
              color: #777;
              font-size: 14px;
            }
          }
        }
        .number {
          margin: 20px 0;
          border: 1px solid hsla(0,0%,100%,.1);
          border-radius: 5px;
          background: rgba(0, 0, 0, .1);
        }
        .password {
          margin: 20px 0;
          border: 1px solid hsla(0,0%,100%,.1);
          border-radius: 5px;
          background: rgba(0, 0, 0, .1);
        }
        .login-submit {
          .submit {
            width: 100%;
            height: 35px;
            box-sizing: border-box;
          }
        }

      }
      .logon-container {
        display: flex;
        margin-top: -10px;
        height: 40px;
        line-height: 40px;
        .retrieve {
          width: 50%;
          text-align: right;
        }
        .retrieve::after {
          content: '|';
          display: inline-block;
          margin-top: -5px;
          margin-right: 10px;
          width: 10px;
          height: 40px;
          vertical-align: middle;
        }
      }
    }
  }
</style>