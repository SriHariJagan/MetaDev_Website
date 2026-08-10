import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function NotFoundPage() {
  return (
    <PagePlaceholder
      title="Page not found"
      description="The page you are looking for does not exist or has been moved."
      action={{ label: 'Back to Home', to: '/' }}
    />
  );
}
