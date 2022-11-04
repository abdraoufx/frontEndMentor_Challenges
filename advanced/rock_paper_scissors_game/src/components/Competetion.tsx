import { Dispatch, useEffect } from "react";

type Props = {
  choice: {
    userChoice: string;
    theHouseChoice: string;
  };
  setUserChoosedChoice: Dispatch<boolean>;

  userWins: boolean;

  waitForHouse: boolean;
  setWaitForHouse: Dispatch<boolean>;
};

const Competetion = ({
  choice: { userChoice, theHouseChoice },
  setUserChoosedChoice,
  userWins,
  waitForHouse,
  setWaitForHouse,
}: Props): JSX.Element => {
  const resetGame = () => {
    setUserChoosedChoice(false);
  };

  const editHouseStatus = (bool: boolean) => {
    setTimeout(() => {
      setWaitForHouse(bool);
    }, 1000);
  };

  useEffect(() => {
    editHouseStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="game container px-6 flex items-center justify-between flex-wrap max-w-[550px]">
      <div className="user-choice flex flex-col sm:flex-col-reverse items-center gap-4 relative">
        <div
          className={`choice choice__${userChoice} transition-shadow duration-[400ms] ${
            !waitForHouse && "picked-choice"
          }`}
        >
          <div className="img-wrapper">
            <img
              src={`images/icon-${userChoice}.svg`}
              alt={`${userChoice} icon`}
            />
          </div>
        </div>
        <span className="text text-white uppercase tracking-wide sm:text-lg relative">
          you picked
        </span>
      </div>
      <div className="house-choice flex flex-col sm:flex-col-reverse items-center gap-4">
        <div
          className={`choice choice__${theHouseChoice} transition-opacity duration-300 ${
            !waitForHouse ? "opacity-1" : "opacity-50"
          }`}
        >
          {!waitForHouse && (
            <div className="img-wrapper">
              <img
                src={`images/icon-${theHouseChoice}.svg`}
                alt={`${theHouseChoice} icon`}
              />
            </div>
          )}
        </div>
        <span className="text text-white uppercase tracking-wide sm:text-lg">
          the house picked
        </span>
      </div>
      <div
        className={`win-or-lose flex flex-col gap-4 w-full items-center pt-6 transition-all duration-300 ${
          waitForHouse
            ? "opacity-0 pointer-events-none"
            : "opacity-1 pointer-events-auto"
        }`}
      >
        <div className="winning-status uppercase text-white text-5xl font-bold relative">
          {userWins ? "you win" : "you lose"}
        </div>
        <button
          className="play-again uppercase text-dark bg-white rounded px-12 py-2 tracking-widest"
          onClick={resetGame}
        >
          play again
        </button>
      </div>
    </section>
  );
};

export default Competetion;
