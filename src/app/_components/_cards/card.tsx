import { IconMinus, IconPlus } from '@/app/ui/icons';
import Link from 'next/link';
import clsx from 'clsx';
import { ImageWithFallback } from '@/app/lib/imgWithFallback';
import IconButton from '../_ui/_buttons/icon';

const Card = (props: any) => {
  return (
    <div className="group relative rounded-lg shadow-xl transition hover:z-10 hover:scale-110">
      <div className="relative rounded-lg">
        <Link href={`/${props.card.set}/${props.card.order}`}>
          <ImageWithFallback
            width={367}
            height={512}
            src={props.card.image}
            fallbackSrc="/img/card-placeholder.png"
            alt={props.card.name}
            className={clsx({ grayscale: props.count < 1 })}
          />
        </Link>

        <div className="absolute bottom-0 left-0 w-2/5 rounded-bl-lg rounded-tr-2xl bg-slate-600 py-0.5 text-center text-sm font-bold leading-none text-white">
          {props.count}
        </div>
        <div className="absolute bottom-0 right-0 flex p-0.5">
          <IconButton
            onClick={props.onAdd}
            className="hover:!bg-green-500 hover:text-white"
          >
            <IconPlus />
          </IconButton>

          <IconButton
            onClick={props.onSubtract}
            className="hover:!bg-red-500 hover:text-white"
          >
            <IconMinus />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
