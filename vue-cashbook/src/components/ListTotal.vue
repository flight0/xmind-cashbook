<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { amountFormat } from "@/utils/helper";
import type { Bill } from "@/types";

const props = defineProps(["bills"]);
const total = reactive({
  income: 0,
  outlay: 0,
});

watchEffect(() => {
  total.income = total.outlay = 0;
  props.bills?.forEach((b: Bill) => {
    if (b.type === 0) {
      total.outlay += b.amount;
    } else {
      total.income += b.amount;
    }
  });
});
</script>

<template>
  <tr className="border-gray-100 bg-white">
    <th scope="row" colspan="2"></th>
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium"
    >
      总收入
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
      {{ amountFormat(total.income) }}
    </td>
  </tr>
  <tr className=" border-gray-100 bg-white">
    <th scope="row" colspan="2"></th>
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium"
    >
      总支出
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
      {{ amountFormat(total.outlay) }}
    </td>
  </tr>
</template>
