import React, { useEffect, useState } from 'react';
import PillButton from '../_ui/_buttons/pill';
import clsx from 'clsx';
import { packImg, rarity } from '@/app/lib/imgUtils';

const Stats = ({
  userData,
  cards,
  cardSets,
  cardPacks,
  cardRarity,
}: {
  userData: { [key: string]: { [key: string]: number } };
  cards: {
    order: number;
    set: string;
    rarity: number;
    packs?: { name: string }[];
  }[];
  cardSets: { id: string }[];
  cardPacks: { name: string; set: { id: string } }[];
  cardRarity: { order: number }[];
}) => {
  const [active, setActive] = useState(1);
  const [packGraphData, setPackGraphData] = useState<{
    [key: string]: {
      total: number;
      count: number;
      [packName: string]: { total?: number; count?: number } | number;
    };
  }>({});
  const [rarityGraphData, setRarityGraphData] = useState<{
    [key: string]: { total: number; count: number };
  }>({});

  useEffect(() => {
    if (cards.length == 0) {
      return;
    } else {
      setPackGraphData({});
      setRarityGraphData({});

      let pData: {
        [key: string]: {
          total: number;
          count: number;
          [packName: string]: { total: number; count: number } | number;
        };
      } = {};
      let rData: {
        [key: number]: {
          total: number;
          count: number;
        };
      } = {};

      cardSets.forEach((set: { id: string }) => {
        let setCount = 0;
        let setTotal = 0;

        const packs = cardPacks.filter(
          (pack: { set: { id: string } }) => pack.set.id === set.id,
        );

        if (packs.length === 0) {
          cards
            .filter((card: { set: string }) => card.set === set.id)
            .forEach((card: { order: number }) => {
              setTotal += 1;
              if (
                userData[set.id][card.order] &&
                userData[set.id][card.order] > 0
              ) {
                setCount += 1;
              } else {
                return;
              }
            });

          pData = {
            ...pData,
            [set.id]: {
              ...pData[set.id],
              total: setTotal,
              count: setCount,
            },
          };
        } else {
          packs.forEach((pack: { name: string; set: { id: string } }) => {
            let packCount = 0;
            let packTotal = 0;

            cards
              .filter((card: { set: string }) => card.set === set.id)
              .filter(
                (card: { packs?: { name: string }[] }) =>
                  card.packs &&
                  card.packs.some(
                    (p: { name: string }) => p.name === pack.name,
                  ),
              )
              .forEach((card: { order: number }) => {
                packTotal += 1;
                setTotal += 1;
                if (
                  userData[set.id][card.order] &&
                  userData[set.id][card.order] > 0
                ) {
                  packCount += 1;
                  setCount += 1;
                } else {
                  return;
                }
              });

            pData = {
              ...pData,
              [set.id]: {
                ...pData[set.id],
                total: setTotal,
                count: setCount,
                [pack.name]: {
                  total: packTotal,
                  count: packCount,
                },
              },
            };
          });
        }
      });

      cardRarity.forEach((rarity: { order: number }) => {
        let rarityCount = 0;
        let rarityTotal = 0;

        cards
          .filter((card: { rarity: number }) => card.rarity === rarity.order)
          .forEach((card: { order: number; set: string }) => {
            rarityTotal += 1;
            if (
              userData[card.set][card.order] &&
              userData[card.set][card.order] > 0
            ) {
              rarityCount += 1;
            } else {
              return;
            }
          });

        rData = {
          ...rData,
          [rarity.order]: {
            ...rData[rarity.order],
            total: rarityTotal,
            count: rarityCount,
          },
        };
      });

      setPackGraphData(pData);
      setRarityGraphData(rData);
    }
  }, [userData, cards, cardPacks, cardRarity, cardSets]);

  const handleTabChange = (tab: number) => {
    if (tab === active) return;
    setActive(tab);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-blue-50 shadow-xl">
      <Tabs active={active} handleTabChange={handleTabChange} />
      <div
        className={clsx(
          'grid grid-cols-2 gap-3 p-8 sm:grid-cols-3 lg:grid-cols-5',
          {
            hidden: active !== 1,
          },
        )}
      >
        {Object.keys(packGraphData).map((key: string) => (
          <React.Fragment key={key}>
            <Card
              image={packImg(key)}
              count={packGraphData[key].count}
              total={packGraphData[key].total}
            />
            {Object.keys(packGraphData[key]).length > 0 &&
              Object.keys(packGraphData[key]).map(
                (pack: string) =>
                  typeof packGraphData[key][pack] === 'object' &&
                  packGraphData[key][pack].total && (
                    <Card
                      key={pack}
                      image={packImg(key, [{ id: pack, name: pack }])}
                      count={packGraphData[key][pack].count || 0}
                      total={packGraphData[key][pack].total}
                    />
                  ),
              )}
          </React.Fragment>
        ))}
      </div>

      <div
        className={clsx(
          'grid grid-cols-2 gap-3 p-8 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9',
          {
            hidden: active !== 2,
          },
        )}
      >
        {Object.keys(rarityGraphData).map((key: string) => (
          <React.Fragment key={key}>
            <Card
              image={rarity(parseInt(key))}
              count={rarityGraphData[key].count}
              total={rarityGraphData[key].total}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Tabs = ({
  active,
  handleTabChange,
}: {
  active: number;
  handleTabChange: (tab: number) => void;
}) => {
  return (
    <div className="min-w-100 flex items-center gap-2 bg-blue-50 p-4 shadow-xl">
      <PillButton
        active={active == 1}
        outline={true}
        onClick={() => handleTabChange(1)}
      >
        Packs
      </PillButton>
      <PillButton
        active={active == 2}
        outline={true}
        onClick={() => handleTabChange(2)}
      >
        Rarity
      </PillButton>
    </div>
  );
};

const Card = ({
  count,
  image,
  total,
  children,
}: {
  count: number;
  image: React.ReactNode;
  total: number;
  children?: React.ReactNode;
}) => {
  const percent = ((count / total) * 100).toFixed(2).toString();

  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl p-4 shadow-btn">
      <div className="flex h-12 w-16 items-center justify-center">{image}</div>
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-bold">
          {count} / {total}
        </p>
        <p className="text-xs font-bold">{percent}%</p>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-slate-200">
        <div
          className="absolute h-full rounded-full bg-emerald-500"
          style={{ width: percent + '%' }}
        />
      </div>
      {children}
    </div>
  );
};

export default Stats;
