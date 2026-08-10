import { CareerHero } from '@/sections/CareerHero';
import { CareerPerks } from '@/sections/CareerPerks';
import { CareerRoles } from '@/sections/CareerRoles';
import { CareerJourney } from '@/sections/CareerJourney';
import { SectionDivider } from '@/components/common/SectionDivider';
import styles from './Careers.module.css';

export function CareersPage() {
  return (
    <div className={styles.careers}>
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
