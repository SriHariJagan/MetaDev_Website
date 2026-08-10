import { SOLUTIONS } from '@/constants';
import { SolutionsShowcase } from '@/sections/SolutionsShowcase';
import { SolutionsGrid } from '@/sections/SolutionsGrid';
import { IndustriesMarquee } from '@/sections/IndustriesMarquee';
import { TechStack } from '@/sections/TechStack';
import { WhyPartnerWithUs } from '@/sections/WhyPartnerWithUs';

export function SolutionsPage() {
  return (
    <>
      <SolutionsShowcase solutions={SOLUTIONS} />
      <SolutionsGrid solutions={SOLUTIONS} />
      <IndustriesMarquee />
      <TechStack />
      <WhyPartnerWithUs />
    </>
  );
}
