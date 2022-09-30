import axios from "axios";

export async function getRandomQuote() {
  return (await axios.get("https://api.quotable.io/random")).data;
}
