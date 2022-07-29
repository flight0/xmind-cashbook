import React from "react";

const ListTableHeader = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
      {title}
    </th>
  );
};

export default ListTableHeader;