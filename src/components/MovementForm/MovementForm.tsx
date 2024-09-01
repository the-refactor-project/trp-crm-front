import Button from "../Button";
import "./MovementForm.css";

const MovementForm: React.FC = () => {
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
      <div className="form__group">
        <input type="radio" name="currency" id="currency-euro" value="EUR" />
        <label htmlFor="currency-euro">€</label>
        <input type="radio" name="currency" id="currency-dollar" value="USD" />
        <label htmlFor="currency-dollar">$</label>
      </div>
      <div className="form__group">
        <Button type="submit">Crear</Button>
      </div>
    </form>
  );
};

export default MovementForm;
