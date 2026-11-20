import { suggestions } from "../data/suggestions.js";

function Suggestions({ disabled, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-neutral-400 sm:justify-start">
      <span>Try:</span>
      {suggestions.map((item) => (
        <button
          key={item.username}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.username)}
          className="cursor-pointer rounded-full border border-neutral-700 px-4 py-2 text-sm text-amber-400 transition hover:border-amber-400 hover:bg-amber-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-wait disabled:opacity-60"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Suggestions;