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
  userData: any;
  cards: any;
  cardSets: any;
  cardPacks: any;
  cardRarity: any;
}) => {
  const [active, setActive] = useState(1);
  const [packGraphData, setPackGraphData] = useState<{ [key: string]: any }>(
    {},
  );
  const [rarityGraphData, setRarityGraphData] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    if (cards.length == 0) {
      return;
    } else {
      setPackGraphData({});
      setRarityGraphData({});

      let pData = {};
      let rData = {};

      cardSets.forEach((set: any) => {
        let setCount = 0;
        let setTotal = 0;

        const packs = cardPacks.filter((pack: any) => pack.set.id === set.id);

        if (packs.length === 0) {
          cards
            .filter((card: any) => card.set === set.id)
            .forEach((card: any) => {
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
          packs.forEach((pack: any) => {
            let packCount = 0;
            let packTotal = 0;

            cards
              .filter((card: any) => card.set === set.id)
              .filter((card: any) =>
                card.packs.some((p: any) => p.name == pack.name),
              )
              .forEach((card: any) => {
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

      cardRarity.forEach((rarity: any) => {
        let rarityCount = 0;
        let rarityTotal = 0;

        cards
          .filter((card: any) => card.rarity === rarity.order)
          .forEach((card: any) => {
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
  }, [userData, cards]);

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
        {Object.keys(packGraphData).map((key: any) => (
          <React.Fragment key={key}>
            <Card
              image={packImg(key)}
              count={packGraphData[key].count}
              total={packGraphData[key].total}
            />
            {Object.keys(packGraphData[key]).length > 0 &&
              Object.keys(packGraphData[key]).map(
                (pack: any) =>
                  packGraphData[key][pack].total && (
                    <Card
                      key={pack}
                      image={packImg(key, [{ id: pack, name: pack }])}
                      count={packGraphData[key][pack].count}
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
        {Object.keys(rarityGraphData).map((key: any) => (
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

const Tabs = (props: any) => {
  return (
    <div className="min-w-100 flex items-center gap-2 bg-blue-50 p-4 shadow-xl">
      <PillButton
        active={props.active == 1}
        outline={true}
        onClick={() => props.handleTabChange(1)}
      >
        Packs
      </PillButton>
      <PillButton
        active={props.active == 2}
        outline={true}
        onClick={() => props.handleTabChange(2)}
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
  image: any;
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
