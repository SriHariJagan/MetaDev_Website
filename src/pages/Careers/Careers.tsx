import { CareerHero } from '@/sections/CareerHero';
import { CareerPerks } from '@/sections/CareerPerks';
import { CareerRoles } from '@/sections/CareerRoles';
import { CareerJourney } from '@/sections/CareerJourney';
import { SectionDivider } from '@/components/common/SectionDivider';
import { SEO } from '@/seo/SEO';
import styles from './Careers.module.css';

export function CareersPage() {
  return (
    <div className={styles.careers}>
      <SEO />
      <CareerHero />
      <SectionDivider />
      <CareerPerks />
      <SectionDivider />
      <CareerRoles />
      <SectionDivider />
      <CareerJourney />
    </div>
  );
}

export default CareersPage;
