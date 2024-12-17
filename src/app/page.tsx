'use client';

import { useEffect, useState } from 'react';

// import Alerts from './_components/alerts';
import Header from '@/app/_components/header';

import { getUserData, saveToLocalStorage } from './lib/functions';
import CardContainer from './_components/_cards/container';
import MainContainer from './_components/_ui/main';
import SettingsBar from './_components/_cards/settingsBar';
import Card from './_components/_cards/card';
import SetHeader from './_components/_cards/setHeader';
import Stats from './_components/_stats/stats';
import clsx from 'clsx';
import { CardType } from '@/app/lib/interfaces';
import SaveAlert from './_components/_alerts/saveAlert';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
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
    if (!userData || Object.keys(userData).length === 0) {
      setUserData(getUserData(cardSets));
    }
    if (cards.length > 0) {
      setLoading(false);
    }
  }, [cardSets, cards, userData]);

  useEffect(() => {
    setShowSaveAlert(saveAlertTimeout(lastSaveDate));
  }, [lastSaveDate]);

  useEffect(() => {
    const tempCount = () => {
      if (!userData || Object.keys(userData).length === 0) {
        return 0;
      } else {
        return Object.keys(userData).reduce((prev, key) => {
          const setSum = Object.keys(userData[key]).reduce((prev2, key2) => {
            return prev2 + userData[key][key2];
          }, 0);
          return prev + setSum;
        }, 0);
      }
    };

    setCount(tempCount());
    if (userData && Object.keys(userData).length > 0) {
      saveToLocalStorage('userData', JSON.stringify(userData));
    }
  }, [userData]);

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

  // console.log(cardSets);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <SaveAlert
        show={showSaveAlert}
        setShow={(e: boolean) => setShowSaveAlert(e)}
      />

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

        <div className={clsx({ hidden: !showStats })}>
          <Stats
            userData={userData}
            cards={cards}
            cardSets={cardSets}
            cardPacks={cardPacks}
            cardRarity={cardRarity}
          />
        </div>

        {cardSets
          .sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order,
          )
          .map(
            (set: { _id: string; id: string; name: string; order: number }) => (
              <div key={set._id}>
                <SetHeader set={set} />
                <CardContainer>
                  {cards
                    .filter((card: { set: string }) => card.set === set.id)
                    .filter((card: { show: boolean }) => card.show)
                    .sort(
                      (a: { order: number }, b: { order: number }) =>
                        a.order - b.order,
                    )
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
              </div>
            ),
          )}
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
