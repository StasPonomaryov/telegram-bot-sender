import { NextPage } from 'next';
import cn from 'classnames';

interface Props {
  type: string;
  labels: {
    id: string;
    name: string;
  }[];
}

const RadioGroup: NextPage<Props> = (props) => {
  const { type, labels } = props;

  return (
    <ul
      className={cn({
        'checkbox-group': true,
        'checkbox-group-horizontal': type === 'horizontal',
        'checkbox-group-vertical': type === 'vertical',
      })}
    >
      {labels.map((i) => {
        return (
          <li className="checkbox-group-item" key={i.id}>
            <div className="checkbox-group-item-inner">
              <input
                id="radioGroup"
                type="radio"
                value=""
                name="radioGroup"
                className="checkbox-group-input"
              />
              <label htmlFor="radioGroup" className="checkbox-group-label">
                {i.name}
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioGroup;
