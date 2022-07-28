const tfoot = document.querySelector("tfoot");
const tbody = document.querySelector("tbody");
const dateFilter = document.querySelector("#date-filter");
const categoryFilter = document.querySelector("#category-filter");
const categorySelect = document.querySelector("select[name='category']");
const billTimeInput = document.querySelector("input[name='time']");
const addCashButton = document.querySelector("#add-cash-button");
const addCashForm = document.querySelector("form");
const dialogMask = document.querySelector(".dialog-mask");
const addFormContainer = document.querySelector(".add-form-container");

//绑定事件
dateFilter.addEventListener("change", () => filterBills());
categoryFilter.addEventListener("change", () => filterBills());
addCashButton.addEventListener("click", () => toggleAddCashForm());
dialogMask.addEventListener("click", () => toggleAddCashForm());
addCashForm.addEventListener("submit", (e) => addNewBill(e));

//解析csv格式数据
const parseCsv = (csv) => {
  const csvRows = csv.split("\n");
  const props = csvRows[0].split(",");
  const result = [];

  csvRows.slice(1).forEach((item) => {
    let billObject = {};

    const billData = item.split(",");
    billData.forEach((b, i) => {
      billObject[props[i]] = b;
    });

    result.push(billObject);
  });

  return result;
};

//格式化日期为可读格式
const formatDate = (date) => {
  let month = date.getUTCMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  } else {
    month = month.toString();
  }

  return `${date.getFullYear()}-${month}`;
};

//格式化账单金额数据
const formatAmount = (amount) => {
  return Number.parseFloat(amount).toFixed(2);
};

//切换表格显示和隐藏
const toggleAddCashForm = () => {
  addFormContainer.classList.toggle("visible");
  dialogMask.classList.toggle("visible");
};

//初始化账单表格
const initBillsHtml = (bills) => {
  let tbodyHtml = "";
  let filterDates = [];

  bills.forEach((bill, index) => {
    tbodyHtml += getBillHtml(index, bill, bill.new);
    bills[index].new = false;

    const billDate = new Date(Number.parseInt(bill.time));
    const filterDate = formatDate(billDate);
    if (filterDates.includes(filterDate) === false) {
      filterDates.push(filterDate);
    }
  });

  tbody.innerHTML = tbodyHtml;
  setDateFilterSelectHtml(filterDates);
};

//设置账单表格数据
const setFilterBillsHtml = (bills, showTotalStat = false) => {
  let tbodyHtml = "";
  let total = {
    income: 0,
    outlay: 0,
    outlayStat: [],
  };

  bills.forEach((bill, index) => {
    tbodyHtml += getBillHtml(index, bill);
    if (showTotalStat) {
      const amount = Number.parseInt(bill.amount);
      if (bill.type === "1") {
        total.income += amount;
      } else {
        total.outlay += amount;

        const outlayIndex = total.outlayStat.findIndex(o => o.category === bill.category);
        if (outlayIndex !== -1) {
          total.outlayStat[outlayIndex].amount += amount;
        } else {
          total.outlayStat.push({
            category: bill.category,
            amount,
          });
        }
      }
    }
  });

  tbody.innerHTML = tbodyHtml;
  if (showTotalStat) {
    setTotalHtml(total);
  }
};

//设置日期选择框内容
const setDateFilterSelectHtml = (filterDates) => {
  let html = '<option value="" selected>全部</option>';
  filterDates.forEach((date) => {
    html += `<option value="${date}">${date}</option>`;
  });

  dateFilter.innerHTML = html;
};

//设置分类选择框内容
const initCategorySelectHtml = () => {
  let option = "";
  categories.forEach((c) => {
    option += `<option value="${c.id}">${c.name}</option>`;
  });

  categoryFilter.insertAdjacentHTML("beforeend", option);
  categorySelect.insertAdjacentHTML("beforeend", option);
};

//筛选账单数据
const filterBills = () => {
  const newBills = bills.filter((bill) => {
    const billDate = new Date(Number.parseInt(bill.time));

    if (dateFilter.value && formatDate(billDate) !== dateFilter.value)
      return false;
    if (categoryFilter.value && categoryFilter.value !== bill.category)
      return false;

    return true;
  });

  tfoot.innerHTML = "";
  let showTotalStat = false;
  if (dateFilter.value && !categoryFilter.value) {
    showTotalStat = true;
  }

  setFilterBillsHtml(newBills, showTotalStat);
};

//按月筛选时候设置统计内容
const setTotalHtml = (total) => {
  total.outlayStat.sort((a, b) => {
    return b.amount - a.amount;
  });

  let totalHtml = "";
  total.outlayStat.forEach((v, i) => {
    totalHtml += "<tr class='outlay'>";
    if (i === 0) {
      totalHtml += `<th colspan="2" rowspan="${total.outlayStat.length}">支出统计</th>`;
    }
    totalHtml += `<td>${categoryMap.get(v.category).name}</td><td>${formatAmount(v.amount)}￥</td>`;
    totalHtml += "</tr>";
  });

  totalHtml += `<tr class="outlay"><th colspan="3">总支出</td><td>${formatAmount(total.outlay)}￥</td></tr><tr class="income"><th colspan="3">总收入</td><td>${formatAmount(total.income)}￥</td></tr>`;
  tfoot.innerHTML = totalHtml;
};

//添加新的账单
const addNewBill = (e) => {
  e.preventDefault();
  const date = new Date(e.target.time.value);
  const type = categoryMap.get(e.target.category.value).type;
  const newBill = {
    type,
    time: date.getTime(),
    category: e.target.category.value,
    amount: e.target.amount.value,
    new: true,
  };

  const insertIndex = bills.findLastIndex((b) => b.type === type && b.time <= newBill.time) + 1;
  bills.splice(insertIndex, 0, newBill);

  initBillsHtml(bills);

  tfoot.innerHTML = "";
  e.target.time.value = "";
  e.target.category.value = "";
  e.target.amount.value = "";
  dateFilter.value = "";
  categoryFilter.value = "";
  toggleAddCashForm();

  window.location.href = `#bill_${insertIndex}`;
};

//获取单个账单html
const getBillHtml = (id, bill, isNew = false) => {
  const billDate = new Date(Number.parseInt(bill.time));
  const billAmount = formatAmount(bill.amount);
  let className = bill.type === "1" ? "income" : "outlay";
  if (isNew) {
    className += " new";
  }

  return `<tr id="bill_${id}" class="${className}"><td>${billDate.toISOString()}</td><td>${billTypes[bill.type]}</td><td>${categoryMap.get(bill.category).name}</td><td>${billAmount}￥</td></tr>`;
};

//解析表单和分类的csv数据，设置账单类型和分类映射数据
let bills = parseCsv(billsCsv);
const categories = parseCsv(categoriesCsv);
const billTypes = { 0: "支出", 1: "收入" };
const categoryMap = new Map();
categories.forEach((c) => {
  categoryMap.set(c.id, {
    type: c.type,
    name: c.name,
  });
});

//初始化表格数据和筛选数据
initBillsHtml(bills);
initCategorySelectHtml();

//设置表单日期最大值
billTimeInput.setAttribute("max", new Date().toISOString().slice(0, 16));