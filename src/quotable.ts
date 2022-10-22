import axios from "axios";
import type { Quote } from "./types";

export async function getRandomQuote(): Promise<Quote> {
  try {
    return (await axios.get("https://api.quotable.io/random")).data;
  } catch (error) {
    return {
      content: "Quote API error :(",
      author: "",
    };
  }
}
