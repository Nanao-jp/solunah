export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Moon Glow - 大きく動く */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/50 via-blue-400/40 to-indigo-600/50 blur-[120px] moon-glow" />
      {/* Sun Glow - 大きく動く */}
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/60 via-orange-500/50 to-yellow-500/60 blur-[140px] sun-glow" />
      {/* Additional ambient lights - 動く */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-full blur-[200px] ambient-glow" />
    </div>
  );
}

