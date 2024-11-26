import { IconCard, IconSearch } from "@/app/ui/icons";

const SettingsBar = async (props: any) => {
  const total = 500;

  return (
    <div className="min-w-100 sticky top-5 z-50 mb-8 flex items-center justify-between rounded-xl bg-blue-50 p-4 shadow-xl">
      <div className="flex items-center gap-1 rounded-full px-2 py-1 font-bold text-slate-500 shadow-inset-box">
        <IconCard />
        <span className="text-sm leading-none text-slate-800">{total}</span>
      </div>
      <div>
        <IconSearch />
      </div>
    </div>
  );
};

export default SettingsBar;
