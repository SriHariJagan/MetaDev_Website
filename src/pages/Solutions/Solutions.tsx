import { SOLUTIONS } from '@/constants';
import { SolutionsShowcase } from '@/sections/SolutionsShowcase';
import { OurSolutions } from '@/sections/OurSolutions';
import { TechStack } from '@/sections/TechStack';
import { AIPowered } from '@/sections/AIPowered';
import { WhyPartnerWithUs } from '@/sections/WhyPartnerWithUs';

export function SolutionsPage() {
  return (
    <>
      <SolutionsShowcase solutions={SOLUTIONS} />
      <OurSolutions />
      <TechStack />
      <AIPowered />
      <WhyPartnerWithUs />
    </>
  );
}
