import { FC } from 'react';

interface Props {
  botName?: string;
  textToShow?: string;
}

const TextPreview: FC<Props> = (props) => {
  const { botName, textToShow } = props;

  return (
    <fieldset className="fieldset-block">
      <legend className="text-sm">{botName || ''}(перегляд)</legend>
      <div className="fieldset-text">{textToShow || ''}</div>
    </fieldset>
  );
};

export default TextPreview;
