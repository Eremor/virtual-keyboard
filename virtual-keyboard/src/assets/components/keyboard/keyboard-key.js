import { BaseComponent } from '../base-component';

export class Key extends BaseComponent {
  constructor(classes, content, dataType) {
    super('button', classes, content);
    this.node.dataset.key = dataType;
  }
}
