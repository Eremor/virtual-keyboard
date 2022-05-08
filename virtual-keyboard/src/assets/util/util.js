export let isEn = true;
export let isShift = false;
export let isLocked = false;
export const keys = [];
export const contentArray = [];

export const getKeys = async () => {
  try {
    const res = await fetch('./keys.json');
    const keys = await res.json();

    return keys;
  } catch (error) {
    throw new Error(error);
  }
};

export const addActiveKey = (currentKey) => {
  currentKey.classList.add('press-key');
  currentKey.classList.remove('key-hover');
}

export const removeActiveKey = (currentKey) => {
  currentKey.classList.remove('press-key');
  currentKey.classList.add('key-hover');
}

const getContentSymbols = () => {
  let content = '';

  if(isEn) {
    content = isShift ? 'enShift' : 'en';
  } else {
    content = isShift ? 'ruShift' : 'ru';
  }
  
  return content;
}

const changeContentSymbols = (keysArray) => {
  const content = getContentSymbols();
  keysArray.forEach((key, i) => {
    if(key !== 'undefined') {
      key.textContent = contentArray[i][content];
    }
  });
}

const deleteLastSymbol = (textArea) => {
  if(textArea.value.length > 0) {
    textArea.value = textArea.value.slice(0, -1);
  }
}

const handlerShift = () => {
  if(!isLocked) {
    isLocked = true;
    changeContentSymbols(keys);
  }
}

const handlerCaps = () => {
  isShift = !isShift;
  const textArray = [];
  
  keys.forEach((key) => {
    if(key.dataset.key.slice(0,3) === 'Key') {
      textArray.push(key);
    } else {
      textArray.push('undefined');
    }
  });
  
  changeContentSymbols(textArray);
}

export const handlerKeyboard = (currentKey, textArea) => {
  if(currentKey.classList.contains('key--dark')) {
    switch(currentKey.dataset.key) {
      case 'Backspace':
        deleteLastSymbol(textArea);
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        isShift = true;
        handlerShift();
        break;
      case 'CapsLock':
        handlerCaps();
        break;
      case 'Enter':
        console.log('Enter')
        break;
      case 'Tab':
        console.log('Tab')
        break;
    }
  } else {
    textArea.value += currentKey.textContent;
  }
}

export const removeActions = (currentKey) => {
  if(currentKey.classList.contains('key--dark')) {
    switch(currentKey.dataset.key) {
      case 'ShiftLeft':
      case 'ShiftRight':
        isLocked = false;
        isShift = false;
        changeContentSymbols(keys);
        break;
    }
  }
}