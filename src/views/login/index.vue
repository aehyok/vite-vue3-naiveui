<template>
    <div class="w-screen h-screen flex justify-between bg-[url('../../../public/images/login/bg.png')] bg-[100%_100%] ">
        <div
            class="w-[40vw] h-[82vh] bg-[url('../../../public/images/login/bg-left.png')] bg-[100%_100%] bg-no-repeat bg-cover mt-[40px] ml-[39px] max-h-[1081px]">
        </div>
        <div
            class="absolute top-1/2 right-12 w-[390px] h-[413px] bg-white rounded-2xl translate-y-[-50%] bg-cover opacity-95  border-2 border-green-500">
            <div class="text-left text-2xl mt-4 mb-1 font-medium text-[#1c63f0] ml-[20px]">国务院</div>
            <el-form ref="formRef" :model="state.loginForm" :rules="state.rules" @submit.native.prevent class="form-class">
                <el-form-item prop="userName">
          <el-input v-model="state.loginForm.userName" placeholder="登录账号" type="text">
            <template #prefix>
              <img
                :src="state.loginForm.userName?.length == 0 ? '../../../public/images/login/icon-one.png' : '../../../public/images/login/icon-onel.png'"
                class="project-img"
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="state.loginForm.password" placeholder="登录密码" type="password">
            <template #prefix>
              <img
                :src="state.loginForm.password.length == 0 ? '../../../public/images/login/icon-two.png' : '../../../public/images/login/icon-twol.png'"
                class="project-img"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="smbot" prop="captcha">
          <div class="form-row">
            <el-input v-model="state.loginForm.captcha" placeholder="验证码" style="flex: 1"/>

            <div class="verCodeImg">
              <img :src="state.vcodeImg"/>
              <span style="margin-left: 20px; cursor: pointer" @click="getImageVerifyCode"> 换一张 </span>
            </div>
          </div>
        </el-form-item>
        <div class="form-row">
          <el-checkbox v-model="state.rememberPasCbox" size="large"> 记住用户名和密码</el-checkbox>
          <!-- <el-button link @click="dialogVisible = true">
            忘记密码?
          </el-button> -->
        </div>
        <el-button
          :loading="state.loading"
          class="btn-class"
          native-type="submit"
          size="large"
          type="primary"
          @click="submitForm"
        >
          登 录
        </el-button>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()

const validatePass = (_rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        callback();
      }
    };

    const validateAccount = (_rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    const validatorVerCode = (_rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

const state = reactive({
    vcodeImg: '',
    rememberPasCbox: false,
    loading: false,
    loginForm: {
        userName: '',
        password: '',
        captcha: '',
        captchaKey: '',
        platform: 0
    },
    rules: {
        password: [{validator: validatePass, trigger: ["blur", "change"]}],
        userName: [{validator: validateAccount, trigger: ["blur", "change"]}],
        captcha: [{validator: validatorVerCode, trigger: ["blur", "change"]}],
      },
})


const getImageVerifyCode = () => {
    const { message, data } = { message: '', data: {} }
    try {
        if (message === "Success") {
          state.loginForm.captchaKey = data.key;
          state.vcodeImg = data.captcha;
        }
      } catch (error) {
        console.log(error);
      }
}

//登录提交
const submitForm = () => {
      formRef.value.validate((valid: any) => {
        if (valid) {
        //   checkNeedRemPass();
        //   adminLogin();
        }
      });
    };

</script>
<style lang="less" scoped>
  :deep(.el-form.form-class) {
    padding: 0 20px;
  }


  .project-img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .verCodeImg {
    margin-left: 10px;
    display: flex;
    align-items: center;

    .svgbox {
      position: relative;
      top: 6px;
    }

    img {
      height: 100%;
    }
  }

  :deep(.el-input__inner) {
    height: 40px;
    border: none;
  }

  .smbot :deep(.el-input__inner) {
    height: 40px;
    border-radius: 2px;
    // border: 1px solid #9EA7B4;
  }

  :deep(.el-form-item__content) {
    width: 350px;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgba(158, 167, 180, 1);
    background: rgba(243, 246, 249, 0.2);
    // :focus{
    //   border: 1px solid #1C63F0;
    //   background: rgba(243, 246, 249, 0.2);
    // }
  }

  .smbot :deep(.el-form-item__content) {
    border: none;
    // :focus{
    //   border: 1px solid #1C63F0;
    // }
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }

  .el-checkbox {
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }

  .el-button {
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }

  .btn-class {
    width: 100%;
    margin-top: 10px;
    height: 40px;
    background: #1c63f0;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 10px;
  }

  :deep(.el-form-item) {
    margin-bottom: 17px !important;
  }

  :deep(.el-form.form-class) {
    padding: 0 20px;
  }

  :deep(.el-form-item__error) {
    top: 108%;
  }

.login-icp {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
</style>