import { useState } from "react";
import Competetion from "./components/Competetion";
import Header from "./components/Header";
import PentagonShape from "./components/PentagonShape";
import Rules from "./components/Rules";

/* 
  1 => Decide Give The Position Relative To The Container Of The Image Or The Image It Self 
    ====> And Get The Images With FlexBox Or Position Absolute. DONE:
  2 => Figure Out The Condition Based On The Rules Provided On The Desgin DONE:
  3 => Edit Score Based On The Status WIN/LOSE DONE: 
  4 => On Click On One Of The Buttons Do Other Design DONE:, DO Some Animation DONE:
  5 => Do The Step Two When The House (pc) Is Choosing Wait Some Time Then Show It DONE:
    FIXME: => Stay The Score Need TO Figure Out To Show The Old Score And When Status Appear Increase One DONE:
  6 => Make App Full Responsive DONE:.
*/

export interface Choice {
  userChoice: string;
  theHouseChoice: string;
}

const App = (): JSX.Element => {
  const [choice, setChoice] = useState<Choice>({
    userChoice: "",
    theHouseChoice: "",
  });

  const [userChoosedChoice, setUserChoosedChoice] = useState<boolean>(false);
  const [userWins, setUserWins] = useState<boolean>(false);

  const [waitForHouse, setWaitForHouse] = useState<boolean>(true);

  return (
    <main className="main-page radial-grd py-8 flex flex-col items-center justify-between">
      <Header waitForHouse={waitForHouse} userWins={userWins} />
      {userChoosedChoice ? (
        <Competetion
          choice={choice}
          setUserChoosedChoice={setUserChoosedChoice}
          userWins={userWins}
          waitForHouse={waitForHouse}
          setWaitForHouse={setWaitForHouse}
        />
      ) : (
        <PentagonShape
          setChoice={setChoice}
          setUserChoosedChoice={setUserChoosedChoice}
          setUserWins={setUserWins}
          setWaitForHouse={setWaitForHouse}
        />
      )}
      <Rules />
    </main>
  );
};

export default App;
