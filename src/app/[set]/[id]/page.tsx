'use client';

import { use, useEffect, useState } from 'react';
import Header from '@/app/_components/header';
import MainContainer from '@/app/_components/_ui/main';
import {
  getUserData,
  leadingZero,
  saveToLocalStorage,
} from '@/app/lib/functions';
import { ImageWithFallback } from '@/app/lib/imgWithFallback';
import { energyImg, packImg, rarity } from '@/app/lib/imgUtils';
import { IconCard, IconMinus, IconPlus } from '@/app/ui/icons';
import { CardType } from '@/app/lib/interfaces';
import SaveAlert from '@/app/_components/_alerts/saveAlert';

const Page = ({ params }: { params: Promise<{ id: number; set: string }> }) => {
  const set = use(params).set.toUpperCase();
  const id = use(params).id;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [lastSaveDate, setLastSaveDate] = useState('');

  const [cardSets, setCardSets] = useState([]);

  const [card, setCard] = useState<CardType>({
    _id: '',
    name: '',
    image: '',
    rarity: 0,
    set: '',
    packs: [],
    order: 0,
    category: '',
    show: false,
  });
  const [pack, setPack] = useState<{ uniqueCards: number }>({ uniqueCards: 0 });

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCardSets = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sets`);
      const data = await res.json();
      setCardSets(data);
    };

    const fetchPack = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${set}`);
      const data = await res.json();
      setPack(data);
    };

    const fetchCard = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/${set}/cards/${id}`,
      );
      const data = await res.json();
      setCard(data);
    };

    setLastSaveDate(localStorage.getItem('lastSaveDate') || '');
    fetchCardSets();
    fetchPack();
    fetchCard();
  }, [set, id]);

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      setUserData(getUserData(cardSets));
    }
    if (card.name !== '') {
      setLoading(false);
    }
  }, [cardSets, card, userData]);

  useEffect(() => {
    setShowSaveAlert(saveAlertTimeout(lastSaveDate));
  }, [lastSaveDate]);

  useEffect(() => {
    const tempCount = () => {
      if (!userData || Object.keys(userData).length === 0) {
        return 0;
      } else {
        if (!userData[set][id]) return 0;

        return userData[set][id];
      }
    };

    setCount(tempCount());
    if (userData && Object.keys(userData).length > 0) {
      saveToLocalStorage('userData', JSON.stringify(userData));
    }
  }, [userData, id, set]);

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

  const styles = {
    data: {
      body: 'px-5 py-1',
      heading:
        'min-w-60 bg-gradient-to-r from-indigo-100/30 to-blue-100/40 px-5 py-1 text-center',
      row: 'flex overflow-hidden rounded-full shadow-inset-box',
    },
    section: {
      heading:
        'mb-2 rounded-full bg-gradient-to-r from-indigo-100/30 to-blue-100/40 px-5 py-1 text-center shadow-inset-box',
    },
  };

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
        back={`/${set}`}
      />

      <MainContainer>
        <div className="grid grid-flow-col grid-cols-12">
          <div className="col-span-4">
            <ImageWithFallback
              width={367}
              height={512}
              priority={true}
              src={card.image}
              fallbackSrc="/img/card-placeholder.png"
              alt={card.name}
            />
          </div>

          <div className="col-span-8 rounded-3xl bg-blue-50 shadow-btn">
            <div className="flex flex-col gap-8 p-8">
              {/* name + rarity + count */}
              <div className="relative flex flex-col gap-2">
                <h1 className="text-center text-3xl font-bold">{card.name}</h1>
                <div className="flex h-5 justify-center">
                  {rarity(card.rarity)}
                </div>
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
              </div>

              {/* pack + number */}
              <div className="grid grid-flow-col grid-cols-8 items-center rounded-full px-5 py-2 shadow-btn">
                <div className="col-span-3 w-16 justify-self-center">
                  {packImg(
                    card.set,
                    card.packs
                      ? card.packs.map((p: { id: number }) => p.id)
                      : [],
                  )}
                </div>
                <div className="col-span-5 flex items-center rounded-full px-5 py-1 shadow-inset-box">
                  <div className="rounded-md bg-slate-900 px-5 py-0.5 text-sm font-bold leading-none text-white">
                    {card.set}
                  </div>
                  <p className="grow text-center font-semibold leading-none">
                    {leadingZero(card.order, 3)} / {pack.uniqueCards}
                  </p>
                </div>
              </div>

              {/* illustrator */}
              {card.illustrator! && (
                <div className={styles.data.row}>
                  <p className={styles.data.heading}>Illustrator</p>
                  <p className={styles.data.body}>{card.illustrator}</p>
                </div>
              )}

              {/* moves */}
              {card.moves! && (
                <div>
                  <div className={styles.section.heading}>
                    <p>Attacks</p>
                  </div>
                  {card.moves.map(
                    (
                      move: {
                        damage: number;
                        energy: string[];
                        name: string;
                        text?: string;
                      },
                      index: number,
                    ) => (
                      <div key={index} className="mb-5 last:mb-0">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {move.energy.map(
                              (energy: string, index: number) => (
                                <div key={index} className="w-5">
                                  {energyImg(energy)}
                                </div>
                              ),
                            )}
                          </div>
                          <p className="grow text-xl font-bold">{move.name}</p>
                          <p className="text-xl font-bold">{move.damage}</p>
                        </div>
                        <p className="text-slate-500">{move.text}</p>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* info */}
              <div className="flex flex-col gap-2">
                {/* category + stage */}
                <div className={styles.data.row}>
                  <p className={styles.data.heading}>{card.category}</p>
                  {card.stage! && (
                    <p className={styles.data.body}>{card.stage}</p>
                  )}
                  {card.subcategory! && (
                    <p className={styles.data.body}>{card.subcategory}</p>
                  )}
                </div>

                {/* energy */}
                {card.energy! && (
                  <div className={styles.data.row}>
                    <p className={styles.data.heading}>Type</p>
                    <div
                      className={`flex items-center gap-1 ${styles.data.body}`}
                    >
                      <div className="w-5">{energyImg(card.energy)}</div>
                      <p>{card.energy}</p>
                    </div>
                  </div>
                )}

                {/* hp */}
                {card.hp! && (
                  <div className={styles.data.row}>
                    <p className={styles.data.heading}>HP</p>
                    <p className={styles.data.body}>{card.hp}</p>
                  </div>
                )}

                {/* weakness */}
                {card.weakness! && (
                  <div className={styles.data.row}>
                    <p className={styles.data.heading}>Weakness</p>
                    <div
                      className={`flex items-center gap-1 ${styles.data.body}`}
                    >
                      <div className="w-5">{energyImg(card.weakness.type)}</div>
                      <p>+{card.weakness.damage}</p>
                    </div>
                  </div>
                )}

                {/* retreat */}
                {card.retreat! && (
                  <div className={styles.data.row}>
                    <p className={styles.data.heading}>Retreat</p>
                    <div className={`flex gap-1 ${styles.data.body}`}>
                      {[...Array(card.retreat).keys()].map((key: number) => (
                        <div key={key} className="w-5">
                          {energyImg('Colorless')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ex rule */}
                {card.exRule! && (
                  <div className={styles.data.row}>
                    <p className={styles.data.heading}>ex Rule</p>
                    <p className={styles.data.body}>{card.exRule}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
