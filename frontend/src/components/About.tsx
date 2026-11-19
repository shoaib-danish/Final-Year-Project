import { Briefcase, Building2, GraduationCap, Mail, MapPin, Check } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "For Students",
    top: "border-t-indigo-700",
    tint: "bg-indigo-50 text-indigo-600",
    points: ["Build your profile", "Find verified campus openings", "Track applications in one place"],
  },
  {
    icon: Briefcase,
    title: "For Recruiters",
    top: "border-t-teal-600",
    tint: "bg-teal-50 text-teal-600",
    points: ["Post requirements", "Filter candidates by GPA/skills", "Run interviews and send offers"],
  },
  {
    icon: Building2,
    title: "For Placement Cells",
    top: "border-t-violet-600",
    tint: "bg-violet-50 text-violet-600",
    points: ["Screen eligibility automatically", "See how batch is performing", "Coordinate drives"],
  },
  
];

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Login", href: "/login" },
  { label: "Sign up", href: "/signup" },
];

export default function About() {
  return (
    <>
      <section
        id="about"
        className="scroll bg-slate-50 py-16 sm:py-24"
      >
     <div className="mx-auto -mt-12 max-w-4xl text-center">
  <div className="mx-auto mb-5 h-1 w-80 rounded-full bg-indigo-600" />

  <h2 className="text-balance font-serif text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
    <span className="text-indigo-700">One Platform</span> for Students,
    <br className="hidden sm:block" /> Placement teams, and Recruiters
  </h2>
</div>

          {/* {CARD SECTION} */}
<div className="mx-auto p-4 mt-10 grid max-w-4xl gap-6 md:max-w-6xl
 md:grid-cols-3 lg:gap-8 xl:max-w-7xl 2xl:max-w-[1400px]">
  {cards.map(({ icon: Icon, title, top, tint, points }) => (
    <article
      key={title}
      className={`rounded-3xl border border-t-4 border-slate-300 ${top} bg-slate-100 p-5
       shadow-lg shadow-indigo-700/20 transition duration-300
        hover:-translate-y-1 hover:shadow-2xl sm:p-6`}
    >
      <div className="flex items-center">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}>
          <Icon className="h-8 w-6" strokeWidth={1.80} aria-hidden="true" />
        </div>
        <h3 className="font-semibold md:text-base 
        lg:text-lg xl:text-lg px-3 py-1
         bg-slate-200  rounded-xl shadow-sm">
          {title}
        </h3>
      </div>

      <ul className="mt-2 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm
           text-slate-800 lg:text-base font-medium">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tint}`}>
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </article>
  ))}
</div>
      </section>

<footer id="contact" className="bg-slate-900 px-4 text-sm text-slate-300 
    sm:px-6 py-1 xl:text-base">
 <div className="mx-auto flex max-w-6xl flex-wrap justify-center 
 gap-x-12 gap-y-8 text-center md:gap-x-16 lg:gap-x-24 mt-2">

    <div className="sm:col-span-2 md:col-span-1">
      <h3 className="text-xl font-bold text-white xl:text-xl 
      tracking-wider">CampusPlace</h3>
      <p className="mt-2 max-w-xs leading-relaxed">
        Making campus placements simple, organized, and stress-free.
      </p>
    </div>
    <div>
      <h3 className="font-semibold text-white xl:text-xl tracking-wide">Contact</h3>
      <div className="mt-3 space-y-2">
        <a
          href="mailto:placement@yourcollege.edu"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="break-all">placement@yourcollege.edu</span>
        </a>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Kolkata, West Bengal</span>
        </p>
      </div>
    </div>
  </div>

  <p className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-4
   text-center text-md xl:text-lg">
    &copy; {new Date().getFullYear()} CampusPlace. All rights reserved.
  </p>
</footer>


         
    </>
  );
}