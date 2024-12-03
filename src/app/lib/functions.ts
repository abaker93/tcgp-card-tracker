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

export const leadingZero = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};