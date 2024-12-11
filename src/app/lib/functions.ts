export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  // console.log('Copied to clipboard:', text);
};

export const getUserData = (setArr: { id: string }[]) => {
  const ls: string | null = localStorage.getItem('userData');
  let data = ls ? JSON.parse(ls) : null;

  // console.log(setArr);

  const sets = setArr.map((s: { id: string }) => {
    if (s && Object.keys(s).length > 0) {
      return s.id;
    } else {
      return s;
    }
  });

  if (sets.length > 0) {
    if (!data) {
      console.log(sets);
      sets.map((s: string | { id: string }) => {
        const key = typeof s === 'string' ? s : s.id;
        data = {
          ...data,
          [key]: {
            '1': 0,
          },
        };
      });
    } else {
      sets.map((s: string | { id: string }) => {
        const key = typeof s === 'string' ? s : s.id;
        if (!data[key]) {
          data = {
            ...data,
            [key]: {
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

export const saveToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data.toString());
};

export const leadingZero = (num: number, len: number) => {
  return num.toString().padStart(len, '0');
};
