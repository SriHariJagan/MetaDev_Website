import { PagePlaceholder } from '@/components/common/PagePlaceholder';
import { SEO } from '@/seo/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | MetaDev"
        description="The page you are looking for does not exist or has been moved."
        robots="noindex, nofollow"
        noindex
      />
      <PagePlaceholder
        title="Page not found"
        description="The page you are looking for does not exist or has been moved."
        action={{ label: 'Back to Home', to: '/' }}
      />
    </>
  );
}
