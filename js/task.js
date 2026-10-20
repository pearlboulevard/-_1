// Страница «Решение алгоритмической задачи».
// Задача 1002: дано вещественное число. Определить, какое это число: положительное, отрицательное, ноль.

var TASK_TEXT = 'Дано вещественное число. Определить, какое это число: положительное, отрицательное, ноль.';
var NOT_DEFINED = 'не определен';

var form = document.getElementById('UserEnter');
var fieldsBox = document.getElementById('fields');
var resultInput = document.getElementById('result');

// Показываем формулировку и поле для ввода числа
document.getElementById('task').value = TASK_TEXT;
fieldsBox.innerHTML = '<li><label for="x">Число X: </label><input id="x" name="x" type="number" step="any" value="-5"></li>';
resultInput.value = NOT_DEFINED;

// Решение задачи
function solve(x) {
  if (x > 0) return 'положительное';
  if (x < 0) return 'отрицательное';
  return 'ноль';
}

// Действие 1: «Проверить» — читаем число и выводим результат
function verify() {
  var raw = document.getElementById('x').value;
  var x = parseFloat(raw);
  if (raw === '' || isNaN(x)) {
    resultInput.value = 'введите число';
    return false;
  }
  resultInput.value = solve(x);
  return true;
}

// Действие 2: «Отправить» — отправляем на сервер только после получения результата
function send() {
  if (!verify() || resultInput.value === NOT_DEFINED) return;
  form.submit();
}

document.getElementById('verify').addEventListener('click', verify);
document.getElementById('send').addEventListener('click', send);
