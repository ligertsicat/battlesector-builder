interface Props {
  onClickEvent: () => void;
}

const CloseButton = ({ onClickEvent }: Props) => {
  return (
    <button
      onClick={() => {
        onClickEvent();
      }}
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  );
};

export default CloseButton;
