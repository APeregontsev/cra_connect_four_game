import "./style.css";
import classNames from "classnames";

const Button = ({ type, text, action }) => {
  const buttonStyle = classNames(
    "btn",
    { vs_player: type === "vsp" },
    { vs_cpu: type === "vsc" },
    { game_rules: type === "rules" },
    { continue: type === "continue" },
    { quit: type === "quit" },
    { checkmark: type === "checkmark" },
    { ingame_menu: type === "ingame" },
    { "ingame_menu win": type === "win" }
  );

  return (
    <button className={buttonStyle} onClick={action}>
      <span>{text.toUpperCase()}</span>
      <div className="img"></div>
    </button>
  );
};

export default Button;
