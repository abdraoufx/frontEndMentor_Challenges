import React, { useEffect, useState } from "react";

type Props = {
  waitForHouse: boolean;
  userWins: boolean;
};

const Header = ({ waitForHouse, userWins }: Props): JSX.Element => {
  const [score, setScore] = useState<number>(0);

  const changeScore = (): void => {
    if (!waitForHouse && userWins) setScore(score + 1);
    if (!waitForHouse && !userWins) {
      if (score !== 0) setScore(score - 1);
    }
  };

  useEffect(() => {
    changeScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWins, waitForHouse]);

  return (
    <header className="main-page__header px-5 w-full mb-4 max-w-[600px]">
      <div className="container outline outline-header-outline rounded px-4 py-4 flex justify-between items-center">
        <img
          src="images/logo-bonus.svg"
          alt="Logo"
          className="h-[70px] sm:h-[100px]"
        />
        <div className="score bg-white rounded flex flex-col items-center px-6 py-2">
          <span className="txt uppercase text-score tracking-[0.4px]">
            score
          </span>
          <span className="number text-dark text-5xl font-bold">{score}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
