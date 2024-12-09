export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  // console.log('Copied to clipboard:', text);
};

export const getUserData = (setArr: any[]) => {
  const ls: any = localStorage.getItem('userData');
  let data = JSON.parse(ls);

  console.log(data);

  const sets = setArr.map((s) => {
    if (Object.keys(s).length > 0) {
      return s.id;
    } else {
      return s;
    }
  });

  if (sets.length > 0) {
    if (!data) {
      sets.map((s: string) => {
        data = {
          ...data,
          [s]: {
            '1': 0,
          },
        };
      });
    } else {
      sets.map((s: string) => {
        if (!data[s]) {
          data = {
            ...data,
            [s]: {
              '1': 0,
            },
          };
        } else {
          data = data;
        }
      });
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
