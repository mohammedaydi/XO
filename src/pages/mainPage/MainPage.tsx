import Board from "../../components/board/Board";
import Starter from "../../components/starter/Starter";
import GameModes from "../../components/gameModes/GameModes";

import "./MainPage.css";
import { useEffect } from "react";

const MainPage: React.FC = () => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/hername");

    const response_data = await response.json();
    if (response.ok === true) {
      console.log(response_data);
    } else {
      console.log("connection failed");
    }
  };
  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <div className="main-page">
      <header>
        <div className="main-page-header-text">
          <h1>XO</h1>
          <p>play now with your friends for free!!</p>
          <div>
            <a href="#gameModes">
              <button type="button">Start</button>
            </a>
          </div>
        </div>
        <Board />
      </header>
      <GameModes />
      <Starter />
    </div>
  );
};

export default MainPage;
