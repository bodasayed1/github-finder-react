function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col items-center gap-6 rounded-3xl border border-neutral-700 bg-neutral-800 p-6 sm:flex-row"
    >
      <div className="size-28 shrink-0 rounded-full bg-neutral-700"></div>
      <div className="flex w-full flex-col items-center gap-3 sm:items-start">
        <div className="h-7 w-48 max-w-full rounded-lg bg-neutral-700"></div>
        <div className="h-5 w-32 rounded-lg bg-neutral-700"></div>
        <div className="h-5 w-full max-w-sm rounded-lg bg-neutral-700"></div>
        <div className="mt-2 flex gap-3">
          <div className="h-8 w-20 rounded-xl bg-neutral-700"></div>
          <div className="h-8 w-24 rounded-xl bg-neutral-700"></div>
          <div className="h-8 w-24 rounded-xl bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;