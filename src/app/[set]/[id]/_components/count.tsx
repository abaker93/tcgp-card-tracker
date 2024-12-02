"use client";

import { getUserData } from "@/app/lib/functions";
import { IconCard, IconMinus, IconPlus } from "@/app/ui/icons";
import { useEffect, useState } from "react";

const CardCount = ({ card }: { card: any }) => {
  interface UserData {
    [set: string]: {
      [id: string]: number;
    };
  }

  const [userData, setUserData] = useState<UserData>({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    const data = getUserData(card.set.toUpperCase());

    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));

    if (!data[card.set.toUpperCase()][card.order]) {
      return;
    } else {
      setCount(data[card.set.toUpperCase()][card.order]);
    }
  }, [card]);

  const onAdd = (c: any) => {
    let newCount = userData[c.set][c.order];

    newCount = newCount ? newCount + 1 : 1;

    const data = {
      ...userData,
      [c.set]: {
        ...userData[c.set],
        [c.order]: newCount,
      },
    };

    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
    setCount(newCount);
  };

  const onSubtract = (c: any) => {
    let newCount = userData[c.set][c.order];

    newCount = newCount && newCount > 0 ? newCount - 1 : 0;

    const data = {
      ...userData,
      [c.set]: {
        ...userData[c.set],
        [c.order]: newCount,
      },
    };

    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
    setCount(newCount);
  };

  return (
    <>
      <div className="absolute right-0 top-0 flex-col">
        <div className="flex w-min items-center gap-5 rounded-full px-5 py-1 text-xl font-bold text-slate-500 shadow-inset-box">
          <IconCard />
          <span className="text-slate-800">{count}</span>
        </div>
        <div className="flex justify-end p-0.5">
          <button
            className="mr-0.5 rounded-full bg-indigo-50 p-0.5 text-3xl shadow-btn transition hover:bg-green-500 hover:text-white"
            onClick={() => onAdd(card)}
          >
            <IconPlus />
          </button>
          <button
            className="rounded-full bg-indigo-50 p-0.5 text-3xl shadow-btn transition hover:bg-red-500 hover:text-white"
            onClick={() => onSubtract(card)}
          >
            <IconMinus />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCount;
