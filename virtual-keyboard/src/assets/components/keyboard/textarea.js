import { BaseComponent } from '../base-component';

export class TextArea extends BaseComponent {
  constructor() {
    super('textarea', ['area']);
    this.node.cols = '50';
    this.node.rows = '5';
  }
}
