import { Magnet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 border-2 w-full border-gray-300">
      <section className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md flex items-center justify-center">
              <Magnet className="h-3 w-3 text-neutral-900" />
            </div>
            <span className="font-medium">PostPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PostPilot. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
