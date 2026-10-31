import { TIME_ZONE } from "../config.ts";
import type { EnglishPhrase, DailyPhrase, DailyEnglish } from "../types.ts";
import { collocations } from "./english-phrases/collocations.ts";
import { commonMistakes } from "./english-phrases/common-mistakes.ts";
import { falseFriends } from "./english-phrases/false-friends.ts";
import { idioms } from "./english-phrases/idioms.ts";
import { phrasalVerbs } from "./english-phrases/phrasal-verbs.ts";

type PhraseCategory = {
  label: string;
  phrases: EnglishPhrase[];
};

/** Consecutive slots cycle through the categories in this order. */
const CATEGORIES: PhraseCategory[] = [
  { label: "phrasal verb", phrases: phrasalVerbs },
  { label: "idiom", phrases: idioms },
  { label: "collocation", phrases: collocations },
  { label: "false friends & confusables", phrases: falseFriends },
  { label: "grammar & usage", phrases: commonMistakes },
];

/** Section titles, one per day in this order. */
const TITLES = [
  "Mind your English!",
  "English, do you speak it?",
  "Today's English snack",
  "Cat's English corner",
  "No more Ponglish!",
  "Your daily dose of English",
  "English with a cup of tea",
  "Words to impress your boss",
  "Brain food for today",
  "Speak like a local",
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const PHRASES_PER_DAY = 2;

/**
 * Each day takes the next PHRASES_PER_DAY slots of the rotation, so the phrases
 * shown together always come from different categories.
 */
export function getDailyEnglish(date: Date): DailyEnglish {
  const dayNumber = localDayNumber(date);
  const firstSlot = dayNumber * PHRASES_PER_DAY;

  return {
    title: TITLES[dayNumber % TITLES.length],
    phrases: Array.from({ length: PHRASES_PER_DAY }, (_, offset) =>
      phraseForSlot(firstSlot + offset)
    ),
  };
}

function phraseForSlot(slot: number): DailyPhrase {
  const category = CATEGORIES[slot % CATEGORIES.length];
  const round = Math.floor(slot / CATEGORIES.length);
  const phrase = category.phrases[round % category.phrases.length];

  if (!phrase) {
    throw new Error(`No phrases in the "${category.label}" category`);
  }

  return { category: category.label, ...phrase };
}

/** Days since the Unix epoch, counted by the calendar date in TIME_ZONE. */
function localDayNumber(date: Date): number {
  // en-CA formats the date as YYYY-MM-DD
  const localDate = date.toLocaleDateString("en-CA", { timeZone: TIME_ZONE });

  return Math.floor(Date.parse(localDate) / MS_PER_DAY);
}
