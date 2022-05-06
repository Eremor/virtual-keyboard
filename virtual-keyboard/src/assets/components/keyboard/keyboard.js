import { BaseComponent } from '../base-component';
import { getKeys } from '../../util/util';
import { KeyboardRow } from './keyboard-row';
import { Key } from './keyboard-key';

export const keys = [];

export class Keyboard extends BaseComponent {
  constructor() {
    super('div', ['keyboard']);
  }

  update = async () => {
    this.node.innerHtml = '';
    const keysList = await getKeys();

    keysList.forEach((item) => {
      const row = new KeyboardRow();

      for (let i = 0; i < item.length; i++) {
        const { classes, content, data } = item[i];
        const key = new Key(classes, content, data);
        keys.push(key.node);
        row.node.append(key.node);
      }

      this.node.append(row.node);
    });
  };
}
