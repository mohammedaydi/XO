import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../playerForm/Form";
import "./Starter.css";

interface Player {
  id: string;
  name: string;
}

const Starter: React.FC = () => {
  const [playerX, setPlayerX] = useState<Player>({ id: "teamX", name: "" });
  const [playerO, setPlayerO] = useState<Player>({ id: "teamO", name: "" });
  const [xValue, setXValue] = useState<string>("");
  const [oValue, setYValue] = useState<string>("");

  const navigate = useNavigate();

  const refO = useRef<HTMLDivElement>(null);
  const refX = useRef<HTMLDivElement>(null);

  const mouseEntered = (event: React.MouseEvent) => {
    if (refO.current && refX.current) {
      if (event.currentTarget.id === "teamX") {
        refX.current.style.flex = "1.5";
        refO.current.style.flex = "1";

        refX.current.style.background = "var(--orange)";
        refO.current.style.background = "rgba(5, 142, 217, 0.7)";
      } else if (event.currentTarget.id === "teamO") {
        refO.current.style.flex = "1.5";
        refX.current.style.flex = "1";

        refO.current.style.background = "var(--blue)";
        refX.current.style.background = "rgba(213, 111, 62, 0.7)";
      }
    }
  };

  const mouseLeft = (event: React.MouseEvent) => {
    if (refO.current && refX.current) {
      refX.current.style.flex = "1";
      refO.current.style.flex = "1";

      refX.current.style.background = "rgba(213, 111, 62, 0.7)";
      refO.current.style.background = "rgba(5, 142, 217, 0.7)";
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === "teamX") {
      if (event.currentTarget.value || event.currentTarget.value === "")
        setXValue(event.currentTarget.value);
    } else if (event.currentTarget.id === "teamO") {
      if (event.currentTarget.value || event.currentTarget.value === "")
        setYValue(event.currentTarget.value);
    }
  };

  const nameHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "teamX") {
      if (xValue)
        setPlayerX((prev) => {
          return { id: "teamX", name: xValue };
        });
    } else if (event.currentTarget.id === "teamO") {
      if (oValue)
        setPlayerO((prev) => {
          return { ...prev, name: oValue };
        });
    }
  };

  useEffect(() => {
    console.log(playerX.name + "  " + playerO.name);
    if (playerX.name !== "" && playerO.name !== "") {
      console.log("nnn");
      // window.location.hash = "";
      navigate("/singlemode", {
        state: { playerX: playerX.name, playerO: playerO.name },
      });
    }
  }, [playerX, playerO]);

  return (
    <div className="starter" id="starter">
      <div
        className="team-x"
        ref={refX}
        onMouseEnter={mouseEntered}
        onMouseLeave={mouseLeft}
        id="teamX"
      >
        <h1>
          TEAM <span>X</span>
        </h1>
        <Form
          id={playerX.id}
          onChange={inputHandler}
          value={xValue}
          onClick={nameHandler}
        />
      </div>
      <div
        className="team-o"
        ref={refO}
        onMouseEnter={mouseEntered}
        onMouseLeave={mouseLeft}
        id="teamO"
      >
        <h1>
          TEAM <span>O</span>
        </h1>
        <Form
          id={playerO.id}
          onChange={inputHandler}
          value={oValue}
          onClick={nameHandler}
        />
      </div>
    </div>
  );
};

export default Starter;
