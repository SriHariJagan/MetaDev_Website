import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export interface CountUpProps {
  value: string | number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function parseValue(value: string | number, fallbackSuffix: string) {
  if (typeof value === 'number') {
    return { number: value, suffix: fallbackSuffix, decimals: 0 };
  }
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  return { number: parseFloat(match[1]), suffix: match[2], decimals };
}

export function CountUp({ value, suffix = '', duration = 0.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const [display, setDisplay] = useState<string>(() => {
    const parsed = parseValue(value, suffix);
    return parsed ? `0${parsed.suffix}` : String(value);
  });

  useEffect(() => {
    if (!inView) return;
    const parsed = parseValue(value, suffix);
    if (!parsed) return;
    const controls = animate(0, parsed.number, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(`${latest.toFixed(parsed.decimals)}${parsed.suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
