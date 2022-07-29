import React from "react";
import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { timeFormat } from "../utils/helper";

const FilterDateOption = () => {
  const selectDates = useSelector((state: RootState) => {
    return state.bill.value.reduce((p, c) => {
      const filterDate = timeFormat(c.time) as never;
      if (p.includes(filterDate) === false) {
        p.push(filterDate);
      }

      return p;
    }, []);
  });
  
  return (
    <>
      {selectDates.map((d, i) => (
        <option value={d} key={i}>
          {d}
        </option>
      ))}
    </>
  );
};

export default FilterDateOption;
