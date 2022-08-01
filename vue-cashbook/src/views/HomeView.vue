<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { timeFormat, billTypes, amountFormat } from "@/utils/helper";
import { useBillsStore } from "@/stores/bills";
import { useCategoriesStore } from "@/stores/categories";
import ListTableData from "@/components/ListTableData.vue";
import ListTableHeader from "@/components/ListTableHeader.vue";
import DateOption from "@/components/DateOption.vue";
import CategoryOption from "@/components/CategoryOption.vue";
import FilterSelect from "../components/FilterSelect.vue";
import ListTotal from "../components/ListTotal.vue";
import type { Bill } from "@/types";
import ListOutlayStat from "../components/ListOutlayStat.vue";

const filterDate = ref("");
const filterCategory = ref("");
const billsStore = useBillsStore();
const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;
const bills = ref<Bill[]>(billsStore.bills);

watchEffect(() => {
  bills.value = billsStore.bills.filter((d) => {
    if (filterDate.value && filterDate.value !== timeFormat(d.time)) {
      return false;
    }

    if (filterCategory.value && filterCategory.value !== d.category) {
      return false;
    }

    return true;
  });
});
</script>

<template>
  <div class="grid grid-cols-6 gap-6">
    <FilterSelect :name="'日期'" @setFilter="(date) => (filterDate = date)">
      <DateOption />
    </FilterSelect>
    <FilterSelect
      :name="'分类'"
      @setFilter="(category) => (filterCategory = category)"
    >
      <CategoryOption />
    </FilterSelect>
  </div>
  <div class="mt-6 rounded-md overflow-hidden shadow-md border">
    <table class="w-full">
      <ListTableHeader />
      <tbody>
        <tr v-for="bill in bills" class="border-b border-gray-100 bg-white">
          <ListTableData :data="new Date(bill.time).toISOString()" />
          <ListTableData :data="billTypes[bill.type]" />
          <ListTableData
            :data="categories.find((c) => bill.category === c.id)?.name as string"
          />
          <ListTableData :data="amountFormat(bill.amount)" />
        </tr>
        <template v-if="filterDate && !filterCategory">
          <ListTotal :bills="bills" />
          <ListOutlayStat :bills="bills" />
        </template>
      </tbody>
    </table>
  </div>
</template>
