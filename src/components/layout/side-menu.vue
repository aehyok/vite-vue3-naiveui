<template>
  <div class="menu-container">
    <el-scrollbar :noresize="false" class="scroll-wrap" view-style="{ height: '100%' }">
      <el-menu
        :background-color="'#0F2144'"
        :default-active="activeMenu"
        :router="false"
        :text-color="'#B7BECC'"
        :unique-opened="true"
        active-text-color="#fff"
      >
        <template v-for="item in displayMenuTree" :index="item.url || ''">
          <el-sub-menu
            v-if="item.children?.length && item?.hasPermission && item.isVisible && item.type === 0"
            :index="item.url || ''"
          >
            <template #title>
              <i :class="item.icon" class="menu-icon" style="margin-right: 5px"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children">
              <el-menu-item
                v-if="child?.hasPermission && child.isVisible"
                :index="child.url || ''"
                @click="handleClickMenu(child)"
              >
                <template #title>
                  <i :class="[child.icon ? child.icon : 'fa-solid fa-window-maximize']" style="margin-right: 5px"></i>
                  <span class="menu-title">{{ child.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item
            v-else-if="item?.hasPermission && item.isVisible"
            :index="item.url || ''"
            @click="handleClickMenu(item)"
          >
            <i :class="item.icon" class="menu-icon" style="margin-right: 5px"></i>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
    <div class="version">{{ version }}</div>
  </div>
</template>
<script>
import {reactive, computed, defineComponent, toRefs, watch, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";

const locationUrl = process.env.NODE_ENV === "development" ? "https://dvs-dev2.utuapp.cn" : window.location.origin;
// const parseUrlParams = (url) => {
//   const params = {};
//   const queryString = url.split("?")[1];

//   if (queryString) {
//     const paramPairs = queryString.split("&");

//     paramPairs.forEach((paramPair) => {
//       const [key, value] = paramPair.split("=");
//       if (key && value) {
//         params[key] = decodeURIComponent(value);
//       }
//     });
//   }

//   return params;
// };

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      version: "v1.0.0.0",
      displayMenuTree: [
      {
          url: "/menu",
          name: "菜单管理",
          isVisible: true,
          hasPermission: true,
        },  
      {
          url: "/test",
          name: "测试页面",
          isVisible: true,
          hasPermission: true,
        },
        {
          url: "/test1",
          name: "测试页面",
          isVisible: true,
          hasPermission: true,
        },
        {
          url: "/test2",
          name: "测试页面",
          isVisible: true,
          hasPermission: true,
        }
    ],
    });

    const activeMenu = computed(() => {
      const indexOfUrlMark = route.fullPath.indexOf("?");
      const queryStr = indexOfUrlMark !== -1 ? route.fullPath.substring(indexOfUrlMark) : "";
      if (!queryStr) return route.path;
      const pathAndQueryStr = route.path + queryStr;
      if (!localStorage.getItem("menuUrl")) localStorage.setItem("menuUrl", pathAndQueryStr);
      // if (isObjectBContainedInObjectA(route.query, parseUrlParams(localStorage.getItem("menuUrl"))))
      //   return pathAndQueryStr;
    });

    const handleClickMenu = (item) => {
      if (!item.url) return;
      localStorage.setItem("menuUrl", item.url);
      if (item.url === "/sdk/cac" && item.isExternalLink) {
        window.open(locationUrl + "/#" + item.url);
        return;
      }
      openLink(item)
    };

    // 跳转链接
    const openLink = (data) => {
      if (data.isExternalLink) {
        const routePath = router.resolve({path: data.url});
        window.open(routePath.href, '_blank');
      } else {
        router.push(data.url)
      }
    }

    const getVersionInfo = async () => {
      try {
        const {code, data} ={ code: 200, data: { version: "1.0.0.1"} };
        if (code === 200) {
          const {basic} = data;
          state.version = basic || "v1.0.0.0";
        }
      } catch (error) {
        console.log(error);
      }
    };
    watch(
      // () => store.state.systemSubMenuList,
      // () => {
      //   const menuList = store.state?.systemSubMenuList;
      //   if (menuList.length) {
      //     state.displayMenuTree = menuList || [];
      //   }
      // },
      // {
      //   immediate: true,
      //   deep: true,
      // }
    );
    onMounted(async () => {
      await getVersionInfo();
    });
    return {
      ...toRefs(state),
      activeMenu,
      handleClickMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.scroll-wrap {
  overflow: hidden;
  height: 100%;

  :deep(.el-scrollbar__view) {
    position: relative;
  }

  .round-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #c2c2c2;
  }

  .mr-5 {
    margin-right: 5px;
  }

  .ml-20 {
    margin-left: 20px;
  }
}

.menu-title {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 15px;
}

.menu-container {
  position: relative;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.version {
  text-align: center;
  color: #bcbcbc;
  line-height: 30px;
}

.el-menu-item:hover {
  background-color: rgba(23, 102, 255, 0.2) !important;
}

:deep(.el-submenu__title:hover) {
  background-color: rgba(23, 102, 255, 0.2) !important;
}

.el-menu-item.is-active:hover {
  // background: #58acfc !important;
}

:deep(.el-sub-menu__title) {
  font-size: 16px;
}
</style>
