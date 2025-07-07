import { Github, Magnet, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <section className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-300 flex items-center rounded-md justify-center">
            <Magnet className="h-4 w-4 text-neutral-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            PostPilot
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/#" target="_blank">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Github className="h-4 w-4 mr-2" />
              <Star className="h-3 w-3 mr-1" />
              Star on GitHub
            </Button>
          </Link>
        </div>
      </section>
    </header>
  );
}
