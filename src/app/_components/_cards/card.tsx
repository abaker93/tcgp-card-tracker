import { IconMinus, IconPlus } from '@/app/ui/icons';
import Link from 'next/link';
import clsx from 'clsx';
import { ImageWithFallback } from '@/app/lib/imgWithFallback';
import IconButton from '../_ui/_buttons/icon';
import { CardType } from '@/app/lib/interfaces';

const Card = ({
  card,
  count,
  onAdd,
  onSubtract,
}: {
  card: CardType;
  count: number;
  onAdd: () => void;
  onSubtract: () => void;
}) => {
  return (
    <div className="group relative rounded-lg shadow-xl transition hover:z-10 hover:scale-110">
      <div className="relative rounded-lg">
        <Link href={`/${card.set}/${card.order}`}>
          <ImageWithFallback
            width={367}
            height={512}
            src={card.image}
            fallbackSrc="/img/card-placeholder.png"
            alt={card.name}
            className={clsx({ grayscale: count < 1 })}
          />
        </Link>

        <div className="absolute bottom-0 left-0 w-2/5 rounded-bl-lg rounded-tr-2xl bg-slate-600 py-0.5 text-center text-sm font-bold leading-none text-white">
          {count}
        </div>
        <div className="absolute bottom-0 right-0 flex p-0.5">
          <IconButton
            onClick={onAdd}
            className="hover:!bg-green-500 hover:text-white"
          >
            <IconPlus />
          </IconButton>

          <IconButton
            onClick={onSubtract}
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
