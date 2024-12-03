"use client";

import { getUserData } from "@/app/lib/functions";
import { IconCard, IconSearch } from "@/app/ui/icons";
import { useEffect, useState } from "react";

const SettingsBar = ({ count }: { count: number }) => {
  return (
    <div className="min-w-100 sticky top-5 z-10 mb-8 flex items-center justify-between rounded-xl bg-blue-50 p-4 shadow-xl">
      <div className="flex items-center gap-1 rounded-full px-2 py-1 font-bold text-slate-500 shadow-inset-box">
        <IconCard />
        <span className="text-sm leading-none text-slate-800">{count}</span>
      </div>
      <div>
        <IconSearch />
      </div>
    </div>
  );
};

export default SettingsBar;
