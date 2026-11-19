import Image from 'next/image';
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});



export default function Hero() {
  return (
    <section className={`${font.className} mt-3 relative isolate h-[70svh] overflow-hidden`}>
  {/* Background image */}
  <div className="absolute inset-0">
    <Image
      src="/images/hero.jpg"
      alt="Campus placement and recruitment"
      fill
      priority
      sizes="100vw"
      className="object-cover object-[center_85%] max-sm:object-[85%]"
    />
  </div>
    
 <div className="absolute inset-0 bg-gradient-to-r from-[#14123A]
  via-[#14123A]/60 to-transparent to-80%" />

      {/* Hero Content */}
{/* Hero Content */}
<div className="relative mt-4 z-10 w-full px-4 pt-10 pb-10 sm:px-8 lg:px-12">
  <div className="max-w-4xl space-y-4 text-left">
    <h1
      className="text-3xl font-extrabold text-white
        min-[375px]:text-4xl font-serif
        sm:text-7xl
        lg:text-8xl"
    >
     Your <span className='text-indigo-400'>Dream</span> Job <br /> Starts on <span className='text-indigo-400'>Campus</span>
    </h1>
 <br />
        </div>
        <p className="mt-2 tracking-wider text-base font-serif leading-relaxed
         text-white/90 sm:text-xl md:w-max md:text-lg xl:text-2xl">
  <span className="md:block md:whitespace-nowrap">
    Connecting Students to Career Opportunities
  </span>
  <span className="md:block md:whitespace-nowrap">
    From Applications to final Placements-All in One Place.
  </span>
</p>
      </div>
    </section>
  );
}