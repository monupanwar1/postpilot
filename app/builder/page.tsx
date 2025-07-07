import Footer from '@/components/Footer';
import TabsSection from '@/components/TabsSection';
import { Badge } from '@/components/ui/badge';

export default function page() {
  return (
    <main className="mt-10 min-h-screen flex items-center justify-center flex-col space-y-8 ">
      <section className="container mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-4">
          🤖 Powered by AI · Built for Creators
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          AI-Generated
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Start Gerenrating now
          </span>
        </h1>
      </section>
      <TabsSection/>
      <Footer/>
    </main>
  );
}
