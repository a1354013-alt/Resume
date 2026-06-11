interface LoadingScreenProps {
  label?: string;
}

function LoadingScreen({ label = "Loading portfolio..." }: LoadingScreenProps) {
  return (
    <div
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="loading-screen__orbital" aria-hidden="true">
        <span className="loading-screen__ring loading-screen__ring--outer" />
        <span className="loading-screen__ring loading-screen__ring--middle" />
        <span className="loading-screen__ring loading-screen__ring--inner" />
        <span className="loading-screen__core" />
      </div>

      <p className="loading-screen__text">{label}</p>
    </div>
  );
}

export default LoadingScreen;
