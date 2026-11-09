import { TIME_ZONE } from "../config.ts";
import type {
  EnglishPhrase,
  DailyPhrase,
  DailyEnglish,
  ReviewDay,
  ReviewPhrase,
} from "../types.ts";
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
const DAYS_PER_WEEK = 7;
const STUDY_DAYS_PER_WEEK = 5;
/** 1970-01-01, day 0 of the epoch, was a Thursday: three days after Monday. */
const EPOCH_DAYS_SINCE_MONDAY = 3;
const PHRASES_PER_DAY = 2;

const WEEKDAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const SHORT_WEEKDAY_NAME_LENGTH = 3;
const SATURDAY = 5;
const SUNDAY = 6;

/**
 * Weekends bring no new phrases: each weekend day reviews part of the week,
 * as weekday indexes (0 = Monday). Split so each review fits the column.
 */
const WEEKEND_REVIEW_DAYS: Record<number, number[]> = {
  [SATURDAY]: [0, 1, 2],
  [SUNDAY]: [3, 4],
};

type StudyDay = {
  /** Weeks since the epoch, starting on Mondays. */
  week: number;
  /** 0 = Monday … 6 = Sunday */
  weekday: number;
};

/**
 * Each weekday takes the next PHRASES_PER_DAY slots of the rotation, so the
 * phrases shown together always come from different categories. The previous
 * weekday's phrases come back as a review, without the meaning and translation.
 */
export function getDailyEnglish(date: Date): DailyEnglish {
  const dayNumber = localDayNumber(date);
  const title = TITLES[dayNumber % TITLES.length];
  const { week, weekday } = toStudyDay(dayNumber);
  const weekendReviewDays = WEEKEND_REVIEW_DAYS[weekday];

  if (weekendReviewDays) {
    return {
      title,
      phrases: [],
      review: {
        title: `Weekly review: ${reviewDaysLabel(weekendReviewDays)}`,
        days: weekendReviewDays.map((reviewDay) =>
          reviewDayFor(studyDayIndex(week, reviewDay))
        ),
      },
    };
  }

  const todayIndex = studyDayIndex(week, weekday);

  return {
    title,
    phrases: phrasesForStudyDay(todayIndex),
    review: {
      title: "Previous day's review",
      days: [reviewDayFor(todayIndex - 1)],
    },
  };
}

function toStudyDay(dayNumber: number): StudyDay {
  const daysSinceMonday = dayNumber + EPOCH_DAYS_SINCE_MONDAY;

  return {
    week: Math.floor(daysSinceMonday / DAYS_PER_WEEK),
    weekday: daysSinceMonday % DAYS_PER_WEEK,
  };
}

/** Counts only weekdays, so weekends don't skip phrases of the rotation. */
function studyDayIndex(week: number, weekday: number): number {
  return week * STUDY_DAYS_PER_WEEK + weekday;
}

/** Study days run Monday to Friday, so the index within a week is the weekday. */
function weekdayOfStudyDay(studyDay: number): number {
  const weekday = studyDay % STUDY_DAYS_PER_WEEK;

  return weekday < 0 ? weekday + STUDY_DAYS_PER_WEEK : weekday;
}

function reviewDaysLabel(weekdays: number[]): string {
  const [first, last] = [weekdays[0], weekdays[weekdays.length - 1]].map(
    (weekday) => WEEKDAY_NAMES[weekday].slice(0, SHORT_WEEKDAY_NAME_LENGTH)
  );

  return `${first}–${last}`;
}

function phrasesForStudyDay(studyDay: number): DailyPhrase[] {
  const firstSlot = studyDay * PHRASES_PER_DAY;

  return Array.from({ length: PHRASES_PER_DAY }, (_, offset) =>
    phraseForSlot(firstSlot + offset)
  );
}

function reviewDayFor(studyDay: number): ReviewDay {
  return {
    weekday: WEEKDAY_NAMES[weekdayOfStudyDay(studyDay)],
    phrases: phrasesForStudyDay(studyDay).map(toReviewPhrase),
  };
}

function toReviewPhrase({ phrase, example }: DailyPhrase): ReviewPhrase {
  return { phrase, example };
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
