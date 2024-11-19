import { Link } from "react-router-dom";
import "./Alert.css";
import { Props } from "../../types/alretProps";
const Alert: React.FC<Props> = ({
  title = "Game Finished",
  message = "ssss",
  onclick,
}) => {
  return (
    <div className="alert">
      <h1>{title}</h1>
      <p
        className={`${message[0] === "X" && "orange"} ${
          message[0] === "O" && "blue"
        }`}
      >
        {message}
      </p>

      <div className="alert-buttons">
        <div>
          <Link to="/">
            <button className="btn" id="leave">
              leave
            </button>
          </Link>
        </div>
        <div>
          <button className="btn" onClick={onclick}>
            play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
