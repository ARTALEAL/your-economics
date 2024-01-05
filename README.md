# vue-crm

## Описание

Данный проект представляет собой SPA приложение для ведения своих расходов и доходов по категориям.  
Имеется возможность авторизации, используется FireStore база данных.

## Функциональность

- валидация форм vuelidate
- использована библиотека materialize.css
- использование шаблонов (layouts)
- Используются защищенные роуты (ProtectedRoutes)
- Есть функциональность авторизации и регистрации
- База данных (FireStore)
- Сообщения пользователю
- Лоадеры
- Используется fixer api для загрузки текуших курсов валют
- vuejs-paginate-next plugin для пагинации
- используется библиотека lodash
- mixins
- chartJS библиотека для построения графика расходов
- Сделана утилита для генерации цветов (100 шт. для графического отображения)
- Реализована функция перевода приложения (без использования библиотек)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
