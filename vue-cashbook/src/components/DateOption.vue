<script setup lang="ts">
import { computed } from "vue";
import { timeFormat } from "@/utils/helper";
import { useBillsStore } from "@/stores/bills";

const billsStore = useBillsStore();
const datesOptions = computed(() => {
  return billsStore.bills.reduce((p, c) => {
    const filterDate = timeFormat(c.time) as never;
    if (p.includes(filterDate) === false) {
      p.push(filterDate);
    }

    return p;
  }, []);
});
</script>

<template>
  <option v-for="o in datesOptions" :value="o">{{ o }}</option>
</template>
