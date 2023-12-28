import { FC } from 'react';

interface Props {
  accept: string;
  name: string;
  label: string;
  fieldClassName?: string;
  required: boolean;
  errors?: string;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
}

const InputFile: FC<Props> = (props) => {
  const { accept, name, label, fieldClassName, required, errors } = props;

  return (
    <>
      <div className={fieldClassName || ''}>
        <label className="input-file-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <input className="input-file-field" accept={accept} id={name} name={name} type="file" />
      </div>
      {errors && <span className="error-notify">{errors}</span>}
    </>
  );
};

export default InputFile;
