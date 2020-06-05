let money = 40000; 
let income = 'продаю мёд'; 
let addExpenses = 'Еда, Коммуналка, Развлечения'; 
let deposit = true; 
let mission = 1400000; 
let period = 12;
let budgetDay;



console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

budgetDay = money / 30;
console.log(budgetDay);