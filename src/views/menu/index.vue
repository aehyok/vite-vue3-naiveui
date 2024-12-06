<template>
  <article class="pt-main-container">
    <div class="card pt-left">
      <div class="pt-left-header">
        <div class="pt-left-title">
          <h3>区域树</h3>
        </div>
      </div>
      <div class="pt-left-body">
        <MenuTree v-model="formData.id" @init="handleInit" @node-click="handleNodeClick"></MenuTree>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { getMenuTreeList } from "@/api/menu.ts"
import { reactive, onMounted } from "vue";
import MenuTree from "./component/MenuTree.vue"
onMounted(async()=> {
  const list = await getMenuTreeList({parentId: 0, parentCode: ''})
  console.log(list, "======getMenuTreeList")
})

const formData = reactive({
  id: 0
})

const handleInit = () => {}

const handleNodeClick = () => {}
</script>
<style lang="scss" scoped>
.pt-main-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 85vh;
}

.pt-left {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  width: 320px;
}

.pt-left-body {
  height: calc(100% - 50px);
  overflow: hidden;
}

.card {
  box-sizing: border-box;
  background-color: var(--el-fill-color-blank);
  border: var(--el-border);
  border-radius: 4px;
  padding: 4px;
}

.pt-left-title {
    padding: 12px;
    text-align: left;
    > h3 {
      position: relative;
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      color: var(--el-text-color-regular);

      &::before {
        display: block;
        position: absolute;
        top: 3px;
        left: -12px;
        width: 3px;
        height: 18px;
        background-color: #004ce3;
        content: "";
      }
    }
  }


  .pt-left-header {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--el-border);
  }

</style>