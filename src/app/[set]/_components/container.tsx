"use client";

import { getUserData } from "@/app/lib/functions";
import { useEffect, useState } from "react";
import SettingsBar from "./settingsBar";
import Card from "./card";

const Container = ({ set, cards }: { set: any; cards: any }) => {
  interface UserData {
    [set: string]: {
      [id: string]: number;
    };
  }

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    const data = getUserData(set.toUpperCase());

    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setLoading(false);
  }, [set, cards]);

  useEffect(() => {
    if (!userData[set.toUpperCase()]) return;

    const tempCount = (o: any) =>
      Object.values(o).reduce((a: number, b: number) => a + b, 0);

    setCount(tempCount(userData[set.toUpperCase()]));
  }, [userData]);

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
  };

  return loading || !userData[set.toUpperCase()] ? (
    <div className="mx-auto max-w-7xl p-8">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="mx-auto max-w-7xl p-8">
      <SettingsBar count={count} />
      <div className="grid grid-cols-8 gap-2">
        {cards
          .sort((a: any, b: any) => a.order - b.order)
          .map((card: any) => (
            <Card
              key={card._id}
              card={card}
              count={userData[card.set][card.order] || 0}
              onAdd={() => onAdd(card)}
              onSubtract={() => onSubtract(card)}
            />
          ))}
      </div>
    </div>
  );
};

export default Container;
