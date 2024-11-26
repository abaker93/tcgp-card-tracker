import { IconMinus, IconPlus } from "@/app/ui/icons";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const Card = (props: any) => {
  return (
    <div className="group relative rounded-lg shadow-xl transition hover:z-10 hover:scale-125">
      <div className="relative rounded-lg">
        <Link href={`/${props.card.set}/${props.card.order}`}>
          <Image
            width={367}
            height={512}
            src={props.card.image}
            alt={props.card.name}
            className={clsx({ grayscale: props.count === 0 })}
          />
        </Link>

        <div className="absolute bottom-0 left-0 w-2/5 rounded-bl-lg rounded-tr-2xl bg-slate-600 py-0.5 text-center text-sm font-bold leading-none text-white">
          {props.count}
        </div>
        <div className="absolute bottom-0 right-0 flex p-0.5">
          <button
            className="mr-0.5 rounded-full bg-indigo-50 p-0.5 text-3xl shadow-btn transition hover:bg-green-500 hover:text-white"
            onClick={props.onAdd}
          >
            <IconPlus />
          </button>
          <button
            className="rounded-full bg-indigo-50 p-0.5 text-3xl shadow-btn transition hover:bg-red-500 hover:text-white"
            onClick={props.onSubtract}
          >
            <IconMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
