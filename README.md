# Дипломный проект курса «React»

## Интернет-магазин обуви «Bosa Noga»

Полнофункциональный интернет-магазин обуви: каталог товаров с поиском и фильтрацией по категориям, страница товара с выбором размера, корзина с сохранением в `localStorage` и форма оформления заказа.


---

### Frontend

**Стек:**

- React 19 + Vite
- React Router v7
- Redux + Redux Thunk
- Bootstrap 4.3.1 + Font Awesome 4.7 (CDN)

**Архитектура:** Feature-Sliced Design (FSD)

```
src/
  app/          — провайдеры, Redux store
  pages/        — home, catalog, item, cart, about, contacts, not-found
  widgets/      — header, footer, top-sales, catalog-section
  shared/
    api/        — fetch-функции к API
    ui/         — Preloader, ErrorBlock
    config/     — маршруты и константы
```

#### Первый запуск

```bash
# 1. Зависимости фронтенда
npm install

# 2. Зависимости бэкенда
cd backend && npm install && cd ..

# 3. Запуск (фронтенд + бэкенд одновременно)
npm start
```

Приложение откроется на `http://localhost:5173`, API — на `http://localhost:7070`.

#### Последующий запуск

```bash
npm start          # обычный режим
npm run start:flaky  # режим с задержками и ошибками (проверка обработки ошибок)
```

Только фронтенд (без бэкенда):

```bash
npm run dev
```

#### Сборка

```bash
npm run build
```

---

### Backend

REST API на Node.js, запускается на порту `7070`.

| Метод  | URL               | Описание                              |
|--------|-------------------|---------------------------------------|
| GET    | `/api/top-sales`  | Хиты продаж                           |
| GET    | `/api/categories` | Список категорий                      |
| GET    | `/api/items`      | Товары (params: `categoryId`, `offset`, `q`) |
| GET    | `/api/items/:id`  | Товар по ID                           |
| POST   | `/api/order`      | Оформить заказ                        |

