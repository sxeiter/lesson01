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
let budgetMonth = money - (amount1 + amount2);
let budgetDay = budgetMonth / 30;


console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + Math.ceil(mission/budgetMonth) + ' месяцев');
console.log('Бюджет на день ' + Math.floor(budgetDay) + ' рублей');

console.log(typeof budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}else if (budgetDay > 600) {
    console.log('У вас средний уровень дохода');
}else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению уровень дохода ниже среднего');
}else if (budgetDay === 0 || budgetDay < 0) {
    console.log('Что-то пошло не так');
}