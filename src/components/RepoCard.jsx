function RepoCard({ repo }) {
  const description = repo.description || "No description";

  return (
    <li className="flex flex-col gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 p-4 transition hover:-translate-y-1 hover:border-amber-400">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words font-bold text-amber-400 hover:underline"
      >
        {repo.name}
      </a>
      <p className="flex-1 break-words text-sm text-neutral-400">
        {description}
      </p>
      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <span>
          <i className="fa-solid fa-star mr-1 text-amber-400" aria-hidden="true"></i>
          {repo.stargazers_count ?? 0}
        </span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </li>
  );
}

export default RepoCard;