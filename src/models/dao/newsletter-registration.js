import daishoClient from "./daisho-client.js";

function registerForNewsletter(userId) {
  return daishoClient.get("newsletter-registration");
}

export { registerForNewsletter };
