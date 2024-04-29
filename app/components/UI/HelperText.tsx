import { FC } from 'react';

interface IHelperTextProps {
  text: string;
}

const HelperText: FC<IHelperTextProps> = (props) => {
  const { text } = props;

  return <div className="message-block-tooltip">{text}</div>;
};

export default HelperText;
