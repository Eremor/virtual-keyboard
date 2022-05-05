import { BaseComponent } from './assets/components/base-component.js';
import { Keyboard } from './assets/components/keyboard/keyboard.js';
import { TextArea } from './assets/components/keyboard/textarea.js';
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
  textLang.node
);
document.body.append(wrapper.node);

console.log(textArea.node.value);