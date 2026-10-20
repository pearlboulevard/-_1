// Страница «Решение алгоритмической задачи».
// Описаны все 18 задач (1001–1018). Выберите в списке номер своей задачи.

// Вспомогательное: красиво округляем число
function fmt(x) { return String(Number(x.toPrecision(10))); }
function sorted(arr) { return arr.slice().sort(function (p, q) { return p - q; }); }

var TASKS = [
  { n: 1001, text: 'Имеется коробка со сторонами: A × B × C. Определить, пройдёт ли она в дверь с размерами M × K.',
    fields: [['a', 'A', 30], ['b', 'B', 40], ['c', 'C', 50], ['m', 'M', 45], ['k', 'K', 60]],
    solve: function (v) {
      var box = sorted([v.a, v.b, v.c]), door = sorted([v.m, v.k]);
      // Коробку можно повернуть: две наименьшие стороны должны поместиться в дверь
      return (box[0] <= door[0] && box[1] <= door[1]) ? 'коробка пройдёт в дверь' : 'коробка не пройдёт в дверь';
    } },
  { n: 1002, text: 'Дано вещественное число. Определить, какое это число: положительное, отрицательное, ноль.',
    fields: [['x', 'Число X', -5]],
    solve: function (v) { return v.x > 0 ? 'положительное' : (v.x < 0 ? 'отрицательное' : 'ноль'); } },
  { n: 1003, text: 'Можно ли из бревна, имеющего диаметр поперечного сечения D, выпилить квадратный брус шириной A?',
    fields: [['d', 'Диаметр D', 30], ['a', 'Ширина бруса A', 20]],
    solve: function (v) {
      // диагональ квадрата A*sqrt(2) должна быть не больше диаметра
      var diag = v.a * Math.SQRT2;
      return diag <= v.d ? 'можно (диагональ бруса ' + fmt(diag) + ' ≤ D)' : 'нельзя (диагональ бруса ' + fmt(diag) + ' > D)';
    } },
  { n: 1004, text: 'Можно ли в квадратном зале площадью S поместить круглую сцену радиусом R так, чтобы от стены до сцены был проход не менее K?',
    fields: [['s', 'Площадь зала S', 400], ['r', 'Радиус сцены R', 5], ['k', 'Проход K', 2]],
    solve: function (v) {
      var side = Math.sqrt(v.s);
      // сцена по центру: (сторона − диаметр) / 2 ≥ K
      var gap = (side - 2 * v.r) / 2;
      return gap >= v.k ? 'можно (проход ' + fmt(gap) + ' ≥ K)' : 'нельзя (проход ' + fmt(gap) + ' < K)';
    } },
  { n: 1005, text: 'Дано. Номер места в плацкартном вагоне. Определить, какое это место: верхнее или нижнее, в купе или боковое.',
    fields: [['n', 'Номер места (1–54)', 17]],
    solve: function (v) {
      if (!Number.isInteger(v.n) || v.n < 1 || v.n > 54) return 'в плацкартном вагоне места с 1 по 54';
      var level = (v.n % 2 === 1) ? 'нижнее' : 'верхнее';
      var kind = v.n <= 36 ? 'в купе (купе №' + Math.ceil(v.n / 4) + ')' : 'боковое';
      return level + ', ' + kind;
    } },
  { n: 1006, text: 'Известна денежная сумма. Разменять её купюрами 500, 100, 10 и монетой 2 руб., если это возможно.',
    fields: [['m', 'Сумма, руб.', 1736]],
    solve: function (v) {
      if (!Number.isInteger(v.m) || v.m < 0) return 'введите целую неотрицательную сумму';
      var rest = v.m, out = [];
      var n500 = Math.floor(rest / 500); rest -= n500 * 500;
      var n100 = Math.floor(rest / 100); rest -= n100 * 100;
      var n10 = Math.floor(rest / 10); rest -= n10 * 10;
      if (rest % 2 !== 0) return 'разменять нельзя (остаток ' + rest + ' руб. не делится на 2)';
      return '500×' + n500 + ', 100×' + n100 + ', 10×' + n10 + ', 2×' + (rest / 2);
    } },
  { n: 1007, text: 'Имеются две ёмкости: кубическая с ребром A, цилиндрическая с высотой H и радиусом основания R. Определить, поместится ли жидкость объёма M в первую ёмкость, во вторую, в обе.',
    fields: [['a', 'Ребро A', 10], ['h', 'Высота H', 20], ['r', 'Радиус R', 5], ['m', 'Объём M', 1500]],
    solve: function (v) {
      var v1 = v.a * v.a * v.a, v2 = Math.PI * v.r * v.r * v.h;
      var f1 = v.m <= v1, f2 = v.m <= v2;
      var txt = f1 && f2 ? 'поместится в обе' : (f1 ? 'поместится только в первую' : (f2 ? 'поместится только во вторую' : 'не поместится ни в одну'));
      return txt + ' (V1 = ' + fmt(v1) + ', V2 = ' + fmt(v2) + ')';
    } },
  { n: 1008, text: 'Имеются две ёмкости: кубическая с ребром A, цилиндрическая с высотой H и радиусом основания R. Определить, можно ли заполнить жидкостью объёма M первую ёмкость, вторую, обе.',
    fields: [['a', 'Ребро A', 10], ['h', 'Высота H', 20], ['r', 'Радиус R', 5], ['m', 'Объём M', 1500]],
    solve: function (v) {
      var v1 = v.a * v.a * v.a, v2 = Math.PI * v.r * v.r * v.h;
      var f1 = v.m >= v1, f2 = v.m >= v2, both = v.m >= v1 + v2;   // «обе» — заполнить сразу обе
      return 'первую: ' + (f1 ? 'да' : 'нет') + '; вторую: ' + (f2 ? 'да' : 'нет') + '; обе: ' + (both ? 'да' : 'нет') +
             ' (V1 = ' + fmt(v1) + ', V2 = ' + fmt(v2) + ')';
    } },
  { n: 1009, text: 'Даны вещественные числа: X, Y, Z. Определить, существует ли треугольник с такими длинами сторон и, если существует, будет ли он прямоугольным.',
    fields: [['x', 'X', 3], ['y', 'Y', 4], ['z', 'Z', 5]],
    solve: function (v) {
      var s = sorted([v.x, v.y, v.z]);
      if (s[0] <= 0 || s[0] + s[1] <= s[2]) return 'треугольник не существует';
      var right = Math.abs(s[0] * s[0] + s[1] * s[1] - s[2] * s[2]) < 1e-9;
      return 'треугольник существует, ' + (right ? 'он прямоугольный' : 'он не прямоугольный');
    } },
  { n: 1010, text: 'Дано число X. Определить, принадлежит ли это число заданному промежутку [a, b].',
    fields: [['x', 'X', 7], ['a', 'a', 1], ['b', 'b', 10]],
    solve: function (v) {
      var lo = Math.min(v.a, v.b), hi = Math.max(v.a, v.b);
      return (v.x >= lo && v.x <= hi) ? 'принадлежит промежутку' : 'не принадлежит промежутку';
    } },
  { n: 1011, text: 'Определить значение функции Z = 1/(XY) при произвольных X и Y.',
    fields: [['x', 'X', 2], ['y', 'Y', 4]],
    solve: function (v) {
      var p = v.x * v.y;
      return p === 0 ? 'функция не определена (деление на ноль)' : 'Z = ' + fmt(1 / p);
    } },
  { n: 1012, text: 'Даны вещественные числа: A, B, C. Определить, выполняются ли неравенства A < B < C или A < B > C и какое именно неравенство выполняется.',
    fields: [['a', 'A', 1], ['b', 'B', 5], ['c', 'C', 3]],
    solve: function (v) {
      if (v.a < v.b && v.b < v.c) return 'выполняется A < B < C';
      if (v.a < v.b && v.b > v.c) return 'выполняется A < B > C';
      return 'ни одно из неравенств не выполняется';
    } },
  { n: 1013, text: 'Даны вещественные числа X и Y. Вычислить Z. Z = XY при X > Y, Z = ln(X + Y) в противном случае.',
    fields: [['x', 'X', 3], ['y', 'Y', 2]],
    solve: function (v) {
      if (v.x > v.y) return 'Z = X·Y = ' + fmt(v.x * v.y);
      if (v.x + v.y <= 0) return 'ln(X + Y) не определён (X + Y ≤ 0)';
      return 'Z = ln(X + Y) = ' + fmt(Math.log(v.x + v.y));
    } },
  { n: 1014, text: 'Даны вещественные положительные числа a, b, c, d. Выясните, может ли прямоугольник со сторонами a, b уместиться внутри прямоугольника со сторонами c, d так, чтобы каждая сторона внутреннего прямоугольника была параллельна или перпендикулярна стороне внешнего прямоугольника.',
    fields: [['a', 'a', 3], ['b', 'b', 4], ['c', 'c', 5], ['d', 'd', 6]],
    solve: function (v) {
      if (v.a <= 0 || v.b <= 0 || v.c <= 0 || v.d <= 0) return 'числа должны быть положительными';
      var ok = (v.a <= v.c && v.b <= v.d) || (v.a <= v.d && v.b <= v.c);
      return ok ? 'уместится' : 'не уместится';
    } },
  { n: 1015, text: 'Дано вещественное число A. Вычислить x = a² + 4 + 5 при a < 62; в противном случае x = 1/a² + 4a + 5.',
    fields: [['a', 'A', 10]],
    solve: function (v) {
      if (v.a < 62) return 'x = ' + fmt(v.a * v.a + 4 + 5);
      return 'x = ' + fmt(1 / (v.a * v.a) + 4 * v.a + 5);
    } },
  { n: 1016, text: 'Дано вещественное число A. Вычислить x = 0 при a > 100; x = a при a < 61, в противном случае x = a⁴.',
    fields: [['a', 'A', 70]],
    solve: function (v) {
      if (v.a > 100) return 'x = 0';
      if (v.a < 61) return 'x = ' + fmt(v.a);
      return 'x = ' + fmt(Math.pow(v.a, 4));
    } },
  { n: 1017, text: 'Дано вещественное число A. Вычислить x = a⁴ при a < 10; x = a при a > 61, в противном случае x = a − sin(a²).',
    fields: [['a', 'A', 30]],
    solve: function (v) {
      if (v.a < 10) return 'x = ' + fmt(Math.pow(v.a, 4));
      if (v.a > 61) return 'x = ' + fmt(v.a);
      return 'x = ' + fmt(v.a - Math.sin(v.a * v.a));
    } },
  { n: 1018, text: 'Известен год. Определить, будет ли этот год високосным, и к какому веку этот год относится.',
    fields: [['y', 'Год', 2024]],
    solve: function (v) {
      if (!Number.isInteger(v.y) || v.y < 1) return 'введите натуральный номер года';
      var leap = (v.y % 4 === 0 && v.y % 100 !== 0) || v.y % 400 === 0;
      return (leap ? 'високосный' : 'не високосный') + ', ' + Math.ceil(v.y / 100) + '-й век';
    } }
];

