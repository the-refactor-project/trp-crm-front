import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { getPath } from "@/router/paths";
import ButtonSolid from "@/components/ButtonSolid";
import { ExpenseStructure } from "../../schema";
import useTitle from "../../../../hooks/useTitle";
import { useExpensesQuery } from "../../queries/useExpensesQuery";
import ExpensesTable from "../../components/ExpensesTable";
import { useDeleteExpenseMutation } from "../../mutations/expensesMutations";
import Confirm from "../../../../components/Confirm";

const ExpensesPage: React.FC = () => {
  useTitle("Gastos");
  const { expenses, loadExpenses, deleteExpenseById } = useAppStore(
    (state) => state,
  );
  const [isConfirmOpen, setIsConfirmOpen] =
    useState<ExpenseStructure["_id"]>("");
  const { data, isSuccess, isLoading, isError } = useExpensesQuery();
  const {
    mutateAsync,
    isError: isMutationError,
    isPending,
  } = useDeleteExpenseMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      loadExpenses(data);
    }
  }, [data, isSuccess, loadExpenses]);

  const deleteExpense = async () => {
    await mutateAsync(isConfirmOpen);

    deleteExpenseById(isConfirmOpen);

    closeConfirm();
  };

  const navigateToNewExpensePage = () => {
    navigate(getPath("expenses", "new"));
  };

  const closeConfirm = () => {
    setIsConfirmOpen("");
  };

  const openConfirm = (expenseId: ExpenseStructure["_id"]) => {
    setIsConfirmOpen(expenseId);
  };

  return (
    <>
      <header className="section-header">
        <h1>Gastos ({expenses.length})</h1>
        <ButtonSolid onClick={navigateToNewExpensePage}>Nuevo</ButtonSolid>
      </header>
      <ExpensesTable expenses={expenses} onDeleteExpense={openConfirm} />
      {isLoading || (isPending && <Loading />)}
      {isError && <Error message="No se han podido cargar los datos" />}
      {isMutationError && <Error message="No se ha podido eliminar el gasto" />}
      {isConfirmOpen && (
        <Confirm
          text="¿Seguro que quieres eliminar este gasto?"
          onConfirm={deleteExpense}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default ExpensesPage;
