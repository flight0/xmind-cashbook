import categoryCsv from "../data/category";
import { Category } from "../types";
import { parseCsv } from "../utils/helper";

const getData = (): Category[] => {
    const data = parseCsv(categoryCsv);
    return data.map((c) => {
      return {
        id: c[0],
        type: Number.parseInt(c[1]),
        name: c[2],
      };
    });
  };

const categoriesServices = {
    getData
}

export default categoriesServices;