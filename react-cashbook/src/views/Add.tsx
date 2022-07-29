import React from "react";
import { Link, useNavigate } from "react-router-dom";

import type { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { addBill } from "../state/slices/billSlice";

const Add = () => {
  const categories = useSelector((state: RootState) => state.category.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const time = new Date(form.time.value).getTime();
    const type = categories.find((c) => c.id === form.category.value)
      ?.type as number;

    const newBill = {
      time: time,
      type: type,
      category: form.category.value,
      amount: Number.parseInt(form.amount.value),
    };

    form.time.value = "";
    form.category.value = "";
    form.amount.value = "";

    dispatch(addBill(newBill));
    navigate("/");
  };

  return (
    <>
      <div className="pt-8">
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    时间
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="datetime-local"
                      name="time"
                      id="time"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    分类
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <select
                      id="category"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">全部</option>
                      {categories.map((c, i) => (
                        <option value={c.id} key={i}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    金额
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      ￥
                    </span>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      step={100}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                添加
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
