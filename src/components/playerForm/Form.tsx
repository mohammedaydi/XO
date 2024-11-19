import "./Form.css";
import { Props } from "../../types/formProps";
const Form = (props: Props) => {
  return (
    <form className="player-form">
      <div>
        <input
          type="text"
          id={props.id}
          onChange={props.onChange}
          value={props.value}
          placeholder="enter your name"
        />
      </div>
      <div>
        <button type="button" id={props.id} onClick={props.onClick}>
          done
        </button>
      </div>
    </form>
  );
};

export default Form;
