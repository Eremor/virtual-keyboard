export const keys = [];
export const contentArray = [];

let isEn = (localStorage.getItem('isEn') === 'true');
let isShift = false;
let isLocked = false;
let isCaps = false;

const pressed = new Set();
let cursorPositionStart = 0;
let cursorPositionEnd = 0;

export const getKeys = async () => {
  try {
    const res = await fetch('./keys.json');
    const keysData = await res.json();

    return keysData;
  } catch (error) {
    throw new Error(error);
  }
};

const setIsEn = (value) => {
  isEn = value;
};

export const getIsEn = () => isEn;

const setIsShift = (value) => {
  isShift = value;
};

const getIsShift = () => isShift;

export const addActiveKey = (currentKey) => {
  currentKey.classList.add('press-key');
  currentKey.classList.remove('key-hover');
};

export const removeActiveKey = (currentKey) => {
  currentKey.classList.remove('press-key');
  currentKey.classList.add('key-hover');
};

export const toggleActiveKey = (currentKey) => {
  currentKey.classList.toggle('press-key');
  currentKey.classList.toggle('key-hover');
};

export const setCursorPosition = (start, end) => {
  cursorPositionStart = start;
  cursorPositionEnd = end;
};

const getCursorPosition = () => {
  const start = cursorPositionStart;
  const end = cursorPositionEnd;
  return { start, end };
};

const getContentSymbols = () => {
  let content = '';

  if (getIsEn()) {
    content = getIsShift() ? 'enShift' : 'en';
    localStorage.setItem('isEn', true);
  } else {
    content = getIsShift() ? 'ruShift' : 'ru';
    localStorage.setItem('isEn', false);
  }

  return content;
};

const changeContentSymbols = (keysArray) => {
  const content = getContentSymbols();
  keysArray.forEach((key, i) => {
    if (key !== 'undefined') {
      key.textContent = contentArray[i][content];
    }
  });
};

const deleteLastSymbol = (textArea) => {
  const { start, end } = getCursorPosition();
  const { length } = textArea.value;

  if (start === length || end === length) {
    textArea.value = textArea.value.slice(0, -1);
  } else if (start > 0 && end > 0) {
    const remainingText = textArea.value.slice(0, start - 1) + textArea.value.slice(end, length);
    textArea.value = remainingText;
  }

  if (start > 0 && end > 0) {
    textArea.setSelectionRange(start - 1, end - 1);
    setCursorPosition(start - 1, end - 1);
  }
};

const deleteNextSymbol = (textArea) => {
  const { start, end } = getCursorPosition();
  const { length } = textArea.value;

  if (start === 0 || end === 0) {
    textArea.value = textArea.value.slice(1, length);
  } else if (start < length && end < length) {
    const remainingText = textArea.value.slice(0, start) + textArea.value.slice(end + 1, length);
    textArea.value = remainingText;
  }

  if (start < length && end < length) {
    textArea.setSelectionRange(start, end);
    setCursorPosition(start, end);
  }
};

const handlerShift = () => {
  if (!isLocked) {
    isLocked = true;
    changeContentSymbols(keys);
  }
};

const handlerCaps = () => {
  setIsShift(!isShift);
  isCaps = !isCaps;
  const textArray = [];

  keys.forEach((key) => {
    if (key.dataset.key.slice(0, 3) === 'Key') {
      textArray.push(key);
    } else {
      textArray.push('undefined');
    }
  });

  changeContentSymbols(textArray);
};

const changeLanguage = () => {
  setIsEn(!isEn);
  changeContentSymbols(keys);
};

const handlerLanguage = (callback, currentDataKey, ...codes) => {
  let current;

  switch (currentDataKey) {
    case 'ControlLeft':
    case 'ControlRight':
      current = currentDataKey.slice(0, 7);
      break;
    case 'AltLeft':
    case 'AltRight':
      current = currentDataKey.slice(0, 3);
      break;
    default:
      break;
  }

  pressed.add(current);

  for (const code of codes) {
    if (!pressed.has(code)) {
      return;
    }
  }

  pressed.clear();

  callback();
};

const deletePressedSet = (currentDataKey) => {
  let current;

  switch (currentDataKey) {
    case 'ControlLeft':
    case 'ControlRight':
      current = currentDataKey.slice(0, 7);
      break;
    case 'AltLeft':
    case 'AltRight':
      current = currentDataKey.slice(0, 3);
      break;
    default:
      break;
  }

  pressed.delete(current);
};

const addTextContent = (text, textArea) => {
  const { length } = textArea.value;
  const start = textArea.selectionStart;
  const indent = text.length;

  if (start === length) {
    textArea.value += text;
    setCursorPosition(length + indent, length + indent);
    textArea.setSelectionRange(length + indent, length + indent);
  } else if (start === 0) {
    textArea.value = text + textArea.value;
    setCursorPosition(start + indent, start + indent);
    textArea.setSelectionRange(start + indent + 1, start + indent + 1);
  } else {
    const remainingText = textArea.value.slice(0, start) + text + textArea.value.slice(start, length);
    textArea.value = remainingText;
    setCursorPosition(start + indent, start + indent);
    textArea.setSelectionRange(start + indent, start + indent);
  }
};

export const handlerKeyboard = (currentKey, textArea) => {
  textArea.focus();
  if (currentKey.classList.contains('key--dark')) {
    switch (currentKey.dataset.key) {
      case 'Backspace':
        deleteLastSymbol(textArea);
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        setIsShift(true);
        if (isCaps) {
          setIsShift(!isShift);
        }
        handlerShift();
        break;
      case 'CapsLock':
        handlerCaps();
        break;
      case 'Enter':
        addTextContent('\n', textArea);
        break;
      case 'Tab':
        addTextContent('    ', textArea);
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
        handlerLanguage(changeLanguage, currentKey.dataset.key, 'Control', 'Alt');
        break;
      case 'Delete':
        deleteNextSymbol(textArea);
        break;
      case 'ArrowUp':
        addTextContent('▲', textArea);
        break;
      case 'ArrowLeft':
        addTextContent('◄', textArea);
        break;
      case 'ArrowDown':
        addTextContent('▼', textArea);
        break;
      case 'ArrowRight':
        addTextContent('►', textArea);
        break;
      default:
        break;
    }
  } else {
    addTextContent(currentKey.textContent, textArea);
  }
};

export const removeActions = (currentKey) => {
  if (currentKey.classList.contains('key--dark')) {
    switch (currentKey.dataset.key) {
      case 'ShiftLeft':
      case 'ShiftRight':
        isLocked = false;
        setIsShift(false);
        if (isCaps) setIsShift(true);
        changeContentSymbols(keys);
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
        deletePressedSet(currentKey.dataset.key);
        break;
      default:
        break;
    }
  }
};
