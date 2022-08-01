import billCsv from "@/data/bill";
import type { Bill } from "@/types";
import { parseCsv } from "@/utils/helper";

const getData = (): Bill[] => {
  const data = parseCsv(billCsv);
  return data.map((d) => {
    return {
      type: Number.parseInt(d[0]),
      time: Number.parseInt(d[1]),
      category: d[2],
      amount: Number.parseInt(d[3]),
    };
  });
};

const billsServices = {
  getData,
};

export default billsServices;
