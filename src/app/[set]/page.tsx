import Card from "../ui/elements/card";
import Filter from "../ui/elements/filter";

const Page = async ({ params }: { params: Promise<{ set: string }> }) => {
  const set = (await params).set;

  const fetchCards = async () => {
    const res = await fetch(process.env.URL + "/api/" + set);
    const data = await res.json();
    return data;
  };

  const cards = await fetchCards();

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
        <Filter />

        <div className="grid grid-cols-8 gap-2">
          {cards
            .sort((a: any, b: any) => a.order - b.order)
            .map((card: any) => (
              <Card key={card._id} poke={card} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
