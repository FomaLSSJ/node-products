# Настройка
В корне должен лежать файл ```.env``` с настройками вида:
``` text
# Среда приложения
NODE_ENV=development
# Порт приложения
NODE_PORT=3000
# Секретное слова для session
NODE_SECRET=SECRET_WORD
# Domain или IP для MongoDB
MONGO_HOST=localhost
# Порт для MongoDB
MONGO_PORT=27017
# База для MongoDB
MONGO_DBNAME=test
```

# Приложения для запуска
- ```Node JS``` >= 8.11.1
- ```NPM``` >= 5.6.0
- ```MongoDB``` >= 3.4

# Зависимости
- ```express```, фреймворк для более простй и гибкой настройки web-приложений.
- ```body-parser```, использует ```express``` для парсинга тела запросов.
- ```express-session```, использует ```express``` для работы с сессиями.
- ```dotenv```, используется для подхвата ENV параметров из ```.env``` файла и передачи в приложение.
- ```lodash```, сахар и много вспомогательных инструментов.
- ```mongodb```, драйвер для работы с MongoDB.
- ```mocha```, фреймворк для запуска тестов.
- ```chai```, библиотека для удобного тестирования.
- ```chai-http```, имитация http запросов для ```chai```.
- ```eslint```, инструмент для проверки качества кода.

# Запуск
Перед запуском надо выполнить ```npm i``` для установки зависимостей.

Для запуска с тестами нужно ставить с ключом для разработки ```npm i --dev```.

- Для начала надо создать первичные данные командой ```npm run seeder```
- Запуск тестов ```npm test``` или ```npm t```.
- Запуск приложения ```npm start```.
- Проверка на code-style ```npm run eslint```.