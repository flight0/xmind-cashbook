import { BillType } from "../types";

export const parseCsv = (csvData: string): string[][] => {
  const rows = csvData.split("\n");
  return rows.splice(1).map((r) => r.split(","));
};

export const amountFormat = (amount: number): string => {
  return `${amount.toFixed(2)}￥`;
};

export const billTypes: BillType = { 0: "支出", 1: "收入" };

export const timeFormat = (time: number): string => {
  const date = new Date(time);
  const month = date.getUTCMonth() + 1;
  let monthString = month.toString();
  if (month < 10) {
    monthString = `0${monthString}`;
  }

  return `${date.getFullYear()}-${monthString}`;
};
