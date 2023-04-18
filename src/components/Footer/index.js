import "./style.css";
import classNames from "classnames";

const FooterBlock = ({ winner, gameOver }) => {
  return (
    <div
      className={classNames(
        "game-footer",
        { red: winner && gameOver },
        { yellow: !winner && gameOver }
      )}
    ></div>
  );
};

export default FooterBlock;
