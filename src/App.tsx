import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { PageLoader } from '@/components/ui/PageLoader';
import { router } from '@/router';

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
