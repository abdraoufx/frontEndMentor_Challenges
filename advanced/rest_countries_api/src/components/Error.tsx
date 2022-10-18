import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface Props {
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

const Error = ({ returnBasedOnTheme }: Props): JSX.Element => {
  return (
    <div
      className={`error-page flex items-center justify-center flex-col font-semibold min-h-[100vh] text-xl ${returnBasedOnTheme(
        "bg-dT-vryDarkBlue text-white",
        "bg-lT-lightGray text-darkBlue"
      )}`}
    >
      Something Went Wrong ...
      <div className="go-back flex gap-3">
        Please Go Back
        <Link to="/">
          <button className="go-back__btn">
            <FontAwesomeIcon
              icon={faArrowLeft}
              color={`${returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}`}
              fontSize="14px"
              className="trns"
              size="sm"
            />
          </button>
        </Link>
      </div>
      <div className="refresh-page flex gap-3">
        Or Refresh The Page
        <button
          className="refresh-page__btn"
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon
            icon={solid("rotate-right")}
            color={returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}
            className="trns"
            size="sm"
          />
        </button>
      </div>
    </div>
  );
};

export default Error;
