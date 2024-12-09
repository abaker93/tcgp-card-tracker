import { IconBarChart, IconCard, IconSearch } from '@/app/ui/icons';
import GradientButton from '../_ui/_buttons/gradient';

const SettingsBar = ({
  count,
  showStats,
  toggleStats,
}: {
  count: number;
  showStats: any;
  toggleStats: any;
}) => {
  return (
    <div className="min-w-100 sticky top-5 z-20 mb-8 flex items-center justify-between gap-5 rounded-xl bg-blue-50 p-4 shadow-xl">
      <div className="flex items-center gap-1 rounded-full px-2 py-1 font-bold text-slate-500 shadow-inset-box">
        <IconCard />
        <span className="text-sm leading-none text-slate-800">{count}</span>
      </div>
      <div className="flex-grow">
        <GradientButton className="text-sm" onClick={toggleStats}>
          <IconBarChart />
          {showStats ? 'Hide' : 'Show'} Stats
        </GradientButton>
      </div>
      <div>
        <IconSearch />
      </div>
    </div>
  );
};

export default SettingsBar;
