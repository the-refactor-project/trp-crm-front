import { useCallback, useEffect } from "react";
import ButtonSolid from "../ButtonSolid";
import "./Confirm.css";

interface ConfirmProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ text, onConfirm, onCancel }) => {
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onConfirm();
        return;
      }

      if (event.key === "Escape") {
        onCancel();
      }
    },
    [onCancel, onConfirm],
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="confirm-container">
      <div className="confirm">
        <div className="confirm__text">{text}</div>
        <div className="confirm__actions">
          <ButtonSolid onClick={onConfirm}>Confirmar</ButtonSolid>
          <ButtonSolid onClick={onCancel}>Cancelar</ButtonSolid>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
