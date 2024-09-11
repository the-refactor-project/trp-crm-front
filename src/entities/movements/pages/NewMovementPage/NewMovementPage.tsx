import { useNavigate } from "react-router-dom";
import MovementForm from "@/entities/movements/components/MovementForm";
import { MovementFormDataStructure } from "@movements/schema";
import { useAddMovementMutation } from "@movements/mutations/movementsMutations";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import { getPath } from "../../../../router/paths";
import useTitle from "../../../../hooks/useTitle";

const NewMovementPage: React.FC = () => {
  useTitle("Crear movimiento");
  const { addMovement } = useAppStore((state) => state);
  const { mutateAsync, isPending } = useAddMovementMutation();
  const navigate = useNavigate();

  const createMovement = async (newMovementData: MovementFormDataStructure) => {
    const newMovement = await mutateAsync(newMovementData);

    addMovement(newMovement);

    navigate(getPath("movements"));
  };

  return (
    <>
      <h1>Nuevo movimiento</h1>
      <MovementForm onSubmit={createMovement} />
      {isPending && <Loading />}
    </>
  );
};

export default NewMovementPage;
