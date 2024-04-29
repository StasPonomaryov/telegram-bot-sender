/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import dynamic from 'next/dynamic';
import { type FC, useState, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputFile from '../components/UI/InputFile';
import InputText from '../components/UI/InputText';
import RadioGroup from '../components/UI/RadioGroup';
import TextArea from '../components/UI/TextArea';
import TextPreview from '../components/UI/TextPreview';
import { useGlobalState } from '../state/global';
import { TMessageFormData, TSentStats, TTgUser } from '@/types/global';
import { sendMessage } from '@/lib/sendToTelegram';
import { getRandomInt, logMessage, parseJsonToArray, sleep } from '@/lib/utils';
import MarkdownPreview from '../components/UI/MarkdownPreview';
const HelperTextNoSSR = dynamic(() => import('../components/UI/HelperText'), { ssr: false });
import * as tooltips from './tooltips.json';

const MAX_SIZE = 4 * 1024 * 1024;

export const jsonExampleObjects: string = `
{"1234567":{...},"89012345":{...},...}`;
export const jsonExampleArray: string = `
["1234567", "89012345", ...]`;

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
  const [isSending, setIsSending] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const [progress, setProgress] = useState(0);

  function handleSettingMessageType(field: string, value: any, shouldValidate?: boolean) {
    setMessageType(value);
    setFieldValue(field, value, shouldValidate);
  }

  function stopSending() {
    console.log('>>>CLICKED STOP');
    if (controller) {
      console.log('>>>STOPPING');
      controller.abort();
    }
    setIsSending(false);
  }

  useEffect(() => {
    return () => {
      stopSending();
    };
  }, []);

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
      const newController = new AbortController();
      setController(newController);
      setIsSending(true);
      let chatIds: string[] = [];
      if (process.env.NODE_ENV === 'development') {
        for (let i = 0; i < 100; i += 1) {
          chatIds.push(getRandomInt(100000000, 999999999).toString());
        }
      } else {
        chatIds = parseJsonToArray(formData.subscribers);
      }

      async function delayedSend() {
        const delay = 100;
        const counters: TSentStats = {
          ok: 0,
          error: 0,
          total: 0,
        };
        const badIds = [];
        for (let i = 0; i < chatIds.length; i += 1) {
          setProgress(Number(((i + 1) * 100) / chatIds.length));
          try {
            if (newController.signal?.aborted) {
              break;
            }
            // const res = await sendMessage(formData.botToken, formData.messageText, i as TTgUser);
            const res = await logMessage(formData.botToken, formData.messageText, i as TTgUser);

            if (res === 200) {
              counters.ok += 1;
            } else {
              counters.error += 1;
              badIds.push(res);
            }
            counters.total += 1;
            setSentStats(counters);
          } catch (e) {
            console.log(e);
          }

          await sleep(delay);
        }
        resetForm();
        setProgress(0);
        setSuccessAction('Відправлено');
        setIsSending(false);
        setController(null);
      }

      delayedSend();
    },
  });

  const { errors, values, touched, handleChange, handleSubmit, setFieldValue } = formik;

  const helperText = useMemo(() => {
    return (tooltips as { [key: string]: string })[values.messageType];
  }, [values]);

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
              <HelperTextNoSSR text={helperText} />
            </div>
          </div>
          <div className="message-preview">
            {values.messageType === 'plain' && <TextPreview textToShow={values.messageText} />}
            {values.messageType === 'markdown' && (
              <MarkdownPreview messageText={values.messageText} />
            )}
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
              value={values.attachment}
              onChange={handleFileUpload}
              touched={touched.attachment}
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
              touched={touched.botToken}
              onChange={handleChange}
              value={values.botToken}
            />
          </div>
          <div className="bot-info-info"></div>
        </div>
        <div className="progress-block">
          {progress ? (
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : null}
          {sentStats ? (
            <table className="results-table">
              <tbody>
                <tr>
                  <th scope="row">Відправлено</th>
                  <td>{sentStats.ok}</td>
                </tr>
                <tr>
                  <th scope="row">Помилки</th>
                  <td>{sentStats.error}</td>
                </tr>
                <tr>
                  <th scope="row">Всього</th>
                  <td>{sentStats.total}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
        <div className="actions-block">
          <button type="submit" className="submit-button">
            Старт
          </button>
          {isSending ? (
            <button onClick={stopSending} className="cancel-button">
              Зупинити
            </button>
          ) : null}
        </div>
      </form>
      {successAction && successAction.length ? (
        <span className="success-notify my-4">{successAction}</span>
      ) : null}
      {errorAction ? <span className="error-notify my-4">{errorAction.message}</span> : null}
    </main>
  );
};

export default MessagePage;
