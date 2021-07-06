import fetchCountries from './js/fetchCountries.js';
import renderCountries from './templation/renderCountries.hbs';
import renderList from './templation/renderList.hbs';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import { Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const myStack = new Stack({
  dir1: 'down',
      dir2: 'left',
      firstpos1: 25,
      firstpos2: 25,
      spacing1: 36,
      spacing2: 36,
      push: 'bottom',
      context: document.body,
});

var debounce = require('lodash.debounce');

const input = document.querySelector('.wrapper__searcher');
const list = document.querySelector('.wrapper__list');
const countryBox = document.querySelector('.wrapper__countries');

input.addEventListener('input', debounce(handleInput, 500));

function handleInput() {
  countryBox.innerHTML = '';
  list.innerHTML = '';
  fetchCountries(input.value).then(markupRendering).catch(error);
}

function typeCountry(letter) {
  countryBox.insertAdjacentHTML('beforeend', renderCountries(letter));
}

function updateList(letter) {
  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', renderList(letter));
}

function markupRendering(array) {
  if (array.length === 1) {
    typeCountry(array);
  } else if (array.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
      animateSpeed: 'fast',
        delay: 2000,
      stack: myStack,
    });
    return;
  } else {
    updateList(array);
  }
}
function error() {
  alert('enter country name');
}
