import { FC, ChangeEvent } from 'react';

interface Props {
  label: string;
  name: string;
  value?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  req?: boolean;
  mLength?: number;
  errors?: string;
  required: boolean;
  touched?: boolean;
}

const InputText: FC<Props> = (props) => {
  const { label, name, value, className, onChange, required, mLength, errors, touched } = props;

  return (
    <>
      <label htmlFor={name} className="input-text-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        className={`input-text-field ${className}`}
        name={name}
        type="text"
        value={value}
        required={required}
        maxLength={mLength}
        onChange={onChange}
      />
      {touched && errors && <span className="error-notify">{errors}</span>}
    </>
  );
};

export default InputText;
