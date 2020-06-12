'use strict';
let money; 

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
    /* while (!isNumber(money)) {
    money = prompt('Ваш ежемесячный доход?');
} */
do{
    money = +prompt('Ваш ежемесячный доход?');
}
while(!isNumber(money));
};

start();


let income = 'Фриланс'; 
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'еда, вода, жизнь'); 
let deposit = confirm('Есть ли у вас депозит в банке?', true); 
let mission = 140000; 
let period = 12;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов', 'машина');
 
        sum += +prompt('Во сколько это обойдется?')
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц:  ' + expensesAmount);

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
    return mission / accumulatedMonth;
};

let budgetDay = accumulatedMonth / 30;

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на день ' + Math.floor(budgetDay) + ' рублей');

if (getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
}else {
    console.log('Цель будет достигнута за: ' + Math.ceil(getTargetMonth()) + ' месяцев');
}

let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    }else if (budgetDay > 600) {
        return ('У вас средний уровень дохода');
    }else if (budgetDay <= 600 && budgetDay > 0) {
        return ('К сожалению уровень дохода ниже среднего');
    }else if (budgetDay === 0 || budgetDay < 0) {
        return ('Что-то пошло не так');
    }
};
console.log(getStatusIncome());

