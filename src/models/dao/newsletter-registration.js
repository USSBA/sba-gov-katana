import { get } from "./daisho-client.js";

function registerForNewsletter(userId) {
  return get("newsletter-registration");
}

export { registerForNewsletter };
