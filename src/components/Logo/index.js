import classNames from "classnames";
import logo from "./../../images/logo.svg";
import "./style.css";

const Logo = ({ type }) => {
  return (
    <div className={classNames("menu-card-logo", { ingame: type === "ingame" })}>
      <img src={logo} alt="game logo" />
    </div>
  );
};

export default Logo;
