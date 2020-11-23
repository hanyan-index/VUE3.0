<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--表单-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password2"
          class="item-form"
          v-show="model === 'register'"
        >
          <label for="password2">重复密码</label>
          <el-input
            id="password2"
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                type="primary"
                class="txt-center block"
                :disabled="codeButtonStatus.status"
                @click="getSms()"
                >{{ codeButtonStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginButtonStatus"
            class="login-top block"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "../../api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode,
} from "../../utils/validate";
export default {
  name: "Login",
  setup(props, { refs, root }) {
    //表单验证
    //邮箱
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱输入有误"));
      } else {
        callback();
      }
    };

    //密码
    let validatePassword = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        alert("value:" + value);
        callback(new Error("请输入6-20位数字+字母的密码"));
      } else {
        callback();
      }
    };

    //重复密码
    let validatePassword2 = (rule, value, callback) => {
      // 登录模块时无需做重复密码验证
      if (model.value === "login") {
        callback();
      }
      //过滤特殊字符
      ruleForm.password2 = stripscript(value);
      value = ruleForm.password2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };

    //验证码
    let checkCode = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码输入格式错误"));
      } else {
        callback();
      }
    };
    //*************************************************************************************************************
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // 模式值
    const model = ref("login");
    const loginButtonStatus = ref(true);
    const countDownTime = ref(null);
    // 获取验证码按钮
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    const ruleForm = reactive({
      username: "",
      password: "",
      password2: "",
      code: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      password2: [{ validator: validatePassword2, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
    });
    //*************************************************************************************************************
    // 声明函数
    const toggleMenu = (data) => {
      menuTab.forEach((elem) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;
      resetFromData();
      clearCountDown();
    };

    //清除表单数据
    const resetFromData = () => {
      // 重置表单
      refs["ruleForm"].resetFields();
    };

    //更新按钮状态
    const updateButtonStatus = (parms) => {
      //修改获取验证码的状态
      codeButtonStatus.text = parms.text;
      codeButtonStatus.status = parms.status;
    };

    // 获取验证码
    const getSms = () => {
      // 邮箱是否为空
      if (!ruleForm.username) {
        root.$message.error("邮箱不能为空");
        return false;
      }
      // 邮箱格式是否正确
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误,请重新输入");
        return false;
      }
      updateButtonStatus({
        text: "发送中...",
        status: true,
      });
      /*
            //修改获取验证码的状态
            codeButtonStatus.text = '发送中...';
            codeButtonStatus.status = true;
            */

      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };
      GetSms(requestData)
        .then((response) => {
          let responseDate = response.data;
          root.$message({
            message: responseDate.message,
            type: "success",
          });
          // 启用登陆注册按钮
          loginButtonStatus.value = false;
          // 调用计时器，倒计时60s
          countDown(60);
          console.log(response);
        })
        .catch((error) => {
          // 打印错误信息
          console.log(error);
          clearCountDown();
        });
    };

    // 表单提交
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          model.value === "login" ? loginForm() : registerForm();
          /*if(model.value === "login"){
                        loginForm();
                    }else{
                        registerForm();
                    }*/
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //登陆
    const loginForm = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "login",
      };

      root.$store
        .dispatch("app/login", requestData)
        .then((response) => {
          root.$router.push({
            name: "Console",
          });
        })
        .catch((error) => {
        });
    };

    // 登陆接口
    // Login(requestData).then(response =>{
    //     // alert("登陆成功")
    //     // 页面跳转
    //     root.$router.push({
    //       name:'Console'
    //     })
    // }).catch(error =>{

    // })
    // });

    //注册
    const registerForm = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register",
      };
      // 注册接口
      Register(requestData)
        .then((response) => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch((error) => {
          // 失败时执行的代码
        });
    };

    // 倒计时
    const countDown = (number) => {
      //判断定时器是否存在，存在则清除
      if (countDownTime.value) {
        clearInterval(countDownTime.value);
      }
      let time = number;
      // setTimeout  定时器,只执行一次  clearTimeout 清除定时器
      // setInterval  计时器，每隔一段时间执行一次   clearInterval  清除计时器

      countDownTime.value = setInterval(() => {
        time--;
        if (time === 0) {
          updateButtonStatus({
            text: "获取验证码",
            status: false,
          });

          /*
                    codeButtonStatus.text = '获取验证码';
                    codeButtonStatus.status = false;
                    */
          clearInterval(countDownTime.value);
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };

    //清除倒计时
    const clearCountDown = () => {
      //还原按钮默认状态
      updateButtonStatus({
        status: false,
        text: "获取验证码",
      });
      /*
            codeButtonStatus.status = false;
            codeButtonStatus.text = "获取验证码";
            */
      //清除倒计时
      clearInterval(countDownTime.value);
    };

    // 生命周期
    // 挂载完成后自动执行
    onMounted(() => {});
    return {
      menuTab,
      model,
      ruleForm,
      rules,
      loginButtonStatus,
      codeButtonStatus,
      countDownTime,
      countDown,
      toggleMenu,
      submitForm,
      getSms,
    };
  },
};
</script>
<style lang="scss" scoped>
.txt-center {
  text-align: center;
}
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    line-height: 36px;
    width: 88px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    /*鼠标移入效果：手势*/
    cursor: pointer;
  }
  .current {
    background-color: rgb(0, 0, 0.1);
  }
}

/*表单*/
.login-form {
  margin-bottom: 12px;
  label {
    display: block;
    line-height: 24px;
    color: #fff;
    margin-bottom: 12px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-top {
    margin-top: 20px;
  }
}
</style>


<!--
密码加密:
1、在前端预先加密一次
登录的字符串:123456  (普通字符串)
经过加密后:sha1(123456) == 'e1312as5nal3cw1312eu10d01hwd01h'   (加密后的字符串)

2、后台加密
接收到的字符串: 'e1312as5nal3cw1312eu10d01hwd01h'
后台再次加密: md5( 'e1312as5nal3cw1312eu10d01hwd01h' ) =='dnc34odi10hdq21whc9qh0nq0uqw'
最终新的字符串写入数据库:dnc34odi10hdq21whc9qh0nq0uqw

3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示

-->