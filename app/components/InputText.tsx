import { FC } from 'react';

interface Props {
  label: string;
  name: string;
  value?: string;
  className?: string;
  handleChange?: () => void;
  req?: boolean;
  mLength?: number;
  onError?: string;
  required: boolean;
}

const InputText: FC<Props> = (props) => {
  const { label, name, value, className, handleChange, required, mLength, onError } = props;

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
        onChange={handleChange}
      />
      {onError && <p className="text-sm text-red-600">{onError}</p>}
    </>
  );
};

export default InputText;
