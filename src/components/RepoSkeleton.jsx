function RepoSkeleton() {
  return (
    <li className="flex animate-pulse flex-col gap-3 rounded-2xl border border-neutral-700 bg-neutral-800 p-4">
      <div className="h-5 w-2/3 rounded-lg bg-neutral-700"></div>
      <div className="h-4 w-full rounded-lg bg-neutral-700"></div>
      <div className="h-4 w-1/2 rounded-lg bg-neutral-700"></div>
    </li>
  );
}

export default RepoSkeleton;