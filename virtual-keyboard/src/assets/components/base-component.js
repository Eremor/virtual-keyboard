export class BaseComponent {
  constructor(tag, classes, content = '') {
    this.node = document.createElement(tag);
    this.node.classList.add(...classes);
    this.node.textContent = content;
  }
}
