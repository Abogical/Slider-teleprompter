import fromStore from '../store/store.js';
import { setCurrentSlide } from '../store/actions.js';
import { readBespokeCurrentSlideIndex, timeFuncs } from './utils.js';

const { getElapsedTime } = timeFuncs;
// Opt in to slider buttons clicks events
const nextBtn = document.querySelector('button[data-bespoke-marp-osc="next"]');
const prevBtn = document.querySelector('button[data-bespoke-marp-osc="prev"]');

function optToSliderButtons() {
  [nextBtn, prevBtn].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!!e) {
        dispatchCurrentSlideIndex();
      }
    });
  });
}

function dispatchCurrentSlideIndex() {
  readBespokeCurrentSlideIndex().then(({ id }) => {
    return fromStore.dispatch(setCurrentSlide({ id, time: getElapsedTime() }));
  });
}

export { optToSliderButtons, dispatchCurrentSlideIndex };