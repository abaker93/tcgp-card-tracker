import { IconMenu } from "../ui/icons";
import Container from "./_components/container";
import Header from "./_components/header";

const Page = async ({ params }: { params: Promise<{ set: string }> }) => {
  const set = (await params).set;

  const fetchCards = async () => {
    const res = await fetch(`${process.env.URL}/api/${set}/cards`);
    const data = await res.json();
    return data;
  };

  const cards = await fetchCards();

  return (
    <>
      <Header />
      <Container set={set} cards={cards} />
    </>
  );
};

export default Page;
