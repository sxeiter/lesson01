'use strict';

let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  incomeItems = document.querySelectorAll('.income-items');


start.disabled = true;

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
};

AppData.prototype.start = function () {
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
  let inputDel = document.querySelectorAll('[type="text"]');
  inputDel.forEach(function (item) {
    item.disabled = true;
  });
};

AppData.prototype.monthAmmountValue = function () {
  if (salaryAmount.value === "" || salaryAmount.value === null) {
    start.disabled = true;
    return;
  } else {
    start.disabled = false;
  }
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addIncomeBlock = function () {
  let cloneExpensesItem = incomeItems[0].cloneNode(true);
  let cloneExpensesItem2 = cloneExpensesItem.children;
  for (let i = 0; i < cloneExpensesItem2.length; i++) {
    cloneExpensesItem2[i].value = "";
  }
  incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};

AppData.prototype.addExpensesBlock = function () { 
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
};

AppData.prototype.getExpenses = function () { 
  const _this = this;
  expensesItems.forEach(function (items) {
    let itemExpenses = items.querySelector('.expenses-title').value;
    let cashExpenses = items.querySelector('.expenses-amount').value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    }
  });
};

AppData.prototype.getIncomeMonth = function () {
  let sum = 0;
  for (let key in this.income) {
    sum += +this.income[key];
  }
  return sum;
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(", ");
  addExpenses.forEach(function (item) {

    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in this.expenses) {
    sum += +this.expenses[key]; 
  }
  this.expensesMonth = sum;
  return sum;
};
AppData.prototype.changeRange = function () {

  incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.getBudget = function () {
  const _this = this;
  this.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth();
  this.budgetDay = Math.floor(_this.budgetMonth / 30);
  return _this.budgetMonth;
};

AppData.prototype.getPeriod = function () {
  periodAmount.value = periodSelect.value;
  periodAmount.textContent = periodSelect.value;
};

AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.getBudget());
};

AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  let deleteText = document.querySelectorAll("[type=text]");
  deleteText.forEach(function (items) {
    periodAmount.textContent = "1";
    periodSelect.value = "1";
    items.disabled = false;
    items.value = '';
  });

  let input = document.querySelectorAll('input');
  input.forEach(function (item) {
    item.value = '';
    cancel.style.display = 'none';
    start.style.display = 'inline';
  });

  let incomeItemDel = document.querySelectorAll('.income-items');
  incomeItemDel.forEach(function (item, i) {
    if (i !== 0) {
      item.remove();
    }
  });

  let expensesItems = document.querySelectorAll('.expenses-items');
  expensesItems.forEach(function (item, i) {
    if (i !== 0) {
      item.remove();
    }
  });
};

AppData.prototype.eventListeners = function () {
  let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  start.addEventListener('click', this.start);
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.changeRange);
  salaryAmount.addEventListener('input', this.monthAmmountValue);
  cancel.addEventListener('click', this.reset);
  periodSelect.addEventListener("input", function (event) {
    periodAmount.textContent = periodSelect.value;
  });
};

const appData = new AppData();
appData.start = appData.start.bind(appData);
appData.changeRange = appData.changeRange.bind(appData);
appData.reset = appData.reset.bind(appData);
appData.eventListeners();
console.log(appData);