import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  IconArrow,
  IconClipboard,
  IconEmojiFrown,
  IconHouse,
  IconSave,
  IconXLarge,
} from '@/app/ui/icons';
import {
  copyToClipboard,
  resetSaveReminder,
  saveToLocalStorage,
} from '@/app/lib/functions';

import MenuButton from '@/app/_components/_menu/menuButton';
import MenuDrawer from '@/app/_components/_menu/menuDrawer';
import SetLink from '@/app/_components/_menu/setLink';

import Divider from '@/app/_components/_ui/divider';
import Modal from '@/app/_components/_ui/modal';

import GradientButton from '@/app/_components/_ui/_buttons/gradient';
import LinkButton from '@/app/_components/_ui/_buttons/link';

const Header = ({
  userData,
  setUserData,
  setLastSaveDate,
  back,
}: {
  userData: { [key: string]: { [key: string]: number } };
  setUserData: (e: { [key: string]: { [key: string]: number } }) => void;
  setLastSaveDate: (e: string) => void;
  back?: string;
}) => {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const [openStorageModal, setOpenStorageModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [jsonError, setJsonError] = useState({
    error: false,
    message: '',
  });
  const [copyBtnText, setCopyBtnText] = useState('Copy to clipboard');

  useEffect(() => {
    setTextAreaValue(JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    try {
      JSON.parse(textAreaValue);
      setJsonError({ error: false, message: '' });
    } catch (e) {
      setJsonError({ error: true, message: (e as Error).toString() });
    }
  }, [textAreaValue]);

  useEffect(() => {
    if (copyBtnText !== 'Copy to clipboard') {
      setTimeout(() => setCopyBtnText('Copy to clipboard'), 4000);
    }
  }, [copyBtnText]);

  const toggleMenuDrawer = () => {
    setOpenMenuDrawer(!openMenuDrawer);
  };

  const toggleStorageModal = () => {
    setOpenStorageModal(!openStorageModal);
  };

  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        {back && (
          <Link href={back} className="absolute left-0 top-0 p-6">
            <button
              className="mr-0.5 rounded-full bg-indigo-50 p-2 text-3xl shadow-btn transition hover:scale-110 hover:bg-indigo-100/50"
              type="button"
            >
              <IconArrow dir="left" />
            </button>
          </Link>
        )}
        <h1 className="text-center text-2xl font-bold">My Cards</h1>
        <div className="absolute right-0 top-0 p-6">
          <MenuButton toggleMenuDrawer={() => toggleMenuDrawer()} />

          <MenuDrawer
            toggleMenuDrawer={() => toggleMenuDrawer()}
            openMenuDrawer={openMenuDrawer}
          >
            <div className="flex w-full flex-col gap-3">
              <Link
                href="/"
                className="flex h-12 w-full items-center gap-3 rounded-full px-4 transition hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40 hover:shadow-inset-box"
                type="button"
              >
                <span className="text-lg">
                  <IconHouse />
                </span>
                <span className="grow">Home</span>
              </Link>
              <Divider />
              <SetLink set="A1" href="A1" name="Genetic Apex" />
              <SetLink set="P-A" href="PA" name="Promo-A" />
              <Divider />
              <LinkButton
                onClick={() => toggleStorageModal()}
                className="w-full"
              >
                <span className="text-lg">
                  <IconSave />
                </span>
                <span className="grow">Local storage</span>
              </LinkButton>
            </div>
          </MenuDrawer>

          <Modal show={openStorageModal} onClick={() => toggleStorageModal()}>
            <div className="flex items-center">
              <h2 className="grow text-xl font-bold">Local Storage</h2>
              <button
                className="flex h-12 w-12 items-center justify-center text-lg text-slate-500 hover:text-slate-700"
                type="button"
                onClick={() => toggleStorageModal()}
              >
                <IconXLarge />
              </button>
            </div>
            <p>
              This is your local save code. It can be copied to other devices or
              saved on your device as a backup.
            </p>
            <p className="mb-5">Copy it and keep it somewhere safe!</p>
            <textarea
              rows={5}
              value={!textAreaValue ? 'Loading...' : textAreaValue.toString()}
              onChange={(e) => setTextAreaValue(e.target.value)}
              className="mb-5 w-full break-all rounded-3xl border-0 bg-blue-50 px-4 py-2 text-slate-700 shadow-inset-box focus:outline-0 focus:ring-0"
            />
            <div className={clsx('mb-5', { hidden: !jsonError.error })}>
              <div className="w-full rounded-lg bg-red-200/40 px-4 py-2 text-red-500">
                <p className="flex items-center gap-1 font-bold">
                  Something&apos;s up with your JSON <IconEmojiFrown />
                </p>
                <p className="text-sm">
                  Check the error message below or try pasting again. This
                  message will go away when everything&apos;s corrected.
                </p>
                <code className="text-xs text-red-400">
                  {jsonError.message}
                </code>
              </div>
            </div>
            <div className="flex justify-between">
              <LinkButton
                onClick={() => {
                  resetSaveReminder();
                  copyToClipboard(textAreaValue.toString());
                  setCopyBtnText('Copied!');
                }}
              >
                <span className="text-lg">
                  <IconClipboard />
                </span>
                <span className="grow">{copyBtnText}</span>
              </LinkButton>
              <GradientButton
                onClick={() => {
                  setUserData(JSON.parse(textAreaValue));
                  setLastSaveDate(new Date().toString());
                  saveToLocalStorage('lastSaveDate', new Date().toString());
                  saveToLocalStorage('userData', textAreaValue);
                  toggleStorageModal();
                }}
                disabled={!textAreaValue || jsonError.error}
              >
                <span className="text-lg">
                  <IconSave />
                </span>
                <span>Save</span>
              </GradientButton>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
