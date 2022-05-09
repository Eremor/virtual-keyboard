import { BaseComponent } from './assets/components/base-component';
import { Keyboard } from './assets/components/keyboard/keyboard';
import { TextArea } from './assets/components/keyboard/textarea';
import './assets/css/style.scss';
import { addActiveKey,
  handlerKeyboard,
  keys,
  removeActions,
  removeActiveKey,
  setCursorPosition,
  toggleActiveKey } from './assets/util/util';

const wrapper = new BaseComponent('div', ['wrapper']);
const title = new BaseComponent('h1', ['title'], 'RSS Virtual keyboard');
const textArea = new TextArea();
const keyboard = new Keyboard();
const textOS = new BaseComponent('p', ['text'], 'Keyboard created in OS Windows');
const textLang = new BaseComponent('p', ['text'], 'To switch language: ctrl + alt');

keyboard.update();

wrapper.node.append(
  title.node,
  textArea.node,
  keyboard.node,
  textOS.node,
  textLang.node,
);

document.body.append(wrapper.node);

keyboard.node.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('key')) {
    const currentKey = e.target;
    if (currentKey.dataset.key === 'CapsLock') {
      toggleActiveKey(currentKey);
    } else {
      addActiveKey(currentKey);
    }
    handlerKeyboard(currentKey, textArea.node);
  }
});

keyboard.node.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('key')) {
    const currentKey = e.target;
    if (currentKey.dataset.key !== 'CapsLock') {
      removeActiveKey(currentKey);
    }
    removeActions(currentKey);
  }
});

keyboard.node.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('key')) {
    const currentKey = e.target;
    const data = currentKey.dataset.key;
    if (data !== 'CapsLock' && data !== 'ShiftLeft' && data !== 'ShiftRight') {
      removeActiveKey(currentKey);
    }
  }
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const currentKey = keys.filter((key) => key.dataset.key === e.code)[0];
  if (e.code === 'CapsLock') {
    toggleActiveKey(currentKey);
  } else {
    addActiveKey(currentKey);
  }
  handlerKeyboard(currentKey, textArea.node);
});

document.addEventListener('keyup', (e) => {
  const currentKey = keys.filter((key) => key.dataset.key === e.code)[0];
  if (e.code !== 'CapsLock') {
    removeActiveKey(currentKey);
  }
  removeActions(currentKey);
});

textArea.node.addEventListener('click', (e) => {
  e.preventDefault();
  const start = textArea.node.selectionStart;
  const end = textArea.node.selectionEnd;
  setCursorPosition(start, end);
});
