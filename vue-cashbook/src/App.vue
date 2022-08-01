<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useBillsStore } from "@/stores/bills";
import billsServices from "@/services/bills";
import categoriesServices from "@/services/categories";
import {useCategoriesStore} from "@/stores/categories";

const billsStore = useBillsStore();
const billsData = billsServices.getData();
billsStore.init(billsData);

const categoriesStore = useCategoriesStore();
const categoriesData = categoriesServices.getData();
categoriesStore.initCategories(categoriesData);
</script>

<template>
  <div class="flex flex-col items-center py-8">
    <div class="min-w-[549px]">
      <router-link to="/" class="text-3xl" href="/">XMind 记账本</router-link>
      <div class="flex justify-end">
        <div>
          <router-link
            to="add"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            href="/add"
            >添加帐单</router-link
          >
        </div>
      </div>

      <RouterView />
    </div>
  </div>
</template>
