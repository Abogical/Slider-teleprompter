import createNoteCloserBtn from './closer-btn.js';

const getNoteByIndex = (index) => document.querySelector(`.note[idx="${index}"]`);

const renderNote = (clip, notesEl, rootEl) => {
  let noteEl = document.createElement('section');
  let noteElHeader = document.createElement('header');
  let noteElFooter = document.createElement('footer');
  let noteElContent = document.createElement('ul');
  if (!!clip.slides?.length) addNoteSlidesList(noteElContent, clip);
  // noteElContent.innerHTML = content;
  clip.data && addAudioElementToNote(noteElFooter, clip.data);

  noteElHeader.classList.add('note-header');
  noteElFooter.classList.add('note-footer');
  noteElContent.classList.add('note-content');
  noteElHeader.innerHTML = `<h1>Clip ${clip.id}</h1>`;
  noteEl.appendChild(noteElHeader);
  noteEl.appendChild(noteElContent);
  noteEl.appendChild(noteElFooter);
  noteEl.classList.add('note');
  noteEl.setAttribute('idx', clip.id);
  createNoteCloserBtn(noteEl, rootEl);
  notesEl.appendChild(noteEl);
};

const renderClips = ({ clips }, rootEl) => {
  const notesEl = document.querySelector('.notes');
  clearNoteEls(notesEl);
  clips.forEach((clip, i) => renderNote(clip, notesEl, rootEl));
};

const addNoteSlidesList = (noteContentUl, clip) => {
  const { slides } = clip || {};

  try {
    slides.forEach((slide) => {
      const liEl = document.createElement('li');
      const liSpan = document.createElement('span');
      liSpan.innerText = `Slide ${slide.id}`;
      liEl.appendChild(liSpan);
      noteContentUl.appendChild(liEl);
    });
  } catch (e) {
    console.error('Error appending Slides names / Audio Element to parent');
    console.error(e);
  }
};

const addAudioElementToNote = (noteFooterEl, blob) => {
  if (!!blob) {
    const audio = window.URL.createObjectURL(blob);
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    try {
      audioEl.src = audio;
    } catch {
      audioEl.srcObject = audio;
    }
    noteFooterEl.appendChild(audioEl);
  }
};

const clearNoteEls = (notesEl) => {
  !!notesEl.children.length && Array.from(notesEl.children).forEach((child) => notesEl.removeChild(child));
};

export { getNoteByIndex, renderNote, renderClips };
