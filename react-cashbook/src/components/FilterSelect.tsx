import React from "react";

const FilterSelect = ({
  label,
  setState,
  children,
}: {
  label: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}) => {
  const handleChange = (e: React.ChangeEvent) => {
    setState((e.target as HTMLSelectElement).value);
  };

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="date"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleChange}
      >
        <option value="">全部</option>
        {children}
      </select>
    </div>
  );
};

export default FilterSelect;
