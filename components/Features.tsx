import { Download, Edit3, Sparkles } from 'lucide-react';

export default function Features() {
  return (
    <section className="container flex flex-row md:flex-wrap-reverse items-center justify-center flex-wrap gap-4 sm:gap-6 mb-12 w-full">
      {/* Feature 1 */}
      <div className="flex items-center gap-3 bg-background/70 backdrop-blur-sm border rounded-full px-6 py-3 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center">
          <Edit3 className="h-5 w-5" />
        </div>
        <span className="text-sm sm:text-base font-semibold">
          Smart AI Editing ✨
        </span>
      </div>

      {/* Feature 2 */}
      <div className="flex items-center gap-3 bg-background/70 backdrop-blur-sm border rounded-full px-6 py-3 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="p-2 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white flex items-center justify-center">
          <Download className="h-5 w-5" />
        </div>
        <span className="text-sm sm:text-base font-semibold">
          Export in 1-Click 🚀
        </span>
      </div>

      {/* Feature 3 */}
      <div className="flex items-center gap-3 bg-background/70 backdrop-blur-sm border rounded-full px-6 py-3 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-sm sm:text-base font-semibold">
          Ultra-Crisp, Vibrant Design 🎨
        </span>
      </div>
    </section>
  );
}
