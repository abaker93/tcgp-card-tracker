import { useEffect, useState } from 'react';
import MenuButton from './_menu/menuButton';
import MenuDrawer from './_menu/menuDrawer';
import SetLink from './_menu/setLink';
import Divider from './_ui/divider';
import {
  IconClipboard,
  IconEmojiFrown,
  IconHouse,
  IconSave,
  IconXLarge,
} from '../ui/icons';
import Modal from './_ui/modal';
import clsx from 'clsx';
import {
  copyToClipboard,
  resetSaveReminder,
  saveToLocalStorage,
} from '../lib/functions';
import GradientButton from './_ui/_buttons/gradient';
import LinkButton from './_ui/_buttons/link';
import Link from 'next/link';

const Header = (props: any) => {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const [openStorageModal, setOpenStorageModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [jsonError, setJsonError] = useState({
    error: false,
    message: '',
  });
  const [copyBtnText, setCopyBtnText] = useState('Copy to clipboard');

  useEffect(() => {
    setTextAreaValue(JSON.stringify(props.userData));
  }, [props.userData]);

  useEffect(() => {
    try {
      JSON.parse(textAreaValue);
      setJsonError({ error: false, message: '' });
    } catch (e) {
      setJsonError({ error: true, message: e.toString() });
    }

    // console.log(jsonError);
  }, [textAreaValue]);

  useEffect(() => {
    if (copyBtnText !== 'Copy to clipboard') {
      setTimeout(() => setCopyBtnText('Copy to clipboard'), 4000);
    }
  }, [copyBtnText]);

  const toggleMenuDrawer = () => {
    // console.log('toggleMenuDrawer: ', !openMenuDrawer);
    setOpenMenuDrawer(!openMenuDrawer);
  };

  const toggleStorageModal = () => {
    // console.log('toggleStorageModal: ', !openStorageModal);
    setOpenStorageModal(!openStorageModal);
  };

  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
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
                  Something's up with your JSON <IconEmojiFrown />
                </p>
                <p className="text-sm">
                  Check the error message below or try pasting again. This
                  message will go away when everything's corrected.
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
                  props.setUserData(JSON.parse(textAreaValue));
                  props.setLastSaveDate(new Date().toString());
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
