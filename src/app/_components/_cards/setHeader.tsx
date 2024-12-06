import { packImg } from '@/app/lib/imgUtils';
import Divider from '../_ui/divider';

const SetHeader = (props: any) => {
  return (
    <div className="mb-14 mt-16">
      {props.set.order !== 1 ? <Divider /> : null}
      <div className="flex items-center justify-center gap-4 pt-4">
        <div className="w-16">{packImg(props.set.id)}</div>
        <h2 className="text-xl font-bold">{props.set.name}</h2>
      </div>
    </div>
  );
};

export default SetHeader;
