'use client';

import { use, useEffect, useState } from 'react';

import Alerts from '@/app/_components/alerts';
import Header from '@/app/_components/header';

import { getUserData, saveToLocalStorage } from '@/app/lib/functions';
import CardContainer from '@/app/_components/_cards/container';
import MainContainer from '@/app/_components/_ui/main';
import SettingsBar from '@/app/_components/_cards/settingsBar';
import Card from '@/app/_components/_cards/card';
import Stats from '@/app/_components/_stats/stats';
import clsx from 'clsx';

const Page = ({ params }: { params: Promise<{ set: string }> }) => {
  const set = use(params).set;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [lastSaveDate, setLastSaveDate] = useState('');

  const [cardSets, setCardSets] = useState([]);
  const [cardPacks, setCardPacks] = useState([]);
  const [cardRarity, setCardRarity] = useState([]);
  const [cards, setCards] = useState([]);

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCardSets = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sets`);
      const data = await res.json();
      setCardSets(data);
    };

    const fetchCardPacks = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/packs`);
      const data = await res.json();
      setCardPacks(data);
    };

    const fetchCardRarity = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rarity`);
      const data = await res.json();
      setCardRarity(data);
    };

    const fetchCards = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cards`);
      const data = await res.json();
      setCards(data);
    };

    setLastSaveDate(localStorage.getItem('lastSaveDate') || '');
    fetchCardSets();
    fetchCardPacks();
    fetchCardRarity();
    fetchCards();
  }, []);

  useEffect(() => {
    setUserData(getUserData(cardSets));
    setLoading(false);
  }, [cardSets]);

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
    if (Object.keys(userData).length > 0) {
      saveToLocalStorage('userData', JSON.stringify(userData));
    }
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

  const toggleStats = () => {
    showStats ? setShowStats(false) : setShowStats(true);
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
        <SettingsBar
          count={count}
          showStats={showStats}
          toggleStats={() => toggleStats()}
        />

        <div className={clsx({ hidden: !showStats })}>
          <Stats
            userData={userData}
            cards={cards}
            cardSets={cardSets}
            cardPacks={cardPacks}
            cardRarity={cardRarity}
          />
        </div>

        <CardContainer>
          {cards
            .filter((card: any) => card.set === set.toUpperCase())
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
