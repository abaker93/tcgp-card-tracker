"use client";

import { IconMenu } from "@/app/ui/icons";
import { useState } from "react";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute right-0 top-0 p-8">
        <button
          className="mr-0.5 rounded-full bg-indigo-50 p-2 text-3xl shadow-btn transition hover:scale-110 hover:bg-indigo-100"
          type="button"
          data-drawer-target="menu-drawer"
          data-drawer-show="menu-drawer"
          onClick={() => setOpen(true)}
        >
          <IconMenu />
        </button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const Drawer = (props) => {
  return (
    <div
      className="relative z-50"
      aria-labelledby="drawer-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-md">
              <div className="flex rounded-3xl bg-blue-50 shadow-btn">
                <h2 className="sr-only" id="drawer-title">
                  User Menu
                </h2>
                <div className="relative flex-1">Menu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
