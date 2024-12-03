const Page = async ({ params }: { params: Promise<{ set: string }> }) => {
  const set = (await params).set;

  const fetchCards = async () => {
    const res = await fetch(`${process.env.URL}/api/${set}/cards`);
    const data = await res.json();
    return data;
  };

  const cards = await fetchCards();

  return <>hi</>;
};

export default Page;
