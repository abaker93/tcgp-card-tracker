'use client';

import { useEffect, useState } from 'react';

import Alerts from './_components/alerts';
import Header from '@/app/_components/header';

import { getUserData, saveToLocalStorage } from './lib/functions';
import CardContainer from './_components/_cards/container';
import MainContainer from './_components/_ui/main';
import SettingsBar from './_components/_cards/settingsBar';
import Card from './_components/_cards/card';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [lastSaveDate, setLastSaveDate] = useState('');

  const [cardSets, setCardSets] = useState([]);
  const [cards, setCards] = useState([]);

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCardSets = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sets`);
      const data = await res.json();
      setCardSets(data);
    };

    const fetchCards = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cards`);
      const data = await res.json();
      setCards(data);
    };

    setUserData(getUserData());
    setLastSaveDate(localStorage.getItem('lastSaveDate') || '');
    fetchCardSets();
    fetchCards();
    setLoading(false);
  }, []);

  useEffect(() => {
    setShowSaveAlert(saveAlertTimeout(lastSaveDate));
  }, [lastSaveDate]);

  useEffect(() => {
    const tempCount = () => {
      return Object.keys(userData).reduce((prev, key) => {
        const setSum = Object.keys(userData[key]).reduce((prev2, key2) => {
          return prev2 + userData[key][key2];
        }, 0);
        return prev + setSum;
      }, 0);
    };

    setCount(tempCount());
    saveToLocalStorage('userData', JSON.stringify(userData));
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

    setUserData(data);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Alerts show={showSaveAlert}>
        <p className="font-bold">
          Your data has not been saved in the last 7 days.
        </p>
        <p>Don't forget to backup your data!</p>
      </Alerts>
      <Header
        userData={userData}
        setLastSaveDate={(e: any) => setLastSaveDate(e)}
        setUserData={(e: any) => setUserData(e)}
      />
      <MainContainer>
        <SettingsBar count={count} />
        {cardSets.map((set: any) => (
          <div key={set._id}>
            <p>{set.name}</p>
            <CardContainer>
              {cards
                .filter((card: any) => card.set === set.id)
                .filter((card: any) => card.show)
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
            </CardContainer>
          </div>
        ))}
      </MainContainer>
    </>
  );
};

const saveAlertTimeout = (save: any) => {
  const offset = 7 * (24 * 60 * 60 * 1000);
  const timeout = new Date(save);
  const today = new Date();
  timeout.setTime(timeout.getTime() + offset);

  if (isNaN(timeout.getFullYear()) || today > timeout) {
    return true;
  } else {
    return false;
  }
};

export default Page;
