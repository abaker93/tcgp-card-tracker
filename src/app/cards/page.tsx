export default async function Page() {
	const fetchCards = async () => {
		const res = await fetch(process.env.URL + '/api/cards')
		const cards = await res.json()
		return cards
	}

	const cards = await fetchCards()

	return (
		<div>
			<h1>Cards</h1>
			{cards.map((card:any) => (
				<div key={card._id}>
					<h2>{card.name}</h2>
					<p>{card.energy}</p>
					<p>{card.description}</p>
				</div>
			))}
		</div>
	)
}