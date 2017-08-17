import { get } from "./daisho-client.js";

function fetchMainMenu(userId) {
  return get("mainMenu");
}

export { fetchMainMenu };
