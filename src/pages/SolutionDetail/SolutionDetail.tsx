import { useParams } from 'react-router-dom';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';
import { SOLUTIONS } from '@/constants';
import { NotFoundPage } from '@/pages/NotFound';

export function SolutionDetailPage() {
  const { solutionSlug } = useParams<{ solutionSlug: string }>();
  const solution = SOLUTIONS.find((item) => item.slug === solutionSlug);

  if (!solution) {
    return <NotFoundPage />;
  }

  return (
    <PagePlaceholder
      title={solution.name}
      description={`${solution.tagline}. ${solution.description} The full solution page is under construction.`}
      action={{ label: 'Back to Solutions', to: '/solutions' }}
    />
  );
}
