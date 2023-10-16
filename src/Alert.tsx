interface Props {
  onClose: () => void;
}

const Alert = ({ onClose }: Props) => {
  return (
    <>
      <div className="alert alert-primary alert-dismissible" role="alert">
        A simple primary alert—check it out!
        <button
          onClick={() => {
            onClose();
          }}
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
};

export default Alert;
