import { useEffect } from "react";
import useAppStore from "../../../../store/useAppStore";
import { useMovementsQuery } from "../../queries/useMovementsQuery";

const MovementsPage: React.FC = () => {
  const { movements, loadMovements } = useAppStore((state) => state);
  const { data, isSuccess } = useMovementsQuery(1);

  useEffect(() => {
    if (isSuccess) {
      loadMovements(data?.movements);
    }
  }, [data?.movements, isSuccess, loadMovements]);

  return <h1>Movimientos ({movements.length})</h1>;
};

export default MovementsPage;
