import { useEffect } from "react";
import useAppStore from "../../../../store/useAppStore";
import { useMovementsQuery } from "../../queries/useMovementsQuery";
import Loading from "../../../../components/Loading";

const MovementsPage: React.FC = () => {
  const { movements, loadMovements } = useAppStore((state) => state);
  const { data, isSuccess, isLoading } = useMovementsQuery(1);

  useEffect(() => {
    if (isSuccess) {
      loadMovements(data?.movements);
    }
  }, [data?.movements, isSuccess, loadMovements]);

  return (
    <>
      <h1>Movimientos ({movements.length})</h1>
      {isLoading && <Loading />}
    </>
  );
};

export default MovementsPage;
