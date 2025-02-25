export default function MindMapFourPillar() {
    return (
      <div className="relative flex justify-center items-center h-screen bg-slate-900">
        {/* Central Node with animation */}
        <div className="absolute flex justify-center items-center w-32 h-32 bg-purple-600 text-white text-2xl font-bold rounded-full border-4 border-purple-300 shadow-xl animate-pulse">
          OOPS
        </div>

        {/* Lines with curved animation */}
        <svg className="absolute w-full h-full" strokeLinecap="round">
          <path
            d="M50 50 Q 30 10, 20 20"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-draw"
          />
          <path
            d="M50 50 Q 70 10, 80 20"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            className="animate-draw"
          />
          <path
            d="M50 50 Q 30 90, 20 80"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
            className="animate-draw"
          />
          <path
            d="M50 50 Q 70 90, 80 80"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="none"
            className="animate-draw"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Four Pillar Nodes with hover effects */}
        <div className="absolute top-[10%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl border-2 border-purple-200 shadow-lg hover:scale-105 transition-transform duration-300 group">
          <span className="font-bold text-lg">Abstraction</span>
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all" />
        </div>

        <div className="absolute top-[10%] right-[20%] transform translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl border-2 border-purple-200 shadow-lg hover:scale-105 transition-transform duration-300 group">
          <span className="font-bold text-lg">Polymorphism</span>
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all" />
        </div>

        <div className="absolute bottom-[10%] left-[20%] transform -translate-x-1/2 translate-y-1/2 bg-gradient-to-br from-green-500 to-purple-600 text-white px-8 py-4 rounded-xl border-2 border-purple-200 shadow-lg hover:scale-105 transition-transform duration-300 group">
          <span className="font-bold text-lg">Encapsulation</span>
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all" />
        </div>

        <div className="absolute bottom-[10%] right-[20%] transform translate-x-1/2 translate-y-1/2 bg-gradient-to-br from-amber-500 to-purple-600 text-white px-8 py-4 rounded-xl border-2 border-purple-200 shadow-lg hover:scale-105 transition-transform duration-300 group">
          <span className="font-bold text-lg">Inheritance</span>
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all" />
        </div>
      </div>
    );
}