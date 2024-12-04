import { packImg } from '@/app/lib/imgUtils';
import Link from 'next/link';

const SetLink = (props: any) => {
  return (
    <Link
      className="flex h-12 w-full items-center gap-3 rounded-full px-4 transition hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40 hover:shadow-inset-box"
      href={`/${props.href}`}
    >
      <div className="w-16">{packImg(props.href)}</div>
      <div className="flex items-center gap-3">
        <div className="w-16 rounded-md bg-slate-900 px-5 py-0.5 text-center text-xs font-bold leading-none text-white">
          {props.set}
        </div>
        <p>{props.name}</p>
      </div>
    </Link>
  );
};

export default SetLink;
