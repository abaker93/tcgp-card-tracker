"use client";

import { IconMenu } from "@/app/ui/icons";
import { useEffect, useState } from "react";
import { packImg } from "../lib/imgUtils";
import Link from "next/link";
import clsx from "clsx";

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
      <div className="absolute right-0 top-0 p-8">
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
  const styles = {
    row: "flex h-12 w-full items-center gap-3 rounded-full px-4 transition hover:shadow-btn",
    divider: "h-3 w-full inner-shadow",
  };

  console.log(props.open);

  return (
    <div
      className={clsx("relative", {
        "-z-50": !props.open,
        "z-50": props.open,
      })}
      aria-labelledby="drawer-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          "fixed inset-0 bg-sky-700/20 backdrop-blur-sm transition-opacity",
          {
            "pointer-events-none opacity-0": !props.open,
            "pointer-events-auto opacity-100": props.open,
          },
        )}
        aria-hidden="true"
        onClick={props.onClose}
      ></div>
      <div
        className={clsx(
          "fixed inset-y-0 top-16 flex max-w-full pl-10 transition-all",
          {
            "-right-full": !props.open,
            "right-0": props.open,
          },
        )}
      >
        <div className="relative w-screen max-w-md">
          <div className="flex flex-col rounded-l-3xl bg-indigo-50 px-8 py-16 shadow-btn">
            <h2 className="sr-only" id="drawer-title">
              User Menu
            </h2>
            <div className="flex w-full flex-col gap-3">
              <Link className={styles.row} href="/A1">
                <div className="w-16">{packImg("A1")}</div>
                <div className="flex items-center gap-3">
                  <div className="w-16 rounded-md bg-slate-900 px-5 py-0.5 text-center text-xs font-bold leading-none text-white">
                    A1
                  </div>
                  <p>Genetic Apex</p>
                </div>
              </Link>
              <Link className={styles.row} href="/PA">
                <div className="w-16">{packImg("PA")}</div>
                <div className="flex items-center gap-3">
                  <div className="w-16 rounded-md bg-slate-900 px-5 py-0.5 text-center text-xs font-bold leading-none text-white">
                    P-A
                  </div>
                  <p>Promo-A</p>
                </div>
              </Link>
            </div>
            <div className="my-8 h-px w-full border-b border-slate-500"></div>

            <div className="flex w-full flex-col gap-3">
              <button className="rounded-full bg-blue-50 px-5 py-1 text-center shadow-btn transition hover:bg-blue-100">
                Local storage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
