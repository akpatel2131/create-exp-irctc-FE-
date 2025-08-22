import { MapPin, RefreshCcw, Calendar } from "lucide-react";

const TopBar = ({ route, date, onDateChange, onSwap }) => (
  <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-slate-100">
        <MapPin className="w-5 h-5" />
      </div>
      <div>
        <div className="text-sm text-slate-500">Route</div>
        <div className="font-semibold text-slate-900 flex items-center gap-2">
          {route.from.code} → {route.to.code}
          <button
            onClick={onSwap}
            className="ml-2 text-slate-500 hover:text-slate-900"
            title="Swap"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-slate-100">
        <Calendar className="w-5 h-5" />
      </div>
      <div>
        <div className="text-sm text-slate-500">Date</div>
        <div className="font-semibold text-slate-900">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-2">
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => onDateChange(d)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-sm hover:bg-slate-50"
          >
            {d === -1 ? "Prev" : "Next"}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TopBar;
