import ButtonSolid from "../ButtonSolid";
import "./Confirm.css";

interface ConfirmProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ text, onConfirm, onCancel }) => {
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
