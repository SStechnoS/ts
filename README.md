# Карткова гра "Битва героїв" – Інструкції для перевірки

Цей проєкт демонструє роботу з TypeScript, створення типів, інтерфейсів та реалізацію простої логіки бою між героями з різними властивостями.

## Коротко про функціонал
- Створення героїв різних типів (Warrior, Mage, Archer) з унікальними базовими характеристиками.
- Здійснення пошуку героя за певними властивостями (наприклад, за типом чи іменем).
- Проведення раундів бою між двома героями з розрахунком пошкоджень, критичних ударів та зміною стану здоров’я.
- Виведення результатів боїв у консоль.

Компіляція та запуск коду: tsc

Запустіть скомпільований код через Node.js: node index.js

Перевірка результатів:

В терміналі ви побачите створених героїв та декілька раундів боїв між ними.
Перевірте логіку: чи змінюється здоров’я після удару, чи відображаються критичні атаки, чи коректно визначається переможець.
Перегляньте результати пошуку героя за властивостями (консольний вивід продемонструє знайдених героїв).
Оцінювання відповідності завданню:

В коді присутні явні типи, інтерфейси та enum-и.
Код компілюється без помилок.
Реалізовано функції для створення, пошуку і бою героїв.
Є приклад практичного використання (створення героїв, пошук, бій).
Коміти у репозиторії зрозумілі.
Присутній tsconfig.json з базовими налаштуваннями.
