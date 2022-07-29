import React from "react";

const ListTableData = ({ data }: { data: string }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
      {data}
    </td>
  );
};

export default ListTableData;