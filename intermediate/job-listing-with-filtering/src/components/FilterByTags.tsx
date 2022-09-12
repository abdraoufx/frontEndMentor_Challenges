interface Props {
  settingFilters: {
    filters: string[];
    setFilters: (filters: string[] | []) => void;
  };
}

const FilterByTags = ({ settingFilters: { filters, setFilters } }: Props) => {
  const removeFilter = (currentFilter: string) => {
    setFilters(filters.filter((f) => f !== currentFilter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const renderFilters = () => {
    return filters.map((filter: string, idx: number) => {
      return (
        <div
          className="filterTag-wrapper cursor-pointer flex"
          key={idx}
          onClick={() => removeFilter(filter)}
        >
          <span className="filterTag-wrapper__filterTag bg-main-bg text-drkCyan px-3 py-1 font-bold text-[15px] rounded rounded-r-none">
            {filter}
          </span>
          <div className="filterTag-wrapper__delTag-wrapper flex items-center bg-drkCyan py-1 px-2 hover:bg-vrGrCyan rounded rounded-l-none transition delay-100 ease-in">
            <img src="./images/icon-remove.svg" alt="Remove Icon" />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {filters.length ? (
        <div className="filterTag m-15 bg-white flex justify-between items-center gap-8 px-6 py-4 w-full sm:w-[80%] my-0 mx-auto mb-4 sm:mb-0">
          <div className="allTags flex gap-3 flex-wrap">{renderFilters()}</div>
          <span
            className="clearTags capitalize cursor-pointer text-drkCyan relative before:bg-drkCyan hover:before:w-[95%]"
            onClick={clearFilters}
          >
            clear
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FilterByTags;
