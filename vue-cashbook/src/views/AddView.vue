<script setup lang="ts">
import { ref } from "vue";
import { useBillsStore } from "@/stores/bills";
import { useCategoriesStore } from "@/stores/categories";
import { useRouter } from "vue-router";
const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;
const billsStore = useBillsStore();
const router = useRouter();

const time = ref("");
const category = ref("");
const amount = ref("");

const handleSubmit = (e: Event) => {
  e.preventDefault();

  const type = categories.find((c) => c.id === category.value)?.type as number;

  const newBill = {
    time: new Date(time.value).getTime(),
    type: type,
    category: category.value,
    amount: Number.parseInt(amount.value),
  };
  time.value = "";
  category.value = "";
  amount.value = "";

  billsStore.add(newBill);
  router.push("/");
};
</script>

<template>
  <div class="pt-8">
    <form @submit="handleSubmit">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label
                htmlFor="time"
                class="block text-sm font-medium text-gray-700"
              >
                时间
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="datetime-local"
                  name="time"
                  id="time"
                  class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  required
                  v-model="time"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label
                htmlFor="category"
                class="block text-sm font-medium text-gray-700"
              >
                分类
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <select
                  id="category"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  v-model="category"
                >
                  <option value="">全部</option>
                  <option v-for="o in categories" :value="o.id">
                    {{ o.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label
                htmlFor="amount"
                class="block text-sm font-medium text-gray-700"
              >
                金额
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span
                  class="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  ￥
                </span>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  step="100"
                  class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  required
                  v-model="amount"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            添加
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
