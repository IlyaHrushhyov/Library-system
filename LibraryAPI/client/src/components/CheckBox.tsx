interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
}

export const CheckBox = (props: CheckBoxProps) => {
  return (
    <input
      className="form-check-input"
      checked={props.checked}
      type="checkbox"
      onChange={(e) => props.onChange()}
    />
  );
};
