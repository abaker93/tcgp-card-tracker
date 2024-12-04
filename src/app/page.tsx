'use client';

import Header from '@/app/_components/header';
import { useEffect, useState } from 'react';
import { getUserData } from './lib/functions';
import Alerts from './_components/alerts';

const Page = () => {
  const [userData, setUserData] = useState({});
  const [lastSaveDate, setLastSaveDate] = useState('');

  useEffect(() => {
    const data = JSON.stringify(getUserData());
    setUserData(data);

    const date = localStorage.getItem('lastSaveDate');
    setLastSaveDate(date || '');
  }, []);

  return (
    <>
      <Alerts date={lastSaveDate} />
      <Header userData={userData} />
    </>
  );
};

export default Page;
