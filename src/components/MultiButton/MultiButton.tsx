import ButtonSolid from "../ButtonSolid";
import "./MultiButton.css";

export type ButtonProperties = {
  text: string;
  value: string;
};

interface MultiButtonProps {
  id: string;
  value: string;
  buttons: ButtonProperties[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

    const event = {
      target: {
        value,
        id,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="multi-button">
      <input type="hidden" id={id} value={value} />
      {buttons.map((button, index) => (
        <ButtonSolid
          className={`${button.value === value ? "" : "button--inactive"}`}
          onClick={() => checkOption(button.value)}
          key={index}
        >
          {button.text}
        </ButtonSolid>
      ))}
    </div>
  );
};

export default MultiButton;
