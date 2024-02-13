export type TMessageFormData = {
  messageType: string;
  messageText: string;
  attachment: FileList | null;
  botToken: string;
  subscribers: string;
};

export type TTgUser = `${number}` | number;

export type TSentStats = {
  ok: number;
  error: number;
  total: number;
};