var select = document.getElementById('taskSelect');
var fieldsBox = document.getElementById('fields');
var resultInput = document.getElementById('result');
var form = document.getElementById('UserEnter');
var NOT_DEFINED = 'не определен';

function currentTask() {
  return TASKS.filter(function (t) { return String(t.n) === select.value; })[0];
}

// Строим поля ввода для выбранной задачи
function renderTask() {
  var t = currentTask();
  document.getElementById('task').value = t.text;
  fieldsBox.innerHTML = '';
  t.fields.forEach(function (f) {
    var li = document.createElement('li');
    li.innerHTML = '<label for="' + f[0] + '">' + f[1] + ': </label><input id="' + f[0] + '" name="' + f[0] + '" type="number" step="any" value="' + f[2] + '">';
    fieldsBox.appendChild(li);
  });
  resultInput.value = NOT_DEFINED;
}

// Действие 1: «Проверить» — считываем числа и запускаем решение
function verify() {
  var t = currentTask(), v = {};
  for (var i = 0; i < t.fields.length; i++) {
    var raw = document.getElementById(t.fields[i][0]).value;
    var num = parseFloat(raw);
    if (raw === '' || isNaN(num)) { resultInput.value = 'введите числа во все поля'; return false; }
    v[t.fields[i][0]] = num;
  }
  resultInput.value = t.solve(v);
  return true;
}

// Действие 2: «Отправить» — отправляем на сервер, только если результат уже получен
function send() {
  if (!verify() || resultInput.value === NOT_DEFINED) return;
  form.submit();
}

TASKS.forEach(function (t) {
  var o = document.createElement('option');
  o.value = t.n; o.textContent = t.n;
  select.appendChild(o);
});
select.addEventListener('change', renderTask);
document.getElementById('verify').addEventListener('click', verify);
document.getElementById('send').addEventListener('click', send);
renderTask();
