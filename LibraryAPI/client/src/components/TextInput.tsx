import React from "react";

interface TextInputProps {
  placeholder?: string;
  required?: boolean;
  value?: string;
  error?: string;
  onChange: (newValue: string) => void;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div>
      {props.error && <div style={{ color: "red" }}>{props.error}</div>}

      {
        <input
          className="form-control"
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          required={props.required ?? true}
          value={props.value}
        />
      }
    </div>
  );
};
