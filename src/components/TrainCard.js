import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ChevronDown, ChevronUp, Info, ArrowRight, IndianRupee, Clock, Train } from "lucide-react";
import Badge from "../uiComponents/Badge";
import { AnimatePresence } from "framer-motion";
import AvailabilityChip from "../uiComponents/AvailabilityChip";
import { minToHHMM } from "../utils";
import { currency } from "../utils";

const TrainCard = ({ train, onCompareToggle, compareList }) => {
  const [open, setOpen] = useState(true);
  const isCompared = compareList.includes(train.id);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-200/70"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-slate-100">
            <Train className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-900 truncate">
              {train.name} <span className="text-slate-400">• {train.id}</span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <Badge tone="info">{train.days}</Badge>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {train.onTime}% on-time
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-slate-600 hover:text-slate-900 flex items-center gap-1 text-sm"
        >
          Details{" "}
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="min-w-[90px]">
              <div className="text-xl font-semibold">{train.from.time}</div>
              <div className="text-xs text-slate-500">
                {train.from.name} ({train.from.code})
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 text-slate-500">
              <div className="h-px bg-slate-200 flex-1" />
              <Clock className="w-4 h-4" />
              <span className="text-xs">{minToHHMM(train.durationMin)}</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="min-w-[90px] text-right">
              <div className="text-xl font-semibold">{train.to.time}</div>
              <div className="text-xs text-slate-500">
                {train.to.name} ({train.to.code})
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {train.classes
                    .filter((c) => !c.hidden)
                    .map((c) => (
                      <div
                        key={c.code}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            {c.name}{" "}
                            <span className="text-slate-400">• {c.code}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Dynamic fares
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold flex items-center justify-end gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {currency(c.price)}
                          </div>
                          <div className="mt-1">
                            <AvailabilityChip avail={c.avail} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-stretch gap-2">
          <button onClick={() => alert(`Booking initiated for ${train.name}`)} className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold flex items-center justify-center gap-2 hover:bg-slate-800">
            Book <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => onCompareToggle(train.id)} className={`w-full rounded-xl border py-3 font-medium ${isCompared ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-900 hover:bg-slate-50"}`}>
            {isCompared ? "Remove from Compare" : "Add to Compare"}
          </button>
          <div className="text-xs text-slate-500 text-center">
            Free cancellation up to 24h before departure
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default TrainCard;
