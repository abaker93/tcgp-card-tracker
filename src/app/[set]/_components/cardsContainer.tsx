"use client";

import { useEffect, useState } from "react";
import Card from "./card";

const CardsContainer = ({ set, cards }: { set: any; cards: any }) => {
  interface UserData {
    [set: string]: {
      [id: string]: number;
    };
  }

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    let ls: any = localStorage.getItem("userData");
    let data = JSON.parse(ls);

    if (!data) {
      data = {
        [set.toUpperCase()]: {
          "1": 0,
        },
      };
    } else {
      if (!data[set.toUpperCase()]) {
        data = {
          ...data,
          [set.toUpperCase()]: {
            "1": 0,
          },
        };
      } else {
        data = data;
      }
    }

    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setLoading(false);
  }, [set, cards]);

  const onAdd = (e: any, c: any) => {
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

  const onSubtract = (e: any, c: any) => {
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
    <p>Loading...</p>
  ) : (
    <div className="grid grid-cols-8 gap-2">
      {cards
        .sort((a: any, b: any) => a.order - b.order)
        .map((card: any) => (
          <Card
            key={card._id}
            card={card}
            count={userData[card.set][card.order] || 0}
            onAdd={(e: any) => onAdd(e, card)}
            onSubtract={(e: any) => onSubtract(e, card)}
          />
        ))}
    </div>
  );
};

export default CardsContainer;
