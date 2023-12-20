import { FC, ChangeEvent } from 'react';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  required: boolean;
  errors?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<Props> = (props) => {
  const { label, name, value, placeholder, required, onChange, errors } = props;

  return (
    <>
      <label htmlFor="message" className="textarea-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="textarea-field"
        placeholder={placeholder || ''}
        value={value || ''}
        onChange={onChange}
      ></textarea>
      {errors && <span className="error-notify">{errors}</span>}
    </>
  );
};

export default TextArea;
