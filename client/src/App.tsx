import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import ProjectsPage from "./pages/ProjectsPage";
import Biography from "./pages/Biography";

function getRouterBase(): string {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  // wouter expects "" for root; otherwise a leading slash base (e.g. "/Resume")
  return baseUrl === "" || baseUrl === "/" ? "" : baseUrl;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resume" component={Resume} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/biography" component={Biography} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={getRouterBase()}>
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
