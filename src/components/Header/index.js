import Button from "../Button";
import Logo from "../Logo";
import "./style.css";

const HeaderBlock = ({ openMenuAction, restart }) => {
  return (
    <div className="game-header">
      <Button type={"ingame"} text={"menu"} action={openMenuAction} />
      <Logo type={"ingame"} />
      <Button type={"ingame"} text={"restart"} action={restart} />
    </div>
  );
};

export default HeaderBlock;
