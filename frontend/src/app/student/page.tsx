import JobsHeader from "@/components/Jobs/JobsHeader";
import JobCard from "@/components/Jobs/JobCard";
import { jobs } from "@/data/jobsData";

export default function StudentPage() {
  return (
    <div className="w-full min-w-0 p-4 sm:p-6">
      <JobsHeader />

     <div className="mx-auto grid w-full max-w-7xl grid-cols-1
      gap-x-8 gap-y-6 px-4 md:grid-cols-2 xl:grid-cols-3">
  {jobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))}
</div>
    </div>
  );
}