import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const HomePage = lazy(() =>
  import("@/pages/Home").then((module) => ({ default: module.HomePage })),
);
const AboutPage = lazy(() =>
  import("@/pages/About").then((module) => ({ default: module.AboutPage })),
);
const SolutionsPage = lazy(() =>
  import("@/pages/Solutions").then((module) => ({
    default: module.SolutionsPage,
  })),
);
const SolutionDetailPage = lazy(() =>
  import("@/pages/SolutionDetail").then((module) => ({
    default: module.SolutionDetailPage,
  })),
);
const ContactPage = lazy(() =>
  import("@/pages/Contact").then((module) => ({ default: module.ContactPage })),
);
const TeamPage = lazy(() =>
  import("@/pages/Team").then((module) => ({ default: module.TeamPage })),
);
const CareersPage = lazy(() =>
  import("@/pages/Careers").then((module) => ({ default: module.CareersPage })),
);
const OurProductsPage = lazy(() =>
  import("@/pages/OurProducts").then((module) => ({
    default: module.OurProductsPage,
  })),
);
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetail").then((module) => ({
    default: module.ProductDetailPage,
  })),
);
const MetaCheckPage = lazy(() =>
  import("@/pages/MetaCheck").then((module) => ({
    default: module.MetaCheckPage,
  })),
);
const MetaHirePage = lazy(() =>
  import("@/pages/MetaHire").then((module) => ({
    default: module.MetaHirePage,
  })),
);
const MetaAddsPage = lazy(() =>
  import("@/pages/MetaAdds").then((module) => ({
    default: module.MetaAddsPage,
  })),
);
const MetaGreenPage = lazy(() =>
  import("@/pages/MetaGreen").then((module) => ({
    default: module.MetaGreenPage,
  })),
);
const MetaFlowPage = lazy(() =>
  import("@/pages/MetaFlow").then((module) => ({
    default: module.MetaFlowPage,
  })),
);
const MetaHealthPage = lazy(() =>
  import("@/pages/MetaHealth").then((module) => ({
    default: module.MetaHealthPage,
  })),
);
const MetaEduPage = lazy(() =>
  import("@/pages/MetaEdu").then((module) => ({ default: module.MetaEduPage })),
);
const MetaNavPage = lazy(() =>
  import("@/pages/MetaNav").then((module) => ({ default: module.MetaNavPage })),
);
const MetaLedgerPage = lazy(() =>
  import("@/pages/MetaLedger").then((module) => ({
    default: module.MetaLedgerPage,
  })),
);
const MetaCardPage = lazy(() =>
  import("@/pages/MetaCard").then((module) => ({
    default: module.MetaCardPage,
  })),
);
const MetaIMPage = lazy(() =>
  import("@/pages/MetaIM").then((module) => ({ default: module.MetaIMPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").then((module) => ({ default: module.LoginPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("@/pages/ForgotPassword").then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFound").then((module) => ({
    default: module.NotFoundPage,
  })),
);
const ErrorPage = lazy(() =>
  import("@/pages/Error").then((module) => ({ default: module.ErrorPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import("@/pages/Legal/PrivacyPolicy").then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
);
const TermsOfServicePage = lazy(() =>
  import("@/pages/Legal/TermsOfService").then((m) => ({
    default: m.TermsOfServicePage,
  })),
);
const SecurityPage = lazy(() =>
  import("@/pages/Legal/Security").then((m) => ({ default: m.SecurityPage })),
);
// const CompliancePage = lazy(() =>
//   import("@/pages/Legal/Compliance").then((m) => ({
//     default: m.CompliancePage,
//   })),
// );
const SitemapPage = lazy(() =>
  import("@/pages/Legal/Sitemap").then((m) => ({ default: m.SitemapPage })),
);

const DashboardOverview = lazy(() =>
  import("@/pages/Dashboard/Overview").then((m) => ({
    default: m.DashboardOverview,
  })),
);
const UsersPage = lazy(() =>
  import("@/pages/Dashboard/Users").then((m) => ({ default: m.UsersPage })),
);
const OrganizationsPage = lazy(() =>
  import("@/pages/Dashboard/Organizations").then((m) => ({
    default: m.OrganizationsPage,
  })),
);
const ModulesPage = lazy(() =>
  import("@/pages/Dashboard/Modules").then((m) => ({ default: m.ModulesPage })),
);
const SubscriptionsPage = lazy(() =>
  import("@/pages/Dashboard/Subscriptions").then((m) => ({
    default: m.SubscriptionsPage,
  })),
);
const JobsPage = lazy(() =>
  import("@/pages/Dashboard/Jobs").then((m) => ({ default: m.JobsPage })),
);
const SupportPage = lazy(() =>
  import("@/pages/Dashboard/Support").then((m) => ({ default: m.SupportPage })),
);
const AuditPage = lazy(() =>
  import("@/pages/Dashboard/Audit").then((m) => ({ default: m.AuditPage })),
);
const ProductPage = lazy(() =>
  import("@/pages/Dashboard/Product").then((m) => ({ default: m.ProductPage })),
);
const ProductOverview = lazy(() =>
  import("@/pages/Dashboard/Product").then((m) => ({
    default: m.ProductOverview,
  })),
);
const ProductPlans = lazy(() =>
  import("@/pages/Dashboard/Product").then((m) => ({
    default: m.ProductPlans,
  })),
);
const ProductSubscriptions = lazy(() =>
  import("@/pages/Dashboard/Product").then((m) => ({
    default: m.ProductSubscriptions,
  })),
);
const ProductSettings = lazy(() =>
  import("@/pages/Dashboard/Product").then((m) => ({
    default: m.ProductSettings,
  })),
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "solutions",
        children: [
          { index: true, element: <SolutionsPage /> },
          { path: ":solutionSlug", element: <SolutionDetailPage /> },
        ],
      },
      {
        path: "products",
        children: [
          { index: true, element: <OurProductsPage /> },
          { path: "metacheck", element: <MetaCheckPage /> },
          { path: "metahire", element: <MetaHirePage /> },
          { path: "metaadds", element: <MetaAddsPage /> },
          { path: "metagreen", element: <MetaGreenPage /> },
          { path: "metaflow", element: <MetaFlowPage /> },
          { path: "metahealth", element: <MetaHealthPage /> },
          { path: "metaedu", element: <MetaEduPage /> },
          { path: "metanav", element: <MetaNavPage /> },
          { path: "metaledger", element: <MetaLedgerPage /> },
          { path: "metacard", element: <MetaCardPage /> },
          { path: "metaim", element: <MetaIMPage /> },
          { path: ":productSlug", element: <ProductDetailPage /> },
        ],
      },
      { path: "contact", element: <ContactPage /> },
      { path: "team", element: <TeamPage /> },
      { path: "careers", element: <CareersPage /> },
      {
        path: "legal",
        children: [
          { path: "privacy-policy", element: <PrivacyPolicyPage /> },
          { path: "terms-of-service", element: <TermsOfServicePage /> },
          { path: "security", element: <SecurityPage /> },
          // { path: 'compliance', element: <CompliancePage /> },
        ],
      },
      { path: "sitemap", element: <SitemapPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "users", element: <UsersPage /> },
      { path: "organizations", element: <OrganizationsPage /> },
      { path: "modules", element: <ModulesPage /> },
      { path: "subscriptions", element: <SubscriptionsPage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "audit", element: <AuditPage /> },
      {
        path: "product/:code",
        element: <ProductPage />,
        children: [
          { index: true, element: <ProductOverview /> },
          { path: "plans", element: <ProductPlans /> },
          { path: "subscriptions", element: <ProductSubscriptions /> },
          { path: "settings", element: <ProductSettings /> },
        ],
      },
    ],
  },
];
