import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import TrainCard from "./TrainCard";
import ChipToggle from "./ChipToggle";
import Pill from "../uiComponents/Pill";
import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Filter,
  ListFilter,
  SlidersHorizontal,
  Search,
  Train,
} from "lucide-react";
import { MOCK_TRAINS } from "../data";
import { SORTS } from "../constants";

export default function TrainDashboard() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState(() => new Date());
  const [route, setRoute] = useState({
    from: { code: "NDLS" },
    to: { code: "MMCT" },
  });
  const [sort, setSort] = useState("smart");
  const [acOnly, setAcOnly] = useState(true);
  const [sleeper, setSleeper] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const swapRoute = () => setRoute(({ from, to }) => ({ from: to, to: from }));
  const shiftDate = (delta) =>
    setDate((value) => new Date(value.getTime() + delta * 24 * 60 * 60 * 1000));

  const filtered = useMemo(() => {
    let list = MOCK_TRAINS.filter((train) =>
      (train.name + train.id + train.from.code + train.to.code)
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    if (acOnly)
      list = list
        .map((train) => ({
          ...train,
          classes: train.classes.filter((c) =>
            ["1A", "2A", "3A", "CC", "EC"].includes(c.code)
          ),
        }))
        .filter((train) => train.classes.length);

    if (sleeper)
      list = list
        .map((train) => ({
          ...train,
          classes: train.classes.filter(
            (item) => item.code === "SL" || item.code === "3A"
          ),
        }))
        .filter((train) => train.classes.length);

    if (availableOnly)
      list = list
        .map((train) => ({
          ...train,
          classes: train.classes.filter((item) => item.avail > 0),
        }))
        .filter((train) => train.classes.length);

    const bySmartScore = (train) => {
      const cheapest = Math.min(
        ...train.classes.map((item) => item.price || 1e9)
      );
      const availability = Math.max(...train.classes.map((item) => item.avail));
      const durScore = 1 / (1 + train.durationMin / 600);
      const onTime = train.onTime / 100;
      return (
        0.4 * (1 / cheapest) +
        0.3 * durScore +
        0.3 * onTime +
        availability / 5000
      );
    };

    const sorters = {
      smart: (a, b) => bySmartScore(b) - bySmartScore(a),
      earliest: (a, b) => a.from.time.localeCompare(b.from.time),
      duration: (a, b) => a.durationMin - b.durationMin,
      price: (a, b) =>
        Math.min(...a.classes.map((item) => item.price || 9e9)) -
        Math.min(...b.classes.map((item) => item.price || 9e9)),
    };

    return list.slice().sort(sorters[sort]);
  }, [query, acOnly, sleeper, availableOnly, sort]);

  const toggleCompare = (id) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-slate-900 text-white">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">
                IRCTC – Concept Redesign
              </div>
              <h1 className="text-xl md:text-2xl font-bold">Train Results</h1>
            </div>
          </div>
        </div>

        {/* Top route/date bar */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm ring-1 ring-slate-200/70">
          <TopBar
            route={route}
            date={date}
            onDateChange={shiftDate}
            onSwap={swapRoute}
          />

          {/* Search & filters */}
          <div className="mt-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by train name/number"
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {SORTS.map((s) => (
                <Pill
                  key={s.key}
                  active={sort === s.key}
                  onClick={() => setSort(s.key)}
                >
                  <SlidersHorizontal className="w-4 h-4" /> {s.label}
                </Pill>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <ChipToggle
              label="AC classes"
              value={acOnly}
              setValue={setAcOnly}
            />
            <ChipToggle
              label="Sleeper focus"
              value={sleeper}
              setValue={setSleeper}
            />
            <ChipToggle
              label="Only available"
              value={availableOnly}
              setValue={setAvailableOnly}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {filtered.length} trains • {route.from.code} → {route.to.code}
          </div>
          <div className="text-xs text-slate-500">
            Prototype • Mock data • Pricing indicative
          </div>
        </div>

        {/* Results list */}
        <div className="grid gap-4">
          <AnimatePresence initial={false}>
            {filtered.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                onCompareToggle={toggleCompare}
                compareList={compareList}
              />
            ))}
          </AnimatePresence>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-5 inset-x-0 px-4 md:px-8 pointer-events-none">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/95 backdrop-blur rounded-2xl border border-slate-200 shadow p-3 md:p-4 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4" /> {compareList.length} train(s)
                  selected for compare
                </div>
                <button
                  onClick={() => alert(`Comparing: ${compareList.join(", ")}`)}
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
