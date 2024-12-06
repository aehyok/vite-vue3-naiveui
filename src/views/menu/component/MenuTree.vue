<template>
  <div class="area-tree">
    <el-tree
      ref="ElTreeRef"
      :current-node-key="cutActive"
      :data="formData"
      :default-expanded-keys="[cutActive]"
      :indent="12"
      :load="loadNode"
      :props="treeProps"
      accordion
      class="area-tree-inner area-tree-highlight"
      highlight-current
      icon=""
      lazy
      node-key="id"
      v-bind="$attrs"
      @current-change="currentChange">
      <template #default="{node}">
        <div
          :class="{'area-tree-node-expand': !node.isLeaf && node.expanded}"
          class="area-tree-node">
          <p>{{ node.label }}</p>
          <el-icon v-if="!node.isLeaf" class="area-tree-icon">
            <arrow-up-bold-icon v-if="node.expanded"/>
            <arrow-down-bold-icon v-else/>
          </el-icon>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<script lang="ts" setup>
import {
  ArrowUpBold as ArrowUpBoldIcon,
  ArrowDownBold as ArrowDownBoldIcon
} from "@element-plus/icons-vue";
import {computed, nextTick, ref,} from "vue";
import { getMenuTreeList } from "@/api/menu";
const props = withDefaults(defineProps<{
  modelValue: string;
}>(), {})
const emits = defineEmits<{
  (event: "update:modelValue"): void;
  (event: "init"): void;
}>()
const ElTreeRef = ref()
const formData = ref([])
const cutActive = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits("update:modelValue", val)
  }
})
const treeProps = {
  label: "title",
  children: "children",
  disabled: "disabled",
  isLeaf: "isLeaf",
  class: "class"
}
const currentChange = (target: { id: string }) => {
  emits("update:modelValue", target.id)
}
const loadNode = async(node: any, resolve: (data: any) => void) => {
  if (node.level === 0) {
    nextTick(() => {
      emits('init')
    })

    const result: any = await getMenuTreeList({parentId: 0, parentCode: ''})
    if(result.code === 200) {
      return resolve(result.data)
    } else {
      return resolve([{title: '暂无菜单', id: 0, children: []}])
    }
  }
  const parentId = node.data?.id
  getMenuTreeList({parentId: parentId, parentCode: '', includeChilds: false}).then(res => {
    resolve(res.data)
  })
}
</script>

<style lang="scss" scoped>
$scrollbarWidth: 2px;

.area-tree {
  width: calc(100% + #{$scrollbarWidth});
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  // 滚动条样式
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: $scrollbarWidth;
    border-radius: 10px;
  }

  // 修改树形控件内部样式
  :deep(.area-tree-inner) {
    .el-tree-node__content {
      height: 40px;
    }

    // 隐藏树节点图标
    .el-tree-node__expand-icon {
      display: none;
    }
  }

  // 选中高亮样式
  :deep(.area-tree-highlight) {
    .is-current > .el-tree-node__content {
      background-color: #66B1FF !important;

      .area-tree-node {
        color: #FFF;
      }
    }
  }

  &-inner {
    color: #333 !important;
  }

  &-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    width: 100%;
    height: 100%;
    padding: 0 5% 0 3%;
    color: #333;

    &-expand {
      color: #004CE3;
    }
  }

  &-icon {
    font-size: .9em;
  }
}
</style>
