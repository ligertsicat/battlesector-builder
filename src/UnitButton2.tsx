interface Props {
  text: string;
  onClick: () => void;
}

const UnitButton2 = ({ text, onClick }: Props) => {
  return (
    <button
      type="button"
      className="scifi_button custom-buffered-button"
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export default UnitButton2;
