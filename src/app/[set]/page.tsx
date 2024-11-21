import Card from "../ui/elements/card"

const Page = async ({ params }: { params: Promise<{ set: string }> }) => {
  const set = (await params).set

	const fetchCards = async () => {
		const res = await fetch(process.env.URL + '/api/' + set)
		const data = await res.json()
		return data
	}

	const cards = await fetchCards()

  return (
		<main className="min-h-screen bg-fixed bg-gradient-to-b from-sky-50 to-blue-50 dark:from-blue-950 dark:to-slate-900">

			<div className="max-w-7x1 mx-auto p-8">

				<h1>Cards</h1>

				<div className="grid grid-cols-8 gap-10">
					{cards.sort((a:any,b:any) => a.order - b.order).map((card:any) => (
						<Card key={card._id} poke={card} />
					))}
				</div>

			</div>

		</main>
	)
}

export default Page