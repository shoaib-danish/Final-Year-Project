import Image from "next/image";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Playfair, Unbounded, Inter } from "next/font/google";
import { Search } from "lucide-react";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600"],
  style: ['normal'],
  display: "swap",
});
const body = Unbounded({
  subsets: ["latin"],
  weight: ["300"],
//   style: ["italic"],
  display: "swap",
});

const sel = "hover:bg-blue-600";

export default function Jobs() {
  return (
    <>
    <div className="relative -mx-4 aspect-[1765/208] overflow-hidden 
    sm:-mx-6 -mt-6">
      <Image
        src="/images/job-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-y-0 left-10 flex flex-col
       justify-center px-4 md:-mt-4 sm:px-8 sm:-mt-9">
        <h1 className={`${display.className} whitespace-nowrap text-base font-bold 
        leading-tight text-white sm:text-3xl lg:text-5xl`}>
          Find Your <span className="text-blue-400 ">Dream Job</span>
        </h1>
        <div className="ml-2">
       <p className={`${body.className} leading-tight tracking-wide text-white
  mt-1 text-xs sm:text-md lg:mt-2 lg:text-sm lg:tracking-wide`}>
  Where Potential Meets Opportunity
</p>
        </div>  
      </div>
    </div>

    {/* INPUT FIELDS */}
        <div className="mt-6 grid font-medium w-full grid-cols-1 gap-2 rounded-xl border border-gray-300
         bg-slate-100 p-3 shadow-md sm:grid-cols-4 lg:grid-cols-7">

  {/* Search input */}
  <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 
  px-3 sm:col-span-2 lg:col-span-2">
    <Search className="h-4 w-4 shrink-0 text-gray-500" />
    <input
      type="text"
      placeholder="Search jobs by role, company..."
      className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
    />
  </div>

  {/* Company */}
  <select className="h-10 min-w-0 rounded-lg border border-gray-300 bg-slate-100
   px-2 text-sm text-gray-600 outline-none focus:border-blue-500">
    <option>All Companies</option>
  </select>

  {/* Location */}
  <select className="h-10 min-w-0 rounded-lg border border-gray-300 bg-slate-100 px-2 text-sm text-gray-600 outline-none focus:border-blue-500">
    <option>All Locations</option>
  </select>

  {/* Salary */}
 <select className="h-10 min-w-0 rounded-lg border border-gray-300 bg-slate-100
  px-2 text-sm text-gray-700 outline-none transition focus:border-blue-500
   focus:ring-blue-100">
  <option >Min Salary</option>
  <option>3+ LPA</option>
  <option>6+ LPA</option>
  <option>10+ LPA</option>
</select>

  {/* Skills */}
  <select className="h-10 min-w-0 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-600 outline-none focus:border-blue-500">
    <option>Skills (e.g. React)</option>
  </select>

  {/* Search button */}
  <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 
  px-3 text-sm font-semibold text-white transition hover:bg-blue-800">
    <Search className="h-4 w-4" />
    Search
  </button>

</div>
    </>
    
  );
}