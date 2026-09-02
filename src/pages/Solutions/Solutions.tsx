import { SOLUTIONS } from '@/constants';
import { SolutionsHero } from '@/sections/SolutionsHero';
import { SolutionsShowcase } from '@/sections/SolutionsShowcase';
import { OurSolutions } from '@/sections/OurSolutions';
import { EnterpriseCapabilities } from '@/sections/EnterpriseCapabilities';
import { TechStack } from '@/sections/TechStack';
import { AIPowered } from '@/sections/AIPowered';
import { WhyPartnerWithUs } from '@/sections/WhyPartnerWithUs';
import { IndustriesMarquee } from '@/sections/IndustriesMarquee';
import { SEO } from '@/seo/SEO';

export function SolutionsPage() {
  return (
    <>
      <SEO />
      <SolutionsHero />
      <SolutionsShowcase solutions={SOLUTIONS} />
      <OurSolutions showDescriptions={false} />
      <EnterpriseCapabilities />
      <TechStack />
      <AIPowered />
      <WhyPartnerWithUs />
      <IndustriesMarquee />
    </>
  );
}
