# To-Do practic

To-Do Practic — это приложение для управления списками дел, созданное с акцентом на масштабируемость и лёгкую расширяемость функционала. Проект разработан с учётом современных подходов к разработке и предоставляет пользователям удобный интерфейс для ведения списка дел. Приложение включает минимально необходимый функционал для полноценного ежедневного использования.

## Используемый стэк

Проект разработан с использованием следующих технологий:

- **React;**
- **TypeScript;**
- **SCSS;**
- **MUI (Material-UI);**
- **CRA.**

## Используемые библиотеки

Проект использует ряд ключевых библиотек, которые обеспечивают функциональность, производительность и удобство разработки:

- **React Hook Form** — библиотека для работы с формами. Использована для упрощения масштабируемости приложения в будущем.
- **Lottie React** — библиотека для анимации Lottie-файлов. Позволяет легко внедрять анимации без необходимости использования сложных CSS-анимаций.
- **Hello Pangea DnD** — библиотека для реализации drag-and-drop (перетаскивания элементов).
- **clsx** — утилита для удобного комбинирования классов CSS.

## **Функциональные возможности**

- **Добавление задачи:** Пользователь может добавить новую задачу с её описанием.
- **Выполнение задачи:** Пользователь может отметить задачу как "выполнена". Все выполненные задачи не удаляются сразу, а попадают в список завершённых. Этот список можно просмотреть в любой момент и при необходимости снять метку "выполнена" с задачи — тогда она снова вернётся в общий список невыполненных задач.
- **Метка "важное":** У пользователя есть возможность пометить задачу как "важная" перед её созданием. После того как задача создана, метку можно добавлять или удалять в любой момент времени.
- **Изменение порядка задач:** Пользователи могут изменять порядок актуальных задач с помощью ручного перетаскивания.
- **Создание списков:** Приложение имеет один основной список задач по умолчанию. Пользователи могут создавать собственные списки и переключаться между ними. Задачи, созданные в конкретном списке, принадлежат только ему.
- **Удаление задач/списков:** Есть возможность удалить конкретную задачу либо все выполненные задачи. Также можно удалять созданные списки.
- **Отмена удаления:** Пользователь может отменить действие удаления в течение короткого времени, благодаря всплывающему уведомлению с кнопкой отмены.

![preview](https://andrpre.ru/projects/to-do-practic/preview.png)

[Демонстрация проекта](https://andrpre.ru/projects/to-do-practic/)

[**Ссылка на макет дизайна в Figma**](https://www.figma.com/design/Plevt7FfqdRjPj2RrNz1ME/Pet-projects?node-id=0-1&t=2RNyiQu2EOpvHaMk-1)

## **Требования**

Для работы проекта необходимо следующее:

- **Node.js** версии 14.0.0 или выше.
- **npm** (Node Package Manager) версии 6.0.0 или выше.
- **Современный браузер** (Google Chrome, Firefox, Safari, Edge) — для работы с приложением в режиме разработчика или просмотра готовой версии.
- **Операционная система:** Windows, macOS или Linux.

Рекомендуется использовать последнюю версию Node.js и npm для стабильной работы приложения.

## **Установка**

1. Клонируйте репозиторий:
    
    ```bash
    git clone <https://github.com/Andrpre/To-Do-practic.git>
    cd To-Do-practic
    ```
    
2. Установите зависимости:
    
    ```jsx
    npm install
    ```
    
3. Запустите приложение:
    
    ```jsx
    npm run start
    ```
    

## Автор

- **Разработка и дизайн** — [Andrpre](https://github.com/Andrpre)
- Связь через Telegram: [@Andrpre](https://t.me/Andrpre)
