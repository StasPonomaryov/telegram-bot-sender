import { parseJsonToArray } from '@/lib/utils';
import { NextResponse } from 'next/server';
import Bottleneck from 'bottleneck';
import { sendMessage } from '@/lib/sendToTelegram';
import { TSentStats, TTgUser } from '@/types/global';

export async function POST(request: Request) {
  const { messageType, messageText, subscribers, botToken } = await request.json();
  if (!messageType || !messageText || !subscribers || !botToken) {
    return NextResponse.json({ status: 'Invalid data' });
  }
  const chatIds = parseJsonToArray(subscribers);
  const limiter = new Bottleneck({
    minTime: 100,
  });
  const counters: TSentStats = {
    ok: 0,
    error: 0,
    unknown: 0,
    total: 0,
  };
  const badIds = [];
  const promises: Promise<void>[] = [];
  console.log('>>>CHAT IDS', chatIds);
  chatIds.forEach((i, index) => {
    promises.push(
      limiter.schedule(async () => {
        try {
          if (index > 1 && index % 100 === 0) console.log(index);
          let res;
          res = await sendMessage(botToken, messageText, i as TTgUser);
          console.log('RES', res);
          if (res === 200) {
            counters.ok += 1;
          } else {
            counters.unknown += 1;
            badIds.push(res);
          }
          counters.total += 1;
        } catch (e) {
          console.log(e);
        }
      })
    );
  });

  return Promise.all(promises).then(() =>
    NextResponse.json({ status: 'Sent', stats: { ...counters } })
  );
}
