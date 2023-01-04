import { Field, useField } from "formik";
import styled from "styled-components";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  component?: string;
  rows?: string;
  value?: string;
  children?: React.ReactNode;
  defaultValue?: string;
  min?: any;
  max?: any;
}

const Input: React.FC<Props> = ({
  name,
  placeholder,
  type,
  disabled,
  component,
  rows,
  children,
  min,
  max,
}) => {
  const [field, meta] = useField(name);
  return (
    <InputBlock className="input-block custom-input">
      <label htmlFor={name}>{placeholder}</label>
      <Field
        {...field}
        min={min || null}
        max={max || null}
        id={name}
        type={type || "text"}
        disabled={disabled || false}
        component={component}
        rows={rows}
        onChange={(e: any) => field.onChange(e)}
      >
        {children}
      </Field>
      {meta.touched && meta.error ? (
        <Error className="error">{meta.error}</Error>
      ) : null}
    </InputBlock>
  );
};

const Error = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.accent};
  font-size: 0.75rem;
`;

export const InputBlock = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.faded};
    font-weight: 600;
    font-size: 0.9rem;
  }

  input,
  textArea,
  select {
    color: ${({ theme }) => theme.faded};
    font-size: 1rem;
    width: 100%;
    padding: 0.7rem 0.5rem;
    border: none;
    background: rgba(0, 0, 0, 0.125);

    border-radius: 5px;
    outline: none;

    &:focus {
      border: 1px solid ${({ theme }) => theme.accent};
    }
  }
`;

export default Input;
