import { useMemo } from "react";
import "./Marquee.css";

const MIN_HALF = 10;
const SECONDS_PER_IMAGE = 4.5;

const Marquee = ({ images = [], label = "Gallery" }) => {
  const signature = images.filter(Boolean).join("\u0001");

  const slides = useMemo(() => {
    const source = signature ? signature.split("\u0001") : [];
    if (!source.length) return { half: 0, items: [] };

    const half = [];
    const target = Math.max(source.length, MIN_HALF);
    while (half.length < target) half.push(...source);
    const trimmed = half.slice(0, target);

    return { half: trimmed.length, items: [...trimmed, ...trimmed] };
  }, [signature]);

  if (!slides.items.length) return null;

  return (
    <div className="marquee" role="region" aria-label={label}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${slides.half * SECONDS_PER_IMAGE}s` }}
      >
        {slides.items.map((src, index) => {
          const isClone = index >= slides.half;
          return (
            <img
              key={`${index}-${src}`}
              src={src}
              alt={isClone ? "" : `${label} ${(index % images.length) + 1}`}
              aria-hidden={isClone || undefined}
              className="marquee-item"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;
