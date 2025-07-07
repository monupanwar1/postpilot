import { Download, Edit3, Sparkles } from 'lucide-react';

export default function Features() {
  return (
    <section className="container flex flex-row md:flex-wrap-reverse items-center justify-center flex-wrap gap-4 sm:gap-6 mb-12 w-full">
      <div className="flex items-center gap-2 bg-background/70 backdrop-blur-sm border rounded-full px-5 py-2 shadow-sm">
        <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <Edit3 className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold">AI-Assisted Editing</span>
      </div>
      <div className="flex items-center gap-2 bg-background/70 backdrop-blur-sm border rounded-full px-5 py-2 shadow-sm">
        <div className="p-1 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white">
          <Download className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold">1-Click Export</span>
      </div>
      <div className="flex items-center gap-2 bg-background/70 backdrop-blur-sm border rounded-full px-5 py-2 shadow-sm">
        <div className="p-1 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold">Ultra-Crisp Design</span>
      </div>
    </section>
  );
}
