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
    <div class="pt-right">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getTableList"
        :init-param="initParam"
        :data-callback="dataCallback"
        @drag-sort="sortTable"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button v-auth="'add'" type="primary" >新增用户</el-button>
          <el-button v-auth="'batchAdd'" type="primary" >批量添加用户</el-button>
          <el-button v-auth="'export'" type="primary" >导出用户数据</el-button>
          <el-button type="primary" plain >To 子集详情页面</el-button>
          <el-button type="danger" plain :disabled="!scope.isSelected">
            批量删除用户
          </el-button>
        </template>
        <!-- Expand -->
        <template #expand="scope">
          {{ scope.row }}
        </template>
        <!-- usernameHeader -->
        <template #usernameHeader="scope">
          <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
            {{ scope.column.label }}
          </el-button>
        </template>
        <!-- createTime -->
        <template #createTime="scope">
          <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
            {{ scope.row.createTime }}
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link >查看</el-button>
          <el-button type="primary" link >编辑</el-button>
          <el-button type="primary" link >重置密码</el-button>
          <el-button type="primary" link >删除</el-button>
        </template>
      </ProTable>
    </div>
  </article>
</template>
<script setup lang="tsx">
import { getMenuTreeList } from "@/api/menu.ts"
import { reactive, onMounted, ref } from "vue";
import MenuTree from "./component/MenuTree.vue"
import ProTable from '@/components/ProTable/index.vue'
// import { useAuthButtons } from "@/hooks/useAuthButtons";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";
import { ElButton } from 'element-plus';
// ProTable 实例
const proTable = ref<ProTableInstance>();

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
// const { BUTTONS } = useAuthButtons();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  };
};

// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: HeaderRenderScope<any>) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
      {scope.column.label}
    </el-button>
  );
};

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "sort", label: "Sort", width: 80 },
  { type: "expand", label: "Expand", width: 85 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input", tooltip: "我是搜索提示" },
    render: scope => {
      return (
        <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
          {scope.row.username}
        </el-button>
      );
    }
  },
  {
    prop: "gender",
    label: "性别",
    // 字典数据（本地数据）
    // enum: genderType,
    // 字典请求不带参数
    enum: [
          {
            "genderLabel": "男",
            "genderValue": 1
          },
          {
            "genderLabel": "女",
            "genderValue": 2
          }
        ],
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "genderLabel", value: "genderValue" }
  },
  {
    // 多级 prop
    prop: "user.detail.age",
    label: "年龄",
    search: {
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return (
          <div class="flx-center">
            <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
            <span class="mr10 ml10">-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
          </div>
        );
      }
    }
  },
  { prop: "idCard", label: "身份证号", search: { el: "input" } },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    enum: [
      {
        "userLabel": "启用",
        "userStatus": 1,
        "tagType": "success"
      },
      {
        "userLabel": "禁用",
        "userStatus": 0,
        "tagType": "danger"
      }
    ],
    search: { el: "tree-select", props: { filterable: true } },
    fieldNames: { label: "userLabel", value: "userStatus" },
    // render: scope => {
    //   return (
    //     <>
    //       {BUTTONS.value.status ? (
    //         <el-switch
    //           model-value={scope.row.status}
    //           active-text={scope.row.status ? "启用" : "禁用"}
    //           active-value={1}
    //           inactive-value={0}
    //           onClick={() => changeStatus(scope.row)}
    //         />
    //       ) : (
    //         <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
    //       )}
    //     </>
    //   );
    // }
  },
  {
    prop: "createTime",
    label: "创建时间",
    headerRender,
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

onMounted(async()=> {
  const list = await getMenuTreeList({parentId: 0, parentCode: ''})
  console.log(list, "======getMenuTreeList")
})

const formData = reactive({
  id: "0"
})


const getTableList = () => {
  return {
    "code": 200,
    "msg": "成功",
    "data": {
      "list": [
        {
          "id": "288431776199177651",
          "username": "江磊",
          "gender": 1,
          "user": {
            "detail": {
              "age": 24
            }
          },
          "idCard": "288431776199177651",
          "email": "i.wflelvkxjy@wsla.cr",
          "address": "香港特别行政区 新界",
          "createTime": "1985-07-31 06:42:13",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
        },
        {
          "id": "678051688839857803",
          "username": "苏涛",
          "gender": 1,
          "user": {
            "detail": {
              "age": 14
            }
          },
          "idCard": "678051688839857803",
          "email": "q.afjccm@nlivjjuqm.aq",
          "address": "四川省 内江市",
          "createTime": "1976-07-09 17:24:12",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
        },
        {
          "id": "859153365453985407",
          "username": "林敏",
          "gender": 2,
          "user": {
            "detail": {
              "age": 22
            }
          },
          "idCard": "859153365453985407",
          "email": "p.nfqkv@hyybzbpyg.edu",
          "address": "宁夏回族自治区 中卫市",
          "createTime": "2006-10-06 11:23:37",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
        },
        {
          "id": "211348546557806751",
          "username": "董丽",
          "gender": 2,
          "user": {
            "detail": {
              "age": 13
            }
          },
          "idCard": "211348546557806751",
          "email": "h.tovmuekp@cnmbutr.cl",
          "address": "江苏省 淮安市",
          "createTime": "1982-05-22 21:23:20",
          "status": 1,
          "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
        },
        {
          "id": "251171821335985440",
          "username": "文刚",
          "gender": 2,
          "user": {
            "detail": {
              "age": 18
            }
          },
          "idCard": "251171821335985440",
          "email": "h.rqsgyg@xuhk.ag",
          "address": "湖南省 株洲市",
          "createTime": "2016-03-27 03:32:35",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
        },
        {
          "id": "125578210355865516",
          "username": "江丽",
          "gender": 1,
          "user": {
            "detail": {
              "age": 26
            }
          },
          "idCard": "125578210355865516",
          "email": "z.nsunssh@yibxj.gm",
          "address": "内蒙古自治区 乌海市",
          "createTime": "1983-03-23 08:39:13",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
        },
        {
          "id": "843984538662175545",
          "username": "赖敏",
          "gender": 2,
          "user": {
            "detail": {
              "age": 21
            }
          },
          "idCard": "843984538662175545",
          "email": "v.lrtke@snpuqt.bt",
          "address": "安徽省 铜陵市",
          "createTime": "1993-10-04 21:35:04",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QRBHS.jpg"
        },
        {
          "id": "258132426083682811",
          "username": "郝秀兰",
          "gender": 1,
          "user": {
            "detail": {
              "age": 11
            }
          },
          "idCard": "258132426083682811",
          "email": "v.iusbbcvme@oihgqknfdk.as",
          "address": "黑龙江省 齐齐哈尔市",
          "createTime": "1984-08-18 13:33:57",
          "status": 1,
          "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
        },
        {
          "id": "520432445654963061",
          "username": "程秀英",
          "gender": 1,
          "user": {
            "detail": {
              "age": 24
            }
          },
          "idCard": "520432445654963061",
          "email": "v.hnxmjl@warm.gp",
          "address": "澳门特别行政区 澳门半岛",
          "createTime": "1999-07-19 12:57:19",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
        },
        {
          "id": "427657237881710081",
          "username": "贾静",
          "gender": 2,
          "user": {
            "detail": {
              "age": 21
            }
          },
          "idCard": "427657237881710081",
          "email": "t.njeg@tpzzfij.nf",
          "address": "青海省 海南藏族自治州",
          "createTime": "2004-04-23 09:30:52",
          "status": 0,
          "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
        }
      ],
      "pageNum": 1,
      "pageSize": 10,
      "total": 2000
    }
  }
}

const handleInit = () => {}

const handleNodeClick = () => {}

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success("修改列表排序成功");
};
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

.pt-right {
  padding-right: 18px;
}

</style>