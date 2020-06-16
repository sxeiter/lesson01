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
        } while (addExpenses === null);
            appData.addExpenses = addExpenses.toLowerCase().split(', '); 
            appData.deposit = confirm('Есть ли у вас депозит в банке?', true);
        
        let expensesMonth = 0;
        for (let i = 0; i < 2; i++) {
            
            appData.expenses[i] = prompt('Введите обязательную статью расходов');
          
            expensesMonth += +prompt('Во сколько это обойдется?');
        }
        console.log(expensesMonth);
        return expensesMonth; 
    },
    getExpensesMonth : function (){
        //appData.expensesMonth = 


        let sum = 0;
        for (let key in appData.expensesMonth) {
            sum += appData.expensesMonth;
            }
        return appData.expensesMonth;
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
        console.log(appData.budgetMonth);
        console.log(appData.budgetDay);
    },
    getTargetMonth: function(){
        let missionMoney = Math.ceil(appData.mission / appData.budgetMonth);
        if (missionMoney < 0) {
            console.log('Цель не будет достигнута');
        }else {
            console.log('Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев');
        }
        
        
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

console.log('Расходы за месяц:  ' + (appData.budget - appData.expensesMonth));
console.log(appData.getStatusIncome());





