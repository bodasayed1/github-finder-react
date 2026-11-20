const details = {
  "not-found": { icon: "fa-user-slash", title: "Account not found" },
  "rate-limit": { icon: "fa-gauge-high", title: "Request limit reached" },
  network: { icon: "fa-wifi", title: "Connection problem" },
  timeout: { icon: "fa-hourglass-half", title: "The request timed out" },
  server: { icon: "fa-server", title: "GitHub is unavailable" },
  "invalid-data": { icon: "fa-triangle-exclamation", title: "Unexpected response" },
  unknown: { icon: "fa-circle-exclamation", title: "Something went wrong" },
};

function ErrorMessage({ error, onRetry }) {
  const { icon, title } = details[error.kind] || details.unknown;

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-400/40 bg-red-400/10 p-6 text-center"
    >
      <i className={`fa-solid ${icon} text-2xl text-red-400`} aria-hidden="true"></i>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="max-w-md break-words text-neutral-400">{error.message}</p>
      {error.retryable && (
        <button
          type="button"
          onClick={onRetry}
          className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-neutral-900 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          <i className="fa-solid fa-rotate-right mr-2" aria-hidden="true"></i>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;