import "./Error.css";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-container">
      <span className="error">
        {message ? `Error: ${message}` : "Ha ocurrido un error"}
      </span>
    </div>
  );
};

export default Error;
