import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import x from "../../assets/x.png";
import o from "../../assets/o.png";
import "./SingleMode.css";
import Alert from "../../components/Alert/Alert";

const SingleMode: React.FC = () => {
  const { playerX, playerO } = useParams<{
    playerX: string;
    playerO: string;
  }>();
  const location = useLocation();
  const state = location.state as { playerX?: string; playerO: string };

  const [selected, setSelected] = useState<number[]>([]);
  const [selectedX, setSelectedX] = useState<number[]>([]);
  const [selectedO, setSelectedO] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [turn, setTurn] = useState<string>("x");
  const [alertState, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const spotsRef = useRef<(HTMLImageElement | null)[]>([]);

  const switchTurns = () => {
    if (turn === "x") {
      setTurn("o");
    } else if (turn === "o") {
      setTurn("x");
    }
  };

  const reserveSpot = (id: number) => {
    if (!selected.includes(id + 1) && spotsRef.current[id]) {
      if (turn === "x") {
        setSelectedX((prev) => {
          return [...prev, id + 1];
        });
      } else if (turn === "o") {
        setSelectedO((prev) => {
          return [...prev, id + 1];
        });
      }
      spotsRef.current[id]!.src = turn === "x" ? x : o;
      setSelected((prev) => {
        return [...prev, id + 1];
      });
      setTimer(10);
      switchTurns();
    } else if (selected.length >= 9) {
    } else {
      alert("spot already taken");
    }
  };

  const spotClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const id: number = parseInt(event.currentTarget.id.slice(-1));
    reserveSpot(id);
  };

  const cleanSpots = () => {
    setTimeout(() => {
      selected.forEach((i) => {
        if (spotsRef.current[i - 1]) {
          spotsRef.current[i - 1]!.src = "";
        }
      });
      setSelected([]);
      setSelectedO([]);
      setSelectedX([]);
      setTimer(10);
    }, 200);
  };

  useEffect(() => {
    let winner: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
      [1, 5, 9],
      [3, 5, 7],
    ];
    let y = 0;
    for (let i = 0; i < winner.length; i++) {
      const sample = winner[i];

      if (
        turn === "o" &&
        selectedX.includes(sample[0]) &&
        selectedX.includes(sample[1]) &&
        selectedX.includes(sample[2])
      ) {
        setAlertMessage("X wins the game");
        setAlertState(true);
        y = 1;
      } else if (
        turn === "x" &&
        selectedO.includes(sample[0]) &&
        selectedO.includes(sample[1]) &&
        selectedO.includes(sample[2])
      ) {
        setAlertMessage("O wins the game");
        setAlertState(true);
        y = 1;
      }
    }
    if (selected.length === 9) {
      if (y === 0) {
        setAlertMessage("Draw");
        setAlertState(true);
      }
    }
  }, [selected, selectedX, selectedO, turn]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      for (let i = 0; i < 9; i++) {
        if (!selected.includes(i + 1)) {
          reserveSpot(i);
          break;
        }
      }
      setTimer(10);
    }
  }, [timer, selected]);

  const playAgainHandler: React.MouseEventHandler = () => {
    cleanSpots();
    setAlertState(false);
  };

  return (
    <div className="single-mode">
      {alertState && (
        <Alert message={alertMessage} onclick={playAgainHandler} />
      )}
      <header>
        <div className="playerx">
          <p>{state.playerX}</p>
        </div>
        <div className="timer">
          <h2>Timer</h2>
          <p>{timer}</p>
        </div>
        <div className="palyero">
          <p>{state.playerO}</p>
        </div>
      </header>
      <div className="game-board">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            className="item"
            key={index}
            id={`spot${index}`}
            onClick={spotClickHandler}
          >
            <img ref={(el) => (spotsRef.current[index] = el)} alt="" src="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleMode;
