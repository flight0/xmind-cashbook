import React from "react";
import type { RootState } from "../state/store";
import { useSelector } from "react-redux";

const FilterCategoryOption = () => {
  const categories = useSelector((state: RootState) => state.category.value);

  return (
    <>
      {categories.map((c, i) => (
        <option value={c.id} key={i}>
          {c.name}
        </option>
      ))}
    </>
  );
};

export default FilterCategoryOption;
