import "./style.css";
import MenuCard from "../../components/MenuCard";
import Button from "../../components/Button";
import ButtonsWrapper from "../../components/ButtonsWrapper";
import RulesBlock from "../../components/RulesText";
import { useState, useContext } from "react";
import Context from "../../Context";

const MainMenu = ({ setGameType }) => {
  const { setMainMenu } = useContext(Context);

  const [rulesMenuOpened, setRulesMenuOpened] = useState(false);

  function startGameVsPlayer() {
    setGameType({ type: "vsPlayer" });

    setMainMenu(false);
  }

  function startGameVsCPU() {
    setGameType({ type: "vsCPU" });
    setMainMenu(false);
  }

  return (
    <div className="main-menu-wrapper">
      {!rulesMenuOpened && (
        <MenuCard type={"main"}>
          <ButtonsWrapper>
            <Button type={"vsp"} text={"play vs player"} action={() => startGameVsPlayer()} />
            <Button type={"vsc"} text={"play vs cpu"} action={() => startGameVsCPU()} />
            <Button
              type={"rules"}
              text={"game rules"}
              action={() => setRulesMenuOpened(!rulesMenuOpened)}
            />
          </ButtonsWrapper>
        </MenuCard>
      )}

      {rulesMenuOpened && (
        <MenuCard type={"rules"}>
          <RulesBlock />
          <Button
            type={"checkmark"}
            text={""}
            action={() => setRulesMenuOpened(!rulesMenuOpened)}
          />
        </MenuCard>
      )}
    </div>
  );
};

export default MainMenu;
