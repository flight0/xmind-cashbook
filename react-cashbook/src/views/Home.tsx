import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { initBill } from "../state/slices/billSlice";
import { initCategory } from "../state/slices/categorySlice";

import categoriesServices from "../services/categories";
import billsServices from "../services/bills";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const bills = billsServices.getData();
    dispatch(initBill(bills));

    const categories = categoriesServices.getData();
    dispatch(initCategory(categories));
  }, []);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="min-w-[549px]">
        <Link to="/" className="text-3xl">
          XMind 记账本
        </Link>
        <div className="flex justify-end">
          <div>
            <Link
              to="/add"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              添加帐单
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
