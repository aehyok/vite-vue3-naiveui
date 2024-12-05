<template>
  <router-view v-if="!showLayout" />
  <Layout v-if="showLayout" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'; 
import { useRoute } from 'vue-router';
import Layout from '@/components/layout/index.vue'
const route = useRoute()

const showLayout = ref<boolean>(false)

watch(
  () => route.path,
  () => {
    showLayout.value = route.meta.showLayout as boolean
  },
)

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
