type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = ({ onClick, children, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
};
