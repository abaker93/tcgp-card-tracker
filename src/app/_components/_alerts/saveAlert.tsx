import Alert from '@/app/_components/_ui/alert';
import { IconXLarge } from '@/app/ui/icons';

const SaveAlert = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (e: boolean) => void;
}) => {
  return (
    <Alert show={show}>
      <div className="flex items-center justify-between">
        <p className="font-bold">Don&apos;t forget to backup your data!</p>
        <button
          className="flex h-12 w-12 items-center justify-center text-lg text-slate-500 hover:text-slate-700"
          type="button"
          onClick={() => setShow(false)}
        >
          <IconXLarge />
        </button>
      </div>
      <p>Your data has not been saved in the last 7 days.</p>
    </Alert>
  );
};

export default SaveAlert;
