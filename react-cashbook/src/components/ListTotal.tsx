import React from "react";
import { Bill } from "../types";
import { amountFormat } from "../utils/helper";

const ListTotal = ({ bills }: { bills: Bill[] }) => {
  let total = {
    income: 0,
    outlay: 0,
  };

  bills.forEach((b) => {
    if (b.type === 0) {
      total.outlay += b.amount;
    } else {
      total.income += b.amount;
    }
  });

  return (
    <>
      <tr className="border-gray-100 bg-white">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
          总收入
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
          {amountFormat(total.income)}
        </td>
      </tr>
      <tr className=" border-gray-100 bg-white">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
          总支出
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
          {amountFormat(total.outlay)}
        </td>
      </tr>
    </>
  );
};

export default ListTotal;
