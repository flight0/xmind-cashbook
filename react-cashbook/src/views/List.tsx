import React, { useEffect, useState } from "react";
import { billTypes, amountFormat, timeFormat } from "../utils/helper";

import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import ListTableHeader from "../components/ListTableHeader";
import ListTableData from "../components/ListTableData";
import ListTotal from "../components/ListTotal";
import ListOutlayStat from "../components/ListOutlayStat";
import FilterDateOption from "../components/FilterDateOption";
import FilterCategoryOption from "../components/FilterCategoryOption";
import FilterSelect from "../components/FilterSelect";

const List = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const categories = useSelector((state: RootState) => state.category.value);

  const bills = useSelector((state: RootState) => {
    return state.bill.value.filter((d) => {
      if (filterDate && filterDate !== timeFormat(d.time)) {
        return false;
      }

      if (filterCategory && filterCategory !== d.category) {
        return false;
      }

      return true;
    });
  });

  useEffect(() => {});

  return (
    <>
      <div className="grid grid-cols-6 gap-6">
        <FilterSelect label="日期" setState={setFilterDate}>
          <FilterDateOption />
        </FilterSelect>
        <FilterSelect label="分类" setState={setFilterCategory}>
          <FilterCategoryOption />
        </FilterSelect>
      </div>
      <div className="mt-6 rounded-md overflow-hidden shadow-md border">
        <table className="w-full">
          <thead className="bg-slate-50 border-slate-200 border-b shadow-md">
            <tr>
              <ListTableHeader title="时间" />
              <ListTableHeader title="类型" />
              <ListTableHeader title="分类" />
              <ListTableHeader title="金额" />
            </tr>
          </thead>
          <tbody>
            {bills.map((b, i) => (
              <tr className="border-b border-gray-100 bg-white" key={i}>
                <ListTableData data={new Date(b.time).toISOString()} />
                <ListTableData data={billTypes[b.type]} />
                <ListTableData
                  data={
                    categories.find((c) => b.category === c.id)?.name as string
                  }
                />
                <ListTableData data={amountFormat(b.amount)} />
              </tr>
            ))}
            {filterDate && !filterCategory && (
              <>
                <ListTotal bills={bills} />
                <ListOutlayStat bills={bills} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
