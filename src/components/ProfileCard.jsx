import { useState } from "react";

function ProfileCard({ profile }) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  const name = profile.name || profile.login;
  const bio = profile.bio || "No bio yet.";
  const stats = [
    { label: "repos", value: profile.public_repos ?? 0 },
    { label: "followers", value: profile.followers ?? 0 },
    { label: "following", value: profile.following ?? 0 },
  ];

  return (
    <section className="flex flex-col items-center gap-6 rounded-3xl border border-neutral-700 bg-neutral-800 p-6 text-center shadow-lg shadow-black/30 sm:flex-row sm:text-left">
      {avatarFailed ? (
        <div className="flex size-28 shrink-0 items-center justify-center rounded-full border-4 border-amber-400 bg-neutral-900 text-4xl text-amber-400">
          <i className="fa-solid fa-user" aria-hidden="true"></i>
        </div>
      ) : (
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          onError={() => setAvatarFailed(true)}
          className="size-28 shrink-0 rounded-full border-4 border-amber-400"
        />
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="break-words text-2xl font-bold">{name}</h2>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-amber-400 hover:underline"
        >
          @{profile.login}
        </a>
        <p className="break-words text-neutral-400">{bio}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
          {stats.map((stat) => (
            <span
              key={stat.label}
              className="rounded-xl bg-neutral-900 px-3 py-1.5 text-sm"
            >
              <b className="text-amber-400">{stat.value}</b> {stat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;