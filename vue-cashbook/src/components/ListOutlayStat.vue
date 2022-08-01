<script setup lang="ts">
import { reactive, watchEffect, ref } from "vue";
import { amountFormat } from "@/utils/helper";
import type { Bill } from "@/types";
import { useCategoriesStore } from "@/stores/categories.js";

interface CategoryStat {
  category: string;
  amount: number;
}

const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;

const props = defineProps(["bills"]);
const stat = ref<CategoryStat[]>([]);

watchEffect(() => {
  stat.value = props.bills.reduce((p: CategoryStat[], c: Bill) => {
    if (c.type === 0) {
      const dataIndex = p.findIndex((v) => c.category === v.category);
      if (dataIndex === -1) {
        p.push({
          category: c.category,
          amount: c.amount,
        } as never);
      } else {
        (p[dataIndex] as CategoryStat).amount += c.amount;
      }
    }

    return p;
  }, []);

  stat.value.sort((a, b) => {
    return b.amount - a.amount;
  });
});
</script>

<template>
  <tr v-for="item in stat" className="border-gray-100 bg-white">
    <th scope="row" colspan="2"></th>
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"
    >
      {{ categories.find((c) => item.category === c.id)?.name as string }}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
      {{ amountFormat(item.amount) }}
    </td>
  </tr>
</template>
