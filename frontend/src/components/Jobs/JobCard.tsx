import { Job } from "@/data/jobsData"
import { MapPin } from "lucide-react"

interface Props {
  job: Job
}

export default function JobCard({ job }: Props) {
  return (
    <div className="mt-4 flex h-full w-full flex-col gap-3 rounded-xl border
     border-slate-300 bg-slate-100 p-3 shadow-lg sm:p-4 sm:text-sm
      transition transform hover:scale-105 duration-300">
      {/* Top: logo, company, role, location (top right) */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
         bg-blue-600 text-lg font-bold text-white">
          {job.company[0]}
        </div>

        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold leading-6">{job.company}</h2>
            <p className="truncate text-sm font-medium text-slate-700">{job.role}</p>
          </div>
          <p className="flex shrink-0 text-center items-center gap-1 pt-1 text-sm font-medium
           text-slate-700 bg-stone-200 border border-slate-300 rounded-lg px-2 py-0.5">
       <MapPin className="h-4 w-4 text-blue-700" />
       {job.location}      
       </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <span className="text-md tracking-wide font-semibold text-slate-900">Skills:</span>
        {job.requiredSkills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-slate-300 bg-slate-50
             px-3 py-0.5 text-sm font-medium text-slate-700">
            {skill}
          </span>
        ))}
      </div>

      {/* CGPA */}
      <p className="">
        <span className="font-semibold text-slate-900 text-md">Min CGPA:</span>{" "}
        <span className="text-slate-600 text-md font-medium">{job.minCgpa}</span>
      </p>

      {/* Bottom: CTC and Apply */}
      <div className="mt-1 -mb-5 flex items-center justify-between gap-3
         border-t border-slate-300 pt-3">
        <p className="text-base font-semibold text-emerald-700 
        bg-green-200 rounded-lg p-1">
            <span className="text-slate-700"></span> ₹{job.ctcLpa} LPA</p>
       
        <button className="rounded-md bg-blue-700 px-3 py-1.5 text-sm
         font-medium text-white hover:bg-blue-800 tracking-wide">
          Apply Now
        </button>
      
      </div>
    </div>
  )
}