import { AboutHero } from '@/sections/AboutHero';
import { JourneyTimeline } from '@/sections/JourneyTimeline';
import { MissionVision } from '@/sections/MissionVision';
import { ValuesBento } from '@/sections/ValuesBento';
import { SectionDivider } from '@/components/common/SectionDivider';
import { SEO } from '@/seo/SEO';
import styles from './About.module.css';

export function AboutPage() {
  return (
    <div className={styles.about}>
      <SEO />
      <AboutHero />
      <SectionDivider />
      <JourneyTimeline />
      <SectionDivider />
      <MissionVision />
      <SectionDivider />
      <ValuesBento />
    </div>
  );
}

export default AboutPage;
