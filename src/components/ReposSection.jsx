import RepoCard from "./RepoCard.jsx";
import RepoSkeleton from "./RepoSkeleton.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

function ReposSection({ repos, error, isLoading, onRetry }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">
        <i className="fa-solid fa-code-branch mr-2 text-amber-400" aria-hidden="true"></i>
        Latest repositories
      </h2>

      {isLoading && (
        <ul className={gridClass} aria-hidden="true">
          <RepoSkeleton />
          <RepoSkeleton />
          <RepoSkeleton />
        </ul>
      )}

      {!isLoading && error && (
        <ErrorMessage error={error} onRetry={onRetry} />
      )}

      {!isLoading && !error && repos.length === 0 && (
        <p className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6 text-center text-neutral-400">
          This user has no public repositories.
        </p>
      )}

      {!isLoading && !error && repos.length > 0 && (
        <ul className={gridClass}>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ReposSection;