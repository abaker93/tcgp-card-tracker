import { leadingZero } from "@/app/lib/functions";
import { energyImg, packImg, rarity } from "@/app/lib/imgUtils";
import { IconCard } from "@/app/ui/icons";
import Image from "next/image";

const Page = async ({
  params,
}: {
  params: Promise<{ id: number; set: string }>;
}) => {
  const set = (await params).set;
  const id = (await params).id;

  const count = 2;

  const fetchCard = async () => {
    const res = await fetch(`${process.env.URL}/api/${set}/cards/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchPack = async () => {
    const res = await fetch(`${process.env.URL}/api/${set}`);
    const data = await res.json();
    return data;
  };

  const card = await fetchCard();
  const pack = await fetchPack();

  console.log(pack);

  const styles = {
    data: {
      body: "px-5 py-1",
      heading:
        "min-w-60 bg-gradient-to-r from-indigo-100/30 to-blue-100/40 px-5 py-1 text-center",
      row: "flex overflow-hidden rounded-full shadow-inset-box",
    },
    section: {
      heading:
        "mb-2 rounded-full bg-gradient-to-r from-indigo-100/30 to-blue-100/40 px-5 py-1 text-center shadow-inset-box",
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 via-85% to-blue-200 bg-fixed">
      <div className="min-w-100 shadow-xl">
        <div className="relative mx-auto max-w-7xl p-8">
          <h1 className="text-center text-2xl font-bold">My Cards</h1>
          <div className="absolute right-0 top-0 p-8 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-flow-col grid-cols-12">
          <div className="col-span-4">
            <Image
              width={367}
              height={512}
              src={card.image}
              alt={card.name}
              priority={true}
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
                <div className="absolute right-0 top-0 flex w-min items-center gap-5 rounded-full px-5 py-1 text-xl font-bold text-slate-500 shadow-inset-box">
                  <IconCard />
                  <span className="text-slate-800">{count}</span>
                </div>
              </div>

              {/* pack + number */}
              <div className="grid grid-flow-col grid-cols-8 items-center rounded-full px-5 py-2 shadow-btn">
                <div className="col-span-3 w-16 justify-self-center">
                  {packImg(card.set, card.packs)}
                </div>
                <div className="col-span-5 flex items-center rounded-full px-5 py-1 shadow-inset-box">
                  <div className="rounded-md bg-slate-900 px-5 py-0.5 text-sm font-bold leading-none text-white">
                    {card.set}
                  </div>
                  <p className="grow text-center font-semibold leading-none">
                    {leadingZero(card.order, 3)}/{pack.uniqueCards}
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
                  {card.moves.map((move: any, index: any) => (
                    <div key={index} className="mb-5 last:mb-0">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {move.energy.map((energy: string, index: any) => (
                            <div key={index} className="w-5">
                              {energyImg(energy)}
                            </div>
                          ))}
                        </div>
                        <p className="grow text-xl font-bold">{move.name}</p>
                        <p className="text-xl font-bold">{move.damage}</p>
                      </div>
                      <p className="text-slate-500">{move.text}</p>
                    </div>
                  ))}
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
                      {[...Array(card.retreat).keys()].map((key: any) => (
                        <div key={key} className="w-5">
                          {energyImg("Colorless")}
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
      </div>
    </main>
  );
};

export default Page;
