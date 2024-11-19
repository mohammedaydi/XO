import "./Board.css";
import x from "../../assets/x.png";
import o from "../../assets/o.png";
import { useEffect, useRef } from "react";
import { time } from "console";
const Board: React.FC = () => {
  const spotsRef = useRef<(HTMLImageElement | null)[]>([]);
  const timeoutRef = useRef<number | null>();
  const animate = () => {
    let selected: number[] = [];

    while (selected.length !== 9) {
      const rand = Math.floor(Math.random() * 9);
      if (!selected.includes(rand)) selected.push(rand);
    }
    for (let i = 0; i < selected.length; i++) {
      const index = selected[i];
      if (spotsRef.current[index]) {
        spotsRef.current[index]!.src = "";
        spotsRef.current[index]!.style.display = "none";
      }
    }

    for (let i = 0; i < selected.length; i++) {
      const index = selected[i];
      let src = i % 2 ? x : o;
      if (spotsRef.current[index]) {
        timeoutRef.current = window.setTimeout(() => {
          if (spotsRef.current[index]) {
            spotsRef.current[index]!.src = src;
            spotsRef.current[index]!.style.display = "block";
          }
        }, 700 * (i + 1));
      }
    }
  };
  useEffect(() => {
    animate();
  }, []);
  useEffect(() => {
    const animInt = setInterval(() => {
      animate();
    }, 8000);

    return () => {
      clearInterval(animInt);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="board">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="item" key={index} id={`spot${index}`}>
          <img ref={(el) => (spotsRef.current[index] = el)} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Board;
