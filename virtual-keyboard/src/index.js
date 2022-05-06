import { BaseComponent } from './assets/components/base-component';
import { Keyboard, keys } from './assets/components/keyboard/keyboard';
import { TextArea } from './assets/components/keyboard/textarea';
import './assets/css/style.scss';

const wrapper = new BaseComponent('div', ['wrapper']);
const title = new BaseComponent('h1', ['title'], 'RSS Virtual keyboard');
const textArea = new TextArea();
const keyboard = new Keyboard();
const textOS = new BaseComponent('p', ['text'], 'Keyboard created in OS Windows');
const textLang = new BaseComponent('p', ['text'], 'To switch language: left shift + alt');

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
    e.target.classList.add('press-key');
    e.target.classList.remove('key-hover');

    if (e.target.dataset.key === 'Backspace') {
      if (textArea.node.value.length > 0) {
        textArea.node.value = textArea.node.value.slice(0, -1);
      }
    } else {
      textArea.node.value += e.target.textContent;
    }
  }
});

keyboard.node.addEventListener('mouseup', (e) => {
  if (e.target.classList.contains('key')) {
    e.target.classList.remove('press-key');
    e.target.classList.add('key-hover');
  }
});

document.addEventListener('keydown', (e) => {
  const currentKey = keys.filter((key) => key.dataset.key === e.code)[0];
  currentKey.classList.add('press-key');

  if (currentKey.dataset.key === 'Backspace') {
    if (textArea.node.value.length > 0) {
      textArea.node.value = textArea.node.value.slice(0, -1);
    }
  } else {
    textArea.node.value += currentKey.textContent;
  }
});

document.addEventListener('keyup', (e) => {
  const currentKey = keys.filter((key) => key.dataset.key === e.code)[0];
  currentKey.classList.remove('press-key');
});
