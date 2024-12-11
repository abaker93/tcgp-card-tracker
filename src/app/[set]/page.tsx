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
import { CardType } from '@/app/lib/interfaces';

const Page = ({ params }: { params: Promise<{ set: string }> }) => {
  const set = use(params).set.toUpperCase();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [lastSaveDate, setLastSaveDate] = useState('');

  const [cardSets, setCardSets] = useState([]);
  const [cardPacks, setCardPacks] = useState([]);
  const [cardRarity, setCardRarity] = useState([]);
  const [cards, setCards] = useState<CardType[]>([]);

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
    if (cards.length > 0) {
      setLoading(false);
    }
  }, [cards]);

  useEffect(() => {
    setShowSaveAlert(saveAlertTimeout(lastSaveDate));
  }, [lastSaveDate]);

  useEffect(() => {
    if (!userData[set]) return;

    const tempCount = (o: { [key: string]: number }) => {
      return Object.values(o).reduce((a: number, b: number) => a + b, 0);
    };

    setCount(tempCount(userData[set]));

    if (Object.keys(userData).length > 0) {
      saveToLocalStorage('userData', JSON.stringify(userData));
    }
  }, [userData, set]);

  const onAdd = (c: { set: string; order: number }) => {
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

  const onSubtract = (c: { set: string; order: number }) => {
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
    setShowStats(!showStats);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Alerts show={showSaveAlert}>
        <p className="font-bold">
          Your data has not been saved in the last 7 days.
        </p>
        <p>Don&apos;t forget to backup your data!</p>
      </Alerts>

      <Header
        userData={userData}
        setLastSaveDate={(e: string) => setLastSaveDate(e)}
        setUserData={(e: { [key: string]: { [key: string]: number } }) =>
          setUserData(e)
        }
      />

      <MainContainer>
        <SettingsBar
          count={count}
          showStats={showStats}
          toggleStats={() => toggleStats()}
        />

        <div className={clsx('mb-10', { hidden: !showStats })}>
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
            .filter((card: CardType) => card.set === set)
            .filter((card: CardType) => card.show)
            .sort((a: CardType, b: CardType) => a.order - b.order)
            .map((card: CardType) => (
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

const saveAlertTimeout = (save: string) => {
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
