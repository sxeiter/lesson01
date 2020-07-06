'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  incomePlus = document.getElementsByTagName("button")[0],
  expensesPlus = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0], 
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpenses = document.querySelector(".additional_expenses"),
  periodSelect = document.getElementsByClassName("period-select")[0],
  periodAmount = document.querySelector('.period-amount'),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  incomeItem = document.querySelectorAll(".income-items");

start.disabled = true;

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  start: function () {
    this.budget = +salaryAmount.value;
    this.getExpenses(); 
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    cancel.style.marginLeft = '150px';
  },

  monthAmmountValue: function () {
    if (salaryAmount.value === "" || salaryAmount.value === null) {
      start.disabled = true;
      return;
    } else {
      start.disabled = false;
    }
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  },

  addIncomeBlock: function () {
    let cloneExpensesItem = incomeItem[0].cloneNode(true);
    let cloneExpensesItem2 = cloneExpensesItem.children;
    for (let i = 0; i < cloneExpensesItem2.length; i++) {
      cloneExpensesItem2[i].value = "";
    }
    incomeItem[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
    incomeItem = document.querySelectorAll(".income-items");

    if (incomeItem.length === 3) {
      incomePlus.style.display = "none";
    }
  },

  addExpensesBlock: function () { 
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneExpensesItem2 = cloneExpensesItem.children;
    for (let i = 0; i < cloneExpensesItem2.length; i++) {
      cloneExpensesItem2[i].value = "";
    }
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },

  getExpenses: function () { //
    const _this = this;
    expensesItems.forEach(function (items) {
      let itemExpenses = items.querySelector('.expenses-title').value;
      let cashExpenses = items.querySelector('.expenses-amount').value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getIncome: function () {
    const _this = this;
    incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = +cashIncome;
      }
    });
  },

  getIncomeMonth: function () {
    let sum = 0;
    for (let key in this.income) {
      sum += +this.income[key];
    }
    return sum;
  },

  getAddIncome: function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  },

  getAddExpenses: function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(", ");
    addExpenses.forEach(function (item) {

      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  },

  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key]; 
    }
    this.expensesMonth = sum;
    return sum;
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth();
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetMonth;
  },

  getPeriod: function () {
    periodAmount.value = periodSelect.value;
    periodAmount.textContent = periodSelect.value;
  },

  getTargetMonth: function () {

    return Math.ceil(targetAmount.value / this.getBudget());
  },

  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },

  reset: function () {
    let deleteText = document.querySelectorAll("[type=text]");
    deleteText.forEach(function (items) {

      depositCheck.checked = false;
      periodAmount.textContent = "1";
      periodSelect.value = "1";
      items.disabled = false;
      items.value = '';
    });
    budgetDayValue.disabled = true;
    budgetMonthValue.disabled = true;
    expensesMonthValue.disabled = true;
    additionalIncomeValue.disabled = true;
    additionalExpensesValue.disabled = true;
    incomePeriodValue.disabled = true;
    targetMonthValue.disabled = true;
    start.style.display = '';
    cancel.style.display = '';

    start.disabled = true;
  }
};


let startBind = function () {
  this.start();
};

periodSelect.addEventListener("input", function (event) {
  periodAmount.textContent = periodSelect.value;
});

start.addEventListener('click', startBind.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.monthAmmountValue);
cancel.addEventListener('click', appData.reset);