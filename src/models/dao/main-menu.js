import daishoClient from "./daisho-client.js";

function fetchMainMenu(userId) {
  return daishoClient.get("mainMenu");
}

export { fetchMainMenu };
