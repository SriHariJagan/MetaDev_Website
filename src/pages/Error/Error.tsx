import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ErrorPage() {
  const error = useRouteError();

  let message = 'Something went wrong while rendering this page.';

  if (isRouteErrorResponse(error)) {
    message = `${error.status} — ${error.statusText}`;
  }

  return (
    <PagePlaceholder
      title="Something went wrong"
      description={message}
      action={{ label: 'Back to Home', to: '/' }}
    />
  );
}
