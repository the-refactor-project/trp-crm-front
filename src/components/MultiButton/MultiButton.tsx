import ButtonSolid from "../ButtonSolid";
import "./MultiButton.css";

interface MultiButtonProps {
  id: string;
  value: string;
  buttons: {
    text: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
}

const MultiButton: React.FC<MultiButtonProps> = ({
  id,
  value,
  buttons,
  onChange,
}) => {
  const checkOption = (value: string) => {
    if (!onChange) {
      return;
    }

    onChange(value);
  };

  return (
    <div className="multi-button">
      <input type="hidden" id={id} value={value} />
      {buttons.map((button) => (
        <ButtonSolid
          className={`${button.value === value ? "" : "button--inactive"}`}
          onClick={() => checkOption(button.value)}
        >
          {button.text}
        </ButtonSolid>
      ))}
    </div>
  );
};

export default MultiButton;
