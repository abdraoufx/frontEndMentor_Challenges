interface Props {
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

const LoadingScreen = ({ returnBasedOnTheme }: Props): JSX.Element => {
  return (
    <div
      className={`loading-screen min-h-screen flex items-center justify-center ${returnBasedOnTheme(
        "bg-dT-vryDarkBlue",
        "bg-lT-lightGray"
      )}`}
    >
      <div
        className={`preloader animate-spin rounded-full h-28 w-28 border-[10px] ${returnBasedOnTheme(
          "border-white border-t-dT-darkBlue",
          "border-dT-darkBlue border-t-white"
        )}`}
      ></div>
    </div>
  );
};

export default LoadingScreen;
