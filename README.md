[![Tests for sprint 13](https://github.com/FarkhadMamedoff/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/FarkhadMamedoff/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/FarkhadMamedoff/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/FarkhadMamedoff/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд
EXPRESS-MESTO-GHA - проект, реализуемый на базе учебной платформы Яндекс.Практикум.
Проект представляет из себя сервер для взаимодействия с frontend-частью проекта Mesto.

## Технологии
### Разработка
    Используется:
- express.js;
- Работа с базами данных (MongoDB) - mongoose;
- Линтер;
- nodemon.
___
## Что реализовано
- Реализована структура проекта, код разбит на роуты, модели и контроллеры;
- Реализованы роуты для пользователя - создание, обновление информации, обновление аватара, получение всех пользователей;
- Реализованы роуты для карточки - создание, удаление, лайк, дизлайк, получение всех карточек;
- Реализована работа с БД;
- Реализована авторизация и регистрация;
- Все ошибки обрабатываются и возвращаются через центразованный обработчик ошибок.

___
## Планы на будущее
- Подключение frontend-части.

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

[Репозиторий с проектом](https://github.com/FarkhadMamedoff/express-mesto-gha)
