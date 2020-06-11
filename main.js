'use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money; 
let income = 'продаю мёд'; 
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'еда, вода, жизнь'); 
let deposit = confirm('Есть ли у вас депозит в банке?', true); 
let mission = 1400000; 
let period = 12;

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

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function() {
    let sum = 0;

    for (let i =0; i < 2; i++) {

        if (i === 0) {
            let expenses1 = prompt('Введите обязательную статью расходов', 'машина');
        }else if (i === 1) {
            let expenses2 = prompt('Введите обязательную статью расходов', 'киношки');
        }
        
        sum += isNumber(+prompt('Во сколько это обойдется?'))
    }
    console.log(sum);
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
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на день ' + Math.floor(budgetDay) + ' рублей');

if (getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
}else {
    console.log('Цель будет достигнута за: ' + Math.ceil(mission/getTargetMonth()) + ' месяцев');
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

