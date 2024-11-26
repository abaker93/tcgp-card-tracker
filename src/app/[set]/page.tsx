import { IconMenu } from "../ui/icons";
import Card from "./_components/card";
import CardsContainer from "./_components/cardsContainer";
import SettingsBar from "./_components/settingsBar";

const Page = async ({ params }: { params: Promise<{ set: string }> }) => {
  const set = (await params).set;

  const fetchCards = async () => {
    const res = await fetch(`${process.env.URL}/api/${set}/cards`);
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
            <IconMenu />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-8">
        <SettingsBar />

        <CardsContainer set={set} cards={cards} />
      </div>
    </main>
  );
};

const fetchCards = async (set: any) => {
  const res = await fetch(`${process.env.URL}/api/${set}/cards/`);
  const data = await res.json();
  return data;
};

export default Page;
