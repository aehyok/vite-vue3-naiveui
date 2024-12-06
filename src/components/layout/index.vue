<template>
    <el-container class="h-full" >
        <el-header class="app-header">
            <Header></Header>
        </el-header>
        <el-container style="overflow: auto">
            <el-aside v-if="state.showLeft" style="box-shadow: 0 2px 10px #f1f1f1; width: 250px">
                <SideMenu/>
            </el-aside>
            <el-main class="layoutbox">
                <div class="main-wrapper" style="position: relative; height: 100%; overflow: auto">
                <div id="mainwrapper">
                    <router-view />
                </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import Header from "@/components/layout/header.vue"
import SideMenu from "@/components/layout/side-menu.vue"
import { reactive } from 'vue';

const state = reactive({
    showLeft: true,
})
</script>
