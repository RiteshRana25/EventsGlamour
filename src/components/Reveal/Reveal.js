import React, { useRef, useEffect, useState } from "react";
import "./Reveal.css";

let observer = null;
const callbacks = new WeakMap();

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cb = callbacks.get(entry.target);
        if (cb) cb(entry);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  return observer;
}

export default function Reveal({ children, offset = 15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = getObserver();

    const callback = (entry) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(entry.target);
      }
    };

    callbacks.set(el, callback);
    obs.observe(el);

    return () => {
      if (el && obs) {
        try {
          obs.unobserve(el);
        } catch (e) {
        }
      }
      callbacks.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ "--offset": `${offset}%` }}
    >
      {children}
    </div>
  );
}
