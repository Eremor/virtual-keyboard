import { BaseComponent } from '../base-component.js';
import { getKeys } from './../../util/util.js';

export const keys = [];

export class Keyboard extends BaseComponent {
  constructor() {
    super('div', ['keyboard']);
  }

  update = async () => {
    const keysList = await getKeys();

    console.log(keysList);
  }
}