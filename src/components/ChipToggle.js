const ChipToggle = ({ label, value, setValue }) => (
  <div className="flex items-center gap-2">
    <input
      id={label}
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
    />
    <label htmlFor={label} className="text-sm text-slate-700">
      {label}
    </label>
  </div>
);

export default ChipToggle;
