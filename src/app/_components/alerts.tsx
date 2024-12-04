import clsx from 'clsx';
import { useEffect, useState } from 'react';

const Alerts = (props: any) => {
  const [showAlert, setShowAlert] = useState(false);

  const offset = 7 * (24 * 60 * 60 * 1000);
  const week = new Date();
  const save = new Date(props.date);

  useEffect(() => {
    week.setTime(week.getTime() - offset);

    if (isNaN(save.getDate()) || save < week) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [props.date]);

  return (
    <div
      className={clsx(
        'fixed left-5 top-5 z-10 rounded-3xl bg-blue-50 p-8 shadow-btn transition',
        { '-left-96': !showAlert, 'left-5': showAlert },
      )}
    >
      <p className="font-bold">Don't forget to backup your save!</p>
    </div>
  );
};

export default Alerts;
