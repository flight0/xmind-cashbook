<script setup lang="ts">
const props = defineProps({
  data: String
})
</script>

<template>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
    {{data}}
  </td>
</template>