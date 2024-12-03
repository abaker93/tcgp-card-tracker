export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)

  console.log('Copied to clipboard:', text);
}

export const getUserData = (set: string = "PA") => {
  let ls: any = localStorage.getItem("userData");
  let data = JSON.parse(ls);

  if (!data) {
    data = {
      [set]: {
        "1": 0,
      },
    };
  } else {
    if (!data[set]) {
      data = {
        ...data,
        [set]: {
          "1": 0,
        },
      };
    } else {
      data = data;
    }
  }

  return data;
}

export const resetSaveReminder = () => {
  const date = new Date();
  // console.log(date)
  localStorage.setItem("lastSaveDate", new Date().toString())
}

export const saveToLocalStorage = (data: any) => {
  localStorage.setItem("userData", data.toString());
}

export const leadingZero = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};