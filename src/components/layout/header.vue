<template>
  <div class="app-header">
    <div class="app-header-left">
      <img class="app-header-img" src="/public/images/logo.png" alt="" />
      <div class="app-header-title">国家互联网应用平台</div>
    </div>
    <div class="header-right">
      <div class="common-right color" @click="backHome">
        <i class="fa-sharp fa-light fa-house"></i>
        <span class="ml-5">返回主页</span>
      </div>
      <div class="common-right">
      </div>
      <div class="common-right">
        <i class="mr-5 fa-sharp fa-light fa-user color"></i>
        <el-dropdown @command="handleCommand">
          <span class="color">
            admin-角色<i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="c">版本信息</el-dropdown-item> -->
              <el-dropdown-item command="b">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { loginOutFun } from "@/utils/index";


export default defineComponent({
  name: "Header",
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    let nickName = "";
    const json = localStorage.getItem("token");
    if (json != null && json != "") {
      nickName = JSON.parse(json).nickName;
    }

    const state = reactive({
      updateDialogVisible: false,
      avatorImage: "images/avator.png",
      userName: nickName,
      versionDialogVisible: false,
      userInfo: {},
      systemInfo: {},
      allFirstPage: [],
      authSystemList: [],
    });


    // 获取用户信息
    // 返回主页
    const backHome = () => {
      window.location.href = "/";
    };
    // 退出二次确认框
    const checkLoginOut = () => {
      proxy
        .$confirm("请问是否退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          // await loginOutFun();
          localStorage.clear();
          await router.push("/login");
        });
    };

    const handleCommand = (command) => {
      if (command === "a") {
        state.updateDialogVisible = true;
      } else if (command === "c") {
        state.versionDialogVisible = true;
      } else {
        checkLoginOut();
      }
    };
    const close = () => {
      state.updateDialogVisible = false;
    };

    const closeVersion = () => {
      state.versionDialogVisible = false;
    };

    const selectMenu = (e) => {
      store.commit("header", e);
    };


    onMounted(() => {
    });

    return {
      ...toRefs(state),
      backHome,
      close,
      closeVersion,
      checkLoginOut,
      handleCommand,
    };
  },
});
</script>
<style lang="less" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  font-size: 14px;
  white-space: nowrap;

  &-left {
    display: flex;
    align-items: center;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
  }

  .header-right {
    display: flex;
    line-height: 60px;
    // margin-right: 280px;
    .common-right {
      // margin-left: 15px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .color {
      font-size: 14px;
      color: #fff;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    .mr-5 {
      margin-right: 5px;
    }

    .ml-5 {
      margin-left: 5px;
    }
  }
  .header-dropdown-menu {
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
