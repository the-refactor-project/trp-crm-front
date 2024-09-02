import MovementForm from "@/components/MovementForm";
import { MovementFormDataStructure } from "../../schema";

const NewMovementPage: React.FC = () => {
  const createMovement = (newMovementData: MovementFormDataStructure) => {
    console.log(newMovementData);
  };

  return (
    <>
      <h1>Nuevo movimiento</h1>
      <MovementForm onSubmit={createMovement} />
    </>
  );
};

export default NewMovementPage;
