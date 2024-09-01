import ButtonSolid from "../ButtonSolid";
import MultiButton from "../MultiButton";
import "./MovementForm.css";

const MovementForm: React.FC = () => {
  const currencyButtons = [
    {
      text: "€",
      value: "EUR",
      isDefault: true,
    },
    {
      value: "USD",
      text: "$",
    },
  ];

  const typeButtons = [
    {
      text: "ingreso",
      value: "in",
      isDefault: true,
    },
    {
      value: "out",
      text: "gasto",
    },
  ];

  return (
    <form className="form">
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
      <div className="form__group">
        <label htmlFor="quantity" className="form__label">
          Cantidad:
        </label>
        <input type="number" className="form__control" id="quantity" />
      </div>
      <div className="form__group form__group--inline">
        <span className="form__label">Moneda:</span>
        <MultiButton id="currency" buttons={currencyButtons} value="EUR" />
      </div>
      <div className="form__group form__group--inline">
        <span className="form__label">Tipo:</span>
        <MultiButton id="type" buttons={typeButtons} value="out" />
      </div>
      <div className="form__group">
        <ButtonSolid type="submit">Crear</ButtonSolid>
      </div>
    </form>
  );
};

export default MovementForm;
