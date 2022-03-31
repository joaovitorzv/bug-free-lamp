import "./styles.css";

interface InputLabelProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
}

function InputLabel({ children, label, htmlFor }: InputLabelProps) {
  return (
    <div className="inputLabel">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export default InputLabel;
