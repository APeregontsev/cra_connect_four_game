import "./App.css";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import { useState } from "react";
import Context from "./Context";

function App() {
  const [mainMenu, setMainMenu] = useState(true);

  const [gameType, setGameType] = useState({ type: "null" });

  console.log("gameType", gameType);
  return (
    <Context.Provider value={{ setMainMenu }}>
      <div className="wrapper">
        {mainMenu ? <MainMenu setGameType={setGameType} /> : <Game gameType={gameType} />}
      </div>
    </Context.Provider>
  );
}

export default App;
