import { FC } from 'react';
import cn from 'classnames';

interface Props {
  type?: string;
  title?: string;
  required: boolean;
  labels: {
    label: string;
    value: string;
  }[];
  value: string;
  errors?: string;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RadioGroup: FC<Props> = (props) => {
  const { type, title, required, labels, value, onChange, errors } = props;

  return (
    <>
      {title && (
        <div className="radio-group-title">
          {title}
          {required && <span className="required">*</span>}
        </div>
      )}
      <ul
        className={cn({
          'radio-group': true,
          'radio-group-horizontal': type === 'horizontal',
          'radio-group-vertical': type === 'vertical',
        })}
      >
        {labels.map((i) => {
          return (
            <li className="radio-group-item" key={i.label}>
              <div className="radio-group-item-inner">
                <input
                  id="radioGroup"
                  type="radio"
                  value={i.value}
                  name="messageType"
                  className="radio-group-input"
                  checked={value === i.value}
                  onChange={(e) => onChange('messageType', e.target.value)}
                />
                <label htmlFor="radioGroup" className="radio-group-label">
                  {i.label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      {errors && <span className="error-notify">{errors}</span>}
    </>
  );
};

export default RadioGroup;
