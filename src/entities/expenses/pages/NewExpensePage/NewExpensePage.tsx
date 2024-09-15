import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import Loading from "@/components/Loading";
import { getPath } from "../../../../router/paths";
import useTitle from "../../../../hooks/useTitle";
import { ExpenseFormDataStructure } from "../../schema";
import { useAddExpenseMutation } from "../../mutations/expensesMutations";
import ExpenseForm from "../../components/ExpenseForm";

const NewExpensePage: React.FC = () => {
  useTitle("Crear gasto");
  const { addExpense } = useAppStore((state) => state);
  const { mutateAsync, isPending } = useAddExpenseMutation();
  const navigate = useNavigate();

  const createExpense = async (newExpenseData: ExpenseFormDataStructure) => {
    const newExpense = await mutateAsync(newExpenseData);

    addExpense(newExpense);

    navigate(getPath("expenses"));
  };

  return (
    <>
      <h1>Nuevo gasto</h1>
      <ExpenseForm onSubmit={createExpense} />
      {isPending && <Loading />}
    </>
  );
};

export default NewExpensePage;
