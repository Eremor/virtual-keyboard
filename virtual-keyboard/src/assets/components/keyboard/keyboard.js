import { BaseComponent } from '../base-component';
import { contentArray, getKeys, isEn, keys } from '../../util/util';
import { KeyboardRow } from './keyboard-row';
import { Key } from './keyboard-key';

export class Keyboard extends BaseComponent {
  constructor() {
    super('div', ['keyboard']);
  }

  update = async () => {
    this.node.innerHTML = '';
    const keysList = await getKeys();

    keysList.forEach((item) => {
      const row = new KeyboardRow();

      for (let i = 0; i < item.length; i++) {
        const { classes, content, data } = item[i];
        contentArray.push(content);
        const symbolKey = isEn ? content.en : content.ru;

        const key = new Key(classes, symbolKey, data);
        keys.push(key.node);
        row.node.append(key.node);
      }

      this.node.append(row.node);
    });
  };
}
