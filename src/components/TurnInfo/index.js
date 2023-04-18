import "./style.css";

import redImg from "./../../images/turn-background-red.svg";
import yellowImg from "./../../images/turn-background-yellow.svg";

const TurnInfo = ({ turn, time, gameType }) => {
  const backGroundImg = turn ? redImg : yellowImg;
  const playerAlt = turn ? "player_1 turn" : gameType === "vsPlayer" ? "player_2 turn" : "cpu turn";
  const playerName = turn ? "PLAYER 1" : gameType === "vsPlayer" ? "PLAYER 2" : "CPU";

  return (
    <div className="player-turn-info">
      <img src={backGroundImg} alt={playerAlt} />
      <div className="turn-text-wrapper">
        <div className="turn-text">{playerName}’S TURN</div>
        <div className="turn-time-left">{time}s</div>
      </div>
    </div>
  );
};

export default TurnInfo;
