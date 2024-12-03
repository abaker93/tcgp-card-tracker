"use client";

import { IconClipboard, IconMenu, IconSave, IconXLarge } from "@/app/ui/icons";
import { useEffect, useState } from "react";
import { packImg } from "../lib/imgUtils";
import Link from "next/link";
import clsx from "clsx";
import { getUserData } from "@/app/lib/functions";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="absolute right-0 top-0 p-6">
        <button
          className="mr-0.5 rounded-full bg-indigo-50 p-2 text-3xl shadow-btn transition hover:scale-110 hover:bg-indigo-100"
          type="button"
          data-drawer-target="menu-drawer"
          data-drawer-show="menu-drawer"
          onClick={() => toggleOpen()}
        >
          <IconMenu />
        </button>
      </div>
      <Drawer open={open} onClose={() => toggleOpen()} />
    </>
  );
};

const Drawer = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, []);

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const styles = {
    button:
      "flex h-12 w-full items-center gap-3 rounded-full px-4 transition hover:shadow-inset-box hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40",
    divider: {
      outer: "relative mx-auto mb-2 mt-5 w-full overflow-hidden",
      inner:
        "mt-1 h-6 overflow-hidden shadow-[0_-1px_2px_-1px_white] after:mx-auto after:-mt-6 after:block after:h-6 after:w-11/12 after:rounded-[100px/12px] after:shadow-[0_0_20px_0_rgba(30,58,138,0.15)]",
    },
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-50 h-screen w-screen bg-sky-700/20 backdrop-blur-sm transition",
          {
            "pointer-events-none opacity-0": !props.open,
            "pointer-events-auto opacity-100": props.open,
          },
        )}
        aria-hidden="true"
        aria-labelledby="drawer-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 h-screen w-screen"
          onClick={props.onClose}
        ></div>
        <div
          className={clsx(
            "fixed inset-y-0 top-16 flex h-min w-screen max-w-md flex-col rounded-l-3xl bg-blue-50 px-8 py-16 shadow-btn transition",
            {
              "-right-full": !props.open,
              "right-0": props.open,
            },
          )}
        >
          <h2 className="sr-only" id="drawer-title">
            User Menu
          </h2>
          <div className="flex w-full flex-col gap-3">
            <Link className={styles.button} href="/A1">
              <div className="w-16">{packImg("A1")}</div>
              <div className="flex items-center gap-3">
                <div className="w-16 rounded-md bg-slate-900 px-5 py-0.5 text-center text-xs font-bold leading-none text-white">
                  A1
                </div>
                <p>Genetic Apex</p>
              </div>
            </Link>
            <Link className={styles.button} href="/PA">
              <div className="w-16">{packImg("PA")}</div>
              <div className="flex items-center gap-3">
                <div className="w-16 rounded-md bg-slate-900 px-5 py-0.5 text-center text-xs font-bold leading-none text-white">
                  P-A
                </div>
                <p>Promo-A</p>
              </div>
            </Link>
          </div>
          <div className={styles.divider.outer}>
            <div className={styles.divider.inner}></div>
          </div>
          <button
            className={`text-xl ${styles.button}`}
            onClick={() => toggleModalOpen()}
            type="button"
          >
            <IconSave />
            <span className="grow text-base">Local storage</span>
          </button>
        </div>
      </div>
      <StorageModal open={modalOpen} onClose={() => toggleModalOpen()} />
    </>
  );
};

const StorageModal = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.stringify(getUserData()));
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-sky-700/20 backdrop-blur-sm transition",
        {
          "pointer-events-none opacity-0": !props.open,
          "pointer-events-auto opacity-100": props.open,
        },
      )}
      aria-hidden="true"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 h-screen w-screen"
        onClick={props.onClose}
      ></div>
      <div
        className={clsx(
          "inset-0 z-50 h-auto w-3/4 max-w-full rounded-3xl bg-blue-50 px-8 py-8 shadow-btn transition sm:w-1/2",
          {
            opacity: !props.open,
            "opacity-100": props.open,
          },
        )}
      >
        <div className="mb-3 flex items-center">
          <h2 className="grow text-xl font-bold">Local Storage</h2>
          <button
            className="flex h-12 w-12 items-center justify-center text-lg text-slate-500 hover:text-slate-700"
            type="button"
            onClick={props.onClose}
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
          type="text"
          rows="5"
          readOnly
          value={userData.toString()}
          className="mb-5 w-full break-all rounded-3xl border-0 bg-blue-50 px-4 py-2 text-slate-700 shadow-inset-box focus:outline-0 focus:ring-0"
        />
        <button
          className="flex items-center gap-3 rounded-full px-4 py-2 text-xl transition hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40 hover:shadow-inset-box"
          onClick={() => copyToClipboard(userData.toString())}
          type="button"
        >
          <IconClipboard />
          <span className="text-base">Copy to Clipboard</span>
        </button>
      </div>
    </div>
  );
};

export default MenuDrawer;
