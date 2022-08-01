import { defineStore } from 'pinia'
import type { Category } from '@/types';

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [] as Category[]
  }),
  getters: {
  },
  actions: {
    initCategories(categories:Category[]) {
        this.categories = categories;
    }
  }
})