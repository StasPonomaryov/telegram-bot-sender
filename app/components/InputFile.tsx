import { FC } from 'react';

interface Props {
  name: string;
  label: string;
  fieldClassName?: string;
  required: boolean;
}

const InputFile: FC<Props> = (props) => {
  const { name, label, fieldClassName, required } = props;

  return (
    <div className={fieldClassName || ''}>
      <label className="input-file-label" htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input className="input-file-field" id={name} name={name} type="file" />
    </div>
  );
};

export default InputFile;
