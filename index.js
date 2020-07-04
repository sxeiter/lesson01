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

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
start.disabled = true;
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    
    start: function() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getTargetMonth();
        this.getPeriod();
        this.calcPeriod();
        this.getBudget();
        this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'block';
	    cancel.style.marginLeft = '150px';
    },
    getCheckSalaryAmount: function(){
        if(salaryAmount.value === '' || !isNumber(salaryAmount.value)){
            start.disabled = true;
            return;
        } else {
            start.disabled = false;
        }
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        });
    },
    addExpensesBlock: function(){
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function(){
        const _this = this;
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
        }); 
    },
    getAddExpenses: function(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                _this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    },
    getPeriod: function () {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	},
    getExpensesMonth : function (){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        return sum;
    },
    getIncomeMonth : function (){
        let sum = 0;
        for (let key in appData.income) {
            sum += +appData.income[key];
        }
        return sum;
    },
    getBudget: function(){
        this.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth();
        this.budgetDay = Math.floor(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value / this.budgetMonth);               
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    reset : function(){
        let deleteText = document.querySelectorAll("[type=text]");
            deleteText.forEach(function(items){
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
      
       
let startBind = function() {  
    this.start();
};

periodSelect.addEventListener("input", function(event){
    periodAmount.textContent = periodSelect.value;
});

start.addEventListener('click', startBind.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.getCheckSalaryAmount);
cancel.addEventListener('click', appData.reset);