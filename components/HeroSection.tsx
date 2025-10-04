import Link from 'next/link';
import { Badge } from './ui/badge';

export default function HeroSection() {
  return (
    <section className="container p-10 mx-auto max-w-4xl text-center">
      <Badge variant="secondary" className="mb-4">
        🤖 Powered by AI · Built for Creators
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
        AI-Generated
        <br />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Social Media Perfection
        </span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
        🚀 Boost your brand with AI-crafted profile that look native to
        LinkedIn, X (Twitter), Instagram, Facebook, and TikTok. Fully
        customizable, high-converting visuals — no design skills needed.
      </p>
      
    </section>
  );
}
