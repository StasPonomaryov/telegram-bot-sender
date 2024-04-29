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

export function simpleMarkdown(mdText: string) {
  const formatMD = (mdstr: string) => {
    mdstr = mdstr.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>');
    mdstr = mdstr.replace(/\*(\w.*?[^\\])\*/gm, '<b>$1</b>');
    mdstr = mdstr.replace(/_(\w.*?[^\\])_/gm, '<em>$1</em>');
    mdstr = mdstr.replace(/__(\w.*?[^\\])__/gm, '<u>$1</u>');
    mdstr = mdstr.replace(/~(\w.*?)~/gm, '<s>$1</s>');
    mdstr = mdstr.replace(/\|\|(\w.*?[^\\])\|\|/gm, '<span>&#9617;</span>');
    mdstr = mdstr.replace(/  \n/g, '\n<br/>').replace(/\n\s*\n/g, '\n<p>\n');

    return mdstr.replace(/\\([`_~\*\+\-\.\^\\\<\>\(\)\[\]])/gm, '$1');
  };
  const markdownText = mdText.replace(/\r\n/g, '\n').replace(/\n~~~/g, '\n```');

  return formatMD(markdownText);
}
