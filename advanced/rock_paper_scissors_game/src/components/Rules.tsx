import { useState } from "react";

const Rules = (): JSX.Element => {
  const [showRules, setShowRules] = useState<boolean>(false);

  return (
    <>
      <section
        className={`rules-explain container px-4 pt-20 flex flex-col gap-5 
        fixed top-0 left-0 z-[1000] h-[100%] w-[100%] bg-white 
        transition-all duration-[400ms]
        sm:left-[50%] sm:top-[50%] 
        ${
          showRules
            ? "translate-y-[0%] sm:translate-x-[-50%] sm:translate-y-[-50%] large-shadow"
            : "translate-y-[-100%] sm:translate-x-[-100%] sm:left-[0%] sm:translate-y-[-50%]"
        }`}
        onClick={() => setShowRules(!showRules)}
      >
        <header className="rules-header flex items-center justify-center sm:justify-between">
          <h1 className="title uppercase text-dark text-3xl text-center font-bold mb-12 sm:mb-0">
            rules
          </h1>
          <img
            src="images/icon-close.svg"
            alt="Close Icon"
            className="hidden sm:block cursor-pointer"
            onClick={() => setShowRules(!showRules)}
          />
        </header>
        <img
          src="images/image-rules-bonus.svg"
          alt="Rules"
          className="mx-auto"
        />
      </section>
      <div className="rules-btn container w-full flex justify-center sm:justify-end">
        <button
          className="btn bg-transparent border border-white border-solid uppercase text-white 
          text-lg rounded-lg px-9 py-[6px] cursor-pointer tracking-widest"
          onClick={() => setShowRules(!showRules)}
        >
          rules
        </button>
      </div>
    </>
  );
};

export default Rules;
