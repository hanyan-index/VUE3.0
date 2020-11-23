<template>
    <div id="login">
        <div class="login-warp">
            <ul class="menu-tab" >
                <li :class="{ 'current': item.current }"
                    v-for="item in menuTab"
                    :key="item.id"
                    @click="toggleMenu(item)"
                >{{ item.txt }}</li>
            </ul>
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item prop="username" class="item-form">
                    <label >邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label >密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="password2" class="item-form" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.password2" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label >验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-input v-model.number="ruleForm.code"  minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="primary" class="txt-center block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-top block">{{model === "login"?"登录":"注册"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { stripscript, validateEmail, validatePass, validateVCode } from "../../utils/validate";
export default {
    name: "Login",
    data() {
        //表单验证
        //邮箱
        let validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (validateEmail(value)){
                callback(new Error('邮箱输入有误'));
            }
            else {
                console.log('username', value);
                console.log('username', typeof value);
                callback();
            }
        };

        //密码
        let validatePassword = (rule, value, callback) => {
            console.log('pass', typeof value);
            //过滤特殊字符
            this.ruleForm.password = stripscript(value);
            value = this.ruleForm.password;
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (validateVCode(value)){
                callback(new Error('请输入6-20位密码'));
            } else {
                callback();
            }
        };

        //重复密码
        let validatePassword2= (rule, value, callback) => {
            // 登录模块时无需做重复密码验证
            if ( this.model ==='login' ) {
                callback();
            }
            //过滤特殊字符
            this.ruleForm.password2 = stripscript(value);
            value = this.ruleForm.password2;
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value!= this.ruleForm.password){
                callback(new Error('两次密码输入不一致'));
            } else {
                callback();
            }
        };

        //验证码
        let checkCode = (rule, value, callback) => {
            //过滤特殊字符
            this.ruleForm.code = stripscript(value);
            value = this.ruleForm.code;
            if (!value) {
                return callback(new Error('请输入验证码'));
            } else if (validatePass(value)){
                return callback(new Error('验证码输入格式错误'));
            } else {
                callback();
            }
        };

        return {
            menuTab: [
                { txt: "登录", current: true,type: 'login' },
                { txt: "注册", current: false, type: 'register' }
            ],
            //模式值
            model:'login',
            ruleForm: {
                username: '',
                password: '',
                password2:'',
                code: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                password2: [
                    { validator: validatePassword2, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            }
        };
    },
    created(){},
    //挂载完成后自动执行
    mounted(){
        console.log('username', typeof this.ruleForm.useranme)
        console.log('pass', typeof this.ruleForm.password)
    },
    methods:{
        toggleMenu: function (data) {
            this.menuTab.forEach(elem => {
                elem.current = false
            });
            //高光
            data.current = true
            //修改模块值
            this.model = data.type;
            },

    //    表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .txt-center{
        text-align: center;
    }

    #login{
        height: 100vh;
        background-color: #344a5f;
    }
    .login-warp{
        width:330px;
        margin: auto;
    }
    .menu-tab{
        text-align: center;
        li{
            display: inline-block;
            line-height: 36px;
            width: 88px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            /*鼠标移入效果：手势*/
            cursor: pointer;
        }
        .current{
            background-color: rgb(0, 0, 0.1);
        }
    }

    /*表单*/
    .login-form{
        margin-bottom: 12px;
        label {
            display: block;
            line-height: 24px;
            color: #fff;
            margin-bottom: 12px;
        }
        .item-form{
            margin-bottom: 13px;
        }
        .block{
            width: 100%;
            display: block;
        }
        .login-top{
            margin-top: 20px;
        }
    }
</style>