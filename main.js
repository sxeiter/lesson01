'use strict';
let money = prompt('Ваш ежемесячный доход?', 4000); 
let income = 'продаю мёд'; 
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'еда, вода, жизнь'); 
let deposit = confirm('Есть ли у вас депозит в банке?', true); 
let expenses1 = prompt('Введите обязательную статью расходов', 'машина');
let amount1 = +(prompt('Во сколько вам это обойдется?', 100));
let expenses2 = prompt('Введите обязательную статью расходов', 'киношки');
let amount2 = +(prompt('Во сколько вам это обойдется?', 100));
let mission = 1400000; 
let period = 12;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function() {
    return amount1 + amount2;
};
console.log('Расходы за месяц:  ' + getExpensesMonth());

let getAccumulatedMonth = function() {
    return money - getExpensesMonth();
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
console.log('Цель будет достигнута за: ' + Math.ceil(mission/getTargetMonth()) + ' месяцев');
console.log('Бюджет на день ' + Math.floor(budgetDay) + ' рублей');

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

