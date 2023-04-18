import { useEffect, useState, useContext } from "react";
import Context from "../../Context";
import Button from "../../components/Button";
import FooterBlock from "../../components/Footer";
import HeaderBlock from "../../components/Header";
import PlayerInfo from "../../components/PlayerInfo";
import TurnInfo from "../../components/TurnInfo";
import MenuCard from "../../components/MenuCard";
import ButtonsWrapper from "../../components/ButtonsWrapper";
import "./style.css";
import PlayingItem from "../../components/PlayingItem";
import PlayingItemTouch from "../../components/PlayingItem_Touch";
import Marker from "../../components/Marker";
import WinPlate from "../../components/WinPlate";
import { useTimer } from "../../Timer";
import { turnHandler } from "../../functions/turnHandler";

const Game = ({ gameType }) => {
  const { setMainMenu } = useContext(Context);

  const [menuOpened, setMenuOpened] = useState(false);

  function ingameMenuOpen() {
    setMenuOpened(true);
    timer.pause();
  }
  function quitGameHandler() {
    setMainMenu(true);
  }

  // Restart button handler

  function restart() {
    setGameProps({
      ...gameProps,
      playerOneTurn: true,
      score1: 0,
      score2: 0,
      playingArea: playingArea,
      gameOver: false,
    });
    setMenuOpened(false);
    timer.reset();
  }

  // Function for Marker move, as playing Zone is not narrow - put it in constant values via Map

  const [markerPosition, setMarkerPosition] = useState(32);

  function markerPositionCalc(itemIndex) {
    const position = new Map([
      [0, 32],
      [1, 122],
      [2, 209],
      [3, 297],
      [4, 386],
      [5, 473],
      [6, 562],
    ]);

    setMarkerPosition(position.get(itemIndex));
  }

  // Lets create game board with empty playing items,
  // e = empty
  // r = red
  // y = yellow
  // w = win
  // a = play animation

  const playingArea = [
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
  ];

  const [gameProps, setGameProps] = useState({
    playerOneTurn: true,
    score1: 0,
    score2: 0,
    playingArea: playingArea,
    gameOver: false,
  });

  // Display win plate
  const showWinPlate = gameProps.gameOver;

  // Which player won?

  const player1Won = gameProps.score1 > gameProps.score2;

  console.log(gameProps);

  // Lets start timeout
  const timer = useTimer(gameProps, setGameProps);

  useEffect(() => {
    timer.start();

    return () => {
      timer.stopAndClear();
    };
  }, []);

  // Lets stop Timer if game is over

  useEffect(() => {
    if (showWinPlate) {
      timer.stopAndClear();
    }
  }, [showWinPlate]);

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TIMER", timer.leftSeconds);

  return (
    <div className="game-area-wrapper">
      <HeaderBlock openMenuAction={ingameMenuOpen} restart={restart} />

      <div className="game-board-wrapper">
        <PlayerInfo type={"p1"} score={gameProps.score1} />

        <div className="game-board">
          <Marker player={gameProps.playerOneTurn} position={markerPosition} />

          <div className="gameboard-black-layer"></div>

          <div className="gameboard-playing-layer">
            {gameProps.playingArea.map((line, lineIndex) => {
              return line.map((lineItem, lineItemIndex) => {
                return (
                  <PlayingItem
                    key={String(lineIndex) + String(lineItemIndex) + "p"}
                    index={String(lineIndex) + String(lineItemIndex)}
                    item={lineItem}
                  />
                );
              });
            })}
          </div>

          <div className="gameboard-white-layer"></div>

          <div className="gameboard-touch-layer">
            {gameProps.playingArea.map((line, lineIndex) => {
              return line.map((lineItem, lineItemIndex) => {
                return (
                  <PlayingItemTouch
                    key={String(lineIndex) + String(lineItemIndex)}
                    index={lineItemIndex}
                    item={lineItem}
                    mouseOverAction={() => markerPositionCalc(lineItemIndex)}
                    clickAction={() => {
                      turnHandler(lineIndex, lineItemIndex, timer, gameProps, setGameProps);
                    }}
                  />
                );
              });
            })}
          </div>
        </div>

        <PlayerInfo type={gameType.type} score={gameProps.score2} />
      </div>

      {showWinPlate ? (
        <WinPlate winner={player1Won} type={gameType.type} action={restart} />
      ) : (
        <TurnInfo
          turn={gameProps.playerOneTurn}
          time={timer.leftSeconds}
          gameType={gameType.type}
        />
      )}

      <FooterBlock winner={player1Won} gameOver={gameProps.gameOver} />

      {menuOpened && (
        <div className="menu-card-wrapper">
          <MenuCard type={"ingame"}>
            <ButtonsWrapper>
              <Button
                type={"continue"}
                text={"continue game"}
                action={() => {
                  setMenuOpened(false);
                  timer.continueTimer();
                }}
              />
              <Button type={"continue"} text={"restart"} action={restart} />
              <Button type={"quit"} text={"quit game"} action={quitGameHandler} />
            </ButtonsWrapper>
          </MenuCard>
        </div>
      )}
    </div>
  );
};

export default Game;
