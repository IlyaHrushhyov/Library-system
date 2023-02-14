import React from "react";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  error?: string;
  onChange: (newValue: string | number) => void;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div>
      {props.error && <div style={{ color: "red" }}>{props.error}</div>}

      <input
        className="form-control"
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required ?? true}
        value={props.value}
      />
    </div>
  );
};
