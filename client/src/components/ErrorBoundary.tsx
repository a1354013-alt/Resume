import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.PROD) {
      console.error("Error caught by boundary:", error, errorInfo);
      // Optional: forward to an error reporting service (e.g. Sentry)
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-black text-slate-100">
        <div className="flex flex-col items-center w-full max-w-2xl p-8 border border-slate-700/50 rounded-xl bg-slate-900/30 backdrop-blur-sm">
          <AlertTriangle
            size={48}
            className="text-red-400 mb-6 flex-shrink-0"
          />

          <h2 className="text-xl mb-4">An unexpected error occurred.</h2>

          {import.meta.env.DEV && this.state.error && (
            <div className="p-4 w-full rounded bg-slate-950/60 border border-slate-700/40 overflow-auto mb-6">
              <pre className="text-sm text-slate-300 whitespace-break-spaces">
                {this.state.error.stack}
              </pre>
            </div>
          )}

          {import.meta.env.PROD && (
            <div className="p-4 w-full rounded bg-slate-950/60 border border-slate-700/40 mb-6">
              <p className="text-sm text-slate-300">
                An error occurred. Please try refreshing the page or contact
                support.
              </p>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
