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
    mission: 150000,
    period: 3,
    asking: function(){
        let addExpenses;
        do{
            addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'еда, вода, жизнь');
        } while (addExpenses);
            appData.addExpenses = addExpenses.toLowerCase().split(', '); 
            appData.deposit = confirm('Есть ли у вас депозит в банке?', true);
        
        let sum;
        for (let i = 0; i < 2; i++) {
            
            appData.expenses[i] = prompt('Введите обязательную статью расходов');
          
            sum += +prompt('Во сколько это обойдется?');
        }
        console.log(expenses);
        return sum; 
},
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses){
            sum += appData.expenses[key];
        }
        return sum;
    },
    getBudget: function(){
        appData.budgetMonth =  money - expensesAmount;
        appData.budgetDay = budgetMonth / 30;
    },
    getTargetMonth: function(){
        if (appData.getTargetMonth() < 0) {
            console.log('Цель не будет достигнута');
        }else {
            console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
        }
        return appData.mission / appData.getBudget();
        
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
    
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц:  ' + appData.expensesMonth);
console.log('Период равен ' + appData.period + ' месяцев');
console.log(appData.getStatusIncome());





