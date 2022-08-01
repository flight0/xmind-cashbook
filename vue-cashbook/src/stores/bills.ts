import { defineStore } from "pinia";
import type { Bill } from "@/types";
import { timeFormat } from "@/utils/helper";

export const useBillsStore = defineStore({
  id: "bills",
  state: () => ({
    bills: [] as Bill[],
  }),
  getters: {
    getFilterBills: (state) => {
      return (date: string, category: string) => {
        return state.bills.filter((d) => {
          if (date && date !== timeFormat(d.time)) {
            return false;
          }

          if (category && category !== d.category) {
            return false;
          }

          return true;
        });
      };
    },
  },
  actions: {
    init(bills: Bill[]) {
      this.bills = bills;
    },
    add(bill: Bill) {
      this.bills = this.bills.concat(bill);
    },
  },
});
