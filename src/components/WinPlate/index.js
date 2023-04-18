import Button from "../Button";
import "./style.css";

const WinPlate = ({ winner, type, action }) => {
  const playerText = winner ? "PLAYER 1" : type === "vsCPU" ? "CPU" : "PLAYER 2";

  return (
    <div className="win-plate">
      <div className="player_name">{playerText}</div>
      <div className="win_text">WINS</div>

      <Button type={"win"} text={"play again"} action={action} />
    </div>
  );
};

export default WinPlate;
