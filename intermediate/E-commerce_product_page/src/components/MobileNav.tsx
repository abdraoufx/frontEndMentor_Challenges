import { useContext } from "react";
import { MobileNavContextAPI } from "../contexts/MobileNavContext";

const MobileNav = () => {
  const { isMobileNavShowed, setIsMobileNavShowed } =
    useContext(MobileNavContextAPI);

  return (
    <>
      <nav className={`mobile-nav${isMobileNavShowed ? " showed" : ""}`}>
        <img
          src="/images/icons/icon-close.svg"
          alt="Close icon"
          className="mobile-nav__close-icon"
          onClick={() => setIsMobileNavShowed(false)}
        />
        <ul className="mobile-nav__list fx-col">
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div
        className={`mobile-nav-overlay ${isMobileNavShowed ? "showed" : ""}`}
        onClick={() => setIsMobileNavShowed(false)}
      ></div>
    </>
  );
};

export default MobileNav;
