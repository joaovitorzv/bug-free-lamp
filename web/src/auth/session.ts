import Cookies from "universal-cookie";

const cookie = new Cookies();

export function keepSession(username: string) {
  return cookie.set("session", username);
}

export function retrieveSession() {
  const username = cookie.get("session");
  if (!username) {
    return null;
  } else {
    return username;
  }
}

export function dropSession() {
  return cookie.remove("session");
}
