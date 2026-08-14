import { TeamHero } from '@/sections/TeamHero';
import { TeamGrid } from '@/sections/TeamGrid';
import { HowWeWork } from '@/sections/HowWeWork';
import { BeyondTheCode } from '@/sections/BeyondTheCode';
import { JoinUs } from '@/sections/JoinUs';
import { SectionDivider } from '@/components/common/SectionDivider';
import styles from './Team.module.css';

export function TeamPage() {
  return (
    <div className={styles.team}>
      <TeamHero />
      <SectionDivider />
      <TeamGrid />
      <SectionDivider />
      <HowWeWork />
      <SectionDivider />
      <BeyondTheCode />
      <SectionDivider />
      <JoinUs />
    </div>
  );
}

export default TeamPage;
