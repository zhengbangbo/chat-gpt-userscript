import GM_fetch from "@trim21/gm-fetch";
import { createParser } from "eventsource-parser";

export async function fetchSSE(resource: string, options: any) {
  const { onMessage, ...fetchOptions } = options;
  const resp = await GM_fetch(resource, fetchOptions);

  if (resp.status != 200) throw new Error(resp.status.toString());

  const parser = createParser((event) => {
    if (event.type === "event") {
      onMessage(event.data);
    }
  });
  for await (const chunk of streamAsyncIterable(resp.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
  }
}

async function* streamAsyncIterable(stream: any) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
