import { AboutHero } from '@/sections/AboutHero';
import { JourneyTimeline } from '@/sections/JourneyTimeline';
import { MissionVision } from '@/sections/MissionVision';
import { ValuesBento } from '@/sections/ValuesBento';
import { BeyondTheCode } from '@/sections/BeyondTheCode';
import { SectionDivider } from '@/components/common/SectionDivider';
import styles from './About.module.css';

export function AboutPage() {
  return (
    <div className={styles.about}>
      <AboutHero />
      <SectionDivider />
      <JourneyTimeline />
      <SectionDivider />
      <MissionVision />
      <SectionDivider />
      <ValuesBento />
      <SectionDivider />
      <BeyondTheCode />
    </div>
  );
}

export default AboutPage;
