import Image from "next/image";

const Card = async (props: any) => {
  const count = 2;

  return (
    <div className="group relative rounded-lg shadow-xl transition hover:z-10 hover:scale-125">
      <div className="relative rounded-lg">
        <Image
          width={367}
          height={512}
          src={props.poke.image}
          alt={props.poke.name}
        />

        <div className="absolute bottom-0 left-0 w-2/5 rounded-bl-lg rounded-tr-2xl bg-slate-600 py-0.5 text-center text-sm font-bold leading-none text-white">
          {count}
        </div>
        <div className="absolute bottom-0 right-0 flex p-0.5">
          <button className="shadow-btn mr-0.5 rounded-full bg-indigo-50 p-0.5 text-3xl transition hover:bg-green-500 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
          <button className="shadow-btn rounded-full bg-indigo-50 p-0.5 text-3xl transition hover:bg-red-500 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
