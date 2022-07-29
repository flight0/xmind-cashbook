import React from "react";
import { Bill } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

interface CategoryStat {
  category: string;
  amount: number;
}

const ListOutlayStat = ({ bills }: { bills: Bill[] }) => {
  const categories = useSelector((state: RootState) => state.category.value);
  const stat = bills.reduce((p: CategoryStat[], c) => {
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

  stat.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <>
      {stat.map((s) => (
        <tr className=" border-gray-100 bg-white" key={s.category}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"></td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
            {categories.find((c) => s.category === c.id)?.name as string}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
            {s.amount}
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListOutlayStat;
