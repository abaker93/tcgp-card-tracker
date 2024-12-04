export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  console.log('Copied to clipboard:', text);
};

export const getUserData = (set: string = 'PA') => {
  let ls: any = localStorage.getItem('userData');
  let data = JSON.parse(ls);

  if (!data) {
    data = {
      [set]: {
        '1': 0,
      },
    };
  } else {
    if (!data[set]) {
      data = {
        ...data,
        [set]: {
          '1': 0,
        },
      };
    } else {
      data = data;
    }
  }

  return data;
};

export const resetSaveReminder = () => {
  saveToLocalStorage('lastSaveDate', new Date().toString());
};

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, data.toString());
};

export const leadingZero = (num: number, len: number) => {
  return num.toString().padStart(len, '0');
};
