function SearchForm({ value, error, isLoading, onChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const borderClass = error
    ? "border-red-400"
    : "border-neutral-700 focus:border-amber-400";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <i
            className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          ></i>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter a GitHub username..."
            autoComplete="off"
            aria-label="GitHub username"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "search-error" : undefined}
            className={`w-full rounded-xl border-2 bg-neutral-800 py-3.5 pl-11 pr-4 text-base text-neutral-100 outline-none transition placeholder:text-neutral-500 ${borderClass}`}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-xl bg-amber-400 px-8 py-3.5 font-bold text-neutral-900 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-wait disabled:opacity-60 sm:w-40"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true"></i>
              Searching
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>
      {error && (
        <p id="search-error" role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}

export default SearchForm;