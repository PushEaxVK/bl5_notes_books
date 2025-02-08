import { nanoid } from 'nanoid';
import { refs } from './js/refs';
import { createMarkup, createCard } from './js/markup-tasks';
import { renderHTML } from './js/render-tasks';
import { getStorageData, writeStorageData } from './js/local-storage-api';
/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

let cards = getStorageData();

renderHTML(createMarkup(cards));

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const name = refs.form.elements.taskName.value.trim();
  const descr = refs.form.elements.taskDescription.value.trim();

  const card = {
    name,
    description: descr,
    id: nanoid(),
  };

  cards.push(card);

  writeStorageData(cards);

  renderHTML(createCard(card));

  refs.form.reset();
}
