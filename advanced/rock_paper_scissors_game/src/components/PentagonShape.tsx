import { useEffect } from "react";
import { Dispatch } from "react";
import { Choice } from "../App";

/* 
  === Some Notes To Make The Logic: ====================
    - Scissors Beats Paper, Lizard:  ✂️ = BEATS > 📃, 🦎 DONE:
    - Paper Beats Rock, Spock: 📃 = BEATS > ✊, 🖖  DONE:
    - Rock Beats Lizard, Scissors: ✊ = BEATS > 🦎, ✂️, DONE:
    - Lizard Beats Spock, Paper: 🦎 = BEATS > 🖖, 📃 DONE:
    - Spock Beats Scissors, Rock, 🖖 = BEATS > ✂️, ✊ DONE:
  =====================vvvvv=============================
*/

export enum allChoices {
  SCISSORS = "scissors",
  PAPER = "paper",
  SPOCK = "spock",
  LIZARD = "lizard",
  ROCK = "rock",
}

interface Props {
  setChoice: Dispatch<Choice>;
  setUserChoosedChoice: Dispatch<boolean>;

  setUserWins: Dispatch<boolean>;

  setWaitForHouse: Dispatch<boolean>;
}

const Pentagon = ({
  setChoice,
  setUserChoosedChoice,
  setUserWins,
  setWaitForHouse,
}: Props) => {
  const { SCISSORS, PAPER, SPOCK, LIZARD, ROCK } = allChoices;

  const userChoices: string[] = [SCISSORS, PAPER, SPOCK, LIZARD, ROCK];

  const pickRandomChoice = (clickedChoice: string) => {
    const unClickedChoice: string[] = userChoices.filter(
      (choice) => choice !== clickedChoice
    );
    const randomChoice: string =
      unClickedChoice[Math.floor(Math.random() * unClickedChoice.length)];

    setChoice({ userChoice: clickedChoice, theHouseChoice: randomChoice });
    setUserChoosedChoice(true);
    makeUserWinOrLose(clickedChoice, randomChoice);
  };

  const renderChoices = (arrOfChoices: string[]): JSX.Element[] => {
    return arrOfChoices.map((choice) => {
      return (
        <div
          key={choice}
          className={`pentagon__${choice} icon-container icon-container__${choice} absolute ${
            choice === "scissors" && "translate-x-[-50%]"
          }`}
          onClick={() => pickRandomChoice(choice)}
        >
          <div className="img-wrapper">
            <img src={`images/icon-${choice}.svg`} alt={`${choice} Icon`} />
          </div>
        </div>
      );
    });
  };

  const makeUserWinOrLose = (userChoice: string, theHouseChoice: string) => {
    switch (userChoice) {
      case SCISSORS:
        switch (theHouseChoice) {
          case PAPER:
          case LIZARD:
            setUserWins(true);
            break;
          default:
            setUserWins(false);
        }
        break;
      case PAPER:
        switch (theHouseChoice) {
          case ROCK:
          case SPOCK:
            setUserWins(true);
            break;
          default:
            setUserWins(false);
        }
        break;
      case ROCK:
        switch (theHouseChoice) {
          case LIZARD:
          case SCISSORS:
            setUserWins(true);
            break;
          default:
            setUserWins(false);
        }
        break;
      case LIZARD:
        switch (theHouseChoice) {
          case SPOCK:
          case PAPER:
            setUserWins(true);
            break;
          default:
            setUserWins(false);
        }
        break;
      case SPOCK:
        switch (theHouseChoice) {
          case SCISSORS:
          case ROCK:
            setUserWins(true);
            break;
          default:
            setUserWins(false);
        }
        break;
      default:
        setUserWins(false);
    }
  };

  useEffect(() => {
    setWaitForHouse(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="pentagon container px-7 mx-auto flex flex-col justify-center gap-20 relative w-fit">
        {renderChoices(userChoices)}
        <img
          src="images/bg-pentagon.svg"
          alt="Pentagon"
          className="w-[285px]"
        />
      </section>
    </>
  );
};

export default Pentagon;
