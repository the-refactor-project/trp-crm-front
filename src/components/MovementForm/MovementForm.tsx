import { useState } from "react";
import ButtonSolid from "../ButtonSolid";
import MultiButton from "../MultiButton";
import { ButtonProperties } from "../MultiButton/MultiButton";
import { MovementFormDataStructure } from "@movements/schema";
import "./MovementForm.css";

interface MovementFormProps {
  onSubmit: (formValues: MovementFormDataStructure) => void;
}

const MovementForm: React.FC<MovementFormProps> = ({ onSubmit }) => {
  const initialFormValues: MovementFormDataStructure = {
    currency: "EUR",
    description: "",
    quantity: 0,
    type: "out",
    date: "",
  };

  const [formValues, setFormValues] =
    useState<MovementFormDataStructure>(initialFormValues);

  const changeFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.id]: event.target.value,
    }));
  };

  const currencyButtons: ButtonProperties[] = [
    {
      text: "€",
      value: "EUR",
    },
    {
      text: "$",
      value: "USD",
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

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formValues.date = new Date(formValues.date);

    onSubmit(formValues);
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <div className="form__group">
        <div className="form__field form__field--inline">
          <span className="form__label">Tipo:</span>
          <MultiButton
            id="type"
            buttons={typeButtons}
            value={formValues.type}
            onChange={changeFormValues}
          />
        </div>
        <span className="form__error">
          Introduce un tipo de movimiento correcto
        </span>
      </div>
      <div className="form__group">
        <label htmlFor="date" className="form__label">
          Fecha:
        </label>
        <input
          type="date"
          className="form__control"
          id="date"
          value={formValues.date.toString()}
          onChange={changeFormValues}
        />
      </div>
      <div className="form__group">
        <label htmlFor="description" className="form__label">
          Descripción:
        </label>
        <input
          type="text"
          className="form__control"
          id="description"
          value={formValues.description}
          onChange={changeFormValues}
        />
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
            value={formValues.quantity}
            onChange={changeFormValues}
          />
        </div>
        <div className="form__group">
          <span className="form__label">Moneda:</span>
          <MultiButton
            id="currency"
            buttons={currencyButtons}
            value={formValues.currency}
            onChange={changeFormValues}
          />
        </div>
      </div>
      <div className="form__group">
        <ButtonSolid type="submit">Crear</ButtonSolid>
      </div>
    </form>
  );
};

export default MovementForm;
