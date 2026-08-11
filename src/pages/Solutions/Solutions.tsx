import { SOLUTIONS } from '@/constants';
import { SolutionsShowcase } from '@/sections/SolutionsShowcase';
import { SolutionsGrid } from '@/sections/SolutionsGrid';
import { OurSolutions } from '@/sections/OurSolutions';
import { IndustriesMarquee } from '@/sections/IndustriesMarquee';
import { TechStack } from '@/sections/TechStack';
import { AIPowered } from '@/sections/AIPowered';
import { WhyPartnerWithUs } from '@/sections/WhyPartnerWithUs';

export function SolutionsPage() {
  return (
    <>
      <SolutionsShowcase solutions={SOLUTIONS} />
      <SolutionsGrid solutions={SOLUTIONS} />
      <OurSolutions />
      <IndustriesMarquee />
      <TechStack />
      <AIPowered />
      <WhyPartnerWithUs />
    </>
  );
}
