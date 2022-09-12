import { JobObject } from "../App";

interface Props {
  job: JobObject;
  handleTagClick: (tag: string) => void;
}

const ShowJobOffers = ({
  job: {
    company,
    logo,
    isNew,
    featured,
    position,
    postedAt,
    role,
    level,
    languages,
    location,
    tools,
    contract,
  },
  handleTagClick,
}: Props) => {
  const tags: string[] = [role, level];

  if (languages) tags.push(...languages);
  if (tools) tags.push(...tools);

  const renderTags = (arrOfTags: string[]): JSX.Element[] => {
    return arrOfTags.map((tag: string, idx: number) => {
      return (
        <span
          key={idx}
          className="tag cursor-pointer bg-main-bg text-drkCyan p-2 font-bold text-sm rounded"
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </span>
      );
    });
  };

  return (
    <div
      className={`job-offers__job-offer bg-white p-5 rounded m-15 flex justify-between items-center w-full sm:w-[80%] flex-wrap gap-2 ${
        featured && "border-l-[5.2px] sm:border-l-[4.5px] border-drkCyan"
      }`}
    >
      <div className="company-details flex gap-4 mb-5 flex-col sm:flex-row border-b-drkGrCyan/30 border-b-[1px] sm:border-b-0 w-full sm:w-fit">
        <div className="logo-wrapper">
          <img
            src={logo}
            alt={company}
            className="logo-wrapper__logo -mt-10 sm:m-0 h-[2.9rem] sm:h-[5rem]"
          />
        </div>
        <div className="job-info flex flex-col justify-between">
          <div className="job-info__name mb-1 flex flex-wrap gap-2 items-center">
            <span className="company-name text-drkCyan font-bold text-base flex-wrap mb-2">
              {company}
            </span>
            {isNew && (
              <span className="job-info__new bg-drkCyan text-white font-bold uppercase text-[11px] rounded-full px-2 py-1">
                new!
              </span>
            )}
            {featured && (
              <span className="job-info__featured bg-vrGrCyan text-white font-bold uppercase text-[11px] rounded-full px-2 py-1">
                featured
              </span>
            )}
          </div>
          <span className="job-info__position text-vrGrCyan font-bold text-[1.2rem] mb-1">
            {position}
          </span>
          <p className="job-info__offer-info text-drkGrCyan/70 flex justify-between mb-4 sm:mb-0">
            <span>{postedAt}</span> · <span>{contract}</span> ·{" "}
            <span>{location}</span>
          </p>
        </div>
      </div>
      <div className="tags flex flex-wrap gap-4">{renderTags(tags)}</div>
    </div>
  );
};

export default ShowJobOffers;
