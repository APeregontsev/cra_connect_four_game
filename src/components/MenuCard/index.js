import classNames from "classnames";

import "./style.css";
import Logo from "../Logo";

const MenuCard = ({ children, type }) => {
  const cardStyle = classNames(
    "menu-card",
    { "main-menu": type === "main" },
    { rules: type === "rules" }
  );

  const titleStyle = classNames(
    { "menu-card-pause": type === "ingame" },
    { "menu-card-rules": type === "rules" }
  );

  const logoIsDisplayed = type === "main";
  const showTitleText = type === "ingame" ? "PAUSE" : type === "rules" ? "RULES" : null;

  return (
    <div className={cardStyle}>
      {logoIsDisplayed && <Logo type={type} />}

      {showTitleText && <div className={titleStyle}>{showTitleText}</div>}

      {children}
    </div>
  );
};

export default MenuCard;
