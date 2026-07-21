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
        description="找不到您要查看的頁面。"
        canonicalPath="/404"
        noIndex
      />
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 to-black px-4 text-slate-100">
        <div className="w-full max-w-lg rounded-xl border border-slate-700/50 bg-slate-900/30 p-8 text-center backdrop-blur-sm">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-400" />
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold">404</h1>
          <h2 className="mb-4 text-xl font-semibold text-slate-200">
            Page Not Found
          </h2>
          <p className="mb-8 leading-relaxed text-slate-300">
            ???Ｖ?摮嚗?賢歇鋡怎宏?斗?頝臬?霈??
          </p>

          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-6 py-3 font-medium text-cyan-200 transition-colors hover:bg-cyan-500/30"
          >
            <Home className="h-4 w-4" />
            返回首頁
          </button>
        </div>
      </div>
    </>
  );
}
