<script setup lang="ts">
const titles = ['时间', '类型', '分类', '金额']
</script>

<template>
      <thead class="bg-slate-50 border-slate-200 border-b shadow-md">
  <tr>
    <th v-for="title in titles" class="px-6 py-3 text-left text-sm font-medium text-slate-900">{{title}}</th>
  </tr>
  </thead>
</template>
