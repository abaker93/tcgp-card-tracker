import Image from "next/image";

const Page = async ({
  params,
}: {
  params: Promise<{ set: string; id: number }>;
}) => {
  const set = (await params).set;
  const id = (await params).id;

  const fetchCard = async () => {
    const res = await fetch(process.env.URL + "/api/" + set + "/" + id);
    const data = await res.json();
    return data;
  };

  const card = await fetchCard();

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
            <Image width={367} height={512} src={card.image} alt={card.name} />
          </div>
          <div className="shadow-btn col-span-8 rounded-3xl bg-blue-50 p-8">
            <h1>{card.name}</h1>
            <p>{card.rarity}</p>
            <div className="shadow-btn rounded-full px-5 py-2">
              <p>
                {card.set} {card.pack}
              </p>
              <div className="shadow-inset-box rounded-full px-5 py-1">
                <div>{card.set}</div>
                <p>{card.order}</p>
              </div>
            </div>
            <div className="shadow-inset-box rounded-full px-5 py-1">
              <p>Illustrator</p>
              <p>{card.illustrator}</p>
            </div>
            <div>
              <div className="shadow-inset-box rounded-full px-5 py-1">
                <p>Attacks</p>
              </div>
              {card.moves.map((move: any) => (
                <div key={move.name}>
                  {move.energy.map((energy: any) => (
                    <p>{energy}</p>
                  ))}
                  <p>{move.name}</p>
                  <p>{move.damage}</p>
                  <p>{move.text}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="shadow-inset-box rounded-full px-5 py-1">
                <p>{card.category}</p>
                <p>{card.subcategory}</p>
                <p>{card.stage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
