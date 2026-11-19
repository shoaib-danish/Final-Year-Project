import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <Hero />
        <About />


        </main>
       
    </div>
  );
}
