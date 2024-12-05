<template>
  <div class="w-screen h-screen flex justify-between bg-[url('../../../public/images/login/bg.png')] bg-[100%_100%] ">
    <div
      class="w-[40vw] h-[82vh] bg-[url('../../../public/images/login/bg-left.png')] bg-[100%_100%] bg-no-repeat bg-cover mt-[40px] ml-[39px] max-h-[1081px]">
    </div>
    <div
      class="absolute top-1/2 right-12 w-[390px] h-[413px] bg-white rounded-2xl translate-y-[-50%] bg-cover opacity-95  border-2 border-green-500">
      <div class="text-left text-2xl mt-4 mb-1 font-medium text-[#1c63f0] ml-[20px]">互联网发展应用平台</div>
      <el-form ref="formRef" :model="state.loginForm" :rules="state.rules" @submit.native.prevent class="form-class">
        <el-form-item prop="userName">
          <el-input v-model="state.loginForm.userName" placeholder="登录账号" type="text">
            <template #prefix>
              <img
                :src="state.loginForm.userName?.length == 0 ? '../../../public/images/login/icon-one.png' : '../../../public/images/login/icon-onel.png'"
                class="project-img" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="state.loginForm.password" placeholder="登录密码" type="password">
            <template #prefix>
              <img
                :src="state.loginForm.password.length == 0 ? '../../../public/images/login/icon-two.png' : '../../../public/images/login/icon-twol.png'"
                class="project-img" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="smbot" prop="captchaValue">
          <div class="form-row">
            <el-input v-model="state.loginForm.captchaValue" placeholder="验证码" style="flex: 1" />
            <div class="verCodeImg">
              <img :src="state.captchaImageBase64" />
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
        <el-button :loading="state.loading" class="btn-class" native-type="submit" size="large" type="primary"
          @click="submitForm(formRef)">
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { getCaptcha, login } from "@/api/login"
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter();

const formRef = ref<FormInstance>()

onMounted(async () => {
  checkRemPass();
  await getImageVerifyCode()
})

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === "") {

    callback(new Error("请输入密码"));
  } else {
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
  captchaImageBase64: '',
  rememberPasCbox: false,
  loading: false,
  loginForm: {
    userName: '',
    password: '',
    captchaValue: '',
    captchaKey: '',
    platform: 0
  },
  rules: {
    password: [{ validator: validatePass, trigger: ["blur", "change"] }],
    userName: [{ validator: validateAccount, trigger: ["blur", "change"] }],
    captchaValue: [{ validator: validatorVerCode, trigger: ["blur", "change"] }],
  },
})


const getImageVerifyCode = async () => {
  let result: any = await getCaptcha()
  console.log(result, "onMounted")
  if (result.code == 200) {
    state.captchaImageBase64 = result.data.captcha
  }
  try {
    if (result.code === 200) {
      state.loginForm.captchaKey = result.data.key;
      state.captchaImageBase64 = result.data.captcha
    }
  } catch (error) {
    console.log(error);
  }
}

//登录提交
const submitForm = (formRefValue: FormInstance | undefined) => {
  console.log("submitForm", formRefValue);
  if(!formRefValue) return
  formRefValue.validate((valid: any) => {
    console.log(valid);
    if (valid) {
      checkNeedRemPass();
      adminLogin();
    }
  });
};

const checkRemPass = () => {
  const loginRemInfo = localStorage.getItem("loginRemInfo");
  if (loginRemInfo) {
    const jsonInof = JSON.parse(loginRemInfo);
    state.loginForm.userName = jsonInof.userName;
    state.loginForm.password = (jsonInof.password);
    state.rememberPasCbox = true;
  }
};

// 判断是否需要记住账号密码
const checkNeedRemPass = () => {
  if (state.rememberPasCbox) {
    const info = {
      userName: state.loginForm.userName,
      password: state.loginForm.password,
    };

    localStorage.setItem("loginRemInfo", JSON.stringify(info));
  } else {
    localStorage.removeItem("loginRemInfo");
  }
};


const adminLogin = async () => {
  try {
    state.loading = true;
    const result: any = await login({
      userName: state.loginForm.userName,
      password: state.loginForm.password,
      captchaValue: state.loginForm.captchaValue,
      captchaKey: state.loginForm.captchaKey,
    });
    state.loading = false;
    if (result.code === 200) {
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...result.data,
          userName: state.loginForm.userName,
        })
      );
      router.push("/home");
    } else {
      getImageVerifyCode();
    }
  } catch (error) {
    console.log(error, "error");
    state.loading = false;
    console.log(ElMessage, "ElMessage");
    ElMessage.error(error || '登录失败');
    getImageVerifyCode();
  }
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