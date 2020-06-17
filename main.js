'use strict';

let money; 
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
do{
    money = +prompt('Ваш ежемесячный доход?');
}
while(!isNumber(money));
};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 3,
    asking: function(){

        if (confirm('Есть ли у вас дополнительный источник дохода?')){
            let itemIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'курьер');
            }
            while(isNumber(itemIncome) || itemIncome === '' || itemIncome === null);

            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'еда, вода, жизнь');
        appData.addExpenses = addExpenses.toLowerCase().split(', '); 

        appData.deposit = confirm('Есть ли у вас депозит в банке?', true);
        for (let i = 0; i < 2; i++) {
            
            let itemExpenses;
            do {
                itemExpenses = prompt('Введите обязательную статью расходов ', 'квартплата');
            }
            while(isNumber(itemExpenses) || itemExpenses === '' || itemExpenses === null);
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 2500);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = +cashExpenses;
    }
},
    getExpensesMonth : function (){
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return appData.mission / appData.budgetMonth;               
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }else if (appData.budgetDay > 600) {
            return ('У вас средний уровень дохода');
        }else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
            return ('К сожалению уровень дохода ниже среднего');
        }else if (appData.budgetDay === 0 || appData.budgetDay < 0) {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            //appData.percentDeposit = prompt('Какой годовой процент?', 10);
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit));

            //appData.moneyDeposit = prompt('Какая сумма заложена?', 80000);


            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 80000);
            }
            while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();

console.log(appData.addExpenses);
console.log('Расходы за месяц:  ' + (appData.expensesMonth));

if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
}else {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
}

console.log(appData.getStatusIncome());

let infoAppData = function(){
    for(let key in appData){
        console.log('Наша программа включает в себя данные: ', key, appData[key]);
    }
};

infoAppData();

console.log(appData.addExpenses.substring(0, 1).toUppetCase().split(', '));