import { useParams } from 'react-router-dom';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';
import { SOLUTIONS } from '@/constants';
import { NotFoundPage } from '@/pages/NotFound';
import { SEO } from '@/seo/SEO';

export function SolutionDetailPage() {
  const { solutionSlug } = useParams<{ solutionSlug: string }>();
  const solution = SOLUTIONS.find((item) => item.slug === solutionSlug);

  if (!solution) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SEO />
      <PagePlaceholder
        title={solution.name}
        description={`${solution.tagline}. ${solution.description} The full solution page is under construction.`}
        action={{ label: 'Back to Solutions', to: '/solutions' }}
      />
    </>
  );
}
