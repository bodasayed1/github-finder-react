function Header() {
  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-sm font-semibold text-amber-400">
        <i className="fa-brands fa-github mr-2" aria-hidden="true"></i>
        Free and no sign-up
      </span>
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        GitHub <span className="text-amber-400">Profile</span> Finder
      </h1>
      <p className="max-w-xl text-neutral-400">
        Search any GitHub user to see their profile, their numbers, and their
        latest repositories in seconds.
      </p>
    </header>
  );
}

export default Header;