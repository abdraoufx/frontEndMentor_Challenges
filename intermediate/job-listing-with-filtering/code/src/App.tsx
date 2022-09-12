import { useEffect, useState } from "react";
import { fetchJobs } from "./services/fetchJobs";
import ShowJobOffers from "./components/ShowJobOffers";
import FilterByTags from "./components/FilterByTags";
import "./sass/main.scss";

/* TODO: 
  1 => Add Filter And Filter The Jobs DONE:
  2 => Add Some Shadow To Te Boxes DONE:
  3 => Do The Responsive. DONE:
*/

export interface JobObject {
  id: number;
  company: string;
  logo: string;
  isNew: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

const App = (): JSX.Element => {
  const [jobs, setJobs] = useState<JobObject[]>();
  const [filters, setFilters] = useState<string[] | []>([]);

  useEffect(() => {
    fetchJobs()
      .then((fetchedJobs) => setJobs(fetchedJobs))
      .catch((err) => new Error(err));
  }, []);

  const handleTagClick = (tag: string) => {
    // Do Not Use Array.prototype.includes(value) Because of TypeScript Error Or Edit it On The Config File
    for (let i = 0; i < filters.length; i++) {
      if (filters[i] === tag) return;
    }

    setFilters([...filters, tag]);
  };

  const filteredJobs: JobObject[] | undefined = jobs?.filter(
    ({ role, level, languages, tools }) => {
      if (!filters.length) return true;

      const tags: string[] = [role, level];

      if (languages) tags.push(...languages);
      if (tools) tags.push(...tools);

      return filters.every((filter) => tags.includes(filter));
    }
  );

  return (
    <main className="main-page bg-main-bg pb-6">
      <header className="main-page__header main-header bg-drkCyan">
        <img
          src={"/images/bg-header-desktop.svg"}
          alt="Header Desktop Version"
          className="main-header__desktop-img"
        />
      </header>
      {jobs?.length ? (
        <div className="header__container p-3 flex justify-between">
          <FilterByTags settingFilters={{ filters, setFilters }} />
        </div>
      ) : (
        ""
      )}
      <section className="job-offers">
        <div className="flex flex-col gap-8 sm:gap-5 items-center p-3">
          {jobs?.length
            ? filteredJobs?.map((job) => (
                <ShowJobOffers
                  job={job}
                  key={job.id}
                  handleTagClick={handleTagClick}
                />
              ))
            : ""}
        </div>
      </section>
    </main>
  );
};

export default App;
