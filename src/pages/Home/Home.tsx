import { Hero } from '@/sections/Hero';
import { TrustedBy } from '@/sections/TrustedBy';
import { WhyMeta } from '@/sections/WhyMeta';
import { StatsStrip } from '@/sections/StatsStrip';
import { OurProducts } from '@/sections/OurProducts';
import { OurSolutions } from '@/sections/OurSolutions';
import { AIPowered } from '@/sections/AIPowered';
import styles from './Home.module.css';

export function HomePage() {
  return (
    <div className={styles.home}>
      <Hero />
      <TrustedBy />
      <WhyMeta />
      <StatsStrip />
      <OurProducts />
      <OurSolutions />
      <AIPowered />
    </div>
  );
}
