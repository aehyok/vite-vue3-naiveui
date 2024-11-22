<template>
  <div class="w-4 text-red-500 border-2 border-red-500 ">aehyok</div>
  <el-button type="primary" @click="changeClick">{{ count }}</el-button>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'; 
import { useRouter } from 'vue-router';

const router = useRouter()

const changeClick = () => {
  count.value = count.value + 1

  router.push('/login')
}

const count = ref(0)
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
