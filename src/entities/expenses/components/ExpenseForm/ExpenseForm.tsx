import { useEffect, useState } from "react";
import ButtonSolid from "../../../../components/ButtonSolid";
import MultiButton from "../../../../components/MultiButton";
import { ButtonProperties } from "../../../../components/MultiButton/MultiButton";
import { ExpenseFormDataStructure } from "../../schema";
import AutoComplete from "../AutoComplete";
import "./ExpenseForm.css";
import { ProviderStructure } from "../../../providers/schema";

interface ExpenseFormProps {
  initialValues?: ExpenseFormDataStructure;
  onSubmit: (formValues: ExpenseFormDataStructure) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const initialFormValues: ExpenseFormDataStructure = {
    currency: "EUR",
    description: "",
    quantity: 0,
    isCard: false,
    date: "",
    providerId: "",
    movementId: "",
  };

  const [formValues, setFormValues] =
    useState<ExpenseFormDataStructure>(initialFormValues);

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        ...initialValues,
        date: initialValues.date.toString().split("T")[0],
      });
    }
  }, [initialValues]);

  const changeFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.id]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
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

  const onAutoCompleteSelect = (provider: ProviderStructure | null) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      providerId: provider ? provider._id : "",
    }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formValues.date = new Date(formValues.date);
    if (formValues.movementId === "") {
      delete formValues.movementId;
    }

    onSubmit(formValues);
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <div className="form__group form__group--inline">
        <input
          type="checkbox"
          className="form__control"
          id="isCard"
          checked={formValues.isCard}
          onChange={changeFormValues}
        />
        <label htmlFor="isCard" className="form__label">
          Tarjeta
        </label>
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
        <label htmlFor="provider" className="form__label">
          Proveedor
        </label>
        <AutoComplete onComplete={onAutoCompleteSelect} />
      </div>
      <div className="form__group">
        <ButtonSolid type="submit">
          {initialValues ? "Modificar" : "Crear"}
        </ButtonSolid>
      </div>
    </form>
  );
};

export default ExpenseForm;
