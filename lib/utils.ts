import { TTgUser } from '@/types/global';
import chalk from 'chalk';

export function parseJsonToArray(json: string) {
  if (!json || (json && !json?.length)) return [];
  const parsed = JSON.parse(json);
  if (parsed instanceof Array) return parsed;

  return Object.keys(parsed);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function logMessage(token: string, text: string, chat_id: TTgUser, markup = null) {
  return new Promise((resolve) => {
    console.log(
      chalk.green(`
USER: ${chat_id}
    `)
    );
    resolve(200);
  });
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
