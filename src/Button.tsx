interface Props {
  buttonName: string;
  color?: "primary" | "secondary" | "danger";
  onClickEvent: () => void;
}

const Button = ({ buttonName, color = "primary", onClickEvent }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      style={{ padding: "10px 20px" }}
      onClick={() => {
        onClickEvent();
      }}
    >
      {buttonName}
    </button>
  );
};

export default Button;
