import { lazy, Suspense } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Resume = lazy(() => import("./pages/Resume"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const Biography = lazy(() => import("./pages/Biography"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function getRouterBase(): string {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  // wouter expects "" for root; otherwise a leading slash base (e.g. "/Resume")
  return baseUrl === "" || baseUrl === "/" ? "" : baseUrl;
}

function HomeRoute() {
  return <Home />;
}

function ResumeRoute() {
  return <Resume />;
}

function ProjectsRoute() {
  return <ProjectsPage />;
}

function BiographyRoute() {
  return <Biography />;
}

function NotFoundRoute() {
  return <NotFound />;
}

function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/" component={HomeRoute} />
        <Route path="/resume" component={ResumeRoute} />
        <Route path="/projects" component={ProjectsRoute} />
        <Route path="/biography" component={BiographyRoute} />
        <Route path="/404" component={NotFoundRoute} />
        {/* Final fallback route */}
        <Route component={NotFoundRoute} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={getRouterBase()}>
        <ScrollToTop />
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
