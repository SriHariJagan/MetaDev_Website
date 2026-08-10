// GradientDefs.tsx
import styles from './GradientDefs.module.css';

const GRADIENTS = [
  'teal',
  'blue',
  'violet',
  'amber',
  'orange',
  'pink',
  'green',
  'cyan',
  'indigo',
  'red',
  'lime',
  'rose',
] as const;

export function GradientDefs() {
  return (
    <svg
      width="0"
      height="0"
      className={styles.defs}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {GRADIENTS.map((name) => (
          <linearGradient
            key={name}
            id={`grad-${name}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={`rgb(var(--product-grad-${name}-1))`}
            />
            <stop
              offset="100%"
              stopColor={`rgb(var(--product-grad-${name}-2))`}
            />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
