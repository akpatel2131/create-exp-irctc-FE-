const Pill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full border text-sm flex items-center gap-2 transition hover:shadow-sm whitespace-nowrap ${
      active
        ? "bg-slate-900 text-white border-slate-900"
        : "bg-white border-slate-300 text-slate-700"
    }`}
  >
    {children}
  </button>
);

export default Pill;
