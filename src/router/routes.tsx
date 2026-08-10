import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/Home').then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('@/pages/About').then((module) => ({ default: module.AboutPage })));
const SolutionsPage = lazy(() => import('@/pages/Solutions').then((module) => ({ default: module.SolutionsPage })));
const SolutionDetailPage = lazy(() => import('@/pages/SolutionDetail').then((module) => ({ default: module.SolutionDetailPage })));
const ContactPage = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.ContactPage })));
const TeamPage = lazy(() => import('@/pages/Team').then((module) => ({ default: module.TeamPage })));
const CareersPage = lazy(() => import('@/pages/Careers').then((module) => ({ default: module.CareersPage })));
const OurProductsPage = lazy(() => import('@/pages/OurProducts').then((module) => ({ default: module.OurProductsPage })));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail').then((module) => ({ default: module.ProductDetailPage })));
const MetaCheckPage = lazy(() => import('@/pages/MetaCheck').then((module) => ({ default: module.MetaCheckPage })));
const MetaHirePage = lazy(() => import('@/pages/MetaHire').then((module) => ({ default: module.MetaHirePage })));
const MetaAddsPage = lazy(() => import('@/pages/MetaAdds').then((module) => ({ default: module.MetaAddsPage })));
const MetaGreenPage = lazy(() => import('@/pages/MetaGreen').then((module) => ({ default: module.MetaGreenPage })));
const MetaFlowPage = lazy(() => import('@/pages/MetaFlow').then((module) => ({ default: module.MetaFlowPage })));
const MetaHealthPage = lazy(() => import('@/pages/MetaHealth').then((module) => ({ default: module.MetaHealthPage })));
const MetaEduPage = lazy(() => import('@/pages/MetaEdu').then((module) => ({ default: module.MetaEduPage })));
const LoginPage = lazy(() => import('@/pages/Login').then((module) => ({ default: module.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword').then((module) => ({ default: module.ForgotPasswordPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFound').then((module) => ({ default: module.NotFoundPage })));
const ErrorPage = lazy(() => import('@/pages/Error').then((module) => ({ default: module.ErrorPage })));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'solutions',
        children: [
          { index: true, element: <SolutionsPage /> },
          { path: ':solutionSlug', element: <SolutionDetailPage /> },
        ],
      },
      {
        path: 'products',
        children: [
          { index: true, element: <OurProductsPage /> },
          { path: 'metacheck', element: <MetaCheckPage /> },
          { path: 'metahire', element: <MetaHirePage /> },
          { path: 'metaadds', element: <MetaAddsPage /> },
          { path: 'metagreen', element: <MetaGreenPage /> },
          { path: 'metaflow', element: <MetaFlowPage /> },
          { path: 'metahealth', element: <MetaHealthPage /> },
          { path: 'metaedu', element: <MetaEduPage /> },
          { path: ':productSlug', element: <ProductDetailPage /> },
        ],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
