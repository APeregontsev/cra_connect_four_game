import "./style.css";
import player_1 from "./../../images/player-one.svg";
import player_2 from "./../../images/player-two.svg";
import cpu from "./../../images/cpu.svg";

const PlayerInfo = ({ type, score }) => {
  const playerImg = type === "p1" ? player_1 : type === "vsPlayer" ? player_2 : cpu;
  const playerAlt = type === "p1" ? "player_1" : type === "vsPlayer" ? "player_2" : "cpu";
  const playerName = type === "p1" ? "PLAYER 1" : type === "vsPlayer" ? "PLAYER 2" : "CPU";

  return (
    <div className="player-wrapper">
      <div className="player-card">
        <div className="player-ico">
          <img src={playerImg} alt={playerAlt} />
        </div>
        <div className="player-name">{playerName}</div>
        <div className="player-score">{score}</div>
      </div>
    </div>
  );
};

export default PlayerInfo;
