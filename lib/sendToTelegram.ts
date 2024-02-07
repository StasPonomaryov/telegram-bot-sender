import { TTgUser } from '@/types/global';
import axios from 'axios';

export async function sendMessage(
  token = process.env.TOKEN,
  text: string,
  user: TTgUser,
  markup = null
) {
  const params = {
    chat_id: user,
    text: text,
    reply_markup: markup,
  };
  let error = '';
  const result = await axios
    .get(`https://api.telegram.org/bot${token}/sendMessage`, { params: params })
    .catch((err) => {
      if (err.response) {
        error = err.response.config.params.chat_id;
      } else if (err.request) {
        error = err.request;
        console.log(err.request);
      } else {
        error = 'Something went wrong';
      }
    });

  return result ? result.status : error;
}
