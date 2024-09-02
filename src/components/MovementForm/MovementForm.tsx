import { useFormik } from "formik";
import ButtonSolid from "../ButtonSolid";
import MultiButton from "../MultiButton";
import { ButtonProperties } from "../MultiButton/MultiButton";
import { MovementDataStructure } from "../../entities/movements/schema";
import "./MovementForm.css";

const MovementForm: React.FC = () => {
  const currencyButtons: ButtonProperties[] = [
    {
      text: "€",
      value: "EUR",
    },
    {
      value: "USD",
      text: "$",
    },
  ];

  const typeButtons: ButtonProperties[] = [
    {
      value: "out",
      text: "gasto",
    },
    {
      text: "ingreso",
      value: "in",
    },
  ];

  const initialFormValues: MovementDataStructure = {
    currency: "EUR",
    description: "",
    quantity: 0,
    type: "out",
    date: new Date(),
  };

  const submitForm = (movementData: MovementDataStructure) => {
    console.log(movementData);
  };

  const form = useFormik({
    initialValues: initialFormValues,
    onSubmit: submitForm,
  });

  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <div className="form__group form__group--inline">
        <span className="form__label">Tipo:</span>
        <MultiButton id="type" buttons={typeButtons} value="out" />
      </div>
      <div className="form__group">
        <label htmlFor="date" className="form__label">
          Fecha:
        </label>
        <input type="date" className="form__control" id="date" />
      </div>
      <div className="form__group">
        <label htmlFor="description" className="form__label">
          Descripción:
        </label>
        <input type="text" className="form__control" id="description" />
      </div>
      <div className="form__inline-groups">
        <div className="form__group">
          <label htmlFor="quantity" className="form__label">
            Cantidad:
          </label>
          <input
            type="number"
            className="form__control form__control--mini"
            id="quantity"
          />
        </div>
        <div className="form__group">
          <span className="form__label">Moneda:</span>
          <MultiButton id="currency" buttons={currencyButtons} value="EUR" />
        </div>
      </div>
      <div className="form__group">
        <ButtonSolid type="submit">Crear</ButtonSolid>
      </div>
    </form>
  );
};

export default MovementForm;
