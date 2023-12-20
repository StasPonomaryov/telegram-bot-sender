'use client';

import type { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputFile from '../components/InputFile';
import InputText from '../components/InputText';
import RadioGroup from '../components/RadioGroup';
import TextArea from '../components/TextArea';
import TextPreview from '../components/TextPreview';
import { useGlobalState } from '../state/global';

export const jsonExampleObjects: string = `
{"1234567":{...},"89012345":{...},...}`;
export const jsonExampleArray: string = `
{["1234567", "89012345", ...]}`;

const sampleText = 'Приклад тексту';

const MessagePage: FC = () => {
  const { setMessageType, messageType } = useGlobalState();
  const schema = yup.object().shape({
    messageType: yup.string().required('Не обрано розмітку'),
    messageText: yup
      .string()
      .required('Повідомлення не може бути  порожнім')
      .test('len', 'Не може бути більшим за 4096 символів', (val) => val.length < 4096),
  });

  const formik = useFormik({
    initialValues: {
      messageType,
      messageText: sampleText,
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (formData, { resetForm }) => {
      // const endPoint = '/api/send';
      // fetch(endPoint, {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // })
      //   .then((res) => res.json())
      //   .then((response) => {
      //     resetForm();
      //     setTimeout(() => setSuccessAction(t('Index.sent')), 3000);
      //   })
      //   .catch((error) => {
      //     setErrorAction(error)
      //   })
    },
  });

  const { errors, values, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <main className="page-content">
      <h2 className="page-title">Відправити текстове повідомлення</h2>
      <form className="form-send-message" title="Message Form" onSubmit={handleSubmit} noValidate>
        <div className="parse-mode-block">
          <RadioGroup
            type="horizontal"
            title="Оберіть розмітку повідомлення"
            required={true}
            errors={errors.messageType}
            value={values.messageType}
            onChange={setFieldValue}
            labels={[
              {
                label: 'Звичайний текст',
                value: 'plain',
              },
              {
                label: 'Markdown',
                value: 'markdown',
              },
              {
                label: 'HTML',
                value: 'html',
              },
            ]}
          />
        </div>
        <div className="message-block">
          <div className="message-text">
            <TextArea
              name="messageText"
              label="Введіть текст повідомлення"
              value={values.messageText}
              required={true}
              errors={errors.messageText}
              onChange={handleChange}
            />
            <div className="message-block-tooltip">
              Якщо ви хочете додати до повідомлення emoji (курсор повинен бути встановлений у поле
              для вводу повідомлення):
              <br />
              Windows - Натисніть клавішу з логотипом Windows + . (крапка)
              <br />
              Mac OS - Натисніть Command + Control + пробіл
            </div>
          </div>
          <div className="message-preview">
            <TextPreview textToShow={values.messageText} />
          </div>
        </div>
        <div className="targets-block">
          <div className="targets-input">
            <InputFile
              fieldClassName="lg:w-2/4"
              name="messageTargets"
              label="Завантажте файл JSON (до 4 Мб)"
              required={true}
            />
            <div className="targets-block-tooltip">
              Ви можете завантажити лише один JSON-файл. Він має містити ID клієнтів Telegram.
              Формат JSON-файлів:<pre>{jsonExampleObjects}</pre>або<pre>{jsonExampleArray}</pre>
            </div>
          </div>
        </div>
        <div className="bot-info-block">
          <div className="bot-info-input">
            <InputText name="messageBotToken" label="Введіть токен вашого бота" required={true} />
          </div>
          <div className="bot-info-info"></div>
        </div>
        <div className="progress-block"></div>
        <div className="actions-block">
          <button type="submit" className="submit-button">
            Старт
          </button>
        </div>
      </form>
    </main>
  );
};

export default MessagePage;
