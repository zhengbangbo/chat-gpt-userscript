import GM_fetch from "@trim21/gm-fetch";

async function fetchAccessToken(): Promise<string> {
  try {
    const res = await GM_fetch("https://chat.openai.com/api/auth/session");
    const data = await res.json();
    const remoteAccessToken = data.accessToken;
    // GM.setValue("OpenAIAccessToken", remoteAccessToken)
    localStorage.setItem("OpenAIAccessToken", remoteAccessToken)
    return remoteAccessToken;
  } catch (error) {
    console.log("fetchAccessToken error: ", error)
  }
}

export async function localAccessToken(): Promise<string> {
  // const localAccessToken = (await GM.getValue("OpenAIAccessToken")) as string;
  const localAccessToken = localStorage.getItem("OpenAIAccessToken")
  if (typeof localAccessToken === "undefined") {
    const remoteAccessToken = await fetchAccessToken();
    return remoteAccessToken;
  } else {
    return localAccessToken;
  }
}

export async function reloadAccessToken() {
  // GM.deleteValue("OpenAIAccessToken");
  localStorage.removeItem("OpenAIAccessToken")
  await fetchAccessToken();
}
