import { JobObject } from "../App";

export const fetchJobs = async (): Promise<JobObject[]> => {
  const JOBS_URL = "data/data.json";

  return await fetch(JOBS_URL).then((resp) => resp.json());
};
