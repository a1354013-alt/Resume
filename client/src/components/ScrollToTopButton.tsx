import { ChevronUp } from "lucide-react";

interface ScrollToTopButtonProps {
  onClick: () => void;
}

export default function ScrollToTopButton({ onClick }: ScrollToTopButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-8 right-8 p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full transition-all duration-300 z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 text-cyan-400" />
    </button>
  );
}
