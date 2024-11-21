import Image from "next/image";

const Card = async (props:any) => {

  return (
		<div>
			<Image
				width={367}
				height={512}
				src={props.poke.image}
				alt={props.poke.name}
			/>
			<button className="text-5xl rounded-l-lg border-2 border-green-500 bg-green-500/30 hover:bg-green-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
				</svg>
			</button>
			<button className="text-5xl rounded-r-lg border-2 border-red-500 bg-red-500/30 hover:bg-red-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
					<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
				</svg>
			</button>
			<p>2</p>
		</div>
	)
}

export default Card