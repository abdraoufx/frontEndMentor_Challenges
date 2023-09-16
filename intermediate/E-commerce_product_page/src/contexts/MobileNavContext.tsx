import { createContext, useState } from "react";
import { mobileNavContextTypes } from "../types/mobileNavContextTypes";
import { contextProviderProps } from "./CartContext";

const contextDefaultValues: mobileNavContextTypes = {
  isMobileNavShowed: false,
  setIsMobileNavShowed: () => {},
};

export const MobileNavContextAPI =
  createContext<mobileNavContextTypes>(contextDefaultValues);

const MobileNavContext = ({ children }: contextProviderProps) => {
  const [isMobileNavShowed, setIsMobileNavShowed] = useState(false);

  return (
    <MobileNavContextAPI.Provider
      value={{
        isMobileNavShowed,
        setIsMobileNavShowed,
      }}
    >
      {children}
    </MobileNavContextAPI.Provider>
  );
};

export default MobileNavContext;
