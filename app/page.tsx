import CardPreview from '@/components/CardPreview';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';





export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full items-center gap-4 ">
     <HeroSection/>
     <Features/>
    <CardPreview/>
    <Footer/>
    </main>
  );
}
