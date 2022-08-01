<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories";
const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;
</script>

<template>
  <option v-for="o in categories" :value="o.id">{{ o.name }}</option>
</template>
