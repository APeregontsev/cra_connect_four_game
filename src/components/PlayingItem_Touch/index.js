import "./style.css";
import classNames from "classnames";

const PlayingItemTouch = ({ item, index, mouseOverAction, clickAction }) => {
  const playinItemTouchStyle = classNames("playing-item-touch", { disabled: item !== "e" });

  return (
    <div
      className={playinItemTouchStyle}
      onMouseOver={mouseOverAction}
      data-index={index}
      onClick={clickAction}
    ></div>
  );
};

export default PlayingItemTouch;
