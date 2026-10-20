// Страница «Изменяем кириллицу на латиницу по клику»

// Таблица транслитерации (близка к международной схеме для загранпаспортов)
var MAP = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
  'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

// Перевод строки: идём по буквам, сохраняем заглавные
function translit(text) {
  var result = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    var low = ch.toLowerCase();
    if (low in MAP) {
      var lat = MAP[low];
      if (ch !== low && lat.length > 0) {          // буква была заглавной
        lat = lat[0].toUpperCase() + lat.slice(1);
      }
      result += lat;
    } else {
      result += ch;                                // цифры, пробелы, знаки — как есть
    }
  }
  return result;
}

// Год → римские цифры (2005 → MMV)
function toRoman(num) {
  var table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
               [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  var out = '';
  for (var i = 0; i < table.length; i++) {
    while (num >= table[i][0]) {
      out += table[i][1];
      num -= table[i][0];
    }
  }
  return out;
}

// Поля, которые меняем (id элементов <span> на странице)
var FIELDS = ['surname', 'name', 'patronymic'];

function toLatin() {
  for (var i = 0; i < FIELDS.length; i++) {
    var el = document.getElementById(FIELDS[i]);
    if (el.dataset.orig === undefined) el.dataset.orig = el.innerText;   // запоминаем оригинал
    el.innerText = translit(el.dataset.orig);
  }
  var birth = document.getElementById('birth');
  if (birth.dataset.orig === undefined) birth.dataset.orig = birth.innerText;
  var parts = birth.dataset.orig.split('.');                 // ["12","03","2005"]
  birth.innerText = parts[0] + '.' + parts[1] + '.' + toRoman(parseInt(parts[2], 10));
}

function toCyrillic() {
  var all = FIELDS.concat(['birth']);
  for (var i = 0; i < all.length; i++) {
    var el = document.getElementById(all[i]);
    if (el.dataset.orig !== undefined) el.innerText = el.dataset.orig;
  }
}

// Обработка события: подписываем кнопки на клик
document.getElementById('toLatin').addEventListener('click', toLatin);
document.getElementById('toCyr').addEventListener('click', toCyrillic);
