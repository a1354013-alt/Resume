import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import ProjectsPage from "./pages/ProjectsPage";
import Biography from "./pages/Biography";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/resume"} component={Resume} />
      <Route path={"/projects"} component={ProjectsPage} />
      <Route path={"/biography"} component={Biography} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// Deep Space Techno Design System
// - Dark background (black) with cyan/purple accents
// - Neon glow effects for interactive elements
// - Cyberpunk aesthetic throughout
// - High contrast for readability

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
