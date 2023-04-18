import "./style.css";
import classNames from "classnames";

const PlayingItem = ({ index, item }) => {
  const playinItemStyle = classNames(
    "playing-item",
    { red: item.includes("r") },
    { yellow: item.includes("y") },
    { win: item.includes("w") },
    { animate: item.includes("a") }
  );

  return <div className={playinItemStyle}>{index}</div>;
};

export default PlayingItem;
