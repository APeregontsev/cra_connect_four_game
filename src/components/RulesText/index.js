import "./style.css";

const RulesBlock = () => {
  return (
    <>
      <div className="objective-wrapper">
        <div className="title">OBJECTIVE</div>
        <div className="objective-text">
          Be the first player to connect 4 of the same colored discs in a row (either vertically,
          horizontally, or diagonally).
        </div>
      </div>
      <div className="how-to-play-wrapper">
        <div className="title">HOW TO PLAY</div>
        <ol className="how-to-play-list">
          <li className="list-item">Red goes first in the first game.</li>
          <li className="list-item">
            Players must alternate turns, and only one disc can be dropped in each turn.
          </li>
          <li className="list-item">The game ends when there is a 4-in-a-row or a stalemate.</li>
          <li className="list-item">
            The starter of the previous game goes second on the next game.
          </li>
        </ol>
      </div>
    </>
  );
};

export default RulesBlock;
