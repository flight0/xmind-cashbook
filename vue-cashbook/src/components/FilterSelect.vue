<script setup lang="ts">
const props = defineProps({
  name: String,
  setFilter: Function,
});

const emit = defineEmits(["setFilter"]);
const handleChange = (e: Event) => {
  emit("setFilter", (e.target as HTMLSelectElement).value);
};
</script>

<template>
  <div class="col-span-6 sm:col-span-3">
    <label class="block text-sm font-medium text-gray-700">
      {{ name }}
    </label>
    <select
      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      @change="handleChange"
    >
      <option value="">全部</option>
      <slot></slot>
    </select>
  </div>
</template>
