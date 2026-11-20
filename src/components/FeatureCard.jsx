function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800/50 p-5 transition hover:-translate-y-1 hover:border-amber-400/50">
      <i className={`fa-solid ${icon} mb-3 text-xl text-amber-400`} aria-hidden="true"></i>
      <h3 className="mb-1 font-bold">{title}</h3>
      <p className="text-sm text-neutral-400">{text}</p>
    </div>
  );
}

export default FeatureCard;