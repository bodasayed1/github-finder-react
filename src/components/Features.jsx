import { features } from "../data/features.js";
import FeatureCard from "./FeatureCard.jsx";

function Features() {
  return (
    <section className="grid grid-cols-1 gap-4 border-t border-neutral-800 pt-8 sm:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}

export default Features;