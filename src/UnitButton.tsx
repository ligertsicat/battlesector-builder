interface Props {
  text: string;
  onClick: () => void;
  onClickAdd: () => void;
  onClickRemove: () => void;
}

const UnitButton = ({ text, onClick, onClickAdd, onClickRemove }: Props) => {
  return (
    <>
      <body className="p-3 m-0 border-0 bd-example m-0 border-0">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onClick();
          }}
        >
          {text}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            onClickAdd();
          }}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            onClickRemove();
          }}
        >
          -
        </button>
      </body>
    </>
  );
};

export default UnitButton;
