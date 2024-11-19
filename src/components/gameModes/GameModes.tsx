import { Link } from "react-router-dom";
import { useObserver } from "../shared/hooks/use-observer";
import "./GameModes.css";
import { LegacyRef, useEffect, useState } from "react";

const GameModes: React.FC = () => {
  const [singleRef, singleInView] = useObserver({ threshold: 0.5 });
  const [multiRef, multiInView] = useObserver({ threshold: 0.5 });

  return (
    <div className="game-modes" id="gameModes">
      <div
        ref={singleRef as React.LegacyRef<HTMLDivElement>}
        className={`game-modes-single ${singleInView && "singleSlider"}`}
      >
        <h1>Singleplayer</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          reiciendis nostrum autem fugit cum, reprehenderit natus
        </p>
        <div>
          <a href="#starter">
            <button className="btn" type="button">
              Join now
            </button>
          </a>
        </div>
      </div>
      <div
        ref={multiRef as LegacyRef<HTMLDivElement>}
        className={`game-modes-multi ${multiInView && "multiSlider"}`}
      >
        <h1>Multiplayer</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          reiciendis nostrum autem fugit cum, reprehenderit natus
        </p>
        <div>
          <Link to="">
            <button className="btn" type="button">
              Join now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameModes;
