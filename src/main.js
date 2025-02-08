import { nanoid } from 'nanoid';
import { refs } from './js/refs';
import { createMarkup, createCard } from './js/markup-tasks';
import { renderHTML } from './js/render-tasks';
import { getStorageData, writeStorageData } from './js/local-storage-api';

let cards = getStorageData();

renderHTML(createMarkup(cards));

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const name = refs.form.elements.taskName.value.trim();
  const descr = refs.form.elements.taskDescription.value.trim();
  const cardId = nanoid();

  const card = {
    name,
    description: descr,
    id: cardId,
  };

  cards.push(card);

  writeStorageData(cards);

  renderHTML(createCard(card));

  refs.form.reset();
}
