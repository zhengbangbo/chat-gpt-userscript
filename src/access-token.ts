import GM_fetch from "@trim21/gm-fetch";

async function fetchAccessToken(): Promise<string> {
  const res = await GM_fetch("https://chat.openai.com/api/auth/session");
  const data = await res.json();
  const remoteAccessToken = data.accessToken;
  GM.setValue("OpenAIAccessToken", remoteAccessToken);
  return remoteAccessToken;
}

export async function localAccessToken(): Promise<string> {
  const localAccessToken = (await GM.getValue("OpenAIAccessToken")) as string;
  if (typeof localAccessToken === "undefined") {
    const remoteAccessToken = await fetchAccessToken();
    return remoteAccessToken;
  } else {
    return localAccessToken;
  }
}

export async function reloadAccessToken() {
  GM.deleteValue("OpenAIAccessToken");
  await fetchAccessToken();
}
