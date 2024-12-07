import React, { useEffect, useState } from 'react';
import PillButton from '../_ui/_buttons/pill';
import clsx from 'clsx';
import { packImg } from '@/app/lib/imgUtils';

const Stats = (props: any) => {
  const [active, setActive] = useState(1);
  const [packGraphData, setPackGraphData] = useState<{ [key: string]: any }>(
    {},
  );

  useEffect(() => {
    //   console.log(
    //     'USERDATA:',
    //     props.userData,
    //     '\n CARDS:',
    //     props.cards,
    //     '\n CARDSETS:',
    //     props.cardSets,
    //     '\n CARDPACKS:',
    //     props.cardPacks,
    //   );

    if (props.cards.length == 0) {
      return;
    } else {
      setPackGraphData({});

      let data = {};

      props.cardSets.forEach((set: any) => {
        let setCount = 0;
        let setTotal = 0;

        const packs = props.cardPacks.filter(
          (pack: any) => pack.set.id === set.id,
        );

        if (packs.length === 0) {
          props.cards
            .filter((card: any) => card.set === set.id)
            .forEach((card: any) => {
              setTotal += 1;
              if (
                props.userData[set.id][card.order] &&
                props.userData[set.id][card.order] > 0
              ) {
                setCount += 1;
              } else {
                return;
              }
            });

          data = {
            ...data,
            [set.id]: {
              ...data[set.id],
              total: setTotal,
              count: setCount,
            },
          };
        } else {
          packs.forEach((pack: any) => {
            let packCount = 0;
            let packTotal = 0;

            props.cards
              .filter((card: any) => card.set === set.id)
              .filter((card: any) =>
                card.packs.some((p: any) => p.name == pack.name),
              )
              .forEach((card: any) => {
                packTotal += 1;
                setTotal += 1;
                if (
                  props.userData[set.id][card.order] &&
                  props.userData[set.id][card.order] > 0
                ) {
                  packCount += 1;
                  setCount += 1;
                } else {
                  return;
                }
              });

            data = {
              ...data,
              [set.id]: {
                ...data[set.id],
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

      setPackGraphData(data);
    }
  }, [props.userData, props.cards]);

  // console.log('PACKGRAPHDATA:', packGraphData);

  const handleTabChange = (tab: number) => {
    if (tab === active) return;
    setActive(tab);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-blue-50 shadow-xl">
      <Tabs active={active} handleTabChange={handleTabChange} />
      <div
        className={clsx('flex gap-3 p-8', {
          hidden: active !== 1,
        })}
      >
        {Object.keys(packGraphData).map((key: any) => (
          <React.Fragment key={key}>
            <Cards
              image={packImg(key)}
              count={packGraphData[key].count}
              total={packGraphData[key].total}
            />
            {Object.keys(packGraphData[key]).length > 0 &&
              Object.keys(packGraphData[key]).map(
                (pack: any) =>
                  packGraphData[key][pack].total && (
                    <Cards
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

const Cards = ({
  count,
  image,
  total,
}: {
  count: number;
  image: any;
  total: number;
}) => {
  const percent = ((count / total) * 100).toFixed(2).toString();

  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl p-4 shadow-btn">
      <div className="w-16">{image}</div>
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-bold">
          {count} / {total}
        </p>
        <p className="text-sm font-bold">{percent}%</p>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-slate-200">
        <div
          className="absolute h-full rounded-full bg-emerald-500"
          style={{ width: percent + '%' }}
        />
      </div>
    </div>
  );
};

export default Stats;
