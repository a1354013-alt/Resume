import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import SEOHead from "@/components/SEOHead";
import { profile } from "@/data/profile";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead
        title={`404｜${profile.name}`}
        description="Page not found."
        canonicalPath="/404"
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 to-black text-slate-100 px-4">
        <div className="w-full max-w-lg border border-slate-700/50 rounded-xl bg-slate-900/30 backdrop-blur-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-400" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            這個頁面不存在，可能已被移除或路徑變更。
          </p>

          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            回首頁
          </button>
        </div>
      </div>
    </>
  );
}
