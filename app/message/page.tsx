'use client';

import { type FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputFile from '../components/InputFile';
import InputText from '../components/InputText';
import RadioGroup from '../components/RadioGroup';
import TextArea from '../components/TextArea';
import TextPreview from '../components/TextPreview';
import { useGlobalState } from '../state/global';
import { TMessageFormData, TSentStats } from '@/types/global';

const MAX_SIZE = 4 * 1024 * 1024;

export const jsonExampleObjects: string = `
{"1234567":{...},"89012345":{...},...}`;
export const jsonExampleArray: string = `
{["1234567", "89012345", ...]}`;

const sampleText = 'Приклад тексту';

const schema = yup.object().shape({
  messageType: yup.string().required('Не обрано розмітку'),
  messageText: yup
    .string()
    .required('Повідомлення не може бути  порожнім')
    .test('len', `Не може бути більшим за ${MAX_SIZE} символів`, (val) => val.length < MAX_SIZE),
  attachment: yup
    .mixed<File>()
    .required('Не завантажено список отримувачів')
    .test(
      'fileSize',
      `Розмір файлу не повинен перебільшувати ${MAX_SIZE} Мб`,
      (val: File) => val && val.size <= MAX_SIZE
    )
    .test(
      'fileFormat',
      'Дозволено тільки JSON формат',
      (val: File) => val && val.type === 'application/json'
    ),
  botToken: yup
    .string()
    .required('Токен не може бути порожнім')
    .test('length', 'Токен не може бути меншим за 44 символи', (val) => val.length > 44),
  subscribers: yup.string(),
});

const MessagePage: FC = () => {
  const { setMessageType, messageType } = useGlobalState();
  const [successAction, setSuccessAction] = useState<string>('');
  const [errorAction, setErrorAction] = useState<Error | null>(null);
  const [sentStats, setSentStats] = useState<TSentStats | null>(null);

  function handleSettingMessageType(field: string, value: any, shouldValidate?: boolean) {
    setMessageType(value);
    setFieldValue(field, value, shouldValidate);
  }

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    formik.setFieldValue('attachment', file);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      // console.log('>>>RESULT', e?.target?.result);
      formik.setFieldValue('subscribers', e?.target?.result);
    };
  }

  const formik = useFormik<TMessageFormData>({
    initialValues: {
      messageType,
      messageText: sampleText,
      attachment: null,
      botToken: '',
      subscribers: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (formData: TMessageFormData, { resetForm }) => {
      console.log('>>>TOKEN', formData.botToken?.length);
      const endPoint = '/api/sendMessage';
      fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          resetForm();
          setSuccessAction('Відправлено');
          setSentStats(response.stats);
        })
        .catch((error) => {
          setErrorAction(error);
        });
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
            onChange={handleSettingMessageType}
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
              accept=".json"
              fieldClassName="lg:w-2/4"
              name="attachment"
              label="Завантажте файл JSON (до 4 Мб)"
              required={true}
              errors={errors.attachment}
              onChange={handleFileUpload}
            />
            <div className="targets-block-tooltip">
              Ви можете завантажити лише один JSON-файл. Він має містити ID клієнтів Telegram.
              Формат JSON-файлів:<pre>{jsonExampleObjects}</pre>або<pre>{jsonExampleArray}</pre>
            </div>
          </div>
        </div>
        <div className="bot-info-block">
          <div className="bot-info-input">
            <InputText
              name="botToken"
              label="Введіть токен вашого бота"
              required={true}
              errors={errors.botToken}
              onChange={handleChange}
            />
          </div>
          <div className="bot-info-info"></div>
        </div>
        <div className="progress-block">
          {sentStats ? (
            <>
              <span>Відправлено</span>
              <span>{sentStats.ok}</span>
            </>
          ) : null}
        </div>
        <div className="actions-block">
          <button type="submit" className="submit-button">
            Старт
          </button>
        </div>
      </form>
      {successAction && successAction.length ? <span>{successAction}</span> : null}
      {errorAction ? errorAction.message : null}
    </main>
  );
};

export default MessagePage;
