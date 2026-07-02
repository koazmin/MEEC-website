import Icon from "./Icon";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: MarqueeProps) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const row = [...items, ...items];
  return (
    <div className={`group relative flex overflow-hidden ${className}`} aria-hidden>
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-display text-2xl font-medium md:text-3xl">{item}</span>
            <Icon name="star" className="h-4 w-4 shrink-0 text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
